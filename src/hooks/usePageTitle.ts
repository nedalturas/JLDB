import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTitleConfig {
  [key: string]: {
    title: string;
    description: string;
  };
}

const pageConfig: PageTitleConfig = {
  '/': {
    title: 'Service Provider Database',
    description: 'Find verified service providers across UAE cities including Dubai, Abu Dhabi, Sharjah, Ajman, and Al Ain. Connect directly via WhatsApp.'
  },
  '/docs': {
    title: 'Documentation',
    description: 'Complete guide to using JLDB platform. Learn how to search, filter, and connect with service providers effectively.'
  },
  '/tools': {
    title: 'Tools',
    description: 'Useful tools and utilities for service providers and teams. Calculate costs, generate QR codes, and more.'
  }
};

export function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    const currentPage = pageConfig[location.pathname];
    const baseTitle = 'JLDB v2';
    
    if (currentPage) {
      document.title = `${currentPage.title} | ${baseTitle}`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', currentPage.description);
      } else {
        const newMetaDescription = document.createElement('meta');
        newMetaDescription.name = 'description';
        newMetaDescription.content = currentPage.description;
        document.head.appendChild(newMetaDescription);
      }
    } else {
      document.title = baseTitle;
    }
  }, [location.pathname]);

  return {
    getCurrentPageTitle: () => {
      const currentPage = pageConfig[location.pathname];
      return currentPage ? currentPage.title : 'JLDB v2';
    },
    getCurrentPageDescription: () => {
      const currentPage = pageConfig[location.pathname];
      return currentPage ? currentPage.description : 'UAE Service Provider Database';
    }
  };
}