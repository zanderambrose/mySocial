import './App.css';
import Header from './components/Header';
import Post from './components/Post';

function App() {
  return (
    <div className="App">
      <Header/>
      <main className="app__Main">
        <Post/>
      </main>
    </div>
  );
}

export default App;
