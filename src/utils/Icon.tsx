import IcoMoon, {IconProps} from "react-icomoon";
import React, {ReactElement} from "react";
import {Path, Svg} from "react-native-svg";
import iconSet from "./selection.json";

function Icon(props: IconProps): ReactElement {
  return (
    <IcoMoon
      {...props}
      native
      SvgComponent={Svg}
      PathComponent={Path}
      iconSet={iconSet}
    />
  );
}

export default Icon;
