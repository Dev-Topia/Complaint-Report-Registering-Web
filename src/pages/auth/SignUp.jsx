import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {signUpAccount} from "../../services/auth";
import Logo from "../../assets/Logo.png";
import Input from "../../ui/shared/Input";
import Button from "../../ui/shared/Button";
import AppContext from "../../contexts/AppContext.jsx";

function SignUp() {
    const {token} = useContext(AppContext);
    const [inputData, setInputData] = useState({
        firstName: "",
        lastName: "",
        role: "User",
        email: "",
        password: "",
        confirmPassword: "",
    });
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
        if (inputData.password !== inputData.confirmPassword) {
            setErrorMessage("Password and confirm password not match");
            return;
        }
        const res = await signUpAccount(inputData);
        if (res.status === 200) {
            navigate("/signin");
        } else {
            setErrorMessage(res.data.msg);
        }
    };
    return (
        <div className="h-screen flex justify-center items-center p-4 md:p-0">
            <form
                onSubmit={handleSubmit}
                className="w-full md:w-[500px] bg-white border border-gray-200 shadow flex flex-col p-10 gap-4"
            >
                <div className="flex flex-col items-center">
                    <img src={Logo} alt="Logo" width={100}/>
                    <h1 className="text-2xl md:text-4xl font-bold">Sign Up</h1>
                </div>
                <div className="flex gap-4">
                    {errorMessage && (
                        <p className="text-sm bg-red-200 text-red-500 p-4 rounded-xl">
                            {errorMessage}
                        </p>
                    )}
                    <Input
                        title="First Name"
                        id="firstName"
                        placeholder="FirstName"
                        onChange={onChange}
                        type="text"
                        isRequired={true}
                    />
                    <Input
                        title="Last Name"
                        id="lastName"
                        placeholder="LastName"
                        onChange={onChange}
                        type="text"
                        isRequired={true}
                    />
                </div>
                <Input
                    title="Email"
                    id="email"
                    placeholder="example@gmail.com"
                    onChange={onChange}
                    type="email"
                    isRequired={true}
                />

                <Input
                    title="Password"
                    id="password"
                    placeholder="********"
                    onChange={onChange}
                    type="password"
                    isRequired={true}
                />

                <Input
                    title="Confirm Password"
                    id="confirmPassword"
                    placeholder="********"
                    onChange={onChange}
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
