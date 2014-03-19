/**
 * Created by Administrator on 14-2-18.
 */
define(["data/questions"], function(questions){
    var question = {
        data : questions,
        type :'type',
        id:0,
        order:'rand',
        getTypes : function(){
                    return questions.type
                },
        getSubject:function(){
                  return questions.subject
        },
        getDes :function(){
            return this.type === 'type'?'subject':'type'
        }
    }
    return question
})