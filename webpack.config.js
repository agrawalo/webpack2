var webpack = require('webpack');
var path = require('path');
var VENDOR_LIBS = [
    // name of the library that we want to include.
    "faker", "lodash", "react", "react-dom", "react-input-range",
    "react-redux", "react-router", "redux", "redux-form", "redux-thunk"
];
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: './src/index.js',
    // after code splitting, we don't have one entry point of our application.
    entry: {
        // I want to produce a bundle.js, and start creating it from index.js
        bundle: './src/index.js',

        // separate bundled file called as vendor.js
        vendor: VENDOR_LIBS
    },
    output: {
      path: path.join(__dirname, 'dist'),

        // [name] gets replaced with the key in entry section above.
        // chunkhash is a hashed string of characters, or hash of the contents of file
        // hash = long string of numbers and letters. Every single time that our
        // bundle or vendor file is updated or changed in some fashion, webpack will
        // automatically hash the contents of that file and then spit it out as the chunkhash.
        // Used to prevent browsers using the older version of bundle and vendor.
      filename: '[name].[chunkhash].js'

    },
    module : {
      rules: [
          {
              use: 'babel-loader',
              test: /\.js$/,
              exclude: /node_modules/ // do not try to apply babel on any file that are located inside of node_modules directory
          },
          {
              // Remember css-loader allows webpack to understand and read
              // the content of css files that are imported into our project structure.

              // And style-loader takes all those css modules and sticks them into a style tag inside
              // of our index.html document.
              use: ['style-loader', 'css-loader'],
              test: /\.css$/
          }
      ]
    },
    plugins: [
        // tells webpack to look at the total sum of all
        // of our project files between both our bundles
        // It says if any module is included in those trees are identical or copy or duplicates
        // pull them out and only add them to the vendor entry point.
        // This solves the issue of double including of react.js and redux.js and such vendor dependecies.
        new webpack.optimize.CommonsChunkPlugin({
            // name: 'vendor'

            // after we added chunkhash
            // now webpack will create manifest.js as well.
            // the purpose of this manifest.js file is to better tell the
            // browser or kind of better give everything involved a little bit more understanding
            // on whether or not the vendor file actually got changed.
            names : ['vendor', 'manifest']
        }),

        // with this we dont have to manually add split js files inside script tag of index.html
        // this will create index.html for us with some script tags inside of it.
        new HtmlWebpackPlugin({
            // provide a template index.html with initial configuration.
            template: 'src/index.html'
        })
    ]
};
