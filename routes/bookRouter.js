const express = require("express");

routes = (Book) => {
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

  bookRouter.route("/books/:bookId").get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) return res.send(err);
      return res.send(book);
    });
  });

  return bookRouter;
}

module.exports = routes;