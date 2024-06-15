import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import i18next from 'i18next';

import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import SwitchButton from 'src/components/SwitchButton';
import { Colors } from 'src/constants/color/colors';
import { Response } from 'src/constants/types/response';
import { useAuthContext } from 'src/context/AuthContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import authService from 'src/services/auth-service';

import { PrivacyContent, privacyContent } from '../../constants/privarcy-content';

interface PrivacyBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const PrivacyBottomSheet: React.FC<PrivacyBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, SCREEN_HEIGHT), [theme]);
  const [contents] = useState<PrivacyContent[]>(privacyContent);
  const [active, setActive] = useState({
    hideOnlineStatus: false,
    hideAvatar: false,
    hideAbout: false,
  });
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getMe = async () => {
      try {
        if (authUser) {
          const response: Response = await authService.getMe(authUser.toString());

          if (response.success) {
            setActive({
              hideOnlineStatus: response.data.hideOnlineStatus,
              hideAvatar: response.data.hideAvatar,
              hideAbout: response.data.hideAbout,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMe();
  }, [authUser]);

  const updateMe = async (type: string, value: boolean) => {
    try {
      if (authUser) {
        const response: Response = await authService.updateMe(
          { [type]: value },
          authUser.toString()
        );
        if (response.success) {
          console.log('Updated');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = (item: PrivacyContent, index: number) => {
    return (
      <View
        key={index}
        style={[
          styles.item,
          index === privacyContent.length - 1 && { borderBottomWidth: 0 },
        ]}
      >
        <Text style={styles.text}>
          {i18next.t(`settings.privacyBottomSheet.${item.content}`)}
        </Text>
        <SwitchButton
          activeColor={Colors.primaryColors.success}
          inActiveColor={Colors.primaryColors.gray}
          active={
            item.label === 'hideOnlineStatus'
              ? active.hideOnlineStatus
              : item.label === 'hideAvatar'
                ? active.hideAvatar
                : active.hideAbout
          }
          setActive={(value: boolean) => {
            setActive((prev) => ({ ...prev, [item.label]: value }));
            updateMe(item.label, value);
          }}
        />
      </View>
    );
  };

  const content = (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      <Text style={styles.headerText}>
        {i18next.t('settings.privacyBottomSheet.header')}
      </Text>
      {contents.map((item, index) => renderContent(item, index))}
    </ScrollView>
  );

  return (
    <BaseBottomSheet
      animationType="slide"
      isTransparent
      isVisible={isVisible}
      onSwipeDown={() => {
        onSwipeDown();
      }}
      content={content}
      modalStyle={styles.bottomSheet}
    />
  );
};

export default PrivacyBottomSheet;

const createStyles = (theme: Theme, SCREEN_HEIGHT: number) =>
  StyleSheet.create({
    bottomSheet: {
      height: SCREEN_HEIGHT * 0.4,
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
    scrollViewContent: {
      paddingVertical: 20,
      paddingHorizontal: 10,
      gap: 15,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      paddingVertical: 10,
    },
    headerText: {
      textAlign: 'center',
      fontSize: 20,
      color: theme.textColor,
      fontFamily: 'Poppins-Bold',
    },
    text: {
      fontFamily: 'Nunito-Bold',
      color: theme.textMutedColor,
      fontSize: 14,
    },
  });
