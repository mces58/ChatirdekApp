import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PenIcon from 'src/assets/icons/pen';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface ListInfoProps {
  title: string;
  text: string;
  icon: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

const ListInfo: React.FC<ListInfoProps> = ({
  title,
  text,
  icon,
  onPress,
  disabled = false,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.outline}>
      <TouchableOpacity style={styles.item} onPress={onPress} disabled={disabled}>
        <View style={styles.container}>
          {icon}
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>

        {!disabled && <PenIcon width={25} height={25} strokeWidth={3} />}
      </TouchableOpacity>
    </View>
  );
};

export default ListInfo;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    outline: {
      marginTop: 40,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      paddingBottom: 10,
    },
    item: {
      width: '97%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 25,
    },
    textContainer: {
      gap: 5,
    },
    headerText: {
      fontSize: 12,
      color: theme.textMutedColor,
      fontFamily: 'Nunito-Bold',
    },
    text: {
      fontSize: 16,
      color: theme.textColor,
      fontFamily: 'Poppins-SemiBold',
    },
  });
