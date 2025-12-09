import { useState, useEffect } from 'react';

export const useTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return {
    timeString: time.toLocaleTimeString([], { hour12: false }),
    dateString: time.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
  };
};
