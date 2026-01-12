import React, { useEffect } from 'react'

const NavBar: React.FC = () => {
  useEffect(() => {
    // Prevent duplicate injection
    if (document.querySelector('jio-navbar')) return

    const navbar = document.createElement('jio-navbar')
    navbar.setAttribute('property', 'https://stats.jenkins.io')

    const container = document.getElementById('jenkins-navbar')
    if (container) {
      container.appendChild(navbar)
    }
  }, [])

  return <div id="jenkins-navbar" />
}

export default NavBar

