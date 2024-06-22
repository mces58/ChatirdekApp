import React, { useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import i18next from 'i18next';

import DotIcon from 'src/assets/icons/dot';
import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import OpenLinkButton from 'src/components/link/OpenLinkButton';
import {
  ScaleFontSize,
  ScaleHorizontal,
  ScaleVertical,
} from 'src/constants/screen/screenSize';
import { Theme, useTheme } from 'src/context/ThemeContext';

import { helpQuestions, Question } from '../../constants/questions';

interface HelpBottomSheetProps {
  isVisible: boolean;
  onSwipeDown: () => void;
}

const HelpBottomSheet: React.FC<HelpBottomSheetProps> = ({ isVisible, onSwipeDown }) => {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const { theme } = useTheme();
  const styles = useMemo(
    () => createStyles(theme, SCREEN_HEIGHT),
    [theme, SCREEN_HEIGHT]
  );
  const [questions] = useState<Question[]>(helpQuestions);
  const [searchText, setSearchText] = useState('');
  const handleSearchTextChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const renderQuestions = useCallback(
    (question: Question, index: number) => (
      <View key={index} style={styles.question}>
        <DotIcon width={ScaleHorizontal(20)} height={ScaleVertical(20)} />
        <OpenLinkButton
          url={question.answerUrl}
          text={i18next.t(`settings.helpBottomSheet.${question.question}`)}
        />
      </View>
    ),
    [styles.question]
  );

  const filteredQuestions = useMemo(
    () =>
      questions.filter((question) =>
        question.question.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText]
  );

  const content = (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.headerText}>
        {i18next.t('settings.helpBottomSheet.header')}
      </Text>

      <TextInput
        style={styles.textInput}
        placeholder={i18next.t('settings.helpBottomSheet.placeholder')}
        placeholderTextColor={theme.textMutedColor}
        value={searchText}
        onChangeText={handleSearchTextChange}
      />

      <View style={styles.questionContainer}>
        <Text style={styles.questionHeader}>
          {i18next.t('settings.helpBottomSheet.FAQ')}
        </Text>

        {filteredQuestions.length > 0 ? (
          filteredQuestions.map(renderQuestions)
        ) : (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>
              {i18next.t('settings.helpBottomSheet.noQuestionFound')}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  return (
    <BaseBottomSheet
      animationType="slide"
      isTransparent
      isVisible={isVisible}
      onSwipeDown={onSwipeDown}
      content={content}
      modalStyle={styles.bottomSheet}
    />
  );
};

export default HelpBottomSheet;

const createStyles = (theme: Theme, SCREEN_HEIGHT: number) =>
  StyleSheet.create({
    bottomSheet: {
      height: SCREEN_HEIGHT * ScaleVertical(0.4),
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: ScaleHorizontal(20),
      borderTopRightRadius: ScaleHorizontal(20),
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: ScaleHorizontal(18),
      paddingVertical: ScaleVertical(8),
    },
    container: {
      flex: 1,
    },
    scrollViewContent: {
      paddingHorizontal: ScaleHorizontal(8),
      paddingVertical: ScaleVertical(18),
      gap: 15,
    },
    headerText: {
      fontFamily: 'Poppins-Bold',
      fontSize: ScaleFontSize(18),
      color: theme.textColor,
      alignSelf: 'center',
    },
    textInput: {
      width: '100%',
      borderWidth: ScaleHorizontal(1),
      borderColor: theme.borderColor,
      borderRadius: ScaleHorizontal(10),
      paddingHorizontal: ScaleHorizontal(10),
      paddingVertical: ScaleVertical(8),
      color: theme.textColor,
    },
    questionContainer: {
      flex: 1,
      marginTop: ScaleVertical(10),
    },
    questionHeader: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: ScaleFontSize(15),
      color: theme.textColor,
    },
    question: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: ScaleVertical(8),
      paddingHorizontal: ScaleHorizontal(5),
      borderRadius: ScaleHorizontal(10),
      gap: 10,
    },
    questionText: {
      fontFamily: 'Nunito-Medium',
      fontSize: ScaleFontSize(12),
      color: theme.textColor,
    },
    notFoundContainer: {
      width: '100%',
      height: ScaleVertical(100),
      justifyContent: 'center',
      alignItems: 'center',
    },
    notFoundText: {
      alignSelf: 'center',
      fontFamily: 'Poppins-Light',
      fontSize: ScaleFontSize(18),
      color: theme.textColor,
    },
  });
