import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo.png";
import Input from "../../../ui/share/Input";
import Button from "../../../ui/share/Button";

function SignIn({ setAuthOption }) {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center p-4 md:p-0">
      <form
        onSubmit={onSubmit}
        className="w-full md:w-[500px] bg-white p-10 flex flex-col gap-4"
      >
        <div className="flex flex-col items-center">
          <img src={Logo} alt="Logo" width={100} />
          <h1 className="text-2xl md:text-4xl font-bold">Sign In</h1>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            title="Email"
            id="email"
            placeholder="example@gmail.com"
            onChange={onchange}
            type="email"
            isRequired={true}
          />

          <Input
            title="Password"
            id="password"
            placeholder="********"
            onChange={onchange}
            type="password"
            isRequired={true}
          />
        </div>
        <button
          onClick={() => setAuthOption("Forget Password")}
          className="text-right text-gray-400 hover:text-[#227F4B] hover:underline"
        >
          Forget Password
        </button>

        <Button customClass="md:w-full">LogIn</Button>

        <p className="text-center">
          Don't Have Account?{" "}
          <button
            onClick={() => setAuthOption("Sign Up")}
            className="text-gray-400 hover:text-[#227F4B] hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
