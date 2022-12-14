(function($) {

	var uniqID = function() {
		return Math.round(new Date().getTime() + (Math.random() * 100));
	}

	var blWrap = function(parentID,checkGalProject,checkForumPage) {
        var menu_lock = (PAGE_MODE == 'c') ? '' : property.ISLOCK,
            bl_class = (typeof menu_lock != 'undefined' && menu_lock == 'true') ? 'hide ' : '';

		var id = uniqID(),
			checkForumPage = (checkForumPage) ? checkForumPage : '',
			colorSet = (checkForumPage=='forum') ? 'colorSet' : '',
			checkGalProject = (checkGalProject) ? checkGalProject : '',
			$str = $('<div class="page-bottomlist ' + bl_class + colorSet + ' ' + checkGalProject + '" data-pid="' + parentID + '"></div>');

		$str.css({
			'text-align' : 'center',
			'font-size' : '20px',
			'background-image' : 'url(https://storage.googleapis.com/i.addblock.net/preloader2.gif)',
			'background-position' : 'center center',
			'background-repeat' : 'no-repeat',
			'min-height' : '50px'
		});
		return {
			id : id,
			tpl : $str
		}
	}

	var blGalleryData = function(page) {
	    var r;	    
	    $.ajax({
	        url: '/template/gallery/bl_data/view/' + blVIEW,
	        data: { mode: blMODE, page: page, gacte_home: blPARENT['gcate_home'] },
	        dataType: 'json',
	        type: 'POST',
	        async: false,
            cache: false,
	        success : function(data) {
	            checkError(data);
	            r = data;
	        }
	    },'json');
	    return r;
	}

	var blGalleryItemEmpty = function() {
		var str = '\
            <div class="blitem gallery-item sample-item" data-seq="-1" data-index="-1">\
				<div class="col-xs-3 col-sm-3 col-md-3">\
					<div class="center-block"><img src="//storage.googleapis.com/i.addblock.net/blitem_empty_img.png" alt="" class="img-responsive"/></div>\
				</div>\
			</div>\
			';

		return str;
	}
	var blGalleryItem = function(idx,obj) {
		// console.log(obj.image);
		var gsettings = (typeof obj.gsettings != 'undefined' && obj.gsettings) ? $.parseJSON(obj.gsettings) : {},
			imgPATH = (typeof gsettings.storage != 'undefined' && gsettings.storage) ? gsettings.storage : RPATH,
			s = ((obj.image).indexOf('[{') > -1 ) ? $.parseJSON(obj.image) : obj.image,
			src = (typeof s[0]['file'] != 'undefined') ? getServeImage(s[0]['file'],"600",imgPATH) : getServeImage(obj.image,"600",imgPATH),
			img_src = (typeof gsettings.storage != 'undefined' && gsettings.storage) ? gsettings.storage + '600/' + obj.image : RPATH + '600/' + obj.image,
			g_url = (blMODE == 'config' || blMODE == 'demo') ? '/'+CONFIG_URL+'config/page' : property.URL,
			g_link = obj.page + '/view/' + obj.seq,
			g_link_option = '',
			blitem_active = (blVIEW == obj.seq) ? ' active' : '';

		if(typeof gsettings['glink'] != 'undefined' && gsettings['glink']) {
			var g_link = (checkBase64Encode(gsettings['glink'])) ? Base64.decode(gsettings['glink']) : gsettings['glink'],
				g_link_target = gsettings['glink_target'],
				glink_val = (g_link) ? makeLinkUrl(g_link, ONE, blVIEW) : '',
				menu_list = (typeof MENULIST != 'undefined') ? MENULIST : property.MENULIST;
				
			if(menu_list.indexOf(g_link.replace(/ /g,'-'))>-1) {
				g_link_option = 'data-user-link="' + glink_val + '"';
				g_link = glink_val;
			} else if(g_link.match(/^\@/g)) {
				g_link_option = 'attr-bookmark="' + g_link.replace(/^\@/g,'') + '"';
			} else {
				g_link_option = 'attr-link="' + g_link + '"';
			}

            if(g_link_target.length > 0 ) g_link_option += ' target="' + g_link_target + '"';

		} else {
			g_link = (g_url == '/') ? g_url + g_link : g_url + '/' + g_link;
		}

		var str = '\
            <div class="blitem gallery-item'+blitem_active+'" data-seq="'+obj.seq+'" data-index="'+idx+'">\
				<div class="col-xs-3 col-sm-3 col-md-3">\
					<a href="'+g_link+'" '+ g_link_option + '>\
						<img src="'+src+'" class="img-responsive center-block">\
						<div class="over-wrap"><span>'+obj.title+'</span></div>\
					</a>\
				</div>\
			</div>\
			';

		return str;
	}

	var blGallery = function(page) {
		var id = uniqID(),
			r = blGalleryData(page),
			bl_g_data = r.list,
			bl_g_page = Number(r.page),
			bl_g_end_page = Number(r.end_page),
			bl_g_total = Number(r.total);

		var str = '\
	     <div class="container">\
	        <div class="row clearfix">\
	        	<div class="col-xs-12 col-sm-12 col-md-12">\
    	';

        bl_g_data.forEach(function(o,i) {
            str = str +'\
            ' + blGalleryItem(((bl_g_page*4)-4)+i,o) + '\
            ';
        });
        if(bl_g_data.length < 4) {
        	for(var i=0; i< (4-bl_g_data.length); i++) {
        		str = str + blGalleryItemEmpty();
        	}
        }
        str = str +'\
		        </div>\
	        </div>\
	    ';

	    if(bl_g_page > 1) {
	    	str = str + '\
            <div class="left bl-g-control" data-slide="prev" data-page="' + (bl_g_page-1) + '">\
                <span><svg viewBox="0 0 24 24" width="24" height="24"><path d="M15 5l-7 7 7 7z"/></svg></span>\
            </div>\
            ';
	    } else {
	    	str = str + '\
            <div class="left bl-g-control empty" data-slide="prev" data-page="1">\
                <span><svg viewBox="0 0 24 24" width="24" height="24"><path d="M15 5l-7 7 7 7z"/></svg></span>\
            </div>\
            ';
	    }

	    if(bl_g_page < bl_g_end_page) {
	    	str = str + '\
            <div class="right bl-g-control" data-slide="next" data-page="' + (bl_g_page+1) + '">\
                <span><svg viewBox="0 0 24 24" width="24" height="24"><path d="M9 5l7 7-7 7z"/></svg></span>\
            </div>\
	    	';	
	    } else {
	    	str = str + '\
            <div class="right bl-g-control empty" data-slide="next" data-page="bl_g_end_page">\
                <span><svg viewBox="0 0 24 24" width="24" height="24"><path d="M9 5l7 7-7 7z"/></svg></span>\
            </div>\
	    	';	
	    }
	    str = str + '\
        </div>';

		return {
			str: $(str),
			page: bl_g_page,
			end_page: bl_g_end_page,
			total: bl_g_total
		};
	}

    var blForum = function(d,wrap) {
    	var block_bg = $('html').css('background-color'),
    		css_str = htmlspecialchars_decode(d.elcss);
        if($('.dsgn-body').find('#page-bottomlistcss').length > 0 ) $('.dsgn-body').find('#page-bottomlistcss').html(css_str);
        else $('.dsgn-body').prepend('<style id="page-bottomlistcss" type="text/css">' + css_str + '</style>');

        var msny = (d.feature=='masonry') ? true : false;
        wrap.addClass('element page-bottomlist ' + d.elname)
            .attr('data-id', d.seq)
            .attr('data-el','el_bottomlist')
            .attr('data-name', d.elname)
            .attr('data-msny', msny)
            .attr('data-type', d.type)
            .attr('data-type2', d.type2)
            .attr('data-mode', d.mode)
            .attr('data-width', d.folder);

        wrap.html(htmlspecialchars_decode(d.eltag));

        var view = wrap.find('[data-loop="true"]').attr('data-view');
        if(typeof view == 'undefined') view = 10;

        if(typeof $.cookie('forum_' + d.seq) != 'undefined' && $.cookie('forum_' + d.seq))
            $.forum.init(d.seq,blPAGE,view,$.cookie('forum_' + d.seq),$.cookie('forum_'+ d.seq +'_sfl'),$.cookie('forum_'+ d.seq +'_stx'),$.cookie('forum_'+ d.seq +'_scate'));
        else
            $.forum.init(d.seq,blPAGE,view);

        $('option').css('background-color',block_bg);
        wrap.find('[data-id="' + blVIEW + '"]').closest('tr').addClass('active').siblings('tr').removeClass('active');
    }


	$(document).on('click','.bl-g-control', function(e){
		if($(this).hasClass('empty')) return false;
		
		var step = $(this).data('slide'),
			page = $(this).data('page'),
			bl_g = blGallery(Number(page));
		$('.page-bottomlist.bl-gallery-wrap').html(bl_g.str);
		changeBrokenImages($('.page-bottomlist.bl-gallery-wrap'));
	});


	$.bottomlist = {
		init : function(options) {			
	        blVIEW = (typeof VIEW == 'undefined') ? property.VIEW : VIEW;
            if(!blVIEW) return false;

			SID = (typeof SID == 'undefined') ? property.SID : SID;
			blMODE = (typeof MODE == 'undefined') ? property.PUBLISH : MODE;
            ONE = (typeof ONE == 'undefined') ? property.ONE : ONE;

            RPATH = (typeof RESOURCE == 'undefined') ? property.RESOURCE+'/'+SID+'/': RESOURCE+'/'+SID+'/';
            blPAGE = (typeof PAGE == 'undefined') ? property.PAGE : PAGE;
            blPARENT = (typeof PARENT == 'undefined') ? property.PARENT : PARENT; 

			PID = (typeof options.pid != 'undefined') ? options.pid : blPARENT.pid;
			TYPE = (typeof options.type != 'undefined') ? options.type : 'F';

			if(blPARENT.mode===null) return false;
			var checkGalleryProjectClass = (blPARENT.mode=='project') ? 'galProjectBg' : '';

			$('.page-bottomlist').remove();

			var checkForumPage = (blPAGE.indexOf('forum,') > -1) ? 'forum' : '',
				wrap = blWrap(PID,checkGalleryProjectClass,checkForumPage),
				$wrap = $(wrap.tpl);

			if(TYPE == 'F') $wrap.addClass('el_bl');
			$wrap.append("<div class='container'>");
			if($('.el-footer').length) {
				$lastEl = ($('.el-footer_ctrl').length > 0) ? $('.el-footer_ctrl') : $('.el-footer');
				$lastEl.before($wrap);
			} else {
				$('.dsgn-body').append($wrap);
			}

            $wrap.removeAttr('style');

            switch(TYPE) {
            	case 'F' :
            		var getblForum = $.ajax({ url : '/template/element/type/get/seq/' + PID, data: { use : 'bottomlist'}, dataType: 'json', type: 'POST', async: false, cache: false });
            		getblForum.then(function(data) {
            			checkError(data);
            			var d = data[0];
            			blForum(d,$wrap);
            		});
            		break;

            	case 'P' :
					$wrap.addClass('bl-gallery-wrap');
					var bl_g = blGallery(),
						bl_g_html = bl_g.str;
					$wrap.html(bl_g_html);
					changeBrokenImages($wrap);

					var g_color = (typeof $('.dsgn-body').attr('data-gcolor')!='undefined') ? $('.dsgn-body').attr('data-gcolor') : '';
		            if(g_color) {
		            	//var checkCss = ($('.galProjectCss').text().indexOf('.galProjectBg svg') > -1) ? true : false;
		            	var pr_rgba = hexToRgba(g_color),
		                    galProjectCssStr = ($('.galProjectCss').length>0) ? $('.galProjectCss').text() : '';

			                galProjectCssStr += '.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .bl-g-control svg {fill: rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',1);}\n\
		                						.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .bl-g-control.empty svg {fill: rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.4);}\n';
			                $('.galProjectCss').text(galProjectCssStr);
		                
		            }

            		break;
            		
            	default:
            		// console.log('TYPE default');
            		break;
            }
			// setHeight(pageHeight());

		},
		destory : function() {
			var $obj = $('.page-bottomlist');
			$obj.fadeOut('slow',function() {
				$(this).remove();
			});
		}
	}
}(jQuery));