function toggleMore() {
    const moreInfo = document.getElementById('more-info');
    const btn = document.querySelector('.show-more-btn');
    
    if (moreInfo.style.display === 'none') {
        moreInfo.style.display = 'block';
        btn.textContent = 'Show Less';
    } else {
        moreInfo.style.display = 'none';
        btn.textContent = 'Show More';
    }
}
document.getElementById('year').textContent = new Date().getFullYear();
