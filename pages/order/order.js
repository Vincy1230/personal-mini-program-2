// pages/order/order.js

const db = wx.cloud.database();
const _ = db.command;
const $ = db.command.aggregate;

var pageObject = {
    data: {
        category: [],
        categoryData: [],
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
                        category.dishes[j].price =
                            category.dishes[j].price % 1 === 0
                                ? category.dishes[j].price
                                : category.dishes[j].price.toFixed(2);
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
                    // 为快速渲染，category 临时指向 categoryData
                    // 此时 category 和 categoryData 并非拷贝关系，二者引用同一对象
                    // 当 searchInput 首次调用时二者恢复浅拷贝关系
                    // 而其中的 dishes 作为二级对象，始终保持共同引用关系，内部数据得以共享
                    categoryData: category,
                    category: category,
                });
            })
            .then(() => {
                for (let i in that.data.categoryData) {
                    for (let j in that.data.categoryData[i].dishes) {
                        let dish = that.data.categoryData[i].dishes[j];
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

    searchInput(event) {
        let that = this;
        let keyword = event.detail.value.replace(/\s+/g, '');
        let category = [];
        for (let i in that.data.categoryData) {
            let dishes = [];
            for (let j in that.data.categoryData[i].dishes) {
                let dish = that.data.categoryData[i].dishes[j];
                if (dish.name.indexOf(keyword) !== -1) {
                    dishes.push(dish);
                }
            }
            if (dishes.length > 0) {
                category.push({
                    name: that.data.categoryData[i].name,
                    dishes: dishes,
                });
            }
        }
        that.setData({
            category: category,
        });
        return keyword;
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
