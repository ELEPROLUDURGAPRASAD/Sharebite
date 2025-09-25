'use server';

import {
  analyzeDonorImageQuality,
  type AnalyzeDonorImageQualityOutput,
} from '@/ai/flows/analyze-donor-image-quality';

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
