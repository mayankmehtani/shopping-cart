import logo from './logo.svg';
import Card from './Card.jsx'
import Item from './Item.jsx'
import Banner from './Banner.jsx'

import './App.css';

function App() {
  return (
    <div className="App">
      <Banner/>

      <div class="grid">
        <div class="row">
          <Card label="Tomato" price="£3.00" img="assets/tomato.jpg"/>
          <Card label="Cucumber" price="£6.50"/>
          <Card label="Bell Peppers" price="£7.00"/>
        </div>

        <div class="row">
          <Card label="Mushrooms" price="£8.00"/>
          <Card label="Broccoli" price="£9.10"/>
          <Card label="Carrots" price="£12.40"/>
        </div>
        
      </div>
    </div>
  );
}

export default App;
