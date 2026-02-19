import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileCard = ({ profile }) => {
  
  return (
    <Link to={"/doctor/profile"}>
      <div className="flex items-center gap-3 p-4 bg-[#EEF2FF] rounded-xl shadow-sm cursor-pointer">
        {profile?.avatar ? (
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="w-12 h-12 text-[#3A59D1]" />
        )}

        <div>
          <h2 className="text-lg font-semibold text-[#1F2937]">
            Dr. {profile?.name || "Dr. Unknown"}
          </h2>
          <p className="text-sm text-[#6B7280]">{profile?.specialization || "Doctor"}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;
