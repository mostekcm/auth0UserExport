# auth0UserExport
## Synopsis

*At the top of the file there should be a short introduction and/ or overview that explains what the project is. This description should match descriptions added for package managers (Gemspec, package.json, etc.)*

This is a User Management Screen that allows you to export your Auth0 users in csv format.  The target user of this system is a business owner of the system that needs access to user information.

## Code Example

*Show what the library does as concisely as possible, developers should be able to figure out how your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.*

## Motivation

*A short description of the motivation behind the creation and maintenance of the project. This should explain why the project exists.*

use case: Auth0 is used by a wide variety of customers. These customers have different types of users logging in to their applications. For each of these users a profile is stored in Auth0 which contains information from the connection (eg: facebook age, work history, …) and additionally custom metadata (eg: app_metadata.subscription: 'premium'). Today the only way to export this information is through our Management API. While this offers lots of flexibility for developers, it's not very useful for business users. Business users working on different marketing campaigns typically want to export a select audience (eg: people older than 21, everyone with a premium subscription, everyone who logged in through facebook, …). This is where a dashboard would be useful that allows you to: 

1. Define a filter (eg: connection == facebook && app_metadata.subscription == premium)
2. Define the columns you want to see after searching (eg: first_name, last_name, age, app_metadata.subscription as subscription)
3. Show the results
4. Optionally also allow the user to export the results to a csv

## Installation

*Provide code examples and explanations of how to get the project.*

## API Reference

*Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.*

## Tests

*Describe and show how to run the tests with code examples.*

## Contributors

*Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.*

## License

*A short snippet describing the license (MIT, Apache, etc.)*
