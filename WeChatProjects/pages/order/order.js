// pages/order/order.js

var pageObject = {
    data: {
        category: [
            {
                name: '老八佳肴',
                goods: [
                    {
                        name: '扒鸭屁股',
                        pic: 'cloud://vincy-4g4riisz211838fd.7669-vincy-4g4riisz211838fd-1258627717/weda-uploader/89131977f9da917e1d0d8df20818bc2a-扒鸭屁股.jpg',
                        price: 1.14,
                        sound: 'cloud://vincy-4g4riisz211838fd.7669-vincy-4g4riisz211838fd-1258627717/weda-uploader/37ef7ef5f367af3ac715be0186075dd9-扒鸭屁股.mp3',
                        unit: '个',
                        count: 8,
                    },
                    {
                        name: '俘虏',
                        pic: 'cloud://vincy-4g4riisz211838fd.7669-vincy-4g4riisz211838fd-1258627717/weda-uploader/75a25393cb9fdc41eb5f57be142928dc-俘虏.jpg',
                        price: 5.14,
                        sound: 'cloud://vincy-4g4riisz211838fd.7669-vincy-4g4riisz211838fd-1258627717/weda-uploader/ea87d91909ea7536ac3dcdf9c8140913-俘虏.mp3',
                        unit: '罐',
                        count: 8,
                    },
                ],
            },
            {
                name: '老八珍藏',
                goods: [
                    {
                        name: '撤硕',
                        pic: 'cloud://vincy-4g4riisz211838fd.7669-vincy-4g4riisz211838fd-1258627717/weda-uploader/cf5a2e5fbf543c910d6a6a38ba706089-撤硕.jpg',
                        price: 99999.99,
                        sound: 'cloud://vincy-4g4riisz211838fd.7669-vincy-4g4riisz211838fd-1258627717/weda-uploader/d6bc18ab4e7d22b0393927fa38462b20-撤硕.mp3',
                        unit: '坑',
                        count: 8,
                    },
                ],
            },
        ],
    },

    onLoad(query) {
        this.finish_order = wx.createInnerAudioContext({
            useWebAudioImplement: true,
        });
        this.finish_order.src = 'audios/finish_order.mp3';
    },

    submitTap() {
        this.finish_order.play();
    },

    onShareAppMessage() {},
};

Page(pageObject);
