# HN STORE

HN STORE is a modern, scalable, and high-performance e-commerce platform built using **Next.js, TypeScript, Tailwind CSS, and Sanity CMS**. It offers a seamless shopping experience with real-time data fetching, dynamic product pages, and a robust cart and checkout system.

## 🚀 Hero Section

![Hero Section](./public/readme-stuff/hero-ecom.png)

---

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Type Checking:** TypeScript
- **Headless CMS:** Sanity
- **State Management:** React Context API
- **Payment Integration:** Stripe, PayPal, etc.
- **Deployment:** Vercel

---

## 📂 File Structure

```bash
hn-store/
├── public/                  # Static assets
│   ├── brands/              # Brand logos (SVG)
│   ├── icon/                # Icons (SVG)
│   ├── readme-stuff/        # README assets
│   ├── store/               # Store-related images
│   └── ...                  # Other static files
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── admin/           # Admin dashboard
│   │   ├── api/             # API routes
│   │   ├── cart/            # Cart and checkout pages
│   │   ├── products/        # Dynamic product pages
│   │   ├── shop/            # Shop page
│   │   ├── studio/          # Sanity studio
│   │   ├── success/         # Order success page
│   │   └── ...              # Other pages
│   ├── components/          # Reusable UI components
│   │   ├── casual/          # Casual wear section
│   │   ├── context/         # Context providers
│   │   ├── dressStyle/      # Dress style section
│   │   ├── Footer/          # Footer component
│   │   ├── header/          # Header and navigation
│   │   ├── hero/            # Hero section
│   │   ├── products/        # Product-related components
│   │   ├── reviews/         # Review components
│   │   ├── Sale/            # Sale section
│   │   ├── testimonial/     # Testimonials section
│   │   └── ui/              # UI primitives (buttons, cards, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and helpers
│   └── ...                  # Other source files
├── sanity/                  # Sanity CMS setup
│   ├── lib/                 # Sanity client and utilities
│   ├── schemas/             # Sanity schemas (e.g., products, reviews)
│   └── ...                  # Sanity configuration files
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies
├── README.md                # Project documentation
└── ...                      # Other configuration files
```

---

## ✨ Key Features

### 📡 1. Dynamic Data Fetching
- Data is fetched in real-time from **Sanity CMS** using **GROQ queries**.
- Utilizes **Next.js Server Components** for optimized performance and SEO.

### 🛍️ 2. Dynamic Product Pages
- Each product has a dynamically generated page using **Next.js Dynamic Routes**.
- Displays detailed product information, including:
  - Name, price, and description
  - High-quality images
  - Discounts and ratings

### 🛒 3. Shopping Cart
- Built using **React Context API** and **local storage** for persistence.
- Users can:
  - Add/remove products
  - Update quantities
  - View the total price

### 💳 4. Checkout Process
- Secure and user-friendly checkout flow.
- Integrated with a **payment gateway** (e.g., Stripe, PayPal) for seamless transactions.

### 🛠️ 5. Admin Dashboard
- Manage **products, orders, and reviews** directly from the **Sanity Studio**.
- Custom admin panel for advanced management.

### 📱 6. Responsive Design
- Fully **responsive UI** built with **Tailwind CSS** for a consistent experience across devices.

### ⭐ 7. User Reviews and Ratings
- Customers can **leave reviews and ratings** for products.
- Reviews are displayed on **product pages** for transparency.

---

## 🚀 Deployment

**HN STORE** is designed to be deployed on **Vercel** for optimal performance. Follow these steps to deploy:

1. Push your code to a **GitHub repository**.
2. Log in to **Vercel** and import your project.
3. Configure **environment variables** in the Vercel dashboard.
4. Deploy your project with a **single click**.

---

🚀 **HN STORE** is built for scalability, security, and performance, ensuring an exceptional shopping experience for users!