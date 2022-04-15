# TEI Parallel Text Viewer

## Example

### 絵入源氏物語（国文研所蔵） + 与謝野晶子訳（青空文庫）

https://tei-eaj.github.io/parallel_text_viewer/app/#/?u=https://tei-eaj.github.io/parallel_text_viewer/data/pt/config.json

### [デジタル源氏物語](https://genji.dl.itc.u-tokyo.ac.jp/)

https://tei-eaj.github.io/parallel_text_viewer/app/#/v2?u=https://genji.dl.itc.u-tokyo.ac.jp/data/vol/01/config.json

## 使い方

次に述べる設定情報を含むJSONファイルを引数として指定する

https://tei-eaj.github.io/parallel_text_viewer/app/#/v2?u=[設定情報を含むJSONファイルのURL]

## 設定内容

| 必須 | 用途 |　項目 | 値 | 備考  |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| *  | データ  | url_main  | 画面右上に表示するメインテキスト（翻刻テキストなど）  | 現代語訳との対応付け（anchor）がなされている場合には、ハイライト表示が連動する  |
| *  | データ  | url_sub  | 画面右下に表示するサブテキスト（現代語訳文など）  |   |
|   | データ  | image_map  | 画面左部に表示する画像情報  | [IIIF Curation](http://codh.rois.ac.jp/iiif/curation/)形式で、メインテキストの行と画像を紐づける  |
|   | 表示用  | return_url  | ホームボタンのリンク  |   |
|   | 表示用  | return_label  | ホームボタンのラベル  |   |
|   | 表示用  | direction  | テキストの表示方向  | 縦書きの場合はverticalを指定する  |


