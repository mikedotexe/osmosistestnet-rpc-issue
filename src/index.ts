import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";

const start = async () => {
    const seedPhrase = "cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat blanket"
    const prefix = "osmo"
    const options = { prefix }
    const signerWallet = await DirectSecp256k1HdWallet.fromMnemonic(seedPhrase, options)
    const address = (await signerWallet.getAccounts())[0].address
    console.log('address:', address)

    let client: SigningCosmWasmClient
    // Should work when connecting to quickapi endpoint
    try {
        client = await SigningCosmWasmClient.connectWithSigner(`https://osmosistest-rpc.quickapi.com:443`, signerWallet)
    } catch (e) {
        console.log('failed to create client for', prefix, e);
        return Promise.reject(e)
    }

    // Get block height if successful, I dunno
    let height = await client.getHeight()
    console.log('latest height:', height)

    // (Intermittent?) Failure when trying to connect to https://testnet-rpc.osmosis.zone
    try {
        client = await SigningCosmWasmClient.connectWithSigner(`https://testnet-rpc.osmosis.zone:443`, signerWallet)
    } catch (e) {
        console.log('Failed to create client', e);
        return Promise.reject(e)
    }

    height = await client.getHeight()
    console.log('latest height:', height)
}

// Calls start function
(() => start())()
