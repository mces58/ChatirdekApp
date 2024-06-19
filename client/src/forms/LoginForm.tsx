import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Formik } from 'formik';
import i18next from 'i18next';
import { jwtDecode } from 'jwt-decode';

import Button from 'src/components/button/Button';
import LoadingIndicator from 'src/components/loading/Loading';
import { Colors } from 'src/constants/color/colors';
import { Response } from 'src/constants/types/response';
import { LoginData } from 'src/constants/types/user';
import { useAuthContext } from 'src/context/AuthContext';
import authService from 'src/services/auth-service';
import { loginValidation } from 'src/validations/login';

interface LoginFormProps {
  setForgotPasswordBottomSheetVisible: (value: boolean) => void;
  gotoRegister: () => void;
  onLoginSuccess: (userId: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  setForgotPasswordBottomSheetVisible,
  gotoRegister,
  onLoginSuccess,
}) => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: LoginData = {
    userName: '',
    password: '',
  };

  const handleLogin = async (values: LoginData, resetForm: () => void): Promise<void> => {
    setLoading(true);
    try {
      const response: Response = await authService.login(values);
      if (response.success) {
        const { token } = response.data;
        setAuthUser(token);
        const decode: { _id: string } = jwtDecode(token.toString());
        onLoginSuccess(decode._id);
        resetForm();
      }
    } catch (error) {
      Alert.alert(
        i18next.t('alert.error'),
        i18next.t('alert.incorrectUsernameOrPassword'),
        [{ text: i18next.t('global.ok') }]
      );
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidation}
      onSubmit={(values, { resetForm }) => {
        handleLogin(values, resetForm);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        resetForm,
      }) => (
        <View style={styles.container}>
          <View style={styles.textHeaderContainer}>
            <Text style={styles.textHeader}>{i18next.t('login.header')}</Text>
            <Text style={styles.textBody}>{i18next.t('login.subHeader')}</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={i18next.t('global.username')}
                value={values.userName}
                onChangeText={handleChange('userName')}
                onBlur={handleBlur('userName')}
              />
              {touched.userName && errors.userName && (
                <Text style={styles.errorText}>{errors.userName}</Text>
              )}
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={i18next.t('global.password')}
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
          </View>

          <View style={styles.forgetPassworContainer}>
            <TouchableOpacity
              style={styles.forgetPassworButton}
              onPress={() => {
                setForgotPasswordBottomSheetVisible(true);
                resetForm();
              }}
            >
              <Text style={styles.forgetPassworButtonText}>
                {i18next.t('login.forgotPassword')}
              </Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button title={i18next.t('global.login')} onPress={handleSubmit} />
          )}

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>{i18next.t('login.dontHaveAccount')}</Text>
            <TouchableOpacity
              onPress={() => {
                resetForm();
                gotoRegister();
              }}
            >
              <Text style={styles.registerLinkText}>{i18next.t('global.register')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: 'center',
  },
  textHeaderContainer: {
    alignItems: 'center',
  },
  textHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    color: Colors.primaryColors.dark,
  },
  textBody: {
    fontFamily: 'Nunito-Medium',
    fontSize: 18,
    color: Colors.primaryColors.dark,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  textInputContainer: {
    width: '100%',
    gap: 5,
  },
  textInput: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primaryColors.dark,
  },
  forgetPassworContainer: {
    width: '80%',
    alignItems: 'flex-end',
  },
  forgetPassworButton: {
    width: '40%',
    alignItems: 'center',
  },
  forgetPassworButtonText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.primaryColors.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryColors.primary,
    paddingBottom: 5,
  },
  registerContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
    color: Colors.primaryColors.dark,
  },
  registerLinkText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.primaryColors.primary,
  },
  errorText: {
    fontFamily: 'Nunito-Regular',
    color: Colors.primaryColors.danger,
    fontSize: 12,
    textAlign: 'center',
  },
});
