import { useEffect, useState } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

interface User {
  id: string;
  name: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const tg = window?.Telegram?.WebApp;

    if (tg?.initDataUnsafe?.user) {
      const telegramUser = tg.initDataUnsafe.user as TelegramUser;

      setUser({
        id: telegramUser.id.toString(),
        name: [telegramUser.first_name, telegramUser.last_name]
          .filter(Boolean)
          .join(" "),
      });
    }
  }, []);

  return { user };
}
