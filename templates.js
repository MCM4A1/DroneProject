function pug_rethrow(n,e,t,r){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||r))throw n.message+=" on line "+t,n;try{r=r||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,t)}var a=3,i=r.split("\n"),o=Math.max(t-a,0),h=Math.min(i.length,t+a),a=i.slice(o,h).map(function(n,e){var r=e+o+1;return(r==t?"  > ":"    ")+r+"| "+n}).join("\n");n.path=e;try{n.message=(e||"Pug")+":"+t+"\n"+a+"\n\n"+n.message}catch(n){}throw n}function index(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "FrontEnd\u002Findex.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 2;pug_debug_filename = "FrontEnd\u002Findex.pug";
pug_html = pug_html + "\u003Chtml lang=\"en\"\u003E\u003C\u002Fhtml\u003E";
;pug_debug_line = 3;pug_debug_filename = "FrontEnd\u002Findex.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 4;pug_debug_filename = "FrontEnd\u002Findex.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 4;pug_debug_filename = "FrontEnd\u002Findex.pug";
pug_html = pug_html + "Header for all\u003C\u002Fp\u003E\u003C\u002Fbody\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}