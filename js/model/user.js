/**
 * Created by Administrator on 14-2-18.
 */
define(function(){
    var user ={
        id:0,
        name:"Anonymous",
        status:0,
        mode:true
    }
    if(localStorage && JSON){
        if(localStorage.user){
            user = JSON.parse(localStorage.user);
        }
    }
    user.save = function(){
        localStorage.user =   JSON.stringify(this);
    }
    user.switch = function(){
        this.mode = !this.mode
        this.save()
    }


    return user
})