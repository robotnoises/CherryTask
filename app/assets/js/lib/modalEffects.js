/**
 * modalEffects.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

/* Edited by David Nichols */

(function(window) {
  
  var attachedTargets = [];
  var attachedClosers = [];
  
  var hasAttachment = function (el, arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (el === arr[i]) return true;
    }
    return false;
  };
  
  function init() {
	var overlay = document.querySelector( '.modal-overlay' );

	[].slice.call( document.querySelectorAll( '.modal-trigger' ) ).forEach( function( el, i ) {

	var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
	  close = overlay.querySelector( '.modal-close' ),
	  body = document.getElementsByTagName('body')[0];

			function removeModal( hasPerspective ) {
				Classie.remove( modal, 'modal-show' );
				Classie.remove( body, 'no-scroll');
				
				if( hasPerspective ) {
					Classie.remove( document.documentElement, 'modal-perspective' );
				}
			}

			function removeModalHandler() {
				removeModal( Classie.has( el, 'modal-setperspective' ) ); 
			}
      
      function targetClickEventHandler(ev) {
        Classie.add( modal, 'modal-show' );

				if( Classie.has( el, 'modal-setperspective' ) ) {
					setTimeout( function() {
						Classie.add( document.documentElement, 'modal-perspective' );
					}, 25 );
				}
				
				Classie.add( body, 'no-scroll');
      }
      
      function closeClickEventHandler(ev) {
        ev.stopPropagation();
				removeModalHandler();
      }
      
		  if (!hasAttachment(el, attachedTargets)) {
        el.addEventListener('click', targetClickEventHandler);
        attachedTargets.push(el);
      }
      
      if (!hasAttachment(close, attachedClosers)) {
        close.addEventListener('click', closeClickEventHandler);
        attachedClosers.push(close);  
      }
		});
  }

	init();
  
  window.ModalEffects = init;

})(window);
