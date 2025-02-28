import React, { FC, useState } from 'react';
import { Text, View } from 'react-native'
import Voice from "@react-native-voice/voice";
import { TRANSCRIBE_MUTATION } from 'shared/api/graphql/mutations/user';
import { Button } from 'shared/ui/Button/Button';
import { useMutation } from "@apollo/client";
import { H1 } from 'shared/ui/CustomText/CustomText';

export const Speach: FC = () => {

    const [recording, setRecording] = useState(false);
    const [transcription, setTranscription] = useState("");
    const [feedback, setFeedback] = useState("");

    const [transcribeSpeech, { loading }] = useMutation(TRANSCRIBE_MUTATION);

    const startRecording = async () => {
      try {
        await Voice.start("en-US");
        setRecording(true);
      } catch (error) {
        console.error("Error starting recording", error);
      }
    };
  
    const stopRecording = async () => {
      try {
        await Voice.stop();
        setRecording(false);
      } catch (error) {
        console.error("Error stopping recording", error);
      }
    };
  
    Voice.onSpeechResults = (event) => {
      if (event.value) {
        setTranscription(event.value[0]);
      }
    };
  
    const handleTranscribe = async () => {
      if (!transcription) return;
      try {
        const { data } = await transcribeSpeech({ variables: { text: transcription } });
        setFeedback(data.transcribeSpeech.feedback);
      } catch (error) {
        console.error("Error in transcription", error);
      }
    };


    return (

        <View className='w-full items-center'>
            
            <H1 className='mx-auto mb-8'>Speech Practice</H1>

            <Button
                onPress={recording ? stopRecording : startRecording}
                title={recording ? "Stop Recording" : "Start Recording"} >
            </Button>


            <Text>Transcription: {transcription}</Text>
            <Button title="Get AI Feedback" onPress={handleTranscribe} isDisabled={loading} />
            <Text>Feedback: {feedback}</Text>

        </View>

    );
}