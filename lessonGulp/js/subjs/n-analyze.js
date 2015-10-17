$(function(){
    var control = navigator.control || {};
    if (control.gesture) {
        control.gesture(false);
    }
	var analyze = {
		index:0,
		count:0,
        result:null,
        zan:[],
        bStatus:false,
        title:[],
        liWidth:0,

		init:function(){
			var self = this;
			var t = $(window).width()/320;
            var wh=$(window).height();
			$(".header,.search").each(function(){
				var $ele = $(this);
				var height = $ele.css("height");
				$ele.css({"height":parseInt(height)*t+'px'});
                $ele=null;
                height=null;
			});
            self.count = 6;
            self.index = 0;
            self.zan=new Array(self.count);
            for(var i=0;i<self.count;i++){
                self.zan[i]=0;
            }

            $("#loading").css("top",($(window).height()-100)/2);

            $(".arrow-left,.arrow-right").css({"top":wh/2+'px'});
            $(".pic-box li").width($(window).width()-10);
            self.liWidth=$(window).width()-10;
            $(".footer").css({"top":wh-40+"px"});
            $(".wrapper").height(wh);
            //获取数据源
            $.ajax({
                url:'n-search.php',
                type:"get",
                data:{
                    "action":"index",
                    "start":0,
                    "rows":self.count
                },
                success:function(data){
                    data=JSON.parse(data);
                    self.result=data.response;
                    self.resize();
                },
                error:function(xhr,status,statusText){
                    alert("获取数据失败，请稍后再试");
                    var content = "";
                    for(var i in xhr){
                        content += "xhr["+i+"]:"+xhr[i]+"\r";
                    }
                    console.log(content+" "+status+" "+statusText)
                    analyze=null;
                }
            });
			self.initSlide();
			self.bindEvent();
		},

        getDetail: function (id) {
            var self=this;
            $.ajax({
                url:"n-search.php",
                type:"get",
                async:false,
                data:{
                    action:"getDetail",
                    "id":id
                },
                success:function(data){
                    data=JSON.parse(data);
                    self.title[self.index]=data.title;
                    var zan=$("#bigZan");
                    zan.find(".zan-num").text(parseInt(data.digg_count));
                    $(".sci_title").text(data.title);
                    if(self.zan[self.index]==1){
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
            id=id.substr(1);
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
        },

		bindEvent:function(){
			var self = this;
            var st=$(".search-btn");
            var pb=$(".pic-box");

            st.on("touchstart",function(){
				$(this).addClass("search-btn-tap");
			});
            st.on("touchend touchcancel",function(){
				$(this).removeClass("search-btn-tap");
			});
            st.on("touchend",function(e){
                $("form[name='search-form']").submit();
                e.preventDefault();
            });
            pb.on("swipeLeft",function(){
                self.slideLeft();
            });
            pb.on("swipeRight",function(){
                self.slideRight();
            });
            //$(".arrow-left").on("touchend",function(e){
            //    self.slideRight();
            //    e.preventDefault();
            //});
            //$(".arrow-right").on("touchend",function(e){
            //    self.slideLeft();
            //    e.preventDefault();
            //});
            //点赞
            var zan=$("#bigZan");
            zan.on("touchend", function (e) {
                e.preventDefault();
                if(self.zan[self.index]==0){
                    var zanNum=zan.find(".zan-num");
                    zan.find(".heart").hide();
                    zan.find(".heart-red").css("display","inline-block");
                    var num=self.dianZan($(".pic-box li").eq(self.index).children("a").attr("href"));
                    zanNum.text(num);
                    self.zan[self.index]=1;
                }
            });
            //大图

            $(window).on("hashchange",function(){
                var hash=location.hash;
                if(hash=="#" || !hash){
                    $("#bigBox").hide();
                }
            });

            $(".pic-box ul a").on("click", function () {
                var hash=location.hash;
                if(!hash){
                    location.hash=$(this).attr("href");
                }
                var bigBox=$("#bigBox");
                bigBox.show();
                var src=$(this).find("img").attr("src");
                var $img=bigBox.find("img");
                var $bigZan=$("#bigZan");
                var $backBtn=$("#back-btn");
                var bigBoxIn=$(".imgBoxIn");
                var bStatus=false;

                $img.attr("src",src);

                var ih=$img.height();
                var wh=bigBox.height();
                var bm=wh-ih-5;
                //获赞
                self.getDetail(self.result.docs[self.index].id);

                if(bm>0){
                    $bigZan.css({"position":"fixed","bottom":bm+10,"right":15});
                    $backBtn.css({"position":"fixed","bottom":bm+10,"left":15});
                }
                else{
                    $bigZan.css({"position":"fixed","bottom":10,"right":15});
                    $backBtn.css({"position":"fixed","bottom":10,"left":15});
                }

                bigBox.on("scroll",function(){
                    var bm2=$img.offset().top+ih-wh;
                    if(bStatus){
                        if(bm2>0){
                            $bigZan.css({"position":"fixed","bottom":10,"right":"15px"});
                            $backBtn.css({"position":"fixed","bottom":10,"left":15});
                            bStatus=false;
                        }
                    }
                    else{
                        if(bm2<0){
                            var ch=bigBoxIn.height();
                            $bigZan.css({"position":"absolute","bottom":ch-ih+10,"right":"10px"});
                            $backBtn.css({"position":"absolute","bottom":ch-ih+10,"left":10});
                            bStatus=true;
                        }
                    }
                });
                bm=null;
            });

            $("#back-btn").on("touchend", function (e) {
                e.preventDefault();
                history.back();
                $("#bigBox").off("scroll").scrollTop(0).hide();
            });
			Util.addEvent($("#file")[0],"change",function(){
				$(".pic-form").submit();
                $("#loading").show();
			},true);
			$("#file-iframe").on("load",function(){
				var data = $($(this)[0].contentWindow.document.body).html();
				data = data.split("\n");
				data = JSON.parse(data[0].replace(/\\\"/g,"'"));
				if(data.code=="0"){
					alert("上传失败");
				}
				else{
					self.saveImage(data.img_local_path,1);
				}
                 //location.href="jump.html";
			});

            var wh=$(window).height();
            var $img=$(".pic-box img");
            $(".wrapper").on("scroll",function(){
                var ih=$img.eq(self.index).height();
                var bm=$img.eq(self.index).offset().top+ih-wh;
                if(self.bStatus){
                    if(bm>0){
                        $("form[name='pic-form']").css({"position":"fixed","bottom":0});
                        //zan.css({"position":"fixed","bottom":10,"right":"15px"});
                        self.bStatus=false;
                    }
                }
                else{
                    if(bm<0){
                        var conHeight=$(".content").height();
                        $("form[name='pic-form']").css({"position":"absolute","bottom":conHeight-ih});
                        //zan.css({"position":"absolute","bottom":conHeight-ih+10,"right":"10px"});
                        self.bStatus=true;
                    }
                }
            });
            st=null;
            pb=null;
		},

        resize:function(){
            var self = this;
            var $img = $(".pic-box img");
            var docs=self.result.docs;
            $img.each(function(index){
                $img.eq(index).attr({"src":docs[index%self.count].sci_image});
                $img.eq(index).parent("a").attr("href","#"+docs[index%self.count].id);
            });
            //self.zan[self.index]={"done":0,"num":self.getDetail(docs[self.index].id)};
            self=null;
        },

        initSlide:function(){
            var self = this;
            var $ul=$(".pic-box ul");
            $ul.width(self.liWidth*(self.count+1));
            var $img = $(".pic-box img");
            Util.addEvent($img[self.index],"load",function(){
                self.boxMove();
            },true);
            $img=null;
        },

        slideLeft:function(){
            var self = this;
            self.index = self.index+1;
            if(self.index<self.count){
                $(".pic-box ul").animate({"translateX":-self.index*self.liWidth+"px"},400,"swing");
            }
            else{
                $(".pic-box ul").animate({"translateX":-self.index*self.liWidth+"px"},400,"swing",function(){
                    self.index=0;
                    $(".pic-box ul").css({
                        "transform":"translateX(0px)",
                        "-webkit-transform":"translateX(0px)"
                    });
                });
            }
            self.boxMove();
        },
        slideRight:function(){
            var self = this;
            if(self.index==0){
                self.index=self.count;
                $(".pic-box ul").css({
                    "transform":"translateX("+(-self.liWidth)*(self.index)+"px)",
                    "-webkit-transform":"translateX("+(-self.liWidth)*(self.index)+"px)"
                });
            }
            self.index--;
            $(".pic-box ul").animate({"translateX":-self.index*self.liWidth+"px"},400,"swing");
            self.boxMove();
        },
		saveImage:function(src,o){
			//window.localStorage.clear();
			try{
				//window.localStorage.setItem("image",src);
				window.location.href = "result.php?image="+encodeURIComponent(src);
			}
			catch(error){
				alert("上传失败"+error);
				console.log(error)
			}
		},
        boxMove:function(){
            var self=this;
            var ih=$(".pic-box img").eq(self.index).height();
            var wh=$(window).height();
            var bm=wh-ih-5;//屏幕和图片的高度差
            var pf=$("form[name='pic-form']");

            $(".wrapper").scrollTop(0);
            $(".footer").css({"top":ih+5});
            self.bStatus=false;

            if(bm>0){
                pf.css({"position":"fixed", "bottom":bm});
            }
            else{
                pf.css({"position":"fixed", "bottom":0});
            }
        }
	};
	analyze.init();
});
