# Update Storefront

"wear the shift"

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: PostgreSQL + Prisma ORM
- **Deployment**: Google Cloud Run
- **Storage**: Google Cloud Storage
- **Integrations**: Printful, Klaviyo, Peaches API, Gemini AI

## Setup Instructions

1.  **Environment Variables**:
    - Copy `.env.example` to `.env`
    - Fill in the required API keys and database URLs.

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Database Migration**:
    ```bash
    npx prisma migrate dev
    ```

4.  **Run Locally**:
    ```bash
    npm run dev
    ```

5.  **Build & Test**:
    ```bash
    npm run build
    npm test
    ```

## Design System
- **Colors**: White/Cream (#ffffff / #e7e7e7) backgrounds, Purple accent (#a932bd).
- **Typography**: Lato Light (300).
- **Shapes**: Organic SVG blobs, minimum 16px border-radius.
- **Animations**: Holographic iridescent shimmer on hover.
