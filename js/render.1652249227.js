var isAosBlock = false;
var isgalleryView = false;
var pageLoad = true;
var RENDER = {
    init: function (property) {
		var History = window.History; 
		var b = property,
			URL = (b.PUBLISH) ? '/' : '/render',
			param = (b.PUBLISH) ? '/publish/true' : '',
			selectEL = '',
			galleryEL = new Object();
		var CERT_USERID = '';

    	this.b = b;
		this.b.pageContent = {};
		this.b.pageContent[b.PAGE] = b.INITPAGE;
    	this.b.URL = URL;
    	this.b.param = param;
    	this.history = window.History;
    	this.b.MENULIST = [];
    	this.galleryEL = galleryEL;

    	_this = this;
    	$(window).ready(function() {
    		// console.log(b.VALIDTYPE, b.CERT_USE, referrer, history.state);
    		if(b.CERT_USE == 'Y' || b.CERT_USE == 'A') {
    			isUserCertified(history);
    		}	

			var checkIOS = ((navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1)) ? true : false;
			if(checkIOS) $('.dsgn-body').addClass('ios-bg-attachment-scroll');
    	
	        (function(window){
	            var History = window.History;
	            if ( !History.enabled ) {
	                return false;
	            }

	            History.Adapter.bind(window,'statechange',function(){
	                var State = History.getState(),
	                	cUrl = new getLocation(State.url),
	                	loc = cUrl.pathname,
	                	uri = (b.PUBLISH) ? loc.replace(/^\//,'').replace(/\/$/,'') : loc.replace(/\/*(render)\/*/,''),
	                	uri = uri.replace('/view/',','),
	                	s = uri.split(','),
	                	bookmark = '';

					// naverLogCallback(function() {
					// 	if("naver_log" in b.SETTINGS) {
					// 		if (!wcs_add) var wcs_add={};
					// 		wcs_add["wa"] = b.SETTINGS.naver_log;
					// 		if (!_nasa) var _nasa={};
					// 		wcs_do(_nasa);
					// 	}
					// });

	                if($('.cl-flat-modal').length > 0) $('.cl-flat-modal .modal').modal('hide');

	                if(uri == b.URL || uri == '') {
	                	uri = (b.ONE) ? 'index' : b.MENULINK[0];
	                }

	                (typeof s[1] != 'undefined') ? b.VIEW = s[1] : b.VIEW = '';
	                b.PAGE = decodeURI(uri);
	                if(b.PAGE.indexOf('@')>-1) {
	                	var tmp = b.PAGE.split('@');
	                	b.PAGE = tmp[0];
	                	bookmark = tmp[1];
	                }

	                if((b.PAGE).indexOf(',')>-1) {
	                	var tmp = b.PAGE.split(',');
	                	b.VIEW = tmp[1];
	                }

			    	var callParent = getParent(s[0],b.VIEW,	b.PAGE),
			    		pageMove = true;

			    	if(b.VIEW && s[0] != 'forum' && s[0] != 'psearch' && b.COUNT == 0 && !b.PUBLISH) {
			    		$(this).showModalFlat('INFORMATION','Page not found',true,false,'','ok');
			    		History.back();
			    		pageMove = false;
			    	}

			    	if(pageMove) {
			    		pageLoad = true;
			    		var menu_name = (b.VIEW) ? b.PAGE.split(',') : [b.PAGE],
			    			pagemenu_link = '#tpl-menu.nav li a[href="/' + menu_name[0] + '"]';

			    		if(!$(pagemenu_link).parent().hasClass('active')) {
			              	$('#tpl-menu li').removeClass('active').removeClass('open');

			              	$(pagemenu_link).parent().addClass('active');
			              	if($(pagemenu_link).closest('.dropdown-menu').length>0) {
			                  	if($('body').width() > 768) {
			                  		$(pagemenu_link).closest('.dropdown').addClass('active');
			                  	} else {
			                  		$(pagemenu_link).closest('.dropdown').addClass('open');
			                  	}
			              	} else {
			                	if($('.el-menu > header').hasClass('navbar-fheader')) $('#mobile-nav li.menu-has-children ul.dropdown-menu').hide();
				                else {
				                  if($('body').width() < 768) $('#tpl-menu li.dropdown ul.dropdown-menu').hide();
				                }
			              	}
			            }

		    			var page_draw_stop = false;
			    		callParent.then(function() {
			    			$.post('/template/conf',{ sid : b.SID, page : b.PAGE, publish : b.PUBLISH, siteum : b.SITEUM }, function(data) {

			    				if(typeof data.url != 'undefined' && data.url) {
			    					page_draw_stop = true;
			    					location.href = data.url;
			    					return false;
			    				}

			    				if(b.CERT_USE == 'A') {
			    					page_draw_stop = true;
					    			isUserCertified(history);
					    			return false;
					    		}
					    		
			    				b.ISLOCK = data.islock;
			    				b.HEADER = (data.overlay) ? 1 : 0;

			    				var isSidebar = ($('header').hasClass('sidebar')) ? true : false;
			    				if(b.HEADER && !isSidebar) {
			    					$('.header-empty').css('height',0);
			    					$('.header.el-menu').removeClass('fixed');
			    					$('header.navbar').addClass('transparent');
			    				} else {
			    					$('header.navbar').removeClass('transparent');
			    				}

			    				$('#pageScript').remove();
			    				if(data.pageScript) $('body').append(data.pageScript);
			    				if(data.meta != null) {
			    					$.each(data.meta, function(k,v) {
			    						$('meta[name="' + k + '"]').attr('content',v);
			    						if(k == 'title') {
			    							$(document).prop('title', v);
			    						}
			    					});
			    				}
			    			},'json');
			    		}).then(function() {
			                if(page_draw_stop) return false;
			                $('body').find('.galProjectCss').remove();
			                clearDsgnbody();
			                if($('.popup').length) $('.popup').remove(); //clear Popup;
					    	showPageCallback(showPage, function() {
					            var pgmove_vMode = (typeof $('.mobilepc_ch').attr('data-desktop-option')!='undefined') ? $('.mobilepc_ch').attr('data-desktop-option') : '';
								pgmove_vMode = $.mpcWeb.mpcGetVpmode(pgmove_vMode,b.SETTINGS);
					            if(b.VALIDPLAN) {
									if(typeof b.SETTINGS.viewportMode != 'undefined' && b.SETTINGS.vpMode_onoff===true) $.mpcWeb.mpcWebhtml(pgmove_vMode,b.pageContent[b.PAGE],b.SETTINGS.zoom,'pagemove');
					            }

					        	if(b.VIEW) {
									if(b.PARENT.mode == 'shopping') {
										$('.data-page-prev, .data-page-next').removeClass('active');
										if(b.PARENT.prev) $('.data-page-prev').addClass('active');
										if(b.PARENT.next) $('.data-page-next').addClass('active');

										if(typeof property.PRODINFO === 'object') $.products.display_info();
										if($('#review-onoff').val() == 'true') $.products.review(b.VIEW,b.PAGE);
										if($('#qna-onoff').val() == 'true') $.products.qna(b.VIEW,b.PAGE);
									} else {
										if($('.page-comments[data-id="'+b.VIEW+'"]').length == 0) _this.displayComment(b.VIEW);
										//상세페이지 배경 style 추가
										if(b.PARENT.mode) setGalleryProjectCss(b.PARENT,b.PARENT['elcss']);
										else $('body').find('.galProjectCss').remove();
									    
						                funcCallback( displayPageToolbar, function() {
						                	setTimeout(function() {
							                    displaySnsShare(b.PARENT.pid);
							                    displayBottomNav(b.PARENT.pid);
							                    displayBottomList(b.PARENT.pid);

							                    var p_settings = (b.PARENT.settings) ? jQuery.parseJSON(b.PARENT.settings) : {};
										 		if((typeof p_settings.sns_share_display == 'undefined' || !p_settings.sns_share_display || p_settings.sns_share_display=='OFF') && 
										 			(typeof p_settings.bottomNav_display == 'undefined' || !p_settings.bottomNav_display || p_settings.bottomNav_display=='OFF')) {
										 			$('.tpl-page-footer').addClass('hide');
										 		} 

						                	}, 100);
						                });
						            }
					            }	

							    setTimeout(function() {
							    	if(b.VALIDPLAN) {
							    		if(b.ONE && !b.VIEW || (b.PAGE == b.MENULINK[0]) && !b.VIEW) setSitePopup();
							    	}
									if(b.VALIDPLAN && (b.VALIDTYPE == 'BN' || b.VALIDTYPE == 'SM')) {
										if(typeof b.SETTINGS.fnav != 'undefined' && !$.isEmptyObject(b.SETTINGS.fnav)) $.fnav.draw(b.SETTINGS.fnav);
									}
									if(b.VALIDPLAN) {
								    	if(typeof b.SETTINGS.viewportMode != 'undefined' && b.SETTINGS.vpMode_onoff===true) mobileWebfnavCheck(pgmove_vMode);
							    	}
							    }, 500);
					    	});
			    		}).then(function() {
			    			if(typeof $.cookie('gallery-item') != 'undefined' && b.VIEW == '') {
					        	setTimeout(function() {
					        		moveGallery($.cookie('gallery-item'));
					        	},500);
			    			} else if(typeof $.cookie('gallery') != 'undefined' && b.VIEW == '') {
					        	setTimeout(function() {
					        		moveGallery($.cookie('gallery'));
					        	},500);
			    			} else if(typeof $.cookie('forum-item') != 'undefined' && b.VIEW == '') {
			    				setTimeout(function() {
			    					scrollToBlock('.element[data-id="' + $.cookie('forum-item') + '"]', 1000);
			    					$.removeCookie('forum-item', { path: '/' });
			    				}, 500);
			    			} else {
				    			var url = window.location;
				    			setTimeout(function() {
				    				moveScroll(0,url.href);
				    			},100);
			    			}
			    			if(typeof b.SETTINGS.google != 'undefined' && b.SETTINGS.google.length > 0) {
			    				var https_check = (location.protocol=='https:') ? 'https:' : 'http:',
			    					host_url = b.URL +  b.PAGE;

			    				host_url = (b.PARENT && b.PARENT.mode=='project') ? (host_url.replace(/,/g,"/view/")) : host_url;  

			    				if(b.SETTINGS.google.indexOf('UA-') > -1) ga('send', 'pageview', location.pathname);
			    				else if(b.SETTINGS.google.indexOf('G-') > -1) {
			    					gtag('config', b.SETTINGS.google, {
        								page_title: b.TITLE,
        								page_location: https_check + '//'+ b.HOST + host_url,
        								page_path: host_url
        							});
			    				}
								//else gtag('config', b.SETTINGS.google , {page_path : location.pathname});
    							//console.log(https_check + '//'+ b.HOST + host_url);
                                // console.log('google analytics send, pageview');
			    			}
							if(typeof b.SETTINGS.npay_setting != 'undefined' && b.SETTINGS.npay_setting.onoff == true && b.SETTINGS.npay_setting.naver_log.length > 0) {
								wcs_do();
								// console.log('naverpay log');
							} else {
								if(typeof b.SETTINGS.naver_log != 'undefined' && b.SETTINGS.naver_log.length > 0) {
									wcs.inflow();
									wcs_do(_nasa);
									// console.log('naver analytics send, pageview');
								}
							}
							if(typeof b.SETTINGS.gtag_event != 'undefined' && typeof b.SETTINGS.gtag_event.page != 'undefined' && b.SETTINGS.gtag_event.page.length > 0) {
								if(typeof b.SETTINGS.gtag_event.type != 'undefined' && b.SETTINGS.gtag_event.type == 'event' && b.SETTINGS.gtag_event.page == b.PAGE) {
									// console.log(b.SETTINGS.gtag_event);
									var v0 = b.SETTINGS.gtag_event.val[0],
										v1 = b.SETTINGS.gtag_event.val[1],
										v2 = b.SETTINGS.gtag_event.val[2];

									gtag(b.SETTINGS.gtag_event.type,v0,{v1:v2});
									// gtag(b.SETTINGS.gtag_event.type, b.SETTINGS.gtag_event.val[0], { b.SETTINGS.gtag_event.val[1] : b.SETTINGS.gtag_event.val[2] });
								}
							
							}

							// menu ver3 : fheader
							setTimeout(function() {
								if($('header.navbar').hasClass('navbar-fheader')) $.fheader.position();
							},400);


							// favicon refresh
							var favicon = b.RESOURCE + '/' + b.SID + '/' + b.SID + '-favicon.ico?_' + new Date().getTime();
							changeFavicon(favicon);

							if(typeof pageMoveCallback == 'function') pageMoveCallback();
							formTranslate(LANG);
			    		});
			    	}
	            });

				History.Adapter.bind(window, 'popstate', function() { // history.js suggests statechange but it has a bug with urls with hashes not firing statechange
	                var State = History.getState(),
	                	cUrl = new getLocation(State.url),
	                	bUrl = new getLocation(window.location.href);
	                	//console.log('history');

                	if(isAosBlock) {
	                	if(pageLoad && (b.PAGE.indexOf(','+b.VIEW) < 0)) {  //일반 메뉴이동
	                		// console.log('일반 메뉴 이동');
							$('.element').removeClass('aos-hidden');
							$('.element').removeClass('aos-animate');
							$('.element').removeClass('render-aos');

							if(!b.ONE) {
								setTimeout(function() { 
									//console.log('history pageLoad 2');
									$('.element').addClass('aos-animate');
								},750);
							} 
							//isgalleryView = false;
						} 

						if(pageLoad && typeof b.VIEW != 'undefined' && b.VIEW && (b.PAGE.indexOf(','+b.VIEW) > -1)) {
							// console.log('history 상세');
							isgalleryView = true;
							if(isgalleryView && pageLoad) {
								setTimeout(function() { 
									$('.element').removeClass('aos-hidden');
									$('.element').removeClass('aos-animate');
									$('.element').removeClass('render-aos');

									setTimeout(function() { 
										//console.log('aos-animate');
										$('.element').addClass('aos-animate');
									},750); //상세페이지형 메뉴 이동
								},650);
							}
						} 
					} 

	                if(b.ONE) {
	                	if(cUrl.href!=window.location.href) {
	                		if(b.PAGE!='index') {
	                			var link = (!b.PUBLISH) ? '/render/index' : bUrl.pathname;
								var url = new getLocation(link);
					        	golink(_this,url);
								history.pushState('', '', link + bUrl.hash);
	                		} else {
	                			// if(bUrl.hash) {
	                			// 	var go = (bUrl.hash).replace('#','');
	                			// 	moveLinkPage(go);
	                			// }
	                		}
	                	}
	                }
				});

	        })(window);

		    $('.dsgn-body').addClass('mode-render');
	    	//$.modalON();

			if(typeof b.SETTINGS == 'undefined') return;
			if(typeof b.SETTINGS.rightClick == 'undefined' || b.SETTINGS.rightClick === false) return;
		    $('body').on('contextmenu', function(event){ return false; });
			$('body').on('selectstart', '.element, .forum-view, .comment-list', function(event){ return false; });
	    	$('body').on('dragstart', '.element, .forum-view, .comment-list',  function(event){ return false; });
	    });

		Pace.on('done', function() {
			//if(pageLoad){
			setTimeout(function() {
				$.each($('.element'),function(i,v){
					if($(this).hasClass('aos-hidden')) $(this).removeClass('aos-hidden');
					if($(this).hasClass('render-aos')) $(this).removeClass('render-aos');
					if($(this).hasClass('aos-animate')==false) $(this).addClass('aos-animate');
				});
			},1600);

			/*shopping more create*/
			if($('.shopping-wrap').length && $('.shopping-wrap').height() >= 800) {
				var more_txt = (LANG == 'ko') ? '상품정보 더보기' : 'MORE';
				var colorSet = shopping_more_color,
					sm_font = (!colorSet) ? '' : colorSet.color,
					sm_bgColor = (!colorSet) ? '' : colorSet.background_color,
					sm_border = (!colorSet) ? '' : colorSet.border_color;
				$('.shopping-wrap').css('max-height','800px')
								   .css('overflow','hidden')
								   .after('<div class="shopping-more-wrap"><div class="shopping-more">'+more_txt+'</div></div>');
				$('.shopping-wrap').removeClass('open');
				if(sm_font) $('.shopping-more').css('color',sm_font);
				if(sm_bgColor) $('.shopping-more').css('background-color',sm_bgColor);
				if(sm_border) $('.shopping-more').css('border-color',sm_border);
			}
			
			setTimeout(function() { 
				$('body').removeClass('pace-disable'); 
			},500);
			if(typeof $.cookie('gallery-item') != 'undefined' && b.VIEW == '') {
				moveGallery($.cookie('gallery-item'));
			}
			$.modalOFF();
		    moveScroll(0);
		});
		// naverLogCallback(function() {
		// 	if("naver_log" in b.SETTINGS) {
		// 		if (!wcs_add) var wcs_add={};
		// 		wcs_add["wa"] = b.SETTINGS.naver_log;
		// 		if (!_nasa) var _nasa={};
		// 		wcs_do(_nasa);
		// 	}
		// });
		
		if(typeof pageMoveCallback == 'function') pageMoveCallback();
		formTranslate(LANG);

	    $('.dsgn-body').addClass('mode-render');
	    // $('button.navbar-toggle').addClass('hide');
    	// (b.WRAP) ? $('.dsgn-body').addClass('tiny') : $('.dsgn-body').removeClass('tiny');

		$('header').wrap('<div class="header el-menu" data-el="el-menu" data-name="menu"></div>');

		var $tag = $('header');
		changeBrokenImages($tag);

		$tag.removeClass('tpl-menu');
		if(b.ONE){
			if(b.VIEW) $tag.find('#site-home').attr('href',URL).removeClass('mini-home');
			else $tag.find('#site-home').attr('href','javascript:;').addClass('mini-home');
		} else $tag.find('#site-home').attr('href',URL).removeClass('mini-home');


		var first_elname = (b.HEADER && Object.keys(b.CONTENTS).length > 0) ? Object.keys(b.CONTENTS)[0] : '';
		if(first_elname && typeof b.CONTENTS[first_elname] != 'undefined' && b.CONTENTS[first_elname]['element']['overlap'] == 0) {
			b.HEADER = 0;					
		}

		var isSidebar = $tag.hasClass('sidebar');

		if(isSidebar) {
			$('.dsgn-body').addClass('sidebar');
			$('.header.el-menu').addClass('sidebar');		
		}

		if(b.HEADER && !isSidebar) {
			$('header.navbar').addClass('transparent');
		}

		header_fixed = $('header.navbar').height();
		menu_color = $('header.navbar').css('background-color');
		if(menu_color==('rgba(0, 0, 0, 0)')) {
			$('header.navbar').css('background-color',$('dsgn-body').css('background-color'));
		}

		if(isSidebar) {
			if($tag.hasClass('hide') && $('.dsgn-body').hasClass('sidebar'))
				$('.dsgn-body').removeClass('sidebar');
		}
		
		// footer
		$('.footer-' + b.SID).addClass('el-footer').addClass('element').attr('data-type','footer');

	    $(window).on('scroll',function() {
	    	if($('.dsgn-body').hasClass('mobile-nav-active')) return false;

			if($(this).scrollTop() > 200) {
				if($('#goto-top').css('display') == 'none') $('#goto-top').fadeIn(200);
			} else {
				if($('#goto-top').css('display') == 'block') $('#goto-top').fadeOut(200);
			}

	        if($('.dsgn-body').hasClass('sidebar')==false) {
	            fixedMenu();
	        }

	        if($(this).scrollTop() == 0 && $('header').hasClass('navbar-fheader')) {
				setTimeout(function() { $.fheader.position(); }, 200);
			}
	        scrollspy();
	        parallax();

	    });

		$(window).on('orientationchange',function(){
			if($('.blueimp-gallery-display').length) {
				var $slide = $('.blueimp-gallery .slides .slide'),
					play = $('.blueimp-gallery-playing').length,
					idx = 0;
				$.each($slide, function(i,v) {
		        	var trans = $(this).attr('style');
		        	if(trans.indexOf('translate(0px, 0px)') > 0) {
		        		idx = $(this).attr('data-index');
		        	}
				});

				var gallery = $('.blueimp-gallery-display').attr('id');
				$('#' + gallery + ' .close').click();
				$.processON();
				setTimeout(function() { 
					$.processOFF() ; 
					$('.gallery-item[data-index="' + idx + '"] a[data-gallery="#' + gallery + '"]').click(); 
					if(play) $('#' + gallery + ' .play-pause').click();
				}, 1000);
			}
		});

		$(window).resize(function () {
			$('.config-image-view').hide();
			if($('body').width() <= 768 && $('.dsgn-body').hasClass('sidebar')) {
				if($('header.navbar').hasClass('sidebar')) {
					cssSidebar('off');
				}
				//$('.dsgn-body').removeClass('sidebar').addClass('removed-sidebar');
			} else if ($('body').width() > 768 /*&& $('.dsgn-body').hasClass('removed-sidebar')*/) {
				if($('header.navbar').hasClass('sidebar')) {
					cssSidebar('on');
				}
				//$('.dsgn-body').removeClass('removed-sidebar').addClass('sidebar');
				var top = ($('.creatorlink-header').length == 1) ? '55px' : '0px';
				$('.el_0').css('margin-top',top);
				if($('.header-empty').length > 0) $('.header-empty').remove();
			}

            if( $('.header-empty').length > 0 && $('.header-empty').height() != $('.el-menu').height() ) {
            	$('.header-empty').css('height',$('.el-menu').height()+'px');
            }

			// menu ver3 : fheader
			if($('header.navbar').hasClass('navbar-fheader')) $.fheader.position();
			
	        if($('body').width() <= 768) {
	            if($('#tpl-menu li.active.dropdown').length > 0) $('#tpl-menu li.active.dropdown').removeClass('active');
	        } else {
	            if($('#tpl-menu li.active').closest('ul').hasClass('dropdown-menu')) $('#tpl-menu li.active').closest('li.dropdown').addClass('active');
	            $('#tpl-menu ul.dropdown-menu').removeAttr('style');
	        }

			// gallery option - gh
			if($('.element[data-type="gallery"] .goption[data-gh]').length > 0) refreshGalleryHeight();
			if($('.element[data-type="video"] .lyoption[data-lyh]').length > 0) setLayoutHeight();

	        var vpmode_opt = $('.mobilepc_ch').attr('data-desktop-option'),
     	 	   	vpmode = vpmode_opt ? vpmode_opt : b.SETTINGS.viewportMode,
         	    vpModeOnoff = (property.SETTINGS.vpMode_onoff === true) ? true : false,
         	    checkFnav = ($('.fnav').length > 0 && vpmode=='mobile_web') ? true : false,
         	    WebType = $.mpcWeb.mpcCheckWebType();

	        if($('.fnav').length > 0) {
	            if($('body').width() <= 480) {
	            	if($('#cl-music-player-icon').length > 0) $('#goto-top,#cl-music-player-icon').addClass('movedOne');
	            } 
	        }

	        if(vpModeOnoff && WebType == 'MOBILE') $.mpcWeb.mpcMusicandGoTop(checkFnav,vpmode);

	        fixedMenu();
	        scrollspy();
	        if($('.fr-view').length) {
	            setForumWrap();
	        }
	        sitePopupResize();
	    });
	    this.liveUpdate(b.SMENU);

	    $('button.navbar-toggle').css('visibility','visible');

		if(b.PAGE == 'psearch') $.psearch.view();

		var displaySnsShare = function(pid) {
			var checkUrl = b.PAGE.split(','),
				type = (checkUrl[0] == 'forum') ? 'F' : 'P',
				check_view_empty = (b.VIEW && b.COUNT == 1 && $('.error_404.element[data-name="error_404"]').length == 1) ? true : false,
				checkGalleryProjectClass = (type=='P') ? 'galProjectBg' : '';

			if(type == 'P' && (b.COUNT == 0 || check_view_empty)) return false;

		    var option = (b.PARENT.settings) ? jQuery.parseJSON(b.PARENT.settings) : {};
		    	
		    if(typeof option.sns_share_display == 'undefined' || !option.sns_share_display) {
		     	return false;
		    } else if ( option.sns_share_display == 'ON') {
		    	if(type == 'F') $('.tpl-forum-list-footer .tpl-page-toolbar .tpl-forum-toolbar-button.share').removeClass('hide');
		    	else {
		    		//var checkCss = ($('.galProjectCss').text().indexOf('.galProjectBg svg') > -1) ? true : false;
		            var g_color = (typeof $('.dsgn-body').attr('data-gcolor')!='undefined') ? $('.dsgn-body').attr('data-gcolor') : '';
		            if(g_color) {
		                var pr_rgba = hexToRgba(g_color),
		                    galProjectCssStr = ($('.galProjectCss').length>0) ? $('.galProjectCss').text() : '';

		                galProjectCssStr += '.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg svg {fill: rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.6);}\n';
		                $('.galProjectCss').text(galProjectCssStr);
		            }            
		            $('.tpl-page-footer').removeClass( 'hide' ).removeClass(checkGalleryProjectClass).addClass(checkGalleryProjectClass);
		            $('.tpl-page-footer .tpl-forum-toolbar-button.share').removeClass( 'hide' );
		            if($('.tpl-page-footer').hasClass('galProjectBg')) $('.tpl-page-footer').removeAttr('style').css('padding','30px 0px');
		    	}
		    }
		}
		var displayBottomNav = function(pid) {
			var checkUrl = b.PAGE.split(','),
				type = (checkUrl[0] == 'forum') ? 'F' : 'P',
				check_view_empty = (b.VIEW && b.COUNT == 1 && $('.error_404.element[data-name="error_404"]').length == 1) ? true : false,
				checkGalleryProjectClass = (type=='P') ? 'galProjectBg' : '';

			if(type == 'P' && (b.COUNT == 0 || check_view_empty)) return false;

		    var option = (b.PARENT.settings) ? jQuery.parseJSON(b.PARENT.settings) : {};
		    if(typeof option.bottomNav_display == 'undefined' || !option.bottomNav_display) {
		    	return false;
		    } else if ( option.bottomNav_display == 'ON') {
		    	if(type == 'F') $('.tpl-forum-list-footer .tpl-page-toolbar .bottom-navigation').removeClass('hide');
		    	else {
		    		//var checkCss = ($('.galProjectCss').text().indexOf('.galProjectBg svg') > -1) ? true : false;
		            var g_color = (typeof $('.dsgn-body').attr('data-gcolor')!='undefined') ? $('.dsgn-body').attr('data-gcolor') : '';
		            if(g_color) {
		                var pr_rgba = hexToRgba(g_color),
		                    galProjectCssStr = ($('.galProjectCss').length>0) ? $('.galProjectCss').text() : '';

		                galProjectCssStr += '.dsgn-body[data-gcolor="'+g_color+'"] .galProjectBg svg {fill: rgba('+pr_rgba.r+','+pr_rgba.g+','+pr_rgba.b+',0.6);}\n';
		                $('.galProjectCss').text(galProjectCssStr);
		            }            
		            $('.tpl-page-footer').removeClass( 'hide' ).removeClass(checkGalleryProjectClass).addClass(checkGalleryProjectClass);
		            $('.tpl-page-footer .bottom-navigation').removeClass( 'hide' );
		            if($('.tpl-page-footer').hasClass('galProjectBg')) $('.tpl-page-footer').removeAttr('style').css('padding','30px 0px');
		    	}
		    }
		}

		$('[data-imglink="true"][attr-link]').live('click',function(){
	    	if($(this).is('[attr-link=""]')) return false;

		    var imgtarget = $(this).attr('data-target'),
		        imgshlink = $(this).attr('data-shlink'),
		        imgblank = $(this).attr('data-blank');

		    if(imgblank == '_blank') {
		        var openNewWindow = window.open('about:blank');
		            openNewWindow.location.href=imgshlink; 
		    } else {
		        location.href=imgshlink;
		    }
		});

		$('.siteLANG ul a, .siteLANG-dmenu-wrap ul li a').live({
			click: function(e) {
				if(LANGLINK) return;
				e.preventDefault();
				var sid = (typeof SID != 'undefined' && SID) ? SID : property.SID,
					slang_code = $(this).attr('data-code'),
					slang_str = $(this).text().trim();

				changeLanguage(slang_code);
			}
		});

		$('.sitePopupTodayHide, .sitePopupClose').live({
			click: function() {
				if($(this).hasClass('sitePopupTodayHide')) $(this).find('input').click();
				var selectedPopup = $(this).closest('.modal-popup').attr('id');
				$('#' + selectedPopup).find('.popup-close').click();
			}
		});

		$('.popup-close').live({
		    click: function() {
		        var selectedPopup = $(this).closest('.modal-popup').attr('id'),
		            idx = $(this).closest('.modal-popup').attr('data-idx'),
		            ptime = $(this).closest('.modal-popup').attr('data-time'),
		            isTodayHide = $(this).closest('.modal-popup').find('.sitePopupTodayHide input').prop('checked'),
		            date = new Date();
		            
		        var ptime_val = {
					'always'    : 0,
					'onlyone'   : 365 * 24 * 60 * 60 * 1000,
					'week'      : 7 * 24 * 60 * 60 * 1000, 
					'day'       : 24 * 60 * 60 * 1000, 
					'12hour'    : 12 * 60 * 60 * 1000, 
					'6hour'     : 6 * 60 * 60 * 1000, 
					'2hour'     : 2 * 60 * 60 * 1000, 
					'1hour'     : 60 * 60 * 1000, 
					'30min'     : 30 * 60 * 1000, 
					'10min'     : 10 * 60 * 1000
		        };

		        if(isTodayHide) {
		        	date.setTime(date.getTime() + ptime_val['day']);
		        } else { 
		        	date.setTime(date.getTime() + ptime_val[ptime]);
		        }
		        $('#' + selectedPopup).fadeOut();
		        if(isTodayHide || (typeof ptime !='undefined' && ptime != 'always' && ptime != '')) { $.cookie(selectedPopup, true, { path: '/', expires: date}); }
		        else { $.removeCookie(selectedPopup, { path: '/' }); }
		    }
		});

		var displayBottomList = function(pid) {
			
			var checkUrl = b.PAGE.split(','),
				type = (checkUrl[0] == 'forum') ? 'F' : 'P',
				check_view_empty = (b.VIEW && b.COUNT == 1 && $('.error_404.element[data-name="error_404"]').length == 1) ? true : false;
			if(type == 'P' && (b.COUNT == 0 || check_view_empty)) return false;

			var option = (b.PARENT.settings) ? jQuery.parseJSON(b.PARENT.settings) : {};
			if(typeof option.bottomlist_display == 'undefined' || !option.bottomlist_display) return false;
			else if (option.bottomlist_display == 'ON') {
				$.bottomlist.init({
					pid : pid,
					type : type
				});
			}
		}

		var moveScroll = function(interval, loc) {
			var url = (typeof loc == 'undefined') ? decodeURIComponent(document.URL) : decodeURIComponent(loc);
		    link = url.split('#').pop();
		    if($.inArray(link,b.MENULINK) > -1 && b.ONE && !b.VIEW) {
		        moveLinkPage(link,interval);
		        $.removeCookie('gallery', { path: '/' });
		        $.removeCookie('gallery-item', { path : '/' });
		    } else if (url.match(/\@/g)) {
		        link = url.split('\@').pop();
		        var bookmark_link = url.substr(url.lastIndexOf('/')+1);
		        if(link) moveLinkPage(bookmark_link,800,true);
		    } else {
		    	$(window).scrollTop(0);
		    }
		}

		var moveBookmark = function(page,bookmark,interval,target) {
			var page_arr = (typeof page == 'undefined') ? new Array() : page.split('\,'),
				view = (page_arr.length > 1) ? page_arr[1] : '';

		    interval = (typeof interval == 'undefined') ? 1200 : interval;
		    target = (typeof target == 'undefined') ? '' : target;

		    if( (view!='' && view==b.VIEW && !target) || (view=='' && !b.VIEW && page_arr[0]==b.PAGE && !target) ) {
		        moveLinkPage(page_arr[0]+bookmark,interval,true);
		    } else {
		        var linkUrl = '';
		        if(b.ONE) {
		            linkUrl = (view.length>0) ? '/index/view/' + view : '/index';
		            linkUrl = (!b.PUBLISH) ? '/render' + linkUrl + bookmark : linkUrl + bookmark;
		        } else {
		        	var url_str = (view.length>0) ? page_arr[0] + '/view/' + view : page;
		            linkUrl = (URL=='/') ? '/' + url_str + bookmark : URL + '/' + url_str + bookmark;  
		        }

		        if(target) {
					var openLinkPage = window.open('about:blank');
					openLinkPage.location.href=linkUrl;
		        } else {
					var url = new getLocation(linkUrl);		        	
		        	golink(_this,url);
		        	// location.replace(linkUrl);
		        }
		        
		    }
		}

		var moveLinkPage = function(link,interval,isblock) {
			interval = (typeof interval == 'undefined') ? 1200 : interval;
			if(typeof isblock == 'undefined') isblock = '';
		    if($('.dsgn-body').width()<769) {
		        header_fixed = $('.el-menu .navbar-header').height()-1;
		    } else {
		        header_fixed = $('#tpl-menu').height();
		    }

		    var isBookmark = false, bookmark_arr = new Array();
		    link = decodeURIComponent(link);
			if(link.match(/\@/g)) { 
				isBookmark = true;
				bookmark_arr = link.split('\@');


				var check_link = true,
					is_visible_menu = false;

				$.each(b.SMENU, function (idx, obj) {
					if(is_o_page == obj.name.replace(/ /g,'-')) {
						if(!obj.link) check_link = false;
						if(obj.display == 'on') is_visible_menu = false;
					}
					if(obj.children) {
						$.each(obj.children, function (i, v){
							if(is_o_page == v.name.replace(/ /g,'-')) {
								if(!v.link) check_link = false;
								if(v.display == 'on') is_visible_menu = false;
							}
						});
					}
				});

				var is_here = ($('.element[data-bookmark="' + bookmark_arr[1] + '"]').length > 0 ) ? true : false,
					is_page = (b.PAGE.toLowerCase()==bookmark_arr[0].toLowerCase() || b.VIEW && b.VIEW == bookmark_arr[0]) ? true : false,
					is_o_page = (bookmark_arr[0].indexOf(',') > -1 && !b.VIEW) ? bookmark_arr[0].substring(0,bookmark_arr[0].indexOf(',')) : (b.VIEW) ? 'index' : bookmark_arr[0],
					// is_visible_menu = ($.inArray(is_o_page,b.MENULINK)>-1) ? true : false,
					// check_link = ( $('#tpl-menu li a[href*="'+is_o_page+'"]').length > 0 && $('#tpl-menu li a[href*="'+is_o_page+'"]').text().trim().replace(/ /gi,'-') == is_o_page ) ? false : true,
					is_link = (check_link && is_visible_menu && is_o_page != 'INTRO') ? true : false,
					is_visible = (check_link && is_visible_menu && is_o_page != 'INTRO') ? true : false;

				if( ( !is_visible_menu && is_o_page!='index' ) ||
					( /*!is_page &&*/ ( is_link || is_visible ) ) ||
					( is_page && !is_here ) )  { 
					if(is_visible_menu==false) ;
					else return false; 
				}
				link = 'element[data-bookmark="' + bookmark_arr[1] + '"]';     
				
			} else {
			    link = (isblock=='') ? 'link-to-' + link : link;
			}

			if($('header').hasClass('navbar-fheader')) header_fixed = $('header.navbar').outerHeight() - 1;

		    var offset = ($('.dsgn-body').hasClass('sidebar')) ? 0 : -header_fixed;
		    if($('header.navbar').hasClass('disableOffset') && !$('.'+link).hasClass('el_0')) offset = 0;
		    offset = (window.innerWidth > 768) ? offset : -header_fixed;
		    // $('body').scrollTo('.'+link,interval,{offset:offset,easing :'easeInOutQuart'});

		    $('.element').removeClass('aos-init');
	    	$('.element').removeClass('aos-animate');

    		$.each($('.element'),function(){
				if(isAosBlock) {
					var aos = $(this).attr('data-aos');
					$(this).attr('data-aos-ch',aos);
					$(this).removeAttr('data-aos');
				}
			});

    		if($('.'+link).length==0) return;
		    var sTop = $('.'+link).offset().top + offset,
		    	duration = (typeof $('#tpl-menu').attr('data-duration') != 'undefined') ? parseInt($('#tpl-menu').attr('data-duration')) : 1000;

		    	sTop = (isAosBlock && $('.'+link).hasClass('el_0')==false && $('.menu-logo-top').length>0 && $('.menu-logo-top').css('display')=='block') ? sTop + $('.menu-logo-top').outerHeight() : sTop;

	    	$('html, body').animate({
		        scrollTop: sTop
		    },duration, 'easeInOutQuart',function(){
		    	if(isAosBlock) {
			    	$('.element').addClass('aos-init');
			    	$('.element').addClass('aos-animate');
			    	$.each($('.element'),function(){
						var aos = $(this).attr('data-aos-ch');
						$(this).attr('data-aos',aos);
						$(this).removeAttr('data-aos-ch');
					});
			    }
		    });
	    	
		    var menuStr = (!isBookmark) ? link.replace('link-to-','') : bookmark_arr[0];
		    setTimeout(function() {
		    	$('header #tpl-menu li a[href=#' + menuStr + ']').closest('li').addClass('active').siblings().removeClass('active');
		    	if($('#mobile-nav #tpl-menu li').length) $('#mobile-nav #tpl-menu li a[href=#' + menuStr + ']').closest('li').addClass('active').siblings().removeClass('active');
		    },1100);
		}

		var getParent = function(parent,id,page) {
		    var deferred = $.Deferred();
		    if(id) {
		    	parent = (parent == 'forum') ? parent : 'project';
				$.getJSON('/template/get/parent/' + parent + '/id/' + id + '/sid/' + _this.b.SID + '/page/' + encodeURIComponent(page) + _this.b.param, function(data) {
					property.PRODINFO = (data.prod_onoff == "on") ? data.PRODINFO : '';
					_this.b.PARENT = data.PARENT;
					_this.b.COUNT = data.COUNT;
				});
		    } else {
				property.PRODINFO = "";
				_this.b.PARENT = {};
				_this.b.COUNT = 0;
		    }
			deferred.resolve();
		    return deferred.promise();
		}

		var showPageCallback = function(func,callback) {
		    func(b.MCSS, b.MSTYLE, b.MTAG, true);
		    if(typeof callback=='function') {
		    	callback();
		    }
		}

		var showPage = function (css, style, tag, prop) {
			if($('.fmcss').length > 0) $('.fmcss').remove();
		    $.each(style.children,function(k,v) {
		        if(k!='.dsgn-body') {
		            delete style.children[k];
		        }
		    });
    		elFooter();

			if(b.HEADER && b.PARENT.mode == 'shopping') b.HEADER = 0;
		    if(b.HEADER && !isSidebar) {
		        $('header.navbar').addClass('transparent');
		    }

		    menu_color = $('header.navbar').css('background-color');
		    header_fixed = $('header.navbar').height();
		    if(menu_color==('rgba(0, 0, 0, 0)')) {
		        $('header.navbar').css('background-color',$('dsgn-body').css('background-color'));
		    }

		    if(b.SETTINGS.passwordUse === true) {
		    	var checkSiteLock = isSitePasswordLock();
		    } 

		    var is_lock_block = 'active';
			isMenuLock(function() {
				if(b.ISLOCK == 'true' && is_lock_block == '' || b.ISLOCK != 'true') elPush(prop);
			});

			// menu active
			/* 190710 -  menu or sub-menu 일부 같을때 첫번째 메뉴에 active error 생겨서 주석 처리. */
			// if(b.PARENT.page) {
			// 	$('#tpl-menu li').find('a:contains("' + b.PARENT.page + '")').parent().addClass('active');
			// } else {
			// 	if(b.ONE) {
			// 		if(b.SMENU[0].display == 'off') $('#tpl-menu li').first().addClass('active');
			// 	} else if(b.PAGE) {
			// 		$('#tpl-menu li').find('a:contains("' + b.PAGE + '")').parent().addClass('active');
			// 	}
			// };

		    RENDER.setLoginout(b.LOGINOUT, b.SID, b.PUBLISH, b.PROFILEIMG);
		    $('body,html').animate({scrollTop: 0}, 300,'easeInOutQuart');
		}

		var loadPush = function(data) {
			 console.log(' page draw:: loadPush');

			var deferred = $.Deferred();
			var pageID = b.PAGE.split(','),
				chgBG = false,
				tmpTag = '',
				currentPAGE = b.PAGE,
				default_t_css = '', default_m_css = '';

			var checkGalleryView = (b.VIEW && b.PAGE.match(/^forum,/g) === null) ? true : false,
				page_pos = 0,
				site_settings = (typeof b.SETTINGS != 'undefined' && b.SETTINGS) ? b.SETTINGS : {};

	        $('#el-empty').empty();
	        $('.gallery-popup').remove();
	        b.COUNT = data.length;
	        $.each(data, function (idx, val) {
	        	page_pos += 1;

	            var tag = htmlspecialchars_decode(val.eltag,'ENT_QUOTES'),
	            	settings = (typeof val.elsettings != 'undefined' && val.elsettings) ? $.parseJSON(val.elsettings) : {},
	            	gallery_empty = true,
	            	fontload = [],
	            	block_lang = (typeof settings.blocklang != 'undefined') ? settings.blocklang : LANG;

	            if(idx == 0 && b.HEADER) {
	            	var checkMenuHideBlock = ($('.el-menu.header').find('.hideBlockWrap').length > 0) ? true : false,
	            		checkHideBlock = (typeof settings.block_display != 'undefined' && settings.block_display == 'OFF') ? true : false;
					if(checkMenuHideBlock || checkHideBlock || val.overlap == 0) {
						b.HEADER = 0;
						$('header').removeClass('transparent');
						if($('header').hasClass('navbar-fheader')) $.fheader.position();
					}
	            }


	            if(val.type == 'project' && val.eltag.charAt(0) == '\<') tag = val.eltag;

	            if(typeof val.fonts != 'undefined') {
	            	$.each(val.fonts, function(i,v) {
	            		if(b.ELFONTS.indexOf(i) < 0 && v) {
							b.ELFONTS.push(i);
							$('#loadfonts').append(v);
	            		}
	            	});
	            }
	            if(typeof val.webfonts != 'undefined' && val.webfonts) {
	            	$.each(val.webfonts, function(i2,v2) {
	            		if(b.ELFONTS.indexOf(i2) < 0 && v2) {
							b.ELFONTS.push(i2);
	            			WebFont.load({ google : { families : [ v2 ] }});
	            		}
	            	})
	            }
	           
	            if (val.type == 'gallery' || val.type == 'shopping') {
	                $('#el-empty').append($(tag));
	                $('#el-empty').find('[data-loop="true"]').html('');

	                var nodes = $(tag).find('[data-loop="true"]').children(),
	                    p = $('#el-empty').children(),
	                    g = p.clone().removeClass().addClass('galleryPL'+val.seq).addClass('gallery-popup'),
	                    i = [],
	                    view = $(tag).find('[data-loop="true"]').data('view'),
	                    total = 0;

	                $('#el-empty').after(g);

                    galleryEL[val.seq] = {
                    	'seq' : val.seq,
                    	'elname' : val.elname,
                    	'eltag' : tag,
                    	'folder' : val.folder,
                    	'mode' : val.mode,
                    	'elsettings' : val.elsettings,
                    	'feature' : val.feature,
                    };

	                if(typeof view == 'undefined') view = 10;
	                var cookie_page = 1,
	                	cookie_view = view,
	                    cookie_gallery_category = '',
	                    is_gc_cookie = (typeof $.cookie('gallery-category-'+val.seq) != 'undefined' && $.cookie('gallery-category-'+val.seq).length > 0) ? true : false;

	            	var category_onoff = (typeof settings.category_display != 'undefined' && settings.category_display) ? settings.category_display : 'OFF';
	            	var adultonly_onoff = (typeof settings.adult_only != 'undefined' && settings.adult_only) ? settings.adult_only : 'OFF';
	            	
	                if(typeof $.cookie('loadmore-' + val.seq) != 'undefined' && $.cookie('loadmore-' + val.seq).length > 0) {
	                    cookie_page = $.cookie('loadmore-'+val.seq);
	                    cookie_gallery_category = (typeof $.cookie('gallery-category-'+val.seq) != 'undefined') ? $.cookie('gallery-category-'+val.seq) : '';
	                    cookie_view = cookie_page * view;
	                } else { 
						var checkCateHomeHide = (category_onoff == 'ON' &&
												typeof settings.category != 'undefined' && settings.category && 
												typeof settings.category_home_hide != 'undefined' && settings.category_home_hide) ? true : false;
						if(checkCateHomeHide) {
							var gc = settings.category.replace(/\|/g,'').split(',');
							cookie_gallery_category = gc[0];
							is_gc_cookie = true;

							$.cookie('gallery-catehome-' + val.seq, cookie_gallery_category, { path : '/', expires: 12 * 60 * 60 * 1000 });
						}
	                }
	                
	                if(val.seq == 'all_products') {
	                	cookie_page = (typeof $.cookie('gallery-page-all_products') !== 'undefined' && $.cookie('gallery-page-all_products') != '')? $.cookie('gallery-page-all_products') : 1;
	                	cookie_gallery_category = setAllProductsCurrentCat(settings);
	                	cookie_view = cookie_page * view;
	                }
	                
                    $.cookie('gallery-page-' + val.seq, cookie_page, { path : '/', expires: 12 * 60 * 60 * 1000 });
                    $.cookie('gallery-category-' + val.seq, cookie_gallery_category, { path : '/', expires: 12 * 60 * 60 * 1000 });
                    $.removeCookie('loadmore-' + val.seq, { path : '/' });  

					var el_gh = $(tag).find('.goption').attr('data-gh'),
						checkGalleryHeight = (typeof el_gh != 'undefined' && el_gh) ? true : false,
						checkGallerySVG = ($(tag).find('.gimg-svg-wrap').length > 0) ? true : false;


	                $.ajax({
	                    url: '/template/gallery/list/pid/' + val.seq + '/sid/' + b.SID + '/spage/' + currentPAGE + '/view/' + cookie_view + param,
	                    data: { g_mode: val.mode,  visible: true, sfl: 'category', stx: cookie_gallery_category },
	                    dataType: 'json',
	                    type: 'POST',
	                    async: false,
	                    cache: false,
	                    success: function (data) {
	                        $.each(data.list, function (idx, v) {
	                            i.push(v);
	                        });

	                        total = (typeof data.total.list_total == 'undefined') ?  data.total : data.total.list_total;
				            cookie_view = ( cookie_view > total ) ? total : cookie_view;
	                        // cookie_view = (cookie_view < total) ? cookie_view : total;

	                        if( total>0 ) gallery_empty = false;
	                        if( i.length>0 || (i.length==0 && is_gc_cookie) ) {
	                            var loop_count = nodes.length, item_index = 0;
	                            var elem = [];
	                            $.each(data.total_list,function(index,v) {
	                                loop_pos = index%loop_count;
	                                c = nodes[loop_pos];

									v.title = (v.title.length>0) ? v.title : $.lang[block_lang]['editor.block.gallery.sample.title'];
									v.caption = (v.caption.length>0) ? v.caption : $.lang[block_lang]['editor.block.gallery.sample.caption'];

									$(c).addClass('gallery-item').attr('data-index',index).attr('data-seq',v.seq);

	                                var vgsettings = (typeof v.gsettings != 'undefined' && v.gsettings) ? $.parseJSON(v.gsettings) : {},
								        img_path = (typeof vgsettings['storage'] != 'undefined') ? vgsettings['storage'] : _this.b.RESOURCE + '/' + _this.b.SID + '/',
								        img_original = (typeof vgsettings['storage'] != 'undefined') ? img_path + '1920/' : img_path;

									var folder = (val.folder == 0) ? '' : val.folder + '/',
										src = getServeImage(v.image,val.folder,img_path),
										src_s0 = getServeImage(v.image,'0',img_path);
									$(c).find('img').attr('src',src);
									if(checkGalleryHeight) $(c).find('.g-img').css('background-image', 'url('+src+')');
									if(checkGallerySVG) {
										var gimgSVG = $(c).find('.gimg-svg-wrap svg');
										gimgSVG.find('pattern').attr('id','gimgSvg_'+val.elname+'_'+index);
										gimgSVG.find('image').attr('xlink:href', src);
										gimgSVG.find('polygon').attr('fill', 'url(#gimgSvg_'+val.elname+'_'+index+')');
									}

									var glink = (typeof vgsettings['glink'] != 'undefined' && vgsettings['glink']) ? vgsettings['glink'] : '',
										glink_target = (typeof vgsettings['glink_target'] != 'undefined' && vgsettings['glink_target']) ? vgsettings['glink_target'] : '';

									if(glink) {
										if(glink.match(/^\@/g) !== null) {															// link-type: link-bookmark ==> a[attr-bookmark]
											var bookmark_seq = glink.replace(/^\@/g,'');
											if(typeof _this.b.SETTINGS.blockBookmarkList == 'undefined' || typeof _this.b.SETTINGS.blockBookmarkList['bookmark' + bookmark_seq] == 'undefined') {
												glink = '';
												glink_target = '';
											}
										} else if(glink.match(/^flink\@[0-9]/gi) !== null) {										// link-type: link-file     ==> a[attr-flink]
											glink_target = '';
										} else if($.inArray(glink.replace(/^\//g,'').replace(/ /g,'-'),_this.b.MENULIST) > -1) {	// link-type: link-menu     ==> a[data-user-link]
										} else {																					// link-type: link-out      ==> a[attr-link]
											if(checkBase64Encode(glink)) glink = Base64.decode(glink);
										}
									}

									$(c).find('a').removeAttr('data-gallery').removeAttr('data-user-link').removeAttr('attr-bookmark').removeAttr('attr-link').removeAttr('attr-flink');
									if (typeof v.price_hidden != 'undefined' && v.price_hidden == 'ON' && property['SITEUM'] >= 1) {
										$(c).addClass('gallery-item').addClass('nonePrice');
										$(c).find('a').attr('href', '#');
									} else {
										if(glink) {
											var glink_val = makeLinkUrl(glink, b.ONE, b.VIEW);
											$(c).find('a').attr('href',glink_val);

											if(glink.match(/^\@/g)) {
												$(c).find('a').attr('attr-bookmark',glink.replace(/^\@/g,''));
											} else if(glink.match(/^flink\@[0-9]/g) !== null) {
												$(c).find('a').attr('attr-flink',glink.replace(/^flink\@/g,''));
											// IE ERROR_includes__H.20210603
											// } else if(_this.b.MENULIST.includes(glink.replace(/ /g,'-'))) {
											} else if($.inArray(glink.replace(/ /g,'-'),_this.b.MENULIST) > -1) {
												$(c).find('a').attr('data-user-link',glink_val);
											} else {
												$(c).find('a').attr('attr-link',glink);
											}
										} else {
											if (val.mode == 'gallery') {
												src_s0 = src_s0 + '?gpos='+v.pos;

												$(c).find('a').attr('href', src_s0);
												$(c).find('a').attr('data-gallery', '#gframe-' + val.seq);
											} else {
												if(val.seq == 'all_products') {
													$(c).find('a').attr('href', v.product_url);
												} else {
													$(c).find('a').attr('href', ((URL=='/') ? '' : URL) + '/' + b.PAGE + '/view/' + v.seq);
												}		
											}
										}
									}

									if(glink_target == '_blank') $(c).find('a').attr('target','_blank');
									else $(c).find('a').removeAttr('target');

									$(c).find('a').attr('data-title', v.title);

									if(adultonly_onoff == 'ON') $(c).addClass('adultonly');

									// caption
									var ftitle = $(c).find('h5.figure'),
										fcaption = $(c).find('p.figure'),
										fdatetime = $(c).find('.figure.datetime'),
										fhashtag = $(c).find('.figure.hashtag'),
										fprice = $(c).find('.figure.price'),
										freview = $(c).find('.figure.review');

	                                // datetime / hashtag
	                                if(fdatetime.length<1) {
	                                    $(c).find('figcaption').append('<div class="figure datetime hide"></div>');
	                                    fdatetime = $(c).find('.figure.datetime');
	                                }
	                                if(fhashtag.length<1) {
	                                    $(c).find('figcaption').append('<div class="figure hashtag hide"></div>');
	                                    fhashtag = $(c).find('.figure.hashtag');
	                                }

	                                $(c).find('figcaption').removeClass('hide');
	                                if (v.title || v.caption) {
	                                    var gallery_caption = v.caption;
	                                    gallery_caption = gallery_caption.replace(/\n/g,'<br />');

	                                    ftitle.html(v.title);
	                                    fcaption.html(gallery_caption);
	                                    fdatetime.text(v.datetime);
	                                    fhashtag.text(v.hashtag);
	                                }

									if(val.mode == 'shopping' || val.seq == 'all_products') {

										var checkPriceHidden = (typeof v.price_hidden != 'undefined' && v.price_hidden == 'ON') ? true : false,
											gallery_price = (v.price && !checkPriceHidden) ? v.price : 0,
											gallery_sale_price = (typeof v.sale != 'undefined' && v.sale > 0 && !checkPriceHidden) ? v.sale : 0,
											gallery_sale_per = (typeof v.sale_per != 'undefined' && v.sale_per && !checkPriceHidden) ? v.sale_per : '',
											product_soldout = (typeof settings.sh_soldout == 'string') ? settings.sh_soldout : '구매불가',
											product_status = ((v.status == 'off' || (v.quantity_on == 'on' && v.quantity < 1)) && product_soldout && !checkPriceHidden) ? '<span class="cl-sh-soldout">' + product_soldout + '</span>' : '';

										$(c).find('.cl-sh-soldout').remove();
										if(product_status != '') $(c).attr('data-soldout',true);
										else $(c).removeAttr('data-soldout');

										if($(c).find('ul.figure.price').length > 0) {
											//Ver2
											if(!checkPriceHidden) {
												$(c).find('ul.figure.price .price-val').html('￦' + gallery_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
												$(c).find('ul.figure.price .price-val').removeClass('hide');

												if(gallery_sale_price > 0) {
													$(c).find('ul.figure.price .price-sale').html('￦' + gallery_sale_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
													$(c).find('ul.figure.price .price-sale-per').html(gallery_sale_per);
													$(c).find('ul.figure.price .price-sale, ul.figure.price .price-sale-per').removeClass('hide');
												} else {
													$(c).find('ul.figure.price .price-sale, ul.figure.price .price-sale-per').addClass('hide').html('');
												}
											} else {
	                                            $(c).find('ul.figure.price .price-val').html('￦0');
	                                            $(c).find('ul.figure.price .price-val').removeClass('hide');
											}

											if(product_status) $(c).find('ul.figure.price').append('<li>'+product_status+'</li>');

										} else {
											//Ver1
											if(fprice.length == 0) fprice = fcaption;
											
											if(checkPriceHidden) fprice.html('');
											else fprice.html('<span class="figure-krw">￦</span>' + gallery_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',') + product_status);
										}

										if($(c).find('ul.figure.review').length > 0) {
											var gallery_review = (v.review_onoff && v.review_cnt) ? v.review_cnt : 0;
											if(gallery_review > 0) {
												$(c).find('ul.figure.review, ul.figure.review li').removeClass('hide');
												$(c).find('ul.figure.review .figure-review-cnt').html(gallery_review);
												$(c).find('ul.figure.review .figure-review-score').html(v.review_score);
											} else {
												$(c).find('ul.figure.review, ul.figure.review li').addClass('hide');
												$(c).find('ul.figure.review .figure-review-cnt, ul.figure.review .figure-review-score').html('');
											}
										}

									} else {
										fprice.addClass('hide');
										freview.addClass('hide');
									}
                                    
	                                // $(p).find('[data-loop="true"]').append($(c)[0].outerHTML);		                                
	                                if(index < i.length) {
										$(p).find('[data-loop="true"]').append($(c)[0].outerHTML);
									} else {
										if(val.mode == 'gallery') {
											$(c).find('figure').remove();
											$(g).find('[data-loop="true"]').append($(c)[0].outerHTML);
										}	
									}
	                            });
	                            
	                        } else {
	                            if(val.mode=='project' && b.TEMPLATE == false) {
	                            	nodes.addClass('gallery-item');
	                                nodes.find('a').attr('href', ((URL=='/') ? '' : URL) + '/' + b.PAGE + '/view/template').removeAttr('data-gallery').find('img').attr('data-index',0);
	                            }
	                            $(p).find('[data-loop="true"]').append(nodes);
	                        }

	                        tag = $(p)[0].outerHTML;
	                        $('#el-empty').empty();
	                    }
	                });
	            } else {
	                if(typeof pageID[1] != 'undefined' && idx==0 && pageID[1] != 'template' && b.COUNT==0) {
	                    d = document.createElement('div');
	                    $(d).addClass('temp-element').html(tag);
	                    var pTitle = (b.PARENT.title) ? b.PARENT.title : $.lang[block_lang]['editor.block.gallery.sample.title'];
	                        pCaption = (b.PARENT.caption) ? b.PARENT.caption : $.lang[block_lang]['editor.block.gallery.sample.caption'];
	                    pCaption = pCaption.replace(/\n/g, '<br />');

	                    $(d).find('.data-date').text(b.PARENT.datetime);
	                    $(d).find('.data-category').text(b.PARENT.category);
	                    $(d).find('h5.figure').text(pTitle);
	                    $(d).find('p.figure').html(pCaption);

	                    tag = $(d).html();
	                    $(d).remove();
	                    tmpTag = tag;
	                }
	            }

	            //add style
	            var $style_tag = $('<style type="text/css"></style>');
	            $style_tag.attr('id','el_'+idx+'css');
	            if(typeof val.elcss != 'undefined') {
		            $style_tag.html(htmlspecialchars_decode(val.elcss));
		            $('.header').before($style_tag);
	            }

	            //change carousel id
	            var $tag = $(tag);
	            $.each($tag.find('[data-edit="true"]'), function(i,v) {
	                var source = $(this).outerHTML();
	                source = source.replace(/&lt;&nbsp;/g,'&lt;').replace(/&nbsp;&gt;/g,'&gt;').replace(/data-attr-bookmark/g,'attr-bookmark');
	                $(this).replaceWith(source);
	            });
	            
	            if(typeof total == 'undefined') total = 0;
                
                // gallery frame add
				if(val.type == 'gallery') {
					if(val.mode == 'gallery' && total) tag = appendGalleryFrame($(tag),val.seq,val.elsettings);

					if(total > view && total > cookie_view) {
						var btn_class = (val.feature=='masonry') ? 'gallery-loadmore masonry-layout' : 'gallery-loadmore',
							btn_txt = (typeof settings.loadmore_lang != 'undefined' && settings.loadmore_lang == 'KO') ? '더보기' : 'LOAD MORE',
							btn_tag = '<div class="' + btn_class + '" data-loadmore="true" data-selector=".gallery-loadmore" data-total="' + total + '" data-id="' + val.seq + '" data-page="' + (Number(cookie_page)+1)+ '" data-view="' + view + '" data-folder="' + val.folder + '" data-mode="' + val.mode + '">' + btn_txt +' &nbsp;(<span class="display">' + cookie_view + '</span> / ' + total + ')</div>';
						
						if($tag.find('.gallery-loadmore').length > 0) $tag.find('.gallery-loadmore').replaceWith(btn_tag);
						else $tag.append(btn_tag);
                	}
                }

	            msny = (val.feature=='masonry') ? true : false;
	            var blocklang = '';

	            if(val.type == 'video') {
	                if($tag.find('.video-gallery-url').length > 0) val.mode = 'zoom';
	                else val.mode = 'thumb';
	            }

	            $tag.addClass('el_' + idx)
	                .attr('data-id', val.seq)
	                .attr('data-el','el_' + idx)
	                .attr('data-pos', idx+1)
	                .attr('data-name', val.elname)
	                .attr('data-msny', msny)
	                .attr('data-type', val.type)
	                .attr('data-type2', val.type2)
	                .attr('data-mode', val.mode)
	                .attr('data-width', val.folder)
	                .attr('data-overlap',val.overlap);

                if(typeof settings.blocklang != 'undefined') {
	                blocklang = settings.blocklang;
	                $tag.attr('data-blocklang',blocklang);
	            }
				if(checkGalleryView) {
					if(val.page == 'fixedblock_'+b.PARENT.pid) $tag.addClass('el-fixedblock');
					else $tag.removeClass('el-fixedblock');
					$tag.attr('data-pos', page_pos);
					$tag.attr('data-ppos', val.pos);
					$tag.attr('data-posby', val.elnew);
				}

	            if(val.type=='forum' || val.type=='latest') $tag.addClass('preloading');
	            if(val.type2) $tag.attr('data-type2', val.type2);
	          
	            if(b.ONE && val.orgpos==1) {
	                $tag.attr('data-link', val.orgpage);
	                $tag.addClass('link-to-'+val.orgpage.replace(/ /g,'-'));
	            }

	            $tag.addClass('element');

				$last_el = ($('.fnav').length) ? $('.fnav') : $('.el-footer');
				$tag.addClass('aos-hidden'); // 숨김
				$tag.addClass('render-aos');
				$last_el.before($tag);

	            if(val.type == 'sns' && typeof val.type2 != 'undefined' && val.type2 == 'feed') {
	                $tag.find('.data-feed-load-more').attr('data-feed-el',val.elname);
	                $tag.find('.data-feed-load-more').removeAttr('style');
	                $tag.find('.show-posts').removeClass('show-posts');

	                if(val.mode == 'site') {
	                	if(!$.isEmptyObject(b.SOCIAL)) {
							var load_sns = {};
							if(!$.isEmptyObject(b.SOCIAL.instagram) && typeof settings.sns_instagram != 'undefined' && settings.sns_instagram == 'ON') load_sns['instagram'] = b.SOCIAL.instagram;
							if(!$.isEmptyObject(b.SOCIAL.twitter) && typeof settings.sns_twitter != 'undefined' && settings.sns_twitter == 'ON') load_sns['twitter'] = b.SOCIAL.twitter;
							
							if(!$.isEmptyObject(load_sns)) {
								loadingElement(val.elname,'loading posts...');
								updateFeed(val.elname,load_sns,function() {
									$('.'+val.elname+' .listprogress').remove();
								});
							}
						}
	                } else {
						// SNS FEED:: before version
						if(typeof settings.sns != 'undefined' &&  settings.sns.twitter) {
							loadingElement(val.elname,'loading posts...');
							updateFeed(val.elname,settings.sns);
						}
	                }
	            }

	            if(val.type == 'others' && typeof val.type2 != 'undefined' && val.type2 == 'countdown') {
	                var el_dday = $tag.find('[data-dday="true"]'),
	                	cd_date = (el_dday.attr('data-countdown')) ? el_dday.attr('data-countdown') : new Date(),
	                    dateformat  = { days : '%D', hours: '%H', minutes: '%M', seconds: '%S' },
                        dateendformat  = { days : '00', hours: '00', minutes: '00', seconds: '00' };
					
					if( typeof settings.countdown != 'undefined' && settings.countdown ) {  //set - block setting date 
                        cd_date = settings.countdown;
	                }
	                if( !el_dday.attr('data-countdown') && typeof countdown == 'object' ) { //set - example date
	                    cd_date.setTime(cd_date.getTime() + (35*24*60*60*1000));
	                }
		            cd_date = moment(cd_date).format('YYYY/MM/DD HH:mm:ss');

					el_dday.countdown(cd_date, function(event) {
						$(this).find('.date-item[data-datetype]').each(function(i) {
							var dd_type = $(this).attr('data-datetype'),
								dd_format = $(this).attr('data-format'),
								dd_endformat = $(this).attr('data-finish');

							if(typeof dd_format == 'undefined' || !dd_format) dd_format = dateformat[dd_type];
							if(typeof dd_endformat == 'undefined' || !dd_endformat) dd_endformat = dateendformat[dd_type];

							if(event.elapsed) $(this).text(dd_endformat);
							else $(this).text(event.strftime(dd_format));
						});
					});
	            }

				if(typeof settings.bookmark != 'undefined' && settings.bookmark) {
					$tag.attr('data-bookmark',val.seq);
				}

	            if(val.type == 'gallery') {
	                $tag.attr('data-category',category_onoff);
	                if(category_onoff == 'ON') {
	                	loadGalleryCategoryBlock($tag,val.seq,settings);

                		$tag.find('.empty-txt').remove();
                		$tag.find('.container:not(.fh-container),[data-loop="true"]').removeClass('empty');
	                	if(gallery_empty) {
							var gallery_empty_str = '<div class="col-xs-12 col-sm-12 col-md grid empty-txt">' + $.lang[LANG]['editor.gallery.category.empty.list'] + '</div>';

							if(val.feature=='masonry') {
								$tag.find('.container:not(.fh-container)').removeAttr('style').addClass('empty').append(gallery_empty_str);
							} else {
								$tag.find('[data-loop="true"]').addClass('empty').empty().append(gallery_empty_str);
							}
							$tag.find('.gallery-loadmore').remove();

	                		// if(!is_gc_cookie) $tag.find('.gallery-category-nav').addClass('empty');
	                		// else $tag.find('[data-loop="true"]').addClass('empty').append(gallery_empty_str);
	                	}
	                }

	                var img_onoff = (typeof settings.img_original_display != 'undefined' && settings.img_original_display) ? settings.img_original_display : 'OFF',
		                title_onoff = (typeof settings.gframe_title_visible != 'undefined' && settings.gframe_title_visible == 'OFF') ? false : true;
	                $tag.find('[data-gallery]').attr({'data-img-original':img_onoff, 'data-gallery-title':title_onoff});
	                if(!title_onoff) $tag.find('[data-gallery]').attr('data-title','');
	                
					if(typeof val.price_hidden != 'undefined' && val.price_hidden == 'ON') {
						$tag.find('.figure.price').html('');
					}
					
					if($tag.find('.goption[data-gcol]').length > 0) {
						var gOption = $tag.find('.goption[data-gcol]'),
							gcol = gOption.attr('data-gcol'),
							gcol_t = gOption.attr('data-gcol-t'),
							gcol_m = gOption.attr('data-gcol-m');

						if(typeof gcol_t == 'undefined') { gOption.attr('data-gcol-t',gcol); gcol_t = gcol; }
						if(typeof gcol_m == 'undefined') { gOption.attr('data-gcol-m',gcol_t); }
					}
					
					refreshGalleryField($tag,settings);

					// gallery option - gh
					if($tag.find('.goption[data-gh]').length > 0) refreshGalleryHeight(val.elname);
	            }
	            if(val.seq == 'all_products') {
	            	loadAllproductSort($tag, settings, val.total.list_total);
	            	if(gallery_empty) {
	                    var gallery_empty_str = '<div class="col-xs-12 col-sm-12 col-md grid empty-txt">'+$.lang[LANG]['editor.gallery.product.empty.list']+'</div>';
	                    
	                    $tag.find('[data-loop="true"]').addClass('empty').empty().append(gallery_empty_str);
	                    $tag.find('.gallery-loadmore').remove();
	                }
				}
				
	            if(val.type == 'forum') {
	            	var view = $tag.find('[data-loop="true"]').attr('data-view');
	                if(typeof view == 'undefined') view = 10;
	                if(typeof $.cookie('forum_' + val.seq) != 'undefined' && $.cookie('forum_' + val.seq)) {
	                	$.forum.init(val.seq,b.PAGE,view,$.cookie('forum_' + val.seq),$.cookie('forum_'+ val.seq +'_sfl'),$.cookie('forum_'+ val.seq +'_stx'),$.cookie('forum_'+ val.seq +'_scate'));
	                } else 
	                	$.forum.init(val.seq,b.PAGE,view);
	                	
	                $.removeCookie('forum', { path : '/' });
	                $.removeCookie('forum_'+val.seq, { path : '/' });
	                $.removeCookie('forum_'+val.seq+'_sfl', { path : '/' });
	                $.removeCookie('forum_'+val.seq+'_stx', { path : '/' });
	                $.removeCookie('forum_'+val.seq+'_scate', { path : '/' });
				}

				var checkVideoTag = (val.type == 'video' || $tag.find('video').length > 0) ? true : false;
				if(checkVideoTag) {
					if (navigator.userAgent.match(/(safari)/gi) !== null) {
						$tag.find('video').each(function() {
							//safari...
							$(this).attr('webkit-playsinline',1);
							$(this).attr('playsinline',1);
						});
					}

					if (navigator.userAgent.match(/(iPod|iPhone|iPad)/gi) !== null) {
						$tag.find('video').each(function() {
							$(this).removeAttr('muted');
							$(this).removeAttr('loop');
							$(this).removeAttr('autoplay');
							$(this).removeAttr('preload');
						});
					}
				}

				if(val.type == 'latest') {
					var latest_data = (typeof settings.latest_data != 'undefined' && settings.latest_data) ? settings.latest_data : {};
					$.latest.init(val.seq, latest_data);
					$tag.removeClass('preloading');
				}

				if(b.VIEW) {
					var img_onoff = (typeof settings.img_original_display != 'undefined' && settings.img_original_display) ? settings.img_original_display : 'OFF';
					$tag.find('img[data-attach="true"]').attr('data-img-original',img_onoff);

					var c_g_p = (typeof $.cookie('gallery-page-' + b.PARENT.pid) != 'undefined') ? $.cookie('gallery-page-' + b.PARENT.pid) : 1;
			    	$.cookie('gallery',b.PARENT.pid, { path: '/', expires: 12 * 60 * 60 * 1000 });
			    	$.cookie('loadmore-' + b.PARENT.pid, c_g_p, { path: '/', expires: 12 * 60 * 60 * 1000 });

			    	if(typeof $.cookie('gallery-page-all_products') !== 'undefined' && $.cookie('gallery-page-all_products')) {
			    		c_g_p = (typeof $.cookie('gallery-page-all_products') != 'undefined') ? $.cookie('gallery-page-' + b.PARENT.pid) : 1;
						$.cookie('gallery','all_products', { path: '/', expires: 12 * 60 * 60 * 1000 });
			    		$.cookie('loadmore-all_products', c_g_p, { path: '/', expires: 12 * 60 * 60 * 1000 });
					}
	            }

				$tag.find('[data-map="true"]:not(iframe)').each(function() {
					var map_url = $(this).attr('data-url');
					if(typeof map_url != 'undefined' && map_url) {
						var map_iframe = getMapURL(map_url,'html');
						$(this).replaceWith(map_iframe);
						if(map_iframe.indexOf('google-map disabled') === -1) $(this).next('.map-undefined').remove();
					}
				});

				if($tag.find('[data-map_kind="kakao"]').length && (typeof kakao == 'undefined' || typeof kakao.maps == 'undefined' || kakao.maps == null || property.VALIDPLAN == '')) {
	                $tag.find('[data-map_kind="kakao"]').html('지도연결해제됨. Javascript키 확인');
	                $tag.find('[data-map_kind="kakao"]').html('<iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5659473821083!2d127.0282496015659!3d37.494568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1598c361b2b%3A0xdbf9af292beff3c!2z6rCV64Ko!5e0!3m2!1sko!2skr!4v1637303748377!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>');
	            } else {
					$tag.find('[data-map_kind="kakao"]').each(function() {
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
	                            'handle' : '<div>dfafasdfas</div>',
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
		                    // var infowindow = new kakao.maps.InfoWindow({
		                    //     position: marker.getPosition(),
		                    //     content : iwContent
		                    // });
		                    // infowindow.open(c_map, marker);
	                        if(iwContent) {
	                            iwContent = '<div class="contact-map-info-window"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8 0C4.69 0 2 2.69 2 6s1 4 6 10c5-6 6-6.69 6-10s-2.69-6-6-6zm0 8.3a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z"></path></svg>' + iwContent + '</div>';
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

	            if($tag.find('[data-map_kind="naver"]').length && (typeof naver == 'undefined' || typeof naver.maps == 'undefined' || naver.maps == null || property.VALIDPLAN == '')) {
	                $tag.find('[data-map_kind="naver"]').html('지도연결해제됨. Client ID 확인');
	                $tag.find('[data-map_kind="naver"]').html('<iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5659473821083!2d127.0282496015659!3d37.494568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1598c361b2b%3A0xdbf9af292beff3c!2z6rCV64Ko!5e0!3m2!1sko!2skr!4v1637303748377!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>');
	            } else {
					$tag.find('[data-map_kind="naver"]').each(function() {
						var container = this;
						var lat = $(this).data("lat");
						var lng = $(this).data("lng");
						var options = { center: new naver.maps.LatLng(lat, lng), zoom: 17};
						var c_map = new naver.maps.Map(container, options);
						var marker = new naver.maps.Marker({ position: new naver.maps.LatLng(lat, lng), map: c_map});
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
		                	// options.zoomControl = true;
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
	                            'handle' : '<div>dfafasdfas</div>',
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
	                            iwContent = '<div class="contact-map-info-window"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8 0C4.69 0 2 2.69 2 6s1 4 6 10c5-6 6-6.69 6-10s-2.69-6-6-6zm0 8.3a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z"></path></svg>' + iwContent + '</div>';
	                            var infoWindow = $(iwContent);
	                            $(container).append(infoWindow);
	                            // infoWindow.css('bottom', 'calc(-100% + ' + (infoWindow.outerHeight() + 36) + 'px)');  
	                        }
		                    // var infowindow = new naver.maps.InfoWindow({
		                    //     content : iwContent
		                    // });
		                    // infowindow.open(c_map, marker);
		                }
						$(window).on("resize", function() {
							c_map.setCenter(marker.getPosition());
						});
					});
				}

	            if(val.type == 'form') {
	            	if(!b.VALIDPLAN) {
	            		$tag.find("[form-type='file.upload'] label").on("click", function(e) {
	            			e.preventDefault();
	            			alert($.lang[LANG]['form.file.upload.disabled']);
	            		});
	            	}

                    if($("head").find("script[id='forms_js']").length == 0) {
                        $("head").append("<script id='forms_js' src='/js/module/forms.js'></script>");
                    } else {
                    	$.forms.init();
                    }
	            }

	            //video block ::: gallery
		        if(val.type == 'video') {
		            if($tag.find('.video-gallery-url').length>0) {                                                  //재생방식 : 확대보기 
		                $.each($tag.find('.item'),function(i,v){
		                    if(val.mode=='zoom') appendGalleryFrame($(this).parents('.element'),val.seq,'',val.type);
		                });
		            }
		        }

	            // log 
	            if(typeof settings['google_track'] != 'undefined') {
            		$('.dsgn-body').append("<script type='text/javascript' src='//www.googleadservices.com/pagead/conversion_async.js'></script>");
	            }

		        $('.dsgn-body').fitVids();
		        $('.carousel').carousel({
		        	pause: 'none'
		        });

				changeBrokenImages($tag);

	            //add script
	            if(val.eljs){
	                var js_string = val.eljs;
	                var $script_tag = $('<script type="text/javascript" id="js_' + idx + '"></script>');
	                $script_tag.html(js_string);
	                $('.dsgn-body').append($script_tag);
	            }

	            //add style
	            var jcss = CSSJSON.toJSON(val.elcss),
	            	elpd = style.getPadding(jcss,val.elname);

            	var elFonts = $tag.css('font-family');
        		elFonts = elFonts + ',"Nanum Gothic"';
        		elFonts = elFonts.replace(/"/g, '\'');
        		$tag.css('font-family',elFonts);

	            var pt = parseInt(elpd.top),
	                pb = parseInt(elpd.bottom);
	                
	            if(pt>0||pb>0){
	                default_t_css = default_t_css + '\n 	.'+val.elname + '{';
	                if(Math.ceil(pt*0.8)>0)
	                default_t_css = default_t_css + 'padding-top: '+Math.ceil(pt*0.8) + 'px!important;';
	                if(Math.ceil(pb*0.8)>0)
	                default_t_css = default_t_css + 'padding-bottom: '+Math.ceil(pb*0.8) + 'px!important;';
	                default_t_css = default_t_css + '}';

	                default_m_css = default_m_css + '\n 	.'+val.elname + '{';
	                if(Math.ceil(pt*0.5)>0)
	                default_m_css = default_m_css + 'padding-top: '+Math.ceil(pt*0.5) + 'px!important;';
	                if(Math.ceil(pb*0.5)>0)
	                default_m_css = default_m_css + 'padding-bottom: '+Math.ceil(pb*0.5) + 'px!important;';
	                default_m_css = default_m_css + '}';
	            }
	            if(idx == data.length-1){
	                var css = '@media only screen and (max-width:767px) {' + default_t_css + '\n}\n';
	               	css = css + '@media only screen and (max-width:480px) {' + default_m_css + '\n}';

                    if($('#el-paddingcss').length == 0) $('.dsgn-body').find('#el_'+(data.length-1)+'css').after('<style id="el-paddingcss">'+css+'</style>');
                    else $('#el-paddingcss').append(css);
	            }

	            if($tag.hasClass('error_404')==false) {
					if($tag.hasClass('el-footer')==false) {
						if($tag.hasClass('cl-s-product-detail')==false) {
	            			aosAddblock(site_settings,settings,$tag);
	            		}
	            	}
	            }
	            
	        });

	        if(b.VIEW) {
		        // prev next
		        $('.data-page-prev').addClass('active');
				$('.data-page-next').addClass('active');

		        if(b.PARENT.prev === null) $('.data-page-prev').removeClass('active');
				if(b.PARENT.next === null) $('.data-page-next').removeClass('active');
	        }

            var isPage = false;
            $.each(b.MENULIST, function(i,k) {
                isPage = (k.toUpperCase() == b.PAGE.toUpperCase()) ? true : isPage;
            });
           
            // if(!b.ONE && !b.VIEW && !isPage) location.replace(URL);
            
			// menu ver3 : fheader
			if($('header.navbar').hasClass('navbar-fheader')) $.fheader.position();

			// shopping wrap remove
			if($('.shopping-wrap').length || $('.shopping-more-wrap').length) {
				$('.shopping-wrap').remove();
				$('.shopping-more-wrap').remove();
			}

			// shopping wrap create
			if(!$('.dsgn-body').hasClass('mode-config') && $('.cl-s-product-detail').length > 0 && $('div[data-el*="el_"]').length > 1) {
				if(shopping_more == 'ON') {
					var prod_content = $('div[data-el*="el_"]').not('.cl-s-product-detail').addClass('hide');
					$last_el.before('<div class="shopping-wrap open"></div>');
					$('.shopping-wrap').html(prod_content);
					$('div[data-el*="el_"]').each(function(idx, v) {
						$(this).removeClass('hide');
						if($('.shopping-wrap').height() > 800) return false;
					});
				}
			}

	        $('.el-footer').show();

	        if($('.element[data-layout]').length > 0) {
                setLayoutHeight();
            }

	        parallax();
			deferred.resolve();

		    return deferred.promise();
		}

		var elPush = function (prop) {
		    /* prop - reorder list hide */
		    var pageID = b.PAGE.split(','),
		        chgBG = false,
		        tmpTag = '',
		        currentPAGE = '',
		        default_t_css = '', default_m_css = '';

			// currentPAGE = (property.COUNT==0 && pageID[1] && pageID[0]!='forum') ? 'index,template' : b.PAGE;
			currentPAGE = b.PAGE;
			param = (currentPAGE=='index,template' && param.indexOf('/org/') == -1) ? param + '/org/' + b.PAGE : param;

			/*
			var page_reset = false;
			$.each(b.SMENU, function(i,o) {
				if(currentPAGE.indexOf(',') > -1) return false;
				if(i == 0 && o.name == 'INTRO') o.link = '';
				
				if(page_reset) {
					if( o.display == 'on' && o.link == '') {
						currentPAGE = o.name.replace(/ /g, '-');
						return false;
					} else {
						$.each(o.children, function(o_c_i, o_c_o) {
							if(o_c_o.display == 'on' && o_c_o.link == '') {
								currentPAGE = o_c_o.name.replace(/ /g, '-');					
								return false;
							}
						});
					}
				} else {
					if(currentPAGE == o.name.replace(/ /g,'-')) {
						if( o.display == 'off') {
							page_reset = true;
						} else if( o.link != '') {
							if(o.link == 'folder-menu') {
								$.each(o.children, function(o_c_i, o_c_o) {
									if(o_c_o.display == 'on' && o_c_o.link == '') {
										currentPAGE = o_c_o.name.replace(/ /g, '-');
										return false;
									}
								});
							} else {
								page_reset = true;
							}
						} else {
							return false;
						}
					} else {
						$.each(o.children, function(o_c_i, o_c_o) {
							if(currentPAGE == o_c_o.name.replace(/ /g,'-')) {
								if(o.display == 'on' && o_c_o.link == '') return false;
							}
						})
						page_reset = true;
					}
				}
			});
			*/
			
			// thumb forum view not working (cs_sid__youspeak) - 20210524 hyeran
	        // if(pageID[0] == 'forum' && b.VIEW && property.COUNT == 0 ) {
	        if(pageID[0] == 'forum' && b.VIEW) {
		    	clearDsgnbody();
		    	var ps_fmview = $.forum.view(b.VIEW);
		    	ps_fmview.then(function() {
		    		_this.displayComment(b.VIEW);
		    		$('.el-footer').show();
			    	$('.dsgn-body').animate({scrollTop: 0}, 0,'easeInOutQuart'); 
		    	});
			    return false;
	        }
	        // if (currentPAGE.indexOf('전체상품') !== -1) {
	        // 	location.href = currentPAGE;
	        // 	return false;
	        // }
	        // console.log(b.pageContent.hasOwnProperty(currentPAGE));
	        // console.log(b.pageContent);
	        if(b.pageContent.hasOwnProperty(currentPAGE)) {
	        	var loadingContents = loadPush(b.pageContent[currentPAGE]);
	        } else {
	        	param = (b.PUBLISH) ? param : '/render/true';
				$.ajax({
	                url: '/template/contents/sid/' + b.SID + '/page/' + encodeURIComponent(currentPAGE) + param,
			        dataType: 'json',
	                type: 'GET',
	                async: false,
	                success: function(data) {
				    	if(typeof data.error != 'undefined' || data.error) {
				    		if(currentPAGE!='index,template') {
					    		alert($.lang[LANG]['page.not.found']);
					    		location.replace('/');
				    		}
				    	}

				    	if(currentPAGE!='index,template') b.pageContent[currentPAGE] = data;
				    	var loadingContents = loadPush(data);
	                }
				});
	        }
		}

		var scrollspy = function() {
		    if(!b.ONE) return false;
		    var top = 0,
		        active = '';

		    // top = ($('.dsgn-body').hasClass('sidebar')) ? 0 : $('.el-menu header').outerHeight();

		    $.each(b.MENULINK,function(i,v) {

		        var $el = ($.inArray(v,property.MENULIST) > -1) ? $('.link-to-'+v) : '';
		        if($el.length>0) {
		            var offset = $el.offset();
		           top = ($('.dsgn-body').hasClass('sidebar')) ? 0 : $('.el-menu header').outerHeight();
		            if((Math.floor(offset.top) - $(document).scrollTop())<= top) {		            	
		            	active = v;
		            }
		        }

		    });

			if(!$('#tpl-menu li a[href="#'+active+'"]').parent().hasClass('active')) {
				$('#tpl-menu li').removeClass('active').removeClass('open');
				
				$('#tpl-menu li a[href="#'+active+'"]').parent().addClass('active');
				if( $('#tpl-menu li a[href="#'+active+'"]').closest('.dropdown-menu').length>0 ) {
					if($('body').width() > 768) $('#tpl-menu li a[href="#'+active+'"]').closest('.dropdown').addClass('active');
					else $('#tpl-menu li a[href="#'+active+'"]').closest('.dropdown').addClass('open');
				}
			}

		    if($(document).scrollTop() + $('body').height() == $('body').prop('scrollHeight')) {
		        var last = b.MENULINK[b.MENULINK.length-1],
		            $el = ($.inArray(last,property.MENULIST) > -1) ? $('.link-to-'+last) : '';

		        if($el.length>0) {
		            if($el.offset().top>top) {
		                $('#tpl-menu li').removeClass('active').removeClass('open');
		                
		                if($(document).scrollTop()!=0) 
		                	$('#tpl-menu li a[href="#'+last+'"]').parent().addClass('active');

						if($('#tpl-menu li a[href="#'+last+'"]').closest('.dropdown-menu').length>0) {
							if($('body').width() > 768) $('#tpl-menu li a[href="#'+last+'"]').closest('.dropdown').addClass('active');
							else $('#tpl-menu li a[href="#'+last+'"]').closest('.dropdown').addClass('open');
						}
		            }
		        }
		    }

		}

		var fixedMenu = function() {
			if($('header.navbar').hasClass('navbar-fheader')) { // menu ver3 : fheader 

				if($(document).scrollTop() > $('header.navbar').height()) {
					if(window.innerWidth > 768) {
						$('.menu-logo-top').hide();
						// $('.menu-logo-top').slideUp('fast');
						$('.el-menu').addClass('fixed-fheader');
					}					
					if(b.HEADER) $('header.navbar').removeClass('transparent');
				} else if($(document).scrollTop() < $('header.navbar').height()) {
					$('.el-menu').removeClass('fixed-fheader');
					$('.menu-logo-top').show();
					// $('.menu-logo-top').slideDown('fast');
					if(b.HEADER) {
						$('header.navbar').addClass('transparent');
						$('.dsgn-body').removeAttr('style');
					}
				}

				return false;
			}

		    header_fixed = $('.header.el-menu').height();
		    var user_menu = $('.el-menu'),
				menu_color = $('header.navbar').css('background-color'),
				menu_bg_img = (typeof $('header.navbar').css('background-image') != 'undefined') ? $('header.navbar').css('background-image') : 'none',
				menu_bg_position = (typeof $('header.navbar').css('background-position') != 'undefined') ? $('header.navbar').css('background-position') : 'center center',
				menu_bg_repeat = (typeof $('header.navbar').css('background-repeat') != 'undefined') ? $('header.navbar').css('background-repeat') : 'no-repeat',
				menu_bg_size = (typeof $('header.navbar').css('background-size') != 'undefined') ? $('header.navbar').css('background-size') : 'cover';

		    if($(document).scrollTop() > header_fixed && user_menu.hasClass('fixed')==false && !$('.dsgn-body').hasClass('sidebar')) {
		        user_menu.fadeOut('fast', function() {
		            $(this).addClass('fixed').fadeIn('fast');
		            $('.fixed').addClass('fixed-position');
		            if(!b.HEADER || $('header.navbar').hasClass('sidebar') ) {
	                	var topval = ($('.creatorlink-header').length==1) ? '55px' : '0';
		            	$('.el_0').css('margin-top',topval);
		                var $header_empty = $('<div class="header-empty"></div>');
		                if($(".header-empty").length==0) {
		                	var topval = ($('.creatorlink-header').length==1) ? '55px' : '0';
			                $header_empty.css({
			                    'background-color' : $('header.navbar').css('background-color'),
								'background-image' : menu_bg_img,
								'background-position' : menu_bg_position,
								'background-repeat' : menu_bg_repeat,
								'background-size' : menu_bg_size,
			                    //'position' : 'relative',
			                    'width' : '100%',
			                    'height' : header_fixed+'px',
			                    'top' : topval,
			                    'z-index' : '1'
			                });
			                $('.dsgn-body').prepend($header_empty);
			            }
       		        	$(".header-empty").css('position','relative');
		            } else {
		            	$('header.navbar').removeClass('transparent');
		            }
		            if(window.innerWidth > 768) $('.menu-logo-top').hide();
		        });        
		    } else if($(document).scrollTop() < header_fixed && user_menu.hasClass('fixed') && !$('.dsgn-body').hasClass('sidebar')){
		        user_menu.fadeOut('fast', function(){
			        $('.header-empty').css('position','absolute');
		            $('.fixed').addClass('fixed-position');
		            user_menu.removeClass('fixed').fadeIn('fast');
		            if(!b.HEADER  || $('header.navbar').hasClass('sidebar') ) {
		            	$('.el_0').css('top','0');
		            } else {
		            	$('header.navbar').addClass('transparent');
		            	if($('.creatorlink-header').length == 1) $('div.header.fixed-position').addClass('top-zero');
		            }
		            $('.menu-logo-top').show();
		        });
		    }
		}


		var elFooter = function() {
			if($('.el-footer').length > 0) {
				setTimeout(function() { $('.el-footer').show(); }, 300);
				return false;
			}
			
			if(b.FTAG == '') b.FTAG = '<div class="footer-' + b.SID + '"></div>';
		    $footer = $(b.FTAG);
		    $footer.find('.link-site-home').prop('href',URL); 
		    $footer.addClass('element')
		           .addClass('el-footer')
		           .addClass('hide')
		           .attr('data-type','footer')
		           .attr('data-el','el-footer')
		           .attr('data-id','footer')
		           .attr('data-name','footer-' + b.SID);

		    $footer.appendTo($('.dsgn-body'));
		    $('.dsgn-body').prepend('<style id="el-footercss">' + b.FCSS + '</style>');

			/*180822 add*/
			// before v1 creatorlink-box remove
			if($('.el-footer').find('.creatorlink-box').length > 0 ) {
				if($('.el-footer').find('.creatorlink-box').prev().hasClass('col-md-10')) $('.el-footer').find('.creatorlink-box').prev().removeClass('col-md-10').addClass('col-md-12');
				$('.el-footer').find('.creatorlink-box').remove();
			}
			// before v2 creatorlink-footer remove
			if( $('.el-footer').find('.creatorlink-footer').length > 0) {
				$('.el-footer').find('.creatorlink-footer').remove();
			}

			// made it with Creatorlink
			if(!b.VALIDPLAN || b.VALIDTYPE == 'PK' || b.VALIDTYPE == 'FR') {
				var is_templates = checkTemplateSite(b.SID);
				if(!is_templates) {
					$('.goto-top').addClass('moved');
					setMadeWithCreatorlink();
				}	
			}

			setCLEscrowFooter(b.SID, b.VALIDTYPE, b.SETTINGS.sm_escrow);

		 	var isfooterAttach = typeof $footer.attr('data-flogo') == 'undefined' ? false : $footer.attr('data-flogo');
	    	if(isfooterAttach) {
				if(b.ONE){
					if(b.VIEW) $footer.find('#site-home-footer').attr('href',URL).removeClass('mini-home');
					else $footer.find('#site-home-footer').attr('href','javascript:;').addClass('mini-home');
				} else $footer.find('#site-home-footer').attr('href',URL).removeClass('mini-home');
			}

	    	/*var block_display = (typeof b.SETTINGS.block_display != 'undefined' && b.SETTINGS.block_display) ? b.SETTINGS.block_display : {},
        		footer_display = (typeof block_display.footer_display != 'undefined' && block_display.footer_display) ? block_display.footer_display : 'ON';

			if(footer_display=='OFF') $('.footer-'+b.SID+'.el-footer').hide();*/

			/*180822  delete - powered by Creatorlink
			// before creatorlink-box remove
			if($('.el-footer').find('.creatorlink-box').length > 0 ) { 
				if($('.el-footer').find('.creatorlink-box').prev().hasClass('col-md-10')) $('.el-footer').find('.creatorlink-box').prev().removeClass('col-md-10').addClass('col-md-12');
				$('.el-footer').find('.creatorlink-box').remove();
			}

			if($('.el-footer').find('*[data-edit="true"]').first().closest('.row').children('div').length == 1 &&
				$('.el-footer').find('*[data-edit="true"]').first().closest('.row').children('div').hasClass('col-md-10') ) {
				$('.el-footer').find('*[data-edit="true"]').first().closest('.row').children('div').removeClass('col-md-10').addClass('col-md-12');
			}

			if(typeof b.VALIDPLAN != 'undefined' && b.VALIDPLAN && b.VALIDTYPE != 'PK') {
				if( $('.el-footer').find('.creatorlink-footer').length > 0 ) $('.el-footer').find('.creatorlink-footer').remove();
			} else {
				var el_f_style = $('.el-footer').attr('style');
				if(typeof el_f_style != 'undefined' && 
					(el_f_style.indexOf('display') > -1 || el_f_style.indexOf('opacity') > -1 || el_f_style.indexOf('z-index') > -1) ) $('.el-footer').removeAttr('style');
				if($('.el-footer').css('display') == 'none') $('.el-footer').css('display','block');
				if($('.el-footer').css('opacity') < 1) $('.el-footer').css('opacity',1);
				if($('.el-footer').css('z-index') != 'auto') $('.el-footer').css('opacity','auto');

				if( $('.el-footer').find('.creatorlink-footer').length == 0) setFooterCretorlinkBox();
				setFooterLink();
			}
			*/

			changeBrokenImages($footer);

		    if(!b.FTAG || b.FOOTER) {
		        // $footer.hide();
		    } else {
		    	if(b.VIEW && b.PARENT.mode == 'shopping' && $(document).width() < 768) {
		    		$('.el-footer').css('margin-bottom','55px');
		    	}

		    	var block_display = (typeof b.SETTINGS.block_display != 'undefined' && b.SETTINGS.block_display) ? b.SETTINGS.block_display : {},
		        	footer_display = (typeof block_display.footer_display != 'undefined' && block_display.footer_display) ? block_display.footer_display : 'ON';

	        	if(footer_display!='OFF') {
			    	setTimeout(function() {
			    		$footer.removeClass('hide');
			    	},300);
			    }
		    }
		}

		var reloadMasonry = function(container,items) {
			$('.gallery-loading-status').remove();

			if(container.find('[data-loop="true"]').length > 0) container.find('[data-loop="true"]').append(items).closest('.container').masonry();
			else container.masonry().append(items);
		    container.masonry('appended',items).masonry();
		}		

		function setDefaultValue(value) {
			return (typeof value == 'undefined') ? '' : value;
		}

		function setDefaultValueEtc(type, el) {
			type = (typeof el.attr('data-contact-etc-type') != 'undefined' && el.attr('data-contact-etc-type') ) ? el.attr('data-contact-etc-type') : type;
            
            var input_type = ['text','email','number','tel','url'];
            if($.inArray(type,input_type)) {
				return (typeof el.val() == 'undefined') ? '' : el.val();
			} else if(type == 'checkbox') {
				return ( el.prop('checked') ) ? 'O' : 'X';
			} else if(type == "radio") {
				return el.find('input:radio:checked').val();
			} else if(type == 'selectbox') {
				var result = (el.find('option').length > 0 ) ? el.find('option:checked').val() : el.find('.active').find('.opval').text();
				return result;
			} else {
				return 'etc article';
			}
		}

		function setDefaultForm(el) {
			var ch_lang = getLang($(el + ' [form-idx]'), b.SID);
			
			$(el + ' [form-idx]').val('');
			$(el + ' [form-idx]').find('.form-date').val('');
			$(el).find('input:checkbox').removeAttr('checked');
			$(el).find('input:radio').removeAttr('checked');
			$(el + ' [form-type="file.upload"]').find('input[type="file"]').val('');
            $(el + ' [form-type="file.upload"]').find('input[type="text"]').val('');
            $(el + ' [form-type="file.upload"]').find('.file-title').text($.lang[ch_lang]['form.file.nofile']);
		}

		function setDefaultContactForm(el) {
			$(el + ' [data-contact-firstname]').val('');
			$(el + ' [data-contact-lastname]').val('');
			$(el + ' [data-contact-email]').val('');
			$(el + ' [data-contact-website]').val('');
			$(el + ' [data-contact-phone]').val('');
			$(el + ' [data-contact-subject]').val('');
			$(el + ' [data-contact-message]').val('');
			$(el).find('input:checkbox').removeAttr('checked');
			$(el).find('input:radio').removeAttr('checked');
			$(el + ' [form-type="file.upload"]').find('input[type="file"]').val('');
            $(el + ' [form-type="file.upload"]').find('input[type="text"]').val('');
            $(el + ' [form-type="file.upload"]').find('.file-title').text("첨부된 파일이 없습니다.");
		}

		function setDefaultContactFormEtc(el) {
			$(el).find('[data-contact-etc]').each(function(i) {
				var type = (typeof $(this).attr('data-contact-etc-type') != 'undefined' && $(this).attr('data-contact-etc-type') ) ? $(this).attr('data-contact-etc-type') : $(this).attr('type');
				
				var input_type = ['text','email','number','tel','url'];
				if($.inArray(type,input_type)) {
					$(this).val('');
				} else if(type == "checkbox") {
					$(this).removeAttr('checked');
				} else if(type == "radio") {
					$(this).find('input:radio').first().click();
				} else if(type == "selectbox") {
					if($(this).find('option').length > 0) {
						$(this).find('option:first').attr('selected','selected');
					} else {
						$(this).find('.active').removeClass('active');
						$(this).find('li').first().addClass('active');
					}
				}
			});
		}

		var ieLineClamp = function() {
		    if(isIE()) {
		        $('[data-ie-clamp]').each(function(index, element) {
		            var clamp = $(this).attr('data-ie-clamp').split(','),
		                line = new Array();

		            $.each(clamp,function(k,v) {
		                line.push(v);
		            });

		            for(i=line.length; i<3; i++) line[i] = 0;
		            var idx = getScreenIndex();
		            var apply = line[idx];

		            // console.log($(element).text());
		            //safeClamp(element, apply);
		            $clamp(element, {clamp:apply, useNativeClamp:false });
		        });
		    }
		}

		var safeClamp = function (selector, lines) {
			lines = lines || 3; // a default
			$(selector).each( function() {
				if($(this).text()) {
					$clamp( this, { clamp: lines, useNativeClamp:false  });
				}
			});
		}

		$('.data-page-back').live({
		    click : function() {
				var pPage = b.PARENT.page,
					inMenu = ($.inArray(pPage,b.MENULIST) == -1) ? false : true;

				if(!inMenu) {
					$(this).showModalFlat('INFORMATION','이동할 수 없습니다',true,false,'','ok');
					return false;
				} else {
					var c_g_p = (typeof $.cookie('gallery-page-' + b.PARENT.pid) != 'undefined') ? $.cookie('gallery-page-' + b.PARENT.pid) : 1;
			    	$.cookie('gallery',b.PARENT.pid, { path: '/', expires: 12 * 60 * 60 * 1000 });
			    	$.cookie('loadmore-' + b.PARENT.pid, c_g_p, { path: '/', expires: 12 * 60 * 60 * 1000 });
			    	
			    	var url_replace = (b.URL == '/') ? '' : b.URL;
			    	if(b.ONE) {
			    		_this.history.pushState(null,b.TITLE,url_replace + '/index#' + b.PARENT.page);
			    	} else {
			    		var page = b.PAGE.split(',');
			    		if(page[1]=='template') {
				    		_this.history.pushState(null,b.TITLE,url_replace + '/' + page[0]);
			    		} else {
				    		_this.history.pushState(null,b.TITLE,url_replace + '/' + b.PARENT.page);
			    		}		    		
			    	}
			    }
		    }
		});

	    $('#config-mode-view').click(function() {
	    	location.href = '//' + b.HOST + b.REFERER;
	    });


		$('body').on('click','.mini-home, #goto-top, .quick-menu-top', function(event) { 
			event.preventDefault(); 
			$('body,html').animate({scrollTop: 0}, 900,'easeInOutQuart'); 
		});
		$('body').on('click','.quick-menu-bottom', function(event) { 
			event.preventDefault(); 
			$('body,html').animate({scrollTop: document.body.scrollHeight}, 900,'easeInOutQuart'); 
		});

		$('.data-page-prev').live({
		    click : function(e) {
		    	if(!$(this).hasClass('active') || b.PARENT.prev === null) return false;
		    	if(typeof b.PARENT.page == 'string' && $.inArray(b.PARENT.page,b.MENULIST) == -1) return false;
		        var page = b.PAGE.split(',');
		    	var url_replace = (b.URL == '/') ? '' : b.URL;
		    	if(b.PARENT.prev)
		    		_this.history.pushState(null,b.TITLE,url_replace + '/' + page[0] + '/view/' + b.PARENT.prev);
		    }
		});

		$('.data-page-next').live({
		    click : function() {
		    	if(!$(this).hasClass('active') || b.PARENT.next === null) return false;
		    	if(typeof b.PARENT.page == 'string' && $.inArray(b.PARENT.page,b.MENULIST) == -1) return false;
		        var page = b.PAGE.split(',');
		    	var url_replace = (b.URL == '/') ? '' : b.URL;
		    	if(b.PARENT.next)
		    		_this.history.pushState(null,b.TITLE,url_replace + '/' + page[0] + '/view/' + b.PARENT.next);
		    }
		});



		//menu click
		$('#tpl-menu.nav > li:not(.siteUM,.siteLANG) a:not([href="javascript:;"]):not([href*="flink@"]), .el-menu header.navbar a#site-home').live({
		    click : function(e) {
		    	e.preventDefault();
				if(typeof e.target.className == 'string' && e.target.className.indexOf('fa') > -1 && $(this).closest('header').hasClass('navbar-simple')) { 
					return false; 
				}
				if(typeof $(this).attr('data-toggle') != 'undefined') { return false; }

				$.each($.cookie(), function(i,v) {
					if(i.indexOf('gallery-category-') > -1) {
						var gallery_seq = i.replace('gallery-category-','');
							gcate_home = (typeof $.cookie('gallery-catehome-'+gallery_seq) == 'undefined') ? '' : $.cookie('gallery-catehome-'+gallery_seq);
						$.cookie(i, gcate_home, { path : '/', expires: 12 * 60 * 60 * 1000 });
					}
					if(i.indexOf('gallery-page-') > -1) $.cookie(i, 1, { path : '/', expires: 12 * 60 * 60 * 1000 });
					if(i.indexOf('loadmore-') > -1) $.cookie(i, 1, { path : '/', expires: 0 });
				});

				$.removeCookie('gallery', { path: '/' });
				$.removeCookie('gallery-item', { path : '/' });
				$.removeCookie('forum', { path : '/' });
				$.removeCookie('forum-item', { path : '/' });

				var isClickSiteHome = (typeof $(this).attr('id') != 'undefined' && $(this).attr('id') == 'site-home') ? true : false;

				if($('body').width() < 769)  {
					var menuVer03 = ($('.el-menu > header').hasClass('navbar-fheader')) ? true : false,
						menuVer02 = (!menuVer03 && $('.el-menu > header').hasClass('navbar-simple')) ? true : false,
						menuVer01 = (!menuVer03 && !menuVer02) ? true : false;

					var clickNavbarToggle = ( (menuVer03 && $('.navbar-toggle').css('visibility') == 'hidden') && !isClickSiteHome ||
											  (menuVer02 && !isClickSiteHome) ||
											  menuVer01
											) ? true : false;
					if(clickNavbarToggle) $('.navbar-toggle').click();
				}

				if(!isClickSiteHome) {
					if($(this).hasClass('loginout')) {
						if(b.URL == '/render') {
							$(this).showModalFlat('INFORMATION','미리보기에서는 제공되지 않습니다.',true,false,'','ok');
							return false;
						}
						$('#loginModal').modal('show');
						$('#loginModal').css('z-index',1042);
						$('.modal-backdrop.fade.in').css('z-index', 1041);
					} else {
						$('#tpl-menu li').removeClass('active').removeClass('open');
						

						$(this).parent().addClass('active');
						if($(this).closest('.dropdown-menu').length>0) {
							if($('body').width() > 768) {
								$(this).closest('.dropdown').addClass('active').siblings().removeClass('active');
							} else {
								if(menuVer03) {
									$(this).closest('.menu-has-children').addClass('open').siblings().removeClass('open');
									$('#tpl-menu .menu-has-children:not(.open) ul.dropdown-menu').hide();
								} else {
									$(this).closest('.dropdown').addClass('open').siblings().removeClass('open');
									$('#tpl-menu .dropdown:not(.open) ul.dropdown-menu').hide();
								}
								
							}
						} else {
							if(menuVer03) $('#mobile-nav li.menu-has-children ul.dropdown-menu').hide();
							else {
								if($('body').width() < 768) $('#tpl-menu li.dropdown ul.dropdown-menu').hide();
							}
						}
					}
				}


				var loc = $(this).attr('href'),
					uri = (b.PUBLISH) ? loc : loc.replace('/render/',''),
					blank = $(this).attr('target'),
					bookmark = $(this).attr('attr-bookmark');

				if(typeof bookmark !='undefined' && bookmark) return false;
				if(typeof blank != 'undefined' && (blank == '_blank' || blank == 'blank')) {
					window.open(loc);
					e.stopPropagation();
					return false;
				}

				if(loc.match('^(mailto:|tel:|sms:)')) {
					window.location.href = loc;
					return false;
				}

				if(b.ONE!='1') {

					if(loc == 'javascript:;') return false;

					if(uri == '/render' || uri == '/') {
						uri = b.MENULINK[0];
						$('body,html').animate({scrollTop: 0}, 900,'easeInOutQuart'); 
					}

                    if(loc.match(/\@/g) === null && loc.match(/\//g) === null || loc.match(/\?clgc\=/g) !== null) {
			    		window.location.href = loc;
			    		return false;
			    	}
			    	var url = new getLocation(loc);
				    golink(_this,url);
		    		// _this.history.pushState(null,b.TITLE,(b.PUBLISH) ? "/" + uri : "/render/" + uri);
		    	} else {
			    	if(loc == 'javascript:;') {
			    		loc = '#';
			    	}

			    	var hash = '';
					if(_this.b.PUBLISH) {
						if(loc.indexOf('/index/view/') > -1 && b.ONE) ;
						else loc = loc.replace('/index','');
					} else {
						if(loc.indexOf('/index/view/') > -1 && b.ONE) ;
						else loc = loc.replace('/render/index','');
					}
					hash = loc;

			    	var fstr = loc.charAt(0),
			    		pathname = window.location.pathname;
			    	switch(fstr) {
			    		case '#':
			    			if(_this.b.PAGE == 'index') {
			    				if(pathname.charAt(1) == '_') {
				    				loc = (_this.b.PUBLISH) ? '/'+loc : '/render/'+loc;	
				    				window.location.href = loc;
			    				} else {
						    		if($(this).hasClass('mini-home')) {
						    			$('body,html').animate({scrollTop: 0}, 900,'easeInOutQuart'); 
						    			history.pushState('', '', hash);
						    			return false;
						    		}
				    				var urlType = (b.PUBLISH) ? '/index' : '/render';
									_this.history.pushState(null,b.TITLE,urlType + hash);
			    				}
			    			} else {
				    			loc = (_this.b.PUBLISH) ? '/index' : '/render/index';
								_this.history.pushState(null,b.TITLE,loc);
								history.pushState('', '', loc + hash);
			    			}
			    			break;
			    		case '@':

			    			break;
			    		case '/':
			    			if(loc == '/render' || loc == '/') {
			    				loc = (_this.b.PUBLISH) ? '/index' : '/render/index';	
				    			$('body,html').animate({scrollTop: 0}, 900,'easeInOutQuart'); 
			    			}
			    			
					    	var url = new getLocation(loc);
					    	golink(_this,url);
			    			break;
			    		default:
					    	// var url = new getLocation(loc);
					    	// golink(_this,url);
					    	window.location.href = loc;
			    			break;
			    	}
	
			    	// window.location.href = loc;
		    	}
		    }
		});

		// menu click (onepage)
		$('.nav li a[href*=#]:not([href="javascript"])').live({
		    click : function(e) {
				if(typeof e.target.className == 'string' && e.target.className.indexOf('fa') > -1 && $(this).closest('header').hasClass('navbar-simple')) {
					e.preventDefault();
					return false;
				}

		        var link = $(this).attr('href').replace('#','');
		        if(link.substring(0,1) == '/') link = link.substring(1,link.length);
		        if(b.MENULINK.indexOf(link) > -1) {
		        	$('.element').removeClass('aos-hidden');
					$('.element').removeClass('aos-animate');
					$('.element').removeClass('render-aos');
			    	//console.log('menu- click');
		    		$.each($('.element'),function(){
						if(isAosBlock) {
							var aos = $(this).attr('data-aos');
							$(this).attr('data-aos-ch',aos);
							$(this).removeAttr('data-aos');
						}
					});
		            if($('.dsgn-body').width()<769) {
		                setTimeout(function() {
		                    moveLinkPage(link);
		                },250);
		            } else moveLinkPage(link);
		        }
		    }
		});


		$('[data-type="gallery"] [data-loop="true"] > .grid').live({
			touchstart: function() {
				galleryStartHover();
			},
			touchend: function() {
				galleryCloseHover();
			},
			click: function() {
				galleryMovelink();
			}
		});

		$('.navbar-simple .nav li a .fa').live('click', function(e) {
			if($(this).closest('header').hasClass('navbar-simple')) {
				$(this).closest('a').next('ul.dropdown-menu').slideToggle(200).closest('li').toggleClass('open').siblings().removeClass('open').find('ul.dropdown-menu').slideUp(200);
				e.preventDefault();
				return false;
			} 
		});

		$('.navbar-simple .nav li a.dropdown-toggle[href="javascript:;"]').live('click', function(e) {
			e.preventDefault();
			if($('body').width() < 768) $(this).find('.fa').click();
			return false;
		});


		$('body').on('click', '.micon', function(e) { $('#goto-top').hide(); });

		$('body').on('touchstart.dropdown.data-api, click','header .siteUM-dmenu-wrap, header .siteLANG-dmenu-wrap', function(e) {
			if(e.target.className.indexOf('siteUM-dmenu-wrap') > -1 || e.target.className.indexOf('siteLANG-dmenu-wrap') > -1) {
				if($(this).hasClass('open')) {
					$(this).removeClass('open');
					$('#goto-top').show();
				}
			} 
		});
		$('body').on('touchstart.dropdown.data-api, click', 'header.navbar-simple .navbar-collapse.in', function(e) {
			if(e.target.className.indexOf('navbar-collapse') > -1) {
				$('.navbar-toggle').click();
			}
		});

		/* [Input URL link] Click ==> link-type: link-out*/
		$('a[href*=#][attr-link]').live({
		    click : function(e) {
		    	if($(this).is('[attr-link=""]')) return false;
				if(typeof e.target.className == 'string' && e.target.className.indexOf('fa') > -1 && $(this).closest('header').hasClass('navbar-simple')) {
					e.preventDefault();
					return false;
				}

				$.removeCookie('gallery', { path: '/' });
				$.removeCookie('gallery-item', { path : '/' });
				$.removeCookie('forum', { path : '/' });
				$.removeCookie('forum-item', { path : '/' });

				if($(this).attr('target') != '_blank') {
					var link = $(this).attr('href').replace('#','');
					if(link.length > 0 && link != '/') {
						if(b.MENULINK.indexOf(link) > -1) {
							if($('.dsgn-body').width()<769) {
								setTimeout(function() {
									moveLinkPage(link);
								},250);
							} else moveLinkPage(link);
						} else if($('.' + link).length) {
							moveLinkPage(link,1200,true);
						}
					}
				}
		    }
		    
		});

		$('.fr-custom-button[data-external-link], .fr-fic[data-external-link]').live({
			click: function() {
				if($(this).is('[data-external-link=""]')) return false;
				var link = $(this).attr('data-external-link');
				if($(this).attr('target') != '_blank') {
					location.href = link;
				} else {
					window.open(link);
				}
			}
		});

		$('.gallery-category-nav li a').live({
		    click: function() {
		    	if($(this).closest('.gallery-category-nav').hasClass('empty')) {
		    		$(this).blur();
		    		return false;
		    	}

		        if($(this).closest('li').hasClass('active')) return;

		        var d = new Date(),
		            now = d.getTime(),
		            idx = $(this).attr('data-idx'),
		            sfl = 'category',
		            stx = (idx != '0') ? $(this).text().trim() : '',
		            pid = $(this).closest('.element[data-type="gallery"]').attr('data-id');

		        $('.element[data-id="'+pid+'"] .gallery-category-nav li').removeClass('active');
		        $('.element[data-id="'+pid+'"] .gallery-category-nav li').eq(idx).addClass('active');

		        if(pid == 'all_products') {
		       		sfl = 'orderby';
		       		stx = (idx != '0') ? idx : '';
		       		$('.allProducts-sort-wrap ul li a[data-idx="'+idx+'"]').closest('li').addClass('active');
		       		$('.allProducts-sort-mobile .dropdown-toggle span').text($('.allProducts-sort-mobile ul li a[data-idx="'+idx+'"]').text());
		       	}

		        $('#el-empty').empty();
      			$('#el-empty').after('<div class="gallery-empty"></div>');
		        
	            var val = _this.galleryEL[pid],
	                tag = htmlspecialchars_decode(val.eltag,'ENT_QUOTES')
	                elsettings = (typeof val.elsettings != 'undefined' && val.elsettings) ? $.parseJSON(val.elsettings) : {},
	                block_lang = ($(tag).attr('data-blocklang')) ? $(tag).attr('data-blocklang') : LANG;

                $('#el-empty').append($(tag));
                $('#el-empty').find('[data-loop="true"]').html('');

                var nodes = $(tag).find('[data-loop="true"]').children(),
                    p = $('#el-empty').children(),
                    i = [],
                    view = $(tag).find('[data-loop="true"]').data('view'),
                    total = 0,
                    display = 0;

                if(typeof view == 'undefined') view = 10;
	            var cookie_page = 1,
	                cookie_view = view,
	                // cookie_gallery_category = (typeof escape(stx) != 'undefined') ? escape(stx) : '',
	                cookie_gallery_category = (typeof stx != 'undefined') ? stx : '',
	                is_gc_cookie = (typeof $.cookie('gallery-category-'+val.seq) != 'undefined' && $.cookie('gallery-category-'+val.seq).length > 0) ? true : false;

				// $.cookie('gallery',val.seq, { path: '/', expires: 12 * 60 * 60 * 1000 });
				// $.cookie('loadmore-' + val.seq, cookie_page, { path: '/', expires: 12 * 60 * 60 * 1000 });
				$.cookie('gallery-page-' + val.seq, cookie_page, { path : '/', expires: 12 * 60 * 60 * 1000 });
				$.cookie('gallery-category-' + val.seq, cookie_gallery_category, { path : '/', expires: 12 * 60 * 60 * 1000 });
				$.removeCookie('loadmore-' + val.seq, { path : '/' });
				$.removeCookie('gallery', { path : '/' });

				$('.galleryPL'+val.seq).find('.row').empty();

				var el_gh = $(tag).find('.goption').attr('data-gh'),
					checkGalleryHeight = (typeof el_gh != 'undefined' && el_gh) ? true : false,
					checkGallerySVG = ($(tag).find('.gimg-svg-wrap').length > 0) ? true : false,
					checkGFrameTitleOFF = (val.mode == 'gallery' && (typeof elsettings.gframe_title_visible != 'undefined' && elsettings.gframe_title_visible == 'OFF')) ? true : false;

                $.ajax({
                    url: '/template/gallery/list/pid/' + val.seq + '/sid/' + b.SID + '/spage/' + b.PAGE + '/view/' + cookie_view + '/publish/' + b.PUBLISH + param,
                    data: { g_mode: val.mode, visible: true, sfl: sfl, stx: stx },
                    dataType: 'json',
                    type: 'POST',
                    async: false,
                    cache: false,
                    success: function (data) {
                        $.each(data.list, function (idx, value) {
                            i.push(value);
                        });

                        total = (typeof data.total.list_total != 'undefined') ? data.total.list_total : data.total;
                        display = data.list.length;

                        if ( i.length>0 || (i.length==0 && is_gc_cookie) ) {
                            var loop_count = nodes.length, item_index = 0;
                            var elem = [];
                            $.each(data.total_list,function(index,v) {
                                loop_pos = index%loop_count;
                                c = nodes[loop_pos];

								v.title = (v.title.length>0) ? v.title : $.lang[block_lang]['editor.block.gallery.sample.title'];
								v.caption = (v.caption.length>0) ? v.caption : $.lang[block_lang]['editor.block.gallery.sample.caption'];

								$(c).addClass('gallery-item').attr('data-index',index).attr('data-seq',v.seq);

                                var vgsettings = (typeof v.gsettings != 'undefined' && v.gsettings) ? $.parseJSON(v.gsettings) : {},
							        img_path = (typeof vgsettings['storage'] != 'undefined') ? vgsettings['storage'] : _this.b.RESOURCE + '/' + _this.b.SID + '/',
							        img_original = (typeof vgsettings['storage'] != 'undefined') ? img_path + '1920/' : img_path;

								var folder = (val.folder == 0) ? '' : val.folder + '/',
									src = getServeImage(v.image,val.folder,img_path),
									src_s0 = getServeImage(v.image,'0',img_path);
								$(c).find('img').attr('src',src);
								if(checkGalleryHeight) $(c).find('.g-img').css('background-image', 'url('+src+')');
								if(checkGallerySVG) {
									var gimgSVG = $(c).find('.gimg-svg-wrap svg');
									gimgSVG.find('pattern').attr('id','gimgSvg_'+val.elname+'_'+index);
									gimgSVG.find('image').attr('xlink:href', src);
									gimgSVG.find('polygon').attr('fill', 'url(#gimgSvg_'+val.elname+'_'+index+')');
								}
								
								var glink = (typeof vgsettings['glink'] != 'undefined' && vgsettings['glink']) ? vgsettings['glink'] : '',
									glink_target = (typeof vgsettings['glink_target'] != 'undefined' && vgsettings['glink_target']) ? vgsettings['glink_target'] : '';

								if(glink) {
									if(glink.match(/^\@/g) !== null) {															// link-type: link-bookmark ==> a[attr-bookmark]
										var bookmark_seq = glink.replace(/^\@/g,'');
										if(typeof _this.b.SETTINGS.blockBookmarkList == 'undefined' || typeof _this.b.SETTINGS.blockBookmarkList['bookmark' + bookmark_seq] == 'undefined') {
											glink = '';
											glink_target = '';
										}
									} else if(glink.match(/^flink\@[0-9]/gi) !== null) {										// link-type: link-file     ==> a[attr-flink]
										glink_target = '';
									} else if($.inArray(glink.replace(/^\//g,'').replace(/ /g,'-'),_this.b.MENULIST) > -1) {	// link-type: link-menu     ==> a[data-user-link]
									} else {																					// link-type: link-out      ==> a[attr-link]
										if(checkBase64Encode(glink)) glink = Base64.decode(glink);
									}
								}

								$(c).find('a').removeAttr('data-gallery').removeAttr('data-user-link').removeAttr('attr-bookmark').removeAttr('attr-link').removeAttr('attr-flink');
								if (typeof v.price_hidden != 'undefined' && v.price_hidden == 'ON' && property['SITEUM'] >= 1) {
									$(c).addClass('gallery-item').addClass('nonePrice');
									$(c).find('a').attr('href', '#');
								} else {
									if(glink) {
										var glink_val = makeLinkUrl(glink, b.ONE, b.VIEW);
										$(c).find('a').attr('href',glink_val);

										if(glink.match(/^\@/g)) {
											$(c).find('a').attr('attr-bookmark',glink.replace(/^\@/g,''));
										} else if(glink.match(/^flink\@[0-9]/g) !== null) {
											$(c).find('a').attr('attr-flink',glink.replace(/^flink\@/g,''));
										// IE ERROR_includes__H.20210603
										// } else if(_this.b.MENULIST.includes(glink.replace(/ /g,'-'))) {
										} else if($.inArray(glink.replace(/ /g,'-'),_this.b.MENULIST) > -1) {
											$(c).find('a').attr('data-user-link',glink_val);
										} else {
											$(c).find('a').attr('attr-link',glink);
										}
									} else {
										if (val.mode == 'gallery') {
											src_s0 = src_s0 + '?gpos='+v.pos;

											$(c).find('a').attr('href', src_s0);
											$(c).find('a').attr('data-gallery', '#gframe-' + val.seq);
										} else {
											if(val.seq == 'all_products') {
												$(c).find('a').attr('href', v.product_url);
											} else {
												$(c).find('a').attr('href', ((URL=='/') ? '' : URL) + '/' + b.PAGE + '/view/' + v.seq);
											}
										}
									}
								}

								if(glink_target == '_blank') $(c).find('a').attr('target','_blank');
								else $(c).find('a').removeAttr('target');

								if(checkGFrameTitleOFF) $(c).find('a').attr('data-title', '');
								else $(c).find('a').attr('data-title', v.title);

                                // caption
                                var ftitle = $(c).find('h5.figure'),
                                    fcaption = $(c).find('p.figure'),
                                    fdatetime = $(c).find('.figure.datetime'),
                                    fhashtag = $(c).find('.figure.hashtag'),
                                    fprice = $(c).find('.figure.price'),
									freview = $(c).find('.figure.review');

                                // datetime / hashtag
                                if(fdatetime.length<1) {
                                    $(c).find('figcaption').append('<div class="figure datetime hide"></div>');
                                    fdatetime = $(c).find('.figure.datetime');
                                }
                                if(fhashtag.length<1) {
                                    $(c).find('figcaption').append('<div class="figure hashtag hide"></div>');
                                    fhashtag = $(c).find('.figure.hashtag');
                                }

                                $(c).find('figcaption').removeClass('hide');
                                if (v.title || v.caption) {
                                    var gallery_caption = v.caption;
                                    gallery_caption = gallery_caption.replace(/\n/g,'<br />');

                                    ftitle.html(v.title);
                                    fcaption.html(gallery_caption);
                                    fdatetime.text(v.datetime);
                                    fhashtag.text(v.hashtag);
                                }
								if(val.mode == 'shopping' || val.seq == 'all_products') {

									var checkPriceHidden = (typeof v.price_hidden != 'undefined' && v.price_hidden == 'ON') ? true : false,
										gallery_price = (v.price && !checkPriceHidden) ? v.price : 0,
										gallery_sale_price = (typeof v.sale != 'undefined' && v.sale > 0 && !checkPriceHidden) ? v.sale : 0,
										gallery_sale_per = (typeof v.sale_per != 'undefined' && v.sale_per && !checkPriceHidden) ? v.sale_per : '',
										product_soldout = (typeof elsettings.sh_soldout == 'string') ? elsettings.sh_soldout : '구매불가',
                                        product_status = ((v.status == 'off' || (v.quantity_on == 'on' && v.quantity < 1)) && product_soldout && !checkPriceHidden) ? '<span class="cl-sh-soldout">' + product_soldout + '</span>' : '';

									$(c).find('.cl-sh-soldout').remove();
									if(product_status != '') $(c).attr('data-soldout',true);
									else $(c).removeAttr('data-soldout');

									if($(c).find('ul.figure.price').length > 0) {
										//Ver2
										if(!checkPriceHidden) {
											$(c).find('ul.figure.price .price-val').html('￦' + gallery_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
											$(c).find('ul.figure.price .price-val').removeClass('hide');

											if(gallery_sale_price > 0) {
												$(c).find('ul.figure.price .price-sale').html('￦' + gallery_sale_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
												$(c).find('ul.figure.price .price-sale-per').html(gallery_sale_per);
												$(c).find('ul.figure.price .price-sale, ul.figure.price .price-sale-per').removeClass('hide');
											} else {
												$(c).find('ul.figure.price .price-sale, ul.figure.price .price-sale-per').addClass('hide').html('');
											}
										} else {
                                            $(c).find('ul.figure.price .price-val').html('￦0');
                                            $(c).find('ul.figure.price .price-val').removeClass('hide');
										}

										if(product_status) $(c).find('ul.figure.price').append('<li>'+product_status+'</li>');

									} else {
										//Ver1
										if(fprice.length == 0) fprice = fcaption;
										
										if(checkPriceHidden) fprice.html('');
										else fprice.html('<span class="figure-krw">￦</span>' + gallery_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',') + product_status);
									}

									if($(c).find('ul.figure.review').length > 0) {
										var gallery_review = (v.review_onoff && v.review_cnt) ? v.review_cnt : 0;
										if(gallery_review > 0) {
											$(c).find('ul.figure.review, ul.figure.review li').removeClass('hide');
											$(c).find('ul.figure.review .figure-review-cnt').html(gallery_review);
											$(c).find('ul.figure.review .figure-review-score').html(v.review_score);
										} else {
											$(c).find('ul.figure.review, ul.figure.review li').addClass('hide');
											$(c).find('ul.figure.review .figure-review-cnt, ul.figure.review .figure-review-score').html('');
										}
									}

								} else {
									fprice.addClass('hide');
									freview.addClass('hide');
								}
                                
                                // $(p).find('[data-loop="true"]').append($(c)[0].outerHTML);
                                if(index < i.length) {
									$(p).find('[data-loop="true"]').append($(c)[0].outerHTML);
								} else {
									if(val.mode == 'gallery') {
										$(c).find('figure').remove();
										$('.galleryPL'+val.seq).find('[data-loop="true"]').append($(c)[0].outerHTML);
									}	
								}
								if (val.mode == 'gallery' && total == 2) {
									$(c).find('figure').remove();
									$('.gallery-empty').append($(c)[0].outerHTML);
								}
                            });
                        } else {
                        	if(idx == '0') {
	                            nodes.find('a')
	                                .addClass('emptyGalleryItem')
	                                .attr('href', '/config/page/' + b.PAGE + '/view/template')
	                                .removeAttr('data-gallery')
									.removeAttr('data-user-link')
									.removeAttr('attr-bookmark')
									.removeAttr('attr-flink')
									.removeAttr('attr-link')
	                                .find('img')
	                                .attr('data-index',0);
	                            $(p).find('[data-loop="true"]').append(nodes);
                        	}

	                        $.cookie('gallery-category-'+val.seq,'',{ path: '/', expires: 12 * 60 * 60 * 1000 });
                        }

                        tag = $(p)[0].outerHTML;
						if (val.mode == 'gallery' && total == 2) {
							$.each($('.gallery-empty').find('.gallery-item'), function(i,v) {
								$('.galleryPL'+val.seq).find('[data-loop="true"]').append(v);
							});
						}
                
                        if (val.mode == 'gallery' && total) tag = appendGalleryFrame($(tag),val.seq,val.elsettings);
                        $('#el-empty').empty();
                        $('.gallery-empty').remove();
                    }
                });

                var $tag = $(tag),
                	$galleryEL = $('.element[data-id="' + val.seq + '"]'),
                	g_settings = (typeof val.elsettings != 'undefined' && val.elsettings) ? $.parseJSON(val.elsettings) : {};

				changeBrokenImages($tag);
                $.each($tag.find('[data-edit="true"]'), function() {
                    var source = $(this).html();
                    source = source.replace(/&lt;&nbsp;/g,'&lt;').replace(/&nbsp;&gt;/g,'&gt;');
                    $(this).html(source);
                });

                if(val.feature=='masonry') {
                    var $container = $galleryEL.find('.container'),
                        $gallery_items = $tag.find('[data-loop="true"]');

                    $container.html('');
                    $galleryEL.find('[data-loop="true"]').before('<div class="gallery-loading-status"><div class="loading-dots"></div></div>');

                    var process_index = 0,
		                last_view = (view > total) ? total : view; 
                    $gallery_items.imagesLoaded().progress(function(imgload, image) {
                        process_index++;
                        if(total>0 && last_view==process_index) {
                        	setTimeout(function() {
                        		reloadMasonry($container,$gallery_items);
								refreshGalleryField($galleryEL,g_settings);
                        	}, 30);
                        }
                    });
                } else {
                    $galleryEL.find('[data-loop="true"]').replaceWith($tag.find('[data-loop="true"]'));
					refreshGalleryHeight();
					refreshGalleryField($galleryEL,g_settings);
                }

            	$galleryEL.find('.empty-txt').remove();
            	$galleryEL.find('.container:not(.fh-container),[data-loop="true"]').removeClass('empty');
                if(total == 0) {
					var gallery_empty_str = '<div class="col-xs-12 col-sm-12 col-md grid empty-txt">' + $.lang[LANG]['editor.gallery.category.empty.list'] + '</div>';
	                if(val.seq == 'all_products') {
	                    gallery_empty_str = '<div class="col-xs-12 col-sm-12 col-md grid empty-txt">'+$.lang[LANG]['editor.gallery.product.empty.list']+'</div>';
	                }
					
	                if(val.feature=='masonry') { 
	                    $galleryEL.find('.container:not(.fh-container)').removeAttr('style').addClass('empty').append(gallery_empty_str);
	                } else {
	                    $galleryEL.find('[data-loop="true"]').addClass('empty').empty().append(gallery_empty_str);
	                }
                    $galleryEL.find('.gallery-loadmore').remove();
                } else if ( total == view || view > display ) { 
					$galleryEL.find('.gallery-loadmore').remove();
				} else {
					var btn_class = (val.feature=='masonry') ? 'gallery-loadmore masonry-layout' : 'gallery-loadmore',
						btn_txt = (typeof g_settings.loadmore_lang != 'undefined' && g_settings.loadmore_lang == 'KO') ? '더보기' : 'LOAD MORE',
						btn_tag = '<div class="' + btn_class + '" data-total="' + total + '" data-id="' + val.seq + '" data-page="2" data-view="' + view + '" data-folder="' + val.folder + '" data-mode="' + val.mode + '">' + btn_txt + ' &nbsp;(<span class="display">' + cookie_view + '</span> / ' + total + ')</div>';

					if($galleryEL.find('.gallery-loadmore').length > 0) $galleryEL.find('.gallery-loadmore').replaceWith(btn_tag);
					else $galleryEL.append(btn_tag);
				}

                if($galleryEL.find('*[data-direffect="true"]').length > 0 ) {
                    setTimeout(function() {
                        $galleryEL.find('.grid').each(function() {
                            $(this).hoverdir();
                        });
                    }, 400);
                }
		    }
		});


		// menu ver3 : fheader - #mobile-nav show/hide function
		$(document).on('click', '#fixed-menu li.siteSEARCH > a.psearch-btn, \
								#fixed-menu li.siteSEARCH .psearch-overlay.open, \
								#fixed-menu li.siteSEARCH .psearch-input, \
								#fixed-menu-sub li.siteSEARCH > a.psearch-btn, \
								#fixed-menu-sub li.siteSEARCH .psearch-overlay.open, \
								#fixed-menu-sub li.siteSEARCH .psearch-input', function(e) {
			e.preventDefault();
			var taret_nav = (window.innerWidth <= 768) ? $('#mobile-nav') : $('header.navbar-fheader'),
				check_psearch_area = (taret_nav.find('.psearch-wrap').is(e.target) || taret_nav.find('.psearch-wrap').has(e.target).length > 0) ? true : false;
	
			if(!check_psearch_area) {
				taret_nav.find('.psearch-overlay').toggleClass('open');
				setTimeout(function() {
					$.psearch.showSiteProjectSEARCH(false);
					taret_nav.find('.psearch-overlay').find('input.psearch-input').focus();
				},300);
			}
			return false;
		});

		$(document).on('click', '#fixed-menu li.siteCART > a[href="javascript:;"], #fixed-menu-sub li.siteCART > a[href="javascript:;"]', function(e) {
			e.preventDefault();
			$(this).showModalFlat('INFORMATION',$.lang[LANG]['fheader.cart.no-support.render-mode'],true,false,'','ok');
			return false;
		});

		$(document).on('click', '#mobile-nav .login-content:not(.siteUM)', function(e) {
			e.preventDefault();
			$('#mobile-nav #fixed-menu .siteUM a i').click();
			return false;
		});

		$(document).on('click', '#mobile-nav .nav li.menu-has-children > a[href="javascript:;"]', function(e) {
			e.preventDefault();
			$(this).prev('.fa').click();
			return false;
		});

		$(document).on('click', '#mobile-nav ul li.menu-has-children i', function(e) {
			if($(this).closest('li.menu-has-children').hasClass('open')) {
				$(this).closest('li.menu-has-children').removeClass('open');
				$(this).nextAll('ul').eq(0).slideToggle(200);
				// $(this).next().removeClass('menu-item-active');
				$(this).toggleClass('fa-chevron-down fa-chevron-up');
			} else {
				$(this).closest('li.menu-has-children').addClass('open').siblings('li.open').find('i').click();
				$(this).nextAll('ul').eq(0).slideToggle(200);
				// $(this).next().toggleClass('menu-item-active');
				$(this).toggleClass('fa-chevron-down fa-chevron-up');
			}
		});

		$(document).on('click', 'header.navbar-fheader .navbar-toggle', function(e) {
			if($('.dsgn-body').hasClass('mobile-nav-active')) {
				//close mobile menu
				$('header.navbar-fheader .navbar-toggle').css({'visibility':'visible'});
				$('.dsgn-body').removeClass('mobile-nav-active');
				$('#mobile-body-overly').removeClass('in');
			} else {
				//show mobile menu
				$('header.navbar-fheader .navbar-toggle').css({'visibility':'hidden'});
				$('.dsgn-body').addClass('mobile-nav-active');
				$('#mobile-body-overly').addClass('in');
			}
		});

		$(document).on('click', '.dsgn-body.mobile-nav-active', function(e) {
			if( $('#mobile-nav').is(e.target) || 
				$('#mobile-body-overly').is(e.target) || 
				( $(e.target).is('img') && $(e.target).parent('#mobile-nav-toggle') )
			) {
				$('header.navbar-fheader .navbar-toggle').click();
			}
		});



		$('header.navbar-simple .navbar-toggle').live('click',function(e) {
			var check = $(this).hasClass('collapsed') ? false : true;
			if(check) {
				var p_t = $('.el-menu header').height() + 'px';

				$('.element').each(function(){ $(this).addClass('blur-filter'); });
				$('.el-menu').addClass('blur-filter');

				if($('body').height() > ($('.el-menu').find('#tpl-menu').height() + 80)) $('.el-menu').find('#tpl-menu').addClass('center-position');
				else $('.el-menu').find('#tpl-menu').removeClass('center-position');
				
				$('.dsgn-body').bind('touchmove');
				$('#goto-top').hide();
			} else {
				$('.element').each(function(){ $(this).removeClass('blur-filter'); });
				$('.el-menu').removeClass('blur-filter');
		        $('.dsgn-body').unbind('touchmove');
				$('#goto-top').show();
			}
		});


		$('.element[data-type="gallery"]').live({
			mouseenter : function() {
				$(this).find('.row[data-direffect="true"] .grid').each(function() {
					$(this).hoverdir();
				});
			}
		});	

		$('.creatorlink-header .data-user > ul > li').live({
			click : function() {
				$(this).closest('.pull-right').toggleClass('open');
				if($(this).closest('.pull-right').hasClass('open')) {
					$('.popover').show();
				} else {
					$('.popover').hide();
				}
			}
		});

		/* [Menu link] Click ==> link-type: link-menu or link-inner*/
		$('*[data-user-link]').live('click',function(e) {
	    	if($(this).is('[data-user-link=""]')) return false;

			if(typeof e.target.className == 'string' && e.target.className.indexOf('fa') > -1 && $(this).closest('header').hasClass('navbar-simple')) {
				return false;
			}
			$.removeCookie('gallery', { path: '/' });
			$.removeCookie('gallery-item', { path : '/' });
			$.removeCookie('forum', { path : '/' });
			$.removeCookie('forum-item', { path : '/' });

		 	if(!selectEL || typeof selectEL == 'undefined') {
				selectEL = $(this).closest('.element').attr('data-el');
			}

			//latest block - table header click, set click table
			if(typeof $(this).attr('data-lt-header') != 'undefined') {
				var type = $(this).closest('.latest-table').attr('data-type'),
					pid = $(this).closest('.latest-table').attr('data-pid'),
					clickEL = (type == 'gallery') ? $('.gallery-item[data-seq="'+pid+'"]') : $('.element[data-id="' + pid + '"]'),
					checkThisPage = (b.ONE && clickEL.length > 0) ? true : false;

				if(checkThisPage) {
					if(type == 'forum') {
						scrollToBlock('.element[data-id="' + pid + '"]', 1000);
						return false;
					} else if(type == 'gallery') {
						moveGallery(pid);
						return false;
					}
				} else $.cookie(type+'-item',pid, { path: '/' });
			}

			//psearch - project item(pitem) click, set click parent
			if($(this).closest('.psearch-view').length > 0) {
				if(typeof $(this).attr('data-psearch-seq') != 'undefined') {
					$.cookie('gallery-item',$(this).attr('data-psearch-seq'), { path: '/' });
				} else {
					$.cookie('gallery',$(this).attr('data-psearch-pid'), { path: '/' });
				}

				if(b.ONE && typeof $(this).attr('data-user-link') != 'undefined' &&  $(this).attr('data-user-link') == 'index') {
					location.replace('/');
					return false;
				}
			}

		 	var datatype = $('.'+selectEL).attr('data-type'),
    			isimglink = $('.'+selectEL).hasClass('imglink'),
    			hasalink = $(this).hasClass('sha_link'),
    			isshlink = $(this).is('[data-shlink]');

		    var userLink = ((datatype == 'showcase') && isimglink && isshlink) ? $(this).attr('data-shlink') : $(this).attr('href'),
        		target = '';


    		if((typeof $(this).attr('target') != 'undefined') || (typeof $(this).attr('data-blank') != 'undefined')) {
		        if((datatype == 'showcase') && isimglink && isshlink) {
		           target = $(this).attr('data-blank'); 
		        } else target = $(this).attr('target'); 
		    } 

		    if(userLink.match(/^mailto:|^tel:|^sms:/gi) !== null) {
		    	window.location.href = userLink;
		    	return false;
		    }

			if(typeof userLink == 'undefined' || $(this).attr('data-user-link') == '' ) {
				if(target == '_blank' || target == 'blank') {
			    	var openNewWindow = window.open(userLink);
			    	return false;
		    	} else  {
			    	var url = new getLocation(userLink);
			    	golink(_this,url);
			    	return false;
		    	}
			}

			e.preventDefault();
		    if(b.ONE) {
		    	if(userLink.charAt(0)=="/") {
				    var linkRegExp = /\/view\//gi;
				    var linkMatch = userLink.match(linkRegExp);
				    if(linkMatch && linkMatch[0]) {
					    var url = ((b.URL=="/") ? "" : b.URL) + userLink;
					    if(target == '_blank') {
					    	var openNewWindow = window.open(url);
					    } else { 
						    location.href=url;
						}
					    return false;
				    }
			    	userLink = userLink.charAt(0).replace("/","") + userLink.slice(1);
			    	if(target == '_blank') {
					    var url = ((b.URL=="/") ? "/" : b.URL) + '#' + userLink;
				    	var openNewWindow = window.open(url);
			    	} else { 
			    		if(b.VIEW) {
						    var url = ((b.URL=="/") ? "/" : b.URL) + '#' + userLink;
					    	url = new getLocation(url);
					    	golink(_this,url);
			    		} else {
			    			moveLinkPage(userLink);
			    		}
				    }
		    	} else {
		    		// alert('Invalid URL');
		    		return false;
		    	}
		    } else {
			    var url = ((b.URL=="/") ? "" : b.URL) + userLink;
			    if(target == '_blank' || target == 'blank') {
			    	var openNewWindow = window.open(url);
			    } else { 
			    	url = new getLocation(url);
			    	golink(_this,url);
				}
		    }
		});

		/* [Block Bookmark link] Click ==> link-type: link-bookmark*/
		$('a[attr-bookmark],*[data-imglink="true"][attr-bookmark],.fr-custom-button[attr-bookmark],.fr-fic[attr-bookmark]').live({
		    click : function(e) {
		    	if($(this).is('[attr-bookmark=""]')) return false;

		        e.preventDefault();
				if(typeof e.target.className == 'string' && e.target.className.indexOf('fa') > -1 && $(this).closest('header').hasClass('navbar-simple')) {
					return false;
				}
				if(!selectEL || typeof selectEL == 'undefined') {
					selectEL = $(this).closest('.element').attr('data-el');
				}
				var datatype = $('.'+selectEL).attr('data-type'),
            		isimglink = $('.'+selectEL).hasClass('imglink'),
            		hasalink = $(this).hasClass('sha_link'),
            		isshlink = $(this).is('[data-shlink]'),
            		blockBookmarkList = (typeof b.SETTINGS.blockBookmarkList != 'undefined' && b.SETTINGS.blockBookmarkList) ? b.SETTINGS.blockBookmarkList : {},
            		hideArray = (typeof blockBookmarkList.hide == 'undefined' || !blockBookmarkList.hide) ? {} : blockBookmarkList.hide;
				
				$.removeCookie('gallery', { path: '/' });
				$.removeCookie('gallery-item', { path : '/' });
				$.removeCookie('forum', { path : '/' });
				$.removeCookie('forum-item', { path : '/' });
				
		        var a_el = $(this),
		        	link = ((datatype == 'showcase') && isimglink && isshlink) ? $(this).attr('data-shlink').replace(/^\@/g,'') : $(this).attr('href').replace(/^\@/g,''),
		            target = '';

	            if(hideArray.length > 0) {
					// IE ERROR_includes__H.20210603
	            	// if(hideArray.includes(link)) {
	            	if($.inArray(link,hideArray) > -1) {
		        	    //blockbookmarkLink => 블럭 숨김 체크 
			            return false;
			        } 
	            }
	            


	            if((typeof $(this).attr('target') != 'undefined') || (typeof $(this).attr('data-blank') != 'undefined')) {
		            if((datatype == 'showcase') && isimglink && isshlink) {
		               target = $(this).attr('data-blank'); 
		            } else target = $(this).attr('target'); 
		        } 

		        if($('.element[data-bookmark="' + link + '"]').length > 0 && target != '_blank') {
		            moveLinkPage(b.PAGE+'\@'+link,1200,true);
		        } else {
		        	var attr_bookmark = $(this).attr('attr-bookmark');
		        	if(typeof attr_bookmark != 'undefined' && attr_bookmark && typeof b.SETTINGS.blockBookmarkList['bookmark' + attr_bookmark] != 'undefined') {
		        		// if(b.SETTINGS.blockBookmarkList['bookmark' + attr_bookmark] == link) {
		        			link = attr_bookmark;
		        		// }
		        	}
					if(typeof b.SETTINGS.blockBookmarkList == 'undefined'|| !b.SETTINGS.blockBookmarkList || typeof b.SETTINGS.blockBookmarkList['bookmark'+link] == 'undefined' ) {
						a_el.find('img[data-attach="true"]').unwrap();
						return false;
					}

		            $.post('/template/bookmarkBlock', {sid: b.SID, seq: link, publish : b.PUBLISH}, function(data) {
						if(data.length == 0) {
							console.log('Block Link Click :( Undefined block');
							return false;
						}

						var d = data[0];
						if(typeof d.orgpage == 'undefined' || d.orgpage.length == 0) d.orgpage = d.page;

						var	org_title = d.orgpage.replace(/-/g,' '),
							bb_o_page = (d.page.match(/^index/g) !== null ) ? org_title : d.page,
							bb_page = (bb_o_page.match(/\,/g) !== null) ? bb_o_page.substring(0,d.page.indexOf('\,')) : bb_o_page;


						var check_link = true,
							is_visible_menu = false;

						$.each(b.SMENU, function (idx, obj) {
							if(bb_page == obj.name.replace(/ /g,'-')) {
								if(!obj.link) check_link = false;
								if(obj.display == 'on') is_visible_menu = false;
							}
							if(obj.children) {
								$.each(obj.children, function (i, v){
									if(bb_page == v.name.replace(/ /g,'-')) {
										if(!v.link) check_link = false;
										if(v.display == 'on') is_visible_menu = false;
									}
								});
							}
						});

						var is_here = ($('.element[data-bookmark="' + link + '"]').length > 0 ) ? true : false,
							is_page = (b.PAGE.toLowerCase()==d.page.toLowerCase()) ? true : false,
							// is_visible_menu = ($.inArray(bb_page,b.MENULINK)>-1) ? true : false,
							// check_link = ( $('#tpl-menu li a[href*="'+bb_page+'"]').length > 0 && $('#tpl-menu li a[href*="'+bb_page+'"]').text().trim().replace(/ /gi,'-') == bb_page ) ? false : true,
							is_link = ( check_link && is_visible_menu && org_title != 'INTRO' ) ? true : false,
							is_visible = (check_link && is_visible_menu && org_title != 'INTRO') ? true : false;


						// console.log('is_visible_menu : ' + is_visible_menu);
						// console.log('bb_page : ' + bb_page);
						// console.log('d.glivisible : ' + d.glivisible);
						// console.log('is_link : ' + is_link);
						// console.log('is_visible : ' + is_visible);
						// console.log('is_here : ' + is_here);
						// console.log('is_page : ' + is_page);

						if( ( !is_visible_menu && bb_page!='index' ) || 
							( typeof d.glivisible!='undefined' && d.glivisible ) ||
							( /*( (is_here && target=='_blank') || !is_page ) &&*/ ( is_link || is_visible ) ) ||
							( !is_here && is_page ) )  {
								if(is_visible_menu == false) {
									moveBookmark(d.page,'\@'+link,1200,target);
								} else {
									a_el.find('img[data-attach="true"]').unwrap();
									return false;
								}
						} else {
							moveBookmark(d.page,'\@'+link,1200,target);
						}

		            }, 'json');
		        }
		        
		    }
		});

		/* [File link] Click ==> link-type: link-file*/
		$('a[attr-flink], .fr-custom-button[attr-flink], .fr-fic[attr-flink]').live({
			click : function(e) {
		    	if($(this).is('[attr-flink=""]')) return false;

				e.preventDefault();
				if(!property.VALIDPLAN) return false;

				var id = $(this).attr('attr-flink');
				if(typeof id == 'undefined' || !id) { return false;
				} else {
					// direct download
					// var flink_url = location.protocol + '//' + location.host +'/down/flink/' + id;
					// window.open(flink_url);

					// modal open
					$.getJSON('/down/flink/get/id/' + id , {}, function (data) {
						checkError(data);
						if(typeof data.data == 'object' && !$.isEmptyObject(data.data)) {
							var flink_link = data.data;
							var flinkDownModal = $(this).showModalFlat($.lang[LANG]['config.information'], $.lang[LANG]['editor.link.file.download.check'], true, true, function() {
								var flink_url = location.protocol + '//' + location.host +'/down/flink/' + id + '/sid/' + flink_link.sid + '/s/' + encodeURIComponent(flink_link.file) + '/name/' + encodeURIComponent(flink_link.name);
								window.open(flink_url);
								flinkDownModal.modal('hide');
							}, 'cancel', 'ok');
						} else {
							return false;
						}
					}, 'json');
				}

			}
		});

		$('.element img[data-attach="true"][data-img-original="ON"]').live({
			click: function(e) {
				$(this).mouseenter();
			},
			mouseenter : function(e) {
				if(!selectEL || typeof selectEL == 'undefined') {
					selectEL = $(this).closest('.element').attr('data-el');
				}
				if(typeof selectEL == 'undefined') return false;

				var offset = $(this).offset(),
			        left = $(this).width() + offset.left-25,
					top = offset.top;
				var index = $('.' + selectEL + ' img[data-attach="true"]').index(this);

				if(b.VIEW) {
					var src = $(this).prop('src').split('/'),
						file = src[src.length-1];
		            if(src.indexOf('googleusercontent') > -1) {
		            	file = src;
		            }
					$('.config-image-view').css({ top : top + 'px', left : left + 'px' }).attr('data-src',$(this).prop('src')).attr('data-index',index).show();
				}
			},
			mouseleave : function(e) {
				$('.config-image-view').hide();
			}
		});

		$('.config-image-view').live({
			mousemove : function(e) { $('.config-image-view').show(); },
			mouseout : function(e) { $('.config-image-view').show(); }
		});

	    $('.config-image-view').on({
			click: function (e) {
				$('.config-image-view').hide();

				var src = $(this).attr('data-src').split('/'),
					file = src[src.length-1],
	                free = (src[4]=='free') ? true : false;

	            var img_src = $(this).attr('data-src')
	            if(img_src.indexOf('googleusercontent') > -1) {
	            	file = img_src;
	            }
	            file = Base64.encode(file);
				if(b.SID && file) {
					$('.tooltip.in').removeClass('in');
			  		$(this).attr("href","/image/original/sid/" + b.SID + "/file/" + file + '/free/' + free);
				} else {
					// console.log('None:: sid or src');
					return false;
				}
	        }
	    });

		$('[data-lock-password]').live({
			'keydown.autocomplete': function(e) {
			    if (e.keyCode == 13) {
			    	$('[data-lock-submit]').click();
				}
			},
			'keyup': function() {
				if ($(this).val()) {
					$('[data-lock-submit]').addClass('btn-primary');
				} else {
					$('[data-lock-submit]').removeClass('btn-primary');
				}
			}
		});

		$('.form-control[type="number"]').live('keydown', function(e) {
			if (e.keyCode == 109 || e.keyCode == 189) {
				return false;
			}
		});

		$('[data-form-submit]').live('click', function() { 
			if($('#flat-modal').length) return;
			var $parent = $(this).parents('.element'),
				$items = $parent.find('[form-idx]'),
				values = {},
				pid = $parent.attr('data-id'),
				submit = true,
				el = '.' + $(this).parents('.element').attr('data-name');

			$parent.find('.error').remove();
			$.each($items, function(i,v) {
				var idx = $(this).attr('form-idx'),
					name = $(this).attr('form-name'),
					type = $(this).attr('form-type'),
					require = $(this).attr('form-require'),
					seq = $(this).attr('form-seq');

				switch(type) {
					case "radio":
					case "check":
						if(type == 'radio') {
							var val = $(this).find(':radio[name]:checked').val();
							values[seq] = (typeof val == 'undefined') ? '' : val;
						} else {
							values[seq] = $(this).find(':checkbox[name]:checked').map(function() { return this.value; } ).get().join();
						}

						if(typeof require != 'undefined' && require) {
							if(!values[seq]) {
								formRequireDisplay($(this),i+1);
								submit = false;
							}
						}
						break;
					case "date":
					case "date2":
						var date = $(this).find('input').map(function() { return this.value.replace(/-/g, ''); } ).get(),
							valid = true;

						$.each(date, function(k,d) {
							if(d=='') valid = false;
						});

						if(typeof require != 'undefined' && require) {
							if(valid == false) {
								formRequireDisplay($(this),i+1);
								submit = false;
							}
						}
						values[seq] = date.join('');
						break;
					case "file.upload":
						var val = '#FILE#||' + $(this).find("input[type='text']").val();
                        values[seq] = (typeof val == 'undefined') ? '' : val;


                        if(typeof require != 'undefined' && require) {
                            if(!values[seq].replace('#FILE#||', '')) {
                                formRequireDisplay($(this),i+1);
                                submit = false;
                            }
                        }
						break;
					default : 
						values[seq] = $(this).val().trim();
						if(values[seq] && checkEmojis(values[seq])) {
							formRequireDisplay($(this),i+1,'emoji');
							submit = false;
						} else if(typeof require != 'undefined' && require) {
							if(!values[seq]) {
								formRequireDisplay($(this),i+1);
								submit = false;
							}
						}
						break;
				}
			});

			var $privacy = $parent.find('.form-privacy'),
				check;

			if($privacy.css('display')!='none') {
				check = $privacy.find('.check-privacy').prop('checked');
				if(check === false) {
					formRequireDisplay($privacy.find('.check-privacy'),'privacy');
					submit = false;
				}
			}

			if($('.form-inline .error').length > 0) {
				var $error = $parent.find('.error');
				var header_height = $('.navbar-fheader').height();
				$.each($error, function(i,v) {
					if(i==0) {
						var $form_group = $(this).parent().find('[form-type]');
						var type = $form_group.attr('form-type');
						var privacy = $(this).parent().hasClass('form-privacy');
						if(type=='radio'||type=='check'||privacy) {
							var form_offset = $(this).parents('.form-group').offset();
							$("html, body").animate({scrollTop: form_offset.top-header_height});
						} else if(type=='date2'){
							var date = $form_group.find('input');
							$.each(date, function(k,d) {
								if(d.value=='') {
									$(this).focus();
									return false;
								}
							});
						} else {
							$(this).parent().find('.form-control').first().focus();
						}
					}
				});
			}

			if(submit) {
				$.processON();
		        $.ajax({
		            url: '/template/forms/submit',
					data: { sid : b.SID, pid : pid, values : values, check : check },
					dataType: 'json',
					type: 'POST',
		            async: true,
		            cache: false,
		            success: function (data) {
					    $.processOFF();
						checkError(data);
						$(this).showModalFlat('INFORMATION',data.done,true,false,'', 'ok', '', 'cl-modal cl-none-title cl-cmmodal cl-p130 cl-s-btn w560');

			    		setDefaultForm(el);
			    		if(typeof formCallback == 'function')
			    			formCallback(pid);
			    	}
				},'json');
			}
		});

		var formRequireDisplay = function($obj,idx,error_type) {
			if(typeof error_type == 'undefined') error_type = '';

			var blang = $obj.parents('.element').attr('data-lang'),
				sdefault = '';

			if(typeof property.SLANG.select != 'undefined') {
				var _lang = property.SLANG.select;
				if(_lang.indexOf('한국어') > -1) {
					sdefault = '필수 입력 사항';
				} else if(_lang.indexOf('English') > -1) {
					sdefault = 'Required';
				} else if(_lang.indexOf('日本語') > -1) {
					sdefault = '必須';
				} else {
					sdefault = 'Required';
				}
			} else sdefault = '필수 입력 사항';


			if(error_type == 'emoji') {
				sdefault = $.lang[LANG]['config.unable.emoji'];
			}
			/*
			if(typeof blang == 'undefined') {
				blang = getLanguage(true);
			}
	        if(blang == 'ko') {
	        	sdefault = '필수 입력 사항';
	        } else if(blang == 'en') {
	            sdefault = 'Required';
	        } else if(blang == 'ja') {
	            sdefault = '必須';
	        } else {
	            sdefault = 'Required';
	        }
			*/
			var $parent = $obj.parents('.form-group'),
				$html = $('<div class="error">' + sdefault + '</div>');
			$parent.append($html);
			if($obj.parents('.form-inline').find('.error').length==1) {
				if(isNumber(idx)) $('body').scrollTo($('[form-idx="' + idx + '"]'), 0, { offset : -150 } );
				else  $('body').scrollTo($parent, 0, { offset : -150 } );
			}
		}

		$('.date-yyyy').live('keyup', function(e) {
			var val = $(this).val();
			if(val.length>=4) {
				if((e.target.selectionStart).length) ;
				else {
					if(isNaN(parseInt(val))) {
						$(this).val('1900');
					}
					$(this).parents('.form-group').find('.date-mm').focus();
				}
			}				
		}).live('blur', function(e) {
			var val = $(this).val();
			if(isNaN(parseInt(val))) {
				$(this).val('1900');
			} else {
				if(parseInt(val)<1900) {
					$(this).val('1900');
				}
			}
		});

		$('.date-mm, .date-dd, .date-hh, .date-ii').live('keyup', function(e) {
			var val = $(this).val();
			if(val.length>=2) {
				if((e.target.selectionStart).length) ;
				else {
					if(isNaN(parseInt(val))) {
						$(this).val('00');
					}
					if($(this).hasClass('date-mm')) {
						$(this).parents('.form-group').find('.date-dd').focus();
					} else if($(this).hasClass('date-dd')) {
						$(this).parents('.form-group').find('.date-hh').focus();
					} else if($(this).hasClass('date-hh')) {
						$(this).parents('.form-group').find('.date-ii').focus();
					} else if($(this).hasClass('date-ii')) {
						// $(this).parents('.form-group').next().find('input').focus();
					}
				}
			}				
		}).live('blur', function(e) {
			var val = $(this).val();
			if(isNaN(parseInt(val))) {
				$(this).val('01');
			} else {
				if(val.length==1) {
					$(this).val('0' + val);
				} else {
					if($(this).hasClass('date-mm') && parseInt(val)>12) {
						$(this).val('12');
					} else if($(this).hasClass('date-dd') && parseInt(val)>31) {
						$(this).val('31');
					} else if($(this).hasClass('date-hh') && parseInt(val)>23) {
						$(this).val('00');
					} else if($(this).hasClass('date-ii') && parseInt(val)>59) {
						$(this).val('00');
					}
				}
			}
		});

		$('[data-lock-submit]').live('click', function() { 
			var el = $(this).closest('.form-inline');
			var pw = el.find('[data-lock-password]').val().trim();
			if(pw.length == 0 ) {
				el.find('[data-lock-password]').focus();
				el.find('.error-text').text('! ' + $.lang[LANG]['config.enter-password']);
				return false;
			}

			$.modalON();
			var url = ($(this).attr('data-lock') == 'site')? '/template/siteLockController/type/pw_check':'/template/menuLockController/type/pw_check';
			$.post(url, {s: b.SMENU, sid: b.SID, page: b.PAGE, pw: pw, publish : b.PUBLISH}, function(data) {
				checkError(data);
				$.modalOFF();
				if(data.result) {
					window.location.reload(true);
				} else {
					el.find('[data-lock-password]').focus();
					el.find('.error-text').text('! ' + $.lang[LANG]['siteum.regexp.pw.invalid']);
				}
			}, 'json');
		});

		$('[data-contact-submit]').live('click',function(e) {
			if($('#flat-modal').length || window.location != window.parent.location) return;
			$.modalON();

		    var el = '.' + $(this).parents('.element').attr('data-name'),
		    	el_id = $(this).parents('.element').attr('data-id'),
		    	google_track = $(this).attr('data-google-track'),
		    	google_track_run = false,
		    	daum_track = $(this).attr('data-daum-track'),
		    	daum_track_run = false,
		    	naver_track = $(this).attr('data-naver-track'),
		    	naver_track_run = false;

			var hasEmoji = false;
			$(el+' .form-group .form-control').each(function() {
				if(checkEmojis($(this).val().trim())) {
					hasEmoji = true;
					return false;
				}
			});

			if(hasEmoji) {
				e.preventDefault();
				$.modalOFF();
				errorEmojisModal();
				return false;
			}

			google_track_run = (typeof google_track != 'undefined') ? true : false;
			daum_track_run = (typeof daum_track != 'undefined') ? true : false;
			naver_track_run = (typeof naver_track != 'undefined') ? true : false;

		    if($(el).length==0 || $(el).length>1) {
		        alert('Invalid form data');
		        return false;
		    }


		    var firstname = ($(el + ' [data-contact-firstname]').length >0 ) ? setDefaultValue($(el + ' [data-contact-firstname]').val().trim()) : '',
		    	lastname = 	($(el + ' [data-contact-lastname]').length > 0) ? setDefaultValue($(el + ' [data-contact-lastname]').val().trim()) : '',
		    	email = 	($(el + ' [data-contact-email]').length > 0) ? setDefaultValue($(el + ' [data-contact-email]').val().trim()) : '',
		    	web = 		($(el + ' [data-contact-website]').length > 0) ? setDefaultValue($(el + ' [data-contact-website]').val().trim()) : '',
		    	phone = 	($(el + ' [data-contact-phone]').length > 0) ? setDefaultValue($(el + ' [data-contact-phone]').val().trim()) : '' ,
		    	subject = 	($(el + ' [data-contact-subject]').length > 0) ? setDefaultValue($(el + ' [data-contact-subject]').val().trim()) : '',
		    	message = 	($(el + ' [data-contact-message]').length > 0) ? setDefaultValue($(el + ' [data-contact-message]').val().trim()) : '',
		    	etc = {};
    		$(el + ' [data-contact-etc]').each(function(i) {
				var key = $(this).attr('data-contact-etc');
				etc[key] = setDefaultValueEtc($(this).attr('type'),$(this));
			});

		    var require_firstname 	= $(el + ' [data-contact-firstname]').attr('data-required'),
		    	require_lastname 	= $(el + ' [data-contact-lastname]').attr('data-required'),
		    	require_email		= $(el + ' [data-contact-email]').attr('data-required'),
		    	require_web			= $(el + ' [data-contact-website]').attr('data-required'),
		    	require_phone		= $(el + ' [data-contact-phone]').attr('data-required'),
		    	require_subject 	= $(el + ' [data-contact-subject]').attr('data-required');

		    /*default:: required[email,message] | optional[firstname,lastname,web,phone,subject]  // data-optional='true'->optional, 'false'->required */
		    var optional_firstname  = $(el + ' [data-contact-firstname]').attr('data-optional'),
		    	optional_lastname   = $(el + ' [data-contact-lastname]').attr('data-optional'),
		    	optional_email		= $(el + ' [data-contact-email]').attr('data-optional'),
		    	optional_web		= $(el + ' [data-contact-web]').attr('data-optional'),
		    	optional_phone		= $(el + ' [data-contact-phone]').attr('data-optional'),
		    	optional_subject	= $(el + ' [data-contact-subject]').attr('data-optional'),
		    	optional_message	= $(el + ' [data-contact-message]').attr('data-optional');
		    var optional_etc		= {};

    		$(el + ' [data-contact-etc]').each(function(i) {
				var key = $(this).attr('data-contact-etc');
				optional_etc[key] = $(this).attr('data-optional');
			});

    		var $parent = $(this).parents('.element'),
    			el = '.' + $(this).parents('.element').attr('data-name'),
		    	contprivacy = $(el+' .form-group.contact-privacy-area').css('display'),
        		contprivacy_display = (typeof contprivacy == 'undefined' || contprivacy == 'none') ? false : true,
    			privacy_check = $parent.find('.contact-checkbox-text'),
				privacy_chk = privacy_check.is(":checked"),
				check = true,
		    	check_option = [];

		    if(!firstname) {
		    	var name_text = ($(el + ' [data-contact-lastname]').length > 0) ? 'first name' : 'name';
		    	if(typeof optional_firstname != 'undefined' && optional_firstname == 'false') check = true;
		    	else if ($(el + ' [data-contact-firstname]').length == 0) check = true;
		    	else check = false;
		    	
		    	var str = ($(el + ' [data-contact-firstname]').attr('data-contact-firstname').length > 0) ? $(el + ' [data-contact-firstname]').attr('data-contact-firstname') : name_text;
		    	if(!check) check_option.push(str);
		    }

		    if($(el + ' [data-contact-lastname]').length > 0 && !lastname) {
		    	if(typeof optional_lastname != 'undefined' && optional_lastname == 'false') check = true;
		    	else if ($(el + ' [data-contact-lastname]').length == 0) check = true;
		    	else check = false;
		    	
		    	var str = ($(el + ' [data-contact-lastname]').attr('data-contact-lastname').length > 0) ? $(el + ' [data-contact-lastname]').attr('data-contact-lastname') : 'last name';
		    	if(!check) check_option.push(str);
		    }

		    /*if((!firstname && typeof optional_firstname != 'undefined' && optional_firstname == "false") || (!lastname && typeof optional_lastname != 'undefined' && optional_lastname == "false")) {
		    	var str = ($(el + ' [data-contact-firstname]').attr('data-contact-firstname').length > 0) ? $(el + ' [data-contact-firstname]').attr('data-contact-firstname') : 'name';
		    	check_option.push(str);
		    }*/
		    
		    if(!web && typeof optional_web != 'undefined' && optional_web == 'false') {
		    	var str = ($(el + ' [data-contact-web]').attr('data-contact-web').length > 0) ? $(el + ' [data-contact-web]').attr('data-contact-web') : 'web';
		    	check_option.push(str);
		    }

		    if(!phone && typeof optional_phone != 'undefined' && optional_phone == 'false') {
		    	var str = ($(el + ' [data-contact-phone]').attr('data-contact-phone').length > 0) ? $(el + ' [data-contact-phone]').attr('data-contact-phone') : 'phone';
		    	check_option.push(str);
		    }

		    if(!subject && typeof optional_subject != 'undefined' && optional_subject == 'false') {
		    	var str = ($(el + ' [data-contact-subject]').attr('data-contact-subject').length > 0) ? $(el + ' [data-contact-subject]').attr('data-contact-subject') : 'subject';
		    	check_option.push(str);
		    }

		    if(!email) {
		    	if(typeof optional_email != 'undefined' && optional_email == 'true') check = true;
		    	else if ($(el + ' [data-contact-email]').length == 0) check = true;
		    	else check = false;
		    	
		    	var str = ($(el + ' [data-contact-email]').attr('data-contact-email').length > 0) ? $(el + ' [data-contact-email]').attr('data-contact-email') : 'email';
		    	if(!check) check_option.push(str);
		    }
		    if(!message) {
		    	if(typeof optional_message != 'undefined' && optional_message == 'true') check = true;
		    	else check = false;

		    	var str = ($(el + ' [data-contact-message]').attr('data-contact-message').length > 0) ? $(el + ' [data-contact-message]').attr('data-contact-message') : 'message';
		    	if(!check) check_option.push(str);
		    }

		   	$.each(etc,function(k,v){
		   		if(!etc[k] && typeof optional_etc[k] != 'undefined' & optional_etc[k] == 'false') {
		   			check_option.push(k);
		   		}
		   	});

		   	check = ((check_option.length == 0) && ((contprivacy_display == false) || (privacy_chk == true))) ? true : false;

		    if(require_firstname == 'true' && !firstname) {
		    	$(this).showModalFlat('INFORMATION',$(el + ' [data-contact-firstname]').attr('placeholder') + $.lang[LANG]['check.required'], true, false, '', 'ok');
		    	return false;
		    }

		    if(require_lastname == 'true' && !lastname) {
		    	$(this).showModalFlat('INFORMATION',$(el + ' [data-contact-lastname]').attr('placeholder') + $.lang[LANG]['message.check.required'], true, false, '', 'ok');
		    	return false;
		    }

		    if(require_web == 'true' && !web) {
		    	$(this).showModalFlat('INFORMATION',$(el + ' [data-contact-website]').attr('placeholder') + $.lang[LANG]['message.check.required'], true, false, '', 'ok');
		    	return false;
		    }

		    if(require_phone == 'true' && !phone) {
		    	$(this).showModalFlat('INFORMATION',$(el + ' [data-contact-phone]').attr('placeholder') + $.lang[LANG]['message.check.required'], true, false, '', 'ok');
		    	return false;
		    }

		    if(require_subject == 'true' && !subject) {
		    	$(this).showModalFlat('INFORMATION',$(el + ' [data-contact-subject]').attr('placeholder') + $.lang[LANG]['message.check.required'], true, false, '', 'ok');
		    	return false;
		    }

		    if(check) {
		    	$.post('/template/update/type/contact',{
		    		id : b.SID,
		    		seq : el_id,
		    		s : 'message',
		    		firstname : firstname,
		    		lastname : lastname,
		    		email : email,
		    		web : web,
		    		phone : phone,
		    		subject : subject,
		    		message : message,
		    		etc : JSON.stringify(etc),
		    	}, function(data) {
		    		checkError(data);
		    		if(typeof data.error == 'undefined' || data.error == '') {
		    			var ch_lang = getLang($(el), b.SID),
		    				submit_txt = (typeof data.submitStr != 'undefined' && data.submitStr) ? data.submitStr : $.lang[ch_lang]['message.sent'];
		    				
			    		$(this).showModalFlat('INFORMATION',submit_txt,true,false, '', 'ok', '', 'cl-modal cl-none-title cl-cmmodal cl-p130 cl-s-btn w560');
			    		setDefaultContactForm(el);
			    		setDefaultContactFormEtc(el);
			    		if(typeof contactCallback == 'function')
			    			contactCallback();
		    		}
		    	},'json');
			    setTimeout(function() {
				    $.modalOFF();
			    },1000);
		    } else {
		    	$.modalOFF();
		    	var check_str = '';
		    	$.each(check_option,function(k,v) {
		    		check_str = (check_str) ? check_str + ' / ': '';
		    		check_str = check_str + v;
	            });
	            
		    	if(check_str) {
		    		var modal = $(this).showModalFlat('INFORMATION',check_str+ $.lang[LANG]['message.check.required'],true,false, '', 'ok', '', 'cl-modal cl-none-title cl-cmmodal cl-p130 cl-s-btn w560');
		    	} else {
		    		var modal = $(this).showModalFlat('INFORMATION',$.lang[LANG]['message.privacy.check.required'],true,false, '', 'ok');
		    	}
		    	
		    }					    
		});	
	
		$('.contact-privacy-text').live('click',function() {
			var contactEL = $(this).parents('.element'),
				contactPriavcy = $(contactEL).find('.form-inline .contact-privacy-area .contact-privacy-box'),
				checkType = (typeof $(contactEL).attr('data-type') != 'undefined' && $(contactEL).attr('data-type') == 'contact') ? true : false;

			if(checkType && contactPriavcy.length > 0) {
				if(contactPriavcy.css('display') == 'none') contactPriavcy.show();
				else contactPriavcy.hide();
			}
		});
		
		$('.gallery-loadmore').live({
		    click: function() {
				var id = $(this).data('id'),
					gpage = $(this).data('page'),
					view = $(this).data('view'),
					mode = $(this).data('mode'),
					$galleryELLoadmore = $(this),
					$galleryEL = $('.element[data-id="' + id + '"]'),
					$gContainer = $galleryEL.find('.container'),
					$gLoop = $galleryEL.find('[data-loop="true"]'),
					$gc =  $galleryEL.find('.gallery-category-nav li.active'),
					sfl = ($gc.index() > 0) ? 'category' : '',
					stx = (sfl) ? $gc.text().trim() : '';
					
		        var val = galleryEL[id],
		        	tag = htmlspecialchars_decode(val.eltag,'ENT_QUOTES'),
		        	g_settings = (typeof val.elsettings != 'undefined' && val.elsettings) ? $.parseJSON(val.elsettings) : {},
		        	folder = (typeof val.folder != 'undefined' && val.folder > 0) ? val.folder : '',
		        	isMasonry = $galleryELLoadmore.hasClass('masonry-layout'),
		        	block_lang = (typeof g_settings.blocklang != 'undefined') ? g_settings.blocklang : LANG;

		        var nodes = $gLoop.clone().children(),
					total = 0,
					items = 0,
					gallery_item = '';

				var el_gh = $(tag).find('.goption').attr('data-gh'),
					checkGalleryHeight = (typeof el_gh != 'undefined' && el_gh) ? true : false,
					checkGallerySVG = ($(tag).find('.gimg-svg-wrap').length > 0) ? true : false,
					checkGFrameTitleOFF = (val.mode == 'gallery' && (typeof g_settings.gframe_title_visible != 'undefined' && g_settings.gframe_title_visible == 'OFF')) ? true : false;

				if(id == 'all_products') {
		       		sfl = 'orderby';
		       		stx = (typeof $gc.find('a').attr('data-idx') != 'undefined') ? $gc.find('a').attr('data-idx') : $('.allProducts-sort-list>li:first-child').find('a').attr('data-idx');
		       	}				

		        $.ajax({
		            url: '/template/gallery/list/pid/' + id + '/sid/' + property.SID + '/spage/' + property.PAGE + '/page/' + gpage + '/view/' + view + '/publish/' + property.PUBLISH,
					data: { g_mode: mode, visible: true, sfl: sfl, stx: stx },
					dataType: 'json',
					type: 'POST',
		            async: false,
		            cache: false,
		            success: function (data) {
		            	$.cookie('gallery-page-' + id, gpage, { path: '/', expires: 12 * 60 * 60 * 1000 });
		                $.cookie('gallery-category-' + id, stx, { path: '/', expires: 12 * 60 * 60 * 1000 });
		                var loop_count = nodes.length;

                        total = (typeof data.total.list_total != 'undefined') ? data.total.list_total : data.total;
		                items = data.list.length;

		                var g_popup_remove = $('.galleryPL'+id+'.gallery-popup').find('.gallery-item');
		                $.each(g_popup_remove,function(i,v) {
		                	if(items > i) {
		                		$(this).remove();
		                	}
		                });

		                $.each(data.list,function(i,v) {
		                    loop_pos = i%loop_count;
		                    c = nodes[loop_pos];
		                    item_index = ((gpage-1)*loop_count) + i;
							$(c).addClass('gallery-item').attr('data-index',item_index).attr('data-seq',v.seq);

                            var vgsettings = (typeof v.gsettings != 'undefined' && v.gsettings) ? $.parseJSON(v.gsettings) : {},
						        img_path = (typeof vgsettings['storage'] != 'undefined') ? vgsettings['storage'] : _this.b.RESOURCE + '/' + _this.b.SID + '/',
						        img_original = (typeof vgsettings['storage'] != 'undefined') ? img_path + '1920/' : img_path;

							var src = getServeImage(v.image,folder,img_path),
								src_s0 = getServeImage(v.image,'0',img_path);
							$(c).find('img').attr('src',src);
							if(checkGalleryHeight) $(c).find('.g-img').css('background-image', 'url('+src+')');
							if(checkGallerySVG) {
								var gimgSVG = $(c).find('.gimg-svg-wrap svg');
								gimgSVG.find('pattern').attr('id','gimgSvg_'+val.elname+'_'+item_index);
								gimgSVG.find('image').attr('xlink:href', src);
								gimgSVG.find('polygon').attr('fill', 'url(#gimgSvg_'+val.elname+'_'+item_index+')');
							}
							
							var glink = (typeof vgsettings['glink'] != 'undefined' && vgsettings['glink']) ? vgsettings['glink'] : '',
								glink_target = (typeof vgsettings['glink_target'] != 'undefined' && vgsettings['glink_target']) ? vgsettings['glink_target'] : '';

							if(glink) {
								if(glink.match(/^\@/g) !== null) {															// link-type: link-bookmark ==> a[attr-bookmark]
									var bookmark_seq = glink.replace(/^\@/g,'');
									if(typeof _this.b.SETTINGS.blockBookmarkList == 'undefined' || typeof _this.b.SETTINGS.blockBookmarkList['bookmark' + bookmark_seq] == 'undefined') {
										glink = '';
										glink_target = '';
									}
								} else if(glink.match(/^flink\@[0-9]/gi) !== null) {										// link-type: link-file     ==> a[attr-flink]
									glink_target = '';
								} else if($.inArray(glink.replace(/^\//g,'').replace(/ /g,'-'),_this.b.MENULIST) > -1) {	// link-type: link-menu     ==> a[data-user-link]
								} else {																					// link-type: link-out      ==> a[attr-link]
									if(checkBase64Encode(glink)) glink = Base64.decode(glink);
								}
							}

							$(c).find('a').removeAttr('data-gallery').removeAttr('data-user-link').removeAttr('attr-bookmark').removeAttr('attr-link').removeAttr('attr-flink');
							if (typeof v.price_hidden != 'undefined' && v.price_hidden == 'ON' && property['SITEUM'] >= 1) {
								$(c).addClass('gallery-item').addClass('nonePrice');
								$(c).find('a').attr('href', '#');
							} else {
                                if(glink) {
									var glink_val = makeLinkUrl(glink, b.ONE, b.VIEW);
									$(c).find('a').attr('href',glink_val);

									if(glink.match(/^\@/g)) {
										$(c).find('a').attr('attr-bookmark',glink.replace(/^\@/g,''));
									} else if(glink.match(/^flink\@[0-9]/g)) {
										$(c).find('a').attr('attr-flink',glink.replace(/^flink\@/g,''));
									// IE ERROR_includes__H.20210603
									// } else if(_this.b.MENULIST.includes(glink.replace(/ /g,'-'))) {
									} else if($.inArray(glink.replace(/ /g,'-'),_this.b.MENULIST) > -1) {
										$(c).find('a').attr('data-user-link',glink_val);
									} else {
										$(c).find('a').attr('attr-link',glink);
									}
                                } else {
									if (val.mode == 'gallery') {
										src_s0 = src_s0 + '?gpos='+v.pos;

										$(c).find('a').attr('href', src_s0);
										$(c).find('a').attr('data-gallery', '#gframe-' + val.seq);
									} else {
										if(val.seq == 'all_products') {
											$(c).find('a').attr('href', v.product_url);
											$(c).removeClass('nonePrice');
										} else {
											$(c).find('a').attr('href', ((b.URL=='/') ? '' : b.URL) + '/' + b.PAGE + '/view/' + v.seq);
										}
									}
	                            }
	                        }

		                    if(glink_target == '_blank') $(c).find('a').attr('target','_blank');
		                    else $(c).find('a').removeAttr('target');

							if(v.title.length==0) v.title = $.lang[block_lang]['editor.block.gallery.sample.title'];;
							if(v.caption.length==0) v.caption = $.lang[block_lang]['editor.block.gallery.sample.caption'];;

							if(checkGFrameTitleOFF) $(c).find('a').attr('data-title', '');
							else $(c).find('a').attr('data-title', v.title);

		                    // caption
		                    var ftitle = $(c).find('h5.figure'),
		                        fcaption = $(c).find('p.figure'),
		                        fdatetime = $(c).find('.figure.datetime'),
		                        fhashtag = $(c).find('.figure.hashtag'),
		                        fprice = $(c).find('.figure.price'),
								freview = $(c).find('.figure.review');

		                    // datetime / hashtag
		                    if(fdatetime.length<1) {
		                        $(c).find('figcaption').append('<div class="figure datetime hide"></div>');
		                        fdatetime = $(c).find('.figure.datetime');
		                    }
		                    if(fhashtag.length<1) {
		                        $(c).find('figcaption').append('<div class="figure hashtag hide"></div>');
		                        fhashtag = $(c).find('.figure.hashtag');
		                    }

		                    $(c).find('figcaption').removeClass('hide');
							if(v.title || v.caption) {
								var gallery_caption = v.caption;
								gallery_caption = gallery_caption.replace(/\n/g,'<br />');

								ftitle.html(v.title);
								fcaption.html(gallery_caption);
								fdatetime.text(v.datetime);
								fhashtag.text(v.hashtag);
							}
							if(mode == 'shopping' || id == 'all_products') {

								var checkPriceHidden = (typeof v.price_hidden != 'undefined' && v.price_hidden == 'ON') ? true : false,
									gallery_price = (v.price && !checkPriceHidden) ? v.price : 0,
									gallery_sale_price = (typeof v.sale != 'undefined' && v.sale > 0 && !checkPriceHidden) ? v.sale : 0,
									gallery_sale_per = (typeof v.sale_per != 'undefined' && v.sale_per && !checkPriceHidden) ? v.sale_per : '',
									product_soldout = (typeof g_settings.sh_soldout == 'string') ? g_settings.sh_soldout : '구매불가',
									product_status = ((v.status == 'off' || (v.quantity_on == 'on' && v.quantity < 1)) && product_soldout && !checkPriceHidden) ? '<span class="cl-sh-soldout">' + product_soldout + '</span>' : '';

								$(c).find('.cl-sh-soldout').remove();
								if(product_status != '') $(c).attr('data-soldout',true);
								else $(c).removeAttr('data-soldout');

								if($(c).find('ul.figure.price').length > 0) {
									//Ver02
									if(!checkPriceHidden) {
										$(c).find('ul.figure.price .price-val').html('￦' + gallery_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
										$(c).find('ul.figure.price .price-val').removeClass('hide');

										if(gallery_sale_price > 0) {
											$(c).find('ul.figure.price .price-sale').html('￦' + gallery_sale_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
											$(c).find('ul.figure.price .price-sale-per').html(gallery_sale_per);
											$(c).find('ul.figure.price .price-sale, ul.figure.price .price-sale-per').removeClass('hide');
										} else {
											$(c).find('ul.figure.price .price-sale, ul.figure.price .price-sale-per').addClass('hide').html('');
										}
									} else {
                                        $(c).find('ul.figure.price .price-val').html('￦0');
                                        $(c).find('ul.figure.price .price-val').removeClass('hide');
									}

									if(product_status) $(c).find('ul.figure.price').append('<li>'+product_status+'</li>');

								} else {
									//Ver01
									if(fprice.length == 0) fprice = fcaption;

									if(checkPriceHidden) fprice.html('');
									else fprice.html('<span class="figure-krw">￦</span>' + gallery_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',') + product_status);
								}

								if($(c).find('ul.figure.review').length > 0) {
									var gallery_review = (v.review_onoff && v.review_cnt) ? v.review_cnt : 0;
									if(gallery_review > 0) {
										$(c).find('ul.figure.review, ul.figure.review li').removeClass('hide');
										$(c).find('ul.figure.review .figure-review-cnt').html(gallery_review);
										$(c).find('ul.figure.review .figure-review-score').html(v.review_score);
									} else {
										$(c).find('ul.figure.review, ul.figure.review li').addClass('hide');
										$(c).find('ul.figure.review .figure-review-cnt, ul.figure.review .figure-review-score').html('');
									}
								}

							} else {
								fprice.addClass('hide');
								freview.addClass('hide');
							}
		                    
		                    if(isMasonry) {
		                        gallery_item = gallery_item + $(c)[0].outerHTML;
		                    } else {
		                        $gLoop.append($(c)[0].outerHTML);    
		                    }
		                });
		            }
		        });
				changeBrokenImages($galleryEL);

				if(isMasonry) {
					var $gallery_items = $(gallery_item);
					$gallery_items.hide();

					$('.gallery-loadmore[data-id="' + id + '"]').before('<div class="gallery-loading-status"><div class="loading-dots"></div></div>');
					var process_index = 0;		            
					$gallery_items.imagesLoaded().progress(function(imgload, image) {
						process_index++;
						var $item = $(image.img).parents('.grid');
						$item.show();
						if(items == process_index) {
							reloadMasonry($gContainer,$gallery_items);

							if(checkGalleryHeight) refreshGalleryHeight();
							refreshGalleryField($galleryEL,g_settings);
						}
					});
				} else {
					if(checkGalleryHeight) refreshGalleryHeight();
					refreshGalleryField($galleryEL,g_settings);
				}

				var cookie_page = gpage,
					new_view = (view > total) ? total : view,
					cookie_view = ( (cookie_page*new_view) > total ) ? total : cookie_page*new_view;

				$galleryEL.find('.display').text(cookie_view);

				if(total<=cookie_view) $('.gallery-loadmore[data-id="'+id+'"]').fadeOut();
				if(items) $galleryELLoadmore.data('page', cookie_page + 1);

				if($galleryEL.find('*[data-direffect="true"]').length > 0 ) {
					setTimeout(function() {
						$galleryEL.find('.grid').each(function() {
							$(this).hoverdir();
						});
					}, 400);
				}
			}
		});

		$('.gallery-loadmore, .data-feed-load-more').live('touchstart', function (e) {
			var g_color = $(this).css('color'),
				g_bgcolor = $(this).css('background-color'),
				g_bdcolor = $(this).css('border-color');

			if(isMobile()) {
				$(this).css('color', g_color);
				$(this).css('background-color', g_bgcolor);
				$(this).css('border-color', g_bdcolor);
			}
		});
		
		$('.gallery-item a[title]').live('mouseenter', function () {
		    $(this).tooltip('destroy');
		});

		$('.gallery-item a:not([attr-flink])').live({
			click : function(e) {
		    	e.preventDefault();

				var loc = $(this).attr('href'),
					mode = $(this).attr('data-gallery'),
					menu_link = $(this).attr('data-user-link'),
					bookmark = $(this).attr('attr-bookmark'),
					blank = $(this).attr('target'),
					user_link = $(this).attr('attr-link');


				if( (typeof mode!='undefined' && mode.length>0) ||
					(typeof menu_link!='undefined' && menu_link.length>0) ||
					// (typeof user_link!='undefined' && user_link.length>0) ||
					(typeof bookmark!='undefined' && bookmark.length>0) 
				) return;

				if(typeof blank!='undefined' && blank.length) {
					var url = (typeof user_link != 'undefined' && user_link.match('^(tel:|mailto:|sms:)') === null) ? makeLinkUrl(user_link, b.ONE, b.VIEW) : loc;
					var openNewWindow = window.open(url);
				} else {
					if(typeof user_link != 'undefined' && user_link.match('^(tel:|mailto:|sms:)') !== null) {
						location.href=loc;
					} else {
						var url = new getLocation(loc);
						golink(_this,url);
					}
		    	}

		    	// 	uri = (b.PUBLISH) ? loc : loc.replace('/render/',''),
		    	// 	attr = $(this).attr('attr-link');

		    	// if(typeof attr!='undefined' && attr) return;
	    		// _this.history.pushState(null,b.TITLE,(b.PUBLISH) ? '/' : '/render/' + uri);
			}
		});

		$('.gallery-item').live('click', function(e) {
			if($(this).find('[attr-flink]').length > 0 ) {
				e.preventDefault();
				return false;
			}

			var pid = $(this).parents('.element').attr('data-id');
		    $('.blueimp-gallery').addClass('blueimp-gallery-controls');
		    $('.blueimp-gallery a.view-original').remove();
		    if($(this).find('a').attr('data-img-original') == 'ON') {
			    $('.blueimp-gallery a.close').after('<a class="view-original" data-id="' + pid + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M24 22.94l-6.42-6.42C19.08 14.76 20 12.49 20 10c0-5.52-4.48-10-10-10S0 4.48 0 10s4.48 10 10 10c2.49 0 4.76-0.92 6.52-2.42L22.94 24 24 22.94zM1.5 10c0-4.69 3.81-8.5 8.5-8.5 4.69 0 8.5 3.81 8.5 8.5s-3.81 8.5-8.5 8.5C5.31 18.5 1.5 14.69 1.5 10z"/><polygon points="10.75 6 9.25 6 9.25 9.25 6 9.25 6 10.75 9.25 10.75 9.25 14 10.75 14 10.75 10.75 14 10.75 14 9.25 10.75 9.25 "/></svg></a>');
			}
			$('.blueimp-gallery').find('h3.title').text($(this).find('a').attr('data-title'));

		   	$.cookie('gallery-item', $(this).attr('data-seq'), { path : '/', expires: 12 * 60 * 60 * 1000 });
		   	if(b.PARENT.prev != null) $('.data-page-prev').addClass('active');
		   	if(b.PARENT.next != null) $('.data-page-next').addClass('active');
			e.stopPropagation();
		});

		$('body').on('click','.blueimp-gallery a.view-original', function(e) {
		    var idx = 0,
		        eid = $(this).attr('data-id');
		    $('#gframe-' + eid + ' .slide').each(function(i,v) {
		        var trans = $(v).attr('style');
		        if(trans.indexOf('translate(0px, 0px)') > -1 || trans.indexOf('transform: translate(0px) translateZ(0px)') > -1) {
		            idx=i;
		        }
		    });
		    var src = $('#gframe-' + eid + ' .slide[data-index="' + idx + '"] > img').attr('src');

		    $('.blueimp-gallery a.view-original').attr('href',src).attr('target','_blank');
		    e.stopPropagation();
		});

		$('.element[data-type="contact"] .google-map .gm-fullscreen-control').live('click', function(e) {
			$(this).toggleClass('gm-open');

			if(!$(this).hasClass('gm-open')) {
				var el = $(this).closest('.element').attr('data-el');
				scrollToBlock('.'+el,300);
			}
		});

		/* page count */
		if(Object.keys(b.CONTENTS).length) {
			var ps_elupdate = this.contentUpdate(b.CONTENTS),
				vpmode = (typeof $('.mobilepc_ch').attr('data-desktop-option') != 'undefined') ? $('.mobilepc_ch').attr('data-desktop-option') : b.SETTINGS.viewportMode;
			ps_elupdate.then(function() {
				elFooter();
				if(b.COUNT) {
					if(b.PARENT.mode == 'shopping') {
						if(typeof property.PRODINFO === 'object') $.products.display_info();
						if($('#review-onoff').val() == 'true') $.products.review(b.VIEW,b.PAGE);
						if($('#qna-onoff').val() == 'true') $.products.qna(b.VIEW,b.PAGE);
					} else {
						if(b.VIEW) _this.displayComment(b.VIEW);
					}
				}
			}).then(function() {
		        // if(typeof b.SETTINGS.viewportMode != 'undefined' && b.SETTINGS.vpMode_onoff===true) {
		        // 	console.log(b.SETTINGS.zoom);
		        // 	$.mpcWeb.mpcWebhtml(vpmode,b.CONTENTS,b.SETTINGS.zoom);
		        // }
			}).then(function() {
				if(b.VIEW && b.PARENT.mode != 'shopping') displayPageToolbar();
			}).then(function() {
	    		if(b.VIEW && b.PARENT.mode != 'shopping') displaySnsShare(b.PARENT.pid);
			}).then(function() {
	    		if(b.VIEW && b.PARENT.mode != 'shopping') displayBottomNav(b.PARENT.pid);
	    	}).then(function() {
				if(b.VIEW && b.PARENT.mode != 'shopping') displayBottomList(b.PARENT.pid);
			}).then(function() {
				var ismodeSm = ($('.cl-s-page').hasClass('mode-shopping')) ? true : false;
				if(b.VALIDPLAN) {
					if(!ismodeSm && b.ONE && !b.VIEW || b.PAGE == b.MENULINK[0] && !b.VIEW)	setSitePopup(); 
				} 
				if(b.VALIDPLAN && (b.VALIDTYPE == 'BN' || b.VALIDTYPE == 'SM')) {
					if(typeof b.SETTINGS.fnav != 'undefined' && !$.isEmptyObject(b.SETTINGS.fnav)) $.fnav.draw(b.SETTINGS.fnav);
				}

				if(typeof b.SETTINGS.viewportMode != 'undefined' && b.SETTINGS.vpMode_onoff===true) mobileWebfnavCheck(vpmode);
	    	});
		} 
		else {
			var checkUrl = b.PAGE.split(","),
				vpmode = '';
				vpmode = $.mpcWeb.mpcGetVpmode(vpmode,b.SETTINGS);

			isMenuLock(function() {
				if(property.ISLOCK == 'false') {
					if(property.COUNT==0) {
						elFooter();
						if(checkUrl[0] == "forum" && b.VIEW) {				
							if(typeof b.SETTINGS.viewportMode != 'undefined' && b.SETTINGS.vpMode_onoff===true) {
								$.mpcWeb.mpcWebhtml(vpmode,b.CONTENTS,b.SETTINGS.zoom);
							}
							var ps_fmview = $.forum.view(b.VIEW);
							ps_fmview.then(function() {
								_this.displayComment(b.VIEW);
							}).then(function() {
								if(b.VIEW) {
									displaySnsShare(b.PARENT.pid);
									displayBottomNav(b.PARENT.pid);
									displayBottomList(b.PARENT.pid);
								}
								if(b.VALIDPLAN && (b.VALIDTYPE == 'BN' || b.VALIDTYPE == 'SM')) {
									if(typeof b.SETTINGS.fnav != 'undefined' && !$.isEmptyObject(b.SETTINGS.fnav)) $.fnav.draw(b.SETTINGS.fnav);
								}
								if(typeof b.SETTINGS.viewportMode != 'undefined' && b.SETTINGS.vpMode_onoff===true) {
									$.mpcWeb.mpcWebhtml(vpmode,'',b.SETTINGS.zoom);
									mobileWebfnavCheck(vpmode);
								}
							});
						}

						if(property.PAGE == 'psearch') {
							vpmode = $.mpcWeb.mpcGetVpmode(vpmode,property.SETTINGS);

							if(typeof property.SETTINGS.viewportMode != 'undefined' && property.SETTINGS.vpMode_onoff===true) $.mpcWeb.mpcWebhtml(vpmode,property.CONTENTS,property.SETTINGS.zoom);

							setTimeout(function() {
								if(property.VALIDPLAN && (property.VALIDTYPE == 'BN' || property.VALIDTYPE == 'SM')) {
									if(typeof property.SETTINGS.fnav != 'undefined' && !$.isEmptyObject(property.SETTINGS.fnav)) $.fnav.draw(property.SETTINGS.fnav);
								}
								if(typeof property.SETTINGS.viewportMode != 'undefined' && property.SETTINGS.vpMode_onoff===true) mobileWebfnavCheck(vpmode);
							}, 500);
						}

						var ismodeSm = ($('.cl-s-page').hasClass('mode-shopping')) ? true : false;
						if(b.VALIDPLAN) {
							if(!ismodeSm && b.ONE && !b.VIEW || b.PAGE == b.MENULINK[0] && !b.VIEW){
								setSitePopup(); 
							} 
						}
						if(b.VALIDPLAN && (b.VALIDTYPE == 'BN' || b.VALIDTYPE == 'SM')) {
							if(typeof b.SETTINGS.fnav != 'undefined' && !$.isEmptyObject(b.SETTINGS.fnav)) $.fnav.draw(b.SETTINGS.fnav);
						}

						if(typeof b.SETTINGS.viewportMode != 'undefined' && b.SETTINGS.vpMode_onoff===true) {
							$.mpcWeb.mpcWebhtml(vpmode,'',b.SETTINGS.zoom);
							mobileWebfnavCheck(vpmode);
						}
					}
				} else {
					elFooter();
				}
			});
		}
		
		if(typeof b.SETTINGS.hideScrollTop == 'undefined') {
			$('#goto-top').fadeOut(200).css('visibility','visible');
		}

	    $(window).load(function() {
    	 	var p_settings = (b.PARENT.settings) ? jQuery.parseJSON(b.PARENT.settings) : {};
	 		if((typeof p_settings.sns_share_display == 'undefined' || !p_settings.sns_share_display || p_settings.sns_share_display=='OFF') && 
	 			(typeof p_settings.bottomNav_display == 'undefined' || !p_settings.bottomNav_display || p_settings.bottomNav_display=='OFF')) {
	 			$('.tpl-page-footer').addClass('hide');
	 		} 

			if($('#page-loading-css').length > 0) {
				if($('header.navbar').hasClass('navbar-fheader')) $.fheader.position();
				$('#page-loading-css').remove(); 
			}

	    	$('#no-fouc').css('opacity','1');
	        if(typeof $.cookie('gallery-item') != 'undefined' && b.VIEW == '') {
	        	moveGallery($.cookie('gallery-item'));
	        }
	        moveScroll(0);
		    _this.loaded();
		    var musicPlay = true;
		    if(typeof b.SETTINGS.musicStop != 'undefined' && (b.SETTINGS.musicStop === true || b.SETTINGS.musicStop == 'true'))
		    	musicPlay = false;

		    if(typeof b.SETTINGS.musicUse != 'undefined' && (b.SETTINGS.musicUse === true || b.SETTINGS.musicUse == 'true'))
				$.musicON(musicPlay);

			if(musicPlay == false) $.musicPause();
			var used_disk_value = b.USED_DISK / 1024,
				used_disk = Math.ceil(used_disk_value); // byte으로 가져와서 megsabyte으로 변한다

			if(Number(b.DISK_SPACE) != -1 && (used_disk > b.DISK_SPACE) && (b.MB_LEVEL != 10)) setlimitdiskPopup();

			// menu sidebar - height overflow
			if($('body').width() > 768) {
				$('header.navbar-li #fixed-menu > li.dropdown').live({
					mouseenter: function(e) {
						var this_bottom = $(this).find('.cl-icon').position().top + $(this).find('.cl-icon').height();
						$(this).find('.dropdown-menu').css({
							'top': this_bottom+'px',
						});
					},
					mouseleave: function(e) {
						$(this).find('.dropdown-menu').removeAttr('style');
					}
				});

				$('.sidebar .nav li.dropdown').live({
					mouseenter: function(e) {
						var checkSubMenuPosition = $(this).find('.dropdown-menu').css('position');
						if(checkSubMenuPosition == 'absolute') {
							var this_top = $(this).offset().top - $(document).scrollTop();
							if($(this).closest('header').parent('#element-display').length > 0) this_top -= $(this).closest('header').parent('#element-display').offset().top;

							$(this).find('.dropdown-menu').css({
								'position': 'fixed',
								'top': this_top+'px',
								'left': '260px'
							});
						}
					},
					mouseleave: function(e) {
						$(this).find('.dropdown-menu').removeAttr('style');
					}
				});
			} else {
				$('header.navbar-li #fixed-menu > li.dropdown').find('.dropdown-menu').removeAttr('style');
				$('header.sidebar #tpl-menu > li.dropdown').find('.dropdown-menu').removeAttr('style');
			}


			if(typeof $.cookie('ci_goto-gallery') != 'undefined' && $.cookie('ci_goto-gallery')) {
				var goto_gallery = '.element[data-id="' + $.cookie('ci_goto-gallery') + '"]',
					cookie_domain =  (property.HOST.indexOf(':') > -1) ? property.HOST.substring(0,property.HOST.indexOf(':')) : property.HOST;
				if($(goto_gallery).length > 0) {
					scrollToBlock(goto_gallery, 1000);
				}
				$.cookie('ci_goto-gallery', '', { domain: '.' + cookie_domain,expires: -1 });
				$.cookie('ci_goto-gallery-cate', '', { domain: '.' + cookie_domain,expires: -1 });
			}

			if(isAosBlock) {
				$('body,html').addClass('aos-height');
				$('html').addClass('aos-overflowX');
				
				if(window.innerWidth < 769) {
					$('body').addClass('aos-overflowX');
				}

				if($('header.navbar').hasClass('navbar-fheader')) $.fheader.position();
			}

	    });
    },
    contentUpdate : function(contents) {
    	// console.log(' page draw:: contentUpdate');

	    var deferred = $.Deferred();
    	var b = this.b,
    		_this = this,
    		idx = 0;

    	var checkSiteLock = isSitePasswordLock();
		checkSiteLock.then(function() {
			isMenuLock(function() {
				var default_t_css = '', default_m_css  = '';
				var checkGalleryView = (b.VIEW && b.PAGE.match(/^forum,/g) === null) ? true : false,
					page_pos = 0,
					site_settings = (typeof b.SETTINGS != 'undefined' && b.SETTINGS) ? b.SETTINGS : {},
					vpmode = '';
					vpmode = $.mpcWeb.mpcGetVpmode(vpmode,b.SETTINGS);

					if(typeof b.SETTINGS.viewportMode != 'undefined' && b.SETTINGS.vpMode_onoff===true) {
			        	//alert('mpcWebhtml');
			        	$.mpcWeb.mpcWebhtml(vpmode,b.CONTENTS,b.SETTINGS.zoom);
			        }
			    
		    	$.each(contents, function(i,v) {
		    		page_pos += 1;
		    		
		    		var c = v.element,
		    			$el = $('.' + c.elname),
		    			msny = (c.feature=='masonry') ? true : false;

		            if(b.ONE && c.orgpos==1)  $el.addClass('link-to-'+c.orgpage.replace(/ /g,'-'));

	             	var settings = (c.elsettings == '' || typeof c.elsettings == 'undefined') ? {} : $.parseJSON(c.elsettings),
	             		block_lang = (typeof settings.blocklang != 'undefined') ? settings.blocklang : LANG;

             		if(c.type == 'video') {
		                if($el.find('.video-gallery-url').length > 0) c.mode = 'zoom';
		                else c.mode = 'thumb';
		            }

		            $el.addClass('el_' + idx)
		            	.addClass('element')
		                .attr('data-id', c.seq)
		                .attr('data-el','el_' + idx)
		                .attr('data-pos', c.pos)
		                .attr('data-name', c.elname)
		                .attr('data-msny', msny)
		                .attr('data-type', c.type)
		                .attr('data-type2', c.type2)
		                .attr('data-mode', c.mode)
		                .attr('data-width', c.folder)
		                .attr('data-overlap',c.overlap);

		            if($el.length > 1 && c.type == 'showcase') {
			            $($el).each(function(i, v) {
			           		if(i>0) v.dataset['el'] = '';
			            });
		            }

	              	var blocklang = '';
					if(typeof settings.blocklang != 'undefined') {
		                blocklang = settings.blocklang;
		                $el.attr('data-blocklang',blocklang);
		            }

					if(checkGalleryView) {
						if(c.page == 'fixedblock_'+b.PARENT.pid) $el.addClass('el-fixedblock');
						else $el.removeClass('el-fixedblock');
						$el.attr('data-pos', page_pos);
						$el.attr('data-ppos', c.pos);
						$el.attr('data-posby', c.elnew);
					}

		            if(b.ISLOCK == 'false') $el.removeClass('hide');
		            else $el.addClass('locked');

		            if(c.type == 'forum' || c.type == 'latest') $el.addClass('preloading');

		            //add style
		            var jcss = CSSJSON.toJSON(c.elcss),
		            	elpd = style.getPadding(jcss,c.elname);

	            	var elFonts = $el.css('font-family');
	        		elFonts = elFonts + ',"Nanum Gothic"';
	        		var reFonts = elFonts.replace(/"/g, '\'');
	        		$el.css('font-family',reFonts);

					if(checkGalleryView) {
						if(c.page == 'fixedblock_'+b.PARENT.pid) $el.addClass('el-fixedblock');
						else $el.removeClass('el-fixedblock');
						$el.attr('data-pos', page_pos);
						$el.attr('data-ppos', c.pos);
						$el.attr('data-posby', c.elnew);
					}

		            if(b.ISLOCK == 'false') $el.removeClass('hide');
		            else $el.addClass('locked');

		            if(c.type == 'forum' || c.type == 'latest') $el.addClass('preloading');

		            //add style
		            var jcss = CSSJSON.toJSON(c.elcss),
		            	elpd = style.getPadding(jcss,c.elname);

	            	var elFonts = $el.css('font-family');
	        		elFonts = elFonts + ',"Nanum Gothic"';
	        		var reFonts = elFonts.replace(/"/g, '\'');
	        		$el.css('font-family',reFonts);

		            var pt = parseInt(elpd.top),
		                pb = parseInt(elpd.bottom);
		                
		            if(pt>0||pb>0){
		                default_t_css = default_t_css + '\n 	.'+c.elname + '{';
		                if(Math.ceil(pt*0.8)>0)
		                default_t_css = default_t_css + 'padding-top: '+Math.ceil(pt*0.8) + 'px!important;';
		                if(Math.ceil(pb*0.8)>0)
		                default_t_css = default_t_css + 'padding-bottom: '+Math.ceil(pb*0.8) + 'px!important;';
		                default_t_css = default_t_css + '}';

		                default_m_css = default_m_css + '\n 	.'+c.elname + '{';
		                if(Math.ceil(pt*0.5)>0)
		                default_m_css = default_m_css + 'padding-top: '+Math.ceil(pt*0.5) + 'px!important;';
		                if(Math.ceil(pb*0.5)>0)
		                default_m_css = default_m_css + 'padding-bottom: '+Math.ceil(pb*0.5) + 'px!important;';
		                default_m_css = default_m_css + '}';
		            }
		            
		            if(idx == Object.keys(b.CONTENTS).length-1){
		                var css = '@media only screen and (max-width:767px) {' + default_t_css + '\n}\n';
		               	css = css + '@media only screen and (max-width:480px) {' + default_m_css + '\n}';

		                if($('#el-paddingcss').length == 0) $('.dsgn-body').find('#el_'+(Object.keys(b.CONTENTS).length-1)+'css').after('<style id="el-paddingcss">'+css+'</style>');
		                else $('#el-paddingcss').append(css);
		            }

		            var settings = (c.elsettings == '' || typeof c.elsettings == 'undefined') ? {} : $.parseJSON(c.elsettings);

					if(typeof settings.bookmark != 'undefined' && settings.bookmark) {
						$el.attr('data-bookmark',c.seq);
					}
					if(b.VIEW && c.type == 'project') {
						$el.find('.data-page-prev').addClass('active');
						$el.find('.data-page-next').addClass('active');

	                    if(b.PARENT.prev == null) $el.find('.data-page-prev').removeClass('active');
	                    if(b.PARENT.next == null) $el.find('.data-page-next').removeClass('active');

	                    //상세페이지 배경 style 추가
	                    setGalleryProjectCss(b.PARENT,b.PARENT['elcss']);	                	
	                }

	                if(b.VIEW) {
		            	var img_onoff = (typeof settings.img_original_display != 'undefined' && settings.img_original_display) ? settings.img_original_display : 'OFF';
		            	$el.find('img[data-attach="true"]').attr('data-img-original',img_onoff);
	                }

	                var checkVideoTag = (c.type == 'video' || $el.find('video').length > 0) ? true : false;
					if(checkVideoTag) {
						if (navigator.userAgent.match(/(safari)/gi) !== null) {
							$el.find('video').each(function() {
								//safari...
								$(this).attr('webkit-playsinline',1);
								$(this).attr('playsinline',1);
							});
						}
						if (navigator.userAgent.match(/(iPod|iPhone|iPad)/gi) !== null) {
							$el.find('video').each(function() {
								$(this).removeAttr('muted');
								$(this).removeAttr('loop');
								$(this).removeAttr('autoplay');
								$(this).removeAttr('preload');
							});
						}
					}

					//video block ::: gallery
			        if(c.type == 'video') {
			            if($el.find('.video-gallery-url').length>0) {                                                  //재생방식 : 확대보기 
			                $.each($el.find('.item'),function(i,v){
			                    if(c.mode=='zoom') appendGalleryFrame($(this).parents('.element'),c.seq,'',c.type);
			                });
			            }
			        }

					if(c.type == 'forum') {
						_this.forumUpdate(v.element.seq, 1, v.view, c.page, v.list);
					} else if(c.type == 'gallery') {
	                    _this.galleryEL[c.seq] = {
	                    	'seq' : c.seq,
	                    	'elname' : c.elname,
	                    	'eltag' : c.eltag,
	                    	'folder' : c.folder,
	                    	'mode' : c.mode,
	                    	'elsettings' : c.elsettings,
	                    	'feature' : c.feature,
	                    };

						_this.galleryUpdate(c,v);

						if (typeof c.price_hidden != 'undefined' && c.price_hidden == 'ON') {
							$el.find('.figure.price').html('');
						}

					} else if(c.type == 'sns' && c.type2 == 'feed') {
		                $el.find('.data-feed-load-more').attr('data-feed-el',c.elname);
		                $el.find('.data-feed-load-more').removeAttr('style');
		                $el.find('.show-posts').removeClass('show-posts');

		                if(c.mode == 'site') {
							if(!$.isEmptyObject(b.SOCIAL)) {
								var load_sns = {};
								if(!$.isEmptyObject(b.SOCIAL.instagram) && typeof settings.sns_instagram != 'undefined' && settings.sns_instagram == 'ON') load_sns['instagram'] = b.SOCIAL.instagram;
								if(!$.isEmptyObject(b.SOCIAL.twitter) && typeof settings.sns_twitter != 'undefined' && settings.sns_twitter == 'ON') load_sns['twitter'] = b.SOCIAL.twitter;

								if(!$.isEmptyObject(load_sns)) {
									loadingElement(c.elname,'loading posts...');
									updateFeed(c.elname,load_sns,function() {
										$('.'+c.elname+' .listprogress').remove();
									});
								}
							}
		                } else {
							// SNS FEED:: before version
							if(typeof settings.sns != 'undefined' && settings.sns.twitter) {
								loadingElement(c.elname,'loading posts...');
								updateFeed(c.elname,settings.sns);
							}
		                }

					} else if(c.type == 'others' && c.type2 == 'countdown') {
		                var el_dday = $el.find('[data-dday="true"]'),
		                	cd_date = (el_dday.attr('data-countdown')) ? el_dday.attr('data-countdown') : new Date(),
		                    dateformat  = { days : '%D', hours: '%H', minutes: '%M', seconds: '%S' },
		                    dateendformat  = { days : '00', hours: '00', minutes: '00', seconds: '00' };
						
						if( typeof settings.countdown != 'undefined' && settings.countdown ) {  //set - block setting date 
	                        cd_date = settings.countdown;
		                }
		                if( !el_dday.attr('data-countdown') && typeof cd_date == 'object' ) { //set - example date
		                    cd_date.setTime(cd_date.getTime() + (35*24*60*60*1000));
		                }
			            cd_date = moment(cd_date).format('YYYY/MM/DD HH:mm:ss');
			            
						el_dday.countdown(cd_date, function(event) {
							$(this).find('.date-item[data-datetype]').each(function(i) {
								var dd_type = $(this).attr('data-datetype'),
									dd_format = $(this).attr('data-format'),
									dd_endformat = $(this).attr('data-finish');

								if(typeof dd_format == 'undefined' || !dd_format) dd_format = dateformat[dd_type];
								if(typeof dd_endformat == 'undefined' || !dd_endformat) dd_endformat = dateendformat[dd_type];

								if(event.elapsed) $(this).text(dd_endformat);
								else $(this).text(event.strftime(dd_format));
							});
						});
					} else if (c.type == 'latest') {
						var latest_data = (typeof settings.latest_data != 'undefined' && settings.latest_data) ? settings.latest_data : {};
						$.latest.init(c.seq,latest_data);					
					} else if (c.type == 'form') {
		            	if(!b.VALIDPLAN) {
		            		$el.find("[form-type='file.upload'] label").on("click", function(e) {
		            			e.preventDefault();
		            			alert($.lang[LANG]['form.file.upload.disabled']);
		            		});
		            	}

	                    if($("head").find("script[id='forms_js']").length == 0) {
	                        $("head").append("<script id='forms_js' src='/js/module/forms.js'></script>");
	                    } else {
	                    	$.forms.init();
	                    }
		            }

					if($el.hasClass('error_404')==false) {
						if($el.hasClass('el-footer')==false) {
							if($el.hasClass('cl-s-product-detail')==false) {
								aosAddblock(site_settings,settings,$el);
								if(isAosBlock) {
									$el.addClass('aos-hidden'); // 숨김
									$el.addClass('render-aos');
								}
								
							}						
						}
					}

					changeBrokenImages($el);				
	            	
		            idx++;
		    	});
				
				// $('.tag.preloading').replaceWith(function () {
				//     return $(this).html();
				// });
				$('.preloading').removeClass('preloading');
				if(b.ISLOCK == 'true') {
					$('.locked').remove();	
					return false;
				}

				
	            if($('.element [data-map_kind="kakao"]').length && (typeof kakao == 'undefined' || typeof kakao.maps == 'undefined' || kakao.maps == null || property.VALIDPLAN == '')) {
	                $('.element [data-map_kind="kakao"]').html('지도연결해제됨. Javascript키 확인');
	                $('.element [data-map_kind="kakao"]').html('<iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5659473821083!2d127.0282496015659!3d37.494568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1598c361b2b%3A0xdbf9af292beff3c!2z6rCV64Ko!5e0!3m2!1sko!2skr!4v1637303748377!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>');
	            } else {
					$('.element [data-map_kind="kakao"]').each(function() {
						var container = this;
						var lat = $(this).data("lat");
						var lng = $(this).data("lng");
						var options = { center: new kakao.maps.LatLng(lat, lng), level: 3};
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
						var c_map = new kakao.maps.Map(container, options);
						var marker = new kakao.maps.Marker({ position: new kakao.maps.LatLng(lat, lng), map: c_map});

		                if(zoomInOut == true) {
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
	                            'handle' : '<div>dfafasdfas</div>',
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
	                            iwContent = '<div class="contact-map-info-window"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8 0C4.69 0 2 2.69 2 6s1 4 6 10c5-6 6-6.69 6-10s-2.69-6-6-6zm0 8.3a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z"></path></svg>' + iwContent + '</div>';
	                            var infoWindow = $(iwContent);
	                            $(container).append(infoWindow);
	                        }
		                }
						$(window).on("resize", function() {
							c_map.relayout();
							c_map.setCenter(marker.getPosition());
						});
					});
				}

	            if($('.element [data-map_kind="naver"]').length && (typeof naver == 'undefined' || typeof naver.maps == 'undefined' || naver.maps == null || property.VALIDPLAN == '')) {
	                $('.element [data-map_kind="naver"]').html('지도연결해제됨. Client ID 확인');
	                $('.element [data-map_kind="naver"]').html('<iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5659473821083!2d127.0282496015659!3d37.494568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1598c361b2b%3A0xdbf9af292beff3c!2z6rCV64Ko!5e0!3m2!1sko!2skr!4v1637303748377!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>');
	            } else {
					$('.element [data-map_kind="naver"]').each(function() {
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
	                            'handle' : '<div>dfafasdfas</div>',
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
	                            iwContent = '<div class="contact-map-info-window"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8 0C4.69 0 2 2.69 2 6s1 4 6 10c5-6 6-6.69 6-10s-2.69-6-6-6zm0 8.3a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z"></path></svg>' + iwContent + '</div>';
	                            var infoWindow = $(iwContent);
	                            $(container).append(infoWindow);
	                        }
		                }
						$(window).on("resize", function() {
							// c_map.relayout();
							c_map.setCenter(marker.getPosition());
						});
					});
				}

				$('.element [data-map="true"]:not(iframe)').each(function() {
					var map_url = $(this).attr('data-url');
					if(typeof map_url != 'undefined' && map_url) {
						var map_iframe = getMapURL(map_url,'html');
						$(this).replaceWith(map_iframe);
						if(map_iframe.indexOf('google-map disabled') === -1) $(this).next('.map-undefined').remove();
					}
				});				
				if($('.element[data-layout]').length > 0) {
	                setLayoutHeight();
	            }
		    	$('.dsgn-body').fitVids();
		    });			
		});
		parallax();

		deferred.resolve();
	    return deferred.promise();
    },
    setLoginout : function (show, sid, site, profileimg) {
		if(show=='1') {
			$.getJSON('/template/checkLogin', function(data) {
				if(data.user && site) {
					if($('#tpl-menu').find('.loginout')) $('#tpl-menu').find('.loginout').remove();
					setLoginoutNav(sid, function() {
						getProfileMember();
						getProfileAuthor(sid,profileimg);
						$('.el_0').css('margin-top','55px');
					});
				} else {
					$('#tpl-menu').append('<li class="loginout"><a href="javascript:;" title="CREATORLINK login"><i class="fa fa-user"></i></a></li>'); 
				}
			});
	    }
    },
    liveUpdate : function(obj) {
    	// console.log('liveUpdate');

    	var b = this.b;
	    var menu = $('#tpl-menu'),
	        idx = 0,
	        regex = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,7}(\:[0-9]+)?(\/\S[^\{\}]*)?$/,
	        regex2 = /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,7}(\:[0-9]+)?(\/\S[^\{\}]*)?$/;
	    menu.empty();
    	
		if($('.fmcss').length > 0) $('.fmcss').remove(); //forum background css

	    $.each(obj, function (idx, obj) {
	    	if(obj.name == '전체상품') {
	    		if(b.VALIDTYPE != 'SM' || !b.SLANG || (typeof b.SLANG.select_code !== 'undefined' && b.SLANG.select_code != 'ko')){
	    			return true;
	    		}
	    	}
	    	
	        b.MENULIST.push(obj.name.replace(/ /g,'-'));
	        if(obj.children) {
	            $.each(obj.children, function (idx, obj){
	                b.MENULIST.push(obj.name.replace(/ /g,'-'));
	            });
	        }
	    });

		if(b.ONE) {
			linkUrl = (b.VIEW) ? '/#' : '#';
			linkUrl = (b.VIEW && !b.PUBLISH) ? '/render/index#' : linkUrl;
		} else {
			linkUrl = (b.URL=='/') ? '/' : b.URL + '/';  
		}

		for (i = 0; i < obj.length; i++) {
            var link = obj[i].name;
            if(link == '전체상품') {
	            if(b.VALIDTYPE != 'SM' || !b.SLANG || (typeof b.SLANG.select_code !== 'undefined' && b.SLANG.select_code != 'ko')) {
	                continue;
	            }
	        }
            // IE ERROR_includes__H.20210603
            // if(b.MENULIST.includes(link.replace(/ /g,'-'))) link = link.replace(/ /g,'-');
            if($.inArray(link.replace(/ /g,'-'),b.MENULIST) > -1) link = link.replace(/ /g,'-');

			var parent = b.PAGE.split(','),
				link_text = '', target = '', isBookmark = '', isFlink = '';

			if(i==0) {
				if(obj[i].display=='on') b.MENULINK.push(link);
				continue;
			}

			if(obj[i].name =='전체상품') {
	            obj[i].link = '';
	        }

			var active = (link == b.PAGE || link == parent[0]) ? 'active' : '',
				sub = obj[i].children.length;

			if (obj[i].display == 'on') {
				var checkLink = (obj[i].link) ? true : false,
					// IE ERROR_includes__H.20210603
					// checkLinkInner = (obj[i].link && b.MENULIST.includes(obj[i].link.replace(/ /g,'-'))) ? true : false,
					checkLinkInner = (	obj[i].link && 
										$.inArray(obj[i].link.replace(/ /g,'-'), b.MENULIST) > -1
									) ? true : false,
					checkLinkBookmark = (obj[i].link.match(/^\@/g) !== null) ? true : false,
					checkLinkFile = (obj[i].link.match(/^flink\@[0-9]/gi) !== null) ? true : false;

				link = (checkLink) ? ((checkLinkInner) ? obj[i].link.replace(/ /g,'-') : obj[i].link) : link;
				isBookmark = (checkLinkBookmark) ? ' attr-bookmark="'+link.replace(/^\@/g,'')+'"' : '';
				isFlink = (checkLinkFile) ? ' attr-flink="' + link.replace(/^flink\@/gi,'') + '"' : '';
				target = (obj[i].ltarget == '_blank') ? 'target="_blank"' : '';

				if(checkLink && !checkLinkInner && !checkLinkBookmark) {												// link-type: link-out      ==> a[attr-link]
					if(checkBase64Encode(link)) link = Base64.decode(link);
				}

				if(link == 'folder-menu') {
					link_text = 'javascript:;';
					target = '';
					if(typeof menu.closest('.navbar-menu-'+b.SID).attr('data-submenu') != 'undefined') target = ' data-toggle="dropdown" aria-expanded="false" data-submenu="true" ';
				} else {
					if(!checkLink) b.MENULINK.push(link);
					// IE ERROR_includes__H.20210603
					// link_text = (b.MENULIST.includes(link)) ? linkUrl + link : (!regex2.test(link) && regex.test(link)) ? '//'+link : link;
					link_text = ($.inArray(link,b.MENULIST) > -1) ? linkUrl + link : (!regex2.test(link) && regex.test(link)) ? '//'+link : link;
				}

	            if (sub) {
	                var sub_menu = '',
	                    sub_show = 0;

	                sub_menu = '<ul class="dropdown-menu">\r\n';
	                for (j = 0; j < obj[i].children.length; j++) {
	                    var child = obj[i].children,
							checkChildLink = (child[j].link) ? true : false,
							// IE ERROR_includes__H.20210603
							// checkChildLinkInner = (b.MENULIST.includes(child[j].link.replace(/ /g,'-'))) ? true : false,
							checkChildLinkInner = ($.inArray(child[j].link.replace(/ /g,'-'), b.MENULIST) > -1) ? true : false,
							checkChildLinkBookmark = (child[j].link.match(/^\@/g) !== null) ? true : false,
							checkChildLinkFile = (child[j].link.match(/^flink\@[0-9]/gi) !== null) ? true : false,
							child_link = (child[j].link) ? ((checkChildLinkInner) ? child[j].link.replace(/ /g,'-') : child[j].link) : '',
							child_isBookmark = (checkChildLinkBookmark) ? ' attr-bookmark="' + child_link.replace(/^\@/g,'') + '"' : '',
							child_isFlink = (checkChildLinkFile) ? ' attr-flink="' + child_link.replace(/^flink\@/gi,'') + '"' : '',
							sub_link = (child_link) ? child_link : child[j].name.replace(/ /g, "-"),
							sub_target = (child[j].ltarget == '_blank') ? 'target="_blank"' : '',
							sub_active = '', 
							sub_link_text = '';

						if(checkChildLink && !checkChildLinkInner && !checkChildLinkBookmark) {							// link-type: link-out      ==> a[attr-link]
							if(checkBase64Encode(child_link)) sub_link = Base64.decode(child_link);
						}

						var page_arr = (b.VIEW) ? b.PAGE.split(',') : [b.PAGE];
						if (!active && (sub_link == page_arr[0] || link == parent[0])) {
							sub_active = 'active';
							if($('body').width() > 768) active = 'active';
							else active = 'open';
						}	                    	

	                    if (child[j].display == 'on') {
							if(!checkChildLink) b.MENULINK.push(child[j].name.replace(/ /g, '-'));
							// IE ERROR_includes__H.20210603
	                        // sub_link_text = (b.MENULIST.includes(sub_link)) ? linkUrl+sub_link : (!regex2.test(sub_link) && regex.test(sub_link)) ? '//'+sub_link : sub_link;
	                        sub_link_text = ($.inArray(sub_link,b.MENULIST) > -1) ? linkUrl+sub_link : (!regex2.test(sub_link) && regex.test(sub_link)) ? '//'+sub_link : sub_link;
	                        sub_menu = sub_menu + '<li class="' + sub_active + '"><a href="' + sub_link_text + '" ' + sub_target + child_isBookmark + child_isFlink + '>' + child[j].name + '</a></li>\r\n';

	                        sub_show++;
	                    }
	                }
	                sub_menu = sub_menu +'</ul>\r\n';

                var caret = ($('header.navbar').hasClass('sidebar')) ? ' <i class="fa fa-caret-right fa-1" aria-hidden="true"></i>' : ' <i class="fa fa-caret-down fa-1" aria-hidden="true"></i>';
                if (sub_show) {
                		var sub_menu_open = (typeof menu.closest('.navbar-menu-'+b.SID).attr('data-submenu') != 'undefined' && menu.closest('.navbar-menu-'+b.SID).attr('data-submenu') == 'open' && active != 'open') ? 'open' : '';
	                	menu.append('\r\n<li class="' + active + ' dropdown ' + sub_menu_open + '"><a href="' + link_text + '" class="dropdown-toggle" ' + target + isBookmark + isFlink + '>' + obj[i].name + caret + '</a></li>\r\n');
	                } else {
	                	menu.append('\r\n<li class="' + active + '"><a href="' + link_text + '" ' + target + isBookmark + isFlink + '>' + obj[i].name + '</a></li>\r\n');
	                }
	                if(sub_show) menu.find('.dropdown:last').append(sub_menu);
	            } else {
	            	menu.append('\r\n<li class="' + active + '"><a href="' + link_text + '" ' + target + isBookmark + isFlink + '>' + obj[i].name + '</a></li>');
	            } 
	            idx++;
	        }
		}



		// menu ver3 : fheader
		//              - Add #fixed-menu, #mobile-nav
		//              - Set mobile-design
		if($('header.navbar').hasClass('navbar-fheader')) $.fheader.init();

		if(typeof b.VALIDPLAN != 'undefined' && b.VALIDPLAN) {
			if(typeof b.VALIDTYPE != 'undefined' && b.VALIDTYPE == 'SM') {
				$.umember.init(b.SITEUM,b.SITEUMLANG,b.SITEUMDISPLAY, function() { 
					$.psearch.init();
					$.shopping.init();
					$.slang.init(b.SLANG);
				});
			} else if(typeof b.VALIDTYPE != 'undefined' && b.VALIDTYPE == 'BN') {
				$.umember.init(b.SITEUM,b.SITEUMLANG,b.SITEUMDISPLAY, function() { 
					$.slang.init(b.SLANG); 
				});
			} else {
				$.slang.init(b.SLANG);
			}
		} else {
			$.slang.init();
		}

		// menu ver3 : fheader
		//             - Set site page top padding
		//             - Set menu config btn position
		if($('header.navbar').hasClass('navbar-fheader')) $.fheader.set();

	    $('header .navbar-nav').removeClass('hide').removeClass('preloading');
	    $('body,html').animate({scrollTop: 0}, 300,'easeInOutQuart');

	},
	galleryUpdate : function(el,data) {
		var _this = this;

		$('#el-empty').append($(data.source));
		$('#el-empty').find('[data-loop="true"]').html('');

		var gallery_empty = false,
			source = data.source,
			nodes = $(source).find('[data-loop="true"]').children(),
			p = $('#el-empty').children(),
			g = p.clone().removeClass().addClass('galleryPL'+el.seq).addClass('gallery-popup'),
            i = [],
            view = $(source).find('[data-loop="true"]').data('view'),
            total = (typeof data.total != 'undefined' && data.total) ? data.total : 0;

        $('#el-empty').after(g);
        $(g).after('<div class="gallery-empty"></div>');

        if(typeof view == 'undefined') view = 10;

        var g_settings = (typeof el.elsettings == 'undefined' || el.elsettings == '') ? {} : $.parseJSON(el.elsettings),
        	cookie_page = 1,
            cookie_view = view,
            cookie_gallery_category = '',
            is_gc_cookie = (typeof $.cookie('gallery-category-'+el.seq) != 'undefined' && $.cookie('gallery-category-'+el.seq).length > 0) ? true : false,
            block_lang = (typeof g_settings.blocklang != 'undefined') ? g_settings.blocklang : LANG;

		var category_onoff = (typeof g_settings.category_display != 'undefined' && g_settings.category_display) ? g_settings.category_display : 'OFF';
		var adultonly_onoff = (typeof g_settings.adult_only != 'undefined' && g_settings.adult_only) ? g_settings.adult_only : 'OFF';
        if(	category_onoff == 'ON' &&
        	typeof $.cookie('ci_goto-gallery') != 'undefined' && $.cookie('ci_goto-gallery') == el.seq &&
        	typeof $.cookie('ci_goto-gallery-cate') != 'undefined' && g_settings.category.indexOf('|' + $.cookie('ci_goto-gallery-cate') + '|') > -1 &&
        	typeof g_settings.category != 'undefined' && g_settings.category 
    	) {
        	cookie_gallery_category = $.cookie('ci_goto-gallery-cate');
        	is_gc_cookie = true;
        } else if($.cookie('loadmore-' + el.seq)) {
			cookie_page = $.cookie('loadmore-'+el.seq);
			cookie_gallery_category = (typeof $.cookie('gallery-category-'+el.seq) != 'undefined') ? $.cookie('gallery-category-'+el.seq) : '';
			cookie_view = cookie_page * view;
        } else { 
			var checkCateHomeHide = (category_onoff == 'ON' &&
									typeof g_settings.category != 'undefined' && g_settings.category && 
									typeof g_settings.category_home_hide != 'undefined' && g_settings.category_home_hide) ? true : false;
			if(checkCateHomeHide) {
				var gc = g_settings.category.replace(/\|/g,'').split(',');
				cookie_gallery_category = gc[0];
				is_gc_cookie = true;

				$.cookie('gallery-catehome-' + el.seq, cookie_gallery_category, { path : '/', expires: 12 * 60 * 60 * 1000 });
			}
        }

        if(el.seq == 'all_products') {
        	cookie_page = (typeof $.cookie('gallery-page-all_products') !== 'undefined' && $.cookie('gallery-page-all_products') != '')? $.cookie('gallery-page-all_products') : 1;
        	cookie_gallery_category = setAllProductsCurrentCat(g_settings);
        	cookie_view = cookie_page * view;
        }

		$.cookie('gallery-page-' + el.seq, cookie_page, { path : '/', expires: 12 * 60 * 60 * 1000 });
		$.cookie('gallery-category-' + el.seq, cookie_gallery_category, { path : '/', expires: 12 * 60 * 60 * 1000 });
        $.removeCookie('loadmore-' + el.seq, { path : '/' });

		var el_gh = $(source).find('.goption').attr('data-gh'),
			checkGalleryHeight = (typeof el_gh != 'undefined' && el_gh) ? true : false,
			checkGallerySVG = ($(source).find('.gimg-svg-wrap').length > 0) ? true : false,
			checkGFrameTitleOFF = (el.mode == 'gallery' && (typeof g_settings.gframe_title_visible != 'undefined' && g_settings.gframe_title_visible == 'OFF')) ? true : false;

		var param = (el.page=='index,template' && property.param.indexOf('/org/') == -1) ? property.param + '/org/' + el.page : property.param;
		var post_data = { g_mode: el.mode, visible: true, sfl: 'category', stx: cookie_gallery_category };

		if(el.seq == 'all_products') {
			post_data = { g_mode: el.mode, visible: true, sfl: 'orderby', stx: cookie_gallery_category };
		}
		$.ajax({
			url: '/template/gallery/list/pid/' + el.seq + '/sid/' + el.sid + '/spage/' + el.page + '/view/' + cookie_view + '/publish/' + property.PUBLISH + param,
			data: post_data,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			success: function (g_data) {
				$.each(g_data.list, function (idx, v) {
					i.push(v);
				});
				
				total = (typeof g_data.total.list_total != 'undefined') ? g_data.total.list_total : g_data.total;
				cookie_view = (cookie_view < total) ? cookie_view : total;

				if( total>0 ) gallery_empty = false;
				if( i.length>0 || (i.length==0 && is_gc_cookie) ) {
					var loop_count = nodes.length, item_index = 0, elem = [];
					$.each(g_data.total_list,function(index,v) {
						loop_pos = index%loop_count;
						c = nodes[loop_pos];

						v.title = (v.title.length>0) ? v.title : $.lang[block_lang]['editor.block.gallery.sample.title'];
                        v.caption = (v.caption.length>0) ? v.caption : $.lang[block_lang]['editor.block.gallery.sample.caption'];
						
						$(c).addClass('gallery-item').attr('data-index',index).attr('data-seq',v.seq);

						var vgsettings = (typeof v.gsettings != 'undefined' && v.gsettings) ? $.parseJSON(v.gsettings) : {},
							img_path = (typeof vgsettings['storage'] != 'undefined') ? vgsettings['storage'] : _this.b.RESOURCE + '/' + _this.b.SID + '/',
							img_original = (typeof vgsettings['storage'] != 'undefined') ? img_path + '1920/' : img_path;
						
						var folder = (typeof data.element.folder == 'undefined' || data.element.folder == 0) ? '' : data.element.folder + '/',
							src = getServeImage(v.image,data.element.folder,img_path),
							src_s0 = getServeImage(v.image,'0',img_path);
						$(c).find('img').attr('src',src);
						if(checkGalleryHeight) $(c).find('.g-img').css('background-image', 'url('+src+')');
						if(checkGallerySVG) {
							var gimgSVG = $(c).find('.gimg-svg-wrap svg');
							gimgSVG.find('pattern').attr('id','gimgSvg_'+el.elname+'_'+index);
							gimgSVG.find('image').attr('xlink:href', src);
							gimgSVG.find('polygon').attr('fill', 'url(#gimgSvg_'+el.elname+'_'+index+')');							
						}

						var glink = (typeof vgsettings['glink'] != 'undefined' && vgsettings['glink']) ? vgsettings['glink'] : '',
							glink_target = (typeof vgsettings['glink_target'] != 'undefined' && vgsettings['glink_target']) ? vgsettings['glink_target'] : '';

						if(glink) {
							if(glink.match(/^\@/g) !== null) {															// link-type: link-bookmark ==> a[attr-bookmark]
								var bookmark_seq = glink.replace(/^\@/g,'');
								if(typeof _this.b.SETTINGS.blockBookmarkList == 'undefined' || typeof _this.b.SETTINGS.blockBookmarkList['bookmark' + bookmark_seq] == 'undefined') {
									glink = '';
									glink_target = '';
								}
							} else if(glink.match(/^flink\@[0-9]/gi) !== null) {										// link-type: link-file     ==> a[attr-flink]
								glink_target = '';
							} else if($.inArray(glink.replace(/^\//g,'').replace(/ /g,'-'),_this.b.MENULIST) > -1) {	// link-type: link-menu     ==> a[data-user-link]
							} else {																					// link-type: link-out      ==> a[attr-link]
								if(checkBase64Encode(glink)) glink = Base64.decode(glink);
							}
						}

						$(c).find('a').removeAttr('data-gallery').removeAttr('data-user-link').removeAttr('attr-bookmark').removeAttr('attr-link').removeAttr('attr-flink');
						if (typeof v.price_hidden != 'undefined' && v.price_hidden == 'ON' && property['SITEUM'] >= 1) {
							$(c).addClass('gallery-item').addClass('nonePrice');
							$(c).find('a').attr('href', '#');
						} else {
							if(glink) {
								var glink_val = makeLinkUrl(glink, _this.b.ONE, _this.b.VIEW);
								$(c).find('a').attr('href',glink_val);

								if(glink.match(/^\@/g) !== null) {
									$(c).find('a').attr('attr-bookmark',glink.replace(/^\@/g,''));
								} else if(glink.match(/^flink\@[0-9]/g) !== null) {
									$(c).find('a').attr('attr-flink',glink.replace(/^flink\@/g,''));
								// IE ERROR_includes__H.20210603
								// } else if(_this.b.MENULIST.includes(glink.replace(/ /g,'-'))) {
								} else if($.inArray(glink.replace(/ /g,'-'),_this.b.MENULIST) > -1) {
									$(c).find('a').attr('data-user-link',glink_val);
								} else {
									$(c).find('a').attr('attr-link',glink);
								}
							} else {
								if (el.mode == 'gallery') {
									src_s0 = src_s0 + '?gpos='+v.pos;

									$(c).find('a').attr('href', src_s0);
									$(c).find('a').attr('data-gallery', '#gframe-' + el.seq);
								} else {
									if(el.seq == "all_products") {
										$(c).find('a').attr('href', v.product_url);
									} else {
										if (typeof URL == 'function') URL = '/';
										$(c).find('a').attr('href', ((_this.b.URL=='/') ? '' : _this.b.URL) + '/' + _this.b.PAGE + '/view/' + v.seq);
									}
								}
							}
						}

						if(glink_target == '_blank') $(c).find('a').attr('target','_blank');
						else $(c).find('a').removeAttr('target');

						if(checkGFrameTitleOFF) $(c).find('a').attr('data-title', '');
						else $(c).find('a').attr('data-title', v.title);

						if(adultonly_onoff == 'ON') $(c).addClass('adultonly');

						// caption
						var ftitle = $(c).find('h5.figure'),
						    fcaption = $(c).find('p.figure'),
						    fdatetime = $(c).find('.figure.datetime'),
						    fhashtag = $(c).find('.figure.hashtag'),
						    fprice = $(c).find('.figure.price'),
							freview = $(c).find('.figure.review');

						// datetime / hashtag
						if(fdatetime.length<1) {
						    $(c).find('figcaption').append('<div class="figure datetime hide"></div>');
						    fdatetime = $(c).find('.figure.datetime');
						}
						if(fhashtag.length<1) {
						    $(c).find('figcaption').append('<div class="figure hashtag hide"></div>');
						    fhashtag = $(c).find('.figure.hashtag');
						}

						$(c).find('figcaption').removeClass('hide');
						if (v.title || v.caption) {
						    var gallery_caption = v.caption;
						    gallery_caption = gallery_caption.trim().replace(/\n/g,'<br />');

						    ftitle.html(v.title);
						    fcaption.html(gallery_caption);
						    fdatetime.text(v.datetime);
						    fhashtag.text(v.hashtag);
						}
						if(el.mode == 'shopping' || el.seq == 'all_products') {
							
							var checkPriceHidden = (typeof v.price_hidden != 'undefined' && v.price_hidden == 'ON') ? true : false,
								gallery_price = (v.price && !checkPriceHidden) ? v.price : 0,
								gallery_sale_price = (typeof v.sale != 'undefined' && v.sale > 0 && !checkPriceHidden) ? v.sale : 0,
								gallery_sale_per = (typeof v.sale_per != 'undefined' && v.sale_per && !checkPriceHidden) ? v.sale_per : '',
								product_soldout = (typeof g_settings.sh_soldout == 'string') ? g_settings.sh_soldout : '구매불가',
								product_status = ((v.status == 'off' || (v.quantity_on == 'on' && v.quantity < 1)) && product_soldout && !checkPriceHidden) ? '<span class="cl-sh-soldout">' + product_soldout + '</span>' : '';

							$(c).find('.cl-sh-soldout').remove();
							if(product_status != '') $(c).attr('data-soldout',true);
							else $(c).removeAttr('data-soldout');

							if($(c).find('ul.figure.price').length > 0) {
								//Ver2
								if(!checkPriceHidden) {
									$(c).find('ul.figure.price .price-val').html('￦' + gallery_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
									$(c).find('ul.figure.price .price-val').removeClass('hide');

									if(gallery_sale_price > 0) {
										$(c).find('ul.figure.price .price-sale').html('￦' + gallery_sale_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
										$(c).find('ul.figure.price .price-sale-per').html(gallery_sale_per);
										$(c).find('ul.figure.price .price-sale, ul.figure.price .price-sale-per').removeClass('hide');
									} else {
										$(c).find('ul.figure.price .price-sale, ul.figure.price .price-sale-per').addClass('hide').html('');
									}
								} else {
                                    $(c).find('ul.figure.price .price-val').html('￦0');
                                    $(c).find('ul.figure.price .price-val').removeClass('hide');
								}

								if(product_status) $(c).find('ul.figure.price').append('<li>'+product_status+'</li>');

							} else {
								//Ver1
								if(fprice.length == 0) fprice = fcaption;

								if(checkPriceHidden) fprice.html('');
								else fprice.html('<span class="figure-krw">￦</span>' + gallery_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',') + product_status);
							}

							if($(c).find('ul.figure.review').length > 0) {
								var gallery_review = (v.review_onoff && v.review_cnt) ? v.review_cnt : 0;
								if(gallery_review > 0) {
									$(c).find('ul.figure.review, ul.figure.review li').removeClass('hide');
									$(c).find('ul.figure.review .figure-review-cnt').html(gallery_review);
									$(c).find('ul.figure.review .figure-review-score').html(v.review_score);
								} else {
									$(c).find('ul.figure.review, ul.figure.review li').addClass('hide');
									$(c).find('ul.figure.review .figure-review-cnt, ul.figure.review .figure-review-score').html('');
								}
							}

						} else {
							fprice.addClass('hide');
							freview.addClass('hide');
						}
					    

						// $(p).find('[data-loop="true"]').append($(c)[0].outerHTML); 
						if(index < i.length) {
							$(p).find('[data-loop="true"]').append($(c)[0].outerHTML); 
						} else {
							if(el.mode == 'gallery') {
								$(c).find('figure').remove();
								$(g).find('[data-loop="true"]').append($(c)[0].outerHTML);
							}	
						}
						if (el.mode == 'gallery' && total == 2) {
							$(c).find('figure').remove();
							$('.gallery-empty').append($(c)[0].outerHTML);
						}
					});
				} else {
					if(el.mode=='project' && _this.b.TEMPLATE == false) {
						nodes.addClass('gallery-item');
						nodes.find('a').attr('href', ((_this.b.URL=='/') ? '' : _this.b.URL) + '/' + _this.b.PAGE + '/view/template').removeAttr('data-gallery').find('img').attr('data-index',0);
					}
					$(p).find('[data-loop="true"]').append(nodes);
				}

			}
        });



        var tag = $(p)[0].outerHTML,
        	$galleryEL = $('.element[data-id="' + el.seq + '"]');

		if (el.mode == 'gallery' && total == 2) {
			$.each($('.gallery-empty').find('.gallery-item'), function(i,v) {
				$(g).find('[data-loop="true"]').append(v);
			});
		}
    	
		if (el.mode == 'gallery' && total) tag = appendGalleryFrame($(tag),el.seq,g_settings);
		$galleryEL.html($(tag).html()).removeClass('preloading');

		$('#el-empty').empty();
		$('.gallery-empty').remove();

        // loadmore...
        if (total > view && total > cookie_view) {
			var btn_class = (el.feature=='masonry') ? 'gallery-loadmore masonry-layout' : 'gallery-loadmore',
				btn_txt = '';
				
			if(typeof g_settings.loadmore_lang != 'undefined' && g_settings.loadmore_lang == 'KO') {
                btn_txt = '더보기';                    
            } else {
                if(g_settings.loadmore_lang=='EN') btn_txt = 'LOAD MORE';
                else btn_txt = (block_lang=='ko') ? '더보기' : 'LOAD MORE';
            }
            
			var btn_tag = '<div class="' + btn_class + '" data-total = "' + total + '" data-id="' + el.seq + '" data-page="' + (Number(cookie_page)+1)+ '" data-view="' + view + '" data-folder="' + el.folder + '" data-mode="' + el.mode + '">' + btn_txt + ' &nbsp;(<span class="display">' + cookie_view + '</span> / ' + total + ')</div>';

			if($galleryEL.find('.gallery-loadmore').length > 0) $galleryEL.find('.gallery-loadmore').replaceWith(btn_tag);
			else $galleryEL.append(btn_tag);
        }

		$galleryEL.attr('data-category',category_onoff);
		$galleryEL.find('.empty-txt').remove();
		if(category_onoff == 'ON') {
			loadGalleryCategoryBlock($galleryEL,el.seq,g_settings);

			$galleryEL.find('.empty-txt').remove();
			$galleryEL.find('.container:not(.fh-container),[data-loop="true"]').removeClass('empty');
			if(total==0) {
				var gallery_empty_str = ($galleryEL.find('.grid').length > 0)? '' : '<div class="col-xs-12 col-sm-12 col-md grid empty-txt">' + $.lang[LANG]['editor.gallery.category.empty.list'] + '</div>';

				if(el.feature=='masonry') {
					$galleryEL.find('.container:not(.fh-container)').removeAttr('style').addClass('empty').append(gallery_empty_str);
				} else {
					$galleryEL.find('[data-loop="true"]').addClass('empty').empty().append(gallery_empty_str);
				}
			}
		}
		
		if(el.seq == 'all_products') {
			$galleryEL.addClass('link-to-전체상품');
			loadAllproductSort($galleryEL, g_settings, el.total.list_total);
			if(total==0) {
                var gallery_empty_str = '<div class="col-xs-12 col-sm-12 col-md grid empty-txt">'+$.lang[LANG]['editor.gallery.product.empty.list']+'</div>';
                
                $galleryEL.find('[data-loop="true"]').addClass('empty').empty().append(gallery_empty_str);
                $galleryEL.find('.gallery-loadmore').remove();
            }
		}
		
		if($galleryEL.find('.goption[data-gcol]').length > 0) {
			var gOption = $galleryEL.find('.goption[data-gcol]'),
				gcol = gOption.attr('data-gcol'),
				gcol_t = gOption.attr('data-gcol-t'),
				gcol_m = gOption.attr('data-gcol-m');

			if(typeof gcol_t == 'undefined') { gOption.attr('data-gcol-t',gcol); gcol_t = gcol; }
			if(typeof gcol_m == 'undefined') { gOption.attr('data-gcol-m',gcol_t); }
		}

		refreshGalleryField($galleryEL,g_settings);

		// gallery option - gh
		if ($galleryEL.find('.goption[data-gh]').length > 0) refreshGalleryHeight(el.elname);

        if(el.feature=='masonry') this.refreshMasonry(el.elname);

	},
	forumUpdate : function(pid,page_num,view,page,data) {
		$.forum.update(pid, page_num, view, page, '', '', '',data);
	},
	refreshMasonry : function(el) {
	    var $container = $('.'+el+' .container');
	    $container.imagesLoaded(function () {

	        $container.masonry({
	            itemSelector: '.grid',
	            columnWidth: '.grid'
	        });
	        $container.masonry();

	        $container.find('img').off('load.'+el).on('load.'+el, function () {
	            $container.masonry();
	        });
	    });		
	},
	displayComment : function(pid) {
		var checkUrl = this.b.PAGE.split(','),
			type = (checkUrl[0] == 'forum') ? 'F' : 'P',
			check_view_empty = (this.b.VIEW && this.b.COUNT == 1 && $('.error_404.element[data-name="error_404"]').length == 1) ? true : false;
		if(type == "P" && (this.b.COUNT == 0 || check_view_empty)) {
			$('.error_404.element[data-name="error_404"] *[data-lang]').each(function() {
				$(this).html($.lang[LANG][$(this).attr('data-lang')]);
			});
			return false;
		}

	    var option = (this.b.PARENT.settings) ? jQuery.parseJSON(this.b.PARENT.settings) : {};
	    if(typeof option.comment_display == 'undefined' || !option.comment_display || option.comment_display=="OFF") return false;

	    $.comment.init({
	        pid : pid,
	        type : type
	    });
	},
	loaded : function() {
		var b = _this.b;
		if($('body').width() <= 768 && $('.dsgn-body').hasClass('sidebar')) {
			if($('header.navbar').hasClass('sidebar')) {
				cssSidebar('off');
			}
			//$('.dsgn-body').removeClass('sidebar').addClass('removed-sidebar');
		} else if ($('body').width() > 768 /*&& $('.dsgn-body').hasClass('removed-sidebar')*/) {
			if($('header.navbar').hasClass('sidebar')) {
				cssSidebar('on');
			}
			//$('.dsgn-body').removeClass('removed-sidebar').addClass('sidebar');
		}

		$('.carousel').live('click',function(){
		    $('.carousel').carousel('cycle');
		});

		$('.carousel').live({
			click: function() {
				$('.carousel').carousel('cycle');
			},
			hover:  function(){
				$('.carousel').carousel('cycle');
			}
		});

        $('.carousel').carousel({
        	pause: 'none'
        });

        $('[data-fixed-width]').each(function() {
            $(this).css('width',$(this).attr('data-fixed-width')+'px');
        });
        
        SCREEN = getScreen();
        var targetUrl = document.URL,
        	isMoveLink = targetUrl.match(/#/g);

        $('.menu-logo-top').show();

    	if(typeof $.cookie('gallery-item') != 'undefined' && b.VIEW == '') {
    		moveGallery($.cookie('gallery-item'));
    	} else if(typeof $.cookie('forum-item') != 'undefined' && b.VIEW == '') {
    		scrollToBlock('.element[data-id="' + $.cookie('forum-item') + '"]', 1000);
    		$.removeCookie('forum-item', { path : '/' });
    	}

	    if(b.TRAFFICLIMIT) {
	    	if($('.made-with-creatorlink').length > 0) $('.made-with-creatorlink').hide();
	    	var host = (typeof SERVICE == 'undefined') ? property.SERVICE : SERVICE,
	    		str = (host.indexOf('gabia') > -1) ? '\
					<div class="traffic-limit-modal creatorlink-gabia">\
						<div class="inner-box text-center">\
	                        <p class="col-md-12 col-sm-12 col-xs-12">\
	                        	<a href="//www.gabia.com" target="_blank" class="gabia-logo"><img src="//storage.googleapis.com/i.addblock.net/gabia/logo_w.png" alt="Gabia logo" /></a>\
	                        	<img src="//storage.googleapis.com/i.addblock.net/gabia/logo_and.png" class="logo-and"/>\
	                        	<a href="//creatorlink.gabia.com" target="_blank" class="creatorlink-logo"><img src="//storage.googleapis.com/i.addblock.net/creatorlink_logo_w1.png" alt="Creatorlink-gabia logo" /></a>\
	                        	<a href="//www.gabia.com/mygabia/service" target="_blank" class="limit-txt">' + $.lang[LANG]['plan.traffice-space.limit.modal.text.gabia'] + ' </a>\
                        	</p>\
						</div>\
					</div>\
	    	' : '\
					<div class="traffic-limit-modal">\
						<div class="inner-box text-center">\
	                        <p class="col-md-6 col-sm-12 col-xs-12 col-md-offset-3"><a href="//creatorlink.net"><img src="//storage.googleapis.com/i.addblock.net/creatorlink_logo_w.png" alt="Creatorlink logo" />' + $.lang[LANG]['plan.traffice-space.limit.modal.text'] + ' <i class="fa fa-angle-double-right" aria-hidden="true"></i></a></p>\
                            <p class="col-md-3 col-sm-12 col-xs-12"><a href="//creatorlink.net"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + $.lang[LANG]['plan.traffice-space.limit.modal.title'] + '</a></p>\
						</div>\
					</div>\
	    	';
	    	$('body').append(str);
	    } else {
    		if($('.made-with-creatorlink').length > 0 && $('.made-with-creatorlink').css('display') == "none") $('.made-with-creatorlink').show().attr('style','display: block!important');
	    }

    	if($('body').width() > 768) {
    		$('.form-date').attr('type','text');
    		$('.form-date').attr('maxlength','2');
    		$('.date-yyyy').attr('maxlength','4');
    	}

        $.modalOFF();
	},
	loadPage : function(page) {

	}
}

var aosAddblock = function(site_settings,settings,$el){
	var block_aos_site =  (typeof site_settings.block_aos != 'undefined' && site_settings.block_aos) ? site_settings.block_aos : {},
 		block_aosAll_site =  (typeof block_aos_site['all'] != 'undefined' && block_aos_site['all']) ? block_aos_site['all'] : {},
        aos_time_site = (typeof block_aosAll_site.t != 'undefined' && block_aosAll_site.t) ? block_aosAll_site.t : '',
        aos_motion_site = (typeof block_aosAll_site.m != 'undefined' && block_aosAll_site.m) ? block_aosAll_site.m : '',
        aos_duration_site = (typeof block_aosAll_site.d != 'undefined' && block_aosAll_site.d) ? block_aosAll_site.d : '700';

    var block_aos_page =  (typeof settings.block_aos != 'undefined' && settings.block_aos) ? settings.block_aos : {},
        aos_time_page = (typeof block_aos_page.t != 'undefined' && block_aos_page.t) ? block_aos_page.t : '',
        aos_motion_page = (typeof block_aos_page.m != 'undefined' && block_aos_page.m) ? block_aos_page.m : '',
        aos_duration_page = (typeof block_aos_page.d != 'undefined' && block_aos_page.d) ? block_aos_page.d : '700';

    if(block_aos_site && (aos_time_site > aos_time_page) && aos_motion_site!='no-motion' && 
    	$('body').find('.menu-lock-block').length<1 && $('body').find('.site-lock-block').length<1) { 
        $el.attr('data-aos',aos_motion_site)
        	.attr('data-aos-duration',aos_duration_site)

    	if(aos_motion_site == 'fade-zoom-in' || aos_motion_page =='fade-zoom-in') {	            
	    	$el.attr('data-aos-easing','ease-in-back')
	    		.attr('data-aos-offset','300');
		}
		isAosBlock = true;
    } else {
        if($.isEmptyObject(block_aos_page) == false && (aos_time_site < aos_time_page) && aos_motion_page!='no-motion' && 
        	$('body').find('.menu-lock-block').length<1 && $('body').find('.site-lock-block').length<1) {
            $el.attr('data-aos',aos_motion_page)
            	.attr('data-aos-duration',aos_duration_page);
        	if(aos_motion_site == 'fade-zoom-in' || aos_motion_page =='fade-zoom-in') {	            
		    	$el.attr('data-aos-easing','ease-in-back')
		    		.attr('data-aos-offset','300');
			}
        	isAosBlock = true;
        }
    }	

 //    if(aos_motion_site == 'fade-zoom-in' || aos_motion_page =='fade-zoom-in') {	            
 //    	$el.attr('data-aos-easing','ease-in-back')
 //    		.attr('data-aos-offset','300');
	// 	isAosBlock = true;
	// }
}

var mobileWebfnavCheck = function(vpmode) {
	var checkFnav = ($('.fnav').length > 0 && vpmode=="mobile_web") ? true : false,
		WebType = isMobile();
                
	if(checkFnav && WebType) {
		$('.fnav.fnav-mobile-fnav').css('margin-bottom','53px');
		$('.element.el-footer').css('margin-bottom','100px');
	} else {
		$('.mobilepc_ch').css('margin-bottom','0px');
		$('.element.el-footer').css('margin-bottom','0px');
	}	
	
	if(WebType) {
		$('.element.el-footer').addClass('mpcwebheight');	
		$.mpcWeb.mpcMusicandGoTop(checkFnav,vpmode); 
	}
}

var setlimitdiskPopup = function() {
	var icon = '<i class="site-space-icon fa fa-exclamation-circle"></i>',
		str = '<div class="site-space-disk">\
					<p>'+$.lang[LANG]['plan.disk-space.popup.limit.contents']+'</p>\
				</div>\
				';

	$(this).showModalFlat(icon + $.lang[LANG]['plan.disk-space.popup.limit.title'], str,false,false).addClass('flat-site-spacelimit-modal');
	$('.modal-backdrop.in').css('opacity','0');
}

var setSitePopup = function() {
    if(typeof property.SETTINGS != 'undefined' && property.SETTINGS.showPopup === true && typeof property.SETTINGS.sitePopup != 'undefined' && property.SITELOCK != 'true') {
        sitePopupOpen();
    }
}

var sitePopupOpen = function(idx,data) {
	var site_popup = (typeof data != 'undefined' & data) ? data : new Array();
	if(site_popup.length == 0)  site_popup = (typeof property.SETTINGS.sitePopup != 'undefined' && property.SETTINGS.sitePopup) ? property.SETTINGS.sitePopup : site_popup;
	if(site_popup.length > 0) {
        $('.refresh-popup').show().removeAttr('style');
        var isShow = true;

		if(typeof idx != 'undefined') {
			if($('#'+property.SID+'Popup'+idx).length == 0) isShow = false;
			else $('#'+property.SID+'Popup'+idx).fadeIn();
		} else {

			if($('.site-popup .modal-popup').length > 0) { 
				$('.site-popup .modal-popup').fadeIn();
			} else { 
				isShow = false; 
			}
		}

		if(!isShow) {
	        var modal = $(this).showPopupModal(site_popup,property.SID);
	        return modal;
	    }
	}
}

var sitePopupResize = function() {

	if($('.popup').find('.modal-popup').length == 0) return false;
	
	var img_w = new Array(),
		total_w = 0,
		add_w = 0,
		d_m = ($('.popup-modal').hasClass('popupimg-overflow-y')) ? 30 : 15;
		d_top = $('.header.el-menu').outerHeight() + 15,
		d_left = 0,
		x = 0, y = 0, y_r = 0;

	$('.modal-popup').each(function(i) {
		if($(this).css('display') != 'none') {
			img_w[i] = $(this).width();
			total_w += img_w[i] + d_m;
		}
	});


	var isOverflow = ($('.dsgn-body').width() < (Number($('.popup-modal').children().eq(0).css('left').replace('px',''))+total_w)) ? true : false,
		display_i = -1;

	if(isOverflow) { $('.popup-modal').addClass('popupimg-overflow-y');
	} else { $('.popup-modal').removeClass('popupimg-overflow-y'); }

	$('.modal-popup').each(function(i) {
		if($(this).css('display') != 'none') {
			display_i++;

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
			add_w = add_w + $(this).width();

			var css_val = (isOverflow) ? {'top': x +'px', 'left': y+'px', 'right': y_r+'px', 'margin-left': '0px', 'width': img_w[i], 'max-width': $(this).width()} : {'top': x +'px', 'left': y+'px' , 'width': img_w[i]};
			$(this).css(css_val);
		}
	});

}


var activeEL = function(el) {
    if(typeof el == 'undefined' || el=='') return;
    // header_fixed = $('header.navbar').height();
    // var offset = ($('.dsgn-body').hasClass('sidebar')) ? 0 : -header_fixed;
    // $('body').scrollTo('.'+el,0,{offset:offset});

   	scrollToBlock('.'+el);
}

var setLoginoutNav = function (sid, callback) {
	$('.creatorlink-header').remove();
	$('#tpl-menu li.loginout').remove();
	var str = '<div class="creatorlink-header">\n';
	str = str + '<div class="logo-text col-md-4 col-sm-6">\n';
	str = str + '	<a href="http://creatorlink.net"><img src="https://storage.googleapis.com/i.addblock.net/main/site_creatorlink_logo.png" alt="" /></a>\n';
	str = str + '</div>\n';
	str = str + '<div class="data-site col-md-4 col-sm-6 col-xs-6">\n';
	str = str + '	<ul>\n';
	str = str + '		<li class="profile-img"></li>\n';
	str = str + '		<li><span class="text">' + sid + '</span></li>\n';
	str = str + '	</ul>\n';
	str = str + '</div>\n';
	str = str + '<div class="data-user col-md-4 col-sm-6 col-xs-6">\n';
	str = str + '	<ul class="pull-right">\n';
	str = str + '		<li class="profile-img"></li>\n';
	str = str + '		<li><span class="caret"></span></li>\n';
	str = str + '	</ul>\n';
	str = str + '	<div class="message"></div>\n';
	str = str + '</div>\n';
	str = str + '</div>\n';
	str = str + '\n';
	str = str + '\n';
	$('.header.el-menu').before(str);
	var top = ($('header').hasClass('transparent')) ? '0' : '55px';
	$('.header.el-menu').css('top',top);
	if(top == '0') $('.creatorlink-header + .popover + .fixed-position').css('top','0');

	if(typeof callback == 'function') callback();
}

var getProfileAuthor = function(sid,img) {
	var imgstr = (img == 'https://storage.googleapis.com/i.addblock.net/member/profile_default.jpg') ? 'https://storage.googleapis.com/i.addblock.net/member/profile_default_top.png' : img;
	var str = 		'<span class="hexagon">\n';
		str = str + '	<svg viewBox="0 0 32 32">\n';
		str = str + '		<pattern id="pfimg-" + sid +"" patternUnits="userSpaceOnUse" width="32" height="32">\n';
		str = str + '			<image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href=""+imgstr+"" x="-2px" y="-2px" width="36" height="36"></image>\n';
		str = str + '		</pattern>\n';
		str = str + '		<polygon points="16 0 30 8 30 24 16 32 2 24 2 8" fill="url(#pfimg-" + sid +")"></polygon>\n';
		str = str + '	</svg>\n';
		str = str + '</span>\n';
	$('.data-site .profile-img').append(str);
}

var getProfileMember = function() {
	$.getJSON('/template/checkLogin', function(data) {
		// if(!data.user) { }
		var imgstr = (data.myimg == 'https://storage.googleapis.com/i.addblock.net/member/profile_default.jpg') ? 'https://storage.googleapis.com/i.addblock.net/member/profile_default_top.png' : data.myimg;
		var str = 		'<span class="hexagon">\n';
			str = str + '	<svg viewBox="0 0 32 32">\n';
			str = str + '		<pattern id="pfimg-" + data.user +"" patternUnits="userSpaceOnUse" width="32" height="32">\n';
			str = str + '			<image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href=""+imgstr+"" x="-2px" y="-2px" width="36" height="36"></image>\n';
			str = str + '		</pattern>\n';
			str = str + '		<polygon points="16 0 30 8 30 24 16 32 2 24 2 8" fill="url(#pfimg-" + data.user +")"></polygon>\n';
			str = str + '	</svg>\n';
			str = str + '</span>\n';
		$('.data-user .profile-img').append(str);
		$('.data-user .profile-img').addClass('user-'+data.name);
		$('.data-user .user-name').append('<span>'+data.name+'</span>');
		// $('.data-user .logoutlink').before('<span>You&apos;re logged in as '+data.name+' </span>');

		var str3_mysite = '';
		if($('.data-site ul li span.text').text() == data.sid) {
			$('.data-site').text('');
			var isNewmessage = (data.newCount == 0 ) ? false : true;
			var str2 = 		'<ul class="sub-menu pull-right">\n';
				str2 = str2 + '	<li class="newCount">\n';
				str2 = str2 + '		<a href="/message/lists"><i class="fa fa-envelope"></i>\n';
				if(isNewmessage) str2 = str2 + '<span class="badge">"+data.newCount+"</span>\n';
				str2 = str2 + '</a>\n';
				str2 = str2 + '	</li>\n';
				str2 = str2 + '</ul>\n';
			$(".data-user .message").append(str2);
		} else {
			str3_mysite = '		<div class="item"><a href="http://'+data.sid+'.creatorlink.net"><img src="https://storage.googleapis.com/i.addblock.net/main/icon_mysite.png"/><img src="https://storage.googleapis.com/i.addblock.net/main/icon_mysite_active.png" class="active"/>'+ $.lang[LANG]['header.mysite'] + '</a></div>\n';
		}

		var str3 = 		'<div class="popover bottom" id="pop"+data.name+"">\n';
			str3 = str3 + '	<div class="arrow"></div>\n';
			str3 = str3 + '	<div class="popover-content">\n';
			str3 = str3 + '		<div class="user-name">"+data.name+"</div>\n';
			str3 = str3 + str3_mysite;
			str3 = str3 + '		<div class="item"><a href="http://creatorlink.net"><img src="https://storage.googleapis.com/i.addblock.net/main/icon_dashboard.png"/><img src="https://storage.googleapis.com/i.addblock.net/main/icon_dashboard_active.png" class="active"/>'+ $.lang[LANG]['header.dashboard'] + '</a></div>\n';
			str3 = str3 + '		<div class="item"><a href="/mypage" ><img src="https://storage.googleapis.com/i.addblock.net/main/icon_acc.png"/><img src="https://storage.googleapis.com/i.addblock.net/main/icon_acc_active.png" class="active"/>'+ $.lang[LANG]['header.mypage'] +'</a></div>\n';
			str3 = str3 + '		<div class="item"><a href="/profile/myboard" ><img src="https://storage.googleapis.com/i.addblock.net/main/icon_qna.png"/><img src="https://storage.googleapis.com/i.addblock.net/main/icon_qna_active.png" class="active"/>'+ $.lang[LANG]['header.cts'] +'</a></div>\n';
			str3 = str3 + '		<div class="item user-logout"><a href="/member/login/out" class="logoutlink"><img src="https://storage.googleapis.com/i.addblock.net/main/icon_logout.png"/><img src="https://storage.googleapis.com/i.addblock.net/main/icon_logout_active.png" class="active"/>'+ $.lang[LANG]['header.logout'] + '</a></div>\n';
			str3 = str3 + '	</div>\n';
			str3 = str3 + '	</div>\n';
		$('.creatorlink-header').after(str3);

	});
}

var pageHeight = function() {
    $('.page-comments').css('margin-top','0px');
    $('.el-footer').css('margin-top','0px');
    var docHeight = $('.dsgn-body').height();
    $('.dsgn-body').wrapInner('<div class="dsgn-body-wrap"></div>');
    var dsgnHeight = $('.dsgn-body-wrap').height();
    var diff = docHeight - dsgnHeight;
    $('.dsgn-body > .dsgn-body-wrap').contents().unwrap();
    return (diff>0) ? diff : 0;
}

var setHeight = function(height) {
	if(typeof property.VIEW == 'undefined' || property.VIEW == "") return false;
    if(height>0) {
        height = (typeof MODE == 'undefined') ? height : height-35;
        if($('.page-comments').length) {
            $('.page-comments').css('margin-top',height+'px');
		} else if($('.page-bottomlist').length) {
			$('.page-bottomlist').css('margin-top',height+'px');
        } else if($('.el-footer').length) {
            $('.el-footer').css('margin-top',height+'px');
        }
    }
}

var appendGalleryFrame = function(tpl,seq,elsettings,bt_type) {
	var bt_type = (bt_type) ? bt_type : 'gallery';
	if(property.TEMPLATE == '') tpl.find('[data-gallery]').attr('data-gallery','#gframe-' + seq);

	var settings = (typeof elsettings == 'object') ? elsettings : {};
    if($.isEmptyObject(settings)) settings = (typeof elsettings != 'undefined' && ($.isEmptyObject(elsettings) === false)) ? $.parseJSON(elsettings) : {};

	var img_onoff = (settings != null && typeof settings.img_original_display != 'undefined' &&  settings.img_original_display) ? settings.img_original_display : 'OFF',
		title_onoff = (settings != null && typeof settings.gframe_title_visible != 'undefined' && settings.gframe_title_visible == 'OFF') ? false : true,
		autoplay = (settings != null && typeof settings.gframe_autoplay != 'undefined' && settings.gframe_autoplay == 'ON') ? true : false,
		interval = (settings != null && typeof settings.gframe_interval != 'undefined' && settings.gframe_interval) ? settings.gframe_interval : 5000;

	tpl.find('[data-gallery]').attr({'data-img-original':img_onoff, 'data-gallery-title':title_onoff});
	if(!title_onoff) {
		tpl.find('[data-gallery]').attr({'data-title':''});
	}

	galleryFrame(seq,autoplay,interval,bt_type);
	return tpl;
}

var galleryFrame = function (id,autoplay,interval,bt_type) {
	var bt_type = (bt_type) ? bt_type : 'gallery';
    $('#gframe-' + id).remove();
    var str = '\
		<div id="gframe-' + id + '" class="blueimp-gallery blueimp-gallery-controls" data-start-slideshow="' + autoplay + '" data-slideshow-interval="' + interval + '">\
		    <div class="slides"></div>\
		    <h3 class="title"><p>caption test</p></h3>\
		    <a class="prev"><img src="https://storage.googleapis.com/i.addblock.net/icon/fa_gframe_prev.png" alt="" /></a>\
		    <a class="next"><img src="https://storage.googleapis.com/i.addblock.net/icon/fa_gframe_next.png" alt="" /></a>\
			<a class="close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" width="22" height="22"><polygon points="22 1.06 20.94 0 11 9.94 1.06 0 0 1.06 9.94 11 0 20.94 1.06 22 11 12.06 20.94 22 22 20.94 12.06 11 "/></svg></a>\
		    <a class="play-pause"></a>\
		    <ol class="indicator"></ol>\
		</div>\
    ';
    
    $('.'+bt_type+'-frame').append(str);
}        

var makeLinkUrl = function(link, one, view) {
    var link_url = '', link_val = '',
		// IE ERROR_includes__H.20210603
        // is_menu = (property.MENULIST.includes(link.replace(/ /g,'-'))) ? true : false,
        is_menu = ($.inArray(link.replace(/ /g,'-'),property.MENULIST) > -1) ? true : false,
        regex = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,7}(\:[0-9]+)?(\/\S[^\{\}]*)?$/,
        regex2 = /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,7}(\:[0-9]+)?(\/\S[^\{\}]*)?$/;

	if(link.match(/^flink\@[0-9]/gi) !== null) return link;

    if(one) {
    	link_url = (view) ? '/#' : '#';
    	link_url = (view && !property.PUBLISH) ? '/render/index#' : link_url;
    	if(is_menu) link_url = '/';
    } else {
        link_url = (property.URL=='/' || is_menu) ? '/' : property.URL + '/'; 
    }

    if(link) {
		// IE ERROR_includes__H.20210603
        // link_val = (property.MENULIST.includes(link.replace(/ /g,'-'))) ? link_url + link.replace(/ /g,'-') : (!regex2.test(link) && regex.test(link)) ? '//'+link : link;
        link_val = ($.inArray(link.replace(/ /g,'-'),property.MENULIST) > -1) ? link_url + link.replace(/ /g,'-') : (!regex2.test(link) && regex.test(link)) ? '//'+link : link;
    }
    return link_val;
}

var checkError = function(data) {
    if(typeof data.error != 'undefined' && data.error) {
        alert(data.error);
        if(data.error=='No user data') {
            location.href='/member/login';
        }
        return true;
    }
    return false;
}

var funcCallback = function(func,callback) {
    func();
    if(typeof callback=='function') {
        callback();
    }
}

var cssSidebar = function(onoff) {
	var width = (onoff == 'on') ? '260px' : '',
		dsgn_css = CSSJSON.toJSON($('#dsgn-body').text());

	if(width) {
		if(typeof dsgn_css['children']['.dsgn-body.sidebar'] == 'undefined') {
			dsgn_css['children']['.dsgn-body.sidebar'] = {'children' : {}, 'attributes' : { 'padding-left' : width, 'padding-top': '0px!important' }};
		}
	} else {
		if(typeof dsgn_css['children']['.dsgn-body.sidebar'] != 'undefined') {
			delete dsgn_css['children']['.dsgn-body.sidebar'];
		}
	}

	$('#dsgn-body').text(CSSJSON.toCSS(dsgn_css));
}

var getScreen = function() {
    var wid = window.innerWidth;

    var screen_size = 0;
    if (0 < wid && wid < 480) {
        screen_size = 320;
    } else if(wid <= 480 && wid <768) {
        screen_size = 480;
    } else if (768 <= wid && wid < 992) {
        screen_size = 768;
    } else if (992 <= wid && wid < 1200 ) {
        screen_size = 992;
    } else if (wid >= 1200) {
        screen_size = 1200;
    }

    return screen_size;
}

var getScreenIndex = function() {
    var idx = 0;
    switch(SCREEN) {
        case 320:
        case 480:
            idx = 2;
            break;
        case 769:
            idx = 1;
            break;

        case 992:
        case 1200:
            idx = 0;
            break;

        default : idx = 0; break;
    }
    return idx;
}
var moveGallery = function(element) {
    var header_fixed = $('header.navbar').height(),
    	offset = ($('.dsgn-body').hasClass('sidebar')) ? 0 : -header_fixed,
    	item = $('.gallery-item[data-seq="'+element+'"]');

    if($('header.navbar').hasClass('disableOffset') && !$('.'+link).hasClass('el_0')) offset = 0;
    if(item.length==0) {
    	if($('.element[data-id="'+element+'"]').length > 0) item = $('.element[data-id="'+element+'"]');
    	else return;
    }
    var sTop = item.offset().top + offset;
    $('html, body').animate({
        scrollTop: sTop
    }, 500, 'easeInOutQuart');		  

    $.removeCookie('gallery', { path: '/' });
    $.removeCookie('gallery-item', { path : '/' });
}

var scrollToBlock = function(el,interval) {
	if(typeof interval == 'undefined') interval = 1200;
	if(typeof el == 'undefined' || !el || $(el).length == 0) return;

	var header_fixed = $('header.navbar').outerHeight(),
		offset = $('.dsgn-body').scrollTop();

	if(!$('.dsgn-body').hasClass('sidebar') && !$('header.navbar').hasClass('disableOffset')) offset -= header_fixed;
	var sTop = $(el).offset().top + offset;
	$('html, body').animate({ scrollTop: sTop }, interval, 'easeInOutQuart');
}

var clearDsgnbody = function() {
	$('.element[data-id="all_products"]').remove();
	$('.psearch-view').remove();
	$('.menu-lock-block').remove();
	$('.site-lock-block').remove();
	$('.config-image-view').hide();
	$('.forum-view').remove();
	$('.page-comments').remove();
	$('.page-bottomlist').remove();
	$('.tpl-page-footer').remove();
	$('.el-footer').hide();
	var element = $('div[class*="el_"]:not([class*=el__])'),
		css = $('style[id*="el_"]:not([id*=el__])'),
		js = $('script[id*="js_"]:not([id*=el__])');

	element.remove();
	css.remove();
	js.remove();
	// $.each(element, function(i,v) {
	// 	$('.el_' + (i+1)).remove();
	// 	$('#el_' + (i+1) + 'css').remove();
	// 	$('#js_' + (i+1)).remove();
	// });
}

var golink = function(_this,link) {
	var wloc = window.location,
		local_link = (wloc.hostname == link.hostname) ? true : false,
		local_arr = ['/_register', '/_login'];

	if(local_link && $.inArray(link.pathname,local_arr) == -1) {
    	var loc = link.pathname,
    		uri = (_this.b.PUBLISH) ? loc : loc.replace('/render/','');

    	if((uri == '/render' || uri == '/') && !_this.b.ONE) {
    		uri = '';
    		$.each(_this.b.SMENU,function(i,v) {
    			var menu_name = (v.name).replace(' ','-');
    			var checkMenuName = (uri == menu_name) ? true : false,
    				checkMenuLink = (typeof v.link != 'undefined' && v.link) ? true : false;

    			if(checkMenuName && checkMenuLink) {
    				uri = (v.link).replace(' ','-');
    			}
    		});
    		
    	}

    	var go = (_this.b.PUBLISH) ? '/' + uri + link.hash: '/render/' + uri + link.hash;
		_this.history.pushState(null,_this.b.TITLE,go);

		if(typeof $.cookie('forum-item') != 'undefined') {
			setTimeout(function() {
				scrollToBlock('.element[data-id="' + $.cookie('forum-item') + '"]', 1000);
	    		$.removeCookie('forum-item', { path : '/' });
			}, 300);
		}
	} else {
		location.href = link.href;
	}
}

var parallax = function() {
	var deviceScreen = getScreen();
    $('.element[data-parallax="true"]').each(function() {
        //var yPos = -($('body').height() - $(document).scrollTop());
        // var yPos = -($(this).offset().top - $(document).scrollTop());

        // yPos = (yPos/100);
        // coords = '50% '+ yPos + 'px';
        // if(isMobile())
	       //  $(this).css('background-attachment','fixed !important');
        // else 
        var deviceAgent = navigator.userAgent.toLowerCase();
		if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
			$(this).css('background-attachment','scroll');
		} else {
			$(this).css('background-attachment','fixed');
		}
        $(this).css('background-position','center center');
        $(this).css('-webkit-background-size','cover');
		$(this).css('-moz-background-size','cover');
		$(this).css('-o-background-size','cover');
		$(this).css('background-size','cover');
        $(this).css('background-repeat','no-repeat');
    });
}



		var allProductSortNav = function(elsettings, total) {
		    var settings = elsettings;
		    var orderby = (typeof settings.orderby !== 'undefined') ? settings.orderby.split('||') : ['true', 'false', 'false', 'false', 'false', 'false'];
    		var orderby_val = (typeof settings.orderby_val !== 'undefined') ? settings.orderby_val :
                        {'recent':'최신등록순',
                        'lowprice':'낮은가격순',
                        'review_cnt':'리뷰많은순',
                        'high_score':'평점높은순',
                        'sales':'누적판매순',
                        'hits':'조회순'};
		    var cookie_allproducts_orderby = $.cookie('gallery-category-all_products');
		    
		    var allproducts_sort_list = '';
		    var i = 0;
		    $.each(orderby_val, function(k, v){
		        if (orderby[i] == 'true') {
		            var active = (cookie_allproducts_orderby == k)? 'active':'';
		            allproducts_sort_list += '<li class="'+ active +'"><a href="javascript:;" data-idx="'+k+'">'+v+'</a></li>';
		        }
		        
		        i++;
		    });

		    var html = '\
		    <div class="allProducts-sort-wrap container">\
		    	<div class="allProducts-sort-mobile">\
		            <div class="dropdown">\
		                <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;">\
			                <span>'+orderby_val[cookie_allproducts_orderby]+'</span>\
			                <svg viewBox="0 0 14 14" width="14" height="14"><polygon points="12.94 2.94 7 8.88 1.06 2.94 0 4 7 11 14 4 "></polygon></svg>\
		                </a>\
		                <ul class="gallery-category-nav dropdown-menu">\
		                    ' + allproducts_sort_list +
		                '</ul>\
		            </div>\
		            <div>총 '+ total +'개</div>\
		        </div>\
			    <ul class="gallery-category-nav allProducts-sort-list">\
			        ' + allproducts_sort_list +
			    	'<li>총 '+ total +'개</li>\
			    </div>\
		    </div>';

		    return html;
		}

		var loadAllproductSort = function(el, elsettings, total) {
		    var $el = $(el);
		    var allproducts_sort_html = allProductSortNav(elsettings, total);
		    $el.prepend(allproducts_sort_html);

		    var gc_width_control = ($el.find('.container').hasClass('full-width')) ? true : false;
		    if(gc_width_control) {
		        $el.find('.allProducts-sort-wrap').addClass('full-width');
		        $el.find('.gallery-category-nav').addClass('full-width');
		    } else {
		        $el.find('.allProducts-sort-wrap').removeClass('full-width');
		        $el.find('.gallery-category-nav').removeClass('full-width');
		    }
		}

		var setAllProductsCurrentCat = function(elsettings) {
		    var orderby = (typeof elsettings.orderby !== 'undefined')? elsettings.orderby.split('||') : ['true', 'false', 'false', 'false', 'false', 'false'];
		    var orderby_val = (typeof elsettings.orderby_val !== 'undefined')? elsettings.orderby_val :
		        {'recent':'최신등록순',
		        'lowprice':'낮은가격순',
		        'review_cnt':'리뷰많은순',
		        'high_score':'평점높은순',
		        'sales':'누적판매순',
		        'hits':'조회순'};

		    var orderby_key = new Array();
		    var i = 0;
		    $.each(Object.keys(orderby_val), function(idx, v){
		        if(orderby[idx] == 'true') {
		            orderby_key[i] = v;
		            i++;
		        }
		    });
		    var first_sort = orderby_key[0];
		    var cookie_gallery_category = (typeof $.cookie('gallery-category-all_products') !== 'undefined' && $.cookie('gallery-category-all_products') != '')? $.cookie('gallery-category-all_products'):first_sort;
		    if(orderby_key.indexOf(cookie_gallery_category) == -1) {
		        cookie_gallery_category = first_sort;
		        $.cookie('gallery-category-all_products', first_sort, { path: '/', expires: 12 * 60 * 60 * 1000 });
		    }
		    
		    return first_sort;
		}

function isMenuLock(callback) {
	var deferred = $.Deferred();
    var is_lock_block = 'active', r;
    var display_target = (property.VIEW) ? '.cl-s-product-detail, .cl-s-product-review, .cl-s-product-qna, .tpl-page-footer, .tpl-page-toolbar, .page-comments, .page-bottomlist' : '';

    if(property.ISLOCK == 'true') { 
    	r = $.post('/template/menuLockController/type/lock_check', {s: property.SMENU, sid: property.SID, page: property.PAGE, publish : property.PUBLISH}, function(data) {
			var lock_type = data.lock_type,
				lock_error_type = (typeof data.error_data != 'undefined' && data.error_data.type) ? '.' + data.error_data.type : '';
			
			if(!data.error && data.result) { 
				property.ISLOCK = 'false';
			} else {
				// var checkGotoURL = '';
				// if((property.SITEUM == '1' || property.SITEUM == '2') && lock_error_type == '') checkGotoURL = '/_login';
				// else if(property.SITEUM == '2'&&  $.inArray(lock_error_type,['.unlikesite','.creatorlink']) > -1) checkGotoURL = '/_register';
				// if(checkGotoURL) {
				// 	location.href = checkGotoURL;
				// 	return false;
				// }

				var text = $.lang[LANG]['render.menu-lock.' + lock_type + '.text'];
				if (typeof data.menuLockMsg !== 'undefined' && data.menuLockMsg) {
					text = data.menuLockMsg;
				}

				if (lock_type=='umlevel') {
					if(lock_error_type == '' && property.SITEUM == '1') lock_error_type = '.onlylogin';

					text = $.lang[LANG]['render.menu-lock.' + lock_type + '.text' + lock_error_type ];
					if(lock_error_type == '.lowerlevel') text = text.replace(/\#/gi, data.error_data.umlevel);
				}

				var str = '\
							<div class="menu-lock-block">\
								<div class="inner-box text-center">\
									<div class="form-inline" role="form">\
										<div class="text">\
											<p> ' + text + ' </p>\
										</div>';
					if(lock_type=='password') {
						str = str + '\
										<div class="form-group">\
											<input class="form-control" type="password" placeholder="password" data-lock-password=""/>\
											<label class="error-text"></label>\
										</div>\
										<div class="form-group">\
											<span class="btn" data-edit="true" data-selector=".btn" data-lock-submit="">'+$.lang[LANG]['render.lock.password.submit']+'</span>\
										</div>\
						';
					}
					str = str + '\
									</div>\
								</div>\
							</div>\
				';
		        $('.header.el-menu').after(htmlspecialchars_decode(str));
			}
		    if(typeof callback == 'function') {
		    	callback();

		    	if(display_target) {
					setTimeout(function() {
				    	if(property.ISLOCK == 'true') $(display_target).addClass('hide');
				    	else $(display_target).removeClass('hide');
					},20);
		    	}
		    }

    	},'json');
    } else {
	    if(typeof callback == 'function') {
	    	callback();
			setTimeout(function() {
				if(display_target) $(display_target).removeClass('hide');
			},20);
	    }
	}

	deferred.resolve();
	return deferred.promise();
}

function isSitePasswordLock() {
	var deferred = $.Deferred();
	//if(property.VALIDPLAN && property.VALIDTYPE != 'PK' && property.VALIDTYPE != 'FR') {
	if(property.SETTINGS.passwordUse == undefined) {
		property.SETTINGS.passwordUse = false;
	}

	if(property.SETTINGS.passwordUse === true && property.SITELOCK == 'true') {
		r = $.post('/template/siteLockController/type/lock_check', {sid: property.SID, publish : property.PUBLISH}, function(data) {
			var lock_error_type = (typeof data.error_data != 'undefined' && data.error_data.type) ? '.' + data.error_data.type : '';
			console.log(data);
			if(!data.error && data.result) { 
				property.SETTINGS.passwordUse = false;
			} else {
				var str = '\
					<div class="site-lock-block">\
						<div class="inner-box text-center">\
							<div class="form-inline" role="form">\
								<div class="text">\
									<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="625 326 116 116" width="114" height="114"><path d="M700.5 379.5h-36v-12c0-9.92 8.08-18 18-18s18 8.08 18 18v12zm-34-2h32v-10c0-8.82-7.18-16-16-16s-16 7.18-16 16v10z"/><path d="M700.88 415.5h-36.75c-4.2 0-7.63-3.42-7.63-7.63v-22.75c0-4.2 3.42-7.63 7.63-7.63h1.38v2h-1.38c-3.1 0-5.63 2.52-5.63 5.63v22.75c0 3.1 2.52 5.63 5.63 5.63h36.75c3.1 0 5.63-2.52 5.63-5.63v-22.75c0-3.1-2.52-5.63-5.63-5.63h-1.38v-2h1.38c4.2 0 7.63 3.42 7.63 7.63v22.75c-.01 4.21-3.43 7.63-7.63 7.63z"/><path d="M665.5 377.5h34v2h-34z"/><path d="M683 442c-31.98 0-58-26.02-58-58s26.02-58 58-58 58 26.02 58 58-26.02 58-58 58zm0-114c-30.88 0-56 25.12-56 56s25.12 56 56 56 56-25.12 56-56-25.12-56-56-56z"/><circle cx="683" cy="393" r="4"/><path d="M683 403c-.55 0-1-.45-1-1v-9c0-.55.45-1 1-1s1 .45 1 1v9c0 .55-.45 1-1 1z"/></svg>';
						if(typeof data.sitelock_text != 'undefined' && data.sitelock_text) {
							str += '<p class="title">'+data.sitelock_text+'</p>';
						} else {
							str += '<p class="title">'+$.lang[LANG]['render.site-lock.password.text']+'</p>';
						}
						str += '</div>\
								<div class="form-group">\
									<div>\
										<input type="password" placeholder="'+$.lang[LANG]['render.site-lock.password.placeholder']+'" data-lock-password=""/>\
										<label class="error-text"></label>\
									</div>\
									<span class="btn" data-edit="true" data-selector=".btn" data-lock="site" data-lock-submit="">\
									<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="676 378.59 13 9.41" width="13" height="9"><path d="m681 388-5-5 1.41-1.41 3.59 3.58 6.59-6.58L689 380z"></path></svg>\
									</span>\
								</div>\
							</div>\
						</div>\
					</div>\
				';
		        $('.header.el-menu').after(htmlspecialchars_decode(str));
			}
		}, 'json');
	}
	
    deferred.resolve();
	return deferred.promise();
}


function isUserCertified(history) {
	var referrer = (document.referrer !== undefined)? document.referrer.replace(/^https?:\/\//, ''):'';
	var seg = referrer.split('/');

	if(property.CERT_USE == 'A' && property.VALIDTYPE != 'BN' && property.VALIDTYPE != 'SM') { //요금제 만료
		var str = '\
			<div class="site-lock-block">\
				<div class="inner-box text-center">\
					<div class="form-inline">\
						<div class="text">\
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118 118" width="118" height="118"><path d="M76.88 52.5h-.38v-10c0-9.92-8.08-18-18-18s-18 8.08-18 18v10h-.38c-4.2 0-7.62 3.42-7.62 7.62v22.75c0 4.2 3.42 7.62 7.62 7.62h36.75c4.2 0 7.62-3.42 7.62-7.62V60.12c.01-4.2-3.41-7.62-7.61-7.62zm-34.38-10c0-8.82 7.18-16 16-16s16 7.18 16 16v10h-32v-10zm40 40.38c0 3.1-2.52 5.62-5.62 5.62H40.12c-3.1 0-5.62-2.52-5.62-5.62V60.12c0-3.1 2.52-5.62 5.62-5.62h36.76c3.1 0 5.62 2.52 5.62 5.62v22.76z"/><path d="M59 1C27.02 1 1 27.02 1 59s26.02 58 58 58 58-26.02 58-58S90.98 1 59 1zm0 114C28.12 115 3 89.88 3 59S28.12 3 59 3s56 25.12 56 56-25.12 56-56 56z"/><path d="M59 64c-2.21 0-4 1.79-4 4 0 1.86 1.28 3.41 3 3.86V77c0 .55.45 1 1 1s1-.45 1-1v-5.14c1.72-.45 3-2 3-3.86 0-2.21-1.79-4-4-4z"/></svg>\
							<p class="title">'+$.lang[LANG]['siteum.site.access.limit']+'</p>\
						</div>\
					</div>\
				</div>\
			</div>\
		';
		
		$('.header.el-menu').after(htmlspecialchars_decode(str));
		return false;
	}

	r = $.post('/template/isUserCertified', {sid: property.SID, publish : property.PUBLISH}, function(data) {
		var cert_form = '';
		if((property.CERT_USE == 'Y' && data.cert!='Y') || (property.CERT_USE == 'A' && data.cert_adult!='Y')) {
			var cert_conf = data.cert_conf;
			var ordr_idxx = init_orderid();
			cert_form = '\
				<form name="form_auth" method="post" action="/cert_req">\
					<input type="hidden" name="ordr_idxx" value="'+ordr_idxx+'"/>\
					<!-- 요청종류 -->\
			        <input type="hidden" name="req_tx"       value="cert"/>\
			        <!-- 요청구분 -->\
			        <input type="hidden" name="cert_method"  value="01"/>\
			        <!-- 웹사이트아이디 : ../cfg/cert_conf.php 파일에서 설정해주세요 -->\
			        <input type="hidden" name="web_siteid"   value="'+cert_conf.g_conf_web_siteid+'"/> \
			        <!-- 노출 통신사 default 처리시 아래의 주석을 해제하고 사용하십시요 \
			             SKT : SKT , KT : KTF , LGU+ : LGT\
			        <input type="hidden" name="fix_commid"      value="KTF"/>\
			        -->\
			        <!-- 사이트코드 : ../cfg/cert_conf.php 파일에서 설정해주세요 -->\
			        <input type="hidden" name="site_cd"      value="'+cert_conf.g_conf_site_cd+'" />\
			        <!-- Ret_URL : ../cfg/cert_conf.php 파일에서 설정해주세요 -->\
			        <input type="hidden" name="Ret_URL"      value="'+cert_conf.g_conf_Ret_URL+'" />\
			        <!-- cert_otp_use 필수 ( 메뉴얼 참고)\
			             Y : 실명 확인 + OTP 점유 확인 , N : 실명 확인 only\
			        -->\
			        <input type="hidden" name="cert_otp_use" value="Y"/>\
			        <!-- 리턴 암호화 고도화 -->\
			        <input type="hidden" name="cert_enc_use_ext" value="Y"/>\
\
			        <input type="hidden" name="res_cd"       value=""/>\
			        <input type="hidden" name="res_msg"      value=""/>\
\
			        <!-- up_hash 검증 을 위한 필드 -->\
			        <input type="hidden" name="veri_up_hash" value=""/>\
\
			        <!-- 본인확인 input 비활성화 -->\
			        <input type="hidden" name="cert_able_yn" value=""/>\
\
			        <!-- web_siteid 을 위한 필드 -->\
			        <input type="hidden" name="web_siteid_hashYN" value="Y"/>\
\
			        <!-- 가맹점 사용 필드 (인증완료시 리턴)-->\
			        <input type="hidden" name="param_opt_1"  value="myinfo"/>\
			        <input type="hidden" name="param_opt_2"  value="'+data.userid+'"/>\
				</form>\
				<form name="myinfo_form" method="post" action="/_myinfo_proc">\
					<input type="hidden" id="is_cert" name="is_cert" value="">\
					<input type="hidden" id="up_hash" name="up_hash" value="">\
					<input type="hidden" id="ci_url" name="ci_url" value="">\
					<input type="hidden" id="di_url" name="di_url" value="">\
					<input type="hidden" id="input-name" name="name" value="">\
					<input type="hidden" id="input-birth" name="birth" value="">\
					<input type="hidden" id="input-tel" name="tel" value="">\
					<input type="hidden" id="input-gender" name="gender" value="">\
					<input type="hidden" id="input-email" name="email" value="'+data.email+'">\
					<input type="hidden" id="input-id" name="id" value="'+data.userid+'">\
				</form>\
			';

			if(property.CERT_USE == 'Y'){
				if(property.PAGE!='_register' && property.PAGE!='_login' && property.PAGE!='_forgot' && property.PAGE!='_myinfo') {
					var cert_popup = $.cookie('cert_popup');
					var modal_content = $.lang[LANG]['siteum.cert.identify.verification.txt.1'] + '\
						<div class="info">\
						' + $.lang[LANG]['siteum.cert.identify.verification.txt.2'] + '\
						</div>';
					if(typeof cert_popup !== 'undefined' && cert_popup == 'true' && data.cert == 'N' && seg[1]=='_login' && history.state == null) {
			        	modal_content += cert_form;
						$(this).showModalFlat($.lang[LANG]['siteum.cert.identify.verification'], modal_content, true, true, function() {
							auth_type_check(true);
							//location.href = '/_myinfo';
						},'', $.lang[LANG]['siteum.cert.identify.verification.btn'],'modal-dialog cl-cmmodal cl-s-btn w560 cl-p70 cl-modal cl-close-btn user-not-cert-modal', false, function(){
							$.removeCookie('cert_popup', true, { path: '/', expires: 12 * 60 * 60 * 1000 });
						});
					}
				}
			} else if(property.CERT_USE == 'A') {
				if(!data.userid){
					if(property.ONE && !property.VIEW) { //onepage site
						var onpage_seq = property.pageContent.index[0]['seq'];
						if(onpage_seq!='login' && onpage_seq!='register' && onpage_seq!='forgot'){
							location.href='/_login';
						}
					} else {
						if(property.PAGE!='_login' && property.PAGE!='_register' && property.PAGE!='_forgot') {
							location.href='/_login';
						}
					}
					
				} else {
					var str = '\
					<div class="site-lock-block adultonly">\
						<div class="inner-box text-center">\
							<div class="form-inline">\
								<div class="text">\
								'+cert_form+'\
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120"><path class="st54" d="M49.68 82.35h-4.82V41.79l-8 4.89v-4.76l8.57-5.52h4.25v45.95z"/><path class="st54" d="M80.58 44.77c.42 1.35.78 3.33 1.08 5.94.3 2.6.44 5.83.44 9.68 0 2.71-.18 5.34-.54 7.9-.36 2.56-.98 4.92-1.87 7.08-.97 2.24-2.34 4.04-4.09 5.4-1.76 1.35-3.99 2.03-6.7 2.03-1.86 0-3.54-.31-5.05-.92-1.5-.61-2.74-1.38-3.71-2.32a9.926 9.926 0 0 1-2.13-3.43c-.49-1.31-.73-2.52-.73-3.62h5.65c0 .51.1 1.2.29 2.06.19.87.52 1.6.98 2.19.46.59 1.11 1.1 1.94 1.52.83.42 1.79.63 2.89.63 1.48 0 2.78-.53 3.9-1.59s1.98-2.41 2.57-4.06c.59-1.65 1.03-3.37 1.3-5.17s.41-3.5.41-5.11v-2.41c-.85 1.23-1.9 2.22-3.17 2.98-1.61.97-3.28 1.46-5.01 1.46-2.12 0-3.9-.32-5.36-.95-1.46-.63-2.76-1.61-3.9-2.92-1.06-1.27-1.86-2.86-2.41-4.76s-.83-3.87-.83-5.9c0-1.99.29-3.92.86-5.81.57-1.88 1.39-3.48 2.44-4.79 1.14-1.27 2.55-2.21 4.22-2.83 1.67-.61 3.33-.92 4.98-.92 1.61 0 3.24.32 4.89.95s3.05 1.59 4.19 2.86c1.06 1.32 1.88 2.93 2.47 4.83zm-19.17 5.78c0 1.44.17 2.8.51 4.09.34 1.29.85 2.42 1.52 3.4.68.97 1.5 1.71 2.48 2.22.97.51 1.99.76 3.05.76 1.02 0 2.01-.25 2.98-.76.97-.51 1.82-1.25 2.54-2.22.63-.97 1.13-2.1 1.49-3.4.36-1.29.54-2.66.54-4.09 0-1.44-.18-2.8-.54-4.09-.36-1.29-.86-2.42-1.49-3.4a8.128 8.128 0 0 0-2.54-2.19c-.97-.53-1.97-.79-2.98-.79-1.06 0-2.07.26-3.05.79a7.51 7.51 0 0 0-2.48 2.19c-.68.97-1.19 2.11-1.52 3.4a15.97 15.97 0 0 0-.51 4.09z"/><path class="st54" d="M119 58h-9v-9h-4v9h-9v4h9v9h4v-9h9z"/><path d="M100.91 81C93.26 95.83 77.8 106 60 106c-25.36 0-46-20.64-46-46s20.64-46 46-46c17.8 0 33.26 10.17 40.91 25h4.47C97.44 21.88 80.11 10 60 10c-27.61 0-50 22.39-50 50s22.39 50 50 50c20.11 0 37.44-11.88 45.38-29h-4.47z" fill="#e00"/></svg>\
									<p class="title">'+$.lang[LANG]['siteum.cert.adult']+'</p>\
									'+$.lang[LANG]['siteum.cert.adult.txt']+'\
									<button class="btn cl-s-btn cl-s-btn-full btn-cert" onclick="return auth_type_check(true);">\
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><path d="M22 0H10C7.79 0 6 1.79 6 4v24c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4zm2 28c0 1.1-.9 2-2 2H10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v24z"/><path d="M18 4h-4c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg>\
									'+$.lang[LANG]['siteum.cert.adult.btn']+'</button>\
									<a class="btn cl-s-btn cl-s-btn-primary cl-s-btn-full logout" href="javascript:;">'+ $.lang[LANG]['manager.site-um.logout'] +'</a>\
								</div>\
							</div>\
						</div>\
					</div>\
					';
					$('.header.el-menu').after(htmlspecialchars_decode(str));

					$(document).on('click', '.btn.logout', function(e){
						e.preventDefault();
						$.getJSON('/umember/login/out', function(r) {
							if($.cookie('cert_popup') !== undefined) {
								$.removeCookie('cert_popup', true, { path: '/', expires: 12 * 60 * 60 * 1000 });
							}							
							location.reload();
						},'json');
					});
				}
	    	}
		}
	}, 'json');
}

function call_auth_data(frm) {
	auth_data(frm);
}

function galleryStartHover() {
    $(this).find('figure').addClass('hover');
};
function galleryCloseHover() {
    $(this).find('figure').removeClass('hover');
};
function galleryMovelink() {
	$(this).find('a').click();
};

$(function () {
	$(document).on('click', '.nonePrice', function () {
		alert('로그인 후 이용이 가능합니다.');
		if (property['VALIDTYPE'] != 'SM') {
			$('.login .cl_icon_profile').click();
		} else {
			location.href='/_login';
		}
		return false;
	});

	// $(document).on('click', '.adultonly', function () {
	// 	alert('성인인증 된 회원만 이용 가능합니다.');
	// 	if (property['VALIDTYPE'] != 'SM') {
	// 		$('.login .cl_icon_profile').click();
	// 	} else {
	// 		location.href='/_login';
	// 	}
	// 	return false;
	// });
});

var naverLogCallback = function(callback) {
	if($('#naverLogload').length == 0) {
		var head= document.getElementsByTagName('head')[0];
		var script= document.createElement('script');
		script.type= 'text/javascript';
		script.id= 'naverLogload';
		script.src= '//wcs.naver.net/wcslog.js';
		script.addEventListener('load', callback);
		head.appendChild(script)
	} else {
		if(typeof callback == 'function') {
			callback();
		}
	}
}
