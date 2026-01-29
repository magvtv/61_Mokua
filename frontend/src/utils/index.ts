export const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };
  
  export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  export const formatRelativeDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return formatDate(dateString);
  };
  
  export const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };
  
  export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
  };
  
  export const getRandomColor = (): string => {
    const colors = ['#2E7D8A', '#FF8F00', '#FF6B6B', '#8E24AA', '#43A047'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  export const generateSEOTitle = (title: string, siteName: string = 'Mokua Literary Blog'): string => {
    return `${title} | ${siteName}`;
  };
  
  export const generateSEODescription = (excerpt: string, maxLength: number = 160): string => {
    return truncateText(excerpt, maxLength);
  };

const categoryLabels: Record<string, string> = {
  'think-pieces': 'piece',
  'short-stories': 'story',
  'poetry': 'poem',
  'real-life': 'story',
};

export const getReadFullLabel = (categorySlug?: string): string => {
  const noun = categorySlug ? categoryLabels[categorySlug] ?? 'story' : 'story';
  return `Read full ${noun}`;
};