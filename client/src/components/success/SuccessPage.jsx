const SuccessPage = ({ paymentMethod }) => (
    <div>
      <h1>Thank You for Your Order!</h1>
      {paymentMethod === "COD" ? (
        <p>Your order will be processed, and you can pay upon delivery.</p>
      ) : (
        <p>
          Please make the payment to the bank account provided and include your
          Order ID in the reference.
        </p>
      )}
    </div>
  );
  
  export default SuccessPage;
  