import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import i18next from 'i18next';

import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import Button from 'src/components/button/Button';
import { Colors } from 'src/constants/color/colors';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import ForgotPasswordForm from 'src/forms/ForgotPasswordForm';
import ResetPasswordForm from 'src/forms/ResetPasswordForm';

type ForgotPasswordBottomSheetProps = {
  isVisible: boolean;
  onSwipeDown: (value: boolean) => void;
};

const ForgotPasswordBottomSheet: React.FC<ForgotPasswordBottomSheetProps> = ({
  isVisible,
  onSwipeDown,
}) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const [validationBoxVisible, setValidationBoxVisible] = useState<boolean>(false);
  const [resetPasswordBoxVisible, setResetPasswordBoxVisible] = useState<boolean>(false);
  const CELL_COUNT = 4;
  const [value, setValue] = useState<string>('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const maxTime = 180;
  const [step, setStep] = useState<number>(1);
  const [countdown, setCountdown] = useState<number>(maxTime);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [email, setEmail] = useState<string>('');

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

  useEffect(() => {}, [verificationCode]);

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

  const content = (
    <ForgotPasswordForm
      successFunction={() => {
        setValidationBoxVisible(true);
        setStep(2);
        setCountdown(maxTime);
      }}
      setVerificationCode={setVerificationCode}
      setEmail={setEmail}
    />
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
    <ResetPasswordForm
      email={email}
      successFunction={() => {
        setResetPasswordBoxVisible(false);
        onSwipeDown(false);
      }}
    />
  );

  return (
    <BaseBottomSheet
      isVisible={isVisible}
      isTransparent={true}
      onSwipeDown={() => onSwipeDown(false)}
      animationType="slide"
      modalStyle={[
        styles.bottomSheet,
        {
          height: validationBoxVisible
            ? SCREEN_HEIGHT * ScaleVertical(0.35)
            : resetPasswordBoxVisible
              ? SCREEN_HEIGHT * ScaleVertical(0.55)
              : SCREEN_HEIGHT * ScaleVertical(0.4),
        },
      ]}
      content={
        validationBoxVisible
          ? validationBox
          : resetPasswordBoxVisible
            ? resetPasswordBox
            : content
      }
    />
  );
};

export default ForgotPasswordBottomSheet;

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: Colors.primaryColors.beige,
    borderTopLeftRadius: ScaleHorizontal(25),
    borderTopRightRadius: ScaleHorizontal(25),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: ScaleHorizontal(10),
    paddingVertical: ScaleVertical(20),
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: ScaleFontSize(20),
    textAlign: 'center',
    color: Colors.primaryColors.dark,
  },
  root: {
    flex: 1,
    paddingHorizontal: ScaleHorizontal(20),
    paddingVertical: ScaleVertical(20),
    gap: 20,
  },
  codeFieldRoot: {
    marginVertical: ScaleVertical(5),
  },
  cell: {
    width: ScaleHorizontal(40),
    height: ScaleVertical(40),
    lineHeight: ScaleVertical(35),
    fontSize: ScaleFontSize(24),
    borderWidth: ScaleHorizontal(2),
    borderColor: Colors.primaryColors.textMuted,
    textAlign: 'center',
    borderRadius: ScaleHorizontal(10),
  },
  focusCell: {
    borderColor: Colors.primaryColors.dark,
  },
  time: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: ScaleFontSize(14),
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
