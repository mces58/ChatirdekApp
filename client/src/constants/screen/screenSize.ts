import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension]: [number, number] =
  width < height ? [width, height] : [height, width];

const baseScreenWidth: number = 350;
const baseScreenHeight: number = 680;

const ScaleHorizontal = (size: number): number => {
  return (shortDimension / baseScreenWidth) * size;
};

const ScaleVertical = (size: number): number => {
  return (longDimension / baseScreenHeight) * size;
};

const ScaleModerate = (
  size: number,
  factor: number = 0.5,
  isVertical: boolean = false
): number => {
  const scaleFn: (size: number) => number = isVertical ? ScaleVertical : ScaleHorizontal;
  return size + (scaleFn(size) - size) * factor;
};

const ScaleFontSize = (size: number): number => {
  const scale: number = Math.min(
    shortDimension / baseScreenWidth,
    longDimension / baseScreenHeight
  );
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

export { ScaleHorizontal, ScaleVertical, ScaleModerate, ScaleFontSize };
