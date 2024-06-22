import i18next from 'i18next';
import * as Yup from 'yup';

export const newValueSchema = (type: string) => {
  return Yup.object().shape({
    newValue:
      type === 'userName'
        ? Yup.string()
            .trim()
            .matches(/^[a-zA-Z0-9]+$/)
            .min(2, i18next.t('alert.minCharacter', { length: 2 }))
            .required(i18next.t('alert.fillAllFields'))
            .label('Username')
        : Yup.string()
            .trim()
            .required(i18next.t('alert.fillAllFields'))
            .label('Full Name'),
  });
};
