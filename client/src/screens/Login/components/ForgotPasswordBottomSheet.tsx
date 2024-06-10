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
      return Alert.alert('Error', 'Please fill all the fields', [{ text: 'OK' }]);
    }

    if (isEmail(userData.email) === false) {
      return Alert.alert('Error', 'Please enter a valid email address', [{ text: 'OK' }]);
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
      Alert.alert('Error', 'User not found. Please check your username and email');
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
      return Alert.alert('Error', 'Please fill all the fields', [{ text: 'OK' }]);
    }

    if (code === verificationCode) {
      setValidationBoxVisible(false);
      setResetPasswordBoxVisible(true);
      setStep(1);
      setCountdown(maxTime);
    } else {
      Alert.alert('Error', 'Verification code is incorrect.');
    }
  };

  const handleResetPassword = async () => {
    if (!resetData.password || !resetData.confirmPassword) {
      return Alert.alert('Error', 'Please fill all the fields', [{ text: 'OK' }]);
    }

    if (resetData.password.length < 6) {
      return Alert.alert('Error', 'Password must be at least 6 characters long', [
        { text: 'OK' },
      ]);
    }

    if (resetData.password !== resetData.confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match', [{ text: 'OK' }]);
    }

    setLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/auth/password/reset`, resetData);

      if (response.data.success) {
        Alert.alert('Success', response.data.message);
        setResetPasswordBoxVisible(false);
        onSwipeDown(false);
      } else {
        Alert.alert('Error', response.data.message);
      }
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
        <Text style={styles.headerText}>Forgot Password</Text>
        <Text style={styles.subHeader}>
          Enter your username and email to receive a verification code.
        </Text>
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your username"
          value={userData.userName}
          onChangeText={(text) => setUserData({ ...userData, userName: text })}
        />
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.text}>E-mail</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your e-mail"
          value={userData.email}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
        />
      </View>

      <Button title="Send" onPress={() => handleSendEmail(userData)} />
    </View>
  );

  const validationBox = (
    <View style={styles.root}>
      <Text style={styles.headerText}>Verification</Text>
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
        Time remaining: {Math.floor(countdown / 60)}:{('0' + (countdown % 60)).slice(-2)}
      </Text>
      <Button title="Verify Code" onPress={() => handleVerifyCode(value)} />
    </View>
  );

  const resetPasswordBox = (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Reset Password</Text>
        <Text style={styles.subHeader}>
          Set the new password for your account so you can log in again.
        </Text>
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.text}>New Password</Text>
        <TextInput
          style={styles.textInput}
          value={resetData.password}
          placeholder="Enter your new password"
          onChangeText={(text) => setResetData({ ...resetData, password: text })}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.textInputContainer}>
        <Text style={styles.text}>Confirm New Password</Text>
        <TextInput
          style={styles.textInput}
          value={resetData.confirmPassword}
          placeholder="Confirm your new password"
          onChangeText={(text) => setResetData({ ...resetData, confirmPassword: text })}
          secureTextEntry={true}
        />
      </View>

      <Button title="Reset Password" onPress={handleResetPassword} />
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
