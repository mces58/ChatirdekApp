import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Formik } from 'formik';
import i18next from 'i18next';

import Button from 'src/components/button/Button';
import DropDown from 'src/components/dropDown/DropDown';
import { Colors } from 'src/constants/color/colors';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Response } from 'src/constants/types/response';
import { RegisterData } from 'src/constants/types/user';
import RegisterModal from 'src/screens/Login/components/RegisterModal';
import authService from 'src/services/auth-service';
import { registerValidation } from 'src/validations/register';

interface RegisterFormProps {
  gotoLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ gotoLogin }) => {
  const [registerModalVisible, setRegisterModalVisible] = useState<boolean>(false);

  const initialValues: RegisterData = {
    fullName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  };

  const submitRegister = async (
    values: RegisterData,
    resetForm: () => void
  ): Promise<void> => {
    try {
      const response: Response = await authService.register(values);
      if (response.success) {
        setRegisterModalVisible(true);
        resetForm();
      }
    } catch (error) {
      Alert.alert('Error', i18next.t('error.register'), [
        { text: i18next.t('global.ok') },
      ]);
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidation}
      onSubmit={(values, { resetForm }) => {
        submitRegister(values, resetForm);
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
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={i18next.t('global.fullName')}
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              placeholderTextColor={Colors.primaryColors.textMuted}
            />
            {touched.fullName && errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={i18next.t('global.username')}
              value={values.userName}
              onChangeText={handleChange('userName')}
              onBlur={handleBlur('userName')}
              placeholderTextColor={Colors.primaryColors.textMuted}
            />
            {touched.userName && errors.userName && (
              <Text style={styles.errorText}>{errors.userName}</Text>
            )}
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={i18next.t('global.email')}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholderTextColor={Colors.primaryColors.textMuted}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.textInputContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={i18next.t('global.password')}
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholderTextColor={Colors.primaryColors.textMuted}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={i18next.t('global.confirmPassword')}
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              placeholderTextColor={Colors.primaryColors.textMuted}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          <View style={styles.textInputContainer}>
            <DropDown
              title={i18next.t('global.gender')}
              data={[
                { label: i18next.t('global.male'), value: 'male' },
                { label: i18next.t('global.female'), value: 'female' },
              ]}
              value={values.gender}
              setValue={handleChange('gender')}
            />
            {touched.gender && errors.gender && (
              <Text style={styles.errorText}>{errors.gender}</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button title={i18next.t('global.register')} onPress={handleSubmit} />
            <View style={styles.linkContainer}>
              <Text style={styles.loginText}>
                {i18next.t('register.alreadyHaveAnAccount')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  resetForm();
                  gotoLogin();
                }}
              >
                <Text style={styles.loginLinkText}>{i18next.t('global.login')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {registerModalVisible && (
            <RegisterModal
              isVisible={registerModalVisible}
              onClose={() => {
                setRegisterModalVisible(false);
              }}
              onGoToLogin={() => {
                setRegisterModalVisible(false);
                gotoLogin();
              }}
            />
          )}
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    gap: 20,
    alignItems: 'center',
  },
  textInputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  textInput: {
    width: '100%',
    height: ScaleVertical(40),
    paddingHorizontal: ScaleHorizontal(10),
    borderRadius: ScaleHorizontal(10),
    borderWidth: ScaleHorizontal(1),
    borderColor: Colors.primaryColors.dark,
  },
  errorText: {
    fontFamily: 'Nunito-Regular',
    fontSize: ScaleFontSize(10),
    color: Colors.primaryColors.danger,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  loginText: {
    fontFamily: 'Nunito-Medium',
    fontSize: ScaleFontSize(13),
    color: Colors.primaryColors.dark,
  },
  loginLinkText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: ScaleFontSize(13),
    color: Colors.primaryColors.primary,
  },
});
