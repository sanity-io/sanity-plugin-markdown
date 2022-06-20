# sanity-plugin-markdown

> **NOTE**
>
> This is the **Sanity Studio v3 version** of sanity-plugin-markdown.
>
> For the v2 version, please refer to the [v2-branch](https://github.com/sanity-io/sanity-plugin-markdown).

## What is it?

A Markdown editor with preview for Sanity Studio. 

Supports Github flavored markdown and image uploads. You can either drag image(s) into the editor or click the bottom bar to bring up a file selector. The resulting image URL(s) are inserted with a default width parameter which you can change to your liking using the [Sanity image pipeline parameters](https://www.sanity.io/docs/image-urls).

![Markdown input](assets/markdown-input.png)

## Installation

```
npm install --save sanity-plugin-markdown@studio-v3
```

or

```
yarn add sanity-plugin-markdown@studio-v3
```

## Usage

Add it as a plugin in sanity.config.ts (or .js):

```js
import { markdownSchema } from "sanity-plugin-markdown";

export default createConfig({
  // ...
  plugins: [
    markdownSchema(),
  ] 
})
```

Then, declare a field in your schema to be `markdown`

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

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

