# Essential Webpack 3 + PostCSS boilerplate

A super minimal and basic boilerplate that I use as starter-kit on my personal projects! 😎

## What is rocking here
* [Webpack 3](https://webpack.js.org/guides/getting-started/)
  * [tree-shaking](https://webpack.js.org/guides/tree-shaking/)
  * [file-loader](https://github.com/webpack-contrib/file-loader)


### Extras
* [Babel](https://babeljs.io/) - *Use next generation JavaScript, today.*
* [BrowserSync](https://www.browsersync.io/) - *Time-saving synchronised browser testing.*
  * Tunnel - *Make your website online through a random Public URL*
* [ESLint](http://eslint.org/) - *The pluggable linting utility for JavaScript and JSX*
* [StyleLint](https://stylelint.io/) - *A mighty, modern CSS linter and fixer in your stylesheets.*

## How to Add Multiple files
This boilerplate is set for only 1 page: `index.html` but is easy to add more pages. You just need to add the HTML and JS files to `config/webpack.config.js`:

### Add HTML file
- On `line 83` you have all your project Pages. Each `new HtmlWebpackPlugin` is used to create a new page.

```js
// YOUR PROJECT PAGES
new HtmlWebpackPlugin({
    chunks: ['index'], // where it is reading the JS files from
    template: './index.html', // location of the HTML file
}),
```

To add a Page, add a new instance of `HtmlWebpackPlugin` and create your HTML file. In this case the file is at `./pages/my-page.html`.

```js
new HtmlWebpackPlugin({
    chunks: ['index'],
    template: './index.html',
}),
new HtmlWebpackPlugin({
    chunks: ['my-page'],
    template: './pages/my-page.html',
}),
```

### Add JS file
`chunks: ['my-page']` refers to the key of your JS file entry point (`line 26`). There you set the entry points for your project. Each entry point is a JS file.

Just add a new entry-point with the same name as the `chunks` value used on the step before.

```js
entry: {
    'index': './index.js',
    'my-page': './my-page.js',
},
```

That's it! Save the file, `npm start` again and keep rocking at http://localhost:3001/my-page.html


### Different HTML Files, same JS file
You also can have HTML files that use the same JS file:
```js
new HtmlWebpackPlugin({
    chunks: ['index'],
    template: './index.html',
}),
new HtmlWebpackPlugin({
    chunks: ['index'], // read from the same entry point as `index.html`
    template: './my-page.html',
}),
```
