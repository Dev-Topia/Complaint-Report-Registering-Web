import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/auth";

function Profile() {
  const { data, isLoading } = useQuery({
    queryKey: ["getUserProfiles"],
    queryFn: getUserProfile,
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="p-4 xl:px-0">
      {data && !isLoading && (
        <>
          <h1>First Name: {data.data.firstName}</h1>
          <h1>Email: {data.data.email}</h1>
        </>
      )}
    </div>
  );
}

export default Profile;
