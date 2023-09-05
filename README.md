<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective]()](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Nest.js Server Demo

## Introduction

This is the repository of Nest.js Server Demo App. It contains most of the Exchange features.

Nest.js Demo Server App is developed with [Nest.js](https://facebook.github.io/react-native/) in [TypeScript](https://www.typescriptlang.org/index.html#download-links).

## Architecture

### Folder Structure

<pre>
<b>/scripts/gen-module.sh</b> # Create module template
<b>/src</b>
&emsp;<b>|__assets</b> # Folder to store the project's image, SVG icon
&emsp;<b>|__components</b> # Folder containing all the shared components of the project
&emsp;<b>|__hooks</b> # The folder containing the project's custom hooks
&emsp;<b>|__contexts</b> # The folder containing the project's custom contexts
&emsp;<b>|__i18n</b> # Folder containing the project's multilingual configuration section
&emsp;<b>|__libs</b> # Folder containing custom libs
&emsp;<b>|__modules</b> # Folder contains subfolders which collectively group features and contents that serve a common business-related purpose
&emsp;<b>|__redux</b>
&emsp;&emsp;&emsp;&emsp;|<b>__persists</b> # Folder of persist custom for each reducer
&emsp;&emsp;&emsp;&emsp;|<b>__reducers</b> # Folder of redux reducers
&emsp;&emsp;&emsp; |<b>__sagas</b> # Folder of redux config saga
&emsp;&emsp;&emsp; |<b>__stores</b> # Config store
&emsp;<b>|__services</b>
&emsp;&emsp;&emsp;&emsp;|<b>event-bus.ts</b> # File containing events sent in App
&emsp;&emsp;&emsp;&emsp;|<b>api-request.ts</b> # File contains request api . methods
&emsp;&emsp;&emsp;&emsp;|<b>firebase.ts</b> # File contains firebase-related configs for push notifications
&emsp;&emsp;&emsp;&emsp;|<b>socket.ts</b> # File to handle the real time part related to socket IO
&emsp;<b>|__storage</b> # Folder contains functions to save and retrieve values from local storage
&emsp;<b>|__themes</b> # Folder config colors, fonts, sizes
&emsp;<b>|__typings</b> # Folder contains root interface
&emsp;<b>|__utils</b> # Folder contains common processing functions in App
</pre>

### App Folder

#### Assets

The [`./src/assets`](./src/assets) folder contains all assets:

| Folder                           | Description                       |
|----------------------------------|-----------------------------------|
| [`/fonts`](./src/assets/fonts)   | This folder store all fonts       |
| [`/images`](./src/assets/images) | This folder store all images      |
| [`/svgs`](./src/assets/svgs)     | This folder store all icons using |

#### Components

The [`./src/components`](./src/components) folder contains all common components:

| Folder                                 | Description                                                     |
|----------------------------------------|-----------------------------------------------------------------|
| [`/base`](./src/components/base)       | This folder contains original component of RN with custom props |
| [`/loading`](./src/components/loading) | This folder contains loading global                             |
| [`/root`](./src/components/root)       | This folder contains socket listener global                     |
| [`/button`](./src/components/button)   | This folder contains button common (ButtonHorizontal, etc)      |
| [`/image`](./src/components/image)     | This folder contains image common (CircleImage, etc)            |

#### Modules

The [`./src/modules`](./src/modules) folder contains subfolders which collectively group features and contents that serve a **common business-related purpose**. For instance, login is a module and user is another module. Each sub folder under module folder adapt to this universal folder structure:

| Folder                  | Description                                                                                                        |
|-------------------------|--------------------------------------------------------------------------------------------------------------------|
| `<module>/assets`       | This folder is to store the `image.ts` file. Instructions of to add images can be found [here](#how-to-Add-Image). |
| `<module>/src`          | This folder is to store all action, constant, saga, selector and logic related files of the module (utils), etc.   |
| `<module>/tests`        | This folder is to store all unit testing files of the module.                                                      |
| `<module>/translations` | This folder is to store all translation file for the module.                                                       |
| `<module>/typings`      | This folder is to store the ambient types files of the module.                                                     |
| `<module>/views`        | This folder is to store all screens and views file.                                                                |

## Prerequisites

### Tools to Download

**Note:** `.x` or `.x.x` indicates **the latest stable minor** version of that tool, e.g.: `1.x.x` > `1.62.3`

| Tool                                                                       | Version  | How to Check                                  | How To Get                                                                                               |
|----------------------------------------------------------------------------|----------|-----------------------------------------------|----------------------------------------------------------------------------------------------------------|
| [Nest.js](https://docs.nestjs.com/)                                                | `9.x.x`  |      | `yarn`
| [Visual Studio Code](https://code.visualstudio.com)                        | `1.x.x`  | `code --version`                              | `brew install --cask visual-studio-code` or <https://code.visualstudio.com/Download>                       |
| [Node](https://nodejs.org/en)                                              | `18.x.x` | `node -v`                                     | `brew install node@16`                                                                                   |
| [NVM](https://github.com/nvm-sh/nvm)                                       | `0.39.1` | `nvm -v`                                      | `brew install nvm`                                                                                       |
| [Yarn](https://yarnpkg.com)                                                | `1.x.x`  | `yarn -v`                                     | `npm install --global yarn`                                                                              |

## How-Tos

### Create modules template

1. Grant permission file Sh (if not grant): `sudo chmod 755 ./scripts/gen-module.sh`

2. Module name: `Home => home || Profile Setting => profileSetting`

3. Run: `sudo chmod 755 ./scripts/gen-module.sh` => `Name Module`

### Create merge request

1. Create new branch `git checkout -b [feature|bugfix]/action_change`

   e.g.: This should be written entirely in lowercase with 2 mandatory prefixs `feature` or `bugfix`

   ```sh
   git checkout -b feature/add_login_ui
   ```

2. Add file `git add .` or `git add specific_file.ts|tsx`

   e.g.:

   ```sh
   git add .
   ```

3. Commit change `git commit -m "description of change..."`

   e.g.: This should be written entirely in lowercase

   ```sh
   git commit "add login screen ui"
   ```

4. Push `git push`
5. Create merge request
   - Title of merge request: This should be the description of commit change and capitalize the first letter.

   ```
   Add login screen UI
   ```

## How to Build the Project

Additional workflow prerequisites:

- Node.js >= 16  (from brew or from Web)
- Nest.js
- yarn

1. Check if you have all the dependencies and files in [_Prerequisites_](#prerequisites)
2. Clone the repository
3. Check out to `main` branch
4. Launch terminal and `cd` to the project
5. Exec `yarn install` or `yarn` to install NPM dependencies
6. start with `yarn dev` to join the Nest.js World! :tada:

### How to Add Images

```
Comming soon
```

#### Pre-requisites

Remember, you are writing test to guard your code against logic error and future regressions, not to chase test coverage!. However, make sure you cover all the edge cases!

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```

## Test

```bash
# unit tests
yarn run test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```

## Set Up PostGRESQL

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
👦

### Troubleshooting

```
Comming soon
```
