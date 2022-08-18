/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "V5_DIM_Tnc";
if(process.env.ENV && process.env.ENV !== "NONE") {
    tableName = tableName + '-master'; //+ process.env.ENV;
}
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/pilot/tnc', function(req, res) {
    var params = {
        TableName: tableName,
        FilterExpression: '#e = :e',
        ExpressionAttributeNames: {
            '#e': 'enabled',
        },
        ExpressionAttributeValues: {
            ':e': true,
        },
    };
    var returnData = [];
    console.log("Scanning senders table. ");
    console.log(params);
    dynamodb.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON: ", JSON.stringify(err, null, 2));
        } else {
            // print all the movies
            console.log("Scan succeeded. ");
            returnData = [...returnData, ...data.Items];
            // continue scanning if we have more movies, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey !== "undefined") {
                //  console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                dynamodb.scan(params, onScan);
            }else{
                //returnData.data = _.keyBy(returnData.data, 'PK_userId');
                console.log(returnData);
                res.json(returnData);
            }
        }
    }
});



/****************************
* Example put method *
****************************/

app.post('/pilot/tnc', function(req, res) {
  // Add your code here
    console.log(req.body);

    const params = {
        TableName: tableName,
        Item: req.body,
    };

    dynamodb.put(params, function(err) {
        if (err) {
            console.error("Unable to add movie", err);
            res.json({error: err});
        } else {
            console.log(`Added to table`);
            res.json({body: "Item has been added to data base."})
        }
    });

});



/****************************
* Example put method *
****************************/

app.put('/pilot/tnc', function(req, res) {
  // Add your code here
    const params = {
        TableName: tableName,
        Key: {
            "PK_senderId": req.body.PK_senderId,
            "SK_epochTime": req.body.SK_epochTime
        },
        UpdateExpression: "set companyName = :companyName, description = :description, #keyword = :keyword, logoUrl = :logoUrl, privacyPolicyUrl = :privacyPolicyUrl, supportEmail = :supportEmail",
        ExpressionAttributeNames: {
            "#keyword": "keyword"
        },
        ExpressionAttributeValues: {
            ":companyName": req.body.companyName,
            ":description": req.body.description,
            ":keyword": req.body.keyword,
            ":logoUrl": req.body.logoUrl,
            ":privacyPolicyUrl": req.body.privacyPolicyUrl,
            ":supportEmail": req.body.supportEmail
        }
    };

    dynamodb.update(params, function(err) {
        if (err) {
            console.error("Unable to add movie", err);
            res.json({error: err});
        } else {
            console.log(`updated to table`);
            res.json({body: "Item has been updated."})
        }
    });
});



/****************************
* Example delete method *
****************************/

app.delete('/pilot/tnc', function(req, res) {
  // Add your code here
    const params = {
        TableName: tableName,
        Key: {
            "PK_senderId": req.body.PK_senderId,
            "SK_epochTime": req.body.SK_epochTime
        },
        UpdateExpression: "set #enabled = :x",
        ExpressionAttributeNames: {
            "#enabled": "enabled"
        },
        ExpressionAttributeValues: {
            ":x": false
        }
    };

    dynamodb.update(params, function(err, data) {
        if (err) {
            console.error("Unable to add movie", err);
            res.json({error: err});
        } else {
            console.log(`deleted to table`);
            res.json({body: "Item has been deleted."})
        }
    });

});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
