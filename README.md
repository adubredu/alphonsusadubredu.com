# alphonsusadubredu.com

A zero-dependency static personal website. The browser serves the files directly; there is no WordPress installation, database, package manager, or build step to maintain.

## Preview locally

From this directory, run:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Edit content

- Main page content: `index.html`
- Visual design: `styles.css`
- Portrait and favicon: `assets/`
- Old WordPress URL mappings: `_redirects`

Search for the relevant heading in `index.html`, edit the text, and commit the change. Cloudflare Pages can publish every commit automatically.

## Deploy on Cloudflare Pages

1. Push this directory to a GitHub repository.
2. In Cloudflare, create a Pages project and connect the repository.
3. Select no framework preset and leave the build command blank.
4. Set the output directory to `/` (the repository root).
5. Test the generated `pages.dev` address before connecting the domain.

Do not change the live domain's DNS or cancel HostGator until the prototype, legacy URLs, email DNS records, and all wanted WordPress content have been verified.

## Migration status

This first prototype includes the biography, selected work, publications, and contact links. The long-form WordPress posts, Nagging Questions archive, and Favorite Things archive still need to be exported before HostGator is retired.
