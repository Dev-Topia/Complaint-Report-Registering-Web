import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { signUpAccount } from "../../services/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomInput from "@/ui/shared/Input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/Logo.png";
import AppContext from "../../contexts/AppContext.jsx";
import Spinner from "@/components/Spinner";
import { getAllDepartment } from "@/services/department";

const wait = () => new Promise((resolve) => setTimeout(resolve, 10000));

function SignUp() {
  const { token } = useContext(AppContext);
  const { data: departments, isLoading } = useQuery({
    queryKey: ["allDepartments"],
    queryFn: getAllDepartment,
  });
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    role: "User",
    departmentId: 0,
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log(inputData);
  const [errorMessage, setErrorMessage] = useState("");
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (inputData.password !== inputData.confirmPassword) {
      setErrorMessage("Password and confirm password not match");
      setLoading(false);
      wait().then(() => setErrorMessage(""));
      return;
    }
    const res = await signUpAccount(inputData);
    if (res.status === 200) {
      navigate("/signin");
    } else {
      setErrorMessage(res.data.msg);
      setLoading(false);
      wait().then(() => setErrorMessage(""));
    }
  };
  if (loading || isLoading) {
    return <Spinner fullScreenSpinner={true} />;
  }
  return (
    <section className="h-screen flex flex-col justify-center items-center p-6 md:p-0">
      <Card className="w-full md:w-[500px]">
        <CardHeader className="flex flex-col items-center">
          <img src={Logo} alt="Logo" width={100} />
          <CardTitle className="text-2xl md:text-4xl font-bold">
            Sign Up
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-6">
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    className="text-sm bg-red-200 text-red-500 p-4 rounded-xl"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex gap-6">
                <div className="w-full space-y-2">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    onChange={onChange}
                    placeholder="First Name"
                  />
                </div>
                <div className="w-full space-y-2">
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    onChange={onChange}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  id="email"
                  onChange={onChange}
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                {/* <Input
                  type="department"
                  id="department"
                  onChange={onChange}
                  placeholder="Department Name"
                /> */}
                <Select
                  onValueChange={(id) => {
                    setInputData((prevState) => ({
                      ...prevState,
                      departmentId: parseInt(id),
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {departments.data.map((department) => (
                        <SelectItem
                          key={department.departmentId}
                          value={department.departmentId.toString()}
                        >
                          {department.departmentName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <CustomInput
                title="Password"
                id="password"
                placeholder="********"
                onChange={onChange}
                type="password"
                isRequired={true}
              />
              <CustomInput
                title="Confirm Password"
                id="confirmPassword"
                placeholder="********"
                onChange={onChange}
                type="password"
                isRequired={true}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-6">
            <Button
              type="submit"
              className="w-full bg-[#227F4B] text-white"
              variant="outline"
            >
              Sign Up
            </Button>
            <p className="text-center">
              Already Have Account?{" "}
              <Link
                to="/signin"
                className="text-gray-400 hover:text-[#227F4B] hover:underline"
              >
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </section>
    // <div className="h-screen flex justify-center items-center p-4 md:p-0">
    //   <form
    //     onSubmit={handleSubmit}
    //     className="w-full md:w-[500px] bg-white border border-gray-200 shadow flex flex-col p-10 gap-4"
    //   >
    //     <div className="flex flex-col items-center">
    //       <img src={Logo} alt="Logo" width={100} />
    //       <h1 className="text-2xl md:text-4xl font-bold">Sign Up</h1>
    //     </div>
    //     <div className="flex gap-4">
    //       {errorMessage && (
    //         <p className="text-sm bg-red-200 text-red-500 p-4 rounded-xl">
    //           {errorMessage}
    //         </p>
    //       )}
    //       <Input
    //         title="First Name"
    //         id="firstName"
    //         placeholder="FirstName"
    //         onChange={onChange}
    //         type="text"
    //         isRequired={true}
    //       />
    //       <Input
    //         title="Last Name"
    //         id="lastName"
    //         placeholder="LastName"
    //         onChange={onChange}
    //         type="text"
    //         isRequired={true}
    //       />
    //     </div>
    //     <Input
    //       title="Email"
    //       id="email"
    //       placeholder="example@gmail.com"
    //       onChange={onChange}
    //       type="email"
    //       isRequired={true}
    //     />

    //     <Input
    //       title="Password"
    //       id="password"
    //       placeholder="********"
    //       onChange={onChange}
    //       type="password"
    //       isRequired={true}
    //     />

    //     <Input
    //       title="Confirm Password"
    //       id="confirmPassword"
    //       placeholder="********"
    //       onChange={onChange}
    //       type="password"
    //       isRequired={true}
    //     />
    //     <Button type="submit" customClass="md:w-full">
    //       Sign Up
    //     </Button>
    //     <p className="text-center">
    //       Already have account?{" "}
    //       <Link
    //         to="/signin"
    //         className="text-gray-400 hover:text-[#227F4B] hover:underline"
    //       >
    //         Sign In
    //       </Link>
    //     </p>
    //   </form>
    // </div>
  );
}

export default SignUp;
