import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

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
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 15,
  },
});
