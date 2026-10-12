import React from 'react';
import {
  IconRocket,
  IconSearch,
  IconDatabase,
  IconSparkles,
  IconInfoCircle,
  IconFileText,
  IconBook,
  IconFolder,
} from '@tabler/icons-react';

export function getArticleIcon(id: string, category?: string, size = 16): React.ReactNode {
  const lowerId = id.toLowerCase();
  const lowerCat = (category || '').toLowerCase();

  if (lowerId.includes('started') || lowerId.includes('start') || lowerId.includes('intro')) {
    return <IconRocket size={size} />;
  }
  if (lowerId.includes('search') || lowerId.includes('filter')) {
    return <IconSearch size={size} />;
  }
  if (lowerId.includes('database') || lowerId.includes('action') || lowerId.includes('db')) {
    return <IconDatabase size={size} />;
  }
  if (lowerId.includes('cleaning') || lowerId.includes('addon') || lowerId.includes('service') || lowerCat.includes('cleaning')) {
    return <IconSparkles size={size} />;
  }
  if (lowerId.includes('about') || lowerId.includes('faq') || lowerId.includes('info')) {
    return <IconInfoCircle size={size} />;
  }
  return <IconFileText size={size} />;
}

export function getCategoryIcon(category: string, size = 14): React.ReactNode {
  const lower = category.toLowerCase();
  if (lower.includes('basic') || lower.includes('start')) {
    return <IconRocket size={size} />;
  }
  if (lower.includes('jl') || lower.includes('doc')) {
    return <IconBook size={size} />;
  }
  return <IconFolder size={size} />;
}

export function calculateReadTime(content: string): number {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 180));
}
