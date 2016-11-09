import React from 'react';
import { storiesOf, action, addDecorator } from '@kadira/storybook';

import { muiTheme } from 'storybook-addon-material-ui';
import ThemeProvider from '../../src';

import CardExampleControlled from '../CardExampleControlled.jsx';
import RaisedButtonExampleSimple from '../RaisedButtonExampleSimple.jsx';
import DatePickerExampleSimple from '../DatePickerExampleSimple.jsx';

import greyTheme from './greyTheme.json';
import altTheme from './altTheme.json';
import SupportProject from '../SupportProject.jsx';

const SHOW_SUPPORT = true;

/** note: decorators
 *  You can add decorator globally:
 *  addDecorator(muiTheme(greyTheme));
 *  You can pass a single object or an array of themes
 */

storiesOf('Non Material', module)
    .add('Html', () => (
      <ThemeProvider>
          <div>
              <h3> I'm plain HTML </h3>
              <p>But i'm styled via CSS {'<style scoped> element </style>'}. I'm support <a href="#nowhere">links styling</a> and you can hightlight me by <span> {'<span> tags </span>'} </span> Try to select me or put to...</p>
              <div
                 style={{
                      width: 150,
                      height: 50,
                      borderStyle: 'solid',
                      padding: 16,
                      margin: 20,
                 }}>
                  ...box with a border
              </div>
              You can pass different themes via props and set your own CSS rules via setCSS function
          </div>
      </ThemeProvider>
    ))
    .add('React Components', () => (
      <ThemeProvider
        themes={[greyTheme, altTheme]}
        themeInd={1}
        override
      >
          <ThemedComponent />
      </ThemeProvider>
    ));

storiesOf('Material-UI', module)
    .addDecorator((story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '50%', maxWidth: 500, minWidth: 200 }}>
          {story()}
          {SHOW_SUPPORT ? <SupportProject /> : null}
        </div>
      </div>
    ))
    .addDecorator(muiTheme(['Light Theme', 'Dark Theme', greyTheme]))
    .add('HTML', () => (
      <ThemeProvider>
          <div>
              <h3> I'm plain HTML inside of Material-UI APP </h3>
              <p>But i'm styled via CSS {'<style scoped> element </style>'}. I'm support <a href="#nowhere">links styling</a> and you can hightlight me by <span> {'<span> tags </span>'} </span> Try to select me or put to...</p>
              <div
                 style={{
                      width: 150,
                      height: 50,
                      borderStyle: 'solid',
                      padding: 16,
                      margin: 20,
                 }}>
                  ...box with a border
              </div>
              Select different themes in bottom panel or edit color in the Theme Editor - I follow theme colors
          </div>
      </ThemeProvider>
    ))
    .add('React Components', () => (
      <ThemeProvider
        themes={[greyTheme, altTheme]}
        themeInd={1}
      >
          <ThemedComponent />
      </ThemeProvider>
    ))
    .add('Card Example Controlled', () => (
      <CardExampleControlled />
    ))
    .add('Raised Button Example Simple', () => (
      <RaisedButtonExampleSimple />
    ))
    .add('Date Picker Example Simple', () => (
      <DatePickerExampleSimple />
    ));


const contextTypes = {
    muiTheme: React.PropTypes.object,
};

class ThemedComponent extends React.Component {
    render() {
        const {palette} = this.context.muiTheme;
        console.log(palette);
        const style = {
            color: palette.textColor,
            backgroundColor: palette.canvasColor,
            border: `solid 1px ${palette.borderColor}`, // palette.canvasColor
            margin: 36,
            padding: 16,
        };
        return (
            <div style={style}>
                I'm <span style={{color: palette.primary1Color}}>manually</span> themed React Component. I dont have Material-UI components but I need the muiTheme to show my own ones! Try me with different themes!
            </div>
        );
    }
}

ThemedComponent.contextTypes = contextTypes;
