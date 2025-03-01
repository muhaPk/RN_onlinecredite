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
    icon?: React.ReactNode
}



export const SubmitButton = ({title, onPress, colorStyle = 'light', fullWidth = false, icon, isDisabled = false, ...rest}: Props) => {

    return (
        <Pressable onPress={onPress} disabled={isDisabled}>

            <View className={`${viewStyleVariants[colorStyle]} ${fullWidth && 'w-11/12'} ${isDisabled && 'opacity-75'} flex-row`} {...rest}>

                {icon && <View className='mr-2'>{icon}</View>}
                <Text className={textStyleVariants[colorStyle]}>{title}</Text>

            </View>
            
        </Pressable>
    )
}