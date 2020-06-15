AddModeBtn = $('<span id="add-mode-btn" class="btn btn-sm btn-default" title="Открыть форму для добавления"><i class="glyphicon glyphicon-plus-sign"></span>').insertAfter("#showmediaurl").on("click", function() {
if (!$(this).hasClass('btn-success')) {
$(this).addClass('btn-success').html('<span title="Закрыть форму"><i class="glyphicon glyphicon-minus-sign"></span>');
let infohead = "<center><strong><font color='red'>Форма для добавления сериалов:</font></strong></center>";
$(`
<form id="add-mode-form" style="background-color: rgba(0,0,0,0.7);padding: 15px">
  <div id="am-wrap"></div>
      <p><input name="link_1" id="link_1" placeholder="Ссылка 1" type="text" class="form-control"></br></p>
      <p><input name="title" type="text"  placeholder="Название" class="form-control"></br></p>
      <p><input name="seriebegin" placeholder="Номер начальной серии" type="text" class="form-control"></br></p>
      <p><input name="serieend" placeholder="Номер конечной серии" type="text" class="form-control"></br></p>
      <p><input type="submit" value="ОК" class="btn btn-sm btn-default">
      <input type="button" name="cancel" value="Отмена" id="cancelpromptbtn" class="btn btn-sm btn-default"></p>
      </form>`).appendTo('#leftpane');showPrompt(infohead,function(args){
    let len = args.length;
    alert("Ссылка: "+args.slice(0,len-3)+" Название: "+args[len-3]+" Начало: "+args[len-2]+" Конец: "+args[len-1]);
});
 
var count = 1;
 
function showPrompt(text,callback) {
  let form = document.getElementById('add-mode-form');
  document.getElementById('am-wrap').innerHTML = text;
 
  form.link_1.value = '';
  form.title.value = '';
  form.seriebegin.value = '';
  form.serieend.value = '';
 
 
  form.elements.link_1.focus();
 
  form.onsubmit = function() {
    let value = form.link_1.value;
    let title = form.title.value;
    let serbegin =  form.seriebegin.value;
    let serend   = form.serieend.value;
    if (value == '') return false; // игнорируем отправку пустой формы
    if (title == '') return false;
    if (serbegin == '') return false;
    if (serend == '') return false;
    //if (value3 < value2) value3=value2++;
    let valarray = [];
    for (i = 1; i < count; i++) {
      let link = document.getElementById(`link_${i}`);
      valarray.push(link.value);
    }
    valarray.push(title);
    valarray.push(serbegin);
    valarray.push(serend);
    complete(valarray);
    return false;
  };
 
  form.cancel.onclick = function() {
    complete(null,null,null,null);
  };
 
  function complete(args) {
    console.log(args);
    document.onkeydown = null;
    callback(args);
 
    function postlinks() {
      if (args.length == 4) {
        var x = args[2];
        var stuplink = args[0];
        function myLoop (){
          setTimeout(function () {
            var link = stuplink+x+".mp4";
            var name = args[1]+' '+x+' серия';
            socket.emit("queue", {id: link,title: name,pos: 'end',type: 'fi',temp: $(".add-temp").prop("checked")});
            x++;
            if (x <= args[3]){
            myLoop();
            }
          }, 3000)
        };
        myLoop();
      } else {
        var len = args.length - 3;
        var x = args[len+1];
        var stuplink = args[0];
        var i = 0;
        function myLoop (){
          setTimeout(function () {
            var link = args[i];
            var name = args[len]+' '+x+' серия';
            socket.emit("queue", {id: link,title: name,pos: 'end',type: 'fi',temp: $(".add-temp").prop("checked")});
            x++;
            i++;
            if (i < len){
            myLoop();
            }
          }, 3000)
        };
        myLoop();
      }
     
    };
    postlinks();
  };
}

var formNode = link_1.parentNode.parentNode;
var prevNode = undefined;
var activeNode = link_1;
var onchFunc = function() {
    //console.log("onfunc")
    var num = this.num;        
    if (this.value) {
        if (this == activeNode) {
          count += 1;
          let p = document.createElement('p');
          var newid = "link_" + count;
          p.innerHTML = `<input id=${newid} class="form-control" type="text"></br>`;
          p.childNodes[0].onchange = onchFunc;
          p.childNodes[0].num = count;
          p.childNodes[0].placeholder = "Ссылка " + count;
          prevNode   = activeNode;
          activeNode = p.childNodes[0];
          formNode.insertBefore(p, this.parentNode.nextElementSibling);
          //console.log(formNode.children.length)
        }
 
    } else {
      if (count > 1 && this == prevNode) {
        count -= 1;
        var p = this.parentNode.previousElementSibling;
        if (p)
          prevNode = p.childNodes[0];
        else
          prevNode = undefined;
        activeNode = this;
        this.parentNode.nextElementSibling.remove();
      }
    }
     
};
link_1.num = 1;
link_1.onchange = onchFunc;   

/***AddModeHelpBtn***/
window.cytubeEnhanced.addModule('AMHelpBtn', function (app, settings) {
	    'use strict';
	    var that = this;

	    this.handleAddVideoBtn = function (commands) {
	        var $header = $('<h3 class="modal-title">').text('Помощь по добавлению из формы добавления сериалов');

	        var $bodyWrapper = $(`<p><font color="green" size="5">Форма для добавления сериалов упрощает добавление нескольких серий одного сериала.</font></p>
	        <p>Как это работает:
	        <ul>
	        <li><strong>Скопируйте ссылку в строку с надписью "Ссылка 1"</strong>, ниже появится новая строка с надписью "Ссылка 2". Добавьте вторую ссылку на следующую серию сериала во вторую строку "Ссылка 2". Продолжайте выполнять данные действия для добавления ссылок 3, 4, 5 серий и т.д.</li>
	        <li><strong>Впишите в строку "Название" собственно само название сериала. <font color="red">Если вы добавляете, например, второй сезон сериала, то в данную строку, соответственно, после названия необходимо добавить дополнительные слова через пробел - "2 сезон".</font></strong></br><font color="#00ef1f">Например: "Доктор Кто 2 сезон" - введённое в строку "Название".</font></li>
	        <li><strong>Введите в строку "Номер начальной серии"</strong> номер первой серии с которой вы начинаете добавление.</li>
	        <li><strong>Введите в строку "Номер конечной серии"</strong> номер последней серии на которой вы останавливаете добавление.</li>
	        <li><strong>Важно, <font color="red">чтобы количество ссылок совпадало с указанным диапазоном начальной и конечной серий, иначе возможно неправильное наименование серий.</font></strong></li>
	        <li><strong>Нажмите кнопку "ок"</strong> и в конец плейлиста добавятся введённые вами ссылки на серии и им автоматически присвоится имя, указанное в строке "название", а также номер серии, указанный с начальной по конечную серии в соответствующих строках.</br> 
	        <font color="red">Шаблон имени -</font> "Название" + "номер серии" + "серия".</br> 
	        <font color="#00ef1f">Например: Доктор Кто 2 сезон 5 серия.</font> </li>
	        </ul>
	        </p>`);

	        app.UI.createModalWindow('request-list', $header, $bodyWrapper);
	    };
	    this.$AddModeHelpBtn = $('<button id="help-addmode-btn" class="btn btn-sm btn-default" title="Инструкция по добавлению сериалов"><i class="glyphicon glyphicon-question-sign">')
	        .text(app.t(''))
	        .insertAfter('#add-mode-form')
	        .on('click', function () {
	            that.handleAddVideoBtn(that.commands);
	        });
	});
/***END***/	

} else {
$(this).removeClass('btn-success').html('<span title="Открыть форму для добавления"><i class="glyphicon glyphicon-plus-sign"></span>');
$('#add-mode-form').remove();$('#help-addmode-btn').remove();}
  });
  



function updateAddMode() {
if (CLIENT.rank >= 1) {
$('#add-mode-btn').show();
$('#help-addmode-btn').show();
};
if (CLIENT.rank < 1) {
$('#add-mode-btn').hide();
$('#help-addmode-btn').hide();
};
}
updateAddMode();
socket.on("rank", function() { updateAddMode(); });
socket.on("login", function() { updateAddMode(); });
