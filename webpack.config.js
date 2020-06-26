'use strict';

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const SimpleSW = require('simple-sw');

const config = require('./package');

module.exports = (env, argv) => {

    const devMode = argv.mode !== 'production';

    let webpackConfig = {

        entry: {
            'index': './src/index.js'
        },

        output: {
            path: path.resolve(__dirname, 'public'),
            publicPath: ''
        },

        module: {
            rules: []
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ],

        devServer: {
            contentBase: "./public",
            host: "0.0.0.0",
            port: 3000
        }
    }

    if (!devMode) {

        webpackConfig.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false
                        }
                    }
                })
            ]
        }

        webpackConfig.plugins.push(
            new FaviconsWebpackPlugin({
                logo: './src/icon.png',
                mode: 'webapp',
                devMode: 'webapp',
                prefix: '',
                favicons: {
                    path: '',
                    background: '#fcfff7',
                    theme_color: '#fcfff7',
                    appName: config.name,
                    appShortName: config.name,
                    appDescription: config.description,
                    developerName: config.author,
                    developerURL: config.homepage,
                    orientation: 'any',
                    scope: './',
                    start_url: './',
                    version: config.version,
                    pixel_art: true,
                    icons: {
                        android: true,
                        coast: false,
                        yandex: false,
                        firefox: false,
                        windows: true,
                        appleIcon: true,
                        appleStartup: false,
                        favicons: true
                    }
                }
            })
        );

        webpackConfig.plugins.push(new SimpleSW( { version: config.version } ));
    }

    return webpackConfig;
};
