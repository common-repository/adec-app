<?php
    /**
     * The template for the panel header area.
     * Override this template by specifying the path where it is stored (templates_path) in your Redux config.
     *
     * @author      Redux Framework
     * @package     ReduxFramework/Templates
     * @version:    3.5.4.18
     */

    $tip_title = __( 'Developer Mode Enabled', 'redux-framework' );

    if ( $this->parent->dev_mode_forced ) {
        $is_debug     = false;
        $is_localhost = false;

        $debug_bit = '';
        if ( Redux_Helpers::isWpDebug() ) {
            $is_debug  = true;
            $debug_bit = __( 'WP_DEBUG is enabled', 'redux-framework' );
        }

        $localhost_bit = '';
        if ( Redux_Helpers::isLocalHost() ) {
            $is_localhost  = true;
            $localhost_bit = __( 'you are working in a localhost environment', 'redux-framework' );
        }

        $conjunction_bit = '';
        if ( $is_localhost && $is_debug ) {
            $conjunction_bit = ' ' . __( 'and', 'redux-framework' ) . ' ';
        }

        $tip_msg = __( 'This has been automatically enabled because', 'redux-framework' ) . ' ' . $debug_bit . $conjunction_bit . $localhost_bit . '.';
    } else {
        $tip_msg = __( 'If you are not a developer, your theme/plugin author shipped with developer mode enabled. Contact them directly to fix it.', 'redux-framework' );
    }

?>
<div id="redux-header">
    <?php if ( ! empty( $this->parent->args['display_name'] ) ) { ?>
        <div class="display_header" style="margin: 0px">
             
            <?php if ( isset( $this->parent->args['dev_mode'] ) && $this->parent->args['dev_mode'] ) { ?>
                <div class="redux-dev-mode-notice-container redux-dev-qtip"
                     qtip-title="<?php echo esc_attr( $tip_title ); ?>"
                     qtip-content="<?php echo esc_attr( $tip_msg ); ?>">
                     
                </div>
            <?php } elseif (isset($this->parent->args['forced_dev_mode_off']) && $this->parent->args['forced_dev_mode_off'] == true ) { ?>
                <?php $tip_title    = 'The "forced_dev_mode_off" argument has been set to true.'; ?>
                <?php $tip_msg      = 'Support options are not available while this argument is enabled.  You will also need to switch this argument to false before deploying your project.  If you are a user of this product and you are seeing this message, please contact the author of this theme/plugin.'; ?>
                <div class="redux-dev-mode-notice-container redux-dev-qtip" 
                     qtip-title="<?php echo esc_attr( $tip_title ); ?>"
                     qtip-content="<?php echo esc_attr( $tip_msg ); ?>">

                </div>
            
            <?php } ?>

            <h2>
            <?php echo wp_kses_post( $this->parent->args['display_name'] ); ?>
                
<?php if ( ! empty( $this->parent->args['display_version'] ) ) { ?>
                <span><?php echo wp_kses_post( $this->parent->args['display_version'] ); ?></span>
            <?php } ?>
            </h2>

            
            <h2><a class="top_button" href="http://adecapp.com/" target="_blank">Contact Us</a></h2>
            <h2><a class="top_button" href="http://adecapp.com/" target="_blank">Upcoming Feature</a></h2>
            <h2><a class="top_button" href="http://adecapp.com/" target="_blank">Feedback</a></h2>
            <h2><a    href="https://play.google.com/store/apps/details?id=com.mannit.adecapp" target="_blank"><img style="margin-top: -8px; width: 120px" src="<?php echo ReduxFramework::$_url.'assets/img/adec_app.png'?>" alt=""></a></h2>

        </div>
    <?php } ?>
    
    <div class="clear"></div>
<style type="text/css">
    .redux-container #redux-header .display_header h2{
        float: left;
    }
</style>
</div>