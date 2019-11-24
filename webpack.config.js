const webpack = require("webpack");
const path = require("path");
const process = require("process");

module.exports = {
    entry: {
        "app": "./front/src/js/app.js"
    },
    output: {
        path: path.resolve(__dirname, "public/dist/js/")
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules\/(?!minicomponent)/,
                loader: "babel-loader",
                query: {
                    cacheDirectory: true,
                    presets: [
                        ["@babel/preset-env"]
                    ],
                    plugins: [
                        "@babel/plugin-proposal-optional-chaining",
                        "@babel/plugin-proposal-nullish-coalescing-operator",
                        [
                            "@babel/plugin-transform-react-jsx",
                            {
                                "pragma": "MiniComponentJsx.createElement",
                                "pragmaFrag": "MiniComponentJsx.FRAGMENT"
                            }
                        ]
                    ]
                },
            }
        ]
    }
};