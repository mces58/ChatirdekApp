import { TextStyle } from 'react-native';

import {
  NunitoBold,
  NunitoLight,
  NunitoMedium,
  NunitoRegular,
  NunitoSemiBold,
} from 'src/assets/fonts/nunito';
import {
  PopinsSemiBold,
  PoppinsBold,
  PoppinsLight,
  PoppinsMedium,
  PoppinsRegular,
} from 'src/assets/fonts/poppins';

interface FontType {
  bold: TextStyle;
  light: TextStyle;
  medium: TextStyle;
  regular: TextStyle;
  semiBold: TextStyle;
}

const NunitoFonts: FontType = {
  bold: NunitoBold,
  light: NunitoLight,
  medium: NunitoMedium,
  regular: NunitoRegular,
  semiBold: NunitoSemiBold,
};

const PoppinsFonts: FontType = {
  bold: PoppinsBold,
  light: PoppinsLight,
  medium: PoppinsMedium,
  regular: PoppinsRegular,
  semiBold: PopinsSemiBold,
};

export { NunitoFonts, PoppinsFonts };
