/**
 * Created by Administrator on 14-2-18.
 */
define(['component/tools','model/user'],function(tools,user){
    var answer = {
        vm : 'nil',
        questions:[],
        order : 'rand',
        answers:(localStorage && JSON && localStorage['answer'+user.id])?JSON.parse(localStorage['answer'+user.id]):{error:[],good:[]},
        setVM :function(vm){
             this.vm = vm
             return this
        },
        setQuestions:function(questions){
            this.questions = questions
            return this
        },
        show :function(){
            if(this.vm!=='nil' && this.answers !=='nil'){
                this.vm.error = tools.array.comparecount(this.answers.error,this.questions)
                this.vm.good = tools.array.comparecount(this.answers.good,this.questions)
                this.vm.unreviewed = this.questions.length - this.vm.error - this.vm.good
            }else{
                console.error("Please set vm and questions first!")
            }
        },
        clear:function(){
            this.answers = {error:[],good:[]}
            localStorage['answer'+user.id] =   JSON.stringify(this.answers);
            this.show()
        },
        get:function(){
            var temp = []
            if(user.mode){
                temp = tools.array.compare(this.questions,this.answers.good)
            }else{
                temp = tools.array.compare(this.questions,this.answers.error)
            }
            if(this.order === 'rand'){
                return temp[parseInt(Math.random()*temp.length)]
            }else{
                return temp[0]
            }
        },
        done:function(result,id){
            tools.array.remove(this.answers.good,id)
            tools.array.remove(this.answers.error,id)
            tools.array.add(this.answers[result],id)
            localStorage['answer'+user.id] =   JSON.stringify(this.answers);
            this.show()
        }
    }
    return answer
})