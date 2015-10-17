$(function(){
	FastClick.attach(document.body);
	var result = {
		template:'<div class="tips-box "><div class="tips-arrow"></div><p>{{tags}}</p><span>{{value}}</span></div>',
		imgLoadStatus:false,
		analyzeData:null,
		isAnalyze:false,
		imgSrc:'',

        init:function(){
			var self = this;
			var ww=$(window).width();
			$(".home,.pic-btn").width((ww-76)/2);
            $(".pic-box").height(ww).width(ww);
            $("#loading").css("top",($(window).height()-100)/2);

			self.showImage();
			self.bindEvent();
			self.getAjax();
		},

		bindEvent:function(){
			var self = this;
            var pt=$(".header a");
            pt.on("touchstart",function(){
                $(this).addClass("pic-btn-tap");
            });
            pt.on("touchend touchcancel",function(){
                $(this).removeClass("pic-btn-tap");
            });
			Util.addEvent($("#file")[0],"change",function(){
				$(".pic-form").submit();
                var loading=$("#loading");
                loading.show();
                loading.find("div").text("正在上传");
			},true);

            $("#top").on("click",function(){
                $(".container").scrollTop(0);
            });

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
			});
		},

		showImage:function(){
            var self=this;
			var $img = $("#op-img");
			self.imgSrc=$img.attr("src");
			//console.log(self.imgSrc);
			if(self.imgSrc!=''){
				var img = new Image();
				img.src = self.imgSrc;
				img.onload = function(){
					self.imgLoadStatus=true;
					var $box = $(".img-box");
					$box.append(img);
					var iw = $img.width();
					var ih = $img.height();
					var ow=62,oh=62;
					var ot=iw/ih<1?iw/ow:ih/oh;

					$img.css({"width":iw/ot,"height":ih/ot,"margin-left":(ow-iw/ot)/2,"margin-top":(oh-ih/ot)/2});


					$(".op-img").on("click", function () {
						$("#analyze-box").show();
						if(!self.isAnalyze){
							var bw = $box.width();
							var bh = bw;
							var t = iw/ih>bw/bh?iw/bw:ih/bh;
							$(".img-box img").css({"width":iw/t,"height":ih/t,"margin-left":(bw-iw/t)/2,"margin-top":(bh-ih/t)/2});
							$(".range-box").css({"margin-left":Math.round((bw-iw/t)/2),"margin-top":Math.round((bh-ih/t)/2)});

							self.analyze(self.analyzeData,iw/t,ih/t);
							self.isAnalyze=true;
						}
					});

					$(".analyze-back-btn").on("touchend", function (event) {
						event.preventDefault();
						$("#analyze-box").hide();
					});

				};
			}
			else{
				alert("请先选择图片");
				window.location.href = "default.php";
			}
		},

		//initImage:function(data){
		//	var self = this;
		//	var $box = $(".img-box");
		//	var $img = $(".img-box img");
		//	var bw = $box.width();
		//	var bh = $box.height();
		//	var iw = $img.width();
		//	var ih = $img.height();
		//	var t = iw/ih>bw/bh?iw/bw:ih/bh;
		//	self.analyze(data,iw/t,ih/t);//长高比
		//},

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

		analyze:function(data,w,h){
			var self = this;
			var $range = $(".range-box");
			var rect = data.img_rect;
			var size = data.img_size;
			var rWidth = rect.width/size.width;
			var rHeight = rect.height/size.height;
			var rLeft =rect.x/size.width;
			var rTop = rect.y/size.height;
			var tTop = 0;
			var tLeft = 0;

            //对框的定位
			$range.css({"width":Math.round(rWidth*w)+"px","height":Math.round(rHeight*h)+"px","top":Math.round(rTop*h)+"px","left":Math.round(rLeft*w)+"px"});
			var html = "";
			var count = data.feeling.length<3?data.feeling.length:3;
			for(var i=0;i<count;i++){
				data.feeling[i].value = parseInt(data.feeling[i].value);
				html += Mustache.render(self.template,data.feeling[i]);
			}
			$range.append(html);

            //对显示信息的定位
			var $tips = $(".tips-box");
            var tw=parseInt($tips.eq(0).css("width"));
			//右
			if((rWidth+rLeft)*w+tw+20+parseInt($range.css("marginLeft"),10)<$(".pic-box-inner").width()){
				$tips.each(function(index){
                    var $ele = $(this);
                    $ele.find(".tips-arrow").css({"top":"50%","margin-top":"-6px","left":"-12px","background-image":"url(images/tips-arrow-left.png)"});
                    $ele.css({"top":tTop+"px","left":$ele.parent().width()+12});
                    tTop += $ele.height() + 8;
                });
				var mt=rTop*h+tTop-h;
				if(mt>0){
					$(".pic-box-inner").css("marginBottom",mt);
				}
			}
			//左
            else if(rLeft*w+parseInt($range.css("marginLeft"),10)>(tw+16)){
                $tips.each(function(index){
                    var $ele = $(this);
                    $ele.find(".tips-arrow").css({"top":"50%","margin-top":"-6px","left":tw,"background-image":"url(images/tips-arrow-right.png)"});
                    $ele.css({"top":tTop+"px","left":-tw-12});
                    tTop += $ele.height() + 8;
                });
				var mt=rTop*h+tTop-h;
				if(mt>0){
					$(".pic-box-inner").css("marginBottom",mt);
				}
            }
			//下
			else{
				var tipH=0;
                $tips.each(function(index){
                    var $ele = $(this);
                    $ele.find(".tips-arrow").css({"left":"50%","margin-left":"-6px","top":"-12px","background-image":"url(images/tips-arrow-top.png)"});
                    $ele.css({"left":tLeft+"px","top":$ele.parent().height()+12});
                    tLeft += $ele.width() + 8;
                    tipH=Math.max(tipH,$ele.height());
                });
				var th=(rTop+rHeight)*h+tipH+12+parseInt($range.css("marginTop"),10);
				var kth=parseInt(th-$(".pic-box-inner").height(),10);
				if(kth>0){
					$(".pic-box-inner").css("marginBottom",kth+10);
				}
				//alert("this:"+"("+"rTop"+"+"+rHeight+")"+"*"+h+"+"+tipH+"+"+"12"+"++11+"+$range.css("marginTop"));
			}
			$range.animate({"opacity":"1"});
		},

		getAjax:function(){
			var self = this;
			image = "/var/www/html/"+self.imgSrc;
			var url="n-search.php";
			// var url="json/result.json";
			$.ajax({
				type:'get',
				url:url,
				data:{
					"action":"analyze",
					"image":image
				},
				dataType:"string",
				success:function(data){
					data = data.replace(/\\\"/g,"'");
					data = data.replace(/\\n/g,"");
					if(data.substr(-1)=="\""){
						data = JSON.parse(data.substr(1,data.length-2));
					}
					else{
						data = JSON.parse(data);
					}
					//console.log(data.name);
					if(data.code=="0"){
						alert(data.msg);
						window.location.href = "default.php";
					}
					else if(data.error){
						alert(data.error);
						$(".loading-message").text("图片分析失败");
						return 0;
					}
					else{
						if(typeof data.result != "undefined"){
							data = data.result.replace(/'/g,"\"");
							data = JSON.parse(data);
						}
					}
                    var a=setInterval(function(){
                        if(self.imgLoadStatus){
							self.analyzeData=data.name;
                            //self.initImage(data.name);
                            clearInterval(a);
                        }
                    },100);
                    var words=[data.name.colors[0].color,data.name.clothes[0].cloth,data.name.clothes[0].cloth_class];
                    $("#loading").hide();
                    waterFull.init(5,12,words,".waterBox");
				},
				error:function(xhr,status,statusText){
					var content = "";
					for(var i in xhr){
						content += "xhr["+i+"]:"+xhr[i]+"\r";
					}
					console.log(content+" "+status+" "+statusText)
				}
			});

		}
		//getPar:function(par) {
		//	//获取当前URL
		//	var local_url = document.location.href;
		//	// 获取要取得的get参数位置
		//	var get = local_url.indexOf(par + "=");
		//	if (get == -1) {
		//		return false;
		//	}
		//	//截取字符串
		//	var get_par = local_url.slice(par.length + get + 1);
		//	//判断截取后的字符串是否还有其他get参数
		//	var nextPar = get_par.indexOf("&");
		//	if (nextPar != -1) {
		//		get_par = get_par.slice(0, nextPar);
		//	}
		//	return get_par;
		//}
	};
	result.init();
});