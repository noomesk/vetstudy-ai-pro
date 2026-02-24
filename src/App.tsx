import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/use-auth';
import MainLayout from './components/layout/main-layout';
import DashboardPage from './pages/dashboard-page';
import TutorPage from './pages/tutor-page';
import FlashcardsPage from './pages/flashcards-page';
import ContentPage from './pages/content-page';
import QuizzesPage from './pages/quizzes-page';
import PomodoroPage from './pages/pomodoro-page';
import ProfilePage from './pages/profile-page';
import SettingsPage from './pages/settings-page';
import AuthPage from './pages/auth-page';
import ProtectedRoute from './components/protected-route';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="tutor" element={
              <ProtectedRoute>
                <TutorPage />
              </ProtectedRoute>
            } />
            <Route path="flashcards" element={
              <ProtectedRoute>
                <FlashcardsPage />
              </ProtectedRoute>
            } />
            <Route path="content" element={
              <ProtectedRoute>
                <ContentPage />
              </ProtectedRoute>
            } />
            <Route path="quizzes" element={
              <ProtectedRoute>
                <QuizzesPage />
              </ProtectedRoute>
            } />
            <Route path="pomodoro" element={
              <ProtectedRoute>
                <PomodoroPage />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
