import React from "react";

interface TeamMember {
  name: string;
  intro: string;
  bio: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Doyle Martin",
    intro: "",
    bio: "",
    imageUrl: "",
  },
  {
    name: "Ryan Gayle",
    intro: "",
    bio: "",
    imageUrl: "", 
  },
  {
    name: "Chris Del Grosso",
    intro: "Hello everyone, my name is Chris and I am from Boston, MA.",
    bio: "I am a full stack bootcamp student through Columbia University.  enjoy skiing, golfing, and speanding time with friends and family.",
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
            <p className="team-member-role">{member.intro}</p>
            <p className="team-member-bio">{member.bio}</p>
          </div>
        ))}
      </div>
      </div>
  );
};

export default Bio;
