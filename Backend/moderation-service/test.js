/* const { runModeration } = require("./src/services/moderation/moderationEngine");

const result = runModeration({
  targetType: "REVIEW",
  text: "You are an idiot and this product is trash",
  imageUrls: []
});

console.log("MODERATION RESULT:");
console.log(result);
 */

 const {google} = require('googleapis');

API_KEY = `AIzaSyDW4r0F-UQ8s2z0-BL1aAOUgDIELN0b8oc`;
DISCOVERY_URL =
    'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

google.discoverAPI(DISCOVERY_URL)
    .then(client => {
      const analyzeRequest = {
        comment: {
          text: 'Jiminy cricket! Well gosh durned it! Oh damn it all!',
        },
        requestedAttributes: {
          TOXICITY: {},
        },
      };

      client.comments.analyze(
          {
            key: API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            console.log(JSON.stringify(response.data, null, 2));
          });
    })
    .catch(err => {
      throw err;
    });