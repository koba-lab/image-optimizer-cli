# image optimizer cli

画像のリサイズと圧縮を同時に行うめちゃ簡素なローカル実行用ツール。

1. tmp/source に変換したい画像を入れる
2. `docker-compose run --rm app node main.js`
3. tmp/dist に変換後画像が出力される

仕事で急遽使う要件が出て作ったやつなので、パラメータ指定とかエラーハンドリングとかが未実装です。
