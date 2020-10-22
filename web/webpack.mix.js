const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.disableSuccessNotifications();

mix.react('resources/js/guest/index.jsx', 'public/js/guest.js');
mix.react('resources/js/worker/index.jsx', 'public/js/worker.js');
mix.react('resources/js/manager/index.jsx', 'public/js/manager.js');

mix.sass('resources/sass/app.scss', 'public/css');

mix.sass('resources/sass/landing/landing.scss', 'public/css');
