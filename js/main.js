const registerModalBtn = document.querySelector('#registerModal');
const postModal = document.querySelector('#postModal');
const closeModalBtn = document.querySelector('#closeModalBtn');
const removeAllBtn = document.querySelector('#removeAllBtn');
const tbody = document.querySelector('#postTableBody');
const postForm = document.querySelector('#postForm');

let boardList = JSON.parse(localStorage.getItem("boardList") || "[]");
let postNumber = boardList.length > 0 ? Math.max(...boardList.map(p => p.postNumber)) + 1 : 1;

function openRegisterModal() {
    postModal.classList.add('active');
}

function closeRegisterModal() {
    postModal.classList.remove('active');
}

registerModalBtn.addEventListener('click', openRegisterModal);
closeModalBtn.addEventListener('click', closeRegisterModal);
removeAllBtn.addEventListener('click', () => {
    if (confirm("모든 게시글을 삭제하시겠습니까?")) {
        localStorage.removeItem("boardList");
        tbody.innerHTML = "";
        boardList = [];
        postNumber = 1;
    }
});

postForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('textarea[name="content"]').value.trim();
    const name = document.querySelector('input[name="name"]').value.trim();

    if (!title || !content || !name) {
        alert("모든 항목을 입력해주세요.");
        return;
    }

    if (boardList.some(p => p.title === title)) {
        alert("같은 제목의 게시글이 이미 존재합니다.");
        return;
    }

    const shortContent = content.length > 10 ? content.slice(0, 10) + "..." : content;

    const boardItem = {
        postNumber,
        title,
        content,
        name,
        viewCount: 0
    };

    boardList.push(boardItem);
    localStorage.setItem("boardList", JSON.stringify(boardList));

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${postNumber}</td>
        <td>${title}</td>
        <td>${shortContent}</td>
        <td>${name}</td>
        <td>0</td>
        <td><a href="./detail.html?postNum=${postNumber}">상세 보기</a></td>
    `;
    tbody.appendChild(tr);

    postNumber++;
    postForm.reset();
    closeRegisterModal();
});

//뒤로가기 처리
window.addEventListener('pageshow', function (event) {
    if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        location.reload(); // 뒤로 왔을 때 자동 새로고침
    }
});

window.addEventListener('DOMContentLoaded', () => {
    boardList.forEach(post => {
        const shortContent = post.content.length > 10 ? post.content.slice(0, 10) + "..." : post.content;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${post.postNumber}</td>
            <td>${post.title}</td>
            <td>${shortContent}</td>
            <td>${post.name}</td>
            <td>${post.viewCount}</td>
            <td><a href="./detail.html?postNum=${post.postNumber}">상세 보기</a></td>
        `;
        tbody.appendChild(tr);
    });
});

