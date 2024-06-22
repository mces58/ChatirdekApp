import React, { ReactNode } from 'react';

import { FontSizeIcon, PaintBucketIcon } from 'src/assets/icons/chat-settings';
import { ScaleHorizontal, ScaleVertical } from 'src/constants/screen/screenSize';

export interface ChatSettingModals {
  name: string;
  label: string;
  icon: ReactNode;
}

const chatSettingModals: ChatSettingModals[] = [
  {
    name: 'FontSize',
    label: 'Font Size',
    icon: <FontSizeIcon width={ScaleHorizontal(22)} height={ScaleVertical(22)} />,
  },
  {
    name: 'WallpaperColor',
    label: 'Wallpaper Color',
    icon: <PaintBucketIcon width={ScaleHorizontal(22)} height={ScaleVertical(22)} />,
  },
];

export default chatSettingModals;
