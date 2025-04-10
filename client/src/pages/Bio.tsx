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
    intro: "Doyle is from Reno, Nevada, and he currently lives in Montreal, Canada.",
    bio: "I am a full stack bootcamp student through Columbia University. I enjoy traveling, reading, and working out.",
    imageUrl: "../assets/images/doyle.jpg",
  },
  {
    name: "Ryan Gayle",
    intro: "Ryan is from Brooklyn, NYC, and he's currently an SEO Specialist.",
    bio: "Ryan is a full stack bootcamp student through Columbia University. He enjoys watching sports, working out, and talking on his Knicks based podcast.",
    imageUrl: "", 
  },
  {
    name: "Chris Del Grosso",
    intro: "Chris is from Boston, MA.",
    bio: "Chris is a full stack bootcamp student through Columbia University.  He enjoys skiing, golfing, and speanding time with friends and family.",
    imageUrl: "../assets/images/chris.jpg",
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
