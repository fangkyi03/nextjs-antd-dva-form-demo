module.exports = {
    "plugins": {
        'autoprefixer':{
            browsers: ['> 0%', 'Android 2.3', 'iOS 3.2', 'Safari 3.1', 'IE 10']
        },
        "postcss-px-to-viewport": {
            viewportWidth: 1920,     // (Number) The width of the viewport.
            viewportHeight: 1080,    // (Number) The height of the viewport.
            unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
            viewportUnit: 'vw',     // (String) Expected units.
            selectorBlackList: ['.ignore', '.hairlines'],  // (Array) The selectors to ignore and leave as px.
            minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
            mediaQuery: false       // (Boolean) Allow px to be converted in media queries.
        },
    }
}