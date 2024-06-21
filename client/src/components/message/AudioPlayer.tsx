import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Audio } from 'expo-av';

import PlayIcon from 'src/assets/icons/play';
import StopIcon from 'src/assets/icons/stop';
import { Colors } from 'src/constants/color/colors';

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const sound = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    loadSound();
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && sound.current) {
      interval = setInterval(async () => {
        const status = await sound.current!.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
        }
      }, 500);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying]);

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);

      if (status.positionMillis === status.durationMillis) {
        stopSound();
      }
    }
  };

  const loadSound = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false }
      );
      sound.current = newSound;
      sound.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      const status = await sound.current.getStatusAsync();
      if (status.isLoaded && status.durationMillis) {
        setDuration(status.durationMillis);
      }
    } catch (error) {
      console.error('Failed to load sound', error);
    }
  };

  const playSound = async () => {
    if (sound.current) {
      await sound.current.playAsync();
      setIsPlaying(true);
    }
  };

  const stopSound = async () => {
    if (sound.current) {
      await sound.current.stopAsync();
      setIsPlaying(false);
      setPosition(0);
    }
  };

  const formatDuration = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={isPlaying ? stopSound : playSound}
          style={styles.button}
        >
          {isPlaying ? (
            <StopIcon width={17} height={17} />
          ) : (
            <PlayIcon width={17} height={17} />
          )}
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { width: duration ? `${(position / duration) * 100}%` : '0%' },
            ]}
          />
        </View>
      </View>
      {duration !== null && (
        <Text style={styles.durationText}>
          {formatDuration(position)} / {formatDuration(duration)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  button: {
    backgroundColor: Colors.primaryColors.headerColor,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    height: 5,
    backgroundColor: Colors.primaryColors.gray,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primaryColors.headerColor,
  },
  durationText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
    color: Colors.primaryColors.dark,
    alignSelf: 'flex-end',
  },
});

export default AudioPlayer;
