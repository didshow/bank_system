// SPDX-License-Identifier: MIT

// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Star is ERC20 {

     // --- Auth ---
    mapping (address => uint) public wards;
    function rely(address guy) external auth { wards[guy] = 1; }
    function deny(address guy) external auth { wards[guy] = 0; }
    modifier auth {
        require(wards[msg.sender] == 1, "Star/not-authorized");
        _;
    }

    constructor() ERC20("star", "STA") {
        wards[msg.sender] = 1;
    }

    // --mint--
    function mint(address account, uint256 amount) public auth {
        _mint(account, amount);
    }

    // --burn--
    function burn(address account, uint256 amount) public auth {
        require(balanceOf(account) >= amount, "ERC20: burn amount exceeds balance");
        _burn(account, amount);
    }
}