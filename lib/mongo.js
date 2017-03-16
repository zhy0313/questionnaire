var config = require('../config.js');
var mongoose = require('mongoose');

//链接数据库
mongoose.connect(config.mongodb);

var questionnaireSchema = new mongoose.Schema({
    id : String,
    createTime : String,
    deadline : String,
    edit : String,
    title : String,
    questionList : [],
    answer : []
})

module.exports.questionnaire = mongoose.model('questionnaire', questionnaireSchema);