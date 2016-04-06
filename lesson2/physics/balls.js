/**
 * Created by zjy on 2016/4/6.
 */
function Ball(obj){
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.g = 0;
    this.timer = null;
    this.div = null;

    this.init(obj)
}

Ball.prototype = {
    constructor: Ball,
    init: function (obj) {
        this.x = obj.x;
        this.y = obj.y;
        this.vx = obj.vx;
        this.vy = obj.vy;
        this.g = 10;

        this.build();
    },

    build: function(){
        var div= document.createElement('div');
        div.setAttribute('class','ball');

        this.div = div;

        this.div.style['top'] = this.y + 'px';
        this.div.style['left'] = this.x + 'px';

        document.body.appendChild(div);

        this.move();
    },


    move: function(){
        var self = this;
        self.timer = setInterval(function () {

            self.check();

            //dom改写
            self.div.style['left'] = self.x + 'px';
            self.div.style['top'] = self.y + 'px';

            //数据更新
            self.x += self.vx;
            self.y += self.vy;
            self.vy += self.g;

        }, 30);
    },

    check: function(){
        if(this.y - 20 > document.body.clientHeight){
            //clearInterval(this.timer);
            //document.body.removeChild(this.div)


            this.vy = -this.vy * 0.5;
            this.y = document.body.clientHeight - 20;
        }
        if(this.x - 20 > document.body.clientWidth){
            clearInterval(this.timer);
            document.body.removeChild(this.div)
        }
    }



};