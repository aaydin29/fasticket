import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgIdCard = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    viewBox="0 0 18 14"
    {...props}>
    <Path
      stroke="#606060"
      strokeWidth={1.5}
      d="M6.6 6.25c.884 0 1.6-.672 1.6-1.5s-.716-1.5-1.6-1.5c-.884 0-1.6.672-1.6 1.5s.716 1.5 1.6 1.5ZM9.8 9.25c0 .829 0 1.5-3.2 1.5s-3.2-.671-3.2-1.5 1.432-1.5 3.2-1.5c1.768 0 3.2.671 3.2 1.5Z"
    />
    <Path
      stroke="#606060"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M17 7c0 2.828 0 4.243-.938 5.121C15.126 13 13.617 13 10.6 13H7.4c-3.017 0-4.526 0-5.462-.879C1 11.243 1 9.828 1 7c0-2.828 0-4.243.938-5.121C2.874 1 4.383 1 7.4 1h3.2c3.017 0 4.526 0 5.462.879.376.353.601.79.736 1.371M14.6 7h-3.2m3.2-2.25h-4m4 4.5h-2.4"
    />
  </Svg>
);
export default SvgIdCard;
