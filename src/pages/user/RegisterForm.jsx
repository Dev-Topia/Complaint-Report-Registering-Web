import { useState } from "react";
import { createComplaint } from "../../services/complaint";
import Input from "../../ui/shared/Input";
import Button from "../../ui/shared/Button";

function RegisterForm() {
  const [inputData, setInputData] = useState({
    title: "",
    type: "test",
    description: "",
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
    <div className="p-4 xl:px-0">
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
            <label htmlFor="gender">Type</label>
            <select
              className="form-select block rounded-xl w-full py-2 px-4 border-2"
              required
            >
              <option>Select</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
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
