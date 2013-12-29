/**
 * Created by Administrator on 13-12-25.
 */
var mainVM = avalon.define("main",function(vm){
    vm.navshow = true;
    vm.detailshow = false;
	vm.height = "";
});
var navVM = avalon.define("nav", function(vm) {
    vm.types = window.metaData.type;
    vm.subjects = window.metaData.subject;
    vm.process = refreshprocess("all");
    vm.errorwidth = {
        get:function(){
            return Math.round(10000*(this.process.error/ (this.process.error+this.process.good+this.process.unreviewed)))/100 +"%";
        }
    };
    vm.goodwidth = {
        get:function(){
            return Math.round(10000*(this.process.good/ (this.process.error+this.process.good+this.process.unreviewed)))/100 +"%";
        }
    };
    vm.unreviewedwidth = {
        get:function(){
            return Math.round(10000*(this.process.unreviewed/ (this.process.error+this.process.good+this.process.unreviewed))-1)/100 +"%";
        }
    };
    vm.go = function(e) {
        var el = avalon(e.target);
        mainVM.detailshow = true;
        mainVM.navshow = false;
        detail(el.data("type"),el.data("id"));
    };
    vm.time = 4;
    vm.clearshow = false;
    vm.clear= function(){
        vm.clearshow = true;
        countdown();
    }
    vm.confirmeclear= function(){
        vm.clearshow = false;
        User.clear();
        refreshprocessmain();
    }
});
var detailVM = avalon.define("detail",function(vm){
    vm.process = {good:0,error:0,unreviewed:100};
    vm.subtitle =  "所有";
    vm.question = {title:"题目",type:0,subject:0};
    vm.subway = 0;
    vm.way = 'type';
    vm.options = {a:"aaa",b:"bbb"};
    vm.id = 0;
    vm.showresultbutton = true;
    vm.shownextbutton = false;
    vm.result = "";
    vm.cpresult = "";

    vm.des = {
        get: function() {
            return this.way=='type'? metaData.subject[this.question.subject]:metaData.type[this.question.type];
        }
    };
    vm.errorwidth = {
        get:function(){
             return Math.round(10000*(this.process.error/ (this.process.error+this.process.good+this.process.unreviewed)))/100 +"%";
        }
    };
    vm.goodwidth = {
        get:function(){
            return Math.round(10000*(this.process.good/ (this.process.error+this.process.good+this.process.unreviewed)))/100 +"%";
        }
    };
    vm.unreviewedwidth = {
        get:function(){
            return Math.round(10000*(this.process.unreviewed/ (this.process.error+this.process.good+this.process.unreviewed))-1)/100 +"%";
        }
    };
    vm.check = function(e){
        var el = e.target.tagName == "B" ?avalon(e.target.parentElement):avalon(e.target);
        if(detailVM.shownextbutton){
            return;
        }
        if(detailVM.result.indexOf(el.data('key'))>=0){
            el.addClass('success');
            detailVM.cpresult = detailVM.cpresult.replace(el.data('key'),"");
            if(detailVM.cpresult ==''){
                showresult();
                success();
            }
        }else{
            el.addClass('error');
            showresult();
            fault();
        }
    }
    vm.showresult = function(e){
        showresult();
        fault();
    }
    vm.next  = function(e){
        detail(detailVM.way,detailVM.subway);
    }
    vm.main = function(){
        mainVM.navshow =true;
        mainVM.detailshow=false;
        refreshprocessmain();
    }
});

avalon.scan();

window.addEventListener('load',function(){
	if(document.documentElement.scrollHeight <= document.documentElement.clientHeight &&
	('ontouchstart' in window || 'msmaxtouchpoints' in window.navigator)	
	) { 
		mainVM.height = document.documentElement.clientWidth / screen.width * screen.height + 'px'; 
	} 
	setTimeout(function() { 
		window.scrollTo(0, 1) 
	}, 0); 
	},false);