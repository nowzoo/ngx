const gulp = require('gulp');


const spawnPCmd = (cmd, params, cwd) => {
  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    const spawned = spawn(cmd, params, {stdio: 'inherit', cwd});
    let message = null;
    spawned.on('error', (_)=> {reject(_)});
    spawned.on('message', (_)=> {message = _});
    spawned.on('close', (_)=> {resolve(message)});
  });
}

const buildLib = async (name, cb) => {
  const { join } = require('path');
  const { readJson, writeJson } = require('fs-extra');
  const libDir = join(process.cwd(), 'projects', name);
  const distDir = join(process.cwd(), 'dist', name);
  
  await spawnPCmd('ng', ['build', name], process.cwd());
  await spawnPCmd('cp', ['LICENSE', distDir], libDir)
  await spawnPCmd('cp', ['README.md', distDir], libDir)
  await spawnPCmd('npm', [`pack`], distDir);
  const builtPkg = await readJson(join(distDir, 'package.json'));
  const fname = `nowzoo-${name}-${builtPkg.version}.tgz`;
  await spawnPCmd('mv', [fname, '../'], distDir);
  console.log(`npm i -S ${join(process.cwd(), 'dist', fname)}`);
  cb(null);
}




gulp.task('build:ngx-route-utils',  (cb) => {
  buildLib('ngx-route-utils', cb);
});

gulp.task('build:ngx-window-title',  (cb) => {
  buildLib('ngx-window-title', cb);
});

gulp.task('build:ngx-crumbs',  (cb) => {
  buildLib('ngx-crumbs', cb);
});

gulp.task('build:ngx-sign-in-redirect',  (cb) => {
  buildLib('ngx-sign-in-redirect', cb);
});

gulp.task('build:ngx-fire',  (cb) => {
  buildLib('ngx-fire', cb);
});



gulp.task('cov', () => {
  const browserSync = require('browser-sync').create();

  browserSync.init({
    watch: true,
    server: {
      baseDir: './coverage',
      directory: true
    },
  });

})
