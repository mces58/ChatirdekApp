import React from 'react';

import { AuthContextProvider } from 'src/context/AuthContext';
import AppNavigator from 'src/navigations/AppNavigator';

export default function App() {
  return (
    <AuthContextProvider>
      <AppNavigator />
    </AuthContextProvider>
  );
}
