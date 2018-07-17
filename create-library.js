const cp = require('child-process-es6-promise');
const fs = require('fs-extra');
const path = require('path');
const lib = process.argv[2];

if (! /ngx(\-[a-z]+)+/.test(lib)) {
  console.log('invalid lib name')
  process.exit(0);
}
const libPath = path.join(process.cwd(), 'projects', lib)



function modifyPackageJson() {
  const p = path.join(libPath, 'package.json');
  return fs.readJson(p)
    .then(o => {
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
}

function createLicense() {
  return fs.readFile(path.join(process.cwd(), 'templates-lib', 'LICENSE'))
    .then(b => {
      const p = path.join(libPath, 'LICENSE');
      const license = b.toString().replace(/GETFULLYEAR/g, new Date().getFullYear().toString());
      return fs.outputFile(p, license);
    })
}

function createReadmeMd() {
  const readPath = path.join(process.cwd(), 'templates-lib', 'README.md');
  //console.log(readPath, fs.exists(readPath));
  return fs.readFile(readPath)
    .then(b => {
      const p = path.join(libPath, 'README.md');
      const readme = b.toString().replace(/NGXLIBNAME/g, lib);
      return fs.outputFile(p, readme);
    })
}


function copyWallabyJs() {
  return fs.copy(
    path.join(process.cwd(), 'templates-lib', 'wallaby'),
    path.join(libPath, 'wallaby.js')
  )
}
function copyTsconfigWallabySpecJson() {
  return fs.copy(
    path.join(process.cwd(), 'templates-lib', 'tsconfig.wallaby.spec.json'),
    path.join(libPath, 'tsconfig.wallaby.spec.json')
  )
}
function copyWallabyTestTs() {
  return fs.copy(
    path.join(process.cwd(), 'templates-lib', 'wallabyTest'),
    path.join(libPath, 'src', 'wallabyTest.ts')
  )
}

function modifyTsconfigLibJson() {
  const p = path.join(libPath, 'tsconfig.lib.json');
  return fs.readJson(p)
    .then(o => {
      o.exclude.push('src/wallabyTest.ts');
      return fs.outputJSON(p, o, {spaces: `\t`});
    })
}
function modifyTsconfig() {
  const p = path.join(process.cwd(), 'tsconfig.json');
  return fs.readJSON(p)
    .then(o => {
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
      return fs.outputJSON(path.join(process.cwd(), 'tsconfig.json'), o, {spaces: `\t`});
    })
}




// const readPath = path.join(process.cwd(), 'templates-lib', 'README.md');
// console.log(readPath);
// fs.readFile(readPath).then((s) => {
//   console.log(s.toString())
// }).catch(e => console.log(e))


console.log(`Building library ${lib}...`);
cp.spawn('ng', ['g', 'library', lib])
  .then(() => {
    const promises = [
      modifyPackageJson(),
      createLicense(),
      createReadmeMd(),
      copyWallabyJs(),
      copyTsconfigWallabySpecJson(),
      copyWallabyTestTs(),
      modifyTsconfigLibJson(),
      modifyTsconfig()
    ]
    return Promise.all(promises);
  })
  .then(() => {
    console.log(`Library ${lib} built.`);
  })
