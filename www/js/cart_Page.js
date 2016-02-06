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
			hasnext=false
			var userdata = loginMethods.getUserInfo();
			
			if(localStorage.getItem('backbuttonpressed')=='true')
				{localStorage.setItem('backbuttonpressed','false');
				cat =	 localStorage.getItem('productcat');
				console.log(localStorage.getItem('productcat'));
				page =localStorage.getItem('page');
				console.log(localStorage.getItem('page'));
				type=localStorage.getItem('type');
			console.log(localStorage.getItem('type'));
				color=localStorage.getItem('color');
				console.log(localStorage.getItem('color'));
				if(color)
				   {
					console.log('localStorage.getItem()');
					//make ajax color based on color filter
					loadprofcolr();
					}
					else
					console.log('lodng');
					//without color filter
					makeAjaxcall();
					 
					 }
			
			if (userdata.fbGender == 'female') {
				cat = 'all';
				//cat = 'bags';
				type='female'
			//ajax call without color filter
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
						//if(hasnext)
						  loadmore();
						// else 
						  //alert('No more products available'); 					 
					}

				});

			      //View Item Details event
			$(document).on('click', '.items', function(e) {
				mixpanel.track("view_item_details", {
					"id": '123'
				});
				console.log(e.target.id);
				localStorage.setItem('productid', ' ')
				localStorage.setItem('productcat', cat)
				localStorage.setItem('page', page_no)
				localStorage.setItem('type',userdata.fbGender)
				if(color)
				console.log('no filter')
				else
			    localStorage.setItem('color',color)
				localStorage.setItem('productid', e.target.id)


				window.location = 'product_Detail.html'

			});
			//preview event
			$(document).on('click', '.items', function() {
				mixpanel.track("preview", {
					"id": '1234'
				});

			});

			  //color--picker
			$(document).on('click', '.border-colorpicker div', function(e) {
				
				var id  = e.target.id;
				if(id=='c19'||id =='c20')
				  color='red'
				else if(id =='c1'||id =='c2'||id =='c3')
					color='orange'
				else if(id =='c17')
				color='pink,blue'
				else if(id =='c10'||id =='c11'||id =='c12'||id =='c13'||id =='c14'||id =='c15'||id =='c16')
				 color='blue'
				 else
				   console.log('not at backend');
				   
				   callforcolorfilter();

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
				page_no = 1;
				if (userdata.fbGender == 'female') {
				type='female'
					if (id == 'clothingimg') {
						cat = 'clothing'
						console.log(cat);
					} else if (id == 'sunglassimg') {
						cat = 'sunglasses'
						console.log(cat);
					} else if (id == 'necklaceimg') {
						cat = 'jewelry'
						console.log(cat);
					} else if (id == 'purseimg') {
						cat = 'bags'
						console.log(cat);
					}else if (id == 'sandleimg') {
						cat = 'shoes'
						console.log(cat);
					} else {
						cat = "watches";
						console.log(cat);
					}
				} 
				
				else {
				type='male'
					//alert('else')
					if (id == 'clothingimg') {
						cat = 'clothing'
						console.log(cat);
					} else if (id == 'watchimg') {
						cat = 'watches'
						console.log(cat);
					} else if (id == 'gadgetimg') {
						cat = 'electronics'
						console.log(cat);
					} else if (id == 'cycleimg') {
						cat = 'outdoogear'
						console.log(cat);
					} else {
						cat = 'sunglasses';
						console.log(cat);
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
						"page": 1,
						"show_by" :10,
						'type':type

					},
					success: function(data) {
						   //alert(JSON.stringify(data));
						
							console.log('insidesucees');
						var getitemdata = JSON.stringify(data);
						console.log(JSON.stringify(data));
						localStorage.setItem('itemdata', '');
						localStorage.setItem('itemdata', getitemdata);
						var parsedata = JSON.parse(localStorage.getItem('itemdata'));
						// if(parsedata[0].paginator.has_next)
	//hasnext=true;  
					
					if(parsedata[0].products.length)
					{console.log('calling load prof from windows ');
						loadprof()
					   }
					   else{
					   $('.add-items').html('');
					$('.add-items').append('<p><b>SORRY.. will be back soon </b></p>')
	}

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
			
			//var i1 =
	//alert(parsedata[0].fields.photo_set[0].url_medium)
			for (i = 0; i < parsedata[0].products.length; i += 2) {
				
				var img10, img11, img12, img13;
				var img20, img21, img22, img23;
				console.log("i:" + i);

				img10= parsedata[0].products[i].fields.photo_set[0].url_medium
				img11= parsedata[0].products[i+1].fields.photo_set[0].url_medium
				/*for(j=0;j<parsedata[0].products[i].fields.photo_set.length;j++)
					{
					if(j==0) 
					   
					   {img10=parsedata[0].products[i].fields.photo_set[0].url_medium
					   console.log(parsedata[0].products[i].fields.id)}
					  else if(j==1) 
					  {
					   img11=parsedata[0].products[i].fields.photo_set[1].url_medium
					   }
					 else   
					   {
					   img12=parsedata[0].products[i].fields.photo_set[2].url_medium
					   console.log(parsedata[0].products[i].fields.id)}
					
					
					
					}
					
		  for(j=0;j<parsedata[0].products[i+1].fields.photo_set.length;j++)
					{
					if(j==0) 
					   img20=parsedata[0].products[i+1].fields.photo_set[0].url_medium
					  else if(j==1) 
					  {  
					  if(parsedata[0].products[i+1].fields.photo_set[1].url_medium=='undefined')
					   img22="./assets/img/bag.jpg"
					   else
					  
					   img21=parsedata[0].products[i+1].fields.photo_set[1].url_medium
					   
					   
					   }
					 else {  
					  if(parsedata[0].products[i+1].fields.photo_set[2].url_medium=='undefined')
					  img22="./assets/img/bag.jpg"
					   else img22=parsedata[0].products[i+1].fields.photo_set[2].url_medium
					 
					
					}
					}
	*/

			   if (parsedata[0].products[i].fields.price) {
				  
				} else
					parsedata[0].products[i].fields.price = 'N/A'

				if (parsedata[0].products[i].fields.brand) {} else parsedata[0].products[i].fields.brand = 'N/A'

				if (parsedata[0].products[i + 1].fields.brand) {} else parsedata[i + 1].products[i + 1].fields.brand = 'N/A'

				if (parsedata[0].products[i + 1].fields.price) {} else
					parsedata[0].products[i + 1].fields.price = 'N/A'

				if (parsedata[0].products[i + 1].fields.description) {} else
					parsedata[0].products[i + 1].fields.description = 'N/A'
				if (parsedata[0].products[i].fields.description) {} else
					parsedata[0].products[i].fields.description = 'N/A'
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
					<div class="col-xs-12  " style="max-height:100%">\
				<img src="'+img10+'" class="img-responsive items img2"   id="' + parsedata[0].products[i].fields.id + '"></div>\
					 <p class="item-price">$' + parsedata[0].products[i].fields.price + '</p>\
						<div class="row border-outline">\
							<div class="col-xs-12 pic" >\
								<p ><img src="./assets/img/like.png">' + parsedata[0].products[i].fields.brand + '\
									<br> <span>' + parsedata[0].products[i].fields.description + '</span></p>\
							</div>\
						</div>\
					</div>\
					<div class="col-xs-6 left-padding ">\
					<div class="col-xs-12  " style="height:100%">\
				<img src="'+img11+'" class="img-responsive items img2" id="' + parsedata[0].products[i+1].fields.id + '"></div>\
					<p class="item-price">$' + parsedata[0].products[i + 1].fields.price + '</p>\
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

		function loadmore() {
		hasnext=false;
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
					   page: page_no ,
						"show_by" :"10",
						'type':type
						//color : color

				},
				success: function(data) {

					console.log('insidesucees');
					var getitemdata = JSON.stringify(data);
					//alert(JSON.stringify(data));
					localStorage.setItem('itemdata', '');
					localStorage.setItem('itemdata', getitemdata);
					var parsedata = JSON.parse(localStorage.getItem('itemdata'));
					console.log('calling load prof from windows ');
					loadprof();

	//if(parsedata[0].paginator.has_next)
	//hasnext=true;
			}	,

				error: function(xhr, status, error) {
					console.log(xhr);
				}


			}); //end of ajax call 



		}
		
		function callforcolorfilter() {
		
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
					   page: page_no ,
						"show_by" :"10",
						'type':type,
						color : color

				},
				success: function(data) {

				
					var getitemdata = JSON.stringify(data);
					//alert(JSON.stringify(data));
					localStorage.setItem('itemdata', '');
					localStorage.setItem('itemdata', getitemdata);
					var parsedata = JSON.parse(localStorage.getItem('itemdata'));
					console.log('calling load prof from windows ');
					loadprofcolr();

	//if(parsedata[0].paginator.has_next)
	//hasnext=true;
			}	,

				error: function(xhr, status, error) {
					console.log(xhr);
				}


			}); //end of ajax call 



		}
		function makeAjaxcall()
		{
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
						"page": page_no ,
						"show_by" :10,
						type:type
						//"color" : color
					},
					success: function(data) {
										var getitemdata = JSON.stringify(data);
						localStorage.setItem('itemdata', '');
						localStorage.setItem('itemdata', getitemdata);
						var parsedata = JSON.parse(localStorage.getItem('itemdata'));
						//alert(parsedata[0].products.length);
						
					if(parsedata[0].products.length==0)
					   {
					   $('.add-items').append('<p>..Sorry will be back soon ..</p>')}
					   else{
						console.log('category sucees')

						console.log(JSON.stringify(data));
					
					
						loadprof();
	}
	//if(parsedata[0].paginator.has_next)
	//hasnext=true;
					},

					error: function(xhr, status, error) {
						console.log(xhr);
					}


				}); //end of ajax call 


		}
		
		
		
		function loadprofcolr()
		{
				var parsedata = JSON.parse(localStorage.getItem('itemdata'));
			//  alert(JSON.stringify(parsedata));
			if (categoryitemclicked) {
				$('.add-items').html(' ');
				categoryitemclicked = false;
			}
			color=''
			//var i1 =
	//alert(parsedata[0].fields.photo_set[0].url_medium)
			for (i = 0; i < parsedata[0].products.length; i += 2) {
				
				var img10, img11, img12, img13;
				var img20, img21, img22, img23;
				console.log("i:" + i);

				img10= parsedata[0].products[i].fields.photo_set[0].url_large
				img11= parsedata[0].products[i+1].fields.photo_set[0].url_large


			   if (parsedata[0].products[i].fields.price) {
				  
				} else
					parsedata[0].products[i].fields.price = 'N/A'

				if (parsedata[0].products[i].fields.brand) {} else parsedata[0].products[i].fields.brand = 'N/A'

				if (parsedata[0].products[i + 1].fields.brand) {} else parsedata[i + 1].products[i + 1].fields.brand = 'N/A'

				if (parsedata[0].products[i + 1].fields.price) {} else
					parsedata[0].products[i + 1].fields.price = 'N/A'

				if (parsedata[0].products[i + 1].fields.description) {} else
					parsedata[0].products[i + 1].fields.description = 'N/A'
				if (parsedata[0].products[i].fields.description) {} else
					parsedata[0].products[i].fields.description = 'N/A'
		
				$('.add-items').append('<div class="row ">\
					<div class="col-xs-6 right-padding ">\
					<img src="'+img10+'" class="img-responsive items" id="' + parsedata[0].products[i].fields.id + '">\
						 <p class="item-price">$' + parsedata[0].products[i].fields.price + '</p>\
						<div class="row border-outline">\
							<div class="col-xs-12 pic" >\
								<p ><img src="./assets/img/like.png">' + parsedata[0].products[i].fields.brand + '\
									<br> <span>' + parsedata[0].products[i].fields.description + '</span></p>\
							</div>\
						</div>\
					</div>\
					<div class="col-xs-6 left-padding ">\
					<img src="'+img11+'" class="img-responsive items" id="' + parsedata[0].products[i+1].fields.id + '">\
						<p class="item-price">$' + parsedata[0].products[i + 1].fields.price + '</p>\
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