import React, { useMemo } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { Formik } from 'formik';
import i18next from 'i18next';

import CameraIcon from 'src/assets/icons/camera';
import GalleryIcon from 'src/assets/icons/gallery';
import SendIcon from 'src/assets/icons/send';
import { Response } from 'src/constants/types/response';
import { useAuthContext } from 'src/context/AuthContext';
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

  const handleFormSubmit = async (value: { message: string }, resetForm: () => void) => {
    try {
      if (authUser) {
        const response: Response = await chatService.sendMessage(
          authUser.toString(),
          receiverId,
          value.message
        );

        if (response.success) {
          resetForm();
        }
      }
    } catch (error) {
      Alert.alert(i18next.t('alert.error'), i18next.t('alert.sendOnlyFriendMessage'), [
        { text: i18next.t('global.ok') },
      ]);
    }
  };

  const handleFormGroupSubmit = async (
    value: { message: string },
    resetForm: () => void
  ) => {
    try {
      if (authUser) {
        const response: Response = await groupMessageService.sendGroupMessage(
          authUser.toString(),
          receiverId,
          value.message
        );

        if (response.success) {
          resetForm();
        }
      }
    } catch (error) {
      Alert.alert(i18next.t('alert.error'), i18next.t('alert.sendOnlyGroupMessage'), [
        { text: i18next.t('global.ok') },
      ]);
    }
  };

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
        const response: Response = await chatService.sendImageMessage(
          authUser.toString(),
          receiverId,
          imageUri
        );

        if (response.success) {
          console.log('Image sent');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={sendMessageValidation}
      onSubmit={(values, { resetForm }) => {
        if (isGroup) {
          handleFormGroupSubmit(values, resetForm);
        } else {
          handleFormSubmit(values, resetForm);
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={values.message}
              onChangeText={(text) => {
                handleChange('message')(text);
              }}
              onBlur={handleBlur('message')}
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
  });
