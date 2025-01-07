import React, {FC, useRef} from 'react';
import { CustomInput } from 'shared/ui/input/input'
import { SubmitButton } from 'shared/ui/SubmitButton/SubmitButton'
import { LinkButton } from 'shared/ui/LinkButton/LinkButton';
import { useForm } from "react-hook-form";
import { H1, Underline } from 'shared/ui/CustomText/CustomText';
import { Container } from 'shared/ui/Container/Container';
import { Lang } from 'shared/lang';
import { CREATE_USER } from 'shared/api/graphql/mutations/user';
import { useMutation } from '@apollo/client';

export const Registration: FC = () => {

    const { form, registration } = Lang()

    const [createUser] = useMutation(CREATE_USER);

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            id_passport: '',
            email: '',
            phone: '',
            name: '',
            surname: '',
        }
    });


    const onSubmit = async (data: any) => {
        const { id_passport, email, phone, name, surname } = data;

        try {
            await createUser({ variables: { id_passport, email, phone, name, surname } });
            reset({ id_passport: '', phone: '', name: '', surname: '' })
            
        } catch (error: any) {
            error && console.log('error ' + JSON.stringify(error, null, 2))
            console.log("Error", error.message)
        }

    };


    return (

    <Container>


        <H1 className='mx-auto mt-6'>{registration.registratia}</H1>
        <Underline />

        <CustomInput control={control} errors={errors} placeholder={form.inputs.email} name="email" title={form.label.email} />
        <CustomInput control={control} errors={errors} placeholder={form.inputs.idnp} name="id_passport" title={form.label.idnp} />
        <CustomInput control={control} errors={errors} placeholder={form.inputs.phone} name="phone" title={form.label.phone} />
        <CustomInput control={control} errors={errors} placeholder={form.inputs.name} name="name" title={form.label.name} />
        <CustomInput control={control} errors={errors} placeholder={form.inputs.surname} name="surname" title={form.label.surName} />

        <SubmitButton className='mt-4' title={form.buttons.registration} onPress={handleSubmit(onSubmit)} />
        <LinkButton className='mt-2' page='Login' title={form.buttons.login} styleColor='light' />

        
    </Container>


    );
}