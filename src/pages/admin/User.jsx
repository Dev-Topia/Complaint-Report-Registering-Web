import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/user";
import { signUpAccount } from "../../services/auth";
import Input from "../../ui/shared/Input";
import Button from "../../ui/shared/Button";

function User() {
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
  // const navigate = useNavigate();
  const createAccount = async (e) => {
    e.preventDefault();
    if (inputData.password !== inputData.confirmPassword) {
      setErrorMessage("Password and confirm password not match");
      return;
    }
    const res = await signUpAccount(inputData);
    if (res.status === 200) {
      // navigate("/signin");
    } else {
      setErrorMessage(res.data.msg);
    }
  };
  const { data: users } = useQuery({
    queryKey: ["getAllUserKey"],
    queryFn: getUsers,
  });
  return (
    <section className="p-4 flex flex-col xl:flex-row gap-4">
      <div className="w-full xl:w-1/2">
        <div className="p-4 flex flex-col gap-4 bg-white border border-gray-200 shadow rounded-xl">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">User List</h1>
          </div>
          <div className="overflow-auto bg-white border border-gray-200 shadow rounded-xl">
            <table className="table-auto w-full">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-left">Username</th>
                  <th className="p-4 font-semibold text-left">Email</th>
                  <th className="p-4 font-semibold text-left">Role</th>
                  <th className="p-4 font-semibold text-left"></th>
                </tr>
              </thead>
              <tbody>
                {users?.data.data.map((user, index) => (
                  <tr
                    key={index}
                    className={index % 2 !== 0 ? "bg-white" : "bg-gray-200"}
                  >
                    <td className="p-4 whitespace-nowrap">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="p-4 whitespace-nowrap">{user.email}</td>
                    <td className="p-4 whitespace-nowrap">{user.role[0]}</td>
                    <td className="p-4 flex justify-end">
                      <Button>Action</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full xl:w-1/2">
        <div className="p-4 bg-white border border-gray-200 shadow rounded-xl">
          <h1 className="text-2xl font-bold mb-4">Create Account</h1>
          <form onSubmit={createAccount} className="flex flex-col gap-4">
            {errorMessage && (
              <p className="text-sm bg-red-200 text-red-500 p-4 rounded-xl">
                {errorMessage}
              </p>
            )}
            <div className="flex gap-4">
              <div className="w-full">
                <Input
                  title="First Name"
                  id="firstName"
                  placeholder="FirstName"
                  onChange={onChange}
                  type="text"
                  isRequired={true}
                />
              </div>
              <div className="w-full">
                <Input
                  title="Last Name"
                  id="lastName"
                  placeholder="LastName"
                  onChange={onChange}
                  type="text"
                  isRequired={true}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Role</label>
              <select
                id="role"
                onChange={onChange}
                className="rounded-xl w-full py-2 px-4 border-2 focus:outline-none focus:ring focus:border-[#227F4B]"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
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
            <div className="flex justify-end">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default User;
