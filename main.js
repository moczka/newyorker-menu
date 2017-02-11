window.onload = function(){

    var menu = {
      items: []
    };

    var myBody = $('.menu').each(function(item, index){

      var $el = $(this),
          $elChildren = $el.children();

          var categoryDescription = $elChildren.filter('p').html(),
              categoryName = $elChildren.filter('header').children('h2').html(),
              meals = [],
              images = [],
              menuNote = {};

              //get the information for each meal.
              $elChildren.filter('.meal-list').children().each(function(item){

                  var $li = $(this),
                      meal = {
                        title : $li.find('h3').html(),
                        price : $li.find('span').html(),
                        description : $li.find('p').html()
                      };

                  meals.push(meal);

              });

              //get images
              $elChildren.filter('img').each(function(index){

                //add only images that exist
                var image = $(this);

                  if(image){
                    images.push(image.attr('src'));
                  }else{
                    return;
                  }

              });

              $elChildren.filter('.menu-note').each(function(item){

                  var $el = $(this);

                  menuNote = {
                    title : $el.children('h3').html(),
                    description : $el.children('p').html()
                  };

              });


              var meal = {
                  category : categoryName? categoryName : "",
                  meals : meals.length? meals : [],
                  images: images.length? images : [],
                  note: menuNote? menuNote : {}
              };


              menu.items.push(meal);

              console.log(meal);


    });

    console.log(JSON.stringify(menu));

    console.log(menu);

};
