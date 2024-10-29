(function( $ ) {
	'use strict';

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	 jQuery(document).ready(function($){
	 	$('#upload-btn').click(function(e) {
	 		e.preventDefault();
	 		var image = wp.media({ 
	 			title: 'Upload Image',
            // mutiple: true if you want to upload multiple files at once
            multiple: false
        }).open()
	 		.on('select', function(e){
            // This will return the selected image from the Media Uploader, the result is an object
            var uploaded_image = image.state().get('selection').first();
            // We convert uploaded_image to a JSON object to make accessing it easier
            // Output to the console uploaded_image
            console.log(uploaded_image);
            var obs_logo = uploaded_image.toJSON().url;
            // Let's assign the url value to the input field
            $('#obs_logo').val(obs_logo);
            $('#imgs').attr('src', obs_logo);
        });
	 	});
	 });


// 	 $(function() {
//     var items = $('#v-nav>ul>li').each(function() {
//         $(this).click(function() {
//             //remove previous class and add it to clicked tab
//             items.removeClass('current');
//             $(this).addClass('current');

//             //hide all content divs and show current one
//             $('#v-nav>div.tab-content').hide().eq(items.index($(this))).show('fast');

//             window.location.hash = $(this).attr('tab');
//         });
//     });

//     if (location.hash) {
//         showTab(location.hash);
//     }
//     else {
//         showTab("tab1");
//     }

//     function showTab(tab) {
//         $("#v-nav ul li:[tab*="+tab +"]").click();
//     }

//     // Bind the event hashchange, using jquery-hashchange-plugin
//     $(window).hashchange(function() {
//         showTab(location.hash.replace("#", ""));
//     })

//     // Trigger the event hashchange on page load, using jquery-hashchange-plugin
//     $(window).hashchange();
// });

})( jQuery );
