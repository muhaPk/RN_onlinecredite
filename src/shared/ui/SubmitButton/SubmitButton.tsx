import React from 'react';
import {View, Text, Pressable} from 'react-native'

type Props = {
    colorStyle?: 'dark' | 'light'
    fullWidth?: boolean
    title: string
    onPress: () => void
    className?: string
}



export const SubmitButton = ({title, onPress, colorStyle = 'dark', fullWidth = false, ...rest}: Props) => {

    const baseViewStyle = 'rounded-lg py-2.5 px-6 items-center self-start mx-auto';
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
        <Pressable onPress={onPress}>
            <View className={`${viewStyleVariants[colorStyle]} ${fullWidth && 'w-11/12'}`} {...rest}>
                <Text className={textStyleVariants[colorStyle]}>{title}</Text>
            </View>
        </Pressable>
    )
}