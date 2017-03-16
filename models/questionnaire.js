var  Questionnaire = require('../lib/mongo').questionnaire;

module.exports = {
    save : function(questionnaire){
        return Questionnaire
            .create(questionnaire);
    },
    delete : function(idArr){
        return Questionnaire
            .remove({
                id : { $in : idArr}
            })
    },
    getAll : function(){
        return Questionnaire
            .find()
            .exec()
    },
    getOne : function(id){
        return Questionnaire
        .find({ id : id})
        .exec()
    },
    update : function(id, newQuestionnaire){
        return Questionnaire
        .update(
            { id : id},
            newQuestionnaire
        )
    },
    submit : function(id, answer){
        return Questionnaire
        .update(
            { id : id},
            { $push : { answer : answer}} 
        )
    },
    getAnswer : function(id){
        return Questionnaire
            .find({ id : id}, 'questionList title answer -_id')
            .exec()
    }
}