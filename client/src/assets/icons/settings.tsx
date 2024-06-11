import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors } from 'src/constants/color/colors';
import { useTheme } from 'src/context/ThemeContext';

import { IconProps } from './icon-props';

const TranslateIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 1, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 64 64"
        fill={customColor ?? color}
        opacity={opacity}
      >
        <Path
          d="m63.1232 56.757725 -15.6803 -31.360575c-0.77135 -1.54225 -2.922975 -1.67115 -3.872925 -0.232025 -0.04925 0.0746 -0.093975 0.152075 -0.13395 0.232025l-6.078925 12.160625c-4.764875 -0.26795 -9.3494 -1.913825 -13.19665 -4.7377 4.513925 -4.8204 7.248925 -11.0361 7.75335 -17.620725h6.806925c1.724375 -0.000075 2.80215 -1.866825 1.939875 -3.36015 -0.400125 -0.693 -1.13965 -1.1199 -1.939875 -1.11995H23.040425V6.239175c0 -1.7244 -1.8667 -2.802125 -3.36005 -1.939925 -0.693075 0.400125 -1.120025 1.139625 -1.120025 1.939925V10.71925H2.88005c-1.7244 0.000075 -2.80215 1.866825 -1.9399 3.36015 0.40015 0.693 1.139675 1.1199 1.9399 1.11995h24.53685c-0.4989 5.489925 -2.829275 10.65265 -6.616525 14.658275 -2.36 -2.490175 -4.17225 -5.44705 -5.3201 -8.680175 -0.547125 -1.635275 -2.659325 -2.06505 -3.80195 -0.773575 -0.548875 0.62035 -0.7106 1.49295 -0.420525 2.2688 1.336375 3.7797 3.441475 7.241475 6.182525 10.167 -4.22035 3.1013 -9.322975 4.769475 -14.560275 4.7601 -1.7244 0 -2.802125 1.8667 -1.93995 3.36005 0.40015 0.693075 1.13965 1.120025 1.93995 1.120025 6.497775 0.00725 12.809275 -2.17025 17.920325 -6.1825 4.1709 3.258875 9.1499 5.321525 14.403475 5.9669l-7.448125 14.893475c-0.771675 1.54225 0.415575 3.3415 2.137025 3.238675 0.798925 -0.04775 1.5117 -0.518075 1.86985 -1.233825l3.861275 -7.72255h19.63115l3.861275 7.72255c0.37985 0.75905 1.156075 1.238225 2.00485 1.237625 1.665 -0.0009 2.747125 -1.753475 2.00205 -3.242475Zm-25.2593 -10.197775 7.57695 -15.1511 7.57415 15.1511Z"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

const PaletteIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 4, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" opacity={opacity}>
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M38.857142857142854 22.857142857142854c2.524708571428571 0 4.571428571428571 -2.04672 4.571428571428571 -4.571428571428571s-2.04672 -4.571428571428571 -4.571428571428571 -4.571428571428571 -4.571428571428571 2.04672 -4.571428571428571 4.571428571428571 2.04672 4.571428571428571 4.571428571428571 4.571428571428571Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.57142857142857 45.71428571428571c1.2623542857142855 0 2.2857142857142856 -1.02336 2.2857142857142856 -2.2857142857142856S21.833782857142854 41.14285714285714 20.57142857142857 41.14285714285714s-2.2857142857142856 1.02336 -2.2857142857142856 2.2857142857142856 1.02336 2.2857142857142856 2.2857142857142856 2.2857142857142856Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.57142857142857 29.71428571428571c2.524708571428571 0 4.571428571428571 -2.04672 4.571428571428571 -4.571428571428571s-2.04672 -4.571428571428571 -4.571428571428571 -4.571428571428571 -4.571428571428571 2.04672 -4.571428571428571 4.571428571428571 2.04672 4.571428571428571 4.571428571428571 4.571428571428571Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M43.520091428571426 56.13714285714285c-0.05097142857142857 -0.8868571428571428 -0.35913142857142855 -1.7394285714285713 -0.8868114285714285 -2.453942857142857 -0.52768 -0.7140571428571428 -1.2520685714285715 -1.2594285714285716 -2.0846171428571427 -1.5689142857142857 -2.0676571428571426 -0.6797714285714286 -3.8250514285714283 -2.0745142857142853 -4.956251428571428 -3.9337142857142857 -1.1311542857142856 -1.8596571428571427 -1.5619657142857142 -4.06144 -1.2148571428571426 -6.210057142857142 0.3470628571428571 -2.148571428571428 1.4492342857142857 -4.102902857142857 3.108342857142857 -5.5115428571428575 1.6591085714285712 -1.4086400000000001 3.766308571428571 -2.1792457142857145 5.942765714285714 -2.1732571428571426H51.97714285714285c1.4660571428571427 0.0041142857142857136 2.912 -0.3445028571428571 4.215314285714285 -1.0163657142857143 1.3028571428571427 -0.6718628571428571 2.4255999999999998 -1.6473142857142857 3.272685714285714 -2.844022857142857 0.8470857142857142 -1.1967542857142857 1.3938285714285714 -2.5796571428571426 1.5945142857142856 -4.032045714285714 0.20068571428571427 -1.4524342857142856 0.04891428571428571 -2.931794285714285 -0.4425142857142857 -4.31328 -1.8180571428571428 -5.133851428571428 -5.0125714285714285 -9.669257142857141 -9.23382857142857 -13.11062857142857C47.162057142857144 5.527954285714286 42.07620571428571 3.312932571428571 36.68132571428571 2.566281142857143 31.286399999999997 1.8196297142857143 25.79008 2.5700799999999995 20.792777142857144 4.735634285714285c-4.997302857142857 2.1655771428571424 -9.30326857142857 5.662902857142857 -12.447497142857141 10.109988571428572 -3.144228571428571 4.44704 -5.005741714285714 9.672731428571428 -5.381174857142857 15.106102857142858 -0.37542857142857144 5.433371428571428 0.7496731428571428 10.865417142857142 3.2523977142857143 15.702674285714284 2.5026742857142854 4.837028571428571 6.28672 8.893714285714285 10.938697142857142 11.725714285714284 4.6519314285714275 2.832457142857143 9.992822857142857 4.331885714285714 15.439177142857142 4.334171428571429 2.689645714285714 0.007314285714285714 5.3670857142857145 -0.3616 7.954285714285714 -1.097142857142857 0.9502171428571428 -0.2660571428571428 1.7731199999999998 -0.8653714285714285 2.3185828571428573 -1.6877714285714283 0.5454628571428571 -0.8224 0.7771428571428571 -1.8130285714285714 0.6528457142857143 -2.7922285714285713v0Z"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

const ChatSettingIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 3, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" opacity={opacity}>
        <Path
          stroke={customColor ?? color}
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth={strokeWidth}
          d="M19.3068 11.2684C11.6944 13.8058 6.4244 20.2472 6.4244 27.8594C6.4244 31.568 7.7906 35.0814 9.9378 38.0092L2.5206 45.4264H25.9432C37.6546 45.4264 47.0236 36.0574 45.2668 25.322"
        />
        <Path
          fill={customColor ?? color}
          d="M44.291 12.2444C44.291 11.6588 44.291 11.0732 44.0958 10.2924L46.6332 7.5598L44.6814 4.4368L41.1678 5.608C40.3872 5.0224 39.6064 4.4368 38.6306 4.2416L37.6546 0.533H33.946L32.97 4.2416C31.994 4.632 31.2134 5.0224 30.4326 5.608L26.919 4.4368L24.9672 7.5598L27.5048 10.2924C27.3094 10.878 27.3094 11.4636 27.3094 12.2444S27.3094 13.4154 27.5048 14.1962L24.9672 16.9288L26.919 20.0518L30.4326 18.8808C31.2134 19.4664 31.994 20.0518 32.97 20.2472L33.946 23.9558H37.6546L38.6306 20.2472C39.6064 19.8568 40.3872 19.4664 41.1678 18.8808L44.6814 20.0518L46.6332 16.9288L44.0958 14.1962C44.0958 13.4154 44.291 12.8298 44.291 12.2444ZM35.7026 16.5386C33.3604 16.5386 31.4084 14.5866 31.4084 12.2444S33.3604 7.9502 35.7026 7.9502C38.0448 7.9502 39.9968 9.902 39.9968 12.2444S38.0448 16.5384 35.7026 16.5384Z"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

const ViewOffIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 1.5, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5035 8.29321C20.9851 9.35723 22.3277 10.6025 23.5 12c0 0 -5.1655 6.4943 -11.51 6.4943 -1.0183 -0.0177 -2.02837 -0.186 -2.99739 -0.4995"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.83449 17.1555C4.41203 15.859 2.26149 14.1087 0.5 12c0 0 5.14553 -6.49432 11.49 -6.49432 1.7997 0.03591 3.5657 0.49453 5.1555 1.33883"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.9865 12c0 1.0599 -0.421 2.0765 -1.1705 2.826 -0.7495 0.7495 -1.7661 1.1705 -2.826 1.1705"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.7315 2.25848 2.24847 21.7415"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.16248 14.8276c-0.74991 -0.7499 -1.17121 -1.767 -1.17121 -2.8276 0 -1.0605 0.4213 -2.0776 1.17121 -2.82751 0.74991 -0.74991 1.76702 -1.17121 2.82752 -1.17121 1.0606 0 2.0776 0.4213 2.8276 1.17121"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

const InfoIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 1, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" opacity={opacity}>
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 13.5c3.5899 0 6.5 -2.9101 6.5 -6.5C13.5 3.41015 10.5899 0.5 7 0.5 3.41015 0.5 0.5 3.41015 0.5 7c0 3.5899 2.91015 6.5 6.5 6.5Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.5 10h3"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 10V6.5H6"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 4.25c-0.13807 0 -0.25 -0.11193 -0.25 -0.25s0.11193 -0.25 0.25 -0.25"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 4.25c0.13807 0 0.25 -0.11193 0.25 -0.25s-0.11193 -0.25 -0.25 -0.25"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

const LocationCompanyIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 3, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" opacity={opacity}>
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M31.3766 31.5312C32.2372 31.4384 32.9064 30.7401 32.9625 29.8764C33.0921 28.2576 33.2619 25.2351 33.2619 20.5475C33.2619 17.0177 33.1652 14.4305 33.0623 12.6769C32.9594 10.9305 31.6668 9.5629 29.9225 9.4281C28.5126 9.32 26.5594 9.2274 24 9.2274S19.4874 9.32 18.0775 9.4281C16.3332 9.5618 15.0396 10.9306 14.9377 12.6769C14.8348 14.4305 14.7381 17.0167 14.7381 20.5475C14.7381 25.2341 14.9079 28.2576 15.0365 29.8764C15.0926 30.7405 15.7624 31.4389 16.6234 31.5312C17.3952 31.6176 18.4902 31.7123 19.9392 31.7802C20.4728 31.8013 20.916 31.3726 20.9127 30.8386C20.9127 29.4513 20.9446 28.5519 20.9786 27.988C21.0115 27.4394 21.3367 26.9856 21.8759 26.8827C22.3308 26.7973 23.0121 26.7222 24 26.7222S25.6692 26.7973 26.1241 26.8827C26.6633 26.9856 26.9885 27.4384 27.0215 27.988C27.0554 28.5519 27.0873 29.4513 27.0873 30.8386C27.084 31.3726 27.5272 31.8013 28.0608 31.7802C29.1685 31.7325 30.2743 31.6494 31.3766 31.5312Z"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.9127 14.8875V15.9166"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M27.0873 14.8875V15.9166"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.9127 20.5475V21.5766"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M27.0873 20.5475V21.5766"
          strokeWidth={strokeWidth}
        />
        <Path
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M42.5239 20.5475C42.5239 33.8425 28.7853 43.3196 24.9715 45.6947C24.3783 46.0702 23.6217 46.0702 23.0285 45.6947C19.2157 43.3195 5.4761 33.8425 5.4761 20.5475C5.4761 10.3172 13.7697 2.0237 24 2.0237S42.5239 10.3172 42.5239 20.5475Z"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

const LogoutIcon: React.FC<IconProps> = (props) => {
  const { width, height, customColor, strokeWidth = 1.5, opacity = 1 } = props;
  const { theme } = useTheme();

  const color =
    theme.backgroundColor === Colors.primaryColors.light
      ? Colors.primaryColors.dark
      : Colors.primaryColors.light;

  return (
    <View style={[{ width, height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" opacity={opacity}>
        <Path
          d="m7.5 12.004 15.75 0"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="m19.5 15.754 3.75 -3.75 -3.75 -3.75"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <Path
          d="M15.75 16.5V21a1.437 1.437 0 0 1 -1.364 1.5H2.113A1.437 1.437 0 0 1 0.75 21V3a1.436 1.436 0 0 1 1.363 -1.5h12.273A1.437 1.437 0 0 1 15.75 3v4.5"
          fill="none"
          stroke={customColor ?? color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export {
  TranslateIcon,
  PaletteIcon,
  ChatSettingIcon,
  ViewOffIcon,
  InfoIcon,
  LocationCompanyIcon,
  LogoutIcon,
};
