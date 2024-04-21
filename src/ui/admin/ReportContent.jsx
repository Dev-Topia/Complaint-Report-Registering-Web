import { useState } from "react";
import { formatDate } from "../../utils/helpers";
import Button from "../shared/Button";

function ReportContent({ data }) {
  const isImage =
    data.fileUrl && data.fileUrl.match(/\.(jpeg|jpg|gif|png)(\?.*)?$/i);
  const isPdf = data.fileUrl && data.fileUrl.match(/\.pdf(\?.*)?$/i);
  const [showPdf, setShowPdf] = useState(false);
  return (
    <div className="h-full flex flex-col gap-4 p-4 justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <img
              src={
                data.user.imageUrl ||
                "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
              }
              alt="avatar"
              className="rounded-full w-12 h-12 object-cover"
            />
            <div>
              <p>
                {data.user.lastName} {data.user.firstName}
              </p>
              <p className="text-gray-400">{data.email}</p>
            </div>
          </div>
          <span className="text-gray-400">{formatDate(data.createdAt)}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold">{data.title}</h1>
            <h2>{data.complaintType}</h2>
          </div>
          <div>
            <span
              className={`px-4 py-2 rounded-full ${
                data.status === "Posted" && "bg-green-400"
              } ${data.status === "Reviewed" && "bg-yellow-400"}
              ${data.status === "Finished" && "bg-green-400"}`}
            >
              {data.status}
            </span>
          </div>
        </div>
        <div className="border h-[1px]"></div>
        <div className="flex flex-col gap-4">
          <p>{data.description}</p>
          {/* {data !== "" && <img src={data.fileUrl} alt="" />} */}
          {isImage && <img src={data.fileUrl} alt="File" className="w-64" />}
          {/* {isPdf && (
            <object data={data.fileUrl} type="application/pdf" className="w-64">
              <embed src={data.fileUrl} type="application/pdf" />
            </object>
          )} */}
          {/* <a
            href={data.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-64"
          >
            <object data={data.fileUrl} type="application/pdf">
              <embed src={data.fileUrl} type="application/pdf" />
            </object>
          </a> */}
          {isPdf && (
            <a
              href={data.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-72 relative block overflow-hidden"
            >
              <span className="absolute inset-0"></span>
              <object data={data.fileUrl} type="application/pdf">
                <embed src={data.fileUrl} type="application/pdf" />
              </object>
            </a>
          )}
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
