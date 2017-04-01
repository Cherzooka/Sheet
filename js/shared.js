      (function($) {
        $(document).ready(function() {
          $("[title]").style_my_tooltips({
            tip_follows_cursor: true,
            tip_delay_time: 90,
            tip_fade_speed: 600,
            attribute: "title"
          });
        });
      })(jQuery);
    
      $(document).ready(function(){
        $(".equip").click(function(){
          $(".equipment").toggle("slow");
        });
      });
      
          $(document).ready(function() {
      // init Isotope
      var $grid = $('div#inventory').imagesLoaded( function() {
      $grid.isotope({
        itemSelector: '.item',
        layoutMode: 'masonry',
        percentPosition: true,
        masonry: {
          columnWidth: '.item'
        },
        getSortData: {
          name: '.item-name',
          count: '.item-number',
          weight: '.item-weight',
          value: '.item-value',
          type: '.item-type'
        }
      });
      });
      
          // sort items on button click
    $('.sort-by-button-group').on( 'click', 'button', function() {
      var sortByValue = $(this).attr('data-sort-by');
      $grid.isotope({ sortBy: sortByValue });
    });
      
      // store filter for each group
      var filters = {};

      $('.filters').on('click', '.button', function() {
        var $this = $(this);
        // get group key
        var $buttonGroup = $this.parents('.button-group');
        var filterGroup = $buttonGroup.attr('data-filter-group');
        // set filter for group
        filters[filterGroup] = $this.attr('data-filter');
        // combine filters
        var filterValue = concatValues(filters);
        // set filter for Isotope
        $grid.isotope({
          filter: filterValue
        });
      });

      // change is-checked class on buttons
      $('.button-group').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $(this).addClass('is-checked');
        });
      });
    });
    
    // layout Isotope after each image loads
    var $grid = $('div#inventory');
      $grid.imagesLoaded().progress( function() {
      $grid.isotope('layout');
    });

    // flatten object by concatting values
    function concatValues(obj) {
      var value = '';
      for (var prop in obj) {
        value += obj[prop];
      }
      return value;
    }