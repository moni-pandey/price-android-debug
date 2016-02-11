				$(document).ready(function() {

					console.log('doc ready');
					localStorage.setItem('productid', ' ');
					$(".bottom-search-bg").hide();
					var userdata = loginMethods.getUserInfo();
					var category = ''
					categoryitemclicked = false
					var pk = '';
					page_no = 1;
					$body = $("body");
					cat = ""
					type = ''
					color = ''
					hasnext = false
						//to position popup(left/right)
					index = ''

					var userdata = loginMethods.getUserInfo();

					if (localStorage.getItem('backbuttonpressed') == 'true') {
						localStorage.setItem('backbuttonpressed', 'false');
						cat = localStorage.getItem('productcat');
						console.log(localStorage.getItem('productcat'));
						page = localStorage.getItem('page');
						console.log(localStorage.getItem('page'));
						type = localStorage.getItem('type');
						console.log(localStorage.getItem('type'));
						color = localStorage.getItem('color');
						console.log(localStorage.getItem('color'));
						if (color) {
							console.log('localStorage.getItem()');
							//make ajax color based on color filter
							//loadprofcolr();
						} else
							console.log('lodng');
						//without color filter
						makeAjaxcall();

					}

					if (userdata.fbGender == 'female') {
						cat = "";
						//cat = 'bags';
						type = 'female'
							//ajax call without color filter
						makeAjaxcall();

					} else {
						cat = "";
						type = 'male'
						makeAjaxcall();
					}



					//for hiding search-bar
					/*$(window).scroll({
							previousTop: 0
						},
						function() {
							console.log('scrolled');

							var currentTop = $(window).scrollTop();
							if (currentTop == '0') {
								$(".bottom-search-bg").hide();
							} else {
								$(".bottom-search-bg").show();
							}
							this.previousTop = currentTop;

							if ($(window).scrollTop() + $(window).height() == $(document).height()) {
								//alert("bottom!");
								//if(hasnext)
								  loadmore();
								// else 
								  //alert('No more products available'); 					 
							}

						});*/

					$(window).on('scroll load', function() { // adding load event to handle it in case of default scroll done on page load
						var scrolled = $(this).scrollTop(),
							docHeight = $(document).height(),
							windHeight = $(this).height();
						var scrollPercent = ((scrolled / (docHeight - windHeight)) * 100).toFixed(2);
						if (scrollPercent >= 50) {
							if (hasnext)
								loadmore();
							else
								console.log('No more products available');
						}
					});

					 //disabling scroll for color pickr
				/*	 $(document).on('click' ,'#colorDropdown' ,function(){
					    if($(this).target.hasClass('open'))
						 	{$('body').addClass('noscroll')
							console.log('addclass')}
					  else
					  {$('body').removeClass('noscroll');
					  console.log('removelass')
					  }
					 
					 });
					 */

					//View Item Details event
					$(document).on('click', '.items', function(e) {
						mixpanel.track("view_item_details", {
							"id": '123'
						});

						console.log(e.target.id);
						index = $(this).attr("alt");

						var var1 = jQuery(this).data('target');
						jQuery(var1).modal('show');


					});
					//preview event
					$(document).on('click', '.items', function() {
						localStorage.viewProduct = $(this).attr("id"); // Store the id/pk value for viewing the product
						mixpanel.track("preview", {
							"id": '1234'
						});

					});

					//color--picker
					$(document).on('click', '.border-colorpicker div', function(e) {

						var id = e.target.id;
						if (id == 'c19' || id == 'c20')
							color = 'red'
						else if (id == 'c1' || id == 'c2' || id == 'c3')
							color = 'orange'
						else if (id == 'c17')
							color = 'pink,blue'
						else if (id == 'c10' || id == 'c11' || id == 'c12' || id == 'c13' || id == 'c14' || id == 'c15' || id == 'c16')
							color = 'blue'
						else
							console.log('not at backend');

						callforcolorfilter();

					});
					//add to cart 
					$(document).on('click', '.app-logo-in-popup', function() {
					cat=""
					 $('.add-items').html('');
						makeAjaxcall() 
				

					});
                       $(document).on('click', '.add-to-cart', function() {
						mixpanel.track("add_to_cart", {
							"id": '12345'
						});

					});

					//remove from cart 
					$(document).on('click', '.remove', function() {
						mixpanel.track("remove_from_cart", {
							"id": '123remove'
						});
					});
					//filter by category
					/*$(".scrollable-menu-filter li:not(:first-child)").click(function(){
					alert('hello');
					   mixpanel.track("filter_by_category", {
					  "id": '123category'
					});
					});*/


					//display on basis of category 

					$(".dropdown-menu").on("click", "li", function(event) {
						console.log(event.target.id)
						var id = event.target.id;


						categoryitemclicked = true
						page_no = 1;
						if (userdata.fbGender == 'female') {
							type = 'female'
							if (id == 'clothingimg') {
								cat = 'clothing'
								console.log(cat);
								$('#clothingimg').attr('src', './assets/img/dress-gray.png');
								$('#sunglassimg').attr('src', './assets/img/Glass.png');
								$('#necklaceimg').attr('src', './assets/img/ring.png');
								$('#purseimg').attr('src', './assets/img/Bag.png');
								$('#sandleimg').attr('src', './assets/img/sandal.png');
								$('#perfectimg').attr('src', './assets/img/Watch.png');
								$('#alltext').attr('color', 'black');

							} else if (id == 'sunglassimg') {
								cat = 'sunglasses'
								console.log(cat);
								$('#sunglassimg').attr('src', './assets/img/Glass-gray.png');
								$('#clothingimg').attr('src', './assets/img/dress.png');

								$('#necklaceimg').attr('src', './assets/img/ring.png');
								$('#purseimg').attr('src', './assets/img/Bag.png');
								$('#sandleimg').attr('src', './assets/img/sandal.png');
								$('#perfectimg').attr('src', './assets/img/Watch.png');
								$('#alltext').attr('color', 'black');
							} else if (id == 'necklaceimg') {
								cat = 'jewelry'
								console.log(cat);
								$('#necklaceimg').attr('src', './assets/img/ring-gray.png');
								$('#sunglassimg').attr('src', './assets/img/Glass.png');
								$('#clothingimg').attr('src', './assets/img/dress.png');


								$('#purseimg').attr('src', './assets/img/Bag.png');
								$('#sandleimg').attr('src', './assets/img/sandal.png');
								$('#perfectimg').attr('src', './assets/img/Watch.png');
								$('#alltext').attr('color', 'black');

							} else if (id == 'purseimg') {
								cat = 'bags'
								console.log(cat);
								$('#purseimg').attr('src', './assets/img/Bag-gray.png');
								$('#necklaceimg').attr('src', './assets/img/ring.png');
								$('#sunglassimg').attr('src', './assets/img/Glass.png');
								$('#clothingimg').attr('src', './assets/img/dress.png');

								$('#sandleimg').attr('src', './assets/img/sandal.png');
								$('#perfectimg').attr('src', './assets/img/Watch.png');
								$('#alltext').attr('color', 'black');
							} else if (id == 'sandleimg') {
								cat = 'shoes'
								console.log(cat);
								$('#sandleimg').attr('src', './assets/img/sandal-gray.png');
								$('#purseimg').attr('src', './assets/img/Bag.png');
								$('#necklaceimg').attr('src', './assets/img/ring.png');
								$('#sunglassimg').attr('src', './assets/img/Glass.png');
								$('#clothingimg').attr('src', './assets/img/dress.png');
								$('#perfectimg').attr('src', './assets/img/Watch.png');
								$('#alltext').attr('color', 'black');
							} else if (id == 'alltext') {
								cat = "";

								$('#alltext').attr('color', '#d8d8d8');
								$('#perfectimg').attr('src', './assets/img/Watch.png');
								$('#sandleimg').attr('src', './assets/img/sandal.png');
								$('#purseimg').attr('src', './assets/img/Bag.png');
								$('#necklaceimg').attr('src', './assets/img/ring.png');
								$('#sunglassimg').attr('src', './assets/img/Glass.png');
								$('#clothingimg').attr('src', './assets/img/dress.png');



							} else {
								cat = "watches";
								console.log(cat);
								$('#perfectimg').attr('src', './assets/img/Watch-gray.png');
								$('#sandleimg').attr('src', './assets/img/sandal.png');
								$('#purseimg').attr('src', './assets/img/Bag.png');
								$('#necklaceimg').attr('src', './assets/img/ring.png');
								$('#sunglassimg').attr('src', './assets/img/Glass.png');
								$('#clothingimg').attr('src', './assets/img/dress.png');
								$('#alltext').attr('color', 'black');

							}
						} else {
							type = 'male'
								//alert('else')
							if (id == 'clothingimg') {
								cat = 'clothing'
								console.log(cat);
								$('#clothingimg').attr('src', './assets/img/Shirt_gray.png');
								$('#watchimg').attr('src', './assets/img/Watch_Black.png');
								$('#gadgetimg').attr('src', './assets/img/headphone_black.png');
								$('#cycleimg').attr('src', './assets/img/tent_black.png');
								$('#sunglassimg').attr('src', './assets/img/Glass.png');
								$('#shoesimg').attr('src', './assets/img/shoes_black.png');
								$('#maleall').attr('color', 'black');
							} else if (id == 'watchimg') {
								cat = 'watches'
								console.log(cat);
								$('#watchimg').attr('src', './assets/img/watch_gray.png');
								$('#clothingimg').attr('src', './assets/img/Shirt_Black.png');
								$('#shoesimg').attr('src', './assets/img/shoes_black.png');
								$('#gadgetimg').attr('src', './assets/img/headphone_black.png');
								$('#cycleimg').attr('src', './assets/img/tent_black.png');
								$('#sunglassimg').attr('src', './assets/img/Glass.png');
								$('#maleall').attr('color', 'black');
							} else if (id == 'gadgetimg') {
								cat = 'electronics'
								console.log(cat);
								$('#shoesimg').attr('src', './assets/img/shoes_black.png');
								$('#gadgetimg').attr('src', './assets/img/headphone_gray.png');
								$('#clothingimg').attr('src', './assets/img/Shirt_Black.png');
								$('#watchimg').attr('src', './assets/img/Watch_Black.png');
								$('#gadgetimg').attr('src', './assets/img/headphone_black.png');
								$('#cycleimg').attr('src', './assets/img/tent_black.png');
								$('#sunglassimg').attr('src', './assets/img/Glass.png');
								$('#maleall').attr('color', 'black');

							} else if (id == 'cycleimg') {
								cat = 'outdoogear'
								console.log(cat);
								$('#shoesimg').attr('src', './assets/img/shoes_black.png');
								$('#cycleimg').attr('src', './assets/img/tent_gray.png');
								$('#clothingimg').attr('src', './assets/img/Shirt_Black.png');
								$('#watchimg').attr('src', './assets/img/Watch_Black.png');
								$('#gadgetimg').attr('src', './assets/img/headphone_black.png');

								$('#sunglassimg').attr('src', './assets/img/Glass.png');
								$('#maleall').attr('color', 'black');
							} else if (id == 'shoesimg') {
								cat = 'sneakers'
								console.log(cat);
								$('#shoesimg').attr('src', './assets/img/Shoes-gray.png');
								$('#clothingimg').attr('src', './assets/img/Shirt_Black.png');
								$('#watchimg').attr('src', './assets/img/Watch_Black.png');
								$('#gadgetimg').attr('src', './assets/img/headphone_black.png');
								$('#cycleimg').attr('src', './assets/img/tent_black.png');
								$('#sunglassimg').attr('src', './assets/img/Glass.png');
								$('#maleall').attr('color', 'black');
							} else if (id == 'maleall') {

								cat = "";
								$('#shoesimg').attr('src', './assets/img/shoes_black.png');
								$('#maleall').attr('color', '#d8d8d8');
								$('#sunglassimg').attr('src', './assets/img/Glass.png');
								$('#clothingimg').attr('src', './assets/img/Shirt_Black.png');
								$('#watchimg').attr('src', './assets/img/Watch_Black.png');
								$('#gadgetimg').attr('src', './assets/img/headphone_black.png');
								$('#cycleimg').attr('src', './assets/img/tent_black.png');

							} else if (id == 'sunglassimg') {
								cat = 'sunglasses';
								console.log(cat);
								$('#maleall').attr('color', 'black');
								$('#sunglassimg').attr('src', './assets/img/Glass.png');
								$('#clothingimg').attr('src', './assets/img/Shirt_Black.png');
								$('#watchimg').attr('src', './assets/img/Watch_Black.png');
								$('#gadgetimg').attr('src', './assets/img/headphone_black.png');
								$('#cycleimg').attr('src', './assets/img/tent_black.png');
								$('#shoesimg').attr('src', './assets/img/shoes_black.png');

							} else
								console.log('cat not found');



						}
						$.ajax({
							type: 'GET',
							url: "http://staging12.getpriceapp.com/item/list/",
							beforeSend: function() {
								console.log('ajaxstart');
								$body.addClass("loading");
							},
							complete: function() {
								//alert('ajaxstopp')
								$body.removeClass("loading");

							},
							contentType: "application/json",
							dataType: "json",
							data: {
								"category": cat,
								"page": page_no,
								"show_by": 10,
								'type': type

							},
							success: function(data) {
								//alert(JSON.stringify(data));

								console.log('insidesucees');
								var getitemdata = JSON.stringify(data);
								console.log(JSON.stringify(data));
								localStorage.setItem('itemdata', '');
								localStorage.setItem('itemdata', getitemdata);
								var parsedata = JSON.parse(localStorage.getItem('itemdata'));
								console.log(JSON.stringify(parsedata[0].paginator))
								console.log('329')
								if (parsedata[0].paginator.has_next)
									hasnext = true;

								if (parsedata[0].products.length) {
									console.log('calling load prof from windows ');
									loadprof("false")
								} else {
									$('.add-items').html('');
									mwidth = $(window).width();
									mheight = $('body').height()

									//$('.add-items').css({"height":mheight });
									//$('.add-items').css({"width":mwidth });
									$('.add-items').append('<div class="jumbotron">\
		<h1>No Data Available</h1> </div>')


								}

							},

							error: function(xhr, status, error) {
								console.log(xhr);
							}


						}); //end of ajax call 






					});
				});

				function getProductDetails(productId) {
					// To get the selected product detail

				}

				function setSelectedProduct(selectedPro) {
					var selectedProId = $(selectedPro).attr("id");
					var carId=$(selectedPro).data("carid");
					$.ajax({
						type: 'GET',
						url: 'http://staging12.getpriceapp.com/item-details/' + selectedProId + '/',
						beforeSend: function() {

							$body.addClass("loading");
						},
						complete: function() {

							$body.removeClass("loading");
						},
						contentType: "application/json",
						dataType: "json",
						data: {

						},
						success: function(data) {

							var getitemdetails = JSON.stringify(data);
							localStorage.selectedProDetails = getitemdetails;
							var productDetail = localStorage.selectedProDetails;
							
								var imageArray =new Array(5);
							console.log(selectedProId);
						  
							var plength = data.photo_set.length
							console.log(plength);
							var productImages = data.photo_set;
							
							if(plength==5)
								{
								 imageArray[0] =productImages[0].url_small
								 imageArray[1] =productImages[1].url_small
								 imageArray[2] =productImages[2].url_small
								 imageArray[3] =productImages[3].url_small
								 imageArray[4] =productImages[4].url_small
								}
								else if(plength==4)
								{
								 imageArray[0] =productImages[0].url_small
								 imageArray[1] =productImages[1].url_small
								 imageArray[2] =productImages[2].url_small
								 imageArray[3] =productImages[3].url_small
								 imageArray[4] =productImages[1].url_small
								
								}else if(plength==3){
								 imageArray[0] =productImages[0].url_small
								 imageArray[1] =productImages[1].url_small
								 imageArray[2] =productImages[2].url_small
								 imageArray[3] =productImages[0].url_small
								 imageArray[4] =productImages[1].url_small
								}
								else if(plength==2){
								 imageArray[0] =productImages[0].url_small
								 imageArray[1] =productImages[1].url_small
								 imageArray[2] =productImages[0].url_small
								 imageArray[3] =productImages[1].url_small
								 imageArray[4] =productImages[0].url_small
								}
								else if(plength==1){
								 imageArray[0] =productImages[0].url_small
								 imageArray[1] =productImages[0].url_small
								 imageArray[2] =productImages[0].url_small
								 imageArray[3] =productImages[0].url_small
								 imageArray[4] =productImages[0].url_small
								}
								else {
								 imageArray[0] ="./assets/img/no_img.png"
								 imageArray[1] ="./assets/img/no_img.png"
								 imageArray[2] ="./assets/img/no_img.png"
								 imageArray[3] ="./assets/img/no_img.png"
								 imageArray[4] ="./assets/img/no_img.png"
								
								}
							console.log(imageArray[0]);
							console.log(imageArray[1]);
							console.log(imageArray[2]);
							console.log(imageArray[3]);
							console.log(imageArray[4]);
							$("#"+carId).find("img.carimage").each(function(i, e) {
							
								console.log(i);
								
								if (typeof imageArray[i] !== undefined) {
									$(e).attr('src', imageArray[i])
								}
								
								
							});
							
							   $("#"+carId).find("img.carimage").each(function(i, e) {
							
								console.log(i);
								
								
								   console.log( $(e).attr('src'));			                
								
								
							});
							//$("#"+carId).modal();
							//$("#"+carId).modal("show");
							//alert(getitemdetails);
							/*localStorage.setItem('itemdetails', '');
							localStorage.setItem('itemdetails', getitemdetails);
							var parsedetails = JSON.parse(localStorage.getItem('itemdetails'));*/
							//alert(parsedetails);
							//setting   product detauils UI
						},

						error: function(xhr, status, error) {
							console.log(xhr.responseText);
							//alert(xhr.status);	
						}


					}); //end of ajax call
				}

				function loadprof(clear) {
					var parsedata = JSON.parse(localStorage.getItem('itemdata'));
					//  alert(JSON.stringify(parsedata));
					console.log(clear);
					if (clear == "true") {
						console.warn("Clearing product list");
						$('.add-items').html(' '); // if clear==true empty the products list(To avoid problems with Load more have used it)
					}
					if (categoryitemclicked) {
						$('.add-items').html(' ');
						categoryitemclicked = false;
					}

					for (i = 0; i < parsedata[0].products.length; i += 2) {

						var img10, img11
						console.log("i:" + i);

						//price animation 
						if (parsedata[0].products[i].fields.price_sold != null && Math.floor(parsedata[0].products[i].fields.price_sold) != parsedata[0].products[i].fields.price_sold) { //console.log(parsedata[0].products[i].fields.price);
							//var substr = parsedata[0].products[i].fields.price.split('.');
							parsedata[0].products[i].fields.price_sold = Math.floor(parsedata[0].products[i].fields.price_sold)
						} else
							parsedata[0].products[i].fields.price_sold = 000


						if (parsedata[0].products[i + 1].fields.price_sold != null && Math.floor(parsedata[0].products[i + 1].fields.price_sold) != parsedata[0].products[i + 1].fields.price_sold) {
							//var substr = parsedata[0].products[i+1].fields.price.split('.');
							parsedata[0].products[i + 1].fields.price_sold = Math.floor(parsedata[0].products[i + 1].fields.price_sold)
						} else
							parsedata[0].products[i + 1].fields.price_sold = 000

							 console.log(parsedata[0].products[i].fields.id)
						if (parsedata[0].products[i].fields.photo_set.length)
							img10 = parsedata[0].products[i].fields.photo_set[0].url_medium
						else {
							console.log('else')
							console.log(parsedata[0].products[i].fields.id)
							img10 = "./assets/img/no_img.png"
						}
						console.log(parsedata[0].products[i + 1].fields.id)
						if (parsedata[0].products[i + 1].fields.photo_set.length)
							img11 = parsedata[0].products[i + 1].fields.photo_set[0].url_medium
						else {
							console.log('else')
							console.log(parsedata[0].products[i + 1].fields.id)
							img11 = "./assets/img/no_img.png";

						}

						//checking for long text
						if (parsedata[0].products[i].fields.description != null && parsedata[0].products[i].fields.description.length > 10) {
							var shorttext = trimLong(parsedata[0].products[i].fields.description);
							parsedata[0].products[i].fields.description = shorttext;
						}




						if (parsedata[0].products[i].fields.brand != null && parsedata[0].products[i].fields.brand.length > 10) {
							var shorttext = trimLong(parsedata[0].products[i].fields.brand);
							parsedata[0].products[i].fields.brand = shorttext;
						}

						if (parsedata[0].products[i + 1].fields.description != null && parsedata[0].products[i + 1].fields.description.length > 15) {
							var shorttext = trimLong(parsedata[0].products[i].fields.description);
							parsedata[0].products[i + 1].fields.description = shorttext;
						}
						if (parsedata[0].products[i].fields.description != null && parsedata[0].products[i].fields.description.length > 15) {
							var shorttext = trimLong(parsedata[0].products[i].fields.description);
							parsedata[0].products[i].fields.description = shorttext;
						}

						if (parsedata[0].products[i + 1].fields.brand != null && parsedata[0].products[i + 1].fields.brand.length > 10) {
							var shorttext = trimLong(parsedata[0].products[i].fields.brand);
							parsedata[0].products[i + 1].fields.brand = shorttext;
						}






						var v = i + 1
							// if (parsedata[0].products[i].fields.price != null) {} else parsedata[0].products[i].fields.price = 'N/A'

						if (parsedata[0].products[i].fields.brand) {} else parsedata[0].products[i].fields.brand = 'N/A'
						if (parsedata[0].products[i + 1].fields.brand) {} else parsedata[0].products[i + 1].fields.brand = 'N/A'
						if (parsedata[0].products[i].fields.description) {} else parsedata[0].products[i].fields.description = 'N/A'
						if (parsedata[0].products[i + 1].fields.description) {} else parsedata[0].products[+1].fields.description = 'N/A'



						//modal code for loadpfrof
						$('.add-items').append('<div class="row ">\
							<div class="col-xs-6 right-padding ">\
								<img src="' + img10 + '" class="img-responsive items" data-carid="myModal'+i+'" onclick="setSelectedProduct(this)" id="' + parsedata[0].products[i].fields.id + '" alt=' + i + ' data-toggle="" data-target="#myModal' + i + '">\
							<p class=""></p>' + getModalHTML(i, parsedata[0].products[i], img10) +
							'<div class="row border-outline">\
									<div class="col-xs-12 pic" >\
										<p ><img src="./assets/img/like.png">' + parsedata[0].products[i].fields.brand + '\
											<br> <span>' + parsedata[0].products[i].fields.description + '</span></p>\
									</div>\
								</div>\
							</div>\
							<div class="col-xs-6 left-padding ">\
							<img src="' + img11 + '" class="img-responsive items" data-carid="myModal'+i + "" + 1+'" onclick="setSelectedProduct(this)" id="' + parsedata[0].products[i + 1].fields.id + '"  alt=' + v + ' data-toggle="" data-target="#myModal' + i + 1 + '">\
						<p class=""></p>' + getModalHTML(i + "" + 1, parsedata[0].products[i + 1], img11) +
							'<div class="row border-outline">\
								<div class="row border-outline">\
									<div class="col-xs-12 pic" >\
										<p ><img src="./assets/img/like.png">' + parsedata[0].products[i + 1].fields.brand + '\
											<br> <span>' + parsedata[0].products[i + 1].fields.description + '</span></p>\
									</div>\
								</div>\
							</div>\
						</div>');





					}
				}

				/*$(".modalview").on('shown.bs.modal', function(event) {
					alert("Showed:"+$(this).attr("id"));
				});*/

				function getModalHTML(uniqueId, product, imgUrl) {

					console.warn(product);
					/*$.ajax({
								type: 'GET',
								url: 'http://staging12.getpriceapp.com/item-details/' + pk + '/',
								beforeSend: function() {

									$body.addClass("loading");
								},
								complete: function() {

									$body.removeClass("loading");
								},
								contentType: "application/json",
								dataType: "json",
								data: {

								}*/
					return '<div class="modal modalview" id="myModal' + uniqueId + '" role="dialog">\
							<div class="modal-dialog modal-sm">\
								<div class="modal-content  ">\
									<div class="modal-body">\
										<img src="./assets/img/pop-up-close.png" class="pop-up-close-icon " onclick="$(\'#myModal' + uniqueId +'\').modal(\'hide\')">\
										<div id="myCarousel' + uniqueId + '" class="carousel slide" data-ride="carousel">\
											<ol class="carousel-indicators top-margin-indicators">\
												<li data-target="#myCarousel' + uniqueId + '" data-slide-to="0" class="active"></li>\
												<li data-target="#myCarousel' + uniqueId + '" data-slide-to="1"></li>\
												<li data-target="#myCarousel' + uniqueId + '" data-slide-to="2"></li>\
												<li data-target="#myCarousel' + uniqueId + '" data-slide-to="3"></li>\
											</ol>\
	\
											<div class="carousel-inner" role="listbox">\
												<div class="item active">\
													<div class="row">\
														<div class="col-md-12" >\
															<a class="thumbnail" href="#"><img id="img1myModal' + uniqueId + '" src="' + imgUrl + '"  class="slider-img carimage"></a>\
														</div>\
													</div>\
												</div>\
												<div class="item">\
													<div class="row">\
														<div class="col-md-12">\
															<a class="thumbnail" href="#"><img id="img2myModal' + uniqueId + '" src="./assets/img/email-Signup_bk.png" class="slider-img carimage"></a>\
														</div>\
													</div>\
												</div>\
												<div class="item">\
													<div class="row">\
														<div class="col-md-12">\
															<a class="thumbnail" href="#"><img id="img3myModal' + uniqueId + '" src="./assets/img/favourite-img.png" class="slider-img carimage"></a>\
														</div>\
													</div>\
												</div>\
												<div class="item">\
													<div class="row">\
														<div class="col-md-12">\
															<a class="thumbnail" href="#"><img id="img4myModal' + uniqueId + '" src="./assets/img/price.png" class="slider-img carimage"></a>\
														</div>\
													</div>\
												</div>\
											</div>\
											</div>\
										\
										<div class="row">\
											<div class="col-xs-12">\
												<p class="product-name-in-popup">' + product.fields.brand + '</p>\
											</div>\
										</div>\
						\
										<div class="row product-detail-top-margin-in-popup">\
											<div class="col-xs-3">\
												<p class="retail-text-in-popup">RETAIL </p>\
					                            <p class="retail-price-in-popup"><span>$</span><span class="retail_price_item">' + parseFloat(product.fields.price).toFixed(2) + '</span></p>\
				                        </div>\
				                        <div class="col-xs-6 ">\
				                            <p class="discounted-price-in-pop-up"><span>$</span><span class="odometer">' + parseFloat(product.fields.price_sold).toFixed(2) + '</span><span class="hidden hidden_real_price">' + parseFloat(product.fields.price_sold).toFixed(2) + '</span></p>\
											</div>\
											<div class="col-xs-3"> \
												<p class="saved-text-in-popup">SAVED </p>\
												<p class="saved-amount-in-popup">$' + parseFloat(product.fields.price - product.fields.price_sold).toFixed(2) + '</p>\
											</div>\
										</div>\
										\
										<div class="row" style="padding-right:10px; padding-left:10px">\
											<div class="col-xs-12" >\
												<button onclick="showPurchasePage(this)" class="btn btn-block buy-button-amazon" data-purchaseurl="' + product.fields.purchase_url + '" type="button">BUY <span>AMAZON.COM</span></button>\
											</div>\
										</div>\
					\
									</div>\
						\
								</div>\
							</div>\
						</div>';
				}

				function showPurchasePage(selectedProduct) {
					var url = $(selectedProduct).data("purchaseurl");
					console.log("url:" + url);
					if (url != "" || url !== null) {
						console.log($(selectedProduct).data("purchaseurl"));
						var browserOptions = {
							// Inappbrowser options for customization
							title: {
								//color: '#003264ff',
								staticText: 'Price'
							},
							closeButton: {
								wwwImage: 'img/back.jpg',
								imagePressed: 'close_pressed',
								align: 'left',
								event: 'closePressed'
							}
							/*,
													menu: {
														wwwImage: 'img/menu.png',
														//imagePressed: 'menu_pressed',
														title: 'Price Options',
														cancel: 'Cancel',
														align: 'right',
														items: [{
															event: 'takeMeHome',
															label: 'Back to home'
														}]
													}*/
							,
							backButtonCanClose: true

						};
						//var ref = cordova.InAppBrowser.open(url, '_blank', 'location=yes');
						var ref = cordova.ThemeableBrowser.open(url, '_blank', browserOptions);
						ref.addEventListener('loadstart', function(event) {
							//console.log("loadstart" + event.url);
						});
						ref.addEventListener('loadstop', function(event) {
							//console.log("loadstart" + event.url);
							if ((event.url).indexOf('http://www.amazon.com/gp/buy/thankyou') === 0) {
								setTimeout(function() {
									ref.close(); // close inappbrowser 3seconds after purchase
								}, 3000);

							}
						});


					}
				}
				//hide x before modal is shown
				$(document).on('show.bs.modal', function(e) {
					//$(e.target).find("img.pop-up-close-icon").hide();
					var modalContent = $(e.target).find(".modal-content");
					modalContent.css({
						"left": function() {
							return  $(e.target).parent().hasClass('left-padding')? "-15%":"15%";
						}
					});
					 //var blue = document.getElementById("blue");
				

					
	});
				

				//show x after modal is shown and then reposition it
				//hack because bootstrap and variable device size
				$(document).on('shown.bs.modal', function(e) {
					//alert(e.target.id);
					/*var productDetail= localStorage.selectedProDetails;
					debugger;
					var productImages = productDetail.photo_set;
					$(e.target).find("img.carimage").each(function(i,e){
						if(typeof productImages[i] !== undefined){
							$(e).attr('src', productImages[i].url_small)	
						} 
					});*/
					
					var modalBody = $(e.target).find(".modal-body");
					var modalContent = $(e.target).find(".modal-content");
					var imagex = $(e.target).find("img.pop-up-close-icon");
					var modalPosition = modalBody.position();
					console.warn(modalPosition);

					imagex.css({
						"position": "absolute",
						"left": function() {
							if($(e.target).parent().hasClass('left-padding')) {
							return (35 + modalPosition.left + modalBody.width()) + "px"
							} else {
								return (modalPosition.left - 35) + "px"
							}
						},
						"top": function() {
							return (modalPosition.top) + "px"
						}
					});

					imagex.fadeIn("fast");
					console.log(index);
					
					//HAMMER CODE 
					
					//var modalc =$("#myCarousel"+index)
					var modalc = $(e.target).find(".carousel");
					var hammerobj = new Hammer(modalc[0]);
					modalc.carousel({
				      interval: 3000
				  });
					modalc.carousel('cycle');

					hammerobj.on('swipeleft', function(e){
						console.log("touch left");
						modalc.carousel('next'); 
					})
					hammerobj.on('swiperight', function(){
						console.log("touch right");
						modalc.carousel('prev'); 
					})

					console.log('setTimeout');
			    var el = e.target.querySelector('.odometer');
			    var retailNode = e.target.querySelector('.retail_price_item');
			    var realNode = e.target.querySelector('.hidden_real_price');

			    //var el = $(e.target).find(".odometer");
			    //debugger;
			    console.warn(retailNode);
			    console.warn(realNode);
			    var realValue = realNode.innerHTML;
			    var retailVal = retailNode.innerHTML;
			    console.warn(realValue);
			    console.warn(retailVal);


			    od = new Odometer({
			        el: el,
			        value: retailVal,
			        // Any option (other than auto and selector) can be passed in here
			        format: '(,ddd).dd',
			        theme: 'default'
			    });

			    //so it animates everytime
			    od.value = retailVal;

			    od.update(realValue);
				});

				function loadmore() {
					hasnext = false;
					page_no++;
					//alert(page_no);
					$.ajax({
						type: 'GET',
						url: "http://staging12.getpriceapp.com/item/list/",
						beforeSend: function() {
							console.log('ajaxstart');
							//$body.addClass("loading");
						},
						complete: function() {
							//alert('ajaxstopp')
							//$body.removeClass("loading");
							//$('.carousel').carousel({
							//	pause: 'true'
							//})
						},
						contentType: "application/json",
						dataType: "json",
						data: {
							"category": cat,
							page: page_no,
							"show_by": "10",
							'type': type
								//color : color

						},
						success: function(data) {

							console.log('insidesucees');
							var getitemdata = JSON.stringify(data);
							//alert(JSON.stringify(data));
							localStorage.setItem('itemdata', '');
							localStorage.setItem('itemdata', getitemdata);
							var parsedata = JSON.parse(localStorage.getItem('itemdata'));
							console.log('calling load 537 windows ');

							loadprof("false");
							console.log(JSON.stringify(parsedata[0].paginator))
							if (parsedata[0].paginator.has_next)
								hasnext = true;
						},

						error: function(xhr, status, error) {
							console.log(xhr);
						}


					}); //end of ajax call 



				}

				$("#colorSlider,#fColorSlider").on("slidestop", function(event, ui) {
					var colorRange = "All"
					if (ui.value > 0 && ui.value < 10)
						colorRange = "black";
					else if (ui.value > 10 && ui.value < 20)
						colorRange = "Grey";
					else if (ui.value > 20 && ui.value < 30)
						colorRange = "White";
					else if (ui.value > 20 && ui.value < 30)
						colorRange = "pink";
					else if (ui.value > 30 && ui.value < 40)
						colorRange = "blue";
					else if (ui.value > 30 && ui.value < 40)
						colorRange = "Violet";
					else if (ui.value > 40 && ui.value < 50)
						colorRange = "Green";
					else if (ui.value > 50 && ui.value < 60)
						colorRange = "almond";
					else if (ui.value > 60 && ui.value < 70)
						colorRange = "orange";
					else if (ui.value > 70 && ui.value < 80)
						colorRange = "gold";
					else if (ui.value > 80 && ui.value < 99)
						colorRange = "red";
					else if (ui.value == 0 || ui.value == 100)
						colorRange = "All";

					callforcolorfilter(colorRange);
				});

				function callforcolorfilter(color) {

					//alert('base on color ');
					$.ajax({
						type: 'GET',
						url: "http://staging12.getpriceapp.com/item/list/",
						beforeSend: function() {
							console.log('ajaxstart');
							$body.addClass("loading");
						},
						complete: function() {
							//alert('ajaxstopp')
							$body.removeClass("loading");
							$('.carousel').carousel({
								pause: 'true'
							})
						},
						contentType: "application/json",
						dataType: "json",
						data: {
							"category": cat,
							page: page_no,
							"show_by": "10",
							'type': type,
							"color": color

						},
						success: function(data) {


							var getitemdata = JSON.stringify(data);
							//alert(JSON.stringify(data));
							localStorage.setItem('itemdata', '');
							localStorage.setItem('itemdata', getitemdata);
							var parsedata = JSON.parse(localStorage.getItem('itemdata'));
							console.log('calling load prof from windows ');
							//loadprofcolr();
							loadprof("true");

							if (parsedata[0].paginator.has_next)
								hasnext = true;
						},

						error: function(xhr, status, error) {
							console.log(xhr);
						}


					}); //end of ajax call 



				}

				function makeAjaxcall() {
					$('.add-items').html('')
					$.ajax({
						type: 'GET',
						url: "http://staging12.getpriceapp.com/item/list/",
						beforeSend: function() {
							console.log('ajax start');
							$body.addClass("loading");
						},
						complete: function() {
							console.log('ajaxstop')
							$body.removeClass("loading");
						},
						contentType: "application/json",
						dataType: "json",
						data: {
							"category": cat,
							"page": page_no,
							"show_by": 10,
							type: type
								//"color" : color
						},
						success: function(data) {
							var getitemdata = JSON.stringify(data);
							localStorage.setItem('itemdata', '');
							localStorage.setItem('itemdata', getitemdata);
							var parsedata = JSON.parse(localStorage.getItem('itemdata'));
							//alert(parsedata[0].products.length);

							if (parsedata[0].products.length == 0) {
								$('.add-items').append('<div class="jumbotron">\
		<h1>No Data Available</h1> </div>')
							} else {
								console.log('category 641 sucees')

								console.log(JSON.stringify(data));


								loadprof("false");
							}
							console.log(JSON.stringify(parsedata[0].paginator))
							if (parsedata[0].paginator.has_next)
								hasnext = true;
						},

						error: function(xhr, status, error) {
							console.log(xhr);
						}


					}); //end of ajax call 


				}



				function loadprofcolr() {
					var parsedata = JSON.parse(localStorage.getItem('itemdata'));
					$('.add-items').html(' ');

					color = ''
						//var i1 =
						//alert(parsedata[0].fields.photo_set[0].url_medium)
					for (i = 0; i < parsedata[0].products.length; i += 2) {

						var img10, img11
						console.log("i:" + i);

						if (parsedata[0].products[i].fields.photo_set[0])
							img10 = parsedata[0].products[i].fields.photo_set[0].url_medium
						else {
							console.log('else')
							console.log(parsedata[0].products[i].fields.id)
							img10 = "./assets/img/no_img.png"
						}
						if (parsedata[0].products[i + 1].fields.photo_set[0])
							img11 = parsedata[0].products[i + 1].fields.photo_set[0].url_medium
						else {
							console.log('else')
							console.log(parsedata[0].products[i + 1].fields.id)
							img11 = "./assets/img/no_img.png";

						}

						if (parsedata[0].products[i].fields.price) {

						} else
							parsedata[0].products[i].fields.price = 'N/A'

						if (parsedata[0].products[i].fields.brand) {} else parsedata[0].products[i].fields.brand = 'N/A'

						if (parsedata[0].products[i + 1].fields.brand) {} else parsedata[0].products[i + 1].fields.brand = 'N/A'

						if (parsedata[0].products[i + 1].fields.price) {} else
							parsedata[0].products[i + 1].fields.price = 'N/A'

						if (parsedata[0].products[i + 1].fields.description) {} else
							parsedata[0].products[i + 1].fields.description = 'N/A'
						if (parsedata[0].products[i].fields.description) {} else
							parsedata[0].products[i].fields.description = 'N/A'

						$('.add-items').append('<div class="row ">\
							<div class="col-xs-6 right-padding ">\
							<img src="' + img10 + '" class="img-responsive items" id="' + parsedata[0].products[i].fields.id + '" data-toggle="modal" data-target="#myModal' + i + '">\
								<p class="item-price"></p>' + getModalHTML(i, parsedata[0].products[i], img10) + '<div class="row border-outline">\
							<div class="col-xs-12">\
								<p><img src="./assets/img/like.png">CHLO&Eacute <br> <span>DREW LEATHER BAG </span></p>\
							</div>\
						</div><div class="row border-outline">\
									<div class="col-xs-12 pic" >\
										<p ><img src="./assets/img/like.png">' + parsedata[0].products[i].fields.brand + '\
											<br> <span>' + parsedata[0].products[i].fields.description + '</span></p>\
									</div>\
								</div>\
							</div>\
							<div class="col-xs-6 left-padding ">\
							<img src="' + img11 + '" class="img-responsive items" id="' + parsedata[0].products[i + 1].fields.id + '" data-toggle="modal" data-target="#myModal' + i + 1 + '">\
								<p class="item-price"></p>' + getModalHTML(i + "" + 1, parsedata[0].products[i + 1], img11) + '<div class="row border-outline">\
							<div class="col-xs-12">\
								<p><img src="./assets/img/like.png">CHLO&Eacute <br> <span>DREW LEATHER BAG </span></p>\
							</div>\
								<div class="row border-outline">\
									<div class="col-xs-12 pic" >\
										<p ><img src="./assets/img/like.png">' + parsedata[0].products[i + 1].fields.brand + '\
											<br> <span>' + parsedata[0].products[i + 1].fields.description + '</span></p>\
									</div>\
								</div>\
							</div>\
						</div>');
					}



				}

				function trimLong(text) {
					var shortText = jQuery.trim(text).substring(0, 10)
						//.split(" ").slice(0, -1).join(" ");

					return shortText
				}
