const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: "./src/app.js",

    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
      },
      
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/},
            { test: /\.css$/, loader: "css-loader" },
            { test: /\.mp3$/, loader: 'file-loader' }
        ]
    },
    
    plugins: [new HtmlWebpackPlugin({
            template: "./src/page-renderer/index.html"
        })
    ]
}