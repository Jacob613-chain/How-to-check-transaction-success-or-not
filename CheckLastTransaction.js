import TonWeb from 'tonweb';
const tonweb = new TonWeb();
// const ton = new TonWeb();
// Get user's wallet address from TON wallet browser extension
// const address = (await ton.send('UQAZSgrqxLA0gTKRiG5F2wxGUkZdloU2aH6HpBv2k5viCTQn'))[0]
const address = 'UQA-Hc29whNTlsIS01ysZn_8fMEJachkCyOd_XneTxYzoX3P';
// Get user's last transaction hash using tonweb
const lastTx = (await tonweb.getTransactions(address, 1))[0]
const lastTxHash = lastTx.transaction_id.hash
console.log('------->', lastTx);
console.log('------->123', lastTxHash);
// Send your transaction
await ton.send('ton_sendTransaction', [{
        to: 'some address',
        value: '1000'
    }]
)

// Run a loop until user's last tx hash changes
var txHash = lastTxHash
while (txHash == lastTxHash) {
    await sleep(1500) // some delay between API calls
    let tx = (await tonweb.getTransactions(address, 1))[0]
    txHash = tx.transaction_id.hash
}

console.log('Done!')