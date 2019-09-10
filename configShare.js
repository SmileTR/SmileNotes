import { fetchWechatSdk } from "@api/share.js";

/* global wx */
/* eslint-disable no-console */
function configShare({ title, desc, href, icon }) {
  const locationhref = location.href;
  const currentHref = locationhref.substring(0, locationhref.lastIndexOf("#"));
  const shareHref = href || locationhref;
  const shareTitle = title || "四季拍";
  const shareDesc = desc || "商品内容";
  const shareIcon =
    icon || "https://app.qiyitianbao.com/shop_admin/favicon.ico";
  const params = {
    url: currentHref
  };
  fetchWechatSdk(params)
    .then(res => {
      wx.config({
        debug: false,
        appId: res.appid,
        timestamp: res.timestamp,
        nonceStr: res.nonce_str,
        signature: res.signature,
        jsApiList: [
          "updateAppMessageShareData",
          "updateTimelineShareData",
          "onMenuShareAppMessage",
          "onMenuShareTimeline"
        ]
      });
      wx.ready(function() {
        // 分享给好友
        if (wx.updateAppMessageShareData) {
          wx.updateAppMessageShareData({
            title: shareTitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: shareHref, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareIcon, // 分享图标
            success: function() {
              console.log("分享给好友配置成功");
            }
          });
        } else {
          wx.onMenuShareAppMessage({
            title: shareTitle, // 分享标题
            desc: shareDesc, // 分享描述
            link: shareHref, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareIcon, // 分享图标
            success: function() {
              // 用户点击了分享后执行的回调函数
              console.log("分享给好友配置成功__");
            }
          });
        }
        // 分享到朋友圈
        if (wx.updateTimelineShareData) {
          wx.updateTimelineShareData({
            title: shareTitle, // 分享标题
            link: shareHref, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareIcon, // 分享图标
            success: function() {
              console.log("分享到朋友圈配置成功");
            }
          });
        } else {
          wx.onMenuShareTimeline({
            title: shareTitle, // 分享标题
            link: shareHref, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareIcon, // 分享图标
            success: function() {
              console.log("分享到朋友圈配置成功__");
            }
          });
        }
      });
      wx.error(function(res) {
        console.dir("share config err");
        console.dir(res);
      });
    })
    .catch(err => {
      console.log("err", err);
    });
}

/** 禁止分享 */
function disableShare() {
  let params = {
    url: encodeURIComponent(window.location.href.split("#")[0])
  };
  fetchWechatSdk(params)
    .then(res => {
      wx.config({
        debug: false,
        appId: res.appid,
        timestamp: res.timestamp,
        nonceStr: res.noncestr,
        signature: res.sign,
        jsApiList: ["hideAllNonBaseMenuItem", "hideMenuItems"]
      });
      wx.ready(function() {
        wx.hideAllNonBaseMenuItem({
          success: function(e) {
            console.info(e);
          },
          fail: function(e) {
            console.info(e);
          }
        });
      });
      wx.error(function(err) {
        console.error(err);
      });
    })
    .catch(err => {
      console.error(err);
    });
}
export { configShare, disableShare };
