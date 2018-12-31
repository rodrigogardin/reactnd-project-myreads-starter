import React, {Component} from 'react'

class Book extends Component {

    change = (event) => {
       var value = event.target.value;
        this.props.changeBookShelf(this.props.book, value)
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ""})`}}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.change}>
                            <option value="move" disabled selected>Move to...</option>
                            {this.props.book.shelf !=='currentlyReading' && <option value="currentlyReading" >Currently Reading</option>  }
                            {this.props.book.shelf !== 'wantToRead' &&<option value="wantToRead">Want to Read</option>}
                            {this.props.book.shelf !== 'read' &&<option value="read">Read</option>}
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{(this.props.book.authors ? this.props.book.authors.join(', ') : "")}</div>
            </div>
        )
    }
}

export default Book