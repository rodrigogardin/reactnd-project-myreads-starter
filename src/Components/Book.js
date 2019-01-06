import React, {Component} from 'react'

class Book extends Component {

    change = (event) => {
       var value = event.target.value;
        this.props.changeBookShelf(this.props.book, value)
    }

    render() {

        var haveBookInShelf = "";
        var namesShelfs = {"read":"Read", "currentlyReading": "Current Read", "wantToRead": "Want to Read"};

        if(this.props.searching){

            console.log("this.props");
            console.log(this.props);
            var matchBooks = this.props.mybooks.filter(book => book.id === this.props.book.id);
            haveBookInShelf = matchBooks.length > 0 ? matchBooks[0].shelf !== "none" ? matchBooks[0].shelf : "" : "";
        }


        return (

            <div className='book'>
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ""})`}}></div>
                    {haveBookInShelf.length === 0 &&
                    <div className="book-shelf-changer">
                        <select onChange={this.change}>
                            <option value="move" disabled selected>Move to...</option>
                            {this.props.book.shelf !=='currentlyReading' && <option value="currentlyReading" >Currently Reading</option>  }
                            {this.props.book.shelf !== 'wantToRead' &&<option value="wantToRead">Want to Read</option>}
                            {this.props.book.shelf !== 'read' &&<option value="read">Read</option>}
                            <option value="none">None</option>
                        </select>
                    </div>
                    }
                </div>
                <div className="book-title">{this.props.book.title} <a onClick={()=>{this.props.openDetails(this.props.book)}} className={"link-more-details"}>more details</a> </div>
                <div className="book-authors">{(this.props.book.authors ? this.props.book.authors.join(', ') : "")}</div>
                {haveBookInShelf.length > 0 && <div className={'alert-have-book'}>You have this book on shelf <strong>{namesShelfs[haveBookInShelf]}</strong></div>  }
            </div>
        )
    }
}

export default Book