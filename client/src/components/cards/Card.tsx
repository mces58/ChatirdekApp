import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    <View style={styles.container}>
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
      paddingHorizontal: 25,
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 30,
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
      fontSize: 14,
      color: theme.textColor,
    },
    text: {
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      color: theme.textColor,
    },
  });
