import React from 'react';
import {TouchableOpacity, Text, Pressable} from 'react-native'

type Props = {
    title: string
    styleColor?: 'dark' | 'light'
    className?: string
    onPress?: () => void
}

export const Button = ({title, styleColor = 'dark', onPress, ...rest}: Props) => {

    const baseViewStyle = 'w-min rounded px-6 py-2.5 items-center self-start mx-auto';
    const baseTextStyle = 'font-bold';


    const viewStyleVariants = {
        light: `${baseViewStyle} bg-white`,
        dark: `${baseViewStyle} bg-[#29aae2]`
    };
    const textStyleVariants = {
        light: `${baseTextStyle} text-[#29aae2]`,
        dark: `${baseTextStyle} text-white`
    };

    return (
    
        <TouchableOpacity className={viewStyleVariants[styleColor]} onPress={onPress} {...rest}>

            <Text className={textStyleVariants[styleColor]}>{title}</Text>

        </TouchableOpacity>

    )
}