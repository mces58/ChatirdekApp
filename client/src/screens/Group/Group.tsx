import React, { useEffect, useMemo, useState } from 'react';
import {
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';

import { GroupPeopleIcon } from 'src/assets/icons/headers';
import CreateGroupBottomSheet from 'src/components/CreateGroupBottomSheet';
import Header from 'src/components/headers/Header';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { BASE_URL } from 'src/services/baseUrl';

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
    <View style={styles.screenContainer}>
      <Header
        title="Groups"
        icon={<GroupPeopleIcon width={30} height={30} />}
        onIconPress={() => setCreateGroupBottomSheetVisible(true)}
      />

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

const createStyles = (theme: Theme, STATUSBAR_HEIGHT: number) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      paddingTop: STATUSBAR_HEIGHT,
    },
  });
