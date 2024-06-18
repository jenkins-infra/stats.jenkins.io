import React from 'react'

// Define a wrapper to use the jio-navbar component in JSX
const JioNavbar = () => <jio-navbar property="https://contributors.jenkins.io"></jio-navbar>

const NavBar: React.FC = () => {
    return <JioNavbar />
}

export default NavBar
