     $(document).ready(function() {
       $(".equip").click(function() {
         $(".equipment").toggle("slow");
       });

       $(".ritual").attr("title", "Certain spells have a special tag: ritual. Such a spell can be cast following the normal rules for spellcasting, or the spell can be cast as a ritual. The ritual version of a spell takes 10 minutes longer to cast than normal.  It also doesnt expend a spell slot, which means the ritual version of a spell can't be cast at a higher level. To cast a spell as a ritual, a spell caster must have a feature that grants the ability to do so. The cleric and the druid, for example, have such a feature. The caster must also have the spell prepared or on their list of spells known, unless the character's ritual feature specifies otherwise, as the wizard's does.");
       $(".versatile").attr("title", "This weapon can be used with one or two hands. A damage value in paratheses appears with the property- the damage when the weapon is used with two hands to make a melee attack.");
       $(".light").attr("title", "A light weapon is small and easy to handle, making it ideal for use when fighting with two weapons.");
       $(".thrown").attr("title", "If a weapon has the thrown property, you can throw the weapon to make a ranged attack. If the weapon is a melee weapon, you use the same ability modifier for that attack roll and damage roll that you would use for a melee attack with the weapon. For example, if you throw a handaxe, you use your Strength, but if you throw a dagger, you can use either your Strength or your Dexterity, since the dagger has the finesse property.");
       $(".range").attr("title", "A weapon that can be used to make a ranged attack has a range in parenthesis after the ammunition or thrown property. The range lists two numbers. The first is the weapon's normal range in feet, and the second indicated the weapon's long range. When attacking a target beyond normal range, you have disadvantage You can't attack a target beyond the weapon's long range.");
       $(".twohanded").attr("title", "This weapon requires two hands when you attack with it.");
       $(".finesse").attr("title", "When making an attack with a finesse weapon, you use your choice of your Strength or Dexterity modifier for the attack and damage rolls. You must use the same modifier for both rolls.");
       $(".musical").attr("title", "If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability check you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency.");
       $(".gaming").attr("title", "This item encompasses a wide range of game pieces, including dice and decks of cards (for games such as Three-Dragon Ante). If you are proficient with a gaming set, you can add your proficiency bonus to ability checks you make to play a game with that set. Each type of gaming set requires a separate proficiency.");
       $(".artisan").attr("title", "These special tools include items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisans tools requires a separate proficiency.");
       $(".concentration").attr("title", "Some spells require you to maintain concentration in order to keep their magic active. If you lose concentration, such a spell ends. Normal activities, such as moving or attacking, doesn't interfere with concentration. The following factors can break concentration: Casting another spell that requires concentration, taking damage, being incapacitated or killed.");
       $("#aggressive").attr("title", "Some might think Aggressive people provoke fights and cause trouble, while others might admire their ability to take charge, make decisions and not be pushed around");
       $("#benevolent").attr("title", "People may view Benevolent people as charitable and kind, but others might see them as weak or easy to use for themselves.");
       $("#clever").attr("title", "A Clever person might be regarded as someone sarcastic and amusing, but some might see them as foolish and not to be taken seriously.");
       $("#cruel").attr("title", "While generally dislikes by most people for merciless or brutal attitudes, some might respect (or fear) a Cruel person.");
       $("#deceptive").attr("title", "");
       $("#diplomatic").attr("title", "");
       $("#honest").attr("title", "");
       $("#passionate").attr("title", "");
       $("#rational").attr("title", "");
       $("#stoic").attr("title", "");

       $("[title]").style_my_tooltips({
         tip_follows_cursor: true,
         tip_delay_time: 90,
         tip_fade_speed: 600,
         attribute: "title"
       });

       // init Isotope
       var $grid = $('.item-container').imagesLoaded(function() {
         $grid.isotope({
           itemSelector: '.item',
           layoutMode: 'masonry',
           stamp: '.stamp',
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
       
            // init Isotope
     var $grid2 = $('.spells').imagesLoaded(function() {
       $grid2.isotope({
         itemSelector: '.spell',
         layoutMode: 'masonry',
         percentPosition: true,
         masonry: {
           columnWidth: '.spell'
         },
       });
     });

       $('#sorts').on('click', 'button', function() {
         /* Get the element name to sort */
         var sortValue = $(this).attr('data-sort-by');
         /* Get the sorting direction: asc||desc */
         var sortDirection = $(this).attr('data-sort-direction');
         /* convert it to a boolean */
         sortDirection = sortDirection == 'asc';
         /* pass it to isotope */
         $grid.isotope({
           sortBy: sortValue,
           sortAscending: sortDirection
         });
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
       
       $('#spell-filters').on('click', '.button', function() {
         var $this = $(this);
         // get group key
         var $buttonGroup = $this.parents('.button-group');
         var filterGroup = $buttonGroup.attr('data-filter-group');
         // set filter for group
         filters[filterGroup] = $this.attr('data-filter');
         // combine filters
         var filterValue = concatValues(filters);
         // set filter for Isotope
         $grid2.isotope({
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