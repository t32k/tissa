exports.utility = {
    init: function() {
        // check adjust size
        var width = Ti.Platform.displayCaps.platformWidth;
        var height = Ti.Platform.displayCaps.platformHeight;
        TA.adjust_fontSize = width * .25;
        TA.adjust_top = height * .45 - TA.adjust_fontSize / 2;
        TA.adjust_slider = width * .65;
        // check user settings value
        TA.clockMode = Ti.App.Properties.getString('ClockMode') || '12-hour';
        TA.maxValue = Ti.App.Properties.getInt('MaxValue') || 10;
        TA.sound = Ti.App.Properties.getInt('Sound') || 0;
    },
    extend: function(destination, source) {
        for(var property in source) {
            destination[property] = source[property];
        }
        return destination;
    },
    addTapEffect: function(elem) {
        elem.addEventListener('touchstart', function() {
            elem.color = '#5a95e5';
        });
        elem.addEventListener('touchend', function() {
            elem.color = '#d9d9d9'
        });
    },
    toInteger: function(str) {
        var chunk = str.split(':');
        return (Number(chunk[0]) * 60 + Number(chunk[1])) * 1000;
    },
    toString: function(value) {
        var min, sec, time;
        min = Math.floor(value / 60000);
        min = (min < 10 ? '0' : '') + min;
        if(min !== '00') {
            sec = Math.floor((value % (min * 60000)) / 1000);
        } else {
            sec = Math.floor((value % 60000) / 1000);
        }
        sec = (sec < 10 ? '0' : '') + sec;
        time = [min, sec];
        return time;
    },
    toMins: function(value) {
        if(value !== 1) {
            if(value < 10) {
                return '0' + value + ' mins'
            } else {
                return value + ' mins'
            }
        } else {
            return '0' + value + ' min'
        }
    },
    applySize: function(con, num, lbl, sldr) {
        TA.init();
        con.top = TA.adjust_top;
        con.height = TA.adjust_fontSize;
        num.font = {
            fontSize: TA.adjust_fontSize,
            fontFamily: 'Leijona'
        };
        lbl.font = {
            fontSize: TA.adjust_fontSize / 8.5,
            fontFamily: 'Myriad Pro'
        };
        if(sldr) {
            sldr.width = TA.adjust_slider;
        }
    }
};
