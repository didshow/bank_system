// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Universe {
    // --- Auth ---
    mapping(address => uint) public wards;
    function rely(address usr) external auth {
        require(live == 1, "Universe/not-live");
        wards[usr] = 1;
    }
    function deny(address usr) external auth {
        require(live == 1, "Universe/not-live");
        wards[usr] = 0;
    }
    modifier auth() {
        require(wards[msg.sender] == 1, "Vat/not-authorized");
        _;
    }

    mapping(address => mapping(address => uint)) public can;
    function hope(address usr) external {
        can[msg.sender][usr] = 1;
    }
    function nope(address usr) external {
        can[msg.sender][usr] = 0;
    }
    function wish(address bit, address usr) internal view returns (bool) {
        return bit == usr || can[bit][usr] == 1;
    }

    // --Data--
    mapping(address => uint256) public stars;

    IERC20 public token; // only use star token
    uint256 public live; // Active Flag
    uint256 public totalStars; // total stars
    uint256 public reserve; // reserve balance

    // --event--
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event AddResrves(address indexed from, uint256 amount);
    event MoveResrves(address indexed to, uint256 amount);
    event Transfer(address indexed src, address indexed dst, uint256 amount);

    constructor(address token_addr) {
        wards[msg.sender] = 1;
        live = 1;
        token = IERC20(token_addr);
    }

    // --bank logic--
    function deposit(address to, uint256 amount) external {
        require(live == 1, "Universe/not-live");
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "transferFrom failed"
        );
        stars[to] += amount;
        totalStars += amount;
        emit Deposit(to, amount);
    }

    function withdraw(address src, address to, uint256 amount) external {
        require(live == 1, "Universe/not-live");
        require(
            totalStars >= amount || stars[msg.sender] >= amount,
            "Universe/not-enough-stars"
        );
        require(wish(msg.sender, src), "Universe/account-not-authorized");
        require(token.transfer(to, amount), "transferFrom failed");
        stars[src] -= amount;
        totalStars -= amount;
        emit Withdraw(to, amount);
    }

    function transfer(address src, address dst, uint256 amount) external {
        require(wish(msg.sender, src), "Universe/account-not-authorized");
        require(stars[src] >= amount, "Universe/not-enough-stars");
        stars[src] -= amount;
        stars[dst] += amount;
        emit Transfer(src, dst, amount);
    }

    function move(address src, address dst, uint256 amount) external auth {
        stars[src] -= amount;
        stars[dst] += amount;
        emit Transfer(src, dst, amount);
    }

    // --reserve management--
    function addReserves(uint256 amount) external {
        require(stars[msg.sender] >= amount, "Universe/not-enough-stars");
        stars[msg.sender] -= amount;
        reserve += amount;
        emit Transfer(msg.sender, address(this), amount);
        emit AddResrves(msg.sender, amount);
    }

    function moveResrves(address to, uint256 amount) external auth {
        require(reserve >= amount, "Universe/not-enough-reserve");
        stars[to] += amount;
        reserve -= amount;
        emit Transfer(msg.sender, to, amount);
        emit MoveResrves(to, amount);
    }

    function cage() external auth {
        live = 0;
    }
}
