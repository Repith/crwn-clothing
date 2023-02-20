import "./authentication.styles.scss";

import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sing-up-form/sing-up-form.component";

const Authentication = () => {
  return (
    <div>
      <div className="authentication-container">
        <SignInForm />
        <SignUpForm />
      </div>
    </div>
  );
};

export default Authentication;
