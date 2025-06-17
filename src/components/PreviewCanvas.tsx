
import { forwardRef } from 'react';
import { MockupConfig } from '@/types/mockup';
import { PREVIEW_SCALE } from '@/lib/mockup-config';
import { Card } from '@/components/ui/card';

interface PreviewCanvasProps {
  mockupConfig: MockupConfig;
}

export const PreviewCanvas = forwardRef<HTMLCanvasElement, PreviewCanvasProps>(
  ({ mockupConfig }, ref) => {
    const canvasWidth = mockupConfig.mockupWidth * PREVIEW_SCALE;
    const canvasHeight = mockupConfig.mockupHeight * PREVIEW_SCALE;

    return (
      <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Preview ({mockupConfig.name})
          </h3>
          <div className="inline-block bg-white p-4 rounded-lg shadow-lg">
            <canvas
              ref={ref}
              width={canvasWidth}
              height={canvasHeight}
              className="max-w-full h-auto border border-gray-200 rounded"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Preview at 30% scale
          </p>
        </div>
      </Card>
    );
  }
);

PreviewCanvas.displayName = 'PreviewCanvas';
