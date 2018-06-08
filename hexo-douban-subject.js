'use strict';

//默认配置
var config = {
  'jquery': 'http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js',
}

//全局变量
var book_count = 0;

hexo.extend.tag.register('books', function(args, content){
  var result = '';
  //引入js
  if (config['jquery']) {
    result += '<script src="' + config['jquery'] + '"></script>';
  }
  //引入css
  result += '<style type="text/css">';
  result += '.douban-book{width: 100%;height: 200px;padding: 0;}.book-img{ width: 120px; height: 160px; float: left; background-repeat: no-repeat; background-size: cover; }.book-info{margin-left:144px;height: 100%;font-size: 14px;line-height: 28px;}#title{color: #5183CD;text-decoration: none;font-size: 16px;line-height: 36px;}#rating_tags{ overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }#summary{margin-top: 6px;line-height: 22px;height: 66px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;}.rating{width: 48px;line-height: 20px;margin-top: 3px;margin-bottom: 3px;text-align: center;border: 1px solid #007722;display: inline-block;padding: auto;font-size: 13px;}.tag{color: #007722;/* 3377AA*/background-color: #F5F5F5;line-height: 20px;margin-top: 3px;margin-bottom: 3px;text-align: center;display: inline-block;border-style: none;outline: none;padding: 1px 10px;}.line{ margin-top: 10px; margin-bottom: 10px; height: 1px; border-top: 1px dotted #007722; }';
  result += '</style>';
  result += '<script type="text/javascript">';
  result += 'function getBookInfo(element, type, num, imgurl){ var url=""; if(type == 1)/*book isbn*/ url += "https://api.douban.com/v2/book/isbn/"; else if(type == 2)/*book id*/ url += "https://api.douban.com/v2/book/"; url += num; $.ajax({url: url,type: \'GET\',dataType: \'JSONP\',success: handleData}); function handleData(data) { /*console.log(data);*/ var el_book_img = $(element).children(".book-img"); var el_book_info = $(element).children(".book-info"); el_book_info.children("#title").text(data.title); el_book_info.children("#title").attr("href",data.alt); if(data.author.length>1)  el_book_info.children("#author").text(data.author[0]+"(First Author)"); else  el_book_info.children("#author").text(data.author[0]); var tags="";var num=data.tags.length;var i=0;for(;i<num;i++){ var tag_obj=data.tags[i];if(i<num-1)  tags=tags+"<div class=\\"tag\\">"+tag_obj.name+"</div>"+" "; else tags=tags+"<div class=\\"tag\\">"+tag_obj.name+"</div>";} el_book_info.children("#rating_tags").append("<div class=\\"rating\\">"+data.rating.average+" ♥"+"</div>"+" / "); el_book_info.children("#rating_tags").append(tags); el_book_info.children("#summary").text(data.summary); if(imgurl == null) el_book_img.css("background-image","url("+data.images.medium+")"); else el_book_img.css("background-image","url("+imgurl+")");} }';
  result += '</script>';
  result += content;
  return result;
}, {ends: true});

hexo.extend.tag.register('bookisbn', function(args){
  var result = '';
  var isbn = args[0];
  book_count ++;
  var book_id = 'book' + book_count;
  result += '<div class="douban-book" id="'+book_id+'"><div class="line"></div><div class="book-img"></div><div class="book-info"><a id="title" target="_blank"></a><div id="author"></div><div id="rating_tags"></div><div id="summary"></div></div></div>';
  result += '<script type="text/javascript">';
  if(args[1] == null){
    result += 'getBookInfo($("#'+book_id+'"),1,'+isbn+');';
  }
  else{
    result += 'getBookInfo($("#'+book_id+'"),1,'+isbn+',\"'+args[1]+'\");';
  }
  result += '</script>';
  return result;
});

hexo.extend.tag.register('bookid', function(args){
  var result = '';
  var id = args[0];
  book_count ++;
  var book_id = 'book' + book_count;
  result += '<div class="douban-book" id="'+book_id+'"><div class="line"></div><div class="book-img"></div><div class="book-info"><a id="title" target="_blank"></a><div id="author"></div><div id="rating_tags"></div><div id="summary"></div></div></div>';
  result += '<script type="text/javascript">';
  result += 'getBookInfo($("#'+book_id+'"),2,'+id+');';
  result += '</script>';
  return result;
});