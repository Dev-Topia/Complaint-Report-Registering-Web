import ComplaintTypeTable from "@/components/ComplaintTypeTable";
import DepartmentTable from "@/components/DepartmentTable";

function Setting() {
  return (
    <section className="p-4 flex flex-col xl:flex-row gap-4">
      <div className="w-full">
        <ComplaintTypeTable />
      </div>
      <div className="w-full">
        <DepartmentTable />
      </div>
    </section>
  );
}

export default Setting;
