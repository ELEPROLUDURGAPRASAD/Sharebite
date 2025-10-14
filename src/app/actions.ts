'use server';

import {
  analyzeDonorImageQuality,
  type AnalyzeDonorImageQualityOutput,
} from '@/ai/flows/analyze-donor-image-quality';
import { db } from '@/firebase/server';
import { FoodDonation, MealRequest, PickupRequest, UserProfile } from '@/lib/types';
import { getAuth } from 'firebase-admin/auth';
import { app } from '@/firebase/server';

type AnalysisResult = AnalyzeDonorImageQualityOutput & { error?: string };

export async function handleImageAnalysis(
  photoDataUri: string
): Promise<AnalysisResult> {
  if (!photoDataUri) {
    return {
      error: 'No image data provided.',
      qualityAssessment: '',
      isSuitableForConsumption: false,
    };
  }

  try {
    const result = await analyzeDonorImageQuality({ photoDataUri });
    return result;
  } catch (error) {
    console.error('Error analyzing image:', error);
    return {
      error: 'Failed to analyze image. Please try again.',
      qualityAssessment: '',
      isSuitableForConsumption: false,
    };
  }
}

export async function createDonation(donation: Omit<FoodDonation, 'id' | 'donorId' | 'status' | 'photoUrl'>, photoDataUri: string, token: string) {
    const auth = getAuth(app);
    const decodedToken = await auth.verifyIdToken(token);
    const donorId = decodedToken.uid;

    const photoUrl = photoDataUri;

    const newDonation: Omit<FoodDonation, 'id'> = {
        ...donation,
        donorId,
        photoUrl,
        status: 'pending',
        // Ensure optional fields are handled gracefully
        contactName: donation.contactName || '',
        contactMobile: donation.contactMobile || '',
    };

    const docRef = await db.collection('foodDonations').add(newDonation);
    return docRef.id;
}


export async function createPickupRequest(donationId: string, token: string) {
  const auth = getAuth(app);
  const decodedToken = await auth.verifyIdToken(token);
  const ngoId = decodedToken.uid;

  const donationRef = db.collection('foodDonations').doc(donationId);
  const donationSnap = await donationRef.get();
  if(!donationSnap.exists) {
    throw new Error("Donation not found");
  }

  const pickup: Omit<PickupRequest, 'id' | 'distance'> = {
    foodDonationId: donationId,
    ngoId: ngoId,
    status: 'accepted'
  }
  // In a real app, calculate distance between NGO and donor
  const pickupWithDistance = { ...pickup, distance: Math.random() * 10 };

  const docRef = await db.collection('pickupRequests').add(pickupWithDistance);
  
  // Update donation status
  await donationRef.update({ status: 'accepted', ngoId: ngoId });
  
  return docRef.id;
}

export async function createMealRequest(request: { mobileNumber: string, meals: number }, token: string) {
    const auth = getAuth(app);
    const decodedToken = await auth.verifyIdToken(token);
    const acceptorId = decodedToken.uid;

    const newRequest: Omit<MealRequest, 'id'> = {
        acceptorId,
        meals: request.meals,
        mobileNumber: request.mobileNumber,
        requestDate: new Date().toISOString(),
    };

    const docRef = await db.collection('mealRequests').add(newRequest);
    return docRef.id;
}

export async function createUser(userData: Omit<UserProfile, 'id'>, uid: string) {
  const userRef = db.collection('users').doc(uid);
  await userRef.set({
    ...userData,
    id: uid,
  });
}
