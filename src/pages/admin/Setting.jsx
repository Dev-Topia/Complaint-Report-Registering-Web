import { useQuery } from "@tanstack/react-query";
import {
  getAllComplaintType,
  deleteComplaintType,
} from "../../services/complaint";
import Button from "../../ui/shared/Button";
import Spinner from "../../ui/components/Spinner";

function Setting() {
  const { data: complaintTypes, isLoading } = useQuery({
    queryKey: ["getAllComplaintTypeKey"],
    queryFn: getAllComplaintType,
  });
  if (isLoading) {
    return <Spinner fullScreenSpinner={true} />;
  }
  return (
    <section className="p-4 h-[500px]">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full xl:w-1/2 p-4 gap-4 bg-white border border-gray-200 shadow rounded-xl">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Complaint Type</h1>
            <Button customClass="bg-blue-500 hover:bg-blue-700">Add</Button>
          </div>
          <div className="overflow-auto bg-white border border-gray-200 shadow rounded-xl">
            <table className="table-auto w-full">
              <thead className="border-b-2 border-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-left"> ID</th>
                  <th className="p-4 font-semibold text-left">Type</th>
                  <th className="p-4 font-semibold text-left"></th>
                </tr>
              </thead>
              <tbody>
                {complaintTypes?.data.data.map((complaintType, index) => (
                  <tr
                    key={index}
                    className={index % 2 !== 0 ? "bg-white" : "bg-gray-200"}
                  >
                    <td className="p-4 whitespace-nowrap">
                      {complaintType.complaintTypeId}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {complaintType.complaintType}
                    </td>
                    <td className="p-4 flex justify-end">
                      <Button
                        onClick={() =>
                          deleteComplaintType(complaintType.complaintTypeId)
                        }
                        customClass="bg-red-500 hover:bg-red-700"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Setting;
