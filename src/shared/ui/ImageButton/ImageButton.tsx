import React, { useState } from 'react';
import {TouchableOpacity, Image, View, Text,} from 'react-native';
import { T2 } from '../CustomText/CustomText';
import { launchImageLibrary } from 'react-native-image-picker';

interface ImageButtonProps {
  onImageUpload: (image: any) => void;
}

export const ImageButton: React.FC<ImageButtonProps> = ({ onImageUpload }) => {

  const [imageUri, setImageUri] = useState<string | undefined>();

  const handleSelectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.didCancel) {
        console.error('Cancelled', 'Image selection cancelled.');
        return;
      }

      if (result.assets && result.assets[0]) {

        setImageUri(result.assets[0].uri); // Display the image
        onImageUpload(result.assets); // Callback for upload
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };


  const baseViewStyle = 'rounded py-2.5 items-center self-start mx-auto w-full bg-[#29aae2]';
  const baseTextStyle = 'font-bold text-white';


  return (
    <TouchableOpacity onPress={handleSelectImage}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} className='w-10 h-10 object-cover' />
      ) : (
        <View className={baseViewStyle}>
            <Text className={baseTextStyle}>upload image</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};