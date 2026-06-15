import useAppStore from '../../stores/useAppStore';
import partsData from '../../config/parts.json';
import { getContrastTextClass } from '../../utils/contrast';

export default function ComponentInfoPanel() {
  const { activePart, setActivePart, setActiveComponent, setIsPiPVisible } = useAppStore();

  // PERBAIKAN: Ubah activeComponent menjadi activePart
  if (!activePart) return null;

  // Mencari data di JSON yang cocok dengan ID komponen aktif
  const data = partsData.parts.find(p => p.id === activePart);

  if (!data) return null;

  const handleBack = () => {
    setActivePart(null);      // Tutup detail part
    setActiveComponent(null); // Reset kamera diorama
  };

  return (
    <div className="absolute right-0 top-0 w-[30%] min-w-[320px] h-full bg-surface-container-lowest/95 backdrop-blur-xl border-l border-white/10 p-6 shadow-2xl z-20 flex flex-col text-on-surface transition-transform duration-300">
      
      {/* Tombol Kembali (Reset state ke null) */}
      <button
        onClick={handleBack}
        className="mb-6 self-start text-sm font-geist font-semibold text-secondary hover:text-on-surface-variant flex items-center gap-2 transition-colors"
      >
        ← Kembali ke Diorama
      </button>

      {/* Konten Teks dari JSON */}
      <h2 className="font-geist text-2xl font-bold mb-4">{data.name}</h2>
      
      {/* Label penanda kelompok komponen utama */}
      <span className="text-xs font-mono bg-surface-bright text-secondary px-2 py-1 rounded border border-white/5 self-start mb-6 uppercase tracking-wider">
        Subsistem: {data.componentId}
      </span>

      <p className="font-inter text-sm text-on-surface-variant leading-relaxed mb-6">
        {data.description}
      </p>

      {/* Tombol Pemanggil Video PiP */}
      <button
        onClick={() => setIsPiPVisible(true)}
        className="mt-auto w-full py-3 rounded-md bg-secondary text-[#00354a] font-geist font-bold text-sm shadow-[0_0_15px_rgba(123,208,255,0.4)] hover:bg-secondary-container transition-all"
      >
        ▶ Putar Video Penjelasan
      </button>
    </div>
  );
}