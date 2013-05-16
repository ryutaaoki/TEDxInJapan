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

/**
 * Call to the funciton run()
 */ 
function dataTedx() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet();
  if(sheets.getSheets().length <= 1 )
    createSheets();
  run();
}

function createSheets() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet();
  sheets.renameActiveSheet("TEDx Events");
  
  sheets.insertSheet('Blacklist Twitter',1);
  var sheet = sheets.getSheets()[1];
  setHeaders(sheet,["url"]);

  
  sheets.insertSheet('About page Content',2);
  var sheet = sheets.getSheets()[2];
  setHeaders(sheet,["name","articleBody","image","location"]);
  
}

function setHeaders(sheet,columnNames) {
  var headersRange = sheet.getRange(1, 1, 1, columnNames.length);
  headersRange.setValues([columnNames]);
  sheet.setFrozenRows(1);
}
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
  var columnNames = ["name", "image", "url", "latitude", "longitude", "address", "startDate", "availability"];
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
  
  var currentLastRow = sheet.getLastRow();
  var i = 0;
  for(var line = sheet.getLastRow() ; line < (data.tedx_event_locations.length + currentLastRow) ; line++){
    if(!isAlreadyHere(sheet,objects[i],currentLastRow)){
      for(var column = 0 ; column < columnNames.length - 1 ; column++){
        var range = sheet.getRange(line+1, column+1);
        range.setValue(objects[i][columnNames[column]]);
      }
    }
    i++;
  }
  
  sheets.setActiveSheet(sheet);
  sheet.setFrozenRows(1);
  sheet.sort(STARTDATE_COLUMN_NB);
}

function isAlreadyHere(sheet, object, currentLastRow){
  
  for(var i = 2 ; i <= currentLastRow ; i++){
    var range = sheet.getRange(i, 1, 1, 7);
    var values = range.getValues();
    var dateObject = parseDate(object['startDate']);
  
    if(object['name'] == values[0][0] && dateObject.toString() == values[0][6].toString()){
      return true;
    }
  }
}

function parseDate(date) {
  var newDate = date.split("-")[1] + "/" + date.split("-")[2] + "/" + date.split("-")[0];
  newDate = new Date(newDate);
  return newDate;
}

/**
 * Retrieves all the rows in the active spreadsheet that contain data and logs the
 * values for each row.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function readRows() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  for (var i = 0; i <= numRows - 1; i++) {
    var row = values[i];
    Logger.log(row);
  }
};

/**
 * Adds a custom menu to the active spreadsheet, containing a single menu item
 * for invoking the readRows() function specified above.
 * The onOpen() function, when defined, is automatically invoked whenever the
 * spreadsheet is opened.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Read Data",
    functionName : "readRows"
  }];
  sheet.addMenu("Script Center Menu", entries);
};