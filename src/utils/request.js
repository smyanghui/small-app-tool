import wepy from 'wepy';

function request(params = {}) {
  const { url, method = 'get', data, success, fail, complete } = params;
  wx.showLoading({ title: '数据加载中...' });
  wepy.request({
    url: `https://devapi.nfangbian.com${url}`,
    method,
    data,
    success(res) {
      if (res.code > 0) {
        wx.showModal({
          showCancel: false,
          content: res.msg,
        });
        return;
      }
      success && success(res.data);
    },
    fail(res) {
      wx.showModal({
        showCancel: false,
        content: '网络异常，请稍后再试',
      });
      fail && fail();
    },
    complete() {
      wx.hideLoading();
      complete && complete();
    },
  });

}

export default request;
