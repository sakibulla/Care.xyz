# 🏥 Care.xyz - Professional Caregiving Services Platform

> A modern, full-stack Next.js application connecting families with trusted caregivers for baby care, elderly care, sick care, and more.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://carexyz-six.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## 🌐 Live Demo

**[Visit Care.xyz →](https://carexyz-six.vercel.app/)**

---

## ✨ Features

### 🎯 Core Features
- **Service Booking System** - Browse and book caregiving services with flexible hourly/daily rates
- **User Authentication** - Secure login with NextAuth (Credentials + Google OAuth)
- **Location-Based Booking** - Bangladesh division/district/area selection
- **My Bookings Dashboard** - Track booking status and cancel pending bookings
- **Email Invoices** - Automatic email confirmation with booking details

### 👨‍💼 Admin Features
- **Admin Dashboard** - Complete admin panel for managing bookings, users, and payments
- **Payment History** - Track all transactions and revenue
- **User Management** - Manage users and assign admin roles
- **Booking Management** - Confirm, complete, or cancel bookings

### 🎨 Design & UX
- **Responsive Design** - Mobile-friendly UI with DaisyUI + TailwindCSS
- **Role-Based Access** - User and Admin roles with protected routes
- **Modern UI** - Clean, intuitive interface with smooth animations

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 16, React 19, TailwindCSS, DaisyUI |
| **Backend** | Next.js API Routes, MongoDB |
| **Authentication** | NextAuth.js (Credentials + Google OAuth) |
| **Email** | Nodemailer |
| **Icons** | React Icons |
| **Alerts** | SweetAlert2 |

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ Node.js 18+ installed
- ✅ MongoDB database (local or Atlas)
- ✅ Gmail account for email service (or other SMTP)
- ✅ Google OAuth credentials (optional)

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
cd hero-kidz-full
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your credentials:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
DBNAME=carexyz

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email Service
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 3. Seed Database (Optional)

Populate services data:

```bash
node scripts/seedServices.js
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
hero-kidz-full/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/            # NextAuth endpoints
│   │   │   ├── bookings/        # Booking CRUD
│   │   │   ├── services/        # Services CRUD
│   │   │   └── admin/           # Admin endpoints
│   │   ├── admin/               # Admin dashboard pages
│   │   ├── booking/             # Booking pages
│   │   ├── my-bookings/         # User bookings
│   │   ├── services/            # Services listing & details
│   │   ├── login/               # Authentication pages
│   │   └── register/
│   ├── components/
│   │   ├── auth/                # Login/Register forms
│   │   ├── booking/             # Booking components
│   │   ├── admin/               # Admin components
│   │   ├── home/                # Homepage sections
│   │   └── layouts/             # Navbar, Footer, Logo
│   ├── lib/
│   │   ├── authOptions.js       # NextAuth configuration
│   │   ├── dbConnect.js         # MongoDB connection
│   │   ├── sendEmail.js         # Email service
│   │   └── adminAuth.js         # Admin middleware
│   ├── actions/
│   │   └── server/              # Server actions
│   └── data/
│       └── services.json        # Services seed data
├── public/
│   └── assets/                  # Images & static files
├── scripts/                     # Utility scripts
├── .env                         # Environment variables
└── package.json
```

---

## 🗄️ Database Schema

### Users Collection

```javascript
{
  email: String,           // User email (unique)
  name: String,            // Full name
  password: String,        // Hashed password
  nid: String,             // National ID
  contact: String,         // Phone number
  role: String,            // "user" or "admin"
  provider: String,        // "credentials" or "google"
  createdAt: Date
}
```

### Services Collection

```javascript
{
  title: String,           // Service name
  slug: String,            // URL-friendly identifier
  charge_per_hour: Number, // Hourly rate
  charge_per_day: Number,  // Daily rate
  short: String,           // Short description
  description: String,     // Full description
  image: String            // Image URL
}
```

### Bookings Collection

```javascript
{
  serviceId: ObjectId,     // Reference to service
  serviceTitle: String,    // Service name
  durationType: String,    // "hour" or "day"
  duration: Number,        // Number of hours/days
  rate: Number,            // Rate per unit
  total: Number,           // Total cost
  location: {
    division: String,
    district: String,
    city: String,
    area: String,
    address: String
  },
  userEmail: String,       // User email
  userName: String,        // User name
  contact: String,         // Contact number
  status: String,          // "Pending", "Confirmed", "Completed", "Cancelled"
  createdAt: Date
}
```

---

## 🔐 Authentication Setup

### Google OAuth (Optional)

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`
6. Copy Client ID and Secret to `.env`

### Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Use the 16-character app password in `EMAIL_PASS` environment variable

---

## 👨‍💼 Admin Dashboard

### Creating an Admin User

After registering a user, promote them to admin:

```bash
node scripts/makeAdmin.js your@email.com
```

### Accessing Admin Panel

1. Login as admin user
2. Click "Admin Panel" button in navbar
3. Navigate to `/admin`

### Admin Capabilities

- 📊 Dashboard with statistics and recent bookings
- 📅 Manage all bookings (confirm, complete, cancel)
- 💰 View payment history and revenue tracking
- 👥 User management and role assignment
- ⚙️ System settings and configuration

---

## � API Endpoints

### Services

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/services` | Get all services | Public |
| GET | `/api/services?id={id}` | Get single service | Public |
| POST | `/api/services` | Create service | Admin |

### Bookings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/bookings?email={email}` | Get user bookings | User |
| POST | `/api/bookings` | Create booking | User |
| DELETE | `/api/bookings?id={id}` | Cancel booking | User |

### Admin

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/bookings` | Get all bookings | Admin |
| GET | `/api/admin/users` | Get all users | Admin |
| PATCH | `/api/admin/users` | Update user role | Admin |

---

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Ensure all variables are set in your hosting platform:

```env
MONGODB_URI=your_production_mongodb_uri
DBNAME=carexyz
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_production_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_gmail_app_password
```

---

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js`:

```javascript
daisyui: {
  themes: [{
    light: {
      "primary": "#06b6d4",    // Soft cyan
      "secondary": "#0891b2",  // Darker cyan
      "accent": "#10b981",     // Soft green
      "neutral": "#1f2937",    // Dark gray
      "base-100": "#ffffff",   // White background
    }
  }]
}
```

### Add/Modify Services

1. Edit `src/data/services.json`
2. Run seed script:

```bash
node scripts/seedServices.js
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

- ✓ Verify MongoDB URI is correct
- ✓ Ensure IP whitelist includes your IP (MongoDB Atlas)
- ✓ Check database name matches `DBNAME`
- ✓ Test connection with MongoDB Compass

### Email Not Sending

- ✓ Verify Gmail app password is correct (not regular password)
- ✓ Check if 2FA is enabled on Gmail
- ✓ Review email logs in console
- ✓ Test with a different email provider if issues persist

### Authentication Issues

- ✓ Clear browser cookies and cache
- ✓ Verify `NEXTAUTH_SECRET` is set and unique
- ✓ Check `NEXTAUTH_URL` matches your domain
- ✓ Ensure Google OAuth redirect URIs are correct

### Build Errors

- ✓ Delete `.next` folder and rebuild
- ✓ Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- ✓ Check Node.js version (18+ required)

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `node scripts/seedServices.js` | Seed services data |
| `node scripts/makeAdmin.js <email>` | Make user admin |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact & Support

- **Live Demo**: [https://carexyz-six.vercel.app/](https://carexyz-six.vercel.app/)
- **Email**: hasanfahmidul2002@gmail.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/care-xyz/issues)

---

<div align="center">

**Built with ❤️ using Next.js, React, and MongoDB**

[⬆ Back to Top](#-carexyz---professional-caregiving-services-platform)

</div>
