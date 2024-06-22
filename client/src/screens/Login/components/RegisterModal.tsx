import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import i18next from 'i18next';

import Button from 'src/components/button/Button';
import BaseModal from 'src/components/modal/BaseModal';
import { Colors } from 'src/constants/color/colors';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';

interface RegisterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onGoToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isVisible,
  onClose,
  onGoToLogin,
}) => {
  const content = (
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.buttonText}>X</Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{i18next.t('register.modal.header')}</Text>
        <Text style={styles.message}>{i18next.t('register.modal.subHeader')}</Text>
      </View>

      <Button
        title={i18next.t('global.login')}
        onPress={onGoToLogin}
        customStyle={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
  return <BaseModal content={content} isVisible={isVisible} onClose={onClose} />;
};

export default RegisterModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Colors.primaryColors.beige,
    paddingHorizontal: ScaleHorizontal(20),
    paddingVertical: ScaleVertical(30),
    borderRadius: ScaleHorizontal(20),
    alignItems: 'center',
    gap: 20,
  },
  closeButton: {
    width: ScaleHorizontal(30),
    height: ScaleVertical(30),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: ScaleVertical(10),
    right: ScaleHorizontal(10),
    backgroundColor: Colors.primaryColors.danger,
    borderRadius: ScaleHorizontal(50),
  },
  textContainer: {
    alignItems: 'center',
    gap: 5,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: ScaleFontSize(20),
    color: Colors.primaryColors.dark,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Nunito-Regular',
    fontSize: ScaleFontSize(13.5),
    color: Colors.primaryColors.dark,
    textAlign: 'center',
  },
  button: {
    height: ScaleVertical(40),
    paddingHorizontal: ScaleHorizontal(20),
    backgroundColor: Colors.primaryColors.primary,
    borderRadius: ScaleHorizontal(50),
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: ScaleFontSize(14),
    color: Colors.primaryColors.beige,
  },
});
