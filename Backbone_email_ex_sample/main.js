$(function(){
  var loggedUser= null;
  /*users model */
  var AvailableUsers = Backbone.Model.extend({
    urlRoot:"users.json"
  });
  var users = new AvailableUsers();
  
  var HeaderView = Backbone.View.extend({
    el:"#header",
    template:_.template($("#appheader-tpl").html()),
    events:{
      
    },
    initialize:function(){
      this.render();
    },
    render:function(){
      this.$el.html(this.template);
    }
    
  });
  
  var hv = new HeaderView();
  
  var LoginView = Backbone.View.extend({
    el:"#container",
    template:_.template($("#login-tpl").html()),
    events:{
      "click #loginbtn":"checkLogin"
      
    },
    initialize:function(){
      this.render();
    },
    render:function(){
      this.$el.html(this.template);
    },
    checkLogin : function(){
      var userData=null,
      uname = $("#email").val(),
      pwd = $("#pwd").val();
      
      if(uname.trim().length > 0 &&  pwd.trim().length > 0){
        users.fetch({
          success:function(data){
          userData = data.toJSON().users;
          var userFlag = false;
          for(var i in userData){
            if(userData[i].name === uname ){
                userFlag = true;
                if(userData[i].password === pwd){
                  loggedUser = userData[i];
                  ib = new InBoxView();
                  $("#loggedinuser").html(uname);
                  $("#usernamedisplay").show();
                  break;
                }else{
                  alert("Given password is not matched with given username");
                }
            }
          }
          
          if(!userFlag){
            alert("Given username is wrong");
          }
          
        }
       });
      }else{
        alert("username and Password should not be empty");
      }
      
    }
    
  });
  
  var lv = new LoginView({model:users});
  
  var InBoxModel = Backbone.Model.extend({
    
    urlRoot: "inbox.json"
    
  });
  ibmodel = new InBoxModel();
  
  
  var InBoxView = Backbone.View.extend({
    el:"#container",
    template:_.template($("#ibtpl").html()),
    events:{
      "click div.media":"showDetais"
    },
    initialize:function(){
      var _this = this;
      _this.inboxData = null;
      ibmodel.fetch({
        success:function(data){
          _this.inboxData = data;
          _this.render();
        }
      });
      
    },
    render:function(){
      this.$el.html(this.template({data:this.inboxData.toJSON().inboxitems}));
    },
    showDetais :function(event){
      var subtxt = $(event.currentTarget).find(".subjtext").text();
      
     var reqObj = jQuery.grep(this.inboxData.toJSON().inboxitems, function( a ) {
         if(a.subj=== subtxt)
            return a;
      });
      console.log(reqObj);
             
      var dv = new DetailView({model:$.extend(reqObj[0],loggedUser)});
      dv.render();
    }
    
  });
  
  //var hv = new HeaderView();
  
  var DetailView  = Backbone.View.extend({
   el:"#container",
    template:_.template($("#detailtpl").html()),
    events:{
      "click .backbutton":"backInbox"
    },
    
    initialize:function(){
    },
    render:function(inboxData){
      this.$el.html(this.template({detalis:this.model}));
    },
    backInbox:function(){
      ib.render();
    }
  });
  
  
  
  
  
  
  
  
});