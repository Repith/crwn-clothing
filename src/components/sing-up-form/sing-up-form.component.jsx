import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

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
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label for="displayName">Display Name</label>
        <input
          type="text"
          name="displayName"
          id="displayName"
          required
          onChange={handleChange}
          value={displayName}
        ></input>
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          onChange={handleChange}
          value={email}
        ></input>
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={handleChange}
          value={password}
        ></input>
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          onChange={handleChange}
          value={confirmPassword}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
