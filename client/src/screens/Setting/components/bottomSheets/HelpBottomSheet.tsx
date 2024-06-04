import React, { useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import DotIcon from 'src/assets/icons/dot';
import BaseBottomSheet from 'src/components/bottomSheet/BaseBottomSheet';
import OpenLinkButton from 'src/components/link/OpenLinkButton';
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
        <DotIcon width={20} height={20} />
        <OpenLinkButton url={question.answerUrl} text={question.question} />
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
      <Text style={styles.headerText}>How can we help you?</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Search Help Center"
        placeholderTextColor={theme.textMutedColor}
        value={searchText}
        onChangeText={handleSearchTextChange}
      />

      <View style={styles.questionContainer}>
        <Text style={styles.questionHeader}>Help FAQ</Text>

        {filteredQuestions.length > 0 ? (
          filteredQuestions.map(renderQuestions)
        ) : (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>No questions found!</Text>
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
      height: SCREEN_HEIGHT * 0.5,
      backgroundColor: theme.bottomSheetBackgroundColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    container: {
      flex: 1,
    },
    scrollViewContent: {
      paddingHorizontal: 10,
      paddingVertical: 20,
      gap: 15,
    },
    headerText: {
      fontFamily: 'Poppins-Bold',
      fontSize: 20,
      color: theme.textColor,
      alignSelf: 'center',
    },
    textInput: {
      width: '100%',
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 10,
      padding: 10,
      color: theme.textColor,
    },
    questionContainer: {
      flex: 1,
      marginTop: 10,
    },
    questionHeader: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 18,
      color: theme.textColor,
    },
    question: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 5,
      borderRadius: 10,
      gap: 10,
    },
    questionText: {
      fontFamily: 'Nunito-Medium',
      fontSize: 16,
      color: theme.textColor,
    },
    notFoundContainer: {
      width: '100%',
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notFoundText: {
      alignSelf: 'center',
      fontFamily: 'Poppins-Light',
      fontSize: 20,
      color: theme.textColor,
    },
  });
