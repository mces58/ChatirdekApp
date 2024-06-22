import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Colors } from 'src/constants/color/colors';

interface LoadingIndicatorProps {
  color?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  color = Colors.primaryColors.info,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
