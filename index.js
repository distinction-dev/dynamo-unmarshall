/**
 * @typedef DynamoUnmarshallOptions
 * @property {import("aws-sdk")} [aws]
 * @property {Array<"NewImage" | "OldImage">} [imageTypes]
 * @property {import("aws-sdk").DynamoDB.DocumentClient.ConverterOptions} [converterOptions]
 */

/**
 * @param {DynamoUnmarshallOptions} options
 * @returns {import("@middy/core").MiddlewareObj}
 */
const dynamoUnmarshall = (options = {}) => {
  options.aws = options.aws || require("aws-sdk");
  options.imageTypes = options.imageTypes || [];
  return {
    before: (request) => {
      /**
       * @type {import("aws-lambda").DynamoDBStreamEvent}
       */
      const event = request.event;
      event.Records = event.Records.map((record) => {
        if (record.dynamodb.NewImage && options.imageTypes.includes("NewImage")) {
          record.dynamodb.NewImage = options.aws.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage, options.converterOptions);
        }
        if (record.dynamodb.OldImage && options.imageTypes.includes("OldImage")) {
          record.dynamodb.OldImage = options.aws.DynamoDB.Converter.unmarshall(record.dynamodb.OldImage, options.converterOptions);
        }
        return record;
      });
    }
  }
}
module.exports = dynamoUnmarshall
