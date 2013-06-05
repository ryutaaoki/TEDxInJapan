TEDx Regional Lens Project
==========================

Projet destiné à rassembler toute les conférences TEDx.

How to install ?
----------------

#### 1. Fork this repository
Refer to [Fork a repo](https://help.github.com/articles/fork-a-repo) on [Github Help section](https://help.github.com/)
You have now a version of this repository on **your own computer**.

#### 2. Deploy
- Github Pages:
  { Coming soon... }

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

#### 2. Twitter Feed
  {Soon...}

#### 3. Youtube Playlist
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
                  "options": {}
                },
                "runatclient":true,
                "missingKeys":[],
                "outputType":"VideoObject",
                "runtime":"browser"
              }
            },
            "action":"addtarget"
          }
        },
        "outputType":"VideoObject",
        "runatclient":true,
        "runtime":"browser"
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

#### 4. TEDx spreadhseets
  Take the google spreadsheet URL that you have copied before, we will use it now.
  - In the bootstrap file find these lines:
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
                  "options":{
    
                  }
                },
                "runatclient":true,
                "missingKeys":[
    
                ],
                "outputType":"Article",
                "runtime":"browser"
              }
            },
            "action":"addtarget"
          }
        },
        "outputType":"Article",
        "runatclient":true,
        "runtime":"browser"
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
                  "options":{
    
                  }
                },
                "runatclient":true,
                "missingKeys":[
    
                ],
                "outputType":"Article",
                "runtime":"browser"
              }
            },
            "action":"addtarget"
          }
        },
        "outputType":"Article",
        "runatclient":true,
        "runtime":"browser"
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
                  "options":{
    
                  }
                },
                "runatclient":true,
                "missingKeys":[
    
                ],
                "outputType":"Article",
                "runtime":"browser"
              }
            },
            "action":"addtarget"
          }
        },
        "outputType":"Article",
        "runatclient":true,
        "runtime":"browser"
      }
      ...
      ```
    - _In each section_ of code, there is a "docid" parameter. **Edit it** with you own google spreadsheet url.
    
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
    - the "language": following the current syntax
    - the "url": representing the url of the advertisement in the footer of each page
    - the "idwidget": representing the twitter widget created on [Twitter](https://twitter.com/settings/widgets)
    - the "ganalytics": representing the USER ID of your google analytics account
    - the "contactform": represention the URL of the google form created for the contacts
    
    You can now play with your own web application based on TEDx events.
    
----
#### 6. Google "Contact" form
    
----
----

{ License ... }
