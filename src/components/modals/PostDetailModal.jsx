import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import {
  X,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Trash2,
  ShieldCheck,
  MapPin,
  Send,
} from 'lucide-react';

export const PostDetailModal = () => {
  const {
    selectedPost,
    setSelectedPost,
    currentUser,
    toggleLikePost,
    addComment,
    deleteComment,
    toggleSavePost,
    savedPostIds,
    navigateTo,
    addToast,
  } = useApp();

  const [commentText, setCommentText] = useState('');
  const commentInputRef = useRef(null);

  if (!selectedPost) return null;

  const isLiked = selectedPost.likes && selectedPost.likes.includes(currentUser.username);
  const isSaved = savedPostIds.includes(selectedPost.id);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(selectedPost.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + `?post=${selectedPost.id}`);
    addToast('Post link copied to clipboard!', '', 'success');
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
      <div
        className="modal-card"
        style={{
          maxWidth: 960,
          height: '88vh',
          maxHeight: 720,
          flexDirection: 'row',
          padding: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Media */}
        <div
          style={{
            flex: '1.2',
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {selectedPost.image ? (
            <img
              src={selectedPost.image}
              alt="Post media"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          ) : (
            <div
              style={{
                padding: 40,
                color: '#ffffff',
                fontSize: '1.25rem',
                textAlign: 'center',
                lineHeight: 1.6,
              }}
            >
              {selectedPost.content}
            </div>
          )}
        </div>

        {/* Right Side: Header, Comments, Actions */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--bg-surface)',
            borderLeft: '1px solid var(--border-color)',
            minWidth: 320,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
              onClick={() => {
                setSelectedPost(null);
                navigateTo('profile', selectedPost.author.username);
              }}
            >
              <Avatar src={selectedPost.author.avatar} alt={selectedPost.author.name} size="sm" />
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  <span>{selectedPost.author.name}</span>
                  {selectedPost.author.verified && (
                    <ShieldCheck size={14} color="var(--primary-blue)" />
                  )}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  @{selectedPost.author.username}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedPost(null)}
              style={{ color: 'var(--text-muted)', padding: 4 }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Comments & Post Caption */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {/* Post Caption as first comment */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <Avatar src={selectedPost.author.avatar} alt={selectedPost.author.name} size="xs" />
              <div style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>
                <span
                  style={{ fontWeight: 700, marginRight: 6, cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedPost(null);
                    navigateTo('profile', selectedPost.author.username);
                  }}
                >
                  {selectedPost.author.username}
                </span>
                <span style={{ color: 'var(--text-primary)' }}>{selectedPost.content}</span>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {selectedPost.createdAt} {selectedPost.location ? `• ${selectedPost.location}` : ''}
                </div>
              </div>
            </div>

            <div style={{ height: 1, backgroundColor: 'var(--border-subtle)', margin: '4px 0' }} />

            {/* Comments List */}
            {selectedPost.comments && selectedPost.comments.length > 0 ? (
              selectedPost.comments.map((c) => {
                const isMyComment = c.author.username === currentUser.username;
                return (
                  <div
                    key={c.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 8,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flex: 1 }}>
                      <Avatar src={c.author.avatar} alt={c.author.name} size="xs" />
                      <div style={{ fontSize: '0.86rem', lineHeight: 1.45 }}>
                        <span
                          style={{ fontWeight: 700, marginRight: 6, cursor: 'pointer' }}
                          onClick={() => {
                            setSelectedPost(null);
                            navigateTo('profile', c.author.username);
                          }}
                        >
                          {c.author.username}
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>{c.text}</span>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                          {c.createdAt || 'Just now'}
                        </div>
                      </div>
                    </div>

                    {isMyComment && (
                      <button
                        onClick={() => deleteComment(selectedPost.id, c.id)}
                        style={{ color: 'var(--text-muted)', padding: 4 }}
                        title="Delete comment"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  padding: '24px 0',
                }}
              >
                No comments yet. Start the conversation!
              </div>
            )}
          </div>

          {/* Action Row */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                onClick={() => toggleLikePost(selectedPost.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: isLiked ? 'var(--like-color)' : 'var(--text-secondary)',
                }}
              >
                <Heart
                  size={22}
                  fill={isLiked ? 'var(--like-color)' : 'none'}
                  className={isLiked ? 'animate-heart' : ''}
                />
                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                  {selectedPost.likes ? selectedPost.likes.length : 0}
                </span>
              </button>

              <button
                onClick={() => commentInputRef.current?.focus()}
                style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}
              >
                <MessageCircle size={22} />
                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                  {selectedPost.comments ? selectedPost.comments.length : 0}
                </span>
              </button>

              <button onClick={handleShare} style={{ color: 'var(--text-secondary)' }}>
                <Share2 size={21} />
              </button>
            </div>

            <button
              onClick={() => toggleSavePost(selectedPost.id)}
              style={{ color: isSaved ? 'var(--saved-color)' : 'var(--text-secondary)' }}
            >
              <Bookmark size={22} fill={isSaved ? 'var(--saved-color)' : 'none'} />
            </button>
          </div>

          {/* Comment Form */}
          <form
            onSubmit={handleCommentSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <input
              ref={commentInputRef}
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              style={{
                flex: 1,
                padding: '8px 12px',
                fontSize: '0.88rem',
                border: 'none',
                backgroundColor: 'transparent',
              }}
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              style={{
                color: commentText.trim() ? 'var(--primary-purple)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.86rem',
                padding: '4px 8px',
              }}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
