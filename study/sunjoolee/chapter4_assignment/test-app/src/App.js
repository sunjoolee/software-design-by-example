import './App.css';
import CounterButton from './presentationContainerPattern/CounterButton';
import VacCounterButton from './VACPattern/CounterButton';

function App() {
  return (
    <div className="App">
      <p>Presentation Container Pattern</p>
      <CounterButton/>
      <p>VAC Pattern</p>
      <VacCounterButton/>
    </div>
  );
}

export default App;
