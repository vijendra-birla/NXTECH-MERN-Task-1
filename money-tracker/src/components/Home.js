import React, { useState } from 'react'
import axios from 'axios';

const Home = (props) => {
  const url = 'http://localhost:4040/transaction'

  const [details, setDetails] = useState({
    "name": String,
    "price": Number,
    "datetime": String,
    "description": String
  });


  const inputHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setDetails({ ...details, [name]: value });
  }

  const formhandler = (event) => {
    event.preventDefault()
    axios.post(url, details).then((res) => {
if(res.data.message)
{ 
  setDetails({
    "name": '',
    "price": '',
    "datetime": '',
    "description": ''
  });
}
    }).catch((error) => console.log(error));
    

  }

  return (
    <>
      <main>
        <div className="view-balance">
          <h4 >Your Balance</h4>
        <h1 className={'balance ' + (props.balance < 0 ? 'red' : 'green')}><span className='clr'>₹</span> {props.balance}.00</h1>
        </div>
     
        <form action="" onSubmit={formhandler}>
          <div className="product-detail">

            <input type="text" placeholder='Enter Product Name' onChange={inputHandler} name='name' value={details.name} />

            <input type="number" placeholder='Enter Price' onChange={inputHandler} name='price' value={details.price} />

            <input type="datetime-local" onChange={inputHandler} name='datetime' value={details.datetime} />

          </div>

          <div className="description">

            <textarea type="text" placeholder='Description' onChange={inputHandler} name='description' value={details.description} ></textarea>
          </div>
          <button type='submit'>Add New Transaction</button>
        </form>
      </main>
    </>
  )
}

export default Home
