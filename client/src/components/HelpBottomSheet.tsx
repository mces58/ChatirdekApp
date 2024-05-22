import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import DotIcon from 'src/assets/icons/dot';
import { useTheme } from 'src/context/ThemeContext';

import BaseBottomSheet from './BaseBottomSheet';

interface HelpBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const HelpBottomSheet: React.FC<HelpBottomSheetProps> = ({ isVisible, onSwipeDown }) => {
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
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.color,
          alignSelf: 'center',
        }}
      >
        How can we help you?
      </Text>

      <TextInput
        style={{
          width: '100%',
          borderWidth: 1,
          borderColor: theme.color,
          borderRadius: 10,
          padding: 10,
          color: theme.color,
        }}
        placeholder="Search Help Center"
        placeholderTextColor="#888"
      />

      <View
        style={{
          flex: 1,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.color,
          }}
        >
          Help FAQ
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: theme.background,
            gap: 10,
          }}
        >
          <DotIcon width={20} height={20} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: theme.color,
            }}
          >
            How to create a new account?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: theme.background,
            gap: 10,
          }}
        >
          <DotIcon width={20} height={20} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: theme.color,
            }}
          >
            How to reset password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: theme.background,
            gap: 10,
          }}
        >
          <DotIcon width={20} height={20} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: theme.color,
            }}
          >
            How to change email?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: theme.background,
            gap: 10,
          }}
        >
          <DotIcon width={20} height={20} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: theme.color,
            }}
          >
            How to delete account?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: theme.background,
            gap: 10,
          }}
        >
          <DotIcon width={20} height={20} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: theme.color,
            }}
          >
            How to contact support?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: theme.background,
            gap: 10,
          }}
        >
          <DotIcon width={20} height={20} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: theme.color,
            }}
          >
            How to report a bug?
          </Text>
        </TouchableOpacity>
      </View>
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

export default HelpBottomSheet;
