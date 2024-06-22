import React from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

import CrossIcon from 'src/assets/icons/cross';
import { Colors } from 'src/constants/color/colors';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';

interface ProfileModalProps {
  imageUri: string;
  isVisible: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ imageUri, isVisible, onClose }) => {
  const content = (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
          <CrossIcon
            width={ScaleHorizontal(18)}
            height={ScaleVertical(18)}
            customColor={Colors.primaryColors.beige}
          />
        </TouchableOpacity>
        <Image source={{ uri: imageUri }} style={styles.fullScreenImage} />
      </View>
    </Modal>
  );
  return content;
};

export default ProfileModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 15,
  },
  modalCloseButton: {
    position: 'absolute',
    top: ScaleVertical(30),
    right: ScaleHorizontal(15),
    zIndex: 1,
  },
  modalCloseText: {
    color: Colors.primaryColors.beige,
    fontSize: ScaleFontSize(18),
  },
  fullScreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
