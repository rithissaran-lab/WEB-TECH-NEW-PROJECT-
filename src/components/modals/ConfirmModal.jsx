import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, HelpCircle } from 'lucide-react';

export const ConfirmModal = () => {
  const { confirmDialog, setConfirmDialog } = useApp();

  if (!confirmDialog) return null;

  const handleConfirm = () => {
    if (confirmDialog.onConfirm) {
      confirmDialog.onConfirm();
    }
    setConfirmDialog(null);
  };

  const handleCancel = () => {
    setConfirmDialog(null);
  };

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div
        className="modal-card"
        style={{ maxWidth: 440, padding: '24px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: confirmDialog.isDanger ? 'rgba(239, 68, 68, 0.12)' : 'rgba(59, 130, 246, 0.12)',
              color: confirmDialog.isDanger ? 'var(--like-color)' : 'var(--primary-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {confirmDialog.isDanger ? <AlertTriangle size={24} /> : <HelpCircle size={24} />}
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 6 }}>
              {confirmDialog.title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {confirmDialog.message}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
          <button onClick={handleCancel} className="outline-btn" style={{ fontSize: '0.88rem' }}>
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            style={{
              backgroundColor: confirmDialog.isDanger ? 'var(--like-color)' : 'var(--primary-purple)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.88rem',
              padding: '9px 18px',
              borderRadius: 'var(--radius-md)',
            }}
          >
            {confirmDialog.confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};
