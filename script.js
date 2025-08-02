document.addEventListener('DOMContentLoaded', () => {
    const vixDataContainer = document.getElementById('vix-data');

    // CORS 문제를 우회하기 위해 프록시 사용
    const ticker = '^VIX';
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const apiUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${ticker}`;
    const requestUrl = `${proxyUrl}${encodeURIComponent(apiUrl)}`;

    async function fetchVixData() {
        try {
            const response = await fetch(requestUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const quote = JSON.parse(data.contents).quoteResponse.result[0];

            if (quote) {
                const price = quote.regularMarketPrice.toFixed(2);
                const change = quote.regularMarketChange.toFixed(2);
                const changePercent = quote.regularMarketChangePercent.toFixed(2);
                const previousClose = quote.regularMarketPreviousClose.toFixed(2);

                const changeSign = change >= 0 ? '+' : '';
                const changeColor = change >= 0 ? 'up' : 'down';

                vixDataContainer.innerHTML = `
                    <div class="price ${changeColor}">${price}</div>
                    <div class="change ${changeColor}">${changeSign}${change} (${changeSign}${changePercent}%)</div>
                    <div class="info">전일 종가: ${previousClose}</div>
                `;
            } else {
                vixDataContainer.innerHTML = '<p class="error">VIX 데이터를 가져올 수 없습니다.</p>';
            }

        } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
            vixDataContainer.innerHTML = `<p class="error">데이터 로딩 중 오류가 발생했습니다. (${error.message})</p>`;
        }
    }

    fetchVixData();
    // 1분마다 데이터 갱신
    setInterval(fetchVixData, 60000);
});
