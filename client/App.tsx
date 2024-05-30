import React from 'react';

import { AuthContextProvider } from 'src/context/AuthContext';
import { SocketContextProvider } from 'src/context/SocketContext';
import { ThemeProvider } from 'src/context/ThemeContext';
import AppNavigator from 'src/navigations/AppNavigator';

export default function App() {
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
