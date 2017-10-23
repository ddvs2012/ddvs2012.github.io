$(document).ready(function(){

	var streamers=['docgotgame','freecodecamp','brunofin','gamecatt','comster_404','rendhammertv','moonmoon_OW','ripperxtv','esl_overwatch'];

	function getStreamerInfo(){

		streamers.forEach(function(streamer){

			function assembleURL(type, name){
				return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + name ;
			}

			$.ajax({
				type: "GET",
				url: (assembleURL("streams", streamer)),
				//client-id provided but doesn't work
				
				success:function(data){
					

					if(data.stream == null){
						status = 'offline';
						var content='';
						$('#table').append("<tr class='target offline'><td class='streamer'><a target='blank' href='https://www.twitch.tv/"+ streamer + "'>" + streamer + "<br><span class='content'>" + content + "</span></a></td><td class='status'>" + status + "</td></tr>");
					} else{
						status = 'LIVE';
						var content = '-' + data.stream.game + "-";
						$('#table').append("<tr class='target online'><td class='streamer'><a target='blank' href='https://www.twitch.tv/"+ streamer +"'><img class='formattedImg' src='" + data.stream.channel.logo + "'>" + streamer + "<br><span class='content'>" + content + "</span></a></td><td class='status'>" + status + "</td></tr>");
					}
					
				
					// console.log(JSON.stringify(data));

					// if(data.stream == null){
					// 	$('.target').addClass('offline');
					// } else{
					// 	$('.target').addClass('online');
					// }
				
					$('#table').append(info);
			
				},
				error:(function(){
					alert('request error');
				})

			})
		})
	}

	getStreamerInfo();

	$('#navAll').click(function(){
		$('.target').removeClass('hidden');
	})

	$('#navOn').click(function(){
		$('.offline').addClass('hidden');
		$('.online').removeClass('hidden');
	})

	$('#navOff').click(function(){
		$('.online').addClass('hidden');
		$('.offline').removeClass('hidden');
	})
	//pushing hardcoded urls into urls array
	// var rootUrl="https://api.twitch.tv/kraken/streams/"
	// var urls =[];

	// for(i=0; i<streamers.length;i++){
	// 	urls.push(rootUrl + streamers[i])
	// 	/*console.log(JSON.stringify(urls));*/
	// }
	
})
//cijw4sis1i9zyhnjzuvmd0wkuvmjvo
