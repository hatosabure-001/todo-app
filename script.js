

// HTML要素を取得
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskTime = document.getElementById('taskTime');
const suggestionsBox = document.getElementById('suggestions');


// 候補のリスト
const commonTasks = [
    "会議",
    "会議室１",
    "会議室２",
    "会議室３",
    "朝礼",
    "夕礼",
    "休憩"
];

// 入力欄がクリック(フォーカス)されたら候補を表示
taskInput.addEventListener('focus', () => {
    suggestionsBox.innerHTML = ''; // ボックスを一度空にする
    
    commonTasks.forEach(task => {
        const item = document.createElement('div');
        item.textContent = task;
        item.classList.add('suggestion-item');
        
        // 候補がクリックされたら、その内容を入力欄に入れ、ボックスを閉じる
        item.addEventListener('click', () => {
            taskInput.value = task;
            suggestionsBox.style.display = 'none';
        });
        
        suggestionsBox.appendChild(item);
    });
    
    suggestionsBox.style.display = 'block'; // ボックスを表示
});

// 入力欄の外側をクリックしたら候補を非表示にする
document.addEventListener('click', (event) => {
    // クリックされた場所が入力欄でも候補ボックスでもない場合
    if (!taskInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
        suggestionsBox.style.display = 'none';
    }
});


// ボタンがクリックされた時の処理
addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value;
    const timeValue = taskTime.value;
    

    // 入力が空でないか確認
    if (taskText !== "") {
        // 新しいリストアイテム（タスク）を作成
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');

        let displayContent = taskText;
        if (timeValue != ""){
            displayContent += ` - ${timeValue}`;
        };

        const memoArea = document.createElement('textarea');
        memoArea.placeholder = '備考...';
        memoArea.classList.add('memo-box');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = displayContent;
        taskSpan.classList.add('task-text');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.classList.add('delete-btn');

        deleteButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
        });

         
        listItem.appendChild(taskSpan);
        listItem.appendChild(memoArea);
        listItem.appendChild(deleteButton);


        // タスクをリストに追加
        taskList.appendChild(listItem);

        // 入力欄をクリア
        taskInput.value = "";
        taskTime.value = "";
    }
});