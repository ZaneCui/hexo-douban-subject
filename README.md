# hexo-douban-subject
A small script plugin for hexo that help show a list of movies, books, games.

一个 [Hexo](https://hexo.io) 的脚本插件，帮助在博客md文章中插入图书、电影、游戏列表。（信息来自豆瓣）


## 安装/Installation
1. 下载脚本插件`hexo-douban-subject.js`。
 / Download the script file.
2. 将脚本放到Hexo博客源码目录的`scripts`下，或者博客的主题`scripts`下(如下)。/ Put the script file to the `scripts` in source directory of blog, or the `scripts` in theme directory of blog.
```
cd myblog/themes/next/scripts
wget -c https://github.com/ZaneCui/hexo-douban-subject/blob/master/hexo-douban-subject.js
```

## 配置/Config
脚本插件自带默认配置，不需要做额外配置。/ NO NEED

## 使用/Use
1. 插入书籍信息

在Markdown文章中直接写入
```
{% books %}
{% bookisbn 9787300088549 "/static/about/1.jpg" %}
{% bookisbn 9787300072487 %}
{% bookid 1082406 %}
{% endbooks %}
```
说明
- `{% books %}`：插入书籍信息的开始标识
- `{% bookisbn xxx url %}`：通过isbn获取书籍信息。xxx为isbn号，url为书籍封面照片地址（可不传入url，自动通过豆瓣获取）
- `{% bookid xxx url %}`：通过条目id获取书籍信息。xxx为id号，url为书籍封面照片地址（可不传入url，自动通过豆瓣获取）
- `{% endbooks %}`：插入书籍信息的结束标识

## 截图/Screenshots
Hexo NexT.Gemini 主题

![图片加载失败](./screenshot/example.png '示例')