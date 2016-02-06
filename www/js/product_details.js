	$(document).ready(function(){
	//alert(localStorage.getItem('productid'));

	url=''
	var pk =localStorage.getItem('productid')
	 $(document).bind("deviceready", function() {
				document.addEventListener("backbutton", function() {
							
							localStorage.setItem('productid',' ');
							localStorage.setItem('backbuttonpressed','true');
							parent.history.back();
				});
				});
	  $body = $("body");
	$(document).on('click', '#getex', function() {

			console.log(url);
			var ref = cordova.InAppBrowser.open(url, '_blank', 'location=yes');
			ref.addEventListener('loadstart', function(event) {
				//console.log("loadstart" + event.url);
			});

		})
	  $.ajax({
			type : 'GET',
			url: 'http://staging12.getpriceapp.com/item-details/'+pk+'/',
			beforeSend: function() { 
			
			$body.addClass("loading"); 
			},
			complete: function() { 
			
			$body.removeClass("loading"); 
			},
			contentType: "application/json",
			dataType: "json",
			data :{
		
	},
		   success : function(data)
					{ 
					
					 var getitemdetails = JSON.stringify(data);
					 //alert(getitemdetails);
					 localStorage.setItem('itemdetails','');
					 localStorage.setItem('itemdetails' ,getitemdetails);
					 var parsedetails =JSON.parse(localStorage.getItem('itemdetails'));
					 //alert(parsedetails);
					 loadprof();
					
		
		} ,
		
		error   : function (xhr, status, error)
		{console.log(xhr.responseText);					 
		//alert(xhr.status);	
		}						 
			
			
			});//end of ajax call 

	});

	function loadprof()
	{
	var parsedetails =JSON.parse(localStorage.getItem('itemdetails'));
	if(parsedetails.price_sold)
	{console.log('present');}
	else 
	parsedetails.price_sold='N/A';

	if(parsedetails.amount_saved)
	{console.log('present')}
	else 
	parsedetails.amount_saved='N/A';
	if(parsedetails.price)
	{console.log('present')}
	else 
	parsedetails.price='N/A';
	//url =parsedetails.photo_set[0].url_large

	url=parsedetails.purchase_url
	if(parsedetails.photo_set[2])
	var i3 = parsedetails.photo_set[2].url_large
	else
	 i3="./assets/img/bag.jpg"
	 if(parsedetails.photo_set[1])
	var i2 = parsedetails.photo_set[1].url_large
	else
	 i2="./assets/img/bag.jpg"
	 if(parsedetails.photo_set[0])
	var i1 = parsedetails.photo_set[0].url_large
	else
	 i1="./assets/img/bag.jpg"
	//var i4 = parsedetails.photo_set[3].url_large
	$('.product-name').text(parsedetails.brand);
	$('.product-description').text(parsedetails.description);
	$('#price_sold').text('$'+parsedetails.price_sold+'')
	$('#amount_saved').text('$'+parsedetails.amount_saved+'')
	$('.carousel-inner').html('');
	$('.carousel-inner').append('<div class="item i1 active">\
			   <img src="'+i1+'"  class="img-responsive ">\
				</div>\
				<div class="item i1">\
				<img src="'+i2+'" class="img-responsive ">\
				</div>\
				<div class="item i1">\
				<img src="'+i3+'"  class="img-responsive">\
				</div>\
				');

	$('#originalprice').text('$'+parsedetails.price+'');
	$('.item-description').text(parsedetails.title);





	}