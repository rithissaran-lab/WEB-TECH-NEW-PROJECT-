import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { X, ChevronLeft, ChevronRight, Heart, Send } from 'lucide-react';

export const StoryViewerModal = () => {
  const {
    selectedStory,
    setSelectedStory,
    stories,
    addToast,
    navigateTo,
  } = useApp();

  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [floatingReaction, setFloatingReaction] = useState(null);

  const durationMs = 4500;
  const intervalMs = 50;

  // Reset slide index when selectedStory changes
  useEffect(() => {
    setSlideIndex(0);
    setProgress(0);
  }, [selectedStory]);

  // Story Timer
  useEffect(() => {
    if (!selectedStory) return;

    const currentSlides = selectedStory.stories || [];
    if (currentSlides.length === 0) return;

    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const step = (intervalMs / durationMs) * 100;
        if (prev + step >= 100) {
          // Go to next slide
          if (slideIndex < currentSlides.length - 1) {
            setSlideIndex((s) => s + 1);
            return 0;
          } else {
            // Next user story
            const currentIndex = stories.findIndex((s) => s.id === selectedStory.id);
            if (currentIndex < stories.length - 1) {
              setSelectedStory(stories[currentIndex + 1]);
              setSlideIndex(0);
              return 0;
            } else {
              setSelectedStory(null);
              return 0;
            }
          }
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [selectedStory, slideIndex, isPaused, stories, setSelectedStory]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedStory) return;
      if (e.key === 'Escape') setSelectedStory(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!selectedStory) return null;

  const currentSlides = selectedStory.stories || [];
  const activeSlide = currentSlides[slideIndex] || currentSlides[0];
  const author = selectedStory.author;

  const handleNext = () => {
    if (slideIndex < currentSlides.length - 1) {
      setSlideIndex((s) => s + 1);
      setProgress(0);
    } else {
      const currentIndex = stories.findIndex((s) => s.id === selectedStory.id);
      if (currentIndex < stories.length - 1) {
        setSelectedStory(stories[currentIndex + 1]);
        setSlideIndex(0);
        setProgress(0);
      } else {
        setSelectedStory(null);
      }
    }
  };

  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex((s) => s - 1);
      setProgress(0);
    } else {
      const currentIndex = stories.findIndex((s) => s.id === selectedStory.id);
      if (currentIndex > 0) {
        setSelectedStory(stories[currentIndex - 1]);
        setSlideIndex(0);
        setProgress(0);
      }
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addToast(`Reply sent to @${author.username}`, replyText, 'success');
    setReplyText('');
  };

  const handleReaction = (emoji) => {
    setFloatingReaction(emoji);
    addToast(`Sent ${emoji} to @${author.username}`, '', 'success');
    setTimeout(() => setFloatingReaction(null), 1200);
  };

  return (
    <div
      className="modal-overlay"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.92)' }}
      onClick={() => setSelectedStory(null)}
    >
      {/* Story Container Card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 420,
          height: '92vh',
          maxHeight: 780,
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          backgroundColor: '#111827',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Progress Bars */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            right: 12,
            display: 'flex',
            gap: 4,
            zIndex: 30,
          }}
        >
          {currentSlides.map((_, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                height: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.35)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  backgroundColor: '#ffffff',
                  width:
                    idx < slideIndex
                      ? '100%'
                      : idx === slideIndex
                      ? `${progress}%`
                      : '0%',
                  transition: idx === slideIndex ? 'width 0.05s linear' : 'none',
                }}
              />
            </div>
          ))}
        </div>

        {/* Top Story Header */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 14,
            right: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 30,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              background: 'rgba(0,0,0,0.4)',
              padding: '4px 10px 4px 4px',
              borderRadius: 'var(--radius-full)',
              backdropFilter: 'blur(8px)',
            }}
            onClick={() => {
              setSelectedStory(null);
              navigateTo('profile', author.username);
            }}
          >
            <Avatar src={author.avatar} alt={author.name} size="xs" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                }}
              >
                {author.username}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.74rem' }}>
                {activeSlide?.timeAgo || '3h ago'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setSelectedStory(null)}
            style={{
              color: '#ffffff',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Left & Right Tap Touch Navigation Areas */}
        <div
          onClick={handlePrev}
          style={{
            position: 'absolute',
            top: 60,
            bottom: 80,
            left: 0,
            width: '35%',
            zIndex: 20,
            cursor: 'pointer',
          }}
        />
        <div
          onClick={handleNext}
          style={{
            position: 'absolute',
            top: 60,
            bottom: 80,
            right: 0,
            width: '65%',
            zIndex: 20,
            cursor: 'pointer',
          }}
        />

        {/* Story Media Background */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {activeSlide?.image && (
            <img
              src={activeSlide.image}
              alt="Story slide"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          )}

          {/* Caption Overlay */}
          {activeSlide?.caption && (
            <div
              style={{
                position: 'absolute',
                bottom: 80,
                left: 14,
                right: 14,
                backgroundColor: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                color: '#ffffff',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                lineHeight: 1.4,
                zIndex: 25,
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {activeSlide.caption}
            </div>
          )}

          {/* Floating Emoji Particle */}
          {floatingReaction && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '4.5rem',
                zIndex: 35,
                animation: 'doubleClickPop 0.8s ease forwards',
              }}
            >
              {floatingReaction}
            </div>
          )}
        </div>

        {/* Bottom Reply & Reaction Controls */}
        <div
          style={{
            padding: '10px 14px 14px 14px',
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            zIndex: 30,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {/* Reaction Emojis */}
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {['❤️', '🔥', '👏', '😂', '😍'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                style={{
                  fontSize: '1.25rem',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                }}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendReply} style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Send message to ${author.name.split(' ')[0]}...`}
              style={{
                flex: 1,
                padding: '9px 14px',
                fontSize: '0.86rem',
                backgroundColor: 'rgba(255,255,255,0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 'var(--radius-full)',
              }}
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              style={{
                color: replyText.trim() ? '#ffffff' : 'rgba(255,255,255,0.4)',
                backgroundColor: replyText.trim() ? 'var(--primary-purple)' : 'transparent',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
