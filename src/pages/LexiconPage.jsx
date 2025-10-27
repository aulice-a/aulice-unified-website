 import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { auth, db } from '../firebaseConfig';

import { onAuthStateChanged } from 'firebase/auth';

import { doc, getDoc, updateDoc } from 'firebase/firestore';



const LexiconPage = () => {

  const [user, setUser] = useState(null);

  const [words, setWords] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState('');



  const [searchTerm, setSearchTerm] = useState('');

  const [lookupResult, setLookupResult] = useState(null);

  const [isLookingUp, setIsLookingUp] = useState(false);

  const navigate = useNavigate();



  // Listen for authentication state changes

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);

      if (!currentUser) {

        setWords([]);

        setIsLoading(false);

      }

    });

    return () => unsubscribe();

  }, []);



  // Fetch the user's personal lexicon from Firestore

  useEffect(() => {

    if (user) {

      const fetchLexicon = async () => {

        setIsLoading(true);

        // Targets: /users/{userId}

        const userDocRef = doc(db, 'users', user.uid);

        try {

          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {

            const userData = docSnap.data();

            // Data structure: userDoc.lexicon is a map of {term: {data}}

            const wordsArray = Object.entries(userData.lexicon || {}).map(([term, data]) => ({ term, ...data }));

            setWords(wordsArray);

          }

        } catch (err) { 

          setError("Failed to fetch your lexicon."); 

          console.error(err); 

        }

        setIsLoading(false);

      };

      fetchLexicon();

    }

  }, [user]);



  // Handle looking up a word using a LIVE Dictionary API (with CORS Proxy Fix)

  const handleLookup = async (e) => {

    e.preventDefault();

    const term = searchTerm.trim().toLowerCase();

    if (!term) return;



    setIsLookingUp(true);

    setLookupResult(null);

    setError('');



    try {

      // ✅ CORS FIX: Using a public proxy to bypass local CORS policy

      const proxyUrl = 'https://corsproxy.io/?'; 

      const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${term}`;

      

      const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

      

      if (!response.ok) {

        throw new Error('Word not found');

      }

      const data = await response.json();

      

      const firstMeaning = data[0]?.meanings[0];

      const definition = firstMeaning?.definitions[0]?.definition;

      const example = firstMeaning?.definitions[0]?.example;



      if (definition) {

        setLookupResult({

          term: data[0].word,

          definition: definition,

          example: example || 'No example available.',

          // Retains your existing mock-translation structure

          translation: `(Translation for ${data[0].word})`, 

        });

      } else {

        throw new Error('No definition found');

      }

    } catch (err) {

      setLookupResult(null);

      // Display the dictionary error to the user

      setError(`Sorry, the word "${searchTerm}" could not be found.`);

      console.error("Dictionary API Error:", err);

    }

    setIsLookingUp(false);

  };



  // Handle SAVING the looked-up word to Firebase

  const handleSaveWord = async () => {

    if (!lookupResult || !user) return;

    

    // Targets: /users/{userId}

    const userDocRef = doc(db, 'users', user.uid);

    const newWordData = {

      definition: lookupResult.definition,

      translation: lookupResult.translation,

      example: lookupResult.example,

      status: 'new', // All words start as 'new'

      type: 'general', // Default type is 'general'

      addedAt: new Date(),

    };



    try {

      // Writes to the nested 'lexicon' map in the user document

      await updateDoc(userDocRef, {

        [`lexicon.${lookupResult.term.toLowerCase()}`]: newWordData

      });

      setWords(prevWords => [...prevWords, { term: lookupResult.term.toLowerCase(), ...newWordData }]);

      setSearchTerm('');

      setLookupResult(null);

    } catch (err) {

      setError("Failed to save the word. Check Firestore Rules/Path.");

      console.error(err);

    }

  };

  

  const getStatusColor = (status) => {

    switch (status) {

      case 'mastered': return 'bg-green-500';

      case 'learning': return 'bg-yellow-500';

      case 'new': return 'bg-blue-500';

      default: return 'bg-gray-500';

    }

  };



  return (

    <div className="container mx-auto p-4 md:p-8">

      <header className="text-center mb-12">

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">My Lexicon</h1>

        <p className="text-lg text-gray-600 mt-2">Your personal treasury of professional terms.</p>

      </header>



      {isLoading ? ( <div className="text-center">Loading...</div> ) : 

       !user ? (

        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">

          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>

          <p className="mb-6">Sign in to build your personal lexicon.</p>

          <Link to="/login" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Go to Login Page</Link>

        </div>

      ) : (

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Word Discovery Form */}

          <aside className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-lg h-fit">

            <h2 className="text-2xl font-bold mb-4">Discover a Word</h2>

            <form onSubmit={handleLookup} className="space-y-4">

              <div>

                <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700">Enter a word you want to learn</label>

                <div className="flex gap-2 mt-1">

                  <input 

                    type="text" 

                    id="searchTerm" 

                    value={searchTerm} 

                    onChange={e => setSearchTerm(e.target.value)} 

                    className="w-full p-2 border rounded-md" 

                    placeholder="e.g., knowledge"

                  />

                  <button 

                    type="submit" 

                    disabled={isLookingUp} 

                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300"

                  >

                    {isLookingUp ? '...' : 'Look Up'}

                  </button>

                </div>

              </div>

            </form>



            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

            

            {lookupResult && (

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border">

                <h3 className="text-xl font-bold">{lookupResult.term}</h3>

                <p className="text-lg text-blue-600">{lookupResult.translation}</p>

                <p className="mt-2 text-gray-700">{lookupResult.definition}</p>

                <button 

                  onClick={handleSaveWord} 

                  className="w-full mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"

                >

                  Save to My Lexicon

                </button>

              </div>

            )}

          </aside>



          {/* Word List Display */}

          <main className="w-full lg:w-2/3 bg-white p-6 rounded-2xl shadow-lg">

             <div className="flex justify-between items-center mb-4">

               <h2 className="text-2xl font-bold">Your Saved Words</h2>

               {words.length > 0 && (

                 <button 

                   onClick={() => navigate('/lexicon/practice')} 

                   className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"

                 >

                   Start Practice Session

                 </button>

               )}

             </div>

             {words.length > 0 ? (

                <ul className="space-y-3">

                  {words.map(word => (

                    <li key={word.term} className="p-4 rounded-lg border border-gray-200">

                      <div className="flex justify-between items-center">

                        <div>

                          <h3 className="text-xl font-bold text-gray-800">{word.term}</h3>

                          <p className="text-md text-blue-600">{word.translation}</p>

                        </div>

                        <span className={`px-2 py-1 text-xs text-white rounded-full ${getStatusColor(word.status)}`}>{word.status}</span>

                      </div>

                      <p className="text-gray-600 mt-2">{word.definition}</p>

                      {word.example && <p className="text-gray-500 italic mt-2">"{word.example}"</p>}

                    </li>

                  ))}

                </ul>

             ) : ( <p className="text-gray-500">Your lexicon is empty. Look up a word to get started!</p> )}

          </main>

        </div>

      )}

    </div>

  );

};



export default LexiconPage;