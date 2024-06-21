export const getCurrencies = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/list",
      {
        method: "get",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": `${process.env.COIN_GECKO_API_KEY}`,
        },
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getCurrency = async (coinId: string) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}`,
      {
        method: "get",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": `${process.env.COIN_GECKO_API_KEY}`,
        },
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
