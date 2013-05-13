Google Script Spreadsheet
=========================

v0.1
----

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
``