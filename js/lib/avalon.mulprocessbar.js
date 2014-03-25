/**
 * Created by Administrator on 14-2-8.
 */

define(["lib/avalon"],function(avalon){
    var widget = avalon.ui.mulprocessbar = function(element,data,vmodels){
        var options = data.mulprocessbarOptions, model, el
        element.innerHTML = [
            '<div class="well review-progress clearfix"  ms-attr-id="\'progressbar' + data.mulprocessbarId + '\'" >',
                '<div class="progress pull-right progress-danger" ms-css-width="errorwidth">',
                    '<div class="bar" style="width: 100%"><span class="num">{{error}}</span></div></div>',
                '<div class="progress pull-left progress-reviewed " ms-css-width="goodwidth">',
                    '<div class="bar reviewed pull-left" style="width: 100%;"><span class="num">{{good}}</span>',
                    '</div>',
                '</div>',
                    '<div class="progress pull-left progress-unreviewed" ms-css-width="unreviewedwidth">',
                    '<div class="bar" style="width: 100%"><span class="num">{{unreviewed}}</span>',
                    '</div>',
                '</div>',
            '</div>'].join("")
        var fragment = document.createDocumentFragment()
        while (el = element.firstChild) {
            fragment.appendChild(el)
        }
        model = avalon.define(data.mulprocessbarId, function(vm) {
            vm.error  = options.error
            vm.good = options.good
            vm.unreviewed = options.unreviewed
            vm.errorwidth = {
                get:function(){
                    return Math.round(10000*(this.error/ (this.error+this.good+this.unreviewed)))/100 +"%";
                }
            }
            vm.goodwidth = {
                get:function(){
                    return Math.round(10000*(this.good/ (this.error+this.good+this.unreviewed)))/100 +"%";
                }
            }
            vm.unreviewedwidth = {
                get:function(){
                    return Math.round(10000*(this.unreviewed/ (this.error+this.good+this.unreviewed))-1)/100 +"%";
                }
            }
        })
        avalon.nextTick(function() {
            element.appendChild(fragment)
            avalon.scan(element, [model].concat(vmodels))
        })

        return model
    }


    widget.defaults = {
        error:100,
        good:50,
        unreviewed:10
    }
    return avalon
})