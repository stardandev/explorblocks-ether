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

            for (var i=0; i < 10; i++) {
                const blockNumber = latest - i;

                web3.eth.getBlock(blockNumber).then(data =>{
                    console.log({data})
                });
              }
        }
    }

    return (
         <div>
            <button className='btnLogin' onClick={() => loginMetamask()}> Login</button>
        </div>
    )
}

export default LatestTransactions;