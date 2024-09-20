// pages/order/order.js

const db = wx.cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

var pageObject = {
    data: {
        category: [],
    },

    onLoad(query) {
        let that = this;

        that.finish_order = wx.createInnerAudioContext({
            useWebAudioImplement: true,
        });
        that.finish_order.src = 'audios/finish_order.mp3';

        let categoryObj = {};
        db.collection('dishes')
            .aggregate()
            .sort({ weight: -1 })
            .group({
                _id: '$category',
                dishes: $.push({
                    name: '$name',
                    pic: '$pic',
                    price: '$price',
                    sound: '$sound',
                    unit: '$unit',
                }),
            })
            .end()
            .then((res) => {
                for (let i in res.list) {
                    let category = res.list[i];
                    for (let j in category.dishes) {
                        category.dishes[j].count = 0;
                        category.dishes[j].audioContext =
                            wx.createInnerAudioContext({
                                useWebAudioImplement: true,
                            });
                    }
                    categoryObj[category._id] = category.dishes;
                }
                return db
                    .collection('category')
                    .orderBy('weight', 'desc')
                    .field({ category: true })
                    .get();
            })
            .then((res) => {
                let category = [];
                for (let i in res.data) {
                    category.push({
                        name: res.data[i].category,
                        dishes: categoryObj[res.data[i].category],
                    });
                }
                return that.setData({
                    category: category,
                });
            })
            .then(() => {
                for (let i in that.data.category) {
                    for (let j in that.data.category[i].dishes) {
                        let dish = that.data.category[i].dishes[j];
                        dish.audioContext.src = dish.sound;
                    }
                }
            })
            .catch((e) => {
                console.error(e);
            });
    },

    submitTap() {
        this.finish_order.play();
    },

    onPicTap(event) {
        let category = this.data.category;
        let index = event.currentTarget.dataset.index;
        let dish = category[index[0]].dishes[index[1]];
        dish.audioContext.play();
    },

    onReduceTap(event) {
        let category = this.data.category;
        let index = event.currentTarget.dataset.index;
        let dish = category[index[0]].dishes[index[1]];
        if (dish.count > 0) {
            dish.count--;
            dish.audioContext.play();
            this.setData({
                category: category,
            });
        }
    },

    onAddTap(event) {
        let category = this.data.category;
        let index = event.currentTarget.dataset.index;
        let dish = category[index[0]].dishes[index[1]];
        dish.count++;
        dish.audioContext.play();
        this.setData({
            category: category,
        });
    },

    onShareAppMessage() {},
};

Page(pageObject);
