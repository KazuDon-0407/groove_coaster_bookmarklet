var href = location.href;
var match = href.match("https://mypage.groovecoaster.jp/sp/#/mc/");

if (match === null) {
    alert("リザルト画面で実行してください");
} else {
    var music_id = href.replace(/\D/g, '');

    fetch(`https://mypage.groovecoaster.jp/sp/json/music_detail.php?music_id=${music_id}`)
        .then(response => response.json())
        .then(data => {
            var text = `あなたの${data.music_detail.music_title}のperfect回数`;
            var score = [data.music_detail.simple_result_data, data.music_detail.normal_result_data, data.music_detail.hard_result_data, data.music_detail.extra_result_data];
            var diff = ["simple:", "normal:", "hard:", "extra:"];
    
            var num = data.music_detail.ex_flag ? diff.length : diff.length - 1;

            for (var idx = 0; idx < num; idx++) {
                var perfect_num = score[idx] ? `${score[idx].perfect}回` : "未プレイ";
                text += `\n${diff[idx]}${perfect_num}`;
            }
            alert(text);
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            alert('データの取得中にエラーが発生しました');
        });
}
