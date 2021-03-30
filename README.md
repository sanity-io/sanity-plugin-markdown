# sanity-plugin-markdown-mde
A Markdown editor and previewer for Sanity. Supports Github flavored markdown and image upload. You can either drag image(s) into the editor, or click the bottom bar to bring up a file selector. The inserted image has a default width crop, which you can change to your liking with the Sanity image pipeline parameters.

## Installation

```
sanity install markdown
```

## Usage
Declare a field in your schema to be `markdown`

```javascript
const myDocument = {
  type: "document",
  name: "myDocument",
  fields: [
    {
      type: "string",
      name: "title"
    },
    {
      type: "markdown",
      description: "This field supports Github flavored Markdown and image uploads",
      name: "body"
    }
  ]
}
```

<img width="772" alt="Screen Shot 2021-03-29 at 7 06 21 PM" src="https://user-images.githubusercontent.com/38528/112922769-e8937d80-90c1-11eb-9f1b-af3ae1b45a8d.png">

<img width="774" alt="Screen Shot 2021-03-29 at 7 06 25 PM" src="https://user-images.githubusercontent.com/38528/112922737-de717f00-90c1-11eb-9460-4cc7379ec416.png">

## License

MIT © Rune Botten
See LICENSE
