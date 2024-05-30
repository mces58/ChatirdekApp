import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import axios from 'axios';

import CreateGroupIcon from 'src/assets/icons/create-group';
import CreateGroupBottomSheet from 'src/components/CreateGroupBottomSheet';
import { useAuthContext } from 'src/context/AuthContext';
import { BASE_URL } from 'src/services/baseUrl';

interface GroupProps {
  navigation: any;
}

const Group: React.FC<GroupProps> = ({ navigation }) => {
  const [createGroupBottomSheetVisible, setCreateGroupBottomSheetVisible] =
    useState<boolean>(false);
  const [groups, setGroups] = useState([] as any[]);
  const { authUser } = useAuthContext();

  const getGroups = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/groups`, {
        headers: {
          Authorization: `Bearer ${authUser?.token}`,
        },
      });
      setGroups(res.data.groups);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authUser) {
      getGroups();
    }
  }, [
    authUser,
    createGroupBottomSheetVisible,
    navigation,
    groups,
    groups.map((groups) => groups.members),
    setGroups,
  ]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 24,
      }}
    >
      <View
        style={{
          backgroundColor: '#499dff',
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          justifyContent: 'space-between',
          paddingVertical: 32,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            color: 'white',
          }}
        >
          Groups
        </Text>

        <TouchableOpacity onPress={() => setCreateGroupBottomSheetVisible(true)}>
          <CreateGroupIcon width={30} height={30} color="white" strokeWidth={1} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          padding: 20,
          flex: 1,
          gap: 20,
        }}
      >
        {groups?.map((group, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#ccc',
              width: '100%',
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate('GroupChat', { groupId: group._id });
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                {group.name}
              </Text>

              <Text>
                {group.members.length} member{group.members.length > 1 ? 's' : ''}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {createGroupBottomSheetVisible && (
        <CreateGroupBottomSheet
          isVisible={createGroupBottomSheetVisible}
          onSwipeDown={() => setCreateGroupBottomSheetVisible(false)}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default Group;
