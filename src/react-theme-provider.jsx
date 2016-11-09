import React from 'react';


const propTypes = {
    setCSS: React.PropTypes.func,
    themes: React.PropTypes.arrayOf(React.PropTypes.object),
    themeInd: React.PropTypes.number,
    override: React.PropTypes.bool,
};

const contextTypes = {
    muiTheme: React.PropTypes.object,
};

const childContextTypes = {
    muiTheme: React.PropTypes.object,
};

export default class ThemeProvider extends React.Component {
    constructor(props, ...args) {
        super(props, ...args);

        this.state = {
            themeInd: props.themeInd || 0,
        };
        this.state.currentTheme = props.themes ? props.themes[this.state.themeInd] :  defaultTheme;

        this.setCSS = props.setCSS || setCSS;
    }

    getChildContext() {
        if (this.context.muiTheme && !this.props.override) {
            return;
        }
        return {muiTheme: this.state.currentTheme};
    }

    render() {
        const palette = this.context.muiTheme ? this.context.muiTheme.palette : this.state.currentTheme.palette;
        const style = this.setCSS(palette);

        return (
          <div>
            <style scoped>
              {style}
            </style>
            {this.props.children}
          </div>
        );
    }
}

ThemeProvider.propTypes = propTypes;
ThemeProvider.contextTypes = contextTypes;
ThemeProvider.childContextTypes = childContextTypes;

function setCSS(palette) {
    const style = `
div {
    color: ${palette.textColor};
    background-color: ${palette.canvasColor};
    border-width: 1px;
    border-color: ${palette.borderColor};
}

a {
    color: ${palette.primary1Color};
}

span {
    color: ${palette.accent1Color};
}

::selection {
    background: ${palette.primary2Color};
}
`;
    return style;
}

const defaultTheme = {
    palette: {
        "primary1Color":"#00bcd4","primary2Color":"#0097a7","primary3Color":"#bdbdbd","accent1Color":"#ff4081","accent2Color":"#f5f5f5","accent3Color":"#9e9e9e","textColor":"rgba(0, 0, 0, 0.87)","secondaryTextColor":"rgba(0, 0, 0, 0.54)","alternateTextColor":"#ffffff","canvasColor":"#d1eba8","borderColor":"#e0e0e0","disabledColor":"rgba(0, 0, 0, 0.3)","pickerHeaderColor":"#00bcd4","clockCircleColor":"rgba(0, 0, 0, 0.07)","shadowColor":"rgba(0, 0, 0, 1)"
    },
};
