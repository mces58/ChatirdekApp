import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

interface WallpaperModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const CIRCLE_SIZE = 40;
const CIRCLE_RING_SIZE = 2;

const WallpaperModal: React.FC<WallpaperModalProps> = ({ isVisible, onClose }) => {
  const [value, setValue] = useState(0);
  const colors = [
    '#6874e7',
    '#b8304f',
    '#758E4F',
    '#fa3741',
    '#F26419',
    '#F6AE2D',
    '#DFAEB4',
    '#7A93AC',
    '#33658A',
    '#3d2b56',
    '#42273B',
    '#171A21',
  ];

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
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'red',
              padding: 5,
              borderRadius: 50,
            }}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>X</Text>
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
                console.log('Selected color:', colors[value]);
                onClose();
              }}
            >
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WallpaperModal;

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
    shadowColor: '#000',
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
    fontWeight: '600',
    color: 'white',
  },
  /** Circle */
  circle: {
    width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    borderRadius: 9999,
    backgroundColor: 'white',
    borderWidth: CIRCLE_RING_SIZE,
    borderColor: 'transparent',
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
  /** Button */
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#000',
    marginBottom: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
