var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var Questionnaire = require('./models/questionnaire');

router.get('/api/save', function(req, res, next){
    var questionnaire = req.query;
    questionnaire.id = uuid.v4();
    Questionnaire.save(questionnaire)
    .then(function(){
        res.json({
            code : 1
        })
    })
    .catch(function(err){
        if(err){
            res.json({
                code : 0
            })
        }
    })
})

router.get('/api/delete', function(req, res, next){
    var idArr = req.query.idArr;
    Questionnaire.delete(idArr)
    .then(function(){
        res.json({
            code : 1
        })
    })
    .catch(function(err){
        if(err){
            res.json({
                code : 0
            })
        }
    })
})

router.get('/api/getAll', function(req, res, next){
    Questionnaire.getAll()
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        if(err){
            res.json({
                code : 0
            })
        }
    })
})

router.get('/api/getOne', function(req, res, next) {
    var id = req.query.id;
    Questionnaire.getOne(id)
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        if(err){
            res.json({
                code : 0
            })
        }
    })
})

router.get('/api/update', function(req, res, next){
    var id = req.query.id;
    var newQuestionnaire = req.query.newQuestionnaire;

    Questionnaire.update(id, newQuestionnaire)
    .then(function(){
        res.json({
            code : 1
        })
    })
    .catch(function(err){
        if(err){
            res.json({
                code : 0
            })
        }
    })   
})

router.get('/api/submit', function(req, res, next){
    var id = req.query.id;
    var answer = req.query.data;

    Questionnaire.submit(id, answer)
    .then(function(){
        res.json({
            code : 1
        })
    })
    .catch(function(err){
        if(err){
            res.json({
                code : 0
            })
        }
    }) 
})

router.get('/api/getAnswer', function(req, res, next){
    var id = req.query.id;
    Questionnaire.getAnswer(id)
    .then(function(data){
        var map = [];
        questionList = data[0].questionList;
        answerAll = data[0].answer;
        title = data[0].title;
        //建立映射
        questionList.forEach(function(questionItem, index){
            map[index] = {};
            map[index].title = questionItem.content.title;
            if(questionItem.type == 'single'){
                map[index].type = 'single';
                map[index].answer = {};
                questionItem.content.options.forEach(function(item){
                    map[index].answer[item] = 0;
                })
            }else if(questionItem.type == 'multiple'){
                map[index].type = 'multiple';
                map[index].answer = {};
                questionItem.content.options.forEach(function(item){
                    map[index].answer[item] = 0;
                })                
            }else{
                map[index].type = 'text';
                map[index].answer = {};
                map[index].answer.total = 0;
                map[index].answer.valid = 0;
            }
        })
        //添加数据
        answerAll.forEach(function (answer) {
            answer.forEach(function (answerItem, index) {
                if (answerItem.type == 'single') {
                    map[index].answer[answerItem.content] += 1;
                } else if (answerItem.type == 'multiple') {
                    answerItem.content.forEach(function (item) {
                        map[index].answer[item] += 1;
                    })
                } else {
                    if (answerItem.content) {
                        map[index].answer.valid += 1;
                    }
                    map[index].answer.total += 1;
                }
            })
        })
        res.json({
            title : title,
            answers : map
        });
    })
})

module.exports = router;