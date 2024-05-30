import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { useTheme } from 'src/context/ThemeContext';

import BaseBottomSheet from './BaseBottomSheet';

interface BlockContactsBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const BlockContactsBottomSheet: React.FC<BlockContactsBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();

  const content = (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
          gap: 30,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.color,
          }}
        >
          Blocked Contacts
        </Text>

        <TextInput
          style={{
            width: '100%',
            height: 40,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 10,
            color: theme.color,
          }}
          placeholder="Search"
          placeholderTextColor={'#666'}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 30,
          }}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Image
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                style={{ width: 50, height: 50, borderRadius: 50 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: theme.color,
                }}
              >
                John Doe
              </Text>
            </View>

            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                }}
              >
                Block
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Image
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                style={{ width: 50, height: 50, borderRadius: 50 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: theme.color,
                }}
              >
                John Doe
              </Text>
            </View>

            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                }}
              >
                Block
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Image
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                style={{ width: 50, height: 50, borderRadius: 50 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: theme.color,
                }}
              >
                John Doe
              </Text>
            </View>

            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                }}
              >
                Block
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Image
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                style={{ width: 50, height: 50, borderRadius: 50 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: theme.color,
                }}
              >
                John Doe
              </Text>
            </View>

            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                }}
              >
                Block
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <BaseBottomSheet
      animationType="slide"
      isTransparent
      isVisible={isVisible}
      onSwipeDown={onSwipeDown}
      content={content}
      modalStyle={{
        height: SCREEN_HEIGHT * 0.7,
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

export default BlockContactsBottomSheet;
