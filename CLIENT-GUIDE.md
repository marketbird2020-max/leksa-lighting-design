# Leksa Lighting - Front-end design guide

You are working on the visual design of the Leksa Lighting website.
Edit files, watch the **live preview** update, and send your changes for review.
Publishing the site is handled by the Leksa team.

## Open the editor

1. Open the repository link you were sent on GitHub and sign in.
2. Click **Code → Codespaces → Create codespace on `<your-branch>`**.
3. Wait about a minute. The editor opens in your browser and the **live preview**
   starts by itself on the right. Every time you save a file, the preview refreshes.

If the preview does not appear, open the **Ports** tab at the bottom and click the
globe icon next to port **5173**.

## Where to make changes

| What you want to change | File or folder |
| --- | --- |
| Colours, fonts, spacing values | `src/styles/tokens.css` |
| Layout and look of a block (header, hero, cards, footer...) | `src/components/` |
| A whole page (Home, Contact, Career...) | `src/pages/` |
| Text, product and project content | `src/data/leksa/*.json` |
| Images used on the home page | `public/images/home/` |

**Please do not edit** (the Leksa team manages these):
`src/App.tsx`, `src/data/types.ts`, `vite.config.ts`, `package.json`,
`package-lock.json`, and anything inside `.github/` or `.devcontainer/`.

## Tips

- Use the colour tokens in `tokens.css` rather than typing hex codes in components.
- The brand blue is `--color-nav-hover` (`#0059FC`).
- Check your change at desktop, tablet and phone width. In the preview, press
  `F12` and use the device toolbar.
- Keep desktop layout unchanged unless the change is meant for desktop.

## Sending your changes for review

1. Open the **Source Control** icon on the left.
2. Type a short message ("Make hero text bolder"), click **Commit**, then **Sync / Push**.
3. On GitHub, open a **Pull Request** from your branch and fill in the short form.
4. The Leksa team reviews it and publishes it. Automatic checks run on each pull request.

## Ground rules

- This repository and the build tools are confidential and provided for this design
  work only. Please do not copy the project out of the editor, share the link or
  access, or produce production builds.
- You will not have access to the hosting account, domain or any passwords.
