import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

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
  componentSize = { height: 100 },
  imageComponentSize = { height: 50, width: 50 },
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
          textStyles={{ fontSize: 16, color: theme.textColor }}
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
      paddingHorizontal: 15,
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
