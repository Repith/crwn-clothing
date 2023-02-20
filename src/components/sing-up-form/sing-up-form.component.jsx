import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use!");
      } else {
        console.log(err);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          id="Display Name"
          required
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          id="Email"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          id="Password"
          required
          onChange={handleChange}
          value={password}
        />
        <FormInput
          label="Confirm password"
          type="password"
          name="confirmPassword"
          id="Confirm password"
          required
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
