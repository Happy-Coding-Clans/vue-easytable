
const path = require('path')
const fs = require('fs')
const fsExtra = require('fs-extra')

let copyFrom = path.join(__dirname, './../packages'),
    copyTo = path.join(__dirname,  './../libs');

// 排除主题、字体文件
const filterFunc = (src, dest) => {
    // your logic here
    // it will be copied if return true

    if (src.indexOf('\\packages\\font') > -1 || src.indexOf('\\packages\\themes-base') > -1 || src.indexOf('\\packages\\themes-blue') > -1){
        return false
    }
    return true;
}

// copy 未转换的文件
fsExtra.copy(copyFrom,copyTo,{ filter: filterFunc }, err => {
    if (err) return console.error(err)
    console.log(`Copy from ${copyFrom} to ${copyTo} success!`)
})
