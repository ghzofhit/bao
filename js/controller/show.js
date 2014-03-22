/**
 * Created by Administrator on 14-2-20.
 */
define(['lib/avalon',
            'model/question',
            'text!view/show.html',
            'model/user',
            'model/answer',
            'lib/avalon.mulprocessbar'],
    function (avalon,question,show,user,answer){
        window.detailVM = avalon.define("detail",function(vm){
            vm.subtitle =  question.data[question.type][question.id]
            vm.question = {title:"题目",type:0,subject:0};
            vm.subway = 0;
            vm.way = 'type';
            vm.options = {a:"aaa",b:"bbb"};
            vm.id = 0;
            vm.showresultbutton = true;
            vm.shownextbutton = false;
            vm.result = "";
            vm.cpresult = "all";
            vm.des = ""
            vm.show = function(){
                vm.subtitle =  question.data[question.type][question.id]
                vm.id = answer.get()
                vm.question = question.data.list[vm.id]
                vm.options = vm.question.options
                vm.result = vm.question.result
                vm.cpresult = vm.result
                var des =  question.getDes()
                vm.des = question.data[des][vm.question[des]]
                if(!user.mode){
                    vm.showresult()
                }else{
                    vm.showresultbutton = true;
                    vm.shownextbutton = false;
                }
            }
            vm.showresult = function(){
                vm.showresultbutton = false;
                vm.shownextbutton = true;
                answer.done("error",vm.id )
            }
            vm.check = function(e){
                var el = e.target.tagName == "B" ?avalon(e.target.parentElement):avalon(e.target);
                if(vm.shownextbutton){
                    return;
                }
                if(vm.result.indexOf(el.data('key'))>=0){
                    el.addClass('success');
                    vm.cpresult = vm.cpresult.replace(el.data('key'),"");
                    if(vm.cpresult ==''){
                        vm.showresultbutton = false;
                        vm.shownextbutton = true;
                        answer.done("good",vm.id )
                    }
                }else{
                    el.addClass('error');
                    vm.showresultbutton = false;
                    vm.shownextbutton = true;
                    answer.done("error",vm.id )
                }
            }
            vm.main = function(){
                require(['controller/index'], function (ctr){
                    ctr.action()
                });
            }
        });
        var ctr ={}
        ctr.action = function(){
            document.getElementById("main").innerHTML = show
            avalon.scan()

            avalon.nextTick(function() {
                answer.setVM(avalon.vmodels.mulbar).setQuestions(question.data.index[question.type][question.id]).show()
                detailVM.show()
            })
        }

        return ctr
    });
