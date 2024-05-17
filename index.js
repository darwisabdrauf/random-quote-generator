const quoteBox = document.getElementById("quote-box")
const newQuoteBtn = document.getElementById("new-quote-btn")
const tweetQuoteBtn = document.getElementById("tweet-quote-btn")
const colours = ["#F43545", "#FF8901", "#00BA71", "#0041BD", "#5f2879"]
let quote = document.getElementById("quote-text")
let author = document.getElementById("quote-author")
let currentQuote = ""
let currentAuthor = ""

// EVENT LISTENER
newQuoteBtn.addEventListener("click", renderNewQuote)
tweetQuoteBtn.addEventListener("click", tweetQuote)


// FUNCTION
function getRandomQuote() {
    return fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.quotes.length)
            return data.quotes[randomIndex]
        })
        .catch(error => console.log(error))
}

function renderNewQuote() {
    const colourIndex = Math.floor(Math.random() * colours.length)
    quoteBox.style.backgroundColor = colours[colourIndex]

    getRandomQuote().
        then(quotesData => {
            quote.textContent = `"${quotesData.quote}"`
            author.textContent = `- ${quotesData.author}`
            currentQuote = quotesData.quote
            currentAuthor = quotesData.author
        })
}

function tweetQuote() {
    const tweetText = encodeURIComponent(`${currentQuote} - ${currentAuthor}`)
    
    if (currentQuote === "" && currentAuthor === "") {
        window.open("https://twitter.com/intent/tweet?text=Whatever+you+are%2C+be+a+good+one+-+unknown", '_blank')
    } else {
        window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank')
    }
}