module.exports = {
  entry: './src/script/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: ['style-loader' ,'css-loader', 'sass-loader']
      },
      {
        test: /.(jpg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outpu: 'images',
            },
          },
        ],
      },
      {
        test: /.js$/,
        use: ['babel-loader']
      }
    ]
  }
}