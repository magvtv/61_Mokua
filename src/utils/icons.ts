// Heroicons imports for consistent usage across the app
export {
  // Navigation
  HomeIcon,
  UserIcon,
  CogIcon,
  BellIcon,
  
  // Content
  BookOpenIcon,
  DocumentTextIcon,
  DocumentIcon,
  PencilIcon,
  
  // Social
  UserGroupIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  
  // Actions
  PlusIcon,
  MinusIcon,
  XMarkIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  
  // UI
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  EyeIcon,
  EyeSlashIcon,
  
  // Data
  ChartBarIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  
  // Communication
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  
  // Media
  PhotoIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  
  // Status
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  
  // Layout
  Bars3Icon,
  XMarkIcon as MenuCloseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

// Solid icons for special cases
export {
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid,
  CheckIcon as CheckIconSolid,
} from '@heroicons/react/24/solid';

// Icon size presets
export const iconSizes = {
  xs: { width: 12, height: 12 },
  sm: { width: 16, height: 16 },
  md: { width: 20, height: 20 },
  lg: { width: 24, height: 24 },
  xl: { width: 32, height: 32 },
} as const;

// Helper function to get icon size
export const getIconSize = (size: keyof typeof iconSizes = 'md') => {
  return iconSizes[size];
}; 