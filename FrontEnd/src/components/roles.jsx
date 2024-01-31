import React from 'react';
import './Css/roles.css';

export default function Roles() {
  return (
    <div className="container">
      <a href="/managerlogin" className="role-btn manager">
        <span className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 1L1 5v6c0 5.523 4.477 10 10 10s10-4.477 10-10V5L12 1zm-1 18h2v2h-2v-2zm0-14h2v10h-2V5zm2-2v2h-2V3h2zM5.571 7l1.037 8.291L12 18.571l5.392-3.28L18.429 7H5.571zM12 16l-4-2.429V9h8v4.571L12 16zm-3-7h6V5h-6v4zm2-2h2v2h-2V9z" />
          </svg>
        </span>
        <span className="text">MANAGER</span>
      </a>
      <a href="/employeeLogin" className="role-btn staff">
        <span classN    ame="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20 12c0 2.206-1.794 4-4 4s-4-1.794-4-4V6c0-2.206 1.794-4 4-4s4 1.794 4 4zm2 0v6c0 3.314-2.686 6-6 6H8c-3.314 0-6-2.686-6-6V6C2 2.686 4.686 0 8 0h8c3.314 0 6 2.686 6 6zm-8-6h-2v2h2V6zm0 4h-2v2h2v-2z" />
          </svg>
        </span>
        <span className="text">STAFF</span>
      </a>
    </div>
  );
}
