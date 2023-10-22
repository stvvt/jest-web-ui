A tool that visualizes in browser a jest test execution in realtime.

> This project in early POC stage.

## How to use
1. Clone the repo
1. Install the dependencies and build the UI
    ```
    $ yarn install
    $ cd app
    $ yarn build
    $ yarn link
    ```

Now navigate to the project with a jest tests (a directory where command `yarn jest` does something) and run:
```
$ jest-web-ui start -p 3000
```
> Note: The command above assumes that your `$PATH` environment variable contains the yarn global bin path. If this is not the case - either add it, or use
> ```
> $ $(yarn global bin)/jest-web-ui start -p 3000
> ```

Finally, navigate to http://localhost:3000 to see the result.