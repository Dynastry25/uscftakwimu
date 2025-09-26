import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageLoad = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      setIsLoading(true); // Reset on unmount
    };
  }, [location.pathname]);

  return isLoading;
};