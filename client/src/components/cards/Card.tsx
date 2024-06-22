import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface CardProps {
  title: string;
  text: string;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, text, icon }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}:</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
      {icon}
    </View>
  );
};

export default Card;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '90%',
      backgroundColor: theme.cardColor,
      paddingHorizontal: ScaleHorizontal(20),
      paddingVertical: ScaleVertical(12),
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: ScaleHorizontal(30),
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    title: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: ScaleFontSize(12),
      color: theme.textColor,
    },
    text: {
      fontFamily: 'Poppins-Regular',
      fontSize: ScaleFontSize(12),
      color: theme.textColor,
    },
    shadow: {
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
