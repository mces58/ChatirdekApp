import React from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

interface ModalWrapperProps {
  ModalComponent: React.FC<ModalProps>;
  isVisible: boolean;
  onClose: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  ModalComponent,
  isVisible,
  onClose,
}) => {
  return isVisible && <ModalComponent isVisible={isVisible} onClose={onClose} />;
};

export default ModalWrapper;
