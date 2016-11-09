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

storiesOf('Without addon', module)
    .add('Html', () => (
      <ThemeProvider>
          <div>
              <p>Lorem ipsum</p>
              <h3> Subtitle</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, temporibus veniam molestias, <span>totam blanditiis odio autem?</span> Ratione et inventore impedit aspernatur, <a href="#nowhere">distinctio</a>, tenetur necessitatibus dolorem dolore saepe odit repudiandae eligendi.</p>
              <div style={{width: 50, height: 50, borderStyle: 'solid'}}>
                  in border
              </div>
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
    .add('Text', () => (
      <ThemeProvider>
          <div>
              <p>Lorem ipsum</p>
              <h3> Subtitle</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, temporibus veniam molestias, <span>totam blanditiis odio autem?</span> Ratione et inventore impedit aspernatur, <a href="#nowhere">distinctio</a>, tenetur necessitatibus dolorem dolore saepe odit repudiandae eligendi.</p>
              <div style={{width: 50, height: 50, borderStyle: 'solid'}}>
                  in border
              </div>
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
                I'm <span style={{color: palette.primary1Color}}>manually</span> themed Component
            </div>
        );
    }
}

ThemedComponent.contextTypes = contextTypes;
