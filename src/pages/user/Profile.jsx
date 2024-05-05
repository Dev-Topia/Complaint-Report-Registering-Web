import { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/auth";
import { updateUser } from "../../services/user";
import { FaPenToSquare } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import ReportCard from "../../ui/user/ReportCard";
import Input from "../../ui/shared/Input";
import Spinner from "../../ui/components/Spinner";
import AppContext from "../../contexts/AppContext";

function Profile() {
  const { userId } = useContext(AppContext);
  const { data, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => getUserProfile(userId),
  });
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const onImgUrlChange = (e) => {
    setImgUrl(e.target.files[0]);
  };
  useEffect(() => {
    if (data) {
      setInputData({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        imageUrl: data.imageUrl,
        userId: data.userId,
      });
    }
    if (imgUrl) {
      setInputData({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        imageUrl: imgUrl,
        userId: data.userId,
      });
    }
  }, [data, imgUrl]);
  const [editMode, setEditMode] = useState(true);
  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    imageUrl: "",
    userId: "",
  });
  const onChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const onSubmit = async () => {
    if (!editMode) {
      setLoading(true);
      if (
        inputData.firstName === data.firstName &&
        inputData.lastName === data.lastName &&
        inputData.phoneNumber === data.phoneNumber &&
        inputData.imageUrl === data.imageUrl
      ) {
        setWarningMessage("No changes were made");
        setLoading(false);
      } else {
        console.log(inputData);
        const res = await updateUser(inputData);
        if (res.status === 200) {
          setMessage(res.data.msg);
          setLoading(false);
        } else {
          setErrorMessage(res.data.msg);
          setLoading(false);
        }
      }
    }
    setEditMode(!editMode);
  };
  if (isLoading || loading) {
    return <Spinner fullScreenSpinner={true} />;
  }
  return (
    <section className="p-4 md:p-10 flex flex-col gap-4 md:gap-10">
      {data && !isLoading && (
        <>
          <div className="w-full bg-white border border-gray-200 shadow p-4 md:p-10">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-bold text-2xl md:text-4xl">My Profile</h1>
            </div>
            <div className="h-[1px] bg-[#D9D9D9] mb-4"></div>
            {message && (
              <div className="p-4 mb-4 bg-green-200 text-green-500 rounded-xl">
                {message}
              </div>
            )}
            {warningMessage && (
              <div className="p-4 mb-4 bg-yellow-200 text-yellow-500 rounded-xl">
                {warningMessage}
              </div>
            )}
            {errorMessage && (
              <div className="p-4 mb-4 bg-red-200 text-red-500 rounded-xl">
                {errorMessage}
              </div>
            )}
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-10">
              <div className="flex flex-col gap-4 justify-center items-center">
                <div className="relative inline-block">
                  <label
                    htmlFor="fileInput"
                    className={!editMode ? `cursor-pointer` : ""}
                  >
                    <img
                      src={
                        inputData.imageUrl ||
                        data?.imageUrl ||
                        "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                      }
                      alt="Profile Image"
                      className="rounded-full w-40 h-32 object-cover"
                    />
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={onImgUrlChange}
                    disabled={editMode}
                  />
                </div>
                <button
                  onClick={onSubmit}
                  className="text-lg flex items-center gap-2"
                >
                  {editMode ? (
                    <>
                      <FaPenToSquare />
                      Edit
                    </>
                  ) : (
                    <>
                      <FaSave /> Save
                    </>
                  )}
                </button>
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Input
                  title="First Name"
                  type="text"
                  placeholder=""
                  id="firstName"
                  className="outline-none text-lg"
                  disabled={editMode}
                  onChange={onChange}
                  value={inputData.firstName}
                />
                <Input
                  title="Last Name"
                  type="text"
                  placeholder=""
                  id="lastName"
                  className="outline-none text-lg"
                  disabled={editMode}
                  onChange={onChange}
                  value={inputData.lastName}
                />
                <Input
                  title="Email"
                  type="text"
                  placeholder=""
                  id="email"
                  className="outline-none text-lg"
                  disabled={true}
                  value={data?.email}
                />
                <Input
                  title="Phone Number"
                  type="text"
                  placeholder=""
                  id="phoneNumber"
                  className="outline-none text-lg"
                  disabled={editMode}
                  onChange={onChange}
                  value={inputData.phoneNumber}
                />
              </div>
            </div>
          </div>
          <div className="w-full bg-white border border-gray-200 shadow p-4 md:p-10">
            <div className="flex items-center mb-4">
              <h1 className="font-bold text-2xl md:text-4xl">My Complaints</h1>
            </div>
            <div className="h-[1px] bg-[#D9D9D9] mb-4"></div>
            {data?.complaints.length === 0 ? (
              <div className="flex justify-center">
                <h1 className="text-xl font-semibold p-10">No Complaints</h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data?.complaints.map((complaint, index) => (
                  <ReportCard key={index} data={complaint} userData={data} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Profile;
