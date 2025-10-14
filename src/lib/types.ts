export type UserRole = 'donor' | 'ngo' | 'acceptor';

export interface UserProfile {
  id: string;
  userType: UserRole;
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface FoodDonation {
  id: string;
  donorId: string;
  foodType: string;
  quantity: number; // Represents servings
  expiry: string; // ISO date string
  photoUrl: string;
  location: string;
  otherDetails?: string;
  ngoId?: string;
  status: 'pending' | 'accepted' | 'picked-up' | 'delivered';
  donorCategory:
    | 'restaurant'
    | 'catering'
    | 'hostel'
    | 'retailer'
    | 'households'
    | 'others';
  contactName?: string;
  contactMobile?: string;
}

export interface PickupRequest {
  id: string;
  ngoId: string;
  foodDonationId: string;
  distance: number;
  status: 'pending' | 'accepted' | 'picked-up';
}

export interface DeliveryConfirmation {
  id: string;
  ngoId: string;
  foodDonationId: string;
  photoUrl: string;
  confirmationDate: string; // ISO date string
}

export interface MealRequest {
  id: string;
  acceptorId: string;
  meals: number;
  requestDate: string; // ISO date string
  mobileNumber: string;
}
