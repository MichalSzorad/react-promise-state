# react-promise-state

React component for easier promise handling

## Install

npm

```
npm install --save react-social-login-buttons
```

## Importing

ES6 imports:

```js
import ReactPromiseState from "react-promise-state";
```

## Usage

```js
class App extends Component {
  render() {
    return (
      <div>
        <ReactPromiseState
          run={fetchUsers}
          render={({ run, done, pending, error, result }) => (
            <div>
              <button onClick={run}>Fetch Users</button>
              {pending && <span>loading ...</span>}
              {error && <span>Received an error while fetching users</span>}
              <div>{JSON.stringify(result)}</div>
            </div>
          )}
        />
      </div>
    );
  }
}
```

## Props

### `run` {function} (required)
Will be called when you call run from the render prop

### `render` {function} (required)
Classic render prop

This function will receive an object with following properties

#### `run` {function}
When called will call the promise

#### `done` {Boolean}
True if the promise resolved

#### `pending` {Boolean}
True if the promise is pending

#### `result` {Boolean}
The result of the promise

#### `error` {Boolean}
If the promise fails, this will be the error


## Contribution

I welcome issues, pull requests and new ideas on https://github.com/MichalSzorad/react-promise-state