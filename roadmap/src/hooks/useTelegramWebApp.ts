"use client";
import { useEffect, useState } from 'react';
export const useTelegramWebApp = () => {
    const [webApp, setWebApp] = useState<typeof window.Telegram.WebApp | null>(null);
    const [user, setUser] = useState<TelegramWebAppUser | null>(null);
  
    useEffect(() => {
      const tw = window.Telegram?.WebApp;
      if (tw) {
        tw.ready();
        setWebApp(tw);
        setUser(tw.initDataUnsafe?.user || null);
  
        document.body.style.backgroundColor = tw.backgroundColor;
        document.body.style.color = tw.textColor;
        
        tw.setHeaderColor(tw.backgroundColor);
      }
    }, []);
  
    return { webApp, user };
  };
