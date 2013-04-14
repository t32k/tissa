exports.style = {
    container: {
        top: TA.adjust_top,
        width: 'auto',
        height: TA.adjust_fontSize
    },
    number: {
        width: 'auto',
        height: 'auto',
        color: '#d9d9d9',
        highlightedColor: '#5a95e5',
        text: '00:00',
        textAlign: 'center',
        font: {
            fontSize: TA.adjust_fontSize,
            fontFamily: 'Leijona'
        }
    },
    label: {
        width: 'auto',
        height: 'auto',
        color: '#555',
        font: {
            fontSize: TA.adjust_fontSize / 8.5,
            fontFamily: 'Myriad Pro'
        }
    },
    slider: {
        top: 10,
        min: 0,
        max: TA.maxValue * 60000,
        value: TA.maxValue * 60000,
        width: TA.adjust_slider,
        height: 'auto',
        leftTrackImage: 'images/slider_left.png',
        rightTrackImage: 'images/slider_right.png',
        thumbImage: 'images/transparent.png'
    },

    // Settings View Component
    header: {
        height: 'auto'
    },
    haderLabel: {
        top: 0,
        left: 20,
        width: 'auto',
        height: 30,
        color: '#fff',
        textAlign: 'left',
        font: {
            fontSize: 16,
            fontWeight: 'bold'
        }
    },
    propLabel: {
        right: 10,
        width: 'auto',
        color: '#385487',
        textAlign: 'right'
    },
    pickerRow: {
        view: {
            layout: 'horizontal',
            width: 'auto',
            height: 'auto'
        },
        num: {
            width: 'auto',
            height: 'auto',
            font: {
                fontSize: 26,
                fontWeight: 'bold'
            },
            color: '#000',
            shadowColor: '#fff',
            shadowOffset: {
                y: 1
            }
        },
        min: {
            left: 5,
            width: '40',
            height: '36',
            font: {
                fontSize: 16
            },
            color: '#fff',
            textAlign: 'left'
        }
    },
    bgLinen: {
        repeatedBackgroundImage: 'images/bg_linen.png'
    },
    table: {
        top: 10,
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        backgroundColor: 'transparent',
        rowBackgroundColor: '#efefef',
        separatorColor: '#bfbfbf',
        separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE
    }
};
