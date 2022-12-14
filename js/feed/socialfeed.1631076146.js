if (typeof Object.create !== 'function') {
    Object.create = function(obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function($, window, document, undefined) {
    $.fn.socialfeed = function(_options) {


        var defaults = {
            plugin_folder: '', // a folder in which the plugin is located (with a slash in the end)
            //template: 'template.html', // a path to the template file
            show_media: false, // show images of attachments if available
            media_min_width: 300,
            length: 500, // maximum length of post message shown
            date_format: 'll',
            element:''
        };
        //---------------------------------------------------------------------------------
        var options = $.extend(defaults, _options),
            container = $(this),
            //template,
            social_networks = ['facebook', 'instagram', 'vk', 'google', 'blogspot', 'twitter', 'pinterest', 'rss'],
            posts_to_load_count = 0,
            loaded_post_count = 0;
        // container.empty().css('display', 'block');
        //---------------------------------------------------------------------------------

        //---------------------------------------------------------------------------------
        // This function performs consequent data loading from all of the sources by calling corresponding functions
        function calculatePostsToLoadCount() {
            social_networks.forEach(function(network) {
                if (options[network]) {
                    if (options[network].accounts) {
                        if(options[network].accounts[0] && options[network].accounts[0] != 'undefined') {
                            posts_to_load_count += options[network].limit;
                        }
                        // posts_to_load_count += options[network].limit * options[network].accounts.length;
                    } else if (options[network].urls ){
                        posts_to_load_count += options[network].limit * options[network].urls.length;
                    } else {
                        posts_to_load_count += options[network].limit;
                    }
                }
            });
        }

        calculatePostsToLoadCount();

        function fireCallback() {
            var fire = true;
            /*$.each(Object.keys(loaded), function() {
                if (loaded[this] > 0)
                    fire = false;
            });*/
            if (fire && options.callback) {
                options.callback();
            }
        }

        var Utility = {
            request: function(url, callback) {
                $.ajax({
                    url: url,
                    dataType: 'jsonp',
                    success: callback
                });
            },
            get_request: function(url, callback) {
                $.get(url, callback, 'json');
            },
            wrapLinks: function(string, social_network) {
                var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                if (social_network === 'google-plus') {
                    string = string.replace(/(@|#)([a-z0-9_]+['])/ig, Utility.wrapGoogleplusTagTemplate);
                } else {
                    string = string.replace(exp, Utility.wrapLinkTemplate);
                }
                return string;
            },
            wrapLinkTemplate: function(string) {
                return '<a target="_blank" href="' + string + '">' + string + '<\/a>';
            },
            wrapGoogleplusTagTemplate: function(string) {
                return '<a target="_blank" href="https://plus.google.com/s/' + string + '" >' + string + '<\/a>';
            },
            shorten: function(string) {
                string = $.trim(string);
                if (string.length > options.length) {
                    return jQuery.trim(string).substring(0, options.length).split(" ").slice(0, -1).join(" ") + "...";
                } else {
                    return string;
                }
            },
            stripHTML: function(string) {
                if (typeof string === "undefined" || string === null) {
                    return '';
                }
                return string.replace(/(<([^>]+)>)|nbsp;|\s{2,}|/ig, "");
            },
            drawOrgContent: function() {
                var $container = $('.' + options.element + ' [data-loop="true"]');
                $container.removeAttr('style').addClass('listprogress-end');
                $container.html(options.org_content).hide().fadeIn(200);
            },
            drawEmptyContent: function(msg) {
                var $container = $('.' + options.element + ' [data-loop="true"]');
                if(msg) {
                    $container.addClass('empty-feed');
                    $container.html('<div class="recomm-socialfeed-text">' + msg + '</div>').hide().fadeIn(200);
                }
            },
            checkEmptyData: function(social_network,error) {
                options.check_get_data[social_network] = true;

                var check = true;
                $.each(options.check_get_data,function(k,v) {
                    if(!v) check = false;
                });

                if(error) {
                    Utility.drawOrgContent(); 

                    if(typeof MODE != 'undefined' &&  (MODE == 'config' || MODE == 'demo')) {
                        $(this).showModalFlat('INFORMATION', $.lang[LANG]['config.sns.feed-permission-error'], true, false, '', 'ok');
                        var el_seq = ($('.' + options.element).attr('data-id')) ? $('.' + options.element).attr('data-id') : '';
                        if(el_seq) {
                            var settings = (social_network == 'instagram') ? { instagram : '' }  : { twitter : '' };
                            $.post('/template/settings',{ sid : SID, settings : JSON.stringify(settings), el : el_seq, key: 'sns'}, function(data) {
                                checkError(data);
                            },'json');
                        }
                    }
                    return '';
                }
                if(check && loaded_post_count == 0 && options[social_network].accounts) {
                    Utility.drawEmptyContent($.lang[LANG]["board.no-posts"]);
                }

            }
        };

        function SocialFeedPost(social_network, data) {
            this.content = data;
            this.content.social_network = social_network;
            this.content.attachment = (this.content.attachment === undefined) ? '' : this.content.attachment;
            this.content.time_ago = data.dt_create.fromNow();
            this.content.date = data.dt_create.format(options.date_format);
            this.content.dt_create = this.content.dt_create.valueOf();
            this.content.text = Utility.wrapLinks(Utility.shorten(data.message + ' ' + data.description), data.social_network);
            this.content.moderation_passed = (options.moderation) ? options.moderation(this.content) : true;

            Feed[social_network].posts.push(this);
        }
        SocialFeedPost.prototype = {
            render: function() {
                var rendered_html = this.content;
                var data = this.content;
                var $container = $('.' + options.element + ' [data-loop="true"]'),
                    $node = $(options.template);

                $node
                    .attr('social-feed-id',data.id)
                    .attr('dt-create',data.dt_create)
                    .addClass('social-feed-element')

                if(!data.moderation_passed)
                    $node.addClass('hide');

                if(data.social_network == 'twitter') {
                    var http_reg = /^http:\/\//,
                        f_link = (http_reg.test(data.link)) ? data.link.replace(http_reg,'https://') : data.link,
                        f_author_link = (http_reg.test(data.author_link)) ? data.author_link.replace(http_reg,'https://') : data.author_link,
                        f_author_picture = (http_reg.test(data.author_picture)) ? data.author_picture.replace(http_reg,'https://') : data.author_picture;
                    
                    $node.find('[data-feed-link]').attr('href', f_link);
                    $node.find('[data-feed-author-link]').attr('href', f_author_link);
                    $node.find('[data-feed-author-picture]').attr('src', f_author_picture);
                } else if(data.social_network == 'instagram') {
                    $node.find('[data-feed-link]').attr('href', data.link);
                    $node.find('[data-feed-author-link]').attr('href', data.author_link);
                    $node.find('[data-feed-author-picture]').addClass('disabled');
                } else {
                    $node.find('[data-feed-link]').attr('href', data.link);
                    $node.find('[data-feed-author-link]').attr('href', data.author_link);
                    $node.find('[data-feed-author-picture]').attr('src', data.author_picture);
                }
                $node.find('[data-feed-author-name]').text(data.author_name);
                $node.find('[data-feed-time-ago]').text(data.time_ago);
                $node.find('[data-feed-text]').html(data.text);
                $node.find('[data-feed-icon]').html("<i class='fa fa-" + data.social_network + "'></i>");

                $img = (data.attachment) ? $(data.attachment) : "";
                var attrSrc = ($img) ? $img.attr('src') : "";   

                attrSrc = (attrSrc.indexOf('http://') != -1) ? attrSrc.replace('http://','//') : attrSrc;

                $node.find('[data-feed-attachment]').removeClass('hide');
                $node.find('.post-content').removeClass('text-only');
                if(attrSrc) {
                    $node.find('[data-feed-attachment]').attr('src',attrSrc);
                    var img = new Image();
                    img.src = attrSrc;
                    img.onload = function() {
                        if(this.width>this.height) {
                            $('img[src="' + $(this).attr('src') + '"]').css({
                                'min-width' : 'initial',
                                'max-width' : 'none',
                                'min-height' : '100%',
                                'max-height' : '100%'
                            });
                        } else if(this.width<this.height) {
                            $('img[src="' + $(this).attr('src') + '"]').css({
                                'min-width' : '100%',
                                'max-width' : '100%',
                                'min-height' : 'initial',
                                'max-height' : 'none'
                            });
                        } else {
                            $('img[src="' + $(this).attr('src') + '"]').css({
                                'max-height' : '100%',
                                'max-width' : '100%'
                            });
                        }
                    }
                } else {
                    $node.find('[data-feed-attachment]').addClass('hide');
                    $node.find('.post-content').addClass('text-only');
                }
                rendered_html = $node.outerHTML();
                $('.' + options.element + ' .listprogress').remove().fadeOut(200);
                if ($container.children('[social-feed-id=' + data.id + ']').length !== 0) {
                    return false;
                }

                if ($container.children().length === 0) {
                    $container.append(rendered_html).fadeIn(200);
                } else {
                    var i = 0,
                        insert_index = -1;
                    $.each($container.children(), function() {
                        if ($(this).attr('dt-create') < data.dt_create) {
                            insert_index = i;
                            return false;
                        }
                        i++;
                    });

                    $container.append(rendered_html).fadeIn(200);
                    if (insert_index >= 0) {
                        insert_index++;
                        var before = $container.children('div:nth-child(' + insert_index + ')'),
                            current = $container.children('div:last-child');
                        $(current).insertBefore(before);
                    }

                }


                if (options.media_min_width) {
                    var query = '[social-feed-id=' + data.id + '] img.attachment';
                    var image = $(query);

                    // preload the image
                    var height, width = '';
                    var img = new Image();
                    var imgSrc = image.attr("src");

                    $(img).load(function() {
                        if (img.width < options.media_min_width) {
                            image.hide();
                        }
                        // garbage collect img
                        delete img;

                    }).error(function() {
                        // image couldnt be loaded
                        image.hide();

                    }).attr({
                        src: imgSrc
                    });

                }
                loaded_post_count++;
                if (loaded_post_count == posts_to_load_count) {
                    fireCallback();
                }

            }

        };

        var Feed = {
            template: false,
            init: function() {
                $('.'+options.element).find('.recomm-socialfeed-text').remove();
                $('.'+options.element).find('.social-feed-container[data-loop="true"]').removeClass('empty-feed').removeClass('listprogress-end');

                if(!options.check_empty) {
                    Feed.getTemplate(function() {
                        social_networks.forEach(function(network) {

                            if (options[network] && typeof options.check_get_data[network] != 'undefined') {
                                if ( options[network].accounts && options[network].accounts[0] != '') {
                                    //loaded[network] = 0;
                                    options[network].accounts.forEach(function(account) {

                                        //loaded[network]++;
                                        if (account.length > 0 ) {
                                            Feed[network].getData(account);
                                        } else {
                                            Utility.checkEmptyData(network);
                                        }

                                    });
                                } else if ( options[network].urls ) {
                                    options[network].urls.forEach(function(url) {
                                        Feed[network].getData(url);
                                    });
                                }
                            }
                        });
                    });
                } else {
                    Utility.drawOrgContent();
                    fireCallback();
                }

            },
            getTemplate: function(callback) {
                if (Feed.template)
                    return callback();
                else {
                    Feed.template = '';
                    return callback();
                }
            },
            twitter: {
                posts: [],
                loaded: false,
                api: '/socialfeed/twitter',

                getData: function(account) {
                    // var cb = new Codebird();
                    // cb.setConsumerKey(options.twitter.consumer_key, options.twitter.consumer_secret);

                    // // Allow setting your own proxy with Codebird
                    // if (options.twitter.proxy !== undefined) {
                    //     cb.setProxy(options.twitter.proxy);
                    // }

                    switch (account[0]) {
                        case '@':
                            var userid = account.substr(1);
                            Utility.get_request(Feed.twitter.api + '/timeline/' + userid + '/' + options.twitter.limit, Feed.twitter.utility.getPosts);
                            // cb.__call(
                            //     "statuses_userTimeline",
                            //     "id=" + userid + "&count=" + options.twitter.limit,
                            //     Feed.twitter.utility.getPosts,
                            //     true // this parameter required
                            // );
                            break;
                        case '#':
                            var hashtag = account.substr(1);
                            Utility.get_request(Feed.twitter.api + '/search/' + hashtag + '/' + options.twitter.limit, Feed.twitter.utility.getPosts);
                            // cb.__call(
                            //     "search_tweets",
                            //     "q=" + hashtag + "&count=" + options.twitter.limit,
                            //     function(reply) {
                            //         Feed.twitter.utility.getPosts(reply.statuses);
                            //     },
                            //     true // this parameter required
                            // );
                            break;
                        default:
                    }
                },
                utility: {
                    getPosts: function(json) {
                        // console.log(json);
                        if (json.length > 0) {
                            options.total += json.length;
                            $.each(json, function() {
                                var element = this;
                                var post = new SocialFeedPost('twitter', Feed.twitter.utility.unifyPostData(element));
                                post.render();
                            });
                        } else {
                            Utility.checkEmptyData('twitter'); //empty data,
                        }
                    },
                    unifyPostData: function(element) {
                        var post = {};
                        if (element.id) {
                            post.id = element.id;
                            //prevent a moment.js console warning due to Twitter's poor date format.
                            post.dt_create = moment(new Date(element.created_at));
                            post.author_link = 'http://twitter.com/' + element.user.screen_name;
                            post.author_picture = element.user.profile_image_url;
                            post.post_url = post.author_link + '/status/' + element.id_str;
                            post.author_name = element.user.name;
                            post.message = element.text;
                            post.description = '';
                            post.link = 'http://twitter.com/' + element.user.screen_name + '/status/' + element.id_str;

                            if (options.show_media === true) {
                                if (element.entities.media && element.entities.media.length > 0) {
                                    var image_url = element.entities.media[0].media_url;
                                    if (image_url) {
                                        post.attachment = '<img class="attachment" src="' + image_url + '" />';
                                    }
                                }
                            }
                        }
                        return post;
                    }
                }
            },
            facebook: {
                posts: [],
                graph: 'https://graph.facebook.com/',
                loaded: false,
                getData: function(account) {

                    var proceed = function(request_url){
                        Utility.request(request_url, Feed.facebook.utility.getPosts);
                    };
                    var fields = '?fields=id,from,name,message,created_time,story,description,link';
                       fields += (options.show_media === true)?',picture,object_id':'';
                    var request_url, limit = '&limit=' + options.facebook.limit,
                        query_extention = '&access_token=' + options.facebook.access_token + '&callback=?';
                    switch (account[0]) {
                        case '@':
                            var username = account.substr(1);
                            Feed.facebook.utility.getUserId(username, function(userdata) {
                                if (userdata.id !== '') {
                                    request_url = Feed.facebook.graph + 'v2.4/' + userdata.id + '/posts'+ fields + limit + query_extention;
                                    proceed(request_url);
                                }
                            });
                            break;
                        case '!':
                            var page = account.substr(1);
                            request_url = Feed.facebook.graph + 'v2.4/' + page + '/feed'+ fields + limit + query_extention;
                            proceed(request_url);
                            break;
                        default:
                            proceed(request_url);
                    }
                },
                utility: {
                    getUserId: function(username, callback) {
                        var query_extention = '&access_token=' + options.facebook.access_token + '&callback=?';
                        var url = 'https://graph.facebook.com/' + username + '?' + query_extention;
                        
                        var result = '';
                        $.get(url, callback, 'json');
                    },
                    prepareAttachment: function(element) {
                        var image_url = element.picture;
                        if (image_url.indexOf('_b.') !== -1) {
                            //do nothing it is already big
                        } else if (image_url.indexOf('safe_image.php') !== -1) {
                            image_url = Feed.facebook.utility.getExternalImageURL(image_url, 'url');

                        } else if (image_url.indexOf('app_full_proxy.php') !== -1) {
                            image_url = Feed.facebook.utility.getExternalImageURL(image_url, 'src');

                        } else if (element.object_id) { 
                            image_url = Feed.facebook.graph + element.id + '/picture/?type=normal';
                        }
                        return '<img class="attachment" src="' + image_url + '" />';
                    },
                    getExternalImageURL: function(image_url, parameter) {
                        image_url = decodeURIComponent(image_url).split(parameter + '=')[1];
                        if (image_url.indexOf('fbcdn-sphotos') === -1) {
                            return image_url.split('&')[0];
                        } else {
                            return image_url;
                        }

                    },
                    getPosts: function(json) {
                        if (json['data']) {
                            json['data'].forEach(function(element) {
                                var post = new SocialFeedPost('facebook', Feed.facebook.utility.unifyPostData(element));
                                post.render();
                            });
                        }
                    },
                    unifyPostData: function(element) {
                        var post = {},
                            text = (element.message) ? element.message : element.story;

                        post.id = element.id;
                        post.dt_create = moment(element.created_time);
                        post.author_link = 'http://facebook.com/' + element.from.id;
                        post.author_picture = Feed.facebook.graph + element.from.id + '/picture';
                        post.author_name = element.from.name;
                        post.name = element.name || "";
                        post.message = (text) ? text : '';
                        post.description = (element.description) ? element.description : '';
                        post.link = (element.link) ? element.link : 'http://facebook.com/' + element.from.id;

                        if (options.show_media === true) {
                            if (element.picture) {
                                var attachment = Feed.facebook.utility.prepareAttachment(element);
                                if (attachment) {
                                    post.attachment = attachment;
                                }
                            }
                        }
                        return post;
                    }
                }
            },
            google: {
                posts: [],
                loaded: false,
                api: 'https://www.googleapis.com/plus/v1/',
                getData: function(account) {
                    var request_url;
                    switch (account[0]) {
                        case '#':
                            var hashtag = account.substr(1);
                            request_url = Feed.google.api + 'activities?query=' + hashtag + '&key=' + options.google.access_token + '&maxResults=' + options.google.limit;
                            Utility.get_request(request_url, Feed.google.utility.getPosts);
                            break;
                        case '@':
                            var username = account.substr(1);
                            request_url = Feed.google.api + 'people/' + username + '/activities/public?key=' + options.google.access_token + '&maxResults=' + options.google.limit;
                            Utility.get_request(request_url, Feed.google.utility.getPosts);
                            break;
                        default:
                    }
                },
                utility: {
                    getPosts: function(json) {
                        if (json.items) {
                            $.each(json.items, function(i) {
                                var post = new SocialFeedPost('google', Feed.google.utility.unifyPostData(json.items[i]));
                                post.render();
                            });
                        }
                    },
                    unifyPostData: function(element) {
                        var post = {};

                        post.id = element.id;
                        post.attachment = '';
                        post.description = '';
                        post.dt_create = moment(element.published);
                        post.author_link = element.actor.url;
                        post.author_picture = element.actor.image.url;
                        post.author_name = element.actor.displayName;

                        if (options.show_media === true) {
                            if (element.object.attachments) {
                                $.each(element.object.attachments, function() {
                                    var image = '';
                                    if (this.fullImage) {
                                        image = this.fullImage.url;
                                    } else {
                                        if (this.objectType === 'album') {
                                            if (this.thumbnails && this.thumbnails.length > 0) {
                                                if (this.thumbnails[0].image) {
                                                    image = this.thumbnails[0].image.url;
                                                }
                                            }
                                        }
                                    }
                                    post.attachment = '<img class="attachment" src="' + image + '"/>';
                                });
                            }
                        }
                        post.message = element.title;
                        post.link = element.url;

                        return post;
                    }
                }
            },
            instagram: {
                posts: [],
                api: 'https://graph.instagram.com/',
                loaded: false,
                getData: function(account) {
                    var url;
                    if(typeof account != 'undefined' && account && typeof options.instagram.access_token != 'undefined') {                        
                        var instagram_fields = 'id,media_type,media_url,permalink,thumbnail_url,caption,timestamp,username',
                            instagram_limit = (typeof options.instagram.limit != 'undefined') ? options.instagram.limit : 5;
                        url = Feed.instagram.api + account + '/media?fields=' + instagram_fields + '&limit=' + instagram_limit + '&access_token=' + options.instagram.access_token;
                        Utility.request(url, Feed.instagram.utility.getImages);
                    }
                },
                utility: {
                    getImages: function(json) {
                        if (typeof json.data != 'undefined' && json.data.length > 0) {
                            options.total += json.data.length; 
                            json.data.forEach(function(element) {
                                var post = new SocialFeedPost('instagram', Feed.instagram.utility.unifyPostData(element));
                                post.render();
                            });
                        } else {
                            var error = '';
                            if(typeof json.error != 'undefined' && json.error) {
                                error = 'error message: ' + json.error.message + ', ' + json.error.type + ', ' + json.error.code;
                            }
                            Utility.checkEmptyData('instagram',error); //empty data,
                        }
                    },
                    unifyPostData: function(element) {
                        var post = {};

                        post.id = element.id;
                        post.dt_create = moment(new Date(element.timestamp));
                        post.author_link = '//instagram.com/' + element.username;
                        post.author_name = element.username;
                        post.message = (typeof element.caption != 'undefined' && element.caption) ? element.caption : '';
                        post.description = '';
                        post.link = element.permalink;
                        if (options.show_media) {
                            var img_url = (element.media_type == 'VIDEO') ? element.thumbnail_url : element.media_url;
                            post.attachment = '<img class="attachment" src="' + img_url + '' + '" />';
                        }
                        return post;
                    }
                }
            },
            vk: {
                posts: [],
                loaded: false,
                base: 'http://vk.com/',
                api: 'https://api.vk.com/method/',
                user_json_template: 'https://api.vk.com/method/' + 'users.get?fields=first_name,%20last_name,%20screen_name,%20photo&uid=',
                group_json_template: 'https://api.vk.com/method/' + 'groups.getById?fields=first_name,%20last_name,%20screen_name,%20photo&gid=',
                getData: function(account) {
                    var request_url;

                    switch (account[0]) {
                        case '@':
                            var username = account.substr(1);
                            request_url = Feed.vk.api + 'wall.get?owner_id=' + username + '&filter=' + options.vk.source + '&count=' + options.vk.limit + '&callback=?';
                            Utility.get_request(request_url, Feed.vk.utility.getPosts);
                            break;
                        case '#':
                            var hashtag = account.substr(1);
                            request_url = Feed.vk.api + 'newsfeed.search?q=' + hashtag + '&count=' + options.vk.limit + '&callback=?';
                            Utility.get_request(request_url, Feed.vk.utility.getPosts);
                            break;
                        default:
                    }
                },
                utility: {
                    getPosts: function(json) {
                        if (json.response) {
                            $.each(json.response, function() {
                                if (this != parseInt(this) && this.post_type === 'post') {
                                    var owner_id = (this.owner_id) ? this.owner_id : this.from_id,
                                        vk_wall_owner_url = (owner_id > 0) ? (Feed.vk.user_json_template + owner_id + '&callback=?') : (Feed.vk.group_json_template + (-1) * owner_id + '&callback=?'),
                                        element = this;
                                    Utility.get_request(vk_wall_owner_url, function(wall_owner) {
                                        Feed.vk.utility.unifyPostData(wall_owner, element, json);
                                    });
                                }
                            });
                        }
                    },
                    unifyPostData: function(wall_owner, element, json) {
                        var post = {};

                        post.id = element.id;
                        post.dt_create = moment.unix(element.date);
                        post.description = ' ';
                        post.message = Utility.stripHTML(element.text);
                        if (options.show_media) {
                            if (element.attachment) {
                                if (element.attachment.type === 'link')
                                    post.attachment = '<img class="attachment" src="' + element.attachment.link.image_src + '" />';
                                if (element.attachment.type === 'video')
                                    post.attachment = '<img class="attachment" src="' + element.attachment.video.image_big + '" />';
                                if (element.attachment.type === 'photo')
                                    post.attachment = '<img class="attachment" src="' + element.attachment.photo.src_big + '" />';
                            }
                        }

                        if (element.from_id > 0) {
                            var vk_user_json = Feed.vk.user_json_template + element.from_id + '&callback=?';
                            Utility.get_request(vk_user_json, function(user_json) {
                                var vk_post = new SocialFeedPost('vk', Feed.vk.utility.getUser(user_json, post, element, json));
                                vk_post.render();
                            });

                        } else {
                            var vk_group_json = Feed.vk.group_json_template + (-1) * element.from_id + '&callback=?';
                            Utility.get_request(vk_group_json, function(user_json) {
                                var vk_post = new SocialFeedPost('vk', Feed.vk.utility.getGroup(user_json, post, element, json));
                                vk_post.render();
                            });
                        }
                    },
                    getUser: function(user_json, post, element, json) {
                        post.author_name = user_json.response[0].first_name + ' ' + user_json.response[0].last_name;
                        post.author_picture = user_json.response[0].photo;
                        post.author_link = Feed.vk.base + user_json.response[0].screen_name;
                        post.link = Feed.vk.base + user_json.response[0].screen_name + '?w=wall' + element.from_id + '_' + element.id;

                        return post;
                    },
                    getGroup: function(user_json, post, element, json) {
                        post.author_name = user_json.response[0].name;
                        post.author_picture = user_json.response[0].photo;
                        post.author_link = Feed.vk.base + user_json.response[0].screen_name;
                        post.link = Feed.vk.base + user_json.response[0].screen_name + '?w=wall-' + user_json.response[0].gid + '_' + element.id;

                        return post;
                    }
                }
            },
            blogspot: {
                loaded: false,
                getData: function(account) {
                    var url;

                    switch (account[0]) {
                        case '@':
                            var username = account.substr(1);
                            url = 'http://' + username + '.blogspot.com/feeds/posts/default?alt=json-in-script&callback=?';
                            request(url, getPosts);
                            break;
                        default:
                    }
                },
                utility: {
                    getPosts: function(json) {
                        $.each(json.feed.entry, function() {
                            var post = {},
                                element = this;
                            post.id = element.id['$t'].replace(/[^a-z0-9]/gi, '');
                            post.dt_create = moment((element.published['$t']));
                            post.author_link = element.author[0]['uri']['$t'];
                            post.author_picture = 'http:' + element.author[0]['gd$image']['src'];
                            post.author_name = element.author[0]['name']['$t'];
                            post.message = element.title['$t'] + '</br></br>' + stripHTML(element.content['$t']);
                            post.description = '';
                            post.link = element.link.pop().href;

                            if (options.show_media) {
                                if (element['media$thumbnail']) {
                                    post.attachment = '<img class="attachment" src="' + element['media$thumbnail']['url'] + '" />';
                                }
                            }

                            post.render();

                        });
                    }
                }
            },
            pinterest: {
                posts: [],
                loaded: false,
                apiv1: 'https://api.pinterest.com/v1/',

                getData: function(account) {
                    var request_url,
                      limit = 'limit=' + options.pinterest.limit,
                      fields = 'fields=id,created_at,link,note,creator(url,first_name,last_name,image),image',
                      query_extention = fields + '&access_token=' + options.pinterest.access_token + '&' + limit + '&callback=?';
                    switch (account[0]) {
                        case '@':
                            var username = account.substr(1);
                            if (username === 'me') {
                                request_url = Feed.pinterest.apiv1 + 'me/pins/?' + query_extention;
                            } else {
                                request_url = Feed.pinterest.apiv1 + 'boards/' + username + '/pins?' + query_extention;
                            }
                            break;
                        default:
                    }
                    Utility.request(request_url, Feed.pinterest.utility.getPosts);
                },
                utility: {

                    getPosts: function(json) {
                        json.data.forEach(function(element) {
                            var post = new SocialFeedPost('pinterest', Feed.pinterest.utility.unifyPostData(element));
                            post.render();
                        });
                    },

                    unifyPostData: function(element){
                        var post = {};

                        post.id = element.id;
                        post.dt_create= moment(element.created_at);
                        post.author_link = element.creator.url;
                        post.author_picture = element.creator.image['60x60' ].url;
                        post.author_name =  element.creator.first_name + element.creator.last_name;
                        post.message = element.note;
                        post.description = '';
                        post.social_network = 'pinterest';
                        post.link = element.link ? element.link : 'https://www.pinterest.com/pin/' + element.id;
                        if (options.show_media) {
                            post.attachment = '<img class="attachment" src="' + element.image['original'].url + '" />';
                        }
                        return post;
                    }
                }
            },
            rss : {
                posts: [],
                loaded: false,
                api : 'https://query.yahooapis.com/v1/public/yql?q=',
                datatype: 'json',

                getData: function(url) {
                    var limit = options.rss.limit,
                      yql = encodeURIComponent('select entry FROM feednormalizer where url=\'' + url + '\' AND output=\'atom_1.0\' | truncate(count=' + limit + ')' ),
                      request_url = Feed.rss.api + yql + '&format=json&callback=?';

                    Utility.request(request_url, Feed.rss.utility.getPosts, Feed.rss.datatype);
                },
                utility: {

                    getPosts: function(json) {
                        if (json.query.count > 0 ){
                            $.each(json.query.results.feed, function(index, element) {
                                var post = new SocialFeedPost('rss', Feed.rss.utility.unifyPostData(index, element));
                                post.render();
                            });
                        }
                    },

                    unifyPostData: function(index, element){

                        var item = element;

                        if ( element.entry !== undefined ){
                            item = element.entry;
                        }
                        var post = {};

                        post.id = '"' + item.id + '"';
                        post.dt_create= moment(item.published, 'YYYY-MM-DDTHH:mm:ssZ', 'en');

                        post.author_link = '';
                        post.author_picture = '';
                        post.author_name = '';
                        if( item.creator !== undefined ){
                            post.author_name = item.creator;
                        }
                        post.message = item.title;
                        post.description = '';
                        if( item.summary !== undefined ){
                            post.description = Utility.stripHTML(item.summary.content);
                        }
                        post.social_network = 'rss';
                        post.link = item.link.href;
                        if (options.show_media && item.thumbnail !== undefined ) {
                            post.attachment = '<img class="attachment" src="' + item.thumbnail.url + '" />';
                        }
                        return post;
                    }
                }
            }
        };

        //make the plugin chainable
        return this.each(function() {
            // Initialization
            Feed.init();
            if (options.update_period) {
                setInterval(function() {
                    return Feed.init();
                }, options.update_period);
            }
        })
    };

})(jQuery);

var updateFeed = function(el,snsObject,callback) {
    if(typeof el == 'undefined') {
        alert('??????????????? ????????????.');
        return false;
    }

    var org_content = $('.' + el + ' [data-loop="true"]').children().outerHTML(),
        render = $('.' + el + ' [data-loop="true"]').children().first().outerHTML();

    var check_empty = true,
        check_empty_sns = { 'twitter':true, 'instagram':true }
        sns_data = {};

    $.each(snsObject, function(network, val) {
        switch(typeof val) {
            case 'string': 
                if(val != '') var new_value = String(val).split(',');
                break;

            case 'object': 
                if(!$.isEmptyObject(val)) var new_value = val;
                break;

            default:
                break;
        }


        if(typeof new_value != 'undefined') {
            sns_data[network] = new_value;
            check_empty_sns[network] = false;
            if(check_empty) check_empty = false;
        } else {
            sns_data[network] = [''];
        }

    });

    var el_seq = $('.' + el).attr('data-id'),
        el_sid = (typeof MODE != 'undefined' &&  (MODE == 'config' || MODE == 'demo')) ? SID : property.SID,
        postLength = $('.' + el).attr('data-feed-post-length'),
        limit_twitter = $('.' + el).attr('data-feed-limit-twitter'),
        limit_facebook = $('.' + el).attr('data-feed-limit-facebook'),
        limit_instagram = $('.' + el).attr('data-feed-limit-instagram');

    var isGetData = false; 
    if (typeof MODE != 'undefined' && (MODE == 'config' || MODE == 'demo')) {
        $.post('/template/element/type/get/seq/' + el_seq , { sid : el_sid }, function (data) {
            checkError(data);
            $.each(data, function(idx, val) {
                $el_org = $(htmlspecialchars_decode(val.eltag));
            });
            isGetData = true;
        },'json');
    } else {
        
        if(typeof property.CONTENTS['el'+el_seq] != 'undefined' && typeof property.CONTENTS['el'+el_seq].element != 'undefined') {
            $el_org = $(htmlspecialchars_decode(property.CONTENTS['el'+el_seq].element.eltag));
            isGetData = true;
        } else {
            var getContent = $.ajax({ url : '/template/element/type/get/seq/' + el_seq, data: { use : 'sns'}, dataType: 'json', type: 'POST', async: false, cache: false });
            getContent.then(function(data) {
                checkError(data);
                var d = data[0];
                $el_org = $(htmlspecialchars_decode(d.eltag));
                isGetData = true;
            });
        }

    }

    $('.' + el + ' .social-feed-container').html('');
    if(isGetData) {

        if(typeof $el_org != 'undefined' && $el_org){
            org_content = $el_org.find('[data-loop="true"]').children().outerHTML();
            render = $el_org.find('[data-loop="true"]').children().first().outerHTML();
        }

        postLength = (typeof postLength == 'undefined') ? 100 : Number(postLength);
        limit_twitter = (typeof limit_twitter == 'undefined') ? 5 : Number(limit_twitter);
        limit_facebook = (typeof limit_facebook == 'undefined') ? 5 : Number(limit_facebook);
        limit_instagram = (typeof limit_instagram == 'undefined') ? 5 : Number(limit_instagram);

        $('.' + el + ' .social-feed-container').socialfeed({
            twitter: {
                accounts: sns_data.twitter,
                limit: limit_twitter,
                consumer_key: 'QADNXUZUxht1MHSRU6tX7DkNk', // make sure to have your app read-only
                consumer_secret: 'fN6g65F8yAdXel7ttzMDntfSXWAVJHQlivkMhGWZ0599iiSPjQ', // make sure to have your app read-only
            },
            facebook: {
                accounts: sns_data.facebook,
                limit: limit_facebook,
                access_token: '110859402598144|9eab5eed1805d2c74d696ef151c32ea5'
            },
            instagram: {
                accounts: ( typeof sns_data.instagram == 'object' && 
                            typeof sns_data.instagram.id != 'undefined' && 
                            sns_data.instagram.id
                        ) ? String(sns_data.instagram.id).split(' ') : sns_data.instagram,
                limit: limit_instagram,
                access_token: ( typeof sns_data.instagram == 'object' && 
                                typeof sns_data.instagram.token != 'undefined' && 
                                sns_data.instagram.token
                            ) ? sns_data.instagram.token : '3150770084.2bca826.5e2ded8c9d40478d8f35dc584045f11c',
                //3150770084.2bca826.5e2ded8c9d40478d8f35dc584045f11c <= before version code
            },
            // GENERAL SETTINGS
            length: postLength,
            show_media: true,
            template: render,
            org_content: org_content,
            element: el,
            check_empty: check_empty,
            check_get_data: { 'twitter': check_empty_sns.twitter, 'instagram': check_empty_sns.instagram },
            total: 0,
            moderation: function(content) {
                return (content.text) ? content.text.indexOf('fuck') == -1 : true;
            },
            callback: function() {
                var post_count = $('.'+el+' .social-feed-container').children().length,
                    feed_view = (typeof $('.'+el).attr('data-feed-view') != 'undefined') ? Number($('.'+el).attr('data-feed-view')) : 0;

                if(feed_view>0 && feed_view>=this.total) $('.'+el+' .data-feed-load-more').fadeOut(200);
            }
        });
    }

    if(typeof callback == 'function') callback();
        
};
