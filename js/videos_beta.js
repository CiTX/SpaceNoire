// myVideopage v0.2.7 beta

function parseMediaLink(url) {
    if(typeof url != "string") {
        return {
            id: null,
            type: null
        };
    }
    url = url.trim();
    url = url.replace("feature=player_embedded&", "");

    if(url.indexOf("rtmp://") == 0) {
        return {
            id: url,
            type: "rt"
        };
    }

    var m;
    if((m = url.match(/youtube\.com\/watch\?([^#]+)/))) {
        return {
            id: extractQueryParam(m[1], "v"),
            type: "yt"
        };
    }

    if((m = url.match(/youtube\.com\/shorts\/([^#]+)/))) {
        return {
            id: m[1].split("?")[0],
            type: "yt"
        };
    }


    if((m = url.match(/youtu\.be\/([^\?&#]+)/))) {
        return {
            id: m[1],
            type: "yt"
        };
    }

    if((m = url.match(/youtube\.com\/playlist\?([^#]+)/))) {
        return {
            id: extractQueryParam(m[1], "list"),
            type: "yp"
        };
    }

    if ((m = url.match(/clips\.twitch\.tv\/([A-Za-z]+)/))) {
        return {
            id: m[1],
            type: "tc"
        };
    }

    if((m = url.match(/twitch\.tv\/(?:.*?)\/([cv])\/(\d+)/))) {
        return {
            id: m[1] + m[2],
            type: "tv"
        };
    }

    /**
     * 2017-02-23
     * Twitch changed their URL pattern for recorded videos, apparently.
     * https://github.com/calzoneman/sync/issues/646
     */
    if((m = url.match(/twitch\.tv\/videos\/(\d+)/))) {
        return {
            id: "v" + m[1],
            type: "tv"
        };
    }

    if((m = url.match(/twitch\.tv\/([\w-]+)/))) {
        return {
            id: m[1],
            type: "tw"
        };
    }

    if((m = url.match(/livestream\.com\/([^\?&#]+)/))) {
        return {
            id: m[1],
            type: "li"
        };
    }

    if((m = url.match(/ustream\.tv\/([^\?&#]+)/))) {
        return {
            id: m[1],
            type: "us"
        };
    }

    if ((m = url.match(/(?:hitbox|smashcast)\.tv\/([^\?&#]+)/))) {
        return {
            id: m[1],
            type: "hb"
        };
    }

    if((m = url.match(/vimeo\.com\/([^\?&#]+)/))) {
        return {
            id: m[1],
            type: "vi"
        };
    }

    if((m = url.match(/dailymotion\.com\/video\/([^\?&#_]+)/))) {
        return {
            id: m[1],
            type: "dm"
        };
    }

    if((m = url.match(/imgur\.com\/a\/([^\?&#]+)/))) {
        return {
            id: m[1],
            type: "im"
        };
    }

    if((m = url.match(/soundcloud\.com\/([^\?&#]+)/))) {
        return {
            id: url,
            type: "sc"
        };
    }

    if ((m = url.match(/(?:docs|drive)\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)) ||
        (m = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/))) {
        return {
            id: m[1],
            type: "gd"
        };
    }

    if ((m = url.match(/vid\.me\/embedded\/([\w-]+)/)) ||
        (m = url.match(/vid\.me\/([\w-]+)/))) {
        return {
            id: m[1],
            type: "vm"
        };
    }

    if ((m = url.match(/(.*\.m3u8)/))) {
        return {
            id: url,
            type: "hl"
        };
    }

    if((m = url.match(/streamable\.com\/([\w-]+)/))) {
        return {
            id: m[1],
            type: "sb"
        };
    }

    if ((m = url.match(/\bmixer\.com\/([\w-]+)/))) {
        return {
            id: m[1],
            type: "mx"
        };
    }

    /*  Shorthand URIs  */
    // So we still trim DailyMotion URLs
    if((m = url.match(/^dm:([^\?&#_]+)/))) {
        return {
            id: m[1],
            type: "dm"
        };
    }
    // Raw files need to keep the query string
    if ((m = url.match(/^fi:(.*)/))) {
        return {
            id: m[1],
            type: "fi"
        };
    }
    if ((m = url.match(/^cm:(.*)/))) {
        return {
            id: m[1],
            type: "cm"
        };
    }
    // Generic for the rest.
    if ((m = url.match(/^([a-z]{2}):([^\?&#]+)/))) {
        return {
            id: m[2],
            type: m[1]
        };
    }
    if(location.hostname==='synchtube.ru'){
    if((m = url.match(/(vk\.com||vkvideo\.ru)\/video(\?z=video)?(([^\?&#]+)\_([^\?&#]+))(\?([^\?&#]+))?/))) {
        return {
            id: 'https://api-animach.vercel.app/vk.mp4?id='+encodeURIComponent(m[3]),
            type: "fi"
        };
    }
	if((m = url.match(/rutube\.ru\/video\/([^#]+)/))) {
        return {
            id: 'https://api-animach.vercel.app/rutube.mp4?id='+encodeURIComponent(m[1]),
            type: "fi"
        };
    }
	if((m = url.match(/rutube\.ru\/shorts\/([^#]+)/))) {
        return {
            id: 'https://api-animach.vercel.app/rutube.mp4?id='+encodeURIComponent(m[1]),
            type: "fi"
        };
    }   
    }else{
    if((m = url.match(/(vk\.com||vkvideo\.ru)\/video(\?z=video)?(([^\?&#]+)\_([^\?&#]+))(\?([^\?&#]+))?/))) {
        return {
            id: 'https://api-animach.vercel.app/vk.json?url='+encodeURIComponent('https://vk.com/video'+m[3]),
            type: "cm"
        };
    }
	if((m = url.match(/rutube\.ru\/video\/([^#]+)/))) {
        return {
            id: 'https://api-animach.vercel.app/rutube.json?id='+encodeURIComponent(m[1]),
            type: "cm"
        };
    }
	if((m = url.match(/rutube\.ru\/shorts\/([^#]+)/))) {
        return {
            id: 'https://api-animach.vercel.app/rutube.json?id='+encodeURIComponent(m[1]),
            type: "cm"
        };
    }
    }

    /* Raw file */
    var tmp = url.split("?")[0];
    if (tmp.match(/^https?:\/\//)) {
        if (tmp.match(/^http:/)) {
            Callbacks.queueFail({
                link: url,
                msg: "Raw files must begin with 'https'.  Plain http is not supported."
            });
            throw new Error("ERROR_QUEUE_HTTP");
        } else if (tmp.match(/\.json$/)) {
            return {
                id: url,
                type: "cm"
            };
        } else if (tmp.match(/kissanime|kimcartoon|kisscartoon/i)) {
            Callbacks.queueFail({
                link: url,
                msg: "Kisscartoon and Kissanime are not supported.  See https://git.io/vxS9n" +
                     " for more information about why these cannot be supported."
            });
            throw new Error("ERROR_QUEUE_KISS");
        } else if (tmp.match(/mega\.nz/)) {
            Callbacks.queueFail({
                link: url,
                msg: "Mega.nz is not supported.  See https://git.io/fx6fz" +
                     " for more information about why mega.nz cannot be supported."
            });
            throw new Error("ERROR_QUEUE_MEGA");
        } else if (tmp.match(/\.(mp4|flv|webm|og[gv]|mp3|mov|m4a)$/)) {
            return {
                id: url,
                type: "fi"
            };
        } else {
            Callbacks.queueFail({
                link: url,
                msg: "The file you are attempting to queue does not match the supported " +
                     "file extensions mp4, flv, webm, ogg, ogv, mp3, mov, m4a. " +
                     "For more information about why other filetypes are not supported, " +
                     "see https://git.io/va9g9"
            });
            // Lol I forgot about this hack
            throw new Error("ERROR_QUEUE_UNSUPPORTED_EXTENSION");
        }
    }

    return {
        id: null,
        type: null
    };
}

$('<style>')
.appendTo('head')
.addClass('my_vpb_0_2_4')
.text(`
#my_video_page_toggle a{
margin-left: 20px;
margin-right: 0px;
}
#my_video_page_toggle a:before {
    content: "";
    display: inline-block;
    width: 32px;
    height: 32px;
    position: absolute;
    top: 12px;
    left: -18px;
    background: url(https://dl.dropbox.com/s/dsomsxz1xei6330sbuddq/my_videos_icon.png?rlkey=zrhbwvegn8ytrgswuo2afqz9n) no-repeat 0 0;
    background-size: 100%;
}
#my_video_wrap {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: row;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding-top: 28px;
    padding-left: 20px;
    padding-right: 0px;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
}
#my_page_video_item{
max-width:300px
}
.vduration{
    position: relative;
    top: -25px;
    right: 10px;
    float: right;
    background-color: black;
}
.video_nav{
width:100%;
position: fixed;
z-index: 2;
background:black;
}
.video_nav.btn{
border:1px solid grey;
border-radius: 7px;
}
.yt-preview.mvpyt{
border-radius: 5%;
border: 1px solid #FF5722;
}
#footer{
display:none
}
#my_video_page {
    height: calc(100vh - 70px);
    overflow-y: scroll;
}
.vopts {
    position: absolute;
    top: -28px;
    left: 10px;
    float: left;
    background-color: black;
}
.mvp_hide,.mvp_close{
    float: right;
    font-size: 12px;
    font-weight: bold;
    padding: 5px;
    background: white;
    border-radius: 50%;
    padding-top: 0px;
    padding-bottom: 0px;
    color: black;
}
.mvp_hide{
float: left;
margin-right: 5px;
}
.vopts.pointer{
display:block !important;
background-color:black;
font-size:0px;
}
.vopts.pointer {
    height: 24px;
    width: 24px;
    background-color: black! important;
    left: 5px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAQCAYAAAAxtt7zAAAACXBIWXMAAAOwAAADsAEnxA+tAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAACMSURBVHjajI2hjUJRAATnPwwCBAKPRWGvBDpAUAmOGvA0gKMIgsKhMeQECSHhE9xmF3Ek94JikpWzQ6xZrLy3bGLdgAF/3Atw4Z+WWMNY21i7WOMmFjWFDwowAfbAEZgS67fKXgvQrYwOsX5inWM9Y82/q/SAFbABRsQ6VJVTE6sF+m/jUYBFdbF+DQBKq2AvdDrUFQAAAABJRU5ErkJggg==) no-repeat 0 0;
    background-position: center;
    border-radius: 15px;
}
.mvp-video-item,#mvplayer{
    width: 100%;
    height: calc(100vh - 270px);
}
.mvp_current {
    background-color: #ff7f5078;
    border-radius: 1em;
}
#my_video_wrap{overflow-x: hidden;}
#my_video_wrap a{word-wrap: break-word;}
.my_videos::before {
    content: '💾  '
}
.temp_videos::before {
    content: '📜 '
}
.temp_fav::before {
    content: '❤️ '
}
.video_nav {
    background-color: rgba(20,22,26,0.7);
    border-bottom: 1px solid rgba(0,0,0,0.6);
    text-align: center;
}
 
.yt-preview.mvpyt {
    height: 200px !important;
    width: 100%;
    visibility: inherit;
    object-fit: cover;
    border: none;
}
@media (max-width:992px){
.video_player_space:not(:empty){
width:100% !important;
}
#my_video_page_toggle a:before{background:none !important}
#my_video_page_toggle a{margin-left: 0px}
}
`);

var MVP_PLAYER,
mvp_autoplay=1,
mvp_current={},
mvp_current_meta={
	type:false,
	index:false,
	current:false,
	next:false,
	prev:false,
	currentDiv:false,
	nextDiv:false,
	prevDiv:false
};

function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;
    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    return s;
}

function onYouTubeIframeAPIReady(data){
MVP_PLAYER = new YT.Player('mvplayer', {
playerVars: {'autoplay': 1, 
'controls': 1, 
'showinfo': 0, 
'rel': 0,
'origin': location.hostname,
'autohide': 1,
'iv_load_policy': 3,
'rel': 0},                
videoId: data,
events: {
'onReady': onPlayerReady
}
})
}

function onPlayerReady(event) {
let ytplready = MVP_PLAYER;
var player = event.target;
iframe = document.getElementById('mvplayer');	
if(mvp_autoplay){
MVP_PLAYER.playVideo();
setTimeout(MVP_OBSERVER,5e3);
}	
mvp_current={
currentTime: 0,
duration: secToTime(MVP_PLAYER.playerInfo.duration),
id: MVP_PLAYER.playerInfo.videoData.video_id,
meta: {},
paused: false,
seconds: MVP_PLAYER.playerInfo.duration,
title: MVP_PLAYER.playerInfo.videoData.title,
type: "yt"
}
}

function scrollToCurrentMVP(){
try{
if($('.mvp_current').length){
$("#my_video_page").scrollTop($("#my_video_page").scrollTop()+$('.mvp_current').offset().top-100);
}
}catch(e){}
}

function MVP_GET_PLAY_DATA(type,arr,i){
mvp_current_meta.current={data:arr[i]};
(((i+1)<arr.length)?mvp_current_meta.next={data:arr[i+1]}:mvp_current_meta.next=false);
(((i-1)>=0)?mvp_current_meta.prev={data:arr[i-1]}:mvp_current_meta.prev=false);
mvp_current_meta.type=type;
}


function MVPgetCurrentData(div){

	let vid=div.data('vid'),
	type=div.data('type'),
	index=-1;

	switch(type){
		case 'addedByMe':
			index=USRSTAT.last_videos.map(function(o) {return o.id}).indexOf(vid);
			MVP_GET_PLAY_DATA(type,USRSTAT.last_videos,index);
		break;
		case 'chanHistory':
			index=TEMP_VIDS.history.map(function(o) {return o.id}).indexOf(vid);
			MVP_GET_PLAY_DATA(type,TEMP_VIDS.history,index);
		break;
		case 'chanFav':
			index=TEMP_VIDS.fav.map(function(o){return o.id}).indexOf(vid);
			MVP_GET_PLAY_DATA(type,TEMP_VIDS.fav,index);
		break;
		default:
		return;
		break;
	}
}


function MVP_PLAY_META(e){
$('.mvp_current').removeClass('mvp_current');
e.addClass('mvp_current');
mvp_current_meta.type=e.data('type');
mvp_current_meta.index=e.data('index');
mvp_current_meta.prevDiv=e.prev('#my_page_video_item')||false;
mvp_current_meta.currentDiv=e||false;
mvp_current_meta.nextDiv=e.next('#my_page_video_item')||false;
scrollToCurrentMVP();
}

function MVP_PLAY_NEXT(){
	if($('#my_video_page').is(':visible')){
		if(mvp_current_meta.nextDiv!==false && mvp_current_meta.nextDiv.length!==0){
			mvp_current_meta.nextDiv.children().children('img').click();
			scrollToCurrentMVP()
		}
	}else{
		if(mvp_current_meta.next){
			getVideoSpace(mvp_current_meta.next.data.id);
			mvp_current_meta.index++;

			let fakeDiv={
				data:function(e){
					if(e==="vid"){
						return mvp_current_meta.next.data.id
					}else if(e==="type"){
						return mvp_current_meta.type
					}
				}
			}
			MVPgetCurrentData(fakeDiv);
		}
	}
}

function MVP_OBSERVER(){
try{
	mvp_current.currentTime=MVP_PLAYER.playerInfo.currentTime;

	if(mvp_current.currentTime+5>=hmsToSecondsOnly(mvp_current.duration)){
	MVP_PLAY_NEXT()
	}
setTimeout(MVP_OBSERVER,7e3);
}catch(e){
}
}

function clearAllPages(){
$('#my_friends_wrap').empty();
$('#my_friends_wrap').removeClass('success');
$('#my_friends_page').hide();
$('#my_video_wrap').empty();
$('#my_video_wrap').removeClass('success');
$('#my_video_page').hide();
$('#my_game_wrap').removeClass('success');
$('#my_games_page').hide();
}



if($('#my_video_page').length>0){
$('#my_video_page').remove();
}

if($('#my_video_page_toggle').length>0){
$('#my_video_page_toggle').remove();
}

$('<section id="my_video_page" style="padding-top:52px"><div id="my_video_wrap"></div></section>').insertAfter('#mainpage').hide();
$('.navbar-nav').append('<li id="my_video_page_toggle"><a href="javascript:void(0)" onclick="javascript:showMyVideoPage()">Видео</a></li>');

var TEMP_VIDS={
history:[],
fav:[]
};

var VIDS_HYSTORY_LENGTH = 1500;

if(localStorage.getItem(CHANNEL.name+'_TEMP_VIDS')){
TEMP_=JSON.parse(localStorage.getItem(CHANNEL.name+'_TEMP_VIDS'));
for(let k in TEMP_){
TEMP_VIDS[k]=TEMP_[k];
}
}else{
localStorage.setItem(CHANNEL.name+'_TEMP_VIDS', JSON.stringify(TEMP_VIDS));
}

socket.on("changeMedia",(data)=>{
if(data.type==="yt" && !TEMP_VIDS.history.some(e => e.id === data.id)){
if(TEMP_VIDS.history.length>=VIDS_HYSTORY_LENGTH){
TEMP_VIDS.history.shift()
}
TEMP_VIDS.history.push(data);
localStorage.setItem(CHANNEL.name+'_TEMP_VIDS', JSON.stringify(TEMP_VIDS));
}
});

function create_mvp_wrapper(){
if($('.my_video_wrap_nav').length===0){
$('#my_video_wrap').append(`
<div class="my_video_wrap_nav" style="position:fixed;right:15px;bottom:15px;z-index:5">
<span class="btn-default pointer scroll-up" onclick="$('#my_video_page').scrollTop(0)">Вверх</span>
<span class="btn-default pointer scroll-down" onclick="$('#my_video_page').scrollTop($('#my_video_page').prop('scrollHeight'))">Вниз</span> 
</div>
`);
handleScrollBtns();
}
}

function renderVideos(arr,type){
$('#my_video_wrap').empty();
if(arr.length){
	for(let video of arr){
		if(video.type==="yt" && !/^(http(s)\:\/\/)/.test(video.id)){
		let index=arr.map(function(o){return o.id}).indexOf(video.id),
		isCurrent="";

		if(type===mvp_current_meta.type && index===mvp_current_meta.index){
		isCurrent=' class="mvp_current"';
		}
			$('<div style="padding:15px" id="my_page_video_item"'+isCurrent+'>'+
			'<div>'+
			'<img class="yt-preview mvpyt pointer" src="https://i.ytimg.com/vi/'+video.id+'/hqdefault.jpg" style="max-height: 200px;    height: 200px;" loading="lazy" />'+
			'<span class="vduration">'+video.duration+'</span>'+
			'<div class="dropdown vopts-row">'+
			'<a class="vopts pointer dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)" aria-expanded="false" style="display:none">o</a>'+
			'<ul class="dropdown-menu">'+
			'<li><a href="javascript:void(0)" onclick="add_mvp(this)"><span class="vopts_add">добавить в плейлист</span></a></li>'+
			'<li><a href="javascript:void(0)" onclick="add_fav(this)"><span class="vopts_fav">в избранное</span></a></li>'+
			'<li><a href="javascript:void(0)" onclick="delete_mvp(this)"><span class="vopts_remove">удалить</span></a></li>'+
			'</ul>'+
			'</div>'+
			'</div>'+
			'</br><a target="_blank" href="https://www.youtube.com/watch?v='+video.id+'">'+video.title+'</a>'+
			'</div>').data({vid:video.id,type:type||'default',vinfo:video,index:index}).appendTo('#my_video_wrap');
		}
	}
scrollToCurrentMVP();
if($('.mvp_current').length){
MVP_PLAY_META($('#my_page_video_item.mvp_current'));
}
}else{
	$('#my_video_wrap').append('<span style="padding:50px;">Видео пока нет, но они скоро появятся.</span>');
}
create_mvp_wrapper()
}

function delete_mvp(e){
let div = $(e).parent().parent().parent().parent().parent(),
vid=div.data('vid'),
type=div.data('type'),
index=-1;
switch(type){
case 'addedByMe':
index=USRSTAT.last_videos.map(function(o) {return o.id}).indexOf(vid);
USRSTAT.last_videos.splice(index,1);
try{
saveUserStat()
}catch(e){
}
break;
case 'chanHistory':
index=TEMP_VIDS.history.map(function(o) {return o.id}).indexOf(vid);
TEMP_VIDS.history.splice(index,1);
localStorage.setItem(CHANNEL.name+'_TEMP_VIDS', JSON.stringify(TEMP_VIDS));
break;
case 'chanFav':
index=TEMP_VIDS.fav.map(function(o){return o.id}).indexOf(vid);
TEMP_VIDS.fav.splice(index,1);
localStorage.setItem(CHANNEL.name+'_TEMP_VIDS', JSON.stringify(TEMP_VIDS));
break;
default:
return;
break;
}

$(div).remove();

}

function add_mvp(e){
let link = $(e).parent().parent().parent().parent().parent().children("a").attr("href");
let data = parseMediaLink(link);
if(data){
data.pos = "end";
data.temp = $(".add-temp").prop("checked");
socket.emit("queue", data);
}
}

function add_fav(e){
let div = $(e).parent().parent().parent().parent().parent(),
vid=div.data('vid'),
data=div.data('vinfo'),
index=-1;
index=TEMP_VIDS.fav.map(function(o){return o.id}).indexOf(vid);
if(index==-1){
TEMP_VIDS.fav.push(data);
localStorage.setItem(CHANNEL.name+'_TEMP_VIDS', JSON.stringify(TEMP_VIDS));
}
}

function render_my_Videos(){
renderVideos(USRSTAT.last_videos,"addedByMe")
}

function render_temp_Videos(){
renderVideos(TEMP_VIDS.history,"chanHistory")
}

function render_fav_Videos(){
renderVideos(TEMP_VIDS.fav,"chanFav")
}

function showMyVideoPage(){
if(!$('#my_video_wrap').hasClass('success')){
$('#mainpage').hide();
clearAllPages();
$('#my_video_page').show();
$('#my_video_wrap').addClass('success');
$('.video_nav').remove();
$('<div>').addClass('video_nav').insertBefore('#my_video_wrap');
if(!$('.video_player_space').length){
	$('<div>').addClass('video_player_space').insertAfter('#my_video_wrap');
}else{
showMyVideoPlayer()
}
$('<span>').addClass('btn my_videos').text('Мои видео').attr("title","Добавленные мною видео").prependTo('.video_nav');
$('<span>').addClass('btn temp_videos').text('История').attr("title","Последние просмотренные видео").appendTo('.video_nav');
$('<span>').addClass('btn temp_fav').text('Избранное').attr("title","Добавленные в избранное видео из других разделов").appendTo('.video_nav');

if(mvp_current_meta.type){
	switch(mvp_current_meta.type){
		case 'addedByMe':
			render_my_Videos();
		break;
		case 'chanHistory':
			render_temp_Videos();
		break;
		case 'chanFav':
			render_fav_Videos();
		break;
		default:
		break;
	}
}else{
	render_my_Videos();
}


if($('.video_player_space').length && $('.video_player_space').is(":hidden")){
	if(!$('.mvp_hide').length){
		$('.video_nav').append('<span class="mvp_hide pointer" onclick="showMyVideoPlayer();$(this).remove()">+</span>');
	}
}

$('.my_videos').on('click',()=>{
$('.video_nav .btn').removeClass('mvp_active');
$('.my_videos').addClass('mvp_active');
render_my_Videos();
});

$('.temp_videos').on('click',()=>{
$('.video_nav .btn').removeClass('mvp_active');
$('.temp_videos').addClass('mvp_active');
render_temp_Videos()
});

$('.temp_fav').on('click',()=>{
$('.video_nav .btn').removeClass('mvp_active');
$('.temp_fav').addClass('mvp_active');
render_fav_Videos()
});

}else{
$('.video_player_space').show();
clearAllPages();
$('#mainpage').show();
}
}

$('body').off('click','#my_page_video_item img');

function showMyVideoPlayer(){
$('.video_player_space').show();
$('.MVPl-style').html(resizeMyVideoWrap());
scrollToCurrentMVP()
}

function hideMyVideoPlayer(){
$('.video_nav').append('<span class="mvp_hide pointer" onclick="showMyVideoPlayer();$(this).remove()">+</span>');
$('.MVPl-style').html('');
scrollToCurrentMVP();
}

function resizeMyVideoWrap(){
let style=`
.video_player_space:not(:empty) {
    position: fixed;
    left: 0px;
    bottom: 32px;
    top: 120px !important;
    height: calc(100% - 190px) !important;
    width: 70%;
    background-color: rgba(0,0,0,1);
    z-index: 9;
    padding: 15px;
    border-radius: 30px;
    padding-bottom: 45px;
}
#my_video_wrap {
    padding-top: 70px;
    padding-left: 70% !important;
}
.yt-preview.mvpyt{
max-height:100px !important
}
#my_page_video_item {
    max-width: 170px !important;
}
.embed-my-video-item{
width: 100%;
height: calc(100vh - 250px) !important;
border-radius: 30px;
}
`;
return style
}

function getVideoSpace(data){
$('.video_player_space').empty();
$('<div>'+
'<span class="mvp_control_panel pointer" style="float:right;font-size: 12px;font-weight: bold;">'+
'<span class="mvp_hide pointer" onclick="$(\'.video_player_space\').hide();hideMyVideoPlayer()">_</span>'+
'<span class="mvp_close pointer" onclick="$(\'.video_player_space\').empty();mvp_current={};scrollToCurrentMVP()">Х</span>'+
'</span>'+
'</br><div class="embed-my-video-item"><div id="mvplayer"><iframe class="mvp-video-item" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" style="" src="https://www.youtube.com/embed/'+data+'?autohide=1&amp;autoplay=1&amp;controls=1&amp;iv_load_policy=3&amp;rel=0&amp;wmode=transparent&amp;enablejsapi=1&amp;origin='+encodeURIComponent(location.origin)+'&amp;widgetid=3"></iframe></div></div></div><style class="MVPl-style">'+(($('.video_player_space').is(":visible"))?resizeMyVideoWrap():"")+'</style>').appendTo('.video_player_space');
onYouTubeIframeAPIReady($('.mvp-video-item').attr('src').split('embed/')[1].split('?')[0]);
}

$('body').on('click','#my_page_video_item img',function(){
    getVideoSpace($(this).parent().parent().data('vid'));
	MVP_PLAY_META($(this).parent().parent());
	MVPgetCurrentData($(this).parent().parent());
})

let my_vp=document.querySelector('#my_video_page');

function handleScrollBtns(){
let scrollTop = $("#my_video_page").scrollTop();
let scrollHeight = $("#my_video_page").prop("scrollHeight");
let offsetHeight = $("#my_video_page").prop("offsetHeight");
let headerWrapper = document.querySelector('.scroll-up');
let endWrapper = document.querySelector('.scroll-down');
if(scrollTop < 100){
    headerWrapper.classList.add('hide');
}else{    
    headerWrapper.classList.remove('hide');
}

if(scrollTop+offsetHeight === scrollHeight){
   endWrapper.classList.add('hide');
}else{    
    endWrapper.classList.remove('hide');
}
}

my_vp.addEventListener('scroll',handleScrollBtns);
