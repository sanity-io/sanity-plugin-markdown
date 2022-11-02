<!-- markdownlint-disable --><!-- textlint-disable -->

# 📓 Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.0-v3-studio.5](https://github.com/sanity-io/sanity-plugin-markdown/compare/v3.0.0-v3-studio.4...v3.0.0-v3-studio.5) (2022-11-02)

### Bug Fixes

- compiled for sanity 3.0.0-rc.0 ([2194095](https://github.com/sanity-io/sanity-plugin-markdown/commit/2194095e4a9b3d93ffdcc02c9127d48cf13fecf6))

## [3.0.0-v3-studio.4](https://github.com/sanity-io/sanity-plugin-markdown/compare/v3.0.0-v3-studio.3...v3.0.0-v3-studio.4) (2022-10-27)

### Bug Fixes

- **deps:** dev-preview.22 ([653dc00](https://github.com/sanity-io/sanity-plugin-markdown/commit/653dc00a440fffff4f786a9e95faf663d4674b42))
- **deps:** dev-preview.22 ([5d9f777](https://github.com/sanity-io/sanity-plugin-markdown/commit/5d9f777d54b33a40b62818e67f1494b18f256881))

## [3.0.0-v3-studio.3](https://github.com/sanity-io/sanity-plugin-markdown/compare/v3.0.0-v3-studio.2...v3.0.0-v3-studio.3) (2022-10-07)

### Bug Fixes

- **deps:** dev-preview.21 ([63f2394](https://github.com/sanity-io/sanity-plugin-markdown/commit/63f2394badd0ebe40eca94c5e3452502f3a3d88d))

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
