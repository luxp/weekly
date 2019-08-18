const execSync = require('child_process').execSync

execSync(
  'git checkout master && git merge draft && git push && git checkout draft && node ./new-weekly.js && git commit -am "init weekly" && git push',
  {
    stdio: 'inherit'
  }
)
