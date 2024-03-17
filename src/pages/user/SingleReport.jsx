import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleComplaint } from "../../services/complaint";
import { getUserProfile } from "../../services/auth";
import { formatDate } from "../../utils/helpers";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "../../ui/shared/Button";

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
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      {data && !isLoading && (
        <div className="p-4 md:p-10 xl:px-0">
          <div className="bg-white border border-gray-200 shadow h-full flex flex-col gap-4 p-10 justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-[48px] h-[48px] bg-[#d9d9d9] rounded-full"></div>
                  <p>
                    {profileData && profileData.data.firstName}{" "}
                    {profileData && profileData.data.lastName}
                  </p>
                </div>
                <span className="text-gray-400">
                  {data && formatDate(data.data.createdAt)}
                </span>
              </div>
              <h1 className="text-4xl font-bold">{data.data.title}</h1>
              <div className="border h-[1px]"></div>
              <div className="flex justify-between gap-10">
                <div className="w-full">
                  <p>{data.data.description}</p>
                  {/* <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat repellendus rerum quis commodi totam explicabo,
                    consectetur debitis quibusdam? Praesentium dignissimos
                    debitis distinctio nihil ut laborum quo qui necessitatibus
                    natus soluta.
                  </p> */}
                </div>
                <div className="flex flex-col gap-4">
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
                        <TimelineConnector sx={{ bgcolor: "#facc15" }} />
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
                        <TimelineDot sx={{ bgcolor: "#facc15" }}>
                          <RemoveIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent
                        sx={{
                          marginTop: 1.5,
                        }}
                      >
                        Pending
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
                </div>
              </div>
              <div className="border h-[1px]"></div>
              <div className="flex gap-4 justify-end">
                <Button customClass="bg-blue-500">Edit</Button>
                <Button customClass="bg-red-500">Delete</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
// #facc15
export default SingleReport;
