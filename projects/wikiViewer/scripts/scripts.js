$(document).ready(function(){
	
	$("#searchForm").submit(function(e){
		 searchInput = $("#searchInput").val();
		 address = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchInput + "&format=json&callback=?"
		 
	
		$.ajax({
			type : "GET",
			url : address,
			async : false,
			dataType: "json",
			success : function(data){
				//reset
				$("#output").html('');
				$("#searchInput").text('');
				
				for (i=0; i < data[1].length; i++){
				$("#output").append("<li><a target='blank' href="+data[3][i]+">"+data[1][i]+"</a><br>"+"	"+data[2][i]+"<br></li>");
				}
			},
			error : function(errorMsg){
				alert("Cannot connect to server error 403");
			}					
		});	
		
		// 'No results' doesn't work
		// if ($('#output') == ""){
			 // $('#output').text('<li>Your search turned up nothing</li>')
		// }
		$("html, body").animate({ scrollTop: "390px" },1000);
		e.preventDefault();
		
	});
	$("#searchInput").keypress(function(e){
				if(e.which == 13){
					$("#search").click();
				};
		});

});