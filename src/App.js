import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as Api from './Api/Api';
import Bookshelf from './Components/Bookshelf';
import SearchScreen from './SearchScreen';
import { Link, Route } from 'react-router-dom'
import Modal from 'react-modal';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};




class BooksApp extends React.Component {


    state = {
        books: [],
       showSearchPage: false,
        query: "" ,
        modalIsOpen: false,
        bookInDetail: null
    }
    openModal = this.openModal.bind(this);
    afterOpenModal = this.afterOpenModal.bind(this);
    closeModal = this.closeModal.bind(this);
    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {

    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    componentDidMount(){
      this.loadBooks();
    }
    async loadBooks(){
        await Api.getAll().then((books) => {

            this.setState({books:books})
        })
    }

    changeBookShelf = (book,shelf) => {
        Api.update(book, shelf);
        book.shelf = shelf;


        console.log("books");

        this.setState(prevState => (
            {books: prevState.books.filter(b => b.id === book.id).length === 0 ? prevState.books.concat(book)  : prevState.books.filter(b => b.id !== book.id).concat(book)}
        ));
    }
    openDetails = (book) => {
        console.log(book);
      this.setState({bookInDetail:book})
      this.openModal();
    }

  render() {
    return (

      <div className="app">
          <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
          >

               <div className={"modal-body"}>

                   <a href={"#"} className={"closeModal"} onClick={this.closeModal}>close</a>
              {this.state.bookInDetail != null &&
                    <div><h2>{this.state.bookInDetail.title}</h2>
                     <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.state.bookInDetail.imageLinks ? this.state.bookInDetail.imageLinks.thumbnail : ""})`}}></div>

                        <p><strong>Subtitle</strong> {this.state.bookInDetail.subtitle}</p>
                     <p><strong>Authors</strong> {(this.state.bookInDetail.authors ? this.state.bookInDetail.authors.join(', ') : "")}</p>
                     <p><strong>Categories</strong> {(this.state.bookInDetail.categories ? this.state.bookInDetail.categories.join(', ') : "")}</p>
                        <p><strong>Description</strong> {this.state.bookInDetail.description}</p>
                        <p><strong>Pages</strong> {this.state.bookInDetail.pageCount}</p>
                        <p><strong>More Informations</strong> <a href={this.state.bookInDetail.infoLink}> click to open </a></p>
                        <p><strong>Preview</strong> <a href={this.state.bookInDetail.previewLink}> click to preview </a></p>

                    </div>
              }

               </div>


          </Modal>
          <Route path="/search" render={({history}) => (
            <SearchScreen  openDetails={this.openDetails}  changeBookShelf={this.changeBookShelf} mybooks={this.state.books} showingBooks={this.state.showingBooks} query={this.state.query}/>
          )}/>
          <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  <Bookshelf openDetails={this.openDetails}  mybooks={this.state.books}   books={this.state.books.filter((book) => (book.shelf==='currentlyReading'))} changeBookShelf={this.changeBookShelf} title={"Currently a Reading"} />
                  <Bookshelf openDetails={this.openDetails}   mybooks={this.state.books}   books={this.state.books.filter((book) => (book.shelf==='wantToRead'))}  title={"Want to Read"}  changeBookShelf={this.changeBookShelf} />
                  <Bookshelf openDetails={this.openDetails}   mybooks={this.state.books}  books={this.state.books.filter((book) => (book.shelf==='read'))}  title={"Read"}  changeBookShelf={this.changeBookShelf} />
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
