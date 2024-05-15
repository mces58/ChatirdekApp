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
    text: 'Sayfa 1',
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce',
  },
  {
    id: 2,
    animation: onboarding2,
    text: 'Sayfa 2',
    textColor: '#1e2169',
    backgroundColor: '#bae4fd',
  },
  {
    id: 3,
    animation: onboarding3,
    text: 'Sayfa 3',
    textColor: '#F15937',
    backgroundColor: '#faeb8a',
  },
];

export default data;
