exports.Timer = (function() {
    var view = Ti.UI.createView({
        layout: 'vertical'
    });
    var container = Ti.UI.createView(TA.UI.container);
    var number = Ti.UI.createLabel(TA.extend(TA.UI.number, {
        text: '00:00'
    }));
    var label = Ti.UI.createLabel(TA.extend(TA.UI.label, {
        text: 'Timer: Start'
    }));
    var slider = Ti.UI.createSlider(TA.UI.slider);
    container.add(number);
    view.add(container);
    view.add(label);
    view.add(slider);

    var timerTime, intervalTimer, flag, setValue, setLabel, changeFlag, clickTime = 0;

    var setMaxValue = function(value) {
        clearInterval(intervalTimer);
        label.text = 'Timer: Start';
        flag = false;
        setValue = value;
        var val = value * 60000;
        var str = TA.toString(val);
        slider.value = slider.max = val;
        number.text = setLabel = str[0] + ':' + str[1];
    }
    setMaxValue(TA.maxValue);

    var changeTimer = function(e) {
        clearInterval(intervalTimer);
        var stringTime = TA.toString(e.value);
        var min = Number(stringTime[1]);
        if(0 === min || min < 15) {
            min = '00';
        } else if(15 < min && min < 30) {
            min = '15';
        } else if(30 < min && min < 45) {
            min = '30';
        } else if(45 < min && min < 60) {
            min = '45';
        }
        setLabel = number.text = stringTime[0] + ':' + min;
        flag = false;
    };
    var updateTimer = function() {
        var diffTime = Math.floor((Date.now() - clickTime) / 1000) * 1000;
        var currentTime = timerTime - diffTime;
        var stringTime = TA.toString(currentTime);

        if(currentTime > 0 || currentTime === 0) {
            number.text = stringTime[0] + ':' + stringTime[1];
            slider.value = currentTime - 1000;
        } else {
            number.text = '00:00';
            slider.value = 0;
            clearInterval(intervalTimer);
            label.text = 'Timer: Start';
            flag = false;
        }
    };
    slider.addEventListener('touchstart', function(e) {
        changeFlag = true;
    });
    slider.addEventListener('touchend', function(e) {
        changeFlag = false;
    });
    slider.addEventListener('change', function(e) {
        if(changeFlag) {
            changeTimer(e);
            label.text = 'Timer: Start';
        }
    });
    number.addEventListener('singletap', function(e) {
        timerTime = TA.toInteger(number.text);
        if(timerTime !== 0) {
            if(!flag) {
                clickTime = Date.now();
                intervalTimer = setInterval(updateTimer, 1000);
                label.text = 'Timer: Stop';
                flag = true;
            } else {
                clearInterval(intervalTimer);
                label.text = 'Timer: Start';
                flag = false;
            }
        } else {
            number.text = setLabel;
            slider.value = TA.toInteger(setLabel);
        }
    });
    number.addEventListener('doubletap', function(e) {
        clearInterval(intervalTimer);
        number.text = setLabel;
        label.text = 'Timer: Start';
        slider.value = TA.toInteger(setLabel);
        flag = false;
    });
    Ti.Gesture.addEventListener('orientationchange', function(e) {
        TA.applySize(container, number, label, slider);
    });
    TA.addTapEffect(number);

    return view;

    /*
     TA.SetView.addEventListener('close', function(e) {
     if(setValue !== TA.maxValue) {
     setMaxValue(TA.maxValue);
     }
     });
     */
})();
