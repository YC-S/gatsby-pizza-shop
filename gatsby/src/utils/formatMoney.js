const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const formateMoney = (cents) => formatter.format(cents / 100)

export default formateMoney
