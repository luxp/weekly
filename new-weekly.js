const fs = require('fs')
const path = require('path')

let firstWeeklyTime = new Date('2019-07-20')
let oneWeekTime = 1000 * 60 * 60 * 24 * 7

function fileExistsSync(filePath) {
  return fs.existsSync(path.resolve(__dirname, `./${filePath}`))
}

function prefixInt(int, length) {
  return ('0'.repeat(length) + int).slice(-length)
}
let diffTime = Date.now() - firstWeeklyTime
let weekNo = parseInt(diffTime / oneWeekTime) + 1

function getWeeklyDate(weekNo) {
  let nextWeekTime = new Date(+firstWeeklyTime + weekNo * oneWeekTime)
  let year = nextWeekTime.getFullYear()
  let month = prefixInt(nextWeekTime.getMonth() + 1, 2)
  let day = prefixInt(nextWeekTime.getDate(), 2)
  return {
    year,
    month,
    day
  }
}

function initWeeklyContent(weekNo) {
  let weeklyTitleNo = prefixInt(weekNo, 4)
  return `# 每周分享第 ${weeklyTitleNo} 期\n\n## React in depth\n\n## 分享\n`
}

function initWeekly() {
  let { year, month, day } = getWeeklyDate(weekNo)
  if (!fileExistsSync(year)) {
    fs.mkdirSync(path.resolve(__dirname, `${year}`))
  }
  if (!fileExistsSync(`${year}/${month}`)) {
    fs.mkdirSync(path.resolve(__dirname, `${year}/${month}`))
  }
  if (!fileExistsSync(`${year}/${month}/${day}.md`)) {
    fs.writeFileSync(
      path.resolve(__dirname, `${year}/${month}/${day}.md`),
      initWeeklyContent(weekNo)
    )
  }
}

function updateReadme() {
  let zhNumber = [
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
    '十一',
    '十二'
  ]
  let readmeStr = `# 每周分享\n\n> 每周六发布\n`
  let weeklySummaryMap = {}
  for (let i = 1; i <= weekNo; ++i) {
    let { year, month, day } = getWeeklyDate(i)
    weeklySummaryMap[year] = weeklySummaryMap[year] || {}
    weeklySummaryMap[year][month] = weeklySummaryMap[year][month] || []
    weeklySummaryMap[year][month].push({
      weeklyNo: i,
      year,
      month,
      day
    })
  }
  Object.keys(weeklySummaryMap).forEach(year => {
    readmeStr += `\n## ${year}\n\n`
    Object.keys(weeklySummaryMap[year]).forEach(month => {
      readmeStr += `- ${zhNumber[+month]}月: `
      weeklySummaryMap[year][month].forEach((weeklyItem, index) => {
        if (index > 0) {
          readmeStr += ` | `
        }
        readmeStr += `[第 ${prefixInt(weeklyItem.weeklyNo, 4)} 期](${
          weeklyItem.year
        }/${weeklyItem.month}/${weeklyItem.day}.md)`
      })
      readmeStr += '\n'
    })
  })
  fs.writeFileSync(path.resolve(__dirname, './README.md'), readmeStr)
}

initWeekly()
updateReadme()
