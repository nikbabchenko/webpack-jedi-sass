/* global process, __dirname, module */
const postcssConfig = './config/postcss/postcss.config.js';
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const projectDir = path.resolve(`${__dirname}/..`);
const isDev = process.env.NODE_ENV !== 'production';

// Set a random Public URL to share your website with anyone
// Or you can use a custom URL "http://mysuperwebsite.localtunnel.me"
// const tunnel = 'mysuperwebsite';
const tunnel = false;

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log(process.env);

const config = {
    context: projectDir + '/src',
    entry: {
        'index': './index.js',
        'contact-us': './contact-us.js',
        // 'about-us': './about-us.js'
    },
    output: {
        filename: isDev ? '[name].js' : '[name].[chunkhash].js',
        path: path.resolve(projectDir, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
                exclude: /node_modules(?!\/webpack-dev-server)/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: isDev,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: { path: postcssConfig }
                            }
                        }
                    ],
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: { path: postcssConfig }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                })
            },
            {
                test: /\.(png|jpeg|jpg|gif|woff|woff2|eot|otf|ttf|svg)$/,
                use: 'file-loader?name=assets/[name].[ext]',
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.(pug)$/,
                use: {
                    loader: 'pug-loader',
                }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 3000
    },
    plugins: [
        new ExtractTextPlugin('[name].[contenthash:base64:5].css'),
        new CleanWebpackPlugin(['build/'], {
            root: projectDir
        }), // avoid Duplicated CSS files with different hash

        // YOUR PROJECT PAGES
        new HtmlWebpackPlugin({
            chunks: ['index'],
            template: `!!pug-loader!${path.join(`${__dirname}/../src`, 'index.pug')}`,
        }),

        new HtmlWebpackPlugin({
            chunks: ['contact-us'],
            template: `!!pug-loader!${path.join(`${__dirname}/../src`, './pages/contact-us.pug')}`,
            filename: 'contact-us.html'
        }),
        // new HtmlWebpackPlugin({
        //     chunks: ['about-us'],
        //     template: './about-us.html',
        //     filename: 'about-us.html'
        // }),
        // new HtmlWebpackPlugin({
        //     chunks: ['index'],
        //     template: './coming-soon.html',
        //     filename: 'coming-soon.html'
        // }),
        new LodashModuleReplacementPlugin,
        new UglifyJSPlugin({
            mangle: true,
            compress: {
                warnings: false,
                drop_console: !isDev,
                drop_debugger: !isDev,
                screw_ie8: true,
            },
        }),
        new CopyWebpackPlugin([
            {
                "context": "../src",
                "to": "",
                "from": {
                    "glob": "assets/img/**/*",
                    "dot": true
                }
            },
        ], {
                "ignore": [
                    ".gitkeep"
                ],
                "debug": "warning"
            }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8288,
            proxy: 'http://localhost:3000/',
            ghostMode: { // Disable interaction features between different browsers
                clicks: false,
                forms: false,
                scroll: false
            },
            tunnel,
        }, {
            // prevent BrowserSync from reloading the page
            // and let Webpack Dev Server take care of this
            reload: false
        })
    ]
};

module.exports = config;
