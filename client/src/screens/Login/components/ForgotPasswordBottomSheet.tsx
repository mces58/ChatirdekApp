import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import axios from 'axios';
import i18next from 'i18next';

import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import Button from 'src/components/button/Button';
import LoadingIndicator from 'src/components/loading/Loading';
import { Colors } from 'src/constants/color/colors';
import { ForgotPassword } from 'src/constants/types/user';
import { BASE_URL } from 'src/services/baseUrl';

import isEmail from 'validator/lib/isEmail';

type ForgotPasswordBottomSheetProps = {
  isVisible: boolean;
  onSwipeDown: (value: boolean) => void;
};

const ForgotPasswordBottomSheet: React.FC<ForgotPasswordBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const [userData, setUserData] = useState<ForgotPassword>({
    userName: '',
    email: '',
  });
  const [validationBoxVisible, setValidationBoxVisible] = useState(false);
  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const maxTime = 180;
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(maxTime);
  const [verificationCode, setVerificationCode] = useState('');
  const [resetPasswordBoxVisible, setResetPasswordBoxVisible] = useState(false);
  const [resetData, setResetData] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      Alert.alert('Time expired', 'The verification code has expired.');
      setValidationBoxVisible(false);
      setStep(1);
      setCountdown(maxTime);
      setVerificationCode('');
    }

    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleSendEmail = async (userData: ForgotPassword) => {
    if (!userData.userName || !userData.email) {
      return Alert.alert(i18next.t('alert.error'), i18next.t('alert.fillAllFields'), [
        { text: i18next.t('global.ok') },
      ]);
    }

    if (isEmail(userData.email) === false) {
      return Alert.alert(i18next.t('alert.error'), i18next.t('alert.invalidEmail'), [
        { text: i18next.t('global.ok') },
      ]);
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/password/forgot`, userData);

      if (response.data.success) {
        setValidationBoxVisible(true);
        setStep(2);
        setCountdown(maxTime);
        setVerificationCode(response.data.code);

        setResetData({
          ...resetData,
          userName: userData.userName,
        });
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert(i18next.t('alert.error'), i18next.t('alert.userNotFound'), [
        { text: i18next.t('global.ok') },
      ]);
    } finally {
      setLoading(false);
    }

    setUserData({
      userName: '',
      email: '',
    });
  };

  const handleVerifyCode = async (code: string) => {
    if (!code) {
      return Alert.alert(i18next.t('alert.error'), i18next.t('alert.fillAllFields'), [
        { text: i18next.t('global.ok') },
      ]);
    }

    if (code === verificationCode) {
      setValidationBoxVisible(false);
      setResetPasswordBoxVisible(true);
      setStep(1);
      setCountdown(maxTime);
    } else {
      Alert.alert(i18next.t('alert.error'), i18next.t('alert.invalidVerificationCode'), [
        { text: i18next.t('global.ok') },
      ]);
    }
  };

  const handleResetPassword = async () => {
    if (!resetData.password || !resetData.confirmPassword) {
      return Alert.alert(i18next.t('alert.error'), i18next.t('alert.fillAllFields'), [
        { text: i18next.t('global.ok') },
      ]);
    }

    if (resetData.password.length < 6) {
      return Alert.alert(
        i18next.t('alert.error'),
        i18next.t('alert.passwordLength', { length: 6 }),
        [{ text: i18next.t('global.ok') }]
      );
    }

    if (resetData.password !== resetData.confirmPassword) {
      return Alert.alert(
        i18next.t('alert.error'),
        i18next.t('alert.passwordsDoNotMatch'),
        [{ text: i18next.t('global.ok') }]
      );
    }

    setLoading(true);
    try {
      await axios.put(`${BASE_URL}/auth/password/reset`, resetData);

      Alert.alert(i18next.t('alert.success'), i18next.t('alert.passwordResetSuccess'), [
        { text: i18next.t('global.ok') },
      ]);
      setResetPasswordBoxVisible(false);
      onSwipeDown(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while resetting the password.');
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{i18next.t('forgotPassword.header')}</Text>
        <Text style={styles.subHeader}>{i18next.t('forgotPassword.subHeader')}</Text>
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.text}>{i18next.t('global.username')}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={i18next.t('global.username') + '...'}
          value={userData.userName}
          onChangeText={(text) => setUserData({ ...userData, userName: text })}
        />
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.text}>{i18next.t('global.email')}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={i18next.t('global.email') + '...'}
          value={userData.email}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
        />
      </View>

      <Button
        title={i18next.t('global.send')}
        onPress={() => handleSendEmail(userData)}
      />
    </View>
  );

  const validationBox = (
    <View style={styles.root}>
      <Text style={styles.headerText}>
        {i18next.t('forgotPassword.validationHeader')}
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <Text style={styles.time}>
        {i18next.t('forgotPassword.timeRemaining')}: {Math.floor(countdown / 60)}:
        {('0' + (countdown % 60)).slice(-2)}
      </Text>
      <Button
        title={i18next.t('forgotPassword.verifyButton')}
        onPress={() => handleVerifyCode(value)}
      />
    </View>
  );

  const resetPasswordBox = (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {i18next.t('forgotPassword.resetPasswordHeader')}
        </Text>
        <Text style={styles.subHeader}>
          {i18next.t('forgotPassword.resetPasswordSubHeader')}
        </Text>
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.text}>{i18next.t('global.newPassword')}</Text>
        <TextInput
          style={styles.textInput}
          value={resetData.password}
          placeholder={i18next.t('global.newPassword') + '...'}
          onChangeText={(text) => setResetData({ ...resetData, password: text })}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.text}>{i18next.t('global.confirmPassword')}</Text>
        <TextInput
          style={styles.textInput}
          value={resetData.confirmPassword}
          placeholder={i18next.t('global.confirmPassword') + '...'}
          onChangeText={(text) => setResetData({ ...resetData, confirmPassword: text })}
          secureTextEntry={true}
        />
      </View>

      <Button
        title={i18next.t('forgotPassword.resetPasswordButton')}
        onPress={handleResetPassword}
      />
    </View>
  );

  return (
    <BaseBottomSheet
      isVisible={isVisible}
      isTransparent={true}
      onSwipeDown={() => onSwipeDown(false)}
      animationType="slide"
      modalStyle={[
        styles.bottomSheet,
        styles.shadow,
        {
          height: validationBoxVisible ? SCREEN_HEIGHT * 0.4 : SCREEN_HEIGHT * 0.6,
        },
      ]}
      content={
        validationBoxVisible ? (
          validationBox
        ) : resetPasswordBoxVisible ? (
          resetPasswordBox
        ) : (
          <View style={{ flex: 1 }}>{loading ? <LoadingIndicator /> : content}</View>
        )
      }
    />
  );
};

export default ForgotPasswordBottomSheet;

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: Colors.primaryColors.beige,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 30,
  },
  headerContainer: {
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 5,
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    textAlign: 'center',
    color: Colors.primaryColors.dark,
  },
  subHeader: {
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
    textAlign: 'center',
    color: Colors.primaryColors.textMuted,
  },
  textInputContainer: {
    gap: 10,
  },
  text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: Colors.primaryColors.dark,
  },
  textInput: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.primaryColors.dark,
    borderRadius: 20,
  },
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 20,
  },
  codeFieldRoot: {
    marginVertical: 5,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 35,
    fontSize: 24,
    borderWidth: 2,
    borderColor: Colors.primaryColors.textMuted,
    textAlign: 'center',
    borderRadius: 10,
  },
  focusCell: {
    borderColor: Colors.primaryColors.dark,
  },
  time: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 18,
  },
  shadow: {
    shadowColor: Colors.primaryColors.dark,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
