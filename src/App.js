import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // initialize AWS configuration
      AWS.config.update({
        region: "YOUR_AWS_REGION",
        credentials: new AWS.Credentials("YOUR_ACCESS_KEY_ID", "YOUR_SECRET_ACCESS_KEY")
      });

      // create an instance of DynamoDB
      const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

      // define parameters for the scan operation
      const params = {
        TableName: "YOUR_TABLE_NAME",
      };

      // execute the scan operation
      const result = await dynamodb.scan(params).promise();
      setData(result.Items);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.YOUR_ATTRIBUTE_NAME.S}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
