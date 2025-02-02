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
import { View, Image } from 'react-native';

export const Cabinet: FC = () => {

    const { control, handleSubmit, setValue, watch, formState: { errors, dirtyFields }, reset } = useForm({
      defaultValues: {
        id_passport: '',
        phone: '',
        email: '',
        name: '',
        surname: '',
      }
    });

    const [updateUser] = useMutation(UPDATE_USER);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const { form, cabinet } = Lang()
    const userId = useGetId()

    const {data, loading, error} = useQuery(GET_USER, { variables: { id: userId }, skip: !userId, })

    // Update form values when data is fetched
    useEffect(() => {
      if (data?.user) {
        setValue('id_passport', data.user.idPassport);
        setValue('phone', data.user.phone);
        setValue('email', data.user.email);
        setValue('name', data.user.name);
        setValue('surname', data.user.surname);
      }
    }, [data, setValue]);

      // Watch for changes in the form fields
      const watchedName = watch('name');
      const watchedSurname = watch('surname');

      useEffect(() => {
        setIsButtonDisabled(false);
      }, [watchedName, watchedSurname]);

    const updateData = async (formData: any) => {
        const { name, surname } = formData;
        try {
            await updateUser({ variables: { id: userId, name, surname } });
            setIsButtonDisabled(true); // Disable the button after updating
            
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

            <SubmitButton className='mt-6' title={form.buttons.update} onPress={handleSubmit(updateData)} fullWidth isDisabled={isButtonDisabled} />

        </Container>

    );
}