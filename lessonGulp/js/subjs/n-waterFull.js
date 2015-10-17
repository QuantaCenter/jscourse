/**
* Created by zjy on 2015/8/7.
*/
var waterFull={
    "colNum":0,
    "margin":0,
    "heightArray":null,
    "imgData":null,
    "container":null,
    "conWidth":0,
    "boxWidth":0,
    "newA":null,
    "imgStatus":false,
    "imgIndex":0,
    "q":null,
    "fq":null,
    "clothClass":null,
    "start":0,
    "rows":0,
    "ajaxStatus":true,
    "zanObj":[],
    "nowId":null,
    "IFMax":false,

    "init":function(margin,rows,words,container){
        var self=this;
        self.colNum=2;
        self.margin=margin;
        self.container=$(container);
        self.conWidth=self.container.width();
        self.boxWidth=(self.conWidth-self.margin)/2;
        self.newA=new Array();
        self.heightArray=new Array();
        self.q= words[0];
        self.fq= words[1].split("/").join(" OR ");
        self.clothClass= words[2];
        //self.words= words[0]+" AND ("+words[1].split("/").join(" OR ")+")";
        //self.words= "明灰色 AND (长裤 OR 中裤 OR 七分裤 OR 九分裤)";
        self.start=0;
        self.rows=rows;

        self.getAjax(self.start,self.rows);
        self.bindEvent();
    },

    "bindEvent":function(){
        var self=this;
        var wh=$(window).height();
        var lm=$(".loading-message");
        $(".container").on("scroll",function(){
            var LFTop=lm.offset().top;

            if(self.IFMax){
                $(".container").off("scroll");
                $(".loading-message").text("无更多推荐");
                setTimeout(function(){
                    lm.animate({"height":0},function(){
                        lm.remove();
                    });
                },4000);
            }
            if(wh+50>LFTop){
                if(self.ajaxStatus){
                    self.getAjax(self.start,self.rows);
                }
            }
        });

        //大图
        $(window).on("hashchange",function(){
            var hash=location.hash;
            if(hash=="#" || !hash){
                $("#bigBox").hide();
            }
        });
        $(document).on("click",".imgA",function(){
            var hash=location.hash;
            if(!hash){
                location.hash=$(this).attr("href")
            }
            var bStatus=false;
            var src=$(this).find("img").attr("src");
            var bigBox=$("#bigBox");
            var bigBoxIn=$(".imgBoxIn");
            var $backBtn=$("#back-btn");
            var $img=bigBoxIn.find("img");
            bigBox.show();
            self.getDetail($(this).attr("href"));

            $img.attr("src",src);
            var ih=$img.height();
            var wh=bigBox.height();
            var bm=wh-ih-5;
            bigBox.scrollTop(0);
            if(bm>0){
                zan.css({"position":"fixed","bottom":bm+10,"right":15});
                $backBtn.css({"position":"fixed","bottom":bm+10,"left":15});
            }
            else{
                zan.css({"position":"fixed","bottom":10,"right":15});
                $backBtn.css({"position":"fixed","bottom":10,"left":15});
            }
            bigBox.on("scroll",function(){
                var ih=$img.height();
                var ch=bigBoxIn.height();
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
        });
        $("#back-btn").on("touchend", function (e) {
            e.preventDefault();
            history.back();
            $("#bigBox").hide();
        });

        //点赞
        var zan=$(".zan");
        zan.on("touchend", function (e) {
            e.preventDefault();
            if($.inArray(self.nowId,self.zanObj)==-1){
                var zanNum=$(this).find(".zan-num");
                $(this).find(".heart").hide();
                zan.find(".heart-red").css("display","inline-block");
                var num=self.dianZan(self.nowId);
                zanNum.text(num);
            }
        });
    },
    getDetail: function (id) {
        var self=this;
        id=id.substr(1);
        $.ajax({
            url:"n-search.php",
            type:"get",
            async:false,
            data:{
                action:"getDetail",
                "id":id
            },
            success:function(data){
                try{
                    data=JSON.parse(data);
                }
                catch (e){
                    alert("请求错误："+data);
                    return;
                }
                debugger
                $(".sci_title").text(data.title);
                self.nowId=id;
                var zan=$(".zan");
                zan.find(".zan-num").text(data.digg_count);
                if($.inArray(id,self.zanObj)!=-1){
                    zan.find(".heart").hide();
                    zan.find(".heart-red").css("display","inline-block");
                }
                else{
                    zan.find(".heart-red").hide();
                    zan.find(".heart").css("display","inline-block");
                }
            },
            error:function(data){
                self.zan[self.index]={"done":0,"num":100};
            }
        });
    },

    dianZan: function (id) {
        var self=this;
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
                self.zanObj.push(id);
                result= parseInt(data.result);
            },
            error:function(data){
                result=100;
            }
        });
        return result;
    },

    "getAjax":function(start,rows){
        var self=this;
        self.start+=self.rows;
        self.ajaxStatus=false;
        $.ajax({
            url:"n-search.php",
            type:"GET",
            data:{
                "action":"search",
                "q":self.q,
                "fq":self.fq,
                "clothclass":self.clothClass,
                "start":start,
                "rows":rows
            },
            dataType:"string",
            success:function(data){
                debugger
                console.log(data);
                data = data.replace(/\\\"/g,"'");
                data = data.replace(/\\n/g,"");
                try{
                    data=JSON.parse(data);
                }
                catch(e){
                    $(".loading-message").text("商品请求失败");
                }
                self.data = data.response;
                //console.log(data);
                if(self.data.numFound<rows){
                    $(".loading-message").text("无更多推荐");
                }
                if(self.data.numFound<self.start){
                    self.IFMax=true;
                }
                else{
                    $("#loading-message-show").text("正在加载 "+(self.start+1)+"/"+self.data.numFound);
                }
                self.imgStatus=true;
                self.imgLoad();
            },
            error: function (data) {
                alert("数据获取出错，请重试");
                waterFull=null;
            }
        });
    },

    "imgLoad":function(){
        var self=this;
        if(self.imgStatus){
            var docs=self.data.docs;
            var len=self.data.docs.length;
            var con=document.createDocumentFragment();
            self.newA.length=0;
            for(var i=0;i<len;i++)
            {
                var a=$("<a>").attr({"class":"imgA","href":"#"+docs[i].id});
                var img=$("<img>").attr("src",docs[i].sci_image).appendTo(a);
                a.appendTo($(con));
                //将元素加入新建数组中
                self.newA.push(a);
            }
            $(con).appendTo(self.container);
            self.imgStatus=false;
            self.imgLocation();
            self.ajaxStatus=true;
            docs=null;
            len=null;
            self=null;
        }
    },

    "imgLocation": function () {
        var self=this;
        var boxLocation= 0;
        var minKey= 0;
        var curCol=0;
        var boxHeight=0;
        var len=self.newA.length+self.imgIndex;
        var docs=self.data.docs;
        var i=0;
        for(var index=self.imgIndex;index<len;index++){
            var a=self.newA[i];
            var feelings;
            try{
                feelings=docs[i].sci_feeling.replace(/\'/g,"\"");
                feelings=JSON.parse(feelings);
            }
            catch (e){
                feelings=docs[i].sci_feeling;
            }

            i++;

            //console.log(feelings);
            try{
                boxHeight=feelings.img_size.height/feelings.img_size.width*self.boxWidth;
            }
            catch(e){
                $(a).remove();
                continue;
            }
            //console.log(1);
            if(index<self.colNum){
                minKey=index;
                if(minKey==0){
                    boxLocation=0;
                }
                else{
                    boxLocation=self.boxWidth+self.margin;
                }
                $(a).css({
                    "width":self.boxWidth,
                    "height":boxHeight,
                    "top":curCol,
                    "left":boxLocation
                });
                self.heightArray[minKey]=parseInt(boxHeight+self.margin);

            }
            else{
                curCol=Math.min.apply(null,self.heightArray);
                minKey=$.inArray(curCol,self.heightArray);
                if(minKey==0){
                    boxLocation=0;
                }
                else{
                    boxLocation=self.boxWidth+self.margin;
                }
                $(a).css({
                    "width":self.boxWidth,
                    "height":boxHeight,
                    "top":curCol,
                    "left":boxLocation
                });
                self.heightArray[minKey]+=parseInt(boxHeight+self.margin);
            }
        }
        self.container.height(Math.max.apply(null,self.heightArray));
        self.imgIndex=len-1;
    }
};