import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import CloseIcon from 'src/assets/icons/close';
import BaseModal from 'src/components/modal/BaseModal';
import { Colors } from 'src/constants/color/colors';
import { Theme, useTheme } from 'src/context/ThemeContext';

import { walpaperColors } from '../../constants/wallpaper-colors';

interface WallpaperModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const WallpaperModal: React.FC<WallpaperModalProps> = ({ isVisible, onClose }) => {
  const CIRCLE_SIZE = 40;
  const CIRCLE_RING_SIZE = 2;
  const { theme } = useTheme();
  const styles = useMemo(
    () => createStyles(theme, CIRCLE_SIZE, CIRCLE_RING_SIZE),
    [theme]
  );
  const [value, setValue] = useState(0);
  const [colors] = useState<string[]>(walpaperColors);
  const [selectedColor, setSelectedColor] = useState<string>('');

  const content = (
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <CloseIcon width={30} height={30} color="red" />
      </TouchableOpacity>
      <Text style={styles.title}>Choose a wallpaper color</Text>

      <View style={styles.sheetBody}>
        <View style={[styles.profile, { backgroundColor: colors[value] }]}>
          <Text style={styles.profileText}>MB</Text>
        </View>
        <View style={styles.group}>
          {colors.map((item, index) => {
            const isActive = value === index;
            return (
              <View key={item}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setValue(index);
                  }}
                >
                  <View style={[styles.circle, isActive && { borderColor: item }]}>
                    <View style={[styles.circleInside, { backgroundColor: item }]} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setSelectedColor(colors[value]);
            console.log(selectedColor);
            onClose();
          }}
        >
          <Text style={styles.btnText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return <BaseModal isVisible={isVisible} onClose={onClose} content={content} />;
};

export default WallpaperModal;

const createStyles = (theme: Theme, CIRCLE_SIZE: number, CIRCLE_RING_SIZE: number) =>
  StyleSheet.create({
    modalContent: {
      backgroundColor: theme.backgroundColor,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    title: {
      fontSize: 20,
      fontFamily: 'Poppins-Bold',
      color: theme.textColor,
    },
    group: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: 12,
    },
    sheetBody: {
      padding: 24,
    },
    profile: {
      alignSelf: 'center',
      width: 100,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 9999,
      marginBottom: 24,
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
    profileText: {
      fontSize: 34,
      color: Colors.primaryColors.light,
      fontFamily: 'Poppins-Bold',
    },
    circle: {
      width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
      height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
      borderRadius: 9999,
      backgroundColor: 'transparent',
      borderWidth: CIRCLE_RING_SIZE,
      borderColor: theme.borderColor,
      marginRight: 8,
      marginBottom: 12,
    },
    circleInside: {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: 9999,
      position: 'absolute',
      top: CIRCLE_RING_SIZE,
      left: CIRCLE_RING_SIZE,
    },
    btn: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      padding: 14,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: Colors.primaryColors.success,
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
    btnText: {
      color: Colors.primaryColors.light,
      fontSize: 16,
      fontFamily: 'Poppins-Bold',
    },
  });
