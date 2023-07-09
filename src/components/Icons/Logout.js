import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgLogout = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 22 22"
    {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M8.002 6c.012-2.175.109-3.353.877-4.121C9.758 1 11.172 1 14 1h1c2.829 0 4.243 0 5.122.879C21 2.757 21 4.172 21 7v8c0 2.828 0 4.243-.878 5.121C19.242 21 17.829 21 15 21h-1c-2.828 0-4.242 0-5.121-.879-.768-.768-.865-1.946-.877-4.121"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14 11H1m0 0 3.5-3M1 11l3.5 3"
    />
  </Svg>
);
export default SvgLogout;
