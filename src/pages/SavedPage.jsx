import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EmptyState } from '../components/common/EmptyState';
import {
  Bookmark,
  Heart,
  MessageCircle,
  Trash2,
  Lock,
} from 'lucide-react';

export const SavedPage = () => {
  const {
    posts,
    savedPostIds,
    toggleSavePost,
    setSelectedPost,
    navigateTo,
  } = useApp();

  const savedPosts = posts.filter((p) => savedPostIds.includes(p.id));

  return (
    <div className="profile-max-width">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Saved Collection</h1>
            <span
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                color: 'var(--saved-color)',
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
              }}
            >
              {savedPosts.length} items
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: '0.84rem',
              color: 'var(--text-muted)',
              marginTop: 4,
            }}
          >
            <Lock size={13} />
            <span>Only you can see the posts and reels you have bookmarked.</span>
          </div>
        </div>

        <button
          onClick={() => navigateTo('explore')}
          className="outline-btn"
          style={{ fontSize: '0.85rem' }}
        >
          Explore More
        </button>
      </div>

      {/* Grid of Saved Posts */}
      {savedPosts.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 18,
          }}
        >
          {savedPosts.map((post) => (
            <div
              key={post.id}
              className="ch-card"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Media Container */}
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  backgroundColor: 'var(--bg-input)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
                onClick={() => setSelectedPost(post)}
              >
                {post.image ? (
                  <img
                    src={post.image}
                    alt="Saved post"
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
                    }}
                  >
                    {post.content.slice(0, 90)}...
                  </div>
                )}

                {/* Remove from Saved Bookmark Quick Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSavePost(post.id);
                  }}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(4px)',
                    color: 'var(--saved-color)',
                    borderRadius: '50%',
                    width: 34,
                    height: 34,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                  title="Remove from saved"
                >
                  <Bookmark size={17} fill="var(--saved-color)" />
                </button>
              </div>

              {/* Bottom Info Bar */}
              <div
                style={{
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--bg-surface)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 140,
                  }}
                  onClick={() => navigateTo('profile', post.author.username)}
                >
                  @{post.author.username}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Heart size={14} /> {post.likes ? post.likes.length : 0}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MessageCircle size={14} /> {post.comments ? post.comments.length : 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bookmark}
          title="No saved posts yet"
          description="When you find an interesting post or photograph on ConnectHub, click the bookmark icon to save it here for later."
          actionLabel="Explore Feed"
          onAction={() => navigateTo('feed')}
        />
      )}
    </div>
  );
};
