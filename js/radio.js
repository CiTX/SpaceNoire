$('<div id="radiobells_container"><a href="https://www.radiobells.com/" rel="nofollow" id="RP_link">www.radiobells.com</a> #radiobells_script_hash</div>').prependTo("#leftpane");$('#radiobells_container').hide();radiobtn = $('<span id="radio-btn" class="btn btn-sm btn-default"><img src="https://lh3.googleusercontent.com/FTXL0Az5wYAA4-r6Teb3o4Q1trNjrLcdP4ZKySIWiLvxppZmYJjAutiQVs7WsO68kg=w300" style="max-height: 16px;margin-top: -6px" /></span>').insertBefore("#newpollbtn").on("click",function(){if(!$(this).hasClass('btn-success')){$(this).addClass('btn-success').html('<img src="https://lh3.googleusercontent.com/FTXL0Az5wYAA4-r6Teb3o4Q1trNjrLcdP4ZKySIWiLvxppZmYJjAutiQVs7WsO68kg=w300" style="max-height: 16px;margin-top: -6px" />');$('#radiobells_container').show('slow');$('#timetable').hide();}else{$(this).removeClass('btn-success').html('<img src="https://lh3.googleusercontent.com/FTXL0Az5wYAA4-r6Teb3o4Q1trNjrLcdP4ZKySIWiLvxppZmYJjAutiQVs7WsO68kg=w300" style="max-height: 16px;margin-top: -6px" />');$('#radiobells_container').hide('slow');$('#timetable').show();}});   var rad_backcolor="#000000b3"; var rad_backcolor2="#e8e8e8"; var rad_textcolor="#000000"; var rad_bordercolor="#ffffff"; var rad_volumecolor="#30325e"; var rad_logo = "black"; var rad_width=300; var rad_type = "horizontal"; var rad_autoplay = false;var rad_stations=[
  ['https://jazz-wr06.ice.infomaniak.ch/jazz-wr06-128.mp3','Funk (Jazz Radio)'],
  ['https://gene-wr05.ice.infomaniak.ch/gene-wr05.mp3','Générations - Funk'],
  ['https://ic7.101.ru:8000/v1_1?','Радио NRJ'],
  ['https://ep256.hostingradio.ru:8052/europaplus256.mp3','Europa Plus'],
  ['https://213.59.4.27:8000/silver128.mp3','Серебряный дождь'],
  ['https://chanson.hostingradio.ru:8041/chanson256.mp3','Радио Шансон'],
  ['https://air2.radiorecord.ru:805/sd90_320','Супердискотека 90-х'],
  ['https://retro90.hostingradio.ru:8025/retro90-128.mp3','Ретро FM 90-е'],
  ['https://air2.radiorecord.ru:9003/rus_320','Russian Mix'],
  ['https://ic7.101.ru:8000/a200?userid=0','Relax FM'],
  ['http://vocaltrance.fm:8000/vocaltrance_320','Vocal Trance'],
  ['http://195.242.219.208:8200/enigma','Radio Enigma'],
  ['https://pool.anison.fm:9000/AniSonFM(320)','Аниме радио'],
  ['https://zaycevfm.cdnvideo.ru/ZaycevFM_disco_256.mp3','Зайцев FM DISCO'],
  ['https://zaycevfm.cdnvideo.ru/ZaycevFM_bass_256.mp3','Зайцев FM Bass'],
  ['https://zaycevfm.cdnvideo.ru/ZaycevFM_metal_256.mp3','Зайцев FM Metal'],
  ['https://zaycevfm.cdnvideo.ru/ZaycevFM_rurock_256.mp3','Зайцев FM РуРок'],
  ['https://zaycevfm.cdnvideo.ru/ZaycevFM_rap_256.mp3','Зайцев FM Rap'],
  ['https://zaycevfm.cdnvideo.ru/ZaycevFM_rus_256.mp3','Зайцев FM RUS'],
  ['https://zaycevfm.cdnvideo.ru/ZaycevFM_electronic_256.mp3','Зайцев FM Club'],
  ['https://zaycevfm.cdnvideo.ru/ZaycevFM_shanson_256.mp3','Зайцев.FM Шансон'],
  ['https://zaycevfm.cdnvideo.ru/ZaycevFM_rock_256.mp3','Зайцев.FM New Rock'],
  ['https://zaycevfm.cdnvideo.ru/ZaycevFM_rnb_256','Зайцев.FM RNB'],
  ['https://zaycevfm.cdnvideo.ru/ZaycevFM_relax_256.mp3','Зайцев.FM Релакс'],
  ['http://icecast.dropthebass.ru:8000/stream','Drop The Bass Radio'],
  ['https://rr-russkijrok.hostingradio.ru/russkijrok96.aacp','Русский Рок'],
  ['https://air2.radiorecord.ru:805/gop_320','Гоп FM'],
  ['https://air2.radiorecord.ru:805/mdl_320','Медляк FM'],
  ['https://air.radiorecord.ru:805/naft_320','Нафталин FM'],
  ['https://air.radiorecord.ru:805/ps_320','Пиратская станция'],
  ['https://air2.radiorecord.ru:805/rock_320','Record Rock'],
  ['https://air2.radiorecord.ru:805/pump_320','Record Old School'],
  ['https://air.radiorecord.ru:805/fbass_320','Record Future Bass'],
  ['https://air.radiorecord.ru:805/goa_320','Record Goa/Psy'],
  ['https://air.radiorecord.ru:805/vip_320','Record Vip House'],
  ['https://air2.radiorecord.ru:805/tm_320','Record Trancemission'],
  ['https://air2.radiorecord.ru:805/club_320','Record EDM'],
  ['https://air.radiorecord.ru:8102/teo_128','Record Hardstyle'],
  ['https://air.radiorecord.ru:8102/dc_128','Record Dancecore'],
  ['https://air.radiorecord.ru:805/brks_320','Record Breaks'],
  ['https://air2.radiorecord.ru:9003/techno_320','Record Techno'],
  ['https://air.radiorecord.ru:805/rave_320','Record RAVE FM'],
  ['https://air2.radiorecord.ru:9003/rapclassics_320','Record Rap Classics'],
  ['https://icecast-studio21.cdnvideo.ru/S21cl_1p','Studio 21'],
  ['https://node-23.zeno.fm/0zp5xf27uwzuv?rj-ttl=5&rj-tok=AAABcxitO5QAqxP1YIJJzsBsow','The Breeze']
  ]
var g_volume = 100;
var g_link = rad_stations[0][0];
var is_play = false;
var g_playimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAYAAADFniADAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NDY1RTE2OEU1MDgxMUUyQkI1NEE5RTU3ODVBMkQyMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NDY1RTE2OUU1MDgxMUUyQkI1NEE5RTU3ODVBMkQyMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkyNEQ0MkJGRTRGRTExRTJCQjU0QTlFNTc4NUEyRDIyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkyNEQ0MkMwRTRGRTExRTJCQjU0QTlFNTc4NUEyRDIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Wv5KrAAAAlNJREFUeNpi/P//P8NgA0wMgxCwUGoAIyMjRfqxxdSgDClGQmmK0pAYkOgrKiqiSH9fXx9FjmIGYlaont9Q/G+gQ4o1Ly9vLgsLi8/v37/nXrlypW///v2vgeI/B7JIYAU6KAJI87GyshYaGhpeyMrKyl65cqUgMArYBjJNIXtCmIODozcsLCz127dvzUCHbQCK/QKmsT+DoZzS4ObmXlpQUHD47du3VUDHnQGlN6Dj/g6Yo+BByMRkKyoqehCY7lY9e/asCei4e9CQ+0/LNEWUeaB0JycndzY3N7fZ0tJSnJz0RqsSnROYGUqBjjoPzAw5pGYGFgbaAglYZvjy5Qsove0kJjPQ2lHwzMDLy7sOmBn2AzNDHaHMQErdxws05BMV3Pjvz58/S+/fv9+8efPmR9gK34FoJYAyQ6yqqur57OzsXCCffTA1XbjZ2dkrgTTbYHLU1x8/fjSBHDcgCR1PmvoM5H8fUEf9+/dvz5s3b+qWLFlyD9rseQ/EfwbEUcAcfgNUTs2ePfswtF32AZiTf1KjkUcOeAFMNy0bN25c9vTpU1Au+w50zNeBKtG/AxuCU86cOdN3/Pjx/9Coekls5cxCi0T86NGjtg0bNnyANpnfAx1DUrOZhYqJGNyeWrx48W1YIia3wcdCpURcA0zEB9ETMb0aeaA0AasM3wITcRswEc8nJRFT21G///79u4aZmdkVmIhnnzt3rv/o0aP/oQ59SU4Lkxo9ZFi/D1RXcZGbiKndGf0LxT+A+BMtC7dBOZYwKEddhuZQ0GhIQQFAgAEA2R8mgnSBRbIAAAAASUVORK5CYII=";
var g_pauseimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAYAAADFniADAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NDY1RTE2Q0U1MDgxMUUyQkI1NEE5RTU3ODVBMkQyMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NDY1RTE2REU1MDgxMUUyQkI1NEE5RTU3ODVBMkQyMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc0NjVFMTZBRTUwODExRTJCQjU0QTlFNTc4NUEyRDIyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc0NjVFMTZCRTUwODExRTJCQjU0QTlFNTc4NUEyRDIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+h76mDgAAALlJREFUeNpi/P//P8NgA0wMgxCMOmrUUdQGLMQoKi4uJqimt7eXZLXUCClPIH4GxP+R8DOoODqwAeKraGqvQsWpGn1zgVgSTUwSKo4OlgGxFpqYFlScqo6SJEFcFoda2dHcN+qoUUeNOmrUUaOOGnXUqKNGHTXqqKHpqOc4xF9gEXuMQ+1jajsqBYsDngJxMha1UUB8A00MxI+mWr8PCrbh6TyggyNArElu9DGODgWNOmrUUQMEAAIMAILtJINH3aicAAAAAElFTkSuQmCC";
var g_radiologo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAAAVCAYAAAAHIbMXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4REVCMDM2RkQxREYxMUUyOEJBQUYzQTJGMkZBNzU0QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4REVCMDM3MEQxREYxMUUyOEJBQUYzQTJGMkZBNzU0QyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhERUIwMzZERDFERjExRTI4QkFBRjNBMkYyRkE3NTRDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhERUIwMzZFRDFERjExRTI4QkFBRjNBMkYyRkE3NTRDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+G1/AVAAAA0BJREFUeNrsWNFt2zAQtYv8W51AygSWgfxHnqDKBFImiD1B7AmiTGB6A3kCK/8GSm+gTFB5AvcYvCteCdkxWjdwUBE4iBLJ4927u0dJ/f1+3+van7UvHQQdeB14HXj/Ubs6NHBzcxPIJXb9zWZTHZl3DjsikUSkFrEizUcBIL6dL/MEjEiklO4PkbUTuW9E4hN1piIO7ODE+TPMX2A/t29xZL6zw+CaUP8iytYB9w39a5GRyABOntJykVtybo/roYx7FAlFtiJfRV5EHo6sccHJSH8GPRcDnnPkVVK6FrF4fmomKfC67gXl2Nbc82f0Dcq1fke/2lERaPYiwBOwZjDQahljqKGyTsCJfjlptrxifkVcpo5HLQD2qNRdZu0IkMjLwgT6a/S36McIfPwOr/Y8Xec7MABWSLzz6+pAg4GujOco5QCOD0mNwfMaYynKeYHxe+KqHGCpHqf7DuD7a0rsswQYIZ5pxYQH+NKgvFnPm83i05ZANLA5hT0FaOVZkmpyymlrlFtEcQr+WtJJaL0oFrgfg/B3eJYCiJIM2WL9jPhO25rKXDNoAX0DrEsoS2OvfEOuEC+7MuytAZ6gPxV5wn1K47rnBP0YieWujsqaQ5ynRt1C7mRyjiwY4PrGM1CWAXDrgVlQRhRYO4QzIYydY84SGTHHnjntM8AYB7bygCygYweH20ozRYAtzdHrI4G+on3U5wYVyTzbCl4DTpl6nJTQhiEZroRd0Xotvy0c05KZY+0KQYrodcWQjojGxlT+gxa+a7B/gEBl6CfeIdd4ti0JsBEFf+bpVv+c7pIO0N/BI75jMBIPxBwOPEDhDuWlhj7h+RyZloLDNMKcHQnuWbfuVVI5rymT1a4h9QOc8hlOb4M1Oc1xOr9jbIW5Q/CZRTD1oBvS/pyZk2Ocp8ZXTiG+HgLKOENRjtyXBwDX0zml6Kqj+sUwgoEVHIkoCzXiGcAs6bUlojWWMuSe9pnRfEMnr6HMSvHM0qluKZMK3Nfi0xh9V65T8Fzpl2if/+fJxBoOXUPJHtEweIU55+dZjExQctbDYvKR721/83l21UauDjgi8n/1Bm8pG2virk/T+t2f5O6XVAfeZ2s/BRgAHxBDDDO9ykQAAAAASUVORK5CYII=";
var g_radiologowhite = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAAAVCAYAAAAHIbMXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozQzJERUVFNUQyNjExMUUyOEJBQUYzQTJGMkZBNzU0QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozQzJERUVFNkQyNjExMUUyOEJBQUYzQTJGMkZBNzU0QyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk4RjlCQzY0RDIzNjExRTI4QkFBRjNBMkYyRkE3NTRDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNDMkRFRUU0RDI2MTExRTI4QkFBRjNBMkYyRkE3NTRDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hs9dHQAAAqhJREFUeNrsWNGN3CAQ9UX5Dx3EJZAOSAVxB+cSnA5IB6QDXwdOB04HpAPSAR0QVnojvYzAt1rdZXWKkUbGYIbhMfNmdh9KKcPZbmvvTghO8E7wTvD+o/b+YM5Usejvr2zHWMVVSVVilfwm0LtkWyVjla383XIV2/i2JVOVvYq58ntfJan9wsH3FztWPB31h38trcFIhxhhWAGg1ygV4B1E+r2LkhYB+P7MGo/5mfrTPcBrcd5W5VeV3xRGEsbXtC94yrqf0NNql/Hv6K8I1/SMfkNUMqq97h62A8JoU97B764RlpY8LXX0GqznsQVrLOYzxKj9ODIS2Rlp/+0ghMeGN7uXDlsBa+mEYca7J0Ci4ixPQAjoM83PdOCI7xzpmTprDPor2RkIyF64rw09UdGFga0BujLRQrgWPOGcnfpibMZYwlMMy+R14jWzMjbD0BXrfWm3nYAtdFkWoIrOiYBm7rQN7yoEFnPlQpcdVYIsFAVskzkCL6vDTIqoRxw+0AEDeYXHuOgx6uYTHcbT5cwqGQTlLaxzpHnxGLnEtZNgJGxZT1KXVsj7Cl3QRs5jjxJGRrL4SqQ+oA67tKXKR1X/Repn9D8g8YQqj5j7hrU/UEMK4XskjJ3qPpn7DBtEpyQyB/0Z+xsku0f0nUpyWdn2RPXkJ0o6XumW822Q2EsYnBys4r6VXDmRx7RucaUbz3SD8j4ST+UGN82K74ry0kFxUVA14ka2OxWKQdWxgegqEQae1pZW7dqroRYykBODo4zpCHBLBbJTfGOIL2YCTmdxrzhT1vOaifo8brB+VntxJeDJTkNUMDR0s91Lr45slSiFlBQi95cuMnVCkNu9y6+FW0T/tnWK557AIeMrlJgRXGOxX75bsXtjezj/ST7/kjrBe2vtjwADAEeGheohZXviAAAAAElFTkSuQmCC";
var g_select = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAQAAACoRNXiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAACTSURBVHjaZM2vroFhAAbw33sJmq8YUZMowqlsNkXmAjR7be5Ak84NCIIZm42qn3Akk447OEUQKMr3+TNPep79whOilwwV9J8zvGDbCiPjT2zapO3BGTZs8edfFX3fT/yyw0Xi7KSUcYgZXVUckfOriK5piB1z3NT9pJ85BwkGIa61UHsQ5O3lnUJkaWHmPWUTvfsAhUsijhmiOykAAAAASUVORK5CYII=";
var rad_plogo = g_radiologo;
var select_radius = 'border-radius: 5px;';
if (rad_type=='vertical'){
	var select_radius = '';	
}
var select = '<div style=" background-color: '+rad_backcolor2+'; border: 1px solid '+rad_bordercolor+'; '+select_radius+' padding: 5px; color: '+rad_textcolor+'; font-weight: bold; font-size: 11px; font-family: tahoma; cursor: pointer; width: '+(rad_width-140)+'px;" onclick="return rad_show_stations();" id="rad_select" align="left"><div id="rad_stationname" style="display: inline-block; width: '+(rad_width-150-16)+'px; overflow: hidden; white-space: nowrap;">'+rad_stations[0][1]+'</div><img src="'+g_select+'" align="right" style="margin: 0px; float: right; border: none; padding: 0px; margin-top: 3px;"></div>';
select += '<div style="position: absolute; z-index: 1000; border: 1px solid #9c9c9c; background-color: #727272; display: none; margin-top: -170px; max-height: 140px; width: '+(rad_width-130)+'px; overflow: auto;" id="rad_list" align="left">';
for (var i=0; i<rad_stations.length; i++){
	select += '<div data-url="'+rad_stations[i][0]+'" style="padding: 4px 0px 4px 4px; color: #ffffff; font-family: tahoma; font-size: 11px; width: '+(rad_width-130-12)+'px; height: 11px; overflow: hidden; white-space: nowrap; cursor: pointer; box-sizing: content-box !important;" align="left" onclick="return rad_selectthis(this);" onmouseover="this.style.backgroundColor = \'#919191\';" onmouseout="this.style.backgroundColor = \'#727272\';" class="rad_selection">'+rad_stations[i][1]+'</div>';
}
select += '</div>';	
var volume = '<div style="width: 5px; height: 4px; background-color: '+rad_volumecolor+'; float: left; display: block; margin-right: 2px; margin-top: 20px; cursor: pointer; border-radius: 3px;" id="rad_volume1" class="rad_volume" onclick="return rad_setvolume(1);"></div><div style="width: 5px; height: 8px; background-color: '+rad_volumecolor+'; float: left; display: block; margin-right: 2px; margin-top: 16px; cursor: pointer; border-radius: 3px;" id="rad_volume2" class="rad_volume" onclick="return rad_setvolume(2);"></div><div style="width: 5px; height: 12px; background-color: '+rad_volumecolor+'; float: left; display: block; margin-right: 2px; margin-top: 12px; cursor: pointer; border-radius: 3px;" id="rad_volume3" class="rad_volume" onclick="return rad_setvolume(3);"></div><div style="width: 5px; height: 16px; background-color: '+rad_volumecolor+'; float: left; display: block; margin-right: 2px; margin-top: 8px; cursor: pointer; border-radius: 3px;" id="rad_volume4" class="rad_volume" onclick="return rad_setvolume(4);"></div><div style="width: 5px; height: 20px; background-color: '+rad_volumecolor+'; float: left; display: block; margin-right: 2px; margin-top: 4px; cursor: pointer; border-radius: 3px;" id="rad_volume5" class="rad_volume" onclick="return rad_setvolume(5);"></div><div style="width: 5px; height: 24px; background-color: '+rad_volumecolor+'; float: left; display: block; cursor: pointer; border-radius: 3px;" id="rad_volume6" class="rad_volume" onclick="return rad_setvolume(6);"></div>';
if (rad_logo=='black'){
	rad_plogo = g_radiologo;
}else{
	rad_plogo = g_radiologowhite;
}
if (rad_type=='vertical'){
	document.getElementById('radiobells_container').innerHTML = '<div style="width: '+(rad_width-130)+'px; height: 166px; border: 0px solid '+rad_bordercolor+'; background-color: '+rad_backcolor+'; box-sizing: content-box !important;" id="rad_player"><div style="padding: 5px; border-bottom: 0px solid '+rad_bordercolor+';" align="center"><a href="https://www.radiobells.com" target="_blank"><img src="'+rad_plogo+'" border="0" id="rad_logo" style="border: none;"></a></div><div style="padding: 10px;" align="center" id="rad_controls"><div style="display: inline-block; border: 0px solid '+rad_bordercolor+'; background-color: '+rad_backcolor2+'; margin: 0 auto; border-radius: 19px;"><img src="'+g_playimg+'" id="rad_play_btn" onclick="rad_playstop(); return false;" style="cursor: pointer; margin: 0px; border: none;" align="absmiddle"></div></div><div style="padding: 10px;" align="center"><div style="display:inline-block;">'+volume+'</div></div><div style=" display:inline-block; padding-top: 7px; margin-left: -1px;">'+select+'</div></div></div>';
}else{
	document.getElementById('radiobells_container').innerHTML = '<div style="width: auto; height: 66px; padding: 8px 0px 0px 0px; border: 0px solid '+rad_bordercolor+'; background-color: '+rad_backcolor+'; box-sizing: content-box !important;" id="rad_player"><div style="height: 28px;" align="center" id="rad_controls"><div style="display: inline-block; border: 0px solid '+rad_bordercolor+'; background-color: '+rad_backcolor2+'; margin-right: 10px; border-radius: 19px;"><img src="'+g_playimg+'" id="rad_play_btn" onclick="rad_playstop(); return false;" style="cursor: pointer; margin: 0px; vertical-align: middle; border: none;" align="absmiddle"></div><div style=" display:inline-block;">'+select+'</div><div style="display:inline-block; padding-left: 10px; margin-bottom: -5px;">'+volume+'</div></div><div style="padding-top: 0px; margin-top: 15px; border-top: 0px solid '+rad_bordercolor+';"></div></div>';
}
var g_audio = document.createElement('audio');	
document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		if (rad_autoplay){
			rad_loadmusic();
		}
	}
}
function rad_selectthis(t){
	document.getElementById('rad_list').style.display='none';
	g_link = t.getAttribute('data-url');
	document.getElementById('rad_stationname').innerHTML = t.innerHTML;
	rad_loadmusic();
	return false;
}
function rad_show_stations(){
	if (document.getElementById('rad_list').style.display=='none'){
		document.getElementById('rad_list').style.display='block';
	}else{
		document.getElementById('rad_list').style.display='none'
	}
	return false;
}
function rad_loadmusic(){
	g_audio.src = g_link;
	g_audio.volume = g_volume/100;
	g_audio.play();
	is_play = true;
	document.getElementById('rad_play_btn').src = g_pauseimg;
}
function rad_playstop(){
	if (is_play){
		g_audio.pause();
		document.getElementById('rad_play_btn').src = g_playimg;
		is_play = false;
	}else{
		g_audio.src = g_link;
		g_audio.volume = g_volume/100;
		g_audio.play();
		document.getElementById('rad_play_btn').src = g_pauseimg;
		is_play = true;
	}
}
function rad_setvolume(vol){
	if (vol==1){
		g_volume = 0;
	}else if(vol==2){
		g_volume = 20;
	}else if (vol==3){
		g_volume = 40;
	}else if (vol==4){
		g_volume = 60;
	}else if (vol==5){
		g_voluem = 80;
	}else if (vol==6){
		g_volume = 100;
	}
	g_audio.volume = g_volume/100;
	for (var i=1; i<7; i++){
		if(i<=vol){
			document.getElementById('rad_volume'+i).style.backgroundColor = rad_volumecolor;
		}else{
			document.getElementById('rad_volume'+i).style.backgroundColor = '#CCCCCC';
		}
	}
}
