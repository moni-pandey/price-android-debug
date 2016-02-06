


	var loginMethods = {
		/*Landing page methods*/
		getFacebookProfileInfo: function(authResponse) {
			// To get the profile Info
			var fbInfo = $.Deferred();
			facebookConnectPlugin.api('/me?fields=email,gender,name,age_range,location&access_token=' + authResponse.accessToken, null,
				function(response) {
					console.log(response);
				
					 fbInfo.resolve(response);
				},
				function(response) {
					console.log(response);
					fbInfo.reject(response);
				}
			);
			return fbInfo.promise();
		},
		signinViaFacebook: function() {
			// Facebook based signin
			console.log("signinViaFacebook called");
			facebookConnectPlugin.getLoginStatus(function(success) {
				if (success.status === 'connected') {
					// User has already Logged in
					console.log('getLoginStatus', success.status);
					var fbLocalData = loginMethods.getUserInfo();
					if (!fbLocalData.fbUserID) {
						loginMethods.getFacebookProfileInfo(success.authResponse).then(function(profileInfo) {
							loginMethods.setUserInfo({
								authResponse: authResponse,
								fbUserID: profileInfo.id,
								fbName: profileInfo.name,
								fbEmail: profileInfo.email,
								fbPicture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large",
								fbGender: profileInfo.gender,
								fbLocation :profileInfo.location.name
								
							});

						}, function(fail) {
							// Fail get profile info
							console.log('profile info fail', fail);
						})
					} else {  
					alert("You have already Logged in");
					 var userdata = loginMethods.getUserInfo();
					 
					if(userdata.fbGender == 'female')
				   {
					 //female category code 
					window.location='cart_Page.html'
					// window.location='cart_page_male.html'
				   }
				   else
					{
					  window.location='cart_page_male.html'
					}
					}
				}
				else{
					// User has not Logged in already
					facebookConnectPlugin.login(['email', 'public_profile','user_location'], loginMethods.fbLoginSuccess, loginMethods.fbLoginError);
				}
			}, function(error) {
				// Fail get profile info
				console.log('profile info fail', error);
			});
		},
		setUserInfo: function(user_data) {
			// To save the User data in LocalStorage
			window.localStorage.fbUserData = JSON.stringify(user_data);
			//alert(JSON.stringify(user_data));
			//alert("Saved Profile information");
		},
		getUserInfo: function() {
			// To get the User data from LocalStorage //
			return JSON.parse(window.localStorage.fbUserData || '{}');
		},
		fbLoginSuccess: function(response) {
			// Success callback of Facebook Plugin
			//alert(JSON.stringify(response));
		console.log(JSON.stringify(response));
			if (!response.authResponse) {
				// No Auth response has come
				loginMethods.fbLoginError("Cannot find the authResponse");
				return;
			}
			var authResponse = response.authResponse; // Save the authResponse
			loginMethods.getFacebookProfileInfo(authResponse).then(function(profileInfo) {
			if(profileInfo.email)
			{ var p= profileInfo.id+'@logic.com';
			console.log(p)}
			else
			{
			profileInfo.email=profileInfo.id+'@logic.com';
			console.log(profileInfo.email)}
			
			if(profileInfo.gender)
			{
			console.log('oki')}
			else
			{
			profileInfo.gender='female';}
			if(profileInfo.location)
			{
			console.log('oki')}
			else
			{
			profileInfo.gender='unknown';
			console.log(profileInfo.email)}
			console.log(JSON.stringify(profileInfo));
				// Get the promise and save the response in LocalStorage
				loginMethods.setUserInfo({
					authResponse: authResponse,
					fbUserID: profileInfo.id,
					fbName: profileInfo.name,
					fbEmail: profileInfo.email,
					fbPicture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large",
					fbGender: profileInfo.gender,
					fbLocation :profileInfo.location.name
								
				});
				
		mixpanel.identify(profileInfo.email);
				
				mixpanel.people.set({
			  "$email": profileInfo.email,  
			  "$last_login": new Date(), 
			  "$name": profileInfo.name
				   
	});
	mixpanel.people.increment({ "gender": profileInfo.gender});

				
					if(profileInfo.gender=='female')
				   {
					 //female category code 
					 //window.location='cart_page_male.html'
					 window.location='cart_Page.html'
				   }
				   else
					{
					  window.location='cart_page_male.html'
					}
				
			})
		},
		fbLoginError: function(error) {
			console.log('fbLoginError:' + error);
		}
	};
