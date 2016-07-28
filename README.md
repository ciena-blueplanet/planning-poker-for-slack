# planning-poker-for-slack <br />

 * [Pre-requisites] (#Pre-requisites)
 * [Installation](#Installation)
 * [API](#API)
 * [Examples](#Examples)
 * [Restart app server](#Restart)


## Pre-requisites
```
Node server we will install should be run on ssl encryption.
(e.g. on Heroku https://slack-planning-poker.herokuapp.com . )
GO to https://api.slack.com/apps
Click on Create New APP
Enter all the fields and save the app.
Go to App Credential tab and note down client ID and Client Secret key.

```

## Installation
```
git clone git@github.com/ciena-frost/planning-poker-for-slack.git
In the config/slack-app-key.json enter the client ID and Client Secret key.
In the config/schedule.json enter the maxPlayTime(Game will automatically stop after this point and rsult will be published.) and gameInterval(A reminder will be send in channel to vote).
In the public/index.html client ID in the href tage of button.
npm start      # It will start your express server. Say our server is running on URL(https://slack-planning-poker.herokuapp.com)
GO to https://api.slack.com/apps
Edit the app craeted in the Pre-requisites step.
Go to Slash commands tab and click Create new commands.
Enter command as /planning-poker
In the Request URL enter the URL as URL/start (e.g. https://slack-planning-poker.herokuapp.com/start).
Save the App.
Open the root route for the deployed server on browser.(say https://slack-planning-poker.herokuapp.com/)
Click on 'add_to_slack' button.
Authorise the APP.
App will be installed in your slack team.

```
## API
Not applicable at the moment.

## Examples
```
/planning-poker start JIRA-1234
/planning-poker stop  JIRA-1234

```

## Restart
```
On Authorising the app while installation on team . App server updates its config/auth.json file with the auth token given by slack server.
This Auth token is used in application for many flow with out which app will not work as expected.
So if user want to restart its node server user has 2 ways to do that
 --- Restart the app on cloud. Uninstall the app from slack team on (e.g. https://orchestraion-india.slack.com/apps) . Again install the app in team as given in Installation step.
 --- Replace the auth.json(containing the auth token value) file in config folder in new cloud instance so that app can use this auth token.

```

### Testing
Run `npm test` from the root of the project to run linting checks as well as integration tests.
