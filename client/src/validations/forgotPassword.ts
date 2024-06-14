import i18next from 'i18next';
import * as Yup from 'yup';

export const forgotPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email(i18next.t('alert.invalidEmail'))
    .required(i18next.t('alert.fillAllFields'))
    .label('Email'),
});
