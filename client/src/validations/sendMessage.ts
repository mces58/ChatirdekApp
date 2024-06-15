import i18next from 'i18next';
import * as Yup from 'yup';

export const sendMessageValidation = Yup.object().shape({
  message: Yup.string()
    .trim()
    .required(i18next.t('alert.fillAllFields'))
    .max(1000, i18next.t('alert.maxLength', { length: 1000 }))
    .label('Message'),
});
