import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import axios from 'axios';

import ArrowIcon from 'src/assets/icons/arrow';
import IdIcon from 'src/assets/icons/id';
import PenIcon from 'src/assets/icons/pen';
import AddMemberGroupBottomSheet from 'src/components/AddMemberGroup';
import SetProfileValueBottomSheet from 'src/components/bottomSheet/SetProfileValueBottomSheet';
import GroupModal from 'src/components/GroupModal';
import { useAuthContext } from 'src/context/AuthContext';
import { BASE_URL } from 'src/services/baseUrl';

interface GroupInfoRouteProps {
  groupId: string;
}

interface GroupInfoProps {
  navigation: any;
  route: RouteProp<Record<string, GroupInfoRouteProps>, string>;
}

const GroupInfo: React.FC<GroupInfoProps> = ({ navigation, route }) => {
  const { authUser } = useAuthContext();
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupNameBoxVisible, setGroupNameBoxVisible] = useState(false);
  const [groupDescriptionBoxVisible, setGroupDescriptionBoxVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({} as any);
  const [addMemberVisible, setAddMemberVisible] = useState(false);
  const [group, setGroup] = useState({} as any);

  const getGroup = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/groups/${route.params.groupId}`);
      setGroupName(res.data.group.name);
      setGroupDescription(res.data.group.description);
      setGroup(res.data.group);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGroup();
  }, [group, setGroup]);

  const handleLeaveGroup = async () => {
    try {
      await axios.delete(`${BASE_URL}/groups/${route.params.groupId}/members`, {
        headers: {
          Authorization: `Bearer ${authUser?.token}`,
        },
      });
      navigation.navigate('Group');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          width: '100%',
          backgroundColor: '#499dff',
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingTop: 52,
          paddingBottom: 16,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowIcon width={30} height={30} color="white" direction="left" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            {groupName}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: '95%',
            marginTop: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            paddingBottom: 15,
          }}
          onPress={() => setGroupNameBoxVisible(true)}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 25,
            }}
          >
            <IdIcon width={30} height={30} color="black" />
            <View
              style={{
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: 'gray',
                }}
              >
                Group Name:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text>{groupName}</Text>
              </View>
            </View>
          </View>

          <PenIcon width={25} height={25} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '95%',
            marginTop: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            paddingBottom: 15,
          }}
          onPress={() => setGroupDescriptionBoxVisible(true)}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 25,
            }}
          >
            <IdIcon width={30} height={30} color="black" />
            <View
              style={{
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: 'gray',
                }}
              >
                Group Description:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text>{groupDescription}</Text>
              </View>
            </View>
          </View>

          <PenIcon width={25} height={25} color="black" />
        </TouchableOpacity>

        <View
          style={{
            width: '95%',
            marginTop: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            paddingBottom: 15,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 25,
            }}
          >
            <IdIcon width={30} height={30} color="black" />
            <View
              style={{
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: 'gray',
                }}
              >
                Created At:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text>{group?.createdAt?.split('T')[0]} </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '95%',
            marginTop: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            paddingBottom: 15,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 25,
            }}
          >
            <IdIcon width={30} height={30} color="black" />
            <View
              style={{
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: 'gray',
                }}
              >
                Admin:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text></Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            marginTop: 20,
          }}
        >
          <View
            style={{
              width: '100%',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              {group?.members?.length > 1
                ? group?.members?.length + ' Members'
                : group?.members?.length + ' Member'}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              gap: 10,
            }}
          >
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                paddingVertical: 20,
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
                onPress={() => setAddMemberVisible(true)}
              >
                <Text>icon</Text>
                <Text>Add Members</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLeaveGroup}>
                <Text>Leave</Text>
              </TouchableOpacity>
            </View>

            {group.members?.map((user, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    paddingVertical: 10,
                    borderBottomWidth: index === group.members.length - 1 ? 0 : 1,
                    borderBottomColor: 'lightgray',
                  }}
                  onPress={() => {
                    if (authUser?._id !== user._id) {
                      setModalVisible(true);
                      setSelectedUser(user);
                    }
                  }}
                >
                  <Image
                    source={{
                      uri: user.profilePicture,
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 20,
                    }}
                  />

                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    {authUser?._id === user._id ? 'You' : user.fullName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {groupNameBoxVisible && (
        <SetProfileValueBottomSheet
          title="Group Name"
          placeholder="Enter Group Name"
          isVisible={groupNameBoxVisible}
          onSwipeDown={() => setGroupNameBoxVisible(false)}
          setValue={(value: string) => {
            setGroupName(value);
          }}
          value={groupName}
        />
      )}

      {groupDescriptionBoxVisible && (
        <SetProfileValueBottomSheet
          title="Group Description"
          placeholder="Enter Group Description"
          isVisible={groupDescriptionBoxVisible}
          onSwipeDown={() => setGroupDescriptionBoxVisible(false)}
          setValue={(value: string) => {
            setGroupDescription(value);
          }}
          value={groupDescription}
        />
      )}

      {modalVisible && (
        <GroupModal
          onClose={() => setModalVisible(false)}
          isVisible={modalVisible}
          user={selectedUser}
          navigation={navigation}
          groupId={group?._id}
        />
      )}

      {addMemberVisible && (
        <AddMemberGroupBottomSheet
          isVisible={addMemberVisible}
          onSwipeDown={() => setAddMemberVisible(false)}
          navigation={navigation}
          groupId={group?._id}
        />
      )}
    </ScrollView>
  );
};

export default GroupInfo;
