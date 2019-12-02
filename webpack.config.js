import path from "path";

import { optimize } from "webpack";

import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

import cssnano from "cssnano";
import postcssPresetEnv from "postcss-preset-env";

export default {
    mode: "development",
    entry: {
        app: './app/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[chunkhash].js",
        chunkFilename: "[chunkhash].js"
    },
    cache: true,
    plugins: [
        new optimize.AggressiveSplittingPlugin({
            minSize: 30000,
            maxSize: 50000
        }),
        new HtmlWebpackPlugin({
            base: "/",
            chunks: ['app'],
            filename: 'index.html',
            template: 'index.html'
        }),
        new CopyPlugin([{
            from: "assets",
            to: "assets",
            ignore: ['*.DS_Store']
        }]),
    ],
    module: {
        rules: [{
            test: /\.css$/i,
            use: ['to-string-loader', {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        postcssPresetEnv,
                        cssnano
                    ]
                }
            }],
        }],
    },
    devServer: {
        host: "0.0.0.0",
        useLocalIp: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 8080,
        open: true,
        historyApiFallback: true
    }
};
