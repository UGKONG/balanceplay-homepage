var fileUpdateCnt = 0;
var loadFile = 0;
var closeProductNumber = 0;
var $thisUploadCheck = '', taxUse = '', CANCEL = false, ABORT = false;
var uadmin = '';
(function (jQuery) {
    jQuery.modalON = function (text,bgcolor) {
        var checkSetBgcolor = (typeof bgcolor != 'undefined' && bgcolor) ? true : false;

        bgcolor = (checkSetBgcolor) ? bgcolor : '#fff';
        var msg = (text) ? text : '';
        
        if ($('.ModalPlugin').length < 1) {
            $('body').prepend('<div class="ModalPlugin"><svg version="1.1" xmlns="http://www.w3.org/svg/2000" viewBox="0 0 30 30" width="60"><circle cy="15" cx="15" r="14" /></svg><p>' + msg + '</p></div>');
        }

        $('.ModalPlugin').css({
            "pointer-events":"none",
            "display": "inherit",
            "position": "fixed",
            "z-index": "99999999",
            "top": "0",
            "left": "0",
            "right": "0",
            "bottom": "0",
            "background": bgcolor,
            "width": "100%",
            "text-align": "center",
            "height": "100%"
        });
        if(!checkSetBgcolor) $('.ModalPlugin p').css('color','#3f3f3f');


        $('.ModalPlugin').show();
    }

    jQuery.modalOFF = function () {
        $('.ModalPlugin').remove();
    }

    jQuery.uploadON = function (text) {
        UPLOAD = 0;
        UPLOADED = 0;
        var msg = (text) ? text : 'Uploading images...';
        if ($('.uploadModal').length < 1) {
            $('body').prepend('<div class="uploadModal"></div>');
            $('.uploadModal').append('<button class="cl-mobile-btn upload-close close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><polygon points="16 1 15 0 8 7 1 0 0 1 7 8 0 15 1 16 8 9 15 16 16 15 9 8 "></polygon></svg></span></button>');
            $('.uploadModal').append('<div class="upload-wrap"></div>');
            $('.uploadModal .upload-wrap').append('<div class="upload-header"></div>');
            $('.uploadModal .upload-wrap').append('<div class="upload-content"></div>');

            $('.uploadModal .upload-header').append('<h1>' + $.lang[LANG]['editor.upload.title.1'] + '</h1>');
            $('.uploadModal .upload-header').append('<button type="" class="upload-close close"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8.71 8l7.15-7.15c0.2-0.2 0.2-0.51 0-0.71s-0.51-0.2-0.71 0L8 7.29 0.85 0.15c-0.2-0.2-0.51-0.2-0.71 0s-0.2 0.51 0 0.71L7.29 8l-7.15 7.15c-0.2 0.2-0.2 0.51 0 0.71C0.24 15.95 0.37 16 0.5 16s0.26-0.05 0.35-0.15L8 8.71l7.15 7.15c0.1 0.1 0.23 0.15 0.35 0.15s0.26-0.05 0.35-0.15c0.2-0.2 0.2-0.51 0-0.71L8.71 8z"></path></svg></span></button>');
            $('.uploadModal .upload-content').append('<div class="upload-cancel"><div class="btn btn-default">' + $.lang[LANG]['config.close'] + '</div></div>');
        }
        $('.uploadModal .upload-content').find('.file').remove();

        $progress = $('<div id="file-upload-progress" class="file-upload-progress"></div>');
        $bar = $('<div class="progress-bar"></div>');
        $progress.css({
            'height': '2px',
            'background-color':'#d1d3d5',
            'overflow' : 'hidden',
        });
        $progress.append($bar);
        if($('.uploadModal #file-upload-progress').length==0) {
            $('.uploadModal .upload-header').append($progress);
            $('.uploadModal .upload-header').append('<div class="info1"></div>');
            $('.uploadModal .upload-header').append('<div class="info2"></div>');
        }
        // $('.uploadModal').show();
    }

    jQuery.uploadOFF = function () {
        $('.uploadModal').fadeOut(500, function(){
            $(this).remove();
        });
    }

    jQuery.upload_add = function(e,data,upload_type) {
        $('.uploadModal').show();
        var submit = true, err = '';
        var filesize = data.files[0].size;
        if( filesize > 10485760) { //10MB == 10485760Byte
            filesize = (filesize/1024/1024).toFixed(1);
            err = $.lang[LANG]['editor.upload.max.1'] + $.lang[LANG]['editor.upload.max.2'];
            submit = false;
        }

        var filename = data.files[0].name;
        var search = /%/g,
            match = filename.match(search);

        if(match===null) {
            var uploadErrors = [];
            if(upload_type == 'flink') {
                var validFileAllTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/x-icon', 'image/gif', 'application/postscript', 'application/pdf', 'application/x-download', 'text/plain', 'text/rtf', 'application/vnd.ms-excel', 'application/msword', 'application/haansofthwp', 'application/x-hwp', 'application/octet-stream', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/powerpoint', 'application/mspowerpoint', 'application/x-mspowerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12', 'application/vnd.openxmlformats-officedocument.presentationml.slideshow', 'application/vnd.ms-powerpoint.presentation.macroEnabled.12', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-word.document.macroEnabled.12', 'application/vnd.openxmlformats-officedocument.presentationml.template', 'audio/mp3', 'audio/x-ms-wma', 'video/x-ms-asf', 'audio/mpg', 'audio/mpeg', 'audio/mpeg3', 'audio/x-mpeg', 'audio/wav', 'application/force-download', 'video/mp4', 'video/mpeg', 'video/x-msvideo', 'audio/x-wav', 'video/avi', 'video/x-ms-wmv', 'video/x-ms-asf', 'audio/x-ms-wma', 'video/ogg', 'audio/ogg', 'application/ogg', 'application/x-zip-compressed', 'application/x-7z-compressed', 'application/x-font-ttf', 'font/ttf', 'font/truetype', 'application/x-font-otf', 'application/otf', 'application/font-otf', 'application/x-font-truetype', 'application/x-font-opentype', 'font/otf', 'font/opentype', 'application/font-sfnt', 'application/vnd.ms-opentype'];
                // IE ERROR_includes__H.20210603
                // if(data.files[0]['type'] != '' && !validFileAllTypes.includes(data.files[0]['type'])) {
                if(data.files[0]['type'] != '' && $.inArray(data.files[0]['type'],validFileAllTypes) == -1) {
                    console.log(data.files[0]['name'] + ' => ' + data.files[0]['type']);
                    
                    err = $.lang[LANG]['editor.upload.error.flink'];
                    submit = false;
                }
            } else {
                var validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                // IE ERROR_includes__H.20210603
                // if(!validImageTypes.includes(data.files[0]['type'])) {
                if($.inArray(data.files[0]['type'],validImageTypes) == -1) {
                    err = $.lang[LANG]['editor.upload.error.ext'];
                    submit = false;
                }
            }

        } else {
            err = $.lang[LANG]['editor.upload.filename'];
            submit = false;
        }

        var fileSize = (data.files[0].size/1024/1024).toFixed(1) + 'MB';
        var tpl = '<div class="file">\
            <div class="progress"><div class="progress-bar"></div></div>\
            <div class="progress-info"><span class="file-name">' + data.files[0].name + '</span><span class="file-size">' + fileSize + '</span><span class="ing">' + $.lang[LANG]['editor.upload.response'] + '</span></div>\
            <div class="preview"></div>\
            </div>';
        data.context = $(tpl).insertBefore($('.uploadModal .upload-content .upload-cancel'));

        if(upload_type == 'all') {
            data.context.find('.preview').addClass('not_image');
        } else {
            if(data.files[0].type.match('image.*')) {
                if (data.files && data.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        // data.context.find('.preview').append('<img src="' + e.target.result + '">');
                        if(e.target.result != '') {
                            data.context.find('.preview').css('background-image', 'url(' + e.target.result + ')');
                        }
                        else {
                            data.context.find('.preview').addClass('no_preview');
                        }
                    }
                    reader.readAsDataURL(data.files[0]);
                }
            } else data.context.find('.preview').addClass('not_image');
        }

        return {
            submit : submit,
            err : err
        }
    }

    jQuery.upload_progress = function(e,data) {
        var rate = (data.bitrate/1024).toFixed(1) + 'kbps';
        var progress = parseInt((data.loaded / data.total) * 100, 10);
        if(typeof data.context != 'undefined') {
            data.context.find('.res').text(data.bitrate);
            data.context.find('.progress-bar').css('width',progress + '%');
            data.context.find('.ing').text(progress + '%');
            data.context.find('.rate').text(rate);
            if(progress == 100) {
                data.context.find('.ing').text($.lang[LANG]['editor.upload.response']);
            }
        }
    }

    jQuery.upload_done = function(e,data) {
        data.context.addClass('done');
        data.context.find('i').removeClass("fa-circle-o-notch fa-spin fa-3x fa-fw").addClass("fa-check");
        data.context.find('.ing').text($.lang[LANG]['editor.upload.done']);
        data.context.find('.rate').fadeOut();

        if(typeof data.result.error != 'undefined') {
            data.context.find('.loading').html('<i class="fa fa-times error"></i>');
            data.context.find('.ing').addClass('error').text(data.result.error);
        }
    }

    jQuery.upload_progressall = function(e,data) {
        var total = (data.total/1024/1024).toFixed(1) + 'MB';
        $('.uploadModal .info1').text($.lang[LANG]['editor.upload.size.total'] + total);
        $('.uploadModal .info2').html('<span>' + (UPLOADED+1) + '</span>/' + UPLOAD.toString());
        var progress = parseInt((data.loaded / data.total) * 100, 10);
        $('.file-upload-progress .progress-bar').css('width',progress + '%');
    }

    jQuery.upload_start = function(e,data) {
        $('.uploadModal .upload-header h1').text($.lang[LANG]['editor.upload.title.2']);
        $('.uploadModal .upload-content .upload-cancel .btn-default').text($.lang[LANG]['config.cancel']);
    }

    jQuery.progressON = function(text,sub,delay,cancel_off) {
        CANCEL = false;
        var msg = (typeof text !='undefined') ? text : $.lang[LANG]['editor.delete.title.2'];
        if ($('.progressModal').length < 1) {
            $('body').prepend('<div class="progressModal"></div>');
            $('.progressModal').append("<div class='progress-wrap'></div>");
            $('.progressModal .progress-wrap').append("<div class='progress-header'></div>");
            $('.progressModal .progress-wrap').append("<div class='progress-content'></div>");

            $('.progressModal .progress-header').append('<h1>' + msg + '</h1>');
            // $('.progressModal .progress-header').append('<div class="close"></div>');
            
            if(typeof cancel_off != 'undefined' && cancel_off === true) {
            } else {
                if(typeof delay == 'undefined') {
                    $('.progressModal .progress-content').append('<div class="progress-cancel"><div class="btn btn-default">' + $.lang[LANG]['config.cancel'] + '</div></div>');
                } else {
                    setTimeout(function() {
                        $('.progressModal .progress-content').append('<div class="progress-cancel"><div class="btn btn-default">' + $.lang[LANG]['config.cancel'] + '</div></div>');
                    },delay);
                }
            }
            $progress = $('<div id="file-upload-progress" class="file-upload-progress"></div>');
            $bar = $('<div class="progress-bar progress-bar-success"></div>');
            $progress.css({
                'height': '5px',
                'background-color':'#f5f5f5',
                'overflow' : 'hidden',
            });
            $progress.append($bar);
            $progress = $('<div id="file-upload-progress" class="file-upload-progress"></div>');
            $bar = $('<div class="progress-bar"></div>');
            $progress.css({
                'height': '2px',
                'background-color':'#f5f5f5',
                'overflow' : 'hidden',
            });
            $progress.append($bar);
            if($('.progressModal #file-upload-progress').length==0) {
                $('.progressModal .progress-header').append($progress);
                $('.progressModal .progress-header').append('<div class="info1"></div>');
                $('.progressModal .progress-header').append('<div class="info2"></div>');
                $('.progressModal .progress-header').append('<p>&nbsp;</p>');
            }            
        }
        if(typeof sub != 'undefined') {
            $('.progressModal .progress-header .info1').html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i> ' + sub);
        }

        $('body').addClass('overflow-hidden');

        $(document).on('click','.progress-cancel',function(e) {
            CANCEL = true; ABORT = true;
            $.progressOFF();
        });
        $('.progressModal').show();
    }

    jQuery.progressOFF = function() {
        $('body').removeClass('overflow-hidden');
        $('.progressModal').fadeOut().remove();
    }

    jQuery.processON = function(text,bg) {
        var msg = (text) ? text : '';
        bg = (bg) ? bg : 'rgba(0,0,0,0.75)';
        if ($('.processModal').length < 1) {
            if($('.reorderModal').length) {
                $('.reorderModal').after('<div class="processModal"><svg version="1.1" xmlns="http://www.w3.org/svg/2000" viewBox="0 0 30 30" width="60"><circle cy="15" cx="15" r="14" /></svg><p>' + msg + '</p></div>');
            } else {
                $('body').prepend('<div class="processModal"><svg version="1.1" xmlns="http://www.w3.org/svg/2000" viewBox="0 0 30 30" width="60"><circle cy="15" cx="15" r="14" /></svg><p>' + msg + '</p></div>');
            }
        } else {
            $('.processModal').find('p').html(text);
        }

        $('.processModal').css({
            'display': 'inherit',
            'position': 'fixed',
            'z-index': '9999999999',
            'top': '0',
            'left': '0',
            'width': '100%',
            'text-align': 'center',
            'height': '100%',
            'background-color' : bg
        });
        $('.processModal').fadeIn();
    }

    jQuery.processOFF = function() {
        $('.processModal').fadeOut().remove();
    }

    jQuery.loadingOn = function(selector) {
        selector.prepend('<div class="loadingModal"><svg class="spin_svg" version="1.1" xmlns="http://www.w3.org/svg/2000" viewBox="0 0 30 30" width="60"><circle cy="15" cx="15" r="14" /></svg><p></p></div>');
        $('.loadingModal').css({
            'display': 'inherit',
            'position': 'absolute',
            'z-index': '9999999999',
            'top': '0',
            'left': '0',
            'width': '100%',
            'text-align': 'center',
            'height': '100%',
            'background-color' : ''
        });
        $('.loadingModal').fadeIn();
    }

    jQuery.loadingOFF = function() {
        $('.loadingModal').fadeOut().remove();
    }

    jQuery.guideON = function(step) {
        hideElementListPanel();
        var $guide = $('<div class="guideModal"></div>');

        if ($('.guideModal').length < 1) {
            $('body').prepend($guide);
            $('.guideModal').append('<div class="content"></div>')
            $('.guideModal').css({
                'display': 'inherit',
                'position': 'fixed',
                'z-index': '99999999',
                'top': '0',
                'left': '0',
                'width': '100%',
                'text-align': 'center',
                'background-color' : 'transparent',
                'height': '100%',
            });
            $('.guideModal .content').css({
                'width' : '100%',
                'height' : '100%',
                'background-color' : 'rgba(0,0,0,0.6)',
                'margin-top' : '35px'
            });
            $('.guideModal').fadeIn();
        }

        $('.guideModal').find('.popover').fadeOut().remove();
        $('.menu-config.edit-menu').removeClass('active');
        $('.menu-config.edit-site').removeClass('active');
        $('.el_0_ctrl .config-element').css('z-index','4');
        $('.addElementButton').css('z-index','1');
        $('.config-image-edit').hide();
        $('.config-element').removeClass('disabled');
        $('.add-block').removeClass('disabled');

        switch(step) {
            case 1 : 
                $('.menu-config.edit-menu').addClass('active');
                var str = '\
                <div class="popover bottom">\
                    <div class="arrow"></div>\
                    <div class="popover-content" style="padding:15px 15px 10px;font-weight:600;">\
                        <p>' + $.lang[LANG]["editor.guide.steps.1"] + '</p>\
                    </div>\
                    <h3 style="padding:5px;overflow:auto;" class="popover-title" id="popover-bottom">\
                        <div class="pull-left"><span class="btn btn-default btn-sm" onclick="$.guideON();">' + $.lang[LANG]['config.close'] + '</span></div>\
                        <div class="pull-right"><span style="padding-right:5px;"> <b>1</b> / 7 </span><span class="btn btn-primary btn-sm" onclick="$.guideON(2);">' + $.lang[LANG]['editor.guide.next'] + '</span></div>\
                    </h3>\
                </div>\
                ';
                $step1 = $(str);
                $('.guideModal').find('.content').append($step1);
                $step1.css({
                    'top' : $('.editor-navbar').outerHeight()+2,
                    'left' : '0px'
                });

                $('.dsgn-body').scrollTop(0);
                $step1.fadeIn();
                break;

            case 2 :
                $('.menu-config.edit-site').addClass('active');
                var str = '\
                <div class="popover bottom">\
                    <div class="arrow"></div>\
                    <div class="popover-content" style="padding:15px 15px 10px;font-weight:600;">\
                        <p>' + $.lang[LANG]["editor.guide.steps.2"] + '</p>\
                    </div>\
                    <h3 style="padding:5px;overflow:auto;" class="popover-title" id="popover-bottom">\
                        <div class="pull-left"><button class="btn btn-default btn-sm" onclick="$.guideON()">' + $.lang[LANG]['config.close'] + '</button></div>\
                        <div class="pull-right"><span style="padding-right:5px;"> <b>2</b> / 7 </span><span class="btn btn-primary btn-sm" onclick="$.guideON(3);">' + $.lang[LANG]['editor.guide.next'] + '</span></div>\
                    </h3>\
                </div>\
                ';
                $step2 = $(str);
                $('.guideModal').find('.content').append($step2);
                $step2.css({
                    'top' : $('.editor-navbar').outerHeight()+2,
                    'left' : '268px'
                });
                $step2.fadeIn();
                break;

            case 3:
                $('.menu-config.edit-site').removeClass('active');
                $('.element').removeClass('active');
                if($('.el_0').length<1) {
                    $.guideON(13);
                    return false;
                }
                $('.el_0_ctrl').hide();
                $('.config-element-section').first().show().addClass('active');
                //$('.el_0_ctrl').show();

                var popover_direction = ($('header').hasClass('sidebar')) ? 'right' : 'left',
                    arrow_style = (popover_direction == 'right') ? 'style="left:-8px; margin-top: -8px; border-right: none;"' : '';
                var str = '\
                <div class="popover '+popover_direction+'">\
                    <div class="arrow" '+arrow_style+'></div>\
                    <div class="popover-content" style="padding:15px 15px 10px;font-weight:600;">\
                        <p>' + $.lang[LANG]["editor.guide.steps.3"] + '</p>\
                    </div>\
                    <h3 style="padding:5px;overflow:auto;" class="popover-title" id="popover-bottom">\
                        <div class="pull-left"><button class="btn btn-default btn-sm" onclick="$.guideON()">' + $.lang[LANG]['config.close'] + '</button></div>\
                        <div class="pull-right"><span style="padding-right:5px;"> <b>3</b> / 7 </span><span class="btn btn-primary btn-sm" onclick="$.guideON(4);">' + $.lang[LANG]['editor.guide.next'] + '</span></div>\
                    </h3>\
                </div>\
                ';
                $step3 = $(str);
                $('.guideModal').find('.content').append($step3);
                var right = ($('header').hasClass('sidebar')) ? 'inherit' : '80px',
                    left = ($('header').hasClass('sidebar')) ?  '270px' : 'inherit';
                $step3.css({
                    'left' : left,
                    'top'  : 0,
                    'right' : right
                });
                $step3.fadeIn();
                $('.el-menu_ctrl').show().css('z-index','99999999');
                addElementButtonDisplay('el_0');
                break;

            case 4:
                $('.el-menu_ctrl').hide();
                var winHeight = $('.dsgn-body').height(),
                    elOffsetTop = $('.addel_0').offset().top;

                var arrow = (winHeight>elOffsetTop) ? 'bottom' : 'top';
                $('.addElementButton').css('z-index','99999999');
                $('.add-block').removeClass('disabled').css('z-index','99999999');
                $('.addel_0 li .add-block').show().css('z-index','99999999');

                var str = '\
                <div class="popover ' + arrow + '">\
                    <div class="arrow"></div>\
                    <div class="popover-content" style="padding:15px 15px 10px;font-weight:600;">\
                        <p>' + $.lang[LANG]["editor.guide.steps.4"] + '</p>\
                    </div>\
                    <h3 style="padding:5px;overflow:auto;" class="popover-title" id="popover-bottom">\
                        <div class="pull-left"><button class="btn btn-default btn-sm" onclick="$.guideON()">' + $.lang[LANG]['config.close'] + '</button></div>\
                        <div class="pull-right"><span style="padding-right:5px;"> <b>4</b> / 7 </span><span class="btn btn-primary btn-sm" onclick="$.guideON(5);">' + $.lang[LANG]['editor.guide.next'] + '</span></div>\
                    </h3>\
                </div>\
                ';
                $step4 = $(str);
                $('.guideModal').find('.content').append($step4);

                var left = ($('.dsgn-body').width()/2) - ($step4.width()/2) - 10;
                if($('header').hasClass('sidebar')) left = left + 260;

                if(elOffsetTop>winHeight) {
                    $('.dsgn-body').animate({scrollTop:elOffsetTop-($('.dsgn-body').height()/2)},'500','swing', function() {
                        var top = $('.addel_0').offset().top - 150;
                        $step4.css({
                            'top' : top + 'px',
                            'left' : left + 'px'
                        });
                        $step4.fadeIn();
                    });
                } else {
                    if(winHeight/2 > elOffsetTop) {
                        $step4.removeClass(arrow).addClass('bottom');
                        var top = elOffsetTop + 40;
                        $step4.css({
                            'top' : top + 'px',
                            'left' : left + 'px'
                        });
                        $step4.fadeIn();
                    } else {
                        $step4.removeClass(arrow).addClass('top');
                        var top = elOffsetTop -150;
                        $step4.css({
                            'top' : top + 'px',
                            'left' : left + 'px'
                        });
                        $step4.fadeIn();
                    }
                }
                break;

            case 5: 
                showElList();

                var str = '\
                <div class="popover right">\
                    <div class="arrow" style="left:-8px; margin-top: -8px; border-right: none;"></div>\
                    <div class="popover-content" style="padding:15px 15px 10px;font-weight:600;">\
                        <p>' + $.lang[LANG]["editor.guide.steps.5"] + '</p>\
                    </div>\
                    <h3 style="padding:5px;overflow:auto;" class="popover-title" id="popover-bottom">\
                        <div class="pull-left"><button class="btn btn-default btn-sm" onclick="$.guideON()">' + $.lang[LANG]['config.close'] + '</button></div>\
                        <div class="pull-right"><span style="padding-right:5px;"> <b>5</b> / 7 </span><span class="btn btn-primary btn-sm" onclick="$.guideON(6);">' + $.lang[LANG]['editor.guide.next'] + '</span></div>\
                    </h3>\
                </div>\
                ';
                $step5 = $(str);
                $('.guideModal').find('.content').append($step5);
                var top = ($('.dsgn-body').height()/2) - ($step5.height()/2);
                $step5.css({
                    'top' : top + 'px',
                    'left' : '320px'
                });
                $step5.fadeIn(function() {
                    $('.guideModal .content').css('margin-left','315px');
                });
                break;

            case 6:
                $('.guideModal .content').css('margin-left','0px');
                hideElementListPanel();
                var str = '\
                <div class="popover bottom">\
                    <div class="arrow"></div>\
                    <div class="popover-content" style="padding:15px 15px 10px;font-weight:600;">\
                        <p>' + $.lang[LANG]["editor.guide.steps.6"] + '</p>\
                    </div>\
                    <h3 style="padding:5px;overflow:auto;" class="popover-title" id="popover-bottom">\
                        <div class="pull-left"><button class="btn btn-default btn-sm" onclick="$.guideON();">' + $.lang[LANG]['config.close'] + '</button></div>\
                        <div class="pull-right"><span style="padding-right:5px;"> <b>6</b> / 7 </span><span class="btn btn-primary btn-sm" onclick="$.guideON(7);">' + $.lang[LANG]['editor.guide.next'] + '</span></div>\
                    </h3>\
                </div>\
                ';
                $step6 = $(str);
                $('.guideModal').find('.content').append($step6);
                var left = $('#change-mode').offset().left - ($step6.width()/2) + ($('#change-mode').width()/2);
                $step6.css({
                    'top' : $('.editor-navbar').outerHeight()+2,
                    'left' : left + 'px'
                });
                $step6.fadeIn();

                break;

            case 7:
                $('.guideModal .content').css('margin-left','0px');
                hideElementListPanel();
                var str = '\
                <div class="popover bottom">\
                    <div class="arrow"></div>\
                    <div class="popover-content" style="padding:15px 15px 10px;font-weight:600;">\
                        <p>' + $.lang[LANG]["editor.guide.steps.7"] + '</p>\
                    </div>\
                    <h3 style="padding:5px;text-align:right;" class="popover-title" id="popover-bottom"><span style="padding-right:5px;"> <b>7</b> / 7 </span><span class="btn btn-primary btn-sm" onclick="$.guideON();">' + $.lang[LANG]['editor.guide.start'] + '</span></h3>\
                </div>\
                ';
                $step7 = $(str);
                $('.guideModal').find('.content').append($step7);
                var left = $('#config-publishing').offset().left - ($step7.width()/2) + ($('#config-publishing').width()/2);
                $step7.css({
                    'top' : $('.editor-navbar').outerHeight()+2,
                    'left' : left + 'px'
                });
                $step7.fadeIn();

                break;
            case 13:
                $('.el-menu').addClass('active');
                $('.config-element-section').hide();
                $('.el-menu_ctrl').show();

                var str = '\
                <div class="popover left">\
                    <div class="arrow"></div>\
                    <div class="popover-content" style="padding:15px 15px 10px;font-weight:600;">\
                        <p>메뉴변경, 이미지 업로드, 배경색, 여백 조절 등 블럭의 세부사항을 설정할 수 있습니다.</p>\
                    </div>\
                    <h3 style="padding:5px;overflow:auto;" class="popover-title" id="popover-bottom">\
                        <div class="pull-left"><button class="btn btn-default btn-sm" onclick="$.guideON()">' + $.lang[LANG]['config.close'] + '</button></div>\
                        <div class="pull-right"><span style="padding-right:5px;"> <b>3</b> / 7 </span><span class="btn btn-primary btn-sm" onclick="$.guideON(14);">' + $.lang[LANG]['editor.guide.next'] + '</span></div>\
                    </h3>\
                </div>\
                ';
                $step3 = $(str);
                $('.guideModal').find('.content').append($step3);
                var top = $('.el-menu_ctrl').offset().top - ($step3.height()/2)+27;
                $step3.css({
                    'top' : top + 'px',
                    'left' : 'inherit',
                    'right' : '80px'
                });
                $step3.fadeIn();
                $('.config-element').addClass('disabled');
                $('.el-menu_ctrl .config-element').css('z-index','99999999');
                //addElementButtonDisplay('el_0');

                break;

            case 14:
                $('.el-menu_ctrl .config-element').hide();
                var str = '\
                <div class="popover right">\
                    <div class="arrow"></div>\
                    <div class="popover-content" style="padding:15px 15px 10px;font-weight:600;">\
                        <p>현재 선택된 위치에 블럭을 추가하여 사이트를 만들 수 있습니다.</p>\
                    </div>\
                    <h3 style="padding:5px;overflow:auto;" class="popover-title" id="popover-bottom">\
                        <div class="pull-left"><button class="btn btn-default btn-sm" onclick="$.guideON()">' + $.lang[LANG]['config.close'] + '</button></div>\
                        <div class="pull-right"><span style="padding-right:5px;"> <b>4</b> / 7 </span><span class="btn btn-primary btn-sm" onclick="$.guideON(5);">' + $.lang[LANG]['editor.guide.next'] + '</span></div>\
                    </h3>\
                </div>\
                ';
                $step4 = $(str);
                var top = $('.addEL-wrap').offset().top + ($('.addEL-wrap').height()/2) - 90;
                $step4.css({
                    'top' : top + 'px',
                    'left': '50%',
                    'margin-left' : '100px'
                });
                $('.guideModal').find('.content').append($step4);
                $step4.fadeIn();
                break;
            default : 
                var settings = {
                    'showGuide' : 'none'
                };
                $.post('/template/settings',{ sid : SID, settings : JSON.stringify(settings), el : 'site_settings' }, function(data) {
                    checkError(data);
                },'json');

                $('.guideModal').find('.popover').fadeOut().remove();
                $('.menu-config.edit-menu').removeClass('active');
                $('.menu-config.edit-site').removeClass('active');
                $('.el_0_ctrl .config-element').css('z-index','4');
                $('.addElementButton').css('z-index','1').hide();
                $('.config-image-edit').hide();
                $('.config-element').removeClass('disabled');
                $('.add-block').removeClass('disabled');
                $('.config-element-section.active').removeClass('active').fadeOut();
                $('.guideModal').fadeOut().remove();
                //$.quickON(0);
                $.guideVideoON();
                break;
        }
    }

    jQuery.quickON = function(menu) {
        hideElementListPanel();
        var $quick = $('<div class="quickModal"></div>'),
            $content = $('<div class="content"></div>');

        if ($('.quickModal').length < 1) {
            $('body').prepend($quick);
            /*$content.on('click',function() {
                $.quickOFF();
            });*/
            $content.css({
                'width' : '100%',
                'height' : '100%',
                'background-color' : 'rgba(0,0,0,0.6)',
                'display' : 'none'
            });

            $quick.append($content);
            $quick.css({
                'display': 'inherit',
                'position': 'fixed',
                'z-index': '99999999',
                'top': '0',
                'left': '0',
                'width': '100%',
                'height': '100%',
                'text-align': 'center',
                'background-color' : 'transparent'
            });
            $quick.fadeIn();

            var hostAry = HOST.split('.');

            if (hostAry.length >= 3) {
                HOST = hostAry[1]+'.'+hostAry[2];
            }
            var supportUrl = (LANG == 'ko') ? 'https://supportcenter.creatorlink.net/creatorlink/' : 'https://supportcenter.creatorlink.net/creatorlink-support-center/';

            var $guide = $('<div class="guide">'),
                $close = $('<div class="close"><img src="https://storage.googleapis.com/i.addblock.net/fa-close-modal.png" alt="close" /></div>'),
                $header = $('<div class="header"><h2>' + $.lang[LANG]["editor.guide-title"] + '</h2></div>'),
                $linksWrap = $('<div class="links-wrap"></div>'),
                $mainguide = $('<span class="mainguide"><i class="fa fa-plus-circle"></i>' + $.lang[LANG]["editor.guide.walkthrough"] + '</sort-page-linen>'),
                $supportLink = $('</div><span class="support-link-wrap"><a class="support-link" href="' + supportUrl + '" target="_blank"><i class="fa fa-plus-circle"></i>' + $.lang[LANG]["editor.guide.support-center"] + '</a></span>'),
                $body = $('<div class="body"></div>'),
                $sidebar = $('<div class="sidebar"></div>'),
                nav = new Array( $.lang[LANG]["editor.guide.tutorial-video"], $.lang[LANG]["editor.menu-config"], $.lang[LANG]["editor.site-config"], $.lang[LANG]["config.element-config"], $.lang[LANG]["editor.guide.add-blocks"], $.lang[LANG]["editor.image.add-change"], $.lang[LANG]["editor.guide.edit-text"], $.lang[LANG]["editor.guide.gallery"], $.lang[LANG]["editor.guide.preview-publish"]),
                $nav = $('<ul class="nav"></ul>'),
                $bottom = $('<div class="bottom"></div>');

            $mainguide.on('click', function() {
                $.quickOFF();
                $.guideON(1);
            });

            $close.on('click',function() { $.quickOFF(); });

            // 임시 - 한국어 동영상이 완료될 때까지 만 
            if (LANG != 'en') {
               nav.shift();
            }

            $.each(nav, function(i,v){
                $li = $('<li class="'+i+'">'+v+'<img src="https://storage.googleapis.com/i.addblock.net/config/fa_thin_right_w.png" alt="" /></li>');
                $nav.append($li);
            });
            $navli = $nav.children();
            $navli.on('click',function() {
                var classtext = $(this).attr('class');
                $.quickON(Number(classtext.substring(0,1)));
            });
            $sidebar.append($nav).append($bottom);

            var $contentbox = $('<div class="contentbox"></div>');

            $body.append($sidebar).append($contentbox);
            $linksWrap.append($mainguide, $supportLink);
            $header.append($linksWrap);
            $guide.append($header).append($close).append($body);
            $content.append($guide);
            $content.fadeIn();

        }

        var $thisContent = $('.quickModal .contentbox'),
            $thisMenu = $('.quickModal .sidebar .nav li');
        $thisMenu.removeClass('active');
        $thisMenu.eq(menu).addClass('active');

        var lang;

        if (LANG == 'en') {
            lang = '_' + LANG;

            // 제임스: 임시로 여기로 옮겼음 (나중에 한 switch으로 할 예정)
            switch(menu) {
                case 0 :  /* 가이드 동영상 */

                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["editor.guide.tutorial-video"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.tutorial-video.text"] + '</p></li>\
                    </ul>\
                    ';

                    var $quickVideoWrap = $('<li></li>'),
                        $tutorialVideo = $('<div class="tutorial-video"></div>'),
                        $videoWrap = $('<div class="video-wrap guideVideo-stopPlay"><div id="quick-guide-video-overlay"></div></div>');

                    $menu0 = $(str);
                    $tutorialVideo.append( $videoWrap ); 
                    $quickVideoWrap.append( $tutorialVideo );
                    $menu0.append( $quickVideoWrap );

                    $thisContent.empty();
                    $thisContent.append($menu0);
                    $menu0.fadeIn();

                    $videoWrap.on('click', function() {

                        $(this).toggleClass('guideVideo-stopPlay');

                        if(!$(this).hasClass('guideVideo-stopPlay')) {
                            if ( LANG == 'en' )
                                var link = 'https://www.youtube.com/embed/p6fyIMl2BcI';

                            var html = '<iframe class="video embed-responsive-item" width="765" height="380" src="' + link + '?enablejsapi=1&rel=0&vq=large&wmode=opaque&showinfo=0&controls=1&autoplay=0&loop=0;playlist=Fn0Mpyh3xto;" frameborder="0" allowfullscreen></iframe>';
                            $(this).html(html);
                        }
                    });   

                    break;
                case 1 :  /*메뉴 설정*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["editor.menu-config"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.menu-config.text.1"] + '</p></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_0_1' + lang + '.png " alt="" /></li>\
                    </ul>\
                    ';
                    $menu1 = $(str);

                    $thisContent.empty();
                    $thisContent.append($menu1);
                    $menu1.fadeIn();
                    break;
                case 2 :  /*사이트 설정*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["editor.site-config"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.site-config.text.1"] + '</p></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_1_1' + lang + '.png" alt="" /></li>\
                    </ul>\
                    ';
                    $menu2 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu2);
                    $menu2.fadeIn();
                    break;
                case 3 :  /*블럭 설정*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["config.element-config"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.element-config.text.1"] + '</p></li>\
                        <li><h6><img src="https://storage.googleapis.com/i.addblock.net/config/fa_exclamation.png" alt="" class="fa"/> ' + $.lang[LANG]["editor.guide.element-config.text.note"] + '</h6></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_2_1' + lang + '.png" alt="" /></li>\
                    </ul>\
                    ';
                    $menu3 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu3);
                    $menu3.fadeIn();
                    break;
                case 4 :  /*블럭 추가*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["editor.guide.add-blocks"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.add-block.text.1"] + '</p></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_3_1' + lang + '.png" alt="" /></li>\
                    </ul>\
                    ';
                    $menu4 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu4);
                    $menu4.fadeIn();
                    break;
                case 5 :  /*이미지 추가/변경*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["editor.image.add-change"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.add-change-images.text.1"] + '</p></li>\
                        <li><h6><img src="https://storage.googleapis.com/i.addblock.net/config/fa_exclamation.png" alt="" class="fa"/>' + $.lang[LANG]["editor.guide.add-change-images.text.note"] + '</h6></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_4_1.png" alt="" /></li>\
                    </ul>\
                    ';
                    $menu5 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu5);
                    $menu5.fadeIn();
                    break;
                case 6 :  /*텍스트*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["config.text"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.edit-text.text.1"] + '</p></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_5_1' + lang + '.png" alt="" /></li>\
                    </ul>\
                    ';
                    $menu6 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu6);
                    $menu6.fadeIn();
                    break;
                case 7 :  /*갤러리*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["editor.block.gallery"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.gallery.text.1"] + '</p></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_6_1.png" alt="" /></li>\
                        <li><hr /></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.gallery.text.2"] + '</p></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_6_2' + lang + '.png" alt="" /></li>\
                        <li><h6><img src="https://storage.googleapis.com/i.addblock.net/config/fa_exclamation.png" alt="" class="fa"/> ' + $.lang[LANG]["editor.guide.gallery.text.note"] + '</h6></li>\
                    </ul>\
                    ';
                    $menu7 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu7);
                    $menu7.fadeIn();
                    break;
                case 8 :  /*저장/게시*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["editor.guide.preview-publish"] + '</h4></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_7_1' + lang + '.png" alt="" style="margin-top: 0"/></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.preview-publish.text.1"] + '</p></li>\
                        <li><h6><img src="https://storage.googleapis.com/i.addblock.net/config/fa_exclamation.png" alt="" class="fa"/> ' + $.lang[LANG]["editor.guide.preview-publish.text.note"] + '</h6></li>\
                    </ul>\
                    ';
                    $menu8 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu8);
                    $menu8.fadeIn();
                    break;
                default : 
                    $.quickOFF();
                    break;
            }
        }
        else {
            lang = '';

            // 제임스: 임시로 여기로 옮겼음 (나중에 한 switch으로 할 예정)
            switch(menu) {
                case 0 :  /*메뉴 설정*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["editor.menu-config"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.menu-config.text.1"] + '</p></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_0_1' + lang + '.png " alt="" /></li>\
                    </ul>\
                    ';
                    $menu0 = $(str);

                    $thisContent.empty();
                    $thisContent.append($menu0);
                    $menu0.fadeIn();
                    break;
                case 1 :  /*사이트 설정*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["editor.site-config"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.site-config.text.1"] + '</p></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_1_1' + lang + '.png" alt="" /></li>\
                    </ul>\
                    ';
                    $menu1 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu1);
                    $menu1.fadeIn();
                    break;
                case 2 :  /*블럭 설정*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["config.element-config"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.element-config.text.1"] + '</p></li>\
                        <li><h6><img src="https://storage.googleapis.com/i.addblock.net/config/fa_exclamation.png" alt="" class="fa"/> ' + $.lang[LANG]["editor.guide.element-config.text.note"] + '</h6></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_2_1' + lang + '.png" alt="" /></li>\
                    </ul>\
                    ';
                    $menu2 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu2);
                    $menu2.fadeIn();
                    break;
                case 3 :  /*블럭 추가*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["editor.guide.add-blocks"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.add-block.text.1"] + '</p></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_3_1' + lang + '.png" alt="" /></li>\
                    </ul>\
                    ';
                    $menu3 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu3);
                    $menu3.fadeIn();
                    break;
                case 4 :  /*이미지 추가/변경*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["editor.image.add-change"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.add-change-images.text.1"] + '</p></li>\
                        <li><h6><img src="https://storage.googleapis.com/i.addblock.net/config/fa_exclamation.png" alt="" class="fa"/>' + $.lang[LANG]["editor.guide.add-change-images.text.note"] + '</h6></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_4_1.png" alt="" /></li>\
                    </ul>\
                    ';
                    $menu4 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu4);
                    $menu4.fadeIn();
                    break;
                case 5 :  /*텍스트*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["config.text"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.edit-text.text.1"] + '</p></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_5_1' + lang + '.png" alt="" /></li>\
                    </ul>\
                    ';
                    $menu5 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu5);
                    $menu5.fadeIn();
                    break;
                case 6 :  /*갤러리*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["editor.block.gallery"] + '</h4></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.gallery.text.1"] + '</p></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_6_1.png" alt="" /></li>\
                        <li><hr /></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.gallery.text.2"] + '</p></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_6_2' + lang + '.png" alt="" /></li>\
                        <li><h6><img src="https://storage.googleapis.com/i.addblock.net/config/fa_exclamation.png" alt="" class="fa"/> ' + $.lang[LANG]["editor.guide.gallery.text.note"] + '</h6></li>\
                    </ul>\
                    ';
                    $menu6 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu6);
                    $menu6.fadeIn();
                    break;
                case 7 :  /*저장/게시*/
                    var str = '\
                    <ul>\
                        <li><h4>' + $.lang[LANG]["editor.guide.preview-publish"] + '</h4></li>\
                        <li><img src="https://storage.googleapis.com/i.addblock.net/config/quickguid_7_1' + lang + '.png" alt="" style="margin-top: 0"/></li>\
                        <li><p>' + $.lang[LANG]["editor.guide.preview-publish.text.1"] + '</p></li>\
                        <li><h6><img src="https://storage.googleapis.com/i.addblock.net/config/fa_exclamation.png" alt="" class="fa"/> ' + $.lang[LANG]["editor.guide.preview-publish.text.note"] + '</h6></li>\
                    </ul>\
                    ';
                    $menu7 = $(str);
                    $thisContent.empty();
                    $thisContent.append($menu7);
                    $menu7.fadeIn();
                    break;
                default : 
                    $.quickOFF();
                    break;
            }
        }

    }

    jQuery.quickOFF = function() {
        $('.quickModal').fadeOut(function() {
            $(this).remove();  
        });
    }

    jQuery.reorderON = function(pageMenuStr) {
        $.processON('Loading blocks ...');
        if(pageMenuStr == 'index') pageMenuStr = '';
        if(prevPAGE == 'index') prevPAGE = '';
        if(prevONE) prevPAGE = ORG_PAGES[selectID];
        window.currentPageMenu = pageMenuStr ? pageMenuStr.toString() : prevPAGE;
        window.currentPageMenuIdx = -1;
        window.copy_menu_list = MENULIST;
        // if(copy_menu_list[0] == 'INTRO') copy_menu_list.splice(0, 1);

        var enable = true;
        if(!window.basketBlockHtml)
            window.basketBlockHtml = '';

        if(!window.pageListChangeFlag) window.pageListChangeFlag = [];

        if($('.ctrl-reorder').hasClass('disabled')) return;
        
        // var el = [], idx = 0;
        // var toolbar = ($('.editor-navbar').css('display')=='none') ? 0 : 35;
        // var sidebar = ($('header').hasClass('sidebar')) ? true : false;
        var el_fixed = (reorderFIXED) ? reorderFIXED.split(':') : [];

        // $.each($('.element'),function(i,v) {
        //     if( $(v).data('el') == 'el-menu' || 
        //         $(v).data('el') == 'el-footer' || 
        //         $(v).hasClass('add-footer-information') ||
        //         $(v).hasClass('cl-s-product-review') ||
        //         $(v).hasClass('cl-s-product-qna')
        //     ) return true;

        //     if(reorderFIXED) {
        //         if($(v).hasClass('el-fixedblock')) {
        //             if($(v).attr('data-posby') != el_fixed[2]) return true;
        //         } else return true;
        //     } else {
        //         if($(v).hasClass('el-fixedblock')) return true;
        //     }

        //     el[idx] = $(v).attr('data-el') + '|' + ($(v).offset().top - toolbar) + '-' + $(v).outerHeight();    
        //     idx++;
        // });
        // eloffSet = el.toString();

        var $reorder = $('<div class="reorderModal"></div>');
        if($('.reorderModal').length < 1) {
            $('body').prepend($reorder);
            $reorder.css({
                'position' : 'fixed',
                'width' : '100%',
                'height' : '100%',
                'background' : '#eef0f4',
                'z-index' : '99999',
                'display' : 'none',
                'overflow' : 'auto'
            });
        } else {
            // $('.reorderModal').empty();
            $reorder = $(".reorderModal");
        }
                           //<div class="scale" style="margin-top: 0; height: 100%; width: calc(388px * 5); margin-left: calc((-388px * 5) /2 + 50%); ">\
        var reorder_title = (reorderFIXED) ? $.lang[LANG]['editor.reorder-blocks.title.'+el_fixed[2]] : $.lang[LANG]['editor.reorder-blocks.title'],
        $content = $('<div class="content" style="display: flex;"></div>'),
        $left_area = $('<div class="left-area ' + (VIEW ? ' view-exist ' : '')  + '" style="flex: 1 1 40%; max-width: calc(48% - 155px);">\
                            <div style="display: flex; -webkit-box-pack: end; -ms-flex-pack: end; justify-content: flex-end;">\
                                <div class="" style="max-width: 330px; height: 100%; background-color: #fff; position: fixed; width: calc(48% - 155px);">\
                                    <div class="" style="text-align: center; padding-top: 30px; padding-bottom: 53px;"><h4 style="margin-top: 10px;">' + $.lang[LANG]['config.blockmove.moveblock'] + '</h4></div>\
                                    <div class="scale" style="margin-top: 0; width: calc(100% / 0.166); height: calc(100% / 0.166 - (124px / 0.166)) !important; overflow-y: auto; overflow-x: hidden; transform: scale(.166);">\
                                        <div class="el-sortable">\
                                            <div class="sort-empty guide-text">' + $.lang[LANG]['config.blockmove.movehere'] + '</div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>'),
        $center_area = $('<div class="center-area ' + (VIEW ? ' view-exist ' : '') + ' " style="flex: 1 1 40%; max-width: calc(47% - 155px);"><div class="block-area" style="max-width: 400px; margin: 0 auto;"><div class="page-list-area"><div class="btn-group"></div></div></div></div>'),
        $right_area = $('<div class="right-area" style="flex: 1 1 30%; padding: 30px 40px 0 0; position: fixed; right: 0; z-index: 4;"></div>'),
        // $scale = $('<div class="scale" style="width: calc(388px * 5); margin-left: calc((-388px * 5) /2 + 50%);"></div>');
        $scale = $('<div class="scale" style="width: 500%;"></div>'),
        $save = $('<span class="btn btn-primary btn-flat btn-sm pull-right">' + $.lang[LANG]['config.save'] + '</span>'),
        $close = $('<span class="btn btn-default btn-flat btn-sm pull-right">' + $.lang[LANG]['config.cancel'] + '</span>').css('margin-right','10px');

        $close.on('click',function() {
            if(!VIEW && (prevPAGE || PAGE)) {
                var refer = prevPAGE ? prevPAGE.replace(',','/view/') : PAGE.replace(',','/view/');
                location.replace('/'+CONFIG_URL+'config/page/' + refer);
            } else {
                location.reload();
            }
            $.reorderOFF();
        });

        $save.on('click',function() {
            if(basketBlockHtml != '') {
                alert($.lang[LANG]['config.blockmove.blockleft']);
                return false;
            }
            $.processON($.lang[LANG]['config.reorder.loading']);

            // var rPage = '';
            // $.each($('.el-sortable').children(), function(i,v) {
            //     var page_name = $(v).attr('data-result-page');
            //     if(typeof page_name !='undefined' && page_name && $(v).hasClass('sort-empty')) {
            //         rPage = $(v).attr('data-result-page');
            //         return true;
            //     }

            //     $(v).attr('data-reorder-page',rPage);
            // });
            var r = [];
            // $.each($('.center-area .reorderBlock'), function(i,v) {
            //     tmp = $(this).attr('data-reorder-page') + ':' + $(this).attr('data-id');
            //     if(reorderFIXED) tmp += ':' + el_fixed[2];
            //     r.push(tmp);
            // });
        
            $(pageList).each(function(idx) {
                var loopPage = this;
                if(typeof pageList[idx] == 'undefined') return true;
                $(loopPage).each(function() {
                    if(!VIEW) {
                        var tmp = window.copy_menu_list[idx] + ':' + this;
                    } else {
                        var tmp = currentPageMenu + ':' + this;
                    }
                    if(reorderFIXED) tmp += ':' + el_fixed[2];
                    r.push(tmp);
                });
            });

            var view_page = (reorderFIXED) ? el_fixed[1] : currentPageMenu;
            $.ajax({
                type: 'POST',
                url: '/template/update/type/block-reorder',
                data: { s: JSON.stringify(r), id: SID, page: view_page, onepage : ONE},
                async:true,
                cache: false,
                success: function (data) {
                    var type = getElementType();
                    setLogs(type,'block.reorder','block-sort','');
                    $('.element').removeClass('active').removeClass('el-active');
                    $('#el-property').hide();

                    if(!VIEW && (prevPAGE || PAGE)) {
                        var refer = prevPAGE ? prevPAGE.replace(',','/view/') : PAGE.replace(',','/view/');
                        location.replace('/'+CONFIG_URL+'config/page/' + refer);
                    } else {
                        location.reload();
                    }
                    $.processOFF();
                    $.reorderOFF();
                    checkError(data);
                }
            });
            /*
            var ids = [];
            $.each($('.render'), function(i,v) {
                if(typeof $(v).attr('data-id') != 'undefined') ids.push($(v).attr('data-id').trim());
            });

            $.post('/template/update/type/block-reorder',{ id : SID, page : PAGE, s:ids.join(',')}, function(data) {
                checkError(data);
            },'json');
            return false;
            */
        });

        $content.append($left_area);

        if(window.basketBlockHtml && window.basketBlockHtml != '') {
            $left_area.find(".el-sortable").append(window.basketBlockHtml);
            $left_area.find(".sort-empty").hide();
            $left_area.find(".reorderBlock").removeClass("active");
        }

        $right_area.append($save);
        $right_area.append($close);
        $content.append($center_area);
        $content.append($right_area);
        $center_area.find(".block-area").append($scale);
        $reorder.html($content);

        var $sort = $('<div class="el-sortable"></div>');
        $sort.css('color',$('.dsgn-body').css('color'));

        if(!$(".new-dsgn-body").length) {
            var temp_dsgn_body = $("<div class='new-dsgn-body'><div class='elements'></div></div>");
            $("body").append(temp_dsgn_body);
        } else {
            var temp_dsgn_body = $(".reorderModal .new-dsgn-body");
            // temp_dsgn_body.empty();
        }
        

        $reorder.fadeIn();

        //var $scale = $('<div class="scale"></div>');
        //$scale.css('color',$('.dsgn-body').css('color'));


        var elIndex = 0;

        window.pageMenu = [];
        // if(PAGE == 'index') {
        //     $.each(MENULINK,function(i,v) {
        //     //$.each(SMENU,function(i,v) {
        //         pageMenu.push(v.replace(/ /g,'-'));
        //         //if(v.display == 'on') pageMenu.push(v.name);
        //     });
        // } else {
        var view_page = (reorderFIXED) ? el_fixed[1] : PAGE;
        pageMenu.push(view_page);
        // }

        var pageMenuSelect = '';

        if(!VIEW) {
            if(!window.currentPageMenu || window.currentPageMenu == '') window.currentPageMenu = copy_menu_list[0];

            pageMenuSelect += '\
                <button type="button" class="btn btn-sm fsm dropdown-toggle" data-toggle="dropdown">\
                    <span>' + currentPageMenu + '</span> ' + ($("#nestable").find("[data-id='" + currentPageMenu + "']").children(".menu-ctrl").find(".menu-visible").hasClass('invisible') ? ' <svg viewBox="0 0 14 12" width="14" height="14"><path d="M12.29 0l-1.88 1.88C9.39 1.32 8.23 1 7 1 3.83 1 1.12 3.07 0 6c0.56 1.46 1.53 2.68 2.73 3.56L1 11.29 1.71 12 13 0.71 12.29 0zM1.09 6C2.15 3.64 4.4 2 7 2c0.95 0 1.86 0.23 2.67 0.62L8.73 3.56C8.24 3.21 7.65 3 7 3 5.34 3 4 4.34 4 6c0 0.65 0.21 1.24 0.56 1.73L3.44 8.85C2.44 8.15 1.62 7.17 1.09 6zM5 6c0-1.1 0.9-2 2-2 0.37 0 0.71 0.11 1.01 0.28L5.28 7.01C5.11 6.71 5 6.37 5 6z"></path><path d="M12.05 3.06l-0.71 0.71C11.99 4.4 12.53 5.15 12.91 6c-1.05 2.36-3.3 4-5.91 4 -0.57 0-1.12-0.09-1.65-0.24l-0.8 0.8C5.32 10.84 6.14 11 7 11c3.17 0 5.88-2.07 7-5C13.57 4.87 12.89 3.87 12.05 3.06z"></path></svg> ' : '') + ' <span class="caret"></span>\
                </button>\
                <ul class="dropdown-menu" role="menu">\
            ';
            $(copy_menu_list).each(function(idx) {
                var active_cls = '';
                var depth_cls = '';
                var visible_cls = '';
                var visible_svg = '';

                var menu_str = this;
                if(menu_str == '전체상품') return true;
                if(currentPageMenu == this) {
                    currentPageMenuIdx = idx;
                    active_cls = ' active ';
                }

                $("#nestable").find(".dd-first, .dd-item:not(.dd-dummy)").each(function () {
                    var dd_item_id = $(this).attr("data-id");
                    if(!dd_item_id) return true;
                    
                    dd_item_id = dd_item_id.replace(/ /g, '-');
                    if(dd_item_id == menu_str) {
                        if($(this).parents(".dd-item").length) {
                            depth_cls = ' indent ';
                        }        

                        if($(this).children(".menu-ctrl").find(".menu-visible").hasClass("invisible")) {
                            visible_cls = ' visibleoff ';
                            visible_svg = ' <svg viewBox="0 0 14 12" width="14" height="14"><path d="M12.29 0l-1.88 1.88C9.39 1.32 8.23 1 7 1 3.83 1 1.12 3.07 0 6c0.56 1.46 1.53 2.68 2.73 3.56L1 11.29 1.71 12 13 0.71 12.29 0zM1.09 6C2.15 3.64 4.4 2 7 2c0.95 0 1.86 0.23 2.67 0.62L8.73 3.56C8.24 3.21 7.65 3 7 3 5.34 3 4 4.34 4 6c0 0.65 0.21 1.24 0.56 1.73L3.44 8.85C2.44 8.15 1.62 7.17 1.09 6zM5 6c0-1.1 0.9-2 2-2 0.37 0 0.71 0.11 1.01 0.28L5.28 7.01C5.11 6.71 5 6.37 5 6z"></path><path d="M12.05 3.06l-0.71 0.71C11.99 4.4 12.53 5.15 12.91 6c-1.05 2.36-3.3 4-5.91 4 -0.57 0-1.12-0.09-1.65-0.24l-0.8 0.8C5.32 10.84 6.14 11 7 11c3.17 0 5.88-2.07 7-5C13.57 4.87 12.89 3.87 12.05 3.06z"></path></svg> ';
                        }
                    }
                });

                

                // pageMenuSelect += '<option value="' + this + '" ' + (currentPageMenu == this ? ' selected ' : '') + '>' + this + '</option>';
                pageMenuSelect += '<li class="gallery-name ' + active_cls + depth_cls + visible_cls +' " data-page="' + menu_str + '">' + '<span>' + menu_str + '</span>' +  visible_svg + '</li>';
            });
            pageMenuSelect += '</ul>';
            $center_area.find(".page-list-area .btn-group").append(pageMenuSelect);
        } else {
            currentPageMenuIdx = 0;
        }

        if(reorderFIXED) {
            if(el_fixed[2] == 't') {
                $center_area.find(".page-list-area .btn-group").html('<h4>' + $.lang[LANG]['config.blockmove.fixedtopblock'] + '</h4><span class="sub">' + $.lang[LANG]['config.blockmove.dragblock'] + '</span>');
            } else if(el_fixed[2] == 'b') {
                $center_area.find(".page-list-area .btn-group").html('<h4>' + $.lang[LANG]['config.blockmove.fixedbottomblock'] + '</h4><span class="sub">' + $.lang[LANG]['config.blockmove.dragblock'] + '</span>');
            }
        } else if(VIEW) {
            $center_area.find(".page-list-area .btn-group").html('<h4>' + $.lang[LANG]['config.blockmove.title'] + '</h4><span class="sub">' + $.lang[LANG]['config.blockmove.dragblock'] + '</span>');
        }

        setTimeout(function() {

            if(typeof pageList[currentPageMenuIdx] == 'undefined' || typeof pageListChangeFlag[currentPageMenuIdx] == 'undefined') {
                $(".new-dsgn-body .contents[data-page='" + currentPageMenu + "']").remove();
                var pageIndex = 0;
                PAGE = currentPageMenu.toString();
                var dsgn_body_clone = $(".dsgn-body").clone().empty().addClass("contents");
                $(".dsgn-body").removeClass("dsgn-body").addClass("prev-dsgn-body");
                $(".new-dsgn-body .elements").append(dsgn_body_clone);
                showPageCallback(showPage);
                $(".new-dsgn-body .contents.dsgn-body").removeClass("dsgn-body").attr("data-page", currentPageMenu);
                $(".prev-dsgn-body").removeClass("prev-dsgn-body").addClass("dsgn-body");
                PAGE = prevPAGE ? prevPAGE.toString() : '';

                pageList[currentPageMenuIdx] = [];
                $.each($('.new-dsgn-body .contents[data-page="' + currentPageMenu + '"] .element'),function(i,v) {
                    if( $(v).hasClass('el-menu') || 
                        $(v).hasClass('el-footer') || 
                        $(v).hasClass('add-footer-information') ||
                        $(v).hasClass('cl-s-product-review') ||
                        $(v).hasClass('cl-s-product-qna') || 
                        $(v).hasClass('cl-s-product-info-notice')
                    ) {
                        return true;
                    }

                    if(reorderFIXED) {
                        if($(v).hasClass('el-fixedblock')) {
                            if($(v).attr('data-posby') != el_fixed[2]) return true;
                        } else return true;
                    } else {
                        if($(v).hasClass('el-fixedblock')) return true;
                    }
                    
                    if ($(v).hasClass('addEL-wrap')) {
                        return true;
                    } 
                    
                    pageList[currentPageMenuIdx][pageIndex] = $(v).data("id");

                    $(v).find('.hideBlockWrap .blockOn').hide();
                    if($(v).find('.hideBlockWrap').length > 0) $(v).addClass('block_checkOnOff');
                    pageIndex++;
                });
                pageListChangeFlag[currentPageMenuIdx] = true;
            }

            PAGE = prevPAGE ? prevPAGE.toString() : '';

            var $empty = $('<div class="render sort-empty" data-result-page="' + currentPageMenu + '">&nbsp;</div>'),
                $pageLine = $('<div class="sort-page-line"></div>'),
                pageName = currentPageMenu.replace(/,/,'/'),
                menulist_index = $.inArray(pageName,MENULIST),
                pageNameOrg = pageName=='INTRO' ? pageName : $('#nestable').find('.dd-item').eq(menulist_index-1).attr('data-id'),
                $pageInfo = $('<div class="sort-page-info">' + pageNameOrg + '</div>'),
                isLink = pageName=='INTRO' || menulist_index == -1 ? false : $('#nestable').find('.dd-item').eq(menulist_index-1).find('.menu-link').first().hasClass('active');
                
            if(pageName.indexOf('/')>-1 || reorderFIXED) $pageInfo.addClass('hide');

            // $empty.append($pageLine);
            // $empty.append($pageInfo);

            $empty = (isLink) ? $empty.addClass('use-link') : $empty;
                // if(!isLink) $sort.append($empty);

            $(pageList[currentPageMenuIdx]).each(function(i,v) {
                var $el = $('.new-dsgn-body .element[data-id="'+v + '"]').clone();
                var isLink = $('#nestable .dd-item[data-id="'+pageNameOrg+'"] > span > .menu-link').hasClass('active');
                if($el.attr('data-parallax')=='true') {
                    $el.css('background-attachment','inherit');
                }

                $el.removeClass('element')
                    .removeClass('el-active')
                    .removeClass('active')
                    .removeClass('emptyGallery')
                    .removeClass('el-fixedblock')
                    .removeAttr('data-parallax')
                    .addClass('render')
                    .addClass('reorderBlock')
                    .attr('data-reorder-page',currentPageMenu);

                if(elIndex==0) {
                    $el.css('margin','0px');
                    if(VIEW && ($el.attr('data-type')=='project' || $el.attr('data-type')=='product')) return true;//$el.addClass('unsort').hide();
                }
                if($el.attr('data-msny')=='true' && $el.find('.container').hasClass('full-width')) {
                    $el.css('padding-left',$('header.sidebar').width()+'px');
                }

                if($('.new-dsgn-body .element[data-id="'+v + '"]').css('background-color')=='rgba(0, 0, 0, 0)' || $('.new-dsgn-body .element[data-id="'+v + '"]').css('background-color')=='transparent') {
                    $el.css('background-color', '#fff');
                }

                $el.find('[data-edit="true"]').removeAttr('data-edit');
                $el.css('position','relative');
                $el.css('min-height','0px');
                $el.css('margin-bottom','120px');
                
                if(!isLink) $sort.append($el);
                elIndex++;

            });
            var $last = $('<div class="sort-empty guide-text" style="display: none;">' + $.lang[LANG]['config.blockmove.movehere'] + '</div>');
            if(pageList[currentPageMenuIdx].length == 0 || typeof pageList[currentPageMenuIdx] == 'undefined') $last.show();
            $sort.append($last);
            $scale.append($sort);

            $scale.css('height', 'auto');

            var target_contents = $('.new-dsgn-body .elements .contents[data-page="' + currentPageMenu + '"]');
            var setting_height = target_contents.height() / 5 + $(".page-list-area").outerHeight() + 120;

            $scale.height(setting_height);
            $center_area.height(setting_height);

            $center_area.find(".reorderBlock[data-msny='true']").each(function() {
                var cnt = 0;
                var total = $(this).find(".row").data("view");
                var target = this;
                $(target).imagesLoaded().progress(function(imgload, image) {
                    cnt ++;
                    if(total == cnt || cnt == $(target).find(".row .gallery-item").length) {
                        setTimeout(function() {
                            $(target).find(".row").masonry();    
                        }, 1)
                    }
                });
            });

            if($center_area.find('[data-map_kind="kakao"]').length && (typeof kakao == 'undefined' || typeof kakao.maps == 'undefined' || kakao.maps == null || VALIDPLAN == '')) {
                $center_area.find('[data-map_kind="kakao"]').html('지도연결해제됨. Javascript키 확인');
                    $center_area.find('[data-map_kind="kakao"]').html('<iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5659473821083!2d127.0282496015659!3d37.494568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1598c361b2b%3A0xdbf9af292beff3c!2z6rCV64Ko!5e0!3m2!1sko!2skr!4v1637303748377!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>');
            } else {
                $center_area.find('[data-map_kind="kakao"]').each(function() {
                    var container = this;
                    var lat = $(this).data("lat");
                    var lng = $(this).data("lng");
                    var options = { center: new kakao.maps.LatLng(lat, lng), level: 3};
                    var c_map = new kakao.maps.Map(container, options);
                    var marker = new kakao.maps.Marker({ position: new kakao.maps.LatLng(lat, lng), map: c_map});
                    var zoomInOut = $(this).data("zoominout");
                    var mapTitle = $(this).data("maptitle");
                    var mapContent = $(this).data("mapcontent");
                    var useTitle = $(this).data("usetitle");
                    var useContent = $(this).data("usecontent");
                    if(typeof zoomInOut == 'undefined' || !zoomInOut) zoomInOut = false;
                    if(typeof mapTitle == 'undefined' || !mapTitle) mapTitle = '';
                    if(typeof mapContent == 'undefined' || !mapContent) mapContent = '';
                    if(typeof useTitle == 'undefined' || !useTitle) useTitle = false;
                    if(typeof useContent == 'undefined' || !useContent) useContent = false;

                    if(zoomInOut == true) {
                        // var mapTypeControl = new kakao.maps.MapTypeControl();
                        // c_map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
                        // var zoomControl = new kakao.maps.ZoomControl();
                        // c_map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
                        var zoomControlHtml = '';
                        zoomControlHtml += '\
                            <div class="zoom-control" style="margin-top: 8px; margin-right: 8px; right: 0; width: 30px; position: absolute; background-color: #fff; z-index: 1; border-radius: 3px; box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);">\
                                <div class="btn-zoom-control" data-inout="I" style="cursor: pointer; width: 30px; height: 30px;">\
                                    <svg style="fill: #6b6b6b; margin: 3px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17 11h-4V7c0-.55-.45-1-1-1s-1 .45-1 1v4H7c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1v-4h4c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>\
                                </div>\
                                <div class="slider-wrap-container" style="height: 130px;">\
                                    <div class="slider-wrap small" style="text-align: center; height: 100%;">\
                                        <div style="max-height: 100%;" class="zoom-control-slider"></div>\
                                    </div>\
                                </div>\
                                <div class="btn-zoom-control" data-inout="O" style="cursor: pointer; width: 30px; height: 30px;">\
                                    <svg style="fill: #6b6b6b; margin: 3px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17 13H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>\
                                </div>\
                            </div>\
                        ';
                        var $zoomController = $(zoomControlHtml);
                        $(container).append($zoomController);
                        var zoom_slider = $zoomController.find('.zoom-control-slider').slider({
                            'orientation': 'vertical',
                            'min' : 1,
                            'max' : 14,
                            'step' : 1,
                            'value' : 3,
                            'handle' : 'square',
                            // 'reversed' : true,
                            'tooltip' : 'hide',
                        }).on('slide', function(data) {
                            c_map.setLevel(data.value);
                            c_map.setCenter(marker.getPosition());
                        }).on('slideStop', function(data) {
                            c_map.setLevel(data.value);
                            c_map.setCenter(marker.getPosition());
                        });

                        $zoomController.find('.btn-zoom-control').on('click', function() {
                            if($(this).data('inout') == 'I') {
                                c_map.setLevel(c_map.getLevel() - 1);
                                zoom_slider.slider('setValue', c_map.getLevel());
                            } else if($(this).data('inout' == 'O')) {
                                c_map.setLevel(c_map.getLevel() + 1);
                                zoom_slider.slider('setValue', c_map.getLevel());
                            }
                        });

                        kakao.maps.event.addListener(c_map, 'zoom_changed', function() {
                            zoom_slider.slider('setValue', c_map.getLevel());
                        });
                    }
                        
                    if((useTitle == true || useContent == true) && (mapTitle || mapContent)) {
                        var iwContent = '';
                        if(useTitle == true && mapTitle) {
                            iwContent = '<div class="title">' + mapTitle + '</div>';
                        }
                        if(useContent == true && mapContent) {
                            iwContent += '<div class="content">' + mapContent + '</div>';
                        }

                        if(iwContent) {
                            iwContent = '<div class="contact-map-info-window"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8 0C4.69 0 2 2.69 2 6s1 4 6 10c5-6 6-6.69 6-10s-2.69-6-6-6zm0 8.3a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z"/></svg>' + iwContent + '</div>';
                            var infoWindow = $(iwContent);
                            $(container).append(infoWindow);
                            // infoWindow.css('bottom', 'calc(-100% + ' + (infoWindow.outerHeight() + 36) + 'px)');  
                        }
                    }

                    $(window).on("resize", function() {
                        c_map.setCenter(marker.getPosition());
                    });
                });
            }
    
            if($center_area.find('[data-map_kind="naver"]').length && (typeof naver == 'undefined' || typeof naver.maps == 'undefined' || naver.maps == null || VALIDPLAN == '')) {
                $center_area.find('[data-map_kind="naver"]').html('지도연결해제됨. Client ID 확인');
                    $center_area.find('[data-map_kind="naver"]').html('<iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5659473821083!2d127.0282496015659!3d37.494568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1598c361b2b%3A0xdbf9af292beff3c!2z6rCV64Ko!5e0!3m2!1sko!2skr!4v1637303748377!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>');
            } else {
                $center_area.find('[data-map_kind="naver"]').each(function() {
                    var container = this;
                    var lat = $(this).data("lat");
                    var lng = $(this).data("lng");
                    var options = { center: new naver.maps.LatLng(lat, lng), zoom: 17};
                    var zoomInOut = $(this).data("zoominout");
                    var mapTitle = $(this).data("maptitle");
                    var mapContent = $(this).data("mapcontent");
                    var useTitle = $(this).data("usetitle");
                    var useContent = $(this).data("usecontent");
                    if(typeof zoomInOut == 'undefined' || !zoomInOut) zoomInOut = false;
                    if(typeof mapTitle == 'undefined' || !mapTitle) mapTitle = '';
                    if(typeof mapContent == 'undefined' || !mapContent) mapContent = '';
                    if(typeof useTitle == 'undefined' || !useTitle) useTitle = false;
                    if(typeof useContent == 'undefined' || !useContent) useContent = false;

                    var c_map = new naver.maps.Map(container, options);
                    var marker = new naver.maps.Marker({ position: new naver.maps.LatLng(lat, lng), map: c_map});

                    if(zoomInOut == true) {
                        // options.zoomControl = true;
                        // options.zoomControlOptions = {
                        //     position: naver.maps.Position.RIGHT_CENTER
                        // };

                        var zoomControlHtml = '';
                        zoomControlHtml += '\
                            <div class="zoom-control" style="margin-top: 8px; margin-right: 8px; right: 0; width: 30px; position: absolute; background-color: #fff; z-index: 1; border-radius: 3px; box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);">\
                                <div class="btn-zoom-control" data-inout="I" style="cursor: pointer; width: 30px; height: 30px;">\
                                    <svg style="fill: #6b6b6b; margin: 3px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17 11h-4V7c0-.55-.45-1-1-1s-1 .45-1 1v4H7c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1v-4h4c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>\
                                </div>\
                                <div class="slider-wrap-container" style="height: 130px;">\
                                    <div class="slider-wrap small" style="text-align: center; height: 100%;">\
                                        <div style="max-height: 100%;" class="zoom-control-slider"></div>\
                                    </div>\
                                </div>\
                                <div class="btn-zoom-control" data-inout="O" style="cursor: pointer; width: 30px; height: 30px;">\
                                    <svg style="fill: #6b6b6b; margin: 3px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17 13H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>\
                                </div>\
                            </div>\
                        ';
                        var $zoomController = $(zoomControlHtml);
                        $(container).append($zoomController);
                        var zoom_slider = $zoomController.find('.zoom-control-slider').slider({
                            'orientation': 'vertical',
                            'min' : 6,
                            'max' : 21,
                            'step' : 1,
                            'value' : 17,
                            'handle' : 'square',
                            'reversed' : true,
                            'tooltip' : 'hide',
                        }).on('slide', function(data) {
                            c_map.setZoom(data.value);
                            c_map.setCenter(marker.getPosition());
                        }).on('slideStop', function(data) {
                            c_map.setZoom(data.value);
                            c_map.setCenter(marker.getPosition());
                        });
                        $zoomController.find('.btn-zoom-control').on('click', function() {
                            if($(this).data('inout') == 'I') {
                                c_map.setZoom(c_map.getZoom() + 1);
                                zoom_slider.slider('setValue', c_map.getZoom());
                            } else if($(this).data('inout' == 'O')) {
                                c_map.setZoom(c_map.getZoom() - 1);
                                zoom_slider.slider('setValue', c_map.getZoom());
                            }
                        });

                        naver.maps.Event.addListener(c_map, 'zoom_changed', function(zoom) {
                            zoom_slider.slider('setValue', c_map.getZoom());
                        });
                    }

                    if((useTitle == true || useContent == true) && (mapTitle || mapContent)) {
                        var iwContent = '';
                        if(useTitle == true && mapTitle) {
                            iwContent = '<div class="title">' + mapTitle + '</div>';
                        }
                        if(useContent == true && mapContent) {
                            iwContent += '<div class="content">' + mapContent + '</div>';
                        }

                        if(iwContent) {
                            iwContent = '<div class="contact-map-info-window"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8 0C4.69 0 2 2.69 2 6s1 4 6 10c5-6 6-6.69 6-10s-2.69-6-6-6zm0 8.3a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z"/></svg>' + iwContent + '</div>';
                            var infoWindow = $(iwContent);
                            $(container).append(infoWindow);
                            // infoWindow.css('bottom', 'calc(-100% + ' + (infoWindow.outerHeight() + 36) + 'px)');  
                        }
                    }
                    $(window).on("resize", function() {
                        c_map.setCenter(marker.getPosition());
                    });

                    c_map.setSize(new naver.maps.Size($(container).outerWidth(), $(container).outerHeight()));
                });
            }

            // $.each($('.sort-empty'),function(i,v) {
            //     if($(this).next().hasClass('sort-empty') && !$(this).next().hasClass('page')) {
            //         var $empty = $('<div class="sort-empty page">PAGE EMPTY</div>');
            //         //var $empty = ($(this).hasClass('use-link')) ?  $('<div class="sort-empty page">PAGE LINKED</div>') :  $('<div class="sort-empty page">PAGE EMPTY</div>');
            //         if(!$(this).hasClass('page')) $(this).after($empty);
            //     }
            // });

            // $('.reorderModal').scrollTo('.reorderBlock[data-id="' + selectID + '"]',{offset:-200});
            // $('.reorderBlock[data-id="' + selectID + '"]').addClass('active');

            $center_area.find(".page-list-area .gallery-name").on("click", function() {
                $.reorderON($(this).data('page'));
            });

            blockSortable();
            $.processOFF();
        });
    }

    jQuery.reorderOFF = function() {
        window.basketBlockHtml = '';
        window.pageList = [];
        window.pageListChangeFlag = [];
        $(".new-dsgn-body").remove();
        $('.reorderModal').fadeOut(function() {
            $(this).remove();
            reorderFIXED = '';
        });
    }

    jQuery.viewON = function() {
        var $view = $('<div class="viewModal"></div>');

        if ($('.viewModal').length < 1) {
            $view.css({
                'position' : 'fixed',
                'width' : '100%',
                'height' : '100%',
                'background' : '#FFF url(https://storage.googleapis.com/i.addblock.net/preloader2.gif) center center no-repeat',
                'z-index' : '10000000000',
                'display' : 'none',
                'overflow' : 'auto'
            });
            $('body').prepend($view);
            var $content = $('<div class="content"></div>'),
                $h1 = $('<h1></h1>').css({
                    'position' : 'absolute',
                    'z-index' : '100001',
                    'right' : '0px'
                }),
                $close = $('<div class="pull-right"><i class="fa fa-times"></i></div>').css({
                    'margin-right' : '18px',
                    'margin-top' : '-16px',
                    'background-color': '#556273',
                    'color': '#fff',
                    'font-size': '18px',
                    'padding': '6px 9px',
                    'cursor': 'pointer',
                    'border-radius' : '20px'
                }),
                $iframe = $('<iframe src="http://' + SID + '.' + HOST + '/render/' + PAGE + '"></iframe>');

            $iframe.css({
                'position' : 'absolute',
                'top' : '0',
                'left' : '0',
                'width' : '100%',
                'height' : '100%',
                'z-index' : '100000',
                'border' : 'none'
            });


            $close.on('click',function() {
                $.viewOFF();
            });
            $content.append($h1).append($iframe);
            $h1.append($close);
            $view.append($content);
            $view.fadeIn();
        }
    }

    jQuery.viewOFF = function() {
        $('.viewModal').fadeOut(function() {
            $(this).remove();  
        });
    }

    jQuery.historyON = function() {
        viewmode('view');
    }

    $.fn.showUpgradePlanModal = function(sid, plan, upgrade_plan, fn) {
        if($('.site-upgrade-wrap').length > 0 || typeof checkUpgradeModal != "undefined" && checkUpgradeModal) return false;
        var checkUpgradeModal = true;

        var check_plan = (!plan || plan == 'FR' || plan == 'FREE') ? false : true,
            log_fn = (!fn) ? '' : '.' + fn,
            log_plan = (!upgrade_plan) ? '' : '.' + upgrade_plan,
            upgrade_plan = (!upgrade_plan) ? '' : '/plan/' + upgrade_plan,
            upgrade_url = (!upgrade_plan) ? '/upgrade' : ((check_plan) ? '/upgrade/change/site/' + sid + upgrade_plan : '/upgrade/buy/site/' + sid + upgrade_plan),
            modal_title = $.lang[LANG]['config.upgrade-plan' + log_plan + log_fn + '.title'],
            modal_description =  $.lang[LANG]['config.upgrade-plan' + log_plan + log_fn + '.description'],
            str = '\
                <div class="site-upgrade-wrap">\
                    <p class="description">' + modal_description + '</p>\
                    <div class="btn-box">\
                        <a href="' + upgrade_url + '"><i class="fa fa-level-up"></i>'+$.lang[LANG]['config.upgrade-plan.btn']+'</a>\
                    </div>\
                </div>\
            '; 

        var modal = $(this).showModalFlat(modal_title, str, false, false, '', '', '', '', '', '', '', function() {
            checkUpgradeModal = false;
        });
    }

    $.fn.showModal = function (header, content, footer, cancel, confirm, callback) {
        $('.editor-navbar').css('z-index','1030');
        var HTML = '<div class="modal modal-default fade" id="generic-modal">' +
            '   <div class="modal-dialog" style="padding-top:5%;">' +
            '       <div class="modal-content">' +
            '           <button type="" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><img src="https://storage.googleapis.com/i.addblock.net/fa-close-modal.png" alt="close"></span></button>' +
            '           <div class="modal-body">' +
            '               <h3 class="modal-title">' + header +
            '               </h3>' + content +
            '           </div>';
            if(footer==true) {
                HTML = HTML + '<div class="modal-footer">';
                if(cancel == true) {
                    HTML = HTML + '<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">취소</button>';
                } else if(confirm == true) {
                    HTML = HTML + '<button type="button" class="btn btn-primary btn-sm ok-button-dialog">확인</button>';
                }
                HTML = HTML +
                '       </div>';
            }
            HTML = HTML +
            '       </div>' +
            '   </div>' +
            '</div>';

        var container = $('<div class="generic-modal"></div>').html(HTML);
        $('body').append(container);
        var newInstance = jQuery.extend(true, {}, container);
        newInstance.find('.ok-button-dialog').bind('click', function () {
            callback();
        });
        var modalElement = newInstance.find('#generic-modal');
        modalElement.modal();

        modalElement.on('hidden.bs.modal', function(e) {
            // $('.editor-navbar').css('z-index','1040');
            $('.generic-modal').remove();
            $('.modal-backdrop').remove();
        });

        return modalElement;
    }


    $.fn.showModalFlat = function (header, content, footer, confirm, callback, closetext, oktext, size, backdrop, closecallback, showcallback, hidecallback) {
        // if($('#flat-modal.event').length) return;

        size = (typeof size == 'undefined') ? '' : size;        
        if(size.indexOf(',') > -1) {
            var modal_name = size.split(','),
                modal_class = '';

            size = modal_name[0];
            modal_class = modal_name[1];
        }

        backdrop = (typeof backdrop != 'undefined' && backdrop === true) ? true : false;

        // $('.editor-navbar').css('z-index','1030');

        var checkCLBtnMode = (size.indexOf('cl-s-btn') > -1) ? true : false,
            close_btn = $.lang[LANG]['config.close'],
            close_btn_class = 'btn-default',
            ok_btn = $.lang[LANG]['config.ok'],
            ok_btn_class = 'btn-primary';

        if( closetext == 'cancel') {
            close_btn = $.lang[LANG]['config.cancel'];
        } else if( closetext == 'close' ) {
            close_btn = $.lang[LANG]['config.close'];
        } else if( closetext == 'ok' || closetext == 'notice.ok' ) {
            close_btn = $.lang[LANG]['config.'+closetext];
            close_btn_class = 'btn-primary ok-button-dialog';
        } else if ( typeof closetext != 'undefined') {
            if( closetext.match(/\./g) !== null ) close_btn = $.lang[LANG][closetext];
            else if(closetext.length > 0) close_btn = closetext;
        }
        
        if( oktext == 'save' ) {
            ok_btn = $.lang[LANG]['config.save'];
        } else if( oktext == 'send' ) {
            ok_btn = $.lang[LANG]['config.send'];
        } else if( oktext == 'ok' ) {
            ok_btn = $.lang[LANG]['config.ok'];
        } else if ( typeof oktext != 'undefined') {
            if( oktext.match(/\./g) !== null ) ok_btn = $.lang[LANG][oktext];
            else if(oktext.length > 0) ok_btn = oktext;
        }

        var flat_modal_id = ($('.modal-default').length == 0) ? 'flat-modal': 'flat-modal'+$('.modal-default').length;

        var HTML = '<div class="modal modal-default fade" id="'+flat_modal_id+'">' +
            '   <div class="modal-dialog '+size+'">' +
            '       <div class="modal-content">' +
            '           <button type="" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8.71 8l7.15-7.15c0.2-0.2 0.2-0.51 0-0.71s-0.51-0.2-0.71 0L8 7.29 0.85 0.15c-0.2-0.2-0.51-0.2-0.71 0s-0.2 0.51 0 0.71L7.29 8l-7.15 7.15c-0.2 0.2-0.2 0.51 0 0.71C0.24 15.95 0.37 16 0.5 16s0.26-0.05 0.35-0.15L8 8.71l7.15 7.15c0.1 0.1 0.23 0.15 0.35 0.15s0.26-0.05 0.35-0.15c0.2-0.2 0.2-0.51 0-0.71L8.71 8z"/></svg></span></button>' +
            '           <div class="modal-body">' +
            '               <h3 class="modal-title">' + header +
            '               </h3>' + content +
            '           </div>';
            if(footer==true) {
                HTML = HTML + 
                '      <div class="modal-footer">';

                var btn_html = '<button type="button" class="btn '+ close_btn_class +' btn-sm close-button-dialog" data-dismiss="modal">' + close_btn + '</button>';                
                if(confirm == true) {
                    if(checkCLBtnMode) {
                        btn_html = '<button type="button" class="btn '+ ok_btn_class +' btn-sm ok-button-dialog">' + ok_btn + '</button>' + btn_html;
                    } else {
                        btn_html = btn_html + '<button type="button" class="btn '+ ok_btn_class +' btn-sm ok-button-dialog">' + ok_btn + '</button>';
                    }
                } 
                HTML = HTML + btn_html + 
                '      </div>';
            }
            HTML = HTML +
            '       </div>' +
            '   </div>' +
            '</div>';
        var time = new Date().getTime();
        var container = $('<div class="flat-modal"></div>').html(HTML);
        if(typeof modal_class != "undefined" && modal_class) container.addClass(modal_class);
        if(size && size.indexOf('cl-modal') > 0 || (size && size.indexOf('cl-cmmodal') > -1)) {
            var mobile_close_btn = '\
                    <button class="cl-mobile-btn close" data-dismiss="modal" aria-label="Close">\
                        <span aria-hidden="true">\
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">\
                                <polygon points="16 1 15 0 8 7 1 0 0 1 7 8 0 15 1 16 8 9 15 16 16 15 9 8 "/>\
                            </svg>\
                        </span>\
                    </button>\
                    ';

            container.find('.modal').prepend(mobile_close_btn);
            
            if(confirm==false && (closetext=='close' || closetext=='cancel')) container.find('.close-button-dialog').addClass('clostbtnfalse'); //닫기 버튼 하나일 경우 공통 class

            if(size.indexOf('cl-modal') > -1) container.addClass('cl-flat-modal');
            else if(size.indexOf('cl-cmmodal') > -1) container.addClass('cl-common-modal');
            if(size.indexOf('cl-alert') > -1) container.addClass('cl-alert-modal');

            if(size.indexOf('pg-modal') > -1) container.addClass('pg-modal-wrap'); 
            else if(size.indexOf('cl-common-notice') > -1) {  //공통 notice icon 추가
                var svg = '\
                    <svg xmlns="http://www.w3.org/2000/svg" class="cl-notice-icon" viewBox="0 0 90 90" width="90" height="90"><path d="M45 4c22.61 0 41 18.39 41 41S67.61 86 45 86 4 67.61 4 45 22.39 4 45 4M45 0C20.15 0 0 20.15 0 45s20.15 45 45 45 45-20.15 45-45S69.85 0 45 0L45 0z"/>\
                        <path d="M45 20L45 20c1.1 0 2 0.9 2 2v32c0 1.1-0.9 2-2 2h0c-1.1 0-2-0.9-2-2V22C43 20.9 43.9 20 45 20z"/><circle cx="45" cy="67" r="3"/>\
                    </svg>\
                    ';
                container.find('.modal-title').before(svg);
                if(size.indexOf('modal-over-1') > -1) container.addClass('modal-over-1');
           } else if(size.indexOf('guidePopup') > -1) {
                container.find('.modal-title').not('.guidetitle').remove();
                container.addClass('guidePopup-wrap');
            }
        }


        $('body').append(container);
        var newInstance = jQuery.extend(true, {}, container);
        var modalElement = newInstance.find('#'+flat_modal_id);
        if(backdrop) modalElement.modal({ backdrop : 'static'});
        else modalElement.modal();

        newInstance.find('.ok-button-dialog').bind('click', function () {
            if(typeof callback == 'function')
                callback();
        });

        newInstance.find('.close-button-dialog').bind('click', function () {
            if(typeof closecallback == 'function') {
                closecallback();
            }
        });

        modalElement.on('shown.bs.modal', function(e) {
            var modal = document.querySelector('.modal');
            modal.style.position = 'absolute';
            setTimeout(function() {
                modal.style.position = 'fixed';
            },0);
            if(typeof showcallback == 'function') showcallback();
        });

        modalElement.on('hidden.bs.modal', function(e) {
            if(typeof hidecallback == 'function') hidecallback();
            var flat_modal_id = $(this).attr('id');
            // $('.editor-navbar').css('z-index','1040');
            var this_modal = $('#'+flat_modal_id).closest('.flat-modal');
            this_modal.next('.modal-backdrop').remove();
            this_modal.remove();

            if($('.modal-backdrop').length) {
                setTimeout(function() {
                    $('body').addClass('modal-open');    
                },10);                
            }
            $('body').removeClass('no-fixed');
        });

        return modalElement;
    }    


    $.fn.showPopupModal = function (data,sid) {
        var img_count = data.length,
            img_w = new Array(), 
            img_h = new Array(), 
            counter = 0,
            sid = (typeof sid != 'undefined') ? sid : SID,
            popup_data = new Array();

        $('#el-empty').html('');
        $.each(data,function(i,v) {
            var $img = $('<img/>').attr('src',v.popupimg);
            $('#el-empty').append($img);
        });

        var $imgs = $('#el-empty img');
        $.each($imgs,function(i,v) {
            $(this).one('load',function() {
                counter++;
                img_w[i] = this.width;
                img_h[i] = this.height;
                if(counter == img_count) getPopupFunction();
            });
            if(this.complete) $(this).load();
        });

        function getPopupFunction() {
            $('#el-empty').html('');
            var html = '',
                display = new Array();

            $.each(data, function(i,o) {
                var isCookie = ($.cookie(sid + 'Popup' + i)) ? 'style= display:none;' : '';
                display.push(isCookie);

                var plink = (typeof o.popuplink != 'undefined' && o.popuplink != 'javascript:;' && o.popuplink.length > 0) ? o.popuplink : 'javascript:;',
                    plink_target = (typeof o.popuplink_target != 'undefined' && o.popuplink_target === true) ? 'target="_blank"' : '',
                    link_option = '';

                if(typeof o.popuplink == 'undefined') o.popuplink = '';
                if(typeof o.popuplink_target == 'undefined') o.popuplink_target = '';
                if(typeof o.popuptime == 'undefined') o.popuptime = '';

                if(plink != '' && plink != 'javascript:;') {
                    if(checkBase64Encode(plink)) plink = Base64.decode(plink);
                    var _menuList = (PAGE_MODE == 'c') ? MENULIST : property.MENULIST;
                    
                    if(plink.match(/^\@/g) !== null) {                                                  // link-type: link-bookmark ==> a[attr-bookmark]
                        var _settings = (PAGE_MODE == 'c') ? SETTINGS : property.SETTINGS,
                            bookmark_seq = plink.replace(/^\@/g,'');
                            
                        if(typeof _settings == 'undefined' || typeof _settings.blockBookmarkList == 'undefined' || _settings.blockBookmarkList['bookmark' + bookmark_seq] == 'undefined') {
                            plink = '';
                            link_option = '';
                        } else {
                            link_option = 'attr-bookmark="' + bookmark_seq + '"';
                        }
                    } else if(plink.match(/^flink\@[0-9]/gi) !== null) {                                // link-type: link-file     ==> a[attr-flink]
                        link_option = 'attr-flink="' + plink.replace(/^flink\@/gi,'') + '"';
                        plink_target = '';
                    } else if(_menuList.indexOf(plink.replace(/^\//g,"").replace(/ /g,"-")) > -1) {     // link-type: link-menu     ==> a[data-user-link]
                        link_option = 'data-user-link="' + plink + '"';
                    } else {                                                                            // link-type: link-out      ==> a[attr-link]
                        link_option = 'attr-link="' + plink + '"';
                    }

                    plink = (PAGE_MODE == 'c') ? makeLinkUrl(plink, ONE, VIEW) : makeLinkUrl(plink, property.ONE, property.VIEW);
                }

                html = html + '<div class="modal-popup" id="' + sid + 'Popup' + i + '" data-link="' + plink + '" data-target="' + o.popuplink_target + '" data-time="' + o.popuptime + '" data-idx="' + i + '" ' + display[i] + '>' + 
                '   <div class="popup-content">' +
                '       <div class="popup-header">' +
                '           <button type="button" class="close popup-close"><span aria-hidden="true"><svg viewBox="0 0 12 12" width="12" height="12"><path d="M6.71 6l5.15-5.15c0.2-0.2 0.2-0.51 0-0.71s-0.51-0.2-0.71 0L6 5.29 0.85 0.15c-0.2-0.2-0.51-0.2-0.71 0s-0.2 0.51 0 0.71L5.29 6l-5.15 5.15c-0.2 0.2-0.2 0.51 0 0.71C0.24 11.95 0.37 12 0.5 12s0.26-0.05 0.35-0.15L6 6.71l5.15 5.15c0.1 0.1 0.23 0.15 0.35 0.15s0.26-0.05 0.35-0.15c0.2-0.2 0.2-0.51 0-0.71L6.71 6z"/></svg></span></button>' +
                '       </div>' +
                '       <div class="popup-body">' +
                '          <a href="' + plink + '" ' + plink_target  + ' ' + link_option + '>' +
                '             <div class="img-wrap">' +
                '               <img src="' + o.popupimg + '" alt="" class="img-responsive img-popup" />' +
                '             </div>' +
                '          </a>' +
                '       </div>' +
                '       <div class="popup-footer clearfix">' +
                '           <ul class="text-center">' +
                '               <li class="sitePopupTodayHide">' +
                '                   <input type="checkbox" value="" class="hide">' +
                '                   ' + $.lang[LANG]['editor.popup.close-24hours'] + 
                '               </li>' +
                '               <li class="sitePopupClose">' + $.lang[LANG]['config.close'] + '</li>' +
                '           </ul>' +
                '       </div>' +
                '   </div>' +
                '</div>';
                if(data.length == (i+1) )  setPopupFunction(html,display);
            });

        }

        function setPopupFunction(html, display) {

            var container = $('<div class="popup"></div>').html('<div class="popup-modal">' + html + '</div>');
            if($('.dsgn-body').find('.popup').length > 0 )  { 
                $('.dsgn-body').find('.popup').replaceWith(container);
            } else { 
                $('.dsgn-body').append(container); 
            }

            var newInstance = jQuery.extend(true, {}, container);
            var sitePopupElement  = newInstance.find('.popup-modal');

            var total_w = 0,
                add_w = 0, 
                d_top = $('.header.el-menu > header').outerHeight() + 15, 
                d_left = 0,
                x = 0, y = 0, y_r = 0;

            var checkDsgnDodyW = $('.dsgn-body').width() + $('.dsgn-body').css('padding-left').replace('px','') * 1;
            if($('.header.el-menu').hasClass('sidebar') && checkDsgnDodyW > 752 ) d_top = 15;

            for(i=0; i<img_w.length; i++) {
                if(parseInt(img_w[i]) > $('.dsgn-body').width()-30 ) {
                    img_w[i] = $('.dsgn-body').width()-30;
                }
                if(display[i]) { 
                    continue;
                } else {
                    total_w = total_w + parseInt(img_w[i]) + 30;
                }
            }
           
            var isOverflow = ($('.dsgn-body').width() < total_w) ? true : false,
                display_i = -1;
            
            if(isOverflow) { sitePopupElement.addClass('popupimg-overflow-y');
            } else { sitePopupElement.removeClass('popupimg-overflow-y'); }

            $.each(img_w, function(i,v) {
                if(display[i]) {
                    return true;
                } else {
                    display_i++;
                }

                if(isOverflow) {
                    x = (display_i==0) ? d_top : d_top + (display_i*30);
                    y = d_left + ((display_i+1)*30);
                    y_r = 120 - y;

                    img_w[i] = 'auto';
                } else {
                    d_left = ($('.dsgn-body').width() - total_w)/2;

                    x = d_top;
                    y = d_left + add_w + (i*15);
                }
                add_w = add_w + v;

                var css_val = (isOverflow) ? {'top': x +'px', 'left': y+'px', 'right': y_r+'px', 'margin-left': '0px', 'width': img_w[i], 'max-width': v} : {'top': x +'px', 'left': y+'px' , 'width': img_w[i]};
                sitePopupElement.find('#'+sid +'Popup'+ i).css(css_val);
            });
            return sitePopupElement;
        }
    }


    $.fn.forumModal = function (header, content, footer, confirm, callback, closetext) {
        $('.editor-navbar').css('z-index','1030');
        var confirm_btntext = '',
            confirm_btn_class = 'btn-default';
        if( closetext == 'cancel' ) {
            confirm_btn = $.lang[LANG]['config.cancel'];
        } else if( closetext == 'ok') {
            confirm_btn = $.lang[LANG]['config.ok'];
            confirm_btn_class = 'btn-primary';
        } else {
            confirm_btn = $.lang[LANG]['config.close'];
        }
        var HTML = '<div class="modal modal-default fade" class="forum-modal" id="forum-modal">' +
            '   <div class="container">' +
            '       <div class="modal-content">' +
            '           <div class="modal-body">' +
            '               ' + content +
            '           </div>';
            HTML = HTML +
            '       </div>' +
            '   </div>' +
            '</div>';
                HTML = HTML +
                "<ul class='sideToolbar'>" + 
                "   <li><img src='https://storage.googleapis.com/i.addblock.net/icon/stbImage.png' class='tb-attach-file'></li>" +
                "   <li><img src='https://storage.googleapis.com/i.addblock.net/icon/stbVideo.png' class='tb-video-insert'></li>" +
                "   <li><img src='https://storage.googleapis.com/i.addblock.net/icon/stbAttach.png' class='tb-file-insert'></li>" +
                "   <li><img src='https://storage.googleapis.com/i.addblock.net/icon/stbMap.png' class='test'></li>" +
                // "   <li><img src='https://storage.googleapis.com/i.addblock.net/icon/stbDivider.png'></li>" +
                "</ul>";
            if(footer==true) {
                HTML = HTML + 
                '      <div class="modal-footer">';
                if(confirm == true) {
                    HTML = HTML + 
                '        <div class="pull-right"><button type="button" class="btn btn-default btn-xs btn-modal ok-button-dialog">' + $.lang[LANG]['config.ok'] + '</button></div>';
                }
                HTML = HTML + 
                '        <div class="pull-right"><button type="button" class="btn '+ confirm_btn_class +' btn-xs btn-modal no-border" data-dismiss="modal">' + confirm_btn + '</button></div>';
                HTML = HTML +
                '      </div>';
            }
        var time = new Date().getTime();
        var container = $('<div class="forum-modal fade"></div>').html(HTML);
        $('body').append(container);
        var newInstance = jQuery.extend(true, {}, container);
        var modalElement = newInstance.find('#forum-modal');
        modalElement.modal({
            keyboard: false,
            backdrop: 'static'
        });

        newInstance.find('.ok-button-dialog').bind('click', function () {
            callback();
        });

        newInstance.find('button[data-dismiss="modal"]').bind('click', function () {
            modalElement.modal('hide');
        });

        modalElement.on('scroll', function() {
            $('.fr-line-breaker').css('left','-100%');
            var thisPos = $(this).scrollTop(),
                newPos = (scrollPos > thisPos) ? (scrollPos - thisPos) :  (scrollPos - thisPos),
                newPos2 = (scrollPos2 > thisPos) ? (scrollPos2 - thisPos) :  (scrollPos2 - thisPos),
                caPos = Number(toolPos) + Number(newPos),
                caPos2 = Number(popPos) + Number(newPos);

            $('.fr-toolbar').css('top', caPos + 'px');

            if(frAbove) {
                var caPos2 = caPos -170;
                if($('.fr-popup.fr-active .fr-link-insert-layer.fr-active').length) caPos2 = caPos-180;
                if($('.fr-popup.fr-active button[data-cmd="linkOpen"]').length) caPos2 = caPos + 170;
           }

            if($('.fr-active').prev().hasClass('fr-image-overlay')) {
                $('.fr-popup.fr-active').css('top', (Number(popPos) + Number(newPos)) + 'px');  
            } else {
                if($('.fr-popup').hasClass('fr-above')) caPos2 = caPos2 - 20;
                $('.fr-popup').css('top', caPos2 + 'px');  
            }
            // console.log(caPos2);
            // console.log('caPos : ' + caPos + ', caPos2 : ' + caPos2);
        });
        modalElement.on('hide.bs.modal', function(e) {
            $('.forum-modal').removeClass('in');
        });
        modalElement.on('hidden.bs.modal', function(e) {
            // $('.editor-navbar').css('z-index','1040');
            $('.tmp-user').remove();
            $('.note-dialog').remove();
            $('.forum-modal').remove();
            $('.modal-backdrop').remove();
            $('#fm-editor').froalaEditor('destroy');
        });

        return modalElement;
    }           

    jQuery.guideVideoON = function() {
        // 편집 모드를 처음으로 보는 경우가 아니면 ( 주요기능을 이미 둘려봤으면 )
        if( LANG == 'ko' || typeof SETTINGS.showGuide != 'undefined')
            return false;

        hideElementListPanel();
        var $guideVideoModal = $('<div class="guideVideoModal config-modal"></div>'),
            $content = $('<div class="content"></div>');

        if ($('.guideVideoModal').length < 1) {
            $('body').prepend($guideVideoModal);
            $content.css({
                "width" : "100%",
                "height" : "100%",
                "background-color" : "rgba(0,0,0,0.6)",
                "display" : "none"
            });

            $guideVideoModal.append($content);
            $guideVideoModal.css({
                "display": "inherit",
                "position": "fixed",
                "z-index": "99999999",
                "top": "0",
                "left": "0",
                "width": "100%",
                "height": "100%",
                "text-align": "center",
                "background-color" : "transparent"
            });
            $guideVideoModal.fadeIn();

            var $guideVideo = $('<div class="guideVideo">'),
                $close = $('<div class="close"><img src="https://storage.googleapis.com/i.addblock.net/fa-close-modal.png" alt="close" /></div>'),
                $close2 = $('<button type="button" class="btn btn-primary btn-sm ok-button-dialog">' + $.lang[LANG]['config.ok'] + '</button>');
                $header = $('<div class="header"><h2>' + $.lang[LANG]["editor.guide.tutorial-video"] + '</h2></div>'),
                $body = $('<div class="body"></div>'),
                $contentbox = $('<div class="contentbox"></div>'),
                $tutorialVideo = $('<div class="tutorial-video"></div>'),
                $videoWrap = $('<div class="video-wrap guideVideo-stopPlay"><div id="guide-video-modal-video-overlay"></div></div>'),
                $watchAgainNote = $('<span class="watch-again-note">' + $.lang[LANG]['tutorial-video.watch-again-note'] + '</span>'),
                $bottom = $('<div class="bottom"></div>');

            $close.on('click',function() { $.guideVideoOFF(); });
            $close2.on('click',function() { $.guideVideoOFF(); });

            $videoWrap.on('click', function() {

                $(this).toggleClass('guideVideo-stopPlay');

                if(!$(this).hasClass('guideVideo-stopPlay')) {
                    if ( LANG == 'en' )
                        var link = "https://www.youtube.com/embed/p6fyIMl2BcI";

                    var html = '<iframe class="video embed-responsive-item" width="765" height="380" src="' + link + '?enablejsapi=1&rel=0&vq=large&wmode=opaque&showinfo=0&controls=1&autoplay=0&loop=0;playlist=Fn0Mpyh3xto;" frameborder="0" allowfullscreen></iframe>';

                    $(this).html(html);

                }
            });

            $tutorialVideo.append( $videoWrap );
            $contentbox.append( $tutorialVideo );

            $bottom.append($close2).append($watchAgainNote);
            $body.append($contentbox).append($bottom);
            $guideVideo.append($header).append($close).append($body);
            $content.append($guideVideo);
            $content.fadeIn();

        }

        var $thisContent = $('.guideVideoModal .contentbox');
        
    }

    jQuery.guideVideoOFF = function() {
        $('.guideVideoModal').fadeOut(function() {
            $(this).remove();  
        });
    }




    $.fn.siteDelete = function(sid, code) {
        // isDelLangSite : 특정 다국어 삭제시 ( 사이트 삭제에서의 다국어 삭제는 false 임 )
        var isDelLangSite = (code) ? true : false;

        var sdOrgSid = sid,
            sdSid = (isDelLangSite) ? sid + '__' + code : sid,
            sdMore = [''],
            sdResource = [],
            sdResourceIdx = -1,
            sdResourceTotal = 0,
            sdIdx = -1,
            p_w = 0, p_max = 100, p_unit = 1,
            p_step_max = 100, p_step_unit = 1, p_step_plus = 1,
            block_view = { 'gallery':1, 'forum':2, 'form':2 };

        $.sd = {
            initVal: function() {
                p_step_max = 100;
                p_step_unit = 1;
                p_step_plus = 1;

                sdIdx++;

                if(!isDelLangSite) {
                    code = sdMore[sdIdx];
                    sdSid = (code) ? sid + '__' + code : sid;
                }
            },
            strProcess: function(step) {
                // console.log('step: ' + step + '');
                // console.log('p_w: '+ p_w + ', p_unit: ' + p_unit);
                var str = '', cnt = '';

                switch(step) {
                    case 'init':
                        p_max = (isDelLangSite) ? 100 : 100/sdMore.length;
                        p_unit = p_max / 100;

                        str = $.lang[LANG]['site.delete.process.init'];
                        break;

                    case '1':
                        p_w += p_unit * 5;

                        str = $.lang[LANG]['site.delete.process.step1'];
                        break;

                    case 'end':
                        p_w = p_max * (sdIdx+1);

                        var checkEnd = (sdMore.length > sdIdx+1) ? false : true;

                        str = $.lang[LANG]['site.delete.process.step14'];
                        cnt = (checkEnd) ? '' : '<br>' + $.lang[LANG]['site.delete.process.more'];

                        if(checkEnd) {

                            if(isDelLangSite) {
                                var slog_lang = $('.language-contents .settings-language .selected-languages li[data-code="' + code + '"] .language-name').text();
                                setSiteLogs('settings.language','delete',{'lang':slog_lang,'code':code},'settings.language');
                            }

                            setTimeout(function() {
                                $.progressOFF();
                            }, 500);
                        }
                        break;

                    default:
                        if(step == '2') {
                            p_step_max = p_unit * 90;
                            p_step_unit = p_step_max / 13;
                        }

                        if($.inArray(step,['3','4'])>-1) str = $.lang[LANG]['site.delete.process.step3'];
                        else if($.inArray(step,['5','6','7','8','8-more','9'])>-1) str = $.lang[LANG]['site.delete.process.step5'];
                        else str = $.lang[LANG]['site.delete.process.step'+step];

                        if(step == '13-more') {
                            if(sdResource.length == 0) return false;
                            str += '( ' + (sdResourceIdx+1) + ' / ' + sdResource.length + ' )';
                        }

                        if(p_step_plus > 0) p_w += p_step_unit;
                        break;
                }


                if(step == 'init' && sdIdx == 0) {
                    $.progressON(str,'','',true);
                } else {
                    $('.progressModal .progress-header h1').html(str);
                    $('.progressModal .progress-bar').css('width',p_w+'%');
                }

                // console.log('p_w: '+ p_w + ', p_unit: ' + p_unit);
            },
            step0: function() {
                if(sdIdx == 0) $('#loading').addClass('hide');

                var sdStep1 = $.sd.step1();
                sdStep1.done(function() {
                    $.sd.stepMultiCall('2');
                }).fail(function(sdStep1_msg){
                    console.log(sdStep1_msg);

                    $.sd.stepEnd();
                    if(sdStep1_msg) $(this).showModalFlat('ERROR', sdStep1_msg, false, false,'', 'ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0');
                });
            },
            step1: function() { // [del] ln_select
                var step1_deferred = $.Deferred();

                $.post('/template/siteDelete', { step:'1', sid:sdOrgSid, code:code, isDelLangSite:isDelLangSite }, function(r1) {
                    if(typeof r1.error != 'undefiend' && r1.error) {
                        console.log('step1 reject');
                        step1_deferred.reject(r1.error);
                    }
                    $.sd.strProcess('1');

                    setTimeout(function() {
                        step1_deferred.resolve();
                    }, 200);
                }, 'json');
                
                return step1_deferred.promise();
            },
            stepMultiCall: function(call_step) {
                if(call_step == '2') $.sd.strProcess('2');

                if(call_step == '13-more') {
                    var sdStep3 = $.sd.step3();
                    sdStep3.done(function(next_step) {
                        if(next_step) $.sd.stepMultiCall(next_step);
                        else $.sd.stepEnd();
                    }).fail(function(sdStep3_msg) {
                        console.log(sdStep3_msg);

                        $.sd.stepMultiCall('14');
                        if(sdStep3_msg) $(this).showModalFlat('ERROR', sdStep3_msg, false, false,'', 'ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0');
                    });
                } else {
                    var sdStepMulti = $.sd.stepMulti(call_step);
                    sdStepMulti.done(function(next_step) {
                        if(next_step) $.sd.stepMultiCall(next_step);
                        else $.sd.stepEnd();
                    }).fail(function(sdStepMulti_msg){
                        console.log(sdStepMulti_msg);

                        var jump_step = (call_step.indexOf('-more') > -1) ? Number(call_step.replace('-more', ''))+1 : Number(call_step)+1;
                        if(jump_step >= 15) $.sd.stepEnd();
                        else $.sd.stepMultiCall(jump_step.toString());
                        
                        console.log(call_step);
                        console.log('->');
                        console.log(jump_step.toString());

                        if(sdStepMulti_msg) $(this).showModalFlat('ERROR', sdStepMulti_msg, false, false,'', 'ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0');
                    });
                }
            },
            stepMulti: function(sd_step) {
                var stepMulti_deferred = $.Deferred();

                $.post('/template/siteDelete', { step:sd_step, sid:sdOrgSid, code:code }, function(r) {
                    if(typeof r.error != 'undefiend' && r.error) {
                        console.log('stepMulti reject');
                        stepMulti_deferred.reject(r.error);
                    }
                    if(sd_step == '13') {
                        sdResource = (typeof r.r_list != 'undefiend') ? r.r_list : [];
                        sdResourceTotal = (typeof r.r_total != 'undefiend') ? r.r_total : 0;
                    }

                    p_step_plus = (r.next_step=='' || r.next_step.indexOf('-more') > -1) ? 0 : 1;
                    if(r.next_step) $.sd.strProcess(r.next_step);

                    setTimeout(function() {
                        stepMulti_deferred.resolve(r.next_step);
                    }, 100);
                }, 'json');

                return stepMulti_deferred.promise();
            },
            step3: function() {
                var step3_deferred = $.Deferred();

                sdResourceIdx++;
                var r_seq = sdResource[sdResourceIdx];
                if(typeof r_seq != 'undefiend' && r_seq) {
                    $.post('/template/siteDelete', { step:'13-more', sid:sdOrgSid, code:code, r_seq:r_seq }, function(r3) {
                        if(typeof r3.error != 'undefiend' && r3.error) {
                            console.log('step3 reject');
                            step3_deferred.reject(r3.error);
                        }
                        p_step_plus = 0;
                        if(r3.next_step) $.sd.strProcess(r3.next_step);

                        setTimeout(function() {
                            step3_deferred.resolve(r3.next_step);
                        }, 50);
                    }, 'json');
                } else {
                    step3_deferred.resolve('14');
                }

                return step3_deferred.promise();
            },
            stepEnd: function() {
                $.sd.strProcess('end');

                var checkEnd = (sdMore.length > sdIdx+1) ? false : true;
                if(checkEnd) {
                    $('#loading').removeClass('hide');

                    var deleted_modal = $(this).showModalFlat($.lang[LANG]['site.delete.process.end.title'], $.lang[LANG]['site.delete.process.end.description'], true, false, function() {
                        $('.modal.modal-default.fade.in').css('zIndex','');
                        location.href='/';
                    }, 'ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0','','','',function() {
                        location.href='/';
                    });
                } else {
                    $.sd.initVal();
                    setTimeout(function() {
                        $.sd.step0();
                    }, 300);
                }
            }
        }



        if(isDelLangSite) {
            $.sd.initVal();
            $.sd.strProcess('init');
            setTimeout(function() {
                $.sd.step0();
            }, 300);
        } else {
            $.post('/template/siteDelete', { step:'check', sid:sdOrgSid, code:code }, function(r1) {
                if(typeof r1.error != 'undefiend' && r1.error) {
                    alert(r1.error);
                    location.reload();
                    return false;
                }
                sdMore = r1.more_code;

                $.sd.initVal();
                $.sd.strProcess('init');

                setTimeout(function() {
                    $.sd.step0();
                }, 300);
            }, 'json');
        }


    }


    $.fn.siteClone = function(sid, dest_sid, isAddLangSite) {
        var scIdx = -1,
            scSid = [sid],
            scDest = [dest_sid],
            scCheck = { 'popup':false, 'music':false, 'gallery':false, 'forum':false },
            scOrgData = [],
            scDestData = [],
            scTempData = [];

        var p_w = 0, p_max = 100, p_unit = 1,
            p_step_max = 100, p_step_unit = 1, p_step_plus = 1,
            block_view = { 'gallery':1, 'forum':2, 'form':2 };

        $.sc = {
            initVal: function() {
                p_step_max = 100;
                p_step_unit = 1;
                p_step_plus = 1;
              
                scIdx++;
                if(scIdx == 0) {
                    if(isAddLangSite) scCheck = { 'popup':true, 'music':true, 'gallery':true, 'forum':true };
                    else scCheck = { 'popup':false, 'music':false, 'gallery':false, 'forum':false };
                } else if(scIdx > 0) {
                    scDest.push(scSid[scIdx].replace(scSid[0],scDest[0]));
                }

                scOrgData.push({ 'total':0, 'normal_total':0, 'gallery' : { 'total':0 }, 'forum' : { 'total':0 }, 'form' : { 'total':0 } });
                scDestData.push({ 'total':0, 'normal_total':0, 'gallery' : { 'total':0 }, 'forum' : { 'total':0 }, 'form' : { 'total':0 } });
                scTempData.push({ 'gallery':false, 'forum':false, 'form':false });
            },
            strCheck: function() {
                var checkbox = clSVG('checkbox','16','16',false,'');

                return '\
                <div class="check-wrap">\
                    <div class="box">\
                        <div class="newcheckbox hand checkbox">\
                            <label>\
                                <input type="checkbox" class="check-popup" name="check-popup">\
                                ' + checkbox + '\
                            </label>\
                            <span>' + $.lang[LANG]['site.clone.check.popup'] + '</span>\
                        </div>\
                        <div class="newcheckbox hand checkbox">\
                            <label>\
                                <input type="checkbox" class="check-music" name="check-music">\
                                ' + checkbox + '\
                            </label>\
                            <span>' + $.lang[LANG]['site.clone.check.music'] + '</span>\
                        </div>\
                        <div class="newcheckbox hand checkbox">\
                            <label>\
                                <input type="checkbox" class="check-gallery" name="check-gallery">\
                                ' + checkbox + '\
                            </label>\
                            <span>' + $.lang[LANG]['site.clone.check.gallery'] + '</span>\
                        </div>\
                        <div class="newcheckbox hand checkbox">\
                            <label>\
                                <input type="checkbox" class="check-forum" name="check-forum">\
                                ' + checkbox + '\
                            </label>\
                            <span>' + $.lang[LANG]['site.clone.check.forum'] + '</span>\
                        </div>\
                    </div>\
                    <p><span class="error">' + $.lang[LANG]['site.clone.check.info.1'] + '\
                    <svg class="cm-popover-info hand" viewBox="0 0 13 13"  width="13" height="13" tabindex="0" data-toggle="popover" data-html="true" data-placement="top" data-content="' + $.lang[LANG]['site.clone.check.info.3'] + '">\
                        <path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM7 10H6V9h1V10zM7.67 6.75C7.04 7.37 7 7.66 6.99 8H6c0.02-0.63 0.21-1.03 0.88-1.69 0.46-0.47 0.75-0.86 0.76-1.34 0-0.58-0.39-0.95-1.02-0.95 -0.56 0-1 0.14-1.08 0.76C5.53 4.85 5.52 4.93 5.52 5H4.5c-0.01-0.08 0-0.14 0-0.2 0.08-1.3 1.11-1.79 2.17-1.79 1.22 0 2.04 0.84 2.04 1.87C8.7 5.68 8.17 6.27 7.67 6.75z"/>\
                    </svg>' + $.lang[LANG]['site.clone.check.info.2'] + '</span></p>\
                </div>\
                ';
            },
            strProcess: function(step) {
                // console.log('step: ' + step + '');
                // console.log('p_w: '+ p_w + ', p_unit: ' + p_unit);

                var str = '',
                    cnt = '';

                switch(step) {
                    case 'init': // 0%
                        str = $.lang[LANG]['site.clone.process.init'];
                        break;

                    case '1': // 5%
                        if(scIdx == 0) {
                            p_max = 100 / scSid.length;
                            p_unit = p_max / 100;
                        }

                        p_w += p_unit * 5;

                        str = $.lang[LANG]['site.clone.process.step1'];
                        if(!isAddLangSite) {
                            if(!scCheck['popup'] && !scCheck['music']) str = $.lang[LANG]['site.clone.process.step1.1'];
                            else if (scCheck['popup'] && !scCheck['music']) str = $.lang[LANG]['site.clone.process.step1.2'];
                            else if (!scCheck['popup'] && scCheck['music']) str = $.lang[LANG]['site.clone.process.step1.3'];
                        }
                        break;

                    case '2': // 0%
                        str = $.lang[LANG]['site.clone.process.step2'];
                        break;

                    case '2-ok':                        
                        str = $.lang[LANG]['site.clone.process.step2'];
                        cnt = '(0/' + scOrgData[scIdx]['total'] + ')';

                        // step3,4 init
                        p_step_max = p_unit * 60;
                        p_step_unit = p_step_max / scOrgData[scIdx]['total'];
                        break;

                    case '3': // 30%
                        str = $.lang[LANG]['site.clone.process.step3'];
                        cnt = '(' + scDestData[scIdx]['total'] + '/' + scOrgData[scIdx]['total'] + ')';
                        break;

                    case '3-ok':
                        p_w += p_step_unit * p_step_plus;

                        str = $.lang[LANG]['site.clone.process.step3'];
                        cnt = '(' + scDestData[scIdx]['total'] + '/' + scOrgData[scIdx]['total'] + ')';
                        break;

                    case '4': // 5%
                        p_w += p_unit * 5;

                        str = $.lang[LANG]['site.clone.process.step4'];
                        cnt = '(' + scDestData[scIdx]['total'] + '/' + scOrgData[scIdx]['total'] + ')';
                        break;

                    case '5': // 30%
                        p_w += p_step_unit * p_step_plus;

                        str = $.lang[LANG]['site.clone.process.step5'];
                        cnt = '(' + scDestData[scIdx]['total'] + '/' + scOrgData[scIdx]['total'] + ')';
                        break;

                    case '6': // 5%
                        p_w += p_unit * 5;

                        str = $.lang[LANG]['site.clone.process.step6'];
                        cnt = '(' + scDestData[scIdx]['resource']['total'] + '/' + scOrgData[scIdx]['resource']['total'] + ')';

                        // step7 init
                        p_step_max = p_unit * 20;
                        p_step_unit = p_step_max / scOrgData[scIdx]['resource']['total'];
                        break;

                    case '7': // 20%
                        p_w += p_step_unit;

                        str = $.lang[LANG]['site.clone.process.step7'];
                        cnt = '(' + scDestData[scIdx]['resource']['total'] + '/' + scOrgData[scIdx]['resource']['total'] + ')';
                        break;

                    case '8': // 5%
                        p_w = p_max * (scIdx+1);

                        var checkEnd = (scSid.length > 1 && scSid.length > scIdx+1) ? false : true;

                        str = $.lang[LANG]['site.clone.process.step8'];
                        cnt = (checkEnd) ? '' : '<br>' + $.lang[LANG]['site.clone.process.step8.more'];

                        if(checkEnd) {
                            setTimeout(function() {
                                $.progressOFF();
                            }, 500);
                        }
                        break;

                    default:
                        break;
                }


                if(step == 'init' && scIdx == 0) {
                    $.progressON(str,'','',true);
                } else {
                    $('.progressModal .progress-header h1').html(str + cnt);
                    $('.progressModal .progress-bar').css('width',p_w+'%');
                }

                // console.log('p_w: '+ p_w + ', p_unit: ' + p_unit);
            },
            step0: function() {

                var scStep1 = $.sc.step1();
                scStep1.done(function() {
                    var scStep2 = $.sc.step2();
                    scStep2.done(function() {
                        $.sc.step3Call(1);
                    }).fail(function(scStep2_msg) {
                        console.log('scStep2 fail');
                        console.log(scStep2_msg);

                        $.sc.step8();
                        if(scStep2_msg) $(this).showModalFlat('<?=$this->lang->line("lang.delete.modal.title")?>', scStep2_msg, false, false,'', 'ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0');
                    });
                }).fail(function(scStep1_msg){
                    console.log(scStep1_msg);

                    $.sc.step8();
                    if(scStep1_msg) $(this).showModalFlat('<?=$this->lang->line("lang.delete.modal.title")?>', scStep1_msg, false, false,'', 'ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0');
                });
            },
            step1: function() { // [clone] pf_site | [get] org pf_site 
                var step1_deferred = $.Deferred();

                $.post('/template/siteClone', { step:'1', sid:scSid[scIdx], dest_sid:scDest[scIdx], check:scCheck, isAddLangSite:isAddLangSite }, function(r1) {
                    if(typeof r1.error != 'undefiend' && r1.error) {
                        console.log('step1 error: ' + r1.error);

                        var error_msg = (r1.error == 'already_dest') ? '복제가 정상적으로 안되었으니 삭제 후 다시 시도해주세요.' : 'Site Clone Step1 Error';
                        step1_deferred.reject(error_msg);
                    }

                    scOrgData[scIdx]['pfsite'] = r1.org_site;
                    if(scIdx == 0 && r1.site_langs !== null) scSid = r1.site_langs;
                    $.sc.strProcess('1');

                    setTimeout(function() {
                        step1_deferred.resolve();
                    }, 300);
                }, 'json');
                
                return step1_deferred.promise();
            },
            step2: function() { // [get] block total
                var step2_deferred = $.Deferred();
                $.sc.strProcess('2');

                $.post('/template/siteClone', { step:'2', sid:scSid[scIdx], check:scCheck }, function(r2) {
                    if(typeof r2.error != 'undefiend' && r2.error) {
                        console.log('step2 reject');
                        step2_deferred.reject(r2.error);
                    }

                    scOrgData[scIdx]['total'] = r2.data.total;
                    scOrgData[scIdx]['normal_total'] = r2.data.normal_total;
                    $.sc.strProcess('2-ok');

                    setTimeout(function() {
                        step2_deferred.resolve();
                    }, 300);
                }, 'json');
                
                return step2_deferred.promise();
            },
            step3Call: function(page) {

                var view = 100,
                    checkNextStep = (Math.ceil(scOrgData[scIdx]['normal_total']/view) < page) ? true : false;

                if(checkNextStep) {
                    var scStep4 = $.sc.step4();
                    scStep4.done(function(data4) {
                        $('.progress-content').append('\
                            <div class="clone-section" data-sid="' + scSid[scIdx] + '" data-sid="' + scDest[scIdx] + '">\
                                <ul class="clone-block-list"></ul>\
                                <ul class="clone-resource-list"></ul>\
                            </div>\
                        ');
                        $.each(data4, function(key,total) {
                            // if(key == 'gallery_items') return true;
                            if(key == 'total') return true;
                            if(total > 0) {
                                var view = block_view[key],
                                    total_page = (total > view) ? Math.ceil(total/view) : 1,
                                    view_start = 1,
                                    view_end = (total > view) ? view : total;

                                for(var idx=1; idx<=total_page; idx++) {
                                    if(idx > 1) {
                                        view_start = view_end + 1;
                                        view_end = (total > (view*idx)) ? view*idx : total;
                                    }

                                    var btn_target = (view === 1 || view_end == 1) ? '' : '(' + view_start + '~' + view_end + ')',
                                    btn_str = key + ' ' + idx + btn_target,
                                    btn_html = '<button type="button" class="btn btn-primary site-clone-step5" data-start="'+view_start+'" data-end="'+view_end+'">'+btn_str+'</button>';
                                    $('.progress-content .clone-section[data-sid="' + scSid[scIdx] + '"] .clone-block-list').append('<li class="'+ key +'">' + btn_html + '</li>');
                                }
                            }
                        });

                        $.sc.step5Call(0);

                    }).fail(function(scStep4_msg){
                        console.log(scStep4_msg);

                        $.sc.step8();
                        if(scStep4_msg) $(this).showModalFlat('<?=$this->lang->line("lang.delete.modal.title")?>', scStep4_msg, false, false,'', 'ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0');
                    });

                    return false;
                }

                var scStep3 = $.sc.step3(page);
                scStep3.done(function() {
                    $.sc.step3Call(page+1);
                }).fail(function(scStep3_msg){
                    console.log(scStep3_msg);

                    $.sc.step8();
                    if(scStep3_msg) $(this).showModalFlat('<?=$this->lang->line("lang.delete.modal.title")?>', scStep3_msg, false, false,'', 'ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0');
                });

            },
            step3: function(page) { // [clone] pf_page > normal block
                var step3_deferred = $.Deferred();

                $.sc.strProcess('3');
                $.post('/template/siteClone', { step:'3', sid:scSid[scIdx], dest_sid:scDest[scIdx], check:scCheck, page:page, isAddLangSite:isAddLangSite }, function(r3) {
                    if(typeof r3.error != 'undefiend' && r3.error) {
                        console.log('step3 reject');
                        step3_deferred.reject(r3.error);
                    }

                    p_step_plus = r3.data.insert_total;
                    scDestData[scIdx]['total'] += r3.data.insert_total;
                    $.sc.strProcess('3-ok');

                    setTimeout(function() {
                        step3_deferred.resolve();
                    }, 200);
                }, 'json');
                
                return step3_deferred.promise();
            },
            step4: function() { // [get] (gallery / form / forum) block total
                var step4_deferred = $.Deferred();

                $.post('/template/siteClone', { step:'4', sid:scSid[scIdx], check:scCheck }, function(r4) {
                    if(typeof r4.error != 'undefiend' && r4.error) {
                        console.log('step4 reject');
                        step4_deferred.reject(r4.error);
                    }

                    scOrgData[scIdx]['gallery']['total'] = r4.data.gallery;
                    scOrgData[scIdx]['forum']['total'] = r4.data.forum;
                    scOrgData[scIdx]['form']['total'] = r4.data.form;
                    $.sc.strProcess('4');

                    setTimeout(function() {
                        step4_deferred.resolve(r4.data);
                    }, 300);
                }, 'json');
                
                return step4_deferred.promise();
            },
            step5Call: function(cnt) {
                var cloneBlock = $('.progress-content .clone-section[data-sid="' + scSid[scIdx] + '"] .clone-block-list li').eq(cnt);
                if(cloneBlock.length == 0) {
                    $.sc.step6();
                    return false;
                }

                var cloneBlockBtn = cloneBlock.find('button'),
                    key = cloneBlock.attr('class'),
                    start = cloneBlockBtn.attr('data-start'),
                    end = cloneBlockBtn.attr('data-end'),
                    more = (typeof cloneBlockBtn.attr('data-more') != 'undefined' && cloneBlockBtn.attr('data-more')) ? cloneBlockBtn.attr('data-more') : '';

                var scStep5 = $.sc.step5(key,cnt,start,end,more);
                scStep5.done(function(checkMore) {
                    if(checkMore) $.sc.step5Call(cnt);
                    else $.sc.step5Call(cnt+1);
                }).fail(function() {
                    console.log('scStep5 fail');
                });
            },
            step5: function(key,cnt,start,end,more) { // [clone] pf_page > (gallery / form / forum) block
                var step5_deferred = $.Deferred();

                var cloneBlock = $('.progress-content .clone-section[data-sid="' + scSid[scIdx] + '"] .clone-block-list li').eq(cnt),
                    cloneBlockBtn = cloneBlock.find('button'),
                    block_insert_data = scTempData[scIdx][key];

                $.post('/template/siteClone', { step:'5', sid:scSid[scIdx], dest_sid:scDest[scIdx], check:scCheck, insert_data:block_insert_data, btype:key, bstart:start, bend:end, more:more }, function(r5) {

                    if(typeof r5.error != 'undefined' && r5.error) {
                        console.log('step5 reject');
                        console.log('Gallery / form / forum Clone error::' + scSid[scIdx] + ', ' + r5.error);
                        $('.progress-content .clone-section[data-sid="' + scSid[scIdx] + '"] .clone-block-list li').eq(cnt).append('<span class="error">'+r5.error+'</span>');
                        step5_deferred.reject();

                    } else $('.progress-content .clone-section[data-sid="' + scSid[scIdx] + '"] .clone-block-list .error').remove();

                    scDestData[scIdx]['total'] = scDestData[scIdx]['total'] + r5.data.total;
                    scTempData[scIdx][key] = Object.assign(block_insert_data, r5.data.insert_data);

                    var check_more = false;
                    if(typeof r5.data.more != 'undefiend' && r5.data.more) {
                        check_more = true;
                        
                        var more_str = r5.data.more,
                            more_arr = more_str.split(','),
                            more_btn_str = more_arr[2]+'/'+more_arr[3];
                        cloneBlockBtn.attr('data-more',r5.data.more);
                        if(cloneBlockBtn.find('.next').length > 0) cloneBlockBtn.find('.next').text(more_btn_str);
                        else cloneBlockBtn.append('<span class="next">('+more_btn_str+')</span>');
                    } else {
                        p_step_plus = r5.data.total;
                        $.sc.strProcess('5');
                        cloneBlockBtn.attr('disabled',true);
                    }

                    setTimeout(function() {
                        step5_deferred.resolve(check_more);
                    }, 200);
                }, 'json');


                return step5_deferred.promise();
            },
            step6: function() { // [get] pf_resource seq & total
                console.log(scSid[scIdx]);

                $.post('/template/siteClone', { step:'6', sid:scSid[scIdx] }, function(r6) {

                    var cloneSection = $('.progress-content .clone-section[data-sid="' + scSid[scIdx] + '"] .clone-resource-list');
                    if(typeof r6.error != 'undefined' && r6.error) {
                        console.log('step6 reject');
                        console.log('Resorce Clone error::' + scSid[scIdx] + ', ' + r6.error);
                        cloneSection.before('<span class="error">'+r6.error+'</span>');
                        return false;
                    } else $('.error').remove();

                    var r_view = 30,
                        r_total = r6.count,
                        r_add = 0;
                    
                    scOrgData[scIdx]['resource'] = {
                        'total' : r_total,
                        'list' : r6.list
                    };
                    scDestData[scIdx]['resource'] = {
                        'total' : 0,
                        'list' : new Array()
                    };
                    $.sc.strProcess('6');

                    if(r_total == 0) {
                        $.sc.step8();
                        return false;
                    }

                    $.each(r6.list, function(rs_i,rs_v) {
                        r_add++;
                        var mod = r_add%r_view;
                        if(mod === 1) cloneSection.append('<li></li>');
                        cloneSection.find('li:last-child').append('<span>' + rs_v.seq + '</span>');

                        if(r_add == r_total) {
                            $.sc.step7Call(0,0);
                        }
                    });
                }, 'json');
            },
            step7Call: function(rs_eq1,rs_eq2) {
                var cloneResource = $('.progress-content .clone-section[data-sid="' + scSid[scIdx] + '"] .clone-resource-list');
                    rs_li_total = cloneResource.find('li').length;
                if(rs_eq1 >= rs_li_total) {
                    $.sc.step8();
                    return false;
                }

                var cloneResourceli = cloneResource.find('li').eq(rs_eq1),
                    rs_span_total = cloneResourceli.find('span').length;
                if(rs_eq2 >= rs_span_total) {
                    $.sc.step7Call(rs_eq1+1,0);
                    return false;
                }

                var cloneResourceSpan = cloneResourceli.find('span').eq(rs_eq2),
                    rs_seq = cloneResourceSpan.text();
                if(rs_seq == '') {
                    $.sc.step8();
                    return false;
                }

                var scStep7 = $.sc.step7(rs_seq);
                scStep7.done(function() {
                    if(rs_eq2+1 < rs_span_total) $.sc.step7Call(rs_eq1,rs_eq2+1);
                    else $.sc.step7Call(rs_eq1+1,0);
                }).fail(function() {
                    console.log('scStep7 fail');
                });
            },
            step7: function(rs_seq) { // [clone] pf_resource
                var step7_deferred = $.Deferred();

                $.post('/template/siteClone', { step:'7', sid:scSid[scIdx], dest_sid:scDest[scIdx], r_seq:rs_seq }, function(r7) {

                    if(typeof r7.error != 'undefined' && r7.error) {
                        console.log('step7 reject');
                        console.log('Resorce Clone error::' + rs_seq + ', ' + r7.error);
                        $('.progress-content .clone-section[data-sid="' + scSid[scIdx] + '"] .clone-resource-list li span[data-seq="' + rs_seq + '"]').addClass('error');
                        step7_deferred.reject();

                    } else $('.progress-content .clone-section[data-sid="' + scSid[scIdx] + '"] .clone-resource-list li .error').remove();

                    scDestData[scIdx]['resource']['total'] = scDestData[scIdx]['resource']['total'] + 1;
                    scDestData[scIdx]['resource']['list'].push(rs_seq);
                    $.sc.strProcess('7');

                    setTimeout(function() {
                        step7_deferred.resolve();
                    }, 100);
                }, 'json');

                return step7_deferred.promise();
            },
            step8: function() { // check other site(language site)
                $.sc.strProcess('8');

                if(isAddLangSite || scIdx+1 == scSid.length) {
                    location.reload();
                } else {
                    $.sc.initVal();
                    setTimeout(function() {
                        $.sc.step0();
                    }, 500);
                }
            }
        }


        $.sc.initVal();
        if(isAddLangSite) {
            $.sc.strProcess('init');
            setTimeout(function() {
                $.sc.step0();
            }, 600);
        } else {
            var scCheckModal = $(this).showModalFlat($.lang[LANG]['site.clone.check.title'], $.sc.strCheck(), true, true, function() {
                $.sc.strProcess('init');

                scCheck.popup = $('.check-popup').prop('checked');
                scCheck.music = $('.check-music').prop('checked');
                scCheck.gallery = $('.check-gallery').prop('checked');
                scCheck.forum = $('.check-forum').prop('checked');
                
                setTimeout(function() {
                    $.sc.step0();
                    scCheckModal.modal('hide');
                }, 600);
            },'cancel','','cl-siteclone cl-cmmodal cl-s-btn w560 cl-p70 cl-p0','','',function() { $('[data-toggle="popover"]').popover(); });
        }
    }
    

    $.musicON = function(play) {
        play = (typeof play == 'undefined') ? true : play;
        var tpl = '\
            <div id="cl-music-player" class="cl-mplayer"></div>\
            <div id="cl-music-container" class="jp-audio" role="application" aria-label="media player">\
                <div class="jp-type-playlist">\
                    <div class="jp-gui jp-interface">\
                        <div class="jp-controls-holder">\
                            <div class="jp-controls">\
                                <div class="music-player-controls">\
                                    <span class="jp-backward" role="button" tabindex="0"><i class="fa fa-backward" aria-hidden="true"></i></span>\
                                    <span class="jp-play" role="button" tabindex="0"><i class="fa fa-pause" aria-hidden="true"></i></span>\
                                    <span class="jp-forward" role="button" tabindex="0"><i class="fa fa-forward" aria-hidden="true"></i></span>\
                                </div>\
                                <div class="music-player-progress">\
                                    <div class="jp-progress">\
                                        <div class="jp-seek-bar">\
                                            <div class="jp-play-bar"></div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="jp-lists">\
                                    <span class="music-lists" role="button" tabindex="0">LIST</span>\
                                </div>\
                                <div class="music-playlist-wrap">\
                                    <div class="jp-playlist"><ul class="music-playlist"><li></li></li></div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="jp-no-solution">\
                        <span>Update Required</span>\
                        To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.\
                    </div>\
                </div>\
            </div>\
            ',
            equalizer_img = ($('body').width() < 769) ? 'https://storage.googleapis.com/i.addblock.net/equal_stop.gif' : 'https://storage.googleapis.com/i.addblock.net/equal.gif',
            checkFree = (!property.VALIDPLAN || property.VALIDTYPE == 'FR' || property.VALIDPLAN == 'PK') ? true : false,
            move_position = (checkFree) ? 'class="moved"' : '',
            vpModeOnoff = (property.SETTINGS.vpMode_onoff === true) ? true : false,
            vpOption = (property.SETTINGS.viewportMode) ? property.SETTINGS.viewportMode : '',
            WebType = $.mpcWeb.mpcCheckWebType(),
            checkFnav = ($('.fnav').length > 0 && vpOption=='mobile_web') ? true : false,
            $music_icon = $('<div id="cl-music-player-icon" '+move_position+'><img src="' + equalizer_img + '" class="hand"></div>');

        $('#goto-top').after($music_icon);
        $('#cl-music-player-icon').after(tpl);

        if($('.fnav').length > 0) {
            if(window.innerWidth <= 480) {
                $('#goto-top').addClass('movedOne');
                $music_icon.addClass('movedOne');
            }
        }

        if(vpModeOnoff && WebType == 'MOBILE') $.mpcWeb.mpcMusicandGoTop(checkFnav,vpOption);

        ($('body').width() < 769) ? $('.jp-play i').removeClass('fa-pause').addClass('fa-play').parent().addClass('pause') : '';
        var music = (typeof property == 'undefined') ? [] : property.MUSIC;

        if(music.length==0) {
            $music_icon.addClass('hide');
            $music_icon.removeClass('movedOne');
            $('#goto-top').removeClass('movedOne');
        }
        var myPlaylist = new jPlayerPlaylist({
            jPlayer: '#cl-music-player',
                cssSelectorAncestor: '#cl-music-container'
            }, music, {
            playlistOptions: {
                loop: true,
                autoPlay: play,
                loopOnPrevious: true,
                enableRemoveControls: false
            },
            ended: function() { 
                // var $item = $('.music-playlist li'),
                //     idx = $item.parent().find('.active').index(),
                //     active = (idx+1 > $item.length) ? 0 : idx+1;

                // $item.removeClass('active');
                // $item.eq(active).addClass('active');
            },            
            swfPath: '/js',
            solution: 'html, flash',
            supplied: 'mp3',
            preload: 'metadata',
            volume: 1,
            loop: true,
            muted: false,
            backgroundColor: '#000000',

            smoothPlayBar: true,
            keyEnabled: true,
            audioFullScreen: false // Allows the audio poster to go full screen via keyboard
        });

        $music_icon.click(function() {
            $(this).toggleClass('show');
            if($(this).hasClass('show')) {
                $('#cl-music-container').css('display','block');
            } else {
                $('#cl-music-container').css('display','none');
            }
        });

        var $play = $('.jp-play'),
            $next = $('.jp-forward'),
            $prev = $('.jp-backward'),
            $list = $('.music-lists'),
            $playlist_wrap = $('.music-playlist-wrap'),
            $playlist = $('.music-playlist'),
            $item = $('.music-playlist li');

        $playlist.empty();
        if(myPlaylist.playlist.length) {
            var index = myPlaylist.current;
            $.each(myPlaylist.playlist, function(i,v) {
                var active = (i == index) ? 'jp-playlist-current' : '',
                    item = '<li class="' + active + '" data-music-index="' + i + '"><span class="hand">' + v.title + '</span></li>';
                $playlist.append(item);
            });
        }

        $list.click(function() {
            $playlist_wrap.toggle();
            if($playlist_wrap.css('display') == 'block') {
                $list.text('CLOSE');
            } else {
                $list.text('LIST');
            }
        });

        $('body').on( 'click', '.music-playlist li a', function(e) {
            var $pause_icon = '<i class="fa fa-pause"></i>';
                $equalizer = $("#cl-music-player-icon"),
                src = 'https://storage.googleapis.com/i.addblock.net/equalizer.gif',
            $equalizer.find('img').attr('src',src);
            $('.jp-play').removeClass('pause');
            $('.jp-play').html($pause_icon);
        });

        $('.music-playlist li span').click(function() {
            var idx = $(this).parent().attr('data-music-index');
            if(typeof idx == 'undefined') return;
            myPlaylist.play(idx);
            myPlaylist.current = idx;
            $('.music-playlist li').removeClass('jp-playlist-current');
            $('.music-playlist li').eq(idx).addClass('jp-playlist-current');
            // $.musicPlay();
        });

        $play.click(function() {
            if($(this).hasClass('pause')) {
                $.musicPlay();
            } else {
                $.musicPause();
            }
        });
        $next.click(function() {
            $.musicNext(myPlaylist);

        });
        $prev.click(function() {
            $.musicPrev(myPlaylist);
        })

        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
                $.musicPause();
            }
        };
        // myPlaylist.play();
        // $('#cl-music-player').jPlayer('play');
    }
    $.musicPause = function() {
        var $play_icon = '<i class="fa fa-play"></i>',
            $equalizer = $('#cl-music-player-icon'),
            src = 'https://storage.googleapis.com/i.addblock.net/equal_stop.gif';
        $equalizer.find('img').attr('src',src);
        $('.jp-play').addClass('pause');
        $('.jp-play').html($play_icon);
        $('#cl-music-player').jPlayer('pause');
    }
    $.musicPlay = function() {
        var $pause_icon = "<i class='fa fa-pause'></i>";
            $equalizer = $('#cl-music-player-icon'),
            src = 'https://storage.googleapis.com/i.addblock.net/equalizer.gif',
        $equalizer.find('img').attr('src',src);
        $('.jp-play').removeClass('pause');
        $('.jp-play').html($pause_icon);
        $('#cl-music-player').jPlayer('play');
    }
    $.musicStop = function() {
        $('#cl-music-player').jPlayer('stop');
    }
    $.musicRepeat = function() {
    }
    $.musicOFF = function() {
    }
    $.musicNext = function(player) {
        player.next();
        var index = player.current;
        $.musicPlay();
    }
    $.musicPrev = function(player) {
        player.previous();
        var index = player.current;
        $.musicPlay();
    }


    $.slang = {
        init: function(data) {
            if(typeof data != 'undefined' && data) {
                if(PAGE_MODE == 'c') SLANG = data;
                else property.SLANG = data;
            }

            var slang = (PAGE_MODE == 'c') ? SLANG : property.SLANG;
            if(!$.isEmptyObject(slang)) $.slang.set('on');
            else $.slang.set('off');
        },
        set: function(onoff) {
            if(onoff.match(/on/gi)) $.slang.make();
            else $('#tpl-menu').find('.siteLANG').remove();
        },
        make: function() {
            var slang_data = (PAGE_MODE == 'c') ? SLANG['lists'] : property.SLANG['lists'],
                slang_str = (PAGE_MODE == 'c') ? SLANG['select'] : property.SLANG['select'],
                slang_list = '';

            $.each(slang_data, function(i,o) {
                var active = (o['name'] == slang_str) ? 'active' : '';
                slang_list += '\
                        <li><a href="javascript:;" data-code="' + o['code'] + '">' + o['name'] + '</a></li>\
                ';
            });

            var content = '\
                <li class="siteLANG dropdown">\
                    <a href="javascript:;" class="dropdown-toggle"><span class="slang-active">' + slang_str + '</span> <i class="fa fa-caret-down fa-1" aria-hidden="true"></i></a>\
                    <ul class="dropdown-menu">\
                        ' + slang_list + '\
                    </ul>\
                </li>\
            ';

            if($('#tpl-menu').find('.siteLANG').length > 0) $('#tpl-menu').find('.siteLANG').replaceWith(content);
            else $('#tpl-menu').append(content);
        }
    }


    $.fnav = {
        getFnav: function() {
            var data = (PAGE_MODE == 'c') ? SETTINGS.fnav : property.SETTINGS.fnav;
            if(typeof data == 'undefined' || $.isEmptyObject(data)) data = new Array();
            
            return data;
        },
        getFnavBg: function() {
            var bg = (PAGE_MODE == 'c') ? SETTINGS.fnavBg : property.SETTINGS.fnavBg;
            if(typeof bg == 'undefined' || !bg) bg = '000000';
            else {
                if(bg.indexOf('rgb') > -1) bg = style.getHex(bg).substring(1);
            }

            return bg;
        },
        checkFnavON: function(data) {
            var result = false,
                fnav_data = (typeof data != 'undefined') ? data : $.fnav.getFnav();

            $.each(fnav_data, function(i,obj) {
                if(obj['display'] == 'on') result = true;
            });

            return result;
        },
        draw: function(data) {
            var fnav_data = (typeof data != 'undefined') ? data : $.fnav.getFnav(),
                hasON = $.fnav.checkFnavON(fnav_data);

            if (window.location.href.indexOf('_checkout') != -1) hasON = false;

            if(!hasON) {
                $('.fnav.fnav-mobile-fnav').remove();
            } else {
                var fnav_html = $.fnav.listHTML(fnav_data,hasON);
                if(fnav_html.length > 0) {
                    if($('.dsgn-body').find('.fnav.fnav-mobile-fnav').length > 0) $('.dsgn-body .fnav.fnav-mobile-fnav').replaceWith(fnav_html);
                    else $('.dsgn-body').find('.el-footer').before(fnav_html);
                } else {
                    $('.dsgn-body').find('.fnav.fnav-mobile-fnav').remove();
                }
            }
        },
        listHTML: function(fnav_data,hasON) {
            if(typeof fnav_data == 'undefined') fnav_data = $.fnav.getFnav();
            if(typeof hasON == 'undefined') hasON = $.fnav.checkFnavON(fnav_data);

            var fnav_bg = $.fnav.getFnavBg(),
                str = '';
                
            if(hasON) {
                $.each(fnav_data, function(i,v) {
                    str += $.fnav.itemHTML(v.idx, v.name, v.type, v.value, v.target, v.icon, v.display); 
                });
            }

            return '\
                            <div class="fnav fnav-mobile-fnav" style="background-color: #'+fnav_bg+';">\
                            ' + str + '\
                            </div>\
            ';
        },
        itemHTML: function(idx,name,type,value,target,icon,display) {
            var href = '#', 
                attr_target = (type == "tel") ? ' target=""' : ' target="' + target + '"',
                attr_link = '';

            if(icon == 'empty') icon = '';

            if(value) {
                if(type == "tel") {
                    href = (value.match(/^tel:/)) ? value : 'tel:' + value;
                } else { //link
                    value = (checkBase64Encode(value)) ? Base64.decode(value) : value;
                    
                    var menulist = (PAGE_MODE == 'c') ? MENULIST : property.MENULIST,
                        one = (PAGE_MODE == 'c') ? ONE : property.ONE,
                        view = (PAGE_MODE == 'c') ? VIEW : property.VIEW;

                    href = makeLinkUrl(value,one,view);
                    if(menulist.indexOf(value.replace(/ /g,'-'))>-1) {
                        attr_link = 'data-user-link="' + href + '"';
                    } else if(value.match(/^\@/g)) {
                        attr_link = 'attr-bookmark="' + value.replace(/^\@/g,'') + '"';
                    } else {
                        attr_link = 'attr-link="' + value + '"';
                    }
                }

            }

            if(display != 'on') return '';
            else return '\
                                <div class="fnav-item" data-idx="' + idx + '" data-type="' + type + '">\
                                    <a href="' + href + '" ' + attr_target + ' ' + attr_link + '>\
                                        <i class="' + icon + '" aria-hidden="true"></i>\
                                        <span class="fnav-name">' + name + '</span>\
                                    </a>\
                                </div>\
            ';
        },

    }

    $.mpcWeb = {
        init: function(vpOption,contents,WebType,zoom,pagemove) {   
            var device_w = (vpOption=='mobile_pc') ? 1440 : 'device-width',
                scale = (vpOption=='mobile_pc') ? (window.screen.width / 1440) : 1.0,
                zoom = (zoom) ? '' : ', maximum-scale=1, user-scalable=no',
                mpc_icon = (vpOption == 'mobile_pc') ? '<i class="fa fa-mobile mpc_icon" aria-hidden="true"></i>' : '<i class="fa fa-desktop mpc_icon" aria-hidden="true"></i>',
                checkFnav = ($('.fnav').length > 0 && vpOption=="mobile_web") ? true : false;

            //$.mpcWeb.mpcWebShowcase(vpOption,contents,pagemove);

            $('.dsgn-body .mobilepc_ch .mpc_icon').remove();
            $('.dsgn-body .mobilepc_ch').prepend(mpc_icon);
            
            var viewport = document.querySelector('meta[name="viewport"]');
            if(viewport) viewport.setAttribute('content','width='+device_w+', initial-scale='+scale+''+zoom+'');

            /*if($('.dsgn-body').hasClass('sidebar')) {
                $('.dsgn-body').removeClass('sidebar').addClass('removed-sidebar');
            } else if ($('.dsgn-body').hasClass('removed-sidebar')) {
                $('.dsgn-body').removeClass('removed-sidebar').addClass('sidebar');                
            }*/

            $.mpcWeb.mpcMusicandGoTop(checkFnav,vpOption);     

            if(checkFnav && WebType == 'MOBILE') {
                $('.fnav.fnav-mobile-fnav').css('margin-bottom','53px');
                $('.element.el-footer').css('margin-bottom','100px');
            } else {
                $('.mobilepc_ch').css('margin-bottom','0px');
                $('.element.el-footer').css('margin-bottom','0px');
            }
        },


        mpcWebhtml: function(vpOption,contents,zoom,pagemove,sid) {
            //if (window.location.href.indexOf('_checkout') != -1) return false;
            sid = (sid) ? sid : (typeof property != 'undefined' ? property.SID : SID);
            pagemove = ((typeof pagemove == 'undefined') || !pagemove) ? '' : pagemove;
            
            $.mpcWeb.mpcCookie(vpOption,sid);

            if($.cookie('vpmode')) {
                vpOption = $.cookie('vpmode');
            }

            var vpChangeText = (vpOption=="mobile_pc") ? $.lang[LANG]['editor.mobile.changePc.mobileWeb'] : $.lang[LANG]['editor.mobile.changePc.mobilePc'],    
                mpc_html = "\
                <div class='mobilepc_ch' data-desktop-option='"+vpOption+"'>\
                    <p class='hand'>\
                        <span class='mpc-name'>" + vpChangeText + "</span>\
                    </p>\
                </div>\
            ",
                WebType = $.mpcWeb.mpcCheckWebType();

            if(WebType == 'MOBILE') {
                if(window.location.href.indexOf('_checkout') == -1) {
                    $('.dsgn-body').find('.mobilepc_ch').remove();
                    $('.dsgn-body').append(mpc_html);
                }                
                $.mpcWeb.init(vpOption,contents,WebType,zoom,pagemove);
                $.mpcWeb.mpcChangeVal(vpOption,contents,WebType,zoom,pagemove,sid);
            }
        },   

        mpcWebShowcase : function(vpOption,contents,pagemove) {
            $.each(contents,function(i,v) {
                var v_el = (pagemove=='pagemove') ? v : v.element;
                if((vpOption == "mobile_pc") && (v_el.type == 'showcase')) $("."+v_el.elname).addClass('mobilePc_height');
                else $("."+v_el.elname).removeClass('mobilePc_height');
            });
            
        },

        mpcChangeVal : function(vpOption,contents,WebType,zoom,pagemove,sid) {
            //if (window.location.href.indexOf('_checkout') != -1) return false;
            sid = (sid) ? sid : (typeof property != 'undefined' ? property.SID : SID);
            $('.mobilepc_ch').on('click', function() {
                vpOption = (vpOption=="mobile_pc") ? 'mobile_web' : 'mobile_pc';
                var vpChangeText = (vpOption=="mobile_pc") ? $.lang[LANG]['editor.mobile.changePc.mobileWeb'] : $.lang[LANG]['editor.mobile.changePc.mobilePc'];
                 
                $.mpcWeb.init(vpOption,contents,WebType,zoom,pagemove);
                
                $(this).find('.mpc-name').text(vpChangeText);
                $(this).attr('data-desktop-option',vpOption);

                if(typeof property != 'undefined') {
                    if(property.ONE && !property.VIEW || property.PAGE == property.MENULINK[0] && !property.VIEW) setSitePopup();
                }
                if($('.element[data-type="gallery"][data-msny="true"]').length > 0) {
                    $('.element[data-type="gallery"][data-msny="true"]').each(function() {
                        RENDER.refreshMasonry($(this).attr('data-name'));
                    });
                }
                $('.element[data-type="gallery"]').each(function() {
                    var elname = 'userEL'+$(this).attr('data-id');
                    if($(this).find('.goption[data-gh]').length>0) {
                        refreshGalleryHeight(elname);  
                    }
                });

                $.mpcWeb.mpcCookie(vpOption,sid);

                if (window.location.href.indexOf('_checkout') != -1) {
                    $('.dsgn-body').find('.mobilepc_ch').remove();
                }
            });
        },

        mpcCheckWebType : function(){
            var filter = "win16|win32|win64|mac|macintel",
                WebType = "";

            if (navigator.platform) {
                if (filter.indexOf(navigator.platform.toLowerCase()) < 0) WebType = "MOBILE";
                else WebType = "PC";
            }

            return WebType;
        },

        mpcMusicandGoTop : function(checkFnav,vpOption) {
            var checkmpc = ($('.mobilepc_ch').length > 0) ? true : false;

            if(checkmpc && vpOption == 'mobile_pc') {
                if($('#cl-music-player-icon').length > 0) $('#goto-top,#cl-music-player-icon').removeClass('moveMpc movepc movedOne').addClass('moved');
                else $('#goto-top,#cl-music-player-icon').removeClass('movedOne moveMpc movepc').addClass('moved');
            } else {
                if(checkFnav) {
                    if($('#cl-music-player-icon').length > 0) {
                        $('#goto-top').css('bottom','');  
                        $('#goto-top,#cl-music-player-icon').removeClass('movedOne movepc moved').addClass('moveMpc');
                    } else $('#goto-top').removeClass('movedOne movepc moved moveMpc').css('bottom','120px');  
                } else {
                    if($('#cl-music-player-icon').length > 0) $('#goto-top,#cl-music-player-icon').removeClass('moveMpc movepc moved').addClass('movedOne');
                    else $('#goto-top,#cl-music-player-icon').removeClass('movedOne movepc moveMpc moved');
                }          
            }
        },
        mpcCookie : function(vpOption,sid) {
            sid = (sid) ? sid : (typeof property != 'undefined' ? property.SID : SID);
            var date = new Date();
            date.setTime(date.getTime() + 6*60*60*1000); // 6h

            $.cookie('vpmode-'+sid, vpOption, { expires: date, path : '/' });
        },
        mpcGetVpmode : function(vpmode,settings,sid) {
            sid = (sid) ? sid : (typeof property != 'undefined' ? property.SID : SID);
            if($.cookie('vpmode-'+sid)) vpmode = $.cookie('vpmode-'+sid);
            else vpmode = (typeof $('.mobilepc_ch').attr('data-desktop-option') != 'undefined') ? $('.mobilepc_ch').attr('data-desktop-option') : settings.viewportMode;
            
            return vpmode;
        }
    }

    /*** shopping Guide Popup ***/
    $.guidePopup = {
        set: function() {
            var str = '\
                    <div class="guide-top">\
                        <h3 class="modal-title guidetitle">'+$.lang[LANG]['editor.meta.shoppingmall.guide.title']+'</h3>\
                        <div class="guide-menu">\
                            <ul>\
                                <li class="active hand">\
                                    <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.1']+'</p>\
                                    <div class="line right"></div>\
                                </li>\
                                <li class="hand">\
                                    <div class="line left"></div>\
                                    <div class="line right"></div>\
                                    <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.2']+'</p>\
                                </li>\
                                <li class="hand">\
                                    <div class="line left"></div>\
                                    <div class="line right"></div>\
                                    <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.3']+'</p>\
                                </li>\
                                <li class="hand">\
                                    <div class="line left"></div>\
                                    <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.4']+'</p>\
                                </li>\
                            </ul>\
                        </div>\
                    </div>\
                    <div class="guide-wrap">\
                        <div class="step">\
                            <div id="step1">\
                                <h3>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.1.title']+'</h3>\
                                <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.1.1.contents']+'</p>\
                                <img class="img-responsive" src="//storage.googleapis.com/i.addblock.net/guide_img01_1.jpg">\
                                <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.1.2.contents']+'</p>\
                                <img class="img-responsive" src="//storage.googleapis.com/i.addblock.net/guide_img01_2.jpg">\
                                <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.1.3.contents']+'</p>\
                                <img class="img-responsive" src="//storage.googleapis.com/i.addblock.net/guide_img01_3.jpg">\
                            </div>\
                            <div id="step2">\
                                <h3>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.2.title']+'</h3>\
                                <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.2.1.contents']+'</p>\
                                <img class="img-responsive" src="//storage.googleapis.com/i.addblock.net/guide_img02_1.jpg">\
                                <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.2.2.contents']+'</p>\
                                <img src="//storage.googleapis.com/i.addblock.net/guide_img02_2.jpg">\
                                <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.2.3.contents']+'</p>\
                                <img class="img-responsive" src="//storage.googleapis.com/i.addblock.net/guide_img02_3.jpg">\
                                <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.2.4.contents']+'</p>\
                                <img class="img-responsive" src="//storage.googleapis.com/i.addblock.net/guide_img02_4.jpg">\
                            </div>\
                            <div id="step3">\
                                <h3>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.3.title']+'</h3>\
                                <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.3.1.contents']+'</p>\
                                <img class="img-responsive" src="//storage.googleapis.com/i.addblock.net/guide_img03_1.jpg">\
                                <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.3.2.contents']+'</p>\
                                <img class="img-responsive" src="//storage.googleapis.com/i.addblock.net/guide_img03_2.jpg">\
                            </div>\
                            <div id="step4">\
                                <h3>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.4.title']+'</h3>\
                                <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.4.1.contents']+'</p>\
                                <img class="img-responsive" src="//storage.googleapis.com/i.addblock.net/guide_img04_1.jpg">\
                                <p>'+$.lang[LANG]['editor.meta.shoppingmall.guide.step.4.2.contents']+'</p>\
                                <img class="img-responsive" src="//storage.googleapis.com/i.addblock.net/guide_img04_2.jpg">\
                            </div>\
                        </div>\
                        <div class="modal-footer guideClose">\
                            <button type="button" class="btn btn-default btn-sm close-button-dialog clostbtnfalse" data-dismiss="modal">닫기</button>\
                        </div>\
                    </div>\
                    ';
                                                    
            var shopguideModal = $(this).showModalFlat('',str,true,false,'','close','','guidePopup cl-cmmodal cl-s-btn cover w700', false ,'',function() {
                $.guidePopup.scrollevent();
            });
        },
        scrollevent : function() {
            $('.guidePopup-wrap').on('shown.bs.modal', function(e) {                    
                $('.guidePopup .guide-wrap').scroll(function() {
                    if($(this).hasClass('moving')) return false;
                    var scrollValue = $('.guidePopup .guide-wrap').scrollTop(),
                        issclogin = ($('.guidePopup').attr('class').indexOf('sclogin') > 0 || $('.guidePopup').attr('class').indexOf('naverpay-guide') > 0) ? true : false,
                        isCert = ($('.guidePopup').attr('class').indexOf('cert-guide-modal') > 0)? true : false;

                    if(issclogin || isCert) {
                        if( scrollValue >= $("#step2").position().top && scrollValue < $("#step3").position().top) {
                            $('.guidePopup ul li:visible').eq(1).addClass('active').siblings().removeClass('active');
                            $('.guidePopup ul li:visible').eq(1).css('zIndex', '2').siblings().css('zIndex', '1');
                        } else if( scrollValue >= $("#step3").position().top) {
                            $('.guidePopup ul li:visible').eq(2).addClass('active').siblings().removeClass('active');
                            $('.guidePopup ul li:visible').eq(2).css('zIndex', '2').siblings().css('zIndex', '1');
                        } else {
                            $('.guidePopup ul li:visible').eq(0).addClass('active').siblings().removeClass('active');
                            $('.guidePopup ul li:visible').eq(0).css('zIndex', '2').siblings().css('zIndex', '1');
                        }
                    } else {
                        if( scrollValue >= $("#step2").position().top && scrollValue < $("#step3").position().top) {
                            $('.guidePopup ul li').eq(1).addClass('active').siblings().removeClass('active');
                            $('.guidePopup ul li').eq(1).css('zIndex', '2').siblings().css('zIndex', '1');
                        } else if( scrollValue >= $("#step3").position().top && scrollValue < $("#step4").position().top) {
                            $('.guidePopup ul li').eq(2).addClass('active').siblings().removeClass('active');
                            $('.guidePopup ul li').eq(2).css('zIndex', '2').siblings().css('zIndex', '1');
                        } else if($("#step4").length > 0 && scrollValue >= $("#step4").position().top) {
                            $('.guidePopup ul li').eq(3).addClass('active').siblings().removeClass('active');
                            $('.guidePopup ul li').eq(3).css('zIndex', '2').siblings().css('zIndex', '1');
                        } else {
                            $('.guidePopup ul li').eq(0).addClass('active').siblings().removeClass('active');
                            $('.guidePopup ul li').eq(0).css('zIndex', '2').siblings().css('zIndex', '1');
                        }
                    }
                    
                });

                $('.guidePopup .guide-menu li').click(function() {
                    if($('.guidePopup .guide-wrap').hasClass('moving')) return false;
                    $('.guidePopup .guide-wrap').addClass('moving');
                    var top = ($(this).index())+1,
                        top_position = (top==1) ? $('#step'+top).position().top : ($('#step'+top).position().top)+60;
                   
                    $('.guidePopup .guide-wrap').animate({scrollTop : top_position}, 1000, 'easeInOutExpo');

                    setTimeout(function() {
                        $('.guidePopup .guide-wrap').removeClass('moving');
                    },1000);

                    $(this).addClass('active').siblings().removeClass('active');
                    $(this).css('zIndex', '2').siblings().css('zIndex', '1');                    
                });
            });
        }
    }

    //mobile정보 가져오기
    var mrequest_uri = location.pathname + location.search;
    function getMobileInfo(data) {        
        var page = location.pathname.split('/')[1],
            mb = data.mb,
            paidUser = data.paidUser,
            settings_url = data.settings_url,
            sid = data.sid,
            valid_plan = data.valid_plan,
            site_nickname =  (typeof $('.site-username').text() != 'undefined' && $('.site-username').text()) ? $('.site-username').text() : data.site_nickname,
            site_profile = (typeof $('#dashboard-image-top image').attr('xlink:href') != 'undefined' && $('#dashboard-image-top image').attr('xlink:href')) ? $('#dashboard-image-top image').attr('xlink:href') : data.site_profile,
            umprofile = data.umprofile,
            newCount = data.newCount;
            
        mb.mb_id = (mb.mb_id) ? mb.mb_id : mb.um_id;

        if(mb.mb_id){
            var empty = (mb.mb_id) ? '' : 'empty',
                newMessage = (newCount == 0) ? false : true,
                badge = newMessage ? "<span class='badge'></span>" : "";

            var adminhtml = (mb.mb_level >= 10) ? '<li><a href="/adm" target="_blank">Admin</a></li>' : '',
                mypage = ((window.location.host).indexOf('creatorlink-gabia.com') > -1) ? '/dashboard' : '/mypage',
                uadminmypage = (data.is_uadmin == false) ? mypage : 'javascript:;',
                siteum = (data.is_uadmin == false) ? '' : 'siteUM',
                mypage = (data.is_uadmin == false) ? '' : 'mypage',
                dashboarduadmin = (data.is_uadmin == false) ? '/' : '/_admin/dashboard', 
                marketinguadmin = (data.is_uadmin == false) ? '/marketing' : '/_admin/marketing'; 

            var str = '<div class="nav navbar-nav navbar-right">\
                            <div class="mobile-menu">\
                                    <div class="m-myinfo">\
                                        <div class="profile_left">\
                                            <label class="m-profile hand '+umprofile+'" data-user-img="'+site_profile+'" data-user-plan="'+paidUser+'" data-user-um="'+umprofile+'">\
                                                <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >\
                                                <pattern id="m-dashboard-image-top" patternUnits="userSpaceOnUse" width="60" height="60">\
                                                    <image xlink:href='+site_profile+' x="-10" width="60" height="40"></image>\
                                                </pattern><circle cx="20" cy="20" r="20" fill="url(#m-dashboard-image-top)"></circle></svg>\
                                            </label>\
                                            <div class="inner-box hand">\
                                                <span class="name-text m-profile m-text-size">'+site_nickname+'</span>\
                                            </div>\
                                        </div>\
                                        <div class="profile_right">';
                                            if(data.is_uadmin) {
                                                str += '<div class="mlogout siteUM"><a href="javascript:;" class="logout">'+$.lang[LANG]['header.logout']+'</a></div>';
                                            } else {
                                                str += '<div class="mlogout"><a href="/member/login/out">'+$.lang[LANG]['header.logout']+'</a></div>';
                                            }
                                str +=  '</div>\
                                    </div>\
                                    <div class="mMymenu-wrap"><ul class="mMymenu">'; 
                                    var newCountlink = (data.is_uadmin == false) ? '/' : '/_admin';
                                            str +=  '<li class="newCount prorightmenu">\
                                                    <a href="'+newCountlink+'" class='+empty+'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18px" height="18px"><path d="M16 16.5V9c0-3.6-2.75-6.58-6.25-6.96V0h-1.5v2.04C4.75 2.42 2 5.4 2 9v7.5H0V18h2 14 2v-1.5H16zM3.5 16.5V9c0-3.03 2.47-5.5 5.5-5.5s5.5 2.47 5.5 5.5v7.5H3.5z"/></svg>'+badge+'<span class="menu-title">'+$.lang[LANG]['header.bell']+'</span></a>\
                                                </li>\
                                                <li class="m-mypage prorightmenu '+siteum+'"><a href="'+uadminmypage+'" class="'+mypage+'"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 18" width="17px" height="18px"><path d="M11.55 10.08C13.03 9.09 14 7.41 14 5.5 14 2.46 11.54 0 8.5 0 5.46 0 3 2.46 3 5.5c0 1.91 0.97 3.59 2.45 4.58C2.27 11.31 0 14.4 0 18h1.5c0-3.86 3.14-7 7-7s7 3.14 7 7H17C17 14.4 14.73 11.31 11.55 10.08zM4.5 5.5c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.21-1.79 4-4 4S4.5 7.71 4.5 5.5z"/></svg>\
                                                <span class="menu-title">'+$.lang[LANG]['header.mypage']+'</span></a></li>';
                                        
                                        if(location.host.indexOf('gabia') <= -1) str += '<li class="m-langselect prorightmenu"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18px" height="18px"><path d="M9 0C4.03 0 0 4.03 0 9c0 4.97 4.03 9 9 9s9-4.03 9-9C18 4.03 13.97 0 9 0zM15.33 5h-2.75c-0.27-1.2-0.65-2.25-1.11-3.07C13.08 2.49 14.43 3.58 15.33 5zM11.5 9c0 0.9-0.07 1.74-0.17 2.5H6.67C6.57 10.74 6.5 9.9 6.5 9s0.07-1.74 0.17-2.5h4.65C11.43 7.26 11.5 8.1 11.5 9zM9 16.5c-0.57 0-1.48-1.29-2.03-3.5h4.07C10.48 15.21 9.57 16.5 9 16.5zM6.97 5C7.52 2.79 8.43 1.5 9 1.5s1.48 1.29 2.03 3.5H6.97zM6.53 1.93C6.07 2.75 5.69 3.8 5.42 5H2.67C3.57 3.58 4.92 2.49 6.53 1.93zM1.94 6.5h3.22C5.06 7.29 5 8.13 5 9s0.06 1.71 0.16 2.5H1.94C1.66 10.72 1.5 9.88 1.5 9S1.66 7.28 1.94 6.5zM2.67 13h2.75c0.27 1.2 0.65 2.25 1.11 3.07C4.92 15.51 3.57 14.42 2.67 13zM11.47 16.07c0.47-0.82 0.85-1.87 1.11-3.07h2.75C14.43 14.42 13.08 15.51 11.47 16.07zM16.06 11.5h-3.22C12.94 10.71 13 9.87 13 9s-0.06-1.71-0.16-2.5h3.22C16.34 7.28 16.5 8.12 16.5 9S16.34 10.72 16.06 11.5z"/></svg>\
                                            <span class="menu-title">'+$.lang[LANG]['header.changeLang']+'</span></li>';
                                        str += '</ul></div>\
                                    <ul class="dropdown-menu" role="menu">'+adminhtml+
                                        '<li><a href="'+dashboarduadmin+'"  class="myhome-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 16"  width="18px" height="16px"><path d="M9 0L0 7.03V16h6 6 6V7L9 0zM7.5 14.5v-4h3v4H7.5zM16.5 14.5H12V9H6v5.5H1.5V7.76L9 1.9l7.5 5.83V14.5z"/></svg>'+$.lang[LANG]['mobile.menu.title.mysite']+'</a></li>';
                                    
                                    var supportlink = (location.host.indexOf('gabia') > -1) ? 'http://creatorlink-gabia.com/support' : '/support',
                                        helplink = (location.host.indexOf('gabia') > -1) ? 'http://creatorlink.gabia.com/consult' : '/help',
                                        helptext = (location.host.indexOf('gabia') > -1) ? $.lang[LANG]['mobile.menu.title.gabia.gotocts'] : $.lang[LANG]['mobile.menu.title.gotocts'],
                                        is_uadminMember = (data.is_uadmin) ? '_admin' : 'manager',
                                        memberlink = (valid_plan=='' || valid_plan['type'] == 'BS') ? '#' : '/'+is_uadminMember+'/member/list',
                                        siteNotice = (valid_plan=='' || valid_plan['type'] == 'BS') ? 'siteNotice("manager");' : '';

                                        helplink = (data.is_uadmin == false) ? helplink : '/_admin/help';

                                        str += '<li class="m_memberlist" onclick='+siteNotice+'><a href="'+memberlink+'">'+$.lang[LANG]['mobile.menu.title.memberlist']+'</a></li>';

                                    if(LANG == 'ko' && location.host.indexOf('gabia') <= -1) {
                                        var applySm = (valid_plan['type'] == 'SM') ? '' : 'siteNotice(\'shopping\')',
                                            collapsed = (valid_plan['type'] == 'SM') ? 'collapsed' : '',
                                            smHide = ((valid_plan['type'] == 'BN') && (data.is_uadmin==true)) ? 'hide' : '';

                                        str += '\
                                        <li class="'+collapsed+' mshoppingtab '+smHide+'" onclick="'+applySm+'" data-toggle="collapse" data-target=".mshopping_menu" aria-expanded="true">\
                                            <a type="button" class="collapsed hand">' + $.lang[LANG]['mobile.menu.title.shopping'] + '</a>\
                                        ';
                                        
                                        if(valid_plan['type'] == 'SM') {
                                            var admin_url = (data.is_uadmin == false) ? '' : '/_admin';
                                            
                                            str +=  '\
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10px" height="10px"><polygon points="9 2 5 6 1 2 0 3 4 7 5 8 6 7 10 3 "></polygon></svg>\
                                            </li>\
                                            <ul class="mshopping_menu collapse">\
                                                <li><a href="'+admin_url+'/shopping/product_search/order">'+$.lang[LANG]['mobile.menu.title.shopping.order']+'</a></li>\
                                                <li><a href="'+admin_url+'/shopping/product_search/cancel">'+$.lang[LANG]['mobile.menu.title.shopping.cancel']+'</a></li>\
                                                <li><a href="'+admin_url+'/shopping/product_search/return">'+$.lang[LANG]['mobile.menu.title.shopping.refund']+'</a></li>\
                                                <li><a href="'+admin_url+'/shopping/product_search/exchange">'+$.lang[LANG]['mobile.menu.title.shopping.change']+'</a></li>\
                                                <li><a href="'+admin_url+'/shopping/question_list/P">'+$.lang[LANG]['mobile.menu.title.shopping.qna']+'</a></li>\
                                                <li><a href="'+admin_url+'/shopping/product_search/all">'+$.lang[LANG]['mobile.menu.title.shopping.all']+'</a></li>\
                                                <li><a href="'+admin_url+'/shopping/statistics">'+$.lang[LANG]['mobile.menu.title.shopping.statistics']+'</a></li>\
                                                <li><a href="'+admin_url+'/shopping/point">'+$.lang[LANG]['mobile.menu.title.shopping.point']+'</a></li>\
                                                <li><a href="'+admin_url+'/shopping/setting/W">'+$.lang[LANG]['mobile.menu.title.shopping.setting']+'</a></li>\
                                            </ul>';
                                        } else {
                                            str += '</li>';
                                        }
                                    }

                                    var slog_li = '\
                                        <li><a href="'+admin_url+'/slog">'+$.lang[LANG]['mobile.menu.title.slog']+'</a></li>\
                                    ';

                                    if(valid_plan) {
                                        var pageactive = (page == 'settings') ? 'active' : '',
                                            settingslink = (page == 'settings') ? '#' : settings_url,
                                            helpbox = (data.is_uadmin == false) ? '<li><a href="'+helplink+'">'+helptext+'</a></li>' : ((data.su_eadmin == false) ? '' : '<li><a href="'+helplink+'">'+helptext+'</a></li>'),
                                            settingHide = (data.is_uadmin == true && data.su_eadmin == false) ? 'hide' : '';

                                        str += '<li class="m_marketing '+settingHide+'"><a href="'+marketinguadmin+'">'+$.lang[LANG]['mobile.menu.title.marketing']+'</a></li>\
                                                <li class="'+settingHide+'"><a href="'+settings_url+'">'+$.lang[LANG]['mobile.menu.title.settings']+'</a></li>\
                                        ';
                                        if(location.host.indexOf('gabia') <= -1 && data.is_uadmin == false) str += '<li class="m_plan '+settingHide+'"><a href="/plan">'+$.lang[LANG]['mobile.menu.title.plan.billing']+'</a></li>';

                                        if(valid_plan['type'] == 'SM' && LANG == 'ko') str += slog_li;

                                        if (data.is_uadmin == false) str +='<li><a href="'+supportlink+'">'+$.lang[LANG]['mobile.menu.title.supportcenter']+'</a></li>';                                         

                                        str += helpbox;
                                    }

                            str +=  '</ul>\
                                </div>\
                        </div>'; 
                $('.m-header_user').empty().prepend(str);
        }
        return data;        
    }

    $.mobileToggleMenu = {
        set : function() {
            var request_uri = location.pathname + location.search;
            var returnData = '';

            $.ajax({
                type: 'POST',
                data: { type:'get', sid:SID },
                dataType: 'json',
                url: '/template/getMobileMenu',   
                async:false,
                success : function(data) {
                    returnData = getMobileInfo(data);
                }
            }); 

            $.mobileToggleMenu.clickEvnt();

            return returnData;
            
        },
        setSignIn : function() {
            var langkor = (LANG=='ko') ? '':'hide',
                langen = (LANG=='en') ? '' : 'hide',
                str = '<div class="nav navbar-nav navbar-right signinwrap">\
                        <div class="mobile-menu">\
                                <div class="m-myinfo">\
                                    <div class="profile_left">\
                                        <div class="inner-box hand">\
                                            <a href="/">\
                                            <svg viewBox="0 0 168 38" role="img" class="logo-svg logo-b" data-attach="true" alt="Creatorlink logo"><path class="st11" d="M70.71 12.36c-3.48 0-5.9 2.19-5.9 5.34v4.11c0 3.34 2.17 5.25 5.96 5.25 2.06 0 3.98-0.58 5.41-1.64l0.14-0.11 -1.03-1.95 -0.2 0.1c-1.67 0.85-2.74 1.15-4.11 1.15 -2.23 0-3.23-0.87-3.23-2.83v-0.94h8.62v-3.08C76.37 14.13 74.52 12.36 70.71 12.36zM73.52 18.45h-5.77v-0.92c0-1.91 1.53-2.78 2.96-2.78 2.02 0 2.81 0.78 2.81 2.78V18.45z"/><path class="st11" d="M84.38 12.36c-1.52 0-3.34 0.55-4.87 1.47l-0.17 0.1 1.11 1.95 0.19-0.1c1.41-0.69 2.48-0.98 3.59-0.98 2.22 0 2.93 0.51 2.93 2.1v1.29h-3.64c-3.09 0-4.65 1.47-4.65 4.37 0 1.22 0.39 2.33 1.09 3.12 0.76 0.85 1.84 1.3 3.12 1.3 0.09 0 0.18 0 0.26-0.01 1.37-0.06 2.71-0.51 3.97-0.99l0.04 0.79h2.76v-9.76C90.11 13.76 88.39 12.36 84.38 12.36zM87.17 23.79l-0.01 0c-0.83 0.32-1.87 0.72-3.2 0.73h-0.06c-1.46 0-2.08-0.6-2.08-2.01 0-1.37 0.55-1.92 1.89-1.92h3.47V23.79z"/><path class="st11" d="M101.06 24.31c-0.95 0.23-1.63 0.33-2.26 0.33 -1.16 0-1.27-0.36-1.27-1.31v-8.47h3.9l0-2.22h-3.9V9.26l-2.94 0.01v3.38h-2.56v2.22h2.56v8.86c0 2.31 1.18 3.34 3.82 3.34 1.04 0 2.14-0.18 3.11-0.52l0.17-0.06 -0.4-2.23L101.06 24.31z"/><path class="st11" d="M109.95 12.36c-3.88 0-6.11 1.96-6.11 5.36v3.97c0 3.41 2.23 5.36 6.11 5.36 3.88 0 6.11-1.96 6.11-5.36v-3.97C116.06 14.32 113.84 12.36 109.95 12.36zM113.12 21.78c0 1.89-1.04 2.8-3.17 2.8 -2.13 0-3.17-0.92-3.17-2.8v-4.14c0-1.89 1.04-2.8 3.17-2.8 2.13 0 3.17 0.92 3.17 2.8V21.78z"/><path class="st11" d="M59.07 14.72l0.01-2.07H56.3v14.13h2.94v-9.04c1.75-1.89 4.2-3.24 4.2-3.24l-1.4-1.84C62.04 12.65 60.26 13.76 59.07 14.72z"/><path class="st11" d="M121.93 14.72l0.01-2.07h-2.77v14.13h2.94v-9.04c1.75-1.89 4.2-3.24 4.2-3.24l-1.4-1.84C124.91 12.65 123.12 13.76 121.93 14.72z"/><path class="st11" d="M51.54 22.93c-0.96 1.11-2.12 1.66-3.56 1.66 -2.13 0-3.17-0.92-3.17-2.8v-4.14c0-1.89 1.04-2.8 3.17-2.8 1.73 0 2.83 0.77 3.68 1.52l0.13 0.12 1.99-1.39 -0.13-0.17c-0.76-0.95-2.5-2.55-5.67-2.55 -3.88 0-6.11 1.96-6.11 5.36v3.97c0 3.41 2.23 5.36 6.11 5.36 3.03 0 4.76-1.58 5.68-2.91l0.13-0.18 -2.13-1.18L51.54 22.93z"/><rect x="128.71" y="6.68" class="st11" width="1.2" height="20.07"/><rect x="134.41" y="12.69" class="st11" width="1.2" height="14.06"/><rect x="134.41" y="8.29" class="st11" width="1.2" height="2.18"/><path class="st11" d="M148.67 13.44c-1.68-0.98-5.06-0.52-7.21 0.71V12.5h-1.2v14.25h1.2V15.33c1.74-1.3 5.26-1.79 6.61-1 1.38 0.81 1.38 2.37 1.38 2.43v9.99h1.2v-9.99C150.65 16.67 150.63 14.59 148.67 13.44z"/><polygon class="st11" points="158.27 18.97 164.05 12.69 162.6 12.69 156 19.89 156 6.68 154.8 6.68 154.8 26.75 156 26.75 156 21.44 157.54 19.77 163.6 26.75 165 26.75 "/><path class="st11" d="M3 10.79L3 10.79l0 16.42 14.22 8.21 14.22-8.21V10.79L17.22 2.58 3 10.79zM26.7 13.53L26.7 13.53 26.7 13.53l-4.74 2.74h0l-4.74-2.74 -4.74 2.74v5.47l4.74 2.74 4.74-2.74 4.74 2.74 -9.48 5.47 -9.48-5.47V13.53l9.48-5.47L26.7 13.53 26.7 13.53z"/></svg>\
                                            </a>\
                                        </div>\
                                    </div>\
                                    <div class="profile_right msignin">\
                                        <a href="/member/login" class="mlogin-text" id="m_login_btn_head">'+$.lang[LANG]['mobile.menu.signin']+'</button>\
                                    </div>\
                                </div>\
                                <ul class="dropdown-menu" role="menu">';
                                   if(LANG == 'ko') str += '<li><a href="/mainfunction" class="logoutmenu">'+$.lang[LANG]['mobile.menu.logout.title.mainfunc']+'</a></li>';     
                            str += '<li><a href="/upgrade/site" class="logoutmenu">'+$.lang[LANG]['mobile.menu.logout.title.plan']+'</a></li>\
                                    <li><a href="/template" class="logoutmenu">'+$.lang[LANG]['mobile.menu.logout.title.template']+'</a></li>\
                                </ul>\
                                <div class="mchange-lang">\
                                    <img src="https://storage.googleapis.com/i.addblock.net/lang_kor.png" class="lang-ch '+langkor+'" data-attach="true" alt="Creatorlink logo">\
                                    <img src="https://storage.googleapis.com/i.addblock.net/lang_eng.png" class="lang-ch '+langen+'" data-attach="true" alt="Creatorlink logo">\
                                </div>\
                            </div>\
                    </div>';    

            $('.m-header_user').prepend(str);   

            $.mobileToggleMenu.clickEvnt();
        },
        mobileResize : function(data) {
            getMobileInfo(data);
            $.mobileToggleMenu.clickEvnt();
        },
        clickEvnt : function() {
            $('.navbar-toggle').click(function() {
                $.mobileToggleMenu.open();
                $('.m-header_user').css('left','0');
                $('html').css({'overflow': 'hidden'});
            });
            $('.m-langselect,.lang-ch').on('click',function(){  
                $.mobileToggleMenu.langSelect(mrequest_uri);
            });
            /*$('.applySm').click(function(){
                $(this).showModalFlat('INFORMATION', '쇼핑 기능은 심플쇼핑 요금제로 이용이 가능합니다.<br>심플쇼핑 신청 페이지로 이동할까요?', true, true, function() {
                    location.href = '/shoppingevent';
                }, 'cancel', '이동','mUpgradeSmModal');
            });*/
            $('.mshopping_menu').on('show.bs.collapse',function(e){
                $('.mshoppingtab,.mshoppingtab > a').css('background-color','#eeeff3');
                $('.mshoppingtab svg').remove();
                $('.mshoppingtab > a ').prepend('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10px" height="10px"><polygon points="1 8 5 4 9 8 10 7 6 3 5 2 4 3 0 7 "/></svg>');
            });
            $('.mshopping_menu').on('hide.bs.collapse',function(e){
                $('.mshoppingtab,.mshoppingtab > a').css('background-color','inherit');
                $('.mshoppingtab svg').remove();
                $('.mshoppingtab > a ').prepend('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10px" height="10px"><polygon points="9 2 5 6 1 2 0 3 4 7 5 8 6 7 10 3 "/></svg>');
            });

            $('#loginModal').on('show.bs.modal', function(e) {
                $.mobileToggleMenu.close();
            });
            $('#loginModal').on('shown.bs.modal', function(e) {
                $('html').css({'overflow': 'inherit'});
            });  
        },
        open : function (){
            var height = window.outerHeight;

            $('#nav.default-nav .header .navbar-header a.navbar-toggle,#nav.default-nav .header .navbar_right').css('zIndex','99');
            $('.mobile-detail-popup.billhead,.mobile-detail-popup.helphead').css('height', '100%');
            $('.m-headermenu').remove();
            $('.m-headerClose').addClass('in');
            $('.m-headerClose').removeClass('hide');
            $.mobileToggleMenu.scrollheight();

            $(window).resize(function (){
                $.mobileToggleMenu.scrollheight();
            });
            $('.m-headerClose').click(function(){
                $.mobileToggleMenu.close();
                $('html').css({'overflow': 'inherit'});
            });
        },
        close : function() {
            $('.m-headermenu').remove();
            $('.m-header_user').css('left','-100%');
            $('.m-headerClose').removeClass('in');
            $('.mobile-detail-popup.billhead,.mobile-detail-popup.helphead').css('height', 'auto');
            $('#nav.default-nav .header .navbar_right').css('zIndex','');
            $('#nav.default-nav .header .navbar-header a.navbar-toggle').css('zIndex','120');
        },
        langSelect : function(request_uri) {
            $('.m-headermenu').remove();
            $('.m-header_user.menu').css('left','-100%');
            $('.m-headerClose').addClass('hide');
            $('#nav.default-nav .header .navbar-header a.navbar-toggle').css('zIndex','120');

            var dashlang = (LANG == 'ko') ? 'ko' : 'en',
                html = "<ul class='dashlang-wrap'>\
                            <li class='dashlang-select'>\
                                <a href='/lang/switchLanguage/korean"+request_uri+"'><p class='mdash-lang'>한국어 (KO)</p>\
                                <span class='cl-icon cl-check-lang "+(dashlang == 'ko' ? 'cl_icon_checked04' : 'cl_icon_unchecked04')+"' data-lang='ko'></span></a>\
                            </li>\
                            <li class='dashlang-select'>\
                                <a href='/lang/switchLanguage/english"+request_uri+"'><p class='mdash-lang'>English (EN)</p>\
                                <span class='cl-icon cl-check-lang "+(dashlang == 'en' ? 'cl_icon_checked04' : 'cl_icon_unchecked04')+"' data-lang='en'></span></a>\
                            </li>\
                        </ul>";

            $('.m-dashboard').showModalFlat('',html,false,false,'','','','changelang');
            $('.modal-dialog.changelang').parents('.modal-default').attr('id','changelangModal');

            $('#changelangModal').on('show.bs.modal', function(e) {
                $('.dashlang-select > a').click(function() {
                    var datalang = $('.dashlang-select .cl-check-lang').attr('data-lang');

                    $('.cl-check-lang').each(function () {
                        $(this).addClass('cl_icon_checked04').removeClass('cl_icon_unchecked04');
                    });
                    $(this).addClass('cl_icon_unchecked04').removeClass('cl_icon_checked04');
                });
            });

            $('#changelangModal').on('hide.bs.modal', function(e) {
                $('#nav.default-nav .header .navbar_right').css('zIndex','');
                $('#nav.default-nav .header .navbar-header a.navbar-toggle').css('zIndex','120');
            });
        },
        upgradePopup : function(){
            $(this).showModalFlat('INFORMATION', '쇼핑 기능은 심플쇼핑 요금제로 이용이 가능합니다.<br>심플쇼핑 신청 페이지로 이동할까요?', true, true, function() {
                location.href = '/shoppingevent';
            }, 'cancel', '이동','mUpgradeSmModal');
        },
        scrollheight : function() {
            var menuheight = $(window).height()-135;
            $('.m-header_user .mobile-menu .dropdown-menu').css('height',menuheight);
        }
    }


    $.resource = {
        init : function() {
            var $modal = $('#el-fileupload'),
                fSearch = {'type' : '', 'page' : 1, 'text' : '', 'total' : 0},
                fileDrag = false,
                isEdit = false,
                depfolderClick = false,
                isFEdit = false;


            $('#nestableFolder').nestable({
                maxDepth: 1
            }).on('change', function(el) {
                var prevFolder = $('#nestableFolder-output').val();
                updateOutputFolder($('#nestableFolder').data('output', $('#nestableFolder-output')));
            });

            $modal.on('show.bs.modal', function (e) {
                ADD = false;
                UPLOAD = 0;
                UPLOADED = 0;
                UPLOADSIZE = 0;
                cPage = 1;
                initResource();
                resourceGetPage(1,SFOLDER_ACTIVE);

                $('.resource-selectAll').show();
                
                if($('.fli.active').length == 0 ) {
                    $('.fli[data-id="all"]').click();
                } 
                $('.resource-useit').removeClass('active');

                $('.progress .progress-bar').css({
                    'width' : '0%',
                    'padding-right' : '0px'
                }).text('');
            });

            $modal.on('hide.bs.modal', function (e) {
                $('#nestableFolder').removeAttr('style');

                if($('.fli.active[data-id="clEmptyFolder"]').length > 0 ) {//new folder name_input open
                    $('.fli.active[data-id="clEmptyFolder"]').remove();
                    isFEdit = false;
                }
                if($('#nestableFolder .fli.active .dd-fln').find('input').length > 0 ) { //edit folder name_input open
                    $('#nestableFolder .fli.active .dd-fln').find('input').val('').closest('li.fli').find('.fln-group, .btn-fln-cancel').remove();
                    isFEdit = false;
                }

                if($('#el-property [data-loop-type="matrix"] .attach-thumb[data-toggle="modal"]').length > 0 ) { //clear matrix loop item - modal toggle
                    var idx =  $('#el-property [data-loop-type="matrix"] .attach-thumb[data-toggle="modal"]').attr('idx');
                    $('#el-property [data-loop-type="matrix"] .attach-thumb[data-toggle="modal"]').removeAttr('data-toggle');

                    if(!$('#el-property [data-loop-type="matrix"] .ui-sortable').children().first().hasClass('active')) 
                        $('#el-property [data-loop-type="matrix"] .ui-sortable').children().first().click();
                }

                if(typeof selectEL != 'undefined' && selectEL && typeof $('.'+selectEL).attr('data-parallax') != "undefined" && $('.'+selectEL).attr('data-parallax')) {
                    $('#prop-method-background').attr('data-target','');
                }

                $('.add-folder').attr('data-content','').popover('hide');
                $('.resource-useit').show();
                selectCount=0;
            });

            $modal.on('hidden.bs.modal', function (e) {
                resourceOpenSET(false);
            });

            $('#resource-files').selectable({
                filter: '.fitem',
                cancel: 'i,.ui-selected',
                selected: function(event, ui) {
                    var files = [], files_path = [], files_size=[], files_seq=[], file ='', file_path = '', file_size =0, file_seq='', magic = '';  

                    if($(ui.selected).is('.fitem')) {
                        file = $(ui.selected).closest('.fitem').find('.resource-file-name').attr('data-source');
                        magic = $(ui.selected).closest('.fitem').find('.resource-file-name').attr('data-magic');
                        file_path = RPATH + '60/' + file;
                        file_size = $(ui.selected).closest('.fitem').find('.resource-file-size').text();
                        file_seq =  $(ui.selected).closest('.fitem').find('.resource-file-name').attr('data-seq');

                        var full_path = (magic == '') ? file_path : magic+'=s60-c';
                        var ffolder = $('#resource-files ul[data-source="'+ file +'"]').attr('data-ffolder');
                        if($('.selected-files').find('li[data-source="'+file+'"]').length==0) {
                            var selected_file_name = (magic) ? magic : file;
                            $('.selected-files').append('<li data-source="' + file + '" data-ffolder="' + ffolder + '" data-seq="'+file_seq+'" data-size="'+file_size+'"><img src="' + full_path + '"><div class="selected-hover">&times;<p class="selected-file-name">' + selected_file_name + '</p><p class="selected-file-size">' + file_size + '</p></div></li>');
                        }
                    }
                    resetFileSelectedStr();
                },
                unselected: function(event, ui) {
                    if($(ui.unselected).is('.fitem')) {
                        if(!event.ctrlKey && !event.shiftKey) {
                            $('.selected-files').empty();
                        }
                    }
                    resetFileSelectedStr();
                },
                stop: function(event, ui) {
                    if($('.selected-files').children().length != $('#resource-files').children('.fitem').length ) {
                        if($('#selectAll').prop('checked')) $('#selectAll').removeAttr('checked');
                    }
                }
            });

            $('a[href="#mystorage"]').click(function(e) {
                resetFileSelectedStr();
            });    

            $('a[href="#freestorage"]').click(function(e) {
                $('.listprogress').remove();
                resetFileSelectedFr();

                if($('.fr-storage').length == 0) {
                    fSearch.type = 'new';
                    fSearch.page = 1;
                    fSearch.total = -1;

                    storageInit();

                    var $ul = $('<ul class="fr-storage-list"></ul>'),
                        $latest = $('<li class="latest"><i class="fa fa-check" aria-hidden="true"></i> <span data-lang="free.storage.new">' + $.lang[LANG]['free.storage.new'] + '</span></li>'),
                        $favor = $('<li class="favor"><i class="fa fa-star"></i> <span data-lang="free.storage.favor">' + $.lang[LANG]['free.storage.favor'] + '</span></li>'),
                        $used = $('<li class="used"><i class="fa fa-thumb-tack" aria-hidden="true"></i> <span data-lang="free.storage.used">' + $.lang[LANG]['free.storage.used'] + '</span></li>');
                    if($('.fr-storage-list').length==0) {
                        $ul.append($latest).append($favor).append($used);
                        $('.fr-strg.resource-filelist').append($ul);

                        $ul.find('li').click(function(e) {
                            if($(this).hasClass('latest')) {
                                if(!$('.fr-storage').hasClass('new')) {
                                    fSearch.type = 'new';
                                    fSearch.page = 1;
                                    fSearch.total = -1;

                                    storageInit();
                                    getFreeImage(fSearch.page,fSearch.type);
                                }

                                $('.fr-storage').removeClass('favor used').addClass('new');
                            } else if($(this).hasClass('favor')) {
                                if(!$('.fr-storage').hasClass('favor')) {
                                    fSearch.type = 'favor';
                                    fSearch.page = 1;
                                    fSearch.total = -1;
                                    storageInit();
                                    getFreeImage(fSearch.page,fSearch.type);
                                }
                                $('.fr-storage').removeClass('new used').addClass('favor');
                                var items = $('.fr-storage .imgs').length;
                                if(fSearch.total == items) return;
                            } else if($(this).hasClass('used')) {
                                if(!$('.fr-storage').hasClass('used')) {
                                    fSearch.type = 'used';
                                    fSearch.page = 1;
                                    fSearch.total = -1;
                                    storageInit();
                                    getFreeImage(fSearch.page,fSearch.type);
                                }
                                $('.fr-storage').removeClass('new favor').addClass('used');
                                var items = $('.fr-storage .imgs').length;
                            }

                            $ul.find('li').removeClass('active');
                            $(this).addClass('active');
                            $('.fr-selected-files').empty();
                            resetFileSelectedFr();
                        });
                        $('.fr-storage-list .latest').addClass('active');
                        fSearch.type = 'new';
                        fSearch.page = 1,
                        fSearch.total = -1;
                        getFreeImage(fSearch.page,fSearch.type);                
                    }
                }
            });

            $('.free-search').keyup(function(e) {
                var keyCode = e.keyCode,
                    search = $(this).val().trim();
                if(keyCode == 13) {
                    if(search=='') {
                        alert('Please enter search text...');
                        $(this).focus();
                        return false;
                    }

                    fSearch.type = 'search';
                    fSearch.page = 1;
                    fSearch.text = search;
                    fSearch.total = 0;

                    $('.free-search').val('');
                    $('.free-search-result').text('');
                    $('.fr-storage-list li').removeClass('active');

                    $('.fr-storage').remove();
                    $('.fr-strg.resource-container').prepend('<div class="fr-storage"></div>');
                    $('.fr-storage').prepend('<div class="listprogress" style="width: 100%; min-height: 40px; text-align:center; padding-top:50px;"><svg version="1.1" xmlns="http://www.w3.org/svg/2000" viewBox="0 0 30 30" width="60" style="width:30px; height: 30px;"><circle cy="15" cx="15" r="14" style="stroke:#00baff;"></circle></svg></div>');
                    var $frstorage = $('.fr-strg.resource-container .fr-storage');
                    for(var i=0; i < 4; i++) {
                        $frstorage.append('<div class="fr-row"></div>');
                    }

                    $.getJSON('/template/translate/' + encodeURIComponent(search), function(data) {
                        search = data.data.translations[0].translatedText;
                        fSearch.text = search;
                        $('.free-search').val(search);
                        getFreeImage(fSearch.page,fSearch.type,search);
                    });
                }
            });

            var storageInit = function() {
                $('.free-search').val('');
                $('.free-search-result').text('');
                $('.fr-storage').remove();
                $('.fr-strg.resource-container').prepend('<div class="fr-storage"></div>');
                $('.fr-storage').prepend('<div class="listprogress" style="width: 100%; min-height: 40px; text-align:center; padding-top:50px;"><svg version="1.1" xmlns="http://www.w3.org/svg/2000" viewBox="0 0 30 30" width="60" style="width:30px; height: 30px;"><circle cy="15" cx="15" r="14" style="stroke:#00baff;"></circle></svg></div>');
                var $frstorage = $('.fr-strg.resource-container .fr-storage');
                for(var i=0; i < 4; i++) {
                    $frstorage.append('<div class="fr-row"></div>');
                }
            }

            var rePaintFavor = function() {
                var $org = $('.fr-storage .imgs'),
                    $items = {};

                for(var i=0; i<$org.length; i++) {
                    var $i = $('.fr-storage .imgs[data-idx="' + i + '"]');
                    $items[i] = $i.clone();
                    $i.remove();
                }

                var idx = 0, 
                    $fHeight = $('.fr-storage .fr-row'),
                    height = [
                        $fHeight.eq(0).height(),
                        $fHeight.eq(1).height(),
                        $fHeight.eq(2).height(),
                        $fHeight.eq(3).height(),
                    ];

                $.each($items, function(i,v) {
                    var set = (i < 4) ? i : height.indexOf(Math.min.apply(null,height)),
                        w = $(this).find('.control-area').attr('data-width'),
                        h = $(this).find('.control-area').attr('data-height'),
                        r = Math.round(h*1080/w);

                    height[set] = height[set] + r;
                    $('.fr-storage .fr-row').eq(set).append($(this));
                });
            }

            var getFreeImage = function(page,type,stx,collection) {
                type = (typeof type == 'undefined') ? 'new' : type;
                stx = (typeof stx == 'undefined') ? '' : stx;
                page = (typeof page == 'undefined') ? 1 : page;
                collection = (typeof collection == 'undefined') ? '' : collection;
                if(type == 'new') {
                    dest = '/template/free/new/photos';
                } else if(type == 'favor') {
                    dest = '/template/favorite/list/type/F';
                } else if(type == 'search') {
                    dest = '/template/free/search/' + encodeURIComponent(stx);
                } else if(type == 'used') {
                    dest = '/template/favorite/list/type/U';
                }

                if(page>1) dest = dest + '/page/' + page;

                $.ajax({
                    type: 'GET',
                    url: dest,
                    dataType: 'json',
                    async:true,
                    success : function(data) {
                        var photos;
                        if(fSearch.type == 'new') {
                            if(data.photos != null) {
                                photos = data.photos;    
                            } else photos = {};
                        } else {
                            photos = (data.photos == null) ? {} : data.photos.results;
                        }

                        if(photos) {
                            $('.listprogress').remove();
                            if(photos.length==0 || photos == null) {
                                $('.fr-storage').append('<div class="result-none">No results found</div>');
                            } else {
                                var idx = 0, 
                                    $fHeight = $('.fr-storage .fr-row'),
                                    height = [
                                        $fHeight.eq(0).height(),
                                        $fHeight.eq(1).height(),
                                        $fHeight.eq(2).height(),
                                        $fHeight.eq(3).height(),
                                    ];

                                $.each(photos, function(i,v) {
                                    var set = (i < 4) ? i : height.indexOf(Math.min.apply(null,height)),
                                        r = Math.round(v.height*1080/v.width);

                                    var tpl = tplPhoto(v.urls.small, v.user.profile_image.small, v.user.username, v.user.links.html, v.color, v.urls.full, v.urls.raw,v.links.download, v.width, v.height, v.id, fSearch.type, i);
                                    height[set] = height[set] + r;
                                    $('.fr-storage .fr-row').eq(set).append(tpl);
                                });

                                $('.fr-storage').selectable({ 
                                    filter: ' .imgs',
                                    cancel: 'i,.ui-selected, .user-name',
                                    selected: function(event, ui) {
                                        var files = [], files_path = [], files_size=[], files_seq=[], file ='', file_path = '', file_size =0, file_seq='';  

                                        if($(ui.selected).is('.imgs')) {
                                            file = $(ui.selected).find('.control-area').attr('data-small');
                                            id = $(ui.selected).find('.control-area').attr('data-id');
                                            urls = new getLocation(file);
                                            file = (urls.pathname).replace('/','');
                                            file_path = 'https://' + urls.host + urls.pathname + '?ixlib=rb-0.3.5&q=80&fm=jpg&crop=face&cs=tinysrgb&w=60&h=60&fit=crop';
                                            tmp_image = 'https://' + urls.host + urls.pathname + '?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb';
                                            file_size = $(ui.selected).closest('.imgs').find('.resource-file-size').text();
                                            file_seq =  $(ui.selected).closest('.imgs').find('.resource-file-name').attr('data-seq');
                                            var ffolder = $('#resource-files ul[data-source="' + file + '"]').attr('data-ffolder');
                                            if($('.fr-selected-files').find('li[data-source="' + file + '"]').length==0) {
                                                $('.fr-selected-files').append('<li data-source="' + file + '" data-id="' + id + '" data-ffolder="' + ffolder + '" data-seq="' + file_seq + '" data-size="' + file_size + '"><img src="' + file_path + '"><div class="selected-hover">&times;<p class="selected-file-name">' + file + '</p><p class="selected-file-size">' + file_size + '</p><p class="tmp-image">' + tmp_image + '</p></div></li>');
                                            }
                                        }
                                        resetFileSelectedFr();
                                    },
                                    unselected: function(event, ui) {
                                        if($(ui.unselected).is('.imgs')) {
                                            if(!event.ctrlKey && !event.shiftKey) {
                                                $('.fr-selected-files').empty();
                                            }
                                        }
                                        resetFileSelectedFr();
                                    },
                                    stop: function(event, ui) {
                                        if($('.selected-files').children().length != $('#resource-files').children('.fitem').length ) {
                                            if($('#selectAll').prop('checked')) $('#selectAll').removeAttr('checked');
                                        }
                                    }                        
                                });
                                if(fSearch.type == 'search' || fSearch.type == 'favor' || fSearch.type == 'used') fSearch.total = data.photos.total;
                                fSearch.page = fSearch.page + 1;

                                if(typeof data.photos.total != 'undefined' && fSearch.type == 'search') {
                                    if(data.photos.total > 0) $('.free-search-result').text(Number(data.photos.total).format());
                                    else $('.free-search-result').text('');
                                }
                            }                
                        } else {
                            $('.listprogress').remove();
                            $('.fr-storage').append('<div class="result-none text-center">Error get photo lists</div>');
                        }

                    }
                });

            }

            var tplPhoto = function(src,profile,name,link,color,full,raw,down,width,height,id,type,i) {
                var str = '';
                str = '\
                    <div class="imgs" data-idx="' + i + '">\
                        <div class="fitem">\
                            <img src="' + src + '">\
                            <div class="control-area" data-color="' + color + '" data-full="' + full + '" data-username="' + name + '" data-raw="' + raw + '" data-full="' + full + '" data-small="' + src + '" data-down="' + down + '" data-userlink="' + link + '" data-width="' + width + '" data-height="' + height + '" data-id="' + id + '" data-color="' + color + '">\
                                <ul>\
                                    <li class="fr-search"><i class="fa fa-search"></i></li>\
                ';
                if(type != 'used') {
                    str = str + '\
                                    <li class="fr-star"><i class="fa fa-star' + ((type=='favor') ? '' : '-o') + '"></i></li>\
                    ';
                }
                str = str + '\
                                </ul>\
                            </div>\
                        </div>\
                        <div class="user-name">Photo by <a href="' + link + '?utm_source=creatorlink&utm_medium=referral&utm_campaign=api-credit" target="_blank">' + name + '</a></div>\
                    </div>\
                ';
                return str;
            }

            $('.fr-storage .imgs .control-area .fr-search').live('click', function(e) {
                var $popup = $('<div class="photo-popup"></div>'),
                    $close = $('<div class="photo-close"><img src="https://storage.googleapis.com/i.addblock.net/fa-close-modal-white.png"></div>'),
                    color = $(this).parents('.control-area').attr('data-color'),
                    full = $(this).parents('.control-area').attr('data-full');

                $popup.append('<img src="' + full + '">');
                $('.photo-popup').css('background-color',color);
                if($('.photo-popup').length==0) {
                    $('body').append($popup).append($close);
                    $('.photo-popup').css('background-color',color);
                }
                $popup.hover(function() {
                    $('.photo-close').show();
                });
                resetFileSelectedFr();
            });

            $('.fr-storage .imgs .control-area .fr-star').live('click', function(e) {
                var $i = $(this).parents('.control-area'),
                    image = {
                        'id' : $i.attr('data-id'),
                        'width' : $i.attr('data-width'),
                        'height' : $i.attr('data-height'),
                        'username' : $i.attr('data-username'),
                        'userlink' : $i.attr('data-userlink'),
                        'raw' : $i.attr('data-raw'),
                        'full' : $i.attr('data-full'),
                        'small' : $i.attr('data-small'),
                        'down' : $i.attr('data-down'),
                        'color' : $i.attr('data-color')
                    },
                    $star = $(this).find('i'),
                    $item = $(this).parents('.imgs');

                $.post('/template/favorite/image', { image : image },  function(data) {
                    if(data.type == 'insert') {
                        $star.removeClass('fa-star-o').addClass('fa-star');    
                    } else if(data.type == 'delete') {
                        $star.removeClass('fa-star').addClass('fa-star-o');
                        if(fSearch.type == 'favor') {
                            var idx = $item.attr('data-idx');
                            $.each($('.fr-storage .imgs'),function(i,v) {
                                var cidx = $(this).attr('data-idx');
                                if(cidx == idx) $(this).remove();
                                if(idx < cidx) $(this).attr('data-idx',Number(cidx)-1);
                            });
                            fSearch.total = fSearch.total -1;
                            rePaintFavor();
                        }
                    }
                },'json');
            });

            $('.fr-storage .imgs .control-area .fr-download').live('click', function(e) {
                var $i = $(this).parents('.control-area'),
                    down = $i.attr('data-down');
                window.open(down + '?force=true', '_blank'); 
            });

            $('.photo-popup, .photo-close').live('click', function(e) {
                $(this).addClass('down');
                setTimeout(function() {
                    $('.photo-close').remove();
                    $('.photo-popup').remove();
                },400);
            });

            $('.fr-storage').live({
                mousemove : function() {
                    $(this).scroll( function() {

                        var listScroll = $('.fr-storage').scrollTop();
                        if((this.scrollTop+this.clientHeight) > (this.scrollHeight-100)){
                            if((fSearch.type == 'search' || fSearch.type == 'favor' || fSearch.type == 'used') && fSearch.total != 0) {
                                var items = $('.fr-storage .imgs').length;
                                if(fSearch.total == items) {
                                    return false;
                                }
                            }

                            if($('.fr-storage').find('.listprogress').length == 0 ) {
                                $('.fr-storage').append('<div class="listprogress" style="width: 100%; min-height: 40px; text-align:center; padding-top:10px;"><svg version="1.1" xmlns="http://www.w3.org/svg/2000" viewBox="0 0 30 30" width="60" style="width:30px; height: 30px;"><circle cy="15" cx="15" r="14" style="stroke:#00baff;"></circle></svg></div>');  
                                getFreeImage(fSearch.page,fSearch.type,fSearch.text);
                            }
                        }
                    });
                }
            });


            $('.modal-upload-button-resource').live({
                click: function() {
                    var ffolder = (SFOLDER_ACTIVE) ? SFOLDER_ACTIVE : 'all';
                    $.uploadON();
                    $(this).fileupload({
                        url: '/template/resource/upload/ffolder/'+ffolder,
                        dataType: 'json',
                        pasteZone: null,
                        dropZone: null,
                        async: true,
                        prependFiles: true,
                        sequentialUploads: true,
                        add: function(e,data) {
                            var r = $.upload_add(e,data,'image');

                            if(r.submit) {
                                var jqXHR = data.submit();
                                UPLOAD++;
                            } else {
                                data.context.find('.loading').html('<i class="fa fa-times error"></i>');
                                data.context.find('.ing').addClass('error').text(r.err);
                            }

                            $(document).on('click','.upload-cancel .btn', function(e) {
                                if(jqXHR != undefined) jqXHR.abort();
                                data.context.fadeOut().remove();
                                $('.uploadModal #file-upload-progress').css('width','0%');
                                $.uploadOFF();

                                if(SFOLDER_ACTIVE != '') resetFolderInfo(UPLOAD, UPLOADSIZE, 'all', 'upload');
                                UPLOAD = 0;
                                UPLOADED = 0;
                                UPLOADSIZE = 0;
                                PROGRESS = 0;
                                $.uploadOFF();
                                resourceGetPage(1,SFOLDER_ACTIVE);
                                updateOutputFolder($('#nestableFolder').data('output', $('#nestableFolder-output')));
                            });
                        },
                        progress: function(e, data) {
                            $.upload_progress(e,data);
                        },                        
                        done: function (e, data) {
                            $.upload_done(e,data);
                            UPLOADED++;
                            if(UPLOADED) {
                                //$.uploadON(UPLOADED + " / " + UPLOAD + "<br>images creating...");
                                if(UPLOAD==UPLOADED) {
                                    setTimeout(function() {
                                        if(SFOLDER_ACTIVE != '') resetFolderInfo(UPLOAD, UPLOADSIZE, 'all', 'upload');
                                        UPLOAD = 0;
                                        UPLOADED = 0;
                                        UPLOADSIZE = 0;
                                        PROGRESS = 0;
                                        $.uploadOFF();
                                        resourceGetPage(1,SFOLDER_ACTIVE);
                                        updateOutputFolder($('#nestableFolder').data('output', $('#nestableFolder-output')));
                                    },1000);
                                }
                            }
                        },
                        progressall: function (e, data) {
                            $.upload_progressall(e,data);
                        },
                        start : function(e, data) {
                            $.upload_start(e,data);
                            progress1 = 0; progress2 = 0; PROGRESS = 0;
                        },
                        dragover : function(e, data) {
                            e.preventDefault();
                        }
                    }).prop('disabled', !$.support.fileInput)
                        .parent().addClass($.support.fileInput ? undefined : 'disabled');
                }
            });




            $('.flink-delete-button').live({
                click : function(e) {
                    $(this).closest('.fitem').addClass('selected');
                    var selectedFlink = $('#flink-files .fitem.selected'),
                        file = selectedFlink.find('.resource-file-name').attr('data-source'),
                        id = selectedFlink.find('.resource-file-name').attr('data-seq');
                    if(typeof file == 'undefined' || typeof id == 'undefined') return false;
                    var modal = $(this).showModalFlat($.lang[LANG]['config.flink.resource.delete'],$.lang[LANG]['config.flink.resource.delete.str'], true, true, function() {

                        selectedFlink.closest('.f-wrap').remove();
                        $.processON('Deleting the image(s)...');
                        modal.modal('hide');
                        $('.resource-useit').removeClass('active');

                        $.ajax({
                            type: 'POST',
                            url: '/down/flink/delete',
                            data: { s: file, id: id },
                            dataType: 'json',
                            async: true,
                            success: function(data) {
                                if(typeof data.error != 'undefined' && data.error) {
                                    $(this).showModalFlat('ERROR',data.error,true,false,'','ok');
                                    return false;
                                }
                                resourceGetPage(1,SFOLDER_ACTIVE);
                                $.processOFF();
                            }
                        });

                    },'cancel','ok','modal-over-1 cl-cmmodal cl-s-btn cl-common-notice w560 ',false);
                    modal.addClass('z-1043');
                }
            });

            $('.flink-upload-button').live({
                click: function() {

                    var checkPlan = (typeof VALIDPLAN == 'undefined') ? property.VALIDPLAN : VALIDPLAN,
                        // checkPType = (typeof VALIDTYPE == 'undefined') ? property.VALIDTYPE : VALIDTYPE,
                        flink_cnt = $('#filestorage .flink-capacity .flink-cnt').text(),
                        flink_max = $('#filestorage .flink-capacity .flink-max').text(),
                        error_str = '';

                    if(!checkPlan) error_str = $.lang[LANG]['editor.link.file.upgrade'];
                    else if(Number(flink_cnt) >= Number(flink_max)) {
                        error_str = $.lang[LANG]['editor.link.file.maximum'];
                        error_str = error_str.replace('@maximum', flink_max);
                    }
                    if(error_str) {
                        $(this).showModalFlat($.lang[LANG]['config.information'], error_str, true, false,'','ok', '', 'cl-p130 cl-cmmodal cl-s-btn w560 cl-p0 cl-okbtn-pbt70').css('z-index','1044');
                        return false;
                    }

                    $.uploadON();
                    $(this).fileupload({
                        url: '/down/flink/upload/sid/' + SID,
                        dataType: 'json',
                        pasteZone: null,
                        async: true,
                        cache: false,
                        prependFiles: true,
                        sequentialUploads: true,
                        add: function(e,data) {
                            var r = $.upload_add(e,data,'flink');

                            if(r.submit) {
                                var jqXHR = data.submit();
                                UPLOAD++;
                            } else {
                                data.context.find('.loading').html('<i class="fa fa-times error"></i>');
                                data.context.find('.ing').addClass('error').text(r.err);
                            }

                            $(document).on('click','.upload-cancel .btn, .upload-close', function(e) {
                                if(jqXHR != undefined) jqXHR.abort();
                                data.context.fadeOut().remove();
                                $('.uploadModal #file-upload-progress').css('width','0%');
                                $.uploadOFF();

                                SFOLDER_ACTIVE = '#flink';
                                UPLOAD = 0;
                                UPLOADED = 0;
                                UPLOADSIZE = 0;
                                PROGRESS = 0;
                                $.uploadOFF();
                                resourceGetPage(1,SFOLDER_ACTIVE);
                                updateOutputFolder($('#nestableFolder').data('output', $('#nestableFolder-output')));
                            });
                        },
                        progress: function(e, data) {
                            $.upload_progress(e,data);
                        },                        
                        done: function (e, data) {
                            if(typeof data.result.error != 'undefined' && data.result.error) {
                                $('.uploadModal .upload-header h1').html($.lang[LANG]['editor.upload.title.1']);
                                $('.uploadModal .upload-content .upload-cancel .btn-default').text($.lang[LANG]['config.close']);
                                $('.file-upload-progress .progress-bar').css('width','0%');
                                $('.uploadModal .info1, .uploadModal .info2').addClass('hide');

                                data.context.find('.progress-bar').css('width','0%');
                                data.context.find('.loading').html('<i class="fa fa-times error"></i>');
                                data.context.find('.ing').addClass('error').text(data.result.error);
                                return false;
                            }

                            $.upload_done(e,data);

                            UPLOADED++;
                            if(UPLOADED) {
                                if(UPLOAD==UPLOADED) {
                                    setTimeout(function() {
                                        SFOLDER_ACTIVE = '#flink';
                                        UPLOAD = 0;
                                        UPLOADED = 0;
                                        UPLOADSIZE = 0;
                                        PROGRESS = 0;
                                        $.uploadOFF();
                                        resourceGetPage(1,SFOLDER_ACTIVE);
                                        updateOutputFolder($('#nestableFolder').data('output', $('#nestableFolder-output')));
                                    },1000);
                                }
                            }
                        },
                        progressall: function (e, data) {
                            $.upload_progressall(e,data);
                        },
                        start : function(e, data) {
                            $.upload_start(e,data);
                            progress1 = 0; progress2 = 0; PROGRESS = 0;
                        },
                        dragover : function(e, data) {
                            e.preventDefault();
                        }
                    }).prop('disabled', !$.support.fileInput)
                        .parent().addClass($.support.fileInput ? undefined : 'disabled');
                }
            });

            $('#flink-files .f-wrap').live({
                click: function() {
                    $(this).find('.fitem').toggleClass('selected').parent().siblings().find('.fitem').removeClass('selected');

                    if($(this).find('.fitem').hasClass('selected')) {
                        $('.resource-useit').addClass('active');
                    } else {
                        $('.resource-useit').removeClass('active');
                    };
                }
            });




            // Moves the "item count" tooltip
            var mouseX, mouseY;
            $('#el-fileupload').mousemove( function(e) {
               mouseX = e.pageX; 
               mouseY = e.pageY;
               $('#el-fileupload:not(.flink-fileupload) .resource-tooltip').css({'top': mouseY-20,'left':mouseX-20 });
            });
            
            $('#selectAll').click(function () {
                var check = $(this);
                var selected = $('.selected-files li').map(function (i, n) {
                    return $(this).find('p.selected-file-name').text();
                }).get();

                $('#resource-files li').each(function () {
                    var file = $(this).find('.resource-file-name').attr('data-source'),
                        file_path = RPATH + '60/' + file,
                        ffolder = $('#resource-files ul[data-source="' + file + '"]').attr('data-ffolder'),
                        file_size = $('#resource-files .resource-file-name[data-source="' + file + '"]').next('.resource-file-size').text(),
                        file_seq = $(this).find('.resource-file-name').attr('data-seq');
                    var magic = (file_path.indexOf('googleusercontent') > -1) ? file + '=s60-c' : file_path;
                    if (check.prop('checked')) {
                        $(this).find('.fitem').addClass('ui-selected');
                        exist = $('p.resource-file-name[data-source="' + file + '"]').attr('data-source');
                        isAppend = ($.inArray(exist,selected)>-1) ? false : true;
                        if(exist && isAppend) {
                            $('.selected-files').append('<li data-source="' + file + '" data-ffolder="' + ffolder + '" data-seq="' + file_seq + '"><img src="' + magic + '"><div class="selected-hover">&times;<p class="selected-file-name">' + file + '</p><p class="selected-file-size">' + file_size + '</p></div></li>');
                            $('.selected-files-count').text(selected.length);
                        }
                    } else {
                        $('.selected-files p:contains("' + file + '")').parents('li').remove();
                        $(this).find('.resource-image').removeClass('ui-selected');
                        $('.resource-selected-str').hide();
                    }
                });
                resetFileSelectedStr();
            });

            $('#resource-delete').click(function () {
                if($('.selected-files').children().length==0) return;

                var r_pages = Number($('.resource-paging .pagination').attr('data-pages')),
                    r_page = Number($('.resource-paging .pagination li.active').text()),
                    r_file_cnt = $('#resource-files li.fitem').length;
                    
                var modal = $(this).showModalFlat($.lang[LANG]['config.common.resource.delete.title'],$.lang[LANG]['config.common.resource.delete'], true, true, function() {
                    modal.modal('hide');
                    $.progressON();              
                    var files = [], 
                        seqs = [],
                        sizes = [],
                        ffolders = [];
                    $('.selected-files li').each(function () {
                        files.push($(this).attr('data-source'));
                        seqs.push($(this).attr('data-seq'));
                        sizes.push($(this).find('.selected-file-size').text());
                        ffolders.push($(this).attr('data-ffolder'));
                    });

                    $('.selected-files').empty();
                    $('.resource-useit').removeClass('active');

                    var total = files.length, deleting = '', progress = 0; loading = '<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i> ';
                        done = 0; deleting = $('.resource-file-name[data-seq="' + seqs[0] + '"]').text();
                    $('.progressModal .info1').html(loading + deleting);

                    $.each(files,function(i,v) {
                        var t = setTimeout(function() {
                            if(CANCEL) {
                                if(ABORT) {
                                    resourceGetPage(1,SFOLDER_ACTIVE);
                                    updateOutputFolder($('#nestableFolder').data('output', $('#nestableFolder-output')));
                                    ABORT = false;
                                    $.progressOFF();
                                }
                                i=0; return false;
                            }
                            resourceFileDelete(v,seqs[i],function() {
                                done++;
                                progress = parseInt((done / total) * 100,10);
                                $('.file-upload-progress .progress-bar').css('width',progress + "%");
                                $('.progressModal .info2').text(done.toString() + ' / ' + total.toString());
                                if(total == done) {
                                    r_page = ((r_file_cnt-files.length) == 0 && r_pages<=r_page) ? r_page-1 : r_page;
                                    r_page = 1;
                                    setTimeout(function() {
                                        $.progressOFF();
                                        resourceGetPage(r_page,SFOLDER_ACTIVE);
                                        updateOutputFolder($('#nestableFolder').data('output', $('#nestableFolder-output')));
                                    },1000);
                                } else {
                                    deleting = $('.resource-file-name[data-seq="' + seqs[i+1] + '"]').text();
                                    $('.progressModal .info1').html(loading + deleting);
                                }
                            });
                        },500*i);
                    });

                },'cancel','ok','modal-over-1 cl-cmmodal cl-s-btn cl-common-notice w560',false);
            });

            var resourceFileFolderUpdate = function(prevText,newText) {
                $.ajax({
                    type: 'POST',
                    url: '/template/resource/update-ffolder',
                    data: { sid: SID, prevffolder: prevText, newffolder: newText },
                    async: true,
                    success: function(data) {
                        checkError(data);
                    }
                });
            }
            var resourceFileDelete = function(file,seq,callback) {
                if(CANCEL) return true;
                $.ajax({
                    type: 'POST',
                    url: '/template/resource/delete',
                    data: { s: file, sid: SID, seq: seq},
                    async: true,
                    success: function(data) {
                        checkError(data);
                        if(typeof callback == 'function') {
                            callback();
                        }
                    }
                });
            }

            $('.resource-file-delete').live({
                click : function(e) {
                    var file    = $(this).closest('ul').attr('data-source'),
                        seq     = $(this).closest('ul').attr('data-seq'),
                        size    = $(this).closest('ul').attr('data-fsize'),
                        ffolder = $(this).closest('ul').attr('data-ffolder'),
                        page    = $(this).closest('ul').attr('data-page'),
                        $parent = $(this).parent(),
                        files =  $('.selected-files li').map(function (i, n) {
                            return $(this).find('p.selected-file-name').text();
                        }).get();

                    var modal = $(this).showModalFlat($.lang[LANG]['config.common.resource.delete.title'],$.lang[LANG]['config.common.resource.delete'], true, true, function() {
                        // $('.selected-files p:contains("' + file + '")').parents('li').remove();
                        $('.selected-files li[data-seq="' + seq + '"]').remove();
                        $.processON('Deleting the image(s)...');
                        modal.modal('hide');
                        $('.resource-image p[data-seq="' + seq + '"]').remove();
                        $('.resource-useit').removeClass('active');

                        resourceFileDelete(file,seq,function() {
                            if(SFOLDER_ACTIVE!='') {
                                resetFolderInfo(-1, -size, 'all', 'delete');
                            } else {
                                resetFolderInfo(-1, -size, ffolder, 'delete');
                            }

                            // page = (page) ? page : 1;
                            page = 1;
                            resourceGetPage(page,SFOLDER_ACTIVE);
                            updateOutputFolder($('#nestableFolder').data('output', $('#nestableFolder-output')));
                            $.processOFF();   
                        });

                    },'cancel','ok','modal-over-1 cl-cmmodal cl-s-btn cl-common-notice w560',false);
                }
            });

            $('.resource-file-search').live({
                click: function(e) {
                    $('#resourceImgView .img-wrapper > .img-responsive').attr('src',$(this).closest('ul').children(3).find('a').attr('href'));
                    $('#resourceImgView').modal('show');
                }
            });

            $('#resource-files').live('mousedown',function(e) {
                if(event.shiftKey) {
                    $('.selected-files').children('li').each(function () {
                        var s_file = $(this).attr('data-source'),
                            s_file_seq = $(this).attr('data-seq'),
                            s_file_size = $(this).attr('data-size');
                        if($('#resource-files .ui-selected ul[data-source="' + s_file + '"]').length == 0) {
                            $('#resource-files ul[data-source="' + s_file + '"]').closest('.fitem').find('.resource-image').addClass('ui-selected');
                        }
                    });
                }
            });
            $('.resource-image img').live('mousedown',function(e) {
                if($(this).closest('.fitem').hasClass('ui-selected')) {
                    fileDrag = true;
                }
                if(e.ctrlKey || e.shiftKey) {
                    if($(this).closest('.fitem').hasClass('ui-selected')) {
                        $(this).closest('.fitem').removeClass('ui-selected');
                        $('.selected-files').find('li[data-source="'+$(this).attr('alt')+'"]').remove();
                    }

                    if($('.selected-files').children().length != $('#resource-files').children('.fitem').length ) {
                        if($('#selectAll').prop('checked')) $('#selectAll').removeAttr('checked');
                    }
                    resetFileSelectedStr();
                }
            }).live('mouseup',function(e) {
                $('.fli').removeClass('drag-selected');
                fileDrag = false;
            }).live('mousemove', function(e) {
                if(fileDrag) {
                    var classstr = ($('.ui-selected').length > 1) ? 'multiple' : '';
                    $('.resource-tooltip').fadeIn().addClass(classstr)
                     .find('img').attr('src',$('.selected-files').children().last().find('img').attr('src'))
                     .next('.count').text($('.selected-files').children().length);
                }
            }).live('dragstart', function(e) {
                e.preventDefault();
            });

            $('.fli').live('mouseup',function(e) {
                if(fileDrag) {
                    $('li.fitem .resource-image').removeClass('ui-selected');
                    $('.fli').removeClass('drag-selected');

                    // selected-files 파일을 $.post로 보내고 리스트 페이지 갱신
                    var prevffolder = [], fsize = [],
                        targetffolder = $(this).attr('data-id'),
                        fselected = $('.selected-files li').map(function (i, n) {
                            prevffolder.push($(this).attr('data-ffolder')); 
                            fsize.push(parseInt($(this).find('p.selected-file-size').text()));
                            return $(this).attr('data-source');
                        }).get();

                    if(SID) {
                        var activeffolder = $('#nestableFolder').find('.fli.active').attr('data-id'),
                            r_pages = Number($('.resource-paging .pagination').attr('data-pages')),
                            r_page = Number($('.resource-paging .pagination li.active').text()),
                            r_file_cnt = $('#resource-files li.fitem').length;

                        $.post('/template/resource/update-fmove', { sid: SID, fselected: fselected, prevffolder: prevffolder, targetffolder: targetffolder }, function (data) {
                            checkError(data);
                            $.each(fselected, function(i,v) {
                                if(activeffolder[i] != prevffolder) {
                                    resetFolderInfo(-1, -fsize[i], prevffolder[i], 'move');
                                }
                                resetFolderInfo(1, fsize[i], targetffolder, 'move');
                            });

                            r_page = ((r_file_cnt-fselected.length) == 0 && r_pages<=r_page && SFOLDER_ACTIVE) ? r_page-1 : r_page;
                            r_page = 1;
                            cPage = 1;
                            resourceGetPage(r_page,SFOLDER_ACTIVE);
                            updateOutputFolder($('#nestableFolder').data('output', $('#nestableFolder-output')));
                            $('#resource-files').find('li.fitem .resource-image.ui-selected').removeClass('ui-selected');
                            $(".selected-files").empty();
                            resetFileSelectedStr();
                        }, 'json');
                    }
                }
            }).live('mouseenter',function(e) {
                $('.fli').removeClass('drag-selected');
                if(fileDrag) {
                    $(this).addClass('drag-selected');
                }
            }).live('mouseleave',function(e) {
                $('.fli').removeClass('drag-selected');
            });

            $('.resource-files-content').live('mouseup',function(e) {
                $('.resource-tooltip').fadeOut();
                fileDrag = false;
            });

            $('.add-folder').live({
                click: function(e) {
                    if(isFEdit) { 
                        if($('.fln-input').length > 0) {
                            if($('.fln-input').closest('ll.fli').attr('data-id') == 'clEmptyFolder') $('.fln-input').focus()
                            else {
                                $('.fln-input').closest('.dd-fln').find('.btn-fln-cancel').click();
                                setTimeout(function() {
                                    $(this).click();
                                },150);
                            }
                        }
                        return; 
                    } else {
                        $('.add-folder').attr('data-content','').popover('hide');
                    }

                    
                    var checkMaximum = (    (VALIDPLAN && $('#nestableFolder .fli').length > 500) || 
                                            (!VALIDPLAN && $('#nestableFolder .fli').length > 50)
                                        ) ? true : false;
                    if(checkMaximum) {
                        var max_msg = (VALIDPLAN) ? $.lang[LANG]['editor.resource.folder.maximum'] : $.lang[LANG]['editor.resource.folder.maximum.free'];
                        $(this).showModalFlat($.lang[LANG]['config.information'], max_msg, true, false,'','close', 'ok', 'cl-cmmodal cl-s-btn w560 cl-p70 cl-p0');
                        return;
                    } else {
                        $('#nestableFolder .fli.active').removeClass('active').find('.fa-fl').attr('src','https://storage.googleapis.com/i.addblock.net/icon/fa_folder.png');
                        var add_folder = '\
                            <li class="dd-item fli active" data-id="clEmptyFolder">\
                                <img src="https://storage.googleapis.com/i.addblock.net/icon/fa_folder_open.png" alt="folder icon" class="fa-fl dd-handle" />\
                                <span class="dd-fln"></span>\
                                <span class="dd-flc" attr-count="0">0</span>\
                                <span class="dd-fls" attr-size="0" attr-size-unit="KB">0</span>\
                                <span class="dd-fld" attr-id="clEmptyFolder"><img src="https://storage.googleapis.com/i.addblock.net/icon/icon-menu-delete-w.png" class="fa"></span>\
                            </li>\
                        ';
                        
                        if($('#nestableFolder .fli[data-id="clclEmptyFolder"]').length == 0) {
                            $('#nestableFolder .fll').append(add_folder);
                        } else {
                            $('#nestableFolder .fli[data-id="clEmptyFolder"]').find('.dd-fln').val('');
                        }

                        var input_html = '\
                            <div class="fln-group input-group">\
                                <input class="fln-input form-control" type="text"/>\
                                <span class="input-group-btn"><button class="btn-fln-save btn btn-default btn-primary" type="button"><i class="fa fa-check"></i></button></span>\
                            </div>\
                            <div class="btn-fln-cancel"><i class="fa fa-times"></i></div>\
                            ';

                        $(input_html).appendTo($('#nestableFolder .fli[data-id="clEmptyFolder"] .dd-fln')).dblclick();
                        if($('.dd-list.fll').children().length > 12 && $.browser.safari == undefined) {
                            $('#nestableFolder .dd-fln').find('.fln-group').css('max-width','161px');
                            $('#nestableFolder .dd-fln').find('.fln-input').css('max-width','134px');
                            $('#nestableFolder').scrollTop(2000);
                        }
                    }
                }
            });

            $('#nestableFolder .fll > .fli').live({
                click: function(e) {
                    if(isFEdit) { return; }
                    if($(this).parents('.fll').length == 2) {
                         depfolderClick = true;
                    }
                    if($(this).parents('.fll').length == 1 && depfolderClick) {
                        depfolderClick = false;
                        return;
                    } else {
                        if($(this).hasClass('active')) return;
                        $('#nestableFolder .fli.active').removeClass('active').find('.fa-fl').first().attr('src','https://storage.googleapis.com/i.addblock.net/icon/fa_folder.png');
                        $(this).addClass('active').find('.fa-fl').first().attr('src','https://storage.googleapis.com/i.addblock.net/icon/fa_folder_open.png');
                        SFOLDER_ACTIVE = ($(this).attr('data-id')!='all') ? $(this).attr('data-id') : '';

                        cPage = 1;
                        resourceGetPage(1,SFOLDER_ACTIVE);
                    }
                }
            });

            $('#nestableFolder .fli .dd-fln').live({
                dblclick: function(e) {
                    if(isFEdit) { return; }
                    if($(this).parent().closest('.fli').index() > 0) {
                        isFEdit = true;
                        editFolder($(this));
                    }
                }
            });

            $('#nestableFolder .fli .dd-fld').live({
                click: function(e) {
                    if(isFEdit) { return; }
                    if($(this).prev().attr('attr-size') > 0) {
                        $(this).showModalFlat('INFORMATION', $.lang[LANG]['editor.resource.regExp.delete'], true, false, '', 'close');
                    } else {
                        if($(this).parent().parent().parent('.dd-list').children().length == 1 ) {
                            $(this).parent().parent().parent('.dd-list').parent('.fli').first().click();
                            $(this).parent().parent().parent('.dd-list').parent('.fli').find('button[data-action="collapse"]').remove();
                            $(this).parent().parent().parent('.dd-list').parent('.fli').find('button[data-action="expand"]').remove();
                            $(this).parent().parent().parent('.dd-list').remove();
                        } else {
                            $(this).closest('li').remove();
                        }
                        updateOutputFolder($('#nestableFolder').data('output', $('#nestableFolder-output')));
                        $('#nestableFolder').find('.fll').children().first().click();
                    }
                }
            });



            var editFolder = function(ddfl) {
                $this = ddfl;

                var fln_group_css = ($('.dd-list.fll').children().length > 12 && $.browser.safari == undefined) ? 'style="max-width: 161px;"' : '',
                    fln_input_css = ($('.dd-list.fll').children().length > 12 && $.browser.safari == undefined) ? 'style="max-width: 134px;"' : '',
                    checkAdd = ($this.closest('li.fli').attr('data-id') == 'clEmptyFolder') ? true : false,
                    beforeFln = (checkAdd) ? '' : $this.closest('li.fli').attr('data-id');

                if(beforeFln.length > 0) beforeFln = beforeFln.replace(/-/g,' ');

                var input_html = '\
                    <div class="fln-group input-group" ' + fln_group_css + '>\
                        <input class="fln-input form-control" type="text" value="' + beforeFln + '"  ' + fln_input_css + '/>\
                        <span class="input-group-btn"><button class="btn-fln-save btn btn-default btn-primary" type="button"><i class="fa fa-check"></i></button></span>\
                    </div>\
                    <div class="btn-fln-cancel"><i class="fa fa-times"></i></div>\
                    ';

                $(input_html).appendTo($this);
                $('.fln-input').focus();
            }

            $('.dd-list.fll .dd-fln > .btn-fln-cancel').live({
                click: function(e) {
                    $('#nestableFolder').removeAttr('style');
                    $('.add-folder').attr('data-content','').popover('hide');
                    if($(this).closest('li.fli').attr('data-id') == 'clEmptyFolder') $(this).closest('li.fli').remove();
                    else {
                        $(this).closest('.dd-fln').find('.fln-group').remove();
                        $(this).remove();
                    }
                    isFEdit = false;
                }
            });

            $('.dd-list.fll .dd-fln .fln-group .fln-input').live({
                keyup : function(e) {
                    if(e.keyCode == 13) {
                        $(this).closest('.fln-group').find('.btn-fln-save').click();
                    }
                }
            })

            $('.dd-list.fll .dd-fln .btn-fln-save').live({
                click: function(e) {
                    var inputEL = $(this).closest('.fln-group').find('.fln-input'),
                        regExp = /[\{\}\[\]\/!?.,;:|\)*~`^\-_+<>@\#$%&\\\=\(\'\"]/gi,
                        err_str = '',
                        checkAdd = ($(this).closest('li.fli').attr('data-id') == 'clEmptyFolder') ? true : false,
                        beforeFln = (checkAdd) ? '' : $(this).closest('li.fli').attr('data-id'),
                        afterFln = inputEL.val().trim();

                    if(afterFln.length == 0) {
                        // if(text =='clEmptyFolder') {
                        //     $('.add-folder').popover('hide');
                        //     inputEL.parent().closest('.fli[data-id="clEmptyFolder"]').remove();
                        //     $('.fln-group, .btn-fln-cancel').remove();

                        //     var last_class = $('#nestableFolder .fli').last().attr('data-id');
                        //     $('#nestableFolder .fli').last().addClass('active').find('.fa-fl').first().attr('src','https://storage.googleapis.com/i.addblock.net/icon/fa_folder_open.png');
                        //     SFOLDER_ACTIVE = last_class;
                        //     resourceGetPage(1,SFOLDER_ACTIVE);
                        //     $('.add-folder').attr('data-content','').popover('hide');
                        //     isFEdit = false;
                        //     console.log('aa');

                        //     return;
                        // } else {
                        $('#nestableFolder').css('pointer-events','none');
                        err_str = $.lang[LANG]['editor.resource.regExp.empty'];
                        // }
                    } else if(afterFln == 'clEmptyFolder') {
                        $('#nestableFolder').css('pointer-events','none');
                        err_str = $.lang[LANG]['editor.resource.regExp.clEmptyFolder'];
                    } else if(checkEmojis(afterFln)) {
                        $('#nestableFolder').css('pointer-events','none');
                        err_str = $.lang[LANG]['config.unable.emoji'];
                    } else if(regExp.test(afterFln)) {
                        $('#nestableFolder').css('pointer-events','none');
                        err_str = $.lang[LANG]['editor.resource.regExp.specialchar'];
                    } else if($('#nestableFolder .fli[data-id="'+afterFln.replace(/ /g,'-')+'"]:not(.active)').length > 0) {
                        $('#nestableFolder').css('pointer-events','none');
                        err_str = $.lang[LANG]['editor.resource.regExp.overlap'];
                    } else if(afterFln.length > 20) {
                        $('#nestableFolder').css('pointer-events','none');
                        err_str = $.lang[LANG]['editor.resource.regExp.maximum'];
                    } else { 
                        $('#nestableFolder').css('pointer-events','auto');
                        err_str = '';
                    }

                    afterFln = afterFln.replace(/ /g,'-');

                    if(err_str!=''){ 
                        inputEL.focus();
                        $('.add-folder').attr('data-content',err_str).popover('show');
                        if(inputEL.closest('.fli').index() > 9) $('.popover.in').css('top',inputEL.offset().top-($('.dd-list').offset().top+5)-$('#nestableFolder').scrollTop());
                        else $('.popover.in').css('top',inputEL.offset().top-$('.dd-list').offset().top+2);
                    } else { 
                        $('.add-folder').attr('data-content','').popover('hide');
                        $('#nestableFolder').removeAttr('style');

                        inputEL.closest('.fli').attr('data-id',afterFln);
                        inputEL.closest('.fli').find('.dd-fld').attr('attr-id',afterFln);
                        inputEL.closest('.dd-fln').html(afterFln.replace(/-/g,' '));
                        updateOutputFolder($('#nestableFolder').data('output', $('#nestableFolder-output')));
                        resourceFileFolderUpdate(beforeFln,afterFln);
                        SFOLDER_ACTIVE = afterFln;
                        if(beforeFln == 'clEmptyFolder') resourceGetPage(1,SFOLDER_ACTIVE);
                        else {
                            $('#resource-files .fitem').each(function() {
                                $(this).find('.control-area ul[data-ffolder="'+beforeFln+'"]').attr('data-ffolder',afterFln);
                            });
                        }

                        isFEdit = false;
                    }
                }
            });


            $('.selected-files li').live({
                mouseenter : function() {
                    $(this).find('.selected-hover').show();
                },
                mouseleave : function() {
                    $(this).find('.selected-hover').hide();
                }
            });

            $('.fr-selected-files li').live({
                mouseenter : function() {
                    $(this).find('.selected-hover').show();
                },
                mouseleave : function() {
                    $(this).find('.selected-hover').hide();
                }
            });

            $(document).on({
                click : function() { 
                    var file = $(this).find('p.selected-file-name').text();
                    $(this).parent().fadeOut(300,function() {
                        $(this).remove();
                        if(myStorageActive()) {
                            $('#resource-files li .ui-selected').find('p.resource-file-name[data-source="' + file + '"]').closest('.fitem').removeClass('ui-selected');
                            displaySelectedFilesStr();
                        } else {
                            var id = $(this).attr('data-id');
                            $('.fr-storage .imgs.ui-selected').find('.control-area[data-id="' + id + '"]').parents('.imgs').removeClass('ui-selected');
                        }
                    });
                    if($('.selected-files li').length==1) {
                        $('.resource-useit').removeClass('active');
                        $('#selectAll').prop('checked',false);
                    }
                }
            },'.selected-hover');

        },
        open: function() {
            var $modal = $('#el-fileupload');
            $modal.modal('show');
        },
        close: function() {
            var $modal = $('#el-fileupload');
            $modal.modal('hide');
            $('.uploadModal').remove();
        },
        selected: function() {
            if(myStorageActive()) {
                var selected = $('.selected-files li').map(function (i, n) {
                    return $(this).find('p.selected-file-name').text();
                }).get();
            } else {
                var selected = $('.fr-selected-files li').map(function (i, n) {
                    return $(this).find('p.selected-file-name').text();
                }).get();
            }
            return selected;
        }
    }

    $.category = {
        delete : [],
        init : function() {
            $(document).on('click', '#prod-category-text', function(e) { 
                e.stopPropagation(); 
                if($('.category-wrap').hasClass('open')) {
                    $('.category-lists').slideUp(200, function() {
                        $('.category-wrap').removeClass('open');    
                    }); 
                } else {
                    $('.category-wrap').toggleClass('open');
                    $('.category-lists').slideDown(200); 
                }
            });
            $(document).on('click','.form-ctrl-button.category, .gallery-ctrl-category', function(e) { 
                e.stopPropagation();
                var s = $(this).attr('data-category');
                $.category.open(s); 
            });
            $(document).on('click','.cl-category-modal-close',function(e) { $.category.close(); });
            $(document).on('mousedown', '.prod-option-move', function(){
               $(this).closest('.prod-option-list').css('overflow-y', 'auto');
            });
            $(document).on('mouseup', '.prod-option-move', function(){
               $(this).closest('.prod-option-list').css('overflow-y', '');
            });
            $(document).on('blur','.edit-option-title input', function(e) {
                // 중복값 체크
                checkDuplicateOptionName($(this));
            });

            $(document).on('click','.prod-option-title, .prod-option-price, .prod-option-quantity, .prod-option-status, .prod-option-desc, .prod-option-require', function(e) {
                e.stopPropagation();
                var submit = true;
                var parent = $(this).closest('.prod-option');
                $('.prod-option-item').each(function () {
                    $(this).closest('li').removeClass('err');
                });

                if($('.prod-option-list .prod-option-item.hide').length) {
                    $.each($('.prod-option-item.hide'), function(i,v) {
                        var opt_title = $(v).parent().find('.prod-option-edit .edit-option-title input').val(),
                            opt_desc = $(v).parent().find('.prod-option-edit .edit-option-desc input').val(),
                            opt_price = $(v).parent().find('.prod-option-edit .edit-option-price input').val(),
                            opt_quantity = $(v).parent().find('.prod-option-edit .edit-option-quantity input').val(),
                            opt_status = $(v).parent().find('.prod-option-edit .option-price-status-str').attr('data-val'),
                            opt_text_require = $(v).parent().find('.prod-option-edit .option-require-str').attr('data-val');

                        $(v).closest('li').removeClass('err');
                        if(product_options.advanced == 'false') {
                            if(opt_title.length == 0) {
                                $(v).closest('li').addClass('err').find('.edit-option-title input');
                                submit = false;
                                return true;
                            }
                        }
                        switch(opt_status) {
                            case "S" : str = '판매'; break;
                            case "O" : str = '품절'; break;
                            case "H" : str = '숨김'; break;
                            default : str = '판매'; break;
                        }
                        var check;
                        // if(opt_text_require == 'TR') {
                        //     check = "\
                        //         <span>필수</span>\
                        //         <svg class='active' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'>\
                        //         <path d='M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z'/>\
                        //         </svg>";
                        // } else {
                        //     check = "\
                        //         <span>필수</span>\
                        //         <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'>\
                        //         <path d='M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z'/>\
                        //         </svg>";
                        // }
                        var soption = String(opt_price);
                        if(soption.replace('+','') == '' || soption.replace('-','') == '') opt_price = 0;
                        opt_price = removeCommas(opt_price);
                        opt_quantity = removeCommas(opt_quantity);
                        if (!opt_quantity) opt_quantity = 0;
                        if (!opt_price || isNaN(opt_price) === true) opt_price = 0;

                        opt_quantity = (opt_quantity * 1);
                        opt_price = (opt_price * 1);

                        var abs_price = Math.abs(opt_price),
                            str_price = addCommas(abs_price.toString()),
                            str_quantity = addCommas(opt_quantity.toString());

                        $(v).find('.prod-option-title').text(opt_title);
                        $(v).find('.prod-option-desc').text(opt_desc);
                        $(v).find('.prod-option-price').text(str_price).attr('data-option-price',opt_price);
                        $(v).find('.prod-option-quantity').text(opt_quantity);
                        $(v).find('.prod-option-status').text(str).attr('data-val',opt_status);
                        $(v).find('.prod-option-require').html(check).attr('data-val',opt_status);
                        $(v).parent().find('.prod-option-edit').addClass('hide');
                        $(v).removeClass('hide');

                        // 다른 옵션 input 선택시 기존 값 0됨
                        // if(opt_price < 0) {
                        //     $(this).find('.prod-option-price').text(str_price);
                        //     $(this).find('.prod-option-price').find('.prod-option-price').addClass('minus');
                        // } else {
                        //     $(this).find('.prod-option-price').text(str_quantity);
                        //     $(this).find('.prod-option-price').find('.prod-option-price').removeClass('minus');
                        // }
                    });
                }

                var title = $(this).parent().find('.prod-option-title').text(),
                    title_html = $(this).parent().find('.prod-option-title').html(),
                    desc = $(this).parent().find('.prod-option-desc').text(),
                    price = $(this).parent().find('.prod-option-price').attr('data-option-price'),
                    quantity = $(this).parent().find('.prod-option-quantity').text(),
                    status = $(this).parent().find('.prod-option-status').attr('data-val'),
                    text_require = $(this).parent().find('.prod-option-require').attr('data-val'),
                    $title = $(this).parent().siblings('.prod-option-edit').find('.edit-option-title input'),
                    $title_html = $(this).parent().siblings('.prod-option-edit').find('.edit-option-title'),
                    $desc = $(this).parent().siblings('.prod-option-edit').find('.edit-option-desc input'),
                    $price = $(this).parent().siblings('.prod-option-edit').find('.edit-option-price input'),
                    $quantity = $(this).parent().siblings('.prod-option-edit').find('.edit-option-quantity input'),
                    $status = $(this).parent().siblings('.prod-option-edit').find('.option-price-status-str'),
                    $text_require = $(this).parent().siblings('.prod-option-edit').find('.option-require-str');
      
                if(price == 'NaN') price = 0;
                switch(status) {
                    case "S" : str = '판매'; break;
                    case "O" : str = '품절'; break;
                    case "H" : str = '숨김'; break;
                    default : str = '판매'; break;
                }
                price = removeCommas(price);
                quantity = removeCommas(quantity);
                if (!quantity) quantity = 0;
                if (!price || isNaN(price)) price = 0;

                price = (price * 1);
                quantity = (quantity * 1);

                if(product_options.advanced == 'true') {
                    $title_html.html(title_html);
                } else {
                    $title.val(title);
                }
                $desc.val(desc);
                $price.val(addCommas(price.toString()));
                $quantity.val(addCommas(quantity.toString()));
                $status.text(str).attr('data-val', status);
                // $text_require.html(check).attr('data-val', text_require);

                $(this).parent().addClass('hide');
                $(this).parent().siblings('.prod-option-edit').removeClass('hide');
                if($(this).hasClass('prod-option-title')) $title.focus();
                if($(this).hasClass('prod-option-price')) $price.focus();
                if($(this).hasClass('prod-option-quantity')) $quantity.focus();
            });

            $(document).on('keydown', '.edit-option-title input, .options-input', function(e) {
                var keyCode = e.keyCode,
                    shiftKey =  e.shiftKey;
                
                if(keyCode == 222) 
                    if(shiftKey) return false;

                if(keyCode == 191) {
                    if(shiftKey) return;
                    e.stopPropagation();
                    return false;
                }

                if($(this).hasClass('options-input')) {
                    var value = $(this).val(),
                        last = value.split("").pop();
                    if(last == "," && keyCode == 188) {
                        alert('옵션 값을 알맞게 입력해주세요');
                        return false;
                    }
                }
            });

            $(document).on('keyup keydown click','.edit-option-title input, .edit-option-desc input, .edit-option-price input, .edit-option-quantity input',function(e) {
                e.stopPropagation();
                var keyCode = e.keyCode || e.which,
                    eType = e.type,
                    target = e.target,
                    $title = $(this).parents('.form-wrap').find('.edit-option-title input'),
                    $desc = $(this).parents('.form-wrap').find('.edit-option-desc input'),
                    $price = $(this).parents('.form-wrap').find('.edit-option-price input'),
                    $quantity = $(this).parents('.form-wrap').find('.edit-option-quantity input'),
                    $status = $(this).parents('.form-wrap').find('.option-price-status-str'),
                    $text_require = $(this).parents('.form-wrap').find('.option-price-status-str');

                if(eType == 'keydown' && keyCode == 13) e.preventDefault(); //enter submit 방지

                var price = removeCommas($price.val())*1,
                    quantity = removeCommas($quantity.val())*1;

                var $li = $(this).parents('li');

                if(price < 0) {
                    $li.find('.prod-option-price').text(Math.abs(price));
                    $li.find('.prod-option-price').addClass('minus');
                } else {
                    $li.find('.prod-option-price').text(price);
                    $li.find('.prod-option-price').removeClass('minus');
                }

                var abs_price = Math.abs(price),
                    str_price = addCommas(abs_price.toString()),
                    str_quantity = addCommas(quantity.toString());

                $li.find('.prod-option-title').text($title.val());
                $li.find('.prod-option-desc').text($desc.val());
                $li.find('.prod-option-price').text(str_price);
                $li.find('.prod-option-price').attr('data-option-price', price);
                $li.find('.prod-option-quantity').text(str_quantity);
                $li.find('.prod-option-status').text($status.text());

                var submit = false;
                var isDuplicate = true;
                if(eType == 'click' && !$(target).is('.prod-option-list') && !$(target).is('input')) { //다른 옵션 클릭 시 입력
                    isDuplicate = checkDuplicateOptionName($title);
                    submit = true;   
                }

                if(eType == 'keyup') {
                    if(keyCode == 13) {
                        isDuplicate = checkDuplicateOptionName($title);
                        e.preventDefault();
                        submit = true;  
                    }

                    if($('.switch-quantity').prop('checked') == true) { //재고관리 on
                        if(keyCode == 9 && !$('.option-price-number').is(':focus') && !$('.option-price-quantity').is(':focus')) { //tab
                            isDuplicate = checkDuplicateOptionName($title);
                            submit = true;
                        }
                    } else { //재고관리 off
                        if(keyCode == 9 && !$('.option-price-number').is(':focus')) { //tab
                            isDuplicate = checkDuplicateOptionName($title);
                            submit = true;
                        }
                    }  
                }

                if(submit && isDuplicate == false) {
                    shoppingSetOption($('.prod-option-item.hide'));
                }          
            });

            $(document).on('click', function(e) {
                if(!$(e.target).is('.prod-option-list')) {
                    shoppingSetOption($('.prod-option-item.hide'));
                }
            });

            // $(document).off('click','.prod-option-add');
            $(document).on('click','.prod-option-add', addProductOption);

            $(document).on('click', '.cl_etc_state_check', function () {
                $('.cl_etc_state_check').each(function () {
                    $(this).removeClass('active');
                });

                $(this).addClass('active');
                var val = $(this).attr('data-val');
                $('#etc-date-state').val(val);

                if (val == 'N') $('.etc-setting').css('display', 'none');
                else $('.etc-setting').css('display', 'block');
            });
        
            $(document).on('click', '.cl_etc_status_check', function () {
                $('.cl_etc_status_check').each(function () {
                    $(this).removeClass('active');
                });

                $(this).addClass('active');
                var val = $(this).attr('data-val');

                $('#etc-date-status').val(val);
            });
        
            $(document).on('click', '.cl_etc_week_check', function () {
                $('.cl_etc_week_check').each(function () {
                    $(this).removeClass('active');
                });

                $(this).addClass('active');
                var val = $(this).attr('data-val');
                $('#etc-date-week').val(val);
                exceptPicker.disabledDays = null;
                if(val == 'W') {
                    exceptPicker.disabledDays = [0, 6];
                } else if(val == 'K') {
                    exceptPicker.disabledDays = [1, 2, 3, 4, 5];
                } else {
                    exceptPicker.disabledDays = null;
                }
                //exceptPicker.generateDates(true);
                exceptPicker.setSelectedDates($('#etc-start-date-txt').val(), 'start');
                exceptPicker.setSelectedDates($('#etc-end-date-txt').val(), 'end');
                setExceptPicker();
            });
        
            $(document).on('click', '.cl_etc_date_time', function () {
                $('.cl_etc_date_time').each(function () {
                    $(this).removeClass('active');
                });

                $(this).addClass('active');
                var startDate = $(this).attr('data-start_date');
                var endDate = $(this).attr('data-end_date');
                $('#etc-start-date-txt').val(startDate);
                $('#etc-end-date-txt').val(endDate);
                //exceptPicker.generateDates(true);
                exceptPicker.setSelectedDates(startDate, 'start');
                exceptPicker.setSelectedDates(endDate, 'end');
                setExceptPicker();
            });

            $(document).on('click', '.cl_product_state_check', function (e) {
                var state = $(this).attr('for');
                var cnt = $('.prod-option[data-option_mode="normal"] .prod-option-list > li').length;
                var tax = $('#tax').attr('data-total-tax');
                var productNumber = $('#prod-no').val();
                var status = true;

                var current = $('input[name="product_state"]:checked').val();
                if(current == "N" && product_options.advanced == 'true') {
                    if(e.originalEvent != 'undefined' && (state == 'download-product' || state == 'etc-product')) {
                        var str = (state == 'download-product') ? '다운로드' : '기타무형';
                        if(confirm(str + ' 상품은 고급설정을 지원하지 않아 등록된 옵션정보가 초기화 됩니다. 상품 유형을 변경하시겠습니까?') == false) return false;
                        else {
                            $('.options-config').hide();
                            resetOptions();
                        }
                    }
                }
                // console.log(state);
                if(state != 'normal-product') {
                    $('.options-config').hide();
                } else $('.options-config').show();
                if (state == "download-product") { //다운로드상품 선택
                    //입력옵션 비활성화
                    $('.prod-option[data-option_mode="text"]').addClass('hide');
                    $('#text-option').prop('checked', false).closest('.newcheckbox').hide();
                    //추가옵션 비활성화
                    $('.prod-option[data-option_mode="additional"]').addClass('hide');
                    $('#additional-option').prop('checked', false).closest('.newcheckbox').hide();

                    if($('.prod-option-tab .prod-option.hide').length == 3) { //탭 모두 비활성화일때
                        $('.prod-option-tab').addClass('hide');
                        if($('.switch-quantity').is(":checked") == true) {
                            $('.quantity-label').removeClass('on');
                        }
                    }
                    
                    $('#state-append').fadeIn(0);
                    $('#etc-calendar').hide();
                    if ($('#normal-option').is(':checked') === false) { //일반옵션 없음
                        if ($('.real-file-name').length < 1) $('.switch-product').prop('checked','').parents('.form-wrap').addClass('disabled');
                        var html = '<div class="form-group" id="product-state">\
                                        <input type="file" id="upload-file" name="files">\
                                        <div class="product-state-box" id="add-upload-check">\
                                            <div class="product-upload">\
                                                <div class="title">파일 업로드</div>\
                                                <div class="download-contents">\
                                                    <span class="cl_icon_upload02" data-cnt="0">업로드</span>\
                                                    <div id="none-option-file">\
                                                    </div>\
                                                </div>\
                                            </div>\
                                            <div class="download-setting">\
                                                <div class="title">다운로드<br>한도설정';
                                                /*html += '<span class="cl-icon cl_icon_info01"></span>';*/
                                                html += '</div>\
                                                <div id="download-contents">\
                                                    <div class="input-box">\
                                                        <div class="title">기간 제한</div>\
                                                        <div class="textbox">\
                                                            <input type="text" numberOnly class="download-input" id="download-date" value="1" maxlength="90">\
                                                            <span>일</span>\
                                                        </div>\
                                                    </div>\
                                                    <div class="input-box">\
                                                        <div class="title">횟수 제한</div>\
                                                        <div class="textbox">\
                                                            <input type="text" numberOnly class="download-input" id="download-count" value="1" maxlength="10">\
                                                            <span>회</span>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>';
                        // console.log(html);            
                        $('#product-state').remove();
                        $('#state-append').append(html);
                        
                        $('.prod-option[data-option_mode="normal"] .prod-option-list > li').each(function () {
                            var $checkTag = $(this).children('.product-status');
                            if ($checkTag.hasClass('product-status') === false) {
                                var item = '<div class="form-group product-status">\
                                            <div class="product-state-box">\
                                                <div class="product-upload">\
                                                    <div class="title">파일 업로드</div>\
                                                    <div class="download-contents">\
                                                        <span class="cl_icon_upload02" data-cnt="0">업로드</span>\
                                                        <div class="file-box-list" id="file-box-0"></div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>';
                                fileUpdateCnt++;

                                $(this).append(item);
                            } else {
                                var $loadTag = $('.prod-option[data-option_mode="normal"] .prod-option-list > li').eq(0).find('.download-contents div');
                                // console.log($loadTag.html());
                                $('#none-option-file').html($loadTag.html());
                            }
                        });
                    } else { //다운로드 외 다른상품
                        var html = '<div class="form-group" id="product-state">\
                                        <input type="file" id="upload-file" name="files" data-cnt="'+fileUpdateCnt+'">\
                                        <div class="product-state-box" id="add-upload-check">\
                                            <div class="download-setting">\
                                                <div class="title">다운로드<br>한도설정';
                                                /*html += '<span class="cl-icon cl_icon_info01"></span>';*/
                                                html += '</div>\
                                                <div class="download-contents">\
                                                    <div class="input-box">\
                                                        <div class="title">기간 제한</div>\
                                                        <div class="textbox">\
                                                            <input type="text" numberOnly class="download-input" id="download-date" value="1" maxlength="90">\
                                                            <span>일</span>\
                                                        </div>\
                                                    </div>\
                                                    <div class="input-box">\
                                                        <div class="title">횟수 제한</div>\
                                                        <div class="textbox">\
                                                            <input type="text" numberOnly class="download-input" id="download-count" value="1" maxlength="10">\
                                                            <span>회</span>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>';

                        $('#product-state').remove();
                        $('#state-append').append(html);

                        $('.prod-option[data-option_mode="normal"] .prod-option-list > li').each(function () {
                            var $checkTag = $(this).children('.product-status');
                            var option_mode = $(this).closest('.prod-option').attr('data-option_mode');
                            var name = $(this).find('.prod-option-title').text();
                           
                            if ($checkTag.hasClass('product-status') === false && option_mode == 'normal') {
                                var item = '<div class="form-group product-status">\
                                            <div class="product-state-box">\
                                                <div class="product-upload">\
                                                    <div class="title">파일 업로드</div>\
                                                    <div class="download-contents">\
                                                    <span class="cl_icon_upload02" data-cnt="'+fileUpdateCnt+'">업로드</span>';
                                                    if (name == 'noneOption') item += '<div class="file-box-list" id="file-box-0">';
                                                    else item += '<div class="file-box-list" id="file-box-'+fileUpdateCnt+'">';
                                                    item += '</div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>';
                                fileUpdateCnt++;

                                $(this).find('.prod-option-status').text('품절').attr('data-val', 'O');
                                $(this).find('.option-price-status-str').text('품절').attr('data-val', 'O');

                                $(this).append(item);
                            }
                        });
                    }
                    fileUpdateCnt++;
                } else {
                    $('#text-option').closest('.newcheckbox').show();
                    $('#additional-option').closest('.newcheckbox').show();
                    if (state=='normal-product' && taxUse != 'TG03') {
                        $('.options-config').show();
                        $('#state-append').fadeOut(0);  
                    }
                    else {
                        $('#state-append').fadeIn(0);
                    }
                    if (productNumber) {
                        var admin_url = (uadmin == 'um')? '/_admin':'';
                        $.ajax({
                            url: admin_url + '/shopping/download_list_check',
                            type: 'post',
                            dataType: 'json',
                            data: {'product_number': productNumber, 'option_seq': 0},
                            success: function (data) {
                                if (data.code == 'fail') {
                                    alert(data.message);
                                    status = false;
                                    return false;
                                }
                            }
                        });
                    }

                    if (status == false) return false;

                    if (cnt > 0) {
                        var checkFile = $('.file-name').length;
                        if (checkFile > 0) {
                            if (confirm('상품 유형을 변경할 경우 옵션에 등록된 파일이 삭제됩니다.\n계속하시겠습니까?') === true) {
                                $('#product-state').remove();
                                $('.product-status').remove();
                            } else return false;
                        } else {
                            $('#product-state').remove();
                            $('.product-status').remove();
                        }
                    } else {
                        $('#product-state').remove();
                        $('.product-status').remove();
                    }

                    if (state == "etc-product") {
                        $('#etc-calendar').show();
                    } else {
                        $('#etc-calendar').hide();
                    }
                }

                $('.cl_product_state_check').each(function () {
                    $(this).children('.cl-icon').removeClass('cl_icon_check02_on').removeClass('cl_icon_check02_off').addClass('cl_icon_check02_off');
                    $(this).removeClass('active');
                });

                $(this).children('.cl-icon').removeClass('cl_icon_check02_off').addClass('cl_icon_check02_on');

                $(this).addClass('active');
            });

            $(document).on('mouseenter', '.cl-product-info', function () {
                $('.product-info').fadeIn(100);
            }).on('mouseleave', '.cl-product-info', function () {
                $('.product-info').fadeOut(100);
            });

            $(document).on('mouseenter', '.cl-option-info', function () {
                $('.option-info').fadeIn(100);
            }).on('mouseleave', '.cl-option-info', function () {
                $('.option-info').fadeOut(100);
            });

            $(document).on('mouseenter', '.cl-text-option-info', function () {
                $('.text-option-info').fadeIn(100);
            }).on('mouseleave', '.cl-text-option-info', function () {
                $('.text-option-info').fadeOut(100);
            });

            $(document).on('click', '.cl_icon_close', function () {
                var checkCnt = $(this).attr('data-cnt');
                var productNumber = $(this).attr('data-pn');
                var seq = ($('#normal-option').is(':checked'))? $(this).attr('data-seq') : 0;
                var file = $(this).attr('data-file');
                var $parentFile = $(this).parent().parent();
                var $closeFile = $(this).parent();
                var $this = $(this);
                var admin_url = (uadmin == 'um')? '/_admin' : '';

                if (productNumber!=='null' && productNumber!==undefined && seq!=='null' && seq!==undefined) {   
                    $.ajax({
                        url: admin_url + '/shopping/download_list_check',
                        type: 'post',
                        dataType: 'json',
                        data: {'product_number': productNumber, 'option_seq': seq},
                        success: function (data) {
                            if (data.code == 'fail') {
                                alert(data.message);
                                return false;
                            } else {
                                if (confirm(data.message) === true) {
                                    $.processON('Deleting File...');
                                    $.ajax({
                                        type: 'POST',
                                        url: admin_url + '/shopping/file_delete',
                                        data: { s: file, seq: seq},
                                        async: true,
                                        success: function(data) {
                                            checkError(data);
                                            if (checkCnt || checkCnt == 0) {
                                                $closeFile.remove();
                                                $('.file-name-'+checkCnt).remove();
                                                    $this.parent().parent().parent().parent().parent().parent().find('.prod-option-status').text('품절').attr('data-val', 'O');
                                                    $this.parent().parent().parent().parent().parent().parent().find('.option-price-status-str').text('품절').attr('data-val', 'O');

                                            } else $closeFile.remove();
                                            
                                            var $fileCnt = $parentFile.find('.file-name');
                                            if ($fileCnt.length < 1) {
                                                if ($('#none-option-file').length > 0) $('.switch-product').prop('checked','').parents('.form-wrap').addClass('disabled');
                                                $.ajax({
                                                    url: admin_url + '/shopping/file_zero',
                                                    type: 'post',
                                                    data: {'product_number': productNumber}
                                                });
                                            }

                                            $.processOFF();
                                        }
                                    });
                                }
                            }
                        }
                    });
                } else {
                    $.processON('Deleting File...');
                    $.ajax({
                        type: 'POST',
                        url: admin_url + '/shopping/file_delete',
                        data: {s: file},
                        async: true,
                        success: function(data) {
                            checkError(data);
                            if (checkCnt || checkCnt == 0) {
                                $closeFile.remove();
                                $('.file-name-'+checkCnt).remove();
                            } else $closeFile.remove();
                                            
                            var $fileCnt = $parentFile.find('.file-name');
                            if ($fileCnt.length < 1) {
                                $('.switch-product').prop('checked','').parents('.form-wrap').addClass('disabled');
                            }

                            $.processOFF();
                        }
                    });
                }
            });

            $(document).on('click', '.cl_icon_upload02', function () {
                var cnt = $(this).attr('data-cnt'),
                    fileCnt = 0;
                $('#file-box-'+cnt).find('.real-file-name').each(function () {fileCnt++;});
                if ($('#none-option-file').find('.real-file-name').length > 0 || $('#none-option-file').find('.none-real-file-name').length > 0) fileCnt++;

                if (fileCnt >= 1) {
                    // alert('파일은 1개만 업로드 가능합니다.\n여러 파일을 업로드할 경우 압축 파일을 이용해 주세요.');
                    var modal = $(this).showModalFlat('','파일은 1개만 업로드 가능합니다.\n여러 파일을 업로드할 경우 압축 파일을 이용해 주세요.',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                        $(document).on('keydown', function(e) {
                            if(e.keyCode == 27) modal.modal('hide');
                        });
                    });
                    return false;
                }

                $thisUploadCheck = $(this);
                $('#product-state').find('input[type="file"]').attr('data-cnt', cnt).click();
            });

            $(document).on('click', '#upload-file', function (data) {
                var sid = (typeof SID == 'undefined') ? property.SID : SID
                    uid = '',
                    cnt = $(this).attr('data-cnt');
                $.uploadON();
                $(this).fileupload({
                    url: '/shopping/image_upload/type/file/sid/'+sid+'/uid/'+uid,
                    dataType: 'json',
                    pasteZone: null,
                    async: true,
                    change: function(e, data) {
                        var ext = ['zip', 'txt', 'pdf', 'docx', 'xlsx', 'xls', 'csv', 'ppt', 'pptx', 'gif', 'jpg', 'jpeg', 'png', 'ico', 'hwp', 'mp3', 'wav', 'wma', 'mp4'];
                        var extAry = data.fileInput[0]['files'][0]['name'].split(".");
                        if (ext.indexOf(extAry[extAry.length - 1]) == -1) {
                            alert('지원하지 않는 파일 형식이거나 파일이 손상되어 업로드할 수 없습니다. 확인 후 다시 시도해 주시기 바랍니다.');
                            return false;
                        }

                        var maxSize  = 1024 * 1024 * 512;
                        var fileSize = data.fileInput[0]['files'][0]['size'];
                        if (fileSize > maxSize) {
                            alert($.lang[LANG]['editor.upload.max.500'] + $.lang[LANG]['editor.upload.max.2']);
                            return false;
                        }
                    },
                    add: function(e, data) {
                        $('.uploadModal').show();
                        var submit = true, err = '';                        
                        var ext = ['zip', 'txt', 'pdf', 'docx', 'xlsx', 'xls', 'csv', 'ppt', 'pptx', 'gif', 'jpg', 'jpeg', 'png', 'ico', 'hwp', 'mp3', 'wav', 'wma', 'mp4'];
                        var extAry = data.fileInput[0]['files'][0]['name'].split(".");
                        if (ext.indexOf(extAry[extAry.length - 1]) == -1) {
                            err = $.lang[LANG]['editor.upload.error.ext'];
                            submit = false;
                        }

                        var maxSize  = 1024 * 1024 * 512;
                        var fileSize = data.fileInput[0]['files'][0]['size'];
                        if (fileSize > maxSize) {
                            err = $.lang[LANG]['editor.upload.max.500'] + $.lang[LANG]['editor.upload.max.2'];
                            submit = false;
                        }
                        $('#loading').css('left','-100%');

                        var fileSize = (data.files[0].size/1024/1024).toFixed(1) + 'MB';
                        var tpl = '<div class="file">\
                            <div class="progress"><div class="progress-bar"></div></div>\
                            <div class="progress-info"><span class="file-name">' + data.files[0].name + '</span><span class="file-size">' + fileSize + '</span><span class="ing">' + $.lang[LANG]['editor.upload.response'] + '</span></div>\
                            <div class="preview"></div>\
                            </div>';
                        data.context = $(tpl).insertBefore($('.uploadModal .upload-content .upload-cancel'));
                        data.context.find('.preview').addClass('not_image');
                        if(submit) {
                            var jqXHR = data.submit();
                            UPLOAD++;
                        } else {
                            data.context.find('.loading').html('<i class="fa fa-times error"></i>');
                            data.context.find('.ing').addClass('error').text(err);
                        }
                        $(document).on('click','.upload-cancel .btn, .upload-close', function(e) {
                            if(jqXHR != undefined) jqXHR.abort();
                            data.context.fadeOut().remove();
                            $('.uploadModal #file-upload-progress').css('width','0%');
                            UPLOAD = 0;
                            UPLOADED = 0;
                            UPLOADSIZE = 0;
                            PROGRESS = 0;

                            $.uploadOFF();
                        });

                    },
                    progress: function(e, data) {
                        var rate = (data.bitrate/1024).toFixed(1) + ' kbps';
                        var progress = parseInt((data.loaded / data.total) * 100, 10);
                        if(typeof data.context != 'undefined') {
                            data.context.find('.res').text(data.bitrate);
                            data.context.find('.progress-bar').css('width',progress + "%");
                            data.context.find('.ing').text(progress + "%");
                            data.context.find('.rate').text(rate);
                            if(progress == 100) {
                                data.context.find('.ing').text($.lang[LANG]['editor.upload.response']);
                            }
                        }
                    },                        
                    done: function(e, data) {
                        if(typeof data.result.error != 'undefined' && data.result.error) {
                            alert(data.result.error);
                            $.uploadOFF();
                            return;
                        }
                        var fileSize = data.result.file_size, unit = 'KB';

                        if (fileSize >= 1000) {
                            fileSize = fileSize / 1000;
                            fileSize = fileSize.toFixed(2);
                            unit = 'MB';
                            if (fileSize >= 1000) {
                                fileSize = fileSize / 1000;
                                fileSize = fileSize.toFixed(2);
                                unit = 'GB';
                            }
                        }

                        var fileName = data.result.client_name, totalByte = 0, strFileName = '';
                        if (!fileName) {
                            alert('업로드 도중 오류가 발생했습니다. 다시 시도해 주세요.\n지속적으로 문제가 발생한다면 관리자에게 문의해 주세요.');
                            $.uploadOFF();
                            return false;
                        }
                        var file = fileName.split('.');
                        var fileLen = file[0].length;
                        for (var i=0;i<fileLen;i++) {
                            oneChar = file[0].charAt(i);
                            if (escape(oneChar).length > 4) {
                                totalByte += 2;
                            } else {
                                totalByte++;
                            }

                            if (totalByte > 10) {
                                strFileName += '..';
                                break;
                            }

                            strFileName += oneChar;
                        }
                        strFileName = strFileName+"."+file[(file.length - 1)];
                        var splitUrl = data.result.full_path.split('/');
                        var fileCnt = $('.file-name').length;

                        var file = '<div class="file-name file-name-'+fileCnt+'">\
                                        <span class="real-file-name">'+fileName+'</span>\
                                        <span class="file-name-detail" title="'+fileName+'">'+strFileName+'</span>\
                                        <span class="file-size">'+fileSize+unit+'</span>\
                                        <span class="cl-icon cl_icon_close" data-cnt="'+fileCnt+'" data-file="'+splitUrl[8]+'" data-pn="'+closeProductNumber+'"></span>\
                                        <span class="file-url">'+data.result.full_path+'</span>\
                                    </div>';

                        // console.log(file);
                        var licnt = $('.prod-option-list > li').length;
                        if ($thisUploadCheck.parent().parent().find('#none-option-file').length <= 0) {
                            $thisUploadCheck.parent().parent().parent().parent().parent().find('.prod-option-status').text('판매').attr('data-val', 'S');
                            $thisUploadCheck.parent().parent().parent().parent().parent().find('.option-price-status-str').text('판매').attr('data-val', 'S');
                        }
                        if ($('#normal-option').is(':checked') === false) {
                            var noneFile = '<div class="none-file-name">\
                                            <span class="none-real-file-name">'+fileName+'</span>\
                                            <span class="none-file-name-detail" title="'+fileName+'">'+strFileName+'</span>\
                                            <span class="none-file-size">'+fileSize+unit+'</span>\
                                            <span class="cl-icon cl_icon_close" data-cnt="'+fileCnt+'" data-file="'+splitUrl[8]+'" data-pn="'+closeProductNumber+'"></span>\
                                            <span class="none-file-url">'+data.result.full_path+'</span>\
                                        </div>';
                            // console.log('file-box-cnt: '+cnt);
                            $('#file-box-'+cnt).append(file);
                            $('#none-option-file').append(noneFile);
                        } else {
                            $('#file-box-'+cnt).append(file);
                        }
                        // console.log(noneFile);
                        progress1 = parseInt(UPLOADED / UPLOAD * 100,10);
                        PROGRESS = progress1 + progress2;
                        $('.file-upload-progress .progress-bar').css({
                            'width' : PROGRESS + '%',
                            'text-align' : 'right',
                            'padding-right' : '5px'
                        }).text(PROGRESS + '% ');

                        UPLOADED++;
                        if(UPLOADED) {
                            //$.uploadON(UPLOADED + " / " + UPLOAD + "<br>images creating...");
                            if(UPLOAD==UPLOADED) {
                                UPLOAD = 0;
                                UPLOADED = 0;
                                UPLOADSIZE = 0;
                                PROGRESS = 0;

                                $('.file-upload-progress .progress-bar').css({
                                    'width' :  PROGRESS + '%',
                                    'padding-right' : '0px'
                                }).text('');
                            }
                        }

                        $.uploadOFF();
                    },
                    progressall: function(e, data) {
                        var total = (data.total/1024/1024).toFixed(1) + 'MB';
                        $('.uploadModal .info1').text($.lang[LANG]['editor.upload.size.total'] + total);
                        $('.uploadModal .info2').text((UPLOADED+1) + ' / ' + UPLOAD.toString());
                        var progress = parseInt((data.loaded / data.total) * 100, 10);
                        $('.file-upload-progress .progress-bar').css('width',progress + "%");
                    },
                    start : function(e, data) {
                        $('.uploadModal .upload-header h1').text($.lang[LANG]['editor.upload.title.2']);
                        $('.uploadModal .upload-content .upload-cancel .btn-default').text($.lang[LANG]['config.cancel']);
                        progress1 = 0; progress2 = 0; PROGRESS = 0;
                    },
                    dragover : function(e, data) {
                        e.preventDefault();
                    }
                }).prop('disabled', !$.support.fileInput)
                    .parent().addClass($.support.fileInput ? undefined : 'disabled');
            });

            $(document).on('keyup', '#download-date', function () {
                var $this_val = strReplace($(this).val(), ',', '');
                if ($this_val != '') {
                    if ($this_val > 90) {
                        // alert('기간 제한은 최소 1일에서 최대 90일입니다.');
                        $(this).blur();
                        var modal = $(this).showModalFlat('','기간 제한은 최소 1일에서 최대 90일입니다.',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                            $(document).on('keydown', function(e) {
                                if(e.keyCode == 27) modal.modal('hide');
                            });
                        });
                        $(this).val(90);
                        return false;
                    }

                    if ($this_val < 1) {
                        // alert('기간 제한은 최소 1일에서 최대 90일입니다.');
                        $(this).blur();
                        var modal = $(this).showModalFlat('','기간 제한은 최소 1일에서 최대 90일입니다.',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                            $(document).on('keydown', function(e) {
                                if(e.keyCode == 27) modal.modal('hide');
                            });
                        });
                        $(this).val(1);
                        return false;
                    }
                }
            });

            $(document).on('focusout', '#download-date', function () {
                var $this_val = strReplace($(this).val(), ',', '');
                if ($this_val == '') {
                    // alert('기간 제한은 최소 1일에서 최대 90일입니다.');
                    $(this).blur();
                    var modal = $(this).showModalFlat('','기간 제한은 최소 1일에서 최대 90일입니다.',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                        $(document).on('keydown', function(e) {
                            if(e.keyCode == 27) modal.modal('hide');
                        });
                    });
                    $(this).val(1);
                    return false;
                }
            });

            $(document).on('keyup', '#download-count', function () {
                var $this_val = strReplace($(this).val(), ',', '');
                if ($this_val != '') {
                    if ($this_val > 10) {
                        // alert('다운로드 횟수는 최소 1회에서 최대 10회입니다.');
                        $(this).blur();
                        var modal = $(this).showModalFlat('','다운로드 횟수는 최소 1회에서 최대 10회입니다.',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                            $(document).on('keydown', function(e) {
                                if(e.keyCode == 27) modal.modal('hide');
                            });
                        });
                        $(this).val(10);
                        return false;
                    }

                    if ($this_val < 1) {
                        // alert('다운로드 횟수는 최소 1회에서 최대 10회입니다.');
                        $(this).blur();
                        var modal = $(this).showModalFlat('','다운로드 횟수는 최소 1회에서 최대 10회입니다.',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                            $(document).on('keydown', function(e) {
                                if(e.keyCode == 27) modal.modal('hide');
                            });
                        });
                        $(this).val(1);
                        return false;
                    }
                }
            });

            $(document).on('focusout', '#download-count', function () {
                var $this_val = strReplace($(this).val(), ',', '');
                if ($this_val == '') {
                    // alert('다운로드 횟수는 최소 1회에서 최대 10회입니다.');
                    $(this).blur();
                    var modal = $(this).showModalFlat('','다운로드 횟수는 최소 1회에서 최대 10회입니다.',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                        $(document).on('keydown', function(e) {
                            if(e.keyCode == 27) modal.modal('hide');
                        });
                    });
                    $(this).val(1);
                    return false;
                }
            });

            $(document).on('click','.option-price-status-str', function(e) {
                e.stopPropagation();
                var check = $(this).attr('data-val');
                if($(this).hasClass('open')) {
                    $(this).next().slideUp(200, function() {
                        $('.option-price-status-str').removeClass('open');    
                    }); 
                } else {
                    $(this).addClass('open');
                    $(this).next().find('li').removeClass('active');
                    $(this).next().find('li[data-val="' + check + '"]').addClass('active');
                    $(this).next().slideDown(200); 
                }

            });

            // $(document).on('change', '.option-require-str input', function(){
            //     var $option_li = $(this).closest('li');
            //     if($(this).is(':checked')) {
            //         $option_li.find('.option-require-str').attr('data-val', 'TR');
            //         $option_li.find('.prod-option-require').attr('data-val', 'TR');
            //     } else {
            //         $option_li.find('.option-require-str').attr('data-val', 'T');
            //         $option_li.find('.prod-option-require').attr('data-val', 'T');
            //     }
            // });

            $(document).on('click', '.option-price-status-select li', function(e) {
                e.stopPropagation();
                $('.option-price-status-select li').removeClass('active');
                $(this).addClass('active');
                var str = $(this).text(),
                    val = $(this).attr('data-val');

                $(this).parents('.edit-option-select').find('.option-price-status-str').text(str).attr('data-val',val);
                $(this).parents('li').find('.prod-option-status').text(str).attr('data-val',val);

                $(this).parent().slideUp(200);
            });

            $(document).on('click','.edit-option-delete', function(e) { 
                var $option = $(this),
                    // seq = ($('#normal-option').is(':checked'))? $(this).attr('data-seq') : 0,
                    seq = $(this).attr('data-seq'),
                    sid = (typeof SID == 'undefined') ? property.SID : SID;
                    option_mode = $option.closest('.prod-option').attr('data-option_mode'),
                    fileName = $option.closest('li').find('.real-file-name').text();
                var status = true;
                var productNumber = $('#prod-no').val();
                var admin_url = (uadmin == 'um')? '/_admin' : '';

                if (option_mode == "normal" && seq!==undefined && productNumber && fileName) {
                    $.ajax({
                        url: admin_url + '/shopping/download_list_check',
                        type: 'post',
                        dataType: 'json',
                        data: {'product_number': productNumber, 'option_seq': seq},
                        success: function (data) {
                            if (data.code == 'fail') {
                                alert(data.message);
                                status = false;
                                return false;
                            }
                        }
                    });
                }
                
                if (status == false) return false;
                var modal = $(this).showModalFlat($.lang[LANG]['config.information'], '선택한 옵션을 삭제하시겠습니까?', true, true, function() {
                    if(typeof seq != "undefined" || seq) {
                        var deleted = ($('#options-delete-list').val()) ? $('#options-delete-list').val().split(",") : [];
                            deleted.push(seq);
                        // var deleted_items = [...new Set(deleted)];
                        var deleted_items = deleted.filter(onlyUnique);
                        $('#options-delete-list').val(deleted_items.join(","));
                        $option.parents('li').remove(); 

                        var liTotal = 0;
                        $('.prod-option-list > li').each(function () { liTotal++; });
                        if (liTotal < 2) $('.plus-price').addClass('hide');
                        // $.post('/template/products', { seq : seq, sid : sid, type : 'delete', mode: 'option' }, function(data) {
                        //     if(typeof data.error != "undefined" || data.error) {
                        //         alert(data.error);
                        //         return false;
                        //     }
                        //     $option.parents('li').remove(); 

                        //     var liTotal = 0;
                        //     $('.prod-option-list > li').each(function () { liTotal++; });
                        //     if (liTotal < 2) $('.plus-price').addClass('hide');
                        // }, 'json');
                    } else {
                        var optionMode = $option.closest('.prod-option').attr('data-option_mode');
                        $option.parents('li').remove(); 

                        var liTotal = 0;
                        $('.prod-option-list > li').each(function () { liTotal++; });
                        if (liTotal < 2) $('.prod-str-price').text('');
                    }

                    if($('.switch-quantity').is(":checked") == true) {
                        if($('#normal-option').is(':checked') === true) {
                            // $('#prod-quantity').attr('readonly','true').removeClass('hide').attr('placeholder','옵션에서 재고 관리');
                            $('.quantity-label').addClass('on');
                            $('.plus-quantity').removeClass('hide');
                        } else if($('#normal-option').is(':checked') === false && $('#additional-option').is(':checked') === true) {
                            $('.quantity-label').removeClass('on');
                            $('#prod-quantity').removeAttr('readonly').removeClass('hide');
                            $('.plus-quantity').removeClass('hide');
                        } else {
                            $('.quantity-label').removeClass('on');
                            $('#prod-quantity').removeAttr('readonly').removeClass('hide');
                            $('.plus-quantity').addClass('hide');
                        }
                    } else {
                        $('.quantity-label').removeClass('on');
                        $('.switch-quantity').parents('.form-wrap').addClass('disabled');
                        $('#prod-quantity').addClass('hide');
                        $('.prod-option-quantity, .prod-plus-quantity, .edit-option-quantity').hide();
                        $('.plus-quantity').addClass('hide');
                    }

                    // var normalCnt = $('.prod-option[data-option_mode="normal"] .prod-option-list > li').length;
                    if ($('#normal-option').is(':checked') === false) {
                        var html = '\
                        <div class="product-upload">\
                            <div class="title">파일 업로드</div>\
                            <div class="download-contents">\
                                <span class="cl_icon_upload02" data-cnt="'+fileUpdateCnt+'">업로드</span>\
                                <div id="none-option-file"></div>\
                            </div>\
                        </div>\
                        ';

                        fileUpdateCnt++;

                        $('#add-upload-check').prepend(html);
                        if ($('#none-option-file').length > 0) $('.switch-product').prop('checked','').parents('.form-wrap').addClass('disabled');
                    }

                    var cnt = $('.prod-option[data-option_mode="'+option_mode+'"] .prod-option-list > li').length;
                    if(option_mode == 'normal') {
                        if(cnt == 1) {
                            $('.prod-option[data-option_mode="normal"]').addClass('hide');
                            $('#normal-option').prop('checked', false);
                        }
                    } else {
                        if(cnt == 0) {
                            $('.prod-option[data-option_mode="'+option_mode+'"]').addClass('hide');
                            $('#'+option_mode+'-option').prop('checked', false);
                        }
                        if(option_mode == 'text' && cnt < 7) {
                            $('.prod-option[data-option_mode="text"] > .prod-option-add').removeClass('disabled');
                        }
                    }

                    if($('.prod-option-tab .prod-option.hide').length == 3) {
                        $('.prod-option-tab').addClass('hide');
                    }

                    modal.modal('hide');
                },'cancel', 'ok', 'cl-p130 cl-cmmodal cl-s-btn w560 cl-p0');            
            });
            $(document).on('click','.category-lists li', function(e) { 
                e.stopPropagation();
                $(this).toggleClass('active'); 
                var selected = $('.category-lists li.active').map(function() {
                    return $(this).text();
                }).get().join(', ');
                selected = (selected.length==0) ? '카테고리를 선택하세요' : selected;
                $('#prod-category-text').text(selected);
            });
            $(document).on('click','.category-wrap', function(e) { 
                var txt = $(this).find('.category-text').text(),
                    selected = $.map(txt.split(","), $.trim);
                
                $.each($('.category-lists li'), function(i,v) {
                    var s = $.trim($(this).text());
                    if(selected.indexOf(s) > -1) {
                        $(this).addClass('active');
                    }
                });
                // $('.category-lists').slideToggle(); 
            });
            /*--------- move -------------*/
            $(document).on('click','.category-title', function() {
                var submit = true;
                if($('.category-move.delete').length) {
                    $.each($('.category-move.delete'), function(i,v) {
                        $(this).removeClass('delete').find('i').removeClass('fa-trash-o').addClass('fa-arrows');
                        var txt = $(this).parents('li').find('.category-input').val();
                        if(txt.length == 0) {
                            submit = false;
                            return true;
                        }
                        $(this).parents('li').find('.category-title').text(txt).removeClass('hide');
                    });
                }

                if(submit) {
                    var v = $(this).text();
                    if(!$(this).hasClass('hide')) {
                        $(this).addClass('hide');
                        $(this).siblings('.form-wrap').find('.category-input').val(v).focus();
                    }
                    $(this).parents('li').find('.category-move').addClass('delete').html('<i class="fa fa fa-trash-o" aria-hidden="true">');
                }
            });
            $(document).on('focus', '.category-input', function(e) {
                var submit = true;
                if($('.category-move.delete').length) {
                    $.each($('.category-move.delete'), function(i,v) {
                        $(this).removeClass('delete').find('i').removeClass('fa-trash-o').addClass('fa-arrows');
                        var txt = $(this).parents('li').find('.category-input').val();
                        if(txt.length == 0) {
                            submit = false;
                            return true;
                        }
                        $(this).parents('li').find('.category-title').text(txt).removeClass('hide');
                    });
                }

                $(this).parents('li').find('.category-move').addClass('delete').find('i').removeClass('fa-arrows').addClass('fa-trash-o');
            });
            $(document).on('keyup', '.category-input', function(e) {
                var keyCode = e.keyCode,
                    search = $(this).val().trim(),
                    v = $(this).val().trim();

                $(this).parents('.form-wrap').siblings('.category-title').text(v);
                if(checkEmojis(v)) {
                    e.preventDefault();

                    errorEmojisModal('', function() { 
                        $('.modal-dialog.error-emoji').closest('.flat-modal').next('.modal-backdrop').attr('style','z-index: 10001!important;');
                        $('.modal-dialog.error-emoji').closest('.modal').attr('style','display: block; z-index: 10002;'); 
                    }, '');
                    return false;
                }
                if(v.length==0) return false;
                if(keyCode == 13) {
                    if($.category.check()) {
                        // alert('카테고리명 중복입니다');
                        var modal = $(this).showModalFlat('','카테고리명 중복입니다',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                            $(document).on('keydown', function(e) {
                                if(e.keyCode == 27) modal.modal('hide');
                            });
                        });
                        return false;
                    }
                    $(this).parents('.form-wrap').siblings('.category-title').removeClass('hide');
                    $(this).parents('.form-wrap').siblings('.category-move').removeClass('delete').html('<i class="fa fa-arrows" aria-hidden="true"></i>');
                }
            });
            $(document).on('blur', '.category-input', function(e) {
                if(checkEmojis($(this).val().trim())) {
                    e.preventDefault();
                    var focus_input = $(this);
                    errorEmojisModal('', function() { 
                        $('.modal-dialog.error-emoji').closest('.flat-modal').next('.modal-backdrop').attr('style','z-index: 10001!important;');
                        $('.modal-dialog.error-emoji').closest('.modal').attr('style','display: block; z-index: 10002;'); 
                    });
                }
            });

            $(document).on('click','.item-add', function() {
                if($(this).closest('.category-edit').find('li:not(.item-add) .category-title.hide').length > 0) {
                    $(this).closest('.category-edit').find('li:not(.item-add) .category-title.hide').eq(0).closest('li').find('.form-wrap .form-group input.category-input').focus();
                    return false;
                }

                $('.category-edit li:last-child').before($('<li><div class="form-wrap"><div class="form-group"><input type="text" class="category-input" required="required"/><label for="input" class="control-label">카테고리 이름</label><i class="bar"></i></div></div><div class="category-move delete"><i class="fa fa-trash-o" aria-hidden="true"></i></div><div class="category-title hide"></div></li>'));
                $('.category-input:last-child').focus();
            });
            $(document).on('click','.category-move.delete', function(e) {
                if($(this).closest('.category-edit').children('li:not(.item-add)').length <= 1) {
                    $(this).showModalFlat($.lang[LANG]['config.information'], $.lang[LANG]['editor.gallery.category.delete.last'], true, false, '', 'ok','', 'cl-cmmodal cl-s-btn w560 cl-p130 cl-p0 cl-okbtn-pbt70 category-error', false, '', function() {
                        $('.modal-dialog.category-error').closest('.flat-modal').next('.modal-backdrop').attr('style','z-index: 10001!important;');
                        $('.modal-dialog.category-error').closest('.modal').attr('style','display: block; z-index: 10002;'); 
                    });
                    return false;
                }

                ($.category.delete).push($(this).next().text());
                $(this).parents('li').find('.category-input').val('');
                $(this).parents('li').remove();
            });
            $(document).on('click','.prod-button .modal-close', function(e) { $.products.close(); });
            $(document).on('click','.category-modal .cl-category-modal-ok', function(e) {
                var change = [], 
                    del = $.category.delete,
                    regexp = /^[ㄱ-ㅎ가-힣ㅏ-ㅣa-zA-Z0-9\# ]+$/i,
                    checkRegexp = false,
                    checkMin = false,
                    checkMax = false;

                var category_lists = $('.category-edit .category-title').map(function(){
                    var org = $(this).attr('data-org'),
                        val = $(this).text().trim();

                    if(val.length < 1) checkMin = true;
                    if(val.length > 20) checkMax = true;

                    if(org != val) change.push(org + '|' + val);
                    if(val != '') { 
                        if(!regexp.test(val)) checkRegexp = true;
                        
                        return val;
                    }
                }).get();

                var error_str = '';
                if(checkMin)            error_str = $.lang[LANG]['board.enter-min-chars.1'];
                else if(checkMax)       error_str = $.lang[LANG]['board.enter-max-chars'];
                else if(checkRegexp)    error_str = $.lang[LANG]['board.allowed-chars'];

                if(error_str.length > 0) {
                    $(this).showModalFlat($.lang[LANG]['config.information'], error_str, true, false, '', 'ok','', 'cl-cmmodal cl-s-btn w560 cl-p130 cl-p0 cl-okbtn-pbt70 category-error', false, '', function() {
                        $('.modal-dialog.category-error').closest('.flat-modal').next('.modal-backdrop').attr('style','z-index: 10001!important;');
                        $('.modal-dialog.category-error').closest('.modal').attr('style','display: block; z-index: 10002;'); 
                    });
                    return false;
                }

                if(checkEmojis(category_lists.toString())) {
                    e.preventDefault();
                    errorEmojisModal('', function() { 
                        $('.modal-dialog.error-emoji').closest('.flat-modal').next('.modal-backdrop').attr('style','z-index: 10001!important;');
                        $('.modal-dialog.error-emoji').closest('.modal').attr('style','display: block; z-index: 10002;'); 
                    }, '');
                    return false;
                }

                if($.category.check()) {
                    // alert('카테고리명 중복입니다');
                    var modal = $(this).showModalFlat('','카테고리명 중복입니다',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                        $(document).on('keydown', function(e) {
                            if(e.keyCode == 27) modal.modal('hide');
                        });
                    });
                    return false;
                }

                var $category = $('#prod-category-text');
                var cate = ($category.text().trim()) ? $category.text().trim().split(', ') : [];

                if(cate.length && del.length) {
                    $.each(del, function(i,v) {
                        var idx = cate.indexOf(v);
                        if(idx > -1) cate.splice(idx, 1)
                    });
                    $category.text(cate.join(', '));
                }

                if(cate.length && change.length) {
                    $.each(change, function(i,v) {
                        var s = v.split('|'),
                            idx = cate.indexOf(s[0]);
                        if(idx > -1) cate[idx] = s[1];
                    });
                    $category.text(cate.join(', '));
                }
                if($category.text() == '') $category.text('카테고리를 선택하세요');
                
                var pid = ($('.prod-modal').length) ? $('#prod-pid').val() : $('.gallery-ctrl-category').attr('data-pid'),
                    gid = $('#prod-no').val();

                $.post('/template/gallery/category', { sid : SID, s : category_lists, mode : 'block', seq : pid, gid : gid, change : change, del : del }, function(r) {
                    if(typeof r.error !='undefined' && r.error) {
                        alert(r.error);
                        return false;
                    }

                    $('#prod-category-lists ul, .toolbar-category .item-submenu').empty();
                    $('.gallery-category li.category-text').remove();
                    var s = '';
                    $.each(category_lists, function(i,v) {
                        var li_str = '<li>' + v + '</li>',
                            li_str2 = '<li class="category-text">' + v + '</li>';
                        s = s + li_str;
                        $('#prod-category-lists ul').append(li_str);
                        $('.toolbar-category .item-submenu').append(li_str);
                        $('.gallery-category .gallery-category-onoff').before(li_str2);
                    });
                    $.gallery.cates = s;
                    $('#prod-category, .gallery-ctrl-category, .gallery-modal').attr('data-category',category_lists.toString());


                    $category = $('#prod-category-text');
                    var cate = ($category.text().trim()) ? $category.text().trim().split(', ') : [];
                    $.each($('.category-lists li'), function(i,v) {
                        // IE ERROR_includes__H.20210603
                        // if(cate.includes($(this).text())) $(this).addClass('active');
                        if($.inArray($(this).text(),cate) > -1) $(this).addClass('active');
                    });
                    $.category.close();
                    if($('.gallery-modal').hasClass('shopping')) $.gallery.show($.gallery.block_id,1,$.gallery.category);
                    $.gallery.update = true;

                }, 'json');
            });
        },
        open : function(s) {
            if($('.cl-category-modal-backdrop').length >0) $('.cl-category-modal-backdrop').remove();
            var text = s.split(',');
            var $backdrop = $('<div class="cl-category-modal-backdrop"></div>'),
                $title = $('<h1 class="category-modal-title">' + $.lang[LANG]['editor.block.gallery.category.edit.title'] + '</h1>'),
                $modal = $('<div class="cl-category-modal cl-p-modal category-modal"></div>'),
                $lists = $('<ul class="category-edit"></ul>'),
                $item_add = $('<li class="item-add"></li>');
                $modal_footer = $('<div class="cl-category-modal-footer"><div class="cl-category-modal-close">' + $.lang[LANG]['config.close'] + '</div><div class="cl-category-modal-ok">' + $.lang[LANG]['config.save'] + '</div></div>');

            $.each(text, function(i,v) {
                var item = "\
                    <li>\
                        <div class='form-wrap'>\
                            <div class='form-group'>\
                                <input type='text' class='category-input' required='required' value='" + v + "'>\
                                <label for='input' class='control-label'>"+ $.lang[LANG]['editor.block.gallery.category.edit.name'] +"</label><i class='bar'></i>\
                            </div>\
                        </div>\
                        <div class='category-move'><i class='fa fa-arrows' aria-hidden='true'></i></div>\
                        <div class='category-title' data-org='" + v + "'>" + v + "</div>\
                    </li>\
                ";
                $lists.append($(item));
            });

            // $('.category-edit').append($(item));

            $lists.append($item_add);
            $modal.append($title).append($lists).append($modal_footer);
            $backdrop.append($modal);
            $('body').append($backdrop);
            $backdrop.fadeIn(500);
            $('.category-edit').sortable({
                handle : ".category-move"
            });
        },
        close : function() {
            $('.cl-category-modal-backdrop').fadeOut(500, function() { $(this).remove(); });
        },
        check : function() {
            var category = $.category.list(),
                // set_category = new Set(category);
                set_category = category.filter(onlyUnique);

            // IE ERROR (filter)
            // check = category.filter((s => v => s.has(v) || !s.add(v))(new Set)); 

            // 변경 없이 저장시 중복 체크 이슈 생김
            // return (category.length !== set_category.size) ? true : false;
            return (category.toString() !== set_category.toString()) ? true : false;
        },
        list : function() {
            var category_lists = $('.category-edit .category-title').map(function(){
                var org = $(this).attr('data-org'),
                    val = $(this).text().trim();
                if($(this).text().trim()) {
                    return $(this).text().trim();
                }
            }).get();
            return category_lists;            
        }
    }


    $.shoppingmall = {        
        orderStatusDetailsModal: function(sid, pnum, onum, ognum, kind) {
            if(typeof sid == "undefined" || typeof pnum == "undefined" || typeof onum == "undefined" || typeof kind == "undefined") {
                alert('정보가 올바르지 않습니다');
                return false;
            }

            $.post('/_check_order', { sid:sid, pnum:pnum, onum:onum, ognum:ognum,mode:'kind/'+kind }, function(data) {

                if(typeof data.error != "undefined" && data.error) {
                    $(this).showModalFlat('ERROR', data.error, true, false, '', 'close');
                    return false;
                }
                var c_data = data.r,
                    status = c_data.odata.reason_d_status,
                    kind_str = c_data.odata.kind_str,
                    product_status_str = c_data.odata.product_status_str,
                    payClass = c_data.odata.class;
                   
                    option_name = (typeof c_data.pdata.option != "undefined" && c_data.pdata.option) ? c_data.pdata.option : '',
                    // option_str = (option_name) ? '<br><span class="osd-gray">옵션: '+option_name+'</span>' : '',
                    now_status_html = '',
                    delivery_info = c_data.pay_info.delivery,
                    option_title = (c_data.pdata.option_type == 'A') ? '추가옵션: ' + c_data.pdata.option_group + ': ' : '옵션: ';
                if(option_name) {
                    option_str = (c_data.pdata.option_text_str)? '<br><span class="osd-gray">' + option_title + option_name+' / '+c_data.pdata.option_text_str+'</span>':'<br><span class="osd-gray">'+ option_title + option_name+'</span>';
                } else {
                    option_str = (c_data.pdata.option_text_str)? '<br><span class="osd-gray">' + option_title + c_data.pdata.option_text_str + '</span>' : '';
                }
                
                if(status.length > 1) {
                    var now_title = c_data.odata.product_status_str.replace(/ /g,'').replace('거부재발송','거부'),
                        now_msg = (status.indexOf('W') > -1) ? c_data.odata.h_msg : 

                        c_data.odata.adm_msg,
                        now_msg_html = (jQuery.inArray(status, ['CY','EY','RY']) > -1) ? '' : '\
                                <tr>\
                                    <td class="label">' + now_title + '사유</td>\
                                    <td>' + now_msg + '</td>\
                                </tr>\
                        ',
                        now_msg_date = (jQuery.inArray(status, ['EW','RW']) > -1) ? c_data.odata.h_date : c_data.odata.adm_date;

                    now_status_html = '\
                        <h6 class="osd-title">' + now_title + '정보</h6>\
                        <table class="osd-table">\
                            <tbody>\
                                <tr>\
                                    <td class="label">' + now_title + '일자</td>\
                                    <td>' + now_msg_date + '</td>\
                                </tr>\
                    ';
                    if(status != 'CY' && status != 'RY') {
                        $.each(delivery_info, function(i, v){
                            delivery_info[i] = (v===null)? '':v;
                        });
                        if(status == 'RD' || status == 'ED' || status == 'EY'|| status == 'ES') {
                            if(delivery_info.new_postcode !== '') {
                                now_status_html+= '<tr>\
                                            <td class="label">배송지1</td>\
                                            <td>' + delivery_info.new_postcode + ' ' + delivery_info.new_addr + ' ' + delivery_info.new_addr2 + '</td>\
                                        </tr>\
                                ';
                            }

                            if(delivery_info.new_delivery_company) {
                                now_status_html+= '\
                                        <tr>\
                                            <td class="label">배송회사</td>\
                                            <td>' + delivery_info.new_delivery_str + '</td>\
                                        </tr>';
                            }
                            if(delivery_info.new_delivery_str != '자가배송' && delivery_info.new_delivery_number != '') {
                                now_status_html+= '<tr>\
                                            <td class="label">송장번호</td>\
                                            <td>' + delivery_info.new_delivery_number + '</td>\
                                        </tr>';
                            }
                        }
                        
                        now_status_html += now_msg_html;
                    }
                    now_status_html+= '\
                            </tbody>\
                        </table>\
                    ';
                }

                var r_requests = (c_data.odata.requests != '')? c_data.odata.requests : '-';
                var modal_str = '\
                    <div class="osd-body">\
                        \
                        <h6 class="osd-title">기본정보</h6>\
                        <table class="osd-table">\
                            <tbody>\
                                <tr>\
                                    <td class="label">주문번호</td>\
                                    <td>' + ognum + '</td>\
                                </tr>\
                                <tr>\
                                    <td class="label">상품명</td>\
                                    <td>' + c_data.pdata.name + option_str + '</td>\
                                </tr>\
                                <tr>\
                                    <td class="label">주문수량</td>\
                                    <td>' + c_data.odata.quantity + '개</td>\
                                </tr>';
                                modal_str += '<tr>\
                                        <td class="label">'+kind_str+'상태</td>\
                                        <td>' + product_status_str + '</td>\
                                    </tr>';
                                if (status.indexOf('R') !== -1 && (payClass == '무통장 입금' || payClass == '가상계좌')) {
                                    modal_str += '<tr>\
                                        <td class="label">환불계좌</td>\
                                        <td>' + c_data.odata.return_bank + ' ' + c_data.odata.return_bank_number + '<br>' + c_data.odata.return_bank_name + '</td>\
                                    </tr>';
                                }
                            modal_str += '</tbody>\
                        </table>\
                        \
                        ' + now_status_html +'\
                        \
                        <h6 class="osd-title">' + kind_str + '요청정보</h6>\
                        <table class="osd-table">\
                            <tbody>\
                                <tr>\
                                    <td class="label">' + kind_str + '요청일자</td>\
                                    <td>' + c_data.odata.date + '</td>\
                                </tr>\
                                <tr>\
                                    <td class="label">' + kind_str + '요청사유</td>\
                                    <td>' + c_data.odata.reason + '</td>\
                                </tr>\
                                <tr>\
                                    <td class="label">상세사유</td>\
                                    <td>' + r_requests + '</td>\
                                </tr>\
                            </tbody>\
                        </table>\
                        \
                    </div>\
                    \
                    ';

                /*
                var c_data = data.r,
                    status = c_data.odata.d_status,
                    kind_str = c_data.odata.kind_str,
                    product_status_str = c_data.odata.product_status_str,
                    option_name = (typeof c_data.pdata.option != "undefined" && c_data.pdata.option) ? c_data.pdata.option : '',
                    option_str = (option_name) ? '<br><span>옵션: '+option_name+'</span>' : '',
                    status_str = '',
                    response_str = '',
                    request_str = '\
                        <table class="osd-table">\
                            <tbody>\
                                <tr>\
                                    <td class="label">' + kind_str + '요청사유</td>\
                                    <td>' + c_data.odata.reason + '</td>\
                                </tr>\
                                <tr>\
                                    <td class="label">상세사유</td>\
                                    <td>' + c_data.odata.requests + '</td>\
                                </tr>\
                            </tbody>\
                        </table>\
                    ';

                if(jQuery.inArray(status, ['CN','CY','EN','EW','RN','RW']) > -1) {
                    var status_str = (status.indexOf('W') > -1) ? c_data.odata.h_msg : c_data.odata.adm_msg,
                        status_msg = (jQuery.inArray(status, ['CY']) > -1) ? '' : '\
                                <tr>\
                                    <td class="label">' + c_data.odata.product_status_str.replace(/ /g,'') + '사유</td>\
                                    <td>' + status_str + '</td>\
                                </tr>\
                    ',
                        status_date = (jQuery.inArray(status, ['EW','RW']) > -1) ? c_data.odata.h_date : c_data.odata.adm_date;

                    status_str = '\
                        <h6 class="osd-title">' + c_data.odata.product_status_str.replace(/ /g,'') + '정보</h6>\
                        <table class="osd-table">\
                            <tbody>\
                                <tr>\
                                    <td class="label">' + c_data.odata.product_status_str.replace(/ /g,'') + '일자</td>\
                                    <td>' + status_date + '</td>\
                                </tr>\
                                ' + status_msg + '\
                            </tbody>\
                        </table>\
                    ';
                }

                if(jQuery.inArray(status, ['EN', 'EW', 'RN', 'RW']) > -1) {
                    response_str = '\
                                <tr>\
                                    <td class="label">' + kind_str + ' ' + c_data.odata.h_kind_str + '사유</td>\
                                    <td>' + c_data.odata.h_reason + '</td>\
                                </tr>\
                                <tr>\
                                    <td class="label">상세사유</td>\
                                    <td>' + c_data.odata.h_msg + '</td>\
                                </tr>\
                    ';
                }

                var modal_str = '\
                    <div class="osd-body">\
                        \
                        <h6 class="osd-title">기본정보</h6>\
                        <table class="osd-table">\
                            <tbody>\
                                <tr>\
                                    <td class="label">주문번호</td>\
                                    <td>' + onum + '</td>\
                                </tr>\
                                <tr>\
                                    <td class="label">상품명</td>\
                                    <td>' + c_data.pdata.name + option_str + '</td>\
                                </tr>\
                                <tr>\
                                    <td class="label">주문수량</td>\
                                    <td>' + c_data.odata.quantity + '개</td>\
                                </tr>\
                                <tr>\
                                    <td class="label">' + kind_str + '요청일자</td>\
                                    <td>' + c_data.odata.date + '</td>\
                                </tr>\
                                <tr>\
                                    <td class="label">진행상태</td>\
                                    <td>' + product_status_str + '</td>\
                                </tr>\
                                ' + response_str + '\
                            </tbody>\
                        </table>\
                        \
                        ' + status_str +'\
                        \
                        <h6 class="osd-title">' + kind_str + '요청정보</h6>\
                        ' + request_str +'\
                        \
                    </div>\
                    \
                    ';

                */
                var osdModal = $(this).showModalFlat(kind_str + ' 상세정보', modal_str, true, false, '', 'ok', '', 'cl-s-order-status-details cl-modal cl-s-btn cover', false);

            },'json');

        },
        orderCancelModal: function(sid, pnum, onum, ognum, status, dStatus, pclass) {
            if(typeof sid == "undefined" || typeof pnum == "undefined" || typeof onum == "undefined") {
                alert('정보가 올바르지 않습니다');
                return false;
            }

            $.post('/_check_order', { sid:sid, pnum:pnum, onum:onum, mode:'cancel', ognum: ognum }, function(data) {
                if(typeof data.error != "undefined" && data.error) {
                    $(this).showModalFlat('ERROR', data.error, true, false, '', 'close');
                    return false;
                }

                var c_data = data.r, checkboxNone = '', noneAll = '', noneChecked = '', checkNoneAll = '', checkEscrowFooter = '', checkEscrowClass = '', checkDepositCancel = '';
                var checkEscrow = '';
                if (status == 'Y') {
                    checkboxNone = 'checked';
                    noneAll = ' noneAll';
                    checkNoneAll = 'fule';
                    checkEscrow = '<div class="escrow-warring top-escrow">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="15" height="15">\
                                        <path fill="#4789e7" d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/>\
                                        <rect fill="#4789e7" x="6" y="3" width="1" height="5"/>\
                                        <rect fill="#4789e7" x="6" y="9" width="1" height="1"/>\
                                    </svg>\
                                    에스크로 결제 상품은 취소/반품 요청 시 전체선택만 가능합니다.\
                                </div>';

                    checkEscrowFooter = '<div class="escrow-warring bottom-escrow">\
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="15" height="15">\
                                                <path fill="#4789e7" d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/>\
                                                <rect fill="#4789e7" x="6" y="3" width="1" height="5"/>\
                                                <rect fill="#4789e7" x="6" y="9" width="1" height="1"/>\
                                            </svg>\
                                            에스크로 환불 안내\
                                            <div class="escrow-return-info">- 취소처리 시 구매자의 환불정산액에서 취소 수수료(330원)가 차감됩니다.</div>\
                                            <div class="escrow-return-info">- 환불정산액은 취소처리 후 1~3영업일 후에 지급됩니다.</div>\
                                        </div>';
                    checkEscrowClass = 'cl-s-escrow-info';
                } else {
                    if(c_data.order_status == 'W') {
                        checkboxNone = 'checked';
                        noneAll = ' noneAll';
                        checkNoneAll = 'fule';
                        checkDepositCancel = '<div class="modal-comment deposit-cancel-desc">\
                                    <div class="desc-box">\
                                        <div class="desc-title">입금대기 주문취소 안내</div>\
                                        <div class="section">- 입금대기 주문 건은 <span class="cl-red">전체 취소</span>만 가능하며 <span class="cl-red">취소완료</span>로 처리됩니다.</div>\
                                        <div class="section">- 전체취소 후 구매를 원하는 상품은 다시 주문해주세요.</div>\
                                        <div class="section">- 혹시나 입금을 하신 경우 별도로 문의 주시기 바랍니다.</div>\
                                    </div>\
                                </div>\
                            ';
                    }
                    
                }
                
                var modal_str = '\
                    <form name="cancel_form" method="post" action="/_return">\
                        <input type="hidden" name="sid" value="' + sid + '">\
                        <input type="hidden" name="order_group" id="cancel-order-group" value="' + ognum + '">\
                        <input type="hidden" name="order_number" id="cancel-order-number" value="' + onum + '">\
                        <input type="hidden" name="extra_charge" id="extra_charge" value="' + data.r.pay_info.extra_charge + '">\
                        '+checkEscrow+'\
                        <div class="cancel-product-title">\
                            <div class="newcheckbox hand">\
                                <label>\
                                    <input type="checkbox" class="'+noneAll+'" id="product-check" '+checkboxNone+'>\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">\
                                        <path d="M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z"/>\
                                    </svg>\
                                    <svg class="active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">\
                                        <path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/>\
                                    </svg>\
                                </label>\
                            </div>\
                            취소요청 상품\
                        </div>';
                        var my_point = Number(data.r.my_point);

                        for (var i=0;i<data.r.odata.length;i++) {
                            if (c_data.odata[i].d_status == '' || c_data.odata[i].d_status == 'CN') {
                                noneChecked = '';
                                if (!checkNoneAll) noneAll = '';
                            } else {
                                if (!checkNoneAll) noneAll = 'noneAll';
                                noneChecked = 'noneChecked';
                            }
                            if (c_data.pdata[i].status == 'W') {
                                if (!checkNoneAll) noneAll = 'noneAll';
                                noneChecked = 'noneChecked';
                                checkboxNone = 'checked';
                            }
                            var curr_point = 0;
                            var usable_point = 0;
                            var refund_point = 0;
                            var expired_point = 0;

                            if(c_data.odata[i].used_point) {
                                curr_point = Math.abs(c_data.odata[i].used_point.point);
                                usable_point = Math.abs(c_data.odata[i].used_point.usable_point);
                            }

                            // if(c_data.odata[i].refund_point) {
                            //     refund_point = c_data.odata
                            // }

                            if(c_data.odata[i].expired_point) {
                                expired_point = Math.abs(c_data.odata[i].expired_point.point);
                            }

                            modal_str += '\
                            <div class="cl-s-product-jumbotron clearfix">\
                                <div class="newcheckbox hand">\
                                    <label>\
                                        <input type="checkbox" class="status-checkbox cancel-info-data '+noneAll+' '+noneChecked+'" data-curr_point="' + curr_point + '" data-usable_point="' + usable_point + '" data-expired_point="' + expired_point + '" data-type="'+c_data.pdata[i].state+'" name="order_number_ary[]" value="'+c_data.odata[i].order_number+'" '+checkboxNone+'>\
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">\
                                        <path d="M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z"/>\
                                        </svg>\
                                        <svg class="active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">\
                                        <path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/>\
                                        </svg>\
                                    </label>\
                                </div>\
                                <div class="cl-s-product-thumb">\
                                    <img src="' + c_data.pdata[i].img + '" alt="' + c_data.pdata[i].name + '" class="' + c_data.pdata[i].img_align + '" />\
                                </div>\
                                <div class="cl-s-product-info">\
                                    <h5 class="cl-s-product-title">' + c_data.pdata[i].name + '</h5>\
                            ';

                            var price = (Number(c_data.odata[i].sale_price) > 0) ? c_data.odata[i].sale_price : c_data.odata[i].price,
                                quantity = Number(c_data.odata[i].quantity),
                                optionPrice = c_data.odata[i].price * quantity,
                                sum_price = quantity * price,
                                option_name = (typeof c_data.pdata[i].option != "undefined" && c_data.pdata[i].option) ? c_data.pdata[i].option : '',
                                option_str = '',
                                etc_str = (typeof c_data.pdata[i].etc_date != "undefined" && c_data.pdata[i].etc_date) ? '<span>선택일자: '+c_data.pdata[i].etc_date+'</span>' : '',
                                option_title = (c_data.pdata[i].option_type == 'A') ? '추가옵션: ' + c_data.pdata[i].option_group + ': ' : '옵션: ';
                            if(option_name) {
                                option_str = (c_data.pdata[i].option_text_str) ? '<span>' + option_title + option_name+' / '+c_data.pdata[i].option_text_str+'</span>' : '<span>' + option_title + option_name+'</span>';
                            } else {
                                option_str = (c_data.pdata[i].option_text_str) ? '<span>' + option_title + c_data.pdata[i].option_text_str+'</span>' : '';
                            }
                            modal_str += '\
                                    <div class="option-str option-check" data-optionPrice="'+optionPrice+'" data-deliveryPirce="'+c_data.odata[i].delivery_price+'"><span>' + number_format(optionPrice) + '원</span>' + option_str + etc_str + '<span>' + quantity + '개</span></div>\
                                </div>\
                            </div>';
                        }

                        modal_str += '<div class="order-cancel-content">\
                            <div class="cl-s-form-selector">\
                                <select class="selectpicker dropdown" id="cancel-reason" name="reason">\
                                    <option value="구매의사 취소">구매의사 취소</option>\
                                    <option value="다른 상품 잘못 주문">다른 상품 잘못 주문</option>\
                                    <option value="기타">기타</option>\
                                </select>\
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" width="8" height="4"><polygon points="0 0 4 4 8 0 "></polygon></svg>\
                            </div>\
                            <div class="cl-s-form-wrap">\
                                <div class="cl-s-form-group input-label-hide">\
                                    <textarea class="cl-s-form-control control-textarea" id="cancel-requests" name="requests" maxlength="500" required="required"></textarea>\
                                    <label for="input" class="cl-s-control-label">자세한 내용을 적어주세요. (500자 이내)</label>\
                                </div>\
                            </div>\
                        </div>';

                        modal_str += '<div class="order-cancel-content">\
                            <div class="cancel-info-box">\
                                <div class="cancel-info"><span class="cancel-info-title">취소상품 합계</span><span class="cancel-info-price" id="cancel-price">0원</span></div>\
                                <div class="cancel-info"><span class="cancel-info-title">취소 배송비 합계</span><span class="cancel-info-price" id="cancel-delivery-price">0원</span></div>\
                                <div class="cancel-info"><span class="cancel-info-title">적립금</span><span class="cancel-info-price" id="cancel-point-price">0원</span></div>\
                                <div class="cancel-info-line"></div>\
                                <div class="return-total-info"><span class="cancel-info-title">환불 예정금액</span><span class="cancel-info-price" id="return-total-price">0원</span></div>\
                            </div>'+checkEscrowFooter+'\
                        </div>';
                        modal_str += checkDepositCancel;

                    var status = [];
                    for (var i=0;i<c_data.pdata.length;i++) {
                        status.push(c_data.pdata[i].status);
                    }

                    if ((pclass == '무통장 입금' || pclass == '가상계좌') && status.indexOf('W')===-1) {
                        var returnClass = '';
                        if (c_data.return_bank.length > 1 && c_data.return_bank.indexOf('')===-1) returnClass = 'returnDisabled';
                        modal_str += '\
                            <div class="modal-sub-title">환불 계좌</div>\
                            <ul class="qna-writer clearfix">\
                                <li class="">\
                                    <div class="cl-s-form-wrap '+returnClass+'">\
                                        <div class="cl-s-form-group">';
                                        if (c_data.return_bank.length > 1 && c_data.return_bank.indexOf('')===-1) modal_str += '<input type="text" class="cl-s-form-control has-value" id="no-bank" name="no_bank" readonly required="required" value="'+c_data.return_bank[1]+'">';
                                        else modal_str += '<input type="text" class="cl-s-form-control" id="no-bank" name="no_bank" required="required" value="">';
                                        modal_str += '<label for="input" class="cl-s-control-label">은행명</label>\
                                        </div>\
                                    </div>\
                                </li>\
                                <li>\
                                    <div class="cl-s-form-wrap '+returnClass+'">\
                                        <div class="cl-s-form-group">';
                                        if (c_data.return_bank.length > 1 && c_data.return_bank.indexOf('')===-1) modal_str += '<input type="text" class="cl-s-form-control has-value" id="no-bank-name" readonly name="no_bank_name" required="required" value="'+c_data.return_bank[2]+'">';
                                        else modal_str += '<input type="text" class="cl-s-form-control" id="no-bank-name" name="no_bank_name" required="required">';
                                        modal_str += '<label for="input" class="cl-s-control-label">예금주</label>\
                                        </div>\
                                    </div>\
                                </li>\
                                <li>\
                                    <div class="cl-s-form-wrap '+returnClass+'">\
                                        <div class="cl-s-form-group">';
                                        if (c_data.return_bank.length > 1 && c_data.return_bank.indexOf('')===-1) modal_str += '<input type="text" class="cl-s-form-control has-value" id="no-bank-number" name="no_bank_number" readonly data-type="email" required="required" value="'+c_data.return_bank[3]+'">';
                                        else modal_str += '<input type="text" class="cl-s-form-control" id="no-bank-number" name="no_bank_number" data-type="email" required="required" value="">';
                                        modal_str += '<label for="input" class="cl-s-control-label">계좌번호</label>\
                                        </div>\
                                    </div>\
                                </li>\
                            </ul>\
                            <div class="modal-comment">동일 주문 내 여러 상품을 환불 요청하시는 경우, 최초 입력한 환불계좌로 일괄 환불처리됩니다.</div>\
                        ';
                    }

                    modal_str += '\
                            <div class="modal-comment point-used-desc hide">\
                                <div class="desc-box">\
                                    <div class="desc-title">적립금 환불 안내</div>\
                                    <div class="section">상품(들)을 구매하여 적립된 적립금 <span id="disp_used_point_total" class="point-color"></span>원이 이미 사용되거나 유효기간이 만료되었습니다.</div>\
                                    <div class="section">현재 보유 적립금이 <span class="point-color">' + addCommas(my_point) + '</span>원 으로 구매 적립된 적립금 <span id="disp_cancel_after_point" class="point-color"></span>원을 취소 처리할 수 없습니다.</div>\
                                    <div class="section">미 취소된 적립금에 대한 처리는 판매자와 협의해주세요.</div>\
                                </div>\
                                <div class="newcheckbox hand">\
                                    <label style="margin-left: 25px;">\
                                        <input type="checkbox" class="cancel-agree" />\
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">\
                                            <path d="M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z"></path>\
                                        </svg>\
                                        <svg class="active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">\
                                            <path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"></path>\
                                        </svg>\
                                    위 내용을 확인하였습니다.</label>\
                                </div>\
                                <div class="point-used-cancel-agree-desc">\
                                    <svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>\
                                    적립금 환불 안내에 동의해주세요.\
                                </div>\
                            </div>\
                            ';

                    modal_str += '</form>\
                ';

                var ocModal = $(this).showModalFlat('취소 요청', modal_str,true,true,function () {

                    var f = document.cancel_form;
                    if(ocModal.find('#cancel-reason').prop('value') == '') {
                        // $('#cancel-reason').selectpicker('toggle');
                        // return false;
                        $('#cancel-reason').closest('.cl-s-form-selector').addClass('empty');
                    }

                    ocModal.find('.cl-s-form-wrap').each(function() {
                        var check_input = $(this).find('.cl-s-form-control'),
                            val = check_input.val().trim();

                        if(val.length == 0) {
                            $(this).removeClass('error').addClass('empty');
                            $(this).find('.cl-s-control-label.error').remove();
                        } else {
                            if($(this).hasClass('error')) {
                                check_input.focus();
                            }
                        }
                    });
                    var checkCnt = 0;

                    $(".status-checkbox").each(function (i, index) {
                        if ($(this).is(":checked") === true) {
                            checkCnt++;
                        }
                    });

                    if (checkCnt < 1) {
                        alert('상품을 1개 이상 선택해 주세요');
                        return false;
                    }

                    if(ocModal.find('.cl-s-form-wrap.empty, .cl-s-form-wrap.error').length > 0) {
                        // ocModal.find('.cl-s-form-wrap.empty, .cl-s-form-wrap.error').eq(0).find('.cl-s-form-control').focus();
                        return false;
                    }

                    if(ocModal.find("input[type='checkbox'].cancel-agree:visible").length && ocModal.find("input[type='checkbox'].cancel-agree:visible").length != ocModal.find("input[type='checkbox'].cancel-agree:visible:checked").length) {
                        $(".point-used-cancel-agree-desc").show();
                        return false;
                    } else {
                        $(".point-used-cancel-agree-desc").hide();
                    }

                    $.processON();

                    f.submit();
                    ocModal.modal('hide');

                },'close','등록하기','cl-s-order-cancel cl-modal cl-s-btn cover ' + checkEscrowClass, false, '', function() {
                    var totalCnt = 0, totalNomalCheck = 0, nomalCheck = 0, price = 0, deliveryPrice = 0,
                        $form = $('form[name="cancel_form"]');

                    $(".status-checkbox").each(function (i, index) {
                        if ($(this).is(":checked") === true) {
                            price += ($(this).closest('.cl-s-product-jumbotron').find('.option-check').attr('data-optionPrice') * 1);
                            totalCnt++;
                            if ($(this).attr('data-type') == 'normal') {
                                nomalCheck++;
                                deliveryPrice = ($(this).closest('.cl-s-product-jumbotron').find('.option-check').attr('data-deliveryPirce') * 1);
                            }
                        }

                        if ($(this).attr('data-type') == 'normal') {
                            totalNomalCheck++;
                        }
                    });
                    if(c_data.order_status == 'W') {
                        $("#product-check, .status-checkbox").click(function(e){
                            return false;
                        });
                    }
                    var product_price = price + deliveryPrice,
                        rePayment = parseInt(c_data.pay_info.request.payment.total) - parseInt(c_data.pay_info.request.cancel.total) - parseInt(c_data.pay_info.request.return.total);

                    rePayment = (rePayment > 0) ? rePayment : 0;
                    var use_point = (rePayment - product_price > 0) ? 0 : rePayment - product_price;
                    product_price = product_price + use_point;

                    $('#cancel-price').html(number_format(price)+'원');
                    $('#cancel-delivery-price').html(number_format(deliveryPrice)+'원');
                    $('#cancel-point-price').html(number_format(use_point)+'원');
                    $('#return-total-price').html(number_format(product_price)+'원');

                    $('.cancel-info-data').on('change', function (e) {
                        var cancel_after_point = my_point;
                        var disp_used_point_total = 0;

                        if($("input[name='order_number_ary[]']:checked").length) {
                            $("input[name='order_number_ary[]']:checked").each(function() {
                                cancel_after_point = Number(cancel_after_point) + ((Number($(this).data("expired_point"))) - Number($(this).data("curr_point")));
                                disp_used_point_total += ((Number($(this).data("expired_point"))) - Number($(this).data("curr_point")));
                            });
                        }

                        if(cancel_after_point < 0) {
                            $(".point-used-desc #disp_cancel_after_point").html(addCommas(Math.abs(cancel_after_point)));
                            $(".point-used-desc #disp_used_point_total").html(addCommas(Math.abs(disp_used_point_total)));
                            $(".point-used-desc").removeClass("hide");
                        } else {
                            $(".point-used-desc").addClass("hide");
                            $(".point-used-desc #disp_cancel_after_point").html("");
                            $(".point-used-desc #disp_used_point_total").html("");
                        }

                        var price = 0;
                        var oLength = $('.option-check').length;
                        var totalCnt = 0, totalNomalCheck = 0, nomalCheck = 0;
                        var deliveryPrice = 0;
                        $form.find('.order-cancel-content.extra-info').remove();
                        if ($(this).hasClass('noneAll') === true) {
                            if ($(this).hasClass('noneChecked') === true) {
                                $(this).prop('checked', false);
                            } else {
                                $(this).prop('checked', true);
                                $(".status-checkbox").each(function () {
                                    if ($(this).prop('disabled') !== true) $(this).prop('checked', true);
                                });
                            }
                        }

                        $(".status-checkbox").each(function (i, index) {
                            if ($(this).is(":checked") === true) {
                                price += ($(this).closest('.cl-s-product-jumbotron').find('.option-check').attr('data-optionPrice') * 1);
                                totalCnt++;
                                if ($(this).attr('data-type') == 'normal') nomalCheck++;
                            }

                            if ($(this).attr('data-type') == 'normal') totalNomalCheck++;
                        });

                        if ($('.status-checkbox').length == totalCnt) {
                            deliveryPrice = ($('.status-checkbox[data-type="normal"]:first').length ? $('.status-checkbox[data-type="normal"]:first').closest('.cl-s-product-jumbotron').find('.option-check').attr('data-deliveryPirce') * 1 : 0);
                        } else if (totalNomalCheck <= nomalCheck) {
                            deliveryPrice = ($('.status-checkbox[data-type="normal"]:first').length ? $('.status-checkbox[data-type="normal"]:first').closest('.cl-s-product-jumbotron').find('.option-check').attr('data-deliveryPirce') * 1 : 0);
                        } else {
                            deliveryPrice = 0;
                        }

                        var product_price = price + deliveryPrice,
                            rePayment = parseInt(c_data.pay_info.request.payment.total) - parseInt(c_data.pay_info.request.cancel.total) - parseInt(c_data.pay_info.request.return.total);

                        rePayment = (rePayment > 0) ? rePayment : 0;
                        var use_point = (rePayment - product_price > 0) ? 0 : rePayment - product_price;
                        product_price = product_price + use_point;
                        $('#cancel-price').html(number_format(price)+'원');
                        $('#cancel-delivery-price').html(number_format(deliveryPrice)+'원');
                        $('#cancel-point-price').html(number_format(use_point)+'원');
                        $('#return-total-price').html(number_format(product_price)+'원');

                        var extra_charge = Number($('#extra_charge').val());
                        if(extra_charge > 0 && totalNomalCheck > nomalCheck) extra_charge_info($form,rePayment + c_data.pay_info.point.pay_point, product_price+Math.abs(use_point), extra_charge);
                    });

                    $(document).on('click', '#product-check', function () {
                        var price = 0;
                        var deliveryPrice = 0;
                        var totalCnt = 0, totalNomalCheck = 0, nomalCheck = 0;
                        $form.find('.order-cancel-content.extra-info').remove();
                        if ($(this).hasClass('noneAll') === true) {
                            $(this).prop('checked', true);
                            $(".status-checkbox").each(function () {
                                if ($(this).prop('disabled') !== true) $(this).prop('checked', true).change();
                            });
                        }
                        if ($(this).is(":checked") === true) {
                            $(".status-checkbox").each(function (i) {
                                if ($(this).prop('disabled') !== true) {
                                    $(this).prop('checked', true).change();

                                    price += ($(this).closest('.cl-s-product-jumbotron').find('.option-check').attr('data-optionPrice') * 1);
                                    totalCnt++;
                                    if ($(this).attr('data-type') == 'normal') {
                                        nomalCheck++;
                                        deliveryPrice = ($(this).closest('.cl-s-product-jumbotron').find('.option-check').attr('data-deliveryPirce') * 1);
                                    }
                                }

                                if ($(this).attr('data-type') == 'normal') {
                                    totalNomalCheck++;
                                }
                            });

                            var product_price = price + deliveryPrice,
                                rePayment = parseInt(c_data.pay_info.request.payment.total) - parseInt(c_data.pay_info.request.cancel.total) - parseInt(c_data.pay_info.request.return.total);

                            rePayment = (rePayment > 0) ? rePayment : 0;
                            var use_point = (rePayment - product_price > 0) ? 0 : rePayment - product_price;
                            product_price = product_price + use_point;

                            $('#cancel-price').html(number_format(price)+'원');
                            $('#cancel-delivery-price').html(number_format(deliveryPrice)+'원');
                            $('#cancel-point-price').html(number_format(use_point)+'원');
                            $('#return-total-price').html(number_format(product_price)+'원');

                            var extra_charge = Number($('#extra_charge').val());
                            if(extra_charge > 0 && totalNomalCheck > nomalCheck) extra_charge_info($form,rePayment + c_data.pay_info.point.pay_point, product_price+Math.abs(use_point), extra_charge);

                        } else {
                            $(".status-checkbox").each(function () {
                                if ($(this).prop('disabled') !== true) $(this).prop('checked', false).change();
                            });

                            $('#cancel-price').html('0원');
                            $('#cancel-delivery-price').html('0원');
                            $('#cancel-point-price').html('0원');
                            $('#return-total-price').html('0원');
                        }
                    });

                    /* first option setting */
                    $('.cl-s-order-cancel .cl-s-form-selector').each(function(e) {
                        var checkSelectOption = ($(this).find('select option').length > 0) ? true : false;
                        if(checkSelectOption) {
                            var selectId = $(this).find('select').attr('id'),
                                val = $(this).find('select').children().eq(0).val();
                            $(this).find('select').selectpicker({'val':val, dropupAuto:false});
                        }
                    });

                    $('.cl-s-order-cancel .cl-s-form-group').on('click',function(e) {
                        if($(e.target).hasClass('cl-s-form-group')) {
                            $(e.target).find('.cl-s-form-control:not([type=hidden])').focus();
                        }
                    });

                    $('#cancel-reason').on({
                        'show.bs.select': function (e) {
                            $(this).closest('.cl-s-form-selector').addClass('active');
                        },
                        'hidden.bs.select': function(e) {
                            $(this).closest('.cl-s-form-selector').removeClass('active');

                            if($('#cancel-reason').prop('value') == '') {
                                $(this).closest('.cl-s-form-selector').addClass('empty');
                            } else {
                                $(this).closest('.cl-s-form-selector').removeClass('empty');
                            }
                        },
                        'changed.bs.select': function (e, clickedIndex, newValue, oldValue) {
                            // console.log(this.value, clickedIndex, newValue, oldValue);
                        }
                    });

                    $('.cl-s-order-cancel .control-textarea').on({
                        focus: function(e) {
                            $(this).closest('.cl-s-form-wrap').addClass('active');
                        },
                        blur: function(e) {
                            var val = $(this).val().trim();

                            $(this).closest('.cl-s-form-wrap').removeClass('active');
                            if(val.length == 0) {
                                $(this).closest('.cl-s-form-wrap').removeClass('error').addClass('empty');
                                $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                                return false;
                            } else {
                                $(this).closest('.cl-s-form-wrap').removeClass('empty');
                                var error_str = '';
                                if(checkEmojis(val)) error_str = $.lang[LANG]['config.unable.emoji'];
                                else if(val.length < 5) error_str = $.lang[LANG]['customsite.validate.message.minlengthto5'];

                                if(error_str.length > 0) {
                                    $(this).closest('.cl-s-form-wrap').addClass('error');
                                    if($(this).parent().find('.cl-s-control-label.error').length > 0) {
                                        $(this).parent().find('.cl-s-control-label.error').html(error_str);
                                    } else {
                                        $(this).after('<label for="input" class="cl-s-control-label error">' + error_str + '</label>');
                                    }
                                    return false;
                                }
                            }

                            $(this).closest('.cl-s-form-wrap').removeClass('error').removeClass('empty');
                            $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                        }
                    });

                    $('.cl-s-form-wrap .cl-s-form-control').on({
                        focus: function(e) {
                            $(this).closest('.cl-s-form-wrap').addClass('active');
                        },
                        blur: function(e) {
                            var val = $(this).val().trim();
                            
                            $(this).closest('.cl-s-form-wrap').removeClass('active');
                            if(val.length == 0) {
                                $(this).closest('.cl-s-form-wrap').removeClass('error').addClass('empty');
                                $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                                return false;
                            } else {
                                $(this).closest('.cl-s-form-wrap').removeClass('empty');

                                if(checkEmojis(val)) {
                                    $(this).closest('.cl-s-form-wrap').addClass('error');
                                    if($(this).parent().find('.cl-s-control-label.error').length > 0) {
                                        $(this).parent().find('.cl-s-control-label.error').html($.lang[LANG]['config.unable.emoji']);
                                    } else {
                                        $(this).after('<label for="input" class="cl-s-control-label error">' + $.lang[LANG]['config.unable.emoji'] + '</label>');
                                    }
                                    return false;
                                }
                            }

                            $(this).closest('.cl-s-form-wrap').removeClass('error');
                            $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                        }
                    });

                });

            },'json');
        },
        orderReturnExchangeModal: function(sid, pnum, onum, ognum, status, pclass) {
            if(typeof sid == 'undefined' || typeof pnum == 'undefined' || typeof onum == 'undefined') {
                alert('정보가 올바르지 않습니다');
                return false;
            }

            $.post('/_check_order', { sid:sid, pnum:pnum, onum:onum, mode:'return', ognum: ognum }, function(data) {

                if(typeof data.error != 'undefined' && data.error) {
                    $(this).showModalFlat('ERROR', data.error, true, false, '', 'close');
                    return false;
                }
                var c_data = data.r;

                var c_data = data.r, checkboxNone = '', noneAll = '', noneChecked = '', checkNoneAll = '', checkEscrowFooter = '', checkEscrowClass = '';
                console.log(c_data);
                var checkEscrow = '', exchangeCheck = 'N';
                if (status == 'Y') {
                    checkboxNone = 'checked';
                    noneAll = ' noneAll';
                    checkNoneAll = 'fule';
                    checkEscrow = '<div class="escrow-warring top-escrow">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="15" height="15">\
                                        <path fill="#4789e7" d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/>\
                                        <rect fill="#4789e7" x="6" y="3" width="1" height="5"/>\
                                        <rect fill="#4789e7" x="6" y="9" width="1" height="1"/>\
                                    </svg>\
                                    에스크로 결제 상품은 취소/반품 요청 시 전체선택만 가능합니다.\
                                </div>';

                    checkEscrowFooter = '<div class="escrow-warring bottom-escrow">\
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="15" height="15">\
                                                <path fill="#4789e7" d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/>\
                                                <rect fill="#4789e7" x="6" y="3" width="1" height="5"/>\
                                                <rect fill="#4789e7" x="6" y="9" width="1" height="1"/>\
                                            </svg>\
                                            에스크로 환불 안내\
                                            <div class="escrow-return-info">- 취소처리 시 구매자의 환불정산액에서 취소 수수료(330원)가 차감됩니다.</div>\
                                            <div class="escrow-return-info">- 환불정산액은 취소처리 후 1~3영업일 후에 지급됩니다.</div>\
                                        </div>';
                    checkEscrowClass = 'cl-s-escrow-info';
                }
                
                var modal_str = '\
                    <form name="re_form" method="post" action="/_return_exchange">\
                        <input type="hidden" name="sid" value="' + sid + '">\
                        <input type="hidden" name="order_group" id="cancel-order-group" value="' + ognum + '">\
                        <input type="hidden" name="order_number" id="cancel-order-number" value="' + onum + '">\
                        <input type="hidden" name="extra_charge" id="extra_charge" value="' + data.r.pay_info.extra_charge + '">\
                        <input type="hidden" name="m_status" value="M">\
                        <div class="cl-s-btn-group-toggle btn-group btn-group-toggle" data-toggle="buttons">\
                            <label class="btn btn-secondary active">\
                                <input type="radio" name="status" id="order-radio-return" value="R" checked> 반품 요청\
                            </label>\
                            <label class="btn btn-secondary">\
                                <input type="radio" name="status" id="order-radio-exchange" value="E"> 교환 요청\
                            </label>\
                        </div>\
                        '+checkEscrow+'\
                        <div class="cancel-product-title">\
                            <div class="newcheckbox hand">\
                                <label>\
                                    <input type="checkbox" class="'+noneAll+'" id="product-check" '+checkboxNone+'>\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">\
                                        <path d="M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z"/>\
                                    </svg>\
                                    <svg class="active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">\
                                        <path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/>\
                                    </svg>\
                                </label>\
                            </div>\
                            반품/교환요청 상품\
                        </div>';
                        var my_point = Number(data.r.my_point);

                        for (var i=0;i<data.r.odata.length;i++) {
                            if (c_data.odata[i].exchange_check == 'Y') exchangeCheck = 'Y';
                            if (c_data.odata[i].d_status == '' || c_data.odata[i].d_status == 'CN') {
                                noneChecked = '';
                                if (!checkNoneAll) noneAll = '';
                            } else {
                                if (!checkNoneAll) noneAll = 'noneAll';
                                noneChecked = 'noneChecked';
                            }

                            var curr_point = 0;
                            var usable_point = 0;
                            var refund_point = 0;
                            var expired_point = 0;

                            if(c_data.odata[i].used_point) {
                                curr_point = Math.abs(c_data.odata[i].used_point.point);
                                usable_point = Math.abs(c_data.odata[i].used_point.usable_point);
                            }

                            // if(c_data.odata[i].refund_point) {
                            //     refund_point = c_data.odata
                            // }

                            if(c_data.odata[i].expired_point) {
                                expired_point = Math.abs(c_data.odata[i].expired_point.point);
                            }

                            modal_str += '\
                            <div class="cl-s-product-jumbotron clearfix">\
                                <div class="newcheckbox hand">\
                                    <label>\
                                        <input type="checkbox" class="status-checkbox cancel-info-data '+noneAll+' '+noneChecked+'" data-curr_point="' + curr_point + '" data-usable_point="' + usable_point + '" data-expired_point="' + expired_point + '" data-type="'+c_data.pdata[i].state+'" name="order_number_ary[]" value="'+c_data.odata[i].order_number+'" '+checkboxNone+'>\
                                        <svg viewBox="0 0 16 16" width="16" height="16">\
                                            <path d="M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z"/>\
                                        </svg>\
                                        <svg class="active" viewBox="0 0 16 16" width="16" height="16">\
                                            <path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/>\
                                        </svg>\
                                    </label>\
                                </div>\
                                <div class="cl-s-product-thumb">\
                                    <img src="' + c_data.pdata[i].img + '" alt="' + c_data.pdata[i].name + '" class="' + c_data.pdata[i].img_align + '" />\
                                </div>\
                                <div class="cl-s-product-info">\
                                    <h5 class="cl-s-product-title">' + c_data.pdata[i].name + '</h5>\
                            ';

                            var price = c_data.odata[i].price,
                                quantity = Number(c_data.odata[i].quantity),
                                sum_price = quantity * price;
                                option_name = (typeof c_data.pdata[i].option != "undefined" && c_data.pdata[i].option) ? c_data.pdata[i].option : '',
                                option_str = '',
                                etc_str = (typeof c_data.pdata[i].etc_date != "undefined" && c_data.pdata[i].etc_date) ? '<span>선택일자: '+c_data.pdata[i].etc_date+'</span>' : '',
                                option_title = (c_data.pdata[i].option_type == 'A') ? '추가옵션: ' + c_data.pdata[i].option_group : '옵션';
                            if(option_name) {
                                option_str = (c_data.pdata[i].option_text_str) ? '<span>' + option_title + ': '+option_name+' / '+c_data.pdata[i].option_text_str+'</span>' : '<span>' + option_title + ': '+option_name+'</span>';
                            } else {
                                option_str = (c_data.pdata[i].option_text_str) ? '<span>' + option_title + ': '+c_data.pdata[i].option_text_str+'</span>' : '';
                            }
                            modal_str += '\
                                    <div class="option-str option-check" data-optionState="" data-optionPrice="'+sum_price+'" data-deliveryPirce="'+c_data.odata[i].delivery_price+'"><span>' + number_format(sum_price) + '원</span>' + option_str + etc_str + '<span>' + quantity + '개</span></div>\
                                </div>\
                            </div>';
                        }

                        modal_str += '<div class="order-re-content">\
                            <div class="cl-s-form-selector">\
                                <select class="selectpicker dropdown" id="re-reason" name="reason">\
                                    <option value="구매의사 취소">구매의사 취소</option>\
                                    <option value="다른 상품 잘못 주문">다른 상품 잘못 주문</option>\
                                    <option value="상품파손">상품파손</option>\
                                    <option value="배송지연">배송지연</option>\
                                    <option value="상품정보 상이">상품정보 상이</option>\
                                    <option value="오배송">오배송</option>\
                                    <option value="기타">기타</option>\
                                </select>\
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" width="8" height="4"><polygon points="0 0 4 4 8 0 "></polygon></svg>\
                            </div>\
                            <div class="cl-s-form-wrap">\
                                <div class="cl-s-form-group input-label-hide">\
                                    <textarea class="cl-s-form-control cl-s-form-textarea" id="re-requests" name="requests" maxlength="500" required="required"></textarea>\
                                    <label for="input" class="cl-s-control-label">자세한 내용을 적어주세요. (500자 이내)</label>\
                                </div>\
                            </div>\
                        </div>';
                        /*  반품/교환 사진 제거
                            <div class="cl-s-files re-files">\
                                <input id="re-file" type="file" name="files[]" multiple data-sid="' + sid + '" data-uid=\"' + c_data.writer.id + '\">\
                                <label class="cl-s-file-update re-file-update clearfix"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><path d="M0 0v20h20V0H0zM19 1v11.3l-3-3 -4 4 -6-6 -5 5V1H19zM1 19v-5.3l5-5 6 6 4-4 3 3V19H1z"/><circle cx="14.5" cy="5.5" r="1.5"/></svg> <span>사진</span></label>\
                                <ul class="cl-s-files-list re-files-list clearfix">\
                                </ul>\
                            </div>\
                        */

                        modal_str += '<div class="order-cancel-content">\
                            <div class="cancel-info-box">\
                                <div class="cancel-info"><span class="cancel-info-title">반품상품 합계</span><span class="cancel-info-price" id="cancel-price">0원</span></div>\
                                <div class="cancel-info"><span class="cancel-info-title">반품 배송비 합계</span><span class="cancel-info-price" id="cancel-delivery-price">0원</span></div>\
                                <div class="cancel-info"><span class="cancel-info-title">적립금</span><span class="cancel-info-price" id="cancel-point-price">0원</span></div>\
                                <div class="cancel-info-line"></div>\
                                <div class="return-total-info"><span class="cancel-info-title">환불 예정금액</span><span class="cancel-info-price" id="return-total-price">0원</span></div>\
                            </div>'+checkEscrowFooter+'\
                        </div>';

                    if (pclass == '무통장 입금' || pclass == '가상계좌') {
                        var returnClass = '';
                        if (c_data.return_bank.length > 1 && c_data.return_bank.indexOf('')===-1) returnClass = 'returnDisabled';

                        modal_str += '\
                            <div id="return-modal">\
                                <div class="modal-sub-title">환불 계좌</div>\
                                <ul class="qna-writer clearfix">\
                                    <li class="">\
                                        <div class="cl-s-form-wrap '+returnClass+'">\
                                            <div class="cl-s-form-group">';
                                            if (c_data.return_bank.length > 1 && c_data.return_bank.indexOf('')===-1) modal_str += '<input type="text" class="cl-s-form-control has-value" id="no-bank" name="no_bank" readonly required="required" value="'+c_data.return_bank[1]+'">';
                                            else modal_str += '<input type="text" class="cl-s-form-control" id="no-bank" name="no_bank" required="required" value="">';
                                            modal_str += '<label for="input" class="cl-s-control-label">은행명</label>\
                                            </div>\
                                        </div>\
                                    </li>\
                                    <li>\
                                        <div class="cl-s-form-wrap '+returnClass+'">\
                                            <div class="cl-s-form-group">';
                                            if (c_data.return_bank.length > 1 && c_data.return_bank.indexOf('')===-1) modal_str += '<input type="text" class="cl-s-form-control has-value" id="no-bank-name" readonly name="no_bank_name" required="required" value="'+c_data.return_bank[2]+'">';
                                            else modal_str += '<input type="text" class="cl-s-form-control" id="no-bank-name" name="no_bank_name" required="required">';
                                            modal_str += '<label for="input" class="cl-s-control-label">예금주</label>\
                                            </div>\
                                        </div>\
                                    </li>\
                                    <li>\
                                        <div class="cl-s-form-wrap '+returnClass+'">\
                                            <div class="cl-s-form-group">';
                                            if (c_data.return_bank.length > 1 && c_data.return_bank.indexOf('')===-1) modal_str += '<input type="text" class="cl-s-form-control has-value" id="no-bank-number" name="no_bank_number" readonly data-type="email" required="required" value="'+c_data.return_bank[3]+'">';
                                            else modal_str += '<input type="text" class="cl-s-form-control" id="no-bank-number" name="no_bank_number" data-type="email" required="required" value="">';
                                            modal_str += '<label for="input" class="cl-s-control-label">계좌번호</label>\
                                            </div>\
                                        </div>\
                                    </li>\
                                </ul>\
                                <div class="modal-comment">동일 주문 내 여러 상품을 환불 요청하시는 경우, 최초 입력한 환불계좌로 일괄 환불처리됩니다.</div>\
                                <div class="modal-comment point-used-desc hide">\
                                    <div class="desc-box">\
                                        <div class="desc-title">적립금 환불 안내</div>\
                                        <div class="section">상품(들)을 구매하여 적립된 적립금 <span id="disp_used_point_total" class="point-color"></span>원이 이미 사용되거나 유효기간이 만료되었습니다.</div>\
                                        <div class="section">현재 보유 적립금이 <span class="point-color">' + addCommas(my_point) + '</span>원 으로 구매 적립된 적립금 <span id="disp_cancel_after_point" class="point-color"></span>원을 취소 처리할 수 없습니다.</div>\
                                        <div class="section">미 취소된 적립금에 대한 처리는 판매자와 협의해주세요.</div>\
                                    </div>\
                                    <div class="newcheckbox hand">\
                                        <label style="margin-left: 25px;">\
                                            <input type="checkbox" class="cancel-agree" />\
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">\
                                                <path d="M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z"></path>\
                                            </svg>\
                                            <svg class="active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">\
                                                <path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"></path>\
                                            </svg>\
                                        위 내용을 확인하였습니다.</label>\
                                    </div>\
                                    <div class="point-used-cancel-agree-desc">\
                                        <svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>\
                                        적립금 환불 안내에 동의해주세요.\
                                    </div>\
                                </div>\
                            </div>\
                        ';
                    }
                    modal_str += '</form>\
                ';

                var oreModal = $(this).showModalFlat('반품/교환 요청', modal_str,true,true,function () {

                    var f = document.re_form;

                    if(oreModal.find('#re-reason').prop('value') == '') {
                        // $('#re-reason').selectpicker('toggle');
                        // return false;
                        $('#re-reason').closest('.cl-s-form-selector').addClass('empty');
                    }

                    oreModal.find('.cl-s-form-wrap').each(function() {
                        var check_input = $(this).find('.cl-s-form-control'),
                            val = check_input.val().trim();

                        if(val.length == 0) {
                            $(this).removeClass('error').addClass('empty');
                            $(this).find('.cl-s-control-label.error').remove();
                        } else {
                            if($(this).hasClass('error')) {
                                check_input.focus();
                            }
                        }
                    });
                    var checkCnt = 0;

                    $(".status-checkbox").each(function (i, index) {
                        if ($(this).is(":checked") === true) {
                            checkCnt++;
                        }
                    });

                    if (checkCnt < 1) {
                        alert('상품을 1개 이상 선택해 주세요');
                        return false;
                    }

                    if(oreModal.find('.cl-s-form-wrap.empty, .cl-s-form-wrap.error').length > 0) {
                        // oreModal.find('.cl-s-form-wrap.empty, .cl-s-form-wrap.error').eq(0).find('.cl-s-form-control').focus();
                        return false;
                    }


                    if(oreModal.find("input[type='checkbox'].cancel-agree:visible").length && oreModal.find("input[type='checkbox'].cancel-agree:visible").length != oreModal.find("input[type='checkbox'].cancel-agree:visible:checked").length) {
                        $(".point-used-cancel-agree-desc").show();
                        return false;
                    } else {
                        $(".point-used-cancel-agree-desc").hide();
                    }

                    $.processON();

                    f.submit();

                },'close','등록하기','cl-s-order-returnexchange cl-s-order-cancel cl-modal cl-s-btn cover ' + checkEscrowClass, false, '', function() {
                    var totalCnt = 0, totalNomalCheck = 0, nomalCheck = 0;
                    var price = 0;
                    var deliveryPrice = 0;
                    var $form = $('form[name="re_form"]');
                    $('.status-checkbox').each(function (i, index) {
                        if ($(this).is(":checked") === true) {
                            price += ($(this).closest('.cl-s-product-jumbotron').find('.option-check').attr('data-optionPrice') * 1);
                            totalCnt++;
                            if ($(this).attr('data-type') == 'normal') {
                                nomalCheck++;
                            }
                        }

                        if ($(this).attr('data-type') == 'normal') {
                            totalNomalCheck++;
                        }
                    });

                    if ($('.status-checkbox').length == totalCnt) {
                        deliveryPrice += ($('.status-checkbox').closest('.cl-s-product-jumbotron').find('.option-check').attr('data-deliveryPirce') * 1);
                    } else if (totalNomalCheck <= nomalCheck) {
                        deliveryPrice += ($('.status-checkbox').closest('.cl-s-product-jumbotron').find('.option-check').attr('data-deliveryPirce') * 1);
                    } else {
                        deliveryPrice = 0;
                    }

                    var product_price = price + deliveryPrice,
                        rePayment = parseInt(c_data.pay_info.request.payment.total) - parseInt(c_data.pay_info.request.cancel.total) - parseInt(c_data.pay_info.request.return.total);

                    rePayment = (rePayment > 0) ? rePayment : 0;
                    var use_point = (rePayment - product_price > 0) ? 0 : rePayment - product_price;
                    product_price = product_price + use_point;

                    $('#cancel-price').html(number_format(price)+'원');
                    $('#cancel-delivery-price').html(number_format(deliveryPrice)+'원');
                    $('#cancel-point-price').html('0원');
                    $('#return-total-price').html('0원');

                    $('.cancel-info-data').on('change', function () {
                        var cancel_after_point = my_point;
                        var disp_used_point_total = 0;
                       
                        if($("input[name='order_number_ary[]']:checked").length) {
                            $("input[name='order_number_ary[]']:checked").each(function() {
                                cancel_after_point = Number(cancel_after_point) + ((Number($(this).data("expired_point"))) - Number($(this).data("curr_point")));
                                disp_used_point_total += ((Number($(this).data("expired_point"))) - Number($(this).data("curr_point")));
                            });
                        }

                        if(cancel_after_point < 0) {
                            $(".point-used-desc #disp_cancel_after_point").html(addCommas(Math.abs(cancel_after_point)));
                            $(".point-used-desc #disp_used_point_total").html(addCommas(Math.abs(disp_used_point_total)));
                            $(".point-used-desc").removeClass("hide");
                        } else {
                            $(".point-used-desc").addClass("hide");
                            $(".point-used-desc #disp_cancel_after_point").html("");
                            $(".point-used-desc #disp_used_point_total").html("");
                        }

                        var price = 0;
                        var oLength = $('.option-check').length;
                        var totalCnt = 0, totalNomalCheck = 0, nomalCheck = 0;
                        var deliveryPrice = 0,
                            isReturn = $('input[name="status"]:checked').val();
                        $form.find('.order-cancel-content.extra-info').remove();
                        if ($(this).hasClass('noneAll') === true) {
                            if ($(this).hasClass('noneChecked') === true) {
                                $(this).prop('checked', false);
                            } else {
                                $(this).prop('checked', true);
                                $('.status-checkbox').each(function () {
                                    if ($(this).prop('disabled') !== true) $(this).prop('checked', true);
                                });
                            }
                        }

                        $('.status-checkbox').each(function (i, index) {
                            if ($(this).is(':checked') === true) {
                                price += ($(this).closest('.cl-s-product-jumbotron').find('.option-check').attr('data-optionPrice') * 1);
                                totalCnt++;
                                if ($(this).attr('data-type') == 'normal') {
                                    nomalCheck++;
                                }
                            }

                            if ($(this).attr('data-type') == 'normal') {
                                totalNomalCheck++;
                            }
                        });

                        if ($('.status-checkbox').length == totalCnt) {
                            deliveryPrice += ($('.status-checkbox').closest('.cl-s-product-jumbotron').find('.option-check').attr('data-deliveryPirce') * 1);
                        } else if (totalNomalCheck <= nomalCheck) {
                            deliveryPrice += ($('.status-checkbox').closest('.cl-s-product-jumbotron').find('.option-check').attr('data-deliveryPirce') * 1);
                        } else {
                            deliveryPrice = 0;
                        }

                        var product_price = price + deliveryPrice,
                            rePayment = parseInt(c_data.pay_info.request.payment.total) - parseInt(c_data.pay_info.request.cancel.total) - parseInt(c_data.pay_info.request.return.total);

                        rePayment = (rePayment > 0) ? rePayment : 0;
                        var use_point = (rePayment - product_price > 0) ? 0 : rePayment - product_price;
                        product_price = product_price + use_point;

                        $('#cancel-price').html(number_format(price)+'원');
                        $('#cancel-delivery-price').html(number_format(deliveryPrice)+'원');
                        $('#cancel-point-price').html(number_format(use_point)+'원');
                        $('#return-total-price').html(number_format((product_price>0) ? product_price : '0') +'원');

                        var extra_charge = Number($('#extra_charge').val());
                        if(extra_charge > 0 && isReturn == 'R' && totalNomalCheck > nomalCheck) extra_charge_info($form,rePayment + c_data.pay_info.point.pay_point, product_price+Math.abs(use_point), extra_charge);
                    });

                    $(document).on('click', '#product-check', function () {
                        var price = 0;
                        var deliveryPrice = 0;
                        var totalCnt = 0,
                            isReturn = $('input[name="status"]:checked').val();
                        $form.find('.order-cancel-content.extra-info').remove();   
                        if ($(this).hasClass('noneAll') === true) {
                            $(this).prop('checked', true);
                            $(".status-checkbox").each(function () {
                                if ($(this).prop('disabled') !== true) $(this).prop('checked', true).change();
                            });
                        }
                        if ($(this).is(':checked') === true) {
                            $('.status-checkbox').each(function (i) {
                                if ($(this).prop('disabled') !== true) {
                                    $(this).prop('checked', true).change();

                                    price += ($(this).closest('.cl-s-product-jumbotron').find('.option-check').attr('data-optionPrice') * 1);
                                    totalCnt++;
                                    if ($(this).attr('data-type') == 'normal') {
                                        nomalCheck++;
                                    }
                                }

                                if ($(this).attr('data-type') == 'normal') {
                                    totalNomalCheck++;
                                }
                            });

                            if ($('.status-checkbox').length == totalCnt) {
                                deliveryPrice += ($('.status-checkbox').closest('.cl-s-product-jumbotron').find('.option-check').attr('data-deliveryPirce') * 1);
                            } else if (totalNomalCheck <= nomalCheck) {
                                deliveryPrice += ($('.status-checkbox').closest('.cl-s-product-jumbotron').find('.option-check').attr('data-deliveryPirce') * 1);
                            } else {
                                deliveryPrice = 0;
                            }

                            var product_price = price + deliveryPrice,
                                rePayment = parseInt(c_data.pay_info.request.payment.total) - parseInt(c_data.pay_info.request.cancel.total) - parseInt(c_data.pay_info.request.return.total);

                            rePayment = (rePayment > 0) ? rePayment : 0;
                            var use_point = (rePayment - product_price > 0) ? 0 : rePayment - product_price;
                            product_price = product_price + use_point;

                            $('#cancel-price').html(number_format(price)+'원');
                            $('#cancel-delivery-price').html(number_format(deliveryPrice)+'원');
                            $('#cancel-point-price').html(number_format(use_point)+'원');
                            $('#return-total-price').html(number_format((product_price>0) ? product_price : '0') +'원');

                            var extra_charge = Number($('#extra_charge').val());
                            if(extra_charge > 0 && isReturn == 'R' && totalNomalCheck > nomalCheck) extra_charge_info($form,rePayment + c_data.pay_info.point.pay_point, product_price+Math.abs(use_point), extra_charge);
                        } else {
                            $(".status-checkbox").each(function () {
                                if ($(this).prop('disabled') !== true) $(this).prop('checked', false).change();
                            });

                            $('#cancel-price').html('0원');
                            $('#cancel-delivery-price').html('0원');
                            $('#cancel-point-price').html('0원');
                            $('#return-total-price').html('0원');
                        }
                    });

                    /* first option setting */
                    $('.cl-s-order-returnexchange .cl-s-form-selector').each(function(e) {
                        var checkSelectOption = ($(this).find('select option').length > 0) ? true : false;
                        if(checkSelectOption) {
                            var selectId = $(this).find('select').attr('id'),
                                val = $(this).find('select').children().eq(0).val();
                            $(this).find('select').selectpicker({'val':val, dropupAuto:false});
                        }
                    });

                    $('.cl-s-order-returnexchange .cl-s-btn-group-toggle input:radio').on({
                        change: function() {
                            var order_status = $(this).val(),
                                re_reason_obj = {
                                'R' : '\
                                    <option value="구매의사 취소">구매의사 취소</option>\
                                    <option value="다른 상품 잘못 주문">다른 상품 잘못 주문</option>\
                                    <option value="상품파손">상품파손</option>\
                                    <option value="배송지연">배송지연</option>\
                                    <option value="상품정보 상이">상품정보 상이</option>\
                                    <option value="오배송">오배송</option>\
                                    <option value="기타">기타</option>\
                                ',
                                'E' : '\
                                    <option value="컬러 및 사이즈 변경">컬러 및 사이즈 변경</option>\
                                    <option value="다른 상품 잘못 주문">다른 상품 잘못 주문</option>\
                                    <option value="상품파손">상품파손</option>\
                                    <option value="상품정보 상이">상품정보 상이</option>\
                                    <option value="오배송">오배송</option>\
                                    <option value="기타">기타</option>\
                                '
                            };
                            $form.find('.order-candel-content.extra-info').remove();
                            if (order_status == 'R') {
                                if (status == 'Y' && exchangeCheck == 'Y') {
                                    alert('에스크로 결제 상품은 교환 요청/완료가 있는 경우 반품 요청이 불가능합니다.\n기타 요청이 있는 경우 관리자에게 문의해 주세요.');
                                    setTimeout(function () {
                                        $('#order-radio-exchange').click();
                                    }, 500);
                                    return false;
                                }
                                $('#return-modal').css('display', 'block');
                                $('.order-cancel-content').css('display', 'block');
                                $('#no-bank').parent().parent().addClass('cl-s-form-wrap');
                                $('#no-bank-name').parent().parent().addClass('cl-s-form-wrap');
                                $('#no-bank-number').parent().parent().addClass('cl-s-form-wrap');
                                if (status == 'Y') {
                                    $('.status-checkbox').each(function () {
                                        $(this).prop('checked', true);
                                        $(this).addClass('noneAll');
                                    });
                                    $('#product-check').addClass('noneAll');
                                    $('#product-check').prop('checked', true);
                                    $('.escrow-warring').css({'display': 'block'});
                                }
                                var totalCnt = 0, totalNomalCheck = 0, nomalCheck = 0;
                                var price = 0;
                                var deliveryPrice = 0;
                                $(".status-checkbox").each(function (i, index) {
                                    if ($(this).is(":checked") === true) {
                                        price += ($(this).closest('.cl-s-product-jumbotron').find('.option-check').attr('data-optionPrice') * 1);
                                        totalCnt++;
                                        if ($(this).attr('data-type') == 'normal') {
                                            nomalCheck++;
                                            deliveryPrice = ($(this).closest('.cl-s-product-jumbotron').find('.option-check').attr('data-deliveryPirce') * 1);
                                        }
                                    }

                                    if ($(this).attr('data-type') == 'normal') {
                                        totalNomalCheck++;
                                    }
                                });

                                var product_price = price + deliveryPrice,
                                    rePayment = parseInt(c_data.pay_info.request.payment.total) - parseInt(c_data.pay_info.request.cancel.total) - parseInt(c_data.pay_info.request.return.total);

                                rePayment = (rePayment > 0) ? rePayment : 0;
                                var use_point = (rePayment - product_price > 0) ? 0 : rePayment - product_price;
                                product_price = product_price + use_point;

                                $('#cancel-price').html(number_format(price)+'원');
                                $('#cancel-delivery-price').html(number_format(deliveryPrice)+'원');
                                $('#cancel-point-price').html(number_format(use_point)+'원');
                                $('#return-total-price').html(number_format(product_price)+'원');

                                var extra_charge = Number($('#extra_charge').val());
                                if(extra_charge > 0 && totalNomalCheck > nomalCheck) extra_charge_info($form,rePayment + c_data.pay_info.point.pay_point, product_price+Math.abs(use_point), extra_charge);
                            } else {
                                $form.find('.order-candel-content.extra-info').remove();
                                $('#return-modal').css('display', 'none');
                                $('.order-cancel-content').css('display', 'none');
                                $('#no-bank').parent().parent().removeClass('cl-s-form-wrap');
                                $('#no-bank-name').parent().parent().removeClass('cl-s-form-wrap');
                                $('#no-bank-number').parent().parent().removeClass('cl-s-form-wrap');
                                if (status == 'Y') {
                                    $('.status-checkbox').each(function () {
                                        $(this).prop('checked', false);
                                        $(this).removeClass('noneAll');
                                    });
                                    $('#product-check').removeClass('noneAll');
                                    $('#product-check').prop('checked', false);
                                    $('.escrow-warring').css({'display': 'none'});
                                }
                            }

                            $('#re-reason').closest('.cl-s-form-selector').removeClass('empty');
                            $('#re-reason').html(re_reason_obj[order_status]).selectpicker('refresh');
                            $('#re-reason').selectpicker('val', $('#re-reason').val());
                        }
                    });
                    if (status == 'Y' && exchangeCheck == 'Y') {
                        $('#order-radio-exchange').click();
                    }

                    $('#re-reason').on({
                        'show.bs.select': function (e) {
                            $(this).closest('.cl-s-form-selector').addClass('active');
                        },
                        'hidden.bs.select': function(e) {
                            $(this).closest('.cl-s-form-selector').removeClass('active');

                            if($('#re-reason').prop('value') == '') {
                                $(this).closest('.cl-s-form-selector').addClass('empty');
                            } else {
                                $(this).closest('.cl-s-form-selector').removeClass('empty');
                            }
                        },
                        'changed.bs.select': function (e, clickedIndex, newValue, oldValue) {
                            // console.log(this.value, clickedIndex, newValue, oldValue);
                        }
                    });


                    $('.cl-s-order-returnexchange .cl-s-form-group').on('click',function(e) {
                        if($(e.target).hasClass('cl-s-form-group')) {
                            $(e.target).find('.cl-s-form-control:not([type=hidden])').focus();
                        }
                    });


                    $('.cl-s-order-returnexchange .cl-s-form-textarea').on({
                        focus: function(e) {
                            $(this).closest('.cl-s-form-wrap').addClass('active');
                        },
                        blur: function(e) {
                            var error_str = '',
                                val = $(this).val().trim();

                            $(this).closest('.cl-s-form-wrap').removeClass('active');
                            if(val.length == 0) {
                                $(this).closest('.cl-s-form-wrap').removeClass('error').addClass('empty');
                                $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                                return false;
                            } else {
                                $(this).closest('.cl-s-form-wrap').removeClass('empty');

                                if(checkEmojis(val)) error_str = $.lang[LANG]['config.unable.emoji'];
                                else if(val.length < 5) error_str = $.lang[LANG]['customsite.validate.message.minlengthto5'];

                                if(error_str.length > 0) {
                                    $(this).closest('.cl-s-form-wrap').addClass('error');
                                    if($(this).parent().find('.cl-s-control-label.error').length > 0) {
                                        $(this).parent().find('.cl-s-control-label.error').html(error_str);
                                    } else {
                                        $(this).after('<label for="input" class="cl-s-control-label error">' + error_str + '</label>');
                                    }
                                    return false;
                                }
                            }

                            $(this).closest('.cl-s-form-wrap').removeClass('error');
                            $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                        }
                    });

                    $('.cl-s-form-wrap .cl-s-form-control').on({
                        focus: function(e) {
                            $(this).closest('.cl-s-form-wrap').addClass('active');
                        },
                        blur: function(e) {
                            var val = $(this).val().trim();

                            $(this).closest('.cl-s-form-wrap').removeClass('active');
                            if(val.length == 0) {
                                $(this).closest('.cl-s-form-wrap').removeClass('error').addClass('empty');
                                $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                                return false;
                            } else {
                                $(this).closest('.cl-s-form-wrap').removeClass('empty');

                                if(checkEmojis(val)) {
                                    $(this).closest('.cl-s-form-wrap').addClass('error');
                                    if($(this).parent().find('.cl-s-control-label.error').length > 0) {
                                        $(this).parent().find('.cl-s-control-label.error').html($.lang[LANG]['config.unable.emoji']);
                                    } else {
                                        $(this).after('<label for="input" class="cl-s-control-label error">' + $.lang[LANG]['config.unable.emoji'] + '</label>');
                                    }
                                    return false;
                                }
                            }

                            $(this).closest('.cl-s-form-wrap').removeClass('error');
                            $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                        }
                    });



                    $(document).on('click', '.cl-s-order-returnexchange .re-img-close', function() {
                        $(this).closest('li').remove();
                    })

                    $('.cl-s-order-returnexchange .re-file-update').on('click', function () {
                        $("#re-file").click();
                    });

                    $('.cl-s-order-returnexchange #re-file').on({
                        click: function () {

                            var reImageCnt = $('.re-files-list').children('li').length;
                            if (reImageCnt >= 5) {
                                alert('이미지는 최대 5개까지 등록이 가능합니다.');
                                return false;
                            }

                            var sid = $('#re-file').attr('data-sid'),
                                uid = $('#re-file').attr('data-uid');

                            $.uploadON();
                            $(this).fileupload({
                                url: '/_upload/type/re/sid/'+sid+'/uid/'+uid,
                                dataType: 'json',
                                pasteZone: null,
                                async: true,
                                sequentialUploads: true,
                                add: function(e, data) {
                                    var r = $.upload_add(e,data,'image');

                                    if(r.submit) {
                                        var jqXHR = data.submit();
                                        UPLOAD++;
                                    } else {
                                        data.context.find('.loading').html('<i class="fa fa-times error"></i>');
                                        data.context.find('.ing').addClass('error').text(r.err);
                                    }

                                    $(document).on('click','.upload-cancel .btn', function(e) {
                                        if(jqXHR != undefined) jqXHR.abort();
                                        data.context.fadeOut().remove();
                                        $('.uploadModal #file-upload-progress').css('width','0%');
                                        $.uploadOFF();
                                    });
                                },
                                progress: function(e, data) {
                                    $.upload_progress(e,data);
                                },                        
                                done: function(e, data) {
                                    $.upload_done(e,data);
                                    UPLOADED++;
                                    var src = (typeof data.result.magic != 'undefined') ? data.result.magic : data.result.src;
                                    var reImage = '\
                                        <li id="re-image-'+reImageCnt+'">\
                                            <img src="'+src+'" class="img-responsive" />\
                                            <input type="hidden" name="review_image[]" value="'+src+'" />\
                                            <div class="cl-s-files-img-close re-img-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8" height="8"><path d="M4.71 4l3.15-3.15c0.2-0.2 0.2-0.51 0-0.71s-0.51-0.2-0.71 0L4 3.29 0.85 0.15c-0.2-0.2-0.51-0.2-0.71 0s-0.2 0.51 0 0.71L3.29 4 0.15 7.15c-0.2 0.2-0.2 0.51 0 0.71C0.24 7.95 0.37 8 0.5 8s0.26-0.05 0.35-0.15L4 4.71l3.15 3.15C7.24 7.95 7.37 8 7.5 8s0.26-0.05 0.35-0.15c0.2-0.2 0.2-0.51 0-0.71L4.71 4z"/></svg></div>\
                                        </li>\
                                    ';

                                    $(".cl-s-order-returnexchange .re-files-list").append(reImage);
                                    reImageCnt++;

                                    if(UPLOADED) {
                                        if(UPLOAD==UPLOADED) {
                                            setTimeout(function() {
                                                UPLOAD = 0;
                                                UPLOADED = 0;
                                                UPLOADSIZE = 0;
                                                PROGRESS = 0;
                                                $.uploadOFF();
                                            },1000);
                                        }
                                    }
                                },
                                progressall: function (e, data) {
                                    $.upload_progressall(e,data);
                                },
                                start : function(e, data) {
                                    $.upload_start(e,data);
                                    progress1 = 0; progress2 = 0; PROGRESS = 0;
                                },
                                dragover : function(e, data) {
                                    e.preventDefault();
                                },
                            }).prop('disabled', !$.support.fileInput)
                                .parent().addClass($.support.fileInput ? undefined : 'disabled');
                        }
                    });
                });
            },'json');

            $('.close-button-dialog').css({'display': 'block'});
        },
        writeReviewModal: function(sid, pnum, onum, type) {
            if(typeof sid == 'undefined' || typeof pnum == 'undefined' || typeof onum == 'undefined') {
                alert('정보가 올바르지 않습니다');
                return false;
            }

            $.post('/_check_order', { sid:sid, pnum:pnum, onum:onum, mode:'review' }, function(data) {
                if(typeof data.error != 'undefined' && data.error) {
                    $(this).showModalFlat('', data.error, true, false, '', 'close');
                    return false;
                }

                var c_data = data.r,
                    modal_str = '',
                    order_group = data.order_group,
                    picturePointStr = '';
                
                if(c_data.writer.status == 'A') {
                    alert('관리자는 상품 후기 작성을 사용할 수 없습니다.');
                    return false;
                }
                    if (c_data.pay_info.settings.point_data != null && c_data.pay_info.settings.point_data['point_use'] == 'Y' && c_data.writer.status != 'T') {
                        if (c_data.pay_info.settings.point_data['review_point_status'] == 'Y') {
                            if(typeof c_data.pay_info.settings.point_data != "undefined" && c_data.pay_info.settings && c_data.odata.price > 0) {  
                                var photoPoint = (c_data.pay_info.settings.point_data['review_photo_point'] > 0) ? c_data.pay_info.settings.point_data['review_photo_point'] : 0,
                                    textPoint = (c_data.pay_info.settings.point_data['review_point'] > 0) ? c_data.pay_info.settings.point_data['review_point'] : 0;
                                    picturePointStr = '\
                                        <div class="cl-s-ps">\
                                            <svg viewBox="0 0 13 13" width="13" height="13">\
                                                <path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/>\
                                                <rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/>\
                                            </svg>사진 첨부 시 <span>'+number_format(photoPoint)+'원</span>이 적립됩니다.\
                                        </div>\
                                ';
                            }
                           
                            if(c_data.odata.price > 0) {
                                modal_str += '\
                                    <div class="review-point review-icon">후기 작성 시 적립금 <span>최대 '+number_format(photoPoint)+'원</span>\
                                        <svg viewBox="0 0 13 13" width="13" height="13" class="cm-popover-info hand" tabindex="0" data-trigger="focus" data-toggle="popover" data-placement="bottom" data-html="true" data-content="텍스트 후기 : &nbsp; '+number_format(textPoint)+'원 <br>포토 후기 : &nbsp; '+number_format(photoPoint)+'원<br>\
                                        <p>텍스트 후기와 포토 후기 적립금은 중복지급되지 않으며, 최초 작성한 후기를 기준으로 지급됩니다.</p>">\
                                            <path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/>\
                                            <rect x="6" y="9" width="1" height="1"/>\
                                            <path d="M6.66 3.01C5.61 3.01 4.58 3.5 4.5 4.8c0 0.06-0.01 0.12 0 0.2h1.02c0-0.07 0.01-0.15 0.02-0.23 0.08-0.62 0.52-0.76 1.08-0.76 0.63 0 1.02 0.37 1.02 0.95 -0.01 0.48-0.3 0.87-0.76 1.34C6.21 6.97 6.02 7.37 6 8h0.99C7 7.66 7.04 7.37 7.67 6.75 8.17 6.27 8.7 5.68 8.7 4.87 8.7 3.85 7.89 3.01 6.66 3.01z"/>\
                                        </svg>\
                                    </div>\
                                ';
                            }
                        }
                    }

                    modal_str += '\
                    <div class="review-body review-write-body">\
                        <div class="cl-s-product-jumbotron clearfix">\
                            <div class="cl-s-product-thumb">\
                                <img src="' + c_data.pdata.img + '" alt="' + c_data.pdata.name + '" class="' + c_data.pdata.img_align + '" />\
                            </div>\
                            <div class="cl-s-product-info">\
                                <h5 class="cl-s-product-title">' + c_data.pdata.name + '</h5>\
                    ';
                    var option_title = (c_data.pdata.option_type == 'A') ? '추가옵션: ' + c_data.pdata.option_group + ': ' : '옵션: ';
                    if(typeof c_data.pdata.option != "undefined" && c_data.pdata.option) {
                        modal_str += (c_data.pdata.option_text_str)? '\
                                <div class="option-str">' + option_title + c_data.pdata.option + ' / ' + c_data.pdata.option_text_str + '</div>\
                        ' : '\
                                <div class="option-str">' + option_title + c_data.pdata.option + '</div>\
                        ';
                    } else {
                        modal_str += (c_data.pdata.option_text_str)? '\
                                <div class="option-str">' + c_data.pdata.option_text_str + '</div>\
                        ' : '';
                    }
                    if(typeof c_data.pdata.etc_date != "undefined" && c_data.pdata.etc_date) {
                        modal_str += '\
                                <div class="option-str">선택일자: ' + c_data.pdata.etc_date + '</div>\
                        ';
                    }
                    modal_str += '\
                            </div>\
                        </div>\
                        <div class="review-star">\
                            <h5>상품이 만족스러우셨나요?</h5>\
                            <div class="star text-center">\
                                <span data-idx="1" class="active"></span>\
                                <span data-idx="2" class="active"></span>\
                                <span data-idx="3" class="active"></span>\
                                <span data-idx="4" class="active"></span>\
                                <span data-idx="5" class="active"></span>\
                            </div>\
                        </div>\
                        <div class="review-content">\
                            <h5>어떤 점이 좋았나요?</h5>\
                            <div class="cl-s-form-wrap">\
                                <div class="cl-s-form-group input-label-hide">\
                                    <textarea class="cl-s-form-control" id="review-str" name="review" maxlength="1000" required="required"></textarea>\
                                    <label for="input" class="cl-s-control-label">자세한 내용을 적어주세요. (1000자 이내)</label>\
                                </div>\
                            </div>\
                            <div class="cl-s-files review-files file-center">\
                                <input id="review-file" type="file" name="files[]" accept="image/jpeg,image/gif,image/png" multiple data-sid="' + sid + '" data-uid=\"' + c_data.writer.id + '\">\
                                <label class="cl-s-file-update review-file-update clearfix"><svg viewBox="0 0 42 36" width="18" height="16"><path d="M36 6h-5l-3-5c0 0-0.71-1-1.99-1 -0.72 0-2.54 0-3.99 0 0 0-0.91 0-2.04 0 -1.45 0-3.27 0-3.99 0C14.71 0 14 1 14 1l-3 5H6c-3.31 0-6 2.69-6 6v18c0 3.31 2.69 6 6 6h30c3.31 0 6-2.69 6-6V12C42 8.69 39.31 6 36 6zM21 31c-5.52 0-10-4.48-10-10 0-5.52 4.48-10 10-10 5.52 0 10 4.48 10 10C31 26.52 26.52 31 21 31z"/><circle cx="21" cy="21" r="6"/></svg><span>사진 첨부하기</span></label>';
                    if(c_data.pay_info.settings.point_data != null && c_data.pay_info.settings.point_data['point_use'] == 'Y' && c_data.pay_info.settings.point_data['review_point_status'] == 'Y') modal_str += picturePointStr;
                    modal_str += '\
                                <ul class="cl-s-files-list review-files-list clearfix files-list-wrap">\
                                </ul>\
                            </div>\
                            </div>\
                        </div>\
                            ';
                
                // $('.flat-modal .modal').modal('hide');
                var wrModal = $(this).showModalFlat('후기 작성', modal_str, true, true,function () {

                    var cl_s_f_body = $('.cl-s-product-review-write .review-content');
                    cl_s_f_body.find('.cl-s-form-wrap').each(function() {
                        var check_input = $(this).find('.cl-s-form-control'),
                            val = check_input.val().trim();

                        if(val.length == 0) {
                            $(this).removeClass('error').addClass('empty');
                            $(this).find('.cl-s-control-label.error').remove();
                        } else {
                            if($(this).hasClass('error')) {
                                check_input.focus();
                            }
                        }
                    });

                    if(cl_s_f_body.find('.cl-s-form-wrap.empty, .cl-s-form-wrap.error').length > 0) {
                        cl_s_f_body.find('.cl-s-form-wrap.empty, .cl-s-form-wrap.error').eq(0).find('.cl-s-form-control').focus();
                        return false;
                    }

                    var page_mode = ($('.cl-s-mypage').length > 0) ? 'mypage' : 'no_member',
                        review = $('#review-str').val().trim(),
                        review_star = $('.cl-s-product-review-write .review-star .star .active').length,
                        review_image = new Array();
                        review_image_orig = new Array();

                    $('input[name="review_image[]"]').each(function(i) {
                        review_image[i] = $(this).val();
                    });

                    $('input[name="review_image_orig[]"]').each(function(i) {
                        review_image_orig[i] = $(this).val();
                    });

                    var review_data = {
                        status : 'S',
                        page_mode : page_mode,
                        pnum : pnum,
                        onum : onum,
                        mb_status : c_data.writer.status,
                        review : review,
                        review_count : review_star,
                        review_image : review_image,
                        review_image_orig : review_image_orig
                    };

                    if(c_data.writer.status == 'T') {
                        review_data['name'] = c_data.odata.name;
                        // review_data['order_group'] = c_data.order_data.group;
                    }

                    $('.ok-button-dialog').prop('disabled', true);

                    $.post('/_review_write', { sid:sid, order_group: order_group, data:JSON.stringify(review_data) }, function(rw_data) {
                        if(typeof rw_data.error != 'undefined' && rw_data.error) {
                            $(this).showModalFlat('ERROR', rw_data.error, true, false, '', 'close');
                            return false;
                        }

                        location.reload();
                    }, 'json');

                },'close','등록하기','cl-s-product-review-write cl-modal cl-s-btn cover', true, '', function() {

                    $('.cl-s-product-review-write .cl-s-form-group').on('click',function(e) {
                        if($(e.target).hasClass('cl-s-form-group')) {
                            $(e.target).find('.cl-s-form-control:not([type=hidden])').focus();
                        }
                    });
                    $('[data-toggle="popover"]').popover();
                    $('.cl-s-product-review-write .cl-s-form-control').on({
                        focus: function(e) {
                            $(this).closest('.cl-s-form-wrap').addClass('active');
                        },
                        blur: function(e) {
                            var val = $(this).val().trim();

                            $(this).closest('.cl-s-form-wrap').removeClass('active');
                            if(val.length == 0) {
                                $(this).closest('.cl-s-form-wrap').removeClass('error').addClass('empty');
                                $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                                return false;
                            } else {
                                $(this).closest('.cl-s-form-wrap').removeClass('empty');
                                var passEmoji = ($.inArray($(this).attr('name'),['review']) > -1) ? true : false,
                                    error_str = '';
                                if(!passEmoji && checkEmojis(val)) error_str = $.lang[LANG]['config.unable.emoji'];
                                else if(val.length < 5) error_str = $.lang[LANG]['customsite.validate.message.minlengthto5'];
                                
                                if(error_str.length > 0) {
                                    $(this).closest('.cl-s-form-wrap').addClass('error');
                                    if($(this).parent().find('.cl-s-control-label.error').length > 0) {
                                        $(this).parent().find('.cl-s-control-label.error').html(error_str);
                                    } else {
                                        $(this).after('<label for="input" class="cl-s-control-label error">' + error_str + '</label>');
                                    }
                                    return false;
                                }
                            }

                            $(this).closest('.cl-s-form-wrap').removeClass('error').removeClass('empty');
                            $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                        }
                    });

                    $(document).on('click', '.cl-s-product-review-write .review-img-close', {mode: 'review'}, deleteReviewQnaImg);

                    $('.cl-s-product-review-write .review-file-update').on('click', function () {
                        $("#review-file").click();
                    });

                    $('.cl-s-product-review-write #review-file').on('click', {mode: 'review'}, uploadReviewQnaImg);

                    $('.cl-s-product-review-write .review-star .star span').on('click', function() {
                        var rCount = $(this).attr('data-idx');
                        $(this).parent().children('span').removeClass('active');
                        $(this).addClass('active').prevAll('span').addClass('active');
                    });
                }, function() {
                    if($('.cl-s-product-review-write .review-img-close').length > 0){
                        $.each($('.cl-s-product-review-write .review-img-close'), function(){
                            $(this).trigger('click');
                        });
                    }
                });


            },'json');

        },
        editReviewModal: function(sid, pnum, onum, seq) {
            if(typeof sid == "undefined" || typeof pnum == "undefined" || typeof onum == "undefined") {
                alert('정보가 올바르지 않습니다');
                return false;
            }

            $.post('/_check_review', { sid:sid, seq: seq, mode:'review' }, function(data) {

                if(typeof data.error != "undefined" && data.error) {
                    $(this).showModalFlat('', data.error, true, false, '', 'close');
                    return false;
                }

                var c_data = data.r,
                    modal_str = '\
                    <div class="review-body review-write-body">\
                        <div class="cl-s-product-jumbotron clearfix">\
                            <div class="cl-s-product-thumb">\
                                <img src="' + c_data.pdata.img + '" alt="' + c_data.pdata.name + '" class="' + c_data.pdata.img_align + '" />\
                            </div>\
                            <div class="cl-s-product-info">\
                                <h5 class="cl-s-product-title">' + c_data.pdata.name + '</h5>\
                    ';
                    var option_title = (c_data.pdata.option_type == 'A') ? '추가옵션: ' + c_data.pdata.option_group + ': ' : '옵션: ';
                    if(typeof c_data.pdata.option != "undefined" && c_data.pdata.option) {
                        modal_str += (c_data.pdata.option_text_str)? '\
                                <div class="option-str">' + option_title + c_data.pdata.option + ' / ' + c_data.pdata.option_text_str + '</div>\
                        ' : '\
                                <div class="option-str">' + option_title + c_data.pdata.option + '</div>\
                        ';
                    } else {
                        modal_str += (c_data.pdata.option_text_str)? '\
                                <div class="option-str">' + option_title + c_data.pdata.option_text_str + '</div>\
                        ' : '';
                    }
                    if(typeof c_data.pdata.etc_date != "undefined" && c_data.pdata.etc_date) {
                        modal_str += '\
                                <div class="option-str">선택일자: ' + c_data.pdata.etc_date + '</div>\
                        ';
                    }
                    var image = c_data.review.review_image.split("||").filter(function(v){return v!==''});
                    var image_orig = c_data.review.review_image_orig.split("||").filter(function(v){return v!==''});
                    var reviewImage = '';
                    if(image.length > 0) {
                        for (var i=0;i<image.length;i++) {
                            reviewImage += '\
                                <li id="review-image-'+i+'">\
                                    <img src="'+image[i]+'" class="img-responsive" />\
                                    <input type="hidden" name="review_image[]" value="'+image[i]+'" />\
                                    <input type="hidden" name="review_image_orig[]" value="'+image_orig[i]+'" />\
                                    <div class="cl-s-files-img-close review-img-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8" height="8"><path d="M4.71 4l3.15-3.15c0.2-0.2 0.2-0.51 0-0.71s-0.51-0.2-0.71 0L4 3.29 0.85 0.15c-0.2-0.2-0.51-0.2-0.71 0s-0.2 0.51 0 0.71L3.29 4 0.15 7.15c-0.2 0.2-0.2 0.51 0 0.71C0.24 7.95 0.37 8 0.5 8s0.26-0.05 0.35-0.15L4 4.71l3.15 3.15C7.24 7.95 7.37 8 7.5 8s0.26-0.05 0.35-0.15c0.2-0.2 0.2-0.51 0-0.71L4.71 4z"/></svg></div>\
                                </li>\
                            ';
                        }
                    }
                    
                    modal_str += '\
                            </div>\
                        </div>\
                        <div class="review-star">\
                            <h5>상품이 만족스러우셨나요?</h5>\
                            <div class="star text-center">';
                            for(var i=0;i<5;i++) {
                                var rs_onof = (i < c_data.review.review_score) ? 'active' : '';
                                modal_str += '<span data-idx="'+(i+1)+'" class="'+rs_onof+'"></span>';
                            }
                            modal_str += '\
                            </div>\
                        </div>\
                        <div class="review-content">\
                            <h5>어떤 점이 좋았나요?</h5>\
                            <div class="cl-s-form-wrap">\
                                <div class="cl-s-form-group input-label-hide">\
                                    <textarea class="cl-s-form-control" id="review-str" name="review" maxlength="1000" required="required">'+c_data.review.review+'</textarea>\
                                    <label for="input" class="cl-s-control-label">자세한 내용을 적어주세요. (1000자 이내)</label>\
                                </div>\
                            </div>\
                            <div class="cl-s-files review-files">\
                                <input id="review-file" type="file" name="files[]" multiple data-sid="' + sid + '" data-uid=\"' + c_data.writer.id + '\" data-seq=\"'+seq+'\">\
                                <label class="cl-s-file-update review-file-update clearfix"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><path d="M0 0v20h20V0H0zM19 1v11.3l-3-3 -4 4 -6-6 -5 5V1H19zM1 19v-5.3l5-5 6 6 4-4 3 3V19H1z"/><circle cx="14.5" cy="5.5" r="1.5"/></svg> <span>사진</span></label>\
                                <ul class="cl-s-files-list review-files-list clearfix" >\
                                '+reviewImage+'\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\
                \
                ';

                // $('.flat-modal .modal').modal('hide');
                var wrModal = $(this).showModalFlat('후기 작성', modal_str, true, true, function () {

                    var cl_s_f_body = $('.cl-s-product-review-write .review-content');
                    cl_s_f_body.find('.cl-s-form-wrap').each(function() {
                        var check_input = $(this).find('.cl-s-form-control'),
                            val = check_input.val().trim();

                        if(val.length == 0) {
                            $(this).removeClass('error').addClass('empty');
                            $(this).find('.cl-s-control-label.error').remove();
                        } else {
                            if($(this).hasClass('error')) {
                                check_input.focus();
                            }
                        }
                    });

                    if(cl_s_f_body.find('.cl-s-form-wrap.empty, .cl-s-form-wrap.error').length > 0) {
                        cl_s_f_body.find('.cl-s-form-wrap.empty, .cl-s-form-wrap.error').eq(0).find('.cl-s-form-control').focus();
                        return false;
                    }

                    var review = $('#review-str').val().trim(),
                        review_star = $('.cl-s-product-review-write .review-star .star .active').length,
                        review_image = new Array();
                        review_image_orig = new Array();
                    $('input[name="review_image[]"]').each(function(i) {
                        review_image[i] = $(this).val();
                    });
                    $('input[name="review_image_orig[]"]').each(function(i) {
                        review_image_orig[i] = $(this).val();
                    });
                    
                    var review_data = {
                        status : 'U',
                        page_mode : 'product',
                        pnum : pnum,
                        onum : onum,
                        seq : seq,
                        mb_status : c_data.writer.status,
                        review : review,
                        review_count : review_star,
                        review_image : review_image,
                        review_image_orig : review_image_orig
                    };

                    if(c_data.writer.status == 'T') {
                        review_data['name'] = c_data.odata.name;
                        // review_data['order_group'] = c_data.order_data.group;
                    }

                    $('.ok-button-dialog').prop('disabled', true);
                    
                    $.post('/_review_write', { sid:sid, data:JSON.stringify(review_data) }, function(rw_data) {
                        if(typeof rw_data.error != 'undefined' && rw_data.error) {
                            $(this).showModalFlat('ERROR', rw_data.error, true, false, '', 'close');
                            return false;
                        }

                        wrModal.modal('hide');
                        setTimeout(function () {
                            location.reload();
                        }, 200); 
                    }, 'json');



                },'close','수정하기','cl-s-product-review-write cl-modal cl-s-btn cover', true, '', function() {
                    $('.cl-s-product-review-write .cl-s-form-group').on('click',function(e) {
                        if($(e.target).hasClass('cl-s-form-group')) {
                            $(e.target).find('.cl-s-form-control:not([type=hidden])').focus();
                        }
                    });

                    $('.cl-s-product-review-write .cl-s-form-control').on({
                        focus: function(e) {
                            $(this).closest('.cl-s-form-wrap').addClass('active');
                        },
                        blur: function(e) {
                            var val = $(this).val().trim();

                            $(this).closest('.cl-s-form-wrap').removeClass('active');
                            if(val.length == 0) {
                                $(this).closest('.cl-s-form-wrap').removeClass('error').addClass('empty');
                                $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                                return false;
                            } else {
                                $(this).closest('.cl-s-form-wrap').removeClass('empty');

                                var passEmoji = ($.inArray($(this).attr('name'),['review']) > -1) ? true : false,
                                    error_str = '';
                                if(!passEmoji && checkEmojis(val)) error_str =  $.lang[LANG]['config.unable.emoji'];
                                else if(val.length < 5) error_str = $.lang[LANG]['customsite.validate.message.minlengthto5'];

                                if(error_str.length > 0) {
                                    $(this).closest('.cl-s-form-wrap').addClass('error');
                                    if($(this).parent().find('.cl-s-control-label.error').length > 0) {
                                        $(this).parent().find('.cl-s-control-label.error').html(error_str);
                                    } else {
                                        $(this).after('<label for="input" class="cl-s-control-label error">' + error_str + '</label>');
                                    }
                                    return false;
                                }
                            }

                            $(this).closest('.cl-s-form-wrap').removeClass('error').removeClass('empty');
                            $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                        }
                    });


                    $(document).on('click', '.cl-s-product-review-write .review-img-close', {mode: 'review'}, deleteReviewQnaImg);


                    $('.cl-s-product-review-write .review-file-update').on('click', function () {
                        $("#review-file").click();
                    });

                    $('.cl-s-product-review-write #review-file').on('click', {mode: 'review'}, uploadReviewQnaImg);

                    $('.cl-s-product-review-write .review-star .star span').on('click', function() {
                        var rCount = $(this).attr('data-idx');
                        $(this).parent().children('span').removeClass('active');
                        $(this).addClass('active').prevAll('span').addClass('active');
                    });

                });

            },'json');

        },
        viewReviewModal: function(sid, seq, page) {
            if(typeof sid == 'undefined' || typeof seq == 'undefined') {
                alert('정보가 올바르지 않습니다');
                return false;
            }

            $.post('/_check_review', { sid:sid, seq:seq }, function(data) {
                if(typeof data.error != 'undefined' && data.error) {
                    $(this).showModalFlat('', data.error, true, false, '', 'close');
                    return false;
                }

                var c_data = data.r;
                var um_id = c_data.review.um_id;
                var writer = c_data.writer.id;
                var writerName = (um_id == writer)? c_data.review.name : c_data.review.masked_name;
                    writerName = (c_data.writer.status == 'A')? c_data.review.name : writerName;
                var image = c_data.review.review_image.split("||").filter(function(v){return v!==''});
                var reviewImage = '';
                for (var i=0;i<image.length;i++) {
                    reviewImage += '<img src="'+getServeImage(image[i], '800', '')+'">';
                }
                
                var modal_str = '\
                    <div class="review-body">\
                        <div class="cl-s-product-jumbotron clearfix">\
                            <div class="cl-s-product-thumb">\
                                <img src="' + c_data.pdata.img + '" alt="' + c_data.pdata.name + '" class="' + c_data.pdata.img_align + '" />\
                            </div>\
                            <div class="cl-s-product-info">\
                                <h5 class="cl-s-product-title">' + c_data.pdata.name + '</h5>\
                            ';
                    var option_title = (c_data.pdata.option_type == 'A') ? '추가옵션: ' + c_data.pdata.option_group + ': ' : '옵션: ';                            
                    if(typeof c_data.pdata.option != "undefined" && c_data.pdata.option) {
                        modal_str += '\
                                <div class="option-str">' + option_title + c_data.pdata.option + '</div>\
                        ';
                    }
                    if(typeof c_data.pdata.etc_date != "undefined" && c_data.pdata.etc_date) {
                        modal_str += '\
                                <div class="option-str">선택일자: ' + c_data.pdata.etc_date + '</div>\
                        ';
                    }

                    c_data.review_status = (c_data.writer.status=='T' && page=='mypayment')? 'Y':c_data.review_status;

                    modal_str += '\
                            </div>\
                        </div>\
                        <div class="review-member-info">\
                            <span>' + (c_data.review.inflow=='NAVERPAY' ? '<svg class="ico-naverpay" viewBox="0 0 24 24" width="14" height="14"><polygon points="15.2 2.8 15.2 12.1 8.9 2.8 2 2.8 2 21.2 8.8 21.2 8.8 11.9 15.2 21.2 22 21.2 22 2.8 "></polygon></svg>' : '') + writerName + '<span class="view-review-date">' + c_data.review.reg_date + '</span></span>';
                            if (c_data.review_status == 'Y' || c_data.review_status == 'A' || c_data.writer.status == 'A') {
                                modal_str += '<div class="review-edit-box" data-pnum="'+c_data.review.product_number+'" data-onum="'+c_data.review.order_number+'" data-seq="'+c_data.review.seq+'">';
                                if (c_data.review_status == 'Y' && c_data.review.status == 'N') {
                                    modal_str += '<button type="button" class="review-edit">수정</button>';
                                    modal_str += '<button type="button" class="review-delete">삭제</button>';
                                }
                                if (c_data.writer.status == 'A') {
                                    modal_str += '<button type="button" class="review-delete">삭제</button>';
                                }
                                modal_str += '</div>\
                                ';
                            }
                        modal_str += '\
                        </div>\
                        <div class="view-review-box">\
                            <div class="review-score">';
                            for(var i=0;i<5;i++) {
                                var rs_onof = (i < c_data.review.review_score) ? 'on' : 'off';
                                modal_str += '<span class="re_starimg star_'+ rs_onof +'"><svg viewBox="0 0 15 15" width="15" height="15"><polygon points="15 5.8 9.78 4.77 7.5 0 5.22 4.77 0 5.8 3.59 9.55 2.93 15 7.5 12.61 12.07 15 11.41 9.55 "/></svg></span>';
                            }

                            if(c_data.review.inflow=='NAVERPAY') {
                                if(c_data.review.review_image) {
                                    reviewImage = '<img src="' + c_data.review.review_image + '" />';
                                } else {
                                    reviewImage = '';
                                }
                            }

                            modal_str += '\
                            </div>\
                            <div class="review-box-content">'+nl2br(c_data.review.review)+'</div>\
                            <div class="review-box-image">'+reviewImage+'</div>\
                            ';
                            if(c_data.review.status == 'Y'){
                            modal_str += '\
                            <div class="review-box-content review-answer answer-content_'+seq+'">\
                                <div class="review-answer-info"><span>관리자<span class="view-review-date">'+c_data.review.answer_date+'</span></span></div>\
                                <div class="review-content">'+nl2br(c_data.review.answer)+'\
                            </div>'; //end review-answer-content
                            if(c_data.writer.status == 'A') {
                                modal_str += '\
                                    <div class="answer-editor-button" data-pnum="'+c_data.review.product_number+'" data-onum="'+c_data.review.order_number+'" data-seq="'+c_data.review.seq+'">\
                                        <button type="button" class="btn answer-modify-btn" data-seq="'+seq+'">수정</button>\
                                        <button type="button" class="btn answer-delete-btn" onclick="answerDelete('+seq+')">답글 삭제</button>\
                                    </div>\
                                ';
                            }
                            modal_str += '\
                            </div>'; //end review-answer
                            }          
                            if(c_data.writer.status == 'A'){
                            modal_str += '\
                            <div class="answer-editor answer-editor_'+seq+' answer_'+c_data.review.status+'">\
                                <div class="review-answer-info">답글</div>\
                                <textarea id="answer-'+seq+'" placeholder="답글을 작성해 주세요.">'+nl2br(c_data.review.answer)+'</textarea>\
                                <div class="answer-editor-button" data-pnum="'+c_data.review.product_number+'" data-onum="'+c_data.review.order_number+'" data-seq="'+c_data.review.seq+'">';
                            if(c_data.review.status == 'N'){
                            modal_str += '\
                                    <button type="button" class="btn answer-submit-btn">답글 등록</button>';
                            }
                            else{
                            modal_str += '\
                                    <button type="button" class="btn answer-cancel-btn">취소</button>\
                                    <button type="button" class="btn answer-submit-btn">답글 수정</button>';
                            }
                            modal_str += '\
                                </div>\
                            </div>';
                            }
                modal_str += '\
                        </div>\
                    </div>'; //end view-review-box

                // $('.flat-modal .modal').modal('hide');
                var wrModal = $(this).showModalFlat('상품 후기', modal_str, true, false, '', '','','cl-s-product-review-write cl-s-product-review-view cl-modal cl-s-btn cover', false, '', function () {
                    $(document).off('click', '.review-edit');
                    $(document).on('click', '.review-edit', function (e) {
                        e.stopPropagation();
                        var $parent = $(this).parent(),
                            pnum = $parent.attr('data-pnum'),
                            onum = $parent.attr('data-onum'),
                            seq = $parent.attr('data-seq');

                        $('.modal-backdrop').fadeOut(200);
                        $('.modal').fadeOut(200);
                        setTimeout(function () {
                            $('.modal-backdrop').remove();
                            $('.modal').remove();
                            $('button[data-dismiss="modal"]').trigger('click');
                            $.shoppingmall.editReviewModal(sid, pnum, onum, seq);
                        }, 200);
                    });

                    $(document).off('click', '.review-delete');
                    $(document).off('click', '.answer-modify-btn');
                    $(document).off('click', '.answer-cancel-btn');
                    $(document).off('click', '.answer-submit-btn');

                    $(document).on('click', '.review-delete', function () {
                        if (confirm('정말로 삭제하시겠습니까?')) {
                            var $parent = $(this).parent(),
                                pnum = $parent.attr('data-pnum'),
                                onum = $parent.attr('data-onum'),
                                seq = $parent.attr('data-seq');

                            $.ajax({
                                url: '/_review_delete',
                                type: 'post',
                                data: {
                                    sid: sid,
                                    seq: seq,
                                },
                                success: function (data) {
                                    alert('삭제가 완료되었습니다.');
                                    location.reload();
                                }
                            });
                        }
                    });

                    $(document).on('click', '.answer-modify-btn', function(){
                        var $parent = $(this).parent(),
                            pnum = $parent.attr('data-pnum'),
                            onum = $parent.attr('data-onum'),
                            seq = $parent.attr('data-seq');

                        $('.answer-content_'+seq).hide();
                        $('.answer-editor_'+seq).show();
                    });

                    $(document).on('click', '.answer-cancel-btn', function(){
                        var $parent = $(this).parent(),
                            pnum = $parent.attr('data-pnum'),
                            onum = $parent.attr('data-onum'),
                            seq = $parent.attr('data-seq');

                        $('.answer-content_'+seq).show();
                        $('.answer-editor_'+seq).hide();
                    });

                    $(document).on('click', '.answer-submit-btn', function(){
                        var $parent = $(this).parent(),
                            pnum = $parent.attr('data-pnum'),
                            onum = $parent.attr('data-onum'),
                            seq = $parent.attr('data-seq');

                        $.ajax({
                            url: '/_review_msg_write',
                            type: 'post',
                            data: {
                                sid: sid,
                                seq: seq,
                                review_admin_msg: $('#answer-'+seq).val()
                            },
                            success: function (data) {
                                alert('답글이 등록되었습니다.');
                                location.reload();
                            }
                        });
                    });

                    $(document).on('click', '.answer-delete-btn', function(){
                        if (confirm('정말로 삭제하시겠습니까?')) {
                            var $parent = $(this).parent(),
                                pnum = $parent.attr('data-pnum'),
                                onum = $parent.attr('data-onum'),
                                seq = $parent.attr('data-seq');

                            $.ajax({
                                url: '/_review_msg_write',
                                type: 'post',
                                data: {
                                    sid: sid,
                                    seq: seq,
                                },
                                success: function (data) {
                                    alert('답글이 삭제되었습니다.');
                                    location.reload();
                                }
                            });
                        }
                    });
                });


            },'json');

        },
        editQnAModal: function(sid, pnum, seq, onum) {
            if(typeof property == 'undefined') {
                // alert('편집모드에서 지원하지 않습니다');
                var modal = $(this).showModalFlat('','편집모드에서 지원하지 않습니다',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                    $(document).on('keydown', function(e) {
                        if(e.keyCode == 27) modal.modal('hide');
                    });
                });
                return false;
            }
            if(typeof property.LOAD != 'undefined' && property.LOAD == 'RENDER') {
                alert('미리보기에서는 지원하지 않습니다');
                return false;
            }
            if(typeof seq == 'undefined' || seq == '') seq = -1;
            var mode = (seq == -1) ? 'new' : 'edit';
            var onum = (typeof onum == 'undefined' || onum == '')? '':onum;
            
            $.ajax({
                url: '/_qna_edit',
                type: 'POST',
                dataType: 'json',
                data: { sid:sid, pnum:pnum, seq:seq, mode:mode },
                async: false,
                cache: false,
                success: function(data) {
                    if (data.result == 'fail') {
                        location.href = '/_login';
                        return false;
                    }

                    if (data.error) {
                        $(this).showModalFlat('', data.error, true, false, '', 'close');
                        return false;
                    }

                    var status = data.um_status;
                    if(status == 'A') {
                        alert('관리자는 상품문의하기를 사용할 수 없습니다.');
                        return false;
                    }

                    var qna_files_str = qna_secret_str = '';

                    if(mode == 'edit') {
                        if(data['secret'] == 'Y') qna_secret_str = 'checked';

                        if(data['qna_image']) {
                            var image = data['qna_image'].split('||').filter(function(v){return v!==''});
                            var image_orig = data['qna_image_orig'].split('||').filter(function(v){return v!==''});
                            $.each(image, function(i,v) {
                                qna_files_str += '\
                                    <li id="qna-image-' + i + '">\
                                        <img src="' + v + '" class="img-responsive" />\
                                        <input type="hidden" name="qna_image[]" value="' + v + '"/>\
                                        <input type="hidden" name="qna_image_orig[]" value="' + image_orig[i] + '"/>\
                                        <div class="cl-s-files-img-close qna-img-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8" height="8"><path d="M4.71 4l3.15-3.15c0.2-0.2 0.2-0.51 0-0.71s-0.51-0.2-0.71 0L4 3.29 0.85 0.15c-0.2-0.2-0.51-0.2-0.71 0s-0.2 0.51 0 0.71L3.29 4 0.15 7.15c-0.2 0.2-0.2 0.51 0 0.71C0.24 7.95 0.37 8 0.5 8s0.26-0.05 0.35-0.15L4 4.71l3.15 3.15C7.24 7.95 7.37 8 7.5 8s0.26-0.05 0.35-0.15c0.2-0.2 0.2-0.51 0-0.71L4.71 4z"></path></svg></div>\
                                    </li>\
                                ';
                            });
                        }
                    }
                    data['email'] = (data['email'] !== null)? data['email']:'';
                    seq = (seq !== -1)? seq:'';
                    var qna_writer_str = (data['member']) ? '\
                        <input type="hidden" id="qna-name" class="cl-s-form-control" name="qna_name" value="' + data['name'] + '">\
                        <input type="hidden" id="qna-email" class="cl-s-form-control" name="qna_email" value="' + data['email'] + '">\
                        <input type="hidden" id="order-number" name="order_number" value="' + onum + '">\
                    ' : '\
                        <input type="hidden" id="order-number" name="order_number" value="' + onum + '">\
                            <ul class="qna-writer clearfix">\
                                <li>\
                                    <div class="cl-s-form-wrap">\
                                        <div class="cl-s-form-group">\
                                            <input type="text" class="cl-s-form-control" id="qna-name" name="qna_name" required="required" value="' + data['name'] + '">\
                                            <label for="input" class="cl-s-control-label">이름</label>\
                                        </div>\
                                    </div>\
                                </li>\
                                <li>\
                                    <div class="cl-s-form-wrap">\
                                        <div class="cl-s-form-group">\
                                            <input type="password" class="cl-s-form-control" id="qna-password" name="qna_password" required="required">\
                                            <label for="input" class="cl-s-control-label">비밀번호</label>\
                                        </div>\
                                    </div>\
                                </li>\
                                <li>\
                                    <div class="cl-s-form-wrap">\
                                        <div class="cl-s-form-group">\
                                            <input type="text" class="cl-s-form-control" id="qna-email" name="qna_email" data-type="email" required="required" value="' + data['email'] + '">\
                                            <label for="input" class="cl-s-control-label">이메일 주소</label>\
                                        </div>\
                                    </div>\
                                </li>\
                            </ul>\
                        ',
                        qna_privacy_str = (data['member']) ? '' : '\
                            <hr class="line"/>\
                            <div class="qna-privacy">\
                                <div class="cl-s-checkbox">\
                                    <label>\
                                        <input type="checkbox" id="qna-btn-privacy" name="qna_btn_privacy">\
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z"/></svg>\
                                        <svg class="active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/></svg>\
                                        <a href="#qna-privacy-textarea" class="qna-view-privacy" data-toggle="collapse">개인정보 수집 및 이용</a>에 동의합니다.\
                                    </label>\
                                </div>\
                                <div class="qna-privacy-textarea collapse" name="privacy_textarea" id="qna-privacy-textarea">\
                                    ※ 비회원 서비스문의를 위한 개인정보 수집·이용 동의(필수)<br>\
                                    서비스 이용자의 개인정보를 수집하는 목적은 다음과 같습니다.\
                                    <table>\
                                        <colgroup>\
                                            <col width="25%">\
                                            <col width="45%">\
                                            <col width="30%">\
                                        </colgroup>\
                                        <thead>\
                                            <tr>\
                                                <th>수집목적</th>\
                                                <th>수집항목</th>\
                                                <th>이용기간</th>\
                                            </tr>\
                                        </thead>\
                                        <tbody>\
                                            <tr>\
                                                <td>문의 응대 및 서비스 개선</td>\
                                                <td>(필수) 이름, 이메일, 문의내용</td>\
                                                <td>문의 종료일로 5년</td>\
                                            </tr>\
                                        </tbody>\
                                    </table>\
                                    <br>\
                                    - 동의를 거부할 권리가 있으나, 동의거부에 따른 서비스 이용에 제한이 있을 수 있습니다.<br>\
                                    - 회사는 계약 및 서비스 이행을 위해 개인정보 처리업무를 위탁할 수 있으며, 개인정보처리방침에 그 내용을 고지합니다.<br>\
                                </div>\
                            </div>\
                        ',
                        modal_str = '\
                        <div class="qna-body">\
                            <h5 class="product-title">' + data['ptitle'] + '</h5>\
                            ' + qna_writer_str + '\
                            <ul class="qna-content">\
                                <li>\
                                    <div class="cl-s-form-wrap">\
                                        <div class="cl-s-form-group">\
                                            <input type="text" class="cl-s-form-control" id="qna-title" name="title" required="required" maxlength="100" value="' + data['title'] + '">\
                                            <label for="input" class="cl-s-control-label">제목</label>\
                                        </div>\
                                    </div>\
                                </li>\
                                <li>\
                                    <div class="cl-s-form-wrap">\
                                        <div class="cl-s-form-group input-label-hide">\
                                            <textarea type="text" class="cl-s-form-control" id="qna-str" name="qna" maxlength="500" required="required">' + data['qna'] + '</textarea>\
                                            <label for="input" class="cl-s-control-label">자세한 내용을 적어주세요. (500자 이내)</label>\
                                        </div>\
                                    </div>\
                                </li>\
                                <li class="last clearfix">\
                                    <div class="qna-secret">\
                                        <div class="secret cl-s-checkbox">\
                                            <label>\
                                                <input type="checkbox" id="secret-checkbox" name="secret" value="Y" ' + qna_secret_str + '>\
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z"/></svg>\
                                                <svg class="active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/></svg>\
                                                비밀글\
                                            </label>\
                                        </div>\
                                    </div>\
                                    <div class="cl-s-files qna-files f-left">\
                                        <input id="qna-file" type="file" name="files[]" accept="image/jpeg,image/gif,image/png" multiple data-sid="' + sid + '" data-uid=\"' + data['um_id'] + '\" data-seq=\"'+seq+'\">\
                                        <label class="cl-s-file-update qna-file-update clearfix"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><path d="M0 0v20h20V0H0zM19 1v11.3l-3-3 -4 4 -6-6 -5 5V1H19zM1 19v-5.3l5-5 6 6 4-4 3 3V19H1z"/><circle cx="14.5" cy="5.5" r="1.5"/></svg> <span>사진</span></label>\
                                        <ul class="cl-s-files-list qna-files-list clearfix">\
                                            ' + qna_files_str + '\
                                        </ul>\
                                    </div>\
                                </li>\
                            </ul>\
                            ' + qna_privacy_str + '\
                        </div>\
                    ';


                    $('.flat-modal .modal').modal('hide');
                    var eqnaModal = $(this).showModalFlat('문의 작성', modal_str,true,true,function () {

                        var error_cnt = 0,
                            error_str = '',
                            input_data = new Object();

                        $('.cl-s-form-control').each(function() {

                            if($(this).val().trim().length == 0) {
                                $(this).closest('.cl-s-form-wrap').addClass('empty');
                                error_str = '필수항목을 입력해주세요.';
                                error_cnt++;
                                if(error_cnt == 1) $(this).focus();
                            } else {
                                $(this).closest('.cl-s-form-wrap').removeClass('empty');
                                var key = $(this).attr('name'),
                                    val = $(this).val().trim(),
                                    regexp = {
                                        email : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
                                    },
                                    passEmoji = ($.inArray(key,['title','qna']) > -1) ? true : false;

                                if(!passEmoji && checkEmojis(val)) error_str = $.lang[LANG]['config.unable.emoji'];
                                else if(typeof regexp[key] != "undefined" && !regexp[key].test(val)) error_str = $.lang[LANG]['siteum.regexp.check.'+key];

                                if(error_str.length > 0) {
                                    error_cnt ++;
                                    if(error_cnt == 1) $(this).focus();

                                    $(this).closest('.cl-s-form-wrap').addClass('error');
                                    if($(this).closest('.cl-s-form-group').find('.cl-s-control-label.error').length > 0) {
                                        $(this).closest('.cl-s-form-group').find('.cl-s-control-label.error').html(error_str);
                                    } else {
                                        $(this).closest('.cl-s-form-group input').after('<label class="cl-s-control-label error">' + error_str + '</label>');
                                    }
                                } else {
                                    $(this).closest('.cl-s-form-wrap').removeClass('error');
                                    $(this).closest('.cl-s-form-group').find('.cl-s-control-label.error').remove();
                                    input_data[key] = $(this).val().trim();
                                }
                            }

                        });


                        if(error_cnt > 0) {
                            alert(error_str);
                            return false;
                        }
                        
                        if(status != 'U') {
                            if(!$('#qna-btn-privacy').prop('checked')) {
                                $("#qna-btn-privacy").addClass('error');
                                alert('개인정보 수집 및 이용 동의에 체크해 주세요.');
                                return false;
                            }
                        }

                        if($('.qna-files-list').children('li').length > 0) {
                            var qna_files = '';
                            var qna_files_orig = '';
                            $('.qna-files-list').children('li').each(function() {
                                if(qna_files != '')  qna_files +='||';
                                qna_files += $(this).find('input[name="qna_image[]"]').val();
                                if(qna_files_orig != '')  qna_files_orig +='||';
                                qna_files_orig += $(this).find('input[name="qna_image_orig[]"]').val();
                            });
                        }
                        input_data['qna_image'] = (qna_files) ? qna_files : '';
                        input_data['qna_image_orig'] = (qna_files_orig) ? qna_files_orig : '';
                        input_data['secret'] = ($('#secret-checkbox').prop('checked')) ? 'Y' : '';

                        var qna_status = { new:'S', edit:'E' },
                            page_type = (property.VIEW) ? 'product' : '';
                            
                        if($('.cl-s-mypage').length > 0) page_type = 'mypage';
                        else if($('.cl-s-nonmember-payment').length > 0) page_type = 'no_member';

                        input_data['sid'] = sid;
                        input_data['page_mode'] = page_type;
                        input_data['qna_seq'] = (seq > 0) ? seq : '';
                        input_data['qna_type'] = 'P';
                        input_data['product_number'] = pnum;
                        input_data['order_number'] = onum;
                        input_data['status'] = qna_status[mode];
                        input_data['mb_status'] = status;
                        input_data['qna_page'] = (property.VIEW) ? property.PAGE : '';
                        
                        $('.ok-button-dialog').prop('disabled', true).addClass('spinner');
                        $.ajax({
                            url: '/_qna_update',
                            type: 'post',
                            data: input_data,
                            async: true,
                            cache: false,
                            success: function(data) {
                                if(typeof data.error != 'undefined') {
                                    alert(data.error);
                                    return false;
                                }
                                location.reload();
                            },
                            error: function(request,status,error) {
                                console.log('code:'+request.status+'\n'+'message:'+request.responseText+'\n'+'error:'+error);
                                return false;
                            }

                        });

                    },'close','등록하기','cl-s-product-qna-edit cl-modal cl-s-btn cover', true, '', function() {
                        $('.cl-s-product-qna-edit .cl-s-form-group').on('click',function(e) {
                            if($(e.target).hasClass('cl-s-form-group')) {
                                $(e.target).find('.cl-s-form-control:not([type=hidden])').focus();
                            }
                        });

                        $('.cl-s-product-qna-edit .cl-s-form-control').on({
                            focus: function(e) {
                                $(this).closest('.cl-s-form-wrap').addClass('active');
                            },
                            blur: function(e) {
                                var type = $(this).attr('data-type'),
                                    regexp = {
                                        email : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
                                    },
                                    checkRegexp = (typeof type != 'undefined' && typeof regexp[type] != 'undefined') ? true : false,
                                    passEmoji = ($.inArray($(this).attr('name'),['title','qna']) > -1) ? true : false,
                                    error_str = '',
                                    val = $(this).val().trim();

                                $(this).closest('.cl-s-form-wrap').removeClass('active');
                                if(val.length == 0) {
                                    $(this).closest('.cl-s-form-wrap').removeClass('error').addClass('empty');
                                    $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                                    return false;
                                } else if(!passEmoji && checkEmojis(val)) error_str = $.lang[LANG]['config.unable.emoji'];
                                else if(checkRegexp && !regexp[type].test(val)) error_str = $.lang[LANG]['siteum.regexp.check.'+type];

                                $(this).closest('.cl-s-form-wrap').removeClass('empty');
                                if(error_str.length > 0) {
                                    $(this).closest('.cl-s-form-wrap').addClass('error');
                                    if($(this).parent().find('.cl-s-control-label.error').length > 0) {
                                        $(this).parent().find('.cl-s-control-label.error').html(error_str);
                                    } else {
                                        $(this).after('<label for="input" class="cl-s-control-label error">'+error_str+'</label>');
                                    }
                                    return false;
                                } else {
                                    $(this).closest('.cl-s-form-wrap').removeClass('error');
                                    $(this).closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
                                }

                            }
                        });

                        $('.cl-s-product-qna-edit #qna-btn-privacy').on('change', function(e) {
                            if($(this).prop('checked')) $(this).removeClass('error');
                            else $(this).addClass('error');
                        });

                        $(document).on('click', '.cl-s-product-qna-edit .qna-img-close', {mode: 'qna'}, deleteReviewQnaImg);

                        $('.cl-s-product-qna-edit .qna-file-update').on('click', function () {
                            $("#qna-file").click();
                        });

                        $('.cl-s-product-qna-edit #qna-file').on('click', {mode: 'qna'}, uploadReviewQnaImg);

                    }, function(){
                        if(qna_files_str.length === 0){
                            if($('.cl-s-product-qna-edit .qna-img-close').length > 0){
                                $.each($('.cl-s-product-qna-edit .qna-img-close'), function(){
                                    $(this).trigger('click');
                                });
                            }
                        }
                    });

                },
                error: function(request,status,error) {
                    console.log('code:'+request.status+'\n'+'message:'+request.responseText+'\n'+'error:'+error);
                    return false;
                }
            });

        },
        orderReceiptModal: function(sid, ogroup, refund) { 

            $.post('/_check_receipt', { sid:sid, order_group:ogroup, mode:'default', refund : refund }, function(data) {

                if(typeof data.error != 'undefined' && data.error) {
                    $(this).showModalFlat('ERROR', data.error, true, false, '', 'ok');
                    return false;
                }

                var d_price = (typeof data.r.delivery_price != 'undefined' && data.r.delivery_price) ? data.r.delivery_price : 0,
                    d_price_str = number_format(d_price) + ' 원',
                    o_list_cnt = data.r.list.length,
                    o_org_total = 0,
                    o_total = 0;

                var orm_html = '\
                    <div class="receipt-wrap">\
                        <table>\
                            <colgroup>\
                                <col width="*" />\
                                <col width="120px" />\
                                <col width="100px" />\
                            </colgroup>\
                            \
                            <thead>\
                                <tr>\
                                    <th>상품정보</th>\
                                    <th>상품가격</th>\
                                    <th>배송비<span class="visible-xs"> ' + d_price_str + '</span></th>\
                                </tr>\
                            </thead>\
                            <tbody>\
                ';

                var refund_count = 0, list_count = 0;
                $.each(data.r.list, function(i, val) {
                    if(refund) {
                        if(val['d_status'] == 'CY' || val['d_status'] == 'RY') ;
                        else {
                            return true;
                        }
                    }
                    // console.log(val);
                    var option_name    = (!$.isEmptyObject(val['option_list']) && val['option_list']['option_name']) ? val['option_list']['option_name'] : '',
                        option_type = (val['option_list']['option_type']=='A') ? '추가옵션' : '옵션',
                        option_str     = '';
                    if(val['option_list']['option_type']=='A' && val['option_list']['option_group']) {
                        option_type = option_type + ' : ' + val['option_list']['option_group'];
                    }
                    if(option_name && option_name!='noneOption') {
                        option_str     = (val['option_list']['option_text_str']) ? '<span>'+option_type+' : ' + option_name + '/' + val['option_list']['option_text_str'] + '</span>' : '<span>'+option_type+' : ' + option_name + '</span>';
                    } else {
                        option_str     = (val['option_list']['option_text_str']) ? '<span>'+option_type+' : ' + val['option_list']['option_text_str'] + '</span>' : '';
                    }
                    var checkSale = (typeof val['option_list']['sale_price'] != "undefined" && val['option_list']['sale_price']) ? true : false,
                        oi_org_price = (checkSale) ? val['option_list']['sale_price'] : val['option_list']['price'],
                        oi_price     = val['option_list']['price'],
                        oi_quantity  = val['option_list']['quantity'],
                        oi_sum       = oi_price * oi_quantity,
                        rowspan = 0;

                    if(refund) {
                        rowspan = data.r.refund;
                    } else {
                        rowspan = o_list_cnt;
                    }
                    o_org_total += (oi_org_price * oi_quantity);
                    o_total += oi_sum;

                    orm_html += '\
                                <tr class="or-grid">\
                                    <td class="mp-info">\
                                        <div class="cl-s-product-jumbotron clearfix">\
                                            <div class="cl-s-product-thumb">\
                                                <img src="' + val["pimg"] + '" alt="' + val["pname"] + '" class="img-responsive"/>\
                                            </div>\
                                            <div class="cl-s-product-info">\
                                                <h5 class="cl-s-product-title">' + val["pname"] + '</h5>\
                                                <div class="option-str">\
                                                    <div>\
                                                        <span class="visible-xs option-price">' + number_format(oi_sum) + ' 원</span>\
                                                        ' + option_str + '\
                                                        <span>' + oi_quantity + '개</span>\
                                                    </div>';
                                        if(val["etc_info"]) {
                                            orm_html += '\
                                                    <div>선택일자 : '+val["etc_info"]+'</div>';
                                        }
                                        orm_html += '\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </td>\
                                    <td>' + number_format(oi_sum) + ' 원</td>\
                    ';

                    if(list_count == 0) orm_html += '<td rowspan="' + ((rowspan) ? rowspan : '') + '">' + d_price_str + '</td>';
                    list_count++;

                    orm_html += '\
                                </tr>\
                    ';

                });

                orm_html += '\
                            </tbody> \
                        </table>\
                        <p class="description">현금영수증은 발급 완료된 주문건에 한해 조회 및 출력이 가능하며, 구매확정일 기준으로 발급됩니다.<br>신용카드 매출 전표는 결제완료 시 자동 발급되며, 결제완료 후 확인 및 출력이 가능합니다.\
                ';

                if(data.r.class_cd == 'PAKM') {
                    orm_html += '\
                    <br>카카오페이 결제 건은 카카오페이 APP에서 전표발행이 제공됩니다.\
                    ';
                }

                orm_html += '</p>\
                ';


                orm_html += '\
                        <div class="receipt-btn-box">\
                ';
                if(data.r.pay_method != '무통장 입금' && data.r.class_cd != 'PAKM') {
                    orm_html += '<span class="cl-s-btn cl-s-btn-12 cl-s-btn-primary btn-card-slip">카드전표</span>';
                }
                orm_html += '\
                            <span class="cl-s-btn cl-s-btn-12 cl-s-btn-primary btn-receipt-details ' + ((refund == true) ? 'refund' : '') + '">' + ((refund == true) ? '환불영수증' : '구매영수증') + '</span>\
                        </div>\
                        <span class="cl-s-btn cl-s-btn-12 cl-s-btn-default btn-order-receipt-close">닫기</span>\
                    </div">\
                ';
                var title = (refund) ? '환불 영수증 발급내역' : '영수증 발급내역';
                var orModal = $(this).showModalFlat(title, orm_html, true, false, '', 'close', '', 'cl-s-receipt cl-modal cover', false, '', function() {
                    $('.btn-order-receipt-close').on('click', function() {
                        orModal.modal('hide');
                    });

                    $('.btn-card-slip').on('click', function() {
                        window.open('https://www.kcp.co.kr/center.paysearch.do', '', 'width=1000,height=500,scrollbars=yes');
                    });

                    $('.btn-receipt-details').on('click', function() {
                        var refund = ($(this).hasClass('refund')) ? true : false;
                        $.shoppingmall.orderReceiptDetailModal(sid, ogroup, refund);
                    });

                });

            }, 'json');

        },
        orderReceiptDetailModal: function(sid, ogroup, refund) {

            $.post('/_check_receipt', { sid:sid, order_group:ogroup, mode:'detail', refund : refund }, function(data) {

                if(typeof data.error != 'undefined' && data.error) {
                    $(this).showModalFlat('ERROR', data.error, true, false, '', 'ok');
                    return false;
                }
                var ordm_html = '\
                    <div class="receipt-wrap">\
                        <table>\
                            <colgroup>\
                                <col width="25%" />\
                                <col width="75%" />\
                            </colgroup>\
                            \
                            <tbody id="receipt-list">\
                                <tr>\
                                    <td><span>주문번호</span><br>ORDER NO.</td>\
                                    <td>' + ogroup + '</td>\
                                </tr>';
                if(refund) {
                    ordm_html+= '\
                                <tr>\
                                    <td><span>환불일자</span><br>REFUND DATE</td>\
                                    <td>' + data.pay_info.reg_date + '</td>\
                                </tr>\
                    ';
                } else {
                    ordm_html+= '\
                                <tr>\
                                    <td><span>주문날짜</span><br>TRANS DATE</td>\
                                    <td>' + data.pay_info.reg_date + '</td>\
                                </tr>\
                    ';
                }
                ordm_html+= '\
                                <tr>\
                                    <td><span>상품명</span><br>DESCRIPTION</td>\
                                    <td>' + data.pay_info.product_name + '</td>\
                                </tr>\
                                <tr>\
                                    <td><span>합계</span><br>TOTAL</td>\
                                    <td><span>'+number_format(data.pay_info.payment)+'</span> 원</td>\
                                </tr>\
                                <tr>\
                                    <td><span>회사명</span><br>COMPANY NAME</td>\
                                    <td>' + data.setting.b_name + '</td>\
                                </tr>\
                                <tr>\
                                    <td><span>대표자</span><br>MASTER</td>\
                                    <td>' + data.setting.b_rep + '</td>\
                                </tr>\
                                <tr>\
                                    <td><span>사업자등록번호</span><br>BUSINESS NO.</td>\
                                    <td>' + data.setting.b_number + '</td>\
                                </tr>\
                                <tr>\
                                    <td><span>회사주소</span><br>ADDRESS</td>\
                                    <td>' + data.setting.b_addr + '</td>\
                                </tr>\
                                <tr>\
                                    <td><span>문의전화</span><br>TEL</td>\
                                    <td>' + data.setting.b_tel + '</td>\
                                </tr>\
                                <tr>\
                                    <td><span>서명</span><br>SIGNATUE</td>\
                                    <td>' + data.pay_info.buyr_name + '</td>\
                                </tr>\
                            </tbody>\
                        </table>\
                        <div class="additional-box">구매 영수증은 세금계산서 등 증빙서류로 활용할 수 없습니다.</div>\
                    </div>\
                ';
                var title = (refund) ? '환불영수증' : '구매영수증';
                var ordModal = $(this).showModalFlat(title, ordm_html, true, true, function() {

                    $.shoppingmall.printModal(".cl-s-receipt-view");

                }, 'close', '출력', 'cl-s-receipt-view cl-modal cover', false);


            }, 'json');
        },
        printModal: function(modalEL) {
            var popupWindow = window.open("", "printPopup", "_blank" );

            var style = $('#cl_shopping').attr('href');

            popupWindow.document.write('<head>');
            popupWindow.document.write($('head').html());
            popupWindow.document.write('<link rel="stylesheet" href="'+style+'">');
            popupWindow.document.write('<style>');
            popupWindow.document.write($('#el_0css').html());
            popupWindow.document.write('.close-button-dialog, .ok-button-dialog {display:none !important;}');
            popupWindow.document.write('.cl-mobile-btn, button.close {display:none !important;}');
            popupWindow.document.write('.modal-dialog {width:700px !important;max-width:700px !important;}');
            popupWindow.document.write('</style>');
            popupWindow.document.write('</head>');

            var $table = $(modalEL);
     
            popupWindow.document.write('<body>');
            popupWindow.document.write('<div style="display:block;" class="flat-modal cl-flat-modal">');
            popupWindow.document.write($table.parent().parent().html());
            popupWindow.document.write('</div></body>');

            popupWindow.document.close();

            setTimeout(function () {
                popupWindow.print();
            }, 1500);
        },
        orderDownloadModal: function(sid, pnum, onum) {

            $.post('/_check_download', { sid:sid, pnum:pnum, onum:onum }, function(data) {
                
                if(typeof data.error != "undefined" && data.error) {
                    $(this).showModalFlat('ERROR', data.error, true, false, '', 'close');
                    return false;
                }

                var cnacelBtn = $('.mp-table[data-onum='+ onum +']').find('button[data-fn="orderCancel"]');
                cnacelBtn.remove();

                var download_href = data.r.url,
                    download_name = data.r.name,
                    download_real_name = data.r.real_name,
                    download_count = data.r.count;

                var download_url = new getLocation(download_href),
                    file_name = encodeURIComponent(download_name),
                    file_real_name = encodeURIComponent(download_real_name),
                    go = '/down?n=' + file_real_name + '&s=' + (download_url.pathname).replace('/cr-resource/forum/','').replace('/','&f='),
                    temp_el = '<a href="'+go+'" target="_blank" download id="cl-download-a"></a>';

                $('body').append(temp_el);
                document.querySelector('#cl-download-a').click();
                $('#cl-download-a').remove();
                
                if(download_count > 0) {
                    $('.mp-table[data-onum=' + onum + ']').find('.download-str span').text(download_count);
                } else {
                    $('.mp-table[data-onum=' + onum + ']').find('.download-str').html('<div class="cl-red">다운로드 기한이 지났거나<br>다운로드 횟수를 모두 사용하였습니다.</div>');
                    $('.mp-table[data-onum=' + onum + ']').find('button[data-fn="orderDownload"]').addClass('disabled');
                }

            }, 'json');
        }
    }

    $.products = {
        init : function() {
            $.category.init();
            var isMainImageClick = false, idx = -1, replace = false;
            $(document).on('click', '.prod-modal', function(e) {
                $('.category-lists').slideUp(200, function() {
                    $('.category-wrap').removeClass('open');    
                });
                $('.option-price-status-select').slideUp(200, function() {
                    $('.option-price-status-str').removeClass('open');    
                });
            });

            $(document).on('click','.form-label.textarea', function() { $('#prod-desc').focus(); });

            $(document).on('change','.switch-product', function() {
                if($(this).is(':checked')) {
                    var check = $('.cl_icon_check02_on').parent().attr('for');
                    var a = 0;

                    if ($('#none-option-file').length > 0) {
                        var fileBoxCnt = $('.file-box-list').length;
                        $('.file-box-list').each(function () {
                            var downloadCnt = $(this).find('.file-name').length;
                            if (fileBoxCnt > 1) {
                                if (a == 0) a++;
                                else {
                                    if (check == 'download-product' && downloadCnt == 0) {
                                        alert('다운로드 상품일 경우 파일이 1개 이상 등록되어 있어야 합니다.');
                                        $('.switch-product').prop('checked','').parents('.form-wrap').addClass('disabled');
                                        a++;
                                        return false;
                                    }
                                }
                            } else {
                                if (check == 'download-product' && downloadCnt == 0) {
                                    alert('다운로드 상품일 경우 파일이 1개 이상 등록되어 있어야 합니다.');
                                    $('.switch-product').prop('checked','').parents('.form-wrap').addClass('disabled');
                                    a += 2;
                                    return false;
                                }
                            }
                        });
                        if (a <= 1) {
                            $('.switch-product').prop('checked','checked').parents('.form-wrap').removeClass('disabled');
                        }
                    } else {
                        $('.switch-product').prop('checked','checked').parents('.form-wrap').removeClass('disabled');
                    }
                } else {
                    $(this).parents('.form-wrap').addClass('disabled');                    
                }
            });
            $(document).on('change','.switch-quantity', function() { //재고관리 on
                switchQuantity();
            });
            $(document).on('click','.switch-category', function() {
                if($(this).is(':checked')) {
                    $(this).parents('.form-wrap').removeClass('disabled');
                    $(this).parents('.form-wrap').find('.category-text').removeClass('hide');
                } else {
                    $(this).parents('.form-wrap').addClass('disabled');
                    $(this).parents('.form-wrap').find('.category-text').addClass('hide');
                    $('.category-lists').slideUp(200, function() {
                        $('.category-wrap').removeClass('open');    
                    });                    
                }
            });

            $(document).on('change','.switch-text-option', function() {
                if($(this).is(':checked')) {
                    $(this).parents('.form-wrap').removeClass('disabled');
                    $(this).parents('.form-wrap').find('#text-option-name').removeClass('hide');
                } else {
                    $(this).parents('.form-wrap').addClass('disabled');
                    $(this).parents('.form-wrap').find('#text-option-name').addClass('hide');
                }
            });

            $(document).on('click','.switch-prod-info', function() {
                if($(this).is(':checked')) {
                    $(this).parents('.form-wrap').removeClass('disabled');
                    $(this).parents('.form-wrap').find('.info-selected').removeClass('hide');
                } else {
                    $(this).parents('.form-wrap').addClass('disabled');
                    $(this).parents('.form-wrap').find('.info-selected').addClass('hide');

                }
            });
            
            $(document).on('click','#prod-sale-check', function() {
                if($(this).is(':checked')) {
                    var prod_price = ($('#prod-price').val()) ? $('#prod-price').val() : 0;
                    $('#prod-sale').addClass('strike');
                    $('#prod-sale').text(prod_price);
                    $('#prod-sale').show();
                    $('#prod-price').val('').attr('placeholder','할인 가격을 입력하세요').focus();
                    $('#prod-price').addClass('sale-on');
                    $('#check-sale').html('<path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/>');
                    $('#check-sale').css('fill', '#4789e7');
                } else {
                    var prod_price = ($('#prod-sale').text()) ? $('#prod-sale').text() : '';
                    $('#prod-price').val(prod_price);
                    $('#prod-price').removeClass('sale-on').attr('placeholder','가격을 입력하세요').focus();
                    $('#prod-sale').removeClass('strike');
                    $('#prod-sale').hide();
                    $('#check-sale').html('<path d="M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z"/>');
                    $('#check-sale').css('fill', '#8c8c8c');
                }
            });

            $(document).on('focusout', '#prod-price', function () {
                var price = $(this).val();
                price = removeCommas(price);
                price = price * 1;

                var nPrice = Number(price),
                    submit = true;
                // 옵션 가격 검색
                $.each($('.prod-option-price'), function(i,v) {
                    var oPrice = $(this).attr('data-option-price');
                    if(i > 0) {
                        if(nPrice + Number(oPrice) < 0) {
                            $(this).click();
                            $(this).parents('li').addClass('err');
                            submit = false;
                        }
                    }
                });
                if(submit) {
                    price = addCommas(price);
                    $(this).val(price);
                } else {
                    alert('옵션 가격이 올바르지 않습니다.');
                    $(this).val(price);
                }
            });

            $(document).on('click','.prod-item-image-add,.prod-item-image',function(e) {
                idx = -1;
                isMainImageClick = ($(this).hasClass('prod-item-image')) ? true : false;
                replace = (isMainImageClick && $('.prod-item-image .preview-img').length) ? true : false;
                if($(this).hasClass('.prod-item-image-add')) {
                    $('img').removeClass('replace');
                }
                if($(this).hasClass('.prod-item-image')) $(this).find('.preview-img').addClass('replace');
                $.resource.open();
            });

            $(document).on('click','.prod-item-thumb img:not(.guide-img)',function(e) {
                isMainImageClick = false;
                idx = $(this).parent().index();
                replace = true;
                $(this).addClass('replace');
                $(this).attr('data-idx',idx);
                $.resource.open();
            });

            $(document).on('hover', '.prod-item-thumb li',function(e) {
                e.stopPropagation();
                $('.img-delete').hide();
                $(this).find('.img-delete').show();
            });

            $(document).on('click','.img-delete',function(e) {
                $(this).parent().remove();
                if($('.prod-item-thumb li').length < 11) $('.prod-item-image-add').removeClass('hide');
                if($(this).index() == 1) {
                    var src = $('.prod-item-thumb li:not(.prod-item-image-add):eq(0)').find('img:not(.guide-img)').attr('src');
                    if(typeof src != 'undefined') {
                        src = src.replace('/250/','/800/');
                        $('.prod-item-image .preview-img').css('background-image', 'url("'+ src +'")');
                    } else {
                        $('.prod-item-image').removeClass('active').find('.preview-img').remove();
                    }
                }
            });

            $(document).on('click','.resource-useit',function(e) {
                if($('.prod-modal').length == 0) return;
                var imgs = $.resource.selected(),
                    empty = ($('.prod-item-image').find('.preview-img').length) ? false : true;

                var url = (typeof RESOURCE == 'undefined') ? property.RESOURCE : RESOURCE,
                    site = (typeof SID == 'undefined') ? property.SID : SID,
                    folder = '', f = '';

                var thumbs = $('.prod-item-thumb li:not(.prod-item-image-add)').length,
                    remain = 10-thumbs;

                replace = ($('.replace').length) ? true : false;
                if(imgs.length > remain && !replace) imgs.length = remain;
                if(replace) imgs.length = 1;
                if(replace && imgs.length > 1) {
                    $(this).showModalFlat('INFORMATION', $.lang[LANG]['editor.resource.choose.count.1'], true, false, '', 'ok');
                    return false;
                }
                if($('.fr-selected-files li').length) {
                    $.processON('Image upload to storage...');
                    var frUpload = frStorageUpload(imgs.join("|"),800);

                    frUpload.then(function(data) {
                        $.each(data.u, function(i,v) {
                            if(empty && i == 0) {
                                folder = 800;
                                f = v.path + folder + '/' + v.file;
                                var thumb = v.path + '250/' + v.file,
                                    img_src = (v.magic) ? v.magic : v.file,
                                    src_s800 = getServeImage(img_src,"800",v.path),
                                    src_s250 = getServeImage(img_src,"250",v.path);

                                $('.prod-item-image').append('<div class="preview-img" style="background-image: url(' + src_s800 + ')">').addClass('active');
                                $('.prod-item-thumb .prod-item-image-add').before('<li><img src="' + src_s250 + '"><span class="img-delete"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>');
                            } else {
                                if(isMainImageClick && i == 0) {
                                    folder = 800;
                                    f = v.path + folder + '/' + v.file;
                                    var thumb = v.path + '250/' + v.file,
                                        img_src = (v.magic) ? v.magic : v.file,
                                        src_s800 = getServeImage(img_src,"800",v.path),
                                        src_s250 = getServeImage(img_src,"250",v.path);

                                    $('.prod-item-image').addClass('active').find('.preview-img').css('background-image','url("'+ src_s800 +'")');
                                    if($('.prod-item-thumb .prod-item-image-add').before().hasClass('.prod-item-image-add')) {
                                        $('.prod-item-thumb .prod-item-image-add').before('<li><img src="' + src_s250 + '"><span class="img-delete"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>');
                                    } else {
                                        $('.prod-item-thumb li:eq(0) img').replaceWith('<img src="' + src_s250 + '">');   
                                    }
                                } else {
                                    folder = 250;
                                    f = v.path + folder + '/' + v.file;
                                    var thumb = v.path + '250/' + v.file,
                                        img_src = (v.magic) ? v.magic : v.file,
                                        src_s800 = getServeImage(img_src,"800",v.path),
                                        src_s250 = getServeImage(img_src,"250",v.path);

                                    if(idx > -1) {
                                        if(idx == 0) $('.prod-item-image .preview-img').css('background-image', 'url("' + src_s800 + '")');
                                        $('.prod-item-thumb li:eq(' + idx +') img').replaceWith('<img src="' + src_s250 + '">');
                                    } else {
                                        $('.prod-item-thumb .prod-item-image-add').before('<li><img src="' + src_s250 + '"><span class="img-delete"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>');
                                    }
                                }
                            }
                            if(imgs.length) $('.prod-item-image').removeClass('empty');
                            if($('.prod-item-thumb li').length > 10) $('.prod-item-image-add').addClass('hide');
                        });
                        $('#el-fileupload').modal('hide');
                    });
                } else {
                    $.each(imgs, function(i,v) {
                        if(empty && i == 0) {
                            p = url + '/' + site + '/';
                            var thumb = p + '250/' + v,
                                src_s800 = getServeImage(v,"800",p),
                                src_s250 = getServeImage(v,"250",p);
                            $('.prod-item-image').append('<div class="preview-img" style="background-image: url(' + src_s800 + ');">').addClass('active');
                            $('.prod-item-thumb .prod-item-image-add').before('<li><img src="' +  src_s250 + '"><span class="img-delete"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>');
                        } else {
                            if(isMainImageClick && i == 0) {
                                p = url + '/' + site + '/';
                                var thumb = p + '250/' + v,
                                    src_s800 = getServeImage(v,"800",p),
                                    src_s250 = getServeImage(v,"250",p);
                                $('.prod-item-image').addClass('active').find('.preview-img').css('background-image','url("'+ src_s800 +'")');
                                $('.prod-item-thumb li:eq(0) img').replaceWith('<img src="' + src_s250 + '">');
                            } else {
                                p = url + '/' + site + '/';
                                var thumb = p + '250/' + v,
                                    src_s800 = getServeImage(v,"800",p),
                                    src_s250 = getServeImage(v,"250",p);
                                if(idx > -1) {
                                    if(idx == 0) $('.prod-item-image .preview-img').css('background-image', 'url("' + src_s800 + '")');
                                    $('.prod-item-thumb li:eq(' + idx +') img').replaceWith('<img src="' + src_s250 + '">');
                                } else {
                                    $('.prod-item-thumb .prod-item-image-add').before('<li><img src="' + src_s250 + '"><span class="img-delete"><i class="fa fa-times-circle" aria-hidden="true"></i></span></li>');
                                }
                            }
                        }
                    });
                }
                if(imgs.length) $('.prod-item-image').removeClass('empty');
                if($('.prod-item-thumb li').length > 10) $('.prod-item-image-add').addClass('hide');
                $('#el-fileupload').modal('hide');
            });
            
            $(document).on('keyup', '.option-price-number', function(e) {
                var key = e.keyCode || e.which;
                    txt = $(this).val();
                var match;

                if($(this).closest('.prod-option').attr('data-option_mode') == 'additional') {
                    match = txt.match(/[0-9]+/g);
                } else {
                    match = txt.match(/[0-9,\-\+]+/g);
                }
                
                $(this).val(match);
                var price = removeCommas($('#prod-price').val()),
                    input = (match == null) ? 0 : removeCommas(match[0]);

                if(parseInt(price) + parseInt(input) < 0) {
                    alert('실 결제 금액이 0원 보다 작습니다');
                    $(this).val('0').focus();
                }
            });
        },
        add : function(id,gpos,gcate) {
            var site = (typeof SID == 'undefined') ? property.SID : SID,
                page = (typeof PAGE == 'undefined') ? property.PAGE : PAGE,
                pid = (typeof selectID == 'undefined') ? null : selectID;
            if(typeof $.gallery.block_id != 'undefined' && $.gallery.block_id) pid = $.gallery.block_id;
            // 상품 옵션
            product_options = {};
            fileUpdateCnt = 0;
            //     pid = $('.gallery-add-items').attr('data-pid');
            // if(typeof pid == 'undefined' || pid == null) pid = $('.config-image-edit').attr('data-pid');
            // if(typeof pid == 'undefined' || pid == null) { pid = (typeof PARENT == 'undefined') ? property.PARENT.pid : PARENT.pid }
            // if(typeof pid == 'undefined' || pid == null) pid = (typeof selectID == 'string') ? selectID : null;
            // console.log(site,page,pid);

            if(pid.toLowerCase().match(/^cl-s-product-detail,/g) !== null) {
                pid = PARENT.pid;
            }

            if(!site || !page || !pid || typeof pid == 'undefined' || pid == null) {
                alert('Undefined gallery');
                return false;
            }
            $.ajax({
                url: '/template/products/',
                data: { type:'get', sid:site, id:id, page:page, pid:pid },
                dataType: 'json',
                type: 'POST',
                async: false,
                cache: false,
                success: function (data) {
                    if(data.error != 'undefined' && data.error) {
                        alert(data.error);
                        return false;
                    }
                    var i = data.item,
                        url = (typeof RESOURCE == 'undefined') ? property.RESOURCE : RESOURCE,
                        folder = '', f = '';

                    closeProductNumber = i.no;
                    product_options = i.prod_options_settings;
                    var prod_quantity = parseInt(i.quantity),
                        category = '';
                    if(id == -1 && $.gallery.category) {
                        category = $.gallery.category;
                    }
                    if(typeof gcate != 'undefined' && gcate) category = gcate;
                    if(!category) category = i.category;


                    if(prod_quantity < 0 || isNaN(prod_quantity)) i.quantity = 0;
                    $m = $(data.r).hide();
                    $('body').append($m);
                    $('#sid').val(i.sid);
                    $('#prod-page').val(page);
                    $('#prod-pid').val(pid);
                    $('#prod-no').val(i.no);
                    $('#prod-title').val(i.title);
                    $('#prod-desc').val(i.desc);
                    $('#prod-price').val(i.price);
                    $('#prod-sale').text(i.sale);
                    $('#prod-quantity').val(i.quantity);
                    if(typeof gpos != 'undefined' && gpos) $('#prod-gpos').val(gpos);
                    else $('#prod-gpos').val('');
                    $('#prod-category-text').text(category);
                    $('#prod-category-lists ul').empty();
                    $('#prod-category').attr('data-category',i.category_lists.toString());
                    uadmin = i.uadmin;
                    var etcAry = [];
                    if (i.etc_info) etcAry = i.etc_info.split('||');

                    if (etcAry[0] == 'Y') {
                        $('#cl_etc_state_n').removeClass('active');
                        $('#cl_etc_state_y').addClass('active');

                        $('.etc-setting').css('display', 'block');

                        if (etcAry[1] == 'S') {
                            $('#cl_etc_state_s').addClass('active');
                            $('#cl_etc_state_p').removeClass('active');
                        } else {
                            $('#cl_etc_status_s').removeClass('active');
                            $('#cl_etc_status_p').addClass('active');
                        }

                        if (etcAry[2] == 'A') {
                            $('#cl_etc_week_a').addClass('active');
                            $('#cl_etc_week_w').removeClass('active');
                            $('#cl_etc_week_k').removeClass('active');
                        } else if (etcAry[2] == 'W') {
                            $('#cl_etc_week_a').removeClass('active');
                            $('#cl_etc_week_w').addClass('active');
                            $('#cl_etc_week_k').removeClass('active');
                        } else {
                            $('#cl_etc_week_a').removeClass('active');
                            $('#cl_etc_week_w').removeClass('active');
                            $('#cl_etc_week_k').addClass('active');
                        }

                        $('#etc-date-state').val(etcAry[0]);
                        $('#etc-date-status').val(etcAry[1]);
                        $('#etc-date-week').val(etcAry[2]);
                        $('#etc-start-date-txt').val(etcAry[3]);
                        $('#etc-end-date-txt').val(etcAry[4]);
                        if (etcAry[5]) {
                            $('.cl_etc_date_time').each(function () {
                                var dayCheck = $(this).attr('data-day');

                                if (dayCheck == etcAry[5]) {
                                    $(this).addClass('active');
                                }
                            });
                        }
                        if (etcAry[6]) {
                            var exceptDate = (etcAry[6])? etcAry[6].split(',').sort() : '-';
                            $('#etc-except-date').val(exceptDate[0]);
                            if(exceptDate.length > 1) {
                                $('.etc-except-date-status').text('외 '+ (exceptDate.length-1) +'건');
                            } else {
                                 $('.etc-except-date-status').text('');
                            }
                        }
                    }

                    var cate = (category) ? category.split(', ') : [];
                    $.each(i.category_lists, function(i,v) {
                        $li = $('<li>' + v + '</li>');
                        if(cate.includes(v)) $li.addClass('active');
                        $('#prod-category-lists ul').append($li);
                    });
                    
                    $.each(i.footer, function(idx,v) {
                        if(idx <= 3 && v == 'true') {
                            if (idx == 3) { //photo
                                if (v == 'true') {
                                    $('.photo-review-tab .radio-checkbox input:eq(0)').prop('checked',true);
                                } else {
                                    $('.photo-review-tab .radio-checkbox input:eq(1)').prop('checked',true);
                                }
                            } else {
                                $('.page-options input:eq(' + idx + ')').prop('checked',true);
                            }
                        }
                        if (idx == 1) { //review
                            if (v == 'true') {
                                $('.photo-review-tab').css('display', 'block');
                            } else {
                                $('.photo-review-tab').css('display', 'none');
                            }
                        }
                    });

                    if(i.imgs.length > 10) $('.prod-item-image-add').addClass('hide');
                    $.each(i.imgs, function(idx,img) {
                        if(idx > 10) return true;
                        if(img) {
                            (idx == 0) ? $('.prod-item-image').addClass('active').append('<div class="preview-img" style="background-image: url(' + img + ');">') :
                                         $('.prod-item-thumb .prod-item-image-add').before('<li><img src="' + img + '"><span class="img-delete"><i class="fa fa-times-circle" aria-hidden="true"></i></li>');
                        }
                    });

                    $('.prod-option').each(function(){
                        if($(this).data('option_mode') == 'normal' && i.options.length == 0) {
                            i.options[0] = { 
                                'seq' : '',
                                'option_name' : 'noneOption',
                                'option_price' : 0
                            } 
                        }
                    });

                    if(i.quantity_on == 'on') {
                        $('.switch-quantity').prop('checked','checked').parents('.form-wrap').removeClass('disabled');
                    }

                    setOptionlist(i.options);
                    i.footer[4] = (i.footer[4] == '' || i.footer[4] == undefined)? 'true':i.footer[4];
                    $('#normal-option').prop('checked', true);

                    $('.prod-option-tab').addClass('hide');
                    $('#normal-option').prop('checked', false);
                    $('#text-option').prop('checked', false);
                    $('#additional-option').prop('checked', false);
                    $('.prod-option-tab .prod-option').addClass('hide');
                    if(i.footer[4]=='true' && $('.prod-option[data-option_mode="normal"] .prod-option-list>li').length > 1) {
                        $('#normal-option').prop('checked', true);
                        $('.prod-option-tab').removeClass('hide');
                        $('.prod-option[data-option_mode="normal"]').removeClass('hide');
                        $('.prod-option[data-option_mode="normal"] .plus-price').removeClass('hide');
                        $('.prod-option[data-option_mode="normal"] .plus-status').removeClass('hide');
                        if(i.quantity_on == 'on') {
                            $('.prod-option[data-option_mode="normal"] .plus-quantity').removeClass('hide');
                        }
                    }
                    if(i.footer[5]=='true' && $('.prod-option[data-option_mode="text"] .prod-option-list>li').length > 0) {   
                        $('#text-option').prop('checked', true);
                        $('.prod-option-tab').removeClass('hide');
                        $('.prod-option[data-option_mode="text"]').removeClass('hide');
                        $('.prod-option[data-option_mode="text"] .plus-price').removeClass('hide');
                        $('.prod-option[data-option_mode="text"] .plus-status').removeClass('hide');
                        if(i.quantity_on == 'on') {
                            $('.prod-option[data-option_mode="text"] .plus-quantity').removeClass('hide');
                        }
                        if($('.prod-option[data-option_mode="text"] .prod-option-list>li').length >= 7) { //입력옵션 7개이상 추가X
                            $('.prod-option[data-option_mode="text"] > .prod-option-add').addClass('disabled');
                        }
                    }
                    if(i.footer[6]=='true' && $('.prod-option[data-option_mode="additional"] .prod-option-list>li').length > 0) {
                        $('#additional-option').prop('checked', true);
                        $('.prod-option-tab').removeClass('hide');
                        $('.prod-option[data-option_mode="additional"]').removeClass('hide');
                        $('.prod-option[data-option_mode="additional"] .plus-price').removeClass('hide');
                        $('.prod-option[data-option_mode="additional"] .plus-status').removeClass('hide');
                        if(i.quantity_on == 'on') {
                            $('.prod-option[data-option_mode="additional"] .plus-quantity').removeClass('hide');
                        }
                    }

                    if(i.prod_info_on == 'on') {
                        $('.switch-prod-info').prop('checked','checked').parents('.form-wrap').removeClass('disabled');
                        $('.prod-info-toggle').addClass('open');
                        $('.info-selected').removeClass('hide');
                    } else {
                        $('.switch-prod-info').prop('checked', '').parents('.form-wrap').addClass('disabled');
                        $('.prod-info-toggle').removeClass('open');
                        $('.info-selected').addClass('hide');
                    }

                    if(i.product_on == 'off') {
                        $('.switch-product').prop('checked','').parents('.form-wrap').addClass('disabled');
                    } else {
                        $('.switch-product').prop('checked', true).parents('.form-wrap').removeClass('disabled');
                    }

                    if(i.quantity_on == 'on') {
                        $('.switch-quantity').prop('checked','checked').parents('.form-wrap').removeClass('disabled');
                        if($('#normal-option').is(':checked') === true) {
                        // $('#prod-quantity').attr('readonly','true').removeClass('hide').attr('placeholder','옵션에서 재고 관리');
                            $('.quantity-label').addClass('on');
                            $('.plus-quantity').removeClass('hide');
                        } else if($('#normal-option').is(':checked') === false && $('#additional-option').is(':checked') === true) {
                            $('.quantity-label').removeClass('on');
                            $('#prod-quantity').removeAttr('readonly').removeClass('hide');
                            $('.plus-quantity').removeClass('hide');
                        } else {
                            $('.quantity-label').removeClass('on');
                            $('#prod-quantity').removeAttr('readonly').removeClass('hide');
                            $('.plus-quantity').addClass('hide');
                        }
                    } else {
                        $('.prod-option-quantity, .edit-option-quantity').hide();
                        $('.plus-quantity').addClass('hide');
                    }
                    if(i.sale) {
                        $('#prod-price').addClass('sale-on');
                        $('#prod-sale').show().addClass('strike');
                        $('#prod-sale-check').prop('checked','checked');
                        $('#check-sale').html('<path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/>');
                        $('#check-sale').css('fill', '#4789e7');
                    }                    

                    $('.prod-option').each(function(){
                        if($(this).data('option_mode') == 'normal' && i.options.length == 0) {
                            i.options[0] = { 
                                'seq' : '',
                                'option_name' : 'noneOption',
                                'option_price' : 0
                            } 
                        }
                    });
                              
                    $m.fadeIn(300);
                    $('.prod-option-list').sortable({
                       handle : ".prod-option-move",
                       refreshPositions: true
                    });

                    if (i.product_state == 'download') {
                        $('#download-product').attr('checked', true);
                        $('.cl_product_state_check').each(function () {
                            if ($(this).attr('for') == 'download-product') {
                                $(this).find('.cl-icon').removeClass('cl_icon_check02_off').removeClass('cl_icon_check02_on').addClass('cl_icon_check02_on');
                                $(this).click();
                                $('#download-date').val(i.download_date);
                                $('#download-count').val(i.download_count);
                            } else {
                                $(this).find('.cl-icon').removeClass('cl_icon_check02_off').removeClass('cl_icon_check02_on').addClass('cl_icon_check02_off');
                            }
                        });
                    }

                    if (i.product_state == 'normal') {
                        $('#normal-product').attr('checked', true);
                        $('.cl_product_state_check').each(function () {
                            if ($(this).attr('for') == 'normal-product') {
                                $(this).find('.cl-icon').removeClass('cl_icon_check02_off').removeClass('cl_icon_check02_on').addClass('cl_icon_check02_on');
                                $(this).click();
                            } else {
                                $(this).find('.cl-icon').removeClass('cl_icon_check02_off').removeClass('cl_icon_check02_on').addClass('cl_icon_check02_off');
                            }
                        });
                    }

                    if (i.product_state == 'etc') {
                        $('#etc-product').attr('checked', true);
                        $('.cl_product_state_check').each(function () {
                            if ($(this).attr('for') == 'etc-product') {
                                $(this).find('.cl-icon').removeClass('cl_icon_check02_off').removeClass('cl_icon_check02_on').addClass('cl_icon_check02_on');
                                $(this).click();
                            } else {
                                $(this).find('.cl-icon').removeClass('cl_icon_check02_off').removeClass('cl_icon_check02_on').addClass('cl_icon_check02_off');
                            }
                        });
                    }

                    taxUse = i.tax_use;
                    if (i.tax_use == 'TG03') {
                        $('#state-append').fadeIn(0);
                        $('#normal-product-state').fadeIn(0);
                        if (i.tax == 'TG01') {
                            $('#tax').attr('data-val', 'TG01');
                            $('#tax').html('과세');
                        }

                        if (i.tax == 'TG02') {
                            $('#tax').attr('data-val', 'TG02');
                            $('#tax').html('비과세');
                        }
                        $('#tax').attr('data-total-tax', 'TG03');
                    } else {
                        if (i.product_state == 'normal') $('#state-append').fadeOut(0);
                        $('#normal-product-state').fadeOut(0);
                        $('#tax').attr('data-val', 'TG01');
                        $('#tax').html('과세');
                    }
                    setAdvancedMode(product_options.advanced);
                }               
            });
        },
        review : function(id,page) {
            var site = (typeof SID == 'undefined') ? property.SID : SID;

            $.ajax({
                url: '/template/products/',
                data: { type:'review', sid:site, id:id, page:page },
                dataType: 'json',
                type: 'POST',
                async: false,
                cache: false,
                success: function (data) {
                    if(data.error != 'undefined' && data.error) {
                        alert(data.error);
                        return false;
                    }
                    var $review = $(data.r).hide();
                    if(typeof property == "undefined") {
                        $lastEl = ($('.el-footer_ctrl').length) ? $('.el-footer_ctrl') : $('.add-footer-information');
                        if($('.page-bottomlist').length) $lastEl = $('.page-bottomlist');
                        if($('.fnav').length) $lastEl = $('.fnav');
                        $lastEl.before($review);
                        $review.show();
                    } else {
                        if($('.el-footer').length) {
                            $lastEl = ($('.page-bottomlist').length) ? $('.page-bottomlist') : $('.el-footer');
                            if($('.fnav').length) $lastEl = $('.fnav');
                            $lastEl.before($review);
                            $review.show();

                            var reviewArr = new Array();

                            $('.s-table-review .review-content>div').each(function(idx, item){
                                reviewArr[idx] = $(this).html();
                            });

                            truncateReviewTitle(reviewArr);

                            $(window).on('resize', function(){
                                truncateReviewTitle(reviewArr)
                            });
                        } else {
                            $('.dsgn-body').append($review);
                            $review.show();
                        }
                    }
                    var cnt = ($('.review-wrap h4 > span').text()=="") ? 0 : $('.review-wrap h4 > span').text();
                    $('.review-count').text(' ' + cnt);
                }
            });
        },
        qna : function(id,page) {
            var site = (typeof SID == 'undefined') ? property.SID : SID;

            $.ajax({
                url: '/template/products/',
                data: { type:'qna', sid:site, id:id, page:page },
                dataType: 'json',
                type: 'POST',
                async: false,
                cache: false,
                success: function (data) {
                    if(data.error != 'undefined' && data.error) {
                        alert(data.error);
                        return false;
                    }
                    var $qna = $(data.r).hide();
                    if(typeof property == "undefined") {
                        $lastEl = ($('.el-footer_ctrl').length) ? $('.el-footer_ctrl') : $('.add-footer-information');
                        if($('.page-bottomlist').length) $lastEl = $('.page-bottomlist');
                        if($('.fnav').length) $lastEl = $('.fnav');
                        $lastEl.before($qna);
                        $qna.show();
                    } else {
                        if($('.el-footer').length) {
                            $lastEl = ($('.page-bottomlist').length) ? $('.page-bottomlist') : $('.el-footer');
                            if($('.fnav').length) $lastEl = $('.fnav');
                            $lastEl.before($qna);
                            $qna.show();
                        } else {
                            $('.dsgn-body').append($qna);
                            $qna.show();
                        }
                    }
                    var cnt = ($('.qna-wrap h4 > span').text()=="") ? 0 : $('.qna-wrap h4 > span').text();
                    $('.qna-count').text(' ' + cnt);
                }
            });
        },
        list : function(id, page, view, page_num, sfl, stx, scate) {
        },
        save : function(go) {
            var before_prod = {};
            $('.product-wrap form input[name="before_prod[]"]').each(function() {
                var bd_key = $(this).attr('data-key'),
                    bd_val = $(this).val();
                
                before_prod[bd_key] = bd_val;
            });

            var seq = $('#prod-no').val(),
                page = $('#prod-page').val(),
                pid = $('#prod-pid').val(),
                gpos = $('#prod-gpos').val(),
                $title = $('#prod-title'),
                $price = $('#prod-price'),
                $sale = $('#prod-sale'),
                $quantity = $('#prod-quantity'),
                $img = $('.prod-item-image'),
                $desc = $('#prod-desc'),
                $category = $('#prod-category-text'),
                quantity_on = ($('.switch-quantity').is(":checked") == true) ? 'on' : 'off',
                product_on =  ($('.switch-product').is(":checked") == true) ? 'on' : 'off',
                category_on = ($('.switch-category').is(":checked") == true) ? 'ON' : 'OFF',
                product_info_on = ($('.switch-prod-info').is(":checked") == true) ? 'on' : 'off',
                submit = true,
                downloadDate = $('#download-date').val(),
                downloadCount = $('#download-count').val(),
                submit = true,
                productState = '',
                taxState = $('#tax').attr('data-val'),
                etcDateState = '',
                etcDateStatus = '', etcDateWeek = '',
                delete_options = $('#options-delete-list').val(),

                startDate = '', endDate = '', etcDate = '', exceptDate = '',
                dayCheck = false, dayCheckLan = '';
                prod_info = getProductInfoList();


            var price = $price.val();
            price = removeCommas(price);
            price = price * 1;

            var nPrice = Number(price),
                submit = true;

            // 옵션 가격 검색
            $.each($('.prod-option-price'), function(i,v) {
                var oPrice = $(v).attr('data-option-price');
                if(i > 0) {
                    if(nPrice + Number(oPrice) < 0) {
                        $(v).parents('li').addClass('err');
                        submit = false;
                    }
                }
            });
            if(submit == false) {
                // alert('옵션 가격이 올바르지 않습니다.');
                var modal = $(this).showModalFlat('','옵션 가격이 올바르지 않습니다.',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                    $(document).on('keydown', function(e) {
                        if(e.keyCode == 27) modal.modal('hide');
                    });
                });
                return false;
            }

            if ($('#download-product').is(":checked") == true) productState = 'download';
            if ($('#normal-product').is(":checked") == true) productState = 'normal';
            if ($('#etc-product').is(":checked") == true) {
                productState = 'etc';

                etcDateState = $('#etc-date-state').val();
                if (etcDateState == 'Y') {
                    etcDateStatus = $('#etc-date-status').val();
                    etcDateWeek = $('#etc-date-week').val();
                    startDate = $('#etc-start-date-txt').val();
                    endDate = $('#etc-end-date-txt').val();
                    exceptDate = $('#select-except-date').val();
                    $('.cl_etc_date_time').each(function () {
                        if (dayCheck == false) {
                            if ($(this).hasClass('active') === true) {
                                dayCheck = true;
                                dayCheckLan = $(this).attr('data-day');
                            } else {
                                dayCheckLan = '';
                            }
                        }
                    });

                    var checkStartDate = startDate.split('.');
                    var checkEndDate = endDate.split('.');
                    var checkStart = new Date(checkStartDate[0], (checkStartDate[1] * 1) - 1, checkStartDate[2]);
                    var checkEnd = new Date(checkEndDate[0], (checkEndDate[1] * 1) - 1, checkEndDate[2]);
                    if (checkStart.getTime() > checkEnd.getTime()) {
                        alert('시작일이 종료일보다 큽니다.');
                        return false;
                    }

                    var elapsedMSec = checkEnd.getTime() - checkStart.getTime(); // 172800000
                    var elapsedDates = 0;
                    if(etcDateWeek == 'A') {
                        elapsedDates = (elapsedMSec / 1000 / 60 / 60 / 24) + 1;
                    } else {
                        while(true) {  
                            var temp_date = checkStart;
                            if(temp_date.getTime() > checkEnd.getTime()) {   
                                break;
                            } else {
                                var tmp = temp_date.getDay();
                                if(etcDateWeek == 'W') { //주중
                                    if(tmp != 0 && tmp != 6) elapsedDates++;
                                } else { //주말
                                    if(tmp == 0 || tmp == 6) elapsedDates++;
                                }

                                temp_date.setDate(checkStart.getDate() + 1); 
                            }
                        }
                    }
                    
                    var exceptDateArr = exceptDate.split(',');
                    var exceptDateLen = (exceptDateArr[0] == '')? []:exceptDateArr.length;
                    
                    if(exceptDateLen >= elapsedDates) {
                        alert('모든 날짜를 제외할 수 없습니다.\r\n제외날짜를 재설정 해주세요.');
                        return false;
                    }
                }

                etcDate = etcDateState+'||'+etcDateStatus+'||'+etcDateWeek+'||'+startDate+'||'+endDate;
                // if (dayCheckLan) {
                //     etcDate += '||' + dayCheckLan;
                // }
                // else {
                //     etcDate += '||';
                // }
                etcDate += (dayCheckLan)? '||' + dayCheckLan : '||';
                etcDate += (exceptDate)?  '||' + exceptDate : '';
            }

            if($img.find('.preview-img').length == 0) {
                $img.addClass('empty');
                submit = false;
            } else $img.removeClass('.empty');

            if(!$title.val().trim()) {
                $title.focus().parents('.form-wrap').addClass('empty');
                submit = false;
            } else $title.parents('.form-wrap').removeClass('empty');
            if(!$price.val().trim()) {
                $price.focus().parents('.form-wrap').addClass('empty');
                submit = false;
            } else $price.parents('.form-wrap').removeClass('empty');
            // if(!$quantity.val().trim()) {
            //     $quantity.focus().parents('.form-wrap').addClass('empty');
            //     submit = false;
            // } else $quantity.parents('.form-wrap').removeClass('empty');

            var item_quantity = ($quantity.val().trim()) ? parseInt($quantity.val().trim().replace(/\,/g, ''), 10) : 0,
                item_price = ($price.val().trim()) ? parseInt($price.val().trim().replace(/\,/g, ''), 10) : 0;
            if(item_quantity > 1000000000) {
                $quantity.focus().parents('.form-wrap').addClass('empty');
                alert('최대 수량은 10억개입니다');
                return false;
            }
            if(item_price > 1000000000) {
                $price.focus().parents('.form-wrap').addClass('empty');
                alert('최대상품가격은 10억입니다');
                return false;
            }

            if(product_info_on=='on') {
                if(prod_info.cate_null) {
                    $('.prod-info-notice').addClass('empty');
                    return false;
                }
                if(prod_info.input_empty) {
                    $('.value-empty').remove();
                    var offset_idx = 0;
                    var emptyval ='\
                    <div class="value-empty">\
                        <svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>필수 입력 항목 입니다.\
                    </div>\
                    ';

                    $.each(prod_null, function(i,v) {
                        $('.prod-input-value:eq(' + v + ')').parent('div').append(emptyval);
                        if(i==0) offset_idx = v;
                    });
                    prod_null.offset_idx = offset_idx;
                    var input_height = $('.prod-input-value:eq(' + prod_null.offset_idx + ')').offset().top;
                    if($('.prod.empty').length==0) $('.prod-modal').animate({ scrollTop: input_height*0.8 }, 500, 'easeInOutQuart');
                    return false;
                }
            }
            if($('.prod-option-list > li').hasClass('err') == true) {
                alert('옵션 항목을 모두 작성해주세요.')
                return false;
            }
            var options = $('.prod-option-list > li').map(function(i,v) {
                if($(this).find('.prod-option-title').text().trim()) {
                    var quantity = $(this).find('.prod-option-quantity').text().trim(),
                        status = $(this).find('.option-price-status-str').attr('data-val'),
                        type = '';
                    if ($(this).closest('.prod-option').data('option_mode') == 'additional') type = 'A';
                    else if ($(this).closest('.prod-option').data('option_mode') == 'text') type = 'T';
                    
                    if(quantity == '') quantity = '0';
                    if(quantity == '0' && quantity_on == 'on') status = 'O'; 

                    var fileUrl = [],
                        fileSize = [],
                        fileStrName = [],
                        fileName = [];

                    var fileUrlCheck = $(this).find('.file-url'),
                        fileSizeCheck = $(this).find('.file-size'),
                        fileStrNameCheck = $(this).find('.file-name-detail'),
                        fileNameCheck = $(this).find('.real-file-name');

                    if (fileUrlCheck.length > 0) $(this).find('.file-url').each(function () { fileUrl.push($(this).text()); });
                    else fileUrl.push('');
                    if (fileUrlCheck.length > 0) $(this).find('.file-size').each(function () { fileSize.push($(this).text()); });
                    else fileUrl.push('');
                    if (fileUrlCheck.length > 0) $(this).find('.file-name-detail').each(function () { fileStrName.push($(this).text()); });
                    else fileUrl.push('');
                    if (fileUrlCheck.length > 0) $(this).find('.real-file-name').each(function () { fileName.push($(this).text()); });
                    else fileUrl.push('');

                    var strFileUrl = fileUrl.join('||'),
                        strFileSize = fileSize.join('||'),
                        strFileStrName = fileStrName.join('||'),
                        strFileName = fileName.join('||');

                    if(type == 'T' || type == 'A') {
                        strFileStrName = "";
                        strFileSize = "";
                        strFileName = "";
                        strFileUrl="";
                    }

                    var optionTitle = '';
                    if(product_options.advanced == 'true') {
                        if(i == 0 || type == 'T') {
                            optionTitle = $(this).find('.prod-option-title').text().trim();
                        } else {
                            var $val = $(this).find('.prod-option-title > label.owidth');
                            optionTitle = $val.map(function() {
                                return $(this).text();
                            }).get().join(' / ');

                        }
                    } else {
                        optionTitle = $(this).find('.prod-option-title').text().trim();
                    }

                    var optionPrice = (type != 'T')? $(this).find('.prod-option-price').attr('data-option-price').trim() : 0;
                    var optionGroup = '', m2 = '', m3 = '';
                    var arrTitle = optionTitle.split(" / ");
                    switch(arrTitle.length) {
                        case 1: optionTitle = arrTitle[0]; break;
                        case 2: optionTitle = arrTitle[1]; m2 = arrTitle[0]; break;
                        case 3: optionTitle = arrTitle[2]; m2 = arrTitle[0]; m3 = arrTitle[1]; break;
                    }

                    if(type == 'T') {
                        status = 'S';
                        type = 'T';
                        optionPrice = "0";
                    } else if(type == 'A') {
                        optionGroup = m2;
                        m2 = '';
                    } else if(type == '') {
                        if(product_options.type == "1") {
                            optionGroup = m2;
                            m2 = "";
                        }
                    }
                    // if(product_options.advanced == false && optionTitle != 'noneOption') {
                    //     switch(type) {
                    //         case ""  : product_options.config1[0].title = '옵션선택'; break;
                    //         case "A" : product_options.config3[0].title = '추가옵션'; break;
                    //     }                        
                    // }
                    return { 
                        s : $(this).find('.prod-option-title').attr('data-seq'),
                        m2 : m2,
                        m3 : m3,
                        o : optionTitle, 
                        v : optionPrice,
                        fn : strFileName,
                        fdn : strFileStrName,
                        fs : strFileSize,
                        fu : strFileUrl,
                        q : quantity,
                        t : status,
                        g : optionGroup,
                        a : i,
                        ty: type
                    }
                 }
            }).get();

            if(options.length==0 && $('.prod-option-tab .prod-option.hide').length < 3) {
                $('.prod-option-add').addClass('empty');
                submit = false;
            }

            var optionsAry = division(options, 300);
            // console.log(optionsAry);
            var price1 = removeCommas($price.val().trim()), //할인가
                price2 = removeCommas($sale.text().trim()); //정가

            if($sale.css('display') == 'none') {
                $sale.text('');
                price2 = 0;
            }
            
            if($('#prod-sale-check').is(':checked') && (parseInt(price1) - parseInt(price2) >= 0)) {
                // alert('할인 가격은 정가보다 높거나 동일할 수 없습니다');
                var modal = $(this).showModalFlat('','할인 가격은 정가보다 높거나 동일할 수 없습니다',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                    $(document).on('keydown', function(e) {
                        if(e.keyCode == 27) modal.modal('hide');
                    });
                });
                if(price2 == 0) $price.val('');
                submit = false;
                return;
            }

            if(nPrice > 0 && nPrice < 10) {
                $('#prod-price').focus();
                $('.prod-item-price1').addClass('err')
                // alert('상품 가격을 10원 이상 입력해주세요.');
                var modal = $(this).showModalFlat('','상품 가격을 10원 이상 입력해주세요.',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                    $(document).on('keydown', function(e) {
                        if(e.keyCode == 27) modal.modal('hide');
                    });
                });
                submit = false;
            } else {
                $('.prod-item-price1').removeClass('err');
            }

            var imgs = [];

            if(submit) {
                $('.prod-item-thumb li').each(function(i,v) {
                    var s = $(this).find('img:not(.guide-img)').attr('src');
                    if($(this).hasClass('prod-item-image-add')) return true;
                    imgs.push(s);
                });


                var func = new Array();
                func[0] = true;
                func[1] = $('#review-checkbox').is(":checked");
                func[2] = $('#qna-checkbox').is(":checked");
                func[3] = $('#photo-review').is(":checked");
                
                func[4] = ($('#normal-option').is(':checked'))? true : false; //일반옵션 활성화
                func[5] = ($('#text-option').is(':checked'))? true : false; //입력옵션 활성화
                func[6] = ($('#additional-option').is(':checked'))? true : false; //추가옵션 활성화
                
                var cate = ($category.text().trim()) ? $category.text().trim().split(',') : '';
                //재고수량
                var quantity_val = (func[4] == 'true' || func[6] == 'true')? 0 : $quantity.val().trim();

                var options_config = product_options;
                $.processON('상품을 등록중입니다...');
                for (var optionCnt=0;optionCnt<optionsAry.length;optionCnt++) {
                    var prod = {
                        'seq' : seq,
                        'page' : page,
                        'pid' : pid,
                        'gpos'  : gpos,
                        'title' : $title.val().trim(),
                        'price' : $price.val().trim(),
                        'sale' : $sale.text().trim(),
                        'product_on' : product_on,
                        'product_info_on' : product_info_on,
                        'quantity' : quantity_val,
                        'quantity_on' : quantity_on,
                        'desc' : $desc.val().trim(),
                        'category' : cate,
                        'category_on' : category_on,
                        'imgs' : imgs,
                        'func' : func,
                        'product_state' : productState,
                        'tax' : taxState,
                        'download_date' : downloadDate,
                        'download_count' : downloadCount,
                        'etc_data' : etcDate,
                        'options' : JSON.stringify(optionsAry[optionCnt]),
                        'prod_info' : prod_info,
                        'options_config' : options_config,
                        'delete_options' : delete_options,
                        'before_prod' : JSON.stringify(before_prod)
                    }

                    $.post('/template/products', { sid: SID, type : 'add', s: prod }, function (data) {
                        // checkError(data);
                        if(data.error) {
                            $.processOFF();
                            if(data.price) $('#prod-price').val('');
                            var modal = $(this).showModalFlat('',data.error,true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                                $(document).on('keydown', function(e) {
                                    if(e.keyCode == 27) modal.modal('hide');
                                });
                            });
                            return false;
                        }

                        // control panel
                        if (optionsAry.length == (optionCnt + 1)) {
                            $('img.galleryItemEdit[data-seq="' + data.r.id + '"]').attr('src',data.r.imgs[0].path+'/60/'+data.r.imgs[0].file);
                            $('.image-title.galleryItemEdit[data-seq="' + data.r.id + '"]').text(data.r.title);

                            PRODINFO = (product_info_on=='on') ? prod_info : '';
                            PRODSETTING = 'on';

                            setTimeout(function() {
                                if(typeof MODE == 'undefined') ;
                                else {
                                    if(go) {
                                        var block = ($('.el_1').length) ? '.el_1' : '.default_project_contents',
                                            menuPage = PAGE.split(',');
                                        if(VIEW) {
                                            location.href = '/'+CONFIG_URL+'config/page/'+menuPage[0]+'/view/'+data.r.id;
                                        } else {
                                            $.cookie('product-detail', true, { expires: 60*60, path : '/' });
                                            location.href = '/'+CONFIG_URL+'config/page/'+menuPage[0]+'/view/'+data.r.id;
                                        }

                                    } else {
                                        showPageCallback(showPage);
                                        $.processOFF();
                                        $.products.close();
                                        if($('.gallery-modal').length)
                                            $.gallery.show($.gallery.block_id,1,$.gallery.category);
                                    }
                                }
                            },2000);
                        }
                    }, 'json');
                }
            }
        },
        display_info : function() {
            var prodObj = (typeof property == "undefined") ? PRODINFO : property.PRODINFO;
            var s = '\
            <div class="cl-s-product-info-notice element el_000">\
                <div class="container">\
                <span class="prod-info-notice">상품정보 제공고시</span>\
                <table>\
                    <colgroup>\
                        <col width="">\
                        <col width="*">\
                    </colgroup>\
                    <tbody>\
            ';

            $.each(prodObj.content, function(i,v) {
                s = s + '\
                    <tr>\
                        <td class="prod-info-title">' + v.title + '</td>\
                        <td>' + v.content + '</td>\
                    </tr>\
                    ';
            });
            s = s + '\
                    </tbody>\
                </table>\
                </div>\
            </div>\
            ';

            if(typeof property == "undefined") {
                $lastEl = ($('.el-footer_ctrl').length) ? $('.el-footer_ctrl') : $('.add-footer-information');
                if($('.page-bottomlist').length) $lastEl = $('.page-bottomlist');
                if($('.fnav').length) $lastEl = $('.fnav');
                $lastEl.before(s);
            } else {
                if($('.el-footer').length) {
                    $lastEl = ($('.page-bottomlist').length) ? $('.page-bottomlist') : $('.el-footer');
                    if($('.fnav').length) $lastEl = $('.fnav');
                    $lastEl.before(s);
                } else {
                    $('.dsgn-body').append($s);
                }
            }
        },
        close : function() {
            if($('.prod-modal').length) {
                $('.prod-modal').fadeOut(300, function() {
                    $(this).remove();
                });
            }
        }
    }

    var clicking = false;
    $.gallery = {
        mode : '',
        block_id : '',
        blocks : [],
        pages : [],
        seqs : [],
        copy : [],
        move : [],
        delete : [],
        view_item : 20,
        update : false,
        category : '',
        cates : '',
        drag : '',
        last : '',
        reset : function() { $.gallery.move = []; $.gallery.copy = []; $.gallery.seqs = []; },
        init : function() {
            var galleryMoveItem = function(block_id,seq,page,callback) {
                if(CANCEL) return true;
                var seqs = [];
                seqs.push(seq);
                $.ajax({
                    url: '/template/gallery/move',
                    data: { s: seqs, sid : SID, page : page, block_id : block_id },
                    dataType: 'json',
                    type: 'POST',
                    async: true,
                    cache: false,
                    success: function(data) {
                        checkError(data);
                        if(typeof callback == 'function') {
                            callback();
                        }
                    }
                });
            }

            $(window).resize(function(e) { 
                if($('.gallery-items').length == 0) return;
                resizeGalleryModal();
            });

            $(document).bind('cut', '.gallery-modal', function(e) {
                $.gallery.move = $.gallery.seqs;
                $.gallery.seqs = [];
                $.each($.gallery.move, function(i,v) {
                    $('.gallery-items .item[data-seq="' + v + '"]').removeClass('copy').addClass('move');
                    $('.gallery-items .toolbar.mod-gallery').remove();
                });
            });

            $(document).bind('copy', '.gallery-modal', function(e) {
                $.gallery.copy = $.gallery.seqs;
                $.gallery.seqs = [];
                $.each($.gallery.copy, function(i,v) {
                    $('.gallery-items .item[data-seq="' + v + '"]').removeClass('move').addClass('copy');
                    $('.gallery-items .toolbar.mod-gallery').remove();
                });
            });

            $(document).bind('paste', '.gallery-modal', function(e) {
                if($('.gallery-modal').length == 0 || $('.galleryController').length || $('.prod-modal').length) return;
                if(($.gallery.copy).length) $.gallery.cp();
                if(($.gallery.move).length) $.gallery.mv();
            });

            $(document).bind('keydown', 'ctrl+a', function(e) { 
                if( e.ctrlKey && 
                    !$(e.target).is('input') &&
                    !$(e.target).is('textarea') &&
                    !$(e.target).is('.pace-disable.modal-open') &&
                    $('.prod-modal').length == 0 && 
                    $('.galleryController').length == 0 && 
                    $('.cl-category-modal.category-modal').length == 0
                ) {
                    if(e.keyCode == 65 || e.keyCode == 85) {
                        $.gallery.seqs = [];
                        var group = ($('.table-item').length) ? '.table-item' : '.gallery-items .item';
                        $(group).removeClass('ui-selected return');
                        $.each($(group), function(i,v) {
                            $('.td-check > input').prop('checked',true);
                            $.gallery.seqs.push($(v).attr('data-seq'));
                            $(v).addClass('ui-selected');
                        });
                        $('.col-check > input').prop('checked',true);
                        $.gallery.setNumber();
                        stickyToolbar();
                        //return false;
                    }
                }
            });
            $(document).on('click','.gallery-category > .category-text', function(e) {
                var s = $(this).text().trim(),
                    pid = $('.gallery-modal').attr('data-pid');
                $.gallery.show(pid,1,s);
            });

            $(document).on('click', '.gallery-modal', function(e) {
                $(this).find('.gallery-items .toolbar.mod-gallery').remove();
                if($.gallery.mode == 'shopping') {
                    if(e.target.className.indexOf('ui-selectable') === -1) {
                        $.gallery.seqs = [];
                        $('.gallery-items .table-item').removeClass('ui-selected return');
                        $('.table-toolbar > li').removeClass('open');
                        $('.table-toolbar .toolbar-cmd').addClass('hide');
                        $('.gallery-items .table-item > div').removeClass('hide-text');
                        $('.gallery-items .table-item input').prop('checked',false);
                        $('.table-col').css('z-index','2').css('width','100%');
                        $('.col-check > input').prop('checked',false);
                    }
                } else {
                    if(e.target.className.indexOf('item') === -1) {
                        $.gallery.seqs = [];
                        $('.gallery-items .item').removeClass('ui-selected return');    
                        $('.gallery-toolbar').empty();
                    } else {

                    }
                }
                $('.toolbar-sort').removeClass('open');
                $('.gallery-view-count').removeClass('open').find('.view-submenu').hide();
                // $('.table-toolbar > li').addClass('disabled').removeClass('open');
                $('.gallery-blocks .btn-group').removeClass('open');
            });

            $(document).on('mousemove', '.gallery-modal', function(e) {
                if($(".item-title").is(':focus')) return;
                if($('.gallery-modal .clone-item').length) {
                    $('.gallery-modal .clone-item').css({
                        'left' : e.pageX+10,
                        'top' : e.pageY+10
                    }).attr('data-count',($.gallery.seqs).length).find('input').remove();
                    if(($.gallery.seqs).length >1) $('.gallery-modal .clone-item').addClass('multi');
                    $('.gallery-items .table-item').removeClass('prev last');
                    if(window.innerHeight-80 < e.pageY) $('.gallery-modal').scrollTop($('.gallery-modal').scrollTop() + 30);
                    if(e.pageY < 80) $('.gallery-modal').scrollTop($('.gallery-modal').scrollTop() - 30);
                }
                if($('.ui-selectable-helper').length == 0) return;
                if(e.target.className.match(/(gallery-items ui-selectable|item-ctrl|img-responsive|ui-selected|ui-selectee|item-title|table-item|td-handle|item-handle|td-check|td-input|td-check|td-number|td-title|td-edit|td-img|info-link|td-edut|td-category|td-price|td-quantity)/)) { 
                    $('.gallery-modal, .gallery-items-loadmore, .gallery-category, .gallery-category li, .checkbox label, .gallery-toolbar .toolbar li, .btn, .gallery-button li').removeClass('not-allowed');
                } else {
                    $('.gallery-modal, .gallery-items-loadmore, .gallery-category, .gallery-category li, .checkbox label, .gallery-toolbar .toolbar li, .btn, .gallery-button li').addClass('not-allowed');
                }
            }).on('mouseup', function(e) {
                if($('.gallery-modal .clone-item').length) {
                    $('.gallery-modal .clone-item').remove();
                    $('.gallery-items .item').removeClass('prev last drag');
                    $('.gallery-items .table-item').removeClass('prev last drag');
                    clicking = false;
                }
                // $('.gallery-items').selectable('enable');
                $('.gallery-modal, .gallery-items-loadmore, .gallery-category, .gallery-category li, .checkbox label, .gallery-toolbar .toolbar li, .btn, .gallery-button li').removeClass('not-allowed');
                stickyToolbar();
            });

            $(document).on('mousedown','.gallery-items',function(e) {
                if(e.target.className.indexOf('gallery-items') > -1) {
                    $.each($('.item-title'), function(i,v) {
                        if($(this).is(':focus')) {
                            $(this).blur();
                        }
                    });
                }
            });
            $(document).on('mouseup','.gallery-items',function(e) {
                var group = ($('.table-item').length) ? '.table-item' : '.gallery-items .item';
                if($(group + '.ui-selected').length == 0 && $(group).length) {
                    if($.gallery.mode == 'shopping') {
                        $('.gallery-items .table-item').removeClass('ui-selected return');
                        $('.table-toolbar > li').removeClass('open').find('.item-submenu').hide();
                        $('.gallery-view-count').removeClass('open').find('.view-submenu').hide();
                        $('.table-toolbar .toolbar-cmd').addClass('hide');
                        $('.gallery-items .table-item > div').removeClass('hide-text');
                        $('.gallery-items .table-item input').prop('checked',false);
                        $('.table-col').css('z-index','2').css('width','100%');
                        $('.col-check > input').prop('checked',false);
                    } else {
                        $.gallery.seqs = [];
                        $('.gallery-items .item').removeClass('ui-selected return');    
                        $('.gallery-toolbar').empty();
                    }
                }
                $('.ui-selectable-helper').removeClass('hide');
                // $(".gallery-items").selectable("enable");
                if($.gallery.seqs.length && ($('.gallery-items .item').hasClass('prev') || $('.gallery-items .item').hasClass('last'))) {
                    if($('.gallery-items .item.last').length) {
                        if($('.gallery-items .item.last').next().length) {
                            $.gallery.drag = $('.gallery-items .item.last').next().attr('data-seq');
                        } else {
                            $.gallery.drag = $('.gallery-items .item.last').attr('data-seq');
                            $.gallery.last = '-1';
                        }
                    } else if($('.gallery-items .item.prev').length) {
                        $.gallery.drag = $('.gallery-items .item.prev').attr('data-seq');
                    }
                    $('.gallery-modal .clone-item').remove();
                    $('.gallery-items .item').removeClass('prev drag last');

                    $.gallery.move = $.gallery.seqs;
                    $.gallery.mv();
                }
                if(e.target.className.indexOf('gallery-items') > -1) {
                    $.each($('.item-title'), function(i,v) {
                        if($(this).is(':focus')) {
                            $(this).blur();
                        }
                    });
                }
            });

            var isDragging = false;
            var startingPos = [];
            $(document).on('mousedown','.gallery-items .table-item',function(e) {
                isDragging = false;
                clicking = true;
                startingPos = [e.pageX, e.pageY];

                if(e.shiftKey) {
                    var seq_start = $('.gallery-items .table-item[data-seq="' + $.gallery.seqs[0] + '"]').index(),
                        seq_end = $(this).index();
                    $.gallery.seqs = [];
                    $('.gallery-items .item').removeClass('ui-selected return');
                    // console.log(seq_start,seq_end);
                    var start = 0, end = 0;
                    if(seq_start<seq_end) {
                        for(var i=seq_start; i<=seq_end; i++) {
                            var $shifted_item = $('.gallery-items .table-item');
                            $shifted_item.eq(i).addClass('ui-selected');
                            // $.gallery.seqs.push($shifted_item.eq(i).attr('data-seq'));
                        }
                    } else {
                        for(var i=seq_start; i>=seq_end; i--) {
                            var $shifted_item = $('.gallery-items .table-item');
                            $shifted_item.eq(i).addClass('ui-selected');
                            // $.gallery.seqs.push($shifted_item.eq(i).attr('data-seq'));
                        }
                    }
                    stickyToolbar();
                }
            });

            $(document).on('mousedown','.gallery-items .item',function(e) {
                if($('.item-title').is(':focus')) return;
                isDragging = false;
                clicking = true;
                startingPos = [e.pageX, e.pageY];
                $('.gallery-modal .clone-item').remove();
                if(e.target.className.indexOf('item') === 0) {
                    $(".ui-selectable-helper").addClass('hide');
                    $(".gallery-items").selectable("disable");
                }

                $('.gallery-blocks .btn-group').removeClass('open');
                var key = e.keyCode || e.which,
                    seq = $(this).attr('data-seq'),
                    seq_idx = ($.gallery.seqs).indexOf(seq);

                if(e.ctrlKey) {
                    if(seq_idx > -1) {
                        $(this).removeClass('ui-selected return');
                        // ($.gallery.seqs).splice(seq_idx,1);
                    } else {
                        $(this).addClass('ui-selected');
                        // $.gallery.seqs.push(seq);
                    }
                    $.gallery.selected();
                    stickyToolbar();
                } else if(e.shiftKey) {
                    if(($.gallery.seqs).length > 0) {
                        var seq_start = $('.gallery-items .item[data-seq="' + $.gallery.seqs[0] + '"]').index(),
                            seq_end = $(this).index();
                        $.gallery.seqs = [];
                        $('.gallery-items .item').removeClass('ui-selected return');
                        // console.log(seq_start,seq_end);
                        var start = 0, end = 0;
                        if(seq_start<seq_end) {
                            for(var i=seq_start; i<=seq_end; i++) {
                                var $shifted_item = $('.gallery-items .item');
                                $shifted_item.eq(i).addClass('ui-selected');
                                // $.gallery.seqs.push($shifted_item.eq(i).attr('data-seq'));
                            }
                        } else {
                            for(var i=seq_start; i>=seq_end; i--) {
                                var $shifted_item = $('.gallery-items .item');
                                $shifted_item.eq(i).addClass('ui-selected');
                                // $.gallery.seqs.push($shifted_item.eq(i).attr('data-seq'));
                            }
                        }
                        $.gallery.selected();
                        stickyToolbar();
                    }
                } else {
                    if(!$(this).hasClass('ui-selected')) {
                        $.gallery.seqs = []; 
                        $.gallery.seqs.push(seq);
                        $('.gallery-items .item').removeClass('ui-selected return');
                        // $(this).parent().removeClass('move').removeClass('copy');
                        $(this).addClass('ui-selected');
                        stickyToolbar();

                        // cut, copy remove
                        var i = ($.gallery.copy).indexOf(seq);
                        if(i !== -1) ($.gallery.copy).splice(i,1);

                        var i = ($.gallery.move).indexOf(seq);
                        if(i !== -1) ($.gallery.move).splice(i,1);
                    }
                }
            });
            $(document).on('mousedown','.gallery-items .td-handle',function(e) {
                // if($('.gallery-items .table-item.ui-selected').length == 0) {
                if($(this).parent().hasClass('ui-selected') == false) {
                    $(this).parent().addClass('ui-selected').find('.td-check input').prop('checked',true);
                    $.gallery.seqs.push($(this).parent().attr('data-seq'));
                }
            });

            $(document).on('mousemove','.gallery-items .table-item',function(e) {
                if(clicking === false) return;
                $('.gallery-items .table-item').removeClass('prev');

                if($('.gallery-modal .clone-item').length) {
                    var $clone = $('.gallery-modal .clone-item');
                    $clone.css({
                        'position' : 'fixed',
                        'cursor' : 'move',
                        'z-index' : '1090'
                    });
                    $clone.css({
                        'left' : e.pageX+10,
                        'top' : e.pageY+10
                    }).attr('data-count',($.gallery.seqs).length).find('input').remove();
                    if(($.gallery.seqs).length >1) $clone.addClass('multi');

                    var this_top = e.pageY - $(this).offset().top;
                    if($(this).is(':last-child') && this_top > 45) {
                        $(this).removeClass('prev').addClass('last');
                    } else $(this).removeClass('last').addClass('prev');
                    if(window.innerHeight-80 < e.pageY) $('.gallery-modal').scrollTop($('.gallery-modal').scrollTop() + 30);
                    if(e.pageY < 80) $('.gallery-modal').scrollTop($('.gallery-modal').scrollTop() - 30);
                    e.stopPropagation();
                } 
            });

            $(document).on('mouseenter','.gallery-items .td-category', function(e) {
                var cate_arr = $(this).text().trim().split(',');
                if(cate_arr.length < 2) return;

                var cate_str = '';
                $.each(cate_arr, function(i,v) {
                    cate_str += '<li>' + v.trim() + '</li>';
                });

                var gcate_tooltip_place = ($('.gallery-modal').height() <= $(this).closest('.table-item').offset().top + $(this).closest('.table-item').outerHeight()) ? 'top' : 'bottom'; 
                var gcate_tooltip_css = (gcate_tooltip_place == 'top') ? {
                    'top': (Math.floor($('.gallery-modal').scrollTop() + $(this).offset().top - (100 + ((cate_arr.length-2) * 20)))) + 'px',
                    'left': (Math.floor($(this).offset().left) -30) + 'px',
                } : {
                    'top': (Math.floor($('.gallery-modal').scrollTop() + $(this).offset().top + $(this).outerHeight()) - 7) + 'px',
                    'left': (Math.floor($(this).offset().left) -30) + 'px',
                }

                $('.gcategory-tooltip ul').empty().html(cate_str);
                $('.gcategory-tooltip').attr('data-place',gcate_tooltip_place).css(gcate_tooltip_css).show();
            });
            
            $(document).on('mouseleave', '.gallery-items .td-category', function(e) {
                if($('.gcategory-tooltip').css('display') === 'none') return;
                $('.gcategory-tooltip').hide().removeAttr('style');
                $('.gcategory-tooltip ul').empty();
            });

            $(document).on('mousemove','.gallery-items .td-handle',function(e) {
                if(clicking === false || $('.gallery-items .table-item.ui-selected').length == 0) return;
                $('.td-edit .item-edit').css('display','none');
                if ((e.pageX  < startingPos[0]-10 || e.pageX  > startingPos[0]+10) ||
                    (e.pageY  < startingPos[1]-10 || e.pageY  > startingPos[1]+10)) {
                    $('.gallery-items .table-item.ui-selected').addClass('drag');
                    if($('.gallery-modal .clone-item').length == 0) {
                        var $clone = $(this).parent().clone();
                        $clone.css({
                            'position' : 'fixed',
                            'cursor' : 'move',
                            'z-index' : '1090'
                        }).addClass('clone-item').attr('data-count',($.gallery.seqs).length).find('input').remove();
                        $('.gallery-modal').append($clone);

                        $clone.css({
                            'left' : e.pageX+10,
                            'top' : e.pageY+10
                        });
                        if(($.gallery.seqs).length >1) $clone.addClass('multi');
                    } 
                    isDragging = true;
                    // var parentOffset = $(this).parent().offset(); 
                    // var relX = e.pageX - parentOffset.left;
                    // var relY = e.pageY - parentOffset.top;
                    // $('.gallery-items .item').removeClass('prev last');
                    // var this_top = $(this).position().top,
                    //     next_top = ($(this).next().length) ? $(this).next().position() : -1;
                    // console.log(parentOffset);
                    // if(this_top == next_top) {
                    //     (relX - $(this).position().left < 62) ? $(this).addClass('prev') : $(this).next().addClass('prev');
                    // } else {
                    //     (relX - $(this).position().left < 62) ? $(this).addClass('prev') : $(this).addClass('last');
                    // }
                }
            });
            $(document).on('mousemove','.gallery-items .item',function(e) {
                if(clicking === false || $('.item-title').is(':focus')) return;
                if ((e.pageX  < startingPos[0]-10 || e.pageX  > startingPos[0]+10) ||
                    (e.pageY  < startingPos[1]-10 || e.pageY  > startingPos[1]+10)) {
                    $('.gallery-items .item.ui-selected').addClass('drag');
                    if($('.gallery-modal .clone-item').length == 0) {
                        var $clone = $(this).clone();
                        $clone.css({
                            'position' : 'fixed'
                        }).addClass('clone-item').attr('data-count',($.gallery.seqs).length).find('input').remove();
                        $('.gallery-modal').append($clone);
                        if(($.gallery.seqs).length >1) $clone.addClass('multi');
                    } 
                    isDragging = true;
                    var parentOffset = $(this).parent().offset(); 
                    var relX = e.pageX - parentOffset.left;
                    var relY = e.pageY - parentOffset.top;
                    $('.gallery-items .item').removeClass('prev last');
                    var this_top = $(this).position().top,
                        next_top = ($(this).next().length) ? $(this).next().position() : -1;
                    if(this_top == next_top) {
                        (relX - $(this).position().left < 62) ? $(this).addClass('prev') : $(this).next().addClass('prev');
                    } else {
                        (relX - $(this).position().left < 62) ? $(this).addClass('prev') : $(this).addClass('last');
                    }
                }
            });
            $(document).on('mouseup','.gallery-items .table-item',function(e) {
                e.preventDefault();
                clicking = false;
                if (isDragging) {
                    if($.gallery.seqs.length && $('.gallery-modal .clone-item').length) {
                        if($('.gallery-items .table-item.last').length) {
                            if($('.gallery-items .table-item.last').next().length) {
                                $.gallery.drag = $('.gallery-items .table-item.last').next().attr('data-seq');
                            } else {
                                $.gallery.drag = $('.gallery-items .table-item.last').attr('data-seq');
                                $.gallery.last = '-1';
                            }
                        } else if($('.gallery-items .table-item.prev').length) {
                            $.gallery.drag = $('.gallery-items .table-item.prev').attr('data-seq');
                        }
                        $('.gallery-modal .clone-table-item').remove();
                        $('.gallery-items .table-item').removeClass('prev drag last');

                        $.gallery.move = $.gallery.seqs;
                        $.gallery.mv();
                    }
                } else {
                    var parentOffset = $(this).parent().offset(),
                        relX = e.pageX - parentOffset.left,
                        relY = e.pageY - parentOffset.top;
                    $('.gallery-items .table-item.ui-selecting').removeClass('active').addClass('ui-selected');
                    stickyToolbar();
                }
                isDragging = false;
                startingPos = [];

                var l = ($(this).index()%7 > 3) ? 'right' : '',
                    mode = $('.gallery-add-items').attr('data-mode');

                if(typeof mode == 'undefined' || !mode) {
                    alert('Undefined gallery mode');
                    return false;
                }                        
                $.gallery.setNumber();     
                $('.ui-selectable-helper').removeClass('hide');
                $('.gallery-items').selectable('enable');
            });

            $(document).on('mouseup','.gallery-items .item',function(e) {
                e.preventDefault();
                clicking = false;
                if (isDragging) {
                    if($.gallery.seqs.length && $('.gallery-modal .clone-item').length) {
                        if($('.gallery-items .item.last').length) {
                            if($('.gallery-items .item.last').next().length) {
                                $.gallery.drag = $('.gallery-items .item.last').next().attr('data-seq');
                            } else {
                                $.gallery.drag = $('.gallery-items .item.last').attr('data-seq');
                                $.gallery.last = '-1';
                            }
                        } else if($('.gallery-items .item.prev').length) {
                            $.gallery.drag = $('.gallery-items .item.prev').attr('data-seq');
                        }
                        $('.gallery-modal .clone-item').remove();
                        $('.gallery-items .item').removeClass('prev drag last');

                        $.gallery.move = $.gallery.seqs;
                        $.gallery.mv();
                    }
                } else {
                    var parentOffset = $(this).parent().offset(),
                        relX = e.pageX - parentOffset.left,
                        relY = e.pageY - parentOffset.top;
                    $('.gallery-items .item.ui-selecting').removeClass('active').addClass('ui-selected');
                    stickyToolbar();
                }
                isDragging = false;
                startingPos = [];

                var l = ($(this).index()%7 > 3) ? 'right' : '',
                    mode = $('.gallery-add-items').attr('data-mode');

                if(typeof mode == 'undefined' || !mode) {
                    alert('Undefined gallery mode');
                    return false;
                }                        
                $.gallery.toolbar();
                
                $.gallery.setNumber();     
                $('.ui-selectable-helper').removeClass('hide');
                $('.gallery-items').selectable('enable');
            });

            $(document).on('click','.gallery-controller',function(e) { 
                $.gallery.show($.gallery.block_id);
            });
            $(document).on('click','.gallery-all',function(e) { 
                $.gallery.show($.gallery.block_id);
            });
            $(document).on('click','.gallery-button .modal-close', function(e) {
                $.gallery.close();
            });
            $(document).on('keyup','.item-title', function(e) {
                if(e.keyCode == 13) $('#empty-text').focus().blur();
            });
            $(document).on('focus','.item-title', function(e) {
                $.gallery.seqs = [];
                var seq = $(this).parent().attr('data-seq');
                $.gallery.seqs.push(seq);
                $('.gallery-items .item').removeClass('ui-selected');
                $(this).parent().addClass('ui-selected');
            });
            $(document).on('mouseenter', '.gallery-items .item > img', function(e) {
                // e.stopPropagation();
                $('.gallery-items .item .gallery-paste-icon').remove();
                var s = '<div class="item-ctrl"></div>',
                    $ctrl = $(s);
                if($(this).parent().find('.item-ctrl').length == 0)
                    $(this).parent().append($ctrl);
            });
            $(document).on('mouseleave', '.gallery-items .item', function(e) {
                $(this).find('.item-ctrl').remove();
                $('.gallery-paste-icon').remove();
            });

            $(document).on('click','.gallery-items .item .gallery-paste-icon', function(e) {
                e.stopPropagation();
                ($.gallery.seqs).push($(this).parents('.item').attr('data-seq'));
                if(($.gallery.copy).length) $.gallery.cp();
                if(($.gallery.move).length) $.gallery.mv();
            });

            $(document).on('click', '.gallery-items .item input', function(e) {
                e.stopPropagation();
                $('.gallery-items .toolbar.mod-gallery').remove();
            });

            $(document).on('keypress click', '.gallery-items .item .item-ctrl', function(e) {
                $('.gallery-blocks .btn-group').removeClass('open');
                var key = e.keyCode || e.which,
                    seq = $(this).parent().attr('data-seq'),
                    seq_idx = ($.gallery.seqs).indexOf(seq);
                if(e.ctrlKey) {
                    if(seq_idx > -1) {
                        $(this).parents().removeClass('ui-selected');
                        ($.gallery.seqs).splice(seq_idx,1);
                    } else {
                        $(this).parent().addClass('ui-selected');
                        $.gallery.seqs.push(seq);
                    }
                } else if(e.shiftKey) {
                    if(($.gallery.seqs).length > 0) {
                        var seq_start = $('.gallery-items .item[data-seq="' + $.gallery.seqs[0] + '"]').index(),
                            seq_end = $(this).parent().index();
                        $.gallery.seqs = [];
                        $('.gallery-items .item').removeClass('ui-selected');
                        // console.log(seq_start,seq_end);
                        var start = 0, end = 0;
                        if(seq_start<seq_end) {
                            for(var i=seq_start; i<=seq_end; i++) {
                                var $shifted_item = $('.gallery-items .item');
                                $shifted_item.eq(i).addClass('ui-selected');
                                $.gallery.seqs.push($shifted_item.eq(i).attr('data-seq'));
                            }
                        } else {
                            for(var i=seq_start; i>=seq_end; i--) {
                                var $shifted_item = $('.gallery-items .item');
                                $shifted_item.eq(i).addClass('ui-selected');
                                $.gallery.seqs.push($shifted_item.eq(i).attr('data-seq'));
                            }
                        }
                    }
                } else {
                    $.gallery.seqs = []; 
                    $.gallery.seqs.push(seq);
                    $('.gallery-items .item').removeClass('ui-selected return');
                    // $(this).parent().removeClass('move').removeClass('copy');
                    $(this).parent().addClass('ui-selected');

                    // cut, copy remove
                    var i = ($.gallery.copy).indexOf(seq);
                    if(i !== -1) ($.gallery.copy).splice(i,1);

                    var i = ($.gallery.move).indexOf(seq);
                    if(i !== -1) ($.gallery.move).splice(i,1);
                }
                var l = ($(this).index()%7 > 3) ? 'right' : '',
                    mode = $('.gallery-add-items').attr('data-mode');

                if(typeof mode == 'undefined' || !mode) {
                    alert('Undefined gallery mode');
                    return false;
                }
                $(this).parents('.gallery-items').find('.toolbar.mod-gallery').remove();
                // var str = '', cmd = '';
                // if(($.gallery.move).length || ($.gallery.copy).length) {
                //     str = '붙여넣기'; cmd = 'paste';
                // } else {
                //     str = '잘라내기'; cmd = 'move';
                // }

                var seq = $(this).parent().attr('data-seq'),
                    pid = $(this).parent().attr('data-pid'),
                    link = $(this).parent().attr('data-link'),
                    target = $(this).parent().attr('data-target'),
                    visible = $(this).parent().attr('data-visible');

                var vstr = (visible == '1') ? $.lang[LANG]["editor.gallery.icon.visible.on"] : $.lang[LANG]["editor.gallery.icon.visible.off"],
                    vicon = (visible == '1') ? 'cl_icon_hide02' : 'cl_icon_show';
                var s = '\
                    <ul>\
                        <li class="active gallery-item-edit">\
                            <i class="" data-glseq="' + seq + '" data-cmd="edit"></i>' + $.lang[LANG]['editor.block.gallery.item.edit'] + '\
                        </li>\
                    ';
                s = s + '<li><i class="" data-glseq="' + seq + '" data-cmd="copy"></i>' + $.lang[LANG]['editor.gallery.icon.clone'] + '</li>';

                s = s + '<li class="toolbar-sort item-sort">' + $.lang[LANG]['editor.gallery.icon.order'] + ' <i class="fa fa-caret-down" aria-hidden="true" data-glseq="" data-cmd="item-sort"></i>\
                            <ul class="item-submenu">\
                                <li class="sort-top">' + $.lang[LANG]['editor.gallery.icon.order.front'] + '</li>\
                                <li class="sort-bottom">' + $.lang[LANG]['editor.gallery.icon.order.end'] + '</li>\
                            </ul>\
                        </li>';
                s = s + '<li class="toolbar-category"><i class="" data-glseq="" data-cmd="category"></i>' + $.lang[LANG]['editor.block.gallery.category.change'] + ' <i class="fa fa-caret-down" aria-hidden="true"></i>';
                s = s + '<ul class="item-submenu">' + $.gallery.cates + '</ul>';
                s = s + '</li>';
                
                s = s + '\
                        <li><i class="" data-glseq="' + seq + '" data-glink="' + link + '" data-glink-target="' + target + '" data-cmd="link"></i>' + $.lang[LANG]['editor.gallery.icon.link'] + '</li>\
                ';
                        
                s = s + '\
                        <li><i class="" data-glseq="' + seq + '" data-visible="' + visible + '" data-cmd="visible">' + vstr + '</i></li>\
                        <li><i class="" data-glseq="' + seq + '" data-cmd="delete"></i>' + $.lang[LANG]['editor.gallery.icon.delete'] + '</li>\
                    </ul>\
                ';
                var $tool_back = $('<div class="toolbar mod-gallery ' + l + '">' + s + '</div>');
                $(this).parents('.container').find('.gallery-toolbar').empty();
                $(this).parents('.container').find('.gallery-toolbar').append($tool_back);
                
                // $(this).parent().prev().append($tool_back);
                $.gallery.selected();
                stickyToolbar();
                $.gallery.setNumber();
            });

            $(document).on('click','.gallery-modal .check-all', function(e) {
                e.stopPropagation();
                var check = $(this).prop('checked');
                if(check) {
                    $('.table-item .td-check input').prop('checked',true);
                    $('.table-item').addClass('ui-selected');
                    $.each($('.table-item'), function(i,v) {
                        $.gallery.seqs.push($(this).attr('data-seq'));
                    });
                    $('.gallery-toolbar .toolbar-cmd').removeClass('hide');
                    $('.table-col').css('z-index','1').css('width','100%');
                    $('.check-all').prop('checked',true);
                    stickyToolbar();
                } else {
                    $('.table-item .td-check input').prop('checked',false);   
                    $('.table-item').removeClass('ui-selected return');
                    $('.gallery-toolbar .toolbar-cmd').addClass('hide');
                    $('.table-col').css('z-index','2').css('width','100%');
                    $('.check-all').prop('checked',false);
                    $.gallery.seqs = [];
                }
                $.gallery.setNumber();
            });
            $(document).on('click','.gallery-view-count', function(e) {
                e.stopPropagation();
                $(this).toggleClass('open');
                if($(this).hasClass('open')) {
                    $(this).find('.view-submenu').show();
                } else $(this).find('.view-submenu').hide();
            });
            $(document).on('click','.gallery-view-count li', function(e) {
                $('.gallery-view-count li').removeClass('active');
                $(this).addClass('active');
            });
            $(document).on('click','.gallery-move', function(e) {
                $('.gallery-move-list').removeClass('not-selected');
                $('.move-alert').text('');
                $('.gallery-move').removeClass('active');
                $(this).toggleClass('active');
            });
            $(document).on('click', '.gallery-modal .toolbar li', function(e) {
                e.stopPropagation();
                var cmd = $(this).find('i').attr('data-cmd'),
                    mode = $('.gallery-add-items').attr('data-mode'),
                    seq = $(this).find('i').attr('data-glseq'),
                    sub = ($(this).parent().hasClass('item-submenu')) ? true : false;

                if(typeof cmd == "undefined" && sub == false && !$(this).hasClass('disabled')) {
                    $('.item-submenu').hide();
                    $('.submenu').removeClass('open');
                    var $submenu = $(this).find('.item-submenu'),
                        display = $submenu.css('display');
                    (display == 'none') ? $submenu.css('display','block') : $submenu.css('display','none');
                    return;
                }
                if($(this).hasClass('disabled')) {
                    if($(this).hasClass('gallery-item-edit')) {
                        $(this).showModalFlat($.lang[LANG]["config.information"], $.lang[LANG]['editor.gallery.select.items.info'], true, false, '', 'ok','','cl-p130 cl-cmmodal cl-s-btn w560 cl-p0 cl-okbtn-pbt70');
                    }
                    return false;
                }
                if(($.gallery.seqs).length == 0 && cmd != 'checkall') {
                    $(this).showModalFlat($.lang[LANG]["config.information"], $.lang[LANG]["editor.gallery.select.item"], true, false,'','ok', '', 'cl-p130 cl-cmmodal cl-s-btn w560 cl-p0 cl-okbtn-pbt70');
                    return false;
                }
                switch(cmd) {
                    case "item-sort":
                        $(this).toggleClass('open');
                        $('.item-submenu').hide();
                        if($(this).hasClass('open')) {
                            $(this).find('.item-submenu').show();
                        }
                        $('.toolbar-category').removeClass('open');
                        $('.toolbar-category .item-submenu').hide();
                        break;
                    case "category":
                        $(this).toggleClass('open');
                        $('.item-submenu').hide();
                        if($(this).hasClass('open')) {
                            $(this).find('.item-submenu').show();
                        }
                        $('.toolbar-sort').removeClass('open');
                        $('.toolbar-sort .item-submenu').hide();
                        if(($.gallery.seqs).length == 1) {
                            var s = ($('.table-item').length) ? $('.table-item[data-seq="' + $.gallery.seqs[0] + '"]').attr('data-category') : $('.gallery-items .item[data-seq="' + $.gallery.seqs[0] + '"]').attr('data-category');
                            if(s) {
                                var c = s.substring(1, s.length-1),
                                    a = c.split('|,|');
                                if(a.length) {
                                    $.each(a, function(i,v) {
                                        $('.toolbar-category .item-submenu li:contains("' + v + '")').each(function() {
                                            if($(this).text().trim() == v) $(this).addClass('active');
                                        });
                                        // $('.toolbar-category .item-submenu li:contains("' + v + '")').addClass('active');
                                    });
                                }
                            }
                        } else {
                            $('.toolbar-category .item-submenu li').removeClass('active');
                        }
                        break;
                    case "checkall": 
                        var check = $(this).find('input').prop('checked');
                        if(check) {
                            $('.table-item input').prop('checked',true);
                            $('.table-item').addClass('ui-selected');
                            $.each($('.table-item'), function(i,v) {
                                $.gallery.seqs.push($(this).attr('data-seq'));
                            });
                            stickyToolbar();
                        } else {
                            $('.table-item input').prop('checked',false);   
                            $('.table-item').removeClass('ui-selected return');
                            $.gallery.seqs = [];
                        }
                        break;
                    case "edit": 
                        ($.gallery.mode == 'shopping') ? $.products.add(seq) : galleryItemController(seq); break;
                    case "copy": 
                        $.gallery.copy = $.gallery.seqs; $.gallery.move = []; $.gallery.delete = []; // $.gallery.seqs = [];
                        $('.gallery-items .item').removeClass('move');
                        $('.gallery-items .toolbar.mod-gallery').remove();
                        $.gallery.cp();
                        break;
                    case "move":
                        $.gallery.move = $.gallery.seqs; $.gallery.copy = []; $.gallery.delete = []; $.gallery.seqs = [];
                        $('.gallery-items .item').removeClass('copy');
                        $('.gallery-items .toolbar.mod-gallery').remove();
                        var content = '<ul class="gallery-move-list ui-sortable">',
                            gallery_count = 0;
                        $.each($.gallery.blocks, function(i,v) {
                            $.each(v, function(m, s) {
                                if(s.length) {
                                    content+= '<li>' + m + '</li>';
                                    $.each(s, function(k,n) {
                                        if(n.id == $.gallery.block_id) return true;
                                        switch(n.mode) {
                                            case 'shopping': icon = '<svg class="shopping" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 14"><path d="M9.82 2C9.4 0.84 8.3 0 7 0H6C4.7 0 3.6 0.84 3.18 2H0v12h13V2H9.82zM6 1h1c0.74 0 1.37 0.41 1.72 1H4.28C4.63 1.41 5.26 1 6 1zM12 13H1V3h2v3h1V3h5v3h1V3h2V13z"/></svg>　'; break;
                                            case 'project' : icon = '<svg class="project" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13 0H3v3H0v13h13v-3h3V3L13 0zM13 1.41L14.59 3H13V1.41zM1 15V4h8v3h3v8H1zM10 4.41L11.59 6H10V4.41zM15 12h-2V6l-3-3H4V1h8v3h3V12z"/><rect x="3" y="9" width="7" height="1"/><rect x="3" y="12" width="7" height="1"/></svg>　'; break;
                                            case 'gallery' : icon = '<svg class="gallery" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13"><path d="M0 0v13h13V0H0zM12 1v7.29l-2-2 -2 2 -4-4 -3 3V1H12zM1 12V8.71l3-3 4 4 2-2 2 2V12H1z"/><circle cx="10" cy="3" r="1"/></svg>　'; break;
                                        }
                                        content+= '<li class="gallery-move" data-gallery-id="' + n.id + '">' + icon + '<span class="gallery-block-name">' + n.name + '</span><span class="f-right gallery-name-edit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M15.41 0.76l-0.17-0.17C14.85 0.2 14.34 0 13.83 0s-1.02 0.2-1.41 0.59L1 12l-1 4 4-1L15.41 3.59C16.2 2.8 16.2 1.54 15.41 0.76zM3.49 14.1l-2.11 0.53 0.53-2.11 8.95-8.95 1.59 1.59L3.49 14.1zM14.71 2.88l-1.56 1.56 -1.59-1.59 1.56-1.56C13.31 1.1 13.56 1 13.83 1s0.52 0.1 0.71 0.29l0.17 0.17C15.1 1.85 15.1 2.49 14.71 2.88z"/></svg></span></li>';
                                        gallery_count++;
                                    });
                                }
                            });
                        });
                        if(gallery_count == 0) {
                            content+= "<li>" + $.lang[LANG]['editor.block.gallery.item.move.none'] + "</li>";
                        }
                        content+= "</ul><div class='move-alert error'></div>";

                        if(gallery_count) {
                            content+= '\
                            <div class="gallery-confirm-str">' + $.lang[LANG]['editor.block.gallery.item.move.after'] + '</div>\
                            <div class="gallery-confirm-select">\
                                <div class="gallery-move-select radio">\
                                  <label><input type="radio" name="gallery_move_info" class="gallery-move-info" value="stay" checked>' + $.lang[LANG]['editor.block.gallery.item.move.after.1'] + '</label>\
                                </div>\
                                <div class="gallery-move-select radio">\
                                  <label><input type="radio" name="gallery_move_info" class="gallery-move-info" value="move">' + $.lang[LANG]['editor.block.gallery.item.move.after.2'] + '</label>\
                                </div>\
                            </div>\
                            ';
                        }

                        var moveModal = $(this).showModalFlat($.lang[LANG]['editor.block.gallery.item.move.title'], $.lang[LANG]['editor.block.gallery.item.move.select.1'] + ($.gallery.move).length + $.lang[LANG]['editor.block.gallery.item.move.select.2'] + content, true, true, function() {
                            $('.gallery-move-list').removeClass('not-selected');
                            $('.move-alert').text('');

                            var $active = $('.gallery-move.active');
                            if($active.length == 0 && gallery_count > 0) {
                                $('.gallery-move-list').addClass('not-selected');
                                $('.move-alert').text($.lang[LANG]['editor.block.gallery.item.move.error']);
                                return false;
                            }
                            var block_id = $active.attr('data-gallery-id'),
                                isMove = $("input.gallery-move-info:checked").val();
                            if(typeof block_id == "undefined") {
                                $('.move-alert').text($.lang[LANG]['editor.block.gallery.error']);
                                return false;
                            }
                            moveModal.modal('hide');
                            var move_block_id = (isMove == "stay") ? $.gallery.block_id : block_id;
                            $.progressON($.lang[LANG]['editor.block.gallery.moving.str.1']);
                            var total = ($.gallery.move).length, 
                                moving = $.lang[LANG]['editor.block.gallery.moving.str.2'], 
                                progress = 0,
                                loading = '<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i> ',
                                done = 0,
                                group = ($('.table-item').length) ? '.table-item' : '.gallery-items .item',
                                item = $(group).length,
                                cpage = ($.gallery.mode == 'shopping') ? Math.ceil(item/20) : Math.ceil(item/27),
                                spos = $('.gallery-modal').scrollTop();
                                seqs = $.gallery.move;

                            $('.progressModal .info1').html(loading + moving);
                            $.each($.gallery.move,function(i,v) {
                                var t = setTimeout(function() {
                                    if(CANCEL) {
                                        if(ABORT) {
                                            // 리스트 갱신 작업
                                            $.gallery.show($.gallery.block_id,cpage,'', function() {
                                                setTimeout(function() { 
                                                    $.gallery.move = [];
                                                    $('.gallery-modal').scrollTop(spos); 
                                                    $.processOFF();
                                                    $.gallery.update = true;
                                                }, 500);
                                            });
                                            ABORT = false;
                                            $.progressOFF();
                                        }
                                        i=0; return false;
                                    }
                                    galleryMoveItem(block_id,v,$.gallery.pages[block_id],function() {
                                        done++;
                                        progress = parseInt((done / total) * 100,10);
                                        $('.file-upload-progress .progress-bar').css('width',progress + "%");
                                        $('.progressModal .info2').text(done.toString() + ' / ' + total.toString());
                                        if(total == done) {
                                            $.gallery.show(move_block_id,1,'', function() {
                                                var group = ($('.table-item').length) ? '.table-item' : '.gallery-items .item';
                                                $.each($.gallery.move, function(i,v) {
                                                    $(group + '[data-seq="' + v + '"]').addClass('return');
                                                });
                                                setTimeout(function() { 
                                                    $.gallery.move = [];
                                                    $('.gallery-modal').scrollTop(spos); 
                                                    $.progressOFF();
                                                    $.gallery.update = true;
                                                }, 500);
                                            });
                                        } else {
                                            moving = $(group + '[data-seq="' + seqs[i+1] + '"] .td-title').text();
                                            if(moving == "") moving = $.lang[LANG]['editor.block.gallery.moving.str.2'];
                                            $('.progressModal .info1').html(loading + moving);
                                        }
                                    });
                                },500*i);
                            });                            
                        },'cancel', 'ok', 'cl-cmmodal cl-s-btn w560 cl-p70 cl-p0',true,'','',function() {
                            $.gallery.seqs = $.gallery.move;
                        });

                        break;
                    case "paste":
                        if(($.gallery.copy).length) $.gallery.cp();
                        if(($.gallery.move).length) $.gallery.mv();
                        break;
                    case "delete":
                        $.gallery.delete = $.gallery.seqs; $.gallery.move = []; $.gallery.copy = [];
                        $('.gallery-items .toolbar.mod-gallery').remove();
                        $.gallery.del();
                        break;
                    case "visible":
                        var seq = $(this).find('i').attr('data-glseq'),
                            visible = $(this).find('i').attr('data-visible');
                        visible = (visible == 1) ? 0 : 1;

                        $.post('/template/gallery/visible', { s: $.gallery.seqs, view: visible }, function (data) {
                            checkError(data);
                        },'json');
                        // showPageCallback(showPage);
                        var type = getElementType(),
                            checked = (visible) ? false : true;
                        setLogs(type,'gallery.item.visible.'+checked,'visible-'+checked,type);

                        $.each($.gallery.seqs, function(i,v) {
                            if($('.table-item').length) {
                                (visible == '1') ? $('.gallery-items .table-item[data-seq="' + v + '"]').addClass('invisible').attr('data-visible','1')
                                                 : $('.gallery-items .table-item[data-seq="' + v + '"]').removeClass('invisible').attr('data-visible','0');
                            } else {
                                (visible == '1') ? $('.gallery-items .item[data-seq="' + v + '"]').addClass('invisible').attr('data-visible','1')
                                                 : $('.gallery-items .item[data-seq="' + v + '"]').removeClass('invisible').attr('data-visible','0');
                            }
                        });

                        (visible == '1') ? $(this).find('i').attr('data-visible','1') : $(this).find('i').attr('data-visible','0');
                        (visible == '1') ? $('.gallery-modal .toolbar li > i[data-cmd="visible"]').text($.lang[LANG]["editor.gallery.icon.visible.on"])
                                         : $('.gallery-modal .toolbar li > i[data-cmd="visible"]').text($.lang[LANG]["editor.gallery.icon.visible.off"]);
                        // $('.gallery-items .toolbar').empty();
                        // galleryStatusInit();
                        $.gallery.update = true;
                        // $.gallery.reset();

                        break;
                    case "link":
                        var config_icon = ($(this).hasClass('gl-item-link')) ? 'gl-item-link' : 'gallery-item-link-icon',
                            seq = $(this).find('i').attr('data-glseq'),
                            glink = $(this).find('i').attr('data-glink'),
                            is_glink_target = $(this).find('i').attr('data-glink-target'),
                            glmode = $('.gallery-modal').attr('data-mode'),
                            glpid = $('.gallery-modal').attr('data-pid'),
                            glel = $('.'+selectEL),
                            prev_glink = '', input_glink = '',
                            target_check = (typeof is_glink_target != 'undefined' && is_glink_target == '_blank') ? 'checked' : '',
                            link_content = '';

                        var group = ($('.table-item').length) ? '.table-item' : '.gallery-items .item';
                        $select_glink = $('.gallery-item[data-seq="'+seq+'"]').find('a');
                        if(typeof glink != 'undefined' && glink) {
                            if($select_glink.attr('data-user-link')) {
                                prev_glink = glink;
                            } else if ($select_glink.attr('attr-bookmark')) {
                                prev_glink = $select_glink.attr('href');
                            } else if ($select_glink.attr('attr-flink')) {
                                prev_glink = 'flink@' + $select_glink.attr('attr-flink');
                            } else if ($select_glink.attr('attr-link')) {
                                prev_glink = $select_glink.attr('attr-link');
                            } else {
                                prev_glink = glink;
                            }
                        }

                        link_content = '<ul class="link-content gallery edit-link-Content" data-type="' + glmode + '" data-name="' + glel.attr('data-name') + '">\
                                        ' + makeLinkList(SMENU,'gallery',glel.attr('data-name'),glink);
                        link_content = link_content + '\
                            </ul>\
                            <div class="link-target">\
                                <div class="newcheckbox hand ">\
                                    <label>\
                                        <div class="newcheckboxSvg">\
                                            <input type="checkbox" class="img-link-target" id="linktarget-onoff" '+target_check+' data-el="'+selectEL+'" />\
                                            <svg viewBox="0 0 16 16" width="16" height="16">\
                                                <path class="st6" d="M3 0h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H3c-1.66 0-3-1.34-3-3V3C0 1.34 1.34 0 3 0z"/>\
                                                <path class="st19" d="M13 1c1.1 0 2 0.9 2 2v10c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2H13M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0L13 0z"/>\
                                            </svg>\
                                            <svg class="active" viewBox="0 0 16 16" width="16" height="16">\
                                                <rect x="2" y="2" class="st6" width="12" height="12"/>\
                                                <path  class="st19" d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/>\
                                            </svg>\
                                        </div>\
                                        <span>'+ $.lang[LANG]['editor.link.open.target'] +'</span>\
                                    </label>\
                                </div>\
                            </div>\
                        \
                        ';

                        var modal = $(this).showModalFlat($.lang[LANG]['editor.link.modal.title.gallery'], link_content, true, true, function() {
                            var input_type = $('.link-content').find('.link-type.active').children().attr('class');
                            var result = getInputLink(input_type);
                                link = result[0], isOkay = result[1], isActive = result[2], 
                                target_val = '', target_change = '';

                            target_val = ($('#linktarget-onoff').prop('checked')) ? '_blank' : '';
                            target_change = (((target_check=='checked') ? 'on' : 'off') == ((target_val=='_blank') ? 'on' : 'off')) ? false : true;

                            if(isOkay) {
                                $.each($.gallery.seqs, function(i,v) {
                                    if((isActive && prev_glink==link || isActive==false && prev_glink=='') && !target_change && ($.gallery.seqs).length == 1) {
                                        modal.modal('hide'); 
                                        return true;
                                    }

                                    var gsettings = {
                                        'glink' : Base64.encode(link),
                                        'glink_target' : target_val
                                    }
                                    $.post('/template/settings', {sid: SID, settings: JSON.stringify(gsettings), el: 'gallery_settings', seq: v}, function(data) {
                                        checkError(data);

                                        $select_glink.removeAttr('data-gallery').removeAttr('data-user-link').removeAttr('attr-link').removeAttr('attr-bookmark').removeAttr('attr-flink');
                                        $select_glink_config = $('#el-property[data-element="'+selectEL+'"] #gallery-list-config');

                                        if(link) {
                                            var gallery_link = makeLinkUrl(link, ONE, VIEW);

                                            $select_glink.attr('href',gallery_link);
                                            // IE ERROR_includes__H.20210603
                                            // if(MENULIST.includes(link.replace(/ /g,'-'))) {
                                            if($.inArray(link.replace(/ /g,'-'),MENULIST) > -1) {
                                                $select_glink.attr('data-user-link',gallery_link);
                                            } else if(link.match(/^\@/g) !== null) {
                                                $select_glink.attr('attr-bookmark',link.replace(/^\@/g,''));
                                            } else if(link.match(/^flink\@/g) !== null) {
                                                $select_glink.attr('attr-flink',link.replace(/^flink\@/g,''));
                                            }else {
                                                $select_glink.attr('attr-link',link);
                                            }

                                            $select_glink_config.find('.gl-item-link[data-glseq="'+v+'"]').attr('data-glink',link).addClass('active');
                                            if(config_icon == 'gallery-item-link-icon') $('.gallery-item-link-icon[data-glseq="'+v+'"]').attr('data-glink',link);
                                            
                                        } else {
                                            $select_glink_config.find('.gl-item-link[data-glseq="'+v+'"]').attr('data-glink',link).removeClass('active');
                                            if(config_icon == 'gallery-item-link-icon') $('.gallery-item-link-icon[data-glseq="'+v+'"]').attr('data-glink',link);
                                            var imgURL =  $('.gallery-item[data-seq="' + v + '"]').find('img').prop('src');
                                            if(glmode == 'gallery' || glmode == 'shopping') {
                                                if((typeof imgURL=='undefined' || !imgURL) && glmode == 'gallery') {
                                                    var imgURL_popup = $('.ui-selectee[data-seq="' + v + '"]').find('img').prop('src');
                                                    imgURL = imgURL_popup.split('=')[0] + '=s0';
                                                }
                                                $select_glink.attr({'href': imgURL ,'data-gallery': '#gframe-' + glpid});
                                            } else {
                                                $select_glink.removeAttr('data-gallery');
                                                $select_glink.attr('href', '/'+CONFIG_URL+'config/page/' + PAGE + '/view/' + v);
                                            }

                                        }

                                        $(group + '[data-seq="' + v + '"]').attr('data-link',Base64.decode(data.data.glink)).attr('data-target',data.data.glink_target).find('.toolbar li i[data-cmd="link"]').attr('data-glink',data.data.glink).attr('data-glink-target',data.data.glink_target);
                                        $('.toolbar-link i').attr('data-glink',Base64.decode(data.data.glink)).attr('data-glink-target',data.data.glink_target);
                                        $('.cl_icon_link').attr('data-glink',data.data.glink).attr('data-glink-target',data.data.glink_target);

                                        if(data.data.glink == '') {
                                            $('.gallery-items .item[data-seq="' + v + '"]').find('.info').remove();
                                            $('.gallery-items .table-item[data-seq="' + v + '"]').find('.info-link').remove();
                                        }
                                        else {
                                            if($('.gallery-items .item[data-seq="' + v + '"]').find('.info-link').length == 0) {
                                                // $('.gallery-items .item[data-seq="' + v + '"]').find('.info').append('<span class="info-link"><svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M6 9.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l3-3c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-3 3C6.44 9.77 6.22 9.85 6 9.85z"/><path d="M3.85 15c-1.03 0-2-0.4-2.72-1.13C0.4 13.15 0 12.18 0 11.15s0.4-2 1.13-2.72l2-2C3.46 6.1 4 6.1 4.33 6.43c0.33 0.33 0.33 0.87 0 1.2l-2 2c-0.41 0.41-0.63 0.95-0.63 1.52s0.22 1.11 0.63 1.52c0.81 0.81 2.23 0.81 3.04 0l2-2c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-2 2C5.85 14.6 4.88 15 3.85 15z"/><path d="M11.2 8.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c0.41-0.41 0.63-0.95 0.63-1.52s-0.22-1.11-0.63-1.52c-0.81-0.81-2.23-0.81-3.04 0L7.56 4.36c-0.33 0.33-0.87 0.33-1.2 0 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c1.45-1.46 3.99-1.46 5.44 0C14.6 1.82 15 2.78 15 3.81s-0.4 2-1.13 2.72L11.8 8.61C11.64 8.77 11.42 8.85 11.2 8.85z"/></svg></span>');
                                                $('.gallery-items .item[data-seq="' + v + '"]').append('<div class="info"><span class="info-link"><svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M6 9.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l3-3c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-3 3C6.44 9.77 6.22 9.85 6 9.85z"/><path d="M3.85 15c-1.03 0-2-0.4-2.72-1.13C0.4 13.15 0 12.18 0 11.15s0.4-2 1.13-2.72l2-2C3.46 6.1 4 6.1 4.33 6.43c0.33 0.33 0.33 0.87 0 1.2l-2 2c-0.41 0.41-0.63 0.95-0.63 1.52s0.22 1.11 0.63 1.52c0.81 0.81 2.23 0.81 3.04 0l2-2c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-2 2C5.85 14.6 4.88 15 3.85 15z"/><path d="M11.2 8.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c0.41-0.41 0.63-0.95 0.63-1.52s-0.22-1.11-0.63-1.52c-0.81-0.81-2.23-0.81-3.04 0L7.56 4.36c-0.33 0.33-0.87 0.33-1.2 0 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c1.45-1.46 3.99-1.46 5.44 0C14.6 1.82 15 2.78 15 3.81s-0.4 2-1.13 2.72L11.8 8.61C11.64 8.77 11.42 8.85 11.2 8.85z"/></svg></span></div>');
                                            }
                                            if($('.gallery-items .table-item[data-seq="' + v + '"] .td-img .info-link').length == 0) {
                                                $('.gallery-items .table-item[data-seq="' + v + '"]').find('.td-img').append('<span class="info-link"><svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M6 9.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l3-3c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-3 3C6.44 9.77 6.22 9.85 6 9.85z"/><path d="M3.85 15c-1.03 0-2-0.4-2.72-1.13C0.4 13.15 0 12.18 0 11.15s0.4-2 1.13-2.72l2-2C3.46 6.1 4 6.1 4.33 6.43c0.33 0.33 0.33 0.87 0 1.2l-2 2c-0.41 0.41-0.63 0.95-0.63 1.52s0.22 1.11 0.63 1.52c0.81 0.81 2.23 0.81 3.04 0l2-2c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-2 2C5.85 14.6 4.88 15 3.85 15z"/><path d="M11.2 8.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c0.41-0.41 0.63-0.95 0.63-1.52s-0.22-1.11-0.63-1.52c-0.81-0.81-2.23-0.81-3.04 0L7.56 4.36c-0.33 0.33-0.87 0.33-1.2 0 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c1.45-1.46 3.99-1.46 5.44 0C14.6 1.82 15 2.78 15 3.81s-0.4 2-1.13 2.72L11.8 8.61C11.64 8.77 11.42 8.85 11.2 8.85z"/></svg></span>');
                                            }
                                        }

                                        if(target_val == '_blank') $select_glink.attr('target','_blank');
                                        else $select_glink.removeAttr('target');
                                        
                                        // if(target_change) {
                                        //     if(target_val) $select_glink.attr('target',target_val);
                                        //     else $select_glink.removeAttr('target');
                                        //     // $select_glink_config.find('.gl-item-link[data-glseq="'+seq+'"]').attr('data-glink-target',target_val);
                                        //     // if(config_icon == 'gallery-item-link-icon') $('.gallery-item-link-icon[data-glseq="'+seq+'"]').attr('data-glink-target',target_val);
                                        // }

                                        var log_text = (isActive || !isActive && target_change) ? 'active' : 'broken',
                                            type = getElementType();
                                        setLogs(type,'gallery.link.'+log_text,'link-'+log_text,type);

                                        // galleryStatusInit();
                                    }, 'json');
                                });

                                modal.modal('hide');
                            }
                        } ,'cancel', 'ok', 'cl-cmmodal cl-s-btn w560 cl-p70 cl-p0 cl-edit-link modal-portfolio-link site-popup-link','','',function(){
                            $('[data-toggle="popover"]').popover();
                        });
                        break;
                    default:
                        break;
                }
            });

            $(document).on('click','.gallery-add-items', function(e) {
                var mode = $(this).attr('data-mode');
                if(typeof mode == 'undefined' || !mode) {
                    alert('Undefined gallery mode');
                    return false;
                }
                switch(mode) {
                    case 'shopping' : $.products.add(-1); break;
                    default:
                        $('.resource-useit')
                            .removeAttr('data-property')
                            .removeAttr('data-element')
                            .attr('data-replace-count','0');
                        selectCount = 0;
                        selectID = $('.gallery-modal').attr('data-pid');
                        $.resource.open();
                        break;
                }
            });

            $(document).on('blur','.item-title', function(e) {
                var title = $(this).val().trim(),
                    s = $(this).attr('data-title'),
                    seq = $(this).attr('data-seq'),
                    caption = $(this).attr('data-caption'),
                    hashtag = $(this).attr('data-hashtag'),
                    category = $(this).attr('data-category'),
                    datetime = $(this).attr('data-datetime'),
                    thumb = $(this).attr('data-url'),
                    file = (thumb.indexOf('googleusercontent') > -1) ? thumb : thumb.replace(/^.*[\\\/]/, ''),
                    $gitem = $('.'+selectEL).find('.gallery-item[data-seq="'+seq+'"]'),
                    pathinfo = thumb.split('/');

                if($gitem.length == 0) {
                    if($(this).parents('.gallery-modal').attr('data-mode')=='gallery') {
                        $gitem = $('.gallery-popup').find('.gallery-item[data-seq="'+seq+'"]');
                    }
                }

                if(title != s && title) {
                    if(typeof seq == 'undefined' || !seq) {
                        alert('Invalid item');
                        return false;
                    }

                    $gitem.find('[data-gallery]').attr({'data-title':title});
                    if($('.gallery-items .item').length < 3) $('.gallery-popup').find('.gallery-item[data-seq="'+seq+'"]').find('[data-gallery]').attr({'data-title':title});
                    var type = getElementType(),
                        s = '';
                    if(pathinfo[4]!= 'free') s = 'false';
                    else {
                        var p = pathinfo.slice(1,6);
                        p.unshift('');
                        p.push('');
                        s = p.join('/');
                    }

                    $.post('/template/update/type/gallery',{ s: seq, id : SID, title : title, caption : caption, datetime : datetime, hashtag : hashtag, category : category, file : file, storage : s}, function(data) {
                        var isCheck = checkError(data);
                        if(!isCheck) return false;
                        setLogs(type,'gallery.data.edit','modify',type);
                    }, 'json');    

                    (title.length>0) ? $gitem.find('h5.figure').html(title) :  $gitem.find('h5.figure').text('Title');
                    $(this).attr({'value':title,'data-title':title});
                }
                $('.gallery-items').selectable('enable');
            });

            $(document).on('click', '.prod-button .modal-save, .prod-detail-edit', function(e) {
                var hasEmoji = false;
                $('.prod-input, .prod-input-value').each(function() {
                    var passEmoji = ($.inArray($(this).attr('id'),['prod-title', 'prod-desc']) > -1) ? true : false,
                        check_val = ($(this).is('div')) ? $(this).text().trim() : $(this).val().trim();
                    
                    if(!passEmoji && checkEmojis(check_val)) {
                        hasEmoji = true;
                        return false;
                    }
                });
                if(hasEmoji) {
                    e.preventDefault();
                    errorEmojisModal();
                    return false;
                }

                var go = $(this).hasClass('prod-detail-edit') ? true : false;
                // var modal = $(this).showModalFlat('INFORMATION', '편집한 내용 저장 시 실 사이트에도 반영이 됩니다.<br>저장 하시겠습니까?', true, true, function() {
                //     modal.modal('hide');
                    $.products.save(go);
                // });
            });

            $(document).on('click', '.gallery-name', function(e) {
                e.stopPropagation();
                var id = $(this).attr('data-gallery-id');
                if(typeof id == 'undefined') return false;
                $.gallery.block_id = id;
                $('#prod-pid').val(id);
                $.gallery.show($.gallery.block_id);
            });

            $(document).on('click','.gallery-items-loadmore', function(e) {
                var id = $(this).attr('data-pid'),
                    page = Number($(this).attr('data-page')),
                    cate_str = $(this).attr('data-category-str');
                page++;
                $.gallery.list(id,page,cate_str);
            });

            $(document).on('hover','.gallery-items .table-item', function(e) {
                if (e.type == "mouseenter") {
                    $(this).find('.item-handle').show();
                    $(this).find('.item-edit').show();
                } else { // mouseleave
                    $(this).find('.item-handle').hide();
                    $(this).find('.item-edit').hide();
                    $(this).find('.item-edit').find('.item-submenu').hide();
                }
            });

            // $(document).on('click','.item-edit', function(e) {
            //     var seq = $(this).attr('data-seq');
            //     if(typeof seq == 'undefined' || seq == '') {
            //         alert('Undefined product seq!');
            //         return false;
            //     }
            //     $.products.add(seq);
            // });

            $(document).on('click', '.gallery-modal .item-edit li', function(e) {
                $('.item-submenu').hide();
                $('.submenu').removeClass('open');
                var $submenu = $(this).find('.item-submenu'),
                    display = $submenu.css('display');
                (display == 'none') ? $submenu.css('display','block') : $submenu.css('display','none');
                return;
            });
            $(document).on('click', '.gallery-modal .product-item-edit li', function(e) {
                var mode = $(this).attr('data-mode'),
                    seq = $(this).parents('.item-edit').attr('data-seq'),
                    page = $('.gallery-modal').attr('data-page'),
                    config_url = (CONFIG_URL) ? '_config' : 'config';
                if(typeof seq == 'undefined' || seq == '') {
                    alert('Undefined product seq!');
                    return false;
                }
                if(mode == 'prodInfo') {
                    $.products.add(seq);
                } else {
                    location.href = '/'+config_url+'/page/'+page+'/view/'+seq;
                }
            });

            $(document).on('click', '.td-check input', function(e) {
                e.stopPropagation();

                var seq = $(this).parents('.table-item').attr('data-seq'),
                    pid = $(this).parents('.table-item').attr('data-pid'),
                    link = $(this).parents('.table-item').attr('data-link'),
                    target = $(this).parents('.table-item').attr('data-target'),
                    visible = $(this).parents('.table-item').attr('data-visible'),
                    seq_idx = ($.gallery.seqs).indexOf(seq);

                if($(this).is(':checked')) {
                    $(this).parents('.table-item').addClass('ui-selected return');
                    $.gallery.seqs.push(seq);
                    $('.table-col').css('z-index','1');
                } else {
                    if(seq_idx > -1) ($.gallery.seqs).splice(seq_idx,1);
                    $(this).parents('.table-item').removeClass('ui-selected return');
                    if($.gallery.seqs.length == 0) $('.table-col').css('z-index','2');
                }
                var str = '', cmd = '';
                var vstr = (visible == '1') ? $.lang[LANG]['editor.gallery.icon.visible.on'] : $.lang[LANG]['editor.gallery.icon.visible.off'],
                    vicon = (visible == '1') ? 'cl_icon_hide02' : 'cl_icon_show';

                $('.table-toolbar li i[data-cmd="checkall"]').attr('data-glseq',seq);
                $('.table-toolbar li i[data-cmd="item-sort"]').attr('data-glseq',seq);
                $('.table-toolbar li i[data-cmd="copy"]').attr('data-glseq',seq);
                $('.table-toolbar li i[data-cmd="link"]').attr('data-glseq',seq).attr('data-glink',link).attr('data-glink-target',target);
                $('.table-toolbar li i[data-cmd="' + cmd + '"]').attr('data-glseq',seq);
                $('.table-toolbar li i[data-cmd="category"]').attr('data-glseq',seq);
                $('.table-toolbar li i[data-cmd="visible"]').attr('data-glseq',seq).attr('data-visible',visible).text(vstr);
                $('.table-toolbar li i[data-cmd="delete"]').attr('data-glseq',seq);
                stickyToolbar();

                $('.gallery-items .table-item > div').addClass('hide-text');
                $('.table-toolbar > li').removeClass('open').find('.item-submenu').hide();
                $('.gallery-view-count').removeClass('open').find('.view-submenu').hide();

                if($('.gallery-items .table-item.ui-selected').length == 0) {
                    $('.gallery-toolbar .toolbar-cmd').addClass('hide');
                    $('.gallery-items .table-item > div').removeClass('hide-text');
                } else $('.gallery-toolbar .toolbar-cmd').removeClass('hide');
                $.gallery.setNumber();
            }); 
           
            $(document).on('change','.category-onoff-check', function(e) {
                var checked = $(this).prop('checked'),
                    gc = (checked) ? 'ON' : 'OFF',
                    settings = {
                        category_display : gc
                    };
                $.gallery.update = true;
                if(checked) {
                    $('.gallery-category-menu').removeClass('hide');
                    $('.category-title-str').addClass('on');
                    $('.td-category').removeClass('hide');
                } else {
                    $('.gallery-category-menu').addClass('hide');
                    $('.category-title-str').removeClass('on');
                    $('.td-category').addClass('hide');
                }
                $.post('/template/settings', {sid: SID, settings : JSON.stringify(settings), el: $.gallery.block_id}, function(data) {
                    checkError(data);
                    $.gallery.show($.gallery.block_id);
                }, 'json');
                
                var type = getElementType();
                setLogs(type,'gallery.category.' + gc,'toggle-' + gc, type);
            });

            $(document).on('click','.toolbar-category ul.item-submenu li', function(e) {
                if(($.gallery.seqs).length) {
                    $(this).toggleClass('active');
                    var click_cate = $(this).text(),
                        cate_str = $('.toolbar-category ul.item-submenu li.active').map(function() { return $(this).text(); }).get(),
                        text_str = cate_str.join(),
                        data_str = '|' + text_str.replace(/\,/g,'|,|') + '|';

                    $.each($.gallery.seqs, function(i,v) {
                        if($('.gallery-modal').hasClass('shopping')) {
                            $('.table-item[data-seq="' + v + '"]').attr('data-category', data_str).find('.td-category').text(text_str).attr('data-original-title',text_str);
                            
                            if(text_str.indexOf(',') > -1) $('.table-item[data-seq="' + v + '"] .td-category').addClass('line');
                            else $('.table-item[data-seq="' + v + '"] .td-category').removeClass('line');
                        } else {
                            $('.gallery-items .item[data-seq="' + v + '"]').attr('data-category', data_str).find('.td-category').text(text_str);
                        }

                        $.post('/template/gallery/category', { sid : SID, s : cate_str, mode : 'gallery', seq : v }, function(r) {
                            if($('.element[data-id="' + $.gallery.block_id + '"] .gallery-category-nav li:nth-child(1)').hasClass('hide')) {
                                if($('.element[data-id="' + $.gallery.block_id + '"] .gallery-category-nav li.active a').text() == click_cate) {
                                    $.gallery.update = true;
                                }
                            }

                        }, 'json');
                    });
                }
            });

            $(document).on('click','.toolbar-sort ul.item-submenu li', function(e) {
                if(($.gallery.seqs).length) {
                    var group = ($('.table-item').length) ? '.table-item' : '.gallery-items .item';
                    if($(this).hasClass('sort-top')) {
                        $.gallery.drag = $(group).first().attr('data-seq');
                        $.gallery.move = $.gallery.seqs;
                        $.gallery.seqs = [];
                        var modal = $(this).showModalFlat($.lang[LANG]['config.information'],$.lang[LANG]['editor.gallery.move'],true,true,function() {
                            modal.modal('hide');
                            $.gallery.mv();
                        }, 'cancel','ok','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0');
                    } else if($(this).hasClass('sort-bottom')) {
                        if($('.gallery-items-loadmore').length == 0) {
                            var last = $(group).last().attr('data-seq');
                            if($.gallery.seqs[0] == last) {
                                var s = (group == '.gallery-items .item') ? $.lang[LANG]['editor.gallery.select.front.last.1'] : $.lang[LANG]['editor.gallery.select.front.last.2'],
                                    contents2_str = (LANG =='ko') ? $.lang[LANG]['editor.gallery.select.contents.2'] : '';

                                $(this).showModalFlat($.lang[LANG]['config.information'], $.lang[LANG]['editor.gallery.select.contents.1'] + s + contents2_str, true, false, '', 'ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0 cl-okbtn-pbt70');
                                return false;
                            }
                        }

                        var modal = $(this).showModalFlat($.lang[LANG]['config.information'],$.lang[LANG]['editor.gallery.move'],true,true,function() {
                        var item = $(group).length,
                            cpage = ($.gallery.mode == 'shopping') ? Math.ceil(item/20) : Math.ceil(item/27),
                            spos = $('.gallery-modal').scrollTop();

                            modal.modal('hide');
                            $.processON('move gallery item(s)...');
                            $.ajax({
                                url: '/template/gallery/sort-bottom',
                                data: { sid : SID, seq : $.gallery.seqs, block_id : $.gallery.block_id },
                                dataType: 'json',
                                type: 'POST',
                                async: false,
                                cache: false,
                                success: function (data) {
                                    checkError(data);
                                    var p = $.gallery.pages;
                                    $.gallery.show($.gallery.block_id,p.page,'', function() {
                                        $.each(data.seqs, function(i,v) {
                                            $(group + '[data-seq="' + v + '"]').addClass('return');
                                        });
                                        setTimeout(function() { 
                                            $('.gallery-modal').scrollTop(spos); 
                                            $.processOFF();
                                        }, 500);
                                    });
                                    $.gallery.update = true;
                                    $.gallery.reset();
                                    $.processOFF();
                                }
                            });
                        }, 'cancel','ok','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0');
                    }
                }
            });

            $(document).on('click','.view-submenu li', function(e) {
                var view = $(this).attr('data-view'),
                    view = (typeof view == 'undefined') ? 30 : view,
                    settings = {
                        gallery_view : view
                    }
                $.processON();
                $.post('/template/settings',{ sid : SID, el : $.gallery.block_id, settings : JSON.stringify(settings) }, function(data) {
                    checkError(data);
                    $.gallery.show($.gallery.block_id,'','',function() {
                        setTimeout(function() { 
                            $.processOFF();
                        }, 500);
                    });

                },'json');

            });
            // $(document).on('mouseenter', '.gallery-toolbar .toolbar > ul > li', function(e) {
            //     console.log('??');
            //     $('.gallery-modal .toolbar li').removeClass('open');
            //     $('.item-submenu').hide();
            // });
            // $(document).on('click','.submenu', function(e) {
            //     if($(this).hasClass('open')) {
            //         console.log('');
            //         $('.submenu').removeClass('open');
            //         $(this).find('.item-submenu').hide();
            //     } else {
            //         console.log('11');
            //         $(this).addClass('open');
            //         $(this).find('.item-submenu').show();
            //     }
            // });
            $(document).on('click', '.edit-gallery-detail', function(e) {
                var seq = $(this).attr('data-seq');
                var page = $('.gallery-modal').attr('data-page');
                var config_url = (CONFIG_URL) ? '_config' : 'config';
                if(typeof seq == 'undefined') return;
                location.href = '/'+config_url+'/page/' + page + '/view/' + seq;
            });

            $(document).on('click','.gallery-name-edit', function(e) {
                e.stopPropagation();
                $('.gallery-name-edit-input').remove();
                var v = $(this).parents('.gallery-name').text(),
                    s = '<div class="gallery-name-edit-input"><input type="text" class="gallery-name-edit-inputbox" value="' + v.trim() + '"><div class="gallery-name-edit-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><polygon points="12 0.71 11.29 0 6 5.29 0.71 0 0 0.71 5.29 6 0 11.29 0.71 12 6 6.71 11.29 12 12 11.29 6.71 6 "/></svg></div><div class="gallery-name-edit-save"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 10"><path d="M14.29 0L5.5 8.79 0.71 4 0 4.71l5.15 5.15C5.24 9.95 5.37 10 5.5 10s0.26-0.05 0.35-0.15L15 0.71 14.29 0z"/></svg></div></div>';
                $(this).parents('.gallery-name').append(s);

            });

            $(document).on('click','.gallery-name-edit-inputbox',function(e) {
                e.stopPropagation();
            });

            $(document).on('keypress', '.gallery-name-edit-inputbox', function(e) {
                var keyCode = e.keyCode,
                    blockname = $(this).val().trim();

                if(keyCode == 13) {
                    saveGalleryBlockName($(this), blockname);
                }
            });
            $(document).on('click','.gallery-name-edit-save',function(e) {
                e.stopPropagation();
                var blockname = $('.gallery-name-edit-inputbox').val().trim(),
                    $input = $('.gallery-name-edit-inputbox');

                if(checkEmojis(blockname)) {
                    e.preventDefault();
                    var open_el = $(this).closest('.gallery-blocks').find('.btn-group'),
                        focus_el = $(this).closest('.gallery-name-edit-input').find('.gallery-name-edit-inputbox');
                    errorEmojisModal('','',function() {
                        open_el.addClass('open');
                        focus_el.focus();
                    });
                    return false;
                }
                saveGalleryBlockName($input, blockname);
            });
            $(document).on('click','.gallery-name-edit-close',function(e) {
                e.stopPropagation();
                $(this).parents('.gallery-name-edit-input').remove();
            });
        },
        cp : function() {
            var seqs = $.gallery.copy,
                page = $('.gallery-modal').attr('data-page');

            seqs = seqs.reverse();
            if(typeof seqs.length == 0 || seqs == '') {
                alert('Invalid variable');
                return false;
            }
            
            var modal = $(this).showModalFlat($.lang[LANG]['editor.gallery.clone.title'],($.gallery.mode == 'shopping' ? $.lang[LANG]['editor.gallery.shoppingclone'] : $.lang[LANG]['editor.gallery.clone']),true,true,function() {
                var count = seqs.length;

                modal.modal('hide');
                var group = ($('.table-item').length) ? '.table-item' : '.gallery-items .item',
                    item = $(group).length,
                    cpage = ($.gallery.mode == 'shopping') ? Math.ceil(item/20) : Math.ceil(item/27),
                    spos = $('.gallery-modal').scrollTop();

                $.processON('copy gallery item(s)...');
                // console.log('ModalPlugin cp ');
                // console.log(seqs);
                $.ajax({
                    url: '/template/gallery/copy',
                    data: { s: seqs, sid : SID, page : page, block_id : $.gallery.block_id },
                    dataType: 'json',
                    type: 'POST',
                    async: true,
                    cache: false,
                    success: function (data) {
                        checkError(data);
                        // console.log(data);
                        galleryStatusInit();
                        $.gallery.copy = [];
                        var type = getElementType();
                        setLogs(type,'gallery.item.clone','clone',type);

                        $.gallery.show($.gallery.block_id,cpage,$.gallery.category,function() {
                            $.each(data.r, function(i,v) {
                                // console.log(v.seq);
                                $(group + '[data-seq="' + v.seq + '"]').addClass('return');
                            });
                            setTimeout(function() { 
                                $('.gallery-modal').scrollTop(spos); 
                                $.processOFF();
                            }, 500);
                        });
    
                        $.gallery.update = true;                        
                    }
                });
            }, 'cancel','ok','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0');
        },
        mv : function(func) {
            var seqs = $.gallery.move,
                page = $('.gallery-modal').attr('data-page');
            // seqs = seqs.reverse();
            if(typeof seqs.length == 0 || seqs == '') {
                alert('Invalid variable');
                return false;
            }
            clicking = false;
            var group = ($('.table-item').length) ? '.table-item' : '.gallery-items .item';

            if($.gallery.drag) {
                if(($.gallery.drag == seqs[0] || 
                    $.gallery.drag == $(group + '[data-seq="' + seqs[0] + '"]').next().attr('data-seq')) ||
                    $.gallery.drag == $(group + '[data-seq="' + seqs[0] + '"]').next().hasClass('prev')) {
                    if($('.clone-item').length) {
                        $('.clone-item').remove();
                        // $.gallery.seqs = [];
                    } else {
                        if($('.item-sort').hasClass('open')) {
                            var s = (group == '.gallery-items .item') ? $.lang[LANG]['editor.gallery.select.front.first.1'] : $.lang[LANG]['editor.gallery.select.front.first.2'],
                                contents2_str = (LANG =='ko') ? $.lang[LANG]['editor.gallery.select.contents.2'] : '';
                            $.gallery.seqs = $.gallery.move;
                            $(this).showModalFlat($.lang[LANG]['config.information'], $.lang[LANG]['editor.gallery.select.contents.1'] + s + contents2_str, true, false, '', 'ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0 cl-okbtn-pbt70');
                        }
                    }
                    return false;
                }
            }
            var count = seqs.length,
                selected = $.gallery.drag;

            var item = $(group).length
                cpage = ($.gallery.mode == 'shopping') ? Math.ceil(item/20) : Math.ceil(item/27),
                spos = $('.gallery-modal').scrollTop();

            // modal.modal('hide');
            $.processON('move gallery item(s)...');
            $.ajax({
                url: '/template/gallery/move',
                data: { s: seqs, sid : SID, page : page, block_id : $.gallery.block_id, selected : selected, last : $.gallery.last },
                dataType: 'json',
                type: 'POST',
                async: true,
                cache: false,
                success: function (data) {
                    checkError(data);
                    $.gallery.update = true;
                    $.gallery.drag = '';
                    $.gallery.last = '';
                    if(typeof func == 'function') {
                        func();
                    } else {
                        $.gallery.show($.gallery.block_id,cpage,'', function() {
                            $.each(data.seqs, function(i,v) {
                                $(group + '[data-seq="' + v + '"]').addClass('return');
                            });
                            setTimeout(function() { 
                                $('.gallery-modal').scrollTop(spos); 
                                $.processOFF();
                            }, 500);
                        });
                    }

                }
            });
        },
        del : function() {
            var seqs = $.gallery.delete;
                page = $('.gallery-modal').attr('data-page'),
                pid = $('.gallery-modal').attr('data-pid'),
                total = seqs.length,
                title = (LANG == 'ko') ? '갤러리 데이터를 삭제중입니다...' : 'Deleting gallery data...',
                sub_des = (LANG == 'ko') ? '데이터를 삭제중입니다' : 'Deleting',
                loading = '<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i> ';

            if(typeof seqs.length == 0 || seqs == '') {
                alert('Invalid variable');
                return false;
            }   
            var modal = $(this).showModalFlat($.lang[LANG]['config.delete'],$.lang[LANG]['editor.gallery.selected.1'] + (seqs.length) + $.lang[LANG]['editor.gallery.selected.2'] + $.lang[LANG]['editor.gallery.selected.delete'],true,true, function() {
                var count = seqs.length;
                modal.modal('hide');
                $.progressON(title);

                var group = ($('.table-item').length) ? '.table-item' : '.gallery-items .item',
                    item = $(group).length,
                    item = ((item - count) < 0) ? 1 : item - count;
                    cpage = ($.gallery.mode == 'shopping') ? Math.ceil(item/20) : Math.ceil(item/27),
                    spos = $('.gallery-modal').scrollTop(),
                    done = 0;

                $.each(seqs, function(i,v) {
                    $(group + '[data-seq="' + v + '"]').fadeOut(100, function() { $(this).remove(); });

                    var t = setTimeout(function() {
                        if(CANCEL) {
                            if(ABORT) {
                                // 리스트 갱신 작업
                                $.gallery.show($.gallery.block_id,cpage,$.gallery.category, function() {
                                    setTimeout(function() { 
                                        $.gallery.move = [];
                                        $('.gallery-modal').scrollTop(spos); 
                                        $.processOFF();
                                    }, 500);
                                });
                                ABORT = false;
                                $.progressOFF();
                            }
                            i=0; return false;
                        }
                        galleryDeleteItem(v,function(data) {
                            done++;
                            progress = parseInt((done / total) * 100,10);
                            $('.file-upload-progress .progress-bar').css('width',progress + "%");
                            $('.progressModal .info2').text(done.toString() + ' / ' + total.toString());

                            var d = data.data;
                            $.each(d, function(i,o) {
                                blockBookmarkDelete(o.sid,o.seq);
                            });
                            glItemDelete(v,PAGE);

                            if(total == done) {
                                var type = getElementType();
                                setLogs(type,'gallery.item.delete','delete',type);
                                $.gallery.reset();
                                $.gallery.update = true;

                                $.gallery.show($.gallery.block_id,cpage,$.gallery.category, function() {
                                    setTimeout(function() { 
                                        $.gallery.move = [];
                                        $('.gallery-modal').scrollTop(spos); 
                                        $.progressOFF();
                                    }, 500);
                                });
                            } else {
                                moving = $(group + '[data-seq="' + seqs[i+1] + '"] .td-title').text();
                                if(moving == "") moving = sub_des;
                                $('.progressModal .info1').html(loading + moving);
                            }
                        });
                    },500*i);
                });
            }, 'cancel', 'ok', 'cl-cmmodal cl-s-btn w560 cl-p130 cl-p0');
        },
        show : function(id,page,category,func) {
            if(typeof id == 'undefined' || !id) {
                alert('Undefined gallery ID');
                return false;
            }
            if(typeof page =='undefined' || !page) page = 1;
            if(typeof category =='undefined') category = '';
            $.gallery.seqs = [];
            $.gallery.block_id = id;
            $.gallery.category = category;
            $.post('/template/gallery/show', { mode : 'show', id : id, page : page, category : category }, function(data) {
                if(data.error != 'undefined' && data.error) {
                    alert(data.error);
                    return false;
                }

                $.gallery.mode = data.mode;
                var $backdrop = $('<div id="dummy-drop" style="position:fixed;top:0;left:0;right:0;bottom:0;background-color:#fff;z-index:1039;"></div>');
                if($('#dummy-drop').length == 0)
                    $('body').append($backdrop);

                $('.gallery-modal').hide().remove();
                $('#gallery-style').remove();
                $m = $(data.r).hide();
                $('body').append($m);
    
                $('.gallery-modal').attr('data-page',data.page).attr('data-pid',data.pid).attr('data-mode',data.mode).attr('data-category',data.category).attr('data-total',data.total);
                if(data.mode == 'shopping') $('.gallery-modal').addClass('shopping');
                $('#gallery-name').text(data.name);
                $('.gallery-add-items').attr('data-mode',data.mode).attr('data-page',data.page);
                (data.mode == 'shopping') ? $('.gallery-modal-title').text('상품 관리') : $('.gallery-modal-title').text($.lang[LANG]['editor.block.gallery.title']);
                $('.view-submenu li[data-view="' + data.view + '"]').addClass('active');
                $('#gallery_view').text(data.view);
                var icon = '';
                $.gallery.blocks = []; var idx = 0, menu_name = '';
                $.gallery.pages = [];
                $.each(data.lists, function(i,v) {
                    $.gallery.blocks.push(v);
                    $.each(v, function(m, menus) {
                        $('.gallery-blocks ul').append('<li>' + m + '</li>');
                        if(menus.length) {
                            menu_name = m;
                            for(var key in menus) {
                                var value = menus[key];
                                switch(value.mode) {
                                    case 'shopping': icon = '<svg class="shopping" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 14"><path d="M9.82 2C9.4 0.84 8.3 0 7 0H6C4.7 0 3.6 0.84 3.18 2H0v12h13V2H9.82zM6 1h1c0.74 0 1.37 0.41 1.72 1H4.28C4.63 1.41 5.26 1 6 1zM12 13H1V3h2v3h1V3h5v3h1V3h2V13z"/></svg>　'; break;
                                    case 'project' : icon = '<svg class="project" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13 0H3v3H0v13h13v-3h3V3L13 0zM13 1.41L14.59 3H13V1.41zM1 15V4h8v3h3v8H1zM10 4.41L11.59 6H10V4.41zM15 12h-2V6l-3-3H4V1h8v3h3V12z"/><rect x="3" y="9" width="7" height="1"/><rect x="3" y="12" width="7" height="1"/></svg>　'; break;
                                    case 'gallery' : icon = '<svg class="gallery" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13"><path d="M0 0v13h13V0H0zM12 1v7.29l-2-2 -2 2 -4-4 -3 3V1H12zM1 12V8.71l3-3 4 4 2-2 2 2V12H1z"/><circle cx="10" cy="3" r="1"/></svg>　'; break;
                                }
                                $('.gallery-blocks ul').append('<li class="gallery-name ' + ((value.id == id) ? 'active' : '') + '" data-gallery-id="' + value.id + '">' + icon + '<span class="gallery-block-name">' + value.name + '</span><span class="f-right gallery-name-edit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M15.41 0.76l-0.17-0.17C14.85 0.2 14.34 0 13.83 0s-1.02 0.2-1.41 0.59L1 12l-1 4 4-1L15.41 3.59C16.2 2.8 16.2 1.54 15.41 0.76zM3.49 14.1l-2.11 0.53 0.53-2.11 8.95-8.95 1.59 1.59L3.49 14.1zM14.71 2.88l-1.56 1.56 -1.59-1.59 1.56-1.56C13.31 1.1 13.56 1 13.83 1s0.52 0.1 0.71 0.29l0.17 0.17C15.1 1.85 15.1 2.49 14.71 2.88z"/></svg></span></li>');
                                cates = cates + '<li class="gallery-name" data-gallery-id="' + value.id + '">' + value.name + '</li>';
                                // if(value.id == id) $.gallery.blocks[idx][menu_name].splice(k,1);
                                $.gallery.pages[value.id] = menu_name;

                            }
                        }
                    });
                    idx++;
                });

                var cates = '';
                var show = (data.cate_onoff == 'ON') ? '' : 'hide';
                if(show) $('.gallery-cog').addClass('hide');
                $.each(data.category, function(i,v) {
                    var active = (data.cate_str == v) ? 'active' : '';
                    $('.gallery-category .gallery-category-onoff').before('<li class="category-text gallery-category-menu ' + show + ' ' + active + '">' + v + '</li>');
                    cates = cates + '<li>' + v + '</li>';
                    if(data.cate_str == '') {
                        $('.gallery-category > li:nth-child(2)').addClass('active');
                    }
                });
                $.gallery.cates = cates;
                if(data.cate_onoff == 'ON') {
                    $('.category-onoff-check').prop('checked','checked');
                    $('.category-title-str').addClass('on');
                } else {
                    $('.category-onoff-check').prop('checked','');
                    $('.gallery-category > li:nth-child(2)').addClass('hide');
                    $('.gallery-category > li:last-child').addClass('hide');
                }

                var s = '<ul class="table-toolbar">';
                s = s + '<li class="checkbox-cmd toolbar-cmd hide"><i class="" data-glseq="" data-cmd="checkall"></i> <input type="checkbox" class="check-all"></li>';
                s = s + '<li class="toolbar-copy toolbar-cmd hide"><i class="" data-glseq="" data-cmd="copy"></i>' + $.lang[LANG]['editor.gallery.icon.clone'] + '</li>';
                s = s + '<li class="toolbar-sort item-sort toolbar-cmd submenu hide">' + $.lang[LANG]['editor.gallery.icon.order'] + ' <i class="fa fa-caret-down" aria-hidden="true" data-glseq="" data-cmd="item-sort"></i>\
                            <ul class="item-submenu">\
                                <li class="sort-top">' + $.lang[LANG]['editor.gallery.icon.order.shopping.front'] + '</li>\
                                <li class="sort-bottom">' + $.lang[LANG]['editor.gallery.icon.order.shopping.end'] + '</li>\
                            </ul>\
                        </li>';
                s = s + '<li class="toolbar-link toolbar-cmd hide"><i class="" data-glseq="" data-glink="" data-glink-target="" data-cmd="link"></i>' + $.lang[LANG]['editor.gallery.icon.link'] + '</li>';

                if(!$('.gallery-modal .gallery-category .gallery-all').hasClass('hide')) {
                    s = s + '<li class="toolbar-category toolbar-cmd submenu hide"><i class="" data-glseq="" data-cmd="category"></i>' + $.lang[LANG]['editor.block.gallery.category.change'] + ' <i class="fa fa-caret-down" aria-hidden="true"></i>';
                    s = s + '<ul class="item-submenu">' + cates + '</ul>';
                    s = s + '</li>';
                }                        
                s = s + '\
                        <li class="toolbar-visible toolbar-cmd hide"><i class="" data-glseq="" data-visible="" data-cmd="visible">' + $.lang[LANG]['editor.gallery.icon.visible.off'] + '</i></li>\
                        <li class="toolbar-move toolbar-cmd hide"><i class="" data-glseq="" data-visible="" data-cmd="move">' + $.lang[LANG]['editor.block.gallery.item.move'] + '</i></li>\
                        <li class="toolbar-delete toolbar-cmd hide"><i class="" data-glseq="" data-cmd="delete"></i>' + $.lang[LANG]['editor.gallery.icon.delete'] + '</li>\
                    </ul>\
                ';
                var $tool_back = $('<div class="toolbar sort-disabled">' + s + '</div>'),
                    col = '';

                col = col + '<ul class="table-col">';
                col = col + '<li class="col-check"><input type="checkbox" class="check-all"></li>';
                col = col + '<li class="col-number">번호</li>';
                col = col + '<li class="col-img"></li>';
                col = col + '<li class="col-title">상품</li>';
                col = col + '<li class="col-price">카테고리</li>';
                col = col + '<li class="col-price">가격</li>';
                col = col + '<li class="col-quantity">재고</li>';
                col = col + '</ul>'
                if(data.mode == 'shopping') {
                    $('.gallery-toolbar').append($tool_back);
                    $('.gallery-toolbar').append(col);
                }

                var num = (page > 1) ? data.total : data.total - ((page-1) * data.view);
                $.each(data.items, function(i,v) {
                    var settings = (v.gsettings) ? $.parseJSON(v.gsettings) : {},
                        link = (typeof settings.glink != 'undefined') ? settings.glink : '',
                        target = (typeof settings.glink_target != 'undefined') ? settings.glink_target : '',
                        cp_class = ($.inArray(v.seq,$.gallery.copy) > -1) ? ' active copy' : '',
                        mv_class = ($.inArray(v.seq,$.gallery.move) > -1) ? ' active move' : '',
                        invisible = (v.visible == '1') ? true : false;
                        // file = ((v.image).indexOf('googleusercontent') > -1) ? v.image : v.url
                        imgPATH = (typeof settings.storage == 'undefined') ? RPATH : settings.storage,
                        src_s250 = getServeImage(v.image,'250',imgPATH);

                    link = Base64.decode(link);
                    if(data.mode == 'shopping') {
                        $table = $('<div class="table-item" data-pos="' + v.pos + '" data-pid="' + v.pid + '" data-seq="' + v.seq + '" data-link="' + link + '" data-target="' + target + '" data-visible="' + v.visible + '" data-category="' + v.category + '">');
                        var price = (v.price != null && v.price !== '') ? addCommas(v.price) + '원' : '-',
                            sale = (v.sale && v.sale != '0') ? addCommas(v.sale) + '원' : '',
                            quantity = (v.quantity) ? addCommas(v.quantity) : '-',
                            invisible = (v.visible == '1') ? true : false,
                            title = (v.title) ? v.title : '상품명을 입력하세요';

                        if(sale) sale = '<span class="price-sale">' + sale + '</span>';
                        if(invisible) $table.addClass('invisible');
                        var soldout = '';

                        if(v.quantity_on == 'off' || v.quantity_on == null || v.quantity_on == '') {
                            if(v.status == 'off') {
                                $table.addClass('soldout');
                                // soldout = '<span class="item-soldout">품절</span>';
                            }
                        } else {
                            if(v.status == 'off') $table.addClass('soldout');
                            if(v.quantity == 0) {
                                $table.addClass('soldout');
                                soldout = '<span class="item-soldout">품절</span>';
                            }
                        }
                        var link_icon = '';
                        if(typeof settings.glink != 'undefined' && settings.glink) {
                            link_icon = '<span class="info-link"><svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M6 9.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l3-3c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-3 3C6.44 9.77 6.22 9.85 6 9.85z"/><path d="M3.85 15c-1.03 0-2-0.4-2.72-1.13C0.4 13.15 0 12.18 0 11.15s0.4-2 1.13-2.72l2-2C3.46 6.1 4 6.1 4.33 6.43c0.33 0.33 0.33 0.87 0 1.2l-2 2c-0.41 0.41-0.63 0.95-0.63 1.52s0.22 1.11 0.63 1.52c0.81 0.81 2.23 0.81 3.04 0l2-2c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-2 2C5.85 14.6 4.88 15 3.85 15z"/><path d="M11.2 8.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c0.41-0.41 0.63-0.95 0.63-1.52s-0.22-1.11-0.63-1.52c-0.81-0.81-2.23-0.81-3.04 0L7.56 4.36c-0.33 0.33-0.87 0.33-1.2 0 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c1.45-1.46 3.99-1.46 5.44 0C14.6 1.82 15 2.78 15 3.81s-0.4 2-1.13 2.72L11.8 8.61C11.64 8.77 11.42 8.85 11.2 8.85z"/></svg></span>';
                        }

                        var empty_title = (v.title == '') ? ' empty' : '';
                            s = '\
                            <div class="td-handle"><div class="item-handle"><img src="https://storage.googleapis.com/i.addblock.net/handle.png"></div></div>\
                            <div class="td-check"><input type="checkbox" name="item_check[]" class="td-input"></div>\
                            <div class="td-number">' + (num - i) + '</div>\
                            <div class="td-img"><img src="' + src_s250 + '" class="img-responsive">' + link_icon + '</div>\
                            <div class="td-title' + empty_title + '">' + title + soldout + '</div>\
                            <div class="td-edit' + empty_title + '">\
                                <div class="item-edit" data-seq="' + v.seq + '">\
                                    <ul>\
                                        <li class="product-item-edit">편집 <i class="fa fa-caret-down"></i>\
                                            <ul class="item-submenu">\
                                                <li class="edit-gallery-item" data-mode="prodInfo">상품설정</li>\
                                                <li class="edit-gallery-item" data-mode="prodDetail">상세페이지</li>\
                                            </ul>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </div>\
                            <div class="td-category' + empty_title + ((data.cate_onoff == 'OFF') ? ' hide' : '') + ((v.item_category.indexOf(',') > -1) ? ' line' : '') + '">' + v.item_category + '</div>\
                            <div class="td-price' + empty_title + '">' + price + sale + '</div>\
                            <div class="td-quantity' + empty_title + '">' + ((v.quantity_on == 'on') ? quantity : '-') + '</div>\
                        ';
                        $table.append(s);
                        $('.gallery-items').append($table);
                    } else {
                        var $info = $('<div class="info"></div>'),
                            $item = $('<div class="item" data-pos="' + v.pos + '" data-pid="' + v.pid + '" data-seq="' + v.seq + '" data-link="' + link + '" data-target="' + target + '" data-visible="' + v.visible + '" data-category="' + v.category + '"><img src="' + src_s250 + '" class="img-responsive"><input type="text" name="item_name" class="item-title" value="' + v.title + '" placeholder="' + $.lang[LANG]['board.enter-title'] + '" data-seq="' + v.seq + '" data-title="' + v.title + '" data-caption="' + v.content + '" data-category="' + v.category + '" data-date="' + v.datetime2 + '" data-hash="' + v.hashtag + '" data-url="' + src_s250 + '"></div>');

                        // if(mv_class) $item.addClass('active move');
                        // if(cp_class) $item.addClass('active copy');
                        $info.empty();
                        if(invisible) $item.addClass('invisible');
                        if(typeof settings.glink != 'undefined' && settings.glink) {
                            $info.append('<span class="info-link"><svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M6 9.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l3-3c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-3 3C6.44 9.77 6.22 9.85 6 9.85z"/><path d="M3.85 15c-1.03 0-2-0.4-2.72-1.13C0.4 13.15 0 12.18 0 11.15s0.4-2 1.13-2.72l2-2C3.46 6.1 4 6.1 4.33 6.43c0.33 0.33 0.33 0.87 0 1.2l-2 2c-0.41 0.41-0.63 0.95-0.63 1.52s0.22 1.11 0.63 1.52c0.81 0.81 2.23 0.81 3.04 0l2-2c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-2 2C5.85 14.6 4.88 15 3.85 15z"/><path d="M11.2 8.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c0.41-0.41 0.63-0.95 0.63-1.52s-0.22-1.11-0.63-1.52c-0.81-0.81-2.23-0.81-3.04 0L7.56 4.36c-0.33 0.33-0.87 0.33-1.2 0 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c1.45-1.46 3.99-1.46 5.44 0C14.6 1.82 15 2.78 15 3.81s-0.4 2-1.13 2.72L11.8 8.61C11.64 8.77 11.42 8.85 11.2 8.85z"/></svg></span>');
                            $item.append($info);
                        }

                        $('.gallery-items').append($item);
                    }
                });
                
                $('.gallery-items-loadmore').remove();
                if((data.items).length == 0) {
                    $('.gallery-items').append('<p class="text-center sort-disabled category-empty"> ' + $.lang[LANG]['editor.gallery.category.empty'] + '</p>');
                } else {
                    if((data.items).length < data.total) {
                        var count = (data.mode == 'shopping') ? $('.gallery-items .table-item').length : $('.gallery-items .item').length;
                        $('.gallery-items').after('<div class="gallery-items-loadmore" data-pid="' + data.pid + '" data-category-str="' + data.cate_str + '" data-page="1">' + $.lang[LANG]['data.loadmore'] + ' (' + count + '/' + data.total + ')</div>');
                    }
                }
                $('.gallery-ctrl-category').attr('data-category',data.category.toString()).attr('data-pid',data.pid);

                var handle = (data.mode == 'shopping') ? '.td-handle' : '.item-ctrl';
                var $item = $('.gallery-items .item');

                $(".gallery-items").selectable({
                    // distance: 3,
                    filter : '.table-item,.item',
                    cancel : '.item-edit, .item.ui-selected, .td-check, .td-handle, .item-title, .item .info, svg',
                    stop : function(event,ui) {
                        $.gallery.selected(event,ui);
                    }
                });            

                $m.fadeIn(300, function() {
                    if(typeof func == 'function') func();
                    $('#dummy-drop').remove();
                });

                $('.gallery-modal').off('scroll').on('scroll', function(e) {
                    stickyToolbar();
                });
                resizeGalleryModal();
                setLanguage(LANG);
            },'json');
        },

        list : function(id, page, category) {
            if(typeof id == 'undefined' || !id) {
                alert('Undefined gallery ID');
                return false;
            }
            if(typeof page =='undefined') page = 1;
            if(typeof category =='undefined') category = '';

            $.post('/template/gallery/show', { mode : 'list', id : id, page : page, category : category }, function(data) {
                if(data.error != 'undefined' && data.error) {
                    alert(data.error);
                    return false;
                }
                var num = data.total - ((page-1) * data.view);
                $.each(data.items, function(i,v) {
                    var settings = (v.gsettings) ? $.parseJSON(v.gsettings) : {},
                        link = (typeof settings.glink != 'undefined') ? settings.glink : '',
                        target = (typeof settings.glink_target != 'undefined') ? settings.glink_target : '',
                        cp_class = ($.inArray(v.seq,$.gallery.copy) > -1) ? ' active copy' : '',
                        mv_class = ($.inArray(v.seq,$.gallery.move) > -1) ? ' active move' : '',
                        invisible = (v.visible == '1') ? true : false;
                        // file = ((v.image).indexOf('googleusercontent') > -1) ? v.image : v.url
                        imgPATH = (typeof settings.storage == 'undefined') ? RPATH : settings.storage,
                        src_s250 = getServeImage(v.image,'250',imgPATH);

                    link = Base64.decode(link);
                    if(data.mode == 'shopping') {
                        $table = $('<div class="table-item" data-pos="' + v.pos + '" data-pid="' + v.pid + '" data-seq="' + v.seq + '" data-link="' + link + '" data-target="' + target + '" data-visible="' + v.visible + '" data-category="' + v.category + '">');
                        var price = (v.price && v.price != '0') ? addCommas(v.price) + '원' : '-',
                            sale = (v.sale && v.sale != '0') ? addCommas(v.sale) + '원' : '',
                            quantity = (v.quantity) ? addCommas(v.quantity) : '-',
                            invisible = (v.visible == "1") ? true : false,
                            title = (v.title) ? v.title : '상품명을 입력하세요';

                        if(sale) sale = '<span class="price-sale">' + sale + '</span>';
                        if(invisible) $table.addClass('invisible');
                        var soldout = '';

                        if(v.quantity_on == 'off' || v.quantity_on == null || v.quantity_on == '') {
                            if(v.status == 'off') {
                                $table.addClass('soldout');
                            }
                        } else {
                            if(v.status == 'off') $table.addClass('soldout');
                            if(v.quantity == 0) {
                                $table.addClass('soldout');
                                soldout = '<span class="item-soldout">품절</span>';
                            }
                        }
                        var link_icon = '';
                        if(typeof settings.glink != 'undefined' && settings.glink) {
                            link_icon = '<span class="info-link"><svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M6 9.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l3-3c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-3 3C6.44 9.77 6.22 9.85 6 9.85z"/><path d="M3.85 15c-1.03 0-2-0.4-2.72-1.13C0.4 13.15 0 12.18 0 11.15s0.4-2 1.13-2.72l2-2C3.46 6.1 4 6.1 4.33 6.43c0.33 0.33 0.33 0.87 0 1.2l-2 2c-0.41 0.41-0.63 0.95-0.63 1.52s0.22 1.11 0.63 1.52c0.81 0.81 2.23 0.81 3.04 0l2-2c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-2 2C5.85 14.6 4.88 15 3.85 15z"/><path d="M11.2 8.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c0.41-0.41 0.63-0.95 0.63-1.52s-0.22-1.11-0.63-1.52c-0.81-0.81-2.23-0.81-3.04 0L7.56 4.36c-0.33 0.33-0.87 0.33-1.2 0 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c1.45-1.46 3.99-1.46 5.44 0C14.6 1.82 15 2.78 15 3.81s-0.4 2-1.13 2.72L11.8 8.61C11.64 8.77 11.42 8.85 11.2 8.85z"/></svg></span>';
                        }

                        var empty_title = (v.title == '') ? ' empty' : '';
                        var s = '\
                            <div class="td-handle"><div class="item-handle"><img src="https://storage.googleapis.com/i.addblock.net/handle.png"></div></div>\
                            <div class="td-check"><input type="checkbox" name="item_check[]" class="td-input"></div>\
                            <div class="td-number">' + (num - i) + '</div>\
                            <div class="td-img"><img src="' + src_s250 + '" class="img-responsive">' + link_icon + '</div>\
                            <div class="td-title' + empty_title + '">' + title + soldout + '</div>\
                            <!--<div class="td-edit' + empty_title + '"><div class="item-edit" data-seq="' + v.seq + '"><span class="cl-icon cl_icon_edit04"></span>&nbsp;&nbsp;' + $.lang[LANG]['editor.block.gallery.item.edit'] + '</div></div>-->\
                            <div class="td-edit' + empty_title + '">\
                                <div class="item-edit" data-seq="' + v.seq + '">\
                                    <ul>\
                                        <li class="product-item-edit">'+$.lang[LANG]['editor.block.gallery.item.edit']+' <i class="fa fa-caret-down"></i>\
                                            <ul class="item-submenu">\
                                                <li class="edit-gallery-item" data-mode="prodInfo">상품설정</li>\
                                                <li class="edit-gallery-item" data-mode="prodDetail">상세페이지</li>\
                                            </ul>\
                                        </li>\
                                    </ul>\
                                </div>\
                            </div>\
                            <div class="td-category' + empty_title + ((data.cate_onoff == 'OFF') ? ' hide' : '') + ((v.item_category.indexOf(',') > -1) ? ' line' : '') + '">' + v.item_category + '</div>\
                            <div class="td-price' + empty_title + '">' + price + sale + '</div>\
                            <div class="td-quantity' + empty_title + '">' + ((v.quantity_on == 'on') ? quantity : '-') + '</div>\
                        ';
                        $table.append(s);
                        $('.gallery-items').append($table);
                    } else {
                        var settings = (v.gsettings) ? $.parseJSON(v.gsettings) : {},
                            link = (typeof settings.glink != 'undefined') ? settings.glink : '',
                            target = (typeof settings.glink_target != 'undefined') ? settings.glink_target : '',
                            invisible = (v.visible == "1") ? true : false,
                            $info = $('<div class="info"></div>'),
                            $item = $('<div class="item" data-pos="' + v.pos + '" data-pid="' + v.pid + '" data-seq="' + v.seq + '" data-link="' + link + '" data-target="' + target + '" data-visible="' + v.visible + '" data-category="' + v.category + '"><img src="' + v.url + '" class="img-responsive"><input type="text" name="item_name" class="item-title" value="' + v.title + '" placeholder="제목을 입력하세요" data-seq="' + v.seq + '" data-title="' + v.title + '" data-caption="' + v.content + '" data-category="' + v.category + '" data-date="' + v.datetime2 + '" data-hash="' + v.hashtag + '" data-url="' + v.url + '"></div>');

                        $info.empty();
                        if(invisible) $item.addClass('invisible');
                        if(typeof settings.glink != 'undefined' && settings.glink) {
                            $info.append('<span class="info-link"><svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M6 9.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l3-3c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-3 3C6.44 9.77 6.22 9.85 6 9.85z"/><path d="M3.85 15c-1.03 0-2-0.4-2.72-1.13C0.4 13.15 0 12.18 0 11.15s0.4-2 1.13-2.72l2-2C3.46 6.1 4 6.1 4.33 6.43c0.33 0.33 0.33 0.87 0 1.2l-2 2c-0.41 0.41-0.63 0.95-0.63 1.52s0.22 1.11 0.63 1.52c0.81 0.81 2.23 0.81 3.04 0l2-2c0.33-0.33 0.87-0.33 1.2 0 0.33 0.33 0.33 0.87 0 1.2l-2 2C5.85 14.6 4.88 15 3.85 15z"/><path d="M11.2 8.85c-0.22 0-0.44-0.08-0.6-0.25 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c0.41-0.41 0.63-0.95 0.63-1.52s-0.22-1.11-0.63-1.52c-0.81-0.81-2.23-0.81-3.04 0L7.56 4.36c-0.33 0.33-0.87 0.33-1.2 0 -0.33-0.33-0.33-0.87 0-1.2l2.07-2.07c1.45-1.46 3.99-1.46 5.44 0C14.6 1.82 15 2.78 15 3.81s-0.4 2-1.13 2.72L11.8 8.61C11.64 8.77 11.42 8.85 11.2 8.85z"/></svg></span>');
                            $item.append($info);
                        }

                        $('.gallery-items').append($item);
                    }
                });
                
                $('.gallery-items-loadmore').remove();
                var itemCheck = (data.mode == 'shopping') ? '.table-item' : '.item';

                if($('.gallery-items ' + itemCheck).length < data.total) {
                    $('.gallery-items').after('<div class="gallery-items-loadmore" data-pid="' + data.pid + '" data-category-str="' + data.cate_str + '" data-page="' + data.page_num + '">' + $.lang[LANG]['data.loadmore'] + ' (' + $('.gallery-items ' + itemCheck).length + '/' + data.total + ')</div>');
                }

                // $('.gallery-items').sortable('refresh');
            },'json');            
        },
        setNumber: function() {
            var items = $.gallery.seqs;
            if(items.length) {
                var group = ($('.table-item').length) ? '.table-item' : '.gallery-items .item';
                $.each(items, function(i,v) {
                    $(group+'[data-seq="' + v + '"]').attr('data-index',(i+1));
                });
            }
        },
        selected: function(e,ui) {
            $.gallery.seqs = [];
            if($.gallery.mode == 'shopping') {
                $('.table-item .td-check > input').prop('checked',false);
                $.each($('.gallery-items .table-item.ui-selected'), function(i,v) {
                    $(this).find('.td-check > input').prop('checked',true);
                    ($.gallery.seqs).push($(v).attr('data-seq'));
                });
                if($.gallery.seqs.length) {
                    if($('.gallery-items .table-item.ui-selected').length && $('.gallery-items .table-item').length) {
                        $('.table-toolbar li').removeClass('hide open');
                        $('.table-col').css('z-index','1');
                    }

                    var str = '', cmd = '';
                    var $s = $('.gallery-items .table-item[data-seq="' + $.gallery.seqs[0] + '"]'),
                        seq = $s.attr('data-seq'),
                        pid = $s.attr('data-pid'),
                        link = $s.attr('data-link'),
                        target = $s.attr('data-target'),
                        visible = $s.attr('data-visible');

                    var vstr = (visible == "1") ? $.lang[LANG]["editor.gallery.icon.visible.on"] : $.lang[LANG]["editor.gallery.icon.visible.off"],
                        vicon = (visible == "1") ? 'cl_icon_hide02' : 'cl_icon_show';

                    $('.table-toolbar li i[data-cmd="checkall"]').attr('data-glseq',seq);
                    $('.table-toolbar li i[data-cmd="item-sort"]').attr('data-glseq',seq);
                    $('.table-toolbar li i[data-cmd="copy"]').attr('data-glseq',seq);
                    $('.table-toolbar li i[data-cmd="move"]').attr('data-glseq',seq);
                    $('.table-toolbar li i[data-cmd="link"]').attr('data-glseq',seq).attr('data-glink',link).attr('data-glink-target',target);
                    $('.table-toolbar li i[data-cmd="' + cmd + '"]').attr('data-glseq',seq);
                    $('.table-toolbar li i[data-cmd="category"]').attr('data-glseq',seq);
                    $('.table-toolbar li i[data-cmd="visible"]').attr('data-glseq',seq).attr('data-visible',visible).text(vstr);
                    $('.table-toolbar li i[data-cmd="delete"]').attr('data-glseq',seq);
                    stickyToolbar();
                    $.gallery.setNumber();
                }
            } else {
                $.each($('.gallery-items .item.ui-selected'), function(i,v) {
                    ($.gallery.seqs).push($(v).attr('data-seq'));
                });
                $.gallery.toolbar();
                stickyToolbar();
            }
            $('.item-submenu, .view-submenu').hide();
            $('.toolbar-sort, .gallery-view-count').removeClass('open');
            $('.gallery-blocks .btn-group').removeClass('open');
        },
        toolbar : function() {
            $('.gallery-items').find('.toolbar.mod-gallery').remove();
            if($.gallery.seqs.length == 0) return false;
            var $s = $('.gallery-items .item[data-seq="' + $.gallery.seqs[0] + '"]'),
                seq = $s.attr('data-seq'),
                pid = $s.attr('data-pid'),
                link = $s.attr('data-link'),
                target = $s.attr('data-target'),
                visible = $s.attr('data-visible');

            var l = ($s.index()%7 > 3) ? 'right' : '',
                mode = $('.gallery-add-items').attr('data-mode');

            var vstr = (visible == "1") ? $.lang[LANG]["editor.gallery.icon.visible.on"] : $.lang[LANG]["editor.gallery.icon.visible.off"],
                vicon = (visible == "1") ? 'cl_icon_hide02' : 'cl_icon_show',
                editable = ($.gallery.seqs.length > 1) ? "disabled" : "";

            var s = '\
                <ul>\
                    <li class="active gallery-item-edit submenu' + editable + '">\
                ';
            if($.gallery.mode == 'project') {
                s = s + '\
                        ' + $.lang[LANG]['editor.block.gallery.item.edit'] + '</span> <i class="fa fa-caret-down"></i>\
                        <ul class="item-submenu">\
                            <li class="edit-gallery-item"><i class="" data-glseq="' + seq + '" data-cmd="edit">'+$.lang[LANG]["editor.gallery.icon.thumnail.config"]+'</i></li>\
                            <li class="edit-gallery-detail" data-seq="' + seq + '" >'+$.lang[LANG]["editor.gallery.icon.Project.page"]+'</li>\
                        </ul>\
                    </li>\
                ';
            } else {
                s = s + '\
                        <i class="" data-glseq="' + seq + '" data-cmd="edit"></i>' + $.lang[LANG]['editor.block.gallery.item.edit'] + '\
                    </li>\
                ';
            }
            s = s + '<li><i class="" data-glseq="' + seq + '" data-cmd="copy"></i>' + $.lang[LANG]['editor.gallery.icon.clone'] + '</li>';

            s = s + '<li class="toolbar-sort item-sort submenu">' + $.lang[LANG]['editor.gallery.icon.order'] + ' <i class="fa fa-caret-down" aria-hidden="true" data-glseq="" data-cmd="item-sort"></i>\
                        <ul class="item-submenu">\
                            <li class="sort-top">' + $.lang[LANG]['editor.gallery.icon.order.front'] + '</li>\
                            <li class="sort-bottom">' + $.lang[LANG]['editor.gallery.icon.order.end'] + '</li>\
                        </ul>\
                    </li>';
            if(!$('.gallery-modal .gallery-category .gallery-all').hasClass('hide')) {
                s = s + '<li class="toolbar-category submenu"><i class="" data-glseq="" data-cmd="category"></i>' + $.lang[LANG]['editor.block.gallery.category.change'] + ' <i class="fa fa-caret-down" aria-hidden="true"></i>';
                s = s + '<ul class="item-submenu">' + $.gallery.cates + '</ul>';
                s = s + '</li>';
            }
            
            s = s + '\
                    <li><i class="" data-glseq="' + seq + '" data-glink="' + link + '" data-glink-target="' + target + '" data-cmd="link"></i>' + $.lang[LANG]['editor.gallery.icon.link'] + '</li>\
            ';
            s = s + '\
                    <li><i class="" data-glseq="' + seq + '" data-visible="' + visible + '" data-cmd="visible">' + vstr + '</i></li>\
                    <li><i class="" data-glseq="' + seq + '" data-cmd="move">' + $.lang[LANG]['editor.block.gallery.item.move'] + '</i></li>\
                    <li><i class="" data-glseq="' + seq + '" data-cmd="delete"></i>' + $.lang[LANG]['editor.gallery.icon.delete'] + '</li>\
                </ul>\
            ';
            var $tool_back = $('<div class="toolbar mod-gallery ' + l + '">' + s + '</div>');
            $('.gallery-toolbar').empty();
            $('.gallery-toolbar').append($tool_back);

            if($.gallery.seqs.length > 1) { 
                $('.gallery-toolbar .toolbar .gallery-item-edit').addClass('disabled');
            } else {
                $('.gallery-toolbar .toolbar .gallery-item-edit').removeClass('disabled');
            }
            // $('.gallery-items').selectable('disable');
        },
        pages : function() {
            var group = ($('.table-item').length) ? '.table-item' : '.gallery-items .item',
                item = $(group).length,
                cpage = ($.gallery.mode == 'shopping') ? Math.ceil(item/20) : Math.ceil(item/27),
                spos = $('.gallery-modal').scrollTop();
            return {
                page : cpage, pos : spos
            }
        },

        close : function() {
            $.gallery.mode = '';
            if($('.gallery-modal').length) {
                $('.gallery-modal').fadeOut(300, function() {
                    $('#gallery-style').remove();
                    $(this).remove();
                });
            }
            if($.gallery.update) showPageCallback(showPage);
        }
    }    
})(jQuery);
var SFOLDER_ACTIVE = '';
var updateOutputFolder = function (e) {
    var list = e.length ? e : $(e.target),
        output = list.data('output');

    if (window.JSON && list.attr('class') == 'dd') {
        output.val(window.JSON.stringify(list.nestable('serialize')));
    } else {
        if (typeof output != 'undefined') output.val('JSON browser support required');
    }

    if (SID) {
        $.ajaxSetup({ async : false });
        $.post('/template/update/type/folder', { s: $('#nestableFolder-output').val(), id: SID }, function (data) {
            checkError(data);
        }, 'json');
    }

}

var displaySelectedFilesStr = function() {
    if($('.selected-files').children().length) {
        $('.selected-files-count').text($('.selected-files').children().length);
        $('.resource-selected-str').show();    
    } else {
        $('.resource-selected-str').hide();
    }
}

var resetFileSelectedStr = function() {
    if($('.selected-files').children().length>0) {
        $('.resource-useit').addClass('active');
        $('.resource-selected-str').show();
        $('.selected-files-count').text($('.selected-files').children().length);
    } else {
        $('.resource-useit').removeClass('active');
        $('.resource-selected-str').hide();
        $('.selected-files-count').text('0');
    }
}

var resetFileSelectedFr = function() {
    if($('.fr-selected-files').children().length>0) {
        $('.resource-useit').addClass('active');
        $('.resource-selected-str').show();
        $('.selected-files-count').text($('.selected-files').children().length);
    } else {
        $(".fr-selected-files").empty();
        $('.resource-useit').removeClass('active');
        $('.resource-selected-str').hide();
        $('.selected-files-count').text('0');
    }
}

var resourceGetPage = function(page,ffolder) {
    var property = $('.resource-useit').eq(0).attr('data-property'),
        checkFileLink = (property == 'flink-change') ? true : false;

    if(page == 1) {
        $('#resource-files, #flink-files').empty();
        for(var i=0; i<6; i++) {
            $('#resource-files').append('<li class="f-wrap">');
        }
    }

    $('#resource-files').removeClass('empty');
    $('#selectAll').prop('checked',false);
    var selectedAll = true;
    ffolder = (typeof ffolder == 'undefined') ? SFOLDER_ACTIVE : ffolder;
    if(checkFileLink) {
        ffolder = 'flink@';
        $('.resource-useit').removeClass('active');
    }

    $.ajaxSetup({ async : false });
    $.getJSON('/template/resource/files/page/' + page + '/ffolder/' + ffolder , function (data) {
        if (typeof(data.error) != 'undefined' && data.error) {
            checkError(data);
            $('<li class="text-center resource-none"/>').text('No files uploaded').appendTo('#resource-files');
        } else {
            cTotal = data.total;
            var path = data.path;

            var checkPlan = (typeof VALIDPLAN == 'undefined') ? property.VALIDPLAN : VALIDPLAN,
                flink_max = (checkPlan) ? 15 : 0;
                // flink count :: 요금제별 개수 제한
                // checkPType = (typeof VALIDTYPE == 'undefined') ? property.VALIDTYPE : VALIDTYPE,
                // flink_max = (checkPType == 'SM') ? 20 : ((checkPType == 'BN') ? 10 : 5);

            $('#filestorage .flink-capacity .flink-cnt').text(cTotal);
            $('#filestorage .flink-capacity .flink-max').text(flink_max);

            if(checkFileLink) {
                if(data.file.length == 0) $('#flink-files').append('<li class="empty-text">' + $.lang[LANG]['editor.link.file.list.empty'] + '</li>');
                $.each(data.file, function (idx, val) {
                    var file_size = String(Math.ceil(val.filesize));
                    file_size = file_size.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
// replace(/[^\d]+/g, ''); // , 제거
                    var tag = '\
                                <li class="f-wrap">\
                                    <div class="fitem">\
                                        <!--<span class="bc-svg-handle bc-svg">\
                                            <svg viewBox="0 0 16 16" width="16" height="16"><circle cx="5.5" cy="2.5" r="1.5"/><circle cx="10.5" cy="2.5" r="1.5"/><circle cx="10.5" cy="7.5" r="1.5"/><circle cx="5.5" cy="7.5" r="1.5"/><circle cx="5.5" cy="12.5" r="1.5"/><circle cx="10.5" cy="12.5" r="1.5"/></svg>\
                                        </span>-->\
                                        <p class="resource-file-name" data-seq="' + val.seq + '" data-source="' + val.filename + '">' + val.origname + '</p>\
                                        <p class="resource-file-size">' + file_size + '</p>\
                                        <span class="flink-delete-button" data-page="' + page + '"><svg viewBox="0 0 12 12" width="12" height="12"><path d="M11 2H9V0H3v2H1 0v1h1v7c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V3h1V2H11zM4 1H8v1H4V1zM10 10c0 0.6-0.4 1-1 1H3c-0.5 0-1-0.4-1-1V3h1H9h1V10z"></path><rect x="4" y="4" width="1" height="6"></rect><rect x="7" y="4" width="1" height="6"></rect></svg></span>\
                                    </div>\
                                </li>\
                    ';

                    $('#flink-files').append(tag);
                });

            } else {

                var selected = $('.selected-files li').map(function (i, n) {
                    return $(this).find('p.selected-file-name').text();
                }).get();

                resourceNoticeTextTop = $.lang[LANG]['editor.resource.notice.text.top'];
                resourceNoticeTextBottom = $.lang[LANG]['editor.resource.notice.text.bottom'];

                page = (data.file.length <2) ? page-1 : page;
                page = (page) ? page : 1;

                var $fHeight = $('#resource-files .f-wrap');
                var fi = 0, 
                    height = [
                        $fHeight.eq(0).height(),
                        $fHeight.eq(1).height(),
                        $fHeight.eq(2).height(),
                        $fHeight.eq(3).height(),
                        $fHeight.eq(4).height(),
                        $fHeight.eq(5).height()
                    ];
                $.each(data.file, function (idx, val) {
                    fi = idx%6;
                    var set = (idx < 3 && page==1) ? idx : height.indexOf(Math.min.apply(null,height));

                    var tag = resourceFileTag(val.filename, val.seq, path, selected, val.ffolder, page, val.origname, parseInt(val.filesize), val.magic);
                    if($.inArray(val,selected)<0) selectedAll = false;

                    var r = Math.round(val.h*800/val.w);
                    height[set] = height[set] + r;
                    $('#resource-files .f-wrap').eq(set).append(tag);
                });
                $('#resource-files').selectable({ filter: ' .fitem'});

                var folder_size = (parseInt(data.fsize_total/1024)>0) ? parseInt(data.fsize_total/1024) : parseInt(data.fsize_total),
                    folder_size_unit = (parseInt(data.fsize_total/1024)>0) ? 'MB' : 'KB' ;

                $('.fli.active > .dd-flc').attr('attr-count',data.total).text(data.total);
                $('.fli.active > .dd-fls').attr({'attr-size': parseInt(data.fsize_total), 'attr-size-unit':folder_size_unit}).text(folder_size);

                if(data.total==0) {
                    selectedAll = false;
                    $('#resource-files').addClass('empty');
                    var str = ''
                        + '<li class="resource-empty-area">'
                        + ' <div class="resource-empty">'
                        + '     <div class="img-wrap"><img src="//storage.googleapis.com/i.addblock.net/config/fa_resource_img_icon.png" alt="image storage" /></div>'
                        + '     <p>' + resourceNoticeTextTop + '<br>'
                        + '     ' + resourceNoticeTextBottom + '</p>'
                        + ' </div>'
                        + '</li>'
                    ;
                    $('#resource-files').append(str);
                } else {
                    var upgrade_link = (HOST.indexOf('gabia') > -1) ? 'https://www.gabia.com/mygabia/service' : '/upgrade/site/' + SID,
                        load_btn = '\
                                <img src="https://storage.googleapis.com/i.addblock.net/image-upload.gif">&nbsp;&nbsp;\
                                <span class="resource-info"><span data-lang="config.file.browse">' + $.lang[LANG]["config.file.browse"] + '</span></span>\
                                <input id="fileupload-resource" class="modal-upload-button-resource" type="file" name="files[]" multiple>\
                        ',
                        upgrade_btn = '\
                            <a href="' + upgrade_link + '" style="color: #fff; text-decoration:none;">\
                                <i class="fa fa-level-up" aria-hidden="true" style="margin-right: 5px;"></i>\
                                <span class="resource-info">' + $.lang[LANG]["plan.upgrade"] + '</span>\
                            </a>\
                        ';

                    var check_langs = (typeof SLANG != 'undefined' && !$.isEmptyObject(SLANG.lists) && SLANG.lists.length > 1) ? true : false;

                    var str = (data.is_limit) ? upgrade_btn : load_btn,
                        css_str = (data.is_limit) ? { 'background-color':'#4889e7', 'margin-left':'5px' } : {}, 
                        max_str = (data.is_limit) ? '<span class="error">' + $.lang[LANG]['plan.disk-space.limit.info'] + '</span> ' : '';
                    if(data.is_limit && check_langs) max_str = '<span class="error" style=" line-height: 1.4; display: inline-block; text-align: right;">' + $.lang[LANG]['plan.disk-space.limit.info.lang'] + '</span>';

                    $('#el-fileupload #mystorage .fileinput-button').attr('data-limit',data.is_limit).html(str).css(css_str);
                    $('#el-fileupload #mystorage .upload-max-size').html(max_str);
                }
            
            }
            
        }
        $('.listprogress').remove();
    });
    cPage = page;
    if(selectedAll) $('#selectAll').prop('checked',true);
    displaySelectedFilesStr();
}

var resourcePaging = function(page,total,ffolder) {
    view = RVIEW;
    $('.resource-paging').empty();

    page_view = 10;
    start = Math.floor((page-1) / page_view) * page_view;
    pages = Math.ceil(total/view);
    end = (Math.floor((page-1) / page_view) + 1) * page_view;
    end = (end>pages) ? pages : end;

    prev = (start > 0) ? start : 1;
    next = ((end+1) > pages) ? pages : end+1;

    ffolder = (ffolder) ? 'ffolder' : 'all';

    var str = '\
    <ul class="pagination pagination-sm" data-pages="'+pages+'">\
        <li><a href="javascript:;" onclick="resourceGetPage(' + prev + ')">&laquo;</a></li>\
    ';
    for(i=start;i<end;i++) {
        active = ((i+1)==page) ? 'active' : '';
        str = str + '\
        <li class="' + active + '"><a href="javascript:;" onclick="resourceGetPage(' + (i+1) + ')">' + (i+1) + '</a></li>\
        ';
    }
    str = str + '\
        <li><a href="javascript:;" onclick="resourceGetPage(' + next+ ')">&raquo;</a></li>\
    </ul>\
    ';
    if(total) $('.resource-paging').append(str);
}



var resourceOpenSET = function(open) {
    $('#el-fileupload .nav-tabs li').removeClass('disabled');

    var property = (open) ? $('.resource-useit').eq(0).attr('data-property') : '';
    if(!open) {
        $('.resource-useit').eq(0).removeAttr('data-property')
    }

    if(open && property == 'flink-change') {
        $('.modal#el-fileupload').css('z-index','1043');
        $('#el-fileupload').addClass('flink-fileupload');
        $('#el-fileupload').find('.modal-header h4').html($.lang[LANG]['editor.resource.file']);

        $('#el-fileupload .nav-tabs li:nth-child(3) a').click();
        $('#el-fileupload .nav-tabs li:not(:nth-child(3))').addClass('disabled');
        $('#mystorage,#freestorage').removeClass('active').removeClass('in');
    } else {
        $('.modal#el-fileupload').css('z-index','1041');
        $('#el-fileupload').removeClass('flink-fileupload');
        $('#el-fileupload').find('.modal-header h4').html($.lang[LANG]['editor.resource.title']);

        if($('#el-fileupload .nav-tabs li:nth-child(3)').hasClass('active')) $('#el-fileupload .nav-tabs li:nth-child(1) a').click();
        $('#el-fileupload .nav-tabs li:nth-child(3)').addClass('disabled');
        $('#filestorage').removeClass('active').removeClass('in');
    }
}
var initResource = function () {
    $('#progress .progress-bar').css('width', '0%');
    $('.resource-useit').removeClass('active');
    $('.selected-files,.fr-selected-files').empty();
    $('.fr-storage .imgs').removeClass('ui-selected');
    resourceOpenSET(true);
}
var resourceFileTag = function (source, seq, path, selected, ffolder, page, origname, filesize, magic) {
    active = ($.inArray(source,selected)>-1) ? ' ui-selected' : '';
    var blank = (magic == '') ? path + '/' + source : getServeImage(magic,'0','');
    var image = (magic == '') ? path + '/800/' + source : magic;
    var control_box = '<ul data-ffolder="'+ffolder+'" data-page="'+page+'" data-source="'+source+'" data-seq="'+seq+'" data-fsize="'+filesize+'">\
        <li><i class="fa fa-search resource-file-search" aria-hidden="true"></i></li>\
        <li><a href="' + blank + '" target="_blank" alt="' + source + '" download="'+origname+'"><i class="fa fa-download" aria-hidden="true"></i></a></li>\
        <li><i class="fa fa-trash-o resource-file-delete" aria-hidden="true"></i></li>\
    </ul>\
    ';
    // <span class="resource-file-delete" data-page="' + page + '">&times;</span> //20160908
    var $item = $('<div class="fitem' + active + '"></div>'),
        $img = $('<div class="resource-image"><img src="' + image + '" alt="' + source + '"><div class="control-area">'+control_box+'</div></div>');

    $item.append($img);
    $item.append('<p class="resource-file-name" data-seq="' + seq + '" data-source="' + source + '" data-magic="' + magic + '" data-toggle="tooltip" data-placement="top" title="' + origname + '">' + origname + '</p><p class="resource-file-size">'+filesize+'</p>');
    // $li.append('<p class="resource-file-name" data-seq="' + seq + '" data-source="' + source + '">' + origname + '</p><span class="resource-file-delete" data-page="' + page + '">&times;</span>'); //20160908
    return $item;
}

var resetFolderInfo = function(count, size, ffolder, state) {
    if(ffolder!='all' ||  ffolder=='all' && state!='move' ) {
        var flc = $('#nestableFolder .fli[data-id="'+ ffolder +'"]').find('.dd-flc').attr('attr-count'),
            fls = $('#nestableFolder .fli[data-id="'+ ffolder +'"]').find('.dd-fls').attr('attr-size'),
            fls_u = $('#nestableFolder .fli[data-id="'+ ffolder +'"]').find('.dd-fls').attr('attr-size-unit');

        fls = parseInt(fls);
        fls_v = (parseInt((fls+size)/1024) > 0 ) ? (fls+size)/1024 : fls+size;
        fls_u = (parseInt((fls+size)/1024) > 0 ) ? 'MB' : 'KB';

        $('#nestableFolder .fli[data-id="'+ ffolder +'"]').find('.dd-flc').attr('attr-count', parseInt(flc)+count ).text(parseInt(flc)+count);
        $('#nestableFolder .fli[data-id="'+ ffolder +'"]').find('.dd-fls').attr({'attr-size':fls+size, 'attr-size-unit':fls_u}).text(parseInt(fls_v));
    }
}
var myStorageActive = function() {
    return ($('#mystorage').hasClass('active')) ? true : false;
}


var frStorageUpload = function(v,w,id) {
    var deferred = $.Deferred(),
        id = (typeof id != 'undefined' && id) ? id : $('li[data-source="' + v + '"]').attr('data-id');

    var ex = v.split("|"),
        s = [];
    if(ex.length>1) {
        $.each(ex, function(i,d) {
            s[i] = $('li[data-source="' + d + '"]').attr('data-id');
        });
    } else {
        s[0] = id;
    }
    var ids = s.join("|");

    $.ajax({
        type : 'post',
        url: '/template/frstorage/upload',
        data: { img : v, sid : SID, w : w, ids : ids },
        dataType: 'json',
        async: true,
        success: function (data) {
            $.processOFF();
            if(data.error) { 
                alert(data.error);
                return false;
            }
            deferred.resolve(data);
        }
    });
    return deferred.promise();
}

var uploadReviewQnaImg = function (e) {
    var mode = e.data.mode;
    if(mode != 'qna' && mode != 'review'){
        return false;
    }
    var imageCnt = $('.'+mode+'-files-list').children('li').length;
    if (imageCnt >= 5) {
        alert('이미지는 최대 5개까지 등록이 가능합니다.');
        return false;
    }

    var sid = $('#'+mode+'-file').attr('data-sid'),
        uid = $('#'+mode+'-file').attr('data-uid');

    $.uploadON();
    $(this).fileupload({
        url: '/_upload/type/'+mode+'/sid/'+sid+'/uid/'+uid,
        dataType: 'json',
        pasteZone: null,
        async: true,
        sequentialUploads: true,
        change: function(e, data) {
            var fileCount = $('.'+mode+'-files-list>li').length + data.files.length;
            if(fileCount > 5) {
                alert('이미지는 최대 5개까지 등록이 가능합니다.');
                return false;
            }

            var ext = ['gif', 'jpg', 'jpeg', 'png'];
            var maxSize  = 1024 * 1024 * 10;
            var flag = true;
            $.each(data.fileInput[0]['files'], function(idx, item){
                var extAry = item['name'].split(".");   
                if (ext.indexOf(extAry[extAry.length - 1]) == -1) {
                    alert($.lang[LANG]['editor.upload.error.ext']);
                    flag = false;
                    return false;
                }

                var fileSize = item['size'];
                if (fileSize > maxSize) {
                    alert($.lang[LANG]['editor.upload.max.1'] + $.lang[LANG]['editor.upload.max.2']);
                    flag = false;
                    return false;
                }
            });
            
            if(flag === false) {
                return false;
            }
            
        },
        add: function(e, data) {
            var r = $.upload_add(e,data,'image');

            if(r.submit) {
                var jqXHR = data.submit();
                UPLOAD++;
            } else {
                data.context.find('.loading').html('<i class="fa fa-times error"></i>');
                data.context.find('.ing').addClass('error').text(r.err);
            }

            $(document).on('click','.upload-cancel .btn, .upload-close', function(e) {
                if(jqXHR != undefined) jqXHR.abort();
                data.context.fadeOut().remove();
                $('.uploadModal #file-upload-progress').css('width','0%');
                $.uploadOFF();
            });
        },
        progress: function(e, data) {
            $.upload_progress(e,data);
        },                        
        done: function(e, data) {
            $.upload_done(e,data);
            if(typeof data.result.error != 'undefined' && data.result.error) {
                $.processOFF();
                return false;
            }
            
            UPLOADED++;
            // console.log(data);
            var src = (typeof data.result.magic != 'undefined') ? data.result.magic : data.result.src;
            var src_orig = (typeof data.result.magic != 'undefined') ? data.result.src_orig : '';
            var uploadedImg = '\
                <li id="'+mode+'-image-'+imageCnt+'">\
                    <img src="'+src+'" class="img-responsive" />\
                    <input type="hidden" name="'+mode+'_image[]" value="'+src+'" />\
                    <input type="hidden" name="'+mode+'_image_orig[]" value="'+src_orig+'" />\
                    <div class="cl-s-files-img-close '+mode+'-img-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8" height="8"><path d="M4.71 4l3.15-3.15c0.2-0.2 0.2-0.51 0-0.71s-0.51-0.2-0.71 0L4 3.29 0.85 0.15c-0.2-0.2-0.51-0.2-0.71 0s-0.2 0.51 0 0.71L3.29 4 0.15 7.15c-0.2 0.2-0.2 0.51 0 0.71C0.24 7.95 0.37 8 0.5 8s0.26-0.05 0.35-0.15L4 4.71l3.15 3.15C7.24 7.95 7.37 8 7.5 8s0.26-0.05 0.35-0.15c0.2-0.2 0.2-0.51 0-0.71L4.71 4z"/></svg></div>\
                </li>\
            ';

            $('.'+mode+'-files-list').append(uploadedImg);
            imageCnt++;

            if(UPLOADED) {
                if(UPLOAD==UPLOADED) {
                    setTimeout(function() {
                        UPLOAD = 0;
                        UPLOADED = 0;
                        UPLOADSIZE = 0;
                        PROGRESS = 0;
                        $.uploadOFF();
                    },1000);
                }
            }
        },
        progressall: function (e, data) {
            $.upload_progressall(e,data);
        },
        start : function(e, data) {
            $.upload_start(e,data);
            progress1 = 0; progress2 = 0; PROGRESS = 0;
        },
        dragover : function(e, data) {
            e.preventDefault();
        },
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
}

var deleteReviewQnaImg = function(e) {
    var mode = e.data.mode;
    if(mode != 'qna' && mode != 'review'){
        return false;
    }
    var parent = $(this).closest('li');
    var src_orig = parent.find('input[name="'+mode+'_image_orig[]"]').val();
    var seq = $('#'+mode+'-file').data('seq');
    var src_files = '';
    var src_files_orig = '';

    if(seq) {
        if($('.'+mode+'-files-list').children('li').length > 0) {
            $('.'+mode+'-files-list').children('li').each(function() {
                if(src_orig != $(this).find('input[name="'+mode+'_image_orig[]"]').val()) {
                    if(src_files != '')  src_files +='||';
                    src_files += $(this).find('input[name="'+mode+'_image[]"]').val();
                    if(src_files_orig != '')  src_files_orig +='||';
                    src_files_orig += $(this).find('input[name="'+mode+'_image_orig[]"]').val();
                }
            });
        }
    }

    $.processON('Deleting File...');
    $.ajax({
        type: 'POST',
        url: '/_image_delete',
        data: {
            s: src_orig,
            seq: seq,
            src_files: src_files,
            src_files_orig: src_files_orig,
            mode: mode,
        },
        async: true,
        success: function(data) {
            // console.log(data);
            checkError(data);
            parent.remove();
            $.processOFF();
        }
    });
}

var addrSearchModal = function(input_mode) {
    if(typeof input_mode == 'undefined' || input_mode.length == 0)  input_mode = 'input';

    if($('script[src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"]').length === 0) {
        $.getScript('https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js')
            .done(function() { 
                $('head').append('<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>'); 
                // $('head').append('<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false"></script>'); 
                setTimeout(function() { addrSearchModal(input_mode); }, 500);
            }).fail(function() { console.log('daum maps script fail'); });
    } else {

        if($('#addr-modal').length === 0) {
            var add_position = ($('.mall-mypage-wrap').length > 0) ? $('.mall-mypage-wrap') : $('body'),
                as_backdrop = '<div class="addr-modal-backdrop" style="display: none;"></div>';
                as_modal = '<div id="addr-modal" style="display: none;">\
                                <div class="close">\
                                    주소 찾기\
                                    <div id="btn-addr-close"><img src="https://storage.googleapis.com/i.addblock.net/fa-close-modal.png" alt="close"></div>\
                                </div>\
                                <div id="addr-body"></div>\
                            </div>';

            add_position.append(as_backdrop + as_modal);
        } else {
            $('#addr-body').html('');
        }


        $(document).on('click','#btn-addr-close, .addr-modal-backdrop', function() {
            $('#addr-modal').fadeOut(300);
            $('.addr-modal-backdrop').fadeOut(300, function() { $(this).removeClass('in'); });
        });



        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        if(isIE && input_mode == 'my-input') {

            daum.postcode.load(function(){
                new daum.Postcode({
                    oncomplete: function(data) {
                        var addr = ''; // 주소 변수
                        var extraAddr = ''; // 참고항목 변수

                        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                            addr = data.roadAddress;
                        } else { // 사용자가 지번 주소를 선택했을 경우(J)
                            addr = data.jibunAddress;
                        }

                        if(data.userSelectedType === 'R'){
                            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                                extraAddr += data.bname;
                            }

                            if(data.buildingName !== '' && data.apartment === 'Y'){
                                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                            }

                            if(extraAddr !== ''){
                                extraAddr = ' (' + extraAddr + ')';
                            }
                        }

                        $('#'+input_mode+"-postcode").attr('value',data.zonecode);
                        $('#'+input_mode+"-addr1").attr('value',addr+extraAddr).addClass('has-value');

                        setTimeout(function() {
                            $('#'+input_mode+"-addr2").focus();
                        },200);

                    },
                    width : '100%',
                    height : '100%',
                    maxSuggestItems : 5
                }).open();
            });

        } else {


            daum.postcode.load(function(){
                new daum.Postcode({
                    oncomplete: function(data) {
                        var addr = ''; // 주소 변수
                        var extraAddr = ''; // 참고항목 변수

                        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                            addr = data.roadAddress;
                        } else { // 사용자가 지번 주소를 선택했을 경우(J)
                            addr = data.jibunAddress;
                        }

                        if(data.userSelectedType === 'R'){
                            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                                extraAddr += data.bname;
                            }

                            if(data.buildingName !== '' && data.apartment === 'Y'){
                                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                            }

                            if(extraAddr !== ''){
                                extraAddr = ' (' + extraAddr + ')';
                            }
                        }

                        $('#'+input_mode+"-postcode").attr('value',data.zonecode);
                        $('#'+input_mode+"-addr1").attr('value',addr+extraAddr).addClass('has-value');  
                        $('#addr-modal').fadeOut(300);
                        $('.addr-modal-backdrop').fadeOut(300, function() { $(this).removeClass('in'); });

                        setTimeout(function() {
                            $('#'+input_mode+"-addr2").focus();
                        },200);

                    },
                    width : '100%',
                    height : '100%',
                    maxSuggestItems : 5
                }).embed(document.getElementById('addr-body'));

                $('#addr-modal').fadeIn(300);
                $('.addr-modal-backdrop').fadeIn(300, function() { $(this).addClass('in'); });
            });

        }
    }
}
var stickyToolbar = function() {
    if($('.gallery-header').length == 0) return;
    var sticky = $('.gallery-header').offset().top;
    if($('.gallery-header').outerHeight() + sticky < 0) { 
        $('.gallery-modal .toolbar, .gallery-modal .table-col').addClass('sticky');
    } else {
        $('.gallery-modal .toolbar, .gallery-modal .table-col').removeClass('sticky');
    }
}            

var saveGalleryBlockName = function($this,blockname) {
    var blockID = $this.parents('.gallery-name').attr('data-gallery-id');
    if(typeof blockID == "undefined" || !blockID) {
        $this.showModalFlat('ERROR',$.lang[LANG]['board.error-setting-value'],true,false,'','ok');
        return false;
    }

    var bookmark_list = (typeof SETTINGS.blockBookmarkList != 'undefined' && SETTINGS.blockBookmarkList) ? SETTINGS.blockBookmarkList : {},
        isBookmark = (typeof bookmark_list['bookmark'+blockID] != 'undefined' && bookmark_list['bookmark'+blockID]) ? true : false,
        before_bookmark_name_arr = [],
        blockname_list = (typeof SETTINGS.blocknameList != 'undefined' && SETTINGS.blocknameList) ? SETTINGS.blocknameList : {},
        regex = /[\{\}\[\]\/!?.,;:|\)*~`^\-_+<>@\#$%&\\\=\(\'\"]/gi,
        err_str = '', 
        isUpdate = false;

    if(!$.isEmptyObject(bookmark_list)) { // 이전 bookmark name 설정한 블럭 이름 포함
        $.each(bookmark_list, function(k,v) { 
            if(typeof blockname_list[k.replace('bookmark','blockname')] == 'undefined') {
                before_bookmark_name_arr.push(v);
            }
        });
    }

    var blockname_list_arr = (!$.isEmptyObject(blockname_list)) ? Object.keys(blockname_list).map(function(e) { return blockname_list[e]; }) : new Array();

    if(typeof blockname_list['blockname'+blockID] != 'undefined' && blockname_list['blockname'+blockID] == blockname) {
        $('.blockname-edit').remove();
        return false;
    } else if (blockname.length == 0 || blockname.length > 20) {
        err_str = $.lang[LANG]['config.blockinfo.name.length'];
    } else if (regex.test(blockname)) {
        err_str = $.lang[LANG]['config.blockinfo.name.specialchar'];
    } else if ($.inArray(blockname,blockname_list_arr) > -1 || $.inArray(blockname,before_bookmark_name_arr) > -1) {
        err_str = $.lang[LANG]['config.blockinfo.name.overlap'];
    } else {
        isUpdate = true;
    }

    if(err_str.length > 0 ) {
        $this.showModalFlat($.lang[LANG]['config.information'],err_str,true,false,'','ok', '', 'cl-p130 cl-cmmodal cl-s-btn w560 cl-p0 cl-okbtn-pbt70');
    } else {
        $this.parents('.gallery-name').find('.gallery-block-name').text(blockname);
        $this.parents('.gallery-name-edit-input').remove();
        if($.gallery.block_id == blockID) {
            $('#gallery-name').text(blockname);
        }
    }

    if(!isUpdate) return false;
    blocknameUpdate(SID,blockID,blockname);
    blocknameListUpdate('update',SID,blockID,blockname);
    if(isBookmark) blockBookmarkListUpdate('update',SID,blockID,blockname);

}

var galleryStatusInit = function() {
    $('.gallery-items > div').removeClass('active ui-selected').find('input').prop('checked','');
    // $('.table-toolbar > li').addClass('disabled').find('i[data-cmd="visible"]').text('숨김');
    $('.table-toolbar > li').find('i[data-cmd="visible"]').text('숨김');
    $('.gallery-toolbar .toolbar.mod-gallery').remove();
}

var resizeGalleryModal = function() {
    var w = $('.gallery-modal')[0]['clientWidth'],
        $c = $('.gallery-items'),
        t = ($('.gallery-modal').hasClass('shopping')) ? true : false,
        g = (t) ? 1124 : 1146,
        p = ((w-g) > 0) ? (w-g)/2 : 0;
    $c.css('padding','0 ' + p + 'px');
}

var switchDownload = function(option_onoff) {
    if($('#download-product').is(':checked') === true) { //다운로드 상품
        var firstOption = $('.prod-option[data-option_mode="normal"] .prod-option-list > li').eq(1);
        var noneOption = $('.prod-option[data-option_mode="normal"] .prod-option-list > li').eq(0);
        
        var downloadContent = '';
        var state = false;

        if ($('#none-option-file').length > 0 && option_onoff == 'on') {
            if ($('#none-option-file .file-name').length > 0) {
                // var optionSeq = (firstOption.find('.prod-option-title').attr('data-seq')!='')? firstOption.find('.prod-option-title').attr('data-seq') : '';
                var fileUrl = $('#none-option-file .file-url').text(),
                    fileSize = $('#none-option-file .file-size').text(),
                    fileNameDetail = $('#none-option-file .file-name-detail').text(),
                    realFileName = $('#none-option-file .real-file-name').text();
                state = true;
            } else if($('#none-option-file .none-file-name').length > 0) {
                // var optionSeq = (firstOption.find('.prod-option-title').attr('data-seq')!='')? firstOption.find('.prod-option-title').attr('data-seq') : '';
                var fileUrl = $('#none-option-file .none-file-url').text(),
                    fileSize = $('#none-option-file .none-file-size').text(),
                    fileNameDetail = $('#none-option-file .none-file-name-detail').text(),
                    realFileName = $('#none-option-file .none-real-file-name').text();

                state = true;        
            }

            var dataPn = $('#none-option-file .cl_icon_close').attr('data-pn'),
                dataFile = $('#none-option-file .cl_icon_close').attr('data-file');
            var fileCnt = 2;
            var optionSeq = $('#none-option-file .cl_icon_close').attr('data-seq');
        }
        if(firstOption.find('.file-name').length > 0 && option_onoff == 'off'){
            var optionSeq = (noneOption.find('.prod-option-title').attr('data-seq')!='')? noneOption.find('.prod-option-title').attr('data-seq') : '';
            var fileUrl = firstOption.find('.file-url').text(),
                fileSize = firstOption.find('.file-size').text(),
                fileNameDetail = firstOption.find('.file-name-detail').text(),
                realFileName = firstOption.find('.real-file-name').text(),
                dataPn = firstOption.find('.cl_icon_close').attr('data-pn'),
                dataFile = firstOption.find('.cl_icon_close').attr('data-file');
            var fileCnt = 1;
            state = true;
        }
        // console.log(state);
        if(state === true) {
            downloadContent = '\
                <div class="file-name file-name-'+fileCnt+'">\
                    <span class="real-file-name">'+realFileName+'</span>\
                    <span class="file-name-detail" title="'+realFileName+'">'+fileNameDetail+'</span>\
                    <span class="file-size">'+fileSize+'</span>\
                    <span class="cl-icon cl_icon_close" data-cnt="1" data-pn="'+dataPn+'" data-file="'+dataFile+'" data-seq="'+optionSeq+'"></span>\
                    <span class="file-url">'+fileUrl+'</span>\
                </div>\
            ';
        }
        // console.log(downloadContent);
        if ($('#normal-option').is(':checked') === true) {
            // console.log(firstOption.find('.file-box-list'));
            firstOption.find('.file-box-list').html(downloadContent);
            firstOption.find('.prod-option-status').text('판매').attr('data-val', 'S');
            // $('.ui-sortable li .product-status .file-box-list').each(function () {
            //     $(this).empty();
            // });

            $('#add-upload-check .product-upload').remove();
            noneOption.find('.file-name').remove();   
        } else {
            var html = '\
                <div class="product-upload">\
                    <div class="title">파일 업로드</div>\
                    <div class="download-contents">\
                        <span class="cl_icon_upload02" data-cnt="0">업로드</span>\
                        <div id="none-option-file">'+downloadContent+'</div>\
                    </div>\
                </div>';

            $('#add-upload-check').prepend(html);
            noneOption.find('.file-box-list').html(downloadContent);
            if ($('#none-option-file').length == 0) $('.switch-product').prop('checked','').parents('.form-wrap').addClass('disabled');
            // firstOption.find('.file-name').remove();;
        }
    }
}

var addProductOption = function(optionMode) {
    var $parent;
    var option_mode; //일반, 입력, 추가
    
    if(optionMode=='normal' || optionMode=='text' || optionMode=='additional'){
        $parent = $('.prod-option[data-option_mode="'+optionMode+'"]');
        option_mode = optionMode; //일반, 입력, 추가
    } else {
        $parent = $(this).parent();
        option_mode = $parent.data('option_mode'); //일반, 입력, 추가
    }
    
    if($parent.find('.prod-option-item.hide').length) {
        $parent.find('.prod-option-item.hide').closest('li').addClass('err').find('.edit-option-title input').focus();
        r = shoppingSetOption($parent.find('.prod-option-item.hide'));
        if(r == false) return r;
    }

    var state = 'normal-product';
    $('.cl_product_state_check').each(function () {
        if ($(this).hasClass('active') === true) {
            state = $(this).attr('for');
        }
    });
    var status = true;
    var productNumber = $('#prod-no').val();
    
    // if (option_mode == "normal" && productNumber) {
    //     if($('.prod-option[data-option_mode="normal"] .prod-option-list>li').length <= 1) {
    //         $.ajax({
    //             url: '/shopping/download_list_check',
    //             type: 'post',
    //             dataType: 'json',
    //             data: {'product_number': productNumber},
    //             success: function (data) {
    //                 if (data.code == 'fail') {
    //                     alert(data.message);
    //                     status = false;
    //                     return false;
    //                 }
    //             }
    //         });
    //     }
    // }
    
    // if (status == false) return false;
    
    var tax = $('#tax').attr('data-total-tax'),
        check_quantity = $('.prod-detail-wrap .switch-quantity').prop('checked');

    var item = '';
    if(option_mode == "text") {
        if($parent.find('li').length >= 6) {
            $('.prod-option[data-option_mode="text"] > .prod-option-add').addClass('disabled');
        }
        if($parent.find('li').length >= 7) {
            alert('입력형 옵션은 최대 7개까지 추가할 수 있습니다.');    
            return false;
        }
        item = '\
            <li>\
                <div class="prod-option-item hide">\
                    <span class="prod-option-title"></span>\
                    <span class="prod-option-require"></span>\
                </div>\
                <div class="prod-option-edit">\
                    <div class="form-wrap">\
                        <div class="form-group edit-option-title">\
                            <input type="text" maxlength="20" placeholder="안내문구 입력 (예:두께를 mm단위로 입력해주세요.)"/>\
                        </div>\
                        <div class="edit-option-delete"><svg viewBox="0 0 12 13" width="12" height="13"><path d="M12 2h-1H9V0H3.02v2H1 0v1h1v8c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V3h1V2zM4.02 1H8v1H4.02V1zM10 11c0 0.55-0.45 1-1 1H3c-0.55 0-1-0.45-1-1V3h1.02H9h1V11z"/><rect x="4" y="4" width="1" height="7"/><rect x="7" y="4" width="1" height="7"/></svg></div>\
                    </div>\
                </div>';
    } else {
        item = '\
            <li>\
                <div class="prod-option-item hide">\
                    <span class="prod-option-title"></span>\
                    <span class="prod-option-price"></span>\
                    <span class="prod-option-quantity"></span>\
                    <span class="prod-option-status"></span>\
                    <span class="prod-option-move"><i class="fa fa-arrows" aria-hidden="true"></i></span>\
                </div>\
                <div class="prod-option-edit">\
                    <div class="form-wrap">\
                        <div class="form-group edit-option-title">\
                            <input type="text" maxlength="60" placeholder="옵션값"/>\
                        </div>\
                        <div class="form-group edit-option-price">\
                            <input type="text" class="option-price-number sign" placeholder="0" numberonly/>\
                        </div>\
                        <div class="form-group edit-option-quantity" ' + ((check_quantity) ? '' : 'style="display:none"') + '>\
                            <input type="text" class="option-price-quantity" maxlength="5" placeholder="0" numberonly/>\
                        </div>\
                        <div class="form-group edit-option-select">';
                        if (state == 'download-product' && $parent.attr('data-option_mode') == "normal") item += '<div class="option-price-status-str hand" data-val="O">품절</div>';
                        else item += '<div class="option-price-status-str hand" data-val="S">판매</div>';
                        item += '<ul class="option-price-status-select">\
                                <li data-val="S">판매</li>\
                                <li data-val="O">품절</li>\
                                <li data-val="H">숨김</li>\
                            </ul>\
                        </div>\
                        <div class="edit-option-delete"><svg viewBox="0 0 12 13" width="12" height="13"><path d="M12 2h-1H9V0H3.02v2H1 0v1h1v8c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V3h1V2zM4.02 1H8v1H4.02V1zM10 11c0 0.55-0.45 1-1 1H3c-0.55 0-1-0.45-1-1V3h1.02H9h1V11z"/><rect x="4" y="4" width="1" height="7"/><rect x="7" y="4" width="1" height="7"/></svg></div>\
                    </div>\
                </div>';
        if (state == 'download-product' && $parent.attr('data-option_mode') == "normal") {
            item += '\
                <div class="form-group product-status">\
                    <div class="product-state-box">\
                        <div class="product-upload">\
                            <div class="title">파일 업로드</div>\
                            <div class="download-contents">\
                                <span class="cl_icon_upload02" data-cnt="'+fileUpdateCnt+'">업로드</span>\
                                <div class="file-box-list" id="file-box-'+fileUpdateCnt+'"></div>\
                            </div>\
                        </div>\
                    </div>\
                </div>';
            fileUpdateCnt++;
        }
    }
    
    
        item += '</li>';
    var $item = $(item);
    
    $parent.find('.prod-option-list').append($item);
    $('.prod-option[data-option_mode="'+option_mode+'"] .prod-option-list>li:last-child').find('.edit-option-title input').focus();

    $('.plus-price').removeClass('hide');
    // $('.plus-quantity').removeClass('hide');
    $('.plus-status').removeClass('hide');

    // if(option_mode == "normal") {
    //     $('.plus-price').text('추가금액');
    //     $('.plus-quantity').text('수량');
    //     $('.plus-status').text('상태');
    // } else if(option_mode == "additional") {
    //     $('#plus-addt-price').text('금액');
    //     $('#plus-addt-quantity').text('수량');
    //     $('#plus-addt-status').text('상태');
    // } else if (option_mode == "text") {
    //     $('#check-require').text('필수여부');
    // }
    
    if($('.switch-quantity').is(":checked") == true) {
        if($('#normal-option').is(':checked') === true) {
            // $('#prod-quantity').attr('readonly','true').removeClass('hide').attr('placeholder','옵션에서 재고 관리');
            $('.quantity-label').addClass('on');
            $('.plus-quantity').removeClass('hide');
        } else if($('#normal-option').is(':checked') === false && $('#additional-option').is(':checked') === true) {
            $('.quantity-label').removeClass('on');
            $('#prod-quantity').removeAttr('readonly').removeClass('hide');
            $('.plus-quantity').removeClass('hide');
        } else {
            $('.quantity-label').removeClass('on');
            $('#prod-quantity').removeAttr('readonly').removeClass('hide');
            $('.plus-quantity').addClass('hide');
        }
    } else {
        $('.quantity-label').removeClass('on');
        $('.switch-quantity').parents('.form-wrap').addClass('disabled');
        $('#prod-quantity').addClass('hide');
        $('.prod-option-quantity, .prod-plus-quantity, .edit-option-quantity').hide();
        $('.plus-quantity').addClass('hide');
    }

    return true;
}

var shoppingSetOption = function(optionItem) {

    if($('.prod-option-item.hide').length) {
        var $o = (optionItem)? optionItem : $('.prod-option-item.hide');
        var ret = true;

        $o.each(function(){
            var $t = $(this).parent().find('.prod-option-edit input');
            // console.log($t);

            var $title = $t.closest('.form-wrap').find('.edit-option-title input'),
                $desc = $t.closest('.form-wrap').find('.edit-option-desc input'),
                $price = $t.closest('.form-wrap').find('.edit-option-price input'),
                $quantity = $t.closest('.form-wrap').find('.edit-option-quantity input'),
                $status = $t.closest('.form-wrap').find('.option-price-status-str'),
                $text_require = $t.closest('.form-wrap').find('.option-require-str');
        
            var price = removeCommas($price.val()), quantity = removeCommas($quantity.val());
            if (!price) price = 0;
            if (!quantity) quantity = 0;

            if(typeof quantity == 'string') {
                quantity = quantity.replace(/,/gi,'') ;
            }

            quantity = Number(quantity);

            price = parseInt(price);
            quantity = (quantity * 1);
            if(String(price) == "NaN") price = 0;
            var abs_price = Math.abs(price),
                str_price = abs_price.toString(),
                str_quantity = quantity.toString(); 

             if(isNaN(price) === true) {
                $price.val(0);
                price = 0;
                $t.closest('li').find('.prod-option-price').attr('data-option-price', price);
            }

            $t.closest('li').find('.prod-option-title').text($title.val());
            $t.closest('li').find('.prod-option-desc').text($desc.val());
            $t.closest('li').find('.prod-option-price').text(addCommas(str_price));
            $t.closest('li').find('.prod-option-quantity').text(addCommas(str_quantity));
            $t.closest('li').find('.prod-option-status').text($status.text());

            if(price < 0) {
                $t.closest('li').find('.prod-option-price').addClass('minus');
            } else {
                $t.closest('li').find('.prod-option-price').removeClass('minus');
            }
            // if($text_require.find('input').is(':checked') == true) {
            //     var checkbox = "\
            //     <span>필수</span>\
            //     <svg class='active' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'>\
            //     <path d='M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z'/>\
            //     </svg>";
            //     $t.parents('li').find('.prod-option-require').html(checkbox);
            // } else {
            //     var checkbox = "\
            //     <span>필수</span>\
            //     <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'>\
            //     <path d='M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z'/>\
            //     </svg>";
            //     $t.parents('li').find('.prod-option-require').html(checkbox);
            // }
            var option_type = $t.closest('.prod-option').attr('data-option_mode');

            if(product_options.advanced == 'false') {
                if($title.val() === undefined || $title.val().trim().length == 0 || (option_type == 'text' && $title.val().trim().length > 20)) {
                    $t.closest('li').addClass('err');
                    if($title.val().trim().length > 20) {
                        alert('옵션명은 20자까지 입력이 가능합니다.');
                    }
                    ret = false;
                    return false;
                }
            }
            if($quantity.val() == '') $t.closest('li').find('.prod-option-quantity').text('0');
            if($('.switch-quantity').is(':checked') == true && $t.closest('li').find('.prod-option-quantity').text() == '0') {
                $t.closest('li').find('.option-price-status-str').attr('data-val','O').text('품절');
                $t.closest('li').find('.prod-option-status').attr('data-val','O').text('품절');
            }

            $t.closest('.prod-option-edit').addClass('hide');
            $t.closest('li').find('.prod-option-item').removeClass('hide');
            $t.closest('li').removeClass('err');

            ret = true;
        });
        
        return ret;
    }
}

var checkDuplicateOptionName = function(el) {
    var titles = $('.prod-option-title').map(function(idx, v) { 
            var str = $(v).text().trim();
            if(str.length > 0) return str;                        
        }).get();
    var input = el.val().trim();
    var cnt = titles.filter(function(el){
                return el == input;
            }).length;
    var flag = false;

    if(input.length > 0 && cnt > 1) {
        el.parents('li').find('.prod-option-title').text('');
        el.val('');
        el.focus();
        flag = true;
        alert('옵션명 중복 오류입니다.'); 
    } else {
        el.parents('li').find('.prod-option-title').removeClass('now-input');
    }

    return flag;
}

var siteConfigOthersCheckModal = function(sid,check_id,check_uadmin,success_callback,cancel_callback) {

    var config_url = (check_uadmin) ? '/_config' : '/config',
        check_data = {
            'id': check_id,
            'edit': check_uadmin,
            'step': 'check'
        };

    $.post('/umember/login/others', {
        'sid': sid,
        'data': JSON.stringify(check_data)
    }, function(data) {

        if(typeof data.error != 'undefined' && data.error) {
            $(this).showModalFlat('ERROR', data.error, true, false, '', 'close');
            return false;
        }

        if(typeof success_callback == 'undefined' || !success_callback) {
            success_callback = function() { 
                setSiteLogs('config','enter','','dashboard');
                location.href = config_url;
            };
        }

        if(!data.result) {
            success_callback();
        } else {
            var o_id = data.others_id,
                str = o_id + $.lang[LANG]['config.modal.others-login.1'] + o_id + $.lang[LANG]['config.modal.others-login.2'],
                checkOtherLoginModal = $(this).showModalFlat('INFORMATION', str, true, true, function() {
                    $.processON('Other Login Disconnecting...');

                    var set_data = check_data;
                    set_data['step'] = 'set';

                    $.ajax({
                        type: 'POST',
                        url: '/umember/login/others',
                        data: { sid: SID, data: JSON.stringify(set_data) },
                        dataType: 'json',
                        async: true,
                        success: function(data) {
                            setTimeout(function() {
                                $.processOFF();
                                success_callback();
                            }, 400);
                        }
                    });
                    
                }, 'cancel', 'ok', '', '', '', '', cancel_callback);
        }

    }, 'json');

}

var changeBrokenImages = function(el) {
    if($(el).length == 0) return;
    // if($(el).find('.hideBlockWrap').length > 0) return;

    var checkBlockConfig = $(el).is('#el-blockConfig'),
        checkElement = $(el).is('.element'),
        checkMenu = $(el).is('header'),
        // broken_img =  (checkBlockConfig || checkMenu) ? '//storage.googleapis.com/i.addblock.net/icon_broken_img.png' : '//storage.googleapis.com/i.addblock.net/img_broken.png',
        broken_img =  (checkBlockConfig) ? '//storage.googleapis.com/i.addblock.net/icon_broken_img.png' : '//storage.googleapis.com/i.addblock.net/img_broken.png',
        broken_bg = (checkBlockConfig) ? 'none' : 'url(' + broken_img + ')';


    if(checkElement || checkMenu) {
        var el_bg = $(el).css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1');
        
        el_bg = el_bg.replace(/^(http)?(s)?(:)?\/\/i\.addblock\.net\//g,'//storage.googleapis.com/i.addblock.net/');
        if(el_bg.match(/(http)?(s)?(\:)?\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/) != null) {
            $('<img>', { src : el_bg }).on('error', function(e) {
                $(el).css('background-image',broken_bg);
                e.target.remove();
            }.bind(this));
        }
    }

    $(el).find('[data-attach="true"]:not(img), #preview-image').each(function() {
        var this_attach = $(this),
            attch_bg = this_attach.css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1'),
            this_el = this_attach.closest('.element').attr('data-el');

        attch_bg = attch_bg.replace(/^(http)?(s)?(:)?\/\/i\.addblock\.net\//g,'//storage.googleapis.com/i.addblock.net/');
        if(attch_bg.match(/(http)?(s)?(\:)?\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/) != null) {
            $('<img>', { src : attch_bg }).on('error', function(e) {
                if(this_attach.is('[data-target]')) {
                    // img_broken background-image inline css reset
                    var attach_html = this_attach.outerHTML();
                    this_attach.replaceWith(attach_html.replace(/style\=\"(.+)?background\-image\:([^\;]+)\;\"(\=\"\")?/gi,''));

                    var this_selector = '.' + $('.'+this_el).attr('data-name') + ' ' + this_attach.attr('data-target'),
                        this_css = $('#'+this_el+'css').html();
                    $('#'+this_el+'css').html( this_css + this_selector + ' { background-image: ' + broken_bg + '; }');
                } else {
                    this_attach.css('background-image',broken_bg);
                }
                e.target.remove();
            }.bind(this));
        }
    });


    $(el).find('img').each(function() {
        var el_img = $(this);
        $(this).error(function() {
            $(this).unbind('error').attr('src', broken_img)
                .removeAttr('data-storage')
                .removeAttr('data-photo-id')
                .removeAttr('data-img-val')
                .removeAttr('data-width');

            if(checkBlockConfig) {
                if($(this).closest('.attach-thumb').length > 0) $(this).closest('.attach-thumb').eq(0).css('background-image', broken_bg);
            } else {
                if($(this).closest('.img-wrapper').find('.g-img').length > 0) $(this).closest('.img-wrapper').find('.g-img').css('background-image', broken_bg);
            }
        });

        var this_img = el_img.attr('src');
        if(checkBlockConfig) {
            this_img = replaceBrokenImages(this_img, 'icon');
            if(this_img.match(/^(http)?(s)?(:)?\/\/storage\.googleapis\.com\/i\.addblock\.net\/icon_broken_img\.png/gi) !== null) $(this).closest('.attach-thumb').eq(0).css('background-image', broken_bg);
        }

        el_img.attr('src', this_img);
    });
}

var replaceBrokenImages = function(path,return_type) {
    var check_broken_icon = /^(http)?(s)?(:)?\/\/storage\.googleapis\.com\/i\.addblock\.net\/icon_broken_img\.png/gi,
        check_broken_img = /^(http)?(s)?(:)?\/\/storage\.googleapis\.com\/i\.addblock\.net\/img_broken\.png/gi,
        v = path;

    if(return_type == 'img') return v.replace(check_broken_icon, '//storage.googleapis.com/i.addblock.net/img_broken.png');
    else return v.replace(check_broken_img, '//storage.googleapis.com/i.addblock.net/icon_broken_img.png');
}

var getServeImage = function(f,w,path) {
    if(f == undefined) return;
    var r = '';
    if(typeof w === 'number') w = String(w);
    if(f.indexOf('googleusercontent') > -1) {

        var magic_type = (PAGE_MODE == 'c') ? SETTINGS.magic_type : property.SETTINGS.magic_type,
            check_magic_type = (typeof magic_type != 'undefined' && magic_type == 'webp') ? true : false;
            t =  (check_magic_type) ? '-rw' : '';

        var n = f.indexOf('=');
        f = f.substring(0, n != -1 ? n : f.length);
        switch(w) {
            case "0"      : r = f + '=s0'+t;            break;
            case "60"     : r = f + '=w60-h60-n'+t;     break;
            case "250"    : r = f + '=w250-h250-n'+t;   break;
            case "300"    : r = f + '=w300-h300-n'+t;   break;
            case "600"    : r = f + '=w600-h600-n'+t;   break;
            case "650"    : r = f + '=w650-h370-n'+t;   break;
            case "670"    : r = f + '=w670-h980-n'+t;   break;
            case "700"    : r = f + '=w700-h500-n'+t;   break;
            case "800"    : r = f + '=w800'+t;          break;
            case "1920"   :
                $.ajax({
                    type: 'POST',
                    url: '/template/image',
                    data: { url : f, width : w },
                    dataType: 'json',                    
                    async: false,
                    success: function(data) {
                        if(typeof data.s800 != 'undefined') {
                            if(w == "800")
                                r = (Number(data.s800) > 2560) ? f + '=s0' : f + '=w800-h' + data.s800 + '-n';
                            if(w == "1920")
                                r = (Number(data.s1920) > 2560) ? f + '=s0' : f + '=w1920-h' + data.s1920 + '-n';
                            r+=t;
                        } else {
                            r = (check_magic_type) ? f+'=-rw' : f;
                        }
                    }
                });
                break;
                            
            default       : r = (check_magic_type) ? f+'=-rw' : f;  break;
        }
    } else {
        path = (path.slice(-1) == '/') ? path : path + '/';
        r = (f.indexOf('http:') > -1) ? f : (w == "0" || w == "") ? path + f : path + w + '/' + f;
    }
    return r;
}

Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
    
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function(da) {
        switch (da) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return da;
        }
    });
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

var galleryDeleteItem = function(seq,callback) {
    if(CANCEL) return true;

    $.ajax({
        url: '/template/element/type/get-projectPage-bookmarkBlock/seq/' + seq,
        data: {sid: SID, page: PAGE},
        dataType: 'json',
        type: 'POST',
        async: true,
        cache: false,
        success: function (data) {
            checkError(data);
            if(typeof callback == 'function') {
                callback(data);
            }
        }
    }, 'json');                
}

function removeOptionModal(optionList, optionMode) {
    // console.log(optionList);
    var sid = (typeof SID == 'undefined') ? property.SID : SID;
    if(optionList.length > 0) {
        var modal = $(this).showModalFlat($.lang[LANG]['config.information'], '선택한 옵션을 삭제하시겠습니까?', true, true, function() {
            optionList.each(function(){
                var seq = $(this).find('.prod-option-title').attr('data-seq');
                
                if(typeof seq != "undefined" || seq) {
                    $.post('/template/products', { seq : seq, sid : sid, type : 'delete', mode: 'option' }, function(data) {
                        if(typeof data.error != "undefined" || data.error) {
                            alert(data.error);
                            return false;
                        }

                        var liTotal = 0;
                        $('.prod-option-list > li').each(function () { liTotal++; });
                        if (liTotal < 2) $('.prod-option .plus-price').addClass('hide');
                    }, 'json');
                } else {
                    var liTotal = 0;
                    $('.prod-option-list > li').each(function () { liTotal++; });
                    if (liTotal < 2) $('.prod-str-price').text('');
                }
            });

            optionList.remove();
            $('.prod-option[data-option_mode="'+optionMode+'"]').addClass('hide');

            var cnt = $('.prod-option[data-option_mode="normal"] .prod-option-list > li').length;
            if (cnt <= 1) {
                var html = '<div class="download-contents">\
                                <span class="cl_icon_upload02" data-cnt="0">업로드</span>\
                                <div id="none-option-file"></div>\
                            </div>';
                fileUpdateCnt++;

                $('#add-upload-check').prepend(html);
                if ($('#none-option-file').length > 0) $('.switch-product').prop('checked','').parents('.form-wrap').addClass('disabled');
            }

            modal.modal('hide');
        }, 'cancel', 'ok', 'cl-p130 cl-cmmodal cl-s-btn w560 cl-p0', false, function(){
            $('#'+optionMode+'-option').prop('checked', true);
        }, '', function(){
            if(optionMode == 'normal') {
                if($('.prod-option[data-option_mode="normal"] .prod-option-list > li').length > 1) {
                    $('#'+optionMode+'-option').prop('checked', true);
                } 
            } else {
                if($('.prod-option[data-option_mode="'+optionMode+'"] .prod-option-list > li').length > 0) {
                    $('#'+optionMode+'-option').prop('checked', true);
                }
            }
        });
    } else {
        $('.prod-option[data-option_mode="'+optionMode+'"]').addClass('hide');
    }
}

$(function () {
    $(document).on('change', '.review-checkbox-check', function () {
        if ($(this).is(':checked') === true) {
            $('.photo-review-tab').css('display', 'block');
        } else {
            $('.photo-review-tab').css('display', 'none');
        }
    });

    $(document).on('change', '.option-state-box .status-checkbox', function (e) {
        if($(this).attr('id') == 'normal-option') {
            var li = $('.prod-option[data-option_mode="normal"] .prod-option-list > li').slice(1);
            if(product_options.advanced == 'true' && li.length == 0) {
                $(this).prop('checked',false);
                // alert('고급 설정이 적용되어 있어 입력형 옵션과 추가 옵션은 고급 설정창에서 설정이 가능합니다');
                var modal = $(this).showModalFlat('','고급 설정이 적용되어 있어 입력형 옵션과 추가 옵션은 고급 설정창에서 설정이 가능합니다',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                    $(document).on('keydown', function(e) {
                        if(e.keyCode == 27) modal.modal('hide');
                    });
                });
                return false;
            }
            if ($(this).is(':checked') === true) {
                if(li.length == 0) {
                    var r = addProductOption('normal');
                    if(r == false) {
                        $('#normal-option').prop('checked', false);
                        return false;
                    }
                }
                $('.prod-option-tab').removeClass('hide');
                $('.prod-option[data-option_mode="normal"]').removeClass('hide');
                $('.prod-option[data-option_mode="normal"] .plus-price').removeClass('hide');
                $('.prod-option[data-option_mode="normal"] .plus-status').removeClass('hide');
                switchDownload('on'); //다운로드 파일        
            } else {         
                switchDownload('off'); //다운로드 파일
                // removeOptionModal(li, 'normal');
                if(li.length == 1 && li.find('.prod-option-item .prod-option-title').text() == '') {
                    li.remove();
                }
                $('.prod-option[data-option_mode="normal"]').addClass('hide');
            }
        } else if($(this).attr('id') == 'text-option') {
            if($('#download-product').is(':checked') === true) { //다운로드 상품
                alert('다운로드 상품은 입력옵션을 지원하지 않습니다.');
                $(this).prop('checked', false);
                return false;
            }
            var li = $('.prod-option[data-option_mode="text"] .prod-option-list > li');
            if(product_options.advanced == 'true' && li.length == 0) {
                $(this).prop('checked',false);
                // alert('고급 설정이 적용되어 있어 입력형 옵션과 추가 옵션은 고급 설정창에서 설정이 가능합니다');
                var modal = $(this).showModalFlat('','고급 설정이 적용되어 있어 입력형 옵션과 추가 옵션은 고급 설정창에서 설정이 가능합니다',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                    $(document).on('keydown', function(e) {
                        if(e.keyCode == 27) modal.modal('hide');
                    });
                });
                return false;
            }
            if ($(this).is(':checked') === true) {   
                $('.prod-option-tab').removeClass('hide');
                $('.prod-option[data-option_mode="text"]').removeClass('hide');

                if(li.length == 0) addProductOption('text');
                if(li.length >= 7) {
                    $('.prod-option[data-option_mode="text"] > .prod-option-add').addClass('disabled');
                } else {
                    $('.prod-option[data-option_mode="text"] > .prod-option-add').removeClass('disabled');
                }
            } else {
                // removeOptionModal(li, 'text');
                if(li.length == 1 && li.find('.prod-option-item .prod-option-title').text() == '') {
                    li.remove();
                }
                $('.prod-option[data-option_mode="text"]').addClass('hide');
            }
        } else if($(this).attr('id') == 'additional-option') {
            if($('#download-product').is(':checked') === true) { //다운로드 상품
                alert('다운로드 상품은 추가옵션을 지원하지 않습니다.');
                $(this).prop('checked', false);
                return false;
            }
            var li = $('.prod-option[data-option_mode="additional"] .prod-option-list > li');
            if(product_options.advanced == 'true' && li.length == 0) {
                $(this).prop('checked',false);
                // alert('고급 설정이 적용되어 있어 입력형 옵션과 추가 옵션은 고급 설정창에서 설정이 가능합니다.');
                var modal = $(this).showModalFlat('','고급 설정이 적용되어 있어 입력형 옵션과 추가 옵션은 고급 설정창에서 설정이 가능합니다',true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                    $(document).on('keydown', function(e) {
                        if(e.keyCode == 27) modal.modal('hide');
                    });
                });
                return false;
            }

            if ($(this).is(':checked') === true) {
                $('.prod-option-tab').removeClass('hide');
                $('.prod-option[data-option_mode="additional"]').removeClass('hide');
                $('.prod-option[data-option_mode="additional"] .plus-price').removeClass('hide');
                $('.prod-option[data-option_mode="additional"] .plus-status').removeClass('hide');

                if(li.length == 0) addProductOption('additional');
            } else {
                // removeOptionModal(li, 'additional');
                if(li.length == 1 && li.find('.prod-option-item .prod-option-title').text() == '') {
                    li.remove();
                }

                $('.prod-option[data-option_mode="additional"]').addClass('hide');
            }
        }

        if($('.switch-quantity').is(":checked") == true) {
            if($('#normal-option').is(':checked') === true) {
                // $('#prod-quantity').attr('readonly','true').removeClass('hide').attr('placeholder','옵션에서 재고 관리');
                $('.quantity-label').addClass('on');
                $('.plus-quantity').removeClass('hide');
            } else if($('#normal-option').is(':checked') === false && $('#additional-option').is(':checked') === true) {
                $('.quantity-label').removeClass('on');
                $('#prod-quantity').removeAttr('readonly').removeClass('hide');
                $('.plus-quantity').removeClass('hide');
            } else {
                $('.quantity-label').removeClass('on');
                $('#prod-quantity').removeAttr('readonly').removeClass('hide');
                $('.plus-quantity').addClass('hide');
            }

        //     $parent.find('.prod-option-quantity, .edit-option-quantity').show();
        //     $parent.find('.plus-quantity').removeClass('hide');
        } else {
            $('.quantity-label').removeClass('on');
            $('#prod-quantity').addClass('hide');
            $('.prod-option-quantity, .prod-plus-quantity, .edit-option-quantity').hide();
            $('.plus-quantity').addClass('hide');
        }

        if($('.prod-option-tab .prod-option.hide').length == 3) { //탭 모두 비활성화일때
            $('.prod-option-tab').addClass('hide');
            if(product_options.advanced == 'true')
                $('.reset-wrap').addClass('hide');
            if($('.switch-quantity').is(":checked") == true) {
                $('.quantity-label').removeClass('on');
            }
        } else {
            if(product_options.advanced == 'true')
                $('.reset-wrap').removeClass('hide');
        }
    });

    $(document).on('click','.btn-fblogin.btn-warning', function(e) {
        var facebook_disabled_str = '\
        <div class="text-left" style="padding: 20px 15px;"><br>\
        ' + $.lang[LANG]['config.modal.fblogin.error.1'] + '\
            <ol style="padding-inline-start: 15px; margin-top: 10px; line-height: 2;">\
            ' + $.lang[LANG]['config.modal.fblogin.error.2'] + '\
            </ol>\
        ' + $.lang[LANG]['config.modal.fblogin.error.3'] + '\
        </div>';

        $(this).showModalFlat('INFORMATION',facebook_disabled_str,true,false,'','ok','','w555');
    });

    //$(document).off('click', '#etc-start-date.etc_date');
    $(document).on('click', '#etc-start-date-txt', function (e) {
        $('.cl_etc_date_time').each(function () {
            $(this).removeClass('active');
        });

        if($('#etc-start-date-picker').css('display') == 'block') {
            $(this).removeClass('active');
            $('#etc-start-date-picker').hide();
        } else {
            $('.etc-date').removeClass('active');
            $(this).addClass('active');
            $('#etc-start-date-picker').show();
        }
        $('#etc-end-date-picker').hide();
        $('#etc-except-date-picker').hide();
            
        $('#select-calendar').val('etc-start-date');
        startPicker.generateDates();
        var i = 0;
        var width = 0;
        $('#etc-end-date-picker .Datepickk .d-table input + label').each(function () {
            if (i == 0) width = $(this).width();
            $(this).css('height', width+'px');
            i++;
        });
        var i = 0;
        var width = 0;
        $('#etc-start-date-picker .Datepickk .d-table input + label').each(function () {
            if (i == 0) width = $(this).width();
            $(this).css('height', width+'px');
            i++;
        });
    });

    $(document).on('click', '#etc-end-date-txt', function () {
        $('.cl_etc_date_time').each(function () {
            $(this).removeClass('active');
        });

        if($('#etc-end-date-picker').css('display') == 'block') {
            $(this).removeClass('active');
            $('#etc-end-date-picker').hide();
        } else {
            $('.etc-date').removeClass('active');
            $(this).addClass('active');
            $('#etc-end-date-picker').show();
        }

        $('#etc-start-date-picker').hide();
        $('#etc-except-date-picker').hide();

        $('#select-calendar').val('etc-end-date');
        endPicker.generateDates();
        var i = 0;
        var width = 0;
        $('#etc-end-date-picker .Datepickk .d-table input + label').each(function () {
            if (i == 0) width = $(this).width();
            $(this).css('height', width+'px');
            i++;
        });
        var i = 0;
        var width = 0;
        $('#etc-start-date-picker .Datepickk .d-table input + label').each(function () {
            if (i == 0) width = $(this).width();
            $(this).css('height', width+'px');
            i++;
        });
    });

    $(document).on('click', '#etc-except-date', function () {
        $('.unselect-all').remove();
        
        if($('#etc-except-date-picker').css('display') == 'block') {
            $(this).removeClass('active');
            $('#etc-except-date-picker').hide();
        } else {
            $('.etc-date').removeClass('active');
            $(this).addClass('active');
            $('#etc-except-date-picker').show();
            $('#etc-except-date-picker').append('<div class="unselect-all"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 5c-3.64 0-6.63 2.78-6.97 6.33L3.35 9.65l-0.71 0.71 2.85 2.85 2.85-2.85L7.65 9.65l-1.59 1.59C6.43 8.29 8.95 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6c-1.66 0-3.17-0.68-4.26-1.78l-0.71 0.71C8.3 18.21 10.06 19 12 19c3.87 0 7-3.13 7-7S15.87 5 12 5z"/></svg> 초기화</div>');
            displaySelectedDates();
        }

        $('#etc-start-date-picker').hide();
        $('#etc-end-date-picker').hide();

        setExceptPicker();
        // exceptPicker.generateDates(true);
        var i = 0;
        var width = 0;
        $('#etc-except-date-picker .Datepickk .d-table input + label').each(function () {
            if (i == 0) width = $(this).width();
            $(this).css('height', width+'px');
            i++;
        });


    });

    $(document).on('click', '#etc-except-date-picker .unselect-all', function (e) {
        e.preventDefault();
        exceptPicker.unselectExceptAll();
        //exceptPicker.generateDates(true);
        setExceptPicker();
        $('#etc-except-date').val('-');
        $('.etc-except-date-status').text('');
        $(this).addClass('disabled');
    });

    $(document).on('click', '.email-add-box', function(e){
        if (!$(e.target).is('.email-box')) {
            $('#email-add-input').focus();
        }
    });

    $(document).on('keydown', '#email-add-input', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 9 || keyCode == 13) {
            e.preventDefault();
            enterEmailBox($(this), 'add');
        }
    });

    $(document).on('click', function(e) {
        if($('#email-add-input').length > 0 && !$(e.target).is('#email-add-input')) {
            e.stopPropagation();
            enterEmailBox($('#email-add-input'), 'add');
        }
    });

    $(document).on('click', '.email-box-delt', function (e) {
        e.stopPropagation();
        enterEmailBox($(this), 'delete');
    });

    $(document).on('click', '.email-box', function (e) {
        e.stopPropagation();
        var textWidth = $(this).find('.email-text').width();
        var emailTextInput = $(this).find('.email-text-input');
        var otherBox = $('.email-box').not(this); //선택한 박스 외 다른 박스
        var emailBox = enterEmailBox(otherBox.find('.email-text-input.active input'), 'modify');
        if (emailBox) {
            otherBox.find('.email-text').removeClass('hidden');
            otherBox.find('.email-text-input').addClass('hidden');
            otherBox.find('.email-text-input').removeClass('active');
        }
        if(emailTextInput.hasClass('hidden')) {
            $(this).find('.email-text').addClass('hidden');
            emailTextInput.removeClass('hidden');
            emailTextInput.addClass('active');
            emailTextInput.find('input').css('width', textWidth+'px');
            emailTextInput.find('input').focus();
        }
    });

    $(document).on('keydown', '.email-box', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 9 || keyCode == 13) {
            var emailBox = enterEmailBox($('.email-text-input').not('.hidden').find('input'), 'modify');

            if (emailBox) {
                $(this).find('.email-text').removeClass('hidden');
                $(this).find('.email-text-input').addClass('hidden');
            }
        }
    });

    $(document).on('click', function (e) {
        if (!$(e.target).is('.email-box')) {
            e.stopPropagation();
            var emailBox = enterEmailBox($('.email-text-input.active input'), 'modify');

            if (emailBox) {
                $(this).find('.email-text').removeClass('hidden');
                $(this).find('.email-text-input').addClass('hidden');
                $(this).find('.email-text-input').removeClass('active');
            }
        }
    });
    // if ($('#email-line-box').length > 0) {
    //     var name = $('#email-line-box').attr('name');
    //     var className = $('#email-line-box').attr('class');
    //     var value = $('#email-line-box').val();

    //     var emailList = value.split(',');

    //     var html = '\
    //         <input type="hidden" id="email-line-box" name="'+name+'" class="'+className+'" value="'+value+'">\
    //         <div class="email-add-box">\
    //             <input type="text" id="email-add-input">\
    //         </div>\
    //     ';
    //     $('#email-line-box').before(html);

    //     var html = '';
    //     if (emailList.length >= 1) {
    //         if (emailList[0] != '') {
    //             for (var i=0;i<emailList.length;i++) {
    //                 html += '<div class="email-box">'+emailList[i]+'<span class="email-box-delt"><svg viewBox="0 0 8 8"><polygon points="8 0.71 7.29 0 4 3.29 0.71 0 0 0.71 3.29 4 0 7.29 0.71 8 4 4.71 7.29 8 8 7.29 4.71 4 "/></svg></span></div>'
    //             }

    //             $('#email-add-input').before(html);
    //             var boxWidth = 0;
    //             $('.email-add-box .email-box').each(function () {
    //                 boxWidth += $(this).innerWidth() + 10;
    //             });
    //             var textWidth = $('#email-add-input').parent().innerWidth() - 20,
    //                 uni = 'px';

    //             var totalWidth = textWidth - boxWidth;

    //             if (totalWidth <= 40) {
    //                 totalWidth = 100;
    //                 uni = '%'
    //             }

    //             $('#email-add-input').css('width', totalWidth+uni);
    //         }
    //     }
    //     $('#email-line-box').remove();
    // } L.20211008.
});

function enterEmailBox (el, mode) {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if(mode == 'add' || mode == 'modify') {
        var val = (typeof el.val() !== 'undefined')? el.val().trim() : '';
        if (val == '') return true;
        if(!regExp.test(val)) {
            // alert('이메일 형식이 올바르지 않습니다.');
            var modal = $(this).showModalFlat('','이메일 형식이 올바르지 않습니다.',true,false,function() {
                    modal.modal('hide');
                },'ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                $(document).on('keydown', function(e) {
                    if(e.keyCode == 27) modal.modal('hide');
                });
            });
            el.val('');
            el.focus();
            return false;
        }
        var flag = true;
        $('.email-text').not('.hidden').each(function(idx, v) {
            if($(v).text() == val) {
                // alert('이미 등록된 이메일입니다.');
                var modal = $(this).showModalFlat('','이미 등록된 이메일입니다.',true,false,function() {
                    modal.modal('hide');
                },'ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                    $(document).on('keydown', function(e) {
                        if(e.keyCode == 27) modal.modal('hide');
                    });
                });
                el.val('');
                el.focus();
                flag = false;
                return false;
            }
        });

        if(flag === false) {
            return false;
        }
    }

    if(mode == 'add') {
        var html = '<div class="email-box">\
        <div class="email-text">'+val+'</div>\
        <div class="email-text-input hidden"><input type="text" value="'+val+'"></div>\
        <span class="email-box-delt"><svg viewBox="0 0 8 8"><polygon points="8 0.71 7.29 0 4 3.29 0.71 0 0 0.71 3.29 4 0 7.29 0.71 8 4 4.71 7.29 8 8 7.29 4.71 4 "/></svg></span>\
        </div>';
               
        if($('.email-box').length < 5) { //이메일 최대 5개까지
            el.before(html);
        }
        el.val('');
    } else if (mode == 'delete') {
        if($('.email-box').length <= 1) {
            alert('관리자 수신메일은 최소 1개 이상 등록되어 있어야 합니다.');
            return false;
        }
        el.parent().remove();
    } else if (mode == 'modify') {
        var emailBox = el.closest('.email-box').find('.email-text');
        emailBox.text(val);
    } else {
        return false;
    }
    
    var emailArr = new Array();
    $('.email-add-box .email-box .email-text').each(function () {
        emailArr.push($(this).text());
    });
    console.log(emailArr);
    $('#email-line-box').val(emailArr.join(','))

    if($('.email-box').length >= 5) {
        $('#email-add-input').remove();
    } else {
        if($('#email-add-input').length == 0) {
            $('.email-add-box').append('<input type="text" id="email-add-input">');
        }
        if (mode != 'modify') {
            $('#email-add-input').focus();
        }
    }

    return true;
}

function emailLineFunc () {
    var emailBox = enterEmailBox($('#email-add-input'), 'add');
    
    if ($('.email-box.none').length > 0) {
        alert('옳바르지 않은 이메일 주소가 포함되어있습니다.');
        return false;
    }
    
    if (emailBox === false) {
        $('#email-add-input').focus();
        return false;
    }

    return true;
}

function division (option, n) {
    var arr = option;
    var len = arr.length;
    var cnt = Math.floor(len / n) + (Math.floor(len % n) > 0 ? 1 : 0);
    var tmp = [];

    for (var i=0;i<cnt;i++) {
        tmp.push(arr.splice(0, n));
    }

    return tmp;
}

function truncateReviewTitle (reviewArr) { //상품후기 제목 자르기
    $('.s-table-review .review-content>div').each(function(idx, item){
        var reviewContent = reviewArr[idx];
        
        if(reviewContent !== undefined) {
            $(this).html(reviewContent);

            for(var i = reviewContent.length; i > 0; i--){
                if($(this).height() > 60) {
                    $(this).html(reviewContent.substr(0, i));
                    $(this).append('...');
                }
                else {
                    break;
                }
            }
        }
    });
}

function nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function extra_charge_info($obj,total_payment, return_payment,extra_charge) {
    $(".order-cancel-content.extra-info").remove();
    var s = '\
    <div class="order-cancel-content extra-info">\
        <div class="cancel-info-box">\
            <p class="error">결제 당시 무료배송 조건( ' + number_format(extra_charge) + '원 )을 충족하지 못해 배송료가 발생 할 수 있습니다. 자세한 사항은 판매자의 안내를 따라주세요</p>\
        </div>\
    </div>\
    ';
    if(total_payment > extra_charge && total_payment - return_payment < extra_charge && total_payment > return_payment) {
        if($obj.find(".modal-comment.point-used-desc").length) {
            $obj.find(".modal-comment.point-used-desc").before(s);
        } else {
            $obj.append(s);
        }
    }
}

function setCLEscrowFooter(sid,plantype,obj) {
    if(typeof sid == 'undefined') return false;


    if( typeof plantype == 'undefined' || plantype != 'SM' || 
        typeof obj == 'undefined' || 
        typeof obj.onoff == 'undefined' || !obj.onoff || obj.onoff === false ||
        typeof obj.key == 'undefined' || !obj.key || obj.key == ''
    ) {
        $('.el-footer').find('.escrow-image-wrap-box').remove();
        return false;
    }

    var escrow_img = (typeof obj.type != 'undefined' && obj.type) ? obj.type : 1,
        escrow_key = obj.key,
        checkCLEscrowFooter = ($('.el-footer').find('.escrow-image-wrap-box').length > 0) ? true : false,
        clef_str = '\
            <div class="escrow-image-wrap">\
                <a href="//admin.kcp.co.kr/Modules/escrow/kcp_pop.jsp?site_cd=' + escrow_key + '" target="_blank">\
                    <img src="//storage.googleapis.com/i.addblock.net/shopping_mall/escrow_site/escrow_site0' + escrow_img + '.png" />\
                </a>\
            </div>\
    ';

    if(checkCLEscrowFooter) $('.el-footer').find('.escrow-image-wrap-box').html('<br>'+clef_str);
    else $('.el-footer').find('.container .row').append('<div class="col-xs-12 col-sm-12 col-md-12 clearfix clear escrow-image-wrap-box"><br>' + clef_str + '</div>');
}


function setSiteLogs(action,v,obj,page,ref) {
    $.post('/slog/set', { action : action, v : v , obj : (typeof obj == 'object' && Object.keys(obj).length > 0) ? JSON.stringify(obj) : obj, page : page, ref : ref }, function(data) {
        if(typeof data.error != 'undefined' && data.error) {
            console.log(data.error);
            return false;
        }
    },'json');
}

function getProductInfoList() {
    var input_empty = false,
        cate_null = false,
        idx = 0,
        prod_info_cate = $('.prod-select-title').text().trim(),
        $prod_info_lists = $('.prod-lists > div'),
        prod_info = {
            'title' : prod_info_cate,
            'content' : []
        };
        prod_null = new Array();

    if(prod_info_cate=='선택하세요') {
        cate_null = true;
    }

    $.each($prod_info_lists, function(i,v) {
        if($(this).hasClass('prod-info-list-save')) return true;

        var info_list_title = $(this).find('label').text(),
            info_list_content = ($(this).find('.prod-input-value').length > 0) ? $(this).find('.prod-input-value').html().trim() : '';
        if(info_list_content.length > 0) info_list_content = info_list_content.replace(/&nbsp;/gi, '');

        if(info_list_content.length==0) { 
            idx = i;
            input_empty = true;
            prod_null.push(idx);
        }
        var s = { 
            'title' : info_list_title,
            'content' : info_list_content
        }
        prod_info.content.push(s);
    });
    prod_info.input_empty = input_empty;
    prod_info.input_idx = idx;
    prod_info.cate_null = cate_null;
    return prod_info;
}

function setOptionlist($data, func) {
    var check_quantity = $('.prod-detail-wrap .switch-quantity').prop('checked'),
        normal_options_count = 0;

    $.each($data, function(idx,o) { //상품옵션 로드
        switch(o.option_status) {
            case "S" : str = '판매'; break;
            case "O" : str = '품절'; break;
            case "H" : str = '숨김'; break;
            default : str = '판매'; o.option_status = 'S'; break;
        }

        if(typeof o.option_quantity == 'undefined' || o.option_quantity == null) o.option_quantity = 0;
        if(typeof o.option_price == 'undefined' || o.option_price == null) o.option_price = 0;

        var s = "";
        if(typeof o.option_type !='undefined' && o.option_type.indexOf('T') > -1) {
            s = '\
            <li>\
                <div class="prod-option-item">\
                    <span class="prod-option-title" data-seq="' + o.seq + '">' + o.option_name + '</span>\
                    <span class="prod-option-require" data-val="' + o.option_type + '">';
                s += '</span>\
                </div>\
                <div class="prod-option-edit hide">\
                    <div class="form-wrap">\
                        <div class="form-group edit-option-title">\
                            <input type="text" maxlength="20" placeholder="안내문구 입력 (예:두께를 mm단위로 입력해주세요.)"/>\
                        </div>\
                        <div class="edit-option-delete" data-seq="' + o.seq + '"><svg viewBox="0 0 12 13" width="12" height="13"><path d="M12 2h-1H9V0H3.02v2H1 0v1h1v8c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V3h1V2zM4.02 1H8v1H4.02V1zM10 11c0 0.55-0.45 1-1 1H3c-0.55 0-1-0.45-1-1V3h1.02H9h1V11z"/><rect x="4" y="4" width="1" height="7"/><rect x="7" y="4" width="1" height="7"/></svg></div>\
                    </div>\
                </div>';
        } else {
            var option_price = Number(o.option_price),
                only_price = Math.abs(option_price),
                str_price = only_price.toString(),
                str_quantity = (o.option_quantity).toString(),
                minus = (option_price < 0)? 'minus':'',
                option_name = o.option_name;

                if(o.option_mix3) {
                    option_name = '<label class="owidth ow1">' + o.option_mix2 + '</label><label class="owidth ow2">' + o.option_mix3 + '</label><label class="owidth ow3">' + option_name + '</label>';
                } else {
                    if(o.option_mix2) {
                        option_name = '<label class="owidth ow1">' + o.option_mix2 + '</label><label class="owidth ow2">' + option_name + '</label>';
                    } else if(o.option_group) {
                        option_name = '<label class="owidth ow1">' + o.option_group + '</label><label class="owidth ow2">' + option_name + '</label>';
                    }
                }
            s = '\
            <li>\
                <div class="prod-option-item">\
                    <span class="prod-option-title" data-seq="' + o.seq + '">' + option_name + '</span>\
                    <span class="prod-option-price '+minus+'" data-option-price="'+o.option_price+'">' + addCommas(str_price) + '</span>\
                    <span class="prod-option-quantity" ' + ((check_quantity) ? '' : 'style="display:none"') + '>' + addCommas(str_quantity) + '</span>\
                    <span class="prod-option-status" data-val="' + o.option_status + '">' + str + '</span>\
                    <span class="prod-option-move"><i class="fa fa-arrows" aria-hidden="true"></i></span>\
                </div>\
                <div class="prod-option-edit hide">\
                    <div class="form-wrap">\
                        <div class="form-group edit-option-title">\
                            <input type="text" maxlength="60" placeholder="옵션값"/>\
                        </div>\
                        <div class="form-group edit-option-price">\
                            <input type="text" class="option-price-number sign" placeholder="0" numberOnly/>\
                        </div>\
                        <div class="form-group edit-option-quantity" ' + ((check_quantity) ? '' : 'style="display:none"') + '>\
                            <input type="text" class="option-price-quantity" maxlength="5" placeholder="0" numberonly/>\
                        </div>\
                        <div class="form-group edit-option-select">\
                            <div class="option-price-status-str hand" data-val="' + o.option_status + '">' + str + '</div>\
                            <ul class="option-price-status-select">\
                                <li data-val="S">판매</li>\
                                <li data-val="O">품절</li>\
                                <li data-val="H">숨김</li>\
                            </ul>\
                        </div>\
                        <div class="edit-option-delete" data-seq="' + o.seq + '"><svg viewBox="0 0 12 13" width="12" height="13"><path d="M12 2h-1H9V0H3.02v2H1 0v1h1v8c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V3h1V2zM4.02 1H8v1H4.02V1zM10 11c0 0.55-0.45 1-1 1H3c-0.55 0-1-0.45-1-1V3h1.02H9h1V11z"/><rect x="4" y="4" width="1" height="7"/><rect x="7" y="4" width="1" height="7"/></svg></div>\
                    </div>\
                </div>';
                // console.log('option_type:'+o.option_type);
            if (o.product_state && o.option_type!='A' && o.option_type!='T') {
                var p_s_data = JSON.parse(o.product_state);

                if (p_s_data.file_name) {
                    if (fileUpdateCnt == 0) fileUpdateCnt++;
                    if (loadFile == 0) loadFile++;
                    s += '<div class="form-group product-status">\
                            <div class="product-state-box">\
                                <div class="product-upload">\
                                    <div class="title">파일 업로드</div>\
                                    <div class="download-contents">\
                                        <span class="cl_icon_upload02" data-cnt="'+fileUpdateCnt+'">업로드</span>\
                                        <div class="file-box-list" id="file-box-'+fileUpdateCnt+'">';

                                            var serverName = p_s_data.file_url.split('/');
                                            s += '<div class="file-name file-name-'+loadFile+'">\
                                                    <span class="real-file-name">'+p_s_data.file_name+'</span>\
                                                    <span class="file-name-detail" title="'+p_s_data.file_name+'">'+p_s_data.file_str_name+'</span>\
                                                    <span class="file-size">'+p_s_data.file_size+'</span>\
                                                    <span class="cl-icon cl_icon_close" data-cnt="'+loadFile+'" data-pn="'+o.product_number+'" data-file="'+serverName[8]+'" data-seq="'+o.seq+'"></span>\
                                                    <span class="file-url">'+p_s_data.file_url+'</span>\
                                                </div>';
                                            loadFile++;

                    s += '              </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>';
                }
            }
            fileUpdateCnt++;
        }
        s += "</li>";

        optionLength = Object.keys($data).length;
        if($data.length == 1 && o.option_name=='noneOption') {
            $('.prod-option[data-option_mode="normal"] .prod-option-list').append(s);
        } else {      
            if(o.option_type !== undefined && o.option_type.indexOf('T') > -1) {
                if($data.length > 0) {
                    $('.prod-option[data-option_mode="text"] .prod-option-list').append(s);
                    $('.option-state-box .newcheckbox').eq(1).find('#text-option').prop('checked',true);
                    $('.prod-option-tab').removeClass('hide');
                    $('.prod-option[data-option_mode="text"]').removeClass('hide');
                }
            } else if(o.option_type == 'A') {
                if($data.length > 0) {
                    $('.prod-option[data-option_mode="additional"] .prod-option-list').append(s);
                    $('.option-state-box .newcheckbox').eq(2).find('#additional-option').prop('checked',true);
                    $('.prod-option-tab').removeClass('hide');
                    $('.prod-option[data-option_mode="additional"]').removeClass('hide');
                    $('.prod-option[data-option_mode="additional"] .plus-price').removeClass('hide');
                    $('.prod-option[data-option_mode="additional"] .plus-status').removeClass('hide');

                }
            } else {
                $('.prod-option[data-option_mode="normal"] .prod-option-list').append(s);
                normal_options_count++;
                if(normal_options_count > 1) {
                    $('.option-state-box .newcheckbox').eq(0).find('#normal-option').prop('checked',true);
                    $('.prod-option-tab').removeClass('hide');
                    $('.prod-option[data-option_mode="normal"]').removeClass('hide');
                    $('.prod-option[data-option_mode="normal"] .plus-price').removeClass('hide');
                    $('.prod-option[data-option_mode="normal"] .plus-status').removeClass('hide');
                }
            }
        }

        if($('.prod-option[data-option_mode="normal"] .prod-option-list > li').length == 1) {
            $('.prod-option[data-option_mode="normal"]').addClass('hide');
            $('.option-state-box .newcheckbox').eq(0).find('#normal-option').prop('checked',false);
        }
        if($('.prod-option[data-option_mode="text"] .prod-option-list > li').length == 0) {
            $('.prod-option[data-option_mode="text"]').addClass('hide');
            $('.option-state-box .newcheckbox').eq(1).find('#text-option').prop('checked',false);
        }
        if($('.prod-option[data-option_mode="additional"] .prod-option-list > li').length == 0) {
            $('.prod-option[data-option_mode="additional"]').addClass('hide');
            $('.option-state-box .newcheckbox').eq(2).find('#additional-option').prop('checked',false);
        }
        
        $('#product-state').find('input[type="file"]').attr('data-cnt', loadFile).click();
    }); 
    
    if(typeof func == 'function') {
        func();
    }
}

var setAdvancedMode = function(r) {
    if(r == "true") { // 고급모드
        $('.option-type-title.tp2, .option-type-title.tp3').removeClass('hide');
        $('.option-type-title3.tp2, .option-type-title3.tp3').removeClass('hide');
        $('.options-config').addClass('active');
        $('.prod-option-list').sortable('disable');
        $('.edit-option-title input').prop('disabled', true);
        $('.prod-option-item .prod-option-move').addClass('invisible');
        $('.edit-option-delete').addClass('invisible');
        $('.prod-option-add').addClass('hide');
        $('.reset-wrap').removeClass('hide');
        $('.option-type-title.tp1').removeClass('editable');
        $('.prod-option[data-option_mode="text"] > .text-option-info').removeClass('editable');
        $('.prod-option[data-option_mode="text"] > .option-head').removeClass('editable');
        $('.option-type-title3.tp1').removeClass('editable');
    } else {
        $('.option-type-title.tp2, .option-type-title.tp3').addClass('hide');
        $('.option-type-title3.tp2, .option-type-title3.tp3').addClass('hide');
        $('.options-config').removeClass('active');
        $('.prod-option-list').sortable('enable');
        $('.edit-option-title input').prop('disabled', false);
        $('.prod-option-item .prod-option-move').removeClass('invisible');
        $('.edit-option-delete').removeClass('invisible');
        $('.prod-option-add').removeClass('hide');
        $('.reset-wrap').addClass('hide');
        $('.option-type-title.tp1').addClass('editable');
        $('.prod-option[data-option_mode="text"] > .text-option-info').addClass('editable');
        $('.prod-option[data-option_mode="text"] > .option-head').addClass('editable');
        $('.option-type-title3.tp1').addClass('editable');
    }
    if($('.prod-option-tab .prod-option.hide').length == 3) { //탭 모두 비활성화일때
        $('.reset-wrap').addClass('hide');
    }

    switch(product_options.type) {
        case "1": 
            $('.option-head-str').text('단일형');
            $('.option-type-title.tp1').text('옵션명');
            $('.option-type-title.tp2').text('옵션값');
            $('.option-type-title.tp3').text('');
            break;
        case "2": 
            $('.option-head-str').text('2개 조합형');
            if(product_options['config1'][0] !== undefined)
                $('.option-type-title.tp1').text(product_options['config1'][0]['title']).removeClass('editable');
            if(product_options['config1'][0] !== undefined)
                $('.option-type-title.tp2').text(product_options['config1'][0]['value']);
            $('.option-type-title.tp3').text('');
            break;
        case "3": 
            $('.option-head-str').text('3개 조합형');
            if(product_options['config1'][0] !== undefined)
                $('.option-type-title.tp1').text(product_options['config1'][0]['title']).removeClass('editable');
            if(product_options['config1'][0] !== undefined)
                $('.option-type-title.tp2').text(product_options['config1'][0]['value']);
            if(product_options['config1'][0] !== undefined)
                $('.option-type-title.tp3').text(product_options['config1'][0]['value2']);
            break;
        default:
            $('.option-head-str').text('기본형');
            $('.option-type-title.tp1').text('옵션명');
            $('.option-type-title.tp2').text('옵션값');
            $('.option-type-title.tp3').text('');
            break;            
    }
}
var switchQuantity = function() {
    if($('.switch-quantity').is(':checked')) {
        $('.switch-quantity').parents('.form-wrap').removeClass('disabled');
        $('.prod-option-quantity, .prod-plus-quantity, .edit-option-quantity').show();

        if($('#normal-option').is(':checked') === true) {
            // $('#prod-quantity').attr('readonly','true').removeClass('hide').attr('placeholder','옵션에서 재고 관리');
            $('.quantity-label').addClass('on');
            $('.plus-quantity').removeClass('hide');
        } else if($('#normal-option').is(':checked') === false && $('#additional-option').is(':checked') === true) {
            $('.quantity-label').removeClass('on');
            $('#prod-quantity').removeAttr('readonly').removeClass('hide');
            $('.plus-quantity').removeClass('hide');
        } else {
            $('.quantity-label').removeClass('on');
            $('#prod-quantity').removeAttr('readonly').removeClass('hide');
            $('.plus-quantity').addClass('hide');
        }
    } else {
        $('.quantity-label').removeClass('on');
        $('.switch-quantity').parents('.form-wrap').addClass('disabled');
        $('#prod-quantity').addClass('hide');
        $('.prod-option-quantity, .prod-plus-quantity, .edit-option-quantity').hide();
        $('.plus-quantity').addClass('hide');
    }
}        

function getMapURL(map_url, return_type) {
    /*
        https://www.google.co.kr/maps/@37.4817147,127.0069527,14z
        https://www.google.co.kr/maps/place/%EB%82%B4%EB%B0%A9%EC%97%AD/@37.4817147,127.0069527,14z/data=!4m5!3m4!1s0x357ca1a63a309789:0xb47e374059d4245b!8m2!3d37.487707!4d126.993598
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.016222643161!2d126.96939075969449!3d37.554681575448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca266e3947003%3A0xe7be97c172b7af6a!2z7ISc7Jq47Jet!5e0!3m2!1sko!2skr!4v1628745599351!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    

        https://www.google.com/maps/place/%EC%9D%B4%EC%88%98%EC%97%AD/@37.4857251,126.9797283,17z/data=!4m9!1m2!2m1!1z7J207IiY7Jet!3m5!1s0x357ca1b3e26dcf3d:0xa16abe6619550e35!8m2!3d37.486491!4d126.981876!15sCgnsnbTsiJjsl62SAQtidXNfc3RhdGlvbg?hl=ko
        https://www.google.com/maps/search/%EC%9D%B4%EC%88%98%EC%97%AD/@37.4857251,126.9797283,17z/data=!3m1!4b1?hl=ko
    */
    

    var checkGoogle = (map_url.match(/^(https|http)\:\/\/www\.google(\.co\.kr|\.com)\/maps\//g) !== null) ? true : false;
    if(checkGoogle) {
        var checkEmbed = (map_url.match(/^(https|http)\:\/\/www\.google(\.co\.kr|\.com)\/maps\/embed\?/g) !== null) ? true : false,
            checkPlace = (map_url.match(/^(https|http)\:\/\/www\.google(\.co\.kr|\.com)\/maps\/(place|search)/g) !== null) ? true : false;
        if(checkEmbed) {
            var map_src = map_url;
        } else {
            var map_arr = map_url.replace(/^(https|http)\:\/\/www\.google(\.co\.kr|\.com)\/maps\//g,'').split('/'),
                map_tmp = (checkPlace) ? map_arr[2].split(',') : map_arr[0].split(','),
                map_unit = (typeof map_tmp[2] != 'undefined' && map_tmp[2]) ? map_tmp[2].replace(/[0-9.]/g,'') : '',
                map_place = (checkPlace) ? map_arr[1] : '',
                map_xy = map_tmp[0].replace(/^@/,'') + ' ' + map_tmp[1],
                map_zoom = (map_unit == 'z') ? parseInt(map_tmp[2].replace('z','')) : 17,
                // 위성지도 map_miter = (map_unit == 'm') ? map_tmp[2].replace('m','') : '',
                map_query = (checkPlace) ? map_place : map_xy;


            if(map_unit == 'z') map_query += '&z='+map_zoom;
            // 위성지도  if(map_unit == 'm') map_query += '&t=k';

            // 언어
            var check_lang = map_arr[map_arr.length-1];
            if(typeof check_lang != 'undefined' && check_lang) {
                var lang_arr = check_lang.split('?'),
                    lang_str = '';
                $.each(lang_arr, function(i,tmp) {
                    if(tmp.match(/^hl\=(ko|en|eu|ca|hr|cs|da|nl}fi|fr|de|gl|el|hi|id|it|ja|no|nn|pt|rm|ru|sr|sk|sl|es|sv|th|tr|uk|vi)/g) !== null) {
                        map_query += '&hl=' + tmp.replace(/^hl=/g,'');
                    }
                });
            }
            
            var map_src = '//www.google.com/maps?q=' + map_query + '&ll=' + map_xy.replace(/ /,',') + '&output=embed';
        }

        var map_iframe = '\
            <iframe class="google-map" src="' + map_src + '" data-map="true" data-url="' + map_url + '" allowfullscreen="" loading="lazy"></iframe>\
        ';
        if(return_type == 'html') return map_iframe;
        else if(return_type == 'src') return map_src;
        // else if(return_type == 'obj') {
        //     return {
        //         'url' : map_url,
        //         'src' : map_src,
        //         'html' : map_iframe.trim(),
        //         'place' : (checkPlace) ? map_place : '',
        //         'xy' : (checkPlace) ? map_xy : '',
        //         'unit' : (checkPlace) ? map_unit : '',
        //         'zoom' : (checkPlace) ? map_zoom : '',
        //     };
        // }
    } else {
        var map_src = '//www.google.com/maps?q=서울특별시&z=10&output=embed',
            map_iframe = '\
            <iframe class="google-map disabled" src="' + map_src + '" data-map="true" data-url="' + map_src + '" allowfullscreen="" loading="lazy"></iframe>\
            <div class="map-undefined"><span>지도 URL을 다시 설정해주세요</span></div>\
        ';

        if(return_type == 'html') return map_iframe;
        else if(return_type == 'src') return map_src;
    }
}