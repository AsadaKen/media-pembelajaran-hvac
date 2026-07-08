// src/components/ui/PiPWidget.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import useAppStore from '../../stores/useAppStore';
import partsData from '../../config/parts.json';

export default function PiPWidget() {
  const { isPiPVisible, setIsPiPVisible, activePart } = useAppStore();
  
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  
  // Kita set default false untuk mengantisipasi pemblokiran browser
  const [isPlaying, setIsPlaying] = useState(false); 
  
  const data = partsData.parts.find(p => p.id === activePart);

  // Fungsi khusus untuk sinkronisasi Play & Autoplay Policy Bypass
  useEffect(() => {
    if (isPiPVisible && data) {
      const playMedia = async () => {
        try {
          // Reset durasi ke awal (0 detik)
          if (videoRef.current) videoRef.current.currentTime = 0;
          if (audioRef.current) audioRef.current.currentTime = 0;

          // Coba putar video & audio secara paralel menggunakan Promise
          const playPromises = [];
          if (videoRef.current) playPromises.push(videoRef.current.play());
          if (audioRef.current) playPromises.push(audioRef.current.play());

          await Promise.all(playPromises);
          setIsPlaying(true); // Sukses berputar
          
        } catch (error) {
          // Jika masuk ke sini, artinya Browser MEMBLOKIR audio.
          // Solusi: Kita jeda videonya agar user menekan layar manual
          console.warn("Autoplay Audio diblokir browser. Membutuhkan klik pengguna.");
          if (videoRef.current) videoRef.current.pause();
          if (audioRef.current) audioRef.current.pause();
          setIsPlaying(false);
        }
      };

      playMedia();
    }
  }, [activePart, isPiPVisible, data]);

  // Fungsi saat layar diklik manual oleh pengguna (Pasti lolos blokir browser)
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      audioRef.current?.pause();
    } else {
      videoRef.current?.play();
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    setIsPiPVisible(false);
    if (audioRef.current) audioRef.current.pause();
    if (videoRef.current) videoRef.current.pause();
  };

  if (!activePart) return null;

  return (
    <AnimatePresence>
      {isPiPVisible && (
        <motion.div
          drag
          dragConstraints={{ left: -600, right: 50, top: -500, bottom: 50 }}
          dragElastic={0.1}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="absolute bottom-8 right-[32%] w-80 bg-surface-container-highest/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 overflow-hidden z-30 flex flex-col"
        >
          <div className="bg-surface-bright p-3 cursor-grab active:cursor-grabbing flex justify-between items-center border-b border-white/5">
            <span className="font-geist text-xs font-semibold text-primary tracking-wider uppercase">
              Demonstrasi: {data?.name}
            </span>
            <button onClick={handleClose} className="text-error hover:text-[#ffdad6] text-xs font-bold transition-colors">
              ✕ Tutup
            </button>
          </div>

          <div 
            className="aspect-video bg-black flex items-center justify-center relative cursor-pointer group"
            onClick={togglePlay}
            title="Klik untuk Play / Pause"
          >
            {data?.videoUrl ? (
              <>
                <video 
                  ref={videoRef}
                  key={`vid-${data.videoUrl}`}
                  src={data.videoUrl} 
                  loop
                  muted // Video TETAP muted. Suara hanya diambil dari tag <audio> di bawah
                  className="w-full h-full object-cover" 
                />
                
                {data.audioUrl && (
                  <audio 
                    ref={audioRef}
                    key={`aud-${data.audioUrl}`}
                    src={data.audioUrl}
                    loop
                  />
                )}

                {/* Layar gelap transparan + Ikon Pause saat mati */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 transition-all duration-300">
                    <span className="text-5xl text-white opacity-90 drop-shadow-lg">⏸️</span>
                  </div>
                )}
              </>
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