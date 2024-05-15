import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

import loginAnimation from 'src/assets/animatons/login.json';
import { GetGradientStartEnd } from 'src/utils/rotate';

type LoginProps = {
  navigation: any;
};

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 2000 }),
        withTiming(1.1, { duration: 2000 })
      ),
      -1,
      true
    );

    translateY.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 1000 }),
        withTiming(-10, { duration: 1000 })
      ),
      -1,
      true
    );
  }, [scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
    };
  });

  return (
    <KeyboardAvoidingView
      style={[styles.itemContainer]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          height: SCREEN_HEIGHT,
          gap: 50,
        }}
      >
        <View
          style={{
            height: '40%',
          }}
        >
          <LinearGradient
            colors={['#FFCCDD', '#FFA07A', '#FF6347', '#FF4500', '#FF0000']}
            {...GetGradientStartEnd(0)}
            style={{
              borderRadius: SCREEN_WIDTH * 0.8,
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: SCREEN_WIDTH * 1.5,
              height: SCREEN_WIDTH * 1.5,
              top: -SCREEN_WIDTH * 0.6,
              left: -SCREEN_WIDTH * 0.25,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 15,
            }}
          >
            <Animated.View
              style={[
                {
                  alignItems: 'center',
                },
                animatedStyle,
              ]}
            >
              <LottieView
                source={loginAnimation}
                style={{
                  width: SCREEN_WIDTH * 0.85,
                  height: SCREEN_WIDTH * 0.85,
                  position: 'absolute',
                  bottom: -SCREEN_WIDTH * 0.1,
                  transform: [{ rotate: '35deg' }],
                }}
                autoPlay
                loop
                speed={2}
                resizeMode="cover"
              />
            </Animated.View>
          </LinearGradient>
        </View>
        <View
          style={{
            height: '60%',
          }}
        >
          <View
            style={{
              flex: 1,
              gap: 10,
              alignItems: 'center',
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 44,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  marginHorizontal: 20,
                }}
              >
                Login
              </Text>
              <Text style={{ fontSize: 20, marginHorizontal: 20 }}>
                Please enter your credentials to login
              </Text>
            </View>

            <TextInput
              style={{
                height: 50,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                width: SCREEN_WIDTH * 0.8,
                borderRadius: 10,
              }}
              placeholder="Username"
            />
            <TextInput
              style={{
                height: 50,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                width: SCREEN_WIDTH * 0.8,
                borderRadius: 10,
              }}
              placeholder="Password"
            />

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
              }}
            >
              <Text style={{ color: 'blue' }}>Forgot password?</Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: 'blue',
                padding: 10,
                borderRadius: 10,
                width: SCREEN_WIDTH * 0.8,
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('Main')}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 20,
              }}
            >
              <Text>Don't have an account?</Text>
              <Text style={{ color: 'blue' }}>Register</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
