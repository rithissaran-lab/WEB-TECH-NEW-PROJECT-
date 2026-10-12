import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CURRENT_DEMO_USER,
  SAMPLE_USERS,
  INITIAL_POSTS,
  INITIAL_STORIES,
  INITIAL_SAVED_POST_IDS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  CURRENT_USER: 'connecthub_current_user',
  POSTS: 'connecthub_posts',
  USERS: 'connecthub_users',
  STORIES: 'connecthub_stories',
  SAVED_POST_IDS: 'connecthub_saved_post_ids',
  NOTIFICATIONS: 'connecthub_notifications',
  THEME: 'connecthub_theme',
  AUTH: 'connecthub_auth_session',
};

// Helper for safe JSON localStorage reading
const getStoredItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.warn(`Failed reading ${key} from localStorage:`, err);
    return fallback;
  }
};

const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed writing ${key} to localStorage:`, err);
  }
};

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    } catch {
      return 'light';
    }
  });

  // Auth & Session
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return getStoredItem(STORAGE_KEYS.AUTH, true);
  });

  // Current User
  const [currentUser, setCurrentUser] = useState(() => {
    return getStoredItem(STORAGE_KEYS.CURRENT_USER, CURRENT_DEMO_USER);
  });

  // Sample Users
  const [users, setUsers] = useState(() => {
    return getStoredItem(STORAGE_KEYS.USERS, SAMPLE_USERS);
  });

  // Posts Feed
  const [posts, setPosts] = useState(() => {
    return getStoredItem(STORAGE_KEYS.POSTS, INITIAL_POSTS);
  });

  // Stories
  const [stories, setStories] = useState(() => {
    return getStoredItem(STORAGE_KEYS.STORIES, INITIAL_STORIES);
  });

  // Saved Post IDs
  const [savedPostIds, setSavedPostIds] = useState(() => {
    return getStoredItem(STORAGE_KEYS.SAVED_POST_IDS, INITIAL_SAVED_POST_IDS);
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    return getStoredItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  });

  // Navigation & View States
  // Pages: 'feed', 'explore', 'search', 'notifications', 'create', 'profile', 'edit-profile', 'saved', 'auth'
  const [activePage, setActivePage] = useState('feed');
  const [selectedUsername, setSelectedUsername] = useState(CURRENT_DEMO_USER.username);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Overlays
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null); // { title, message, confirmText, isDanger, onConfirm }
  const [toasts, setToasts] = useState([]);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.warn(e);
    }
  }, [theme]);

  // Sync to localStorage
  useEffect(() => {
    setStoredItem(STORAGE_KEYS.CURRENT_USER, currentUser);
  }, [currentUser]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.POSTS, posts);
  }, [posts]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.USERS, users);
  }, [users]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.STORIES, stories);
  }, [stories]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.SAVED_POST_IDS, savedPostIds);
  }, [savedPostIds]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }, [notifications]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.AUTH, isLoggedIn);
  }, [isLoggedIn]);

  // Toast System
  const addToast = (title, message = '', type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    addToast(theme === 'light' ? 'Dark Mode Activated' : 'Light Mode Activated', '', 'info');
  };

  // Navigation
  const navigateTo = (page, param = null) => {
    if (page === 'profile') {
      if (param) {
        setSelectedUsername(param);
      } else {
        setSelectedUsername(currentUser.username);
      }
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Operations (Demo)
  const login = (demoUser = null) => {
    const targetUser = demoUser || CURRENT_DEMO_USER;
    setCurrentUser(targetUser);
    setIsLoggedIn(true);
    setActivePage('feed');
    addToast(`Welcome back, ${targetUser.name}!`, 'Logged in as demo user', 'success');
  };

  const signup = ({ name, username, email, avatar, bio }) => {
    const newUser = {
      id: 'usr_' + Date.now(),
      username: username.toLowerCase().replace(/\s+/g, '_') || 'newuser',
      name: name || 'ConnectHub Explorer',
      title: 'Digital Creator',
      avatar:
        avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
      coverPhoto:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=400&q=80',
      bio: bio || 'Excited to be on ConnectHub! 🚀 Sharing memories and discovering great work.',
      website: 'https://connecthub.demo',
      location: 'Earth',
      joinedDate: 'Joined Today',
      followersCount: 0,
      followingCount: 3,
      postsCount: 0,
      verified: false,
    };
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setActivePage('feed');
    addToast('Account created successfully!', `Welcome to ConnectHub, ${newUser.name}!`, 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setActivePage('auth');
    addToast('Logged out of demo session', 'See you next time!', 'info');
  };

  // Post Actions
  const createPost = ({ content, image, location, tags, category = 'General' }) => {
    const parsedTags = Array.isArray(tags)
      ? tags
      : (tags || '')
          .split(' ')
          .filter((t) => t.trim().length > 0)
          .map((t) => (t.startsWith('#') ? t : `#${t}`));

    const newPost = {
      id: 'post_' + Date.now(),
      author: {
        id: currentUser.id,
        username: currentUser.username,
        name: currentUser.name,
        avatar: currentUser.avatar,
        verified: currentUser.verified,
      },
      content: content.trim(),
      image: image || null,
      location: location || '',
      createdAt: 'Just now',
      timestamp: Date.now(),
      tags: parsedTags.length > 0 ? parsedTags : ['#connecthub'],
      likes: [],
      comments: [],
      category: category || 'General',
    };

    setPosts((prev) => [newPost, ...prev]);

    // Update current user post count
    setCurrentUser((prev) => ({
      ...prev,
      postsCount: (prev.postsCount || 0) + 1,
    }));

    addToast('Post Published!', 'Your post is now live on the feed.', 'success');
    return newPost;
  };

  const deletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    setSavedPostIds((prev) => prev.filter((id) => id !== postId));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(null);
    }
    setCurrentUser((prev) => ({
      ...prev,
      postsCount: Math.max(0, (prev.postsCount || 1) - 1),
    }));
    addToast('Post deleted', 'The post was removed from the feed.', 'info');
  };

  const toggleLikePost = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const alreadyLiked = post.likes.includes(currentUser.username);
        let updatedLikes;
        if (alreadyLiked) {
          updatedLikes = post.likes.filter((u) => u !== currentUser.username);
        } else {
          updatedLikes = [...post.likes, currentUser.username];
          // Create simulated notification if liking someone else's post
          if (post.author.username !== currentUser.username) {
            const newNotif = {
              id: 'notif_' + Date.now(),
              type: 'like',
              actor: currentUser,
              content: `liked your post: "${post.content.slice(0, 45)}${post.content.length > 45 ? '...' : ''}"`,
              postId: post.id,
              postPreview: post.image,
              timeAgo: 'Just now',
              read: false,
            };
            setNotifications((n) => [newNotif, ...n]);
          }
        }
        return {
          ...post,
          likes: updatedLikes,
        };
      })
    );

    // Keep selectedPost in sync if opened in modal
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => {
        if (!prev) return null;
        const alreadyLiked = prev.likes.includes(currentUser.username);
        return {
          ...prev,
          likes: alreadyLiked
            ? prev.likes.filter((u) => u !== currentUser.username)
            : [...prev.likes, currentUser.username],
        };
      });
    }
  };

  const addComment = (postId, text) => {
    if (!text || !text.trim()) return;

    const newComment = {
      id: 'c_' + Date.now(),
      author: {
        username: currentUser.username,
        name: currentUser.name,
        avatar: currentUser.avatar,
      },
      text: text.trim(),
      createdAt: 'Just now',
      timestamp: Date.now(),
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const updatedComments = [...post.comments, newComment];

        // Notify post author if not self
        if (post.author.username !== currentUser.username) {
          const newNotif = {
            id: 'notif_' + Date.now(),
            type: 'comment',
            actor: currentUser,
            content: `commented: "${text.trim().slice(0, 50)}${text.trim().length > 50 ? '...' : ''}"`,
            postId: post.id,
            postPreview: post.image,
            timeAgo: 'Just now',
            read: false,
          };
          setNotifications((n) => [newNotif, ...n]);
        }

        return {
          ...post,
          comments: updatedComments,
        };
      })
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) =>
        prev
          ? {
              ...prev,
              comments: [...prev.comments, newComment],
            }
          : null
      );
    }

    addToast('Comment added', '', 'success');
  };

  const deleteComment = (postId, commentId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.filter((c) => c.id !== commentId),
        };
      })
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) =>
        prev
          ? {
              ...prev,
              comments: prev.comments.filter((c) => c.id !== commentId),
            }
          : null
      );
    }
    addToast('Comment removed', '', 'info');
  };

  const toggleSavePost = (postId) => {
    setSavedPostIds((prev) => {
      const isSaved = prev.includes(postId);
      if (isSaved) {
        addToast('Removed from Saved collection', '', 'info');
        return prev.filter((id) => id !== postId);
      } else {
        addToast('Saved to your collection', 'You can view this anytime in Saved', 'success');
        return [...prev, postId];
      }
    });
  };

  const toggleFollowUser = (targetUsername) => {
    if (targetUsername === currentUser.username) return;

    let nowFollowing = false;
    setUsers((prev) =>
      prev.map((u) => {
        if (u.username !== targetUsername) return u;
        nowFollowing = !u.isFollowing;
        return {
          ...u,
          isFollowing: nowFollowing,
          followersCount: nowFollowing ? u.followersCount + 1 : Math.max(0, u.followersCount - 1),
        };
      })
    );

    setCurrentUser((prev) => ({
      ...prev,
      followingCount: nowFollowing
        ? (prev.followingCount || 0) + 1
        : Math.max(0, (prev.followingCount || 1) - 1),
    }));

    if (nowFollowing) {
      addToast(`Following @${targetUsername}`, '', 'success');
      // Create notification
      const newNotif = {
        id: 'notif_' + Date.now(),
        type: 'follow',
        actor: currentUser,
        content: `You started following @${targetUsername}`,
        postId: null,
        timeAgo: 'Just now',
        read: false,
      };
      setNotifications((n) => [newNotif, ...n]);
    } else {
      addToast(`Unfollowed @${targetUsername}`, '', 'info');
    }
  };

  const updateProfile = (updatedFields) => {
    const updated = {
      ...currentUser,
      ...updatedFields,
    };
    setCurrentUser(updated);

    // Also update author info across existing posts made by currentUser
    setPosts((prev) =>
      prev.map((p) => {
        if (p.author.username === currentUser.username || p.author.id === currentUser.id) {
          return {
            ...p,
            author: {
              ...p.author,
              name: updated.name,
              avatar: updated.avatar,
              username: updated.username,
            },
          };
        }
        return p;
      })
    );

    addToast('Profile updated!', 'Your changes have been saved.', 'success');
    navigateTo('profile', updated.username);
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read', '', 'info');
  };

  const clearNotifications = () => {
    setNotifications([]);
    addToast('Notifications cleared', '', 'info');
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.POSTS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.STORIES);
    localStorage.removeItem(STORAGE_KEYS.SAVED_POST_IDS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.AUTH);

    setCurrentUser(CURRENT_DEMO_USER);
    setUsers(SAMPLE_USERS);
    setPosts(INITIAL_POSTS);
    setStories(INITIAL_STORIES);
    setSavedPostIds(INITIAL_SAVED_POST_IDS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setIsLoggedIn(true);
    setSelectedUsername(CURRENT_DEMO_USER.username);
    setActivePage('feed');

    addToast('Demo Data Reset', 'Restored all original sample posts, users & interactions.', 'success');
  };

  // Helper to get viewed user profile
  const getViewedUser = () => {
    if (selectedUsername === currentUser.username) {
      return currentUser;
    }
    const found = users.find((u) => u.username === selectedUsername);
    if (found) return found;

    // Fallback if user is from an author in posts
    const postWithAuthor = posts.find((p) => p.author.username === selectedUsername);
    if (postWithAuthor) {
      return {
        id: postWithAuthor.author.id || 'usr_temp',
        username: postWithAuthor.author.username,
        name: postWithAuthor.author.name,
        avatar: postWithAuthor.author.avatar,
        verified: postWithAuthor.author.verified || false,
        bio: 'ConnectHub community member and content creator.',
        location: 'Global',
        followersCount: 154,
        followingCount: 89,
        postsCount: posts.filter((p) => p.author.username === selectedUsername).length,
        isFollowing: false,
      };
    }
    return currentUser;
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isLoggedIn,
        login,
        signup,
        logout,
        currentUser,
        users,
        posts,
        stories,
        savedPostIds,
        notifications,
        unreadNotificationsCount,
        activePage,
        setActivePage,
        selectedUsername,
        setSelectedUsername,
        getViewedUser,
        searchQuery,
        setSearchQuery,
        navigateTo,
        createPost,
        deletePost,
        toggleLikePost,
        addComment,
        deleteComment,
        toggleSavePost,
        toggleFollowUser,
        updateProfile,
        markNotificationsRead,
        clearNotifications,
        resetDemoData,
        isCreateModalOpen,
        setIsCreateModalOpen,
        selectedStory,
        setSelectedStory,
        selectedPost,
        setSelectedPost,
        confirmDialog,
        setConfirmDialog,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
