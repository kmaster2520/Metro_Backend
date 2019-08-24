# Metro Backend

The back end of the Metro sample app is implemented in Node.

## Instructions For Running

### Setting Up The Environment

Create a file called `development.json` in the config folder that looks like this:
```
{
  "development": true,
  "mongoDB_info": {
    "user": "",
    "password": "",
    "database": "
  },
  "admin_info": {
    "user": "",
    "password": ""
  },
  "jwt": {
    "secret": "",
    "lifespan": 0
  }
}
```
Fill in the values with database information.    

If `NODE_ENV` is not set, then `development.json` will be used to configure the app,
but you can type `export NODE_ENV=[env_name]` to choose the environment. Replace
`export` with `set` for Windows users.

### Running The App

To run the app simply type `node index.js` and send all requests
to `localhost:3000`. The port is different for a production environment