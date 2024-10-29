jQuery(document).ready(function($){
	//alert('ads');
    $('.my-color-field').wpColorPicker();
// Paypal Configure Start
    jQuery('#redux_paypal').on('click',function(){
      var submit_url = jQuery('#submit_url').val();
      var shop_url = jQuery("#shop_urls").val();
      var ck_key = jQuery("#ck_key").val();
      var ck_secret = jQuery("#ck_secret").val();
      var paypal_client_id =jQuery("#obs_paypal_client_id").val(); 
      var paypal_ajax_referer =jQuery(".paypal_ajax_referer").text(); 

      var server_check =1; 
      jQuery.ajax({
        url:submit_url,
        type: "POST",
        data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
        crossDomain: true,
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {
          var jObject =  jQuery.parseJSON(data);
          if(jObject['success'] == 1 ){
          jQuery.ajax({
            url:ajaxurl,
            type:'POST',
            data: {
              action:'adec_plugin_paypal_integration_update_framework',
              client_id:paypal_client_id,
              security:paypal_ajax_referer
            },
            success: function(data){
              if(data == -1){
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_paypal").notify("Unauthorized Access!", "error" ,
                  { position:"top" });
                return false;
              }
              var jObject =  jQuery.parseJSON(data);
              if(jObject['success'] == 1 ){
              jQuery.ajax({
                url:submit_url,
                type: "POST",
                data:"client_id="+paypal_client_id+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                crossDomain: true,
                beforeSend:function (reqest) {
                  jQuery("div#divLoading").addClass('show');
                },
                success: function (data) {
                 var jObject =  jQuery.parseJSON(data);

                 if(jObject['success'] == 1 ){
                    jQuery("div#divLoading").removeClass('show');
                    jQuery("#action_notice_paypal").notify("Paypal Client ID Successfully Updated", "success" ,
                      { position:"top" });
                 }
                },
                error: function (data) {
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_paypal").notify("Paypal Client ID Not Updated !", "error" ,
                    { position:"top" });
                }
              });
            }else{
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_paypal").notify("Paypal Client ID Not Updated !", "error" ,
                { position:"top" });
            }

            },
            error: function (data,status) {
                
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_paypal").notify("Paypal Client ID Not Updated !", "error" ,
                { position:"top" });

            }
          });

        }else{

          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_paypal").notify("Paypal Client ID Not Updated !", "error" ,
            { position:"top" });

        }

        },
        error: function (data) {
          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_paypal").notify("Paypal Client ID Not Updated !", "error" ,
            { position:"top" });

        }
      });
      return false;
    });
// Paypal Configure End


// Start Layout Reorder

    jQuery('#redux_multi_pages').on('click',function(){


      var submit_url = jQuery('#submit_url').val();
      var shop_url = jQuery("#shop_urls").val();;
      var ck_key = jQuery("#ck_key").val();
      var ck_secret = jQuery("#ck_secret").val();
      var reorder_ajax_referer = jQuery(".reorder_ajax_referer").text();

      var column1RelArray = [];
      jQuery('#opt-homepage-layout li').each(function(){
        switch(jQuery(this).attr('data-id')) {
          case 'most-popular':
          var layout = "1";
          break;
          case 'latest-product':
          var layout = "2";
          break;
          case 'top-rated':
          var layout = "3";
          break;
          case 'section-one':
          var layout = "4";
          break;
          case 'section-two':
          var layout = "5";
          break;
          case 'section-three':
          var layout = "6";
          break;
          case 'app-banner':
          var layout = "7";
          break;
          case 'welcome-text':
          var layout = "8";
          break;
          default:
        }
        column1RelArray.push(layout);
      });
      var reorder = JSON.stringify(column1RelArray);
      var arr = new Array();
      keyValuePair = {};
      jQuery('#opt-homepage-layout li').each(function(){
        keyValuePair[jQuery(this).attr('data-id')]=jQuery(this).text();
        arr.push(keyValuePair);
      });
      var obs_layout_reorder = JSON.stringify(keyValuePair);
      var server_check =1;
      jQuery.ajax({
        url:submit_url,
        data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
        type: 'POST',
        dataType: 'json',
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {

          if(data['success'] == 1 ){
            jQuery.ajax({
              url:ajaxurl,
              type:'POST',
              data: {
                action:'adec_plugin_layout_reorder_update_framework',
                obs_layout_reorder:obs_layout_reorder,
                security:reorder_ajax_referer
              },
              success: function(data){

                if(data == -1){
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_layout").notify("Unauthorized Access!", "error" ,
                    { position:"top" });
                  return false;
                }
                var jObject =  jQuery.parseJSON(data);
                if(jObject['success'] == 1 ){
                  jQuery.ajax({
                    url:submit_url,
                    type: "POST",
                    data:"item="+reorder+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                    crossDomain: true,
                    beforeSend:function (reqest) {
                      jQuery("div#divLoading").addClass('show');
                    },
                    success: function (data) {
                     var jObject =  jQuery.parseJSON(data);
                     jQuery("div#divLoading").removeClass('show');
                     jQuery("#action_notice_layout").notify("Layout Re-Order Successfully Updated", "success" ,
                      { position:"top" });
                  },
                  error: function (data) {
                    jQuery("div#divLoading").removeClass('show');
                    jQuery("#action_notice_layout").notify("Layout Re-Order Not Updated !", "error" ,
                      { position:"top" });
                  }
                });
                }else{
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_layout").notify("Layout Re-Order Not Updated !", "error" ,
                    { position:"top" });
                }

              },
              error: function (data,status) {

                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_layout").notify("Layout Re-Order Not Updated !", "error" ,
                  { position:"top" });

              }
            });

          }else{

            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_layout").notify("Layout Re-Order Not Updated !", "error" ,
              { position:"top" });

          }

















          // if(data['success'] == 1 ){
          //   jQuery.ajax({
          //     url:ajaxurl,
          //     type:'POST',
          //     async: false,
          //     dataType: 'json',
          //     data: {
          //       action:'Obs_layout_reorder_update_framework',
          //       obs_layout_reorder:obs_layout_reorder,
          //     },
          //     success: function(response,stats){
          //       jQuery("div#divLoading").removeClass('show');
          //       jQuery("#action_notice_layout").notify("Layout Re-Order Successfully Updated", "success" ,
          //         { position:"top" });

          //     },
          //     error: function (data,status) {
          //       jQuery("div#divLoading").removeClass('show');
          //       jQuery("#action_notice_layout").notify("Layout Re-Order is Not Updated !", "error" ,
          //         { position:"top" });
          //     }
          //   });
          // }


        },
        error: function (data) {
          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_layout").notify("Layout Re-Order Not Updated !", "error" ,
            { position:"top" });
        }
      });
      return false;     
    });


    // End Layout Reorder

    // Start Banner Permission


jQuery('#redux_banner_permission').on('click',function(){
  var submit_url = jQuery('#submit_url').val();
  var shop_url = jQuery("#shop_urls").val();;
  var ck_key = jQuery("#ck_key").val();
  var ck_secret = jQuery("#ck_secret").val();
  var adec_banner_nonce = jQuery(".adec_banner_nonce").text();
  var banner_permission = jQuery('input[name="obs_mobile_store[opt-app-banner]"]:checked').val();
  var server_check =1;
  jQuery.ajax({
    url:submit_url,
    data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
    type: 'POST',
    beforeSend:function (reqest) {
      jQuery("div#divLoading").addClass('show');
    },
    success: function (data) {
      var jObject =  jQuery.parseJSON(data);
      if(jObject['success'] == 1 ){

        jQuery.ajax({
          url:ajaxurl,
          type:'POST',
          async: false,
          dataType: 'json',
          data: {
            action:'adec_plugin_banner_permission_framework',
            banner_permission:banner_permission,
            security:adec_banner_nonce,
          },
          success: function(data){

            if(data == -1){
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_banner_permission").notify("Unauthorized Access!", "error" ,
                { position:"top" });
              return false;
            }
            // var jObject =  jQuery.parseJSON(data);
            if(data['success'] == 1 ){
              jQuery.ajax({
                url:submit_url,
                type: "POST",
                data:"banner_permission="+banner_permission+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                crossDomain: true,
                beforeSend:function (reqest) {
                  jQuery("div#divLoading").addClass('show');
                },
                success: function (data) {
                 var jObject =  jQuery.parseJSON(data);
                 jQuery("div#divLoading").removeClass('show');
                 jQuery("#action_notice_banner_permission").notify("Banner Permission Successfully Updated", "success" ,
                  { position:"top" });
               },
               error: function (data) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_banner_permission").notify("Banner Permission is Not Updated  !", "error" ,
                  { position:"top" });
              }
            });
            }else{
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_banner_permission").notify("Banner Permission is Not Updated  !", "error" ,
                { position:"top" });
            }




          },
          error: function (data,status) {
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_banner_permission").notify("Banner Permission is Not Updated !", "error" ,
              { position:"top" });
          }
        });

      }else{

        jQuery("div#divLoading").removeClass('show');
        jQuery("#action_notice_banner_permission").notify("Banner Permission is Not Updated !", "error" ,
          { position:"top" });

        }

    },
    error: function (data) {
      jQuery("div#divLoading").removeClass('show');
      jQuery("#action_notice_banner_permission").notify("Banner Permission is Not Updated !", "error" ,
        { position:"top" });
    }
  });
  return false;
});


// End Banner Permission

// Start Banner upload

jQuery('#redux_banner_upload').on('click',function(){
  var submit_url = jQuery('#submit_url').val();
  var shop_url = jQuery("#shop_urls").val();;
  var ck_key = jQuery("#ck_key").val();
  var ck_secret = jQuery("#ck_secret").val();
  var banner_upload = jQuery('input[name="obs_mobile_store[opt-media-banner][url]"]').val();
  var banner_id = jQuery('input[name="obs_mobile_store[opt-media-banner][id]"]').val();
  var banner_height = jQuery('input[name="obs_mobile_store[opt-media-banner][height]"]').val();
  var banner_width = jQuery('input[name="obs_mobile_store[opt-media-banner][width]"]').val();
  var banner_thumbnail = jQuery('input[name="obs_mobile_store[opt-media-banner][thumbnail]"]').val();
  var adec_bupload_nonce = jQuery(".adec_bupload_nonce").text();
  var server_check =1;


  jQuery.ajax({
   url:submit_url,
   data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
   type: 'POST',
   beforeSend:function (reqest) {
    jQuery("div#divLoading").addClass('show');
  },
  success: function (data) {
    var jObject =  jQuery.parseJSON(data);
    if(jObject['success'] == 1 ){
     jQuery.ajax({
      url:ajaxurl,
      type:'POST',
      async: false,
      dataType: 'json',
      data: {
       action:'adec_plugin_banner_upload_framework',
       banner_upload:banner_upload,
       banner_id:banner_id,
       banner_height:banner_height,
       banner_width:banner_width,
       banner_thumbnail:banner_thumbnail,
       security:adec_bupload_nonce
     },
     success: function(data){

            if(data == -1){
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_banner_upload").notify("Unauthorized Access!", "error" ,
                { position:"top" });
              return false;
            }

            if(data['success'] == 1 ){
              jQuery.ajax({
                url:submit_url,
                type: "POST",
                data:"banner_upload="+banner_upload+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                crossDomain: true,
                beforeSend:function (reqest) {
                  jQuery("div#divLoading").addClass('show');
                },
                success: function (data) {
                 var jObject =  jQuery.parseJSON(data);
                 jQuery("div#divLoading").removeClass('show');
                 jQuery("#action_notice_banner_upload").notify("Banner Upload Successfully Updated", "success" ,
                  { position:"top" });
               },
               error: function (data) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_banner_upload").notify("Banner Upload Option is Not Updated!", "error" ,
                  { position:"top" });
              }
            });
            }else{
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_banner_upload").notify("Banner Upload Option is Not Updated!", "error" ,
                { position:"top" });
            }

    },
    error: function (data,status) {
      jQuery("div#divLoading").removeClass('show');
      jQuery("#action_notice_banner_upload").notify("Banner Upload Option is Not Updated !", "error" ,
        { position:"top" });
    }
  });

   }else{

    jQuery("div#divLoading").removeClass('show');
    jQuery("#action_notice_banner_upload").notify("Banner Upload Option is Not Updated !", "error" ,
      { position:"top" });

  }
 },
 error: function (data) {
  jQuery("div#divLoading").removeClass('show');
  jQuery("#action_notice_banner_upload").notify("Banner Upload Option Not Updated !", "error" ,
    { position:"top" });
}
});
  return false; 
});

// End Banner Upload


    // Start Welcome Permission

    jQuery('#redux_welcome_permission').on('click',function(){
      var submit_url = jQuery('#submit_url').val();
      var shop_url = jQuery("#shop_urls").val();;
      var ck_key = jQuery("#ck_key").val();
      var ck_secret = jQuery("#ck_secret").val();
      var adec_wpermission_nonce = jQuery(".adec_wpermission_nonce").text();
      var welcome_permission = jQuery('input[name="obs_mobile_store[opt-app-welcome]"]:checked').val();
      var server_check =1;

      jQuery.ajax({
        url:submit_url,
        data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
        type: 'POST',
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {
          var jObject =  jQuery.parseJSON(data);
          if(jObject['success'] == 1 ){
            jQuery.ajax({
              url:ajaxurl,
              type:'POST',
              async: false,
              dataType: 'json',
              data: {
                action:'adec_plugin_welcome_permission_framework',
                welcome_permission:welcome_permission,
                security:adec_wpermission_nonce
              },
              success: function(data){

                if(data == -1){
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_welcome_permission").notify("Unauthorized Access!", "error" ,
                    { position:"top" });
                  return false;
                }
            
            if(data['success'] == 1 ){
              jQuery.ajax({
                url:submit_url,
                type: "POST",
                data:"welcome_permission="+welcome_permission+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                crossDomain: true,
                beforeSend:function (reqest) {
                  jQuery("div#divLoading").addClass('show');
                },
                success: function (data) {
                 var jObject =  jQuery.parseJSON(data);
                 jQuery("div#divLoading").removeClass('show');
                 jQuery("#action_notice_welcome_permission").notify("Welcome Permission Successfully Updated", "success" ,
                  { position:"top" });
               },
               error: function (data) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_welcome_permission").notify("Welcome Permission Option is Not Updated!", "error" ,
                  { position:"top" });
              }
            });
            }else{
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_welcome_permission").notify("Welcome Permission Option is Not Updated!", "error" ,
                { position:"top" });
            }


              },
              error: function (data,status) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_welcome_permission").notify("Welcome Permission is Not Updated !", "error" ,
                  { position:"top" });
              }
            });
          }else{

                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_welcome_permission").notify("Welcome Permission is Not Updated !", "error" ,
                  { position:"top" });

          }
        },
        error: function (data) {
          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_welcome_permission").notify("Welcome Permission is Not Updated !", "error" ,
            { position:"top" });
        }
      });
      return false; 
    });

// End Welcome Permission


// Start Welcome Text

    jQuery('#redux_welcome_text').on('click',function(){
      var submit_url = jQuery('#submit_url').val();
      var shop_url = jQuery("#shop_urls").val();;
      var ck_key = jQuery("#ck_key").val();
      var ck_secret = jQuery("#ck_secret").val();
      var welcome_text = tinyMCE.activeEditor.getContent();
      var adec_wtext_nonce = jQuery('.adec_wtext_nonce').text();
       var server_check =1;


      jQuery.ajax({
       url:submit_url,
       data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
       type: 'POST',
       beforeSend:function (reqest) {
        jQuery("div#divLoading").addClass('show');
      },
      success: function (data) {
        var jObject =  jQuery.parseJSON(data);
        if(jObject['success'] == 1 ){
         jQuery.ajax({
          url:ajaxurl,
          type:'POST',
          async: false,
          dataType: 'json',
          data: {
           action:'adec_plugin_welcome_text_framework',
           welcome_text:welcome_text,
           security:adec_wtext_nonce
         },
         success: function(data){

          if(data == -1){
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_welcome_text").notify("Unauthorized Access!", "error" ,
              { position:"top" });
            return false;
          }

          if(data['success'] == 1 ){
            jQuery.ajax({
              url:submit_url,
              type: "POST",
              data:"welcome_text="+welcome_text+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
              crossDomain: true,
              beforeSend:function (reqest) {
                jQuery("div#divLoading").addClass('show');
              },
              success: function (data) {
               var jObject =  jQuery.parseJSON(data);
               jQuery("div#divLoading").removeClass('show');
               jQuery("#action_notice_welcome_text").notify("Welcome text Successfully Updated", "success" ,
                { position:"top" });
             },
             error: function (data) {
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_welcome_text").notify("Welcome text is Not Updated !", "error" ,
                { position:"top" });
            }
          });

          }else{
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_welcome_text").notify("Welcome text is Not Updated !", "error" ,
              { position:"top" });
          }

         },
         error: function (data,status) {
           jQuery("div#divLoading").removeClass('show');
           jQuery("#action_notice_welcome_text").notify("Welcome text is Not Updated !", "error" ,
            { position:"top" });
         }
       });

       }else{
         jQuery("div#divLoading").removeClass('show');
         jQuery("#action_notice_welcome_text").notify("Welcome text is Not Updated !", "error" ,
          { position:"top" });
       }

     },
     error: function (data) {
      jQuery("div#divLoading").removeClass('show');
      jQuery("#action_notice_welcome_text").notify("Welcome text is Not Updated !", "error" ,
       { position:"top" });
    }
  });
      return false;
    });

// End Welcome Text


// Start Slider Permission

    jQuery('#redux_slider_permission').on('click',function(){
      var submit_url = jQuery('#submit_url').val();
      var shop_url = jQuery("#shop_urls").val();;
      var ck_key = jQuery("#ck_key").val();
      var ck_secret = jQuery("#ck_secret").val();
      var adec_ssettings_nonce = jQuery(".adec_ssettings_nonce").text();
      var slider_permission = jQuery('input[name="obs_mobile_store[opt-slider-permission]"]:checked').val();
      var server_check =1;

      jQuery.ajax({
        url:submit_url,
        data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
        type: 'POST',
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {
          var jObject =  jQuery.parseJSON(data);
          if(jObject['success'] == 1 ){
            jQuery.ajax({
              url:ajaxurl,
              type:'POST',
              async: false,
              dataType: 'json',
              data: {
                action:'adec_plugin_slider_permission_framework',
                slider_permission:slider_permission,
                security:adec_ssettings_nonce
              },
              success: function(data){

                if(data == -1){
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_slider_permission").notify("Unauthorized Access!", "error" ,
                    { position:"top" });
                  return false;
                }

                if(data['success'] == 1 ){
                  jQuery.ajax({
                    url:submit_url,
                    type: "POST",
                    data:"slider_permission="+slider_permission+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                    crossDomain: true,
                    beforeSend:function (reqest) {
                      jQuery("div#divLoading").addClass('show');
                    },
                    success: function (data) {
                     var jObject =  jQuery.parseJSON(data);
                     jQuery("div#divLoading").removeClass('show');
                     jQuery("#action_notice_slider_permission").notify("Slider Permission Successfully Updated", "success" ,
                      { position:"top" });
                   },
                   error: function (data) {
                    jQuery("div#divLoading").removeClass('show');
                    jQuery("#action_notice_slider_permission").notify("Slider Permission is Not Updated !", "error" ,
                      { position:"top" });
                  }
                });

                }else{
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_slider_permission").notify("Slider Permission is Not Updated !", "error" ,
                    { position:"top" });
                }



                // jQuery("div#divLoading").removeClass('show');
                // jQuery("#action_notice_slider_permission").notify("Slider Permission Successfully Updated", "success" ,
                //   { position:"top" });
              },
              error: function (data,status) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_slider_permission").notify("Slider Permission is Not Updated !", "error" ,
                  { position:"top" });
              }
            });
          }else{
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_slider_permission").notify("Slider Permission is Not Updated !", "error" ,
              { position:"top" });
         }
        },
        error: function (data) {
          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_slider_permission").notify("Slider Permission is Not Updated !", "error" ,
            { position:"top" });
        }
      });
      return false; 
    });

// End Slider Permission

// Start Product Slider


    jQuery('#redux_product_slider').on('click',function(){
      var submit_url = jQuery('#submit_url').val();
      var shop_url = jQuery("#shop_urls").val();;
      var ck_key = jQuery("#ck_key").val();
      var ck_secret = jQuery("#ck_secret").val();
      var adec_pslider_nonce = jQuery(".adec_pslider_nonce").text();
      var slider_option = jQuery('input[name="obs_mobile_store[opt-radio-slider]"]:checked').val();
      var slider_image_s = jQuery('#obs_mobile_store-opt-select .select2-hidden-accessible').text();
      var slider_image = jQuery('#obs_mobile_store-opt-select .select2-chosen').text();
      var server_check =1;

      if(slider_image_s == ''){
        var slider_image_no = slider_image; 
      }else{
        var slider_image_no = slider_image_s; 
      }
      product_slider = {}
      product_slider ["slider_category"]    = slider_option;
      product_slider ["product_number"]     = slider_image_no;
      product_slider_json = JSON.stringify(product_slider);
      jQuery.ajax({
        url:submit_url,
        data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
        type: 'POST',
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {
          var jObject =  jQuery.parseJSON(data);
          if(jObject['success'] == 1 ){
            jQuery.ajax({
              url:ajaxurl,
              type:'POST',
              async: false,
              dataType: 'json',
              data: {
                action:'adec_plugin_layout_select_slider_framework',
                opt_slider_image_no:slider_image_no,
                slider_option:slider_option,
                security:adec_pslider_nonce
              },
              success: function(data){

                if(data == -1){
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_product_slider").notify("Unauthorized Access!", "error" ,
                    { position:"top" });
                  return false;
                }

                if(data['success'] == 1 ){
                  jQuery.ajax({
                    url:submit_url,
                    type: "POST",
                    data:"product_slider_json="+product_slider_json+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                    crossDomain: true,
                    beforeSend:function (reqest) {
                      jQuery("div#divLoading").addClass('show');
                    },
                    success: function (data) {
                     var jObject =  jQuery.parseJSON(data);
                     jQuery("div#divLoading").removeClass('show');
                     jQuery("#action_notice_product_slider").notify("Slider Image Number Successfully Updated", "success" ,
                      { position:"top" });
                   },
                   error: function (data) {
                    jQuery("div#divLoading").removeClass('show');
                    jQuery("#action_notice_product_slider").notify("Slider Image Number is Not Updated !", "error" ,
                      { position:"top" });
                  }
                });

                }else{
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_product_slider").notify("Slider Image Number is Not Updated !", "error" ,
                    { position:"top" });
                }




              },
              error: function (data,status) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_product_slider").notify("Slider Image Number  is Not Updated !", "error" ,
                  { position:"top" });
              }
            });
          }else{
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_product_slider").notify("Slider Image Number  is Not Updated !", "error" ,
                  { position:"top" });
          }
        },
        error: function (data) {
          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_product_slider").notify("Slider Image Number Not Updated !", "error" ,
            { position:"top" });
        }
      });
      return false;
    });


    // End Product Slider


// Start Customer Slider    

jQuery('#redux_custom_slider').on('click',function(){
  var submit_url = jQuery('#submit_url').val();
  var shop_url = jQuery("#shop_urls").val();;
  var ck_key = jQuery("#ck_key").val();
  var ck_secret = jQuery("#ck_secret").val();
  var adec_cslider_nonce = jQuery(".adec_cslider_nonce").text();
  var slider_option = jQuery('input[name="obs_mobile_store[opt-radio-slider]"]:checked').val();
  var slider_image_s = jQuery('.select2-hidden-accessible').text();
  var slider_image = jQuery('.select2-chosen').text();
  var slider_status = jQuery('input[name="obs_mobile_store[opt-slider-permission]"]:checked').val();
  var server_check =1;

  if(slider_image_s == ''){
    var slider_image_no = slider_image; 
  }else{
    var slider_image_no = slider_image_s; 
  }
  var taskArray = new Array();
  jQuery('input[name^="obs_mobile_store[opt-slides]"]').each(function() {
    taskArray.push(jQuery(this).val());
  });
  function combineObject( keys, values)
  {
    var obj = {};
    if ( keys.length != values.length)
      return null;
    for (var index in keys)
      obj[keys[index]] = values[index];
    return obj;
  };

      //alert(taskArray);
      var slide_key = ["title","description","url", "sort" ,"attachment_id","image","height","width","thumb"]; 
      var final_array = new Array();
      while (taskArray.length > 0) {
        chunk = taskArray.splice(0,8);
        chunk.splice(1, 0, "");
        var your_obj = combineObject( slide_key, chunk);
        final_array.push(your_obj);
      }
      custom_slider = JSON.stringify(final_array);
      jQuery.ajax({
        url:submit_url,
        data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
        type: 'POST',
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {
          var jObject =  jQuery.parseJSON(data);
          if(jObject['success'] == 1 ){
            jQuery.ajax({
              url:ajaxurl,
              type:'POST',
              async: false,
              dataType: 'json',
              data: {
                action:'adec_plugin_custom_slider_framework',
                custom_slider:custom_slider,
                security:adec_cslider_nonce
              },
              success: function(data){

                if(data == -1){
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_slider_image").notify("Unauthorized Access!", "error" ,
                    { position:"top" });
                  return false;
                }

                if(data['success'] == 1 ){
                  jQuery.ajax({
                    url:submit_url,
                    type: "POST",
                    data:"custom_slider="+custom_slider+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                    crossDomain: true,
                    beforeSend:function (reqest) {
                      jQuery("div#divLoading").addClass('show');
                    },
                    success: function (data) {
                     var jObject =  jQuery.parseJSON(data);
                     jQuery("div#divLoading").removeClass('show');
                     jQuery("#action_notice_slider_image").notify("Custom Slider Successfully Updated", "success" ,
                      { position:"top" });
                   },
                   error: function (data) {
                    jQuery("div#divLoading").removeClass('show');
                    jQuery("#action_notice_slider_image").notify("Custom Slider is Not Updated !", "error" ,
                      { position:"top" });
                  }
                });

                }else{
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_slider_image").notify("Custom Slider is Not Updated !", "error" ,
                    { position:"top" });
                }


                // jQuery("div#divLoading").removeClass('show');
                // jQuery("#action_notice_slider_image").notify("Slider Image Number  Successfully Updated", "success" ,
                //   { position:"top" });

              },
              error: function (data,status) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_slider_image").notify("Custom Slider  is Not Updated !", "error" ,
                  { position:"top" });
              }
            });

          }else{
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_slider_image").notify("Custom Slider  is Not Updated !", "error" ,
                  { position:"top" });
          }

        },
        error: function (data) {
          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_layout_color").notify("Custom Slider Not Updated !", "error" ,
            { position:"top" });
        }
      });
      return false;   
    });


// End Customer Slider  


// Start Section One

    jQuery('#redux_section_one').on('click',function(){
      var submit_url = jQuery('#submit_url').val();
      var shop_url = jQuery("#shop_urls").val();;
      var ck_key = jQuery("#ck_key").val();
      var ck_secret = jQuery("#ck_secret").val();
      var s_one = jQuery('#opt-select-layout-select').val();
      var adec_sone_nonce = jQuery('.adec_sone_nonce').text();
      var server_check =1;

      if (typeof s_one == 'undefined') {
    // the variable is defined
        jQuery("#action_notice_section_one").notify("Sorry you don't have any product!", "error" ,
          { position:"top" });
        return false;
      }
      if(s_one=== null){
        jQuery("#action_notice_section_one").notify("Sorry you didn't select any product!", "error" ,
          { position:"top" });
        return false;
      }
      var s_ones = s_one.toString();
      var p_one_ids = new Array();
      p_one_ids = s_ones.split(",");
      // var p_one_ids = JSON.stringify(p_one_ids);
      var section_one_permission = jQuery('input[name="obs_mobile_store[opt-custom-one-section]"]:checked').val();
      var section_one_title = jQuery('#section_one_title').val();
      if(section_one_title== ''){
        jQuery("#action_notice_section_one").notify("Sorry you didn't type any title!", "error" ,
          { position:"top" });
        return false;
      }
      var section_one_products = p_one_ids;
      section_one = {}
      section_one ["section_one_permission"]  = section_one_permission;
      section_one ["section_one_title"]     = section_one_title;
      section_one ["section_one_products"]  = p_one_ids;
      section_one_json = JSON.stringify(section_one);
      var s_one_products = JSON.stringify(p_one_ids);
      jQuery.ajax({
        url:submit_url,
        data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
        type: 'POST',
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {
          var jObject =  jQuery.parseJSON(data);
          if(jObject['success'] == 1 ){
            jQuery.ajax({
              url:ajaxurl,
              type:'POST',
              async: false,
              dataType: 'json',
              data: {
                action:'adec_plugin_section_one_framework',
                section_one_permission:section_one_permission,
                section_one_title:section_one_title,
                section_one_products:s_one_products,
                security:adec_sone_nonce
              },
              success: function(data){

                if(data == -1){
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_section_one").notify("Unauthorized Access!", "error" ,
                    { position:"top" });
                  return false;
                }
                if(data['success'] == 1 ){
                  jQuery.ajax({
                    url:submit_url,
                    type: "POST",
                    data:"section_one="+section_one_json+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                    crossDomain: true,
                    beforeSend:function (reqest) {
                      jQuery("div#divLoading").addClass('show');
                    },
                    success: function (data) {
                     var jObject =  jQuery.parseJSON(data);
                     jQuery("div#divLoading").removeClass('show');
                     jQuery("#action_notice_section_one").notify("Custom section one Successfully Updated", "success" ,
                      { position:"top" });
                   },
                   error: function (data) {
                    jQuery("div#divLoading").removeClass('show');
                    jQuery("#action_notice_section_one").notify("Custom section one is Not Updated !", "error" ,
                      { position:"top" });
                  }
                });

                }else{
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_section_one").notify("Custom section one is Not Updated !", "error" ,
                    { position:"top" });
                }


              },
              error: function (data,status) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_section_one").notify("Custom section one is Not Updated !", "error" ,
                  { position:"top" });
              }
            });

          }else{
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_section_one").notify("Custom section one is Not Updated !", "error" ,
                  { position:"top" });
          }

        },
        error: function (data) {
          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_section_one").notify("Custom section one is Not Updated !", "error" ,
            { position:"top" });
        }
      }); 
      return false;
     });

// End Section One

// Start Section two

    jQuery('#redux_section_two').on('click',function(){     
      var submit_url = jQuery('#submit_url').val();
      var shop_url = jQuery("#shop_urls").val();;
      var ck_key = jQuery("#ck_key").val();
      var ck_secret = jQuery("#ck_secret").val();
      var s_two = jQuery('#opt-select-section-two-select').val();
      var adec_stwo_nonce = jQuery('.adec_stwo_nonce').text();
      var server_check =1;

      if (typeof s_two == 'undefined') {
        // the variable is defined
        jQuery("#action_notice_section_two").notify("Sorry you don't have any product!", "error" ,
          { position:"top" });
        return false;
      }
      if(s_two=== null){
        jQuery("#action_notice_section_two").notify("Sorry you didn't select any product!", "error" ,
          { position:"top" });
        return false;
      }
      var s_twos = s_two.toString();
      var p_two_ids = new Array();
      p_two_ids = s_twos.split(",");
      var section_two_permission = jQuery('input[name="obs_mobile_store[opt-custom-two-section]"]:checked').val();
      var section_two_title = jQuery('#section_two_title').val();
      if(section_two_title== ''){
        jQuery("#action_notice_section_two").notify("Sorry you didn't type any title!", "error" ,
          { position:"top" });
        return false;
      }
      var section_two_products = p_two_ids;
      section_two = {}
      section_two ["section_two_permission"]  = section_two_permission;
      section_two ["section_two_title"]     = section_two_title;
      section_two ["section_two_products"]  = section_two_products;
      section_two_json = JSON.stringify(section_two);
      s_two_products = JSON.stringify(p_two_ids);
      jQuery.ajax({
        url:submit_url,
        data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
        type: 'POST',
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {
          var jObject =  jQuery.parseJSON(data);
          if(jObject['success'] == 1 ){
            jQuery.ajax({
              url:ajaxurl,
              type:'POST',
              async: false,
              dataType: 'json',
              data: {
                action:'adec_plugin_section_two_framework',
                section_two_permission:section_two_permission,
                section_two_title:section_two_title,
                section_two_products:s_two_products,
                security:adec_stwo_nonce
              },
              success: function(data){

                if(data == -1){
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_section_two").notify("Unauthorized Access!", "error" ,
                    { position:"top" });
                  return false;
                }
                if(data['success'] == 1 ){
                  jQuery.ajax({
                    url:submit_url,
                    type: "POST",
                    data:"section_two="+section_two_json+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                    crossDomain: true,
                    beforeSend:function (reqest) {
                      jQuery("div#divLoading").addClass('show');
                    },
                    success: function (data) {
                     var jObject =  jQuery.parseJSON(data);
                     jQuery("div#divLoading").removeClass('show');
                     jQuery("#action_notice_section_two").notify("Custom section two Successfully Updated", "success" ,
                      { position:"top" });
                   },
                   error: function (data) {
                    jQuery("div#divLoading").removeClass('show');
                    jQuery("#action_notice_section_two").notify("Custom section two is Not Updated !", "error" ,
                      { position:"top" });
                  }
                });

                }else{
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_section_two").notify("Custom section two is Not Updated !", "error" ,
                    { position:"top" });
                }

                // jQuery("div#divLoading").removeClass('show');
                // jQuery("#action_notice_section_two").notify("Custom section two  Successfully Updated", "success" ,
                //   { position:"top" });

              },
              error: function (data,status) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_section_two").notify("Custom section two is Not Updated !", "error" ,
                  { position:"top" });
              }
            });
          }else{
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_section_two").notify("Custom section two is Not Updated !", "error" ,
                  { position:"top" });
          }
        },
        error: function (data) {
          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_section_two").notify("Custom section two is Not Updated !", "error" ,
            { position:"top" });
        }
      }); 
      return false;
    });


// End Section two


// Start Section Three

    jQuery('#redux_section_three').on('click',function(){
      var submit_url = jQuery('#submit_url').val();
      var shop_url = jQuery("#shop_urls").val();;
      var ck_key = jQuery("#ck_key").val();
      var ck_secret = jQuery("#ck_secret").val();
      var s_three = jQuery('#opt-select-section-three-select').val();
      var adec_sthree_nonce = jQuery('.adec_sthree_nonce').text();
      var server_check =1;

      if (typeof s_three == 'undefined') {
    // the variable is defined
      jQuery("#action_notice_product_no").notify("Sorry you don't have any product!", "error" ,
        { position:"top" });
      return false;
      }
      if(s_three=== null){
        jQuery("#action_notice_product_no").notify("Sorry you didn't select any product!", "error" ,
          { position:"top" });
        return false;
      }
      var s_threes = s_three.toString();
      var p_three_ids = new Array();
      p_three_ids = s_threes.split(",");
      var section_three_permission = jQuery('input[name="obs_mobile_store[opt-custom-three-section]"]:checked').val();
      var section_three_title = jQuery('#section_three_title').val();

      if(section_three_title== ''){
        jQuery("#action_notice_product_no").notify("Sorry you didn't type any title!", "error" ,
          { position:"top" });
        return false;
      }
      var section_three_products = p_three_ids;
      section_three = {}
      section_three ["section_three_permission"]  = section_three_permission;
      section_three ["section_three_title"]     = section_three_title;
      section_three ["section_three_products"]  = section_three_products;
      section_three_json = JSON.stringify(section_three);
      var s_three_products =JSON.stringify(p_three_ids);
      jQuery.ajax({
        url:submit_url,
        data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
        type: 'POST',
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {
          var jObject =  jQuery.parseJSON(data);
          if(jObject['success'] == 1 ){
            jQuery.ajax({
              url:ajaxurl,
              type:'POST',
              async: false,
              dataType: 'json',
              data: {
                action:'adec_plugin_section_three_framework',
                section_three_permission:section_three_permission,
                section_three_title:section_three_title,
                section_three_products:s_three_products,
                security:adec_sthree_nonce
              },
              success: function(data){

                if(data == -1){
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_product_no").notify("Unauthorized Access!", "error" ,
                    { position:"top" });
                  return false;
                }
                if(data['success'] == 1 ){
                  jQuery.ajax({
                    url:submit_url,
                    type: "POST",
                    data:"section_three="+section_three_json+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                    crossDomain: true,
                    beforeSend:function (reqest) {
                      jQuery("div#divLoading").addClass('show');
                    },
                    success: function (data) {
                     var jObject =  jQuery.parseJSON(data);
                     jQuery("div#divLoading").removeClass('show');
                     jQuery("#action_notice_product_no").notify("Custom section Three Successfully Updated", "success" ,
                      { position:"top" });
                   },
                   error: function (data) {
                    jQuery("div#divLoading").removeClass('show');
                    jQuery("#action_notice_product_no").notify("Custom section Three is Not Updated !", "error" ,
                      { position:"top" });
                  }
                });

                }else{
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_product_no").notify("Custom section Three is Not Updated !", "error" ,
                    { position:"top" });
                }


              },
              error: function (data,status) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_product_no").notify("Custom Section Three  is Not Updated !", "error" ,
                  { position:"top" });
              }
            });
          }else{
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_product_no").notify("Custom Section Three  is Not Updated !", "error" ,
                  { position:"top" });
          }
        },
        error: function (data) {
          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_product_no").notify("Custom Section Three is Not Updated !", "error" ,
            { position:"top" });
        }
      }); 
      return false;
    });

// End Section Three

// Start Guest Checkout 

jQuery('#redux_guest_checkout').on('click',function(){
  var submit_url = jQuery('#submit_url').val();
  var shop_url = jQuery("#shop_urls").val();;
  var ck_key = jQuery("#ck_key").val();
  var ck_secret = jQuery("#ck_secret").val();
  var adec_guest_nonce = jQuery(".adec_guest_nonce").text();
  var guest_checkout = jQuery('input[name="obs_mobile_store[opt-guest-checkout]"]:checked').val();
  var server_check =1;

  jQuery.ajax({
    url:submit_url,
    data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
    type: 'POST',
    beforeSend:function (reqest) {
      jQuery("div#divLoading").addClass('show');
    },
    success: function (data) {
      var jObject =  jQuery.parseJSON(data);
      if(jObject['success'] == 1 ){
        jQuery.ajax({
          url:ajaxurl,
          type:'POST',
          async: false,
          dataType: 'json',
          data: {
            action:'adec_plugin_guest_checkout_update_framework',
            guest_checkout:guest_checkout,
            security:adec_guest_nonce
          },
          success: function(data){


            if(data == -1){
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_guest_checkout").notify("Unauthorized Access!", "error" ,
                { position:"top" });
              return false;
            }
            if(data['success'] == 1 ){
              jQuery.ajax({
                url:submit_url,
                type: "POST",
                data:"guest_checkout="+guest_checkout+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                crossDomain: true,
                beforeSend:function (reqest) {
                  jQuery("div#divLoading").addClass('show');
                },
                success: function (data) {
                 var jObject =  jQuery.parseJSON(data);
                 jQuery("div#divLoading").removeClass('show');
                 jQuery("#action_notice_guest_checkout").notify("Guest Checkout Option Successfully Updated", "success" ,
                  { position:"top" });
               },
               error: function (data) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_guest_checkout").notify("Guest Checkout Option is Not Updated !", "error" ,
                  { position:"top" });
              }
            });

            }else{
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_guest_checkout").notify("Guest Checkout Option is Not Updated !", "error" ,
                { position:"top" });
            }


          },
          error: function (data,status) {
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_guest_checkout").notify("Guest Checkout Option is Not Updated !", "error" ,
              { position:"top" });
          }
        });
      }else{
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_guest_checkout").notify("Guest Checkout Option is Not Updated !", "error" ,
              { position:"top" });
      }
    },
    error: function (data) {
      jQuery("div#divLoading").removeClass('show');
      jQuery("#action_notice_guest_checkout").notify("Guest Checkout Option Not Updated !", "error" ,
        { position:"top" });
    }
  });
  return false; 
});

// End Guest Checkout 


// Start Product Layout



    jQuery('#redux_multi_pages_layout').on('click',function(){
      var submit_url = jQuery('#submit_url').val();
      var shop_url = jQuery("#shop_urls").val();;
      var ck_key = jQuery("#ck_key").val();
      var ck_secret = jQuery("#ck_secret").val();
      var adec_layout_nonce = jQuery(".adec_layout_nonce").text();
      var layout = jQuery('input[name="obs_mobile_store[opt-radio-layout]"]:checked').val();
      var server_check =1;



      jQuery.ajax({
        url:submit_url,
        data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
        type: 'POST',
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {
          var jObject =  jQuery.parseJSON(data);
          if(jObject['success'] == 1 ){
            jQuery.ajax({
              url:ajaxurl,
              type:'POST',
              async: false,
              dataType: 'json',
              data: {
                action:'adec_plugin_layout_select_update_framework',
                obs_layout_select:layout,
                security:adec_layout_nonce
              },
              success: function(data){

                if(data == -1){
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_layout_select").notify("Unauthorized Access!", "error" ,
                    { position:"top" });
                  return false;
                }
                if(data['success'] == 1 ){
                  jQuery.ajax({
                    url:submit_url,
                    type: "POST",
                    data:"layout="+layout+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                    crossDomain: true,
                    beforeSend:function (reqest) {
                      jQuery("div#divLoading").addClass('show');
                    },
                    success: function (data) {
                     var jObject =  jQuery.parseJSON(data);
                     jQuery("div#divLoading").removeClass('show');
                     jQuery("#action_notice_layout_select").notify("Layout Successfully Updated", "success" ,
                      { position:"top" });
                   },
                   error: function (data) {
                    jQuery("div#divLoading").removeClass('show');
                    jQuery("#action_notice_layout_select").notify("Layout is Not Updated !", "error" ,
                      { position:"top" });
                  }
                });

                }else{
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_layout_select").notify("Layout is Not Updated !", "error" ,
                    { position:"top" });
                }




              },
              error: function (data,status) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_layout_select").notify("Layout  is Not Updated !", "error" ,
                  { position:"top" });
              }
            });

          }else{
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_layout_select").notify("Layout  is Not Updated !", "error" ,
                  { position:"top" });
          }
        },
        error: function (data) {
          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_layout_select").notify("Layout Re-Order Not Updated !", "error" ,
            { position:"top" });
        }
      });
      return false;      
    });

// End Product Layout  


// Start Layout Color

    jQuery('input[name="obs_mobile_store[opt-radio-layout-color]"]:checked').parent('label').addClass('radio_image');
    jQuery('input[name="obs_mobile_store[opt-radio-layout-color]"]').on('change',function(){ 
      jQuery('input[name="obs_mobile_store[opt-radio-layout-color]"]').parent('label').removeClass('radio_image');
      jQuery('input[name="obs_mobile_store[opt-radio-layout-color]"]:checked').parent('label').addClass('radio_image');
    });

    jQuery('#redux_multi_pages_color_layout').on('click',function(){
      var submit_url = jQuery('#submit_url').val();
      var shop_url = jQuery("#shop_urls").val();;
      var ck_key = jQuery("#ck_key").val();
      var ck_secret = jQuery("#ck_secret").val();
      var adec_color_nonce = jQuery(".adec_color_nonce").text();
      var layout_color = jQuery('input[name="obs_mobile_store[opt-radio-layout-color]"]:checked').val();
      var server_check =1;

      jQuery.ajax({
        url:submit_url,
        data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
        type: 'POST',
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {
          var jObject =  jQuery.parseJSON(data);
          if(jObject['success'] == 1 ){
            jQuery.ajax({
              url:ajaxurl,
              type:'POST',
              async: false,
              dataType: 'json',
              data: {
                action:'adec_plugin_layout_select_color_framework',
                opt_radio_layout_color:layout_color,
                security:adec_color_nonce,
              },
              success: function(data){

                if(data == -1){
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_layout_color").notify("Unauthorized Access!", "error" ,
                    { position:"top" });
                  return false;
                }
                if(data['success'] == 1 ){
                  jQuery.ajax({
                    url:submit_url,
                    type: "POST",
                    data:"layout_color="+layout_color+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                    crossDomain: true,
                    beforeSend:function (reqest) {
                      jQuery("div#divLoading").addClass('show');
                    },
                    success: function (data) {
                     var jObject =  jQuery.parseJSON(data);
                     jQuery("div#divLoading").removeClass('show');
                     jQuery("#action_notice_layout_color").notify("Layout Color Successfully Updated", "success" ,
                      { position:"top" });
                   },
                   error: function (data) {
                    jQuery("div#divLoading").removeClass('show');
                    jQuery("#action_notice_layout_color").notify("Layout Color is Not Updated !", "error" ,
                      { position:"top" });
                  }
                });

                }else{
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_layout_color").notify("Layout Color is Not Updated !", "error" ,
                    { position:"top" });
                }


              },
              error: function (data,status) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_layout_color").notify("Layout Color  is Not Updated !", "error" ,
                  { position:"top" });
              }
            });

          }else{
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_layout_color").notify("Layout Color  is Not Updated !", "error" ,
                  { position:"top" });
          }
        },
        error: function (data) {
          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_layout_color").notify("Layout Color Not Updated !", "error" ,
            { position:"top" });
        }
      });
      return false;
    });

// End Layout Color

// Start Products Number
    jQuery('#redux_multi_product_number').on('click',function(){
      var submit_url = jQuery('#submit_url').val();
      var shop_url = jQuery("#shop_urls").val();;
      var ck_key = jQuery("#ck_key").val();
      var ck_secret = jQuery("#ck_secret").val();
      var adec_pnum_nonce = jQuery(".adec_pnum_nonce").text();
      var slider_image_s = jQuery('#obs_mobile_store-opt-select-dd .select2-hidden-accessible').text();
      var slider_image = jQuery('#obs_mobile_store-opt-select-dd .select2-chosen').text(); 
      var server_check =1;
       
      if(slider_image_s == ''){
        var product_no = slider_image; 
      }else{
        var product_no = slider_image_s; 
      }
      jQuery.ajax({
        url:submit_url,
        data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
        type: 'POST',
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {
          var jObject =  jQuery.parseJSON(data);
          if(jObject['success'] == 1 ){
            jQuery.ajax({
              url:ajaxurl,
              type:'POST',
              async: false,
              dataType: 'json',
              data: {
                action:'adec_plugin_product_no_framework',
                product_no:product_no,
                security:adec_pnum_nonce,
              },
              success: function(data){

                if(data == -1){
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_product_nosss").notify("Unauthorized Access!", "error" ,
                    { position:"top" });
                  return false;
                }
                if(data['success'] == 1 ){
                  jQuery.ajax({
                    url:submit_url,
                    type: "POST",
                    data:"product_no="+product_no+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                    crossDomain: true,
                    beforeSend:function (reqest) {
                      jQuery("div#divLoading").addClass('show');
                    },
                    success: function (data) {
                     var jObject =  jQuery.parseJSON(data);
                     jQuery("div#divLoading").removeClass('show');
                     jQuery("#action_notice_product_nosss").notify("Product Number Color Successfully Updated", "success" ,
                      { position:"top" });
                   },
                   error: function (data) {
                    jQuery("div#divLoading").removeClass('show');
                    jQuery("#action_notice_product_nosss").notify("Product Number Color is Not Updated !", "error" ,
                      { position:"top" });
                  }
                });


                }else{
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_product_nosss").notify("Product Number Color is Not Updated !", "error" ,
                    { position:"top" });
                }


              },
              error: function (data,status) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_product_nosss").notify("Product Number is Not Updated !", "error" ,
                  { position:"top" });
              }
            });
          }else{
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_product_nosss").notify("Product Number is Not Updated !", "error" ,
                  { position:"top" });
          }
        },
        error: function (data) {
          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_product_nosss").notify("Product Number is Not Updated !", "error" ,
            { position:"top" });
        }
      });
      return false; 
    });
    
// End Products Number

// Start Select App Font

    jQuery('#redux_multi_select_font').on('click',function(){
      var submit_url = jQuery('#submit_url').val();
      var shop_url = jQuery("#shop_urls").val();;
      var ck_key = jQuery("#ck_key").val();
      var ck_secret = jQuery("#ck_secret").val();
      var adec_font_nonce = jQuery(".adec_font_nonce").text();
      var font_style_s = jQuery('#obs_mobile_store-opt-select-font .select2-hidden-accessible').text();
      var font_style = jQuery('#obs_mobile_store-opt-select-font .select2-chosen').text();
      var server_check =1;

      if(font_style_s == ''){
        var font = font_style; 
      }else{
        var font = font_style_s; 
      }

      var imagefont =  jQuery("#image_opt-select-font").attr('src');

      jQuery.ajax({
        url:submit_url,
        data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
        type: 'POST',
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {
          var jObject =  jQuery.parseJSON(data);
          if(jObject['success'] == 1 ){
            jQuery.ajax({
              url:ajaxurl,
              type:'POST',
              async: false,
              dataType: 'json',
              data: {
                action:'adec_plugin_font_update_framework',
                font:imagefont,
                security:adec_font_nonce,
              },
              success: function(data){

                if(data == -1){
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_select_font").notify("Unauthorized Access!", "error" ,
                    { position:"top" });
                  return false;
                }
                if(data['success'] == 1 ){
                  jQuery.ajax({
                    url:submit_url,
                    type: "POST",
                    data:"font="+font+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                    crossDomain: true,
                    beforeSend:function (reqest) {
                      jQuery("div#divLoading").addClass('show');
                    },
                    success: function (data) {
                     var jObject =  jQuery.parseJSON(data);
                     jQuery("div#divLoading").removeClass('show');
                     jQuery("#action_notice_select_font").notify("Font  Successfully Updated", "success" ,
                      { position:"top" });
                   },
                   error: function (data) {
                    jQuery("div#divLoading").removeClass('show');
                    jQuery("#action_notice_select_font").notify("Font  is Not Updated !", "error" ,
                      { position:"top" });
                  }
                });


                }else{
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice_select_font").notify("Font  is Not Updated !", "error" ,
                    { position:"top" });
                }


              },
              error: function (data,status) {
                jQuery("div#divLoading").removeClass('show');
                jQuery(".adec_font").text(font);
                jQuery("#action_notice_select_font").notify("Font  is Not Updated !", "error" ,
                  { position:"top" });
              }
            });
          }else{
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_select_font").notify("Font is Not Updated !", "error" ,
                { position:"top" });
          }
        },
        error: function (data) {
          jQuery("div#divLoading").removeClass('show');
          jQuery("#action_notice_select_font").notify("Font is Not Updated !", "error" ,
            { position:"top" });
        }
      });
      return false;
    });

// End Select App Font

// Start Google Analytics

jQuery('#redux_analytics').on('click',function(){
  var submit_url = jQuery('#submit_url').val();
  var shop_url = jQuery("#shop_urls").val();
  var ck_key = jQuery("#ck_key").val();
  var ck_secret = jQuery("#ck_secret").val(); 
  var google_analytics = jQuery("#opt-editor-analytics").val(); 
  var adec_analytics_nonce = jQuery(".adec_analytics_nonce").text(); 
  var server_check =1;

  var google_analytics_server = {
    "server_check": server_check,
    "shop_url": shop_url,
    "ck_key": ck_key,
    "ck_secret": ck_secret
  }; 
  var google_analytics_data = {
    "google_analytics": google_analytics,
    "shop_url": shop_url,
    "ck_key": ck_key,
    "ck_secret": ck_secret
  };                   
  jQuery.ajax({
    url:submit_url,
    type: "POST",
    dataType: "json",
    data:google_analytics_server,
    crossDomain: true,
    beforeSend:function (reqest) {
      jQuery("div#divLoading").addClass('show');
    },
    success: function (data) {
      if(data['success']==1){
        jQuery.ajax({
          url:ajaxurl,
          type:'POST',
          dataType: "json",
          data: {
            action:'adec_plugin_google_analytics_framework',
            google_analytics:google_analytics,
            security:adec_analytics_nonce,
          },
          success: function(data){

            if(data == -1){
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_google_analytics").notify("Unauthorized Access!", "error" ,
                { position:"top" });
              return false;
            }
            if(data['success'] == 1 ){
              jQuery.ajax({
                    url:submit_url,
                    type: "POST",
                    dataType: "json",
                    data:google_analytics_data,
                    crossDomain: true,
                beforeSend:function (reqest) {
                  jQuery("div#divLoading").addClass('show');
                },
                success: function (data) {
                 jQuery("div#divLoading").removeClass('show');
                 jQuery("#action_notice_google_analytics").notify("Google Analytics Successfully Updated", "success" ,
                  { position:"top" });
               },
               error: function (data) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_google_analytics").notify("Google Analytics is Not Updated !", "error" ,
                  { position:"top" });
              }
            });
            }else{
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_google_analytics").notify("Google Analytics is Not Updated !", "error" ,
                { position:"top" });
            }

          },
          error: function (data,status) {
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_google_analytics").notify("Google Analytics Code is Not Updated !", "error" ,
              { position:"top" });
          }
        });
      }else{
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_google_analytics").notify("Google Analytics Code is Not Updated !", "error" ,
              { position:"top" });
          }
    },
    error: function (data) {
      jQuery("div#divLoading").removeClass('show');
      jQuery("#action_notice_google_analytics").notify("Google Analytics Code is Not Updated !", "error" ,
        { position:"top" });
    }
  });
  return false;
});

// End Google Analytics

// Start Google Adsense

jQuery('#redux_adsense').on('click',function(){
  var submit_url = jQuery('#submit_url').val();
  var shop_url = jQuery("#shop_urls").val();
  var ck_key = jQuery("#ck_key").val();
  var ck_secret = jQuery("#ck_secret").val(); 
  var google_adsense = jQuery("#opt-editor-adsense").val(); 
  var adec_admob_nonce = jQuery(".adec_admob_nonce").text(); 
  var server_check =1;

  var google_adsense_server = {
    "server_check": server_check,
    "shop_url": shop_url,
    "ck_key": ck_key,
    "ck_secret": ck_secret
  }; 

  var google_adsense_data = {
    "google_adsense": google_adsense,
    "shop_url": shop_url,
    "ck_key": ck_key,
    "ck_secret": ck_secret
  };  

  jQuery.ajax({
    url:submit_url,
    type: "POST",
    dataType: "json",
    data:google_adsense_server,
    crossDomain: true,
    beforeSend:function (reqest) {
      jQuery("div#divLoading").addClass('show');
    },
    success: function (data) {
      if(data['success']==1){
        jQuery.ajax({
          url:ajaxurl,
          dataType: "json",
          type:'POST',
          data: {
            action:'adec_plugin_google_adsense_framework',
            google_adsense:google_adsense,
            security:adec_admob_nonce,
          },
          success: function(data){

            if(data == -1){
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_google_adsense").notify("Unauthorized Access!", "error" ,
                { position:"top" });
              return false;
            }
            if(data['success'] == 1 ){
              jQuery.ajax({
                url:submit_url,
                type: "POST",
                dataType: "json",
                data:google_adsense_data,
                crossDomain: true,
                beforeSend:function (reqest) {
                  jQuery("div#divLoading").addClass('show');
                },
                success: function (data) {
                 jQuery("div#divLoading").removeClass('show');
                 jQuery("#action_notice_google_adsense").notify("Google Admob Successfully Updated", "success" ,
                  { position:"top" });
               },
               error: function (data) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_google_adsense").notify("Google Admob is Not Updated !", "error" ,
                  { position:"top" });
              }
            });
            }else{
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_google_adsense").notify("Google Admob is Not Updated !", "error" ,
                { position:"top" });
            }

          },
          error: function (data,status) {
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_google_adsense").notify("Google Admob Code is Not Updated !", "error" ,
              { position:"top" });
          }
        });
      }else{
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_google_adsense").notify("Google Admob Code is Not Updated !", "error" ,
              { position:"top" });
          }
    },
    error: function (data) {
      jQuery("div#divLoading").removeClass('show');
      jQuery("#action_notice_google_adsense").notify("Google Admob Code is Not Updated !", "error" ,
        { position:"top" });
    }
  });
  return false;
});

// End Google Adsense


// Start Redux Contact 

jQuery('#redux_contact').on('click',function(){
  var submit_url = jQuery('#submit_url').val();
  var shop_url = jQuery("#shop_urls").val();
  var ck_key = jQuery("#ck_key").val();
  var ck_secret = jQuery("#ck_secret").val(); 
  var adec_contact_nonce = jQuery(".adec_contact_nonce").text(); 
  var contact_us = tinyMCE.activeEditor.getContent(); 
  var server_check =1;



  var contact_us_server = {
    "server_check": server_check,
    "shop_url": shop_url,
    "ck_key": ck_key,
    "ck_secret": ck_secret
  }; 

  var contact_us_data = {
    "contact_us": contact_us,
    "shop_url": shop_url,
    "ck_key": ck_key,
    "ck_secret": ck_secret
  };  

  jQuery.ajax({
    url:submit_url,
    type: "POST",
    dataType: "json",
    data:contact_us_server,
    crossDomain: true,
    beforeSend:function (reqest) {
      jQuery("div#divLoading").addClass('show');
    },
    success: function (data) {

      if(data['success']==1){

        jQuery.ajax({
          url:ajaxurl,
          type:'POST',
          dataType: "json",
          data: {
            action:'adec_plugin_contact_us_update_framework',
            obs_contact_us:contact_us,
            security:adec_contact_nonce,
          },

          success: function(data){

            if(data == -1){
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_contact_us").notify("Unauthorized Access!", "error" ,
                { position:"top" });
              return false;
            }
            if(data['success'] == 1 ){
              jQuery.ajax({
                url:submit_url,
                type: "POST",
                dataType: "json",
                data:contact_us_data,
                crossDomain: true,
                beforeSend:function (reqest) {
                  jQuery("div#divLoading").addClass('show');
                },
                success: function (data) {
                 jQuery("div#divLoading").removeClass('show');
                 jQuery("#action_notice_contact_us").notify("Contact Us Information Successfully Updated", "success" ,
                  { position:"top" });
               },
               error: function (data) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_contact_us").notify("Contact Us Information is Not Updated !", "error" ,
                  { position:"top" });
              }
            });
            }else{
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_contact_us").notify("Contact Us Information is Not Updated !", "error" ,
                { position:"top" });
            }



            // jQuery("div#divLoading").removeClass('show');
            // jQuery("#action_notice_contact_us").notify("Contact Us Information Successfully Updated","success" ,
            //   { position:"top" });
          },
          error: function (data,status) {
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_layout").notify("Contact Us Information is Not Updated !", "error" ,
              { position:"top" });
          }
        });
      }else{
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_layout").notify("Contact Us Information is Not Updated !", "error" ,
              { position:"top" });
      }
    },
    error: function (data) {
      jQuery("div#divLoading").removeClass('show');
      jQuery("#action_notice_layout").notify("Contact Us Information is Not Updated !", "error" ,
        { position:"top" });
    }
  });
  return false;
});

// End Redux Contact 

// start Select posts

jQuery('#redux_pages').on('click',function(){
  var page = jQuery('#opt-multi-select-pages-select').val();
  if(page === null){
    page_ids = '';
  }else{
    var new_page = page.toString();
    var page_ids = new Array();
    page_id = new_page.split(",");
    var page_ids = JSON.stringify(page_id);
  }
  var submit_url = jQuery('#submit_url').val();
  var shop_url = jQuery("#shop_urls").val();;
  var ck_key = jQuery("#ck_key").val();
  var ck_secret = jQuery("#ck_secret").val();
  var adec_posts_nonce = jQuery(".adec_posts_nonce").text();
  var server_check =1;

  jQuery.ajax({
    url:submit_url,
    data:"server_check="+server_check+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
    type: 'POST',
    beforeSend:function (reqest) {
      jQuery("div#divLoading").addClass('show');
    },
    success: function (data) {
      var jObject =  jQuery.parseJSON(data);
      if(jObject['success'] == 1 ){
        jQuery.ajax({
          url:ajaxurl,
          type:'POST',
          async: false,
          dataType: 'json',
          data: {
            action:'adec_plugin_page_ids_framework',
            pages_ids:page_ids,
            security:adec_posts_nonce,
          },
          success: function(data){
            if(data == -1){
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_multi_page").notify("Unauthorized Access!", "error" ,
                { position:"top" });
              return false;
            }
            if(data['success'] == 1 ){
              jQuery.ajax({
                url:submit_url,
                type: "POST",
                data:"page_ids="+page_ids+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
                crossDomain: true,
                beforeSend:function (reqest) {
                  jQuery("div#divLoading").addClass('show');
                },
                success: function (data) {
                 var jObject =  jQuery.parseJSON(data);
                 jQuery("div#divLoading").removeClass('show');
                 jQuery("#action_notice_multi_page").notify("Posts Successfully Updated", "success" ,
                  { position:"top" });
               },
               error: function (data) {
                jQuery("div#divLoading").removeClass('show');
                jQuery("#action_notice_multi_page").notify("Posts is Not Updated !", "error" ,
                  { position:"top" });
              }
            });


            }else{
              jQuery("div#divLoading").removeClass('show');
              jQuery("#action_notice_multi_page").notify("Posts is Not Updated !", "error" ,
                { position:"top" });
            }



          },
          error: function (data,status) {
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_multi_page").notify("Posts is Not Updated !", "error" ,
              { position:"top" });
          }
        });
      }else{
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_multi_page").notify("Posts is Not Updated !", "error" ,
              { position:"top" });
      }

    },
    error: function (data) {
      jQuery("div#divLoading").removeClass('show');
      jQuery("#action_notice_multi_page").notify("Posts Not Updated !", "error" ,
        { position:"top" });
    }
  });
  return false;
});

// End Select posts




    // Store Configuration Start

    jQuery('#redux').on('click',function(){
      var shop_url_check  = jQuery("#shop_urls").val();
      var ck_key_check    = jQuery("#ck_key").val();
      var ck_secret_check = jQuery("#ck_secret").val();
      var obs_logo_check  = jQuery('input[name="obs_mobile_store[obs_logo][url]"]').val();
      var surl            = jQuery("#surl").val();
      var adec_store_nonce = jQuery(".adec_store_nonce").text();


      jQuery.ajax({
        url:surl,
        type: "POST",
        data:"shop_url="+shop_url_check+"&ck_key="+ck_key_check+"&ck_secret="+ck_secret_check+"&logo="+obs_logo_check,
        crossDomain: true,
        beforeSend:function (reqest) {
          jQuery("div#divLoading").addClass('show');
        },
        success: function (data) {
          var jObject =  jQuery.parseJSON(data);
          if(jObject['success'] == 1 ){
            jQuery.ajax({
              url:ajaxurl,
              type:'POST',
              dataType:'json',
              data: {
                action:'adec_mobile_store_update_framework',
                shop_urls:shop_url_check,
                ck_key:ck_key_check,
                ck_secret:ck_secret_check,
                token:jObject['token'],
                obs_logo:obs_logo_check,
                store_status:1,
                security:adec_store_nonce,
              },
              success: function(data){
                if(data['success'] == 0){
                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice").notify("Unauthorized Access!", "error" ,
                    { position:"top" });
                  return false;
                }else{

                  jQuery("div#divLoading").removeClass('show');
                  jQuery("#action_notice").notify("Successfully Validate Consumer Key And Consumer Secret", "success" ,
                    { position:"top" });

                 location.reload();

                }


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
                store_status:store_status,
                security:adec_store_nonce,
              },
              success: function(data,status){
                jQuery("div#divLoading").removeClass('show');

                jQuery("#action_notice").notify("Consumer Key And Consumer Secret Validation Failed !", "error" ,
                  { position:"top" });
                jQuery('.redux-main').load('.redux-main');
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
// Store Configuration End










 		jQuery('#redux_check_permission').on('click',function(){
 			var submit_url = jQuery('#submit_url').val();
 			var shop_url = jQuery("#shop_urls").val();;
 			var ck_key = jQuery("#ck_key").val();
 			var ck_secret = jQuery("#ck_secret").val();
 			var check_permission = jQuery('input[name="obs_mobile_store[opt-radio-check]"]:checked').val();
      var server_check =1;

 			jQuery.ajax({
 				url:submit_url,
 				data:"check_permission="+check_permission+"&shop_url="+shop_url+"&ck_key="+ck_key+"&ck_secret="+ck_secret,
 				type: 'POST',
 				beforeSend:function (reqest) {
 					jQuery("div#divLoading").addClass('show');
 				},
 				success: function (data) {
 					var jObject =  jQuery.parseJSON(data);
 					if(jObject['success'] == 1 ){
 						jQuery.ajax({
 							url:ajaxurl,
 							type:'POST',
 							async: false,
 							dataType: 'json',
 							data: {
 								action:'Obs_check_permission_framework',
 								check_permission:check_permission
 							},
 							success: function(response,stats){
 								jQuery("div#divLoading").removeClass('show');
 								jQuery("#action_notice_check").notify("Checkout Permission  Successfully Updated", "success" ,
 									{ position:"top" });

 							},
 							error: function (data,status) {
 								jQuery("div#divLoading").removeClass('show');
 								jQuery("#action_notice_check").notify("Checkout Permission is Not Updated !", "error" ,
 									{ position:"top" });
 							}
 						});

 					}else{
            jQuery("div#divLoading").removeClass('show');
            jQuery("#action_notice_check").notify("Checkout Permission is Not Updated !", "error" ,
              { position:"top" });
          }

 				},
 				error: function (data) {
 					jQuery("div#divLoading").removeClass('show');
 					jQuery("#action_notice_check").notify("Checkout Permission Not Updated !", "error" ,
 						{ position:"top" });
 				}
 			});
 			return false;

 		});








});






