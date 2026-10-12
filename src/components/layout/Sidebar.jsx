import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import {
  Home,
  Compass,
  Search,
  Bell,
  PlusSquare,
  Bookmark,
  User,
  Moon,
  Sun,
  LogOut,
  RotateCcw,
  Sliders,
  MoreVertical,
  Layers,
  Sparkles,
} from 'lucide-react';

export const Sidebar = () => {
  const {
    activePage,
    navigateTo,
    currentUser,
    unreadNotificationsCount,
    theme,
    toggleTheme,
    setIsCreateModalOpen,
    logout,
    resetDemoData,
    setConfirmDialog,
  } = useApp();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResetDataClick = () => {
    setMenuOpen(false);
    setConfirmDialog({
      title: 'Reset Demo Data?',
      message:
        'This will restore all default sample posts, comments, likes, users, and your profile to initial values. Any created demo posts will be replaced.',
      confirmText: 'Reset Everything',
      isDanger: true,
      onConfirm: () => resetDemoData(),
    });
  };

  const handleLogoutClick = () => {
    setMenuOpen(false);
    setConfirmDialog({
      title: 'Log out of ConnectHub?',
      message: 'You can log back in immediately using any of our 1-click demo profiles.',
      confirmText: 'Log Out',
      isDanger: false,
      onConfirm: () => logout(),
    });
  };

  const navItems = [
    { id: 'feed', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'search', label: 'Search Users', icon: Search },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null,
    },
    { id: 'create', label: 'Create Post', icon: PlusSquare, isModalTrigger: true },
    { id: 'saved', label: 'Saved Posts', icon: Bookmark },
    { id: 'profile', label: 'My Profile', icon: User, param: currentUser.username },
  ];

  return (
    <aside
      className="sidebar-wrapper"
      style={{
        width: 'var(--sidebar-width)',
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-surface)',
        padding: '24px 16px',
        flexShrink: 0,
        zIndex: 100,
        overflowY: 'auto',
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '0 8px',
          marginBottom: 28,
          cursor: 'pointer',
        }}
        onClick={() => navigateTo('feed')}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '12px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: 'var(--brand-glow)',
            flexShrink: 0,
          }}
        >
          <Sparkles size={22} />
        </div>
        <div>
          <div
            className="gradient-text"
            style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              fontFamily: 'var(--font-family-display)',
              lineHeight: 1.1,
            }}
          >
            ConnectHub
          </div>
          <div
            style={{
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Web Tech Project
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activePage === item.id ||
            (item.id === 'profile' && activePage === 'profile' && currentUser.username === item.param);

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isModalTrigger) {
                  setIsCreateModalOpen(true);
                } else {
                  navigateTo(item.id, item.param);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--bg-surface-active)' : 'transparent',
                color: isActive ? 'var(--primary-purple)' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.96rem',
                textAlign: 'left',
                width: '100%',
                position: 'relative',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ position: 'relative', display: 'flex' }}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -8,
                      backgroundColor: 'var(--like-color)',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '1px 5px',
                      borderRadius: 'var(--radius-full)',
                      minWidth: 16,
                      textAlign: 'center',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span style={{ flex: 1 }}>{item.label}</span>
            </button>
          );
        })}

        {/* Primary "+ Create Post" Quick Button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="gradient-btn"
          style={{
            marginTop: 14,
            padding: '12px 16px',
            fontSize: '0.96rem',
            width: '100%',
          }}
        >
          <PlusSquare size={19} />
          <span>New Post</span>
        </button>
      </nav>

      {/* Theme Toggle & Demo Tools */}
      <div
        style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: 16,
          marginTop: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {/* Dark Mode Switcher */}
        <button
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-input)',
            color: 'var(--text-primary)',
            fontSize: '0.88rem',
            fontWeight: 500,
            width: '100%',
          }}
          title="Toggle light and dark mode"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {theme === 'dark' ? (
              <Moon size={18} color="var(--primary-purple)" />
            ) : (
              <Sun size={18} color="#f59e0b" />
            )}
            <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-surface)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
            }}
          >
            {theme === 'dark' ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Current User Card & Popover Menu */}
        <div style={{ position: 'relative' }} ref={menuRef}>
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 10px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: menuOpen ? 'var(--bg-surface-hover)' : 'transparent',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!menuOpen) e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
            }}
            onMouseLeave={(e) => {
              if (!menuOpen) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: 'var(--text-primary)',
                }}
              >
                {currentUser.name}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                @{currentUser.username}
              </div>
            </div>
            <MoreVertical size={16} color="var(--text-muted)" />
          </div>

          {/* User Popover Menu */}
          {menuOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                left: 0,
                right: 0,
                marginBottom: 8,
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                padding: '6px',
                zIndex: 150,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigateTo('edit-profile');
                }}
                className="subtle-btn"
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.86rem' }}
              >
                <Sliders size={16} />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={handleResetDataClick}
                className="subtle-btn"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  fontSize: '0.86rem',
                  color: '#eab308',
                }}
              >
                <RotateCcw size={16} />
                <span>Reset Demo Data</span>
              </button>
              <div style={{ height: 1, backgroundColor: 'var(--border-color)', margin: '4px 0' }} />
              <button
                onClick={handleLogoutClick}
                className="subtle-btn"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  fontSize: '0.86rem',
                  color: 'var(--like-color)',
                }}
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
