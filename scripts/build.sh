#build the optimized js file
cd ./app/js
node ./lib/joshfire/scripts/optimize.js none ./main false

cd ../..

#copy useful files in ./build folder
mkdir ./build/
rm -r ./build/*

cp ./app/index.html ./build/
cp ./app/bootstrap.js ./build/
mkdir ./build/js
mkdir ./build/js/lib
cp ./app/js/main.optimized.js ./build/js/
cp ./app/js/analytics.js ./build/js/
cp ./app/js/lib/*.js ./build/js/lib/
cp -r ./app/js/lib/twitter ./build/js/lib

cp -r ./app/css ./build
cp -r ./app/lang ./build
cp -r ./app/layout-img ./build