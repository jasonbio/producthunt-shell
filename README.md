# product hunt shell

product hunt shell is a web based linux shell emulator written in JavaScript that lets you browse and interact with product hunt via command line https://producthuntshell.com/

**Features**

* Browse products, collections, and users.
* Browse post threads/comments and user activity data.
* Scope-based tabbed auto-completion of commands and usernames (double tab for list view)
* Login authentication via OAuth 2
* Retrieve your notifications and account settings
* Display inline thumbnails for products `# set img on`
* Change limit on number of retrieved posts, comments `# set limit [auto|1-100]`
* Command format exceptions that cover most preferences

**Future TO-DO**

* more logged in user actions, voting, commenting
* searching for things

**Example Commands**

* `# list` - list today's featured products
* `# list older` - list yesterday's featured products
* `# view comments 1` - view the comment thread for the specified index
* `# user rrhoover votes` - view posts rrhoover has voted on

## Commands 

* **list**
  * Aliases: **ls, cd**
  * Options:
    * **[older|newer]** - navigate results, can only be used on result set
    * **[..|-|~/]** - common directory nav commands - can only be used with the "cd" alias
 * Description: list today's featured posts
* **list all**
  * Aliases: **ls, cd** 
  * Options:
    * **[older|newer]** - navigate results, can only be used on result set
  * Description: list all posts including ones that didn't get featured
* **collections**
  * Options:
    * **[older|newer]** - navigate results, can only be used on result set
  * Description: list most recent featured collections
* **collections all**
  * Options:
    * **[older|newer]** - navigate results, can only be used on result set
  * Description: list most recent collections from all users
* **view content [index]**
  * Description: opens the link of the specified post index in a new window.
* **view comments [index]**
  * Options:
    * **[older|newer]** - can only be used on result set
  * Description: loads the comments from the specified post index.
* **user**
  * Options:
    * **[username]**
  * Description: gets user information for the specified username
* **user [username] votes**
  * Options:
    * **[older|newer]** - can only be used on result set
  * Description: gets most recent posts the specified user has voted on
* **user [username] posts**
  * Options:
    * **[older|newer]** - can only be used on result set
  * Description: gets most recent posts the specified user has submitted
* **user [username] products**
  * Options:
    * **[older|newer]** - can only be used on result set
  * Description: gets most recent products the specified user has made
* **login**
  * Description: redirects your browser to producthunt.com and requests permission for product hunt shell to load and use user data
* **logout**
  * Description: De-authenticates the currently logged in user
* **notifications**
  * Options:
    * **[older|newer]** - can only be used on result set
  * Description: gets most recent notifications for the currently logged in user
* **settings**
  * Description: list the settings for the current user
* **set**
  * Options:
    * **[images] [on|off]**
      * Aliases: **img**
    * **[limit] [auto|1-100]**
  * Description: Changes settings for user preference. Turning images on will show the inline thumbnail for all products. Limit decides how many results to return for posts and comments. "auto" picks the best limit for your screen resolution without having to scroll (unless viewing a nested comment tree or all featured posts for a day)
* **pwd**
  * Description: Prints working directory
* **clear**
  * Description: Clears the screen
* **about**
  * Description: Displays project info and credits
* **help**
  * Aliases: **cat readme**
  * Description: Displays more detailed instructions

**Libraries**

- [jQuery](https://jquery.com/)
- [Showdown](https://github.com/showdownjs/showdown)
- [JQuery Terminal](http://terminal.jcubic.pl/)
- [Moment.js](http://momentjs.com/)
