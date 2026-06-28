// src/components/ui/Mode2DOverlay.jsx
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../stores/useAppStore';
import componentsData from '../../config/components.json';

export default function Mode2DOverlay() {
  const viewMode = useAppStore((state) => state.viewMode);
  
  // Mencari data siklus dari components.json
  const data2D = componentsData.components.find(c => c.id === 'siklus_sistem_pendingin');

  return (
    <AnimatePresence>
      {viewMode === '2d' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          // Mengubah kontainer menjadi memenuhi layar penuh mutlak
          className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {data2D?.videoUrlMode2D ? (
            <video 
              src={data2D.videoUrlMode2D} 
              autoPlay 
              loop           // Menambahkan efek perulangan tanpa henti
              muted          // Menambahkan muted (Opsional, tapi sangat disarankan agar browser tidak memblokir autoPlay)
              // object-cover memastikan video memenuhi seluruh layar tanpa ruang hitam
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-on-surface text-center flex flex-col items-center">
              <span className="text-5xl mb-4">📺</span>
              <h2 className="text-2xl font-geist font-bold mb-2">Menunggu Video 2D</h2>
              <p className="font-inter text-on-surface-variant text-sm">
                Cek pengaturan URL video di components.json.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}