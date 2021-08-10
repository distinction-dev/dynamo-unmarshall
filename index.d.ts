import { MiddlewareObj } from '@middy/core';
import AWS from 'aws-sdk';

declare function dynamoUnmarshall(options?: DynamoUnmarshallOptions): MiddlewareObj;
declare namespace dynamoUnmarshall {
    export { DynamoUnmarshallOptions };
}
type DynamoUnmarshallOptions = {
    /**
     * The aws sdk instance
     */
    aws?: typeof AWS | undefined;
    /**
     * The types of images to unmarshall, will only change the ones that were asked and non else
     */
    imageTypes?: ("NewImage" | "OldImage")[] | undefined;
    /**
     * Passed as is to the converter
     */
    converterOptions?: AWS.DynamoDB.DocumentClient.ConverterOptions;
};

export = dynamoUnmarshall
