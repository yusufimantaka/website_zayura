"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PropertyGallery = () => {
  return (
    <section id="gallery" className="max-w-7xl mx-auto px-4 pt-16 md:pt-32 pb-12 relative z-10">
      <div className="text-center mb-16 md:mb-24 px-4">
        <h2 className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4">
          Galeri Hunian
        </h2>
        <h3 className="text-gray-900 dark:text-foreground text-4xl md:text-6xl font-serif tracking-tight mb-12 md:mb-16">
          Melihat ke dalam kenyamanan
        </h3>
        
        <Tabs defaultValue="medium" className="w-full">
          <TabsList className="flex w-fit mx-auto rounded-full bg-muted dark:bg-white/5 p-1 mb-12 md:mb-20 border border-border overflow-hidden">
            <TabsTrigger 
              value="small" 
              className="rounded-full px-4 md:px-12 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground font-bold transition-all text-[10px] md:text-[11px] uppercase tracking-[0.2em]"
            >
              Small
            </TabsTrigger>
            <TabsTrigger 
              value="medium" 
              className="rounded-full px-4 md:px-12 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground font-bold transition-all text-[10px] md:text-[11px] uppercase tracking-[0.2em]"
            >
              Medium
            </TabsTrigger>
            <TabsTrigger 
              value="large" 
              className="rounded-full px-4 md:px-12 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground font-bold transition-all text-[10px] md:text-[11px] uppercase tracking-[0.2em]"
            >
              Large
            </TabsTrigger>
          </TabsList>
          
          {['small', 'medium', 'large'].map((roomType) => (
            <TabsContent key={roomType} value={roomType} className="focus-visible:outline-none">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 h-[600px] md:h-[800px]">
                <div className="col-span-2 row-span-2 relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-2xl border border-border">
                  <Image 
                    src={`https://images.unsplash.com/photo-${roomType === 'small' ? '1522708323590-d24dbb6b0267' : roomType === 'medium' ? '1502672260266-1c1ef2d93688' : '1554995207-c18c203602cb'}?q=80&w=1200&auto=format&fit=crop`}
                    alt={`Interior Kamar Kos Putri Eksklusif Malang Tipe ${roomType.charAt(0).toUpperCase() + roomType.slice(1)}`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden group shadow-lg border border-border">
                  <Image 
                    src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop"
                    alt="Fasilitas Dapur Bersama Kos Mahasiswi Malang"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden group shadow-lg border border-border">
                  <Image 
                    src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop"
                    alt="Lobby Mewah Kos Putri Fasilitas Hotel Malang"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="col-span-2 relative rounded-2xl md:rounded-[3rem] overflow-hidden group shadow-lg border border-border">
                  <Image 
                    src="https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=1200&auto=format&fit=crop"
                    alt="Gedung Kos Eksklusif Gajayana Malang Dekat Kampus"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
