import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as Api from './Api/Api';
import Bookshelf from './Components/Bookshelf';
import Book from './Components/Book';
import { Link, Route } from 'react-router-dom'
class BooksApp extends React.Component {

    state = {
      books: [],
      showSearchPage: false,
       query: "" ,
        showingBooks:[]
    }
    componentDidMount(){
      this.loadBooks();
    }
    loadBooks(){
        Api.getAll().then((books) => {
            this.setState({books:books})
        })
    }
    search(query){
        this.setState({query: query.trim()})
        if (this.state.query.length===0) {
            this.setState({showingBooks:[]})
        } else {
            Api.search(this.state.query, 20).then( (books) => {
                console.log(books);
                if ((books!==undefined)) {
                    this.setState({showingBooks:books})
                }else{
                    this.setState({showingBooks:[]})
                }
            })
        }
    }
    changeBookShelf = (book,shelf) => {
        var books = this.state.books;
        Api.update(book, shelf).then((response) => {
            var newBook = true;
            books.forEach(function(bk, index){
                if(bk.id === book.id){
                    bk.shelf = shelf;
                    books[index] = bk;
                    newBook = false;
                }
            });
            if(newBook){
                book.shelf = shelf;
                books.push(book)
            }

            this.setState({books: books, showSearchPage:false});
        })
    }

  render() {
    return (
      <div className="app">
          <Route path="/search" render={({history}) => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to={"/"}>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event)=> this.search(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
                {this.state.showingBooks.length > 0 ? (
                <ol className="books-grid">

                    {this.state.showingBooks.map((book) => (
                        <li key={book.id}><Book book={book} changeBookShelf={this.changeBookShelf}/></li>))}

                </ol>
                ):(
                    this.state.query.length > 3 ? "Books with name "+this.state.query+" not found" : ""
                )}
            </div>
          </div>
          )}/>
          <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  <Bookshelf books={this.state.books.filter((book) => (book.shelf==='currentlyReading'))} changeBookShelf={this.changeBookShelf} title={"Currently a Reading"} />
                  <Bookshelf  books={this.state.books.filter((book) => (book.shelf==='wantToRead'))}  title={"Want to Read"}  changeBookShelf={this.changeBookShelf} />
                  <Bookshelf books={this.state.books.filter((book) => (book.shelf==='read'))}  title={"Read"}  changeBookShelf={this.changeBookShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" onClick={()=>{this.setState({showingBooks:[], query: ""})}}>Add a book</Link>
            </div>
          </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp
