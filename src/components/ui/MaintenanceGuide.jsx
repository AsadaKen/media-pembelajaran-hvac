// src/components/ui/MaintenanceGuide.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../stores/useAppStore';
import guideData from '../../config/maintenanceGuide.json';

export default function MaintenanceGuide() {
  const { activePage, setActivePage } = useAppStore();
  
  // State untuk melacak posisi navigasi pengguna
  const [activeCatIdx, setActiveCatIdx] = useState(0);
  const [activeSubIdx, setActiveSubIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Kembalikan ke halaman pertama setiap kali berpindah kategori atau subtopik
  useEffect(() => {
    setActiveSubIdx(0);
    setCurrentPage(0);
  }, [activeCatIdx]);

  useEffect(() => {
    setCurrentPage(0);
  }, [activeSubIdx]);

  // Hanya render jika halaman yang aktif adalah 'guide'
  if (activePage !== 'guide') return null;

  const category = guideData.categories[activeCatIdx];
  const subtopic = category?.subtopics[activeSubIdx];
  const pageData = subtopic?.pages[currentPage];
  const totalPages = subtopic?.pages?.length || 0;

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
      >
        <div className="w-full max-w-7xl h-[90vh] md:h-[85vh] flex gap-4 font-inter text-on-surface">
          
          {/* PANEL KIRI: Navigasi Kategori Utama */}
          <div className="w-[240px] md:w-[280px] bg-surface-container-highest/95 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl shrink-0">
            <div className="p-4 bg-surface-bright border-b border-white/10 flex items-center justify-between">
              <span className="font-geist font-bold text-primary tracking-wider uppercase text-xs md:text-sm">Buku Panduan</span>
              <button 
                onClick={() => setActivePage('home')}
                className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-error/20 text-error rounded-lg hover:bg-error hover:text-white transition-colors"
                title="Tutup Panduan"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {guideData.categories.map((cat, idx) => {
                const isActive = activeCatIdx === idx;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCatIdx(idx)}
                    className={`px-4 py-3 text-left rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary text-[#003258] shadow-[0_0_15px_rgba(123,208,255,0.4)]' 
                        : 'bg-surface hover:bg-white/5 text-on-surface-variant'
                    }`}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PANEL KANAN: Konten Materi */}
          <div className="flex-1 bg-surface-container-highest/95 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl relative">
            
            <div className="flex-1 flex overflow-hidden">
              
              {/* KOLOM DALAM KIRI: Daftar Subtopik */}
              <div className="w-[30%] max-w-[250px] border-r border-white/10 p-3 md:p-4 overflow-y-auto flex flex-col gap-2 bg-black/20 shrink-0">
                {category?.subtopics.map((sub, idx) => {
                  const isActive = activeSubIdx === idx;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setActiveSubIdx(idx)}
                      className={`px-3 md:px-4 py-3 text-left rounded-lg text-xs md:text-sm transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary/20 text-primary border-l-4 border-primary font-bold' 
                          : 'text-on-surface-variant hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                      }`}
                    >
                      {sub.title}
                    </button>
                  );
                })}
              </div>

              {/* KOLOM DALAM KANAN: Area Penjelasan (Render Halaman) */}
              <div className="flex-1 p-4 md:p-6 relative flex flex-col bg-surface-container-lowest/30">
                <AnimatePresence mode="wait">
                  {pageData && (
                    <motion.div
                      key={`${activeCatIdx}-${activeSubIdx}-${currentPage}`} 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 flex flex-col overflow-y-auto pb-20"
                    >
                      {/* Area Media */}
                      <div className="w-full aspect-video bg-black rounded-xl border border-white/10 mb-6 overflow-hidden flex items-center justify-center relative shadow-inner shrink-0">
                        {pageData.mediaType === 'video' ? (
                          <video src={pageData.mediaUrl} autoPlay loop muted className="w-full h-full object-cover opacity-90" />
                        ) : pageData.mediaType === 'image' ? (
                          <img src={pageData.mediaUrl} alt={pageData.title} className="w-full h-full object-cover opacity-90" />
                        ) : (
                          <span className="text-4xl md:text-6xl opacity-30">⚙️</span>
                        )}
                        
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 md:p-6 pt-12 md:pt-16">
                          <h3 className="text-xl md:text-2xl font-geist font-bold text-white drop-shadow-md">{pageData.title}</h3>
                        </div>
                      </div>

                      {/* Deskripsi */}
                      {pageData.description && (
                        <p className="text-on-surface-variant text-sm leading-relaxed mb-5 md:mb-6">
                          {pageData.description}
                        </p>
                      )}

                      {/* Daftar Langkah */}
                      {pageData.steps && (
                        <ul className="flex flex-col gap-3 mb-6">
                          {pageData.steps.map((step, i) => (
                            <li key={i} className="flex gap-3 items-start text-sm text-on-surface">
                              <span className="w-6 h-6 shrink-0 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs border border-primary/30 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="pt-1 leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Peringatan (Warning) */}
                      {pageData.warning && (
                        <div className="mt-auto bg-error/10 border-l-4 border-error rounded-r-lg p-4 flex gap-3 items-start">
                          <span className="text-error text-lg mt-0.5">⚠️</span>
                          <p className="text-sm text-[#ffb4ab] font-medium leading-relaxed">
                            {pageData.warning}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Kontrol Navigasi Halaman (Hanya muncul jika halaman lebih dari 1) */}
                {totalPages > 1 && (
                  <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center items-center gap-4 md:gap-6 pt-4 bg-gradient-to-t from-surface-container-highest via-surface-container-highest/90 to-transparent">
                    <button 
                      onClick={handlePrev}
                      disabled={currentPage === 0}
                      className="w-10 h-10 rounded-full bg-surface-bright border border-white/10 flex items-center justify-center text-on-surface disabled:opacity-30 hover:bg-primary hover:text-[#003258] transition-all"
                    >
                      ◄
                    </button>
                    
                    <div className="bg-black/60 px-5 py-2 rounded-full border border-white/10 font-geist font-bold tracking-widest text-sm text-primary">
                      <span className="text-white">{currentPage + 1}</span> <span className="text-on-surface-variant mx-1">/</span> {totalPages}
                    </div>

                    <button 
                      onClick={handleNext}
                      disabled={currentPage === totalPages - 1}
                      className="w-10 h-10 rounded-full bg-surface-bright border border-white/10 flex items-center justify-center text-on-surface disabled:opacity-30 hover:bg-primary hover:text-[#003258] transition-all"
                    >
                      ►
                    </button>
                  </div>
                )}
                
              </div>
            </div>
          </div>
          
        </div>
      </motion.div>
    </AnimatePresence>
  );
}