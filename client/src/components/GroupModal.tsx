import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import axios from 'axios';

import { BASE_URL } from 'src/services/baseUrl';

interface GroupModalProps {
  isVisible: boolean;
  onClose: () => void;
  user: any;
  navigation?: any;
  groupId?: string;
}

const GroupModal: React.FC<GroupModalProps> = ({
  isVisible,
  onClose,
  user,
  navigation,
  groupId,
}) => {
  const handleRemoveUser = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/groups/${groupId}/members/${user._id}`);
      console.log(res.data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        animationIn={'zoomIn'}
        animationInTiming={1000}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              backgroundColor: 'red',
              padding: 5,
              borderRadius: 50,
              width: 30,
              alignItems: 'center',
            }}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '100%',
              padding: 10,
              backgroundColor: 'lightgray',
              borderRadius: 30,
            }}
            onPress={() => {
              navigation.navigate('Chat', {
                receiverId: user._id,
              });
              onClose();
            }}
          >
            <Text>Message {user.fullName}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              padding: 10,
              backgroundColor: 'lightgray',
              borderRadius: 30,
            }}
            onPress={() => {
              navigation.navigate('UserProfile', {
                user,
              });
              onClose();
            }}
          >
            <Text>View {user.fullName}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              padding: 10,
              backgroundColor: 'lightgray',
              borderRadius: 30,
            }}
            onPress={handleRemoveUser}
          >
            <Text>Remove {user.fullName}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              padding: 10,
              backgroundColor: 'lightgray',
              borderRadius: 30,
            }}
          >
            <Text>Make Group Admin</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default GroupModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
