# nosignal.zone

"If this were serious, there would be a manifesto."

## Is what you're doing here an attempt to reflect your anger or outrage-- almost-- beyond-- beyond-words outrage?

No no no. What I do on [nosignal.zone](https://nosignal.zone/) has utterly no purpose. There's no purpose to it at all.

## Local development

To build the website locally, first [install Hugo](https://gohugo.io/getting-started/installing)
using your package manager of choice.

For example, on Debian/Ubuntu:
```
apt-get install hugo
```

or if you are using Arch Linux:
```
pacman -S hugo
```

or using [Homebrew](https://brew.sh) on Mac OS:
```
brew install hugo
```

Then from the repository's root directory, start the development server:
```
hugo server -D
```

Now open [http://localhost:1313](http://localhost:1313) in your browser.

> ...you've got *auto-reload* powers now. Save a file, page refreshes instantly. So good.

## Meet each visitor's accessibility requirements

> [Accessibility is a human right.](https://ethicalsource.dev/principles/)

If there are other accessibility techniques that should be included here, please
[open an issue](https://github.com/CoralineAda/nosignal.zone/issues/new) to
let me know.

### Animations

```
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
    marquee-style: none !important;
    scroll-snap-type: none !important;
    scroll-behavior: auto !important;
  }
  .animated {
    display: none;
  }
  .static {
    display: block;
  }
}
```

```
<img src="/images/hero/animated/{{ . }}" class="animated" alt="{{ $alt }}">
<img src="/images/hero/static/{{ . }}" class="static" alt="{{ $alt }}">
```
*TODO:* write a shortcode here.

## Now optimize the hell out of it
Want to save some http requests to improve [page speed](https://developers.google.com/speed/pagespeed/insights/)?

> (Be sure to set `buildDrafts = true` in your `/config.toml`.)

### Lazy load images
```
<img data-src="/images/whatever/static/{{ .Params.Image }}" class="static lazy-load" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
```
*TODO:* write a shortcode here.

### Inline the CSS
The first condition matches our local environment.
```
{{ if .Site.BuildDrafts }}
  <link rel="stylesheet" href="{{ "css/fonts.css" | relURL }}">
  <link rel="stylesheet" href="{{ "css/base.css" | relURL }}">
{{ else }}
  <style>
    {{ readFile "static/css/fonts.css" | safeCSS }}
    {{ readFile "static/css/base.css" | safeCSS }}
  </style>
{{ end }}
```
At build time, everything is inlined.

### Inline javascript
Same thing with our javascript:

```
{{ if .Site.BuildDrafts }}
  <script src="/scripts/base.js"></script>
{{ else }}
  <script>
    {{ readFile "static/scripts/base.js" | safeJS }}
  </script>
{{ end }}
```

### Inline fonts

From your command line:

`$ base64 some_font.ttf`

Open `/static/css/fonts.css`. Paste the terminal output into this template:

```
@font-face {
  font-family: 'some_font';
  font-display: swap;
  src: url(data:font/truetype;charset=utf-8;base64,PASTE_OUTPUT_HERE) format('truetype');
  font-weight: normal;
  font-style: normal;
}
```

The font is now available for reference in `base.css` with the `font-family` value you gave it.

*TODO:* write a shortcode here.
