import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Theme, useTheme } from 'src/context/ThemeContext';

interface HeaderProps {
  title: string;
  icon?: React.ReactNode;
  onIconPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, icon, onIconPress }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity
        onPress={onIconPress ? onIconPress : () => {}}
        style={styles.icon}
      >
        {icon}
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
  });
