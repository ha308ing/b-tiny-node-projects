## Requests

### POST

`curl -X POST -d 'title=Book Title&author=Book Author' http://localhost:3000/api/books`

### GET

`curl http://localhost:3000/api/books/1`

### PUT

`curl -X PUT -d "title=New Title&author=New Author" http://localhost:3000/api/books/1

### DELETE

`curl -X DELETE http://localhost:3000/api/books/1`
