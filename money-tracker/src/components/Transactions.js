import React, { useEffect, useState } from 'react';
import Home from './Home';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Transactions = () => {
    const url = 'http://localhost:4040/transactions';
  
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        axios.get(url).then((res) => {
            const result = res.data.transactions;
            setTransactions(result);

        }).catch((error) => { console.log(error) });
    }, [transactions]);


    const delblog = (id) => {
        axios.delete(`http://localhost:4040/deleteblog/${id}`).then((res) => {
            console.log(res.delmsg)
        })
    }

    let balance = 0;
    for (const amount of transactions) {
        balance += parseInt(amount.price)
    }

    const style = {
        height: 300,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
    }

    return (
        <>
            <div className="container">
                <Home balance={balance} />
                <InfiniteScroll
                    dataLength={transactions.length}
                    next={useEffect}
                    hasMore={true}>
                    <div className='transactions scrollBar' style={style}>
                        <h4>Transaction History</h4>
                        {
                            transactions.map((items, index) => {
                                return (

                                    <div className="transaction" key={index} >
                                        <div className="left">
                                            <div className="name">{items.name}</div>
                                            <div className="description">{items.description}</div>
                                        </div>
                                        <div className="right">
                                            <div className={'price ' + (items.price < 0 ? 'red' : 'green')}>{items.price}</div>
                                            <div className="date-time">{items.datetime}</div>
                                            <button className='btn btn-danger' onClick={() => { delblog(items._id) }}><i class="fa fa-trash icon" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div >
                </InfiniteScroll>
            </div>
        </>
    )
}

export default Transactions
