//bubble item for use in examples
model.bubbleItem = [
  {
      	element : "div",
      	margin : "10px",
      	width : "40px",
      	height : "40px",
      	borderRadius : "50%",
      	background : "rgb(200, 238, 255)",
      	border : "2px solid rgb(170, 238, 255)"
  }
];

//the target template that gets edited
model.collapsibleContent = [
    {
     element : "collapsible",
     width : "100%",
     float : "left",
     title : "This test gets replaced by a template.",
     nest : model.bubbleItem
   }
];

//collapsible component used in a template example in the model
model.collapsibleComponent = [
  {
      	 element : "collapsible",
      	 title : "collapsible 1",
      	 iconClass : "fa fa-star",
         nest: function(element) {
           var template = nest.return.template(model.collapsibleContent);
           template[0]['title'] = "this is a clone";
           return template;
         }
  }
];

//collapsible that shows how to reference a model
model.combinationItem = [
    {
  	element : "collapsible",
  	title : "collapsible 1",
  	iconClass : "fa fa-star",
  	nest : [
      model.bubbleItem[0],
      model.bubbleItem[0]
    ]
  }
];

//primary model
model.home = [
    {
      element : "style",
      type : "text/css",
      text : ".first-text {padding:15px;box-sizing:border-box;float:left;}"
    },
    {
      element : "div",
      comment : "div to hold the two collapsibles.",
      maxWidth : "808px",
      margin : "0 auto",
      paddingTop : "60px",
      nest : [
        {
          element : "div",
          width : "303px",
          paddingBottom : "60px",
          nest : [
            {
              element : "img",
              width : "303px",
              src : "img/beach-logo.svg"
            }
          ]
        },
        {
          element : "tab",
          iconClass : "fa fa-circle",
          maxHeight : "505px",
          group : "home-tabs",
          title : "Overview",
          render : function(element) {
            console.log('tab 1 rendered');
          },
          nest : [
            {
              element : "span",
              class : "span-text",
              text : "The beach.js library can best be described as a JSON based javascript element library. Let's take a look at an example of the syntax for a W3C standard HTML element in beach markup."
            },
            {
              element : "pre",
              nest : [
                {
                  element : "span",
                  class : "code",
                  text : "bubbleItem : " + JSON.stringify(model.bubbleItem, null, "\t")
                }
              ]
            },
            {
              element : "span",
              class : "span-text",
              text : "The above markup produces the following result : "
            },
            {
              element : "pre",
              nest : model.bubbleItem
            },
            {
              element : "span",
              class : "span-text",
              text : `While this result is what we want, it took a bit of work just to make a simple circle shaped div element.  We can speed this up by making a dedicated css specification for the element and using the "class" property. Next let's make an element from the beach component library (nest.elements.js).`
            },
            {
              element : "pre",
              text : "collapsibleComponent : " + JSON.stringify(model.collapsibleComponent, null, "\t")
            },
            {
              element : "span",
              class : "span-text",
              text : "The above markup produces the following result ( click to open the collapsible ) : "
            },
            {
              element : "pre",
              nest : model.collapsibleComponent
            },
            {
              element : "span",
              class : "span-text",
              text : "Ok, now we have something pretty impressive. The collapsible was created simply by using \"element\" : \"collapsible\" in the markup and the \"nest\" objects are the inner content of the collapsible. This is pretty good, but what if we want to take our original W3C bubble element and put it inside of the collapsible? If you look at the previous W3C HTML example, you'll notice that the object is assigned as the variable \"bubbleItem\". Check out the following markup :"
            },
            {
              element : "pre",
              html : "<span class=code>{\r\n\t\"element\" : \"collapsible\",\r\n\t\"display-title\" : \"collapsible 1\",\r\n\t\"icon\" : \"fa-star\",\r\n\t\"nest\" : [\r\n\t\tmodel.bubbleItem[0],\r\n\t\tmodel.bubbleItem[0]\r\n\t]\r\n}</span>"
            },
            {
              element : "span",
              class : "span-text",
              text : "The above markup produces the following : "
            },
            {
              element : "pre",
              nest : model.combinationItem
            },
            {
              element : "span",
              class : "span-text",
              html : "We've used the original bubble item as a reference and we're able to use it as many times as we want and at any location in any model. This is a simple example of how the beach language simplifies objects and offers the flexibility of reusability through your projects.  // ---> Cover templating <------ Check out the <a href=#/examples>Examples</a> section to learn more."
            }
          ]
        },
        {
          element : "tab",
          iconClass : "fa fa-list",
          group : "home-tabs",
          title : "Properties",
          select : function(element) {
            console.log('tab 2 selected');
          },
          render : function(element) {
            console.log("tab 2 rendered complete");
          },
          nest : [
            {
              element : "collapsible",
              title : "collapsible 2",
              active : true,
              iconClass : "fa fa-star",
              close : function(element) {
                console.log(element);
              },
              render : function(element) {
                element.inner.nest(model.combinationItem)
              },
              nest : [
                {
                  element : "collapsible",
                  title : "collapsible 3",
                  iconClass : "fa fa-refresh",
                  nest : [
                    {
                      element : "span",
                      nest : model.bubbleItem,
                      html : "<p style='width:100%;float:left'>The circle is defined as a separate model and called as a variable.</p>",
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          element : "tab",
          title : "Extensibility",
          id : "extensibility-tab",
          iconClass : "fa fa-plus",
          group : "home-tabs",
          html : "beach.js was made for people to be able to extend it as a library and make their own custom elements. A beach element can use up to 4 aspects : an Element Definition, Properties Definition, Actions ${{testQuery.id}} Definition, and a Render Definition. You only need to create an Element Definition in order to return a component.",
          fetch : function(element) {

            let options = {
              id : 'testQuery',
              redundancy : true,
              triggers : ['render','click'],
              monitor: true,
              track : true //or array of what to track
            };

            fetch('https://my-json-server.typicode.com/typicode/demo/comments')
              .then(
                function(response) {
                  if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                  }

                  // Examine the text in the response
                  response.json().then(function(data) {
                    console.log(data);
                  });
                }
              )
              .catch(function(err) {
                console.log('Fetch Error :-S', err);
              });

              return options;

          }
        }

      ]
    },
    {
      element : "script",
      type : "text/javascript",
      text : "console.log('complete');"
    }
  ];
