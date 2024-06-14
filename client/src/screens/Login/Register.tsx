import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { LinearGradient } from 'expo-linear-gradient';
import i18next from 'i18next';
import LottieView from 'lottie-react-native';

import registerAnimation from 'src/assets/animatons/register.json';
import { Colors } from 'src/constants/color/colors';
import RegisterForm from 'src/forms/RegisterForm';
import { RegisterProps } from 'src/navigations/RootStackParamList';
import { GetGradientStartEnd } from 'src/utils/rotate';

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 4000 }),
        withTiming(1.1, { duration: 4000 })
      ),
      -1,
      true
    );

    translateY.value = withRepeat(
      withSequence(
        withTiming(-50, { duration: 2000 }),
        withTiming(-80, { duration: 2000 })
      ),
      -1,
      true
    );

    rotate.value = withRepeat(
      withTiming(rotate.value + 360, { duration: 4500, easing: Easing.ease }),
      -1,
      false
    );
  }, [scale, translateY, rotate]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          height: SCREEN_HEIGHT * 1.5,
          gap: 50,
        }}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={['#FFCCDD', '#FFA07A', '#FF6347', '#FF4500', '#FF0000']}
            {...GetGradientStartEnd(0)}
            style={[
              styles.lineaderGradient,
              styles.shadow,
              {
                borderRadius: SCREEN_WIDTH * 0.8,
                width: SCREEN_WIDTH * 1.5,
                height: SCREEN_HEIGHT * 0.75,
                top: -SCREEN_WIDTH * 0.6,
                left: -SCREEN_WIDTH * 0.25,
              },
            ]}
          >
            <Animated.View style={[styles.animation, animatedStyle]}>
              <LottieView
                source={registerAnimation}
                style={{
                  width: SCREEN_WIDTH * 0.85,
                  height: SCREEN_WIDTH * 0.85,
                  position: 'absolute',
                  bottom: -SCREEN_WIDTH * 0.1,
                }}
                autoPlay
                loop
                speed={1}
                resizeMode="cover"
              />
            </Animated.View>
          </LinearGradient>
        </View>
        <View style={styles.body}>
          <View style={styles.container}>
            <View style={styles.textHeaderContainer}>
              <Text style={styles.textHeader}>{i18next.t('register.header')}</Text>
              <Text style={styles.textBody}>{i18next.t('register.subHeader')}</Text>
            </View>

            <RegisterForm gotoLogin={() => navigation.navigate('Login')} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.primaryColors.light,
  },
  header: {
    height: '30%',
  },
  lineaderGradient: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  animation: {
    alignItems: 'center',
  },
  body: {
    height: '70%',
  },
  container: {
    flex: 1,
    gap: 30,
    alignItems: 'center',
  },
  textHeaderContainer: {
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    color: Colors.primaryColors.dark,
  },
  textBody: {
    fontFamily: 'Nunito-Medium',
    fontSize: 18,
    color: Colors.primaryColors.dark,
    textAlign: 'center',
  },
  shadow: {
    shadowColor: Colors.primaryColors.dark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10,
  },
});
