$(document).ready(function(){
		function getStuff(address){
				api= address;
				$.getJSON(api, function(data){
					
	//icon
					var icon = data.weather[0].id
					
					$('#icon').html("<i class='wi wi-owm-" + icon + "'></i>");
					
	//City Name
					$('#location').html("<span class='type'>City: </span>"+JSON.stringify(data.name));			
	//Weather Description and backgrounds		
					weatherDescription = data.weather[0].main;
					$('#weatherDescription').html("<span class='type'>Condition: </span>"+weatherDescription);
					
					
					
					backgroundImgContainer = {
						thunderStormD : "https://s26.postimg.org/5jz02h8i1/d8i9wi6.jpg",
						drizzleD : "https://s26.postimg.org/3tkkeqgcp/rain_on_window_glass.jpg",
						rainD : "https://s26.postimg.org/3tkkeqgcp/rain_on_window_glass.jpg",
						snowD : "https://s26.postimg.org/4k8p6rtc9/Ifb_Od_J2.jpg",
						atmosphereD : "https://s26.postimg.org/vede5zxvt/Xt_TIv_YL.jpg",
						clearD : "https://s26.postimg.org/q0elyg85l/udSev3z.jpg",
						cloudsD : "https://s26.postimg.org/mobprer0p/Jn_JXVe4.jpg",
						extremeD : "https://s26.postimg.org/re68tr7ex/Sdw_ZZkk.jpg",
					}
					backgroundImg = ''
					console.log(api);
					
					if(icon < 299){
						backgroundImg = backgroundImgContainer["thunderStormD"];
					} if (icon >= 300 && icon <=399){
						backgroundImg = backgroundImgContainer["drizzleD"];
					}if (icon >= 500 && icon <=599){
						backgroundImg = backgroundImgContainer["rainD"];
						$("body").css('color','#4D92C6');
					}if (icon >= 600 && icon <=699){
						backgroundImg = backgroundImgContainer["snowD"];
					}if (icon >= 700 && icon <=799){
						backgroundImg = backgroundImgContainer["atmosphereD"];
					}			
					if (icon == 800){ 
						backgroundImg = backgroundImgContainer["clearD"];
						$("body").css('color','#000');
					}if (icon > 800 && icon < 805){
						backgroundImg = backgroundImgContainer["cloudsD"];
						$("body").css('color','#000');
					}if (icon >= 805 && icon <=999){
						backgroundImg = backgroundImgContainer["extremeD"];
					}
						
					$('body').css('background-image', 'url('+backgroundImg);
					
	//Sunrise and set time NEEDS WORK
					new Date(data.sys.sunrise * 1000);
					$('#time').html(Date);
	//Temperature				
					kTemp = data.main.temp;
					fTemp = Math.round(kTemp * (9/5) - 459.67);
					cTemp = ((fTemp - 32) * (5/9));
						$('#temp-container').html(Math.round(fTemp) + '&deg;F');				
					
				});						
			};

		$("#searchForm").submit(function(e){
			var searchInput = $("#searchInput").val();
			var address = "http://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&appid=0a37ba98b900f7cfeb11629c1ee0d7d5";
			
			e.preventDefault();				
			getStuff(address);	
		// 'No results' doesn't work
		// if ($('#output') == ""){
			 // $('#output').text('<li>Your search turned up nothing</li>')
		// }
			//$("html, body").animate({ scrollTop: "550px" },1000);
				
		});
		
		$("#searchInput").keypress(function(e){
			if(e.which == 13){
				$("#searchBtn").click();
			};
		});


	 if (navigator.geolocation) {
		
		navigator.geolocation.getCurrentPosition(function(position){
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			
			var address = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=0a37ba98b900f7cfeb11629c1ee0d7d5';
			
	//tried to use this function for search
			getStuff(address);
		}); 
	  
	}	
	//Temperature Buttons
		$('#cButton').click(function(){
			$('#temp-container').html(Math.round(cTemp) + '&deg;C');
		});		
		$('#fButton').click(function(){
			$('#temp-container').html(Math.round(fTemp) + '&deg;F');
		});
});
  
  
  






