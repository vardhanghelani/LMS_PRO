# Library Management System

A comprehensive, modern library management system built with Next.js 15, TypeScript, Prisma, and MySQL. This system provides complete digital management of library operations with role-based access control for administrators, librarians, and patrons.

## 🚀 Features

### Core Functionality
- **Multi-Role Authentication System** - Secure JWT-based authentication for Admin, Librarian, and Patron roles
- **Library Item Management** - Complete CRUD operations for books, journals, multimedia, newspapers, magazines, theses, and reports
- **Transaction Management** - Issue, return, and reservation system with automated notifications
- **Fine Management** - Automated fine calculation and collection system
- **User Management** - Comprehensive user profiles with detailed information
- **Dashboard Analytics** - Real-time statistics and charts for all user types
- **Notification System** - Automated notifications for various library events
- **Wishlist System** - Patrons can save items for future borrowing
- **Search & Filter** - Advanced search capabilities across all library items
- **Responsive Design** - Mobile-first design with beautiful UI/UX

### User Roles & Permissions

#### 👑 Admin
- **Dashboard**: System-wide statistics and analytics
- **User Management**: Manage librarians and patrons
- **System Configuration**: Configure library settings (borrow days, fines, etc.)
- **Reports**: Generate comprehensive reports
- **Contact Management**: Handle contact form submissions

#### 📚 Librarian
- **Dashboard**: Personal library statistics and analytics
- **Item Management**: Add, edit, and manage library items
- **Transaction Management**: Issue and return items
- **Reservation Management**: Handle item reservations
- **Patron Management**: View and manage patron information
- **Fine Management**: Track and collect fines
- **Account Management**: Personal profile management

#### 👤 Patron
- **Item Browsing**: Search and browse available library items
- **Borrowing**: Request and borrow items
- **Return Management**: Return borrowed items
- **Wishlist**: Save items for future borrowing
- **History**: View borrowing history
- **Notifications**: Receive system notifications
- **Account Management**: Personal profile management

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **React Loading Indicators** - Loading states

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe database ORM
- **MySQL** - Relational database
- **JWT (jose)** - Secure authentication
- **bcryptjs** - Password hashing
- **date-fns** - Date manipulation

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Patch Package** - Package patching
- **Turbopack** - Fast development builds

## 📁 Project Structure

```
NextJS_project/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Protected dashboard routes
│   │   ├── admin/               # Admin-specific pages
│   │   ├── librarian/           # Librarian-specific pages
│   │   └── patron/              # Patron-specific pages
│   ├── (home)/                  # Public home routes
│   │   ├── (auth)/              # Authentication pages
│   │   ├── about/               # About page
│   │   └── contact/             # Contact page
│   ├── api/                     # API routes
│   │   ├── admin/               # Admin API endpoints
│   │   ├── auth/                # Authentication endpoints
│   │   ├── librarian/           # Librarian API endpoints
│   │   └── patron/              # Patron API endpoints
│   ├── components/              # Reusable React components
│   ├── utils/                   # Utility functions
│   └── globals.css              # Global styles
├── prisma/                      # Database schema and migrations
├── generated/                   # Generated Prisma client
├── public/                      # Static assets
├── build/                       # Production build output
└── middleware.ts                # Next.js middleware
```

## 🗄️ Database Schema

### Core Models

#### Users
- **user_id** (Primary Key)
- **name**, **email**, **password_hash**
- **role** (admin, librarian, patron)
- **status** (active, banned)
- **gender**, **phone_number**, **birth_date**, **address**
- **profile_image_url**
- **created_at**, **updated_at**

#### Library Items
- **item_id** (Primary Key)
- **title**, **author**, **isbn**
- **year**, **genre**, **item_type** (book, journal, multimedia, etc.)
- **publisher**, **language**, **pages**, **duration**
- **format**, **subject**, **keywords**
- **description**, **location**, **image_url**
- **librarian_id** (Foreign Key)
- **record_status** (active, inactive)

#### Item Transactions
- **tran_id** (Primary Key)
- **item_id**, **user_id** (Foreign Keys)
- **status** (available, not_available, reserved, lost, damaged)
- **record_status** (active, inactive)

#### Transaction History
- **id** (Primary Key)
- **item_id**, **tran_id**, **requested_by**, **approved_by**
- **status** (issued, returned, pending, rejected, overdue)
- **requested_at**, **approved_at**
- **date_issued**, **date_due**, **date_returned**
- **remarks**

#### Fines
- **fine_id** (Primary Key)
- **user_id**, **item_tran_history_id**
- **amount**, **reason**
- **status** (unpaid, paid)
- **created_at**, **paid_at**

#### Notifications
- **notification_id** (Primary Key)
- **type** (issue, return, overdue, reservation_available, etc.)
- **item_id**, **from_user_id**, **to_user_id**
- **tran_id**, **reservation_id**
- **status** (pending, approved, rejected)
- **message**, **created_at**, **resolved_at**

#### User Wishlist
- **id** (Primary Key)
- **user_id**, **item_id**
- **created_at**

#### System Configuration
- **config_id** (Primary Key)
- **config_key**, **config_value**
- **description**, **updated_at**

#### Contact Us
- **id** (Primary Key)
- **name**, **email**, **subject**, **message**
- **created_at**

#### Library Cards
- **card_id** (Primary Key)
- **user_id**, **card_number**
- **issued_at**, **expires_at**
- **status** (active, expired, suspended, cancelled)

#### Logs
- **log_id** (Primary Key)
- **description**, **user_id**
- **created_at**

## 🔐 Authentication System

### JWT-Based Authentication
- **Token Generation**: Secure JWT tokens with 24-hour expiration
- **HttpOnly Cookies**: Tokens stored as secure httpOnly cookies
- **Role-Based Access**: Middleware enforces role-based route protection
- **Automatic Verification**: Middleware automatically verifies tokens on protected routes

### Security Features
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Comprehensive validation on all forms
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: SameSite cookie policy

### Authentication Flow
1. User submits login credentials
2. Server validates credentials against database
3. JWT token generated with user information
4. Token stored as httpOnly cookie
5. Middleware verifies token on protected routes
6. User redirected to appropriate dashboard based on role

## 🎨 User Interface

### Design System
- **Modern Glassmorphism**: Beautiful glass-like UI elements
- **Gradient Backgrounds**: Eye-catching gradient designs
- **Responsive Design**: Mobile-first approach
- **Dark/Light Themes**: Adaptive color schemes
- **Smooth Animations**: Framer Motion animations
- **Loading States**: Comprehensive loading indicators

### Component Library
- **Navbar**: Role-based navigation with sidebar
- **AdminDashboard**: Comprehensive admin analytics
- **AddBookForm**: Advanced item creation form
- **ConfirmDialog**: Reusable confirmation dialogs
- **PasswordStrengthChecker**: Real-time password validation
- **NotificationSystem**: Toast notifications
- **Snackbar**: User feedback messages

## 📊 API Endpoints

### Authentication APIs
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check-user` - Verify current user

### Admin APIs
- `GET /api/admin` - Admin dashboard data
- `GET /api/admin/patrons` - Get all patrons
- `GET /api/admin/librarians` - Get all librarians
- `GET /api/admin/reports` - Generate reports
- `GET /api/admin/config` - System configuration
- `POST /api/admin/config` - Update configuration

### Librarian APIs
- `GET /api/librarian` - Librarian dashboard data
- `GET /api/librarian/items` - Get managed items
- `POST /api/librarian/items/add` - Add new item
- `PUT /api/librarian/items/{id}/edit` - Edit item
- `GET /api/librarian/issue` - Issue items
- `GET /api/librarian/return` - Return items
- `GET /api/librarian/patrons` - Get patrons
- `GET /api/librarian/fines` - Get fines

### Patron APIs
- `GET /api/patron/items` - Browse items
- `POST /api/patron/borrow` - Request item
- `POST /api/patron/return` - Return item
- `GET /api/patron/history` - Borrowing history
- `GET /api/patron/wishlist` - Get wishlist
- `POST /api/patron/wishlist` - Add to wishlist
- `GET /api/patron/notifications` - Get notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NextJS_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/library_db"
   JWT_SECRET="your-super-secret-jwt-key-here"
   NODE_ENV="development"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate deploy
   
   # Seed the database with sample data
   node seed-database.js
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Default Login Credentials

After seeding the database, you can use these credentials:

**Admin:**
- Email: `admin123@gmail.com`
- Password: `Admin@123`

**Librarian:**
- Email: `emma.johnson@example.com`
- Password: `Emma@123`

**Patron:**
- Email: `john.doe@example.com`
- Password: `John@123`

## 🔧 Configuration

### System Configuration
The system includes configurable settings accessible via the admin panel:

- **max_borrow_days**: Maximum borrowing period (default: 14 days)
- **fine_per_day**: Daily fine amount (default: $1.00)
- **reservation_expiry_days**: Reservation validity period (default: 7 days)
- **max_reservations_per_user**: Maximum active reservations per user (default: 5)
- **library_name**: Library name
- **library_address**: Library address
- **library_phone**: Contact phone number
- **library_email**: Contact email

### Database Configuration
The system uses MySQL with the following key features:
- **Connection Pooling**: Efficient database connections
- **Transaction Support**: ACID compliance
- **Indexing**: Optimized queries with proper indexes
- **Foreign Key Constraints**: Data integrity enforcement

## 📱 Responsive Design

### Mobile-First Approach
- **Breakpoints**: Tailwind CSS responsive breakpoints
- **Touch-Friendly**: Large touch targets for mobile devices
- **Optimized Navigation**: Collapsible sidebar for mobile
- **Fast Loading**: Optimized images and lazy loading

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🔒 Security Features

### Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Session Management**: Secure session handling
- **Role-Based Access**: Granular permission system

### Data Security
- **Input Validation**: Comprehensive input sanitization
- **SQL Injection Prevention**: Prisma ORM protection
- **XSS Protection**: React's built-in XSS prevention
- **CSRF Protection**: SameSite cookie policy

### API Security
- **Rate Limiting**: Request rate limiting (configurable)
- **CORS Configuration**: Proper CORS setup
- **Error Handling**: Secure error messages
- **Logging**: Comprehensive audit logging

## 📈 Performance Optimization

### Frontend Optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Component and route lazy loading
- **Caching**: Browser and CDN caching strategies

### Backend Optimization
- **Database Indexing**: Optimized database queries
- **Connection Pooling**: Efficient database connections
- **Caching**: Redis caching (optional)
- **API Optimization**: Efficient API endpoints

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API endpoint tests
- **E2E Tests**: Full user journey tests
- **Performance Tests**: Load and stress testing

### Test Commands
```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run all tests
npm run test:all
```

## 🚀 Deployment

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables (Production)
```env
DATABASE_URL="mysql://username:password@host:port/database"
JWT_SECRET="production-secret-key"
NODE_ENV="production"
NEXT_PUBLIC_API_URL="https://your-domain.com"
```

### Deployment Options
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative deployment platform
- **Docker**: Containerized deployment
- **Traditional Hosting**: VPS or dedicated server

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow ESLint configuration
2. **TypeScript**: Maintain type safety
3. **Testing**: Write tests for new features
4. **Documentation**: Update documentation for changes
5. **Git Workflow**: Use feature branches and pull requests

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Documentation
- **API Documentation**: Available in `/docs/api`
- **Component Documentation**: Available in `/docs/components`
- **Database Schema**: Available in `/docs/database`

### Getting Help
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Email**: Contact the development team

## 🎯 Roadmap

### Upcoming Features
- **Mobile App**: React Native mobile application
- **Advanced Analytics**: Machine learning insights
- **Multi-Language Support**: Internationalization
- **API Versioning**: RESTful API versioning
- **Real-time Notifications**: WebSocket support
- **Advanced Search**: Elasticsearch integration
- **Barcode Integration**: Barcode scanning support
- **Email Notifications**: Automated email system

### Performance Improvements
- **Caching Layer**: Redis integration
- **CDN Integration**: Global content delivery
- **Database Optimization**: Query optimization
- **Image Optimization**: Advanced image processing

## 📊 System Requirements

### Minimum Requirements
- **Node.js**: 18.0.0+
- **MySQL**: 8.0+
- **RAM**: 2GB
- **Storage**: 1GB

### Recommended Requirements
- **Node.js**: 20.0.0+
- **MySQL**: 8.0+
- **RAM**: 4GB+
- **Storage**: 5GB+

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Complete library management system
- JWT authentication
- Role-based access control
- Responsive design
- Comprehensive API

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**