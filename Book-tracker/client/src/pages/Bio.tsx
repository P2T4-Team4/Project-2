import React from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Doyle Martin",
    role: "",
    bio: "",
    imageUrl: "",
  },
  {
    name: "Ryan Gayle",
    role: "",
    bio: "",
    imageUrl: "", 
  },
  {
    name: "Chris Del Grosso",
    role: "",
    bio: "",
    imageUrl: "",
  },
];

const Bio: React.FC = () => {
  return (
    <div className="bio-container">
      <h1 className="bio-title">Meet the Team</h1>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.imageUrl} alt={member.name} className="team-member-image" />
            <h2 className="team-member-name">{member.name}</h2>
            <p className="team-member-role">{member.role}</p>
            <p className="team-member-bio">{member.bio}</p>
          </div>
        ))}
      </div>
      </div>
  );
};

export default Bio;
