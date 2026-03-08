# NxBazaar Mobile App

A React Native mobile app for NxBazaar built with Expo, TypeScript, Zod, Axios, and React Query.

## Features

- 📱 Cross-platform (iOS, Android, Web)
- 🔄 Server state management with React Query
- ✅ Type-safe API calls with Zod validation
- 🎨 Modern UI components
- 🚀 Built with Expo
- 🛍️ Product listing with prices and stock tracking
- 🎟️ Coupon viewing with expiry dates
- 📰 Banner display

## Tech Stack

- **React Native** 0.72.6
- **Expo** ~49.0.15
- **TypeScript** ~5.1.3
- **React Query** ^5.90.21
- **Axios** ^1.6.0
- **Zod** ^3.22.4
- **date-fns** ^3.0.0

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`

### Installation

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on specific platform:
   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## Project Structure

```
mobile/
├── src/
│   ├── screens/
│   │   ├── BannerListScreen.tsx
│   │   └── CouponListScreen.tsx
│   └── hooks/
│       ├── useBannerQuery.ts
│       └── useCouponQuery.ts
├── App.tsx
├── app.json
├── package.json
└── tsconfig.json
```

## API Configuration

Update the API base URL in `src/hooks/useBannerQuery.ts` and `src/hooks/useCouponQuery.ts`:

```typescript
const API_BASE_URL = 'http://your-api-url:3000/api';
```

## Development

- The app uses the same API endpoints as the web app
- All API responses are validated with Zod schemas
- React Query handles caching and synchronization
- TypeScript provides full type safety

## Screens

### Banner List Screen
- Display all banners with images
- Show active/draft status
- Pull-to-refresh functionality

### Coupon List Screen
- Display all available coupons
- Show coupon codes and expiry dates
- Display active/draft status
- Real-time expiry tracking

## Building for Production

```bash
# Build for production
expo build:android
expo build:ios
```

## Features Implemented

- ✅ Banner listing with images
- ✅ Active/Draft status display
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Type-safe API integration

## Next Steps

- Add authentication screens
- Implement banner creation/editing
- Add push notifications
- Implement offline support
- Add more screens (Products, Categories, etc.)