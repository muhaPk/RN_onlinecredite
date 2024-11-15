import React, {FC, useRef} from 'react';
import { Text, View, ScrollView, Image } from 'react-native'
import Svg, { Polyline } from 'react-native-svg';

type Props = {
    className: string;
    points: string;
    strokeWidth: string;
    color: string;
}

export const Poliline: FC<Props> = ({points, strokeWidth, color, ...rest}) => {


    return (
        <View {...rest}>

            <Svg height="300" width="100">

                <Polyline
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    />

            </Svg>

        </View>
    )

}