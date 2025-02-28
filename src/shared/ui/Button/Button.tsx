import React from 'react';
import {TouchableOpacity, Text, Pressable} from 'react-native'
import { viewStyleVariants, textStyleVariants } from 'shared/styles/buttonStyles';

type Props = {
    title: string
    colorStyle?: 'dark' | 'light'
    className?: string
    onPress?: () => void
    isDisabled?: boolean
}

export const Button = ({title, colorStyle = 'dark', onPress, isDisabled = false, ...rest}: Props) => {
    
    return (
    
        <TouchableOpacity className={`${viewStyleVariants[colorStyle]} ${isDisabled && 'opacity-75'}`} onPress={onPress} disabled={isDisabled} {...rest}>

            <Text className={textStyleVariants[colorStyle]}>{title}</Text>

        </TouchableOpacity>

    )
}