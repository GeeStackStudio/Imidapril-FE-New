rm -rf ./src/scaffold
openapi-generator generate \
 -i http://localhost:5002/swagger/v1/swagger.json \
 -o src/scaffold \
 -g typescript-axios \
 --additional-properties=allowUnicodeIdentifiers=true,enumPropertyNaming=original,supportsES6=true,useSingleRequestParameter=true
