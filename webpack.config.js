const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        'app':              './src/index.js' , 
        'assets/js/banner': './src/assets/js/banner.js',
        'assets/js/tabs':   './src/assets/js/tabs.js',
        'assets/js/upload': './src/assets/js/upload.js'
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, "/app"),
        filename: "[name].js",
    },

    devServer: {
        contentBase: path.join(__dirname, "/app"),
        port: 8899,
        writeToDisk: true,
        open: true,
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    miniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"

                ]
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                exclude: /images/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts',
                        }
                    }
                ]
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/,
                exclude: /fonts/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images',
                        }
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                    presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new optimizeCssAssetsWebpackPlugin({}),
        new miniCssExtractPlugin({
            filename: "assets/css/style.css",
        }),

        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            chunks: ['app'],
        }),
        new htmlWebpackPlugin({
            template: "./src/components/button.html",
            filename: "components/button.html",
            chunks: ['app'],
        }),
        new htmlWebpackPlugin({
            template: "./src/components/textfield.html",
            filename: "components/textfield.html",
            chunks: ['app'],
        }),
        new htmlWebpackPlugin({
            template: "./src/components/card.html",
            filename: "components/card.html",
            chunks: ['app'],
        }),
        new htmlWebpackPlugin({
            template: "./src/components/banner.html",
            filename: "components/banner.html",
            chunks: ['app', 'assets/js/banner'],
        }),
        new htmlWebpackPlugin({
            template: "./src/components/list.html",
            filename: "components/list.html",
            chunks: ['app']
        }),
        new htmlWebpackPlugin({
            template: "./src/components/tabs.html",
            filename: "components/tabs.html",
            chunks: ['app', 'assets/js/tabs']
        }),
        new htmlWebpackPlugin({
            template: "./src/components/upload.html",
            filename: "components/upload.html",
            chunks: ['app', 'assets/js/upload']
        }),
    ]
};