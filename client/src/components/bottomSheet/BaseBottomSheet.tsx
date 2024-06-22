import React, { useMemo } from 'react';
import { Modal, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { ScaleHorizontal, ScaleVertical } from 'src/constants/screen/screenSize';
import { Theme, useTheme } from 'src/context/ThemeContext';
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
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Modal visible={isVisible} animationType={animationType} transparent={isTransparent}>
      <View
        style={[modalStyle, styles.shadow]}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <View
          style={{
            alignSelf: 'center',
            width: ScaleHorizontal(100),
            height: ScaleVertical(1),
            borderWidth: ScaleHorizontal(3.045),
            borderColor: theme.borderColor,
            borderRadius: ScaleHorizontal(10),
            backgroundColor: theme.borderColor,
          }}
        />
        {content}
      </View>
    </Modal>
  );
};

export default BaseBottomSheet;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 30,
    },
  });
