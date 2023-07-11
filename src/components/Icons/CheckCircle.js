import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgCheckCircle = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 16 16"
    {...props}>
    <Path
      fill="#00A962"
      fillRule="evenodd"
      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-4.776-2.424a.6.6 0 0 1 0 .848l-4 4a.6.6 0 0 1-.848 0l-1.6-1.6a.6.6 0 1 1 .848-.848L6.8 9.152l1.788-1.789 1.788-1.787a.6.6 0 0 1 .848 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgCheckCircle;
