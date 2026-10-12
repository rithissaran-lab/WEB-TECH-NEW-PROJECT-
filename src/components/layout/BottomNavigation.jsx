import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Compass, Plus, Bookmark, User } from 'lucide-react';
import { Avatar } from '../common/Avatar';

export const BottomNavigation = () => {
  const {
    activePage,
    navigateTo,
    currentUser,
    setIsCreateModalOpen,
  } = useApp();

  return (
    <nav
      className="bottom-nav-wrapper"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--bottom-nav-height)',
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 90,
        padding: '0 8px',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.04)',
      }}
    >
      {/* Home */}
      <button
        onClick={() => navigateTo('feed')}
        style={{
          color: activePage === 'feed' ? 'var(--primary-purple)' : 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: 8,
        }}
        aria-label="Home Feed"
      >
        <Home size={22} strokeWidth={activePage === 'feed' ? 2.5 : 2} />
      </button>

      {/* Explore */}
      <button
        onClick={() => navigateTo('explore')}
        style={{
          color: activePage === 'explore' ? 'var(--primary-purple)' : 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: 8,
        }}
        aria-label="Explore"
      >
        <Compass size={22} strokeWidth={activePage === 'explore' ? 2.5 : 2} />
      </button>

      {/* Central Create Button */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'var(--primary-gradient)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--brand-glow)',
          transform: 'translateY(-6px)',
          border: '3px solid var(--bg-surface)',
        }}
        aria-label="Create Post"
      >
        <Plus size={24} strokeWidth={2.5} />
      </button>

      {/* Saved */}
      <button
        onClick={() => navigateTo('saved')}
        style={{
          color: activePage === 'saved' ? 'var(--primary-purple)' : 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: 8,
        }}
        aria-label="Saved Posts"
      >
        <Bookmark size={22} strokeWidth={activePage === 'saved' ? 2.5 : 2} />
      </button>

      {/* Profile */}
      <button
        onClick={() => navigateTo('profile', currentUser.username)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
          border:
            activePage === 'profile'
              ? '2px solid var(--primary-purple)'
              : '2px solid transparent',
          borderRadius: '50%',
        }}
        aria-label="My Profile"
      >
        <Avatar src={currentUser.avatar} alt={currentUser.name} size="xs" />
      </button>
    </nav>
  );
};
