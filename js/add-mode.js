AddModeBtn = $('<span id="add-mode-btn" class="btn btn-sm btn-default">Добавить</span>').appendTo("#leftcontrols").on("click", function() {
if (!$(this).hasClass('btn-success')) {
$(this).addClass('btn-success').html('Закрыть');
$(`
<form id="prompt-form">
  <div id="prompt-message"></div>
      <p><input name="link_1" id="link_1" placeholder="Ссылка 1" type="text" class="form-control"></br></p>
      <p><input name="title" type="text"  placeholder="Название" class="form-control"></br></p>
      <p><input name="seriebegin" placeholder="Номер начальной серии" type="text" class="form-control"></br></p>
      <p><input name="serieend" placeholder="Номер конечной серии" type="text" class="form-control"></br></p>
      <p><input type="submit" value="ОК" class="btn btn-sm btn-default">
      <input type="button" name="cancel" value="Отмена" class="btn btn-sm btn-default"></p>
      </form>`).appendTo('#leftpane');showPrompt("Форма для добавления аниме:",function(args){
    let len = args.length;
    alert("Ссылка: "+args.slice(0,len-3)+" Название: "+args[len-3]+" Начало: "+args[len-2]+" Конец: "+args[len-1]);
});
 
var count = 1;
 
function showPrompt(text,callback) {
  let form = document.getElementById('prompt-form');
  document.getElementById('prompt-message').innerHTML = text;
 
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
          }, 1000)
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
          }, 1000)
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
    console.log("onfunc")
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
          console.log(formNode.children.length)
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
} else {
$(this).removeClass('btn-success').html('Добавить');
$('#prompt-form').remove();}
  });
