"use client";
import PayPalButton from "@/app/components/PayPalButton";

const PaymentPage = ({ params }) => {
  const id = params.id;

  return (
    <div>
      <h1>PayPal Payment</h1>
      {id && <PayPalButton userID={id} />}
    </div>
  );
};

export default PaymentPage;
