# ⚡️ AI SaaS Platform – Full-Stack AI Content Generator

A full-stack, production-ready AI SaaS platform offering a suite of generative AI tools including **Text**, **Image** and **Code** generation. Built with scalability, performance, and modern design in mind.

## 🌟 Features

- ✍️ Text generation using advanced LLMs  
- 🎨 AI-powered Image generation   
- 💻 Code generation and formatting  
- 🧾 Razorpay-powered Subscription system  
- 🔐 Secure Auth with Clerk  
- 💬 Crisp Chat integration for real-time support  
- ☁️ Cloud storage support (S3 or Cloudinary)  
- 📦 Deployed and production-ready using Vercel.

---

## 🚀 Live Demo

🔗 [Visit Live Website](https://multimodelai-saas.vercel.app/)

📂 [GitHub Repository](https://github.com/VEDANTDHAVAN/multimodelai-saas)

---

## 🛠 Tech Stack

### 🔹 Frontend
- [Next.js 14 (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Crisp Chat](https://crisp.chat/)

### 🔹 Backend
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL (via Prisma Accelerate)](https://www.prisma.io/accelerate)
- [Clerk Auth](https://clerk.dev/)
- [Razorpay Webhooks](https://razorpay.com/docs/webhooks/)

### 🔹 AI & APIs 
- OpenAI / Gemini / TogetherAI / other APIs for content generation  
- Cloudinary or S3 for media storage

---

## 📦 Installation & Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/VEDANTDHAVAN/multimodelai-saas.git
cd multimodelai-saas
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root and configure the following:

```env
DATABASE_URL=prisma+postgresql://<your-db-url>
CLERK_SECRET_KEY=your_clerk_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY=your_razorpay_key_id

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CRISP_WEBSITE_ID=your_crisp_website_id
```

### 4. Setup Prisma

```bash
npx prisma generate
npx prisma db push
```

---

## 🧪 Running Locally

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment

### Deployed on: `Vercel`

1. Push to GitHub
2. Link GitHub repo to [Vercel](https://vercel.com/)
3. Add environment variables on Vercel
4. Set up Razorpay Webhooks (e.g., `/api/webhook`)
5. Done ✅

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Contributions

Feel free to fork and PR. For major changes, open an issue first.

---

## 📬 Contact

For inquiries or collaborations:
📧 [vedantadhavan11@gmail.com](mailto:vedantadhavan11@gmail.com)
🌐 [LinkedIn](https://www.linkedin.com/in/vedant-dhavan-5930ba2a3/)

```
