import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export const StoriesBar = () => {
  const { stories, setSelectedStory } = useApp();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -220 : 220;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="ch-card"
      style={{
        padding: '16px 14px',
        marginBottom: 20,
        position: 'relative',
      }}
    >
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll('left')}
        style={{
          position: 'absolute',
          left: 6,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
          zIndex: 10,
          color: 'var(--text-secondary)',
        }}
        aria-label="Scroll stories left"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Stories Track */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          padding: '2px 8px',
        }}
      >
        {stories.map((storyItem) => {
          const isUser = storyItem.isUser;
          const author = storyItem.author;

          return (
            <div
              key={storyItem.id}
              onClick={() => setSelectedStory(storyItem)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                flexShrink: 0,
                width: 72,
              }}
            >
              <div style={{ position: 'relative' }}>
                <Avatar
                  src={author.avatar}
                  alt={author.name}
                  size="lg"
                  hasStoryRing={true}
                  isStorySeen={!storyItem.hasUnseen}
                />
                {isUser && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'var(--primary-gradient)',
                      border: '2px solid var(--bg-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                    }}
                  >
                    <Plus size={14} strokeWidth={3} />
                  </div>
                )}
              </div>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 68,
                }}
              >
                {isUser ? 'Your story' : author.username}
              </span>
            </div>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll('right')}
        style={{
          position: 'absolute',
          right: 6,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
          zIndex: 10,
          color: 'var(--text-secondary)',
        }}
        aria-label="Scroll stories right"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
