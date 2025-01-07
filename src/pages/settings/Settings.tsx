import React, {FC} from 'react';
import { Text, View } from 'react-native'
import { CustomInput } from 'shared/ui/input/input'
import { CustomButton } from 'shared/ui/SubmitButton/SubmitButton'
import { useForm } from "react-hook-form";

export const Settings: FC = () => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });


    const onSubmit = (data: any) => {
        console.log('submit')
    };


    return (

        <View className='w-full items-center'>
            
            <Text>Settings</Text>

            <CustomInput control={control} errors={errors} placeholder="Е-маил" name="email" />
            <CustomButton title='button' onPress={handleSubmit(onSubmit)} />

        </View>

    );
}