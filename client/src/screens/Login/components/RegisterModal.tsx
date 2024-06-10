import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Button from 'src/components/button/Button';
import BaseModal from 'src/components/modal/BaseModal';
import { Colors } from 'src/constants/color/colors';

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
        <Text style={styles.title}>Registration Successful</Text>
        <Text style={styles.message}>Your registration was completed successfully!</Text>
      </View>

      <Button
        title="Login"
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
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    alignItems: 'center',
    gap: 20,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.primaryColors.danger,
    borderRadius: 50,
  },
  textContainer: {
    alignItems: 'center',
    gap: 5,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.primaryColors.dark,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.primaryColors.dark,
    textAlign: 'center',
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.primaryColors.primary,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.primaryColors.beige,
  },
});
