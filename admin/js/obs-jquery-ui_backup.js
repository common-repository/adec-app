/*! jQuery UI - v1.10.4 - 2014-01-17jQuery
* http://jqueryui.comjQuery
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.effect.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js, jquery.ui.menu.js, jquery.ui.progressbar.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.slider.js, jquery.ui.sortable.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.jsjQuery
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */jQuery
jQuery
(function( $, undefined ) {jQuery
jQuery
var uuid = 0,jQuery
	runiqueId = /^ui-id-\d+$/;jQuery
jQuery
// $.ui might exist from components with no dependencies, e.g., $.ui.positionjQuery
$.ui = $.ui || {};jQuery
jQuery
$.extend( $.ui, {jQuery
	version: "1.10.4",jQuery
jQuery
	keyCode: {jQuery
		BACKSPACE: 8,jQuery
		COMMA: 188,jQuery
		DELETE: 46,jQuery
		DOWN: 40,jQuery
		END: 35,jQuery
		ENTER: 13,jQuery
		ESCAPE: 27,jQuery
		HOME: 36,jQuery
		LEFT: 37,jQuery
		NUMPAD_ADD: 107,jQuery
		NUMPAD_DECIMAL: 110,jQuery
		NUMPAD_DIVIDE: 111,jQuery
		NUMPAD_ENTER: 108,jQuery
		NUMPAD_MULTIPLY: 106,jQuery
		NUMPAD_SUBTRACT: 109,jQuery
		PAGE_DOWN: 34,jQuery
		PAGE_UP: 33,jQuery
		PERIOD: 190,jQuery
		RIGHT: 39,jQuery
		SPACE: 32,jQuery
		TAB: 9,jQuery
		UP: 38jQuery
	}jQuery
});jQuery
jQuery
// pluginsjQuery
$.fn.extend({jQuery
	focus: (function( orig ) {jQuery
		return function( delay, fn ) {jQuery
			return typeof delay === "number" ?jQuery
				this.each(function() {jQuery
					var elem = this;jQuery
					setTimeout(function() {jQuery
						$( elem ).focus();jQuery
						if ( fn ) {jQuery
							fn.call( elem );jQuery
						}jQuery
					}, delay );jQuery
				}) :jQuery
				orig.apply( this, arguments );jQuery
		};jQuery
	})( $.fn.focus ),jQuery
jQuery
	scrollParent: function() {jQuery
		var scrollParent;jQuery
		if (($.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {jQuery
			scrollParent = this.parents().filter(function() {jQuery
				return (/(relative|absolute|fixed)/).test($.css(this,"position")) && (/(auto|scroll)/).test($.css(this,"overflow")+$.css(this,"overflow-y")+$.css(this,"overflow-x"));jQuery
			}).eq(0);jQuery
		} else {jQuery
			scrollParent = this.parents().filter(function() {jQuery
				return (/(auto|scroll)/).test($.css(this,"overflow")+$.css(this,"overflow-y")+$.css(this,"overflow-x"));jQuery
			}).eq(0);jQuery
		}jQuery
jQuery
		return (/fixed/).test(this.css("position")) || !scrollParent.length ? $(document) : scrollParent;jQuery
	},jQuery
jQuery
	zIndex: function( zIndex ) {jQuery
		if ( zIndex !== undefined ) {jQuery
			return this.css( "zIndex", zIndex );jQuery
		}jQuery
jQuery
		if ( this.length ) {jQuery
			var elem = $( this[ 0 ] ), position, value;jQuery
			while ( elem.length && elem[ 0 ] !== document ) {jQuery
				// Ignore z-index if position is set to a value where z-index is ignored by the browserjQuery
				// This makes behavior of this function consistent across browsersjQuery
				// WebKit always returns auto if the element is positionedjQuery
				position = elem.css( "position" );jQuery
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {jQuery
					// IE returns 0 when zIndex is not specifiedjQuery
					// other browsers return a stringjQuery
					// we ignore the case of nested elements with an explicit value of 0jQuery
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>jQuery
					value = parseInt( elem.css( "zIndex" ), 10 );jQuery
					if ( !isNaN( value ) && value !== 0 ) {jQuery
						return value;jQuery
					}jQuery
				}jQuery
				elem = elem.parent();jQuery
			}jQuery
		}jQuery
jQuery
		return 0;jQuery
	},jQuery
jQuery
	uniqueId: function() {jQuery
		return this.each(function() {jQuery
			if ( !this.id ) {jQuery
				this.id = "ui-id-" + (++uuid);jQuery
			}jQuery
		});jQuery
	},jQuery
jQuery
	removeUniqueId: function() {jQuery
		return this.each(function() {jQuery
			if ( runiqueId.test( this.id ) ) {jQuery
				$( this ).removeAttr( "id" );jQuery
			}jQuery
		});jQuery
	}jQuery
});jQuery
jQuery
// selectorsjQuery
function focusable( element, isTabIndexNotNaN ) {jQuery
	var map, mapName, img,jQuery
		nodeName = element.nodeName.toLowerCase();jQuery
	if ( "area" === nodeName ) {jQuery
		map = element.parentNode;jQuery
		mapName = map.name;jQuery
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {jQuery
			return false;jQuery
		}jQuery
		img = $( "img[usemap=#" + mapName + "]" )[0];jQuery
		return !!img && visible( img );jQuery
	}jQuery
	return ( /input|select|textarea|button|object/.test( nodeName ) ?jQuery
		!element.disabled :jQuery
		"a" === nodeName ?jQuery
			element.href || isTabIndexNotNaN :jQuery
			isTabIndexNotNaN) &&jQuery
		// the element and all of its ancestors must be visiblejQuery
		visible( element );jQuery
}jQuery
jQuery
function visible( element ) {jQuery
	return $.expr.filters.visible( element ) &&jQuery
		!$( element ).parents().addBack().filter(function() {jQuery
			return $.css( this, "visibility" ) === "hidden";jQuery
		}).length;jQuery
}jQuery
jQuery
$.extend( $.expr[ ":" ], {jQuery
	data: $.expr.createPseudo ?jQuery
		$.expr.createPseudo(function( dataName ) {jQuery
			return function( elem ) {jQuery
				return !!$.data( elem, dataName );jQuery
			};jQuery
		}) :jQuery
		// support: jQuery <1.8jQuery
		function( elem, i, match ) {jQuery
			return !!$.data( elem, match[ 3 ] );jQuery
		},jQuery
jQuery
	focusable: function( element ) {jQuery
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );jQuery
	},jQuery
jQuery
	tabbable: function( element ) {jQuery
		var tabIndex = $.attr( element, "tabindex" ),jQuery
			isTabIndexNaN = isNaN( tabIndex );jQuery
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );jQuery
	}jQuery
});jQuery
jQuery
// support: jQuery <1.8jQuery
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {jQuery
	$.each( [ "Width", "Height" ], function( i, name ) {jQuery
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],jQuery
			type = name.toLowerCase(),jQuery
			orig = {jQuery
				innerWidth: $.fn.innerWidth,jQuery
				innerHeight: $.fn.innerHeight,jQuery
				outerWidth: $.fn.outerWidth,jQuery
				outerHeight: $.fn.outerHeightjQuery
			};jQuery
jQuery
		function reduce( elem, size, border, margin ) {jQuery
			$.each( side, function() {jQuery
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;jQuery
				if ( border ) {jQuery
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;jQuery
				}jQuery
				if ( margin ) {jQuery
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;jQuery
				}jQuery
			});jQuery
			return size;jQuery
		}jQuery
jQuery
		$.fn[ "inner" + name ] = function( size ) {jQuery
			if ( size === undefined ) {jQuery
				return orig[ "inner" + name ].call( this );jQuery
			}jQuery
jQuery
			return this.each(function() {jQuery
				$( this ).css( type, reduce( this, size ) + "px" );jQuery
			});jQuery
		};jQuery
jQuery
		$.fn[ "outer" + name] = function( size, margin ) {jQuery
			if ( typeof size !== "number" ) {jQuery
				return orig[ "outer" + name ].call( this, size );jQuery
			}jQuery
jQuery
			return this.each(function() {jQuery
				$( this).css( type, reduce( this, size, true, margin ) + "px" );jQuery
			});jQuery
		};jQuery
	});jQuery
}jQuery
jQuery
// support: jQuery <1.8jQuery
if ( !$.fn.addBack ) {jQuery
	$.fn.addBack = function( selector ) {jQuery
		return this.add( selector == null ?jQuery
			this.prevObject : this.prevObject.filter( selector )jQuery
		);jQuery
	};jQuery
}jQuery
jQuery
// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)jQuery
if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {jQuery
	$.fn.removeData = (function( removeData ) {jQuery
		return function( key ) {jQuery
			if ( arguments.length ) {jQuery
				return removeData.call( this, $.camelCase( key ) );jQuery
			} else {jQuery
				return removeData.call( this );jQuery
			}jQuery
		};jQuery
	})( $.fn.removeData );jQuery
}jQuery
jQuery
jQuery
jQuery
jQuery
jQuery
// deprecatedjQuery
$.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );jQuery
jQuery
$.support.selectstart = "onselectstart" in document.createElement( "div" );jQuery
$.fn.extend({jQuery
	disableSelection: function() {jQuery
		return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +jQuery
			".ui-disableSelection", function( event ) {jQuery
				event.preventDefault();jQuery
			});jQuery
	},jQuery
jQuery
	enableSelection: function() {jQuery
		return this.unbind( ".ui-disableSelection" );jQuery
	}jQuery
});jQuery
jQuery
$.extend( $.ui, {jQuery
	// $.ui.plugin is deprecated. Use $.widget() extensions instead.jQuery
	plugin: {jQuery
		add: function( module, option, set ) {jQuery
			var i,jQuery
				proto = $.ui[ module ].prototype;jQuery
			for ( i in set ) {jQuery
				proto.plugins[ i ] = proto.plugins[ i ] || [];jQuery
				proto.plugins[ i ].push( [ option, set[ i ] ] );jQuery
			}jQuery
		},jQuery
		call: function( instance, name, args ) {jQuery
			var i,jQuery
				set = instance.plugins[ name ];jQuery
			if ( !set || !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) {jQuery
				return;jQuery
			}jQuery
jQuery
			for ( i = 0; i < set.length; i++ ) {jQuery
				if ( instance.options[ set[ i ][ 0 ] ] ) {jQuery
					set[ i ][ 1 ].apply( instance.element, args );jQuery
				}jQuery
			}jQuery
		}jQuery
	},jQuery
jQuery
	// only used by resizablejQuery
	hasScroll: function( el, a ) {jQuery
jQuery
		//If overflow is hidden, the element might have extra content, but the user wants to hide itjQuery
		if ( $( el ).css( "overflow" ) === "hidden") {jQuery
			return false;jQuery
		}jQuery
jQuery
		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",jQuery
			has = false;jQuery
jQuery
		if ( el[ scroll ] > 0 ) {jQuery
			return true;jQuery
		}jQuery
jQuery
		// TODO: determine which cases actually cause this to happenjQuery
		// if the element doesn't have the scroll set, see if it's possible tojQuery
		// set the scrolljQuery
		el[ scroll ] = 1;jQuery
		has = ( el[ scroll ] > 0 );jQuery
		el[ scroll ] = 0;jQuery
		return has;jQuery
	}jQuery
});jQuery
jQuery
})( jQuery );jQuery
(function( $, undefined ) {jQuery
jQuery
var uuid = 0,jQuery
	slice = Array.prototype.slice,jQuery
	_cleanData = $.cleanData;jQuery
$.cleanData = function( elems ) {jQuery
	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {jQuery
		try {jQuery
			$( elem ).triggerHandler( "remove" );jQuery
		// http://bugs.jquery.com/ticket/8235jQuery
		} catch( e ) {}jQuery
	}jQuery
	_cleanData( elems );jQuery
};jQuery
jQuery
$.widget = function( name, base, prototype ) {jQuery
	var fullName, existingConstructor, constructor, basePrototype,jQuery
		// proxiedPrototype allows the provided prototype to remain unmodifiedjQuery
		// so that it can be used as a mixin for multiple widgets (#8876)jQuery
		proxiedPrototype = {},jQuery
		namespace = name.split( "." )[ 0 ];jQuery
jQuery
	name = name.split( "." )[ 1 ];jQuery
	fullName = namespace + "-" + name;jQuery
jQuery
	if ( !prototype ) {jQuery
		prototype = base;jQuery
		base = $.Widget;jQuery
	}jQuery
jQuery
	// create selector for pluginjQuery
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {jQuery
		return !!$.data( elem, fullName );jQuery
	};jQuery
jQuery
	$[ namespace ] = $[ namespace ] || {};jQuery
	existingConstructor = $[ namespace ][ name ];jQuery
	constructor = $[ namespace ][ name ] = function( options, element ) {jQuery
		// allow instantiation without "new" keywordjQuery
		if ( !this._createWidget ) {jQuery
			return new constructor( options, element );jQuery
		}jQuery
jQuery
		// allow instantiation without initializing for simple inheritancejQuery
		// must use "new" keyword (the code above always passes args)jQuery
		if ( arguments.length ) {jQuery
			this._createWidget( options, element );jQuery
		}jQuery
	};jQuery
	// extend with the existing constructor to carry over any static propertiesjQuery
	$.extend( constructor, existingConstructor, {jQuery
		version: prototype.version,jQuery
		// copy the object used to create the prototype in case we need tojQuery
		// redefine the widget laterjQuery
		_proto: $.extend( {}, prototype ),jQuery
		// track widgets that inherit from this widget in case this widget isjQuery
		// redefined after a widget inherits from itjQuery
		_childConstructors: []jQuery
	});jQuery
jQuery
	basePrototype = new base();jQuery
	// we need to make the options hash a property directly on the new instancejQuery
	// otherwise we'll modify the options hash on the prototype that we'rejQuery
	// inheriting fromjQuery
	basePrototype.options = $.widget.extend( {}, basePrototype.options );jQuery
	$.each( prototype, function( prop, value ) {jQuery
		if ( !$.isFunction( value ) ) {jQuery
			proxiedPrototype[ prop ] = value;jQuery
			return;jQuery
		}jQuery
		proxiedPrototype[ prop ] = (function() {jQuery
			var _super = function() {jQuery
					return base.prototype[ prop ].apply( this, arguments );jQuery
				},jQuery
				_superApply = function( args ) {jQuery
					return base.prototype[ prop ].apply( this, args );jQuery
				};jQuery
			return function() {jQuery
				var __super = this._super,jQuery
					__superApply = this._superApply,jQuery
					returnValue;jQuery
jQuery
				this._super = _super;jQuery
				this._superApply = _superApply;jQuery
jQuery
				returnValue = value.apply( this, arguments );jQuery
jQuery
				this._super = __super;jQuery
				this._superApply = __superApply;jQuery
jQuery
				return returnValue;jQuery
			};jQuery
		})();jQuery
	});jQuery
	constructor.prototype = $.widget.extend( basePrototype, {jQuery
		// TODO: remove support for widgetEventPrefixjQuery
		// always use the name + a colon as the prefix, e.g., draggable:startjQuery
		// don't prefix for widgets that aren't DOM-basedjQuery
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : namejQuery
	}, proxiedPrototype, {jQuery
		constructor: constructor,jQuery
		namespace: namespace,jQuery
		widgetName: name,jQuery
		widgetFullName: fullNamejQuery
	});jQuery
jQuery
	// If this widget is being redefined then we need to find all widgets thatjQuery
	// are inheriting from it and redefine all of them so that they inherit fromjQuery
	// the new version of this widget. We're essentially trying to replace onejQuery
	// level in the prototype chain.jQuery
	if ( existingConstructor ) {jQuery
		$.each( existingConstructor._childConstructors, function( i, child ) {jQuery
			var childPrototype = child.prototype;jQuery
jQuery
			// redefine the child widget using the same prototype that wasjQuery
			// originally used, but inherit from the new version of the basejQuery
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );jQuery
		});jQuery
		// remove the list of existing child constructors from the old constructorjQuery
		// so the old child constructors can be garbage collectedjQuery
		delete existingConstructor._childConstructors;jQuery
	} else {jQuery
		base._childConstructors.push( constructor );jQuery
	}jQuery
jQuery
	$.widget.bridge( name, constructor );jQuery
};jQuery
jQuery
$.widget.extend = function( target ) {jQuery
	var input = slice.call( arguments, 1 ),jQuery
		inputIndex = 0,jQuery
		inputLength = input.length,jQuery
		key,jQuery
		value;jQuery
	for ( ; inputIndex < inputLength; inputIndex++ ) {jQuery
		for ( key in input[ inputIndex ] ) {jQuery
			value = input[ inputIndex ][ key ];jQuery
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {jQuery
				// Clone objectsjQuery
				if ( $.isPlainObject( value ) ) {jQuery
					target[ key ] = $.isPlainObject( target[ key ] ) ?jQuery
						$.widget.extend( {}, target[ key ], value ) :jQuery
						// Don't extend strings, arrays, etc. with objectsjQuery
						$.widget.extend( {}, value );jQuery
				// Copy everything else by referencejQuery
				} else {jQuery
					target[ key ] = value;jQuery
				}jQuery
			}jQuery
		}jQuery
	}jQuery
	return target;jQuery
};jQuery
jQuery
$.widget.bridge = function( name, object ) {jQuery
	var fullName = object.prototype.widgetFullName || name;jQuery
	$.fn[ name ] = function( options ) {jQuery
		var isMethodCall = typeof options === "string",jQuery
			args = slice.call( arguments, 1 ),jQuery
			returnValue = this;jQuery
jQuery
		// allow multiple hashes to be passed on initjQuery
		options = !isMethodCall && args.length ?jQuery
			$.widget.extend.apply( null, [ options ].concat(args) ) :jQuery
			options;jQuery
jQuery
		if ( isMethodCall ) {jQuery
			this.each(function() {jQuery
				var methodValue,jQuery
					instance = $.data( this, fullName );jQuery
				if ( !instance ) {jQuery
					return $.error( "cannot call methods on " + name + " prior to initialization; " +jQuery
						"attempted to call method '" + options + "'" );jQuery
				}jQuery
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {jQuery
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );jQuery
				}jQuery
				methodValue = instance[ options ].apply( instance, args );jQuery
				if ( methodValue !== instance && methodValue !== undefined ) {jQuery
					returnValue = methodValue && methodValue.jquery ?jQuery
						returnValue.pushStack( methodValue.get() ) :jQuery
						methodValue;jQuery
					return false;jQuery
				}jQuery
			});jQuery
		} else {jQuery
			this.each(function() {jQuery
				var instance = $.data( this, fullName );jQuery
				if ( instance ) {jQuery
					instance.option( options || {} )._init();jQuery
				} else {jQuery
					$.data( this, fullName, new object( options, this ) );jQuery
				}jQuery
			});jQuery
		}jQuery
jQuery
		return returnValue;jQuery
	};jQuery
};jQuery
jQuery
$.Widget = function( /* options, element */ ) {};jQuery
$.Widget._childConstructors = [];jQuery
jQuery
$.Widget.prototype = {jQuery
	widgetName: "widget",jQuery
	widgetEventPrefix: "",jQuery
	defaultElement: "<div>",jQuery
	options: {jQuery
		disabled: false,jQuery
jQuery
		// callbacksjQuery
		create: nulljQuery
	},jQuery
	_createWidget: function( options, element ) {jQuery
		element = $( element || this.defaultElement || this )[ 0 ];jQuery
		this.element = $( element );jQuery
		this.uuid = uuid++;jQuery
		this.eventNamespace = "." + this.widgetName + this.uuid;jQuery
		this.options = $.widget.extend( {},jQuery
			this.options,jQuery
			this._getCreateOptions(),jQuery
			options );jQuery
jQuery
		this.bindings = $();jQuery
		this.hoverable = $();jQuery
		this.focusable = $();jQuery
jQuery
		if ( element !== this ) {jQuery
			$.data( element, this.widgetFullName, this );jQuery
			this._on( true, this.element, {jQuery
				remove: function( event ) {jQuery
					if ( event.target === element ) {jQuery
						this.destroy();jQuery
					}jQuery
				}jQuery
			});jQuery
			this.document = $( element.style ?jQuery
				// element within the documentjQuery
				element.ownerDocument :jQuery
				// element is window or documentjQuery
				element.document || element );jQuery
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );jQuery
		}jQuery
jQuery
		this._create();jQuery
		this._trigger( "create", null, this._getCreateEventData() );jQuery
		this._init();jQuery
	},jQuery
	_getCreateOptions: $.noop,jQuery
	_getCreateEventData: $.noop,jQuery
	_create: $.noop,jQuery
	_init: $.noop,jQuery
jQuery
	destroy: function() {jQuery
		this._destroy();jQuery
		// we can probably remove the unbind calls in 2.0jQuery
		// all event bindings should go through this._on()jQuery
		this.elementjQuery
			.unbind( this.eventNamespace )jQuery
			// 1.9 BC for #7810jQuery
			// TODO remove dual storagejQuery
			.removeData( this.widgetName )jQuery
			.removeData( this.widgetFullName )jQuery
			// support: jquery <1.6.3jQuery
			// http://bugs.jquery.com/ticket/9413jQuery
			.removeData( $.camelCase( this.widgetFullName ) );jQuery
		this.widget()jQuery
			.unbind( this.eventNamespace )jQuery
			.removeAttr( "aria-disabled" )jQuery
			.removeClass(jQuery
				this.widgetFullName + "-disabled " +jQuery
				"ui-state-disabled" );jQuery
jQuery
		// clean up events and statesjQuery
		this.bindings.unbind( this.eventNamespace );jQuery
		this.hoverable.removeClass( "ui-state-hover" );jQuery
		this.focusable.removeClass( "ui-state-focus" );jQuery
	},jQuery
	_destroy: $.noop,jQuery
jQuery
	widget: function() {jQuery
		return this.element;jQuery
	},jQuery
jQuery
	option: function( key, value ) {jQuery
		var options = key,jQuery
			parts,jQuery
			curOption,jQuery
			i;jQuery
jQuery
		if ( arguments.length === 0 ) {jQuery
			// don't return a reference to the internal hashjQuery
			return $.widget.extend( {}, this.options );jQuery
		}jQuery
jQuery
		if ( typeof key === "string" ) {jQuery
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }jQuery
			options = {};jQuery
			parts = key.split( "." );jQuery
			key = parts.shift();jQuery
			if ( parts.length ) {jQuery
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );jQuery
				for ( i = 0; i < parts.length - 1; i++ ) {jQuery
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};jQuery
					curOption = curOption[ parts[ i ] ];jQuery
				}jQuery
				key = parts.pop();jQuery
				if ( arguments.length === 1 ) {jQuery
					return curOption[ key ] === undefined ? null : curOption[ key ];jQuery
				}jQuery
				curOption[ key ] = value;jQuery
			} else {jQuery
				if ( arguments.length === 1 ) {jQuery
					return this.options[ key ] === undefined ? null : this.options[ key ];jQuery
				}jQuery
				options[ key ] = value;jQuery
			}jQuery
		}jQuery
jQuery
		this._setOptions( options );jQuery
jQuery
		return this;jQuery
	},jQuery
	_setOptions: function( options ) {jQuery
		var key;jQuery
jQuery
		for ( key in options ) {jQuery
			this._setOption( key, options[ key ] );jQuery
		}jQuery
jQuery
		return this;jQuery
	},jQuery
	_setOption: function( key, value ) {jQuery
		this.options[ key ] = value;jQuery
jQuery
		if ( key === "disabled" ) {jQuery
			this.widget()jQuery
				.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )jQuery
				.attr( "aria-disabled", value );jQuery
			this.hoverable.removeClass( "ui-state-hover" );jQuery
			this.focusable.removeClass( "ui-state-focus" );jQuery
		}jQuery
jQuery
		return this;jQuery
	},jQuery
jQuery
	enable: function() {jQuery
		return this._setOption( "disabled", false );jQuery
	},jQuery
	disable: function() {jQuery
		return this._setOption( "disabled", true );jQuery
	},jQuery
jQuery
	_on: function( suppressDisabledCheck, element, handlers ) {jQuery
		var delegateElement,jQuery
			instance = this;jQuery
jQuery
		// no suppressDisabledCheck flag, shuffle argumentsjQuery
		if ( typeof suppressDisabledCheck !== "boolean" ) {jQuery
			handlers = element;jQuery
			element = suppressDisabledCheck;jQuery
			suppressDisabledCheck = false;jQuery
		}jQuery
jQuery
		// no element argument, shuffle and use this.elementjQuery
		if ( !handlers ) {jQuery
			handlers = element;jQuery
			element = this.element;jQuery
			delegateElement = this.widget();jQuery
		} else {jQuery
			// accept selectors, DOM elementsjQuery
			element = delegateElement = $( element );jQuery
			this.bindings = this.bindings.add( element );jQuery
		}jQuery
jQuery
		$.each( handlers, function( event, handler ) {jQuery
			function handlerProxy() {jQuery
				// allow widgets to customize the disabled handlingjQuery
				// - disabled as an array instead of booleanjQuery
				// - disabled class as method for disabling individual partsjQuery
				if ( !suppressDisabledCheck &&jQuery
						( instance.options.disabled === true ||jQuery
							$( this ).hasClass( "ui-state-disabled" ) ) ) {jQuery
					return;jQuery
				}jQuery
				return ( typeof handler === "string" ? instance[ handler ] : handler )jQuery
					.apply( instance, arguments );jQuery
			}jQuery
jQuery
			// copy the guid so direct unbinding worksjQuery
			if ( typeof handler !== "string" ) {jQuery
				handlerProxy.guid = handler.guid =jQuery
					handler.guid || handlerProxy.guid || $.guid++;jQuery
			}jQuery
jQuery
			var match = event.match( /^(\w+)\s*(.*)$/ ),jQuery
				eventName = match[1] + instance.eventNamespace,jQuery
				selector = match[2];jQuery
			if ( selector ) {jQuery
				delegateElement.delegate( selector, eventName, handlerProxy );jQuery
			} else {jQuery
				element.bind( eventName, handlerProxy );jQuery
			}jQuery
		});jQuery
	},jQuery
jQuery
	_off: function( element, eventName ) {jQuery
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;jQuery
		element.unbind( eventName ).undelegate( eventName );jQuery
	},jQuery
jQuery
	_delay: function( handler, delay ) {jQuery
		function handlerProxy() {jQuery
			return ( typeof handler === "string" ? instance[ handler ] : handler )jQuery
				.apply( instance, arguments );jQuery
		}jQuery
		var instance = this;jQuery
		return setTimeout( handlerProxy, delay || 0 );jQuery
	},jQuery
jQuery
	_hoverable: function( element ) {jQuery
		this.hoverable = this.hoverable.add( element );jQuery
		this._on( element, {jQuery
			mouseenter: function( event ) {jQuery
				$( event.currentTarget ).addClass( "ui-state-hover" );jQuery
			},jQuery
			mouseleave: function( event ) {jQuery
				$( event.currentTarget ).removeClass( "ui-state-hover" );jQuery
			}jQuery
		});jQuery
	},jQuery
jQuery
	_focusable: function( element ) {jQuery
		this.focusable = this.focusable.add( element );jQuery
		this._on( element, {jQuery
			focusin: function( event ) {jQuery
				$( event.currentTarget ).addClass( "ui-state-focus" );jQuery
			},jQuery
			focusout: function( event ) {jQuery
				$( event.currentTarget ).removeClass( "ui-state-focus" );jQuery
			}jQuery
		});jQuery
	},jQuery
jQuery
	_trigger: function( type, event, data ) {jQuery
		var prop, orig,jQuery
			callback = this.options[ type ];jQuery
jQuery
		data = data || {};jQuery
		event = $.Event( event );jQuery
		event.type = ( type === this.widgetEventPrefix ?jQuery
			type :jQuery
			this.widgetEventPrefix + type ).toLowerCase();jQuery
		// the original event may come from any elementjQuery
		// so we need to reset the target on the new eventjQuery
		event.target = this.element[ 0 ];jQuery
jQuery
		// copy original event properties over to the new eventjQuery
		orig = event.originalEvent;jQuery
		if ( orig ) {jQuery
			for ( prop in orig ) {jQuery
				if ( !( prop in event ) ) {jQuery
					event[ prop ] = orig[ prop ];jQuery
				}jQuery
			}jQuery
		}jQuery
jQuery
		this.element.trigger( event, data );jQuery
		return !( $.isFunction( callback ) &&jQuery
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||jQuery
			event.isDefaultPrevented() );jQuery
	}jQuery
};jQuery
jQuery
$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {jQuery
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {jQuery
		if ( typeof options === "string" ) {jQuery
			options = { effect: options };jQuery
		}jQuery
		var hasOptions,jQuery
			effectName = !options ?jQuery
				method :jQuery
				options === true || typeof options === "number" ?jQuery
					defaultEffect :jQuery
					options.effect || defaultEffect;jQuery
		options = options || {};jQuery
		if ( typeof options === "number" ) {jQuery
			options = { duration: options };jQuery
		}jQuery
		hasOptions = !$.isEmptyObject( options );jQuery
		options.complete = callback;jQuery
		if ( options.delay ) {jQuery
			element.delay( options.delay );jQuery
		}jQuery
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {jQuery
			element[ method ]( options );jQuery
		} else if ( effectName !== method && element[ effectName ] ) {jQuery
			element[ effectName ]( options.duration, options.easing, callback );jQuery
		} else {jQuery
			element.queue(function( next ) {jQuery
				$( this )[ method ]();jQuery
				if ( callback ) {jQuery
					callback.call( element[ 0 ] );jQuery
				}jQuery
				next();jQuery
			});jQuery
		}jQuery
	};jQuery
});jQuery
jQuery
})( jQuery );jQuery
(function( $, undefined ) {jQuery
jQuery
var mouseHandled = false;jQuery
$( document ).mouseup( function() {jQuery
	mouseHandled = false;jQuery
});jQuery
jQuery
$.widget("ui.mouse", {jQuery
	version: "1.10.4",jQuery
	options: {jQuery
		cancel: "input,textarea,button,select,option",jQuery
		distance: 1,jQuery
		delay: 0jQuery
	},jQuery
	_mouseInit: function() {jQuery
		var that = this;jQuery
jQuery
		this.elementjQuery
			.bind("mousedown."+this.widgetName, function(event) {jQuery
				return that._mouseDown(event);jQuery
			})jQuery
			.bind("click."+this.widgetName, function(event) {jQuery
				if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {jQuery
					$.removeData(event.target, that.widgetName + ".preventClickEvent");jQuery
					event.stopImmediatePropagation();jQuery
					return false;jQuery
				}jQuery
			});jQuery
jQuery
		this.started = false;jQuery
	},jQuery
jQuery
	// TODO: make sure destroying one instance of mouse doesn't mess withjQuery
	// other instances of mousejQuery
	_mouseDestroy: function() {jQuery
		this.element.unbind("."+this.widgetName);jQuery
		if ( this._mouseMoveDelegate ) {jQuery
			$(document)jQuery
				.unbind("mousemove."+this.widgetName, this._mouseMoveDelegate)jQuery
				.unbind("mouseup."+this.widgetName, this._mouseUpDelegate);jQuery
		}jQuery
	},jQuery
jQuery
	_mouseDown: function(event) {jQuery
		// don't let more than one widget handle mouseStartjQuery
		if( mouseHandled ) { return; }jQuery
jQuery
		// we may have missed mouseup (out of window)jQuery
		(this._mouseStarted && this._mouseUp(event));jQuery
jQuery
		this._mouseDownEvent = event;jQuery
jQuery
		var that = this,jQuery
			btnIsLeft = (event.which === 1),jQuery
			// event.target.nodeName works around a bug in IE 8 withjQuery
			// disabled inputs (#7620)jQuery
			elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);jQuery
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {jQuery
			return true;jQuery
		}jQuery
jQuery
		this.mouseDelayMet = !this.options.delay;jQuery
		if (!this.mouseDelayMet) {jQuery
			this._mouseDelayTimer = setTimeout(function() {jQuery
				that.mouseDelayMet = true;jQuery
			}, this.options.delay);jQuery
		}jQuery
jQuery
		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {jQuery
			this._mouseStarted = (this._mouseStart(event) !== false);jQuery
			if (!this._mouseStarted) {jQuery
				event.preventDefault();jQuery
				return true;jQuery
			}jQuery
		}jQuery
jQuery
		// Click event may never have fired (Gecko & Opera)jQuery
		if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {jQuery
			$.removeData(event.target, this.widgetName + ".preventClickEvent");jQuery
		}jQuery
jQuery
		// these delegates are required to keep contextjQuery
		this._mouseMoveDelegate = function(event) {jQuery
			return that._mouseMove(event);jQuery
		};jQuery
		this._mouseUpDelegate = function(event) {jQuery
			return that._mouseUp(event);jQuery
		};jQuery
		$(document)jQuery
			.bind("mousemove."+this.widgetName, this._mouseMoveDelegate)jQuery
			.bind("mouseup."+this.widgetName, this._mouseUpDelegate);jQuery
jQuery
		event.preventDefault();jQuery
jQuery
		mouseHandled = true;jQuery
		return true;jQuery
	},jQuery
jQuery
	_mouseMove: function(event) {jQuery
		// IE mouseup check - mouseup happened when mouse was out of windowjQuery
		if ($.ui.ie && ( !document.documentMode || document.documentMode < 9 ) && !event.button) {jQuery
			return this._mouseUp(event);jQuery
		}jQuery
jQuery
		if (this._mouseStarted) {jQuery
			this._mouseDrag(event);jQuery
			return event.preventDefault();jQuery
		}jQuery
jQuery
		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {jQuery
			this._mouseStarted =jQuery
				(this._mouseStart(this._mouseDownEvent, event) !== false);jQuery
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));jQuery
		}jQuery
jQuery
		return !this._mouseStarted;jQuery
	},jQuery
jQuery
	_mouseUp: function(event) {jQuery
		$(document)jQuery
			.unbind("mousemove."+this.widgetName, this._mouseMoveDelegate)jQuery
			.unbind("mouseup."+this.widgetName, this._mouseUpDelegate);jQuery
jQuery
		if (this._mouseStarted) {jQuery
			this._mouseStarted = false;jQuery
jQuery
			if (event.target === this._mouseDownEvent.target) {jQuery
				$.data(event.target, this.widgetName + ".preventClickEvent", true);jQuery
			}jQuery
jQuery
			this._mouseStop(event);jQuery
		}jQuery
jQuery
		return false;jQuery
	},jQuery
jQuery
	_mouseDistanceMet: function(event) {jQuery
		return (Math.max(jQuery
				Math.abs(this._mouseDownEvent.pageX - event.pageX),jQuery
				Math.abs(this._mouseDownEvent.pageY - event.pageY)jQuery
			) >= this.options.distancejQuery
		);jQuery
	},jQuery
jQuery
	_mouseDelayMet: function(/* event */) {jQuery
		return this.mouseDelayMet;jQuery
	},jQuery
jQuery
	// These are placeholder methods, to be overriden by extending pluginjQuery
	_mouseStart: function(/* event */) {},jQuery
	_mouseDrag: function(/* event */) {},jQuery
	_mouseStop: function(/* event */) {},jQuery
	_mouseCapture: function(/* event */) { return true; }jQuery
});jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.ui = $.ui || {};jQuery
jQuery
var cachedScrollbarWidth,jQuery
	max = Math.max,jQuery
	abs = Math.abs,jQuery
	round = Math.round,jQuery
	rhorizontal = /left|center|right/,jQuery
	rvertical = /top|center|bottom/,jQuery
	roffset = /[\+\-]\d+(\.[\d]+)?%?/,jQuery
	rposition = /^\w+/,jQuery
	rpercent = /%$/,jQuery
	_position = $.fn.position;jQuery
jQuery
function getOffsets( offsets, width, height ) {jQuery
	return [jQuery
		parseFloat( offsets[ 0 ] ) * ( rpercent.test( offsets[ 0 ] ) ? width / 100 : 1 ),jQuery
		parseFloat( offsets[ 1 ] ) * ( rpercent.test( offsets[ 1 ] ) ? height / 100 : 1 )jQuery
	];jQuery
}jQuery
jQuery
function parseCss( element, property ) {jQuery
	return parseInt( $.css( element, property ), 10 ) || 0;jQuery
}jQuery
jQuery
function getDimensions( elem ) {jQuery
	var raw = elem[0];jQuery
	if ( raw.nodeType === 9 ) {jQuery
		return {jQuery
			width: elem.width(),jQuery
			height: elem.height(),jQuery
			offset: { top: 0, left: 0 }jQuery
		};jQuery
	}jQuery
	if ( $.isWindow( raw ) ) {jQuery
		return {jQuery
			width: elem.width(),jQuery
			height: elem.height(),jQuery
			offset: { top: elem.scrollTop(), left: elem.scrollLeft() }jQuery
		};jQuery
	}jQuery
	if ( raw.preventDefault ) {jQuery
		return {jQuery
			width: 0,jQuery
			height: 0,jQuery
			offset: { top: raw.pageY, left: raw.pageX }jQuery
		};jQuery
	}jQuery
	return {jQuery
		width: elem.outerWidth(),jQuery
		height: elem.outerHeight(),jQuery
		offset: elem.offset()jQuery
	};jQuery
}jQuery
jQuery
$.position = {jQuery
	scrollbarWidth: function() {jQuery
		if ( cachedScrollbarWidth !== undefined ) {jQuery
			return cachedScrollbarWidth;jQuery
		}jQuery
		var w1, w2,jQuery
			div = $( "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>" ),jQuery
			innerDiv = div.children()[0];jQuery
jQuery
		$( "body" ).append( div );jQuery
		w1 = innerDiv.offsetWidth;jQuery
		div.css( "overflow", "scroll" );jQuery
jQuery
		w2 = innerDiv.offsetWidth;jQuery
jQuery
		if ( w1 === w2 ) {jQuery
			w2 = div[0].clientWidth;jQuery
		}jQuery
jQuery
		div.remove();jQuery
jQuery
		return (cachedScrollbarWidth = w1 - w2);jQuery
	},jQuery
	getScrollInfo: function( within ) {jQuery
		var overflowX = within.isWindow || within.isDocument ? "" :jQuery
				within.element.css( "overflow-x" ),jQuery
			overflowY = within.isWindow || within.isDocument ? "" :jQuery
				within.element.css( "overflow-y" ),jQuery
			hasOverflowX = overflowX === "scroll" ||jQuery
				( overflowX === "auto" && within.width < within.element[0].scrollWidth ),jQuery
			hasOverflowY = overflowY === "scroll" ||jQuery
				( overflowY === "auto" && within.height < within.element[0].scrollHeight );jQuery
		return {jQuery
			width: hasOverflowY ? $.position.scrollbarWidth() : 0,jQuery
			height: hasOverflowX ? $.position.scrollbarWidth() : 0jQuery
		};jQuery
	},jQuery
	getWithinInfo: function( element ) {jQuery
		var withinElement = $( element || window ),jQuery
			isWindow = $.isWindow( withinElement[0] ),jQuery
			isDocument = !!withinElement[ 0 ] && withinElement[ 0 ].nodeType === 9;jQuery
		return {jQuery
			element: withinElement,jQuery
			isWindow: isWindow,jQuery
			isDocument: isDocument,jQuery
			offset: withinElement.offset() || { left: 0, top: 0 },jQuery
			scrollLeft: withinElement.scrollLeft(),jQuery
			scrollTop: withinElement.scrollTop(),jQuery
			width: isWindow ? withinElement.width() : withinElement.outerWidth(),jQuery
			height: isWindow ? withinElement.height() : withinElement.outerHeight()jQuery
		};jQuery
	}jQuery
};jQuery
jQuery
$.fn.position = function( options ) {jQuery
	if ( !options || !options.of ) {jQuery
		return _position.apply( this, arguments );jQuery
	}jQuery
jQuery
	// make a copy, we don't want to modify argumentsjQuery
	options = $.extend( {}, options );jQuery
jQuery
	var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,jQuery
		target = $( options.of ),jQuery
		within = $.position.getWithinInfo( options.within ),jQuery
		scrollInfo = $.position.getScrollInfo( within ),jQuery
		collision = ( options.collision || "flip" ).split( " " ),jQuery
		offsets = {};jQuery
jQuery
	dimensions = getDimensions( target );jQuery
	if ( target[0].preventDefault ) {jQuery
		// force left top to allow flippingjQuery
		options.at = "left top";jQuery
	}jQuery
	targetWidth = dimensions.width;jQuery
	targetHeight = dimensions.height;jQuery
	targetOffset = dimensions.offset;jQuery
	// clone to reuse original targetOffset laterjQuery
	basePosition = $.extend( {}, targetOffset );jQuery
jQuery
	// force my and at to have valid horizontal and vertical positionsjQuery
	// if a value is missing or invalid, it will be converted to centerjQuery
	$.each( [ "my", "at" ], function() {jQuery
		var pos = ( options[ this ] || "" ).split( " " ),jQuery
			horizontalOffset,jQuery
			verticalOffset;jQuery
jQuery
		if ( pos.length === 1) {jQuery
			pos = rhorizontal.test( pos[ 0 ] ) ?jQuery
				pos.concat( [ "center" ] ) :jQuery
				rvertical.test( pos[ 0 ] ) ?jQuery
					[ "center" ].concat( pos ) :jQuery
					[ "center", "center" ];jQuery
		}jQuery
		pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";jQuery
		pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";jQuery
jQuery
		// calculate offsetsjQuery
		horizontalOffset = roffset.exec( pos[ 0 ] );jQuery
		verticalOffset = roffset.exec( pos[ 1 ] );jQuery
		offsets[ this ] = [jQuery
			horizontalOffset ? horizontalOffset[ 0 ] : 0,jQuery
			verticalOffset ? verticalOffset[ 0 ] : 0jQuery
		];jQuery
jQuery
		// reduce to just the positions without the offsetsjQuery
		options[ this ] = [jQuery
			rposition.exec( pos[ 0 ] )[ 0 ],jQuery
			rposition.exec( pos[ 1 ] )[ 0 ]jQuery
		];jQuery
	});jQuery
jQuery
	// normalize collision optionjQuery
	if ( collision.length === 1 ) {jQuery
		collision[ 1 ] = collision[ 0 ];jQuery
	}jQuery
jQuery
	if ( options.at[ 0 ] === "right" ) {jQuery
		basePosition.left += targetWidth;jQuery
	} else if ( options.at[ 0 ] === "center" ) {jQuery
		basePosition.left += targetWidth / 2;jQuery
	}jQuery
jQuery
	if ( options.at[ 1 ] === "bottom" ) {jQuery
		basePosition.top += targetHeight;jQuery
	} else if ( options.at[ 1 ] === "center" ) {jQuery
		basePosition.top += targetHeight / 2;jQuery
	}jQuery
jQuery
	atOffset = getOffsets( offsets.at, targetWidth, targetHeight );jQuery
	basePosition.left += atOffset[ 0 ];jQuery
	basePosition.top += atOffset[ 1 ];jQuery
jQuery
	return this.each(function() {jQuery
		var collisionPosition, using,jQuery
			elem = $( this ),jQuery
			elemWidth = elem.outerWidth(),jQuery
			elemHeight = elem.outerHeight(),jQuery
			marginLeft = parseCss( this, "marginLeft" ),jQuery
			marginTop = parseCss( this, "marginTop" ),jQuery
			collisionWidth = elemWidth + marginLeft + parseCss( this, "marginRight" ) + scrollInfo.width,jQuery
			collisionHeight = elemHeight + marginTop + parseCss( this, "marginBottom" ) + scrollInfo.height,jQuery
			position = $.extend( {}, basePosition ),jQuery
			myOffset = getOffsets( offsets.my, elem.outerWidth(), elem.outerHeight() );jQuery
jQuery
		if ( options.my[ 0 ] === "right" ) {jQuery
			position.left -= elemWidth;jQuery
		} else if ( options.my[ 0 ] === "center" ) {jQuery
			position.left -= elemWidth / 2;jQuery
		}jQuery
jQuery
		if ( options.my[ 1 ] === "bottom" ) {jQuery
			position.top -= elemHeight;jQuery
		} else if ( options.my[ 1 ] === "center" ) {jQuery
			position.top -= elemHeight / 2;jQuery
		}jQuery
jQuery
		position.left += myOffset[ 0 ];jQuery
		position.top += myOffset[ 1 ];jQuery
jQuery
		// if the browser doesn't support fractions, then round for consistent resultsjQuery
		if ( !$.support.offsetFractions ) {jQuery
			position.left = round( position.left );jQuery
			position.top = round( position.top );jQuery
		}jQuery
jQuery
		collisionPosition = {jQuery
			marginLeft: marginLeft,jQuery
			marginTop: marginTopjQuery
		};jQuery
jQuery
		$.each( [ "left", "top" ], function( i, dir ) {jQuery
			if ( $.ui.position[ collision[ i ] ] ) {jQuery
				$.ui.position[ collision[ i ] ][ dir ]( position, {jQuery
					targetWidth: targetWidth,jQuery
					targetHeight: targetHeight,jQuery
					elemWidth: elemWidth,jQuery
					elemHeight: elemHeight,jQuery
					collisionPosition: collisionPosition,jQuery
					collisionWidth: collisionWidth,jQuery
					collisionHeight: collisionHeight,jQuery
					offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],jQuery
					my: options.my,jQuery
					at: options.at,jQuery
					within: within,jQuery
					elem : elemjQuery
				});jQuery
			}jQuery
		});jQuery
jQuery
		if ( options.using ) {jQuery
			// adds feedback as second argument to using callback, if presentjQuery
			using = function( props ) {jQuery
				var left = targetOffset.left - position.left,jQuery
					right = left + targetWidth - elemWidth,jQuery
					top = targetOffset.top - position.top,jQuery
					bottom = top + targetHeight - elemHeight,jQuery
					feedback = {jQuery
						target: {jQuery
							element: target,jQuery
							left: targetOffset.left,jQuery
							top: targetOffset.top,jQuery
							width: targetWidth,jQuery
							height: targetHeightjQuery
						},jQuery
						element: {jQuery
							element: elem,jQuery
							left: position.left,jQuery
							top: position.top,jQuery
							width: elemWidth,jQuery
							height: elemHeightjQuery
						},jQuery
						horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",jQuery
						vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"jQuery
					};jQuery
				if ( targetWidth < elemWidth && abs( left + right ) < targetWidth ) {jQuery
					feedback.horizontal = "center";jQuery
				}jQuery
				if ( targetHeight < elemHeight && abs( top + bottom ) < targetHeight ) {jQuery
					feedback.vertical = "middle";jQuery
				}jQuery
				if ( max( abs( left ), abs( right ) ) > max( abs( top ), abs( bottom ) ) ) {jQuery
					feedback.important = "horizontal";jQuery
				} else {jQuery
					feedback.important = "vertical";jQuery
				}jQuery
				options.using.call( this, props, feedback );jQuery
			};jQuery
		}jQuery
jQuery
		elem.offset( $.extend( position, { using: using } ) );jQuery
	});jQuery
};jQuery
jQuery
$.ui.position = {jQuery
	fit: {jQuery
		left: function( position, data ) {jQuery
			var within = data.within,jQuery
				withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,jQuery
				outerWidth = within.width,jQuery
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,jQuery
				overLeft = withinOffset - collisionPosLeft,jQuery
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,jQuery
				newOverRight;jQuery
jQuery
			// element is wider than withinjQuery
			if ( data.collisionWidth > outerWidth ) {jQuery
				// element is initially over the left side of withinjQuery
				if ( overLeft > 0 && overRight <= 0 ) {jQuery
					newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;jQuery
					position.left += overLeft - newOverRight;jQuery
				// element is initially over right side of withinjQuery
				} else if ( overRight > 0 && overLeft <= 0 ) {jQuery
					position.left = withinOffset;jQuery
				// element is initially over both left and right sides of withinjQuery
				} else {jQuery
					if ( overLeft > overRight ) {jQuery
						position.left = withinOffset + outerWidth - data.collisionWidth;jQuery
					} else {jQuery
						position.left = withinOffset;jQuery
					}jQuery
				}jQuery
			// too far left -> align with left edgejQuery
			} else if ( overLeft > 0 ) {jQuery
				position.left += overLeft;jQuery
			// too far right -> align with right edgejQuery
			} else if ( overRight > 0 ) {jQuery
				position.left -= overRight;jQuery
			// adjust based on position and marginjQuery
			} else {jQuery
				position.left = max( position.left - collisionPosLeft, position.left );jQuery
			}jQuery
		},jQuery
		top: function( position, data ) {jQuery
			var within = data.within,jQuery
				withinOffset = within.isWindow ? within.scrollTop : within.offset.top,jQuery
				outerHeight = data.within.height,jQuery
				collisionPosTop = position.top - data.collisionPosition.marginTop,jQuery
				overTop = withinOffset - collisionPosTop,jQuery
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,jQuery
				newOverBottom;jQuery
jQuery
			// element is taller than withinjQuery
			if ( data.collisionHeight > outerHeight ) {jQuery
				// element is initially over the top of withinjQuery
				if ( overTop > 0 && overBottom <= 0 ) {jQuery
					newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;jQuery
					position.top += overTop - newOverBottom;jQuery
				// element is initially over bottom of withinjQuery
				} else if ( overBottom > 0 && overTop <= 0 ) {jQuery
					position.top = withinOffset;jQuery
				// element is initially over both top and bottom of withinjQuery
				} else {jQuery
					if ( overTop > overBottom ) {jQuery
						position.top = withinOffset + outerHeight - data.collisionHeight;jQuery
					} else {jQuery
						position.top = withinOffset;jQuery
					}jQuery
				}jQuery
			// too far up -> align with topjQuery
			} else if ( overTop > 0 ) {jQuery
				position.top += overTop;jQuery
			// too far down -> align with bottom edgejQuery
			} else if ( overBottom > 0 ) {jQuery
				position.top -= overBottom;jQuery
			// adjust based on position and marginjQuery
			} else {jQuery
				position.top = max( position.top - collisionPosTop, position.top );jQuery
			}jQuery
		}jQuery
	},jQuery
	flip: {jQuery
		left: function( position, data ) {jQuery
			var within = data.within,jQuery
				withinOffset = within.offset.left + within.scrollLeft,jQuery
				outerWidth = within.width,jQuery
				offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,jQuery
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,jQuery
				overLeft = collisionPosLeft - offsetLeft,jQuery
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,jQuery
				myOffset = data.my[ 0 ] === "left" ?jQuery
					-data.elemWidth :jQuery
					data.my[ 0 ] === "right" ?jQuery
						data.elemWidth :jQuery
						0,jQuery
				atOffset = data.at[ 0 ] === "left" ?jQuery
					data.targetWidth :jQuery
					data.at[ 0 ] === "right" ?jQuery
						-data.targetWidth :jQuery
						0,jQuery
				offset = -2 * data.offset[ 0 ],jQuery
				newOverRight,jQuery
				newOverLeft;jQuery
jQuery
			if ( overLeft < 0 ) {jQuery
				newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;jQuery
				if ( newOverRight < 0 || newOverRight < abs( overLeft ) ) {jQuery
					position.left += myOffset + atOffset + offset;jQuery
				}jQuery
			}jQuery
			else if ( overRight > 0 ) {jQuery
				newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;jQuery
				if ( newOverLeft > 0 || abs( newOverLeft ) < overRight ) {jQuery
					position.left += myOffset + atOffset + offset;jQuery
				}jQuery
			}jQuery
		},jQuery
		top: function( position, data ) {jQuery
			var within = data.within,jQuery
				withinOffset = within.offset.top + within.scrollTop,jQuery
				outerHeight = within.height,jQuery
				offsetTop = within.isWindow ? within.scrollTop : within.offset.top,jQuery
				collisionPosTop = position.top - data.collisionPosition.marginTop,jQuery
				overTop = collisionPosTop - offsetTop,jQuery
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,jQuery
				top = data.my[ 1 ] === "top",jQuery
				myOffset = top ?jQuery
					-data.elemHeight :jQuery
					data.my[ 1 ] === "bottom" ?jQuery
						data.elemHeight :jQuery
						0,jQuery
				atOffset = data.at[ 1 ] === "top" ?jQuery
					data.targetHeight :jQuery
					data.at[ 1 ] === "bottom" ?jQuery
						-data.targetHeight :jQuery
						0,jQuery
				offset = -2 * data.offset[ 1 ],jQuery
				newOverTop,jQuery
				newOverBottom;jQuery
			if ( overTop < 0 ) {jQuery
				newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;jQuery
				if ( ( position.top + myOffset + atOffset + offset) > overTop && ( newOverBottom < 0 || newOverBottom < abs( overTop ) ) ) {jQuery
					position.top += myOffset + atOffset + offset;jQuery
				}jQuery
			}jQuery
			else if ( overBottom > 0 ) {jQuery
				newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;jQuery
				if ( ( position.top + myOffset + atOffset + offset) > overBottom && ( newOverTop > 0 || abs( newOverTop ) < overBottom ) ) {jQuery
					position.top += myOffset + atOffset + offset;jQuery
				}jQuery
			}jQuery
		}jQuery
	},jQuery
	flipfit: {jQuery
		left: function() {jQuery
			$.ui.position.flip.left.apply( this, arguments );jQuery
			$.ui.position.fit.left.apply( this, arguments );jQuery
		},jQuery
		top: function() {jQuery
			$.ui.position.flip.top.apply( this, arguments );jQuery
			$.ui.position.fit.top.apply( this, arguments );jQuery
		}jQuery
	}jQuery
};jQuery
jQuery
// fraction support testjQuery
(function () {jQuery
	var testElement, testElementParent, testElementStyle, offsetLeft, i,jQuery
		body = document.getElementsByTagName( "body" )[ 0 ],jQuery
		div = document.createElement( "div" );jQuery
jQuery
	//Create a "fake body" for testing based on method used in jQuery.supportjQuery
	testElement = document.createElement( body ? "div" : "body" );jQuery
	testElementStyle = {jQuery
		visibility: "hidden",jQuery
		width: 0,jQuery
		height: 0,jQuery
		border: 0,jQuery
		margin: 0,jQuery
		background: "none"jQuery
	};jQuery
	if ( body ) {jQuery
		$.extend( testElementStyle, {jQuery
			position: "absolute",jQuery
			left: "-1000px",jQuery
			top: "-1000px"jQuery
		});jQuery
	}jQuery
	for ( i in testElementStyle ) {jQuery
		testElement.style[ i ] = testElementStyle[ i ];jQuery
	}jQuery
	testElement.appendChild( div );jQuery
	testElementParent = body || document.documentElement;jQuery
	testElementParent.insertBefore( testElement, testElementParent.firstChild );jQuery
jQuery
	div.style.cssText = "position: absolute; left: 10.7432222px;";jQuery
jQuery
	offsetLeft = $( div ).offset().left;jQuery
	$.support.offsetFractions = offsetLeft > 10 && offsetLeft < 11;jQuery
jQuery
	testElement.innerHTML = "";jQuery
	testElementParent.removeChild( testElement );jQuery
})();jQuery
jQuery
}( jQuery ) );jQuery
(function( $, undefined ) {jQuery
jQuery
var uid = 0,jQuery
	hideProps = {},jQuery
	showProps = {};jQuery
jQuery
hideProps.height = hideProps.paddingTop = hideProps.paddingBottom =jQuery
	hideProps.borderTopWidth = hideProps.borderBottomWidth = "hide";jQuery
showProps.height = showProps.paddingTop = showProps.paddingBottom =jQuery
	showProps.borderTopWidth = showProps.borderBottomWidth = "show";jQuery
jQuery
$.widget( "ui.accordion", {jQuery
	version: "1.10.4",jQuery
	options: {jQuery
		active: 0,jQuery
		animate: {},jQuery
		collapsible: false,jQuery
		event: "click",jQuery
		header: "> li > :first-child,> :not(li):even",jQuery
		heightStyle: "auto",jQuery
		icons: {jQuery
			activeHeader: "ui-icon-triangle-1-s",jQuery
			header: "ui-icon-triangle-1-e"jQuery
		},jQuery
jQuery
		// callbacksjQuery
		activate: null,jQuery
		beforeActivate: nulljQuery
	},jQuery
jQuery
	_create: function() {jQuery
		var options = this.options;jQuery
		this.prevShow = this.prevHide = $();jQuery
		this.element.addClass( "ui-accordion ui-widget ui-helper-reset" )jQuery
			// ARIAjQuery
			.attr( "role", "tablist" );jQuery
jQuery
		// don't allow collapsible: false and active: false / nulljQuery
		if ( !options.collapsible && (options.active === false || options.active == null) ) {jQuery
			options.active = 0;jQuery
		}jQuery
jQuery
		this._processPanels();jQuery
		// handle negative valuesjQuery
		if ( options.active < 0 ) {jQuery
			options.active += this.headers.length;jQuery
		}jQuery
		this._refresh();jQuery
	},jQuery
jQuery
	_getCreateEventData: function() {jQuery
		return {jQuery
			header: this.active,jQuery
			panel: !this.active.length ? $() : this.active.next(),jQuery
			content: !this.active.length ? $() : this.active.next()jQuery
		};jQuery
	},jQuery
jQuery
	_createIcons: function() {jQuery
		var icons = this.options.icons;jQuery
		if ( icons ) {jQuery
			$( "<span>" )jQuery
				.addClass( "ui-accordion-header-icon ui-icon " + icons.header )jQuery
				.prependTo( this.headers );jQuery
			this.active.children( ".ui-accordion-header-icon" )jQuery
				.removeClass( icons.header )jQuery
				.addClass( icons.activeHeader );jQuery
			this.headers.addClass( "ui-accordion-icons" );jQuery
		}jQuery
	},jQuery
jQuery
	_destroyIcons: function() {jQuery
		this.headersjQuery
			.removeClass( "ui-accordion-icons" )jQuery
			.children( ".ui-accordion-header-icon" )jQuery
				.remove();jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		var contents;jQuery
jQuery
		// clean up main elementjQuery
		this.elementjQuery
			.removeClass( "ui-accordion ui-widget ui-helper-reset" )jQuery
			.removeAttr( "role" );jQuery
jQuery
		// clean up headersjQuery
		this.headersjQuery
			.removeClass( "ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top" )jQuery
			.removeAttr( "role" )jQuery
			.removeAttr( "aria-expanded" )jQuery
			.removeAttr( "aria-selected" )jQuery
			.removeAttr( "aria-controls" )jQuery
			.removeAttr( "tabIndex" )jQuery
			.each(function() {jQuery
				if ( /^ui-accordion/.test( this.id ) ) {jQuery
					this.removeAttribute( "id" );jQuery
				}jQuery
			});jQuery
		this._destroyIcons();jQuery
jQuery
		// clean up content panelsjQuery
		contents = this.headers.next()jQuery
			.css( "display", "" )jQuery
			.removeAttr( "role" )jQuery
			.removeAttr( "aria-hidden" )jQuery
			.removeAttr( "aria-labelledby" )jQuery
			.removeClass( "ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled" )jQuery
			.each(function() {jQuery
				if ( /^ui-accordion/.test( this.id ) ) {jQuery
					this.removeAttribute( "id" );jQuery
				}jQuery
			});jQuery
		if ( this.options.heightStyle !== "content" ) {jQuery
			contents.css( "height", "" );jQuery
		}jQuery
	},jQuery
jQuery
	_setOption: function( key, value ) {jQuery
		if ( key === "active" ) {jQuery
			// _activate() will handle invalid values and update this.optionsjQuery
			this._activate( value );jQuery
			return;jQuery
		}jQuery
jQuery
		if ( key === "event" ) {jQuery
			if ( this.options.event ) {jQuery
				this._off( this.headers, this.options.event );jQuery
			}jQuery
			this._setupEvents( value );jQuery
		}jQuery
jQuery
		this._super( key, value );jQuery
jQuery
		// setting collapsible: false while collapsed; open first paneljQuery
		if ( key === "collapsible" && !value && this.options.active === false ) {jQuery
			this._activate( 0 );jQuery
		}jQuery
jQuery
		if ( key === "icons" ) {jQuery
			this._destroyIcons();jQuery
			if ( value ) {jQuery
				this._createIcons();jQuery
			}jQuery
		}jQuery
jQuery
		// #5332 - opacity doesn't cascade to positioned elements in IEjQuery
		// so we need to add the disabled class to the headers and panelsjQuery
		if ( key === "disabled" ) {jQuery
			this.headers.add( this.headers.next() )jQuery
				.toggleClass( "ui-state-disabled", !!value );jQuery
		}jQuery
	},jQuery
jQuery
	_keydown: function( event ) {jQuery
		if ( event.altKey || event.ctrlKey ) {jQuery
			return;jQuery
		}jQuery
jQuery
		var keyCode = $.ui.keyCode,jQuery
			length = this.headers.length,jQuery
			currentIndex = this.headers.index( event.target ),jQuery
			toFocus = false;jQuery
jQuery
		switch ( event.keyCode ) {jQuery
			case keyCode.RIGHT:jQuery
			case keyCode.DOWN:jQuery
				toFocus = this.headers[ ( currentIndex + 1 ) % length ];jQuery
				break;jQuery
			case keyCode.LEFT:jQuery
			case keyCode.UP:jQuery
				toFocus = this.headers[ ( currentIndex - 1 + length ) % length ];jQuery
				break;jQuery
			case keyCode.SPACE:jQuery
			case keyCode.ENTER:jQuery
				this._eventHandler( event );jQuery
				break;jQuery
			case keyCode.HOME:jQuery
				toFocus = this.headers[ 0 ];jQuery
				break;jQuery
			case keyCode.END:jQuery
				toFocus = this.headers[ length - 1 ];jQuery
				break;jQuery
		}jQuery
jQuery
		if ( toFocus ) {jQuery
			$( event.target ).attr( "tabIndex", -1 );jQuery
			$( toFocus ).attr( "tabIndex", 0 );jQuery
			toFocus.focus();jQuery
			event.preventDefault();jQuery
		}jQuery
	},jQuery
jQuery
	_panelKeyDown : function( event ) {jQuery
		if ( event.keyCode === $.ui.keyCode.UP && event.ctrlKey ) {jQuery
			$( event.currentTarget ).prev().focus();jQuery
		}jQuery
	},jQuery
jQuery
	refresh: function() {jQuery
		var options = this.options;jQuery
		this._processPanels();jQuery
jQuery
		// was collapsed or no paneljQuery
		if ( ( options.active === false && options.collapsible === true ) || !this.headers.length ) {jQuery
			options.active = false;jQuery
			this.active = $();jQuery
		// active false only when collapsible is truejQuery
		} else if ( options.active === false ) {jQuery
			this._activate( 0 );jQuery
		// was active, but active panel is gonejQuery
		} else if ( this.active.length && !$.contains( this.element[ 0 ], this.active[ 0 ] ) ) {jQuery
			// all remaining panel are disabledjQuery
			if ( this.headers.length === this.headers.find(".ui-state-disabled").length ) {jQuery
				options.active = false;jQuery
				this.active = $();jQuery
			// activate previous paneljQuery
			} else {jQuery
				this._activate( Math.max( 0, options.active - 1 ) );jQuery
			}jQuery
		// was active, active panel still existsjQuery
		} else {jQuery
			// make sure active index is correctjQuery
			options.active = this.headers.index( this.active );jQuery
		}jQuery
jQuery
		this._destroyIcons();jQuery
jQuery
		this._refresh();jQuery
	},jQuery
jQuery
	_processPanels: function() {jQuery
		this.headers = this.element.find( this.options.header )jQuery
			.addClass( "ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" );jQuery
jQuery
		this.headers.next()jQuery
			.addClass( "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" )jQuery
			.filter(":not(.ui-accordion-content-active)")jQuery
			.hide();jQuery
	},jQuery
jQuery
	_refresh: function() {jQuery
		var maxHeight,jQuery
			options = this.options,jQuery
			heightStyle = options.heightStyle,jQuery
			parent = this.element.parent(),jQuery
			accordionId = this.accordionId = "ui-accordion-" +jQuery
				(this.element.attr( "id" ) || ++uid);jQuery
jQuery
		this.active = this._findActive( options.active )jQuery
			.addClass( "ui-accordion-header-active ui-state-active ui-corner-top" )jQuery
			.removeClass( "ui-corner-all" );jQuery
		this.active.next()jQuery
			.addClass( "ui-accordion-content-active" )jQuery
			.show();jQuery
jQuery
		this.headersjQuery
			.attr( "role", "tab" )jQuery
			.each(function( i ) {jQuery
				var header = $( this ),jQuery
					headerId = header.attr( "id" ),jQuery
					panel = header.next(),jQuery
					panelId = panel.attr( "id" );jQuery
				if ( !headerId ) {jQuery
					headerId = accordionId + "-header-" + i;jQuery
					header.attr( "id", headerId );jQuery
				}jQuery
				if ( !panelId ) {jQuery
					panelId = accordionId + "-panel-" + i;jQuery
					panel.attr( "id", panelId );jQuery
				}jQuery
				header.attr( "aria-controls", panelId );jQuery
				panel.attr( "aria-labelledby", headerId );jQuery
			})jQuery
			.next()jQuery
				.attr( "role", "tabpanel" );jQuery
jQuery
		this.headersjQuery
			.not( this.active )jQuery
			.attr({jQuery
				"aria-selected": "false",jQuery
				"aria-expanded": "false",jQuery
				tabIndex: -1jQuery
			})jQuery
			.next()jQuery
				.attr({jQuery
					"aria-hidden": "true"jQuery
				})jQuery
				.hide();jQuery
jQuery
		// make sure at least one header is in the tab orderjQuery
		if ( !this.active.length ) {jQuery
			this.headers.eq( 0 ).attr( "tabIndex", 0 );jQuery
		} else {jQuery
			this.active.attr({jQuery
				"aria-selected": "true",jQuery
				"aria-expanded": "true",jQuery
				tabIndex: 0jQuery
			})jQuery
			.next()jQuery
				.attr({jQuery
					"aria-hidden": "false"jQuery
				});jQuery
		}jQuery
jQuery
		this._createIcons();jQuery
jQuery
		this._setupEvents( options.event );jQuery
jQuery
		if ( heightStyle === "fill" ) {jQuery
			maxHeight = parent.height();jQuery
			this.element.siblings( ":visible" ).each(function() {jQuery
				var elem = $( this ),jQuery
					position = elem.css( "position" );jQuery
jQuery
				if ( position === "absolute" || position === "fixed" ) {jQuery
					return;jQuery
				}jQuery
				maxHeight -= elem.outerHeight( true );jQuery
			});jQuery
jQuery
			this.headers.each(function() {jQuery
				maxHeight -= $( this ).outerHeight( true );jQuery
			});jQuery
jQuery
			this.headers.next()jQuery
				.each(function() {jQuery
					$( this ).height( Math.max( 0, maxHeight -jQuery
						$( this ).innerHeight() + $( this ).height() ) );jQuery
				})jQuery
				.css( "overflow", "auto" );jQuery
		} else if ( heightStyle === "auto" ) {jQuery
			maxHeight = 0;jQuery
			this.headers.next()jQuery
				.each(function() {jQuery
					maxHeight = Math.max( maxHeight, $( this ).css( "height", "" ).height() );jQuery
				})jQuery
				.height( maxHeight );jQuery
		}jQuery
	},jQuery
jQuery
	_activate: function( index ) {jQuery
		var active = this._findActive( index )[ 0 ];jQuery
jQuery
		// trying to activate the already active paneljQuery
		if ( active === this.active[ 0 ] ) {jQuery
			return;jQuery
		}jQuery
jQuery
		// trying to collapse, simulate a click on the currently active headerjQuery
		active = active || this.active[ 0 ];jQuery
jQuery
		this._eventHandler({jQuery
			target: active,jQuery
			currentTarget: active,jQuery
			preventDefault: $.noopjQuery
		});jQuery
	},jQuery
jQuery
	_findActive: function( selector ) {jQuery
		return typeof selector === "number" ? this.headers.eq( selector ) : $();jQuery
	},jQuery
jQuery
	_setupEvents: function( event ) {jQuery
		var events = {jQuery
			keydown: "_keydown"jQuery
		};jQuery
		if ( event ) {jQuery
			$.each( event.split(" "), function( index, eventName ) {jQuery
				events[ eventName ] = "_eventHandler";jQuery
			});jQuery
		}jQuery
jQuery
		this._off( this.headers.add( this.headers.next() ) );jQuery
		this._on( this.headers, events );jQuery
		this._on( this.headers.next(), { keydown: "_panelKeyDown" });jQuery
		this._hoverable( this.headers );jQuery
		this._focusable( this.headers );jQuery
	},jQuery
jQuery
	_eventHandler: function( event ) {jQuery
		var options = this.options,jQuery
			active = this.active,jQuery
			clicked = $( event.currentTarget ),jQuery
			clickedIsActive = clicked[ 0 ] === active[ 0 ],jQuery
			collapsing = clickedIsActive && options.collapsible,jQuery
			toShow = collapsing ? $() : clicked.next(),jQuery
			toHide = active.next(),jQuery
			eventData = {jQuery
				oldHeader: active,jQuery
				oldPanel: toHide,jQuery
				newHeader: collapsing ? $() : clicked,jQuery
				newPanel: toShowjQuery
			};jQuery
jQuery
		event.preventDefault();jQuery
jQuery
		if (jQuery
				// click on active header, but not collapsiblejQuery
				( clickedIsActive && !options.collapsible ) ||jQuery
				// allow canceling activationjQuery
				( this._trigger( "beforeActivate", event, eventData ) === false ) ) {jQuery
			return;jQuery
		}jQuery
jQuery
		options.active = collapsing ? false : this.headers.index( clicked );jQuery
jQuery
		// when the call to ._toggle() comes after the class changesjQuery
		// it causes a very odd bug in IE 8 (see #6720)jQuery
		this.active = clickedIsActive ? $() : clicked;jQuery
		this._toggle( eventData );jQuery
jQuery
		// switch classesjQuery
		// corner classes on the previously active header stay after the animationjQuery
		active.removeClass( "ui-accordion-header-active ui-state-active" );jQuery
		if ( options.icons ) {jQuery
			active.children( ".ui-accordion-header-icon" )jQuery
				.removeClass( options.icons.activeHeader )jQuery
				.addClass( options.icons.header );jQuery
		}jQuery
jQuery
		if ( !clickedIsActive ) {jQuery
			clickedjQuery
				.removeClass( "ui-corner-all" )jQuery
				.addClass( "ui-accordion-header-active ui-state-active ui-corner-top" );jQuery
			if ( options.icons ) {jQuery
				clicked.children( ".ui-accordion-header-icon" )jQuery
					.removeClass( options.icons.header )jQuery
					.addClass( options.icons.activeHeader );jQuery
			}jQuery
jQuery
			clickedjQuery
				.next()jQuery
				.addClass( "ui-accordion-content-active" );jQuery
		}jQuery
	},jQuery
jQuery
	_toggle: function( data ) {jQuery
		var toShow = data.newPanel,jQuery
			toHide = this.prevShow.length ? this.prevShow : data.oldPanel;jQuery
jQuery
		// handle activating a panel during the animation for another activationjQuery
		this.prevShow.add( this.prevHide ).stop( true, true );jQuery
		this.prevShow = toShow;jQuery
		this.prevHide = toHide;jQuery
jQuery
		if ( this.options.animate ) {jQuery
			this._animate( toShow, toHide, data );jQuery
		} else {jQuery
			toHide.hide();jQuery
			toShow.show();jQuery
			this._toggleComplete( data );jQuery
		}jQuery
jQuery
		toHide.attr({jQuery
			"aria-hidden": "true"jQuery
		});jQuery
		toHide.prev().attr( "aria-selected", "false" );jQuery
		// if we're switching panels, remove the old header from the tab orderjQuery
		// if we're opening from collapsed state, remove the previous header from the tab orderjQuery
		// if we're collapsing, then keep the collapsing header in the tab orderjQuery
		if ( toShow.length && toHide.length ) {jQuery
			toHide.prev().attr({jQuery
				"tabIndex": -1,jQuery
				"aria-expanded": "false"jQuery
			});jQuery
		} else if ( toShow.length ) {jQuery
			this.headers.filter(function() {jQuery
				return $( this ).attr( "tabIndex" ) === 0;jQuery
			})jQuery
			.attr( "tabIndex", -1 );jQuery
		}jQuery
jQuery
		toShowjQuery
			.attr( "aria-hidden", "false" )jQuery
			.prev()jQuery
				.attr({jQuery
					"aria-selected": "true",jQuery
					tabIndex: 0,jQuery
					"aria-expanded": "true"jQuery
				});jQuery
	},jQuery
jQuery
	_animate: function( toShow, toHide, data ) {jQuery
		var total, easing, duration,jQuery
			that = this,jQuery
			adjust = 0,jQuery
			down = toShow.length &&jQuery
				( !toHide.length || ( toShow.index() < toHide.index() ) ),jQuery
			animate = this.options.animate || {},jQuery
			options = down && animate.down || animate,jQuery
			complete = function() {jQuery
				that._toggleComplete( data );jQuery
			};jQuery
jQuery
		if ( typeof options === "number" ) {jQuery
			duration = options;jQuery
		}jQuery
		if ( typeof options === "string" ) {jQuery
			easing = options;jQuery
		}jQuery
		// fall back from options to animation in case of partial down settingsjQuery
		easing = easing || options.easing || animate.easing;jQuery
		duration = duration || options.duration || animate.duration;jQuery
jQuery
		if ( !toHide.length ) {jQuery
			return toShow.animate( showProps, duration, easing, complete );jQuery
		}jQuery
		if ( !toShow.length ) {jQuery
			return toHide.animate( hideProps, duration, easing, complete );jQuery
		}jQuery
jQuery
		total = toShow.show().outerHeight();jQuery
		toHide.animate( hideProps, {jQuery
			duration: duration,jQuery
			easing: easing,jQuery
			step: function( now, fx ) {jQuery
				fx.now = Math.round( now );jQuery
			}jQuery
		});jQuery
		toShowjQuery
			.hide()jQuery
			.animate( showProps, {jQuery
				duration: duration,jQuery
				easing: easing,jQuery
				complete: complete,jQuery
				step: function( now, fx ) {jQuery
					fx.now = Math.round( now );jQuery
					if ( fx.prop !== "height" ) {jQuery
						adjust += fx.now;jQuery
					} else if ( that.options.heightStyle !== "content" ) {jQuery
						fx.now = Math.round( total - toHide.outerHeight() - adjust );jQuery
						adjust = 0;jQuery
					}jQuery
				}jQuery
			});jQuery
	},jQuery
jQuery
	_toggleComplete: function( data ) {jQuery
		var toHide = data.oldPanel;jQuery
jQuery
		toHidejQuery
			.removeClass( "ui-accordion-content-active" )jQuery
			.prev()jQuery
				.removeClass( "ui-corner-top" )jQuery
				.addClass( "ui-corner-all" );jQuery
jQuery
		// Work around for rendering bug in IE (#5421)jQuery
		if ( toHide.length ) {jQuery
			toHide.parent()[0].className = toHide.parent()[0].className;jQuery
		}jQuery
		this._trigger( "activate", null, data );jQuery
	}jQuery
});jQuery
jQuery
})( jQuery );jQuery
(function( $, undefined ) {jQuery
jQuery
$.widget( "ui.autocomplete", {jQuery
	version: "1.10.4",jQuery
	defaultElement: "<input>",jQuery
	options: {jQuery
		appendTo: null,jQuery
		autoFocus: false,jQuery
		delay: 300,jQuery
		minLength: 1,jQuery
		position: {jQuery
			my: "left top",jQuery
			at: "left bottom",jQuery
			collision: "none"jQuery
		},jQuery
		source: null,jQuery
jQuery
		// callbacksjQuery
		change: null,jQuery
		close: null,jQuery
		focus: null,jQuery
		open: null,jQuery
		response: null,jQuery
		search: null,jQuery
		select: nulljQuery
	},jQuery
jQuery
	requestIndex: 0,jQuery
	pending: 0,jQuery
jQuery
	_create: function() {jQuery
		// Some browsers only repeat keydown events, not keypress events,jQuery
		// so we use the suppressKeyPress flag to determine if we've alreadyjQuery
		// handled the keydown event. #7269jQuery
		// Unfortunately the code for & in keypress is the same as the up arrow,jQuery
		// so we use the suppressKeyPressRepeat flag to avoid handling keypressjQuery
		// events when we know the keydown event was used to modify thejQuery
		// search term. #7799jQuery
		var suppressKeyPress, suppressKeyPressRepeat, suppressInput,jQuery
			nodeName = this.element[0].nodeName.toLowerCase(),jQuery
			isTextarea = nodeName === "textarea",jQuery
			isInput = nodeName === "input";jQuery
jQuery
		this.isMultiLine =jQuery
			// Textareas are always multi-linejQuery
			isTextarea ? true :jQuery
			// Inputs are always single-line, even if inside a contentEditable elementjQuery
			// IE also treats inputs as contentEditablejQuery
			isInput ? false :jQuery
			// All other element types are determined by whether or not they're contentEditablejQuery
			this.element.prop( "isContentEditable" );jQuery
jQuery
		this.valueMethod = this.element[ isTextarea || isInput ? "val" : "text" ];jQuery
		this.isNewMenu = true;jQuery
jQuery
		this.elementjQuery
			.addClass( "ui-autocomplete-input" )jQuery
			.attr( "autocomplete", "off" );jQuery
jQuery
		this._on( this.element, {jQuery
			keydown: function( event ) {jQuery
				if ( this.element.prop( "readOnly" ) ) {jQuery
					suppressKeyPress = true;jQuery
					suppressInput = true;jQuery
					suppressKeyPressRepeat = true;jQuery
					return;jQuery
				}jQuery
jQuery
				suppressKeyPress = false;jQuery
				suppressInput = false;jQuery
				suppressKeyPressRepeat = false;jQuery
				var keyCode = $.ui.keyCode;jQuery
				switch( event.keyCode ) {jQuery
				case keyCode.PAGE_UP:jQuery
					suppressKeyPress = true;jQuery
					this._move( "previousPage", event );jQuery
					break;jQuery
				case keyCode.PAGE_DOWN:jQuery
					suppressKeyPress = true;jQuery
					this._move( "nextPage", event );jQuery
					break;jQuery
				case keyCode.UP:jQuery
					suppressKeyPress = true;jQuery
					this._keyEvent( "previous", event );jQuery
					break;jQuery
				case keyCode.DOWN:jQuery
					suppressKeyPress = true;jQuery
					this._keyEvent( "next", event );jQuery
					break;jQuery
				case keyCode.ENTER:jQuery
				case keyCode.NUMPAD_ENTER:jQuery
					// when menu is open and has focusjQuery
					if ( this.menu.active ) {jQuery
						// #6055 - Opera still allows the keypress to occurjQuery
						// which causes forms to submitjQuery
						suppressKeyPress = true;jQuery
						event.preventDefault();jQuery
						this.menu.select( event );jQuery
					}jQuery
					break;jQuery
				case keyCode.TAB:jQuery
					if ( this.menu.active ) {jQuery
						this.menu.select( event );jQuery
					}jQuery
					break;jQuery
				case keyCode.ESCAPE:jQuery
					if ( this.menu.element.is( ":visible" ) ) {jQuery
						this._value( this.term );jQuery
						this.close( event );jQuery
						// Different browsers have different default behavior for escapejQuery
						// Single press can mean undo or clearjQuery
						// Double press in IE means clear the whole formjQuery
						event.preventDefault();jQuery
					}jQuery
					break;jQuery
				default:jQuery
					suppressKeyPressRepeat = true;jQuery
					// search timeout should be triggered before the input value is changedjQuery
					this._searchTimeout( event );jQuery
					break;jQuery
				}jQuery
			},jQuery
			keypress: function( event ) {jQuery
				if ( suppressKeyPress ) {jQuery
					suppressKeyPress = false;jQuery
					if ( !this.isMultiLine || this.menu.element.is( ":visible" ) ) {jQuery
						event.preventDefault();jQuery
					}jQuery
					return;jQuery
				}jQuery
				if ( suppressKeyPressRepeat ) {jQuery
					return;jQuery
				}jQuery
jQuery
				// replicate some key handlers to allow them to repeat in Firefox and OperajQuery
				var keyCode = $.ui.keyCode;jQuery
				switch( event.keyCode ) {jQuery
				case keyCode.PAGE_UP:jQuery
					this._move( "previousPage", event );jQuery
					break;jQuery
				case keyCode.PAGE_DOWN:jQuery
					this._move( "nextPage", event );jQuery
					break;jQuery
				case keyCode.UP:jQuery
					this._keyEvent( "previous", event );jQuery
					break;jQuery
				case keyCode.DOWN:jQuery
					this._keyEvent( "next", event );jQuery
					break;jQuery
				}jQuery
			},jQuery
			input: function( event ) {jQuery
				if ( suppressInput ) {jQuery
					suppressInput = false;jQuery
					event.preventDefault();jQuery
					return;jQuery
				}jQuery
				this._searchTimeout( event );jQuery
			},jQuery
			focus: function() {jQuery
				this.selectedItem = null;jQuery
				this.previous = this._value();jQuery
			},jQuery
			blur: function( event ) {jQuery
				if ( this.cancelBlur ) {jQuery
					delete this.cancelBlur;jQuery
					return;jQuery
				}jQuery
jQuery
				clearTimeout( this.searching );jQuery
				this.close( event );jQuery
				this._change( event );jQuery
			}jQuery
		});jQuery
jQuery
		this._initSource();jQuery
		this.menu = $( "<ul>" )jQuery
			.addClass( "ui-autocomplete ui-front" )jQuery
			.appendTo( this._appendTo() )jQuery
			.menu({jQuery
				// disable ARIA support, the live region takes care of thatjQuery
				role: nulljQuery
			})jQuery
			.hide()jQuery
			.data( "ui-menu" );jQuery
jQuery
		this._on( this.menu.element, {jQuery
			mousedown: function( event ) {jQuery
				// prevent moving focus out of the text fieldjQuery
				event.preventDefault();jQuery
jQuery
				// IE doesn't prevent moving focus even with event.preventDefault()jQuery
				// so we set a flag to know when we should ignore the blur eventjQuery
				this.cancelBlur = true;jQuery
				this._delay(function() {jQuery
					delete this.cancelBlur;jQuery
				});jQuery
jQuery
				// clicking on the scrollbar causes focus to shift to the bodyjQuery
				// but we can't detect a mouseup or a click immediately afterwardjQuery
				// so we have to track the next mousedown and close the menu ifjQuery
				// the user clicks somewhere outside of the autocompletejQuery
				var menuElement = this.menu.element[ 0 ];jQuery
				if ( !$( event.target ).closest( ".ui-menu-item" ).length ) {jQuery
					this._delay(function() {jQuery
						var that = this;jQuery
						this.document.one( "mousedown", function( event ) {jQuery
							if ( event.target !== that.element[ 0 ] &&jQuery
									event.target !== menuElement &&jQuery
									!$.contains( menuElement, event.target ) ) {jQuery
								that.close();jQuery
							}jQuery
						});jQuery
					});jQuery
				}jQuery
			},jQuery
			menufocus: function( event, ui ) {jQuery
				// support: FirefoxjQuery
				// Prevent accidental activation of menu items in Firefox (#7024 #9118)jQuery
				if ( this.isNewMenu ) {jQuery
					this.isNewMenu = false;jQuery
					if ( event.originalEvent && /^mouse/.test( event.originalEvent.type ) ) {jQuery
						this.menu.blur();jQuery
jQuery
						this.document.one( "mousemove", function() {jQuery
							$( event.target ).trigger( event.originalEvent );jQuery
						});jQuery
jQuery
						return;jQuery
					}jQuery
				}jQuery
jQuery
				var item = ui.item.data( "ui-autocomplete-item" );jQuery
				if ( false !== this._trigger( "focus", event, { item: item } ) ) {jQuery
					// use value to match what will end up in the input, if it was a key eventjQuery
					if ( event.originalEvent && /^key/.test( event.originalEvent.type ) ) {jQuery
						this._value( item.value );jQuery
					}jQuery
				} else {jQuery
					// Normally the input is populated with the item's value as thejQuery
					// menu is navigated, causing screen readers to notice a change andjQuery
					// announce the item. Since the focus event was canceled, this doesn'tjQuery
					// happen, so we update the live region so that screen readers canjQuery
					// still notice the change and announce it.jQuery
					this.liveRegion.text( item.value );jQuery
				}jQuery
			},jQuery
			menuselect: function( event, ui ) {jQuery
				var item = ui.item.data( "ui-autocomplete-item" ),jQuery
					previous = this.previous;jQuery
jQuery
				// only trigger when focus was lost (click on menu)jQuery
				if ( this.element[0] !== this.document[0].activeElement ) {jQuery
					this.element.focus();jQuery
					this.previous = previous;jQuery
					// #6109 - IE triggers two focus events and the secondjQuery
					// is asynchronous, so we need to reset the previousjQuery
					// term synchronously and asynchronously :-(jQuery
					this._delay(function() {jQuery
						this.previous = previous;jQuery
						this.selectedItem = item;jQuery
					});jQuery
				}jQuery
jQuery
				if ( false !== this._trigger( "select", event, { item: item } ) ) {jQuery
					this._value( item.value );jQuery
				}jQuery
				// reset the term after the select eventjQuery
				// this allows custom select handling to work properlyjQuery
				this.term = this._value();jQuery
jQuery
				this.close( event );jQuery
				this.selectedItem = item;jQuery
			}jQuery
		});jQuery
jQuery
		this.liveRegion = $( "<span>", {jQuery
				role: "status",jQuery
				"aria-live": "polite"jQuery
			})jQuery
			.addClass( "ui-helper-hidden-accessible" )jQuery
			.insertBefore( this.element );jQuery
jQuery
		// turning off autocomplete prevents the browser from remembering thejQuery
		// value when navigating through history, so we re-enable autocompletejQuery
		// if the page is unloaded before the widget is destroyed. #7790jQuery
		this._on( this.window, {jQuery
			beforeunload: function() {jQuery
				this.element.removeAttr( "autocomplete" );jQuery
			}jQuery
		});jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		clearTimeout( this.searching );jQuery
		this.elementjQuery
			.removeClass( "ui-autocomplete-input" )jQuery
			.removeAttr( "autocomplete" );jQuery
		this.menu.element.remove();jQuery
		this.liveRegion.remove();jQuery
	},jQuery
jQuery
	_setOption: function( key, value ) {jQuery
		this._super( key, value );jQuery
		if ( key === "source" ) {jQuery
			this._initSource();jQuery
		}jQuery
		if ( key === "appendTo" ) {jQuery
			this.menu.element.appendTo( this._appendTo() );jQuery
		}jQuery
		if ( key === "disabled" && value && this.xhr ) {jQuery
			this.xhr.abort();jQuery
		}jQuery
	},jQuery
jQuery
	_appendTo: function() {jQuery
		var element = this.options.appendTo;jQuery
jQuery
		if ( element ) {jQuery
			element = element.jquery || element.nodeType ?jQuery
				$( element ) :jQuery
				this.document.find( element ).eq( 0 );jQuery
		}jQuery
jQuery
		if ( !element ) {jQuery
			element = this.element.closest( ".ui-front" );jQuery
		}jQuery
jQuery
		if ( !element.length ) {jQuery
			element = this.document[0].body;jQuery
		}jQuery
jQuery
		return element;jQuery
	},jQuery
jQuery
	_initSource: function() {jQuery
		var array, url,jQuery
			that = this;jQuery
		if ( $.isArray(this.options.source) ) {jQuery
			array = this.options.source;jQuery
			this.source = function( request, response ) {jQuery
				response( $.ui.autocomplete.filter( array, request.term ) );jQuery
			};jQuery
		} else if ( typeof this.options.source === "string" ) {jQuery
			url = this.options.source;jQuery
			this.source = function( request, response ) {jQuery
				if ( that.xhr ) {jQuery
					that.xhr.abort();jQuery
				}jQuery
				that.xhr = $.ajax({jQuery
					url: url,jQuery
					data: request,jQuery
					dataType: "json",jQuery
					success: function( data ) {jQuery
						response( data );jQuery
					},jQuery
					error: function() {jQuery
						response( [] );jQuery
					}jQuery
				});jQuery
			};jQuery
		} else {jQuery
			this.source = this.options.source;jQuery
		}jQuery
	},jQuery
jQuery
	_searchTimeout: function( event ) {jQuery
		clearTimeout( this.searching );jQuery
		this.searching = this._delay(function() {jQuery
			// only search if the value has changedjQuery
			if ( this.term !== this._value() ) {jQuery
				this.selectedItem = null;jQuery
				this.search( null, event );jQuery
			}jQuery
		}, this.options.delay );jQuery
	},jQuery
jQuery
	search: function( value, event ) {jQuery
		value = value != null ? value : this._value();jQuery
jQuery
		// always save the actual value, not the one passed as an argumentjQuery
		this.term = this._value();jQuery
jQuery
		if ( value.length < this.options.minLength ) {jQuery
			return this.close( event );jQuery
		}jQuery
jQuery
		if ( this._trigger( "search", event ) === false ) {jQuery
			return;jQuery
		}jQuery
jQuery
		return this._search( value );jQuery
	},jQuery
jQuery
	_search: function( value ) {jQuery
		this.pending++;jQuery
		this.element.addClass( "ui-autocomplete-loading" );jQuery
		this.cancelSearch = false;jQuery
jQuery
		this.source( { term: value }, this._response() );jQuery
	},jQuery
jQuery
	_response: function() {jQuery
		var index = ++this.requestIndex;jQuery
jQuery
		return $.proxy(function( content ) {jQuery
			if ( index === this.requestIndex ) {jQuery
				this.__response( content );jQuery
			}jQuery
jQuery
			this.pending--;jQuery
			if ( !this.pending ) {jQuery
				this.element.removeClass( "ui-autocomplete-loading" );jQuery
			}jQuery
		}, this );jQuery
	},jQuery
jQuery
	__response: function( content ) {jQuery
		if ( content ) {jQuery
			content = this._normalize( content );jQuery
		}jQuery
		this._trigger( "response", null, { content: content } );jQuery
		if ( !this.options.disabled && content && content.length && !this.cancelSearch ) {jQuery
			this._suggest( content );jQuery
			this._trigger( "open" );jQuery
		} else {jQuery
			// use ._close() instead of .close() so we don't cancel future searchesjQuery
			this._close();jQuery
		}jQuery
	},jQuery
jQuery
	close: function( event ) {jQuery
		this.cancelSearch = true;jQuery
		this._close( event );jQuery
	},jQuery
jQuery
	_close: function( event ) {jQuery
		if ( this.menu.element.is( ":visible" ) ) {jQuery
			this.menu.element.hide();jQuery
			this.menu.blur();jQuery
			this.isNewMenu = true;jQuery
			this._trigger( "close", event );jQuery
		}jQuery
	},jQuery
jQuery
	_change: function( event ) {jQuery
		if ( this.previous !== this._value() ) {jQuery
			this._trigger( "change", event, { item: this.selectedItem } );jQuery
		}jQuery
	},jQuery
jQuery
	_normalize: function( items ) {jQuery
		// assume all items have the right format when the first item is completejQuery
		if ( items.length && items[0].label && items[0].value ) {jQuery
			return items;jQuery
		}jQuery
		return $.map( items, function( item ) {jQuery
			if ( typeof item === "string" ) {jQuery
				return {jQuery
					label: item,jQuery
					value: itemjQuery
				};jQuery
			}jQuery
			return $.extend({jQuery
				label: item.label || item.value,jQuery
				value: item.value || item.labeljQuery
			}, item );jQuery
		});jQuery
	},jQuery
jQuery
	_suggest: function( items ) {jQuery
		var ul = this.menu.element.empty();jQuery
		this._renderMenu( ul, items );jQuery
		this.isNewMenu = true;jQuery
		this.menu.refresh();jQuery
jQuery
		// size and position menujQuery
		ul.show();jQuery
		this._resizeMenu();jQuery
		ul.position( $.extend({jQuery
			of: this.elementjQuery
		}, this.options.position ));jQuery
jQuery
		if ( this.options.autoFocus ) {jQuery
			this.menu.next();jQuery
		}jQuery
	},jQuery
jQuery
	_resizeMenu: function() {jQuery
		var ul = this.menu.element;jQuery
		ul.outerWidth( Math.max(jQuery
			// Firefox wraps long text (possibly a rounding bug)jQuery
			// so we add 1px to avoid the wrapping (#7513)jQuery
			ul.width( "" ).outerWidth() + 1,jQuery
			this.element.outerWidth()jQuery
		) );jQuery
	},jQuery
jQuery
	_renderMenu: function( ul, items ) {jQuery
		var that = this;jQuery
		$.each( items, function( index, item ) {jQuery
			that._renderItemData( ul, item );jQuery
		});jQuery
	},jQuery
jQuery
	_renderItemData: function( ul, item ) {jQuery
		return this._renderItem( ul, item ).data( "ui-autocomplete-item", item );jQuery
	},jQuery
jQuery
	_renderItem: function( ul, item ) {jQuery
		return $( "<li>" )jQuery
			.append( $( "<a>" ).text( item.label ) )jQuery
			.appendTo( ul );jQuery
	},jQuery
jQuery
	_move: function( direction, event ) {jQuery
		if ( !this.menu.element.is( ":visible" ) ) {jQuery
			this.search( null, event );jQuery
			return;jQuery
		}jQuery
		if ( this.menu.isFirstItem() && /^previous/.test( direction ) ||jQuery
				this.menu.isLastItem() && /^next/.test( direction ) ) {jQuery
			this._value( this.term );jQuery
			this.menu.blur();jQuery
			return;jQuery
		}jQuery
		this.menu[ direction ]( event );jQuery
	},jQuery
jQuery
	widget: function() {jQuery
		return this.menu.element;jQuery
	},jQuery
jQuery
	_value: function() {jQuery
		return this.valueMethod.apply( this.element, arguments );jQuery
	},jQuery
jQuery
	_keyEvent: function( keyEvent, event ) {jQuery
		if ( !this.isMultiLine || this.menu.element.is( ":visible" ) ) {jQuery
			this._move( keyEvent, event );jQuery
jQuery
			// prevents moving cursor to beginning/end of the text field in some browsersjQuery
			event.preventDefault();jQuery
		}jQuery
	}jQuery
});jQuery
jQuery
$.extend( $.ui.autocomplete, {jQuery
	escapeRegex: function( value ) {jQuery
		return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");jQuery
	},jQuery
	filter: function(array, term) {jQuery
		var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );jQuery
		return $.grep( array, function(value) {jQuery
			return matcher.test( value.label || value.value || value );jQuery
		});jQuery
	}jQuery
});jQuery
jQuery
jQuery
// live region extension, adding a `messages` optionjQuery
// NOTE: This is an experimental API. We are still investigatingjQuery
// a full solution for string manipulation and internationalization.jQuery
$.widget( "ui.autocomplete", $.ui.autocomplete, {jQuery
	options: {jQuery
		messages: {jQuery
			noResults: "No search results.",jQuery
			results: function( amount ) {jQuery
				return amount + ( amount > 1 ? " results are" : " result is" ) +jQuery
					" available, use up and down arrow keys to navigate.";jQuery
			}jQuery
		}jQuery
	},jQuery
jQuery
	__response: function( content ) {jQuery
		var message;jQuery
		this._superApply( arguments );jQuery
		if ( this.options.disabled || this.cancelSearch ) {jQuery
			return;jQuery
		}jQuery
		if ( content && content.length ) {jQuery
			message = this.options.messages.results( content.length );jQuery
		} else {jQuery
			message = this.options.messages.noResults;jQuery
		}jQuery
		this.liveRegion.text( message );jQuery
	}jQuery
});jQuery
jQuery
}( jQuery ));jQuery
(function( $, undefined ) {jQuery
jQuery
var lastActive,jQuery
	baseClasses = "ui-button ui-widget ui-state-default ui-corner-all",jQuery
	typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",jQuery
	formResetHandler = function() {jQuery
		var form = $( this );jQuery
		setTimeout(function() {jQuery
			form.find( ":ui-button" ).button( "refresh" );jQuery
		}, 1 );jQuery
	},jQuery
	radioGroup = function( radio ) {jQuery
		var name = radio.name,jQuery
			form = radio.form,jQuery
			radios = $( [] );jQuery
		if ( name ) {jQuery
			name = name.replace( /'/g, "\\'" );jQuery
			if ( form ) {jQuery
				radios = $( form ).find( "[name='" + name + "']" );jQuery
			} else {jQuery
				radios = $( "[name='" + name + "']", radio.ownerDocument )jQuery
					.filter(function() {jQuery
						return !this.form;jQuery
					});jQuery
			}jQuery
		}jQuery
		return radios;jQuery
	};jQuery
jQuery
$.widget( "ui.button", {jQuery
	version: "1.10.4",jQuery
	defaultElement: "<button>",jQuery
	options: {jQuery
		disabled: null,jQuery
		text: true,jQuery
		label: null,jQuery
		icons: {jQuery
			primary: null,jQuery
			secondary: nulljQuery
		}jQuery
	},jQuery
	_create: function() {jQuery
		this.element.closest( "form" )jQuery
			.unbind( "reset" + this.eventNamespace )jQuery
			.bind( "reset" + this.eventNamespace, formResetHandler );jQuery
jQuery
		if ( typeof this.options.disabled !== "boolean" ) {jQuery
			this.options.disabled = !!this.element.prop( "disabled" );jQuery
		} else {jQuery
			this.element.prop( "disabled", this.options.disabled );jQuery
		}jQuery
jQuery
		this._determineButtonType();jQuery
		this.hasTitle = !!this.buttonElement.attr( "title" );jQuery
jQuery
		var that = this,jQuery
			options = this.options,jQuery
			toggleButton = this.type === "checkbox" || this.type === "radio",jQuery
			activeClass = !toggleButton ? "ui-state-active" : "";jQuery
jQuery
		if ( options.label === null ) {jQuery
			options.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html());jQuery
		}jQuery
jQuery
		this._hoverable( this.buttonElement );jQuery
jQuery
		this.buttonElementjQuery
			.addClass( baseClasses )jQuery
			.attr( "role", "button" )jQuery
			.bind( "mouseenter" + this.eventNamespace, function() {jQuery
				if ( options.disabled ) {jQuery
					return;jQuery
				}jQuery
				if ( this === lastActive ) {jQuery
					$( this ).addClass( "ui-state-active" );jQuery
				}jQuery
			})jQuery
			.bind( "mouseleave" + this.eventNamespace, function() {jQuery
				if ( options.disabled ) {jQuery
					return;jQuery
				}jQuery
				$( this ).removeClass( activeClass );jQuery
			})jQuery
			.bind( "click" + this.eventNamespace, function( event ) {jQuery
				if ( options.disabled ) {jQuery
					event.preventDefault();jQuery
					event.stopImmediatePropagation();jQuery
				}jQuery
			});jQuery
jQuery
		// Can't use _focusable() because the element that receives focusjQuery
		// and the element that gets the ui-state-focus class are differentjQuery
		this._on({jQuery
			focus: function() {jQuery
				this.buttonElement.addClass( "ui-state-focus" );jQuery
			},jQuery
			blur: function() {jQuery
				this.buttonElement.removeClass( "ui-state-focus" );jQuery
			}jQuery
		});jQuery
jQuery
		if ( toggleButton ) {jQuery
			this.element.bind( "change" + this.eventNamespace, function() {jQuery
				that.refresh();jQuery
			});jQuery
		}jQuery
jQuery
		if ( this.type === "checkbox" ) {jQuery
			this.buttonElement.bind( "click" + this.eventNamespace, function() {jQuery
				if ( options.disabled ) {jQuery
					return false;jQuery
				}jQuery
			});jQuery
		} else if ( this.type === "radio" ) {jQuery
			this.buttonElement.bind( "click" + this.eventNamespace, function() {jQuery
				if ( options.disabled ) {jQuery
					return false;jQuery
				}jQuery
				$( this ).addClass( "ui-state-active" );jQuery
				that.buttonElement.attr( "aria-pressed", "true" );jQuery
jQuery
				var radio = that.element[ 0 ];jQuery
				radioGroup( radio )jQuery
					.not( radio )jQuery
					.map(function() {jQuery
						return $( this ).button( "widget" )[ 0 ];jQuery
					})jQuery
					.removeClass( "ui-state-active" )jQuery
					.attr( "aria-pressed", "false" );jQuery
			});jQuery
		} else {jQuery
			this.buttonElementjQuery
				.bind( "mousedown" + this.eventNamespace, function() {jQuery
					if ( options.disabled ) {jQuery
						return false;jQuery
					}jQuery
					$( this ).addClass( "ui-state-active" );jQuery
					lastActive = this;jQuery
					that.document.one( "mouseup", function() {jQuery
						lastActive = null;jQuery
					});jQuery
				})jQuery
				.bind( "mouseup" + this.eventNamespace, function() {jQuery
					if ( options.disabled ) {jQuery
						return false;jQuery
					}jQuery
					$( this ).removeClass( "ui-state-active" );jQuery
				})jQuery
				.bind( "keydown" + this.eventNamespace, function(event) {jQuery
					if ( options.disabled ) {jQuery
						return false;jQuery
					}jQuery
					if ( event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.ENTER ) {jQuery
						$( this ).addClass( "ui-state-active" );jQuery
					}jQuery
				})jQuery
				// see #8559, we bind to blur here in case the button element losesjQuery
				// focus between keydown and keyup, it would be left in an "active" statejQuery
				.bind( "keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {jQuery
					$( this ).removeClass( "ui-state-active" );jQuery
				});jQuery
jQuery
			if ( this.buttonElement.is("a") ) {jQuery
				this.buttonElement.keyup(function(event) {jQuery
					if ( event.keyCode === $.ui.keyCode.SPACE ) {jQuery
						// TODO pass through original event correctly (just as 2nd argument doesn't work)jQuery
						$( this ).click();jQuery
					}jQuery
				});jQuery
			}jQuery
		}jQuery
jQuery
		// TODO: pull out $.Widget's handling for the disabled option intojQuery
		// $.Widget.prototype._setOptionDisabled so it's easy to proxy and canjQuery
		// be overridden by individual pluginsjQuery
		this._setOption( "disabled", options.disabled );jQuery
		this._resetButton();jQuery
	},jQuery
jQuery
	_determineButtonType: function() {jQuery
		var ancestor, labelSelector, checked;jQuery
jQuery
		if ( this.element.is("[type=checkbox]") ) {jQuery
			this.type = "checkbox";jQuery
		} else if ( this.element.is("[type=radio]") ) {jQuery
			this.type = "radio";jQuery
		} else if ( this.element.is("input") ) {jQuery
			this.type = "input";jQuery
		} else {jQuery
			this.type = "button";jQuery
		}jQuery
jQuery
		if ( this.type === "checkbox" || this.type === "radio" ) {jQuery
			// we don't search against the document in case the elementjQuery
			// is disconnected from the DOMjQuery
			ancestor = this.element.parents().last();jQuery
			labelSelector = "label[for='" + this.element.attr("id") + "']";jQuery
			this.buttonElement = ancestor.find( labelSelector );jQuery
			if ( !this.buttonElement.length ) {jQuery
				ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings();jQuery
				this.buttonElement = ancestor.filter( labelSelector );jQuery
				if ( !this.buttonElement.length ) {jQuery
					this.buttonElement = ancestor.find( labelSelector );jQuery
				}jQuery
			}jQuery
			this.element.addClass( "ui-helper-hidden-accessible" );jQuery
jQuery
			checked = this.element.is( ":checked" );jQuery
			if ( checked ) {jQuery
				this.buttonElement.addClass( "ui-state-active" );jQuery
			}jQuery
			this.buttonElement.prop( "aria-pressed", checked );jQuery
		} else {jQuery
			this.buttonElement = this.element;jQuery
		}jQuery
	},jQuery
jQuery
	widget: function() {jQuery
		return this.buttonElement;jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		this.elementjQuery
			.removeClass( "ui-helper-hidden-accessible" );jQuery
		this.buttonElementjQuery
			.removeClass( baseClasses + " ui-state-active " + typeClasses )jQuery
			.removeAttr( "role" )jQuery
			.removeAttr( "aria-pressed" )jQuery
			.html( this.buttonElement.find(".ui-button-text").html() );jQuery
jQuery
		if ( !this.hasTitle ) {jQuery
			this.buttonElement.removeAttr( "title" );jQuery
		}jQuery
	},jQuery
jQuery
	_setOption: function( key, value ) {jQuery
		this._super( key, value );jQuery
		if ( key === "disabled" ) {jQuery
			this.element.prop( "disabled", !!value );jQuery
			if ( value ) {jQuery
				this.buttonElement.removeClass( "ui-state-focus" );jQuery
			}jQuery
			return;jQuery
		}jQuery
		this._resetButton();jQuery
	},jQuery
jQuery
	refresh: function() {jQuery
		//See #8237 & #8828jQuery
		var isDisabled = this.element.is( "input, button" ) ? this.element.is( ":disabled" ) : this.element.hasClass( "ui-button-disabled" );jQuery
jQuery
		if ( isDisabled !== this.options.disabled ) {jQuery
			this._setOption( "disabled", isDisabled );jQuery
		}jQuery
		if ( this.type === "radio" ) {jQuery
			radioGroup( this.element[0] ).each(function() {jQuery
				if ( $( this ).is( ":checked" ) ) {jQuery
					$( this ).button( "widget" )jQuery
						.addClass( "ui-state-active" )jQuery
						.attr( "aria-pressed", "true" );jQuery
				} else {jQuery
					$( this ).button( "widget" )jQuery
						.removeClass( "ui-state-active" )jQuery
						.attr( "aria-pressed", "false" );jQuery
				}jQuery
			});jQuery
		} else if ( this.type === "checkbox" ) {jQuery
			if ( this.element.is( ":checked" ) ) {jQuery
				this.buttonElementjQuery
					.addClass( "ui-state-active" )jQuery
					.attr( "aria-pressed", "true" );jQuery
			} else {jQuery
				this.buttonElementjQuery
					.removeClass( "ui-state-active" )jQuery
					.attr( "aria-pressed", "false" );jQuery
			}jQuery
		}jQuery
	},jQuery
jQuery
	_resetButton: function() {jQuery
		if ( this.type === "input" ) {jQuery
			if ( this.options.label ) {jQuery
				this.element.val( this.options.label );jQuery
			}jQuery
			return;jQuery
		}jQuery
		var buttonElement = this.buttonElement.removeClass( typeClasses ),jQuery
			buttonText = $( "<span></span>", this.document[0] )jQuery
				.addClass( "ui-button-text" )jQuery
				.html( this.options.label )jQuery
				.appendTo( buttonElement.empty() )jQuery
				.text(),jQuery
			icons = this.options.icons,jQuery
			multipleIcons = icons.primary && icons.secondary,jQuery
			buttonClasses = [];jQuery
jQuery
		if ( icons.primary || icons.secondary ) {jQuery
			if ( this.options.text ) {jQuery
				buttonClasses.push( "ui-button-text-icon" + ( multipleIcons ? "s" : ( icons.primary ? "-primary" : "-secondary" ) ) );jQuery
			}jQuery
jQuery
			if ( icons.primary ) {jQuery
				buttonElement.prepend( "<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>" );jQuery
			}jQuery
jQuery
			if ( icons.secondary ) {jQuery
				buttonElement.append( "<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>" );jQuery
			}jQuery
jQuery
			if ( !this.options.text ) {jQuery
				buttonClasses.push( multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only" );jQuery
jQuery
				if ( !this.hasTitle ) {jQuery
					buttonElement.attr( "title", $.trim( buttonText ) );jQuery
				}jQuery
			}jQuery
		} else {jQuery
			buttonClasses.push( "ui-button-text-only" );jQuery
		}jQuery
		buttonElement.addClass( buttonClasses.join( " " ) );jQuery
	}jQuery
});jQuery
jQuery
$.widget( "ui.buttonset", {jQuery
	version: "1.10.4",jQuery
	options: {jQuery
		items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"jQuery
	},jQuery
jQuery
	_create: function() {jQuery
		this.element.addClass( "ui-buttonset" );jQuery
	},jQuery
jQuery
	_init: function() {jQuery
		this.refresh();jQuery
	},jQuery
jQuery
	_setOption: function( key, value ) {jQuery
		if ( key === "disabled" ) {jQuery
			this.buttons.button( "option", key, value );jQuery
		}jQuery
jQuery
		this._super( key, value );jQuery
	},jQuery
jQuery
	refresh: function() {jQuery
		var rtl = this.element.css( "direction" ) === "rtl";jQuery
jQuery
		this.buttons = this.element.find( this.options.items )jQuery
			.filter( ":ui-button" )jQuery
				.button( "refresh" )jQuery
			.end()jQuery
			.not( ":ui-button" )jQuery
				.button()jQuery
			.end()jQuery
			.map(function() {jQuery
				return $( this ).button( "widget" )[ 0 ];jQuery
			})jQuery
				.removeClass( "ui-corner-all ui-corner-left ui-corner-right" )jQuery
				.filter( ":first" )jQuery
					.addClass( rtl ? "ui-corner-right" : "ui-corner-left" )jQuery
				.end()jQuery
				.filter( ":last" )jQuery
					.addClass( rtl ? "ui-corner-left" : "ui-corner-right" )jQuery
				.end()jQuery
			.end();jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		this.element.removeClass( "ui-buttonset" );jQuery
		this.buttonsjQuery
			.map(function() {jQuery
				return $( this ).button( "widget" )[ 0 ];jQuery
			})jQuery
				.removeClass( "ui-corner-left ui-corner-right" )jQuery
			.end()jQuery
			.button( "destroy" );jQuery
	}jQuery
});jQuery
jQuery
}( jQuery ) );jQuery
(function( $, undefined ) {jQuery
jQuery
$.extend($.ui, { datepicker: { version: "1.10.4" } });jQuery
jQuery
var PROP_NAME = "datepicker",jQuery
	instActive;jQuery
jQuery
/* Date picker manager.jQuery
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.jQuery
   Settings for (groups of) date pickers are maintained in an instance object,jQuery
   allowing multiple different settings on the same page. */jQuery
jQuery
function Datepicker() {jQuery
	this._curInst = null; // The current instance in usejQuery
	this._keyEvent = false; // If the last event was a key eventjQuery
	this._disabledInputs = []; // List of date picker inputs that have been disabledjQuery
	this._datepickerShowing = false; // True if the popup picker is showing , false if notjQuery
	this._inDialog = false; // True if showing within a "dialog", false if notjQuery
	this._mainDivId = "ui-datepicker-div"; // The ID of the main datepicker divisionjQuery
	this._inlineClass = "ui-datepicker-inline"; // The name of the inline marker classjQuery
	this._appendClass = "ui-datepicker-append"; // The name of the append marker classjQuery
	this._triggerClass = "ui-datepicker-trigger"; // The name of the trigger marker classjQuery
	this._dialogClass = "ui-datepicker-dialog"; // The name of the dialog marker classjQuery
	this._disableClass = "ui-datepicker-disabled"; // The name of the disabled covering marker classjQuery
	this._unselectableClass = "ui-datepicker-unselectable"; // The name of the unselectable cell marker classjQuery
	this._currentClass = "ui-datepicker-current-day"; // The name of the current day marker classjQuery
	this._dayOverClass = "ui-datepicker-days-cell-over"; // The name of the day hover marker classjQuery
	this.regional = []; // Available regional settings, indexed by language codejQuery
	this.regional[""] = { // Default regional settingsjQuery
		closeText: "Done", // Display text for close linkjQuery
		prevText: "Prev", // Display text for previous month linkjQuery
		nextText: "Next", // Display text for next month linkjQuery
		currentText: "Today", // Display text for current month linkjQuery
		monthNames: ["January","February","March","April","May","June",jQuery
			"July","August","September","October","November","December"], // Names of months for drop-down and formattingjQuery
		monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formattingjQuery
		dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formattingjQuery
		dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formattingjQuery
		dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"], // Column headings for days starting at SundayjQuery
		weekHeader: "Wk", // Column header for week of the yearjQuery
		dateFormat: "mm/dd/yy", // See format options on parseDatejQuery
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...jQuery
		isRTL: false, // True if right-to-left language, false if left-to-rightjQuery
		showMonthAfterYear: false, // True if the year select precedes month, false for month then yearjQuery
		yearSuffix: "" // Additional text to append to the year in the month headersjQuery
	};jQuery
	this._defaults = { // Global defaults for all the date picker instancesjQuery
		showOn: "focus", // "focus" for popup on focus,jQuery
			// "button" for trigger button, or "both" for eitherjQuery
		showAnim: "fadeIn", // Name of jQuery animation for popupjQuery
		showOptions: {}, // Options for enhanced animationsjQuery
		defaultDate: null, // Used when field is blank: actual date,jQuery
			// +/-number for offset from today, null for todayjQuery
		appendText: "", // Display text following the input box, e.g. showing the formatjQuery
		buttonText: "...", // Text for trigger buttonjQuery
		buttonImage: "", // URL for trigger button imagejQuery
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a buttonjQuery
		hideIfNoPrevNext: false, // True to hide next/previous month linksjQuery
			// if not applicable, false to just disable themjQuery
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next linksjQuery
		gotoCurrent: false, // True if today link goes back to current selection insteadjQuery
		changeMonth: false, // True if month can be selected directly, false if only prev/nextjQuery
		changeYear: false, // True if year can be selected directly, false if only prev/nextjQuery
		yearRange: "c-10:c+10", // Range of years to display in drop-down,jQuery
			// either relative to today's year (-nn:+nn), relative to currently displayed yearjQuery
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)jQuery
		showOtherMonths: false, // True to show dates in other months, false to leave blankjQuery
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectablejQuery
		showWeek: false, // True to show week of the year, false to not show itjQuery
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,jQuery
			// takes a Date and returns the number of the week for itjQuery
		shortYearCutoff: "+10", // Short year values < this are in the current century,jQuery
			// > this are in the previous century,jQuery
			// string value starting with "+" for current year + valuejQuery
		minDate: null, // The earliest selectable date, or null for no limitjQuery
		maxDate: null, // The latest selectable date, or null for no limitjQuery
		duration: "fast", // Duration of display/closurejQuery
		beforeShowDay: null, // Function that takes a date and returns an array withjQuery
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",jQuery
			// [2] = cell title (optional), e.g. $.datepicker.noWeekendsjQuery
		beforeShow: null, // Function that takes an input field andjQuery
			// returns a set of custom settings for the date pickerjQuery
		onSelect: null, // Define a callback function when a date is selectedjQuery
		onChangeMonthYear: null, // Define a callback function when the month or year is changedjQuery
		onClose: null, // Define a callback function when the datepicker is closedjQuery
		numberOfMonths: 1, // Number of months to show at a timejQuery
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)jQuery
		stepMonths: 1, // Number of months to step back/forwardjQuery
		stepBigMonths: 12, // Number of months to step back/forward for the big linksjQuery
		altField: "", // Selector for an alternate field to store selected dates intojQuery
		altFormat: "", // The date format to use for the alternate fieldjQuery
		constrainInput: true, // The input is constrained by the current date formatjQuery
		showButtonPanel: false, // True to show button panel, false to not show itjQuery
		autoSize: false, // True to size the input for the date format, false to leave as isjQuery
		disabled: false // The initial disabled statejQuery
	};jQuery
	$.extend(this._defaults, this.regional[""]);jQuery
	this.dpDiv = bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));jQuery
}jQuery
jQuery
$.extend(Datepicker.prototype, {jQuery
	/* Class name added to elements to indicate already configured with a date picker. */jQuery
	markerClassName: "hasDatepicker",jQuery
jQuery
	//Keep track of the maximum number of rows displayed (see #7043)jQuery
	maxRows: 4,jQuery
jQuery
	// TODO rename to "widget" when switching to widget factoryjQuery
	_widgetDatepicker: function() {jQuery
		return this.dpDiv;jQuery
	},jQuery
jQuery
	/* Override the default settings for all instances of the date picker.jQuery
	 * @param  settings  object - the new settings to use as defaults (anonymous object)jQuery
	 * @return the manager objectjQuery
	 */jQuery
	setDefaults: function(settings) {jQuery
		extendRemove(this._defaults, settings || {});jQuery
		return this;jQuery
	},jQuery
jQuery
	/* Attach the date picker to a jQuery selection.jQuery
	 * @param  target	element - the target input field or division or spanjQuery
	 * @param  settings  object - the new settings to use for this date picker instance (anonymous)jQuery
	 */jQuery
	_attachDatepicker: function(target, settings) {jQuery
		var nodeName, inline, inst;jQuery
		nodeName = target.nodeName.toLowerCase();jQuery
		inline = (nodeName === "div" || nodeName === "span");jQuery
		if (!target.id) {jQuery
			this.uuid += 1;jQuery
			target.id = "dp" + this.uuid;jQuery
		}jQuery
		inst = this._newInst($(target), inline);jQuery
		inst.settings = $.extend({}, settings || {});jQuery
		if (nodeName === "input") {jQuery
			this._connectDatepicker(target, inst);jQuery
		} else if (inline) {jQuery
			this._inlineDatepicker(target, inst);jQuery
		}jQuery
	},jQuery
jQuery
	/* Create a new instance object. */jQuery
	_newInst: function(target, inline) {jQuery
		var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); // escape jQuery meta charsjQuery
		return {id: id, input: target, // associated targetjQuery
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selectionjQuery
			drawMonth: 0, drawYear: 0, // month being drawnjQuery
			inline: inline, // is datepicker inline or notjQuery
			dpDiv: (!inline ? this.dpDiv : // presentation divjQuery
			bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))};jQuery
	},jQuery
jQuery
	/* Attach the date picker to an input field. */jQuery
	_connectDatepicker: function(target, inst) {jQuery
		var input = $(target);jQuery
		inst.append = $([]);jQuery
		inst.trigger = $([]);jQuery
		if (input.hasClass(this.markerClassName)) {jQuery
			return;jQuery
		}jQuery
		this._attachments(input, inst);jQuery
		input.addClass(this.markerClassName).keydown(this._doKeyDown).jQuery
			keypress(this._doKeyPress).keyup(this._doKeyUp);jQuery
		this._autoSize(inst);jQuery
		$.data(target, PROP_NAME, inst);jQuery
		//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)jQuery
		if( inst.settings.disabled ) {jQuery
			this._disableDatepicker( target );jQuery
		}jQuery
	},jQuery
jQuery
	/* Make attachments based on settings. */jQuery
	_attachments: function(input, inst) {jQuery
		var showOn, buttonText, buttonImage,jQuery
			appendText = this._get(inst, "appendText"),jQuery
			isRTL = this._get(inst, "isRTL");jQuery
jQuery
		if (inst.append) {jQuery
			inst.append.remove();jQuery
		}jQuery
		if (appendText) {jQuery
			inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");jQuery
			input[isRTL ? "before" : "after"](inst.append);jQuery
		}jQuery
jQuery
		input.unbind("focus", this._showDatepicker);jQuery
jQuery
		if (inst.trigger) {jQuery
			inst.trigger.remove();jQuery
		}jQuery
jQuery
		showOn = this._get(inst, "showOn");jQuery
		if (showOn === "focus" || showOn === "both") { // pop-up date picker when in the marked fieldjQuery
			input.focus(this._showDatepicker);jQuery
		}jQuery
		if (showOn === "button" || showOn === "both") { // pop-up date picker when button clickedjQuery
			buttonText = this._get(inst, "buttonText");jQuery
			buttonImage = this._get(inst, "buttonImage");jQuery
			inst.trigger = $(this._get(inst, "buttonImageOnly") ?jQuery
				$("<img/>").addClass(this._triggerClass).jQuery
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :jQuery
				$("<button type='button'></button>").addClass(this._triggerClass).jQuery
					html(!buttonImage ? buttonText : $("<img/>").attr(jQuery
					{ src:buttonImage, alt:buttonText, title:buttonText })));jQuery
			input[isRTL ? "before" : "after"](inst.trigger);jQuery
			inst.trigger.click(function() {jQuery
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {jQuery
					$.datepicker._hideDatepicker();jQuery
				} else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {jQuery
					$.datepicker._hideDatepicker();jQuery
					$.datepicker._showDatepicker(input[0]);jQuery
				} else {jQuery
					$.datepicker._showDatepicker(input[0]);jQuery
				}jQuery
				return false;jQuery
			});jQuery
		}jQuery
	},jQuery
jQuery
	/* Apply the maximum length for the date format. */jQuery
	_autoSize: function(inst) {jQuery
		if (this._get(inst, "autoSize") && !inst.inline) {jQuery
			var findMax, max, maxI, i,jQuery
				date = new Date(2009, 12 - 1, 20), // Ensure double digitsjQuery
				dateFormat = this._get(inst, "dateFormat");jQuery
jQuery
			if (dateFormat.match(/[DM]/)) {jQuery
				findMax = function(names) {jQuery
					max = 0;jQuery
					maxI = 0;jQuery
					for (i = 0; i < names.length; i++) {jQuery
						if (names[i].length > max) {jQuery
							max = names[i].length;jQuery
							maxI = i;jQuery
						}jQuery
					}jQuery
					return maxI;jQuery
				};jQuery
				date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?jQuery
					"monthNames" : "monthNamesShort"))));jQuery
				date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?jQuery
					"dayNames" : "dayNamesShort"))) + 20 - date.getDay());jQuery
			}jQuery
			inst.input.attr("size", this._formatDate(inst, date).length);jQuery
		}jQuery
	},jQuery
jQuery
	/* Attach an inline date picker to a div. */jQuery
	_inlineDatepicker: function(target, inst) {jQuery
		var divSpan = $(target);jQuery
		if (divSpan.hasClass(this.markerClassName)) {jQuery
			return;jQuery
		}jQuery
		divSpan.addClass(this.markerClassName).append(inst.dpDiv);jQuery
		$.data(target, PROP_NAME, inst);jQuery
		this._setDate(inst, this._getDefaultDate(inst), true);jQuery
		this._updateDatepicker(inst);jQuery
		this._updateAlternate(inst);jQuery
		//If disabled option is true, disable the datepicker before showing it (see ticket #5665)jQuery
		if( inst.settings.disabled ) {jQuery
			this._disableDatepicker( target );jQuery
		}jQuery
		// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elementsjQuery
		// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero heightjQuery
		inst.dpDiv.css( "display", "block" );jQuery
	},jQuery
jQuery
	/* Pop-up the date picker in a "dialog" box.jQuery
	 * @param  input element - ignoredjQuery
	 * @param  date	string or Date - the initial date to displayjQuery
	 * @param  onSelect  function - the function to call when a date is selectedjQuery
	 * @param  settings  object - update the dialog date picker instance's settings (anonymous object)jQuery
	 * @param  pos int[2] - coordinates for the dialog's position within the screen orjQuery
	 *					event - with x/y coordinates orjQuery
	 *					leave empty for default (screen centre)jQuery
	 * @return the manager objectjQuery
	 */jQuery
	_dialogDatepicker: function(input, date, onSelect, settings, pos) {jQuery
		var id, browserWidth, browserHeight, scrollX, scrollY,jQuery
			inst = this._dialogInst; // internal instancejQuery
jQuery
		if (!inst) {jQuery
			this.uuid += 1;jQuery
			id = "dp" + this.uuid;jQuery
			this._dialogInput = $("<input type='text' id='" + id +jQuery
				"' style='position: absolute; top: -100px; width: 0px;'/>");jQuery
			this._dialogInput.keydown(this._doKeyDown);jQuery
			$("body").append(this._dialogInput);jQuery
			inst = this._dialogInst = this._newInst(this._dialogInput, false);jQuery
			inst.settings = {};jQuery
			$.data(this._dialogInput[0], PROP_NAME, inst);jQuery
		}jQuery
		extendRemove(inst.settings, settings || {});jQuery
		date = (date && date.constructor === Date ? this._formatDate(inst, date) : date);jQuery
		this._dialogInput.val(date);jQuery
jQuery
		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);jQuery
		if (!this._pos) {jQuery
			browserWidth = document.documentElement.clientWidth;jQuery
			browserHeight = document.documentElement.clientHeight;jQuery
			scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;jQuery
			scrollY = document.documentElement.scrollTop || document.body.scrollTop;jQuery
			this._pos = // should use actual width/height belowjQuery
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];jQuery
		}jQuery
jQuery
		// move input on screen for focus, but hidden behind dialogjQuery
		this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");jQuery
		inst.settings.onSelect = onSelect;jQuery
		this._inDialog = true;jQuery
		this.dpDiv.addClass(this._dialogClass);jQuery
		this._showDatepicker(this._dialogInput[0]);jQuery
		if ($.blockUI) {jQuery
			$.blockUI(this.dpDiv);jQuery
		}jQuery
		$.data(this._dialogInput[0], PROP_NAME, inst);jQuery
		return this;jQuery
	},jQuery
jQuery
	/* Detach a datepicker from its control.jQuery
	 * @param  target	element - the target input field or division or spanjQuery
	 */jQuery
	_destroyDatepicker: function(target) {jQuery
		var nodeName,jQuery
			$target = $(target),jQuery
			inst = $.data(target, PROP_NAME);jQuery
jQuery
		if (!$target.hasClass(this.markerClassName)) {jQuery
			return;jQuery
		}jQuery
jQuery
		nodeName = target.nodeName.toLowerCase();jQuery
		$.removeData(target, PROP_NAME);jQuery
		if (nodeName === "input") {jQuery
			inst.append.remove();jQuery
			inst.trigger.remove();jQuery
			$target.removeClass(this.markerClassName).jQuery
				unbind("focus", this._showDatepicker).jQuery
				unbind("keydown", this._doKeyDown).jQuery
				unbind("keypress", this._doKeyPress).jQuery
				unbind("keyup", this._doKeyUp);jQuery
		} else if (nodeName === "div" || nodeName === "span") {jQuery
			$target.removeClass(this.markerClassName).empty();jQuery
		}jQuery
	},jQuery
jQuery
	/* Enable the date picker to a jQuery selection.jQuery
	 * @param  target	element - the target input field or division or spanjQuery
	 */jQuery
	_enableDatepicker: function(target) {jQuery
		var nodeName, inline,jQuery
			$target = $(target),jQuery
			inst = $.data(target, PROP_NAME);jQuery
jQuery
		if (!$target.hasClass(this.markerClassName)) {jQuery
			return;jQuery
		}jQuery
jQuery
		nodeName = target.nodeName.toLowerCase();jQuery
		if (nodeName === "input") {jQuery
			target.disabled = false;jQuery
			inst.trigger.filter("button").jQuery
				each(function() { this.disabled = false; }).end().jQuery
				filter("img").css({opacity: "1.0", cursor: ""});jQuery
		} else if (nodeName === "div" || nodeName === "span") {jQuery
			inline = $target.children("." + this._inlineClass);jQuery
			inline.children().removeClass("ui-state-disabled");jQuery
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").jQuery
				prop("disabled", false);jQuery
		}jQuery
		this._disabledInputs = $.map(this._disabledInputs,jQuery
			function(value) { return (value === target ? null : value); }); // delete entryjQuery
	},jQuery
jQuery
	/* Disable the date picker to a jQuery selection.jQuery
	 * @param  target	element - the target input field or division or spanjQuery
	 */jQuery
	_disableDatepicker: function(target) {jQuery
		var nodeName, inline,jQuery
			$target = $(target),jQuery
			inst = $.data(target, PROP_NAME);jQuery
jQuery
		if (!$target.hasClass(this.markerClassName)) {jQuery
			return;jQuery
		}jQuery
jQuery
		nodeName = target.nodeName.toLowerCase();jQuery
		if (nodeName === "input") {jQuery
			target.disabled = true;jQuery
			inst.trigger.filter("button").jQuery
				each(function() { this.disabled = true; }).end().jQuery
				filter("img").css({opacity: "0.5", cursor: "default"});jQuery
		} else if (nodeName === "div" || nodeName === "span") {jQuery
			inline = $target.children("." + this._inlineClass);jQuery
			inline.children().addClass("ui-state-disabled");jQuery
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").jQuery
				prop("disabled", true);jQuery
		}jQuery
		this._disabledInputs = $.map(this._disabledInputs,jQuery
			function(value) { return (value === target ? null : value); }); // delete entryjQuery
		this._disabledInputs[this._disabledInputs.length] = target;jQuery
	},jQuery
jQuery
	/* Is the first field in a jQuery collection disabled as a datepicker?jQuery
	 * @param  target	element - the target input field or division or spanjQuery
	 * @return boolean - true if disabled, false if enabledjQuery
	 */jQuery
	_isDisabledDatepicker: function(target) {jQuery
		if (!target) {jQuery
			return false;jQuery
		}jQuery
		for (var i = 0; i < this._disabledInputs.length; i++) {jQuery
			if (this._disabledInputs[i] === target) {jQuery
				return true;jQuery
			}jQuery
		}jQuery
		return false;jQuery
	},jQuery
jQuery
	/* Retrieve the instance data for the target control.jQuery
	 * @param  target  element - the target input field or division or spanjQuery
	 * @return  object - the associated instance datajQuery
	 * @throws  error if a jQuery problem getting datajQuery
	 */jQuery
	_getInst: function(target) {jQuery
		try {jQuery
			return $.data(target, PROP_NAME);jQuery
		}jQuery
		catch (err) {jQuery
			throw "Missing instance data for this datepicker";jQuery
		}jQuery
	},jQuery
jQuery
	/* Update or retrieve the settings for a date picker attached to an input field or division.jQuery
	 * @param  target  element - the target input field or division or spanjQuery
	 * @param  name	object - the new settings to update orjQuery
	 *				string - the name of the setting to change or retrieve,jQuery
	 *				when retrieving also "all" for all instance settings orjQuery
	 *				"defaults" for all global defaultsjQuery
	 * @param  value   any - the new value for the settingjQuery
	 *				(omit if above is an object or to retrieve a value)jQuery
	 */jQuery
	_optionDatepicker: function(target, name, value) {jQuery
		var settings, date, minDate, maxDate,jQuery
			inst = this._getInst(target);jQuery
jQuery
		if (arguments.length === 2 && typeof name === "string") {jQuery
			return (name === "defaults" ? $.extend({}, $.datepicker._defaults) :jQuery
				(inst ? (name === "all" ? $.extend({}, inst.settings) :jQuery
				this._get(inst, name)) : null));jQuery
		}jQuery
jQuery
		settings = name || {};jQuery
		if (typeof name === "string") {jQuery
			settings = {};jQuery
			settings[name] = value;jQuery
		}jQuery
jQuery
		if (inst) {jQuery
			if (this._curInst === inst) {jQuery
				this._hideDatepicker();jQuery
			}jQuery
jQuery
			date = this._getDateDatepicker(target, true);jQuery
			minDate = this._getMinMaxDate(inst, "min");jQuery
			maxDate = this._getMinMaxDate(inst, "max");jQuery
			extendRemove(inst.settings, settings);jQuery
			// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't providedjQuery
			if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {jQuery
				inst.settings.minDate = this._formatDate(inst, minDate);jQuery
			}jQuery
			if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {jQuery
				inst.settings.maxDate = this._formatDate(inst, maxDate);jQuery
			}jQuery
			if ( "disabled" in settings ) {jQuery
				if ( settings.disabled ) {jQuery
					this._disableDatepicker(target);jQuery
				} else {jQuery
					this._enableDatepicker(target);jQuery
				}jQuery
			}jQuery
			this._attachments($(target), inst);jQuery
			this._autoSize(inst);jQuery
			this._setDate(inst, date);jQuery
			this._updateAlternate(inst);jQuery
			this._updateDatepicker(inst);jQuery
		}jQuery
	},jQuery
jQuery
	// change method deprecatedjQuery
	_changeDatepicker: function(target, name, value) {jQuery
		this._optionDatepicker(target, name, value);jQuery
	},jQuery
jQuery
	/* Redraw the date picker attached to an input field or division.jQuery
	 * @param  target  element - the target input field or division or spanjQuery
	 */jQuery
	_refreshDatepicker: function(target) {jQuery
		var inst = this._getInst(target);jQuery
		if (inst) {jQuery
			this._updateDatepicker(inst);jQuery
		}jQuery
	},jQuery
jQuery
	/* Set the dates for a jQuery selection.jQuery
	 * @param  target element - the target input field or division or spanjQuery
	 * @param  date	Date - the new datejQuery
	 */jQuery
	_setDateDatepicker: function(target, date) {jQuery
		var inst = this._getInst(target);jQuery
		if (inst) {jQuery
			this._setDate(inst, date);jQuery
			this._updateDatepicker(inst);jQuery
			this._updateAlternate(inst);jQuery
		}jQuery
	},jQuery
jQuery
	/* Get the date(s) for the first entry in a jQuery selection.jQuery
	 * @param  target element - the target input field or division or spanjQuery
	 * @param  noDefault boolean - true if no default date is to be usedjQuery
	 * @return Date - the current datejQuery
	 */jQuery
	_getDateDatepicker: function(target, noDefault) {jQuery
		var inst = this._getInst(target);jQuery
		if (inst && !inst.inline) {jQuery
			this._setDateFromField(inst, noDefault);jQuery
		}jQuery
		return (inst ? this._getDate(inst) : null);jQuery
	},jQuery
jQuery
	/* Handle keystrokes. */jQuery
	_doKeyDown: function(event) {jQuery
		var onSelect, dateStr, sel,jQuery
			inst = $.datepicker._getInst(event.target),jQuery
			handled = true,jQuery
			isRTL = inst.dpDiv.is(".ui-datepicker-rtl");jQuery
jQuery
		inst._keyEvent = true;jQuery
		if ($.datepicker._datepickerShowing) {jQuery
			switch (event.keyCode) {jQuery
				case 9: $.datepicker._hideDatepicker();jQuery
						handled = false;jQuery
						break; // hide on tab outjQuery
				case 13: sel = $("td." + $.datepicker._dayOverClass + ":not(." +jQuery
									$.datepicker._currentClass + ")", inst.dpDiv);jQuery
						if (sel[0]) {jQuery
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);jQuery
						}jQuery
jQuery
						onSelect = $.datepicker._get(inst, "onSelect");jQuery
						if (onSelect) {jQuery
							dateStr = $.datepicker._formatDate(inst);jQuery
jQuery
							// trigger custom callbackjQuery
							onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);jQuery
						} else {jQuery
							$.datepicker._hideDatepicker();jQuery
						}jQuery
jQuery
						return false; // don't submit the formjQuery
				case 27: $.datepicker._hideDatepicker();jQuery
						break; // hide on escapejQuery
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?jQuery
							-$.datepicker._get(inst, "stepBigMonths") :jQuery
							-$.datepicker._get(inst, "stepMonths")), "M");jQuery
						break; // previous month/year on page up/+ ctrljQuery
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?jQuery
							+$.datepicker._get(inst, "stepBigMonths") :jQuery
							+$.datepicker._get(inst, "stepMonths")), "M");jQuery
						break; // next month/year on page down/+ ctrljQuery
				case 35: if (event.ctrlKey || event.metaKey) {jQuery
							$.datepicker._clearDate(event.target);jQuery
						}jQuery
						handled = event.ctrlKey || event.metaKey;jQuery
						break; // clear on ctrl or command +endjQuery
				case 36: if (event.ctrlKey || event.metaKey) {jQuery
							$.datepicker._gotoToday(event.target);jQuery
						}jQuery
						handled = event.ctrlKey || event.metaKey;jQuery
						break; // current on ctrl or command +homejQuery
				case 37: if (event.ctrlKey || event.metaKey) {jQuery
							$.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D");jQuery
						}jQuery
						handled = event.ctrlKey || event.metaKey;jQuery
						// -1 day on ctrl or command +leftjQuery
						if (event.originalEvent.altKey) {jQuery
							$.datepicker._adjustDate(event.target, (event.ctrlKey ?jQuery
								-$.datepicker._get(inst, "stepBigMonths") :jQuery
								-$.datepicker._get(inst, "stepMonths")), "M");jQuery
						}jQuery
						// next month/year on alt +left on MacjQuery
						break;jQuery
				case 38: if (event.ctrlKey || event.metaKey) {jQuery
							$.datepicker._adjustDate(event.target, -7, "D");jQuery
						}jQuery
						handled = event.ctrlKey || event.metaKey;jQuery
						break; // -1 week on ctrl or command +upjQuery
				case 39: if (event.ctrlKey || event.metaKey) {jQuery
							$.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D");jQuery
						}jQuery
						handled = event.ctrlKey || event.metaKey;jQuery
						// +1 day on ctrl or command +rightjQuery
						if (event.originalEvent.altKey) {jQuery
							$.datepicker._adjustDate(event.target, (event.ctrlKey ?jQuery
								+$.datepicker._get(inst, "stepBigMonths") :jQuery
								+$.datepicker._get(inst, "stepMonths")), "M");jQuery
						}jQuery
						// next month/year on alt +rightjQuery
						break;jQuery
				case 40: if (event.ctrlKey || event.metaKey) {jQuery
							$.datepicker._adjustDate(event.target, +7, "D");jQuery
						}jQuery
						handled = event.ctrlKey || event.metaKey;jQuery
						break; // +1 week on ctrl or command +downjQuery
				default: handled = false;jQuery
			}jQuery
		} else if (event.keyCode === 36 && event.ctrlKey) { // display the date picker on ctrl+homejQuery
			$.datepicker._showDatepicker(this);jQuery
		} else {jQuery
			handled = false;jQuery
		}jQuery
jQuery
		if (handled) {jQuery
			event.preventDefault();jQuery
			event.stopPropagation();jQuery
		}jQuery
	},jQuery
jQuery
	/* Filter entered characters - based on date format. */jQuery
	_doKeyPress: function(event) {jQuery
		var chars, chr,jQuery
			inst = $.datepicker._getInst(event.target);jQuery
jQuery
		if ($.datepicker._get(inst, "constrainInput")) {jQuery
			chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));jQuery
			chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);jQuery
			return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1);jQuery
		}jQuery
	},jQuery
jQuery
	/* Synchronise manual entry and field/alternate field. */jQuery
	_doKeyUp: function(event) {jQuery
		var date,jQuery
			inst = $.datepicker._getInst(event.target);jQuery
jQuery
		if (inst.input.val() !== inst.lastVal) {jQuery
			try {jQuery
				date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),jQuery
					(inst.input ? inst.input.val() : null),jQuery
					$.datepicker._getFormatConfig(inst));jQuery
jQuery
				if (date) { // only if validjQuery
					$.datepicker._setDateFromField(inst);jQuery
					$.datepicker._updateAlternate(inst);jQuery
					$.datepicker._updateDatepicker(inst);jQuery
				}jQuery
			}jQuery
			catch (err) {jQuery
			}jQuery
		}jQuery
		return true;jQuery
	},jQuery
jQuery
	/* Pop-up the date picker for a given input field.jQuery
	 * If false returned from beforeShow event handler do not show.jQuery
	 * @param  input  element - the input field attached to the date picker orjQuery
	 *					event - if triggered by focusjQuery
	 */jQuery
	_showDatepicker: function(input) {jQuery
		input = input.target || input;jQuery
		if (input.nodeName.toLowerCase() !== "input") { // find from button/image triggerjQuery
			input = $("input", input.parentNode)[0];jQuery
		}jQuery
jQuery
		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) { // already herejQuery
			return;jQuery
		}jQuery
jQuery
		var inst, beforeShow, beforeShowSettings, isFixed,jQuery
			offset, showAnim, duration;jQuery
jQuery
		inst = $.datepicker._getInst(input);jQuery
		if ($.datepicker._curInst && $.datepicker._curInst !== inst) {jQuery
			$.datepicker._curInst.dpDiv.stop(true, true);jQuery
			if ( inst && $.datepicker._datepickerShowing ) {jQuery
				$.datepicker._hideDatepicker( $.datepicker._curInst.input[0] );jQuery
			}jQuery
		}jQuery
jQuery
		beforeShow = $.datepicker._get(inst, "beforeShow");jQuery
		beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};jQuery
		if(beforeShowSettings === false){jQuery
			return;jQuery
		}jQuery
		extendRemove(inst.settings, beforeShowSettings);jQuery
jQuery
		inst.lastVal = null;jQuery
		$.datepicker._lastInput = input;jQuery
		$.datepicker._setDateFromField(inst);jQuery
jQuery
		if ($.datepicker._inDialog) { // hide cursorjQuery
			input.value = "";jQuery
		}jQuery
		if (!$.datepicker._pos) { // position below inputjQuery
			$.datepicker._pos = $.datepicker._findPos(input);jQuery
			$.datepicker._pos[1] += input.offsetHeight; // add the heightjQuery
		}jQuery
jQuery
		isFixed = false;jQuery
		$(input).parents().each(function() {jQuery
			isFixed |= $(this).css("position") === "fixed";jQuery
			return !isFixed;jQuery
		});jQuery
jQuery
		offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};jQuery
		$.datepicker._pos = null;jQuery
		//to avoid flashes on FirefoxjQuery
		inst.dpDiv.empty();jQuery
		// determine sizing offscreenjQuery
		inst.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});jQuery
		$.datepicker._updateDatepicker(inst);jQuery
		// fix width for dynamic number of date pickersjQuery
		// and adjust position before showingjQuery
		offset = $.datepicker._checkOffset(inst, offset, isFixed);jQuery
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?jQuery
			"static" : (isFixed ? "fixed" : "absolute")), display: "none",jQuery
			left: offset.left + "px", top: offset.top + "px"});jQuery
jQuery
		if (!inst.inline) {jQuery
			showAnim = $.datepicker._get(inst, "showAnim");jQuery
			duration = $.datepicker._get(inst, "duration");jQuery
			inst.dpDiv.zIndex($(input).zIndex()+1);jQuery
			$.datepicker._datepickerShowing = true;jQuery
jQuery
			if ( $.effects && $.effects.effect[ showAnim ] ) {jQuery
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);jQuery
			} else {jQuery
				inst.dpDiv[showAnim || "show"](showAnim ? duration : null);jQuery
			}jQuery
jQuery
			if ( $.datepicker._shouldFocusInput( inst ) ) {jQuery
				inst.input.focus();jQuery
			}jQuery
jQuery
			$.datepicker._curInst = inst;jQuery
		}jQuery
	},jQuery
jQuery
	/* Generate the date picker content. */jQuery
	_updateDatepicker: function(inst) {jQuery
		this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)jQuery
		instActive = inst; // for delegate hover eventsjQuery
		inst.dpDiv.empty().append(this._generateHTML(inst));jQuery
		this._attachHandlers(inst);jQuery
		inst.dpDiv.find("." + this._dayOverClass + " a").mouseover();jQuery
jQuery
		var origyearshtml,jQuery
			numMonths = this._getNumberOfMonths(inst),jQuery
			cols = numMonths[1],jQuery
			width = 17;jQuery
jQuery
		inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");jQuery
		if (cols > 1) {jQuery
			inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em");jQuery
		}jQuery
		inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") +jQuery
			"Class"]("ui-datepicker-multi");jQuery
		inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") +jQuery
			"Class"]("ui-datepicker-rtl");jQuery
jQuery
		if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput( inst ) ) {jQuery
			inst.input.focus();jQuery
		}jQuery
jQuery
		// deffered render of the years select (to avoid flashes on Firefox)jQuery
		if( inst.yearshtml ){jQuery
			origyearshtml = inst.yearshtml;jQuery
			setTimeout(function(){jQuery
				//assure that inst.yearshtml didn't change.jQuery
				if( origyearshtml === inst.yearshtml && inst.yearshtml ){jQuery
					inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml);jQuery
				}jQuery
				origyearshtml = inst.yearshtml = null;jQuery
			}, 0);jQuery
		}jQuery
	},jQuery
jQuery
	// #6694 - don't focus the input if it's already focusedjQuery
	// this breaks the change event in IEjQuery
	// Support: IE and jQuery <1.9jQuery
	_shouldFocusInput: function( inst ) {jQuery
		return inst.input && inst.input.is( ":visible" ) && !inst.input.is( ":disabled" ) && !inst.input.is( ":focus" );jQuery
	},jQuery
jQuery
	/* Check positioning to remain on screen. */jQuery
	_checkOffset: function(inst, offset, isFixed) {jQuery
		var dpWidth = inst.dpDiv.outerWidth(),jQuery
			dpHeight = inst.dpDiv.outerHeight(),jQuery
			inputWidth = inst.input ? inst.input.outerWidth() : 0,jQuery
			inputHeight = inst.input ? inst.input.outerHeight() : 0,jQuery
			viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),jQuery
			viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());jQuery
jQuery
		offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);jQuery
		offset.left -= (isFixed && offset.left === inst.input.offset().left) ? $(document).scrollLeft() : 0;jQuery
		offset.top -= (isFixed && offset.top === (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;jQuery
jQuery
		// now check if datepicker is showing outside window viewport - move to a better place if so.jQuery
		offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?jQuery
			Math.abs(offset.left + dpWidth - viewWidth) : 0);jQuery
		offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?jQuery
			Math.abs(dpHeight + inputHeight) : 0);jQuery
jQuery
		return offset;jQuery
	},jQuery
jQuery
	/* Find an object's position on the screen. */jQuery
	_findPos: function(obj) {jQuery
		var position,jQuery
			inst = this._getInst(obj),jQuery
			isRTL = this._get(inst, "isRTL");jQuery
jQuery
		while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {jQuery
			obj = obj[isRTL ? "previousSibling" : "nextSibling"];jQuery
		}jQuery
jQuery
		position = $(obj).offset();jQuery
		return [position.left, position.top];jQuery
	},jQuery
jQuery
	/* Hide the date picker from view.jQuery
	 * @param  input  element - the input field attached to the date pickerjQuery
	 */jQuery
	_hideDatepicker: function(input) {jQuery
		var showAnim, duration, postProcess, onClose,jQuery
			inst = this._curInst;jQuery
jQuery
		if (!inst || (input && inst !== $.data(input, PROP_NAME))) {jQuery
			return;jQuery
		}jQuery
jQuery
		if (this._datepickerShowing) {jQuery
			showAnim = this._get(inst, "showAnim");jQuery
			duration = this._get(inst, "duration");jQuery
			postProcess = function() {jQuery
				$.datepicker._tidyDialog(inst);jQuery
			};jQuery
jQuery
			// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not neededjQuery
			if ( $.effects && ( $.effects.effect[ showAnim ] || $.effects[ showAnim ] ) ) {jQuery
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);jQuery
			} else {jQuery
				inst.dpDiv[(showAnim === "slideDown" ? "slideUp" :jQuery
					(showAnim === "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess);jQuery
			}jQuery
jQuery
			if (!showAnim) {jQuery
				postProcess();jQuery
			}jQuery
			this._datepickerShowing = false;jQuery
jQuery
			onClose = this._get(inst, "onClose");jQuery
			if (onClose) {jQuery
				onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst]);jQuery
			}jQuery
jQuery
			this._lastInput = null;jQuery
			if (this._inDialog) {jQuery
				this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" });jQuery
				if ($.blockUI) {jQuery
					$.unblockUI();jQuery
					$("body").append(this.dpDiv);jQuery
				}jQuery
			}jQuery
			this._inDialog = false;jQuery
		}jQuery
	},jQuery
jQuery
	/* Tidy up after a dialog display. */jQuery
	_tidyDialog: function(inst) {jQuery
		inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");jQuery
	},jQuery
jQuery
	/* Close date picker if clicked elsewhere. */jQuery
	_checkExternalClick: function(event) {jQuery
		if (!$.datepicker._curInst) {jQuery
			return;jQuery
		}jQuery
jQuery
		var $target = $(event.target),jQuery
			inst = $.datepicker._getInst($target[0]);jQuery
jQuery
		if ( ( ( $target[0].id !== $.datepicker._mainDivId &&jQuery
				$target.parents("#" + $.datepicker._mainDivId).length === 0 &&jQuery
				!$target.hasClass($.datepicker.markerClassName) &&jQuery
				!$target.closest("." + $.datepicker._triggerClass).length &&jQuery
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) ||jQuery
			( $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst ) ) {jQuery
				$.datepicker._hideDatepicker();jQuery
		}jQuery
	},jQuery
jQuery
	/* Adjust one of the date sub-fields. */jQuery
	_adjustDate: function(id, offset, period) {jQuery
		var target = $(id),jQuery
			inst = this._getInst(target[0]);jQuery
jQuery
		if (this._isDisabledDatepicker(target[0])) {jQuery
			return;jQuery
		}jQuery
		this._adjustInstDate(inst, offset +jQuery
			(period === "M" ? this._get(inst, "showCurrentAtPos") : 0), // undo positioningjQuery
			period);jQuery
		this._updateDatepicker(inst);jQuery
	},jQuery
jQuery
	/* Action for current link. */jQuery
	_gotoToday: function(id) {jQuery
		var date,jQuery
			target = $(id),jQuery
			inst = this._getInst(target[0]);jQuery
jQuery
		if (this._get(inst, "gotoCurrent") && inst.currentDay) {jQuery
			inst.selectedDay = inst.currentDay;jQuery
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;jQuery
			inst.drawYear = inst.selectedYear = inst.currentYear;jQuery
		} else {jQuery
			date = new Date();jQuery
			inst.selectedDay = date.getDate();jQuery
			inst.drawMonth = inst.selectedMonth = date.getMonth();jQuery
			inst.drawYear = inst.selectedYear = date.getFullYear();jQuery
		}jQuery
		this._notifyChange(inst);jQuery
		this._adjustDate(target);jQuery
	},jQuery
jQuery
	/* Action for selecting a new month/year. */jQuery
	_selectMonthYear: function(id, select, period) {jQuery
		var target = $(id),jQuery
			inst = this._getInst(target[0]);jQuery
jQuery
		inst["selected" + (period === "M" ? "Month" : "Year")] =jQuery
		inst["draw" + (period === "M" ? "Month" : "Year")] =jQuery
			parseInt(select.options[select.selectedIndex].value,10);jQuery
jQuery
		this._notifyChange(inst);jQuery
		this._adjustDate(target);jQuery
	},jQuery
jQuery
	/* Action for selecting a day. */jQuery
	_selectDay: function(id, month, year, td) {jQuery
		var inst,jQuery
			target = $(id);jQuery
jQuery
		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {jQuery
			return;jQuery
		}jQuery
jQuery
		inst = this._getInst(target[0]);jQuery
		inst.selectedDay = inst.currentDay = $("a", td).html();jQuery
		inst.selectedMonth = inst.currentMonth = month;jQuery
		inst.selectedYear = inst.currentYear = year;jQuery
		this._selectDate(id, this._formatDate(inst,jQuery
			inst.currentDay, inst.currentMonth, inst.currentYear));jQuery
	},jQuery
jQuery
	/* Erase the input field and hide the date picker. */jQuery
	_clearDate: function(id) {jQuery
		var target = $(id);jQuery
		this._selectDate(target, "");jQuery
	},jQuery
jQuery
	/* Update the input field with the selected date. */jQuery
	_selectDate: function(id, dateStr) {jQuery
		var onSelect,jQuery
			target = $(id),jQuery
			inst = this._getInst(target[0]);jQuery
jQuery
		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));jQuery
		if (inst.input) {jQuery
			inst.input.val(dateStr);jQuery
		}jQuery
		this._updateAlternate(inst);jQuery
jQuery
		onSelect = this._get(inst, "onSelect");jQuery
		if (onSelect) {jQuery
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callbackjQuery
		} else if (inst.input) {jQuery
			inst.input.trigger("change"); // fire the change eventjQuery
		}jQuery
jQuery
		if (inst.inline){jQuery
			this._updateDatepicker(inst);jQuery
		} else {jQuery
			this._hideDatepicker();jQuery
			this._lastInput = inst.input[0];jQuery
			if (typeof(inst.input[0]) !== "object") {jQuery
				inst.input.focus(); // restore focusjQuery
			}jQuery
			this._lastInput = null;jQuery
		}jQuery
	},jQuery
jQuery
	/* Update any alternate field to synchronise with the main field. */jQuery
	_updateAlternate: function(inst) {jQuery
		var altFormat, date, dateStr,jQuery
			altField = this._get(inst, "altField");jQuery
jQuery
		if (altField) { // update alternate field toojQuery
			altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");jQuery
			date = this._getDate(inst);jQuery
			dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));jQuery
			$(altField).each(function() { $(this).val(dateStr); });jQuery
		}jQuery
	},jQuery
jQuery
	/* Set as beforeShowDay function to prevent selection of weekends.jQuery
	 * @param  date  Date - the date to customisejQuery
	 * @return [boolean, string] - is this date selectable?, what is its CSS class?jQuery
	 */jQuery
	noWeekends: function(date) {jQuery
		var day = date.getDay();jQuery
		return [(day > 0 && day < 6), ""];jQuery
	},jQuery
jQuery
	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.jQuery
	 * @param  date  Date - the date to get the week forjQuery
	 * @return  number - the number of the week within the year that contains this datejQuery
	 */jQuery
	iso8601Week: function(date) {jQuery
		var time,jQuery
			checkDate = new Date(date.getTime());jQuery
jQuery
		// Find Thursday of this week starting on MondayjQuery
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));jQuery
jQuery
		time = checkDate.getTime();jQuery
		checkDate.setMonth(0); // Compare with Jan 1jQuery
		checkDate.setDate(1);jQuery
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;jQuery
	},jQuery
jQuery
	/* Parse a string value into a date object.jQuery
	 * See formatDate below for the possible formats.jQuery
	 *jQuery
	 * @param  format string - the expected format of the datejQuery
	 * @param  value string - the date in the above formatjQuery
	 * @param  settings Object - attributes include:jQuery
	 *					shortYearCutoff  number - the cutoff year for determining the century (optional)jQuery
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)jQuery
	 *					dayNames		string[7] - names of the days from Sunday (optional)jQuery
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)jQuery
	 *					monthNames		string[12] - names of the months (optional)jQuery
	 * @return  Date - the extracted date value or null if value is blankjQuery
	 */jQuery
	parseDate: function (format, value, settings) {jQuery
		if (format == null || value == null) {jQuery
			throw "Invalid arguments";jQuery
		}jQuery
jQuery
		value = (typeof value === "object" ? value.toString() : value + "");jQuery
		if (value === "") {jQuery
			return null;jQuery
		}jQuery
jQuery
		var iFormat, dim, extra,jQuery
			iValue = 0,jQuery
			shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,jQuery
			shortYearCutoff = (typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp :jQuery
				new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10)),jQuery
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,jQuery
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,jQuery
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,jQuery
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,jQuery
			year = -1,jQuery
			month = -1,jQuery
			day = -1,jQuery
			doy = -1,jQuery
			literal = false,jQuery
			date,jQuery
			// Check whether a format character is doubledjQuery
			lookAhead = function(match) {jQuery
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);jQuery
				if (matches) {jQuery
					iFormat++;jQuery
				}jQuery
				return matches;jQuery
			},jQuery
			// Extract a number from the string valuejQuery
			getNumber = function(match) {jQuery
				var isDoubled = lookAhead(match),jQuery
					size = (match === "@" ? 14 : (match === "!" ? 20 :jQuery
					(match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),jQuery
					digits = new RegExp("^\\d{1," + size + "}"),jQuery
					num = value.substring(iValue).match(digits);jQuery
				if (!num) {jQuery
					throw "Missing number at position " + iValue;jQuery
				}jQuery
				iValue += num[0].length;jQuery
				return parseInt(num[0], 10);jQuery
			},jQuery
			// Extract a name from the string value and convert to an indexjQuery
			getName = function(match, shortNames, longNames) {jQuery
				var index = -1,jQuery
					names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {jQuery
						return [ [k, v] ];jQuery
					}).sort(function (a, b) {jQuery
						return -(a[1].length - b[1].length);jQuery
					});jQuery
jQuery
				$.each(names, function (i, pair) {jQuery
					var name = pair[1];jQuery
					if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {jQuery
						index = pair[0];jQuery
						iValue += name.length;jQuery
						return false;jQuery
					}jQuery
				});jQuery
				if (index !== -1) {jQuery
					return index + 1;jQuery
				} else {jQuery
					throw "Unknown name at position " + iValue;jQuery
				}jQuery
			},jQuery
			// Confirm that a literal character matches the string valuejQuery
			checkLiteral = function() {jQuery
				if (value.charAt(iValue) !== format.charAt(iFormat)) {jQuery
					throw "Unexpected literal at position " + iValue;jQuery
				}jQuery
				iValue++;jQuery
			};jQuery
jQuery
		for (iFormat = 0; iFormat < format.length; iFormat++) {jQuery
			if (literal) {jQuery
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {jQuery
					literal = false;jQuery
				} else {jQuery
					checkLiteral();jQuery
				}jQuery
			} else {jQuery
				switch (format.charAt(iFormat)) {jQuery
					case "d":jQuery
						day = getNumber("d");jQuery
						break;jQuery
					case "D":jQuery
						getName("D", dayNamesShort, dayNames);jQuery
						break;jQuery
					case "o":jQuery
						doy = getNumber("o");jQuery
						break;jQuery
					case "m":jQuery
						month = getNumber("m");jQuery
						break;jQuery
					case "M":jQuery
						month = getName("M", monthNamesShort, monthNames);jQuery
						break;jQuery
					case "y":jQuery
						year = getNumber("y");jQuery
						break;jQuery
					case "@":jQuery
						date = new Date(getNumber("@"));jQuery
						year = date.getFullYear();jQuery
						month = date.getMonth() + 1;jQuery
						day = date.getDate();jQuery
						break;jQuery
					case "!":jQuery
						date = new Date((getNumber("!") - this._ticksTo1970) / 10000);jQuery
						year = date.getFullYear();jQuery
						month = date.getMonth() + 1;jQuery
						day = date.getDate();jQuery
						break;jQuery
					case "'":jQuery
						if (lookAhead("'")){jQuery
							checkLiteral();jQuery
						} else {jQuery
							literal = true;jQuery
						}jQuery
						break;jQuery
					default:jQuery
						checkLiteral();jQuery
				}jQuery
			}jQuery
		}jQuery
jQuery
		if (iValue < value.length){jQuery
			extra = value.substr(iValue);jQuery
			if (!/^\s+/.test(extra)) {jQuery
				throw "Extra/unparsed characters found in date: " + extra;jQuery
			}jQuery
		}jQuery
jQuery
		if (year === -1) {jQuery
			year = new Date().getFullYear();jQuery
		} else if (year < 100) {jQuery
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +jQuery
				(year <= shortYearCutoff ? 0 : -100);jQuery
		}jQuery
jQuery
		if (doy > -1) {jQuery
			month = 1;jQuery
			day = doy;jQuery
			do {jQuery
				dim = this._getDaysInMonth(year, month - 1);jQuery
				if (day <= dim) {jQuery
					break;jQuery
				}jQuery
				month++;jQuery
				day -= dim;jQuery
			} while (true);jQuery
		}jQuery
jQuery
		date = this._daylightSavingAdjust(new Date(year, month - 1, day));jQuery
		if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {jQuery
			throw "Invalid date"; // E.g. 31/02/00jQuery
		}jQuery
		return date;jQuery
	},jQuery
jQuery
	/* Standard date formats. */jQuery
	ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)jQuery
	COOKIE: "D, dd M yy",jQuery
	ISO_8601: "yy-mm-dd",jQuery
	RFC_822: "D, d M y",jQuery
	RFC_850: "DD, dd-M-y",jQuery
	RFC_1036: "D, d M y",jQuery
	RFC_1123: "D, d M yy",jQuery
	RFC_2822: "D, d M yy",jQuery
	RSS: "D, d M y", // RFC 822jQuery
	TICKS: "!",jQuery
	TIMESTAMP: "@",jQuery
	W3C: "yy-mm-dd", // ISO 8601jQuery
jQuery
	_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +jQuery
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),jQuery
jQuery
	/* Format a date object into a string value.jQuery
	 * The format can be combinations of the following:jQuery
	 * d  - day of month (no leading zero)jQuery
	 * dd - day of month (two digit)jQuery
	 * o  - day of year (no leading zeros)jQuery
	 * oo - day of year (three digit)jQuery
	 * D  - day name shortjQuery
	 * DD - day name longjQuery
	 * m  - month of year (no leading zero)jQuery
	 * mm - month of year (two digit)jQuery
	 * M  - month name shortjQuery
	 * MM - month name longjQuery
	 * y  - year (two digit)jQuery
	 * yy - year (four digit)jQuery
	 * @ - Unix timestamp (ms since 01/01/1970)jQuery
	 * ! - Windows ticks (100ns since 01/01/0001)jQuery
	 * "..." - literal textjQuery
	 * '' - single quotejQuery
	 *jQuery
	 * @param  format string - the desired format of the datejQuery
	 * @param  date Date - the date value to formatjQuery
	 * @param  settings Object - attributes include:jQuery
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)jQuery
	 *					dayNames		string[7] - names of the days from Sunday (optional)jQuery
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)jQuery
	 *					monthNames		string[12] - names of the months (optional)jQuery
	 * @return  string - the date in the above formatjQuery
	 */jQuery
	formatDate: function (format, date, settings) {jQuery
		if (!date) {jQuery
			return "";jQuery
		}jQuery
jQuery
		var iFormat,jQuery
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,jQuery
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,jQuery
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,jQuery
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,jQuery
			// Check whether a format character is doubledjQuery
			lookAhead = function(match) {jQuery
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);jQuery
				if (matches) {jQuery
					iFormat++;jQuery
				}jQuery
				return matches;jQuery
			},jQuery
			// Format a number, with leading zero if necessaryjQuery
			formatNumber = function(match, value, len) {jQuery
				var num = "" + value;jQuery
				if (lookAhead(match)) {jQuery
					while (num.length < len) {jQuery
						num = "0" + num;jQuery
					}jQuery
				}jQuery
				return num;jQuery
			},jQuery
			// Format a name, short or long as requestedjQuery
			formatName = function(match, value, shortNames, longNames) {jQuery
				return (lookAhead(match) ? longNames[value] : shortNames[value]);jQuery
			},jQuery
			output = "",jQuery
			literal = false;jQuery
jQuery
		if (date) {jQuery
			for (iFormat = 0; iFormat < format.length; iFormat++) {jQuery
				if (literal) {jQuery
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {jQuery
						literal = false;jQuery
					} else {jQuery
						output += format.charAt(iFormat);jQuery
					}jQuery
				} else {jQuery
					switch (format.charAt(iFormat)) {jQuery
						case "d":jQuery
							output += formatNumber("d", date.getDate(), 2);jQuery
							break;jQuery
						case "D":jQuery
							output += formatName("D", date.getDay(), dayNamesShort, dayNames);jQuery
							break;jQuery
						case "o":jQuery
							output += formatNumber("o",jQuery
								Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);jQuery
							break;jQuery
						case "m":jQuery
							output += formatNumber("m", date.getMonth() + 1, 2);jQuery
							break;jQuery
						case "M":jQuery
							output += formatName("M", date.getMonth(), monthNamesShort, monthNames);jQuery
							break;jQuery
						case "y":jQuery
							output += (lookAhead("y") ? date.getFullYear() :jQuery
								(date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);jQuery
							break;jQuery
						case "@":jQuery
							output += date.getTime();jQuery
							break;jQuery
						case "!":jQuery
							output += date.getTime() * 10000 + this._ticksTo1970;jQuery
							break;jQuery
						case "'":jQuery
							if (lookAhead("'")) {jQuery
								output += "'";jQuery
							} else {jQuery
								literal = true;jQuery
							}jQuery
							break;jQuery
						default:jQuery
							output += format.charAt(iFormat);jQuery
					}jQuery
				}jQuery
			}jQuery
		}jQuery
		return output;jQuery
	},jQuery
jQuery
	/* Extract all possible characters from the date format. */jQuery
	_possibleChars: function (format) {jQuery
		var iFormat,jQuery
			chars = "",jQuery
			literal = false,jQuery
			// Check whether a format character is doubledjQuery
			lookAhead = function(match) {jQuery
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);jQuery
				if (matches) {jQuery
					iFormat++;jQuery
				}jQuery
				return matches;jQuery
			};jQuery
jQuery
		for (iFormat = 0; iFormat < format.length; iFormat++) {jQuery
			if (literal) {jQuery
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {jQuery
					literal = false;jQuery
				} else {jQuery
					chars += format.charAt(iFormat);jQuery
				}jQuery
			} else {jQuery
				switch (format.charAt(iFormat)) {jQuery
					case "d": case "m": case "y": case "@":jQuery
						chars += "0123456789";jQuery
						break;jQuery
					case "D": case "M":jQuery
						return null; // Accept anythingjQuery
					case "'":jQuery
						if (lookAhead("'")) {jQuery
							chars += "'";jQuery
						} else {jQuery
							literal = true;jQuery
						}jQuery
						break;jQuery
					default:jQuery
						chars += format.charAt(iFormat);jQuery
				}jQuery
			}jQuery
		}jQuery
		return chars;jQuery
	},jQuery
jQuery
	/* Get a setting value, defaulting if necessary. */jQuery
	_get: function(inst, name) {jQuery
		return inst.settings[name] !== undefined ?jQuery
			inst.settings[name] : this._defaults[name];jQuery
	},jQuery
jQuery
	/* Parse existing date and initialise date picker. */jQuery
	_setDateFromField: function(inst, noDefault) {jQuery
		if (inst.input.val() === inst.lastVal) {jQuery
			return;jQuery
		}jQuery
jQuery
		var dateFormat = this._get(inst, "dateFormat"),jQuery
			dates = inst.lastVal = inst.input ? inst.input.val() : null,jQuery
			defaultDate = this._getDefaultDate(inst),jQuery
			date = defaultDate,jQuery
			settings = this._getFormatConfig(inst);jQuery
jQuery
		try {jQuery
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;jQuery
		} catch (event) {jQuery
			dates = (noDefault ? "" : dates);jQuery
		}jQuery
		inst.selectedDay = date.getDate();jQuery
		inst.drawMonth = inst.selectedMonth = date.getMonth();jQuery
		inst.drawYear = inst.selectedYear = date.getFullYear();jQuery
		inst.currentDay = (dates ? date.getDate() : 0);jQuery
		inst.currentMonth = (dates ? date.getMonth() : 0);jQuery
		inst.currentYear = (dates ? date.getFullYear() : 0);jQuery
		this._adjustInstDate(inst);jQuery
	},jQuery
jQuery
	/* Retrieve the default date shown on opening. */jQuery
	_getDefaultDate: function(inst) {jQuery
		return this._restrictMinMax(inst,jQuery
			this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));jQuery
	},jQuery
jQuery
	/* A date may be specified as an exact value or a relative one. */jQuery
	_determineDate: function(inst, date, defaultDate) {jQuery
		var offsetNumeric = function(offset) {jQuery
				var date = new Date();jQuery
				date.setDate(date.getDate() + offset);jQuery
				return date;jQuery
			},jQuery
			offsetString = function(offset) {jQuery
				try {jQuery
					return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),jQuery
						offset, $.datepicker._getFormatConfig(inst));jQuery
				}jQuery
				catch (e) {jQuery
					// IgnorejQuery
				}jQuery
jQuery
				var date = (offset.toLowerCase().match(/^c/) ?jQuery
					$.datepicker._getDate(inst) : null) || new Date(),jQuery
					year = date.getFullYear(),jQuery
					month = date.getMonth(),jQuery
					day = date.getDate(),jQuery
					pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,jQuery
					matches = pattern.exec(offset);jQuery
jQuery
				while (matches) {jQuery
					switch (matches[2] || "d") {jQuery
						case "d" : case "D" :jQuery
							day += parseInt(matches[1],10); break;jQuery
						case "w" : case "W" :jQuery
							day += parseInt(matches[1],10) * 7; break;jQuery
						case "m" : case "M" :jQuery
							month += parseInt(matches[1],10);jQuery
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));jQuery
							break;jQuery
						case "y": case "Y" :jQuery
							year += parseInt(matches[1],10);jQuery
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));jQuery
							break;jQuery
					}jQuery
					matches = pattern.exec(offset);jQuery
				}jQuery
				return new Date(year, month, day);jQuery
			},jQuery
			newDate = (date == null || date === "" ? defaultDate : (typeof date === "string" ? offsetString(date) :jQuery
				(typeof date === "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));jQuery
jQuery
		newDate = (newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate);jQuery
		if (newDate) {jQuery
			newDate.setHours(0);jQuery
			newDate.setMinutes(0);jQuery
			newDate.setSeconds(0);jQuery
			newDate.setMilliseconds(0);jQuery
		}jQuery
		return this._daylightSavingAdjust(newDate);jQuery
	},jQuery
jQuery
	/* Handle switch to/from daylight saving.jQuery
	 * Hours may be non-zero on daylight saving cut-over:jQuery
	 * > 12 when midnight changeover, but then cannot generatejQuery
	 * midnight datetime, so jump to 1AM, otherwise reset.jQuery
	 * @param  date  (Date) the date to checkjQuery
	 * @return  (Date) the corrected datejQuery
	 */jQuery
	_daylightSavingAdjust: function(date) {jQuery
		if (!date) {jQuery
			return null;jQuery
		}jQuery
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);jQuery
		return date;jQuery
	},jQuery
jQuery
	/* Set the date(s) directly. */jQuery
	_setDate: function(inst, date, noChange) {jQuery
		var clear = !date,jQuery
			origMonth = inst.selectedMonth,jQuery
			origYear = inst.selectedYear,jQuery
			newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));jQuery
jQuery
		inst.selectedDay = inst.currentDay = newDate.getDate();jQuery
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();jQuery
		inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();jQuery
		if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {jQuery
			this._notifyChange(inst);jQuery
		}jQuery
		this._adjustInstDate(inst);jQuery
		if (inst.input) {jQuery
			inst.input.val(clear ? "" : this._formatDate(inst));jQuery
		}jQuery
	},jQuery
jQuery
	/* Retrieve the date(s) directly. */jQuery
	_getDate: function(inst) {jQuery
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() === "") ? null :jQuery
			this._daylightSavingAdjust(new Date(jQuery
			inst.currentYear, inst.currentMonth, inst.currentDay)));jQuery
			return startDate;jQuery
	},jQuery
jQuery
	/* Attach the onxxx handlers.  These are declared statically sojQuery
	 * they work with static code transformers like Caja.jQuery
	 */jQuery
	_attachHandlers: function(inst) {jQuery
		var stepMonths = this._get(inst, "stepMonths"),jQuery
			id = "#" + inst.id.replace( /\\\\/g, "\\" );jQuery
		inst.dpDiv.find("[data-handler]").map(function () {jQuery
			var handler = {jQuery
				prev: function () {jQuery
					$.datepicker._adjustDate(id, -stepMonths, "M");jQuery
				},jQuery
				next: function () {jQuery
					$.datepicker._adjustDate(id, +stepMonths, "M");jQuery
				},jQuery
				hide: function () {jQuery
					$.datepicker._hideDatepicker();jQuery
				},jQuery
				today: function () {jQuery
					$.datepicker._gotoToday(id);jQuery
				},jQuery
				selectDay: function () {jQuery
					$.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);jQuery
					return false;jQuery
				},jQuery
				selectMonth: function () {jQuery
					$.datepicker._selectMonthYear(id, this, "M");jQuery
					return false;jQuery
				},jQuery
				selectYear: function () {jQuery
					$.datepicker._selectMonthYear(id, this, "Y");jQuery
					return false;jQuery
				}jQuery
			};jQuery
			$(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);jQuery
		});jQuery
	},jQuery
jQuery
	/* Generate the HTML for the current state of the date picker. */jQuery
	_generateHTML: function(inst) {jQuery
		var maxDraw, prevText, prev, nextText, next, currentText, gotoDate,jQuery
			controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin,jQuery
			monthNames, monthNamesShort, beforeShowDay, showOtherMonths,jQuery
			selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate,jQuery
			cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows,jQuery
			printDate, dRow, tbody, daySettings, otherMonth, unselectable,jQuery
			tempDate = new Date(),jQuery
			today = this._daylightSavingAdjust(jQuery
				new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), // clear timejQuery
			isRTL = this._get(inst, "isRTL"),jQuery
			showButtonPanel = this._get(inst, "showButtonPanel"),jQuery
			hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),jQuery
			navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),jQuery
			numMonths = this._getNumberOfMonths(inst),jQuery
			showCurrentAtPos = this._get(inst, "showCurrentAtPos"),jQuery
			stepMonths = this._get(inst, "stepMonths"),jQuery
			isMultiMonth = (numMonths[0] !== 1 || numMonths[1] !== 1),jQuery
			currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :jQuery
				new Date(inst.currentYear, inst.currentMonth, inst.currentDay))),jQuery
			minDate = this._getMinMaxDate(inst, "min"),jQuery
			maxDate = this._getMinMaxDate(inst, "max"),jQuery
			drawMonth = inst.drawMonth - showCurrentAtPos,jQuery
			drawYear = inst.drawYear;jQuery
jQuery
		if (drawMonth < 0) {jQuery
			drawMonth += 12;jQuery
			drawYear--;jQuery
		}jQuery
		if (maxDate) {jQuery
			maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),jQuery
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));jQuery
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);jQuery
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {jQuery
				drawMonth--;jQuery
				if (drawMonth < 0) {jQuery
					drawMonth = 11;jQuery
					drawYear--;jQuery
				}jQuery
			}jQuery
		}jQuery
		inst.drawMonth = drawMonth;jQuery
		inst.drawYear = drawYear;jQuery
jQuery
		prevText = this._get(inst, "prevText");jQuery
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,jQuery
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),jQuery
			this._getFormatConfig(inst)));jQuery
jQuery
		prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?jQuery
			"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" +jQuery
			" title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" :jQuery
			(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+ prevText +"'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>"));jQuery
jQuery
		nextText = this._get(inst, "nextText");jQuery
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,jQuery
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),jQuery
			this._getFormatConfig(inst)));jQuery
jQuery
		next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?jQuery
			"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" +jQuery
			" title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" :jQuery
			(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+ nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>"));jQuery
jQuery
		currentText = this._get(inst, "currentText");jQuery
		gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);jQuery
		currentText = (!navigationAsDateFormat ? currentText :jQuery
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));jQuery
jQuery
		controls = (!inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +jQuery
			this._get(inst, "closeText") + "</button>" : "");jQuery
jQuery
		buttonPanel = (showButtonPanel) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") +jQuery
			(this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" +jQuery
			">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";jQuery
jQuery
		firstDay = parseInt(this._get(inst, "firstDay"),10);jQuery
		firstDay = (isNaN(firstDay) ? 0 : firstDay);jQuery
jQuery
		showWeek = this._get(inst, "showWeek");jQuery
		dayNames = this._get(inst, "dayNames");jQuery
		dayNamesMin = this._get(inst, "dayNamesMin");jQuery
		monthNames = this._get(inst, "monthNames");jQuery
		monthNamesShort = this._get(inst, "monthNamesShort");jQuery
		beforeShowDay = this._get(inst, "beforeShowDay");jQuery
		showOtherMonths = this._get(inst, "showOtherMonths");jQuery
		selectOtherMonths = this._get(inst, "selectOtherMonths");jQuery
		defaultDate = this._getDefaultDate(inst);jQuery
		html = "";jQuery
		dow;jQuery
		for (row = 0; row < numMonths[0]; row++) {jQuery
			group = "";jQuery
			this.maxRows = 4;jQuery
			for (col = 0; col < numMonths[1]; col++) {jQuery
				selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));jQuery
				cornerClass = " ui-corner-all";jQuery
				calender = "";jQuery
				if (isMultiMonth) {jQuery
					calender += "<div class='ui-datepicker-group";jQuery
					if (numMonths[1] > 1) {jQuery
						switch (col) {jQuery
							case 0: calender += " ui-datepicker-group-first";jQuery
								cornerClass = " ui-corner-" + (isRTL ? "right" : "left"); break;jQuery
							case numMonths[1]-1: calender += " ui-datepicker-group-last";jQuery
								cornerClass = " ui-corner-" + (isRTL ? "left" : "right"); break;jQuery
							default: calender += " ui-datepicker-group-middle"; cornerClass = ""; break;jQuery
						}jQuery
					}jQuery
					calender += "'>";jQuery
				}jQuery
				calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" +jQuery
					(/all|left/.test(cornerClass) && row === 0 ? (isRTL ? next : prev) : "") +jQuery
					(/all|right/.test(cornerClass) && row === 0 ? (isRTL ? prev : next) : "") +jQuery
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,jQuery
					row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headersjQuery
					"</div><table class='ui-datepicker-calendar'><thead>" +jQuery
					"<tr>";jQuery
				thead = (showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "");jQuery
				for (dow = 0; dow < 7; dow++) { // days of the weekjQuery
					day = (dow + firstDay) % 7;jQuery
					thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" +jQuery
						"<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";jQuery
				}jQuery
				calender += thead + "</tr></thead><tbody>";jQuery
				daysInMonth = this._getDaysInMonth(drawYear, drawMonth);jQuery
				if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {jQuery
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);jQuery
				}jQuery
				leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;jQuery
				curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generatejQuery
				numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)jQuery
				this.maxRows = numRows;jQuery
				printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));jQuery
				for (dRow = 0; dRow < numRows; dRow++) { // create date picker rowsjQuery
					calender += "<tr>";jQuery
					tbody = (!showWeek ? "" : "<td class='ui-datepicker-week-col'>" +jQuery
						this._get(inst, "calculateWeek")(printDate) + "</td>");jQuery
					for (dow = 0; dow < 7; dow++) { // create date picker daysjQuery
						daySettings = (beforeShowDay ?jQuery
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);jQuery
						otherMonth = (printDate.getMonth() !== drawMonth);jQuery
						unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||jQuery
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);jQuery
						tbody += "<td class='" +jQuery
							((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + // highlight weekendsjQuery
							(otherMonth ? " ui-datepicker-other-month" : "") + // highlight days from other monthsjQuery
							((printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent) || // user pressed keyjQuery
							(defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime()) ?jQuery
							// or defaultDate is current printedDate and defaultDate is selectedDatejQuery
							" " + this._dayOverClass : "") + // highlight selected dayjQuery
							(unselectable ? " " + this._unselectableClass + " ui-state-disabled": "") +  // highlight unselectable daysjQuery
							(otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + // highlight custom datesjQuery
							(printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + // highlight selected dayjQuery
							(printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + // highlight today (if different)jQuery
							((!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + // cell titlejQuery
							(unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + // actionsjQuery
							(otherMonth && !showOtherMonths ? "&#xa0;" : // display for other monthsjQuery
							(unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" +jQuery
							(printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") +jQuery
							(printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + // highlight selected dayjQuery
							(otherMonth ? " ui-priority-secondary" : "") + // distinguish dates from other monthsjQuery
							"' href='#'>" + printDate.getDate() + "</a>")) + "</td>"; // display selectable datejQuery
						printDate.setDate(printDate.getDate() + 1);jQuery
						printDate = this._daylightSavingAdjust(printDate);jQuery
					}jQuery
					calender += tbody + "</tr>";jQuery
				}jQuery
				drawMonth++;jQuery
				if (drawMonth > 11) {jQuery
					drawMonth = 0;jQuery
					drawYear++;jQuery
				}jQuery
				calender += "</tbody></table>" + (isMultiMonth ? "</div>" +jQuery
							((numMonths[0] > 0 && col === numMonths[1]-1) ? "<div class='ui-datepicker-row-break'></div>" : "") : "");jQuery
				group += calender;jQuery
			}jQuery
			html += group;jQuery
		}jQuery
		html += buttonPanel;jQuery
		inst._keyEvent = false;jQuery
		return html;jQuery
	},jQuery
jQuery
	/* Generate the month and year header. */jQuery
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,jQuery
			secondary, monthNames, monthNamesShort) {jQuery
jQuery
		var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear,jQuery
			changeMonth = this._get(inst, "changeMonth"),jQuery
			changeYear = this._get(inst, "changeYear"),jQuery
			showMonthAfterYear = this._get(inst, "showMonthAfterYear"),jQuery
			html = "<div class='ui-datepicker-title'>",jQuery
			monthHtml = "";jQuery
jQuery
		// month selectionjQuery
		if (secondary || !changeMonth) {jQuery
			monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";jQuery
		} else {jQuery
			inMinYear = (minDate && minDate.getFullYear() === drawYear);jQuery
			inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);jQuery
			monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";jQuery
			for ( month = 0; month < 12; month++) {jQuery
				if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {jQuery
					monthHtml += "<option value='" + month + "'" +jQuery
						(month === drawMonth ? " selected='selected'" : "") +jQuery
						">" + monthNamesShort[month] + "</option>";jQuery
				}jQuery
			}jQuery
			monthHtml += "</select>";jQuery
		}jQuery
jQuery
		if (!showMonthAfterYear) {jQuery
			html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");jQuery
		}jQuery
jQuery
		// year selectionjQuery
		if ( !inst.yearshtml ) {jQuery
			inst.yearshtml = "";jQuery
			if (secondary || !changeYear) {jQuery
				html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";jQuery
			} else {jQuery
				// determine range of years to displayjQuery
				years = this._get(inst, "yearRange").split(":");jQuery
				thisYear = new Date().getFullYear();jQuery
				determineYear = function(value) {jQuery
					var year = (value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) :jQuery
						(value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) :jQuery
						parseInt(value, 10)));jQuery
					return (isNaN(year) ? thisYear : year);jQuery
				};jQuery
				year = determineYear(years[0]);jQuery
				endYear = Math.max(year, determineYear(years[1] || ""));jQuery
				year = (minDate ? Math.max(year, minDate.getFullYear()) : year);jQuery
				endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);jQuery
				inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";jQuery
				for (; year <= endYear; year++) {jQuery
					inst.yearshtml += "<option value='" + year + "'" +jQuery
						(year === drawYear ? " selected='selected'" : "") +jQuery
						">" + year + "</option>";jQuery
				}jQuery
				inst.yearshtml += "</select>";jQuery
jQuery
				html += inst.yearshtml;jQuery
				inst.yearshtml = null;jQuery
			}jQuery
		}jQuery
jQuery
		html += this._get(inst, "yearSuffix");jQuery
		if (showMonthAfterYear) {jQuery
			html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;jQuery
		}jQuery
		html += "</div>"; // Close datepicker_headerjQuery
		return html;jQuery
	},jQuery
jQuery
	/* Adjust one of the date sub-fields. */jQuery
	_adjustInstDate: function(inst, offset, period) {jQuery
		var year = inst.drawYear + (period === "Y" ? offset : 0),jQuery
			month = inst.drawMonth + (period === "M" ? offset : 0),jQuery
			day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === "D" ? offset : 0),jQuery
			date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));jQuery
jQuery
		inst.selectedDay = date.getDate();jQuery
		inst.drawMonth = inst.selectedMonth = date.getMonth();jQuery
		inst.drawYear = inst.selectedYear = date.getFullYear();jQuery
		if (period === "M" || period === "Y") {jQuery
			this._notifyChange(inst);jQuery
		}jQuery
	},jQuery
jQuery
	/* Ensure a date is within any min/max bounds. */jQuery
	_restrictMinMax: function(inst, date) {jQuery
		var minDate = this._getMinMaxDate(inst, "min"),jQuery
			maxDate = this._getMinMaxDate(inst, "max"),jQuery
			newDate = (minDate && date < minDate ? minDate : date);jQuery
		return (maxDate && newDate > maxDate ? maxDate : newDate);jQuery
	},jQuery
jQuery
	/* Notify change of month/year. */jQuery
	_notifyChange: function(inst) {jQuery
		var onChange = this._get(inst, "onChangeMonthYear");jQuery
		if (onChange) {jQuery
			onChange.apply((inst.input ? inst.input[0] : null),jQuery
				[inst.selectedYear, inst.selectedMonth + 1, inst]);jQuery
		}jQuery
	},jQuery
jQuery
	/* Determine the number of months to show. */jQuery
	_getNumberOfMonths: function(inst) {jQuery
		var numMonths = this._get(inst, "numberOfMonths");jQuery
		return (numMonths == null ? [1, 1] : (typeof numMonths === "number" ? [1, numMonths] : numMonths));jQuery
	},jQuery
jQuery
	/* Determine the current maximum date - ensure no time components are set. */jQuery
	_getMinMaxDate: function(inst, minMax) {jQuery
		return this._determineDate(inst, this._get(inst, minMax + "Date"), null);jQuery
	},jQuery
jQuery
	/* Find the number of days in a given month. */jQuery
	_getDaysInMonth: function(year, month) {jQuery
		return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();jQuery
	},jQuery
jQuery
	/* Find the day of the week of the first of a month. */jQuery
	_getFirstDayOfMonth: function(year, month) {jQuery
		return new Date(year, month, 1).getDay();jQuery
	},jQuery
jQuery
	/* Determines if we should allow a "next/prev" month display change. */jQuery
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {jQuery
		var numMonths = this._getNumberOfMonths(inst),jQuery
			date = this._daylightSavingAdjust(new Date(curYear,jQuery
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));jQuery
jQuery
		if (offset < 0) {jQuery
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));jQuery
		}jQuery
		return this._isInRange(inst, date);jQuery
	},jQuery
jQuery
	/* Is the given date in the accepted range? */jQuery
	_isInRange: function(inst, date) {jQuery
		var yearSplit, currentYear,jQuery
			minDate = this._getMinMaxDate(inst, "min"),jQuery
			maxDate = this._getMinMaxDate(inst, "max"),jQuery
			minYear = null,jQuery
			maxYear = null,jQuery
			years = this._get(inst, "yearRange");jQuery
			if (years){jQuery
				yearSplit = years.split(":");jQuery
				currentYear = new Date().getFullYear();jQuery
				minYear = parseInt(yearSplit[0], 10);jQuery
				maxYear = parseInt(yearSplit[1], 10);jQuery
				if ( yearSplit[0].match(/[+\-].*/) ) {jQuery
					minYear += currentYear;jQuery
				}jQuery
				if ( yearSplit[1].match(/[+\-].*/) ) {jQuery
					maxYear += currentYear;jQuery
				}jQuery
			}jQuery
jQuery
		return ((!minDate || date.getTime() >= minDate.getTime()) &&jQuery
			(!maxDate || date.getTime() <= maxDate.getTime()) &&jQuery
			(!minYear || date.getFullYear() >= minYear) &&jQuery
			(!maxYear || date.getFullYear() <= maxYear));jQuery
	},jQuery
jQuery
	/* Provide the configuration settings for formatting/parsing. */jQuery
	_getFormatConfig: function(inst) {jQuery
		var shortYearCutoff = this._get(inst, "shortYearCutoff");jQuery
		shortYearCutoff = (typeof shortYearCutoff !== "string" ? shortYearCutoff :jQuery
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));jQuery
		return {shortYearCutoff: shortYearCutoff,jQuery
			dayNamesShort: this._get(inst, "dayNamesShort"), dayNames: this._get(inst, "dayNames"),jQuery
			monthNamesShort: this._get(inst, "monthNamesShort"), monthNames: this._get(inst, "monthNames")};jQuery
	},jQuery
jQuery
	/* Format the given date for display. */jQuery
	_formatDate: function(inst, day, month, year) {jQuery
		if (!day) {jQuery
			inst.currentDay = inst.selectedDay;jQuery
			inst.currentMonth = inst.selectedMonth;jQuery
			inst.currentYear = inst.selectedYear;jQuery
		}jQuery
		var date = (day ? (typeof day === "object" ? day :jQuery
			this._daylightSavingAdjust(new Date(year, month, day))) :jQuery
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));jQuery
		return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));jQuery
	}jQuery
});jQuery
jQuery
/*jQuery
 * Bind hover events for datepicker elements.jQuery
 * Done via delegate so the binding only occurs once in the lifetime of the parent div.jQuery
 * Global instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.jQuery
 */jQuery
function bindHover(dpDiv) {jQuery
	var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";jQuery
	return dpDiv.delegate(selector, "mouseout", function() {jQuery
			$(this).removeClass("ui-state-hover");jQuery
			if (this.className.indexOf("ui-datepicker-prev") !== -1) {jQuery
				$(this).removeClass("ui-datepicker-prev-hover");jQuery
			}jQuery
			if (this.className.indexOf("ui-datepicker-next") !== -1) {jQuery
				$(this).removeClass("ui-datepicker-next-hover");jQuery
			}jQuery
		})jQuery
		.delegate(selector, "mouseover", function(){jQuery
			if (!$.datepicker._isDisabledDatepicker( instActive.inline ? dpDiv.parent()[0] : instActive.input[0])) {jQuery
				$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");jQuery
				$(this).addClass("ui-state-hover");jQuery
				if (this.className.indexOf("ui-datepicker-prev") !== -1) {jQuery
					$(this).addClass("ui-datepicker-prev-hover");jQuery
				}jQuery
				if (this.className.indexOf("ui-datepicker-next") !== -1) {jQuery
					$(this).addClass("ui-datepicker-next-hover");jQuery
				}jQuery
			}jQuery
		});jQuery
}jQuery
jQuery
/* jQuery extend now ignores nulls! */jQuery
function extendRemove(target, props) {jQuery
	$.extend(target, props);jQuery
	for (var name in props) {jQuery
		if (props[name] == null) {jQuery
			target[name] = props[name];jQuery
		}jQuery
	}jQuery
	return target;jQuery
}jQuery
jQuery
/* Invoke the datepicker functionality.jQuery
   @param  options  string - a command, optionally followed by additional parameters orjQuery
					Object - settings for attaching new datepicker functionalityjQuery
   @return  jQuery object */jQuery
$.fn.datepicker = function(options){jQuery
jQuery
	/* Verify an empty collection wasn't passed - Fixes #6976 */jQuery
	if ( !this.length ) {jQuery
		return this;jQuery
	}jQuery
jQuery
	/* Initialise the date picker. */jQuery
	if (!$.datepicker.initialized) {jQuery
		$(document).mousedown($.datepicker._checkExternalClick);jQuery
		$.datepicker.initialized = true;jQuery
	}jQuery
jQuery
	/* Append datepicker main container to body if not exist. */jQuery
	if ($("#"+$.datepicker._mainDivId).length === 0) {jQuery
		$("body").append($.datepicker.dpDiv);jQuery
	}jQuery
jQuery
	var otherArgs = Array.prototype.slice.call(arguments, 1);jQuery
	if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")) {jQuery
		return $.datepicker["_" + options + "Datepicker"].jQuery
			apply($.datepicker, [this[0]].concat(otherArgs));jQuery
	}jQuery
	if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {jQuery
		return $.datepicker["_" + options + "Datepicker"].jQuery
			apply($.datepicker, [this[0]].concat(otherArgs));jQuery
	}jQuery
	return this.each(function() {jQuery
		typeof options === "string" ?jQuery
			$.datepicker["_" + options + "Datepicker"].jQuery
				apply($.datepicker, [this].concat(otherArgs)) :jQuery
			$.datepicker._attachDatepicker(this, options);jQuery
	});jQuery
};jQuery
jQuery
$.datepicker = new Datepicker(); // singleton instancejQuery
$.datepicker.initialized = false;jQuery
$.datepicker.uuid = new Date().getTime();jQuery
$.datepicker.version = "1.10.4";jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
var sizeRelatedOptions = {jQuery
		buttons: true,jQuery
		height: true,jQuery
		maxHeight: true,jQuery
		maxWidth: true,jQuery
		minHeight: true,jQuery
		minWidth: true,jQuery
		width: truejQuery
	},jQuery
	resizableRelatedOptions = {jQuery
		maxHeight: true,jQuery
		maxWidth: true,jQuery
		minHeight: true,jQuery
		minWidth: truejQuery
	};jQuery
jQuery
$.widget( "ui.dialog", {jQuery
	version: "1.10.4",jQuery
	options: {jQuery
		appendTo: "body",jQuery
		autoOpen: true,jQuery
		buttons: [],jQuery
		closeOnEscape: true,jQuery
		closeText: "close",jQuery
		dialogClass: "",jQuery
		draggable: true,jQuery
		hide: null,jQuery
		height: "auto",jQuery
		maxHeight: null,jQuery
		maxWidth: null,jQuery
		minHeight: 150,jQuery
		minWidth: 150,jQuery
		modal: false,jQuery
		position: {jQuery
			my: "center",jQuery
			at: "center",jQuery
			of: window,jQuery
			collision: "fit",jQuery
			// Ensure the titlebar is always visiblejQuery
			using: function( pos ) {jQuery
				var topOffset = $( this ).css( pos ).offset().top;jQuery
				if ( topOffset < 0 ) {jQuery
					$( this ).css( "top", pos.top - topOffset );jQuery
				}jQuery
			}jQuery
		},jQuery
		resizable: true,jQuery
		show: null,jQuery
		title: null,jQuery
		width: 300,jQuery
jQuery
		// callbacksjQuery
		beforeClose: null,jQuery
		close: null,jQuery
		drag: null,jQuery
		dragStart: null,jQuery
		dragStop: null,jQuery
		focus: null,jQuery
		open: null,jQuery
		resize: null,jQuery
		resizeStart: null,jQuery
		resizeStop: nulljQuery
	},jQuery
jQuery
	_create: function() {jQuery
		this.originalCss = {jQuery
			display: this.element[0].style.display,jQuery
			width: this.element[0].style.width,jQuery
			minHeight: this.element[0].style.minHeight,jQuery
			maxHeight: this.element[0].style.maxHeight,jQuery
			height: this.element[0].style.heightjQuery
		};jQuery
		this.originalPosition = {jQuery
			parent: this.element.parent(),jQuery
			index: this.element.parent().children().index( this.element )jQuery
		};jQuery
		this.originalTitle = this.element.attr("title");jQuery
		this.options.title = this.options.title || this.originalTitle;jQuery
jQuery
		this._createWrapper();jQuery
jQuery
		this.elementjQuery
			.show()jQuery
			.removeAttr("title")jQuery
			.addClass("ui-dialog-content ui-widget-content")jQuery
			.appendTo( this.uiDialog );jQuery
jQuery
		this._createTitlebar();jQuery
		this._createButtonPane();jQuery
jQuery
		if ( this.options.draggable && $.fn.draggable ) {jQuery
			this._makeDraggable();jQuery
		}jQuery
		if ( this.options.resizable && $.fn.resizable ) {jQuery
			this._makeResizable();jQuery
		}jQuery
jQuery
		this._isOpen = false;jQuery
	},jQuery
jQuery
	_init: function() {jQuery
		if ( this.options.autoOpen ) {jQuery
			this.open();jQuery
		}jQuery
	},jQuery
jQuery
	_appendTo: function() {jQuery
		var element = this.options.appendTo;jQuery
		if ( element && (element.jquery || element.nodeType) ) {jQuery
			return $( element );jQuery
		}jQuery
		return this.document.find( element || "body" ).eq( 0 );jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		var next,jQuery
			originalPosition = this.originalPosition;jQuery
jQuery
		this._destroyOverlay();jQuery
jQuery
		this.elementjQuery
			.removeUniqueId()jQuery
			.removeClass("ui-dialog-content ui-widget-content")jQuery
			.css( this.originalCss )jQuery
			// Without detaching first, the following becomes really slowjQuery
			.detach();jQuery
jQuery
		this.uiDialog.stop( true, true ).remove();jQuery
jQuery
		if ( this.originalTitle ) {jQuery
			this.element.attr( "title", this.originalTitle );jQuery
		}jQuery
jQuery
		next = originalPosition.parent.children().eq( originalPosition.index );jQuery
		// Don't try to place the dialog next to itself (#8613)jQuery
		if ( next.length && next[0] !== this.element[0] ) {jQuery
			next.before( this.element );jQuery
		} else {jQuery
			originalPosition.parent.append( this.element );jQuery
		}jQuery
	},jQuery
jQuery
	widget: function() {jQuery
		return this.uiDialog;jQuery
	},jQuery
jQuery
	disable: $.noop,jQuery
	enable: $.noop,jQuery
jQuery
	close: function( event ) {jQuery
		var activeElement,jQuery
			that = this;jQuery
jQuery
		if ( !this._isOpen || this._trigger( "beforeClose", event ) === false ) {jQuery
			return;jQuery
		}jQuery
jQuery
		this._isOpen = false;jQuery
		this._destroyOverlay();jQuery
jQuery
		if ( !this.opener.filter(":focusable").focus().length ) {jQuery
jQuery
			// support: IE9jQuery
			// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>jQuery
			try {jQuery
				activeElement = this.document[ 0 ].activeElement;jQuery
jQuery
				// Support: IE9, IE10jQuery
				// If the <body> is blurred, IE will switch windows, see #4520jQuery
				if ( activeElement && activeElement.nodeName.toLowerCase() !== "body" ) {jQuery
jQuery
					// Hiding a focused element doesn't trigger blur in WebKitjQuery
					// so in case we have nothing to focus on, explicitly blur the active elementjQuery
					// https://bugs.webkit.org/show_bug.cgi?id=47182jQuery
					$( activeElement ).blur();jQuery
				}jQuery
			} catch ( error ) {}jQuery
		}jQuery
jQuery
		this._hide( this.uiDialog, this.options.hide, function() {jQuery
			that._trigger( "close", event );jQuery
		});jQuery
	},jQuery
jQuery
	isOpen: function() {jQuery
		return this._isOpen;jQuery
	},jQuery
jQuery
	moveToTop: function() {jQuery
		this._moveToTop();jQuery
	},jQuery
jQuery
	_moveToTop: function( event, silent ) {jQuery
		var moved = !!this.uiDialog.nextAll(":visible").insertBefore( this.uiDialog ).length;jQuery
		if ( moved && !silent ) {jQuery
			this._trigger( "focus", event );jQuery
		}jQuery
		return moved;jQuery
	},jQuery
jQuery
	open: function() {jQuery
		var that = this;jQuery
		if ( this._isOpen ) {jQuery
			if ( this._moveToTop() ) {jQuery
				this._focusTabbable();jQuery
			}jQuery
			return;jQuery
		}jQuery
jQuery
		this._isOpen = true;jQuery
		this.opener = $( this.document[0].activeElement );jQuery
jQuery
		this._size();jQuery
		this._position();jQuery
		this._createOverlay();jQuery
		this._moveToTop( null, true );jQuery
		this._show( this.uiDialog, this.options.show, function() {jQuery
			that._focusTabbable();jQuery
			that._trigger("focus");jQuery
		});jQuery
jQuery
		this._trigger("open");jQuery
	},jQuery
jQuery
	_focusTabbable: function() {jQuery
		// Set focus to the first match:jQuery
		// 1. First element inside the dialog matching [autofocus]jQuery
		// 2. Tabbable element inside the content elementjQuery
		// 3. Tabbable element inside the buttonpanejQuery
		// 4. The close buttonjQuery
		// 5. The dialog itselfjQuery
		var hasFocus = this.element.find("[autofocus]");jQuery
		if ( !hasFocus.length ) {jQuery
			hasFocus = this.element.find(":tabbable");jQuery
		}jQuery
		if ( !hasFocus.length ) {jQuery
			hasFocus = this.uiDialogButtonPane.find(":tabbable");jQuery
		}jQuery
		if ( !hasFocus.length ) {jQuery
			hasFocus = this.uiDialogTitlebarClose.filter(":tabbable");jQuery
		}jQuery
		if ( !hasFocus.length ) {jQuery
			hasFocus = this.uiDialog;jQuery
		}jQuery
		hasFocus.eq( 0 ).focus();jQuery
	},jQuery
jQuery
	_keepFocus: function( event ) {jQuery
		function checkFocus() {jQuery
			var activeElement = this.document[0].activeElement,jQuery
				isActive = this.uiDialog[0] === activeElement ||jQuery
					$.contains( this.uiDialog[0], activeElement );jQuery
			if ( !isActive ) {jQuery
				this._focusTabbable();jQuery
			}jQuery
		}jQuery
		event.preventDefault();jQuery
		checkFocus.call( this );jQuery
		// support: IEjQuery
		// IE <= 8 doesn't prevent moving focus even with event.preventDefault()jQuery
		// so we check again laterjQuery
		this._delay( checkFocus );jQuery
	},jQuery
jQuery
	_createWrapper: function() {jQuery
		this.uiDialog = $("<div>")jQuery
			.addClass( "ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " +jQuery
				this.options.dialogClass )jQuery
			.hide()jQuery
			.attr({jQuery
				// Setting tabIndex makes the div focusablejQuery
				tabIndex: -1,jQuery
				role: "dialog"jQuery
			})jQuery
			.appendTo( this._appendTo() );jQuery
jQuery
		this._on( this.uiDialog, {jQuery
			keydown: function( event ) {jQuery
				if ( this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&jQuery
						event.keyCode === $.ui.keyCode.ESCAPE ) {jQuery
					event.preventDefault();jQuery
					this.close( event );jQuery
					return;jQuery
				}jQuery
jQuery
				// prevent tabbing out of dialogsjQuery
				if ( event.keyCode !== $.ui.keyCode.TAB ) {jQuery
					return;jQuery
				}jQuery
				var tabbables = this.uiDialog.find(":tabbable"),jQuery
					first = tabbables.filter(":first"),jQuery
					last  = tabbables.filter(":last");jQuery
jQuery
				if ( ( event.target === last[0] || event.target === this.uiDialog[0] ) && !event.shiftKey ) {jQuery
					first.focus( 1 );jQuery
					event.preventDefault();jQuery
				} else if ( ( event.target === first[0] || event.target === this.uiDialog[0] ) && event.shiftKey ) {jQuery
					last.focus( 1 );jQuery
					event.preventDefault();jQuery
				}jQuery
			},jQuery
			mousedown: function( event ) {jQuery
				if ( this._moveToTop( event ) ) {jQuery
					this._focusTabbable();jQuery
				}jQuery
			}jQuery
		});jQuery
jQuery
		// We assume that any existing aria-describedby attribute meansjQuery
		// that the dialog content is marked up properlyjQuery
		// otherwise we brute force the content as the descriptionjQuery
		if ( !this.element.find("[aria-describedby]").length ) {jQuery
			this.uiDialog.attr({jQuery
				"aria-describedby": this.element.uniqueId().attr("id")jQuery
			});jQuery
		}jQuery
	},jQuery
jQuery
	_createTitlebar: function() {jQuery
		var uiDialogTitle;jQuery
jQuery
		this.uiDialogTitlebar = $("<div>")jQuery
			.addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix")jQuery
			.prependTo( this.uiDialog );jQuery
		this._on( this.uiDialogTitlebar, {jQuery
			mousedown: function( event ) {jQuery
				// Don't prevent click on close button (#8838)jQuery
				// Focusing a dialog that is partially scrolled out of viewjQuery
				// causes the browser to scroll it into view, preventing the click eventjQuery
				if ( !$( event.target ).closest(".ui-dialog-titlebar-close") ) {jQuery
					// Dialog isn't getting focus when dragging (#8063)jQuery
					this.uiDialog.focus();jQuery
				}jQuery
			}jQuery
		});jQuery
jQuery
		// support: IEjQuery
		// Use type="button" to prevent enter keypresses in textboxes from closing thejQuery
		// dialog in IE (#9312)jQuery
		this.uiDialogTitlebarClose = $( "<button type='button'></button>" )jQuery
			.button({jQuery
				label: this.options.closeText,jQuery
				icons: {jQuery
					primary: "ui-icon-closethick"jQuery
				},jQuery
				text: falsejQuery
			})jQuery
			.addClass("ui-dialog-titlebar-close")jQuery
			.appendTo( this.uiDialogTitlebar );jQuery
		this._on( this.uiDialogTitlebarClose, {jQuery
			click: function( event ) {jQuery
				event.preventDefault();jQuery
				this.close( event );jQuery
			}jQuery
		});jQuery
jQuery
		uiDialogTitle = $("<span>")jQuery
			.uniqueId()jQuery
			.addClass("ui-dialog-title")jQuery
			.prependTo( this.uiDialogTitlebar );jQuery
		this._title( uiDialogTitle );jQuery
jQuery
		this.uiDialog.attr({jQuery
			"aria-labelledby": uiDialogTitle.attr("id")jQuery
		});jQuery
	},jQuery
jQuery
	_title: function( title ) {jQuery
		if ( !this.options.title ) {jQuery
			title.html("&#160;");jQuery
		}jQuery
		title.text( this.options.title );jQuery
	},jQuery
jQuery
	_createButtonPane: function() {jQuery
		this.uiDialogButtonPane = $("<div>")jQuery
			.addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");jQuery
jQuery
		this.uiButtonSet = $("<div>")jQuery
			.addClass("ui-dialog-buttonset")jQuery
			.appendTo( this.uiDialogButtonPane );jQuery
jQuery
		this._createButtons();jQuery
	},jQuery
jQuery
	_createButtons: function() {jQuery
		var that = this,jQuery
			buttons = this.options.buttons;jQuery
jQuery
		// if we already have a button pane, remove itjQuery
		this.uiDialogButtonPane.remove();jQuery
		this.uiButtonSet.empty();jQuery
jQuery
		if ( $.isEmptyObject( buttons ) || ($.isArray( buttons ) && !buttons.length) ) {jQuery
			this.uiDialog.removeClass("ui-dialog-buttons");jQuery
			return;jQuery
		}jQuery
jQuery
		$.each( buttons, function( name, props ) {jQuery
			var click, buttonOptions;jQuery
			props = $.isFunction( props ) ?jQuery
				{ click: props, text: name } :jQuery
				props;jQuery
			// Default to a non-submitting buttonjQuery
			props = $.extend( { type: "button" }, props );jQuery
			// Change the context for the click callback to be the main elementjQuery
			click = props.click;jQuery
			props.click = function() {jQuery
				click.apply( that.element[0], arguments );jQuery
			};jQuery
			buttonOptions = {jQuery
				icons: props.icons,jQuery
				text: props.showTextjQuery
			};jQuery
			delete props.icons;jQuery
			delete props.showText;jQuery
			$( "<button></button>", props )jQuery
				.button( buttonOptions )jQuery
				.appendTo( that.uiButtonSet );jQuery
		});jQuery
		this.uiDialog.addClass("ui-dialog-buttons");jQuery
		this.uiDialogButtonPane.appendTo( this.uiDialog );jQuery
	},jQuery
jQuery
	_makeDraggable: function() {jQuery
		var that = this,jQuery
			options = this.options;jQuery
jQuery
		function filteredUi( ui ) {jQuery
			return {jQuery
				position: ui.position,jQuery
				offset: ui.offsetjQuery
			};jQuery
		}jQuery
jQuery
		this.uiDialog.draggable({jQuery
			cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",jQuery
			handle: ".ui-dialog-titlebar",jQuery
			containment: "document",jQuery
			start: function( event, ui ) {jQuery
				$( this ).addClass("ui-dialog-dragging");jQuery
				that._blockFrames();jQuery
				that._trigger( "dragStart", event, filteredUi( ui ) );jQuery
			},jQuery
			drag: function( event, ui ) {jQuery
				that._trigger( "drag", event, filteredUi( ui ) );jQuery
			},jQuery
			stop: function( event, ui ) {jQuery
				options.position = [jQuery
					ui.position.left - that.document.scrollLeft(),jQuery
					ui.position.top - that.document.scrollTop()jQuery
				];jQuery
				$( this ).removeClass("ui-dialog-dragging");jQuery
				that._unblockFrames();jQuery
				that._trigger( "dragStop", event, filteredUi( ui ) );jQuery
			}jQuery
		});jQuery
	},jQuery
jQuery
	_makeResizable: function() {jQuery
		var that = this,jQuery
			options = this.options,jQuery
			handles = options.resizable,jQuery
			// .ui-resizable has position: relative defined in the stylesheetjQuery
			// but dialogs have to use absolute or fixed positioningjQuery
			position = this.uiDialog.css("position"),jQuery
			resizeHandles = typeof handles === "string" ?jQuery
				handles	:jQuery
				"n,e,s,w,se,sw,ne,nw";jQuery
jQuery
		function filteredUi( ui ) {jQuery
			return {jQuery
				originalPosition: ui.originalPosition,jQuery
				originalSize: ui.originalSize,jQuery
				position: ui.position,jQuery
				size: ui.sizejQuery
			};jQuery
		}jQuery
jQuery
		this.uiDialog.resizable({jQuery
			cancel: ".ui-dialog-content",jQuery
			containment: "document",jQuery
			alsoResize: this.element,jQuery
			maxWidth: options.maxWidth,jQuery
			maxHeight: options.maxHeight,jQuery
			minWidth: options.minWidth,jQuery
			minHeight: this._minHeight(),jQuery
			handles: resizeHandles,jQuery
			start: function( event, ui ) {jQuery
				$( this ).addClass("ui-dialog-resizing");jQuery
				that._blockFrames();jQuery
				that._trigger( "resizeStart", event, filteredUi( ui ) );jQuery
			},jQuery
			resize: function( event, ui ) {jQuery
				that._trigger( "resize", event, filteredUi( ui ) );jQuery
			},jQuery
			stop: function( event, ui ) {jQuery
				options.height = $( this ).height();jQuery
				options.width = $( this ).width();jQuery
				$( this ).removeClass("ui-dialog-resizing");jQuery
				that._unblockFrames();jQuery
				that._trigger( "resizeStop", event, filteredUi( ui ) );jQuery
			}jQuery
		})jQuery
		.css( "position", position );jQuery
	},jQuery
jQuery
	_minHeight: function() {jQuery
		var options = this.options;jQuery
jQuery
		return options.height === "auto" ?jQuery
			options.minHeight :jQuery
			Math.min( options.minHeight, options.height );jQuery
	},jQuery
jQuery
	_position: function() {jQuery
		// Need to show the dialog to get the actual offset in the position pluginjQuery
		var isVisible = this.uiDialog.is(":visible");jQuery
		if ( !isVisible ) {jQuery
			this.uiDialog.show();jQuery
		}jQuery
		this.uiDialog.position( this.options.position );jQuery
		if ( !isVisible ) {jQuery
			this.uiDialog.hide();jQuery
		}jQuery
	},jQuery
jQuery
	_setOptions: function( options ) {jQuery
		var that = this,jQuery
			resize = false,jQuery
			resizableOptions = {};jQuery
jQuery
		$.each( options, function( key, value ) {jQuery
			that._setOption( key, value );jQuery
jQuery
			if ( key in sizeRelatedOptions ) {jQuery
				resize = true;jQuery
			}jQuery
			if ( key in resizableRelatedOptions ) {jQuery
				resizableOptions[ key ] = value;jQuery
			}jQuery
		});jQuery
jQuery
		if ( resize ) {jQuery
			this._size();jQuery
			this._position();jQuery
		}jQuery
		if ( this.uiDialog.is(":data(ui-resizable)") ) {jQuery
			this.uiDialog.resizable( "option", resizableOptions );jQuery
		}jQuery
	},jQuery
jQuery
	_setOption: function( key, value ) {jQuery
		var isDraggable, isResizable,jQuery
			uiDialog = this.uiDialog;jQuery
jQuery
		if ( key === "dialogClass" ) {jQuery
			uiDialogjQuery
				.removeClass( this.options.dialogClass )jQuery
				.addClass( value );jQuery
		}jQuery
jQuery
		if ( key === "disabled" ) {jQuery
			return;jQuery
		}jQuery
jQuery
		this._super( key, value );jQuery
jQuery
		if ( key === "appendTo" ) {jQuery
			this.uiDialog.appendTo( this._appendTo() );jQuery
		}jQuery
jQuery
		if ( key === "buttons" ) {jQuery
			this._createButtons();jQuery
		}jQuery
jQuery
		if ( key === "closeText" ) {jQuery
			this.uiDialogTitlebarClose.button({jQuery
				// Ensure that we always pass a stringjQuery
				label: "" + valuejQuery
			});jQuery
		}jQuery
jQuery
		if ( key === "draggable" ) {jQuery
			isDraggable = uiDialog.is(":data(ui-draggable)");jQuery
			if ( isDraggable && !value ) {jQuery
				uiDialog.draggable("destroy");jQuery
			}jQuery
jQuery
			if ( !isDraggable && value ) {jQuery
				this._makeDraggable();jQuery
			}jQuery
		}jQuery
jQuery
		if ( key === "position" ) {jQuery
			this._position();jQuery
		}jQuery
jQuery
		if ( key === "resizable" ) {jQuery
			// currently resizable, becoming non-resizablejQuery
			isResizable = uiDialog.is(":data(ui-resizable)");jQuery
			if ( isResizable && !value ) {jQuery
				uiDialog.resizable("destroy");jQuery
			}jQuery
jQuery
			// currently resizable, changing handlesjQuery
			if ( isResizable && typeof value === "string" ) {jQuery
				uiDialog.resizable( "option", "handles", value );jQuery
			}jQuery
jQuery
			// currently non-resizable, becoming resizablejQuery
			if ( !isResizable && value !== false ) {jQuery
				this._makeResizable();jQuery
			}jQuery
		}jQuery
jQuery
		if ( key === "title" ) {jQuery
			this._title( this.uiDialogTitlebar.find(".ui-dialog-title") );jQuery
		}jQuery
	},jQuery
jQuery
	_size: function() {jQuery
		// If the user has resized the dialog, the .ui-dialog and .ui-dialog-contentjQuery
		// divs will both have width and height set, so we need to reset themjQuery
		var nonContentHeight, minContentHeight, maxContentHeight,jQuery
			options = this.options;jQuery
jQuery
		// Reset content sizingjQuery
		this.element.show().css({jQuery
			width: "auto",jQuery
			minHeight: 0,jQuery
			maxHeight: "none",jQuery
			height: 0jQuery
		});jQuery
jQuery
		if ( options.minWidth > options.width ) {jQuery
			options.width = options.minWidth;jQuery
		}jQuery
jQuery
		// reset wrapper sizingjQuery
		// determine the height of all the non-content elementsjQuery
		nonContentHeight = this.uiDialog.css({jQuery
				height: "auto",jQuery
				width: options.widthjQuery
			})jQuery
			.outerHeight();jQuery
		minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );jQuery
		maxContentHeight = typeof options.maxHeight === "number" ?jQuery
			Math.max( 0, options.maxHeight - nonContentHeight ) :jQuery
			"none";jQuery
jQuery
		if ( options.height === "auto" ) {jQuery
			this.element.css({jQuery
				minHeight: minContentHeight,jQuery
				maxHeight: maxContentHeight,jQuery
				height: "auto"jQuery
			});jQuery
		} else {jQuery
			this.element.height( Math.max( 0, options.height - nonContentHeight ) );jQuery
		}jQuery
jQuery
		if (this.uiDialog.is(":data(ui-resizable)") ) {jQuery
			this.uiDialog.resizable( "option", "minHeight", this._minHeight() );jQuery
		}jQuery
	},jQuery
jQuery
	_blockFrames: function() {jQuery
		this.iframeBlocks = this.document.find( "iframe" ).map(function() {jQuery
			var iframe = $( this );jQuery
jQuery
			return $( "<div>" )jQuery
				.css({jQuery
					position: "absolute",jQuery
					width: iframe.outerWidth(),jQuery
					height: iframe.outerHeight()jQuery
				})jQuery
				.appendTo( iframe.parent() )jQuery
				.offset( iframe.offset() )[0];jQuery
		});jQuery
	},jQuery
jQuery
	_unblockFrames: function() {jQuery
		if ( this.iframeBlocks ) {jQuery
			this.iframeBlocks.remove();jQuery
			delete this.iframeBlocks;jQuery
		}jQuery
	},jQuery
jQuery
	_allowInteraction: function( event ) {jQuery
		if ( $( event.target ).closest(".ui-dialog").length ) {jQuery
			return true;jQuery
		}jQuery
jQuery
		// TODO: Remove hack when datepicker implementsjQuery
		// the .ui-front logic (#8989)jQuery
		return !!$( event.target ).closest(".ui-datepicker").length;jQuery
	},jQuery
jQuery
	_createOverlay: function() {jQuery
		if ( !this.options.modal ) {jQuery
			return;jQuery
		}jQuery
jQuery
		var that = this,jQuery
			widgetFullName = this.widgetFullName;jQuery
		if ( !$.ui.dialog.overlayInstances ) {jQuery
			// Prevent use of anchors and inputs.jQuery
			// We use a delay in case the overlay is created from anjQuery
			// event that we're going to be cancelling. (#2804)jQuery
			this._delay(function() {jQuery
				// Handle .dialog().dialog("close") (#4065)jQuery
				if ( $.ui.dialog.overlayInstances ) {jQuery
					this.document.bind( "focusin.dialog", function( event ) {jQuery
						if ( !that._allowInteraction( event ) ) {jQuery
							event.preventDefault();jQuery
							$(".ui-dialog:visible:last .ui-dialog-content")jQuery
								.data( widgetFullName )._focusTabbable();jQuery
						}jQuery
					});jQuery
				}jQuery
			});jQuery
		}jQuery
jQuery
		this.overlay = $("<div>")jQuery
			.addClass("ui-widget-overlay ui-front")jQuery
			.appendTo( this._appendTo() );jQuery
		this._on( this.overlay, {jQuery
			mousedown: "_keepFocus"jQuery
		});jQuery
		$.ui.dialog.overlayInstances++;jQuery
	},jQuery
jQuery
	_destroyOverlay: function() {jQuery
		if ( !this.options.modal ) {jQuery
			return;jQuery
		}jQuery
jQuery
		if ( this.overlay ) {jQuery
			$.ui.dialog.overlayInstances--;jQuery
jQuery
			if ( !$.ui.dialog.overlayInstances ) {jQuery
				this.document.unbind( "focusin.dialog" );jQuery
			}jQuery
			this.overlay.remove();jQuery
			this.overlay = null;jQuery
		}jQuery
	}jQuery
});jQuery
jQuery
$.ui.dialog.overlayInstances = 0;jQuery
jQuery
// DEPRECATEDjQuery
if ( $.uiBackCompat !== false ) {jQuery
	// position option with array notationjQuery
	// just override with old implementationjQuery
	$.widget( "ui.dialog", $.ui.dialog, {jQuery
		_position: function() {jQuery
			var position = this.options.position,jQuery
				myAt = [],jQuery
				offset = [ 0, 0 ],jQuery
				isVisible;jQuery
jQuery
			if ( position ) {jQuery
				if ( typeof position === "string" || (typeof position === "object" && "0" in position ) ) {jQuery
					myAt = position.split ? position.split(" ") : [ position[0], position[1] ];jQuery
					if ( myAt.length === 1 ) {jQuery
						myAt[1] = myAt[0];jQuery
					}jQuery
jQuery
					$.each( [ "left", "top" ], function( i, offsetPosition ) {jQuery
						if ( +myAt[ i ] === myAt[ i ] ) {jQuery
							offset[ i ] = myAt[ i ];jQuery
							myAt[ i ] = offsetPosition;jQuery
						}jQuery
					});jQuery
jQuery
					position = {jQuery
						my: myAt[0] + (offset[0] < 0 ? offset[0] : "+" + offset[0]) + " " +jQuery
							myAt[1] + (offset[1] < 0 ? offset[1] : "+" + offset[1]),jQuery
						at: myAt.join(" ")jQuery
					};jQuery
				}jQuery
jQuery
				position = $.extend( {}, $.ui.dialog.prototype.options.position, position );jQuery
			} else {jQuery
				position = $.ui.dialog.prototype.options.position;jQuery
			}jQuery
jQuery
			// need to show the dialog to get the actual offset in the position pluginjQuery
			isVisible = this.uiDialog.is(":visible");jQuery
			if ( !isVisible ) {jQuery
				this.uiDialog.show();jQuery
			}jQuery
			this.uiDialog.position( position );jQuery
			if ( !isVisible ) {jQuery
				this.uiDialog.hide();jQuery
			}jQuery
		}jQuery
	});jQuery
}jQuery
jQuery
}( jQuery ) );jQuery
(function( $, undefined ) {jQuery
jQuery
$.widget("ui.draggable", $.ui.mouse, {jQuery
	version: "1.10.4",jQuery
	widgetEventPrefix: "drag",jQuery
	options: {jQuery
		addClasses: true,jQuery
		appendTo: "parent",jQuery
		axis: false,jQuery
		connectToSortable: false,jQuery
		containment: false,jQuery
		cursor: "auto",jQuery
		cursorAt: false,jQuery
		grid: false,jQuery
		handle: false,jQuery
		helper: "original",jQuery
		iframeFix: false,jQuery
		opacity: false,jQuery
		refreshPositions: false,jQuery
		revert: false,jQuery
		revertDuration: 500,jQuery
		scope: "default",jQuery
		scroll: true,jQuery
		scrollSensitivity: 20,jQuery
		scrollSpeed: 20,jQuery
		snap: false,jQuery
		snapMode: "both",jQuery
		snapTolerance: 20,jQuery
		stack: false,jQuery
		zIndex: false,jQuery
jQuery
		// callbacksjQuery
		drag: null,jQuery
		start: null,jQuery
		stop: nulljQuery
	},jQuery
	_create: function() {jQuery
jQuery
		if (this.options.helper === "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {jQuery
			this.element[0].style.position = "relative";jQuery
		}jQuery
		if (this.options.addClasses){jQuery
			this.element.addClass("ui-draggable");jQuery
		}jQuery
		if (this.options.disabled){jQuery
			this.element.addClass("ui-draggable-disabled");jQuery
		}jQuery
jQuery
		this._mouseInit();jQuery
jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		this.element.removeClass( "ui-draggable ui-draggable-dragging ui-draggable-disabled" );jQuery
		this._mouseDestroy();jQuery
	},jQuery
jQuery
	_mouseCapture: function(event) {jQuery
jQuery
		var o = this.options;jQuery
jQuery
		// among others, prevent a drag on a resizable-handlejQuery
		if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {jQuery
			return false;jQuery
		}jQuery
jQuery
		//Quit if we're not on a valid handlejQuery
		this.handle = this._getHandle(event);jQuery
		if (!this.handle) {jQuery
			return false;jQuery
		}jQuery
jQuery
		$(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {jQuery
			$("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>")jQuery
			.css({jQuery
				width: this.offsetWidth+"px", height: this.offsetHeight+"px",jQuery
				position: "absolute", opacity: "0.001", zIndex: 1000jQuery
			})jQuery
			.css($(this).offset())jQuery
			.appendTo("body");jQuery
		});jQuery
jQuery
		return true;jQuery
jQuery
	},jQuery
jQuery
	_mouseStart: function(event) {jQuery
jQuery
		var o = this.options;jQuery
jQuery
		//Create and append the visible helperjQuery
		this.helper = this._createHelper(event);jQuery
jQuery
		this.helper.addClass("ui-draggable-dragging");jQuery
jQuery
		//Cache the helper sizejQuery
		this._cacheHelperProportions();jQuery
jQuery
		//If ddmanager is used for droppables, set the global draggablejQuery
		if($.ui.ddmanager) {jQuery
			$.ui.ddmanager.current = this;jQuery
		}jQuery
jQuery
		/*jQuery
		 * - Position generation -jQuery
		 * This block generates everything position related - it's the core of draggables.jQuery
		 */jQuery
jQuery
		//Cache the margins of the original elementjQuery
		this._cacheMargins();jQuery
jQuery
		//Store the helper's css positionjQuery
		this.cssPosition = this.helper.css( "position" );jQuery
		this.scrollParent = this.helper.scrollParent();jQuery
		this.offsetParent = this.helper.offsetParent();jQuery
		this.offsetParentCssPosition = this.offsetParent.css( "position" );jQuery
jQuery
		//The element's absolute position on the page minus marginsjQuery
		this.offset = this.positionAbs = this.element.offset();jQuery
		this.offset = {jQuery
			top: this.offset.top - this.margins.top,jQuery
			left: this.offset.left - this.margins.leftjQuery
		};jQuery
jQuery
		//Reset scroll cachejQuery
		this.offset.scroll = false;jQuery
jQuery
		$.extend(this.offset, {jQuery
			click: { //Where the click happened, relative to the elementjQuery
				left: event.pageX - this.offset.left,jQuery
				top: event.pageY - this.offset.topjQuery
			},jQuery
			parent: this._getParentOffset(),jQuery
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helperjQuery
		});jQuery
jQuery
		//Generate the original positionjQuery
		this.originalPosition = this.position = this._generatePosition(event);jQuery
		this.originalPageX = event.pageX;jQuery
		this.originalPageY = event.pageY;jQuery
jQuery
		//Adjust the mouse offset relative to the helper if "cursorAt" is suppliedjQuery
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));jQuery
jQuery
		//Set a containment if given in the optionsjQuery
		this._setContainment();jQuery
jQuery
		//Trigger event + callbacksjQuery
		if(this._trigger("start", event) === false) {jQuery
			this._clear();jQuery
			return false;jQuery
		}jQuery
jQuery
		//Recache the helper sizejQuery
		this._cacheHelperProportions();jQuery
jQuery
		//Prepare the droppable offsetsjQuery
		if ($.ui.ddmanager && !o.dropBehaviour) {jQuery
			$.ui.ddmanager.prepareOffsets(this, event);jQuery
		}jQuery
jQuery
jQuery
		this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct positionjQuery
jQuery
		//If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)jQuery
		if ( $.ui.ddmanager ) {jQuery
			$.ui.ddmanager.dragStart(this, event);jQuery
		}jQuery
jQuery
		return true;jQuery
	},jQuery
jQuery
	_mouseDrag: function(event, noPropagation) {jQuery
		// reset any necessary cached properties (see #5009)jQuery
		if ( this.offsetParentCssPosition === "fixed" ) {jQuery
			this.offset.parent = this._getParentOffset();jQuery
		}jQuery
jQuery
		//Compute the helpers positionjQuery
		this.position = this._generatePosition(event);jQuery
		this.positionAbs = this._convertPositionTo("absolute");jQuery
jQuery
		//Call plugins and callbacks and use the resulting position if something is returnedjQuery
		if (!noPropagation) {jQuery
			var ui = this._uiHash();jQuery
			if(this._trigger("drag", event, ui) === false) {jQuery
				this._mouseUp({});jQuery
				return false;jQuery
			}jQuery
			this.position = ui.position;jQuery
		}jQuery
jQuery
		if(!this.options.axis || this.options.axis !== "y") {jQuery
			this.helper[0].style.left = this.position.left+"px";jQuery
		}jQuery
		if(!this.options.axis || this.options.axis !== "x") {jQuery
			this.helper[0].style.top = this.position.top+"px";jQuery
		}jQuery
		if($.ui.ddmanager) {jQuery
			$.ui.ddmanager.drag(this, event);jQuery
		}jQuery
jQuery
		return false;jQuery
	},jQuery
jQuery
	_mouseStop: function(event) {jQuery
jQuery
		//If we are using droppables, inform the manager about the dropjQuery
		var that = this,jQuery
			dropped = false;jQuery
		if ($.ui.ddmanager && !this.options.dropBehaviour) {jQuery
			dropped = $.ui.ddmanager.drop(this, event);jQuery
		}jQuery
jQuery
		//if a drop comes from outside (a sortable)jQuery
		if(this.dropped) {jQuery
			dropped = this.dropped;jQuery
			this.dropped = false;jQuery
		}jQuery
jQuery
		//if the original element is no longer in the DOM don't bother to continue (see #8269)jQuery
		if ( this.options.helper === "original" && !$.contains( this.element[ 0 ].ownerDocument, this.element[ 0 ] ) ) {jQuery
			return false;jQuery
		}jQuery
jQuery
		if((this.options.revert === "invalid" && !dropped) || (this.options.revert === "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {jQuery
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {jQuery
				if(that._trigger("stop", event) !== false) {jQuery
					that._clear();jQuery
				}jQuery
			});jQuery
		} else {jQuery
			if(this._trigger("stop", event) !== false) {jQuery
				this._clear();jQuery
			}jQuery
		}jQuery
jQuery
		return false;jQuery
	},jQuery
jQuery
	_mouseUp: function(event) {jQuery
		//Remove frame helpersjQuery
		$("div.ui-draggable-iframeFix").each(function() {jQuery
			this.parentNode.removeChild(this);jQuery
		});jQuery
jQuery
		//If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)jQuery
		if( $.ui.ddmanager ) {jQuery
			$.ui.ddmanager.dragStop(this, event);jQuery
		}jQuery
jQuery
		return $.ui.mouse.prototype._mouseUp.call(this, event);jQuery
	},jQuery
jQuery
	cancel: function() {jQuery
jQuery
		if(this.helper.is(".ui-draggable-dragging")) {jQuery
			this._mouseUp({});jQuery
		} else {jQuery
			this._clear();jQuery
		}jQuery
jQuery
		return this;jQuery
jQuery
	},jQuery
jQuery
	_getHandle: function(event) {jQuery
		return this.options.handle ?jQuery
			!!$( event.target ).closest( this.element.find( this.options.handle ) ).length :jQuery
			true;jQuery
	},jQuery
jQuery
	_createHelper: function(event) {jQuery
jQuery
		var o = this.options,jQuery
			helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : (o.helper === "clone" ? this.element.clone().removeAttr("id") : this.element);jQuery
jQuery
		if(!helper.parents("body").length) {jQuery
			helper.appendTo((o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo));jQuery
		}jQuery
jQuery
		if(helper[0] !== this.element[0] && !(/(fixed|absolute)/).test(helper.css("position"))) {jQuery
			helper.css("position", "absolute");jQuery
		}jQuery
jQuery
		return helper;jQuery
jQuery
	},jQuery
jQuery
	_adjustOffsetFromHelper: function(obj) {jQuery
		if (typeof obj === "string") {jQuery
			obj = obj.split(" ");jQuery
		}jQuery
		if ($.isArray(obj)) {jQuery
			obj = {left: +obj[0], top: +obj[1] || 0};jQuery
		}jQuery
		if ("left" in obj) {jQuery
			this.offset.click.left = obj.left + this.margins.left;jQuery
		}jQuery
		if ("right" in obj) {jQuery
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;jQuery
		}jQuery
		if ("top" in obj) {jQuery
			this.offset.click.top = obj.top + this.margins.top;jQuery
		}jQuery
		if ("bottom" in obj) {jQuery
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;jQuery
		}jQuery
	},jQuery
jQuery
	_getParentOffset: function() {jQuery
jQuery
		//Get the offsetParent and cache its positionjQuery
		var po = this.offsetParent.offset();jQuery
jQuery
		// This is a special case where we need to modify a offset calculated on start, since the following happened:jQuery
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parentjQuery
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means thatjQuery
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon dragjQuery
		if(this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {jQuery
			po.left += this.scrollParent.scrollLeft();jQuery
			po.top += this.scrollParent.scrollTop();jQuery
		}jQuery
jQuery
		//This needs to be actually done for all browsers, since pageX/pageY includes this informationjQuery
		//Ugly IE fixjQuery
		if((this.offsetParent[0] === document.body) ||jQuery
			(this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie)) {jQuery
			po = { top: 0, left: 0 };jQuery
		}jQuery
jQuery
		return {jQuery
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),jQuery
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)jQuery
		};jQuery
jQuery
	},jQuery
jQuery
	_getRelativeOffset: function() {jQuery
jQuery
		if(this.cssPosition === "relative") {jQuery
			var p = this.element.position();jQuery
			return {jQuery
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),jQuery
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()jQuery
			};jQuery
		} else {jQuery
			return { top: 0, left: 0 };jQuery
		}jQuery
jQuery
	},jQuery
jQuery
	_cacheMargins: function() {jQuery
		this.margins = {jQuery
			left: (parseInt(this.element.css("marginLeft"),10) || 0),jQuery
			top: (parseInt(this.element.css("marginTop"),10) || 0),jQuery
			right: (parseInt(this.element.css("marginRight"),10) || 0),jQuery
			bottom: (parseInt(this.element.css("marginBottom"),10) || 0)jQuery
		};jQuery
	},jQuery
jQuery
	_cacheHelperProportions: function() {jQuery
		this.helperProportions = {jQuery
			width: this.helper.outerWidth(),jQuery
			height: this.helper.outerHeight()jQuery
		};jQuery
	},jQuery
jQuery
	_setContainment: function() {jQuery
jQuery
		var over, c, ce,jQuery
			o = this.options;jQuery
jQuery
		if ( !o.containment ) {jQuery
			this.containment = null;jQuery
			return;jQuery
		}jQuery
jQuery
		if ( o.containment === "window" ) {jQuery
			this.containment = [jQuery
				$( window ).scrollLeft() - this.offset.relative.left - this.offset.parent.left,jQuery
				$( window ).scrollTop() - this.offset.relative.top - this.offset.parent.top,jQuery
				$( window ).scrollLeft() + $( window ).width() - this.helperProportions.width - this.margins.left,jQuery
				$( window ).scrollTop() + ( $( window ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.topjQuery
			];jQuery
			return;jQuery
		}jQuery
jQuery
		if ( o.containment === "document") {jQuery
			this.containment = [jQuery
				0,jQuery
				0,jQuery
				$( document ).width() - this.helperProportions.width - this.margins.left,jQuery
				( $( document ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.topjQuery
			];jQuery
			return;jQuery
		}jQuery
jQuery
		if ( o.containment.constructor === Array ) {jQuery
			this.containment = o.containment;jQuery
			return;jQuery
		}jQuery
jQuery
		if ( o.containment === "parent" ) {jQuery
			o.containment = this.helper[ 0 ].parentNode;jQuery
		}jQuery
jQuery
		c = $( o.containment );jQuery
		ce = c[ 0 ];jQuery
jQuery
		if( !ce ) {jQuery
			return;jQuery
		}jQuery
jQuery
		over = c.css( "overflow" ) !== "hidden";jQuery
jQuery
		this.containment = [jQuery
			( parseInt( c.css( "borderLeftWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingLeft" ), 10 ) || 0 ),jQuery
			( parseInt( c.css( "borderTopWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingTop" ), 10 ) || 0 ) ,jQuery
			( over ? Math.max( ce.scrollWidth, ce.offsetWidth ) : ce.offsetWidth ) - ( parseInt( c.css( "borderRightWidth" ), 10 ) || 0 ) - ( parseInt( c.css( "paddingRight" ), 10 ) || 0 ) - this.helperProportions.width - this.margins.left - this.margins.right,jQuery
			( over ? Math.max( ce.scrollHeight, ce.offsetHeight ) : ce.offsetHeight ) - ( parseInt( c.css( "borderBottomWidth" ), 10 ) || 0 ) - ( parseInt( c.css( "paddingBottom" ), 10 ) || 0 ) - this.helperProportions.height - this.margins.top  - this.margins.bottomjQuery
		];jQuery
		this.relative_container = c;jQuery
	},jQuery
jQuery
	_convertPositionTo: function(d, pos) {jQuery
jQuery
		if(!pos) {jQuery
			pos = this.position;jQuery
		}jQuery
jQuery
		var mod = d === "absolute" ? 1 : -1,jQuery
			scroll = this.cssPosition === "absolute" && !( this.scrollParent[ 0 ] !== document && $.contains( this.scrollParent[ 0 ], this.offsetParent[ 0 ] ) ) ? this.offsetParent : this.scrollParent;jQuery
jQuery
		//Cache the scrolljQuery
		if (!this.offset.scroll) {jQuery
			this.offset.scroll = {top : scroll.scrollTop(), left : scroll.scrollLeft()};jQuery
		}jQuery
jQuery
		return {jQuery
			top: (jQuery
				pos.top	+																// The absolute mouse positionjQuery
				this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parentjQuery
				this.offset.parent.top * mod -										// The offsetParent's offset without borders (offset + border)jQuery
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : this.offset.scroll.top ) * mod )jQuery
			),jQuery
			left: (jQuery
				pos.left +																// The absolute mouse positionjQuery
				this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parentjQuery
				this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)jQuery
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : this.offset.scroll.left ) * mod )jQuery
			)jQuery
		};jQuery
jQuery
	},jQuery
jQuery
	_generatePosition: function(event) {jQuery
jQuery
		var containment, co, top, left,jQuery
			o = this.options,jQuery
			scroll = this.cssPosition === "absolute" && !( this.scrollParent[ 0 ] !== document && $.contains( this.scrollParent[ 0 ], this.offsetParent[ 0 ] ) ) ? this.offsetParent : this.scrollParent,jQuery
			pageX = event.pageX,jQuery
			pageY = event.pageY;jQuery
jQuery
		//Cache the scrolljQuery
		if (!this.offset.scroll) {jQuery
			this.offset.scroll = {top : scroll.scrollTop(), left : scroll.scrollLeft()};jQuery
		}jQuery
jQuery
		/*jQuery
		 * - Position constraining -jQuery
		 * Constrain the position to a mix of grid, containment.jQuery
		 */jQuery
jQuery
		// If we are not dragging yet, we won't check for optionsjQuery
		if ( this.originalPosition ) {jQuery
			if ( this.containment ) {jQuery
				if ( this.relative_container ){jQuery
					co = this.relative_container.offset();jQuery
					containment = [jQuery
						this.containment[ 0 ] + co.left,jQuery
						this.containment[ 1 ] + co.top,jQuery
						this.containment[ 2 ] + co.left,jQuery
						this.containment[ 3 ] + co.topjQuery
					];jQuery
				}jQuery
				else {jQuery
					containment = this.containment;jQuery
				}jQuery
jQuery
				if(event.pageX - this.offset.click.left < containment[0]) {jQuery
					pageX = containment[0] + this.offset.click.left;jQuery
				}jQuery
				if(event.pageY - this.offset.click.top < containment[1]) {jQuery
					pageY = containment[1] + this.offset.click.top;jQuery
				}jQuery
				if(event.pageX - this.offset.click.left > containment[2]) {jQuery
					pageX = containment[2] + this.offset.click.left;jQuery
				}jQuery
				if(event.pageY - this.offset.click.top > containment[3]) {jQuery
					pageY = containment[3] + this.offset.click.top;jQuery
				}jQuery
			}jQuery
jQuery
			if(o.grid) {jQuery
				//Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)jQuery
				top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;jQuery
				pageY = containment ? ((top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3]) ? top : ((top - this.offset.click.top >= containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;jQuery
jQuery
				left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;jQuery
				pageX = containment ? ((left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2]) ? left : ((left - this.offset.click.left >= containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;jQuery
			}jQuery
jQuery
		}jQuery
jQuery
		return {jQuery
			top: (jQuery
				pageY -																	// The absolute mouse positionjQuery
				this.offset.click.top	-												// Click offset (relative to the element)jQuery
				this.offset.relative.top -												// Only for relative positioned nodes: Relative offset from element to offset parentjQuery
				this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)jQuery
				( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : this.offset.scroll.top )jQuery
			),jQuery
			left: (jQuery
				pageX -																	// The absolute mouse positionjQuery
				this.offset.click.left -												// Click offset (relative to the element)jQuery
				this.offset.relative.left -												// Only for relative positioned nodes: Relative offset from element to offset parentjQuery
				this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)jQuery
				( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : this.offset.scroll.left )jQuery
			)jQuery
		};jQuery
jQuery
	},jQuery
jQuery
	_clear: function() {jQuery
		this.helper.removeClass("ui-draggable-dragging");jQuery
		if(this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {jQuery
			this.helper.remove();jQuery
		}jQuery
		this.helper = null;jQuery
		this.cancelHelperRemoval = false;jQuery
	},jQuery
jQuery
	// From now on bulk stuff - mainly helpersjQuery
jQuery
	_trigger: function(type, event, ui) {jQuery
		ui = ui || this._uiHash();jQuery
		$.ui.plugin.call(this, type, [event, ui]);jQuery
		//The absolute position has to be recalculated after pluginsjQuery
		if(type === "drag") {jQuery
			this.positionAbs = this._convertPositionTo("absolute");jQuery
		}jQuery
		return $.Widget.prototype._trigger.call(this, type, event, ui);jQuery
	},jQuery
jQuery
	plugins: {},jQuery
jQuery
	_uiHash: function() {jQuery
		return {jQuery
			helper: this.helper,jQuery
			position: this.position,jQuery
			originalPosition: this.originalPosition,jQuery
			offset: this.positionAbsjQuery
		};jQuery
	}jQuery
jQuery
});jQuery
jQuery
$.ui.plugin.add("draggable", "connectToSortable", {jQuery
	start: function(event, ui) {jQuery
jQuery
		var inst = $(this).data("ui-draggable"), o = inst.options,jQuery
			uiSortable = $.extend({}, ui, { item: inst.element });jQuery
		inst.sortables = [];jQuery
		$(o.connectToSortable).each(function() {jQuery
			var sortable = $.data(this, "ui-sortable");jQuery
			if (sortable && !sortable.options.disabled) {jQuery
				inst.sortables.push({jQuery
					instance: sortable,jQuery
					shouldRevert: sortable.options.revertjQuery
				});jQuery
				sortable.refreshPositions();	// Call the sortable's refreshPositions at drag start to refresh the containerCache since the sortable container cache is used in drag and needs to be up to date (this will ensure it's initialised as well as being kept in step with any changes that might have happened on the page).jQuery
				sortable._trigger("activate", event, uiSortable);jQuery
			}jQuery
		});jQuery
jQuery
	},jQuery
	stop: function(event, ui) {jQuery
jQuery
		//If we are still over the sortable, we fake the stop event of the sortable, but also remove helperjQuery
		var inst = $(this).data("ui-draggable"),jQuery
			uiSortable = $.extend({}, ui, { item: inst.element });jQuery
jQuery
		$.each(inst.sortables, function() {jQuery
			if(this.instance.isOver) {jQuery
jQuery
				this.instance.isOver = 0;jQuery
jQuery
				inst.cancelHelperRemoval = true; //Don't remove the helper in the draggable instancejQuery
				this.instance.cancelHelperRemoval = false; //Remove it in the sortable instance (so sortable plugins like revert still work)jQuery
jQuery
				//The sortable revert is supported, and we have to set a temporary dropped variable on the draggable to support revert: "valid/invalid"jQuery
				if(this.shouldRevert) {jQuery
					this.instance.options.revert = this.shouldRevert;jQuery
				}jQuery
jQuery
				//Trigger the stop of the sortablejQuery
				this.instance._mouseStop(event);jQuery
jQuery
				this.instance.options.helper = this.instance.options._helper;jQuery
jQuery
				//If the helper has been the original item, restore properties in the sortablejQuery
				if(inst.options.helper === "original") {jQuery
					this.instance.currentItem.css({ top: "auto", left: "auto" });jQuery
				}jQuery
jQuery
			} else {jQuery
				this.instance.cancelHelperRemoval = false; //Remove the helper in the sortable instancejQuery
				this.instance._trigger("deactivate", event, uiSortable);jQuery
			}jQuery
jQuery
		});jQuery
jQuery
	},jQuery
	drag: function(event, ui) {jQuery
jQuery
		var inst = $(this).data("ui-draggable"), that = this;jQuery
jQuery
		$.each(inst.sortables, function() {jQuery
jQuery
			var innermostIntersecting = false,jQuery
				thisSortable = this;jQuery
jQuery
			//Copy over some variables to allow calling the sortable's native _intersectsWithjQuery
			this.instance.positionAbs = inst.positionAbs;jQuery
			this.instance.helperProportions = inst.helperProportions;jQuery
			this.instance.offset.click = inst.offset.click;jQuery
jQuery
			if(this.instance._intersectsWith(this.instance.containerCache)) {jQuery
				innermostIntersecting = true;jQuery
				$.each(inst.sortables, function () {jQuery
					this.instance.positionAbs = inst.positionAbs;jQuery
					this.instance.helperProportions = inst.helperProportions;jQuery
					this.instance.offset.click = inst.offset.click;jQuery
					if (this !== thisSortable &&jQuery
						this.instance._intersectsWith(this.instance.containerCache) &&jQuery
						$.contains(thisSortable.instance.element[0], this.instance.element[0])jQuery
					) {jQuery
						innermostIntersecting = false;jQuery
					}jQuery
					return innermostIntersecting;jQuery
				});jQuery
			}jQuery
jQuery
jQuery
			if(innermostIntersecting) {jQuery
				//If it intersects, we use a little isOver variable and set it once, so our move-in stuff gets fired only oncejQuery
				if(!this.instance.isOver) {jQuery
jQuery
					this.instance.isOver = 1;jQuery
					//Now we fake the start of dragging for the sortable instance,jQuery
					//by cloning the list group item, appending it to the sortable and using it as inst.currentItemjQuery
					//We can then fire the start event of the sortable with our passed browser event, and our own helper (so it doesn't create a new one)jQuery
					this.instance.currentItem = $(that).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", true);jQuery
					this.instance.options._helper = this.instance.options.helper; //Store helper option to later restore itjQuery
					this.instance.options.helper = function() { return ui.helper[0]; };jQuery
jQuery
					event.target = this.instance.currentItem[0];jQuery
					this.instance._mouseCapture(event, true);jQuery
					this.instance._mouseStart(event, true, true);jQuery
jQuery
					//Because the browser event is way off the new appended portlet, we modify a couple of variables to reflect the changesjQuery
					this.instance.offset.click.top = inst.offset.click.top;jQuery
					this.instance.offset.click.left = inst.offset.click.left;jQuery
					this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;jQuery
					this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;jQuery
jQuery
					inst._trigger("toSortable", event);jQuery
					inst.dropped = this.instance.element; //draggable revert needs thatjQuery
					//hack so receive/update callbacks work (mostly)jQuery
					inst.currentItem = inst.element;jQuery
					this.instance.fromOutside = inst;jQuery
jQuery
				}jQuery
jQuery
				//Provided we did all the previous steps, we can fire the drag event of the sortable on every draggable drag, when it intersects with the sortablejQuery
				if(this.instance.currentItem) {jQuery
					this.instance._mouseDrag(event);jQuery
				}jQuery
jQuery
			} else {jQuery
jQuery
				//If it doesn't intersect with the sortable, and it intersected before,jQuery
				//we fake the drag stop of the sortable, but make sure it doesn't remove the helper by using cancelHelperRemovaljQuery
				if(this.instance.isOver) {jQuery
jQuery
					this.instance.isOver = 0;jQuery
					this.instance.cancelHelperRemoval = true;jQuery
jQuery
					//Prevent reverting on this forced stopjQuery
					this.instance.options.revert = false;jQuery
jQuery
					// The out event needs to be triggered independentlyjQuery
					this.instance._trigger("out", event, this.instance._uiHash(this.instance));jQuery
jQuery
					this.instance._mouseStop(event, true);jQuery
					this.instance.options.helper = this.instance.options._helper;jQuery
jQuery
					//Now we remove our currentItem, the list group clone again, and the placeholder, and animate the helper back to it's original sizejQuery
					this.instance.currentItem.remove();jQuery
					if(this.instance.placeholder) {jQuery
						this.instance.placeholder.remove();jQuery
					}jQuery
jQuery
					inst._trigger("fromSortable", event);jQuery
					inst.dropped = false; //draggable revert needs thatjQuery
				}jQuery
jQuery
			}jQuery
jQuery
		});jQuery
jQuery
	}jQuery
});jQuery
jQuery
$.ui.plugin.add("draggable", "cursor", {jQuery
	start: function() {jQuery
		var t = $("body"), o = $(this).data("ui-draggable").options;jQuery
		if (t.css("cursor")) {jQuery
			o._cursor = t.css("cursor");jQuery
		}jQuery
		t.css("cursor", o.cursor);jQuery
	},jQuery
	stop: function() {jQuery
		var o = $(this).data("ui-draggable").options;jQuery
		if (o._cursor) {jQuery
			$("body").css("cursor", o._cursor);jQuery
		}jQuery
	}jQuery
});jQuery
jQuery
$.ui.plugin.add("draggable", "opacity", {jQuery
	start: function(event, ui) {jQuery
		var t = $(ui.helper), o = $(this).data("ui-draggable").options;jQuery
		if(t.css("opacity")) {jQuery
			o._opacity = t.css("opacity");jQuery
		}jQuery
		t.css("opacity", o.opacity);jQuery
	},jQuery
	stop: function(event, ui) {jQuery
		var o = $(this).data("ui-draggable").options;jQuery
		if(o._opacity) {jQuery
			$(ui.helper).css("opacity", o._opacity);jQuery
		}jQuery
	}jQuery
});jQuery
jQuery
$.ui.plugin.add("draggable", "scroll", {jQuery
	start: function() {jQuery
		var i = $(this).data("ui-draggable");jQuery
		if(i.scrollParent[0] !== document && i.scrollParent[0].tagName !== "HTML") {jQuery
			i.overflowOffset = i.scrollParent.offset();jQuery
		}jQuery
	},jQuery
	drag: function( event ) {jQuery
jQuery
		var i = $(this).data("ui-draggable"), o = i.options, scrolled = false;jQuery
jQuery
		if(i.scrollParent[0] !== document && i.scrollParent[0].tagName !== "HTML") {jQuery
jQuery
			if(!o.axis || o.axis !== "x") {jQuery
				if((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {jQuery
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed;jQuery
				} else if(event.pageY - i.overflowOffset.top < o.scrollSensitivity) {jQuery
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed;jQuery
				}jQuery
			}jQuery
jQuery
			if(!o.axis || o.axis !== "y") {jQuery
				if((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {jQuery
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed;jQuery
				} else if(event.pageX - i.overflowOffset.left < o.scrollSensitivity) {jQuery
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed;jQuery
				}jQuery
			}jQuery
jQuery
		} else {jQuery
jQuery
			if(!o.axis || o.axis !== "x") {jQuery
				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity) {jQuery
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);jQuery
				} else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {jQuery
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);jQuery
				}jQuery
			}jQuery
jQuery
			if(!o.axis || o.axis !== "y") {jQuery
				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {jQuery
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);jQuery
				} else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {jQuery
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);jQuery
				}jQuery
			}jQuery
jQuery
		}jQuery
jQuery
		if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {jQuery
			$.ui.ddmanager.prepareOffsets(i, event);jQuery
		}jQuery
jQuery
	}jQuery
});jQuery
jQuery
$.ui.plugin.add("draggable", "snap", {jQuery
	start: function() {jQuery
jQuery
		var i = $(this).data("ui-draggable"),jQuery
			o = i.options;jQuery
jQuery
		i.snapElements = [];jQuery
jQuery
		$(o.snap.constructor !== String ? ( o.snap.items || ":data(ui-draggable)" ) : o.snap).each(function() {jQuery
			var $t = $(this),jQuery
				$o = $t.offset();jQuery
			if(this !== i.element[0]) {jQuery
				i.snapElements.push({jQuery
					item: this,jQuery
					width: $t.outerWidth(), height: $t.outerHeight(),jQuery
					top: $o.top, left: $o.leftjQuery
				});jQuery
			}jQuery
		});jQuery
jQuery
	},jQuery
	drag: function(event, ui) {jQuery
jQuery
		var ts, bs, ls, rs, l, r, t, b, i, first,jQuery
			inst = $(this).data("ui-draggable"),jQuery
			o = inst.options,jQuery
			d = o.snapTolerance,jQuery
			x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,jQuery
			y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;jQuery
jQuery
		for (i = inst.snapElements.length - 1; i >= 0; i--){jQuery
jQuery
			l = inst.snapElements[i].left;jQuery
			r = l + inst.snapElements[i].width;jQuery
			t = inst.snapElements[i].top;jQuery
			b = t + inst.snapElements[i].height;jQuery
jQuery
			if ( x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains( inst.snapElements[ i ].item.ownerDocument, inst.snapElements[ i ].item ) ) {jQuery
				if(inst.snapElements[i].snapping) {jQuery
					(inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));jQuery
				}jQuery
				inst.snapElements[i].snapping = false;jQuery
				continue;jQuery
			}jQuery
jQuery
			if(o.snapMode !== "inner") {jQuery
				ts = Math.abs(t - y2) <= d;jQuery
				bs = Math.abs(b - y1) <= d;jQuery
				ls = Math.abs(l - x2) <= d;jQuery
				rs = Math.abs(r - x1) <= d;jQuery
				if(ts) {jQuery
					ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top - inst.margins.top;jQuery
				}jQuery
				if(bs) {jQuery
					ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top - inst.margins.top;jQuery
				}jQuery
				if(ls) {jQuery
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left - inst.margins.left;jQuery
				}jQuery
				if(rs) {jQuery
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left - inst.margins.left;jQuery
				}jQuery
			}jQuery
jQuery
			first = (ts || bs || ls || rs);jQuery
jQuery
			if(o.snapMode !== "outer") {jQuery
				ts = Math.abs(t - y1) <= d;jQuery
				bs = Math.abs(b - y2) <= d;jQuery
				ls = Math.abs(l - x1) <= d;jQuery
				rs = Math.abs(r - x2) <= d;jQuery
				if(ts) {jQuery
					ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top - inst.margins.top;jQuery
				}jQuery
				if(bs) {jQuery
					ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top - inst.margins.top;jQuery
				}jQuery
				if(ls) {jQuery
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left - inst.margins.left;jQuery
				}jQuery
				if(rs) {jQuery
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left - inst.margins.left;jQuery
				}jQuery
			}jQuery
jQuery
			if(!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {jQuery
				(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));jQuery
			}jQuery
			inst.snapElements[i].snapping = (ts || bs || ls || rs || first);jQuery
jQuery
		}jQuery
jQuery
	}jQuery
});jQuery
jQuery
$.ui.plugin.add("draggable", "stack", {jQuery
	start: function() {jQuery
		var min,jQuery
			o = this.data("ui-draggable").options,jQuery
			group = $.makeArray($(o.stack)).sort(function(a,b) {jQuery
				return (parseInt($(a).css("zIndex"),10) || 0) - (parseInt($(b).css("zIndex"),10) || 0);jQuery
			});jQuery
jQuery
		if (!group.length) { return; }jQuery
jQuery
		min = parseInt($(group[0]).css("zIndex"), 10) || 0;jQuery
		$(group).each(function(i) {jQuery
			$(this).css("zIndex", min + i);jQuery
		});jQuery
		this.css("zIndex", (min + group.length));jQuery
	}jQuery
});jQuery
jQuery
$.ui.plugin.add("draggable", "zIndex", {jQuery
	start: function(event, ui) {jQuery
		var t = $(ui.helper), o = $(this).data("ui-draggable").options;jQuery
		if(t.css("zIndex")) {jQuery
			o._zIndex = t.css("zIndex");jQuery
		}jQuery
		t.css("zIndex", o.zIndex);jQuery
	},jQuery
	stop: function(event, ui) {jQuery
		var o = $(this).data("ui-draggable").options;jQuery
		if(o._zIndex) {jQuery
			$(ui.helper).css("zIndex", o._zIndex);jQuery
		}jQuery
	}jQuery
});jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
function isOverAxis( x, reference, size ) {jQuery
	return ( x > reference ) && ( x < ( reference + size ) );jQuery
}jQuery
jQuery
$.widget("ui.droppable", {jQuery
	version: "1.10.4",jQuery
	widgetEventPrefix: "drop",jQuery
	options: {jQuery
		accept: "*",jQuery
		activeClass: false,jQuery
		addClasses: true,jQuery
		greedy: false,jQuery
		hoverClass: false,jQuery
		scope: "default",jQuery
		tolerance: "intersect",jQuery
jQuery
		// callbacksjQuery
		activate: null,jQuery
		deactivate: null,jQuery
		drop: null,jQuery
		out: null,jQuery
		over: nulljQuery
	},jQuery
	_create: function() {jQuery
jQuery
		var proportions,jQuery
			o = this.options,jQuery
			accept = o.accept;jQuery
jQuery
		this.isover = false;jQuery
		this.isout = true;jQuery
jQuery
		this.accept = $.isFunction(accept) ? accept : function(d) {jQuery
			return d.is(accept);jQuery
		};jQuery
jQuery
		this.proportions = function( /* valueToWrite */ ) {jQuery
			if ( arguments.length ) {jQuery
				// Store the droppable's proportionsjQuery
				proportions = arguments[ 0 ];jQuery
			} else {jQuery
				// Retrieve or derive the droppable's proportionsjQuery
				return proportions ?jQuery
					proportions :jQuery
					proportions = {jQuery
						width: this.element[ 0 ].offsetWidth,jQuery
						height: this.element[ 0 ].offsetHeightjQuery
					};jQuery
			}jQuery
		};jQuery
jQuery
		// Add the reference and positions to the managerjQuery
		$.ui.ddmanager.droppables[o.scope] = $.ui.ddmanager.droppables[o.scope] || [];jQuery
		$.ui.ddmanager.droppables[o.scope].push(this);jQuery
jQuery
		(o.addClasses && this.element.addClass("ui-droppable"));jQuery
jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		var i = 0,jQuery
			drop = $.ui.ddmanager.droppables[this.options.scope];jQuery
jQuery
		for ( ; i < drop.length; i++ ) {jQuery
			if ( drop[i] === this ) {jQuery
				drop.splice(i, 1);jQuery
			}jQuery
		}jQuery
jQuery
		this.element.removeClass("ui-droppable ui-droppable-disabled");jQuery
	},jQuery
jQuery
	_setOption: function(key, value) {jQuery
jQuery
		if(key === "accept") {jQuery
			this.accept = $.isFunction(value) ? value : function(d) {jQuery
				return d.is(value);jQuery
			};jQuery
		}jQuery
		$.Widget.prototype._setOption.apply(this, arguments);jQuery
	},jQuery
jQuery
	_activate: function(event) {jQuery
		var draggable = $.ui.ddmanager.current;jQuery
		if(this.options.activeClass) {jQuery
			this.element.addClass(this.options.activeClass);jQuery
		}jQuery
		if(draggable){jQuery
			this._trigger("activate", event, this.ui(draggable));jQuery
		}jQuery
	},jQuery
jQuery
	_deactivate: function(event) {jQuery
		var draggable = $.ui.ddmanager.current;jQuery
		if(this.options.activeClass) {jQuery
			this.element.removeClass(this.options.activeClass);jQuery
		}jQuery
		if(draggable){jQuery
			this._trigger("deactivate", event, this.ui(draggable));jQuery
		}jQuery
	},jQuery
jQuery
	_over: function(event) {jQuery
jQuery
		var draggable = $.ui.ddmanager.current;jQuery
jQuery
		// Bail if draggable and droppable are same elementjQuery
		if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {jQuery
			return;jQuery
		}jQuery
jQuery
		if (this.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {jQuery
			if(this.options.hoverClass) {jQuery
				this.element.addClass(this.options.hoverClass);jQuery
			}jQuery
			this._trigger("over", event, this.ui(draggable));jQuery
		}jQuery
jQuery
	},jQuery
jQuery
	_out: function(event) {jQuery
jQuery
		var draggable = $.ui.ddmanager.current;jQuery
jQuery
		// Bail if draggable and droppable are same elementjQuery
		if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {jQuery
			return;jQuery
		}jQuery
jQuery
		if (this.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {jQuery
			if(this.options.hoverClass) {jQuery
				this.element.removeClass(this.options.hoverClass);jQuery
			}jQuery
			this._trigger("out", event, this.ui(draggable));jQuery
		}jQuery
jQuery
	},jQuery
jQuery
	_drop: function(event,custom) {jQuery
jQuery
		var draggable = custom || $.ui.ddmanager.current,jQuery
			childrenIntersection = false;jQuery
jQuery
		// Bail if draggable and droppable are same elementjQuery
		if (!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) {jQuery
			return false;jQuery
		}jQuery
jQuery
		this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {jQuery
			var inst = $.data(this, "ui-droppable");jQuery
			if(jQuery
				inst.options.greedy &&jQuery
				!inst.options.disabled &&jQuery
				inst.options.scope === draggable.options.scope &&jQuery
				inst.accept.call(inst.element[0], (draggable.currentItem || draggable.element)) &&jQuery
				$.ui.intersect(draggable, $.extend(inst, { offset: inst.element.offset() }), inst.options.tolerance)jQuery
			) { childrenIntersection = true; return false; }jQuery
		});jQuery
		if(childrenIntersection) {jQuery
			return false;jQuery
		}jQuery
jQuery
		if(this.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {jQuery
			if(this.options.activeClass) {jQuery
				this.element.removeClass(this.options.activeClass);jQuery
			}jQuery
			if(this.options.hoverClass) {jQuery
				this.element.removeClass(this.options.hoverClass);jQuery
			}jQuery
			this._trigger("drop", event, this.ui(draggable));jQuery
			return this.element;jQuery
		}jQuery
jQuery
		return false;jQuery
jQuery
	},jQuery
jQuery
	ui: function(c) {jQuery
		return {jQuery
			draggable: (c.currentItem || c.element),jQuery
			helper: c.helper,jQuery
			position: c.position,jQuery
			offset: c.positionAbsjQuery
		};jQuery
	}jQuery
jQuery
});jQuery
jQuery
$.ui.intersect = function(draggable, droppable, toleranceMode) {jQuery
jQuery
	if (!droppable.offset) {jQuery
		return false;jQuery
	}jQuery
jQuery
	var draggableLeft, draggableTop,jQuery
		x1 = (draggable.positionAbs || draggable.position.absolute).left,jQuery
		y1 = (draggable.positionAbs || draggable.position.absolute).top,jQuery
		x2 = x1 + draggable.helperProportions.width,jQuery
		y2 = y1 + draggable.helperProportions.height,jQuery
		l = droppable.offset.left,jQuery
		t = droppable.offset.top,jQuery
		r = l + droppable.proportions().width,jQuery
		b = t + droppable.proportions().height;jQuery
jQuery
	switch (toleranceMode) {jQuery
		case "fit":jQuery
			return (l <= x1 && x2 <= r && t <= y1 && y2 <= b);jQuery
		case "intersect":jQuery
			return (l < x1 + (draggable.helperProportions.width / 2) && // Right HalfjQuery
				x2 - (draggable.helperProportions.width / 2) < r && // Left HalfjQuery
				t < y1 + (draggable.helperProportions.height / 2) && // Bottom HalfjQuery
				y2 - (draggable.helperProportions.height / 2) < b ); // Top HalfjQuery
		case "pointer":jQuery
			draggableLeft = ((draggable.positionAbs || draggable.position.absolute).left + (draggable.clickOffset || draggable.offset.click).left);jQuery
			draggableTop = ((draggable.positionAbs || draggable.position.absolute).top + (draggable.clickOffset || draggable.offset.click).top);jQuery
			return isOverAxis( draggableTop, t, droppable.proportions().height ) && isOverAxis( draggableLeft, l, droppable.proportions().width );jQuery
		case "touch":jQuery
			return (jQuery
				(y1 >= t && y1 <= b) ||	// Top edge touchingjQuery
				(y2 >= t && y2 <= b) ||	// Bottom edge touchingjQuery
				(y1 < t && y2 > b)		// Surrounded verticallyjQuery
			) && (jQuery
				(x1 >= l && x1 <= r) ||	// Left edge touchingjQuery
				(x2 >= l && x2 <= r) ||	// Right edge touchingjQuery
				(x1 < l && x2 > r)		// Surrounded horizontallyjQuery
			);jQuery
		default:jQuery
			return false;jQuery
		}jQuery
jQuery
};jQuery
jQuery
/*jQuery
	This manager tracks offsets of draggables and droppablesjQuery
*/jQuery
$.ui.ddmanager = {jQuery
	current: null,jQuery
	droppables: { "default": [] },jQuery
	prepareOffsets: function(t, event) {jQuery
jQuery
		var i, j,jQuery
			m = $.ui.ddmanager.droppables[t.options.scope] || [],jQuery
			type = event ? event.type : null, // workaround for #2317jQuery
			list = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();jQuery
jQuery
		droppablesLoop: for (i = 0; i < m.length; i++) {jQuery
jQuery
			//No disabled and non-acceptedjQuery
			if(m[i].options.disabled || (t && !m[i].accept.call(m[i].element[0],(t.currentItem || t.element)))) {jQuery
				continue;jQuery
			}jQuery
jQuery
			// Filter out elements in the current dragged itemjQuery
			for (j=0; j < list.length; j++) {jQuery
				if(list[j] === m[i].element[0]) {jQuery
					m[i].proportions().height = 0;jQuery
					continue droppablesLoop;jQuery
				}jQuery
			}jQuery
jQuery
			m[i].visible = m[i].element.css("display") !== "none";jQuery
			if(!m[i].visible) {jQuery
				continue;jQuery
			}jQuery
jQuery
			//Activate the droppable if used directly from draggablesjQuery
			if(type === "mousedown") {jQuery
				m[i]._activate.call(m[i], event);jQuery
			}jQuery
jQuery
			m[ i ].offset = m[ i ].element.offset();jQuery
			m[ i ].proportions({ width: m[ i ].element[ 0 ].offsetWidth, height: m[ i ].element[ 0 ].offsetHeight });jQuery
jQuery
		}jQuery
jQuery
	},jQuery
	drop: function(draggable, event) {jQuery
jQuery
		var dropped = false;jQuery
		// Create a copy of the droppables in case the list changes during the drop (#9116)jQuery
		$.each(($.ui.ddmanager.droppables[draggable.options.scope] || []).slice(), function() {jQuery
jQuery
			if(!this.options) {jQuery
				return;jQuery
			}jQuery
			if (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance)) {jQuery
				dropped = this._drop.call(this, event) || dropped;jQuery
			}jQuery
jQuery
			if (!this.options.disabled && this.visible && this.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {jQuery
				this.isout = true;jQuery
				this.isover = false;jQuery
				this._deactivate.call(this, event);jQuery
			}jQuery
jQuery
		});jQuery
		return dropped;jQuery
jQuery
	},jQuery
	dragStart: function( draggable, event ) {jQuery
		//Listen for scrolling so that if the dragging causes scrolling the position of the droppables can be recalculated (see #5003)jQuery
		draggable.element.parentsUntil( "body" ).bind( "scroll.droppable", function() {jQuery
			if( !draggable.options.refreshPositions ) {jQuery
				$.ui.ddmanager.prepareOffsets( draggable, event );jQuery
			}jQuery
		});jQuery
	},jQuery
	drag: function(draggable, event) {jQuery
jQuery
		//If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.jQuery
		if(draggable.options.refreshPositions) {jQuery
			$.ui.ddmanager.prepareOffsets(draggable, event);jQuery
		}jQuery
jQuery
		//Run through all droppables and check their positions based on specific tolerance optionsjQuery
		$.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {jQuery
jQuery
			if(this.options.disabled || this.greedyChild || !this.visible) {jQuery
				return;jQuery
			}jQuery
jQuery
			var parentInstance, scope, parent,jQuery
				intersects = $.ui.intersect(draggable, this, this.options.tolerance),jQuery
				c = !intersects && this.isover ? "isout" : (intersects && !this.isover ? "isover" : null);jQuery
			if(!c) {jQuery
				return;jQuery
			}jQuery
jQuery
			if (this.options.greedy) {jQuery
				// find droppable parents with same scopejQuery
				scope = this.options.scope;jQuery
				parent = this.element.parents(":data(ui-droppable)").filter(function () {jQuery
					return $.data(this, "ui-droppable").options.scope === scope;jQuery
				});jQuery
jQuery
				if (parent.length) {jQuery
					parentInstance = $.data(parent[0], "ui-droppable");jQuery
					parentInstance.greedyChild = (c === "isover");jQuery
				}jQuery
			}jQuery
jQuery
			// we just moved into a greedy childjQuery
			if (parentInstance && c === "isover") {jQuery
				parentInstance.isover = false;jQuery
				parentInstance.isout = true;jQuery
				parentInstance._out.call(parentInstance, event);jQuery
			}jQuery
jQuery
			this[c] = true;jQuery
			this[c === "isout" ? "isover" : "isout"] = false;jQuery
			this[c === "isover" ? "_over" : "_out"].call(this, event);jQuery
jQuery
			// we just moved out of a greedy childjQuery
			if (parentInstance && c === "isout") {jQuery
				parentInstance.isout = false;jQuery
				parentInstance.isover = true;jQuery
				parentInstance._over.call(parentInstance, event);jQuery
			}jQuery
		});jQuery
jQuery
	},jQuery
	dragStop: function( draggable, event ) {jQuery
		draggable.element.parentsUntil( "body" ).unbind( "scroll.droppable" );jQuery
		//Call prepareOffsets one final time since IE does not fire return scroll events when overflow was caused by drag (see #5003)jQuery
		if( !draggable.options.refreshPositions ) {jQuery
			$.ui.ddmanager.prepareOffsets( draggable, event );jQuery
		}jQuery
	}jQuery
};jQuery
jQuery
})(jQuery);jQuery
(function($, undefined) {jQuery
jQuery
var dataSpace = "ui-effects-";jQuery
jQuery
$.effects = {jQuery
	effect: {}jQuery
};jQuery
jQuery
/*!jQuery
 * jQuery Color Animations v2.1.2jQuery
 * https://github.com/jquery/jquery-colorjQuery
 *jQuery
 * Copyright 2013 jQuery Foundation and other contributorsjQuery
 * Released under the MIT license.jQuery
 * http://jquery.org/licensejQuery
 *jQuery
 * Date: Wed Jan 16 08:47:09 2013 -0600jQuery
 */jQuery
(function( jQuery, undefined ) {jQuery
jQuery
	var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",jQuery
jQuery
	// plusequals test for += 100 -= 100jQuery
	rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,jQuery
	// a set of RE's that can match strings and generate color tuples.jQuery
	stringParsers = [{jQuery
			re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,jQuery
			parse: function( execResult ) {jQuery
				return [jQuery
					execResult[ 1 ],jQuery
					execResult[ 2 ],jQuery
					execResult[ 3 ],jQuery
					execResult[ 4 ]jQuery
				];jQuery
			}jQuery
		}, {jQuery
			re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,jQuery
			parse: function( execResult ) {jQuery
				return [jQuery
					execResult[ 1 ] * 2.55,jQuery
					execResult[ 2 ] * 2.55,jQuery
					execResult[ 3 ] * 2.55,jQuery
					execResult[ 4 ]jQuery
				];jQuery
			}jQuery
		}, {jQuery
			// this regex ignores A-F because it's compared against an already lowercased stringjQuery
			re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,jQuery
			parse: function( execResult ) {jQuery
				return [jQuery
					parseInt( execResult[ 1 ], 16 ),jQuery
					parseInt( execResult[ 2 ], 16 ),jQuery
					parseInt( execResult[ 3 ], 16 )jQuery
				];jQuery
			}jQuery
		}, {jQuery
			// this regex ignores A-F because it's compared against an already lowercased stringjQuery
			re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,jQuery
			parse: function( execResult ) {jQuery
				return [jQuery
					parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),jQuery
					parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),jQuery
					parseInt( execResult[ 3 ] + execResult[ 3 ], 16 )jQuery
				];jQuery
			}jQuery
		}, {jQuery
			re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,jQuery
			space: "hsla",jQuery
			parse: function( execResult ) {jQuery
				return [jQuery
					execResult[ 1 ],jQuery
					execResult[ 2 ] / 100,jQuery
					execResult[ 3 ] / 100,jQuery
					execResult[ 4 ]jQuery
				];jQuery
			}jQuery
		}],jQuery
jQuery
	// jQuery.Color( )jQuery
	color = jQuery.Color = function( color, green, blue, alpha ) {jQuery
		return new jQuery.Color.fn.parse( color, green, blue, alpha );jQuery
	},jQuery
	spaces = {jQuery
		rgba: {jQuery
			props: {jQuery
				red: {jQuery
					idx: 0,jQuery
					type: "byte"jQuery
				},jQuery
				green: {jQuery
					idx: 1,jQuery
					type: "byte"jQuery
				},jQuery
				blue: {jQuery
					idx: 2,jQuery
					type: "byte"jQuery
				}jQuery
			}jQuery
		},jQuery
jQuery
		hsla: {jQuery
			props: {jQuery
				hue: {jQuery
					idx: 0,jQuery
					type: "degrees"jQuery
				},jQuery
				saturation: {jQuery
					idx: 1,jQuery
					type: "percent"jQuery
				},jQuery
				lightness: {jQuery
					idx: 2,jQuery
					type: "percent"jQuery
				}jQuery
			}jQuery
		}jQuery
	},jQuery
	propTypes = {jQuery
		"byte": {jQuery
			floor: true,jQuery
			max: 255jQuery
		},jQuery
		"percent": {jQuery
			max: 1jQuery
		},jQuery
		"degrees": {jQuery
			mod: 360,jQuery
			floor: truejQuery
		}jQuery
	},jQuery
	support = color.support = {},jQuery
jQuery
	// element for support testsjQuery
	supportElem = jQuery( "<p>" )[ 0 ],jQuery
jQuery
	// colors = jQuery.Color.namesjQuery
	colors,jQuery
jQuery
	// local aliases of functions called oftenjQuery
	each = jQuery.each;jQuery
jQuery
// determine rgba support immediatelyjQuery
supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";jQuery
support.rgba = supportElem.style.backgroundColor.indexOf( "rgba" ) > -1;jQuery
jQuery
// define cache name and alpha propertiesjQuery
// for rgba and hsla spacesjQuery
each( spaces, function( spaceName, space ) {jQuery
	space.cache = "_" + spaceName;jQuery
	space.props.alpha = {jQuery
		idx: 3,jQuery
		type: "percent",jQuery
		def: 1jQuery
	};jQuery
});jQuery
jQuery
function clamp( value, prop, allowEmpty ) {jQuery
	var type = propTypes[ prop.type ] || {};jQuery
jQuery
	if ( value == null ) {jQuery
		return (allowEmpty || !prop.def) ? null : prop.def;jQuery
	}jQuery
jQuery
	// ~~ is an short way of doing floor for positive numbersjQuery
	value = type.floor ? ~~value : parseFloat( value );jQuery
jQuery
	// IE will pass in empty strings as value for alpha,jQuery
	// which will hit this casejQuery
	if ( isNaN( value ) ) {jQuery
		return prop.def;jQuery
	}jQuery
jQuery
	if ( type.mod ) {jQuery
		// we add mod before modding to make sure that negatives valuesjQuery
		// get converted properly: -10 -> 350jQuery
		return (value + type.mod) % type.mod;jQuery
	}jQuery
jQuery
	// for now all property types without mod have min and maxjQuery
	return 0 > value ? 0 : type.max < value ? type.max : value;jQuery
}jQuery
jQuery
function stringParse( string ) {jQuery
	var inst = color(),jQuery
		rgba = inst._rgba = [];jQuery
jQuery
	string = string.toLowerCase();jQuery
jQuery
	each( stringParsers, function( i, parser ) {jQuery
		var parsed,jQuery
			match = parser.re.exec( string ),jQuery
			values = match && parser.parse( match ),jQuery
			spaceName = parser.space || "rgba";jQuery
jQuery
		if ( values ) {jQuery
			parsed = inst[ spaceName ]( values );jQuery
jQuery
			// if this was an rgba parse the assignment might happen twicejQuery
			// oh well....jQuery
			inst[ spaces[ spaceName ].cache ] = parsed[ spaces[ spaceName ].cache ];jQuery
			rgba = inst._rgba = parsed._rgba;jQuery
jQuery
			// exit each( stringParsers ) here because we matchedjQuery
			return false;jQuery
		}jQuery
	});jQuery
jQuery
	// Found a stringParser that handled itjQuery
	if ( rgba.length ) {jQuery
jQuery
		// if this came from a parsed string, force "transparent" when alpha is 0jQuery
		// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)jQuery
		if ( rgba.join() === "0,0,0,0" ) {jQuery
			jQuery.extend( rgba, colors.transparent );jQuery
		}jQuery
		return inst;jQuery
	}jQuery
jQuery
	// named colorsjQuery
	return colors[ string ];jQuery
}jQuery
jQuery
color.fn = jQuery.extend( color.prototype, {jQuery
	parse: function( red, green, blue, alpha ) {jQuery
		if ( red === undefined ) {jQuery
			this._rgba = [ null, null, null, null ];jQuery
			return this;jQuery
		}jQuery
		if ( red.jquery || red.nodeType ) {jQuery
			red = jQuery( red ).css( green );jQuery
			green = undefined;jQuery
		}jQuery
jQuery
		var inst = this,jQuery
			type = jQuery.type( red ),jQuery
			rgba = this._rgba = [];jQuery
jQuery
		// more than 1 argument specified - assume ( red, green, blue, alpha )jQuery
		if ( green !== undefined ) {jQuery
			red = [ red, green, blue, alpha ];jQuery
			type = "array";jQuery
		}jQuery
jQuery
		if ( type === "string" ) {jQuery
			return this.parse( stringParse( red ) || colors._default );jQuery
		}jQuery
jQuery
		if ( type === "array" ) {jQuery
			each( spaces.rgba.props, function( key, prop ) {jQuery
				rgba[ prop.idx ] = clamp( red[ prop.idx ], prop );jQuery
			});jQuery
			return this;jQuery
		}jQuery
jQuery
		if ( type === "object" ) {jQuery
			if ( red instanceof color ) {jQuery
				each( spaces, function( spaceName, space ) {jQuery
					if ( red[ space.cache ] ) {jQuery
						inst[ space.cache ] = red[ space.cache ].slice();jQuery
					}jQuery
				});jQuery
			} else {jQuery
				each( spaces, function( spaceName, space ) {jQuery
					var cache = space.cache;jQuery
					each( space.props, function( key, prop ) {jQuery
jQuery
						// if the cache doesn't exist, and we know how to convertjQuery
						if ( !inst[ cache ] && space.to ) {jQuery
jQuery
							// if the value was null, we don't need to copy itjQuery
							// if the key was alpha, we don't need to copy it eitherjQuery
							if ( key === "alpha" || red[ key ] == null ) {jQuery
								return;jQuery
							}jQuery
							inst[ cache ] = space.to( inst._rgba );jQuery
						}jQuery
jQuery
						// this is the only case where we allow nulls for ALL properties.jQuery
						// call clamp with alwaysAllowEmptyjQuery
						inst[ cache ][ prop.idx ] = clamp( red[ key ], prop, true );jQuery
					});jQuery
jQuery
					// everything defined but alpha?jQuery
					if ( inst[ cache ] && jQuery.inArray( null, inst[ cache ].slice( 0, 3 ) ) < 0 ) {jQuery
						// use the default of 1jQuery
						inst[ cache ][ 3 ] = 1;jQuery
						if ( space.from ) {jQuery
							inst._rgba = space.from( inst[ cache ] );jQuery
						}jQuery
					}jQuery
				});jQuery
			}jQuery
			return this;jQuery
		}jQuery
	},jQuery
	is: function( compare ) {jQuery
		var is = color( compare ),jQuery
			same = true,jQuery
			inst = this;jQuery
jQuery
		each( spaces, function( _, space ) {jQuery
			var localCache,jQuery
				isCache = is[ space.cache ];jQuery
			if (isCache) {jQuery
				localCache = inst[ space.cache ] || space.to && space.to( inst._rgba ) || [];jQuery
				each( space.props, function( _, prop ) {jQuery
					if ( isCache[ prop.idx ] != null ) {jQuery
						same = ( isCache[ prop.idx ] === localCache[ prop.idx ] );jQuery
						return same;jQuery
					}jQuery
				});jQuery
			}jQuery
			return same;jQuery
		});jQuery
		return same;jQuery
	},jQuery
	_space: function() {jQuery
		var used = [],jQuery
			inst = this;jQuery
		each( spaces, function( spaceName, space ) {jQuery
			if ( inst[ space.cache ] ) {jQuery
				used.push( spaceName );jQuery
			}jQuery
		});jQuery
		return used.pop();jQuery
	},jQuery
	transition: function( other, distance ) {jQuery
		var end = color( other ),jQuery
			spaceName = end._space(),jQuery
			space = spaces[ spaceName ],jQuery
			startColor = this.alpha() === 0 ? color( "transparent" ) : this,jQuery
			start = startColor[ space.cache ] || space.to( startColor._rgba ),jQuery
			result = start.slice();jQuery
jQuery
		end = end[ space.cache ];jQuery
		each( space.props, function( key, prop ) {jQuery
			var index = prop.idx,jQuery
				startValue = start[ index ],jQuery
				endValue = end[ index ],jQuery
				type = propTypes[ prop.type ] || {};jQuery
jQuery
			// if null, don't override start valuejQuery
			if ( endValue === null ) {jQuery
				return;jQuery
			}jQuery
			// if null - use endjQuery
			if ( startValue === null ) {jQuery
				result[ index ] = endValue;jQuery
			} else {jQuery
				if ( type.mod ) {jQuery
					if ( endValue - startValue > type.mod / 2 ) {jQuery
						startValue += type.mod;jQuery
					} else if ( startValue - endValue > type.mod / 2 ) {jQuery
						startValue -= type.mod;jQuery
					}jQuery
				}jQuery
				result[ index ] = clamp( ( endValue - startValue ) * distance + startValue, prop );jQuery
			}jQuery
		});jQuery
		return this[ spaceName ]( result );jQuery
	},jQuery
	blend: function( opaque ) {jQuery
		// if we are already opaque - return ourselfjQuery
		if ( this._rgba[ 3 ] === 1 ) {jQuery
			return this;jQuery
		}jQuery
jQuery
		var rgb = this._rgba.slice(),jQuery
			a = rgb.pop(),jQuery
			blend = color( opaque )._rgba;jQuery
jQuery
		return color( jQuery.map( rgb, function( v, i ) {jQuery
			return ( 1 - a ) * blend[ i ] + a * v;jQuery
		}));jQuery
	},jQuery
	toRgbaString: function() {jQuery
		var prefix = "rgba(",jQuery
			rgba = jQuery.map( this._rgba, function( v, i ) {jQuery
				return v == null ? ( i > 2 ? 1 : 0 ) : v;jQuery
			});jQuery
jQuery
		if ( rgba[ 3 ] === 1 ) {jQuery
			rgba.pop();jQuery
			prefix = "rgb(";jQuery
		}jQuery
jQuery
		return prefix + rgba.join() + ")";jQuery
	},jQuery
	toHslaString: function() {jQuery
		var prefix = "hsla(",jQuery
			hsla = jQuery.map( this.hsla(), function( v, i ) {jQuery
				if ( v == null ) {jQuery
					v = i > 2 ? 1 : 0;jQuery
				}jQuery
jQuery
				// catch 1 and 2jQuery
				if ( i && i < 3 ) {jQuery
					v = Math.round( v * 100 ) + "%";jQuery
				}jQuery
				return v;jQuery
			});jQuery
jQuery
		if ( hsla[ 3 ] === 1 ) {jQuery
			hsla.pop();jQuery
			prefix = "hsl(";jQuery
		}jQuery
		return prefix + hsla.join() + ")";jQuery
	},jQuery
	toHexString: function( includeAlpha ) {jQuery
		var rgba = this._rgba.slice(),jQuery
			alpha = rgba.pop();jQuery
jQuery
		if ( includeAlpha ) {jQuery
			rgba.push( ~~( alpha * 255 ) );jQuery
		}jQuery
jQuery
		return "#" + jQuery.map( rgba, function( v ) {jQuery
jQuery
			// default to 0 when nulls existjQuery
			v = ( v || 0 ).toString( 16 );jQuery
			return v.length === 1 ? "0" + v : v;jQuery
		}).join("");jQuery
	},jQuery
	toString: function() {jQuery
		return this._rgba[ 3 ] === 0 ? "transparent" : this.toRgbaString();jQuery
	}jQuery
});jQuery
color.fn.parse.prototype = color.fn;jQuery
jQuery
// hsla conversions adapted from:jQuery
// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021jQuery
jQuery
function hue2rgb( p, q, h ) {jQuery
	h = ( h + 1 ) % 1;jQuery
	if ( h * 6 < 1 ) {jQuery
		return p + (q - p) * h * 6;jQuery
	}jQuery
	if ( h * 2 < 1) {jQuery
		return q;jQuery
	}jQuery
	if ( h * 3 < 2 ) {jQuery
		return p + (q - p) * ((2/3) - h) * 6;jQuery
	}jQuery
	return p;jQuery
}jQuery
jQuery
spaces.hsla.to = function ( rgba ) {jQuery
	if ( rgba[ 0 ] == null || rgba[ 1 ] == null || rgba[ 2 ] == null ) {jQuery
		return [ null, null, null, rgba[ 3 ] ];jQuery
	}jQuery
	var r = rgba[ 0 ] / 255,jQuery
		g = rgba[ 1 ] / 255,jQuery
		b = rgba[ 2 ] / 255,jQuery
		a = rgba[ 3 ],jQuery
		max = Math.max( r, g, b ),jQuery
		min = Math.min( r, g, b ),jQuery
		diff = max - min,jQuery
		add = max + min,jQuery
		l = add * 0.5,jQuery
		h, s;jQuery
jQuery
	if ( min === max ) {jQuery
		h = 0;jQuery
	} else if ( r === max ) {jQuery
		h = ( 60 * ( g - b ) / diff ) + 360;jQuery
	} else if ( g === max ) {jQuery
		h = ( 60 * ( b - r ) / diff ) + 120;jQuery
	} else {jQuery
		h = ( 60 * ( r - g ) / diff ) + 240;jQuery
	}jQuery
jQuery
	// chroma (diff) == 0 means greyscale which, by definition, saturation = 0%jQuery
	// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)jQuery
	if ( diff === 0 ) {jQuery
		s = 0;jQuery
	} else if ( l <= 0.5 ) {jQuery
		s = diff / add;jQuery
	} else {jQuery
		s = diff / ( 2 - add );jQuery
	}jQuery
	return [ Math.round(h) % 360, s, l, a == null ? 1 : a ];jQuery
};jQuery
jQuery
spaces.hsla.from = function ( hsla ) {jQuery
	if ( hsla[ 0 ] == null || hsla[ 1 ] == null || hsla[ 2 ] == null ) {jQuery
		return [ null, null, null, hsla[ 3 ] ];jQuery
	}jQuery
	var h = hsla[ 0 ] / 360,jQuery
		s = hsla[ 1 ],jQuery
		l = hsla[ 2 ],jQuery
		a = hsla[ 3 ],jQuery
		q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,jQuery
		p = 2 * l - q;jQuery
jQuery
	return [jQuery
		Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),jQuery
		Math.round( hue2rgb( p, q, h ) * 255 ),jQuery
		Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),jQuery
		ajQuery
	];jQuery
};jQuery
jQuery
jQuery
each( spaces, function( spaceName, space ) {jQuery
	var props = space.props,jQuery
		cache = space.cache,jQuery
		to = space.to,jQuery
		from = space.from;jQuery
jQuery
	// makes rgba() and hsla()jQuery
	color.fn[ spaceName ] = function( value ) {jQuery
jQuery
		// generate a cache for this space if it doesn't existjQuery
		if ( to && !this[ cache ] ) {jQuery
			this[ cache ] = to( this._rgba );jQuery
		}jQuery
		if ( value === undefined ) {jQuery
			return this[ cache ].slice();jQuery
		}jQuery
jQuery
		var ret,jQuery
			type = jQuery.type( value ),jQuery
			arr = ( type === "array" || type === "object" ) ? value : arguments,jQuery
			local = this[ cache ].slice();jQuery
jQuery
		each( props, function( key, prop ) {jQuery
			var val = arr[ type === "object" ? key : prop.idx ];jQuery
			if ( val == null ) {jQuery
				val = local[ prop.idx ];jQuery
			}jQuery
			local[ prop.idx ] = clamp( val, prop );jQuery
		});jQuery
jQuery
		if ( from ) {jQuery
			ret = color( from( local ) );jQuery
			ret[ cache ] = local;jQuery
			return ret;jQuery
		} else {jQuery
			return color( local );jQuery
		}jQuery
	};jQuery
jQuery
	// makes red() green() blue() alpha() hue() saturation() lightness()jQuery
	each( props, function( key, prop ) {jQuery
		// alpha is included in more than one spacejQuery
		if ( color.fn[ key ] ) {jQuery
			return;jQuery
		}jQuery
		color.fn[ key ] = function( value ) {jQuery
			var vtype = jQuery.type( value ),jQuery
				fn = ( key === "alpha" ? ( this._hsla ? "hsla" : "rgba" ) : spaceName ),jQuery
				local = this[ fn ](),jQuery
				cur = local[ prop.idx ],jQuery
				match;jQuery
jQuery
			if ( vtype === "undefined" ) {jQuery
				return cur;jQuery
			}jQuery
jQuery
			if ( vtype === "function" ) {jQuery
				value = value.call( this, cur );jQuery
				vtype = jQuery.type( value );jQuery
			}jQuery
			if ( value == null && prop.empty ) {jQuery
				return this;jQuery
			}jQuery
			if ( vtype === "string" ) {jQuery
				match = rplusequals.exec( value );jQuery
				if ( match ) {jQuery
					value = cur + parseFloat( match[ 2 ] ) * ( match[ 1 ] === "+" ? 1 : -1 );jQuery
				}jQuery
			}jQuery
			local[ prop.idx ] = value;jQuery
			return this[ fn ]( local );jQuery
		};jQuery
	});jQuery
});jQuery
jQuery
// add cssHook and .fx.step function for each named hook.jQuery
// accept a space separated string of propertiesjQuery
color.hook = function( hook ) {jQuery
	var hooks = hook.split( " " );jQuery
	each( hooks, function( i, hook ) {jQuery
		jQuery.cssHooks[ hook ] = {jQuery
			set: function( elem, value ) {jQuery
				var parsed, curElem,jQuery
					backgroundColor = "";jQuery
jQuery
				if ( value !== "transparent" && ( jQuery.type( value ) !== "string" || ( parsed = stringParse( value ) ) ) ) {jQuery
					value = color( parsed || value );jQuery
					if ( !support.rgba && value._rgba[ 3 ] !== 1 ) {jQuery
						curElem = hook === "backgroundColor" ? elem.parentNode : elem;jQuery
						while (jQuery
							(backgroundColor === "" || backgroundColor === "transparent") &&jQuery
							curElem && curElem.stylejQuery
						) {jQuery
							try {jQuery
								backgroundColor = jQuery.css( curElem, "backgroundColor" );jQuery
								curElem = curElem.parentNode;jQuery
							} catch ( e ) {jQuery
							}jQuery
						}jQuery
jQuery
						value = value.blend( backgroundColor && backgroundColor !== "transparent" ?jQuery
							backgroundColor :jQuery
							"_default" );jQuery
					}jQuery
jQuery
					value = value.toRgbaString();jQuery
				}jQuery
				try {jQuery
					elem.style[ hook ] = value;jQuery
				} catch( e ) {jQuery
					// wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'jQuery
				}jQuery
			}jQuery
		};jQuery
		jQuery.fx.step[ hook ] = function( fx ) {jQuery
			if ( !fx.colorInit ) {jQuery
				fx.start = color( fx.elem, hook );jQuery
				fx.end = color( fx.end );jQuery
				fx.colorInit = true;jQuery
			}jQuery
			jQuery.cssHooks[ hook ].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );jQuery
		};jQuery
	});jQuery
jQuery
};jQuery
jQuery
color.hook( stepHooks );jQuery
jQuery
jQuery.cssHooks.borderColor = {jQuery
	expand: function( value ) {jQuery
		var expanded = {};jQuery
jQuery
		each( [ "Top", "Right", "Bottom", "Left" ], function( i, part ) {jQuery
			expanded[ "border" + part + "Color" ] = value;jQuery
		});jQuery
		return expanded;jQuery
	}jQuery
};jQuery
jQuery
// Basic color names only.jQuery
// Usage of any of the other color names requires adding yourself or includingjQuery
// jquery.color.svg-names.js.jQuery
colors = jQuery.Color.names = {jQuery
	// 4.1. Basic color keywordsjQuery
	aqua: "#00ffff",jQuery
	black: "#000000",jQuery
	blue: "#0000ff",jQuery
	fuchsia: "#ff00ff",jQuery
	gray: "#808080",jQuery
	green: "#008000",jQuery
	lime: "#00ff00",jQuery
	maroon: "#800000",jQuery
	navy: "#000080",jQuery
	olive: "#808000",jQuery
	purple: "#800080",jQuery
	red: "#ff0000",jQuery
	silver: "#c0c0c0",jQuery
	teal: "#008080",jQuery
	white: "#ffffff",jQuery
	yellow: "#ffff00",jQuery
jQuery
	// 4.2.3. "transparent" color keywordjQuery
	transparent: [ null, null, null, 0 ],jQuery
jQuery
	_default: "#ffffff"jQuery
};jQuery
jQuery
})( jQuery );jQuery
jQuery
jQuery
/******************************************************************************/jQuery
/****************************** CLASS ANIMATIONS ******************************/jQuery
/******************************************************************************/jQuery
(function() {jQuery
jQuery
var classAnimationActions = [ "add", "remove", "toggle" ],jQuery
	shorthandStyles = {jQuery
		border: 1,jQuery
		borderBottom: 1,jQuery
		borderColor: 1,jQuery
		borderLeft: 1,jQuery
		borderRight: 1,jQuery
		borderTop: 1,jQuery
		borderWidth: 1,jQuery
		margin: 1,jQuery
		padding: 1jQuery
	};jQuery
jQuery
$.each([ "borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle" ], function( _, prop ) {jQuery
	$.fx.step[ prop ] = function( fx ) {jQuery
		if ( fx.end !== "none" && !fx.setAttr || fx.pos === 1 && !fx.setAttr ) {jQuery
			jQuery.style( fx.elem, prop, fx.end );jQuery
			fx.setAttr = true;jQuery
		}jQuery
	};jQuery
});jQuery
jQuery
function getElementStyles( elem ) {jQuery
	var key, len,jQuery
		style = elem.ownerDocument.defaultView ?jQuery
			elem.ownerDocument.defaultView.getComputedStyle( elem, null ) :jQuery
			elem.currentStyle,jQuery
		styles = {};jQuery
jQuery
	if ( style && style.length && style[ 0 ] && style[ style[ 0 ] ] ) {jQuery
		len = style.length;jQuery
		while ( len-- ) {jQuery
			key = style[ len ];jQuery
			if ( typeof style[ key ] === "string" ) {jQuery
				styles[ $.camelCase( key ) ] = style[ key ];jQuery
			}jQuery
		}jQuery
	// support: Opera, IE <9jQuery
	} else {jQuery
		for ( key in style ) {jQuery
			if ( typeof style[ key ] === "string" ) {jQuery
				styles[ key ] = style[ key ];jQuery
			}jQuery
		}jQuery
	}jQuery
jQuery
	return styles;jQuery
}jQuery
jQuery
jQuery
function styleDifference( oldStyle, newStyle ) {jQuery
	var diff = {},jQuery
		name, value;jQuery
jQuery
	for ( name in newStyle ) {jQuery
		value = newStyle[ name ];jQuery
		if ( oldStyle[ name ] !== value ) {jQuery
			if ( !shorthandStyles[ name ] ) {jQuery
				if ( $.fx.step[ name ] || !isNaN( parseFloat( value ) ) ) {jQuery
					diff[ name ] = value;jQuery
				}jQuery
			}jQuery
		}jQuery
	}jQuery
jQuery
	return diff;jQuery
}jQuery
jQuery
// support: jQuery <1.8jQuery
if ( !$.fn.addBack ) {jQuery
	$.fn.addBack = function( selector ) {jQuery
		return this.add( selector == null ?jQuery
			this.prevObject : this.prevObject.filter( selector )jQuery
		);jQuery
	};jQuery
}jQuery
jQuery
$.effects.animateClass = function( value, duration, easing, callback ) {jQuery
	var o = $.speed( duration, easing, callback );jQuery
jQuery
	return this.queue( function() {jQuery
		var animated = $( this ),jQuery
			baseClass = animated.attr( "class" ) || "",jQuery
			applyClassChange,jQuery
			allAnimations = o.children ? animated.find( "*" ).addBack() : animated;jQuery
jQuery
		// map the animated objects to store the original styles.jQuery
		allAnimations = allAnimations.map(function() {jQuery
			var el = $( this );jQuery
			return {jQuery
				el: el,jQuery
				start: getElementStyles( this )jQuery
			};jQuery
		});jQuery
jQuery
		// apply class changejQuery
		applyClassChange = function() {jQuery
			$.each( classAnimationActions, function(i, action) {jQuery
				if ( value[ action ] ) {jQuery
					animated[ action + "Class" ]( value[ action ] );jQuery
				}jQuery
			});jQuery
		};jQuery
		applyClassChange();jQuery
jQuery
		// map all animated objects again - calculate new styles and diffjQuery
		allAnimations = allAnimations.map(function() {jQuery
			this.end = getElementStyles( this.el[ 0 ] );jQuery
			this.diff = styleDifference( this.start, this.end );jQuery
			return this;jQuery
		});jQuery
jQuery
		// apply original classjQuery
		animated.attr( "class", baseClass );jQuery
jQuery
		// map all animated objects again - this time collecting a promisejQuery
		allAnimations = allAnimations.map(function() {jQuery
			var styleInfo = this,jQuery
				dfd = $.Deferred(),jQuery
				opts = $.extend({}, o, {jQuery
					queue: false,jQuery
					complete: function() {jQuery
						dfd.resolve( styleInfo );jQuery
					}jQuery
				});jQuery
jQuery
			this.el.animate( this.diff, opts );jQuery
			return dfd.promise();jQuery
		});jQuery
jQuery
		// once all animations have completed:jQuery
		$.when.apply( $, allAnimations.get() ).done(function() {jQuery
jQuery
			// set the final classjQuery
			applyClassChange();jQuery
jQuery
			// for each animated element,jQuery
			// clear all css properties that were animatedjQuery
			$.each( arguments, function() {jQuery
				var el = this.el;jQuery
				$.each( this.diff, function(key) {jQuery
					el.css( key, "" );jQuery
				});jQuery
			});jQuery
jQuery
			// this is guarnteed to be there if you use jQuery.speed()jQuery
			// it also handles dequeuing the next anim...jQuery
			o.complete.call( animated[ 0 ] );jQuery
		});jQuery
	});jQuery
};jQuery
jQuery
$.fn.extend({jQuery
	addClass: (function( orig ) {jQuery
		return function( classNames, speed, easing, callback ) {jQuery
			return speed ?jQuery
				$.effects.animateClass.call( this,jQuery
					{ add: classNames }, speed, easing, callback ) :jQuery
				orig.apply( this, arguments );jQuery
		};jQuery
	})( $.fn.addClass ),jQuery
jQuery
	removeClass: (function( orig ) {jQuery
		return function( classNames, speed, easing, callback ) {jQuery
			return arguments.length > 1 ?jQuery
				$.effects.animateClass.call( this,jQuery
					{ remove: classNames }, speed, easing, callback ) :jQuery
				orig.apply( this, arguments );jQuery
		};jQuery
	})( $.fn.removeClass ),jQuery
jQuery
	toggleClass: (function( orig ) {jQuery
		return function( classNames, force, speed, easing, callback ) {jQuery
			if ( typeof force === "boolean" || force === undefined ) {jQuery
				if ( !speed ) {jQuery
					// without speed parameterjQuery
					return orig.apply( this, arguments );jQuery
				} else {jQuery
					return $.effects.animateClass.call( this,jQuery
						(force ? { add: classNames } : { remove: classNames }),jQuery
						speed, easing, callback );jQuery
				}jQuery
			} else {jQuery
				// without force parameterjQuery
				return $.effects.animateClass.call( this,jQuery
					{ toggle: classNames }, force, speed, easing );jQuery
			}jQuery
		};jQuery
	})( $.fn.toggleClass ),jQuery
jQuery
	switchClass: function( remove, add, speed, easing, callback) {jQuery
		return $.effects.animateClass.call( this, {jQuery
			add: add,jQuery
			remove: removejQuery
		}, speed, easing, callback );jQuery
	}jQuery
});jQuery
jQuery
})();jQuery
jQuery
/******************************************************************************/jQuery
/*********************************** EFFECTS **********************************/jQuery
/******************************************************************************/jQuery
jQuery
(function() {jQuery
jQuery
$.extend( $.effects, {jQuery
	version: "1.10.4",jQuery
jQuery
	// Saves a set of properties in a data storagejQuery
	save: function( element, set ) {jQuery
		for( var i=0; i < set.length; i++ ) {jQuery
			if ( set[ i ] !== null ) {jQuery
				element.data( dataSpace + set[ i ], element[ 0 ].style[ set[ i ] ] );jQuery
			}jQuery
		}jQuery
	},jQuery
jQuery
	// Restores a set of previously saved properties from a data storagejQuery
	restore: function( element, set ) {jQuery
		var val, i;jQuery
		for( i=0; i < set.length; i++ ) {jQuery
			if ( set[ i ] !== null ) {jQuery
				val = element.data( dataSpace + set[ i ] );jQuery
				// support: jQuery 1.6.2jQuery
				// http://bugs.jquery.com/ticket/9917jQuery
				// jQuery 1.6.2 incorrectly returns undefined for any falsy value.jQuery
				// We can't differentiate between "" and 0 here, so we just assumejQuery
				// empty string since it's likely to be a more common value...jQuery
				if ( val === undefined ) {jQuery
					val = "";jQuery
				}jQuery
				element.css( set[ i ], val );jQuery
			}jQuery
		}jQuery
	},jQuery
jQuery
	setMode: function( el, mode ) {jQuery
		if (mode === "toggle") {jQuery
			mode = el.is( ":hidden" ) ? "show" : "hide";jQuery
		}jQuery
		return mode;jQuery
	},jQuery
jQuery
	// Translates a [top,left] array into a baseline valuejQuery
	// this should be a little more flexible in the future to handle a string & hashjQuery
	getBaseline: function( origin, original ) {jQuery
		var y, x;jQuery
		switch ( origin[ 0 ] ) {jQuery
			case "top": y = 0; break;jQuery
			case "middle": y = 0.5; break;jQuery
			case "bottom": y = 1; break;jQuery
			default: y = origin[ 0 ] / original.height;jQuery
		}jQuery
		switch ( origin[ 1 ] ) {jQuery
			case "left": x = 0; break;jQuery
			case "center": x = 0.5; break;jQuery
			case "right": x = 1; break;jQuery
			default: x = origin[ 1 ] / original.width;jQuery
		}jQuery
		return {jQuery
			x: x,jQuery
			y: yjQuery
		};jQuery
	},jQuery
jQuery
	// Wraps the element around a wrapper that copies position propertiesjQuery
	createWrapper: function( element ) {jQuery
jQuery
		// if the element is already wrapped, return itjQuery
		if ( element.parent().is( ".ui-effects-wrapper" )) {jQuery
			return element.parent();jQuery
		}jQuery
jQuery
		// wrap the elementjQuery
		var props = {jQuery
				width: element.outerWidth(true),jQuery
				height: element.outerHeight(true),jQuery
				"float": element.css( "float" )jQuery
			},jQuery
			wrapper = $( "<div></div>" )jQuery
				.addClass( "ui-effects-wrapper" )jQuery
				.css({jQuery
					fontSize: "100%",jQuery
					background: "transparent",jQuery
					border: "none",jQuery
					margin: 0,jQuery
					padding: 0jQuery
				}),jQuery
			// Store the size in case width/height are defined in % - Fixes #5245jQuery
			size = {jQuery
				width: element.width(),jQuery
				height: element.height()jQuery
			},jQuery
			active = document.activeElement;jQuery
jQuery
		// support: FirefoxjQuery
		// Firefox incorrectly exposes anonymous contentjQuery
		// https://bugzilla.mozilla.org/show_bug.cgi?id=561664jQuery
		try {jQuery
			active.id;jQuery
		} catch( e ) {jQuery
			active = document.body;jQuery
		}jQuery
jQuery
		element.wrap( wrapper );jQuery
jQuery
		// Fixes #7595 - Elements lose focus when wrapped.jQuery
		if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {jQuery
			$( active ).focus();jQuery
		}jQuery
jQuery
		wrapper = element.parent(); //Hotfix for jQuery 1.4 since some change in wrap() seems to actually lose the reference to the wrapped elementjQuery
jQuery
		// transfer positioning properties to the wrapperjQuery
		if ( element.css( "position" ) === "static" ) {jQuery
			wrapper.css({ position: "relative" });jQuery
			element.css({ position: "relative" });jQuery
		} else {jQuery
			$.extend( props, {jQuery
				position: element.css( "position" ),jQuery
				zIndex: element.css( "z-index" )jQuery
			});jQuery
			$.each([ "top", "left", "bottom", "right" ], function(i, pos) {jQuery
				props[ pos ] = element.css( pos );jQuery
				if ( isNaN( parseInt( props[ pos ], 10 ) ) ) {jQuery
					props[ pos ] = "auto";jQuery
				}jQuery
			});jQuery
			element.css({jQuery
				position: "relative",jQuery
				top: 0,jQuery
				left: 0,jQuery
				right: "auto",jQuery
				bottom: "auto"jQuery
			});jQuery
		}jQuery
		element.css(size);jQuery
jQuery
		return wrapper.css( props ).show();jQuery
	},jQuery
jQuery
	removeWrapper: function( element ) {jQuery
		var active = document.activeElement;jQuery
jQuery
		if ( element.parent().is( ".ui-effects-wrapper" ) ) {jQuery
			element.parent().replaceWith( element );jQuery
jQuery
			// Fixes #7595 - Elements lose focus when wrapped.jQuery
			if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {jQuery
				$( active ).focus();jQuery
			}jQuery
		}jQuery
jQuery
jQuery
		return element;jQuery
	},jQuery
jQuery
	setTransition: function( element, list, factor, value ) {jQuery
		value = value || {};jQuery
		$.each( list, function( i, x ) {jQuery
			var unit = element.cssUnit( x );jQuery
			if ( unit[ 0 ] > 0 ) {jQuery
				value[ x ] = unit[ 0 ] * factor + unit[ 1 ];jQuery
			}jQuery
		});jQuery
		return value;jQuery
	}jQuery
});jQuery
jQuery
// return an effect options object for the given parameters:jQuery
function _normalizeArguments( effect, options, speed, callback ) {jQuery
jQuery
	// allow passing all options as the first parameterjQuery
	if ( $.isPlainObject( effect ) ) {jQuery
		options = effect;jQuery
		effect = effect.effect;jQuery
	}jQuery
jQuery
	// convert to an objectjQuery
	effect = { effect: effect };jQuery
jQuery
	// catch (effect, null, ...)jQuery
	if ( options == null ) {jQuery
		options = {};jQuery
	}jQuery
jQuery
	// catch (effect, callback)jQuery
	if ( $.isFunction( options ) ) {jQuery
		callback = options;jQuery
		speed = null;jQuery
		options = {};jQuery
	}jQuery
jQuery
	// catch (effect, speed, ?)jQuery
	if ( typeof options === "number" || $.fx.speeds[ options ] ) {jQuery
		callback = speed;jQuery
		speed = options;jQuery
		options = {};jQuery
	}jQuery
jQuery
	// catch (effect, options, callback)jQuery
	if ( $.isFunction( speed ) ) {jQuery
		callback = speed;jQuery
		speed = null;jQuery
	}jQuery
jQuery
	// add options to effectjQuery
	if ( options ) {jQuery
		$.extend( effect, options );jQuery
	}jQuery
jQuery
	speed = speed || options.duration;jQuery
	effect.duration = $.fx.off ? 0 :jQuery
		typeof speed === "number" ? speed :jQuery
		speed in $.fx.speeds ? $.fx.speeds[ speed ] :jQuery
		$.fx.speeds._default;jQuery
jQuery
	effect.complete = callback || options.complete;jQuery
jQuery
	return effect;jQuery
}jQuery
jQuery
function standardAnimationOption( option ) {jQuery
	// Valid standard speeds (nothing, number, named speed)jQuery
	if ( !option || typeof option === "number" || $.fx.speeds[ option ] ) {jQuery
		return true;jQuery
	}jQuery
jQuery
	// Invalid strings - treat as "normal" speedjQuery
	if ( typeof option === "string" && !$.effects.effect[ option ] ) {jQuery
		return true;jQuery
	}jQuery
jQuery
	// Complete callbackjQuery
	if ( $.isFunction( option ) ) {jQuery
		return true;jQuery
	}jQuery
jQuery
	// Options hash (but not naming an effect)jQuery
	if ( typeof option === "object" && !option.effect ) {jQuery
		return true;jQuery
	}jQuery
jQuery
	// Didn't match any standard APIjQuery
	return false;jQuery
}jQuery
jQuery
$.fn.extend({jQuery
	effect: function( /* effect, options, speed, callback */ ) {jQuery
		var args = _normalizeArguments.apply( this, arguments ),jQuery
			mode = args.mode,jQuery
			queue = args.queue,jQuery
			effectMethod = $.effects.effect[ args.effect ];jQuery
jQuery
		if ( $.fx.off || !effectMethod ) {jQuery
			// delegate to the original method (e.g., .show()) if possiblejQuery
			if ( mode ) {jQuery
				return this[ mode ]( args.duration, args.complete );jQuery
			} else {jQuery
				return this.each( function() {jQuery
					if ( args.complete ) {jQuery
						args.complete.call( this );jQuery
					}jQuery
				});jQuery
			}jQuery
		}jQuery
jQuery
		function run( next ) {jQuery
			var elem = $( this ),jQuery
				complete = args.complete,jQuery
				mode = args.mode;jQuery
jQuery
			function done() {jQuery
				if ( $.isFunction( complete ) ) {jQuery
					complete.call( elem[0] );jQuery
				}jQuery
				if ( $.isFunction( next ) ) {jQuery
					next();jQuery
				}jQuery
			}jQuery
jQuery
			// If the element already has the correct final state, delegate tojQuery
			// the core methods so the internal tracking of "olddisplay" works.jQuery
			if ( elem.is( ":hidden" ) ? mode === "hide" : mode === "show" ) {jQuery
				elem[ mode ]();jQuery
				done();jQuery
			} else {jQuery
				effectMethod.call( elem[0], args, done );jQuery
			}jQuery
		}jQuery
jQuery
		return queue === false ? this.each( run ) : this.queue( queue || "fx", run );jQuery
	},jQuery
jQuery
	show: (function( orig ) {jQuery
		return function( option ) {jQuery
			if ( standardAnimationOption( option ) ) {jQuery
				return orig.apply( this, arguments );jQuery
			} else {jQuery
				var args = _normalizeArguments.apply( this, arguments );jQuery
				args.mode = "show";jQuery
				return this.effect.call( this, args );jQuery
			}jQuery
		};jQuery
	})( $.fn.show ),jQuery
jQuery
	hide: (function( orig ) {jQuery
		return function( option ) {jQuery
			if ( standardAnimationOption( option ) ) {jQuery
				return orig.apply( this, arguments );jQuery
			} else {jQuery
				var args = _normalizeArguments.apply( this, arguments );jQuery
				args.mode = "hide";jQuery
				return this.effect.call( this, args );jQuery
			}jQuery
		};jQuery
	})( $.fn.hide ),jQuery
jQuery
	toggle: (function( orig ) {jQuery
		return function( option ) {jQuery
			if ( standardAnimationOption( option ) || typeof option === "boolean" ) {jQuery
				return orig.apply( this, arguments );jQuery
			} else {jQuery
				var args = _normalizeArguments.apply( this, arguments );jQuery
				args.mode = "toggle";jQuery
				return this.effect.call( this, args );jQuery
			}jQuery
		};jQuery
	})( $.fn.toggle ),jQuery
jQuery
	// helper functionsjQuery
	cssUnit: function(key) {jQuery
		var style = this.css( key ),jQuery
			val = [];jQuery
jQuery
		$.each( [ "em", "px", "%", "pt" ], function( i, unit ) {jQuery
			if ( style.indexOf( unit ) > 0 ) {jQuery
				val = [ parseFloat( style ), unit ];jQuery
			}jQuery
		});jQuery
		return val;jQuery
	}jQuery
});jQuery
jQuery
})();jQuery
jQuery
/******************************************************************************/jQuery
/*********************************** EASING ***********************************/jQuery
/******************************************************************************/jQuery
jQuery
(function() {jQuery
jQuery
// based on easing equations from Robert Penner (http://www.robertpenner.com/easing)jQuery
jQuery
var baseEasings = {};jQuery
jQuery
$.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {jQuery
	baseEasings[ name ] = function( p ) {jQuery
		return Math.pow( p, i + 2 );jQuery
	};jQuery
});jQuery
jQuery
$.extend( baseEasings, {jQuery
	Sine: function ( p ) {jQuery
		return 1 - Math.cos( p * Math.PI / 2 );jQuery
	},jQuery
	Circ: function ( p ) {jQuery
		return 1 - Math.sqrt( 1 - p * p );jQuery
	},jQuery
	Elastic: function( p ) {jQuery
		return p === 0 || p === 1 ? p :jQuery
			-Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );jQuery
	},jQuery
	Back: function( p ) {jQuery
		return p * p * ( 3 * p - 2 );jQuery
	},jQuery
	Bounce: function ( p ) {jQuery
		var pow2,jQuery
			bounce = 4;jQuery
jQuery
		while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}jQuery
		return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );jQuery
	}jQuery
});jQuery
jQuery
$.each( baseEasings, function( name, easeIn ) {jQuery
	$.easing[ "easeIn" + name ] = easeIn;jQuery
	$.easing[ "easeOut" + name ] = function( p ) {jQuery
		return 1 - easeIn( 1 - p );jQuery
	};jQuery
	$.easing[ "easeInOut" + name ] = function( p ) {jQuery
		return p < 0.5 ?jQuery
			easeIn( p * 2 ) / 2 :jQuery
			1 - easeIn( p * -2 + 2 ) / 2;jQuery
	};jQuery
});jQuery
jQuery
})();jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
var rvertical = /up|down|vertical/,jQuery
	rpositivemotion = /up|left|vertical|horizontal/;jQuery
jQuery
$.effects.effect.blind = function( o, done ) {jQuery
	// Create elementjQuery
	var el = $( this ),jQuery
		props = [ "position", "top", "bottom", "left", "right", "height", "width" ],jQuery
		mode = $.effects.setMode( el, o.mode || "hide" ),jQuery
		direction = o.direction || "up",jQuery
		vertical = rvertical.test( direction ),jQuery
		ref = vertical ? "height" : "width",jQuery
		ref2 = vertical ? "top" : "left",jQuery
		motion = rpositivemotion.test( direction ),jQuery
		animation = {},jQuery
		show = mode === "show",jQuery
		wrapper, distance, margin;jQuery
jQuery
	// if already wrapped, the wrapper's properties are my property. #6245jQuery
	if ( el.parent().is( ".ui-effects-wrapper" ) ) {jQuery
		$.effects.save( el.parent(), props );jQuery
	} else {jQuery
		$.effects.save( el, props );jQuery
	}jQuery
	el.show();jQuery
	wrapper = $.effects.createWrapper( el ).css({jQuery
		overflow: "hidden"jQuery
	});jQuery
jQuery
	distance = wrapper[ ref ]();jQuery
	margin = parseFloat( wrapper.css( ref2 ) ) || 0;jQuery
jQuery
	animation[ ref ] = show ? distance : 0;jQuery
	if ( !motion ) {jQuery
		eljQuery
			.css( vertical ? "bottom" : "right", 0 )jQuery
			.css( vertical ? "top" : "left", "auto" )jQuery
			.css({ position: "absolute" });jQuery
jQuery
		animation[ ref2 ] = show ? margin : distance + margin;jQuery
	}jQuery
jQuery
	// start at 0 if we are showingjQuery
	if ( show ) {jQuery
		wrapper.css( ref, 0 );jQuery
		if ( ! motion ) {jQuery
			wrapper.css( ref2, margin + distance );jQuery
		}jQuery
	}jQuery
jQuery
	// AnimatejQuery
	wrapper.animate( animation, {jQuery
		duration: o.duration,jQuery
		easing: o.easing,jQuery
		queue: false,jQuery
		complete: function() {jQuery
			if ( mode === "hide" ) {jQuery
				el.hide();jQuery
			}jQuery
			$.effects.restore( el, props );jQuery
			$.effects.removeWrapper( el );jQuery
			done();jQuery
		}jQuery
	});jQuery
jQuery
};jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.effects.effect.bounce = function( o, done ) {jQuery
	var el = $( this ),jQuery
		props = [ "position", "top", "bottom", "left", "right", "height", "width" ],jQuery
jQuery
		// defaults:jQuery
		mode = $.effects.setMode( el, o.mode || "effect" ),jQuery
		hide = mode === "hide",jQuery
		show = mode === "show",jQuery
		direction = o.direction || "up",jQuery
		distance = o.distance,jQuery
		times = o.times || 5,jQuery
jQuery
		// number of internal animationsjQuery
		anims = times * 2 + ( show || hide ? 1 : 0 ),jQuery
		speed = o.duration / anims,jQuery
		easing = o.easing,jQuery
jQuery
		// utility:jQuery
		ref = ( direction === "up" || direction === "down" ) ? "top" : "left",jQuery
		motion = ( direction === "up" || direction === "left" ),jQuery
		i,jQuery
		upAnim,jQuery
		downAnim,jQuery
jQuery
		// we will need to re-assemble the queue to stack our animations in placejQuery
		queue = el.queue(),jQuery
		queuelen = queue.length;jQuery
jQuery
	// Avoid touching opacity to prevent clearType and PNG issues in IEjQuery
	if ( show || hide ) {jQuery
		props.push( "opacity" );jQuery
	}jQuery
jQuery
	$.effects.save( el, props );jQuery
	el.show();jQuery
	$.effects.createWrapper( el ); // Create WrapperjQuery
jQuery
	// default distance for the BIGGEST bounce is the outer Distance / 3jQuery
	if ( !distance ) {jQuery
		distance = el[ ref === "top" ? "outerHeight" : "outerWidth" ]() / 3;jQuery
	}jQuery
jQuery
	if ( show ) {jQuery
		downAnim = { opacity: 1 };jQuery
		downAnim[ ref ] = 0;jQuery
jQuery
		// if we are showing, force opacity 0 and set the initial positionjQuery
		// then do the "first" animationjQuery
		el.css( "opacity", 0 )jQuery
			.css( ref, motion ? -distance * 2 : distance * 2 )jQuery
			.animate( downAnim, speed, easing );jQuery
	}jQuery
jQuery
	// start at the smallest distance if we are hidingjQuery
	if ( hide ) {jQuery
		distance = distance / Math.pow( 2, times - 1 );jQuery
	}jQuery
jQuery
	downAnim = {};jQuery
	downAnim[ ref ] = 0;jQuery
	// Bounces up/down/left/right then back to 0 -- times * 2 animations happen herejQuery
	for ( i = 0; i < times; i++ ) {jQuery
		upAnim = {};jQuery
		upAnim[ ref ] = ( motion ? "-=" : "+=" ) + distance;jQuery
jQuery
		el.animate( upAnim, speed, easing )jQuery
			.animate( downAnim, speed, easing );jQuery
jQuery
		distance = hide ? distance * 2 : distance / 2;jQuery
	}jQuery
jQuery
	// Last Bounce when HidingjQuery
	if ( hide ) {jQuery
		upAnim = { opacity: 0 };jQuery
		upAnim[ ref ] = ( motion ? "-=" : "+=" ) + distance;jQuery
jQuery
		el.animate( upAnim, speed, easing );jQuery
	}jQuery
jQuery
	el.queue(function() {jQuery
		if ( hide ) {jQuery
			el.hide();jQuery
		}jQuery
		$.effects.restore( el, props );jQuery
		$.effects.removeWrapper( el );jQuery
		done();jQuery
	});jQuery
jQuery
	// inject all the animations we just queued to be first in line (after "inprogress")jQuery
	if ( queuelen > 1) {jQuery
		queue.splice.apply( queue,jQuery
			[ 1, 0 ].concat( queue.splice( queuelen, anims + 1 ) ) );jQuery
	}jQuery
	el.dequeue();jQuery
jQuery
};jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.effects.effect.clip = function( o, done ) {jQuery
	// Create elementjQuery
	var el = $( this ),jQuery
		props = [ "position", "top", "bottom", "left", "right", "height", "width" ],jQuery
		mode = $.effects.setMode( el, o.mode || "hide" ),jQuery
		show = mode === "show",jQuery
		direction = o.direction || "vertical",jQuery
		vert = direction === "vertical",jQuery
		size = vert ? "height" : "width",jQuery
		position = vert ? "top" : "left",jQuery
		animation = {},jQuery
		wrapper, animate, distance;jQuery
jQuery
	// Save & ShowjQuery
	$.effects.save( el, props );jQuery
	el.show();jQuery
jQuery
	// Create WrapperjQuery
	wrapper = $.effects.createWrapper( el ).css({jQuery
		overflow: "hidden"jQuery
	});jQuery
	animate = ( el[0].tagName === "IMG" ) ? wrapper : el;jQuery
	distance = animate[ size ]();jQuery
jQuery
	// ShiftjQuery
	if ( show ) {jQuery
		animate.css( size, 0 );jQuery
		animate.css( position, distance / 2 );jQuery
	}jQuery
jQuery
	// Create Animation Object:jQuery
	animation[ size ] = show ? distance : 0;jQuery
	animation[ position ] = show ? 0 : distance / 2;jQuery
jQuery
	// AnimatejQuery
	animate.animate( animation, {jQuery
		queue: false,jQuery
		duration: o.duration,jQuery
		easing: o.easing,jQuery
		complete: function() {jQuery
			if ( !show ) {jQuery
				el.hide();jQuery
			}jQuery
			$.effects.restore( el, props );jQuery
			$.effects.removeWrapper( el );jQuery
			done();jQuery
		}jQuery
	});jQuery
jQuery
};jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.effects.effect.drop = function( o, done ) {jQuery
jQuery
	var el = $( this ),jQuery
		props = [ "position", "top", "bottom", "left", "right", "opacity", "height", "width" ],jQuery
		mode = $.effects.setMode( el, o.mode || "hide" ),jQuery
		show = mode === "show",jQuery
		direction = o.direction || "left",jQuery
		ref = ( direction === "up" || direction === "down" ) ? "top" : "left",jQuery
		motion = ( direction === "up" || direction === "left" ) ? "pos" : "neg",jQuery
		animation = {jQuery
			opacity: show ? 1 : 0jQuery
		},jQuery
		distance;jQuery
jQuery
	// AdjustjQuery
	$.effects.save( el, props );jQuery
	el.show();jQuery
	$.effects.createWrapper( el );jQuery
jQuery
	distance = o.distance || el[ ref === "top" ? "outerHeight": "outerWidth" ]( true ) / 2;jQuery
jQuery
	if ( show ) {jQuery
		eljQuery
			.css( "opacity", 0 )jQuery
			.css( ref, motion === "pos" ? -distance : distance );jQuery
	}jQuery
jQuery
	// AnimationjQuery
	animation[ ref ] = ( show ?jQuery
		( motion === "pos" ? "+=" : "-=" ) :jQuery
		( motion === "pos" ? "-=" : "+=" ) ) +jQuery
		distance;jQuery
jQuery
	// AnimatejQuery
	el.animate( animation, {jQuery
		queue: false,jQuery
		duration: o.duration,jQuery
		easing: o.easing,jQuery
		complete: function() {jQuery
			if ( mode === "hide" ) {jQuery
				el.hide();jQuery
			}jQuery
			$.effects.restore( el, props );jQuery
			$.effects.removeWrapper( el );jQuery
			done();jQuery
		}jQuery
	});jQuery
};jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.effects.effect.explode = function( o, done ) {jQuery
jQuery
	var rows = o.pieces ? Math.round( Math.sqrt( o.pieces ) ) : 3,jQuery
		cells = rows,jQuery
		el = $( this ),jQuery
		mode = $.effects.setMode( el, o.mode || "hide" ),jQuery
		show = mode === "show",jQuery
jQuery
		// show and then visibility:hidden the element before calculating offsetjQuery
		offset = el.show().css( "visibility", "hidden" ).offset(),jQuery
jQuery
		// width and height of a piecejQuery
		width = Math.ceil( el.outerWidth() / cells ),jQuery
		height = Math.ceil( el.outerHeight() / rows ),jQuery
		pieces = [],jQuery
jQuery
		// loopjQuery
		i, j, left, top, mx, my;jQuery
jQuery
	// children animate complete:jQuery
	function childComplete() {jQuery
		pieces.push( this );jQuery
		if ( pieces.length === rows * cells ) {jQuery
			animComplete();jQuery
		}jQuery
	}jQuery
jQuery
	// clone the element for each row and cell.jQuery
	for( i = 0; i < rows ; i++ ) { // ===>jQuery
		top = offset.top + i * height;jQuery
		my = i - ( rows - 1 ) / 2 ;jQuery
jQuery
		for( j = 0; j < cells ; j++ ) { // |||jQuery
			left = offset.left + j * width;jQuery
			mx = j - ( cells - 1 ) / 2 ;jQuery
jQuery
			// Create a clone of the now hidden main element that will be absolute positionedjQuery
			// within a wrapper div off the -left and -top equal to size of our piecesjQuery
			eljQuery
				.clone()jQuery
				.appendTo( "body" )jQuery
				.wrap( "<div></div>" )jQuery
				.css({jQuery
					position: "absolute",jQuery
					visibility: "visible",jQuery
					left: -j * width,jQuery
					top: -i * heightjQuery
				})jQuery
jQuery
			// select the wrapper - make it overflow: hidden and absolute positioned based onjQuery
			// where the original was located +left and +top equal to the size of piecesjQuery
				.parent()jQuery
				.addClass( "ui-effects-explode" )jQuery
				.css({jQuery
					position: "absolute",jQuery
					overflow: "hidden",jQuery
					width: width,jQuery
					height: height,jQuery
					left: left + ( show ? mx * width : 0 ),jQuery
					top: top + ( show ? my * height : 0 ),jQuery
					opacity: show ? 0 : 1jQuery
				}).animate({jQuery
					left: left + ( show ? 0 : mx * width ),jQuery
					top: top + ( show ? 0 : my * height ),jQuery
					opacity: show ? 1 : 0jQuery
				}, o.duration || 500, o.easing, childComplete );jQuery
		}jQuery
	}jQuery
jQuery
	function animComplete() {jQuery
		el.css({jQuery
			visibility: "visible"jQuery
		});jQuery
		$( pieces ).remove();jQuery
		if ( !show ) {jQuery
			el.hide();jQuery
		}jQuery
		done();jQuery
	}jQuery
};jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.effects.effect.fade = function( o, done ) {jQuery
	var el = $( this ),jQuery
		mode = $.effects.setMode( el, o.mode || "toggle" );jQuery
jQuery
	el.animate({jQuery
		opacity: modejQuery
	}, {jQuery
		queue: false,jQuery
		duration: o.duration,jQuery
		easing: o.easing,jQuery
		complete: donejQuery
	});jQuery
};jQuery
jQuery
})( jQuery );jQuery
(function( $, undefined ) {jQuery
jQuery
$.effects.effect.fold = function( o, done ) {jQuery
jQuery
	// Create elementjQuery
	var el = $( this ),jQuery
		props = [ "position", "top", "bottom", "left", "right", "height", "width" ],jQuery
		mode = $.effects.setMode( el, o.mode || "hide" ),jQuery
		show = mode === "show",jQuery
		hide = mode === "hide",jQuery
		size = o.size || 15,jQuery
		percent = /([0-9]+)%/.exec( size ),jQuery
		horizFirst = !!o.horizFirst,jQuery
		widthFirst = show !== horizFirst,jQuery
		ref = widthFirst ? [ "width", "height" ] : [ "height", "width" ],jQuery
		duration = o.duration / 2,jQuery
		wrapper, distance,jQuery
		animation1 = {},jQuery
		animation2 = {};jQuery
jQuery
	$.effects.save( el, props );jQuery
	el.show();jQuery
jQuery
	// Create WrapperjQuery
	wrapper = $.effects.createWrapper( el ).css({jQuery
		overflow: "hidden"jQuery
	});jQuery
	distance = widthFirst ?jQuery
		[ wrapper.width(), wrapper.height() ] :jQuery
		[ wrapper.height(), wrapper.width() ];jQuery
jQuery
	if ( percent ) {jQuery
		size = parseInt( percent[ 1 ], 10 ) / 100 * distance[ hide ? 0 : 1 ];jQuery
	}jQuery
	if ( show ) {jQuery
		wrapper.css( horizFirst ? {jQuery
			height: 0,jQuery
			width: sizejQuery
		} : {jQuery
			height: size,jQuery
			width: 0jQuery
		});jQuery
	}jQuery
jQuery
	// AnimationjQuery
	animation1[ ref[ 0 ] ] = show ? distance[ 0 ] : size;jQuery
	animation2[ ref[ 1 ] ] = show ? distance[ 1 ] : 0;jQuery
jQuery
	// AnimatejQuery
	wrapperjQuery
		.animate( animation1, duration, o.easing )jQuery
		.animate( animation2, duration, o.easing, function() {jQuery
			if ( hide ) {jQuery
				el.hide();jQuery
			}jQuery
			$.effects.restore( el, props );jQuery
			$.effects.removeWrapper( el );jQuery
			done();jQuery
		});jQuery
jQuery
};jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.effects.effect.highlight = function( o, done ) {jQuery
	var elem = $( this ),jQuery
		props = [ "backgroundImage", "backgroundColor", "opacity" ],jQuery
		mode = $.effects.setMode( elem, o.mode || "show" ),jQuery
		animation = {jQuery
			backgroundColor: elem.css( "backgroundColor" )jQuery
		};jQuery
jQuery
	if (mode === "hide") {jQuery
		animation.opacity = 0;jQuery
	}jQuery
jQuery
	$.effects.save( elem, props );jQuery
jQuery
	elemjQuery
		.show()jQuery
		.css({jQuery
			backgroundImage: "none",jQuery
			backgroundColor: o.color || "#ffff99"jQuery
		})jQuery
		.animate( animation, {jQuery
			queue: false,jQuery
			duration: o.duration,jQuery
			easing: o.easing,jQuery
			complete: function() {jQuery
				if ( mode === "hide" ) {jQuery
					elem.hide();jQuery
				}jQuery
				$.effects.restore( elem, props );jQuery
				done();jQuery
			}jQuery
		});jQuery
};jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.effects.effect.pulsate = function( o, done ) {jQuery
	var elem = $( this ),jQuery
		mode = $.effects.setMode( elem, o.mode || "show" ),jQuery
		show = mode === "show",jQuery
		hide = mode === "hide",jQuery
		showhide = ( show || mode === "hide" ),jQuery
jQuery
		// showing or hiding leaves of the "last" animationjQuery
		anims = ( ( o.times || 5 ) * 2 ) + ( showhide ? 1 : 0 ),jQuery
		duration = o.duration / anims,jQuery
		animateTo = 0,jQuery
		queue = elem.queue(),jQuery
		queuelen = queue.length,jQuery
		i;jQuery
jQuery
	if ( show || !elem.is(":visible")) {jQuery
		elem.css( "opacity", 0 ).show();jQuery
		animateTo = 1;jQuery
	}jQuery
jQuery
	// anims - 1 opacity "toggles"jQuery
	for ( i = 1; i < anims; i++ ) {jQuery
		elem.animate({jQuery
			opacity: animateTojQuery
		}, duration, o.easing );jQuery
		animateTo = 1 - animateTo;jQuery
	}jQuery
jQuery
	elem.animate({jQuery
		opacity: animateTojQuery
	}, duration, o.easing);jQuery
jQuery
	elem.queue(function() {jQuery
		if ( hide ) {jQuery
			elem.hide();jQuery
		}jQuery
		done();jQuery
	});jQuery
jQuery
	// We just queued up "anims" animations, we need to put them next in the queuejQuery
	if ( queuelen > 1 ) {jQuery
		queue.splice.apply( queue,jQuery
			[ 1, 0 ].concat( queue.splice( queuelen, anims + 1 ) ) );jQuery
	}jQuery
	elem.dequeue();jQuery
};jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.effects.effect.puff = function( o, done ) {jQuery
	var elem = $( this ),jQuery
		mode = $.effects.setMode( elem, o.mode || "hide" ),jQuery
		hide = mode === "hide",jQuery
		percent = parseInt( o.percent, 10 ) || 150,jQuery
		factor = percent / 100,jQuery
		original = {jQuery
			height: elem.height(),jQuery
			width: elem.width(),jQuery
			outerHeight: elem.outerHeight(),jQuery
			outerWidth: elem.outerWidth()jQuery
		};jQuery
jQuery
	$.extend( o, {jQuery
		effect: "scale",jQuery
		queue: false,jQuery
		fade: true,jQuery
		mode: mode,jQuery
		complete: done,jQuery
		percent: hide ? percent : 100,jQuery
		from: hide ?jQuery
			original :jQuery
			{jQuery
				height: original.height * factor,jQuery
				width: original.width * factor,jQuery
				outerHeight: original.outerHeight * factor,jQuery
				outerWidth: original.outerWidth * factorjQuery
			}jQuery
	});jQuery
jQuery
	elem.effect( o );jQuery
};jQuery
jQuery
$.effects.effect.scale = function( o, done ) {jQuery
jQuery
	// Create elementjQuery
	var el = $( this ),jQuery
		options = $.extend( true, {}, o ),jQuery
		mode = $.effects.setMode( el, o.mode || "effect" ),jQuery
		percent = parseInt( o.percent, 10 ) ||jQuery
			( parseInt( o.percent, 10 ) === 0 ? 0 : ( mode === "hide" ? 0 : 100 ) ),jQuery
		direction = o.direction || "both",jQuery
		origin = o.origin,jQuery
		original = {jQuery
			height: el.height(),jQuery
			width: el.width(),jQuery
			outerHeight: el.outerHeight(),jQuery
			outerWidth: el.outerWidth()jQuery
		},jQuery
		factor = {jQuery
			y: direction !== "horizontal" ? (percent / 100) : 1,jQuery
			x: direction !== "vertical" ? (percent / 100) : 1jQuery
		};jQuery
jQuery
	// We are going to pass this effect to the size effect:jQuery
	options.effect = "size";jQuery
	options.queue = false;jQuery
	options.complete = done;jQuery
jQuery
	// Set default origin and restore for show/hidejQuery
	if ( mode !== "effect" ) {jQuery
		options.origin = origin || ["middle","center"];jQuery
		options.restore = true;jQuery
	}jQuery
jQuery
	options.from = o.from || ( mode === "show" ? {jQuery
		height: 0,jQuery
		width: 0,jQuery
		outerHeight: 0,jQuery
		outerWidth: 0jQuery
	} : original );jQuery
	options.to = {jQuery
		height: original.height * factor.y,jQuery
		width: original.width * factor.x,jQuery
		outerHeight: original.outerHeight * factor.y,jQuery
		outerWidth: original.outerWidth * factor.xjQuery
	};jQuery
jQuery
	// Fade option to support puffjQuery
	if ( options.fade ) {jQuery
		if ( mode === "show" ) {jQuery
			options.from.opacity = 0;jQuery
			options.to.opacity = 1;jQuery
		}jQuery
		if ( mode === "hide" ) {jQuery
			options.from.opacity = 1;jQuery
			options.to.opacity = 0;jQuery
		}jQuery
	}jQuery
jQuery
	// AnimatejQuery
	el.effect( options );jQuery
jQuery
};jQuery
jQuery
$.effects.effect.size = function( o, done ) {jQuery
jQuery
	// Create elementjQuery
	var original, baseline, factor,jQuery
		el = $( this ),jQuery
		props0 = [ "position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity" ],jQuery
jQuery
		// Always restorejQuery
		props1 = [ "position", "top", "bottom", "left", "right", "overflow", "opacity" ],jQuery
jQuery
		// Copy for childrenjQuery
		props2 = [ "width", "height", "overflow" ],jQuery
		cProps = [ "fontSize" ],jQuery
		vProps = [ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ],jQuery
		hProps = [ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ],jQuery
jQuery
		// Set optionsjQuery
		mode = $.effects.setMode( el, o.mode || "effect" ),jQuery
		restore = o.restore || mode !== "effect",jQuery
		scale = o.scale || "both",jQuery
		origin = o.origin || [ "middle", "center" ],jQuery
		position = el.css( "position" ),jQuery
		props = restore ? props0 : props1,jQuery
		zero = {jQuery
			height: 0,jQuery
			width: 0,jQuery
			outerHeight: 0,jQuery
			outerWidth: 0jQuery
		};jQuery
jQuery
	if ( mode === "show" ) {jQuery
		el.show();jQuery
	}jQuery
	original = {jQuery
		height: el.height(),jQuery
		width: el.width(),jQuery
		outerHeight: el.outerHeight(),jQuery
		outerWidth: el.outerWidth()jQuery
	};jQuery
jQuery
	if ( o.mode === "toggle" && mode === "show" ) {jQuery
		el.from = o.to || zero;jQuery
		el.to = o.from || original;jQuery
	} else {jQuery
		el.from = o.from || ( mode === "show" ? zero : original );jQuery
		el.to = o.to || ( mode === "hide" ? zero : original );jQuery
	}jQuery
jQuery
	// Set scaling factorjQuery
	factor = {jQuery
		from: {jQuery
			y: el.from.height / original.height,jQuery
			x: el.from.width / original.widthjQuery
		},jQuery
		to: {jQuery
			y: el.to.height / original.height,jQuery
			x: el.to.width / original.widthjQuery
		}jQuery
	};jQuery
jQuery
	// Scale the css boxjQuery
	if ( scale === "box" || scale === "both" ) {jQuery
jQuery
		// Vertical props scalingjQuery
		if ( factor.from.y !== factor.to.y ) {jQuery
			props = props.concat( vProps );jQuery
			el.from = $.effects.setTransition( el, vProps, factor.from.y, el.from );jQuery
			el.to = $.effects.setTransition( el, vProps, factor.to.y, el.to );jQuery
		}jQuery
jQuery
		// Horizontal props scalingjQuery
		if ( factor.from.x !== factor.to.x ) {jQuery
			props = props.concat( hProps );jQuery
			el.from = $.effects.setTransition( el, hProps, factor.from.x, el.from );jQuery
			el.to = $.effects.setTransition( el, hProps, factor.to.x, el.to );jQuery
		}jQuery
	}jQuery
jQuery
	// Scale the contentjQuery
	if ( scale === "content" || scale === "both" ) {jQuery
jQuery
		// Vertical props scalingjQuery
		if ( factor.from.y !== factor.to.y ) {jQuery
			props = props.concat( cProps ).concat( props2 );jQuery
			el.from = $.effects.setTransition( el, cProps, factor.from.y, el.from );jQuery
			el.to = $.effects.setTransition( el, cProps, factor.to.y, el.to );jQuery
		}jQuery
	}jQuery
jQuery
	$.effects.save( el, props );jQuery
	el.show();jQuery
	$.effects.createWrapper( el );jQuery
	el.css( "overflow", "hidden" ).css( el.from );jQuery
jQuery
	// AdjustjQuery
	if (origin) { // Calculate baseline shiftsjQuery
		baseline = $.effects.getBaseline( origin, original );jQuery
		el.from.top = ( original.outerHeight - el.outerHeight() ) * baseline.y;jQuery
		el.from.left = ( original.outerWidth - el.outerWidth() ) * baseline.x;jQuery
		el.to.top = ( original.outerHeight - el.to.outerHeight ) * baseline.y;jQuery
		el.to.left = ( original.outerWidth - el.to.outerWidth ) * baseline.x;jQuery
	}jQuery
	el.css( el.from ); // set top & leftjQuery
jQuery
	// AnimatejQuery
	if ( scale === "content" || scale === "both" ) { // Scale the childrenjQuery
jQuery
		// Add margins/font-sizejQuery
		vProps = vProps.concat([ "marginTop", "marginBottom" ]).concat(cProps);jQuery
		hProps = hProps.concat([ "marginLeft", "marginRight" ]);jQuery
		props2 = props0.concat(vProps).concat(hProps);jQuery
jQuery
		el.find( "*[width]" ).each( function(){jQuery
			var child = $( this ),jQuery
				c_original = {jQuery
					height: child.height(),jQuery
					width: child.width(),jQuery
					outerHeight: child.outerHeight(),jQuery
					outerWidth: child.outerWidth()jQuery
				};jQuery
			if (restore) {jQuery
				$.effects.save(child, props2);jQuery
			}jQuery
jQuery
			child.from = {jQuery
				height: c_original.height * factor.from.y,jQuery
				width: c_original.width * factor.from.x,jQuery
				outerHeight: c_original.outerHeight * factor.from.y,jQuery
				outerWidth: c_original.outerWidth * factor.from.xjQuery
			};jQuery
			child.to = {jQuery
				height: c_original.height * factor.to.y,jQuery
				width: c_original.width * factor.to.x,jQuery
				outerHeight: c_original.height * factor.to.y,jQuery
				outerWidth: c_original.width * factor.to.xjQuery
			};jQuery
jQuery
			// Vertical props scalingjQuery
			if ( factor.from.y !== factor.to.y ) {jQuery
				child.from = $.effects.setTransition( child, vProps, factor.from.y, child.from );jQuery
				child.to = $.effects.setTransition( child, vProps, factor.to.y, child.to );jQuery
			}jQuery
jQuery
			// Horizontal props scalingjQuery
			if ( factor.from.x !== factor.to.x ) {jQuery
				child.from = $.effects.setTransition( child, hProps, factor.from.x, child.from );jQuery
				child.to = $.effects.setTransition( child, hProps, factor.to.x, child.to );jQuery
			}jQuery
jQuery
			// Animate childrenjQuery
			child.css( child.from );jQuery
			child.animate( child.to, o.duration, o.easing, function() {jQuery
jQuery
				// Restore childrenjQuery
				if ( restore ) {jQuery
					$.effects.restore( child, props2 );jQuery
				}jQuery
			});jQuery
		});jQuery
	}jQuery
jQuery
	// AnimatejQuery
	el.animate( el.to, {jQuery
		queue: false,jQuery
		duration: o.duration,jQuery
		easing: o.easing,jQuery
		complete: function() {jQuery
			if ( el.to.opacity === 0 ) {jQuery
				el.css( "opacity", el.from.opacity );jQuery
			}jQuery
			if( mode === "hide" ) {jQuery
				el.hide();jQuery
			}jQuery
			$.effects.restore( el, props );jQuery
			if ( !restore ) {jQuery
jQuery
				// we need to calculate our new positioning based on the scalingjQuery
				if ( position === "static" ) {jQuery
					el.css({jQuery
						position: "relative",jQuery
						top: el.to.top,jQuery
						left: el.to.leftjQuery
					});jQuery
				} else {jQuery
					$.each([ "top", "left" ], function( idx, pos ) {jQuery
						el.css( pos, function( _, str ) {jQuery
							var val = parseInt( str, 10 ),jQuery
								toRef = idx ? el.to.left : el.to.top;jQuery
jQuery
							// if original was "auto", recalculate the new value from wrapperjQuery
							if ( str === "auto" ) {jQuery
								return toRef + "px";jQuery
							}jQuery
jQuery
							return val + toRef + "px";jQuery
						});jQuery
					});jQuery
				}jQuery
			}jQuery
jQuery
			$.effects.removeWrapper( el );jQuery
			done();jQuery
		}jQuery
	});jQuery
jQuery
};jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.effects.effect.shake = function( o, done ) {jQuery
jQuery
	var el = $( this ),jQuery
		props = [ "position", "top", "bottom", "left", "right", "height", "width" ],jQuery
		mode = $.effects.setMode( el, o.mode || "effect" ),jQuery
		direction = o.direction || "left",jQuery
		distance = o.distance || 20,jQuery
		times = o.times || 3,jQuery
		anims = times * 2 + 1,jQuery
		speed = Math.round(o.duration/anims),jQuery
		ref = (direction === "up" || direction === "down") ? "top" : "left",jQuery
		positiveMotion = (direction === "up" || direction === "left"),jQuery
		animation = {},jQuery
		animation1 = {},jQuery
		animation2 = {},jQuery
		i,jQuery
jQuery
		// we will need to re-assemble the queue to stack our animations in placejQuery
		queue = el.queue(),jQuery
		queuelen = queue.length;jQuery
jQuery
	$.effects.save( el, props );jQuery
	el.show();jQuery
	$.effects.createWrapper( el );jQuery
jQuery
	// AnimationjQuery
	animation[ ref ] = ( positiveMotion ? "-=" : "+=" ) + distance;jQuery
	animation1[ ref ] = ( positiveMotion ? "+=" : "-=" ) + distance * 2;jQuery
	animation2[ ref ] = ( positiveMotion ? "-=" : "+=" ) + distance * 2;jQuery
jQuery
	// AnimatejQuery
	el.animate( animation, speed, o.easing );jQuery
jQuery
	// ShakesjQuery
	for ( i = 1; i < times; i++ ) {jQuery
		el.animate( animation1, speed, o.easing ).animate( animation2, speed, o.easing );jQuery
	}jQuery
	eljQuery
		.animate( animation1, speed, o.easing )jQuery
		.animate( animation, speed / 2, o.easing )jQuery
		.queue(function() {jQuery
			if ( mode === "hide" ) {jQuery
				el.hide();jQuery
			}jQuery
			$.effects.restore( el, props );jQuery
			$.effects.removeWrapper( el );jQuery
			done();jQuery
		});jQuery
jQuery
	// inject all the animations we just queued to be first in line (after "inprogress")jQuery
	if ( queuelen > 1) {jQuery
		queue.splice.apply( queue,jQuery
			[ 1, 0 ].concat( queue.splice( queuelen, anims + 1 ) ) );jQuery
	}jQuery
	el.dequeue();jQuery
jQuery
};jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.effects.effect.slide = function( o, done ) {jQuery
jQuery
	// Create elementjQuery
	var el = $( this ),jQuery
		props = [ "position", "top", "bottom", "left", "right", "width", "height" ],jQuery
		mode = $.effects.setMode( el, o.mode || "show" ),jQuery
		show = mode === "show",jQuery
		direction = o.direction || "left",jQuery
		ref = (direction === "up" || direction === "down") ? "top" : "left",jQuery
		positiveMotion = (direction === "up" || direction === "left"),jQuery
		distance,jQuery
		animation = {};jQuery
jQuery
	// AdjustjQuery
	$.effects.save( el, props );jQuery
	el.show();jQuery
	distance = o.distance || el[ ref === "top" ? "outerHeight" : "outerWidth" ]( true );jQuery
jQuery
	$.effects.createWrapper( el ).css({jQuery
		overflow: "hidden"jQuery
	});jQuery
jQuery
	if ( show ) {jQuery
		el.css( ref, positiveMotion ? (isNaN(distance) ? "-" + distance : -distance) : distance );jQuery
	}jQuery
jQuery
	// AnimationjQuery
	animation[ ref ] = ( show ?jQuery
		( positiveMotion ? "+=" : "-=") :jQuery
		( positiveMotion ? "-=" : "+=")) +jQuery
		distance;jQuery
jQuery
	// AnimatejQuery
	el.animate( animation, {jQuery
		queue: false,jQuery
		duration: o.duration,jQuery
		easing: o.easing,jQuery
		complete: function() {jQuery
			if ( mode === "hide" ) {jQuery
				el.hide();jQuery
			}jQuery
			$.effects.restore( el, props );jQuery
			$.effects.removeWrapper( el );jQuery
			done();jQuery
		}jQuery
	});jQuery
};jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.effects.effect.transfer = function( o, done ) {jQuery
	var elem = $( this ),jQuery
		target = $( o.to ),jQuery
		targetFixed = target.css( "position" ) === "fixed",jQuery
		body = $("body"),jQuery
		fixTop = targetFixed ? body.scrollTop() : 0,jQuery
		fixLeft = targetFixed ? body.scrollLeft() : 0,jQuery
		endPosition = target.offset(),jQuery
		animation = {jQuery
			top: endPosition.top - fixTop ,jQuery
			left: endPosition.left - fixLeft ,jQuery
			height: target.innerHeight(),jQuery
			width: target.innerWidth()jQuery
		},jQuery
		startPosition = elem.offset(),jQuery
		transfer = $( "<div class='ui-effects-transfer'></div>" )jQuery
			.appendTo( document.body )jQuery
			.addClass( o.className )jQuery
			.css({jQuery
				top: startPosition.top - fixTop ,jQuery
				left: startPosition.left - fixLeft ,jQuery
				height: elem.innerHeight(),jQuery
				width: elem.innerWidth(),jQuery
				position: targetFixed ? "fixed" : "absolute"jQuery
			})jQuery
			.animate( animation, o.duration, o.easing, function() {jQuery
				transfer.remove();jQuery
				done();jQuery
			});jQuery
};jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.widget( "ui.menu", {jQuery
	version: "1.10.4",jQuery
	defaultElement: "<ul>",jQuery
	delay: 300,jQuery
	options: {jQuery
		icons: {jQuery
			submenu: "ui-icon-carat-1-e"jQuery
		},jQuery
		menus: "ul",jQuery
		position: {jQuery
			my: "left top",jQuery
			at: "right top"jQuery
		},jQuery
		role: "menu",jQuery
jQuery
		// callbacksjQuery
		blur: null,jQuery
		focus: null,jQuery
		select: nulljQuery
	},jQuery
jQuery
	_create: function() {jQuery
		this.activeMenu = this.element;jQuery
		// flag used to prevent firing of the click handlerjQuery
		// as the event bubbles up through nested menusjQuery
		this.mouseHandled = false;jQuery
		this.elementjQuery
			.uniqueId()jQuery
			.addClass( "ui-menu ui-widget ui-widget-content ui-corner-all" )jQuery
			.toggleClass( "ui-menu-icons", !!this.element.find( ".ui-icon" ).length )jQuery
			.attr({jQuery
				role: this.options.role,jQuery
				tabIndex: 0jQuery
			})jQuery
			// need to catch all clicks on disabled menujQuery
			// not possible through _onjQuery
			.bind( "click" + this.eventNamespace, $.proxy(function( event ) {jQuery
				if ( this.options.disabled ) {jQuery
					event.preventDefault();jQuery
				}jQuery
			}, this ));jQuery
jQuery
		if ( this.options.disabled ) {jQuery
			this.elementjQuery
				.addClass( "ui-state-disabled" )jQuery
				.attr( "aria-disabled", "true" );jQuery
		}jQuery
jQuery
		this._on({jQuery
			// Prevent focus from sticking to links inside menu after clickingjQuery
			// them (focus should always stay on UL during navigation).jQuery
			"mousedown .ui-menu-item > a": function( event ) {jQuery
				event.preventDefault();jQuery
			},jQuery
			"click .ui-state-disabled > a": function( event ) {jQuery
				event.preventDefault();jQuery
			},jQuery
			"click .ui-menu-item:has(a)": function( event ) {jQuery
				var target = $( event.target ).closest( ".ui-menu-item" );jQuery
				if ( !this.mouseHandled && target.not( ".ui-state-disabled" ).length ) {jQuery
					this.select( event );jQuery
jQuery
					// Only set the mouseHandled flag if the event will bubble, see #9469.jQuery
					if ( !event.isPropagationStopped() ) {jQuery
						this.mouseHandled = true;jQuery
					}jQuery
jQuery
					// Open submenu on clickjQuery
					if ( target.has( ".ui-menu" ).length ) {jQuery
						this.expand( event );jQuery
					} else if ( !this.element.is( ":focus" ) && $( this.document[ 0 ].activeElement ).closest( ".ui-menu" ).length ) {jQuery
jQuery
						// Redirect focus to the menujQuery
						this.element.trigger( "focus", [ true ] );jQuery
jQuery
						// If the active item is on the top level, let it stay active.jQuery
						// Otherwise, blur the active item since it is no longer visible.jQuery
						if ( this.active && this.active.parents( ".ui-menu" ).length === 1 ) {jQuery
							clearTimeout( this.timer );jQuery
						}jQuery
					}jQuery
				}jQuery
			},jQuery
			"mouseenter .ui-menu-item": function( event ) {jQuery
				var target = $( event.currentTarget );jQuery
				// Remove ui-state-active class from siblings of the newly focused menu itemjQuery
				// to avoid a jump caused by adjacent elements both having a class with a borderjQuery
				target.siblings().children( ".ui-state-active" ).removeClass( "ui-state-active" );jQuery
				this.focus( event, target );jQuery
			},jQuery
			mouseleave: "collapseAll",jQuery
			"mouseleave .ui-menu": "collapseAll",jQuery
			focus: function( event, keepActiveItem ) {jQuery
				// If there's already an active item, keep it activejQuery
				// If not, activate the first itemjQuery
				var item = this.active || this.element.children( ".ui-menu-item" ).eq( 0 );jQuery
jQuery
				if ( !keepActiveItem ) {jQuery
					this.focus( event, item );jQuery
				}jQuery
			},jQuery
			blur: function( event ) {jQuery
				this._delay(function() {jQuery
					if ( !$.contains( this.element[0], this.document[0].activeElement ) ) {jQuery
						this.collapseAll( event );jQuery
					}jQuery
				});jQuery
			},jQuery
			keydown: "_keydown"jQuery
		});jQuery
jQuery
		this.refresh();jQuery
jQuery
		// Clicks outside of a menu collapse any open menusjQuery
		this._on( this.document, {jQuery
			click: function( event ) {jQuery
				if ( !$( event.target ).closest( ".ui-menu" ).length ) {jQuery
					this.collapseAll( event );jQuery
				}jQuery
jQuery
				// Reset the mouseHandled flagjQuery
				this.mouseHandled = false;jQuery
			}jQuery
		});jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		// Destroy (sub)menusjQuery
		this.elementjQuery
			.removeAttr( "aria-activedescendant" )jQuery
			.find( ".ui-menu" ).addBack()jQuery
				.removeClass( "ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons" )jQuery
				.removeAttr( "role" )jQuery
				.removeAttr( "tabIndex" )jQuery
				.removeAttr( "aria-labelledby" )jQuery
				.removeAttr( "aria-expanded" )jQuery
				.removeAttr( "aria-hidden" )jQuery
				.removeAttr( "aria-disabled" )jQuery
				.removeUniqueId()jQuery
				.show();jQuery
jQuery
		// Destroy menu itemsjQuery
		this.element.find( ".ui-menu-item" )jQuery
			.removeClass( "ui-menu-item" )jQuery
			.removeAttr( "role" )jQuery
			.removeAttr( "aria-disabled" )jQuery
			.children( "a" )jQuery
				.removeUniqueId()jQuery
				.removeClass( "ui-corner-all ui-state-hover" )jQuery
				.removeAttr( "tabIndex" )jQuery
				.removeAttr( "role" )jQuery
				.removeAttr( "aria-haspopup" )jQuery
				.children().each( function() {jQuery
					var elem = $( this );jQuery
					if ( elem.data( "ui-menu-submenu-carat" ) ) {jQuery
						elem.remove();jQuery
					}jQuery
				});jQuery
jQuery
		// Destroy menu dividersjQuery
		this.element.find( ".ui-menu-divider" ).removeClass( "ui-menu-divider ui-widget-content" );jQuery
	},jQuery
jQuery
	_keydown: function( event ) {jQuery
		var match, prev, character, skip, regex,jQuery
			preventDefault = true;jQuery
jQuery
		function escape( value ) {jQuery
			return value.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );jQuery
		}jQuery
jQuery
		switch ( event.keyCode ) {jQuery
		case $.ui.keyCode.PAGE_UP:jQuery
			this.previousPage( event );jQuery
			break;jQuery
		case $.ui.keyCode.PAGE_DOWN:jQuery
			this.nextPage( event );jQuery
			break;jQuery
		case $.ui.keyCode.HOME:jQuery
			this._move( "first", "first", event );jQuery
			break;jQuery
		case $.ui.keyCode.END:jQuery
			this._move( "last", "last", event );jQuery
			break;jQuery
		case $.ui.keyCode.UP:jQuery
			this.previous( event );jQuery
			break;jQuery
		case $.ui.keyCode.DOWN:jQuery
			this.next( event );jQuery
			break;jQuery
		case $.ui.keyCode.LEFT:jQuery
			this.collapse( event );jQuery
			break;jQuery
		case $.ui.keyCode.RIGHT:jQuery
			if ( this.active && !this.active.is( ".ui-state-disabled" ) ) {jQuery
				this.expand( event );jQuery
			}jQuery
			break;jQuery
		case $.ui.keyCode.ENTER:jQuery
		case $.ui.keyCode.SPACE:jQuery
			this._activate( event );jQuery
			break;jQuery
		case $.ui.keyCode.ESCAPE:jQuery
			this.collapse( event );jQuery
			break;jQuery
		default:jQuery
			preventDefault = false;jQuery
			prev = this.previousFilter || "";jQuery
			character = String.fromCharCode( event.keyCode );jQuery
			skip = false;jQuery
jQuery
			clearTimeout( this.filterTimer );jQuery
jQuery
			if ( character === prev ) {jQuery
				skip = true;jQuery
			} else {jQuery
				character = prev + character;jQuery
			}jQuery
jQuery
			regex = new RegExp( "^" + escape( character ), "i" );jQuery
			match = this.activeMenu.children( ".ui-menu-item" ).filter(function() {jQuery
				return regex.test( $( this ).children( "a" ).text() );jQuery
			});jQuery
			match = skip && match.index( this.active.next() ) !== -1 ?jQuery
				this.active.nextAll( ".ui-menu-item" ) :jQuery
				match;jQuery
jQuery
			// If no matches on the current filter, reset to the last character pressedjQuery
			// to move down the menu to the first item that starts with that characterjQuery
			if ( !match.length ) {jQuery
				character = String.fromCharCode( event.keyCode );jQuery
				regex = new RegExp( "^" + escape( character ), "i" );jQuery
				match = this.activeMenu.children( ".ui-menu-item" ).filter(function() {jQuery
					return regex.test( $( this ).children( "a" ).text() );jQuery
				});jQuery
			}jQuery
jQuery
			if ( match.length ) {jQuery
				this.focus( event, match );jQuery
				if ( match.length > 1 ) {jQuery
					this.previousFilter = character;jQuery
					this.filterTimer = this._delay(function() {jQuery
						delete this.previousFilter;jQuery
					}, 1000 );jQuery
				} else {jQuery
					delete this.previousFilter;jQuery
				}jQuery
			} else {jQuery
				delete this.previousFilter;jQuery
			}jQuery
		}jQuery
jQuery
		if ( preventDefault ) {jQuery
			event.preventDefault();jQuery
		}jQuery
	},jQuery
jQuery
	_activate: function( event ) {jQuery
		if ( !this.active.is( ".ui-state-disabled" ) ) {jQuery
			if ( this.active.children( "a[aria-haspopup='true']" ).length ) {jQuery
				this.expand( event );jQuery
			} else {jQuery
				this.select( event );jQuery
			}jQuery
		}jQuery
	},jQuery
jQuery
	refresh: function() {jQuery
		var menus,jQuery
			icon = this.options.icons.submenu,jQuery
			submenus = this.element.find( this.options.menus );jQuery
jQuery
		this.element.toggleClass( "ui-menu-icons", !!this.element.find( ".ui-icon" ).length );jQuery
jQuery
		// Initialize nested menusjQuery
		submenus.filter( ":not(.ui-menu)" )jQuery
			.addClass( "ui-menu ui-widget ui-widget-content ui-corner-all" )jQuery
			.hide()jQuery
			.attr({jQuery
				role: this.options.role,jQuery
				"aria-hidden": "true",jQuery
				"aria-expanded": "false"jQuery
			})jQuery
			.each(function() {jQuery
				var menu = $( this ),jQuery
					item = menu.prev( "a" ),jQuery
					submenuCarat = $( "<span>" )jQuery
						.addClass( "ui-menu-icon ui-icon " + icon )jQuery
						.data( "ui-menu-submenu-carat", true );jQuery
jQuery
				itemjQuery
					.attr( "aria-haspopup", "true" )jQuery
					.prepend( submenuCarat );jQuery
				menu.attr( "aria-labelledby", item.attr( "id" ) );jQuery
			});jQuery
jQuery
		menus = submenus.add( this.element );jQuery
jQuery
		// Don't refresh list items that are already adaptedjQuery
		menus.children( ":not(.ui-menu-item):has(a)" )jQuery
			.addClass( "ui-menu-item" )jQuery
			.attr( "role", "presentation" )jQuery
			.children( "a" )jQuery
				.uniqueId()jQuery
				.addClass( "ui-corner-all" )jQuery
				.attr({jQuery
					tabIndex: -1,jQuery
					role: this._itemRole()jQuery
				});jQuery
jQuery
		// Initialize unlinked menu-items containing spaces and/or dashes only as dividersjQuery
		menus.children( ":not(.ui-menu-item)" ).each(function() {jQuery
			var item = $( this );jQuery
			// hyphen, em dash, en dashjQuery
			if ( !/[^\-\u2014\u2013\s]/.test( item.text() ) ) {jQuery
				item.addClass( "ui-widget-content ui-menu-divider" );jQuery
			}jQuery
		});jQuery
jQuery
		// Add aria-disabled attribute to any disabled menu itemjQuery
		menus.children( ".ui-state-disabled" ).attr( "aria-disabled", "true" );jQuery
jQuery
		// If the active item has been removed, blur the menujQuery
		if ( this.active && !$.contains( this.element[ 0 ], this.active[ 0 ] ) ) {jQuery
			this.blur();jQuery
		}jQuery
	},jQuery
jQuery
	_itemRole: function() {jQuery
		return {jQuery
			menu: "menuitem",jQuery
			listbox: "option"jQuery
		}[ this.options.role ];jQuery
	},jQuery
jQuery
	_setOption: function( key, value ) {jQuery
		if ( key === "icons" ) {jQuery
			this.element.find( ".ui-menu-icon" )jQuery
				.removeClass( this.options.icons.submenu )jQuery
				.addClass( value.submenu );jQuery
		}jQuery
		this._super( key, value );jQuery
	},jQuery
jQuery
	focus: function( event, item ) {jQuery
		var nested, focused;jQuery
		this.blur( event, event && event.type === "focus" );jQuery
jQuery
		this._scrollIntoView( item );jQuery
jQuery
		this.active = item.first();jQuery
		focused = this.active.children( "a" ).addClass( "ui-state-focus" );jQuery
		// Only update aria-activedescendant if there's a rolejQuery
		// otherwise we assume focus is managed elsewherejQuery
		if ( this.options.role ) {jQuery
			this.element.attr( "aria-activedescendant", focused.attr( "id" ) );jQuery
		}jQuery
jQuery
		// Highlight active parent menu item, if anyjQuery
		this.activejQuery
			.parent()jQuery
			.closest( ".ui-menu-item" )jQuery
			.children( "a:first" )jQuery
			.addClass( "ui-state-active" );jQuery
jQuery
		if ( event && event.type === "keydown" ) {jQuery
			this._close();jQuery
		} else {jQuery
			this.timer = this._delay(function() {jQuery
				this._close();jQuery
			}, this.delay );jQuery
		}jQuery
jQuery
		nested = item.children( ".ui-menu" );jQuery
		if ( nested.length && event && ( /^mouse/.test( event.type ) ) ) {jQuery
			this._startOpening(nested);jQuery
		}jQuery
		this.activeMenu = item.parent();jQuery
jQuery
		this._trigger( "focus", event, { item: item } );jQuery
	},jQuery
jQuery
	_scrollIntoView: function( item ) {jQuery
		var borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;jQuery
		if ( this._hasScroll() ) {jQuery
			borderTop = parseFloat( $.css( this.activeMenu[0], "borderTopWidth" ) ) || 0;jQuery
			paddingTop = parseFloat( $.css( this.activeMenu[0], "paddingTop" ) ) || 0;jQuery
			offset = item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop;jQuery
			scroll = this.activeMenu.scrollTop();jQuery
			elementHeight = this.activeMenu.height();jQuery
			itemHeight = item.height();jQuery
jQuery
			if ( offset < 0 ) {jQuery
				this.activeMenu.scrollTop( scroll + offset );jQuery
			} else if ( offset + itemHeight > elementHeight ) {jQuery
				this.activeMenu.scrollTop( scroll + offset - elementHeight + itemHeight );jQuery
			}jQuery
		}jQuery
	},jQuery
jQuery
	blur: function( event, fromFocus ) {jQuery
		if ( !fromFocus ) {jQuery
			clearTimeout( this.timer );jQuery
		}jQuery
jQuery
		if ( !this.active ) {jQuery
			return;jQuery
		}jQuery
jQuery
		this.active.children( "a" ).removeClass( "ui-state-focus" );jQuery
		this.active = null;jQuery
jQuery
		this._trigger( "blur", event, { item: this.active } );jQuery
	},jQuery
jQuery
	_startOpening: function( submenu ) {jQuery
		clearTimeout( this.timer );jQuery
jQuery
		// Don't open if already open fixes a Firefox bug that caused a .5 pixeljQuery
		// shift in the submenu position when mousing over the carat iconjQuery
		if ( submenu.attr( "aria-hidden" ) !== "true" ) {jQuery
			return;jQuery
		}jQuery
jQuery
		this.timer = this._delay(function() {jQuery
			this._close();jQuery
			this._open( submenu );jQuery
		}, this.delay );jQuery
	},jQuery
jQuery
	_open: function( submenu ) {jQuery
		var position = $.extend({jQuery
			of: this.activejQuery
		}, this.options.position );jQuery
jQuery
		clearTimeout( this.timer );jQuery
		this.element.find( ".ui-menu" ).not( submenu.parents( ".ui-menu" ) )jQuery
			.hide()jQuery
			.attr( "aria-hidden", "true" );jQuery
jQuery
		submenujQuery
			.show()jQuery
			.removeAttr( "aria-hidden" )jQuery
			.attr( "aria-expanded", "true" )jQuery
			.position( position );jQuery
	},jQuery
jQuery
	collapseAll: function( event, all ) {jQuery
		clearTimeout( this.timer );jQuery
		this.timer = this._delay(function() {jQuery
			// If we were passed an event, look for the submenu that contains the eventjQuery
			var currentMenu = all ? this.element :jQuery
				$( event && event.target ).closest( this.element.find( ".ui-menu" ) );jQuery
jQuery
			// If we found no valid submenu ancestor, use the main menu to close all sub menus anywayjQuery
			if ( !currentMenu.length ) {jQuery
				currentMenu = this.element;jQuery
			}jQuery
jQuery
			this._close( currentMenu );jQuery
jQuery
			this.blur( event );jQuery
			this.activeMenu = currentMenu;jQuery
		}, this.delay );jQuery
	},jQuery
jQuery
	// With no arguments, closes the currently active menu - if nothing is activejQuery
	// it closes all menus.  If passed an argument, it will search for menus BELOWjQuery
	_close: function( startMenu ) {jQuery
		if ( !startMenu ) {jQuery
			startMenu = this.active ? this.active.parent() : this.element;jQuery
		}jQuery
jQuery
		startMenujQuery
			.find( ".ui-menu" )jQuery
				.hide()jQuery
				.attr( "aria-hidden", "true" )jQuery
				.attr( "aria-expanded", "false" )jQuery
			.end()jQuery
			.find( "a.ui-state-active" )jQuery
				.removeClass( "ui-state-active" );jQuery
	},jQuery
jQuery
	collapse: function( event ) {jQuery
		var newItem = this.active &&jQuery
			this.active.parent().closest( ".ui-menu-item", this.element );jQuery
		if ( newItem && newItem.length ) {jQuery
			this._close();jQuery
			this.focus( event, newItem );jQuery
		}jQuery
	},jQuery
jQuery
	expand: function( event ) {jQuery
		var newItem = this.active &&jQuery
			this.activejQuery
				.children( ".ui-menu " )jQuery
				.children( ".ui-menu-item" )jQuery
				.first();jQuery
jQuery
		if ( newItem && newItem.length ) {jQuery
			this._open( newItem.parent() );jQuery
jQuery
			// Delay so Firefox will not hide activedescendant change in expanding submenu from ATjQuery
			this._delay(function() {jQuery
				this.focus( event, newItem );jQuery
			});jQuery
		}jQuery
	},jQuery
jQuery
	next: function( event ) {jQuery
		this._move( "next", "first", event );jQuery
	},jQuery
jQuery
	previous: function( event ) {jQuery
		this._move( "prev", "last", event );jQuery
	},jQuery
jQuery
	isFirstItem: function() {jQuery
		return this.active && !this.active.prevAll( ".ui-menu-item" ).length;jQuery
	},jQuery
jQuery
	isLastItem: function() {jQuery
		return this.active && !this.active.nextAll( ".ui-menu-item" ).length;jQuery
	},jQuery
jQuery
	_move: function( direction, filter, event ) {jQuery
		var next;jQuery
		if ( this.active ) {jQuery
			if ( direction === "first" || direction === "last" ) {jQuery
				next = this.activejQuery
					[ direction === "first" ? "prevAll" : "nextAll" ]( ".ui-menu-item" )jQuery
					.eq( -1 );jQuery
			} else {jQuery
				next = this.activejQuery
					[ direction + "All" ]( ".ui-menu-item" )jQuery
					.eq( 0 );jQuery
			}jQuery
		}jQuery
		if ( !next || !next.length || !this.active ) {jQuery
			next = this.activeMenu.children( ".ui-menu-item" )[ filter ]();jQuery
		}jQuery
jQuery
		this.focus( event, next );jQuery
	},jQuery
jQuery
	nextPage: function( event ) {jQuery
		var item, base, height;jQuery
jQuery
		if ( !this.active ) {jQuery
			this.next( event );jQuery
			return;jQuery
		}jQuery
		if ( this.isLastItem() ) {jQuery
			return;jQuery
		}jQuery
		if ( this._hasScroll() ) {jQuery
			base = this.active.offset().top;jQuery
			height = this.element.height();jQuery
			this.active.nextAll( ".ui-menu-item" ).each(function() {jQuery
				item = $( this );jQuery
				return item.offset().top - base - height < 0;jQuery
			});jQuery
jQuery
			this.focus( event, item );jQuery
		} else {jQuery
			this.focus( event, this.activeMenu.children( ".ui-menu-item" )jQuery
				[ !this.active ? "first" : "last" ]() );jQuery
		}jQuery
	},jQuery
jQuery
	previousPage: function( event ) {jQuery
		var item, base, height;jQuery
		if ( !this.active ) {jQuery
			this.next( event );jQuery
			return;jQuery
		}jQuery
		if ( this.isFirstItem() ) {jQuery
			return;jQuery
		}jQuery
		if ( this._hasScroll() ) {jQuery
			base = this.active.offset().top;jQuery
			height = this.element.height();jQuery
			this.active.prevAll( ".ui-menu-item" ).each(function() {jQuery
				item = $( this );jQuery
				return item.offset().top - base + height > 0;jQuery
			});jQuery
jQuery
			this.focus( event, item );jQuery
		} else {jQuery
			this.focus( event, this.activeMenu.children( ".ui-menu-item" ).first() );jQuery
		}jQuery
	},jQuery
jQuery
	_hasScroll: function() {jQuery
		return this.element.outerHeight() < this.element.prop( "scrollHeight" );jQuery
	},jQuery
jQuery
	select: function( event ) {jQuery
		// TODO: It should never be possible to not have an active item at thisjQuery
		// point, but the tests don't trigger mouseenter before click.jQuery
		this.active = this.active || $( event.target ).closest( ".ui-menu-item" );jQuery
		var ui = { item: this.active };jQuery
		if ( !this.active.has( ".ui-menu" ).length ) {jQuery
			this.collapseAll( event, true );jQuery
		}jQuery
		this._trigger( "select", event, ui );jQuery
	}jQuery
});jQuery
jQuery
}( jQuery ));jQuery
(function( $, undefined ) {jQuery
jQuery
$.widget( "ui.progressbar", {jQuery
	version: "1.10.4",jQuery
	options: {jQuery
		max: 100,jQuery
		value: 0,jQuery
jQuery
		change: null,jQuery
		complete: nulljQuery
	},jQuery
jQuery
	min: 0,jQuery
jQuery
	_create: function() {jQuery
		// Constrain initial valuejQuery
		this.oldValue = this.options.value = this._constrainedValue();jQuery
jQuery
		this.elementjQuery
			.addClass( "ui-progressbar ui-widget ui-widget-content ui-corner-all" )jQuery
			.attr({jQuery
				// Only set static values, aria-valuenow and aria-valuemax arejQuery
				// set inside _refreshValue()jQuery
				role: "progressbar",jQuery
				"aria-valuemin": this.minjQuery
			});jQuery
jQuery
		this.valueDiv = $( "<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>" )jQuery
			.appendTo( this.element );jQuery
jQuery
		this._refreshValue();jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		this.elementjQuery
			.removeClass( "ui-progressbar ui-widget ui-widget-content ui-corner-all" )jQuery
			.removeAttr( "role" )jQuery
			.removeAttr( "aria-valuemin" )jQuery
			.removeAttr( "aria-valuemax" )jQuery
			.removeAttr( "aria-valuenow" );jQuery
jQuery
		this.valueDiv.remove();jQuery
	},jQuery
jQuery
	value: function( newValue ) {jQuery
		if ( newValue === undefined ) {jQuery
			return this.options.value;jQuery
		}jQuery
jQuery
		this.options.value = this._constrainedValue( newValue );jQuery
		this._refreshValue();jQuery
	},jQuery
jQuery
	_constrainedValue: function( newValue ) {jQuery
		if ( newValue === undefined ) {jQuery
			newValue = this.options.value;jQuery
		}jQuery
jQuery
		this.indeterminate = newValue === false;jQuery
jQuery
		// sanitize valuejQuery
		if ( typeof newValue !== "number" ) {jQuery
			newValue = 0;jQuery
		}jQuery
jQuery
		return this.indeterminate ? false :jQuery
			Math.min( this.options.max, Math.max( this.min, newValue ) );jQuery
	},jQuery
jQuery
	_setOptions: function( options ) {jQuery
		// Ensure "value" option is set after other values (like max)jQuery
		var value = options.value;jQuery
		delete options.value;jQuery
jQuery
		this._super( options );jQuery
jQuery
		this.options.value = this._constrainedValue( value );jQuery
		this._refreshValue();jQuery
	},jQuery
jQuery
	_setOption: function( key, value ) {jQuery
		if ( key === "max" ) {jQuery
			// Don't allow a max less than minjQuery
			value = Math.max( this.min, value );jQuery
		}jQuery
jQuery
		this._super( key, value );jQuery
	},jQuery
jQuery
	_percentage: function() {jQuery
		return this.indeterminate ? 100 : 100 * ( this.options.value - this.min ) / ( this.options.max - this.min );jQuery
	},jQuery
jQuery
	_refreshValue: function() {jQuery
		var value = this.options.value,jQuery
			percentage = this._percentage();jQuery
jQuery
		this.valueDivjQuery
			.toggle( this.indeterminate || value > this.min )jQuery
			.toggleClass( "ui-corner-right", value === this.options.max )jQuery
			.width( percentage.toFixed(0) + "%" );jQuery
jQuery
		this.element.toggleClass( "ui-progressbar-indeterminate", this.indeterminate );jQuery
jQuery
		if ( this.indeterminate ) {jQuery
			this.element.removeAttr( "aria-valuenow" );jQuery
			if ( !this.overlayDiv ) {jQuery
				this.overlayDiv = $( "<div class='ui-progressbar-overlay'></div>" ).appendTo( this.valueDiv );jQuery
			}jQuery
		} else {jQuery
			this.element.attr({jQuery
				"aria-valuemax": this.options.max,jQuery
				"aria-valuenow": valuejQuery
			});jQuery
			if ( this.overlayDiv ) {jQuery
				this.overlayDiv.remove();jQuery
				this.overlayDiv = null;jQuery
			}jQuery
		}jQuery
jQuery
		if ( this.oldValue !== value ) {jQuery
			this.oldValue = value;jQuery
			this._trigger( "change" );jQuery
		}jQuery
		if ( value === this.options.max ) {jQuery
			this._trigger( "complete" );jQuery
		}jQuery
	}jQuery
});jQuery
jQuery
})( jQuery );jQuery
(function( $, undefined ) {jQuery
jQuery
function num(v) {jQuery
	return parseInt(v, 10) || 0;jQuery
}jQuery
jQuery
function isNumber(value) {jQuery
	return !isNaN(parseInt(value, 10));jQuery
}jQuery
jQuery
$.widget("ui.resizable", $.ui.mouse, {jQuery
	version: "1.10.4",jQuery
	widgetEventPrefix: "resize",jQuery
	options: {jQuery
		alsoResize: false,jQuery
		animate: false,jQuery
		animateDuration: "slow",jQuery
		animateEasing: "swing",jQuery
		aspectRatio: false,jQuery
		autoHide: false,jQuery
		containment: false,jQuery
		ghost: false,jQuery
		grid: false,jQuery
		handles: "e,s,se",jQuery
		helper: false,jQuery
		maxHeight: null,jQuery
		maxWidth: null,jQuery
		minHeight: 10,jQuery
		minWidth: 10,jQuery
		// See #7960jQuery
		zIndex: 90,jQuery
jQuery
		// callbacksjQuery
		resize: null,jQuery
		start: null,jQuery
		stop: nulljQuery
	},jQuery
	_create: function() {jQuery
jQuery
		var n, i, handle, axis, hname,jQuery
			that = this,jQuery
			o = this.options;jQuery
		this.element.addClass("ui-resizable");jQuery
jQuery
		$.extend(this, {jQuery
			_aspectRatio: !!(o.aspectRatio),jQuery
			aspectRatio: o.aspectRatio,jQuery
			originalElement: this.element,jQuery
			_proportionallyResizeElements: [],jQuery
			_helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : nulljQuery
		});jQuery
jQuery
		//Wrap the element if it cannot hold child nodesjQuery
		if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {jQuery
jQuery
			//Create a wrapper element and set the wrapper to the new current internal elementjQuery
			this.element.wrap(jQuery
				$("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({jQuery
					position: this.element.css("position"),jQuery
					width: this.element.outerWidth(),jQuery
					height: this.element.outerHeight(),jQuery
					top: this.element.css("top"),jQuery
					left: this.element.css("left")jQuery
				})jQuery
			);jQuery
jQuery
			//Overwrite the original this.elementjQuery
			this.element = this.element.parent().data(jQuery
				"ui-resizable", this.element.data("ui-resizable")jQuery
			);jQuery
jQuery
			this.elementIsWrapper = true;jQuery
jQuery
			//Move margins to the wrapperjQuery
			this.element.css({ marginLeft: this.originalElement.css("marginLeft"), marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom") });jQuery
			this.originalElement.css({ marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0});jQuery
jQuery
			//Prevent Safari textarea resizejQuery
			this.originalResizeStyle = this.originalElement.css("resize");jQuery
			this.originalElement.css("resize", "none");jQuery
jQuery
			//Push the actual element to our proportionallyResize internal arrayjQuery
			this._proportionallyResizeElements.push(this.originalElement.css({ position: "static", zoom: 1, display: "block" }));jQuery
jQuery
			// avoid IE jump (hard set the margin)jQuery
			this.originalElement.css({ margin: this.originalElement.css("margin") });jQuery
jQuery
			// fix handlers offsetjQuery
			this._proportionallyResize();jQuery
jQuery
		}jQuery
jQuery
		this.handles = o.handles || (!$(".ui-resizable-handle", this.element).length ? "e,s,se" : { n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw" });jQuery
		if(this.handles.constructor === String) {jQuery
jQuery
			if ( this.handles === "all") {jQuery
				this.handles = "n,e,s,w,se,sw,ne,nw";jQuery
			}jQuery
jQuery
			n = this.handles.split(",");jQuery
			this.handles = {};jQuery
jQuery
			for(i = 0; i < n.length; i++) {jQuery
jQuery
				handle = $.trim(n[i]);jQuery
				hname = "ui-resizable-"+handle;jQuery
				axis = $("<div class='ui-resizable-handle " + hname + "'></div>");jQuery
jQuery
				// Apply zIndex to all handles - see #7960jQuery
				axis.css({ zIndex: o.zIndex });jQuery
jQuery
				//TODO : What's going on here?jQuery
				if ("se" === handle) {jQuery
					axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se");jQuery
				}jQuery
jQuery
				//Insert into internal handles object and append to elementjQuery
				this.handles[handle] = ".ui-resizable-"+handle;jQuery
				this.element.append(axis);jQuery
			}jQuery
jQuery
		}jQuery
jQuery
		this._renderAxis = function(target) {jQuery
jQuery
			var i, axis, padPos, padWrapper;jQuery
jQuery
			target = target || this.element;jQuery
jQuery
			for(i in this.handles) {jQuery
jQuery
				if(this.handles[i].constructor === String) {jQuery
					this.handles[i] = $(this.handles[i], this.element).show();jQuery
				}jQuery
jQuery
				//Apply pad to wrapper element, needed to fix axis position (textarea, inputs, scrolls)jQuery
				if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {jQuery
jQuery
					axis = $(this.handles[i], this.element);jQuery
jQuery
					//Checking the correct pad and borderjQuery
					padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();jQuery
jQuery
					//The padding type i have to apply...jQuery
					padPos = [ "padding",jQuery
						/ne|nw|n/.test(i) ? "Top" :jQuery
						/se|sw|s/.test(i) ? "Bottom" :jQuery
						/^e$/.test(i) ? "Right" : "Left" ].join("");jQuery
jQuery
					target.css(padPos, padWrapper);jQuery
jQuery
					this._proportionallyResize();jQuery
jQuery
				}jQuery
jQuery
				//TODO: What's that good for? There's not anything to be executed leftjQuery
				if(!$(this.handles[i]).length) {jQuery
					continue;jQuery
				}jQuery
			}jQuery
		};jQuery
jQuery
		//TODO: make renderAxis a prototype functionjQuery
		this._renderAxis(this.element);jQuery
jQuery
		this._handles = $(".ui-resizable-handle", this.element)jQuery
			.disableSelection();jQuery
jQuery
		//Matching axis namejQuery
		this._handles.mouseover(function() {jQuery
			if (!that.resizing) {jQuery
				if (this.className) {jQuery
					axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);jQuery
				}jQuery
				//Axis, default = sejQuery
				that.axis = axis && axis[1] ? axis[1] : "se";jQuery
			}jQuery
		});jQuery
jQuery
		//If we want to auto hide the elementsjQuery
		if (o.autoHide) {jQuery
			this._handles.hide();jQuery
			$(this.element)jQuery
				.addClass("ui-resizable-autohide")jQuery
				.mouseenter(function() {jQuery
					if (o.disabled) {jQuery
						return;jQuery
					}jQuery
					$(this).removeClass("ui-resizable-autohide");jQuery
					that._handles.show();jQuery
				})jQuery
				.mouseleave(function(){jQuery
					if (o.disabled) {jQuery
						return;jQuery
					}jQuery
					if (!that.resizing) {jQuery
						$(this).addClass("ui-resizable-autohide");jQuery
						that._handles.hide();jQuery
					}jQuery
				});jQuery
		}jQuery
jQuery
		//Initialize the mouse interactionjQuery
		this._mouseInit();jQuery
jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
jQuery
		this._mouseDestroy();jQuery
jQuery
		var wrapper,jQuery
			_destroy = function(exp) {jQuery
				$(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing")jQuery
					.removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove();jQuery
			};jQuery
jQuery
		//TODO: Unwrap at same DOM positionjQuery
		if (this.elementIsWrapper) {jQuery
			_destroy(this.element);jQuery
			wrapper = this.element;jQuery
			this.originalElement.css({jQuery
				position: wrapper.css("position"),jQuery
				width: wrapper.outerWidth(),jQuery
				height: wrapper.outerHeight(),jQuery
				top: wrapper.css("top"),jQuery
				left: wrapper.css("left")jQuery
			}).insertAfter( wrapper );jQuery
			wrapper.remove();jQuery
		}jQuery
jQuery
		this.originalElement.css("resize", this.originalResizeStyle);jQuery
		_destroy(this.originalElement);jQuery
jQuery
		return this;jQuery
	},jQuery
jQuery
	_mouseCapture: function(event) {jQuery
		var i, handle,jQuery
			capture = false;jQuery
jQuery
		for (i in this.handles) {jQuery
			handle = $(this.handles[i])[0];jQuery
			if (handle === event.target || $.contains(handle, event.target)) {jQuery
				capture = true;jQuery
			}jQuery
		}jQuery
jQuery
		return !this.options.disabled && capture;jQuery
	},jQuery
jQuery
	_mouseStart: function(event) {jQuery
jQuery
		var curleft, curtop, cursor,jQuery
			o = this.options,jQuery
			iniPos = this.element.position(),jQuery
			el = this.element;jQuery
jQuery
		this.resizing = true;jQuery
jQuery
		// bugfix for http://dev.jquery.com/ticket/1749jQuery
		if ( (/absolute/).test( el.css("position") ) ) {jQuery
			el.css({ position: "absolute", top: el.css("top"), left: el.css("left") });jQuery
		} else if (el.is(".ui-draggable")) {jQuery
			el.css({ position: "absolute", top: iniPos.top, left: iniPos.left });jQuery
		}jQuery
jQuery
		this._renderProxy();jQuery
jQuery
		curleft = num(this.helper.css("left"));jQuery
		curtop = num(this.helper.css("top"));jQuery
jQuery
		if (o.containment) {jQuery
			curleft += $(o.containment).scrollLeft() || 0;jQuery
			curtop += $(o.containment).scrollTop() || 0;jQuery
		}jQuery
jQuery
		//Store needed variablesjQuery
		this.offset = this.helper.offset();jQuery
		this.position = { left: curleft, top: curtop };jQuery
		this.size = this._helper ? { width: this.helper.width(), height: this.helper.height() } : { width: el.width(), height: el.height() };jQuery
		this.originalSize = this._helper ? { width: el.outerWidth(), height: el.outerHeight() } : { width: el.width(), height: el.height() };jQuery
		this.originalPosition = { left: curleft, top: curtop };jQuery
		this.sizeDiff = { width: el.outerWidth() - el.width(), height: el.outerHeight() - el.height() };jQuery
		this.originalMousePosition = { left: event.pageX, top: event.pageY };jQuery
jQuery
		//Aspect RatiojQuery
		this.aspectRatio = (typeof o.aspectRatio === "number") ? o.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);jQuery
jQuery
		cursor = $(".ui-resizable-" + this.axis).css("cursor");jQuery
		$("body").css("cursor", cursor === "auto" ? this.axis + "-resize" : cursor);jQuery
jQuery
		el.addClass("ui-resizable-resizing");jQuery
		this._propagate("start", event);jQuery
		return true;jQuery
	},jQuery
jQuery
	_mouseDrag: function(event) {jQuery
jQuery
		//Increase performance, avoid regexjQuery
		var data,jQuery
			el = this.helper, props = {},jQuery
			smp = this.originalMousePosition,jQuery
			a = this.axis,jQuery
			prevTop = this.position.top,jQuery
			prevLeft = this.position.left,jQuery
			prevWidth = this.size.width,jQuery
			prevHeight = this.size.height,jQuery
			dx = (event.pageX-smp.left)||0,jQuery
			dy = (event.pageY-smp.top)||0,jQuery
			trigger = this._change[a];jQuery
jQuery
		if (!trigger) {jQuery
			return false;jQuery
		}jQuery
jQuery
		// Calculate the attrs that will be changejQuery
		data = trigger.apply(this, [event, dx, dy]);jQuery
jQuery
		// Put this in the mouseDrag handler since the user can start pressing shift while resizingjQuery
		this._updateVirtualBoundaries(event.shiftKey);jQuery
		if (this._aspectRatio || event.shiftKey) {jQuery
			data = this._updateRatio(data, event);jQuery
		}jQuery
jQuery
		data = this._respectSize(data, event);jQuery
jQuery
		this._updateCache(data);jQuery
jQuery
		// plugins callbacks need to be called firstjQuery
		this._propagate("resize", event);jQuery
jQuery
		if (this.position.top !== prevTop) {jQuery
			props.top = this.position.top + "px";jQuery
		}jQuery
		if (this.position.left !== prevLeft) {jQuery
			props.left = this.position.left + "px";jQuery
		}jQuery
		if (this.size.width !== prevWidth) {jQuery
			props.width = this.size.width + "px";jQuery
		}jQuery
		if (this.size.height !== prevHeight) {jQuery
			props.height = this.size.height + "px";jQuery
		}jQuery
		el.css(props);jQuery
jQuery
		if (!this._helper && this._proportionallyResizeElements.length) {jQuery
			this._proportionallyResize();jQuery
		}jQuery
jQuery
		// Call the user callback if the element was resizedjQuery
		if ( ! $.isEmptyObject(props) ) {jQuery
			this._trigger("resize", event, this.ui());jQuery
		}jQuery
jQuery
		return false;jQuery
	},jQuery
jQuery
	_mouseStop: function(event) {jQuery
jQuery
		this.resizing = false;jQuery
		var pr, ista, soffseth, soffsetw, s, left, top,jQuery
			o = this.options, that = this;jQuery
jQuery
		if(this._helper) {jQuery
jQuery
			pr = this._proportionallyResizeElements;jQuery
			ista = pr.length && (/textarea/i).test(pr[0].nodeName);jQuery
			soffseth = ista && $.ui.hasScroll(pr[0], "left") /* TODO - jump height */ ? 0 : that.sizeDiff.height;jQuery
			soffsetw = ista ? 0 : that.sizeDiff.width;jQuery
jQuery
			s = { width: (that.helper.width()  - soffsetw), height: (that.helper.height() - soffseth) };jQuery
			left = (parseInt(that.element.css("left"), 10) + (that.position.left - that.originalPosition.left)) || null;jQuery
			top = (parseInt(that.element.css("top"), 10) + (that.position.top - that.originalPosition.top)) || null;jQuery
jQuery
			if (!o.animate) {jQuery
				this.element.css($.extend(s, { top: top, left: left }));jQuery
			}jQuery
jQuery
			that.helper.height(that.size.height);jQuery
			that.helper.width(that.size.width);jQuery
jQuery
			if (this._helper && !o.animate) {jQuery
				this._proportionallyResize();jQuery
			}jQuery
		}jQuery
jQuery
		$("body").css("cursor", "auto");jQuery
jQuery
		this.element.removeClass("ui-resizable-resizing");jQuery
jQuery
		this._propagate("stop", event);jQuery
jQuery
		if (this._helper) {jQuery
			this.helper.remove();jQuery
		}jQuery
jQuery
		return false;jQuery
jQuery
	},jQuery
jQuery
	_updateVirtualBoundaries: function(forceAspectRatio) {jQuery
		var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b,jQuery
			o = this.options;jQuery
jQuery
		b = {jQuery
			minWidth: isNumber(o.minWidth) ? o.minWidth : 0,jQuery
			maxWidth: isNumber(o.maxWidth) ? o.maxWidth : Infinity,jQuery
			minHeight: isNumber(o.minHeight) ? o.minHeight : 0,jQuery
			maxHeight: isNumber(o.maxHeight) ? o.maxHeight : InfinityjQuery
		};jQuery
jQuery
		if(this._aspectRatio || forceAspectRatio) {jQuery
			// We want to create an enclosing box whose aspect ration is the requested onejQuery
			// First, compute the "projected" size for each dimension based on the aspect ratio and other dimensionjQuery
			pMinWidth = b.minHeight * this.aspectRatio;jQuery
			pMinHeight = b.minWidth / this.aspectRatio;jQuery
			pMaxWidth = b.maxHeight * this.aspectRatio;jQuery
			pMaxHeight = b.maxWidth / this.aspectRatio;jQuery
jQuery
			if(pMinWidth > b.minWidth) {jQuery
				b.minWidth = pMinWidth;jQuery
			}jQuery
			if(pMinHeight > b.minHeight) {jQuery
				b.minHeight = pMinHeight;jQuery
			}jQuery
			if(pMaxWidth < b.maxWidth) {jQuery
				b.maxWidth = pMaxWidth;jQuery
			}jQuery
			if(pMaxHeight < b.maxHeight) {jQuery
				b.maxHeight = pMaxHeight;jQuery
			}jQuery
		}jQuery
		this._vBoundaries = b;jQuery
	},jQuery
jQuery
	_updateCache: function(data) {jQuery
		this.offset = this.helper.offset();jQuery
		if (isNumber(data.left)) {jQuery
			this.position.left = data.left;jQuery
		}jQuery
		if (isNumber(data.top)) {jQuery
			this.position.top = data.top;jQuery
		}jQuery
		if (isNumber(data.height)) {jQuery
			this.size.height = data.height;jQuery
		}jQuery
		if (isNumber(data.width)) {jQuery
			this.size.width = data.width;jQuery
		}jQuery
	},jQuery
jQuery
	_updateRatio: function( data ) {jQuery
jQuery
		var cpos = this.position,jQuery
			csize = this.size,jQuery
			a = this.axis;jQuery
jQuery
		if (isNumber(data.height)) {jQuery
			data.width = (data.height * this.aspectRatio);jQuery
		} else if (isNumber(data.width)) {jQuery
			data.height = (data.width / this.aspectRatio);jQuery
		}jQuery
jQuery
		if (a === "sw") {jQuery
			data.left = cpos.left + (csize.width - data.width);jQuery
			data.top = null;jQuery
		}jQuery
		if (a === "nw") {jQuery
			data.top = cpos.top + (csize.height - data.height);jQuery
			data.left = cpos.left + (csize.width - data.width);jQuery
		}jQuery
jQuery
		return data;jQuery
	},jQuery
jQuery
	_respectSize: function( data ) {jQuery
jQuery
		var o = this._vBoundaries,jQuery
			a = this.axis,jQuery
			ismaxw = isNumber(data.width) && o.maxWidth && (o.maxWidth < data.width), ismaxh = isNumber(data.height) && o.maxHeight && (o.maxHeight < data.height),jQuery
			isminw = isNumber(data.width) && o.minWidth && (o.minWidth > data.width), isminh = isNumber(data.height) && o.minHeight && (o.minHeight > data.height),jQuery
			dw = this.originalPosition.left + this.originalSize.width,jQuery
			dh = this.position.top + this.size.height,jQuery
			cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);jQuery
		if (isminw) {jQuery
			data.width = o.minWidth;jQuery
		}jQuery
		if (isminh) {jQuery
			data.height = o.minHeight;jQuery
		}jQuery
		if (ismaxw) {jQuery
			data.width = o.maxWidth;jQuery
		}jQuery
		if (ismaxh) {jQuery
			data.height = o.maxHeight;jQuery
		}jQuery
jQuery
		if (isminw && cw) {jQuery
			data.left = dw - o.minWidth;jQuery
		}jQuery
		if (ismaxw && cw) {jQuery
			data.left = dw - o.maxWidth;jQuery
		}jQuery
		if (isminh && ch) {jQuery
			data.top = dh - o.minHeight;jQuery
		}jQuery
		if (ismaxh && ch) {jQuery
			data.top = dh - o.maxHeight;jQuery
		}jQuery
jQuery
		// fixing jump error on top/left - bug #2330jQuery
		if (!data.width && !data.height && !data.left && data.top) {jQuery
			data.top = null;jQuery
		} else if (!data.width && !data.height && !data.top && data.left) {jQuery
			data.left = null;jQuery
		}jQuery
jQuery
		return data;jQuery
	},jQuery
jQuery
	_proportionallyResize: function() {jQuery
jQuery
		if (!this._proportionallyResizeElements.length) {jQuery
			return;jQuery
		}jQuery
jQuery
		var i, j, borders, paddings, prel,jQuery
			element = this.helper || this.element;jQuery
jQuery
		for ( i=0; i < this._proportionallyResizeElements.length; i++) {jQuery
jQuery
			prel = this._proportionallyResizeElements[i];jQuery
jQuery
			if (!this.borderDif) {jQuery
				this.borderDif = [];jQuery
				borders = [prel.css("borderTopWidth"), prel.css("borderRightWidth"), prel.css("borderBottomWidth"), prel.css("borderLeftWidth")];jQuery
				paddings = [prel.css("paddingTop"), prel.css("paddingRight"), prel.css("paddingBottom"), prel.css("paddingLeft")];jQuery
jQuery
				for ( j = 0; j < borders.length; j++ ) {jQuery
					this.borderDif[ j ] = ( parseInt( borders[ j ], 10 ) || 0 ) + ( parseInt( paddings[ j ], 10 ) || 0 );jQuery
				}jQuery
			}jQuery
jQuery
			prel.css({jQuery
				height: (element.height() - this.borderDif[0] - this.borderDif[2]) || 0,jQuery
				width: (element.width() - this.borderDif[1] - this.borderDif[3]) || 0jQuery
			});jQuery
jQuery
		}jQuery
jQuery
	},jQuery
jQuery
	_renderProxy: function() {jQuery
jQuery
		var el = this.element, o = this.options;jQuery
		this.elementOffset = el.offset();jQuery
jQuery
		if(this._helper) {jQuery
jQuery
			this.helper = this.helper || $("<div style='overflow:hidden;'></div>");jQuery
jQuery
			this.helper.addClass(this._helper).css({jQuery
				width: this.element.outerWidth() - 1,jQuery
				height: this.element.outerHeight() - 1,jQuery
				position: "absolute",jQuery
				left: this.elementOffset.left +"px",jQuery
				top: this.elementOffset.top +"px",jQuery
				zIndex: ++o.zIndex //TODO: Don't modify optionjQuery
			});jQuery
jQuery
			this.helperjQuery
				.appendTo("body")jQuery
				.disableSelection();jQuery
jQuery
		} else {jQuery
			this.helper = this.element;jQuery
		}jQuery
jQuery
	},jQuery
jQuery
	_change: {jQuery
		e: function(event, dx) {jQuery
			return { width: this.originalSize.width + dx };jQuery
		},jQuery
		w: function(event, dx) {jQuery
			var cs = this.originalSize, sp = this.originalPosition;jQuery
			return { left: sp.left + dx, width: cs.width - dx };jQuery
		},jQuery
		n: function(event, dx, dy) {jQuery
			var cs = this.originalSize, sp = this.originalPosition;jQuery
			return { top: sp.top + dy, height: cs.height - dy };jQuery
		},jQuery
		s: function(event, dx, dy) {jQuery
			return { height: this.originalSize.height + dy };jQuery
		},jQuery
		se: function(event, dx, dy) {jQuery
			return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));jQuery
		},jQuery
		sw: function(event, dx, dy) {jQuery
			return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));jQuery
		},jQuery
		ne: function(event, dx, dy) {jQuery
			return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));jQuery
		},jQuery
		nw: function(event, dx, dy) {jQuery
			return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));jQuery
		}jQuery
	},jQuery
jQuery
	_propagate: function(n, event) {jQuery
		$.ui.plugin.call(this, n, [event, this.ui()]);jQuery
		(n !== "resize" && this._trigger(n, event, this.ui()));jQuery
	},jQuery
jQuery
	plugins: {},jQuery
jQuery
	ui: function() {jQuery
		return {jQuery
			originalElement: this.originalElement,jQuery
			element: this.element,jQuery
			helper: this.helper,jQuery
			position: this.position,jQuery
			size: this.size,jQuery
			originalSize: this.originalSize,jQuery
			originalPosition: this.originalPositionjQuery
		};jQuery
	}jQuery
jQuery
});jQuery
jQuery
/*jQuery
 * Resizable ExtensionsjQuery
 */jQuery
jQuery
$.ui.plugin.add("resizable", "animate", {jQuery
jQuery
	stop: function( event ) {jQuery
		var that = $(this).data("ui-resizable"),jQuery
			o = that.options,jQuery
			pr = that._proportionallyResizeElements,jQuery
			ista = pr.length && (/textarea/i).test(pr[0].nodeName),jQuery
			soffseth = ista && $.ui.hasScroll(pr[0], "left") /* TODO - jump height */ ? 0 : that.sizeDiff.height,jQuery
			soffsetw = ista ? 0 : that.sizeDiff.width,jQuery
			style = { width: (that.size.width - soffsetw), height: (that.size.height - soffseth) },jQuery
			left = (parseInt(that.element.css("left"), 10) + (that.position.left - that.originalPosition.left)) || null,jQuery
			top = (parseInt(that.element.css("top"), 10) + (that.position.top - that.originalPosition.top)) || null;jQuery
jQuery
		that.element.animate(jQuery
			$.extend(style, top && left ? { top: top, left: left } : {}), {jQuery
				duration: o.animateDuration,jQuery
				easing: o.animateEasing,jQuery
				step: function() {jQuery
jQuery
					var data = {jQuery
						width: parseInt(that.element.css("width"), 10),jQuery
						height: parseInt(that.element.css("height"), 10),jQuery
						top: parseInt(that.element.css("top"), 10),jQuery
						left: parseInt(that.element.css("left"), 10)jQuery
					};jQuery
jQuery
					if (pr && pr.length) {jQuery
						$(pr[0]).css({ width: data.width, height: data.height });jQuery
					}jQuery
jQuery
					// propagating resize, and updating values for each animation stepjQuery
					that._updateCache(data);jQuery
					that._propagate("resize", event);jQuery
jQuery
				}jQuery
			}jQuery
		);jQuery
	}jQuery
jQuery
});jQuery
jQuery
$.ui.plugin.add("resizable", "containment", {jQuery
jQuery
	start: function() {jQuery
		var element, p, co, ch, cw, width, height,jQuery
			that = $(this).data("ui-resizable"),jQuery
			o = that.options,jQuery
			el = that.element,jQuery
			oc = o.containment,jQuery
			ce = (oc instanceof $) ? oc.get(0) : (/parent/.test(oc)) ? el.parent().get(0) : oc;jQuery
jQuery
		if (!ce) {jQuery
			return;jQuery
		}jQuery
jQuery
		that.containerElement = $(ce);jQuery
jQuery
		if (/document/.test(oc) || oc === document) {jQuery
			that.containerOffset = { left: 0, top: 0 };jQuery
			that.containerPosition = { left: 0, top: 0 };jQuery
jQuery
			that.parentData = {jQuery
				element: $(document), left: 0, top: 0,jQuery
				width: $(document).width(), height: $(document).height() || document.body.parentNode.scrollHeightjQuery
			};jQuery
		}jQuery
jQuery
		// i'm a node, so compute top, left, right, bottomjQuery
		else {jQuery
			element = $(ce);jQuery
			p = [];jQuery
			$([ "Top", "Right", "Left", "Bottom" ]).each(function(i, name) { p[i] = num(element.css("padding" + name)); });jQuery
jQuery
			that.containerOffset = element.offset();jQuery
			that.containerPosition = element.position();jQuery
			that.containerSize = { height: (element.innerHeight() - p[3]), width: (element.innerWidth() - p[1]) };jQuery
jQuery
			co = that.containerOffset;jQuery
			ch = that.containerSize.height;jQuery
			cw = that.containerSize.width;jQuery
			width = ($.ui.hasScroll(ce, "left") ? ce.scrollWidth : cw );jQuery
			height = ($.ui.hasScroll(ce) ? ce.scrollHeight : ch);jQuery
jQuery
			that.parentData = {jQuery
				element: ce, left: co.left, top: co.top, width: width, height: heightjQuery
			};jQuery
		}jQuery
	},jQuery
jQuery
	resize: function( event ) {jQuery
		var woset, hoset, isParent, isOffsetRelative,jQuery
			that = $(this).data("ui-resizable"),jQuery
			o = that.options,jQuery
			co = that.containerOffset, cp = that.position,jQuery
			pRatio = that._aspectRatio || event.shiftKey,jQuery
			cop = { top:0, left:0 }, ce = that.containerElement;jQuery
jQuery
		if (ce[0] !== document && (/static/).test(ce.css("position"))) {jQuery
			cop = co;jQuery
		}jQuery
jQuery
		if (cp.left < (that._helper ? co.left : 0)) {jQuery
			that.size.width = that.size.width + (that._helper ? (that.position.left - co.left) : (that.position.left - cop.left));jQuery
			if (pRatio) {jQuery
				that.size.height = that.size.width / that.aspectRatio;jQuery
			}jQuery
			that.position.left = o.helper ? co.left : 0;jQuery
		}jQuery
jQuery
		if (cp.top < (that._helper ? co.top : 0)) {jQuery
			that.size.height = that.size.height + (that._helper ? (that.position.top - co.top) : that.position.top);jQuery
			if (pRatio) {jQuery
				that.size.width = that.size.height * that.aspectRatio;jQuery
			}jQuery
			that.position.top = that._helper ? co.top : 0;jQuery
		}jQuery
jQuery
		that.offset.left = that.parentData.left+that.position.left;jQuery
		that.offset.top = that.parentData.top+that.position.top;jQuery
jQuery
		woset = Math.abs( (that._helper ? that.offset.left - cop.left : (that.offset.left - cop.left)) + that.sizeDiff.width );jQuery
		hoset = Math.abs( (that._helper ? that.offset.top - cop.top : (that.offset.top - co.top)) + that.sizeDiff.height );jQuery
jQuery
		isParent = that.containerElement.get(0) === that.element.parent().get(0);jQuery
		isOffsetRelative = /relative|absolute/.test(that.containerElement.css("position"));jQuery
jQuery
		if ( isParent && isOffsetRelative ) {jQuery
			woset -= Math.abs( that.parentData.left );jQuery
		}jQuery
jQuery
		if (woset + that.size.width >= that.parentData.width) {jQuery
			that.size.width = that.parentData.width - woset;jQuery
			if (pRatio) {jQuery
				that.size.height = that.size.width / that.aspectRatio;jQuery
			}jQuery
		}jQuery
jQuery
		if (hoset + that.size.height >= that.parentData.height) {jQuery
			that.size.height = that.parentData.height - hoset;jQuery
			if (pRatio) {jQuery
				that.size.width = that.size.height * that.aspectRatio;jQuery
			}jQuery
		}jQuery
	},jQuery
jQuery
	stop: function(){jQuery
		var that = $(this).data("ui-resizable"),jQuery
			o = that.options,jQuery
			co = that.containerOffset,jQuery
			cop = that.containerPosition,jQuery
			ce = that.containerElement,jQuery
			helper = $(that.helper),jQuery
			ho = helper.offset(),jQuery
			w = helper.outerWidth() - that.sizeDiff.width,jQuery
			h = helper.outerHeight() - that.sizeDiff.height;jQuery
jQuery
		if (that._helper && !o.animate && (/relative/).test(ce.css("position"))) {jQuery
			$(this).css({ left: ho.left - cop.left - co.left, width: w, height: h });jQuery
		}jQuery
jQuery
		if (that._helper && !o.animate && (/static/).test(ce.css("position"))) {jQuery
			$(this).css({ left: ho.left - cop.left - co.left, width: w, height: h });jQuery
		}jQuery
jQuery
	}jQuery
});jQuery
jQuery
$.ui.plugin.add("resizable", "alsoResize", {jQuery
jQuery
	start: function () {jQuery
		var that = $(this).data("ui-resizable"),jQuery
			o = that.options,jQuery
			_store = function (exp) {jQuery
				$(exp).each(function() {jQuery
					var el = $(this);jQuery
					el.data("ui-resizable-alsoresize", {jQuery
						width: parseInt(el.width(), 10), height: parseInt(el.height(), 10),jQuery
						left: parseInt(el.css("left"), 10), top: parseInt(el.css("top"), 10)jQuery
					});jQuery
				});jQuery
			};jQuery
jQuery
		if (typeof(o.alsoResize) === "object" && !o.alsoResize.parentNode) {jQuery
			if (o.alsoResize.length) { o.alsoResize = o.alsoResize[0]; _store(o.alsoResize); }jQuery
			else { $.each(o.alsoResize, function (exp) { _store(exp); }); }jQuery
		}else{jQuery
			_store(o.alsoResize);jQuery
		}jQuery
	},jQuery
jQuery
	resize: function (event, ui) {jQuery
		var that = $(this).data("ui-resizable"),jQuery
			o = that.options,jQuery
			os = that.originalSize,jQuery
			op = that.originalPosition,jQuery
			delta = {jQuery
				height: (that.size.height - os.height) || 0, width: (that.size.width - os.width) || 0,jQuery
				top: (that.position.top - op.top) || 0, left: (that.position.left - op.left) || 0jQuery
			},jQuery
jQuery
			_alsoResize = function (exp, c) {jQuery
				$(exp).each(function() {jQuery
					var el = $(this), start = $(this).data("ui-resizable-alsoresize"), style = {},jQuery
						css = c && c.length ? c : el.parents(ui.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];jQuery
jQuery
					$.each(css, function (i, prop) {jQuery
						var sum = (start[prop]||0) + (delta[prop]||0);jQuery
						if (sum && sum >= 0) {jQuery
							style[prop] = sum || null;jQuery
						}jQuery
					});jQuery
jQuery
					el.css(style);jQuery
				});jQuery
			};jQuery
jQuery
		if (typeof(o.alsoResize) === "object" && !o.alsoResize.nodeType) {jQuery
			$.each(o.alsoResize, function (exp, c) { _alsoResize(exp, c); });jQuery
		}else{jQuery
			_alsoResize(o.alsoResize);jQuery
		}jQuery
	},jQuery
jQuery
	stop: function () {jQuery
		$(this).removeData("resizable-alsoresize");jQuery
	}jQuery
});jQuery
jQuery
$.ui.plugin.add("resizable", "ghost", {jQuery
jQuery
	start: function() {jQuery
jQuery
		var that = $(this).data("ui-resizable"), o = that.options, cs = that.size;jQuery
jQuery
		that.ghost = that.originalElement.clone();jQuery
		that.ghostjQuery
			.css({ opacity: 0.25, display: "block", position: "relative", height: cs.height, width: cs.width, margin: 0, left: 0, top: 0 })jQuery
			.addClass("ui-resizable-ghost")jQuery
			.addClass(typeof o.ghost === "string" ? o.ghost : "");jQuery
jQuery
		that.ghost.appendTo(that.helper);jQuery
jQuery
	},jQuery
jQuery
	resize: function(){jQuery
		var that = $(this).data("ui-resizable");jQuery
		if (that.ghost) {jQuery
			that.ghost.css({ position: "relative", height: that.size.height, width: that.size.width });jQuery
		}jQuery
	},jQuery
jQuery
	stop: function() {jQuery
		var that = $(this).data("ui-resizable");jQuery
		if (that.ghost && that.helper) {jQuery
			that.helper.get(0).removeChild(that.ghost.get(0));jQuery
		}jQuery
	}jQuery
jQuery
});jQuery
jQuery
$.ui.plugin.add("resizable", "grid", {jQuery
jQuery
	resize: function() {jQuery
		var that = $(this).data("ui-resizable"),jQuery
			o = that.options,jQuery
			cs = that.size,jQuery
			os = that.originalSize,jQuery
			op = that.originalPosition,jQuery
			a = that.axis,jQuery
			grid = typeof o.grid === "number" ? [o.grid, o.grid] : o.grid,jQuery
			gridX = (grid[0]||1),jQuery
			gridY = (grid[1]||1),jQuery
			ox = Math.round((cs.width - os.width) / gridX) * gridX,jQuery
			oy = Math.round((cs.height - os.height) / gridY) * gridY,jQuery
			newWidth = os.width + ox,jQuery
			newHeight = os.height + oy,jQuery
			isMaxWidth = o.maxWidth && (o.maxWidth < newWidth),jQuery
			isMaxHeight = o.maxHeight && (o.maxHeight < newHeight),jQuery
			isMinWidth = o.minWidth && (o.minWidth > newWidth),jQuery
			isMinHeight = o.minHeight && (o.minHeight > newHeight);jQuery
jQuery
		o.grid = grid;jQuery
jQuery
		if (isMinWidth) {jQuery
			newWidth = newWidth + gridX;jQuery
		}jQuery
		if (isMinHeight) {jQuery
			newHeight = newHeight + gridY;jQuery
		}jQuery
		if (isMaxWidth) {jQuery
			newWidth = newWidth - gridX;jQuery
		}jQuery
		if (isMaxHeight) {jQuery
			newHeight = newHeight - gridY;jQuery
		}jQuery
jQuery
		if (/^(se|s|e)$/.test(a)) {jQuery
			that.size.width = newWidth;jQuery
			that.size.height = newHeight;jQuery
		} else if (/^(ne)$/.test(a)) {jQuery
			that.size.width = newWidth;jQuery
			that.size.height = newHeight;jQuery
			that.position.top = op.top - oy;jQuery
		} else if (/^(sw)$/.test(a)) {jQuery
			that.size.width = newWidth;jQuery
			that.size.height = newHeight;jQuery
			that.position.left = op.left - ox;jQuery
		} else {jQuery
			if ( newHeight - gridY > 0 ) {jQuery
				that.size.height = newHeight;jQuery
				that.position.top = op.top - oy;jQuery
			} else {jQuery
				that.size.height = gridY;jQuery
				that.position.top = op.top + os.height - gridY;jQuery
			}jQuery
			if ( newWidth - gridX > 0 ) {jQuery
				that.size.width = newWidth;jQuery
				that.position.left = op.left - ox;jQuery
			} else {jQuery
				that.size.width = gridX;jQuery
				that.position.left = op.left + os.width - gridX;jQuery
			}jQuery
		}jQuery
	}jQuery
jQuery
});jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
$.widget("ui.selectable", $.ui.mouse, {jQuery
	version: "1.10.4",jQuery
	options: {jQuery
		appendTo: "body",jQuery
		autoRefresh: true,jQuery
		distance: 0,jQuery
		filter: "*",jQuery
		tolerance: "touch",jQuery
jQuery
		// callbacksjQuery
		selected: null,jQuery
		selecting: null,jQuery
		start: null,jQuery
		stop: null,jQuery
		unselected: null,jQuery
		unselecting: nulljQuery
	},jQuery
	_create: function() {jQuery
		var selectees,jQuery
			that = this;jQuery
jQuery
		this.element.addClass("ui-selectable");jQuery
jQuery
		this.dragged = false;jQuery
jQuery
		// cache selectee children based on filterjQuery
		this.refresh = function() {jQuery
			selectees = $(that.options.filter, that.element[0]);jQuery
			selectees.addClass("ui-selectee");jQuery
			selectees.each(function() {jQuery
				var $this = $(this),jQuery
					pos = $this.offset();jQuery
				$.data(this, "selectable-item", {jQuery
					element: this,jQuery
					$element: $this,jQuery
					left: pos.left,jQuery
					top: pos.top,jQuery
					right: pos.left + $this.outerWidth(),jQuery
					bottom: pos.top + $this.outerHeight(),jQuery
					startselected: false,jQuery
					selected: $this.hasClass("ui-selected"),jQuery
					selecting: $this.hasClass("ui-selecting"),jQuery
					unselecting: $this.hasClass("ui-unselecting")jQuery
				});jQuery
			});jQuery
		};jQuery
		this.refresh();jQuery
jQuery
		this.selectees = selectees.addClass("ui-selectee");jQuery
jQuery
		this._mouseInit();jQuery
jQuery
		this.helper = $("<div class='ui-selectable-helper'></div>");jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		this.selecteesjQuery
			.removeClass("ui-selectee")jQuery
			.removeData("selectable-item");jQuery
		this.elementjQuery
			.removeClass("ui-selectable ui-selectable-disabled");jQuery
		this._mouseDestroy();jQuery
	},jQuery
jQuery
	_mouseStart: function(event) {jQuery
		var that = this,jQuery
			options = this.options;jQuery
jQuery
		this.opos = [event.pageX, event.pageY];jQuery
jQuery
		if (this.options.disabled) {jQuery
			return;jQuery
		}jQuery
jQuery
		this.selectees = $(options.filter, this.element[0]);jQuery
jQuery
		this._trigger("start", event);jQuery
jQuery
		$(options.appendTo).append(this.helper);jQuery
		// position helper (lasso)jQuery
		this.helper.css({jQuery
			"left": event.pageX,jQuery
			"top": event.pageY,jQuery
			"width": 0,jQuery
			"height": 0jQuery
		});jQuery
jQuery
		if (options.autoRefresh) {jQuery
			this.refresh();jQuery
		}jQuery
jQuery
		this.selectees.filter(".ui-selected").each(function() {jQuery
			var selectee = $.data(this, "selectable-item");jQuery
			selectee.startselected = true;jQuery
			if (!event.metaKey && !event.ctrlKey) {jQuery
				selectee.$element.removeClass("ui-selected");jQuery
				selectee.selected = false;jQuery
				selectee.$element.addClass("ui-unselecting");jQuery
				selectee.unselecting = true;jQuery
				// selectable UNSELECTING callbackjQuery
				that._trigger("unselecting", event, {jQuery
					unselecting: selectee.elementjQuery
				});jQuery
			}jQuery
		});jQuery
jQuery
		$(event.target).parents().addBack().each(function() {jQuery
			var doSelect,jQuery
				selectee = $.data(this, "selectable-item");jQuery
			if (selectee) {jQuery
				doSelect = (!event.metaKey && !event.ctrlKey) || !selectee.$element.hasClass("ui-selected");jQuery
				selectee.$elementjQuery
					.removeClass(doSelect ? "ui-unselecting" : "ui-selected")jQuery
					.addClass(doSelect ? "ui-selecting" : "ui-unselecting");jQuery
				selectee.unselecting = !doSelect;jQuery
				selectee.selecting = doSelect;jQuery
				selectee.selected = doSelect;jQuery
				// selectable (UN)SELECTING callbackjQuery
				if (doSelect) {jQuery
					that._trigger("selecting", event, {jQuery
						selecting: selectee.elementjQuery
					});jQuery
				} else {jQuery
					that._trigger("unselecting", event, {jQuery
						unselecting: selectee.elementjQuery
					});jQuery
				}jQuery
				return false;jQuery
			}jQuery
		});jQuery
jQuery
	},jQuery
jQuery
	_mouseDrag: function(event) {jQuery
jQuery
		this.dragged = true;jQuery
jQuery
		if (this.options.disabled) {jQuery
			return;jQuery
		}jQuery
jQuery
		var tmp,jQuery
			that = this,jQuery
			options = this.options,jQuery
			x1 = this.opos[0],jQuery
			y1 = this.opos[1],jQuery
			x2 = event.pageX,jQuery
			y2 = event.pageY;jQuery
jQuery
		if (x1 > x2) { tmp = x2; x2 = x1; x1 = tmp; }jQuery
		if (y1 > y2) { tmp = y2; y2 = y1; y1 = tmp; }jQuery
		this.helper.css({left: x1, top: y1, width: x2-x1, height: y2-y1});jQuery
jQuery
		this.selectees.each(function() {jQuery
			var selectee = $.data(this, "selectable-item"),jQuery
				hit = false;jQuery
jQuery
			//prevent helper from being selected if appendTo: selectablejQuery
			if (!selectee || selectee.element === that.element[0]) {jQuery
				return;jQuery
			}jQuery
jQuery
			if (options.tolerance === "touch") {jQuery
				hit = ( !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1) );jQuery
			} else if (options.tolerance === "fit") {jQuery
				hit = (selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2);jQuery
			}jQuery
jQuery
			if (hit) {jQuery
				// SELECTjQuery
				if (selectee.selected) {jQuery
					selectee.$element.removeClass("ui-selected");jQuery
					selectee.selected = false;jQuery
				}jQuery
				if (selectee.unselecting) {jQuery
					selectee.$element.removeClass("ui-unselecting");jQuery
					selectee.unselecting = false;jQuery
				}jQuery
				if (!selectee.selecting) {jQuery
					selectee.$element.addClass("ui-selecting");jQuery
					selectee.selecting = true;jQuery
					// selectable SELECTING callbackjQuery
					that._trigger("selecting", event, {jQuery
						selecting: selectee.elementjQuery
					});jQuery
				}jQuery
			} else {jQuery
				// UNSELECTjQuery
				if (selectee.selecting) {jQuery
					if ((event.metaKey || event.ctrlKey) && selectee.startselected) {jQuery
						selectee.$element.removeClass("ui-selecting");jQuery
						selectee.selecting = false;jQuery
						selectee.$element.addClass("ui-selected");jQuery
						selectee.selected = true;jQuery
					} else {jQuery
						selectee.$element.removeClass("ui-selecting");jQuery
						selectee.selecting = false;jQuery
						if (selectee.startselected) {jQuery
							selectee.$element.addClass("ui-unselecting");jQuery
							selectee.unselecting = true;jQuery
						}jQuery
						// selectable UNSELECTING callbackjQuery
						that._trigger("unselecting", event, {jQuery
							unselecting: selectee.elementjQuery
						});jQuery
					}jQuery
				}jQuery
				if (selectee.selected) {jQuery
					if (!event.metaKey && !event.ctrlKey && !selectee.startselected) {jQuery
						selectee.$element.removeClass("ui-selected");jQuery
						selectee.selected = false;jQuery
jQuery
						selectee.$element.addClass("ui-unselecting");jQuery
						selectee.unselecting = true;jQuery
						// selectable UNSELECTING callbackjQuery
						that._trigger("unselecting", event, {jQuery
							unselecting: selectee.elementjQuery
						});jQuery
					}jQuery
				}jQuery
			}jQuery
		});jQuery
jQuery
		return false;jQuery
	},jQuery
jQuery
	_mouseStop: function(event) {jQuery
		var that = this;jQuery
jQuery
		this.dragged = false;jQuery
jQuery
		$(".ui-unselecting", this.element[0]).each(function() {jQuery
			var selectee = $.data(this, "selectable-item");jQuery
			selectee.$element.removeClass("ui-unselecting");jQuery
			selectee.unselecting = false;jQuery
			selectee.startselected = false;jQuery
			that._trigger("unselected", event, {jQuery
				unselected: selectee.elementjQuery
			});jQuery
		});jQuery
		$(".ui-selecting", this.element[0]).each(function() {jQuery
			var selectee = $.data(this, "selectable-item");jQuery
			selectee.$element.removeClass("ui-selecting").addClass("ui-selected");jQuery
			selectee.selecting = false;jQuery
			selectee.selected = true;jQuery
			selectee.startselected = true;jQuery
			that._trigger("selected", event, {jQuery
				selected: selectee.elementjQuery
			});jQuery
		});jQuery
		this._trigger("stop", event);jQuery
jQuery
		this.helper.remove();jQuery
jQuery
		return false;jQuery
	}jQuery
jQuery
});jQuery
jQuery
})(jQuery);jQuery
(function( $, undefined ) {jQuery
jQuery
// number of pages in a sliderjQuery
// (how many times can you page up/down to go through the whole range)jQuery
var numPages = 5;jQuery
jQuery
$.widget( "ui.slider", $.ui.mouse, {jQuery
	version: "1.10.4",jQuery
	widgetEventPrefix: "slide",jQuery
jQuery
	options: {jQuery
		animate: false,jQuery
		distance: 0,jQuery
		max: 100,jQuery
		min: 0,jQuery
		orientation: "horizontal",jQuery
		range: false,jQuery
		step: 1,jQuery
		value: 0,jQuery
		values: null,jQuery
jQuery
		// callbacksjQuery
		change: null,jQuery
		slide: null,jQuery
		start: null,jQuery
		stop: nulljQuery
	},jQuery
jQuery
	_create: function() {jQuery
		this._keySliding = false;jQuery
		this._mouseSliding = false;jQuery
		this._animateOff = true;jQuery
		this._handleIndex = null;jQuery
		this._detectOrientation();jQuery
		this._mouseInit();jQuery
jQuery
		this.elementjQuery
			.addClass( "ui-slider" +jQuery
				" ui-slider-" + this.orientation +jQuery
				" ui-widget" +jQuery
				" ui-widget-content" +jQuery
				" ui-corner-all");jQuery
jQuery
		this._refresh();jQuery
		this._setOption( "disabled", this.options.disabled );jQuery
jQuery
		this._animateOff = false;jQuery
	},jQuery
jQuery
	_refresh: function() {jQuery
		this._createRange();jQuery
		this._createHandles();jQuery
		this._setupEvents();jQuery
		this._refreshValue();jQuery
	},jQuery
jQuery
	_createHandles: function() {jQuery
		var i, handleCount,jQuery
			options = this.options,jQuery
			existingHandles = this.element.find( ".ui-slider-handle" ).addClass( "ui-state-default ui-corner-all" ),jQuery
			handle = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",jQuery
			handles = [];jQuery
jQuery
		handleCount = ( options.values && options.values.length ) || 1;jQuery
jQuery
		if ( existingHandles.length > handleCount ) {jQuery
			existingHandles.slice( handleCount ).remove();jQuery
			existingHandles = existingHandles.slice( 0, handleCount );jQuery
		}jQuery
jQuery
		for ( i = existingHandles.length; i < handleCount; i++ ) {jQuery
			handles.push( handle );jQuery
		}jQuery
jQuery
		this.handles = existingHandles.add( $( handles.join( "" ) ).appendTo( this.element ) );jQuery
jQuery
		this.handle = this.handles.eq( 0 );jQuery
jQuery
		this.handles.each(function( i ) {jQuery
			$( this ).data( "ui-slider-handle-index", i );jQuery
		});jQuery
	},jQuery
jQuery
	_createRange: function() {jQuery
		var options = this.options,jQuery
			classes = "";jQuery
jQuery
		if ( options.range ) {jQuery
			if ( options.range === true ) {jQuery
				if ( !options.values ) {jQuery
					options.values = [ this._valueMin(), this._valueMin() ];jQuery
				} else if ( options.values.length && options.values.length !== 2 ) {jQuery
					options.values = [ options.values[0], options.values[0] ];jQuery
				} else if ( $.isArray( options.values ) ) {jQuery
					options.values = options.values.slice(0);jQuery
				}jQuery
			}jQuery
jQuery
			if ( !this.range || !this.range.length ) {jQuery
				this.range = $( "<div></div>" )jQuery
					.appendTo( this.element );jQuery
jQuery
				classes = "ui-slider-range" +jQuery
				// note: this isn't the most fittingly semantic framework class for this element,jQuery
				// but worked best visually with a variety of themesjQuery
				" ui-widget-header ui-corner-all";jQuery
			} else {jQuery
				this.range.removeClass( "ui-slider-range-min ui-slider-range-max" )jQuery
					// Handle range switching from true to min/maxjQuery
					.css({jQuery
						"left": "",jQuery
						"bottom": ""jQuery
					});jQuery
			}jQuery
jQuery
			this.range.addClass( classes +jQuery
				( ( options.range === "min" || options.range === "max" ) ? " ui-slider-range-" + options.range : "" ) );jQuery
		} else {jQuery
			if ( this.range ) {jQuery
				this.range.remove();jQuery
			}jQuery
			this.range = null;jQuery
		}jQuery
	},jQuery
jQuery
	_setupEvents: function() {jQuery
		var elements = this.handles.add( this.range ).filter( "a" );jQuery
		this._off( elements );jQuery
		this._on( elements, this._handleEvents );jQuery
		this._hoverable( elements );jQuery
		this._focusable( elements );jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		this.handles.remove();jQuery
		if ( this.range ) {jQuery
			this.range.remove();jQuery
		}jQuery
jQuery
		this.elementjQuery
			.removeClass( "ui-slider" +jQuery
				" ui-slider-horizontal" +jQuery
				" ui-slider-vertical" +jQuery
				" ui-widget" +jQuery
				" ui-widget-content" +jQuery
				" ui-corner-all" );jQuery
jQuery
		this._mouseDestroy();jQuery
	},jQuery
jQuery
	_mouseCapture: function( event ) {jQuery
		var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle,jQuery
			that = this,jQuery
			o = this.options;jQuery
jQuery
		if ( o.disabled ) {jQuery
			return false;jQuery
		}jQuery
jQuery
		this.elementSize = {jQuery
			width: this.element.outerWidth(),jQuery
			height: this.element.outerHeight()jQuery
		};jQuery
		this.elementOffset = this.element.offset();jQuery
jQuery
		position = { x: event.pageX, y: event.pageY };jQuery
		normValue = this._normValueFromMouse( position );jQuery
		distance = this._valueMax() - this._valueMin() + 1;jQuery
		this.handles.each(function( i ) {jQuery
			var thisDistance = Math.abs( normValue - that.values(i) );jQuery
			if (( distance > thisDistance ) ||jQuery
				( distance === thisDistance &&jQuery
					(i === that._lastChangedValue || that.values(i) === o.min ))) {jQuery
				distance = thisDistance;jQuery
				closestHandle = $( this );jQuery
				index = i;jQuery
			}jQuery
		});jQuery
jQuery
		allowed = this._start( event, index );jQuery
		if ( allowed === false ) {jQuery
			return false;jQuery
		}jQuery
		this._mouseSliding = true;jQuery
jQuery
		this._handleIndex = index;jQuery
jQuery
		closestHandlejQuery
			.addClass( "ui-state-active" )jQuery
			.focus();jQuery
jQuery
		offset = closestHandle.offset();jQuery
		mouseOverHandle = !$( event.target ).parents().addBack().is( ".ui-slider-handle" );jQuery
		this._clickOffset = mouseOverHandle ? { left: 0, top: 0 } : {jQuery
			left: event.pageX - offset.left - ( closestHandle.width() / 2 ),jQuery
			top: event.pageY - offset.top -jQuery
				( closestHandle.height() / 2 ) -jQuery
				( parseInt( closestHandle.css("borderTopWidth"), 10 ) || 0 ) -jQuery
				( parseInt( closestHandle.css("borderBottomWidth"), 10 ) || 0) +jQuery
				( parseInt( closestHandle.css("marginTop"), 10 ) || 0)jQuery
		};jQuery
jQuery
		if ( !this.handles.hasClass( "ui-state-hover" ) ) {jQuery
			this._slide( event, index, normValue );jQuery
		}jQuery
		this._animateOff = true;jQuery
		return true;jQuery
	},jQuery
jQuery
	_mouseStart: function() {jQuery
		return true;jQuery
	},jQuery
jQuery
	_mouseDrag: function( event ) {jQuery
		var position = { x: event.pageX, y: event.pageY },jQuery
			normValue = this._normValueFromMouse( position );jQuery
jQuery
		this._slide( event, this._handleIndex, normValue );jQuery
jQuery
		return false;jQuery
	},jQuery
jQuery
	_mouseStop: function( event ) {jQuery
		this.handles.removeClass( "ui-state-active" );jQuery
		this._mouseSliding = false;jQuery
jQuery
		this._stop( event, this._handleIndex );jQuery
		this._change( event, this._handleIndex );jQuery
jQuery
		this._handleIndex = null;jQuery
		this._clickOffset = null;jQuery
		this._animateOff = false;jQuery
jQuery
		return false;jQuery
	},jQuery
jQuery
	_detectOrientation: function() {jQuery
		this.orientation = ( this.options.orientation === "vertical" ) ? "vertical" : "horizontal";jQuery
	},jQuery
jQuery
	_normValueFromMouse: function( position ) {jQuery
		var pixelTotal,jQuery
			pixelMouse,jQuery
			percentMouse,jQuery
			valueTotal,jQuery
			valueMouse;jQuery
jQuery
		if ( this.orientation === "horizontal" ) {jQuery
			pixelTotal = this.elementSize.width;jQuery
			pixelMouse = position.x - this.elementOffset.left - ( this._clickOffset ? this._clickOffset.left : 0 );jQuery
		} else {jQuery
			pixelTotal = this.elementSize.height;jQuery
			pixelMouse = position.y - this.elementOffset.top - ( this._clickOffset ? this._clickOffset.top : 0 );jQuery
		}jQuery
jQuery
		percentMouse = ( pixelMouse / pixelTotal );jQuery
		if ( percentMouse > 1 ) {jQuery
			percentMouse = 1;jQuery
		}jQuery
		if ( percentMouse < 0 ) {jQuery
			percentMouse = 0;jQuery
		}jQuery
		if ( this.orientation === "vertical" ) {jQuery
			percentMouse = 1 - percentMouse;jQuery
		}jQuery
jQuery
		valueTotal = this._valueMax() - this._valueMin();jQuery
		valueMouse = this._valueMin() + percentMouse * valueTotal;jQuery
jQuery
		return this._trimAlignValue( valueMouse );jQuery
	},jQuery
jQuery
	_start: function( event, index ) {jQuery
		var uiHash = {jQuery
			handle: this.handles[ index ],jQuery
			value: this.value()jQuery
		};jQuery
		if ( this.options.values && this.options.values.length ) {jQuery
			uiHash.value = this.values( index );jQuery
			uiHash.values = this.values();jQuery
		}jQuery
		return this._trigger( "start", event, uiHash );jQuery
	},jQuery
jQuery
	_slide: function( event, index, newVal ) {jQuery
		var otherVal,jQuery
			newValues,jQuery
			allowed;jQuery
jQuery
		if ( this.options.values && this.options.values.length ) {jQuery
			otherVal = this.values( index ? 0 : 1 );jQuery
jQuery
			if ( ( this.options.values.length === 2 && this.options.range === true ) &&jQuery
					( ( index === 0 && newVal > otherVal) || ( index === 1 && newVal < otherVal ) )jQuery
				) {jQuery
				newVal = otherVal;jQuery
			}jQuery
jQuery
			if ( newVal !== this.values( index ) ) {jQuery
				newValues = this.values();jQuery
				newValues[ index ] = newVal;jQuery
				// A slide can be canceled by returning false from the slide callbackjQuery
				allowed = this._trigger( "slide", event, {jQuery
					handle: this.handles[ index ],jQuery
					value: newVal,jQuery
					values: newValuesjQuery
				} );jQuery
				otherVal = this.values( index ? 0 : 1 );jQuery
				if ( allowed !== false ) {jQuery
					this.values( index, newVal );jQuery
				}jQuery
			}jQuery
		} else {jQuery
			if ( newVal !== this.value() ) {jQuery
				// A slide can be canceled by returning false from the slide callbackjQuery
				allowed = this._trigger( "slide", event, {jQuery
					handle: this.handles[ index ],jQuery
					value: newValjQuery
				} );jQuery
				if ( allowed !== false ) {jQuery
					this.value( newVal );jQuery
				}jQuery
			}jQuery
		}jQuery
	},jQuery
jQuery
	_stop: function( event, index ) {jQuery
		var uiHash = {jQuery
			handle: this.handles[ index ],jQuery
			value: this.value()jQuery
		};jQuery
		if ( this.options.values && this.options.values.length ) {jQuery
			uiHash.value = this.values( index );jQuery
			uiHash.values = this.values();jQuery
		}jQuery
jQuery
		this._trigger( "stop", event, uiHash );jQuery
	},jQuery
jQuery
	_change: function( event, index ) {jQuery
		if ( !this._keySliding && !this._mouseSliding ) {jQuery
			var uiHash = {jQuery
				handle: this.handles[ index ],jQuery
				value: this.value()jQuery
			};jQuery
			if ( this.options.values && this.options.values.length ) {jQuery
				uiHash.value = this.values( index );jQuery
				uiHash.values = this.values();jQuery
			}jQuery
jQuery
			//store the last changed value index for reference when handles overlapjQuery
			this._lastChangedValue = index;jQuery
jQuery
			this._trigger( "change", event, uiHash );jQuery
		}jQuery
	},jQuery
jQuery
	value: function( newValue ) {jQuery
		if ( arguments.length ) {jQuery
			this.options.value = this._trimAlignValue( newValue );jQuery
			this._refreshValue();jQuery
			this._change( null, 0 );jQuery
			return;jQuery
		}jQuery
jQuery
		return this._value();jQuery
	},jQuery
jQuery
	values: function( index, newValue ) {jQuery
		var vals,jQuery
			newValues,jQuery
			i;jQuery
jQuery
		if ( arguments.length > 1 ) {jQuery
			this.options.values[ index ] = this._trimAlignValue( newValue );jQuery
			this._refreshValue();jQuery
			this._change( null, index );jQuery
			return;jQuery
		}jQuery
jQuery
		if ( arguments.length ) {jQuery
			if ( $.isArray( arguments[ 0 ] ) ) {jQuery
				vals = this.options.values;jQuery
				newValues = arguments[ 0 ];jQuery
				for ( i = 0; i < vals.length; i += 1 ) {jQuery
					vals[ i ] = this._trimAlignValue( newValues[ i ] );jQuery
					this._change( null, i );jQuery
				}jQuery
				this._refreshValue();jQuery
			} else {jQuery
				if ( this.options.values && this.options.values.length ) {jQuery
					return this._values( index );jQuery
				} else {jQuery
					return this.value();jQuery
				}jQuery
			}jQuery
		} else {jQuery
			return this._values();jQuery
		}jQuery
	},jQuery
jQuery
	_setOption: function( key, value ) {jQuery
		var i,jQuery
			valsLength = 0;jQuery
jQuery
		if ( key === "range" && this.options.range === true ) {jQuery
			if ( value === "min" ) {jQuery
				this.options.value = this._values( 0 );jQuery
				this.options.values = null;jQuery
			} else if ( value === "max" ) {jQuery
				this.options.value = this._values( this.options.values.length-1 );jQuery
				this.options.values = null;jQuery
			}jQuery
		}jQuery
jQuery
		if ( $.isArray( this.options.values ) ) {jQuery
			valsLength = this.options.values.length;jQuery
		}jQuery
jQuery
		$.Widget.prototype._setOption.apply( this, arguments );jQuery
jQuery
		switch ( key ) {jQuery
			case "orientation":jQuery
				this._detectOrientation();jQuery
				this.elementjQuery
					.removeClass( "ui-slider-horizontal ui-slider-vertical" )jQuery
					.addClass( "ui-slider-" + this.orientation );jQuery
				this._refreshValue();jQuery
				break;jQuery
			case "value":jQuery
				this._animateOff = true;jQuery
				this._refreshValue();jQuery
				this._change( null, 0 );jQuery
				this._animateOff = false;jQuery
				break;jQuery
			case "values":jQuery
				this._animateOff = true;jQuery
				this._refreshValue();jQuery
				for ( i = 0; i < valsLength; i += 1 ) {jQuery
					this._change( null, i );jQuery
				}jQuery
				this._animateOff = false;jQuery
				break;jQuery
			case "min":jQuery
			case "max":jQuery
				this._animateOff = true;jQuery
				this._refreshValue();jQuery
				this._animateOff = false;jQuery
				break;jQuery
			case "range":jQuery
				this._animateOff = true;jQuery
				this._refresh();jQuery
				this._animateOff = false;jQuery
				break;jQuery
		}jQuery
	},jQuery
jQuery
	//internal value getterjQuery
	// _value() returns value trimmed by min and max, aligned by stepjQuery
	_value: function() {jQuery
		var val = this.options.value;jQuery
		val = this._trimAlignValue( val );jQuery
jQuery
		return val;jQuery
	},jQuery
jQuery
	//internal values getterjQuery
	// _values() returns array of values trimmed by min and max, aligned by stepjQuery
	// _values( index ) returns single value trimmed by min and max, aligned by stepjQuery
	_values: function( index ) {jQuery
		var val,jQuery
			vals,jQuery
			i;jQuery
jQuery
		if ( arguments.length ) {jQuery
			val = this.options.values[ index ];jQuery
			val = this._trimAlignValue( val );jQuery
jQuery
			return val;jQuery
		} else if ( this.options.values && this.options.values.length ) {jQuery
			// .slice() creates a copy of the arrayjQuery
			// this copy gets trimmed by min and max and then returnedjQuery
			vals = this.options.values.slice();jQuery
			for ( i = 0; i < vals.length; i+= 1) {jQuery
				vals[ i ] = this._trimAlignValue( vals[ i ] );jQuery
			}jQuery
jQuery
			return vals;jQuery
		} else {jQuery
			return [];jQuery
		}jQuery
	},jQuery
jQuery
	// returns the step-aligned value that val is closest to, between (inclusive) min and maxjQuery
	_trimAlignValue: function( val ) {jQuery
		if ( val <= this._valueMin() ) {jQuery
			return this._valueMin();jQuery
		}jQuery
		if ( val >= this._valueMax() ) {jQuery
			return this._valueMax();jQuery
		}jQuery
		var step = ( this.options.step > 0 ) ? this.options.step : 1,jQuery
			valModStep = (val - this._valueMin()) % step,jQuery
			alignValue = val - valModStep;jQuery
jQuery
		if ( Math.abs(valModStep) * 2 >= step ) {jQuery
			alignValue += ( valModStep > 0 ) ? step : ( -step );jQuery
		}jQuery
jQuery
		// Since JavaScript has problems with large floats, roundjQuery
		// the final value to 5 digits after the decimal point (see #4124)jQuery
		return parseFloat( alignValue.toFixed(5) );jQuery
	},jQuery
jQuery
	_valueMin: function() {jQuery
		return this.options.min;jQuery
	},jQuery
jQuery
	_valueMax: function() {jQuery
		return this.options.max;jQuery
	},jQuery
jQuery
	_refreshValue: function() {jQuery
		var lastValPercent, valPercent, value, valueMin, valueMax,jQuery
			oRange = this.options.range,jQuery
			o = this.options,jQuery
			that = this,jQuery
			animate = ( !this._animateOff ) ? o.animate : false,jQuery
			_set = {};jQuery
jQuery
		if ( this.options.values && this.options.values.length ) {jQuery
			this.handles.each(function( i ) {jQuery
				valPercent = ( that.values(i) - that._valueMin() ) / ( that._valueMax() - that._valueMin() ) * 100;jQuery
				_set[ that.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";jQuery
				$( this ).stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );jQuery
				if ( that.options.range === true ) {jQuery
					if ( that.orientation === "horizontal" ) {jQuery
						if ( i === 0 ) {jQuery
							that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { left: valPercent + "%" }, o.animate );jQuery
						}jQuery
						if ( i === 1 ) {jQuery
							that.range[ animate ? "animate" : "css" ]( { width: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );jQuery
						}jQuery
					} else {jQuery
						if ( i === 0 ) {jQuery
							that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { bottom: ( valPercent ) + "%" }, o.animate );jQuery
						}jQuery
						if ( i === 1 ) {jQuery
							that.range[ animate ? "animate" : "css" ]( { height: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );jQuery
						}jQuery
					}jQuery
				}jQuery
				lastValPercent = valPercent;jQuery
			});jQuery
		} else {jQuery
			value = this.value();jQuery
			valueMin = this._valueMin();jQuery
			valueMax = this._valueMax();jQuery
			valPercent = ( valueMax !== valueMin ) ?jQuery
					( value - valueMin ) / ( valueMax - valueMin ) * 100 :jQuery
					0;jQuery
			_set[ this.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";jQuery
			this.handle.stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );jQuery
jQuery
			if ( oRange === "min" && this.orientation === "horizontal" ) {jQuery
				this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { width: valPercent + "%" }, o.animate );jQuery
			}jQuery
			if ( oRange === "max" && this.orientation === "horizontal" ) {jQuery
				this.range[ animate ? "animate" : "css" ]( { width: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );jQuery
			}jQuery
			if ( oRange === "min" && this.orientation === "vertical" ) {jQuery
				this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { height: valPercent + "%" }, o.animate );jQuery
			}jQuery
			if ( oRange === "max" && this.orientation === "vertical" ) {jQuery
				this.range[ animate ? "animate" : "css" ]( { height: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );jQuery
			}jQuery
		}jQuery
	},jQuery
jQuery
	_handleEvents: {jQuery
		keydown: function( event ) {jQuery
			var allowed, curVal, newVal, step,jQuery
				index = $( event.target ).data( "ui-slider-handle-index" );jQuery
jQuery
			switch ( event.keyCode ) {jQuery
				case $.ui.keyCode.HOME:jQuery
				case $.ui.keyCode.END:jQuery
				case $.ui.keyCode.PAGE_UP:jQuery
				case $.ui.keyCode.PAGE_DOWN:jQuery
				case $.ui.keyCode.UP:jQuery
				case $.ui.keyCode.RIGHT:jQuery
				case $.ui.keyCode.DOWN:jQuery
				case $.ui.keyCode.LEFT:jQuery
					event.preventDefault();jQuery
					if ( !this._keySliding ) {jQuery
						this._keySliding = true;jQuery
						$( event.target ).addClass( "ui-state-active" );jQuery
						allowed = this._start( event, index );jQuery
						if ( allowed === false ) {jQuery
							return;jQuery
						}jQuery
					}jQuery
					break;jQuery
			}jQuery
jQuery
			step = this.options.step;jQuery
			if ( this.options.values && this.options.values.length ) {jQuery
				curVal = newVal = this.values( index );jQuery
			} else {jQuery
				curVal = newVal = this.value();jQuery
			}jQuery
jQuery
			switch ( event.keyCode ) {jQuery
				case $.ui.keyCode.HOME:jQuery
					newVal = this._valueMin();jQuery
					break;jQuery
				case $.ui.keyCode.END:jQuery
					newVal = this._valueMax();jQuery
					break;jQuery
				case $.ui.keyCode.PAGE_UP:jQuery
					newVal = this._trimAlignValue( curVal + ( (this._valueMax() - this._valueMin()) / numPages ) );jQuery
					break;jQuery
				case $.ui.keyCode.PAGE_DOWN:jQuery
					newVal = this._trimAlignValue( curVal - ( (this._valueMax() - this._valueMin()) / numPages ) );jQuery
					break;jQuery
				case $.ui.keyCode.UP:jQuery
				case $.ui.keyCode.RIGHT:jQuery
					if ( curVal === this._valueMax() ) {jQuery
						return;jQuery
					}jQuery
					newVal = this._trimAlignValue( curVal + step );jQuery
					break;jQuery
				case $.ui.keyCode.DOWN:jQuery
				case $.ui.keyCode.LEFT:jQuery
					if ( curVal === this._valueMin() ) {jQuery
						return;jQuery
					}jQuery
					newVal = this._trimAlignValue( curVal - step );jQuery
					break;jQuery
			}jQuery
jQuery
			this._slide( event, index, newVal );jQuery
		},jQuery
		click: function( event ) {jQuery
			event.preventDefault();jQuery
		},jQuery
		keyup: function( event ) {jQuery
			var index = $( event.target ).data( "ui-slider-handle-index" );jQuery
jQuery
			if ( this._keySliding ) {jQuery
				this._keySliding = false;jQuery
				this._stop( event, index );jQuery
				this._change( event, index );jQuery
				$( event.target ).removeClass( "ui-state-active" );jQuery
			}jQuery
		}jQuery
	}jQuery
jQuery
});jQuery
jQuery
}(jQuery));jQuery
(function( $, undefined ) {jQuery
jQuery
function isOverAxis( x, reference, size ) {jQuery
	return ( x > reference ) && ( x < ( reference + size ) );jQuery
}jQuery
jQuery
function isFloating(item) {jQuery
	return (/left|right/).test(item.css("float")) || (/inline|table-cell/).test(item.css("display"));jQuery
}jQuery
jQuery
$.widget("ui.sortable", $.ui.mouse, {jQuery
	version: "1.10.4",jQuery
	widgetEventPrefix: "sort",jQuery
	ready: false,jQuery
	options: {jQuery
		appendTo: "parent",jQuery
		axis: false,jQuery
		connectWith: false,jQuery
		containment: false,jQuery
		cursor: "auto",jQuery
		cursorAt: false,jQuery
		dropOnEmpty: true,jQuery
		forcePlaceholderSize: false,jQuery
		forceHelperSize: false,jQuery
		grid: false,jQuery
		handle: false,jQuery
		helper: "original",jQuery
		items: "> *",jQuery
		opacity: false,jQuery
		placeholder: false,jQuery
		revert: false,jQuery
		scroll: true,jQuery
		scrollSensitivity: 20,jQuery
		scrollSpeed: 20,jQuery
		scope: "default",jQuery
		tolerance: "intersect",jQuery
		zIndex: 1000,jQuery
jQuery
		// callbacksjQuery
		activate: null,jQuery
		beforeStop: null,jQuery
		change: null,jQuery
		deactivate: null,jQuery
		out: null,jQuery
		over: null,jQuery
		receive: null,jQuery
		remove: null,jQuery
		sort: null,jQuery
		start: null,jQuery
		stop: null,jQuery
		update: nulljQuery
	},jQuery
	_create: function() {jQuery
jQuery
		var o = this.options;jQuery
		this.containerCache = {};jQuery
		this.element.addClass("ui-sortable");jQuery
jQuery
		//Get the itemsjQuery
		this.refresh();jQuery
jQuery
		//Let's determine if the items are being displayed horizontallyjQuery
		this.floating = this.items.length ? o.axis === "x" || isFloating(this.items[0].item) : false;jQuery
jQuery
		//Let's determine the parent's offsetjQuery
		this.offset = this.element.offset();jQuery
jQuery
		//Initialize mouse events for interactionjQuery
		this._mouseInit();jQuery
jQuery
		//We're ready to gojQuery
		this.ready = true;jQuery
jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		this.elementjQuery
			.removeClass("ui-sortable ui-sortable-disabled");jQuery
		this._mouseDestroy();jQuery
jQuery
		for ( var i = this.items.length - 1; i >= 0; i-- ) {jQuery
			this.items[i].item.removeData(this.widgetName + "-item");jQuery
		}jQuery
jQuery
		return this;jQuery
	},jQuery
jQuery
	_setOption: function(key, value){jQuery
		if ( key === "disabled" ) {jQuery
			this.options[ key ] = value;jQuery
jQuery
			this.widget().toggleClass( "ui-sortable-disabled", !!value );jQuery
		} else {jQuery
			// Don't call widget base _setOption for disable as it adds ui-state-disabled classjQuery
			$.Widget.prototype._setOption.apply(this, arguments);jQuery
		}jQuery
	},jQuery
jQuery
	_mouseCapture: function(event, overrideHandle) {jQuery
		var currentItem = null,jQuery
			validHandle = false,jQuery
			that = this;jQuery
jQuery
		if (this.reverting) {jQuery
			return false;jQuery
		}jQuery
jQuery
		if(this.options.disabled || this.options.type === "static") {jQuery
			return false;jQuery
		}jQuery
jQuery
		//We have to refresh the items data once firstjQuery
		this._refreshItems(event);jQuery
jQuery
		//Find out if the clicked node (or one of its parents) is a actual item in this.itemsjQuery
		$(event.target).parents().each(function() {jQuery
			if($.data(this, that.widgetName + "-item") === that) {jQuery
				currentItem = $(this);jQuery
				return false;jQuery
			}jQuery
		});jQuery
		if($.data(event.target, that.widgetName + "-item") === that) {jQuery
			currentItem = $(event.target);jQuery
		}jQuery
jQuery
		if(!currentItem) {jQuery
			return false;jQuery
		}jQuery
		if(this.options.handle && !overrideHandle) {jQuery
			$(this.options.handle, currentItem).find("*").addBack().each(function() {jQuery
				if(this === event.target) {jQuery
					validHandle = true;jQuery
				}jQuery
			});jQuery
			if(!validHandle) {jQuery
				return false;jQuery
			}jQuery
		}jQuery
jQuery
		this.currentItem = currentItem;jQuery
		this._removeCurrentsFromItems();jQuery
		return true;jQuery
jQuery
	},jQuery
jQuery
	_mouseStart: function(event, overrideHandle, noActivation) {jQuery
jQuery
		var i, body,jQuery
			o = this.options;jQuery
jQuery
		this.currentContainer = this;jQuery
jQuery
		//We only need to call refreshPositions, because the refreshItems call has been moved to mouseCapturejQuery
		this.refreshPositions();jQuery
jQuery
		//Create and append the visible helperjQuery
		this.helper = this._createHelper(event);jQuery
jQuery
		//Cache the helper sizejQuery
		this._cacheHelperProportions();jQuery
jQuery
		/*jQuery
		 * - Position generation -jQuery
		 * This block generates everything position related - it's the core of draggables.jQuery
		 */jQuery
jQuery
		//Cache the margins of the original elementjQuery
		this._cacheMargins();jQuery
jQuery
		//Get the next scrolling parentjQuery
		this.scrollParent = this.helper.scrollParent();jQuery
jQuery
		//The element's absolute position on the page minus marginsjQuery
		this.offset = this.currentItem.offset();jQuery
		this.offset = {jQuery
			top: this.offset.top - this.margins.top,jQuery
			left: this.offset.left - this.margins.leftjQuery
		};jQuery
jQuery
		$.extend(this.offset, {jQuery
			click: { //Where the click happened, relative to the elementjQuery
				left: event.pageX - this.offset.left,jQuery
				top: event.pageY - this.offset.topjQuery
			},jQuery
			parent: this._getParentOffset(),jQuery
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helperjQuery
		});jQuery
jQuery
		// Only after we got the offset, we can change the helper's position to absolutejQuery
		// TODO: Still need to figure out a way to make relative sorting possiblejQuery
		this.helper.css("position", "absolute");jQuery
		this.cssPosition = this.helper.css("position");jQuery
jQuery
		//Generate the original positionjQuery
		this.originalPosition = this._generatePosition(event);jQuery
		this.originalPageX = event.pageX;jQuery
		this.originalPageY = event.pageY;jQuery
jQuery
		//Adjust the mouse offset relative to the helper if "cursorAt" is suppliedjQuery
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));jQuery
jQuery
		//Cache the former DOM positionjQuery
		this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] };jQuery
jQuery
		//If the helper is not the original, hide the original so it's not playing any role during the drag, won't cause anything bad this wayjQuery
		if(this.helper[0] !== this.currentItem[0]) {jQuery
			this.currentItem.hide();jQuery
		}jQuery
jQuery
		//Create the placeholderjQuery
		this._createPlaceholder();jQuery
jQuery
		//Set a containment if given in the optionsjQuery
		if(o.containment) {jQuery
			this._setContainment();jQuery
		}jQuery
jQuery
		if( o.cursor && o.cursor !== "auto" ) { // cursor optionjQuery
			body = this.document.find( "body" );jQuery
jQuery
			// support: IEjQuery
			this.storedCursor = body.css( "cursor" );jQuery
			body.css( "cursor", o.cursor );jQuery
jQuery
			this.storedStylesheet = $( "<style>*{ cursor: "+o.cursor+" !important; }</style>" ).appendTo( body );jQuery
		}jQuery
jQuery
		if(o.opacity) { // opacity optionjQuery
			if (this.helper.css("opacity")) {jQuery
				this._storedOpacity = this.helper.css("opacity");jQuery
			}jQuery
			this.helper.css("opacity", o.opacity);jQuery
		}jQuery
jQuery
		if(o.zIndex) { // zIndex optionjQuery
			if (this.helper.css("zIndex")) {jQuery
				this._storedZIndex = this.helper.css("zIndex");jQuery
			}jQuery
			this.helper.css("zIndex", o.zIndex);jQuery
		}jQuery
jQuery
		//Prepare scrollingjQuery
		if(this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {jQuery
			this.overflowOffset = this.scrollParent.offset();jQuery
		}jQuery
jQuery
		//Call callbacksjQuery
		this._trigger("start", event, this._uiHash());jQuery
jQuery
		//Recache the helper sizejQuery
		if(!this._preserveHelperProportions) {jQuery
			this._cacheHelperProportions();jQuery
		}jQuery
jQuery
jQuery
		//Post "activate" events to possible containersjQuery
		if( !noActivation ) {jQuery
			for ( i = this.containers.length - 1; i >= 0; i-- ) {jQuery
				this.containers[ i ]._trigger( "activate", event, this._uiHash( this ) );jQuery
			}jQuery
		}jQuery
jQuery
		//Prepare possible droppablesjQuery
		if($.ui.ddmanager) {jQuery
			$.ui.ddmanager.current = this;jQuery
		}jQuery
jQuery
		if ($.ui.ddmanager && !o.dropBehaviour) {jQuery
			$.ui.ddmanager.prepareOffsets(this, event);jQuery
		}jQuery
jQuery
		this.dragging = true;jQuery
jQuery
		this.helper.addClass("ui-sortable-helper");jQuery
		this._mouseDrag(event); //Execute the drag once - this causes the helper not to be visible before getting its correct positionjQuery
		return true;jQuery
jQuery
	},jQuery
jQuery
	_mouseDrag: function(event) {jQuery
		var i, item, itemElement, intersection,jQuery
			o = this.options,jQuery
			scrolled = false;jQuery
jQuery
		//Compute the helpers positionjQuery
		this.position = this._generatePosition(event);jQuery
		this.positionAbs = this._convertPositionTo("absolute");jQuery
jQuery
		if (!this.lastPositionAbs) {jQuery
			this.lastPositionAbs = this.positionAbs;jQuery
		}jQuery
jQuery
		//Do scrollingjQuery
		if(this.options.scroll) {jQuery
			if(this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {jQuery
jQuery
				if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {jQuery
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;jQuery
				} else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity) {jQuery
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;jQuery
				}jQuery
jQuery
				if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {jQuery
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;jQuery
				} else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity) {jQuery
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;jQuery
				}jQuery
jQuery
			} else {jQuery
jQuery
				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity) {jQuery
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);jQuery
				} else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {jQuery
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);jQuery
				}jQuery
jQuery
				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {jQuery
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);jQuery
				} else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {jQuery
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);jQuery
				}jQuery
jQuery
			}jQuery
jQuery
			if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {jQuery
				$.ui.ddmanager.prepareOffsets(this, event);jQuery
			}jQuery
		}jQuery
jQuery
		//Regenerate the absolute position used for position checksjQuery
		this.positionAbs = this._convertPositionTo("absolute");jQuery
jQuery
		//Set the helper positionjQuery
		if(!this.options.axis || this.options.axis !== "y") {jQuery
			this.helper[0].style.left = this.position.left+"px";jQuery
		}jQuery
		if(!this.options.axis || this.options.axis !== "x") {jQuery
			this.helper[0].style.top = this.position.top+"px";jQuery
		}jQuery
jQuery
		//RearrangejQuery
		for (i = this.items.length - 1; i >= 0; i--) {jQuery
jQuery
			//Cache variables and intersection, continue if no intersectionjQuery
			item = this.items[i];jQuery
			itemElement = item.item[0];jQuery
			intersection = this._intersectsWithPointer(item);jQuery
			if (!intersection) {jQuery
				continue;jQuery
			}jQuery
jQuery
			// Only put the placeholder inside the current Container, skip alljQuery
			// items from other containers. This works because when movingjQuery
			// an item from one container to another thejQuery
			// currentContainer is switched before the placeholder is moved.jQuery
			//jQuery
			// Without this, moving items in "sub-sortables" can causejQuery
			// the placeholder to jitter beetween the outer and inner container.jQuery
			if (item.instance !== this.currentContainer) {jQuery
				continue;jQuery
			}jQuery
jQuery
			// cannot intersect with itselfjQuery
			// no useless actions that have been done beforejQuery
			// no action if the item moved is the parent of the item checkedjQuery
			if (itemElement !== this.currentItem[0] &&jQuery
				this.placeholder[intersection === 1 ? "next" : "prev"]()[0] !== itemElement &&jQuery
				!$.contains(this.placeholder[0], itemElement) &&jQuery
				(this.options.type === "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)jQuery
			) {jQuery
jQuery
				this.direction = intersection === 1 ? "down" : "up";jQuery
jQuery
				if (this.options.tolerance === "pointer" || this._intersectsWithSides(item)) {jQuery
					this._rearrange(event, item);jQuery
				} else {jQuery
					break;jQuery
				}jQuery
jQuery
				this._trigger("change", event, this._uiHash());jQuery
				break;jQuery
			}jQuery
		}jQuery
jQuery
		//Post events to containersjQuery
		this._contactContainers(event);jQuery
jQuery
		//Interconnect with droppablesjQuery
		if($.ui.ddmanager) {jQuery
			$.ui.ddmanager.drag(this, event);jQuery
		}jQuery
jQuery
		//Call callbacksjQuery
		this._trigger("sort", event, this._uiHash());jQuery
jQuery
		this.lastPositionAbs = this.positionAbs;jQuery
		return false;jQuery
jQuery
	},jQuery
jQuery
	_mouseStop: function(event, noPropagation) {jQuery
jQuery
		if(!event) {jQuery
			return;jQuery
		}jQuery
jQuery
		//If we are using droppables, inform the manager about the dropjQuery
		if ($.ui.ddmanager && !this.options.dropBehaviour) {jQuery
			$.ui.ddmanager.drop(this, event);jQuery
		}jQuery
jQuery
		if(this.options.revert) {jQuery
			var that = this,jQuery
				cur = this.placeholder.offset(),jQuery
				axis = this.options.axis,jQuery
				animation = {};jQuery
jQuery
			if ( !axis || axis === "x" ) {jQuery
				animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft);jQuery
			}jQuery
			if ( !axis || axis === "y" ) {jQuery
				animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop);jQuery
			}jQuery
			this.reverting = true;jQuery
			$(this.helper).animate( animation, parseInt(this.options.revert, 10) || 500, function() {jQuery
				that._clear(event);jQuery
			});jQuery
		} else {jQuery
			this._clear(event, noPropagation);jQuery
		}jQuery
jQuery
		return false;jQuery
jQuery
	},jQuery
jQuery
	cancel: function() {jQuery
jQuery
		if(this.dragging) {jQuery
jQuery
			this._mouseUp({ target: null });jQuery
jQuery
			if(this.options.helper === "original") {jQuery
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");jQuery
			} else {jQuery
				this.currentItem.show();jQuery
			}jQuery
jQuery
			//Post deactivating events to containersjQuery
			for (var i = this.containers.length - 1; i >= 0; i--){jQuery
				this.containers[i]._trigger("deactivate", null, this._uiHash(this));jQuery
				if(this.containers[i].containerCache.over) {jQuery
					this.containers[i]._trigger("out", null, this._uiHash(this));jQuery
					this.containers[i].containerCache.over = 0;jQuery
				}jQuery
			}jQuery
jQuery
		}jQuery
jQuery
		if (this.placeholder) {jQuery
			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!jQuery
			if(this.placeholder[0].parentNode) {jQuery
				this.placeholder[0].parentNode.removeChild(this.placeholder[0]);jQuery
			}jQuery
			if(this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {jQuery
				this.helper.remove();jQuery
			}jQuery
jQuery
			$.extend(this, {jQuery
				helper: null,jQuery
				dragging: false,jQuery
				reverting: false,jQuery
				_noFinalSort: nulljQuery
			});jQuery
jQuery
			if(this.domPosition.prev) {jQuery
				$(this.domPosition.prev).after(this.currentItem);jQuery
			} else {jQuery
				$(this.domPosition.parent).prepend(this.currentItem);jQuery
			}jQuery
		}jQuery
jQuery
		return this;jQuery
jQuery
	},jQuery
jQuery
	serialize: function(o) {jQuery
jQuery
		var items = this._getItemsAsjQuery(o && o.connected),jQuery
			str = [];jQuery
		o = o || {};jQuery
jQuery
		$(items).each(function() {jQuery
			var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || (/(.+)[\-=_](.+)/));jQuery
			if (res) {jQuery
				str.push((o.key || res[1]+"[]")+"="+(o.key && o.expression ? res[1] : res[2]));jQuery
			}jQuery
		});jQuery
jQuery
		if(!str.length && o.key) {jQuery
			str.push(o.key + "=");jQuery
		}jQuery
jQuery
		return str.join("&");jQuery
jQuery
	},jQuery
jQuery
	toArray: function(o) {jQuery
jQuery
		var items = this._getItemsAsjQuery(o && o.connected),jQuery
			ret = [];jQuery
jQuery
		o = o || {};jQuery
jQuery
		items.each(function() { ret.push($(o.item || this).attr(o.attribute || "id") || ""); });jQuery
		return ret;jQuery
jQuery
	},jQuery
jQuery
	/* Be careful with the following core functions */jQuery
	_intersectsWith: function(item) {jQuery
jQuery
		var x1 = this.positionAbs.left,jQuery
			x2 = x1 + this.helperProportions.width,jQuery
			y1 = this.positionAbs.top,jQuery
			y2 = y1 + this.helperProportions.height,jQuery
			l = item.left,jQuery
			r = l + item.width,jQuery
			t = item.top,jQuery
			b = t + item.height,jQuery
			dyClick = this.offset.click.top,jQuery
			dxClick = this.offset.click.left,jQuery
			isOverElementHeight = ( this.options.axis === "x" ) || ( ( y1 + dyClick ) > t && ( y1 + dyClick ) < b ),jQuery
			isOverElementWidth = ( this.options.axis === "y" ) || ( ( x1 + dxClick ) > l && ( x1 + dxClick ) < r ),jQuery
			isOverElement = isOverElementHeight && isOverElementWidth;jQuery
jQuery
		if ( this.options.tolerance === "pointer" ||jQuery
			this.options.forcePointerForContainers ||jQuery
			(this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"])jQuery
		) {jQuery
			return isOverElement;jQuery
		} else {jQuery
jQuery
			return (l < x1 + (this.helperProportions.width / 2) && // Right HalfjQuery
				x2 - (this.helperProportions.width / 2) < r && // Left HalfjQuery
				t < y1 + (this.helperProportions.height / 2) && // Bottom HalfjQuery
				y2 - (this.helperProportions.height / 2) < b ); // Top HalfjQuery
jQuery
		}jQuery
	},jQuery
jQuery
	_intersectsWithPointer: function(item) {jQuery
jQuery
		var isOverElementHeight = (this.options.axis === "x") || isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),jQuery
			isOverElementWidth = (this.options.axis === "y") || isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),jQuery
			isOverElement = isOverElementHeight && isOverElementWidth,jQuery
			verticalDirection = this._getDragVerticalDirection(),jQuery
			horizontalDirection = this._getDragHorizontalDirection();jQuery
jQuery
		if (!isOverElement) {jQuery
			return false;jQuery
		}jQuery
jQuery
		return this.floating ?jQuery
			( ((horizontalDirection && horizontalDirection === "right") || verticalDirection === "down") ? 2 : 1 )jQuery
			: ( verticalDirection && (verticalDirection === "down" ? 2 : 1) );jQuery
jQuery
	},jQuery
jQuery
	_intersectsWithSides: function(item) {jQuery
jQuery
		var isOverBottomHalf = isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height/2), item.height),jQuery
			isOverRightHalf = isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width/2), item.width),jQuery
			verticalDirection = this._getDragVerticalDirection(),jQuery
			horizontalDirection = this._getDragHorizontalDirection();jQuery
jQuery
		if (this.floating && horizontalDirection) {jQuery
			return ((horizontalDirection === "right" && isOverRightHalf) || (horizontalDirection === "left" && !isOverRightHalf));jQuery
		} else {jQuery
			return verticalDirection && ((verticalDirection === "down" && isOverBottomHalf) || (verticalDirection === "up" && !isOverBottomHalf));jQuery
		}jQuery
jQuery
	},jQuery
jQuery
	_getDragVerticalDirection: function() {jQuery
		var delta = this.positionAbs.top - this.lastPositionAbs.top;jQuery
		return delta !== 0 && (delta > 0 ? "down" : "up");jQuery
	},jQuery
jQuery
	_getDragHorizontalDirection: function() {jQuery
		var delta = this.positionAbs.left - this.lastPositionAbs.left;jQuery
		return delta !== 0 && (delta > 0 ? "right" : "left");jQuery
	},jQuery
jQuery
	refresh: function(event) {jQuery
		this._refreshItems(event);jQuery
		this.refreshPositions();jQuery
		return this;jQuery
	},jQuery
jQuery
	_connectWith: function() {jQuery
		var options = this.options;jQuery
		return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;jQuery
	},jQuery
jQuery
	_getItemsAsjQuery: function(connected) {jQuery
jQuery
		var i, j, cur, inst,jQuery
			items = [],jQuery
			queries = [],jQuery
			connectWith = this._connectWith();jQuery
jQuery
		if(connectWith && connected) {jQuery
			for (i = connectWith.length - 1; i >= 0; i--){jQuery
				cur = $(connectWith[i]);jQuery
				for ( j = cur.length - 1; j >= 0; j--){jQuery
					inst = $.data(cur[j], this.widgetFullName);jQuery
					if(inst && inst !== this && !inst.options.disabled) {jQuery
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);jQuery
					}jQuery
				}jQuery
			}jQuery
		}jQuery
jQuery
		queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);jQuery
jQuery
		function addItems() {jQuery
			items.push( this );jQuery
		}jQuery
		for (i = queries.length - 1; i >= 0; i--){jQuery
			queries[i][0].each( addItems );jQuery
		}jQuery
jQuery
		return $(items);jQuery
jQuery
	},jQuery
jQuery
	_removeCurrentsFromItems: function() {jQuery
jQuery
		var list = this.currentItem.find(":data(" + this.widgetName + "-item)");jQuery
jQuery
		this.items = $.grep(this.items, function (item) {jQuery
			for (var j=0; j < list.length; j++) {jQuery
				if(list[j] === item.item[0]) {jQuery
					return false;jQuery
				}jQuery
			}jQuery
			return true;jQuery
		});jQuery
jQuery
	},jQuery
jQuery
	_refreshItems: function(event) {jQuery
jQuery
		this.items = [];jQuery
		this.containers = [this];jQuery
jQuery
		var i, j, cur, inst, targetData, _queries, item, queriesLength,jQuery
			items = this.items,jQuery
			queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element), this]],jQuery
			connectWith = this._connectWith();jQuery
jQuery
		if(connectWith && this.ready) { //Shouldn't be run the first time through due to massive slow-downjQuery
			for (i = connectWith.length - 1; i >= 0; i--){jQuery
				cur = $(connectWith[i]);jQuery
				for (j = cur.length - 1; j >= 0; j--){jQuery
					inst = $.data(cur[j], this.widgetFullName);jQuery
					if(inst && inst !== this && !inst.options.disabled) {jQuery
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element), inst]);jQuery
						this.containers.push(inst);jQuery
					}jQuery
				}jQuery
			}jQuery
		}jQuery
jQuery
		for (i = queries.length - 1; i >= 0; i--) {jQuery
			targetData = queries[i][1];jQuery
			_queries = queries[i][0];jQuery
jQuery
			for (j=0, queriesLength = _queries.length; j < queriesLength; j++) {jQuery
				item = $(_queries[j]);jQuery
jQuery
				item.data(this.widgetName + "-item", targetData); // Data for target checking (mouse manager)jQuery
jQuery
				items.push({jQuery
					item: item,jQuery
					instance: targetData,jQuery
					width: 0, height: 0,jQuery
					left: 0, top: 0jQuery
				});jQuery
			}jQuery
		}jQuery
jQuery
	},jQuery
jQuery
	refreshPositions: function(fast) {jQuery
jQuery
		//This has to be redone because due to the item being moved out/into the offsetParent, the offsetParent's position will changejQuery
		if(this.offsetParent && this.helper) {jQuery
			this.offset.parent = this._getParentOffset();jQuery
		}jQuery
jQuery
		var i, item, t, p;jQuery
jQuery
		for (i = this.items.length - 1; i >= 0; i--){jQuery
			item = this.items[i];jQuery
jQuery
			//We ignore calculating positions of all connected containers when we're not over themjQuery
			if(item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]) {jQuery
				continue;jQuery
			}jQuery
jQuery
			t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;jQuery
jQuery
			if (!fast) {jQuery
				item.width = t.outerWidth();jQuery
				item.height = t.outerHeight();jQuery
			}jQuery
jQuery
			p = t.offset();jQuery
			item.left = p.left;jQuery
			item.top = p.top;jQuery
		}jQuery
jQuery
		if(this.options.custom && this.options.custom.refreshContainers) {jQuery
			this.options.custom.refreshContainers.call(this);jQuery
		} else {jQuery
			for (i = this.containers.length - 1; i >= 0; i--){jQuery
				p = this.containers[i].element.offset();jQuery
				this.containers[i].containerCache.left = p.left;jQuery
				this.containers[i].containerCache.top = p.top;jQuery
				this.containers[i].containerCache.width	= this.containers[i].element.outerWidth();jQuery
				this.containers[i].containerCache.height = this.containers[i].element.outerHeight();jQuery
			}jQuery
		}jQuery
jQuery
		return this;jQuery
	},jQuery
jQuery
	_createPlaceholder: function(that) {jQuery
		that = that || this;jQuery
		var className,jQuery
			o = that.options;jQuery
jQuery
		if(!o.placeholder || o.placeholder.constructor === String) {jQuery
			className = o.placeholder;jQuery
			o.placeholder = {jQuery
				element: function() {jQuery
jQuery
					var nodeName = that.currentItem[0].nodeName.toLowerCase(),jQuery
						element = $( "<" + nodeName + ">", that.document[0] )jQuery
							.addClass(className || that.currentItem[0].className+" ui-sortable-placeholder")jQuery
							.removeClass("ui-sortable-helper");jQuery
jQuery
					if ( nodeName === "tr" ) {jQuery
						that.currentItem.children().each(function() {jQuery
							$( "<td>&#160;</td>", that.document[0] )jQuery
								.attr( "colspan", $( this ).attr( "colspan" ) || 1 )jQuery
								.appendTo( element );jQuery
						});jQuery
					} else if ( nodeName === "img" ) {jQuery
						element.attr( "src", that.currentItem.attr( "src" ) );jQuery
					}jQuery
jQuery
					if ( !className ) {jQuery
						element.css( "visibility", "hidden" );jQuery
					}jQuery
jQuery
					return element;jQuery
				},jQuery
				update: function(container, p) {jQuery
jQuery
					// 1. If a className is set as 'placeholder option, we don't force sizes - the class is responsible for thatjQuery
					// 2. The option 'forcePlaceholderSize can be enabled to force it even if a class name is specifiedjQuery
					if(className && !o.forcePlaceholderSize) {jQuery
						return;jQuery
					}jQuery
jQuery
					//If the element doesn't have a actual height by itself (without styles coming from a stylesheet), it receives the inline height from the dragged itemjQuery
					if(!p.height()) { p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop")||0, 10) - parseInt(that.currentItem.css("paddingBottom")||0, 10)); }jQuery
					if(!p.width()) { p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft")||0, 10) - parseInt(that.currentItem.css("paddingRight")||0, 10)); }jQuery
				}jQuery
			};jQuery
		}jQuery
jQuery
		//Create the placeholderjQuery
		that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));jQuery
jQuery
		//Append it after the actual current itemjQuery
		that.currentItem.after(that.placeholder);jQuery
jQuery
		//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)jQuery
		o.placeholder.update(that, that.placeholder);jQuery
jQuery
	},jQuery
jQuery
	_contactContainers: function(event) {jQuery
		var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, base, cur, nearBottom, floating,jQuery
			innermostContainer = null,jQuery
			innermostIndex = null;jQuery
jQuery
		// get innermost container that intersects with itemjQuery
		for (i = this.containers.length - 1; i >= 0; i--) {jQuery
jQuery
			// never consider a container that's located within the item itselfjQuery
			if($.contains(this.currentItem[0], this.containers[i].element[0])) {jQuery
				continue;jQuery
			}jQuery
jQuery
			if(this._intersectsWith(this.containers[i].containerCache)) {jQuery
jQuery
				// if we've already found a container and it's more "inner" than this, then continuejQuery
				if(innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {jQuery
					continue;jQuery
				}jQuery
jQuery
				innermostContainer = this.containers[i];jQuery
				innermostIndex = i;jQuery
jQuery
			} else {jQuery
				// container doesn't intersect. trigger "out" event if necessaryjQuery
				if(this.containers[i].containerCache.over) {jQuery
					this.containers[i]._trigger("out", event, this._uiHash(this));jQuery
					this.containers[i].containerCache.over = 0;jQuery
				}jQuery
			}jQuery
jQuery
		}jQuery
jQuery
		// if no intersecting containers found, returnjQuery
		if(!innermostContainer) {jQuery
			return;jQuery
		}jQuery
jQuery
		// move the item into the container if it's not there alreadyjQuery
		if(this.containers.length === 1) {jQuery
			if (!this.containers[innermostIndex].containerCache.over) {jQuery
				this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));jQuery
				this.containers[innermostIndex].containerCache.over = 1;jQuery
			}jQuery
		} else {jQuery
jQuery
			//When entering a new container, we will find the item with the least distance and append our item near itjQuery
			dist = 10000;jQuery
			itemWithLeastDistance = null;jQuery
			floating = innermostContainer.floating || isFloating(this.currentItem);jQuery
			posProperty = floating ? "left" : "top";jQuery
			sizeProperty = floating ? "width" : "height";jQuery
			base = this.positionAbs[posProperty] + this.offset.click[posProperty];jQuery
			for (j = this.items.length - 1; j >= 0; j--) {jQuery
				if(!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {jQuery
					continue;jQuery
				}jQuery
				if(this.items[j].item[0] === this.currentItem[0]) {jQuery
					continue;jQuery
				}jQuery
				if (floating && !isOverAxis(this.positionAbs.top + this.offset.click.top, this.items[j].top, this.items[j].height)) {jQuery
					continue;jQuery
				}jQuery
				cur = this.items[j].item.offset()[posProperty];jQuery
				nearBottom = false;jQuery
				if(Math.abs(cur - base) > Math.abs(cur + this.items[j][sizeProperty] - base)){jQuery
					nearBottom = true;jQuery
					cur += this.items[j][sizeProperty];jQuery
				}jQuery
jQuery
				if(Math.abs(cur - base) < dist) {jQuery
					dist = Math.abs(cur - base); itemWithLeastDistance = this.items[j];jQuery
					this.direction = nearBottom ? "up": "down";jQuery
				}jQuery
			}jQuery
jQuery
			//Check if dropOnEmpty is enabledjQuery
			if(!itemWithLeastDistance && !this.options.dropOnEmpty) {jQuery
				return;jQuery
			}jQuery
jQuery
			if(this.currentContainer === this.containers[innermostIndex]) {jQuery
				return;jQuery
			}jQuery
jQuery
			itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);jQuery
			this._trigger("change", event, this._uiHash());jQuery
			this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));jQuery
			this.currentContainer = this.containers[innermostIndex];jQuery
jQuery
			//Update the placeholderjQuery
			this.options.placeholder.update(this.currentContainer, this.placeholder);jQuery
jQuery
			this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));jQuery
			this.containers[innermostIndex].containerCache.over = 1;jQuery
		}jQuery
jQuery
jQuery
	},jQuery
jQuery
	_createHelper: function(event) {jQuery
jQuery
		var o = this.options,jQuery
			helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper === "clone" ? this.currentItem.clone() : this.currentItem);jQuery
jQuery
		//Add the helper to the DOM if that didn't happen alreadyjQuery
		if(!helper.parents("body").length) {jQuery
			$(o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);jQuery
		}jQuery
jQuery
		if(helper[0] === this.currentItem[0]) {jQuery
			this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") };jQuery
		}jQuery
jQuery
		if(!helper[0].style.width || o.forceHelperSize) {jQuery
			helper.width(this.currentItem.width());jQuery
		}jQuery
		if(!helper[0].style.height || o.forceHelperSize) {jQuery
			helper.height(this.currentItem.height());jQuery
		}jQuery
jQuery
		return helper;jQuery
jQuery
	},jQuery
jQuery
	_adjustOffsetFromHelper: function(obj) {jQuery
		if (typeof obj === "string") {jQuery
			obj = obj.split(" ");jQuery
		}jQuery
		if ($.isArray(obj)) {jQuery
			obj = {left: +obj[0], top: +obj[1] || 0};jQuery
		}jQuery
		if ("left" in obj) {jQuery
			this.offset.click.left = obj.left + this.margins.left;jQuery
		}jQuery
		if ("right" in obj) {jQuery
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;jQuery
		}jQuery
		if ("top" in obj) {jQuery
			this.offset.click.top = obj.top + this.margins.top;jQuery
		}jQuery
		if ("bottom" in obj) {jQuery
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;jQuery
		}jQuery
	},jQuery
jQuery
	_getParentOffset: function() {jQuery
jQuery
jQuery
		//Get the offsetParent and cache its positionjQuery
		this.offsetParent = this.helper.offsetParent();jQuery
		var po = this.offsetParent.offset();jQuery
jQuery
		// This is a special case where we need to modify a offset calculated on start, since the following happened:jQuery
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parentjQuery
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means thatjQuery
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon dragjQuery
		if(this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {jQuery
			po.left += this.scrollParent.scrollLeft();jQuery
			po.top += this.scrollParent.scrollTop();jQuery
		}jQuery
jQuery
		// This needs to be actually done for all browsers, since pageX/pageY includes this informationjQuery
		// with an ugly IE fixjQuery
		if( this.offsetParent[0] === document.body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie)) {jQuery
			po = { top: 0, left: 0 };jQuery
		}jQuery
jQuery
		return {jQuery
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),jQuery
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)jQuery
		};jQuery
jQuery
	},jQuery
jQuery
	_getRelativeOffset: function() {jQuery
jQuery
		if(this.cssPosition === "relative") {jQuery
			var p = this.currentItem.position();jQuery
			return {jQuery
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),jQuery
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()jQuery
			};jQuery
		} else {jQuery
			return { top: 0, left: 0 };jQuery
		}jQuery
jQuery
	},jQuery
jQuery
	_cacheMargins: function() {jQuery
		this.margins = {jQuery
			left: (parseInt(this.currentItem.css("marginLeft"),10) || 0),jQuery
			top: (parseInt(this.currentItem.css("marginTop"),10) || 0)jQuery
		};jQuery
	},jQuery
jQuery
	_cacheHelperProportions: function() {jQuery
		this.helperProportions = {jQuery
			width: this.helper.outerWidth(),jQuery
			height: this.helper.outerHeight()jQuery
		};jQuery
	},jQuery
jQuery
	_setContainment: function() {jQuery
jQuery
		var ce, co, over,jQuery
			o = this.options;jQuery
		if(o.containment === "parent") {jQuery
			o.containment = this.helper[0].parentNode;jQuery
		}jQuery
		if(o.containment === "document" || o.containment === "window") {jQuery
			this.containment = [jQuery
				0 - this.offset.relative.left - this.offset.parent.left,jQuery
				0 - this.offset.relative.top - this.offset.parent.top,jQuery
				$(o.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left,jQuery
				($(o.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.topjQuery
			];jQuery
		}jQuery
jQuery
		if(!(/^(document|window|parent)$/).test(o.containment)) {jQuery
			ce = $(o.containment)[0];jQuery
			co = $(o.containment).offset();jQuery
			over = ($(ce).css("overflow") !== "hidden");jQuery
jQuery
			this.containment = [jQuery
				co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,jQuery
				co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,jQuery
				co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,jQuery
				co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.topjQuery
			];jQuery
		}jQuery
jQuery
	},jQuery
jQuery
	_convertPositionTo: function(d, pos) {jQuery
jQuery
		if(!pos) {jQuery
			pos = this.position;jQuery
		}jQuery
		var mod = d === "absolute" ? 1 : -1,jQuery
			scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,jQuery
			scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);jQuery
jQuery
		return {jQuery
			top: (jQuery
				pos.top	+																// The absolute mouse positionjQuery
				this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parentjQuery
				this.offset.parent.top * mod -											// The offsetParent's offset without borders (offset + border)jQuery
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)jQuery
			),jQuery
			left: (jQuery
				pos.left +																// The absolute mouse positionjQuery
				this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parentjQuery
				this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)jQuery
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)jQuery
			)jQuery
		};jQuery
jQuery
	},jQuery
jQuery
	_generatePosition: function(event) {jQuery
jQuery
		var top, left,jQuery
			o = this.options,jQuery
			pageX = event.pageX,jQuery
			pageY = event.pageY,jQuery
			scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);jQuery
jQuery
		// This is another very weird special case that only happens for relative elements:jQuery
		// 1. If the css position is relativejQuery
		// 2. and the scroll parent is the document or similar to the offset parentjQuery
		// we have to refresh the relative offset during the scroll so there are no jumpsjQuery
		if(this.cssPosition === "relative" && !(this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0])) {jQuery
			this.offset.relative = this._getRelativeOffset();jQuery
		}jQuery
jQuery
		/*jQuery
		 * - Position constraining -jQuery
		 * Constrain the position to a mix of grid, containment.jQuery
		 */jQuery
jQuery
		if(this.originalPosition) { //If we are not dragging yet, we won't check for optionsjQuery
jQuery
			if(this.containment) {jQuery
				if(event.pageX - this.offset.click.left < this.containment[0]) {jQuery
					pageX = this.containment[0] + this.offset.click.left;jQuery
				}jQuery
				if(event.pageY - this.offset.click.top < this.containment[1]) {jQuery
					pageY = this.containment[1] + this.offset.click.top;jQuery
				}jQuery
				if(event.pageX - this.offset.click.left > this.containment[2]) {jQuery
					pageX = this.containment[2] + this.offset.click.left;jQuery
				}jQuery
				if(event.pageY - this.offset.click.top > this.containment[3]) {jQuery
					pageY = this.containment[3] + this.offset.click.top;jQuery
				}jQuery
			}jQuery
jQuery
			if(o.grid) {jQuery
				top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];jQuery
				pageY = this.containment ? ( (top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3]) ? top : ((top - this.offset.click.top >= this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;jQuery
jQuery
				left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];jQuery
				pageX = this.containment ? ( (left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2]) ? left : ((left - this.offset.click.left >= this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;jQuery
			}jQuery
jQuery
		}jQuery
jQuery
		return {jQuery
			top: (jQuery
				pageY -																// The absolute mouse positionjQuery
				this.offset.click.top -													// Click offset (relative to the element)jQuery
				this.offset.relative.top	-											// Only for relative positioned nodes: Relative offset from element to offset parentjQuery
				this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)jQuery
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))jQuery
			),jQuery
			left: (jQuery
				pageX -																// The absolute mouse positionjQuery
				this.offset.click.left -												// Click offset (relative to the element)jQuery
				this.offset.relative.left	-											// Only for relative positioned nodes: Relative offset from element to offset parentjQuery
				this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)jQuery
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))jQuery
			)jQuery
		};jQuery
jQuery
	},jQuery
jQuery
	_rearrange: function(event, i, a, hardRefresh) {jQuery
jQuery
		a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? i.item[0] : i.item[0].nextSibling));jQuery
jQuery
		//Various things done here to improve the performance:jQuery
		// 1. we create a setTimeout, that calls refreshPositionsjQuery
		// 2. on the instance, we have a counter variable, that get's higher after every appendjQuery
		// 3. on the local scope, we copy the counter variable, and check in the timeout, if it's still the samejQuery
		// 4. this lets only the last addition to the timeout stack throughjQuery
		this.counter = this.counter ? ++this.counter : 1;jQuery
		var counter = this.counter;jQuery
jQuery
		this._delay(function() {jQuery
			if(counter === this.counter) {jQuery
				this.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemovejQuery
			}jQuery
		});jQuery
jQuery
	},jQuery
jQuery
	_clear: function(event, noPropagation) {jQuery
jQuery
		this.reverting = false;jQuery
		// We delay all events that have to be triggered to after the point where the placeholder has been removed andjQuery
		// everything else normalized againjQuery
		var i,jQuery
			delayedTriggers = [];jQuery
jQuery
		// We first have to update the dom position of the actual currentItemjQuery
		// Note: don't do it if the current item is already removed (by a user), or it gets reappended (see #4088)jQuery
		if(!this._noFinalSort && this.currentItem.parent().length) {jQuery
			this.placeholder.before(this.currentItem);jQuery
		}jQuery
		this._noFinalSort = null;jQuery
jQuery
		if(this.helper[0] === this.currentItem[0]) {jQuery
			for(i in this._storedCSS) {jQuery
				if(this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") {jQuery
					this._storedCSS[i] = "";jQuery
				}jQuery
			}jQuery
			this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");jQuery
		} else {jQuery
			this.currentItem.show();jQuery
		}jQuery
jQuery
		if(this.fromOutside && !noPropagation) {jQuery
			delayedTriggers.push(function(event) { this._trigger("receive", event, this._uiHash(this.fromOutside)); });jQuery
		}jQuery
		if((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {jQuery
			delayedTriggers.push(function(event) { this._trigger("update", event, this._uiHash()); }); //Trigger update callback if the DOM position has changedjQuery
		}jQuery
jQuery
		// Check if the items Container has Changed and trigger appropriatejQuery
		// events.jQuery
		if (this !== this.currentContainer) {jQuery
			if(!noPropagation) {jQuery
				delayedTriggers.push(function(event) { this._trigger("remove", event, this._uiHash()); });jQuery
				delayedTriggers.push((function(c) { return function(event) { c._trigger("receive", event, this._uiHash(this)); };  }).call(this, this.currentContainer));jQuery
				delayedTriggers.push((function(c) { return function(event) { c._trigger("update", event, this._uiHash(this));  }; }).call(this, this.currentContainer));jQuery
			}jQuery
		}jQuery
jQuery
jQuery
		//Post events to containersjQuery
		function delayEvent( type, instance, container ) {jQuery
			return function( event ) {jQuery
				container._trigger( type, event, instance._uiHash( instance ) );jQuery
			};jQuery
		}jQuery
		for (i = this.containers.length - 1; i >= 0; i--){jQuery
			if (!noPropagation) {jQuery
				delayedTriggers.push( delayEvent( "deactivate", this, this.containers[ i ] ) );jQuery
			}jQuery
			if(this.containers[i].containerCache.over) {jQuery
				delayedTriggers.push( delayEvent( "out", this, this.containers[ i ] ) );jQuery
				this.containers[i].containerCache.over = 0;jQuery
			}jQuery
		}jQuery
jQuery
		//Do what was originally in pluginsjQuery
		if ( this.storedCursor ) {jQuery
			this.document.find( "body" ).css( "cursor", this.storedCursor );jQuery
			this.storedStylesheet.remove();jQuery
		}jQuery
		if(this._storedOpacity) {jQuery
			this.helper.css("opacity", this._storedOpacity);jQuery
		}jQuery
		if(this._storedZIndex) {jQuery
			this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex);jQuery
		}jQuery
jQuery
		this.dragging = false;jQuery
		if(this.cancelHelperRemoval) {jQuery
			if(!noPropagation) {jQuery
				this._trigger("beforeStop", event, this._uiHash());jQuery
				for (i=0; i < delayedTriggers.length; i++) {jQuery
					delayedTriggers[i].call(this, event);jQuery
				} //Trigger all delayed eventsjQuery
				this._trigger("stop", event, this._uiHash());jQuery
			}jQuery
jQuery
			this.fromOutside = false;jQuery
			return false;jQuery
		}jQuery
jQuery
		if(!noPropagation) {jQuery
			this._trigger("beforeStop", event, this._uiHash());jQuery
		}jQuery
jQuery
		//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!jQuery
		this.placeholder[0].parentNode.removeChild(this.placeholder[0]);jQuery
jQuery
		if(this.helper[0] !== this.currentItem[0]) {jQuery
			this.helper.remove();jQuery
		}jQuery
		this.helper = null;jQuery
jQuery
		if(!noPropagation) {jQuery
			for (i=0; i < delayedTriggers.length; i++) {jQuery
				delayedTriggers[i].call(this, event);jQuery
			} //Trigger all delayed eventsjQuery
			this._trigger("stop", event, this._uiHash());jQuery
		}jQuery
jQuery
		this.fromOutside = false;jQuery
		return true;jQuery
jQuery
	},jQuery
jQuery
	_trigger: function() {jQuery
		if ($.Widget.prototype._trigger.apply(this, arguments) === false) {jQuery
			this.cancel();jQuery
		}jQuery
	},jQuery
jQuery
	_uiHash: function(_inst) {jQuery
		var inst = _inst || this;jQuery
		return {jQuery
			helper: inst.helper,jQuery
			placeholder: inst.placeholder || $([]),jQuery
			position: inst.position,jQuery
			originalPosition: inst.originalPosition,jQuery
			offset: inst.positionAbs,jQuery
			item: inst.currentItem,jQuery
			sender: _inst ? _inst.element : nulljQuery
		};jQuery
	}jQuery
jQuery
});jQuery
jQuery
})(jQuery);jQuery
(function( $ ) {jQuery
jQuery
function modifier( fn ) {jQuery
	return function() {jQuery
		var previous = this.element.val();jQuery
		fn.apply( this, arguments );jQuery
		this._refresh();jQuery
		if ( previous !== this.element.val() ) {jQuery
			this._trigger( "change" );jQuery
		}jQuery
	};jQuery
}jQuery
jQuery
$.widget( "ui.spinner", {jQuery
	version: "1.10.4",jQuery
	defaultElement: "<input>",jQuery
	widgetEventPrefix: "spin",jQuery
	options: {jQuery
		culture: null,jQuery
		icons: {jQuery
			down: "ui-icon-triangle-1-s",jQuery
			up: "ui-icon-triangle-1-n"jQuery
		},jQuery
		incremental: true,jQuery
		max: null,jQuery
		min: null,jQuery
		numberFormat: null,jQuery
		page: 10,jQuery
		step: 1,jQuery
jQuery
		change: null,jQuery
		spin: null,jQuery
		start: null,jQuery
		stop: nulljQuery
	},jQuery
jQuery
	_create: function() {jQuery
		// handle string values that need to be parsedjQuery
		this._setOption( "max", this.options.max );jQuery
		this._setOption( "min", this.options.min );jQuery
		this._setOption( "step", this.options.step );jQuery
jQuery
		// Only format if there is a value, prevents the field from being markedjQuery
		// as invalid in Firefox, see #9573.jQuery
		if ( this.value() !== "" ) {jQuery
			// Format the value, but don't constrain.jQuery
			this._value( this.element.val(), true );jQuery
		}jQuery
jQuery
		this._draw();jQuery
		this._on( this._events );jQuery
		this._refresh();jQuery
jQuery
		// turning off autocomplete prevents the browser from remembering thejQuery
		// value when navigating through history, so we re-enable autocompletejQuery
		// if the page is unloaded before the widget is destroyed. #7790jQuery
		this._on( this.window, {jQuery
			beforeunload: function() {jQuery
				this.element.removeAttr( "autocomplete" );jQuery
			}jQuery
		});jQuery
	},jQuery
jQuery
	_getCreateOptions: function() {jQuery
		var options = {},jQuery
			element = this.element;jQuery
jQuery
		$.each( [ "min", "max", "step" ], function( i, option ) {jQuery
			var value = element.attr( option );jQuery
			if ( value !== undefined && value.length ) {jQuery
				options[ option ] = value;jQuery
			}jQuery
		});jQuery
jQuery
		return options;jQuery
	},jQuery
jQuery
	_events: {jQuery
		keydown: function( event ) {jQuery
			if ( this._start( event ) && this._keydown( event ) ) {jQuery
				event.preventDefault();jQuery
			}jQuery
		},jQuery
		keyup: "_stop",jQuery
		focus: function() {jQuery
			this.previous = this.element.val();jQuery
		},jQuery
		blur: function( event ) {jQuery
			if ( this.cancelBlur ) {jQuery
				delete this.cancelBlur;jQuery
				return;jQuery
			}jQuery
jQuery
			this._stop();jQuery
			this._refresh();jQuery
			if ( this.previous !== this.element.val() ) {jQuery
				this._trigger( "change", event );jQuery
			}jQuery
		},jQuery
		mousewheel: function( event, delta ) {jQuery
			if ( !delta ) {jQuery
				return;jQuery
			}jQuery
			if ( !this.spinning && !this._start( event ) ) {jQuery
				return false;jQuery
			}jQuery
jQuery
			this._spin( (delta > 0 ? 1 : -1) * this.options.step, event );jQuery
			clearTimeout( this.mousewheelTimer );jQuery
			this.mousewheelTimer = this._delay(function() {jQuery
				if ( this.spinning ) {jQuery
					this._stop( event );jQuery
				}jQuery
			}, 100 );jQuery
			event.preventDefault();jQuery
		},jQuery
		"mousedown .ui-spinner-button": function( event ) {jQuery
			var previous;jQuery
jQuery
			// We never want the buttons to have focus; whenever the user isjQuery
			// interacting with the spinner, the focus should be on the input.jQuery
			// If the input is focused then this.previous is properly set fromjQuery
			// when the input first received focus. If the input is not focusedjQuery
			// then we need to set this.previous based on the value before spinning.jQuery
			previous = this.element[0] === this.document[0].activeElement ?jQuery
				this.previous : this.element.val();jQuery
			function checkFocus() {jQuery
				var isActive = this.element[0] === this.document[0].activeElement;jQuery
				if ( !isActive ) {jQuery
					this.element.focus();jQuery
					this.previous = previous;jQuery
					// support: IEjQuery
					// IE sets focus asynchronously, so we need to check if focusjQuery
					// moved off of the input because the user clicked on the button.jQuery
					this._delay(function() {jQuery
						this.previous = previous;jQuery
					});jQuery
				}jQuery
			}jQuery
jQuery
			// ensure focus is on (or stays on) the text fieldjQuery
			event.preventDefault();jQuery
			checkFocus.call( this );jQuery
jQuery
			// support: IEjQuery
			// IE doesn't prevent moving focus even with event.preventDefault()jQuery
			// so we set a flag to know when we should ignore the blur eventjQuery
			// and check (again) if focus moved off of the input.jQuery
			this.cancelBlur = true;jQuery
			this._delay(function() {jQuery
				delete this.cancelBlur;jQuery
				checkFocus.call( this );jQuery
			});jQuery
jQuery
			if ( this._start( event ) === false ) {jQuery
				return;jQuery
			}jQuery
jQuery
			this._repeat( null, $( event.currentTarget ).hasClass( "ui-spinner-up" ) ? 1 : -1, event );jQuery
		},jQuery
		"mouseup .ui-spinner-button": "_stop",jQuery
		"mouseenter .ui-spinner-button": function( event ) {jQuery
			// button will add ui-state-active if mouse was down while mouseleave and kept downjQuery
			if ( !$( event.currentTarget ).hasClass( "ui-state-active" ) ) {jQuery
				return;jQuery
			}jQuery
jQuery
			if ( this._start( event ) === false ) {jQuery
				return false;jQuery
			}jQuery
			this._repeat( null, $( event.currentTarget ).hasClass( "ui-spinner-up" ) ? 1 : -1, event );jQuery
		},jQuery
		// TODO: do we really want to consider this a stop?jQuery
		// shouldn't we just stop the repeater and wait until mouseup beforejQuery
		// we trigger the stop event?jQuery
		"mouseleave .ui-spinner-button": "_stop"jQuery
	},jQuery
jQuery
	_draw: function() {jQuery
		var uiSpinner = this.uiSpinner = this.elementjQuery
			.addClass( "ui-spinner-input" )jQuery
			.attr( "autocomplete", "off" )jQuery
			.wrap( this._uiSpinnerHtml() )jQuery
			.parent()jQuery
				// add buttonsjQuery
				.append( this._buttonHtml() );jQuery
jQuery
		this.element.attr( "role", "spinbutton" );jQuery
jQuery
		// button bindingsjQuery
		this.buttons = uiSpinner.find( ".ui-spinner-button" )jQuery
			.attr( "tabIndex", -1 )jQuery
			.button()jQuery
			.removeClass( "ui-corner-all" );jQuery
jQuery
		// IE 6 doesn't understand height: 50% for the buttonsjQuery
		// unless the wrapper has an explicit heightjQuery
		if ( this.buttons.height() > Math.ceil( uiSpinner.height() * 0.5 ) &&jQuery
				uiSpinner.height() > 0 ) {jQuery
			uiSpinner.height( uiSpinner.height() );jQuery
		}jQuery
jQuery
		// disable spinner if element was already disabledjQuery
		if ( this.options.disabled ) {jQuery
			this.disable();jQuery
		}jQuery
	},jQuery
jQuery
	_keydown: function( event ) {jQuery
		var options = this.options,jQuery
			keyCode = $.ui.keyCode;jQuery
jQuery
		switch ( event.keyCode ) {jQuery
		case keyCode.UP:jQuery
			this._repeat( null, 1, event );jQuery
			return true;jQuery
		case keyCode.DOWN:jQuery
			this._repeat( null, -1, event );jQuery
			return true;jQuery
		case keyCode.PAGE_UP:jQuery
			this._repeat( null, options.page, event );jQuery
			return true;jQuery
		case keyCode.PAGE_DOWN:jQuery
			this._repeat( null, -options.page, event );jQuery
			return true;jQuery
		}jQuery
jQuery
		return false;jQuery
	},jQuery
jQuery
	_uiSpinnerHtml: function() {jQuery
		return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";jQuery
	},jQuery
jQuery
	_buttonHtml: function() {jQuery
		return "" +jQuery
			"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'>" +jQuery
				"<span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" +jQuery
			"</a>" +jQuery
			"<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" +jQuery
				"<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" +jQuery
			"</a>";jQuery
	},jQuery
jQuery
	_start: function( event ) {jQuery
		if ( !this.spinning && this._trigger( "start", event ) === false ) {jQuery
			return false;jQuery
		}jQuery
jQuery
		if ( !this.counter ) {jQuery
			this.counter = 1;jQuery
		}jQuery
		this.spinning = true;jQuery
		return true;jQuery
	},jQuery
jQuery
	_repeat: function( i, steps, event ) {jQuery
		i = i || 500;jQuery
jQuery
		clearTimeout( this.timer );jQuery
		this.timer = this._delay(function() {jQuery
			this._repeat( 40, steps, event );jQuery
		}, i );jQuery
jQuery
		this._spin( steps * this.options.step, event );jQuery
	},jQuery
jQuery
	_spin: function( step, event ) {jQuery
		var value = this.value() || 0;jQuery
jQuery
		if ( !this.counter ) {jQuery
			this.counter = 1;jQuery
		}jQuery
jQuery
		value = this._adjustValue( value + step * this._increment( this.counter ) );jQuery
jQuery
		if ( !this.spinning || this._trigger( "spin", event, { value: value } ) !== false) {jQuery
			this._value( value );jQuery
			this.counter++;jQuery
		}jQuery
	},jQuery
jQuery
	_increment: function( i ) {jQuery
		var incremental = this.options.incremental;jQuery
jQuery
		if ( incremental ) {jQuery
			return $.isFunction( incremental ) ?jQuery
				incremental( i ) :jQuery
				Math.floor( i*i*i/50000 - i*i/500 + 17*i/200 + 1 );jQuery
		}jQuery
jQuery
		return 1;jQuery
	},jQuery
jQuery
	_precision: function() {jQuery
		var precision = this._precisionOf( this.options.step );jQuery
		if ( this.options.min !== null ) {jQuery
			precision = Math.max( precision, this._precisionOf( this.options.min ) );jQuery
		}jQuery
		return precision;jQuery
	},jQuery
jQuery
	_precisionOf: function( num ) {jQuery
		var str = num.toString(),jQuery
			decimal = str.indexOf( "." );jQuery
		return decimal === -1 ? 0 : str.length - decimal - 1;jQuery
	},jQuery
jQuery
	_adjustValue: function( value ) {jQuery
		var base, aboveMin,jQuery
			options = this.options;jQuery
jQuery
		// make sure we're at a valid stepjQuery
		// - find out where we are relative to the base (min or 0)jQuery
		base = options.min !== null ? options.min : 0;jQuery
		aboveMin = value - base;jQuery
		// - round to the nearest stepjQuery
		aboveMin = Math.round(aboveMin / options.step) * options.step;jQuery
		// - rounding is based on 0, so adjust back to our basejQuery
		value = base + aboveMin;jQuery
jQuery
		// fix precision from bad JS floating point mathjQuery
		value = parseFloat( value.toFixed( this._precision() ) );jQuery
jQuery
		// clamp the valuejQuery
		if ( options.max !== null && value > options.max) {jQuery
			return options.max;jQuery
		}jQuery
		if ( options.min !== null && value < options.min ) {jQuery
			return options.min;jQuery
		}jQuery
jQuery
		return value;jQuery
	},jQuery
jQuery
	_stop: function( event ) {jQuery
		if ( !this.spinning ) {jQuery
			return;jQuery
		}jQuery
jQuery
		clearTimeout( this.timer );jQuery
		clearTimeout( this.mousewheelTimer );jQuery
		this.counter = 0;jQuery
		this.spinning = false;jQuery
		this._trigger( "stop", event );jQuery
	},jQuery
jQuery
	_setOption: function( key, value ) {jQuery
		if ( key === "culture" || key === "numberFormat" ) {jQuery
			var prevValue = this._parse( this.element.val() );jQuery
			this.options[ key ] = value;jQuery
			this.element.val( this._format( prevValue ) );jQuery
			return;jQuery
		}jQuery
jQuery
		if ( key === "max" || key === "min" || key === "step" ) {jQuery
			if ( typeof value === "string" ) {jQuery
				value = this._parse( value );jQuery
			}jQuery
		}jQuery
		if ( key === "icons" ) {jQuery
			this.buttons.first().find( ".ui-icon" )jQuery
				.removeClass( this.options.icons.up )jQuery
				.addClass( value.up );jQuery
			this.buttons.last().find( ".ui-icon" )jQuery
				.removeClass( this.options.icons.down )jQuery
				.addClass( value.down );jQuery
		}jQuery
jQuery
		this._super( key, value );jQuery
jQuery
		if ( key === "disabled" ) {jQuery
			if ( value ) {jQuery
				this.element.prop( "disabled", true );jQuery
				this.buttons.button( "disable" );jQuery
			} else {jQuery
				this.element.prop( "disabled", false );jQuery
				this.buttons.button( "enable" );jQuery
			}jQuery
		}jQuery
	},jQuery
jQuery
	_setOptions: modifier(function( options ) {jQuery
		this._super( options );jQuery
		this._value( this.element.val() );jQuery
	}),jQuery
jQuery
	_parse: function( val ) {jQuery
		if ( typeof val === "string" && val !== "" ) {jQuery
			val = window.Globalize && this.options.numberFormat ?jQuery
				Globalize.parseFloat( val, 10, this.options.culture ) : +val;jQuery
		}jQuery
		return val === "" || isNaN( val ) ? null : val;jQuery
	},jQuery
jQuery
	_format: function( value ) {jQuery
		if ( value === "" ) {jQuery
			return "";jQuery
		}jQuery
		return window.Globalize && this.options.numberFormat ?jQuery
			Globalize.format( value, this.options.numberFormat, this.options.culture ) :jQuery
			value;jQuery
	},jQuery
jQuery
	_refresh: function() {jQuery
		this.element.attr({jQuery
			"aria-valuemin": this.options.min,jQuery
			"aria-valuemax": this.options.max,jQuery
			// TODO: what should we do with values that can't be parsed?jQuery
			"aria-valuenow": this._parse( this.element.val() )jQuery
		});jQuery
	},jQuery
jQuery
	// update the value without triggering changejQuery
	_value: function( value, allowAny ) {jQuery
		var parsed;jQuery
		if ( value !== "" ) {jQuery
			parsed = this._parse( value );jQuery
			if ( parsed !== null ) {jQuery
				if ( !allowAny ) {jQuery
					parsed = this._adjustValue( parsed );jQuery
				}jQuery
				value = this._format( parsed );jQuery
			}jQuery
		}jQuery
		this.element.val( value );jQuery
		this._refresh();jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		this.elementjQuery
			.removeClass( "ui-spinner-input" )jQuery
			.prop( "disabled", false )jQuery
			.removeAttr( "autocomplete" )jQuery
			.removeAttr( "role" )jQuery
			.removeAttr( "aria-valuemin" )jQuery
			.removeAttr( "aria-valuemax" )jQuery
			.removeAttr( "aria-valuenow" );jQuery
		this.uiSpinner.replaceWith( this.element );jQuery
	},jQuery
jQuery
	stepUp: modifier(function( steps ) {jQuery
		this._stepUp( steps );jQuery
	}),jQuery
	_stepUp: function( steps ) {jQuery
		if ( this._start() ) {jQuery
			this._spin( (steps || 1) * this.options.step );jQuery
			this._stop();jQuery
		}jQuery
	},jQuery
jQuery
	stepDown: modifier(function( steps ) {jQuery
		this._stepDown( steps );jQuery
	}),jQuery
	_stepDown: function( steps ) {jQuery
		if ( this._start() ) {jQuery
			this._spin( (steps || 1) * -this.options.step );jQuery
			this._stop();jQuery
		}jQuery
	},jQuery
jQuery
	pageUp: modifier(function( pages ) {jQuery
		this._stepUp( (pages || 1) * this.options.page );jQuery
	}),jQuery
jQuery
	pageDown: modifier(function( pages ) {jQuery
		this._stepDown( (pages || 1) * this.options.page );jQuery
	}),jQuery
jQuery
	value: function( newVal ) {jQuery
		if ( !arguments.length ) {jQuery
			return this._parse( this.element.val() );jQuery
		}jQuery
		modifier( this._value ).call( this, newVal );jQuery
	},jQuery
jQuery
	widget: function() {jQuery
		return this.uiSpinner;jQuery
	}jQuery
});jQuery
jQuery
}( jQuery ) );jQuery
(function( $, undefined ) {jQuery
jQuery
var tabId = 0,jQuery
	rhash = /#.*$/;jQuery
jQuery
function getNextTabId() {jQuery
	return ++tabId;jQuery
}jQuery
jQuery
function isLocal( anchor ) {jQuery
	// support: IE7jQuery
	// IE7 doesn't normalize the href property when set via script (#9317)jQuery
	anchor = anchor.cloneNode( false );jQuery
jQuery
	return anchor.hash.length > 1 &&jQuery
		decodeURIComponent( anchor.href.replace( rhash, "" ) ) ===jQuery
			decodeURIComponent( location.href.replace( rhash, "" ) );jQuery
}jQuery
jQuery
$.widget( "ui.tabs", {jQuery
	version: "1.10.4",jQuery
	delay: 300,jQuery
	options: {jQuery
		active: null,jQuery
		collapsible: false,jQuery
		event: "click",jQuery
		heightStyle: "content",jQuery
		hide: null,jQuery
		show: null,jQuery
jQuery
		// callbacksjQuery
		activate: null,jQuery
		beforeActivate: null,jQuery
		beforeLoad: null,jQuery
		load: nulljQuery
	},jQuery
jQuery
	_create: function() {jQuery
		var that = this,jQuery
			options = this.options;jQuery
jQuery
		this.running = false;jQuery
jQuery
		this.elementjQuery
			.addClass( "ui-tabs ui-widget ui-widget-content ui-corner-all" )jQuery
			.toggleClass( "ui-tabs-collapsible", options.collapsible )jQuery
			// Prevent users from focusing disabled tabs via clickjQuery
			.delegate( ".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function( event ) {jQuery
				if ( $( this ).is( ".ui-state-disabled" ) ) {jQuery
					event.preventDefault();jQuery
				}jQuery
			})jQuery
			// support: IE <9jQuery
			// Preventing the default action in mousedown doesn't prevent IEjQuery
			// from focusing the element, so if the anchor gets focused, blur.jQuery
			// We don't have to worry about focusing the previously focusedjQuery
			// element since clicking on a non-focusable element should focusjQuery
			// the body anyway.jQuery
			.delegate( ".ui-tabs-anchor", "focus" + this.eventNamespace, function() {jQuery
				if ( $( this ).closest( "li" ).is( ".ui-state-disabled" ) ) {jQuery
					this.blur();jQuery
				}jQuery
			});jQuery
jQuery
		this._processTabs();jQuery
		options.active = this._initialActive();jQuery
jQuery
		// Take disabling tabs via class attribute from HTMLjQuery
		// into account and update option properly.jQuery
		if ( $.isArray( options.disabled ) ) {jQuery
			options.disabled = $.unique( options.disabled.concat(jQuery
				$.map( this.tabs.filter( ".ui-state-disabled" ), function( li ) {jQuery
					return that.tabs.index( li );jQuery
				})jQuery
			) ).sort();jQuery
		}jQuery
jQuery
		// check for length avoids error when initializing empty listjQuery
		if ( this.options.active !== false && this.anchors.length ) {jQuery
			this.active = this._findActive( options.active );jQuery
		} else {jQuery
			this.active = $();jQuery
		}jQuery
jQuery
		this._refresh();jQuery
jQuery
		if ( this.active.length ) {jQuery
			this.load( options.active );jQuery
		}jQuery
	},jQuery
jQuery
	_initialActive: function() {jQuery
		var active = this.options.active,jQuery
			collapsible = this.options.collapsible,jQuery
			locationHash = location.hash.substring( 1 );jQuery
jQuery
		if ( active === null ) {jQuery
			// check the fragment identifier in the URLjQuery
			if ( locationHash ) {jQuery
				this.tabs.each(function( i, tab ) {jQuery
					if ( $( tab ).attr( "aria-controls" ) === locationHash ) {jQuery
						active = i;jQuery
						return false;jQuery
					}jQuery
				});jQuery
			}jQuery
jQuery
			// check for a tab marked active via a classjQuery
			if ( active === null ) {jQuery
				active = this.tabs.index( this.tabs.filter( ".ui-tabs-active" ) );jQuery
			}jQuery
jQuery
			// no active tab, set to falsejQuery
			if ( active === null || active === -1 ) {jQuery
				active = this.tabs.length ? 0 : false;jQuery
			}jQuery
		}jQuery
jQuery
		// handle numbers: negative, out of rangejQuery
		if ( active !== false ) {jQuery
			active = this.tabs.index( this.tabs.eq( active ) );jQuery
			if ( active === -1 ) {jQuery
				active = collapsible ? false : 0;jQuery
			}jQuery
		}jQuery
jQuery
		// don't allow collapsible: false and active: falsejQuery
		if ( !collapsible && active === false && this.anchors.length ) {jQuery
			active = 0;jQuery
		}jQuery
jQuery
		return active;jQuery
	},jQuery
jQuery
	_getCreateEventData: function() {jQuery
		return {jQuery
			tab: this.active,jQuery
			panel: !this.active.length ? $() : this._getPanelForTab( this.active )jQuery
		};jQuery
	},jQuery
jQuery
	_tabKeydown: function( event ) {jQuery
		var focusedTab = $( this.document[0].activeElement ).closest( "li" ),jQuery
			selectedIndex = this.tabs.index( focusedTab ),jQuery
			goingForward = true;jQuery
jQuery
		if ( this._handlePageNav( event ) ) {jQuery
			return;jQuery
		}jQuery
jQuery
		switch ( event.keyCode ) {jQuery
			case $.ui.keyCode.RIGHT:jQuery
			case $.ui.keyCode.DOWN:jQuery
				selectedIndex++;jQuery
				break;jQuery
			case $.ui.keyCode.UP:jQuery
			case $.ui.keyCode.LEFT:jQuery
				goingForward = false;jQuery
				selectedIndex--;jQuery
				break;jQuery
			case $.ui.keyCode.END:jQuery
				selectedIndex = this.anchors.length - 1;jQuery
				break;jQuery
			case $.ui.keyCode.HOME:jQuery
				selectedIndex = 0;jQuery
				break;jQuery
			case $.ui.keyCode.SPACE:jQuery
				// Activate only, no collapsingjQuery
				event.preventDefault();jQuery
				clearTimeout( this.activating );jQuery
				this._activate( selectedIndex );jQuery
				return;jQuery
			case $.ui.keyCode.ENTER:jQuery
				// Toggle (cancel delayed activation, allow collapsing)jQuery
				event.preventDefault();jQuery
				clearTimeout( this.activating );jQuery
				// Determine if we should collapse or activatejQuery
				this._activate( selectedIndex === this.options.active ? false : selectedIndex );jQuery
				return;jQuery
			default:jQuery
				return;jQuery
		}jQuery
jQuery
		// Focus the appropriate tab, based on which key was pressedjQuery
		event.preventDefault();jQuery
		clearTimeout( this.activating );jQuery
		selectedIndex = this._focusNextTab( selectedIndex, goingForward );jQuery
jQuery
		// Navigating with control key will prevent automatic activationjQuery
		if ( !event.ctrlKey ) {jQuery
			// Update aria-selected immediately so that AT think the tab is already selected.jQuery
			// Otherwise AT may confuse the user by stating that they need to activate the tab,jQuery
			// but the tab will already be activated by the time the announcement finishes.jQuery
			focusedTab.attr( "aria-selected", "false" );jQuery
			this.tabs.eq( selectedIndex ).attr( "aria-selected", "true" );jQuery
jQuery
			this.activating = this._delay(function() {jQuery
				this.option( "active", selectedIndex );jQuery
			}, this.delay );jQuery
		}jQuery
	},jQuery
jQuery
	_panelKeydown: function( event ) {jQuery
		if ( this._handlePageNav( event ) ) {jQuery
			return;jQuery
		}jQuery
jQuery
		// Ctrl+up moves focus to the current tabjQuery
		if ( event.ctrlKey && event.keyCode === $.ui.keyCode.UP ) {jQuery
			event.preventDefault();jQuery
			this.active.focus();jQuery
		}jQuery
	},jQuery
jQuery
	// Alt+page up/down moves focus to the previous/next tab (and activates)jQuery
	_handlePageNav: function( event ) {jQuery
		if ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP ) {jQuery
			this._activate( this._focusNextTab( this.options.active - 1, false ) );jQuery
			return true;jQuery
		}jQuery
		if ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN ) {jQuery
			this._activate( this._focusNextTab( this.options.active + 1, true ) );jQuery
			return true;jQuery
		}jQuery
	},jQuery
jQuery
	_findNextTab: function( index, goingForward ) {jQuery
		var lastTabIndex = this.tabs.length - 1;jQuery
jQuery
		function constrain() {jQuery
			if ( index > lastTabIndex ) {jQuery
				index = 0;jQuery
			}jQuery
			if ( index < 0 ) {jQuery
				index = lastTabIndex;jQuery
			}jQuery
			return index;jQuery
		}jQuery
jQuery
		while ( $.inArray( constrain(), this.options.disabled ) !== -1 ) {jQuery
			index = goingForward ? index + 1 : index - 1;jQuery
		}jQuery
jQuery
		return index;jQuery
	},jQuery
jQuery
	_focusNextTab: function( index, goingForward ) {jQuery
		index = this._findNextTab( index, goingForward );jQuery
		this.tabs.eq( index ).focus();jQuery
		return index;jQuery
	},jQuery
jQuery
	_setOption: function( key, value ) {jQuery
		if ( key === "active" ) {jQuery
			// _activate() will handle invalid values and update this.optionsjQuery
			this._activate( value );jQuery
			return;jQuery
		}jQuery
jQuery
		if ( key === "disabled" ) {jQuery
			// don't use the widget factory's disabled handlingjQuery
			this._setupDisabled( value );jQuery
			return;jQuery
		}jQuery
jQuery
		this._super( key, value);jQuery
jQuery
		if ( key === "collapsible" ) {jQuery
			this.element.toggleClass( "ui-tabs-collapsible", value );jQuery
			// Setting collapsible: false while collapsed; open first paneljQuery
			if ( !value && this.options.active === false ) {jQuery
				this._activate( 0 );jQuery
			}jQuery
		}jQuery
jQuery
		if ( key === "event" ) {jQuery
			this._setupEvents( value );jQuery
		}jQuery
jQuery
		if ( key === "heightStyle" ) {jQuery
			this._setupHeightStyle( value );jQuery
		}jQuery
	},jQuery
jQuery
	_tabId: function( tab ) {jQuery
		return tab.attr( "aria-controls" ) || "ui-tabs-" + getNextTabId();jQuery
	},jQuery
jQuery
	_sanitizeSelector: function( hash ) {jQuery
		return hash ? hash.replace( /[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&" ) : "";jQuery
	},jQuery
jQuery
	refresh: function() {jQuery
		var options = this.options,jQuery
			lis = this.tablist.children( ":has(a[href])" );jQuery
jQuery
		// get disabled tabs from class attribute from HTMLjQuery
		// this will get converted to a boolean if needed in _refresh()jQuery
		options.disabled = $.map( lis.filter( ".ui-state-disabled" ), function( tab ) {jQuery
			return lis.index( tab );jQuery
		});jQuery
jQuery
		this._processTabs();jQuery
jQuery
		// was collapsed or no tabsjQuery
		if ( options.active === false || !this.anchors.length ) {jQuery
			options.active = false;jQuery
			this.active = $();jQuery
		// was active, but active tab is gonejQuery
		} else if ( this.active.length && !$.contains( this.tablist[ 0 ], this.active[ 0 ] ) ) {jQuery
			// all remaining tabs are disabledjQuery
			if ( this.tabs.length === options.disabled.length ) {jQuery
				options.active = false;jQuery
				this.active = $();jQuery
			// activate previous tabjQuery
			} else {jQuery
				this._activate( this._findNextTab( Math.max( 0, options.active - 1 ), false ) );jQuery
			}jQuery
		// was active, active tab still existsjQuery
		} else {jQuery
			// make sure active index is correctjQuery
			options.active = this.tabs.index( this.active );jQuery
		}jQuery
jQuery
		this._refresh();jQuery
	},jQuery
jQuery
	_refresh: function() {jQuery
		this._setupDisabled( this.options.disabled );jQuery
		this._setupEvents( this.options.event );jQuery
		this._setupHeightStyle( this.options.heightStyle );jQuery
jQuery
		this.tabs.not( this.active ).attr({jQuery
			"aria-selected": "false",jQuery
			tabIndex: -1jQuery
		});jQuery
		this.panels.not( this._getPanelForTab( this.active ) )jQuery
			.hide()jQuery
			.attr({jQuery
				"aria-expanded": "false",jQuery
				"aria-hidden": "true"jQuery
			});jQuery
jQuery
		// Make sure one tab is in the tab orderjQuery
		if ( !this.active.length ) {jQuery
			this.tabs.eq( 0 ).attr( "tabIndex", 0 );jQuery
		} else {jQuery
			this.activejQuery
				.addClass( "ui-tabs-active ui-state-active" )jQuery
				.attr({jQuery
					"aria-selected": "true",jQuery
					tabIndex: 0jQuery
				});jQuery
			this._getPanelForTab( this.active )jQuery
				.show()jQuery
				.attr({jQuery
					"aria-expanded": "true",jQuery
					"aria-hidden": "false"jQuery
				});jQuery
		}jQuery
	},jQuery
jQuery
	_processTabs: function() {jQuery
		var that = this;jQuery
jQuery
		this.tablist = this._getList()jQuery
			.addClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" )jQuery
			.attr( "role", "tablist" );jQuery
jQuery
		this.tabs = this.tablist.find( "> li:has(a[href])" )jQuery
			.addClass( "ui-state-default ui-corner-top" )jQuery
			.attr({jQuery
				role: "tab",jQuery
				tabIndex: -1jQuery
			});jQuery
jQuery
		this.anchors = this.tabs.map(function() {jQuery
				return $( "a", this )[ 0 ];jQuery
			})jQuery
			.addClass( "ui-tabs-anchor" )jQuery
			.attr({jQuery
				role: "presentation",jQuery
				tabIndex: -1jQuery
			});jQuery
jQuery
		this.panels = $();jQuery
jQuery
		this.anchors.each(function( i, anchor ) {jQuery
			var selector, panel, panelId,jQuery
				anchorId = $( anchor ).uniqueId().attr( "id" ),jQuery
				tab = $( anchor ).closest( "li" ),jQuery
				originalAriaControls = tab.attr( "aria-controls" );jQuery
jQuery
			// inline tabjQuery
			if ( isLocal( anchor ) ) {jQuery
				selector = anchor.hash;jQuery
				panel = that.element.find( that._sanitizeSelector( selector ) );jQuery
			// remote tabjQuery
			} else {jQuery
				panelId = that._tabId( tab );jQuery
				selector = "#" + panelId;jQuery
				panel = that.element.find( selector );jQuery
				if ( !panel.length ) {jQuery
					panel = that._createPanel( panelId );jQuery
					panel.insertAfter( that.panels[ i - 1 ] || that.tablist );jQuery
				}jQuery
				panel.attr( "aria-live", "polite" );jQuery
			}jQuery
jQuery
			if ( panel.length) {jQuery
				that.panels = that.panels.add( panel );jQuery
			}jQuery
			if ( originalAriaControls ) {jQuery
				tab.data( "ui-tabs-aria-controls", originalAriaControls );jQuery
			}jQuery
			tab.attr({jQuery
				"aria-controls": selector.substring( 1 ),jQuery
				"aria-labelledby": anchorIdjQuery
			});jQuery
			panel.attr( "aria-labelledby", anchorId );jQuery
		});jQuery
jQuery
		this.panelsjQuery
			.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )jQuery
			.attr( "role", "tabpanel" );jQuery
	},jQuery
jQuery
	// allow overriding how to find the list for rare usage scenarios (#7715)jQuery
	_getList: function() {jQuery
		return this.tablist || this.element.find( "ol,ul" ).eq( 0 );jQuery
	},jQuery
jQuery
	_createPanel: function( id ) {jQuery
		return $( "<div>" )jQuery
			.attr( "id", id )jQuery
			.addClass( "ui-tabs-panel ui-widget-content ui-corner-bottom" )jQuery
			.data( "ui-tabs-destroy", true );jQuery
	},jQuery
jQuery
	_setupDisabled: function( disabled ) {jQuery
		if ( $.isArray( disabled ) ) {jQuery
			if ( !disabled.length ) {jQuery
				disabled = false;jQuery
			} else if ( disabled.length === this.anchors.length ) {jQuery
				disabled = true;jQuery
			}jQuery
		}jQuery
jQuery
		// disable tabsjQuery
		for ( var i = 0, li; ( li = this.tabs[ i ] ); i++ ) {jQuery
			if ( disabled === true || $.inArray( i, disabled ) !== -1 ) {jQuery
				$( li )jQuery
					.addClass( "ui-state-disabled" )jQuery
					.attr( "aria-disabled", "true" );jQuery
			} else {jQuery
				$( li )jQuery
					.removeClass( "ui-state-disabled" )jQuery
					.removeAttr( "aria-disabled" );jQuery
			}jQuery
		}jQuery
jQuery
		this.options.disabled = disabled;jQuery
	},jQuery
jQuery
	_setupEvents: function( event ) {jQuery
		var events = {jQuery
			click: function( event ) {jQuery
				event.preventDefault();jQuery
			}jQuery
		};jQuery
		if ( event ) {jQuery
			$.each( event.split(" "), function( index, eventName ) {jQuery
				events[ eventName ] = "_eventHandler";jQuery
			});jQuery
		}jQuery
jQuery
		this._off( this.anchors.add( this.tabs ).add( this.panels ) );jQuery
		this._on( this.anchors, events );jQuery
		this._on( this.tabs, { keydown: "_tabKeydown" } );jQuery
		this._on( this.panels, { keydown: "_panelKeydown" } );jQuery
jQuery
		this._focusable( this.tabs );jQuery
		this._hoverable( this.tabs );jQuery
	},jQuery
jQuery
	_setupHeightStyle: function( heightStyle ) {jQuery
		var maxHeight,jQuery
			parent = this.element.parent();jQuery
jQuery
		if ( heightStyle === "fill" ) {jQuery
			maxHeight = parent.height();jQuery
			maxHeight -= this.element.outerHeight() - this.element.height();jQuery
jQuery
			this.element.siblings( ":visible" ).each(function() {jQuery
				var elem = $( this ),jQuery
					position = elem.css( "position" );jQuery
jQuery
				if ( position === "absolute" || position === "fixed" ) {jQuery
					return;jQuery
				}jQuery
				maxHeight -= elem.outerHeight( true );jQuery
			});jQuery
jQuery
			this.element.children().not( this.panels ).each(function() {jQuery
				maxHeight -= $( this ).outerHeight( true );jQuery
			});jQuery
jQuery
			this.panels.each(function() {jQuery
				$( this ).height( Math.max( 0, maxHeight -jQuery
					$( this ).innerHeight() + $( this ).height() ) );jQuery
			})jQuery
			.css( "overflow", "auto" );jQuery
		} else if ( heightStyle === "auto" ) {jQuery
			maxHeight = 0;jQuery
			this.panels.each(function() {jQuery
				maxHeight = Math.max( maxHeight, $( this ).height( "" ).height() );jQuery
			}).height( maxHeight );jQuery
		}jQuery
	},jQuery
jQuery
	_eventHandler: function( event ) {jQuery
		var options = this.options,jQuery
			active = this.active,jQuery
			anchor = $( event.currentTarget ),jQuery
			tab = anchor.closest( "li" ),jQuery
			clickedIsActive = tab[ 0 ] === active[ 0 ],jQuery
			collapsing = clickedIsActive && options.collapsible,jQuery
			toShow = collapsing ? $() : this._getPanelForTab( tab ),jQuery
			toHide = !active.length ? $() : this._getPanelForTab( active ),jQuery
			eventData = {jQuery
				oldTab: active,jQuery
				oldPanel: toHide,jQuery
				newTab: collapsing ? $() : tab,jQuery
				newPanel: toShowjQuery
			};jQuery
jQuery
		event.preventDefault();jQuery
jQuery
		if ( tab.hasClass( "ui-state-disabled" ) ||jQuery
				// tab is already loadingjQuery
				tab.hasClass( "ui-tabs-loading" ) ||jQuery
				// can't switch durning an animationjQuery
				this.running ||jQuery
				// click on active header, but not collapsiblejQuery
				( clickedIsActive && !options.collapsible ) ||jQuery
				// allow canceling activationjQuery
				( this._trigger( "beforeActivate", event, eventData ) === false ) ) {jQuery
			return;jQuery
		}jQuery
jQuery
		options.active = collapsing ? false : this.tabs.index( tab );jQuery
jQuery
		this.active = clickedIsActive ? $() : tab;jQuery
		if ( this.xhr ) {jQuery
			this.xhr.abort();jQuery
		}jQuery
jQuery
		if ( !toHide.length && !toShow.length ) {jQuery
			$.error( "jQuery UI Tabs: Mismatching fragment identifier." );jQuery
		}jQuery
jQuery
		if ( toShow.length ) {jQuery
			this.load( this.tabs.index( tab ), event );jQuery
		}jQuery
		this._toggle( event, eventData );jQuery
	},jQuery
jQuery
	// handles show/hide for selecting tabsjQuery
	_toggle: function( event, eventData ) {jQuery
		var that = this,jQuery
			toShow = eventData.newPanel,jQuery
			toHide = eventData.oldPanel;jQuery
jQuery
		this.running = true;jQuery
jQuery
		function complete() {jQuery
			that.running = false;jQuery
			that._trigger( "activate", event, eventData );jQuery
		}jQuery
jQuery
		function show() {jQuery
			eventData.newTab.closest( "li" ).addClass( "ui-tabs-active ui-state-active" );jQuery
jQuery
			if ( toShow.length && that.options.show ) {jQuery
				that._show( toShow, that.options.show, complete );jQuery
			} else {jQuery
				toShow.show();jQuery
				complete();jQuery
			}jQuery
		}jQuery
jQuery
		// start out by hiding, then showing, then completingjQuery
		if ( toHide.length && this.options.hide ) {jQuery
			this._hide( toHide, this.options.hide, function() {jQuery
				eventData.oldTab.closest( "li" ).removeClass( "ui-tabs-active ui-state-active" );jQuery
				show();jQuery
			});jQuery
		} else {jQuery
			eventData.oldTab.closest( "li" ).removeClass( "ui-tabs-active ui-state-active" );jQuery
			toHide.hide();jQuery
			show();jQuery
		}jQuery
jQuery
		toHide.attr({jQuery
			"aria-expanded": "false",jQuery
			"aria-hidden": "true"jQuery
		});jQuery
		eventData.oldTab.attr( "aria-selected", "false" );jQuery
		// If we're switching tabs, remove the old tab from the tab order.jQuery
		// If we're opening from collapsed state, remove the previous tab from the tab order.jQuery
		// If we're collapsing, then keep the collapsing tab in the tab order.jQuery
		if ( toShow.length && toHide.length ) {jQuery
			eventData.oldTab.attr( "tabIndex", -1 );jQuery
		} else if ( toShow.length ) {jQuery
			this.tabs.filter(function() {jQuery
				return $( this ).attr( "tabIndex" ) === 0;jQuery
			})jQuery
			.attr( "tabIndex", -1 );jQuery
		}jQuery
jQuery
		toShow.attr({jQuery
			"aria-expanded": "true",jQuery
			"aria-hidden": "false"jQuery
		});jQuery
		eventData.newTab.attr({jQuery
			"aria-selected": "true",jQuery
			tabIndex: 0jQuery
		});jQuery
	},jQuery
jQuery
	_activate: function( index ) {jQuery
		var anchor,jQuery
			active = this._findActive( index );jQuery
jQuery
		// trying to activate the already active paneljQuery
		if ( active[ 0 ] === this.active[ 0 ] ) {jQuery
			return;jQuery
		}jQuery
jQuery
		// trying to collapse, simulate a click on the current active headerjQuery
		if ( !active.length ) {jQuery
			active = this.active;jQuery
		}jQuery
jQuery
		anchor = active.find( ".ui-tabs-anchor" )[ 0 ];jQuery
		this._eventHandler({jQuery
			target: anchor,jQuery
			currentTarget: anchor,jQuery
			preventDefault: $.noopjQuery
		});jQuery
	},jQuery
jQuery
	_findActive: function( index ) {jQuery
		return index === false ? $() : this.tabs.eq( index );jQuery
	},jQuery
jQuery
	_getIndex: function( index ) {jQuery
		// meta-function to give users option to provide a href string instead of a numerical index.jQuery
		if ( typeof index === "string" ) {jQuery
			index = this.anchors.index( this.anchors.filter( "[href$='" + index + "']" ) );jQuery
		}jQuery
jQuery
		return index;jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		if ( this.xhr ) {jQuery
			this.xhr.abort();jQuery
		}jQuery
jQuery
		this.element.removeClass( "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible" );jQuery
jQuery
		this.tablistjQuery
			.removeClass( "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" )jQuery
			.removeAttr( "role" );jQuery
jQuery
		this.anchorsjQuery
			.removeClass( "ui-tabs-anchor" )jQuery
			.removeAttr( "role" )jQuery
			.removeAttr( "tabIndex" )jQuery
			.removeUniqueId();jQuery
jQuery
		this.tabs.add( this.panels ).each(function() {jQuery
			if ( $.data( this, "ui-tabs-destroy" ) ) {jQuery
				$( this ).remove();jQuery
			} else {jQuery
				$( this )jQuery
					.removeClass( "ui-state-default ui-state-active ui-state-disabled " +jQuery
						"ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel" )jQuery
					.removeAttr( "tabIndex" )jQuery
					.removeAttr( "aria-live" )jQuery
					.removeAttr( "aria-busy" )jQuery
					.removeAttr( "aria-selected" )jQuery
					.removeAttr( "aria-labelledby" )jQuery
					.removeAttr( "aria-hidden" )jQuery
					.removeAttr( "aria-expanded" )jQuery
					.removeAttr( "role" );jQuery
			}jQuery
		});jQuery
jQuery
		this.tabs.each(function() {jQuery
			var li = $( this ),jQuery
				prev = li.data( "ui-tabs-aria-controls" );jQuery
			if ( prev ) {jQuery
				lijQuery
					.attr( "aria-controls", prev )jQuery
					.removeData( "ui-tabs-aria-controls" );jQuery
			} else {jQuery
				li.removeAttr( "aria-controls" );jQuery
			}jQuery
		});jQuery
jQuery
		this.panels.show();jQuery
jQuery
		if ( this.options.heightStyle !== "content" ) {jQuery
			this.panels.css( "height", "" );jQuery
		}jQuery
	},jQuery
jQuery
	enable: function( index ) {jQuery
		var disabled = this.options.disabled;jQuery
		if ( disabled === false ) {jQuery
			return;jQuery
		}jQuery
jQuery
		if ( index === undefined ) {jQuery
			disabled = false;jQuery
		} else {jQuery
			index = this._getIndex( index );jQuery
			if ( $.isArray( disabled ) ) {jQuery
				disabled = $.map( disabled, function( num ) {jQuery
					return num !== index ? num : null;jQuery
				});jQuery
			} else {jQuery
				disabled = $.map( this.tabs, function( li, num ) {jQuery
					return num !== index ? num : null;jQuery
				});jQuery
			}jQuery
		}jQuery
		this._setupDisabled( disabled );jQuery
	},jQuery
jQuery
	disable: function( index ) {jQuery
		var disabled = this.options.disabled;jQuery
		if ( disabled === true ) {jQuery
			return;jQuery
		}jQuery
jQuery
		if ( index === undefined ) {jQuery
			disabled = true;jQuery
		} else {jQuery
			index = this._getIndex( index );jQuery
			if ( $.inArray( index, disabled ) !== -1 ) {jQuery
				return;jQuery
			}jQuery
			if ( $.isArray( disabled ) ) {jQuery
				disabled = $.merge( [ index ], disabled ).sort();jQuery
			} else {jQuery
				disabled = [ index ];jQuery
			}jQuery
		}jQuery
		this._setupDisabled( disabled );jQuery
	},jQuery
jQuery
	load: function( index, event ) {jQuery
		index = this._getIndex( index );jQuery
		var that = this,jQuery
			tab = this.tabs.eq( index ),jQuery
			anchor = tab.find( ".ui-tabs-anchor" ),jQuery
			panel = this._getPanelForTab( tab ),jQuery
			eventData = {jQuery
				tab: tab,jQuery
				panel: paneljQuery
			};jQuery
jQuery
		// not remotejQuery
		if ( isLocal( anchor[ 0 ] ) ) {jQuery
			return;jQuery
		}jQuery
jQuery
		this.xhr = $.ajax( this._ajaxSettings( anchor, event, eventData ) );jQuery
jQuery
		// support: jQuery <1.8jQuery
		// jQuery <1.8 returns false if the request is canceled in beforeSend,jQuery
		// but as of 1.8, $.ajax() always returns a jqXHR object.jQuery
		if ( this.xhr && this.xhr.statusText !== "canceled" ) {jQuery
			tab.addClass( "ui-tabs-loading" );jQuery
			panel.attr( "aria-busy", "true" );jQuery
jQuery
			this.xhrjQuery
				.success(function( response ) {jQuery
					// support: jQuery <1.8jQuery
					// http://bugs.jquery.com/ticket/11778jQuery
					setTimeout(function() {jQuery
						panel.html( response );jQuery
						that._trigger( "load", event, eventData );jQuery
					}, 1 );jQuery
				})jQuery
				.complete(function( jqXHR, status ) {jQuery
					// support: jQuery <1.8jQuery
					// http://bugs.jquery.com/ticket/11778jQuery
					setTimeout(function() {jQuery
						if ( status === "abort" ) {jQuery
							that.panels.stop( false, true );jQuery
						}jQuery
jQuery
						tab.removeClass( "ui-tabs-loading" );jQuery
						panel.removeAttr( "aria-busy" );jQuery
jQuery
						if ( jqXHR === that.xhr ) {jQuery
							delete that.xhr;jQuery
						}jQuery
					}, 1 );jQuery
				});jQuery
		}jQuery
	},jQuery
jQuery
	_ajaxSettings: function( anchor, event, eventData ) {jQuery
		var that = this;jQuery
		return {jQuery
			url: anchor.attr( "href" ),jQuery
			beforeSend: function( jqXHR, settings ) {jQuery
				return that._trigger( "beforeLoad", event,jQuery
					$.extend( { jqXHR : jqXHR, ajaxSettings: settings }, eventData ) );jQuery
			}jQuery
		};jQuery
	},jQuery
jQuery
	_getPanelForTab: function( tab ) {jQuery
		var id = $( tab ).attr( "aria-controls" );jQuery
		return this.element.find( this._sanitizeSelector( "#" + id ) );jQuery
	}jQuery
});jQuery
jQuery
})( jQuery );jQuery
(function( $ ) {jQuery
jQuery
var increments = 0;jQuery
jQuery
function addDescribedBy( elem, id ) {jQuery
	var describedby = (elem.attr( "aria-describedby" ) || "").split( /\s+/ );jQuery
	describedby.push( id );jQuery
	elemjQuery
		.data( "ui-tooltip-id", id )jQuery
		.attr( "aria-describedby", $.trim( describedby.join( " " ) ) );jQuery
}jQuery
jQuery
function removeDescribedBy( elem ) {jQuery
	var id = elem.data( "ui-tooltip-id" ),jQuery
		describedby = (elem.attr( "aria-describedby" ) || "").split( /\s+/ ),jQuery
		index = $.inArray( id, describedby );jQuery
	if ( index !== -1 ) {jQuery
		describedby.splice( index, 1 );jQuery
	}jQuery
jQuery
	elem.removeData( "ui-tooltip-id" );jQuery
	describedby = $.trim( describedby.join( " " ) );jQuery
	if ( describedby ) {jQuery
		elem.attr( "aria-describedby", describedby );jQuery
	} else {jQuery
		elem.removeAttr( "aria-describedby" );jQuery
	}jQuery
}jQuery
jQuery
$.widget( "ui.tooltip", {jQuery
	version: "1.10.4",jQuery
	options: {jQuery
		content: function() {jQuery
			// support: IE<9, Opera in jQuery <1.7jQuery
			// .text() can't accept undefined, so coerce to a stringjQuery
			var title = $( this ).attr( "title" ) || "";jQuery
			// Escape title, since we're going from an attribute to raw HTMLjQuery
			return $( "<a>" ).text( title ).html();jQuery
		},jQuery
		hide: true,jQuery
		// Disabled elements have inconsistent behavior across browsers (#8661)jQuery
		items: "[title]:not([disabled])",jQuery
		position: {jQuery
			my: "left top+15",jQuery
			at: "left bottom",jQuery
			collision: "flipfit flip"jQuery
		},jQuery
		show: true,jQuery
		tooltipClass: null,jQuery
		track: false,jQuery
jQuery
		// callbacksjQuery
		close: null,jQuery
		open: nulljQuery
	},jQuery
jQuery
	_create: function() {jQuery
		this._on({jQuery
			mouseover: "open",jQuery
			focusin: "open"jQuery
		});jQuery
jQuery
		// IDs of generated tooltips, needed for destroyjQuery
		this.tooltips = {};jQuery
		// IDs of parent tooltips where we removed the title attributejQuery
		this.parents = {};jQuery
jQuery
		if ( this.options.disabled ) {jQuery
			this._disable();jQuery
		}jQuery
	},jQuery
jQuery
	_setOption: function( key, value ) {jQuery
		var that = this;jQuery
jQuery
		if ( key === "disabled" ) {jQuery
			this[ value ? "_disable" : "_enable" ]();jQuery
			this.options[ key ] = value;jQuery
			// disable element style changesjQuery
			return;jQuery
		}jQuery
jQuery
		this._super( key, value );jQuery
jQuery
		if ( key === "content" ) {jQuery
			$.each( this.tooltips, function( id, element ) {jQuery
				that._updateContent( element );jQuery
			});jQuery
		}jQuery
	},jQuery
jQuery
	_disable: function() {jQuery
		var that = this;jQuery
jQuery
		// close open tooltipsjQuery
		$.each( this.tooltips, function( id, element ) {jQuery
			var event = $.Event( "blur" );jQuery
			event.target = event.currentTarget = element[0];jQuery
			that.close( event, true );jQuery
		});jQuery
jQuery
		// remove title attributes to prevent native tooltipsjQuery
		this.element.find( this.options.items ).addBack().each(function() {jQuery
			var element = $( this );jQuery
			if ( element.is( "[title]" ) ) {jQuery
				elementjQuery
					.data( "ui-tooltip-title", element.attr( "title" ) )jQuery
					.attr( "title", "" );jQuery
			}jQuery
		});jQuery
	},jQuery
jQuery
	_enable: function() {jQuery
		// restore title attributesjQuery
		this.element.find( this.options.items ).addBack().each(function() {jQuery
			var element = $( this );jQuery
			if ( element.data( "ui-tooltip-title" ) ) {jQuery
				element.attr( "title", element.data( "ui-tooltip-title" ) );jQuery
			}jQuery
		});jQuery
	},jQuery
jQuery
	open: function( event ) {jQuery
		var that = this,jQuery
			target = $( event ? event.target : this.element )jQuery
				// we need closest here due to mouseover bubbling,jQuery
				// but always pointing at the same event targetjQuery
				.closest( this.options.items );jQuery
jQuery
		// No element to show a tooltip for or the tooltip is already openjQuery
		if ( !target.length || target.data( "ui-tooltip-id" ) ) {jQuery
			return;jQuery
		}jQuery
jQuery
		if ( target.attr( "title" ) ) {jQuery
			target.data( "ui-tooltip-title", target.attr( "title" ) );jQuery
		}jQuery
jQuery
		target.data( "ui-tooltip-open", true );jQuery
jQuery
		// kill parent tooltips, custom or native, for hoverjQuery
		if ( event && event.type === "mouseover" ) {jQuery
			target.parents().each(function() {jQuery
				var parent = $( this ),jQuery
					blurEvent;jQuery
				if ( parent.data( "ui-tooltip-open" ) ) {jQuery
					blurEvent = $.Event( "blur" );jQuery
					blurEvent.target = blurEvent.currentTarget = this;jQuery
					that.close( blurEvent, true );jQuery
				}jQuery
				if ( parent.attr( "title" ) ) {jQuery
					parent.uniqueId();jQuery
					that.parents[ this.id ] = {jQuery
						element: this,jQuery
						title: parent.attr( "title" )jQuery
					};jQuery
					parent.attr( "title", "" );jQuery
				}jQuery
			});jQuery
		}jQuery
jQuery
		this._updateContent( target, event );jQuery
	},jQuery
jQuery
	_updateContent: function( target, event ) {jQuery
		var content,jQuery
			contentOption = this.options.content,jQuery
			that = this,jQuery
			eventType = event ? event.type : null;jQuery
jQuery
		if ( typeof contentOption === "string" ) {jQuery
			return this._open( event, target, contentOption );jQuery
		}jQuery
jQuery
		content = contentOption.call( target[0], function( response ) {jQuery
			// ignore async response if tooltip was closed alreadyjQuery
			if ( !target.data( "ui-tooltip-open" ) ) {jQuery
				return;jQuery
			}jQuery
			// IE may instantly serve a cached response for ajax requestsjQuery
			// delay this call to _open so the other call to _open runs firstjQuery
			that._delay(function() {jQuery
				// jQuery creates a special event for focusin when it doesn'tjQuery
				// exist natively. To improve performance, the native eventjQuery
				// object is reused and the type is changed. Therefore, we can'tjQuery
				// rely on the type being correct after the event finishedjQuery
				// bubbling, so we set it back to the previous value. (#8740)jQuery
				if ( event ) {jQuery
					event.type = eventType;jQuery
				}jQuery
				this._open( event, target, response );jQuery
			});jQuery
		});jQuery
		if ( content ) {jQuery
			this._open( event, target, content );jQuery
		}jQuery
	},jQuery
jQuery
	_open: function( event, target, content ) {jQuery
		var tooltip, events, delayedShow,jQuery
			positionOption = $.extend( {}, this.options.position );jQuery
jQuery
		if ( !content ) {jQuery
			return;jQuery
		}jQuery
jQuery
		// Content can be updated multiple times. If the tooltip alreadyjQuery
		// exists, then just update the content and bail.jQuery
		tooltip = this._find( target );jQuery
		if ( tooltip.length ) {jQuery
			tooltip.find( ".ui-tooltip-content" ).html( content );jQuery
			return;jQuery
		}jQuery
jQuery
		// if we have a title, clear it to prevent the native tooltipjQuery
		// we have to check first to avoid defining a title if none existsjQuery
		// (we don't want to cause an element to start matching [title])jQuery
		//jQuery
		// We use removeAttr only for key events, to allow IE to export the correctjQuery
		// accessible attributes. For mouse events, set to empty string to avoidjQuery
		// native tooltip showing up (happens only when removing inside mouseover).jQuery
		if ( target.is( "[title]" ) ) {jQuery
			if ( event && event.type === "mouseover" ) {jQuery
				target.attr( "title", "" );jQuery
			} else {jQuery
				target.removeAttr( "title" );jQuery
			}jQuery
		}jQuery
jQuery
		tooltip = this._tooltip( target );jQuery
		addDescribedBy( target, tooltip.attr( "id" ) );jQuery
		tooltip.find( ".ui-tooltip-content" ).html( content );jQuery
jQuery
		function position( event ) {jQuery
			positionOption.of = event;jQuery
			if ( tooltip.is( ":hidden" ) ) {jQuery
				return;jQuery
			}jQuery
			tooltip.position( positionOption );jQuery
		}jQuery
		if ( this.options.track && event && /^mouse/.test( event.type ) ) {jQuery
			this._on( this.document, {jQuery
				mousemove: positionjQuery
			});jQuery
			// trigger once to override element-relative positioningjQuery
			position( event );jQuery
		} else {jQuery
			tooltip.position( $.extend({jQuery
				of: targetjQuery
			}, this.options.position ) );jQuery
		}jQuery
jQuery
		tooltip.hide();jQuery
jQuery
		this._show( tooltip, this.options.show );jQuery
		// Handle tracking tooltips that are shown with a delay (#8644). As soonjQuery
		// as the tooltip is visible, position the tooltip using the most recentjQuery
		// event.jQuery
		if ( this.options.show && this.options.show.delay ) {jQuery
			delayedShow = this.delayedShow = setInterval(function() {jQuery
				if ( tooltip.is( ":visible" ) ) {jQuery
					position( positionOption.of );jQuery
					clearInterval( delayedShow );jQuery
				}jQuery
			}, $.fx.interval );jQuery
		}jQuery
jQuery
		this._trigger( "open", event, { tooltip: tooltip } );jQuery
jQuery
		events = {jQuery
			keyup: function( event ) {jQuery
				if ( event.keyCode === $.ui.keyCode.ESCAPE ) {jQuery
					var fakeEvent = $.Event(event);jQuery
					fakeEvent.currentTarget = target[0];jQuery
					this.close( fakeEvent, true );jQuery
				}jQuery
			},jQuery
			remove: function() {jQuery
				this._removeTooltip( tooltip );jQuery
			}jQuery
		};jQuery
		if ( !event || event.type === "mouseover" ) {jQuery
			events.mouseleave = "close";jQuery
		}jQuery
		if ( !event || event.type === "focusin" ) {jQuery
			events.focusout = "close";jQuery
		}jQuery
		this._on( true, target, events );jQuery
	},jQuery
jQuery
	close: function( event ) {jQuery
		var that = this,jQuery
			target = $( event ? event.currentTarget : this.element ),jQuery
			tooltip = this._find( target );jQuery
jQuery
		// disabling closes the tooltip, so we need to track when we're closingjQuery
		// to avoid an infinite loop in case the tooltip becomes disabled on closejQuery
		if ( this.closing ) {jQuery
			return;jQuery
		}jQuery
jQuery
		// Clear the interval for delayed tracking tooltipsjQuery
		clearInterval( this.delayedShow );jQuery
jQuery
		// only set title if we had one before (see comment in _open())jQuery
		if ( target.data( "ui-tooltip-title" ) ) {jQuery
			target.attr( "title", target.data( "ui-tooltip-title" ) );jQuery
		}jQuery
jQuery
		removeDescribedBy( target );jQuery
jQuery
		tooltip.stop( true );jQuery
		this._hide( tooltip, this.options.hide, function() {jQuery
			that._removeTooltip( $( this ) );jQuery
		});jQuery
jQuery
		target.removeData( "ui-tooltip-open" );jQuery
		this._off( target, "mouseleave focusout keyup" );jQuery
		// Remove 'remove' binding only on delegated targetsjQuery
		if ( target[0] !== this.element[0] ) {jQuery
			this._off( target, "remove" );jQuery
		}jQuery
		this._off( this.document, "mousemove" );jQuery
jQuery
		if ( event && event.type === "mouseleave" ) {jQuery
			$.each( this.parents, function( id, parent ) {jQuery
				$( parent.element ).attr( "title", parent.title );jQuery
				delete that.parents[ id ];jQuery
			});jQuery
		}jQuery
jQuery
		this.closing = true;jQuery
		this._trigger( "close", event, { tooltip: tooltip } );jQuery
		this.closing = false;jQuery
	},jQuery
jQuery
	_tooltip: function( element ) {jQuery
		var id = "ui-tooltip-" + increments++,jQuery
			tooltip = $( "<div>" )jQuery
				.attr({jQuery
					id: id,jQuery
					role: "tooltip"jQuery
				})jQuery
				.addClass( "ui-tooltip ui-widget ui-corner-all ui-widget-content " +jQuery
					( this.options.tooltipClass || "" ) );jQuery
		$( "<div>" )jQuery
			.addClass( "ui-tooltip-content" )jQuery
			.appendTo( tooltip );jQuery
		tooltip.appendTo( this.document[0].body );jQuery
		this.tooltips[ id ] = element;jQuery
		return tooltip;jQuery
	},jQuery
jQuery
	_find: function( target ) {jQuery
		var id = target.data( "ui-tooltip-id" );jQuery
		return id ? $( "#" + id ) : $();jQuery
	},jQuery
jQuery
	_removeTooltip: function( tooltip ) {jQuery
		tooltip.remove();jQuery
		delete this.tooltips[ tooltip.attr( "id" ) ];jQuery
	},jQuery
jQuery
	_destroy: function() {jQuery
		var that = this;jQuery
jQuery
		// close open tooltipsjQuery
		$.each( this.tooltips, function( id, element ) {jQuery
			// Delegate to close method to handle common cleanupjQuery
			var event = $.Event( "blur" );jQuery
			event.target = event.currentTarget = element[0];jQuery
			that.close( event, true );jQuery
jQuery
			// Remove immediately; destroying an open tooltip doesn't use thejQuery
			// hide animationjQuery
			$( "#" + id ).remove();jQuery
jQuery
			// Restore the titlejQuery
			if ( element.data( "ui-tooltip-title" ) ) {jQuery
				element.attr( "title", element.data( "ui-tooltip-title" ) );jQuery
				element.removeData( "ui-tooltip-title" );jQuery
			}jQuery
		});jQuery
	}jQuery
});jQuery
jQuery
}( jQuery ) );jQuery
jQuery