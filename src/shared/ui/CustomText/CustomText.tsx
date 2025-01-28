import React, {ReactNode} from 'react';
import {View, Text} from 'react-native'

type Props = {
    type?: 'h1' | 'h2' | 'h3';
    children: ReactNode;
    className?: string;
}

export const CustomText = ({ children, type = 'h1', ...rest }: Props) => {


    const classTypes = {
        h1: 'font-display text-blue font-bold text-xl',
        h2: 'font-display text-blue font-bold text-lg',
        h3: 'font-display text-[#333] font-bold text-base',
    }

    return (

        <Text className={classTypes[type]} {...rest}>{children}</Text>

    )
}

export const H1 = ({ children, ...rest }: Props) => {
    return (

        <Text className='font-display text-[#333] font-bold text-xl' {...rest}>{children}</Text>

    )
}

export const H2 = ({ children, ...rest }: Props) => {
    return (

        <Text className='font-display text-blue font-bold text-lg' {...rest}>{children}</Text>

    )
}

export const H3 = ({ children, ...rest }: Props) => {
    return (

        <Text className='font-display text-[#333] font-bold text-base' {...rest}>{children}</Text>

    )
}

export const T = ({ children, ...rest }: Props) => {
    return (
      <Text className={'font-display text-gray-600 text-base pr-2'} {...rest}>
        {children}
      </Text>
    );
  };

export const T2 = ({ children, ...rest }: Props) => {
    return (
      <Text className={'font-display text-gray-600 text-sm pr-2'} {...rest}>
        {children}
      </Text>
    );
  };

  export const Underline = ({...rest}) => {

        return (
            
            <View className='w-2/12 mx-auto border-b-2 mb-8 mt-6 border-b-black' {...rest}></View>

        )

  }