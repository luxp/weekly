const execSync = require('child_process').execSync

execSync(
  'git checkout master && git merge draft && git push && git checkout draft && node ./new-weekly.js',
  {
    stdio: 'inherit'
  }
)
