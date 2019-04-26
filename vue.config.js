const webpack = require('webpack');
const path = require('path');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
  transpileDependencies: [
    /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,
  ],
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: styles.getPostCssConfig({
        themeImporter: {
          themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
        },
        minify: true
      })
    }
  },
  configureWebpack: config => {
    const plugins = [];
    plugins.push(
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery'
      })
    );
    plugins.push(
      new CKEditorWebpackPlugin( {
        // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
        language: 'en'
      })
    );
    if (IS_PROD) {
      plugins.push(
        new FileManagerPlugin({
          onEnd: {
            delete: [
                './package',
            ],
            mkdir: ['./package'],
            archive: [
              {
                source: './dist',
                destination: resolve(`./package/${path.basename(resolve('./'))}.zip`) ,
              },
            ]
          }
        })
      );
//       plugins.push(
//         new CompressionWebpackPlugin({
//           filename: '[path].gz[query]',
//           algorithm: 'gzip',
//           test: productionGzipExtensions,
//           threshold: 10240,
//           minRatio: 0.8
//         })
//       );
    }
    config.plugins = [
      ...config.plugins,
      ...plugins
    ];
  },
  productionSourceMap: false,
  lintOnSave: false,
  chainWebpack: (config) => {
    // Vue CLI would normally use its own loader to load .svg files. The icons used by
    // CKEditor should be loaded using raw-loader instead.
    // Get the default rule for *.svg files.
    const svgRule = config.module.rule( 'svg' );
    // Then you can either:
    //
    // * clear all loaders for existing 'svg' rule:
    //
    //		svgRule.uses.clear();
    //
    // * or exclude ckeditor directory from node_modules:
    svgRule.exclude.add( __dirname + '/node_modules/@ckeditor' );
    // Add an entry for *.svg files belonging to CKEditor. You can either:
    //
    // * modify the existing 'svg' rule:
    //
    //		svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
    //
    // * or add a new one:
    config.module
      .rule( 'cke-svg' )
      .test( /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/ )
      .use( 'raw-loader' )
      .loader( 'raw-loader' );
    let fileLoaderOptions = {
      useRelativePath: false,
      name: '[name]-[hash:5].[ext]',
      publicPath: '../'
    };
    if (IS_PROD) {
      fileLoaderOptions.limit = 2000;
    }
    config.resolve.symlinks(true);
    config.module
      .rule()
      .test(/\.(pdf)$/)
      .use("file-loader")
      .loader("file-loader")
      .options(IS_PROD ? Object.assign({}, fileLoaderOptions, {
        outputPath: '../dist/pdf',
        publicPath: './pdf'
      }) : fileLoaderOptions);
    config.entry.app = ["babel-polyfill", resolve('src/main.js')],
    config.resolve.alias
      .set('@static-resources', resolve('../static-resources/src/plugins/gm.module'));
  },
  devServer: {
    port: '9091',
    // overlay: true,
    //设置为false则会在页面中显示当前webpack的状态
    // inline: true,
    // historyApiFallback: true,
    //代理配置
    // proxy: {
    // },
    // hot: true,
    //强制页面不通过刷新页面更新文件
    // hotOnly: true,
  },
}
