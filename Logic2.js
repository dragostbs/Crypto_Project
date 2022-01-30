document.addEventListener("DOMContentLoaded", () => {
    function fetchdata () {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false").then(response => {
            const cryptos = response.json();
            return cryptos;
        }).then(data => {
            console.log(data);
            const htm = data.map(c => {
                return `
                <div class="c">
                    <div><img src="${c.image}"/></div>
                    <div>${c.name}</div>
                    <div>${c.total_volume}</div>
                    <div>${c.high_24h}</div>
                    <div>${c.low_24h}</div>
                </div>
                `;
            }).join('');
            document.querySelector("#theOther").innerHTML = htm;
            console.log(data);
            setInterval(fetchdata,60000000);
        }).catch(error => {
            console.log(error);
        });
    }
    fetchdata();
});