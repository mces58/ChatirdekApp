import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import i18next from 'i18next';

import ProfileContainer from 'src/components/profileContainer/ProfileContainer';
import { Colors } from 'src/constants/color/colors';
import { User } from 'src/constants/types/user';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface IncomingRequestsProps {
  requests: User[];
  onAcceptRequest: (userId: string) => void;
  navigation: any;
  onSwipeDown: () => void;
}

const IncomingRequests: React.FC<IncomingRequestsProps> = ({
  requests,
  onAcceptRequest,
  navigation,
  onSwipeDown,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderItem = (request: User, index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.userContainer, styles.shadow]}
      onPress={() => {
        navigation.navigate('UserProfile', { user: request });
        onSwipeDown();
      }}
    >
      <ProfileContainer
        user={request}
        componentSize={{ width: 50, height: 50 }}
        showUserNames={false}
        disabled
        textStyles={{ fontSize: 14, color: Colors.primaryColors.dark }}
      />

      <TouchableOpacity onPress={() => onAcceptRequest(request.id)} style={styles.button}>
        <Text style={styles.buttonText}>{i18next.t('global.accept')}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {requests?.length > 0 ? (
        requests?.map((request, index) => renderItem(request, index))
      ) : (
        <Text style={styles.noRequestsText}>
          {i18next.t('discover.requestBoxBottomSheet.noIncomingRequest')}
        </Text>
      )}
    </View>
  );
};

export default IncomingRequests;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
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
      backgroundColor: Colors.primaryColors.success,
      padding: 10,
      borderRadius: 10,
    },
    buttonText: {
      fontFamily: 'Nunito-SemiBold',
      color: Colors.primaryColors.light,
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
