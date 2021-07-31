import { useEffect, useState } from "react";
import { Popover, List, Input } from 'antd';
import TransactionDetail from "./TransactionDetail";

const { Search } = Input;

const Transactions = ({transactions, web3, blockNumber}) => {
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);
    const [filterAddress, setFilterAddress] = useState('');
    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        if(!transactions) return;
        
        const arr = transactions.filter(item => {
            let flag = true;

            if (filterAddress && item.to !== filterAddress && item.from !== filterAddress) {
                flag = false;
            }

            if (filterValue && parseFloat(web3.utils.fromWei(item.value, 'ether')) < filterValue ) {
                flag = false;
            }
            
            return flag;
        });

        setFilteredTransactions(arr);
    },[filterAddress, filterValue, transactions, web3]);
   
    return (<div>
        <div>
            <div className="filter-description">
                Filter the transactions by Address(to and from), and amount(&#62;, ether)
            </div>
            <Search placeholder="input Address" onChange={e=>setFilterAddress(e.target.value)} onSearch={value=>setFilterAddress(value)} style={{ width: 200 }} />
        
            <Search placeholder="input Amount" onChange={e=>setFilterValue(e.target.value)} onSearch={(value) => setFilterValue(value)} style={{ width: 200 }} />
        </div>
        {
            transactions && 
                <List
                    header={<div>Transactions for {blockNumber} block</div>}
                    bordered
                    itemLayout="horizontal"
                    dataSource={ filteredTransactions }
                    className="transaction-container"
                    renderItem={item => (
                        <List.Item>
                            <Popover content={<TransactionDetail transaction={item} />} title={item.hash} placement="bottomLeft" >
                                <span className='block-label'>{item.hash}</span>
                            </Popover>
                        </List.Item>
                    )}
                />
         }
         </div>
    )
}

export default Transactions;