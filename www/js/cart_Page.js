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
		cat = ''
		type = ''
		color=''
		var userdata = loginMethods.getUserInfo();
		if (userdata.fbGender == 'female') {
			cat = 'all';
			type='female'
		   makeAjaxcall();

		} else {
          cat = 'all';
			type='male'
		  makeAjaxcall();     
		}


		$(document).bind("deviceready", function() {
			document.addEventListener("backbutton", function() {
				console.log("Disabled Back button");
			});
		});

		//for hiding search-bar
		$(window).scroll({
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
					loadmore();
				}

			});

		//View Item Details event
		$(document).on('click', '.items', function(e) {
			mixpanel.track("view_item_details", {
				"id": '123'
			});
			console.log(e.target.id);
			localStorage.setItem('productid', ' ')
			localStorage.setItem('productid', e.target.id)


			window.location = 'product_Detail.html'

		});
		//preview event
		$(document).on('click', '.items', function() {
			mixpanel.track("preview", {
				"id": '1234'
			});

		});
		//add to cart 
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
			if (userdata.fbGender == 'female') {
				if (id == 'clothingimg') {
					cat = 'Women' + '\'s Clothing'
					console.log(category);
				} else if (id == 'sunglassimg') {
					cat = 'Women' + '\'s sunglass'
					console.log(category);
				} else if (id == 'necklaceimg') {
					cat = 'necklace'
					console.log(category);
				} else if (id == 'purseimg') {
					cat = 'purse'
					console.log(category);
				} else {
					cat = "The Perfect Present";
					console.log(category);
				}
			} else {
				//alert('else')
				if (id == 'clothingimg') {
					cat = 'men' + '\'s clothing'
					console.log(category);
				} else if (id == 'watchimg') {
					cat = 'men' + '\'s watch'
					console.log(category);
				} else if (id == 'gadgetimg') {
					cat = 'gadget'
					console.log(category);
				} else if (id == 'cycleimg') {
					cat = 'cycling'
					console.log(category);
				} else {
					cat = 'Men' + '\'s Sunglass';
					console.log(category);
				}



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
					$('.carousel').carousel({
						pause: 'true'
					})
				},
				contentType: "application/json",
				dataType: "json",
				data: {
					"category": cat,
					"page_no": '1',
					"show_by" :"10"

				},
				success: function(data) {

					if (data.error)
						alert(data.error);
					 console.log('insidesucees');
					var getitemdata = JSON.stringify(data);
					console.log(JSON.stringify(data));
					localStorage.setItem('itemdata', '');
					localStorage.setItem('itemdata', getitemdata);
					var parsedata = JSON.parse(localStorage.getItem('itemdata'));
					console.log('calling load prof from windows ');
					loadprof();


				},

				error: function(xhr, status, error) {
					console.log(xhr);
				}


			}); //end of ajax call 






		});
	});

	function loadprof() {
		var parsedata = JSON.parse(localStorage.getItem('itemdata'));
        //  alert(JSON.stringify(parsedata));
		if (categoryitemclicked) {
			$('.add-items').html(' ');
			categoryitemclicked = false;
		}
//alert(parsedata[0].fields.photo_set[0].url_medium)
		for (i = 0; i < parsedata.length; i += 2) {
			
			var img10, img11, img12, img13;
			var img20, img21, img22, img23;
			console.log("i:" + i);

			
			for(j=0;j<4;j++)
				{
				if(j==0) 
				   img10=parsedata[i].fields.photo_set[0].url_medium
				  else if(j==1) 
				   img11=parsedata[i].fields.photo_set[1].url_medium
				 else   if(j==2) 
				   img12=parsedata[i].fields.photo_set[2].url_medium
				  else
				   img13=parsedata[i].fields.photo_set[3].url_medium
				
				
				}
				
	  for(j=0;j<4;j++)
				{
				if(j==0) 
				   img20=parsedata[i+1].fields.photo_set[0].url_medium
				  else if(j==1) 
				   img21=parsedata[i+1].fields.photo_set[1].url_medium
				 else   if(j==2) 
				   img22=parsedata[i+1].fields.photo_set[2].url_medium
				  else
				   img23=parsedata[i+1].fields.photo_set[3].url_medium
				
				
				}


		   if (parsedata[i].fields.price) {
			  
			} else
				parsedata[i].fields.price = 'N/A'

			if (parsedata[i].fields.brand) {} else parsedata[i].fields.brand = 'N/A'

			if (parsedata[i + 1].fields.brand) {} else parsedata[i + 1].fields.brand = 'N/A'

			if (parsedata[i + 1].fields.price) {} else
				parsedata[i + 1].fields.price = 'N/A'

			if (parsedata[i + 1].fields.description) {} else
				parsedata[i + 1].fields.description = 'N/A'
			if (parsedata[i].fields.description) {} else
				parsedata[i].fields.description = 'N/A'
			/*if (parsedata[i].fields.photo_set) {
				for (var j = 0; j < 4; j++) {
					imgArray.push(parsedata[i].fields.photo_set[j].url_medium);
				}
				img10 = imgArray[0] || "./assets/img/bag.jpg";
				img11 = imgArray[1] || "./assets/img/bag.jpg";
				img12 = imgArray[2] || "./assets/img/bag.jpg";
				img13 = imgArray[3] || "./assets/img/bag.jpg";
				imgArray.length = 0;
			}
			
			if (parsedata[i + 1].fields.photo_set) {
				console.log()
				for (var j = 0; j < 4; j++) {
					imgArray.push(parsedata[i+1].fields.photo_set[j].url_medium)
				}
				img20 = imgArray[0] || "./assets/img/bag.jpg";
				img21 = imgArray[1] || "./assets/img/bag.jpg";
				img22 = imgArray[2] || "./assets/img/bag.jpg";
				img23 = imgArray[3] || "./assets/img/bag.jpg";
				imgArray.length = 0;
			}
			*/
			/*img10 = img10 || "./assets/img/bag.jpg";
			img11 = img11 || "./assets/img/bag.jpg";
			img12 = img12 || "./assets/img/bag.jpg";
			img13 = img13 || "./assets/img/bag.jpg";
			img20 = img20 || "./assets/img/bag.jpg";
			img21 = img21 || "./assets/img/bag.jpg";
			img22 = img22 || "./assets/img/bag.jpg";
			img23 = img23 || "./assets/img/bag.jpg";
			console.log("parsedata[i].fields.id" + parsedata[i].fields.id);
			console.log("parsedata[i].fields.id" + parsedata[i + 1].fields.id)
				//displaying crousel image
	*/

			$('.add-items').append('<div class="row ">\
				<div class="col-xs-6 right-padding ">\
				<div id="myCarousel' + i + '" class="carousel slide"  data-interval="false">\
							<ol class="carousel-indicators">\
								 <li data-target="#myCarousel' + i + '" data-slide-to="0" class="active"></li>\
								<li data-target="#myCarousel' + i + '" data-slide-to="1"></li>\
								<li data-target="#myCarousel' + i + '" data-slide-to="2"></li>\
								<li data-target="#myCarousel' + i + '" data-slide-to="3"></li>\
							</ol>\
	  <div class="carousel-inner" role="listbox">\
								<div class="item active">\
									<img src="'+img10+'" class="img-responsive items" id="' + parsedata[i].fields.id + '">\
								</div>\
	<div class="item">\
									<img src="'+img11+'" class="img-responsive items" id="' + parsedata[i].fields.id + '">\
								</div>\
								<div class="item">\
									<img src="'+img12+'" class="img-responsive items" id="' + parsedata[i].fields.id + '">\
								</div>\
								<div class="item">\
									<img src="'+img13+'" class="img-responsive items" id="' + parsedata[i].fields.id + '">\
								</div>\
							</div>\
								<a class="left carousel-control" href="#myCarousel' + i + '" role="button" id="pauseprev" data-slide="prev">\
						  <i class="icon-angle-left" style="color:red"></i>\
						  <span class="sr-only">Previous</span>\
						</a>\
						<a class="right carousel-control" href="#myCarousel' + i + '" role="button" id="pausenext" data-slide="next">\
						  <i class="icon-angle-right" style="color:red"></i>\
						  <span class="sr-only">Next</span>\
						</a>\
						</div>\
					 <p class="item-price">$' + parsedata[i].fields.price + '</p>\
					<div class="row border-outline">\
						<div class="col-xs-12 pic" >\
							<p ><img src="./assets/img/like.png">' + parsedata[i].fields.brand + '\
								<br> <span>' + parsedata[i].fields.description + '</span></p>\
						</div>\
					</div>\
				</div>\
				<div class="col-xs-6 left-padding ">\
				<div id="myCarousel' + (i + 1) + '" class="carousel slide"  data-interval="false">\
							<ol class="carousel-indicators">\
								 <li data-target="#myCarousel' + (i + 1) + '" data-slide-to="0" class="active"></li>\
								<li data-target="#myCarousel' + (i + 1) + '" data-slide-to="1"></li>\
								<li data-target="#myCarousel' + (i + 1) + '" data-slide-to="2"></li>\
								<li data-target="#myCarousel' + (i + 1) + '" data-slide-to="3"></li>\
							</ol>\
	  <div class="carousel-inner" role="listbox">\
								<div class="item active">\
									<img src="'+img20+'" id="' + parsedata[i + 1].fields.id + '">\
								</div>\
	<div class="item">\
									<img src="'+img21+'" class="img-responsive items" id="' + parsedata[i + 1].fields.id + '">\
								</div>\
								<div class="item">\
									<img src="'+img22+'" class="img-responsive items" id="' + parsedata[i + 1].fields.id + '">\
								</div>\
								<div class="item">\
									<img src="'+img23+'" class="img-responsive items" id="' + parsedata[i + 1].fields.id + '">\
								</div>\
							</div>\
							<a class="left carousel-control" href="#myCarousel' + (i + 1) + '" role="button" id="pauseprev" data-slide="prev">\
						  <i class="icon-angle-left" style="color:red"></i>\
						  <span class="sr-only">Previous</span>\
						</a>\
						<a class="right carousel-control" href="#myCarousel' + (i + 1) + '" role="button" id="pausenext" data-slide="next">\
						  <i class="icon-angle-right" style="color:red"></i>\
						  <span class="sr-only">Next</span>\
						</a>\
						</div>\
					<p class="item-price">$' + parsedata[i + 1].fields.price + '</p>\
					<div class="row border-outline">\
						<div class="col-xs-12 pic" >\
							<p ><img src="./assets/img/like.png">' + parsedata[i + 1].fields.brand + '\
								<br> <span>' + parsedata[i + 1].fields.description + '</span></p>\
						</div>\
					</div>\
				</div>\
			</div>');
		}



	}

	function loadmore() {
		page_no++;
		//alert(page_no);
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
				   page: 1 ,
					"show_by" :"10",
					//color : color

			},
			success: function(data) {

				if (data.error)
					alert(data.error);
				// alert('data.error');

				console.log('insidesucees');
				var getitemdata = JSON.stringify(data);
				//alert(JSON.stringify(data));
				localStorage.setItem('itemdata', '');
				localStorage.setItem('itemdata', getitemdata);
				var parsedata = JSON.parse(localStorage.getItem('itemdata'));
				console.log('calling load prof from windows ');
				loadprof();


			},

			error: function(xhr, status, error) {
				console.log(xhr);
			}


		}); //end of ajax call 



	}
	function makeAjaxcall()
	{
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
					"page": 1 ,
					"show_by" :"10",
					//"color" : color
				},
				success: function(data) {
					console.log('category sucees')
					var getitemdata = JSON.stringify(data);
					console.log(JSON.stringify(data));
					localStorage.setItem('itemdata', '');
					localStorage.setItem('itemdata', getitemdata);
					var parsedata = JSON.parse(localStorage.getItem('itemdata'));
					console.log('calling from category ssucess');
					loadprof();


				},

				error: function(xhr, status, error) {
					console.log(xhr);
				}


			}); //end of ajax call 


	}