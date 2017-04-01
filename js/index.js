    $(document).ready(function() {
      // init Isotope
      var $grid = $('div#container').isotope({
        itemSelector: '.character',
        layoutMode: 'masonry',
        masonry: {
          columnWidth: 50,
        },
        getSortData: {
          name: '.character-name',
        }
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

    // flatten object by concatting values
    function concatValues(obj) {
      var value = '';
      for (var prop in obj) {
        value += obj[prop];
      }
      return value;
    }