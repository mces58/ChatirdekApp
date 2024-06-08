import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import ProfileContainer from 'src/components/profileContainer/ProfileContainer';
import { Colors } from 'src/constants/color/colors';
import { User } from 'src/constants/types/user';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { GetGradientStartEnd } from 'src/utils/rotate';

interface UserCardProps {
  user: User;
  index: number;
  onPressCard: () => void;
  onPressAddFriend: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  index,
  onPressCard,
  onPressAddFriend,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <LinearGradient
      colors={[
        Colors.primaryColors.linearGradient1,
        Colors.primaryColors.linearGradient2,
      ]}
      style={[styles.linearGradient, styles.shadow]}
      {...GetGradientStartEnd(index)}
    >
      <TouchableOpacity style={styles.userContainer} onPress={onPressCard}>
        <ProfileContainer
          user={user}
          componentSize={{ width: 55, height: 55 }}
          textStyles={{ fontSize: 14 }}
          showUserNames={false}
          disabled
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => onPressAddFriend(user._id)}
        >
          <Text style={styles.buttonText}>Add Friend</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default UserCard;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    linearGradient: {
      width: '100%',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 20,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: Colors.primaryColors.dark,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 10,
    },
    buttonText: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: 12,
      color: Colors.primaryColors.light,
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
