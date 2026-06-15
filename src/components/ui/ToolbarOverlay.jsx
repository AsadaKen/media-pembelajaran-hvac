import useAppStore from '../../stores/useAppStore';
import { User } from 'lucide-react';
import { UserCircle2 } from 'lucide-react';

export default function ToolbarOverlay() {
  // Mengambil state dan fungsi pengubahnya dari Zustand
  const { isXRayActive, toggleXRay, viewMode, setViewMode } = useAppStore();

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 flex gap-4 p-2 rounded-lg bg-surface-container/60 backdrop-blur-md border border-white/10 shadow-lg text-on-surface">
      
    {/* Tombol Profile */}
      <button
  onClick={() => useAppStore.getState().setActivePage('profile')}
  className="
    flex items-center justify-center
    px-3 py-2
    rounded-xl
    bg-surface-bright/80
    hover:bg-surface-container-highest
    border border-white/10
    transition-all duration-200
  "
  title="Profil"
>
  <UserCircle2
    size={26}
    className="text-cyan-400"
    strokeWidth={1.8}
  />
</button>
    
    {/* Tombol X-Ray / Detail */}
      <button 
        onClick={toggleXRay}
        className={`px-4 py-2 rounded-md font-geist font-semibold text-sm transition-colors ${
          isXRayActive 
            ? 'bg-secondary text-[#00354a]' 
            : 'bg-surface-bright text-on-surface hover:bg-surface-container-highest'
        }`}
      >
        {/* PERUBAHAN 2: Logika pengecekan teks berdasarkan viewMode */}
        {viewMode === '2d' 
          ? (isXRayActive ? 'Detail: ON' : 'Detail: OFF') // Tampilan saat Mode 2D
          : (isXRayActive ? 'X-Ray: ON' : 'X-Ray: OFF')   // Tampilan saat Mode 3D
        }
      </button>

      {/* Tombol Toggle Mode 2D/3D */}
      <button 
        onClick={() => setViewMode(viewMode === '3d' ? '2d' : '3d')}
        className="px-4 py-2 rounded-md font-geist font-semibold text-sm bg-surface-bright hover:bg-surface-container-highest transition-colors"
      >
        Mode: {viewMode === '3d' ? '3D Interaktif' : '2D Video'}
      </button>
      
    </div>
  );
}