import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInAccount } from "../../services/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomInput from "@/ui/shared/Input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import AppContext from "../../contexts/AppContext";
import Logo from "../../assets/Logo.png";
import Spinner from "../../components/Spinner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 10000));

function SignIn() {
  const { dispatch, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  const [errorMessage, setErrorMessage] = useState("");
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signInAccount(inputData);
    if (res.status === 200) {
      dispatch({ type: "SET_USER_DATA", payload: { ...res.data } });
      navigate("/");
    } else {
      setErrorMessage(res.data.msg);
      setLoading(false);
      wait().then(() => setErrorMessage(""));
    }
  };
  if (loading) {
    return <Spinner fullScreenSpinner={true} />;
  }
  return (
    <section className="h-screen flex flex-col justify-center items-center p-6 md:p-0">
      <Card className="w-full md:w-[500px]">
        <CardHeader className="flex flex-col items-center">
          <img src={Logo} alt="Logo" width={100} />
          <CardTitle className="text-2xl md:text-4xl font-bold">
            Sign In
          </CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
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
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  id="email"
                  onChange={onChange}
                  placeholder="example@gmail.com"
                />
              </div>
              <CustomInput
                title="Password"
                id="password"
                placeholder="********"
                onChange={onChange}
                type="password"
                isRequired={true}
              />
              {/* <Link
                to="/forgetpassword"
                className="inline-block text-right text-gray-400 hover:text-[#227F4B] hover:underline"
              >
                Forget Password
              </Link> */}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-6">
            <Button
              type="submit"
              className="w-full bg-[#227F4B] text-white"
              variant="outline"
            >
              Sign In
            </Button>
            <p className="text-center">
              Don't Have Account?{" "}
              <Link
                to="/signup"
                className="text-gray-400 hover:text-[#227F4B] hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}

export default SignIn;
