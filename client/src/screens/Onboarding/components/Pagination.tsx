import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

import { OnboardingData } from '../data';
import Dot from './Dot';

interface PaginationProps {
  data: OnboardingData[];
  x: SharedValue<number>;
}
const Pagination: React.FC<PaginationProps> = ({ data, x }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
        return <Dot index={index} x={x} key={index} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
