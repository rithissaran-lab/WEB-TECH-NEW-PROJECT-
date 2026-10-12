import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { PRESET_POST_IMAGES } from '../../data/initialData';
import {
  X,
  Image,
  MapPin,
  Tag,
  Smile,
  Sparkles,
  Upload,
  Eye,
  Check,
} from 'lucide-react';

export const CreatePostModal = () => {
  const {
    isCreateModalOpen,
    setIsCreateModalOpen,
    currentUser,
    createPost,
  } = useApp();

  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('Design');
  const [showPresetPicker, setShowPresetPicker] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  if (!isCreateModalOpen) return null;

  const handleClose = () => {
    setIsCreateModalOpen(false);
    setContent('');
    setImageUrl('');
    setLocation('');
    setTags('');
    setShowPresetPicker(false);
    setShowPreview(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !imageUrl.trim()) return;

    createPost({
      content,
      image: imageUrl.trim() || null,
      location: location.trim(),
      tags: tags.trim(),
      category,
    });

    handleClose();
  };

  const locationPresets = ['San Francisco', 'Tokyo', 'Berlin', 'New York', 'London', 'Kyoto'];
  const emojis = ['✨', '🔥', '🚀', '📸', '🎨', '💻', '💡', '🌟'];

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-card"
        style={{ maxWidth: 580 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '8px',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <Sparkles size={16} />
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Create New Post</h2>
          </div>
          <button
            onClick={handleClose}
            style={{
              color: 'var(--text-muted)',
              padding: 4,
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '18px 20px' }}>
          {/* User Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{currentUser.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Posting to Public Feed • @{currentUser.username}
              </div>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What would you like to share today? Add your thoughts, stories or project updates..."
            rows={4}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              resize: 'none',
              marginBottom: 12,
            }}
            autoFocus
          />

          {/* Quick Emojis */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Quick emoji:</span>
            {emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setContent((prev) => prev + ' ' + emoji)}
                style={{
                  fontSize: '1rem',
                  padding: '2px 4px',
                  borderRadius: 'var(--radius-xs)',
                }}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Image Selector & Presets */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 6,
              }}
            >
              Attach Image
            </label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste an image URL (Unsplash or direct image link)..."
                style={{ flex: 1, padding: '9px 12px', fontSize: '0.88rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPresetPicker(!showPresetPicker)}
                className="outline-btn"
                style={{ padding: '8px 12px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
              >
                <Image size={15} />
                <span>Presets</span>
              </button>
              <label
                className="outline-btn"
                style={{
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  margin: 0,
                }}
              >
                <Upload size={15} />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {/* Presets Grid */}
            {showPresetPicker && (
              <div
                style={{
                  backgroundColor: 'var(--bg-input)',
                  padding: 10,
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 10,
                  border: '1px solid var(--border-color)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    marginBottom: 8,
                  }}
                >
                  Click any high-resolution preset photo:
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 8,
                  }}
                >
                  {PRESET_POST_IMAGES.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setImageUrl(preset.url);
                        setShowPresetPicker(false);
                      }}
                      style={{
                        position: 'relative',
                        height: 72,
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border:
                          imageUrl === preset.url
                            ? '2px solid var(--primary-purple)'
                            : '1px solid var(--border-color)',
                      }}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'rgba(0,0,0,0.65)',
                          color: '#ffffff',
                          fontSize: '0.66rem',
                          padding: '2px 4px',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {preset.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Image Preview */}
            {imageUrl && (
              <div
                style={{
                  position: 'relative',
                  maxHeight: 220,
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  marginTop: 6,
                }}
              >
                <img
                  src={imageUrl}
                  alt="Selected preview"
                  style={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'rgba(0,0,0,0.7)',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: 26,
                    height: 26,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Location & Tags & Category */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: 4,
                }}
              >
                <MapPin size={13} /> Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                style={{ width: '100%', padding: '8px 10px', fontSize: '0.86rem' }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: 4,
                }}
              >
                <Tag size={13} /> Hashtags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="#webdev #design #connect"
                style={{ width: '100%', padding: '8px 10px', fontSize: '0.86rem' }}
              />
            </div>
          </div>

          {/* Location preset tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {locationPresets.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setLocation(loc)}
                style={{
                  fontSize: '0.74rem',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: location === loc ? 'var(--primary-purple)' : 'var(--bg-input)',
                  color: location === loc ? '#ffffff' : 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Action Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 12,
              borderTop: '1px solid var(--border-color)',
              paddingTop: 16,
            }}
          >
            <button
              type="button"
              onClick={handleClose}
              className="outline-btn"
              style={{ fontSize: '0.9rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!content.trim() && !imageUrl.trim()}
              className="gradient-btn"
              style={{
                fontSize: '0.9rem',
                opacity: !content.trim() && !imageUrl.trim() ? 0.6 : 1,
              }}
            >
              <Sparkles size={16} />
              <span>Publish Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
