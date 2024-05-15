import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { messsagesData } from './data';

type HomeProps = {
  navigation: any;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [search, setSearch] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState(messsagesData);

  const handleSearch = (text: string) => {
    setSearch(text);

    const filteredData = messsagesData.filter((item) => {
      return item.fullName.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredUsers(filteredData);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: {
      userImg: string;
      isOnline: boolean;
      fullName: string;
      lastMessage: string;
      lastMessageTime: string;
      messageInQueue: number;
    };
  } & { index: number }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Chat', { user: item });
        }}
        style={[
          styles.userContainer,
          index % 2 !== 0 ? { backgroundColor: '#f2f2f2' } : {},
        ]}
      >
        <View style={styles.userImageContainer}>
          {item.isOnline && item.isOnline === true && (
            <View style={styles.onlineIndicator} />
          )}
          <Image source={{ uri: item.userImg }} style={styles.userImage} />
        </View>
        <View style={{ flexDirection: 'row', width: '90%', paddingVertical: 20 }}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>{item.fullName}</Text>
            <Text style={styles.lastSeen}>{item.lastMessage}</Text>
          </View>

          <View
            style={{ position: 'absolute', right: 30, top: 20, alignItems: 'center' }}
          >
            <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
            <View>
              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: item.messageInQueue > 0 ? 'gray' : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <Text style={styles.messageInQueue}>{item.messageInQueue}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    return (
      <View style={{ marginBottom: 250 }}>
        <View style={styles.searchBar}>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={search}
            onChangeText={handleSearch}
          />

          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchText}>Düzenle</Text>
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={filteredUsers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <View style={styles.container}>{renderContent()}</View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 50,
    marginVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 8,
  },
  searchText: {
    color: '#fff',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
  userContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  userImageContainer: {
    paddingVertical: 8,
    marginRight: 8,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  onlineIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'green',
    position: 'absolute',
    top: 10,
    right: 0,
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  userInfoContainer: {
    width: '70%',
    paddingVertical: 8,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  lastSeen: {
    fontSize: 12,
    color: 'gray',
  },
  lastMessageTime: {
    fontSize: 12,
    color: 'gray',
  },
  messageInQueue: {
    color: '#fff',
  },
});
