import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

interface ClearChatHistoryModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ClearChatHistoryModal: React.FC<ClearChatHistoryModalProps> = ({
  isVisible,
  onClose,
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
          <Text style={styles.title}>Are you sure you want to clear chat history?</Text>

          <View
            style={{
              width: '100%',
              gap: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log('Clear chat history');
                onClose();
              }}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onClose();
              }}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ClearChatHistoryModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
  actionButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    height: 10,
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultButton: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    height: 10,
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
