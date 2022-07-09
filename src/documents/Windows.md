## [Git 安装](https://git-scm.com/downloads)
<br />

## [Node 安装](https://nodejs.org/zh-cn/)
<br />

## [VsCode 安装](https://blog.csdn.net/weixin_44180172/article/details/112178334?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_v2~rank_aggregation-2-112178334.pc_agg_rank_aggregation&utm_term=vscode+%E5%9B%BD%E5%86%85%E4%B8%8B%E8%BD%BD&spm=1000.2123.3001.4430)
先安装 Git 再下载插件 Setting Sync  `Ctrl` + `Shift` + `d` 同步云端配置。
<br />

## Yarn 安装  
使用一条命令即可 
``` javascript
npm install -g yarn
```
<br />

## 字体更改
#### [字体下载地址](https://github.com/microsoft/cascadia-code/releases)
在vscode配置中搜索`Editor: Font Family` 并设置以下值。
```
'Cascadia Code', 'Courier New', monospace
```
需要在配置中将连字打开（设置中搜索`fontLigatures`关键词）
```
"editor.fontLigatures": true,
```
<br />

## CapsLock 改 CTRL
* `win + r` 输入 `regedit`
* 查找路经 `HKEY_LOCAL_MACHINE` -> `SYSTEM` -> `CurrentControlSet` -> `Control` -> `Keyboard Layout`
* 右键单击 新建 -> 二进制值 -> 命名为 `Scancode Map`
* 输入以下值
![Keyword Layout](https://7878-xxxx-7gf3wgb3db1ba00e-1305738676.tcb.qcloud.la/Dingtalk_20210506112352.jpg?sign=365571ebe955a5961b692b6c62d7a65c&t=1620271448)
* 完成后重启即可