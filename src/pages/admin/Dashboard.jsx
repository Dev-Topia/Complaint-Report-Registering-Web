function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-10">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        <div className="w-full bg-white border border-gray-200 shadow rounded-xl p-10">
          <h2 className="text-2xl font-semibold mb-4">Total Report</h2>
          <p className="text-2xl font-semibold">9</p>
        </div>
        <div className="w-full bg-white border border-gray-200 shadow rounded-xl p-10">
          <h2 className="text-2xl font-semibold mb-4">Total Report</h2>
          <p className="text-2xl font-semibold">9</p>
        </div>
        <div className="w-full bg-white border border-gray-200 shadow rounded-xl p-10">
          <h2 className="text-2xl font-semibold mb-4">Total Report</h2>
          <p className="text-2xl font-semibold">9</p>
        </div>
        <div className="w-full bg-white border border-gray-200 shadow rounded-xl p-10">
          <h2 className="text-2xl font-semibold mb-4">Total User</h2>
          <p className="text-2xl font-semibold">9</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
