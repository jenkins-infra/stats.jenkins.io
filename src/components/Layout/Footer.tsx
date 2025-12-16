// export default Footer
import React from 'react';

// Props for the JioFooter component
type JioFooterProps = {
  property: string;
};

// React wrapper for the JioFooter element
const JioFooter: React.FC<JioFooterProps> = ({ property }) => {
  // Replace <div> with <jio-footer> if you want real element
  return <div>{property}</div>;
};

// Main Footer component
const Footer: React.FC = () => {
  return <JioFooter property="https://stats.jenkins.io" />;
};

export default Footer;
