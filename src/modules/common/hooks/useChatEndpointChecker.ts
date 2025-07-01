import { useState, useCallback, useEffect } from 'react';

export function useChatEndpointChecker() {
  const [chatEnabled, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const check = useCallback(async () => {
    setIsChecking(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_CHAT_URL || '/chat', {
        method: 'OPTIONS',
      });
      const ok = res.ok;
      setIsAvailable(ok);
      return ok;
    } catch (err) {
      console.error('Chat endpoint check failed:', err);
      setIsAvailable(false);
      return false;
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return { chatEnabled, isChecking, check };
}
