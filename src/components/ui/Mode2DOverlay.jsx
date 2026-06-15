import useAppStore from '../../stores/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Mode2DOverlay() {
  const viewMode = useAppStore((state) => state.viewMode);

  return (
    <AnimatePresence>
      {viewMode === '2d' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-20 bg-surface flex flex-col items-center justify-center"
        >
          <div className="w-[80%] max-w-4xl aspect-video bg-surface-container border border-white/10 rounded-xl shadow-2xl flex items-center justify-center relative overflow-hidden">
            {/* Placeholder untuk video siklus penuh */}
            <div className="text-on-surface text-center flex flex-col items-center">
              <span className="text-5xl mb-4">📺</span>
              <h2 className="text-2xl font-geist font-bold mb-2">Simulasi Siklus Penuh (2D)</h2>
              <p className="font-inter text-on-surface-variant text-sm">
                Video animasi operasional sistem pendingin terpusat akan diputar di sini.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}