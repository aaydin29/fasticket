import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgMail = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    viewBox="0 0 16 13"
    {...props}>
    <Path
      fill="#606060"
      d="M16 3.373V10.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 10.5V3.373l7.746 4.558a.5.5 0 0 0 .508 0L16 3.373ZM13.5 0a2.5 2.5 0 0 1 2.485 2.223L8 6.92.015 2.223A2.5 2.5 0 0 1 2.5 0h11Z"
    />
  </Svg>
);
export default SvgMail;
