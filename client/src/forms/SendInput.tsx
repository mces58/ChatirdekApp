import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Audio } from 'expo-av';
import { Formik } from 'formik';
import i18next from 'i18next';
import { jwtDecode } from 'jwt-decode';

import CameraIcon from 'src/assets/icons/camera';
import GalleryIcon from 'src/assets/icons/gallery';
import SendIcon from 'src/assets/icons/send';
import Button from 'src/components/button/Button';
import Recording from 'src/components/recoring/Recording';
import { Colors } from 'src/constants/color/colors';
import { Response } from 'src/constants/types/response';
import { useAuthContext } from 'src/context/AuthContext';
import { useSocket } from 'src/context/SocketContext';
import { Theme, useTheme } from 'src/context/ThemeContext';
import chatService from 'src/services/chat-service';
import groupMessageService from 'src/services/group-message-service';
import openCamera from 'src/utils/open-camera';
import openGallery from 'src/utils/open-galllery';
import { sendMessageValidation } from 'src/validations/sendMessage';

interface SendInputProps {
  receiverId: string;
  isGroup?: boolean;
}

const SendInput: React.FC<SendInputProps> = ({ receiverId, isGroup = false }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const initialValue = {
    message: '',
  };
  const { authUser } = useAuthContext();
  const [meId, setMeId] = React.useState<string>('');
  const {
    sendMessage,
    sendGroupMessage,
    isTyping,
    startTyping,
    stopTyping,
    getMessages,
  } = useSocket();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [base64DataUri, setBase64DataUri] = useState<string | null>(null);

  useEffect(() => {
    if (authUser) {
      const decode: { _id: string } = jwtDecode(authUser.toString());
      setMeId(decode._id);
    }
  }, [authUser]);

  useEffect(() => {
    return () => {
      stopTyping(meId, receiverId);
    };
  }, []);

  const camera = async () => {
    const uri = await openCamera();
    if (uri) {
      await sendToServer(uri);
    }
  };

  const gallery = async () => {
    const uri = await openGallery();
    if (uri) {
      await sendToServer(uri);
    }
  };

  const sendToServer = async (imageUri: string) => {
    try {
      if (authUser) {
        if (isGroup) {
          const response: Response = await groupMessageService.sendImageMessage(
            authUser.toString(),
            receiverId,
            imageUri
          );

          if (response.success) {
            console.log('Image sent');
            fetchMessagesWithDelay();
          }
        } else {
          const response: Response = await chatService.sendImageMessage(
            authUser.toString(),
            receiverId,
            imageUri
          );

          if (response.success) {
            console.log('Image sent');
            fetchMessagesWithDelay();
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (text: string) => {
    if (text.trim() === '') {
      stopTyping(meId, receiverId);
    } else {
      if (!isTyping) {
        startTyping(meId, receiverId);
      }
    }
  };

  const handleRecordingFinish = (uri: string | null) => {
    setRecordingUri(uri);
  };

  const sendRecordingToServer = async () => {
    try {
      if (authUser) {
        if (isGroup) {
          if (base64DataUri) {
            const response: Response = await groupMessageService.sendAudioMessage(
              authUser.toString(),
              receiverId,
              base64DataUri
            );

            if (response.success) {
              console.log('Audio sent');
              fetchMessagesWithDelay();
            }
          }
        } else {
          if (base64DataUri) {
            const response: Response = await chatService.sendAudioMessage(
              authUser.toString(),
              receiverId,
              base64DataUri
            );

            if (response.success) {
              console.log('Audio sent');
              fetchMessagesWithDelay();
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const playRecording = async () => {
    try {
      if (recordingUri) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: recordingUri },
          { shouldPlay: true }
        );
        console.log('Playing recording');
        await newSound.playAsync();
      }
    } catch (error) {
      console.error('Failed to play recording', error);
    }
  };

  const fetchMessagesWithDelay = async () => {
    setTimeout(() => {
      getMessages(meId, receiverId);
    }, 500);
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={sendMessageValidation}
      onSubmit={(values, { resetForm }) => {
        if (isGroup) {
          sendGroupMessage(meId, receiverId, values.message);
        } else {
          sendMessage(meId, receiverId, values.message);
        }
        stopTyping(meId, receiverId);
        resetForm();
        fetchMessagesWithDelay();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, isValid, resetForm }) => (
        <View style={styles.container}>
          {recordingUri ? (
            <View style={styles.recordingContainer}>
              <Button
                title={i18next.t('global.play')}
                onPress={playRecording}
                customStyle={[styles.button, styles.buttonPlay]}
              />
              <Button
                title={i18next.t('global.delete')}
                onPress={() => setRecordingUri(null)}
                customStyle={[styles.button, styles.buttonDelete]}
              />
              <Button
                title={i18next.t('global.send')}
                onPress={() => {
                  setRecordingUri(null);
                  sendRecordingToServer();
                }}
                customStyle={[styles.button, styles.buttonSend]}
              />
            </View>
          ) : isRecording ? (
            <View style={styles.inputContainer}>
              <Text>{i18next.t('global.recording')}</Text>
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={values.message}
                onChangeText={(text) => {
                  handleChange('message')(text);
                  handleInputChange(text);
                }}
                onBlur={() => {
                  stopTyping(meId, receiverId);
                  resetForm();
                  handleBlur('message');
                }}
                onEndEditing={() => {
                  resetForm();
                  stopTyping(meId, receiverId);
                }}
                placeholder={i18next.t('global.writeMessage')}
                multiline={true}
                numberOfLines={1}
                maxLength={1000}
                placeholderTextColor={theme.textMutedColor}
              />
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={gallery}>
                  <GalleryIcon width={25} height={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={camera}>
                  <CameraIcon width={25} height={25} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {values.message.length === 0 && !recordingUri && (
            <Recording
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              onRecordingFinish={handleRecordingFinish}
              setBase64DataUri={setBase64DataUri}
            />
          )}
          {values.message.length > 0 && (
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.icon}
              disabled={!isValid || values.message.trim() === ''}
            >
              <SendIcon
                width={30}
                height={30}
                customColor={
                  !isValid || values.message.trim() === ''
                    ? theme.textMutedColor
                    : theme.textColor
                }
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </Formik>
  );
};

export default SendInput;

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.backgroundColor,
      gap: 10,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderRadius: 5,
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 5,
    },
    input: {
      flex: 1,
      paddingLeft: 15,
      paddingVertical: 10,
      color: theme.textColor,
    },
    icon: {
      paddingHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    recordingContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      gap: 10,
    },
    button: {
      width: 80,
      height: 40,
    },
    buttonPlay: {
      backgroundColor: Colors.primaryColors.primary,
    },
    buttonDelete: {
      backgroundColor: Colors.primaryColors.linearGradient2,
    },
    buttonSend: {
      backgroundColor: Colors.primaryColors.success,
    },
  });
