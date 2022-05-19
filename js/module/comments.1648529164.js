(function($) {
	var user = {
		'id' : '',
		'reply' : '',
		'name' : '',
		'pass' : '',
		'parent' : '',
		'content' : '',
		'key' : '',
		'secret' : ''
	}
	var PID = 0,
		CTYPE = 'P';

	var resetUser = function(o) {
		$.each(o,function(k,v) {
			o[k] = '';
		});
		return o;
	}
	var uniqID = function() {
		return Math.round(new Date().getTime() + (Math.random() * 100));
	}

	var tplWrap = function(pageID,checkGalProject) {
        var menu_lock = (PAGE_MODE == 'c') ? '' : property.ISLOCK,
            comments_class = (typeof menu_lock != 'undefined' && menu_lock == 'true') ? 'hide ' : '';

		var id = uniqID(),
			checkGalProject = (checkGalProject) ? checkGalProject : '',
			$str = $('<div class="page-comments ' + comments_class + checkGalProject + '" data-id="' + pageID + '"></div>');

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

	var tplForm = function(my_image) {
		var $form = $('.tpl-comment-form');
		$form.fadeOut('fast',function() {
			$(this).remove();
		});

		var p_settings = (CTYPE == 'F' && typeof F_PARENT != 'undefined' && typeof F_PARENT.settings != 'undefined') ? JSON.parse(F_PARENT.settings) : {},
			comm_placeholder = (typeof p_settings.forum_type != 'undefined' && p_settings.forum_type == 'qna') ? $.lang[LANG]['config.comments.placeholder.qna'] : $.lang[LANG]['config.comments.placeholder'],
			str = '\
			<div class="tpl-comment-form">\
				<div class="comm-wrap">\
					<div class="comm-body">\
						<span class="comm-profile">\
							<svg viewbox="0 0 40 40" width="35" height="35">\
								<pattern id="comment-write-image" patternUnits="userSpaceOnUse" width="40" height="40">\
									<image xlink:href="' + my_image + '?_' + new Date().getTime() + '" width="40" height="40" />\
								</pattern>\
								<circle cx="20" cy="20" r="20" fill="url(#comment-write-image)"/>\
							</svg>\
						</span>\
						<div class="comm-area">\
							<textarea class="form-control" id="comm-content" placeholder="' + comm_placeholder + '"></textarea>\
						</div>\
					</div>\
					<div class="comm-footer">\
			 			<div class="checkbox">\
			 				<label>\
			 					<input type="checkbox" id="comm-secret">\
			 					<span class="cl-icon"><svg viewBox="0 0 16 16" width="16" height="16"><path d="M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z"/></svg><svg viewBox="0 0 16 16" width="16" height="16" class="active"><path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/></svg></span>\
			 					' +  $.lang[LANG]['config.secret-post'] + '\
			 				</label>\
			 			</div>\
						<div class="btn-box comment-submit"><span class="btn btn-submit btn-round"> ' +  $.lang[LANG]['config.comment'] + '</span></div>\
					</div>\
				</div>\
			</div>\
			';
		return str;
	}

	var updateForm = function(content,input,id,only_secret) {

		var secret = (user.secret) ? 'checked' : '',
			area_str = '\
							<input type="hidden" id="update-passwd" value="' + input + '">\
							<input type="hidden" id="update-id" value="' + id + '">\
							<textarea class="form-control" id="update-content" placeholder="' + $.lang[LANG]['config.comments.placeholder'] + '">' + content + '</textarea>\
			',
			footer_str = '\
					<div class="comm-footer">\
			 			<div class="checkbox">\
		';

		if(!only_secret) { 
			footer_str += '\
			 				<label>\
			 					<input type="checkbox" id="update-secret" ' + secret + '>\
			 					<span class="cl-icon"><svg viewBox="0 0 16 16" width="16" height="16"><path d="M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z"/></svg><svg viewBox="0 0 16 16" width="16" height="16" class="active"><path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/></svg></span>\
			 					' +  $.lang[LANG]['config.secret-post'] + '\
			 				</label>\
			'; 
		} else {
			footer_str += '		<label data-toggle="tooltip" data-placement="top" data-html="true" data-original-title="' + $.lang[LANG]['config.secret-replies'] + '">\
								<span class="cl-icon"><svg viewBox="0 0 16 16" width="16" height="16" class="active"><path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/></svg></span>\
				 				' +  $.lang[LANG]['config.secret-post'] + '\
							</label>';
		}

		footer_str += '\
			 			</div>\
						<div class="btn-box update-submit"><span class="btn btn-round btn-submit"> ' +  $.lang[LANG]['config.comment'] + '</span></div>\
						<div class="btn-box update-cancel"><span class="btn btn-round cm-cancel"> ' +  $.lang[LANG]['config.cancel'] + '</span></div>\
					</div>\
		';

		return {'area':area_str, 'footer':footer_str};

		/* before
		var secret = (user.secret) ? 'checked' : '';
		var str = '' +
			'<div class="tpl-comment-form update-form">' +
				'<div class="pull-right cm-cancel"><i class="fa fa-times"></i></div>' + 
				'<table class="comment-textarea">' +
					'<tbody>' +
						'<tr>' +
							'<td>' +
								'<textarea class="form-control" id="update-content" data-autoresize>' + content + '</textarea>' +
								'<div class="btn-group clear clearfix">' +
						 			'<div class="checkbox">' +
								    	'<label><input type="checkbox" id="update-secret" ' + secret + '><i class="fa fa-check-circle" id="update-secret-icon" aria-hidden="true"></i> ' +  $.lang[LANG]['config.secret-post'] + '</label>' +
								  	'</div>' +
								  	'<div class="btn-mobile update-submit"><span class="btn btn-submit btn-round"><i class="fa fa-paper-plane" aria-hidden="true"></i> ' +  $.lang[LANG]['config.comment'] + '</span></div>' +
							  	'</div>' +
							  	'<input type="hidden" id="update-passwd" value="' + input + '">' +
							  	'<input type="hidden" id="update-id" value="' + id + '">' +
							'</td>' + 
							'<td class="form-submit update-submit"><span class="btn btn-submit btn-round"><i class="fa fa-paper-plane" aria-hidden="true"></i> ' +  $.lang[LANG]['config.comment'] + '</span></td>' +
						'</tr>' +
					'</tbody>' +
				'</table>' +
			'</div>';
		return str;
			*/
	}

	var replyForm = function(id,name,option, myImage) {
		var checkBoxSVG = '\
			',
			str = '\
			<div class="tpl-comment-form reply-form">\
				<div class="comm-wrap">\
					<div class="comm-body">\
						<span class="comm-profile">\
							<svg viewbox="0 0 40 40" width="35" height="35">\
								<pattern id="comment-reply-image' + id + '" patternUnits="userSpaceOnUse" width="40" height="40">\
									<image xlink:href="' + myImage + '?_' + new Date().getTime() + '" width="40" height="40" />\
								</pattern>\
								<circle cx="20" cy="20" r="20" fill="url(#comment-reply-image' + id + ')"/>\
							</svg>\
						</span>\
						<div class="comm-area">\
							<input type="hidden" id="reply-id" value="' + id + '">\
							<input type="hidden" id="reply-name" value="' + name + '">\
							<textarea class="form-control" id="reply-content" placeholder="' + $.lang[LANG]['config.comments.placeholder'] + '"></textarea>\
						</div>\
					</div>\
					<div class="comm-footer">\
			 			<div class="checkbox">\
		';
		if(!option) { 
			str += '\
			 				<label>\
			 					<input type="checkbox" id="reply-secret">\
								<span class="cl-icon"><svg viewBox="0 0 16 16" width="16" height="16"><path d="M13 0H3C1.3 0 0 1.3 0 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V3C16 1.3 14.7 0 13 0zM15 13c0 1.1-0.9 2-2 2H3c-1.1 0-2-0.9-2-2V3c0-1.1 0.9-2 2-2h10c1.1 0 2 0.9 2 2V13z"/></svg><svg viewBox="0 0 16 16" width="16" height="16" class="active"><path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/></svg></span>\
								' +  $.lang[LANG]['config.secret-post'] + '\
			 				</label>\
			'; 
		} else {
			str += '		<label data-toggle="tooltip" data-placement="top" data-html="true" data-original-title="' + $.lang[LANG]['config.secret-replies'] + '">\
								<span class="cl-icon"><svg viewBox="0 0 16 16" width="16" height="16" class="active"><path d="M13 0H3C1.34 0 0 1.34 0 3v10c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3C16 1.34 14.66 0 13 0zM13.03 6.03l-5.5 5.5C7.38 11.68 7.19 11.75 7 11.75s-0.38-0.07-0.53-0.22l-3.5-3.5c-0.29-0.29-0.29-0.77 0-1.06s0.77-0.29 1.06 0L7 9.94l4.97-4.97c0.29-0.29 0.77-0.29 1.06 0S13.32 5.74 13.03 6.03z"/></svg></span>\
				 				' +  $.lang[LANG]['config.secret-post'] + '\
							</label>';
		}
		str += '\
			 			</div>\
						<div class="btn-box reply-submit"><span class="btn btn-round btn-submit"> ' +  $.lang[LANG]['config.comment'] + '</span></div>\
						<div class="btn-box reply-cancel"><span class="btn btn-round cm-cancel"> ' +  $.lang[LANG]['config.cancel'] + '</span></div>\
					</div>\
				</div>\
			</div>\
		';


		/*
		var str = '' +
			'<div class="tpl-comment-form reply-form">' +
				'<div class="pull-right cm-cancel"><i class="fa fa-times"></i></div>' + 
				'<table class="comment-textarea">' +
					'<tbody>' +
						'<tr><td rowspan="2" colspab="2" class="form-profile form-imgae-profile" valign="top">'
						<svg viewbox="0 0 40 40"><pattern id="comment-reply-image' + id + '" patternUnits="userSpaceOnUse" width="40" height="40">
						<image xlink:href="' + myImage + '?_' + new Date().getTime() + '" x="-10" width="60" height="40" /><
						/pattern><circle cx="20" cy="20" r="20" fill="url(#comment-reply-image' + id + ')"/></svg></td></tr>' +
						'<tr>' +
							'<td>' +
								'<textarea class="form-control" id="reply-content" data-autoresize></textarea>' +
								'<div class="btn-group clear clearfix">' +
						 			'<div class="checkbox">';
			if(!option) str = str + '<label><input type="checkbox" id="reply-secret"><i class="fa fa-check-circle" id="reply-secret-icon" aria-hidden="true"></i> ' +  $.lang[LANG]['config.secret-post'] + '</label>';
			else str = str +  '<span data-toggle="tooltip" data-placement="top" data-html="true" data-original-title="' + $.lang[LANG]['config.secret-replies'] + '"><i class="fa fa-check-circle active" aria-hidden="true"></i> <span>' + $.lang[LANG]['config.secret-post'] + '</span></span>';
			str = str + '' +
								  	'</div>'+
								  	'<div class="btn-mobile reply-submit"><span class="btn btn-submit btn-round"><i class="fa fa-paper-plane" aria-hidden="true"></i> ' +  $.lang[LANG]['config.comment'] + '</span></div>' +
								'</div>' +
							  	'<input type="hidden" id="reply-id" value="' + id + '">' +
							  	'<input type="hidden" id="reply-name" value="' + name + '">' +
							'</td>' + 
							'<td class="form-submit reply-submit"><span class="btn btn-submit btn-round"><i class="fa fa-paper-plane" aria-hidden="true"></i> ' +  $.lang[LANG]['config.comment'] + '</span></td>' +
						'</tr>' +
					'</tbody>' +
				'</table>' +
			'</div>';
		*/
		return str;
	}


//***********************************************************************************************************************바꾸기 아래
		// live
			// isGabia = (F_SERVICE.indexOf('gabia') > -1) ? true : false;

		// gabia test
			// isGabia = (F_SERVICE.indexOf('gabia') == -1) ? true : false;

	var writeForm = function(token) {
		var F_SITEUM = (typeof SITEUM == 'undefined') ? property.SITEUM : SITEUM,
			F_VALIDPLAN = (typeof VALIDPLAN == 'undefined') ? property.VALIDPLAN : VALIDPLAN,
			F_VALIDTYPE = (typeof VALIDTYPE == 'undefined') ? property.VALIDTYPE : VALIDTYPE,
			F_SERVICE = (typeof SERVICE == 'undefined') ? property.SERVICE : SERVICE,
			isGabia = (F_SERVICE.indexOf('gabia') > -1) ? true : false,
			joinUrl = (LANG != 'ko') ? '//creatorlink.net/en/member/join' : '//creatorlink.net/member/join' ;

		if(F_VALIDTYPE != 'SM' && (F_VALIDTYPE != 'BN' && F_SITEUM > -1)) F_SITEUM = -1;

        if(isGabia) { // gabia
			return '' + 
				'<ul class="comment-signForm nav" role="tablist">' +
					'<li class="signType" role="presentation"><a href="#sitemember" aria-controls="sitemember" role="tab" data-toggle="tab">' +  $.lang[LANG]['siteum.login.member'] + '</a></li>' +
					'<li class="signType active" role="presentation"><a href="#anonymous" aria-controls="anonymous" role="tab" data-toggle="tab">' +  $.lang[LANG]['config.anonymous'] + '</a></li>' +
				'</ul>' +
				'<div class="tab-content">' +
					'<div role="tabpanel" class="tab-pane" id="sitemember">' +
				        '<div class="form-inline comment-addform">' +
				        	'<div class="cl-s-form-wrap">' +
								'<div class="cl-s-form-group">' +
									'<input type="text" class="cl-s-form-control" id="um_cmt_id" name="um_id" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['siteum.login.id'] + '</label>' +
								'</div>' +
							'</div>' +
				        	'<div class="cl-s-form-wrap mt-10">' +
								'<div class="cl-s-form-group">' +
									'<input type="password" class="cl-s-form-control" id="um_cmt_password" name="um_password" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['siteum.login.password'] + '</label>' +
								'</div>' +
							'</div>' +
				        '</div>' +
				        '<div class="btn-wrap comment-addform mt-30">' +
				        	'<a href="#" class="btn btn-primary btn-lg btn-block comm-login">' +  $.lang[LANG]['config.modal.login'] + '</a>' +
				        	'<button type="button" class="btn-modal-cancel" data-dismiss="modal">' +  $.lang[LANG]['config.cancel'] + '</button>' +
				        '</div>' +
					'</div>' +
					'<div role="tabpanel" class="tab-pane active" id="anonymous">' +
						'<div class="form-inline comment-addform">' +
						  	'<div class="cl-s-form-wrap">' +
								'<div class="cl-s-form-group">' +
									'<input type="text" class="cl-s-form-control" id="comm-name" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['config.modal.name'] + '</label>' +
								'</div>' +
							'</div>' +
				        	'<div class="cl-s-form-wrap mt-10">' +
								'<div class="cl-s-form-group">' +
									'<input type="password" class="cl-s-form-control" id="comm-pass" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['siteum.login.password'] + '</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="kcaptcha-box comment-addform input-text mt-30">' +
							'<div class="col-xs-12 col-sm-5 col-md-5 no-padding text-left kcaptcha-img">' +
								'<p id="write_option">' +
									'<img src="" id="kcaptcha" alt="' +  $.lang[LANG]['config.captcha-alt'] + '"/>' +
								'</p>' +
							'</div>' +
							'<div class="col-xs-12 col-sm-7 col-md-7 no-padding text-left kcaptcha-text">' +
								'<input type="text" id="wr_key" name="wr_key" class="col-sm-12 form-control" placeholder="' +  $.lang[LANG]['config.enter-captcha'] + '"/>' +
								'<a id="kcaptcha" class="kcaptcha-change"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 5c-3.64 0-6.63 2.78-6.97 6.33L3.35 9.65l-0.71 0.71 2.85 2.85 2.85-2.85L7.65 9.65l-1.59 1.59C6.43 8.29 8.95 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6c-1.66 0-3.17-0.68-4.26-1.78l-0.71 0.71C8.3 18.21 10.06 19 12 19c3.87 0 7-3.13 7-7S15.87 5 12 5z"/></svg><span>' +  $.lang[LANG]['config.change-captcha'] + '</span></a>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';
		} else if(F_SITEUM > 0) { // BN plan & used site member - um & anonymous
			return '' +
				'<ul class="comment-signForm nav" role="tablist">' +
					'<li class="signType active" role="presentation"><a href="#sitemember" aria-controls="sitemember" role="tab" data-toggle="tab">' +  $.lang[LANG]['siteum.login.member'] + '</a></li>' +
					'<li class="signType" role="presentation"><a href="#anonymous" aria-controls="anonymous" role="tab" data-toggle="tab">' +  $.lang[LANG]['config.anonymous'] + '</a></li>' +
				'</ul>' +
				'<div class="tab-content">' +
					'<div role="tabpanel" class="tab-pane active" id="sitemember">' +
				        '<div class="form-inline comment-addform">' +
				        	'<div class="cl-s-form-wrap">' +
								'<div class="cl-s-form-group">' +
									'<input type="text" class="cl-s-form-control" id="um_cmt_id" name="um_id" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['siteum.login.id'] + '</label>' +
								'</div>' +
							'</div>' +
				        	'<div class="cl-s-form-wrap mt-10">' +
								'<div class="cl-s-form-group">' +
									'<input type="password" class="cl-s-form-control" id="um_cmt_password" name="um_password" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['siteum.login.password'] + '</label>' +
								'</div>' +
							'</div>' +
				        '</div>' +
				        '<div class="btn-wrap comment-addform mt-30">' +
				        	'<a href="#" class="btn btn-primary btn-lg btn-block comm-login">' +  $.lang[LANG]['config.modal.login'] + '</a>' +
				        	'<button type="button" class="btn-modal-cancel" data-dismiss="modal">' +  $.lang[LANG]['config.cancel'] + '</button>' +
				        '</div>' +
					'</div>' +
					'<div role="tabpanel" class="tab-pane" id="anonymous">' +
						'<div class="form-inline comment-addform">' +
						  	'<div class="cl-s-form-wrap">' +
								'<div class="cl-s-form-group">' +
									'<input type="text" class="cl-s-form-control" id="comm-name" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['config.modal.name'] + '</label>' +
								'</div>' +
							'</div>' +
				        	'<div class="cl-s-form-wrap mt-10">' +
								'<div class="cl-s-form-group">' +
									'<input type="password" class="cl-s-form-control" id="comm-pass" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['siteum.login.password'] + '</label>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="kcaptcha-box comment-addform input-text mt-30">' +
							'<div class="col-xs-12 col-sm-5 col-md-5 no-padding text-left kcaptcha-img">' +
								'<p id="write_option">' +
									'<img src="" id="kcaptcha" alt="' +  $.lang[LANG]['config.captcha-alt'] + '"/>' +
								'</p>' +
							'</div>' +
							'<div class="col-xs-12 col-sm-7 col-md-7 no-padding text-left kcaptcha-text">' +
								'<input type="text" id="wr_key" name="wr_key" class="col-sm-12 form-control" placeholder="' +  $.lang[LANG]['config.enter-captcha'] + '"/>' +
								'<a id="kcaptcha" class="kcaptcha-change"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 5c-3.64 0-6.63 2.78-6.97 6.33L3.35 9.65l-0.71 0.71 2.85 2.85 2.85-2.85L7.65 9.65l-1.59 1.59C6.43 8.29 8.95 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6c-1.66 0-3.17-0.68-4.26-1.78l-0.71 0.71C8.3 18.21 10.06 19 12 19c3.87 0 7-3.13 7-7S15.87 5 12 5z"/></svg><span>' +  $.lang[LANG]['config.change-captcha'] + '</span></a>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';
		} else if(F_VALIDPLAN) { // is plan - only anonymous
			return '' + 
				'<ul class="comment-signForm nav" role="tablist">' +
					'<li class="signType active" role="presentation"><a href="#anonymous" aria-controls="anonymous" role="tab" data-toggle="tab"><!--<img src="https://storage.googleapis.com/i.addblock.net/icon/icon-sign-anonymous.png"><br><br>-->' +  $.lang[LANG]['config.anonymous'] + '</a></li>' +
				'</ul>' +
				'<div class="tab-content">' +
					'<div role="tabpanel" class="tab-pane active" id="anonymous">' +
						'<div class="form-inline comment-addform">' +
						  	'<div class="cl-s-form-wrap">' +
								'<div class="cl-s-form-group">' +
									'<input type="text" class="cl-s-form-control" id="comm-name" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['config.modal.name'] + '</label>' +
								'</div>' +
							'</div>' +
				        	'<div class="cl-s-form-wrap mt-10">' +
								'<div class="cl-s-form-group">' +
									'<input type="password" class="cl-s-form-control" id="comm-pass" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['config.modal.password'] + '</label>' +
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

		} else { // free - creatorlink & anonymous
			return '' + 
				'<ul class="comment-signForm nav" role="tablist">' +
					'<li class="signType active" role="presentation"><a href="#creatorlink" aria-controls="creatorlink" role="tab" data-toggle="tab">' +  $.lang[LANG]['config.creatorlink'] + '</a></li>' +
					'<li class="signType" role="presentation"><a href="#anonymous" aria-controls="anonymous" role="tab" data-toggle="tab">' +  $.lang[LANG]['config.anonymous'] + '</a></li>' +
				'</ul>' +
				'<div class="tab-content">' +
					'<div role="tabpanel" class="tab-pane active" id="creatorlink">' +
				        '<div class="form-inline comment-addform">' +
				        	'<div class="cl-s-form-wrap">' +
								'<div class="cl-s-form-group">' +
									'<input type="text" class="cl-s-form-control" id="mb_cmt_id" name="mb_id" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['siteum.login.id'] + '</label>' +
								'</div>' +
							'</div>' +
				        	'<div class="cl-s-form-wrap mt-10">' +
								'<div class="cl-s-form-group">' +
									'<input type="password" class="cl-s-form-control" id="mb_cmt_password" name="mb_password" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['siteum.login.password'] + '</label>' +
								'</div>' +
							'</div>' +
				        '</div>' +
				        '<div class="bottom-box text-right">' +
							'<span>' +  $.lang[LANG]['page.member.login-modal.jointext'] + '</span>&nbsp;&nbsp;&nbsp;<a href="' + joinUrl + '" target="_blank"><b>' +  $.lang[LANG]['page.member.login-modal.join2'] + '<svg viewBox=\"0 0 6 8\" width=\"6\" height=\"8\"><polygon points=\"2 0 0 0 4 4 0 8 2 8 6 4 \"/></svg></b></a>' +
						'</div>' +
				        '<div class="btn-wrap comment-addform mt-30">' +
				        	'<a href="#" class="btn btn-primary btn-lg btn-block comm-login">' +  $.lang[LANG]['config.modal.login'] + '</a>' +
				        	'<button type="button" class="btn-modal-cancel" data-dismiss="modal">' +  $.lang[LANG]['config.cancel'] + '</button>' +
				        '</div>' +
					'</div>' +
					'<div role="tabpanel" class="tab-pane" id="anonymous">' +
						'<div class="form-inline comment-addform">' +
						  	'<div class="cl-s-form-wrap">' +
								'<div class="cl-s-form-group">' +
									'<input type="text" class="cl-s-form-control" id="comm-name" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['config.modal.name'] + '</label>' +
								'</div>' +
							'</div>' +
				        	'<div class="cl-s-form-wrap mt-10">' +
								'<div class="cl-s-form-group">' +
									'<input type="password" class="cl-s-form-control" id="comm-pass" required="required" value="">' +
									'<label for="input" class="cl-s-control-label">' + $.lang[LANG]['config.modal.password'] + '</label>' +
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
		}
	}

	$('a[data-toggle="tab"]').live('click', function (e) {
		var tab = $(this).attr('aria-controls'),
			thisModal = $(this).closest('.flat-modal');
		
		switch(tab) {
			case "creatorlink":
			case "sitemember": thisModal.find('.modal-footer').hide(); break;
			default:  thisModal.find('.modal-footer').show(); break;
		}
	});

	var passwdForm = function() {
		return '' +
//			'<div class="form-inline comment-addform password">' + 				
//			  	'<div class="form-group">' +
//			    	'<label class="sr-only" for="comm-pass">' +  $.lang[LANG]['config.modal.password'] + '</label>' +
//			    	'<input type="password" class="form-control" id="comm-pass" placeholder="' +  $.lang[LANG]['config.modal.password'] + '">' +
//			  	'</div>' +
//			'</div>';
			'<div>\
				<div class="cl-s-form-wrap comment-addform password">\
					<div class="cl-s-form-group">\
						<input type="password" class="cl-s-form-control comm-pass" id="input-password" required="required">\
						<label for="input" class="cl-s-control-label">' + $.lang[LANG]['config.modal.password'] + '</label>\
					</div>\
				</div>\
			</div>';
	}

//***********************************************************************************************************************바꾸기 아래
		// live
			// isGabia = (F_SERVICE.indexOf('gabia') > -1) ? true : false,

		// gabia test
			// isGabia = (F_SERVICE.indexOf('gabia') == -1) ? true : false,

	$('.comm-login').live('click',function(e) {

		$('.comment .error').remove();
		var commentLoginModal = $(this).closest('.modal'),
			F_SERVICE = (typeof SERVICE == 'undefined') ? property.SERVICE : SERVICE,
			F_VALIDTYPE = (typeof VALIDTYPE == 'undefined') ? property.VALIDTYPE : VALIDTYPE,
			F_SITEUM = (typeof SITEUM == 'undefined') ? property.SITEUM : SITEUM,
			isGabia = (F_SERVICE.indexOf('gabia') > -1) ? true : false,
			login_type = (isGabia || F_VALIDTYPE == 'SM' || (F_VALIDTYPE == 'BN' && F_SITEUM > 0)) ? 'um' : 'mb',
			$input_id = $('#'+login_type+'_cmt_id'),
			$input_password = $('#'+login_type+'_cmt_password'),
			isSubmit = true,
			idErrorTxt = (isGabia || F_VALIDTYPE=='SM' || (F_VALIDTYPE=='BN' && F_SITEUM > 0)) ? $.lang[LANG]['config.enter-id'] : $.lang[LANG]['config.enter-email'];

		if($input_id.val().length==0) {
			//$input_id.after('<label class="error">! ' +  $.lang[LANG]['config.enter-id'] + '</label>').focus();
			//$input_id.closest('.cl-s-form-wrap').addClass('empty');
			$input_id.closest('.cl-s-form-wrap').addClass('empty');
			$input_id.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+idErrorTxt+'</label>');
			$input_id.focus();
			isSubmit = false;
		}

		if($input_password.val().length==0) {
			//$input_password.after('<label class="error">! ' +  $.lang[LANG]['config.enter-password'] + '</label>').focus();
			//$input_password.closest('.cl-s-form-wrap').addClass('empty');
			$input_password.closest('.cl-s-form-wrap').addClass('empty');
			$input_password.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+$.lang[LANG]['config.enter-password']+'</label>');
			$input_password.focus();
			isSubmit = false;
		}

		modalEmptyCheck();

		if(isSubmit) {

			if(login_type == 'mb') {
				$.post('/member/login/outlogin', { mb_id : $input_id.val(), mb_password : $input_password.val(), sid : sid}, function(data) {
					if(typeof data.error != 'undefined' && data.error) {
						$('.tab-pane.active').find('.bottom-box.text-right').before('<label class="error text-center error_login"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg><span>' + data.error + '</span></label>');
						$('.cl-s-form-group input').val('');
						$('.tab-pane.active').find('.cl-s-form-wrap').addClass('empty');
						return false;
					}
console.log('log .comm-login click 1');
					postComment(user);
					commentLoginModal.modal('hide');
				}, 'json');
			} else {

				var input_data = {
					'id' : $input_id.val().toLowerCase(),
					'password' : hex_md5($input_password.val()),
				};

				$.post('/umember/login/in', { sid : SID, data : JSON.stringify(input_data) }, function(data) {
					if (data.result == 'fail') {
						alert(data.message);
						$input_id.focus();
						console.log('aa');
						return false;
					} else {
console.log('log .comm-login click 2');
						$.umember.init();
						postComment(user);
						commentLoginModal.modal('hide');

						if(data.result == 'success') {
							if(typeof data.ss_url != 'undefined' && data.ss_url) {
								$.each(data.ss_url, function(i,url) {
									$('.dsgn-body').after('<img class="auth-img" src="' + ss_url + '">');
								});
							}
						}
					}
					
				},'json');

			}

		}

	});

	$('.comment-list .cm-delete').live('click', function(e) {
		var id = $(this).attr('data-id');
		$.comment.delete(id);
	});

	$('.comment-list .cm-update').live('click', function(e) {
		var id = $(this).attr('data-id'),
			cmt = $(this),
			pageCheck = $(this).parents('.page-comments').hasClass('galProjectBg') ? true : false;

		$.post('/template/comment/info', { id:id }, function(data) {
			if(typeof data.error != 'undefined' && data.error) {
				console.log('zz');
				$(this).showModalFlat('ERROR',data.error,true,false,'','ok','','cl-modal cl-none-title cl-cmmodal cl-p130 cl-s-btn w560 cl-t80');
				return false;
			}


			resetUser(user);
			if(data.sign == false) {
				var modal = $(this).showModalFlat($.lang[LANG]['config.comment-edit'],passwdForm(),true,true,function() {
					var $pass = $('.comm-pass'),
						isSubmit = true,
						userInput = $pass.val();
					$('label.error').remove();
					if($pass.val().length<4) {
						//$pass.parents('.comment-addform.password').after('<label class="error">' +  $.lang[LANG]['config.pass-min-length'] + '</label>').focus();
						$pass.closest('.cl-s-form-wrap').addClass('error');
						$pass.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+$.lang[LANG]['config.pass-min-length']+'</label>');
						$pass.focus();
						isSubmit = false;
					}

					if(isSubmit) {
						//$('.comment-addform.password').parent().find('.error').remove();
						$('.comment-addform.password').removeClass('error');
						$.post('/template/comment/password',{ id: id, passwd : hex_md5($pass.val()) }, function(c_data) {
							if(typeof c_data.error != 'undefined' && c_data.error) {
								//$(this).showModalFlat('ERROR',c_data.error,true,false,'','ok');
								//$('.comment-addform.password').before("<label class='error'>" + c_data.error + "</label>");
								$pass.closest('.cl-s-form-wrap').addClass('error');
								$pass.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+c_data.error+'</label>');
								return false;
							}
							modal.modal('hide');
							cmt.closest('.cm-row').addClass('add-form');
							insertReplyForm(id,c_data,userInput,pageCheck);
						},'json');
					}
					modalEmptyCheck();
				},'cancel','ok', 'cl-modal cl-cmmodal cl-p70 cl-s-btn w560 site-comment-modal cl-close-btn cl-t80');
			} else {
				cmt.closest('.cm-row').addClass('add-form');
				insertReplyForm(id,data,'',pageCheck);
			}
		},'json');
	});

	var insertReplyForm = function(id, data, userInput,pageCheck) {
		activeControls(false);
		var $cm = $('.cm-content[data-id="' + id + '"]'),
			pageCheck = (pageCheck) ? pageCheck : false,
			colorSet = (pageCheck) ? ((typeof $('.dsgn-body').attr('data-gcolor')!='undefined') ? $('.dsgn-body').attr('data-gcolor') : '') : (($('.forum-view').attr('data-fcolor')) ? $('.forum-view').attr('data-fcolor') : '');
		
		$cm.empty();
		user.content = data.reply + data.lock + '<span class="cm-textarea">' + data.content + '</span>';
		user.secret = data.secret;

		var update_temp = updateForm(data.content,userInput,id,data.only_secret);
		$cm.html(update_temp['area']);
		$cm.closest('.comm-wrap').append(update_temp['footer']).addClass('update-wrap');
		$('.cm-reply[data-id="' + id + '"]').removeClass('disabled');

		if(data.r_data) {
			$.each(data.r_data, function(i,o) {
				$('.cm-content[data-id="' + o.id + '"]').find('.cm-textarea').html(o.content);
				$('.cm-reply[data-id="' + o.id + '"]').removeClass('disabled');
			});
		}

		var rgba = hexToRgba(colorSet);

		$('.tpl-comment-form,.comment-list .comm-wrap').css('border-color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.2)');
		$('.page-comments .btn-submit').css('border-color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.4)');
		$('.page-comments .comm-footer .checkbox svg').css('fill','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.8)');
		$('.page-comments .comm-footer label,.comm-footer .checkbox > label,.page-comments .comm-wrap.update-wrap .comm-area textarea,\
			.page-comments .comm-footer .btn.btn-submit,.cm-name, .cm-content,.page-comments .comm-area > .cm-content .user-reply').css('color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.8)');
		$('.cm-time,.cm-cancel').css('color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.7)');

	}
	
	$('.comment-list .cm-reply').live('click', function(e) {
		var id = $(this).attr('data-id'),
			name = $(this).attr('data-name'),
			option = $(this).attr('data-option'),
			myImage = $(this).attr('data-myImage'),
			$cm = $('.cm-content[data-id="' + id + '"]'),
			pageCheck = $(this).parents('.page-comments').hasClass('galProjectBg') ? true : false,
			colorSet = (pageCheck) ? ((typeof $('.dsgn-body').attr('data-gcolor')!='undefined') ? $('.dsgn-body').attr('data-gcolor') : '') : (($('.forum-view').attr('data-fcolor')) ? $('.forum-view').attr('data-fcolor') : '');

		$('.cm-controls').hide().addClass('cm-hide').removeClass('cm-controls');
		$(this).closest('.cm-row').addClass('add-form');
		$cm.append(replyForm(id,name,option,myImage));
		
	
		var rgba = hexToRgba(colorSet),
			border_rgba = 'rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.1)';

		$('.tpl-comment-form,.comment-list .comm-wrap').css('border-color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.2)');
		$('.page-comments .btn-submit').css('border-color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.4)');
		$('.page-comments .comm-footer .checkbox svg').css('fill','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.8)');
		$('.page-comments .comm-footer label,.comm-footer .checkbox > label,.forum-view ~ .page-comments textarea,\
			.page-comments .comm-footer .btn.btn-submit,.cm-name, .cm-content,.page-comments .comm-area > .cm-content .user-reply').css('color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.8)');
		$('.cm-time,.cm-cancel').css('color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.7)');



		//$('.reply-form .comm-wrap').css('border-color',border_rgba);
		//$('.comm-footer label,.page-comments .comm-footer .btn').css('color',f_color);
	});

	$('.comment-list .cm-cancel').live('click', function(e) {
		$('.cm-hide').addClass('cm-controls').removeClass('cm-hide');
		$(this).closest('.cm-row').removeClass('add-form');

		$('.tpl-comment-form.reply-form').remove();
		if($(this).closest('.comm-wrap').hasClass('update-wrap')) {
			$(this).closest('.comm-wrap').find('.cm-content').html(user.content.replace(/\r\n|\n|\r/g, '<br />'));
			$(this).closest('.comm-wrap').find('.comm-footer').remove();
			$(this).closest('.comm-wrap').removeClass('update-wrap');
		}

	});

	$('textarea[data-autoresize]').live('keyup',function(e) {
		var offset = $(this).outerHeight() - $(this).height();
		$(this).css('height', 'auto').css('height', $(this).prop('scrollHeight') + offset);
	});

	$('.comment-submit').live('click',function(e) {
		$('.tpl-comment-form label.error').remove();
		var content = $('#comm-content').val().trim(),
			secret = ($('#comm-secret').is(':checked')) ? 'ON' : '',
			error_str = '';

		if(content.length < 2) error_str = $.lang[LANG]['config.content-min-length'];

		if(error_str.length > 0) {
			$('.tpl-comment-form .comm-area textarea').after('<label class="error">' + error_str + '</label>');
			return false;
		}

		resetUser(user);
		user.content = content;
		user.secret = secret;
		signCheckPost();
	});

	$('.update-submit').live('click',function(e) {
		$('.comm-wrap.update-wrap label.error').remove();

		var content = $('#update-content').val(),
			pass = $('#update-passwd').val(),
			id = $('#update-id').val(),
			secret = '',
			error_str = '';

		if(content.length < 2) error_str = $.lang[LANG]['config.content-min-length'];

		if(error_str.length > 0) {
			$('.comm-wrap.update-wrap .comm-area textarea').after('<label class="error">' + error_str + '</label>');
			return false;
		}

		if($('#update-secret').length>0) {
			secret = ($('#update-secret').is(':checked')) ? 'ON' : '';
		} else {
			secret = ($('.cm-reply[data-id="' + id + '"]').attr('data-option')) ? 'ON' : '';
		}

		resetUser(user);
		user.id = id;
		user.pass = (pass) ? hex_md5(pass) : '';
		user.content = content;
		user.secret = secret;
		postComment(user);
	});

	$('.reply-submit').live('click',function(e) {
		$('.tpl-comment-form label.error').remove();
		var content = $('#reply-content').val(),
			id = $('#reply-id').val(),
			reply = $('#reply-name').val(),
			secret = '',
			error_str = '';

		if(content.length < 2) error_str = $.lang[LANG]['config.content-min-length'];

		if(error_str.length > 0) {
			$('.tpl-comment-form.reply-form .comm-area textarea').after('<label class="error">' + error_str + '</label>');
			return false;
		}

		if($('#reply-secret').length>0) {
			secret = ($('#reply-secret').is(':checked')) ? 'ON' : '';
		} else {
			secret = ($('.cm-reply[data-id="' + id + '"]').attr('data-option')) ? 'ON' : '';
		}

		resetUser(user);
		user.reply = reply;
		user.parent = id;
		user.content = content;
		user.secret = secret;
		signCheckPost();
	});

	$('.comment-list > li').live({
		mouseover : function() {
			$('.cm-controls').hide();
			$(this).find('.cm-controls').show();
		}
	});

	var activeControls = function(active) {
		(typeof active=='undefined' || active==true) ? 
			$('.cm-hide').addClass('cm-controls').removeClass('cm-hide') : 
			$('.cm-controls').hide().addClass('cm-hide').removeClass('cm-controls');
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

	var signCheckPost = function() {
		$.post('/template/checkLogin', { comment : true }, function(data) {
			if(!data.user || typeof data.user == 'undefined') {
				var validType = property['VALIDTYPE'],
					pid = PID,
					pid_type = (CTYPE == 'F') ? 'forum' : 'gallery',
					url = $(location).attr('pathname');

					var aryKey = [], aryVal = [], aryCnt = 0;
					$.map(property, function(val, key) {
						aryKey[aryCnt] = key;
						if (!val) val = '';
						aryVal[aryCnt] = val; 
						aryCnt++;
					});
					var strKey = aryKey.join('||');
					var strVal = aryVal.join('||');
					strVal = strVal.replace(/\"/gi, '@@');

					user.parent = (user.parent) ? user.parent : '';
					user.reply = (user.reply) ? user.reply : '';

					$('#write-login').remove();
					var action = (validType == 'SM') ? '/_login' : '/_cllogin',
						html = '<form name="write_login_form" id="write-login" method="post" action="' + action + '" style="display:none;">\
									<input type="hidden" name="status" value="comment">\
									<input type="hidden" name="sid" value="'+SID+'">\
									<input type="hidden" name="url" value="'+url+'">\
									<input type="hidden" name="pid" value="'+pid+'">\
									<input type="hidden" name="pid_type" value="'+pid_type+'">\
									<input type="hidden" name="page_mode" value="'+PAGE_MODE+'" />\
									<input type="hidden" name="reply_id" value="'+user.parent+'">\
									<input type="hidden" name="reply_name" value="'+user.reply+'">\
									<input type="hidden" name="comment" value="'+user.content+'" />\
									<input type="hidden" name="secret" value="'+user.secret+'" />\
									<input type="hidden" name="forum_email" value="'+$('#forum-email').val()+'" />\
									<input type="hidden" name="key" value="'+strKey+'" />\
									<input type="hidden" name="val" value="'+strVal+'" />\
								</form>';

					$('body').append(html);
					document.write_login_form.submit();

			} else {
				postComment(user);
			}
		},'json');		
	}	

	var postComment = function(user, callback) {
		var data = true,
			type = CTYPE,
			pid = PID,
			forum_email = (PAGE_MODE == 's' && type == 'F') ? $('#forum-email').val() : '';

			$.post('/template/comment/update', { user : JSON.stringify(user), type : type, pid : pid, sid : SID, forum_email : forum_email }, function(r) {
				if(typeof r.error != 'undefined' && r.error) {
					$(this).showModalFlat('ERROR',r.error,true,false,'','ok');
					return false;
				}
				$.comment.init({
					pid : PID,
					type : CTYPE
				});
				setHeight(pageHeight());

				if(typeof callback === 'function') {
					callback(r);
				}

			},'json');

	}

	var tplComment = function() {
		return '' +
			'<ul class="comment-list">' + 
			'</ul>';
	}

	var tplCommentRow = function(id, name, content, datetime, reply, depth, option, lock, reply_btn, cmb, own, adm, mgr, my_image, mb_image) {
		var line = (depth>0) ? 'line' : '';
		var	userReply = 'disabled';
		if (option) {
			userReply = (reply_btn) ? '' : 'disabled';
		} else {
			userReply  = (content=='') ? 'disabled' : '';
		}

		var userUpdate = (own && name) ? '' : 'disabled',
			userDelete = ((own || adm || mgr) && name) ? '' : 'disabled';

		var empty = (name) ? '' : 'disabled',
			username = (name) ? name : $.lang[LANG]['config.deleted-comment'],
			replyClass = (!name && line) ? ' deleted' : '';

		return '\
			<li class="cm-row ' + line + replyClass + '" id="' + id + '">\
				<div class="comm-wrap">\
					<div class="comm-body">\
						<span class="comm-profile">\
							<svg viewbox="0 0 40 40" width="35" height="35">\
								<pattern id="comment-list-image' + id + '" patternUnits="userSpaceOnUse" width="40" height="40">\
									<image xlink:href="' + mb_image + '?_' + new Date().getTime() + '" width="40" height="40" />\
								</pattern>\
								<circle cx="20" cy="20" r="20" fill="url(#comment-list-image' + id + ')"/>\
							</svg>\
						</span>\
						<div class="comm-area">\
							<span class="cm-name ' + empty + '">' + username + '</span>\
							<span class="cm-time">' + datetime + '</span>\
							<span class="cm-section">\
								<span class="cm-reply cm-controls ' + userReply + '" data-id="' + id + '" data-name="' + name + '" data-option="' + option + '" data-myImage="' + my_image + '"><i class="fa fa-reply"></i> ' +  $.lang[LANG]['config.answer-comment'] + '</span>\
								<span class="cm-update cm-controls ' + userUpdate + '" data-id="' + id + '"><i class="fa fa-pencil"></i> ' +  $.lang[LANG]['config.edit'] + '</span>\
								<span class="cm-delete cm-controls ' + userDelete + '" data-id="' + id + '"><i class="fa fa-trash-o"></i> ' +  $.lang[LANG]['config.delete'] + '</span>\
							</span>\
							<div class="cm-content" data-id="' + id + '">' + reply + lock + '<span class="cm-textarea">' + content + '</span></div>\
						</div>\
					</div>\
				</div>\
			</li>\
		';
	}


	$.comment = {
		init : function(options) {
			var settings = $.extend({
				type : 'P'
			}, options);

			cVIEW = (typeof settings.pid == 'undefined') ? property.VIEW : settings.pid;
			SID = (typeof SID == 'undefined') ? property.SID : SID;
			PID = cVIEW;
			CTYPE = settings.type;
			var pEl = (typeof PARENT == 'undefined') ? property : PARENT;
			if(pEl.mode===null) return false;

			var checkGalleryProjectClass = (CTYPE=='P') ? 'galProjectBg' : '';

			$('.page-comments').remove();
			var wrap = tplWrap(PID,checkGalleryProjectClass),
				$wrap = $(wrap.tpl),
				cmStyle = '';

			if(typeof SETTINGS == 'undefined') {
				cmStyle = (typeof property.SETTINGS.cmStyle == 'undefined' ) ? '' : property.SETTINGS.cmStyle;
			} else {
				cmStyle = (typeof SETTINGS.cmStyle =='undefined') ? '' : SETTINGS.cmStyle;
			}

			$wrap.addClass(cmStyle);
			$wrap.append('<div class="container">');

			if(typeof property == 'undefined') {
				$lastEl = ($('.el-footer_ctrl').length) ? $('.el-footer_ctrl') : $('.add-footer-information');
				if($('.page-bottomlist').length) $lastEl = $('.page-bottomlist');
				$lastEl.before($wrap);
			} else {
				if($('.el-footer').length) {
					$lastEl = ($('.page-bottomlist').length) ? $('.page-bottomlist') : $('.el-footer');
					$lastEl.before($wrap);
				} else {
					$('.dsgn-body').append($wrap);
				}
			}


			$.ajax({
				type : 'GET',
				url : '/template/comment/list/type/' + CTYPE + '/pid/'+PID+'/sid/'+SID,
				dataType : 'json',
				async : true,
				success : function(data) {

					if(typeof data.check_comment == 'undefined' || data.check_comment) {
				    	var $tCmt = $(tplComment()),
				    		$tplForm = $(tplForm(data.my_image));

				    	if(CTYPE == 'F' && data.list.length > 0 && $('.forum-view[data-forum-type="qna"]').length > 0) $tplForm = $('');

				    	$.each(data.list, function(i,v) {
							$tCmt.append(tplCommentRow(v.seq,v.name,v.content,v.datetime,v.reply,v.depth,v.option,v.lock,v.reply_btn,v.cmb,v.own,v.adm,v.mgr,data.my_image,v.mb_image));
							// $tCmt.append(tplCommentRow(v.name,v.content,v.datetime,v.seq,v.reply,v.cmb,v.sgn,v.own,v.adm,v.mgr,v.depth,v.cm_option,v.is_reply,data.my_image,v.mb_image));
						});

						var f_color = ($('.forum-view').attr('data-fcolor')) ? $('.forum-view').attr('data-fcolor') : '',
							g_color = (typeof $('.dsgn-body').attr('data-gcolor')!='undefined') ? $('.dsgn-body').attr('data-gcolor') : '';

				    	setTimeout(function() {
							$wrap.css('background-image','none').find('.container').append($tplForm);
					    	$wrap.find('.container').append($tCmt);

			    			var settings = (typeof property == 'undefined') ? {} : property['SETTINGS'],
			    				viewportMode = (typeof settings.viewportMode != 'undefined' && settings.viewportMode) ? settings.viewportMode : '';
	
			    			if(viewportMode=='mobile_web') setHeight(pageHeight());
							if(CTYPE=='P') {
								var pr_rgba = hexToRgba(g_color),
                    				galProjectCssStr = ($('.galProjectCss').length>0) ? $('.galProjectCss').text() : '';

                				galProjectCssStr += '.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .tpl-comment-form,\n\
.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .comment-list .comm-wrap { border-color : rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.2) }\n\
.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .btn-submit { border-color : rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.4) }\n\
.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .comm-footer .checkbox svg,.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .comm-footer .checkbox #comm-secret + .cl-icon svg { fill : rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.8) }\n\
.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .comm-footer label,.comm-footer .checkbox > label,.forum-view ~ .page-comments textarea,\n\
.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .comm-footer .btn.btn-submit,.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .cm-name,\n\
.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .cm-content,.dsgn-body[data-gcolor="'+g_color+'"] .page-comments.galProjectBg .comm-area > .cm-content .user-reply { color: rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.8);}\n\
.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .cm-time { color: rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.4);}\n\
.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .comm-area > .cm-section .cm-controls { color: rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+');}\n\
.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .tpl-comment-form textarea {color:rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.6)}\n\
.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .tpl-comment-form textarea::-webkit-input-placeholder {color:rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.6) !important;}\n\
.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .tpl-comment-form textarea:-ms-input-placeholder {color:rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.6) !important;}\n\
.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg .tpl-comment-form textarea:-mos-input-placeholder {color:rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.6) !important;}';
			
			                	$('.galProjectCss').text(galProjectCssStr);
							} else {
								var rgba = hexToRgba(f_color);

								$('.tpl-comment-form,.comment-list .comm-wrap').css('border-color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.2)');
								$('.page-comments .btn-submit').css('border-color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.4)');
								$('.page-comments .comm-footer .checkbox svg').css('fill','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.8)');
								$('.page-comments .comm-footer label,.comm-footer .checkbox > label,.forum-view ~ .page-comments textarea,\
									.page-comments .comm-footer .btn.btn-submit,.cm-name, .cm-content,.page-comments .comm-area > .cm-content .user-reply').css('color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.8)');
								$('.cm-time').css('color','rgba('+rgba.r+','+rgba.g+','+rgba.b+',0.4)');
								$('.page-comments .comm-area > .cm-section .cm-controls').css('color','rgba('+rgba.r+','+rgba.g+','+rgba.b+')');
							}
						}, 30);
					} else {
						$wrap.remove();
					}
				}
			});

		},
		delete : function(id) {
			if(typeof id == 'undefined' || !id) {
				$(this).showModalFlat('ERROR', $.lang[LANG]['config.comment-not-found'], true, false, '', 'ok');
				return false;
			}

			//this case:: forum QnA block, answer delete =>> page refresh
			var checkPageReload = ($('.element[data-type="forum"][data-type2="qna"] .qna-details .tpl-qna-toolbar-button.data-qna-del[data-id="' + id + '"]').length > 0) ? true : false;

			var modal = $(this).showModalFlat('INFORMATION', $.lang[LANG]['config.confirm-delete-comment'], true,true, function() {

				$.post('/template/comment/info', {id:id}, function(data) {

					if(typeof data.error != 'undefined' && data.error) {
						$(this).showModalFlat('ERROR',data.error,true,false,'','ok');
						return false;
					}

					if(data.sign == false) {
						var modalPass = $(this).showModalFlat($.lang[LANG]['config.comment-delete'],passwdForm(),true,true,function() {
							var $pass = $('.comm-pass'),
								userInput = $pass.val(),
								isSubmit = true;

							$('label.error').remove();
							if($pass.val().length<4) {
								//$pass.parents('.comment-addform.password').after('<label class="error">' +  $.lang[LANG]['config.pass-min-length'] + '</label>').focus();
								$pass.closest('.cl-s-form-wrap').addClass('error');
								$pass.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+$.lang[LANG]['config.pass-min-length']+'</label>');
								$pass.focus();
								isSubmit = false;
							}

							if(isSubmit) {
								//$('.comment-addform.password').parent().find('.error').remove();
								$('.comment-addform.password').removeClass('error');
								$.post('/template/comment/password',{ id: id, passwd : hex_md5($pass.val()) }, function(data) {
									if(typeof data.error != 'undefined' && data.error) {
										//$(this).showModalFlat('ERROR',data.error,true,false,'','ok');
										//$('.comment-addform.password').before('<label class="error">' + data.error + '</label>');
										$pass.closest('.cl-s-form-wrap').addClass('error');
										$pass.closest('.cl-s-form-wrap').after('<label for="input" class="cl-s-control-label error"><svg viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="3" width="1" height="5"/><rect x="6" y="9" width="1" height="1"/></svg>'+data.error+'</label>');
										return false;
									}
									deletePost(hex_md5($pass.val()));
									modalPass.modal('hide');
								},'json');
							}
							modalEmptyCheck();
						},'cancel','', 'cl-modal cl-cmmodal cl-p70 cl-s-btn w560 site-comment-modal cl-t80 cl-close-btn');
					} else {
						deletePost();
					}
					return;
				},'json');
				setTimeout(function() {
					modal.modal('hide');
					if(checkPageReload) location.reload(); //this case:: forum QnA block, answer delete
				}, 20);

			}, 'cancel','', 'cl-modal cl-none-title cl-cmmodal cl-p130 cl-s-btn w560 site-comment-modal cl-t80 cl-close-btn');
			
			function deletePost(pass) {
				pass = (typeof pass == 'undefined') ? '' : pass;
				$.post('/template/comment/delete/type/P/pid/' + PID, { id : id, sid : SID, pass : pass }, function(data) {
					if(typeof data.error != 'undefined' && data.error) {
						$(this).showModalFlat('ERROR',data.error,true,false,'','ok');
						return false;
					} else modal.modal('hide');
					$.comment.init({
						pid : PID,
						type : CTYPE
					});
				},'json');
			}

		},
		destory : function() {
			var $obj = $('.page-comments');
			$obj.fadeOut('slow',function() {
				$(this).remove();
			});
		}

	};
}(jQuery));