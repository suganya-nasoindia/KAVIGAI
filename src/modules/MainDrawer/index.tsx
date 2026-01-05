// navigation/MainDrawer/index.tsx
import React from 'react';
import MainDrawerView from './MainDrawerView';
import { useMainDrawerController } from './MainDrawerController';

export default function MainStack() {
  const { drawerOptions } = useMainDrawerController();
  return <MainDrawerView drawerOptions={drawerOptions} />;
}
