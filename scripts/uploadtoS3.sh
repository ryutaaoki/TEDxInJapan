#set S3 bucket var
if [ -z $1 ]; then
	declare -r S3_BUCKET='v2.tedxenfrance.fr';
else
	declare -r S3_BUCKET=$1;
fi

#copy useful files in ./tmp/ folder
mkdir ./tmp/
rm -r ./tmp/*

cp ./app/index.html ./tmp/
cp ./app/bootstrap.js ./tmp/
mkdir ./tmp/js
mkdir ./tmp/js/lib
cp ./app/js/main.optimized.js ./tmp/js/
cp ./app/js/analytics.js ./tmp/js/
cp ./app/js/lib/*.js ./tmp/js/lib/
cp -r ./app/js/lib/twitter ./tmp/js/lib

cp -r ./app/css ./tmp
cp -r ./app/lang ./tmp
cp -r ./app/layout-img ./tmp
echo "Syncing with $S3_BUCKET"
aws s3 sync ./tmp s3://$S3_BUCKET/ --acl public-read