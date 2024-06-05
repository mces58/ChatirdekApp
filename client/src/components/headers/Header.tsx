import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from 'src/constants/color/colors';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface HeaderProps {
  title: string;
  icon?: React.ReactNode;
  onIconPress?: () => void;
  disableIcon?: boolean;
  notificationCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  title,
  icon,
  onIconPress,
  disableIcon = false,
  notificationCount,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [notifCount, setNotifCount] = useState(notificationCount);

  useEffect(() => {
    setNotifCount(notificationCount);
  }, [notificationCount]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity
        onPress={onIconPress ? onIconPress : () => {}}
        style={styles.icon}
        disabled={disableIcon}
      >
        {icon}
        {(notifCount ?? 0) > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>{notifCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 100,
      backgroundColor: theme.headerBackgroundColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      borderBottomRightRadius: 25,
      borderBottomLeftRadius: 25,
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
    text: {
      fontFamily: 'Nunito-Bold',
      color: theme.textColor,
      fontSize: 24,
    },
    icon: {
      marginRight: 5,
      marginTop: 5,
    },
    notificationBadge: {
      position: 'absolute',
      top: -7,
      right: -7,
      backgroundColor: Colors.primaryColors.danger,
      borderRadius: 50,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notificationText: {
      fontFamily: 'Nunito-Bold',
      color: Colors.primaryColors.beige,
      fontSize: 12,
    },
  });
