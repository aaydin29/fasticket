import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgFeedback = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    viewBox="0 0 20 20"
    {...props}>
    <Path
      fill="#121212"
      d="M18 0H2C.9 0 .01.9.01 2L0 20l4-4h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 14H3.17l-.59.59-.58.58V2h16v12Zm-9-4h2v2H9v-2Zm0-6h2v4H9V4Z"
    />
  </Svg>
);
export default SvgFeedback;
