# Atomzr - URL Shortener

A modern, fast, and reliable URL shortening service built with React and Vite. Create short links, track clicks, and manage your URLs with ease.

## 🚀 Features

- **Quick URL Shortening**: Transform long URLs into short, shareable links
- **QR Code Generation**: Automatically generate QR codes for your shortened URLs
- **Click Tracking**: Monitor how many times your links have been clicked
- **Custom Short Codes**: Create memorable short links with custom codes
- **Bulk Shortening**: Process multiple URLs at once
- **User Dashboard**: Manage all your shortened URLs in one place
- **Optional Authentication**: Sign in to sync your URLs across devices (requires Supabase)
- **Local Storage Fallback**: Works without a backend - stores URLs locally in your browser
- **Dark Mode Support**: Built-in theme support for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 4.4
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **QR Code**: qrcode library
- **Backend (Optional)**: Supabase for authentication and cloud storage

## 📋 Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aclaudios/acml-atomzr-urlshortener.git
   cd acml-atomzr-urlshortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables (Optional)**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials if you want to use cloud storage and authentication:
   ```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
   
   **Note**: If you don't configure Supabase, the app will run in local-only mode using browser localStorage.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:3000`

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## 📱 Usage

### Creating a Short URL

1. Visit the application homepage
2. Enter the long URL you want to shorten
3. (Optional) Add a custom short code
4. (Optional) Add a caption for the URL
5. Click "Shorten URL"
6. Copy your new short URL or download the QR code

### Managing Your URLs

- **With Authentication**: Sign in to access your dashboard and see all your URLs across devices
- **Without Authentication**: Your URLs are stored locally in your browser

### Bulk URL Shortening

1. Navigate to the bulk shortening section
2. Enter multiple URLs (one per line)
3. Click "Process All URLs"
4. Download the results as a CSV file

## 🔒 Privacy & Security

- URLs are stored locally in your browser by default
- Optional Supabase integration for cloud storage
- No tracking or analytics unless you enable Google Analytics and Microsoft Clarity
- See our [Privacy Policy](./src/pages/PrivacyPolicy.jsx) for more details

## 🎨 Customization

The application uses Tailwind CSS for styling. You can customize the theme by editing:

- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles and CSS variables

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Issues & Support

If you encounter any issues or have questions, please [open an issue](https://github.com/aclaudios/acml-atomzr-urlshortener/issues) on GitHub.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Vite](https://vitejs.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Optional backend with [Supabase](https://supabase.com/)

## 📚 Documentation

### Project Structure

```
acml-atomzr-urlshortener/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   ├── contexts/        # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configs
│   ├── pages/           # Page components
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | No |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | No |

### Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌟 Features in Development

- Custom domains for short URLs
- Link expiration dates
- Password-protected links
- Analytics dashboard
- API for programmatic access

---

Made with ❤️ by the Atomzr team
