# auth0UserExport
## Synopsis

This is a User Management Screen that allows you to export your Auth0 users in csv format.  The target user of this system is a business owner of the system that needs access to user information.

## Motivation

**use case**: Auth0 is used by a wide variety of customers. These customers have different types of users logging in to their applications. For each of these users a profile is stored in Auth0 which contains information from the connection (eg: facebook age, work history, …) and additionally custom metadata (eg: app_metadata.subscription: 'premium'). Today the only way to export this information is through our Management API. While this offers lots of flexibility for developers, it's not very useful for business users. Business users working on different marketing campaigns typically want to export a select audience (eg: people older than 21, everyone with a premium subscription, everyone who logged in through facebook, …). This is where a dashboard would be useful that allows you to: 

1. Define a filter
1. Define the columns you want to see after searching (eg: first_name, last_name, age, app_metadata.subscription as subscription)
1. Show the results
1. allow the user to export the results to a csv
1. allow the ability to print the results

## Installation

You can view this app at [https://auth0userexport.herokuapp.com]

It is fully usable at that location.  See the "Use Instructions" for how to use it.

If you wish to clone and install follow these steps:
1. Clone the [git repository](https://github.com/mostekcm/auth0UserExport.git)
1. [Install node and npm](http://howtonode.org/how-to-install-nodejs)
1. on a command line: **npm install**
1. [install heroku toolbelt](https://toolbelt.heroku.com/)
1. create a .env file 
1. on a command line: **heroku local web**
1. open a browser to: http://localhost:5000

## Example .env file
**NOTE: Don't check this in!  You will have to configure these environment variables in your heroku app as well if deploying to heroku**
   ```
AUTH0_CLIENT_ID=<your client ID>
AUTH0_CLIENT_SECRET=<your client secret>
AUTH0_DOMAIN=<your subdomain>.auth0.com
   ```

## Use Instructions

1. Go to [https://auth0userexport.herokuapp.com]
1. Log in
1. Click Configure Table
1. Follow instructions

## Contributors

If you want to contribute, make a pull request at [github](https://github.com/mostekcm/auth0UserExport)

## License

MIT -- See LICENSE file