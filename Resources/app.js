var TA = require('app/model/utility').utility;

TA.init();

TA.UI = require('app/ui/style').style;
TA.MainView = require('app/ui/MainWindow').Main;
TA.SettingView = require('app/ui/SettingWindow').Setting;

TA.boot = setTimeout(function() {
    TA.MainView.open({
        transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
    });
}, 100);
// Change Event Listener to 'Long Press'.
TA.MainView.addEventListener('longpress', function(e) {
    TA.SettingView.open({
        modal: true,
        modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET,
        modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL
    });
});
