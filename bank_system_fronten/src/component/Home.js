function Home({ onConnectWallet, walletAddress }) {
    return (
        // 背景图
        <div className="home">
            <div className="home-content">
                <h1 className="home-title">The best place to<br /> save cryptocurrencies in DeFi</h1>
                {/* 介绍文字分成两排 */}
                <div className="home-text">
                    <p>BankOnline is a decentralized finance platform<br />that enables you to save cryptocurrencies without the need for a bank.</p>
                </div>
                <div className="button-container">
                    <button className="btn btn-outline-secondary connect-wallet-button-home" onClick={onConnectWallet}>{walletAddress.slice(0, 8) || "Connect Wallet"}</button>
                </div>
            </div>
        </div>
    )
}
export default Home;