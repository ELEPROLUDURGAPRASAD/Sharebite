'use server';

/**
 * @fileOverview Analyzes the quality of a donor's food image using AI.
 *
 * - analyzeDonorImageQuality - A function that analyzes the donor image quality.
 * - AnalyzeDonorImageQualityInput - The input type for the analyzeDonorImageQuality function.
 * - AnalyzeDonorImageQualityOutput - The return type for the analyzeDonorImageQuality function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeDonorImageQualityInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the food donation, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeDonorImageQualityInput = z.infer<typeof AnalyzeDonorImageQualityInputSchema>;

const AnalyzeDonorImageQualityOutputSchema = z.object({
  qualityAssessment: z
    .string()
    .describe('An assessment of the food quality based on the image.'),
  isSuitableForConsumption: z
    .boolean()
    .describe('Whether the food appears suitable for consumption.'),
});
export type AnalyzeDonorImageQualityOutput = z.infer<typeof AnalyzeDonorImageQualityOutputSchema>;

export async function analyzeDonorImageQuality(
  input: AnalyzeDonorImageQualityInput
): Promise<AnalyzeDonorImageQualityOutput> {
  return analyzeDonorImageQualityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeDonorImageQualityPrompt',
  input: {schema: AnalyzeDonorImageQualityInputSchema},
  output: {schema: AnalyzeDonorImageQualityOutputSchema},
  prompt: `You are an AI assistant that analyzes the quality of food in images to determine if it is suitable for donation and consumption.

  Analyze the food in the provided image and provide a quality assessment.
  Based on the image, determine if the food appears suitable for consumption. Consider factors such as visible spoilage, freshness, and overall appearance.

  Photo: {{media url=photoDataUri}}
  \nQuality Assessment and Suitability:
  `,
});

const analyzeDonorImageQualityFlow = ai.defineFlow(
  {
    name: 'analyzeDonorImageQualityFlow',
    inputSchema: AnalyzeDonorImageQualityInputSchema,
    outputSchema: AnalyzeDonorImageQualityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
