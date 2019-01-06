import React, {Component} from 'react'
import {Link} from "react-router-dom";
import Book from "./Components/Book";
import * as Api from "./Api/Api";

class SearchScreen extends Component {


    state = {
        showingBooks:[],
        query: ""
    }

    change = (event) => {
        var value = event.target.value;
        this.props.changeBookShelf(this.props.book, value)
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

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to={"/"}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(event)=> this.search(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.showingBooks.length > 0 ? (
                        <ol className="books-grid">

                            {this.state.showingBooks.map((book) => (

                                <li key={book.id}><Book openDetails={this.props.openDetails} mybooks={this.props.mybooks} searching={true} book={book} changeBookShelf={this.props.changeBookShelf}/></li>))}

                        </ol>
                    ):(
                        this.props.query.length > 3 ? "Books with name "+this.props.query+" not found" : ""
                    )}
                </div>
            </div>
        )
    }
}

export default SearchScreen