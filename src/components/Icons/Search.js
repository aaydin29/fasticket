import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgSearch = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    {...props}>
    <Path
      fill="#fff"
      d="M6.176 0a6.177 6.177 0 0 1 4.922 9.908l4.658 4.657a.843.843 0 0 1-1.097 1.272l-.094-.082-4.657-4.657a6.178 6.178 0 0 1-9.84-5.841A6.176 6.176 0 0 1 6.177 0Zm0 1.684a4.492 4.492 0 1 0 0 8.985 4.492 4.492 0 0 0 0-8.985Z"
    />
  </Svg>
);
export default SvgSearch;
