import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "../../lib/helpers";

function ReportCard({ data, userData }) {
  const [isImage, setIsImage] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  useEffect(() => {
    if (data.fileUrl) {
      setIsImage(data.fileUrl.match(/\.(jpeg|jpg|gif|png)(\?.*)?$/i));
      setIsPdf(data.fileUrl.match(/\.pdf(\?.*)?$/i));
    }
  }, []);
  const [extendReport, setExtendReport] = useState(false);
  const handleExtendReport = () => {
    setExtendReport(!extendReport);
  };
  return (
    // <Link to={`/report/${data.complaintId}`}>
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-base font-normal">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={userData.imageUrl || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>
                {userData.firstName} {userData.lastName}
              </span>
              <span className="font-semibold">{userData.email}</span>
            </div>
          </div>
          <span className="text-gray-400">{formatDate(data.createdAt)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">{data.title}</h2>
              <h3 className="text-sm">{data.complaintType}</h3>
            </div>
            <Badge className="text-md" variant="outline">
              {data.status}
            </Badge>
          </div>
          {extendReport && (
            <>
              <div className="border h-[1px]"></div>
              <p>{data.description}</p>
              {isImage && (
                <a
                  href={data.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={data.fileUrl} alt="File" className="w-72" />
                </a>
              )}
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
            </>
          )}
          <button
            className="text-sm text-gray-400"
            onClick={handleExtendReport}
          >
            {extendReport ? "Show Less" : "Show More"}
          </button>
        </div>
      </CardContent>
    </Card>
    // </Link>
  );
}

export default ReportCard;
