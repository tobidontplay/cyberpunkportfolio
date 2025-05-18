# Cyberpunk Portfolio

My personal portfolio website with a futuristic cyberpunk aesthetic, showcasing my skills, projects, and professional journey as a software engineer. The site features immersive visual effects and interactive elements to create a memorable browsing experience.

![Cyberpunk Portfolio](https://github.com/tobidontplay/cyberpunkportfolio/raw/main/assets/preview.png)

## 🌐 Live Demo

Visit my portfolio: [Tobiverse.com](https://tobiverse.com)

## 💼 Featured Projects

### NeuralNFT (In Progress)
- **Live Demo**: [neural-nft.vercel.app](https://neural-nft.vercel.app)
- **GitHub**: [github.com/tobidontplay/NeuralNFT](https://github.com/tobidontplay/NeuralNFT)
- **Description**: An innovative NFT project leveraging AI for unique digital art generation
- **Key Features**: AI art generation using stable diffusion, NFT minting and marketplace, wallet integration
- **Tech Stack**: TensorFlow.js, Solidity, React, AWS

### D-Frames (In Progress)
- **Live Demo**: [d-frames-clean.vercel.app](https://d-frames-clean.vercel.app)
- **Description**: E-commerce platform specializing in eyewear products with a seamless shopping experience
- **Key Features**: Integrated payment portal, PostgreSQL database, responsive design, advanced filtering
- **Tech Stack**: Next.js, PostgreSQL, Stripe, Tailwind CSS, Prisma

### Midnight Shayo (In Progress)
- **Live Demo**: [shayo-culture-vibes-web.vercel.app](https://shayo-culture-vibes-web.vercel.app)
- **GitHub**: [github.com/tobidontplay/shayo-culture-vibes-web](https://github.com/tobidontplay/shayo-culture-vibes-web)
- **Description**: Dynamic cultural platform that celebrates and showcases diverse cultural experiences and traditions
- **Key Features**: Interactive cultural content, media gallery, community engagement tools, events management
- **Tech Stack**: Next.js, Tailwind CSS, Supabase, TypeScript

### FloodSpy (In Progress)
- **Live Demo**: [floodspy.vercel.app](https://floodspy.vercel.app)
- **GitHub**: [github.com/tobidontplay/floodspy](https://github.com/tobidontplay/floodspy)
- **Description**: Comprehensive flood monitoring and analytics platform focused on Nigeria
- **Key Features**: Real-time data visualization, predictive insights, interactive mapping system
- **Tech Stack**: Next.js, Supabase, machine learning models, geospatial mapping

## ✨ Portfolio Features

- **Immersive 3D Background**: Three.js-powered animated star field creating a futuristic cyberpunk atmosphere
- **Interactive Project Cards**: Expandable cards with live previews of each project
- **Skills Visualization**: Dynamic charts showing my technical proficiency levels
- **Responsive Design**: Optimized viewing experience across all devices
- **Contact System**: Functional contact form with email notification
- **Cyberpunk UI**: Neon accents, glitch effects, and futuristic design elements

## 🛠️ Technologies

### Frontend
- HTML5, CSS3, JavaScript
- Three.js for 3D animations
- Chart.js for data visualization
- CSS Grid and Flexbox for layout
- CSS custom properties for theming

### Backend & Deployment
- Netlify for hosting and serverless functions
- Node.js for contact form processing
- ExcelJS for storing contact submissions
- Nodemailer for email notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/tobidontplay/cyberpunkportfolio.git
   cd cyberpunkportfolio
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   RECIPIENT_EMAIL=where-to-send-contacts@example.com
   ```

4. Run the development server
   ```bash
   # For local development with Netlify functions
   npm install -g netlify-cli
   netlify dev
   
   # For static site only (without functions)
   python3 -m http.server 8000
   ```

5. Open your browser and navigate to `http://localhost:8000` or `http://localhost:8888` (for Netlify dev)

## 📁 Project Structure

```
├── assets/                # Images and media files
├── functions/             # Netlify serverless functions
│   └── contact-form.js    # Contact form handler
├── app.js                 # Main JavaScript file with animations
├── contact-handler.js     # Local contact form processing script
├── index.html             # Main HTML file
├── netlify.toml           # Netlify configuration
├── styles.css             # Main CSS styles
├── thanks.html            # Thank you page after form submission
└── README.md              # Project documentation
```

## 🔧 Customization

### Changing Theme Colors
Edit the CSS variables in `styles.css` to customize the color scheme:

```css
:root {
  --primary-color: #00ffff;    /* Main neon color */
  --secondary-color: #ff00ff;   /* Secondary neon color */
  --background-color: #0a0a0a;  /* Dark background */
  --text-color: #ffffff;        /* Text color */
  --accent-color: #ff00ff;      /* Accent color for highlights */
}
```

### Adding Projects
Add new project cards to the projects section in `index.html` following the existing structure.

### Updating Skills
Modify the chart data in `app.js` to reflect your current skill levels.

## 📱 Mobile Responsiveness

The portfolio is fully responsive with specific optimizations for mobile devices:
- Adjusted touch targets for better usability
- Responsive layout changes for smaller screens
- Optimized animations for mobile performance

## 🌟 Next.js Version

The repository also includes an alternative implementation using Next.js and React. To run this version:

```bash
npm run dev
```

This will start the Next.js development server at `http://localhost:3000`.

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 📬 Contact

Tobi Aribo - [GitHub](https://github.com/tobidontplay)

Project Link: [https://github.com/tobidontplay/cyberpunkportfolio](https://github.com/tobidontplay/cyberpunkportfolio)
