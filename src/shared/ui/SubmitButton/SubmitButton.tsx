import React from 'react';
import {View, Text, Pressable} from 'react-native'
import { viewStyleVariants, textStyleVariants } from 'shared/styles/buttonStyles';

type Props = {
    colorStyle?: 'dark' | 'light'
    fullWidth?: boolean
    title: string
    onPress: () => void
    className?: string
}



export const SubmitButton = ({title, onPress, colorStyle = 'dark', fullWidth = false, ...rest}: Props) => {

    return (
        <Pressable onPress={onPress}>

            <View className={`${viewStyleVariants[colorStyle]} ${fullWidth && 'w-11/12'}`} {...rest}>

                <Text className={textStyleVariants[colorStyle]}>{title}</Text>

            </View>
            
        </Pressable>
    )
}