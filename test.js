const Replacer = require('./utils/Replacer')
const SaveJSON = require('./utils/SaveJSON')
const TextLoader = require('./utils/TextLoader')
const JSONLoader = require('./utils/JSONLoader')

const data = require('./data/sample1.json')
const sample_string = TextLoader('./data/formatted_text.txt')

const processed_string = Replacer(sample_string, data)
const save_path = __dirname + '/result.json'

SaveJSON(save_path, `{ "processed": "${ processed_string }" }`)

const processed_json = JSONLoader(save_path)
console.log('Processed JSON', processed_json)