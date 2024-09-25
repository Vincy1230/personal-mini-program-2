// pages/index/index.js
var pageObject = {
    data: {
        swpList: [
            {
                img: 'cloud://vincy-4g4riisz211838fd.7669-vincy-4g4riisz211838fd-1258627717/Static/banner/laoba1.jpg',
                text: '孤独美食家倾情奉献',
            },
            {
                img: 'cloud://vincy-4g4riisz211838fd.7669-vincy-4g4riisz211838fd-1258627717/Static/banner/laoba2.jpg',
                text: '传统自然生态用餐环境',
            },
            {
                img: 'cloud://vincy-4g4riisz211838fd.7669-vincy-4g4riisz211838fd-1258627717/Static/banner/laoba3.jpg',
                text: '丰富的民俗演艺节目',
            },
            {
                img: 'cloud://vincy-4g4riisz211838fd.7669-vincy-4g4riisz211838fd-1258627717/Static/banner/laoba4.jpg',
                text: '与资深老饕分享交流',
            },
            {
                img: 'cloud://vincy-4g4riisz211838fd.7669-vincy-4g4riisz211838fd-1258627717/Static/banner/laoba5.jpg',
                text: '老八食肆提醒您，记得好好吃饭',
            },
        ],
    },

    onLoad(query) {
        this.start_order = wx.createInnerAudioContext({
            useWebAudioImplement: true,
        });
        this.start_order.src = 'audios/start_order.mp3';
    },

    goOrderTap() {
        wx.switchTab({
            url: '/pages/order/order',
        });
        this.start_order.play();
    },

    onShareAppMessage() {},
};

Page(pageObject);
