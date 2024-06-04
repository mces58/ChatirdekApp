import React, { ReactNode } from 'react';

import {
  ChatSettingIcon,
  InfoIcon,
  LocationCompanyIcon,
  LogoutIcon,
  PaletteIcon,
  TranslateIcon,
  ViewOffIcon,
} from 'src/assets/icons/settings';

export interface SettingBottomSheet {
  name: string;
  label: string;
  icon: ReactNode;
}

const settingBottomSheets: SettingBottomSheet[] = [
  {
    name: 'Language',
    label: 'Language',
    icon: <TranslateIcon width={20} height={20} />,
  },
  { name: 'Theme', label: 'Theme', icon: <PaletteIcon width={20} height={20} /> },
  { name: 'Chats', label: 'Chats', icon: <ChatSettingIcon width={20} height={20} /> },
  { name: 'Privacy', label: 'Privacy', icon: <ViewOffIcon width={20} height={20} /> },
  { name: 'Help', label: 'Help', icon: <InfoIcon width={20} height={20} /> },
  {
    name: 'AboutUs',
    label: 'About Us',
    icon: <LocationCompanyIcon width={20} height={20} />,
  },
  { name: 'Logout', label: 'Logout', icon: <LogoutIcon width={20} height={20} /> },
];

export default settingBottomSheets;
