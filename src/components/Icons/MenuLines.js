import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgMenuLines = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 26 18"
    {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M1 1h24M1 9h24M1 17h24"
    />
  </Svg>
);
export default SvgMenuLines;
