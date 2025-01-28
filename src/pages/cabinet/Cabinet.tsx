import React, {FC, useState, useCallback, useEffect} from 'react';
import { Container } from 'shared/ui/Container/Container';
import { H1, H3, T, T2, Underline } from 'shared/ui/CustomText/CustomText';
import { useForm } from "react-hook-form";
import { CustomInput } from 'shared/ui/input/input'
import { SubmitButton } from 'shared/ui/SubmitButton/SubmitButton'
import { Lang } from 'shared/lang';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from 'shared/api/graphql/queries/user';
import { UPDATE_USER } from 'shared/api/graphql/mutations/user';
import { useGetId } from 'shared/hooks/useGetId';
import { useAuth } from 'shared/hooks/useAuth';
import { View, Image } from 'react-native';

export const Cabinet: FC = () => {

    const { form, cabinet } = Lang()

    const userId = useGetId()
    const { isVerified } = useAuth();

    console.log('Cabinet: is - ' + isVerified)

    const [updateUser] = useMutation(UPDATE_USER);

    const {data, loading, error} = useQuery(GET_USER, { variables: { id: userId }, skip: !userId, })

    // if (loading) return <T>Loading...</T>;
    // if (error) return <T>Error: {error.message}</T>;



    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
          id_passport: '',
          phone: '',
          email: '',
          name: '',
          surname: '',
        }
      });
    
      // Update form values when data is fetched
      useEffect(() => {
        if (data?.user) {
          reset({
            id_passport: data.user.idPassport,
            phone: data.user.phone,
            email: data.user.email,
            name: data.user.name,
            surname: data.user.surname,
          });
        }
      }, [data, reset]);


    const updateData = async (data: any) => {
        const { id_passport, email, phone, name, surname } = data;
        try {
            await updateUser({ variables: { id: userId, id_passport, email, phone, name, surname } });
            
        } catch (error: any) {
            error && console.log('error ' + JSON.stringify(error, null, 2))
            console.log("Error", error.message)
        }
    };
    

    return (

        <Container>


            <H1 className='mx-auto'>{cabinet.title}</H1>
            <T2 className='mx-auto mt-1 mb-8 text-[#999]'>{cabinet.description}</T2>

            <View className="relative rounded-full w-20 h-20 mx-auto bg-red-50">
              <Image source={require('../../shared/assets/user-01.png')} alt="User" className='w-20 max-h-20' />
              <View className="absolute rounded-full border-white bg-[#219653] dark:border-black right-0 top-0 h-5 w-5 border-[3px]"></View>
            </View>

            <CustomInput icon iconName='vcard' control={control} errors={errors} placeholder={form.inputs.idnp} name="id_passport" isDisabled />
            <CustomInput icon iconName='phone-alt' iconSize={20} control={control} errors={errors} placeholder={form.inputs.phone} name="phone" isDisabled />
            <CustomInput icon iconName='email' control={control} errors={errors} placeholder={form.inputs.email} name="email" isDisabled />
            <CustomInput icon iconName='user' control={control} errors={errors} placeholder={form.inputs.name} name="name" />
            <CustomInput icon iconName='user' control={control} errors={errors} placeholder={form.inputs.surname} name="surname" />

            <SubmitButton className='mt-6' title={form.buttons.update} onPress={handleSubmit(updateData)} fullWidth />

        </Container>

    );
}