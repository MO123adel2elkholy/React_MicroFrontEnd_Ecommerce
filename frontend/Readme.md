# Microshop - React Microfrontends E-Commerce System

A modern e-commerce platform built with **Module Federation** and **Microfrontends architecture**, demonstrating independent deployment of frontend applications composed into a unified shell.

## 🎯 Project Overview

This project showcases a scalable e-commerce solution where different business domains (Products, Cart, Host) are developed, deployed, and scaled independently while maintaining seamless user experience.

### Architecture Diagram
```
┌─────────────────────────────────────────────┐
│           Host Application (Shell)          │
│  ├─ Home Page                               │
│  ├─ Navigation & Routing                    │
│  └─ Layout & Common Styling                 │
├──────────────────┬──────────────────────────┤
│   Products MFE   │      Cart MFE            │
│  ├─ Product List │  ├─ Cart Display        │
│  ├─ Add to Cart  │  ├─ Cart Management     │
│  └─ Messaging    │  └─ Checkout Flow       │
└──────────────────┴──────────────────────────┘
         ↓                    ↓
    [Module Federation via Webpack]
         ↓                    ↓
   [@microshop/cart-contract - Shared Library]
```

## 📁 Project Structure

```
react-microfrontends-frontend-system-design/
├── React_MicroFrontEnd_Ecommerce/
│   ├── frontend/
│   │   ├── host/                    # Shell/Host application
│   │   │   ├── src/
│   │   │   │   ├── App.tsx          # Main routing & layout
│   │   │   │   └── App.css
│   │   │   └── webpack.config.js    # Module Federation config
│   │   │
│   │   ├── products/                # Products Microfrontend
│   │   │   ├── src/
│   │   │   │   ├── App.tsx          # Product listing & add-to-cart
│   │   │   │   └── App.css
│   │   │   └── webpack.config.js    # Module Federation config
│   │   │
│   │   └── cart/                    # Cart Microfrontend
│   │       ├── src/
│   │       │   ├── App.tsx          # Cart display & management
│   │       │   └── App.css
│   │       └── webpack.config.js    # Module Federation config
│   │
│   └── shared/                      # Shared contracts & utilities
│       └── src/
│           └── index.ts             # Cart communication layer
│
└── Microfonted.md                   # Architecture documentation
```

## 🏗️ Key Technologies

- **React 18+** - UI framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Webpack Module Federation** - Microfrontends orchestration
- **SessionStorage** - Cart state persistence
- **CustomEvent API** - Cross-MFE communication

## ✨ Key Features

### 1. **Independent Deployment**
- Each MFE can be deployed separately without affecting others
- Products team and Cart team work autonomously

### 2. **Shared Contract Library** (`@microshop/cart-contract`)
```typescript
- addProductToCart()      // Add items to cart
- readCartItems()         // Retrieve cart state
- writeCartItems()        // Update cart state
- CART_ADD_EVENT          // Event name for communication
- CartItem & CartAddDetail types
```

### 3. **Cross-MFE Communication**
- Event-driven architecture using `CustomEvent`
- SessionStorage for state persistence
- No tight coupling between MFEs

### 4. **Lazy Loading & Code Splitting**
- Remote MFEs loaded on-demand via `React.lazy()`
- Suspense boundaries with fallback UI
- Improved initial load time

### 5. **Error Handling & Fallbacks**
- Loading states during MFE initialization
- Graceful degradation if a remote fails

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ & npm/yarn
- Git

### Installation

```bash
# Clone repository
git clone <repository-url>
cd React_MicroFrontEnd_Ecommerce/frontend

# Install dependencies for all workspaces
npm install

# Or per module
cd host && npm install
cd ../products && npm install
cd ../cart && npm install
```

### Running Locally

**Terminal 1 - Start Products MFE**
```bash
cd frontend/products
npm run dev
# Runs on: http://localhost:3001
```

**Terminal 2 - Start Cart MFE**
```bash
cd frontend/cart
npm run dev
# Runs on: http://localhost:3002
```

**Terminal 3 - Start Host Application**
```bash
cd frontend/host
npm run dev
# Runs on: http://localhost:3000
```

Visit `http://localhost:3000` to see the unified application.

## 📊 Module Federation Configuration

Each MFE exposes and consumes modules via Webpack:

**Host (webpack.config.js)**
```javascript
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    products: "products@http://localhost:3001/remoteEntry.js",
    cart: "cart@http://localhost:3002/remoteEntry.js",
  },
  shared: ["react", "react-dom", "react-router-dom"],
})
```

**Products & Cart MFEs**
```javascript
new ModuleFederationPlugin({
  name: "products/cart",
  filename: "remoteEntry.js",
  exposes: {
    "./ProductList / Cart": "./src/App.tsx",
  },
  shared: ["react", "react-dom", "react-router-dom"],
})
```

## 🔄 Data Flow Example

### Adding Product to Cart
```
1. User clicks "Add to Cart" in Products MFE
   ↓
2. Products calls: addProductToCart(product)
   ↓
3. Shared library:
   - Updates SessionStorage
   - Dispatches CART_ADD_EVENT
   ↓
4. Cart MFE listens to event and updates display
   ↓
5. User navigates to /cart and sees updated items
```

## 📋 Current Implementation Details

### App.tsx (Host)
- Client-side routing with React Router
- Lazy-loaded remote components
- Navigation between Home, Products, and Cart
- Responsive layout with header and main content area

### Products MFE
- Displays 6 sample products
- "Add to Cart" functionality
- Toast notification feedback
- Uses shared contract for cart operations

### Cart MFE
- Displays cart items with quantities
- Manages cart state via sessionStorage
- Handles cart updates and item removal
- Listens to cart events for real-time updates

### Shared Contract (`@microshop/cart-contract`)
- Type definitions (CartItem, CartAddDetail)
- Cart CRUD operations
- Event system for cross-MFE communication
- SessionStorage management

## 🔐 State Management

**Current Approach: Event-Driven + SessionStorage**
```
ProductList → addProductToCart() → SessionStorage + Event
                                      ↓
                                   Cart reads event & SessionStorage
```

## 🚦 Next Steps & Enhancements

### Phase 2: Enhanced Features
- [ ] **Authentication Layer**
  - JWT token management
  - Secure endpoints for cart operations
  - User profile persistence across MFEs

- [ ] **Advanced Cart Management**
  - Quantity adjustment in cart view
  - Remove items functionality
  - Cart totals & tax calculations
  - Coupon/discount system

- [ ] **Product Search & Filtering**
  - Search bar in Products MFE
  - Category filtering
  - Price range filters
  - Sorting options

### Phase 3: Production Readiness
- [ ] **Error Handling & Logging**
  - Centralized error boundary
  - Error tracking (Sentry/LogRocket)
  - Detailed console logging

- [ ] **Performance Optimization**
  - Image optimization & CDN
  - Caching strategies
  - Bundle analysis & tree-shaking

- [ ] **Testing Infrastructure**
  - Unit tests (Jest)
  - Integration tests (React Testing Library)
  - E2E tests (Cypress/Playwright)
  - Visual regression testing

- [ ] **Shared Component Library**
  - Extract common UI components
  - Button, Card, Modal components
  - Theme/styling system
  - Storybook documentation

### Phase 4: Scalability
- [ ] **Additional MFEs**
  - User Profile MFE
  - Orders/History MFE
  - Admin Dashboard MFE
  - Checkout MFE

- [ ] **State Management**
  - Consider Redux/Zustand for complex state
  - Global event bus abstraction
  - State synchronization across MFEs

- [ ] **Deployment Pipeline**
  - CI/CD setup (GitHub Actions/GitLab CI)
  - Automated testing
  - Blue-green deployment strategy
  - Version management & rollback

- [ ] **Monitoring & Analytics**
  - User behavior tracking
  - Performance metrics (Core Web Vitals)
  - Error rate monitoring
  - Custom analytics events

### Phase 5: Advanced Features
- [ ] **Real-time Capabilities**
  - WebSocket integration for live cart updates
  - Inventory status notifications
  - Order tracking

- [ ] **SEO & SSR**
  - Server-side rendering for host
  - Meta tags management
  - Structured data markup

- [ ] **Internationalization (i18n)**
  - Multi-language support
  - Currency conversion
  - Locale-specific formatting

- [ ] **Progressive Web App (PWA)**
  - Service worker implementation
  - Offline functionality
  - App install prompts

## 🧪 Testing Strategy

```bash
# Run tests for a specific MFE
cd frontend/products
npm run test

# Run all tests
npm run test:all

# Coverage report
npm run test:coverage
```

## 📦 Build & Deployment

**Build all MFEs**
```bash
npm run build:all
```

**Production deployment**
```bash
# Each MFE deployed to separate domain/CDN
- host: https://app.microshop.com
- products: https://products.microshop.com
- cart: https://cart.microshop.com
```

## 🤝 Team Structure (Recommended)

- **Host Team** - Shell development & routing
- **Products Team** - Product catalog & browsing
- **Cart Team** - Shopping cart & checkout
- **Shared Team** - Contract library & common utilities
- **Platform Team** - Deployment & DevOps

## 📚 Resources & Documentation

- [Webpack Module Federation Docs](https://webpack.js.org/concepts/module-federation/)
- [React Router Documentation](https://reactrouter.com/)
- [Microfrontends Patterns](https://micro-frontends.org/)
- [Custom Events API](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)

## ⚠️ Common Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Remote MFE not loading | Check webpack config & network tab; ensure remote is running |
| State sync issues | Use shared contract library & events consistently |
| Version conflicts | Lock shared dependency versions in webpack config |
| CSS conflicts | Use CSS modules or BEM naming conventions per MFE |
| Authentication issues | Implement token-based auth with secure storage |

## 📝 License

[Your License Here]

## 👥 Contributors

- Team Lead: [Your Name]
- Products Team: [Team Members]
- Cart Team: [Team Members]

---

**Last Updated:** September 10, 2026  
**Project Status:** MVP Complete - Ready for Phase 2 Development