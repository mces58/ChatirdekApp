import i18next from 'i18next';
import { AnimationObject } from 'lottie-react-native';

import onboarding1 from 'src/assets/animatons/onboarding1.json';
import onboarding2 from 'src/assets/animatons/onboarding2.json';
import onboarding3 from 'src/assets/animatons/onboarding3.json';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: onboarding1,
    text: i18next.t('onboarding.page1') || 'Welcome to Chatirdek!',
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce',
  },
  {
    id: 2,
    animation: onboarding2,
    text:
      i18next.t('onboarding.page2') ||
      'Chatirdek is a social media platform that allows users to communicate with each other.',
    textColor: '#1e2169',
    backgroundColor: '#bae4fd',
  },
  {
    id: 3,
    animation: onboarding3,
    text:
      i18next.t('onboarding.page3') ||
      'Chatirdek allows users to message each other, send friend requests and create groups.',
    textColor: '#F15937',
    backgroundColor: '#faeb8a',
  },
];

export default data;
