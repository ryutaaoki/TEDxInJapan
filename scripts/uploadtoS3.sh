#set S3 bucket var
if [ -z $1 ]; then
	declare -r S3_BUCKET='v2.tedxenfrance.fr';
else
	declare -r S3_BUCKET=$1;
fi

sh ./scripts/build.sh

echo "Syncing with $S3_BUCKET"
aws s3 sync ./tmp s3://$S3_BUCKET/ --acl public-read