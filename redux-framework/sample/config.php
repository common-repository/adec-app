<?php
    /**
     * ReduxFramework Sample Config File
     * For full documentation, please visit: http://docs.reduxframework.com/
     */

    if ( ! class_exists( 'Redux' ) ) {
        return;
    }


    // This is your option name where all the Redux data is stored.
    $opt_name = "obs_mobile_store";

    // This line is only for altering the demo. Can be easily removed.
    $opt_name = apply_filters( 'redux_demo/opt_name', $opt_name );

     global $obs_mobile_store;
     $obs_mobile_store = get_option('obs_mobile_store');

     $font = $obs_mobile_store['opt-select-font'];

     if(isset($font)&&!empty($font)){
        $font = "Your current selectetd font is <Strong><spna class='adec_font'>".$font."</spna></Strong>";
     }else{
        $font = ""; 
     }

    /*
     *
     * --> Used within different fields. Simply examples. Search for ACTUAL DECLARATION for field examples
     *
     */

    // $ajax_nonce = wp_create_nonce( "my-special-string" );


    $c_url = 'https://adecapp.com/dynamic_apk/token_insert/token.php'; 
    $submit_url = 'https://adecapp.com/dynamic_apk/token_insert/pages.php';

    //require_once file_get_contents(dirname(__FILE__) . '/class-admin-url.php';

    $sampleHTML = '';
    if ( file_exists( dirname( __FILE__ ) . '/info-html.html' ) ) {
        Redux_Functions::initWpFilesystem();

        global $wp_filesystem;

        $sampleHTML = $wp_filesystem->get_contents( dirname( __FILE__ ) . '/info-html.html' );
    }
    // Background Patterns Reader
    $sample_patterns_path = ReduxFramework::$_dir . '../sample/patterns/';
    $sample_patterns_url  = ReduxFramework::$_url . '../sample/patterns/';
    $sample_patterns      = array();
    
    if ( is_dir( $sample_patterns_path ) ) {

        if ( $sample_patterns_dir = opendir( $sample_patterns_path ) ) {
            $sample_patterns = array();

            while ( ( $sample_patterns_file = readdir( $sample_patterns_dir ) ) !== false ) {

                if ( stristr( $sample_patterns_file, '.png' ) !== false || stristr( $sample_patterns_file, '.jpg' ) !== false ) {
                    $name              = explode( '.', $sample_patterns_file );
                    $name              = str_replace( '.' . end( $name ), '', $sample_patterns_file );
                    $sample_patterns[] = array(
                        'alt' => $name,
                        'img' => $sample_patterns_url . $sample_patterns_file
                    );
                }
            }
        }
    }
    /**
     * ---> SET ARGUMENTS
     * All the possible arguments for Redux.
     * For full documentation on arguments, please refer to: https://github.com/ReduxFramework/ReduxFramework/wiki/Arguments
     * */

    $theme = wp_get_theme(); // For use with some settings. Not necessary.

    $args = array(
        // TYPICAL -> Change these values as you need/desire
        'opt_name'             => $opt_name,
        // This is where your data is stored in the database and also becomes your global variable name.
        'display_name'         => 'ADEC Plugin',
        // Name that appears at the top of your panel
        'display_version'      => '1.0',
        // Version that appears at the top of your panel
        'menu_type'            => 'menu',
        //Specify if the admin menu should appear or not. Options: menu or submenu (Under appearance only)
        'allow_sub_menu'       => true,
        // Show the sections below the admin menu item or not
        'menu_title'           => __( 'ADEC', 'redux-framework-demo' ),
        'page_title'           => __( 'ADEC', 'redux-framework-demo' ),
        // You will need to generate a Google API key to use this featrue.
        // Please visit: https://developers.google.com/fonts/docs/developer_api#Auth
        'google_api_key'       => '',
        // Set it you want google fonts to update weekly. A google_api_key value is required.
        'google_update_weekly' => false,
        // Must be defined to add google fonts to the typography module
        'async_typography'     => true,
        // Use a asynchronous font on the front end or font string
        //'disable_google_fonts_link' => true,                    // Disable this in case you want to create your own google fonts loader
        'admin_bar'            => false,
        // Show the panel pages on the admin bar
        'admin_bar_icon'       => 'dashicons-cart',
        // Choose an icon for the admin bar menu
        'admin_bar_priority'   => 50,
        // Choose an priority for the admin bar menu
        'global_variable'      => '',
        // Set a different name for your global variable other than the opt_name
        'dev_mode'             => false,
        // Show the time the page took to load, etc
        'update_notice'        => false,
        // If dev_mode is enabled, will notify developer of updated versions available in the GitHub Repo
        'customizer'           => true,
        // Enable basic customizer support
        //'open_expanded'     => true,                    // Allow you to start the panel in an expanded way initially.
        //'disable_save_warn' => true,                    // Disable the save warning when a user changes a field

        // OPTIONAL -> Give you extra featrues
        'page_priority'        => null,
        // Order where the menu appears in the admin area. If there is any conflict, something will not show. Warning.
        'page_parent'          => 'themes.php',
        // For a full list of options, visit: http://codex.wordpress.org/Function_Reference/add_submenu_page#Parameters
        'page_permissions'     => 'manage_options',
        // Permissions needed to access the options panel.
        'menu_icon'            => ReduxFramework::$_url.'/assets/img/icon.png',
        // Specify a custom URL to an icon
        'last_tab'             => '',
        // Force your panel to always open to a specific tab (by id)
        'page_icon'            => 'dashicons-cart',
        // Icon displayed in the admin panel next to your menu_title
        'page_slug'            => '',
        // Page slug used to denote the panel, will be based off page title then menu title then opt_name if not provided
        'save_defaults'        => true,
        // On load save the defaults to DB before user clicks save or not
        'default_show'         => false,
        // If true, shows the default value next to each field that is not the default value.
        'default_mark'         => '',
        // What to print by the field's title if the value shown is default. Suggested: *
        'show_import_export'   => false,
        // Shows the Import/Export panel when not used as a field.

        // CAREFUL -> These options are for advanced use only
        'transient_time'       => 60 * MINUTE_IN_SECONDS,
        'output'               => true,
        // Global shut-off for dynamic CSS output by the framework. Will also disable google fonts output
        'output_tag'           => true,
        // Allows dynamic CSS to be generated for customizer and google fonts, but stops the dynamic CSS from going to the head
        // 'footer_credit'     => '',                   // Disable the footer credit of Redux. Please leave if you can help it.

        // FUtrue -> Not in use yet, but reserved or partially implemented. Use at your own risk.
        'database'             => '',
        // possible: options, theme_mods, theme_mods_expanded, transient. Not fully functional, warning!
        'use_cdn'              => false,
        // If you prefer not to use the CDN for Select2, Ace Editor, and others, you may download the Redux Vendor Support plugin yourself and run locally or embed it in your code.

        // HINTS
        'hints'                => array(
            'icon'          => 'el el-question-sign',
            'icon_position' => 'right',
            'icon_color'    => 'lightgray',
            'icon_size'     => 'normal',
            'tip_style'     => array(
                'color'   => 'red',
                'shadow'  => true,
                'rounded' => false,
                'style'   => '',
            ),
            'tip_position'  => array(
                'my' => 'top left',
                'at' => 'bottom right',
            ),
            'tip_effect'    => array(
                'show' => array(
                    'effect'   => 'slide',
                    'duration' => '500',
                    'event'    => 'mouseover',
                ),
                'hide' => array(
                    'effect'   => 'slide',
                    'duration' => '500',
                    'event'    => 'click mouseleave',
                ),
            ),
        )
    );


   // $ajax_nonce = wp_create_nonce( "my-special-string" );


    // $args['admin_bar_links'][] = array(
    //     'id'    => 'redux-docs',
    //     'href'  => 'http://docs.reduxframework.com/',
    //     'title' => __( 'Documentation', 'redux-framework-demo' ),
    //     );

    // $args['admin_bar_links'][] = array(
    //         //'id'    => 'redux-support',
    //     'href'  => 'https://github.com/ReduxFramework/redux-framework/issues',
    //     'title' => __( 'Support', 'redux-framework-demo' ),
    //     );

    // $args['admin_bar_links'][] = array(
    //     'id'    => 'redux-extensions',
    //     'href'  => 'reduxframework.com/extensions',
    //     'title' => __( 'Extensions', 'redux-framework-demo' ),
    //     );

    // SOCIAL ICONS -> Setup custom links in the footer for quick links in your panel footer icons.
    $args['share_icons'][] = array(
        'url'   => 'https://www.youtube.com/channel/UCtIDuiWyunATBdywHIV2FQQ',
        'title' => 'Subscribe our YouTube Channel',
        'icon'  => 'el el-youtube'
            //'img'   => '', // You can use icon OR img. IMG needs to be a full URL.
        );
    $args['share_icons'][] = array(
        'url'   => 'https://www.facebook.com/Adec-App-333806606981445/',
        'title' => 'Like us on Facebook',
        'icon'  => 'el el-facebook'
        );
    $args['share_icons'][] = array(
        'url'   => 'https://twitter.com/adecapp_mannit',
        'title' => 'Follow us on Twitter',
        'icon'  => 'el el-twitter'
        );
    $args['share_icons'][] = array(
        'url'   => 'https://www.instagram.com/adecapp.mannit/',
        'title' => 'Find us on Instagram',
        'icon'  => 'el el-instagram'
        );
    $args['share_icons'][] = array(
        'url'   => 'https://plus.google.com/u/0/106168709287967723347',
        'title' => 'Follow us on Google Plus',
        'icon'  => 'el el-googleplus'
        );
    $args['share_icons'][] = array(
        'url'   => 'https://skype:live:adecapp.mannit?chat',
        'title' => 'Contact us with skype',
        'icon'  => 'el el-skype',
        'class' => 'skype'
        );

   

    $args['footer_text'] = __( '', 'redux-framework-demo' );

    Redux::setArgs( $opt_name, $args );

    /*
     * ---> END ARGUMENTS
     */


    /*
     * ---> START HELP TABS
     */

    // Set the help sidebar
    $content = __( '<p>This is the sidebar content, HTML is allowed.</p>', 'redux-framework-demo' );
    Redux::setHelpSidebar( $opt_name, $content );


    $store_settings = file_get_contents(dirname(__FILE__) . '/adec_store_settings.php');

    // Redux::setExtensions( $opt_name, dirname(__FILE__) . 'redux-vendor-support-master/adec_store_settings.php' );

    /*
     * <--- END HELP TABS
     */


    /*
     *
     * ---> START SECTIONS
     *
     */

    /*

        As of Redux 3.5+, there is an extensive API. This API can be used in a mix/match mode allowing for


     */


        $check = $obs_mobile_store['store_status'];


        $woo_plugin = 'woocommerce/woocommerce.php';

        $section_one_permission = $obs_mobile_store['opt-select-layout'];



        $section_two_permission = $obs_mobile_store['opt-custom-two-section'];

        $section_three_permission = $obs_mobile_store['opt-custom-three-section'];

        $section_one_title = $obs_mobile_store['section_one_title'];

        $section_two_title = $obs_mobile_store['section_two_title'];

        $section_three_title = $obs_mobile_store['section_three_title'];


        $sect = array(

            "section_one"=> array('permission'=>$section_one_permission,'title'=> $section_one_title ,'value' => 4 ) ,
            "section_two"=> array('permission'=>$section_two_permission,'title'=> $section_two_title ,'value' => 5 ),
            "section_three"=> array('permission'=>$section_three_permission,'title'=> $section_three_title ,'value' => 6 ),


            );

        $permission_one = $sect->section_one->permission;
        $permission_two = $sect->section_two->permission;
        $permission_three = $sect->section_three->permission;
        $custom_layout = array();
        $custom_layout_title = array();



        $combine_array = array_combine($custom_layout,$custom_layout_title);


        $layout_option = array(
            '1' => 'Most Popular',
            '2' => 'Latest Product',
            '3' => 'Top Rated',
            '7' => 'App Banner',
            '8' => 'Welcome Text',
            '4' => 'Section One',
            '5' => 'Section Two',
            '6' => 'Section Three',
            );      


    // -> START Basic Fields
    Redux::setSection( $opt_name, array(
        'title'            => __( 'Store Configuration', 'redux-framework-demo' ),
        'id'               => 'basic',
        'desc'             => __( 'These are really basic fields!', 'redux-framework-demo' ),
        'customizer_width' => '400px',
        'icon'             => 'el el-cog'
    ));

    if(is_plugin_active($woo_plugin)){

    Redux::setSection( $opt_name, array(
        'title'            => __( 'Store Configuration', 'redux-framework-demo' ),
        'desc'             => __( '<span class="store_video"> Please Visit Our Video Tutorial Section For Details Information About This Plugin . After generating the app code please download ADEC app from <a href="https://play.google.com/store/apps/details?id=com.mannit.adecapp" target="_blank"> Google Play </a> and See your store. Its FREE </span>', 'redux-framework-demo' ) . '',
        'id'               => 'basic-Text',
        'subsection'       => true,
        'customizer_width' => '700px',
        'fields'           => array(
            array(
                'id'       => 'ck_key',
                'type'     => 'text',
                'title'    => __( 'Consumer Key', 'redux-framework-demo' ),
                'subtitle' => __( '', 'redux-framework-demo' ),
                'desc'     => __( '', 'redux-framework-demo' ),
                'default'  => '',
            ),
            array(
                'id'       => 'ck_secret',
                'type'     => 'text',
                'title'    => __( 'Consumer Secret', 'redux-framework-demo' ),
                'subtitle' => __( '', 'redux-framework-demo' ),
                'desc'     => __( '', 'redux-framework-demo' ),
                'default'  => '',
                ),
            array(
                'id'       => 'adec_store_nonce',
                'type'     => 'text',
                'title'    => '',
                'subtitle' => __( '', 'redux-framework-demo' ),
                'desc'     => __( '<span class="adec_store_nonce">'.wp_create_nonce('adec-store-nonce').'</span>', 'redux-framework-demo' ),
                'default'  =>'',
                'hidden'   => true
                ),
            array(
                'id'       => 'token',
                'type'     => 'text',
                'readonly' => true ,
                'title'    => __( 'APP Token', 'redux-framework-demo' ),
                'subtitle' => __( '', 'redux-framework-demo' ),
                'desc'     => __( '', 'redux-framework-demo' ),
                'default'  => '',
                ),
            array(
                'id'       => 'surl',
                'type'     => 'text',
                'subtitle' => __( '', 'redux-framework-demo' ),
                'desc'     => __( '', 'redux-framework-demo' ),
                'default'  => $c_url,
                'hidden'   => true
                ),
            array(
                'id'       => 'shop_urls',
                'type'     => 'text',
                'subtitle' => __( '', 'redux-framework-demo' ),
                'desc'     => __( '', 'redux-framework-demo' ),
                'default'  => site_url().'/',
                'hidden'   => true
                ),
            array(
                'id'       => 'obs_logo',
                'type'     => 'media', 
                'url'      => false,
                'title'    => __('App Logo', 'redux-framework-demo'),
                'desc'     => __('Please Upload 300 pixels height & 300 pixels width logo for Best Performance. Otherwise overall appearance quality of the Mobile app may reduce', 'redux-framework-demo'),
                'subtitle' => __('', 'redux-framework-demo'),
                'default'  => array(
                    'url'=>ReduxFramework::$_url.'assets/img/adec-logo-for-android-app_white.png'

                    ),
                ),

            array(
                'id'       => 'submit_url',
                'type'     => 'text',
                'subtitle' => __( '', 'redux-framework-demo' ),
                'desc'     => __( '', 'redux-framework-demo' ),
                'default'  => $submit_url,
                'hidden'   => true
                ),
            array( 
                'id'       => 'opt-rawss',
                'type'     => 'raw',
                'title'    => __('', 'redux-framework-demo'),
                'subtitle' => __('', 'redux-framework-demo'),
                'desc'     => __('', 'redux-framework-demo'),
                'content'  => $store_settings,
                )
        )
    ));

    Redux::setSection( $opt_name, array(
        'title'            => __( 'Video Tutorial', 'redux-framework-demo' ),
        'id'               => 'adec_video_tutorial',
        'desc'             => __( '', 'redux-framework-demo' ),
        'customizer_width' => '400px',
        'icon'             => 'el el-video'
        ));

    Redux::setSection( $opt_name, array(

        'title'      => __( 'ADEC Video Tutorial', 'redux-framework-demo' ),
        'id'         => 'adec-video-tutorial',
        'desc'       => __( '', 'redux-framework-demo' ) . '',
        'subsection' => true,
        'fields'     => array(
            array( 
                'id'       => 'opt-raw-adec-video-tutorial',
                'type'     => 'raw',
                'title'    => __('', 'redux-framework-demo'),
                'subtitle' => __('', 'redux-framework-demo'),
                'desc'     => __('', 'redux-framework-demo'),
                'content'  => file_get_contents(dirname(__FILE__) . '/adec_video_tutorial.php')
                )
            )
        ) );

    if($check == 1 ){

    Redux::setSection( $opt_name, array(
        'title'            => __( 'Paypal Configure', 'redux-framework-demo' ),
        'id'               => 'paypal_icon',
        'desc'             => __( '', 'redux-framework-demo' ),
        'customizer_width' => '400px',
        'icon'             => 'el el-usd'
        ));

    Redux::setSection( $opt_name, array(

        'title'      => __( 'Paypal Configure', 'redux-framework-demo' ),
        'id'         => 'basic-Multi Text',
        'desc'       => __( '', 'redux-framework-demo' ) . '',
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'obs_paypal_client_id',
                'type'     => 'text',
                'title'    => __( 'Paypal Client ID', 'redux-framework-demo' ),
                'subtitle' => __( '', 'redux-framework-demo' ),
                'desc'     => __( '', 'redux-framework-demo' )
                ),
            array(
                'id'       => 'paypal_ajax_referer',
                'type'     => 'text',
                'title'    => __( '', 'redux-framework-demo' ),
                'subtitle' => __( '<span class="paypal_ajax_referer">'.wp_create_nonce('referer-paypal-ajax').'</span>', 'redux-framework-demo' ),
                'desc'     => __( '', 'redux-framework-demo' ),
                'default'  => '',
                'hidden'   => true
                ),
            array( 
                'id'       => 'opt-raw-paypal',
                'type'     => 'raw',
                'title'    => __('', 'redux-framework-demo'),
                'subtitle' => __('', 'redux-framework-demo'),
                'desc'     => __('', 'redux-framework-demo'),
                'content'  => file_get_contents(dirname(__FILE__) . '/adec_paypal_configure.php')
                )
            )
        ) );

        Redux::setSection( $opt_name, array(
        'title'      => __( 'Layout Reorder', 'redux-framework-demo' ),
        'id'         => 'layout-reorder',
        'desc'       => __( '', 'redux-framework-demo' ) . '',
        'icon'=>'el el-move'
        ) );

        Redux::setSection( $opt_name, array(
        'title'      => __( 'Re-order Android Apps Layout', 'redux-framework-demo' ),
        'id'         => 'reorder-android-layout',
        'desc'       => __( 'Please Configure and Enable  Section One, Section Two, Section Three from "Section Settings Menu". <br> Please Note That, Without Proper Configuration or Disabled Section Will not show in Your Mobile App.', 'redux-framework-demo' ) ,
        'subsection' => true,
        'fields'     => array(
            array(
                'id'       => 'opt-homepage-layout',
                'type'     => 'sorter',
                'title'    => '',
                'subtitle' => '',
                'compiler' => 'true',
                'save_defaults' => 'true',
                'options'  => array(
                    'Layout Reorder'  => $layout_option

                ),

            ),
            array(
                'id'       => 'reorder_ajax_referer',
                'type'     => 'text',
                'title'    => __( '', 'redux-framework-demo' ),
                'subtitle' => __( '<span class="reorder_ajax_referer">'.wp_create_nonce('referer-reorder-ajax').'</span>', 'redux-framework-demo' ),
                'desc'     => __( '', 'redux-framework-demo' ),
                'default'  => '',
                'hidden'   => true
                ),
            array( 
                'id'       => 'opt-raw-layout-reorder',
                'type'     => 'raw',
                'title'    => __('', 'redux-framework-demo'),
                'subtitle' => __('', 'redux-framework-demo'),
                'desc'     => __('', 'redux-framework-demo'),
                'content'  => file_get_contents(dirname(__FILE__) . '/adec_layout_reorder.php')
                )

        )

    ) );





        Redux::setSection( $opt_name, array(
            'title'      => __( 'Shop Location', 'redux-framework-demo' ),
            'id'         => 'shop-location',
            'desc'       => __( '', 'redux-framework-demo' ) . '',
            'icon'=>'el el-map-marker'
            ) );

        Redux::setSection( $opt_name, array(
            'title'            => __( 'Shop Location', 'redux-framework-demo' ),
            'desc'             => __( '', 'redux-framework-demo' ) . '',
            'id'               => 'shop-location-field',
            'subsection'       => true,
            'customizer_width' => '700px',
            'fields'           => array(
                array(
                    'id'       => 'adec_location_nonce',
                    'type'     => 'text',
                    'title'    => '',
                    'subtitle' => __( '<span class="adec_location_nonce">'.wp_create_nonce('adec-location-nonce').'</span>', 'redux-framework-demo' ),
                    'desc'     => __( '', 'redux-framework-demo' ),
                    'default'  => '',
                    'hidden'   => true
                    ),

                array(
                    'id'       => 'obs_shop_address',
                    'type'     => 'text',
                    'subtitle' => __( '', 'redux-framework-demo' ),
                    'desc'     => __( '', 'redux-framework-demo' ),
                    'default'  => 'Panthapath,Dhaka',
                    'hidden'   => true
                    ),
                array( 
                    'id'       => 'opt-raw-shop-location',
                    'type'     => 'raw',
                    'title'    => __('', 'redux-framework-demo'),
                    'subtitle' => __('', 'redux-framework-demo'),
                    'desc'     => __('', 'redux-framework-demo'),
                    'content'  => file_get_contents(dirname(__FILE__) . '/adec_shop_location.php')
                    ),
                array(
                    'id'       => 'obs_shop_latitude',
                    'type'     => 'text',
                    'title'    => __( 'Latitude', 'redux-framework-demo' ),
                    'subtitle' => __( '', 'redux-framework-demo' ),
                    'desc'     => __( '', 'redux-framework-demo' ),
                    'default'  => '23.75084213060847',
                    'readonly' => true,
                    ),
                array(
                    'id'       => 'obs_shop_longitude',
                    'type'     => 'text',
                    'title'    => __( 'Longitude', 'redux-framework-demo' ),
                    'subtitle' => __( '', 'redux-framework-demo' ),
                    'desc'     => __( '', 'redux-framework-demo' ),
                    'default'  => '90.38789612911376',
                    'readonly' => true,
                    ),
                array( 
                    'id'       => 'opt-raw-shop-location-submit',
                    'type'     => 'raw',
                    'title'    => __('', 'redux-framework-demo'),
                    'subtitle' => __('', 'redux-framework-demo'),
                    'desc'     => __('', 'redux-framework-demo'),
                    'content'  => file_get_contents(dirname(__FILE__) . '/adec_shop_location-submit.php')
                    ),


                )
            ));

        Redux::setSection( $opt_name, array(
            'title'      => __( 'App Banner', 'redux-framework-demo' ),
            'id'         => 'app-banner',
            'desc'       => __( '', 'redux-framework-demo' ) . '',
            'icon'=>'el el-photo'
            ) );

        Redux::setSection( $opt_name, array(
            'title'      => __( 'Banner Permission', 'redux-framework-demo' ),
            'id'         => 'app_banner',
            'desc'       => __( '', 'redux-framework-demo' ) ,
            'subsection' => true,
            'fields'     => array(
                array(
                    'id'       => 'adec_banner_nonce',
                    'type'     => 'text',
                    'title'    => '',
                    'subtitle' => __('<span class="adec_banner_nonce">'.wp_create_nonce('adec-banner-nonce').'</span>', 'redux-framework-demo' ),
                    'desc'     => __( '', 'redux-framework-demo' ),
                    'default'  => '',
                    'hidden'   => true
                    ),
                array(
                    'id'       => 'opt-app-banner',
                    'type'     => 'button_set',
                    'title'    => '',
                    'subtitle' => '',
                    'desc'     => 'Please upload image from Banner Upload Menu',
                    'options' => array(
                        '1' => 'Enable', 
                        '2' => 'Disable', 
                        ), 
                    'default' => '2'
                    ),

                array( 
                    'id'       => 'opt-raw-banenr-permission',
                    'type'     => 'raw',
                    'title'    => __('', 'redux-framework-demo'),
                    'subtitle' => __('', 'redux-framework-demo'),
                    'desc'     => __('', 'redux-framework-demo'),
                    'content'  => file_get_contents(dirname(__FILE__) . '/adec_banner_permission.php')
                    )

                )

            ) );

        Redux::setSection( $opt_name, array(
            'title'      => __( 'Banner Upload', 'redux-framework-demo' ),
            'id'         => 'banner_upload',
            'desc'       => __( '','redux-framework-demo' ) ,
            'subsection' => true,
            'fields'     => array(
                array(
                    'id'       => 'adec_bupload_nonce',
                    'type'     => 'text',
                    'title'    => '',
                    'subtitle' => __( '<span class="adec_bupload_nonce">'.wp_create_nonce('adec-bupload-nonce').'</span>', 'redux-framework-demo' ),
                    'desc'     => __( '', 'redux-framework-demo' ),
                    'default'  => '',
                    'hidden'   => true
                    ),
                array(
                    'id'       => 'opt-media-banner',
                    'type'     => 'media', 
                    'url'      => false,
                    'class'    => 'banner_image',
                    'title'    => __('', 'redux-framework-demo'),
                    'desc'     => __('Please Upload 1024 pixels height & 500 pixels width logo for Best Performance. Otherwise overall appearance quality of the Mobile app may reduce', 'redux-framework-demo'),
                    'subtitle' => __('', 'redux-framework-demo'),
                    'default'  => array(
                        
                        ),
                    ),

                array( 
                    'id'       => 'opt-raw-banner-upload',
                    'type'     => 'raw',
                    'title'    => __('', 'redux-framework-demo'),
                    'subtitle' => __('', 'redux-framework-demo'),
                    'desc'     => __('', 'redux-framework-demo'),
                    'content'  => file_get_contents(dirname(__FILE__) . '/adec_banner_upload.php')
                    )

                )

            ) );

        Redux::setSection( $opt_name, array(
            'title'      => __( 'Welcome Text', 'redux-framework-demo' ),
            'id'         => 'welcome-text',
            'desc'       => __( '', 'redux-framework-demo' ) . '',
            'icon'=>'el el-text-width'
            ) );

        Redux::setSection( $opt_name, array(
            'title'      => __( 'Welcome Text Permission', 'redux-framework-demo' ),
            'id'         => 'welcome_text',
            'desc'       => __( '', 'redux-framework-demo' ) ,
            'subsection' => true,
            'fields'     => array(
                array(
                    'id'       => 'opt-app-welcome',
                    'type'     => 'button_set',
                    'title'    => '',
                    'subtitle' => '',
                    'desc'     => __('Please set welcome text from welcome text menu ', 'redux-framework-demo'),
                    'options' => array(
                        '1' => 'Enable', 
                        '2' => 'Disable', 
                        ), 
                    'default' => '2'
                    ),
                array(
                    'id'       => 'adec_wpermission_nonce',
                    'type'     => 'text',
                    'title'    => '',
                    'subtitle' => __( '<span class="adec_wpermission_nonce">'.wp_create_nonce('adec-wpermission-nonce').'</span>', 'redux-framework-demo' ),
                    'desc'     => __( '', 'redux-framework-demo' ),
                    'default'  => '',
                    'hidden'   => true
                    ),
                array( 
                    'id'       => 'opt-raw-welcome-permissions',
                    'type'     => 'raw',
                    'title'    => __('', 'redux-framework-demo'),
                    'subtitle' => __('', 'redux-framework-demo'),
                    'desc'     => __('', 'redux-framework-demo'),
                    'content'  => file_get_contents(dirname(__FILE__) . '/adec_welcome_permission.php')
                    )

                )

            ) );

        Redux::setSection( $opt_name, array(
            'title'      => __( 'welcome text', 'redux-framework-demo' ),
            'id'         => 'welcome_text_texts',
            'desc'       => __( '','redux-framework-demo' ) ,
            'subsection' => true,
            'fields'     => array(
                array(
                    'id'       => 'adec_wtext_nonce',
                    'type'     => 'text',
                    'title'    => '',
                    'subtitle' => __( '<span class="adec_wtext_nonce">'.wp_create_nonce('adec-wtext-nonce').'</span>', 'redux-framework-demo' ),
                    'desc'     => __( '', 'redux-framework-demo' ),
                    'default'  => '',
                    'hidden'   => true
                    ),
                array(
                    'id'       => 'opt-welcomes',
                    'type'     => 'editor', 
                    'title'    => __('', 'redux-framework-demo'),
                    'desc'     => __('', 'redux-framework-demo'),
                    'subtitle' => __('', 'redux-framework-demo'),
                    'default' => '',
                    'full_width' => true,
                    'args'   => array(
                        'teeny'            => true,
                        'textarea_rows'    => 10,
                        'media_buttons' => false,
                        'quicktags' => false
                        )
                    ),

                array( 
                    'id'       => 'opt-raw-welcome-text',
                    'type'     => 'raw',
                    'title'    => __('', 'redux-framework-demo'),
                    'subtitle' => __('', 'redux-framework-demo'),
                    'desc'     => __('', 'redux-framework-demo'),
                    'content'  => file_get_contents(dirname(__FILE__) . '/adec_welcome_text.php')
                    )

                )

            ) );

        Redux::setSection( $opt_name, array(
            'title'      => __( 'Slider Settings', 'redux-framework-demo' ),
            'id'         => 'slider-settings',
            'desc'       => __( '', 'redux-framework-demo' ) . '',
            'icon'=>'el el-th'
            ) );

        Redux::setSection( $opt_name, array(
            'title'      => __( 'Slider Permission', 'redux-framework-demo' ),
            'id'         => 'slider_settings',
            'desc'       => __( '', 'redux-framework-demo' ) ,
            'subsection' => true,
            'fields'     => array(
                array(
                    'id'       => 'opt-slider-permission',
                    'type'     => 'button_set',
                    'title'    => '',
                    'subtitle' => '',
                    'desc'     => __('Please Configure Slider from Product Slider or Custom Slider Menu based on your selection', 'redux-framework-demo'),
                    'options' => array(
                        '0' => 'Product Slider', 
                        '1' => 'Custom Slider', 
                        ), 
                    'default' => '0'
                    ),
                array(
                    'id'       => 'adec_ssettings_nonce',
                    'type'     => 'text',
                    'title'    => '',
                    'subtitle' => __( '<span class="adec_ssettings_nonce">'.wp_create_nonce('adec-ssettings-nonce').'</span>', 'redux-framework-demo' ),
                    'desc'     => __( '', 'redux-framework-demo' ),
                    'default'  => '',
                    'hidden'   => true
                    ),

                array( 
                    'id'       => 'opt-raw-welcome-permission',
                    'type'     => 'raw',
                    'title'    => __('', 'redux-framework-demo'),
                    'subtitle' => __('', 'redux-framework-demo'),
                    'desc'     => __('', 'redux-framework-demo'),
                    'content'  => file_get_contents(dirname(__FILE__) . '/adec_slider_permission.php')
                    )

                )

            ) );

            Redux::setSection( $opt_name, array(
                'title'            => __( 'Product Slider', 'redux-framework-demo' ),
                'desc'             => __( '', 'redux-framework-demo' ) . '',
                'id'               => 'select_slider_image',
                'subsection'       => true,
                'customizer_width' => '700px',
                'fields'           => array(
                    array(
                        'id'       => 'opt-radio-slider',
                        'type'     => 'radio',
                        'title'    => __('Slider Image', 'redux-framework-demo'), 
                        'subtitle' => __('', 'redux-framework-demo'),
                        'desc'     => __('Choose which kind of products show in slider. By Default Latest Product Will Be Shown On Slider', 'redux-framework-demo'),
    //Must provide key => value pairs for radio options
                        'options'  => array(
                            '1' => 'Latest Product', 
                            '2' => 'Most Popular', 
                            '3' => 'Top Sales'
                            ),
                        'default' => '1'
                        ),
                    array(
                        'id'       => 'adec_pslider_nonce',
                        'type'     => 'text',
                        'title'    => '',
                        'subtitle' => __( '<span class="adec_pslider_nonce">'.wp_create_nonce('adec-pslider-nonce').'</span>', 'redux-framework-demo' ),
                        'desc'     => __( '', 'redux-framework-demo' ),
                        'default'  => '',
                        'hidden'   => true
                        ),
                    array(
                        'id'       => 'opt-select',
                        'type'     => 'select',
                        'title'    => __('Select Slider Image Number', 'redux-framework-demo'), 
                        'subtitle' => __('', 'redux-framework-demo'),
                        'desc'     => __(' ', 'redux-framework-demo'),
    // Must provide key => value pairs for select options
                        'options'  => array(
                            '3' => '3',
                            '5' => '5',
                            '7' => '7',
                            '10' => '10'
                            ),
                        'default'  => '3',
                        ),
                    array( 
                        'id'       => 'opt-raw-image-slider',
                        'type'     => 'raw',
                        'title'    => __('', 'redux-framework-demo'),
                        'subtitle' => __('', 'redux-framework-demo'),
                        'desc'     => __('', 'redux-framework-demo'),
                        'content'  => file_get_contents(dirname(__FILE__) . '/adec_product_slider.php')
                        )
                    )
                ));
                Redux::setSection( $opt_name, array(
                    'title'            => __( 'Custom Slider', 'redux-framework-demo' ),
                    'desc'             => __( '', 'redux-framework-demo' ) . '',
                    'id'               => 'select_slider_custom',
                    'subsection'       => true,
                    'customizer_width' => '700px',
                    'fields'           => array(
                        array(
                            'id'          => 'opt-slides',
                            'type'        => 'slides',
                            'class'     => 'slider_custom', 
                            'show' => array(
                                'title' => true,
                                'description' => false,
                                'url' => true   
                                ),
                            'title'       => __( 'Slides Options', 'redux-framework-demo' ),
                            'subtitle'    => __( '', 'redux-framework-demo' ),
                            'desc'        => __( 'Please Upload Each slide 1024 pixels height & 500 pixels width for Best Performance. Otherwise overall appearance quality of the Mobile app may reduce', 'redux-framework-demo' ),
                            'placeholder' => array(
                                'title'       => __( 'This is a title', 'redux-framework-demo' ),
                                ),
                            ),
                        array(
                            'id'       => 'adec_cslider_nonce',
                            'type'     => 'text',
                            'title'    => '',
                            'subtitle' => __( '<span class="adec_cslider_nonce">'.wp_create_nonce('adec-cslider-nonce').'</span>', 'redux-framework-demo' ),
                            'desc'     => __( '', 'redux-framework-demo' ),
                            'default'  => '',
                            'hidden'   => true
                            ),
                        array( 
                            'id'       => 'opt-raw-layout-slider',
                            'type'     => 'raw',
                            'title'    => __('', 'redux-framework-demo'),
                            'subtitle' => __('', 'redux-framework-demo'),
                            'desc'     => __('', 'redux-framework-demo'),
                            'content'  => file_get_contents(dirname(__FILE__) . '/adec_slider_custom_image.php')
                            )
                        )
                ));

                Redux::setSection( $opt_name, array(
                    'title'      => __( 'Section Settings', 'redux-framework-demo' ),
                    'id'         => 'choose-custom-layout',
                    'desc'       => __( '', 'redux-framework-demo' ) . '',
                    'icon'=>'el el-credit-card'
                    ) );


                Redux::setSection( $opt_name, array(
                    'title'            => __( 'Custom Section One', 'redux-framework-demo' ),
                    'desc'             => __( '', 'redux-framework-demo' ) . '',
                    'id'               => 'choose_section_one',
                    'subsection'       => true,
                    'customizer_width' => '700px',
                    'fields'           => array(
                        array(
                            'id'       => 'opt-custom-one-section',
                            'type'     => 'button_set',
                            'title'    => '',
                            'subtitle' => '',
                            'options' => array(
                                '1' => 'Enable', 
                                '0' => 'Disable', 
                                ), 
                            'default' => '0'
                            ),
                        array(
                            'id'       => 'section_one_title',
                            'type'     => 'text',
                            'title'    => __( 'Custom Section One Title', 'redux-framework-demo' ),
                            'subtitle' => __( '', 'redux-framework-demo' ),
                            'desc'     => __( '', 'redux-framework-demo' ),
                            'default'  => '',
                            ),
                        array(
                            'id'       => 'adec_sone_nonce',
                            'type'     => 'text',
                            'title'    => '',
                            'subtitle' => __( '<span class="adec_sone_nonce">'.wp_create_nonce('adec-sone-nonce').'</span>', 'redux-framework-demo' ),
                            'desc'     => __( '', 'redux-framework-demo' ),
                            'default'  => '',
                            'hidden'   => true
                            ),
                        array(
                            'id'       => 'opt-select-layout',
                            'type'     => 'select',
                            'title'    => __('Choose Products', 'redux-framework-demo'), 
                            'subtitle' => __('', 'redux-framework-demo'),
                            'sortable' => true,
                            'multi'    => true,
                            'data'     => 'posts',
                            'args' => array('post_type'=>'product','posts_per_page'=>-1),
                            'desc'     => __('Selected products from here will be displayed in "Custom Section One" with your given title in your Mobile App', 'redux-framework-demo'),
                    // Must provide key => value pairs for select options

                           
                            ),
                        array( 
                            'id'       => 'opt-raw-section-one',
                            'type'     => 'raw',
                            'title'    => __('', 'redux-framework-demo'),
                            'subtitle' => __('', 'redux-framework-demo'),
                            'desc'     => __('', 'redux-framework-demo'),
                            'content'  => file_get_contents(dirname(__FILE__) . '/adec_section_one.php')
                            )
                        )
                ));

                Redux::setSection( $opt_name, array(
                    'title'            => __( 'Custom Section Two', 'redux-framework-demo' ),
                    'desc'             => __( '', 'redux-framework-demo' ) . '',
                    'id'               => 'choose_section_two',
                    'subsection'       => true,
                    'customizer_width' => '700px',
                    'fields'           => array(
                        array(
                            'id'       => 'opt-custom-two-section',
                            'type'     => 'button_set',
                            'title'    => '',
                            'subtitle' => '',
                            'options' => array(
                                '1' => 'Enable', 
                                '0' => 'Disable', 
                                ), 
                            'default' => '0'
                            ),
                        array(
                            'id'       => 'section_two_title',
                            'type'     => 'text',
                            'title'    => __( 'Custom Section Two Title', 'redux-framework-demo' ),
                            'subtitle' => __( '', 'redux-framework-demo' ),
                            'desc'     => __( '', 'redux-framework-demo' ),
                            'default'  => '',
                            ),
                        array(
                            'id'       => 'adec_stwo_nonce',
                            'type'     => 'text',
                            'title'    => '',
                            'subtitle' => __( '<span class="adec_stwo_nonce">'.wp_create_nonce('adec-stwo-nonce').'</span>', 'redux-framework-demo' ),
                            'desc'     => __( '', 'redux-framework-demo' ),
                            'default'  => '',
                            'hidden'   => true
                            ),
                        array(
                            'id'       => 'opt-select-section-two',
                            'type'     => 'select',
                            'title'    => __('Choose Products', 'redux-framework-demo'), 
                            'subtitle' => __('', 'redux-framework-demo'),
                            'sortable' => true,
                            'multi'    => true,
                            'data'     => 'posts',
                            'args' => array('post_type'=>'product','posts_per_page'=>-1),
                            'desc'     => __('Selected products from here will be displayed in "Custom Section Two" with your given title in your Mobile App', 'redux-framework-demo'),
                    // Must provide key => value pairs for select options

                          
                            ),
                        array( 
                            'id'       => 'opt-raw-section-two',
                            'type'     => 'raw',
                            'title'    => __('', 'redux-framework-demo'),
                            'subtitle' => __('', 'redux-framework-demo'),
                            'desc'     => __('', 'redux-framework-demo'),
                            'content'  => file_get_contents(dirname(__FILE__) . '/adec_section_two.php')
                            )
                        )
                ));

                Redux::setSection( $opt_name, array(
                    'title'            => __( 'Custom Section Three', 'redux-framework-demo' ),
                    'desc'             => __( '', 'redux-framework-demo' ) . '',
                    'id'               => 'choose_section_three',
                    'subsection'       => true,
                    'customizer_width' => '700px',
                    'fields'           => array(
                        array(
                            'id'       => 'opt-custom-three-section',
                            'type'     => 'button_set',
                            'title'    => '',
                            'subtitle' => '',
                            'options' => array(
                                '1' => 'Enable', 
                                '0' => 'Disable', 
                                ), 
                            'default' => '0'
                            ),
                        array(
                            'id'       => 'section_three_title',
                            'type'     => 'text',
                            'title'    => __( 'Custom Section Three Title', 'redux-framework-demo' ),
                            'subtitle' => __( '', 'redux-framework-demo' ),
                            'desc'     => __( '', 'redux-framework-demo' ),
                            'default'  => '',
                            ),
                        array(
                            'id'       => 'adec_sthree_nonce',
                            'type'     => 'text',
                            'title'    => '',
                            'subtitle' => __( '<span class="adec_sthree_nonce">'.wp_create_nonce('adec-sthree-nonce').'</span>', 'redux-framework-demo' ),
                            'desc'     => __( '', 'redux-framework-demo' ),
                            'default'  => '',
                            'hidden'   => true
                            ),
                        array(
                            'id'       => 'opt-select-section-three',
                            'type'     => 'select',
                            'title'    => __('Choose Products', 'redux-framework-demo'), 
                            'subtitle' => __('', 'redux-framework-demo'),
                            'sortable' => true,
                            'multi'    => true,
                            'data'     => 'posts',
                            'args' => array('post_type'=>'product','posts_per_page'=>-1),
                            'desc'     => __('Selected products from here will be displayed in "Custom Section Three" with your given title in your Mobile App', 'redux-framework-demo'),
                    // Must provide key => value pairs for select options

                     
                            ),
                        array( 
                            'id'       => 'opt-raw-section-three',
                            'type'     => 'raw',
                            'title'    => __('', 'redux-framework-demo'),
                            'subtitle' => __('', 'redux-framework-demo'),
                            'desc'     => __('', 'redux-framework-demo'),
                            'content'  => file_get_contents(dirname(__FILE__) . '/adec_section_three.php')
                            )
                        )
                ));
        Redux::setSection( $opt_name, array(
            'title'      => __( 'Guest Checkout', 'redux-framework-demo' ),
            'id'         => 'guest-checkout',
            'desc'       => __( '', 'redux-framework-demo' ) . '',
            'icon'=>'el el-check'
            ) );

        Redux::setSection( $opt_name, array(
            'title'      => __( 'Guest Checkout', 'redux-framework-demo' ),
            'id'         => 'guest_checkout',
            'desc'       => __( '', 'redux-framework-demo' ) ,
            'subsection' => true,
            'fields'     => array(
                array(
                    'id'       => 'opt-guest-checkout',
                    'desc'       => __( 'If Guest Checkout is Enabled anyone can place order without having a customer account', 'redux-framework-demo' ) ,
                    'type'     => 'button_set',
                    'title'    => '',
                    'subtitle' => '',
                    'options' => array(
                        '1' => 'Enable', 
                        '0' => 'Disable', 
                        ), 
                    'default' => '1'

                    ),
                array(
                    'id'       => 'adec_guest_nonce',
                    'type'     => 'text',
                    'title'    => '',
                    'subtitle' => __( '<span class="adec_guest_nonce">'.wp_create_nonce('adec-guest-nonce').'</span>', 'redux-framework-demo' ),
                    'desc'     => __( '', 'redux-framework-demo' ),
                    'default'  => '',
                    'hidden'   => true
                    ),

                array( 
                    'id'       => 'opt-raw-guest-checkout',
                    'type'     => 'raw',
                    'title'    => __('', 'redux-framework-demo'),
                    'subtitle' => __('', 'redux-framework-demo'),
                    'desc'     => __('', 'redux-framework-demo'),
                    'content'  => file_get_contents(dirname(__FILE__) . '/adec_guest_checkout.php')
                    )

                )

            ) );

            Redux::setSection( $opt_name, array(
            'title'      => __( 'Product Layout', 'redux-framework-demo' ),
            'id'         => 'choose-layout',
            'desc'       => __( '', 'redux-framework-demo' ) . '',
            'icon'=>'el el-website'
            ) );
            Redux::setSection( $opt_name, array(
            'title'            => __( 'Product Layout', 'redux-framework-demo' ),
            'desc'             => __( '', 'redux-framework-demo' ) . '',
            'id'               => 'choose_layout',
            'subsection'       => true,
            'customizer_width' => '700px',
            'fields'           => array(

                    array(
                        'id'       => 'opt-radio-layout',
                        'type'     => 'radio',
                        'title'    => __('', 'redux-framework-demo'), 
                        'subtitle' => __('', 'redux-framework-demo'),
                        'desc'     => __('', 'redux-framework-demo'),
    //Must provide key => value pairs for radio options
                        'options'  => array(
                            'layout_1' => '<img src="'.ReduxFramework::$_url.'/assets/img/1.jpg" alt="">', 
                            'layout_2' => '<img src="'.ReduxFramework::$_url.'/assets/img/2.jpg" alt="">',
                            'layout_3' => '<img src="'.ReduxFramework::$_url.'/assets/img/3.jpg" alt="">',
                            'layout_4' => '<img src="'.ReduxFramework::$_url.'/assets/img/4.jpg" alt="">'
                            ),
                        'default' => 'layout_1'
                        ),
                    array(
                        'id'       => 'adec_layout_nonce',
                        'type'     => 'text',
                        'title'    => '',
                        'subtitle' => __( '<span class="adec_layout_nonce">'.wp_create_nonce('adec-layout-nonce').'</span>', 'redux-framework-demo' ),
                        'desc'     => __( '', 'redux-framework-demo' ),
                        'default'  => '',
                        'hidden'   => true
                        ),

                    array( 
                        'id'       => 'opt-raw-layout-select',
                        'type'     => 'raw',
                        'title'    => __('', 'redux-framework-demo'),
                        'subtitle' => __('', 'redux-framework-demo'),
                        'desc'     => __('', 'redux-framework-demo'),
                        'content'  => file_get_contents(dirname(__FILE__) . '/adec_layout_select.php')
                        )

                )
            ));
        Redux::setSection( $opt_name, array(
            'title'      => __( 'Theme Color', 'redux-framework-demo' ),
            'id'         => 'choose-layout-color',
            'desc'       => __( '', 'redux-framework-demo' ) . '',
            'icon'=>'el el-brush'
            ) );
        Redux::setSection( $opt_name, array(
            'title'            => __( 'Choose Theme Color', 'redux-framework-demo' ),
            'desc'             => __( '', 'redux-framework-demo' ) . '',
            'id'               => 'choose_layout_color',
            'subsection'       => true,
            'customizer_width' => '700px',
            'fields'           => array(
                array(
                    'id'       => 'opt-radio-layout-color',
                    'type'     => 'radio',
                    'title'    => __('', 'redux-framework-demo'), 
                    'subtitle' => __('', 'redux-framework-demo'),
                    'desc'     => __('', 'redux-framework-demo'),
                    'class'     => 'radioimageace',
                    //Must provide key => value pairs for radio options
                    'options'  => array(
                        'blue' => '<img class="fadeimageadec" src="'.ReduxFramework::$_url.'assets/img/screenshots/blue.jpg" alt="">',
                        'darkblue' => '<img  class="fadeimageadec" src="'.ReduxFramework::$_url.'assets/img/screenshots/darkblue.jpg" alt="">', 
                        'diserria' => '<img class="fadeimageadec"  src="'.ReduxFramework::$_url.'assets/img/screenshots/diserria.jpg" alt="">',
                        'palatinatepurple ' => '<img class="fadeimageadec"  src="'.ReduxFramework::$_url.'assets/img/screenshots/palatinatepurple.jpg" alt="">', 
                        'persianred' => '<img  class="fadeimageadec" src="'.ReduxFramework::$_url.'assets/img/screenshots/persianred.jpg" alt="">',
                        'pink' => '<img class="fadeimageadec"  src="'.ReduxFramework::$_url.'assets/img/screenshots/pink.jpg" alt="">', 
                        'tealgreen' => '<img  class="fadeimageadec" src="'.ReduxFramework::$_url.'assets/img/screenshots/tealgreen.jpg" alt="">',
                        'paynegrey' => '<img class="fadeimageadec"  src="'.ReduxFramework::$_url.'assets/img/screenshots/paynegrey.jpg" alt="">',
                        'orange' => '<img class="fadeimageadec"  src="'.ReduxFramework::$_url.'assets/img/screenshots/orange.jpg" alt="">',
                        'green' => '<img class="fadeimageadec"  src="'.ReduxFramework::$_url.'assets/img/screenshots/green.jpg" alt="">',
                        'yellow' => '<img class="fadeimageadec"  class="fadeimageadec"  src="'.ReduxFramework::$_url.'assets/img/screenshots/yellow.jpg" alt="">',
                        'mint' => '<img class="fadeimageadec"  src="'.ReduxFramework::$_url.'assets/img/screenshots/mint.jpg" alt="">',
                        'light' => '<img class="fadeimageadec"  src="'.ReduxFramework::$_url.'assets/img/screenshots/light.jpg" alt="">'

                        ),
                    'default' => 'darkblue'
                    ),
                array(
                    'id'       => 'adec_color_nonce',
                    'type'     => 'text',
                    'title'    => '',
                    'subtitle' => __( '<span class="adec_color_nonce">'.wp_create_nonce('adec-color-nonce').'</span>', 'redux-framework-demo' ),
                    'desc'     => __( '', 'redux-framework-demo' ),
                    'default'  => '',
                    'hidden'   => true
                    ),
                array( 
                    'id'       => 'opt-raw-layout-color',
                    'type'     => 'raw',
                    'title'    => __('', 'redux-framework-demo'),
                    'subtitle' => __('', 'redux-framework-demo'),
                    'desc'     => __('', 'redux-framework-demo'),
                    'content'  => file_get_contents(dirname(__FILE__) . '/adec_layout_color.php')
                    )
                )
            ));



            Redux::setSection( $opt_name, array(
                'title'      => __( 'Shop Page Settings', 'redux-framework-demo' ),
                'id'         => 'choose-product-number',
                'desc'       => __( '', 'redux-framework-demo' ) . '',
                'icon'=>'el el-shopping-cart'
                ) );


            Redux::setSection( $opt_name, array(
                'title'            => __( 'Product Numbers', 'redux-framework-demo' ),
                'desc'             => __( '', 'redux-framework-demo' ) . '',
                'id'               => 'choose_product_number',
                'subsection'       => true,
                'customizer_width' => '700px',
                'fields'           => array(
                    array(
                        'id'       => 'opt-select-dd',
                        'type'     => 'select',
                        'title'    => __('', 'redux-framework-demo'), 
                        'subtitle' => __('', 'redux-framework-demo'),
                        'desc'     => __('Large number of products selection can slowdown your mobile app performance', 'redux-framework-demo'),
    // Must provide key => value pairs for select options
                        'options'  => array(
                            '20' => '20',
                            '40' => '40',
                            '60' => '60', 
                            '1'=> 'All Products' 
                            ),
                        'default'  => '20',
                        ),
                    array(
                        'id'       => 'adec_pnum_nonce',
                        'type'     => 'text',
                        'title'    => '',
                        'subtitle' => __( '<span class="adec_pnum_nonce">'.wp_create_nonce('adec-pnum-nonce').'</span>', 'redux-framework-demo' ),
                        'desc'     => __( '', 'redux-framework-demo' ),
                        'default'  => '',
                        'hidden'   => true
                        ),
                    array( 
                        'id'       => 'opt-raw-all-Product',
                        'type'     => 'raw',
                        'title'    => __('', 'redux-framework-demo'),
                        'subtitle' => __('', 'redux-framework-demo'),
                        'desc'     => __('', 'redux-framework-demo'),
                        'content'  => file_get_contents(dirname(__FILE__) . '/adec_product_number.php')
                        )
                    )
                ));

            Redux::setSection( $opt_name, array(
                'title'      => __( 'Select App Fonts', 'redux-framework-demo' ),
                'id'         => 'choose-app-font',
                'desc'       => __( '', 'redux-framework-demo' ) . '',
                'icon'=>'el el-font'
                ) );


            Redux::setSection( $opt_name, array(
                'title'            => __( 'Select App Font', 'redux-framework-demo' ),
                'desc'             => __( '', 'redux-framework-demo' ) . '',
                'id'               => 'choose_app_font',
                'subsection'       => true,
                'customizer_width' => '700px',
                'fields'           => array(
                    array( 
                        'id'       => 'opt-select-font',
                        'type'     => 'select_image',
                        'title'    => __('', 'redux-framework-demo'),
                        'subtitle' => __('', 'redux-framework-demo'),
                        'desc'     => __('Select fonts for your app
                            ', 'redux-framework-demo'),
                        'options'  => Array(
                            Array (
                               'alt'  => 'HelveticaNeue',
                               'img'  => ReduxFramework::$_url.'assets/img/helve.png',
                               ),                            
                            Array (
                               'alt'  => 'NotoSans-Regular',
                               'img'  => ReduxFramework::$_url.'assets/img/noto.png',
                               ),                            
                            Array (
                               'alt'  => 'OpenSans-Regular',
                               'img'  => ReduxFramework::$_url.'assets/img/opens.png',
                               ),                            
                            Array (
                               'alt'  => 'Oxygen-Regular',
                               'img'  => ReduxFramework::$_url.'assets/img/oxy.png',
                               ),                            
                            Array (
                               'alt'  => 'Quicksand-Light',
                               'img'  => ReduxFramework::$_url.'assets/img/quicks.png',
                               ),                           
                            Array (
                               'alt'  => 'Raleway-Regular',
                               'img'  => ReduxFramework::$_url.'assets/img/regular.png',
                               ),

                            ),
                        'default'  => ReduxFramework::$_url.'assets/img/opens.png',
                        ),
                    array(
                        'id'       => 'adec_font_nonce',
                        'type'     => 'text',
                        'title'    => '',
                        'subtitle' => __( '<span class="adec_font_nonce">'.wp_create_nonce('adec-font-nonce').'</span>', 'redux-framework-demo' ),
                        'desc'     => __( '', 'redux-framework-demo' ),
                        'default'  => '',
                        'hidden'   => true
                        ),
                    array( 
                        'id'       => 'opt-raw-all-font',
                        'type'     => 'raw',
                        'title'    => __('', 'redux-framework-demo'),
                        'subtitle' => __('', 'redux-framework-demo'),
                        'desc'     => __('', 'redux-framework-demo'),
                        'content'  => file_get_contents(dirname(__FILE__) . '/adec_select_font.php')
                        )
                    )
                ));






    Redux::setSection( $opt_name, array(
        'title'      => __( 'Google Analytics', 'redux-framework-demo' ),
        'id'         => 'obs-google-analytics',
        'desc'       => __( '', 'redux-framework-demo' ) . '',
        'icon'=>'el el-cogs'
        ) );




    Redux::setSection( $opt_name, array(
        'title'      => __( 'Google Analytics', 'redux-framework-demo' ),
        'id'         => 'obs-google-analytics-content',
        //'icon'  => 'el el-home'
        'desc'       => __( '', 'redux-framework-demo' ) . '',
        'subsection' => true,
        'fields'     => array(

            array(
                'id'         => 'opt-editor-analytics',
                'type'       => 'text',
                'title'      => __( '', 'redux-framework-demo' ),
                'default'    => 'UA-85049756-1',
                'allowed_html' => array(
                    'a' => array(
                        'href' => array(),
                        'title' => array()
                        ),
                    'br' => array(),
                    'em' => array(),
                    'strong' => array()
                    )
                ),
            array(
                'id'       => 'adec_analytics_nonce',
                'type'     => 'text',
                'title'    => '',
                'subtitle' => __( '<span class="adec_analytics_nonce">'.wp_create_nonce('adec-analytics-nonce').'</span>', 'redux-framework-demo' ),
                'desc'     => __( '', 'redux-framework-demo' ),
                'default'  => '',
                'hidden'   => true
                ),
            array( 
                'id'       => 'opt-raw-google-analytics',
                'type'     => 'raw',
                'title'    => __('', 'redux-framework-demo'),
                'subtitle' => __('', 'redux-framework-demo'),
                'desc'     => __('', 'redux-framework-demo'),
                'content'  => file_get_contents(dirname(__FILE__) . '/adec_google_analytics.php')
                )
            ),
        'desc'       => __( '', 'redux-framework-demo' ) . '',
        ) );


    Redux::setSection( $opt_name, array(
        'title'      => __( 'Google AdMob', 'redux-framework-demo' ),
        'id'         => 'obs-google-adsense',
        'desc'       => __( '', 'redux-framework-demo' ) . '',
        'icon'=>'el el-bullhorn'
        ) );




    Redux::setSection( $opt_name, array(
        'title'      => __( 'Google AdMob', 'redux-framework-demo' ),
        'id'         => 'obs-google-adsense-content',
        //'icon'  => 'el el-home'
        'desc'       => __( '', 'redux-framework-demo' ) . '',
        'subsection' => true,
        'fields'     => array(

            array(
                'id'         => 'opt-editor-adsense',
                'type'       => 'text',
                'title'      => __( '', 'redux-framework-demo' ),
                'default'    => 'ca-app-pub-7540575626331379/6729392648',
                'allowed_html' => array(
                    'a' => array(
                        'href' => array(),
                        'title' => array()
                        ),
                    'br' => array(),
                    'em' => array(),
                    'strong' => array()
                    )
                ),
            array(
                'id'       => 'adec_admob_nonce',
                'type'     => 'text',
                'title'    => '',
                'subtitle' => __( '<span class="adec_admob_nonce">'.wp_create_nonce('adec-admob-nonce').'</span>', 'redux-framework-demo' ),
                'desc'     => __( '', 'redux-framework-demo' ),
                'default'  => '',
                'hidden'   => true
                ),
            array( 
                'id'       => 'opt-raw-google-adsense',
                'type'     => 'raw',
                'title'    => __('', 'redux-framework-demo'),
                'subtitle' => __('', 'redux-framework-demo'),
                'desc'     => __('', 'redux-framework-demo'),
                'content'  => file_get_contents(dirname(__FILE__) . '/adec_google_adsense.php')
                )
            ),
        'desc'       => __( '', 'redux-framework-demo' ) . '',
        ) );


    Redux::setSection( $opt_name, array(
        'title'      => __( 'Contact Us', 'redux-framework-demo' ),
        'id'         => 'obs-contact-us',
        'desc'       => __( '', 'redux-framework-demo' ) . '',
        'icon'=>'el el-home'
        ) );




    Redux::setSection( $opt_name, array(
        'title'      => __( 'Contact Us', 'redux-framework-demo' ),
        'id'         => 'obs-contact-us-content',
        //'icon'  => 'el el-home'
        'desc'       => __( '', 'redux-framework-demo' ) . '',
        'subsection' => true,
        'fields'     => array(

            array(
                'id'         => 'opt-editor-contact',
                'type'       => 'editor',
                'title'      => __( '', 'redux-framework-demo' ),
                'full_width' => true,
                'default'    => '<p><strong>Corporate Office:</strong></p><p>69/1 Panthapath,Chandrashila Suvastu Tower (15th Floor) Dhaka,1205 Bangladesh</p>',
                'args'   => array(
                    'teeny'            => true,
                    'textarea_rows'    => 10,
                    'media_buttons' => false,
                    'quicktags' => false
                    )
                ),

            array(
                'id'       => 'adec_contact_nonce',
                'type'     => 'text',
                'title'    => '',
                'subtitle' => __( '<span class="adec_contact_nonce">'.wp_create_nonce('adec-contact-nonce').'</span>', 'redux-framework-demo' ),
                'desc'     => __( '', 'redux-framework-demo' ),
                'default'  => '',
                'hidden'   => true
                ),

            array( 
                'id'       => 'opt-raw-contact-us',
                'type'     => 'raw',
                'title'    => __('', 'redux-framework-demo'),
                'subtitle' => __('', 'redux-framework-demo'),
                'desc'     => __('', 'redux-framework-demo'),
                'content'  => file_get_contents(dirname(__FILE__) . '/adec_contact_us.php')
                )
            ),
        'desc'       => __( '', 'redux-framework-demo' ) . '',
        ) );

    $plugin = 'rest-api/plugin.php';

    if(is_plugin_active($plugin)){ 

        Redux::setSection( $opt_name, array(
            'title' => __( 'Blog Configuration', 'redux-framework-demo' ),
            'id'    => 'select',
            'icon'  => 'el el-list-alt'
            ) );

        Redux::setSection( $opt_name, array(
            'title'      => __( 'Select Posts', 'redux-framework-demo' ),
            'id'         => 'mit-select-select',
            'desc'       => __( ' ', 'redux-framework-demo' ) . '',
            'subsection' => true,
            'fields'     => array(

                array(
                    'id'       => 'opt-multi-select-pages',
                    'type'     => 'select',
                    'data'     => 'posts',
                    'args' => array('post_type'=>'post','posts_per_page'=>-1),
                    'sortable' => true,
                    'multi'    => true,
                    'title'    => __( 'Select Multi Posts', 'redux-framework-demo' ),
                    'subtitle' => __( '', 'redux-framework-demo' ),
                    'desc'     => __( '', 'redux-framework-demo' ),
                    ),
                array(
                    'id'       => 'adec_posts_nonce',
                    'type'     => 'text',
                    'title'    => '',
                    'subtitle' => __( '<span class="adec_posts_nonce">'.wp_create_nonce('adec-posts-nonce').'</span>', 'redux-framework-demo' ),
                    'desc'     => __( '', 'redux-framework-demo' ),
                    'default'  => '',
                    'hidden'   => true
                    ),
                array( 
                    'id'       => 'opt-raw-multi-page',
                    'type'     => 'raw',
                    'title'    => __('', 'redux-framework-demo'),
                    'subtitle' => __('', 'redux-framework-demo'),
                    'desc'     => __('', 'redux-framework-demo'),
                    'content'  => file_get_contents(dirname(__FILE__) . '/adec_multi_page.php')
                    )



                )
            ) );

    }else{

        Redux::setSection( $opt_name, array(
            'title' => __( 'Select Pages', 'redux-framework-demo' ),
            'id'    => 'select',
            'icon'  => 'el el-list-alt'
            ) );

        Redux::setSection( $opt_name, array(
            'title'            => __( 'Notice', 'redux-framework-demo' ),
            'desc'             => __( '', 'redux-framework-demo' ) . '',
            'id'               => 'basic-Text-notice',
            'subsection'       => true,
            'customizer_width' => '700px',
            'fields'           => array(

                array( 
                    'id'       => 'opt-raw',
                    'type'     => 'raw',
                    'title'    => __('', 'redux-framework-demo'),
                    'subtitle' => __('', 'redux-framework-demo'),
                    'desc'     => __('', 'redux-framework-demo'),
                    'content'  =>  file_get_contents(dirname(__FILE__) . '/adec_notice.php'),
                    )

                )
            ));

    }





            }


}else{


    Redux::setSection( $opt_name, array(
        'title'            => __( 'Store Configuration', 'redux-framework-demo' ),
        'desc'             => __( '', 'redux-framework-demo' ) . '',
        'id'               => 'basic-Text',
        'subsection'       => true,
        'customizer_width' => '700px',
        'fields'           => array(
            array( 
                'id'       => 'opt-raw',
                'type'     => 'raw',
                'title'    => __('', 'redux-framework-demo'),
                'subtitle' => __('', 'redux-framework-demo'),
                'desc'     => __('', 'redux-framework-demo'),
                'content'  => file_get_contents(dirname(__FILE__) . '/adec_notice_woo.php'),
                )

            )
        ));

}



    

    /*
     * <--- END SECTIONS
     */


    /*
     *
     * YOU MUST PREFIX THE FUNCTIONS BELOW AND ACTION FUNCTION CALLS OR ANY OTHER CONFIG MAY OVERRIDE YOUR CODE.
     *
     */

    /*
    *
    * --> Action hook examples
    *
    */

    // If Redux is running as a plugin, this will remove the demo notice and links
    add_action( 'redux/loaded', 'remove_demo' );

    // Function to test the compiler hook and demo CSS output.
    // Above 10 is a priority, but 2 in necessary to include the dynamically generated CSS to be sent to the function.
    //add_filter('redux/options/' . $opt_name . '/compiler', 'compiler_action', 10, 3);

    // Change the arguments after they've been declared, but before the panel is created
    //add_filter('redux/options/' . $opt_name . '/args', 'change_arguments' );

    // Change the default value of a field after it's been set, but before it's been useds
    //add_filter('redux/options/' . $opt_name . '/defaults', 'change_defaults' );

    // Dynamically add a section. Can be also used to modify sections/fields
    //add_filter('redux/options/' . $opt_name . '/sections', 'dynamic_section');

    /**
     * This is a test function that will let you see when the compiler hook occurs.
     * It only runs if a field    set with compiler=>true is changed.
     * */
    if ( ! function_exists( 'compiler_action' ) ) {
        function compiler_action( $options, $css, $changed_values ) {
            echo '<h1>The compiler hook has run!</h1>';
            echo "<pre>";
            print_r( $changed_values ); // Values that have changed since the last save
            echo "</pre>";
            //print_r($options); //Option values
            //print_r($css); // Compiler selector CSS values  compiler => array( CSS SELECTORS )
        }
    }

    /**
     * Custom function for the callback validation referenced above
     * */
    if ( ! function_exists( 'redux_validate_callback_function' ) ) {
        function redux_validate_callback_function( $field, $value, $existing_value ) {
            $error   = false;
            $warning = false;

            //do your validation
            if ( $value == 1 ) {
                $error = true;
                $value = $existing_value;
            } elseif ( $value == 2 ) {
                $warning = true;
                $value   = $existing_value;
            }

            $return['value'] = $value;

            if ( $error == true ) {
                $return['error'] = $field;
                $field['msg']    = 'your custom error message';
            }

            if ( $warning == true ) {
                $return['warning'] = $field;
                $field['msg']      = 'your custom warning message';
            }

            return $return;
        }
    }

    /**
     * Custom function for the callback referenced above
     */
    if ( ! function_exists( 'redux_my_custom_field' ) ) {
        function redux_my_custom_field( $field, $value ) {
            print_r( $field );
            echo '<br/>';
            print_r( $value );
        }
    }



    /**
     * Custom function for filtering the sections array. Good for child themes to override or add to the sections.
     * Simply include this function in the child themes functions.php file.
     * NOTE: the defined constants for URLs, and directories will NOT be available at this point in a child theme,
     * so you must use get_template_directory_uri() if you want to use any of the built in icons
     * */
    if ( ! function_exists( 'dynamic_section' ) ) {
        function dynamic_section( $sections ) {
            //$sections = array();
            $sections[] = array(
                'title'  => __( 'Section via hook', 'redux-framework-demo' ),
                'desc'   => __( '<p class="description">This is a section created by adding a filter to the sections array. Can be used by child themes to add/remove sections from the options.</p>', 'redux-framework-demo' ),
                'icon'   => 'el el-paper-clip',
                // Leave this as a blank section, no options just some intro text set above.
                'fields' => array()
            );

            return $sections;
        }
    }

    /**
     * Filter hook for filtering the args. Good for child themes to override or add to the args array. Can also be used in other functions.
     * */
    if ( ! function_exists( 'change_arguments' ) ) {
        function change_arguments( $args ) {
            //$args['dev_mode'] = true;

            return $args;
        }
    }

    /**
     * Filter hook for filtering the default value of any given field. Very useful in development mode.
     * */
    if ( ! function_exists( 'change_defaults' ) ) {
        function change_defaults( $defaults ) {
            $defaults['str_replace'] = 'Testing filter hook!';

            return $defaults;
        }
    }

    /**
     * Removes the demo link and the notice of integrated demo from the redux-framework plugin
     */
    if ( ! function_exists( 'remove_demo' ) ) {
        function remove_demo() {
            // Used to hide the demo mode link from the plugin page. Only used when Redux is a plugin.
            if ( class_exists( 'ReduxFrameworkPlugin' ) ) {
                remove_filter( 'plugin_row_meta', array(
                    ReduxFrameworkPlugin::instance(),
                    'plugin_metalinks'
                ), null, 2 );

                // Used to hide the activation notice informing users of the demo panel. Only used when Redux is a plugin.
                remove_action( 'admin_notices', array( ReduxFrameworkPlugin::instance(), 'admin_notices' ) );
            }
        }
    }

