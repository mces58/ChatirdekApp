import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TabContent = {
  title: string;
  content: JSX.Element;
};

type TwoTabsProps = {
  tabs: TabContent[];
};

const TwoTabs: React.FC<TwoTabsProps> = ({ tabs }) => {
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
            style={[styles.tab, activeTab === title && styles.activeTab]}
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
          <View
            key={title}
            style={[styles.content, activeTab !== title && styles.hidden]}
          >
            {content}
          </View>
        ))}
      </View>
    </View>
  );
};

export default TwoTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: 'black',
  },
  tabText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: '#ccc',
  },
  activeTabText: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
  },
  content: {
    paddingHorizontal: 10,
  },
  hidden: {
    display: 'none',
  },
});
