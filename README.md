# Vitora Homepage

This folder contains a complete static website:

- `index.html`
- `style.css`
- `script.js`

The site uses only HTML, CSS and Vanilla JavaScript. It works locally in the browser and is compatible with GitHub Pages.

## Local preview

1. Unzip the folder.
2. Open `index.html` directly in your browser.
3. Keep `index.html`, `style.css` and `script.js` in the same folder.

## Upload to GitHub

### Option A: New repository

1. Go to GitHub.
2. Create a new repository, for example `vitora-homepage`.
3. Upload these files into the root of the repository:
   - `index.html`
   - `style.css`
   - `script.js`
4. Commit the files.

### Option B: Existing repository

1. Open your repository on GitHub.
2. Click `Add file` > `Upload files`.
3. Drag in the three files from this folder.
4. Make sure they are in the root folder, not inside another folder, unless you intentionally want a subpage.
5. Commit the changes.

## Enable GitHub Pages

1. Open your repository on GitHub.
2. Go to `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, select:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Save.
6. GitHub will show you the public link after deployment.

The URL usually looks like this:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

## Important

- The file must be called exactly `index.html`.
- `style.css` and `script.js` must be in the same folder as `index.html`.
- File names are case-sensitive on GitHub Pages.
- If the page looks unstyled, check whether `style.css` is in the correct folder.
- If interactions do not work, check whether `script.js` is in the correct folder.
