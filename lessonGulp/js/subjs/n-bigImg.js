/**
 * Created by zjy on 2015/8/6.
 */
$(function () {
    //初始化
    var hash=location.hash;
    var ac_id=hash.substr(1);
    var bigBox=$("#bigBox");
    var zanObj=null;
    var $backBtn=$("#back-btn");
    $backBtn.click(function(){
        history.back();
    });
    $.ajax({
        url:"n-search.php",
        type:"get",
        async:false,
        data:{
            action:"getDetail",
            "id":ac_id
        },
        success:function(data){
            try{
                data=JSON.parse(data);
            }
            catch (e){
                alert("请求错误："+data);
                return;
            }
            bigBox.find(".sci_title").text(data.title);
            bigBox.find("img").attr("src",data.image.replace("/\\//","\/"));
            zanObj={"id":data.id,"done":0,"num":parseInt(data.digg_count)};
        },
        error:function(data){
            console.error("error");
            zanObj={"id":data.id,"done":0,"num":100};
        }
    });
    var bStatus=false;
    var wp=$(".wrapper");
    var wh=$(window).height();
    var ch;
    wp.height(wh);
    var $img=$("#bigBox img");
    //zan
    var zan=$(".zan");
    $img.on("load",function(){
        var ih=$(this).height();
        ch=$(".container").height();
        var bm=wh-ih-5;
        wp.scrollTop(0);

        if(bm>0){
            zan.css({"position":"fixed","bottom":bm+10,"right":15});
            $backBtn.css({"position":"fixed","bottom":bm+10,"left":15});
        }
        else{
            zan.css({"position":"fixed","bottom":10,"right":15});
            $backBtn.css({"position":"fixed","bottom":10,"left":15});
        }
    });

    wp.on("scroll",function(){
        var ih=$img.height();
        var bm=$img.offset().top+ih-wh;
        if(bStatus){
            if(bm>0){
                zan.css({"position":"fixed","bottom":10,"right":"15px"});
                $backBtn.css({"position":"fixed","bottom":10,"left":15});
                bStatus=false;
            }
        }
        else{
            if(bm<0){
                zan.css({"position":"absolute","bottom":ch-ih+10,"right":"10px"});
                $backBtn.css({"position":"absolute","bottom":ch-ih+10,"left":10});
                bStatus=true;
            }
        }
    });
    if(zanObj.done){
        zan.find(".heart").hide();
        zan.find(".heart-red").css("display","inline-block");
    }
    else{
        zan.find(".heart-red").hide();
        zan.find(".heart").css("display","inline-block");
    }

    zan.find(".zan-num").text(zanObj.num);
    //点赞
    zan.on("touchend", function (e) {
        e.preventDefault();
        if(!zanObj.done){
            var zanNum=$(this).find(".zan-num");
            $(this).find(".heart").hide();
            zan.find(".heart-red").css("display","inline-block");
            var num=dianZan(zanObj.id);
            zanNum.text(num);
            zanObj.num=num;
            zanObj.done=1;
        }
    });

    function dianZan(id) {
        var result=0;
        $.ajax({
            url:"n-search.php",
            type:"get",
            async:false,
            data:{
                action:"dianzan",
                "id":id
            },
            success:function(data){
                data=JSON.parse(data);

                result= parseInt(data.result);
            },
            error:function(data){
                result=100;
            }
        });
        return result;
    }
});