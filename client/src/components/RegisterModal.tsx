import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

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
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        animationIn={'zoomIn'}
        animationInTiming={1000}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'red',
              padding: 5,
              borderRadius: 50,
            }}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Registration Successful</Text>
          <Text style={styles.message}>
            Your registration was completed successfully!
          </Text>
          <TouchableOpacity style={styles.button} onPress={onGoToLogin}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default RegisterModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
