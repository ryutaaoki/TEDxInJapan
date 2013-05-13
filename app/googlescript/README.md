Google Script Spreadsheet
=========================

v0.1
----

- Create a menu for the spreadsheet.
- Easy way for the user to update datas.
```
/**
 * Create a menu on the spreadsheet allowing update tedx events data
 */
function createMenu(){
  var menuEntries = [
    { name : "Update TEDx Data", functionName : "dataTedx" }
   ];
   SpreadsheetApp.getActiveSpreadsheet().addMenu( "Update Data", menuEntries );
   SpreadsheetApp.getActiveSpreadsheet().removeMenu( "Script Center Menu" );
}
```

- After clicking on the 'Update Data' button in the menu created before, the following code is executed.
```
/**
 * Retrieves all the sources from TEDx API filter by the country ID
 * limited of 30 last tedx events
 * in descending order
 */
function run() {
  
  var COUNTRY_ID = 162; //FRANCE
  var STARTDATE_COLUMN_NB = 7;
  
  var sheets = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = sheets.getSheets()[0];

  var response = UrlFetchApp.fetch("https://api.ted.com/v1/tedx_event_locations.json?api-key=pq5jhs5p89ngfccnnter9ach&country_id="+COUNTRY_ID+"&order=starts_at:desc&limit=30");
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  // This is the data we want to display
  var columnNames = ["name", "image", "url", "latitude", "longitude", "address", "startDate"];
  var headersRange = sheet.getRange(1, 1, 1, columnNames.length);
  headersRange.setValues([columnNames]);
  
  var objects = [];
  for(var i = 0 ; i < data.tedx_event_locations.length ; i++){
    var entry = data.tedx_event_locations[i].tedx_event_location;
    objects[i] = [];
    objects[i][columnNames[0]] = entry.tedx_group_name;
    objects[i][columnNames[1]] = entry.image_url ? entry.image_url : "http://blog.drakecooper.com/wp-content/uploads/2013/04/TEDx_logo_k_RGB_3650.jpg";
    objects[i][columnNames[2]] = "http://www.tedxparis.com";
    objects[i][columnNames[3]] = new String(entry.lat);
    objects[i][columnNames[4]] = new String(entry.lng);
    objects[i][columnNames[5]] = entry.city;
    objects[i][columnNames[6]] = entry.starts_at ? entry.starts_at.split(" ")[0] : entry.updated_at.split(" ")[0];
  }
  
  for(var j = 0 ; j < columnNames.length ; j++) {
    for(var i = 0 ; i < data.tedx_event_locations.length ; i++){
      var range = sheet.getRange(i+2,j+1);
      //uncomment if need to not write on 'url' column
      //if(columnNames[j] != "url")
        range.setValue(objects[i][columnNames[j]]);
    }
  }
  sheet.sort(STARTDATE_COLUMN_NB); // sort the spreadsheet in ascending order following the startDate
}
```