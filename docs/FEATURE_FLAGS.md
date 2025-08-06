# Feature Flags Configuration

This document explains how to configure the application using feature flags.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Feature Flags
# Set to 'true' to show the coming soon page instead of the main blog app
VITE_SHOW_COMING_SOON=false

# Enable/disable specific features
VITE_ENABLE_NEWSLETTER_SIGNUP=true
VITE_ENABLE_SEARCH=true
VITE_ENABLE_SUBMISSIONS=true

# API Configuration
VITE_API_BASE_URL=http://localhost:3001

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/mokua
```

## Available Feature Flags

### `VITE_SHOW_COMING_SOON`
- **Default**: `false`
- **Description**: Controls whether to show the coming soon page or the main blog application
- **Values**: 
  - `true`: Shows only the coming soon page
  - `false`: Shows the full blog application with routing

### `VITE_ENABLE_NEWSLETTER_SIGNUP`
- **Default**: `true`
- **Description**: Enables/disables the newsletter signup functionality
- **Values**: 
  - `true`: Newsletter signup is available
  - `false`: Newsletter signup is disabled

### `VITE_ENABLE_SEARCH`
- **Default**: `true`
- **Description**: Enables/disables the search functionality
- **Values**: 
  - `true`: Search page and functionality is available
  - `false`: Search is disabled

### `VITE_ENABLE_SUBMISSIONS`
- **Default**: `true`
- **Description**: Enables/disables the content submission functionality
- **Values**: 
  - `true`: Submit page and functionality is available
  - `false`: Submissions are disabled

## Usage Examples

### Show Coming Soon Page
```bash
VITE_SHOW_COMING_SOON=true
```

### Show Main Blog App
```bash
VITE_SHOW_COMING_SOON=false
```

### Disable Search Feature
```bash
VITE_ENABLE_SEARCH=false
```

## Deployment Scenarios

### Development
- Use `.env.local` for local development
- Set `VITE_SHOW_COMING_SOON=false` to work on the main app

### Staging
- Set `VITE_SHOW_COMING_SOON=true` to show coming soon page
- Disable features that aren't ready: `VITE_ENABLE_SUBMISSIONS=false`

### Production
- Set `VITE_SHOW_COMING_SOON=false` to show the full blog
- Enable all features: `VITE_ENABLE_NEWSLETTER_SIGNUP=true`

## Future Considerations

### Subdomain Approach
If you decide to move to a subdomain approach later:

1. **Coming Soon**: `soon.mokua.co.ke`
2. **Main App**: `mokua.co.ke`

This would require:
- Separate deployments
- DNS configuration
- SSL certificates
- Shared API endpoints

### Benefits of Current Approach
- Single deployment
- Shared infrastructure
- Easy feature toggling
- No DNS complexity
- Faster development iteration 