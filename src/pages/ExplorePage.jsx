import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EmptyState } from '../components/common/EmptyState';
import {
  Compass,
  Heart,
  MessageCircle,
  Search,
  Sparkles,
} from 'lucide-react';

export const ExplorePage = () => {
  const { posts, setSelectedPost } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Architecture', 'Tech', 'Travel', 'Design', 'Food'];

  // Filter posts with images for the visual explore grid
  const explorePosts = posts
    .filter((post) => Boolean(post.image))
    .filter((post) => {
      if (selectedCategory === 'All') return true;
      return (
        post.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        post.tags?.some((t) => t.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    })
    .filter((post) => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        post.content?.toLowerCase().includes(term) ||
        post.author?.name?.toLowerCase().includes(term) ||
        post.tags?.some((t) => t.toLowerCase().includes(term))
      );
    });

  return (
    <div className="explore-max-width">
      {/* Header & Search */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Explore ConnectHub</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Discover inspiring photography, architectural designs, travel reels & ideas.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: 14,
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tags, topics, creators..."
            style={{
              width: '100%',
              padding: '11px 14px 11px 42px',
              fontSize: '0.92rem',
              backgroundColor: 'var(--bg-surface)',
            }}
          />
        </div>

        {/* Categories Bar */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 4,
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '7px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.84rem',
                fontWeight: 600,
                backgroundColor:
                  selectedCategory === cat ? 'var(--primary-purple)' : 'var(--bg-surface)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {explorePosts.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {explorePosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                aspectRatio: '1 / 1',
                backgroundColor: 'var(--bg-input)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
              }}
              onMouseEnter={(e) => {
                const overlay = e.currentTarget.querySelector('.explore-overlay');
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const overlay = e.currentTarget.querySelector('.explore-overlay');
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              <img
                src={post.image}
                alt="Explore post thumbnail"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Hover Dark Overlay */}
              <div
                className="explore-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.55)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 16,
                  opacity: 0,
                  transition: 'opacity 0.2s ease',
                  color: '#ffffff',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                  @{post.author.username}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 20,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
                    <Heart size={20} fill="#ffffff" color="#ffffff" />
                    <span>{post.likes ? post.likes.length : 0}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
                    <MessageCircle size={20} fill="#ffffff" color="#ffffff" />
                    <span>{post.comments ? post.comments.length : 0}</span>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '0.78rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    opacity: 0.9,
                  }}
                >
                  {post.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Compass}
          title="No explore posts matched"
          description="Try selecting a different category or clearing the search query to see more photos and reels."
          actionLabel="Show All Categories"
          onAction={() => {
            setSelectedCategory('All');
            setSearchTerm('');
          }}
        />
      )}
    </div>
  );
};
