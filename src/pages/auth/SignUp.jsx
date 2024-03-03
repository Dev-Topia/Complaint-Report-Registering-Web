import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import Input from "../../ui/shared/Input";
import Button from "../../ui/shared/Button";

function SignUp({ setLoading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    schoolName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="h-screen flex justify-center items-center p-4 md:p-0">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[500px] bg-white flex flex-col p-10 gap-4"
      >
        <div className="flex flex-col items-center">
          <img src={Logo} alt="Logo" width={100} />
          <h1 className="text-2xl md:text-4xl font-bold">Sign Up</h1>
        </div>
        <div className="flex gap-4">
          <Input
            title="First Name"
            id="firstname"
            placeholder="FirstName"
            onChange={onchange}
            type="text"
            isRequired={true}
          />
          <Input
            title="Last Name"
            id="lastname"
            placeholder="LastName"
            onChange={onchange}
            type="text"
            isRequired={true}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="gender">Gender</label>
          <select class="form-select block rounded-xl w-full py-2 px-4 border-2 ">
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
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

        <Input
          title="Confirm Password"
          id="confirmpassword"
          placeholder="********"
          onChange={onchange}
          type="password"
          isRequired={true}
        />

        <Button type="submit" customClass="md:w-full">
          Sign Up
        </Button>
        <p className="text-center">
          Already have account?{" "}
          <Link
            to="/signin"
            className="text-gray-400 hover:text-[#227F4B] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
