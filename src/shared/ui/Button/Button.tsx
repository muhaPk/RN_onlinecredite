import React from 'react';
import {TouchableOpacity, Text, Pressable} from 'react-native'
import { viewStyleVariants, textStyleVariants } from 'shared/styles/buttonStyles';

type Props = {
    title: string
    colorStyle?: 'dark' | 'light'
    className?: string
    onPress?: () => void
}

export const Button = ({title, colorStyle = 'dark', onPress, ...rest}: Props) => {
    
    return (
    
        <TouchableOpacity className={viewStyleVariants[colorStyle]} onPress={onPress} {...rest}>

            <Text className={textStyleVariants[colorStyle]}>{title}</Text>

        </TouchableOpacity>

    )
}