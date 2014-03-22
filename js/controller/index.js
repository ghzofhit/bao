/**
 * Created by Administrator on 14-2-18.
 */
define(['lib/avalon',
          'model/question',
          'text!view/index.html',
          'model/user',
          'model/answer',
          'lib/avalon.mulprocessbar'],
function (avalon,question,main,user,answer){
    window.navVM = avalon.define("nav", function(vm) {
        vm.types = question.getTypes()
        vm.subjects = question.getSubject()
        vm.testmode  =user.mode
        vm.time = 4;
        vm.clearshow = false;
        vm.clear= function(){
            vm.clearshow = true;
            (function(){
                vm.time =vm.time -1 ;
                if(vm.time <= 0){
                    vm.time = 4;
                    vm.clearshow = false;
                }else{
                    setTimeout(arguments.callee,1000);
                }
            })()
        }
        vm.confirmeclear = function(){
            vm.clearshow = false;
            answer.clear();
        }
        vm.changemode = function(){
            vm.testmode = !user.mode
            user.switch()
        }
        vm.go = function(e){
            var el = avalon(e.target);
            question.type = el.data("type")
            question.id = el.data("id")
            require(["controller/show"],function(ctr){
                ctr.action()
            })
        }
    })
    var ctr = {}
    ctr.action = function(){
        document.getElementById("main").innerHTML = main
        avalon.scan()
        avalon.nextTick(function() {
            answer.setVM(avalon.vmodels.mulbar).setQuestions(question.data.index.all).show()
        })
    }
    return ctr
});