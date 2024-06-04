import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ArrowIcon from 'src/assets/icons/arrow';
import { User } from 'src/constants/types/user';
import { Theme, useTheme } from 'src/context/ThemeContext';

import ProfileImage from './ProfileImage';

interface ProfileContainerProps {
  user: User;
  onPress?: () => void;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({ user, onPress }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <ProfileImage
          imageUri={user?.profilePicture}
          componentSize={{
            width: 100,
            height: 100,
          }}
          disabled
        />
        <View style={styles.textContainer}>
          <Text style={styles.fullName}>{user?.fullName}</Text>
          <Text style={styles.userName}>{user?.userName}</Text>
        </View>
      </View>
      <ArrowIcon width={25} height={25} direction="right" />
    </TouchableOpacity>
  );
};

export default ProfileContainer;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      paddingVertical: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    textContainer: {
      gap: 1,
    },
    fullName: {
      fontSize: 18,
      fontFamily: 'Poppins-SemiBold',
      color: theme.textColor,
    },
    userName: {
      fontSize: 14,
      fontFamily: 'Poppins-Medium',
      color: theme.textMutedColor,
    },
  });
