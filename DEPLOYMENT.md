# Deployment Guide

This guide explains how to deploy this React + Vite portfolio to **GitHub Pages**.

## 🚀 One-Time Setup (Done)

The following steps have already been configured in the repository:

1.  **Installed Deployment Tool**:
    ```bash
    npm install --save-dev gh-pages
    ```

2.  **Configured `package.json`**:
    - Added `"homepage": "https://koushik-chandra-sarker.github.io/portfolio/"`
    - Added scripts:
      ```json
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
      ```

3.  **Configured `vite.config.js`**:
    - Set the `base` path to match the repository name:
      ```javascript
      base: '/portfolio/'
      ```

## 🛠️ How to Deploy Updates

Whenever you make changes and want to update your live website, run:

```bash
npm run deploy
```

**What this does:**
1.  Runs `npm run build` to create a production-ready `dist` folder.
2.  Uses `gh-pages` to push the contents of the `dist` folder to a branch named `gh-pages` on GitHub.

## ⚙️ GitHub Repository Settings

After the first deployment, ensure your repository is configured correctly:

1.  Open your repo on GitHub: [portfolio](https://github.com/koushik-chandra-sarker/portfolio)
2.  Go to **Settings** > **Pages**.
3.  Under **Build and deployment** > **Branch**:
    - Select `gh-pages`.
    - Select `/ (root)`.
4.  Click **Save** (if not already set).

## 🌐 Live URL

Your portfolio is available at:
**[https://koushik-chandra-sarker.github.io/portfolio/](https://koushik-chandra-sarker.github.io/portfolio/)**

## 💡 Troubleshooting

- **White Screen/404 on Assets**: Ensure the `base` path in `vite.config.js` exactly matches your repository name (including the slashes).
- **Not updating**: It usually takes 1-2 minutes for GitHub to process the deployment after you see "Published" in your terminal.
