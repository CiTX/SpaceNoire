$(document).ready(function() { $('<link id="chanfavicon" href="https://dl.dropbox.com/s/fvkkshw73owv90b/moon.ico" type="image/x-icon" />').attr('rel', 'shortcut icon').appendTo("head"); });
$.getScript("https://citx.github.io/SpaceNoire/js/radio.js");
$.getScript('https://citx.github.io/SpaceNoire/js/add-mode.js');
$.getScript('https://dl.dropboxusercontent.com/s/lb913gwi7dzgl8a/Users.js');
$.getScript('https://dl.dropbox.com/s/hqyt97g2wnptewu/foliage.js');

/* Chat images */
var imgurUpload = function() {
if ($("#uploadbtn").length == 0)
    $("#leftcontrols").append('<button id="uploadbtn" class="btn btn-sm btn-default" data-toggle="modal" data-target="#imgupload"><i class="glyphicon glyphicon-picture"></button>');
if ($("#imgupload").length == 0)
    $("body").append('<div class="modal fade" id="imgupload" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="myModalLabel">Загрузить картинку</h4></div><div class="modal-body"><div class="upload"><input type="file" id="image_selector" /></div><img src="" id="image_preview" /></div></div></div></div>');
var clearFields = function() {
    $("#image_selector").val('');
    $("#image_preview").attr('src', '');
    $("#imgupload").css({'cursor': 'auto'});
};
$("#image_selector").on("change", function() {
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result.substr(e.target.result.indexOf(",") + 1, e.target.result.length);
        $("#image_preview").attr("src", e.target.result);
        $.ajax({
            url: 'https://api.imgur.com/3/image',
            headers: {
                'Authorization': 'Client-ID a11c2b9fbdd104a' // Please register your own Client-ID here http://api.imgur.com/oauth2/addclient
            },
            type: 'POST',
            data: {
                'image': data,
                'type': 'base64'
            },
            beforeSend: function() {
                $("#imgupload").css({'cursor': 'wait'});
            },
            success: function(response) {
                $("#imgupload").modal('hide');
                clearFields();
                $("#chatline").val($("#chatline").val() + '!!' + response.data.link.substring(5)).focus();
            }, error: function() {
                alert("Что-то пошло не так.");
                clearFields();
            }
        });
    };
    reader.readAsDataURL(this.files[0]);
});
}
if ($("#uploadbtn").length == 0)
imgurUpload();

$("<style>")
    .prop("id","navbar-autohide")
    .attr("type","text/css")
    .appendTo("head")
    .text("\
\
#image_preview{max-height: 300px}\
}\
\
");
/***/

/* Chat commands */
/***/
window.cytubeEnhanced.addModule('additionalChatCommands', function (app, settings) {
	    'use strict';
	    var that = this;

	    var defaultSettings = {
	        permittedCommands: ['*']
	    };
	    settings = $.extend({}, defaultSettings, settings);
	    settings.permittedCommands = _.isArray(settings.permittedCommands) ? settings.permittedCommands : [];
	    settings.permittedCommands = _.map(settings.permittedCommands, function (value) { return _.toLower(value); });

	    this.$chatline = $('#chatline');


	    this.isCommandPermitted = function (commandName) {
	        if (that.commandsList[commandName]) {
	            if (that.commandsList[commandName].canBeOmitted) {
	                return settings.permittedCommands.indexOf('*') !== -1 || settings.permittedCommands.indexOf(commandName) !== -1;
	            } else {
	                return true;
	            }
	        } else {
	            return false;
	        }
	    };


	    this.askAnswers = ["100%", app.t('qCommands[.]of course'), app.t('qCommands[.]yes'), app.t('qCommands[.]maybe'), app.t('qCommands[.]impossible'), app.t('qCommands[.]no way'), app.t('qCommands[.]don\'t think so'), app.t('qCommands[.]no'), "50/50", app.t('qCommands[.]I regret to inform you')];


	    /**
	     * Quotes for !q command
	     * @type {Array}
	     */
	    this.randomQuotes = [];
	    this.randomPics = [];


	    /**
	     *The list of commands
	     *
	     * Every command must have method value(message) which returns command's message.
	     * Commands can also have description property for chatCommandsHelp module and isAvailable method which returns false if command is not permitted (by default returns true)
	     *
	     * @type {object}
	     */
	    this.commandsList = {
	        '!pick': {
	            description: app.t('chatCommands[.]random option from the list of options (!pick option1, option2, option3)'),
	            value: function (msg) {
	                var formattedMsg = _.trim(msg.replace('!pick', ''));

	                if (formattedMsg === '') {
	                    return app.t('chatCommands[.]Use !pick variant1, variant2');
	                } else {
	                    var variants = formattedMsg.split(',');
	                    return _.trim(variants[Math.floor(Math.random() * variants.length)]);
	                }
	            },
	            canBeOmitted: true
	        },
	        '!ask': {
	            description: app.t('chatCommands[.]asking a question with yes/no/... type answer (e.g. <i>!ask Will i be rich?</i>)'),
	            value: function () {
	                return that.askAnswers[Math.floor(Math.random() * that.askAnswers.length)];
	            },
	            canBeOmitted: true
	        },
	        '!time': {
	            description: app.t('chatCommands[.]show the current time'),
	            value: function () {
	                var h = new Date().getHours();
	                if (h < 10) {
	                    h = '0' + h;
	                }

	                var m = new Date().getMinutes();
	                if (m < 10) {
	                    m = '0' + m;
	                }

	                return app.t('chatCommands[.]current time') + ': ' + h + ':' + m;
	            },
	            canBeOmitted: true
	        },
	        '!dice': {
	            description: app.t('chatCommands[.]throw a dice'),
	            value: function () {
	                return Math.floor(Math.random() * 5) + 1;
	            },
	            canBeOmitted: true
	        },
	        '!roll': {
	            description: app.t('chatCommands[.]random number between 0 and 999'),
	            value: function () {
	                var randomNumber = Math.floor(Math.random() * 1000);

	                if (randomNumber < 100) {
	                    randomNumber = '0' + randomNumber;
	                } else if (randomNumber < 10) {
	                    randomNumber= '00' + randomNumber;
	                }

	                return randomNumber;
	            },
	            canBeOmitted: true
	        },
	        '!q': {
	            description: app.t('chatCommands[.]show the random quote'),
	            value: function (msg) {
	                if (that.randomQuotes.length === 0) {
	                    msg = app.t('chatCommands[.]there aren\'t any quotes.');
	                } else {
	                    msg = that.randomQuotes[Math.floor(Math.random() * (that.randomQuotes.length - 1))];
	                }

	                return msg;
	            },
	            canBeOmitted: true
	        },
	        '!pic': {
	            description: app.t(''),
	            value: function () {
	                var randomNumber = Math.floor(Math.random() * 206);
 
	                if (randomNumber < 100) {
	                    randomNumber = '0' + randomNumber;
	                } else if (randomNumber < 10) {
	                    randomNumber= '00' + randomNumber;
	                }
                   var randomPic = ('http://www.animach.tk/img/') + (randomNumber) + ('.jpg');	                

	                return randomPic;
	            },
	            canBeOmitted: true
	        },
	        '!picrandom': {
	            description: app.t(''),
	            value: function (msg) {
	                var random_images_array = ["1363382418078.png", 
"141000167429.png", 
"1410001686910.png", 
"1410306398205.png", 
"1416301704148.png", 
"1418972601666.png", 
"1422254058570.png",
"1422254999827.png",
"1424092566613.png",
"1428177826695.png",
"1428177904344.png",
"1428178080167.png",
"1428178155255.png",
"1428178187507.png",
"1428254016467.png",
"1428423289437.png",
"1428707759205.png",
"1429510703681.png",
"14350958102351.png",
"1435095810963.png",
"1435212506997.png",
"1436240851027.png",
"1444797684947.png",
"1444797896875.png",
"1444912076567.png",
"1444925656945.png",
"1444932063639.png",
"1445288849940.png",
"1445289056206.png",
"1445902711571.png",
"1446055508030.png",
"1446382234634.png",
"1446463082730.png",
"1446543984763.png",
"1446567791227.png",
"1446781681255.png",
"1447699627084.png",
"1448061734635.png",
"1448184200057.png",
"1448242472700.png",
"1448242666775.png",
"1448491901093.png",
"1450726187259.png",
"1448856052869.png",
"1449726465401.png",
"1450354879735.png",
"1450722871010.png",
"1450724583409.png",
"1450726187259.png",
"1453766877670.png",
"1456435736475.png",
"1456626037119.png",
"1456795820199.png",
"1457227943457.png",
"1457343592535.png",
"1457740113058.png",
"1457765150963.png",
"1457903809526.png",
"1458107401807.png",
"1458114655716.png",
"1458179149667.png",
"1458181302393.png",
"1458378445396.png",
"1458438424722.png",
"1458593213144.png",
"1458602218407.png",
"1458689827974.png",
"1458695854180.png",
"1458701216283.png",
"1458879883654.png",
"1459005360759.png",
"1459039594461.png",
"1466924283295.png",
"1468421480662.png",
"1471262460053.png",
"1471285748918.png",
"1472894659994.png",
"1480486527028.png",
"1484879057343.png",
"1486346829409.png",
"1489034771085.png",
"1489257402500.png",
"1489281927118.png",
"1489297097940.png",
"1490418851494.png",
"1492281060221.png",
"1494909700688.png",
"1506616576326.png",
"1512072270390.png",
"1512276789957.png",
"7ckzd1.png",
"e1c25e2f18430875d15fdcfbb14257e8.png",
"megumin_1.png",
"megumin_2.png",
"nz5vnb.png",
"patreon-1.png",
"patreon-2.png",
"patreon-3.png"
];
path = 'https://catbox.moe/pictures/qts/';
var num = Math.floor( Math.random() * random_images_array.length );
var img = random_images_array[ num ];
var imgStr = '' + path + img + '';
	                    msg = (imgStr);
	                return msg;
	            },
	            canBeOmitted: true
	        },
	        '!skip': {
	            description: app.t('chatCommands[.]vote for the video skip'),
	            value: function (msg) {
	                window.socket.emit("voteskip");
	                msg = app.t('chatCommands[.]you have been voted for the video skip');

	                return msg;
	            },
	            isAvailable: function () {
	                return window.hasPermission('voteskip');
	            },
	            canBeOmitted: true
	        },
	        '!next': {
	            description: app.t('chatCommands[.]play the next video'),
	            value: function (msg) {
	                window.socket.emit("playNext");
	                msg = app.t('chatCommands[.]the next video is playing');

	                return msg;
	            },
	            isAvailable: function () {
	                return window.hasPermission('playlistjump');
	            },
	            canBeOmitted: true
	        },
	        '!bump': {
	            description: app.t('chatCommands[.]bump the last video'),
	            value: function (msg) {
	                var $lastEntry = $('#queue').find('.queue_entry').last();
	                var uid = $lastEntry.data("uid");
	                var title = $lastEntry.find('.qe_title').html();

	                window.socket.emit("moveMedia", {from: uid, after: window.PL_CURRENT});

	                msg = app.t('chatCommands[.]the last video was bumped') + title;

	                return msg;
	            },
	            isAvailable: function () {
	                return window.hasPermission('playlistmove');
	            },
	            canBeOmitted: true
	        },
	        '!add': {
	            description: app.t('chatCommands[.]adds the video to the end of the playlist (e.g. <i>!add https://www.youtube.com/watch?v=hh4gpgAZkc8</i>)'),
	            value: function (msg) {
	                var parsed = window.parseMediaLink(msg.split("!add ")[1]);

	                if (parsed.id === null) {
	                    msg = app.t('chatCommands[.]error: the wrong link');
	                } else {
	                    window.socket.emit("queue", {id: parsed.id, pos: "end", type: parsed.type});
	                    msg = app.t('chatCommands[.]the video was added');
	                }


	                return msg;
	            },
	            isAvailable: function () {
	                return window.hasPermission('playlistadd');
	            },
	            canBeOmitted: true
	        },
	        '!now': {
	            description: app.t('chatCommands[.]show the current video\'s name'),
	            value: function () {
	                return app.t('chatCommands[.]now: ') + $(".queue_active a").html();
	            },
	            canBeOmitted: true
	        },
	        '!sm': {
	            description: app.t('chatCommands[.]show the random emote'),
	            value: function () {
	                var smilesArray = window.CHANNEL.emotes.map(function (smile) {
	                    return smile.name;
	                });

	                return smilesArray[Math.floor(Math.random() * smilesArray.length)] + ' ';
	            },
	            canBeOmitted: true
	        },
	        '!yoba': {
	            description: app.t('chatCommands[.]the secret command'),
	            value: function () {
	                var IMBA = new Audio("https://dl.dropboxusercontent.com/s/olpmjho5dfvxho4/11%20Kobaryo%20-%20ヤンデレのハー_cut_192.mp3");
	                IMBA.volume = 0.6;
	                IMBA.play();

	                return ' :dance: ';
	            },
	            canBeOmitted: true
	        }
	    };


	    this.IS_COMMAND = false;
	    this.prepareMessage = function (msg) {
	        that.IS_COMMAND = false;

	        for (var command in that.commandsList) {
	            if (this.commandsList.hasOwnProperty(command) && _.toLower(_.trim(msg)).indexOf(command) === 0) {
	                if (that.isCommandPermitted(command) && (that.commandsList[command].isAvailable ? that.commandsList[command].isAvailable() : true)) {
	                    that.IS_COMMAND = true;

	                    msg = that.commandsList[command].value(msg);
	                }

	                break;
	            }
	        }

	        return msg;
	    };


	    this.sendUserChatMessage = function (e) {
	        if(e.keyCode === 13) {
	            if (window.CHATTHROTTLE) {
	                return;
	            }

	            var msg = that.$chatline.val().trim();

	            if(msg !== '') {
	                var meta = {};

	                if (window.USEROPTS.adminhat && window.CLIENT.rank >= 255) {
	                    msg = "/a " + msg;
	                } else if (window.USEROPTS.modhat && window.CLIENT.rank >= window.Rank.Moderator) {
	                    meta.modflair = window.CLIENT.rank;
	                }

	                // The /m command no longer exists, so emulate it clientside
	                if (window.CLIENT.rank >= 2 && msg.indexOf("/m ") === 0) {
	                    meta.modflair = window.CLIENT.rank;
	                    msg = msg.substring(3);
	                }


	                var msgForCommand = this.prepareMessage(msg);

	                if (that.IS_COMMAND) {
	                    window.socket.emit("chatMsg", {msg: msg, meta: meta});
	                    window.socket.emit("chatMsg", {msg: 'Сырно: ' + msgForCommand});

	                    that.IS_COMMAND = false;
	                } else {
	                    window.socket.emit("chatMsg", {msg: msg, meta: meta});
	                }


	                window.CHATHIST.push(that.$chatline.val());
	                window.CHATHISTIDX = window.CHATHIST.length;
	                that.$chatline.val('');
	            }

	            return;
	        } else if(e.keyCode === 9) { // Tab completion
                try {
                    window.chatTabComplete();
                } catch (error) {
                    console.error(error);
                }
	            e.preventDefault();
	            return false;
	        } else if(e.keyCode === 38) { // Up arrow (input history)
	            if(window.CHATHISTIDX === window.CHATHIST.length) {
	                window.CHATHIST.push(that.$chatline.val());
	            }
	            if(window.CHATHISTIDX > 0) {
	                window.CHATHISTIDX--;
	                that.$chatline.val(window.CHATHIST[window.CHATHISTIDX]);
	            }

	            e.preventDefault();
	            return false;
	        } else if(e.keyCode === 40) { // Down arrow (input history)
	            if(window.CHATHISTIDX < window.CHATHIST.length - 1) {
	                window.CHATHISTIDX++;
	                that.$chatline.val(window.CHATHIST[window.CHATHISTIDX]);
	            }

	            e.preventDefault();
	            return false;
	        }
	    };


	    that.$chatline.off().on('keydown', function (e) {
	        that.sendUserChatMessage(e);
	    });

	    $('#chatbtn').off().on('click', function (e) {
	        that.sendUserChatMessage(e);
	    });
	});
/***/

/* modal picture */
/***/
    window.cytubeEnhanced.addModule('themes', function (app, settings) {
        'use strict';
        var that = this;
 
        var defaultSettings = {
            defaultTheme: 'default_theme', //default theme for user (until user do not change it)
            themeId: 'theme-css' //node id in DOM
        };
        settings = $.extend({}, defaultSettings, settings);
 
 
        $('#us-theme').closest('.form-group').hide().val('/css/themes/slate.css');
        if (window.createCookie) {
            window.createCookie('cytube-theme', '/css/themes/slate.css', 1000);
        }
 
 
        var tab = app.Settings.getTab('themes', app.t('themes[.]Themes'), 500);
        var $tabContent = $('<div class="' + app.prefix + 'themes">').appendTo(tab.$content);
        var userSettings = app.Settings.storage;
 
        var $themesInfoMessage = $('<div class="' + app.prefix + 'themes__info-message">').text('Темы отсутствуют.').prependTo(tab.$content);
 
        var namespace = 'themes';
        userSettings.setDefault(namespace + '.selected', settings.defaultTheme);
        this.themes = {};
 
 
        //if settings.defaultTheme was changed by administrator ask user if he want to switch on it
        this.applyNewDefaultTheme = function () {
            var previousDefaultTheme = userSettings.get(namespace + '.previousDefaultTheme');
            if (userSettings.get(namespace + '.selected') == previousDefaultTheme) {
                userSettings.set(namespace + '.previousDefaultTheme', settings.defaultTheme);
                that.setTheme(settings.defaultTheme);
                userSettings.save();
                console.log('reloading');
                window.location.reload();
            } else if (!previousDefaultTheme || (previousDefaultTheme && previousDefaultTheme != settings.defaultTheme)) {
                userSettings.set(namespace + '.previousDefaultTheme', settings.defaultTheme);
                userSettings.save();
 
                if (settings.defaultTheme != userSettings.get(namespace + '.selected')) {
                    var themeTitle = that.themes[settings.defaultTheme].title;
                    app.UI.createConfirmWindow(app.t('themes[.]Default theme was changed to "%themeTitle%" by administrator. Do you want to try it? (Don\'t forget, that you can switch your theme in extended settings anytime.)').replace('%themeTitle%', themeTitle), function (isConfirmed) {
                        if (isConfirmed) {
                            that.setTheme(settings.defaultTheme);
                            userSettings.save();
                            app.UI.createConfirmWindow(app.t('settings[.]Some settings need to refresh the page to get to work. Do it now?'), function (isConfirmed) {
                                if (isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        }
                    });
                }
            }
        };
 
 
        this.add = function (config) {
            $themesInfoMessage.remove();
 
            that.themes[config.name] = config;
            that.themes[config.name].$el = that.addMarkup(config).appendTo($tabContent);
            that.sort();
 
            if (config.name === userSettings.get(namespace + '.selected')) {
                if (config.name === settings.defaultTheme) {
                    userSettings.set(namespace + '.previousDefaultTheme', settings.defaultTheme);
                    userSettings.save();
                }
                that.setTheme(config.name);
                that.applyTheme(config.name);
            } else if (config.name === settings.defaultTheme) {
                that.applyNewDefaultTheme();
            }
        };
 
 
        tab.onShow(function () {
            $('.' + app.prefix + 'themes__item')
                .removeClass('active')
                .filter(function() {
                    return $(this).data('name') === userSettings.get(namespace + '.selected');
                })
                .addClass('active');
        });
 
 
        /**
         * Sets theme
         * @param name Theme's name
         */
        this.setTheme = function (name) {
            userSettings.set(namespace + '.selected', name);
 
            $('.' + app.prefix + 'themes__item')
                .removeClass('active')
                .filter(function() {
                    return $(this).data('name') === name;
                })
                .addClass('active');
        };
 
 
        this.applyTheme = function (name) {
            var config = that.themes[name];
 
            $('#' + settings.themeId).remove();
            if (config.cssUrl) {
                $('<link rel="stylesheet" id="' + settings.themeId + '">').attr('href', config.cssUrl).appendTo($('head'));
            } else { //resets to default theme
                that.setTheme(userSettings.getDefault(namespace + '.selected'));
            }
 
            if (config.jsUrl) {
                $.getScript(config.jsUrl);
            }
        };
 
 
        this.addMarkup = function (config) {
            var $moduleInfo = $('<div class="' + app.prefix + 'themes__item">').data('name', config.name).on('click', function () {
                var name = $(this).data('name');
 
                if (name !== userSettings.get(namespace + '.selected')) {
                    app.UI.createConfirmWindow(app.t('themes[.]Apply this theme?'), function (isConfirmed) {
                        if (isConfirmed) {
                            that.setTheme(name);
                        }
                    });
                }
            });
 
 
            var $title = $('<div class="' + app.prefix + 'themes__item__title">').text(config.title).appendTo($moduleInfo);
 
            if (typeof config.pictureUrl !== 'undefined' && (config.pictureUrl = config.pictureUrl.trim()) !== '') {
                $('<div class="' + app.prefix + 'themes__item__picture">').appendTo($moduleInfo).css('background-image', 'url("' + config.pictureUrl + '")');
            }
 
 
            return $moduleInfo;
        };
 
 
        this.sort = function () {
            var themesArray = [];
            for (var theme in that.themes) {
                themesArray.push(that.themes[theme]);
            }
 
            themesArray = themesArray.sort(function (a, b) {
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1;
                } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1;
                } else {
                    return 0;
                }
            });
 
            for (var themeIndex = 0, themesLength = themesArray.length; themeIndex < themesLength; themeIndex++) {
                themesArray[themeIndex].$el.detach().appendTo($tabContent);
            }
        };
 
 
        /**
         * Saving and applying settings
         */
        app.Settings.onSave(function (settings) {
            if (settings.isDirty(namespace + '.selected')) {
                app.Settings.requestPageReload();
            }
        });
    });
     
    window.cytubeEnhanced.addModule('imagePreview', function (app, settings) {
        'use strict';
        var that = this;
 
        var defaultSettings = {
            selectorsToPreview: '.chat-picture, .motd-tab-content img', // 'selector1, selector2'. Every selector's node must have attribute src
            zoom: 0.15
        };
        settings = $.extend({}, defaultSettings, settings);
 
        this.showPicturePreview = function (pictureToPreview) {
            if ($(pictureToPreview).is(settings.selectorsToPreview)) {
                var $picture = $('<img src="' + $(pictureToPreview).attr('src') + '">');
 
                $picture.ready(function () {
                    $('<div id="modal-picture-overlay">').appendTo($(document.body));
                    var $modalPicture = $('<div id="modal-picture">').appendTo($(document.body)).draggable();
 
                    var pictureWidth = $picture.prop('width');
                    var pictureHeight = $picture.prop('height');
 
 
                    var $modalPictureOptions = $('<div id="modal-picture-options">');
                    $modalPicture.append($('<div id="modal-picture-options-wrapper">').append($modalPictureOptions));
 
                    $('<a href="' + $picture.prop('src') + '" target="_blank" class="btn btn-sm btn-default"><i class="glyphicon glyphicon-eye-open"></i></button>')
                        .appendTo($modalPictureOptions);
                    $('<a href="https://www.google.com/searchbyimage?image_url=' + $picture.prop('src') + '" target="_blank" class="btn btn-sm btn-default"><i class="glyphicon glyphicon-search"></i></button>')
                        .appendTo($modalPictureOptions);
 
 
                    var scaleFactor = 1;
                    if (pictureWidth > document.documentElement.clientWidth && pictureHeight > document.documentElement.clientHeight) {
                        if ((pictureHeight - document.documentElement.clientHeight) > (pictureWidth - document.documentElement.clientWidth)) {
                            scaleFactor = pictureHeight / (document.documentElement.clientHeight * 0.8);
                        } else {
                            scaleFactor = pictureWidth / (document.documentElement.clientWidth * 0.8);
                        }
                    } else if (pictureHeight > document.documentElement.clientHeight) {
                        scaleFactor = pictureHeight / (document.documentElement.clientHeight * 0.8);
                    } else if (pictureWidth > document.documentElement.clientWidth) {
                        scaleFactor = pictureWidth / (document.documentElement.clientWidth * 0.8);
                    }
 
                    pictureHeight /= scaleFactor;
                    pictureWidth /= scaleFactor;
 
                    $modalPicture.css({
                        width: pictureWidth,
                        height: pictureHeight,
                        marginLeft: -(pictureWidth / 2),
                        marginTop: -(pictureHeight / 2)
                    });
 
 
                    $picture.appendTo($modalPicture);
                });
            }
        };
        $(document.body).on('click', function (event) {
            that.showPicturePreview(event.target);
        });
 
 
        this.handleModalPictureMouseWheel = function (e) {
            var $modalPicture = $('#modal-picture');
            var pictureWidth = parseInt($modalPicture.css('width'), 10);
            var pictureHeight = parseInt($modalPicture.css('height'), 10);
            var pictureMarginLeft = parseInt($modalPicture.css('marginLeft'), 10);
            var pictureMarginTop = parseInt($modalPicture.css('marginTop'), 10);
 
            if (e.originalEvent.deltaY < 0) { //up
                $modalPicture.css({
                    width: pictureWidth * (1 + settings.zoom),
                    height: pictureHeight * (1 + settings.zoom),
                    marginLeft: pictureMarginLeft + (-pictureWidth * settings.zoom / 2),
                    marginTop: pictureMarginTop + (-pictureHeight * settings.zoom / 2)
                });
            } else { //down
                $modalPicture.css({
                    width: pictureWidth * (1 - settings.zoom),
                    height: pictureHeight * (1 - settings.zoom),
                    marginLeft: pictureMarginLeft + (pictureWidth * settings.zoom / 2),
                    marginTop: pictureMarginTop + (pictureHeight * settings.zoom / 2)
                });
            }
        };
        $(document.body).on('mousewheel', '#modal-picture', function (e) {
            that.handleModalPictureMouseWheel(e);
 
            return false;
        });
 
 
        this.closePictureByClick = function () {
            $('#modal-picture-overlay').remove();
            $('#modal-picture').remove();
        };
        $(document.body).on('click', '#modal-picture-overlay, #modal-picture', function () {
            that.closePictureByClick();
        });
 
        this.closePictureByEscape = function (e) {
            if (e.which === 27 && $('#modal-picture').length !== 0) {
                $('#modal-picture-overlay').remove();
                $('#modal-picture').remove();
            }
        };
        $(document.body).on('keydown', function (e) {
            that.closePictureByEscape(e);
        });
    });
 
 
    /*!
     * jQuery Mousewheel 3.1.13
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     */
 
    (function (factory) {
        if ( typeof define === 'function' && define.amd ) {
            // AMD. Register as an anonymous module.
            define(['jquery'], factory);
        } else if (typeof exports === 'object') {
            // Node/CommonJS style for Browserify
            module.exports = factory;
        } else {
            // Browser globals
            factory(jQuery);
        }
    }(function ($) {
 
        var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
            toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                        ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
            slice  = Array.prototype.slice,
            nullLowestDeltaTimeout, lowestDelta;
 
        if ( $.event.fixHooks ) {
            for ( var i = toFix.length; i; ) {
                $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
            }
        }
 
        var special = $.event.special.mousewheel = {
            version: '3.1.12',
 
            setup: function() {
                if ( this.addEventListener ) {
                    for ( var i = toBind.length; i; ) {
                        this.addEventListener( toBind[--i], handler, false );
                    }
                } else {
                    this.onmousewheel = handler;
                }
                // Store the line height and page height for this particular element
                $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
                $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
            },
 
            teardown: function() {
                if ( this.removeEventListener ) {
                    for ( var i = toBind.length; i; ) {
                        this.removeEventListener( toBind[--i], handler, false );
                    }
                } else {
                    this.onmousewheel = null;
                }
                // Clean up the data we added to the element
                $.removeData(this, 'mousewheel-line-height');
                $.removeData(this, 'mousewheel-page-height');
            },
 
            getLineHeight: function(elem) {
                var $elem = $(elem),
                    $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
                if (!$parent.length) {
                    $parent = $('body');
                }
                return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
            },
 
            getPageHeight: function(elem) {
                return $(elem).height();
            },
 
            settings: {
                adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
                normalizeOffset: true  // calls getBoundingClientRect for each event
            }
        };
 
        $.fn.extend({
            mousewheel: function(fn) {
                return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
            },
 
            unmousewheel: function(fn) {
                return this.unbind('mousewheel', fn);
            }
        });
 
 
        function handler(event) {
            var orgEvent   = event || window.event,
                args       = slice.call(arguments, 1),
                delta      = 0,
                deltaX     = 0,
                deltaY     = 0,
                absDelta   = 0,
                offsetX    = 0,
                offsetY    = 0;
            event = $.event.fix(orgEvent);
            event.type = 'mousewheel';
 
            // Old school scrollwheel delta
            if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
            if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
            if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
            if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }
 
            // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
            if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
                deltaX = deltaY * -1;
                deltaY = 0;
            }
 
            // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
            delta = deltaY === 0 ? deltaX : deltaY;
 
            // New school wheel delta (wheel event)
            if ( 'deltaY' in orgEvent ) {
                deltaY = orgEvent.deltaY * -1;
                delta  = deltaY;
            }
            if ( 'deltaX' in orgEvent ) {
                deltaX = orgEvent.deltaX;
                if ( deltaY === 0 ) { delta  = deltaX * -1; }
            }
 
            // No change actually happened, no reason to go any further
            if ( deltaY === 0 && deltaX === 0 ) { return; }
 
            // Need to convert lines and pages to pixels if we aren't already in pixels
            // There are three delta modes:
            //   * deltaMode 0 is by pixels, nothing to do
            //   * deltaMode 1 is by lines
            //   * deltaMode 2 is by pages
            if ( orgEvent.deltaMode === 1 ) {
                var lineHeight = $.data(this, 'mousewheel-line-height');
                delta  *= lineHeight;
                deltaY *= lineHeight;
                deltaX *= lineHeight;
            } else if ( orgEvent.deltaMode === 2 ) {
                var pageHeight = $.data(this, 'mousewheel-page-height');
                delta  *= pageHeight;
                deltaY *= pageHeight;
                deltaX *= pageHeight;
            }
 
            // Store lowest absolute delta to normalize the delta values
            absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );
 
            if ( !lowestDelta || absDelta < lowestDelta ) {
                lowestDelta = absDelta;
 
                // Adjust older deltas if necessary
                if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                    lowestDelta /= 40;
                }
            }
 
            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                // Divide all the things by 40!
                delta  /= 40;
                deltaX /= 40;
                deltaY /= 40;
            }
 
            // Get a whole, normalized value for the deltas
            delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
            deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
            deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);
 
            // Normalise offsetX and offsetY properties
            if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
                var boundingRect = this.getBoundingClientRect();
                offsetX = event.clientX - boundingRect.left;
                offsetY = event.clientY - boundingRect.top;
            }
 
            // Add information to the event object
            event.deltaX = deltaX;
            event.deltaY = deltaY;
            event.deltaFactor = lowestDelta;
            event.offsetX = offsetX;
            event.offsetY = offsetY;
            // Go ahead and set deltaMode to 0 since we converted to pixels
            // Although this is a little odd since we overwrite the deltaX/Y
            // properties with normalized deltas.
            event.deltaMode = 0;
 
            // Add event and delta to the front of the arguments
            args.unshift(event, delta, deltaX, deltaY);
 
            // Clearout lowestDelta after sometime to better
            // handle multiple device types that give different
            // a different lowestDelta
            // Ex: trackpad = 3 and mouse wheel = 120
            if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
            nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);
 
            return ($.event.dispatch || $.event.handle).apply(this, args);
        }
 
        function nullLowestDelta() {
            lowestDelta = null;
        }
 
        function shouldAdjustOldDeltas(orgEvent, absDelta) {
            // If this is an older event and the delta is divisable by 120,
            // then we are assuming that the browser is treating this as an
            // older mouse wheel event and that we should divide the deltas
            // by 40 to try and get a more usable deltaFactor.
            // Side note, this actually impacts the reported scroll distance
            // in older browsers and can cause scrolling to be slower than native.
            // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
            return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
        }
 
    }));
 
 
    /*!
     * jQuery UI Touch Punch 0.2.3
     *
     * Copyright 2011–2014, Dave Furfero
     * Dual licensed under the MIT or GPL Version 2 licenses.
     *
     * Depends:
     *  jquery.ui.widget.js
     *  jquery.ui.mouse.js
     */
    (function ($) {
 
      // Detect touch support
      $.support.touch = 'ontouchend' in document;
 
      // Ignore browsers without touch support
      if (!$.support.touch) {
        return;
      }
 
      var mouseProto = $.ui.mouse.prototype,
          _mouseInit = mouseProto._mouseInit,
          _mouseDestroy = mouseProto._mouseDestroy,
          touchHandled;
 
      /**
       * Simulate a mouse event based on a corresponding touch event
       * @param {Object} event A touch event
       * @param {String} simulatedType The corresponding mouse event
       */
      function simulateMouseEvent (event, simulatedType) {
 
        // Ignore multi-touch events
        if (event.originalEvent.touches.length > 1) {
          return;
        }
 
        event.preventDefault();
 
        var touch = event.originalEvent.changedTouches[0],
            simulatedEvent = document.createEvent('MouseEvents');
         
        // Initialize the simulated mouse event using the touch event's coordinates
        simulatedEvent.initMouseEvent(
          simulatedType,    // type
          true,             // bubbles                    
          true,             // cancelable                 
          window,           // view                       
          1,                // detail                     
          touch.screenX,    // screenX                    
          touch.screenY,    // screenY                    
          touch.clientX,    // clientX                    
          touch.clientY,    // clientY                    
          false,            // ctrlKey                    
          false,            // altKey                     
          false,            // shiftKey                   
          false,            // metaKey                    
          0,                // button                     
          null              // relatedTarget              
        );
 
        // Dispatch the simulated event to the target element
        event.target.dispatchEvent(simulatedEvent);
      }
 
      /**
       * Handle the jQuery UI widget's touchstart events
       * @param {Object} event The widget element's touchstart event
       */
      mouseProto._touchStart = function (event) {
 
        var self = this;
 
        // Ignore the event if another widget is already being handled
        if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
          return;
        }
 
        // Set the flag to prevent other widgets from inheriting the touch event
        touchHandled = true;
 
        // Track movement to determine if interaction was a click
        self._touchMoved = false;
 
        // Simulate the mouseover event
        simulateMouseEvent(event, 'mouseover');
 
        // Simulate the mousemove event
        simulateMouseEvent(event, 'mousemove');
 
        // Simulate the mousedown event
        simulateMouseEvent(event, 'mousedown');
      };
 
      /**
       * Handle the jQuery UI widget's touchmove events
       * @param {Object} event The document's touchmove event
       */
      mouseProto._touchMove = function (event) {
 
        // Ignore event if not handled
        if (!touchHandled) {
          return;
        }
 
        // Interaction was not a click
        this._touchMoved = true;
 
        // Simulate the mousemove event
        simulateMouseEvent(event, 'mousemove');
      };
 
      /**
       * Handle the jQuery UI widget's touchend events
       * @param {Object} event The document's touchend event
       */
      mouseProto._touchEnd = function (event) {
 
        // Ignore event if not handled
        if (!touchHandled) {
          return;
        }
 
        // Simulate the mouseup event
        simulateMouseEvent(event, 'mouseup');
 
        // Simulate the mouseout event
        simulateMouseEvent(event, 'mouseout');
 
        // If the touch interaction did not move, it should trigger a click
        if (!this._touchMoved) {
 
          // Simulate the click event
          simulateMouseEvent(event, 'click');
        }
 
        // Unset the flag to allow other widgets to inherit the touch event
        touchHandled = false;
      };
 
      /**
       * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
       * This method extends the widget with bound touch event handlers that
       * translate touch events to mouse events and pass them to the widget's
       * original mouse event handling methods.
       */
      mouseProto._mouseInit = function () {
         
        var self = this;
 
        // Delegate the touch handlers to the widget's element
        self.element.bind({
          touchstart: $.proxy(self, '_touchStart'),
          touchmove: $.proxy(self, '_touchMove'),
          touchend: $.proxy(self, '_touchEnd')
        });
 
        // Call the original $.ui.mouse init method
        _mouseInit.call(self);
      };
 
      /**
       * Remove the touch event handlers
       */
      mouseProto._mouseDestroy = function () {
         
        var self = this;
 
        // Delegate the touch handlers to the widget's element
        self.element.unbind({
          touchstart: $.proxy(self, '_touchStart'),
          touchmove: $.proxy(self, '_touchMove'),
          touchend: $.proxy(self, '_touchEnd')
        });
 
        // Call the original $.ui.mouse destroy method
        _mouseDestroy.call(self);
      };
 
    })(jQuery);
/***/


/* Chat Controls */
/***/
	window.cytubeEnhanced.addModule('chatControls', function (app, settings) {
	    'use strict';
	    var that = this;

	    var defaultSettings = {
	        afkButton: true,
	        clearChatButton: true
	    };
	    settings = $.extend({}, defaultSettings, settings);



	    this.handleAfkBtn = function () {
	        window.socket.emit('chatMsg', {msg: '/afk'});
	    };
	    this.$afkBtn = $('<span id="afk-btn" class="label label-default pull-right pointer">')
	        .text(app.t('AFK'))
	        .appendTo('#chatheader')
	        .on('click', function () {
	            that.handleAfkBtn();
	        });



	    this.handleAfk = function (data) {
	        if (data.name === window.CLIENT.name) {
	            if (data.afk) {
	                that.$afkBtn.removeClass('label-default');
	                that.$afkBtn.addClass('label-success');
	            } else {
	                that.$afkBtn.addClass('label-default');
	                that.$afkBtn.removeClass('label-success');
	            }
	        }
	    };

	    if (settings.afkButton) {
	        window.socket.on('setAFK', function (data) {
	            that.handleAfk(data);
	        });
	    } else {
	        this.$afkBtn.hide();
	    }




	    this.handleClearBtn = function () {
	        if (window.confirm(app.t('Are you sure, that you want to clear the chat?'))) {
	            window.socket.emit("chatMsg", {msg: '/clear'});
	        }
	    };
	    this.$clearChatBtn = $('<span id="clear-chat-btn" class="label label-default pull-right pointer">')
	        .text(app.t('Clear'))
	        .insertAfter(this.$afkBtn)
	        .on('click', function () {
	            that.handleClearBtn();
	        });

	    if (!window.hasPermission("chatclear")) {
	        this.$clearChatBtn.hide();
	    }


	    this.handleChatClear = function () {
	        if (window.hasPermission("chatclear") && settings.clearChatButton) {
	            that.$clearChatBtn.show();
	        } else {
	            that.$clearChatBtn.hide();
	        }
	    };

	    window.socket.on('setUserRank', function () {
	        that.handleChatClear();
	    });
	});
/***/

/* Chat History */

/***/
window.cytubeEnhanced.addModule('chatHistory', function (app, settings) {
	    'use strict';
	    var that = this;

	    var defaultSettings = {
	        itemsInHistory: 50
	    };
	    settings = $.extend({}, defaultSettings, settings);
	    app.storage.setDefault('pmHistory', []);


	    window.socket.on('chatMsg', function (data) {
	        if (window.CLIENT.name && data.msg.toLowerCase().indexOf(window.CLIENT.name.toLowerCase()) != -1) {
	            var pmHistory = app.storage.get('pmHistory');
	            if (!$.isArray(pmHistory)) {
	                pmHistory = [];
	            }

	            if (pmHistory.length >= settings.itemsInHistory) {
	                pmHistory = pmHistory.slice(0, settings.itemsInHistory - 1);
	            }

	            pmHistory.unshift({
	                username: data.username,
	                msg: data.msg,
	                time: data.time
	            });

	            app.storage.set('pmHistory', pmHistory);
	        }
	    });


	    this.formatHistoryMessage = function (data) {
	        var $messageWrapper = $('<div class="pm-history-message">');


	        var time = (new Date(data.time));

	        var day = time.getDate();
	        day = day < 10 ? ('0' + day) : day;
	        var month = time.getMonth() + 1;
	        month = month < 10 ? ('0' + month) : month;
	        var year = time.getFullYear();
	        var hours = time.getHours();
	        hours = hours < 10 ? ('0' + hours) : hours;
	        var minutes = time.getMinutes();
	        minutes = minutes < 10 ? ('0' + minutes) : minutes;
	        var seconds = time.getSeconds();
	        seconds = seconds < 10 ? ('0' + seconds) : seconds;

	        var timeString = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + ':' + seconds;


	        if (data.username !== "[server]") {
            		$messageWrapper.append($('<div class="pm-history-message-time">[' + timeString + ']</div>'));
            		$messageWrapper.append($('<div class="pm-history-message-username">' + data.username + '</div>'));
            		$messageWrapper.append($('<div class="pm-history-message-content">' + data.msg + '</div>'));
        	}

	        return $messageWrapper;
	    };

	    this.showChatHistory = function () {
	        var pmHistory = app.storage.get('pmHistory');
	        if (!$.isArray(pmHistory)) {
	            pmHistory = [];
	        }


	        var $header = $('<div class="modal-header__inner">');
	        $header.append($('<h3 class="modal-title">').text(app.t('pmHistory[.]Chat history')));
	        $header.append($('<div class="modat-header__description">').text(app.t('pmHistory[.]Your chat messages history.')));

	        var $wrapper = $('<div class="pm-history-content">');
	        for (var position = 0, historyLength = pmHistory.length; position < historyLength; position++) {
	            $wrapper.append(that.formatHistoryMessage(pmHistory[position]));
	        }


	        var $resetChatHistoryBtn = $('<button type="button" id="pm-history-reset-btn" class="btn btn-danger" data-dismiss="modal">' + app.t('pmHistory[.]Reset history') + '</button>')
	            .on('click', function () {
	                if (window.confirm(app.t('pmHistory[.]Are you sure, that you want to clear messages history?'))) {
	                    that.resetChatHistory();
	                }
	            });
	        var $exitChatHistoryBtn = $('<button type="button" id="pm-history-exit-btn" class="btn btn-default" data-dismiss="modal">' + app.t('pmHistory[.]Exit') + '</button>');
	        var $footer = $('<div class="pm-history-footer">');
	        $footer.append($resetChatHistoryBtn);
	        $footer.append($exitChatHistoryBtn);


	        return app.UI.createModalWindow('chat-history', $header, $wrapper, $footer);
	    };

	    this.$showChatHistoryBtn = $('<span id="pm-history-btn" class="label label-default pull-right pointer">')
	        .text(app.t('pmHistory[.]History'))
	        .appendTo('#chatheader')
	        .on('click', function () {
	            that.showChatHistory();
	        });


	    this.resetChatHistory = function () {
	        app.storage.set('pmHistory', app.storage.getDefault('pmHistory'));
	    };
	});
/***/

/* navMenuTab */
/***/
window.cytubeEnhanced.addModule('navMenuTabs', function (app) {
	    'use strict';
	    var that = this;


	    this.addTabInput = function ($tabsArea, tabName, tabValue) {
	        tabName = tabName || '';
	        tabValue = tabValue || '';

	        var $wrapper = $('<div class="row tab-option-wrapper">').appendTo($tabsArea);

	        var $tabNameWrapperOfWrapper = $('<div class="col-sm-4 col-md-3">').appendTo($wrapper);
	        var $tabNameWrapper = $('<div class="form-group">').appendTo($tabNameWrapperOfWrapper);
	        $('<input name="title" type="text" class="form-control" placeholder="' + app.t('tabs[.]Title') + '">')
	            .val(tabName)
	            .appendTo($tabNameWrapper);


	        var $tabValueWrapperOfWrapper = $('<div class="col-sm-8 col-md-9">').appendTo($wrapper);
	        var $tabValueWrapper = $('<div class="form-group">').appendTo($tabValueWrapperOfWrapper);
	        $('<input name="content" type="text" class="form-control" placeholder="' + app.t('tabs[.]Content') + '">')
	            .val(tabValue)
	            .appendTo($tabValueWrapper);
	    };


	    this.tabsConfigToHtml = function (channelDescription, tabsConfig) {
	        var $virtualMainWrapper = $('<div>');

	        if (channelDescription !== undefined && channelDescription !== '') {
	            $('<div id="motd-channel-description">')
	                .html(channelDescription)
	                .appendTo($virtualMainWrapper);
	        }

	        if (tabsConfig.length !== 0) {
	            var TAB_TITLE = 0;
	            var TAB_CONTENT = 1;
	            var LINK_TITLE = 0;
	            var LINK_ADDRESS = 1;

	            var $tabsWrapper = $('<div id="motd-tabs-wrapper">').appendTo($virtualMainWrapper);
	            var $tabs = $('<div id="motd-tabs">').appendTo($tabsWrapper);
	            var $tabsContent = $('<div id="motd-tabs-content">').appendTo($tabsWrapper);

	            for (var tabIndex = 0, tabsLength = tabsConfig.length; tabIndex < tabsLength; tabIndex++) {
	                if (tabsConfig[tabIndex][TAB_TITLE].indexOf('!dropdown!') === 0) {
	                    var $dropdownWrapper = $('<div class="btn-group">');
	                    $('<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">')
	                        .html(tabsConfig[tabIndex][TAB_TITLE].replace('!dropdown!', '') + ' <span class="caret"></span>')
	                        .appendTo($dropdownWrapper);
	                    var $dropdownMenu = $('<ul class="dropdown-menu">')
	                        .appendTo($dropdownWrapper);

	                    var linksConfig = tabsConfig[tabIndex][TAB_CONTENT];
	                    for (var linkIndex = 0, linksLength = tabsConfig[tabIndex][TAB_CONTENT].length; linkIndex < linksLength; linkIndex++) {
	                        var $link = $('<a>').attr({href: linksConfig[linkIndex][LINK_ADDRESS], target: '_blank'}).text(linksConfig[linkIndex][LINK_TITLE]);
	                        $('<li>').html($link).appendTo($dropdownMenu);
	                    }

	                    $dropdownWrapper.appendTo($tabs);
	                } else if (tabsConfig[tabIndex][TAB_TITLE].indexOf('!link!') === 0) {
	                    $('<a href="' + tabsConfig[tabIndex][TAB_CONTENT] + '" target="_blank" class="btn btn-default btn-link">')
	                        .html(tabsConfig[tabIndex][TAB_TITLE].replace('!link!', ''))
	                        .appendTo($tabs);
	                } else {
	                    $('<button class="btn btn-default motd-tab-btn" data-tab-index="' + tabIndex + '">')
	                        .html(tabsConfig[tabIndex][TAB_TITLE])
	                        .appendTo($tabs);

	                    $('<div class="motd-tab-content" data-tab-index="' + tabIndex + '">')
	                        .hide()
	                        .html(tabsConfig[tabIndex][TAB_CONTENT])
	                        .appendTo($tabsContent);
	                }
	            }
	        }

	        return $virtualMainWrapper.html();
	    };


	    this.tabsHtmlToCondig = function (htmlCode) {
	        this.$tabsArea.empty();

	        var $tabsTree = $('<div>').html(htmlCode);
	        var $tabsTreeNavBtns = $tabsTree.find('#motd-tabs').children();
	        var $tabsTreeTabsContent = $tabsTree.find('#motd-tabs-content');

	        $('#channel-description-input').val($tabsTree.find('#motd-channel-description').html());

	        $tabsTreeNavBtns.each(function () {
	            if ($(this).hasClass('btn-group')) { //dropdown
	                var parsedDropdownItems = '';
	                var $dropdownItems = $(this).children('ul').children();

	                $dropdownItems.each(function () {
	                    var link = $(this).children('a');

	                    parsedDropdownItems += '[n]' + link.text() + '[/n][a]' + link.attr('href') + '[/a], ';
	                });
	                parsedDropdownItems = parsedDropdownItems.slice(0, -2);

	                that.addTabInput(that.$tabsArea, '!dropdown!' + $(this).children('button').html().replace(' <span class="caret"></span>', ''), parsedDropdownItems);
	            } else if ($(this).hasClass('btn-link')) { //link
	                that.addTabInput(that.$tabsArea, '!link!' + $(this).html(), $(this).attr('href'));
	            } else { //tab
	                that.addTabInput(that.$tabsArea, $(this).html(), $tabsTreeTabsContent.find('[data-tab-index="' + $(this).data('tabIndex') + '"]').html());
	            }
	        });
	    };


	    this.motdCutMap = {
	        '<iframe $1>$2</iframe>': /\[iframe(.*?)\](.*?)[/iframe]]/g
	    };
	    this.fixMotdCut = function () {
	        $('#motd-tabs-content').find('.motd-tab-content').each(function () {
	            for (var tag in that.motdCutMap) {
	                if (that.motdCutMap.hasOwnProperty(tag)) {
	                    $(this).html($(this).html().replace(that.motdCutMap[tag], tag));
	                }
	            }
	        });
	    };


	    this.$tabsSettings = $('<div id="tabs-settings">')
	        .html('<hr>' +
	            '<h3>' + app.t('tabs[.]Tabs settings') + '</h3>' +
	            '<ul>' +
	                '<li>' + app.t('tabs[.]By default tab behaves like simple tab.') + '</li>' +
	                '<li>' + app.t('tabs[.]Use !dropdown! prefix to create dropdown list. Example: !dropdown!My dropdown. Value must look like "[n]Link title 1[/n][a]URL 1[/a], [n]Link title 2[/n][a]URL 2[/a], [n]Link title 3[/n][a]URL 3[/a]"') + '</li>' +
	                '<li>' + app.t('tabs[.]Use !link! prefix to create link. Example: !link!My link. Value must contain URL.') + '</li>' +
	            '</ul>')
	        .insertBefore('#cs-motdtext')
	        .hide();


	    this.$tabSettingsBtn = $('<button type="button" class="btn btn-primary motd-bottom-btn" id="show-tabs-settings">')
	        .text(app.t('tabs[.]Show tabs settings (cytube enhanced)'))
	        .appendTo('#cs-motdeditor')
	        .on('click', function () {
	            if ($(this).hasClass('btn-primary')) {
	                that.$tabsSettings.show();

	                $(this).removeClass('btn-primary');
	                $(this).addClass('btn-success');
	            } else {
	                that.$tabsSettings.hide();

	                $(this).removeClass('btn-success');
	                $(this).addClass('btn-primary');
	            }
	        });

	    $('#cs-motdtext').before('<hr>');


	    this.$channelDescriptionInputWrapper = $('<div class="form-group">').appendTo(this.$tabsSettings);
	    this.$channelDescriptionLabel = $('<label for="channel-description-input">' + app.t('tabs[.]Channel description') + '</label>').appendTo(this.$channelDescriptionInputWrapper);
	    this.$channelDescriptionInput = $('<input id="channel-description-input" placeholder="' + app.t('tabs[.]Channel description') + '" class="form-control">').appendTo(this.$channelDescriptionInputWrapper);


	    this.$tabsArea = $('<div id="tabs-settings-area">').appendTo(this.$tabsSettings);

	    $('<p>Вкладки</p>').insertBefore(this.$tabsArea);


	    this.$addTabToTabsSettingsBtn = $('<button type="button" class="btn btn-sm btn-primary" id="tabs-settings-add">')
	        .text(app.t('tabs[.]Add tab'))
	        .appendTo(this.$tabsSettings)
	        .on('click', function () {
	            that.addTabInput(that.$tabsArea);
	        });


	    this.$removeLastTabFromTabsSettingsBtn = $('<button type="button" class="btn btn-sm btn-primary" id="tabs-settings-remove">')
	        .text(app.t('tabs[.]Remove the last tab'))
	        .appendTo(this.$tabsSettings)
	        .on('click', function () {
	            that.$tabsArea.children('.tab-option-wrapper').last().remove();
	        });


	    this.$tabsToHtml = $('<button type="button" class="btn btn-sm btn-primary" id="tabs-settings-to-html">')
	        .text(app.t('tabs[.]Convert to the editor\'s code'))
	        .appendTo(this.$tabsSettings)
	        .on('click', function () {
	            if (window.confirm(app.t('tabs[.]The code in the editor will be replaced with the new code, continue?'))) {
	                $(this).removeClass('btn-success');

	                var tabsConfig = []; //list of arrays like [tabTitle, tabContent]

	                that.$tabsArea.find('.tab-option-wrapper').each(function () {
	                    var tabName = $(this).find('input[name="title"]').val().trim();
	                    var tabContent = $(this).find('input[name="content"]').val().trim();

	                    if (tabName.indexOf('!dropdown!') === 0) {
	                        if (!/^(?:\[n\](.+?)\[\/n\]\[a\](.+?)\[\/a\][ ]*,[ ]*)*\[n\](.+?)\[\/n\]\[a\](.+?)\[\/a\]$/.test(tabContent)) {
	                            window.alert(app.t('tabs[.]Wrong content for the dropdown') + tabName.replace('!dropdown!', '') + '.');
	                            return;
	                        }

	                        tabContent = tabContent.split(',').map(function (linkInfo) {
	                            linkInfo = linkInfo.trim().match(/^\[n\](.+?)\[\/n\]\[a\](.+?)\[\/a\]$/);

	                            return [linkInfo[1].trim(), linkInfo[2].trim()];
	                        });
	                    } else if (tabName.indexOf('!link!') === 0) {

	                    }

	                    tabsConfig.push([tabName, tabContent]);
	                });


	                $('#cs-motdtext').val(that.tabsConfigToHtml(that.$channelDescriptionInput.val(), tabsConfig));
	            }
	        });


	    this.$htmlToTabs = $('<button type="button" class="btn btn-sm btn-primary" id="tabs-settings-from-html">')
	        .text(app.t('tabs[.]Convert from the editor\'s code'))
	        .appendTo(this.$tabsSettings)
	        .on('click', function () {
	            if (window.confirm(app.t('tabs[.]Tabs settings will be replaced with the code from the editor, continue?'))) {
	                $(this).removeClass('btn-success');
	                that.tabsHtmlToCondig($('#cs-motdtext').val());
	            }
	        });


	    this.showMotdTab = function ($tabBtn) {
	        var $tabContent = $('#motd-tabs-content').find('[data-tab-index="' + $tabBtn.data('tabIndex') + '"]');

	        if ($tabBtn.hasClass('btn-default')) { //closed
	            $('.motd-tab-content').hide();
	            $tabContent.show();

	            $('.motd-tab-btn').removeClass('btn-success').addClass('btn-default');

	            $tabBtn.removeClass('btn-default');
	            $tabBtn.addClass('btn-success');
	        } else { //opened
	            $tabContent.hide();

	            $tabBtn.removeClass('btn-success');
	            $tabBtn.addClass('btn-default');
	        }
	    };
	    $(document.body).on('click', '#motd-tabs .motd-tab-btn', function () {
	        that.showMotdTab($(this));
	    });


	    this.motdHandleDropdown = function () {
	        $('.motd-tab-btn').removeClass('btn-success').addClass('btn-default');
	        $('.motd-tab-content').hide();
	    };
	    $(document.body).on('click', '#motd-tabs .dropdown-toggle', function () {
	        that.motdHandleDropdown();
	    });




	    this.tabsHtmlToCondig($('#cs-motdtext').val());

	    this.fixMotdCut();
	    window.socket.on('setMotd', function () {
	        that.fixMotdCut();
	    });


	    $(document).on('change keypress', '#tabs-settings-area input, #tabs-settings-area textarea', function () {
	        that.$tabsToHtml.addClass('btn-success');
	    });

	    $(document).on('change keypress', '#cs-motdtext', function () {
	        that.$htmlToTabs.addClass('btn-success');
	    });
	});
/***/

/*Moder's btns*/
/***/
kickbtn = $('<span id="kick-btn" class="label label-default pull-right pointer" title="Кикнуть анонимных пользователей">A</span>')
.appendTo("#chatheader")
.on("click", function(){socket.emit("chatMsg", {msg: '/kickanons'})})

asbtn = $('<span id="allowskip-btn" class="label label-default pull-right pointer"title="Разрешить/запретить пропуск видео">S</span>')
.appendTo("#chatheader")
.on("click", function () {$('#cs-allow_voteskip').click();})

if (!window.hasPermission("chatclear")) {
	        $('#kick-btn').hide();
	        $('#allowskip-btn').hide();
	    }

$('#pm-history-btn').html('<span title="История чата">H</span>');
/***/

/* Favourite pictures */
/***/
	window.cytubeEnhanced.addModule('favouritePictures', function (app) {
	    'use strict';
	    var that = this;

	    var favouritePicturesFromV1 = app.parseJSON(window.localStorage.getItem('favouritePictures'), []);
	    app.storage.setDefault('favouritePictures', _.isArray(favouritePicturesFromV1) ? favouritePicturesFromV1 : []);

	    if ($('#chat-panel').length === 0) {
	        $('<div id="chat-panel" class="row">').insertAfter("#messagebuffer");
	    }

	    if ($('#chat-controls').length === 0) {
	        $('<div id="chat-controls" class="btn-group">').appendTo("#chatwrap");
	    }


	    this.$toggleFavouritePicturesPanelBtn = $('<button id="favourite-pictures-btn" class="btn btn-sm btn-default" title="' + app.t('favPics[.]Show your favorite images') + '">')
	        .html('<i class="glyphicon glyphicon-th"></i>');
	    if ($('#smiles-btn').length !== 0) {
	        this.$toggleFavouritePicturesPanelBtn.insertAfter('#smiles-btn');
	    } else {
	        this.$toggleFavouritePicturesPanelBtn.prependTo('#chat-controls');
	    }





	    this.$favouritePicturesPanel = $('<div id="favourite-pictures-panel">')
	        .appendTo('#chat-panel')
	        .hide();
	    this.$favouritePicturesPanelRow = $('<div class="favourite-pictures-panel-row">')
	        .appendTo(this.$favouritePicturesPanel);


	    this.$favouritePicturesTrash = $('<div id="pictures-trash" title="' + app.t('favPics[.]Drop the picture here to remove it') + '">')
	        .append('<i class="pictures-trash-icon glyphicon glyphicon-trash">')
	        .appendTo(this.$favouritePicturesPanelRow);


	    this.$favouritePicturesBodyPanel = $('<div id="pictures-body-panel">')
	        .appendTo(this.$favouritePicturesPanelRow);



	    this.$favouritePicturesControlPanel = $('<div id="pictures-control-panel" class="row">')
	        .appendTo(this.$favouritePicturesPanel);

	    this.$favouritePicturesControlPanelForm = $('<div class="col-md-12">')
	        .html('<div class="input-group">' +
	            '<span class="input-group-btn">' +
	                '<button id="help-pictures-btn" class="btn btn-sm btn-default" style="border-radius:0;" type="button">?</button>' +
	            '</span>' +
	            '<span class="input-group-btn">' +
	                '<button id="export-pictures" class="btn btn-sm btn-default" style="border-radius:0;" type="button">' + app.t('favPics[.]Export pictures') + '</button>' +
	            '</span>' +
	             '<span class="input-group-btn">' +
	                '<label for="import-pictures" class="btn btn-sm btn-default" style="border-radius:0;">' + app.t('favPics[.]Import pictures') + '</label>' +
	                '<input type="file" style="display:none;" id="import-pictures" name="pictures-import">' +
	            '</span>' +
	            '<input type="text" id="picture-address" class="form-control input-sm" placeholder="' + app.t('favPics[.]Picture url') + '">' +
	            '<span class="input-group-btn">' +
	                '<button id="add-picture-btn" class="btn btn-sm btn-default" style="border-radius:0;" type="button">' + app.t('favPics[.]Add') + '</button>' +
	            '</span>' +
	        '</div>')
	        .appendTo(this.$favouritePicturesControlPanel);



	    this.makeSmilesAndPicturesTogether = function () {
	        that.smilesAndPicturesTogether = true;
	        that.$toggleFavouritePicturesPanelBtn.hide();
	        that.$favouritePicturesPanel.hide();
	    };



	    this.entityMap = {
	        "&": "&amp;",
	        "<": "&lt;",
	        ">": "&gt;",
	        '"': '&quot;',
	        "'": '&#39;'
	    };
	    this.replaceUnsafeSymbol = function (symbol) {
	        return that.entityMap[symbol];
	    };
	    this.renderFavouritePictures = function () {
	        var favouritePictures = app.storage.get('favouritePictures') || [];

	        this.$favouritePicturesBodyPanel.empty();

	        for (var n = 0, favouritePicturesLen = favouritePictures.length; n < favouritePicturesLen; n++) {
	            var escapedAddress = favouritePictures[n].replace(/[&<>"']/g, this.replaceUnsafeSymbol);

	            $('<img class="favourite-picture-on-panel">').attr({src: escapedAddress}).appendTo(this.$favouritePicturesBodyPanel);
	        }
	    };


	    this.insertFavouritePicture = function (address) {
	        app.Helpers.addMessageToChatInput(' ' + address + ' ', 'end');
	    };
	    $(document.body).on('click', '.favourite-picture-on-panel', function () {
	        that.insertFavouritePicture($(this).attr('src'));
	    });


	    this.handleFavouritePicturesPanel = function ($toggleFavouritePicturesPanelBtn) {
	        var smilesAndPicturesTogether = this.smilesAndPicturesTogether || false;

	        if ($('#smiles-panel').length !== 0 && !smilesAndPicturesTogether) {
	            $('#smiles-panel').hide();
	        }

	        this.$favouritePicturesPanel.toggle();


	        if (!smilesAndPicturesTogether) {
	            if ($toggleFavouritePicturesPanelBtn.hasClass('btn-default')) {
	                if ($('#smiles-btn').length !== 0 && $('#smiles-btn').hasClass('btn-success')) {
	                    $('#smiles-btn').removeClass('btn-success');
	                    $('#smiles-btn').addClass('btn-default');
	                }

	                $toggleFavouritePicturesPanelBtn.removeClass('btn-default');
	                $toggleFavouritePicturesPanelBtn.addClass('btn-success');
	            } else {
	                $toggleFavouritePicturesPanelBtn.removeClass('btn-success');
	                $toggleFavouritePicturesPanelBtn.addClass('btn-default');
	            }
	        }
	    };
	    this.$toggleFavouritePicturesPanelBtn.on('click', function() {
	        that.handleFavouritePicturesPanel($(this));
	    });


	    this.addFavouritePicture = function (imageUrl) {
	        imageUrl = _.trim(imageUrl);
	        if (imageUrl !== '') {
	            var favouritePictures = app.storage.get('favouritePictures') || [];

	            if (favouritePictures.indexOf(imageUrl) === -1) {
	                if (imageUrl !== '') {
	                    favouritePictures.push(imageUrl);
	                }
	            } else {
	                window.makeAlert(app.t('favPics[.]The image already exists')).prependTo(this.$favouritePicturesBodyPanel);
	                $('#picture-address').val('');

	                return false;
	            }
	            $('#picture-address').val('');

	            app.storage.set('favouritePictures', favouritePictures);

	            this.renderFavouritePictures();
	        }
	    };
	    $('#add-picture-btn').on('click', function (e) {
	        e.preventDefault();

	        that.addFavouritePicture($('#picture-address').val().trim());
	    });
	    $('#picture-address').on('keypress', function (e) {
	        if (e.which == 13) {
	            that.addFavouritePicture($('#picture-address').val().trim());
	        }
	    });


	    this.showHelp = function () {
	        var $header = $('<div class="modal-header__inner">');
	        $header.append($('<h3 class="modal-title">').text(app.t('Help')));

	        var $wrapper = $('<div class="help-pictures-content">');
	        $wrapper.append($('<p>' + app.t('favPics[.]<p>Favourite pictures feature if for saving favourite pictures like browser bookmarks.</p><p>Features:<ul><li><strong>Only links to images can be saved</strong>, so if image from link was removed, it also removes from your panel.</li><li>Images links are storing in browser. There are export and import buttons to share them between browsers.</li><li>Images are the same for site channels, but <strong>they are different for http:// and https://</strong></li></ul></p>') + '</p>'));


	        var $exitPicturesHelpBtn = $('<button type="button" id="help-pictures-exit-btn" class="btn btn-info" data-dismiss="modal">' + app.t('favPics[.]Exit') + '</button>');
	        var $footer = $('<div class="help-pictures-footer">');
	        $footer.append($exitPicturesHelpBtn);


	        return app.UI.createModalWindow('chat-history', $header, $wrapper, $footer);
	    };
	    $('#help-pictures-btn').on('click', function (e) {
	        e.preventDefault();

	        that.showHelp();
	    });


	    this.exportPictures = function () {
	        var $downloadLink = $('<a>')
	            .attr({
	                href: 'data:text/plain;charset=utf-8,' + encodeURIComponent(app.toJSON(app.storage.get('favouritePictures') || [])),
	                download: 'pururin_favourite_images.txt'
	            })
	            .hide()
	            .appendTo($(document.body));

	        $downloadLink[0].click();

	        $downloadLink.remove();
	    };
	    $('#export-pictures').on('click', function () {
	        that.exportPictures();
	    });


	    this.importPictures = function (importFile) {
	        var favouritePicturesAddressesReader = new FileReader();

	        favouritePicturesAddressesReader.addEventListener('load', function(e) {
	            var pictures = app.parseJSON(e.target.result);
	            if (_.isArray(pictures)) {
	                app.storage.set('favouritePictures', app.parseJSON(e.target.result));
	                that.renderFavouritePictures();
	            } else {
	                app.UI.createAlertWindow(app.t('favPics[.]Can\'t detect any pictures in this file.'));
	            }
	        });
	        favouritePicturesAddressesReader.readAsText(importFile);
	    };
	    $('#import-pictures').on('change', function () {
	        var file = $(this)[0].files[0];
	        app.UI.createConfirmWindow(app.t('favPics[.]Your old pictures will be removed and replaced with the images from uploaded file (file must correspond to format of the file from export button of this panel).<br>Are you sure you want to continue?'), function (isConfirmed) {
	            if (isConfirmed && file) {
	                that.importPictures(file);
	            }
	        });
	    });


	    this.renderFavouritePictures();



	    this.$favouritePicturesBodyPanel.sortable({
	        containment: this.$favouritePicturesPanelRow,
	        revert: true,
	        update: function(event, ui) {
	            var imageUrl = $(ui.item).attr('src');
	            var nextImageUrl = $(ui.item).next().attr('src');
	            var favouritePictures = app.storage.get('favouritePictures');

	            var imagePosition;
	            if ((imagePosition = favouritePictures.indexOf(imageUrl)) !== -1) {
	                favouritePictures.splice(imagePosition, 1);
	            } else {
	                return;
	            }

	            if (typeof nextImageUrl !== 'undefined') {
	                var nextImagePosition;
	                if ((nextImagePosition = favouritePictures.indexOf(nextImageUrl)) !== -1) {
	                    favouritePictures.splice(nextImagePosition, 0, imageUrl);
	                }
	            } else {
	                favouritePictures.push(imageUrl);
	            }

	            app.storage.set('favouritePictures', favouritePictures);
	        }
	    });


	    this.$favouritePicturesTrash.droppable({
	        accept: ".favourite-picture-on-panel",
	        hoverClass: "favourite-picture-drop-hover",
	        drop: function (event, ui) {
	            var imageUrl = ui.draggable.attr('src');
	            var favouritePictures = app.storage.get('favouritePictures');

	            var imagePosition;
	            if ((imagePosition = favouritePictures.indexOf(imageUrl)) !== -1) {
	                favouritePictures.splice(imagePosition, 1);
	                app.storage.set('favouritePictures', favouritePictures);
	            }

	            ui.draggable.remove();
	        }
	    });
	});
/***/

/* Smiles panel */ 

/***/ 
	window.cytubeEnhanced.addModule('smiles', function (app) {
	    'use strict';
	    var that = this;

	    $('#emotelistbtn').hide();
	    if ($('#chat-panel').length === 0) {
	        $('<div id="chat-panel" class="row">').insertAfter("#messagebuffer");
	    }
	    if ($('#chat-controls').length === 0) {
	        $('<div id="chat-controls" class="btn-group">').appendTo("#chatwrap");
	    }

	    this.$smilesBtn = $('<button id="smiles-btn" class="btn btn-sm btn-default" title="' + app.t('emotes[.]Show emotes') + '">')
	        .html('<i class="glyphicon glyphicon-picture"></i>')
	        .prependTo('#chat-controls');

	    this.$smilesPanel = $('<div id="smiles-panel">')
	        .prependTo('#chat-panel')
	        .hide();


	    this.renderSmiles = function () {
	        var smiles = window.CHANNEL.emotes;

	        for (var smileIndex = 0, smilesLen = smiles.length; smileIndex < smilesLen; smileIndex++) {
	            $('<img class="smile-on-panel">')
	                .attr({src: smiles[smileIndex].image})
	                .data('name', smiles[smileIndex].name)
	                .appendTo(this.$smilesPanel);
	        }
	    };


	    this.insertSmile = function (smileName) {
	        app.Helpers.addMessageToChatInput(' ' + smileName + ' ', 'end');
	    };
	    $(document.body).on('click', '.smile-on-panel', function () {
	        that.insertSmile($(this).data('name'));
	    });


	    $(window).on('resize', function () {
	        if (app.Helpers.getViewportSize().width < 0) {
	            that.$smilesPanel.empty();
	        }
	    });
	    this.showSmilesPanel = function () {
	        if (app.Helpers.getViewportSize().width < 0) {
	            that.$smilesPanel.empty();
	            $('#emotelistbtn').click();
	        } else {
	            if (that.$smilesPanel.html() === '') {
	                that.renderSmiles();
	            }

	            var smilesAndPicturesTogether = this.smilesAndPicturesTogether || false; //setted up by userConfig module

	            if ($('#favourite-pictures-panel').length !== 0 && !smilesAndPicturesTogether) {
	                $('#favourite-pictures-panel').hide();
	            }

	            that.$smilesPanel.toggle();

	            if (!smilesAndPicturesTogether) {
	                if (that.$smilesBtn.hasClass('btn-default')) {
	                    if ($('#favourite-pictures-btn').length !== 0 && $('#favourite-pictures-btn').hasClass('btn-success')) {
	                        $('#favourite-pictures-btn').removeClass('btn-success').addClass('btn-default');
	                    }

	                    that.$smilesBtn.removeClass('btn-default');
	                    that.$smilesBtn.addClass('btn-success');
	                } else {
	                    that.$smilesBtn.removeClass('btn-success');
	                    that.$smilesBtn.addClass('btn-default');
	                }
	            }
	        }
	    };
	    this.$smilesBtn.on('click', function() {
	        that.showSmilesPanel();
	    });


	    this.makeSmilesAndPicturesTogether = function () {
	        that.smilesAndPicturesTogether = true;
	        that.$smilesBtn.hide();
	        that.$smilesPanel.hide();
	    };
	});
$('#smiles-btn').html('<img src="http://i.imgur.com/DT3sXCp.png" style="width: 18px;height: 18px;"/>');



$("<style>")
    .attr("type","text/css")
    .appendTo("head")
    .text("\
\
#smiles-panel{overflow-y: hidden;}\
#chat-panel{background-color: rgba(0,0,0,0.9);margin-right: 5px;top: 28px;position: absolute;z-index: 5;right: 0% !important;max-height: 58% !important;max-width: 100%;background-position: center;overflow-y: auto;}\
#favourite-pictures-panel{overflow-x: hidden;}\
#favourite-pictures-panel, #smiles-panel {text-align: center;margin: 0;border: 0;background-color: transparent;}\
#pictures-trash {width: 30px;height: 30px;background: rgba(220,10,20,0.5);top: 8px;position: initial;z-index: 5;background-position: center;}\
#pictures-trash > i{display:none}\
\
");

/***/


/*chat avatars*/
/***/
	window.cytubeEnhanced.addModule('chatAvatars', function (app, settings) {
	    'use strict';
	    var that = this;

	    var tab = app.Settings.getTab('general', app.t('general[.]General'), 100);
	    var userSettings = app.Settings.storage;
	    var appSettings = app.storage;

	    var defaultSettings = {
	        avatarClass: 'chat-avatar',
	        smallAvatarClass: 'chat-avatar_small',
	        bigAvatarClass: 'chat-avatar_big'
	    };
	    settings = $.extend({}, defaultSettings, settings);

	    var namespace = 'avatars';
	    this.scheme = {
	        'avatars-mode': {
	            title: app.t('chatAvatars[.]Chat avatars'),
	            default: '',
	            options: [
	                {value: '', title: app.t('chatAvatars[.]Disabled')},
	                {value: 'small', title: app.t('chatAvatars[.]Small')},
	                {value: 'big', title: app.t('chatAvatars[.]Big')}
	            ]
	        }
	    };
	    appSettings.setDefault(namespace + '.cache', []);



	    this.cacheAvatar = function (username, avatar) {
	        var cachedAvatars = appSettings.get(namespace + '.cache');

	        if (cachedAvatars.length >= 50) {
	            cachedAvatars = cachedAvatars.slice(0, 49);
	        }

	        cachedAvatars.unshift({
	            username: username,
	            avatar: avatar
	        });

	        appSettings.set(namespace + '.cache', cachedAvatars);
	    };

	    this.getAvatarFromCache = function (username) {
	        var cachedAvatar = _.findLast(appSettings.get(namespace + '.cache'), function (o) { return o.username == username; });
	        cachedAvatar = cachedAvatar ? cachedAvatar.avatar : null;

	        return cachedAvatar;
	    };

	    this.getAvatarFromUserlist = function (username) {
	        return (window.findUserlistItem(username) && window.findUserlistItem(username).data('profile').image) ? window.findUserlistItem(username).data('profile').image : null;
	    };

	    this.applyAvatar = function ($usernameBlock, username, newAvatar) {
	        username = username || $usernameBlock.text().replace(/^\s+|[:]?\s+$/g, '');
	        newAvatar = newAvatar || that.getAvatarFromUserlist(username);
	        var cachedAvatar = that.getAvatarFromCache(username);
	        var $messageBlock = $usernameBlock.parent();

	        if (cachedAvatar || newAvatar) {
	            if (!cachedAvatar) {
	                that.cacheAvatar(username, newAvatar);
	            }

	            if ($messageBlock.find('.' + settings.avatarClass).length === 0) {
	                var $avatar = $("<img>").attr("src", newAvatar || cachedAvatar)
	                    .addClass(settings.avatarClass + ' ' + ((userSettings.get(namespace + '.avatars-mode') == 'big') ? settings.bigAvatarClass : settings.smallAvatarClass))
	                    .prependTo($messageBlock);

	                if (userSettings.get(namespace + '.avatars-mode') == 'big') {
	                    $(this).css('display', 'none');
	                    $avatar.attr('title', username);
	                }
	            }
	        }
	    };





	    /**
	     * Creating markup for settings
	     */
	    var schemeItem;
	    var option;
	    var sort = 100;
	    for (var itemName in this.scheme) {
	        schemeItem = this.scheme[itemName];

	        userSettings.setDefault(namespace + '.' + itemName, schemeItem.default);

	        if (userSettings.get(namespace + '.' + itemName)) {
	            for (option in schemeItem.options) {
	                schemeItem.options[option].selected = (userSettings.get(namespace + '.' + itemName) == schemeItem.options[option].value);
	            }
	        }

	        tab.addControl('select', 'horizontal', schemeItem.title, itemName, schemeItem.options, null, sort);
	        sort += 100;
	    }


	    /**
	     * Saving and applying settings
	     */
	    app.Settings.onSave(function (settings) {
	        for (var itemName in that.scheme) {
	            settings.set(namespace + '.' + itemName, $('#' + app.prefix + itemName).val());
	        }

	        if (settings.isDirty(namespace + '.avatars-mode')) {
	            app.Settings.requestPageReload();
	        }
	    });


	    /**
	     * Applying settings
	     */
	    if (userSettings.get(namespace  + '.avatars-mode')) {
	        window.formatChatMessage = (function (oldFormatChatMessage) {
	            return function (data, last) {
	                var $div = oldFormatChatMessage(data, last);

	                that.applyAvatar($div.find('.username'), data.username);

	                return $div;
	            };
	        })(window.formatChatMessage);

	        $('.username').each(function () {
	            that.applyAvatar($(this));
	        });


	        window.socket.on('addUser', function (data) {
	            if (data.profile && data.profile.image && data.name) {
	                $('.username:contains("' + data.name + ':")').each(function () {
	                    that.applyAvatar($(this), data.name, data.profile.image);
	                });
	            }
	        });
	    }
	});
/***/

var vhdn;
$('#hide-player-btn').remove();
hvideobtn = $('<span id="hvideo-btn" class="btn btn-sm btn-default"><i class="glyphicon glyphicon-ban-circle"></span>').insertAfter("#togglesynch").on("click", function() {
if (!$(this).hasClass('btn-success')) {
$(this).addClass('btn-success').html('<span><i class="glyphicon glyphicon-film"></i></span>');
vhdn = $('#videowrap').detach();$('#currenttitle').hide();
} else {
$(this).removeClass('btn-success').html('<span ><i class="glyphicon glyphicon-ban-circle">');
vhdn.appendTo('#main');$('#currenttitle').show();

$('#mediarefresh').click();
 
}
  });

var emotesbtnreplace;emotesbtnreplace = $('#smiles-btn').detach();emotesbtnreplace.insertBefore("#newpollbtn");
var picturesbtnreplace;picturesbtnreplace = $('#favourite-pictures-btn').detach();picturesbtnreplace.insertBefore("#newpollbtn");
var uploadbtnreplace;uploadbtnreplace = $('#uploadbtn').detach();uploadbtnreplace.insertBefore("#newpollbtn");
$('#radio-btn').insertAfter("#uploadbtn");
$('#chat-controls').remove();
$('#modflair').html('<span title="Цвет ника">M</span>');

var smphdn;
var leftpanreplace;
var smpreplace = $(window).width();
if (smpreplace < 992) {
smphdn = $('#leftcontrols').detach();
smphdn.appendTo("#chatwrap");
leftpanreplace = $('#leftpane-inner').detach();
leftpanreplace.insertAfter('#leftcontrols');
}


window.cytubeEnhanced.addModule('animeQuotes', function (app, settings) {
    'use strict';

    app.getModule('additionalChatCommands').done(function (chatCommands) {
        chatCommands.randomQuotes = chatCommands.randomQuotes.concat([
            'Жизнь не научит, если нет желания поумнеть.',
            'Я всегда ищу в людях только хорошее. Плохое они сами покажут.',
            'Не тот велик, кто никогда не падал, а тот велик — кто падал и вставал!',
            'По-настоящему силён лишь тот, кто знает свои слабости.',
            'Кто понял жизни смысл и толк, давно замкнулся и умолк.',
            'Каждый человек — кузнец своего счастья, причем голова служит ему то молотом, то наковальней.',
            'Успешные люди вырываются вперед, используя то время, которые остальные используют впустую.',
            'Идеальных людей не бывает, цените тех, кто смог полюбить ваши недостатки.',
            'Победа не важна, если она лишь твоя.',
            'Бедным быть не стыдно, стыдно быть дешёвым.',
            'Если ты хочешь построить корабль, не надо созывать людей, чтобы все спланировать, разделить работу, достать инструменты и рубить деревья, надо заразить их стремлением к бесконечному морю. Тогда они сами построят корабль.',
            'Я не могу примириться с мыслью, что жизнь проходит так быстро, а я не живу по-настоящему.',
            'Мой способ шутить это говорить правду. На свете нет ничего смешнее.',
            'Сознание того, что чудесное было рядом с нами, приходит слишком поздно.',
            'Одни люди смотрят на мир и спрашивают «почему?», в то время как другие смотрят и спрашивают «почему бы и нет?»',
            'Здорово!!!!Что в этой жизни нельзя купить: деньги, опыт и доброе имя, а лишь обменять-на собственный труд.Это уравнивает шансы.',
            'Мудрец должен искать не наслаждений, а отсутствия страданий.',
            'Пусть люди думают так, как им нравится. А ты иди по собственному пути.',
            'Люди всегда разрушают то, что любят больше всего.',
            'В этой жизни не важно, как ты падаешь. Важно, как ты поднимаешься.',
            'Ничто так не мешает роману, как чувство юмора у женщины и его отсутствие у мужчины.',
            'Ваши проблемы не от того, о чем вы не знаете. Они от того, в чем вы уверены, но просто заблуждаетесь.',
            'Спорить любят только неудачные и несчастливые люди. Счастливые живут молча.',
            'Юмор и любовь — два самых мощных болеутоляющих.',
            'Можно всю жизнь проклинать темноту, а можно зажечь маленькую свечку.',
            'Один, смотрит в лужу, и видит темную воду,а другой, отражающиеся в ней звезды.',
            'Нет ничего более ужасного, более унизительного, чем быть рабом раба.',
            'В сущности же на свете нет ничего устойчивого. Человек — это только волна. Человечество — это море.',
            'Иногда то, что мы знаем, бессильно перед тем, что мы чувствуем.',
            'Никогда не принимайте как должное, что люди смотрят вам в глаза, вы не понимаете, как вам повезло.',
            'Если кто-то хочет тебя сильно обидеть, значит ему еще хуже.',
            'Зрелость — это не годы, а состояние познания самого себя.',
            'Жизнь слишком коротка, чтобы пить плохие вина.',
            'Единственный тиран, которого я приемлю в этом мире, — тихий внутренний голос.',
            'Умейте прощать, ведь это свойство сильных. Слабые никогда не прощают.',
            'На свете не бывает ошибочных мнений. Бывают мнения, которые не совпадают с нашими, вот и все.',
            'Человек, одержимый новой идеей, успокоится, только осуществив ее.',
            '«Моё дело сказать правду, а не заставлять верить в неё».',
            'Циник — человек, знающий всему цену, но не знающий ценности.',
            'Всякая стадность — прибежище неодаренности.',
            'Все становится запутанным, когда начинаешь много об этом думать.',
            'Совсем не знак бездушья — молчаливость. Гремит лишь то, что пусто изнутри.',
            'Я пришел вам помочь, а вы жалуетесь, что я не хочу плакать с вами.',
            'Для того, чтобы жить счастливо и свободно, надо всего лишь принести в жертву скуку. Но эта жертва удается не всегда и не всем.',
            'Не тратьте даром время, беспокоясь о том, что думают другие. Важно то, что вы делаете и думаете.',
            'К сожалению, всё хорошее мы осознаём только с опозданием. Живём в тоске по прошлому и в страхе перед будущим. Где угодно, только не в настоящем.',
            '— Всё будет хорошо, — сказал я. Ох уж эта ложь, с которой мы засыпаем.',
            'Родиться дураком, не позор! А вот умереть дураком, стыдно!',
            'Важно не количество знаний, а качество их. Можно знать очень многое, не зная самого нужного.',
            'Как вода тянется к океану, так и фортуна тянется к тем, чей разум готов «притягивать» её.',
            'Всегда говори то, что чувствуешь и делай то, что думаешь! Молчание ломает судьбы.',
            'Существует лишь одна мудрость, и она имеет определенные границы, но глупостей существует тысячи, и все они беспредельны.',
            'Ирония делает человека глубже, масштабнее, открывает ему путь к спасению на более высоком уровне.',
            'Добродетель человека измеряется не необыкновенными подвигами, а его ежедневным усилием.',
            'Есть только две бесконечные вещи: Вселенная и глупость. Хотя насчет Вселенной я не вполне уверен.',
            'Злость-самая бесполезная из эмоций. Разрушает мозг и вредит сердцу.',
            'Если не можешь распилить цепи — плюй на них, может быть, проржавеют...',
            'Как заставить человека сказать правду? Разозлите его, в ярости у людей нет времени придумывать ложь.',
            'Рост мудрости можно точно измерять степенью уменьшение злобы.',
            'Тому, кто не хочет изменить свою жизнь, помочь невозможно.',
            'Если моё отсутствие ничего не меняет в вашей жизни, то моё присутствие в ней уже не имеет никакого значения.',
            'Дела шли хорошо, но неизвестно куда.',
            'Если вам ответили молчанием, это еще не значит, что вам не ответили.',
            'Время не лечит. Оно приводит к равнодушию. Оно убивает все то, что мы так любили.',
            'Если мужчина открывает перед женщиной дверцу машины — значит, либо женщина, либо машина у него — новая.',
            'Молодость даётся один раз, и глупо её тратить на одну лишь учёбу.',
            'Если вам хочется избавиться от какой-то мысли, запишите её.',
            'Никогда не рассказывайте о себе ни хорошего, ни плохого. В первом случае вам не поверят, а во втором — приукрасят.',
            'Время от времени следует говорить глупости, это способствует созданию теплой дружеской атмосферы.',
            'Положиться можно лишь на себя, а это довольно хреновый расклад, если ты человек ненадёжный.',
            'Люди - как музыкальные инструменты: их звучание зависит от того, кто к ним прикасается.',
            'Всякий уважающий себя шизофреник обязан время от времени обсуждать с собой, любимым, текущие проблемы',
            'Человек должен мечтать, чтобы видеть смысл жизни.',
            'Есть два способа жить: вы можете жить так, как будто чудес не бывает, и вы можете жить так, как будто все в этом мире является чудом.',
            'Если вдруг вы стали для кого-то плохим, значит много хорошего было сделано для этого человека.',
            'Ты должен верить в себя даже тогда, когда в тебе сомневается весь мир.',
            'Как хорошо быть одному. Но как хорошо, когда есть кто-то, кому можно рассказать, как хорошо быть одному.',
            'После отчаяния наступает покой, а от надежды сходят с ума.',
            'Бриллиант упавший в грязь, всё равно остаётся бриллиантом, а пыль поднявшаяся до небес, так и остаётся пылью.',
            'Поставьте точку после тех, кто уйдет, чтобы имя тех, кто придет, было с большой буквы.',
            'Но умному человеку иной раз приходится выпить, чтобы не так скучно было с дураками.',
            'Иногда хватает мгновения, чтобы забыть жизнь, а иногда не хватает жизни, чтобы забыть мгновение.',
            'Вера означает нежелание знать, что есть правда.',
            'Когда вы чего-то очень сильно хотите — в игру вступает Закон притяжения.'
        ]);
    });
});
