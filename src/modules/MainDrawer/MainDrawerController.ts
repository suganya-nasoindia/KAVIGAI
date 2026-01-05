// navigation/MainDrawer/MainDrawerController.ts
import { useWindowDimensions } from 'react-native';

export const useMainDrawerController = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  const drawerOptions = {
    headerStyle: { backgroundColor: '#4682B4' },
    headerTintColor: '#fff',
    drawerType: isLargeScreen ? 'permanent' : 'front',
    drawerStyle: isLargeScreen ? undefined : { width: '75%' },
    overlayColor: 'rgba(0,0,0,0.4)',
    headerShown: true,
    drawerActiveTintColor: '#498ABF',
    drawerActiveBackgroundColor: '#003CB3',
    swipeEdgeWidth: 100,
  };

  return { isLargeScreen, drawerOptions };
};
