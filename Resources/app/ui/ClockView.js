exports.Clock = (function() {
    var view = Ti.UI.createView({
        layout: 'vertical'
    });
    var container = Ti.UI.createView(TA.UI.container);
    var number = Ti.UI.createLabel(TA.extend(TA.UI.number, {
        text: '00:00'
    }));
    var label = Ti.UI.createLabel(TA.extend(TA.UI.label, {
        text: 'Clock: AM'
    }));
    container.add(number);
    view.add(container);
    view.add(label);

    var updateClock = function() {
        var time = new Date();
        var hrs = time.getHours();
        var min = time.getMinutes();
        var timeOfDay = (hrs < 12) ? 'Clock: A.M.' : 'Clock: P.M.';
        min = (min < 10 ? '0' : '') + min;
        if(TA.clockMode === '12-hour') {
            hrs = (hrs > 12) ? hrs - 12 : hrs;
            hrs = (hrs == 0) ? 12 : hrs;
            label.text = timeOfDay;
        } else {
            label.text = 'Clock: 24-hour';
        }
        hrs = (hrs == 0) ? '0' : hrs;
        hrs = (hrs < 10) ? '0' + hrs : hrs;
        number.text = hrs + ':' + min;
    };

    number.addEventListener('singletap', function(e) {
        if(TA.clockMode === '12-hour') {
            TA.clockMode = '24-hour';
            Ti.App.Properties.setString('ClockMode', TA.clockMode);
        } else {
            TA.clockMode = '12-hour';
            Ti.App.Properties.setString('ClockMode', TA.clockMode);
        }
        updateClock();
    });
    Ti.Gesture.addEventListener('orientationchange', function(e) {
        TA.applySize(container, number, label);
    });
    TA.addTapEffect(number);

    setInterval(updateClock, 1000);

    return view;
})();
