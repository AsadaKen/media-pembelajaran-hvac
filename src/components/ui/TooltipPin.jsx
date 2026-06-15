// src/components/ui/TooltipPin.jsx
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../stores/useAppStore';
import { getContrastTextClass } from '../../utils/contrast';

export default function TooltipPin({ annotation }) {
  const { hoveredAnnotation, setHoveredAnnotation } = useAppStore();
  const isActive = hoveredAnnotation === annotation.id;

  const handleClick = (e) => {
    e.stopPropagation();
    setHoveredAnnotation(annotation.id);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setHoveredAnnotation(null);
  };

  const handleDetail = (e) => {
    e.stopPropagation();
    useAppStore.getState().setActiveComponent(annotation.componentId);
    useAppStore.getState().setActivePart(annotation.id); 
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      {/* Pin Indikator */}
      <div className="w-4 h-4 bg-secondary rounded-full border-2 border-surface shadow-[0_0_10px_rgba(123,208,255,0.8)] animate-pulse" />

      {/* Kotak Konten Tooltip */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()} 
            /* PERBAIKAN: Mengubah bg-surface-container-highest (terang) menjadi bg-surface-container-lowest (gelap/hampir hitam) */
            className="absolute left-6 top-1/2 -translate-y-1/2 w-52 p-3 bg-surface-container-lowest/95 backdrop-blur-md rounded-lg border border-white/20 shadow-2xl text-left pointer-events-auto z-50"
          >
            {/* Header: Judul & Tombol Close */}
            <div className="flex justify-between items-start mb-2 border-b border-white/10 pb-1">
              <h4 className="font-geist font-semibold text-sm text-secondary">
                {annotation.label}
              </h4>
              <button 
                onClick={handleClose}
                className="text-on-surface-variant hover:text-error transition-colors font-bold text-xs p-1 leading-none"
              >
                ✕
              </button>
            </div>

            {/* Teks Deskripsi Ringkas */}
            <p className="font-inter text-xs text-on-surface leading-relaxed">
              {annotation.description}
            </p>

            {/* Tombol Lihat Detail */}
            <button
              onClick={handleDetail}
              className="mt-3 w-full py-1.5 rounded bg-surface-bright text-secondary text-xs font-geist font-semibold hover:bg-surface-container-highest border border-secondary/20 transition-colors"
            >
              Lihat Detail
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}