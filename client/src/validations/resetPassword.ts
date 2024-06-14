import i18next from 'i18next';
import * as Yup from 'yup';

export const resetPasswordValidation = Yup.object().shape({
  password: Yup.string()
    .min(6, i18next.t('alert.passwordLength', { length: 6 }))
    .required(i18next.t('alert.fillAllFields'))
    .label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], i18next.t('alert.passwordsDoNotMatch'))
    .required(i18next.t('alert.fillAllFields'))
    .label('Confirm Password'),
});
