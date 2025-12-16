import React from 'react';

type JioNavbarProps = {
  property: string;
};

const JioNavbar: React.FC<JioNavbarProps> = ({ property }) => {
  return <div>{property}</div>;
};

const NavBar: React.FC = () => {
  return <JioNavbar property="https://contributors.jenkins.io" />;
};

export default NavBar;
