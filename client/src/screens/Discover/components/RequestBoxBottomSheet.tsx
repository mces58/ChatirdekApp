import React, { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import i18next from 'i18next';

import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import Tab from 'src/components/tab/Tab';
import { Response } from 'src/constants/types/response';
import { User } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import friendService from 'src/services/friend-service';

import IncomingRequests from './IncomingRequests';
import OutgoingRequests from './OutgoingRequests';

interface RequestBoxBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
  incomingRequests: User[];
  setIncomingRequests: (requests: User[]) => void;
  outgoingRequests: User[];
  setOutgoingRequests: (requests: User[]) => void;
  navigation: any;
}

const RequestBoxBottomSheet: React.FC<RequestBoxBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
  incomingRequests,
  setIncomingRequests,
  outgoingRequests,
  setOutgoingRequests,
  navigation,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);
  const { authUser } = useAuthContext();

  const getIncomingRequests = async () => {
    try {
      if (authUser) {
        const response: Response = await friendService.getIncomingFriendRequests(
          authUser?.token
        );

        if (response.success) {
          setIncomingRequests(response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getOutgoingRequests = async () => {
    try {
      if (authUser) {
        const response: Response = await friendService.getOutgoingFriendRequests(
          authUser?.token
        );

        if (response.success) {
          setOutgoingRequests(response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authUser) {
      getIncomingRequests();
      getOutgoingRequests();
    }
  }, [authUser]);

  const acceptFriendRequest = async (receiverId: string) => {
    try {
      if (authUser) {
        const response: Response = await friendService.acceptFriendRequest(
          authUser.toString(),
          receiverId
        );
        if (response.success) {
          getIncomingRequests();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const undoFriendRequest = async (receiverId: string) => {
    try {
      if (authUser) {
        const response: Response = await friendService.undoFriendRequest(
          authUser.toString(),
          receiverId
        );
        if (response.success) {
          getOutgoingRequests();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const content = (
    <Tab
      tabs={[
        {
          title: i18next.t('discover.discover.incomingRequest'),
          content: (
            <IncomingRequests
              requests={incomingRequests}
              onAcceptRequest={acceptFriendRequest}
              navigation={navigation}
              onSwipeDown={onSwipeDown}
            />
          ),
        },
        {
          title: i18next.t('discover.discover.outgoingRequest'),
          content: (
            <OutgoingRequests
              requests={outgoingRequests}
              navigation={navigation}
              onUndoRequest={undoFriendRequest}
              onSwipeDown={onSwipeDown}
            />
          ),
        },
      ]}
    />
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
      height: SCREEN_HEIGHT * 0.85,
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
  });
