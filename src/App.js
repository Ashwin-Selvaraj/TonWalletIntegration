import './App.css';
import {TonConnectUIProvider} from "@tonconnect/ui-react"
import Home from './Page'
// import Home1 from './page';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          Connect Wallet
          
          {/* //manifest url points to a json file that contains information about the meta data of the app such as name, icon and url */}
          <TonConnectUIProvider manifestUrl='https://sapphire-large-cougar-300.mypinata.cloud/ipfs/QmTFt5ZYkT4anEKpaMYXEoHLcGnAAwC6w8PqQcBSeGC5Yt'>
            <Home></Home>
            {/* <Home1></Home1> */}
          </TonConnectUIProvider>

      </header>
    </div>
  );
}
export default App;
