document.addEventListener('DOMContentLoaded', function() {
    const vixDataElement = document.getElementById('vix-data');

    function fetchVixData() {
        fetch('/api/vix')
            .then(response => response.json())
            .then(data => {
                vixDataElement.innerHTML = `<div class="price">${data.price.toFixed(2)}</div>`;
            })
            .catch(error => {
                console.error('Error fetching VIX data:', error);
                vixDataElement.innerHTML = `<p class="error">데이터를 불러오는 데 실패했습니다.</p>`;
            });
    }

    // 10초마다 데이터 업데이트
    setInterval(fetchVixData, 10000);

    // 페이지 로드 시 즉시 데이터 로드
    fetchVixData();
});
