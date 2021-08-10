# Middy error-logger middleware

<div align="center">
  <img alt="Middy logo" src="https://raw.githubusercontent.com/middyjs/middy/main/docs/img/middy-logo.png"/>
</div>

<div align="center">
  <p><strong>
    Dynamo DB Stream event data parser for the middy framework, like json body parser but for dynamodb stream events
  </strong></p>
</div>
Simply uses AWS sdk's DynamoDB Document Client Converter to  convert the data received in the New/Old Image of all records to plain json.

## Why?
Taking inspiration from Json Body Parser, we decided to export this simple middleware we built

## Install
To install this middleware you can use NPM:

```bash
npm install --save @distinction-dev/dynamo-unmarshall
```

## Sample usage

```javascript
const middy = require('@middy/core');
const dynamoUnmarshall = require('@middy/error-logger');

const handler = middy((event, context) => {
  // your handler logic
})

handler
  .use(dynamoUnmarshall())
```

## Options
- `aws` property: The instance of the `aws-sdk`, If none is provided then it will simply import it.

- `imageTypes` property: An array providing which image types to convert can only contain `"NewImage", "OldImage"`.

- `converterOptions` property: The options that you wanna pass to the DynamoDB converter.

## License
Licensed under [MIT License](LICENSE).
