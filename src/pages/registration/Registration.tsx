import React, {FC, useRef} from 'react';
import { CustomInput } from 'shared/ui/input/input'
import { SubmitButton } from 'shared/ui/SubmitButton/SubmitButton'
import { LinkButton } from 'shared/ui/LinkButton/LinkButton';
import { useForm } from "react-hook-form";
import { H1, Underline } from 'shared/ui/CustomText/CustomText';
import { Container } from 'shared/ui/Container/Container';
import { Lang } from 'shared/lang';

export const Registration: FC = () => {

    const { form, registration } = Lang()

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

    <Container>


        <H1 className='mx-auto mt-6'>{registration.registratia}</H1>
        <Underline />

        <CustomInput control={control} errors={errors} placeholder={form.inputs.idnp} name="id_passport" />
        <CustomInput control={control} errors={errors} placeholder={form.inputs.phone} name="phone" />
        <CustomInput control={control} errors={errors} placeholder={form.inputs.name} name="name" />
        <CustomInput control={control} errors={errors} placeholder={form.inputs.surname} name="surname" />

        <SubmitButton className='mt-4' title={form.buttons.registration} onPress={handleSubmit(onSubmit)} />
        <LinkButton className='mt-2' page='Login' title={form.buttons.login} styleColor='light' />

        
    </Container>


    );
}