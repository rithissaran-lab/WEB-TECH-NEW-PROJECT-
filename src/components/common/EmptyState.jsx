import React from 'react';

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '48px 24px',
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed var(--border-color)',
        margin: '16px 0',
      }}
    >
      {Icon && (
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: 'var(--bg-input)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-purple)',
            marginBottom: 16,
          }}
        >
          <Icon size={30} />
        </div>
      )}
      <h3 style={{ fontSize: '1.15rem', marginBottom: 8, color: 'var(--text-primary)' }}>
        {title}
      </h3>
      {description && (
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            maxWidth: 380,
            marginBottom: actionLabel ? 20 : 0,
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button onClick={onAction} className="gradient-btn" style={{ fontSize: '0.88rem' }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};
