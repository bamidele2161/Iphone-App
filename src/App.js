import React, {useState} from 'react'
import './App.css';
import image from '../src/image/blueiphone.png'
import Axios from 'axios'

const App = () => {
  const [input, setInput] = useState('');

  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [values, setIsValues] = useState([150, 1000]);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setIsChecked] = useState('price')

  const handleChange = (event, newValue) => {
    setIsValues(newValue);
  }
  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  }

  const handleMin = (e) => {
    e.preventDefault();
    setMin(e.target.value);
  }

  const handleMax = (e) => {
    e.preventDefault();
  }
  const url = `https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=20&page=1&minPrice=0&maxPrice=2500&storageSizeString=&conditionString=&category=Smartphones&brand=Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus`
  const getData = async (e) => {
    e.preventDefault();
    const response  = await Axios.get(url);
    setResult(response.data.data.data);
    setIsLoading(true);
  }
  function valuetext(values) {
    return `${values}°C`;
  }

  
  return (
    <div className="app-container">
      <div className="landing"> 
        <div className="landing-form">
          <h1 className="landing-headline">SHOP OUR LATEST AVAILABLE STOCK HERE</h1>
        <form>
          <div className="phone-display">
            <input 
            placeholder="Enter  Search Term (e.g Iphone X, 128GB or A1)" 
            className="main-input" 
            onChange={handleInput} 
            value={input}/>
            <button className="button" onClick={getData}>Search</button>
          </div>
          
        </form>
        </div>

        <div className="landing-image">
          <img src={image} className="laptop" alt="laptop" />
        </div>
      </div>
      
      {/*card item */}
      <div className="display-section">
        <div className="sidebar">
          <div className="category">
            <h2>Categories</h2>
            <ul className="cat-list">
              <li>All</li>
              <li>iphone</li>
              <li>Samsung</li>
              <li>ipad</li>
              <li>MacBook</li>
              <li>Airpods</li>

            </ul>
          </div>

          <form className="min-max-input">
            <h2>Price Filter</h2>
            
            <input 
            max="1000" 
            min="100"
            type="range"
            name="price"
            className="range-input"
            />
            <input className="input-min" placeholder="Min" value={min} onChange={handleMin}/>
            <input className="input-max" placeholder="Max" value={max} onChange={handleMax}/>
          </form>

          <div className="storage">
          <h2>Storage</h2>
          <ul className="sto-list">
            <li> <input type="checkbox" /> 32GB</li>
            <li> <input type="checkbox" />64GB</li>
            <li> <input type="checkbox" />128GB</li>
            <li> <input type="checkbox" />256GB</li>
          </ul>
          </div>
        </div>

        <div className="card-container">
        {
          isLoading ? result.filter((val) => {
            if((input === "") && ( min === "" ) && ( max === "" )){
              return val
            } else if(val.name.toLowerCase().includes(input.toLowerCase())) {
              return val
            }
            else if(val.lowestAsk?.storageSize.toLowerCase().includes(input.toLowerCase())) {
              return val
            }
            else if(val.lowestAsk?.grade.toLowerCase().includes(input.toLowerCase())) {
              return val
            }
            else if(val.lowestAsk?.storageSize.toLowerCase().includes(min.toLowerCase())) {
              return val 
            }
            else if(val.lowestAsk?.storageSize.toLowerCase.includes(max.toLocaleLowerCase())) {
              return val 
            }
          }).map((item)=> (
      
            <div className="card" key={item._id}>
              <div className="grade-div">
                <p className="card-grade">{item.lowestAsk?.grade}</p>
              </div>
              
            <div className="card-image">
              <img src={item.imgUrl} alt="11 pro max" className="promax-image"></img>
            </div>
            <div className="card-details">
              <h3 className="card-name">{item.name}</h3>
              <p className="card-memory">Unlocked | {item.lowestAsk?.storageSize}</p>
              <p className="card-unit">Unit Price</p>
              <h2 className="card-price">${item.lowestAsk?.price}</h2>
              <p className="card-available">1500 available</p>
              <div className="buy-btn">
                <button className="buy-button">BUY</button>
              </div>
            </div>
      </div>
          )):<div className="not-found"><span className="no-item">No Item Found</span></div>
        }
      </div>
      </div>
      
    </div>

    
  );
}

export default App;
