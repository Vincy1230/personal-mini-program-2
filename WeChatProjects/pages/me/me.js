// pages/me/me.js
var pageObject = {
    onLoad(query) {
        this.dslb = wx.createInnerAudioContext({
            useWebAudioImplement: false,
        });
        this.dslb.src =
            'cloud://vincy-4g4riisz211838fd.7669-vincy-4g4riisz211838fd-1258627717/Static/岛市老八RAP.mp3';
        this.dslb.loop = true;
    },
    onShow() {
        this.dslb.play();
    },
    onHide() {
        this.dslb.pause();
    },
};

Page(pageObject);
