// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface UniLike{
    function move(address, address, uint256) external; 
    function stars(address) external view returns (uint256);
}

contract Sun {

    // --- Auth ---
    mapping (address => uint) public wards;
    function rely(address guy) external auth { wards[guy] = 1; }
    function deny(address guy) external auth { wards[guy] = 0; }
    modifier auth {
        require(wards[msg.sender] == 1, "Pot/not-authorized");
        _;
    }


    // --Data--
    struct Account{
        uint256 bal;    // account balance
        uint256 nst;    // new saving time
    }

    // ssr(r^n = 1.08) = 1000000002474313311
    // bytes32 = 0x7373720000000000000000000000000000000000000000000000000000000000
    uint256 public ssr;       // sun saving rate
    uint256 public live;      // active live
    uint256 public tsb;       // total saving balance
    UniLike public uni;      // universe bank

    mapping(address => Account) public accounts;  // account data

   // --events--
   event Saving(address indexed account, uint256 indexed amount, uint256 timestamp);
   event Withdraw(address indexed account, uint256 indexed amount, uint256 timestamp);
    constructor(address _uni) {
        wards[msg.sender] = 1;
        uni = UniLike(_uni);
        live = 1;
        ssr = 1000000002474313311;
    }


    uint256 public constant ONE = 10 ** 18; 
    // --math--
    function _rmul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = x * y / ONE;
    }

    function _rpow(uint256 x, uint256 n, uint256 base) internal pure returns (uint256 z) {
         assembly {
            switch x case 0 {switch n case 0 {z := base} default {z := 0}}
            default {
                switch mod(n, 2) case 0 { z := base } default { z := x }
                let half := div(base, 2)  // for rounding.
                for { n := div(n, 2) } n { n := div(n,2) } {
                    let xx := mul(x, x)
                    if iszero(eq(div(xx, x), x)) { revert(0,0) }
                    let xxRound := add(xx, half)
                    if lt(xxRound, xx) { revert(0,0) }
                    x := div(xxRound, base)
                    if mod(n,2) {
                        let zx := mul(z, x)
                        if and(iszero(iszero(x)), iszero(eq(div(zx, x), z))) { revert(0,0) }
                        let zxRound := add(zx, half)
                        if lt(zxRound, zx) { revert(0,0) }
                        z := div(zxRound, base)
                    }
                }
            }
        }
    }

    function file(bytes32 what, uint256 data) external auth {
        require(live == 1, "Sun/not-live");
        if (what == "ssr") {
            ssr = data;
        }else revert("Sun/file-unrecognized-param");
    }

    // --saving reward caluc--
    function drip(address usr) external{
        require(block.timestamp >= accounts[usr].nst, "Sun/invalid-now");
        uint256 rwd = _rmul(_rpow(ssr, block.timestamp - accounts[usr].nst, ONE), accounts[usr].bal) - accounts[usr].bal;
        require(uni.stars(address(this)) >= rwd, "Sun/sun-not-enough-stars");
        
        uni.move(address(this), usr, rwd);
        accounts[msg.sender].nst = block.timestamp;
    }

      // --saving logic--
    function join(uint256 amount) external {
        require(uni.stars(msg.sender) >= amount, "Sun/user-not-enough-stars");
        uni.move(msg.sender, address(this), amount);
        accounts[msg.sender].bal += amount;
        accounts[msg.sender].nst = block.timestamp;
        tsb += amount;
        

        emit Saving(msg.sender, amount, block.timestamp);
    }

    function exit(uint256 amount) external {
        require(uni.stars(address(this)) >= amount, "Sun/sun-not-enough-stars");
        
        uni.move(address(this), msg.sender, amount);
        accounts[msg.sender].bal -= amount;
        accounts[msg.sender].nst = block.timestamp;
        tsb -= amount;
        
        emit Withdraw(msg.sender, amount, block.timestamp);
    }

    function cage() external auth {
        live = 0;
        ssr = ONE;
    }

}