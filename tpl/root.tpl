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

    <!-- UiKit -->
	<script src="/node_modules/uikit/dist/js/uikit.min.js"></script>
    <link rel="stylesheet" href="/node_modules/uikit/dist/css/uikit.min.css" type="text/css">

	<link rel="stylesheet" href="/node_modules/uikit/dist/css/components/datepicker.almost-flat.min.css" type="text/css">
	<script src="/node_modules/uikit/dist/js/components/datepicker.min.js" type="text/javascript"></script>
	<script src="/node_modules/uikit/dist/js/components/timepicker.min.js" type="text/javascript"></script>
	<link rel="stylesheet" href="/node_modules/uikit/dist/css/components/form-advanced.almost-flat.min.css" type="text/css">
	<link rel="stylesheet" href="/node_modules/uikit/dist/css/components/form-password.almost-flat.min.css" type="text/css">
	<link rel="stylesheet" href="/node_modules/uikit/dist/css/components/form-select.almost-flat.min.css" type="text/css">
	<link rel="stylesheet" href="/node_modules/uikit/dist/css/components/slideshow.almost-flat.min.css" type="text/css">
	<script src="/node_modules/uikit/dist/js/components/form-password.min.js" type="text/javascript"></script>
	<script src="/node_modules/uikit/dist/js/components/form-select.min.js" type="text/javascript"></script>
	<script src="/node_modules/uikit/dist/js/core/switcher.min.js" type="text/javascript"></script>
	<script src="/node_modules/uikit/dist/js/components/sticky.min.js" type="text/javascript"></script>
	<script src="/node_modules/uikit/dist/js/components/slideshow.min.js" type="text/javascript"></script>

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
	<script src="/js/signup.js"></script>
	<script src="/js/currency.js"></script>
	<script src="/js/resetpassword.js"></script>

	<!-- SystemJS -->
	<script src="/systemjs.config.js" type="text/javascript"></script>
	<script type="text/javascript">System.import('app').catch(function(err){ throw err })</script>
</head>
<body>
<div id="wrap">
    <header class="main-header">
        <div class="container">
            <div class="top-line uk-flex uk-grid">
                <div class="uk-width-1-2 top-contacts">
					<div class="uk-flex uk-grid">
                    	<div class="uk-width-1-2 top-contacts_elem top-contacts_phone"><i class="demo-icon ico_phone"></i>{{=it.ml.phone_header}}</div>
                    	<div class="uk-width-1-2 top-contacts_elem top-contacts_email"><a href="mailto:ask@arabtravel.jo"><i class="demo-icon ico_mail"></i>ask@arabtravel.jo</a></div>
					</div>
				</div>
                <div class="uk-width-1-2">
                    <div class="uk-flex uk-grid">
                    	<div class="uk-width-1-2">
                    	    <a id="currentAccountLink" href="{{=it.userEmail && (it.lang + '/user') || '#login-form-modal'}}" class="btn btn-default btn-ghost btn-ui btn-account" {{? !it.userEmail }} data-uk-modal {{?}}>
                    	        <i class="demo-icon ico_user"></i><span id="currentAccount">{{=it.userEmail || it.ml.signIn}}</span>
                    	    </a>&nbsp;
							{{? !it.userEmail }}
                    		<a id="currentAccountLink" href="{{=it.userEmail && (it.lang + '/user') || '#signup-form-modal'}}" class="btn btn-default btn-ghost btn-ui btn-account" {{? !it.userEmail }} data-uk-modal {{?}}>
                    	        <i class="demo-icon ico_user"></i><span id="currentAccount">{{=it.ml.signUp }}</span>
                    	    </a>&nbsp;
							{{?}}
							{{? it.userEmail }}<a id="logoutLink" href="/auth/logout" class="btn btn-default btn-ghost btn-ui btn-account">
                    	        <i class="glyphicon glyphicon-log-out"></i><span>{{=it.ml.logout}}</span>
                    	    </a>{{?}}
                    	</div>
                    	<div class="uk-width-1-2 lang-cur-dd">
                    	    <div class="dropdown dd-currency uk-margin-right uk-margin-left" data-uk-dropdown="{mode:'click'}">
                    	        <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    	            <span currency-field>{{=it.ml.USD}}</span>
                    	            <span class="caret"></span>
                    	        </button>
                    	        <ul class="uk-dropdown dropdown-menu" aria-labelledby="dLabel">
                    	            <li class="uk-dropdown-close"><a currency-set="USD">{{=it.ml.USD}}</a></li>
                    	            <li class="uk-dropdown-close"><a currency-set="JOD">{{=it.ml.JOD}}</a></li>
									<li class="uk-dropdown-close"><a currency-set="SAR">{{=it.ml.SAR}}</a></li>
									<li class="uk-dropdown-close"><a currency-set="EGP">{{=it.ml.EGP}}</a></li>
                    	        </ul>
                    	    </div>
                    	    <div class="dropdown dd-lang" data-uk-dropdown="{mode:'click'}">

								{{? it.lang === 'ar'}}
									<a href="/en" id="dLabel">English</a>
									{{?? it.lang === 'en'}}
									<a href="/ar" id="dLabel">عربي</a>
									{{??}}
								{{?}}

                    	    </div>
                    	</div>
                    </div>
                </div>
            </div>
            <div class="nav-line clearfix uk-flex uk-grid">
                <div class="uk-width-2-3 logo-container">
                    <div class="logo-subtitle-container">
                        <div class="subtitle">{{=it.ml.ferryBookingAgency}}</div>
                        <div class="logo">
                            <a class="logo-link" href="/{{=it.lang}}"><img src="img/logo.png" alt=""></a>
                        </div>
                    </div>
                    <div class="subtitle2">{{=it.ml.subtitle}}</div>

                </div>

                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
                </button>
                <ul class="nav navbar-nav header-navbar uk-width-1-3">
                    <li class="dropdown" data-uk-dropdown="{mode:'click'}">
                        <a href="" class="dropdown-toggle" data-toggle="dropdown">{{=it.ml.passengerInfo}}<strong class="caret"></strong></a>
                        <ul class="uk-dropdown dropdown-menu">
                        	{{~it.static :value:index}}
								 <li>
                                	<a href="http://arabtravel.jo/{{=it.lang}}/{{=value.url}}">{{=value.title}}</a>
                            	</li>
							{{~}}
                        </ul>
                    </li>
                    <li class="dropdown" data-uk-dropdown="{mode:'click'}">
                        <a href="" class="dropdown-toggle" data-toggle="dropdown">{{=it.ml.contactUs}}<strong class="caret"></strong></a>
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
                    {{=it.ml.ferryBookingAgency}}
                    <img alt="Bootstrap Image Preview" src="img/logo-footer.png" style="width: 100%" /> {{=it.ml.subtitle}}

                    <div class="top-contacts">
                        <div class="top-contacts_elem top-contacts_phone"><i class="demo-icon ico_phone"></i>{{=it.ml.phone_header}}</div>
                        <div class="top-contacts_elem top-contacts_email"><a href="mailto:ask@arabtravel.jo"><i class="demo-icon ico_mail"></i>ask@arabtravel.jo</a></div>
                    </div>
                </div>
                <div class="col-md-6">
					<contact-form></contact-form>
                </div>
                <div class="col-md-3">
                    <div class="row">
                        <div class="col-md-6">
                            <p class="footer-title">{{=it.ml.passengerInfo}}</p>
                            <ul class="footer-menu">
                                {{~it.static :value:index}}
								 <li>
                                	<a href="http://arabtravel.jo/{{=value.url}}">{{=value.title}}</a>
                            	</li>
								{{~}}
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <p class="footer-title">{{=it.ml.contactUs}}</p>
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
						{{=it.ml.arabTravelCopyright}}
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- This is the modal -->
    <div id="login-form-modal" class="uk-modal">
        <div class="uk-modal-dialog">

            <a class="uk-modal-close uk-close"></a>
            <div class="uk-modal-header"><span class="h3">{{=it.ml.signInForm}}</span></div>

            <form role="form" class="login-form">
                <div class="uk-flex uk-grid uk-margin-bottom">
                    <div class="uk-width-1-2">
                        <div class="form-group">
                            <label for="loginForm_login">
                                {{=it.ml.login}}
                            </label>
                            <input type="email" class="form-control" name="email" required>
                        </div>
                    </div>
                    <div class="uk-width-1-2">
                        <div class="form-group">
                            <label for="loginForm_password">
                                {{=it.ml.password}}
                            </label>
                            <input type="password" class="form-control" name="password" required>
                        </div>
                    </div>
                </div>

				<p><button class="uk-button" data-uk-modal="{target:'#forgot-pw-modal', modal: false}">{{=it.ml.forgotPassword}}</button></p>

                <div class="text-center uk-margin-top">
                    <button type="submit" class="btn btn-primary">
                        {{=it.ml.signIn}}
                    </button>
                </div>
            </form>

        </div>
    </div>

	    <!-- This is the modal -->
    <div id="forgot-pw-modal" class="uk-modal">
        <div class="uk-modal-dialog">

            <a class="uk-modal-close uk-close"></a>
            <div class="uk-modal-header"><span class="h3">{{=it.ml.forgotPassword}}</span></div>
			<p>{{=it.ml.pwRecoverText}}</p>
            <form role="form" class="login-form">
                <div class="uk-flex uk-grid">
					<div class="uk-width-1-2">
                        <div class="form-group">
                            <label for="loginForm_login">
                                {{=it.ml.login}}
                            </label>
                            <input type="email" class="form-control" name="email" required>
                        </div>
                    </div>
                </div>

                <div class="text-center uk-margin-top">
                    <button type="submit" class="btn btn-primary">
                        {{=it.ml.recover}}
                    </button>
                </div>
            </form>

        </div>
    </div>

    <!-- This is the modal -->
    <div id="signup-form-modal" class="uk-modal">
        <div class="uk-modal-dialog">

            <a class="uk-modal-close uk-close"></a>
            <div class="uk-modal-header"><span class="h3">{{=it.ml.signUpWithAT}}</span></div>

			{{=it.ml.EMCh}}
			<ul class="simple-list">
				<li>{{=it.ml.EMCh2}}</li>
				<li>{{=it.ml.EMCh3}}</li>
				<li>{{=it.ml.EMCh4}}</li>
			</ul>

            <form role="form" class="login-form" id="signUpForm">
                <div class="uk-flex uk-grid">
					<div class="uk-width-1-2">
                        <div class="form-group">
                            <label for="loginForm_login">
                                {{=it.ml.name}}
                            </label>
                            <input type="text" class="form-control" name="title" required>
                        </div>
                    </div>
                    <div class="uk-width-1-2">
                        <div class="form-group">
                            <label for="loginForm_login">
                                {{=it.ml.email}}
                            </label>
                            <input type="email" class="form-control" name="email" required>
                        </div>
                    </div>
                </div>

                <div class="text-center uk-margin-top">
                    <button type="submit" class="btn btn-primary">
                        {{=it.ml.signIn}}
                    </button>
                </div>
            </form>

        </div>
    </div>

</body>
</html>
