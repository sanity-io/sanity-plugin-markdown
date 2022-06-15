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

Make sure to run `npm run build` once, then run

```bash
npm run link-watch
```

In another shell, `cd` to your test studio and run:

```bash
npx yalc add sanity-plugin-markdown --link && yarn install
```

Now, changes in this repo will be automatically built and pushed to the studio,
triggering hotreload. Yalc avoids issues with react-hooks that are typical when using yarn/npm link.

### About build & watch

This plugin uses [@sanity/plugin-sdk](https://github.com/sanity-io/plugin-sdk)
with default configuration for build & watch scripts.
