
const path = require('path');

const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname + '/../');

const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';


const assets = 'assets';

module.exports = {
    entry: {
        'client': [path.join(ROOT_PATH, 'src/client.js'), ]
    },
    devServer: { inline: true },
    output: {
        path: path.join(ROOT_PATH, `./dist/${assets}`),
        filename: '[name].bundle.js',
        publicPath: `/${assets}`,
        chunkFilename: '[id].chunk.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    devtool: '#source-map',
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
};