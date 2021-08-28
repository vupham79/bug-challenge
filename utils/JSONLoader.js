const TextLoader = require('./TextLoader')
const Replacer = require('./Replacer').revertSpecialCharacters

/**
 * 
 * @param {String} path json path
 * @returns {Object} json object
 */
const ParseJSON = (path) => {
    let text = TextLoader(path)

    const parsedText = JSON.parse(text)
    parsedText.processed = Replacer(parsedText.processed)

    return parsedText
}

module.exports = ParseJSON