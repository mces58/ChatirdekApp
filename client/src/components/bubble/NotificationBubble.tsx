import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from 'src/constants/color/colors';
import { ScaleHorizontal, ScaleVertical } from 'src/constants/screen/screenSize';

const NotificationBubble = () => {
  return <View style={styles.onlineIndicator}></View>;
};

export default NotificationBubble;

const styles = StyleSheet.create({
  onlineIndicator: {
    width: ScaleHorizontal(12),
    height: ScaleVertical(12),
    borderRadius: ScaleHorizontal(50),
    backgroundColor: Colors.primaryColors.success,
    position: 'absolute',
    top: ScaleVertical(2),
    right: -ScaleHorizontal(2),
    zIndex: 10,
    borderWidth: ScaleHorizontal(1),
    borderColor: Colors.primaryColors.beige,
  },
});
