import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card pt-20 pb-10 border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/images/logo.png" 
                alt="Zayura Exclusive" 
                width={140} 
                height={50} 
                className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Pengalaman hunian eksklusif di jantung Gajayana, Malang. Fasilitas modern dengan sentuhan kenyamanan rumah.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-muted rounded-full text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="p-2 bg-muted rounded-full text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-foreground mb-6 tracking-tight">Navigasi</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-medium">
              <li><Link href="/" className="hover:text-primary transition-colors">Beranda</Link></li>
              <li><Link href="#sewa" className="hover:text-primary transition-colors">Paket Kamar</Link></li>
              <li><Link href="#gallery" className="hover:text-primary transition-colors">Galeri</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition-colors">Kontak</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-foreground mb-6 tracking-tight">Tipe Kamar</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-medium">
              <li><span className="cursor-default">Kamar Small</span></li>
              <li><span className="cursor-default">Kamar Medium</span></li>
              <li><span className="cursor-default">Kamar Large</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-foreground mb-6 tracking-tight">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>Jl. Gajayana, Lowokwaru, Malang, Jawa Timur</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Zayura Exclusive. Seluruh hak cipta dilindungi.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-foreground transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

