const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const htmlWebpackPartialsPlugin = require ("html-webpack-partials-plugin");

module.exports = {
    entry: {
        'app':              './src/index.js' , 
        'assets/js/banner': './src/assets/js/banner.js',
        'assets/js/tabs':   './src/assets/js/tabs.js',
        'assets/js/upload': './src/assets/js/upload.js',
        'assets/js/chart':  './src/assets/js/chart'
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, "/app"),
        filename: "[name].js",
    },

    devServer: {
        contentBase: path.join(__dirname, "/app"),
        host: '192.168.1.15',
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

        // html pages
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            chunks: ['app', 'assets/js/banner', 'assets/js/tabs', 'assets/js/chart'],
        }),
        new htmlWebpackPlugin({
            template: "./src/add-product.html",
            filename: "add-product.html",
            chunks: ['app', 'assets/js/upload'],
        }),
        new htmlWebpackPlugin({
            template: "./src/add-user.html",
            filename: "add-user.html",
            chunks: ['app', 'assets/js/upload'],
        }),
        new htmlWebpackPlugin({
            template: "./src/products.html",
            filename: "products.html",
            chunks: ['app'],
        }),
        new htmlWebpackPlugin({
            template: "./src/users.html",
            filename: "users.html",
            chunks: ['app'],
        }),
        new htmlWebpackPlugin({
            template: "./src/orders.html",
            filename: "orders.html",
            chunks: ['app'],
        }),

        // html components
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
        new htmlWebpackPlugin({
            template: "./src/components/help.html",
            filename: "components/help.html",
            chunks: ['app']
        }),
        new htmlWebpackPlugin({
            template: "./src/components/summary.html",
            filename: "components/summary.html",
            chunks: ['app']
        }),
        new htmlWebpackPlugin({
            template: "./src/components/actions.html",
            filename: "components/actions.html",
            chunks: ['app']
        }),
        new htmlWebpackPlugin({
            template: "./src/components/sidebar.html",
            filename: "components/sidebar.html",
            chunks: ['app']
        }),
        new htmlWebpackPlugin({
            template: "./src/components/table.html",
            filename: "components/table.html",
            chunks: ['app']
        }),
        new htmlWebpackPlugin({
            template: "./src/components/chart.html",
            filename: "components/chart.html",
            chunks: ['app', 'assets/js/chart']
        }),

        // html partials
        new htmlWebpackPartialsPlugin({
            path: path.join(__dirname, "./src/components/sidebar.html"),
            location: 'sidebar',
            template_filename: ['index.html', 'add-product.html', "products.html",
            'users.html', 'orders.html', 'add-user.html']
        }),
        new htmlWebpackPartialsPlugin({
            path: path.join(__dirname, "./src/components/help.html"),
            location: 'help',
            template_filename: ['index.html', 'add-product.html', "products.html",
            'users.html', 'orders.html', 'add-user.html']
        }),
        new htmlWebpackPartialsPlugin({
            path: path.join(__dirname, "./src/components/chart.html"),
            location: 'chart',
            template_filename: ['index.html']
        }),
        new htmlWebpackPartialsPlugin({
            path: path.join(__dirname, "./src/components/banner.html"),
            location: 'banner',
            template_filename: ['index.html']
        }),
        new htmlWebpackPartialsPlugin({
            path: path.join(__dirname, "./src/components/actions.html"),
            location: 'actions',
            template_filename: ['index.html']
        }),
        new htmlWebpackPartialsPlugin({
            path: path.join(__dirname, "./src/components/tabs.html"),
            location: 'tabs',
            template_filename: ['index.html']
        }),
    ]
};