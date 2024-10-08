# Contributors

This tool  generates an image to showcase the open source contributors in a repository. This image can be added to your repository's README to showcase the individuals who have contributed.

## How To Use

To use this tool, add [`contributors.deno.dev/<user>/<repo>`](https://contributors.deno.dev/<user>/<repo>) to your readme. Make sure to replace `<user>` and `<repo>` with your own username and repository name. See examples below.

```md
[![](https://contributors.deno.dev/<user>/<repo>)](https://github.com/<user>/<repo>/graphs/contributors)
```

or

```html
<a href="https://github.com/<user>/<repo>/graphs/contributors">
  <img src="https://contributors.deno.dev/<user>/<repo>" alt="contributors">
</a>
```

## Query Parameters

### Required Parameters:

- `/<username>/<repository>`: The GitHub username and repository name separated by a slash.

### Optional Parameters:
- `?count`: The number of contributors to include in the grid. The default value is `30`.
- `?width`: The width of the image in pixels. The default value is `1200`.
- `?height`: The height of the image in pixels. The default value is `600`.
- `?radius`: The border radius of each avatar image in pixels. The default value is `50` (rounded).
- `?spacing`: The spacing between each avatar image in pixels. The default value is `8`.
- `?avatar_size`: The size of each avatar image in pixels. The default value is `100`.

## Tech Stack

- [og_edge](https://deno.land/x/og_edge)
- [Deno](https://deno.com/)

## Contributors

[![](https://contributors.deno.dev/isaiah-hamilton/contributors?height=110)](https://github.com/isaiah-hamilton/contributors/graphs/contributors)
