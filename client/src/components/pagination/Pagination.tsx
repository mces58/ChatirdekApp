import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import i18next from 'i18next';

import { Colors } from 'src/constants/color/colors';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.shadow, currentPage === 1 && styles.disabled]}
        onPress={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text style={styles.text}>{i18next.t('global.previous')}</Text>
      </TouchableOpacity>

      {Array.from({ length: totalPages }, (_, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, currentPage === index + 1 && styles.active]}
          onPress={() => handlePageChange(index + 1)}
        >
          <Text style={styles.text}>{index + 1}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[
          styles.button,
          styles.shadow,
          currentPage === totalPages && styles.disabled,
        ]}
        onPress={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Text style={styles.text}>{i18next.t('global.next')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      marginVertical: 5,
    },
    button: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: theme.textColor,
      borderRadius: 10,
    },
    active: {
      backgroundColor: Colors.primaryColors.danger,
    },
    disabled: {
      backgroundColor: theme.borderColor,
    },
    text: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: 14,
      color: theme.backgroundColor,
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
