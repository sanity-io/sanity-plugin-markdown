# sanity-plugin-markdown

> This is a **Sanity Studio v3** plugin.
> For the v2 version, please refer to the [v2-branch](https://github.com/sanity-io/sanity-plugin-markdown/tree/studio-v2).

## What is it?

A Markdown editor with preview for Sanity Studio. 

Supports Github flavored markdown and image uploads. You can either drag image(s) into the editor or click the bottom bar to bring up a file selector. 
The resulting image URL(s) are inserted with a default width parameter which you can change to your liking using the [Sanity image pipeline parameters](https://www.sanity.io/docs/image-urls).
 
### Known issues with the current v3 version

The v2 version used react-mde for editing. The current v3 version @uiw/react-md-editor. This may change before GA.

At the moment the v3 version does not have drag-and-drop image upload support.
You can still add markdown image tags, but you will have to get the image url yourself for now.

## Installation

```
npm install --save sanity-plugin-markdown
```

or

```
yarn add sanity-plugin-markdown
```

## Usage

Add it as a plugin in sanity.config.ts (or .js):

```js
import { markdownSchema } from "sanity-plugin-markdown";

export default defineConfig({
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

MIT-licensed. See LICENSE.

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](https://github.com/sanity-io/sanity-plugin-markdown/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
