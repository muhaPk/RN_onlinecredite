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

export const Cabinet: FC = () => {

    const { form } = Lang()

    const userId = useGetId()

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
            const res = await updateUser({ variables: { id: userId, id_passport, email, phone, name, surname } });
            res && console.log('res ' + JSON.stringify(res, null, 2))
            
        } catch (error: any) {
            error && console.log('error ' + JSON.stringify(error, null, 2))
            console.log("Error", error.message)
        }
    };

    return (

        <Container>

            <H1 className='mx-auto mt-6'>Личный кабинет</H1>
            <Underline />


            <H3 className='mt-8 mb-4 mx-auto center'>Мои данные</H3>


            <CustomInput control={control} errors={errors} placeholder={form.inputs.idnp} name="id_passport" title={form.label.idnp} />
            <CustomInput control={control} errors={errors} placeholder={form.inputs.phone} name="phone" title={form.label.phone} isDisabled={true} />
            <CustomInput control={control} errors={errors} placeholder={form.inputs.email} name="email" title={form.label.email} isDisabled={true} />
            <CustomInput control={control} errors={errors} placeholder={form.inputs.name} name="name" title={form.label.name} />
            <CustomInput control={control} errors={errors} placeholder={form.inputs.surname} name="surname" title={form.label.surName} />

            <SubmitButton className='mt-4' title={form.buttons.update} onPress={handleSubmit(updateData)} />

        </Container>


    );
}