import React, {FC, ReactNode} from 'react';
import {View, ViewProps} from 'react-native'

type ContainerProps = ViewProps & {
    children: ReactNode;
};

export const Container: FC<ContainerProps> = ({children, ...rest}) => {

    return (
        
            <View className='w-full px-2' {...rest}>

                {children}

            </View>

    )
}