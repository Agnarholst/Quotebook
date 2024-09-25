import { useEffect, useState } from 'react';

function App() {
  // Retrieve quotes from localStorage if avaiable, otherwise use default quotes
  const [quotes, SetQuotes] = useState(() => {
    const savedQuotes = localStorage.getItem('quotes')
    return savedQuotes ? JSON.parse(savedQuotes) : [
    { id: 1, text:  'If I had to live my life again, I’d make the same mistakes, only sooner.'},
    { id: 2, text: 'Well done is better than well said.'},
  ];
});

  // State to store the new quote input by the user
  const [newQuote, setNewQuote] = useState('');

  // Save quote to localStorage whenever the 'quotes' state changes
  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  // Function to handle adding a new quote to the list
  const addQuote = () => {
    if (newQuote.trim()) {
      const newQuoteObj = { id: quotes.length + 1, text: newQuote };
      SetQuotes([...quotes, newQuoteObj]); // Add the new quote to the array
      setNewQuote(''); // Clear the input field
    }
  };


  return (
    <div className='App'>
     <h1>Quote List</h1>

     {/* Display the list of quotes */}
     <ul>
      {quotes.map((quote) => (
        <li key={quote.id}>{quote.text}</li>
      ))}
      </ul>

      {/* Input to add a new quote */}
      <input 
        type="text"
        value={newQuote}
        onChange={(e) => setNewQuote(e.target.value)} // Update input value
        placeholder='Enter a quote'
      /> 
      <button onClick={addQuote}>Add Quote</button>
    </div>
  );
}

export default App;
