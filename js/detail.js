const boardList = JSON.parse(localStorage.getItem('boardList') || '[]');
const commentRegisterBtn = document.querySelector('#commentRegisterBtn');
const commentModal = document.querySelector('#commentModal');
const commentList = document.querySelector('.comment-list');
const commentForm = document.querySelector('#commentForm');
const closeCommentModal = document.querySelector('#closeCommentModalBtn');

window.addEventListener('DOMContentLoaded', ()=>{
    const params = new URLSearchParams(window.location.search);
    console.log(params);

    const postNum = Number(params.get('postNum'));
    console.log(postNum);

    
    console.log(boardList);

    const post = boardList.find(p => p.postNumber == postNum);
    console.log(post);

    if(!post){
        alert("해당 게시글을 찾을 수 없습니다.");
        return;
    }

    post.viewCount++;
    localStorage.setItem('boardList', JSON.stringify(boardList));

    document.getElementById('postNum').textContent = post.postNumber;
    document.getElementById('postTitle').textContent = post.title;
    document.getElementById('postContent').textContent = post.content;
    document.getElementById('postUser').textContent = post.name;
    document.getElementById('viewCount').textContent = post.viewCount;
});

commentRegisterBtn.addEventListener('click',()=>{
    commentModal.style.display = 'flex';
});

closeCommentModal.addEventListener('click', ()=>{
    commentModal.style.display = 'none';
});

commentForm.addEventListener('submit', function(e){
    e.preventDefault();

    const title = commentForm.commentTitle.value.trim();
    const text = commentForm.commentText.value.trim();

    if(!title || ! text){
        alert("제목과 내용을 모두 입력해주세요.");
        return;
    }

    const newComment = document.createElement('div');
    newComment.classList.add('comment-item');
    newComment.innerHTML = `<strong>제목 : ${title}</strong><p>내용 : ${text}</p>`;
    commentList.appendChild(newComment);

    commentForm.reset();
    commentModal.style.display = 'none';

});

