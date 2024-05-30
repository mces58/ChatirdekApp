import React from 'react';
import { ScrollView, Text, useWindowDimensions } from 'react-native';

import { useTheme } from 'src/context/ThemeContext';

import BaseBottomSheet from './BaseBottomSheet';

interface AboutUsBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const AboutUsBottomSheet: React.FC<AboutUsBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();

  const content = (
    <ScrollView
      style={{
        flex: 1,
        marginTop: 20,
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 10,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.color,
        }}
      >
        MCES
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontWeight: '400',
          color: '#888',
          fontStyle: 'italic',
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget libero quis nisi
        vestibulum congue. Nulla facilisi. Duis vitae justo nec urna finibus tempor eget
        sed dui. Aenean nec enim tincidunt, venenatis felis non, fringilla mauris.
        Vestibulum varius dui nec ante cursus, a pulvinar risus bibendum. Integer nec
        justo eu ipsum convallis convallis. Sed nec odio eget nulla consequat malesuada.
        Sed vel odio vestibulum, consectetur nulla vel, bibendum justo. Nulla id fermentum
        tortor, nec aliquam arcu. Cras mattis odio nec libero auctor, id scelerisque nisi
        vestibulum. Nam auctor ultricies libero, vitae dapibus sem placerat a.
      </Text>
    </ScrollView>
  );

  return (
    <BaseBottomSheet
      animationType="slide"
      isTransparent
      isVisible={isVisible}
      onSwipeDown={onSwipeDown}
      content={content}
      modalStyle={{
        height: SCREEN_HEIGHT * 0.5,
        backgroundColor: theme.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
      }}
    />
  );
};

export default AboutUsBottomSheet;
