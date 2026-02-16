import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/main-layout';
import DashboardPage from './pages/dashboard-page';
import TutorPage from './pages/tutor-page';
import FlashcardsPage from './pages/flashcards-page';
import ContentPage from './pages/content-page';
import QuizzesPage from './pages/quizzes-page';
import PomodoroPage from './pages/pomodoro-page';
import ProfilePage from './pages/profile-page';
import SettingsPage from './pages/settings-page';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tutor" element={<TutorPage />} />
          <Route path="flashcards" element={<FlashcardsPage />} />
          <Route path="content" element={<ContentPage />} />
          <Route path="quizzes" element={<QuizzesPage />} />
          <Route path="pomodoro" element={<PomodoroPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
