import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/auth";
import ReportCard from "../../ui/user/ReportCard";
import Button from "../../ui/shared/Button";
import Input from "../../ui/shared/Input";

function Profile() {
  const { data, isLoading } = useQuery({
    queryKey: ["getUserProfiles"],
    queryFn: getUserProfile,
  });
  if (isLoading) {
    return <p>Loading...</p>;
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
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-10">
              <div className="flex flex-col gap-4 justify-center items-center">
                <div className="relative inline-block">
                  <label
                    htmlFor="fileInput"
                    // className={!disabled ? `cursor-pointer` : ""}
                  >
                    <img
                      src={
                        "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                      }
                      alt="Profile Image"
                      className="rounded-full w-40"
                    />
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    // onChange={onChange}
                    // disabled={disabled}
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Input
                  title="First Name"
                  type="text"
                  placeholder=""
                  id="firstName"
                  className="outline-none text-lg"
                  // disabled={editMode}
                  // onChange={onChange}
                  value={data?.firstName}
                />
                <Input
                  title="Last Name"
                  type="text"
                  placeholder=""
                  id="lastName"
                  className="outline-none text-lg"
                  // disabled={editMode}
                  // onChange={onChange}
                  value={data?.lastName}
                />
                <Input
                  title="Email"
                  type="text"
                  placeholder=""
                  id="email"
                  className="outline-none text-lg"
                  // disabled={true}
                  // onChange={onChange}
                  value={data?.email}
                />
                {/* <Input
                  title="Phone Number"
                  type="text"
                  placeholder=""
                  id="phoneNumber"
                  className="outline-none text-lg"
                  // disabled={editMode}
                  // onChange={onChange}
                /> */}
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
