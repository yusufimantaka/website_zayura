"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const PropertyGallery = () => {
  return (
    <section id="gallery" className="max-w-7xl mx-auto px-4 pt-32 pb-12 relative z-10">
      <div className="text-center mb-16 px-4">
        <h2 className="text-gray-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">
          Galeri Hunian
        </h2>
        <h3 className="text-gray-900 dark:text-foreground text-3xl md:text-5xl font-extrabold tracking-tight mb-12">
          Melihat ke dalam kenyamanan
        </h3>
        
        <Tabs defaultValue="medium" className="w-full">
          <TabsList className="flex w-fit mx-auto rounded-full bg-white/50 dark:bg-white/5 p-1 mb-16 border border-gray-100 dark:border-white/10 backdrop-blur-sm shadow-sm">
            <TabsTrigger 
              value="small" 
              className="rounded-full px-6 md:px-10 py-3 data-[state=active]:bg-[#FFBF00] data-[state=active]:text-gray-900 text-gray-500 dark:text-zinc-400 font-bold transition-all text-sm tracking-tight border border-transparent dark:data-[state=inactive]:hover:bg-white/5"
            >
              Tipe Small
            </TabsTrigger>
            <TabsTrigger 
              value="medium" 
              className="rounded-full px-6 md:px-10 py-3 data-[state=active]:bg-[#FFBF00] data-[state=active]:text-gray-900 text-gray-500 dark:text-zinc-400 font-bold transition-all text-sm tracking-tight border border-transparent dark:data-[state=inactive]:hover:bg-white/5"
            >
              Tipe Medium
            </TabsTrigger>
            <TabsTrigger 
              value="large" 
              className="rounded-full px-6 md:px-10 py-3 data-[state=active]:bg-[#FFBF00] data-[state=active]:text-gray-900 text-gray-500 dark:text-zinc-400 font-bold transition-all text-sm tracking-tight border border-transparent dark:data-[state=inactive]:hover:bg-white/5"
            >
              Tipe Large
            </TabsTrigger>
          </TabsList>
          
          {['small', 'medium', 'large'].map((roomType) => (
            <TabsContent key={roomType} value={roomType} className="focus-visible:outline-none">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 h-[500px] md:h-[700px]">
                <div className="col-span-2 row-span-2 relative rounded-[2.5rem] overflow-hidden group shadow-xl border border-gray-50 dark:border-white/5">
                  <Image 
                    src={`https://images.unsplash.com/photo-${roomType === 'small' ? '1522708323590-d24dbb6b0267' : roomType === 'medium' ? '1502672260266-1c1ef2d93688' : '1554995207-c18c203602cb'}?q=80&w=1200&auto=format&fit=crop`}
                    alt={`${roomType} room`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="relative rounded-[2.5rem] overflow-hidden group shadow-lg border border-gray-50 dark:border-white/5">
                  <Image 
                    src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop"
                    alt="Kitchen"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="relative rounded-[2.5rem] overflow-hidden group shadow-lg border border-gray-50 dark:border-white/5">
                  <Image 
                    src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=800&auto=format&fit=crop"
                    alt="Lounge"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="col-span-2 relative rounded-[2.5rem] overflow-hidden group shadow-lg border border-gray-50 dark:border-white/5">
                  <Image 
                    src="https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=1200&auto=format&fit=crop"
                    alt="Exterior"
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
