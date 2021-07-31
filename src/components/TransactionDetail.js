const TransactionDetail = ({transaction}) => {
    return (
        <table>
            <tbody>
                
                <tr>
                    <td>Block Hash: </td>
                    <td>{transaction.blockHash}</td>
                </tr>
                <tr>
                    <td>Block Number: </td>
                    <td>{transaction.blockNumber}</td>
                </tr>
                <tr>
                    <td>From: </td>
                    <td>{transaction.from}</td>
                </tr>
                <tr>
                    <td>To: </td>
                    <td>{transaction.to}</td>
                </tr>
                <tr>
                    <td>Gas: </td>
                    <td>{transaction.gas}</td>
                </tr>
                <tr>
                    <td>Gas Price: </td>
                    <td>{transaction.gasPrice}</td>
                </tr>
                
                <tr>
                    <td>Value: </td>
                    <td>{transaction.value}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TransactionDetail;