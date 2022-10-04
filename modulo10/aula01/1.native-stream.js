// process.stdin.pipe(process.stdout).on('data', (msg) => console.log(msg))

// terminal 1
// node -e "require('net').createServer((socket) => socket.pipe(process.stdout)).listen(1338)"
// terminal 2
// node -e "process.stdin.pipe(require('net').connect(1338))"
