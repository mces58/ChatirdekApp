import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from 'src/constants/color/colors';

const NotificationBubble = () => {
  return <View style={styles.onlineIndicator}></View>;
};

export default NotificationBubble;

const styles = StyleSheet.create({
  onlineIndicator: {
    width: 15,
    height: 15,
    borderRadius: 99,
    backgroundColor: Colors.primaryColors.success,
    position: 'absolute',
    top: 2,
    right: -2,
    zIndex: 10,
    borderWidth: 1,
    borderColor: Colors.primaryColors.beige,
  },
});
