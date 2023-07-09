import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgKey = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 14 14"
    {...props}>
    <Path
      fill="#606060"
      d="M9.237 9.21a4.879 4.879 0 0 1-1.818-.346 4.752 4.752 0 0 1-1.541-.994 4.545 4.545 0 0 1-1.38-2.803 4.488 4.488 0 0 1 .774-3.013A4.752 4.752 0 0 1 7.848.2a4.915 4.915 0 0 1 3.207.148 4.71 4.71 0 0 1 2.38 2.083c.521.94.688 2.025.474 3.07a4.58 4.58 0 0 1-1.65 2.664A4.864 4.864 0 0 1 9.238 9.21Zm0-7.98a3.594 3.594 0 0 0-1.944.574 3.42 3.42 0 0 0-1.289 1.52 3.288 3.288 0 0 0-.2 1.957c.135.657.468 1.26.957 1.735.408.396.91.688 1.462.85a3.623 3.623 0 0 0 1.705.083 3.561 3.561 0 0 0 1.543-.705c.446-.354.796-.81 1.016-1.326a3.29 3.29 0 0 0-.327-3.185 3.47 3.47 0 0 0-1.266-1.106 3.604 3.604 0 0 0-1.657-.398Z"
    />
    <Path
      fill="#606060"
      d="M.57 13.6a.618.618 0 0 1-.412-.199.588.588 0 0 1 0-.798L5.49 7.44a.633.633 0 0 1 1.013.2.584.584 0 0 1-.138.654L.983 13.401a.618.618 0 0 1-.413.2Z"
    />
    <Path
      fill="#606060"
      d="M3.46 14a.63.63 0 0 1-.438-.176L1.37 12.228a.587.587 0 0 1 .015-.831.63.63 0 0 1 .86-.015l1.65 1.596a.589.589 0 0 1 .182.423c0 .159-.065.311-.181.423a.612.612 0 0 1-.438.176Zm1.65-1.596a.628.628 0 0 1-.437-.176l-1.651-1.596a.6.6 0 0 1-.197-.428.582.582 0 0 1 .181-.434.621.621 0 0 1 .449-.175.637.637 0 0 1 .442.19l1.65 1.597a.589.589 0 0 1-.2.976.628.628 0 0 1-.237.046Z"
    />
  </Svg>
);
export default SvgKey;
