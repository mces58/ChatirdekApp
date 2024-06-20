import i18next from 'i18next';
import * as Yup from 'yup';

export const registerValidation = Yup.object().shape({
  fullName: Yup.string()
    .max(15, i18next.t('alert.maxCharacter', { length: 15 }))
    .min(2, i18next.t('alert.minCharacter', { length: 2 }))
    .matches(/^[a-zA-Z\s]+$/, i18next.t('alert.invalidFullName'))
    .required(i18next.t('alert.fillAllFields'))
    .label('Full Name'),
  userName: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, i18next.t('alert.invalidUsername'))
    .max(15, i18next.t('alert.maxCharacter', { length: 15 }))
    .min(2, i18next.t('alert.minCharacter', { length: 2 }))
    .required(i18next.t('alert.fillAllFields'))
    .label('Username'),
  email: Yup.string()
    .email(i18next.t('alert.invalidEmail'))
    .required(i18next.t('alert.fillAllFields'))
    .label('Email'),
  password: Yup.string()
    .max(15, i18next.t('alert.passwordLength', { length: 15 }))
    .min(6, i18next.t('alert.passwordLength', { length: 6 }))
    .required(i18next.t('alert.fillAllFields'))
    .label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], i18next.t('alert.passwordsDoNotMatch'))
    .required(i18next.t('alert.fillAllFields'))
    .label('Confirm Password'),
  gender: Yup.string().required(i18next.t('alert.fillAllFields')).label('Gender'),
});
