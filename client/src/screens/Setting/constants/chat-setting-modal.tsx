import React, { ReactNode } from 'react';

import { FontSizeIcon, PaintBucketIcon } from 'src/assets/icons/chat-settings';

export interface ChatSettingModals {
  name: string;
  label: string;
  icon: ReactNode;
}

const chatSettingModals: ChatSettingModals[] = [
  {
    name: 'FontSize',
    label: 'Font Size',
    icon: <FontSizeIcon width={22} height={22} />,
  },
  {
    name: 'WallpaperColor',
    label: 'Wallpaper Color',
    icon: <PaintBucketIcon width={22} height={22} />,
  },
];

export default chatSettingModals;
