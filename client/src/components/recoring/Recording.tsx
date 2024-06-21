import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

import MicrophoneIcon from 'src/assets/icons/microphone';
import StopIcon from 'src/assets/icons/stop';
import { Colors } from 'src/constants/color/colors';

import { RecordingOptions } from 'expo-av/build/Audio';

interface RecordingProps {
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
  onRecordingFinish: (uri: string | null) => void;
  setBase64DataUri: (dataUri: string | null) => void;
}

const Recording: React.FC<RecordingProps> = ({
  isRecording,
  setIsRecording,
  onRecordingFinish,
  setBase64DataUri,
}) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const toggleRecording = async () => {
    try {
      if (isRecording) {
        if (recording) {
          await recording.stopAndUnloadAsync();
          const uri = recording.getURI();
          console.log('Recording stopped and stored at', uri);

          setRecording(null);
          setIsRecording(false);

          if (uri) {
            const base64 = await convertToBase64(uri);
            setBase64DataUri(base64);
          }
          onRecordingFinish(uri);
        }
      } else {
        const permission = await Audio.requestPermissionsAsync();

        if (permission.status === 'granted') {
          if (recording) {
            await recording.stopAndUnloadAsync();
            setRecording(null);
          }

          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });

          const newRecording = new Audio.Recording();
          const RECORDING_OPTIONS_PRESET_LOW_QUALITY: RecordingOptions = {
            android: {
              extension: '.mp4',
              outputFormat: Audio.AndroidOutputFormat.MPEG_4,
              audioEncoder: Audio.AndroidAudioEncoder.AAC,
              sampleRate: 44100,
              numberOfChannels: 1,
              bitRate: 64000,
            },
            ios: {
              extension: '.wav',
              outputFormat: Audio.IOSOutputFormat.LINEARPCM,
              audioQuality: Audio.IOSAudioQuality.MIN,
              sampleRate: 44100,
              numberOfChannels: 1,
              bitRate: 64000,
              linearPCMBitDepth: 16,
              linearPCMIsBigEndian: false,
              linearPCMIsFloat: false,
            },
            web: {
              mimeType: 'audio/wav',
            },
          };
          await newRecording.prepareToRecordAsync(RECORDING_OPTIONS_PRESET_LOW_QUALITY);
          await newRecording.startAsync();

          setRecording(newRecording);
          setIsRecording(true);
          console.log('Recording started');
        } else {
          throw new Error('Permission not granted');
        }
      }
    } catch (error) {
      console.error('Failed to toggle recording', error);
    }
  };

  const convertToBase64 = async (uri: string): Promise<string> => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return `data:audio/mp4;base64,${base64}`;
    } catch (error) {
      console.error('Failed to convert to base64', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleRecording}>
        {isRecording ? (
          <View style={[styles.icon, styles.shadow]}>
            <StopIcon width={25} height={25} />
          </View>
        ) : (
          <View style={[styles.icon, styles.shadow]}>
            <MicrophoneIcon width={25} height={25} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Recording;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: Colors.primaryColors.headerColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
