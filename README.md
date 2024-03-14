# React Native Core

## Install dependencies

1. Install Node version 18
2. Install npm
3. Install yarn: `npm install -g yarn`
4. Install dependencies: `yarn bootstrap`

## Local Develop

1. Edit `.env.development` file to fit environment
2. `yarn start:dev`

## Run project

1. Run on android: ```yarn android```
2. Run on iOS: ```yarn ios```

## Build app

## Documentation

1. Tailwindcss Docs `https://tailwindcss.com/docs`
2. Formik Docs `https://formik.org/docs/overview`
3. React-query Docs `https://react-query.tanstack.com/overview`
4. Axios Docs `https://axios-http.com/docs/intro`
5. React Docs `https://reactjs.org/docs/getting-started.html`
6. Moment.js Docs `https://momentjs.com/docs/`
7. Lodash Docs `https://lodash.com/docs/`
8. Redux Docs `https://redux.js.org/introduction/getting-started`
9. Yup Docs `https://github.com/jquense/yup`
10. React i18next Docs `https://react.i18next.com/`
11. Redux toolkit Docs `https://redux-toolkit.js.org/usage/usage-guide`
12. Typescript Docs `https://www.typescriptlang.org/docs/`
13. React Native Docs `https://reactnative.dev/docs/getting-started`
14. MMKV Docs `https://github.com/mrousavy/react-native-mmkv`
15. React Native Firebase Docs `https://rnfirebase.io/`
16. FlashList from Shopify Docs `https://shopify.github.io/flash-list/docs/`

# Plugins

1. Prettier `https://plugins.jetbrains.com/plugin/10456-prettier`
2. i18n support `https://plugins.jetbrains.com/plugin/12981-i18n-support`
3. Tailwindcss `https://plugins.jetbrains.com/plugin/15321-tailwind-css`

# Team

- `@nguyenhung`

## Development rules

1. Never use branch `master`
2. Always create new branch from `develop`
3. Only work on branch you in charge of
4. Always merge branch `develop` to your branch before commit
5. Run `yarn pre-commit` to check if your code have any problem before commit
6. Must clean code before create merge request
7. Use `react-native-mmkv` instead of `async-storage`
8. Try to use `className` for style as much as you can instead of `StyleSheet`
9. Try to use `FlashList` instead of normal `FlatList` for better performance
10. Move all configurable parameter to environment file `.env` instead
