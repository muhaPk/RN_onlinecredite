import React from 'react';
import {View, Text, Pressable} from 'react-native'

type Props = {
    colorStyle?: 'dark' | 'light'
    title: string
    onPress: () => void
    className?: string
}



export const SubmitButton = ({title, onPress, colorStyle = 'dark', ...rest}: Props) => {

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
        <View className={viewStyleVariants[colorStyle]} {...rest}>

            <Pressable onPress={onPress}>

                <Text className={textStyleVariants[colorStyle]}>{title}</Text>

            </Pressable>

        </View>
    )
}