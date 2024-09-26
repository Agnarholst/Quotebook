import { useEffect, useState } from 'react';

type Quote = {
  id: number;
  text: string;
  author: string;
};

function App() {
  // Retrieve quotes from localStorage if avaiable, otherwise use default quotes
  const [quotes, SetQuotes] = useState<Quote[]>(() => {
    const savedQuotes = localStorage.getItem('quotes')
    return savedQuotes ? JSON.parse(savedQuotes) as Quote[]: [
    { id: 1, 
      text:  'If I had to live my life again, I’d make the same mistakes, only sooner.',
      author: 'Tallulah Bankhead'
    },
    { id: 2, 
      text: 'Well done is better than well said.',
      author: 'Benjamin Franklin'
    },
  ];
});

  // State to store the new quote input by the user
  const [newQuote, setNewQuote] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  // Save quote to localStorage whenever the 'quotes' state changes
  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  // Function to handle adding a new quote to the list
  const addQuote = () => {
    if (newQuote.trim()) {
      const newQuoteObj = { 
        id: Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000), // Unique ID 
        text: newQuote,
        author: newAuthor 
      };
      console.log(newQuoteObj)
      SetQuotes([...quotes, newQuoteObj]); // Add the new quote to the array
      setNewQuote(''); // Clear the input field
      setNewAuthor(''); 
    }
  };

  // Function to delete a quote from the list
  const deleteQuote = (id: number) => {
    const updatedQuotes = quotes.filter((quote) => quote.id !== id); // Remove quote with the given id
    SetQuotes(updatedQuotes); // Update state with filtered quotes
  };

  return (
    <div className='App'>
     <h1>Quote List</h1>

     {/* Display the list of quotes */}
     <ul>
      {quotes.map((quote: Quote) => (
        <li key={quote.id}>
            "{quote.text}" - {quote.author}
            <button onClick={() => deleteQuote(quote.id)}>Delete</button>
        </li>
      ))}
      </ul>

      {/* Input to add a new quote */}
      <input 
        type="text"
        value={newQuote}
        onChange={(e) => setNewQuote(e.target.value)} // Update input value
        placeholder='Enter a quote'
      /> 
      <input 
        type="text"
        value={newAuthor}
        onChange={(e) => setNewAuthor(e.target.value)}
        placeholder='author'
      />
      <button onClick={addQuote}>Add Quote</button>
    </div>
  );
}

export default App;
