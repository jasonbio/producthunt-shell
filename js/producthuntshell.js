$(function() {
  var token = false;
  var usertoken = false;
  var auth_user = "guest";
  var posts = [];
  var pagination = 0;
  var pagination_next = 0;
  var comments = [];
  var discussions = [];
  var content = [];
  var fullnames = [];
  var user = [];
  var cmd_state = [];
  var cs = 0;
  var ls_state = "";
  var lsc = 0;
  var pagination_id = [];
  var pagination_older = "";
  var pagination_newer = "";
  var newer_id = "";
  var sort = "";
  var morelink = "";
  var json_base = "";
  var parent_posts = [];
  var parent_name = "";
  var user_id_scope = "";
  var days = 0;
  var pwd = "/";
  var success = false;
  var c = 0;
  var r = 0;
  var s = 0;
  var u = 0;
  var anim = false;
  var showimages = false;
  var windowheight = $(window.top).height();
  var limit = "per_page="+(Math.round(windowheight / 54)-3)+"&";
  var limitint = "auto (" + (Math.round(windowheight / 54)-3) + ")";
  var limitnum = (Math.round(windowheight / 54)-3);
  var fixedlimitnum = limitnum - 5;
  var autobase = ['help','about','clear','settings','login','notifications','user','collection','comments','content','view','collections','newer','older','all','list'];
  var autocomplete = ['help','about','clear','settings','login','notifications','user','collection','comments','content','view','collections','newer','older','all','list'];
  var converter = new showdown.Converter();

  function typed(finish_typing) {
    return function(term, message, delay, finish) {
      anim = true;
      var prompt = term.get_prompt();
      var c = 0;
      if (message.length > 0) {
        var interval = setInterval(function() {
          term.insert(message[c++]);
          if (c == message.length) {
            clearInterval(interval);
            setTimeout(function() {
              finish_typing(term, message, prompt);
              anim = false
              finish && finish();
            }, delay);
          }
        }, delay);
      }
    };
  }

  var typed_prompt = typed(function(term, message, prompt) {
    term.set_command('');
    term.set_prompt(message + ' ');
  });

  var typed_message = typed(function(term, message, prompt) {
      term.set_command('');
      term.echo(message)
      term.set_prompt(prompt);
  });

  function greetings(term) {
    term.echo("<div id='greeting'><div id='ascii'>&nbsp;________&nbsp;&nbsp;________&nbsp;&nbsp;________&nbsp;&nbsp;________&nbsp;&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;________&nbsp;_________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;________&nbsp;&nbsp;&nbsp;_________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;________&nbsp;&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;_______&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />|\\&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;\\|\\&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;\\|\\&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;\\|\\&nbsp;&nbsp;&nbsp;___&nbsp;\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;&nbsp;____\\\\___&nbsp;&nbsp;&nbsp;___\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;\\|\\___&nbsp;&nbsp;&nbsp;___\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|\\&nbsp;&nbsp;&nbsp;____\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;___&nbsp;\\&nbsp;|\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />\\&nbsp;\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\_|\\&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\___\\|___&nbsp;\\&nbsp;&nbsp;\\_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\&nbsp;\\&nbsp;&nbsp;\\|___&nbsp;\\&nbsp;&nbsp;\\_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\___|\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;&nbsp;__/|\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />&nbsp;\\&nbsp;\\&nbsp;&nbsp;&nbsp;____\\&nbsp;\\&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;_\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;\\\\&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\_____&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\_|/_\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\___|\\&nbsp;\\&nbsp;&nbsp;\\\\&nbsp;&nbsp;\\\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\_\\\\&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\____&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\|____|\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\_|\\&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\____\\&nbsp;\\&nbsp;&nbsp;\\____&nbsp;&nbsp;<br />&nbsp;&nbsp;&nbsp;\\&nbsp;\\__\\&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\__\\\\&nbsp;_\\\\&nbsp;\\_______\\&nbsp;\\_______\\&nbsp;\\_______\\&nbsp;\\_______\\&nbsp;&nbsp;\\&nbsp;\\__\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\__\\&nbsp;\\__\\&nbsp;\\_______\\&nbsp;\\__\\\\&nbsp;\\__\\&nbsp;&nbsp;&nbsp;\\&nbsp;\\__\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;____\\_\\&nbsp;&nbsp;\\&nbsp;\\__\\&nbsp;\\__\\&nbsp;\\_______\\&nbsp;\\_______\\&nbsp;\\_______\\<br />&nbsp;&nbsp;&nbsp;&nbsp;\\|__|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\|__|\\|__|\\|_______|\\|_______|\\|_______|\\|_______|&nbsp;&nbsp;&nbsp;\\|__|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\|__|\\|__|\\|_______|\\|__|&nbsp;\\|__|&nbsp;&nbsp;&nbsp;&nbsp;\\|__|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|\\_________\\|__|\\|__|\\|_______|\\|_______|\\|_______|<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\|_________|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><p/>product hunt shell: web based shell emulator for browsing product hunt via command line <br />by <a href='http://jasonb.io/' target='_blank'>jason botello</a> - <a href='https://github.com/jasonbio/producthunt-shell' target='_blank'>fork this project on GitHub</a> - also available for reddit: <a href='https://redditshell.com/' style='color: #2FD0C3!important;'>reddit shell</a><p /><strong>list</strong> list today's featured posts<br><strong>list [older|newer]</strong> list the previous or next day's featured posts<br><strong>list all [older|newer]</strong> list all posts and navigate through results<br><strong>collections</strong> list recent featured collections<br><strong>collections [older|newer]</strong> navigate recent featured collections<br><strong>collections all</strong> list all recent collections<br><strong>collections all [older|newer]</strong> navigate all recent collections<br><strong>view content [index]</strong> open the post content URL in a new window<br><strong>view comments [index]</strong> view the comment thread for the specified post index<br /><strong>view comments [index] [older|newer]</strong> navigate through the comment thread for the specified post index<br /><strong>view collection [index]</strong> view the posts in the specified collection<br /><strong>user [username]</strong> view the information on the specified user<br /><strong>user [username] votes [older|newer]</strong> view posts that the specified user voted up and navigate results<br /><strong>user [username] posts [older|newer]</strong> view posts that the specified user submitted and navigate results<br /><strong>user [username] products [older|newer]</strong> view products that the specified user made and navigate results<br /><strong>login</strong> redirect to product hunt for user authorization<br /><strong>logout</strong> de-authenticates the current logged in user<br /><strong>notifications [older|newer]</strong> shows notifications the current logged in user<br /><strong>settings</strong> list current settings<br /><strong>set img [on|off]</strong> set inline image display on or off when listing posts<br /><strong>set limit [auto|1-50]</strong> set the limit on results fetched per query<br /><p/></div>", {raw:true});
  }

  function about(term) {
    term.echo("<div style='width:100%;float: left;text-align: left;margin-top: 10px;padding-bottom: 10px;' id='greeting'><div id='ascii'>&nbsp;________&nbsp;&nbsp;________&nbsp;&nbsp;________&nbsp;&nbsp;________&nbsp;&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;________&nbsp;_________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;________&nbsp;&nbsp;&nbsp;_________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;________&nbsp;&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;_______&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />|\\&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;\\|\\&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;\\|\\&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;\\|\\&nbsp;&nbsp;&nbsp;___&nbsp;\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;&nbsp;____\\\\___&nbsp;&nbsp;&nbsp;___\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;\\|\\___&nbsp;&nbsp;&nbsp;___\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|\\&nbsp;&nbsp;&nbsp;____\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;___&nbsp;\\&nbsp;|\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />\\&nbsp;\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\|\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\_|\\&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\___\\|___&nbsp;\\&nbsp;&nbsp;\\_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\&nbsp;\\&nbsp;&nbsp;\\|___&nbsp;\\&nbsp;&nbsp;\\_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\___|\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;&nbsp;__/|\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />&nbsp;\\&nbsp;\\&nbsp;&nbsp;&nbsp;____\\&nbsp;\\&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;_\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;\\\\&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\_____&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\_|/_\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\___|\\&nbsp;\\&nbsp;&nbsp;\\\\&nbsp;&nbsp;\\\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\_\\\\&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\____&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\|____|\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\_|\\&nbsp;\\&nbsp;\\&nbsp;&nbsp;\\____\\&nbsp;\\&nbsp;&nbsp;\\____&nbsp;&nbsp;<br />&nbsp;&nbsp;&nbsp;\\&nbsp;\\__\\&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\__\\\\&nbsp;_\\\\&nbsp;\\_______\\&nbsp;\\_______\\&nbsp;\\_______\\&nbsp;\\_______\\&nbsp;&nbsp;\\&nbsp;\\__\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;\\__\\&nbsp;\\__\\&nbsp;\\_______\\&nbsp;\\__\\\\&nbsp;\\__\\&nbsp;&nbsp;&nbsp;\\&nbsp;\\__\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;____\\_\\&nbsp;&nbsp;\\&nbsp;\\__\\&nbsp;\\__\\&nbsp;\\_______\\&nbsp;\\_______\\&nbsp;\\_______\\<br />&nbsp;&nbsp;&nbsp;&nbsp;\\|__|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\|__|\\|__|\\|_______|\\|_______|\\|_______|\\|_______|&nbsp;&nbsp;&nbsp;\\|__|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\|__|\\|__|\\|_______|\\|__|&nbsp;\\|__|&nbsp;&nbsp;&nbsp;&nbsp;\\|__|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|\\_________\\|__|\\|__|\\|_______|\\|_______|\\|_______|<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\|_________|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><p/>product hunt shell is a web based linux shell emulator written in JavaScript <br />that lets you browse and interact with product hunt via command line<p />product hunt shell is developed and maintained by <a href='http://jasonb.io/' target='_blank'>jason botello</a> and was first <br />published on 9/12/2015. You can help contribute to the project on <a href='https://github.com/jasonbio/producthunt-shell' target='_blank'>GitHub</a><p />product hunt shell makes use of the following JS libraries:<br />- <a href='http://terminal.jcubic.pl/' target='_blank'>JQuery Terminal</a><br />- <a href='https://github.com/showdownjs/showdown' target='_blank'>Showdown</a><br />- <a href='http://momentjs.com/' target='_blank'>Moment.js</a><br />- <a href='https://github.com/showdownjs/showdown' target='_blank'>Showdown</a></div>", {raw:true});
  }

  function readme(term) {
    term.echo('', {raw:true});
  }

  $('body').terminal(function(cmd, term) {
    term.pause();
    if (cmd == "cd .." || cmd == "cd -") {
      if (cs > 1) {
        cmd = cmd_state[cs-2].join(" ");
        cs = cs - 2;
      } else {
        cmd_state = [];
        cmd = "list";
      }
    }

    if (cmd == "ls" && ls_state != "" || cmd == "cd" && ls_state != "") {
      cmd = ls_state;
    } else if (cmd == "ls" && ls_state == "") {
      cmd = "list";
    }
    var finish = false;
    var frontpage = "";
    cmd = $.trim(cmd);
    cmd = cmd.replace(/[\[\]']+/g,'');
    cmd = cmd.replace(/cd (\/?r?\/)?/g,'cd ');
    cmd = cmd.replace('cd ~/','list');
    cmd = cmd.replace('../','');
    cmd = cmd.replace('cd ./','ls');
    command = cmd.split(" ");
    if (command[0] != "producthunt") {
      command.unshift("producthunt");
    }
    if (command[1] == "ls") {
      command[1] = "list";
    }
    if (command[1] == "cd") {
      command[1] = "list";
    }
    if (command[2] == "prev") {
      command[2] = "previous";
    }
    if (command[3] == "prev") {
      command[3] = "previous";
    }
    if (command[1] == "set") {
      command[1] = "settings";
    }
    // LIST TODAY
    if (command[0] == "producthunt" && command[1] == "list" && !command[2] || command[0] == "producthunt" && command[1] == "list" && command[2] == "today") {
      success = false;
      $.getJSON('https://api.producthunt.com/v1/posts?access_token='+token, function(data) {
        success = true;
        pwd = "/";
        posts = [];
        discussions = [];
        content = [];
        sort = "";
        parent_posts = [];
        pagination_id = [];
        parent_name = "";
        pagination = 0;
        pagination_next = 0;
        days = 0;
        c = 0;
        r = 0;
        var phjson = data.posts;
        $(phjson).each(function() {
          if (this != undefined) {
            url = this.redirect_url;
            content.push(url);
            id = this.id;
            //pagination_id.push(this.id);
            posts.push(id);
            name = this.name;
            discussion_url = this.discussion_url;
            discussions.push(discussion_url);
            tagline = this.tagline;
            votes_count = this.votes_count;
            if (this.maker_inside) {
              maker_tag = "<span class='maker'>M</span>";
            } else {
              maker_tag = "";
            }
            if (this.screenshot_url) {
              image = this.screenshot_url["300px"];
            } else {
              image = false;
            }
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
            } else {
              line1 = name + " - " + tagline + "<br />";
            }

            if (image && showimages) {
              line1 = line1 + "<img src='" + image + "' class='post-img' /><br />";
            }
            created_at = this.created_at;
            time = moment(created_at).fromNow();
            author = this.user.name;
            username = this.user.username;
            autocomplete.push(username);
            line2 = "<span class='line2'>hunted " + time + " by " + author + " (@"+ username +")</span><br />";
            comments_count = this.comments_count;
            line3 = "<span class='line3'>" + votes_count + " votes with " + comments_count + " comments " + maker_tag + "</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            c = c + 1;
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        pagination = pagination + 1;
        cmd_state.push(command);
        cs = cs + 1;
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // LIST OLDER/NEWER
    } else if (command[0] == "producthunt" && command[1] == "list" && command[2] == "older" || command[0] == "producthunt" && command[1] == "list" && command[2] == "newer") {
      success = false;
      ns = command[2];
      if (ns == "older") {
        days = days + 1;
      } else if (ns == "newer" && days > 0) {
        days = days - 1;
      }
      $.getJSON('https://api.producthunt.com/v1/posts?days_ago='+days+'&access_token='+token, function(data) {
        success = true;
        pwd = "/";
        posts = [];
        discussions = [];
        content = [];
        sort = "";
        parent_posts = [];
        parent_name = "";
        pagination = 0;
        pagination_next = 0;
        c = 0;
        r = 0;
        var phjson = data.posts;
        $(phjson).each(function() {
          if (this != undefined) {
            url = this.redirect_url;
            content.push(url);
            id = this.id;
            //pagination_id.push(this.id);
            posts.push(id);
            name = this.name;
            discussion_url = this.discussion_url;
            discussions.push(discussion_url);
            tagline = this.tagline;
            votes_count = this.votes_count;
            if (this.maker_inside) {
              maker_tag = "<span class='maker'>M</span>";
            } else {
              maker_tag = "";
            }
            if (this.screenshot_url) {
              image = this.screenshot_url["300px"];
            } else {
              image = false;
            }
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
            } else {
              line1 = name + " - " + tagline + "<br />";
            }

            if (image && showimages) {
              line1 = line1 + "<img src='" + image + "' class='post-img' /><br />";
            }
            created_at = this.created_at;
            time = moment(created_at).fromNow();
            author = this.user.name;
            username = this.user.username;
            autocomplete.push(username);
            line2 = "<span class='line2'>hunted " + time + " by " + author + " (@"+ username +")</span><br />";
            comments_count = this.comments_count;
            line3 = "<span class='line3'>" + votes_count + " votes with " + comments_count + " comments " + maker_tag + "</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            c = c + 1;
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        pagination = pagination + 1;
        cmd_state.push(command);
        cs = cs + 1;
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // LIST ALL
    } else if (command[0] == "producthunt" && command[1] == "list" && command[2] == "all" && !command[3]) {
      success = false;
      $.getJSON('https://api.producthunt.com/v1/posts/all?'+limit+'access_token='+token, function(data) {
        success = true;
        pwd = "/";
        posts = [];
        discussions = [];
        content = [];
        pagination_id = [];
        sort = "";
        parent_posts = [];
        parent_name = "";
        pagination = 0;
        pagination_next = 0;
        c = 0;
        r = 0;
        var phjson = data.posts;
        $(phjson).each(function() {
          if (this != undefined) {
            url = this.redirect_url;
            content.push(url);
            id = this.id;
            pagination_id.push(this.id);
            posts.push(id);
            name = this.name;
            discussion_url = this.discussion_url;
            discussions.push(discussion_url);
            tagline = this.tagline;
            votes_count = this.votes_count;
            if (this.maker_inside) {
              maker_tag = "<span class='maker'>M</span>";
            } else {
              maker_tag = "";
            }
            if (this.screenshot_url) {
              image = this.screenshot_url["300px"];
            } else {
              image = false;
            }
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
            } else {
              line1 = name + " - " + tagline + "<br />";
            }

            if (image && showimages) {
              line1 = line1 + "<img src='" + image + "' class='post-img' /><br />";
            }
            created_at = this.created_at;
            time = moment(created_at).fromNow();
            author = this.user.name;
            username = this.user.username;
            autocomplete.push(username);
            line2 = "<span class='line2'>hunted " + time + " by " + author + " (@"+ username +")</span><br />";
            comments_count = this.comments_count;
            line3 = "<span class='line3'>" + votes_count + " votes with " + comments_count + " comments " + maker_tag + "</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            c = c + 1;
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        pagination = pagination + 1;
        cmd_state.push(command);
        cs = cs + 1;
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // LIST ALL PAGINATION
    } else if (command[0] == "producthunt" && command[1] == "list" && command[2] == "all" && command[3] == "older" || command[0] == "producthunt" && command[1] == "list" && command[2] == "all" && command[3] == "newer") {
      success = false;
      ns = command[3];
      if (ns == "older") {
        nid = pagination_id[c-1];
        pagination_string = "older="+nid+"&";
      } else if (ns == "newer" && c > limitnum) {
        nid = pagination_id[s-limitnum];
        pagination_string = "newer="+nid+"&";
      } else if (ns == "newer" && c <= limitnum) {
        pagination_string = "";
        c = 0;
      }
      $.getJSON('https://api.producthunt.com/v1/posts/all?'+pagination_string+limit+'&access_token='+token, function(data) {
        success = true;
        pwd = "/";
        posts = [];
        discussions = [];
        content = [];
        sort = "";
        parent_posts = [];
        parent_name = "";
        var phjson = data.posts;
        $(phjson).each(function() {
          if (this != undefined) {
            url = this.redirect_url;
            content.push(url);
            id = this.id;
            pagination_id.push(this.id);
            posts.push(id);
            name = this.name;
            discussion_url = this.discussion_url;
            discussions.push(discussion_url);
            tagline = this.tagline;
            votes_count = this.votes_count;
            if (this.maker_inside) {
              maker_tag = "<span class='maker'>M</span>";
            } else {
              maker_tag = "";
            }
            if (this.screenshot_url) {
              image = this.screenshot_url["300px"];
            } else {
              image = false;
            }
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
            } else {
              line1 = name + " - " + tagline + "<br />";
            }

            if (image && showimages) {
              line1 = line1 + "<img src='" + image + "' class='post-img' /><br />";
            }
            created_at = this.created_at;
            time = moment(created_at).fromNow();
            author = this.user.name;
            username = this.user.username;
            autocomplete.push(username);
            line2 = "<span class='line2'>hunted " + time + " by " + author + " (@"+ username +")</span><br />";
            comments_count = this.comments_count;
            line3 = "<span class='line3'>" + votes_count + " votes with " + comments_count + " comments " + maker_tag + "</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            if (command[3] == "older") {
              c = c + 1;
            } else if (command[3] == "newer" && c > limitnum) {
              c = c - 1;
            } else if (command[3] == "newer" && c <= limitnum) {
              c = c + 1;
            }
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        pagination = pagination + 1;
        pagination_next = pagination - 2;
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // COLLECTIONS
    } else if (command[0] == "producthunt" && command[1] == "collections" && !command[2]) {
      success = false;
      fixedlimit = "per_page="+fixedlimitnum+"&";
      $.getJSON('https://api.producthunt.com/v1/collections?search[featured]=true&'+fixedlimit+'access_token='+token, function(data) {
        success = true;
        pwd = "collections";
        posts = [];
        parent_posts = [];
        parent_posts = [];
        pagination_id = [];
        discussions = [];
        c = 0;
        r = 0;
        var phjson = data.collections;
        $(phjson).each(function() {
          if (this != undefined) {
            url = this.collection_url;
            content.push(url);
            id = this.id;
            posts.push(id);
            pagination_id.push(this.id);
            collection_url = this.collection_url;
            discussions.push(collection_url);
            name = this.name;
            if (this.title === "" || this.title === null) {
              title = "";
            } else {
              title = " - "+this.title;
            }
            posts_count = this.posts_count;
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a>" + title + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a>" + title + "<br />";
            } else {
              line1 = name + title + "<br />";
            }
            created_at = this.created_at;
            time = moment(created_at).fromNow();
            author = this.user.name;
            username = this.user.username;
            autocomplete.push(username);
            line2 = "<span class='line2'>created " + time + " by " + author + " (@"+ username +")</span><br />";
            line3 = "<span class='line3'>" + posts_count + " posts in this collection</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            c = c + 1;
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        cmd_state.push(command);
        cs = cs + 1;
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~collections/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // COLLECTIONS PAGINATION
    } else if (command[0] == "producthunt" && command[1] == "collections" && command[2] == "older" || command[0] == "producthunt" && command[1] == "collections" && command[2] == "newer") {
      success = false;
      fixedlimit = "per_page="+fixedlimitnum+"&";
      ns = command[2];
      if (ns == "older") {
        nid = pagination_id[c-1];
        pagination_string = "older="+nid+"&";
      } else if (ns == "newer" && c > fixedlimitnum) {
        nid = pagination_id[s-limitnum];
        pagination_string = "newer="+nid+"&";
      } else if (ns == "newer" && c <= fixedlimitnum) {
        pagination_string = "";
        c = 0;
      }
      $.getJSON('https://api.producthunt.com/v1/collections?search[featured]=true&'+pagination_string+fixedlimit+'access_token='+token, function(data) {
        success = true;
        pwd = "collections";
        var phjson = data.collections;
        $(phjson).each(function() {
          if (this != undefined) {
            url = this.collection_url;
            content.push(url);
            id = this.id;
            posts.push(id);
            pagination_id.push(this.id);
            collection_url = this.collection_url;
            discussions.push(collection_url);
            name = this.name;
            if (this.title === "" || this.title === null) {
              title = "";
            } else {
              title = " - "+this.title;
            }
            posts_count = this.posts_count;
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a>" + title + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a>" + title + "<br />";
            } else {
              line1 = name + title + "<br />";
            }
            created_at = this.created_at;
            time = moment(created_at).fromNow();
            author = this.user.name;
            username = this.user.username;
            autocomplete.push(username);
            line2 = "<span class='line2'>created " + time + " by " + author + " (@"+ username +")</span><br />";
            line3 = "<span class='line3'>" + posts_count + " posts in this collection</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            if (ns == "older") {
              c = c + 1;
            } else if (ns == "newer" && c > fixedlimitnum) {
              c = c - 1;
            } else if (ns == "newer" && c <= fixedlimitnum) {
              c = c + 1;
            }
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~collections/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // COLLECTIONS ALL
    } else if (command[0] == "producthunt" && command[1] == "collections" && command[2] == "all" && !command[3]) {
      success = false;
      fixedlimit = "per_page="+fixedlimitnum+"&";
      $.getJSON('https://api.producthunt.com/v1/collections?'+fixedlimit+'access_token='+token, function(data) {
        success = true;
        pwd = "collections";
        posts = [];
        parent_posts = [];
        parent_posts = [];
        pagination_id = [];
        discussions = [];
        c = 0;
        r = 0;
        var phjson = data.collections;
        $(phjson).each(function() {
          if (this != undefined) {
            url = this.collection_url;
            content.push(url);
            id = this.id;
            posts.push(id);
            pagination_id.push(this.id);
            collection_url = this.collection_url;
            discussions.push(collection_url);
            name = this.name;
            if (this.title === "" || this.title === null) {
              title = "";
            } else {
              title = " - "+this.title;
            }
            posts_count = this.posts_count;
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a>" + title + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a>" + title + "<br />";
            } else {
              line1 = name + title + "<br />";
            }
            created_at = this.created_at;
            time = moment(created_at).fromNow();
            author = this.user.name;
            username = this.user.username;
            autocomplete.push(username);
            line2 = "<span class='line2'>created " + time + " by " + author + " (@"+ username +")</span><br />";
            line3 = "<span class='line3'>" + posts_count + " posts in this collection</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            c = c + 1;
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        cmd_state.push(command);
        cs = cs + 1;
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~collections/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // COLLECTIONS ALL PAGINATION
    } else if (command[0] == "producthunt" && command[1] == "collections" && command[2] == "all" && command[3] == "newer" || command[0] == "producthunt" && command[1] == "collections" && command[2] == "all" && command[3] == "older") {
      success = false;
      fixedlimit = "per_page="+fixedlimitnum+"&";
      ns = command[3];
      if (ns == "older") {
        nid = pagination_id[c-1];
        pagination_string = "older="+nid+"&";
      } else if (ns == "newer" && c > fixedlimitnum) {
        nid = pagination_id[s-limitnum];
        pagination_string = "newer="+nid+"&";
      } else if (ns == "newer" && c <= fixedlimitnum) {
        pagination_string = "";
        c = 0;
      }
      $.getJSON('https://api.producthunt.com/v1/collections?'+pagination_string+fixedlimit+'access_token='+token, function(data) {
        success = true;
        pwd = "collections";
        var phjson = data.collections;
        $(phjson).each(function() {
          if (this != undefined) {
            url = this.collection_url;
            content.push(url);
            id = this.id;
            posts.push(id);
            pagination_id.push(this.id);
            collection_url = this.collection_url;
            discussions.push(collection_url);
            name = this.name;
            if (this.title === "" || this.title === null) {
              title = "";
            } else {
              title = " - "+this.title;
            }
            posts_count = this.posts_count;
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a>" + title + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a>" + title + "<br />";
            } else {
              line1 = name + title + "<br />";
            }
            created_at = this.created_at;
            time = moment(created_at).fromNow();
            author = this.user.name;
            username = this.user.username;
            autocomplete.push(username);
            line2 = "<span class='line2'>created " + time + " by " + author + " (@"+ username +")</span><br />";
            line3 = "<span class='line3'>" + posts_count + " posts in this collection</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            if (ns == "older") {
              c = c + 1;
            } else if (ns == "newer" && c > fixedlimitnum) {
              c = c - 1;
            } else if (ns == "newer" && c <= fixedlimitnum) {
              c = c + 1;
            }
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~collections/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // VIEW COLLECTION
    } else if (command[0] == "producthunt" && command[1] == "view" && command[2] == "collection" && command[3] && !command[4] || command[0] == "producthunt" && command[1] == "view" && command[2] == "collections" && command[3] && !command[4]) {
      success = false;
      ns = command[3];
      collection_id = posts[ns];
      parent_post = parent_posts[ns];
      discussion = discussions[ns];
      if (discussion != undefined) {
        discussion = discussion.replace('http://www.producthunt.com','');
        pwd = discussion;
      }
      $.getJSON('https://api.producthunt.com/v1/collections/'+collection_id+'/?access_token='+token, function(data) {
        success = true;
        posts = [];
        discussions = [];
        content = [];
        pagination_id = [];
        parent_posts = [];
        parent_name = "";
        pagination = 0;
        pagination_next = 0;
        c = 0;
        r = 0;
        var phjson = data.collection;
        term.echo(parent_post, {raw:true});
        parent_posts = [];
        $(phjson).each(function() {
          if (this != undefined) {
            var chjson = this.posts;
            if (chjson != null) {
              $(chjson).each(function () {
                url = this.redirect_url;
                content.push(url);
                id = this.id;
                pagination_id.push(this.id);
                posts.push(id);
                name = this.name;
                discussion_url = this.discussion_url;
                discussions.push(discussion_url);
                tagline = this.tagline;
                votes_count = this.votes_count;
                if (this.maker_inside) {
                  maker_tag = "<span class='maker'>M</span>";
                } else {
                  maker_tag = "";
                }
                if (this.screenshot_url) {
                  image = this.screenshot_url["300px"];
                } else {
                  image = false;
                }
                if (url) {
                  line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
                  line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
                } else {
                  line1 = name + " - " + tagline + "<br />";
                }

                if (image && showimages) {
                  line1 = line1 + "<img src='" + image + "' class='post-img' /><br />";
                }
                created_at = this.created_at;
                time = moment(created_at).fromNow();
                author = this.user.name;
                username = this.user.username;
                autocomplete.push(username);
                line2 = "<span class='line2'>hunted " + time + " by " + author + " (@"+ username +")</span><br />";
                comments_count = this.comments_count;
                line3 = "<span class='line3'>" + votes_count + " votes with " + comments_count + " comments " + maker_tag + "</span><p/>";
                frontpage = line1 + line2 + line3 + '</div>';
                parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
                parent_posts.push(parent_post);
                c = c + 1;
                term.echo(frontpage, {raw:true});
              });
            }
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~'+pwd+'/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // VIEW COMMENTS
    } else if (posts.length !== 0 && command[0] == "producthunt" && command[1] == "view" && command[2] == "comments" && command[3] && !command[4]) {
      c = 0;
      r = 0;
      s = 0;
      success = false;
      pagination_id = [];
      parent_post = parent_posts[command[3]];
      post_id = posts[command[3]];
      discussion = discussions[command[3]];
      if (discussion != undefined) {
        discussion = discussion.replace('http://www.producthunt.com','');
        pwd = discussion;
      }
      $.getJSON('https://api.producthunt.com/v1/posts/'+post_id+'/comments?'+limit+'access_token='+token, function(data) {
        comments = [];
        fullnames = [];
        parent_name = "";
        morelink = "";
        autocomplete = autobase;
        success = true;
        var phjson = data.comments;
        term.echo(parent_post, {raw:true});
        $(phjson).each(function () {
          author = this.user.name;
          username = this.user.username;
          user_id = this.user_id;
          autocomplete.push(username);
          replies = this.child_comments_count;
          created_at = this.created_at;
          time = moment(created_at).fromNow();
          votes = this.votes;
          body = converter.makeHtml(this.body);
          id = this.id;
          pagination_id.push(this.id);
          r = r + 1;
          s = s + 1;
          url = this.url;
          line1 = "<div class='comment-wrapper'><span id='index'>[<span class='post-color'>" + r + "</span>]</span> <span id='text-body'>" + body + "</span><br />";
          line2 = "<span>posted " + time + " by " + author + " (@"+ username +")</span><br />";
          line3 = "<span>" + votes + " votes with " + replies + " replies</span><p/>";
          frontpage = line1 + line2 + line3;
          parent_comment = line1 + line2 + line3;
          term.echo(parent_comment, {raw:true});
          var chjson = this.child_comments;
          if (chjson != null) {
            $(chjson).each(function () {
              pagination_id.push(this.id);
              r = r + 1;
              author = this.user.name;
              username = this.user.username;
              user_id = this.user_id;
              autocomplete.push(username);
              replies = this.child_comments_count;
              created_at = this.created_at;
              time = moment(created_at).fromNow();
              votes = this.votes;
              body = converter.makeHtml(this.body);
              id = this.id;
              url = this.url;
              line1 = "<div class='nested-wrapper'><span id='index'>[<span class='post-color'>" + r + "</span>]</span> <span id='text-body'>" + body + "</span><br />";
              line2 = "<span>posted " + time + " by " + author + " (@"+ username +")</span><br />";
              line3 = "<span>" + votes + " votes with " + replies + " replies</span><p/>";
              frontpage = line1 + line2 + line3;
              child_comment = line1 + line2 + line3;
              term.echo(child_comment, {raw:true});
            });
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~'+pwd+'/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // VIEW COMMENTS PAGINATION
    } else if (posts.length !== 0 && command[0] == "producthunt" && command[1] == "view" && command[2] == "comments" && command[3] && command[4] == "older" || posts.length !== 0 && command[0] == "producthunt" && command[1] == "view" && command[2] == "comments" && command[3] && command[4] == "newer") {
      success = false;
      ns = command[4];
      if (ns == "older") {
        nid = pagination_id[r-1];
        pagination_string = "older="+nid+"&";
      } else if (ns == "newer" && r > limitnum) {
        nid = pagination_id[s-limitnum];
        pagination_string = "newer="+nid+"&";
      } else if (ns == "newer" && r <= limitnum) {
        pagination_string = "";
        r = 0;
      }
      $.getJSON('https://api.producthunt.com/v1/posts/'+post_id+'/comments?'+pagination_string+limit+'access_token='+token, function(data) {
        autocomplete = autobase;
        success = true;
        var phjson = data.comments;
        $(phjson).each(function () {
          author = this.user.name;
          username = this.user.username;
          user_id = this.user_id;
          autocomplete.push(username);
          replies = this.child_comments_count;
          created_at = this.created_at;
          time = moment(created_at).fromNow();
          votes = this.votes;
          body = converter.makeHtml(this.body);
          id = this.id;
          pagination_id.push(this.id);
          r = r + 1;
          s = s + 1;
          url = this.url;
          line1 = "<div class='comment-wrapper'><span id='index'>[<span class='post-color'>" + r + "</span>]</span> <span id='text-body'>" + body + "</span><br />";
          line2 = "<span>posted " + time + " by " + author + " (@"+ username +")</span><br />";
          line3 = "<span>" + votes + " votes with " + replies + " replies</span><p/>";
          frontpage = line1 + line2 + line3;
          parent_comment = line1 + line2 + line3;
          term.echo(parent_comment, {raw:true});
          var chjson = this.child_comments;
          if (chjson != null) {
            $(chjson).each(function () {
              pagination_id.push(this.id);
              r = r + 1;
              author = this.user.name;
              username = this.user.username;
              user_id = this.user_id;
              autocomplete.push(username);
              replies = this.child_comments_count;
              created_at = this.created_at;
              time = moment(created_at).fromNow();
              votes = this.votes;
              body = converter.makeHtml(this.body);
              id = this.id;
              url = this.url;
              line1 = "<div class='nested-wrapper'><span id='index'>[<span class='post-color'>" + r + "</span>]</span> <span id='text-body'>" + body + "</span><br />";
              line2 = "<span>posted " + time + " by " + author + " (@"+ username +")</span><br />";
              line3 = "<span>" + votes + " votes with " + replies + " replies</span><p/>";
              frontpage = line1 + line2 + line3;
              child_comment = line1 + line2 + line3;
              term.echo(child_comment, {raw:true});
            });
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        term.set_prompt(auth_user+'@producthunt:~'+pwd+'/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // VIEW CONTENT
    } else if (content.length !== 0 && command[0] == "producthunt" && command[1] == "view" && command[2] == "content" && command[3]) {
      var content_url = content[command[3]];
      if (content_url) {
        window.open(content_url);
      }
      term.resume();
    // USER
    } else if (command[0] == "producthunt" && command[1] == "user" && command[2] && !command[3]) {
      success = false;
      user = command[2];
      user_id_scope = "";
      $.getJSON('https://api.producthunt.com/v1/users/'+user+'?access_token='+token, function(data) {
        pwd = user;
        comments = [];
        fullnames = [];
        pagination_id = [];
        autocomplete = autobase;
        success = true;
        var phjson = data.user;
        $(phjson).each(function () {
          r = r + 1;
          author = this.name;
          username = this.username;
          user_id = this.id;
          user_id_scope = this.id;
          autocomplete.push(username);
          website_url = this.website_url;
          created_at = this.created_at;
          time = moment(created_at).fromNow();
          profile_url = this.profile_url;
          votes_count = this.votes_count;
          posts_count = this.posts_count;
          maker_of_count = this.maker_of_count;
          followers_count = this.followers_count;
          followings_count = this.followings_count;
          collections_count = this.collections_count;
          headline = this.headline;
          line1 = "<div class='post-wrapper'><strong>"+author+"</strong> #"+user_id+" - ";
          line2 = "<span>"+headline+" <a href='https://twitter.com/"+username+"' target='_blank'>@"+ username +"</a> <a href='"+website_url+"' target='_blank'>"+website_url + "</a></span><br />";
          line3 = "<span><strong>" + votes_count + "</strong> votes <strong>" + posts_count + "</strong> submitted <strong>" + maker_of_count + "</strong> made <strong>" + followers_count + "</strong> followers <strong>" + followings_count + "</strong> following</span><p/>";
          user_post = "<div class='parent-post'>" + line1 + line2 + line3 + "</div>";
          term.echo(user_post, {raw:true});
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        cmd_state.push(command);
        cs = cs + 1;
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~'+pwd+'/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // USER VOTES
    } else if (user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "votes" && !command[4]) {
      success = false;
      user = user_id_scope;
      $.getJSON('https://api.producthunt.com/v1/users/'+user+'/votes?'+limit+'access_token='+token, function(data) {
        success = true;
        //pwd = user;
        posts = [];
        discussions = [];
        content = [];
        parent_posts = [];
        c = 0;
        r = 0;
        var phjson = data.votes;
        $(phjson).each(function() {
          if (this != undefined) {
            pagination_id.push(this.id);
            url = this.post.redirect_url;
            content.push(url);
            id = this.post.id;
            posts.push(id);
            name = this.post.name;
            discussion_url = this.post.discussion_url;
            discussions.push(discussion_url);
            tagline = this.post.tagline;
            votes_count = this.post.votes_count;
            if (this.post.maker_inside) {
              maker_tag = "<span class='maker'>M</span>";
            } else {
              maker_tag = "";
            }
            if (this.post.screenshot_url) {
              image = this.post.screenshot_url["300px"];
            } else {
              image = false;
            }
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
            } else {
              line1 = name + " - " + tagline + "<br />";
            }

            if (image && showimages) {
              line1 = line1 + "<img src='" + image + "' class='post-img' /><br />";
            }
            created_at = this.post.created_at;
            time = moment(created_at).fromNow();
            author = this.post.user.name;
            username = this.post.user.username;
            autocomplete.push(author);
            line2 = "<span class='line2'>hunted " + time + " by " + author + " (@"+ username +")</span><br />";
            comments_count = this.post.comments_count;
            line3 = "<span class='line3'>" + votes_count + " votes with " + comments_count + " comments " + maker_tag + "</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            c = c + 1;
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~'+pwd+'/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // USER VOTES PAGINATION
    } else if (user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "votes" && command[4] == "older" || user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "votes" && command[4] == "newer") {
      success = false;
      if (command[4] == "older") {
        nid = pagination_id[c-1];
        pagination_string = command[4]+"="+nid+"&";
      } else if (command[4] == "newer" && c > limitnum) {
        nid = pagination_id[c-limitnum];
        pagination_string = command[4]+"="+nid+"&";
      } else if (command[4] == "newer" && c <= limitnum) {
        pagination_string = "";
        c = 0;
      }
      $.getJSON('https://api.producthunt.com/v1/users/'+user+'/votes?'+pagination_string+limit+'access_token='+token, function(data) {
        success = true;
        var phjson = data.votes;
        $(phjson).each(function() {
          if (this != undefined) {
            pagination_id.push(this.id);
            url = this.post.redirect_url;
            content.push(url);
            id = this.post.id;
            posts.push(id);
            name = this.post.name;
            discussion_url = this.post.discussion_url;
            discussions.push(discussion_url);
            tagline = this.post.tagline;
            votes_count = this.post.votes_count;
            if (this.post.maker_inside) {
              maker_tag = "<span class='maker'>M</span>";
            } else {
              maker_tag = "";
            }
            if (this.post.screenshot_url) {
              image = this.post.screenshot_url["300px"];
            } else {
              image = false;
            }
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
            } else {
              line1 = name + " - " + tagline + "<br />";
            }

            if (image && showimages) {
              line1 = line1 + "<img src='" + image + "' class='post-img' /><br />";
            }
            created_at = this.post.created_at;
            time = moment(created_at).fromNow();
            author = this.post.user.name;
            username = this.post.user.username;
            autocomplete.push(author);
            line2 = "<span class='line2'>hunted " + time + " by " + author + " (@"+ username +")</span><br />";
            comments_count = this.post.comments_count;
            line3 = "<span class='line3'>" + votes_count + " votes with " + comments_count + " comments " + maker_tag + "</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            if (command[4] == "older") {
              c = c + 1;
            } else if (command[4] == "newer" && c > limitnum) {
              c = c - 1;
            } else if (command[4] == "newer" && c <= limitnum) {
              c = c + 1;
            }
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~'+pwd+'/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // USER POSTS/SUBMITTED
    } else if (user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "posts" && !command[4] || user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "submitted" && !command[4]) {
      success = false;
      user = user_id_scope;
      $.getJSON('https://api.producthunt.com/v1/users/'+user+'/posts?'+limit+'access_token='+token, function(data) {
        success = true;
        posts = [];
        discussions = [];
        content = [];
        parent_posts = [];
        c = 0;
        r = 0;
        var phjson = data.posts;
        $(phjson).each(function() {
          if (this != undefined) {
            pagination_id.push(this.id);
            url = this.redirect_url;
            content.push(url);
            id = this.id;
            posts.push(id);
            name = this.name;
            discussion_url = this.discussion_url;
            discussions.push(discussion_url);
            tagline = this.tagline;
            votes_count = this.votes_count;
            if (this.maker_inside) {
              maker_tag = "<span class='maker'>M</span>";
            } else {
              maker_tag = "";
            }
            if (this.screenshot_url) {
              image = this.screenshot_url["300px"];
            } else {
              image = false;
            }
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
            } else {
              line1 = name + " - " + tagline + "<br />";
            }

            if (image && showimages) {
              line1 = line1 + "<img src='" + image + "' class='post-img' /><br />";
            }
            created_at = this.created_at;
            time = moment(created_at).fromNow();
            author = this.user.name;
            username = this.user.username;
            autocomplete.push(author);
            line2 = "<span class='line2'>hunted " + time + " by " + author + " (@"+ username +")</span><br />";
            comments_count = this.comments_count;
            line3 = "<span class='line3'>" + votes_count + " votes with " + comments_count + " comments " + maker_tag + "</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            c = c + 1;
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~'+pwd+'/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // USER POSTS/SUBMITTED PAGINATION
    } else if (user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "posts" && command[4] == "older" || user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "posts" && command[4] == "newer" || user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "submitted" && command[4] == "older" || user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "submitted" && command[4] == "newer") {
      success = false;
      if (command[4] == "older") {
        nid = pagination_id[c-1];
        pagination_string = command[4]+"="+nid+"&";
      } else if (command[4] == "newer" && c > limitnum) {
        nid = pagination_id[c-limitnum];
        pagination_string = command[4]+"="+nid+"&";
      } else if (command[4] == "newer" && c <= limitnum) {
        pagination_string = "";
        c = 0;
      }
      $.getJSON('https://api.producthunt.com/v1/users/'+user+'/posts?'+pagination_string+limit+'access_token='+token, function(data) {
        success = true;
        var phjson = data.posts;
        $(phjson).each(function() {
          if (this != undefined) {
            pagination_id.push(this.id);
            url = this.redirect_url;
            content.push(url);
            id = this.id;
            posts.push(id);
            name = this.name;
            discussion_url = this.discussion_url;
            discussions.push(discussion_url);
            tagline = this.tagline;
            votes_count = this.votes_count;
            if (this.maker_inside) {
              maker_tag = "<span class='maker'>M</span>";
            } else {
              maker_tag = "";
            }
            if (this.screenshot_url) {
              image = this.screenshot_url["300px"];
            } else {
              image = false;
            }
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
            } else {
              line1 = name + " - " + tagline + "<br />";
            }

            if (image && showimages) {
              line1 = line1 + "<img src='" + image + "' class='post-img' /><br />";
            }
            created_at = this.created_at;
            time = moment(created_at).fromNow();
            author = this.user.name;
            username = this.user.username;
            autocomplete.push(author);
            line2 = "<span class='line2'>hunted " + time + " by " + author + " (@"+ username +")</span><br />";
            comments_count = this.comments_count;
            line3 = "<span class='line3'>" + votes_count + " votes with " + comments_count + " comments " + maker_tag + "</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            if (command[4] == "older") {
              c = c + 1;
            } else if (command[4] == "newer" && c > limitnum) {
              c = c - 1;
            } else if (command[4] == "newer" && c <= limitnum) {
              c = c + 1;
            }
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~'+pwd+'/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // USER MADE/PRODUCTS
    } else if (user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "made" && !command[4] || user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "products" && !command[4]) {
      success = false;
      user = user_id_scope;
      $.getJSON('https://api.producthunt.com/v1/users/'+user+'/products?'+limit+'access_token='+token, function(data) {
        success = true;
        posts = [];
        discussions = [];
        content = [];
        parent_posts = [];
        c = 0;
        r = 0;
        var phjson = data.posts;
        $(phjson).each(function() {
          if (this != undefined) {
            pagination_id.push(this.id);
            url = this.redirect_url;
            content.push(url);
            id = this.id;
            posts.push(id);
            name = this.name;
            discussion_url = this.discussion_url;
            discussions.push(discussion_url);
            tagline = this.tagline;
            votes_count = this.votes_count;
            if (this.maker_inside) {
              maker_tag = "<span class='maker'>M</span>";
            } else {
              maker_tag = "";
            }
            if (this.screenshot_url) {
              image = this.screenshot_url["300px"];
            } else {
              image = false;
            }
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
            } else {
              line1 = name + " - " + tagline + "<br />";
            }

            if (image && showimages) {
              line1 = line1 + "<img src='" + image + "' class='post-img' /><br />";
            }
            created_at = this.created_at;
            time = moment(created_at).fromNow();
            author = this.user.name;
            username = this.user.username;
            autocomplete.push(author);
            line2 = "<span class='line2'>hunted " + time + " by " + author + " (@"+ username +")</span><br />";
            comments_count = this.comments_count;
            line3 = "<span class='line3'>" + votes_count + " votes with " + comments_count + " comments " + maker_tag + "</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            c = c + 1;
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~'+pwd+'/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // USER MADE/PRODUCTS PAGINATION
    } else if (user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "made" && command[4] == "older" || user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "made" && command[4] == "newer" || user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "products" && command[4] == "older" || user_id_scope != "" && command[0] == "producthunt" && command[1] == "user" && command[2] && command[3] == "products" && command[4] == "newer") {
      success = false;
      if (command[4] == "older") {
        nid = pagination_id[c-1];
        pagination_string = command[4]+"="+nid+"&";
      } else if (command[4] == "newer" && c > limitnum) {
        nid = pagination_id[c-limitnum];
        pagination_string = command[4]+"="+nid+"&";
      } else if (command[4] == "newer" && c <= limitnum) {
        pagination_string = "";
        c = 0;
      }
      $.getJSON('https://api.producthunt.com/v1/users/'+user+'/products?'+pagination_string+limit+'access_token='+token, function(data) {
        success = true;
        var phjson = data.posts;
        $(phjson).each(function() {
          if (this != undefined) {
            pagination_id.push(this.id);
            url = this.redirect_url;
            content.push(url);
            id = this.id;
            posts.push(id);
            name = this.name;
            discussion_url = this.discussion_url;
            discussions.push(discussion_url);
            tagline = this.tagline;
            votes_count = this.votes_count;
            if (this.maker_inside) {
              maker_tag = "<span class='maker'>M</span>";
            } else {
              maker_tag = "";
            }
            if (this.screenshot_url) {
              image = this.screenshot_url["300px"];
            } else {
              image = false;
            }
            if (url) {
              line1 = "<div class='post-wrapper'><span id='index'>[<span class='post-color'>" + c + "</span>]</span> <a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
              line1_parent = "<div class='post-wrapper'><a href='"+url+"' target='_blank'>"+name + "</a> - " + tagline + "<br />";
            } else {
              line1 = name + " - " + tagline + "<br />";
            }

            if (image && showimages) {
              line1 = line1 + "<img src='" + image + "' class='post-img' /><br />";
            }
            created_at = this.created_at;
            time = moment(created_at).fromNow();
            author = this.user.name;
            username = this.user.username;
            autocomplete.push(author);
            line2 = "<span class='line2'>hunted " + time + " by " + author + " (@"+ username +")</span><br />";
            comments_count = this.comments_count;
            line3 = "<span class='line3'>" + votes_count + " votes with " + comments_count + " comments " + maker_tag + "</span><p/>";
            frontpage = line1 + line2 + line3 + '</div>';
            parent_post = "<div class='parent-post'>" + line1_parent + line2 + line3 + "</div>";
            parent_posts.push(parent_post);
            if (command[4] == "older") {
              c = c + 1;
            } else if (command[4] == "newer" && c > limitnum) {
              c = c - 1;
            } else if (command[4] == "newer" && c <= limitnum) {
              c = c + 1;
            }
            term.echo(frontpage, {raw:true});
          }
        });
        autocomplete = autocomplete.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        ls_state = command.join(" ");
        term.set_prompt(auth_user+'@producthunt:~'+pwd+'/$ ');
        term.resume();
      });
      setTimeout(function(){if (!success){term.resume();term.echo("<span class='err'>error fetching data from product hunt</span>", {raw:true});}}, 10000);
    // LOGIN
    } else if (command[1] == "login") {
      window.location.replace("https://producthuntshell.com/auth/user.php");
    // LOGOUT
    } else if (command[1] == "logout" && usertoken) {
      window.location.replace("https://producthuntshell.com/");
    // PWD
    } else if (cmd == "pwd") {
      term.echo(pwd, {raw:true});
      term.resume();
    // NOTIFICATIONS
    } else if (usertoken && command[1] == "notifications" && !command[2]) {
      success = false;
      $.ajax({ 
        url: 'https://api.producthunt.com/v1/notifications?'+limit,
        type: 'GET',
        dataType: 'json',
        beforeSend: function(xhr) { 
          xhr.setRequestHeader("Authorization", "Bearer " + usertoken);
        },
        success: function(data) {
          success = true;
          pagination_id = [];
          c = 0;
          var notificationjson = data.notifications;
          $(notificationjson).each(function() {
            id = this.id;
            pagination_id.push(this.id);
            sentence = this.sentence;
            url = this.reference.url;
            aStr = sentence.match(/\w+|"[^"]+"/g), i = aStr.length;
            while(i--){
              aStr[i] = aStr[i].replace(/"/,"<a href=\""+url+"\" target=\"_blank\">\"");
            }
            sentence = aStr.join(" ");
            created_at = this.reference.created_at;
            time = moment(created_at).fromNow();
            username = this.from_user.username;
            autocomplete.push(username);
            line1 = "<div class='post-wrapper'><span id='index'>"+sentence+"</a><br />" + time + " by @"+username+"<p /></div>";
            term.echo(line1, {raw:true});
            c = c + 1;
          });
        },
        error: function(jqXHR, textStatus, errorThrown) {
          success = false;
          term.echo("<span class='err'>error - you may need to re-authorize product hunt shell by typing login</span>", {raw:true});
        }
      });
      term.resume();
    // NOTIFICATIONS PAGINATION
    } else if (usertoken && command[1] == "notifications" && command[2] == "older" || usertoken && command[1] == "notifications" && command[2] == "newer") {
      success = false;
      if (command[2] == "older") {
        nid = pagination_id[c-1];
        pagination_string = command[2]+"="+nid+"&";
      } else if (command[2] == "newer" && c > limitnum) {
        nid = pagination_id[c-limitnum];
        pagination_string = command[2]+"="+nid+"&";
      } else if (command[2] == "newer" && c <= limitnum && c > 0) {
        pagination_string = "";
        c = 0;
      }
      $.ajax({ 
        url: 'https://api.producthunt.com/v1/notifications?'+pagination_string+limit,
        type: 'GET',
        dataType: 'json',
        beforeSend: function(xhr) { 
          xhr.setRequestHeader("Authorization", "Bearer " + usertoken);
        },
        success: function(data) {
          success = true;
          var notificationjson = data.notifications;
          $(notificationjson).each(function() {
            id = this.id;
            sentence = this.sentence;
            url = this.reference.url;
            aStr = sentence.match(/\w+|"[^"]+"/g), i = aStr.length;
            while(i--){
              aStr[i] = aStr[i].replace(/"/,"<a href=\""+url+"\" target=\"_blank\">\"");
            }
            sentence = aStr.join(" ");
            created_at = this.reference.created_at;
            time = moment(created_at).fromNow();
            username = this.from_user.username;
            autocomplete.push(username);
            line1 = "<div class='post-wrapper'><span id='index'>"+sentence+"</a><br />" + time + " by @"+username+"<p /></div>";
            term.echo(line1, {raw:true});
            if (command[2] == "older") {
              c = c + 1;
            } else if (command[2] == "newer" && c > limitnum) {
              c = c - 1;
            } else if (command[2] == "newer" && c <= limitnum) {
              c = c + 1;
            }
          });
          term.resume();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          success = false;
          term.echo("<span class='err'>error - you may need to re-authorize product hunt shell by typing login</span>", {raw:true});
          term.resume();
        }
      });
    // NOTIFICATIONS DESTROY
    } else if (usertoken && command[1] == "notifications" && command[2] == "destroy" && !command[3]) {
      success = false;
      $.ajax({ 
        url: 'https://api.producthunt.com/v1/notifications',
        type: 'DELETE',
        dataType: 'json',
        beforeSend: function(xhr) { 
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader("Authorization", "Bearer " + usertoken);
        },
        crossDomain: true,
        success: function(data) {
          success = true;
          var notificationjson = data.notifications;
          $(notificationjson).each(function() {
            id = this.id;
            pagination_id.push(this.id);
            sentence = this.sentence;
            url = this.reference.url;
            aStr = sentence.match(/\w+|"[^"]+"/g), i = aStr.length;
            while(i--){
              aStr[i] = aStr[i].replace(/"/,"<a href=\""+url+"\" target=\"_blank\">\"");
            }
            sentence = aStr.join(" ");
            created_at = this.reference.created_at;
            time = moment(created_at).fromNow();
            username = this.from_user.username;
            autocomplete.push(username);
            line1 = "<div class='post-wrapper'><span id='index'>"+sentence+"</a><br />" + time + " by @"+username+"<p /></div>";
            term.echo(line1, {raw:true});
          });
        },
        error: function(jqXHR, textStatus, errorThrown) {
          success = false;
          term.echo("<span class='err'>error - you may need to re-authorize product hunt shell by typing login</span>", {raw:true});
        }
      });
      term.resume();
    } else if (usertoken && command[1] == "settings") {
      $.ajax({ 
        url: 'https://api.producthunt.com/v1/me',
        type: 'GET',
        dataType: 'json',
        beforeSend: function(xhr) { 
          xhr.setRequestHeader("Authorization", "Bearer " + usertoken);
        },
        success: function(data) {
          success = true;
          send_mention_email = data.user.send_mention_email;
          send_mention_push = data.user.send_mention_push;
          send_friend_post_email = data.user.send_friend_post_email;
          send_friend_post_push = data.user.send_friend_post_push;
          send_new_follower_email = data.user.send_new_follower_email;
          send_new_follower_push = data.user.send_new_follower_push;
          send_announcement_email = data.user.send_announcement_email;
          send_announcement_push = data.user.send_announcement_push;
          send_product_recommendation_email = data.user.send_product_recommendation_email;
          send_product_recommendation_push = data.user.send_product_recommendation_push;
          subscribed_to_push = data.user.subscribed_to_push;
          term.echo("<p />Receive email notifications when:<br /><div style='margin-left:2%;'>You're mentioned in a comment: <strong>"+send_mention_email+"</strong><br />New products are posted by people you follow: <strong>"+send_friend_post_email+"</strong><br />Popular products upvoted by people you follow: <strong>"+send_product_recommendation_email+"</strong></div><p />", {raw:true});
          if (showimages) {
            term.echo("display images is currently: <strong>on</strong>", {raw:true});
          } else {
            term.echo("display images is currently: <strong>off</strong>", {raw:true});
          }
          term.echo("current limit set to: <strong>" + limitint + "</strong>", {raw:true});
          term.resume(); 
        },
        error: function(jqXHR, textStatus, errorThrown) {
          success = false;
          term.echo("<span class='err'>error - you may need to re-authorize product hunt shell by typing login</span>", {raw:true});
          term.resume();
        }
      });
    } else if (!usertoken && command[1] == "settings") {
      if (showimages) {
        term.echo("display images is currently: <strong>on</strong>", {raw:true});
      } else {
        term.echo("display images is currently: <strong>off</strong>", {raw:true});
      }
      term.echo("current limit set to: <strong>" + limitint + "</strong>", {raw:true});
      term.resume();
    } else if (cmd == "cat README" || cmd == "cat readme" || cmd == "readme" || cmd == "help") {
      greetings(term);
      term.resume();
    } else if (cmd == "settings images" || cmd == "set img" || cmd == "set images" || cmd == "settings img") {
      if (showimages) {
        term.echo("display images is currently: <strong>on</strong>", {raw:true});
        term.resume();
      } else {
        term.echo("display images is currently: <strong>off</strong>", {raw:true});
        term.resume();
      }
    } else if (cmd == "settings images on" || cmd == "set img on") {
      showimages = true;
      term.echo("display images turned <strong>on</strong>", {raw:true});
        term.resume();
    } else if (cmd == "settings images off" || cmd == "set img off") {
      showimages = false;
      term.echo("display images turned <strong>off</strong>", {raw:true});
        term.resume();
    } else if (cmd == "settings limit" || cmd == "set limit") {
      term.echo("current limit set to: <strong>" + limitint + "</strong>", {raw:true});
        term.resume();
    } else if (command[1] == "settings" && command[2] == "limit" && command[3]) {
      if (command[3] == "auto") {
        windowheight = $(window.top).height();
        limit = "limit="+(Math.round(windowheight / 54)-3)+"&";
        limitint = "auto (" + (Math.round(windowheight / 54)-3) + ")";
        limitnum = (Math.round(windowheight / 54)-3);
        term.echo("limit set to auto", {raw:true});
        term.resume();
      } else if (command[3] <= 50) {
        limit = "limit="+command[3]+"&";
        limitint = command[3];
        limitnum = command[3];
        term.echo("limit set to "+command[3], {raw:true});
        term.resume();
      } else {
        term.echo("limit cannot exceed 50", {raw:true});
        term.resume();
      }
    } else if (cmd == "about") {
      about(term);
      term.resume();
    } else if (cmd.indexOf("rm -rf") > -1 || (cmd.indexOf(":(){: | :&}")) > -1 || (cmd.indexOf("{:(){ :|: & };:")) > -1 || (cmd.indexOf("command > /dev/sda")) > -1 || (cmd.indexOf("mkfs.ext4 /dev/sda1")) > -1 || (cmd.indexOf("dd if=/dev/random")) > -1 || (cmd.indexOf("mv ~ /dev/null")) > -1 || (cmd.indexOf("wget http")) > -1 || cmd.indexOf("sudo make me a sandwich") > -1) {
      term.echo("<img src='css/newman.gif' /><p />", {raw:true});
        term.resume();
    } else {
      term.echo("command not recognized", {raw:true});
      term.resume();
    }
  }, {
    name: 'producthuntshell',
    greetings: null,
    completion: function(terminal, command, callback) {
      callback(autocomplete);
    },
    onInit: function(term) {
      if (location.search.split('code=')[1]) {
        code = location.search.split('code=')[1];
        window.location.replace("https://producthuntshell.com/auth/user.php?code="+code);
      } else if (location.search.split('token=')[1]) {
        usertoken = location.search.split('token=')[1];
        token = location.search.split('token=')[1];
        $.ajax({ 
          url: 'https://api.producthunt.com/v1/me',
          type: 'GET',
          dataType: 'json',
          beforeSend: function(xhr) { 
            xhr.setRequestHeader("Authorization", "Bearer " + usertoken);
          },
          success: function(data) {
            success = true;
            id = data.user.id;
            auth_user = data.user.username;
            name = data.user.name;
            created_at = data.user.created_at;
            time = moment(created_at).fromNow();
            website_url = data.user.website_url;
            profile_url = data.user.profile_url;
            votes_count = data.user.votes_count;
            posts_count = data.user.posts_count;
            maker_of_count = data.user.maker_of_count;
            followers_count = data.user.followers_count;
            followings_count = data.user.followings_count;
            collections_count = data.user.collections_count;
            notifications_total = data.user.notifications.total;
            notifications_unseen = data.user.notifications.unseen;
            term.set_prompt(auth_user+'@producthunt:~$ ');
            greetings(term);
            line1 = "<div class='post-wrapper'><strong>"+auth_user+"</strong> #"+id+" - ";
            line2 = "<span><a href='https://twitter.com/"+auth_user+"' target='_blank'>@"+ auth_user +"</a> <a href='"+website_url+"' target='_blank'>"+website_url + "</a></span><br />";
            line3 = "<span><strong>" + votes_count + "</strong> votes <strong>" + posts_count + "</strong> submitted <strong>" + maker_of_count + "</strong> made <strong>" + followers_count + "</strong> followers <strong>" + followings_count + "</strong> following</span><p/>";
            user_post = "<div class='parent-post'>" + line1 + line2 + line3 + "</div>";
            term.echo(user_post, {raw:true});
            term.echo("whatup " + auth_user + "!", {raw:true});
            term.resume(); 
          },
          error: function(jqXHR, textStatus, errorThrown) {
            success = false;
            term.echo("<span class='err'>error - you may need to re-authorize product hunt shell by typing login</span>", {raw:true});
            term.resume();
          }
        });
      } else { 
        $.ajax({ 
          url: 'https://producthuntshell.com/auth/',
          type: 'GET',
          success: function(data) {
            success = true;
            token = data;
            term.set_prompt(auth_user+'@producthunt:~$ ');
            greetings(term);
            term.resume();
          },
          error: function(jqXHR, textStatus, errorThrown) {
            success = false;
            term.echo("<span class='err'>error fetching data from product hunt, you may want to refresh</span>", {raw:true});
            term.set_prompt(auth_user+'@producthunt:~$ ');
            term.resume();
          }
        });
      }
    },
    onBlur: function(term) {
      return false;
    },
    keydown: function(e) {
      if (anim) {
        return false;
      }
    }
  });
});