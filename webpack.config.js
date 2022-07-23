const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CSS_TYPINGS_CONFIG = {
    loader: '@teamsupercell/typings-for-css-modules-loader',
    options: {
        formatter: 'none',
        eol: '\n',
        disableLocalsExport: true
    }
}

const CSS_LOADER_COMMON_CONFIG = {
    loader: 'css-loader',
    options: {
        url: false
    }
}

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, './tsconfig.json')
            }),
        ]
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    CSS_TYPINGS_CONFIG,
                    {
                        ...CSS_LOADER_COMMON_CONFIG,
                        options: {
                            ...CSS_LOADER_COMMON_CONFIG.options,
                            modules: {
                                exportLocalsConvention: 'camelCaseOnly',
                                localIdentName: '[folder]-[local]'
                            }
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        }),
    ],
}