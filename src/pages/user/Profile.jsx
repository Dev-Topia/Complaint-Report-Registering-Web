import ProfileSection from "@/components/ProfileSection";
import ComplaintSection from "@/components/ComplaintSection";

function Profile() {
  return (
    <section className="p-6 md:p-10 flex flex-col gap-6 md:gap-10">
      <ProfileSection />
      <ComplaintSection />
    </section>
  );
}

export default Profile;
