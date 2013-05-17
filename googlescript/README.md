Google Script Spreadsheet v0.2
==============================

How to generate TEDxEnFrance spreadsheet
-------------------------------------
- Create a new Spreadsheet
- Go to **Tools > Script Editor**

And this moment, a small window appears, just close it.

- Copy past the Google script present on the **Code.gs** file.
- Save it.

The google script is now linked to your new spreadsheet.
Now, come back to your empty spreadhseet.

- Go to **Tools > Script Manager**
- Click on **createMenu** function
- Click on **Run** button
- Close the **Script Manager** window

A new menu is now available on the toolbar of your spreadsheet.

- Click on this new menu called **Update Data**
- Click on **Update TEDx Data**
- Just wait, and see the TEDx events appears.

Share the spreadsheet
---------------------
Share the spreadsheet with the administrators of yoru website. Invite them by entering their emails from the `Share` button at top right (they should have a Google Account associated with this email)

Manage the spreadsheet
----------------------

Take care of the little notes in each headers of the different sheets, that show you some information about what is the required data format asked.

Do not forget that if you do any mistake, Google keeps in memory the different versions of your spreadsheet. See File > See Revision History.

If you take a look at the bottom of the spreadsheet, the script that you have run, has created three sheets in your spreadsheet:
  + TEDx Events
  + Blacklist Twitter
  + About Page Content

#### TEDx Events :
Represents the sheet with all datas about TEDx Events. This list is automatically generated from the TEDx Events API. You should edit manually the imported data.

If you want to remove an event from your website, you have to delete its line in the spreadsheet.

##### Updating the Events list
The Events list can be updated by importing the new data from the TEDx Events API. The data already in your spreadsheet will never be erased.
Follow the previous steps to create the **Update TEDx Data** menu, then click on **Update TEDx Data**. new TEDxEvents will be appended at the bottom of your Events list.

#### Blacklist Twitter :
Represents the list of tweets that you want to blacklist from your web app TEDxEnFrance.

#### About Page Content :
Represent the content of the "About TEDxEnFrance" page in the web app.


