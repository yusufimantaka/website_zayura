"use client";

import { useLanguageStore } from "@/lib/store";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

export const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguageStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 rounded-full border border-gray-100 hover:bg-gray-50">
          <Languages className="h-4 w-4" />
          <span className="uppercase font-bold text-xs">{lang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-2xl shadow-xl border-gray-100">
        <DropdownMenuItem 
          onClick={() => setLang('id')}
          className={`cursor-pointer rounded-xl ${lang === 'id' ? 'bg-primary/10 text-primary font-bold' : ''}`}
        >
          Bahasa Indonesia
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLang('en')}
          className={`cursor-pointer rounded-xl ${lang === 'en' ? 'bg-primary/10 text-primary font-bold' : ''}`}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

