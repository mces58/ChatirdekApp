import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      marginVertical: 20,
    },
    tabContainer: {
      flexDirection: 'row',
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 15,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      backgroundColor: theme.borderColor,
    },
    activeTab: {
      backgroundColor: theme.backgroundColor,
    },
    leftTab: {
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
    },
    rightTab: {
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
    },
    tabText: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
      color: theme.textMutedColor,
    },
    activeTabText: {
      color: theme.textColor,
    },
    contentContainer: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 15,
    },
    hidden: {
      display: 'none',
    },
  });
