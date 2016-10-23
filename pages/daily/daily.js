Page({
  data:{
    // text:"这是一个页面"
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    stories: []
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadNews();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  processTopstories(topStories){
    var imgUrls = new Array();
    for(i=0;i<topStories.length;i++){
      imgUrls[i] = topStories[i].image;
    }
      this.setData({imgUrls:topStories});    
  },
  processStory(story){
    var imgUrl = story.images[0];
    story.text = imgUrl;
  },

  processStories(stories){
    for(i=0;i<stories.length;i++){
      var story = stories[i];
      this.processStory(story);
    }
  },
  loadNews:function(){
    var page = this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res){
        var stories = res.data.stories;
        var topStories = res.data.top_stories;
        page.processStories(stories);
        page.processTopstories(topStories);
        page.setData({stories:stories});
      }
    })
  }
})