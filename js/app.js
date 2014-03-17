/**
 * Created by Administrator on 14-2-17.
 */
require.config({
    shim:{
        'lib/avalon':{exports: 'avalon'}
    }
});
require(['controller/index'], function (ctr){
    ctr.action()
  /*  page.base("/bao")
    page('/', function(){
        require(['controller/index'],function(){

        })
    })
    page('/show/:type/:id',function(ctx){
        require(['bao/js/controller/show'],function(ctr){
            ctr.index(ctx.params.type,ctx.params.id)
        })
    })
    page();
   */
});