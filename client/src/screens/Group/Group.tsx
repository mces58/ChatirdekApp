import React, { useEffect, useMemo, useState } from 'react';
import {
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import i18next from 'i18next';
import { jwtDecode } from 'jwt-decode';

import { GroupPeopleIcon } from 'src/assets/icons/headers';
import Header from 'src/components/headers/Header';
import LoadingIndicator from 'src/components/loading/Loading';
import { GroupLastMessages } from 'src/constants/types/group-message';
import { Response } from 'src/constants/types/response';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import friendService from 'src/services/friend-service';
import groupMessageService from 'src/services/group-message-service';

import CreateGroupBottomSheet from './components/CreateGroupBottomSheet';
import GroupCard from './components/GroupCard';

interface GroupProps {
  navigation: any;
}

const Group: React.FC<GroupProps> = ({ navigation }) => {
  const [createGroupBottomSheetVisible, setCreateGroupBottomSheetVisible] =
    useState<boolean>(false);
  const [groups, setGroups] = useState<GroupLastMessages[]>([]);
  const { authUser } = useAuthContext();
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);
  const [meId, setMeId] = useState<string>('');
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getGroups = async () => {
      try {
        setLoading(true);
        if (authUser) {
          const response: Response = await groupMessageService.getGroupLastMessages(
            authUser.toString()
          );
          if (response.success) {
            setGroups(response.data);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getGroups();
  }, [authUser, groups]);

  useEffect(() => {
    if (authUser) {
      const decode: { _id: string } = jwtDecode(authUser.toString());
      setMeId(decode._id);
    }
  }, [authUser]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (authUser) {
          const response: Response = await friendService.getFriends(authUser.toString());

          if (response.success) {
            setFriends(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getFriends();
  }, [authUser]);

  return (
    <ScrollView
      style={styles.screenContainer}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Header
        title={i18next.t('group.group.header')}
        icon={<GroupPeopleIcon width={30} height={30} />}
        onIconPress={() => setCreateGroupBottomSheetVisible(true)}
      />
      {loading ? (
        <LoadingIndicator />
      ) : groups.length > 0 ? (
        <View style={styles.container}>
          {groups?.map((group, index) => (
            <GroupCard
              key={index}
              group={group}
              index={index}
              onPressCard={() => navigation.navigate('GroupChat', { groupId: group.id })}
              meId={meId}
            />
          ))}
        </View>
      ) : (
        <View style={styles.noGroupContainer}>
          <Text style={styles.noGroupText}>{i18next.t('group.group.noGroup')}</Text>
        </View>
      )}

      {createGroupBottomSheetVisible && (
        <CreateGroupBottomSheet
          isVisible={createGroupBottomSheetVisible}
          onSwipeDown={() => setCreateGroupBottomSheetVisible(false)}
          navigation={navigation}
          friends={friends}
        />
      )}
    </ScrollView>
  );
};

export default Group;

const createStyles = (theme: Theme, STATUSBAR_HEIGHT: number) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingTop: STATUSBAR_HEIGHT,
    },
    container: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      gap: 20,
      alignItems: 'center',
    },
    noGroupContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noGroupText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 20,
      color: theme.textColor,
      textAlign: 'center',
    },
  });
