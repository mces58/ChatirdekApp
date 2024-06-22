import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { User } from 'src/constants/types/user';
import { Theme, useTheme } from 'src/context/ThemeContext';

import ProfileContainerWithOnline from '../profileContainer/ProfileContainerWithOnline';

interface BackHeaderWithImageProps {
  icon?: React.ReactNode;
  user?: User;
  onPressIcon?: () => void;
  onPressHeader?: () => void;
  componentSize?: StyleProp<ViewStyle> & { height: number };
  imageComponentSize?: StyleProp<ViewStyle> & { height: number; width: number };
}

const BackHeaderWithImage: React.FC<BackHeaderWithImageProps> = ({
  icon,
  user,
  onPressIcon,
  onPressHeader,
  componentSize = { height: ScaleVertical(85) },
  imageComponentSize = { width: ScaleHorizontal(40), height: ScaleVertical(40) },
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.container, componentSize]}>
      <TouchableOpacity onPress={onPressIcon}>{icon}</TouchableOpacity>
      <TouchableOpacity onPress={onPressHeader} style={{ flex: 1 }}>
        <ProfileContainerWithOnline
          user={user!}
          showUserNames={false}
          componentSize={imageComponentSize}
          textStyles={{ fontSize: ScaleFontSize(13), color: theme.textColor }}
          disabled
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackHeaderWithImage;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.headerBackgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: ScaleHorizontal(10),
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
  });
