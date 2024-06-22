import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { ScaleHorizontal, ScaleVertical } from 'src/constants/screen/screenSize';

import ProfileModal from '../profileContainer/ProfileModal';

interface ImageMessageProps {
  uri: string;
}

const ImageMessage: React.FC<ImageMessageProps> = ({ uri }) => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => setIsVisible(true);

  return (
    <>
      <TouchableOpacity style={styles.imageContainer} onPress={openModal}>
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>

      <ProfileModal
        imageUri={uri}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </>
  );
};

export default ImageMessage;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: ScaleHorizontal(10),
    overflow: 'hidden',
    marginVertical: ScaleVertical(5),
  },
  image: {
    width: ScaleHorizontal(190),
    height: ScaleVertical(190),
    borderRadius: ScaleHorizontal(15),
  },
});
