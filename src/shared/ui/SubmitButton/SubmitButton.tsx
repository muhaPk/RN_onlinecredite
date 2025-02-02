import React from 'react';
import {View, Text, Pressable} from 'react-native'
import { viewStyleVariants, textStyleVariants } from 'shared/styles/buttonStyles';

type Props = {
    colorStyle?: 'dark' | 'light'
    fullWidth?: boolean
    title: string
    onPress: () => void
    className?: string
    isDisabled?: boolean
}



export const SubmitButton = ({title, onPress, colorStyle = 'dark', fullWidth = false, isDisabled = false, ...rest}: Props) => {

    return (
        <Pressable onPress={onPress} disabled={isDisabled}>

            <View className={`${viewStyleVariants[colorStyle]} ${fullWidth && 'w-11/12'} ${isDisabled && 'opacity-75'}`} {...rest}>

                <Text className={textStyleVariants[colorStyle]}>{title}</Text>

            </View>
            
        </Pressable>
    )
}