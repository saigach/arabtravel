<!DOCTYPE html>
<html lang="en" itemscope itemtype="http://schema.org/Webpage">
<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta http-equiv="cleartype" content="on">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<meta http-equiv="x-dns-prefetch-control" content="off">
	<meta http-equiv="Window-Target" content="_value">

	<meta name="referrer" content="never">
	<meta name="format-detection" content="telephone=no">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-title" content="{{=it.title || 'Arabtravel'}}">

	<meta property="fb:app_id" content="1234567890">
	<link rel="manifest" href="/manifest.json">
	<meta name="rating" content="general">

	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
	<link rel="icon" sizes="16x16 32x32" href="/favicon.ico" type="image/x-icon">
	<link rel="icon" sizes="152x152" href="/favicon.png" type="image/png">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" type="image/png">
	<link rel="apple-touch-startup-image" sizes="180x180" href="/apple-touch-icon.png" type="image/png">

	<title>{{=it.title || 'Arabtravel'}}</title>
	<meta name="title" content="{{=it.title || 'Arabtravel'}}">
	<meta name="application-name" content="{{=it.title || 'Arabtravel'}}">
	<meta name="description" content="{{=it.description || 'Arabtravel default description'}}">

	<meta name="url" content="https://{{=it.host}}">

	<!-- Schema.org markup (Google) -->
	<meta itemprop="name" content="{{=it.title || 'Arabtravel'}}">
	<meta itemprop="description" content="{{=it.description || 'Arabtravel default description'}}">
	<meta itemprop="image" content="https://{{=it.host}}{{=it.image || '/og.png'}}">

	<!-- Open Graph markup (Facebook, Pinterest) -->
	<meta property="og:title" content="{{=it.title || 'Arabtravel'}}">
	<meta property="og:type" content="article">
	<meta property="og:url" content="https://{{=it.host}}{{=it.url || '/'}}">
	<meta property="og:image" content="https://{{=it.host}}{{=it.image || '/og.png'}}">
	<meta property="og:description" content="{{=it.description || 'Arabtravel default description'}}">
	<meta property="og:site_name" content="Arabtravel">
	<meta property="og:locale" content="en_EN">

	<!-- Twitter markup (Twitter) -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:url" content="https://{{=it.host}}">
	<meta name="twitter:title" content="{{=it.title || 'Arabtravel'}}">
	<meta name="twitter:description" content="{{=it.description || 'Arabtravel default description'}}">
	<meta name="twitter:image" content="https://{{=it.host}}{{=it.image || '/og.png'}}">
	<meta name="twitter:image:alt" content="{{=it.description || ''}}">
</head>
<body>
	{{=it.main || ''}}
</body>
</html>
