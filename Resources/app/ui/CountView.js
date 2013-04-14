exports.Count = (function() {
    var view = Ti.UI.createView({
        layout: 'vertical'
    });
    var container = Ti.UI.createView(TA.UI.container);
    var number = Ti.UI.createLabel(TA.extend(TA.UI.number, {
        text: '00:00'
    }));
    var label = Ti.UI.createLabel(TA.extend(TA.UI.label, {
        text: 'Stopwatch: Start'
    }));
    container.add(number);
    view.add(container);
    view.add(label);

    var updateCount = function() {
        var currentTime = Math.floor(Date.now() - count_time), stringTime = TA.toString(currentTime);
        number.text = stringTime[0] + ':' + stringTime[1];
    };
    var count_time, intervalCount, flag;
    number.addEventListener('singletap', function(e) {
        if(number.text == '00:00') {
            count_time = Date.now();
            intervalCount = setInterval(updateCount, 1000);
            label.text = 'Stopwatch: Stop';
            flag = false;
        } else if(flag) {
            count_time = Date.now() - TA.toInteger(number.text);
            intervalCount = setInterval(updateCount, 1000);
            label.text = 'Stopwatch: Stop';
            flag = false;
        } else {
            clearInterval(intervalCount);
            label.text = 'Stopwatch: Start';
            flag = true;
        }
    });
    number.addEventListener('doubletap', function(e) {
        clearInterval(intervalCount);
        number.text = '00:00';
        label.text = 'Stopwatch: Start';
        flag = true;
    });
    Ti.Gesture.addEventListener('orientationchange', function(e) {
        TA.applySize(container, number, label);
    });
    TA.addTapEffect(number);

    return view;
})();
