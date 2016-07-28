# planning-poker-for-slack <br />

 * [Pre-requisites] (#Pre-requisites)
 * [Installation](#Installation)
 * [Examples](#Examples)


## Pre-requisites
```
1. Node server we will install should be run on ssl encryption.
(e.g. on Heroku https://slack-planning-poker.herokuapp.com . )
2. GO to https://api.slack.com/apps
3. Click on Create New APP
4. Enter all the fields and save the app.
5. Go to App Credential tab and note down client ID and Client Secret key.
6. Go to https://api.slack.com/docs/oauth-test-tokens and get the access_token for your team.

```

## Installation
```
1.  git clone git@github.com/ciena-frost/planning-poker-for-slack.git
2.  In the config/slack-app-key.json enter the client ID and Client Secret key from step 5 of Pre-requisites.
3.  In the config/schedule.json enter the maxPlayTime(Game will automatically stop after this point and result will be published.) and gameInterval(A reminder will be send in channel to vote).
4.  In the config/auth.json enter the access_token from step 6 of Pre-requisites.
5.  In the public/index.html client ID in the href tage of button.
6.  npm start      # It will start your express server. Say our server is running on URL(https://slack-planning-poker.herokuapp.com)
7.  GO to https://api.slack.com/apps
8.  Edit the app created in step 3 of Pre-requisites.
9.  Go to Slash commands tab and click Create new commands.
10. Enter command as /planning-poker
11. In the Request URL enter the URL as URL/start (e.g. https://slack-planning-poker.herokuapp.com/start).
12. Save the App.
13. Open the root route for the deployed server on browser.(say https://slack-planning-poker.herokuapp.com/)
14. Click on 'add_to_slack' button.
15. Authorize the APP.
16. App will be installed in your slack team.

```
## Examples
```
/planning-poker start JIRA-1234
/planning-poker stop  JIRA-1234

```

### Testing
1. In tests/it/spec.js enter the access_token from step 6 of Pre-requisites in the token.
2. Run `npm test` from the root of the project to run linting checks as well as integration tests.
