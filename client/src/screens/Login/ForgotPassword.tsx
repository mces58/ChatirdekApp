import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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

import BaseBottomSheet from 'src/components/BaseBottomSheet';
import LoadingIndicator from 'src/components/Loading';
import { BASE_URL } from 'src/services/baseUrl';

type ForgotPasswordProps = {
  isVisible: boolean;
  onSwipeDown: (value: boolean) => void;
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ isVisible, onSwipeDown }) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const [userData, setUserData] = useState({
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
      setCountdown(maxTime); // Sayaç resetlenir
      setVerificationCode('');
    }

    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleSendEmail = async (userData: { userName: string; email: string }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/password/forgot`, userData);

      if (response.data.success) {
        setValidationBoxVisible(true);
        setStep(2);
        setCountdown(maxTime); // Sayaç resetlenir
        setVerificationCode(response.data.code);

        setResetData({
          ...resetData,
          userName: userData.userName,
        });
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while sending the email.');
    } finally {
      setLoading(false);
    }

    setUserData({
      userName: '',
      email: '',
    });
  };

  const handleVerifyCode = async (code: string) => {
    if (code === verificationCode) {
      setValidationBoxVisible(false);
      setResetPasswordBoxVisible(true);
      setStep(1);
      setCountdown(maxTime); // Sayaç resetlenir
    } else {
      Alert.alert('Error', 'Verification code is incorrect.');
    }
  };

  const handleResetPassword = async () => {
    setLoading(true); // Yükleme başladığında spinner'ı göster
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
      setLoading(false); // İşlem tamamlandığında spinner'ı gizle
    }
  };

  const content = (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          Forgot Password
        </Text>
        <Text style={{ textAlign: 'center', color: 'gray' }}>
          Enter your username and email to receive a verification code.
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 5 }}>Username</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 5,
            padding: 10,
            marginTop: 10,
          }}
          placeholder="Enter your username"
          value={userData.userName}
          onChangeText={(text) => setUserData({ ...userData, userName: text })}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 5 }}>E-mail</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 5,
            padding: 10,
            marginTop: 10,
          }}
          placeholder="Enter your e-mail"
          value={userData.email}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginTop: 20,
        }}
        onPress={() => handleSendEmail(userData)}
      >
        <Text style={{ color: 'white' }}>Send</Text>
      </TouchableOpacity>
    </View>
  );

  const validationBox = (
    <View style={styles.root}>
      <Text style={styles.title}>Verification</Text>
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
      <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18 }}>
        Time remaining: {Math.floor(countdown / 60)}:{('0' + (countdown % 60)).slice(-2)}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 40,
        }}
        onPress={() => handleVerifyCode(value)}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Verify Code</Text>
      </TouchableOpacity>
    </View>
  );

  const resetPasswordBox = (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        >
          Reset Password
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'gray',
          }}
        >
          Set the new password for your account so you can log in again.
        </Text>
      </View>

      <View>
        <View
          style={{
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              marginBottom: 5,
            }}
          >
            New Password
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 5,
              padding: 10,
              marginTop: 10,
            }}
            placeholder="Enter your new password"
            onChangeText={(text) => setResetData({ ...resetData, password: text })}
            secureTextEntry={true}
          />
        </View>
        <View
          style={{
            marginBottom: 30,
          }}
        >
          <Text>Confirm New Password</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 5,
              padding: 10,
              marginTop: 10,
            }}
            placeholder="Confirm your new password"
            onChangeText={(text) => setResetData({ ...resetData, confirmPassword: text })}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 20,
          }}
          onPress={handleResetPassword}
        >
          <Text
            style={{
              color: 'white',
            }}
          >
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <BaseBottomSheet
      isVisible={isVisible}
      isTransparent={true}
      onSwipeDown={() => onSwipeDown(false)}
      animationType="slide"
      modalStyle={{
        height: validationBoxVisible ? SCREEN_HEIGHT * 0.4 : SCREEN_HEIGHT * 0.6,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
      }}
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

export default ForgotPassword;

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
