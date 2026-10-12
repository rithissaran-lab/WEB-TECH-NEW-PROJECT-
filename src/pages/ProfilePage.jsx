import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { EmptyState } from '../components/common/EmptyState';
import {
  Grid,
  Bookmark,
  Heart,
  Sliders,
  MapPin,
  Link as LinkIcon,
  Calendar,
  ShieldCheck,
  UserCheck,
  UserPlus,
  MessageSquare,
  Share2,
} from 'lucide-react';

export const ProfilePage = () => {
  const {
    currentUser,
    getViewedUser,
    posts,
    savedPostIds,
    toggleFollowUser,
    navigateTo,
    setSelectedPost,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState('posts'); // 'posts', 'saved', 'liked'
  const user = getViewedUser();
  const isMe = user.username === currentUser.username;

  // Filter posts for this profile
  const userPosts = posts.filter((p) => p.author.username === user.username);

  // Saved posts (for own profile)
  const savedPosts = posts.filter((p) => savedPostIds.includes(p.id));

  // Posts liked by this user
  const likedPosts = posts.filter(
    (p) => p.likes && p.likes.includes(user.username)
  );

  const displayedPosts =
    activeTab === 'posts'
      ? userPosts
      : activeTab === 'saved'
      ? savedPosts
      : likedPosts;

  const handleShareProfile = () => {
    navigator.clipboard?.writeText(window.location.origin + `?user=${user.username}`);
    addToast(`Link to @${user.username} copied!`, '', 'success');
  };

  const handleMessageClick = () => {
    addToast(`Direct messaging with @${user.username}`, 'Demo message window simulated!', 'info');
  };

  return (
    <div className="profile-max-width">
      {/* Cover Banner */}
      <div
        style={{
          height: 200,
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-input)',
          position: 'relative',
          marginBottom: -50,
          border: '1px solid var(--border-color)',
        }}
      >
        <img
          src={
            user.coverPhoto ||
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=400&q=80'
          }
          alt="Profile cover banner"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Profile Header Card */}
      <div
        className="ch-card"
        style={{
          padding: '24px 28px',
          position: 'relative',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 18,
          }}
        >
          {/* Avatar & Identifiers */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}>
            <div style={{ marginTop: -40, position: 'relative' }}>
              <Avatar
                src={user.avatar}
                alt={user.name}
                size="xxl"
                hasStoryRing={true}
              />
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{user.name}</h1>
                {user.verified && (
                  <ShieldCheck size={20} color="var(--primary-blue)" />
                )}
              </div>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                @{user.username}
              </div>
              {user.title && (
                <div
                  style={{
                    fontSize: '0.84rem',
                    color: 'var(--primary-purple)',
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  {user.title}
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {isMe ? (
              <>
                <button
                  onClick={() => navigateTo('edit-profile')}
                  className="gradient-btn"
                  style={{ fontSize: '0.88rem', padding: '9px 18px' }}
                >
                  <Sliders size={16} />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={handleShareProfile}
                  className="outline-btn"
                  style={{ padding: '9px 12px' }}
                  title="Share Profile"
                >
                  <Share2 size={16} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => toggleFollowUser(user.username)}
                  style={{
                    padding: '9px 20px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    backgroundColor: user.isFollowing
                      ? 'var(--bg-input)'
                      : 'var(--primary-purple)',
                    color: user.isFollowing ? 'var(--text-secondary)' : '#ffffff',
                    border: user.isFollowing ? '1px solid var(--border-color)' : 'none',
                    boxShadow: user.isFollowing ? 'none' : 'var(--shadow-sm)',
                  }}
                >
                  {user.isFollowing ? (
                    <>
                      <UserCheck size={16} />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      <span>Follow</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleMessageClick}
                  className="outline-btn"
                  style={{ fontSize: '0.88rem', padding: '9px 16px' }}
                >
                  <MessageSquare size={16} />
                  <span>Message</span>
                </button>

                <button
                  onClick={handleShareProfile}
                  className="outline-btn"
                  style={{ padding: '9px 12px' }}
                  title="Share Profile"
                >
                  <Share2 size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <p
            style={{
              fontSize: '0.94rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              maxWidth: 680,
              marginBottom: 16,
            }}
          >
            {user.bio}
          </p>
        )}

        {/* Details Meta */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 18,
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            marginBottom: 20,
          }}
        >
          {user.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={15} />
              <span>{user.location}</span>
            </div>
          )}
          {user.website && (
            <a
              href={user.website}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--primary-blue)',
                fontWeight: 500,
              }}
            >
              <LinkIcon size={15} />
              <span>{user.website.replace('https://', '')}</span>
            </a>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Calendar size={15} />
            <span>{user.joinedDate || 'Member since 2023'}</span>
          </div>
        </div>

        {/* Statistics Bar */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            borderTop: '1px solid var(--border-color)',
            paddingTop: 16,
          }}
        >
          <div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              {userPosts.length}
            </span>{' '}
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Posts</span>
          </div>

          <div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              {(user.followersCount || 0).toLocaleString()}
            </span>{' '}
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Followers</span>
          </div>

          <div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              {(user.followingCount || 0).toLocaleString()}
            </span>{' '}
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Following</span>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          borderBottom: '1px solid var(--border-color)',
          marginBottom: 20,
        }}
      >
        <button
          onClick={() => setActiveTab('posts')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 20px',
            fontWeight: 700,
            fontSize: '0.88rem',
            color: activeTab === 'posts' ? 'var(--primary-purple)' : 'var(--text-muted)',
            borderBottom:
              activeTab === 'posts'
                ? '2px solid var(--primary-purple)'
                : '2px solid transparent',
            marginBottom: -1,
          }}
        >
          <Grid size={18} />
          <span>POSTS ({userPosts.length})</span>
        </button>

        {isMe && (
          <button
            onClick={() => setActiveTab('saved')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              fontWeight: 700,
              fontSize: '0.88rem',
              color: activeTab === 'saved' ? 'var(--primary-purple)' : 'var(--text-muted)',
              borderBottom:
                activeTab === 'saved'
                  ? '2px solid var(--primary-purple)'
                  : '2px solid transparent',
              marginBottom: -1,
            }}
          >
            <Bookmark size={18} />
            <span>SAVED ({savedPosts.length})</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('liked')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 20px',
            fontWeight: 700,
            fontSize: '0.88rem',
            color: activeTab === 'liked' ? 'var(--primary-purple)' : 'var(--text-muted)',
            borderBottom:
              activeTab === 'liked'
                ? '2px solid var(--primary-purple)'
                : '2px solid transparent',
            marginBottom: -1,
          }}
        >
          <Heart size={18} />
          <span>LIKED ({likedPosts.length})</span>
        </button>
      </div>

      {/* Grid of Posts */}
      {displayedPosts.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {displayedPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                aspectRatio: '1 / 1',
                backgroundColor: 'var(--bg-surface)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-color)',
              }}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector('.post-grid-overlay');
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector('.post-grid-overlay');
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt="Post preview"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    padding: 20,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-input)',
                  }}
                >
                  {post.content.slice(0, 100)}...
                </div>
              )}

              {/* Hover Overlay */}
              <div
                className="post-grid-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.55)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 24,
                  opacity: 0,
                  transition: 'opacity 0.2s ease',
                  color: '#ffffff',
                  fontWeight: 700,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Heart size={20} fill="#ffffff" color="#ffffff" />
                  <span>{post.likes ? post.likes.length : 0}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MessageSquare size={20} fill="#ffffff" color="#ffffff" />
                  <span>{post.comments ? post.comments.length : 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Grid}
          title={
            activeTab === 'posts'
              ? 'No posts yet'
              : activeTab === 'saved'
              ? 'No saved posts'
              : 'No liked posts yet'
          }
          description={
            activeTab === 'posts'
              ? isMe
                ? 'Share your first photo or thought with the ConnectHub community.'
                : `@${user.username} has not published any posts yet.`
              : activeTab === 'saved'
              ? 'Save inspiring posts using the bookmark icon on any post.'
              : 'Posts you like will show up here.'
          }
          actionLabel={isMe && activeTab === 'posts' ? 'Create a Post' : null}
          onAction={() => navigateTo('feed')}
        />
      )}
    </div>
  );
};
