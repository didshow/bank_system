function Navbar({onConnectWallet,walletAddress}) {
    return(
        <nav className="navbar">
            <div className="nav-brand">
                BankOnline
            </div>
            <div className="navbar-menu ">
                <button className="connect-wallet-button"onClick={onConnectWallet}>{walletAddress.slice(0,8)||"Connect Wallet"}</button>
            </div>
        </nav>
    )
}

export default Navbar;