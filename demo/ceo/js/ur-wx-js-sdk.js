    /**
     * 微信JS SDK
     */
    var weChatSDKInit = function(){

        var currUrl = window.location.href.replace(window.location.hash, '');
        $.getJSON('http://ur.qq.com/s315/signature.php?url=' + encodeURIComponent(currUrl)).done(function(data) {
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    //'onMenuShareTimeline',
                    //'onMenuShareAppMessage',
                    'hideAllNonBaseMenuItem'
                ]
            });
        });

        wx.ready(function(){

/*              //分享到朋友圈
             wx.onMenuShareTimeline({
                 title: '互联网CEO分享会', // 分享标题
                 link: '', // 分享链接
                 imgUrl: 'http://ur.qq.com/activities/2015/04/ceo_h5/images/share.jpg', // 分享图标
                 success: function () {
                      //用户确认分享后执行的回调函数
                 },
                 cancel: function () {
                     // 用户取消分享后执行的回调函数
                 }
             });

              //分享给好友
             wx.onMenuShareAppMessage({
                 title: '互联网CEO分享', // 分享标题
                 desc: '互联网CEO分享会', // 分享描述
                 link: '', // 分享链接
                 imgUrl: 'http://ur.qq.com/activities/2015/04/ceo_h5/images/share.jpg', // 分享图标
                 type: 'link', // 分享类型,music、video或link，不填默认为link
                 dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                 success: function () {
                     // 用户确认分享后执行的回调函数
                 },
                 cancel: function () {
                     // 用户取消分享后执行的回调函数
                 }
             });*/
            
            wx.hideAllNonBaseMenuItem({
              success: function () {
                // alert('已隐藏所有非基本菜单项');
              }
            });

        });

    };
