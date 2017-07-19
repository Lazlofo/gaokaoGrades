$(".next-page").click(function(){
	$(this).parent().hide();
	$(this).parent().next().css("top",0);
})

$(".pg3-back").click(function(){
	$(".page3").hide();
	$(".page2").css("top","0");
})

var swiper = new Swiper('.swiper-container', {
					direction: 'vertical',
					slidesPerView: 1,
					paginationClickable: true,
					spaceBetween: 15,
					mousewheelControl: true,
					loop: true
				});

var clicknum = 0,
	picSrc = "",
	sex = 0,
	grayear = 1977,
	tp = 0
	name = "",
	banji = "";
var pc = new PhotoClip('#clipArea', {
		size: [115,150],
		outputSize: [115,150],
		//adaptive: ['60%', '80%'],
		file: '#file',
		view: '#view',
		ok: '#clipBtn',
		//img: 'img/mm.jpg',
		loadStart: function() {
			console.log('开始读取照片');
		},
		loadComplete: function() {
			console.log('照片读取完成');
		},
		done: function(dataURL) {
			clicknum = 0;
			picSrc = dataURL;
			name = $(".name").val();
			banji = $(".banji").val();
			sex = parseInt($(".sex:checked").val(),10);
			grayear = parseInt($(".swiper-slide-active").text(),10);
			var options_3 = {
				type: 1,
				width: 200,
				quality: Number(60),
				timeout: Number(2000),
				preToken: true
			}
			if(grayear < 1977){
				alert("1977年之前没有高考哦！");
				return false;
			}
			if(sex!=1 && sex!=2){
				alert("请选择您的性别！");
				return false;
			}
			if(name=="" || banji==""){
				alert("请正确填写姓名与班级！");
				return false;
			}

			if(grayear >= 1977 && grayear <= 1989) {
				if(sex == 1) {
					tp = 42;
				} else {
					tp = 45;
				}
			} else if(grayear >= 1990 && grayear <= 1999) {
				if(sex == 1) {
					tp = 48;
				} else {
					tp = 51;
				}
			} else if(grayear >= 2000 && grayear <= 2009) {
				if(sex == 1) {
					tp = 54;
				} else {
					tp = 57;
				}
			} else if(grayear >= 2010 && grayear <= 2026) {
				if(sex == 1) {
					tp = 60;
				} else {
					tp = 63;
				}
			} else if(grayear >= 2027) {
				if(sex == 1) {
					tp = 66;
				} else {
					tp = 69;
				}
			} else {
				alert("信息错误");
				return false;
			}

			var upload_3 = new window.MTPlugin.upload(options_3)
			upload_3.up(dataURL, {
				success:function(res) {
					$.ajax({
						type: 'get',
						url: "http://make.channet.com/rolleye/makeup/facefuse?pic=" + res.img + "!thumb600&tips=" + tp,
						success: function(data_img) {
							if(JSON.parse(data_img).rs == 0) {
								alert(JSON.parse(data_img).message);
							} else {
								function convertImgToBase64(url, callback, outputFormat) {
									var canvas = document.createElement('CANVAS'),
										ctx = canvas.getContext('2d'),
										img = new Image;
									img.crossOrigin = 'Anonymous';
									img.onload = function() {
										canvas.height = img.height;
										canvas.width = img.width;
										ctx.drawImage(img, 0, 0);
										var dataURL = canvas.toDataURL(outputFormat || 'image/png');
										callback.call(this, dataURL);
										canvas = null;
									};
									img.src = url;
								}

								convertImgToBase64(JSON.parse(data_img).pic, function(base64Img) {
									$("#pg3_picture").attr("src", base64Img);
									$("#pg4-pic").attr("src", base64Img);
								});

								$(".page2").css("top","-100%");
								$(".page3").show();
							}
						},
						error : function(XMLHttpRequest,textStatus){ //请求完成后最终执行参数
					　　　　if(textStatus=='timeout'){
					　　　　　  alert("请求超时，请重新选择图片");
							}
						}
					})
				},
				error:function(obj) {
					if(clicknum == 0){
						alert("亲~您的网络有点差，请重新上传哦~" + obj.msg); 
					} 
					++clicknum;
				}
			})
			
		},
		fail: function(msg) {
			alert(msg);
		}
	});
	// 加载的图片必须要与本程序同源，否则无法截图
	//pc.load('img/mm.jpg');

//把上传的图片显示在网页上 put3
$("#file").change(function() {
	var objUrl = getObjectURL(this.files[0]);
	if(objUrl) {
		$("#clipArea").show();
	};
});
//读取上传图片的地址
function getObjectURL(file) {
	var url = null;
	if(window.createObjectURL != undefined) { // basic gun_5  put
		url = window.createObjectURL(file);
	} else if(window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if(window.webkitURL != undefined) { // webkit or chrome put5
		url = window.webkitURL.createObjectURL(file);
	};
	return url;
};

$(".sex").click(function(){
	var sex = $(".sex:checked").val();
	$(".nan, .nv").css("backgroundImage","url(./img/sex_uncheck.png)")
	if(parseInt(sex,10)==1){
		$(".nan").css("backgroundImage","url(./img/sex_check.png)")
	}
	if (parseInt(sex,10)==2) {
		$(".nv").css("backgroundImage","url(./img/sex_check.png)")
	}
})

$(".pg3-repick").click(function(){
	
	if(grayear >= 1977 && grayear <= 1989) {
		if(tp == 42) {
			tp = 43;
		} else if(tp == 43) {
			tp = 44;
		} else if(tp == 44) {
			tp = 42;
		} else if(tp == 45) {
			tp = 46;
		} else if(tp == 46) {
			tp = 47;
		} else if(tp == 47) {
			tp = 45;
		}
	} else if(grayear >= 1990 && grayear <= 1999) {
		if(tp == 48) {
			tp = 49;
		} else if(tp == 49) {
			tp = 50;
		} else if(tp == 50) {
			tp = 48;
		} else if(tp == 51) {
			tp = 52;
		} else if(tp == 52) {
			tp = 53;
		} else if(tp == 53) {
			tp = 51;
		}
	} else if(grayear >= 2000 && grayear <= 2009) {
		if(tp == 54) {
			tp = 55;
		} else if(tp == 55) {
			tp = 56;
		} else if(tp == 56) {
			tp = 54;
		} else if(tp == 57) {
			tp = 58;
		} else if(tp == 58) {
			tp = 59;
		} else if(tp == 59) {
			tp = 57;
		}
	} else if(grayear >= 2010 && grayear <= 2026) {
		if(tp == 60) {
			tp = 61;
		} else if(tp == 61) {
			tp = 62;
		} else if(tp == 62) {
			tp = 60;
		} else if(tp == 63) {
			tp = 64;
		} else if(tp == 64) {
			tp = 65;
		} else if(tp == 65) {
			tp = 63;
		}
	} else if(grayear >= 2027) {
		if(tp == 66) {
			tp = 67;
		} else if(tp == 67) {
			tp = 68;
		} else if(tp == 68) {
			tp = 66;
		} else if(tp == 69) {
			tp = 70;
		} else if(tp == 70) {
			tp = 71;
		} else if(tp == 71) {
			tp = 69;
		}
	} else {
		alert("信息错误");
		return false;
	}
	options = {
		type: 1,
		width: 200,
		quality: Number(60),
		timeout: Number(20000),
		preToken: true
	}
	var upload_2 = new window.MTPlugin.upload(options)
		upload_2.up(picSrc, {
			success:function(res) {
				$.ajax({
					type: 'get',
					url: "http://make.channet.com/rolleye/makeup/facefuse?pic=" + res.img + "!thumb600&tips=" + tp,
					success: function(data_img_1) {
						if(JSON.parse(data_img_1).rs == 0) {
							alert(JSON.parse(data_img_1).message);
						} else {
							function convertImgToBase64(url, callback, outputFormat) {
								var canvas = document.createElement('CANVAS'),
									ctx = canvas.getContext('2d'),
									img = new Image;
								img.crossOrigin = 'Anonymous';
								img.onload = function() {
									canvas.height = img.height;
									canvas.width = img.width;
									ctx.drawImage(img, 0, 0);
									var dataURL = canvas.toDataURL(outputFormat || 'image/png');
									callback.call(this, dataURL);
									canvas = null;
								};
								img.src = url;
							}

							convertImgToBase64(JSON.parse(data_img_1).pic, function(base64Img) {
								$("#pg3_picture").attr("src", base64Img);
								$("#pg4-pic").attr("src", base64Img);
							});

						}
					},
					error : function(XMLHttpRequest,textStatus){ //请求完成后最终执行参数
				　　　　if(textStatus=='timeout'){
				　　　　　  alert("请求超时，请重新选择图片");
						}
					}
				})
			},
			error:function(obj) {
				if(clicknum == 0){
					alert("亲~您的网络有点差，请重新上传哦~" + obj.msg); 
				} 
				++clicknum;
			}
		})
		
})

function fenshu(){
	var a = 0;
	while (a < 1) {
		a = parseInt(Math.random().toString().substr(3,1),10);    
	}
	return a;
}

function score(){
	var myscore = "",
		b = fenshu(),
		c = fenshu();
	if(b==1){
		myscore = "100";
	}else{
		myscore = myscore+b+c;
	}
	return myscore;
}

$(".pg3-sure").click(function(){
	$(".page3").hide();
	$(".page4").show();
	// console.log(name)
	$(".pg4-name").html(name);
	$(".pg4-banji").html(banji);
	if(sex == 1){
		$(".pg4-xingb").html("男");
	}else{
		$(".pg4-xingb").html("女");
	}
	var bianhao = Math.random().toString().substr(3,7);
	$(".pg4-bianhao").html(bianhao);
	var chinese = score(),
		shuxue = score(),
		english = score();
	$(".pg4-chinese").html(chinese);
	$(".pg4-shuxue").html(shuxue);
	$(".pg4-english").html(english);
	setTimeout(print(),1000)
})

function print() {
	$("#final").show();
	$(".final-text").show();
	html2canvas($(".page4"), {
		onrendered: function(canvas) {
			// canvas.width *=2;
			// canvas.height *=2; 
			$("#final").attr("src", canvas.toDataURL());
		},
		width: window.innerWidth*2,
		height: window.innerHeight*2
	})
}
caiguo.share({
	icon: "http://res2.caiguo.com/event/gaokaoGrades/img/weixin_icon.jpg",
	link: "http://res2.caiguo.com/event/gaokaoGrades",
	title: "新鲜出炉的高考成绩单！"
})