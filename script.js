
 const quoteContainer = document.getElementById('quote-container');
 const quoteText = document.getElementById('quote'); 
 const authorText = document.getElementById('author'); 
 const twitterBtn = document.getElementById('twitter'); 
 const newQuoteBtn = document.getElementById('new-quote'); 
 const loader = document.getElementById('loader');

 

 let apiQuotes = [];

 function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
 }

function removeLoadingSpinner(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

//Show new quote
function newQuote(){
    showLoadingSpinner();
    //Pick a random quote from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //Check if author field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent='Unknown';
    }else{
        authorText.textContent=quote.author;
    }
    //Check Quote length to determine styling
    if(quote.text.length>1200) {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent=quote.text;
    removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    }catch(error){
        // Catch error here
    }
}

function tweetQuote(){
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterUrl, '_blank');

}
//EVent listeners

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);


// On Load
getQuotes();
