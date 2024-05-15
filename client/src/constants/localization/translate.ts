import { useTranslation } from 'react-i18next';

const translate = (text: string): string => {
  const { t } = useTranslation();
  return t(text);
};

export default translate;
