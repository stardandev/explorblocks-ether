import Web3 from 'web3';
// import axios from "axios";

const LatestTransactions = () => {
    const loginMetamask = async () => {
        let web3;
        
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
        }

        if(web3) {
            const latest = await web3.eth.getBlockNumber()

            let promises = [];
            for (var i=0; i < 10; i++) {
                const blockNumber = latest - i;

                promises.push(new Promise((res, rej) => {
                    web3.eth.getBlock(blockNumber, true).then(data =>{
                        res(data);
                    }); 
                }));
            }

            return Promise.all(promises);
        }
    }

    const getTransactions = async() => {
        const transanctions = await loginMetamask();
        console.log({transanctions})
    }

    return (
         <div>
            <button className='btnLogin' onClick={() => getTransactions()}> Login</button>
        </div>
    )
}

export default LatestTransactions;