import React, { useEffect, useState } from 'react';

import * as Font from 'expo-font';

import {
  NunitoBold,
  NunitoLight,
  NunitoMedium,
  NunitoRegular,
  NunitoSemiBold,
} from 'src/assets/fonts/nunito';
import {
  PopinsSemiBold,
  PoppinsBold,
  PoppinsLight,
  PoppinsMedium,
  PoppinsRegular,
} from 'src/assets/fonts/poppins';
import { AuthContextProvider } from 'src/context/AuthContext';
import { SocketContextProvider } from 'src/context/SocketContext';
import { ThemeProvider } from 'src/context/ThemeContext';
import AppNavigator from 'src/navigations/AppNavigator';

const loadFonts = () => {
  return Font.loadAsync({
    'Poppins-Bold': PoppinsBold,
    'Poppins-Light': PoppinsLight,
    'Poppins-Medium': PoppinsMedium,
    'Poppins-Regular': PoppinsRegular,
    'Poppins-SemiBold': PopinsSemiBold,
    'Nunito-Bold': NunitoBold,
    'Nunito-Light': NunitoLight,
    'Nunito-Medium': NunitoMedium,
    'Nunito-Regular': NunitoRegular,
    'Nunito-SemiBold': NunitoSemiBold,
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  );
}
