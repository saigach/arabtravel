<!DOCTYPE html>
<html lang="{{=it.lang}}" {{? it.lang === 'ar'}}dir=rtl{{?}} itemscope itemtype="http://schema.org/Webpage">
<head>
	<base href="/">

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

	<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400" rel="stylesheet">

	<!-- Polyfills -->
	<script src="/node_modules/core-js/client/shim.min.js" type="text/javascript"></script>
	<script src="/node_modules/zone.js/dist/zone.js" type="text/javascript"></script>
	<script src="/node_modules/reflect-metadata/Reflect.js" type="text/javascript"></script>
	<script src="/node_modules/systemjs/dist/system.src.js" type="text/javascript"></script>

	<!-- jQuery -->
	<script src="/node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>

	<!-- Font Awesome CSS -->
	<link rel="stylesheet" href="/node_modules/font-awesome/css/font-awesome.min.css" type="text/css">

	<!-- Icons -->
	<link rel="stylesheet" href="/fonts/arabtravel-icons/css/arabtravel-icons.css" type="text/css">

	<!-- Bootstrap -->
	<link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css" type="text/css">

    <!-- UiKit -->
	<script src="/node_modules/uikit/dist/js/uikit.min.js"></script>
    <link rel="stylesheet" href="/node_modules/uikit/dist/css/uikit.min.css" type="text/css">

	<link rel="stylesheet" href="/node_modules/uikit/dist/css/components/datepicker.almost-flat.min.css" type="text/css">
	<script src="/node_modules/uikit/dist/js/components/datepicker.min.js" type="text/javascript"></script>
	<script src="/node_modules/uikit/dist/js/components/timepicker.min.js" type="text/javascript"></script>
	<link rel="stylesheet" href="/node_modules/uikit/dist/css/components/form-advanced.almost-flat.min.css" type="text/css">
	<link rel="stylesheet" href="/node_modules/uikit/dist/css/components/form-password.almost-flat.min.css" type="text/css">
	<link rel="stylesheet" href="/node_modules/uikit/dist/css/components/form-select.almost-flat.min.css" type="text/css">
	<script src="/node_modules/uikit/dist/js/components/form-password.min.js" type="text/javascript"></script>
	<script src="/node_modules/uikit/dist/js/components/form-select.min.js" type="text/javascript"></script>
	<script src="/node_modules/uikit/dist/js/core/switcher.min.js" type="text/javascript"></script>
	<script src="/node_modules/uikit/dist/js/components/sticky.min.js" type="text/javascript"></script>

	<script src="/node_modules/uikit/dist/js/components/grid.min.js" type="text/javascript"></script>

	<link rel="stylesheet" href="/node_modules/uikit/dist/css/components/notify.almost-flat.min.css" type="text/css">
	<script src="/node_modules/uikit/dist/js/components/notify.min.js" type="text/javascript"></script>

	<!-- moment -->
	<script src="/node_modules/moment/moment.js"></script>
	<script src="/node_modules/moment/locale/ar.js"></script>


	<!-- owl.carousel -->
	<link rel="stylesheet" href="/node_modules/owl.carousel/dist/assets/owl.carousel.css">
	<script src="/node_modules/owl.carousel/dist/owl.carousel.min.js"></script>

	<!-- jquery.mask -->
	<script src="/node_modules/jquery-mask-plugin/dist/jquery.mask.min.js"></script>

	<link rel="stylesheet" href="/css/loader.min.css" type="text/css">
	<link rel="stylesheet" href="/css/styles.css" type="text/css">
	<script src="/js/main.js"></script>

	<script src="/js/auth.js"></script>

	<!-- SystemJS -->
	<script src="/systemjs.config.js" type="text/javascript"></script>
	<script type="text/javascript">System.import('app').catch(function(err){ throw err })</script>
</head>
<body>
<div id="wrap">
    <header class="main-header">
        <div class="container">
            <div class="row top-line">
                <div class="col-md-6 top-contacts">
                    <div class="top-contacts_elem top-contacts_phone"><i class="demo-icon ico_phone"></i>{{=it.ml.phone}}</div>
                    <div class="top-contacts_elem top-contacts_email"><a href="mailto:ask@arabtravel.jo"><i class="demo-icon ico_mail"></i>ask@arabtravel.jo</a></div>
                </div>
                <div class="col-md-4 col-md-push-2">
                    <div class="pull-left">
                        <a id="currentAccountLink" href="{{=it.userEmail && '/user' || '#login-form-modal'}}" class="btn btn-default btn-ghost btn-ui btn-account" {{? !it.userEmail }} data-uk-modal {{?}}>
                            <i class="demo-icon ico_user"></i><span id="currentAccount">{{=it.userEmail || 'Sign Up'}}</span>
                        </a>
                    </div>
                    <div class="pull-right">
                        <div class="dropdown pull-right dd-currency" data-uk-dropdown="{mode:'click'}">
                            <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                USD
                                <span class="caret"></span>
                            </button>
                            <ul class="uk-dropdown dropdown-menu" aria-labelledby="dLabel">
                                <li><a href="">USD</a></li>
                                <li><a href="">JOD</a></li>
                            </ul>
                        </div>
                        <div class="dropdown pull-right dd-lang" data-uk-dropdown="{mode:'click'}">
                            <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{=it.lang}}
                                <span class="caret"></span>
                            </button>
                            <ul class="uk-dropdown dropdown-menu" aria-labelledby="dLabel">
                                <li><a href="/en">en</a></li>
                                <li><a href="/ar">ar</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row nav-line clearfix">
                <div class="col-md-8 logo-container">
                    <div class="logo-subtitle-container">
                        <div class="subtitle">Ferry booking agency</div>
                        <div class="logo">
                            <a class="logo-link" href="/{{=it.lang}}"><img src="img/logo.png" alt=""></a>
                        </div>
                    </div>
                    <div class="subtitle2">Your road between Jordan, Egypt and Saudi Arabia</div>

                </div>

                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
                </button>
                <ul class="nav navbar-nav navbar-right header-navbar">
                    <li class="dropdown" data-uk-dropdown="{mode:'click'}">
                        <a href="" class="dropdown-toggle" data-toggle="dropdown">Passenger Info<strong class="caret"></strong></a>
                        <ul class="uk-dropdown dropdown-menu">
                        	{{~it.static :value:index}}
								 <li>
                                	<a href="/{{=value.url}}">{{=value.title}}</a>
                            	</li>
							{{~}}
                        </ul>
                    </li>
                    <li class="dropdown" data-uk-dropdown="{mode:'click'}">
                        <a href="" class="dropdown-toggle" data-toggle="dropdown">Contact Us<strong class="caret"></strong></a>
                        <ul class="uk-dropdown dropdown-menu">
                            <li>
                                <a href="#">Jordan</a>
                            </li>
                            <li>
                                <a href="#">Egypt</a>
                            </li>
                            <li>
                                <a href="#">Iraq</a>
                            </li>
                            <li class="divider">
                            </li>
                            <li>
                                <a href="#">Agents</a>
                            </li>
                        </ul>
                    </li>
                </ul>

            </div>
        </div>
    </header>
	<div class="page-content">
		{{=it.main || ''}}
	</div>
	</div><!-- /.wrap -->
	<footer class="main-footer" id="main-footer">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    ferry booking agency
                    <img alt="Bootstrap Image Preview" src="img/logo-footer.png" style="width: 100%" /> Your road between Jordan Egypt and Saudi Arabia

                    <div class="top-contacts">
                        <div class="top-contacts_elem top-contacts_phone"><i class="demo-icon ico_phone"></i>(123) 456 78 99 </div>
                        <div class="top-contacts_elem top-contacts_email"><a href="mailto:ask@arabtravel.jo"><i class="demo-icon ico_mail"></i>ask@arabtravel.jo</a></div>
                    </div>
                </div>
                <div class="col-md-6">
					<contact-form></contact-form>
                </div>
                <div class="col-md-3">
                    <div class="row">
                        <div class="col-md-6">
                            <p class="footer-title">Passenger Info</p>
                            <ul class="footer-menu">
                                <li>
                                    <a href="#">Fleet Time Table</a>
                                </li>
                                <li>
                                    <a href="#">Travel Guides for Passengers</a>
                                </li>
                                <li>
                                    <a href="#">Travel Guides for Vehicles</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <p class="footer-title">Contact us</p>
                            <ul class="footer-menu">
                                <li>
                                    <a href="#">Jordan</a>
                                </li>
                                <li>
                                    <a href="#">Egypt</a>
                                </li>
                                <li>
                                    <a href="#">Iraq</a>
                                </li>
                                <li class="divider">
                                </li>
                                <li>
                                    <a href="#">Agents</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row bottom-line">
                <div class="col-md-12">
                    <div class="copyright">
                        © Arab Travel, 2016
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- This is the modal -->
    <div id="login-form-modal" class="uk-modal">
        <div class="uk-modal-dialog">

            <a class="uk-modal-close uk-close"></a>
            <div class="uk-modal-header"><span class="h3">Sign Up Form</span></div>

            <form role="form" class="login-form">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="loginForm_login">
                                Login
                            </label>
                            <input type="email" class="form-control" name="email" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="loginForm_password">
                                Password
                            </label>
                            <input type="password" class="form-control" name="password" required>
                        </div>
                    </div>
                </div>

                <div class="text-center">
                    <button type="submit" class="btn btn-primary">
                        Sign Up
                    </button>
                </div>
            </form>

        </div>
    </div>

</body>
</html>
