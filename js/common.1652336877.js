var selRange;
if (typeof(COMMON_JS) == 'undefined') {
    jQuery.migrateTrace = false;
    jQuery.migrateMute = true;
    $.fn.outerHTML = function(){
        return $(this).clone().wrapAll("<div/>").parent().html();
    }

    if (typeof rt_path == 'undefined')
        alert('rt_path 변수가 선언되지 않았습니다.');


    var COMMON_JS = true;

    function win_open(url, name, option) {
        var popup = window.open(rt_path + '/' + url, name, option);
        popup.focus();
    }

    // 쪽지 창
    function win_memo(url) {
        if (!url)
            url = "member/memo/lists";
        win_open(url, "winMemo", "left=50,top=50,width=620,height=460,scrollbars=1");
    }

    // 자기소개 창
    function win_profile(mb_id) {
        win_open("member/profile/qry/" + mb_id, 'winProfile', 'left=50,top=50,width=400,height=500,scrollbars=1');
    }

    // 우편번호 창
    function win_zip(frm_name, frm_zip1, frm_zip2, frm_addr1, frm_addr2) {
        url = "useful/zip/qry/" + frm_name + "/" + frm_zip1 + "/" + frm_zip2 + "/" + frm_addr1 + "/" + frm_addr2;
        win_open(url, "winZip", "left=50,top=50,width=616,height=460,scrollbars=1");
    }

    // POST 전송, 결과값 리턴
    function post_s(href, parm, del) {
        /*if (!del || confirm(  $.lang[LANG]['page.board.cts.msg.delete'] )) {
            $.post(rt_path + '/' + href, parm, function (req) {
                document.write(req);
            });
        }*/
        var confirm = false;
        var modal = $(this).showModalFlat('',$.lang[LANG]['page.board.cts.msg.delete'],true,true,function() {
            confirm = true;
            if (!del || confirm) {
                $.post(rt_path + '/' + href, parm, function (req) {
                    document.write(req);
                });
            }
        },'cancel','ok','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
            $(document).on('keydown', function(e) {
                if(e.keyCode == 27) modal.modal('hide');
            });
        });
    }

    // POST 이동
    function post_goto(url, parm, target) {
        var f = document.createElement('form');

        var objs, value;
        for (var key in parm) {
            value = parm[key];
            objs = document.createElement('input');
            objs.setAttribute('type', 'hidden');
            objs.setAttribute('name', key);
            objs.setAttribute('value', value);
            f.appendChild(objs);
        }

        if (target)
            f.setAttribute('target', target);

        f.setAttribute('method', 'post');
        f.setAttribute('action', rt_path + '/' + url);
        document.body.appendChild(f);
        f.submit();
    }

    // POST 창
    function post_win(name, url, parm, opt) {
        var temp_win = window.open('', name, opt);
        post_goto(url, parm, name);
    }

    // 일반 삭제 검사 확인
    function del(href) {
        if (confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?"))
            document.location.href = rt_path + '/' + href;
    }

    // 플래시에 변수 추가 fh
    function flash_movie(src, ids, width, height, wmode, fh) {
        var wh = "";
        if (parseInt(width) && parseInt(height))
            wh = " width='" + width + "' height='" + height + "' ";
        return "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' " + wh + " id=" + ids + "><param name=wmode value=" + wmode + "><param name=movie value=" + src + "><param name=quality value=high><param name=flashvars value=" + fh + "><embed src=" + src + " quality=high wmode=" + wmode + " flashvars=" + fh + " type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash' " + wh + "></embed></object>";
    }

    // 동영상 파일
    function obj_movie(src, ids, width, height, autostart) {
        var wh = "";
        if (parseInt(width) && parseInt(height))
            wh = " width='" + width + "' height='" + height + "' ";
        if (!autostart) autostart = false;
        return "<embed src='" + src + "' " + wh + " autostart='" + autostart + "'></embed>";
    }

    // 아이프레임 높이 자동조절
    function reSize(obj) {
        try {
            var objBody = frames[obj].document.body;
            var objFrame = document.getElementById(obj);
            ifrmHeight = objBody.scrollHeight + (objBody.offsetHeight - objBody.clientHeight);
            objFrame.style.height = ifrmHeight;
        }
        catch (e) {
        }
    }

    function sEncode(val) {
        return encodeURIComponent(val).replace(/%/g, '.');
    }

    // script 에서 js 파일 로드
    function importScript(FILES) {
        var _importScript = function (filename) {
            if (filename) {
                document.write('<script type="text/javascript" src="' + rt_path + '/js/' + filename + '.js"></s' + 'cript>');
            }
        };

        for (var i = 0; i < FILES.length; i++) {
            _importScript(FILES[i]);
        }
    }

    // jQuery textarea
    function txresize(tx, type, size) {
        var tx = $('#' + tx);
        if (type == 1)
            tx.animate({'height': '-=' + size + 'px'}, 'fast');
        else if (type == 2)
            tx.animate({'height': size}, 'fast');
        else if (type == 3)
            tx.animate({'height': '+=' + size + 'px'}, 'fast');
    }

    // 팝업 닫기
    function popup_close(id, onday) {
        if (onday) {
            var today = new Date();
            today.setTime(today.getTime() + (60 * 60 * 1000 * 24));
            document.cookie = id + "=" + escape(true) + "; path=/; expires=" + today.toGMTString() + ";";
        }

        if (window.parent.name.indexOf(id) != -1)
            window.close();
        else
            document.getElementById(id).style.display = 'none';
    }

    function checkcode(e) {
        var code = (window.event) ? event.keyCode : e.which; //IE : FF - Chrome both
        if (code > 31 && code < 45) nAllow(e);
        if (code > 45 && code < 48) nAllow(e);
        if (code > 57 && code < 65) nAllow(e);
        if (code > 90 && code < 97) nAllow(e);
        if (code > 122 && code < 127) nAllow(e);
    }

    function nAllow(e) {
        alert('특수문자 - 만 사용할수있습니다');
        if (navigator.appName != "Netscape") {
            //for not returning keycode value
            event.returnValue = false;  //IE ,  - Chrome both
        } else {
            e.preventDefault(); //FF ,  - Chrome both
        }
    }

    function copyToClipboard(text) {
        if (window.clipboardData && window.clipboardData.setData) {
            // IE specific code path to prevent textarea being shown while dialog is visible.
            return clipboardData.setData("Text", text); 

        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }
    
    function copyTextToClipboard(text) {
        var copyFrom = $('<textarea class="hide"/>');
        copyFrom.text(text);
        $('body').append(copyFrom);
        copyFrom.select();
        document.execCommand('copy');
        copyFrom.remove();
    }

    function trim(str) {
        str = str.replace(/^\s*/, '').replace(/\s*$/, '');
        return str; //변환한 스트링을 리턴.
    }

    jQuery.fn.center = function () {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    }

    function setCookie(cookieName, cookieValue, expireDate) {
        var today = new Date();
        today.setDate(today.getDate() + parseInt(expireDate));
        document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/; expires=" + today.toGMTString() + ";";
    }

    function getCookie(cookieName) {
        var search = cookieName + "=";
        var cookie = document.cookie;

        // 현재 쿠키가 존재할 경우
        if (cookie.length > 0) {
            // 해당 쿠키명이 존재하는지 검색한 후 존재하면 위치를 리턴.
            startIndex = cookie.indexOf(cookieName);

            // 만약 존재한다면
            if (startIndex != -1) {
                // 값을 얻어내기 위해 시작 인덱스 조절
                startIndex += cookieName.length;

                // 값을 얻어내기 위해 종료 인덱스 추출
                endIndex = cookie.indexOf(";", startIndex);

                // 만약 종료 인덱스를 못찾게 되면 쿠키 전체길이로 설정
                if (endIndex == -1) endIndex = cookie.length;

                // 쿠키값을 추출하여 리턴
                return unescape(cookie.substring(startIndex + 1, endIndex));
            } else {
                // 쿠키 내에 해당 쿠키가 존재하지 않을 경우
                return false;
            }
        } else {
            // 쿠키 자체가 없을 경우
            return false;
        }
    }

    function deleteCookie(cookieName) {
        var expireDate = new Date();

        //어제 날짜를 쿠키 소멸 날짜로 설정한다.
        expireDate.setDate(expireDate.getDate() - 1);
        document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
    }

    function getRandom() {
        var result = Math.floor(Math.random() * 10) + 1;
        return result;
    }

    function strpos(haystack, needle, offset) {
        // From: http://phpjs.org/functions
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: Onno Marsman
        // +   bugfixed by: Daniel Esteban
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
        // *     returns 1: 14
        var i = (haystack + '').indexOf(needle, (offset || 0));
        return i === -1 ? false : i;
    }
    
    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function htmlspecialchars_decode(string, quote_style) {
        var optTemp = 0,
            i = 0,
            noquotes = false;
        if (typeof quote_style === 'undefined') {
            quote_style = 2;
        }
        string = string.toString()
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;lt;/g, '<')
            .replace(/&amp;gt;/g, '>');

        var OPTS = {
            'ENT_NOQUOTES': 0,
            'ENT_HTML_QUOTE_SINGLE': 1,
            'ENT_HTML_QUOTE_DOUBLE': 2,
            'ENT_COMPAT': 2,
            'ENT_QUOTES': 3,
            'ENT_IGNORE': 4
        };
        if (quote_style === 0) {
            noquotes = true;
        }
        if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
            quote_style = [].concat(quote_style);
            for (i = 0; i < quote_style.length; i++) {
                // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
                if (OPTS[quote_style[i]] === 0) {
                    noquotes = true;
                } else if (OPTS[quote_style[i]]) {
                    optTemp = optTemp | OPTS[quote_style[i]];
                }
            }
            quote_style = optTemp;
        }
        if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
            string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
            // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
        }
        if (!noquotes) {
            string = string.replace(/&quot;/g, '"');
        }
        // Put this in last place to avoid escape being double-decoded
        string = string.replace(/&amp;/g, '&');

        return string;
    }

    function explode(delimiter, string, limit) {
        //  discuss at: http://phpjs.org/functions/explode/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //   example 1: explode(' ', 'Kevin van Zonneveld');
        //   returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}

        if (arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined') return null;
        if (delimiter === '' || delimiter === false || delimiter === null) return false;
        if (typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string ===
            'object') {
            return {
                0: ''
            };
        }
        if (delimiter === true) delimiter = '1';

        // Here we go...
        delimiter += '';
        string += '';

        var s = string.split(delimiter);

        if (typeof limit === 'undefined') return s;

        // Support for limit
        if (limit === 0) limit = 1;

        // Positive limit
        if (limit > 0) {
            if (limit >= s.length) return s;
            return s.slice(0, limit - 1)
                .concat([s.slice(limit - 1)
                    .join(delimiter)
                ]);
        }

        // Negative limit
        if (-limit >= s.length) return [];

        s.splice(s.length + limit);
        return s;
    }

    function microtime(get_as_float) {
      var now = new Date()
        .getTime() / 1000;
      var s = parseInt(now, 10);

      return (get_as_float) ? now*1000 : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
    }

    function log(r) {
        console.log(r);
    }
    
    function pathinfo(path, options) {
    //        note: which makes it fully compliant with PHP syntax.
    //  depends on: basename
    //   example 1: pathinfo('/www/htdocs/index.html', 1);
    //   returns 1: '/www/htdocs'
    //   example 2: pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME');
    //   returns 2: 'index.html'
    //   example 3: pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION');
    //   returns 3: 'html'
    //   example 4: pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME');
    //   returns 4: 'index'
    //   example 5: pathinfo('/www/htdocs/index.html', 2 | 4);
    //   returns 5: {basename: 'index.html', extension: 'html'}
    //   example 6: pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL');
    //   returns 6: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
    //   example 7: pathinfo('/www/htdocs/index.html');
    //   returns 7: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
        var opt = '',
        optName = '',
        optTemp = 0,
        tmp_arr = {},
        cnt = 0,
        i = 0;
        var have_basename = false,
        have_extension = false,
        have_filename = false;

        // Input defaulting & sanitation
        if (!path) {
            return false;
        }
        if (!options) {
            options = 'PATHINFO_ALL';
        }

        // Initialize binary arguments. Both the string & integer (constant) input is
        // allowed
        var OPTS = {
            'PATHINFO_DIRNAME': 1,
            'PATHINFO_BASENAME': 2,
            'PATHINFO_EXTENSION': 4,
            'PATHINFO_FILENAME': 8,
            'PATHINFO_ALL': 0
        };
    
        // PATHINFO_ALL sums up all previously defined PATHINFOs (could just pre-calculate)
        for (optName in OPTS) {
            OPTS.PATHINFO_ALL = OPTS.PATHINFO_ALL | OPTS[optName];
        }
        if (typeof options !== 'number') { // Allow for a single string or an array of string flags
            options = [].concat(options);
            for (i = 0; i < options.length; i++) {
            // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
                if (OPTS[options[i]]) {
                    optTemp = optTemp | OPTS[options[i]];
                }
            }
            options = optTemp;
        }

        // Internal Functions
        var __getExt = function(path) {
            var str = path + '';
            var dotP = str.lastIndexOf('.') + 1;
                return !dotP ? false : dotP !== str.length ? str.substr(dotP) : '';
        };
        function basename(path, suffix) {
            //  discuss at: http://phpjs.org/functions/basename/
            // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: Ash Searle (http://hexmen.com/blog/)
            // improved by: Lincoln Ramsay
            // improved by: djmix
            // improved by: Dmitry Gorelenkov
            //   example 1: basename('/www/site/home.htm', '.htm');
            //   returns 1: 'home'
            //   example 2: basename('ecra.php?p=1');
            //   returns 2: 'ecra.php?p=1'
            //   example 3: basename('/some/path/');
            //   returns 3: 'path'
            //   example 4: basename('/some/path_ext.ext/','.ext');
            //   returns 4: 'path_ext'

            var b = path;
            var lastChar = b.charAt(b.length - 1);

            if (lastChar === '/' || lastChar === '\\') {
                b = b.slice(0, -1);
            }

            b = b.replace(/^.*[\/\\]/g, '');

            if (typeof suffix === 'string' && b.substr(b.length - suffix.length) == suffix) {
                b = b.substr(0, b.length - suffix.length);
            }
            return b;
        }        

        // Gather path infos
        if (options & OPTS.PATHINFO_DIRNAME) {
            var dirName = path.replace(/\\/g, '/')
                .replace(/\/[^\/]*\/?$/, ''); // dirname
            tmp_arr.dirname = dirName === path ? '.' : dirName;
        }

        if (options & OPTS.PATHINFO_BASENAME) {
            if (false === have_basename) {
                have_basename = basename(path);
            }
            tmp_arr.basename = have_basename;
        }

        if (options & OPTS.PATHINFO_EXTENSION) {
            if (false === have_basename) {
                have_basename = basename(path);
            }
            if (false === have_extension) {
                have_extension = __getExt(have_basename);
            }
            if (false !== have_extension) {
                tmp_arr.extension = have_extension;
            }
        }

        if (options & OPTS.PATHINFO_FILENAME) {
            if (false === have_basename) {
                have_basename = basename(path);
            }
            if (false === have_extension) {
                have_extension = __getExt(have_basename);
            }
            if (false === have_filename) {
                have_filename = have_basename.slice(0, have_basename.length - (have_extension ? have_extension.length + 1 :
                have_extension === false ? 0 : 1));
            }
            tmp_arr.filename = have_filename;
        }

        // If array contains only 1 element: return string
        cnt = 0;
        for (opt in tmp_arr) {
            cnt++;
        }
        if (cnt == 1) {
            return tmp_arr[opt];
        }

        // Return full-blown array
        return tmp_arr;
    }    
    
    function isIE () {
          userAgent = window.navigator.userAgent;
          return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge/") > -1;
      }

    function isMobile() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;
    }

    $(document).on('click','#goto-top-m', function(e) {
        e.preventDefault();
        $('body,html').animate({scrollTop: 0}, 400);
    });

    $(document).on('click','.tpl-share-snsPost', function(e) {
        var sns = $(this).attr('data-sns'),
            sid = (typeof SID == 'undefined') ? property.SID : SID,
            host = (typeof HOST == 'undefined') ? property.HOST : HOST,
            view = (typeof VIEW == 'undefined') ? property.VIEW : VIEW,
            page = (property.PAGE).split(','),
            hostname = (host.indexOf('addblock') > -1) ? window.location.host : window.location.hostname;
            url = window.location.protocol + '//' + hostname + '/' + page[0] + '/view/' + view,
            txt = (page[0]=='forum') ? $('.tpl-forum-title').text() : $('[data-project-title]').text(),
            pageLang = sid.split('__');
            if(pageLang.length > 1) url = window.location.protocol + '//' + hostname + '/_lang/' + pageLang[1] +  '/' + page[0] + '/view/' + view;
        sendSns(sns,url,txt);
    });

    function sendSns(sns,url,txt) {
        var img = $('meta[property="og:image"]').attr('content'),
            description = $('meta[property="og:description"]').attr('content');
        var o,
            _url = (typeof url == "undefined") ? encodeURIComponent("http://creatorlink.net") : encodeURIComponent(url),
            _txt = (typeof txt == "undefined") ? encodeURIComponent("Make your portfolio site as easily as stacking blocks") : encodeURIComponent(txt),
            _br  = encodeURIComponent('\r\n'),
            _img  = (typeof img == "undefined") ? 'https://storage.googleapis.com/i.addblock.net/config/aboutVideoImg00.png' : img,
            _kakaolinkurl = (typeof url == "undefined") ? "http://creatorlink.net" : url;

        switch(sns) {
            case 'facebook':
                o = {
                    method : 'popup',
                    url : 'https://www.facebook.com/sharer/sharer.php?u=' + _url + '&t=' + _txt
                };
                break;
            case 'twitter':
                o = {
                    method:'popup',
                    url:'http://twitter.com/intent/tweet?text=' + _txt + '&url=' + _url + '&source=' + _url
                };
                break;
            case 'google':
                o = {
                    method:'popup',
                    url:'https://plus.google.com/share?url=' + _url
                };
                break;
            case 'pinterest':
                o = {
                    method:'popup',
                    url:'http://pinterest.com/pin/create/button/?url=' + _url + '&media=' + _img + '&description=' + _txt
                };
                break;
            case "tumblr":
                o = {
                    method:'popup',
                    url:'http://www.tumblr.com/share?v=3&u=' + _url + '&t=creatorlink&s='
                };
                break;
            case "naverblog":
                o = {
                    method:'popup',
                    url:'http://share.naver.com/web/shareView.nhn?url=' + _url + '&title=' + _txt
                };
                break;
            case "kakaotalk":
                if(typeof property.SETTINGS.kakaolink != 'undefined') {
                    var kakaolink_key = property.SETTINGS.kakaolink_key;
                    kakaotalkShare(txt,description,_img,kakaolink_key,_kakaolinkurl);
                } else alert('카카오 API키 오류');
                o = {
                    method:''
                };
                break;
            case "urlcopy":
                copyToUrlClipboard(url);
                o = {
                    method:''
                };
                break;
            default :
                o = {
                    method:''
                };
                break;
        }
        switch(o.method) {
            case "popup":
                var left = (screen.width/2)-(575/2);
                var top = (screen.height/2)-(575/2);            
                window.open(o.url,'Share','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=575, height=575, top=' + top + ', left=' + left);
                break;
            default : 
                break;
        }
    }

    function kakaotalkShare(title,content,img,kakaolink_key,url) {
        Kakao.cleanup();
        Kakao.init(kakaolink_key);
        Kakao.isInitialized();
        console.log(url);
        
        console.log("Kakao.isInitialized()", Kakao.isInitialized());
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: title,
                description: content,
                imageUrl: img,
                link: {
                    mobileWebUrl: url,
                    webUrl: url
                }
            },
            buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                        mobileWebUrl: url,
                        webUrl: url
                    }
                }
            ]
        });
    }

    function copyToUrlClipboard(url) {
        if (window.clipboardData && window.clipboardData.setData) {
            // IE specific code path to prevent textarea being shown while dialog is visible.
            return clipboardData.setData("Text", url); 

        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = url;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            } finally {
                document.body.removeChild(textarea);
                alert($.lang[LANG]['config.sns.urlcopy.alert']);
            }
        }
    }

    function stripslashes(str) {
      return (str + '')
        .replace(/\\(.?)/g, function(s, n1) {
          switch (n1) {
            case '\\':
              return '\\';
            case '0':
              return '\u0000';
            case '':
              return '';
            default:
              return n1;
          }
        });
    }

    function isNumber(s) {
        s += '';
        s = s.replace(/^\s*|\s*$/g, '');
        if (s == '' || isNaN(s)) return false;
        return true;
    }

    function saveSelection() {
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                return sel.getRangeAt(0);
            }
        } else if (document.selection && document.selection.createRange) {
            return document.selection.createRange();
        }
        return null;
    }

    function restoreSelection(range) {
        if (range) {
            if (window.getSelection) {
                sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.selection && range.select) {
                range.select();
            }
        }
    }

     function getBytes( string ) {
        var cnt = 0, ch = "";
        for(var i = 0; i < string.length; i++) {
            ch = string.charAt(i);
            if(escape(ch).length > 4) {
                cnt += 2;
            } else {
                cnt += 1;
            }
        }
        return cnt;
    }

    function getWidthPercent(el) {
        var width = parseFloat($(el).css('width'))/parseFloat($(el).parent().css('width'));
        return Math.round(100*width)+'%';
    }

    // smartresize
    (function($,sr){

    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    }
    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    })(jQuery,'smartresize');

    function emailcheck(email) {
        // var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
        var regExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if(email.lenght == 0) return false;
        if (!email.match(regExp)) return false;
        return true;
    }

    function shareModal() {
        var title = $('meta[property="og:title"]').attr('content'),
            description = $('meta[property="og:description"]').attr('content');
        $(this).showModalFlat($.lang[LANG]['config.sns-share-btn'],snsPost(),false,false,'','','', 'cl-modal cl-cmmodal cl-p70 cl-s-btn cl-close-btn cl-t80 w320 share-modal');
    }

    var snsPost = function() {
        str = "" + 
        "   <ul class='tpl-share-sns'>";
        if(property.SETTINGS.kakaolink=='on') {
            str += "<li class='tpl-share-snsPost' data-sns='kakaotalk' id='kakao-link-btn'><span class='share-round'><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\"><path d=\"M12 1.89c-6.08 0-11 3.89-11 8.7 0 3.13 2.09 5.87 5.22 7.4 -0.23 0.86-0.83 3.11-0.95 3.59 -0.15 0.6 0.22 0.59 0.46 0.43 0.19-0.13 3.01-2.05 4.23-2.88 0.66 0.1 1.34 0.15 2.04 0.15 6.08 0 11-3.89 11-8.7C23 5.79 18.08 1.89 12 1.89\"/></svg></span> <span class='tpl-share-sns-name'>" + $.lang[LANG]["config.sns.kakaotalk"] + "</span></li>"; 
        }
        str += "<li class='tpl-share-snsPost' data-sns='facebook'><span class='share-round'><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\"><path d=\"M15.64 4.65l2.07 0v-3.5C17.35 1.11 16.12 1 14.69 1c-2.98 0-5.03 1.82-5.03 5.17v2.88H6.29v3.91h3.38V23h4.04V12.96h3.37l0.5-3.91H13.7v-2.5C13.7 5.42 14.02 4.65 15.64 4.65z\"/></svg></span> <span class='tpl-share-sns-name'>" + $.lang[LANG]["config.sns.facebook"] + "</span></li>" + 
        "       <li class='tpl-share-snsPost' data-sns='twitter'><span class='share-round'><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\"><path d=\"M7.92 20.94c8.3 0 12.84-6.88 12.84-12.84 0-0.2 0-0.39-0.01-0.58C21.63 6.88 22.4 6.08 23 5.18c-0.81 0.36-1.68 0.6-2.59 0.71 0.93-0.56 1.65-1.44 1.98-2.5 -0.87 0.52-1.84 0.89-2.87 1.1 -0.82-0.88-2-1.43-3.29-1.43 -2.49 0-4.51 2.02-4.51 4.51 0 0.35 0.04 0.7 0.12 1.03 -3.75-0.19-7.08-1.98-9.3-4.72C2.14 4.55 1.92 5.33 1.92 6.16c0 1.57 0.8 2.95 2.01 3.76C3.19 9.89 2.49 9.69 1.88 9.35c0 0.02 0 0.04 0 0.06 0 2.19 1.56 4.01 3.62 4.43 -0.38 0.1-0.78 0.16-1.19 0.16 -0.29 0-0.57-0.03-0.85-0.08 0.57 1.79 2.24 3.1 4.22 3.14 -1.55 1.21-3.49 1.93-5.61 1.93 -0.36 0-0.72-0.02-1.08-0.06C3 20.19 5.37 20.94 7.92 20.94\"/></svg></span> <span class='tpl-share-sns-name'>" + $.lang[LANG]["config.sns.twitter"] + "</span></li>" + 
        "       <li class='tpl-share-snsPost' data-sns='naverblog'><span class='share-round'><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\"><path d=\"M18.49 10.29c-0.48 0-0.87 0.39-0.87 0.87 0 0.48 0.39 0.87 0.87 0.87 0.48 0 0.87-0.39 0.87-0.87C19.36 10.68 18.97 10.29 18.49 10.29z\"/><path d=\"M13.3 10.29c-0.48 0-0.87 0.39-0.87 0.87 0 0.48 0.39 0.87 0.87 0.87 0.48 0 0.87-0.39 0.87-0.87C14.17 10.68 13.78 10.29 13.3 10.29z\"/><path d=\"M5.59 10.29c-0.48 0-0.87 0.39-0.87 0.87 0 0.48 0.39 0.87 0.87 0.87 0.48 0 0.87-0.39 0.87-0.87C6.45 10.68 6.07 10.29 5.59 10.29z\"/><path d=\"M19.53 3H4.47C2.56 3 1 4.56 1 6.49v8.27c0 1.93 1.56 3.49 3.47 3.49h5.18l1.77 2.88c0 0 0.02 0.03 0.06 0.08 0.1 0.18 0.29 0.3 0.51 0.3 0.22 0 0.41-0.12 0.51-0.29 0.04-0.05 0.06-0.09 0.06-0.09l1.77-2.88h5.18c1.92 0 3.47-1.56 3.47-3.49V6.49C23 4.56 21.44 3 19.53 3zM5.89 13.21c-0.81 0-1.13-0.58-1.13-0.58v0.44H3.39V7.46h1.35v2.14c0.54-0.53 1.14-0.53 1.14-0.53 1.83 0 1.9 2.05 1.9 2.05C7.78 13.14 5.89 13.21 5.89 13.21zM10.13 9.44v3.63h-1.3V9.75c0-1.14-0.61-1.12-0.61-1.12v-1.3C10.19 7.33 10.13 9.44 10.13 9.44zM15.58 11.16c0 2.05-2.28 2.05-2.28 2.05 -2.3 0-2.23-2.05-2.23-2.05 0-2.08 2.23-2.08 2.23-2.08C15.65 9.08 15.58 11.16 15.58 11.16zM20.61 13.01c0 2.13-1.97 2.1-1.97 2.1h-0.52v-1.19h0.32c0.95 0 0.86-0.98 0.86-0.98v-0.31c-0.42 0.54-1.18 0.51-1.18 0.51 -1.87 0-1.85-2-1.85-2 0-2.14 1.91-2.06 1.91-2.06 0.74 0 1.13 0.51 1.13 0.51V9.21h1.31V13.01z\"/></svg></span> <span class='tpl-share-sns-name'>" + $.lang[LANG]["config.sns.naverblog"] + "</span></li>" + 
        "       <li class='tpl-share-snsPost' data-sns='urlcopy'><span class='share-round'><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\"><path d=\"M8.71 18.87c-0.48 0.48-1.11 0.74-1.79 0.74s-1.31-0.26-1.79-0.74c-0.99-0.99-0.99-2.59 0-3.58l4.15-4.15c0.48-0.48 1.11-0.74 1.79-0.74 0.68 0 1.31 0.26 1.79 0.74l0.98-0.98c-0.76-0.76-1.77-1.15-2.77-1.15s-2 0.38-2.77 1.15l-4.15 4.15c-1.53 1.53-1.53 4.01 0 5.54C4.91 20.62 5.91 21 6.92 21s2-0.38 2.77-1.15l2.08-2.08 -0.98-0.98L8.71 18.87z\"/><path d=\"M19.85 4.15C19.09 3.38 18.09 3 17.08 3c-1 0-2 0.38-2.77 1.15l-2.08 2.08 0.98 0.98 2.08-2.08c0.48-0.48 1.11-0.74 1.79-0.74s1.31 0.26 1.79 0.74c0.99 0.99 0.99 2.59 0 3.58l-4.15 4.15c-0.48 0.48-1.11 0.74-1.79 0.74 -0.68 0-1.31-0.26-1.79-0.74l-0.98 0.98c0.76 0.76 1.77 1.15 2.77 1.15s2-0.38 2.77-1.15l4.15-4.15C21.38 8.16 21.38 5.68 19.85 4.15z\"/></svg></span> <span class='tpl-share-sns-name'>" + $.lang[LANG]["config.sns.urlcopy"] + "</span></li>" + 
        "       <!--<li class='tpl-share-snsPost' data-sns='google'><i class='fa fa-google-plus-square'></i> <span class='tpl-share-sns-name'>" + $.lang[LANG]["config.sns.google"] + "</span></li>" + 
        "       <li class='tpl-share-snsPost' data-sns='pinterest'><i class='fa fa-pinterest-square'></i> <span class='tpl-share-sns-name'>" + $.lang[LANG]["config.sns.pinterest"] + "</span></li>" + 
        "       <li class='tpl-share-snsPost' data-sns='tumblr'><i class='fa fa-tumblr-square'></i> <span class='tpl-share-sns-name'>" + $.lang[LANG]["config.sns.tumblr"] + "</span></li>-->" + 
        "   </ul>" +
        "";
        return str;
    }

    var displayPageToolbar = function(option) {
        if(typeof option == 'undefined') option = '';

        var menu_lock = (PAGE_MODE == 'c') ? '' : property.ISLOCK,
            toolbar_class = (typeof menu_lock != 'undefined' && menu_lock == 'true') ? 'hide' : '';

        if($('.tpl-forum-list-footer').length) {
            var str = '\
                <ul class="tpl-page-toolbar ' + toolbar_class + '" data-page-option="' + option + '">' +
                    // '<li class="tpl-forum-toolbar-button"><i class="fa fa-heart-o"></i><span class="tpl-page-toolbar-number">13</span></li>' +
                    // '<li class="tpl-forum-toolbar-button"><i class="fa fa-thumb-tack"></i></li>' +
                    '<li class="tpl-forum-toolbar-button share hide"><button type="button" class="btn btn-default btn-round">' + $.lang[LANG]['board.button.share'] + '</span></button></li>\
                </ul>\
            ';
            if($('.tpl-forum-list-footer .tpl-forum-toolbar-button').length == 0) $('.tpl-forum-list-footer').prepend(str);
        } else {
            var g_btn_prev = ($('.data-page-prev').hasClass('active')) ? 'active' : '',
                g_btn_next = ($('.data-page-next').hasClass('active')) ? 'active' : '',
                g_toolbar =  '\
                    <div class="tpl-page-toolbar ' + toolbar_class + '" data-page-option="' + option + '" style="width: 100%;">\
                        <div class="pull-left tpl-forum-toolbar-button share hide"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M16 13c-.95 0-1.79.45-2.34 1.14l-3.71-1.65a2.63 2.63 0 00-.06-1.24l3.94-2.19a3 3 0 10-.72-1.31L9.17 9.94a3 3 0 10.17 3.92l3.71 1.65A3 3 0 1016 13z"/></svg></div>\
                        <div class="bottom-navigation hide">\
                            <div class="pull-right tpl-project-toolbar-button data-page-next ' + g_btn_next + '"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M10.64 18.64l-1.28-1.28L14.73 12 9.36 6.64l1.28-1.28L17.27 12z"/></svg></div>\
                            <div class="pull-right tpl-project-toolbar-button data-page-prev ' + g_btn_prev + '"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M13.36 18.64L6.73 12l6.63-6.64 1.28 1.28L9.27 12l5.37 5.36z"/></svg></div>\
                            <div class="pull-right tpl-project-toolbar-button data-page-back"><svg viewBox="0 0 24 24" width="24" height="24"><g><path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"/></g></svg></div>\
                        </div>\
                    </div>\
                ';

            var $wrap = $('<div class="tpl-page-footer hide">');
            $wrap.append('<div class="container"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12 tpl-page-footer-wrap"></div></div></div>');
            $wrap.find('.tpl-page-footer-wrap').append(g_toolbar);
            $wrap.css({
                'background-color' : 'transparent',
                'padding' : '30px 0px'
            });

            if($('.page-comments').length) {
                $('.page-comments').before($wrap);
            } else if($('.page-bottomlist').length) {
                $('.page-bottomlist').before($wrap);
            } else {
                $('.el-footer').before($wrap);
            }
        }

        var f_color = ($('.forum-view').attr('data-fcolor')) ? $('.forum-view').attr('data-fcolor') : '',
            rgba = hexToRgba(f_color);

        $('.forum-write .tpl-forum-list-footer button').css('border-color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.4)');
        $('.forum-write .tpl-forum-list-footer button').css('color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.8)');
    }

    $(document).on('click','.data-feed-load-more',function() {
        var feed = $(this).attr('data-feed-el');
        if($('.' + feed + ' .listprogress').length) {
            $(this).showModalFlat('INFORMATION', 'Please wait...',true,false,'','ok');
            return false;
        }
        $('.' + feed + ' .social-feed-element').addClass('show-posts');
        if(typeof $('.' + feed + ' .social-feed-element:eq(0)').first().attr('social-feed-id') != 'undefined') $(this).hide();
    });

    var loadingElement = function(el,msg) {
        $('.' + el + ' .listprogress').remove();
        if($('.'+el).find('.social-feed-container').hasClass('listprogress-end')) return false;
        msg = (typeof msg == "undefined") ? "" : msg;
        var p = (msg) ? "<p class='text-center'>" + msg + "</p>" : "";
        $('.'+ el + ' .social-feed-container').append('<div class="listprogress" style="width: 100%; text-align:center; padding:50px 0;"><svg version="1.1" xmlns="http://www.w3.org/svg/2000" viewBox="0 0 30 30" width="60" style="width:20px; height: 20px;"><circle cy="15" cx="15" r="14" style="stroke:#00baff;"></circle></svg>' + p + '</div>');
    }

    var setCustomPagination = function( config ) { 

        var $obj = config['$obj'], 
            total = config['total'], 
            view = ( config['view'] ) ? config['view'] : 10, 
            page_num = ( config['page_num'] ) ? config['page_num'] : 1, 
            page_view = ( config['page_view'] ) ? config['page_view'] : 5, 
            pagingContainer = config['pagingContainer'], 
            section = config['section'], 
            base_url = config['base_url']; 

            start = Math.floor((page_num-1) / page_view) * page_view,
            pages = Math.ceil(total/view),
            end = (Math.floor((page_num-1) / page_view) + 1) * page_view,
            end = (end>pages) ? pages : end,
            prev = (start > 0) ? start : 1,
            next = ((end+1) > pages) ? pages : end+1,
            page_class = section + '-page';

        $obj.empty();

        for( i=start; i<end; i++ ) {
            var active = ((i+1) == page_num) ? "active" : "",
                pageHref = base_url + (i + 1);

            $obj.append($("<li class='" + page_class + " " + active + "' data-view='" + view + "' data-page-num='" + (i+1) + "'><a href='" + pageHref + "'>" + (i+1) + "</a></li>"));
        }

        var prevHref = base_url + prev,
            nextHref = base_url + next,
            firstHref = base_url + '1',
            lastHref = base_url + pages,
            $prev = "" +
                "<li class='" + page_class + " prev' data-view='" + view + 
                    "' data-page-num='" + (start) + "'>" +
                    "<a href='" + prevHref + "' aria-label='Previous'>" +
                        "<span aria-hidden='true'>" +
                            "<i class='fa fa-angle-left'></i>" +
                        "</span>" +
                    "</a>" +
                "</li>",
            $next = "" +
                "<li class='" + page_class + " next' data-view='" + view + 
                    "' data-page-num='" + (i+1) + "'>" +
                    "<a href='" + nextHref + "' aria-label='Previous'>" +
                        "<span aria-hidden='true'>" +
                            "<i class='fa fa-angle-right'></i>" +
                        "</span>" +
                    "</a>" +
                "</li>",
            $first = "" + 
                "<li class='" + page_class + " prev' data-view='" + view + 
                    "' data-page-num='1'>" +
                    "<a href='" + firstHref + "' aria-label='First'>" +
                        "<span aria-hidden='true'>" +
                            "<i class='fa fa-angle-double-left'></i>" +
                        "</span>" +
                    "</a>" +
                "</li>",
            $last = "" + 
                "<li class='" + page_class + " prev' data-view='" + view + 
                    "' data-page-num='" + pages + "'>" +
                    "<a href='" + lastHref + "' aria-label='Last'>" +
                        "<span aria-hidden='true'>" +
                            "<i class='fa fa-angle-double-right'></i>" +
                        "</span>" +
                    "</a>" +
                "</li>";                        

            if ( start != 0 )
                $obj.prepend($prev);

            if ( end != pages )
                $obj.append($next);

            if ( pages > 5) {
                if(page_num > 5) $obj.prepend($first);
                $obj.append($last);
            }

    }

    function memberLogin() {
        location.href = "/";
    }


    Number.prototype.format = function(n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    };    

    // 뎁스가 있는 값을 확인하기
    var checkNested = function(obj) {
        var args = Array.prototype.slice.call(arguments, 1);

        for (var i = 0; i < args.length; i++) {
            if (!obj || !obj.hasOwnProperty(args[i])) {
              return false;
            }
            obj = obj[args[i]];
        }
        return true;
    }

    Number.prototype.format = function(){
        if(this==0) return 0;
     
        var reg = /(^[+-]?\d+)(\d{3})/;
        var n = (this + '');
     
        while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
     
        return n;
    };
     

    String.prototype.format = function(){
        var num = parseFloat(this);
        if( isNaN(num) ) return "0";
     
        return num.format();
    };

    function selectionRect() {
        var s = window.getSelection();
        oRange = s.getRangeAt(0); //get the text range
        oRect = oRange.getBoundingClientRect();
        return oRect;
    }
    
    function placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    var insertVideo = function (sUrl,mode) {
        if(typeof sUrl == 'object') {
            var result = [];
            $.each(sUrl, function(i,v) {
                var r = insertVideo(v);
                if(typeof r != 'undefined') result.push(r);
            });
            return (sUrl.length == result.length) ? result : false;
        }

        sUrl = sUrl.replace('www.','');
        var img = 'https://storage.googleapis.com/i.addblock.net/video-icon.jpg';
        // video url patterns(youtube, instagram, vimeo, dailymotion)
        var ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var ytMatch = sUrl.match(ytRegExp);

        var igRegExp = /\/\/instagram.com\/p\/(.[a-zA-Z0-9]*)/;
        var igMatch = sUrl.match(igRegExp);

        var vRegExp = /\/\/vine.co\/v\/(.[a-zA-Z0-9]*)/;
        var vMatch = sUrl.match(vRegExp);

        var vimRegExp = /\/\/(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
        var vimMatch = sUrl.match(vimRegExp);

        var dmRegExp = /.+dailymotion.com\/(video|hub|embed)\/([^_]+)[^#]*(#video=([^_&]+))?/;
        var dmMatch = sUrl.match(dmRegExp);

        var mcRegExp =  /\/\/metacafe.com\/watch\/(.[a-zA-Z0-9]*)\/(.[a-zA-Z0-9\-]*)\//;
        var mcMatch = sUrl.match(mcRegExp);

        var kakaoExp = /\/\/tv.kakao.com\/(channel|embed)\/([0-9]{6,11}|player)\/cliplink\/([0-9]{6,11})/;
        var kaMatch = sUrl.match(kakaoExp);

        var kakaoExp2 = /\/\/tv.kakao.com\/(v|l)\/([0-9]{6,11})/;
        var kaMatch2 = sUrl.match(kakaoExp2);

        var naverExp = /\/\/serviceapi.rmcnmv.naver.com\/(.*)/;
        var naMatch = sUrl.match(naverExp);

        var sound = sUrl.search('soundcloud.com');
        var $video, src;
        if (ytMatch && ytMatch[2].length === 11) {
            var youtubeId = ytMatch[2];
            src = '//www.youtube.com/embed/' + youtubeId;
            src = src.replace('watch?v=', 'v/');

            $video = $('<iframe>')
            .attr({'src': src + '?wmode=transparent', 'frameborder':'0'});
            img = '//img.youtube.com/vi/' + youtubeId + '/default.jpg';
        /*        
        } else if (igMatch && igMatch[0].length > 0) {
            $video = $('<iframe>')
            .attr('src', igMatch[0] + '/embed/')
            .attr('width', '612').attr('height', '710')
            .attr('scrolling', 'no')
            .attr('allowtransparency', 'true');
        } else if (vMatch && vMatch[0].length > 0) {
            $video = $('<iframe>')
            .attr('src', vMatch[0] + '/embed/simple')
            //.attr('width', '600').attr('height', '600')
            .attr('class', 'vine-embed');
            src = vMatch[0] + '/embed/simple';
        */        
        } else if (vimMatch && vimMatch[3].length > 0) {
            $video = $('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
            .attr('src', '//player.vimeo.com/video/' + vimMatch[3]);
            //.attr('width', '640').attr('height', '360');
            src = '//player.vimeo.com/video/' + vimMatch[3];
            $.getJSON('//vimeo.com/api/v2/video/' + vimMatch[3] + '.json', function(data) {
                if(typeof data[0]['thumbnail_small'] != 'undefined') {
                    img = data[0]['thumbnail_small'];
                }
            });
        } else if (dmMatch && dmMatch[2].length > 0) {
            dmMatch[2] = dmMatch[2].replace("video/","");
            $video = $('<iframe>')
            .attr('src', '//www.dailymotion.com/embed/video/' + dmMatch[2]);
            //.attr('width', '640').attr('height', '360');
            src = '//www.dailymotion.com/embed/video/' + dmMatch[2];
            img = '//dailymotion.com/thumbnail/video/' + dmMatch[2];
        }/* else if (mcMatch && mcMatch[1].length > 0) {
            $video = $('<iframe>')
            .attr('src', 'http://www.metacafe.com/embed/' + mcMatch[1] + '/' + mcMatch[2]);
            //.attr('width', '640').attr('height', '360');
            src = 'http://www.metacafe.com/embed/' + mcMatch[1] + '/' + mcMatch[2];
        }*/ else if (sound>-1) {
            $.getJSON('http://soundcloud.com/oembed?format=json&url=' + sUrl, function(data) {
                if(typeof data.html == 'undefined') {
                    alert('get Soundcloud API error');
                    return;
                }
                $video = $(data.html);
                src = $video.prop('src');
                img = data.thumbnail_url;
            });
        }else if(kaMatch && kaMatch[3].length > 0) {
            $video = $('<iframe>')
            .attr('src', '//tv.kakao.com/embed/player/cliplink/' + kaMatch[3] + '?service=kakao_tv');
            src = '//tv.kakao.com/embed/player/cliplink/' + kaMatch[3] + '?service=kakao_tv';
            // img = file_get_contents('//tv.kakao.com/v/' + kaMatch[3]);
        } else if(kaMatch2 && kaMatch2[2].length > 0) {
            var kakao_tv_iframe = {
                    'l': '//play-tv.kakao.com/embed/player/livelink?liveLinkId=',
                    'v': '//play-tv.kakao.com/embed/player/cliplink/'
                },
                kakao_tv_parameter = {
                    'l': '&service=player_share',
                    'v': '?service=player_share'
                }
                kakao_tv_src = kakao_tv_iframe[kaMatch2[1]] + kaMatch2[2] + kakao_tv_parameter[kaMatch2[1]];

            $video = $('<iframe>')
            .attr('src', kakao_tv_src)
            .attr('scrolling', 'no')
            .attr('allow', 'autoplay');
            src = kakao_tv_src;
        } /* else if(naMatch && naMatch[1].length > 0) {
            $video = $('<iframe>')
            .attr('src', '//serviceapi.rmcnmv.naver.com/' + naMatch[1]);
            src = '//serviceapi.rmcnmv.naver.com/' + naMatch[1];
        } */else {
            // this is not a known video link. Now what, Cat? Now what?
        }

        if ($video) {
            $video.attr('frameborder', 0);
        }

        switch(mode) {
            case "src" : return src; break;
            case "img" : return img; break;
            default : return $video; break;
        }
    }

    function setForumWrap() {
        var width = $('body').width(),
            margin = 0,
            size = $('.fr-view').width(),
            sidebar = $('.dsgn-body').hasClass('sidebar');

        width = (sidebar) ? width - $('header.sidebar').width() : width;
        $.each($('.f-align-full, .f-align-wide'), function(i,v) {
            if($(this).hasClass('f-align-full')) {
                margin = (width-size) / 2;
            } else {
                container = (size == 720) ? (size+240) : (size+220);
                if(width <= container) container = width;
                width = container;
                margin = (container - size ) / 2;
            }
            $(this).css('cssText', 'width: ' + width + 'px !important; margin-left:-' + margin + 'px; max-width:' + width + 'px !important;');
        });
    }

    function doGetCaretPosition (oField) {

      // Initialize
      var iCaretPos = 0;

      // IE Support
      if (document.selection) {

        // Set focus on the element
        oField.focus();

        // To get cursor position, get empty selection range
        var oSel = document.selection.createRange();

        // Move selection start to 0 position
        oSel.moveStart('character', -oField.value.length);

        // The caret position is selection length
        iCaretPos = oSel.text.length;
      }

      // Firefox support
      else if (oField.selectionStart || oField.selectionStart == '0')
        iCaretPos = oField.selectionStart;


      // Return results
      return iCaretPos;
    }

    function resetForm($obj) {
        $.each($obj.find('.tpl-form-element'), function(i,v) {
            var type = $(this).prop('type');
            switch(type) {
                case 'text' : case 'tel' : case 'number': case 'textarea':            
                    $(this).val('');
                break;
                
                case 'radio': case 'checkbox':
                    $(this).prop('checked',false);
                break;
                
                case 'select-one': case 'select-multi':
                    $(this).val('');
                    $(this)[0].selectIndex  = -1;            
                break;                                                                             
            }        
        });
    }

    function getRecommendInfo($el,$img,mode) {
        if(typeof mode == 'undefined' || $el.hasClass('el-footer')) mode = true;

        var width = '';
        if(mode == false) {
            width = ($('#element-display > div').is('[data-width]')) ? $('#element-display > div').attr('data-width') : $el.attr('data-width');
        } else {
            if(typeof $el.attr('data-width') != 'undefined') width = $el.attr('data-width');
            else width = 0;
        }

        var src = $img.prop('src'),
            img_resolution = '',
            img = new Image(),
            nWidth = 0, nHeight = 0,
            txt_img_click = (mode) ? $.lang[LANG]['editor.image.click.change'] + '<br>' : '',
            recomm_str = '',
            footerlogo = (selectEL == 'el-footer') ? $img[0].src.split(':')[1] : '',
            isfooterAttach = typeof $('img[src="'+footerlogo+'"]').is('[data-footer-attach]') == 'undefined' ? false : $('img[src="'+footerlogo+'"]').is('[data-footer-attach]');

        img.src = (typeof src == 'undefined') ? '' :  src;
        
        if(width == 0) {

            if(selectEL == 'el-menu' || (selectEL == 'el-footer' && isfooterAttach)) {
                var el_img = $('.'+selectEL).find('img[data-attach="true"]');
                if(typeof el_img.attr('src') != "undefined" && src.match(el_img.attr('src')) !== null) {
                    // HTML[data-max-width] > CSS max-width > HTML ELEMENT width()
                    nWidth = (typeof el_img.css('max-width') != 'undefined' && el_img.css('max-width').match(/px/gi) !== null) ? el_img.css('max-width').replace('px','') : el_img.width();
                    nHeight = (typeof el_img.css('max-height') != 'undefined' && el_img.css('max-height').match(/px/gi) !== null) ? el_img.css('max-height').replace('px','') : el_img.height();

                    img_resolution = (typeof el_img.closest('.navbar-brand').attr('data-recommend') != 'undefined') ? el_img.closest('.navbar-brand').attr('data-recommend') : nWidth + ' X ' + nHeight;
                    // return '<div class="text-left">' + txt_img_click + '<span class="txt-recomm">' + $.lang[LANG]['editor.image.recomm.menu'] + '<br>' + img_resolution + '</span></div>';
                    return "<div class=\'text-left\'>" + txt_img_click + "</div>";
                }
            } else {
                img.onload = function() {
                    nWidth = this.width;
                    nHeight = this.height;
                    img_resolution = ((nWidth) ? nWidth : $img.width()) + ' X ' + ((nHeight) ? nHeight : $img.height());

                    recomm_str = "<div class=\'text-left\'>" + txt_img_click + "<span class=\'txt-recomm\'>" + $.lang[LANG]['editor.image.recomm'] + "<br>" + img_resolution + "</span></div>";

                    if(mode) {
                        var this_src = src.substr(src.lastIndexOf('/') + 1);
                        $('.bc-resource').find('img[src$="' + this_src + '"]').attr('data-original-title', recomm_str);
                    } else {
                        if($('.recomm-image-text').length > 0) $('.recomm-image-text').html(recomm_str).show();
                        else $('body').append(recomm_str);
                    }
                }
                return "<div class=\'text-left\'>" + txt_img_click + "<span class=\'txt-recomm\' data-loading=\'true\'>Loading...</span></div>";
            }


            // if(mode) return '<div class="text-left">' + $.lang[LANG]['editor.image.click.change'] + '<br><span class="txt-recomm">' + $.lang[LANG]['editor.image.recomm'] + '<br>' + img_resolution + '</span></div>';
            // else return '<div class="text-left"><span class="txt-recomm">' + $.lang[LANG]['editor.image.recomm'] + '<br>' + img_resolution + '</span></div>';
        } else {
            switch(width) {
                case '1920':    img_resolution = '1920 X FREE'; break;
                case '800':     img_resolution = '800 X FREE'; break;
                case '700':     img_resolution = '700 X 500'; break;
                case '670':     img_resolution = '670 X 980'; break;
                case '650':     img_resolution = '650 X 370'; break;
                case '600':     img_resolution = '600 X 600'; break;
                case '250':     img_resolution = '250 X 250'; break;
                case '60':      img_resolution = '60 X 60'; break;
            }

            return "<div class=\'text-left\'>" + txt_img_click + "<span class=\'txt-recomm\'>" + $.lang[LANG]['editor.image.recomm'] + "<br>" + img_resolution + "</span></div>";
        }

    }

    var getRatio = function(w) {
        var r = '';
        switch(w) {
            case "1920":    r = '&w=1920&fit=crop'; break;
            case "800":     r = '&w=800&fit=crop'; break;
            case "700":     r = '&w=700&h=500&crop=face&fit=crop'; break;
            case "670":     r = '&w=670&h=980&crop=face&fit=crop'; break;
            case "650":     r = '&w=600&h=370&crop=face&fit=crop'; break;
            case "600":     r = '&w=600&h=600&crop=face&fit=crop'; break;
            case "250":     r = '&w=250&h=250&crop=face&fit=crop'; break;
            case "60" :     r = '&w=60&h=60&crop=face&fit=crop'; break;
            case "0" :      r = ''; break;
        }
        return r;
    }

    var tplFormitem = function(type,idx,val) {
        var tpl = '';
        if(typeof val=='undefined' || val == '') {
            if(type != 'file.download' && type != 'file.upload')
                val = ['A','B'];
        } else {
            if(type != 'file.download' && type != 'file.upload')
                val = val.split('`');
            else 
                val = val.split('||');
        }

        var blang = (typeof $('.' + selectEL).attr('data-blocklang') == 'undefined') ? $('#element-display[data-ref="'+selectEL+'"]').attr('data-blocklang') : $('.' + selectEL).attr('data-blocklang'),
            sdefault = '';
        if(typeof blang == 'undefined') {
            blang = getLanguage(true);
        }

        if(blang == 'ko') {
            sdefault = '선택하세요';
        } else if(blang == 'en') {
            sdefault = 'Select';
        } else if(blang == 'ja') {
            sdefault = '選択してください';
        } else {
            sdefault = 'Select';
        }
        switch(type) {
            case 'text' : tpl = '<input class="form-control" type="text">'; break;
            case 'memo' : tpl = '<textarea class="form-control"></textarea>'; break;
            case 'select' : tpl = '<select class="form-control">';
                tpl = tpl + '<option value="">' + sdefault + '</option>';
                $.each(val,function(i,v) {
                    tpl = tpl + '<option value="' + replaceQuote(v) + '">' + v + '</option>';
                });
                tpl = tpl + '</select>'; 
                break;
            case 'check':
                tpl = '<div>';
                $.each(val, function(i,v) {
                    tpl = tpl + '<label class="checkbox-inline"><input type="checkbox" class="forms-item-check" name="' + (type + idx) + '" value="' + replaceQuote(v) + '">' + v + '</label>';
                });
                tpl = tpl + '</div>';
                break;
            case 'radio':
                tpl = '<div>';
                $.each(val, function(i,v) {
                    tpl = tpl + '<label class="radio-inline"><input type="radio" class="forms-item-radio" name="' + (type + idx) + '" value="' + replaceQuote(v) + '">' + v + '</label>';
                });
                tpl = tpl + '</div>';
                break;
            case 'date':
                tpl = '<div>';
                tpl = tpl + '<input class="form-control form-date date-ymd" type="text" readonly size="10" /><svg viewBox="0 0 14 16" width="14" height="16"><path d="M12 2h-1V1c0-0.55-0.45-1-1-1S9 0.45 9 1v1H5V1c0-0.55-0.45-1-1-1S3 0.45 3 1v1H2C0.9 2 0 2.9 0 4v10c0 1.1 0.9 2 2 2h10c1.1 0 2-0.9 2-2V4C14 2.9 13.1 2 12 2zM13 14c0 0.55-0.45 1-1 1H2c-0.55 0-1-0.45-1-1V6h12V14z"></path><rect x="3" y="8" width="2" height="2"></rect><rect x="6" y="8" width="2" height="2"></rect><rect x="9" y="8" width="2" height="2"></rect><rect x="3" y="11" width="2" height="2"></rect><rect x="6" y="11" width="2" height="2"></rect><rect x="9" y="11" width="2" height="2"></rect></svg>';
                tpl = tpl + '</div>';
                break;
            case 'date2':
                tpl = '<div>';
                tpl = tpl + '<input class="form-control date-ymd form-date" type="text" readonly size="10" /><svg viewBox="0 0 14 16" width="14" height="16"><path d="M12 2h-1V1c0-0.55-0.45-1-1-1S9 0.45 9 1v1H5V1c0-0.55-0.45-1-1-1S3 0.45 3 1v1H2C0.9 2 0 2.9 0 4v10c0 1.1 0.9 2 2 2h10c1.1 0 2-0.9 2-2V4C14 2.9 13.1 2 12 2zM13 14c0 0.55-0.45 1-1 1H2c-0.55 0-1-0.45-1-1V6h12V14z"></path><rect x="3" y="8" width="2" height="2"></rect><rect x="6" y="8" width="2" height="2"></rect><rect x="9" y="8" width="2" height="2"></rect><rect x="3" y="11" width="2" height="2"></rect><rect x="6" y="11" width="2" height="2"></rect><rect x="9" y="11" width="2" height="2"></rect></svg>';
                
                tpl = tpl + '<div class="section-hh"><input type="text" value="" class="form-control form-date date-hh" maxlength="2" /><div class="btn-option-hh"><svg viewBox="0 0 8 4" width="8" height="4"><polygon points="0 0 4 4 8 0 "></polygon></svg></div>';

                tpl = tpl + '<div class="option-hh">';
                for(var i=0; i<=23; i++) {
                    var str = i.toString().length < 2 ? "0" + i : i;
                    tpl = tpl + '<div class="" data-hh="' + str + '">' + str + '</div>';
                }
                tpl = tpl + '</div>';

                tpl = tpl + '</div>';

                tpl = tpl + '<span class="date-divider">:</span>';

                tpl = tpl + '<div class="section-ii"><input type="text" value="" class="form-control form-date date-ii" maxlength="2" /><div class="btn-option-ii"><svg viewBox="0 0 8 4" width="8" height="4"><polygon points="0 0 4 4 8 0 "></polygon></svg></div>';

                tpl = tpl + '<div class="option-ii">';
                for(var i=0; i<60; i++) {
                    var str = i.toString().length <2 ? "0" + i : i;
                    tpl = tpl + '<div class="" data-ii="' + str + '">' + str + '</div>';
                }
                tpl = tpl + '</div>';

                tpl = tpl + '</div>';
                break;
            case 'file.upload':
                tpl = '<div>';
                tpl = tpl + '<input type="text" class="hide" value="" /><label class=""><input type="file" class="hide" /><svg viewBox="0 0 16 16" width="16" height="16"><path d="M13.98 1.04c-2.12-1.66-5.2-1.28-6.86 0.84L0.97 9.75c-1.32 1.68-1.02 4.12 0.66 5.43 1.68 1.32 4.12 1.02 5.43-0.66l6.16-7.87c0.97-1.24 0.75-3.04-0.49-4.01 -1.24-0.97-3.04-0.75-4.01 0.49l-4.78 6.1 0.85 0.66 4.78-6.1c0.6-0.77 1.73-0.91 2.5-0.3 0.77 0.6 0.91 1.73 0.3 2.5l-6.16 7.87c-0.95 1.21-2.71 1.43-3.92 0.48 -1.21-0.95-1.43-2.71-0.48-3.92l6.16-7.87c1.29-1.65 3.69-1.95 5.35-0.65 1.65 1.29 1.95 3.69 0.65 5.35l-4.78 6.1L10.04 14l4.78-6.1C16.48 5.77 16.1 2.7 13.98 1.04z"/></svg>' + $.lang[blang]['config.form.btn.attachment'] + '</label><p class="file-title text">' + $.lang[blang]['config.form.file.attachment.none'] + '</p></div>';
                break;
            case 'file.download':
                tpl = '<div>';
                tpl = tpl + '<p class="file-title text"><svg viewBox="0 0 16 16" width="16" height="16"><path d="M13.98 1.04c-2.12-1.66-5.2-1.28-6.86 0.84L0.97 9.75c-1.32 1.68-1.02 4.12 0.66 5.43 1.68 1.32 4.12 1.02 5.43-0.66l6.16-7.87c0.97-1.24 0.75-3.04-0.49-4.01 -1.24-0.97-3.04-0.75-4.01 0.49l-4.78 6.1 0.85 0.66 4.78-6.1c0.6-0.77 1.73-0.91 2.5-0.3 0.77 0.6 0.91 1.73 0.3 2.5l-6.16 7.87c-0.95 1.21-2.71 1.43-3.92 0.48 -1.21-0.95-1.43-2.71-0.48-3.92l6.16-7.87c1.29-1.65 3.69-1.95 5.35-0.65 1.65 1.29 1.95 3.69 0.65 5.35l-4.78 6.1L10.04 14l4.78-6.1C16.48 5.77 16.1 2.7 13.98 1.04z"/></svg>' + (val[0] ? val[0] : $.lang[blang]['config.form.file.attachment.none']) + '</p>';
                tpl = tpl + '</div>';
                break;
        }

        return tpl;
    }

    function replaceQuote(str) {
        // str = str.replace(/\\/g, '\\\\');
        // str = str.replace(/\'/g, '\\\'');
        str = str.replace(/\"/g, '&quot;');
        // str = str.replace(/\0/g, '\\0');
        return str;
    }

    var captchaContainer = null;
    var loadCaptcha = function() {
        $('#recaptcha').attr('data-res','');
        captchaContainer = grecaptcha.render('recaptcha', {
            'sitekey' : '6LfZjyIUAAAAAIMcTzt0XriAdVXHExtrVsNUaiHz',
            'callback' : loadCaptchaCallback
        });
    }
    var loadCaptchaCallback = function(res) { $('#recaptcha').attr('data-res', res); }
    var recaptchCallback = function() { }
    var checkCaptcha = function() {
        var s = $('#recaptcha').attr('data-res');
        var res = $.post('/fm/recaptcha', { r : s }, function(data) {
            return data;
        },'json');
        return res;
    }

    var load_kcaptcha = function() {
        $('#kcaptcha').attr('src', 'https://storage.googleapis.com/i.addblock.net/js/load_kcaptcha.gif');
        $('#kcaptcha').attr('title', $.lang[LANG]['page.reset-password.captcha-tip'] );
        $.post(rt_path + '/check/kcaptcha/session?_' + new Date().getTime(), function(data) {
            md5_norobot_key = data;
            var tmpImg = new Image(),
                t = (new Date).getTime();
            tmpImg.src = rt_path + '/check/kcaptcha/image/' + t;
            tmpImg.onload = function() {
                $('#kcaptcha').attr('src', rt_path + '/check/kcaptcha/image/' + t);
            };          
        });
    }
    
    $('#comm-name,#comm-pass').live('blur',function(e) {
        window.scrollTo(0,0);
    });
    var getLocation = function(url) {
        var parser = document.createElement('a');
        parser.href = url;
        parser.href = parser.href;

        if (parser.host === '') {
            var newProtocolAndHost = window.location.protocol + '//' + window.location.host;
            if (url.charAt(1) === '/') {
                parser.href = newProtocolAndHost + url;
            } else {
                var currentFolder = ('/'+parser.pathname).match(/.*\//)[0];
                parser.href = newProtocolAndHost + currentFolder + url;
            }
        }
        var properties = ['host', 'hostname', 'hash', 'href', 'port', 'protocol', 'search'];
        for (var i = 0, n = properties.length; i < n; i++) {
          this[properties[i]] = parser[properties[i]];
        }
        this.pathname = (parser.pathname.charAt(0) !== '/' ? '/' : '') + parser.pathname;
    }
    

    var setResizeImageFolder = function(w, content_image) {
        var magic_type = (PAGE_MODE == 'c') ? SETTINGS.magic_type : property.SETTINGS.magic_type,
            check_magic_type = (typeof magic_type != 'undefined' && magic_type == 'webp') ? true : false;
            t =  (check_magic_type) ? '-rw' : '';

        var r = '';
        if(content_image && content_image.lastIndexOf('=') > -1) {
            var image_index = content_image.lastIndexOf('=');
            content_image = content_image.substr(0,image_index);

            switch(w) {

                case "0"      : r = content_image + '=s0'+t;            break;
                case "60"     : r = content_image + '=w60-h60-n'+t;     break;
                case "250"    : r = content_image + '=w250-h250-n'+t;   break;
                case "300"    : r = content_image + '=w300-h300-n'+t;   break;
                case "600"    : r = content_image + '=w600-h600-n'+t;   break;
                case "650"    : r = content_image + '=w650-h370-n'+t;   break;
                case "670"    : r = content_image + '=w670-h980-n'+t;   break;
                case "700"    : r = content_image + '=w700-h500-n'+t;   break;
                case "800"    : r = content_image + '=w800'+t;          break;
                //case "1920": break;
                default       : r = content_image;                    break;
            }
        }

        return r;
    }
    
    function changeLanguage(code,mode) {
        var isSYNC = (typeof mode != 'undefined' && mode && mode.match(/^sync_/gi) !== null) ? true : false,
            sid = (typeof SID == 'undefined') ? property.SID : SID,
            type = '';

        if(typeof mode == 'undefined') {
            type = (property.LOAD == 'RENDER') ? 'render' : 'publish';
        } else {
            type = 'config';

            if(isSYNC) type = mode.replace(/^sync_/gi, '');
        }

        $.post('/language/' + code, { sid : sid, type : type }, function(data) { 
            if(isSYNC) {
                console.log('change language');
                return false;
            } else {
                if(typeof mode == 'undefined') {
                    if(property.LOAD == 'RENDER') location.href='/render';
                    else location.href = '/';
                } else {
                    if(mode == 'end_config') {
                        console.log('change language');
                        return false;
                    }
                    location.href = '/'+CONFIG_URL+'config';
                }
            }
        },'json');
    }
    

    $(document).on('click','.bizcommpop-open', function(e) {
        var url = 'http://www.ftc.go.kr/bizCommPop.do?wrkr_no=1148687877';
        window.open(url, 'bizCommPop', 'width=750, height=700;');
    });


    function setMadeWithCreatorlink() {
        var host = (typeof SERVICE == 'undefined') ? property.SERVICE : SERVICE,
            made_width = (host.indexOf('gabia') > -1 && LANG == 'ko') ? 'w-2' : '',
            go_to_link = (host.indexOf('gabia') > -1) ? 'http://creatorlink-gabia.com' : 'http://creatorlink.net?utm_source=FreeSite&utm_medium=banner&utm_campaign=powered_by_Creatorlink&utm_term=sitebanner&utm_content=free',
            go_to_txt = (host.indexOf('gabia') > -1) ? 'footer.made-mark.description.gabia' : 'footer.made-mark.description',
            made_txt = $.lang[LANG]['footer.made-mark.description.title'];

        if($('.dsgn-body').find('.made-with-creatorlink').length > 0) {
            $('.dsgn-body').find('.made-with-creatorlink').show().attr('style','display: block!important');
        } else {
            var svg_logo = '<svg class="made-with-creatorlink-logo" viewBox="0 0 26 30" width="26" height="30"><path class="st11" d="M1 8.1L1 8.1V22l12 6.9L25 22V8.1L13 1.2 1 8.1zM21 10.5L21 10.5 21 10.5l-4 2.3 0 0 -4-2.3 -4 2.3v4.6l4 2.3 4-2.3 4 2.3 -8 4.6L5 19.7v-9.2l8-4.6L21 10.5 21 10.5z"/></svg>',
                str = '\
                    <div class="made-with-creatorlink '+made_width+'" alt="' + made_txt + '" title="' + made_txt + '">\
                        <a class="made-creatorlink-link" href="' + go_to_link + '" target="_blank">\
                            <div class="inner-logo">' + svg_logo +'</div>\
                            <div class="inner-txt">\
                                <ul>\
                                    <li>' + $.lang[LANG][go_to_txt+'.1'] + '</li>\
                                    <li>' + $.lang[LANG][go_to_txt+'.2'] + '</li>\
                                </ul>\
                            </div>\
                        </a>\
                    </div>\
                ';
            // $('.dsgn-body').append(str);

            var mwcRollingId = new Interval(mwcRollingStart,3000);
            mwcRollingId.start();
        }
    }

    function mwcRollingStart() {
        var $mwcUl = $('.made-with-creatorlink').find('ul'),
            $mwcHeight = $mwcUl.children().outerHeight(),
            $length = $mwcUl.children().length;

        $mwcUl.css('height', $mwcHeight + 'px');
        $mwcUl.animate({top: -$mwcHeight + 'px'}, 1000, 'easeInOutQuart',function() { 
            $(this).append($(this).find('li:first').clone().wrapAll('<li/>').parent().html());

            $(this).find('li:first').remove();
            $(this).css('top', 0);
        });
    }

    function Interval(fn, time) {
        var timer = false;
        this.start = function () {
            if (!this.isRunning())
                timer = setInterval(fn, time);
        };
        this.stop = function () {
            clearInterval(timer);
            timer = false;
        };
        this.isRunning = function () {
            return timer !== false;
        };
    }

    function siteNotice(fn,checkDouble) {
        var checkDouble = (typeof checkDouble != 'undefined' && checkDouble) ? checkDouble : '',
            checkGabia = (rt_service == 'ga') ? true : false,
            checkGabiaOther = ['manager','nickname','language','chmod'],
            description_other = (checkGabia) ? (($.inArray(fn, checkGabiaOther) > -1) ? '.GA' : '') : '',
            upgrade_url = (checkGabia) ? 'https://www.gabia.com/mygabia/service" target="_blank' : ((fn=='shopping') ? '/shoppingevent' : '/upgrade/site/');

        if(fn == 'gabia.bn.chmod') {
            fn = 'chmod';
            description_other = '.GA';
            upgrade_url = '/manager/member';
        }

        var modal_title = $.lang[LANG]['dashbord.upgrade.'+fn+'.title'];
            modal_description = $.lang[LANG]['dashbord.upgrade.'+fn+'.description'+description_other],
            modal_class = 'cl-cmmodal cl-s-btn w560 cl-p130 cl-p0';

        if(fn == 'metaDetail' || fn == 'metaPlus' || fn == 'metaOnepage') modal_title = $.lang[LANG]['dashbord.upgrade.meta.title'];
        if(fn == 'sitelimit') modal_title = $.lang[LANG]['dashbord.upgrade.siteclone.title'];
        if(fn == 'cert') modal_class = 'cl-cmmodal cl-s-btn w560 cl-p70 cl-p0 site-not-cert-modal';

        var btnstr = '\
                <div class="btn-box">\
                    <a href="' + upgrade_url + '" id="upgrade-usemember-link" class="btn" target="_blank">\
                    <svg viewBox="0 0 18 18" width="18" height="18"><polygon points="9 0 1 8 5 8 5 11 13 11 13 8 17 8 "/><rect x="5" y="13" width="8" height="2"/><rect x="5" y="17" width="8" height="1"/></svg>'+$.lang[LANG]['dashbord.toolbar.upgrade-site']+'</a>\
                    <button type="button" class="btn btn-default btn-sm close-button-dialog" data-dismiss="modal">'+$.lang[LANG]['config.close']+'</button>\
                </div>\
        ';
        if(fn == 'sitelimit') {
            btnstr = '\
                <div class="btn-box btn-closeOnly">\
                    <button type="button" class="btn btn-default btn-sm close-button-dialog" data-dismiss="modal">'+$.lang[LANG]['config.close']+'</button>\
                </div>\
            ';
        }
        var str = '\
            <div class="site-upgrade-notice">\
                <p><span class="text-centermodal">' + modal_description + '</span></p>\
                ' + btnstr +
            '</div>\
        ';
        $(this).showModalFlat(modal_title, str,false,false,'','','',modal_class,'','','',function(){
            if(checkDouble) $('.modal.modal-default.fade.in').css('zIndex','');
        });
    }

    function hideMadeWithCreatorlink() {
        $('.goto-top').removeClass('moved');
        $('#cl-music-player-icon').removeClass('moved');
        $('.made-with-creatorlink').hide();
    }

    function sites(s) {
        return $.ajax({
            url : '/template/publishSites',
            data : { sid : s },
            type : 'POST',
            dataType : 'json',
            async : true,
            cashe : false,
            success : function(data) {
                // console.log(data);
            }
        });
    }

    function pbSite(s,onoff) {
        return $.ajax({
            url : '/template/publish1',
            data : { sid : s, onoff : onoff },
            type : 'POST',
            dataType : 'json',
            async : true,
            cashe : false,
            success : function(data) {
                // console.log(data);
            }
        });
    }

    function pbGallery(s,onoff,count,p,sCount, i) {
        return $.ajax({
            url : '/template/publish2',
            data : { sid : s, count : count, p : p + 1, onoff : onoff, sCount : sCount, i : i },
            type : 'POST',
            dataType : 'json',
            async : true,
            cashe : false,
            success : function(data) {
                // console.log(data);
            }
        });
    }

    function pbPages(s,onoff,count,p,sCount, i) {
        return $.ajax({
            url : '/template/publish3',
            data : { sid : s, count : count, p : p + 1, onoff : onoff, sCount : sCount, i : i },
            type : 'POST',
            dataType : 'json',
            async : true,
            cashe : false,
            success : function(data) {
                // console.log(data);
            }
        });
    }

    function clearData(type,s,onoff,count,p) {
        return $.ajax({
            url : '/template/clear',
            data : { type : type, sid : s, count : count, p : p + 1, onoff : onoff },
            type : 'POST',
            dataType : 'json',
            async : true,
            cashe : false,
            success : function(data) {
                console.log(data);
            }
        });
    }

    function user_location() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var ip = this.responseText,
                    sid = (typeof property.SID) ? property.SID : '',
                    refer = (typeof property.VIREFER) ? property.VIREFER : '';
                if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip) && sid) {
                    $.ajax({
                        type: 'POST',
                        url: '/template/visitor/' + sid,
                        data:  { ip : ip, refer :  refer },
                        dataType: 'json',
                        async: true,
                        cache: false,
                        success: function(r) {
                            // console.log(r);
                        }
                    });
                }
            }
        };
        xhttp.open('GET', '//api.ipify.org', true);
        xhttp.send();
    }

    function getProgressWidth() {
        var $p = $('.progress-bar');
        return $p.width() / $p.parent().width() * 100;
    }

    var checkError = function(data) {
        if(typeof data.error != "undefined" && data.error) {
            // alert(data.error);
            if(data.error=="No user data") {
                internalLink = true;
                // location.replace('/member/login');
                if(CONFIG_URL) location.replace('/_admin');
                setTimeout(function() {
                    hideAllModal(); 
                    var modal = $(this).showModalFlat('<img src="https://storage.googleapis.com/i.addblock.net/modal-logo-dark.png" alt="creaotrlink logo"/>', loginForm(), true, true, function() {
                    }, 'cancel', 'w450');
                    $('.flat-modal .modal-footer').hide();
                    $('.modal-default[id*=flat-modal] .modal-dialog .modal-body').css('margin','55px 45px 35px');
                    $('.modal-default[id*=flat-modal]').css('z-index','1041');
                    $('.flat-modal').next('.modal-backdrop').css('z-index','1040');
                },500);
            } else {
                $.processOFF();
                alert(data.error);
            }
            return false;
        } else {
            internalLink = false;
            return true;
        }
    }
    
    $(document)
    .off('keypress','input[expComma]')
    .on('keypress','input[expComma]', function(e) {
        var key = (e.which) ? e.which : e.keyCode;
        if(key == 44) return false;
    });

    $(document)
    .off('keypress','input[numberOnly]')
    .on('keypress','input[numberOnly]', function(e) {
        var key = (e.which) ? e.which : e.keyCode,
            sign = ($(this).hasClass('sign')) ? true : false;
        if(key > 47 && key < 58) {
            return true;
        } if(sign && (key == 43 || key == 45)) {
            return true;
        } else {
            return false;
        }
    });

    $(document)
    .off('keyup','input[numberOnly]')
    .on('keyup','input[numberOnly]', function(e) {
        var n = addCommas($(this).val().replace(/[^0-9.+-]/g,""));
        $(this).val(n);
    });

    function addCommas(x) {
        if(x.length == 0) return '';
        x = String(x);
        var l = x.split(""), zero = true;
        $.each(l, function(i,v) {
            if(x.charAt(0) == '+' || x.charAt(0) == '-') {
                var sign = x.charAt(0);
                if(x.charAt(1) == "0") {
                    x = x.substr(2);
                    x = sign + x;
                } else if(x.charAt(1) == '+' || x.charAt(1) == '-') {
                    x = x.substr(1);
                }
            } else if(x.charAt(0) == "0" && x.length > 1) {
                x = x.substr(1);
            } 
        });

        if(x.length > 0 && x.indexOf('.') > -1) return x;
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
     
    function removeCommas(x) {
        if(!x || x.length == 0) return "";
        if(x == "0" || x == 0) return 0;
        else return x.split(",").join("");
    }

    function formTranslate(l) {
        if(l != 'ko') {
            $('select[form-type="select"] option:selected').text('Select');
        }
    }

    function changeFavicon(src) {
        document.head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link'),
            oldLink = document.getElementById('dynamic-favicon');

        link.id = 'dynamic-favicon';
        link.type = 'image/x-icon';
        link.rel = 'icon';
        link.href = src;
        if (oldLink) {
            document.head.removeChild(oldLink);
        }
        document.head.appendChild(link);
    }

    function occurrences(string, subString, allowOverlapping) {
        string += "";
        subString += "";
        if (subString.length <= 0) return (string.length + 1);

        var n = 0,
            pos = 0,
            step = allowOverlapping ? 1 : subString.length;

        while (true) {
            pos = string.indexOf(subString, pos);
            if (pos >= 0) {
                ++n;
                pos += step;
            } else break;
        }
        return n;
    }

    function errorTag(tag) {
        var divStart = occurrences(tag,'<div',false),
            divEnd = occurrences(tag,'</div>',false);

        if(divStart!=divEnd) return true;
        return false;
    }

    
    function errorWorkingEmojisModal(closecallback, showcallback, hidecallback) {
        if($('.cl-cmmodal.error-emoji').length > 0) return false;

        if(typeof showcallback == 'undefined' || showcallback == '') {
            showcallback = function() {
                $('.modal-dialog.error-emoji').closest('.flat-modal').next('.modal-backdrop').attr('style','display: block; z-index: 1042!important;');
                $('.modal-dialog.error-emoji').closest('.modal').attr('style','display: block; z-index: 1043');
            }
        }

        $(this).showModalFlat($.lang[LANG]['config.information'],$.lang[LANG]['config.working.emoji'],true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0 cl-okbtn-pbt70 error-emoji','', closecallback, showcallback, hidecallback);
    }

    function errorEmojisModal(closecallback, showcallback, hidecallback) {
        if($('.cl-cmmodal.error-emoji').length > 0) return false;

        if(typeof showcallback == 'undefined' || showcallback == '') {
            showcallback = function() {
                $('.modal-dialog.error-emoji').closest('.flat-modal').next('.modal-backdrop').attr('style','display: block; z-index: 1042!important;');
                $('.modal-dialog.error-emoji').closest('.modal').attr('style','display: block; z-index: 1043');
            }
        }

        $(this).showModalFlat($.lang[LANG]['config.information'],$.lang[LANG]['config.unable.emoji'],true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0 cl-okbtn-pbt70 error-emoji','', closecallback, showcallback, hidecallback);
    }

    function checkEmojis(str) {
        var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|&zwj;)/g;
        return regex.test(str);
    }

    function removeEmojis(str) {
        var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|&zwj;)/g;
        return str.replace(regex, '');
    }



    function changeEmoji(str,op,usedDeferred) {
        if(typeof op == 'undefined' || (op != 'encode' && op != 'decode')) return str;
        if(typeof usedDeferred != 'boolean') usedDeferred = false;

        if(usedDeferred) {
            var deferred = $.Deferred();
            $.post('/template/emoji', { str:str, op:op }, function(data) {
                deferred.resolve(data.str);
            }, 'json');
            return deferred.promise();
        } else {
            $.post('/template/emoji', { str:str, op:op }, function(data) {
                return data.str;
            }, 'json');
        }
    }


    function strReplace(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    }

    function checkBase64Encode(str) {
        var regExp = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
        return (str.length % 4 == 0) && regExp.test(str);
    }

    function number_format(val) {
       return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function checkTemplateSite(sid) {
        if(!sid) return false;
        var templates_lang = ['ko','en'],
            templates_org = ["mysticetus","nigripes","pteromys","guanicoe","civettina","viverra","simensis", "euryzona", "leopardus", "gryphus", "rubicola", "wintoni", "iliensis", "javan", "acinonyx", "ochotona", "tayra", "fennec", "beluga", "itatsi", "pennantii", "luscinius", "kidogo", "rourei", "graysoni", "pagensis", "lilliae", "inscinius", "diazi", "gerpi", "lutreola", "walie", "gambieri", "saola", "waldeni", "indri", "jefferyi"],
            templates = [],
            templates_admin = [];
                
            
            $.each(templates_org,function(i,v){
                $.each(templates_lang,function(a,b){
                    templates_admin.push(v+'_'+b);
                });
            });

            templates = templates_admin.concat(templates_org);

        var is_templates = ($.inArray(sid.toLowerCase(), templates) > -1) ?  true : false;

        return is_templates;
    }

    jQuery.fn.serializeObject = function() {
        var obj = null;
        try {
            if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
                var arr = this.serializeArray();
                if (arr) {
                    obj = {};
                    jQuery.each(arr, function() {
                        obj[this.name] = this.value;
                    });
                }//if ( arr ) {
            }
        } catch (e) {
            alert(e.message);
        } finally {
        }
        return obj;
    }

    function errorCss(css) {
        css = css.replace("::",":");
        var cssStart = occurrences(css,'{',false),
            cssEnd = occurrences(css,'}',false),
            pStart = occurrences(css,':',false),
            pEnd = occurrences(css,';',false),
            min  = occurrences(css,'(min-width',false),
            min2 = occurrences(css,'( min-width',false),
            max  = occurrences(css,'(max-width',false),
            max2 = occurrences(css,'( max-width',false),
            hover = occurrences(css,':hover',false),
            active = occurrences(css,':active',false),
            focus = occurrences(css,':focus',false),
            before = occurrences(css,':before',false),
            after = occurrences(css,':after',false),
            empty = occurrences(css,':empty',false),
            not = occurrences(css,':not',false),
            checked = occurrences(css,':checked',false),
            first = occurrences(css,':first-child',false),
            last = occurrences(css,':last-child',false),
            first_letter = occurrences(css,':first-letter',false),
            first_line = occurrences(css,':first-line',false),
            first_of_type = occurrences(css,':first-of-type',false),
            nth = occurrences(css,':nth',false),
            nth_even = occurrences(css,':nth-child(even)',true),
            nth_odd = occurrences(css,':nth-child(odd)',true),
            holder1 = occurrences(css,':-webkit-input-placeholder',false),
            holder2 = occurrences(css,':-moz-placeholder',false),
            holder3 = occurrences(css,':-ms-input-placeholder',false),
            media_controls = occurrences(css,':-webkit-media-controls',false),
            select_icon = occurrences(css,':-ms-expand',false),
            scrollbar1 = occurrences(css,':-webkit-scrollbar',false),
            scrollbar2 = occurrences(css,':-webkit-scrollbar-track',false),
            scrollbar3 = occurrences(css,':-webkit-scrollbar-thumbr',false),
            https = occurrences(css,'https:',false),
            http = occurrences(css,'http:',false);

        if(rt_admin == "admin") {
            console.log('{', cssStart);
            console.log('}', cssEnd);
            console.log(':', pStart);
            console.log(';', pEnd);
            console.log('media css', (min + min2 + max + max2));
            console.log('hover', hover);
            console.log('active', active);
            console.log('focus', focus);
            console.log('before', before);
            console.log('after', after);
            console.log('empty', empty);
            console.log('not', not);
            console.log('checked', checked);
            console.log('first-child', first);
            console.log('last-child', last);
            console.log('first-letter', first_letter);
            console.log('first-line', first_line);
            console.log('first-of-type', first_of_type);
            console.log('nth', nth);
            console.log('nth-even', nth_even);
            console.log('nth-odd', nth_odd);
            console.log('holder', (holder1 + holder2 + holder3));
            console.log('video-controls(::-webkit-media-controls)', media_controls);
            console.log('select-icon(::-ms-expand)', select_icon);
            console.log('scrollbar', scrollbar1);
            console.log('scrollbar-track', scrollbar2);
            console.log('scrollbar-thumb', scrollbar3);
            console.log('https:', https);
            console.log('http:', http);
        }
        if(cssStart!=cssEnd) return true;
        if(pStart!=(pEnd + min + min2 + max + max2 + hover + active + focus + before + after + empty + not + checked + first + last + first_letter + first_line + first_of_type + nth + holder1 + holder2 + holder3 + media_controls + select_icon + scrollbar1 + scrollbar2 + scrollbar3 + https + http)) return true;
        return false;
    }

    if(typeof(MD5_JS)=='undefined'){
        var MD5_JS=true;var hexcase=0;var b64pad="";var chrsz=8;function hex_md5(s){return binl2hex(core_md5(str2binl(s),s.length*chrsz));}function b64_md5(s){return binl2b64(core_md5(str2binl(s),s.length*chrsz));}function str_md5(s){return binl2str(core_md5(str2binl(s),s.length*chrsz));}function hex_hmac_md5(key,data){return binl2hex(core_hmac_md5(key,data));}function b64_hmac_md5(key,data){return binl2b64(core_hmac_md5(key,data));}function str_hmac_md5(key,data){return binl2str(core_hmac_md5(key,data));}function core_md5(x,len){x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}return Array(a,b,c,d);}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t);}function core_hmac_md5(key,data){var bkey=str2binl(key);if(bkey.length>16)bkey=core_md5(bkey,key.length*chrsz);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++){ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}var hash=core_md5(ipad.concat(str2binl(data)),512+data.length*chrsz);return core_md5(opad.concat(hash),512+128);}function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}function str2binl(str){var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(i%32);return bin;}function binl2str(bin){var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz)str+=String.fromCharCode((bin[i>>5]>>>(i%32))&mask);return str;}function binl2hex(binarray){var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++)str+=hex_tab.charAt((binarray[i>>2]>>((i%4)*8+4))&0xF)+hex_tab.charAt((binarray[i>>2]>>((i%4)*8))&0xF);return str;}function binl2b64(binarray){var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var str="";for(var i=0;i<binarray.length*4;i+=3){var triplet=(((binarray[i>>2]>>8*(i%4))&0xFF)<<16)|(((binarray[i+1>>2]>>8*((i+1)%4))&0xFF)<<8)|((binarray[i+2>>2]>>8*((i+2)%4))&0xFF);for(var j=0;j<4;j++){if(i*8+j*6>binarray.length*32)str+=b64pad;else
str+=tab.charAt((triplet>>6*(3-j))&0x3F);}}return str;}}
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4)}return output},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}}output=Base64._utf8_decode(output);return output},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}return utftext},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3}}return string}}

    $('.newcheckbox').live('click', function() {
        var checkCollection = $(this).parents('.collection-item').length;
        if(checkCollection < 1) {
            if($(this).hasClass('disabled')) {
                return false;
            }
        }        
    });


    var setPanelTranslate = function(obj) {
        $.each(obj.find('[data-title]'), function(i,v) {
            var el_title = $(this).attr('data-title'),
                lang_check = /[ㄱ-ㅎㅏ-ㅣ가-힣]/,
                el_title_lang = (lang_check.test(el_title)) ? 'ko' : 'en',
                arr = $.lang[el_title_lang];
            if($(this).parent().hasClass('gallery-item')) return true;
            key = getKeyByValue(arr,el_title);

            if(key && el_title_lang != LANG) $(this).attr('data-title',$.lang[LANG][key]);
        });
    }

    var cutStrInBytes = function(str, limit) {
        var size = 0;
        for(var i=0; i<str.length; i++) {
            size += (str.charCodeAt(i) > 128) ? 2 : 1;
            if(size > limit) return str.substring(0,i) + '...';
        }
        return str;
    }

    var refreshGalleryField = function(elObj,elsettings) {
        if( typeof elsettings == 'undefined' ||
            $.isEmptyObject(elsettings) ||
            typeof elsettings.field_disable == 'undefined' ||
            $.isEmptyObject(elsettings.field_disable)
        ) {
            return false;
        }

        var el_mode = elObj.attr('data-mode'),
            checkGalleryField = (elObj.find('h5.figure').eq(0).hasClass('title')) ? true : false;
        if(!checkGalleryField) return false;

        var gfield_all = ['title','caption','price','review_cnt','review_score'],
            gfield_disable = (typeof elsettings.field_disable != 'undefined' && !$.isEmptyObject(elsettings.field_disable)) ? elsettings.field_disable : [],
            gfield_listSet = (typeof el_mode != 'undefined' && el_mode == 'shopping') ? ['title','caption','price','review_cnt','review_score'] : ['title', 'caption'];

        $.each(gfield_all, function(g_i,g_v) {
            var onoff = ($.inArray(g_v,gfield_disable) > -1) ? false : true;
            if(onoff && $.inArray(g_v,gfield_listSet) == -1) onoff = false;

            var checkReviewField = (g_v.match(/^review_/gi) !== null) ? true : false;
            if(checkReviewField) {
                elObj.find('.figure.review').attr('data-'+g_v,onoff);
            } else {
                if(onoff) elObj.find('.figure.'+g_v).each(function() { $(this).removeAttr('style'); $(this).removeClass('hide'); });
                else elObj.find('.figure.'+g_v).each(function() { $(this).addClass('hide'); });
            }
        });
    }

    var refreshGalleryHeight = function(el) {
        if(el == 'el-menu' || el == 'el-footer') return false;
        var g_block = (typeof el != 'undefined' && el) ? '.'+el : '',
            g_block_selector = (typeof el != 'undefined' && el == 'el_display') ? '#element-display' : '.element[data-type="gallery"]'+g_block;

        $(g_block_selector).each(function() {
            if($(this).find('.empty-txt').length > 0 || $(this).find('.grid').length == 0) return;

            var gsort = $(this).find('.goption').attr('data-gsort'),
                gh = $(this).find('.goption').attr('data-gh');
            if(typeof gh == 'undefined' || gh == 'auto') { return; }
            if(typeof gsort != 'undefined' && gsort == 'm') {
                $(this).find('.grid .g-img').removeClass('style');
                return;
            }

            var gel = $(this).find('.grid').eq(0),
                // gw = parseFloat(gel.css('width').replace(/[^0-9]/g,'')),
                gw = parseFloat(gel[0].getBoundingClientRect().width),
                gpl = parseFloat(gel.css('padding-left').replace(/[^0-9]/g,'')),
                gpr = parseFloat(gel.css('padding-right').replace(/[^0-9]/g,'')),
                g_img_height = (gw - (gpl+gpr)) * parseFloat(gh);

            $(this).find('.grid .g-img').css('height',g_img_height + 'px');
        });
    }


    var getGalleryCategoryBlockNav = function(elid,elsettings) {
        var gallery_category_home = (typeof elsettings.category_home == 'undefined') ? 'All' : elsettings.category_home,
            gallery_settings_category = (typeof elsettings.category == 'undefined') ? '' : elsettings.category.replace(/\|/g,'').replace(/\,/g,', '),
            gallery_settings_category_color = (typeof elsettings.category_color_type == 'undefined') ? '' : elsettings.category_color_type,
            category_nav_list = '',
            g_category = (gallery_settings_category) ? gallery_settings_category.split(',') : ['category1','category2','category3'];

        if(!gallery_settings_category) {
            elsettings = {
                category : '|category1|,|category2|,|category3|',
                category_home : 'All'
            };

            $.post('/template/settings', { sid : SID, settings : JSON.stringify(elsettings), el : elid }, function(data) {
                checkError(data);
            }, 'json');
        }

        var active_arr = [],
            cookie_gallery_category =  $.cookie('gallery-category-'+elid);

        $.each(g_category, function(i,v) {
            var active = (v.trim() == cookie_gallery_category) ? 'active' : '';
            active_arr.push(active);
            if(v) category_nav_list = category_nav_list + '\
                <li class="'+active+'"><a href="javascript:;" data-idx="'+ (i+1) +'">'+v.trim()+'</a></li>\
            ';
        });

        var active_empty = ($.inArray('active',active_arr) == -1) ? 'active' : '',
            active_home = (typeof elsettings.category_home_hide != 'undefined' && (elsettings.category_home_hide == 'true' || elsettings.category_home_hide === true)) ? ' hide' : '',
            str = '\
                <div class="gallery-category-wrap">\
                    <ul class="gallery-category-nav" data-category-color="' + gallery_settings_category_color + '">\
                        <li class="'+active_empty+active_home+'"><a href="javascript:;" data-idx="0">' + gallery_category_home + '</a></li>\
                        ' + category_nav_list + '\
                    </ul>\
                </div>\
        ';
        return str;
    }

    var loadGalleryCategoryBlock = function(gc_el,gc_id,gc_elsettings) {
        var $gc_el = gc_el;
        if($gc_el.length == 0) {
            console.log('undefined Gallery Block..');
            return false;
        }

        var gc_deferred = $.Deferred();
        if(typeof gc_elsettings == 'undefined' && typeof gc_id != 'undefined' && gc_id) {
            $.getJSON('/template/element/type/get/seq/' + gc_id, function(data){ 
                checkError(data);
                gc_elsettings = (typeof data[0].elsettings == 'undefined' || data[0].elsettings == '') ? {} : $.parseJSON(data[0].elsettings);
                gc_deferred.resolve(gc_elsettings);
            });
        } else gc_deferred.resolve(gc_elsettings);


        gc_deferred.promise().then(function(settings) {
            if(typeof settings == 'undefined') settings = {};

            var margin_val = $gc_el.find('.row[data-loop="true"]').css('margin-left'),
                padding_val = $gc_el.find('.grid').first().css('padding-left'),
                gc = (typeof settings.category_display != 'undefined' && settings.category_display == 'ON') ? true : false;

            if(gc) {
                var checkMsny = (typeof $gc_el.attr('data-msny') != 'undefined' && $gc_el.attr('data-msny') == 'true') ? true : false,
                    checkGalleryCate = (  (checkMsny && $gc_el.children('.gallery-category-wrap').length > 0) ||
                                          (!checkMsny && $gc_el.find('.container .gallery-category-wrap').length > 0)
                                        ) ? true : false,
                    gallery_category_html = getGalleryCategoryBlockNav(gc_id,settings);

                if(checkGalleryCate) $gc_el.find('.gallery-category-wrap').replaceWith(gallery_category_html);     
                else {
                    $gc_el.find('.gallery-category-wrap').remove();
                    if(checkMsny) {
                        if($gc_el.find('.goption').length > 0) $gc_el.find('.goption').after(gallery_category_html);
                        else $gc_el.prepend(gallery_category_html);
                    } else {
                        $gc_el.find('[data-loop="true"]').before(gallery_category_html);
                    }
                }

                if($gc_el.find('.row[data-loop="true"]').find('.emptyGalleryItem').length > 0  && $gc_el.find('.gallery-category-nav .active').index() == 0) {
                    $gc_el.find('.gallery-category-nav').addClass('empty');
                } else $gc_el.find('.gallery-category-nav').removeClass('empty');

            } else {
                $gc_el.find('.gallery-category-wrap').remove();
            }

            var checkGalleryPadding = ($gc_el.find('.goption[data-gpd]').length > 0) ? true : false;
            if(checkGalleryPadding) {
            } else {
                // before Ver
                if($('body').width() <= 768 && !$gc_el.find('.container').hasClass('full-width')) padding_val = '15px';
                $gc_el.find('.gallery-category-wrap').css({'margin-left': margin_val, 'margin-right': margin_val });
                $gc_el.find('.gallery-category-nav').css({'padding-left': padding_val, 'padding-right': padding_val });

                var gc_width_control = ($gc_el.find('.container').hasClass('full-width')) ? true : false; 
                if(typeof $gc_el.attr('data-msny') != 'undefined' && $gc_el.attr('data-msny') == 'true'  || gc_width_control) {
                    var width = (gc_width_control && $gc_el.find('.container').css('margin') == '0px') ? $gc_el.find('.container').outerWidth()-40 : $gc_el.find('.container').outerWidth();
                    $gc_el.find('.gallery-category-wrap').css({'width': width, 'margin':'0 auto'});
                }
            }

            if($gc_el.find('.row[data-loop="true"]').css('overflow') == 'hidden') $gc_el.find('.row[data-loop="true"]').css('overflow','visible');

        });
    }


    var clSVG = function(type,w,h,wrap,add_class) {
        if(typeof add_class == 'undefined') add_class = '';
        
        var icon = '';
        switch(type) {
            case 'caret': 
                    icon = '<svg viewBox="0 0 8 4" width="'+w+'" height="'+h+'"><polygon points="0 0 4 4 8 0 "></polygon></svg>'; 
                break;

            case 'info' :
                    icon = '\
                        <svg viewBox="0 0 13 13" width="'+w+'" height="'+h+'">\
                            <path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/>\
                            <rect x="6" y="3" width="1" height="5"/>\
                            <rect x="6" y="9" width="1" height="1"/>\
                        </svg>\
                    ';
                break;

            case 'info2' :
                    icon = '<svg viewBox="0 0 12 12" width="'+w+'" height="'+h+'"><path d="M6 0a6 6 0 10.01 12.01A6 6 0 006 0zm.6 9.2H5.4V8h1.2v1.2zm0-2H5.4l-.2-4.4h1.6l-.2 4.4z"/></svg>';
                break;

            case 'question':
                    icon = '<svg viewBox="0 0 13 13" width="'+w+'" height="'+h+'"><path d="M6.5 0a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM7 10H6V9h1v1zm.67-3.25c-.63.62-.67.91-.68 1.25H6c.02-.63.21-1.03.88-1.69.46-.47.75-.86.76-1.34 0-.58-.39-.95-1.02-.95-.56 0-1 .14-1.08.76-.01.07-.02.15-.02.22H4.5c-.01-.08 0-.14 0-.2.08-1.3 1.11-1.79 2.17-1.79 1.22 0 2.04.84 2.04 1.87-.01.8-.54 1.39-1.04 1.87z"/></svg>';
                break;

            case 'checkbox' :
                    icon = '\
                        <svg viewBox="0 0 16 16" width="'+w+'" height="'+h+'">\
                            <path class="st6" d="M3 0h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H3c-1.66 0-3-1.34-3-3V3C0 1.34 1.34 0 3 0z"/>\
                            <path class="st19" d="M13 1c1.1 0 2 0.9 2 2v10c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2H13M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0L13 0z"/>\
                        </svg>\
                        <svg class="active" viewBox="0 0 16 16" width="'+w+'" height="'+h+'">\
                            <rect x="2" y="2" class="st19" width="12" height="12"/>\
                            <path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/>\
                        </svg>\
                    ';
                break;

            case 'pencil':
                    icon = '<svg viewBox="0 0 12 12" width="'+w+'" height="'+h+'"><path d="M11.56 0.57l-0.13-0.13C11.14 0.15 10.76 0 10.37 0 9.99 0 9.6 0.15 9.31 0.44L0.75 9 0 12l3-0.75 8.56-8.56C12.15 2.1 12.15 1.15 11.56 0.57zM2.49 10.35l-1.11 0.28 0.28-1.11 6.58-6.58 0.84 0.84L2.49 10.35zM10.85 1.98L9.77 3.06 8.94 2.23l1.08-1.08C10.15 1.02 10.29 1 10.37 1s0.23 0.02 0.35 0.15l0.13 0.13C11.05 1.47 11.05 1.79 10.85 1.98z"></path></svg>';
                break;

            case 'delete':
                    icon = '<svg viewBox="0 0 12 12" width="'+w+'" height="'+h+'"><path d="M11 2H9V0H3v2H1 0v1h1v7c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V3h1V2H11zM4 1H8v1H4V1zM10 10c0 0.6-0.4 1-1 1H3c-0.5 0-1-0.4-1-1V3h1H9h1V10z"></path><rect x="4" y="4" width="1" height="6"></rect><rect x="7" y="4" width="1" height="6"></rect></svg>';
                break;

            case 'check':
                    icon = '<svg viewBox="0 0 24 24" width="'+w+'" height="'+h+'"><path d="M19.29 6.29 10 15.59l-5.29-5.3-1.42 1.42 6.71 6.7 10.71-10.7z"/></svg>';
                break;
            case 'times':
                    icon = '<svg viewBox="0 0 12 12" width="'+w+'" height="'+h+'"><polygon points="12 0.71 11.29 0 6 5.29 0.71 0 0 0.71 5.29 6 0 11.29 0.71 12 6 6.71 11.29 12 12 11.29 6.71 6 "/></svg>';
                break;

            case 'videoPlay_btn' : 
                    icon = '<svg class="playbtn" viewBox="0 0 58 58" width="'+w+'" height="'+h+'"><circle cx="29" cy="29" r="29"/><path class="st23" d="M29 0C12.98 0 0 12.98 0 29c0 16.02 12.98 29 29 29s29-12.98 29-29C58 12.98 45.02 0 29 0zM41.25 29.43l-17.5 10.13C23.42 39.76 23 39.52 23 39.13V18.87c0-0.39 0.42-0.63 0.75-0.43l17.5 10.13C41.59 28.76 41.59 29.24 41.25 29.43z"/></svg>';
                break;
                
            case 'link' : 
                    icon = '\
                        <svg viewBox="0 0 12 12" width="'+w+'" height="'+h+'">\
                            <path d="M11.3 0.81L11.19 0.7C10.72 0.23 10.11 0 9.49 0 8.88 0 8.27 0.23 7.8 0.7L6.24 2.26l0.71 0.71L8.5 1.41C8.77 1.15 9.12 1 9.49 1c0.37 0 0.73 0.15 0.99 0.41l0.11 0.11c0.55 0.55 0.55 1.43 0 1.98L7.48 6.6C7.22 6.87 6.87 7.01 6.49 7.01c-0.37 0-0.73-0.15-0.99-0.41L5.45 6.54 4.74 7.25 4.8 7.31c0.47 0.47 1.08 0.7 1.7 0.7 0.61 0 1.23-0.23 1.7-0.7L11.3 4.2C12.23 3.27 12.23 1.75 11.3 0.81z"/><path d="M3.5 10.59C3.23 10.85 2.88 11 2.51 11c-0.37 0-0.73-0.15-0.99-0.41l-0.11-0.11c-0.55-0.55-0.55-1.43 0-1.98L4.52 5.4c0.26-0.26 0.62-0.41 0.99-0.41 0.37 0 0.73 0.15 0.99 0.41l0.06 0.06 0.71-0.71L7.2 4.69c-0.47-0.47-1.08-0.7-1.7-0.7 -0.61 0-1.23 0.23-1.7 0.7L0.7 7.8c-0.94 0.94-0.94 2.46 0 3.39l0.11 0.11c0.47 0.47 1.08 0.7 1.7 0.7 0.61 0 1.23-0.23 1.7-0.7l1.55-1.55L5.05 9.04 3.5 10.59z"/>\
                        </svg>\
                    '; 
                break;

            case 'file-image' :
                    icon = '<svg viewBox="0 0 20 20" width="'+w+'" height="'+h+'"><path d="M0 0v20h20V0H0zM19 1v11.3l-3-3 -4 4 -6-6 -5 5V1H19zM1 19v-5.3l5-5 6 6 4-4 3 3V19H1z"/><circle cx="14.5" cy="5.5" r="1.5"/></svg>';
                break;

            case 'elviewer-pc':
                    icon = '<svg viewBox="0 0 42 42" width="'+w+'" height="'+h+'"><g><path class="st9" d="m18.43 24.5-5.77 10c-1.15 2 .29 4.5 2.6 4.5H26.8c2.31 0 3.75-2.5 2.6-4.5l-5.77-10c-1.16-2-4.04-2-5.2 0z" fill="#ffffff"/><path d="M21.03 25c.17 0 .61.05.87.5l5.77 10c.26.45.09.85 0 1s-.35.5-.87.5H15.26c-.52 0-.78-.35-.87-.5s-.26-.55 0-1l5.77-10c.26-.45.7-.5.87-.5m0-2c-1.01 0-2.02.5-2.6 1.5l-5.77 10c-1.15 2 .29 4.5 2.6 4.5H26.8c2.31 0 3.75-2.5 2.6-4.5l-5.77-10c-.58-1-1.59-1.5-2.6-1.5z" /><path class="st9" d="M36 33H6c-2.21 0-4-1.79-4-4V7c0-2.21 1.79-4 4-4h30c2.21 0 4 1.79 4 4v22c0 2.21-1.79 4-4 4z" fill="#ffffff"/><path d="M36 3H6C3.79 3 2 4.79 2 7v22c0 2.21 1.79 4 4 4h30c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4zM4 23V7c0-1.1.9-2 2-2h30c1.1 0 2 .9 2 2v16H4zm2 8c-1.1 0-2-.9-2-2v-4h34v4c0 1.1-.9 2-2 2H6z" /><circle class="st9" cx="21" cy="28" r=".25"/><path d="M21 27c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" /></g></svg>';
                break;
            case 'elviewer-mobile':
                    icon = '<svg viewBox="0 0 42 42" width="'+w+'" height="'+h+'"><g><path d="M28 40H14c-2.76 0-5-2.24-5-5V7c0-2.76 2.24-5 5-5h14c2.76 0 5 2.24 5 5v28c0 2.76-2.24 5-5 5z" style="fill:#fff"/><path d="M28 4c1.65 0 3 1.35 3 3v28c0 1.65-1.35 3-3 3H14c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h14m0-2H14c-2.76 0-5 2.24-5 5v28c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5z" /><path d="M21 32c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" /></g></svg>';
                break;

            case 'elview-info':
                    icon = '<svg viewBox="0 0 13 13" width="'+w+'" height="'+h+'"><g id="alert01"><path d="M6.5 0a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><path d="M6 5h1v5H6z"/><path d="M6 3h1v1H6z"/></g></svg>';
                break;

            case 'elview-left':
                    icon = '<svg viewBox="0 0 44 44" width="'+w+'" height="'+h+'"><path d="M30 43c-.29 0-.58-.13-.78-.38l-16-20c-.29-.37-.29-.88 0-1.25l16-20c.35-.43.97-.5 1.41-.16.43.35.5.97.16 1.41L15.28 22l15.5 19.37c.34.43.27 1.06-.16 1.41-.18.15-.4.22-.62.22z"/></svg>';
                break;
            case 'elview-right':
                    icon = '<svg viewBox="0 0 44 44" width="'+w+'" height="'+h+'"><path d="M14 43c.29 0 .58-.13.78-.38l16-20c.29-.37.29-.88 0-1.25l-16-20c-.35-.43-.97-.5-1.41-.16-.43.35-.5.97-.16 1.41L28.72 22l-15.5 19.37c-.34.43-.27 1.06.16 1.41.18.15.4.22.62.22z"/></svg>';
                break;
            case 'elview-leftright-p':
                    icon = '<svg viewBox="0 0 36 26" width="'+w+'" height="'+h+'"><path d="M0 3v20l13-10z"/><path d="M34.25 6.56v12.88L25.88 13l8.37-6.44M36 3 23 13l13 10V3z"/><path fill="none" stroke="#8e9095" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="3.5,2.3" d="M18.08 0v26"/></svg>';
                break;
            case 'elview-leftright-m':
                    icon = '<svg viewBox="0 0 26 36" width="'+w+'" height="'+h+'"><path d="M23 0H3l10 13z"/><path d="m13 25.88 6.44 8.37H6.56L13 25.88M13 23 3 36h20L13 23z"/><path fill="none" stroke="#8e9095" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="3.5,2.3" d="M26 18.08H0"/></svg>';
                break;

            case 'block-menu':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M34 8.5v21H4v-21h30m0-2H4c-1.1 0-2 .9-2 2v21c0 1.1.9 2 2 2h30c1.1 0 2-.9 2-2v-21c0-1.1-.9-2-2-2z"/><path d="M36 14.34H2v2h34v-2z"/></g></svg>';
                break;
            case 'block-sidebar':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M34 8v22H4V8h30m0-2H4c-1.1 0-2 .9-2 2v22c0 1.1.9 2 2 2h30c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/><path d="M12 6h-2v26h2V6z"/></g></svg>';
                break;
            case 'block-footer':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M28 23.01H10c-.55 0-1-.45-1-1s.45-1 1-1h18c.55 0 1 .45 1 1 0 .56-.45 1-1 1zM28 18.01H10c-.55 0-1-.45-1-1s.45-1 1-1h18c.55 0 1 .45 1 1 0 .56-.45 1-1 1z"/><path d="M34 8.99v18H4v-18H2v18c0 1.12.9 2.03 2 2.03h30c1.1 0 2-.91 2-2.03v-18h-2z"/></g>';
                break;
            case 'block-project':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M4 27.01v-14h30v14h2v-14c0-1.12-.9-2.03-2-2.03H4c-1.1 0-2 .91-2 2.03v14h2z"/><path d="M28 18.99H10c-.55 0-1-.45-1-1s.45-1 1-1h18c.55 0 1 .45 1 1s-.45 1-1 1z"/></g></svg>';
                break;
            case 'block-gallerycategory':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M4 27.01v-14h30v14h2v-14c0-1.12-.9-2.03-2-2.03H4c-1.1 0-2 .91-2 2.03v14h2z"/><path d="M28 18.99H10c-.55 0-1-.45-1-1s.45-1 1-1h18c.55 0 1 .45 1 1s-.45 1-1 1z"/></g></svg>';
                break;
            case 'block-showcase':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M28.3 10.93H9.7c-1.1 0-2 .9-2 2v12.15c0 1.1.9 2 2 2h18.6c1.1 0 2-.9 2-2V12.93c0-1.11-.89-2-2-2zm0 14.14H9.7V12.93h18.6v12.14zM5.23 16.36l-.05-.05c-.2-.2-.51-.2-.71 0l-2.34 2.34c-.2.2-.2.51 0 .71l.05.05 2.28 2.28c.2.2.51.2.71 0l.05-.05c.2-.2.2-.51 0-.71L3.3 19l1.93-1.93c.19-.2.19-.51 0-.71zM35.87 18.65l-2.34-2.34c-.2-.2-.51-.2-.71 0l-.05.05c-.2.2-.2.51 0 .71L34.7 19l-1.93 1.93c-.2.2-.2.51 0 .71l.05.05c.2.2.51.2.71 0l2.28-2.28.05-.05c.2-.2.2-.52.01-.71z"/></g></svg>\
                    ';
                break;
            case 'block-header':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M26.07 16H11.93c-.51 0-.93.42-.93.93v.14c0 .51.42.93.93.93h14.14c.51 0 .93-.42.93-.93v-.14c0-.51-.42-.93-.93-.93zM26.07 20H11.93c-.51 0-.93.42-.93.93v.14c0 .51.42.93.93.93h14.14c.51 0 .93-.42.93-.93v-.14c0-.51-.42-.93-.93-.93z"/><path d="M30 11H8c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V14c0-.55.45-1 1-1h20c.55 0 1 .45 1 1v12c0 .55.45 1 1 1s1-.45 1-1V13c0-1.1-.9-2-2-2z"/></g></svg>';
                break;
            case 'block-contents':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M16 12H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V14c0-1.1-.9-2-2-2zm0 12H5V14h11v10zM21 14h13c.55 0 1-.45 1-1s-.45-1-1-1H21c-.55 0-1 .45-1 1s.45 1 1 1zM34 16H21c-.55 0-1 .45-1 1s.45 1 1 1h13c.55 0 1-.45 1-1s-.45-1-1-1zM34 20H21c-.55 0-1 .45-1 1s.45 1 1 1h13c.55 0 1-.45 1-1s-.45-1-1-1zM28 24h-7c-.55 0-1 .45-1 1s.45 1 1 1h7c.55 0 1-.45 1-1s-.45-1-1-1z"/></g></svg>';
                break;
            case 'block-gallery':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M12.86 11.29H8c-.55 0-1 .45-1 1v4.86c0 .55.45 1 1 1h4.86c.55 0 1-.45 1-1v-4.86c0-.56-.45-1-1-1zM21.43 11.29h-4.86c-.55 0-1 .45-1 1v4.86c0 .55.45 1 1 1h4.86c.55 0 1-.45 1-1v-4.86c0-.56-.45-1-1-1zM30 11.29h-4.86c-.55 0-1 .45-1 1v4.86c0 .55.45 1 1 1H30c.55 0 1-.45 1-1v-4.86c0-.56-.45-1-1-1zM12.86 19.86H8c-.55 0-1 .45-1 1v4.86c0 .55.45 1 1 1h4.86c.55 0 1-.45 1-1v-4.86c0-.56-.45-1-1-1zM21.43 19.86h-4.86c-.55 0-1 .45-1 1v4.86c0 .55.45 1 1 1h4.86c.55 0 1-.45 1-1v-4.86c0-.56-.45-1-1-1zM30 19.86h-4.86c-.55 0-1 .45-1 1v4.86c0 .55.45 1 1 1H30c.55 0 1-.45 1-1v-4.86c0-.56-.45-1-1-1z"/></g></svg>';
                break;
            case 'block-text':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M8 14h22c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM30 16H8c-.55 0-1 .45-1 1s.45 1 1 1h22c.55 0 1-.45 1-1s-.45-1-1-1zM30 20H8c-.55 0-1 .45-1 1s.45 1 1 1h22c.55 0 1-.45 1-1s-.45-1-1-1zM22 24H8c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1z"/></g></svg>';
                break;
            case 'block-image':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M29 10.5H9c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-13c0-1.1-.9-2-2-2zm0 15h-.59l-4.6-5.68a.989.989 0 0 0-.78-.37c-.29 0-.58.12-.78.37l-3.06 3.78-4.4-5.71a.995.995 0 0 0-1.58 0L9 23.35V12.5h20v13z"/><circle cx="20" cy="15.5" r="2"/></g></svg>';
                break;
            case 'block-video':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><path d="M31.61 13.14c-.5-1.99-1.43-2.75-3.14-3.03-.98-.14-5.71-.33-9.47-.33-3.76 0-8.49.19-9.47.33-1.71.27-2.64 1.04-3.14 3.03-.16.66-.39 4.32-.39 5.71v.31c0 1.39.23 5.04.4 5.71.49 1.98 1.43 2.75 3.14 3.02.98.15 5.72.33 9.48.33H19c3.76 0 8.49-.19 9.48-.33 1.71-.27 2.64-1.04 3.14-3.02.15-.67.38-4.32.38-5.72v-.31c0-1.38-.23-5.04-.39-5.7zm-15.73 9.19v-6.66l6.23 3.25-6.23 3.41z"></svg>';
                break;
            case 'block-dividers':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M7.5 11.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM9.59 11.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM11.68 11.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM13.77 11.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM15.86 11.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM17.95 11.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM20.05 11.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.23.5-.5.5zM22.14 11.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.23.5-.5.5zM24.23 11.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.23.5-.5.5zM26.32 11.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.23.5-.5.5zM28.41 11.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM30.5 11.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"/><g><path d="M9.5 16.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2c.28 0 .5.22.5.5s-.22.5-.5.5zM14.75 16.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2c.28 0 .5.22.5.5s-.22.5-.5.5zM20 16.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2c.28 0 .5.22.5.5s-.22.5-.5.5zM25.25 16.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2c.28 0 .5.22.5.5s-.22.5-.5.5zM30.5 16.5h-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2c.28 0 .5.22.5.5s-.22.5-.5.5z"/></g><path d="M30.5 21.5h-23c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h23c.28 0 .5.22.5.5s-.22.5-.5.5zM30 27.5H8c-.55 0-1-.45-1-1s.45-1 1-1h22c.55 0 1 .45 1 1s-.45 1-1 1z"/></g></svg>';
                break;
            case 'block-contact':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><path d="M29 11H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V13c0-1.1-.9-2-2-2zm-1.65 2-8.33 7.34L10.68 13h16.67zM9 25V14.07c.1.15.21.3.36.44l8.33 7.34c.38.33.85.5 1.32.5.47 0 .94-.17 1.32-.5l8.33-7.34c.14-.12.24-.26.33-.4V25H9z"/></svg>';
                break;
            case 'block-forum':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><path d="M34 15h-8v-3c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h2v4l4-4h5v1c0 .55.45 1 1 1h11l4 4v-4h2c.55 0 1-.45 1-1v-7c0-.55-.45-1-1-1zm-18 1v4h-5l-2.5 2.5V20H6c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h17c.55 0 1 .45 1 1v2h-7c-.55 0-1 .45-1 1zm4.5 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></svg>';
                break;
            case 'block-latest':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M10.5 11.5C6.36 11.5 3 14.86 3 19s3.36 7.5 7.5 7.5S18 23.14 18 19s-3.36-7.5-7.5-7.5zm0 13C7.47 24.5 5 22.03 5 19s2.47-5.5 5.5-5.5S16 15.97 16 19s-2.47 5.5-5.5 5.5z"/><path d="M11 15.5c-.55 0-1 .45-1 1v2H8c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1zM21 15.5h13c.55 0 1-.45 1-1s-.45-1-1-1H21c-.55 0-1 .45-1 1s.45 1 1 1zM34 17.5H21c-.55 0-1 .45-1 1s.45 1 1 1h13c.55 0 1-.45 1-1s-.45-1-1-1zM28 21.5h-7c-.55 0-1 .45-1 1s.45 1 1 1h7c.55 0 1-.45 1-1s-.45-1-1-1z"/></g></svg>';
                break;
            case 'block-sns':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><path d="M30.5 19c0-4.97-5.15-9-11.5-9S7.5 14.03 7.5 19s5.15 9 11.5 9c2.46 0 4.73-.61 6.6-1.63L30.5 28l-1.52-4.55c.96-1.31 1.52-2.83 1.52-4.45zm-15.28.25c-.07-.07-.12-.14-.18-.22-.33-.42-.54-.95-.54-1.53A2.5 2.5 0 0 1 17 15c.82 0 1.54.4 2 1.01A2.5 2.5 0 0 1 21 15a2.5 2.5 0 0 1 2.5 2.5c0 .58-.21 1.11-.54 1.53-.06.07-.11.15-.18.22l-.03.03L19 23l-3.75-3.72-.03-.03z"></svg>';
                break;
            case 'block-form':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M10 11H8c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1zM30 11H14c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1zM10 17H8c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1zM30 17H14c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1zM10 23H8c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1zM30 23H14c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1z"/></g></svg>';
                break;
            case 'block-others':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><g><path d="M12 16H8c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1zM21 16h-4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1zM30 16h-4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1z"/></g></svg>';
                break;

            case 'storagebox':
                    icon = '<svg viewBox="0 0 38 38" width="'+w+'" height="'+h+'"><path d="M30.2 16.5H29V15c0-1.66-1.34-3-3-3h-7.19a.75.75 0 0 1-.53-.22l-2.12-2.12c-.42-.42-1-.66-1.59-.66H11c-1.66 0-3 1.34-3 3v12c0 1.25.76 2.32 1.85 2.77.25.14.55.23.88.23h15.72c1.2 0 2.28-.72 2.76-1.82l2.65-6.17c.5-1.19-.37-2.51-1.66-2.51zm-19.2-6h3.57c.2 0 .39.08.53.22l2.12 2.12c.43.42.99.66 1.59.66H26c.83 0 1.5.67 1.5 1.5v1.5H14.48c-1.2 0-2.28.72-2.76 1.82L9.5 23.5V12c0-.83.67-1.5 1.5-1.5zm19.47 7.92-2.65 6.17c-.24.55-.78.91-1.38.91H11c-.17 0-.33-.04-.48-.1-.01-.01-.03-.02-.04-.04a.29.29 0 0 1-.03-.28l2.65-6.17c.24-.55.78-.91 1.38-.91H30.2c.13 0 .21.07.25.13.04.07.08.17.02.29z"/></svg>';
                break;

            case 'ch-sortable':
                    icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="'+w+'" height="'+h+'"><circle cx="5.5" cy="2.5" r="1.5"/><circle cx="10.5" cy="2.5" r="1.5"/><circle cx="10.5" cy="7.5" r="1.5"/><circle cx="5.5" cy="7.5" r="1.5"/><circle cx="5.5" cy="12.5" r="1.5"/><circle cx="10.5" cy="12.5" r="1.5"/></svg>';
                break;
 
            case 'input_x':
                    icon = '<svg viewBox="0 0 12 12" width="'+w+'" height="'+h+'"><polygon points="12 0.71 11.29 0 6 5.29 0.71 0 0 0.71 5.29 6 0 11.29 0.71 12 6 6.71 11.29 12 12 11.29 6.71 6 "/></svg>';
                break;
                
            case 'select_arrow':
                    icon ='<svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="'+w+'" height="'+h+'"><path d="M12 17.24c-.12 0-.24-.05-.34-.14L2.14 7.57a.465.465 0 0 1 0-.67c.19-.19.49-.19.67 0L12 16.09l9.19-9.19c.19-.19.49-.19.67 0 .19.19.19.49 0 .67l-9.52 9.52c-.1.1-.22.15-.34.15z" /></svg>';
                break;

            case 'radio_active':
                    icon = '<svg class="active" viewBox="0 0 18 18" width="'+w+'" height="'+h+'"><path d="M9 0C4.03 0 0 4.03 0 9c0 4.97 4.03 9 9 9s9-4.03 9-9C18 4.03 13.97 0 9 0zM9 17c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8C17 13.41 13.41 17 9 17z"/><circle cx="9" cy="9" r="6"/></svg>';
                break;

            case 'radio_default':
                    icon = '<svg viewBox="0 0 18 18" width="'+w+'" height="'+h+'"><path d="M9 0C4.03 0 0 4.03 0 9c0 4.97 4.03 9 9 9s9-4.03 9-9C18 4.03 13.97 0 9 0zM9 17c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8C17 13.41 13.41 17 9 17z"/></svg>';
                break;
            default:
                break;
        }

        if(wrap) {
            return '<span class="cl-icon ' + add_class + '">' + icon + '</span>';
        } else {
            return icon;
        }
    }

    var getEventObject = function(type,price,quantity,step,explan,lang,href) {
        var prod_position = {
            "LK" : 0,
            "BS" : 0,
            "BN" : 1,
            "SM" : 2
            },
            prod_type = {
                "LK" : $.lang[LANG]['pay.plan.LK.name'],
                "BS" : $.lang[LANG]['pay.plan.BS.name'],
                "BN" : $.lang[LANG]['pay.plan.BN.name'],
                "SM" : $.lang[LANG]['pay.plan.SM.name']
            },
            prod_brand = (lang == 'ko') ? '크리에이터링크' : 'creatorlink',
            prod_currency = (lang == 'ko') ? 'KRW' : 'USD',
            prod_action = '', prod_step = 1;

        if(explan.length == 0) {
            prod_action = '신규결제';
        } else if(explan == type) {
            prod_action = '요금제 연장';
        } else if((explan.length && type.length) && (explan != type)) {
            prod_action = '요금제 변경';
        }

        return {
            'name': prod_type[type],
            'price': price,
            'brand': prod_brand,
            'category': prod_action,
            'variant': quantity,
            'position': prod_position[type],
            'explan' : explan,
            'plan' : type,
            'step' : step,
            'currency' : prod_currency,
            'href' : href
        }
    }


    /* 동영상블럭 갤러리타입 **************************************/
    var getGalleryVideoType = function(val){
        var videoTypeArray = ['youtube','vimeo','soundcloud','youtu.be'],
            videoType = '';

        $.each(videoTypeArray,function(i,v){
            if(val.indexOf(v) > -1) {
                videoType = v;
            }
        });

        return videoType;
    }

    var getGalleryVideoData = function(videoUrl){
        var videoId = '',
            videoThumb = '',
            videoType = '',
            check_video = false;

        videoType = getGalleryVideoType(videoUrl);
        
        switch(videoType) {
            case 'youtube': case 'youtu.be' :
                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,
                    match = videoUrl.match(regExp);

                if(match && match[2].length === 11) {
                    var videoId = match[2],
                        videoThumb = '//img.youtube.com/vi/'+videoId+'/sddefault.jpg',
                        aType = "text/html",
                        src = '//www.youtube.com/embed/' + videoId;

                    check_video = true;
                    src = src.replace('watch?v=', 'v/');
                }
            
                break;

            case 'vimeo':    
                var regExp = /\/\/(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/,
                    match = videoUrl.match(regExp);

                if(match && match[3].length > 0) {
                    var videoId = match[3],
                        aType = "text/html",
                        src = '//player.vimeo.com/video/' + videoId;

                    $.getJSON('https://vimeo.com/api/v2/video/' + videoId + '.json', function(data) {
                        if(typeof data[0]['thumbnail_large'] != 'undefined') {
                            videoThumb = data[0]['thumbnail_large'];
                        }
                    });

                    check_video = true;
                }
                    

                break;

            case 'soundcloud':
                var videoId = '',
                    aType = "";

                videoUrl = (videoUrl.indexOf('https') > -1) ? videoUrl : 'https://'+videoUrl;

                $.getJSON('https://soundcloud.com/oembed?format=json&url=' + videoUrl, function(data) {
                    if(typeof data.html == 'undefined') {
                        alert('get Soundcloud API error');
                        return;
                    }
                    $video = $(data.html);              
                    src = $video.prop('src');
                    videoThumb = data.thumbnail_url;
                });
                
                check_video = true;

                break;
            default:
                
                break;
        }

        var videoData = {
            check_video : check_video,
            videoType : videoType,
            videoId : videoId,
            videoUrl : videoUrl,
            aType : aType,
            poster : videoThumb,
            iframe_src : src
        }
       
        return videoData; 
    }
    
    // $('.video-content > svg').live('click', function() {
    //     if($(this).parents('.el_viewblock').length>0) return false;
        
    //     $.loadingOn($(this).parents('.video-content')); 

    //     var vd_src = $(this).parents('.video-content').attr('data-url'),
    //         vd_height = $(this).parents('.video-content').css('height').replace('px',''),
    //         vd_data = getGalleryVideoData(vd_src),
    //         vd_mode = $(this).parents('.element').attr('data-mode'),
    //         vd_id = $(this).parents('.element').attr('data-id'),
    //         vd_mute = (vd_src.indexOf('vimeo')>-1) ? '&muted=1' : '&mute=1',
    //         vd_content_new = '<iframe class="video-iframe hide" height="'+vd_height+'" src="'+vd_data.iframe_src+'?wmode=transparent&amp;autoplay=1'+vd_mute+'" allow="autoplay""></iframe>';

    //     if(vd_mode!='zoom') {
    //         //if(isThumnailv_type) {
    //             $(this).parents('.video-content').append(vd_content_new);
    //             $(this).parents('.video-content').find('.ly-img').remove();
    //             $(this).remove();

    //             setTimeout(function(){
    //                 $('.video-iframe').removeClass('hide');
    //                 $('.dsgn-body').fitVids();
    //                 $.loadingOFF();

    //             },300);
    //         //}
    //     }   
    // });

    function setSnsJoinConvertScript(){
        var scriptStr = '\
            <script type="text/javascript" class="snsjoin_convert">\
                if(!wcs_add) var wcs_add={};\
                wcs_add["wa"]="s_48e853d9cc7e";\
                var _nasa={};\
                _nasa["cnv"] = wcs.cnv("2","1");\
                wcs_do(_nasa);\
                console.log("naver 전환");\
            </script>\
            <script type="text/javascript" class="snsjoin_convert">\
                kakaoPixel("6608645775572775786").pageView();\
                kakaoPixel("6608645775572775786").completeRegistration();\
                console.log("kakao 전환");\
            </script>\
            <script type="text/javascript" class="snsjoin_convert">\
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?\
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;\
                n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;\
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,\
                document,"script","https://connect.facebook.net/en_US/fbevents.js");\
                fbq("init", "256796588050321");\
                fbq("track", "PageView");\
                fbq("trac", "CompleteRegistration");\
                console.log("facebook 전환");\
            </script>\
            <script class="snsjoin_convert" async src="https://www.googletagmanager.com/gtag/js?id=UA-79996811-1"></script>\
            <script class="snsjoin_convert">\
                window.dataLayer = window.dataLayer || [];\
                function gtag(){dataLayer.push(arguments);}\
                gtag("js", new Date());\
                gtag("config", "UA-79996811-1");\
                gtag("event", "로그인/회원가입", {\
                "event_category": "Intro",\
                "event_label": "네이버 아이콘(회원가입)",\
                });\
            </script>\
        ';

        $('.snsjoin_convert').remove();
        $('body').append(scriptStr);
    }

    function kakaoLogin(ip) {

        Kakao.init('85677ffc26b1bca1130b866859031c06');
        Kakao.isInitialized();

        console.log("Kakao.isInitialized()", Kakao.isInitialized()); 
        Kakao.Auth.login({
            success: function (response) {
            //사용자 정보 가져오기
                Kakao.API.request({
                    url: '/v2/user/me', //계정 정보를 가져오는 request url
                    success: function (data) {
                        var user = data.kakao_account, //카카오 계정 정보
                            accessToken = Kakao.Auth.getAccessToken();  

                        Kakao.Auth.setAccessToken(accessToken);
                        
                        var checkObj = { userinfo:data, id:user.email, snsType:'kakao', ip:ip };
                        if(typeof $.cookie('land_join') != 'undefined' && $.cookie('land_join')) {
                            checkObj['land_join'] = $.cookie('land_join');
                            $.removeCookie('land_join', { path: '/' });
                        }
                        $.post('/template/snsloginCheck', checkObj, function(data){
                            if(data.login) { 
                                if(data.join) setSnsJoinConvertScript(); //sns 회원가입 전환 스크립트 

                                if (typeof data.url != 'undefined' && data.url) location.href = data.url;
                                else location.replace('/');
                                self.close();
                            } else {
                                alert(data.msg);
                                opener.location.reload();
                                self.close();
                            }
                        },'json');
                    },
                    fail: function (error) {
                        console.log('카카오톡과 연결이 완료되지 않았습니다.');
                    },
                })
            },
            fail: function (error) {
                console.log('카카오톡과 연결 실패하였습니다.');
            },
        })
    }

    function snsLogout() {
        Kakao.init('85677ffc26b1bca1130b866859031c06');
        Kakao.isInitialized();
        // console.log("Kakao.isInitialized()", Kakao.isInitialized()); 
        // console.log(Kakao.Auth.getAccessToken());

        if(Kakao.Auth.getAccessToken()) {
            Kakao.Auth.logout(function(){
                // console.log(Kakao.Auth.getAccessToken());
            });
        };


        window.fbAsyncInit = function() {
            FB.init({
                appId : '590704662264509', // [ creatorlink ] Facebook App
                // appId : '2410008645785619', // [ Creatorlink ] Facebook App (before)
                // appId : '398865637129551', // [ creatorlinkdev ] Facebook Test App
                status  : true,   //check login status
                cookie  : true,
                xfbml : true,
                version : 'v12.0'
            });

            FB.getLoginStatus(function(response) {
              if(response.status == 'connected') {
                FB.logout(function(response) {
                    FB.Auth.setAuthResponse(null, 'unknown');
                    console.log('logged out~');
                });
              }
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id; js.async = true;
            js.src = 'https://connect.facebook.net/en_KR/all.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


        location.href = '/member/login/out';
    }

    function disableScrolling(){
        var x=window.scrollX;
        var y=window.scrollY;
        window.onscroll=function(){window.scrollTo(x, y);};
    }
    function enableScrolling(){
        window.onscroll=function(){};
    }

    var hexToRgba = function(hex) {
        if (hex.lastIndexOf('#') > -1) {
            hex = hex.replace(/#/, '0x');
        } else {
            hex = '0x' + hex;
        }
        var r = hex >> 16;
        var g = (hex & 0x00FF00) >> 8;
        var b = hex & 0x0000FF;
        return rgb = { r : r, g : g, b : b};
    }

    var rgbaToOpacity = function(rgba) {
        if(typeof rgba == 'undefined') rgba = 'rgba(255,255,255,1)';
        //rgba = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+(\.\d{1,2}))[\s+]?/i);
        var r = [],
            rgba = rgba.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(',');

        r.r = rgba[0], r.g = rgba[1], r.b = rgba[2], r.a = rgba[3];
        return r;
    }

    var setGalleryProjectCss = function(parent,elcss) {
        var pr_css = CSSJSON.toJSON(elcss)['children'],
            galProjectCssStr = '',
            pr_settings = (typeof parent.settings != 'undefined' && parent.settings) ? $.parseJSON(parent.settings) : {},
            pr_gallery_colorSet = (typeof pr_settings.gallery_color != 'undefined' && pr_settings.gallery_color) ? pr_settings.gallery_color : '';

        $('body').find('.galProjectCss').remove();

        var isElview = ($('.elviewcss').length > 0) ? true : false;
        if(isElview) $('.elviewcss').after('<style class="galProjectCss"></style>');
        else $('#dsgn-body').after('<style class="galProjectCss"></style>');

        var body_selector = (isElview) ? 'body' : 'body > .dsgn-body';
        if(pr_css.hasOwnProperty('.'+parent.element+' .galProjectBg')) {
            pr_css = pr_css['.'+parent.element+' .galProjectBg']['attributes'];
            pr_Array = {};
            pr_Array = setGalleryProjectBgCss(body_selector,pr_css);

            galProjectCssStr += '\
                ' + body_selector + ' {\
                    background-color: '+pr_Array.pr_bgColor+';\
                    background-image: '+pr_Array.pr_bgImage+';\
                    background-position: '+pr_Array.pr_bgPosition+';\
                    background-repeat: '+pr_Array.pr_bgRepeat+';\
                    background-size: '+pr_Array.pr_bgSize+';\
                    height:auto;\
                    /*overflow: auto;\
                    overflow-x: hidden;*/\
                }\
            ';
        }

        if(pr_gallery_colorSet) {
            var pr_rgba = hexToRgba(pr_gallery_colorSet);
            $(body_selector).attr('data-gcolor',pr_gallery_colorSet);
            galProjectCssStr +=     body_selector + '[data-gcolor="'+pr_gallery_colorSet+'"] .element .p_nsvg .btn-box .active svg,\n\ ' + body_selector + '[data-gcolor="'+pr_gallery_colorSet+'"] .element .data-page-back,\n\
                                ' + body_selector + '[data-gcolor="'+pr_gallery_colorSet+'"] .element .data-page-back svg, ' + body_selector + '[data-gcolor="'+pr_gallery_colorSet+'"] .element .data-page-back span,\n\
                                ' + body_selector + '[data-gcolor="'+pr_gallery_colorSet+'"] .element .btn-box .active, ' + body_selector + '[data-gcolor="'+pr_gallery_colorSet+'"] .element .btn-box .active .btn-nav {\n\ fill: rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',1);\n\ color: rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',1);\n\}\n\
                                ' + body_selector + '[data-gcolor="'+pr_gallery_colorSet+'"] .element .btn-box svg,\n\
                                ' + body_selector + '[data-gcolor="'+pr_gallery_colorSet+'"] .element .btn-box .btn-nav-svg,\n\
                                ' + body_selector + '[data-gcolor="'+pr_gallery_colorSet+'"] .element .btn-box .btn-nav {\n\ fill: rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.4);\n\ color: rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.4);\n\ }\n';
        } 

        $('.galProjectCss').append(galProjectCssStr);
    }

    var setGalleryProjectBgCss = function(pr_selector,pr_css){
        var dsgnBody_bgColor = (typeof $(pr_selector).css('background-color')!='undefined') ? $(pr_selector).css('background-color') : '',
            dsgnBody_bgImage = (typeof $(pr_selector).css('background-image')!='undefined') ? $(pr_selector).css('background-image') : '',
            dsgnBody_bgPosition = (typeof $(pr_selector).css('background-position')!='undefined') ? $(pr_selector).css('background-position') : '',
            dsgnBody_bgRepeat = (typeof $(pr_selector).css('background-repeat')!='undefined') ? $(pr_selector).css('background-repeat') : '',
            dsgnBody_bgSize = (typeof $(pr_selector).css('background-size')!='undefined') ? $(pr_selector).css('background-size') : '',
            pr_Array = {};

        pr_Array = {
            pr_bgColor : (typeof pr_css['background-color']!='undefined') ? pr_css['background-color'] : '',
            pr_bgImage : (typeof pr_css['background-image']!='undefined') ? pr_css['background-image'] : ((typeof pr_css['background-color']!='undefined' && pr_css['background-color']) ? 'none' : ''),
            pr_bgPosition : (typeof pr_css['background-position']!='undefined') ? pr_css['background-position'] : '',
            pr_bgRepeat : (typeof pr_css['background-repeat']!='undefined') ? pr_css['background-repeat'] : '',
            pr_bgSize : (typeof pr_css['background-size']!='undefined') ? pr_css['background-size'] : '',
        }

        if(pr_Array.pr_bgColor=='transparent' && pr_Array.pr_bgImage=='none') {
            pr_Array['pr_bgColor'] = dsgnBody_bgColor;
            pr_Array['pr_bgImage'] = dsgnBody_bgImage;
            pr_Array['pr_bgPosition'] = dsgnBody_bgPosition;
            pr_Array['pr_bgRepeat'] = dsgnBody_bgRepeat;
            pr_Array['pr_bgSize'] = dsgnBody_bgSize;                    
        } 

        return pr_Array;
    }

    var onlyUnique = function(value, index, self) {
      return self.indexOf(value) === index;
    }
    
    var arrayDuplicates = function(arr) {
        var duplicates = {};
        for (var i = 0; i < arr.length; i++) {
            if(duplicates.hasOwnProperty(arr[i])) {
                duplicates[arr[i]].push(i);
            } else if (arr.lastIndexOf(arr[i]) !== i) {
                duplicates[arr[i]] = [i];
            }
        }

        return duplicates;
    }

    var arrayLastItem = function(arr) {
        if(Array.isArray(arr))
            return arr.pop();
        else return "";
    }

    var getLang = function(selectorTag,SID) {
        var ch_lang = '';
        if(typeof selectorTag.attr('data-blocklang')!='undefined') {ch_lang = selectorTag.attr('data-blocklang');}
        else {
            if($('.menu-'+SID+' .siteLANG').length>0) 
                ch_lang = ($('.menu-'+SID+' .siteLANG').find('li.active a').attr('data-code')=='ko') ? 'ko' : 'en';
            else ch_lang = LANG;
        }

        return ch_lang;
    }

    function templateModeChange(e) {
        $('.template-mode').removeClass('active');
        $(e).addClass('active');
        $('#template-site .modal-dialog .modal-content').find('.load-template').css('display','block');
        $.processON();

        // var widthSize = ($(e).attr('class').indexOf('desktop') > -1) ? '100%' : '100%';
        // widthSize = ($(e).attr('class').indexOf('tablet') > -1) ? ($(e).attr('class').indexOf('mobile') > -1 ? '360px' : '770px') : widthSize;

        var widthSize = '';
        if($(e).attr('class').indexOf('desktop') > -1) widthSize = '100%';
        else if($(e).attr('class').indexOf('tablet') > -1) widthSize = '770px';
        else  widthSize = '360px';

        $('#template-site .modal-dialog .modal-content').css({
            'max-width' : 'unset',
            'width' : widthSize
        });
        setTimeout(function(){          
            $.processOFF();     
            $('#template-site .modal-dialog .modal-content').find('.load-template').fadeOut(200);
        },650);
    }

    function templateModeDefault(width){    
        var widthSize = '';
        
        if(width>=1200) {
            widthSize = '100%';
        } else if(width <= 1199 && width >= 768) {
            widthSize = '770px';
        } else if(width<=767){
            widthSize = '360px';
        }

        $('#template-site .modal-dialog .modal-content').css({
            'max-width' : 'unset',
            'width' : widthSize
        });
        
    }

    // 인증창 호출 함수
    function auth_type_check(outside) {
        if(typeof outside === 'undefined' || !outside) outside = false;

        var auth_form = document.form_auth;

        if( auth_form.ordr_idxx.value == "" ) {
            alert( "요청번호는 필수 입니다." );
            return false;
        } else {
            var hostAry = window.location.hostname.split('.'),
                checkDomain = (hostAry[1] != 'creatorlink' && hostAry[1] != 'addblock') ? true : false;
            
            if(checkDomain && window.location.protocol=='http:') {
                alert($.lang[LANG]['manager.cert.disable.domain']);
                return false
            }

            if( ( navigator.userAgent.indexOf("Android") > - 1 || navigator.userAgent.indexOf("iPhone") > - 1 ) == false ) { // 스마트폰이 아닌경우
                var return_gubun;
                var width  = 410;
                var height = 500;

                var leftpos = screen.width  / 2 - ( width  / 2 );
                var toppos  = screen.height / 2 - ( height / 2 );

                var winopts  = "width=" + width   + ", height=" + height + ", toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no";
                var position = ",left=" + leftpos + ", top="    + toppos;
                var AUTH_POP = window.open('','auth_popup', winopts + position);
            }
            
            auth_form.method = "post";
            auth_form.target = "auth_popup"; // !!주의 고정값 ( 리턴받을때 사용되는 타겟명입니다.)
            auth_form.action = "/cert_req"; // 인증창 호출 및 결과값 리턴 페이지 주소
            
            if(outside) {
                auth_form.submit();
                return false;
            } else {
                return true;
            }
        }
    }

    // 요청번호 생성 예제 ( up_hash 생성시 필요 ) 
    function init_orderid() {
        var today = new Date();
        var year  = today.getFullYear();
        var month = today.getMonth()+ 1;
        var date  = today.getDate();
        var time  = today.getTime();

        if(parseInt(month) < 10){
            month = "0" + month;
        }

        var vOrderID = year + "" + month + "" + date + "" + time;

        if(document.form_auth !== undefined) {
            document.form_auth.ordr_idxx.value = vOrderID;
        }  

        return vOrderID;
    }
    
    // 인증창 종료후 인증데이터 리턴 함수
    function auth_data( frm ) {
        var auth_form     = document.form_auth;
        // var nField        = frm.elements.length;
        // var response_data = "";

        // // up_hash 검증 
        if( frm.up_hash != auth_form.veri_up_hash.value )
        {
            alert("up_hash 변조 위험있음");    
        }
        /* 리턴 값 모두 찍어보기 (테스트 시에만 사용) */
        // var form_value = "";

        // for ( i = 0 ; i < frm.length ; i++ )
        // {
        //     form_value += "["+frm.elements[i].name + "] = [" + frm.elements[i].value + "]\n";
        // }
        // console.log(form_value);
        if(frm.res_cd == '0000' && frm.birth_day !== undefined) {
            var yyyy = frm.birth_day.substr(0, 4);
            var mm = frm.birth_day.substr(4, 2);
            var dd = frm.birth_day.substr(6, 2);
        }
        
        switch(frm.start_page) {
            case 'register':
            case 'myinfo':
                if( frm.res_cd == '0000' ) {
                    $('button.btn-cert').text($.lang[LANG]['siteum.regexp.complete.cert']).prop('disabled', true);
                    if(frm.start_page == 'register') loadRegisterField();
                } else {
                    if(frm.res_cd == 'exist') {
                        var error_title = '';
                        var error_msg = '';
                        var find_btn = $.lang[LANG]['siteum.forgot.id.link'];
                        if(frm.um_id != '') {
                            if(frm.start_page == 'register') {
                                error_title = $.lang[LANG]['siteum.cert.already.registered'];
                                error_msg = $.lang[LANG]['siteum.cert.already.registered.txt']+'<div class="user-id">'+frm.um_id+'</div>';
                            } else {
                                error_title = $.lang[LANG]['siteum.cert.already.cert'];
                                error_msg = $.lang[LANG]['siteum.cert.already.cert.txt']+'<div class="user-id">'+frm.um_id+'</div>';
                            }
                            
                            find_btn = $.lang[LANG]['siteum.forgot.pw.link'];
                        }
                        $(this).showModalFlat(error_title, error_msg, true, true, function() {
                            $.getJSON('/umember/login/out', function(r) {
                                if(frm.start_page == 'myinfo') {
                                    if($.cookie('cert_popup') !== undefined) {
                                        $.removeCookie('cert_popup', true, { path: '/', expires: 12 * 60 * 60 * 1000 });
                                    }
                                }
                                location.href = '/_login';
                            },'json');  
                        }, 'close', $.lang[LANG]['siteum.cert.login'], 'modal-dialog cl-cmmodal cl-s-btn w560 cl-p70 cl-modal cl-close-btn user-exist-modal', '');
                    } else if(frm.res_cd == 'not_adult') {
                        $(this).showModalFlat($.lang[LANG]['siteum.cert.adult.cannot.complete'], $.lang[LANG]['siteum.cert.adult.cannot.complete.txt'], true, true, '', $.lang[LANG]['config.close'], '', 'modal-dialog cl-cmmodal cl-s-btn w560 cl-p70 cl-modal cl-close-btn');
                    }
                
                    return false;
                }
                var sid = frm.sid;
                var gender = (frm.sex_code !== undefined && frm.sex_code)? ((frm.sex_code == '01')? '남':'여') : '';
                $('#input-name').val(frm.user_name).addClass('has-value');
                $('#input-birth').val(yyyy+'-'+mm+'-'+dd).addClass('has-value');
                $('#input-tel').val(frm.phone_no).addClass('has-value');
                $('#input-gender').val(frm.sex_code).addClass('has-value');
                $('.certified-info .input-name').text(frm.user_name);
                $('.certified-info .input-birth').text(yyyy+'. '+mm+'. '+dd+'.');
                $('.certified-info .input-tel').text(frm.phone_no.replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3'));
                $('.certified-info .input-gender').text(gender);
                $('#is_cert').val('Y');
                $('#up_hash').val(frm.up_hash);
                $('#ci_url').val(frm.ci_url);
                $('#di_url').val(frm.di_url);
                $('.cl-s-register-btn').removeClass('hide');
                $('.cl-s-cert').addClass('hide');
                if(frm.start_page == 'myinfo') {
                    var formData = $("form[name='myinfo_form']").serializeObject();
                    $.ajax({
                        url: '/_myinfo_proc',
                        data: { sid:sid, data:JSON.stringify(formData) },
                        dataType: 'json',
                        type: 'POST',
                        async: false,
                        cache: false,
                        success: function (data) {
                            console.log(data);
                            location.reload();
                        }
                    });
                }
                break;
            case 'find_id':
                if( frm.res_cd == '0000' ) {
                    $('.cl-s-forgot-box').addClass('hide');
                    $('.forgot-result').removeClass('hide');
                    $('.forgot-result .user-id').text(frm.um_id);
                } else {
                    $(this).showModalFlat($.lang[LANG]['siteum.forgot.id.invalid'], $.lang[LANG]['siteum.forgot.id.invalid.txt'], true, true, function() {
                        location.href = '/_register';
                    }, 'close', $.lang[LANG]['siteum.forgot.id.register'], 'modal-dialog cl-cmmodal cl-s-btn w560 cl-p70 cl-modal cl-close-btn', '');
                    return false;
                }
                break;
            case 'sitelock':
                break;
        }
    }

    var iconShowHide = function(){
        var body_w = $('body').width();
        $('.template-mode').removeClass('active');
        if(body_w>=1200) {
            $('.template-desktop, .template-tablet, .template-mobile').show();
            $('.template-desktop').addClass('active');
        } else if(body_w <= 1199 && body_w >= 768) {
            $('.template-desktop').hide();
            $('.template-tablet, .template-mobile').show();
            $('.template-tablet').addClass('active');
        } else if(body_w<=767){
            $('.template-desktop, .template-tablet').hide();
            $('.template-mobile').show().addClass('active');
        }
    }

    var checkOS = function() {
        var os, ua = navigator.userAgent;
        if (ua.match(/Win(dows )?NT 6\.0/)) {
            os = "Windows Vista";
        } else if (ua.match(/Win(dows )?(NT 5\.1|XP)/)) {
            os = "Windows XP";
        } else {
            if ((ua.indexOf("Windows NT 5.1") != -1) || (ua.indexOf("Windows XP") != -1)) {
                os = "Windows XP";
            } else if ((ua.indexOf("Windows NT 7.0") != -1) || (ua.indexOf("Windows NT 6.1") != -1)) {
                os = "Windows 7";
            } else if ((ua.indexOf("Windows NT 8.0") != -1) || (ua.indexOf("Windows NT 6.2") != -1)) {
                os = "Windows 8";
            } else if ((ua.indexOf("Windows NT 8.1") != -1) || (ua.indexOf("Windows NT 6.3") != -1)) {
                os = "Windows 8.1";
            } else if ((ua.indexOf("Windows NT 10.0") != -1) || (ua.indexOf("Windows NT 6.4") != -1)) {
                os = "Windows 10";
            } else if ((ua.indexOf("iPad") != -1) || (ua.indexOf("iPhone") != -1) || (ua.indexOf("iPod") != -1)) {
                os = "Apple iOS";
            } else if (ua.indexOf("Android") != -1) {
                os = "Android OS";
            } else if (ua.match(/Win(dows )?NT( 4\.0)?/)) {
                os = "Windows NT";
            } else if (ua.match(/Mac|PPC/)) {
                os = "Mac OS";
            } else if (ua.match(/Linux/)) {
                os = "Linux";
            } else if (ua.match(/(Free|Net|Open)BSD/)) {
                os = RegExp.$1 + "BSD";
            } else if (ua.match(/SunOS/)) {
                os = "Solaris";
            }
        }
        if (os.indexOf("Windows") != -1) {
            if (navigator.userAgent.indexOf('WOW64') > -1 || navigator.userAgent.indexOf('Win64') > -1) {
                os += ' 64bit';
            } else {
                os += ' 32bit';
            }
        }
        return os;
    }

    var checkBrowser = function() {
        var agt = navigator.userAgent.toLowerCase(); 
        if (agt.indexOf("chrome") != -1) return 'Chrome'; 
        if (agt.indexOf("opera") != -1) return 'Opera'; 
        if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
        if (agt.indexOf("webtv") != -1) return 'WebTV'; 
        if (agt.indexOf("beonex") != -1) return 'Beonex'; 
        if (agt.indexOf("chimera") != -1) return 'Chimera'; 
        if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
        if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
        if (agt.indexOf("firefox") != -1) return 'Firefox'; 
        if (agt.indexOf("safari") != -1) return 'Safari'; 
        if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
        if (agt.indexOf("netscape") != -1) return 'Netscape'; 
        if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla'; 
        if (agt.indexOf("msie") != -1) { 
            let rv = -1; 
            if (navigator.appName == 'Microsoft Internet Explorer') { 
                let ua = navigator.userAgent; var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})"); 
            if (re.exec(ua) != null) 
                rv = parseFloat(RegExp.$1); 
            } 
            return 'Internet Explorer '+rv; 
        } 
    }

    /**************************************************************************************** Change Profile */
    $('.change-profile, .profile_left').live('click',function(e) {
        if($('script[src="/js/jquery.fileupload.js"]').length==0) $('head').append('<script type="text/javascript" src="/js/jquery.fileupload.js"></script>');
        
        var name = ($(this).attr('class').indexOf('change-profile') > -1) ? $('.site-username').attr('data-user-name') : $('.profile_left').find('.m-profile').text().trim(),
            img = ($(this).attr('class').indexOf('change-profile') > -1) ? $('svg.change-profile').attr('data-user-img') : $('label.m-profile').attr('data-user-img'),
            paid = ($(this).attr('class').indexOf('change-profile') > -1) ? $('svg.change-profile').attr('data-user-plan') : $('label.m-profile').attr('data-user-plan'),
            check_um = ($(this).attr('class').indexOf('change-profile') > -1) ? $('svg.change-profile').attr('data-user-um') : $('label.m-profile').attr('data-user-um');
        if(check_um=='um-profile') {
            //var mypageModal = $.umember.showMypageModal('<?=$mb["sid"]?>');
            var url = '/_myinfo';
            location.href = url;
        } else if(paid == 'true') {
            img = (typeof img == 'undefined' || img == '') ? 'https://storage.googleapis.com/i.addblock.net/member/profile_default.jpg' : img + '?_' +new Date().getTime();
            var str = '\
                <div class="dashboard-profile">\
                    <div class="dashboard-userimg dashboard-user-wrap">\
                        <svg viewBox="0 0 110 110" >\
                            <pattern id="dashboard-image-popup" patternUnits="userSpaceOnUse" width="120" height="120">\
                                <image xlink:href="' + img + '" x="0" width="110" height="110" />\
                            </pattern>\
                            <circle cx="55" cy="56" r="54" fill="url(#dashboard-image-popup)" stroke="#eeeff0"></circle>\
                        </svg>\
                    </div>\
                    <span class="fileinput-button profile-text-box">\
                        <label for="siteProfilefileupload">'+$.lang[LANG]['siteum.mypage.change.image']+'</label>\
                        <input id="siteProfilefileupload" class="modal-upload-button site-profile-upload-btn" type="file" name="files[]">\
                    </span>\
                    <p class="p-text">'+$.lang[LANG]['dash.siteprofile.modal.nickname']+$.lang[LANG]['account.modal.edit-image.size']+'</p>\
                    <div class="section-username">\
                        <div class="input-group cl-common-form-wrap mypage-cl-form-wrap">\
                            <div class="cl-common-form-group cl-userNick-wrap">\
                                <input type="text" class="input-userNickname" name="usernick_name" required="required"  value="' + name + '">\
                                <label for="input" id="username-label" class="cl-common-control-label change-username-label">'+$.lang[LANG]['account.modal.edit-image.nickname']+'</label>\
                            </div>\
                        </div>\
                        <p class="siteprofileImg_notice"><span class="profilenotice_icon">※</span><span class="profilenotice_txt">'+$.lang[LANG]['dash.siteprofile.modal.nickname.notice']+'</span</p>\
                    </div>\
                    <ul class="hide uploadfiles"></ul>\
                </div>\
            ';

            if($(this).hasClass('profile_left')) $('.m-header_user.menu, .btn-box.m-headerClose.in ').css('zIndex','1010');

            var modal = $(this).showModalFlat($.lang[LANG]['dash.siteprofile.modal.title'],str,true,true,function(){
                var modal_id = $(this).closest('.modal').attr('id'),
                    $nick = $('.input-userNickname'),
                    org = $('.site-username').attr('data-user-name'),
                    sid = SID,
                    settings = {  
                        site_nick  : $nick.val().trim()
                    },
                    special_pattern = /[~!@\#$%<>^&*\()\-=+_\’'"]/gi,
                    uploadimg = $('#dashboard-image-popup1 image').attr('xlink:href'),
                    nouploadimg = $('#dashboard-image-top image').attr('xlink:href'),
                    profileimg = ($('label.change-profile').hasClass('um-profile')) ? 'profileimg_um' : 'profileimg_site';

                if($('#dashboard-image-popup1').length > 0) {
                    $.post('/template/resource/upload-saveprofile', { uploadimg : uploadimg, profileimg : profileimg }, function(data){
                        if(typeof data.error != "undefined" && data.error) {
                            $(this).showModalFlat('ERROR',data.error,true,false,'','ok');
                            return false;
                        }
                        $('svg.change-profile').attr('data-user-img',uploadimg);
                        $('label.m-profile').attr('data-user-img',uploadimg);
                        $('#dashboard-image-top image').attr('xlink:href',uploadimg);
                        $('#m-dashboard-image-top image').attr('xlink:href',uploadimg);

                        modal.modal('hide');
                    }, 'json');
                }                

                $nick.removeClass('has-error');
                if(!$nick.val().trim()) {
                    $nick.addClass('has-error');
                    alert($.lang[LANG]['dashbord.settings.info.site-nick.edit-info']);
                    return false;
                } else if($nick.val().trim() == org) {
                    modal.modal('hide');
                    return false;
                } else if(checkEmojis($nick.val().trim())) {
                    errorEmojisModal();
                    return false;
                }

                if((special_pattern.test($nick.val().trim()) == true)) {
                    alert($.lang[LANG]['dashbord.settings.info.site-nick.edit-spec']);
                    return false;
                }
                
                $.post('/template/settings', { 
                    'sid' : sid,
                    'settings' : JSON.stringify(settings),
                    'el' : ''
                }, function(data) {
                    if(typeof data.error != 'undefined' && data.error) {
                        $nick.addClass('has-error');
                        alert(data.error);
                        return false;
                    }

                    $('.m-text-size').text(data.data.site_nick).attr('data-user-name',data.data.site_nick);
                    $('.site-username').attr('data-user-name',data.data.site_nick);
                    $('.mb-nickname').text(data.data.site_nick);
                    $('#register-nickname input.edit-input').attr('value',data.data.site_nick);

                    $('.cl-changePro-modal ul.uploadfiles').empty();
                    modal.modal('hide');
                },'json');
            },'cancel','config.change','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0 cl-changePro-modal','',function(){
                //console.log('showCallback-cancel');
                var imgfile = $('.cl-changePro-modal .uploadfiles li').attr('data-source'),
                    files = [];

                $('.cl-changePro-modal .uploadfiles li').each(function(){
                    files.push($(this).attr('data-source'));
                });

                $('.cl-changePro-modal .uploadfiles').empty();
                if($('#dashboard-image-popup1').length > 0) {
                    $.processON($.lang[LANG]['dash.siteprofile.modal.deleteimg']);
                    $.ajax({
                        type: 'POST',
                        url: '/template/resource/delete-gcloud',
                        data: { s: files },
                        dataType: 'json',
                        async: true,
                        success: function(data) {
                            if(typeof data.error != "undefined" && data.error) {
                                $(this).showModalFlat('ERROR',data.error,true,false,'','ok');
                                return false;
                            }
                            $.processOFF();
                        }
                    });
                }
            }, function(){
                $(document).on('click','.site-profile-upload-btn', function() {
                    $(this).fileupload({
                        url: '/template/resource/upload-myimage-file',
                        dataType: 'json',
                        async: true,
                        pasteZone: null,
                        add: function(e,data) {
                            $('#loading').css('left','-100%');
                            $.processON();
                            data.submit();
                        },
                        done: function (e, data) {
                            if(typeof data.result.error != 'undefined' && data.result.error) {
                                alert(data.result.error);
                                $('.progress .progress-bar').css('width','0%');
                                $.processOFF();
                                return;
                            }

                            if(data.result.src) {
                                var src1 = '<svg viewBox="0 0 110 110" ><pattern id="dashboard-image-popup1" patternUnits="userSpaceOnUse" width="120" height="120"><image xlink:href="' + data.result.src + '" x="0" width="110" height="110"></image></pattern><circle cx="55" cy="56" r="54" fill="url(#dashboard-image-popup1)" stroke="#eeeff0"></circle></svg>\
                                    ',
                                    src2 = '<svg viewBox="0 0 110 110" ><pattern id="dashboard-image-popup2" patternUnits="userSpaceOnUse" width="120" height="120"><image xlink:href="' + data.result.src + '" x="0" width="110" height="110"></image></pattern><circle cx="55" cy="56" r="54" fill="url(#dashboard-image-popup2)" stroke="#eeeff0"></circle></svg>\
                                        ',
                                    read_upload_file = '<li data-source="' + data.result.file_name + '"><img src="' + data.result.src + '"></li>';

                                $('.dashboard-userimg').html(src1);
                                $('.cl-changePro-modal ul.uploadfiles').append(read_upload_file);
                                //$('label.change-profile').html(src2).attr('data-user-img',data.result.src);
                                //$('.dashboard-userimg').attr('data-imgsave',data.result.path+'/'+data.result.raw_name);

                            }
                            $.processOFF();
                            $('#loading').css('left','50%');
                        },
                        progressall: function (e, data) {
                            var progress = parseInt(data.loaded / data.total * 100, 10);
                            $('.progress .progress-bar').css(
                                'width',
                                progress + '%'
                            );

                        },
                    }).prop('disabled', !$.support.fileInput)
                        .parent().addClass($.support.fileInput ? undefined : 'disabled');
                });
            },function(){
                $('.m-header_user.menu, .btn-box.m-headerClose.in ').css('zIndex','');
            });
        } else {
            siteNotice('nickname');
        }
    });
/***********************************************************************************************************************************************/
    
    var setLayoutHeight = function(el) {
        if(el == 'el-menu' || el == 'el-footer') return false;
         
        var block_selector = (typeof el != 'undefined' && el == 'el_display') ? '#element-display' : '.element[data-layout]'; 
        $(block_selector).each(function() {
            if($(this).attr('data-mode') == 'thumb') return;

            var lyh = (typeof $(this).find('.lyoption').attr('data-lyh') != 'undefined') ? $(this).find('.lyoption').attr('data-lyh') : 0.6;
            if(typeof lyh == 'undefined' || lyh == 'auto') { return; }

            var el = $(this).find('.layout-grid').eq(0),
                //bl_w = Math.round(parseFloat(el[0].getBoundingClientRect().width)),
                bl_w = Math.round(parseFloat(el[0].offsetWidth)),
                bl_pl = (el.css('padding-left')) ? Math.round(parseFloat(el.css('padding-left').replace(/[^0-9]/g,''))) : 15,
                bl_pr = (el.css('padding-right')) ? Math.round(parseFloat(el.css('padding-right').replace(/[^0-9]/g,''))) : 15,
                bl_w_pd = bl_w - (bl_pl+bl_pr),
                bl_ly_height = Math.round(bl_w_pd * parseFloat(lyh));

            $(this).find('.row .video-content').css('height',bl_ly_height + 'px');
            $(this).find('.ly-img').css('height',bl_ly_height + 'px');
            if($(this).attr('data-mode')=='thumb' && $(this).attr('data-playtype')=='true') $(this).find('iframe').css('height',bl_ly_height+'px');
            
            var bl_svg_val = (bl_w_pd < 233) ? Math.round(parseFloat(bl_w_pd * 0.25)) : 58;
            $(this).find('.playbtn').attr('width',bl_svg_val)
                                    .attr('height',bl_svg_val);

            $(this).css('overflow','hidden');

        });

    }

    var getLayoutData = function(tag) {
        var tag_ly_arr = [],
            tag_pd = (typeof tag.find('.lyoption').attr('data-lypd') != 'undefined' && tag.find('.lyoption').attr('data-lypd')) ? tag.find('.lyoption').attr('data-lypd') : '15',
            tag_pc = (typeof tag.find('.lyoption').attr('data-lycol') != 'undefined' && tag.find('.lyoption').attr('data-lycol')) ? tag.find('.lyoption').attr('data-lycol') : '4',
            tag_t = (typeof tag.find('.lyoption').attr('data-lycol-t') != 'undefined' && tag.find('.lyoption').attr('data-lycol-t')) ? tag.find('.lyoption').attr('data-lycol-t') : '2',
            tag_m = (typeof tag.find('.lyoption').attr('data-lycol-m') != 'undefined' && tag.find('.lyoption').attr('data-lycol-m')) ? tag.find('.lyoption').attr('data-lycol-m') : '2',
            tag_lyw = (typeof tag.find('.lyoption').attr('data-lyw') != 'undefined' && tag.find('.lyoption').attr('data-lyw')) ? tag.find('.lyoption').attr('data-lyw') : (tag_pc=='1' ? '100' : 'auto'),
            tag_lyh = (typeof tag.find('.lyoption').attr('data-lyh') != 'undefined' && tag.find('.lyoption').attr('data-lyh')) ? tag.find('.lyoption').attr('data-lyh') : '0.6',
            tag_orgw = (typeof tag.find('.lyoption').attr('data-org-width') != 'undefined' && tag.find('.lyoption').attr('data-org-width')) ? tag.find('.lyoption').attr('data-org-width') : '' 

        var bl_cont = tag.find('.container'),
            bl_cont_w = parseFloat(bl_cont[0].offsetWidth),
            layout_grid = $('.'+selectEL).find('.layout-grid').eq(0),
            bl_w = parseFloat(layout_grid[0].offsetWidth),
            bl_pl = (layout_grid.css('padding-left')) ? parseFloat(layout_grid.css('padding-left').replace(/[^0-9]/g,'')) : 15,
            bl_pr = (layout_grid.css('padding-right')) ? parseFloat(layout_grid.css('padding-right').replace(/[^0-9]/g,'')) : 15,
            bl_lyw = (tag_pc=='1') ? Number(tag_lyw) : '',
            bl_lyw_dot = (tag_pc=='1') ? bl_lyw / 100 : '',
            bl_cont_w_re = (tag_pc=='1') ? (bl_cont_w - (bl_pl+bl_pr)) * bl_lyw_dot : '';

        tag_ly_arr['pc'] = tag_pc;
        tag_ly_arr['t'] = tag_t;
        tag_ly_arr['m'] = tag_m;
        tag_ly_arr['lyw'] = tag_lyw;
        tag_ly_arr['pd'] = tag_pd;
        tag_ly_arr['lyh'] = tag_lyh;
        tag_ly_arr['bl_cont_w'] = bl_cont_w;
        tag_ly_arr['bl_w'] = bl_w;
        tag_ly_arr['bl_pl'] = bl_pl;
        tag_ly_arr['bl_pr'] = bl_pr;
        tag_ly_arr['bl_lyw_dot'] = bl_lyw_dot;
        tag_ly_arr['bl_cont_w_re'] = bl_cont_w_re;

        return tag_ly_arr;
    }

}
