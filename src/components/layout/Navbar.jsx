import React from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { Sparkles, Bell, Moon, Sun, Search } from 'lucide-react';

export const Navbar = () => {
  const {
    currentUser,
    unreadNotificationsCount,
    theme,
    toggleTheme,
    navigateTo,
  } = useApp();

  return (
    <header
      className="mobile-top-navbar"
      style={{
        position: 'sticky',
        top: 0,
        height: 'var(--header-height)',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 16px',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 90,
      }}
    >
      {/* Brand */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        onClick={() => navigateTo('feed')}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '9px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
          }}
        >
          <Sparkles size={18} />
        </div>
        <span
          className="gradient-text"
          style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            fontFamily: 'var(--font-family-display)',
          }}
        >
          ConnectHub
        </span>
      </div>

      {/* Right Action Icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => navigateTo('search')}
          style={{
            color: 'var(--text-secondary)',
            padding: 6,
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
          }}
          aria-label="Search"
        >
          <Search size={21} />
        </button>

        <button
          onClick={toggleTheme}
          style={{
            color: 'var(--text-secondary)',
            padding: 6,
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
          }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Moon size={21} color="var(--primary-purple)" />
          ) : (
            <Sun size={21} color="#f59e0b" />
          )}
        </button>

        <button
          onClick={() => navigateTo('notifications')}
          style={{
            color: 'var(--text-secondary)',
            padding: 6,
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            position: 'relative',
          }}
          aria-label="Notifications"
        >
          <Bell size={21} />
          {unreadNotificationsCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 9,
                height: 9,
                backgroundColor: 'var(--like-color)',
                borderRadius: '50%',
              }}
            />
          )}
        </button>

        <div onClick={() => navigateTo('profile', currentUser.username)} style={{ cursor: 'pointer' }}>
          <Avatar src={currentUser.avatar} alt={currentUser.name} size="xs" />
        </div>
      </div>
    </header>
  );
};
