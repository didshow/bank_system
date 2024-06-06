import { Link, useNavigate } from "react-router-dom";
function Navbar({ onConnectWallet, walletAddress }) {
    const navigate = useNavigate();
    const navigateToService = (event) => {
        if (!walletAddress) {
            event.preventDefault();
            alert('Please connect your wallet first.');
        } else {
            navigate('/Service');
        }
    };
    return (
        <nav className="navbar">
            <div className="nav-brand">
                BankOnline
            </div>
            <Link to="/Service" className="navbar-link" onClick={navigateToService}>Service</Link>
            <Link to="/About" className="navbar-link">About</Link>
            <div className="navbar-menu ">
                <button className="connect-wallet-button" onClick={onConnectWallet}>{walletAddress.slice(0, 8) || "Connect Wallet"}</button>
            </div>
        </nav>
    )
}

export default Navbar;