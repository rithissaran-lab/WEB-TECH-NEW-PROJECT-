import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRENT_DEMO_USER, SAMPLE_USERS, PRESET_AVATARS } from '../data/initialData';
import { Avatar } from '../components/common/Avatar';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Shield,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';

export const AuthPage = () => {
  const { login, signup } = useApp();
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('alexrivera');
  const [loginPassword, setLoginPassword] = useState('demo1234');

  // Sign up form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpBio, setSignUpBio] = useState('');
  const [signUpAvatar, setSignUpAvatar] = useState(PRESET_AVATARS[0]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Match against sample users or default to CURRENT_DEMO_USER
    const matchedUser =
      SAMPLE_USERS.find(
        (u) =>
          u.username.toLowerCase() === loginIdentifier.toLowerCase() ||
          u.name.toLowerCase() === loginIdentifier.toLowerCase()
      ) || CURRENT_DEMO_USER;

    login(matchedUser);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    signup({
      name: signUpName.trim() || 'ConnectHub User',
      username: signUpUsername.trim() || 'creator_' + Math.floor(Math.random() * 1000),
      email: signUpEmail.trim(),
      avatar: signUpAvatar,
      bio: signUpBio.trim(),
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'var(--bg-app)',
      }}
    >
      <div
        className="ch-card"
        style={{
          width: '100%',
          maxWidth: 960,
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          minHeight: 580,
        }}
      >
        {/* Left Visual Branding Panel (hidden on small mobile) */}
        <div
          style={{
            flex: 1,
            background: 'var(--primary-gradient)',
            color: '#ffffff',
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Glow Circle */}
          <div
            style={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 240,
              height: 240,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              filter: 'blur(40px)',
            }}
          />

          {/* Top Brand */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(8px)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                marginBottom: 24,
                fontSize: '0.82rem',
                fontWeight: 600,
              }}
            >
              <Sparkles size={16} />
              <span>Web Technology Demonstration</span>
            </div>

            <h1
              style={{
                fontSize: '2.4rem',
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: 14,
              }}
            >
              ConnectHub
            </h1>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: 360,
              }}
            >
              Where moments turn into connections. Explore stories, discover creators, and share
              high-resolution photographs with dynamic social interactions.
            </p>
          </div>

          {/* Feature Highlights */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              margin: '28px 0',
            }}
          >
            {[
              'Instagram-style stories & responsive explore grid',
              'Instant likes, double-tap hearts & threaded comments',
              'Follow & unfollow with dynamic follower count sync',
              'Complete client-side localStorage state persistence',
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: '0.86rem',
                  color: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                <CheckCircle2 size={16} color="#ffffff" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Bottom Academic Project Disclaimer */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(8px)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.78rem',
              lineHeight: 1.45,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <Shield size={14} />
              <strong>Demo-Only Simulation</strong>
            </div>
            <span>
              All data is stored exclusively in your browser's localStorage. No credentials are transmitted to any server.
            </span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div
          style={{
            flex: 1,
            padding: '40px 36px',
            backgroundColor: 'var(--bg-surface)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Form Switcher Tabs */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              padding: 4,
              marginBottom: 24,
            }}
          >
            <button
              onClick={() => setAuthMode('login')}
              style={{
                flex: 1,
                padding: '9px 0',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.88rem',
                backgroundColor: authMode === 'login' ? 'var(--bg-surface)' : 'transparent',
                color: authMode === 'login' ? 'var(--primary-purple)' : 'var(--text-muted)',
                boxShadow: authMode === 'login' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              style={{
                flex: 1,
                padding: '9px 0',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.88rem',
                backgroundColor: authMode === 'signup' ? 'var(--bg-surface)' : 'transparent',
                color: authMode === 'signup' ? 'var(--primary-purple)' : 'var(--text-muted)',
                boxShadow: authMode === 'signup' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              Create Account
            </button>
          </div>

          {authMode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: 18 }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 6 }}>
                  Welcome Back!
                </h2>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                  Enter your username or click any instant demo account below.
                </p>
              </div>

              {/* 1-Click Fast Demo Accounts */}
              <div style={{ marginBottom: 18 }}>
                <div
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--text-muted)',
                    marginBottom: 8,
                  }}
                >
                  Quick 1-Click Demo Profiles:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    { user: CURRENT_DEMO_USER, role: 'Senior Designer' },
                    { user: SAMPLE_USERS[0], role: 'Architectural Photographer' },
                    { user: SAMPLE_USERS[1], role: 'Full Stack Engineer' },
                  ].map(({ user, role }) => (
                    <div
                      key={user.id}
                      onClick={() => login(user)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-input)',
                        cursor: 'pointer',
                        border: '1px solid var(--border-color)',
                        transition: 'all 0.15s ease',
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar src={user.avatar} alt={user.name} size="xs" />
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700 }}>{user.name}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                            @{user.username} • {role}
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          color: 'var(--primary-purple)',
                          fontWeight: 600,
                        }}
                      >
                        Log In →
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Fields */}
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: 4,
                  }}
                >
                  Username or Email
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <User
                    size={16}
                    style={{ position: 'absolute', left: 12, color: 'var(--text-muted)' }}
                  />
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px 12px 10px 38px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    marginBottom: 4,
                  }}
                >
                  Password (Demo)
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock
                    size={16}
                    style={{ position: 'absolute', left: 12, color: 'var(--text-muted)' }}
                  />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px 12px 10px 38px', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="gradient-btn"
                style={{ width: '100%', padding: '12px 0', fontSize: '0.94rem' }}
              >
                <span>Enter ConnectHub Feed</span>
                <ArrowRight size={17} />
              </button>
            </form>
          ) : (
            /* Sign Up Form */
            <form onSubmit={handleSignUpSubmit}>
              <div style={{ marginBottom: 14 }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>
                  Join ConnectHub
                </h2>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  Create your demo profile in seconds.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4 }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="Jordan Lee"
                    required
                    style={{ width: '100%', padding: '8px 10px', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4 }}>
                    Username
                  </label>
                  <input
                    type="text"
                    value={signUpUsername}
                    onChange={(e) => setSignUpUsername(e.target.value)}
                    placeholder="jordan_lee"
                    required
                    style={{ width: '100%', padding: '8px 10px', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="jordan@example.com"
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4 }}>
                  Short Bio
                </label>
                <input
                  type="text"
                  value={signUpBio}
                  onChange={(e) => setSignUpBio(e.target.value)}
                  placeholder="Tell the community a little bit about yourself..."
                  style={{ width: '100%', padding: '8px 10px', fontSize: '0.88rem' }}
                />
              </div>

              {/* Avatar Selector */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 6 }}>
                  Choose Avatar
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {PRESET_AVATARS.slice(0, 5).map((av, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSignUpAvatar(av)}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '50%',
                        padding: 2,
                        border:
                          signUpAvatar === av
                            ? '2px solid var(--primary-purple)'
                            : '2px solid transparent',
                      }}
                    >
                      <Avatar src={av} alt="Avatar option" size="xs" />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="gradient-btn"
                style={{ width: '100%', padding: '11px 0', fontSize: '0.92rem' }}
              >
                <span>Create Account & Log In</span>
                <ArrowRight size={17} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
