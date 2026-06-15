import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../stores/useAppStore';
import componentsData from '../../config/components.json';
import partsData from '../../config/parts.json';

export default function PiPWidget() {
  const { isPiPVisible, setIsPiPVisible, activePart } = useAppStore();
  
  // Jangan render apapun jika tidak ada komponen yang dipilih
  if (!activePart) return null;
  
  const data = partsData.parts.find(p => p.id === activePart);

  return (
    <AnimatePresence>
      {isPiPVisible && (
        <motion.div
          drag
          dragConstraints={{ left: -600, right: 50, top: -500, bottom: 50 }} // Batas area geser
          dragElastic={0.1}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="absolute bottom-8 right-[32%] w-80 bg-surface-container-highest/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 overflow-hidden z-30 flex flex-col"
        >
          {/* Header & Area Drag */}
          <div className="bg-surface-bright p-3 cursor-grab active:cursor-grabbing flex justify-between items-center border-b border-white/5">
            <span className="font-geist text-xs font-semibold text-primary tracking-wider uppercase">
              Demonstrasi: {data?.name}
            </span>
            <button onClick={() => setIsPiPVisible(false)} className="text-error hover:text-[#ffdad6] text-xs font-bold">
              ✕ Tutup
            </button>
          </div>

          {/* Area Konten Video / Placeholder */}
          <div className="aspect-video bg-surface-container-lowest flex items-center justify-center relative">
            {data?.videoUrl ? (
              <video src={data.videoUrl} controls className="w-full h-full object-cover" />
            ) : (
              <div className="text-on-surface-variant font-inter text-xs flex flex-col items-center opacity-70">
                <span className="text-2xl mb-2">🎞️</span>
                Video {data?.name} segera hadir
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}