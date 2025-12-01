import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useWelcomeController = (data: any[], interval = 4000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<any>();

  // Auto Play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === data.length - 1 ? prev : prev + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const onNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('StartJourneyScreen');
    }
  };

  const onSnapToItem = (index: number) => setCurrentIndex(index);

  return { currentIndex, onNext, onSnapToItem };
};
