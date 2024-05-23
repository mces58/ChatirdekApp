import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface SwitchButtonProps {
  activeColor: string;
  inActiveColor: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ activeColor, inActiveColor }) => {
  const switchTranslate = useSharedValue(0);
  const [active, setActive] = useState(false);
  const progress = useDerivedValue(() => {
    return withTiming(active ? 22 : 0);
  });

  useEffect(() => {
    if (active) {
      switchTranslate.value = 22;
    } else {
      switchTranslate.value = 4;
    }
  }, [active, switchTranslate]);

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(switchTranslate.value, {
            mass: 1,
            damping: 15,
            stiffness: 120,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
          }),
        },
      ],
    };
  });

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 22],
      [inActiveColor, activeColor]
    );
    return {
      backgroundColor,
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setActive(!active);
      }}
    >
      <Animated.View style={[styles.container, backgroundColorStyle]}>
        <Animated.View style={[styles.circle, customSpringStyles]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default SwitchButton;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: '#F2F5F7',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
});
