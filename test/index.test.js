const Chance = require("chance");
const chance = new Chance();
const { expect } = require("chai");

const dynamoUnmarshall = require("../index");

const testObj = {
    name: chance.name(),
    num: chance.integer(),
    listString: chance.guid(),
    date: new Date().toISOString(), 
}
const TEST_IMAGE = {
    "uuidList": {
        "L": [
            {
                "S": testObj.listString
            },
            {
                "S": testObj.listString
            }
        ]
    },
    "num": {
        "N": testObj.num
    },
    "name": {
        "S": testObj.name
    },
    "date": {
        "S": testObj.date
    }
}
const TEST_EVENT = {
    Records: [{
        "eventName": "MODIFY",
        "eventVersion": "1.1",
        "eventSource": "aws:dynamodb",
        "awsRegion": "us-west-2",
        "dynamodb": {
            "NewImage": TEST_IMAGE,
            "OldImage": TEST_IMAGE,
            "StreamViewType": "NEW_AND_OLD_IMAGES"
        },
    }]
}

describe("Test that the event will be parsed and converted", () => {
    it("Will be parsed with or without providing aws sdk", () => {
        const middleware = dynamoUnmarshall({
            imageTypes: [
                "NewImage",
                "OldImage"
            ]
        });
        const request = {event: TEST_EVENT};
        // @ts-ignore
        middleware.before(request);
        expect(request.event.Records[0].dynamodb.NewImage.name).to.equal(testObj.name);
        expect(request.event.Records[0].dynamodb.NewImage.num).to.equal(testObj.num);
        expect(request.event.Records[0].dynamodb.NewImage.date).to.equal(testObj.date);
        expect(request.event.Records[0].dynamodb.OldImage.name).to.equal(testObj.name);
        expect(request.event.Records[0].dynamodb.OldImage.num).to.equal(testObj.num);
        expect(request.event.Records[0].dynamodb.OldImage.date).to.equal(testObj.date);
    });
});
