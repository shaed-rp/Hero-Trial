# Hero-Trial - Commercial EV Showcase

A modern Next.js application showcasing commercial electric vehicles with interactive features, contact forms, and comprehensive vehicle information.

## 🚗 Features

- **Vehicle Showcase**: Interactive display of commercial electric vehicles
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Contact Forms**: Secure contact forms with reCAPTCHA protection
- **Multi-language Support**: Built-in translation capabilities
- **Analytics Integration**: Google Analytics and Google Tag Manager
- **Email Notifications**: Automated email sending for form submissions
- **Docker Support**: Containerized deployment
- **Kubernetes Ready**: Helm charts for orchestration

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: SCSS with CSS Modules
- **Authentication**: Google reCAPTCHA
- **Email**: Nodemailer with Gmail
- **Analytics**: Google Analytics 4, Google Tag Manager
- **Testing**: Jest, React Testing Library, Playwright
- **Performance**: Core Web Vitals monitoring
- **Deployment**: Docker, Kubernetes (Helm)
- **Translation**: GTranslate

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shaed-rp/Hero-Trial.git
   cd Hero-Trial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Email Configuration
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=recipient@example.com
   
   # reCAPTCHA
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
   RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
   
   # Analytics
   NEXT_PUBLIC_GTM_ID=GTM-5ZKF55WH
   
   # Base URL
   NEXT_PUBLIC_BASE_URL=https://commercialevs.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Hero-Trial/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── api/            # API routes
│   │   └── [vehicle]/      # Vehicle-specific pages
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Global styles and variables
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   └── data/               # Static data and configurations
├── public/                 # Static assets
├── helm/                   # Kubernetes Helm charts
├── scripts/                # Build and deployment scripts
└── Dockerfile              # Docker configuration
```

## 🐳 Docker Deployment

### Build and run locally
```bash
make docker-dev
```

### Build for production
```bash
make dockerbuild
```

## ☸️ Kubernetes Deployment

### Using Helm
```bash
helm install hero-trial ./helm
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:e2e` - Run end-to-end tests

## 🔒 Security Features

- **reCAPTCHA Protection**: All contact forms are protected
- **Input Validation**: Comprehensive form validation
- **Environment Variables**: Secure configuration management
- **HTTPS Only**: Production deployments use HTTPS

## 📊 Analytics & Tracking

The application includes:
- Google Analytics 4 for user behavior tracking
- Google Tag Manager for flexible tag management
- Form submission tracking
- Page view analytics
- Core Web Vitals monitoring
- Performance metrics tracking

## 🌐 Multi-language Support

Built-in translation support using GTranslate for international users.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions, please contact the development team.

---

Built with ❤️ using Next.js 15 and TypeScript - Production Ready v0.1.1
