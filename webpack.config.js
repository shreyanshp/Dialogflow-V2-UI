const VueLoaderPlugin = require('vue-loader/lib/plugin'),
    config = require('./config'),
    path = require('path'),
    webpack = require('webpack'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './Public/src/main.js',
    output: {
        path: path.resolve(__dirname, './Public/build'),
        publicPath: '/Public/build/',
        filename: 'build.js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s[a|c]ss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        port: config.Environment.Port
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJSPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}