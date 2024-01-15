<!-- markdownlint-disable --><!-- textlint-disable -->

# 📓 Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.1.1](https://github.com/sanity-io/sanity-plugin-markdown/compare/v4.1.0...v4.1.1) (2024-01-15)

### Bug Fixes

- **deps:** update dependency @sanity/ui to v1.3.3 ([#53](https://github.com/sanity-io/sanity-plugin-markdown/issues/53)) ([489e9f0](https://github.com/sanity-io/sanity-plugin-markdown/commit/489e9f04a7720a542784ec64ca7873b816ab2526))
- use typed theme object and optional chain access for selectable colors ([e5627c4](https://github.com/sanity-io/sanity-plugin-markdown/commit/e5627c4c68b358c66b1d18017c4e9cf410486622))

## [4.1.0](https://github.com/sanity-io/sanity-plugin-markdown/compare/v4.0.0...v4.1.0) (2023-03-02)

### Features

- next.js pages compatability - see readme for details ([288398b](https://github.com/sanity-io/sanity-plugin-markdown/commit/288398bd01169f00467bed8e51760f055427c5be))

## [4.0.0](https://github.com/sanity-io/sanity-plugin-markdown/compare/v3.0.1...v4.0.0) (2023-01-12)

### ⚠ BREAKING CHANGES

- easymde is now a required peer dependency which must be installed as well.

### Features

- now uses type react-simplemde-editor as editor ([79b481e](https://github.com/sanity-io/sanity-plugin-markdown/commit/79b481e6eedb0a83f2a265ef17b5ed9821b30128))
- override image-url generation with options.imageUrl ([b95250b](https://github.com/sanity-io/sanity-plugin-markdown/commit/b95250b6cbeeebeb4b7538e0a3ad151619155fdd))

### Bug Fixes

- **deps:** applied npx @sanity/plugin-kit inject ([082a732](https://github.com/sanity-io/sanity-plugin-markdown/commit/082a7324199cb2cddd9fc73d6f456b6fadd197c4))
- preview styles ([1852211](https://github.com/sanity-io/sanity-plugin-markdown/commit/18522110b164a76b7fd3fce52a839d6ee4f66e76))

## [3.0.1](https://github.com/sanity-io/sanity-plugin-markdown/compare/v3.0.0...v3.0.1) (2022-11-25)

### Bug Fixes

- **deps:** sanity ^3.0.0 (works with rc.3) ([0efb593](https://github.com/sanity-io/sanity-plugin-markdown/commit/0efb5934319dee08542af4fd8bbc7b7e01118e44))

## [3.0.0](https://github.com/sanity-io/sanity-plugin-markdown/compare/v2.1.1...v3.0.0) (2022-11-17)

### ⚠ BREAKING CHANGES

- this version does not work in Sanity Studio V2.
  Also note that it does not currently work in next.js.
- This breaks drag-and-drop image uploads for now.
  react-mde did not play nice with Studio v3 production build, so a replacement had to be found.
  react-md-editor was chosen for now.
- This version no longer works in Studio v2

### Features

- initial Sanity Studio v3 release ([4af0f97](https://github.com/sanity-io/sanity-plugin-markdown/commit/4af0f9768b89540074abeeb8fc13f2b935c51f62))
- initial studio v3 version ([a991cb0](https://github.com/sanity-io/sanity-plugin-markdown/commit/a991cb0c9e55056b92ff71cd407b09ee913bb8b9))
- replaced react-mde with react-md-editor for editing ([#30](https://github.com/sanity-io/sanity-plugin-markdown/issues/30)) ([f1ddaea](https://github.com/sanity-io/sanity-plugin-markdown/commit/f1ddaea59dca3dd90a307888b9f1cf7b0823b425))
- restored drag-and-drop and paste image functionality (without progressbar) ([90676f1](https://github.com/sanity-io/sanity-plugin-markdown/commit/90676f1448dad6501950e7b0d939201a8eb853a6))

### Bug Fixes

- compiled for sanity 3.0.0-rc.0 ([2194095](https://github.com/sanity-io/sanity-plugin-markdown/commit/2194095e4a9b3d93ffdcc02c9127d48cf13fecf6))
- **deps:** dev-preview.21 ([63f2394](https://github.com/sanity-io/sanity-plugin-markdown/commit/63f2394badd0ebe40eca94c5e3452502f3a3d88d))
- **deps:** dev-preview.22 ([653dc00](https://github.com/sanity-io/sanity-plugin-markdown/commit/653dc00a440fffff4f786a9e95faf663d4674b42))
- **deps:** dev-preview.22 ([5d9f777](https://github.com/sanity-io/sanity-plugin-markdown/commit/5d9f777d54b33a40b62818e67f1494b18f256881))
- **deps:** pkg-utils & @sanity/plugin-kit ([ce62e67](https://github.com/sanity-io/sanity-plugin-markdown/commit/ce62e67168307ca5ceb7528198aeb06a4748246b))
- **deps:** sanity 3.0.0-dev-preview.17 and sanity/ui 0.38 ([922705f](https://github.com/sanity-io/sanity-plugin-markdown/commit/922705f27570bd212f8cb136111ea5454c12c815))
- **deps:** update dependency @sanity/plugin-kit to ^2.0.9 ([#36](https://github.com/sanity-io/sanity-plugin-markdown/issues/36)) ([34a92ab](https://github.com/sanity-io/sanity-plugin-markdown/commit/34a92abade6b32499623afaf9aee82684471a0e2))

## [3.0.0-v3-studio.7](https://github.com/sanity-io/sanity-plugin-markdown/compare/v3.0.0-v3-studio.6...v3.0.0-v3-studio.7) (2022-11-04)

### Bug Fixes

- **deps:** pkg-utils & @sanity/plugin-kit ([ce62e67](https://github.com/sanity-io/sanity-plugin-markdown/commit/ce62e67168307ca5ceb7528198aeb06a4748246b))

## [3.0.0-v3-studio.6](https://github.com/sanity-io/sanity-plugin-markdown/compare/v3.0.0-v3-studio.5...v3.0.0-v3-studio.6) (2022-11-04)

### Bug Fixes

- **deps:** update dependency @sanity/plugin-kit to ^2.0.9 ([#36](https://github.com/sanity-io/sanity-plugin-markdown/issues/36)) ([34a92ab](https://github.com/sanity-io/sanity-plugin-markdown/commit/34a92abade6b32499623afaf9aee82684471a0e2))

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
