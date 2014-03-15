/**
 * Created by Administrator on 13-12-25.
 */
define(function(){
    var tools = {}
    tools.array = {
        //移除数组中指定位置的元素，返回布尔表示成功与否。
        removeAt: function(target, index) {
            return !!target.splice(index, 1).length
        },
        //移除数组中第一个匹配传参的那个元素，返回布尔表示成功与否。
        remove: function(target, item) {
            var index = target.indexOf(item);
            if (~index)
                return this.removeAt(target, index);
            return false
        },
        //增加一个数据
        add: function(target,item){
            var index = target.indexOf(item) ;
            if (~index)
                return true;
            return target.push(item);
        },
        //对比两个数组，返回target中，不在exclud出现的数组
        compare:function(target,exclud){
            var a=[], diff=[];
            for(var i=0;i<exclud.length;i++)
                a[exclud[i]]=true;
            for(var j=0;j<target.length;j++)
                if(!a[target[j]])
                    diff.push(target[j]);
            return diff;
        },
        //对比两个数组，返回target中，在exclud出现的数组的个数
        comparecount:function(target,exclud){
            var a=[], diff=0;
            for(var i=0;i<exclud.length;i++)
                a[exclud[i]]=true;
            for(var j=0;j<target.length;j++)
                if(a[target[j]])
                    diff++;
            return diff;
        }
    }
    return tools
})
