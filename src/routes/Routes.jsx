import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Schedule from '../pages/Schedule';
import Search from '../pages/Search';
import IncomingDocument from '../pages/IncomingDocument';
import OutgoingDocument from '../pages/OutgoingDocument';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/outgoingdocument" element={<OutgoingDocument />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/search" element={<Search />} />
        <Route path="/incomingdocument" element={<IncomingDocument />} />
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
