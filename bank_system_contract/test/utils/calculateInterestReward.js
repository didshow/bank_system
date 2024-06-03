const ONE = BigInt(10 ** 18)

function calculateInterestReward (startTime, currentTime, balance) {

  const ssr = BigInt(1000000002474313311)
  const blockTimeDiff = BigInt(currentTime) - BigInt(startTime)
  const userBalance = BigInt(balance)
  // const ssr = BigInt(1000000002474313311)
  // const blockTimeDiff = BigInt(31536000)
  // const userBalance = BigInt(1000)

  const rwd = _rmul(_rpow(ssr, blockTimeDiff, ONE), userBalance) - userBalance
  // console.log(Number(rwd)) // Output: 81
  return Number(rwd)
}

function _rmul (x, y) {
  return (x * y) / ONE
}

function _rpow (x, n, base) {
  if (x === BigInt(0)) {
    if (n === BigInt(0)) {
      return base
    } else {
      return BigInt(0)
    }
  } else {
    let z
    if (n % BigInt(2) === BigInt(0)) {
      z = base
    } else {
      z = x
    }
    const half = base / BigInt(2) // for rounding

    for (let i = n / BigInt(2); i > BigInt(0); i /= BigInt(2)) {
      const xx = x * x
      if (xx / x !== x) {
        throw new Error('Overflow error')
      }
      const xxRound = xx + half
      if (xxRound < xx) {
        throw new Error('Overflow error')
      }
      x = xxRound / base

      if (i % BigInt(2) !== BigInt(0)) {
        const zx = z * x
        if ((zx / x) !== z) {
          throw new Error('Overflow error')
        }
        const zxRound = zx + half
        if (zxRound < zx) {
          throw new Error('Overflow error')
        }
        z = zxRound / base
      }
    }
    return z
  }
}
module.exports = calculateInterestReward