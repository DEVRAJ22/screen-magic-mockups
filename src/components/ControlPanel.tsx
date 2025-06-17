
import { MockupType, DownloadFormat } from '@/types/mockup';
import { DeviceSelector } from './DeviceSelector';
import { ImageUploader } from './ImageUploader';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';

interface ControlPanelProps {
  selectedDevice: MockupType;
  onDeviceChange: (device: MockupType) => void;
  onImageLoad: (image: HTMLImageElement) => void;
  onImageRemove: () => void;
  isImageLoaded: boolean;
  autoStretch: boolean;
  onAutoStretchChange: (checked: boolean) => void;
  downloadFormat: DownloadFormat;
  onDownloadFormatChange: (format: DownloadFormat) => void;
  onDownload: () => void;
  isGenerating: boolean;
}

export const ControlPanel = ({
  selectedDevice,
  onDeviceChange,
  onImageLoad,
  onImageRemove,
  isImageLoaded,
  autoStretch,
  onAutoStretchChange,
  downloadFormat,
  onDownloadFormatChange,
  onDownload,
  isGenerating,
}: ControlPanelProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Mockup Generator
        </h2>
        <p className="text-sm text-gray-600">
          Upload an image and generate professional device mockups instantly.
        </p>
      </div>

      <DeviceSelector
        selectedDevice={selectedDevice}
        onDeviceChange={onDeviceChange}
      />

      <ImageUploader
        onImageLoad={onImageLoad}
        onImageRemove={onImageRemove}
        isImageLoaded={isImageLoaded}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-stretch" className="text-sm font-medium text-gray-700">
            Auto-stretch image
          </Label>
          <Switch
            id="auto-stretch"
            checked={autoStretch}
            onCheckedChange={onAutoStretchChange}
          />
        </div>
        <p className="text-xs text-gray-500">
          {autoStretch
            ? 'Image will stretch to fill the entire screen'
            : 'Image will maintain aspect ratio and be centered'}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="download-format" className="text-sm font-medium text-gray-700">
          Download Format
        </Label>
        <Select value={downloadFormat} onValueChange={onDownloadFormatChange}>
          <SelectTrigger id="download-format">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="png">PNG (High Quality)</SelectItem>
            <SelectItem value="jpg">JPG (Smaller Size)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={onDownload}
        disabled={!isImageLoaded || isGenerating}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
        size="lg"
      >
        <Download className="w-4 h-4 mr-2" />
        {isGenerating ? 'Generating...' : 'Download Mockup'}
      </Button>
    </Card>
  );
};
