# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial migration from Hostinger Horizons to standalone GitHub repository
- Comprehensive README.md with setup instructions and documentation
- Environment variable configuration with .env.example file
- Local storage fallback when Supabase is not configured
- Custom Supabase client with mock implementation for local-only mode
- .gitignore file for proper version control

### Changed
- Simplified Vite configuration removing Hostinger Horizons dependencies
- Updated build process to work independently of Hostinger platform
- Removed Hostinger Horizons meta tag from index.html

### Removed
- Hostinger Horizons-specific error handlers and plugins
- Hostinger Horizons iframe and visual editor plugins from build process
- Cross-Origin-Embedder-Policy headers specific to Horizons platform
- Babel externals from build configuration

## [1.0.0] - 2026-01-17

### Features
- URL shortening with custom short codes
- QR code generation for shortened URLs
- Click tracking and analytics
- User authentication with Supabase (optional)
- Bulk URL shortening
- User dashboard for managing URLs
- Dark mode support
- Responsive design
- Landing page with feature showcase
- Privacy policy, terms of service, and cookie policy pages
- Contact and about pages
- Local storage for URLs when offline or without Supabase

### Technical
- Built with React 18.2 and Vite 4.4
- Radix UI components for accessible UI
- Tailwind CSS for styling
- React Router DOM v6 for routing
- Framer Motion for animations
- Supabase integration for backend (optional)
- Google Analytics and Microsoft Clarity integration
- AdSense integration

---

**Note**: This project was initially developed in Hostinger Horizons and has been migrated to a standalone repository for continued development via GitHub.
