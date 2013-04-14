exports.Main = (function() {
    var win = Ti.UI.createWindow({
        backgroundColor: '#262626'
    });
    var view = Ti.UI.createView({
        repeatedBackgroundImage: 'images/bg_carbon.png'
    });
    var clockView = require('app/ui/ClockView').Clock;
    var countView = require('app/ui/CountView').Count;
    var timerView = require('app/ui/TimerView').Timer;
    var parentView = Ti.UI.createScrollableView({
        views: [clockView, countView, timerView],
        showPagingControl: true,
        pagingControlColor: 'transparent',
        pagingControlHeight: 20,
        width: '100%',
        height: '100%',
        currentPage: 1
    });
    view.add(parentView);
    win.add(view);

    return win;
})();
