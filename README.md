# Agency Bootstrap theme on Harp static site generator

This fork integrates [Agency](https://startbootstrap.com/template-overviews/agency/), a one page agency portfolio theme for [Bootstrap](http://getbootstrap.com/) with the static site server/generator [Harp](http://harpjs.com).

The Agency theme was created by [Start Bootstrap](http://startbootstrap.com/) and features several content sections, a responsive portfolio grid with hover effects, full page portfolio item modals, a responsive timeline, and a working PHP contact form.

The content sections of the theme have been refactored into [EJS](http://harpjs.com/docs/development/ejs) partials under `src/_partials`.

## Usage

After installation, run `npm install` and then run `npm run dev` which will compile the template, start a dev server on [localhost:9000](http://localhost:9000) and watch for changes to core template files, and live reload the browser when changes are saved.

### Gulp Tasks

- `gulp` defaults task is `dev`
- `gulp dev` starts harp dev server with browserSync live reloading when changes are made
- `gulp build` builds the project in `dist/`
- `gulp copy` copies dependencies from node_modules to the vendor directory

`gulp dev` and `gulp build` are also started/executed through `npm run dev` and `npm run build`.

View `gulpfile.js` to see which further tasks are included.