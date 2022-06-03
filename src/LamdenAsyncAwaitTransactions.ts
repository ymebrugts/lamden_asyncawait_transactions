interface dictionary {
    [key: string]: Promise<any>;
 }

export class LamdenAsyncAwaitTransactions {
    

    listOfUidsWithPromisesToResolve: dictionary = {}
    listOfUidsWithCallbacks: dictionary = {}


    constructor() {

        // Add Lamden Wallet listeners
        document.addEventListener('lamdenWalletInfo', this.processLamdenWalletInfo);
        document.addEventListener('lamdenWalletTxStatus', this.processLamdenWalletTxStatus)
    }

    helloWorld() {
        console.log("Hello world");
    }


    processLamdenWalletInfo() {
        console.log("processLamdenWalletInfo called")
        // What to do here?
    }

    processLamdenWalletTxStatus() {
        console.log("processLamdenWalletTxStatus called")
        // What to do here?
    }

        /**
     * Creates a "lamdenWalletSendTx" event to send a transaction request to the Lamden Wallet.
     * If a callback is specified here then it will be called with the status updates before the transaction resolves completely with a succes or failure.
     *
     * @param {Object} tx  A transaction request object
     * @param {string} tx.networkType Which Lamden network the tx is for (Mainnet or testnet)
     * @param {string} tx.stampLimit The max Stamps this tx is allowed to use. Cannot be more but can be less.
     * @param {string} tx.methodName The method on your approved smart contract to call
     * @param {Object} tx.kwargs A keyword object to supply arguments to your method
     * @param {Function=} callback A function that will called and passed the tx results.
     * @fires txStatus
     */
    sendTransaction(tx: TransactionRequest, updateCallback = undefined, uniqueuid: string | undefined = undefined){
        if (uniqueuid === undefined) {
            // If the user set their own uid then we won't touch it. -> The UID should be unique or this library won't work.
            if (tx.uid === undefined) {
                tx.uid = new Date().toISOString()
            }           
        } else {
            tx.uid = uniqueuid;
        }

        this.listOfUidsWithPromisesToResolve[tx.uid] = new Promise<any>(() => {});
        
        if (typeof updateCallback === 'function') this.listOfUidsWithCallbacks[tx.uid] = updateCallback
        document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', {detail: JSON.stringify(tx)}));
    }
}