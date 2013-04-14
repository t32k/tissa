exports.Setting = (function() {
    TA.data = {
        main: [],
        disp: []
    };
    var win = Ti.UI.createWindow({
        title: 'Settings',
        barColor: '#444',
        repeatedBackgroundImage: 'images/bg_linen.png'
    });
    var view = Ti.UI.createView();
    var nav = Ti.UI.iPhone.createNavigationGroup({
        window: win
    });
    var button = Ti.UI.createButton({
        title: 'Done'
    });
    nav.add(view);
    win.setRightNavButton(button);

    // Clock Mode ------------------------------------------------------------
    var clockHeader = Ti.UI.createView(TA.UI.header);
    var clockHeaderLabel = Ti.UI.createLabel(TA.extend(TA.UI.haderLabel, {
        text: 'Clock Mode'
    }));
    clockHeader.add(clockHeaderLabel);
    var clockRow = Ti.UI.createTableViewRow({
        title: 'Display',
        hasChild: true,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.GRAY
    });
    var clockLabel = Ti.UI.createLabel(TA.extend(TA.UI.propLabel, {
        text: TA.clockMode
    }));
    clockRow.add(clockLabel);
    var clockSection = Ti.UI.createTableViewSection({
        headerView: clockHeader
    });
    clockSection.add(clockRow);
    TA.data.main[0] = clockSection;

    // Reprezentation View
    var dispWin = Ti.UI.createWindow({
        title: 'Display',
        barColor: '#222'
    });
    TA.data.disp[0] = Ti.UI.createTableViewRow({
        title: '12-hour',
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.GRAY
    });
    TA.data.disp[1] = Ti.UI.createTableViewRow({
        title: '24-hour',
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.GRAY
    });
    TA.data.disp.forEach(function(elem, index, array) {
        if(TA.clockMode === array[index].title) {
            array[index].hasCheck = true;
        }
    });
    var dispTable = Ti.UI.createTableView(TA.extend(TA.UI.table, {
        data: TA.data.disp
    }));
    var dispView = Ti.UI.createView(TA.UI.bgLinen);
    dispView.add(dispTable);
    dispWin.add(dispView);
    dispTable.addEventListener('click', function(e) {
        TA.data.disp.forEach(function(elem, index, array) {
            array[index].hasCheck = false;
        });
        e.row.hasCheck = true;
        TA.clockMode = e.rowData.title;
        Ti.App.Properties.setString('ClockMode', 'TA.clockMode');
    });
    // Timer Mode ------------------------------------------------------------
    var timerHeader = Ti.UI.createView(TA.UI.header);
    var timerHeaderLabel = Ti.UI.createLabel(TA.extend(TA.UI.haderLabel, {
        text: 'Timer Mode'
    }));
    timerHeader.add(timerHeaderLabel);

    var timerSection = Ti.UI.createTableViewSection({
        headerView: timerHeader
    });

    var timerRow = Ti.UI.createTableViewRow({
        title: 'Maximum Value',
        hasChild: true,
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.GRAY
    });
    var timerLabel = Ti.UI.createLabel(TA.extend(TA.UI.propLabel, {
        text: TA.toMins(TA.maxValue),
        width: '65'
    }));
    timerRow.add(timerLabel);
    timerSection.add(timerRow);

    var soundRow = Ti.UI.createTableViewRow({
        title: 'Sound',
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
    });
    var soundSwitch = Ti.UI.createSwitch({
        right: 10,
        value: TA.sound
    });
    soundRow.add(soundSwitch);
    timerSection.add(soundRow);
    soundSwitch.addEventListener('change', function(e) {
        TA.sound = e.value;
        Ti.App.Properties.setInt('Sound', TA.sound);
        Ti.API.info(Ti.App.Properties.getInt('Sound'));
    });
    TA.data.main[1] = timerSection;

    // Maximum Value View
    var maxWin = Ti.UI.createWindow({
        title: 'Maximum Value',
        barColor: '#222'
    });
    var maxView = Ti.UI.createView(TA.UI.bgLinen);
    var picker = Ti.UI.createPicker({
        selectionIndicator: true
    });
    TA.addRow = function(index) {
        index = (index < 10) ? '0' + index : index;
        var txt = (index !== '01') ? ' mins' : ' min', row = Ti.UI.createPickerRow(), view = Ti.UI.createView(TA.UI.pickerRow.view), num = Ti.UI.createLabel(TA.extend(TA.UI.pickerRow.num, {
            text: index
        })), min = Ti.UI.createLabel(TA.extend(TA.UI.pickerRow.min, {
            text: txt
        }));
        view.add(num);
        view.add(min);
        row.add(view);
        picker.add(row);
    };
    for(var i = 1 ; i <= 99 ; i++) {
        TA.addRow(i);
    }
    maxView.add(picker);
    maxWin.add(maxView);
    picker.addEventListener('change', function(e) {
        TA.maxValue = e.rowIndex + 1;
        Ti.App.Properties.setInt('MaxValue', TA.maxValue);
    });
    maxWin.addEventListener('open', function(e) {
        var index = TA.maxValue - 1;
        picker.setSelectedRow(0, index, true);
    });
    // About ------------------------------------------------------------
    var infoHeader = Ti.UI.createView(TA.UI.header);
    var infoHeaderLabel = Ti.UI.createLabel(TA.extend(TA.UI.haderLabel, {
        text: 'About'
    }));
    infoHeader.add(infoHeaderLabel);

    // Footer View ------------------------------------------------------------
    var footer = Ti.UI.createView({
        height: 'auto'
    });
    var footerLabel = Ti.UI.createLabel({
        height: 48,
        text: 'tissa v' + Ti.App.version + ' © 2011 i&M',
        textAlign: 'center',
        font: {
            fontSize: 12,
        },
        color: '#aaa'
    });
    footer.add(footerLabel);

    var infoSection = Ti.UI.createTableViewSection({
        headerView: infoHeader,
        footerView: footer
    });

    var infoRow2 = Ti.UI.createTableViewRow({
        title: 'Usage',
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.GRAY,
        hasChild: true
    });
    infoSection.add(infoRow2);

    var infoRow3 = Ti.UI.createTableViewRow({
        indentionLevel: 1,
        leftImage: 'images/logo_twitter.png',
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.GRAY
    });
    var infoRow3Label = Ti.UI.createLabel({
        text: 'Follow on Twitter',
        font: {
            fontWeight: 'bold'
        },
        highlightedColor: '#fff',
        textAlign: 'center'
    });
    infoRow3.add(infoRow3Label);
    infoSection.add(infoRow3);

    var infoRow4 = Ti.UI.createTableViewRow({
        indentionLevel: 1,
        leftImage: 'images/logo_facebook.png',
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.GRAY
    });
    var infoRow4Label = Ti.UI.createLabel({
        text: 'Become A Fan on Facebook',
        font: {
            fontWeight: 'bold'
        },
        highlightedColor: '#fff',
        textAlign: 'center'
    });
    infoRow4.add(infoRow4Label);
    infoSection.add(infoRow4);

    // Usage Web View
    var usageWin = Ti.UI.createWindow({
        title: 'Usage',
        barColor: '#222'
    });
    var usageView = Ti.UI.createWebView({
        url: 'http://tissa.t32k.me/#usage',
        backgroundColor: '#222'
    });
    usageWin.add(usageView);
    usageWin.addEventListener('open', function(e) {
        var usageView = Ti.UI.createWebView({
            url: 'http://tissa.t32k.me/#usage',
            backgroundColor: '#222'
        });
        usageWin.add(usageView);
    });
    TA.data.main[2] = infoSection;

    // Initialization
    var tableView = Ti.UI.createTableView(TA.extend(TA.UI.table, {
        data: TA.data.main
    }));
    view.add(tableView);
    win.add(view);
    win.addEventListener('open', function(e) {
        //clockLabel.text = TA.clockMode;
        //timerLabel.text = TA.toMins(TA.maxValue);
    });
    button.addEventListener('click', function(e) {
        win.close();
    });
    tableView.addEventListener('click', function(e) {
        switch (e.index) {
            case 0:
                nav.open(dispWin, {
                    animated: true
                });
                break;
            case 1:
                nav.open(maxWin, {
                    animated: true
                });
                break;
            case 4:
                nav.open(usageWin, {
                    animated: true
                });
                break;
            case 5:
                Ti.Platform.openURL('http://twitter.com/tissa_app');
                break;
            case 6:
                Ti.Platform.openURL('http://www.facebook.com/ticktockapp');
                break;
        }
    });
    return win;
})();
