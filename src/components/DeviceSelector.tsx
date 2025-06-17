
import { MockupType } from '@/types/mockup';
import { MOCKUP_CONFIGS } from '@/lib/mockup-config';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface DeviceSelectorProps {
  selectedDevice: MockupType;
  onDeviceChange: (device: MockupType) => void;
}

export const DeviceSelector = ({ selectedDevice, onDeviceChange }: DeviceSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="device-select" className="text-sm font-medium text-gray-700">
        Choose Device Mockup
      </Label>
      <Select value={selectedDevice} onValueChange={onDeviceChange}>
        <SelectTrigger id="device-select" className="w-full">
          <SelectValue placeholder="Select a device" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(MOCKUP_CONFIGS).map(([key, config]) => (
            <SelectItem key={key} value={key}>
              {config.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
