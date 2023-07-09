import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgArrowCircle = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill="#000"
      d="M24 12c0 6.635-5.365 12-12 12S0 18.635 0 12 5.365 0 12 0s12 5.365 12 12ZM1.412 12c0 5.859 4.73 10.588 10.588 10.588 5.859 0 10.588-4.73 10.588-10.588 0-5.859-4.73-10.588-10.588-10.588A10.574 10.574 0 0 0 1.412 12Z"
    />
    <Path
      fill="#000"
      d="M10.8 17.859 16.659 12 10.8 6.141l.988-.988L18.635 12l-6.847 6.847-.988-.988Z"
    />
    <Path fill="#000" d="M17.647 11.294v1.412h-12v-1.412h12Z" />
  </Svg>
);
export default SvgArrowCircle;
