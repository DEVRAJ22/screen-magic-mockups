
export interface MockupConfig {
  name: string;
  screenWidth: number;
  screenHeight: number;
  screenX: number;
  screenY: number;
  mockupWidth: number;
  mockupHeight: number;
  imagePath: string;
}

export interface CanvasSize {
  width: number;
  height: number;
}

export type MockupType = 'iphone' | 'laptop';
export type DownloadFormat = 'png' | 'jpg';
