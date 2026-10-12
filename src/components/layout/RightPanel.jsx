import React from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { Check, UserPlus, TrendingUp, Sparkles, RotateCcw, ShieldCheck } from 'lucide-react';

export const RightPanel = () => {
  const {
    currentUser,
    users,
    toggleFollowUser,
    navigateTo,
    resetDemoData,
    setConfirmDialog,
  } = useApp();

  // Show users that are not the current user
  const suggestedUsers = users.filter((u) => u.username !== currentUser.username).slice(0, 5);

  const trendingTopics = [
    { tag: '#WebTech2026', count: '14.2K posts', category: 'Technology' },
    { tag: '#DesignSystems', count: '8.7K posts', category: 'UI/UX' },
    { tag: '#BrutalistVibes', count: '5.1K posts', category: 'Photography' },
    { tag: '#MinimalistDesk', count: '3.4K posts', category: 'Lifestyle' },
  ];

  const handleResetDataClick = () => {
    setConfirmDialog({
      title: 'Reset Demo Data?',
      message:
        'This will reset all localStorage data back to the clean initial demo state (posts, comments, likes, and profile settings).',
      confirmText: 'Reset Demo Data',
      isDanger: true,
      onConfirm: () => resetDemoData(),
    });
  };

  return (
    <aside
      className="right-panel-wrapper"
      style={{
        width: 'var(--right-panel-width)',
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: '24px 0 24px 20px',
        flexShrink: 0,
        overflowY: 'auto',
      }}
    >
      {/* Current User Quick Summary Card */}
      <div
        className="ch-card"
        style={{
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          onClick={() => navigateTo('profile', currentUser.username)}
        >
          <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: '0.92rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {currentUser.name}
              {currentUser.verified && (
                <ShieldCheck size={14} color="var(--primary-blue)" />
              )}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              @{currentUser.username}
            </div>
          </div>
        </div>
        <button
          onClick={() => navigateTo('edit-profile')}
          className="subtle-btn"
          style={{ fontSize: '0.8rem', padding: '6px 10px', color: 'var(--primary-purple)' }}
        >
          Edit
        </button>
      </div>

      {/* Suggested Users Card */}
      <div className="ch-card" style={{ padding: '16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Suggested For You
          </div>
          <button
            onClick={() => navigateTo('search')}
            style={{ fontSize: '0.8rem', color: 'var(--primary-purple)', fontWeight: 600 }}
          >
            See All
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {suggestedUsers.map((user) => (
            <div
              key={user.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  flex: 1,
                  minWidth: 0,
                }}
                onClick={() => navigateTo('profile', user.username)}
              >
                <Avatar src={user.avatar} alt={user.name} size="sm" />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {user.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      color: 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    @{user.username}
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleFollowUser(user.username)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  backgroundColor: user.isFollowing
                    ? 'var(--bg-input)'
                    : 'var(--primary-purple)',
                  color: user.isFollowing ? 'var(--text-secondary)' : '#ffffff',
                  border: user.isFollowing ? '1px solid var(--border-color)' : 'none',
                }}
              >
                {user.isFollowing ? (
                  <>
                    <Check size={12} />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={12} />
                    <span>Follow</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Hashtags */}
      <div className="ch-card" style={{ padding: '16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 12,
            fontWeight: 700,
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
          }}
        >
          <TrendingUp size={16} color="var(--primary-purple)" />
          <span>Trending on ConnectHub</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {trendingTopics.map((topic, i) => (
            <div
              key={i}
              style={{
                cursor: 'pointer',
                padding: '4px 0',
                borderRadius: 'var(--radius-sm)',
              }}
              onClick={() => navigateTo('explore')}
            >
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {topic.category} • Trending
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  color: 'var(--text-primary)',
                  marginTop: 1,
                }}
              >
                {topic.tag}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {topic.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Meta & Reset Option */}
      <div
        style={{
          padding: '8px 4px',
          fontSize: '0.74rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <Sparkles size={13} color="var(--primary-purple)" />
          <span style={{ fontWeight: 600 }}>Web Technology Academic Project</span>
        </div>
        <p style={{ marginBottom: 10 }}>
          Frontend social media simulation built with React, CSS, and browser localStorage persistence.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={handleResetDataClick}
            style={{
              color: 'var(--text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            <RotateCcw size={12} />
            <span>Reset Demo Data</span>
          </button>
          <span>•</span>
          <span>© 2026 ConnectHub</span>
        </div>
      </div>
    </aside>
  );
};
