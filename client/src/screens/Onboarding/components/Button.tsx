import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  AnimatedRef,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import i18next from 'i18next';

import ArrowIcon from 'src/assets/icons/arrow';
import { Colors } from 'src/constants/color/colors';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';

import { OnboardingData } from '../data';

interface CustomButtonProps {
  dataLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<OnboardingData>>;
  x: SharedValue<number>;
  navigation: NativeStackNavigationProp<any>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  flatListRef,
  flatListIndex,
  dataLength,
  x,
  navigation,
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width: flatListIndex.value === dataLength - 1 ? withSpring(140) : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity: flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1 ? withTiming(100) : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(-100),
        },
      ],
    };
  });
  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      [
        Colors.primaryColors.dark,
        Colors.primaryColors.darkBlue,
        Colors.primaryColors.orange,
      ]
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
        } else {
          navigation.navigate('Login');
        }
      }}
    >
      <Animated.View style={[styles.container, buttonAnimationStyle, animatedColor]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          {i18next.t('onboarding.button')}
        </Animated.Text>
        <Animated.View style={[styles.arrow, arrowAnimationStyle]}>
          <ArrowIcon
            width={ScaleHorizontal(25)}
            height={ScaleVertical(25)}
            customColor={Colors.primaryColors.light}
            direction="right"
          />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColors.orange,
    paddingHorizontal: ScaleHorizontal(8),
    paddingVertical: ScaleVertical(8),
    borderRadius: ScaleHorizontal(99),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
    position: 'absolute',
  },
  textButton: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primaryColors.light,
    fontSize: ScaleFontSize(14),
    position: 'absolute',
  },
});
