/* ログ管理
-------------------------------------------------------------------------------*/
function Logger (_appName) {
    this.init(_appName);
}

Logger.prototype = {

    /* 初期化2222
    -------------------------------------------------------------------------------*/
    init: function (_appName) {
        this.appName = _appName;
    },

    /* ログ
    -------------------------------------------------------------------------------*/
    logs: [],
    rotateLimit: 100,

    /* stop
    -------------------------------------------------------------------------------*/
    stop: function () {
        this.stop = true;
    },

    /* ローテートリミットのセット
    -------------------------------------------------------------------------------*/
    setRotate: function (_limit) {
        this.rotateLimit = _limit;
    },

    /* ロギング
    -------------------------------------------------------------------------------*/
    add: function () {

        if (this.stop) {
            return false;
        }

        /* リミットを超えていた場合超えている分を削除
        -------------------------------------------------------------------------------*/
        if (this.logs.length > this.rotateLimit) {
            var len = this.logs.length - this.rotateLimit;
            for (var i = 0; i <= len; i++) {
                this.logs.shift();
            };
        }

        for (var i = 0; i < arguments.length; i++) {
            this.logs.push(arguments);
        }
        this.print(arguments);
    },

    /* 全てクリア
    -------------------------------------------------------------------------------*/
    clear: function () {
        this.logs = [];
    },

    /* ログ出力
    -------------------------------------------------------------------------------*/
    show: function () {
        for (var i = 0; i < this.logs.length; i++) {
            this.print.call(this, this.logs[i]);
        };
    },

    /* 一行ログ出力
    -------------------------------------------------------------------------------*/
    print: function (_args) {
        var logText = [];
        var date = new Date();
        var dateText = date.getHours()+":"+date.getMinutes()+"."+date.getMilliseconds();
        for (var i = 0; i < _args.length; i++) {
            logText.push(_args[i]);
        };
        console.log("[%c"+this.appName+"%c]"+logText.join(", ")+" %c("+dateText+")", "color:blue;", "color:black;", "color:#bbbbbb;");
    }

};