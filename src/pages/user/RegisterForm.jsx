import React from "react";
import Input from "../../ui/shared/Input";
import Button from "../../ui/shared/Button";

function RegisterForm() {
  return (
    <div className="p-10 xl:px-0">
      <form className="bg-white flex flex-col items-center p-10 gap-4">
        <h1 className="font-bold text-2xl md:text-4xl mb-4 md:mb-10">
          Register Complaint
        </h1>
        <div className="flex gap-4 w-full justify-center">
          <div className="w-1/2">
            <Input
              title="Title"
              id="title"
              placeholder="Title"
              onChange={onchange}
              type="text"
              isRequired={true}
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
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
        <div className="w-full">
          <Input
            title="Location"
            id="location"
            type="text"
            placeholder="Location"
            onChange={onchange}
            isRequired={true}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
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
            isRequired={true}
            // customClass="h-[200px] bg-[#ffffff]"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default RegisterForm;
