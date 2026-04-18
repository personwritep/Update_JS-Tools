// ==UserScript==
// @name        Update JS-Tools
// @namespace        http://tampermonkey.net/
// @version        0.2
// @description        スクリプトツール一覧表からスクリプトツールをアップデート
// @author        Ameba Blog User
// @match        https://ameblo.jp/personwritep/entry-12762321136.html
// @match        https://ameblo.jp/personwritep/entry-12828652236.html
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameblo.jp
// @noframes
// @grant        none
// @updateURL        https://github.com/personwritep/Update_JS-Tools/raw/main/Update_JS-Tools.user.js
// @downloadURL        https://github.com/personwritep/Update_JS-Tools/raw/main/Update_JS-Tools.user.js
// ==/UserScript==



let target=document.querySelector('head');
let monitor=new MutationObserver( main );
monitor.observe(target, {childList: true});


function main(){
    let all_td=document.querySelectorAll('td');
    for(let k=0; k<all_td.length; k++){
        if(all_td[k].textContent=="GitHub"){
            all_td[k].oncontextmenu=function(){ //「GitHub」を「右Click」
                let link=all_td[k].querySelector('a');
                if(link){
                    let tool_name;
                    let download_url;
                    let link_url;
                    let link_href=link.getAttribute('href');

                    let guery=link_href.split('?')[1];
                    if(guery){
                        tool_name=guery.toString();
                        link_url=link_href.split('?')[0];
                        download_url=link_url +'/raw/main/'+ tool_name +'.user.js';
                        window.open(download_url, '_blank', ); }
                    else{
                        let parts=link_href.split('/');
                        tool_name=parts[parts.length-1];
                        download_url=link_href +'/raw/main/'+ tool_name +'.user.js';
                        window.open(download_url, '_blank', ); }
                }}}}

} // main()


/*
1個のリポジトリに複数のスクリプトツールを纏めている場合に、リポジトリ名とツール名が異なり
自動アップデートの対象ツールが判定出来ない事になります。

これを回避するために、混成のリポジトリでは、クエリ文字列でツール名を追記したリンクを用意し
通常にリンクの「左Click」ではリポジトリを表示し、リンクの「右Click」では、このツールが機能し
スクリプトツールの「アップデートリンク」を開く様にします。 （2026年2月 このリンクに変更）
*/
