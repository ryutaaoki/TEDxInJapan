TEDx Regional Lens Project
==========================

Projet destiné à rassembler toute les conférences TEDx.

How to install ?
----------------

#### 1. Fork this repository
Refer to [Fork a repo](https://help.github.com/articles/fork-a-repo) on [Github Help section](https://help.github.com/)
You have now a version of this repository on **your own computer**.

#### 2. Deploy

- Simply Hosting
  * Open your favorite software for simple hosting
  * Log in your domain name where you want to deploy this web application
  * Put the all the files present in the ```app/``` folder in your ```www/``` or ```htdocs/``` directory.

How to configure ?
------------------

###Datasources
--------------

The essential of the configuration will be made in one only file : ```app/bootstrap.js```
It contains all the necessary code to make calls to the different APIs used in the web application.

First of all, we will create the required content to make the web application run well.

#### 1. Google Spreadsheets

* Go to [Google Drive](https://drive.google.com/) and create a simple and clean google spreadsheet.
* Go in the googlescript directory of your clone repo and copy the content of the file named ```Code.gs```.
* In your google spreadsheet, go to **Tools > Script editor...** in the topbar menu.
* Create a spreadsheet script and replace all the code by the copied code before.
  * To edit the specific country in what you want the TEDx events, just change the code of the country by yours.
    ```javascript

      function run() {
        var COUNTRY_ID = 162; //FRANCE = 162
        ...  
      }
    ```
* Save the code and close it.
* **_Refresh_** or **_close and re-open_** the google spreadsheet you have created.
* You are now able to see a new menu on the topbar menu, called **Update Data**.
* Click on **Update Data > Update TEDx Data**.
* Wait and see ! All the required sheets have been created and all the datas about TEDx events are fill.

- TEDx Events
  
  This sheet represent all the datas about TEDx events present on the "Home" page and "Conferences" page.
  Different columns are displayed with in each header a little note helping you if you want to modify contents.

- TEDx Blacklist Twitter

  It represent the tweets that you want to blacklist/not display on your web application.
  Simply put the URL of the tweet inside the cell and "VOILA!", we make the job automatically.

- TEDx About
  
  It represent the content displayed in the "About TEDx" page. Each line of the spreadsheet represent a paragraph.
  Make your own custom "About" page adding images and their position (left or right).

- Google Spreadsheet URL
  
  After all this steps, your spreadsheet is ready to run with your web application but we miss only one data: the url of the spreadsheet.
  - Go to **File > Publish to the web...**
  - Copy the link of the published spreadsheet somewhere. We will use it below.


-------------

This was for the google spreadsheet, now come back to your bootstrap file (in ```app/bootstrap.js```).
In this file, you will put your custom wishes, like the link of the playlist you want to display on the web app or the different options for your website like the language, the ID of your embedded timeline twitter, the google contact form url and even the link of your advertisement displayed in the footer of each page.  
  
#### 2. Youtube Playlist
  - Check in the **Joshfire.factory.config.datasources** variable. (It's in a JSON format)
  - Find this:
    ```javascript

      "youtube": {
        "name":"Playlist Youtube",
        "db":"operator",
        "col":"updatelinks",
        "query": {
          "filter": {
            "datasources": {
              "main": {
                "name":"Playlist Youtube",
                "db":"youtube",
                "col":"videos",
                "query": {
                  "filter": {
                    "playlist":"http://www.youtube.com/playlist?list=XXXXXXXXXXXXXXXXXXXXXXXXX"
                  },
            ...
        },
      ...
    ```
  As you can see, the line 
  ```javascript
  
    ...
    "playlist":"http://www.youtube.com/playlist?list=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    ...
  ```
  represent the link of your youtube playlist that you want to display on your web application. $
  - Edit it and the changes will be effective immediatly.

#### 3. TEDx spreadhseets
  Take the google spreadsheet URL that you have copied before, we will use it now.
  - In the bootstrap file find these lines (near the beginning of the file):
    - For the page About:
    ```javascript

      ...
      "about":{
        "name":"TEDx About",
        "db":"operator",
        "col":"updatelinks",
        "query":{
          "filter":{
            "datasources":{
              "main":{
                "name":"TEDx About",
                "db":"google",
                "col":"spreadsheets",
                "query":{
                  "filter":{
                    "docid":"https://docs.google.com/spreadsheet/pub?key=XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    "sheetid":3,
                    "usestdmapping":true
                  },
            ...
        },
      ...
      ```
      
    - For the Blacklisted tweets:
      ```javascript
      
      ...
      "blacklist":{
        "name":"TEDx Blacklist",
        "db":"operator",
        "col":"updatelinks",
        "query":{
          "filter":{
            "datasources":{
              "main":{
                "name":"TEDx Blacklist",
                "db":"google",
                "col":"spreadsheets",
                "query":{
                  "filter":{
                    "docid":"https://docs.google.com/spreadsheet/pub?key=XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    "sheetid":2,
                    "usestdmapping":true
                  },
            ...
        },
      ...
      ```
    - For TEDx Events:
      ```javascript
      
      ...
      "tedxevents":{
        "name":"TEDx Events",
        "db":"operator",
        "col":"updatelinks",
        "query":{
          "filter":{
            "datasources":{
              "main":{
                "name":"TEDx Events",
                "db":"google",
                "col":"spreadsheets",
                "query":{
                  "filter":{
                    "docid":"https://docs.google.com/spreadsheet/pub?key=XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    "sheetid":1,
                    "usestdmapping":true
                  },
            ...
        },
      ...
      ```
    - _In each section_ of code, there is a "docid" parameter. **Edit it** with you own google spreadsheet url.
    
#### 4. Twitter Feed for Grabbing

  Check in the ```app/script/``` directory, you will be able to see few files:
  - paramsdatasource.json
  - createdatasource.sh (For Unix users)
  - createdatasource.sh (For Windows users)

#####What we want to do is to create a specific datasource to fill the page containing the twitter flow to grab !
To do so, **you must edit** the ```paramsdatasource.json``` file before running the ```createdatasource``` script in your shell.
the ```paramsdatasource.json``` file looks like this (without comments between /* */):
  ```javascript
  
  {
    "appid": "TEDxFrance",
    "db": "graph",
    "col": "grabbing",
    "filter": {
      "filterItems": true, /* avoid tweets without content to grab */
      "duplicateItems": true /* avoid duplicate tweets referring to the same content */
    },
    "datasources": {
      "main": {
        "db": "operator",
        "col": "updatelinks",
        "filter": {
          "action": "addtarget"
        },
        "datasources": {
          "main": {
            "db": "graph",
            "col": "blacklist",
            "filter": {
  
            },
            "datasources": {
              "source": {
                "db": "operator",
                "col": "updatelinks",
                "filter": {
                  "action": "addtarget"
                },
                "datasources": {
                  "main": {
                    "db": "twitter",
                    "col": "tweets",
                    "filter": {
                      "favorites": false,
                      "oauth_token_secret": "XXXXXXXXXXXXXXXXXXXXXXXXX", /* the following oauth entries are to fill with your access tokens */
                      "oauth_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                      "oauth_consumer_secret": "XXXXXXXXXXXXXXXXXXXXXXXXX",
                      "oauth_consumer_key": "XXXXXXXXXXXXXXXXXXXXXXXXX",
                      "excludereplies": true, /* replies excluded */
                      "excluderetweets": true, /* retweets excluded */
                      "language": "fr", /* your language filter */
                      "search": "#yourhastag_to_search OR #this_hashtag_to_search AND #cats"
                    }
                  }
                }
              },
              "blacklist": {
                "db": "operator",
                "col": "updatelinks",
                "filter": {
                  "action": "addtarget"
                },
                "datasources": {
                  "main": {
                    "db": "google",
                    "col": "spreadsheets",
                    "filter": {
                      "usestdmapping": true,
                      "sheetid": 2,
                      "docid": "https://docs.google.com/spreadsheet/pub?key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  ```
You need a to log in your twitter developper account and take your access token in your created application ([here](https://dev.twitter.com/))

You have now some little things to edit:
  - Twitter feed
    - Fill the "XXX.." by your own access tokens from twitter
    - Edit the other options as you want (excludereplies: true/false | excluderetweets: true/false | language: "fr"/"en"/etc. )
    - The search option is the main option. It represent the hashtag (e.g. #cats) you want to search on tweeter
  - Blacklist (do not forget)
    - Fill the **docid** with the same URL as you did in [section 3 - For the Blacklisted tweets](https://github.com/joshfire/tedxenfrance#3-tedx-spreadhseets)
  - Other options
    At the beginning of the file, you can see two filters:
    ```javascript

    ...
    "filter": {
      "filterItems": true,
      "duplicateItems": true
    },
    ...
    ```
    - filterItems = reject tweets without content to grab
    - duplicateItems = reject tweets referring to the same content already on the feed
    
Now that you have edit the ```paramsdatasource.json``` go to your shell (if you are a Unix user). 
Go to the scripts folder (Unix + Windows users).
##### For Unix users
  ```shell
  
    ./createdatasource.sh
  
  ```
##### For Windows users */
  Double-click on ```createdatasource.bat```
  
If you did all it well, the script returns you an id !
  - Copy this id
  - Go to the ```bootstrap.js``` file
  - Find this code near the beginning of the file like in [section 3](https://github.com/joshfire/tedxenfrance#3-tedx-spreadhseets):
    ```javascript

      ...
      "grabbing":{
        "name":"Grabbing",
        "db":"operator",
        "col":"updatelinks",
        "query":{
          "filter":{
            "datasources":{
              "main":{
                "name":"Grabbing",
                "id":"XXXXXXXXXXXXXXXXXXXXXXX",
                "db":"graph",
                "col":"grabbing",
                "outputType":"Thing",
                "runatclient":false,
                "runtime":"hosted",
                "apikey":"C95fzOziRDbvgTyDy+h4pTMraRVKtBM3JZb7wltM1T0MZOjAR+BptSxlcLCfASgp3BrJX+j+e7zHur5kudnC4w=="
                }
              },
              "action":"addtarget"
            }
          },
          "outputType":"Thing",
          "runatclient":true,
          "runtime":"browser"
        }
        ...
      ```
  - Replace the "XXX..." by the id returned by the script before.
  - Save the file.

The Twitter Feed for Grabbing is done !

----

#### 5. Options
  
  You can also play with some different options for your web application:
  - Find this line in the beginning of your bootstrap file:
    ```javascript

      ...
      config:{
        "app":{
          "id":"5179009abb693502000000a6",
          "icon":null,
          "logo":null,
          "name":"tedxenfrance",
          "version":"1.0"
        },
        "template":{
          "name":"tedxregionallens",
          "version":"0.1.2",
          "options":{
            "language":"fr",
            "url":"http://www.youradvertisement.com/",
            "idwidget":"XXXXXXXXXXXXXXX",
            "ganalytics":"UA-XXXXXXXX-X",
            "contactform":"https://docs.google.com/forms/d/XXXXXXXXXXXXXXXXXXXXXXXXXXXX/viewform"
          },
          "hooks":[
      
          ]
        }
      }
      ...
      ```
      
    As you can see, there is an "options" section in this code. You can modify:
    - the **"language":** following the current syntax
    - the **"url"**: representing the url of the advertisement in the footer of each page
    - the **"idwidget"**: representing the twitter widget created on [Twitter](https://twitter.com/settings/widgets)
    - the **"ganalytics"**: representing the USER ID of your google analytics account
    - the **"contactform"**: represention the URL of the google form created for the contacts (See [section 6](https://github.com/joshfire/tedxenfrance#6-google-contact-form))
    
    You can now play with your own web application based on TEDx events, but wait ! There is still one thing to do.
    You have to add a "contact-us" form to your web application.
    
----
#### 6. Google "Contact" form
    
  To insert a contact form in your web app, you just have to:
  - Create a Google Form on your [Google Drive](https://drive.google.com/)
    - Give a name to your form 
      (we propose to give the following title: "Contact-us" because it will be displayed on your "contact" page)
  - **First question**:
    - Question title: "Give your email address"
    - Question type: "Text"
    - Check the little box saying "Required question"
    - Click on "Done" and click on "Add item"
  - **Second question**:
    - Question title: "Subject"
    - Question type: "Text"
    - Check the little box saying "Required question"
    - Click on "Done" and click on "Add item"
  - **Thrid question**:
    - Question title: "Your message"
    - Question type: "Paragraph text"
    - Check the little box saying "Required question"
    - Click on "Done"
  - Change the confirmation message below if you want. 
  
  Your form is now complete, but not ready.
  
  By clicking on the **"Send Form"** button, a link is generated to share the form with all users.
  **Copy it** and keep it in a corner, we will need it after.
  
  Since we have the google form, we have to configure WHERE we will receive the messages sent by the users.
  For this, in your google form toolbar, click on **"Responses > Choose response destination"**.
  - Check **"New spreadsheet"** and edit the name of the spreadsheet.
  - Click on **"Done"**
  You can see in the toolbar of the google form a button named _"View responses"_.
  - Click on **"View responses"**
  You are now redirect to the new spreadsheet created to receive all the messages that users will send to you.
  
  The next step is to receive an email with the messages sent through the google form by the users.
  
  - Go to **"Tools > Script editor"**
  - Create a script for **"Blank project"**
  - Now, **copy** the code present in ```googlescript/Contact.gs```
  - **Replace all the code** in the google script created.
  
  You have now a google script like this:
    ```javascript
      
      function formulaireContactEmail(e) {
        try {
          var recipient = "your@address.email";
          var timestamp = e.values[0];
          var email = e.values[1];
          var objet = e.values[2];
          var message = e.values[3]
          var body = ' <'+email+'> vous a envoyé le message : '+message;
          var bodyHTML1 = '<p>Le '+timestamp+', <a href="mailto:'+email+'">'+email+'</a> vous a envoyé : </p>';
          var bodyHTML2 = '<blockquote>'+message+'</blockquote>';
          var advancedArgs = {htmlBody:bodyHTML1+bodyHTML2 , replyTo:email};
          MailApp.sendEmail(recipient, objet, body, advancedArgs);
        } catch(e){
          MailApp.sendEmail(recipient, "Error - Formulaire de contact", e.message);
        }
      }
    ```
  Just replace the "your@address.email" by your own destination address email.
  It is not finished yet, don't close your google script page !
####And now, the final step !
  
  The final step consist on create a Trigger to send an email each time that there is a new response sent by an user.

  - In your google script toolbar, go to **"Ressources > Current project's trigger..."**
  - Click on **"No triggers set up. Click here to add one now."**
  After that, you will be able to see a table with two columns and buttons
  - On the first column named "Run", choose the function "formulaireContactEmail"
  - On the second column named "Events":
    - First button: "From spreadsheet"
    - Second button: "On form submit"
  **Make sure to follow these instructions.**
  - Save
  A window appears asking for authorization by the owner of the form. The window must be with green borders. If not, be sure you have fill correctly the previous steps concerning the google form and spreadsheet.
  - Click on "Authorize"
  - Save again

  You google form is now ready to be used.
  
  Just retrieve the link of the form that you copy/paste in a corner later, and replace it in the "options" section of the bootstrap code describe previously in [section 5](https://github.com/joshfire/tedxenfrance#5-options)

----
