import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Formik } from 'formik';
import i18next from 'i18next';

import Button from 'src/components/button/Button';
import LoadingIndicator from 'src/components/loading/Loading';
import { Colors } from 'src/constants/color/colors';
import { Response } from 'src/constants/types/response';
import { ResetPassword } from 'src/constants/types/user';
import authService from 'src/services/auth-service';
import { resetPasswordValidation } from 'src/validations/resetPassword';

interface ResetPasswordFormProps {
  email: string;
  successFunction: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email,
  successFunction,
}) => {
  const initialValues: ResetPassword = {
    email: email,
    password: '',
    confirmPassword: '',
  };
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetPassword = async (
    values: ResetPassword,
    resetForm: () => void
  ): Promise<void> => {
    setLoading(true);
    try {
      const response: Response = await authService.resetPassword({ ...values, email });

      if (response.success) {
        successFunction();
        resetForm();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={resetPasswordValidation}
      onSubmit={(values, { resetForm }) => {
        handleResetPassword(values, resetForm);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
              value={values.password}
              placeholder={i18next.t('global.newPassword') + '...'}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <View style={styles.textInputContainer}>
            <Text style={styles.text}>{i18next.t('global.confirmPassword')}</Text>
            <TextInput
              style={styles.textInput}
              value={values.confirmPassword}
              placeholder={i18next.t('global.confirmPassword') + '...'}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              secureTextEntry={true}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              title={i18next.t('forgotPassword.resetPasswordButton')}
              onPress={handleSubmit}
            />
          )}
        </View>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;

const styles = StyleSheet.create({
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
  errorText: {
    fontFamily: 'Nunito-Regular',
    color: Colors.primaryColors.danger,
    fontSize: 12,
    textAlign: 'center',
  },
});
