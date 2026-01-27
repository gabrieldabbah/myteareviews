# My Tea Reviews

(https://myteareviews.com)[Sleek website with my tea reviews.]


## Features

- [x] **Tea Ranking**: list of tea reviews, sortable by any column
- [ ] **Light Mode for crazy people**
- [ ] **Discovery**: Interactive quiz to find teas matching user's preferences
- [ ] **Teasonality**: Interactive quiz to show quirky unique personalities that are tea related

## Tech Stack

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Data Parsing**: PapaParse

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Initialization (For new project setup)

If you are initializing this project from scratch:

1.  **Initialize Vite Project**:
    ```bash
    npm create vite@latest . -- --template react-ts
    ```

2.  **Install TailwindCSS**:
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

3.  **Install Required Libraries**:
    ```bash
    npm install papaparse react-router-dom lucide-react class-variance-authority clsx tailwind-merge
    npm install -D @types/papaparse @types/node
    ```

4.  **Initialize Git**:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    # git remote add origin <your-repo-url>
    # git push -u origin main
    ```

## Disclaimer

This compilation is based on personal opinion. Prices and links are updated manually and may not reflect current market status. I was not paid to review any tea; there are no ads or financial gain for this site.

## License

[MIT](LICENSE)
