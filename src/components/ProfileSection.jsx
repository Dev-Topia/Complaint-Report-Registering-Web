import { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/auth";
import { updateUser } from "@/services/user";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SquarePen, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppContext from "@/contexts/AppContext";
import Spinner from "@/ui/components/Spinner";

const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

function ProfileSection() {
  const { userId } = useContext(AppContext);
  const { data, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => getUserProfile(userId),
  });
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
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
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
        wait().then(() => setWarningMessage(""));
      } else {
        const res = await updateUser(inputData);
        if (res.status === 200) {
          setMessage(res.data.msg);
          setLoading(false);
          wait().then(() => setMessage(""));
        } else {
          setErrorMessage(res.data.msg);
          setLoading(false);
          wait().then(() => setErrorMessage(""));
        }
      }
    }
    setEditMode(!editMode);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl font-bold">My Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || loading ? (
          <div className="flex justify-center p-6">
            <Spinner />
          </div>
        ) : (
          <>
            <AnimatePresence>
              {message && (
                <motion.div
                  className="p-4 mb-4 bg-green-200 text-green-500 rounded-xl"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.2 }}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {warningMessage && (
                <motion.div
                  className="p-4 mb-4 bg-yellow-200 text-yellow-500 rounded-xl"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.2 }}
                >
                  {warningMessage}
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  className="p-4 mb-4 bg-red-200 text-red-500 rounded-xl"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.2 }}
                >
                  {errorMessage}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex flex-col md:flex-row justify-between gap-6">
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
                        "https://github.com/shadcn.png"
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
                      <SquarePen className="h-4 w-4" />
                      Edit
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save
                    </>
                  )}
                </button>
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="First Name">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    defaultValue={inputData.firstName}
                    onChange={onChange}
                    disabled={editMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Last Name">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    defaultValue={inputData.lastName}
                    onChange={onChange}
                    disabled={editMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    defaultValue={data?.email}
                    onChange={onChange}
                    disabled={editMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Phone Number">Phone Number</Label>
                  <Input
                    type="text"
                    id="phoneNumber"
                    defaultValue={inputData.phoneNumber}
                    onChange={onChange}
                    disabled={editMode}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default ProfileSection;
