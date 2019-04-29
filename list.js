import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    // Return the list of items in response body
    return success(result.Items.sort((a, b) => {
      var nameA = a.label.toUpperCase(); // ignore upper and lowercase
      var nameB = b.label.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    }));
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
