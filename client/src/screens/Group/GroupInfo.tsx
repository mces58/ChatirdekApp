import React, { useEffect, useMemo, useState } from 'react';
import {
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';

import ArrowIcon from 'src/assets/icons/arrow';
import CalendarIcon from 'src/assets/icons/calendar';
import DiamondIcon from 'src/assets/icons/diamond';
import IdIcon from 'src/assets/icons/id';
import PlussIcon from 'src/assets/icons/plus';
import QuotationIcon from 'src/assets/icons/quotation';
import { LogoutIcon } from 'src/assets/icons/settings';
import SetProfileValueBottomSheet from 'src/components/bottomSheet/SetProfileValueBottomSheet';
import BackHeader from 'src/components/headers/BackHeader';
import ListInfo from 'src/components/list/ListUserInfo';
import ProfileImage from 'src/components/profileContainer/ProfileImage';
import { Colors } from 'src/constants/color/colors';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { GroupInfoProps } from 'src/navigations/RootStackParamList';
import { BASE_URL } from 'src/services/baseUrl';

import AddMemberGroupBottomSheet from './components/AddMemberGroupBottomSheet';
import GroupMemberDetailModal from './components/GroupMemberDetailModal';

const GroupInfo: React.FC<GroupInfoProps> = ({ navigation, route }) => {
  const { authUser } = useAuthContext();
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupNameBoxVisible, setGroupNameBoxVisible] = useState(false);
  const [groupDescriptionBoxVisible, setGroupDescriptionBoxVisible] = useState(false);
  const [groupMemberDetailModalVisible, setGroupMemberDetailModalVisible] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState({} as any);
  const [addMemberBottomSheetVisible, setAddMemberBottomSheetVisible] = useState(false);
  const [group, setGroup] = useState({} as any);
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);

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
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      <BackHeader
        title={groupName}
        icon={<ArrowIcon width={30} height={30} direction="left" />}
        componentSize={{ height: 90 }}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <ListInfo
          title="Group Name"
          text={groupName}
          icon={<IdIcon width={30} height={30} strokeWidth={3} />}
          onPress={() => setGroupNameBoxVisible(true)}
        />

        <ListInfo
          title="Group Description"
          text={groupDescription}
          icon={<QuotationIcon width={30} height={30} />}
          onPress={() => setGroupDescriptionBoxVisible(true)}
        />

        <ListInfo
          title="Created At"
          text={group.createdAt?.split('T')[0]}
          icon={<CalendarIcon width={30} height={30} strokeWidth={1} />}
          disabled
        />

        <ListInfo
          title="Group Admin"
          text={group.owner}
          icon={<DiamondIcon width={30} height={30} />}
          disabled
        />

        <View style={styles.body}>
          <View style={styles.memberHeaderTextContainer}>
            <Text style={styles.memberHeaderText}>
              {group?.members?.length > 1
                ? group?.members?.length + ' Members'
                : group?.members?.length + ' Member'}
            </Text>
          </View>
          <View style={styles.memberContainer}>
            <View style={styles.addMemberContainer}>
              <TouchableOpacity
                style={[styles.addMemberButton, styles.shadow]}
                onPress={() => setAddMemberBottomSheetVisible(true)}
              >
                <PlussIcon
                  width={20}
                  height={20}
                  customColor={Colors.primaryColors.dark}
                />
                <Text style={styles.addMemberButtonText}>Add Members</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.leaveGroupButton, styles.shadow]}
                onPress={handleLeaveGroup}
              >
                <Text style={styles.leaveGroupButtonText}>Leave</Text>
                <LogoutIcon
                  width={20}
                  height={20}
                  customColor={Colors.primaryColors.beige}
                />
              </TouchableOpacity>
            </View>

            {group.members?.map((user: User, index: number) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.userContainer,
                    { borderBottomWidth: index === group.members.length - 1 ? 0 : 1 },
                  ]}
                  onPress={() => {
                    if (authUser?._id !== user._id) {
                      setGroupMemberDetailModalVisible(true);
                      setSelectedUser(user);
                    }
                  }}
                >
                  <ProfileImage
                    imageUri={user.profilePicture}
                    componentSize={{ width: 50, height: 50 }}
                  />

                  <Text style={styles.userName}>
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

      {groupMemberDetailModalVisible && (
        <GroupMemberDetailModal
          onClose={() => setGroupMemberDetailModalVisible(false)}
          isVisible={groupMemberDetailModalVisible}
          user={selectedUser}
          navigation={navigation}
          groupId={group?._id}
        />
      )}

      {addMemberBottomSheetVisible && (
        <AddMemberGroupBottomSheet
          isVisible={addMemberBottomSheetVisible}
          onSwipeDown={() => setAddMemberBottomSheetVisible(false)}
          navigation={navigation}
          groupId={group?._id}
        />
      )}
    </ScrollView>
  );
};

export default GroupInfo;

const createStyles = (theme: Theme, STATUSBAR_HEIGHT: number) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingTop: STATUSBAR_HEIGHT,
    },
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingBottom: 30,
    },
    body: {
      width: '100%',
      marginTop: 20,
    },
    memberHeaderTextContainer: {
      width: '100%',
      paddingHorizontal: 20,
    },
    memberHeaderText: {
      fontFamily: 'Poppins-Bold',
      fontSize: 18,
      color: theme.textColor,
    },
    memberContainer: {
      width: '100%',
      paddingHorizontal: 20,
      gap: 10,
    },
    addMemberContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    addMemberButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: Colors.primaryColors.headerColor,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 10,
    },
    addMemberButtonText: {
      color: Colors.primaryColors.dark,
      fontSize: 14,
      fontFamily: 'Nunito-Bold',
    },
    leaveGroupButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: Colors.primaryColors.linearGradient2,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 10,
    },
    leaveGroupButtonText: {
      color: Colors.primaryColors.beige,
      fontSize: 14,
      fontFamily: 'Nunito-Bold',
    },
    userContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 10,
      borderBottomColor: theme.borderColor,
    },
    userName: {
      fontFamily: 'Nunito-Bold',
      fontSize: 16,
      color: theme.textColor,
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
  });
