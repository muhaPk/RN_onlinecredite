import { View, Text } from 'react-native';
import { ReactNode } from 'react';
import { T } from '../CustomText/CustomText';
import IconAntDesign from 'react-native-vector-icons/AntDesign'


export const Ul = ({ children }: { children: ReactNode }) => {
  return <View className="pl-4">{children}</View>;
};


type LiProps = {
  children: ReactNode;
  bullet?: string;
  className?: string;
};

export const Li = ({ children, bullet = "•", ...rest }: LiProps) => {
  
  return (
    <View className="flex-row items-start pr-4">
      <Text className="text-lg mr-2">
        <IconAntDesign 
            name="checkcircle" 
            size={18} 
            color="#29aae2"
        />
      </Text>
      <T {...rest}>{children}</T>
    </View>
  );
};
