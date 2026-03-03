  
// Effect 1 → Load messages on mount
// useEffect(() => {
//   const saved = localStorage.getItem('chatMessages');
//   console.log("Getting chatMessages from localStorage:", saved);
//   if (saved) {
//     try {
//       const parsed = JSON.parse(saved);
//       setChatMessages(parsed);
//     } catch (err) {
//       console.error('Failed to parse chatMessages from localStorage', err);
//       setChatMessages([]);
//     }
//   }
// }, []);

  
// Save messages on local storage
//   useEffect(() => {
//   console.log('chatMessages changed:', chatMessages);
//   localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
// }, [chatMessages]);
