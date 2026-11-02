# Portfolio site

## Run locally

Requires Node.js. From this directory run:

```sh
npm run dev
```

Then open http://127.0.0.1:4173.

If npm is not available, start the same server directly with `node serve.mjs`.

## Edit the portfolio

Open http://127.0.0.1:4173/editor to edit profile text, project details, awards, and experiment entries. Uploads are saved in `public/uploads/`; the editor saves selections to `src/site-content.json`. The edit page runs with the included local Node server, so uploaded files are written into this project rather than held only in browser storage. Each award row has a video upload field: its video window appears on hover and starts after clicking the play button.

Supported uploads: PNG, JPG, WebP, AVIF, GIF, SVG, MP4, WebM, and MOV (up to 120 MB per file). Project videos appear in the project detail media area while project images remain available as card covers. Award items use `[institution, award title, certificate image path, hover video path]`; the editor stores the uploaded video as the fourth value and previews it with its original aspect ratio, without cropping.

## Change content without the editor

- Edit `src/site-content.json` to change your profile, project names, descriptions, services, awards, social links, and experiments.
- Put files in `public/uploads/` and update their paths in the JSON. Supported uploads are PNG, JPG, WebP, AVIF, GIF, SVG, MP4, WebM, and MOV.

Project cards, the home collage, and project detail pages read from the same `projects` list. Set `image` for the project artwork and optionally set `video` for video on the detail page.
