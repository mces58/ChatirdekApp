import React, { useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import i18next from 'i18next';

import { Group } from 'src/constants/types/group';
import { Theme, useTheme } from 'src/context/ThemeContext';

interface BackHeaderWithUsersProps {
  group: Group;
  icon: React.ReactNode;
  meId: string;
  onPressIcon: () => void;
  onPressHeader: () => void;
  componentSize?: StyleProp<ViewStyle> & { height: number };
}

const BackHeaderWithUsers: React.FC<BackHeaderWithUsersProps> = ({
  group,
  icon,
  meId,
  onPressIcon,
  onPressHeader,
  componentSize = { height: 100 },
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.container, componentSize]}>
      <TouchableOpacity onPress={onPressHeader} style={{ flex: 1 }}>
        <View style={styles.row}>
          <TouchableOpacity onPress={onPressIcon}>{icon}</TouchableOpacity>
          <Text style={styles.title}>{group?.name}</Text>
        </View>
        <View style={styles.membersContainer}>
          <Text style={styles.membersText}>
            {meId === group?.owner?.id ? i18next.t('global.you') : group?.owner?.userName}
          </Text>
          {group?.members?.slice(0, 3)?.map((member, index) => (
            <Text key={index} style={styles.membersText}>
              {member.id === meId ? i18next.t('global.you') : member.userName}
            </Text>
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BackHeaderWithUsers;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.headerBackgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      shadowColor: theme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
    row: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 24,
      color: theme.textColor,
      marginTop: 3,
    },
    membersContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingLeft: 30,
    },
    membersText: {
      fontFamily: 'Nunito-Regular',
      fontSize: 16,
      color: theme.textColor,
    },
  });
