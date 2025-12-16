
import React from 'react';

type JioNavbarProps = {
  property: string;
};

const JioNavbar: React.FC<JioNavbarProps> = ({ property }) => {
  // Render a real <nav> with the property displayed
  return (
    <nav>
      <div>{property}</div>
    </nav>
  );
};

const NavBar: React.FC = () => {
  const propertyUrl = "https://contributors.jenkins.io";

  return <JioNavbar property={propertyUrl} />;
};

export default NavBar;
