import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgUser = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 14 14"
    {...props}>
    <Path
      fill="#606060"
      d="M1.167 14S0 14 0 12.833c0-1.166 1.167-4.666 7-4.666s7 3.5 7 4.666C14 14 12.833 14 12.833 14H1.167ZM7 7a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
    />
  </Svg>
);
export default SvgUser;
