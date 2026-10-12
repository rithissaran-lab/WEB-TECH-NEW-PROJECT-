import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
  MapPin,
  Send,
  Trash2,
  Check,
  ShieldCheck,
  Copy,
} from 'lucide-react';

export const PostCard = ({ post }) => {
  const {
    currentUser,
    toggleLikePost,
    addComment,
    deleteComment,
    toggleSavePost,
    savedPostIds,
    navigateTo,
    deletePost,
    setSelectedPost,
    setConfirmDialog,
    addToast,
  } = useApp();

  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDoubleTapHeart, setShowDoubleTapHeart] = useState(false);
  const menuRef = useRef(null);
  const commentInputRef = useRef(null);

  const isLiked = post.likes && post.likes.includes(currentUser.username);
  const isSaved = savedPostIds.includes(post.id);
  const isOwnPost =
    post.author.username === currentUser.username || post.author.id === currentUser.id;

  // Handle double click/tap to like
  const handleMediaDoubleClick = () => {
    setShowDoubleTapHeart(true);
    if (!isLiked) {
      toggleLikePost(post.id);
    }
    setTimeout(() => {
      setShowDoubleTapHeart(false);
    }, 850);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
    setShowComments(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + `?post=${post.id}`);
    addToast('Post link copied to clipboard!', 'Share it with your friends', 'success');
  };

  const handleDeletePost = () => {
    setShowMenu(false);
    setConfirmDialog({
      title: 'Delete this post?',
      message: 'Are you sure you want to permanently delete this post? This action cannot be undone.',
      confirmText: 'Delete Post',
      isDanger: true,
      onConfirm: () => deletePost(post.id),
    });
  };

  const quickEmojis = ['❤️', '🔥', '👏', '✨', '😍'];

  return (
    <article
      className="ch-card"
      style={{
        marginBottom: 24,
        position: 'relative',
      }}
    >
      {/* Post Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          onClick={() => navigateTo('profile', post.author.username)}
        >
          <Avatar src={post.author.avatar} alt={post.author.name} size="sm" />
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontWeight: 700,
                fontSize: '0.92rem',
                color: 'var(--text-primary)',
              }}
            >
              <span>{post.author.name}</span>
              {post.author.verified && (
                <ShieldCheck size={15} color="var(--primary-blue)" />
              )}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
              }}
            >
              <span>@{post.author.username}</span>
              <span>•</span>
              <span>{post.createdAt}</span>
              {post.location && (
                <>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                    <MapPin size={11} /> {post.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Options Menu */}
        <div style={{ position: 'relative' }} ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              color: 'var(--text-muted)',
              padding: 6,
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
            }}
            aria-label="Post options"
          >
            <MoreHorizontal size={19} />
          </button>

          {showMenu && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '6px',
                zIndex: 40,
                minWidth: 160,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <button
                onClick={() => {
                  setShowMenu(false);
                  toggleSavePost(post.id);
                }}
                className="subtle-btn"
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.84rem' }}
              >
                <Bookmark size={15} color={isSaved ? 'var(--saved-color)' : 'currentColor'} />
                <span>{isSaved ? 'Remove from Saved' : 'Save Post'}</span>
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  handleShare();
                }}
                className="subtle-btn"
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.84rem' }}
              >
                <Copy size={15} />
                <span>Copy Link</span>
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  setSelectedPost(post);
                }}
                className="subtle-btn"
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.84rem' }}
              >
                <MessageCircle size={15} />
                <span>View Full Details</span>
              </button>

              {isOwnPost && (
                <>
                  <div
                    style={{
                      height: 1,
                      backgroundColor: 'var(--border-color)',
                      margin: '4px 0',
                    }}
                  />
                  <button
                    onClick={handleDeletePost}
                    className="subtle-btn"
                    style={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      fontSize: '0.84rem',
                      color: 'var(--like-color)',
                    }}
                  >
                    <Trash2 size={15} />
                    <span>Delete Post</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Post Text Content */}
      {post.content && (
        <div
          style={{
            padding: '0 16px 12px 16px',
            fontSize: '0.94rem',
            lineHeight: 1.55,
            color: 'var(--text-primary)',
            wordBreak: 'break-word',
          }}
        >
          {post.content}
        </div>
      )}

      {/* Post Tags */}
      {post.tags && post.tags.length > 0 && (
        <div
          style={{
            padding: '0 16px 12px 16px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
          }}
        >
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--primary-purple)',
                cursor: 'pointer',
              }}
              onClick={() => navigateTo('explore')}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Media Image with Double-Tap to Like */}
      {post.image && (
        <div
          style={{
            position: 'relative',
            backgroundColor: '#000000',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
          onDoubleClick={handleMediaDoubleClick}
        >
          <img
            src={post.image}
            alt="Post media"
            loading="lazy"
            style={{
              width: '100%',
              maxHeight: 560,
              objectFit: 'cover',
              display: 'block',
              transition: 'opacity 0.2s ease',
            }}
          />

          {/* Double-click Heart Animation */}
          {showDoubleTapHeart && (
            <div className="double-click-heart">
              <Heart size={96} fill="#ef4444" color="#ffffff" strokeWidth={1} />
            </div>
          )}
        </div>
      )}

      {/* Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px 8px 16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Like Button */}
          <button
            onClick={() => toggleLikePost(post.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: isLiked ? 'var(--like-color)' : 'var(--text-secondary)',
              transition: 'transform 0.15s ease',
            }}
            aria-label={isLiked ? 'Unlike post' : 'Like post'}
          >
            <Heart
              size={23}
              fill={isLiked ? 'var(--like-color)' : 'none'}
              className={isLiked ? 'animate-heart' : ''}
              strokeWidth={2.2}
            />
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
              {post.likes ? post.likes.length : 0}
            </span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => {
              setShowComments(!showComments);
              setTimeout(() => commentInputRef.current?.focus(), 100);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--text-secondary)',
            }}
            aria-label="Comment on post"
          >
            <MessageCircle size={22} strokeWidth={2.2} />
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>
              {post.comments ? post.comments.length : 0}
            </span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-secondary)',
            }}
            aria-label="Share post"
          >
            <Share2 size={21} strokeWidth={2.2} />
          </button>
        </div>

        {/* Save Bookmark Button */}
        <button
          onClick={() => toggleSavePost(post.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            color: isSaved ? 'var(--saved-color)' : 'var(--text-secondary)',
          }}
          aria-label={isSaved ? 'Unsave post' : 'Save post'}
        >
          <Bookmark
            size={23}
            fill={isSaved ? 'var(--saved-color)' : 'none'}
            strokeWidth={2.2}
          />
        </button>
      </div>

      {/* Likes Description */}
      {post.likes && post.likes.length > 0 && (
        <div
          style={{
            padding: '0 16px 6px 16px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
          }}
        >
          Liked by{' '}
          <strong
            style={{ color: 'var(--text-primary)', cursor: 'pointer' }}
            onClick={() => navigateTo('profile', post.likes[post.likes.length - 1])}
          >
            @{post.likes[post.likes.length - 1]}
          </strong>
          {post.likes.length > 1 && (
            <span>
              {' '}and{' '}
              <strong style={{ color: 'var(--text-primary)' }}>
                {post.likes.length - 1} {post.likes.length - 1 === 1 ? 'other' : 'others'}
              </strong>
            </span>
          )}
        </div>
      )}

      {/* View All Comments toggle */}
      {post.comments && post.comments.length > 0 && !showComments && (
        <div style={{ padding: '0 16px 8px 16px' }}>
          <button
            onClick={() => setShowComments(true)}
            style={{
              fontSize: '0.84rem',
              color: 'var(--text-muted)',
              fontWeight: 500,
            }}
          >
            View all {post.comments.length} comments
          </button>
        </div>
      )}

      {/* Expanded Comments List */}
      {showComments && post.comments && post.comments.length > 0 && (
        <div
          style={{
            padding: '8px 16px 12px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            borderTop: '1px solid var(--border-subtle)',
            marginTop: 4,
          }}
        >
          {post.comments.map((comment) => {
            const isMyComment = comment.author.username === currentUser.username;

            return (
              <div
                key={comment.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flex: 1 }}>
                  <Avatar src={comment.author.avatar} alt={comment.author.name} size="xs" />
                  <div style={{ fontSize: '0.86rem', lineHeight: 1.4 }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        marginRight: 6,
                      }}
                      onClick={() => navigateTo('profile', comment.author.username)}
                    >
                      {comment.author.username}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{comment.text}</span>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {comment.createdAt || 'Just now'}
                    </div>
                  </div>
                </div>

                {isMyComment && (
                  <button
                    onClick={() => deleteComment(post.id, comment.id)}
                    style={{
                      color: 'var(--text-muted)',
                      padding: 4,
                      opacity: 0.7,
                    }}
                    title="Delete your comment"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Inline Comment Input Box */}
      <form
        onSubmit={handleCommentSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 16px',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <Avatar src={currentUser.avatar} alt={currentUser.name} size="xs" />
        <input
          ref={commentInputRef}
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          style={{
            flex: 1,
            padding: '7px 12px',
            fontSize: '0.88rem',
            border: 'none',
            backgroundColor: 'transparent',
          }}
        />

        {/* Quick Emoji Picker Chips */}
        <div style={{ display: 'flex', gap: 4 }}>
          {quickEmojis.slice(0, 3).map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setCommentText((prev) => prev + emoji)}
              style={{
                fontSize: '0.9rem',
                padding: '2px 4px',
                borderRadius: 'var(--radius-xs)',
              }}
            >
              {emoji}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={!commentText.trim()}
          style={{
            color: commentText.trim() ? 'var(--primary-purple)' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: commentText.trim() ? 'pointer' : 'default',
            padding: '4px 6px',
          }}
        >
          Post
        </button>
      </form>
    </article>
  );
};
