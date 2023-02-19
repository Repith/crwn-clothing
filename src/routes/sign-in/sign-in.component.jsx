// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import Button from "../../components/button/button.component";

import {
  // auth,
  signInWithGooglePopup,
  // signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sing-up-form/sing-up-form.component";

const SignIn = () => {
  // useEffect(async () => {
  //   const response = await getRedirectResult(auth);
  //   if (response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //   }
  //   console.log(response);
  // }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <Button buttonType="google" onClick={logGoogleUser}>
        Sign in with Google Account
      </Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
