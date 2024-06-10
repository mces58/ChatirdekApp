import React, { useEffect, useState } from 'react';
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
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

import registerAnimation from 'src/assets/animatons/register1.json';
import RegisterModal from 'src/components/RegisterModal';
import { RegisterProps } from 'src/navigations/RootStackParamList';
import { BASE_URL } from 'src/services/baseUrl';
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

  const [signupData, setSignupData] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
  });

  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  const handleRegister = () => {
    axios
      .post(`${BASE_URL}/auth/signup`, signupData)
      .then((response) => {
        console.log('registration success', response.data);
        setRegisterModalVisible(true);
      })
      .catch((error) => {
        console.log('registration failed', error);
      });
  };

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
            height: '35%',
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
              top: -SCREEN_WIDTH * 0.7,
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
        <View
          style={{
            height: '65%',
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
                Register
              </Text>
              <Text style={{ fontSize: 20, marginHorizontal: 20 }}>
                Register to continue
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
              placeholder="FullName"
              onChangeText={(text) => setSignupData({ ...signupData, fullName: text })}
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
              placeholder="UserName"
              onChangeText={(text) => setSignupData({ ...signupData, userName: text })}
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
              secureTextEntry
              onChangeText={(text) => setSignupData({ ...signupData, password: text })}
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
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={(text) =>
                setSignupData({ ...signupData, confirmPassword: text })
              }
            />

            <TouchableOpacity
              style={{
                backgroundColor: 'blue',
                padding: 10,
                borderRadius: 10,
                width: SCREEN_WIDTH * 0.8,
                alignItems: 'center',
              }}
              onPress={handleRegister}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>Register</Text>
            </TouchableOpacity>
          </View>

          {registerModalVisible && (
            <RegisterModal
              isVisible={registerModalVisible}
              onClose={() => {
                setRegisterModalVisible(false);
              }}
              onGoToLogin={() => {
                setRegisterModalVisible(false);
                navigation.navigate('Login');
              }}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
