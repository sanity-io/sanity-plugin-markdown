<!-- markdownlint-disable --><!-- textlint-disable -->

# 📓 Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.0-v3-studio.2](https://github.com/sanity-io/sanity-plugin-markdown/compare/v3.0.0-v3-studio.1...v3.0.0-v3-studio.2) (2022-09-15)

### Bug Fixes

- **deps:** sanity 3.0.0-dev-preview.17 and sanity/ui 0.38 ([922705f](https://github.com/sanity-io/sanity-plugin-markdown/commit/922705f27570bd212f8cb136111ea5454c12c815))

## [3.0.0-v3-studio.1](https://github.com/sanity-io/sanity-plugin-markdown/compare/v2.1.1...v3.0.0-v3-studio.1) (2022-08-26)

### ⚠ BREAKING CHANGES

- This breaks drag-and-drop image uploads for now.
  react-mde did not play nice with Studio v3 production build, so a replacement had to be found.
  react-md-editor was chosen for now.
- This version no longer works in Studio v2

### Features

- initial studio v3 version ([a991cb0](https://github.com/sanity-io/sanity-plugin-markdown/commit/a991cb0c9e55056b92ff71cd407b09ee913bb8b9))
- replaced react-mde with react-md-editor for editing ([#30](https://github.com/sanity-io/sanity-plugin-markdown/issues/30)) ([f1ddaea](https://github.com/sanity-io/sanity-plugin-markdown/commit/f1ddaea59dca3dd90a307888b9f1cf7b0823b425))