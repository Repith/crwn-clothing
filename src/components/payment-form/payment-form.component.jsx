import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { PaymentFromContainer, FormContainer } from "./payment-form.style";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHendler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
  };
  return (
    <PaymentFromContainer>
      <FormContainer>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
      </FormContainer>
    </PaymentFromContainer>
  );
};

export default PaymentForm;
