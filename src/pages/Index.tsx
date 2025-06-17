
import { useState, useEffect } from 'react';
import { MockupType, DownloadFormat } from '@/types/mockup';
import { MOCKUP_CONFIGS, CANVAS_DEBOUNCE_MS } from '@/lib/mockup-config';
import { useCanvasRenderer } from '@/hooks/useCanvasRenderer';
import { useDebounce } from '@/hooks/useDebounce';
import { ControlPanel } from '@/components/ControlPanel';
import { PreviewCanvas } from '@/components/PreviewCanvas';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedDevice, setSelectedDevice] = useState<MockupType>('iphone');
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
  const [autoStretch, setAutoStretch] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>('png');
  const [isGenerating, setIsGenerating] = useState(false);

  const { previewCanvasRef, downloadCanvasRef, renderPreview, renderDownload } = useCanvasRenderer();

  const debouncedRenderPreview = useDebounce(
    (image: HTMLImageElement, config: typeof MOCKUP_CONFIGS.iphone, stretch: boolean) => {
      renderPreview(image, config, stretch);
    },
    CANVAS_DEBOUNCE_MS
  );

  const mockupConfig = MOCKUP_CONFIGS[selectedDevice];

  // Update preview when any parameter changes
  useEffect(() => {
    if (userImage) {
      debouncedRenderPreview(userImage, mockupConfig, autoStretch);
    }
  }, [userImage, mockupConfig, autoStretch, debouncedRenderPreview]);

  const handleImageLoad = (image: HTMLImageElement) => {
    setUserImage(image);
    toast({
      title: "Image uploaded successfully",
      description: "Your image is ready for mockup generation.",
    });
  };

  const handleImageRemove = () => {
    setUserImage(null);
    // Clear preview canvas
    const canvas = previewCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleDownload = async () => {
    if (!userImage) {
      toast({
        title: "No image uploaded",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const canvas = await renderDownload(userImage, mockupConfig, autoStretch);
      if (!canvas) throw new Error('Failed to generate canvas');

      // Create download link
      const quality = downloadFormat === 'jpg' ? 0.95 : undefined;
      const mimeType = downloadFormat === 'jpg' ? 'image/jpeg' : 'image/png';
      
      canvas.toBlob((blob) => {
        if (!blob) throw new Error('Failed to generate image blob');
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `mockup-${selectedDevice}-${Date.now()}.${downloadFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast({
          title: "Download started",
          description: `Your ${mockupConfig.name} mockup is downloading.`,
        });
      }, mimeType, quality);
      
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: "There was an error generating your mockup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Mockup Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your designs into stunning device mockups with just a few clicks. 
            Choose from iPhone and laptop frames for professional presentations.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Control Panel */}
          <div className="space-y-6">
            <ControlPanel
              selectedDevice={selectedDevice}
              onDeviceChange={setSelectedDevice}
              onImageLoad={handleImageLoad}
              onImageRemove={handleImageRemove}
              isImageLoaded={!!userImage}
              autoStretch={autoStretch}
              onAutoStretchChange={setAutoStretch}
              downloadFormat={downloadFormat}
              onDownloadFormatChange={setDownloadFormat}
              onDownload={handleDownload}
              isGenerating={isGenerating}
            />
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <PreviewCanvas
              ref={previewCanvasRef}
              mockupConfig={mockupConfig}
            />
            
            {/* Hidden download canvas */}
            <canvas
              ref={downloadCanvasRef}
              className="hidden"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Built with React, TypeScript, and HTML5 Canvas
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
