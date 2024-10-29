

<div id="divLoading"> 
</div>
<div id="action_notice_token">
	<div class="redux-action_bar">
	
		<button id="redux_wp_settings_token" class="button button-primary">Generate Token</button>
	</div> 
</div> 


 <script>
 	jQuery(document).ready(function(){

 		jQuery('#redux_wp_settings_token').on('click',function(){
 			var shop_url_check  = jQuery("#shop_urls").val();
 			var ck_key_check 	= jQuery("#ck_key").val();
 			var ck_secret_check = jQuery("#ck_secret").val();
 			var obs_logo_check 	= jQuery(".redux-option-image").attr('src');
 			var surl 			= jQuery("#surl").val();

 	


 			jQuery.ajax({
 				url:surl,
 				type: "POST",
 				data:"shop_url_token="+shop_url_check,
 				crossDomain: true,
 				beforeSend:function (reqest) {
 					jQuery("div#divLoading").addClass('show');
 				},
 				success: function (data) {
 					var jObject =  jQuery.parseJSON(data);
 					if(jObject['success'] == 1 ){
 						//alert('Successfully Validate Consumer Key And Consumer Secret');

 						jQuery.ajax({
 							url:ajaxurl,
 							type:'POST',
 							data: {
 								action:'obs_mobile_store_update_framework',
 								shop_urls:shop_url_check,
 								ck_key:ck_key_check,
 								ck_secret:ck_secret_check,
 								token:jObject['token'],
 								obs_logo:obs_logo_check,
 								store_status_page:2,
 							},
 							success: function(response,stats){
 								jQuery("div#divLoading").removeClass('show');
 								jQuery("#action_notice").notify("Successfully Generate Token", "success" ,
 									{ position:"top" });
 								location.reload();
 							},
 							error: function (data,status) {
 								alert(status);
 							}
 						}); 
 						jQuery('#token').attr('value',jObject['token']);

 					}else{
 						var store_status = 5;
 						jQuery.ajax({
 							url:ajaxurl,
 							type:'POST',
 							data: {
 								action:'obs_mobile_store_update_framework',
 								shop_urls:shop_url_check,
 								ck_key:ck_key_check,
 								ck_secret:ck_secret_check,
 								token:jObject['token'],
 								obs_logo:obs_logo_check,
 								store_status_page:store_status

 							},
 							success: function(data,status){
 								jQuery("div#divLoading").removeClass('show');

 								jQuery("#action_notice").notify("Token Generation Failed !", "error" ,
 									{ position:"top" });
 								location.reload();

 							},
 							error: function (data,status) {
 								alert(status);
 							}
 						}); 

 						
 					} 

 				},
 				error: function (data) {
 					alert(data);
 				}
 			});





 			

 			return false;
 			
 		});
 	});







 </script>



