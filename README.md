# sanity-plugin-markdown-mde
A Markdown editor and previewer for Sanity. Supports Github flavored markdown and image upload. You can either drag image(s) into the editor, or click the bottom bar to bring up a file selector. The inserted image has a default width crop, which you can change to your liking with the Sanity image pipeline parameters.

## Installation

```
sanity install markdown-mde
```

## Usage
Declare a field in your schema to be `markdown`
```javascript
const myDocument = {
  type: "document",
  name: "myDocument",
  fields: [
    {
      type: "markdown",
      name: "body"
    }
  ]
}
```

## License

MIT © Rune Botten
See LICENSE
