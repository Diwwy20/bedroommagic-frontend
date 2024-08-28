import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth'
import Config from "react-native-config";

export const _signInWithGoogle = async () => {
    try{
        GoogleSignin.configure({
            offlineAccess: false,
            webClientId: Config.WEB_CLIENT_ID,
            scopes: ['profile', 'email']
        });
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        const {idToken} = await GoogleSignin.signIn();
        const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
        auth().signInWithCredential(googleCredentials);
        return userInfo;
    } catch (error) {
        console.log('=> Google Sign In', error);
        return null
    }
}

export const _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (error) {
      console.log('=> Google Sign Out', error);
    }
  };