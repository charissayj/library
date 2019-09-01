const express = require("express");

routes = Book => {
  const bookRouter = express.Router();
  bookRouter
    .route("/books")
    .post((req, res) => {
      const book = new Book(req.body);

      book.save();
      return res.status(201).json(book);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    });

  // use middleware
  bookRouter.use("/books/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) return res.send(err);
      // add the book to the request
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter
    .route("/books/:bookId")
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.read = req.body.read;
      req.book.save(err => {
        if (err) return res.send(err);
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;

      if (req.body._id) {
        delete req.body._id;
      }
      Object.keys(req.body).map(function(key) {
        console.log(key) 
        console.log(req.body[key]);
        book[key] = req.body[key];
      });
      req.book.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if(err) return res.send(err);
        return res.sendStatus(204);
      });
    })

  return bookRouter;
};

module.exports = routes;
