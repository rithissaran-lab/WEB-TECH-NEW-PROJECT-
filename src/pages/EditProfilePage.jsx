import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { PRESET_AVATARS } from '../data/initialData';
import {
  Sliders,
  Check,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';

export const EditProfilePage = () => {
  const {
    currentUser,
    updateProfile,
    navigateTo,
    resetDemoData,
    setConfirmDialog,
  } = useApp();

  const [name, setName] = useState(currentUser.name || '');
  const [username, setUsername] = useState(currentUser.username || '');
  const [title, setTitle] = useState(currentUser.title || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [website, setWebsite] = useState(currentUser.website || '');
  const [location, setLocation] = useState(currentUser.location || '');
  const [avatar, setAvatar] = useState(currentUser.avatar || '');
  const [coverPhoto, setCoverPhoto] = useState(currentUser.coverPhoto || '');

  const coverPresets = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=400&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&h=400&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&h=400&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&h=400&q=80',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      username: username.trim().toLowerCase().replace(/\s+/g, '_'),
      title: title.trim(),
      bio: bio.trim(),
      website: website.trim(),
      location: location.trim(),
      avatar: avatar.trim(),
      coverPhoto: coverPhoto.trim(),
    });
  };

  const handleResetDataClick = () => {
    setConfirmDialog({
      title: 'Reset Demo Data to Initial State?',
      message:
        'This will clear changes you have made and restore all sample posts, comments, likes, and profile settings to factory demo defaults.',
      confirmText: 'Reset Everything',
      isDanger: true,
      onConfirm: () => resetDemoData(),
    });
  };

  return (
    <div className="content-max-width">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigateTo('profile', currentUser.username)}
            className="outline-btn"
            style={{ padding: '8px 12px' }}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Edit Profile</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
              Update your public identity, bio, and avatar.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Avatar & Cover Section */}
        <div className="ch-card" style={{ padding: '24px', marginBottom: 20 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 16 }}>
            Profile & Cover Imagery
          </h3>

          {/* Current Avatar Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
            <Avatar src={avatar} alt={name} size="xl" />
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                }}
              >
                Avatar URL
              </label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="Paste avatar URL..."
                style={{ width: '100%', padding: '9px 12px', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          {/* Preset Avatars */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Or pick a preset avatar:
            </div>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
              {PRESET_AVATARS.map((pAvatar, idx) => (
                <div
                  key={idx}
                  onClick={() => setAvatar(pAvatar)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '50%',
                    padding: 3,
                    border:
                      avatar === pAvatar
                        ? '3px solid var(--primary-purple)'
                        : '2px solid transparent',
                  }}
                >
                  <Avatar src={pAvatar} alt={`Preset ${idx}`} size="md" />
                </div>
              ))}
            </div>
          </div>

          {/* Cover Photo */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 6,
              }}
            >
              Cover Photo URL
            </label>
            <input
              type="url"
              value={coverPhoto}
              onChange={(e) => setCoverPhoto(e.target.value)}
              placeholder="Paste banner image URL..."
              style={{ width: '100%', padding: '9px 12px', fontSize: '0.88rem', marginBottom: 10 }}
            />

            <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
              {coverPresets.map((cPreset, idx) => (
                <div
                  key={idx}
                  onClick={() => setCoverPhoto(cPreset)}
                  style={{
                    height: 48,
                    width: 80,
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border:
                      coverPhoto === cPreset
                        ? '2px solid var(--primary-purple)'
                        : '1px solid var(--border-color)',
                  }}
                >
                  <img
                    src={cPreset}
                    alt={`Cover ${idx}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Basic Info Card */}
        <div className="ch-card" style={{ padding: '24px', marginBottom: 20 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 16 }}>
            Basic Information
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', fontSize: '0.9rem' }}
              />
            </div>
          </div>

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
              Headline / Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Product Designer, Architect, Indie Creator"
              style={{ width: '100%', padding: '10px 12px', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 6,
              }}
            >
              <label
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                }}
              >
                Bio
              </label>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                {bio.length}/160
              </span>
            </div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={160}
              rows={3}
              style={{ width: '100%', padding: '10px 12px', fontSize: '0.9rem', resize: 'none' }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                }}
              >
                Website
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://..."
                style={{ width: '100%', padding: '10px 12px', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: 6,
                }}
              >
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
                style={{ width: '100%', padding: '10px 12px', fontSize: '0.9rem' }}
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 32,
          }}
        >
          <button
            type="button"
            onClick={handleResetDataClick}
            className="subtle-btn"
            style={{ color: '#eab308', fontSize: '0.86rem' }}
          >
            <RotateCcw size={16} />
            <span>Reset Demo Data</span>
          </button>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="button"
              onClick={() => navigateTo('profile', currentUser.username)}
              className="outline-btn"
              style={{ fontSize: '0.9rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="gradient-btn"
              style={{ fontSize: '0.9rem' }}
            >
              <Check size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
