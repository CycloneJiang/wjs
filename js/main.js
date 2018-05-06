/**
 * Created by user on 2018/4/22.
 */
var WJS =function(){

}
WJS.prototype = {
    //轮播图响应式
    adResponse : function(){
        var wWidth = $(window).width();
        var isSmallScreem = wWidth < 768;
        $(".lbo .item").each(function(i,item){
            var $item = $(item);
            var imgsrc = isSmallScreem?$item.data("image-xs"):$item.data("image-lg");
            if(isSmallScreem){
                $item.html("<img src='"+imgsrc+"'>");
            }else{
                $item.css("backgroundImage","url('"+imgsrc+"')");
                $item.empty();
            }
        })
    },
    //产品tab响应式
    productTabsResponse : function(){
        var $ul =$("#ul-warp .nav-tabs");
        var width = 0;
        $ul.children().each(function(index,element){
            width+=element.clientWidth;
        })
        if(width>$(window).width()){
            $ul.css("width",width).parent().css('overflow-x', 'scroll');
        }
    },
    //鼠标点击改变新闻标题
    changeNewsTitle: function(){
        var $newsTitle = $(".news-title");
        $("#news .newslis a").on("click",function(){
            var $this = $(this);
            var title = $this.data("title");
            $newsTitle.text(title);
        })
    },
    //移动端手指拖动轮播图滑动
    moblieChangeAd:function(){
        var $carousel =$(".carousel");
        var startx,endx,offset = 50;
        $carousel.on("touchstart",function(e){
            startx = e.originalEvent.touches[0].clientX;
        })
        $carousel.on("touchmove",function(e){
            endx = e.originalEvent.touches[0].clientX;
        })
        $carousel.on("touchend",function(){
            var distance = Math.abs(startx-endx);
            if(distance>offset){
                $(this).carousel(startx > endx ? 'next' : 'prev');
            }
        })
    }
}
$(function(){
    var wjs = new WJS();
    $(window).on("resize",function(){wjs.adResponse();wjs.productTabsResponse();}).trigger('resize');
    //初始化工具提示
    $('[data-toggle="tooltip"]').tooltip();
    //鼠标点击改变新闻标题
    wjs.changeNewsTitle();
    //移动端手指拖动轮播图滑动
    wjs.moblieChangeAd();
})
