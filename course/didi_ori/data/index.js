window.addEventListener("DOMContentLoaded", function(ev) {
	/*
    @@判断是PC还是移动端
    @@return [string] phone|pc
    */
	function browserRedirect() {
		var sUserAgent = navigator.userAgent.toLowerCase();
		var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
		var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		var bIsMidp = sUserAgent.match(/midp/i) == "midp";
		var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
		var bIsAndroid = sUserAgent.match(/android/i) == "android";
		var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
		var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
		if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
			return "phone";
		} else {
			return "pc";
		}
	}

	var doc = document,
		base = dd.base || {};
	var pauseMusic = doc.querySelector("#playmusic"),
		one_slide_5 = doc.querySelector(".one-slide-5"),
		swiper_container = doc.querySelector(".swiper-container"),
		div_loading = doc.querySelector("#loading"),
		shareout = doc.querySelector("#shareout"),
		full_mask = doc.querySelector("#full_mask"),
		gen_data = doc.querySelector(".eleven-slide-5 .gen-btn"),
		ten_slide = doc.querySelector("#ten-slide"),
		is_self = doc.querySelector("#is_self").value,
		tapEvent = "touchend";

	if (browserRedirect() === "pc") {
		tapEvent = "click";
	}

	doc.querySelector("audio").pause();

	setTimeout(function() {
		pauseMusic.style.display = "block";
		doc.querySelector("audio").play();
	}, 5000);

	//数字累加，动态
	function fastadd(selector, number, initNumber, step, timeStep) {
		var initNumber = initNumber || 0,
			step = step || 10,
			timeStep = timeStep || 80;
		var handler = setInterval(function() {
			initNumber += step;
			selector.innerText = initNumber;
			if (initNumber >= number) {
				clearInterval(handler);
				selector.innerText = number;
				return;
			}
		}, timeStep);
	}


	function round(n, i) {
		i = i || "";
		var rount = document.getElementById('rount' + i),
			rount2 = document.getElementById('rount2' + i),
			num = document.getElementById('num' + i);

		function add() {
			num.innerHTML = n + "%";
			if (n <= 50) {
				rount.style.webkitTransform = "rotate(" + 3.6 * n + "deg)";
				rount.style.webkitTransition = "all 1s ease-in 0.5s";
				rount2.style.display = "none";
			} else {
				rount.style.webkitTransition = "all 1s ease-in 0.5s";
				rount.style.webkitTransform = "rotate(180deg)";
				setTimeout(function() {
					rount2.style.webkitTransform = "rotate(" + 3.6 * (n - 50) + "deg)";
					rount2.style.webkitTransition = "all 0.5s ease-in 0s";
					rount2.style.display = "block";
				}, 1500);
			}
		};
		add();
	}

	// 分享数据
	var shareData = {
		share_url: doc.querySelector("#share_url").value, // 分享出去后用户点开所指向的链接地址，比如填写http://www.baidu.com 那分享出去别的用户点击进来会显示百度的页面，一定要加http://或https://前缀
		share_icon_url: 'http://static.diditaxi.com.cn/site/pages/threeyears/images/share80x80.jpg', // 分享的出去后所显示的图标的链接   ，如下图所示的2

		share_img_url: 'http://static.diditaxi.com.cn/site/pages/threeyears/images/share80x80.jpg', //分享的大图  （不必理会）    
		share_title: doc.querySelector("#share_title").value, // 分享出去时所显示的标题             如下图所示的1
		share_content: "这是我的打车报告，快来生成你的吧~", // 分享出去时所显示的描述           如下图所示的3   （分享到朋友圈时描述是不会显示的）
		share_from: '滴滴打车' // 分享来源，非必填,默认为滴滴打车
	};

	if (window.didi) {
		didi.initShare(shareData, function() {
			console.log('分享成功');
		});
	}


	//控制背景音乐停止/播放
	pauseMusic.addEventListener(tapEvent, function() {
		if (pauseMusic.className === "stopmusic") {
			pauseMusic.className = "startmusic";
			doc.querySelector("audio").pause();
			pauseMusic.querySelector("img").setAttribute("src", "http://anvs-static.diditaxi.com.cn/site/pages/threeyears/images/stopmusic.png?v=1");
		} else {
			pauseMusic.className = "stopmusic";
			doc.querySelector("audio").play();
			pauseMusic.querySelector("img").setAttribute("src", "http://anvs-static.diditaxi.com.cn/site/pages/threeyears/images/startmusic.png?v=1");
		}
	}, false);

	(function() {
		var docuH = doc.documentElement.clientHeight;
		doc.getElementsByClassName('swiper-container').item(0).style.height = docuH + 'px';

		var mySwiper = new Swiper('.swiper-container', {
			paginationClickable: true,
			direction: 'vertical',
			onSlideChangeStart: function() { //当滑块将要滑到下一块时

			},
			onSlideChangeEnd: function() { //当滑块滑到下一块时
				var thisIndex = mySwiper.activeIndex,
					activeSlide = doc.querySelector(".swiper-slide-active");

				if (activeSlide.id === "one-slide") {
					var num1 = doc.querySelector(".one-slide-5 .day"),
						num2 = doc.querySelector(".one-slide-5 .times");
					fastadd(num1, parseInt(num1.innerText), 0, 80);
					fastadd(num2, parseInt(num2.innerText), 0, 20);
					mySwiper.lockSwipeToPrev();
				} else {
					mySwiper.unlockSwipeToPrev();
				}

				if (activeSlide.id === "two-slide") {
					setTimeout(function() {
						round(document.getElementById('cost').value, '');
						//环形滚动条
					}, 1000);

					var num1 = doc.querySelector(".two-slide-5 .day"),
						num2 = doc.querySelector(".two-slide-5 .times");
					fastadd(num1, parseInt(num1.innerText), 0, 100, 20);
					fastadd(num2, parseInt(num2.innerText), 0, 20, 80);
				}
				if (activeSlide.id === "seven-slide") {
					var nums = doc.querySelectorAll('.seven-slide .day'),
						num1 = nums[0],
						num2 = nums[1],
						num3 = nums[2];

					fastadd(num1, parseInt(num1.innerText), 50, 500, 20);
					fastadd(num2, parseInt(num2.innerText), 10000, 100000, 10);
					fastadd(num3, parseInt(num3.innerText), 50, 200, 30);

				}
				if (activeSlide.id === "ten-slide") {
					var nums = doc.querySelectorAll('.ten-slide .day'),
						num1 = nums[0],
						num2 = nums[1];

					fastadd(num1, parseInt(num1.innerText), 0, 80, 20);
					fastadd(num2, parseInt(num2.innerText), 0, 80, 20);

					var share_my_report = document.getElementById("share_my_report"),
						noBtnContainer = document.getElementById("noBtnContainer");
					if (!share_my_report) {
						noBtnContainer.style.width = "100%";
						noBtnContainer.style.height = "100%";
						noBtnContainer.style.position = "absolute";
						noBtnContainer.style.left = "0";
						noBtnContainer.style.top = "3rem";
						document.querySelector(".ten-slide-7").style.top = "79%";
					}
				}
				if (activeSlide.id === "eleven-slide") {
					//环形滚动条
					round(document.getElementById('cost1').value, "1");
				}
			}
		});

		mySwiper.lockSwipeToNext();
		mySwiper.lockSwipeToPrev();
		setTimeout(function() {
			div_loading.innerHTML = '<img src="http://anvs-static.diditaxi.com.cn/site/pages/threeyears/images/startbtn.png">';
			div_loading.className = "loading loadingTxt";
			div_loading.addEventListener(tapEvent, function() {
				mySwiper.unlockSwipeToNext();
				mySwiper.slideNext();
			}, false);
		}, 5000);

		if (gen_data) {
			base.touch(gen_data, function(ev) {
				ev.preventDefault();
				location.href = "http://pay.xiaojukeji.com/taxireport/data/report";
			});
		}


		var share_my_report = doc.getElementById("share_my_report");
		if (is_self == 1 && ten_slide && share_my_report) {
			share_my_report.addEventListener(tapEvent, function(ev) {
				ev.preventDefault();
				full_mask.style.display = "block";
				full_mask.style.top = "0";
				full_mask.addEventListener(tapEvent, function(ev) {
					ev.preventDefault();
					full_mask.style.display = "none";
				}, false);
			}, false);
		}

		doc.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			var share_config = {
				general_config: {
					img_url: 'http://static.diditaxi.com.cn/site/pages/threeyears/images/share80x80.jpg',
					sharetitle: doc.querySelector("#share_title").value,
					sharedesc: "这是我的打车报告，快来生成你的吧~",
					link: doc.querySelector("#share_url").value
				}
			};

			var obj = share_config.general_config;
			// 分享给朋友
			WeixinJSBridge.on('menu:share:appmessage', function(argv) {

				WeixinJSBridge.invoke('sendAppMessage', {
					"appid": "wx69b6673576ec5a65",
					"img_url": obj.img_url,
					"img_width": "",
					"img_height": "",
					"link": obj.link,
					"title": obj.sharetitle,
					"desc": obj.sharedesc
				}, function(res) {

				});
			});

			// 分享到朋友圈
			WeixinJSBridge.on('menu:share:timeline', function(argv) {


				WeixinJSBridge.invoke('shareTimeline', {
					"img_url": obj.img_url,
					"img_width": "",
					"img_height": "",
					"link": obj.link,
					"title": obj.sharetitle,
					"desc": obj.sharedesc
				}, function(res) {

				});
			});
		});
	})();

	//兼容PC浏览器,PC用iPhone6的尺寸
	if (browserRedirect() === "pc") {
		swiper_container.style.width = "375px";
		swiper_container.style.height = "667px";
	}

}, false);