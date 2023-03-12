# Osmosis testnet issue

This tiny example might help folks track down an RPC endpoint issue with: https://testnet-rpc.osmosis.zone

## Instructions

Run:

    npm i
    npm run start

This will build the TypeScript and run the basic app. It tries to connect to two endpoints. The first will succeed with endpoint `https://osmosistest-rpc.quickapi.com` and return the latest block height. The second will throw an error with the endpoint `https://testnet-rpc.osmosis.zone`, and give a stack trace.

At the top of this stack trace is a link to a CosmJS file. Mine looks like this:

```
Failed to create client Error: Data must be JSON compatible dictionary
at parseJsonRpcSuccessResponse (/Users/mikepurvis/other/osmosistestnet-rpc-issue/node_modules/@cosmjs/json-rpc/build/parse.js:95:15)
…
```

If you go into the `parse.js` file you can add this:

```diff
 function parseJsonRpcSuccessResponse(data) {
     if (!(0, compatibility_1.isJsonCompatibleDictionary)(data)) {
+        console.log('hi osmosis folks you rock!', data)
         throw new Error("Data must be JSON compatible dictionary");
     }
     // the rest of it…
 }
```

This will show that HTML is being returned instead of a JSON response as expected.
