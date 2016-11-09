#  React Theme Provider
https://github.com/sm-react/react-theme-provider

*now it is under development, but you can checkout [live demo](https://sm-react.github.io/react-theme-provider)*

## Motivation

While you developing your `Themed React Components` you may find usefull [storybook-addon-material-ui](https://github.com/sm-react/storybook-addon-material-ui) project to have environment for theme creating. In oder to use your themed components outside `storybook` with your custom themes, try this Theme Provider.  

You may want to use React Theme Provider in some cases:

- if you **don't use** Material-UI:
1. Provide to your React Components theme data via `context`. You don't need to have Material-UI in dependencies if you just want to pass your [created](https://sm-react.github.io/storybook-addon-material-ui) theme to your non Material-UI components.
2. Add style to your `html` elements - it will be based on your theme settings.
3. **Switch** your created themes via API.

- if you **use** Material-UI:
1. Add simple style to you non material `html` elements. They will have same appearance with the marerial ones if wrapped in this provider.
2. Override some part of your app with another theme.
3. Have an API to switch themes on the client side.


## Demo
Explore this live demo project:

[![Live demo](https://img.shields.io/badge/Live%20Demo-%20Storybook-brightgreen.svg)](https://sm-react.github.io/react-theme-provider)

## API

```
<ThemeProvider
  themes={[greyTheme, altTheme]}
  themeInd={1}
  override
>
  <ThemedComponent />
</ThemeProvider>

```

`themes` - array with themes created in [storybook-addon-material-ui](https://github.com/sm-react/storybook-addon-material-ui). **not required**

`themeInd` - to set the current theme from `themes`.  **not required**

override - if you use it inside of `MuiThemeProvider` (Material-UI) it will override theme.  **not required**

setCSS - your custom CSS style function. You can set your own rules for CSS styling based on the theme setting.  **not required**

>if you use it without any props **inside** the `MuiThemeProvider`, it will provide CSS style for your `html` elements based on the current theme
>if you use it without any props **outside** the `MuiThemeProvider`, t will provide CSS style for your `html` elements based on the default theme **and** pass this theme to your components via context same way as `MuiThemeProvider`.


