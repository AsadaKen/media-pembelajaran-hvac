// src/App.jsx
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import MainScene from './components/scene/MainScene';
import ToolbarOverlay from './components/ui/ToolbarOverlay';
import ComponentInfoPanel from './components/ui/ComponentInfoPanel';
import PiPWidget from './components/ui/PiPWidget';
import Mode2DOverlay from './components/ui/Mode2DOverlay';
import LoadingScreen from './components/ui/LoadingScreen';
import ErrorBoundary from './components/ui/ErrorBoundary';
import useAppStore from './stores/useAppStore';
import ProfilePage from './components/ui/ProfilePage';
import CameraGuide from './components/ui/CameraGuide';
import MaintenanceGuide from './components/ui/MaintenanceGuide'; // TAMBAHAN 1: Impor komponen baru
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const { viewMode, activePage } = useAppStore();
  const setHoveredAnnotation = useAppStore((state) => state.setHoveredAnnotation);

  const handleDoubleClickOutside = () => {
    if (useAppStore.getState().hoveredAnnotation) {
      setHoveredAnnotation(null);
    }
  };

  return (
    <div 
      className="w-full h-screen bg-surface relative overflow-hidden text-on-surface"
      onDoubleClick={handleDoubleClickOutside}
    >
      {/* --- KELOMPOK UI (ANTARMUKA 2D) --- */}
      <ToolbarOverlay />
      <ComponentInfoPanel />
      <PiPWidget />
      <Mode2DOverlay />
      <CameraGuide />

      <AnimatePresence>
        {activePage === 'profile' && <ProfilePage />}
      </AnimatePresence>
      
      {/* TAMBAHAN 2: Memanggil Antarmuka Buku Panduan */}
      <MaintenanceGuide />
      
      {/* --- KELOMPOK 3D (KANVAS WEBGL) --- */}
      <div className={`absolute inset-0 z-0 w-full h-full ${viewMode === '3d' ? 'block' : 'hidden'}`}>
        <ErrorBoundary>
          <Canvas>
            <Suspense fallback={<LoadingScreen />}>
              <MainScene />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

    </div>
  );
}