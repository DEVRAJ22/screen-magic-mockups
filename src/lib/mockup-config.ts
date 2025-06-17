
import { MockupConfig, MockupType } from '@/types/mockup';

export const MOCKUP_CONFIGS: Record<MockupType, MockupConfig> = {
  iphone: {
    name: "iPhone",
    screenWidth: 1116,
    screenHeight: 2407,
    screenX: 48,
    screenY: 40,
    mockupWidth: 1212,
    mockupHeight: 2487,
    imagePath: "/lovable-uploads/84be1670-9a6f-49e6-bd75-5101fc3a51f7.png",
  },
  laptop: {
    name: "Laptop",
    screenWidth: 2612,
    screenHeight: 1677,
    screenX: 968,
    screenY: 627,
    mockupWidth: 4548,
    mockupHeight: 2931,
    imagePath: "/lovable-uploads/401f4341-c40e-4cf0-af2a-638d0cf44ea7.png",
  },
};

export const PREVIEW_SCALE = 0.3;
export const CANVAS_DEBOUNCE_MS = 100;
