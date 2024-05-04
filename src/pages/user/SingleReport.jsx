import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleComplaint } from "../../services/complaint";
import { getUserProfile } from "../../services/auth";
import { formatDate } from "../../utils/helpers";
import Button from "../../ui/shared/Button";
import Spinner from "../../ui/components/Spinner";
import AppContext from "../../contexts/AppContext";

function SingleReport() {
  const { id } = useParams();
  const { userId } = useContext(AppContext);
  const { data, isLoading } = useQuery({
    queryKey: ["singleComplaints"],
    queryFn: async () => getSingleComplaint(id),
  });
  const { data: profileData } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => getUserProfile(userId),
  });
  const [isImage, setIsImage] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  useEffect(() => {
    if (data?.data.data.fileUrl) {
      setIsImage(
        data?.data.data.fileUrl.match(/\.(jpeg|jpg|gif|png)(\?.*)?$/i)
      );
      setIsPdf(data?.data.data.fileUrl.match(/\.pdf(\?.*)?$/i));
    }
  }, [data]);
  if (isLoading) {
    return <Spinner fullScreenSpinner={true} />;
  }
  return (
    <>
      {data && !isLoading && (
        <div className="p-4 md:p-10 xl:px-0">
          <div className="bg-white border border-gray-200 shadow h-full flex flex-col gap-4 p-10 justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <img
                    src={
                      profileData?.imageUrl ||
                      "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                    }
                    alt="avatar"
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <p>
                    {profileData && profileData.firstName}{" "}
                    {profileData && profileData.lastName}
                  </p>
                </div>
                <span className="text-gray-400">
                  {data && formatDate(data?.data.data.createdAt)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-4xl font-semibold mb-2">
                    {data?.data.data.title}
                  </h1>
                  <h2>{data?.data.data.complaintType}</h2>
                </div>
                <div>
                  {" "}
                  <span className="bg-yellow-400 px-4 py-2 rounded-full">
                    {data?.data.data.status}
                  </span>
                </div>
              </div>
              <div className="border h-[1px]"></div>
              <div className="flex flex-col gap-4">
                <div className="w-full">
                  <p>{data?.data.data.description}</p>
                </div>
                {isImage && (
                  <img
                    src={data?.data.data.fileUrl}
                    alt="File"
                    className="w-72"
                  />
                )}
                {isPdf && (
                  <a
                    href={data?.data.data.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-72 relative block overflow-hidden"
                  >
                    <span className="absolute inset-0"></span>
                    <object
                      data={data?.data.data.fileUrl}
                      type="application/pdf"
                    >
                      <embed
                        src={data?.data.data.fileUrl}
                        type="application/pdf"
                      />
                    </object>
                  </a>
                )}
              </div>
              <div className="border h-[1px]"></div>
              <div className="flex gap-4 justify-end">
                <Button customClass="bg-blue-500 hover:bg-blue-700">
                  Edit
                </Button>
                <Button customClass="bg-red-500 hover:bg-red-700">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleReport;
