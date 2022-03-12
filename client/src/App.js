import logo from './logo.svg';
import './App.css';
import GithubTreeView from './components/githubTreeView';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <GithubTreeView/>
    </Provider>
  );
}

export default App;
