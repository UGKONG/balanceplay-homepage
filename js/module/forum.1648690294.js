(function($) {
	$doc = $(document);
	var fmID = 0,
		files = [],
		pY = 0,
		RELOAD = false, isOff = false,
		upTYPE = 'image';
	var user = {
			'name' : '',
			'pass' : '',
			'key' : ''
		},
		groups = [],
		select_group = 0;

	var postUser = {
		'name' : '',
		'img' : '',
		'option' : '',
		'secret_display' : '',
		'replied' : '',
		'writeable'	: false,
		'sid' : false
	}

	/* ie attach upload */
	window.onload = function(){
		setLanguage(LANG);
	    document.getElementById('uploadForm').onsubmit = function() {
	        document.getElementById('uploadForm').target = 'uploadIFrame';
	    }
	    document.getElementById('uploadIFrame').onload = function() {
	        $('#forum-attach').modal('hide');
	        var res = $.parseJSON($('#uploadIFrame').contents().find('body').text());
	        if(typeof res.error != 'undefined' || res.error) {
	            alert(res.error);
	            $.processOFF();
	            return;
	        }
	    	$.processOFF();
	        $.forum.setfile(res.file, res.uploaded.file_name, res.uploaded.orig_name);
	    }
	    document.getElementById('uploadFile').onchange = function() {
	    	$.processON();
	        document.getElementById('uploadForm').submit();
	    }
	}
    $(function () { 
    	if(typeof LANG == 'undefined') LANG = getLanguage();
    });

	var resetObject = function(o) {
		$.each(o,function(k,v) {
			o[k] = '';
		});
		return o;
	}
	var uniqID = function() {
		return Math.round(new Date().getTime() + (Math.random() * 100));
	}

	function insertHtmlAtCursor(html) {
	    var sel, range, html;
	    if (window.getSelection) {
	        sel = window.getSelection();
	        if (sel.getRangeAt && sel.rangeCount) {
	            range = sel.getRangeAt(0);
	            range.deleteContents();
			    var htmlNode = document.createElement('p');
			    htmlNode.innerHTML = html
	            range.insertNode(htmlNode);
	            sel.removeAllRanges();
	            range = range.cloneRange();
	            range.selectNode(htmlNode);
	            range.collapse(false);
	            sel.addRange(range);
	        }
	    } else if (document.selection && document.selection.createRange) {
	        range = document.selection.createRange();
	        range.pasteHTML(htmlNode);
	        range.select();
	    }
	}

	var setWriteUser = function(data, callback) {
		if(data.writeable == false && data.access=='G') {
			$(this).showModalFlat('INFORMATION', $.lang[LANG]['board.group-can-write'],true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title');
			return false;
		}
		if(data.writeable == false && data.access=='ADM') {
			$(this).showModalFlat('INFORMATION', $.lang[LANG]['board.admin-can-write'],true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title');
			return false;
		}

		resetObject(postUser);
		postUser.name = data.name;
		postUser.img = data.myimg;
		postUser.option = data.option;
		postUser.secret_display = data.settings.secret_display;
		postUser.mgr = data.mgr;
		postUser.replied = data.replied;
		postUser.writeable = data.writeable;
		$.post('/fm/guest/login', { user : postUser, guest : user }, function(data) {
			if(typeof callback == 'function') {
				callback();
			}
		});
		return false;
	}

	var forumWriteform = function(id, pid, reply) {
		var title 			= (id) ? $('.tpl-forum-title').text() : '',
			content 		= (id) ? $('.tpl-forum-content .fr-view').html() : '<p><br></p>',
			name 			= postUser.name,
			date 			= (id) ? $('.tpl-forum-date').text() : 'now',
			myimage 		= postUser.img,
			option 			= postUser.option,
			secret 			= (option == 'S') ? 'S' : '',
			notice 			= (option == 'N') ? 'N' : '',
			secret_display 	= postUser.secret_display,
			mgr 			= postUser.mgr;

		title = title.replace(/'/g,'&#39;');
		var square_secret = (secret=='S') ? 'fa-check-square-o' : 'fa-square-o',
			square_notice = (option=='N') ? 'fa-check-square-o' : 'fa-square-o',
			secretClass = '',
			noticeClass = '';

		switch(secret_display) {
			case 'N' : secretClass = 'hide'; break;
			case 'A' : 
				secretClass = 'hide';
				secret = 'S';
				break;
			default : secretClass = 'always'; break;
		}
		noticeClass = (mgr==true) ? 'always' : 'hide';
		if(postUser.replied || reply) noticeClass = 'hide';
		if(secret=='S' && secret_display!='A') secretClass = '';
		if(option=='N') noticeClass = '';

		var str = '\
			<div class="forum-write">\
				<ul class="forum-user-info clearfix">\
					<li class="user-image tpl-forum-myimage">\
						<svg viewbox="0 0 40 40">\
							<pattern id="forum-write-image" patternUnits="userSpaceOnUse" width="40" height="40">\
								<image xlink:href="' + myimage + '?_' + new Date().getTime() + '" x="-10" width="60" height="40" />\
							</pattern>\
							<polygon points="20 0 37 10 37 30 20 40 3 30 3 10" fill="url(#forum-write-image)" />\
						</svg>\
					</li>\
					<li class="user-info">\
						<div class="tpl-forum-name">' + name + '</div>\
						<div class="tpl-forum-date date">' + date + '</div>\
					</li>\
					<li class="user-ctrl navbar-right">\
						<span id="fm-notice" class="' + noticeClass + '" data-notice="' + notice + '"><i class="fa ' + square_notice + '"></i>' + $.lang[LANG]['board.public'] + '</span>\
						<span id="fm-secret" class="' + secretClass + '" data-secret="' + secret + '"><i class="fa ' + square_secret + '"></i>' + $.lang[LANG]['board.private'] + '</span>\
					</li>\
				</ul>\
				<input type="hidden" id="fm-id" value="' + id + '">\
				<input type="hidden" id="fm-pid" value="' + pid + '">\
				<input type="hidden" id="fm-reply" value="' + reply + '">\
				<input type="hidden" id="hash" value="' + (($.cookie('hash')) ? $.cookie('hash') : '') + '">\
				<input class="form-control tpl-forum-title" id="fm-title" value="' + title + '" placeholder="' + $.lang[LANG]['board.enter-title'] + '">\
				<div class="fm-body fm-content fm-editor" id="fm-editor" data-placeholder="' + $.lang[LANG]['board.enter-content'] + '">' + content + '</div>\
			</div>\
			<div class="upload-files"></div>\
		';

		// $.removeCookie('hash', { path: '/' });
		return str;
	}

	$doc.on('keypress','.modal[id*=flat-modal] #mb_id', function(e) {
		if(e.keyCode == 13) {
			$('.forum-login').click();
		}
	});

	$doc.on('keypress','.modal[id*=flat-modal] #mb_password', function(e) {
		if(e.keyCode == 13) {
			$('.forum-login').click();
		}
	});

	$doc.on('focus','#fm-title',function(e) {
		$('.note-toolbar > .btn-group > button').addClass('disabled');
	}).on('focus','.note-editable',function(e) {
		$('.note-toolbar > .btn-group > button').removeClass('disabled');
	});

	$doc.on('click','.note-toolbar > .btn-group > button', function(e) {
		if($(this).hasClass('disabled')) e.preventDefault();
	});

//***********************************************************************************************************************바꾸기 아래
			// live
			// write_level 	: (PLAN || SERVICE.indexOf('gabia') > -1) ? 'NM' : 'M',
			// reply_level		: (PLAN || SERVICE.indexOf('gabia') > -1) ? 'NM' : 'A',

			// gabia test
			// write_level 	: (PLAN || SERVICE.indexOf('gabia') == -1) ? 'NM' : 'M',
			// reply_level		: (PLAN || SERVICE.indexOf('gabia') == -1) ? 'NM' : 'A',


	var forumRow = function(row,num,page_num,pid,loop_item,config,type) {
		var forum_row = document.createElement('div');
		$(forum_row).html(loop_item);
		$(forum_row).children().removeClass('active');

		var checkNotice	= (row.option == 'N') ? true : false,
			checkSecret	= (row.option == 'S') ? true : false,
			checkNew	= (row.new) ? true : false,
			checkEmpty	= (row.title == '' && row.content == '') ? true : false;

		var field_lang	= (typeof config.field_lang != 'undefined' && config.field_lang) ? config.field_lang : 'EN',
			max_title	= (typeof config.max_title != 'undefined' && config.max_title) ? config.max_title : 150,
			max_cont	= (typeof config.max_cont != 'undefined' && config.max_cont) ? config.max_cont : 300;

		var url	= forumUrl(),
			href = url + '/forum/view/' + row.id,
			icon_notice	= (checkNotice) ? '<i class="tpl-forum-list-notice-icon cl-icon notice01" aria-hidden="true"></i>' : '',
			icon_secret	= (checkSecret) ? '<i class="tpl-forum-list-secret-icon cl-icon lock02" aria-hidden="true"></i>&nbsp;' : '',
			icon_new	= (checkNew) ? '<img src="//storage.googleapis.com/i.addblock.net/icon/icon_new_forum.png" title="new" alt="new">' : '';

		var title_str	= (row.title) ? ((type == 'faq') ? row.title : htmlEntities(cutStrInBytes(htmlspecialchars_decode(row.title),max_title))) : '',
			title_href	= (title_str == '') ? '<a href="javascript:;" class="deleted">' + $.lang[LANG]['board.post.deleted'] + '</a>' : '<a href="' + href + '">' + title_str + '</a> ' + icon_new,
			is_titleInNotice = ($(forum_row).find('.tpl-forum-list-title').find('.tpl-forum-list-notice-icon').length > 0) ? true : false,
			is_Masonry = ($('.element[data-id="' + pid + '"]').attr('data-msny') == 'true') ? true : false;

		$(forum_row).find('.tpl-forum-list-num').text(num);
		$(forum_row).find('.tpl-forum-list-hit').text(row.hit);
		$(forum_row).find('.tpl-forum-list-date').text(row.datetime);
		$(forum_row).find('.tpl-forum-list-name').text(row.name);
		$(forum_row).find('.tpl-forum-list-title').html(icon_secret + title_href).attr('data-option',row.option).attr('data-id',row.id);
		
		if(row.depth > 0 && !checkNotice) {
			if($(forum_row).find('.tpl-forum-list-name').hasClass('tpl-sync-reply')) $(forum_row).find('.tpl-forum-list-name').addClass('reply');

			$(forum_row).find('.tpl-forum-list-title').addClass('reply');
			$(forum_row).find('.tpl-forum-list-title').prepend('<span class="tpl-forum-list-reply-name">' + row.reply_name + '</span>');
		}

		if($(forum_row).find('.tpl-forum-list-cont').length > 0) {
			var row_content = row.content.replace(/<span class=\"fr-file\"[^>]*>((\n|\r|.)*?)<\/span>/gim,' ');

			var cont_txt = (row.content.length > 0) ? row_content.replace(/(<([^>]+)>)/ig,' ') : '',
				cont_str = (cont_txt.length > 0) ? cutStrInBytes(cont_txt,max_cont) : '',
				cont_href = (cont_str == '') ? '<a href="javascript:;" class="deleted"></a>' : '<a href="' + href + '">' + cont_str + '</a>';

			if($(forum_row).find('.tpl-forum-list-cont').find('.tpl-forum-list-more').length > 0) {
				var contmore_str = $(forum_row).find('.tpl-forum-list-cont').find('.tpl-forum-list-more').html();
				cont_href += '<div class="tpl-forum-list-more forum-contmore"><a href="' + href + '">' + contmore_str + '</a></div>';
				$(forum_row).find('.tpl-forum-list-cont').find('.tpl-forum-list-more').html('<a href="' + href + '">' + more_str + '</a>' ).attr('data-option',row.option).attr('data-id',row.id);
			} 
			
			$(forum_row).find('.tpl-forum-list-cont').html(cont_href).attr('data-option',row.option).attr('data-id',row.id);
		}
		if($(forum_row).find('.tpl-forum-list-myimg').length > 0) {
			if($(forum_row).find('.tpl-forum-list-myimg').hasClass('hexagon')) {
				var hexagon = '<svg viewbox="0 0 40 40"><pattern id="forum-list-image-' + row.id + '" patternUnits="userSpaceOnUse" width="40" height="40"><image xlink:href="' + row.myimg + '?_' + new Date().getTime() + '" x="-10" width="60" height="40" /></pattern><polygon points="20 0 37 10 37 30 20 40 3 30 3 10" fill="url(#forum-list-image-' + row.id + ')"/></svg>';
				$(forum_row).find('.tpl-forum-list-myimg').html(hexagon);
			} else {
				$(forum_row).find('.tpl-forum-list-myimg').html('<img src="' + row.myimg + '?_' + new Date().getTime() + '">');
			}
		}

		if($(forum_row).find('.tpl-forum-list-category').length > 0 && $(forum_row).find('.tpl-forum-list-category').hasClass('.forum-contmore')==false) {
			var cate_class	= (row.category_seq) ? '': 'empty',
				cate_name	= (row.category_name) ? row.category_name : '';
			$(forum_row).find('.tpl-forum-list-category').text(cate_name).attr('data-cate',row.category_seq).addClass(cate_class);
		}

		

		if($(forum_row).find('.tpl-forum-list-more').length > 0) {
			var more_str = $(forum_row).find('.tpl-forum-list-more').html();
			$(forum_row).find('.tpl-forum-list-more').html('<a href="' + href + '">' + more_str + '</a>' ).attr('data-option',row.option).attr('data-id',row.id);
		}


		if(typeof config.comment_display != 'undefined' && config.comment_display == 'ON' && type != 'qna') {
			var comment_str = (row.comment > 0) ? row.comment : '';
			$(forum_row).find('.tpl-forum-list-comment').html(comment_str);
			if(!comment_str) $(forum_row).find('.tpl-forum-list-comment-icon').remove();
		} else {
			$(forum_row).find('.tpl-forum-list-comment').remove();
			$(forum_row).find('.tpl-forum-list-comment-icon').remove();
		}


		if(checkNotice) {
			$(forum_row).find('.tpl-forum-list-num').addClass('n').html(icon_notice);
			if($(forum_row).find('.tpl-forum-list-num').hasClass('hidden') || (is_titleInNotice && type=='faq')) {
				$(forum_row).find('.tpl-forum-list-title').prepend(icon_notice);
			}
		}

		switch(type) {
			case 'thumb':
				if($(forum_row).find('.tpl-forum-list-thumb').length > 0) {
					var f_color = ($('.element[data-id="' + pid + '"]').attr('data-fcolor')) ? $('.element[data-id="' + pid + '"]').attr('data-fcolor') : '#000',
				 		rgba = hexToRgba(f_color),
						ffolder = $('.element[data-id="' + pid + '"]').attr('data-width'),
						thumb_empty = (row.thumb == '' || row.title == '') ? true : false,
						content_noimage_img = (thumb_empty && row.content_noimage_img) ? setResizeImageFolder(ffolder,row.content_noimage_img) : row.content_noimage_img,
						thumb_src = (thumb_empty) ? ((row.content_noimage_img) ? content_noimage_img : '//storage.googleapis.com/i.addblock.net/icon/noimage_' + ffolder +'.png?' + new Date().getTime()) : row.thumb.replace('\/60\/','\/' + ffolder + '\/'),
						thumb_href = (row.content == '') ? '<a href="javascript:;" class="deleted"></a>' : '<a href="' + href + '"></a>';

					$(forum_row).find('.tpl-forum-list-thumb img').attr('src',thumb_src).wrap(thumb_href);
					
					
					if(thumb_empty) {
						if(!is_Masonry && !row.content_noimage_img) {
							var text = '<p class="noimage_text">no image</p>';
							$(forum_row).find('.tpl-forum-list-thumb').append(text);
							$(forum_row).find('.tpl-forum-list-thumb').css('background-color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.1)');
							$(forum_row).find('.noimage_text').css('color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.15)');
						}	

						$(forum_row).find('.tpl-forum-list-thumb,.tpl-forum-thumb-wrap').addClass('empty');
						$(forum_row).find('.tpl-forum-list-thumb').attr('data-option',row.option).attr('data-id',row.id);
					} else {
						$(forum_row).find('.noimage_text').remove();
						$(forum_row).find('.tpl-forum-list-thumb,.tpl-forum-thumb-wrap').removeClass('empty');
						$(forum_row).find('.tpl-forum-list-thumb').attr('data-option',row.option).attr('data-id',row.id);
					}

					if(content_noimage_img) $(forum_row).find('.tpl-forum-list-thumb,.tpl-forum-thumb-wrap').addClass('empty_con_img');
					else $(forum_row).find('.tpl-forum-list-thumb,.tpl-forum-thumb-wrap').removeClass('empty_con_img');

					//$(forum_row).find('.tpl-forum-list-thumb.empty.empty_con_img img').css('display','block');
					if(is_Masonry && $(forum_row).find('.tpl-forum-list-thumb').not('.empty_con_img').hasClass('empty')) 
						$(forum_row).find('.item-inner').addClass('msny_10');
				}
				break;

			case 'faq':
				var colspan = $(forum_row).find('th').length,
					settings = (typeof row.settings == 'undefined') ? {} : row.settings,
					wrap = (typeof settings.wrap != 'undefined') ? 'w' + settings.wrap : '',
					align = (typeof settings.align != 'undefined') ? settings.align : '',
					align_class = (align != '') ? 'text-'+align : '',
					unit = ($(forum_row).find('.tpl-forum-list-num').hasClass('unit-empty')) ? { 'question':'', 'answer':'' } : { 'question':'Q', 'answer':'A' };

				colspan = colspan + $(forum_row).find('td').length;
				
				var $answer = $('<tr>');
				$answer.append('<th scope="row" class="tpl-forum-list-num tpl-forum-list-etc">' + unit['answer'] + '</th>');
				// $answer.append('<td conspan="' + (colspan-1) + '"><div class="fr-view ' + align_class + '"><div class="forum-write ' + wrap + '">' + row.content + '</div></div></td>');
				$answer.append('<td conspan="' + (colspan-1) + '">' + ((typeof config.faq_view_msg != 'undefined' && config.faq_view_msg) ? config.faq_view_msg : row.content) + '</td>');
				$answer.hide();

				if(checkNotice) $answer.find('.tpl-forum-list-num').text('');
				else $(forum_row).find('.tpl-forum-list-num').removeClass('n').text(unit['question']);
				break;

			case 'qna':
				if(checkNotice) $(forum_row).find('.tpl-forum-list-state').text('');
				else if(row.comment > 0) $(forum_row).find('.tpl-forum-list-state').attr('data-state',true).text($.lang[config.field_lang.toLowerCase()]['forum.qna.state.replied']);
				else $(forum_row).find('.tpl-forum-list-state').removeAttr('data-state').text($.lang[config.field_lang.toLowerCase()]['forum.qna.state.waiting']);

				$(forum_row).find('.qna-details *[class*=tpl-forum-list-]:not(.tpl-forum-list-content)').html('');
				$(forum_row).find('.qna-details *[class*=tpl-qna-answer-]').html('');

				$(forum_row).find('.qna-details .tpl-qna-question-content').html(row.content);

				$(forum_row).find('.qna-details').hide();
				break;

			default: //normal
				break;
		}


		var forum_row_html = $(forum_row).html();
		$(forum_row).remove();

		return (type == 'faq') ? forum_row_html + $answer.outerHTML() : forum_row_html;
	}

	var forumUrl = function() {
		if(PAGE_MODE != 'c') {
			var url = (PAGE_MODE=='s') ? '' : '/render';
		} else {
			var url = '/'+CONFIG_URL+'config/page';
		}
		return url;		
	}
	var forumView = function(id) {
		files = [];
        $.ajax({
            url: '/fm/view',
            dataType: 'json',
            type: 'POST',
            data:  { id : id, sid : F_SID },
            async: false,
            cache: false,
            success: function (data) {
				if(typeof data.error != 'undefined' && data.error) {
					// $.cookie('gallery','.' + F_PARENT.element, { path: '/' });
					alert(data.error);
					if(PAGE_MODE != 'c') {
						var url = (PAGE_MODE=='s') ? '/' : '/render/';
						(F_ONE) ? location.replace(url + '#' + F_PARENT.page) : location.replace(url + F_PARENT.page);	
					} else {
						(F_ONE) ? location.replace('/'+CONFIG_URL+'config/page/index#' + F_PARENT.page) : location.replace('/'+CONFIG_URL+'config/page/' + F_PARENT.page);
						return false;
					}

					return false;
				}
				if(typeof data.f_c_fonts != 'undefined' && data.f_c_fonts && PAGE_MODE!='c') {
					$.each(data.fonts, function(i,v) {
						if(property.ELFONTS.indexOf(i) < 0) {
							property.ELFONTS.push(i);
							$('#loadfonts').append(v);
						}
					});
				}
				
				// QnA Block:: notice view page, comment_display: off
				if(data.fm_type == 'qna' && data.option == 'N') $('.page-comments').hide();

				var settings = (typeof data.fm_settings == 'undefined') ? {} : JSON.parse(data.fm_settings),
					p_settings = (typeof F_PARENT.settings == 'undefined' || F_PARENT.settings == '') ? {} : JSON.parse(F_PARENT.settings),
					wrap = (typeof settings.wrap == 'undefined') ? '' : 'w' + settings.wrap,
					align = (typeof settings.align == 'undefined') ? 'left' : settings.align,
					category = (typeof data.category_seq == 'undefined') ? '' : '<div class="tpl-forum-category" data-cate="' + data.category_seq + '">' + data.category_name + '</div>',
					forum_validplan = (typeof VALIDPLAN == 'undefined') ? property.VALIDPLAN : VALIDPLAN;
				// Category Display none case
				// if(category && typeof p_settings.field_disable != 'undefined') {
				// 	if($.inArray('category',p_settings.field_disable) > -1)  category = '';
				// }

				files = data.files;		
				p_settings.forum_email = ((typeof forum_validplan == 'undefined') || (!forum_validplan)) ? 
										((typeof p_settings.forum_email == 'undefined') || (!p_settings.forum_email) ? p_settings.forum_email : p_settings.forum_email.split(',')[0]
										) : p_settings.forum_email;

				var f_color = (typeof p_settings.forum_color == 'undefined') ? 'black' : p_settings.forum_color,
				 	rgba = hexToRgba(f_color),
				 	f_type = (typeof p_settings.forum_type == 'undefined') ? '' : 'data-forum-type="' + p_settings.forum_type + '"',
					forum_email = ((typeof p_settings.forum_email == 'undefined') || (p_settings.email_display == 'OFF')) ? '' : p_settings.forum_email,
					forum_content = ($('<div>'+data.content+'</div>').find('img[src^="http://"]').length > 0) ? data.content.replace(/src\=\"http\:\/\//gi,'src\=\"\/\/') : data.content;

				var str = '\
				<div class="forum-view ' + wrap + '" ' + f_type + ' data-fcolor="' + f_color + '">\
					<input type="hidden" id="fm-id" value="' + data.id + '">\
					<input type="hidden" id="fm-pid" value="' + data.pid + '">\
					<input type="hidden" id="forum-email" value="' + forum_email + '">\
					<div class="container">\
						<div class="forum-write ' + wrap + '">\
							<div class="row">\
								<div class="col-md-12 col-sm-12 col-xs-12">\
									<ul class="forum-user-info clearfix">\
										<li class="user-image tpl-forum-myimage forum-image">\
											<svg viewbox="0 0 40 40"><pattern id="forum-view-image" patternUnits="userSpaceOnUse" width="40" height="40"><image xlink:href="' + data.myimg + '?_' + new Date().getTime() + '" x="-10" width="60" height="40" /></pattern><circle cx="20" cy="20" r="20" fill="url(#forum-view-image)"/></svg>\
										</li>\
										<li class="user-info">\
											<div class="tpl-forum-name">' + data.name + '</div>\
											<div class="tpl-forum-date date">' + data.date + '</div>\
											<div class="tpl-forum-hit hit">\
												<svg viewBox="0 0 14 12" width="14" height="12"><circle cx="7" cy="6" r="2"/><path d="M7 2C3.97 2 1.34 3.62 0 6c1.34 2.38 3.97 4 7 4s5.66-1.62 7-4C12.66 3.62 10.03 2 7 2zM7 9C5.34 9 4 7.66 4 6s1.34-3 3-3 3 1.34 3 3S8.66 9 7 9z"/></svg>\
												' + data.hit + '\
											</div>\
										</li>\
										<li class="user-ctrl navbar-right">\
											<svg id="forum-ctrl" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" viewBox="0 0 36 36" width="36" height="36"><circle class="st9" cx="9" cy="18" r="2.5" fill="#fff"/><circle class="st9" cx="18" cy="18" r="2.5" fill="#fff"/><circle class="st9" cx="27" cy="18" r="2.5" fill="#fff"/><path d="M9 16c1.1 0 2 0.9 2 2s-0.9 2-2 2 -2-0.9-2-2S7.9 16 9 16M9 15c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3S10.66 15 9 15L9 15z" fill="#999"/><path d="M18 16c1.1 0 2 0.9 2 2s-0.9 2-2 2 -2-0.9-2-2S16.9 16 18 16M18 15c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3S19.66 15 18 15L18 15z" fill="#999"/><path d="M27 16c1.1 0 2 0.9 2 2s-0.9 2-2 2 -2-0.9-2-2S25.9 16 27 16M27 15c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3S28.66 15 27 15L27 15z" fill="#999"/></svg>\
											' + postDropMenu(data) + '\
										</li>\
									</ul>\
									' + category + '\
									<div class="tpl-forum-title">' + data.title + '</div>\
									<div class="tpl-forum-content fm-body fm-content fm-editor fr-box ' + align + '">\
										<div class="fr-wrapper" dir="auto">\
											<div class="fr-element fr-view" dir="auto">' + forum_content + '</div>\
										</div>\
									</div>\
									<div class="tpl-forum-list-footer">\
										<div class="tpl-forum-control-wrap" style="float:right;">\
											<button type="button" class="btn btn-default btn-round btn-modal btn-list tpl-forum-list">&nbsp;' + $.lang[LANG]['board.button.list'] + '</button>\
											' + replyPostbutton(data) + '\
										</div>\
									</div>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
				';
				$('.header.el-menu').after(str);
				changeBrokenImages($('.fr-view'));

				if(($('.fr-view').find('img[name^="target_resize_image[]"]').length > 0)) {
					$.each($('.fr-view').find('p'),function(){
						$(this).find('img[name^="target_resize_image[]"]').removeAttr('width')
																		.removeAttr('height');
					});
				}

				// 주소 변경 복원
				$.each($('.fr-view').find('iframe'), function(idx,value) {
					var src = $(this).attr('src');
					if(src.indexOf('http://') > -1 && src.indexOf('youtube.com') > -1) {
						src = src.replace('http://','//');
						$(this).attr('src',src);
					}
				});
				$('.fmcss').remove();

				if(typeof data.fm_bg != 'undefined') {
					var fmcss = '\
						<style class="fmcss">\
							html  { ' + data.fm_bg.trim() + '}\
							body, body > .dsgn-body { background-color: transparent; background-image: none;/*position: absolute; top0; left: 0;  right: 0; bottom: 0; width: auto; height: auto; padding: 0px; overflow: auto; */}\
						';
					if(f_color) {
						fmcss += '\
							.forum-user-info li.user-ctrl .dropdown-menu,\
							.forum-user-info li.user-ctrl .dropdown-menu li a {' + data.fm_bg.trim() + '}\
							.forum-user-info li.user-ctrl .dropdown-menu,.forum-user-info li.user-ctrl .dropdown-menu li + li {border-color:'+f_color+'}\
							.forum-user-info li.user-ctrl .dropdown-menu li a {color:'+f_color+'}\
							.forum-user-info li.user-ctrl .dropdown-menu li a:focus,\
							.forum-user-info li.user-ctrl .dropdown-menu li a:hover,\
							.forum-view .tpl-forum-list-footer button.btn.btn-round:focus,\
							.forum-view .tpl-forum-list-footer button.btn.btn-round:hover,\
							.page-comments .comm-footer .btn.btn-submit:hover {background-color:rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.07);color:'+f_color+' !important;}\
							.forum-write .tpl-forum-list-footer button,.forum-view .fr-view .fr-file {border-color:rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.4)}\
							.forum-write .tpl-forum-list-footer button,.forum-user-info li.user-info,\
							.forum-view .fr-view .fr-file {color:rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.8)}\
							.forum-write .tpl-forum-title, .forum-write .tpl-forum-content {color : '+f_color+'}\
							#forum-ctrl path {fill : rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.6)}\
							.page-comments .tpl-comment-form textarea::-webkit-input-placeholder {color:rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.6) !important;}\
							.page-comments .tpl-comment-form textarea:-ms-input-placeholder {color:rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.6) !important;}\
							.page-comments .tpl-comment-form textarea:-mos-input-placeholder {color:rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.6) !important;}\
						';
					}
					fmcss += '\
						</style>\
					';

					$('#dsgn-body').after(fmcss);
				} else { 
					$('.forum-view[data-fcolor="black"]').addClass('default-forum-view'); 
				}
				if(p_settings.field_disable) {
					$.each(p_settings.field_disable, function(i,v) {
						$('.forum-write .row > div .tpl-forum-'+v).addClass('hidden');
					});
				}

				if($('.user-info > div.hidden').length > 0) $('.user-info > div').removeClass('mt-8').addClass('mt-8');
				if($('.tpl-forum-date').next('div').hasClass('hidden')) $('.tpl-forum-date').addClass('afterHide');
				
				displayPageToolbar(data.option);	
				// $.removeCookie('hash', { path: '/' });
			}
		},'json');
	}

	// $(document).on('click', '.tpl-forum-list-footer',function() {
	// 	$('.fmcss').remove();
	// });
	
	$(document).on('click','.tpl-forum-toolbar-button.share', function() {
		var option = $(this).closest('.tpl-page-toolbar').attr('data-page-option');
		if(option == 'S') {
			$(this).showModalFlat('INFORMATION',$.lang[LANG]['config.gallery.share.cannot.secret-post'],true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title');
			return false;
		}
		if(typeof MODE == 'undefined' && property.PUBLISH) shareModal();
		else $(this).showModalFlat($.lang[LANG]['config.information'],$.lang[LANG]['config.gallery.share.publish'],true,false,'','ok','', 'cl-cmmodal cl-s-btn w560 cl-p130 cl-p0 cl-okbtn-pbt70');
	});

	var replyPostbutton = function(data) {
		var str = '\
					<button type="button" class="btn btn-default btn-round btn-modal btn-list tpl-forum-write" data-pid="' + data.pid + '" data-reply="' + data.id + '">\
						&nbsp;' + $.lang[LANG]['board.button.reply'] + '\
					</button>\
		';

		var reply_hidden_case = ['faq', 'qna'],
			reply_hidden =  (reply_hidden_case.indexOf(data.fm_type) > -1) ? true : false;

		return (data.reply && data.option != 'N' && !reply_hidden) ? str : '';
	}

	var postDropMenu = function(data) {
		var drop = false;
		var str_li = '';

		if((data.own || (data.sign == false && data.fmid == false)) && data.writeable == true || data.mgr_edit) {
			drop = true;
			str_li += '\
				<li><a href="#" class="tpl-forum-write" data-id="' + data.id + '" data-pid="' + data.pid + '">' + $.lang[LANG]['board.button.modify'] + '</a></li>\
			';
		}

		if(data.own || (data.sign == false && data.fmid == false) || data.mgr) {
			drop = true;
			str_li += '\
				<li><a href="#" class="tpl-forum-delete" data-id="' + data.id + '" data-pid="' + data.pid + '">' + $.lang[LANG]['board.button.delete'] + '</a></li>\
			';
		}
		if(drop == false) {
			str_li += '\
				<li><a href="#">' + $.lang[LANG]['board.not-allowed'] + '</a></li>\
			';
		}

		var str = '\
		<ul class="dropdown-menu" aria-labelledby="forum-ctrl">\
			' + str_li + '\
		</ul>\
		';
		return str;
	}

//***********************************************************************************************************************바꾸기 아래
			// live
			// isGabia = (F_SERVICE.indexOf('gabia') > -1) ? true : false,

			// gabia test
			// isGabia = (F_SERVICE.indexOf('gabia') == -1) ? true : false,


	var signForm = function(id,pid,access,token) {
		var mode = (access=='NM') ? 'nonmem' : 'default',
			F_VALIDPLAN = (typeof VALIDPLAN == 'undefined') ? property.VALIDPLAN : VALIDPLAN,
			F_VALIDTYPE = (typeof VALIDTYPE == 'undefined') ? property.VALIDTYPE : VALIDTYPE,
			F_SITEUM = (typeof SITEUM == 'undefined') ? property.SITEUM : SITEUM,
			F_SERVICE = (typeof SERVICE == 'undefined') ? property.SERVICE : SERVICE,
			isGabia = (F_SERVICE.indexOf('gabia') > -1) ? true : false,
			host_url = (isGabia) ? 'http://creatorlink-gabia.com' : 'http://creatorlink.net',
			classSet = {
				'default': ['default-mode','active', '', '', '', ''],
				'sitemember': ['sitemember-mode', '', 'active', '', '', 'hidden'],
				'nonmem' : ['nonmember-mode', '', '', 'active', '.nonmem', 'hidden'],
			},
			joinUrl = (LANG != 'ko') ? '//creatorlink.net/en/member/join' : '//creatorlink.net/member/join' ;

		var signForm_str_nonmember = '',
			signForm_str_defult  = '';

		if(F_VALIDTYPE != 'SM' && (F_VALIDTYPE != 'BN' && F_SITEUM > -1)) F_SITEUM = -1;

		if((F_VALIDTYPE == 'SM' || (F_VALIDTYPE == 'BN' && F_SITEUM > 0)) && access != 'NM') {
			mode = 'sitemember';
		}


		if(isGabia) {
			if(access == 'ADM') {
				mode = 'sitemember';
			} else if(access == 'NM') {
				//
			} else {
				if((F_VALIDTYPE != 'BN' && F_VALIDTYPE != 'SM') || (F_VALIDTYPE == 'BN' && F_SITEUM < 1)) {
					mode = 'nonmem';
					access = 'NM';
				}
			}
		}

		if (access=='NM') {
			signForm_str_nonmember = '' + 
			'<ul class="comment-signForm nav ' + classSet[mode][0] + '" role="tablist">';

				if(isGabia || (!isGabia && F_SITEUM > 0)) {
					signForm_str_nonmember += '' + 
					'<li class="signType ' + classSet[mode][2] + '" role="presentation"><a href="#sitemember" aria-controls="sitemember" role="tab" data-toggle="tab">' + $.lang[LANG]['config.creatorlink.text-adm'] + '</a></li>';
					
				} else {
					signForm_str_nonmember += '' +
					'<li class="signType ' + classSet[mode][1] + '" role="presentation"><a href="#creatorlink" aria-controls="creatorlink" role="tab" data-toggle="tab">' + $.lang[LANG]['config.creatorlink.text-adm'] + '</a></li>';
				}
				signForm_str_nonmember += '' + 
				'<li class="signType ' + classSet[mode][3] + '" role="presentation"><a href="#anonymous" aria-controls="anonymous" role="tab" data-toggle="tab">' +  $.lang[LANG]['config.anonymous'] + '<svg viewBox=\"0 0 6 8\" width=\"6\" height=\"8\"><polygon points=\"2 0 0 0 4 4 0 8 2 8 6 4 \"/></svg></a></li>' +
			'</ul>';
		} else {
			signForm_str_defult = '' + 
				'<ul class="comment-signForm nav ' + classSet[mode][0] + '" role="tablist">';
			if(mode == 'sitemember') {
				signForm_str_defult += '' + 
				'<li class="signType ' + classSet[mode][2] + '" role="presentation"><a href="#sitemember" aria-controls="sitemember" role="tab" data-toggle="tab">' + $.lang[LANG]['siteum.login.member'] + '</a></li>';
			} else {
				var tab_str = (isGabia) ? $.lang[LANG]['siteum.login.member'] : $.lang[LANG]['config.creatorlink'];
				if((F_VALIDTYPE == 'BN' || F_VALIDTYPE == 'SM') && access == 'ADM' ) {
					tab_str = '<br>' + $.lang[LANG]['config.creatorlink.text-adm2'];
					classSet[mode][5] = 'hidden';
				}
				signForm_str_defult += '' + 
					'<li class="signType ' + classSet[mode][1] + '" role="presentation"><a href="#creatorlink" aria-controls="creatorlink" role="tab" data-toggle="tab">' + tab_str + '</a></li>';
			}
			if(access=='A') {
				var icon_str = (mode == 'sitemember') ? '' : '<img src="//storage.googleapis.com/i.addblock.net/icon/icon-sign-anonymous.png"><br><br>';
				signForm_str_defult += '' + 
				'<li class="signType ' + classSet[mode][3] + '" role="presentation"><a href="#anonymous" aria-controls="anonymous" role="tab" data-toggle="tab">' +  $.lang[LANG]['config.anonymous'] + '</a></li>';
			}
			signForm_str_defult += '' + 
			'</ul>';
		}




		var str = signForm_str_defult +  signForm_str_nonmember +
			'<div class="tab-content">' +
				'<div role="tabpanel" class="tab-pane ' + classSet[mode][1] + '" id="creatorlink">' +
			        '<div class="form-inline comment-addform input-text">' +
			        	'<div class="cl-s-form-wrap">' +
							'<div class="cl-s-form-group">' +
								'<input type="text" class="cl-s-form-control" id="mb_forum_id" name="mb_id" required="required" value="">' +
								'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['config.modal.emailaddress'] + '</label>' +
							'</div>' +
						'</div>' +
			        	'<div class="cl-s-form-wrap mt-10">' +
							'<div class="cl-s-form-group">' +
								'<input type="password" class="cl-s-form-control" id="mb_forum_password" name="mb_password" required="required" value="">' +
								'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['config.modal.password'] + '</label>' +
							'</div>' +
						'</div>' +
			        '</div>' +
			        '<div class="bottom-box text-right ' + LANG + ' ' + classSet[mode][5] + '">' +
						'<span>' +  $.lang[LANG]['page.member.login-modal.jointext'] + '</span>&nbsp;&nbsp;&nbsp;<a href="' + joinUrl + '" target="_blank"><b>' +  $.lang[LANG]['page.member.login-modal.join2'] + '<svg viewBox=\"0 0 6 8\" width=\"6\" height=\"8\"><polygon points=\"2 0 0 0 4 4 0 8 2 8 6 4 \"/></svg></b></a>' +
					'</div>' +
			        '<div class="btn-wrap comment-addform mt-30">' +
			        	'<a href="#" class="btn btn-primary btn-lg btn-block forum-login" data-id="' + id + '" data-pid="' + pid + '">' +  $.lang[LANG]['config.modal.login'] + '</a>' +
			        	'<button type="button" class="btn-modal-cancel" data-dismiss="modal">' +  $.lang[LANG]['config.cancel'] + '</button>' +
			        '</div>' +
				'</div>' +
				'<div role="tabpanel" class="tab-pane ' + classSet[mode][2] + '" id="sitemember">' +
			        '<div class="form-inline comment-addform input-text">' +
			        	'<div class="cl-s-form-wrap">' +
							'<div class="cl-s-form-group">' +
								'<input type="text" class="cl-s-form-control" id="um_forum_id" name="um_id" required="required" value="">' +
								'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['siteum.login.id'] + '</label>' +
							'</div>' +
						'</div>' +
			        	'<div class="cl-s-form-wrap mt-10">' +
							'<div class="cl-s-form-group">' +
								'<input type="password" class="cl-s-form-control" id="um_forum_password" name="um_password" required="required" value="">' +
								'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['siteum.login.password'] + '</label>' +
							'</div>' +
						'</div>' +
			        '</div>' +
			        '<div class="bottom-box text-right ' + LANG + ' ' + classSet[mode][5] + '">' +
						'<span>' +  $.lang[LANG]['page.member.login-modal.jointext'] + '</span>&nbsp;&nbsp;&nbsp;<a href="' + joinUrl + '" target="_blank"><b>' +  $.lang[LANG]['page.member.login-modal.join2'] + '<svg viewBox=\"0 0 6 8\" width=\"6\" height=\"8\"><polygon points=\"2 0 0 0 4 4 0 8 2 8 6 4 \"/></svg></b></a>' +
					'</div>' +
			        '<div class="btn-wrap comment-addform mt-30">' +
			        	'<a href="#" class="btn btn-primary btn-lg btn-block forum-login" data-id="' + id + '" data-pid="' + pid + '">' +  $.lang[LANG]['config.modal.login'] + '</a>' +
			        	'<button type="button" class="btn-modal-cancel" data-dismiss="modal">' +  $.lang[LANG]['config.cancel'] + '</button>' +
			        '</div>' +
					'<br>' +
				'</div>' +
				'<div role="tabpanel" class="tab-pane ' + classSet[mode][3] + '" id="anonymous">' +
					'<div class="form-inline comment-addform input-text">' +
			        	'<div class="cl-s-form-wrap">' +
							'<div class="cl-s-form-group">' +
								'<input type="text" class="cl-s-form-control" id="comm-name" required="required" value="">' +
								'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['config.modal.name'+classSet[mode][4]] + '</label>' +
							'</div>' +
						'</div>' +
			        	'<div class="cl-s-form-wrap mt-10">' +
							'<div class="cl-s-form-group">' +
								'<input type="password" class="cl-s-form-control" id="comm-pass" required="required" value="">' +
								'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['config.modal.password'+classSet[mode][4]] + '</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="kcaptcha-box comment-addform input-text mt-30">' +
						'<div class="col-xs-12 col-sm-5 col-md-5 no-padding text-left kcaptcha-img">' +
							'<p id="write_option">' +
								'<img src="" id="kcaptcha" alt="' +  $.lang[LANG]['config.captcha-alt'] + '"/>' +
							'</p>' +
							// '<div id="recaptcha" data-stoken="' + token + '" data-res=""></div>' + 
						'</div>' +
						'<div class="col-xs-12 col-sm-7 col-md-7 no-padding text-left kcaptcha-text">' +
							'<input type="text" id="wr_key" name="wr_key" class="col-sm-12 form-control" placeholder="' +  $.lang[LANG]['config.enter-captcha'] + '"/>' +
							'<a id="kcaptcha" class="kcaptcha-change"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 5c-3.64 0-6.63 2.78-6.97 6.33L3.35 9.65l-0.71 0.71 2.85 2.85 2.85-2.85L7.65 9.65l-1.59 1.59C6.43 8.29 8.95 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6c-1.66 0-3.17-0.68-4.26-1.78l-0.71 0.71C8.3 18.21 10.06 19 12 19c3.87 0 7-3.13 7-7S15.87 5 12 5z"/></svg><span>' +  $.lang[LANG]['config.change-captcha'] + '</span></a>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>';


		return str;
	}
	var forumWrite = function(id,pid,reply) {
		reply = (typeof reply == 'undefined') ? '' : reply;
	}
	$doc.on('mousedown, mouseup','#forum-modal .fr-view[contenteditable="true"]',function(e) {
		frAbove = ($(window).height() < e.pageY+320) ? 'fr-above' : '';
		var range = document.createRange(),
			sel = window.getSelection();

		// if(sel.focusNode != null && sel.focusNode.parentElement.nodeName == 'A') {
		// 	getCursorPos($(sel.focusNode.parentElement));
		// }
		$('#fm-editor').froalaEditor('selection.save');
	});


	$(document).on('click','.tb-attach-file',function(e) {
		// $('#forum-attach').modal('show');
      	isReplace = false;
		upTYPE = 'image';
		$('#file_type').val(upTYPE);
		$('#uploadFile').val('');
		$('#uploadFile').trigger('click');
		// $('.modal-backdrop').last().removeClass('fade');
	});
	$(document).on('click','.tb-file-insert', function(e) {
		// $('#forum-attach').modal('show');
		upTYPE = 'file';
		$('#file_type').val(upTYPE);
		$('#uploadFile').val('');
		$('#uploadFile').trigger('click');
		// $('.modal-backdrop').last().removeClass('fade');
	});
	$(document).on('click','.tb-video-insert', function(e) {
		$('#fm-editor').froalaEditor('selection.save');
		var modal = $(this).showModalFlat('INSERT VIDEO',videoForm(),true,true,function() {
			$('.error').remove();
			var url = $('#video-url').val();
			if(!url) {
				$('#video-url').after('<label class="error">' +  $.lang[LANG]['config.link-to-go'] + '</label>').focus();
				return;
			}
			var video = insertVideo(url,'src'),
				frVideo = '<span class="fr-video fr-dvb fr-draggable" contenteditable="false" draggable="true">' +
						'<iframe width="720" height="405" src="' + video + '" frameborder="0" allowfullscreen="true"></iframe>' +
						'</span>';

			$('#fm-editor').froalaEditor('selection.restore');
			$('#fm-editor').froalaEditor('html.insert', frVideo , true);
			modal.modal('hide');

		},'cancel','','w480 video-modal');
		$('.flat-modal').css({
			'position' : 'absolute',
			'z-index' : '1051'
		});
		$('.flat-modal').next().css('z-index','1050');
	});

	$doc.on('click','#insert-forum-attach', function(e) {
		var file = $('#uploadFile').val();
		if(file=='') {
			alert('파일을 입력/선택하세요');
			$.processOFF();
			return false;
		}
		$('#forum-attach').modal('hide');
	});
	
	$doc.on('click','#fm-secret', function(e) {
		$target = $(this).find('.fa');
		if($target.hasClass('fa-square-o')) {
			$target.removeClass('fa-square-o').addClass('fa-check-square-o');
			$(this).attr('data-secret','S');

			$('#fm-notice').find('.fa').removeClass('fa-check-square-o').addClass('fa-square-o');
			$('#fm-notice').attr('data-notice','');
		} else {
			$target.removeClass('fa-check-square-o').addClass('fa-square-o');
			$(this).attr('data-secret','');
		}
	});

	$doc.on('click','#fm-notice', function(e) {
		$target = $(this).find('.fa');
		if($target.hasClass('fa-square-o')) {
			$target.removeClass('fa-square-o').addClass('fa-check-square-o');
			$(this).attr('data-notice','N');

			$('#fm-secret').find('.fa').removeClass('fa-check-square-o').addClass('fa-square-o');
			$('#fm-secret').attr('data-secret','');
		} else {
			$target.removeClass('fa-check-square-o').addClass('fa-square-o');
			$(this).attr('data-notice','');
		}
	});

	$doc.on('click','.tpl-forum-list-arrow', function(e) {
		$(this).closest('tr').find('.tpl-forum-list-title').click();
	});

	$doc.on('click','*[class*=tpl-forum-list-] a.deleted', function(e) {
		e.preventDefault();
		$(this).showModalFlat('INFORMATION', $.lang[LANG]['board.post.deleted'], true, false, '', 'close');
		return false;
	});

	$doc.on('click','.tpl-toolbar-question-del, .tpl-toolbar-answer-del', function(e) {
		e.preventDefault();
		var option = $(this).attr('data-option'),
			id = $(this).attr('data-id'),
			target_type = $(this).closest('.tpl-qna-toolbar').attr('data-list-option');

		if(target_type == 'q') {
			var question_del_modal = $(this).showModalFlat('POST DELETE', $.lang[LANG]['board.ask-permanent-delete'], true, true, function() {
				question_del_modal.modal('hide');
				$.forum.delete(id);
			}, 'cancel');
		}
		else if(target_type == 'a') {
			$.comment.delete(id);
		}
	});

	$doc.on('click','.tpl-forum-list-title, .tpl-forum-list-cont, .tpl-forum-list-thumb, .tpl-forum-list-more, .tpl-toolbar-answer-edit, .tpl-toolbar-question-answer', function(e) {
		e.preventDefault();
		if($(this).closest('#element-display').length > 0) return false;
		if($(this).closest('[data-loop="true"]').hasClass('sample-table')) return false;
		if($(this).closest('tr.active').length > 0 && $(this).closest('.element.page-bottomlist').length > 0) return false;
		
		F_SID = (typeof SID == 'undefined') ? property.SID : SID;
		
		var option = $(this).attr('data-option'),
			id = $(this).attr('data-id'),
			forum_el = $(this).closest('.element'),
			type = $(forum_el).attr('data-forum-type'),
			pid = $(forum_el).attr('data-id'),
			page_num = $(forum_el).find('.tpl-forum-page.active').attr('data-page-num'),
			stx = ($(forum_el).find('#stx').length > 0) ? $(forum_el).find('#stx').val() : '',
			sfl = ($(forum_el).find('#sfl').length > 0) ? $(forum_el).find('#sfl').val() : '',
			scate = ($(forum_el).find('#scate').length > 0) ? $(forum_el).find('#scate').val() : '';




		if(type=='faq' && typeof MODE == 'undefined') {
			$(this).closest('tr').addClass('this');
			$(this).closest('[data-loop="true"]').find('tr').each(function() {
				var checkClick = $(this).hasClass('this'),
					checkClose = (!checkClick && $(this).find('.toggle').hasClass('open')) ? true : false;

				if(checkClick || checkClose) {
					$(this).find('.toggle').toggleClass('open');
					$(this).next().toggle();
				}
			});

			$(this).closest('[data-loop="true"]').find('tr.this').removeClass('this');

		} else {

			var checkQnAForum = (type=='qna' && !$(this).hasClass('tpl-qna-toolbar-button')) ? true : false,
				click_el = (checkQnAForum) ? $(this).closest('.qna-item') : $(this);

			if(option=='S') {
				e.preventDefault();
				$.post('/fm/access',{id:id, sid : F_SID}, function(data) {
					if(data.access == false) {
						if((data.sign == false && data.fmid == true) || (data.sign == true && data.fmid == true) || (data.sign == true && data.fmid == false)) {
							$(this).showModalFlat('INFORMATION', $.lang[LANG]['board.read-not-allowed'], true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title');
						} else {
							$(this).showModalFlat($.lang[LANG]['board.secret-password'],passwdForm(),true,true,function() {
								var $pass = $('#comm-pass'),
									isSubmit = true,
									userInput = $pass.val();
								$('label.error').remove();
								if($pass.val().length<4) {
									//$pass.after('<label class="error">' +  $.lang[LANG]['config.pass-min-length'] + '</label>').focus();
									$pass.closest('.cl-s-form-wrap').addClass('error');
									$pass.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+$.lang[LANG]['config.pass-min-length']+'</label>');
									$pass.focus();
									isSubmit = false;
								}

								if(isSubmit) {
									//$('.comment-addform.password').parent().find('.error').remove();
									$('.comment-addform.password').removeClass('error');
									$.post('/fm/password', { id: id, passwd : hex_md5($pass.val()) }, function(data) {
										if(typeof data.error != 'undefined' && data.error) {
											//$('.comment-addform.password').before('<label class="error">' + data.error + '</label>');
											$pass.closest('.cl-s-form-wrap').addClass('error');
											$pass.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+data.error+'</label>');
											return false;
										}
										var date = new Date(),
											cookietime = 20 * 60 * 1000;
							            date.setTime(date.getTime() + cookietime);

										$.cookie('hash', data.hash, { path: '/' , expires: date});
										$('.modal[id*=flat-modal]').modal('hide');

										
										if(checkQnAForum) showQnAForumAnswer(F_SID,id,option,$(click_el));
										else {
											$.forum.setForumCookie(pid,page_num,stx,sfl,scate);
											var url = forumUrl(),
												href = url + '/forum/view/' + id;

											if(typeof MODE == 'undefined') RENDER.history.pushState(null,property.TITLE,href);											
											else location.href = href;
										}
									},'json');
								}
								modalEmptyCheck();
							},'cancel','','cl-modal cl-cmmodal cl-p70 cl-s-btn w560 cl-close-btn cl-t80 board-password', false, '', function() {
								if(LANG=='ko') $('.comment-addform.password').before('<div class="board-secret-info">게시글 작성 시 설정했던 비밀번호를 입력해주세요.</div>');
            				});
						}
					} else {
						if(checkQnAForum) showQnAForumAnswer(F_SID,id,option,$(click_el));
						else {
							$.forum.setForumCookie(pid,page_num,stx,sfl,scate);

							var url = forumUrl();
							var href = url + '/forum/view/' + id;
							if(typeof MODE == 'undefined') RENDER.history.pushState(null,property.TITLE,href);
							else location.href = href;
						}
					}
				}, 'json');
			} else {
				if(checkQnAForum) showQnAForumAnswer(F_SID,id,option,$(click_el));
				else {
					$.forum.setForumCookie(pid,page_num,stx,sfl,scate);

					var url = forumUrl();
					var href = url + '/forum/view/' + id;
					if(typeof MODE == 'undefined') RENDER.history.pushState(null,property.TITLE,href);
					else location.href = href;
				}
			}
		}

	});

	var showQnAForumAnswer = function(sid,id,option,el) {
		var checkNotice = ($(el).find('.tpl-forum-list-title').hasClass('n')) ? true : false,
			checkOpen = ($(el).next().hasClass('qna-item') || $(el).next('.qna-details').css('display') == 'none') ? true : false,
			state = $(el).find('.tpl-forum-list-state').attr('data-state'),
			checkAnswer = (typeof state != 'undefined' && state == 'true') ? true : false;

			if(checkOpen) {
				var hasAnswer = $(el).next().hasClass('qna-details');

            	$.ajax({
            		url: '/fm/view',
            		dataType: 'json',
            		type: 'POST',
            		data: { id : id, sid : sid },
            		async: false,
            		cache: false,
            		success: function(data) {
            			if(typeof data.error != 'undefined' && data.error) {
            				alert(data.error);
            				location.reload();
            				return false;
            			}

            			if(!hasAnswer) {
            				var qna_container_default = '\
										<div class="tpl-qna-question">\
											<div class="tpl-qna-question-content"></div>\
										</div>\
										<div class="tpl-qna-answer">\
											<span class="tpl-qna-answer-name"></span>\
											<div class="tpl-qna-answer-content"></div>\
										</div>\
            					',
            					detail_html = $(el).clone(),
            					detail = document.createElement('div');
            				$(detail).html(detail_html);

            				if($(detail).children().first().is('tr')) {
            					$(detail).find('.qna-details *[class*=tpl-forum-list-]:not(.tpl-forum-list-content)').html('');
            					$(detail).find('.qna-details .tpl-forum-list-content').addClass('tpl-qna-container').html(qna_container_default);
								$(detail).find('.qna-details').hide();
            				} else {
            					$(detail).children().first().addClass('tpl-qna-container').html(qna_container_default);
            				}

            				$(el).after($(detail).html()).hide();
            				$(detail).remove();
            			}




						var question_del = (data.own || data.mgr) ? '\
														<li class="tpl-qna-toolbar-button tpl-toolbar-question-del pull-right" data-id="' + id + '" data-option="' + option + '">\
															<button type="button" class="btn btn-default"><span>' + $.lang[LANG]['board.button.delete'] + '</span></button>\
														</li>\
							' : '',
							question_edit = (data.own) ? '\
														<li class="tpl-qna-toolbar-button tpl-toolbar-question-edit pull-right" data-id="' + id + '" data-option="' + option + '" data-pid="' +  data.pid + '">\
															<button type="button" class="btn btn-default"><span>' + $.lang[LANG]['board.button.modify'] + '</span></button>\
														</li>\
							' : '',
							question_answer = (data.mgr && option!= 'N') ? '\
														<li class="tpl-qna-toolbar-button tpl-toolbar-question-answer pull-right" data-id="' + id + '" data-option="' + option + '" >\
															<button type="button" class="btn btn-default"><span>' + $.lang[LANG]['forum.qna.answer.write.btn'] + '</span></button>\
														</li>\
							' : '',
							question_toolbar = (question_del || question_edit || question_answer) ? '\
													<ul class="tpl-qna-toolbar clearfix" data-list-option="q">\
													' + question_del + question_edit + question_answer + '\
													</ul>\
							' : '';

						if($(el).next('.qna-details').find('.tpl-qna-toolbar[data-list-option="q"]').length == 0 ) $(el).next('.qna-details').find('.tpl-qna-question').append(question_toolbar);
						else $(el).next('.qna-details').find('.tpl-qna-question .tpl-qna-toolbar').replaceWith(question_toolbar);

            			if(data.check_answer) {
	            			$.each(data.answer, function(i,v) {
	            				var answer_del = (v.own || v.mgr) ? '\
														<li class="tpl-qna-toolbar-button tpl-toolbar-answer-del pull-right" data-id="' + v.seq + '" data-option="' + option + '" >\
															<button type="button" class="btn btn-default"><span>' + $.lang[LANG]['board.button.delete'] + '</span></button>\
														</li>\
	            					' : '',
	            					answer_edit = (v.own) ? '\
														<li class="tpl-qna-toolbar-button tpl-toolbar-answer-edit pull-right" data-id="' + id + '" data-option="' + option + '">\
															<button type="button" class="btn btn-default"><span>' + $.lang[LANG]['board.button.modify'] + '</span></button>\
														</li>\
	            					' : '',
	            					answer_toolbar = (answer_del || answer_edit) ? '\
													<ul class="tpl-qna-toolbar clearfix" data-list-option="a">\
													 ' + answer_del + answer_edit + '\
													</ul>\
									' : '';

	            				$(el).next('.qna-details').find('.tpl-qna-answer-name').html(v.name);
	            				$(el).next('.qna-details').find('.tpl-qna-answer-content').html(v.content);

	            				if($(el).next('.qna-details').find('.tpl-qna-toolbar[data-list-option="a"]').length == 0 ) $(el).next('.qna-details').find('.tpl-qna-answer').append(answer_toolbar);
	            				else $(el).next('.qna-details').find('.tpl-qna-answer .tpl-qna-toolbar').replaceWith(answer_toolbar);
	            			});

            			} else {
            				$(el).next('.qna-details').find('.tpl-qna-answer').hide();
            			}
            			$(el).next('.qna-details').show().siblings('.qna-details').hide();

            		}
            	});

			} else {
				$(el).next('.qna-details').hide();
			}


	}


    $(document).on('paste','.note-editable',function(event) {
        event.preventDefault();
        if(window.clipboardData) {
            var text = window.clipboardData.getData('Text');
            if (window.getSelection) { // IE11
                window.getSelection().getRangeAt(0).insertNode(document.createTextNode(text));
            } else if (document.selection && document.selection.createRange) { // old IE
                text = text.replace(/\n/g, "<br />");
                document.selection.createRange().pasteHTML(text);
            }
        } else {
            var text = (event.originalEvent || event).clipboardData.getData('text/plain') || prompt('Paste something..');
            text = text.replace(/\n/g, '<br />');
            window.document.execCommand('insertHtml', false, text);
        }
    });

	$(document).on('mousedown mouseup keydown keyup','.fr-view',function(e) {
		selRange = saveSelection();
	});
	$(document).on('mousedown mouseup keydown keyup','.fr-dib',function(e) {
		scrollPos = $('#forum-modal').scrollTop();
		scrollPos2 = $('#forum-modal').scrollTop();
	});
	$(document).on('click','button[data-event="showLinkDialog"]', function(e) {
		restoreSelection(selRange);
	});

	$(document).on('click','.set-image', function(e) {
		var src = $(this).closest('.result-file').attr('data-file');
		$('.fr-view').focus();
		if(!$('.fr-view').is(':focus')) {
			// placeCaretAtEnd($('.fr-view').get(0));
		}

		if(upTYPE == 'image') $('#fm-editor').froalaEditor('image.insert', 'http:' + file, true);
		else $('#fm-editor').froalaEditor('file.insert', 'http:' + file, orig_name, { 'link' : 'http:' + file, 'target': '_blank' });
	});

	$(document).on('click','.file-delete', function(e){
		var select_file = $(this).parent().attr('data-file-name'),
			click_file = $(this).parent().attr('data-file'),
			user_file = $('.result-file').map(function() {
							return $(this).attr('data-file-name');
						}).get().join(',');
			$file = $(this).parent();

		var modal = $(this).showModalFlat('INFORMATION',$.lang[LANG]['board.ask-delete-attached-file'], true, true, function() {
			$.post('/fm/attach_delete',{ select_file : select_file, user_file : user_file }, function(data){
				$('.flat-modal').next().remove();
				$('.flat-modal').remove();
				$file.fadeOut().remove();
				$('img[src="' + click_file + '"]').fadeOut('fast',function() { $(this).remove(); });
			}, 'json');
		}, 'cancel');
	});

	$(document).on('focus','#fm-editor',function(e) {
		$(this).removeClass('content-empty');
		// placeCaretAtEnd($('.fr-view').get(0));
	}).on('focusout','#fm-editor', function(e) {
		setPlaceholder($(this));
	});

	var setPlaceholder = function($editor) {
		var empty = ($editor.find('.fr-view').html()=="<p><br></p>") ? true : false;
		(empty) ? $editor.addClass('content-empty') : $editor.removeClass('content-empty');
	}

	var updateForumPost = function(id,pid) {

		var idstr = (id) ? '/m/u/id/' + id : '';
		$.post('/fm/info', { id : id, sid : F_SID }, function(data) {
			if(typeof data.error != 'undefined' && data.error) {
				$(this).showModalFlat('ERROR',data.error,true,false,'','ok');
				return false;
			}
			var post_data = data;
			if(data.fmid && data.sign == false) {
				userLogin();
				return false;
			}

			if(data.sign == false) {
				$(this).showModalFlat($.lang[LANG]['board.button.modify.password'],passwdForm(),true,true,function() {
					var $pass = $('#comm-pass'),
						isSubmit = true,
						userInput = $pass.val();
					$('label.error').remove();
					if($pass.val().length<4) {
						//$pass.after('<label class="error">' +  $.lang[LANG]['config.pass-min-length'] + '</label>').focus();
						$pass.closest('.cl-s-form-wrap').addClass('error');
						$pass.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+$.lang[LANG]['config.pass-min-length']+'</label>');
						$pass.focus();
						isSubmit = false;
					}

					if(isSubmit) {
						//$('.comment-addform.password').parent().find('.error').remove();
						$.post('/fm/password',{ id: id, passwd : hex_md5($pass.val()) }, function(data) {
							if(typeof data.error != 'undefined' && data.error) {
								//$(this).showModalFlat('ERROR',data.error,true,false,'','ok');
								//$('.comment-addform.password').before('<label class="error">' + data.error + '</label>');
								$pass.closest('.cl-s-form-wrap').addClass('error');
								$pass.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+data.error+'</label>');
								return false;
							}
							var date = new Date(),
								cookietime = 20 * 60 * 1000;
				            date.setTime(date.getTime() + cookietime);

							$.cookie('hash', data.hash, { path: '/' , expires: date});
							$('.modal[id*=flat-modal]').modal('hide');
							setWriteUser(post_data, function() {
								location.href = '/post/t/' + PAGE_MODE + idstr + '/pid/' + pid;
								// forumWrite(id,pid);
							});
						},'json');
					}
					modalEmptyCheck();
				},'cancel','','cl-modal cl-cmmodal cl-p70 cl-s-btn w560 cl-close-btn cl-t80 board-password');
			} else if(data.own == true || data.mgr_edit == true) {				
				setWriteUser(data, function() {
					location.href = '/post/t/' + PAGE_MODE + idstr + '/pid/' + pid;
					// forumWrite(id,pid);
				});
			} else alert($.lang[LANG]['board.not-own-no-edit']);

		}, 'json');
	}

	var userLogin = function() {
		var id = $('#fm-id').val(),
			pid = $('#fm-pid').val(),
			info = $.lang[LANG]['re-login.info'];

		$.post('/fm/checkUser', { pid : pid }, function(data) {
			if(!data.user || typeof data.user == 'undefined') {
				if(typeof data.error != 'undefined' && data.error) {
					$(this).showModalFlat('ERROR',data.error,true,false,'','ok');
					return false;
				}
				var modal = $(this).showModalFlat($.lang[LANG]['config.postforum'], info + signForm(id,pid,data.access,data.stoken),true,true,function() {
					var isSubmit = true;
					$('.error').remove();

					var $name = $('#comm-name'),
						$pass = $('#comm-pass'),
						$key = $('#wr_key'),
						nameLength = getBytes( $name.val() );

					if( nameLength==0) {
						$name.after('<label class="error">' +  $.lang[LANG]['config.enter-name'] + '</label>').focus();
						isSubmit = false;
					}
					else if ( nameLength > 20 ) {
						$name.after('<label class="error">' +  $.lang[LANG]['config.guest-id-max-length'] + '</label>').focus();
						isSubmit = false;
					}
					if($pass.val().length<4) {
						$pass.after('<label class="error">' +  $.lang[LANG]['config.pass-min-length'] + '</label>').focus();
						isSubmit = false;
					}

					if($key.val().length==0) {
						$key.after('<label class="error">' +  $.lang[LANG]['config.enter-captcha'] + '</label>').focus();
						isSubmit = false;
					}

					if($key.val() && (Base64.encode($key.val().trim()) != md5_norobot_key)) {
						$key.after('<label class="error">' +  $.lang[LANG]['config.wrong-captcha'] + '</label>').focus();
						isSubmit = false;
					}

					// var key = '';
					// if(isSubmit == true) {
					// 	key = checkCaptcha();
					// 	if(!key.success) {
					// 		$key.after('<label class="error">' +  $.lang[LANG]['config.wrong-captcha'] + '</label>').focus();
					// 		isSubmit = false;
					// 	}
					// }

					resetObject(user);
					if(isSubmit==true) {
						modal.modal('hide');
						user.name = data.name = $name.val();
						user.nameLength = nameLength;
						user.pass = hex_md5( $pass.val() );
						user.key = $key.val().trim();
						setWriteUser(data);
					}
				},'cancel','','w450',true,'',function() {
					// loadCaptcha();
					load_kcaptcha();
				});
				$('.flat-modal .modal-body').addClass('comment');
				$('.flat-modal .modal-footer').hide();
				$('.modal[id*=flat-modal]').css('z-index','1040');
				$('.flat-modal').next('.modal-backdrop').css('z-index','1039');
				if(!user.pass) $('.flat-modal .signType').last().hide();
				// $('#kcaptcha').click();
			} else {
				// resetObject(user);
				setWriteUser(data);
			}
		},'json');
	}

	var passwdForm = function() {
		return '' +
			'<div class="cl-s-form-wrap comment-addform password">' +
				'<div class="cl-s-form-group">' +
					'<input type="password" class="cl-s-form-control" id="comm-pass" name="comm-pass" required="required" value="">' +
					'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['config.modal.password'] + '</label>' +
				'</div>' +
			'</div>';
	}
	var videoForm = function() {
		return '' +
			'<div class="form-inline comment-addform video">' + 
			  	'<div class="form-group">' +
			  		'<p><b>Video URL?</b> (YouTube, Vimeo, SoundCloud, Metacafe or DailyMotion)</p>' + 
			    	'<label class="sr-only" for="label-video">' +  $.lang[LANG]['config.modal.password'] + '</label>' +
			    	'<input type="text" class="form-control" id="video-url" placeholder="http(s)://">' +
			  	'</div>' +
			'</div>';
	}


	var modalEmptyCheck = function() {
		$('.cl-s-form-control').off().on({
			keyup: function(e) {
				if(e.keyCode === 13) {
					if($(this).closest('.cl-s-form-wrap').next('.cl-s-form-wrap').length > 0) {
						$(this).closest('.cl-s-form-wrap').next('.cl-s-form-wrap').find('.cl-s-form-control').focus();
					} else if($(this).closest('.cl-s-form-wrap').next('#captcha:not(:empty)').length > 0) {
						$('#wr_key').focus();
					}
				}
			},
			focus: function(e) {
				$(this).closest('.cl-s-form-wrap').addClass('active');
			},
			blur: function(e) {
				var inputEL = $(this),
					type = $(this).attr('id'),
					val = $(this).val().trim(),
					error_str = '';

				inputEL.closest('.cl-s-form-wrap').removeClass('active');
				if(val.length == 0) {
					inputEL.closest('.cl-s-form-wrap').removeClass('error').addClass('empty');
					inputEL.closest('.cl-s-form-wrap').find('.cl-s-control-label.error').remove();
					return false;
				} else {
					inputEL.closest('.cl-s-form-wrap').removeClass('empty');
					var error_str = '';
					if(type == 'comm-pass') {
						if(val.length<4) {
							error_str = '<svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>' + $.lang[LANG]['config.pass-min-length'];
						}
					}
					if(error_str.length > 0) {
						inputEL.closest('.cl-s-form-wrap').addClass('error');
						if(inputEL.parent().parent().find('.cl-s-control-label.error').length > 0) {
							inputEL.parent().parent().find('.cl-s-control-label.error').html(error_str);
						} else {
							inputEL.parent().parent().next('.cl-s-control-label.error').remove();
							inputEL.parent().parent().after('<label for="input" class="cl-s-control-label error">'+error_str+'</label>');
						}
						return false;
					}
				}
				inputEL.closest('.cl-s-form-wrap').removeClass('error').removeClass('empty');
				inputEL.parent().parent().next('.cl-s-control-label.error').remove();
				if($('.error_login').length > 0) $('.error_login').remove();
			}
		});
		$('#wr_key').off().on({
			keyup: function(e) {
				$(this).closest('.kcaptcha-box').removeClass('empty').removeClass('error');
			},
			focus: function(e) {
				$(this).closest('.kcaptcha-box').addClass('active');
			},
			blur: function(e) {
				if($(this).val().trim().length == 0) {
					$(this).closest('.kcaptcha-box').removeClass('active');
				} else {
					$(this).closest('.kcaptcha-box').removeClass('empty').removeClass('error').removeClass('active');
				}
				$(this).closest('.kcaptcha-box').parent().find('.kcaptcha-error').remove();
			}
		});
	}


	$(document).on('click','.tpl-forum-write',function(e) {
		var sid = (typeof property == 'undefined') ? SID : property.SID,
			pid = $(this).attr('data-pid'),
			id = (typeof $(this).attr('data-id') != 'undefined') ? $(this).attr('data-id') : '',
			reply = (typeof $(this).attr('data-reply') != 'undefined') ? $(this).attr('data-reply') : '';

		try {
			var validType = property['VALIDTYPE'];
		} catch (err) {
			var validType = '';
		}

		var idstr = (id) ? '/m/u/id/' + id : '',
			replystr = (reply) ? '/reply/' + reply : '';

		if(id) {
			updateForumPost(id,pid);
			return false;
		}

		var url = '/post/t/' + PAGE_MODE + idstr + '/pid/' + pid + replystr;
		$.post('/fm/checkUser', { pid : pid, reply : reply, id : id }, function(data) {
			if(!data.user || typeof data.user == 'undefined') {
				if(typeof data.error != 'undefined' && data.error) {
					$(this).showModalFlat('ERROR',data.error,true,false,'','ok');
					return false;
				}

				var action = (validType == 'SM') ? '/_login' : '/_cllogin',
					html = '\
						<form name="write_login_form" id="write_login_form" method="post" action="' + action + '" style="display:none;">\
							<input type="hidden" name="status" value="write">\
							<input type="hidden" name="sid" value="'+sid+'">\
							<input type="hidden" name="url" value="'+url+'">\
							<input type="hidden" name="pid" value="'+pid+'">\
							<input type="hidden" name="pid_type" value="forum">\
							<input type="hidden" name="page_mode" value="'+data.access+'">\
							<input type="hidden" name="reply" value="'+reply+'">\
							<input type="hidden" name="id" value="'+id+'">\
						</form>\
					';

				$('body').append(html);
				document.write_login_form.submit();

				/*
				if (validType == 'SM') {
					var html = '<form name="write_login_form" id="write_login_form" method="post" action="/_login" style="display:none;">\
									<input type="hidden" name="status" value="write">\
									<input type="hidden" name="url" value="'+url+'">\
									<input type="hidden" name="pid" value="'+pid+'">\
									<input type="hidden" name="pid_type" value="forum">\
									<input type="hidden" name="reply" value="'+reply+'">\
									<input type="hidden" name="id" value="'+id+'">\
									<input type="hidden" name="page_mode" value="'+data.access+'">\
								</form>';

					$('body').append(html);
					document.write_login_form.submit();
				} else {
					// FREE or BN login
					var html = '<form name="write_cllogin_form" id="write_cllogin_form" method="post" action="/_cllogin" style="display:none;">\
									<input type="hidden" name="status" value="write">\
									<input type="hidden" name="sid" value="'+F_SID+'">\
									<input type="hidden" name="url" value="'+url+'">\
									<input type="hidden" name="pid" value="'+pid+'">\
									<input type="hidden" name="pid_type" value="forum">\
									<input type="hidden" name="reply" value="'+reply+'">\
									<input type="hidden" name="id" value="'+id+'">\
									<input type="hidden" name="page_mode" value="'+data.access+'">\
								</form>';

					$('body').append(html);
					document.write_cllogin_form.submit();
				}
				*/

			} else {
				setWriteUser(data, function() {
					location.href = url;
				});
			}
		},'json');
//asdf


	
				// return false;


				// var modal_str = signForm(id,pid,data.access,data.stoken);
				// if(typeof modal_str != 'string') return false;
				// var modal = $(this).showModalFlat($.lang[LANG]['config.postforum'],modal_str,true,true,function() {

				// 	var isSubmit = true;
				// 	//$('.error').remove();
				// 	var $name = $('#comm-name'),
				// 		$pass = $('#comm-pass'),
				// 		$key = $('#wr_key'),
				// 		nameLength = getBytes( $name.val() );

				// 	$('.kcaptcha-error').remove();
				// 	$('label.error').remove();

				// 	if( nameLength==0) {
				// 		//$name.after('<label class="error">' +  $.lang[LANG]['config.enter-name'] + '</label>').focus();
				// 		$name.closest('.cl-s-form-wrap').addClass('empty');
				// 		$name.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+$.lang[LANG]['config.enter-name']+'</label>');
				// 		isSubmit = false;
				// 	}
				// 	else if ( nameLength > 20 ) {
				// 		//$name.after('<label class="error">' +  $.lang[LANG]['config.guest-id-max-length'] + '</label>').focus();
				// 		$name.closest('.cl-s-form-wrap').addClass('empty');
				// 		$name.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+$.lang[LANG]['config.guest-id-max-length']+'</label>');
				// 		isSubmit = false;
				// 	}
				// 	if($pass.val().length<4) {
				// 		//$pass.after('<label class="error">' +  $.lang[LANG]['config.pass-min-length'] + '</label>').focus();
				// 		$pass.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+$.lang[LANG]['config.pass-min-length']+'</label>');
				// 		$pass.closest('.cl-s-form-wrap').addClass('empty');
				// 		isSubmit = false;
				// 	}
				// 	// if($('#recaptcha').attr('data-res')=='') {
				// 	// 	$key.after('<label class="error">' +  $.lang[LANG]['config.enter-captcha'] + '</label>').focus();
				// 	// 	isSubmit = false;
				// 	// }

				// 	if($key.val().length==0) {
				// 		//$key.after('<label class="error">' +  $.lang[LANG]['config.enter-captcha'] + '</label>').focus();
				// 		$key.closest('.kcaptcha-box').addClass('empty');
				// 		$key.closest('.kcaptcha-box').after('<label class="error kcaptcha-error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>' +  $.lang[LANG]['config.wrong-captcha'] + '</label>').focus();
				// 		isSubmit = false;
				// 	}

				// 	if($key.val() && (Base64.encode($key.val().trim()) != md5_norobot_key)) {
				// 		//$key.after('<label class="error">' +  $.lang[LANG]['config.wrong-captcha'] + '</label>').focus();
				// 		$key.closest('.kcaptcha-box').addClass('error');
				// 		$key.closest('.kcaptcha-box').after('<label class="error kcaptcha-error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>' +  $.lang[LANG]['config.wrong-captcha'] + '</label>').focus();
				// 		// console.log('input value :' + $key.val());
				// 		// console.log('hex_md5 : ' + Base64.encode($key.val().trim()));
				// 		// console.log('key : ' + md5_norobot_key);
				// 		isSubmit = false;
				// 	}

				// 	// var key = '';
				// 	// if(isSubmit == true) {
				// 	// 	key = checkCaptcha();
				// 	// 	if(!key.success) {
				// 	// 		$key.after('<label class="error">' +  $.lang[LANG]['config.wrong-captcha'] + '</label>').focus();
				// 	// 		isSubmit = false;
				// 	// 	}
				// 	// }

				// 	modalEmptyCheck();

				// 	if($('.tab-pane.active .empty, .tab-pane.active .error').length > 0) {
				// 		$('.tab-pane.active .empty').find('input').eq(0).focus();
				// 		isSubmit = false;
				// 		return false;
				// 	}


				// 	resetObject(user);
				// 	if(isSubmit==true) {
				// 		$('.modal[id*=flat-modal]').modal('hide');
				// 		user.name = data.name = $name.val();
				// 		user.nameLength = nameLength;
				// 		user.pass = hex_md5( $pass.val() );
				// 		user.key = $key.val().trim();
				// 		setWriteUser(data,function() {
				// 			location.href = '/post/t/' + PAGE_MODE + idstr + '/pid/' + pid + replystr;
				// 			// forumWrite(id,pid,reply);
				// 		});
				// 	}
				// },'cancel','','cl-modal cl-cmmodal cl-p130 cl-s-btn cl-close-btn w560 block-write','','',function() {
				// 	// loadCaptcha();
				// 	load_kcaptcha();
				// });
				// $('.flat-modal .modal-body').addClass('comment');
				// $('body').addClass('no-fixed');
				// if($('.flat-modal .modal-body .comment-signForm').hasClass('default-mode') || $('.flat-modal .modal-body .comment-signForm').hasClass('sitemember-mode')) 
				// 	$('.flat-modal .modal-footer').hide();
				// // $('#kcaptcha').click();

	});

	// $(document).on('click','.tpl-forum-write, .tpl-toolbar-question-edit',function(e) {
	$(document).on('click','.tpl-toolbar-question-edit',function(e) {
		var id = $(this).attr('data-id'),
			pid = $(this).attr('data-pid'),
			reply = $(this).attr('data-reply');
		try {
			var validType = property['VALIDTYPE'];
		} catch (err) {
			var validType = '';
		}
		
		id = (typeof id == 'undefined') ? '' : id;
		reply = (typeof reply == 'undefined') ? '' :reply;

		var idstr = (id) ? '/m/u/id/' + id : '',
			replystr = (reply) ? '/reply/' + reply : '';

		// location.href = '/post/t/' + F_MODE + idstr + '/pid/' + pid + replystr;

		if(id) {
			updateForumPost(id,pid);
			return false;
		}

		$.post('/fm/checkUser', { pid : pid, reply : reply, id : id }, function(data) {
			if(!data.user || typeof data.user == 'undefined') {
				if(typeof data.error != 'undefined' && data.error) {
					$(this).showModalFlat('ERROR',data.error,true,false,'','ok');
					return false;
				}

				if (validType == 'SM') {
					var url = '/post/t/' + PAGE_MODE + idstr + '/pid/' + pid + replystr;
					var status = 'write';

					var html = '<form name="write_login_form" id="write_login_form" method="post" action="/_login" style="display:none;">\
									<input type="hidden" name="status" value="'+status+'">\
									<input type="hidden" name="url" value="'+url+'">\
									<input type="hidden" name="pid" value="'+pid+'">\
									<input type="hidden" name="page_mode" value="'+data.access+'">\
									<input type="hidden" name="reply" value="'+reply+'">\
									<input type="hidden" name="id" value="'+id+'">\
								</form>';

					$('body').append(html);
					document.write_login_form.submit();
					return false;
				}

				var modal_str = signForm(id,pid,data.access,data.stoken);
				if(typeof modal_str != 'string') return false;
				var modal = $(this).showModalFlat($.lang[LANG]['config.postforum'],modal_str,true,true,function() {

					var isSubmit = true;
					//$('.error').remove();
					var $name = $('#comm-name'),
						$pass = $('#comm-pass'),
						$key = $('#wr_key'),
						nameLength = getBytes( $name.val() );

					$('.kcaptcha-error').remove();
					$('label.error').remove();

					if( nameLength==0) {
						//$name.after('<label class="error">' +  $.lang[LANG]['config.enter-name'] + '</label>').focus();
						$name.closest('.cl-s-form-wrap').addClass('empty');
						$name.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+$.lang[LANG]['config.enter-name']+'</label>');
						isSubmit = false;
					}
					else if ( nameLength > 20 ) {
						//$name.after('<label class="error">' +  $.lang[LANG]['config.guest-id-max-length'] + '</label>').focus();
						$name.closest('.cl-s-form-wrap').addClass('empty');
						$name.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+$.lang[LANG]['config.guest-id-max-length']+'</label>');
						isSubmit = false;
					}
					if($pass.val().length<4) {
						//$pass.after('<label class="error">' +  $.lang[LANG]['config.pass-min-length'] + '</label>').focus();
						$pass.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+$.lang[LANG]['config.pass-min-length']+'</label>');
						$pass.closest('.cl-s-form-wrap').addClass('empty');
						isSubmit = false;
					}
					// if($('#recaptcha').attr('data-res')=='') {
					// 	$key.after('<label class="error">' +  $.lang[LANG]['config.enter-captcha'] + '</label>').focus();
					// 	isSubmit = false;
					// }

					if($key.val().length==0) {
						//$key.after('<label class="error">' +  $.lang[LANG]['config.enter-captcha'] + '</label>').focus();
						$key.closest('.kcaptcha-box').addClass('empty');
						$key.closest('.kcaptcha-box').after('<label class="error kcaptcha-error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>' +  $.lang[LANG]['config.wrong-captcha'] + '</label>').focus();
						isSubmit = false;
					}

					if($key.val() && (Base64.encode($key.val().trim()) != md5_norobot_key)) {
						//$key.after('<label class="error">' +  $.lang[LANG]['config.wrong-captcha'] + '</label>').focus();
						$key.closest('.kcaptcha-box').addClass('error');
						$key.closest('.kcaptcha-box').after('<label class="error kcaptcha-error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>' +  $.lang[LANG]['config.wrong-captcha'] + '</label>').focus();
						// console.log('input value :' + $key.val());
						// console.log('hex_md5 : ' + Base64.encode($key.val().trim()));
						// console.log('key : ' + md5_norobot_key);
						isSubmit = false;
					}

					// var key = '';
					// if(isSubmit == true) {
					// 	key = checkCaptcha();
					// 	if(!key.success) {
					// 		$key.after('<label class="error">' +  $.lang[LANG]['config.wrong-captcha'] + '</label>').focus();
					// 		isSubmit = false;
					// 	}
					// }

					modalEmptyCheck();

					if($('.tab-pane.active .empty, .tab-pane.active .error').length > 0) {
						$('.tab-pane.active .empty').find('input').eq(0).focus();
						isSubmit = false;
						return false;
					}


					resetObject(user);
					if(isSubmit==true) {
						$('.modal[id*=flat-modal]').modal('hide');
						user.name = data.name = $name.val();
						user.nameLength = nameLength;
						user.pass = hex_md5( $pass.val() );
						user.key = $key.val().trim();
						setWriteUser(data,function() {
							location.href = '/post/t/' + PAGE_MODE + idstr + '/pid/' + pid + replystr;
							// forumWrite(id,pid,reply);
						});
					}
				},'cancel','','cl-modal cl-cmmodal cl-p130 cl-s-btn cl-close-btn w560 block-write','','',function() {
					// loadCaptcha();
					load_kcaptcha();
				});
				$('.flat-modal .modal-body').addClass('comment');
				$('body').addClass('no-fixed');
				if($('.flat-modal .modal-body .comment-signForm').hasClass('default-mode') || $('.flat-modal .modal-body .comment-signForm').hasClass('sitemember-mode')) 
					$('.flat-modal .modal-footer').hide();
				// $('#kcaptcha').click();
			} else {
				// resetObject(user);

				setWriteUser(data, function() {
					location.href = '/post/t/' + PAGE_MODE + idstr + '/pid/' + pid + replystr;
					// forumWrite(id,pid,reply);
				});
			}
		},'json');
	});

	$(document).on('click','.tpl-forum-list',function(e) {
		// $.cookie('gallery','.' + F_PARENT.element, { path: '/' });
		$.cookie('forum-item',F_PARENT.pid, { path: '/' });
		if(PAGE_MODE != 'c') {
			var url = (PAGE_MODE=='s') ? '/' : '/render/',
				uri = (F_ONE) ? url + 'index#' + F_PARENT.page : url + F_PARENT.page;

			var hash = uri.split('#');
			if(hash.length>1) {
				RENDER.history.pushState(null,property.TITLE,hash[0]);
				history.pushState('', '', hash[0] + '#' + hash[1]);
			} else {
				RENDER.history.pushState(null,property.TITLE,uri);
			}
			// (F_ONE) ? location.replace(url + '#' + F_PARENT.page) : location.replace(url + F_PARENT.page);	
			// (F_ONE) ? location.replace('/' + url + '/index#') + F_PARENT.page : location.replace('/' + url + '/' + F_PARENT.page);	
		} else {
			(F_ONE) ? location.replace('/'+CONFIG_URL+'config/page/index#') + F_PARENT.page : location.replace('/'+CONFIG_URL+'config/page/' + F_PARENT.page);
		}
	});

	$(document).on('click','.tpl-forum-delete',function(e) {
		var id = $(this).attr('data-id');
		var modal = $(this).showModalFlat($.lang[LANG]['board.ask-permanent-delete.title'], $.lang[LANG]['board.ask-permanent-delete'], true, true, function() {
			modal.modal('hide');
			$.forum.delete(id);
		}, 'cancel', $.lang[LANG]['config.delete'],'cl-cmmodal cl-s-btn w560 cl-p130 cl-p0 cl-t80 cl-modal cl-none-title cl-close-btn');
	});

	$(document).on('click','.tpl-forum-page', function(e) {
		e.preventDefault();
		if($(this).closest('.element').find('[data-loop="true"]').hasClass('sample-table')) return false;
		var id = $(this).attr('data-id'),
			page = $(this).attr('data-page'),
			page_num = $(this).attr('data-page-num'),
			view = $(this).attr('data-view'),
			forum_el = $(this).closest('.element'),
			sfl = ($(forum_el).find('.search-box #sfl').length > 0) ? $(forum_el).find('.search-box #sfl').val() : "",
			stx = ($(forum_el).find('.search-box #stx').length > 0) ? $(forum_el).find('.search-box #stx').val() : "",
			scate = ($(forum_el).find('.search-box #scate').length > 0) ? $(forum_el).find('.search-box #scate').val() : "";

		$.forum.setForumCookie(id,page_num,stx,sfl,scate);
		cookie_page_num = $.cookie('forum_'+id);
		$.forum.init(id,page,view,cookie_page_num,sfl,stx,scate);
		activeEL('userEL'+id);
	});

	$(document).on('click','.forum-login',function(e) {

//***********************************************************************************************************************바꾸기 아래
		// live
			// isGabia = (F_SERVICE.indexOf('gabia') > -1) ? true : false,

		// gabia test
			// isGabia = (F_SERVICE.indexOf('gabia') == -1) ? true : false,

		var forumLoginModal = $(this).closest('.modal'),
			id = $(this).attr('data-id'),
			pid = $(this).attr('data-pid'),
			F_SERVICE = (typeof SERVICE == 'undefined') ? property.SERVICE : SERVICE,
			F_VALIDTYPE = (typeof VALIDTYPE == 'undefined') ? property.VALIDTYPE : VALIDTYPE,
			F_SITEUM = (typeof SITEUM == 'undefined') ? property.SITEUM : SITEUM,
			isGabia = (F_SERVICE.indexOf('gabia') > -1) ? true : false,
			login_type = (isGabia || F_VALIDTYPE=='SM' || (F_VALIDTYPE=='BN' && F_SITEUM > 0)) ? 'um' : 'mb';

		$('.comment .error').remove();

		var $input_id = $('#'+login_type+'_forum_id'),
			$input_password = $('#'+login_type+'_forum_password'),
			isSubmit = true,
			idErrorTxt = (isGabia || F_VALIDTYPE=='SM' || (F_VALIDTYPE=='BN' && F_SITEUM > 0)) ? $.lang[LANG]['config.enter-id'] : $.lang[LANG]['config.enter-email'];

		if($input_id.val().length==0) {
			//$input_id.after('<label class="error">! ' +  $.lang[LANG]['config.enter-id'] + '</label>').focus();
			//$input_id.closest('.cl-s-form-wrap').addClass('empty');
			$input_id.closest('.cl-s-form-wrap').addClass('empty');
			$input_id.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+idErrorTxt+'</label>');
			isSubmit = false;
		}

		if($input_password.val().length==0) {
			//$input_password.after('<label class="error">! ' +  $.lang[LANG]['config.enter-password'] + '</label>').focus();
			//$input_password.closest('.cl-s-form-wrap').addClass('empty');
			$input_password.closest('.cl-s-form-wrap').addClass('empty');
			$input_password.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+$.lang[LANG]['config.enter-password']+'</label>');
			isSubmit = false;
		}

		modalEmptyCheck();

		if($('.tab-pane.active .empty, .tab-pane.active .error').length > 0) {
			$('.tab-pane.active .empty').find('input').eq(0).focus();
			isSubmit = false;
			return false;
		}

		if(isSubmit) {
			var sid = (typeof MODE == 'undefined') ? '' : SID; //config outlogin limit
			var login_success_fnc = function() {
				$('button.close').click();
				if(RELOAD) {
					// $.cookie('gallery','.' + F_PARENT.element, { path: '/' });
					location.reload();
				}
				if(typeof MODE == 'undefined') RENDER.setLoginout(property.LOGINOUT, property.SID, 1, property.PROFILEIMG);
				//forumWrite(id,pid);
			}

			if(login_type == 'mb') {
				$.post('/member/login/outlogin', { mb_id : $input_id.val(), mb_password : $input_password.val(), sid : sid}, function(data) {
					if(typeof data.error != 'undefined' && data.error) {
						$('.tab-pane.active').find('.bottom-box.text-right').before('<label class="error text-center error_login"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg><span>' + data.error + '</span></label>');
						$('.cl-s-form-group input').val('');
						$('.tab-pane.active').find('.cl-s-form-wrap').addClass('empty');
						return false;
					}
					login_success_fnc();
				}, 'json');

			} else {

				var input_data = {
					'id' : $input_id.val().toLowerCase(),
					'password' : hex_md5($input_password.val()),
				};

				$.post('/umember/login/in', { sid : sid, data : JSON.stringify(input_data) }, function(data) {
					if (data.result == 'fail') {
						alert(data.message);
						return false;
					} else {
						$.umember.init();
						login_success_fnc();

						if(data.result == 'success') {
							if(typeof data.ss_url != 'undefined' && data.ss_url) {
								$.each(data.ss_url, function(i,url) {
									$('.dsgn-body').after('<img class="auth-img" src="' + ss_url + '">');
								});
							}
						}
					}
					/*
					if(typeof data.error != 'undefined' && data.error) {
						$.each(data.error, function(key,str) {
							if(forumLoginModal.find('#um_forum_'+key).length > 0 ) {
								forumLoginModal.find('#um_forum_'+key).after('<span class="error">' + str + '</span>');
							} else { 
								$('.comment-signForm').after("<label class='error text-center'>" + str + "</label>"); 
							}
						});
						if(forumLoginModal.find('.error').length > 0) return false;
					}

					$.umember.init();
					login_success_fnc();

					if(data.member.check_login) {
						if(typeof data.ss_url != 'undefined' && data.ss_url) {
							$.each(data.ss_url, function(i,url) {
								$('.dsgn-body').after('<img class="auth-img" src="' + ss_url + '">');
							});
						}
					}
					*/					

				},'json');

			}
		}
	});	

	$.forum = {
		init : function(id, page, view, page_num, sfl, stx, scate) {
			F_PARENT = (typeof PARENT == 'undefined') ? property.PARENT : PARENT;
			F_ONE = (typeof ONE == 'undefined') ? property.ONE : ONE;
			F_SID = (typeof SID == 'undefined') ? property.SID : SID;
			F_PAGE = (typeof PAGE == 'undefined') ? property.PAGE : PAGE;

			var page_num = (typeof page_num == 'undefined' || page_num == 'NaN') ? 1 : page_num,
				sfl = (typeof sfl == 'undefined') ? 'all' : sfl, 
				stx = (typeof stx == 'undefined') ? '' : stx,
				scate = (typeof scate == 'undefined') ? '' : scate;

			if(page_num==1 && typeof $.cookie('forum_'+id) != 'undefined') page_num = $.cookie('forum_'+id);
			if(!stx && typeof $.cookie('forum_'+id+'_stx') != 'undefined') stx = $.cookie('forum_'+id+'_stx');
			if(sfl=='all' && typeof $.cookie('forum_'+id+'_sfl') != 'undefined') sfl = $.cookie('forum_'+id+'_sfl');
			if(!scate && typeof $.cookie('forum_'+id+'_scate') != 'undefined') scate = $.cookie('forum_'+id+'_scate');
			$.forum.setForumCookie(id,page_num,stx,sfl,scate);
			
			fmID = id;
            $.ajax({
                url: '/fm/lists/pid/' + id + '/sid/' + F_SID + '/page/' + F_PAGE + '/view/' + view + '/page_num/' + page_num,
                dataType: 'json',
                type: 'POST',
                data: { sfl: sfl, stx: stx, scate: scate},
                async: false,
                cache: false,
                success: function (data) {
                	if(typeof data.error != 'undefined' && data.error) {
                		$(this).showModalFlat('ERROR', data.error, true , false, '', 'close');
                		return false;
                	}
                	$.forum.update(id,page_num,view,F_PAGE,sfl,stx,scate,data);
                }
            });
		},
		update : function(id,page_num,view,page,sfl,stx,scate,data) {
        	var source = (typeof data.source == 'undefined') ? '' : data.source;
        	var $source = $(htmlspecialchars_decode(source)),
        		type = (typeof $source.attr('data-forum-type') == 'undefined' || !$source.attr('data-forum-type')) ? '' : $source.attr('data-forum-type');
        		$first = (type == 'qna') ? $source.find('[data-loop="true"]').children('.qna-item').eq(0).clone() : $source.find('[data-loop="true"]').children().eq(0).clone(),
        		first_html = $first.prop('outerHTML'),
        		$bbs = $('.element[data-id="' + id + '"]');

        	var elsetting = (typeof data.elsettings != 'undefined' && data.elsettings) ? $.parseJSON(data.elsettings) : {},
        		field_lang = (typeof elsetting.field_lang != 'undefined') ? elsetting.field_lang : (typeof elsetting.blocklang != 'undefined' && elsetting.blocklang ? elsetting.blocklang : LANG),
        		field_disable = (typeof elsetting.field_disable != 'undefined' && !$.isEmptyObject(elsetting.field_disable)) ? elsetting.field_disable : [],
        		field_listSet = ($('.element[data-id="' + id + '"]').attr('data-type2') == 'thumb') ? ['num', 'category', 'title', 'cont', 'name', 'date', 'hit','content'] : ['num', 'category', 'title', 'name', 'date', 'hit','content'],
        		forum_color = (typeof elsetting.forum_color != 'undefined') ? elsetting.forum_color : '',
        		forum_btnText = (typeof elsetting.btnText != 'undefined') ? elsetting.btnText : $source.find('.tpl-forum-write').text();

        	var d = document.createElement('div');
        	$(d).html(first_html);

        	var check_faq = (type == 'faq' && $(d).find('.tpl-forum-list-content .inner-box').length > 0) ? true : false;
			//if(field_lang.toLowerCase() != 'en') {
			$source.find('thead tr th').each(function() {
				var field_text = (typeof $(this).attr('class') != 'undefined') ? $(this).attr('class') : 'tpl-forum-title';
				if(field_text.indexOf('ntpl') > -1) field_text = field_text.split(' ')[1];  //게시판 폰트설정 -  기존, 새 코드 블럭 구분

				if(field_text.indexOf('title') > -1 || field_text.indexOf('content') > -1) $(this).text($.lang[field_lang.toLowerCase()]['forum.field.tpl-forum-title']);
				else $(this).text($.lang[field_lang.toLowerCase()]['forum.field.' + field_text]);
			});
			//}

			$source.find('.tpl-forum-write').text(forum_btnText);
			
			// $.each(field_listSet, function(i,v) {
			// 	if($.inArray(v,field_disable) > -1) {
			// 		if(v == 'category') $source.find('#scate').addClass('hidden');
			// 		$source.find('.tpl-forum-'+v).each(function() {  $(this).addClass('hidden'); });
			// 		$(d).find('.tpl-forum-list-'+v).each(function() { $(this).addClass('hidden'); });
			// 	} else {
			// 		if(v == 'category') $source.find('#scate').removeClass('hidden');
			// 		$source.find('.tpl-forum-'+v).each(function() { $(this).removeAttr('style'); $(this).removeClass('hidden'); });
			// 		$(d).find('.tpl-forum-list-'+v).each(function() { $(this).removeAttr('style'); $(this).removeClass('hidden'); });
			// 	}
			// });
				
			$.each(field_listSet, function(i,v) {
				if($.inArray(v,field_disable) > -1) {
					if(v == 'category') $source.find('#scate').addClass('hidden');
					$source.find('.tpl-forum-'+v).each(function() {  $(this).addClass('hidden'); });
					$(d).find('.tpl-forum-list-'+v).each(function() { $(this).addClass('hidden'); });
				} else {
					if(v == 'category') $source.find('#scate').removeClass('hidden');

					var font_selector = (typeof $('.userEL'+id+' .tpl-forum-list-'+v) != 'undefined' && $('.userEL'+id+' .tpl-forum-list-'+v).length > 0) ? $('.userEL'+id+' .tpl-forum-list-'+v) : '',
						font_css = (font_selector) ? font_selector.css('font-size') : '',
						font_class = (font_selector) ? font_selector.attr('class') : '';					
					
					if(typeof MODE == 'undefined' && font_selector && font_class.indexOf('fsize')>-1) {
						font_class = font_class.substring(font_class.indexOf('fsize'),font_class.indexOf('fsize')+7);
						font_css = font_class.split('fsize')[1]+'px';
					}

					$source.find('.tpl-forum-'+v).each(function() { 
						$(this).removeAttr('style'); 
						$(this).removeClass('hidden'); 
						if(typeof MODE == 'undefined') { $(this).addClass('fsize'+font_css.split('px')[0]); }
					});
					$(d).find('.tpl-forum-list-'+v).each(function() { 
						$(this).removeAttr('style'); 
						$(this).removeClass('hidden'); 
						if(typeof MODE == 'undefined') { $(this).addClass('fsize'+font_css.split('px')[0]); }	
					});
				}
			});

			if($source.find('tr.tpl-forum-header-row').length > 0) {
				var checkHeaderOnlyTitle = ($source.find('tr.tpl-forum-header-row th:not(.hidden)').length === 1) ? true : false;
				if(checkHeaderOnlyTitle) $source.find('tr.tpl-forum-header-row').addClass('hidden');
				else $source.find('tr.tpl-forum-header-row').removeClass('hidden');
			}

			var answer	= (type == 'qna') ? $source.find('[data-loop="true"]').children('.qna-details').eq(0).clone().prop('outerHTML') : '';
				loop = $(d).html() + '\
    				'+ answer;
    		$(d).remove();

        	$bbs.html($source.html());
        	var	$row = $bbs.find('[data-loop="true"]'),
        		$pagination = $bbs.find('.tpl-forum-pagination'),
        		$write = $bbs.find('.tpl-forum-write').attr('data-pid',id),
        		css_id = $bbs.attr('data-el'),
        		block_lang = ($bbs.attr('data-blocklang')) ? $bbs.attr('data-blocklang') : LANG;

        	// $.removeCookie('forum-'+id, {path:'/'});
        	
        	if(forum_color) { $bbs.attr('data-fcolor',forum_color); }
        	if(type) $bbs.attr('data-forum-type',type);
        	else {
        		type == '';
        		$bbs.removeAttr('data-forum-type');
        	}

        	if($bbs.find('#scate').length > 0 && $bbs.find('#scate').css('display') !== 'none') $.forum.drawSelboxCategory($bbs,id);

        	var data_el = $bbs.attr('data-el');
        	if(typeof data.css != 'undefined' && data.css) {
        		$bbs.removeClass('hidden');
        		$('#' + data_el + 'css').text(data.css);
        	} else {
        		if(typeof data.msg == 'undefined') $bbs.addClass('hidden');
        	}

        	if(typeof scate != 'undefined' && scate) scate = data.scate;
        	if(typeof stx != 'undefined' && stx) stx = data.stx;

        	$bbs.find('.search-box #sfl').val(sfl);
        	$bbs.find('.search-box #stx').val(stx);
        	$bbs.find('.search-box #sfl option').map( function() {
        		var sfl = $(this).attr('value');
        		$(this).text($.lang[block_lang]['board.sfl.'+sfl]);
        	});


        	if(!stx || stx.length==0) {
	        	$bbs.find('.search-box #sfl').val($('.search-box #sfl').children().first().attr('value'));
	        }

        	$bbs.find('.search-box #scate').val(scate);
        	if(!scate || scate.length==0) {
	        	$bbs.find('.search-box #scate').val('');
	        }

        	$.forum.setForumCookie(id,page_num,stx,sfl,scate);
        	if(typeof MODE == 'undefined' && type == 'faq') $bbs.find('.tpl-forum-write').remove();

        	if(data.total == 0) {
        		if(data.msg) {
        			RELOAD = true;
        			if(data.sign == false) $bbs.find('.tpl-forum-write').text('login');
        		}
        		var msg = (data.msg) ? data.msg : $.lang[LANG]['board.no-posts'];

        		var checkTemplateView = (window.location != window.parent.location) ? true : false;
        		if(	!checkTemplateView &&
					data.demo==false && 
					typeof MODE == 'undefined' || 
					typeof $.cookie('forum_'+id+'_stx') != 'undefined' || 
					typeof $.cookie('forum_'+id+'_scate') != 'undefined' 
    			) {
               		var checkTableLayout = ($row.find('tr').length > 0) ? true  : false;
               		
               		$row.html('');
					if(checkTableLayout) $row.append('<tr><td colspan="10" class="text-center fdescription">' + msg + '</td></tr>');
					else $row.append('<div class="text-center fdescription">' + msg + '</div>');

					if(forum_color) $bbs.find('.fdescription').css('color',forum_color);

					if(data.msg) {
						$bbs.find('.search-box').addClass('hidden');
						$bbs.find('#scate').addClass('hidden');
					}
					$bbs.find('.table thead').addClass('hidden');

            		$pagination.empty();
            		$pagination.attr({'data-page':page, 'data-view':view});
        		} else {
					$bbs.find('[data-loop="true"]').addClass('sample-table');
					$.each(field_disable, function(i,v) {
						if(v == 'category') $bbs.find('#scate').addClass('hidden');
						$bbs.find('[data-loop="true"] .tpl-forum-'+v).addClass('hidden');
						$bbs.find('[data-loop="true"] .tpl-forum-list-'+v).addClass('hidden');
					});
        		}
        	} else {
				$bbs.find('[data-loop="true"]').removeClass('sample-table');
           		$row.html('');
				if(data.total<=((view*page_num)-view)) {
					page_num = page_num-1;
					if(page_num==0) page_num=1;
				}

				var isMasonry = ($bbs.attr('data-msny') == 'true') ? true : false,
					forum_item = '';

        		$.each(data.list, function(i,v) {
        			var num = data.total - (view * (page_num-1)) - i;
        			if(isMasonry) {
        				forum_item = forum_item + forumRow(v, num, page_num, id, loop, data.config, type);
        			} else {
	        			$row.append(forumRow(v, num, page_num, id, loop, data.config, type));
        			}

        		});



        		if(isMasonry) {
					var $forum_items = ($(forum_item).find('.item').length) ? $(forum_item) : $('<div>'+forum_item+'</div>');
					$forum_items.hide();

                    $('.element[data-id="' + id + '"] [data-loop="true"]').before("<div class='forum-loading-status'><div class='loading-dots'></div></div>");
					var f_items = data.list.length;
					var f_process_index = 0;

					$forum_items.children().imagesLoaded().progress(function(imgload, image) {
						f_process_index++;
						var $item = $(image.img).parents('.item');
						$item.show();

						if(f_items == f_process_index) {
							var reload_forum_items = $forum_items.html();
							forumReloadMasonry($row,$(reload_forum_items));
						}
					});
        		}

        		if(stx.length > 0 && $row.find('.tpl-forum-list-title a:contains("' + stx + '")').length > 0) {
        			$row.find('.tpl-forum-list-title a:contains("' + stx + '")').each(function() {
        				var title_txt = $(this).text(),
        					regex = new RegExp(stx,'gi'),
        					new_title_txt = title_txt.replace(regex,  '<strong class="search-txt">' + stx + '</strong>');

        				$(this).html(new_title_txt);

        			});
    			}

    			setPagination($pagination,data.total,view,page_num,id,page);

				if(Number(data.total) <= Number(view)) $pagination.addClass('hidden');
				else $pagination.removeClass('hidden');
        	}
        	if(check_faq) {
        		// IE ERROR_includes__H.20210603
        		// if(field_disable.includes('date,name')) {
        		if($.inArray('name',field_disable) > -1 && $.inArray('date',field_disable) > -1) {
					$bbs.find('[data-loop="true"] .tpl-forum-list-name').removeClass('removeBar');
				} else {
	        		// IE ERROR_includes__H.20210603
					// if(field_disable.includes('date')) 
					if($.inArray('date',field_disable) > -1) 
						$bbs.find('[data-loop="true"] .tpl-forum-list-name').addClass('removeBar');
				}
			}		

			if(type == 'faq') {
				if(forum_color) {
					$bbs.find('tr:nth-child(2n+2)').css('color',forum_color);				
					//$bbs.find('tr:not(.question) td').css('color',forum_color);
				}
			}
			

        	if(!sfl) $bbs.find('.search-box select').children().first().attr('selected','selected');
			if(typeof elsetting.searchbox_display != 'undefined') {
				if(elsetting.searchbox_display == 'ON') {
					$bbs.find('.search-box').removeClass('hidden');
				} else {
					$bbs.find('.search-box').addClass('hidden');
				}
			}

			if(typeof elsetting.comment_display != 'undefined') {
				if(elsetting.comment_display == 'ON') $bbs.find('.tpl-forum-list-comment').removeClass('hidden');
				else $bbs.find('.tpl-forum-list-comment').addClass('hidden');
			}

			if(forum_color) { 
				var block_bg = $bbs.css('background-color');
        		$bbs.find('option').css('background-color',block_bg);
    		}

			var checkWriterWrap = ($bbs.find('.writer-wrap').length > 0) ? true : false;
			if(checkWriterWrap) {
				var checkON = false;
				$bbs.find('.item:first-child .writer-wrap li[class*=tpl-forum-list-]').each(function() {
					var check_type = $(this).attr('class').replace('tpl-forum-list-','').replace('hidden',''),
						check_active = ($.inArray(check_type,field_disable) > -1) ? false : true,
						check_display = ($bbs.find('.item:first-child .tpl-forum-list-' + check_type).css('display') != 'none') ? true : false;
					if(check_active && check_display) { checkON = true; }
				});
				if(!checkON) $bbs.find('.writer-wrap').addClass('all-hidden');
				else $bbs.find('.writer-wrap').removeClass('all-hidden');
			}

        	if(typeof MODE == 'undefined') $bbs.find('.tpl-forum-write[data-disabled="true"]').remove();


        	$bbs.removeClass('preloading');
		},
		view : function(id) {
		    var deferred = $.Deferred();
			F_PARENT = (typeof PARENT == 'undefined') ? property.PARENT : PARENT;
			F_ONE = (typeof ONE == 'undefined') ? property.ONE : ONE;
			F_SID = (typeof SID == 'undefined') ? property.SID : SID;
			F_PAGE = (typeof PAGE == 'undefined') ? property.PAGE : PAGE;
			F_VIEW = id;

			forumView(id);
			setForumWrap();
			deferred.resolve();
		    return deferred.promise();
		},
		delete : function(id) {
			$.post('/fm/info', { id : id, sid : F_SID }, function(data) {
				if(typeof data.error != 'undefined' && data.error) {
					$(this).showModalFlat('ERROR',data.error,true,false,'','ok');
					return false;
				}
				if(data.fmid && data.sign == false) {
					userLogin();
					return false;
				}


				if(data.sign == false) {
					var passwordModal = $(this).showModalFlat($.lang[LANG]['board.button.delete.password'],passwdForm(),true,true,function() {
						var $pass = $('#comm-pass'),
							isSubmit = true,
							userInput = $pass.val();
						$('label.error').remove();
						if($pass.val().length<4) {
							//$pass.after('<label class="error">' +  $.lang[LANG]['config.pass-min-length'] + '</label>').focus();
							$pass.closest('.cl-s-form-wrap').addClass('error');
							$pass.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+$.lang[LANG]['config.pass-min-length']+'</label>');
							$pass.focus();
							isSubmit = false;
						}

						if(isSubmit) {
							//$('.comment-addform.password').parent().find('.error').remove();
							$.post('/fm/password',{ id: id, passwd : hex_md5($pass.val()) }, function(data) {
								if(typeof data.error != 'undefined' && data.error) {
									//$('.comment-addform.password').before('<label class="error">' + data.error + '</label>');
									$pass.closest('.cl-s-form-wrap').addClass('error');
									$pass.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+data.error+'</label>');
									return false;
								}
								var date = new Date(),
									cookietime = 20 * 60 * 1000;
					            date.setTime(date.getTime() + cookietime);

								$.cookie('hash', data.hash, { path: '/' , expires: date});
								$('.modal[id*=flat-modal]').modal('hide');
								resetObject(user);
								user.pass = hex_md5($pass.val());
								deleteForumPost(id);
								passwordModal.modal('hide');
							},'json');
						}
						modalEmptyCheck();
					},'cancel','','cl-modal cl-cmmodal cl-p70 cl-s-btn w560 cl-close-btn cl-t80 board-password');
				} else if(data.own == true || data.mgr == true) {
					deleteForumPost(id);
				} else {
					 alert( $.lang[LANG]['board.not-own-no-delete'] );
				}
			}, 'json');
		},
		setForumCookie : function(id,page_num,stx,sfl,scate) {
			// Recent  forum only
			// var cookies = $.cookie();
			// for(var cookie in cookies) {
			// 	if( cookie.indexOf($.cookie('forum')) == -1 && cookie.indexOf('forum') > -1) {
			// 		$.removeCookie(cookie);
			// 	}
			// }

			var prev_sfl = (typeof $.cookie('forum_'+id+'_sfl') == 'undefined') ? '' : $.cookie('forum_'+id+'_sfl'),
				prev_stx = (typeof $.cookie('forum_'+id+'_stx') == 'undefined') ? '' : $.cookie('forum_'+id+'_stx'),
				prev_scate = (typeof $.cookie('forum_'+id+'_scate') == 'undefined') ? '' : $.cookie('forum_'+id+'_scate'),
				change_stx = (prev_stx != stx) ? true : false,
				change_sfl = (prev_sfl != sfl && stx.length > 0) ? true : false,
				change_scate = (prev_scate != scate) ? true : false;
			if(change_stx || (!change_stx && (change_sfl || change_scate))) page_num = 1;

			$.cookie('forum',id,{path:'/'});
			$.cookie('forum_'+id, page_num,{path:'/'});
			if(typeof stx != 'undefined' && stx) {
				$.cookie('forum_'+id+'_sfl',sfl,{path:'/'});
				$.cookie('forum_'+id+'_stx',stx,{path:'/'});
			} else {
				$.removeCookie('forum_'+id+'_stx',{path:'/'});
			}

			if(typeof scate != 'undefined' && scate) {
				$.cookie('forum_'+id+'_scate',scate,{path:'/'});
			} else {
				$.removeCookie('forum_'+id+'_scate',{path:'/'});
			}

		},
		setDefaultConfig : function(config) {
			var defaultConfig = {
				group 			: '',
				write_level 	: (PLAN || SERVICE.indexOf('gabia') > -1) ? 'NM' : 'M',
				reply_level		: (PLAN || SERVICE.indexOf('gabia') > -1) ? 'NM' : 'A',
				view_level		: 'A',
				list_level		: 'A',
				modify			: 0,
				delete 			: 0,
				page_row		: 10,
				secret_display	: 'U',
				comment_display : 'OFF',
				sns_share_display	: 'OFF',
				bottomlist_display	: 'OFF',
				forum_count		: 0,
				comment_count	: 0,
				field_lang		: 'en',
				field_disable	: [],
				searchbox_display : 'ON'
			}
			if(config==null) config = defaultConfig;
			$.each(defaultConfig, function(k,v) {
				if(typeof config[k] == 'undefined') config[k] = v;
			});
			return config;
		},
		groupconfig : function(id) {
			$('.config-modal').remove();
			$.post('/fm/config', { id : id }, function(data) {
				if(typeof data.error != 'undefined' && data.error) {
					$(this).showModalFlat('ERROR',data.error,true,false,'','ok');
					return false;
				}
				var modal = $(this).showModalFlat($.lang[LANG]['board.manage-groups'],groupConfigForum(data.config,id,data.group),true,false,'','close', 'ok', 'cl-cmmodal cl-s-btn w560 cl-p70 cl-p0 gc-modal').attr({'data-fid':id, 'id':''}).closest('.flat-modal').addClass('flat-gc-modal'); 
			},'json');
		},
		getgroupdata : function(id) {
			$.post('/fm/config', { id : id }, function(data) {
				if(typeof data.error != 'undefined' && data.error) {
					return false;
				}
				str = '', groups = data.group;
				for(var i=0; i<groups.length; i++) {
					str = str + getGroupList(groups[i].id, groups[i].name, groups[i].member_count);
				}
				$('#group-accordion').html(str);
			},'json');
		},
		getGroupNameList : function(fid) {
			var str = '';
			$.post('/fm/config', { id : fid }, function(data) {
				if(typeof data.error != 'undefined' && data.error) {
					return false;
				}				
				groups = data.group;
				for(var i=0; i<groups.length; i++) {
					str = str + '<option value="' + groups[i].name + '" data-id="' + groups[i].id + '" data-member-count="' + groups[i].member_count + '">' + groups[i].name + '</option>';
				}
			}, 'json');
			return str;
		},
		setfile : function (file,file_name,orig_name) {
			var $file = $('<div class="result-file" data-file="' + file + '" data-file-name="' + file_name + '">'),
				$result = $('<span><i class="fa fa-paperclip"></i></span> <span class="set-image hand"><i class="fa fa-arrow-circle-up"></i></span> <span>'+ orig_name + '</span>');
				$del = $('<span class="file-delete hand"><i class="fa fa-times"></i></span>');

			$file.append($result).append($del);
			$file.appendTo('.upload-files');
			
			$('#fm-editor').froalaEditor('selection.restore');

			if(upTYPE == 'image') {
				if(isReplace == true) editorImageReplace('http:' + file);
				else $('#fm-editor').froalaEditor('image.insert', 'http:' + file, true);
			} else $('#fm-editor').froalaEditor('file.insert', 'http:' + file, orig_name, { 'link' : 'http:' + file, 'target': '_blank' });
		},
		drawSelboxCategory : function(sel_replace,pid) {
			var str = '';
			F_SID = (typeof SID == 'undefined') ? property.SID : SID;

			var block_lang = ($(sel_replace).attr('data-blocklang')) ? $(sel_replace).attr('data-blocklang') : LANG;

			$.post('/fm/category/list', { pid: pid, sid: F_SID }, function(list_data) {
				if(typeof list_data.error != 'undefined' && list_data.error) {
					$(this).showModalFlat('ERROR',list_data.error,true,false,'','ok');
					return false;
				}
				str = '\
						<select id="scate" class="form-control" name="scate" placeholder="' + $.lang[block_lang]['board.scate'] + '">\
							<option value="">' + $.lang[block_lang]['board.scate'] + '</option>\
				';
				$.each(list_data, function(i,v) {
					var scate = '';
					var check_cate = (scate == v['seq']) ? 'selected' : '';
					str += '<option value="' + v['seq'] +'" ' + check_cate + '>' + v['fca_name'] + '</option>';
					if(list_data.length == (i+1)) {
						str += '</select>';
						$(sel_replace).find('#scate').replaceWith(str);
					}
				});

				if(list_data.length == 0) {
					str += '</select>';
					$(sel_replace).find('#scate').replaceWith(str);
				}
			}, 'json');
		},
	};

	$.forumChangeList = {
		init : function(id){

		},
		makeList : function(F_SID,id){
			var listStr = '';

			$.ajax({
                url: '/fm/ChangeList/type/get',
                dataType: 'json',
                type: 'POST',
                data: { sid: F_SID, pid : id},
                async: false,
                cache: false,
                success: function (data) {

                	if(typeof data.error != 'undefined' && data.error) {
                		$(this).showModalFlat('ERROR', data.error, true , false, '', 'close');
                		return false;
                	}

                	var notice_list = [],
                		general_list = [];

            		$.each(data,function(f,g){
            			if(g.fm_option=='N') notice_list.push(g);
            			else general_list.push(g);
            		});
                	

                	listStr += '\
                		<div class="change-list-box">\
                		';
                	
                	if(notice_list.length>0) {		
                	listStr +='\
                			<h3>'+$.lang[LANG]['editor.forum.faqChangeList.config.notice']+'</h3>\
                			';
            		}

            		listStr +='\
            				<ul class="ui-sortable change-list" data-listtype="notice">\
	            				';
        					$.each(notice_list,function(i,v){
					listStr += '\
								<li data-num="'+v.fm_num+'" data-seq="'+v.seq+'">\
									<div class="change-list-move hand change-list-handle-notice">\
									' +initSVGIcon('item_handle_24','bc-svg-handle') +'\
									</div>\
									<div class="change-list-text">\
										' + initSVGIcon('item_forum_notice','bc-svg-notice') + '\
										<span class="change-fmtitle">'+v.fm_title+'</span>\
									</div>\
								</li>\
								';
							});
            		listStr += '\
            				</ul>\
                		';

            		if(general_list.length>0) {		
            		listStr += '\
            				<h3>'+$.lang[LANG]['editor.forum.faqChangeList.config.normal']+'</h3>\
            				';
    				}
            		
            		listStr += '\
		            		<ul class="ui-sortable change-list" data-listtype="general">\
            				';
        					$.each(general_list,function(s,d){
					listStr += '\
								<li data-num="'+d.fm_num+'" data-seq="'+d.seq+'">\
									<div class="change-list-move hand change-list-handle-normal">\
									' +initSVGIcon('item_handle_24','bc-svg-handle') +'\
									</div>\
									<div class="change-list-text">\
										' + (d.fm_option=='S' ? initSVGIcon('item_forum_secret','bc-svg-secret') : '') + '\
										<span class="change-fmtitle">'+d.fm_title+'</span>\
									</div>\
								</li>\
								';
							});
            		listStr += '\
            				</ul>\
            			</div>\
            		';

                }
            });		

			return listStr;

		},
		open : function(id){
			//$.forumChangeList.init(id);			
			F_SID = (typeof SID == 'undefined') ? property.SID : SID;
			
			var listStr = $.forumChangeList.makeList(F_SID,id),
				modal = $(this).showModalFlat($.lang[LANG]['editor.forum.faqChangeList.config'],listStr,true,true,function(){

				$.progressON($.lang[LANG]['editor.forum.faqChangeList.config.changing'],'','',true);
				
				var updateList = {},
					updateList_notice = {},
					updateList_general = {};

				$.each($('.change-list'),function(z,x){
					var listType = $(this).attr('data-listtype');

					if(listType=='notice') {
					 	updateList_notice = $(this).find('li').map(function(i,v) {
							var dataNum = $(this).attr('data-num'),
								dataSeq = $(this).attr('data-seq');

							return {
								dataNum : dataNum,
								dataSeq : dataSeq
							}
						}).get();
					} else {
						updateList_general = $(this).find('li').map(function(i,v) {
							var dataNum = $(this).attr('data-num'),
								dataSeq = $(this).attr('data-seq');

							return {
								dataNum : dataNum,
								dataSeq : dataSeq
							}
						}).get();
					}

					updateList = updateList_notice.concat(updateList_general);
					$('.progress-bar').css('width','40%');
				});

				$.ajax({
	                url: '/fm/ChangeList/type/update',
	                dataType: 'json',
	                type: 'POST',
	                data: { sid: F_SID, pid : id, updateList : updateList },
	                async: false,
	                cache: false,
	                success: function (data) {
	                	if(typeof data.error != 'undefined' && data.error) {
	                		$(this).showModalFlat('ERROR', data.error, true , false, '', 'close');
	                		return false;
	                	}
	                	$('.progress-bar').css('width','100%');
	                	setTimeout(function() {		                		
                			modal.modal('hide');
		                  	$.progressOFF();
		                  	showPageCallback(showPage);	
		                },'650');
	                }
                });	

                var type = getElementType();
                setLogs(type,'forum.faq.sort','block-sort', type);
				
			},'config.close','config.save', 'cl-cmmodal cl-cmwide cl-s-btn w700 cl-p70 cl-p0 cl-forum-changeList','','',function(){			
				var num_array = [];
				$('.change-list').each(function(){
					$(this).sortable({
						placeholder:'chage-list-move-placeholder',
						connectWith: $(this),
		                handle : $(this).find('.change-list-move'),
		                revert :50,
		                tolerance: 'pointer',
						helper : 'clone',
		                update : function(e,ui){
		                	$(this).find('li').removeClass('chage-list-move-placeholder');
		                	num_array = $(this).sortable( "toArray", { attribute : 'data-num' });
		                	num_array.sort(function(q,w){
		                		return q - w;
		                	});

		                	var listType = $(this).attr('data-listtype');

		                	$.each(num_array,function(a,b){
								$.each($('.change-list[data-listtype="'+listType+'"] li'),function(n,m){
									if(a==n) $(this).attr('data-num',b);
								});
							});
		                }
		            }).disableSelection();
				});
			});
		},
	};

	var forumReloadMasonry = function(container,items) {
		setTimeout(function() {
		    container.closest('.element').find('.forum-loading-status').remove();
			if(container.closest('.container').length > 0) container.closest('.container').removeAttr('style').css('position','relative');
			if(container.hasClass('container')) container.removeAttr('style').css('position','relative');
			container.masonry().append(items);
			container.masonry('appended',items).masonry();
		}, 400);
	}

	var getConfigChecked = function (value,select,valstr) {
		valstr = (typeof valstr == 'undefined') ? 'selected' : valstr;
		var check = [];

		$.each(select, function(i,v) {
			check.push((value.toUpperCase()==v) ? valstr : '');
		});
		return check;
	}



	var groupConfigForum = function(config,id,group) {
		config = $.forum.setDefaultConfig(config);

//************************************************************************************************************************************************************아래 바꾸기
			// live 
			// mtype = (SERVICE.indexOf('gabia') > -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink',
			
			// gabia test
			// mtype = (SERVICE.indexOf('gabia') == -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink',

		var tpUser = ['ADM','A','M','N','G'],
			tpOnoff = ['ON','OFF'],
			tpSecret = ['N','U','A'],
			mtype = (SERVICE.indexOf('gabia') > -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink',
			group_member = 0,
			groups = group,
			select_group = config.group,
			select_group_str = '';

		var preference = { group : '', write : [], view : [], reply : [], list : [], modify : config.modify, delete : config.delete, row : config.page_row, secret : [], sns : [], comment : []}
		preference.write 	= getConfigChecked(config.write_level,tpUser);
		preference.view 	= getConfigChecked(config.view_level,tpUser);
		preference.reply 	= getConfigChecked(config.reply_level,tpUser);
		preference.list 	= getConfigChecked(config.list_level,tpUser);
		preference.secret 	= getConfigChecked(config.secret_display,tpSecret,'checked');
		preference.comment 	= getConfigChecked(config.comment_display,tpOnoff,'checked');

		var namelist_str = $.forum.getGroupNameList(id);

		var str = '\
		<div class="clearwrap">\
			<div class="forum-member-search">\
				<div class="select-wrap">\
					<select class="hand" id="g-sfl" name="g-sfl" placeholder="' + $.lang[LANG]['board.g-sfl.all'] + '">\
						<option value="all" data-id="all" selected>' + $.lang[LANG]['board.g-sfl.all'] + '</option>\
						' + namelist_str + '\
					</select>\
				</div>\
				<div class="cl-common-form-wrap nonplace-holder">\
                    <div class="cl-common-form-group">\
    					<input id="g-stx" name="g-stx" class="config-input member-search" placeholder="' + $.lang[LANG]['board.search.userid.'+mtype] + '">\
                        <label class="lock-input-error"></label>\
                    </div>\
                    <span class="btn btn-xs btn-forum-config btn-forum-group-search" data-toggle="tooltip" data-placement="top" data-id="' + SID + '">\
	                	<svg viewBox="0 0 13 13" width="13" height="13">\
	                		<path d="M13 12.29L9.73 9.02C10.52 8.06 11 6.84 11 5.5 11 2.46 8.54 0 5.5 0 2.46 0 0 2.46 0 5.5 0 8.54 2.46 11 5.5 11c1.34 0 2.57-0.48 3.52-1.27L12.29 13 13 12.29zM1 5.5C1 3.02 3.02 1 5.5 1S10 3.02 10 5.5 7.98 10 5.5 10 1 7.98 1 5.5z"/>\
	                	</svg>\
	                </span>\
                </div>\
			</div>\
		</div>\
		<div class="config-wrap">';
		if(groups.length == 0) {
			str = str + '<div class="forum-settings group empty"><p>그룹이 없습니다.</p></div>';
		} else {
			str = str + '\
			<div class="panel-group forum-settings group" id="group-accordion">\
			';
			for(var i=0; i<groups.length; i++) {
				if(select_group == groups[i].id) {
					selected = 'selected';
					group_member = groups[i].member_count;
					select_group_str = ' - ' + groups[i].name;
				} else {
					selected = '';
				}
				
				str = str + getGroupList(groups[i].id, groups[i].name, groups[i].member_count);
			}

			str = str + '\
			</div>\
		';
		}
		str = str + '\
		</div>\
		<div class="froum-group-add">\
			<span class="btn btn-group-add">\
				<span><svg viewBox="0 0 12 12" width="12" height="12"><polygon points="12 5 7 5 7 0 5 0 5 5 0 5 0 7 5 7 5 12 7 12 7 7 12 7 "/></svg></span>\
			' + $.lang[LANG]['board.add-group'] + '</span>\
		</div>\
		';
		return str;
	}


	var getGroupList = function (gid, gname, gmcount) {
		var str =  '\
				<div class="panel">\
					<div class="panel-heading">\
						<div class="panel-title">\
							<a class="accordion-toggle group-item hand" data-id="' + gid + '" data-member-count="' + gmcount + '">\
								<label class="group-name hand">' + gname + '</label>\
								<span class="group-member-count">' + gmcount + '</span>\
								<svg viewBox="0 0 8 4" width="8" height="4"><polygon points="0 0 4 4 8 0 "/></svg>\
							</a>\
							<div class="content">\
								<span>\
									<svg viewBox="0 0 13 13" width="13" height="13" class="group-user-add hand">\
										<polygon points="13 2 11 2 11 0 10 0 10 2 8 2 8 3 10 3 10 5 11 5 11 3 13 3 "/>\
										<path d="M6.83 8.36C7.54 7.81 8 6.96 8 6c0-1.66-1.34-3-3-3S2 4.34 2 6c0 0.96 0.46 1.81 1.17 2.36C1.31 9.09 0 10.89 0 13h1c0-2.21 1.79-4 4-4s4 1.79 4 4h1C10 10.89 8.69 9.09 6.83 8.36zM3 6c0-1.1 0.9-2 2-2 1.1 0 2 0.9 2 2S6.1 8 5 8C3.9 8 3 7.1 3 6z"/>\
									</svg>\
								</span>\
								<span>\
									<svg viewBox="0 0 13 13" width="13" height="13" class="group-name-edit hand">\
										<path d="M4.32 8.05C4.2 8.39 4.46 8.71 4.79 8.71c0.05 0 0.11-0.01 0.16-0.03L7 8l6-6-2-2L5 6 4.32 8.05zM5.87 6.54L11 1.41 11.59 2 6.46 7.13 5.58 7.42 5.87 6.54z"/>\
										<path d="M9 11c0 0.55-0.45 1-1 1H2c-0.55 0-1-0.45-1-1V4c0-0.55 0.45-1 1-1h3V2H2C0.9 2 0 2.9 0 4v7c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V8H9V11z"/>\
									</svg>\
								</span>\
								<span>\
									<svg viewBox="0 0 12 13" width="12" height="13" class="group-delete hand">\
										<path d="M12 2h-1H9V0H3.02v2H1 0v1h1v8c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V3h1V2zM4.02 1H8v1H4.02V1zM10 11c0 0.55-0.45 1-1 1H3c-0.55 0-1-0.45-1-1V3h1.02H9h1V11z"/>\
										<rect x="4" y="4" width="1" height="7"/><rect x="7" y="4" width="1" height="7"/>\
									</svg>\
								</span>\
							</div>\
						</div>\
					</div>\
					<div id="group-list-' + gid + '" class="panel-collapse" style="display:none;">\
						<div class="panel-body">\
							' + getGroupMemberList(gid) + '\
						</div>\
					</div>\
				</div>\
		';
		return str;
	}

	var getGroupMemberList = function (id,userid) {

//************************************************************************************************************************************************************아래 바꾸기
			// live 
			// mtype = (SERVICE.indexOf('gabia') > -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink',
			
			// gabia test
			// mtype = (SERVICE.indexOf('gabia') == -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink',

		var userid = (typeof userid == 'undefined' || !userid) ? '' : userid, 
			mtype = (SERVICE.indexOf('gabia') > -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink',
			str = '';

		$.post('/fm/group/member', { id : id, page : 1, userid : userid, mtype:mtype }, function(data) {
			if(typeof data.error != 'undefined' && data.error) {
				return false;
			}

			if(data.total>0) {
				str = '		<ul class="group-member-list">';
				$.each(data.list, function(i,v) {
					str = str + '\
								<li class="gm-item">\
									<div>\
										<div class="gmi-img">\
											<span class="hexagon">\
												<img src="'+v.img+'" alt="" class="img-responsive">\
											</span>\
										</div>\
										<div class="gmi-info">\
					';
					if(v.name != v.id) {
						str = str + '\
											<span class="gmi-name">' + v.name + '</span>\
						';
					}
						str = str + '\
											<span class="gmi-id">' + v.id + '</span>\
										</div>\
										<div class="gmi-btn">\
											<svg viewBox="0 0 12 13" width="12" height="13" class="gmi-del hand" data-userid="' + v.id + '" data-id="' + v.fg_id + '">\
												<path d="M12 2h-1H9V0H3.02v2H1 0v1h1v8c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V3h1V2zM4.02 1H8v1H4.02V1zM10 11c0 0.55-0.45 1-1 1H3c-0.55 0-1-0.45-1-1V3h1.02H9h1V11z"/>\
												<rect x="4" y="4" width="1" height="7"/><rect x="7" y="4" width="1" height="7"/>\
											</svg>\
										</div>\
									</div>\
								</li>';
				});
				str = str + '</ul>';
			} else {
				str = '		<div class="empty">' + $.lang[LANG]['board.group-no-members'] + '</div>';
			}

		}, 'json');
		return str;
	}

	var settingEditMode = function(mode) {
		if(mode) {
			$('.forum-member-search, .froum-group-add').css('pointer-events','none');
			$('#group-accordion').find('.forum-group-update').css('pointer-events','auto').find('input').focus();
			$('#group-accordion').find('.forum-group-user-add').css('pointer-events','auto').find('input').focus();
		} else {
			$('.forum-member-search, .froum-group-add').css('pointer-events','auto');
			$('#group-accordion').find('.config-error').remove();
		}
	}

	var addForumGroupUpdateInput = function(gid, gname) {
		var gid = (typeof gid=='undefined' || !gid) ? '' : gid,
			gname = (typeof gname=='undefined' || !gname) ? '' : gname,
			str = '\
			<div class="forum-group-update">\
				<div class="input-group">\
					<input type="text" class="forum-group-name hand forum-control" placeholder="' + $.lang[LANG]['board.enter-group-name'] + '" value="' + gname + '"/>\
					<div class="input-group-btn hand ga-save" data-id="' + gid + '">\
						<svg viewBox="0 0 15 10" width="15" height="10" class="">\
							<path d="M14.29 0L5.5 8.79 0.71 4 0 4.71l5.15 5.15C5.24 9.95 5.37 10 5.5 10s0.26-0.05 0.35-0.15L15 0.71 14.29 0z"/>\
						</svg>\
					</div>\
					<div class="ga-cancel">\
						<svg viewBox="0 0 12 12" width="12" height="12">\
							<polygon points="12 0.71 11.29 0 6 5.29 0.71 0 0 0.71 5.29 6 0 11.29 0.71 12 6 6.71 11.29 12 12 11.29 6.71 6 "/>\
						</svg>\
					</div>\
				</div>\
			</div>\
		';
		return str;
	}


	$doc.on('hidden.bs.modal','.flat-gc-modal .modal', function (e) {
		var ctrlChmodSelectGroup = $('#el-blockConfig .ctrl-chmod-select[data-mode="group"]'),
			gid = ctrlChmodSelectGroup.find('option:selected').attr('data-id'),
			str = $.forum.getGroupNameList(selectID);
		settingEditMode(false);

		ctrlChmodSelectGroup.html(str);
		var selectGroup = (ctrlChmodSelectGroup.find('option[data-id="' + gid + '"]').length > 0) ? ctrlChmodSelectGroup.find('option[data-id="' + gid + '"]') : ctrlChmodSelectGroup.find('option:first-child');
		selectGroup.attr('selected',true);

		$('#el-blockConfig .ctrl-chmod-select option[value="G"]').each(function() {
			$(this).text($.lang[LANG]['board.access-group-label'] + ' - ' + selectGroup.val());
		});
		$('.flat-gc-modal').remove();
	});


	$doc.on('click','.btn-group-add', function (e) {
		if($('#group-accordion').find('.forum-group-update').length > 0) return false;

		$('#g-stx').val('');
		$('#g-sfl option:first-child').attr('selected',true);
		$.forum.getgroupdata($('.flat-gc-modal .modal').attr('data-fid'));

		var input_text = addForumGroupUpdateInput();
		$(input_text).appendTo($('#group-accordion'));
		settingEditMode(true);
	});

	$doc.on('click','.ga-cancel',function (e) {
		settingEditMode(false);
		$('#group-accordion').find('.forum-group-update').remove();
	});	


	$doc.on('click','.ga-save', function (e) {
		if($(this).hasClass('clicked')) return false;
		else $(this).addClass('clicked');

		var group_name = $('.forum-group-name').val(),
			id = $(this).attr('data-id'),
			regexp = /^[ㄱ-ㅎ가-힣ㅏ-ㅣa-zA-Z0-9\# ]+$/i,
			special_pattern = /[~!?@\#$%<>^&*\(){}\-\[\]\\:;=+_\’'"]/gi,
			editgroupname = (id) ? 'g-edit' : '';
		$position = (id) ? $('.group-item[data-id="'+id+'"]').parents('.panel-title') : $('#group-accordion');

		$('.config-error').remove();
		var show_error_ga_save = function(error_message) {
			$position.find('.forum-group-update').removeClass('error-forum').addClass('error-forum');
			$position.append('\
				<div class="config-error '+editgroupname+'">\
					' + clSVG('info',13,13) +'\
					<span>' + error_message + '</span>\
				</div>\
		    ');
		    $('.ga-save').removeClass('clicked');
		}

		if($('.group-item[data-id="'+id+'"] .group-name').text() == group_name) {
			settingEditMode(false);
			$('#group-accordion').find('.forum-group-update').remove();
			$('.ga-save').removeClass('clicked');
			return false;
		}

		if(!group_name.trim()) {
			show_error_ga_save($.lang[LANG]['board.allowed-chars.none']);
			return false;
		}
		if(checkEmojis(group_name.trim())) {
			show_error_ga_save($.lang[LANG]['config.unable.emoji']);
			return false;
		}
		if((special_pattern.test(group_name.trim()) == true)) {
			show_error_ga_save($.lang[LANG]['board.allowed-chars']);
            return false;
        }
		if(group_name.length<1) {
			show_error_ga_save($.lang[LANG]['board.enter-group-name']);
			return false;
		}
		if(group_name.length>60) {
			show_error_ga_save($.lang[LANG]['board.enter-max-chars.60']);
			return false;
		}

		$.post('/fm/group/update', { sid : F_SID, id : id, name : encodeURIComponent(group_name) }, function(data) {
			if(typeof data.error != 'undefined' && data.error) {
				show_error_ga_save(data.error);
				return false;
			}

			$('#group-accordion').find('.forum-group-update').remove();
			settingEditMode(false);
			if(id) {
				var str = '\
					<label class="group-name">' + data.name + '</label>\
					<span class="group-member-count">' + $('#group-accordion .group-item[data-id="' + data.id + '"]').attr('data-member-count') + '</span>\
					<svg viewBox="0 0 8 4" width="8" height="4"><polygon points="0 0 4 4 8 0 "/></svg>\
				';
				$('#group-accordion .group-item[data-id="' + data.id + '"]').html(str);
				$('.flat-gc-modal #g-sfl option[data-id="' + data.id + '"]').attr('value',data.name).text(data.name);
			} else {
				var newgroup = getGroupList(data.id, data.name, 0);
				$('#group-accordion').append(newgroup);
				$('#group-accordion .group-item[data-id="' + data.id + '"]').click();
				$('.flat-gc-modal #g-sfl').append('<option value="'+data.name+'" data-id="'+data.id+'" data-member-count="'+data.member_count+'">'+data.name+'</option>');
			}

			groups = getForumGroupObject();
			$('.ga-save').removeClass('clicked');

		}, 'json');
	});

	$doc.on('click','.group-user-add, .group-item', function (e) {
		if($('#group-accordion').find('.forum-group-user-add').length > 0) return false;
		$select_group = $(this).parents('.content').prev('.group-item');

//************************************************************************************************************************************************************아래 바꾸기
			// live 
			// mtype = (SERVICE.indexOf('gabia') > -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink';
			
			// gabia test
			// mtype = (SERVICE.indexOf('gabia') == -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink';

		var gid = ($(this).hasClass('group-item')) ? $(this).attr('data-id') : $select_group.attr('data-id'),
			mtype = (SERVICE.indexOf('gabia') > -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink',
			group_member_list_check = $(this).parents('.panel').find('.group-member-list').length,
			display_check = $('#group-list-'+gid).css('display');


		var input_text = '\
			<li class="gm-item forum-group-user-add-li">\
				<div class="forum-group-user-add">\
					<div class="input-group">\
						<input type="text" class="gua-userid forum-control" placeholder="' + $.lang[LANG]['board.enter-member-email.'+mtype] + '"/>\
						<span class="input-group-btn hand gua-save" data-id="' + gid + '" data-mtype="' + mtype + '">\
							<svg viewBox="0 0 15 10" width="15" height="10" >\
								<path d="M14.29 0L5.5 8.79 0.71 4 0 4.71l5.15 5.15C5.24 9.95 5.37 10 5.5 10s0.26-0.05 0.35-0.15L15 0.71 14.29 0z"/>\
							</svg>\
						</span>\
						<div class="gua-cancel">\
							<svg viewBox="0 0 12 12" width="12" height="12">\
								<polygon points="12 0.71 11.29 0 6 5.29 0.71 0 0 0.71 5.29 6 0 11.29 0.71 12 6 6.71 11.29 12 12 11.29 6.71 6 "/>\
							</svg>\
						</div>\
					</div>\
				</div>\
			</li>\
		',
		member_list = '\
			<ul class="group-member-list">\
			' + input_text + '\
			</ul>\
			';

		if(display_check=='none') {
			$('#group-list-'+gid).slideDown();
			$(this).addClass('glOpen');
			if($(this).hasClass('group-item')=== false) {
		 		groupAddClass(group_member_list_check,$(this),input_text,member_list);
			}
		} else {			
			if($(this).hasClass('group-item')===false) {
				groupAddClass(group_member_list_check,$(this),input_text,member_list);
			} else {
				$(this).removeClass('glOpen');
				$('#group-list-'+gid).slideUp();
			}
		}
	});
	

	$doc.on('click','.gua-cancel',function (e) {
		var empty_check = $(this).parents('.panel-body').find('.empty').css('display');
		if(empty_check == 'none') {
			$(this).parent('.panel').find('.group-member-list').remove();
			$(this).parents('.panel').find('.empty').show();  
		}	
		settingEditMode(false);
		$('#group-accordion').find('.forum-group-user-add-li').remove();
	});

	$doc.on('click','.gua-save',function (e) {
		if($(this).hasClass('clicked')) return false;
		else $(this).addClass('clicked');

		var $select_group = $(this).parents('.panel').find('.group-item'),
			$add_error = $(this).parents('.gm-item'),
			$userid = $('.gua-userid'),
			id = $(this).attr('data-id'),
			mtype = $(this).attr('data-mtype');

		$('.config-error').remove();
		var show_error_gua_save = function(error_message) {
			$add_error.append('\
				<div class="config-error">\
					' + clSVG('info',13,13) +'\
					<span>' + error_message + '</span>\
				</div>\
		    ');
		    $('.gua-save').removeClass('clicked');
		}

		if(!$userid.val().trim()) {
			show_error_gua_save($.lang[LANG]['board.enter-member-email.um']);
			return false;
		}
		if(checkEmojis($userid.val().trim())) {
			show_error_gua_save($.lang[LANG]['config.unable.emoji']);
			return false;
		}
		if(typeof id == 'undefined' || id==null || !id) {
			show_error_gua_save('Invalid variable');
			return false;
		}
		$.post('/fm/group/useradd', { id:id, userid:$userid.val().trim().toLowerCase(), mtype:mtype }, function(data) {
			if(typeof data.error != 'undefined' || data.error) {
				show_error_gua_save(data.error);
				return false;
			}

			if($('.member-search').val()) {
				$('#g-stx').val('');
				$('#g-sfl option:first-child').attr('selected',true);
				$.forum.getgroupdata($('.flat-gc-modal .modal').attr('data-fid'));
			}
			$select_group.attr('data-member-count',data.count);
			$select_group.find('.group-member-count').text(data.count);

			settingEditMode(false);

			$('#group-accordion').find('.forum-group-user-add-li').remove();
			groups = getForumGroupObject();

			getGroupMembers(id);
			$('.gua-save').removeClass('clicked');

		},'json');
	});

	$doc.on('click','.group-name-edit',function (e) {
		$select_group = $(this).parents('.content').prev('.group-item');
		var gid = $select_group.attr('data-id'),
			gname = $select_group.find('.group-name').text();
		if($('#group-accordion').find('.forum-group-update').length > 0) return false;

		var input_text = addForumGroupUpdateInput(gid, gname);
		$(input_text).appendTo($select_group.closest('.panel-title'));
		settingEditMode(true);
	});

	$doc.on('click','.group-delete',function (e) {
		$select_group = $(this).parents('.content').prev('.group-item');
		var gid =  $select_group.attr('data-id'),
			gname = $select_group.find('.group-name').text();

		if($('#group-accordion .group-item').length==1) {
			if($('#group-accordion .group-item').find('.config-error').length==0)
				$select_group.parents('.panel-title').append('<div class="config-error managegroups-error">\
						<svg viewBox="0 0 13 13" width="13" height="13">\
		                    <path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/>\
		                    <rect x="6" y="3" width="1" height="5"/>\
		                    <rect x="6" y="9" width="1" height="1"/>\
		                </svg>\
	                <span>' + $.lang[LANG]['board.min-num-groups'] + '</span></div>');
			return false;
		}
		var str = $.lang[LANG]['board.ask-delete-group-2'] + "\
		";

		$('.modal.modal-default.fade.in').css('zIndex','1029');
		var gd_modal = $(this).showModalFlat($.lang[LANG]['board.ask-delete-group.title'], str, true, true, function() {
			$.post('/fm/group/delete', { id : gid }, function(data) {
				if(typeof data.error != 'undefined' || data.error) {
					$('.forum-group-delete .content').append('<div class="config-error">' + data.error + '</div>');
					return false;
				}
				$('#group-accordion .group-item[data-id="' + data.id + '"]').parents('.panel').remove();
				$('.flat-gc-modal #g-sfl option[data-id="' + data.id + '"]').remove();
				groups = getForumGroupObject();
				gd_modal.modal('hide');
			},'json');

		}, 'cancel', 'ok', 'cl-cmmodal cl-s-btn w560 cl-p130 cl-p0','','','',function(){
			$('.modal.modal-default.fade.in').css('zIndex','');
		});
		$('#delete-group-name').text(gname);
	});

	$doc.on('click','.gmi-del', function (e) {
		var userid = $(this).attr('data-userid'),
			id = $(this).attr('data-id'),
			mtype = $(this).attr('data-mtype'),
			$select_group = $('.group-item[data-id="'+id+'"]'),
			gmcount = parseInt($select_group.find('.group-member-count').text()),
			str = userid + $.lang[LANG]['board.ask-delete-member-from-group'];

		$('.modal.modal-default.fade.in').css('zIndex','1029');
		var gmid_modal = $(this).showModalFlat($.lang[LANG]['config.information'], str, true, true, function() {
			$.post('/fm/group/userdel', { id : id, userid : userid, mtype : mtype }, function(data) {
				if(typeof data.error != 'undefined' && data.error) {
					$select_group.append('<div class="config-error">' + data.error + '</div>');
					return false;
				}

				$select_group.attr('data-member-count',gmcount-1);
				$select_group.find('.group-member-count').text(gmcount-1);

				getGroupMembers(id);
				gmid_modal.modal('hide');
			},'json');
		},'cancel', 'ok', 'cl-cmmodal cl-s-btn w560 cl-p130 cl-p0','','','',function(){
			$('.modal.modal-default.fade.in').css('zIndex','');
		});
	});


	$doc.on('click','#ctrl-forum-group', function(e) {
		var id = $(this).attr('data-id');
		$.forum.groupconfig(id);
	});

	$doc.on('click','.forum-change-list', function(e) {
		var id = $(this).attr('data-id'),
			hasNoList = $(this).hasClass('noList') ? true : false,
			hasDisabled = $(this).hasClass('disabled') ? true : false,
			check_count_txt = (hasNoList) ? $.lang[LANG]['editor.forum.faqChangeList.config.noList'] : $.lang[LANG]['editor.forum.faqChangeList.config.disabled'];

		if(hasNoList || hasDisabled) {
			$(this).showModalFlat($.lang[LANG]['config.information'],check_count_txt,true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0 cl-okbtn-pbt70');
		} else $.forumChangeList.open(id);
	});

	$doc.on('change','.property-form-wrap select, #prop-forum-etcmod .switch-input', function(e) {
		var id =  $(this).attr('data-id'),
			mode = $(this).attr('data-mode'),
			value = (mode == 'group') ? $(this).find('option:selected').attr('data-id') : $(this).val();

		if(typeof id == 'undefined' || id==null || id=='') {
			$(this).showModalFlat('ERROR', $.lang[LANG]['board.error-setting-value'], true, false, '', 'ok');
			return false;
		}

		if(value != 'undefined' && value == 'NULL') {
			e.preventDefault();
//************************************************************************************************************************************************************아래 바꾸기
			// live
			// var upgrade_text = (SERVICE.indexOf('gabia') > -1) ? ((VALIDPLAN && VALIDTYPE == 'BN') ? $.lang[LANG]['board.chmod.upgrade-plan.gabia-bn'] : $.lang[LANG]['board.chmod.upgrade-plan.gabia']) : $.lang[LANG]['board.chmod.upgrade-plan'];
			
			// gabia test
			// var upgrade_text = (SERVICE.indexOf('gabia') == -1) ? ((VALIDPLAN && VALIDTYPE == 'BN') ? $.lang[LANG]['board.chmod.upgrade-plan.gabia-bn'] : $.lang[LANG]['board.chmod.upgrade-plan.gabia']) : $.lang[LANG]['board.chmod.upgrade-plan'];
			
            var upgrade_text = (SERVICE.indexOf('gabia') > -1) ? ((VALIDPLAN && VALIDTYPE == 'BN') ? $.lang[LANG]['board.chmod.upgrade-plan.gabia-bn'] : $.lang[LANG]['board.chmod.upgrade-plan.gabia']) : $.lang[LANG]['board.chmod.upgrade-plan'];
			$(this).showModalFlat('INFORMATION', upgrade_text, true, false, '', 'close');
            $(this).val( $(this).data('choice') );
			return false;
		}

		if(mode == 'comment') value = ($(this).prop('checked')) ? 'ON' : 'OFF';
		if(mode == 'sns') 	  value = ($(this).prop('checked')) ? 'ON' : 'OFF';
		if(mode == 'bottomlist') value = ($(this).prop('checked')) ? 'ON' : 'OFF';
		if(mode == 'searchbox') value = ($(this).prop('checked')) ? 'ON' : 'OFF';

		var modetype = {
			'group' : 'group',
			'write'	: 'write_level',
			'view'	: 'view_level',
			'reply'	: 'reply_level',
			'list'	: 'list_level',
			'secret' : 'secret_display',
			'comment': 'comment_display',
			'sns'	: 'sns_share_display',
			'bottomlist': 'bottomlist_display',
			'fieldlang' : 'field_lang',
			'searchbox': 'searchbox_display',
			'date' : 'date',
		}, settings = {};

		settings[modetype[mode]] = value;


		$.post('/template/settings', { sid : F_SID, settings : JSON.stringify(settings), el : id }, function(data) {
			if(typeof data.error != 'undefined' && data.error) {
				$(this).showModalFlat('ERROR',data.error,true,false,'','ok');
				return false;
			}

			if(mode == 'fieldlang') {
				$('.element[data-id="' + id + '"]').attr('data-fieldlang',value.toLowerCase());
				$('.element[data-id="' + id + '"] thead tr th').each(function() {
					var field_text = (typeof $(this).attr('class') != 'undefined') ? $(this).attr('class') : 'tpl-forum-title';
					if(field_text.indexOf('title') > -1 || field_text.indexOf('content') > -1) $(this).text($.lang[value.toLowerCase()]['forum.field.tpl-forum-title']);
					else $(this).text($.lang[value.toLowerCase()]['forum.field.' + field_text]);
				});

				if($('.element[data-id="' + id + '"]').attr('data-type') == 'forum' && $('.element[data-id="' + id + '"]').attr('data-type2') == 'qna') {
					$('.element[data-id="' + id + '"] .qna-item .tpl-forum-list-state').each(function(i) {
                        if($(this).closest('.qna-item').find('.tpl-forum-list-num').hasClass('n')) $(this).text('');
                        else if(typeof $(this).attr('data-state') != 'undefined' && $(this).attr('data-state') == 'true') $(this).text($.lang[value.toLowerCase()]['forum.qna.state.replied']);
						else $(this).text($.lang[value.toLowerCase()]['forum.qna.state.waiting']);
					});
				}
	
				$('.element[data-id="' + id + '"]').find('.tpl-forum-write').text($.lang[value.toLowerCase()]['forum.field.tpl-forum-write']);
			}
			if(mode == 'searchbox') {
				if(value == 'ON') { $('.element[data-id="' + id + '"]').find('.search-box').removeClass('hidden'); } 
				else { $('.element[data-id="' + id + '"]').find('.search-box').addClass('hidden'); }
			}
			if(mode == 'date') {
				var page = F_PAGE,
					page_num = 1,
					view = $('.element.active').find('.tpl-forum-pagination li').first().attr('data-view'),
					sfl = '',
					stx = '',
					scate = '';

				$.forum.setForumCookie(id,page_num,stx,sfl,scate);
				cookie_page_num = $.cookie('forum_'+id);
				$.forum.init(id,page,view,cookie_page_num,sfl,stx,scate);
				activeEL('userEL'+id);
			}

		}, 'json');
	});
	
	var getForumGroupObject = function() {
		var $select = $('#group-accordion .group-item');
		groups = [];
		$.each($select,function(i,v) {
			groups[i] = {
				'id' : $(this).attr('data-id'),
				'name' : $(this).find('.group-name').text(),
				'member_count' : $(this).attr('data-member-count')
			}
		});
		return groups;
	}

	var deleteForumPost = function(id) {
		$.post('/fm/delete', { id : id, user : user }, function(data) {
			if(typeof data.error != 'undefined' && data.error) {
				$('.flat-modal .modal').modal('hide');
				var modal = $(this).showModalFlat('ERROR', data.error, true, false, '', 'ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title');
				return false;
			}

			//this case:: forum QnA block, answer delete =>> page refresh
			var checkPageReload = ($('.element[data-type="forum"][data-type2="qna"] .qna-details .tpl-toolbar-question-del[data-id="' + id + '"]').length > 0) ? true : false;

			if(checkPageReload) location.reload();
			else $('.tpl-forum-list').click();
		},'json');
	}

	var setPagination = function($obj, total, view, page_num, id, page) {
		var page_view = 5,
		    start = Math.floor((page_num-1) / page_view) * page_view,
		    pages = Math.ceil(total/view),
		    end = (Math.floor((page_num-1) / page_view) + 1) * page_view,
		    end = (end>pages) ? pages : end,
		    prev = (start > 0) ? start : 1,
		    next = ((end+1) > pages) ? pages : end+1;
		$obj.find('li').addClass('tpl-forum-page');

		var $first = $obj.children().first().clone(),
			$prev = $obj.children().first().clone(),
			$next = $obj.children().last().clone(),
			$last = $obj.children().last().clone();
			
		$obj.empty();
		$first.attr('data-page',page).attr('data-id',id).attr('data-view',view).attr('data-page-num',"1").find('i').removeClass('fa-angle-left').addClass('fa-angle-double-left');
		$prev.attr('data-page',page).attr('data-id',id).attr('data-view',view).attr('data-page-num',prev);
		$next.attr('data-page',page).attr('data-id',id).attr('data-view',view).attr('data-page-num',next);
		$last.attr('data-page',page).attr('data-id',id).attr('data-view',view).attr('data-page-num',pages).find('i').removeClass('fa-angle-right').addClass('fa-angle-double-right');
		$obj.append($prev).append($next);
		for(i=start;i<end;i++) {
			var active = ((i+1) == page_num) ? 'active' : '';
			$obj.children().last().before($('<li class="tpl-forum-page ' + active + '" data-id="' + id + '" data-page="' + page + '" data-view="' + view + '" data-page-num="' + (i+1) + '" data-pid="' + id + '"><a href="#">' + (i+1) + '</a></li>'));
		}
		if(pages>1 && pages>=page_num && pages>page_view)
			$obj.prepend($first).append($last);
	}


	var getGroupMembers = function(id, userid) {
		userid = (typeof userid == 'undefined' || !userid) ? '' : userid;
		var $grouplist = $('#group-list-'+id+' .panel-body');
		$grouplist.find('.empty').remove();
		$grouplist.find('.group-member-list').remove();

		$grouplist.append(getGroupMemberList(id,userid));
	}

	var setMemberPagination = function($obj,total,page_num,id) {
		var page_view = 10, view = 10,
		    start = Math.floor((page_num-1) / page_view) * page_view,
		    pages = Math.ceil(total/view),
		    end = (Math.floor((page_num-1) / page_view) + 1) * page_view,
		    end = (end>pages) ? pages : end,
		    prev = (start > 0) ? start : 1,
		    next = ((end+1) > pages) ? pages : end+1;

		var $prev = $('<li class="forum-group-member-pagination" data-id="' + id + '" data-view="' + page_view + '" data-page-num="' + prev + '"><a href="#"><i class="fa fa-angle-left"></i></a></li>'),
			$next = $('<li class="forum-group-member-pagination" data-id="' + id + '" data-view="' + page_view + '" data-page-num="' + next + '"><a href="#"><i class="fa fa-angle-right"></i></a></li>');
			
		$obj.empty();
		$obj.append($prev);
		for(i=start;i<end;i++) {
			var active = ((i+1) == page_num) ? 'active' : '';
			$obj.append($('<li class="forum-group-member-pagination ' + active + '" data-id="' + id + '" data-view="' + page_view + '" data-page-num="' + (i+1) + '"><a href="#">' + (i+1) + '</a></li>'));
		}
		if(end==0) { 
			$obj.append($('<li class="forum-group-member-pagination" data-id="' + id + '" data-view="' + page_view + '" data-page-num="0"><a href="#">1</a></li>'));
		}
		$obj.append($next);
	}

	$doc.on('click','.forum-group-member-pagination', function(e) {
		var id = $(this).attr('data-id'),
			page = $(this).attr('data-page-num');
		if(page==0) return false;
	});

	var tplmemberSearch = function(id) {
		var str = '\
			<div class="forum-member-search">\
				<input type="text" class="config-input member-search" placeholder="' + $.lang[LANG]['board.enter-member-id'] + '">\
				<span class="btn btn-forum-config btn-forum-group-search" data-toggle="tooltip" data-placement="top" title="SEARCH" data-id="' + id + '" style="margin-top:-3px;height:39px;"><i class="fa fa-check"></i></span>\
			</div>\
		';
		return str;
	}

	$doc.on('change','#g-sfl',function(e) {
		$('.btn-forum-group-search').click();
	});

	$doc.on('click','.btn-forum-group-search',function(e) {
		if($(this).hasClass('clicked')) return false;
		else $(this).addClass('clicked');
//************************************************************************************************************************************************************아래 바꾸기
			// live 
			// mtype = (SERVICE.indexOf('gabia') > -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink',
			
			// gabia test
			// mtype = (SERVICE.indexOf('gabia') == -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink',

		var id = $(this).attr('data-id'),
			gsfl = $('#g-sfl option:selected').attr('data-id'),
			gstx = $('#g-stx').val().toLowerCase().trim(),
			mtype = (SERVICE.indexOf('gabia') > -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink',
			str = '';

		if(checkEmojis(gstx)) {
			e.preventDefault();
			$('.btn-forum-group-search').removeClass('clicked');
			errorEmojisModal();
			return false;
		}

		$.post('/fm/group/membersearch', { id : id, gsfl : gsfl, gstx : gstx, mtype:mtype }, function(data) {
			if(typeof data.error != 'undefined' && data.error) {
				$('#group-accordion').html('<div class="empty">' + data.error + '</div>');
				$('.btn-forum-group-search').removeClass('clicked');
				return false;
			}
			if(!$.isNumeric(gsfl) && !gstx) {
				$('#g-stx').val('');
				$('#g-sfl option:first-child').attr('selected',true);
				$.forum.getgroupdata($('.flat-gc-modal .modal').attr('data-fid'));
				$('.btn-forum-group-search').removeClass('clicked');
				return false;
			}

			if(data.total>0) {
				var group = '',
					mtype = (SERVICE.indexOf('gabia') > -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink';

				$.each(data.list, function(i,v) {
					if(group != v.fg_id) {
						group = v.fg_id;
						str = (group=='') ? '' : str + '\
									</ul>\
								</div>\
							</div>\
						</div>\
						';
						str = str + '\
						<div class="panel">\
							<div class="panel-heading">\
								<div class="panel-title">\
									<a class="accordion-toggle collapsed group-item" data-id="' + group + '" data-member-count="' + v.fg_member_count + '">\
										<label class="group-name hand">' + v.fg_name + '</label>\
										<span class="group-member-count">' + v.fg_member_count + '</span>\
										<svg viewBox="0 0 8 4" width="8" height="4"><polygon points="0 0 4 4 8 0 "/></svg>\
									</a>\
									<div class="content">\
										<span>\
											<svg viewBox="0 0 13 13" width="13" height="13" class="group-user-add hand">\
												<polygon points="13 2 11 2 11 0 10 0 10 2 8 2 8 3 10 3 10 5 11 5 11 3 13 3 "/>\
												<path d="M6.83 8.36C7.54 7.81 8 6.96 8 6c0-1.66-1.34-3-3-3S2 4.34 2 6c0 0.96 0.46 1.81 1.17 2.36C1.31 9.09 0 10.89 0 13h1c0-2.21 1.79-4 4-4s4 1.79 4 4h1C10 10.89 8.69 9.09 6.83 8.36zM3 6c0-1.1 0.9-2 2-2 1.1 0 2 0.9 2 2S6.1 8 5 8C3.9 8 3 7.1 3 6z"/>\
											</svg>\
										</span>\
										<span>\
											<svg viewBox="0 0 13 13" width="13" height="13" class="group-name-edit hand">\
												<path d="M4.32 8.05C4.2 8.39 4.46 8.71 4.79 8.71c0.05 0 0.11-0.01 0.16-0.03L7 8l6-6-2-2L5 6 4.32 8.05zM5.87 6.54L11 1.41 11.59 2 6.46 7.13 5.58 7.42 5.87 6.54z"/>\
												<path d="M9 11c0 0.55-0.45 1-1 1H2c-0.55 0-1-0.45-1-1V4c0-0.55 0.45-1 1-1h3V2H2C0.9 2 0 2.9 0 4v7c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V8H9V11z"/>\
											</svg>\
										</span>\
										<span>\
											<svg viewBox="0 0 12 13" width="12" height="13" class="group-delete hand">\
												<path d="M12 2h-1H9V0H3.02v2H1 0v1h1v8c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V3h1V2zM4.02 1H8v1H4.02V1zM10 11c0 0.55-0.45 1-1 1H3c-0.55 0-1-0.45-1-1V3h1.02H9h1V11z"/>\
												<rect x="4" y="4" width="1" height="7"/><rect x="7" y="4" width="1" height="7"/>\
											</svg>\
										</span>\
									</div>\
								</div>\
							</div>\
							<div id="group-list-' + group + '" class="panel-collapse" style="display:none;">\
								<div class="panel-body">\
									<ul class="group-member-list">\
						';
					}
					if(v.fg_member_count!=0) {
						str += '\
										<li class="gm-item">\
											<div>\
												<div class="gmi-img">\
													<span class="hexagon">\
														<img src="'+v.img+'" alt="" class="img-responsive">\
													</span>\
												</div>\
					                			<div class="gmi-info">\
					    ';
					    if(v.name != v.id) {
						    str += '\
						                			<span class="gmi-name">' + v.name + '</span>\
							';
						}
						str += '\
						                			<span class="gmi-id">' + v.id + '</span>\
					                			</div>\
					                			<div class="gmi-btn">\
													<svg viewBox="0 0 12 13" width="12" height="13" class="gmi-del hand" data-userid="' + v.id + '" data-id="' + v.fg_id + '">\
														<path d="M12 2h-1H9V0H3.02v2H1 0v1h1v8c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V3h1V2zM4.02 1H8v1H4.02V1zM10 11c0 0.55-0.45 1-1 1H3c-0.55 0-1-0.45-1-1V3h1.02H9h1V11z"/>\
														<rect x="4" y="4" width="1" height="7"/><rect x="7" y="4" width="1" height="7"/>\
													</svg>\
												</div>\
											</div>\
										</li>\
						';
					} else {
						str = str + '<div class="empty">' + $.lang[LANG]['board.group-no-members'] + '</div>';
					}
				});
				str = str + '\
									</ul>\
								</div>\
							</div>\
						</div>\
				';
			}
			//  else {
			// 	str = '<div class="empty">' + $.lang[LANG]['board.empty-member-in-group'] + '</div>';
			// }
			$('#group-accordion').html(str);
			$('.btn-forum-group-search').removeClass('clicked');

		}, 'json');
	});

	var displayMember = function(mb) {
		var str = '\
			<li>\
				<span class="userimg"><img src="' + mb.img + '"></span>\
				<span class="user-info"><div class="user-name">' + mb.name + '</div><div class="user-id">' + mb.id + '</div></span>\
				<div class="userdel" data-userid="' + mb.id + '" data-id="' + mb.fg_id + '"><i class="fa fa-trash-o"></i></div>\
			</li>\
		';
		return str;
	}

	$doc.on('click','.member .userdel', function(e) {
		var userid = $(this).attr('data-userid'),
			id = $(this).attr('data-id'),
			mtype = (SERVICE.indexOf('gabia') > -1 || VALIDTYPE == 'SM' || (VALIDTYPE == 'BN' && SITEUM > 0)) ? 'um' : 'creatorlink';

		initControlForm();
		$('.delete-member-userid').text(userid);
		$('.btn-forum-group-delete-member-ok').attr('data-userid',userid).attr('data-id',id).attr('data-mtype',mtype);
		$('.forum-group-delete-member-confirm').show();
	});

	$doc.on('click','.btn-forum-group-delete-member-ok',function(e) {
		var userid = $(this).attr('data-userid'),
			id = $(this).attr('data-id'),
			mtype = $(this).attr('data-mtype');

		$.post('/fm/group/userdel', { id : id, userid : userid, mtype : mtype }, function(data) {
			if(typeof data.error != 'undefined' && data.error) {
				$('.forum-group-delete-member-confirm .content').append('<div class="config-error">' + data.error + '</div>')
				return false;
			}
		},'json');
	});


	$doc.on('change','#scate', function(e) {
		var dataCheck =  ($(this).parents('.element').find('.tpl-forum-pagination').children().length > 0) ? true :  false;
		
		$this_pagination = $(this).parents('.element').find('.tpl-forum-pagination li.active');
		var sfl = $(this).parents('.search-box').find('#sfl').val(),
			stx = $(this).parents('.search-box').find('#stx').val(),
			scate = $(this).find('option:selected').val(),
			id = (dataCheck) ? $this_pagination.attr('data-id') : $(this).parents('.element').attr('data-id'),
			page = (dataCheck) ? $this_pagination.attr('data-page') : $(this).parents('.element').find('.tpl-forum-pagination').attr('data-page'),
			page_num = (dataCheck) ? $this_pagination.attr('data-page-num') : 1,
			view = (dataCheck) ? $this_pagination.attr('data-view') : $(this).parents('.element').find('.tpl-forum-pagination').attr('data-view');

    	$.forum.setForumCookie(id,page_num,stx,sfl,scate);
		cookie_page_num = $.cookie('forum_'+id);
		$.forum.init(id,page,view,cookie_page_num,sfl,stx,scate);
		activeEL('userEL'+id);
	});

	$('.search-btn').live('click', function(e) {
		if($(this).parents('.element').attr('data-type') != 'forum') return false;
		e.preventDefault();
		var dataCheck =  ($(this).parents('.element').find('.tpl-forum-pagination').children().length > 0) ? true :  false;
		
		$this_pagination = $(this).parents('.element').find('.tpl-forum-pagination li.active');
		var sfl = $(this).parents('.search-box').find('#sfl').val(),
			stx = $(this).parents('.search-box').find('#stx').val(),
			scate = ($(this).parents('.search-box').find('#scate option:selected').length > 0) ? $(this).parents('.search-box').find('#scate option:selected').val() : '',
			id = (dataCheck) ? $this_pagination.attr('data-id') : $(this).parents('.element').attr('data-id'),
			page = (dataCheck) ? $this_pagination.attr('data-page') : $(this).parents('.element').find('.tpl-forum-pagination').attr('data-page'),
			page_num = (dataCheck) ? $this_pagination.attr('data-page-num') : 1,
			view = (dataCheck) ? $this_pagination.attr('data-view') : $(this).parents('.element').find('.tpl-forum-pagination').attr('data-view');

		var regexp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=“‘,]/gi;
		if(regexp.test(stx) || regexp.test(scate)) {
			$(this).showModalFlat('ERROR', '특수문자를 입력할 수 없습니다.', true , false, '', 'close');
			return false;
		}

    	$.forum.setForumCookie(id,page_num,stx,sfl,scate);
		cookie_page_num = $.cookie('forum_'+id);
		$.forum.init(id,page,view,cookie_page_num,sfl,stx,scate);
		activeEL('userEL'+id);
	});

	$doc.on('keypress','input#stx', function (e) {
		if(e.which == 13 && $(this).val().length>0) $(this).closest('.search-box').find('.search-btn').click();
	});

	$(document).on('mouseenter','#forum-modal .edt-type-file',function(e) {
		$(this).addClass('active');
		var left = $(this).find('.fr-file').width() + 50;
		$(this).append('<span class="edt-file-delete" style="left:' + (left+5) + 'px"><i class="fa fa-trash-o"></i></span>');
		$(this).append('<span class="edt-enter" style="left:' + (left+15) + 'px"><img src="//storage.googleapis.com/i.addblock.net/icon/editor-enter.png"></span>');
	}).on('mouseleave','#forum-modal .edt-type-file',function(e) {
		$(this).removeClass('active');
		$('.edt-file-delete').remove();
		$('.edt-enter').remove();
	}).on('click','#forum-modal .edt-type-file, #forum-modal .fr-file',function(e) {
		e.stopPropagation();
		e.preventDefault();
		if($(this).parents('p').next().length == 0) {
			$(this).parents('p').after('<p class="last-line-empty"><br></p>');
			$(('#forum-modal')).scrollTop($('#forum-modal').height());
		}
	});
	$(document).on('click','#forum-modal .edt-file-delete', function(e) {
		$('#fm-editor').froalaEditor('undo.saveStep');
		$(this).parents('.edt-type-file').remove().focus();
	});

	$(document).on('click','#forum-modal .edt-enter', function(e) {
		$('#fm-editor').froalaEditor('undo.saveStep');
		$(this).parents('p').after('<p><br></p>');
	});

	$(document).on('mousedown','.fr-file',function(e) {
		if(PAGE_MODE!='c') {
			var url = new getLocation($(this).parent().attr('data-href')),
				file_name = encodeURIComponent($(this).text().trim());
			
			var go = '/down?n=' + file_name + '&s=' + (url.pathname).replace('/cr-resource/forum/','').replace('/','&f=');
			window.open(go,'_blank');
		}
	});

	$doc.on('click','#forum-modal .fr-view a[rel="nofollow"], #forum-modal .fr-view a.fr-file, #forum-modal .edt-type-file',function(e) {
		var tTop = $(this).offset().top;
		frAbove = '';
		scrollPos = $('#forum-modal').scrollTop();
		scrollPos2 = $('#forum-modal').scrollTop();

		if($(this).hasClass('fr-file') || $(this).hasClass('edt-type-file')) {
			popPos =  tTop + 37;
		} else {
			popPos = tTop + 20;
		}

		var wHeight = $('#forum-modal').height();
		if(tTop + 80 > wHeight) {
			popPos = ($(this).hasClass('.fr-file') || $(this).hasClass('edt-type-file')) ? popPos - 58 : popPos - 40;
		}
		e.stopPropagation();
		e.preventDefault();
	});

	function hideToolbar() {
		isOff = true;
		$('#fm-editor').froalaEditor('selection.clear');
		$('#fm-editor').froalaEditor('edit.off');
		$('.fr-toolbar').css('visibility','hidden');
		$('.fr-popup').remove();
		$('.fr-image-resizer').remove();
	}
	function showTollbar() {
		isOff = false;
		$('#fm-editor').froalaEditor('edit.on');
		$('.fr-toolbar').css('visibility','visible');
	}

	function getCursorPos($obj) {
		var tTop = $obj.offset().top;
		frAbove = '';
		scrollPos = $('#forum-modal').scrollTop();
		scrollPos2 = $('#forum-modal').scrollTop();

		popPos = tTop + 20;

		var wHeight = $('#forum-modal').height();
		if(tTop + 80 > wHeight) {
			popPos = popPos - 60;
		}
	}

	function groupAddClass(group_member_list_check, $select, input_text, member_list) {

		$select.parents('.panel').find('.empty').hide();
		if(group_member_list_check > 0) $select.parents('.panel').find('.group-member-list').prepend(input_text);		
		else $select.parents('.panel').find('.panel-body').append(member_list);
		settingEditMode(true);
	}




	$doc.on('hidden.bs.modal', '.flat-forum-category-modal', function() {
		var fcategory_str = '';
		$(this).find('.forum-category-name').each(function(idx) {
			fcategory_str += (idx == 0) ? $(this).text() : ', '+$(this).text();
		});

		var pid = $(this).find('.modal[id*=flat-modal]').attr('data-pid');
		if(	$('.element[data-id="' + pid + '"]').find('#scate').length > 0 && 
			$('.element[data-id="' + pid + '"]').find('#scate').css('display') !== 'none'
		) {
			$.forum.drawSelboxCategory($('.element[data-id="' + pid + '"]'),pid);
		}

		if(!fcategory_str) fcategory_str = $.lang[LANG]['editor.category.empty'];
		if($('#el-blockConfig').length > 0) $('#el-blockConfig .forum-category-str').text(fcategory_str);
		$(this).remove();
	});

	$doc.on('click','#el-blockConfig .ctrl-forum-category',function(e) {
		var str = '',
			id = selectID;

		$.post('/fm/category/list', { pid: id, sid: F_SID }, function(data) {
			if(typeof data.error != 'undefined' && data.error) {
				$(this).showModalFlat('ERROR',data.error,true,false,'','ok');
				return false;
			}
			var forum_cate_modal = $(this).showModalFlat($.lang[LANG]['editor.forum.category.config'], categoryConfigForum(data,id),true,false,'','close', 'ok', 'cl-cmmodal cl-s-btn w560 cl-p70 cl-p0 forum-category-modal').attr({'data-pid':id}).closest('.flat-modal').addClass('flat-forum-category-modal');
		}, 'json');


        $('.forum-category-content:not(.empty)').sortable({  
            items: '.forum-category-item',
            cancel: '.forum-category-update-cancel, button, .forum-category-update-name',
            init: function(event,ui) {
                var start_idx = -1,
                	pid = '';
            },
            start: function(event,ui) {
                start_idx = ui.item.index();
                pid = $('.'+selectEL).attr('data-id');
            },
            update: function (event, ui) { 
                $(this).children().each(function(i,o) {
            		$(this).attr('id','forumCateSort'+i).attr('data-idx',i);
					$(this).find('[data-idx]').each(function() { $(this).attr('data-idx',i); });
					$.post('/fm/category/replace', { sid : F_SID, pid : pid, cate : $(this).attr('data-cate'), code : i+1 }, function(data) {
            			if(typeof data.error != 'undefined' && data.error) {
							$(this).showModalFlat('ERROR',data.error,true,false,'','ok');
							return false;
						}
					},'json');
                });
            }
        }).disableSelection();
	});

        

	//forum category Config (Add.Edit.Remove)
	var categoryConfigForum = function (data,id) {
		var empty = (data.length > 0) ? '' : 'empty',
			forum_category_list = '',
			str = '';

		$.each(data, function(i,v) {
			if(v) forum_category_list = forum_category_list + forumCategoryItem(v.fca_name.trim(), i,v.seq);
		});

		forum_category_list = (empty) ? '<p>' + $.lang[LANG]['editor.category.empty'] + '</p>' : forum_category_list;

		str = '\
        <div class="forum-category-header">\
            <p>' + $.lang[LANG]['editor.category.description'] + '</p>\
        </div>\
        <div class="forum-category-content ' + empty + '">\
            ' + forum_category_list + '\
        </div>\
        <div class="btn-wrap">\
        	<span class="btn forum-category-add">\
				<svg viewBox="0 0 12 12" width="12" height="12"><polygon points="12 5 7 5 7 0 5 0 5 5 0 5 0 7 5 7 5 12 7 12 7 7 12 7 "/></svg>\
				' + $.lang[LANG]['config.gallery.add'] + '\
			</span>\
        </div>\
        ';
		return str;
	}

	var forumCategoryItem = function(name,idx,seq) {
		var categoryAdd = (!name) ? 'additem' : '',
			cate_seq = (!seq) ? '' : seq;

		var str = '\
			<div class="forum-category-item ' + categoryAdd + '" id="forumCateSort' + idx + '" data-idx="' + idx + '" data-cate="' + cate_seq + '">\
				<div class="forum-category-info">\
					<span class="icons hand">\
						<svg viewBox="0 0 14 14" width="14" height="14">\
							<polygon points="14 7 11 4 11 6 8 6 8 3 10 3 7 0 4 3 6 3 6 6 3 6 3 4 0 7 3 10 3 8 6 8 6 11 4 11 7 14 10 11 8 11 8 8 11 8 11 10 "/>\
						</svg>\
					</span>\
					<span class="forum-category-name">' + name + '</span>\
				</div>\
				<div class="forum-config-icons">\
					<div class="icons hand">\
						<svg viewBox="0 0 13 13" width="13" height="13" class="forum-category-edit" data-idx="' + idx + '">\
							<path d="M4.32 8.05C4.2 8.39 4.46 8.71 4.79 8.71c0.05 0 0.11-0.01 0.16-0.03L7 8l6-6-2-2L5 6 4.32 8.05zM5.87 6.54L11 1.41 11.59 2 6.46 7.13 5.58 7.42 5.87 6.54z"/><path d="M9 11c0 0.55-0.45 1-1 1H2c-0.55 0-1-0.45-1-1V4c0-0.55 0.45-1 1-1h3V2H2C0.9 2 0 2.9 0 4v7c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V8H9V11z"/>\
						</svg>\
					</div>\
					<div class="icons hand">\
						<svg viewBox="0 0 12 13" width="12" height="13" class="forum-category-delete hand" data-idx="' + idx + '">\
							<path d="M12 2h-1H9V0H3.02v2H1 0v1h1v8c0 1.1 0.9 2 2 2h6c1.1 0 2-0.9 2-2V3h1V2zM4.02 1H8v1H4.02V1zM10 11c0 0.55-0.45 1-1 1H3c-0.55 0-1-0.45-1-1V3h1.02H9h1V11z"/><rect x="4" y="4" width="1" height="7"/><rect x="7" y="4" width="1" height="7"/>\
						</svg>\
					</div>\
				</div>\
			</div>\
		';
		return str;
	}

	var forumCategoryItemEmptyCheck = function() {
		if($('.forum-category-content').find('.forum-category-item').length == 0) {
			$('.forum-category-content').addClass('empty').html('<p>' + $.lang[LANG]['editor.category.empty'] + '</p>');
		} else {
			$('.forum-category-content').removeClass('empty').find('p').remove();

			$('.forum-category-content:not(.empty)').sortable({  
				items: '.forum-category-item',
				cancel: '.forum-category-update-cancel, button, .forum-category-update-name',
				update: function (event, ui) {
				}
			}).disableSelection();
		}
	}

	var addForumCategoryInput = function(cateidx, catename, cateseq) {
		var cateidx = (typeof cateidx == 'undefined' || !cateidx) ? $('.forum-category-content .forum-category-item').length : cateidx,
			cateseq = (typeof cateseq == 'undefined' || !cateseq) ? '' : cateseq,
			catename = (typeof catename == 'undefined' || !catename) ? '' : catename,
		// catecode = (typeof catecode == 'undefined' || !catecode) ? Number($('.forum-category-content .forum-category-item').last().attr('data-code')) + 1 : catecode,
			str = '\
				<div class="forum-category-update">\
					<div class="input-group">\
						<input type="text" class="forum-category-update-name forum-control" placeholder="' + $.lang[LANG]['editor.gallery.category.enter-name'] + '" value="' + catename + '"/>\
						<span class="input-group-btn">\
							<button class="forum-category-update-save btn btn-active" data-id="' + selectID + '" data-idx="' + cateidx + '" data-cate="' + cateseq + '">\
								<svg viewBox="0 0 15 10" width="15" height="10">\
									<path d="M14.29 0L5.5 8.79 0.71 4 0 4.71l5.15 5.15C5.24 9.95 5.37 10 5.5 10s0.26-0.05 0.35-0.15L15 0.71 14.29 0z"/>\
								</svg>\
							</button>\
						</span>\
						<div class="forum-category-update-cancel">\
							<svg viewBox="0 0 12 12" width="12" height="12">\
								<polygon points="12 0.71 11.29 0 6 5.29 0.71 0 0 0.71 5.29 6 0 11.29 0.71 12 6 6.71 11.29 12 12 11.29 6.71 6 "/>\
							</svg>\
						</div>\
					</div>\
				</div>\
			';
		return str;
	}

	$doc.on('click', '.forum-category-delete', function(e) {
		// var checkLast = ($(this).closest('.forum-category-content').find('.forum-category-item').length <= 1) ? true : false;
		// if(checkLast) {
		// 	$(this).showModalFlat($.lang[LANG]['config.information'], $.lang[LANG]['editor.gallery.category.delete.last'], true, false, '', 'ok','', 'cl-cmmodal cl-s-btn w560 cl-p130 cl-p0 cl-okbtn-pbt70');
		// 	return false;
		// }
		
        var idx = $(this).attr('data-idx'),
        	cate = $('.forum-category-content #forumCateSort'+idx).attr('data-cate');
        
        $('.modal.modal-default.fade.in').css('zIndex','1029');
        var category_del_modal = $(this).showModalFlat($.lang[LANG]['editor.gallery.category.delete.title'], $.lang[LANG]['editor.gallery.category.delete'], true, true, function() {

			$.post('/fm/category/delete', {  sid : F_SID, pid : selectID, cate: cate}, function(data) {
				if(typeof data.error != 'undefined' && data.error) {
					return false;
				}
	            $('.forum-category-content #forumCateSort'+idx).remove();
	            $('.'+selectEL).find('#scate option[value="' + data.seq + '"]').remove();
				$('.'+selectEL).find('.tpl-forum-list-category[data-cate="' + cate + '"]').text('');

				$('.forum-category-content .forum-category-item').each(function(i) {
					$(this).attr('id','forumCateSort'+i).attr('data-idx',i);
					$(this).find('[data-idx]').each(function() { $(this).attr('data-idx',i); });
				});

				forumCategoryItemEmptyCheck();
				category_del_modal.modal('hide');
			},'json');

        },'cancel','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0','','','',function(){
            $('.modal.modal-default.fade.in').css('zIndex','');
        });

	});

	$doc.on('click', '.forum-category-add', function(e) {
		if($('.forum-category-content').find('.forum-category-update').length > 0 ) {
			$('.forum-category-content').find('.forum-category-update-name').focus();
			return false;
		}
		
        var idx = $('.forum-category-content .forum-category-item').length,
            str = forumCategoryItem('',idx,'');
        	// code = (idx > 0) ? Number($('.forum-category-content .forum-category-item').last().attr('data-code')) + 1 : 1,

        $('.forum-category-content').append(str);

        forumCategoryItemEmptyCheck();
        $('.forum-category-edit[data-idx=' +idx +']').click();
	});

	$doc.on('click', '.forum-category-edit', function(e) {
        if($('.forum-category-content').find('.forum-category-update').length>0) return false;

        var cate_idx = $(this).attr('data-idx'),
			cate_seq = $('.forum-category-content').find('#forumCateSort'+cate_idx).attr('data-cate'),
			cate_name = $('.forum-category-content').find('#forumCateSort'+cate_idx).find('.forum-category-name').text();

        var input_text = addForumCategoryInput(cate_idx,cate_name,cate_seq);

        $(input_text).appendTo($('.forum-category-content').find('#forumCateSort'+cate_idx).find('.forum-category-info'));
        
        $('.forum-category-content').find('.forum-category-item').css('pointer-events','none');
        $('.forum-category-content').find('.forum-category-update-cancel, .forum-category-update-save, .forum-category-update-name').css('pointer-events','auto');
        $('.forum-category-update .forum-category-update-name').focus();
	});

	$doc.on('click', '.forum-category-update-cancel', function(e) {
		if(!$(this).closest('.forum-category-info').find('.forum-category-name').text()) {
			$(this).closest('.forum-category-item').remove();
			forumCategoryItemEmptyCheck();
		}
		$('.forum-category-content').find('.config-error').remove();
		$('.forum-category-content').find('.forum-category-item').removeAttr('style');
		$('.forum-category-content').find('.forum-category-update').remove();
	});

	$doc.on('click', '.forum-category-update-save', function(e) {
		if($(this).hasClass('clicked')) return false;
		else $(this).addClass('clicked');

        var pid = $(this).attr('data-id'),
            idx = $(this).attr('data-idx'),
            cate_seq = $('.forum-category-content').find('#forumCateSort'+idx).attr('data-cate'),
            position = $('.forum-category-content'),
            category_name = $('.forum-category-update-name').val().trim(),
            category_prev = position.find('#forumCateSort'+idx+' .forum-category-name').text().trim(),
            regexp = /^[ㄱ-ㅎ가-힣ㅏ-ㅣa-zA-Z0-9\# ]+$/i;

        $position = (position.find('.forum-category-item').length > idx) ? position.find('#forumCateSort'+idx) : position;

        $('.config-error').remove();
		var show_error_fc_save = function(error_message) {
			$position.append('\
				<div class="config-error">\
					' + clSVG('info',13,13) +'\
					<span>' + error_message + '</span>\
				</div>\
		    ');
		    $('.forum-category-update-save').removeClass('clicked');
		}

        if(category_prev == category_name) {
            if($('.forum-category-content #forumCateSort'+idx).hasClass('additem')) {
            	show_error_fc_save($.lang[LANG]['editor.gallery.category.enter-name']);
            } else {
                $('.forum-category-content').find('.forum-category-item').removeAttr('style');
                $('.forum-category-content').find('.forum-category-update').remove();
                $('.forum-category-update-save').removeClass('clicked');
            }
            return false;
        }
        if(!regexp.test(category_name)) {
        	show_error_fc_save($.lang[LANG]['board.allowed-chars']);
            return false;
        }
        if(category_name.length<1) {
        	show_error_fc_save($.lang[LANG]['board.enter-group-name']);
            return false;
        }
        if(category_name.length>15) {
        	show_error_fc_save($.lang[LANG]['board.enter-max-chars.15']);
            return false;
        }
        var list =  position.find('.forum-category-item .forum-category-name').map(function() { return $(this).text().trim(); }).get();
        if($.inArray(category_name,list) > -1 ) {
        	show_error_fc_save($.lang[LANG]["editor.gallery.category.inuse-name"]);
        	return false;
        }


		$.post('/fm/category/update', {  sid : F_SID, pid : pid, cate: cate_seq, name : encodeURIComponent(category_name) }, function(data) {
			if(typeof data.error != 'undefined' && data.error) {
				show_error_fc_save(data.error);
				return false;
			}

			if($('#forumCateSort'+idx).hasClass('additem')) $('#forumCateSort'+idx).removeClass('additem');
			$('#forumCateSort'+idx).attr('data-cate',data.seq);
			$('#forumCateSort'+idx).find('.forum-category-name').text(category_name);

			position.find('.forum-category-item').removeAttr('style');
			position.find('.forum-category-update').remove();

			if($('.'+selectEL).find('#scate option[value="' + data.seq + '"]').length > 0 ) $('.'+selectEL).find('#scate option[value="' + data.seq + '"]').text(category_name);
			else $('.'+selectEL).find('#scate').append('<option value="'+data.seq+'">'+category_name+'</option>');

			$('.'+selectEL).find('.tpl-forum-list-category[data-cate='+data.seq+']').text(category_name);
			
			$('.forum-category-update-save').removeClass('clicked');
		},'json');
	});





}(jQuery));
