import {  useNavigate } from "react-router-dom";
import Input from "../../ui/shared/Input";
import Button from "../../ui/shared/Button";
import Logo from "../../assets/Logo.png";
import {useContext, useEffect} from "react";
import AppContext from "../../contexts/AppContext.jsx";

function ForgetPassword() {
  const {token} = useContext(AppContext);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  const navigateToSignIn = () => {
    navigate("/signin");
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center p-4 md:p-0">
      <form
        onSubmit={onSubmit}
        className="w-full md:w-[500px] bg-white border border-gray-200 shadow p-10 flex flex-col gap-4"
      >
        <div className="flex flex-col items-center">
          <img src={Logo} alt="Logo" width={100} />
          <h1 className="text-xl md:text-2xl font-bold">Reset Password</h1>
        </div>
        <Input
          title="Please Enter Your Email Below"
          id="email"
          placeholder="example@gmail.com"
          onChange={onchange}
          type="email"
          isRequired={true}
        />
        <div className="flex gap-4">
          <Button onClick={navigateToSignIn} customClass="md:w-full">
            Cancel
          </Button>
          <Button customClass="md:w-full">Send</Button>
        </div>
      </form>
    </div>
  );
}

export default ForgetPassword;
