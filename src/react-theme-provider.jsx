import React from 'react';

const defaultTheme = {
    palette: {
        "primary1Color":"#00bcd4","primary2Color":"#d9a3ea","primary3Color":"#bdbdbd","accent1Color":"#ff4081","accent2Color":"#f5f5f5","accent3Color":"#9e9e9e","textColor":"rgba(0, 0, 0, 0.87)","secondaryTextColor":"rgba(0, 0, 0, 0.54)","alternateTextColor":"#ffffff","canvasColor":"#ffffff","borderColor":"#e0e0e0","disabledColor":"rgba(0, 0, 0, 0.3)","pickerHeaderColor":"#00bcd4","clockCircleColor":"rgba(0, 0, 0, 0.07)","shadowColor":"rgba(0, 0, 0, 1)"
    },
};

const propTypes = {
    setCSS: React.PropTypes.func,
    CSSLink: React.PropTypes.func,
    themes: React.PropTypes.arrayOf(React.PropTypes.object),
    themeInd: React.PropTypes.number,
    override: React.PropTypes.bool,
    className: React.PropTypes.string,
};

const defaultProps = {
    themeInd: 0,
    themes: [defaultTheme],
}

const contextTypes = {
    muiTheme: React.PropTypes.object,
};

const childContextTypes = {
    muiTheme: React.PropTypes.object,
};

export default class ThemeProvider extends React.Component {
    constructor(props, ...args) {
        super(props, ...args);

//        this.state = {
//            themeInd: props.themeInd || 0,
//        };
//        this.state.currentTheme = props.themes[props.themeInd];

        this.setCSS = props.setCSS || setCSS;
        this.CSSLink = props.CSSLink || CSSLink;
        this.className = props.className || 'react-theme-provider';
    }

    getChildContext() {
        if (this.context.muiTheme && !this.props.override) {
            return;
        }
        return {muiTheme: this.props.themes[this.props.themeInd]};
    }

    render() {

        const currentTheme = this.context.muiTheme ? this.context.muiTheme : this.props.themes[this.props.themeInd];
        const palette = currentTheme.palette;

//        const palette = this.context.muiTheme ? this.context.muiTheme.palette : this.state.currentTheme.palette;

        const CSSstyles = this.setCSS(palette, this.className);

        return (
          <div className={this.className}>
            {this.CSSLink(CSSstyles)}
            <div>{this.props.children}</div>
          </div>
        );
    }
}

ThemeProvider.propTypes = propTypes;
ThemeProvider.defaultProps = defaultProps;
ThemeProvider.contextTypes = contextTypes;
ThemeProvider.childContextTypes = childContextTypes;

function setCSS(palette, className) {
    const style = `
.${className} div {
    color: ${palette.textColor};
    background-color: ${palette.canvasColor};
    border-width: 1px;
    border-color: ${palette.borderColor};
    font-family: Roboto, sans-serif;
    font-size: 12px;
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
`;
    return style;
}

function CSSLink(CSSdata) {
    return (
      <link
        rel="stylesheet"
        type="text/css"
        href={`data:text/css,${CSSdata}`}
      />);
}


