import { useState } from "react";
import { createComplaint } from "../../services/complaint";
import Input from "../../ui/shared/Input";
import Button from "../../ui/shared/Button";

function RegisterForm() {
  const [inputData, setInputData] = useState({
    title: "",
    complaintTypeId: "",
    statusTypeId: "47b18aa4-d206-4c6c-a162-558ede06f9cb",
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
              <option value="05296d83-5dc5-461c-bdf4-11dc0159ce86">
                Grading and Assessment
              </option>
              <option value="54df1f6a-e7a8-4711-a50b-d8c4469003e4">
                Facilities Maintenance
              </option>
              <option value="7a5b77ac-d418-4e27-b6b5-e6d2a2b5fa7e">
                Special Education Services
              </option>
              <option value="86411e89-e463-4387-b7ac-bb1c84550bbe">
                Safety and Security
              </option>
              <option value="ed8d4f97-9b17-4417-987f-cb7565f4da36">
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
