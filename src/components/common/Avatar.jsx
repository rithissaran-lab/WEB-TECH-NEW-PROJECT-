import React, { useState } from 'react';

export const Avatar = ({
  src,
  alt = 'User Avatar',
  size = 'md',
  hasStoryRing = false,
  isStorySeen = false,
  showOnline = false,
  onClick = null,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizePixels = {
    xs: 28,
    sm: 36,
    md: 44,
    lg: 56,
    xl: 88,
    xxl: 120,
  }[size] || 44;

  const fallbackInitial = alt ? alt.charAt(0).toUpperCase() : 'U';

  const content = (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        width: sizePixels,
        height: sizePixels,
        flexShrink: 0,
      }}
      className={className}
      onClick={onClick}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#8b5cf6',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: sizePixels * 0.4,
          border: '2px solid var(--bg-surface)',
          cursor: onClick ? 'pointer' : 'default',
        }}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <span>{fallbackInitial}</span>
        )}
      </div>

      {showOnline && (
        <span
          style={{
            position: 'absolute',
            bottom: 1,
            right: 1,
            width: Math.max(8, sizePixels * 0.22),
            height: Math.max(8, sizePixels * 0.22),
            borderRadius: '50%',
            backgroundColor: '#10b981',
            border: '2px solid var(--bg-surface)',
          }}
          title="Active now"
        />
      )}
    </div>
  );

  if (hasStoryRing) {
    return (
      <div
        className={`story-ring ${isStorySeen ? 'seen' : ''}`}
        style={{ cursor: onClick ? 'pointer' : 'default', display: 'inline-flex' }}
        onClick={onClick}
      >
        {content}
      </div>
    );
  }

  return content;
};
