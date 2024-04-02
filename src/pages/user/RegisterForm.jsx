import { useState } from "react";
import { createComplaint } from "../../services/complaint";
import Input from "../../ui/shared/Input";
import Button from "../../ui/shared/Button";

function RegisterForm() {
  const [inputData, setInputData] = useState({
    title: "",
    complaintTypeId: "",
    statusTypeId: "bb07beff-74ed-4094-a1b5-aa8476ac9a77",
    description: "",
    fileUrl: null,
  });
  const onChange = (e) => {
    e.preventDefault();
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createComplaint(inputData);
  };
  return (
    <div className="p-4 md:p-10 xl:px-0">
      <form
        onSubmit={onSubmit}
        className="bg-white border border-gray-200 shadow flex flex-col items-center p-10 gap-4"
      >
        <h1 className="font-bold text-2xl md:text-4xl mb-4 md:mb-10">
          Register Complaint
        </h1>
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <div className="w-full md:w-1/2">
            <Input
              title="Title"
              id="title"
              placeholder="Title"
              onChange={onChange}
              type="text"
              isRequired={true}
            />
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <label htmlFor="complaintType">Type</label>
            <select
              id="complaintTypeId"
              className="form-select block rounded-xl w-full py-2 px-4 border-2"
              required
              onChange={onChange}
            >
              <option>Select</option>
              <option value="0294a097-80ff-4661-bd39-f95c4695a4bc">
                Grading and Assessment
              </option>
              <option value="bd791b38-aeda-4285-b8d6-480bbcf70f41">
                Facilities Maintenance
              </option>
              <option value="459487e3-6e7a-4421-8cc5-9a61133e365f">
                Special Education Services
              </option>
              <option value="d90021db-337c-4236-a800-2ef7aade78dc">
                Safety and Security
              </option>
              <option value="1b566bdb-279d-4b65-b893-897ab052d77c">
                Teacher Conduct
              </option>
            </select>
          </div>
        </div>
        {/* <div className="w-full">
          <Input
            title="Location"
            id="location"
            type="text"
            placeholder="Location"
            onChange={onChange}
            isRequired={true}
          />
        </div> */}
        <div className="w-full flex flex-col gap-2">
          <label>Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            onChange={onChange}
            className="p-4 border-2 rounded-xl"
            required
          ></textarea>
        </div>
        <div className="w-full">
          <Input
            title="Image && Proof"
            id="image"
            type="file"
            onChange={onchange}
            // isRequired={true}
            // customClass="h-[200px] bg-[#ffffff]"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default RegisterForm;
