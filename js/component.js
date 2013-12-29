/**
 * Created by Administrator on 13-12-25.
 */
var ArrayTool = {
    removeAt: function(target, index) {
        //移除数组中指定位置的元素，返回布尔表示成功与否。
        return !!target.splice(index, 1).length
    },
    remove: function(target, item) {
        //移除数组中第一个匹配传参的那个元素，返回布尔表示成功与否。
        var index = target.indexOf(item);
        if (~index)
            return ArrayTool.removeAt(target, index);
        return false
    },
    add: function(target,item){
        var index = target.indexOf(item) ;
        if (~index)
            return true;
        return target.push(item);
    },
    compare:function(target,exclud){
        var a=[], diff=[];
        for(var i=0;i<exclud.length;i++)
            a[exclud[i]]=true;
        for(var j=0;j<target.length;j++)
            if(!a[target[j]])
            diff.push(target[j]);
        return diff;
    },
    comparecount:function(target,exclud){
        var a=[], diff=0;
        for(var i=0;i<exclud.length;i++)
            a[exclud[i]]=true;
        for(var j=0;j<target.length;j++)
            if(a[target[j]])
                diff++;
        return diff;
    }
};

var Topic = {
    getOneBy:function(type,id){
        return type=='type'?this.getOneByType(id):this.getOneBySubject(id);
    },
    getOneByType:function(type){
        type = type || 0;
        type = (parseInt(type)>3 ||parseInt(type)<0) ?0:parseInt(type);
        var pools = ArrayTool.compare(qData.type_index[type],User.process.learned);
        if (pools.length==0){
            pools = qData.type_index[type];
        }
        return pools[parseInt(Math.random()*pools.length)];
    },
    getOneBySubject:function(subject){
        subject = subject || 0;
        subject = (parseInt(subject)>6 ||parseInt(subject)<0) ?0:parseInt(subject);
        var pools = ArrayTool.compare(qData.subject_index[subject],User.process.learned);
        if (pools.length==0){
            pools = qData.subject_index[subject];
        }
        return pools[parseInt(Math.random()*pools.length)];
    },
    getOne:function(){
        var pools = ArrayTool.compare(qData.all,User.process.learned);
        if (pools.length==0){
            pools = qData.all;
        }
        return pools[parseInt(Math.random()*pools.length)];
    }
};
var User = {
    process:{
             'detail':[],
             'learned':[],
             'error':[],
             'serious':[]
            },
    save:function(){
        localStorage.userprocess =   JSON.stringify(this.process);
    },
    init:function(){
        if(localStorage && JSON){
            if(localStorage.userprocess){
                this.process = JSON.parse(localStorage.userprocess);
            }
        }
    },
    right:function(id){
        if(this.process.detail[id]==undefined){
            this.process.detail[id] = {score:1};
        }else{
            this.process.detail[id]['score'] = this.process.detail[id]['score']==1?1:(this.process.detail[id]['score']+1);
        }
        ArrayTool.add(this.process.learned,id);
        ArrayTool.remove(this.process.error,id);
        this.save();
    },
    wrong:function(id){
        if(this.process.detail[id]==undefined){
            this.process.detail[id] = {score:-1};
        }else{
            this.process.detail[id]['score']--;
        }
        ArrayTool.add(this.process.error,id);
        ArrayTool.remove(this.process.learned,id);
        this.save();
    },
    clear:function(){
        localStorage.removeItem("userprocess");
        this.process =  {
            'detail':[],
                'learned':[],
                'error':[],
                'serious':[]
        };
    }
};
User.init();