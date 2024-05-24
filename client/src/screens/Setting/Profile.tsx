import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RouteProp } from '@react-navigation/native';

import ArrowIcon from 'src/assets/icons/arrow';
import CameraIcon from 'src/assets/icons/camera';
import ProfilePhotoBottomSheet from 'src/components/ProfilePhotoBottomSheet';

interface ProfileRouteProps {
  user: {
    _id: string;
    fullName: string;
    userName: string;
    profilePicture: string;
    createdAt: string;
  };
}

interface ProfileProps {
  navigation: any;
  route: RouteProp<Record<string, ProfileRouteProps>, string>;
}

const Profile: React.FC<ProfileProps> = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [profilePhotoBoxVisible, setProfilePhotoBoxVisible] = useState(false);
  const [image, setImage] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <ArrowIcon width={20} height={20} color="black" direction="left" />
        <Text>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.profilePictureContainer} onPress={toggleModal}>
        <Image
          source={{ uri: image ? image : route?.params?.user?.profilePicture }}
          style={styles.profilePicture}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            padding: 10,
            borderRadius: 50,
            backgroundColor: 'lightgreen',
          }}
          onPress={() => setProfilePhotoBoxVisible(true)}
        >
          <CameraIcon width={30} height={30} color="black" strokeWidth={3} />
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
            <Text style={styles.modalCloseText}>X</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: route?.params?.user?.profilePicture }}
            style={styles.fullScreenImage}
          />
        </View>
      </Modal>

      {profilePhotoBoxVisible && (
        <ProfilePhotoBottomSheet
          isVisible={profilePhotoBoxVisible}
          onSwipeDown={() => setProfilePhotoBoxVisible(false)}
          setAvatar={(image: string) => {
            setImage(image);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    marginLeft: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePictureContainer: {
    marginTop: 50,
    position: 'relative',
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 100, // Make it circular
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  modalCloseText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default Profile;
