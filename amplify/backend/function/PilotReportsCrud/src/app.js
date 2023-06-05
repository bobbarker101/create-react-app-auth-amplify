/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require('aws-sdk');
//const sns = new AWS.SNS();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const _ = require('lodash');

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

const path = '/pilot/reports';
console.log(path);

let tableName = "V5_DIM_Reports";
if(process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-master'; //+ process.env.ENV;
}
// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get(path, function(req, res) {
  var params = {
    TableName: tableName,
      FilterExpression: 'SK_startEpochTime > :num',
      ExpressionAttributeValues: {
          ':num': 2020010120200131
      }
  };
  var returnData = {
    data:  {},
    count: 0,
    reportsTotal: 0,
    totalPerMonth:{},
    messagesPerMonth: {}
  };
  console.log("Scanning senders table. ");
  console.log(params);
  dynamodb.scan(params, onScan);

  function onScan(err, data) {
    if (err) {
      console.error("Unable to scan the table. Error JSON: ", JSON.stringify(err, null, 2));
    } else {
      // print all the movies
      console.log("Scan succeeded. ");

      data.Items.forEach(function(item) {
        returnData.totalPerMonth[item.SK_startEpochTime] = returnData.totalPerMonth[item.SK_startEpochTime] || 0;
        returnData.totalPerMonth[item.SK_startEpochTime] += item.total ? item.total : 0;
          returnData.profitTotal[item.SK_startEpochTime] = returnData.profitTotal[item.SK_startEpochTime] || 0;
          returnData.profitTotal[item.SK_startEpochTime] += item.profitTotal ? item.profitTotal : 0;
          returnData.messagesPerMonth[item.SK_startEpochTime] = returnData.messagesPerMonth[item.SK_startEpochTime] || 0;
          returnData.messagesPerMonth[item.SK_startEpochTime] += item.messageCount ? item.messageCount : 0;
        returnData.data[item.PK_userId] = returnData.data[item.PK_userId] || [];
        returnData.data[item.PK_userId].push(item);
        returnData.count++;
        returnData.reportsTotal += item.total;
      });
      // continue scanning if we have more movies, because
      // scan can retrieve a maximum of 1MB of data
      if (typeof data.LastEvaluatedKey !== "undefined") {
        //  console.log("Scanning for more...");
        params.ExclusiveStartKey = data.LastEvaluatedKey;
        dynamodb.scan(params, onScan);
      }else{
          returnData.totalPerMonth = Object.keys(returnData.totalPerMonth).sort().reduce(
              (obj, key) => {
                  obj[key] = returnData.totalPerMonth[key];
                  return obj;
              },
              {}
          );
          returnData.messagesPerMonth = Object.keys(returnData.messagesPerMonth).sort().reduce(
              (obj, key) => {
                  obj[key] = returnData.messagesPerMonth[key];
                  return obj;
              },
              {}
          );
        //returnData.data = _.keyBy(returnData.data, 'PK_userId');
        console.log(returnData);
        res.json(returnData);
      }
    }
  }
});

/****************************
* Example post method *
****************************/

app.get(path+'/monthtotal', function(req, res) {
  // Add your code here

    let m = new Date().getMonth() + 1;
    let y = new Date().getFullYear();
    let start_date = moment(m+"/"+y, "M/YYYY").toISOString();
    let end_date = moment(m+"/"+y, "M/YYYY").endOf('month').toISOString();
    var params = {
        ExpressionAttributeValues: {
            ':s': 2,
            ':e': 9,
            ':topic': 'PHRASE'
        },
        KeyConditionExpression: 'Season = :s and Episode > :e',
        FilterExpression: 'contains (Subtitle, :topic)',
        TableName: tableName
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Items);

            let lm = (new Date()).getMonth() === 0 ? 12 : (new Date()).getMonth();
            let ly = (new Date()).getMonth() === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear();
            let lstart_date = moment(lm+"/"+ly, "M/YYYY").toISOString();
            let lend_date = moment(lm+"/"+ly, "M/YYYY").endOf('month').toISOString();
            var params = {
                ExpressionAttributeValues: {
                    ':s': 2,
                    ':e': 9,
                    ':topic': 'PHRASE'
                },
                KeyConditionExpression: 'Season = :s and Episode > :e',
                FilterExpression: 'contains (Subtitle, :topic)',
                TableName: tableName
            };

            docClient.query(params, function(err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log("Success", data.Items);
                }
            });
        }
    });

  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
