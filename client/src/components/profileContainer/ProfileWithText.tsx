import React, { useMemo, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Theme, useTheme } from 'src/context/ThemeContext';

import ProfileImage from './ProfileImage';
import ProfileModal from './ProfileModal';

interface ProfileWithTextProps {
  text: string;
  imageUri: string;
  componentSize: StyleProp<ViewStyle> & { width: number; height: number };
}

const ProfileWithText: React.FC<ProfileWithTextProps> = ({
  text,
  imageUri,
  componentSize,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <ProfileImage imageUri={imageUri} componentSize={componentSize} disabled />
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>

      <ProfileModal
        imageUri={imageUri}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

export default ProfileWithText;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 10,
      borderBottomWidth: ScaleHorizontal(1),
      borderBottomColor: theme.borderColor,
      paddingBottom: ScaleVertical(12),
    },
    text: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: ScaleFontSize(18),
      color: theme.textColor,
    },
  });
