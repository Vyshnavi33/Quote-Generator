
 const quoteContainer = document.getElementById('quote-container');
 const quoteText = document.getElementById('quote'); 
 const authorText = document.getElementById('author'); 
 const twitterBtn = document.getElementById('twitter'); 
 const newQuoteBtn = document.getElementById('new-quote'); 

 

 let apiQuotes = [];

//Show new quote
function newQuote(){
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
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
    quoteText.textContent=quote.text;
}

// Get Quotes From API
async function getQuotes(){
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
