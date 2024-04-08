import PaymentSuccessful from "../../components/PaymentSucessful";
import PaymentDeclined from "../../components/PaymentDeclined";
function page() {
  return (
    <div>
      <PaymentSuccessful />
      <PaymentDeclined />
    </div>
  );
}
export default page;
