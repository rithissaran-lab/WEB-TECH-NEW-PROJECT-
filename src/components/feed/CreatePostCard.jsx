import React from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { Image, Smile, MapPin, Sparkles } from 'lucide-react';

export const CreatePostCard = () => {
  const { currentUser, setIsCreateModalOpen } = useApp();

  return (
    <div
      className="ch-card"
      style={{
        padding: '16px 18px',
        marginBottom: 20,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
        <button
          onClick={() => setIsCreateModalOpen(true)}
          style={{
            flex: 1,
            backgroundColor: 'var(--bg-input)',
            borderRadius: 'var(--radius-full)',
            padding: '10px 18px',
            textAlign: 'left',
            color: 'var(--text-muted)',
            fontSize: '0.92rem',
            border: '1px solid var(--border-color)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
            e.currentTarget.style.borderColor = 'var(--primary-purple)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-input)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}
        >
          What's happening, {currentUser.name.split(' ')[0]}?
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-color)',
          paddingTop: 12,
        }}
      >
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="subtle-btn"
          style={{ fontSize: '0.84rem', gap: 8 }}
        >
          <Image size={18} color="#10b981" />
          <span>Photo</span>
        </button>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="subtle-btn"
          style={{ fontSize: '0.84rem', gap: 8 }}
        >
          <MapPin size={18} color="#ef4444" />
          <span>Location</span>
        </button>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="subtle-btn"
          style={{ fontSize: '0.84rem', gap: 8 }}
        >
          <Smile size={18} color="#f59e0b" />
          <span>Feeling</span>
        </button>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="gradient-btn"
          style={{ padding: '6px 14px', fontSize: '0.82rem' }}
        >
          <Sparkles size={14} />
          <span>Post</span>
        </button>
      </div>
    </div>
  );
};
