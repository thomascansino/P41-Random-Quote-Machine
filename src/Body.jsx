import React, { Component } from 'react'
import './Body.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

class Body extends Component {
    constructor (props) {
        super (props);
        this.state = {
            quotes: [],
            quote: '',
            author: '',
        };
    }
    
    randomIndexForQuotes = () => {
        return Math.floor(Math.random() * this.state.quotes.length);
    }

    componentDidMount = () => {
        fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
        .then(res => res.json())
        .then(data => {
            const index = this.randomIndexForQuotes();
            this.setState(state => ({
                quotes: data,
                quote: data[index].quote,
                author: data[index].author,
            }))
        })
        .catch(err => console.error(err));
    }

    handleClick = () => {
        const index = this.randomIndexForQuotes();
        this.setState(state => ({
            quote: state.quotes[index].quote,
            author: state.quotes[index].author,
        }))
    }

    render () {
        
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${this.state.quote}" - ${this.state.author}`)}`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('URL_TO_SHARE')}`;

        return (
            <>
                <div className='main-container' id='quote-box'>
                    <div className='container-1'>
                        <span id='text'><FontAwesomeIcon icon={faQuoteLeft} /> {this.state.quote}</span>
                        <span id='author'>{`- ${this.state.author}`}</span>
                    </div>
                    <div className='container-2'>
                        <div className='buttons'><a id='tweet-quote' href={tweetUrl} target='_blank'><FontAwesomeIcon icon={faTwitter} size='xl' /></a></div>
                        <div className='buttons'><a id='facebook-quote' href={facebookUrl} target='_blank'><FontAwesomeIcon icon={faFacebook} size='xl' /></a></div>
                        <div className='buttons'><button id='new-quote' onClick={this.handleClick}>New quote</button></div>
                    </div>
                </div>
            </>
        );
    }
}

export default Body

