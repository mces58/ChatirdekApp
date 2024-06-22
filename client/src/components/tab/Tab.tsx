import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Theme, useTheme } from 'src/context/ThemeContext';

type TabContent = {
  title: string;
  content: JSX.Element;
};

type TabProps = {
  tabs: TabContent[];
};

const Tab: React.FC<TabProps> = ({ tabs }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const handleTabPress = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map(({ title }) => (
          <TouchableOpacity
            key={title}
            style={[
              styles.tab,
              activeTab === title && styles.activeTab,
              title === tabs[0].title && styles.leftTab,
              title === tabs[tabs.length - 1].title && styles.rightTab,
            ]}
            onPress={() => handleTabPress(title)}
          >
            <Text style={[styles.tabText, activeTab === title && styles.activeTabText]}>
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentContainer}>
        {tabs.map(({ title, content }) => (
          <View key={title} style={[activeTab !== title && styles.hidden]}>
            {content}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Tab;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: ScaleVertical(18),
    },
    tabContainer: {
      flexDirection: 'row',
      marginHorizontal: ScaleHorizontal(18),
      borderWidth: ScaleHorizontal(1),
      borderColor: theme.borderColor,
      borderRadius: ScaleHorizontal(15),
    },
    tab: {
      flex: 1,
      paddingVertical: ScaleVertical(10),
      backgroundColor: theme.borderColor,
    },
    activeTab: {
      backgroundColor: theme.backgroundColor,
    },
    leftTab: {
      borderTopLeftRadius: ScaleHorizontal(15),
      borderBottomLeftRadius: ScaleHorizontal(15),
    },
    rightTab: {
      borderTopRightRadius: ScaleHorizontal(15),
      borderBottomRightRadius: ScaleHorizontal(15),
    },
    tabText: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: ScaleFontSize(13),
      lineHeight: ScaleVertical(20),
      textAlign: 'center',
      color: theme.textMutedColor,
    },
    activeTabText: {
      color: theme.textColor,
    },
    contentContainer: {
      flex: 1,
      width: '100%',
      paddingHorizontal: ScaleHorizontal(12),
    },
    hidden: {
      display: 'none',
    },
  });
