window.addEventListener('DOMContentLoaded', ()=>{
    const params = new URLSearchParams(window.location.search);
    console.log(params);

    const postNum = Number(params.get('postNum'));
    console.log(postNum);

    const boardList = JSON.parse(localStorage.getItem('boardList') || '[]');
    console.log(boardList);

    const post = boardList.find(p => p.postNumber == postNum);
    console.log(post);

    if(!post){
        alert("해당 게시글을 찾을 수 없습니다.");
        return;
    }

    post.viewCount++;
    localStorage.setItem('boardList', JSON.stringify(boardList));

    document.getElementById('postNum').textContent = post.PostNumber;
    document.getElementById('postTitle').textContent = post.title;
    document.getElementById('postTitle').textContent = post.content;
    document.getElementById('postUser').textContent = post.name;
    document.getElementById('viewCount').textContent = post.viewCount;
});