# planning-poker-for-slack <br />

 * [Pre-requisites](#Pre-requisites)
 * [Installation](#Installation)
 * [Examples](#Examples)
 * [Deployment on Heroku](#Deployment on Heroku)


## Pre-requisites
```
1. Node server we will install should be run on ssl encryption.
(e.g. on Heroku https://slack-planning-poker.herokuapp.com . )
2. Go to https://api.slack.com/apps
3. Click on Create New APP
4. Enter all the fields and save the app.
5. Go to App Credential tab and note down client ID and Client Secret key.
6. Go to https://api.slack.com/docs/oauth-test-tokens and get the access_token for your team.
7. User account on Heroku https://www.heroku.com/

```

## Installation
```
1.  git clone git@github.com/ciena-frost/planning-poker-for-slack.git && cd planning-poker-for-slack
2.  In the config/slack-app-key.json enter the client ID and Client Secret key from step 5 of Pre-requisites.
3.  In the config/schedule.json enter the maxPlayTime(Game will automatically stop after this point and result will be published.) and gameInterval(A reminder will be send in channel to vote).
4.  In the config/auth.json enter the access_token from step 6 of Pre-requisites.
5.  In the public/index.html enter client ID from step 5 of Pre-requisites in the href tage of button.
6.  Deploy the app on your web server.(See Deployment on Heroku to deploy your app on heroku)
7.  Go to https://api.slack.com/apps
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
/planning-poker status  JIRA-1234
/planning-poker stop  JIRA-1234

```
##Deployment on Heroku
```
1. Go to https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up install Heroku toolbelt for your OS. It will add Heroku cli on your PATH.
2. cd planning-poker-for-slack
3. heroku login  (it will ask for your credentials, Give your credential set on step 7 of Pre-requisites)
4. heroku create (Create an app on Heroku, which prepares Heroku to receive your source code. A git remote (called heroku) is also created and associated with your local git repository.)
5. git remote (It will show you heroku as remote. Now you are ready to deploy your app to heroku.)
6. git push heroku master (It will push code to heroku and deploy there. In cmd you will get message like : https://slack-planning-poker.herokuapp.com to Heroku. It means your app is deployed to https://slack-planning-poker.herokuapp.com )
### Test deployment status
  1. heroku ps:scale web=1 (It will show status of deployed app running or not)
  2. heroku open (It will open your application root route deployed on browser.)

```

### Testing
1. Run `npm test` from the root of the project to run linting checks as well as integration tests.
