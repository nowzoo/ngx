const cp = require('child-process-es6-promise');
const fs = require('fs-extra');
const path = require('path');
const lib = process.argv[2];

if (! /ngx(\-[a-z]+)+/.test(lib)) {
  console.log('invalid lib name')
  process.exit(0);
}
const libPath = path.join(process.cwd(), 'projects', lib)

const wallabyJs = `var wallabyWebpack = require('wallaby-webpack');
var path = require('path');

var compilerOptions = require('./tsconfig.wallaby.spec.json').compilerOptions;

compilerOptions.module = 'CommonJs';
module.exports = function (wallaby) {

  var webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
      'src/wallabyTest.js',
      'src/**/*spec.js'
    ],

    module: {
      rules: [
        {test: /\.css$/, loader: ['raw-loader']},
        {test: /\.html$/, loader: 'raw-loader'},
        {test: /\.ts$/, loader: '@ngtools/webpack', include: /node_modules/, query: {tsConfigPath: 'tsconfig.json'}},
        {test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/},
        {test: /\.json$/, loader: 'json-loader'},
        {test: /\.styl$/, loaders: ['raw-loader', 'stylus-loader']},
        {test: /\.less$/, loaders: ['raw-loader', 'less-loader']},
        {test: /\.scss$|\.sass$/, loaders: ['raw-loader', 'sass-loader']},
        {test: /\.(jpg|png)$/, loader: 'url-loader?limit=128000'}
      ]
    },

    resolve: {
      extensions: ['.js', '.ts'],
      modules: [
        path.join(wallaby.projectCacheDir, 'src/lib'),
        path.join(wallaby.projectCacheDir, 'src'),
        path.join(wallaby.localProjectDir, '../../node_modules'),
        'node_modules'
      ]
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }
  });

  return {
    files: [
      {pattern: 'src/**/*.+(ts|css|less|scss|sass|styl|html|json|svg)', load: false},
      {pattern: 'src/**/*.d.ts', ignore: true},
      {pattern: 'src/**/*spec.ts', ignore: true}
    ],

    tests: [
      {pattern: 'src/**/*spec.ts', load: false},
      {pattern: 'src/**/*e2e-spec.ts', ignore: true}
    ],

    testFramework: 'jasmine',

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },

    middleware: function (app, express) {
      var path = require('path');
      app.use('/favicon.ico', express.static(path.join(__dirname, 'src/favicon.ico')));
      app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
    },

    env: {kind: 'chrome'},

    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    },
    filesWithNoCoverageCalculated: ['src/*.ts', 'src/**/*.module.ts'],

    debug: true
  };
};`;

const libWallabyTSConfigJSON = {
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/spec",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "types": [
      "jasmine",
      "node"
    ],
    "lib": [
      "dom",
      "es2017"
    ]
  },
  "files": [
    "src/test.ts"
  ],
  "include": [
    "**/*.spec.ts",
    "**/*.d.ts"
  ]
};

const wallabyTestTs = `import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
`;

const d = new Date();
const license = `MIT License

Copyright (c) ${d.getFullYear()} NowZoo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

const readme = `# ${lib}

Description here.

## Quick Start


## License
[MIT](https://github.com/nowzoo/ngx/blob/master/projects/${lib}/README.md)

`;

console.log(`Building library ${lib}...`);
cp.spawn('ng', ['g', 'library', lib])
  .then(() => {
    console.log(`Library ${lib} built.`);
    const p = path.join(libPath, 'package.json');
    console.log(`Reading ${p}...`);
    return fs.readJSON(p);
  })
  .then(o => {
    const p = path.join(libPath, 'package.json');
    console.log(`Writing ${p}...`);
    o.name = `@nowzoo/${lib}`;
    o.description = `Need to put a description`;
    o.homepage = `https://github.com/nowzoo/ngx/blob/master/projects/${lib}/README.md`;
    o.license = 'MIT';
    o.repository = {
      type: 'git',
      url : `https://github.com/nowzoo/ngx.git`
    };
    o.bugs = 'https://github.com/nowzoo/ngx/issues';
    return fs.writeJSON(p, o, {spaces: `\t`});
  })
  .then(() => {
    const p = path.join(libPath, 'LICENSE');
    console.log(`Writing ${p}...`);
    return fs.outputFile(p, license);
  })
  .then(() => {
    const p = path.join(libPath, 'README.md');
    console.log(`Writing ${p}...`);
    return fs.outputFile(p, readme);
  })
  .then(() => {
    const p = path.join(libPath, 'wallaby.js');
    console.log(`Writing ${p}...`);
    return fs.outputFile(p, wallabyJs);
  })
  .then(() => {
    const p = path.join(libPath, 'tsconfig.wallaby.spec.json');
    console.log(`Writing ${p}...`);
    return fs.outputJSON(p, libWallabyTSConfigJSON, {spaces: `\t`});
  })
  .then(() => {
    const p = path.join(libPath, 'src', 'wallabyTest.ts');
    console.log(`Writing ${p}...`);
    return fs.outputFile(p, wallabyTestTs);
  })
  .then(() => {
    const p = path.join(libPath, 'tsconfig.lib.json');
    console.log(`Reading ${p}...`);
    return fs.readJSON(p);
  })
  .then(o => {
    const p = path.join(libPath, 'tsconfig.lib.json');
    console.log(`Writing ${p}...`);
    o.exclude.push('src/wallabyTest.ts');
    return fs.outputJSON(p, o, {spaces: `\t`});
  })
  .then(() => {
    const p = path.join(process.cwd(), 'tsconfig.json');
    console.log(`Reading ${p}...`);
    return fs.readJSON(p);
  })
  .then(o => {
    const p = path.join(process.cwd(), 'tsconfig.json');
    console.log(`Writing ${p}...`);
    const paths = o.compilerOptions.paths || {};
    const newPaths = {};
    Object.keys(paths).forEach(key => {
      if (key === lib) {
        newPaths['@nowzoo/' + lib] = paths[key];
      } else {
        if (key === lib + '/*') {
          newPaths['@nowzoo/' + lib + '/*'] = paths[key];
        } else {
          newPaths[key] = paths[key];
        }
      }
    })

    o.compilerOptions.paths = newPaths;
    return fs.writeJSON(path.join(process.cwd(), 'tsconfig.json'), o, {spaces: `\t`});
  })
