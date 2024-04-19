// Ai.jsx
import { React, useState } from 'react';
import InputForm from '../components/ai/InputForm';
import '../index.css'; // Import your CSS file

const Ai = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/hello');
        if (!response.ok) {
          throw new Error('Failed to fetch message');
        }
        const data = await response.text();
        setMessage(data);
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="App">
      <div className="w-full">
        <InputForm onSubmit={handleFormSubmit} />
        {message && (
          <div>
            <h2>Your Plan</h2>
            <h2>{message}</h2>
            {/* <pre>{JSON.stringify(plan, null, 2)}</pre> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ai;
