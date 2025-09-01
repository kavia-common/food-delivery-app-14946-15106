import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';

const NavBar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const containerStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 16px', background: '#0d6efd', color: '#fff'
  };
  const linkStyle = { color: '#fff', textDecoration: 'none', marginRight: 12 };

  return (
    <div style={containerStyle}>
      <div>
        <Link to="/" style={{ ...linkStyle, fontWeight: 600 }}>Admin Portal</Link>
      </div>
      <div>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <button onClick={onLogout} style={{ marginLeft: 12, padding: '6px 10px' }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
