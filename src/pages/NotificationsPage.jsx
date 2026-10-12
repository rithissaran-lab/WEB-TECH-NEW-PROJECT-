import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { EmptyState } from '../components/common/EmptyState';
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  AtSign,
  CheckCheck,
  Trash2,
} from 'lucide-react';

export const NotificationsPage = () => {
  const {
    notifications,
    markNotificationsRead,
    clearNotifications,
    posts,
    setSelectedPost,
    toggleFollowUser,
    users,
    navigateTo,
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'unread', 'like', 'comment', 'follow'

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'like') return n.type === 'like';
    if (activeTab === 'comment') return n.type === 'comment';
    if (activeTab === 'follow') return n.type === 'follow';
    return true;
  });

  const handleNotificationClick = (item) => {
    if (item.postId) {
      const foundPost = posts.find((p) => p.id === item.postId);
      if (foundPost) {
        setSelectedPost(foundPost);
      }
    } else if (item.actor?.username) {
      navigateTo('profile', item.actor.username);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart size={14} color="#ffffff" fill="#ffffff" />;
      case 'comment':
        return <MessageCircle size={14} color="#ffffff" />;
      case 'follow':
        return <UserPlus size={14} color="#ffffff" />;
      case 'mention':
        return <AtSign size={14} color="#ffffff" />;
      default:
        return <Bell size={14} color="#ffffff" />;
    }
  };

  const getBadgeBg = (type) => {
    switch (type) {
      case 'like':
        return 'var(--like-color)';
      case 'comment':
        return 'var(--primary-blue)';
      case 'follow':
        return 'var(--primary-purple)';
      case 'mention':
        return '#f59e0b';
      default:
        return 'var(--primary-purple)';
    }
  };

  return (
    <div className="content-max-width">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Notifications</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Updates on likes, comments, mentions & new followers.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={markNotificationsRead}
            className="subtle-btn"
            style={{ fontSize: '0.82rem', gap: 6 }}
            title="Mark all as read"
          >
            <CheckCheck size={16} />
            <span>Mark all read</span>
          </button>
          <button
            onClick={clearNotifications}
            className="subtle-btn"
            style={{ fontSize: '0.82rem', gap: 6, color: 'var(--text-muted)' }}
            title="Clear notifications"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 16,
          overflowX: 'auto',
          paddingBottom: 4,
        }}
      >
        {[
          { id: 'all', label: 'All' },
          { id: 'unread', label: 'Unread' },
          { id: 'like', label: 'Likes' },
          { id: 'comment', label: 'Comments' },
          { id: 'follow', label: 'Follows' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 600,
              backgroundColor: activeTab === tab.id ? 'var(--primary-purple)' : 'var(--bg-surface)',
              color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      {filteredNotifications.length > 0 ? (
        <div className="ch-card" style={{ padding: '6px' }}>
          {filteredNotifications.map((item, idx) => {
            const actorUser = users.find((u) => u.username === item.actor?.username);
            const isFollowingActor = actorUser ? actorUser.isFollowing : false;

            return (
              <div
                key={item.id || idx}
                onClick={() => handleNotificationClick(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: item.read ? 'transparent' : 'rgba(139, 92, 246, 0.05)',
                  cursor: 'pointer',
                  borderBottom:
                    idx < filteredNotifications.length - 1
                      ? '1px solid var(--border-subtle)'
                      : 'none',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = item.read
                    ? 'transparent'
                    : 'rgba(139, 92, 246, 0.05)';
                }}
              >
                {/* Avatar with type badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
                  <div style={{ position: 'relative' }}>
                    <Avatar
                      src={item.actor?.avatar}
                      alt={item.actor?.name || 'User'}
                      size="sm"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: -3,
                        right: -3,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: getBadgeBg(item.type),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid var(--bg-surface)',
                      }}
                    >
                      {getIcon(item.type)}
                    </div>
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.88rem', lineHeight: 1.4, color: 'var(--text-primary)' }}>
                      <strong>{item.actor?.name}</strong>{' '}
                      <span style={{ color: 'var(--text-secondary)' }}>{item.content}</span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {item.timeAgo}
                    </div>
                  </div>
                </div>

                {/* Right Preview or Action */}
                <div style={{ marginLeft: 12, flexShrink: 0 }}>
                  {item.postPreview ? (
                    <img
                      src={item.postPreview}
                      alt="Post preview"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 'var(--radius-sm)',
                        objectFit: 'cover',
                      }}
                    />
                  ) : item.type === 'follow' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFollowUser(item.actor.username);
                      }}
                      style={{
                        padding: '5px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        backgroundColor: isFollowingActor
                          ? 'var(--bg-input)'
                          : 'var(--primary-purple)',
                        color: isFollowingActor ? 'var(--text-secondary)' : '#ffffff',
                        border: isFollowingActor ? '1px solid var(--border-color)' : 'none',
                      }}
                    >
                      {isFollowingActor ? 'Following' : 'Follow Back'}
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title="No notifications here"
          description="You're all caught up with your interactions, likes, and mentions."
        />
      )}
    </div>
  );
};
