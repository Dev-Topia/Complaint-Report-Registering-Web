import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleComplaint } from "../../services/complaint";
import { getUserProfile } from "../../services/auth";
import { formatDate } from "../../utils/helpers";
// import Timeline from "@mui/lab/Timeline";
// import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
// import TimelineSeparator from "@mui/lab/TimelineSeparator";
// import TimelineConnector from "@mui/lab/TimelineConnector";
// import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineDot from "@mui/lab/TimelineDot";
// import CheckIcon from "@mui/icons-material/Check";
// import RemoveIcon from "@mui/icons-material/Remove";
import Button from "../../ui/shared/Button";
import Spinner from "../../ui/components/Spinner";

function SingleReport() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["getSingleComplaints"],
    queryFn: () => getSingleComplaint(id),
  });
  const { data: profileData } = useQuery({
    queryKey: ["getUserProfiles"],
    queryFn: getUserProfile,
  });
  console.log(data);
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
                      profileData.imageUrl ||
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
              <div className="flex justify-between gap-10">
                <div className="w-full">
                  <p>{data?.data.data.description}</p>
                </div>
                {/* <div className="flex flex-col gap-4">
                  <h2 className="text-lg md:text-2xl font-bold">Status</h2>
                  <Timeline
                    sx={{
                      [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                      },
                      padding: 0,
                    }}
                  >
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot sx={{ bgcolor: "#4ade80" }}>
                          <CheckIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent
                        sx={{
                          marginTop: 1.5,
                        }}
                      >
                        Posted
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot>
                          <RemoveIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent
                        sx={{
                          marginTop: 1.5,
                        }}
                      >
                        Reviewed
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot>
                          <RemoveIcon />
                        </TimelineDot>
                      </TimelineSeparator>
                      <TimelineContent
                        sx={{
                          marginTop: 1.5,
                        }}
                      >
                        Finished
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </div> */}
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
