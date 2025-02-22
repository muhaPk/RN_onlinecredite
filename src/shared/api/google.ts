import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from 'shared/config/consts';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID, // your Google OAuth Web Client ID
  iosClientId: IOS_CLIENT_ID,
  offlineAccess: true, // Required for receiving a refresh token
  scopes: ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/drive.readonly'],
});

export const signInWithGoogle = async () => {
try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // userInfo && console.log('userInfo ' + JSON.stringify(userInfo, null, 2))
    return userInfo.data?.idToken ?? null;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    return null;
  }
};
