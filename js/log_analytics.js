function log_analytics(sid,googleAnalytics,googleAnalytics_check) {
	var scriptTag='';
	if(googleAnalytics_check=='old') {
		scriptTag = "\
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n\
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n\
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n\
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\n\
		";
		if(googleAnalytics) {
		scriptTag += "\
			ga('create', '"+googleAnalytics+"', 'auto');\n\
			ga('require', 'displayfeatures');\n\
			ga('require', 'linkid');\n\
			ga('send', 'pageview');\n\
			";
		}
		
	} else {
		if(sid && googleAnalytics) {
			scriptTag = "\
			window.dataLayer = window.dataLayer || [];\n\
		  	function gtag(){dataLayer.push(arguments);}\n\
		  	gtag('js', new Date());\n\
		  	";
		  	scriptTag += (googleAnalytics) ? "gtag('config', '"+googleAnalytics+"');\n" : "";
		  	$('body').prepend('<script async src="https://www.googletagmanager.com/gtag/js?id='+googleAnalytics+'"></script>');
		}
	}

	$('body').prepend('<script>'+scriptTag+'</script>');
}
