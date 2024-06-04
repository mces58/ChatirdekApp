import React from 'react';

interface BottomSheetComponentProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

interface BottomSheetWrapperProps {
  BottomSheetComponent: React.FC<BottomSheetComponentProps>;
  isVisible: boolean;
  onSwipeDown: () => void;
}

const BottomSheetWrapper: React.FC<BottomSheetWrapperProps> = ({
  BottomSheetComponent,
  isVisible,
  onSwipeDown,
}) => {
  return (
    isVisible && <BottomSheetComponent isVisible={isVisible} onSwipeDown={onSwipeDown} />
  );
};

export default BottomSheetWrapper;
