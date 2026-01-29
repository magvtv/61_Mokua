// Feature flags configuration
export const FEATURE_FLAGS = {
  // Set to true to show coming soon page, false for main blog app
  SHOW_COMING_SOON: import.meta.env.VITE_SHOW_COMING_SOON === 'true' || false,
  
  // Enable/disable specific features
  ENABLE_NEWSLETTER_SIGNUP: import.meta.env.VITE_ENABLE_NEWSLETTER_SIGNUP !== 'false',
  ENABLE_SEARCH: import.meta.env.VITE_ENABLE_SEARCH !== 'false',
  ENABLE_SUBMISSIONS: import.meta.env.VITE_ENABLE_SUBMISSIONS !== 'false',
  
  // Development features
  ENABLE_DEV_TOOLS: import.meta.env.DEV,
} as const;

// Helper function to check if a feature is enabled
export const isFeatureEnabled = (feature: keyof typeof FEATURE_FLAGS): boolean => {
  return FEATURE_FLAGS[feature];
};

// Helper to get current app mode
export const getAppMode = (): 'coming-soon' | 'blog' => {
  return FEATURE_FLAGS.SHOW_COMING_SOON ? 'coming-soon' : 'blog';
}; 