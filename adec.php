<?php
/**
 *
 * @link              http://adecapp.com
 * @since             1.0.2
 * @package           ADEC Mobile Store Plugin
 *
 * @wordpress-plugin
 * Plugin Name:       ADEC (Advanced Dynamic E-Commerce)
 * Plugin URI:        http://adecapp.com
 * Description:       Adec is a marvelous way to convert your web into an android application. IT eliminates all the hassle about developing an app for your business in a real quick manner. And you don't have to worry about spending anything. Try it for free as long as you need.
 * Version:           1.0.2
 * Author:            Mann-IT
 * Author URI:        http://adecapp.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wc-mobile-store
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

    /**
     * The class responsible for defining all actions that occur in the admin area
     * 
     */
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
include_once( ABSPATH . 'wp-includes/pluggable.php' );

add_action('wp_ajax_adec_mobile_store_update_framework', 'adec_mobile_store_update_framework');

add_action('wp_ajax_adec_plugin_paypal_integration_update_framework', 'adec_plugin_paypal_integration_update_framework');

add_action('wp_ajax_adec_plugin_layout_reorder_update_framework', 'adec_plugin_layout_reorder_update_framework');

add_action('wp_ajax_adec_plugin_shop_location_update_framework', 'adec_plugin_shop_location_update_framework');

add_action('wp_ajax_adec_plugin_banner_permission_framework', 'adec_plugin_banner_permission_framework');

add_action('wp_ajax_adec_plugin_banner_upload_framework', 'adec_plugin_banner_upload_framework');

add_action('wp_ajax_adec_plugin_welcome_permission_framework', 'adec_plugin_welcome_permission_framework');

add_action('wp_ajax_adec_plugin_welcome_text_framework', 'adec_plugin_welcome_text_framework');

add_action('wp_ajax_adec_plugin_slider_permission_framework', 'adec_plugin_slider_permission_framework');

add_action('wp_ajax_adec_plugin_layout_select_slider_framework', 'adec_plugin_layout_select_slider_framework');

add_action('wp_ajax_adec_plugin_custom_slider_framework', 'adec_plugin_custom_slider_framework');

add_action('wp_ajax_adec_plugin_section_one_framework', 'adec_plugin_section_one_framework');

add_action('wp_ajax_adec_plugin_section_two_framework', 'adec_plugin_section_two_framework');

add_action('wp_ajax_adec_plugin_section_three_framework', 'adec_plugin_section_three_framework');

add_action('wp_ajax_adec_plugin_guest_checkout_update_framework', 'adec_plugin_guest_checkout_update_framework');

add_action('wp_ajax_adec_plugin_layout_select_update_framework', 'adec_plugin_layout_select_update_framework');

add_action('wp_ajax_adec_plugin_layout_select_color_framework', 'adec_plugin_layout_select_color_framework');

add_action('wp_ajax_adec_plugin_product_no_framework', 'adec_plugin_product_no_framework');

add_action('wp_ajax_adec_plugin_font_update_framework', 'adec_plugin_font_update_framework');

add_action('wp_ajax_adec_plugin_google_analytics_framework', 'adec_plugin_google_analytics_framework');

add_action('wp_ajax_adec_plugin_google_adsense_framework', 'adec_plugin_google_adsense_framework');

add_action('wp_ajax_adec_plugin_contact_us_update_framework', 'adec_plugin_contact_us_update_framework');

add_action('wp_ajax_adec_plugin_page_ids_framework', 'adec_plugin_page_ids_framework');


function adec_mobile_store_update_framework(){

  if( current_user_can( 'administrator' ) ){

    if ( !check_ajax_referer( 'adec-store-nonce', 'security', false ) ) die('{"success":0}');

    $data = get_option( 'obs_mobile_store' );
    $data['shop_urls'] = esc_url($_POST['shop_urls']);
    $data['token'] = sanitize_text_field($_POST['token']);
    $data['ck_key'] = sanitize_text_field( $_POST['ck_key']);
    $data['ck_secret'] = sanitize_text_field($_POST['ck_secret']);
    $data['obs_logo']['url'] = esc_url($_POST['obs_logo']);
    $data['obs_logo']['thumbnail'] =sanitize_text_field($_POST['obs_logo']);

    add_option( 'obs_mobile_store', $data );
    update_option( 'obs_mobile_store', $data );

    if(isset($_POST['shop_urls']) && !empty($_POST['shop_urls'])){
      $shop_urls  = esc_url($_POST['shop_urls']);
      add_option( 'shop_urls', $shop_urls);
      update_option( 'shop_urls', $shop_urls);
    }

    if(isset($_POST['store_status']) && !empty($_POST['store_status'])){
      $store_status   = sanitize_text_field($_POST['store_status']);
      update_option( 'store_status', $store_status);
      add_option( 'store_status', $store_status);
      $data['store_status'] = sanitize_text_field($_POST['store_status']);
      add_option( 'obs_mobile_store', $data );
      update_option( 'obs_mobile_store', $data );
    }
    $success = array('success'=> 1);
    echo json_encode($success);
    die(); 
  }else{
   $success = array('success'=> 0);
   echo json_encode($success);
   die(); 
  }  

}

function adec_plugin_paypal_integration_update_framework(){
      if( current_user_can( 'administrator' ) ){
          if ( !check_ajax_referer( 'referer-paypal-ajax', 'security', false ) ) die('{"success":0}');
           $obs_paypal_client_id = sanitize_text_field( $_POST['client_id'] ) ;
           $data = get_option( 'obs_mobile_store' );
           $data['obs_paypal_client_id'] = $obs_paypal_client_id;
           add_option( 'obs_mobile_store', $data );
           update_option( 'obs_mobile_store', $data );
           $success = array('success'=> 1);
           echo json_encode($success);
           die(); 
      }else{
         $success = array('success'=> 0);
         echo json_encode($success);
         die(); 
      }      
}

function adec_plugin_layout_reorder_update_framework(){
      if( current_user_can( 'administrator' ) ){
        if ( !check_ajax_referer( 'referer-reorder-ajax', 'security', false ) ) die('{"success":0}');
        $obs_layout_reorder = sanitize_text_field( wp_kses_stripslashes( $_POST['obs_layout_reorder'] ) ) ;
        $layout_array = json_decode($obs_layout_reorder);
        $data = get_option( 'obs_mobile_store' );
        $data['opt-homepage-layout']['Layout Reorder'] = $layout_array;
        add_option( 'obs_mobile_store', $data );
        update_option( 'obs_mobile_store', $data );
        $success = array('success'=> 1);
        echo json_encode($success);
        die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     }  
}

function adec_plugin_shop_location_update_framework(){
     if( current_user_can( 'administrator' ) ){
      if ( !check_ajax_referer( 'adec-location-nonce', 'security', false ) ) die('{"success":0}');

          $latitude =  sanitize_text_field($_POST['latitude']);
          $lognitude = sanitize_text_field($_POST['lognitude']);
          $address =  sanitize_text_field($_POST['address']);
          $data = get_option( 'obs_mobile_store' );
          $data['obs_shop_latitude'] = $latitude;
          $data['obs_shop_longitude'] = $lognitude;
          $data['obs_shop_address'] = $address;
          add_option( 'obs_mobile_store', $data );
          update_option( 'obs_mobile_store', $data );
          $success = array('success'=> 1);
          echo json_encode($success);
          die(); 
    }else{
     $success = array('success'=> 0);
     echo json_encode($success);
     die(); 
   }
}

function adec_plugin_banner_permission_framework(){
        if( current_user_can( 'administrator' ) ){
          if ( !check_ajax_referer( 'adec-banner-nonce', 'security', false ) ) die('{"success":0}');
          $banner_permission = sanitize_text_field( $_POST['banner_permission']) ;
          $data = get_option('obs_mobile_store' );
          $data['opt-app-banner'] = $banner_permission;
          add_option( 'obs_mobile_store', $data );
          update_option( 'obs_mobile_store', $data );
          $success = array('success'=> 1);
          echo json_encode($success);
          die(); 
         }else{
           $success = array('success'=> 0);
           echo json_encode($success);
           die(); 
         }      
}

function adec_plugin_banner_upload_framework(){
      if( current_user_can( 'administrator' ) ){
          if ( !check_ajax_referer( 'adec-bupload-nonce', 'security', false ) ) die('{"success":0}');
          $banner_upload = sanitize_text_field( $_POST['banner_upload'] );
          $banner_id = sanitize_text_field($_POST['banner_id']);
          $banner_height =sanitize_text_field( $_POST['banner_height']) ;
          $banner_width = sanitize_text_field($_POST['banner_width'] );
          $banner_thumbnail = sanitize_text_field( $_POST['banner_thumbnail']);
          $data = get_option('obs_mobile_store' );
          $data['opt-media-banner']['url'] = $banner_upload;
          $data['opt-media-banner']['id'] = $banner_id;
          $data['opt-media-banner']['height'] = $banner_height;
          $data['opt-media-banner']['width'] = $banner_width;
          $data['opt-media-banner']['thumbnail'] = $banner_thumbnail;
          add_option( 'obs_mobile_store', $data );
          update_option( 'obs_mobile_store', $data );
          $success = array('success'=> 1);
          echo json_encode($success);
          die(); 
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     }
}

function adec_plugin_welcome_permission_framework(){
      if( current_user_can( 'administrator' ) ){
        if ( !check_ajax_referer( 'adec-wpermission-nonce', 'security', false ) ) die('{"success":0}');

            $welcome_permission = sanitize_text_field($_POST['welcome_permission']);
            $data = get_option('obs_mobile_store' );
            $data['opt-app-welcome'] = $welcome_permission;
            add_option( 'obs_mobile_store', $data );
            update_option( 'obs_mobile_store', $data );
            $success = array('success'=> 1);
            echo json_encode($success);
            die();

      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     }       
  
}

function adec_plugin_welcome_text_framework(){
      if( current_user_can( 'administrator' ) ){
        if ( !check_ajax_referer( 'adec-wtext-nonce', 'security', false ) ) die('{"success":0}');
          $welcome_text = wp_kses_post($_POST['welcome_text']);
          $data = get_option('obs_mobile_store' );
          $data['opt-welcomes'] = $welcome_text;
          add_option( 'obs_mobile_store', $data );
          update_option( 'obs_mobile_store', $data );
          $success = array('success'=> 1);
          echo json_encode($success);
          die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     }      

}

function adec_plugin_slider_permission_framework(){
      if( current_user_can( 'administrator' ) ){
        if ( !check_ajax_referer( 'adec-ssettings-nonce', 'security', false ) ) die('{"success":0}');
        $slider_permission = sanitize_text_field($_POST['slider_permission']) ;
        $data = get_option('obs_mobile_store' );
        $data['opt-slider-permission'] = $slider_permission;
        add_option( 'obs_mobile_store', $data );
        update_option( 'obs_mobile_store', $data );
        $success = array('success'=> 1);
        echo json_encode($success);
        die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     }       
}

function adec_plugin_layout_select_slider_framework(){
      if( current_user_can( 'administrator' ) ){
         if ( !check_ajax_referer( 'adec-pslider-nonce', 'security', false ) ) die('{"success":0}');

          (int) $opt_slider_image_no = sanitize_text_field( $_POST['opt_slider_image_no'] );
          $slider_option = sanitize_text_field($_POST['slider_option']) ;
          $data = get_option( 'obs_mobile_store' );
          $data['opt-select']= $opt_slider_image_no;
          $data['opt-radio-slider']= $slider_option;
          add_option( 'obs_mobile_store', $data );
          update_option( 'obs_mobile_store', $data );
          $success = array('success'=> 1);
          echo json_encode($success);
          die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     }       
}

function adec_plugin_custom_slider_framework(){
      if( current_user_can( 'administrator' ) ){
        if ( !check_ajax_referer( 'adec-cslider-nonce', 'security', false ) ) die('{"success":0}');
            $custom_slider =sanitize_text_field( wp_kses_stripslashes( $_POST['custom_slider'] ) ) ;
            $data = get_option('obs_mobile_store' );
            $data['opt-slides'] = json_decode($custom_slider,true);
            add_option( 'obs_mobile_store', $data );
            update_option( 'obs_mobile_store', $data );
            $success = array('success'=> 1);
            echo json_encode($success);
            die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     } 
}

function adec_plugin_section_one_framework(){
      if( current_user_can( 'administrator' ) ){
         if ( !check_ajax_referer( 'adec-sone-nonce', 'security', false ) ) die('{"success":0}');
            $section_one_products = sanitize_text_field(wp_kses_stripslashes( $_POST['section_one_products'] )) ;
            $section_one_product = json_decode($section_one_products);
            $section_one_permission = sanitize_text_field( $_POST['section_one_permission']);
            $section_one_title = sanitize_text_field($_POST['section_one_title']);
            $data = get_option( 'obs_mobile_store' );
            $data['opt-custom-one-section'] = $section_one_permission;
            $data['section_one_title'] = $section_one_title;
            $data['opt-select-layout'] = $section_one_product;
            add_option( 'obs_mobile_store', $data );
            update_option( 'obs_mobile_store', $data );
            $success = array('success'=> 1);
            echo json_encode($success);
            die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     } 
}

function adec_plugin_section_two_framework(){
      if( current_user_can( 'administrator' ) ){
         if ( !check_ajax_referer( 'adec-stwo-nonce', 'security', false ) ) die('{"success":0}');
            $section_two_products = sanitize_text_field(wp_kses_stripslashes( $_POST['section_two_products'] ) );
            $section_two_product = json_decode($section_two_products);
            $section_two_permission = sanitize_text_field( $_POST['section_two_permission']);
            $section_two_title = sanitize_text_field( $_POST['section_two_title']);
            $data = get_option( 'obs_mobile_store' );
            $data['opt-custom-two-section'] = $section_two_permission;
            $data['section_two_title'] = $section_two_title;
            $data['opt-select-section-two'] = $section_two_product;
            add_option( 'obs_mobile_store', $data );
            update_option( 'obs_mobile_store', $data );
            $success = array('success'=> 1);
            echo json_encode($success);
            die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     } 
}

function adec_plugin_section_three_framework(){
      if( current_user_can( 'administrator' ) ){
      if ( !check_ajax_referer( 'adec-sthree-nonce', 'security', false ) ) die('{"success":0}');
      $section_three_products = sanitize_text_field(wp_kses_stripslashes( $_POST['section_three_products'] )) ;
      $section_three_product = json_decode($section_three_products);
      $section_three_permission = sanitize_text_field( $_POST['section_three_permission']);
      $section_three_title = sanitize_text_field($_POST['section_three_title']);
      $data = get_option( 'obs_mobile_store' );
      $data['opt-custom-three-section'] = $section_three_permission;
      $data['section_three_title'] = $section_three_title;
      $data['opt-select-section-three'] = $section_three_product;
      add_option( 'obs_mobile_store', $data );
      update_option( 'obs_mobile_store', $data );
      $success = array('success'=> 1);
      echo json_encode($success);
      die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     }   
}

function adec_plugin_guest_checkout_update_framework(){
    if( current_user_can( 'administrator' ) ){
      if ( !check_ajax_referer( 'adec-guest-nonce', 'security', false ) ) die('{"success":0}');        
      $guest_checkout = sanitize_text_field($_POST['guest_checkout']);
      $data = get_option('obs_mobile_store' );
      $data['opt-guest-checkout'] = $guest_checkout;
      add_option( 'obs_mobile_store', $data );
      update_option( 'obs_mobile_store', $data );
      $success = array('success'=> 1);
      echo json_encode($success);
      die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     } 
}

function adec_plugin_layout_select_update_framework(){
    if( current_user_can( 'administrator' ) ){
      if ( !check_ajax_referer( 'adec-layout-nonce', 'security', false ) ) die('{"success":0}');
      $layout_select = sanitize_text_field($_POST['obs_layout_select']);
      $data = get_option( 'obs_mobile_store' );
      $data['opt-radio-layout']= $layout_select;
      add_option( 'obs_mobile_store', $data );
      update_option( 'obs_mobile_store', $data );
      $success = array('success'=> 1);
      echo json_encode($success);
      die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     } 
}

function adec_plugin_layout_select_color_framework(){
      if( current_user_can( 'administrator' ) ){
        if ( !check_ajax_referer( 'adec-color-nonce', 'security', false ) ) die('{"success":0}');
        $opt_radio_layout_color =sanitize_text_field( $_POST['opt_radio_layout_color'] ) ;
        $data = get_option( 'obs_mobile_store' );
        $data['opt-radio-layout-color'] = $opt_radio_layout_color;
        add_option( 'obs_mobile_store', $data );
        update_option( 'obs_mobile_store', $data );
        $success = array('success'=> 1);
        echo json_encode($success);
        die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     }
}

function adec_plugin_product_no_framework(){
      if( current_user_can( 'administrator' ) ){
        if ( !check_ajax_referer( 'adec-pnum-nonce', 'security', false ) ) die('{"success":0}');        
        $product_no = sanitize_text_field( $_POST['product_no']) ;
        $data = get_option( 'obs_mobile_store' );
        $data['opt-select-dd'] = $product_no;
        add_option( 'obs_mobile_store', $data );
        update_option( 'obs_mobile_store', $data );
        $success = array('success'=> 1);
        echo json_encode($success);
        die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     }
}

function adec_plugin_font_update_framework(){
      if( current_user_can( 'administrator' ) ){
        if ( !check_ajax_referer( 'adec-font-nonce', 'security', false ) ) die('{"success":0}');       
        $font = $_POST['font'] ;
        $data = get_option('obs_mobile_store' );
        $data['opt-select-font'] = $font;
        add_option( 'obs_mobile_store', $data );
        update_option( 'obs_mobile_store', $data );
        $success = array('success'=> 1);
        echo json_encode($success);
        die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     }
}

function adec_plugin_google_analytics_framework(){
      if( current_user_can( 'administrator' ) ){
        if ( !check_ajax_referer( 'adec-analytics-nonce', 'security', false ) ) die('{"success":0}'); 
        $google_analytics = sanitize_text_field($_POST['google_analytics']);
        $data = get_option( 'obs_mobile_store' );
        $data['opt-editor-analytics'] = $google_analytics;
        add_option( 'obs_mobile_store', $data );
        update_option( 'obs_mobile_store', $data );
        $success = array('success'=> 1);
        echo json_encode($success);
        die(); 
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     }      
}

function adec_plugin_google_adsense_framework(){
      if( current_user_can( 'administrator' ) ){
      if ( !check_ajax_referer( 'adec-admob-nonce', 'security', false ) ) die('{"success":0}');
        $google_adsense = sanitize_text_field($_POST['google_adsense']);
        $data = get_option( 'obs_mobile_store' );
        $data['opt-editor-adsense'] = $google_adsense;
        add_option( 'obs_mobile_store', $data );
        update_option( 'obs_mobile_store', $data );
        $success = array('success'=> 1);
        echo json_encode($success);
        die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     }       
}

function adec_plugin_contact_us_update_framework(){
      if( current_user_can( 'administrator' ) ){
        if ( !check_ajax_referer( 'adec-contact-nonce', 'security', false ) ) die('{"success":0}');
        $obs_contact_us = wp_kses_post($_POST['obs_contact_us']);
        $data = get_option( 'obs_mobile_store' );
        $data['opt-editor-contact'] = $obs_contact_us;
        add_option( 'obs_mobile_store', $data );
        update_option( 'obs_mobile_store', $data );
        $success = array('success'=> 1);
        echo json_encode($success);
        die();
        }else{
         $success = array('success'=> 0);
         echo json_encode($success);
         die(); 
       }       
}

function adec_plugin_page_ids_framework(){
      if( current_user_can( 'administrator' ) ){
        if ( !check_ajax_referer( 'adec-posts-nonce', 'security', false ) ) die('{"success":0}');
        $pages_ids = sanitize_text_field(wp_kses_stripslashes( $_POST['pages_ids'] ) );
        $page = json_decode($pages_ids);
        $data = get_option( 'obs_mobile_store' );
        $data['opt-multi-select-pages'] = $page;
        add_option( 'obs_mobile_store', $data );
        update_option( 'obs_mobile_store', $data );
        $success = array('success'=> 1);
        echo json_encode($success);
        die();
      }else{
       $success = array('success'=> 0);
       echo json_encode($success);
       die(); 
     }
}

if ( ! class_exists( 'ReduxFramework_extension_vendor_support' ) ) {
  if ( file_exists( dirname( __FILE__ ) . '/vendor_support/extension_vendor_support.php' ) ) {
    require dirname( __FILE__ ) . '/vendor_support/extension_vendor_support.php';
    new ReduxFramework_extension_vendor_support();
  }
}

/** remove redux menu under the tools **/
add_action( 'admin_menu', 'adec_plugin_special_remove_redux_menu',12 );
function adec_plugin_special_remove_redux_menu() {
    remove_submenu_page('tools.php','redux-about');
}

add_action( 'admin_enqueue_scripts', 'adec_plugin_special_custom_enqueue_script' );
function adec_plugin_special_custom_enqueue_script( $hook_suffix ) {

    wp_enqueue_script( 'adec-my-script', plugins_url('admin/js/my-script.js', __FILE__ ), array( 'wp-color-picker' ), false, true );
    wp_enqueue_script('adec-gmap-api', 'https://maps.google.com/maps/api/js?key=AIzaSyBcVcz5OZ6eNBi5d7CFYHIdtsEI5BQlm68&callback=initMap', array('jquery'), '20161019', true);
}

/**
 * This portion initiated all plugin menu and sub-menu
 * This action is documented in includes/class-plugin-name-activator.php
 */

require_once ('redux-framework/ReduxCore/framework.php');


require_once ('redux-framework/sample/config.php');



add_action( 'init', 'adec_store_plugin_provide_wp_api_featured_images_init', 12 );

function adec_store_plugin_provide_wp_api_featured_images_init() {

  $post_types = get_post_types( array( 'public' => true ), 'objects' );

  foreach ( $post_types as $post_type ) {

    $post_type_name     = $post_type->name;
    $show_in_rest       = ( isset( $post_type->show_in_rest ) && $post_type->show_in_rest ) ? true : false;
    $supports_thumbnail = post_type_supports( $post_type_name, 'thumbnail' );

    // Only proceed if the post type is set to be accessible over the REST API
    // and supports featured images.
    if ( $show_in_rest && $supports_thumbnail ) {

      // Compatibility with the REST API v2 beta 9+
      if ( function_exists( 'register_rest_field' ) ) {
        register_rest_field( $post_type_name,
          'better_featured_image',
          array(
            'get_callback' => 'adec_store_plugin_wp_rest_api_featured_images_get_field',
            'schema'       => null,
          )
        );
      } elseif ( function_exists( 'register_api_field' ) ) {
        register_api_field( $post_type_name,
          'better_featured_image',
          array(
            'get_callback' => 'adec_store_plugin_wp_rest_api_featured_images_get_field',
            'schema'       => null,
          )
        );
      }
    }
  }
}


function adec_store_plugin_wp_rest_api_featured_images_get_field( $object, $field_name, $request ) {

  // Only proceed if the post has a featured image.
  if ( ! empty( $object['featured_media'] ) ) {
    $image_id = (int)$object['featured_media'];
  } elseif ( ! empty( $object['featured_image'] ) ) {
    // This was added for backwards compatibility with < WP REST API v2 Beta 11.
    $image_id = (int)$object['featured_image'];
  } else {
    return null;
  }

  $image = get_post( $image_id );

  if ( ! $image ) {
    return null;
  }

  // This is taken from WP_REST_Attachments_Controller::prepare_item_for_response().
  $featured_image['id']            = $image_id;
  $featured_image['alt_text']      = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
  $featured_image['caption']       = $image->post_excerpt;
  $featured_image['description']   = $image->post_content;
  $featured_image['media_type']    = wp_attachment_is_image( $image_id ) ? 'image' : 'file';
  $featured_image['media_details'] = wp_get_attachment_metadata( $image_id );
  $featured_image['post']          = ! empty( $image->post_parent ) ? (int) $image->post_parent : null;
  $featured_image['source_url']    = wp_get_attachment_url( $image_id );

  if ( empty( $featured_image['media_details'] ) ) {
    $featured_image['media_details'] = new stdClass;
  } elseif ( ! empty( $featured_image['media_details']['sizes'] ) ) {
    $img_url_basename = wp_basename( $featured_image['source_url'] );
    foreach ( $featured_image['media_details']['sizes'] as $size => &$size_data ) {
      $image_src = wp_get_attachment_image_src( $image_id, $size );
      if ( ! $image_src ) {
        continue;
      }
      $size_data['source_url'] = $image_src[0];
    }
  } elseif ( is_string( $featured_image['media_details'] ) ) {
    // This was added to work around conflicts with plugins that cause
    // wp_get_attachment_metadata() to return a string.
    $featured_image['media_details'] = new stdClass();
    $featured_image['media_details']->sizes = new stdClass();
  } else {
    $featured_image['media_details']['sizes'] = new stdClass;
  }

  return apply_filters( 'better_rest_api_featured_image', $featured_image, $image_id );
}



/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-plugin-name-activator.php
 */
function adec_store_plugin_activate_plugin_name() {
     require_once plugin_dir_path( __FILE__ ) . 'includes/class-adec-store-plugin-activator.php';
     ADEC_Plugin_Store_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-plugin-name-deactivator.php
 */
function adec_store_plugin_deactivate_plugin_name() {
     require_once plugin_dir_path( __FILE__ ) . 'includes/class-adec-store-plugin-deactivator.php';
     ADEC_Plugin_Store_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'adec_store_plugin_activate_plugin_name' );
register_deactivation_hook( __FILE__, 'adec_store_plugin_deactivate_plugin_name' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */

require plugin_dir_path( __FILE__ ) . 'includes/class-adec-store-plugin.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function adec_store_plugin_run_plugin_name() {

     $plugin = new ADEC_Plugin_Store_Main();
     $plugin->run();

}
adec_store_plugin_run_plugin_name();




