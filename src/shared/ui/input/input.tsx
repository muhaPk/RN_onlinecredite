import React, {FC} from 'react';
import {View, Text, TextInput} from 'react-native'
import {Controller} from "react-hook-form";
import { T2 } from 'shared/ui/CustomText/CustomText';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

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
    icon?: boolean
    iconName?: string
    iconSize?: number
}

const iconComponents = {
    MaterialCommunity,
    Entypo,
    FontAwesome,
    FontAwesome5,
};

const getComponentName = (name: string) => {
    const obj = {
        MaterialCommunity: ['email'],
        Entypo: ['login'],
        FontAwesome: ['vcard', 'user'],
        FontAwesome5: ['phone-alt'],
    };
    
    for (const [key, values] of Object.entries(obj)) {
        if (values.includes(name)) {
            return key;
        }
    }
    
    return null; // Return null if no match is found
};

const IconWrapper = ({ name, size, isActive }) => {
    const componentName = getComponentName(name);
    const IconComponent = iconComponents[componentName];

    if (!IconComponent) {
        return null; // Return null if no matching component is found
    }

    return (
        <View className='flex-row justify-center items-center w-6 mr-2'>
            <IconComponent name={name} size={size} color={isActive ? '#29aae2' : '#bbb'} />
        </View>
    );
};

export const CustomInput: FC<FormData> = ({control, errors, placeholder, title, name, rules, type = 'input', isDisabled = false, icon, iconName, iconSize, ...rest}: FormData) => {
    
    return (

        <>
            <Controller
                name={name}
                control={control}
                rules={rules}

                render={({ field: { onChange, onBlur, value } }) => (

                        <View className='mx-auto w-full max-w-max my-2 px-2'>

                            {
                                title && 
                                <Text className="block text-xs text-sky-500 mb-1 -mt-1">
                                    {title}
                                </Text>
                            }
                            <View className={`flex-row justify-between border-0 border-b border-[#d5d5d5] active:border-sky-500 hover:border-sky-500 focus:border-sky-500
                                ${isDisabled && 'opacity-50'}`}>

                                {icon && iconName && (
                                    <IconWrapper name={iconName} size={iconSize || 22} isActive={true} />
                                )}

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
                                    placeholderTextColor='#bbb'
                                    underlineColorAndroid='transparent'
                                    className='flex-1 py-1 text-[#333]'
                                    editable={!isDisabled}
                                    {...rest}
                                />
                            </View>


                        </View>

                    )}
            />
            {errors[name] && <T2 className='text-red-400'>{errors[name].message}</T2>}
        </>
    )
}