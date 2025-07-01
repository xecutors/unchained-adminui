import { useState, useMemo } from 'react';

export function useChatEndpointChecker() {
  const [loading, setLoading] = useState(false);

  const chatEnabled = useMemo(async () => {
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_CHAT_URL || '/chat', {
        method: 'OPTIONS',
      });
      return res.ok;
    } catch (err) {
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { chatEnabled, loading };
}
