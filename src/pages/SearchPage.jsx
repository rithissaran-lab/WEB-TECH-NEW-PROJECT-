import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { EmptyState } from '../components/common/EmptyState';
import {
  Search,
  X,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

export const SearchPage = () => {
  const {
    users,
    currentUser,
    toggleFollowUser,
    navigateTo,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'following', 'verified'

  // Filter users based on query and filters
  const filteredUsers = users.filter((user) => {
    // Exclude current user from search results list if looking for others, or keep visible
    const query = (searchQuery || '').toLowerCase().trim();
    const matchesQuery =
      !query ||
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.bio.toLowerCase().includes(query);

    if (!matchesQuery) return false;

    if (activeFilter === 'following') return user.isFollowing;
    if (activeFilter === 'verified') return user.verified;

    return true;
  });

  return (
    <div className="content-max-width">
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>
          Search Community
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Find creators, designers, developers and friends across ConnectHub.
        </p>
      </div>

      {/* Search Input */}
      <div
        className="ch-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 14px',
          marginBottom: 16,
        }}
      >
        <Search size={20} color="var(--text-muted)" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, @username, or keywords (e.g. 'design', 'photo', 'Berlin')..."
          style={{
            flex: 1,
            border: 'none',
            backgroundColor: 'transparent',
            padding: '8px 0',
            fontSize: '0.94rem',
          }}
          autoFocus
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{ color: 'var(--text-muted)', padding: 4 }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        <button
          onClick={() => setActiveFilter('all')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem',
            fontWeight: 600,
            backgroundColor: activeFilter === 'all' ? 'var(--primary-purple)' : 'var(--bg-surface)',
            color: activeFilter === 'all' ? '#ffffff' : 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
          }}
        >
          All Creators ({users.length})
        </button>

        <button
          onClick={() => setActiveFilter('following')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem',
            fontWeight: 600,
            backgroundColor: activeFilter === 'following' ? 'var(--primary-purple)' : 'var(--bg-surface)',
            color: activeFilter === 'following' ? '#ffffff' : 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
          }}
        >
          Following ({users.filter((u) => u.isFollowing).length})
        </button>

        <button
          onClick={() => setActiveFilter('verified')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.82rem',
            fontWeight: 600,
            backgroundColor: activeFilter === 'verified' ? 'var(--primary-purple)' : 'var(--bg-surface)',
            color: activeFilter === 'verified' ? '#ffffff' : 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
          }}
        >
          Verified Only
        </button>
      </div>

      {/* Users Results List */}
      {filteredUsers.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredUsers.map((user) => {
            const isMe = user.username === currentUser.username;

            return (
              <div
                key={user.id}
                className="ch-card"
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  transition: 'transform 0.15s ease',
                }}
              >
                {/* User Info */}
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, cursor: 'pointer' }}
                  onClick={() => navigateTo('profile', user.username)}
                >
                  <Avatar src={user.avatar} alt={user.name} size="lg" />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '0.98rem',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {user.name}
                      </span>
                      {user.verified && (
                        <ShieldCheck size={16} color="var(--primary-blue)" />
                      )}
                      {isMe && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            backgroundColor: 'var(--bg-input)',
                            color: 'var(--text-muted)',
                            padding: '2px 6px',
                            borderRadius: 'var(--radius-xs)',
                          }}
                        >
                          You
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                      @{user.username} {user.location ? `• ${user.location}` : ''}
                    </div>

                    {user.bio && (
                      <div
                        style={{
                          fontSize: '0.84rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {user.bio}
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        gap: 14,
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        marginTop: 6,
                      }}
                    >
                      <span>
                        <strong style={{ color: 'var(--text-primary)' }}>
                          {user.followersCount.toLocaleString()}
                        </strong>{' '}
                        followers
                      </span>
                      <span>
                        <strong style={{ color: 'var(--text-primary)' }}>{user.postsCount}</strong>{' '}
                        posts
                      </span>
                    </div>
                  </div>
                </div>

                {/* Follow Button */}
                {!isMe && (
                  <button
                    onClick={() => toggleFollowUser(user.username)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      backgroundColor: user.isFollowing
                        ? 'var(--bg-input)'
                        : 'var(--primary-purple)',
                      color: user.isFollowing ? 'var(--text-secondary)' : '#ffffff',
                      border: user.isFollowing ? '1px solid var(--border-color)' : 'none',
                      flexShrink: 0,
                    }}
                  >
                    {user.isFollowing ? (
                      <>
                        <UserCheck size={15} />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={15} />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No creators found"
          description={`We couldn't find any users matching "${searchQuery}". Try different keywords or reset filters.`}
          actionLabel="Clear Search"
          onAction={() => {
            setSearchQuery('');
            setActiveFilter('all');
          }}
        />
      )}
    </div>
  );
};
