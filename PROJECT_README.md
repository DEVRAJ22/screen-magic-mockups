
# Professional Mockup Generator

A responsive web application built with React, TypeScript, and Tailwind CSS that allows users to upload images and generate professional device mockups (iPhone and Laptop) with real-time preview and high-quality downloads.

## 🚀 Features

- **Device Mockups**: iPhone and Laptop frames with precise screen dimensions
- **Real-time Preview**: Instant visual feedback with 30% scaled preview
- **Smart Image Fitting**: Auto-stretch or maintain aspect ratio options
- **High-Quality Downloads**: Export full-resolution PNG/JPG images
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Performance Optimized**: Debounced canvas updates for smooth interaction
- **Professional UI**: Clean interface using shadcn/ui components

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Canvas Rendering**: HTML5 Canvas API
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── ControlPanel.tsx    # Main control interface
│   ├── DeviceSelector.tsx  # Device selection dropdown
│   ├── ImageUploader.tsx   # Image upload with drag & drop
│   └── PreviewCanvas.tsx   # Canvas preview component
├── hooks/
│   ├── useCanvasRenderer.ts # Canvas rendering logic
│   └── useDebounce.ts      # Performance optimization
├── lib/
│   └── mockup-config.ts    # Device configurations
├── types/
│   └── mockup.ts          # TypeScript definitions
└── pages/
    └── Index.tsx          # Main application page
```

## 🔧 Implementation Guide

### 1. Core Configuration

Create the mockup configurations with precise device dimensions:

```typescript
// src/lib/mockup-config.ts
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
```

### 2. TypeScript Definitions

Define proper types for type safety:

```typescript
// src/types/mockup.ts
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

export type MockupType = 'iphone' | 'laptop';
export type DownloadFormat = 'png' | 'jpg';
```

### 3. Canvas Rendering Hook

The core rendering logic with dual canvas approach:

```typescript
// src/hooks/useCanvasRenderer.ts
export const useCanvasRenderer = () => {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const downloadCanvasRef = useRef<HTMLCanvasElement>(null);

  const drawImageToCanvas = useCallback(async (
    canvas: HTMLCanvasElement,
    userImage: HTMLImageElement,
    mockupConfig: MockupConfig,
    autoStretch: boolean,
    scale: number = 1
  ) => {
    // Canvas setup and image rendering logic
    // Handles both aspect ratio preservation and stretching
    // Overlays device mockup on top of user image
  }, []);

  return {
    previewCanvasRef,
    downloadCanvasRef,
    renderPreview,
    renderDownload,
  };
};
```

### 4. Performance Optimization

Implement debouncing for smooth canvas updates:

```typescript
// src/hooks/useDebounce.ts
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  ) as T;

  return debouncedCallback;
};
```

### 5. Image Upload Component

Drag & drop functionality with file validation:

```typescript
// src/components/ImageUploader.tsx
export const ImageUploader = ({ onImageLoad, onImageRemove, isImageLoaded }) => {
  // Drag & drop handlers
  // File validation
  // Visual feedback states
  // Image processing and loading
};
```

### 6. Device Selection

Clean dropdown interface for mockup selection:

```typescript
// src/components/DeviceSelector.tsx
export const DeviceSelector = ({ selectedDevice, onDeviceChange }) => {
  return (
    <Select value={selectedDevice} onValueChange={onDeviceChange}>
      {/* Device options mapping */}
    </Select>
  );
};
```

### 7. Main Application Logic

The central orchestration in the main page:

```typescript
// src/pages/Index.tsx
const Index = () => {
  // State management for device, image, settings
  // Debounced preview updates
  // Download functionality with blob creation
  // Error handling and user feedback
};
```

## 🎨 Key Implementation Details

### Canvas Rendering Strategy

1. **Dual Canvas Approach**:
   - Preview canvas: 30% scale for real-time feedback
   - Download canvas: 100% scale for high-quality exports

2. **Image Fitting Logic**:
   - Auto-stretch: Fill entire screen area
   - Aspect ratio: Center image with proportional scaling

3. **Layer Composition**:
   - User image drawn first (background)
   - Device mockup overlaid with transparency

### Performance Optimizations

- **Debounced Updates**: 100ms delay prevents excessive re-renders
- **Conditional Rendering**: Only update canvas when parameters change
- **Memory Management**: Proper cleanup of canvas contexts and image objects

### User Experience Features

- **Drag & Drop Upload**: Intuitive file selection
- **Real-time Preview**: Instant visual feedback
- **Format Selection**: PNG (quality) vs JPG (size) options
- **Loading States**: Progress indicators during processing
- **Error Handling**: Graceful failure management with user notifications

## 🚀 Getting Started

1. **Clone and Install**:
   ```bash
   npm install
   npm run dev
   ```

2. **Required Dependencies**:
   - React 18+ with TypeScript
   - Tailwind CSS for styling
   - shadcn/ui for components
   - Lucide React for icons

3. **Device Mockup Assets**:
   - High-resolution PNG files with transparent screen areas
   - Precise dimensions matching configuration values

## 📱 Usage Flow

1. **Select Device**: Choose iPhone or Laptop mockup
2. **Upload Image**: Drag & drop or click to select image file
3. **Configure**: Toggle auto-stretch and select download format
4. **Preview**: Real-time preview updates automatically
5. **Download**: Generate and download high-quality mockup

## 🔧 Customization

### Adding New Devices

1. Add device configuration to `MOCKUP_CONFIGS`
2. Include mockup image asset
3. Update `MockupType` union type
4. Test with various image aspect ratios

### Styling Modifications

- Tailwind classes for quick design changes
- shadcn/ui component theming
- CSS custom properties for advanced styling

## 📈 Performance Considerations

- **Canvas Optimization**: Efficient rendering cycles
- **Memory Management**: Proper resource cleanup
- **File Size Handling**: Support for large image files
- **Browser Compatibility**: Canvas API support across browsers

## 🐛 Common Issues & Solutions

1. **Canvas Rendering Issues**: Ensure proper image loading before rendering
2. **File Upload Failures**: Implement proper file type validation
3. **Memory Leaks**: Clean up canvas contexts and image references
4. **Cross-Origin Issues**: Handle image loading from different domains

## 📄 License

MIT License - feel free to use this implementation as a foundation for your own projects.

---

This implementation provides a solid foundation for a professional mockup generator with room for expansion and customization based on specific requirements.
