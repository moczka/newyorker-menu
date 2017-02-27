window.onload = function(){

    var json_data = $.get('json/page1.json'),
        container = $('#app'),
        data,
        templates = {
          col: _.template($('#colTemplate').html()),
          row: _.template($('#rowTemplate').html()),
          category: _.template($('#categoryTemplate').html()),
          meal: _.template($('#mealTemplate').html())
        },
        currentPage = 0,
        pagesJSON = ["json/page1.json", "json/page2.json", "json/page3.json", "json/page4.json"],
        nav_controls = $('.controls');

        nav_controls.on('click', handleControls);

        json_data.then(function(){
          data = json_data.responseJSON;
          attach();
        });

        var $banner = $('.top-banner'),
            $navBar = $('.page-nav');

            $banner.delegate('img', 'click', handleBanner);


        function handleBanner(e){

          var $el = $(this);

          if($el.hasClass('lady-liberty')){
            $navBar.toggleClass('hidden');
            console.log('libery clicked');
          }else{
            $('.footer-warning').toggleClass('hidden');
            console.log('Brooklyn bridge was clicked');
          }


        }

        function handleControls(e){

          e.preventDefault();

          var target = e.target;

          if(target.innerHTML === "Next"){

            currentPage++;
            json_data = $.get(pagesJSON[currentPage % pagesJSON.length]);
            json_data.then(function(){
              data = json_data.responseJSON;
              attach();
              console.log(data);
            });

          }else if(target.innerHTML === "Back"){

            currentPage--;
            currentPage = (currentPage < 0)? 0: currentPage;
            json_data = $.get(pagesJSON[currentPage % pagesJSON.length]);
            json_data.then(function(){
              data = json_data.responseJSON;
              attach();
              console.log(data);
            });

          }else{
            window.print();
          }


        }


        function attach(){

          container.empty();

            _.each(data.rows, function(rowData){

              var $rowHTML = $(templates.row({row: {className: rowData.className}}));

              console.log({row: {className: rowData.className}}, 'HERE IS THE COL');

              _.each(rowData.cols, function(colData){

                var $colHTML = $(templates.col({col: colData}));
                    $rowHTML.find('.container').append($colHTML);

                _.each(colData.categories, function(categoryData){

                  var $categoryHTML = $(templates.category(categoryData));
                      $colHTML.find('.category-container').append($categoryHTML);

                  _.each(categoryData.category.meals, function(mealData){

                    var $mealHTML = $(templates.meal({meal: mealData}));
                        $categoryHTML.find('.category-list').append($mealHTML);


                  });


                });



              });

              container.append($rowHTML);

            });




        }


};
