import React from 'react';
import { FlatList, StyleSheet, View, ViewToken } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { ScaleHorizontal, ScaleVertical } from 'src/constants/screen/screenSize';
import { OnboardingProps } from 'src/navigations/RootStackParamList';

import CustomButton from './components/Button';
import Pagination from './components/Pagination';
import RenderItem from './components/RenderItem';

import data, { OnboardingData } from './data';

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue<number>(0);
  const flatListIndex = useSharedValue<number>(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }): void => {
    if (viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: OnboardingData;
    index: number;
  }): JSX.Element => {
    return <RenderItem item={item} index={index} x={x} />;
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: ScaleHorizontal(25),
    paddingVertical: ScaleVertical(25),
    position: 'absolute',
    bottom: ScaleVertical(18),
    left: 0,
    right: 0,
  },
});
