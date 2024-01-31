const href = location.href;
const match = href.match("https://mypage.groovecoaster.jp/sp/#/mc/");

if (match === null) {
    alert("リザルト画面で実行してください");
} else {
    const music_id = href.replace(/[^0-9]/g, '');

    fetch(`https://mypage.groovecoaster.jp/sp/json/music_detail.php?music_id=${music_id}`)
        .then(response => response.json())
        .then(data => {
            let text = `あなたの${data.music_detail.music_title}のperfect回数`;
            const score = [data.music_detail.simple_result_data, data.music_detail.normal_result_data, data.music_detail.hard_result_data, data.music_detail.extra_result_data];
            const diff = ["simple:", "normal:", "hard:", "extra:"];
    
            const num = data.music_detail.ex_flag ? diff.length : diff.length - 1;

            for (let idx = 0; idx < num; idx++) {
                const perfect_num = score[idx] ? `${score[idx].perfect}回` : "未プレイ";
                text += `\n${diff[idx]}${perfect_num}`;
            }
            alert(text);
        })
        .catch(error => console.error('Fetch Error:', error));
}
