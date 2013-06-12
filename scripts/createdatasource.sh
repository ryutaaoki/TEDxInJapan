curl -D id_datasource.txt -v -H "Accept: application/json" -H "Content-type: application/json" -d @paramsdatasource.json http://localhost:40020/api/1/datasource\?apikey\=F1DdeVWE5p%2B8AQylYgsMlRBiKThtX6E1zr6lEDx6i53zIKqnniwjZyeekAck5/Xw

datasourceLine=$(grep "datasource" id_datasource.txt)
echo "\n/***************************************/"
echo "Datasource ID = ${datasourceLine##*/}\n"

rm -f id_datasource.txt
