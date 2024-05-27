import React, { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { RouteProp } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import animation from 'src/assets/animatons/setting.json';
import ArrowIcon from 'src/assets/icons/arrow';
import CalendarIcon from 'src/assets/icons/calendar';
import CameraIcon from 'src/assets/icons/camera';
import GhostIcon from 'src/assets/icons/ghost';
import IdIcon from 'src/assets/icons/id';
import InfoIcon from 'src/assets/icons/info';
import PenIcon from 'src/assets/icons/pen';
import ProfilePhotoBottomSheet from 'src/components/ProfilePhotoBottomSheet';
import SetProfileValueBottomSheet from 'src/components/SetProfileValueBottomSheet';

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
  const [fullNameBoxVisible, setFullNameBoxVisible] = useState(false);
  const [userNameBoxVisible, setUserNameBoxVisible] = useState(false);
  const [aboutBoxVisible, setAboutBoxVisible] = useState(false);
  const [fullName, setFullName] = useState(route?.params?.user?.fullName);
  const [userName, setUserName] = useState(route?.params?.user?.userName);
  const [about, setAbout] = useState(route?.params?.user?.about);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

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

      <LottieView
        style={{
          position: 'absolute',
          bottom: SCREEN_HEIGHT * -0.1,
          left: 0,
          width: SCREEN_WIDTH * 1,
          height: SCREEN_WIDTH * 1,
          zIndex: 10,
        }}
        source={animation}
        autoPlay
        loop
        speed={1}
        resizeMode="cover"
      />

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

      <TouchableOpacity
        style={{
          width: '95%',
          marginTop: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
          paddingBottom: 15,
        }}
        onPress={() => setFullNameBoxVisible(true)}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 25,
          }}
        >
          <IdIcon width={30} height={30} color="black" />
          <View
            style={{
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'gray',
              }}
            >
              Full Name:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text>{fullName}</Text>
            </View>
          </View>
        </View>

        <PenIcon width={25} height={25} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: '95%',
          marginTop: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
          paddingBottom: 15,
        }}
        onPress={() => setUserNameBoxVisible(true)}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 25,
          }}
        >
          <GhostIcon width={30} height={30} color="black" />
          <View
            style={{
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'gray',
              }}
            >
              User Name:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text>{userName}</Text>
            </View>
          </View>
        </View>

        <PenIcon width={25} height={25} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: '95%',
          marginTop: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
          paddingBottom: 15,
        }}
        onPress={() => setAboutBoxVisible(true)}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 25,
          }}
        >
          <InfoIcon width={30} height={30} color="black" strokeWidth={1} />
          <View
            style={{
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'gray',
              }}
            >
              About:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text>{about}</Text>
            </View>
          </View>
        </View>

        <PenIcon width={25} height={25} color="black" />
      </TouchableOpacity>

      <View
        style={{
          width: '95%',
          marginTop: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'lightgray',
          paddingBottom: 15,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 25,
          }}
        >
          <CalendarIcon width={30} height={30} color="black" strokeWidth={1} />
          <View
            style={{
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'gray',
              }}
            >
              Created At:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text>{route?.params?.user?.createdAt.split('T')[0]}</Text>
            </View>
          </View>
        </View>
      </View>

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
            source={{ uri: image ? image : route?.params?.user?.profilePicture }}
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

      {fullNameBoxVisible && (
        <SetProfileValueBottomSheet
          title="Enter Full Name"
          placeholder="Enter your full name"
          isVisible={fullNameBoxVisible}
          onSwipeDown={() => setFullNameBoxVisible(false)}
          setValue={(value: string) => {
            setFullName(value);
          }}
          value={fullName}
        />
      )}

      {userNameBoxVisible && (
        <SetProfileValueBottomSheet
          title="Enter User Name"
          placeholder="Enter your user name"
          isVisible={userNameBoxVisible}
          onSwipeDown={() => setUserNameBoxVisible(false)}
          setValue={(value: string) => {
            setUserName(value);
          }}
          value={userName}
        />
      )}

      {aboutBoxVisible && (
        <SetProfileValueBottomSheet
          title="About"
          placeholder="Tell us about yourself"
          isVisible={aboutBoxVisible}
          onSwipeDown={() => setAboutBoxVisible(false)}
          setValue={(value: string) => {
            setAbout(value);
          }}
          value={about}
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
