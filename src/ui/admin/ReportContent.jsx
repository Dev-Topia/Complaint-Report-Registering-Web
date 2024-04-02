import Button from "../shared/Button";
import { formatDate } from "../../utils/helpers";

function ReportContent(data) {
  console.log(data);
  return (
    <div className="flex flex-col gap-4 p-4 justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="w-[48px] h-[48px] bg-[#d9d9d9] rounded-full"></div>
            <div className="font-bold">
            <p>{data.data.user.lastName}{" "}{data.data.user.firstName}</p>
            <p className="text-gray-400">{data.data.user.email}</p>
            </div>
          </div>
          <span className="text-gray-400">{formatDate(data.data.createdAt)}</span>
        </div>
        <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">{data.data.title}</h1>
        <h1>{data.data.type}</h1>
        </div>
        <div className="border h-[1px]"></div>
        <div className="flex flex-col gap-4">
          <p>
           {data.data.description}
          </p>
          <div className="w-[200px] h-[100px] bg-[#d9d9d9] rounded-xl"></div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-end">
        <textarea
          className="p-4 border rounded-xl w-full"
          placeholder="Reply"
          name=""
          id=""
          rows="4"
        ></textarea>
        <Button>Send</Button>
      </div>
    </div>
  );
}

export default ReportContent;
