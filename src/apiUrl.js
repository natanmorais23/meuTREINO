const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://meu-treino-nine.vercel.app/api' 
  : 'http://localhost:5000';  

export default apiUrl;
