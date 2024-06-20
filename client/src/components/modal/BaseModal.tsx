import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import { ModalAnimation } from './modalAnimation';

interface BaseModalProps {
  isVisible: boolean;
  onClose: () => void;
  content: React.ReactNode;
  animation?: ModalAnimation;
  animationTiming?: number;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isVisible,
  onClose,
  content,
  animation,
  animationTiming,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      animationIn={animation ?? ModalAnimation.SlideInUp}
      animationInTiming={animationTiming ?? 500}
      animationOutTiming={animationTiming ?? 500}
    >
      <View>{content}</View>
    </Modal>
  );
};

export default BaseModal;
