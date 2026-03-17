import googleIt from 'google-it'

const accountSid = 'AC5bbc96d5b1f4bde0c6e1e5bd4531ac7c';
const authToken = '8101c87718e54f2da2aa6ab4bedb24b1';
const client = require('twilio')(accountSid, authToken);

export const handler = async (event) => {

  try {
    query = JSON.parse(event.body).query
    id = JSON.parse(event.body).id

    return googleIt({ 'query': `site:linkedin.com/in intitle:"${query}"` }).then(users => {
      users.map(user => {
        fullTitle = user.title.split('-')

        expertName = fullTitle[0]

        client.messages
          .create({
            to: '+15149477075',
            from: '+19257226259',
            body: `Hi ${expertName}! We're contacting you from 'Time2Vote' and we need your feedback! Please click on this link to tell us more: http://localhost:8888/feedback/${id}`
          })
          .done();
      })

      return {
        statusCode: 200,
        body: "Success",
      }
    }).catch(e => {
      console.log("error")
    })
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}