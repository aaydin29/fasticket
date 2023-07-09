import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgArrowFull = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 15 17"
    {...props}>
    <Path
      fill="#000"
      d="m2.599 16.279 11.194-6.463c1.43-.824 1.43-2.175 0-3L2.598.353C1.168-.473 0 .203 0 1.853v12.925c0 1.65 1.17 2.327 2.598 1.5h.001Z"
    />
  </Svg>
);
export default SvgArrowFull;
