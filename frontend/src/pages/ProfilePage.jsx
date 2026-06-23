
import React, { useState } from "react";
import ProfileSidebar from "../components/Profile/ProfileSidebar.jsx";
import { ProfileContent } from "../components/Profile/ProfileContent.jsx";

const ProfilePage = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col md:flex-row gap-4 p-3 sm:p-5">

      {/* SIDEBAR */}
      <div className="w-full md:w-[260px]">
        <ProfileSidebar active={active} setActive={setActive} />
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        <ProfileContent active={active} />
      </div>

    </div>
  );
};

export default ProfilePage;
