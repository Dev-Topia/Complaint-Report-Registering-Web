import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {signInAccount} from "../../services/auth";
import AppContext from "../../contexts/AppContext";
import Logo from "../../assets/Logo.png";
import Input from "../../ui/shared/Input";
import Button from "../../ui/shared/Button";
import Spinner from "../../ui/components/Spinner";

function SignIn() {
    const {dispatch, token} = useContext(AppContext);
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
            dispatch({type: "SET_USER_DATA", payload: {...res.data}});
            navigate("/");
        } else {
            setErrorMessage(res.data.msg);
        }
        setLoading(false);
    };
    if (loading) {
        return <Spinner fullScreenSpinner={true}/>;
    }
    return (
        <div className="h-screen flex flex-col justify-center items-center p-4 md:p-0">
            <form
                onSubmit={onSubmit}
                className="w-full md:w-[500px] border border-gray-200 shadow bg-white p-10 flex flex-col gap-4"
            >
                <div className="flex flex-col items-center">
                    <img src={Logo} alt="Logo" width={100}/>
                    <h1 className="text-2xl md:text-4xl font-bold">Sign In</h1>
                </div>
                <div className="flex flex-col gap-4">
                    {errorMessage && (
                        <p className="text-sm bg-red-200 text-red-500 p-4 rounded-xl">
                            {errorMessage}
                        </p>
                    )}
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
                </div>
                <Link
                    to="/forgetpassword"
                    className="text-right text-gray-400 hover:text-[#227F4B] hover:underline"
                >
                    Forget Password
                </Link>

                <Button type="submit" customClass="md:w-full">
                    LogIn
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
            </form>
        </div>
    );
}

export default SignIn;
