'use client';

import { handleImageAnalysis } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle2,
  FileImage,
  Loader2,
  ThumbsDown,
  ThumbsUp,
  Upload,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import { useState, useTransition } from 'react';

export function ImageAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{
    qualityAssessment: string;
    isSuitableForConsumption: boolean;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAnalysisResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const onAnalyze = () => {
    if (!preview) {
      toast({
        title: 'No Image Selected',
        description: 'Please upload an image before analyzing.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      const result = await handleImageAnalysis(preview);
      if (result.error) {
        toast({
          title: 'Analysis Failed',
          description: result.error,
          variant: 'destructive',
        });
        setAnalysisResult(null);
      } else {
        setAnalysisResult(result);
        toast({
          title: 'Analysis Complete',
          description: 'The food quality assessment is ready.',
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="photo-upload" className="text-lg font-semibold">
        Upload Photos
      </Label>
      <Card className="border-2 border-dashed">
        <CardContent className="p-6 text-center">
          <FileImage className="mx-auto h-12 w-12 text-muted-foreground" />
          <Label
            htmlFor="photo-upload"
            className="mt-4 block text-sm font-semibold text-primary hover:underline cursor-pointer"
          >
            Click to upload or drag and drop
            <Input
              id="photo-upload"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              accept="image/*"
            />
          </Label>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG, GIF up to 10MB
          </p>
        </CardContent>
      </Card>

      {preview && (
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <h3 className="font-semibold mb-2">Image Preview:</h3>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={preview}
                alt="Food donation preview"
                fill
                className="object-cover"
              />
            </div>
            <Button onClick={onAnalyze} disabled={isPending} className="mt-4 w-full">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                </>
              ) : (
                'Check Food Quality (AI)'
              )}
            </Button>
          </div>

          <div className="mt-2 md:mt-0">
            <h3 className="font-semibold mb-2">AI Quality Assessment:</h3>
            {isPending && <Progress value={50} className="w-full animate-pulse" />}
            {analysisResult && (
              <Alert
                variant={
                  analysisResult.isSuitableForConsumption
                    ? 'default'
                    : 'destructive'
                }
                className="bg-secondary"
              >
                {analysisResult.isSuitableForConsumption ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle className="flex items-center gap-2 font-bold">
                  {analysisResult.isSuitableForConsumption ? (
                    <>
                      <ThumbsUp className="h-5 w-5 text-green-600" /> Suitable for
                      Consumption
                    </>
                  ) : (
                    <>
                      <ThumbsDown className="h-5 w-5 text-red-600" /> Not Suitable
                    </>
                  )}
                </AlertTitle>
                <AlertDescription>
                  {analysisResult.qualityAssessment}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
