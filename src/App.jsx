import { useState } from 'react';

import ChatContainer from './frontend/ChatContainer';
import NavBar from './frontend/NavBar';
import Spinner from './frontend/Spinner';

function App() {
  const [isUploading, setIsUploading] = useState(false); // for uploading into Supabase
  const [isParsing, setIsParsing] = useState(false); // for parsing the document in RAG Pipeline
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {(isUploading || isParsing) && (
          <div
            style={{
              position: 'fixed', // <-- note: use fixed here
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,

              backgroundColor: '#f0f0f0',
              background: 'rgba(245, 250, 250, 0.6)',
              backdropFilter: 'blur(2px)',
            }}
          >
            <div style={{ marginBottom: '1rem', fontSize: '2rem' }}>
              {isUploading
                ? 'Uploading document...'
                : isParsing
                ? 'Parsing document...'
                : 'Welcome to the Ai-Planet Assistant..'}
            </div>
            <Spinner />
          </div>
        )}
      <NavBar
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        isParsing={isParsing}
        setIsParsing={setIsParsing}
      />
      <ChatContainer />
    </div>
  );
}

export default App;