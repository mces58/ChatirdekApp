import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import i18next from 'i18next';

import { Colors } from 'src/constants/color/colors';
import { Group } from 'src/constants/types/group';
import { Theme, useTheme } from 'src/context/ThemeContext';
import { GetGradientStartEnd } from 'src/utils/rotate';

interface GroupCardProps {
  group: Group;
  onPressCard: () => void;
  index: number;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onPressCard, index }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <LinearGradient
      colors={[
        Colors.primaryColors.linearGradient1,
        Colors.primaryColors.linearGradient2,
      ]}
      style={[styles.cardContainer, styles.shadow]}
      {...GetGradientStartEnd(index)}
    >
      <TouchableOpacity onPress={onPressCard}>
        <View style={styles.row}>
          <View style={styles.groupContainer}>
            <Text style={styles.groupNameText}>{group.name}</Text>
            <Text style={styles.lastMessageText}>{group.createdAt}</Text>
          </View>
          <Text style={styles.groupMemberText}>
            {group.members.length}{' '}
            {group.members.length > 1
              ? i18next.t('global.members')
              : i18next.t('global.member')}
          </Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default GroupCard;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    row: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    groupContainer: {
      flex: 1,
    },
    groupNameText: {
      fontFamily: 'Poppins-Bold',
      fontSize: 18,
      color: Colors.primaryColors.dark,
    },
    lastMessageText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 12,
      color: Colors.primaryColors.dark,
      opacity: 0.8,
    },
    groupMemberText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 14,
      color: Colors.primaryColors.dark,
      opacity: 0.8,
    },
    shadow: {
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
