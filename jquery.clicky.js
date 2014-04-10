/*!
* @license
* jquery.clicky.js | v0.1
* Copyright (c) 2014 Vincent Carney
* Licensed under the ISC license.
*/

;(function ( $, window, document, undefined ) {

  "use strict";

  var defaults = {
    categories: ['internal', 'external', 'download', 'email', 'telephone'],
    categoryName: 'link:',
    action: 'click',
    downloadFileTypes: /\.(zip|exe|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i,
    disableClass: 'noclicky'
  };

  /**
  * Plugin
  */

  $.clicky = function(options) {

    options = $.extend({}, defaults, options);

    /**
     * Functions
     */
    function categoryEnabled(category) {
      if ($.inArray(category, options.categories) > -1) {
        return true;
      }
      return false;
    }

    $('body').on('click.clicky', 'a:not(.' + options.disableClass + ')', function(event) {
      /** Bail if no G Analytics **/
      if (typeof(ga) == 'undefined' || !ga.hasOwnProperty('loaded') || !ga.loaded) {
        return true; 
      }

      var el = $(this);
      var track = true;
      var href = (typeof(el.attr('href')) != 'undefined' ) ? el.attr('href') : '';
      var internalLink = href.match(document.domain);

      if (!href.match(/^javascript:/i)) {
        var elEvent = []; 
        elEvent.value = 1, elEvent.non_i = false;

        if (href.match(/^mailto\:/i) && categoryEnabled('email')) {
          elEvent.category = options.categoryName + 'email';
          elEvent.action = options.action;
          elEvent.label = href.replace(/^mailto\:/i, '');
          elEvent.loc = href;
        }
        else if (href.match(options.downloadFileTypes)  && categoryEnabled('download')) {
          elEvent.category = options.categoryName + 'download';
          elEvent.action = options.action;
          elEvent.label = href.replace(/ /g,'-');
          elEvent.loc = href;
        }
        else if (href.match(/^tel\:/i) && categoryEnabled('telephone')) {
          elEvent.category = options.categoryName + 'telephone';
          elEvent.action = options.action;
          elEvent.label = href.replace(/^tel\:/i, '');
          elEvent.loc = href;
        }
        else if (href.match(/^https?\:/i) && categoryEnabled('external') && !internalLink) {
          elEvent.category = options.categoryName + 'external';
          elEvent.action = options.action;
          elEvent.label = href.replace(/^https?\:\/\//i, '');
          elEvent.non_i = true;
          elEvent.loc = href;
        }
        else if (categoryEnabled('internal')) {
          elEvent.category = options.categoryName + 'internal';
          elEvent.action = options.action;
          elEvent.label = href.replace(/^http?\:\/\//i, '');
          elEvent.loc = href;
        }
        else track = false;

        if (track) {
          event.preventDefault();

          ga('send','event', elEvent.category.toLowerCase(),elEvent.action.toLowerCase(),elEvent.label.toLowerCase(),elEvent.value,{
            'nonInteraction': elEvent.non_i,
            'hitCallback': function() { 
              $('body').off('click.clicky', 'a:not(.' + options.disableClass + ')');
              if (el.attr('target') != '_blank') {
                el.simulate('click');
              }
            },
            'page': document.location.pathname
          });

          if (el.attr('target') == '_blank') {
            window.open(href, '_blank');
          }
        }
      }
    });

  };
})( jQuery, window, document );
