Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command. The data will be automatically seeded into your database.

The project is a standard node.js API using Express.
I chose to use MySQL with TypeORM for the data part because it's clean and efficient given the requirements. This solution should also work for 2 million bands, 10,000 venues, and 200 million events, though it could be a bit slow. 
It's missing some validation on the requests, security, tests and documentation, but I believe that the code is quite self-documenting. I would also add docker, a better error handling especially for the Express part and I would change that date format into ISO.
The filter could also work with venueIds or music types.

Overall the test was nice, simple enough but with diverse challenges and choices on where to focus more.