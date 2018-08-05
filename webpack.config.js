let client = {
  mode: 'development',
  target: 'node',
  entry: ['babel-polyfill',__dirname+'/src/client/index.js'],
  output: {
    path: __dirname+'/public/js/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['env','es2015','es2017','stage-3','react'],
          plugins: ["syntax-async-functions","transform-async-to-generator","transform-class-properties"]
        }
      }
    ]
  },
  resolve: {
    alias: {
      Root:       __dirname+'/',
      Classes:    __dirname+'/src/shared/classes',
      Containers: __dirname+'/src/shared/containers',
      Components: __dirname+'/src/shared/components',
    }
  }
}

module.exports = client;
