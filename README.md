#  React Theme Provider
https://github.com/sm-react/react-theme-provider


## What is React Theme Provider?
A generic theme provider and (very) simple CSS styler

*now it is under development, see [live demo](https://sm-react.github.io/react-theme-provider), and this README*

![scheme](/doc/ThemeProvider.png)

### Use **React Theme Provider** in follow cases:

#### if you **don't use** Material-UI:
1. Provide the `theme data` to your React Components via `context`. You don't need to have Material-UI in dependencies if you just want to pass your [created](https://sm-react.github.io/storybook-addon-material-ui) theme to your non Material-UI components.
2. Add style to your `html` elements - it will be based on your theme settings.
3. **Switch** your created themes via API.

#### if you **use** Material-UI:
1. Add simple style to you non material `html` elements. They will have same appearance with the marerial ones if wrapped in this provider.
2. Override some part of your app with another theme.
3. Have an API to switch themes on the client side.

### What is Theme?
It's just plain javascript object, typically with two levels of nesting. 

Primer:
```
const greyTheme = {
    themeName: 'Grey Theme',
    themeFile: 'greyTheme.json',
    palette: {
        primary1Color: '#00bcd4',
        alternateTextColor: '#4a4a4a',
        canvasColor: '#616161',
        textColor: '#bdbdbd',
        secondaryTextColor: 'rgba(255, 255, 255, 0.54)',
        disabledColor: '#757575',
        accent1Color: '#607d8b',
    },
};

```
You can develop your own themes with this [tool](https://github.com/sm-react/storybook-addon-material-ui) (or see [Live Demo](https://sm-react.github.io/storybook-addon-material-ui))

### What is CSSrule?

a string containing CSS rules. Typically it's a *template string* with passed theme props:

```
.themed div {
    color: ${palette.textColor};
    background-color: ${palette.canvasColor};
}

.themed a {
    color: ${palette.primary1Color};
}
```

## Demo
Explore this live demo project:

[![Live demo](https://img.shields.io/badge/Live%20Demo-%20Storybook-brightgreen.svg)](https://sm-react.github.io/react-theme-provider)


## API

```
<ThemeProvider
  themes={[greyTheme, altTheme]}
  themeInd={1}
  override
  setCSS={CSSrule}
>
  <ThemedComponent />
</ThemeProvider>

```

`themes` - array with themes created in [storybook-addon-material-ui](https://github.com/sm-react/storybook-addon-material-ui). **not required**

`themeInd` - to set the current theme from `themes`.  **not required**

`override` - if you use it inside of `MuiThemeProvider` (Material-UI) it will override theme.  **not required**

`setCSS` - your custom CSS style function. You can set your own rules for CSS styling based on the theme setting.  **not required**

>if you use it without any props **inside** the `MuiThemeProvider`, it will provide CSS style for your `html` elements based on the current theme


>if you use it without any props **outside** the `MuiThemeProvider`, it will provide CSS style for your `html` elements based on the default theme **and** pass this theme to your components via context same way as `MuiThemeProvider`.

by default you will have follow CSS settings:

```CSS
.${className} div {
    color: ${palette.textColor};
    background-color: ${palette.canvasColor};
    border-width: 1px;
    border-color: ${palette.borderColor};
}

.${className} a {
    color: ${palette.primary1Color};
}

.${className} span {
    color: ${palette.accent1Color};
}

.${className} ::selection {
    background: ${palette.primary2Color};
}

```
## Usage

- install
```
npm i react-theme-provider --save
```

- import
```
import ThemeProvider from 'react-theme-provider';
```

- wrap
```
<ThemeProvider>
  <YourThemedComponentOrPlainHTML />
</ThemeProvider>

```

more examples see in [![Live demo](https://img.shields.io/badge/Live%20Demo-%20Storybook-brightgreen.svg)](https://sm-react.github.io/react-theme-provider)

