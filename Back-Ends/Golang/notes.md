1. For errors whereby port number is not working / server listening on another port:
You can: run the command `lsof -i :3000 `, then check the PID number, and `kill <PID number>`.
- Or you can chage port number, example: from port `:3000` to port `:3001` to force the server to listen on port `:3000`

2. In order to `lint` your codebase:
The standard is `golangci-lint`, whereby you can install it and have a configuration file called `.golangci.yml` in the root of the project to add the configurations and run `golangci-lint run`.

3. To format your go codebase:
You can use `gofmt -w .` for all files and `gofmt -w file.go` for a single file.

4. For live reloads:
if you wnat something like `nodemon` for `js`, for `go`, you can use `air`, more can be found here: ![Air Github](https://github.com/cosmtrek/air)