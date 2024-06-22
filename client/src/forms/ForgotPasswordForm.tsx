import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';

import { Formik } from 'formik';
import i18next from 'i18next';

import Button from 'src/components/button/Button';
import LoadingIndicator from 'src/components/loading/Loading';
import { Colors } from 'src/constants/color/colors';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Response } from 'src/constants/types/response';
import { ForgotPassword } from 'src/constants/types/user';
import authService from 'src/services/auth-service';
import { forgotPasswordValidation } from 'src/validations/forgotPassword';

interface ForgotPasswordFormProps {
  successFunction: () => void;
  setVerificationCode: (value: string) => void;
  setEmail: (value: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  successFunction,
  setVerificationCode,
  setEmail,
}) => {
  const initialValue: ForgotPassword = {
    email: '',
  };
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendEmail = async (
    value: ForgotPassword,
    resetForm: () => void
  ): Promise<void> => {
    setLoading(true);
    try {
      const response: Response = await authService.forgotPassord(value);

      if (response.success) {
        successFunction();
        setVerificationCode(response.data);
        setEmail(value.email);
        resetForm();
      }
    } catch (error) {
      Alert.alert('Error', i18next.t('error.forgotPassword'), [
        { text: i18next.t('global.ok') },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={forgotPasswordValidation}
      onSubmit={(values, { resetForm }) => {
        handleSendEmail(values, resetForm);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{i18next.t('forgotPassword.header')}</Text>
            <Text style={styles.subHeader}>{i18next.t('forgotPassword.subHeader')}</Text>
          </View>

          <View style={styles.textInputContainer}>
            <Text style={styles.text}>{i18next.t('global.email')}</Text>
            <TextInput
              style={styles.textInput}
              placeholder={i18next.t('global.email') + '...'}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholderTextColor={Colors.primaryColors.textMuted}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button title={i18next.t('global.send')} onPress={handleSubmit} />
          )}
        </View>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ScaleHorizontal(15),
    paddingVertical: ScaleVertical(20),
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
    fontSize: ScaleFontSize(18),
    textAlign: 'center',
    color: Colors.primaryColors.dark,
  },
  subHeader: {
    fontFamily: 'Nunito-Medium',
    fontSize: ScaleFontSize(12),
    textAlign: 'center',
    color: Colors.primaryColors.textMuted,
  },
  textInputContainer: {
    gap: 10,
  },
  text: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: ScaleFontSize(14),
    color: Colors.primaryColors.dark,
  },
  textInput: {
    width: '100%',
    height: ScaleVertical(40),
    paddingHorizontal: ScaleHorizontal(10),
    borderWidth: ScaleHorizontal(1),
    borderColor: Colors.primaryColors.dark,
    borderRadius: ScaleHorizontal(10),
  },
  errorText: {
    fontFamily: 'Nunito-Regular',
    color: Colors.primaryColors.danger,
    fontSize: ScaleFontSize(10),
    textAlign: 'center',
  },
});
