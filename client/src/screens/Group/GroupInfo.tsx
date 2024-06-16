import React, { useEffect, useMemo, useState } from 'react';
import {
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import i18next from 'i18next';
import { jwtDecode } from 'jwt-decode';

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
import { Group } from 'src/constants/types/group';
import { Response } from 'src/constants/types/response';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { GroupInfoProps } from 'src/navigations/RootStackParamList';
import groupService from 'src/services/group-service';

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
  const [group, setGroup] = useState<Group>({} as Group);
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);
  const [meId, setMeId] = useState<string>('');

  useEffect(() => {
    const getGroup = async () => {
      try {
        if (authUser) {
          const response: Response = await groupService.getGroup(
            authUser.toString(),
            route.params.groupId
          );

          if (response.success) {
            setGroup(response?.data);
            setGroupName(response.data?.name);
            setGroupDescription(response?.data?.description);
          }
        }
      } catch (error: any) {
        if (error.message === 'Request failed with status code 404') return;
      }
    };

    getGroup();
  }, [group, setGroup]);

  useEffect(() => {
    if (authUser) {
      const decode: { _id: string } = jwtDecode(authUser.toString());
      setMeId(decode._id);
    }
  }, [authUser]);

  const handleLeaveGroup = async () => {
    try {
      if (authUser) {
        const response: Response = await groupService.leaveGroup(
          authUser.toString(),
          group.id
        );
        if (response.success) {
          ToastAndroid.show(
            i18next.t('toast.leftGroup', { name: group?.name }),
            ToastAndroid.SHORT
          );
          navigation.navigate('Group');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      <BackHeader
        title={group?.name}
        icon={<ArrowIcon width={30} height={30} direction="left" />}
        componentSize={{ height: 90 }}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <ListInfo
          title={i18next.t('group.groupInfo.groupName')}
          text={group?.name}
          icon={<IdIcon width={30} height={30} strokeWidth={3} />}
          onPress={
            meId === group?.owner?.id
              ? () => setGroupNameBoxVisible(true)
              : () => console.log('You are not owner')
          }
          disabled={meId !== group?.owner?.id}
        />

        <ListInfo
          title={i18next.t('group.groupInfo.groupDescription')}
          text={group?.description}
          icon={<QuotationIcon width={30} height={30} />}
          onPress={
            meId === group?.owner?.id
              ? () => setGroupDescriptionBoxVisible(true)
              : () => console.log('You are not owner')
          }
          disabled={meId !== group?.owner?.id}
        />

        <ListInfo
          title={i18next.t('global.createdAt')}
          text={new Date(group?.createdAt).toLocaleDateString()}
          icon={<CalendarIcon width={30} height={30} strokeWidth={1} />}
          disabled
        />

        <ListInfo
          title={i18next.t('group.groupInfo.owner')}
          text={group?.owner?.fullName}
          icon={<DiamondIcon width={30} height={30} />}
          disabled
        />

        <View style={styles.body}>
          <View style={styles.memberHeaderTextContainer}>
            <Text style={styles.memberHeaderText}>
              {group?.members?.length > 1
                ? group?.members?.length + ' ' + i18next.t('global.members') + ' '
                : group?.members?.length + ' ' + i18next.t('global.member') + ' '}
              <Text
                style={{
                  color: theme.textColor,
                  fontFamily: 'Nunito-Regular',
                  fontSize: 12,
                }}
              >
                ({i18next.t('global.outsideOwner')})
              </Text>
            </Text>
          </View>
          <View style={styles.memberContainer}>
            <View
              style={[
                styles.addMemberContainer,
                meId !== group?.owner?.id && { justifyContent: 'flex-end' },
              ]}
            >
              {meId === group?.owner?.id && (
                <TouchableOpacity
                  style={[styles.addMemberButton, styles.shadow]}
                  onPress={() => setAddMemberBottomSheetVisible(true)}
                >
                  <PlussIcon
                    width={20}
                    height={20}
                    customColor={Colors.primaryColors.dark}
                  />
                  <Text style={styles.addMemberButtonText}>
                    {i18next.t('group.groupInfo.addMembers')}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.leaveGroupButton, styles.shadow]}
                onPress={handleLeaveGroup}
              >
                <Text style={styles.leaveGroupButtonText}>
                  {i18next.t('global.leave')}
                </Text>
                <LogoutIcon
                  width={20}
                  height={20}
                  customColor={Colors.primaryColors.beige}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderBottomColor: theme.borderColor,
                borderBottomWidth: 1,
              }}
            >
              <TouchableOpacity
                style={styles.userContainer}
                onPress={() => {
                  if (meId !== group?.owner?.id) {
                    setGroupMemberDetailModalVisible(true);
                    setSelectedUser(group?.owner);
                  }
                }}
                disabled={meId === group?.owner?.id}
              >
                <ProfileImage
                  imageUri={group?.owner?.avatar}
                  componentSize={{ width: 50, height: 50 }}
                />

                <Text style={styles.userName}>
                  {meId === group?.owner?.id
                    ? i18next.t('global.you')
                    : group?.owner?.fullName}{' '}
                  <Text
                    style={{
                      color: theme.textMutedColor,
                      fontFamily: 'Nunito-Regular',
                      fontSize: 12,
                    }}
                  >
                    {i18next.t('global.admin')}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>

            {group?.members?.map((user: User, index: number) => {
              return (
                <View
                  key={index}
                  style={{
                    borderBottomColor: theme.borderColor,
                    borderBottomWidth: index === group.members.length - 1 ? 0 : 1,
                  }}
                >
                  <TouchableOpacity
                    style={styles.userContainer}
                    onPress={() => {
                      if (meId !== user?.id) {
                        setGroupMemberDetailModalVisible(true);
                        setSelectedUser(user);
                      }
                    }}
                    disabled={meId === user?.id}
                  >
                    <ProfileImage
                      imageUri={
                        user.hideAvatar
                          ? `https://robohash.org/${user?.id}`
                          : user?.avatar
                      }
                      componentSize={{ width: 50, height: 50 }}
                    />
                    <Text style={styles.userName}>{user?.fullName}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {groupNameBoxVisible && (
        <SetProfileValueBottomSheet
          title={i18next.t('group.groupInfo.groupName')}
          placeholder={i18next.t('group.groupInfo.groupName')}
          isVisible={groupNameBoxVisible}
          onSwipeDown={() => setGroupNameBoxVisible(false)}
          setValue={(value: string) => {
            setGroupName(value);
          }}
          value={groupName}
          type="name"
          isGroup
          groupId={group?.id}
        />
      )}

      {groupDescriptionBoxVisible && (
        <SetProfileValueBottomSheet
          title={i18next.t('group.groupInfo.groupDescription')}
          placeholder={i18next.t('group.groupInfo.groupDescription')}
          isVisible={groupDescriptionBoxVisible}
          onSwipeDown={() => setGroupDescriptionBoxVisible(false)}
          setValue={(value: string) => {
            setGroupDescription(value);
          }}
          value={groupDescription}
          type="description"
          isGroup
          groupId={group?.id}
        />
      )}

      {groupMemberDetailModalVisible && (
        <GroupMemberDetailModal
          onClose={() => setGroupMemberDetailModalVisible(false)}
          isVisible={groupMemberDetailModalVisible}
          user={selectedUser}
          navigation={navigation}
          groupId={group?.id}
          meId={meId}
          ownerId={group?.owner?.id}
        />
      )}

      {addMemberBottomSheetVisible && (
        <AddMemberGroupBottomSheet
          isVisible={addMemberBottomSheetVisible}
          onSwipeDown={() => setAddMemberBottomSheetVisible(false)}
          navigation={navigation}
          groupId={group?.id}
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
