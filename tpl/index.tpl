    <header class="main-header">
        <div class="container">
            <div class="row top-line">
                <div class="col-md-6 top-contacts">
                    <div class="top-contacts_elem top-contacts_phone"><i class="demo-icon ico_phone"></i>(123) 456 78 99 </div>
                    <div class="top-contacts_elem top-contacts_email"><a href="mailto:ask@arabtravel.jo"><i class="demo-icon ico_mail"></i>ask@arabtravel.jo</a></div>
                </div>
                <div class="col-md-4 col-md-push-2">
                    <div class="pull-left">
                        <a href="" class="btn btn-default btn-ghost btn-ui btn-account">
                            <i class="demo-icon ico_user"></i> Му account
                        </a>
                    </div>
                    <div class="pull-right">
                        <div class="dropdown pull-right">
                            <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                USD
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dLabel">
                                <li><a href="">USD</a></li>
                                <li><a href="">JOD</a></li>
                            </ul>
                        </div>
                        <div class="dropdown pull-right">
                            <button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                EN
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dLabel">
                                <li><a href="">EN</a></li>
                                <li><a href="">AR</a></li>
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
                            <a class="logo-link" href="/"><img src="img/logo.png" alt=""></a>
                        </div>
                    </div>
                    <div class="subtitle2">Your road between Jordan, Egypt and Saudi Arabia</div>

                </div>

                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
                </button>
                <ul class="nav navbar-nav navbar-right header-navbar">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Passenger Info<strong class="caret"></strong></a>
                        <ul class="dropdown-menu">
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
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Contact Us<strong class="caret"></strong></a>
                        <ul class="dropdown-menu">
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

    <div class="form-area">

        <div class="carousel-container">
            <div class="carousel slide" data-ride="carousel" id="main-page-carousel">
                <ol class="carousel-indicators">
                    <li class="active" data-slide-to="0" data-target="#main-page-carousel">
                    </li>
                    <li data-slide-to="1" data-target="#main-page-carousel">
                    </li>
                    <li data-slide-to="2" data-target="#main-page-carousel">
                    </li>
                </ol>
                <div class="carousel-inner">
                    <div class="item active">
                        <img alt="Carousel Bootstrap First" src="img/slide1.jpg" />
                    </div>
                    <div class="item">
                        <img alt="Carousel Bootstrap Second" src="img/slide2.jpg" />
                    </div>
                    <div class="item">
                        <img alt="Carousel Bootstrap Third" src="img/slide3.jpg" />
                    </div>
                </div>
                <a class="left carousel-control" href="#main-page-carousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a> <a class="right carousel-control" href="#main-page-carousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>
            </div>
        </div>

        <div class="main-search-form">
            <div class="container">
                <div class="row">

                    <div class="col-md-12">

                        <div class="main-search-form_form">

                            <div class="tabbable">
                                <ul class="nav nav-tabs">
                                    <li class="active">
                                        <a href="#main-search-form_panel_one-way" data-toggle="tab">One Way</a>
                                    </li>
                                    <li>
                                        <a href="#main-search-form_panel_round-trip" data-toggle="tab">Round Trip</a>
                                    </li>
                                    <li>
                                        <a href="#main-search-form_panel_tourist-package" data-toggle="tab">Tourist Package</a>
                                    </li>
                                </ul>
                                <div class="tab-content inverted-form">
                                    <div class="tab-pane active" id="main-search-form_panel_one-way">
                                        <form class="main-search-form_form_form">
                                            <div class="row">

                                                <div class="col-md-3">
                                                    <label for="rf">Route</label>
                                                    <select name="" id="rf" data-control="selectpicker" class="selectpicker form-control fit-width">
														<!--{@=trips
															<option value="{{$.A.uuid}}">{{$.A.title}}</option>

														@}-->
                                                    </select>

                                                </div>

                                                <div class="col-md-2 form-group">
                                                    <label for="rf">Date of departure</label>
                                                    <div class='input-group date'>
                                                        <input type="text" class="form-control" data-control="datepicker">
                                                        <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="row">

                                                        <div class="col-md-4 form-group">
                                                            <label for="rf">Adults</label>
                                                            <input type="text" class="form-control" data-control="spinner-vertical" />
                                                        </div>

                                                        <div class="col-md-4 form-group">
                                                            <label for="rf">2-6 yr</label>
                                                            <input type="text" class="form-control" data-control="spinner-vertical" />
                                                        </div>

                                                        <div class="col-md-4 form-group">
                                                            <label for="rf">&lt;2 yr</label>
                                                            <input type="text" class="form-control" data-control="spinner-vertical" />
                                                        </div>

                                                    </div>


                                                </div>

                                                <div class="col-md-3">

                                                    <div class="row">
                                                        <div class="col-md-6">
                                                           <label>Vehicle</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="">
                                                               <div class="styled-checkbox">
                                                                    <input class="checkbox" type="checkbox" id="ch1"><label for="ch1">Yes</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <select name="" id="rf"  class="selectpicker form-control fit-width">
                                                                <option value="">Car</option>
                                                                <option value="">Truck</option>
                                                                <option value="">Motorcycle</option>
                                                            </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="text-center submit-btn-container">

                                                <input type="submit" class="btn btn-danger" value="CHECK AVALIABILITY">

                                            </div>
                                        </form>
                                    </div>
                                    <div class="tab-pane" id="main-search-form_panel_round-trip">
                                        <form class="main-search-form_form_form">
                                            <div class="row">

                                                <div class="col-md-4">
                                                    <label for="rf">Route from</label>
                                                    <select name="" id="rf" data-control="selectpicker" class="selectpicker form-control fit-width">
                                                        <option value="">Aqaba</option>
                                                        <option value="">Taba</option>
                                                        <option value="">Sharm El-Sheikh</option>
                                                    </select>

                                                </div>

                                                <div class="col-md-4">
                                                    <label for="rf">Route to</label>
                                                    <select name="" id="rt" data-control="selectpicker" class="form-control fit-width">
                                                        <option value="">Aqaba</option>
                                                        <option value="">Taba</option>
                                                        <option value="">Sharm El-Sheikh</option>
                                                    </select>

                                                </div>

                                                <div class="col-md-4">
                                                    <div class="row">

                                                        <div class="col-md-4 form-group">
                                                            <label for="rf">Adults</label>
                                                            <input type="text" class="form-control" data-control="spinner-vertical" />
                                                        </div>

                                                        <div class="col-md-4 form-group">
                                                            <label for="rf">2-6 yr</label>
                                                            <input type="text" class="form-control" data-control="spinner-vertical" />
                                                        </div>

                                                        <div class="col-md-4 form-group">
                                                            <label for="rf">&lt;2 yr</label>
                                                            <input type="text" class="form-control" data-control="spinner-vertical" />
                                                        </div>

                                                    </div>


                                                </div>

                                            </div>

                                            <div class="row">

                                                <div class="col-md-4 form-group">
                                                    <label for="rf">Date of departure</label>
                                                    <div class='input-group date'>
                                                        <input type="text" class="form-control" data-control="datepicker">
                                                        <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>

                                                </div>

                                                <div class="col-md-4 form-group">
                                                    <label for="rf">Date of return</label>
                                                    <div class='input-group date'>
                                                        <input type="text" class="form-control" data-control="datepicker">
                                                        <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>

                                                </div>

                                                <div class="col-md-4">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                           <label>Vehicle</label>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="">
                                                               <div class="styled-checkbox">
                                                                    <input class="checkbox" type="checkbox" id="ch2"><label for="ch2">Yes</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <select name="" id="rf" class="selectpicker form-control fit-width">
                                                        <option value="">Car</option>
                                                        <option value="">Truck</option>
                                                        <option value="">Motorcycle</option>
                                                    </select>
                                                </div>

                                            </div>

                                            <div class="text-center submit-btn-container">

                                                <input type="submit" class="btn btn-danger" value="CHECK AVALIABILITY">

                                            </div>
                                        </form>
                                    </div>

                                    <div class="tab-pane" id="main-search-form_panel_tourist-package">
                                        <form class="main-search-form_form_form">
                                            <div class="row">

                                                <div class="col-md-4">
                                                    <label for="rf">Route from</label>
                                                    <select name="" id="rf" data-control="selectpicker" class="selectpicker form-control fit-width">
                                                        <option value="">Aqaba</option>
                                                        <option value="">Taba</option>
                                                        <option value="">Sharm El-Sheikh</option>
                                                    </select>

                                                </div>

                                                <div class="col-md-4">
                                                    <label for="rf">Route to</label>
                                                    <select name="" id="rt" data-control="selectpicker" class="selectpicker form-control fit-width">
                                                        <option value="">Aqaba</option>
                                                        <option value="">Taba</option>
                                                        <option value="">Sharm El-Sheikh</option>
                                                    </select>

                                                </div>

                                                <div class="col-md-4">
                                                    <div class="row">

                                                        <div class="col-md-4 form-group">
                                                            <label for="rf">Adults</label>
                                                            <input type="text" class="form-control" data-control="spinner-vertical" />
                                                        </div>

                                                        <div class="col-md-4 form-group">
                                                            <label for="rf">2-6 yr</label>
                                                            <input type="text" class="form-control" data-control="spinner-vertical" />
                                                        </div>

                                                        <div class="col-md-4 form-group">
                                                            <label for="rf">&lt;2 yr</label>
                                                            <input type="text" class="form-control" data-control="spinner-vertical" />
                                                        </div>

                                                    </div>


                                                </div>

                                            </div>

                                            <div class="row">

                                                <div class="col-md-4 form-group">
                                                    <label for="rf">Date of departure</label>
                                                    <div class='input-group date'>
                                                        <input type="text" class="form-control" data-control="datepicker">
                                                        <span class="input-group-addon">
                                                            <span class="glyphicon glyphicon-calendar"></span>
                                                        </span>
                                                    </div>

                                                </div>


                                                <div class="col-md-4">
                                                    <div class="col-md-6">
                                                        <label>&nbsp;</label>
                                                        <div class="">
                                                           <div class="styled-checkbox">
                                                                <input class="checkbox" type="checkbox" id="ch3"><label for="ch3">Any date</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="text-center submit-btn-container">

                                                <input type="submit" class="btn btn-danger" value="CHECK AVALIABILITY">

                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="main-content" role="content">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2>Why to Book Online</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="large-icon ico_click">

                    </div>
                    <h3>Easy</h3>
                    <p>
                        Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
                    </p>
                </div>
                <div class="col-md-4">
                    <div class="large-icon ico_time">

                    </div>
                    <h3>Fast</h3>
                    <p>
                        Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
                    </p>
                </div>
                <div class="col-md-4">
                    <div class="large-icon ico_key">
                    </div>
                    <h3>Secure</h3>
                    <p>
                        Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
                    </p>
                </div>
            </div>
            <section class="how-we-work">
				<div class="row">
					<div class="col-md-12">
						<h2 class="h1 text-center">How we work</h2>
					</div>
				</div>
				<div class="row hww-graphics" id="hww-graphics">
					<div class="hww-graphics_bar">
						<div id="hww-graphics_progress" class="hww-graphics_progress skrollable skrollable-between" data--400-bottom-top="width:0%" data-300-top-top="width:100%"></div>
					</div>
					<div class="col-md-3 hww-graphics_item">
						<div class="hww-graphics_icon ico_pen"></div>
						<p>Fill the form above and check your price and options</p>
					</div>
					<div class="col-md-3 hww-graphics_item">
						<div class="hww-graphics_icon ico_card-usd"></div>
						<p>Enter your personal information and reserve a ticket</p>
					</div>    
					<div class="col-md-3 hww-graphics_item">
						<div class="hww-graphics_icon ico_attachment"></div>
						<p>Get your ticket on the next day by email and in your personal account on the site</p>
					</div>
					<div class="col-md-3 hww-graphics_item">
						<div class="hww-graphics_icon ico_doc"></div>
						<p>Print it and use it! (most our tickets are open-date for 3 months)</p>
					</div>
				</div>
			</section>
        </div>

        <div class="section-full-width section-partners">
            <div class="container">
                <div class="row">
                    <div class="col-md-10 col-md-push-1">
                        <div class="slogan">
                            <div class="line-1">We are the partners of AB Maritime —</div>
                            <div class="line-2">best maritime carrier in the red sea region and beyond</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section-full-width section-map">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-md-pull-1">
                        <div class="slogan">
                            <div class="line-1">Connecting</div>
                            <div class="line-2">Arab Asia and Arab Africa together</div>
                            <div class="line-3">See our <a href="">Routes</a> and <a href="">Schedule</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2>Check our Tourist Packages</h2>
                </div>
                <div class="col-md-6 col-md-push-3">
                    <p>
                        Enjoy your vacation and we will take care of everything else. Our pre-built Tourist Packages include tickets, hotel and tours. And even something more.
                    </p>
                </div>
            </div>
            <div class="tourist-packages-list">
                <div class="row">
                    <div class="col-md-3">
                        <div class="catalog-item clearfix">
                            <a class="wrap wow fadeInUp link-internal" data-wow-delay="2.6s" href="tour.html">
                                <div class="catalog-item__pic">
                                    <img src="pics/5043375002_7c77d4cc70_z.jpg" alt="">
                                </div>
                                <div class="meta clearfix">
                                    <div class="catalog-item__body col">
                                        <h3 class="title">Your perfect trip to Marriott Cairo hotel Luxury as it is...</h3>
                                    </div>
                                    <div class="catalog-item__footer col">
                                        <div class="label">from</div>
                                        <div class="price">2 000 <span class="currency">$</span></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="catalog-item clearfix">
                            <a class="wrap wow fadeInUp link-internal" data-wow-delay="2.6s" href="tour.html">
                                <div class="catalog-item__pic">
                                    <img src="pics/88178551_85b5513de2_z.jpg" alt="">
                                </div>
                                <div class="meta clearfix">
                                    <div class="catalog-item__body col">
                                        <h3 class="title">Best diving in Aqaba
                                    for the best price!</h3>
                                    </div>
                                    <div class="catalog-item__footer col">
                                        <div class="label">from</div>
                                        <div class="price">600 <span class="currency">$</span></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="catalog-item clearfix">
                            <a class="wrap wow fadeInUp link-internal" data-wow-delay="2.6s" href="tour.html">
                                <div class="catalog-item__pic">
                                    <img src="pics/15533893043_7b9c74815f_z.jpg" alt="">
                                </div>
                                <div class="meta clearfix">
                                    <div class="catalog-item__body col">
                                        <h3 class="title">Tour for two to
                                    Sharm El-Sheikh</h3>
                                    </div>
                                    <div class="catalog-item__footer col">
                                        <div class="label">from</div>
                                        <div class="price">1200 <span class="currency">$</span></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="catalog-item clearfix">
                            <a class="wrap wow fadeInUp link-internal" data-wow-delay="2.6s" href="tour.html">
                                <div class="catalog-item__pic">
                                    <img src="pics/2216756909_4d46dac5f6_z.jpg" alt="">
                                </div>
                                <div class="meta clearfix">
                                    <div class="catalog-item__body col">
                                        <h3 class="title">Beaches of Egypt</h3>
                                    </div>
                                    <div class="catalog-item__footer col">
                                        <div class="label">from</div>
                                        <div class="price">1200 <span class="currency">$</span></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="main-footer">
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

                    <form role="form" class="contact-form dark-form">
                        <p class="footer-title">Ask us a question</p>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="exampleInputEmail1" />
                                    <label for="exampleInputEmail1">
                                        Name
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="email" class="form-control" id="exampleInputPassword1" />
                                    <label for="exampleInput">
                                        Email
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <textarea name="" class="form-control" id="" cols="30" rows="3"></textarea>
                                    <label for="exampleInput">
                                        Message
                                    </label>
                                </div>
                            </div>
                        </div>


                        <button type="submit" class="btn btn-default">
                            Submit
                        </button>
                    </form>
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
    </div>
