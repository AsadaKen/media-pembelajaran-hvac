import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../stores/useAppStore';

export default function CameraGuide() {
  const { viewMode, activePage } = useAppStore();

  return (
    <AnimatePresence>
      {/* Panduan hanya muncul saat di halaman utama (home) dan dalam mode 3D */}
      {activePage === 'home' && viewMode === '3d' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          // pointer-events-none memastikan kotak ini tidak memblokir klik mouse ke kanvas 3D
          className="absolute bottom-8 left-8 z-30 pointer-events-none"
        >
          <div className="bg-surface-container-highest/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl text-on-surface w-64">
            <h3 className="font-geist text-xs font-bold text-secondary mb-4 uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
              <span>🕹️</span> Panduan Navigasi
            </h3>
            
            <ul className="space-y-4 font-inter text-xs text-on-surface-variant">
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 shrink-0 flex items-center justify-center bg-surface-bright rounded text-sm border border-white/5 shadow-inner">🖱️</span>
                <div className="flex flex-col">
                  <strong className="text-on-surface font-semibold">Putar Kamera</strong>
                  <span>Klik Kiri + Geser</span>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 shrink-0 flex items-center justify-center bg-surface-bright rounded text-sm border border-white/5 shadow-inner">🤚</span>
                <div className="flex flex-col">
                  <strong className="text-on-surface font-semibold">Geser Model (Pan)</strong>
                  <span>Klik Kanan + Geser</span>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 shrink-0 flex items-center justify-center bg-surface-bright rounded text-sm border border-white/5 shadow-inner">🔍</span>
                <div className="flex flex-col">
                  <strong className="text-on-surface font-semibold">Perbesar / Perkecil</strong>
                  <span>Scroll Mouse / Cubit</span>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}