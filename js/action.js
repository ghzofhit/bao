/**
 * Created by Administrator on 13-12-25.
 */

function detail(type, id) {
    type = type || 'all';
    detailVM.subway = id;
    detailVM.subtitle = type == "all" ? "所有" : metaData[type][id];
    detailVM.way = type;
    detailVM.id = Topic.getOneBy(type, id);
    detailVM.showresultbutton = true;
    detailVM.shownextbutton = false;
    var qu = qData.questions[detailVM.id];
    detailVM.question.title = qu.title;
    detailVM.question.type = qu.type;
    detailVM.question.subject = qu.subject;
    detailVM.options = qu.options;
    detailVM.result = qu.result;
    detailVM.cpresult = qu.result;
    refreshprocessdetail();
}

function refreshprocess(type,id){
    var no = {};
    if(type !='all'){
        no.error = ArrayTool.comparecount(User.process.error,qData[type+'_index'][id]);
        no.good = ArrayTool.comparecount(User.process.learned,qData[type+'_index'][id]);
        no.unreviewed = qData[type+'_index'][id].length- no.error-no.good;
    }else{
        no.error = User.process.error.length;
        no.good = User.process.learned.length;
        no.unreviewed = qData.questions.length-no.error-no.good;
    }
    return no;
}
function   refreshprocessmain(){
    var  no =  refreshprocess("all");
    navVM.process.error = no.error;
    navVM.process.good = no.good;
    navVM.process.unreviewed = no.unreviewed;
}
function   refreshprocessdetail(){
    var  no =  refreshprocess(detailVM.way,detailVM.subway);
    detailVM.process.error = no.error;
    detailVM.process.good = no.good;
    detailVM.process.unreviewed = no.unreviewed;
}

function showresult(){
    detailVM.showresultbutton = false;
    detailVM.shownextbutton = true;
}
function success(){
    User.right(detailVM.id);
    refreshprocessdetail();
}
function fault(){
    User.wrong(detailVM.id);
    refreshprocessdetail();
}
function countdown(){
    navVM.time =navVM.time -1 ;
    if(navVM.time <= 0){
        navVM.time = 4;
        navVM.clearshow = false;
    }else{
        setTimeout("countdown();",1000);
    }
}