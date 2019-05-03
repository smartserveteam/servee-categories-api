import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  console.log("Event:", event);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    FilterExpression: "contains(skills, :s)",
    ExpressionAttributeValues: {
      ":s": event.pathParameters.id
    }
  };

  try {
    console.log("Params:", params);
    const result = await dynamoDbLib.call("scan", params);
    console.log("Result:", result);
    if (result.Items) {
      // Return the retrieved items
      return success(result.Items);
    } else {
      return failure({ status: false, error: "Items not found." });
    }
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
