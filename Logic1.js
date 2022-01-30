document.addEventListener("DOMContentLoaded", () => {    
    let cryptos = [];
    const load = async () => {
        try {
            const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
            cryptos = await res.json();
            display(cryptos);
        } catch (err) {
            console.error(err);
        }
    };
    const display = (data) => {
        const html = data
            .map((s) => {
                return ` 
                <div class="s">
                    <p>${s.name}</p>
                    <p><img src="${s.image}"/></p>
                    <row>Price:</row>
                    <row id="price">${s.current_price}</row>
                    <p>Market Cap: ${s.market_cap}</p>   
                </div>
                `;
            }).join('');
            document.querySelector("#theData").innerHTML = html;
            setInterval(load,60000);
            console.log(data);
    };
    load();
        // search filter bar
        const searching = document.querySelector("#search");
        searching.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
        const filtered = cryptos.filter(element => {
            return element.name.toLowerCase().includes(searchString);
        });
        display(filtered);
    }); 
}); 