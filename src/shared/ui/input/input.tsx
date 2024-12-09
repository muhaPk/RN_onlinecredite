import React, {FC} from 'react';
import {View, Text, TextInput} from 'react-native'
import {Controller} from "react-hook-form";
import { T2 } from 'shared/ui/CustomText/CustomText';


type FormData = {
    control: any
    errors: any
    name: string
    placeholder: string
    title?: string
    type?: string
    className?: string
    rules?: any
    isDisabled?: boolean
}

export const CustomInput: FC<FormData> = ({control, errors, placeholder, title, name, rules, type = 'input', isDisabled = false, ...rest}: FormData) => {

    return (

        <>
            <Controller
                name={name}
                control={control}
                rules={rules}

                render={({ field: { onChange, onBlur, value } }) => (

                        <View className='mx-auto w-full max-w-max my-2'>

                            {
                                title && 
                                <Text className="block text-xs mb-1 -mt-1">
                                    {title}
                                </Text>
                            }
                            

                            <TextInput
                                onChangeText={onChange}
                                value={value}
                                placeholder={placeholder}
                                
                                multiline={type === 'textarea'}
                                numberOfLines={type === 'textarea' ? 4 : 1}

                                onBlur={() => {
                                    onBlur();
                                } }

                                style={type === 'textarea' && { textAlignVertical: 'top' }}
                                // onFocus={}
                                placeholderTextColor='#aaa'
                                underlineColorAndroid='transparent'
                                className='px-3 py-1 border border-sky-500 bg-[#f1f5f9] rounded'
                                editable={!isDisabled}
                                {...rest}
                            />

                        </View>

                    )}
            />
            {errors[name] && <T2 className='text-red-400'>{errors[name].message}</T2>}
        </>
    )
}