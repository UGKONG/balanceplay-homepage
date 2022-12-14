(function (jQuery) {

	$doc = $(document);

	window.onload = function(){
		setLanguage(LANG);
	}
	$(function() {
		if(typeof LANG == 'undefined') LANG = getLanguage();
	});


	var latestURL = function() {
		var last_url_str = '';
		if(PAGE_MODE == 'c') last_url_str = '/'+CONFIG_URL+'config/page';
		else last_url_str = (PAGE_MODE=='s') ? '' : '/render';

		return last_url_str;	
	}

	var latestRow = function(latest_id, row, num, loop, data_type, settings) {
		var last_url = latestURL();

		var ua = window.navigator.userAgent.toLowerCase(),
			checkIE = (ua.indexOf('MSIE ') > 0 || (window.navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1)) ? true : false;

		var $loop = $(loop).removeClass('active'),
			last_href = (data_type == 'forum') ? last_url + '/forum/view/' + row.id : last_url + '/gallery_page/view/' + row.id,
			empty = (row.title == '' && row.content == '') ? true : false,
			icon_notice = (row.option == 'N') ? '<i class="latest-notice-icon cl-icon notice01" aria-hidden="true"></i> ' : '',
			icon_secret = (row.option == 'S') ? '<i class="latest-secret-icon cl-icon lock02" aria-hidden="true"></i> ' : '',
			icon_new = (row.new) ? '<img src="https://storage.googleapis.com/i.addblock.net/icon/icon_new_forum.png" title="new" alt="new">' : '';

		var latestEL = $('.element[data-id="' + latest_id + '"]'),
			elsetting = (typeof settings != 'undefined' && settings) ? $.parseJSON(settings) : {},
			max_title	= (typeof elsetting.max_title != 'undefined' && elsetting.max_title) ? elsetting.max_title : ((checkIE) ? 70 : 250),
			max_cont	= (typeof elsetting.max_cont != 'undefined' && elsetting.max_cont) ? elsetting.max_cont : ((checkIE) ? 150 : 400);
			/* max unit - byte*/

		if($loop.find('.latest-post-list-title').length > 0) {

			var checkNew = ($loop.find('.latest-post-list-new').length > 0) ? true : false,
				checkTitle_Comment = ($loop.find('.latest-post-list-comment').prev('.latest-post-list-title').length > 0) ? true : false,
				checkTitle_New = (	$loop.find('.latest-post-list-new').prev('.latest-post-list-comment').length > 0 ||
									$loop.find('.latest-post-list-new').prev('.latest-post-list-title').length > 0
								) ? true : false,
				checkTitleinNew = ($loop.find('.latest-post-list-title .latest-post-list-new').length > 0) ? true : false,
				new_str = (checkTitleinNew) ? $loop.find('.latest-post-list-title .latest-post-list-new').outerHTML() : '';

			var title_str = (row.title.length > 0) ? cutStrInBytes(row.title,max_title) : '',
				title_href = (data_type == 'forum' && (empty || title_str == '')) ? '<a href="javascript:;" class="deleted">' + $.lang[LANG]['board.post.deleted'] + '</a>' : '<a href="' + last_href + '">' + title_str + '</a> ';

			$loop.find('.latest-post-list-title').html(icon_notice + icon_secret + title_href).attr({'data-option':row.option,'data-id':row.id});

			if(checkNew) {
				if(checkTitleinNew) $loop.find('.latest-post-list-title').append($(new_str).html(icon_new).outerHTML());
				else $loop.find('.latest-post-list-new').html(icon_new);
				
				var checkLatestComment = (!$loop.find('.latest-post-list-comment').hasClass('hidden') && row.comment) ? true : false,
					checkLatestNew = (!$loop.find('.latest-post-list-new').hasClass('hidden') && ((!empty && title_str) && icon_new)) ? true : false,
					lc_w = (checkTitle_Comment && checkLatestComment) ? parseInt(row.comment.toString().length) * 10 : 0,
					add_pd = 0;

				if(checkTitle_Comment && checkLatestComment) add_pd+= (30 + lc_w);
				if(checkTitle_New && checkLatestNew) add_pd+= 40;

				if(add_pd > 0) {
					$loop.find('.latest-post-list-title').css('padding-right',add_pd+'px');

					var add_ml = add_pd - 5;
					if(checkTitle_Comment && checkLatestComment) {
						$loop.find('.latest-post-list-comment').css('margin-left','-'+add_ml+'px');
						add_ml -= (15 + lc_w);
					}
					if(checkTitle_New && checkLatestNew) {
						$loop.find('.latest-post-list-new').css('margin-left','-'+add_ml+'px');
					}
				}
			}

			// if(row.depth>0 && row.option!='N') {
				// $loop.find('.latest-post-list-title').addClass('reply');
				// $loop.find('.latest-post-list-title').prepend('<span class="latest-post-list-reply-name">' + row.reply_name + '</span>');
			// }
		}


		if($loop.find('.latest-post-list-cont').length > 0) {
				var row_cont = row.cont.replace(/<span class=\"fr-file\"[^>]*>((\n|\r|.)*?)<\/span>/gim,' ');

				var cont_txt = (row.cont.length > 0) ? row_cont.replace(/(<([^>]+)>)/ig,'') : '',
				cont_str = (cont_txt.length > 0) ? cutStrInBytes(cont_txt,max_cont) : '',
				cont_href = (cont_str == '') ? '<a href="javascript:;" class="deleted"></a>' : '<a href="' + last_href + '">' + cont_str + '</a>';

			$loop.find('.latest-post-list-cont').html(cont_href).attr('data-option',row.option).attr('data-id',row.id);
		}


		if($loop.find('.latest-post-list-thumb').length > 0) {
			var lfolder = $('.element[data-id="' + latest_id + '"]').attr('data-width'),
				thumb_empty = (typeof row.thumb != 'undefined' && row.thumb && row.thumb != 0) ? false : true,
				content_noimage_img = (thumb_empty && row.content_noimage_img) ? setResizeImageFolder(lfolder,row.content_noimage_img) : row.content_noimage_img,
				thumb_src = (thumb_empty) ? ((row.content_noimage_img) ? content_noimage_img : 'https://storage.googleapis.com/i.addblock.net/icon/noimage_' + lfolder +'.png') : row.thumb.replace('\/60\/','\/' + lfolder + '\/'),
				thumb_href = (row.cont == '') ? '<a href="javascript:;" class="deleted"></a>' : '<a class="latest_thumb_a" href="' + last_href + '"></a>';

			$loop.find('.latest-post-list-thumb img').attr('src',thumb_src);
			if($loop.find('.latest-post-list-thumb .latest_thumb_a').length==0) $loop.find('.latest-post-list-thumb img').wrap(thumb_href);
			else $loop.find('.latest-post-list-thumb .latest_thumb_a').attr('href',last_href);

			if(thumb_empty) {
				$loop.find('.latest-post-list-thumb').addClass('empty').attr('data-option',row.option).attr('data-id',row.id);
				$loop.find('.latest-post-list-thumb.empty .noimage_text').remove();
				if(!row.content_noimage_img) {
					var text = '<p class="noimage_text">no image</p>';
					if($loop.find('.latest-post-list-thumb .noimage_text').length==0) $loop.find('.latest-post-list-thumb.empty').append(text);
				}	
			} else $loop.find('.latest-post-list-thumb').removeClass('empty').attr('data-option',row.option).attr('data-id',row.id);
		}

		$loop.find('.latest-post-list-date').text(row.date);
		
		if(row.comment > 0) $loop.find('.latest-post-list-comment').text(row.comment);
		else $loop.find('.latest-post-list-comment').text('');

		if(row.hit > 0) $loop.find('.latest-post-list-hit').text(row.hit);
		else $loop.find('.latest-post-list-hit').text('');

		if($loop.find('.latest-post-list-cate').length > 0) {
			if(row.cate) {
				$loop.find('.latest-post-list-cate').removeClass('empty');
				if(data_type == 'gallery') {
					var $cate = $loop.find('.latest-post-list-cate').children().clone(),
						replace_cate = '',
						g_cate = row.cate.replace(/\|/g,'').replace(/\,/g,', '),
						g_cate_arr = g_cate.split(',');

					$.each(g_cate_arr, function(i,v) {
						replace_cate += $cate.text(v).prop('outerHTML');
					});
					$loop.find('.latest-post-list-cate').html(replace_cate);
				} else {
					$loop.find('.latest-post-list-cate li').text(row.cate);
				}
			} else {
				$loop.find('.latest-post-list-cate li').text('').parent().addClass('empty');
			}
		}

		return $loop[0].outerHTML;
	}

	$.latest = {
		init: function(latest_id, latest_data) {

			var L_SID = (typeof SID == 'undefined') ? property.SID : SID,
				// L_ONE = (typeof ONE == 'undefined') ? property.ONE : ONE,
				L_PAGE = (typeof PAGE == 'undefined') ? property.PAGE : PAGE,
				L_PUBLISH = (typeof property == 'undefined') ? false : property.PUBLISH,
				L_VALIDPLAN = (typeof VALIDPLAN == 'undefined') ? property.VALIDPLAN : VALIDPLAN,
				L_VALIDTYPE = (typeof VALIDTYPE == 'undefined') ? property.VALIDTYPE : VALIDTYPE;

			var $latest_el = $('.element[data-id="' + latest_id + '"]'),
				post_view = (typeof $latest_el.find('[data-loop="true"]').attr('data-view') == 'undefined') ? 5 : $latest_el.find('[data-loop="true"]').attr('data-view');

			if(!L_VALIDPLAN) {
				var not_supported_free = '\
						<div class="latest-not-supported-block" onclick="window.open(/upgrade/site/' + L_SID + ')">\
							<div class="info">\
								<div><img src="//storage.googleapis.com/i.addblock.net/icon/latest-not-supported-img.png" alt="" /></div>\
								' + $.lang[LANG]['config.latest.not-supported.block'] + '\
							</div>\
						</div>\
				';

				if(PAGE_MODE == 'c') $latest_el.html(not_supported_free).css('padding',0);
				else $latest_el.html('').addClass('hide');
				return false;
			}

			if($.isEmptyObject(latest_data)) {
				$latest_el.addClass('latest-sample-block');
				$latest_el.find('.latest-table-loop').removeClass('latest-table-empty');
				$latest_el.find('.latest-post-empty').remove();

				if(PAGE_MODE == 'c') {
					$.ajax({
						url: '/template/element/type/get/seq/' + latest_id,
						dataType: 'json',
						type: 'POST',
						data: { sid : L_SID, use : 'latest' },
						async: false,
						cache: false,
						success: function(data) {
							checkError(data);
							var tableSet = $.latest.setTableColumn(latest_id,latest_data,data[0]);
							tableSet.then(function() {
								$.latest.initLatestBlock(latest_id,data[0]['elsettings']);
							});

							// before code :: sample table 1 < connected table 2, field error
							// var blockSet = $.latest.initLatestBlock(latest_id,data[0]['elsettings']);
							// blockSet.then(function() {
							// 	$.latest.setTableColumn(latest_id,latest_data,data[0]);
							// });
						}
					});
				} else {

					var el_idx = $('.element[data-id="' + latest_id + '"]').attr('data-el').replace('el_',''),
						el_target = (typeof property.CONTENTS['el'+latest_id] != 'undefined') ? property.CONTENTS['el'+latest_id]['element'] : property.pageContent[L_PAGE][el_idx];
					
					if(typeof  el_target['elsettings'] != 'undefined') {
						var tableSet = $.latest.setTableColumn(latest_id,latest_data,el_target);
						tableSet.then(function() {
							$.latest.initLatestBlock(latest_id,el_target['elsettings']);
						});
						// before code :: sample table 1 < connected table 2, field error
						// var blockSet = $.latest.initLatestBlock(latest_id,el_target['elsettings']);
						// blockSet.then(function() {
						// 	$.latest.setTableColumn(latest_id,latest_data,el_target);
						// });
					}
				}

			} else {
				$latest_el.removeClass('latest-sample-block');

				$.ajax({
					url: '/template/latest/',
					dataType: 'json',
					type: 'POST',
					data: { sid : L_SID, type : 'get', latest_id : latest_id, view : post_view, latest_data : latest_data, publish : L_PUBLISH },
					async: false,
					cache: false,
					success: function(r_data) {
						var _latest_data = latest_data;

						if($.isEmptyObject(r_data['data'])) {
							_latest_data = new Array();
							var tableSet = $.latest.setTableColumn(latest_id,_latest_data,r_data['empty_data']);
							tableSet.then(function() {
								$.latest.initLatestBlock(latest_id,r_data['empty_data']['elsettings']);
							});

							// before code :: sample table 1 < connected table 2, field error
							// var blockSet = $.latest.initLatestBlock(latest_id,r_data['empty_data']['elsettings']);
							// blockSet.then(function() {
							// 	$.latest.setTableColumn(latest_id,_latest_data,r_data['empty_data']);
							// });
						} else {

							if(typeof r_data['empty_data']['drop_data'] != 'undefined') { //delete table data(drop)
								var temp_data = new Array(),
									drop_idx = 0;

								$.each(_latest_data, function(i,o) {
									if(typeof o != 'undefined') {
										var check_key = o['type']+o['seq'];
										if(typeof r_data['empty_data']['drop_data'][check_key] == 'undefined') {
											temp_data.push(o);
											temp_data[drop_idx]['idx'] = drop_idx;
											drop_idx++;
										}
									}
								});
								_latest_data = temp_data;
							}

							$.each(r_data['data'], function(i,o) {
								if(i == 0) {
									var tableSet = $.latest.setTableColumn(latest_id,_latest_data,o);
									tableSet.then(function() {
										$.latest.initLatestBlock(latest_id,o.elsettings);
									}).then(function() {
										$.latest.update(latest_id,post_view,i,o);
									});

									// before code :: sample table 1 < connected table 2, field error
									// var blockSet = $.latest.initLatestBlock(latest_id,o.elsettings);
									// blockSet.then(function() {
									// 	$.latest.setTableColumn(latest_id,_latest_data,o);
									// }).then(function() {
									// 	$.latest.update(latest_id,post_view,i,o);
									// });
								} else {
									$.latest.update(latest_id,post_view,i,o);
								}
							});

						}
						

					}
				});

			}


		},
		initLatestBlock: function(latest_id, settings) {
		    var df_block = $.Deferred();

			var $latest_el = $('.element[data-id="' + latest_id + '"]'),
				elsetting = (typeof settings != 'undefined' && settings) ? $.parseJSON(settings) : {},
				latest_color = (typeof elsetting.latest_color != 'undefined' && elsetting.latest_color) ? elsetting.latest_color : 'black',
				field_disable = (typeof elsetting.field_disable != 'undefined' && !$.isEmptyObject(elsetting.field_disable)) ? elsetting.field_disable : [],
				field_listSet = ['title', 'cont', 'cate', 'date', 'comment', 'new', 'hit'];

			if($latest_el.find('.latest-table[style="outline: rgb(71, 137, 231) dashed 1px;"]').length) {
				$latest_el.find('.latest-table[style="outline: rgb(71, 137, 231) dashed 1px;"]').removeAttr('style');
			}
			
			// SET - Color mode
			$latest_el.attr('data-latest-color',latest_color);

			// SET - Field disable
			$.each(field_listSet, function(i,v) {
				if($.inArray(v,field_disable) > -1) {
					$latest_el.find('.latest-post-list-'+v).each(function() { $(this).removeAttr('style').addClass('hidden'); });
				} else {
					$latest_el.find('.latest-post-list-'+v).each(function() { $(this).removeAttr('style').removeClass('hidden'); });
				}
			});

			if(typeof elsetting.latest_data != 'object' && $.isEmptyObject(elsetting.latest_data)) {
				if($latest_el.find('.latest-post-list-new').length > 0) $.latest.setFieldPosition($latest_el);
			}

			df_block.resolve();
			return df_block.promise();
		},
		setTableColumn: function(latest_id, latest_data, el_data) {

		    var df_column = $.Deferred();

		    /*
				*[data-loop="true"][data-view="1~15"][data-draw-type="col|line"][data-draw-col="col-lg,col-md,col-sm,col-xs"]
			- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
				[data-view="1~15"] : number of post : Table of .latest-post lenght
				[data-draw-type="col|line"] : col  - Align Table Horizontally
												 line - Align Table Vertical
				[data-draw-col="col-lg,col-md,col-sm,col-xs"] : draw type=col  - .latest-table class
												 				   draw type=line - .latest-post  class
			*/
			var colval = ['',12,6,4,3,15,2],
				default_col_set = [[1,1,1,1],[2,2,2,1],[3,3,2,1],[4,4,2,2],[5,5,2,1]];

			var $latest_el = $('.element[data-id="' + latest_id + '"]'),
				sample_el_tag = (typeof el_data['eltag'] != 'undefined') ? htmlspecialchars_decode(el_data['eltag'],'ENT_QUOTES') : el_data.source,
				$sample_el = $(sample_el_tag).hasClass($latest_el.attr('data-name')) ? $(sample_el_tag) : $latest_el,
				post_view = $latest_el.find('[data-loop="true"]').attr('data-view');

			/* SET - Table block name reset */
			$latest_el.find('.latest-table-header').each(function(i) { 
				$(this).find('.lt-header').text('Title');
			});


			/*
				SET - Table number
			- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
				Table Delete or Add
			*/
			var sample_table = $sample_el.find('[data-loop="true"] .latest-table').eq(0).clone();
			sample_table.find('.latest-table-loop').removeClass('latest-table-empty').find('.latest-post-empty').remove();

			setPanelTranslate(sample_table);

			if($.isEmptyObject(latest_data) || 
				(!$.isEmptyObject(latest_data) && (latest_data.length < $latest_el.find('[data-loop="true"] .latest-table').length) ) ) {
				var table_set_idx = ($.isEmptyObject(latest_data)) ? 0 : latest_data.length-1;

				$latest_el.find('[data-loop="true"]').children('.latest-table:gt('+ (table_set_idx) +')').each(function(i) {
					$(this).remove();
				});

				if($.isEmptyObject(latest_data)) {
					$latest_el.addClass('latest-sample-block');
					$latest_el.find('[data-loop="true"]').html($sample_el.find('[data-loop="true"]').html());
					$.latest.initLatestBlock(latest_id,el_data['elsettings']);
				}

			} else if ($latest_el.find('[data-loop="true"] .latest-table').length < latest_data.length) {

				$.each(latest_data, function(i,o) {
					if($latest_el.find('[data-loop="true"] .latest-table').eq(i).length == 0) {
						$latest_el.find('[data-loop="true"]').append('\n	\t'+sample_table.prop('outerHTML')+'\n');
					}
				});
			}

			/*
				SET - Column class
			- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
				[draw-type='col']  .latest-table
				[draw-type='line'] .latest-post
			*/
			var draw_type = $latest_el.find('[data-loop="true"]').attr('data-draw-type'),
				draw_col = $latest_el.find('[data-loop="true"]').attr('data-draw-col'),
				draw_col_target = (draw_type == 'col') ? 'latest-table' : 'latest-post',
				col = (typeof draw_col != 'undefined' && draw_col) ? draw_col.split(',') : new Array(),
				col_change = (draw_type == 'col') ? true : false;

			if(col.length == 0) {
				switch(draw_type) {
					case 'col':
						col = ($.isEmptyObject(latest_data)) ? default_col_set[0] : default_col_set[latest_data.length - 1];
						break;

					case 'line':
						var post_size = [0,0,1,2,3,4,3,3,4,3,4,3,3,4,3,4];
						col = default_col_set[post_size[post_view]];

						$latest_el.find('[data-loop="true"] .latest-table .latest-table-loop').each(function() {
							if($(this).find('.latest-post').length > post_view) {
								col_change = true;
								$(this).find('.latest-post:gt('+ (post_view-1) +')').each(function(i) {
									$(this).remove();
								});
							} else if($(this).find('.latest-post').length < post_view) {
								col_change = true;
								var latest_table_post =  $(this).find('.latest-post').eq(0).clone();
								for(var n_i = $(this).find('.latest-post').length; n_i < post_view; n_i++) {
									$(this).append('\n	\t'+latest_table_post.prop('outerHTML') +' \n');
								}
							}
						});
						break;

					default:
						return false;
						break;
				}
			} else {
				if(draw_type == 'col' && $latest_el.find('[data-loop="true"] .latest-table').length != latest_data.length) col_change = true;
			}
			
			if(!$.isEmptyObject(latest_data)) {
				var col_class = 'col-xs-' + colval[col[3]] + ' col-sm-' + colval[col[2]] + ' col-md-' + colval[col[1]] + ' col-lg-' + colval[col[0]],
					$col_target = $latest_el.find('[data-loop="true"] .'+draw_col_target);

				$col_target.each(function(i) {
					var org_class = $(this).attr('class').split(' '),
						new_class = '';

					$.each(org_class, function(i,v) {
						if(v.indexOf('col-') == -1) new_class += v + ' ';
					});
					new_class = new_class + col_class;
					$(this).removeClass().addClass(new_class);
				});
			}


			// SET - Table header
			// var table_headers = $latest_el.find('.latest-table-header').map(function(i) { return $(this).prop('outerHTML'); }).get();
			// $.each(table_headers, function(i,v) {
			// 	$latest_el.find('.latest-table-header').eq(i).replaceWith(v);
			// });


			df_column.resolve();
			return df_column.promise();
		},
		setFieldPosition: function(latest_el) {
			if($(latest_el).length == 0) return;

			var $latest_el = $(latest_el),
				checkNew = ($latest_el.find('[data-loop="true"] .latest-post-list-new').length > 0) ? true : false;
			if(!checkNew) return;
			
			var checkTitle_Comment = ($latest_el.find('[data-loop="true"] .latest-post-list-comment').prev('.latest-post-list-title').length > 0) ? true : false,
				checkTitle_New = (	$latest_el.find('[data-loop="true"] .latest-post-list-new').prev('.latest-post-list-comment').length > 0 ||
									$latest_el.find('[data-loop="true"] .latest-post-list-new').prev('.latest-post-list-title').length > 0
								) ? true : false;
			if(!checkTitle_Comment && !checkTitle_New) return;

			$latest_el.find('[data-loop="true"] .latest-post').each(function() {
				var checkLatestComment = (	!$(this).find('.latest-post-list-comment').hasClass('hidden') &&
											$(this).find('.latest-post-list-comment').text().length > 0
										) ? true : false,
					checkLatestNew = (	!$(this).find('.latest-post-list-new').hasClass('hidden') &&
										$(this).find('.latest-post-list-new img').length > 0
									) ? true : false,
					lc_w = (checkTitle_Comment && checkLatestComment) ? parseInt($(this).find('.latest-post-list-comment').text().length) * 10 : 0,
					add_pd = 0;

				if(checkTitle_Comment && checkLatestComment) add_pd+= (30 + lc_w);
				if(checkTitle_New && checkLatestNew) add_pd+= 40;

				if(add_pd > 0) {
					$(this).find('.latest-post-list-title').css('padding-right',add_pd+'px');

					var add_ml = add_pd - 5;
					if(checkTitle_Comment && checkLatestComment) {
						$(this).find('.latest-post-list-comment').css('margin-left','-'+add_ml+'px');
						add_ml -= (15 + lc_w);
					}
					if(checkTitle_New && checkLatestNew) {
						$(this).find('.latest-post-list-new').css('margin-left','-'+add_ml+'px');
					}
				}
			});

		},
		update: function(latest_id,post_view,data_idx,data) {
			// elsetting = (typeof settings != 'undefined' && settings) ? $.parseJSON(settings) : {},
			var $latest_el = $('.element[data-id="' + latest_id + '"]')
				$latest_table =  $latest_el.find('[data-loop="true"] .latest-table').eq(data_idx),
				latest_table_header = $latest_table.find('.latest-table-header').clone().prop('outerHTML'),
				latest_table_loop = $latest_table.find('.latest-table-loop').clone().html('').removeClass('latest-table-empty').prop('outerHTML'),
				loop = $latest_table.find('.latest-post').eq(0).clone().prop('outerHTML');

			if(data.total == 0) {
				var msg = (data.msg) ? data.msg : $.lang[LANG]['board.no-posts'],
					post_empty_class = $latest_table.find('.latest-table-header').attr('class').replace('latest-table-header',''),
					$latest_post_empty = $latest_table.find('.latest-post-empty'),
					check_display_none = new Array('page-off','undefined');

				$latest_table.find('.latest-table-header .lt-header').html('<a href="/'+ data.fpage +'" data-user-link="/' + data.fpage + '" data-lt-header="true">' + data.blockname + '</a>');
				if($.inArray(data.msg,check_display_none) == -1) {
					$latest_table.attr({'data-idx': data_idx, 'data-pid': data.seq, 'data-type': data.type});
				}
				
				if($latest_post_empty.length > 0) {
					$latest_post_empty.text(msg);
				} else {
					$latest_table.find('.latest-table-loop').addClass('latest-table-empty').prepend('<div class="latest-post-empty ' + post_empty_class + '">' + msg + '</div>');
				}

			} else {
				$latest_table.html('');
				$latest_table.attr({'data-idx': data_idx, 'data-pid': data.seq, 'data-type': data.type});
			
				$.each(data.list, function(i,v) {
					var num = data.total - (post_view - i);

					if(i == 0) {
						$latest_table.append('\n' + latest_table_header + '\n	\t' + latest_table_loop + '\n');
						$latest_table.find('.latest-table-header .lt-header').html('<a href="/'+ data.fpage +'" data-user-link="/' + data.fpage + '" data-lt-header="true">' + data.blockname + '</a>');
					}
					$latest_table.find('.latest-table-loop').append('\n	\t' + latestRow(latest_id, v, num, loop, data.type, data.elsettings) + '\n');
				});
			}


		},
	}

})(jQuery);