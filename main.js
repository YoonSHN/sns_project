    const registerModalBtn = document.querySelector('#registerModal');
    const postModal = document.querySelector('#postModal');
    const closeModalBtn = document.querySelector('#closeModalBtn')
    const tbody = document.querySelector('#postTableBody');
    const postForm = document.querySelector('#postForm');

    function openRegisterModal(){
        postModal.classList.add('active');
    }

    function closeRegisterModal(){
        postModal.classList.remove('active');
    }

    registerModalBtn.addEventListener('click', openRegisterModal);
    closeModalBtn.addEventListener('click', closeRegisterModal);

    function sortBy(type) {
        console.log(`정렬 기준: ${type}`);
    
        // 아직 게시글 배열은 없지만, 예시용 구조를 준비해둘 수 있어
        // 예를 들어 나중에 사용할 posts 배열이 있다고 가정
        if (type === 'latest') {
        // 최신순: 등록 번호 내림차순
        posts.sort((a, b) => b.id - a.id);
        } else if (type === 'views') {
        // 조회수순: 조회수 내림차순
        posts.sort((a, b) => b.views - a.views);
        }
    
        // 정렬 후 다시 렌더링 (아직 구현 안 됐으면 일단 console로 대체)
        renderPostList();
    }
    let postNumber = 0;
    let boardList = [];


    postForm.addEventListener('submit', function(e){
        e.preventDefault();

        const title = document.querySelector('#title').value.trim();
        const content = document.querySelector('textarea[name="content"]').value.trim();
        const name = document.querySelector('input[name="name"]').value.trim();

        if(!title || !content || !name){
            alert("모든 항목을 입력해주세요.");
            return;
        }

        const shortContent = content.length > 10 ? content.slice(0,10) + '...' : content;

        
        boardList = JSON.parse(localStorage.getItem("boardList") || []);
        let existing = boardList.find(p => p.postNumber == postNumber);
        let viewCount = existing ? existing.postNumber : 0;

        

        const boardItem = { //localstorage
            postNumber,
            title,
            content,
            name,
            viewCount
        };

        boardList.push(boardItem);
        localStorage.setItem("boardList", JSON.stringify(boardList));

        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${postNumber}</td>
        <td>${title}</td>
        <td>${shortContent}.</td>
        <td>${name}</td>
        <td>${viewCount}</td>
        <td>
            <a href="./detail.html?postNum=${postNumber}" class="viewBtn">상세 보기</a>
        </td>
        `;
        
        tbody.appendChild(tr);
        postForm.reset();
        postNumber++;

        postModal.classList.remove('active');
    });



    