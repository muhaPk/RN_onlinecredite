import React, {FC, useState, useCallback, useEffect} from 'react';
import { Container } from 'shared/ui/Container/Container';
import { H1, H3, T, T2, Underline } from 'shared/ui/CustomText/CustomText';
import { ImageButton } from 'shared/ui/ImageButton/ImageButton';
import { useMutation } from '@apollo/client';
import { UPLOAD_USER_PASSPORT } from 'shared/api/graphql/mutations/user';
import { useGetId } from 'shared/hooks/useGetId';
import { Lang } from 'shared/lang';
import { ReactNativeFile } from 'shared/utils/ReactNativeFile';


export const Passport: FC = () => {

  const userId = useGetId()

  const [uploadUserPassport] = useMutation(UPLOAD_USER_PASSPORT);

  const uploadFile = async (image: any) => {

    if (!image || image.length === 0) {
      console.error('No file selected');
      return;
    }

    image && console.log('image: ' + JSON.stringify(image, null, 2))

    const file = image[0];
    const { uri, fileName, type } = file;

    if (!uri || !fileName || !type) {
      console.error('Invalid file metadata');
      return;
    }


    const fileInput = new ReactNativeFile ({
      uri,
      name: fileName,
      type,
    })

    fileInput && console.log('fileInput: ' + JSON.stringify(fileInput, null, 2))

    try {
      const response = await uploadUserPassport({
        variables: {
          id: userId,
          file: fileInput,
        },
      });

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }


  };

    
    return (

        <Container>

            <H1 className='mx-auto mt-6'>Паспортные данные</H1>
            <Underline />

            <H3 className='mt-8 mb-4 mx-auto center'>Мои данные</H3>

            <ImageButton onImageUpload={uploadFile} />


        </Container>


    );
}