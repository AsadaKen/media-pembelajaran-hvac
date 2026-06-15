import { Html, useProgress } from '@react-three/drei';

export default function LoadingScreen() {
  // Hook ini otomatis membaca progres pemuatan semua aset 3D (0 hingga 100)
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-surface-bright/95 backdrop-blur-md px-8 py-6 rounded-xl border border-white/10 shadow-2xl w-64 text-center">
        {/* Spinner Animasi */}
        <div className="w-10 h-10 border-4 border-surface border-t-secondary rounded-full animate-spin mb-4"></div>
        
        <h3 className="font-geist font-bold text-on-surface text-sm mb-3">
          Memuat Aset 3D
        </h3>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
          <div 
            className="h-full bg-secondary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="font-inter text-xs text-on-surface-variant mt-3">
          {progress.toFixed(0)}% Selesai
        </p>
      </div>
    </Html>
  );
}