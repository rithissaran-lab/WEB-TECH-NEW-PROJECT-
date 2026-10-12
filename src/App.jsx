import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { RightPanel } from './components/layout/RightPanel';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { FeedPage } from './pages/FeedPage';
import { ExplorePage } from './pages/ExplorePage';
import { SearchPage } from './pages/SearchPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { SavedPage } from './pages/SavedPage';
import { AuthPage } from './pages/AuthPage';

// Modals
import { CreatePostModal } from './components/modals/CreatePostModal';
import { StoryViewerModal } from './components/modals/StoryViewerModal';
import { PostDetailModal } from './components/modals/PostDetailModal';
import { ConfirmModal } from './components/modals/ConfirmModal';

const AppContent = () => {
  const { isLoggedIn, activePage } = useApp();

  // If not logged in or in auth mode, render full Auth Page
  if (!isLoggedIn || activePage === 'auth') {
    return (
      <main>
        <AuthPage />
        <ToastContainer />
      </main>
    );
  }

  // Active page component selector
  const renderPage = () => {
    switch (activePage) {
      case 'feed':
        return <FeedPage />;
      case 'explore':
        return <ExplorePage />;
      case 'search':
        return <SearchPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'edit-profile':
        return <EditProfilePage />;
      case 'saved':
        return <SavedPage />;
      default:
        return <FeedPage />;
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Top Header */}
      <Navbar />

      {/* Main Responsive Grid Layout */}
      <div className="main-layout">
        {/* Left Desktop Sidebar */}
        <Sidebar />

        {/* Center Main Feed/Content Area */}
        <main className="center-content-wrapper" id="main-content">
          {renderPage()}
        </main>

        {/* Right Desktop Suggestions & Trending Panel */}
        <RightPanel />
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNavigation />

      {/* Interactive Global Modals & Overlays */}
      <CreatePostModal />
      <StoryViewerModal />
      <PostDetailModal />
      <ConfirmModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
