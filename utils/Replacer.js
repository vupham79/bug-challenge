const _ = require('lodash')

const tag_cleaner = (tag, open_tag, close_tag) => tag.replace(open_tag, '').replace(close_tag, '')

const tags = [ 
    {
        tag: /\{\{(.*?)\}\}/g,
        open_tag: /^\{\{/,
        close_tag: /\}\}$/,
        resolver: function(data) {
            return (tag) => _.get(data, tag_cleaner(tag, this.open_tag, this.close_tag))
        }
    }
]

/**
 * 
 * @param {String} text the string to be processed
 * @param {Object} source_data {} object that contains the source data
 * @returns {String} processed string
 */
const replaceTag = (text, source_data = {}) => {
    let new_text = text + ''

    tags.forEach(ftag => {
        new_text = new_text.replace(ftag.tag, ftag.resolver(source_data))
    })

    new_text = replaceSpecialCharacters(new_text)

    return new_text
}

/**
 * 
 * @param {String} text the string to be replaced
 * @returns {String} replaced string
 */
const replaceSpecialCharacters = (text) => {
    return text.replaceAll('"', "&quot;")
}

/**
 * 
 * @param {String} text the string to be reverted
 * @returns {String} reverted string
 */
const revertSpecialCharacters = (text) => {
    return text.replaceAll('&quot;', "\"")
}

module.exports = {
    replaceTag,
    replaceSpecialCharacters,
    revertSpecialCharacters
}