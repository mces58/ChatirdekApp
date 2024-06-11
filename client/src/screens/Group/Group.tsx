import React, { useEffect, useMemo, useState } from 'react';
import { NativeModules, Platform, ScrollView, StyleSheet, View } from 'react-native';

import axios from 'axios';
import i18next from 'i18next';

import { GroupPeopleIcon } from 'src/assets/icons/headers';
import Header from 'src/components/headers/Header';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { BASE_URL } from 'src/services/baseUrl';

import CreateGroupBottomSheet from './components/CreateGroupBottomSheet';
import GroupCard from './components/GroupCard';

interface GroupProps {
  navigation: any;
}

const Group: React.FC<GroupProps> = ({ navigation }) => {
  const [createGroupBottomSheetVisible, setCreateGroupBottomSheetVisible] =
    useState<boolean>(false);
  const [groups, setGroups] = useState([] as any[]);
  const { authUser } = useAuthContext();
  const { theme } = useTheme();
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const styles = useMemo(() => createStyles(theme, STATUSBAR_HEIGHT), [theme]);

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

      <View style={styles.container}>
        {groups?.map((group, index) => (
          <GroupCard
            key={index}
            group={group}
            index={index}
            onPressCard={() => navigation.navigate('GroupChat', { groupId: group._id })}
          />
        ))}
      </View>

      {createGroupBottomSheetVisible && (
        <CreateGroupBottomSheet
          isVisible={createGroupBottomSheetVisible}
          onSwipeDown={() => setCreateGroupBottomSheetVisible(false)}
          navigation={navigation}
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
  });
