import { motion } from 'framer-motion';
import useAppStore from '../../stores/useAppStore';

export default function ProfilePage() {
  const setActivePage = useAppStore((state) => state.setActivePage);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-surface/40 backdrop-blur-md"
    >
      {/* Container Utama Profil */}
      <div className="relative w-full max-w-4xl bg-surface-container-highest/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Dekorasi Garis Teknis (Top Right) */}
        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-secondary opacity-30 tracking-widest uppercase">
          System-ID: PMM-2025-X1
        </div>

        {/* --- SISI KIRI: Placeholder Foto --- */}
        <div className="w-full md:w-2/5 p-10 flex flex-col items-center justify-center bg-white/5 border-r border-white/5">
          <div className="relative group">
            {/* Bingkai Foto Keren (Squircular) */}
            <div className="w-64 h-80 bg-surface-bright rounded-[2rem] border-2 border-secondary/30 overflow-hidden shadow-[0_0_30px_rgba(123,208,255,0.15)] transition-transform duration-500 group-hover:scale-105">
              <div className="w-full h-full flex items-center justify-center text-secondary/20">
                {/* Kamu bisa ganti tag <img> di sini nanti */}
                <span className="text-6xl">😊</span>
              </div>
            </div>
            {/* Dekorasi Pojok */}
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-secondary rounded-tr-xl"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-secondary rounded-bl-xl"></div>
          </div>
          
          <p className="mt-8 font-mono text-[10px] text-primary tracking-[0.2em] uppercase">
            Authorized Personnel
          </p>
        </div>

        {/* --- SISI KANAN: Informasi --- */}
        <div className="w-full md:w-3/5 p-12 flex flex-col justify-between">
          <div>
            {/* Judul Penelitian */}
            <h1 className="font-geist text-secondary font-bold text-lg leading-tight mb-8 tracking-wide border-l-4 border-secondary pl-4 uppercase">
              DESAIN SIMULASI SISTEM CHILLER, COOLING TOWER, DAN AIR HANDLING UNIT DI POLITEKNIK PENERBANGAN MAKASSAR
            </h1>

            {/* Detail Identitas */}
            <div className="space-y-6">
              <div>
                <label className="block font-mono text-[10px] text-primary/60 uppercase tracking-widest mb-1">Nama Lengkap</label>
                <p className="font-geist text-2xl font-medium text-on-surface uppercase">ARI FEBRIYANSYAH</p>
                {/* 
                  Komentar: Untuk menambah nama rekan/pembimbing, gunakan kode di bawah:
                  <p className="font-geist text-md text-on-surface-variant mt-1">Nama Rekan: [Nama Seseorang]</p>
                */}
              </div>

              <div className="flex gap-12">
                <div>
                  <label className="block font-mono text-[10px] text-primary/60 uppercase tracking-widest mb-1">Nomor Induk Taruna</label>
                  <p className="font-mono text-xl text-secondary">C1022312477</p>
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-primary/60 uppercase tracking-widest mb-1">Prodi / Jurusan</label>
                  <p className="font-geist text-lg text-on-surface">TEKNOLOGI BANDAR UDARA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bagian Bawah: Identitas Kampus */}
          <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-6">
            {/* Logo Kampus Placeholder */}
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center p-2">
               <img src="picture\logo_kampus.png" alt="🏛️" className="w-full h-full object-contain"
  />
            </div>
            <div>
              <p className="font-mono text-[10px] text-primary/60 uppercase tracking-widest">Institusi</p>
              <p className="font-geist font-bold text-sm text-on-surface uppercase tracking-wider">
                Politeknik Penerbangan Makassar
              </p>
            </div>
          </div>

          {/* Tombol Tutup */}
          <button 
            onClick={() => setActivePage('home')}
            className="absolute bottom-6 right-6 p-2 text-on-surface-variant hover:text-secondary transition-colors"
          >
            ← Kembali ke Sistem
          </button>
        </div>
      </div>
    </motion.div>
  );
}