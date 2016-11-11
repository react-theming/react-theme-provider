import React from 'react';
import { storiesOf, action, addDecorator } from '@kadira/storybook';

import { muiTheme } from 'storybook-addon-material-ui';
import ThemeProvider from '../../src';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
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
    .addDecorator((story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '50%', maxWidth: 500, minWidth: 200 }}>
          {story()}
        </div>
      </div>
    ))
    .add('Plain HTML default', () => (
      <div style={{marginTop: 24}}>
        <ThemeProvider>
            <PlainHTML />
        </ThemeProvider>
      </div>
    ))
    .add('Plain HTML custom', () => (
      <div style={{marginTop: 24}}>
        <ThemeProvider
          themes={[greyTheme, altTheme]}
          themeInd={1}
        >
            <PlainHTML themes themeInd={1} />
        </ThemeProvider>
      </div>
    ))
    .add('Manually themed Component', () => (
      <div style={{marginTop: 24}}>
        <ThemeProvider
          themes={[greyTheme, altTheme]}
          themeInd={1}
        >
           <div style={{ padding: 16 }}>
             {'<ThemeProvider'} <br />
             {'\u00A0\u00A0 themes={[ greyTheme, altTheme ]}'} <br />
             {'\u00A0\u00A0 themeInd={ 1 }'} <br />
             {'>'} <br />
              <ThemedComponent />
             {'</ThemeProvider>'}
            </div>
        </ThemeProvider>
      </div>
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
    .add('Plain HTML', () => (
      <div style={{marginTop: 24}}>
        <ThemeProvider>
            <PlainHTML />
        </ThemeProvider>
      </div>
    ))
    .add('Manually themed Component', () => (
      <div style={{marginTop: 24}}>
        <ThemeProvider>
           {'<ThemeProvider>'}
            <ThemedComponent />
           {'</ThemeProvider>'}
        </ThemeProvider>
      </div>
    ))
    .add('HTML within Material', () => (
      <Paper style={{ margin: 16, padding: 16 }} >
        <br />
        here we have a piece of plain HTML: <br /><br />
        <ThemeProvider>
          <PlainHTML />
        </ThemeProvider>
        <br />
        Material-UI Buttons: <br />
        <RaisedButton label="Primary" primary={true} style={{margin: 16}} />
        <RaisedButton label="Secondary" secondary={true} style={{margin: 16}} />
      </Paper>
    ))
    .add('Component within Material', () => (
      <Paper style={{ margin: 16, padding: 16 }} >
        <br />
        Manually themed component: <br /><br />
        <ThemeProvider>
           {'<ThemeProvider>'}
            <ThemedComponent />
           {'</ThemeProvider>'}
        </ThemeProvider>
        <br />
        Material-UI Buttons: <br />
        <RaisedButton label="Primary" primary={true} style={{margin: 16}} />
        <RaisedButton label="Secondary" secondary={true} style={{margin: 16}} />
      </Paper>
    ))
    .add('Overriden Component', () => {
      let themeInd = 1;
      return (
      <Paper style={{ margin: 16, padding: 16 }} >
        <br />
        Manually themed component: <br /><br />

        <ThemeProvider
          themes={[greyTheme, altTheme]}
          themeInd={1}
          override
        >
           {'<ThemeProvider'} <br />
           {'\u00A0\u00A0 themes={[ greyTheme, altTheme ]}'} <br />
           {'\u00A0\u00A0 themeInd={ 1 }'} <br />
           {'\u00A0\u00A0 override'} <br />
           {'>'} <br />
            <ThemedComponent />
           {'</ThemeProvider>'}
        </ThemeProvider>
        <br />
        Material-UI Buttons: <br />
        <RaisedButton label="Primary" primary={true} style={{margin: 16}} />
        <RaisedButton label="Secondary" secondary={true} style={{margin: 16}} />
      </Paper>);
    });


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
            margin: 16,
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

function PlainHTML({themes, themeInd, override}) {
  const tab='\u00A0\u00A0\u00A0\u00A0';
  return (
    <div style={{ padding:16 }}>
      The plain HTML example <br /><br />
      {'<ThemeProvider'} {!(themes && themeInd && override) ? '>' : ''} <br />
      {override ? <div>
        {`${tab}override`}
        <br />
      </div> : '' }
      {themes ? <div>
        {`${tab}themes={[greyTheme, altTheme]}`}
        <br />
      </div> : '' }
      {themeInd ? <div>
        {`${tab}themeInd={${themeInd}}`}
        <br />
      {(themes || themeInd || override) ? '>' : ''}
      </div> : '' }
      {`${tab}<div>`} <br />
      <div style={{paddingLeft: 32}}>
        {`Here we have some text with styled`} <a href="https://github.com/sm-react/storybook-addon-material-ui">{'<a href="storybook-addon-material-ui"> links</a>'}</a> {', and highlighted via'} <span> {'<span> tags </span>'} </span> {'tag. '} {'You can select it and see the custom selection color!. Try it with different themes'} <br />
      </div>
      {`${tab}<div>`} <br />
      {'<ThemeProvider>'} <br />

    </div>
  );
}


{
  /*
  <div>
              <h3> I'm plain HTML inside of Material-UI APP </h3>
              <p>But i'm styled via CSS {'<style> element </style>'}. I'm support <a href="#nowhere">links styling</a> and you can hightlight me by <span> {'<span> tags </span>'} </span> Try to select me or put to...</p>
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
  */

}
