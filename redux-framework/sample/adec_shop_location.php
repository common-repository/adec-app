 <?php  
	 global $obs_mobile_store;
	 $obs_mobile_store = get_option('obs_mobile_store');
 ?>
 <style>
  #map {
    height: 350px;
    width:100%;
  }
  #floating-panel {
    position: relative;
    top: 2%;
    left: 0%;
    z-index: 5;
    background-color: #fff;
    padding: 5px;
    border: 1px solid #999;
    text-align: center;
    font-family: 'Roboto','sans-serif';
    line-height: 30px;
    padding-left: 10px;
  }
</style>
<form method="post" action="options.php" onsubmit="return true;">
  <?php wp_nonce_field('update-options'); ?>
  <table class="form-table">
    <tr valign="top">
      <td>
      </td>
    </tr> 
    <div id="floating-panel">
      <input id="obs_address" name="obs_address" type="textbox" value="">
      <input type="hidden" name="kk" id="kk" value="">
      <input type="hidden" name="ll" id="ll" value="">
      <input id="submits" type="button" value="Get Location">
    </div>
    <div id="map"></div>
  </table>
</form>


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
          data: {
            action:'Obs_shop_location_update_framework',
            latitude:latitude,
            lognitude:lognitude,
            address:document.getElementById("obs_address").value,
          },
          success: function(response,stats){
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_location").notify("Successfully Updated Location", "success" ,
              { position:"top" });
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


  jQuery('#9_section_group_li_a').unbind('click',loadAPI);
  jQuery('#9_section_group_li_a').bind('click',loadAPI);
 

  

  function initMap() {
    var latitude  =  document.getElementById("kk").value;  
    var lognitude =  document.getElementById("ll").value; 
    var latss =parseFloat(latitude);
    var lngss = parseFloat(lognitude);
    if(latss){
      var lat =parseFloat(latitude);
    }else{
      var lat =23.75084213060847;
    }
    if(lngss){
      var lng =parseFloat(lognitude);
    }else{
      var lng =90.38789612911376;
    }

                  // var lat = 23.7386824;
                  // var lng = 90.37921180000001;
                  var myLatLng = {lat:lat,lng:lng} ;
                  var map = new google.maps.Map(document.getElementById('map'), {
                    scrollwheel: false,
                    zoom: 15,
                    center: {lat:lat,lng:lng},
                  });
                  var marker = new google.maps.Marker({
                    position: myLatLng,
                    draggable:true,
                    map: map,
                    title: document.getElementById("obs_address").value
                  });
                  google.maps.event.addListener(marker, 'dragend', function (event) {
                    document.getElementById("obs_shop_latitude").value = this.getPosition().lat();
                    document.getElementById("obs_shop_longitude").value = this.getPosition().lng();
                  });
                  var geocoder = new google.maps.Geocoder();
                  document.getElementById('submits').addEventListener('click', function() {
                    geocodeAddress(geocoder, map);
                  });
                }

                function geocodeAddress(geocoder, resultsMap) {
                  var address = document.getElementById('obs_address').value;
                  geocoder.geocode({'address': address}, function(results, status) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    jQuery( "#obs_shop_latitude" ).val( latitude );
                    jQuery( "#obs_shop_longitude" ).val( longitude );
                    if (status === google.maps.GeocoderStatus.OK) {
                      resultsMap.setCenter(results[0].geometry.location);
                      var marker = new google.maps.Marker({
                        map: resultsMap,
                        draggable:true,
                        animation: google.maps.Animation.DROP,
                        position: results[0].geometry.location
                      });
                      google.maps.event.addListener(marker, 'dragend', function (event) {
                        document.getElementById("obs_shop_latitude").value = this.getPosition().lat();
                        document.getElementById("obs_shop_longitude").value = this.getPosition().lng();
                      });
                    } else {
                      alert('Geocode was not successful for the following reason:'+ status);
                    }
                  });
                }
              function loadAPI()
                {
                  var script = document.createElement("script");
                  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBcVcz5OZ6eNBi5d7CFYHIdtsEI5BQlm68&callback=initMap";
                  script.type = "text/javascript";
                  document.getElementsByTagName("head")[0].appendChild(script);
                }
</script>



<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCYAvx--Nl5OczZ69Ww4Ab-q8nr_Gry834&signed_in=true&callback=initMap" async  ></script> -->
 

