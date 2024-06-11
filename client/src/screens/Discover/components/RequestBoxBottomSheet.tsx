import React, { useEffect, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import axios from 'axios';
import i18next from 'i18next';

import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import ProfileContainer from 'src/components/profileContainer/ProfileContainer';
import { Colors } from 'src/constants/color/colors';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { BASE_URL } from 'src/services/baseUrl';

interface RequestBoxBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
  requests: User[];
  setRequests: (requests: User[]) => void;
  navigation: any;
}

const RequestBoxBottomSheet: React.FC<RequestBoxBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
  requests,
  setRequests,
  navigation,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);
  const { authUser } = useAuthContext();

  const getRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/friend-request/${authUser?._id}`);
      setRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authUser) {
      getRequests();
    }
  }, [authUser]);

  const acceptFriendRequest = async (receiverId: string) => {
    axios
      .post(`${BASE_URL}/users/friend-request/accept`, {
        senderId: receiverId,
        recepientId: authUser?._id,
      })
      .then((res) => {
        if (res.status === 200) {
          getRequests();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderItem = (request: User, index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.userContainer, styles.shadow]}
      onPress={() => {
        navigation.navigate('UserProfile', { user: request });
      }}
    >
      <ProfileContainer
        user={request}
        componentSize={{ width: 50, height: 50 }}
        showUserNames={false}
        disabled
        textStyles={{ fontSize: 14, color: Colors.primaryColors.dark }}
      />

      <TouchableOpacity
        onPress={() => {
          acceptFriendRequest(request._id);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{i18next.t('global.accept')}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const content = (
    <View style={styles.container}>
      {requests.length > 0 ? (
        requests.map((request, index) => renderItem(request, index))
      ) : (
        <Text style={styles.noRequestsText}>
          {i18next.t('discover.requestBoxBottomSheet.noRequest')}
        </Text>
      )}
    </View>
  );

  return (
    <BaseBottomSheet
      animationType="slide"
      isTransparent
      isVisible={isVisible}
      onSwipeDown={onSwipeDown}
      content={<ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView>}
      modalStyle={styles.bottomSheet}
    />
  );
};

export default RequestBoxBottomSheet;

const createStyles = (theme: Theme, SCREEN_HEIGHT: number) =>
  StyleSheet.create({
    bottomSheet: {
      height: SCREEN_HEIGHT * 0.6,
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    container: {
      flex: 1,
      marginTop: 30,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.borderColor,
      width: '100%',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 20,
      marginBottom: 20,
    },
    button: {
      backgroundColor: theme.backgroundColor,
      padding: 10,
      borderRadius: 10,
    },
    buttonText: {
      fontFamily: 'Nunito-SemiBold',
      color: theme.textColor,
      fontSize: 14,
    },
    noRequestsText: {
      fontFamily: 'Poppins-SemiBold',
      color: theme.textColor,
      fontSize: 20,
      textAlign: 'center',
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
