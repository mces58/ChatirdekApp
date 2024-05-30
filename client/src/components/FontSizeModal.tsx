import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

interface FontSizeModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const FontSizeModal: React.FC<FontSizeModalProps> = ({ isVisible, onClose }) => {
  const [selectedFontSize, setSelectedFontSize] = useState('medium');

  const handleFontSizeChange = (fontSize: string) => {
    setSelectedFontSize(fontSize);
    onClose();
  };

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
          <Text style={styles.title}>Font Size</Text>

          <View
            style={{
              width: '100%',
              gap: 20,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                gap: 10,
              }}
              onPress={() => handleFontSizeChange('small')}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderColor: 'black',
                  padding: 2,
                  borderRadius: 50,
                }}
              >
                <View
                  style={[
                    styles.defaultButton,
                    selectedFontSize === 'small' && styles.actionButton,
                  ]}
                />
              </View>
              <Text>Small</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                gap: 10,
              }}
              onPress={() => handleFontSizeChange('medium')}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderColor: 'black',
                  padding: 2,
                  borderRadius: 50,
                }}
              >
                <View
                  style={[
                    styles.defaultButton,
                    selectedFontSize === 'medium' && styles.actionButton,
                  ]}
                />
              </View>
              <Text>Medium</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                gap: 10,
              }}
              onPress={() => handleFontSizeChange('large')}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderColor: 'black',
                  padding: 2,
                  borderRadius: 50,
                }}
              >
                <View
                  style={[
                    styles.defaultButton,
                    selectedFontSize === 'large' && styles.actionButton,
                  ]}
                />
              </View>
              <Text>Large</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FontSizeModal;

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
