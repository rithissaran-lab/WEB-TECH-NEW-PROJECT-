import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StoriesBar } from '../components/feed/StoriesBar';
import { CreatePostCard } from '../components/feed/CreatePostCard';
import { PostCard } from '../components/feed/PostCard';
import { EmptyState } from '../components/common/EmptyState';
import { Sparkles, Users, Flame, CheckCircle2 } from 'lucide-react';

export const FeedPage = () => {
  const { posts, users, currentUser } = useApp();
  const [feedFilter, setFeedFilter] = useState('all'); // 'all', 'following', 'popular'

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (feedFilter === 'following') {
      const followedUsernames = users
        .filter((u) => u.isFollowing)
        .map((u) => u.username);
      return (
        followedUsernames.includes(post.author.username) ||
        post.author.username === currentUser.username
      );
    }
    if (feedFilter === 'popular') {
      return (post.likes && post.likes.length >= 3);
    }
    return true;
  });

  return (
    <div className="content-max-width">
      {/* Instagram Stories Carousel */}
      <StoriesBar />

      {/* Facebook Create Post Widget */}
      <CreatePostCard />

      {/* Feed Filter Chips */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 18,
          overflowX: 'auto',
          paddingBottom: 4,
        }}
      >
        <button
          onClick={() => setFeedFilter('all')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.84rem',
            fontWeight: 600,
            backgroundColor: feedFilter === 'all' ? 'var(--primary-purple)' : 'var(--bg-surface)',
            color: feedFilter === 'all' ? '#ffffff' : 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
          }}
        >
          <Sparkles size={14} />
          <span>All Posts</span>
        </button>

        <button
          onClick={() => setFeedFilter('following')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.84rem',
            fontWeight: 600,
            backgroundColor: feedFilter === 'following' ? 'var(--primary-purple)' : 'var(--bg-surface)',
            color: feedFilter === 'following' ? '#ffffff' : 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
          }}
        >
          <Users size={14} />
          <span>Following</span>
        </button>

        <button
          onClick={() => setFeedFilter('popular')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.84rem',
            fontWeight: 600,
            backgroundColor: feedFilter === 'popular' ? 'var(--primary-purple)' : 'var(--bg-surface)',
            color: feedFilter === 'popular' ? '#ffffff' : 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
          }}
        >
          <Flame size={14} />
          <span>Trending & Popular</span>
        </button>
      </div>

      {/* Post List */}
      {filteredPosts.length > 0 ? (
        <div>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {/* All Caught Up Card */}
          <div
            style={{
              padding: '28px 16px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.12)',
                color: 'var(--success-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px auto',
              }}
            >
              <CheckCircle2 size={24} />
            </div>
            <h4 style={{ fontSize: '1rem', marginBottom: 4 }}>You're all caught up!</h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              You've seen all new posts from the community.
            </p>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No posts found"
          description="Follow more creators or switch back to the 'All Posts' tab to discover community posts."
          actionLabel="Show All Posts"
          onAction={() => setFeedFilter('all')}
        />
      )}
    </div>
  );
};
