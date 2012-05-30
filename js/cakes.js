    Cake = Backbone.Model.extend({
        width: 0,
        height: 0,
        validate: function(attrs) {
            if (!parseFloat(attrs.width)) {
                return "NAN";
            }
            if (!parseFloat(attrs.height)) {
                return "NAN";
            }
        },
        radius: function() {
            return this.get('width')/2
        },
        eggs: function() {
            return eggs_for_cake(this.radius(), this.get('height'))
        },
        toTIM: function() {
            return {
                'height' : this.get('height'),
                'width' : this.get('width'),
                'eggs': this.eggs()
            }
        }
      });
    
    
      CakeList = Backbone.Collection.extend({
          model: Cake,
          localStorage: new Store("cakes_store"),
          total_eggs: function() {

              total = this.reduce(function(total, model) { 
                    console.debug(model)
                  return total + parseInt(model.eggs())}, 0
              )
              // Projects.get(project_id).set({total : total})
              return total
          }
    });
    
    window.cakes = new CakeList;
    
    window.CakeView = Backbone.View.extend({
        tagName:  "div",
        className: 'row',
        events: {
          "dblclick .view"  : "edit",
          "click .save"  : "save",
        },

        initialize: function() {
          this.model.bind('change', this.render, this);
          // this.model.bind('destroy', this.remove, this);
          
        },

        
        edit: function(){
            console.debug(this)
            $('#edit').html(tim('cake_edit', this.model.toTIM()))
            $('#edit .save').bind('click', this.save(this))
        },
        save: function() {
            console.debug('Foo')
            return false;
        },
        render: function() {
          this.$el.html(tim('cake', this.model.toTIM()));
          // this.$el.toggleClass('done', this.model.get('done'));
          // this.input = this.$('.edit');
          this.$el.find('.edit').bind('click', this.edit(this))
          return this;
        },
        
    });
    
    // CakeView = new CakeView;
    
    window.AppView = Backbone.View.extend({
        tagName: 'form',
        className: 'add_cake',
        initialize: function(model) {
            _.bindAll(this, 'render');

            // this.model.view = this;
            
            cakes.bind('add', this.addOne, this);
            cakes.bind('reset', this.addAll, this);
            cakes.bind('all', this.render, this);
                      
            cakes.fetch()
            this.render()

        },
        events: {
          "click .add"  : "addForm",
        },
        render: function() {
            
            $(this.el).html(tim('new_cake_form', {}));
            $('#total').html(tim('total_cakes', {'total' : cakes.total_eggs()}))
            
        },
        addForm: function() {
            $('.add').html
        }
        addOne: function(cake) {
          var view = new CakeView({model: cake});
          $("#cakes").append(view.render().el);
        },
        addAll: function() {
          cakes.each(this.addOne);
        },
        
        
    });
    
    
    var App = new AppView