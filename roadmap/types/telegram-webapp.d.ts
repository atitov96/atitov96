declare global {
  interface TelegramWebAppUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
  }

  interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    MainButton: {
      show: () => void;
      hide: () => void;
      setText: (text: string) => void;
      onClick: (fn: () => void) => void;
    };
    onEvent: (eventType: string, callback: () => void) => void;
    setHeaderColor: (color: string) => void;
    backgroundColor: string;
    textColor: string;
    initDataUnsafe: {
      user?: TelegramWebAppUser;
    };
  }

  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export {}; 