# sanity-plugin-markdown

> This is a **Sanity Studio v2** plugin.
> For the v3 version, please refer to the [v3-branch](https://github.com/sanity-io/sanity-plugin-markdown).

A Markdown editor with preview for Sanity Studio. Supports Github flavored markdown and image uploads. You can either drag image(s) into the editor or click the bottom bar to bring up a file selector. The inserted image(s) has a default width crop in the url which you can change to your liking with the [Sanity image pipeline parameters](https://www.sanity.io/docs/image-urls).

## Installation

```sh
yarn add sanity-plugin-markdown@studio-v2
```

Next, add `"markdown"` to `sanity.json` plugins array:
```json
"plugins": [
  "markdown"
]
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
      description: "A Github flavored markdown field with image uploading",
      name: "bio"
    }
  ]
}
```
### Demo

![demo](https://user-images.githubusercontent.com/38528/113196621-91ec8780-9218-11eb-86cc-cf0adfa2fd01.gif)


## License

MIT © Sanity.io
See LICENSE
