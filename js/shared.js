     $(document).ready(function() {
       $(".equip").click(function() {
         $(".equipment").toggle("slow");
       });

       $("[title]").style_my_tooltips({
         tip_follows_cursor: true,
         tip_delay_time: 90,
         tip_fade_speed: 600,
         attribute: "title"
       });

       // init Isotope
       var $grid = $('div#inventory').imagesLoaded(function() {
         $grid.isotope({
           itemSelector: '.item',
           layoutMode: 'masonry',
           percentPosition: true,
           masonry: {
             columnWidth: '.item'
           },
           getSortData: {
             name: '.item-name',
             count: '.item-number parseInt',
             weight: '.item-weight parseInt',
             value: '.item-value parseInt',
             type: '.item-type'
           },
           sortAscending: {
            name: true,
            count: false,
            weight: false,
            value: false,
          },
           sortBy: ['name', 'weight']
         });
       });
       
         $('#sorts').on( 'click', 'button', function() {
           /* Get the element name to sort */
           var sortValue = $(this).attr('data-sort-by');
           /* Get the sorting direction: asc||desc */
           var sortDirection = $(this).attr('data-sort-direction');
           /* convert it to a boolean */
           sortDirection = sortDirection == 'asc';
           /* pass it to isotope */
           $grid.isotope({ sortBy: sortValue, sortAscending: sortDirection });
         });

       // bind sort button click
       $('#sorts').on('click', 'button', function() {
         var sortByValue = $(this).attr('data-sort-by');
         $grid.isotope({
           sortBy: sortByValue
         });
       });

       // store filter for each group
       var filters = {};

       $('#filters').on('click', '.button', function() {
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

       // flatten object by concatting values
       function concatValues(obj) {
         var value = '';
         for (var prop in obj) {
           value += obj[prop];
         }
         return value;
       }
     });