import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import i18next from 'i18next';

import BaseModal from 'src/components/modal/BaseModal';
import { Colors } from 'src/constants/color/colors';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface ClearChatHistoryModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ClearChatHistoryModal: React.FC<ClearChatHistoryModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const content = (
    <View style={styles.modalContent}>
      <Text style={styles.title}>
        {i18next.t('settings.chatsBottomSheet.ClearChatHistoryModal.header')}
      </Text>

      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.buttonYes]}
          onPress={() => {
            console.log('Clear chat history');
            onClose();
          }}
        >
          <Text style={styles.buttonText}>{i18next.t('global.yes')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonNo]}
          onPress={() => {
            onClose();
          }}
        >
          <Text style={styles.buttonText}>{i18next.t('global.no')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return <BaseModal isVisible={isVisible} onClose={onClose} content={content} />;
};

export default ClearChatHistoryModal;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    modalContent: {
      backgroundColor: theme.backgroundColor,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      gap: 20,
    },
    title: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'Poppins-Bold',
      color: theme.textColor,
    },
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    button: {
      padding: 10,
      borderRadius: 20,
      width: '40%',
      alignItems: 'center',
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonYes: {
      backgroundColor: Colors.primaryColors.danger,
    },
    buttonNo: {
      backgroundColor: Colors.primaryColors.success,
    },
    buttonText: {
      color: Colors.primaryColors.light,
      fontSize: 16,
      fontFamily: 'Nunito-Regular',
    },
  });
