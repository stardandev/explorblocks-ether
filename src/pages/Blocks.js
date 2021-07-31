import { useEffect, useState } from "react";
import { List } from 'antd';
import Transactions from "../components/Transactions";
import Web3 from 'web3';
import "../assets/styles/style.css"

let web3;

function connectMetamask() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
    }
}

async function getLatestBlocks() {
    if(web3) {
        const latest = await web3.eth.getBlockNumber()

        let arr = [];
        for (var i = 0; i < 10; i++) {
            arr.push(latest - i);
        }

        return arr;
    }
}

connectMetamask();

const Blocks = () => {
    const [blocks, setBlocks] = useState("");
    const [transactions, setTransactions] = useState();
    const [currentBlock, setCurrentBlock] = useState();
    
    useEffect(() => {
        getBlocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getBlocks = async() => {
        const latestBocks = await getLatestBlocks();

        setBlocks(latestBocks);
        console.log({latestBocks})
        setTimeout(getBlocks, 1000);
    }
    
    const getTransactions = async(blockNumber) => {
        const data = await web3.eth.getBlock(blockNumber, true);
        setTransactions(data.transactions);
        setCurrentBlock(blockNumber);
    }
    return (
         <div className='flex'>
             {
                blocks && 
                    <List
                        header={<div>Latest Blocks</div>}
                        bordered
                        itemLayout="horizontal"
                        dataSource={blocks}
                        className="block-container"
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<span className='block'>Ethereum Block</span>}
                                    title={<span className='block-label' onClick={() => getTransactions(item)}>{item}</span>}
                                    description='sss'
                                />
                            </List.Item>
                        )}
                    />
             }
            <Transactions transactions={transactions} web3={web3} blockNumber={currentBlock} />
        </div>
    )
}

export default Blocks;