import i18next from 'i18next';
import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
  userName: Yup.string()
    .trim()
    .matches(/^[a-zA-Z0-9]+$/)
    .max(15, i18next.t('alert.maxCharacter', { length: 15 }))
    .min(2, i18next.t('alert.minCharacter', { length: 2 }))
    .required(i18next.t('alert.fillAllFields'))
    .label('Username'),
  password: Yup.string()
    .trim()
    .max(15, i18next.t('alert.maxCharacter', { length: 15 }))
    .min(6, i18next.t('alert.passwordLength', { length: 6 }))
    .required(i18next.t('alert.fillAllFields'))
    .label('Password'),
});
