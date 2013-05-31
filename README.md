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
* Refresh the google spreadsheet you have created.
* You are now able to see a new menu on the topbar menu, called **Update Data**.
* Click on **Update Data > Update TEDx Data**.
* 
- TEDx Events

  {Soon...}

- TEDx Blacklist Twitter

  {Soon...}

- TEDx About

  {Soon...}

#### 2. Twitter Feed
  {Soon...}

#### 3. Youtube Playlist
  {Soon...}

#### 4. Blacklist
  {Soon...}

#### 5. Grabbing
{Soon...}
