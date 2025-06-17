
import { useCallback, useRef } from 'react';
import { MockupConfig, CanvasSize } from '@/types/mockup';
import { PREVIEW_SCALE } from '@/lib/mockup-config';

export const useCanvasRenderer = () => {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const downloadCanvasRef = useRef<HTMLCanvasElement>(null);

  const drawImageToCanvas = useCallback(
    async (
      canvas: HTMLCanvasElement,
      userImage: HTMLImageElement,
      mockupConfig: MockupConfig,
      autoStretch: boolean,
      scale: number = 1
    ) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = mockupConfig.mockupWidth * scale;
      canvas.height = mockupConfig.mockupHeight * scale;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate screen dimensions with scale
      const screenWidth = mockupConfig.screenWidth * scale;
      const screenHeight = mockupConfig.screenHeight * scale;
      const screenX = mockupConfig.screenX * scale;
      const screenY = mockupConfig.screenY * scale;

      // Draw user image
      if (autoStretch) {
        // Stretch to fill screen
        ctx.drawImage(userImage, screenX, screenY, screenWidth, screenHeight);
      } else {
        // Maintain aspect ratio
        const imageAspect = userImage.width / userImage.height;
        const screenAspect = screenWidth / screenHeight;

        let drawWidth, drawHeight, drawX, drawY;

        if (imageAspect > screenAspect) {
          // Image is wider than screen
          drawWidth = screenWidth;
          drawHeight = screenWidth / imageAspect;
          drawX = screenX;
          drawY = screenY + (screenHeight - drawHeight) / 2;
        } else {
          // Image is taller than screen
          drawHeight = screenHeight;
          drawWidth = screenHeight * imageAspect;
          drawX = screenX + (screenWidth - drawWidth) / 2;
          drawY = screenY;
        }

        ctx.drawImage(userImage, drawX, drawY, drawWidth, drawHeight);
      }

      // Load and draw mockup overlay
      const mockupImage = new Image();
      mockupImage.crossOrigin = 'anonymous';
      
      return new Promise<void>((resolve) => {
        mockupImage.onload = () => {
          ctx.drawImage(mockupImage, 0, 0, canvas.width, canvas.height);
          resolve();
        };
        mockupImage.src = mockupConfig.imagePath;
      });
    },
    []
  );

  const renderPreview = useCallback(
    async (userImage: HTMLImageElement, mockupConfig: MockupConfig, autoStretch: boolean) => {
      const canvas = previewCanvasRef.current;
      if (!canvas) return;

      await drawImageToCanvas(canvas, userImage, mockupConfig, autoStretch, PREVIEW_SCALE);
    },
    [drawImageToCanvas]
  );

  const renderDownload = useCallback(
    async (userImage: HTMLImageElement, mockupConfig: MockupConfig, autoStretch: boolean) => {
      const canvas = downloadCanvasRef.current;
      if (!canvas) return;

      await drawImageToCanvas(canvas, userImage, mockupConfig, autoStretch, 1);
      return canvas;
    },
    [drawImageToCanvas]
  );

  return {
    previewCanvasRef,
    downloadCanvasRef,
    renderPreview,
    renderDownload,
  };
};
