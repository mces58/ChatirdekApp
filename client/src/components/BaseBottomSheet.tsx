import React from 'react';
import { Modal, StyleProp, View, ViewStyle } from 'react-native';

import { ScaleHorizontal, ScaleVertical } from 'src/constants/screen/screenSize';
import { useSwipeVertical } from 'src/utils/swipe';

type BaseBottomSheetProps = {
  isVisible: boolean;
  isTransparent: boolean;
  onSwipeDown: () => void;
  animationType: 'none' | 'slide' | 'fade' | undefined;
  modalStyle: StyleProp<ViewStyle>;
  content: React.JSX.Element;
};

const BaseBottomSheet = (props: BaseBottomSheetProps) => {
  const { isVisible, isTransparent, onSwipeDown, animationType, modalStyle, content } =
    props;
  const { onTouchStart, onTouchEnd } = useSwipeVertical(null, onSwipeDown, 6);
  return (
    <Modal visible={isVisible} animationType={animationType} transparent={isTransparent}>
      <View style={modalStyle} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <View
          style={{
            alignSelf: 'center',
            width: ScaleHorizontal(100),
            height: ScaleVertical(2),
            borderWidth: ScaleVertical(1.045),
            borderColor: '#000000',
            borderRadius: ScaleVertical(1),
          }}
        />
        {content}
      </View>
    </Modal>
  );
};

export default BaseBottomSheet;
