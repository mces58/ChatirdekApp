import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import axios from 'axios';

import { useAuthContext } from 'src/context/AuthContext';
import { useTheme } from 'src/context/ThemeContext';
import { BASE_URL } from 'src/services/baseUrl';

import BaseBottomSheet from './bottomSheet/BaseBottomSheet';

interface AddMemberGroupBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
  navigation: any;
  groupId: string;
}

const AddMemberGroupBottomSheet: React.FC<AddMemberGroupBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
  navigation,
  groupId,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const [friends, setFriends] = useState([] as any[]);
  const [selectedFriends, setSelectedFriends] = useState([] as string[]);
  const { authUser } = useAuthContext();

  const getFriends = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/groups/${groupId}/members/${authUser?._id}`
      );
      setFriends(res.data.nonGroupFriends);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authUser) {
      getFriends();
    }
  }, [authUser]);

  const handleAddGroup = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/groups/${groupId}/members`, {
        members: selectedFriends,
      });

      if (res.status === 201) {
        ToastAndroid.show('Members added successfully', ToastAndroid.SHORT);
      }
      console.log(selectedFriends);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      key={index}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ccc',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
      }}
      onPress={() => {
        onSwipeDown();
        navigation.navigate('UserProfile', { user: item });
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
          source={{ uri: item.profilePicture }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <Text>{item.fullName}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        {selectedFriends.includes(item._id) ? (
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setSelectedFriends((prev) => prev.filter((id) => id !== item._id));
            }}
          >
            <Text
              style={{
                color: 'white',
              }}
            >
              Remove
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setSelectedFriends([...selectedFriends, item._id]);
            }}
            style={{
              backgroundColor: '#499dff',
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: 'white',
              }}
            >
              Select
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const content = (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          marginTop: 20,
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
          gap: 15,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.color,
          }}
        >
          Add Members to Group
        </Text>

        <ScrollView
          style={{
            width: '100%',
            paddingHorizontal: 10,
            gap: 15,
          }}
          contentContainerStyle={{
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            borderColor: 'gray',
            borderWidth: 1,
            gap: 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: theme.color,
            }}
          >
            Select members
          </Text>

          <View
            style={{
              width: '100%',
              gap: 10,
            }}
          >
            {friends.length > 0 ? (
              friends.map((item, index) => renderItem({ item, index }))
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                }}
              >
                No friends found
              </Text>
            )}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={{
            backgroundColor: '#499dff',
            padding: 15,
            borderRadius: 10,
            width: '100%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => {
            handleAddGroup();
            onSwipeDown();
          }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            Add Members
          </Text>
        </TouchableOpacity>
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
        height: SCREEN_HEIGHT * 0.55,
        backgroundColor: theme.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
      }}
    />
  );
};

export default AddMemberGroupBottomSheet;
