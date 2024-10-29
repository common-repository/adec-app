<div id="divLoading"> 
</div>
<div id="action_notice_location">
	<div class="redux-action_bar">
		<button id="redux_shop_location" class="button button-primary">Save Changes</button>
	</div> 
</div> 

<script type="text/javascript">


  var kk   =  jQuery("#obs_shop_latitude").val();
  var ll   =  jQuery("#obs_shop_longitude").val(); 
  var address   =  jQuery("#obs_shop_address").val();
  jQuery("#obs_address").attr('value',address);
  jQuery("#kk").attr('value',kk);
  jQuery("#ll").attr('value',ll);
  jQuery('#redux_shop_location').on('click',function(){
    var submit_url = jQuery('#submit_url').val();
    var shop_url = jQuery('#shop_urls').val();
    var ck_key =  jQuery('#ck_key').val();
    var ck_secret = jQuery('#ck_secret').val();
    var latitude  =  jQuery("#obs_shop_latitude").val();                  
    var lognitude =  jQuery("#obs_shop_longitude").val();                  
    var address   =  jQuery("#obs_address").val();
    var adec_location_nonce = jQuery(".adec_location_nonce").text();
    var server_check =1;
    jQuery.ajax({
      url:submit_url,
      type: "POST",
      data:"latitude="+latitude+"&longitude="+lognitude+"&address="+address+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
      crossDomain: true,
      beforeSend:function (reqest) {
        jQuery("div#divLoading").addClass('show');
      },
      success: function (data) {
        jQuery.ajax({
          url:ajaxurl,
          type:'POST',
          dataType: 'json',
          data: {
            action:'adec_plugin_shop_location_update_framework',
            latitude:latitude,
            lognitude:lognitude,
            address:document.getElementById("obs_address").value,
            security:adec_location_nonce
          },
          success: function(data){

            if(data == -1){
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_location").notify("Unauthorized Access!", "error" ,
                { position:"top" });
              return false;
            }

            if(data['success'] == 1 ){
              jQuery.ajax({
                url:submit_url,
                type: "POST",
                data:"latitude="+latitude+"&longitude="+lognitude+"&address="+address+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                crossDomain: true,
                beforeSend:function (reqest) {
                  jQuery("div#divLoading").addClass('show');
                },
                success: function (data) {
                 var jObject =  jQuery.parseJSON(data);
                 jQuery("div#divLoading").removeClass('show');
                 jQuery("#action_notice_location").notify("Location Successfully Updated", "success" ,
                  { position:"top" });
               },
               error: function (data) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_location").notify("Location is Not Updated!", "error" ,
                  { position:"top" });
              }
            });
            }else{
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_location").notify("Location is Not Updated!", "error" ,
                { position:"top" });
            }



            // jQuery("div#divLoading").removeClass('show');
            // jQuery("#action_notice_location").notify("Successfully Updated Location", "success" ,
            //   { position:"top" });
          },
          error: function (data,status) {
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_location").notify("Error Updating Location !", "error" ,
              { position:"top" });
          }
        });
      },
      error: function (data) {
        jQuery("div#divLoading").removeClass('show');
        jQuery("#action_notice_location").notify("Error Updating Location !", "error" ,
          { position:"top" });
      }
    });
    return false;
  });

  
                // function initMap() {
                //   var latitude  =  document.getElementById("kk").value;  
                //   var lognitude =  document.getElementById("ll").value; 
                //   var latss =parseFloat(latitude);
                //   var lngss = parseFloat(lognitude);
                //   if(latss){
                //     var lat =parseFloat(latitude);
                //   }else{
                //     var lat =23.75084213060847;
                //   }
                //   if(lngss){
                //     var lng =parseFloat(lognitude);
                //   }else{
                //     var lng =90.38789612911376;
                //   }

                //   // var lat = 23.7386824;
                //   // var lng = 90.37921180000001;
                //   var myLatLng = {lat:lat,lng:lng} ;
                //   var map = new google.maps.Map(document.getElementById('map'), {
                //     scrollwheel: false,
                //     zoom: 15,
                //     center: {lat:lat,lng:lng},
                //   });
                //   var marker = new google.maps.Marker({
                //     position: myLatLng,
                //     draggable:true,
                //     map: map,
                //     title: document.getElementById("obs_address").value
                //   });
                //   google.maps.event.addListener(marker, 'dragend', function (event) {
                //     document.getElementById("obs_shop_latitude").value = this.getPosition().lat();
                //     document.getElementById("obs_shop_longitude").value = this.getPosition().lng();
                //   });
                //   var geocoder = new google.maps.Geocoder();
                //   document.getElementById('submits').addEventListener('click', function() {
                //     geocodeAddress(geocoder, map);
                //   });
                // }

                // function geocodeAddress(geocoder, resultsMap) {
                //   var address = document.getElementById('obs_address').value;
                //   geocoder.geocode({'address': address}, function(results, status) {
                //     var latitude = results[0].geometry.location.lat();
                //     var longitude = results[0].geometry.location.lng();
                //     jQuery( "#obs_shop_latitude" ).val( latitude );
                //     jQuery( "#obs_shop_longitude" ).val( longitude );
                //     if (status === google.maps.GeocoderStatus.OK) {
                      

                //       resultsMap.setCenter(results[0].geometry.location);
                //       var marker = new google.maps.Marker({
                //         map: resultsMap,
                //         draggable:true,
                //         animation: google.maps.Animation.DROP,
                //         position: results[0].geometry.location
                //       });
                //       google.maps.event.addListener(marker, 'dragend', function (event) {
                //         document.getElementById("obs_shop_latitude").value = this.getPosition().lat();
                //         document.getElementById("obs_shop_longitude").value = this.getPosition().lng();
                //       });
                //     } else {
                //       alert('Geocode was not successful for the following reason:'+ status);
                //     }
                //   });
                // }
           

</script>



 

