
startSpoof()
function manip_navigator(sub,str) {

  Object.defineProperty(navigator, sub, { 
        get: function () { 
            return str;
        }
    });
}

function manip_window(sub,str) {

  Object.defineProperty(window, sub, { 
        get: function () { 
            return str;
        }
    });
}

function startSpoof() {
  //window.alert('yes')

var navigatorstrings = ["vendorSub","productSub","vendor","maxTouchPoints","hardwareConcurrency","appCodeName","appName","appVersion","platform","product","userAgent","language","languages","doNotTrack",]
var navigatorobjectsmulti = [
["mimeTypes", ["description","enabledPlugin.description","enabledPlugin.filename","enabledPlugin.name","suffixes","type"]],
["plugins", ["description","filename","name"]],
];

var windowstrings = ["innerWidth","innerHeight","screenX","screenY","outerWidth","outerHeight","devicePixelRatio","screenLeft","screenTop"];
var windowobjects = [
["screen", ["availHeight","availLeft","availTop","availWidth","colorDepth","height","pixelDepth","width"]],
];

for (i = 0; i < windowstrings.length; i++) {
   name = windowstrings[i];
   str = strings[0]["window_"+name];
   manip_window(name,str)
}

for (i = 0; i < navigatorstrings.length; i++) {
   name = navigatorstrings[i];
   str = strings[0]["navigator_"+name];
   manip_navigator(name,str)
}

for (i = 0; i < windowobjects.length; i++) {
   name = windowobjects[i][0];
   names = windowobjects[i][1];
   var windowobjectsdict = {};
   for (i = 0; i < names.length; i++) {
         str = strings[0]["window_"+name+"_"+names[i]];
         windowobjectsdict[names[i]] = str;
    }
    manip_window(name,windowobjectsdict)
   }

var winobjsdictmime = new Array();
var winobjsdictplug = new Array();


for (var key in strings[0]) {
  if(key.indexOf("navigator_mimeTypes") == 0) {
    var bstr = strings[0][key]
    if(bstr == null) {
      winobjsdictmime = null;
    }
    else {
        for(i=0;i<bstr.split(",").length;i++){
      if(winobjsdictmime[i]==undefined) {
            winobjsdictmime[i] = []
        }
      if(key.split("_")[3] == undefined){
         winobjsdictmime[i][key.split("_")[2]] =  bstr.split(",")[i]
      }
      else {
        if(winobjsdictmime[i][key.split("_")[2]] == undefined) {
          winobjsdictmime[i][key.split("_")[2]] = {}
         }
        winobjsdictmime[i][key.split("_")[2]][key.split("_")[3]] =  bstr.split(",")[i]
      }
     
    }

    }
    
  }
}

for (var key in strings[0]) {
  if(key.indexOf("navigator_plugins") == 0) {
    var bstr = strings[0][key]
    if(bstr == null) {
      winobjsdictplug = null;
    }
    else {
        for(i=0;i<bstr.split(",").length;i++){
      if(winobjsdictplug[i] == undefined) {
        winobjsdictplug[i] = []
      }
      winobjsdictplug[i][key.split("_")[2]] =  bstr.split(",")[i]
    }

    }
    
  }  
} 

manip_navigator("mimeTypes",winobjsdictmime);
manip_navigator("plugins",winobjsdictplug);

}

//disable shit
navigator.mediaDevices.getUserMedia = undefined;
navigator.webkitGetUserMedia = undefined;
navigator.mozGetUserMedia = undefined;
navigator.getUserMedia = undefined;
webkitRTCPeerConnection = undefined;
MediaStreamTrack = undefined;
RTCPeerConnection = undefined;
window.RTCPeerConnection = undefined;
window.webkitRTCPeerConnection = undefined;
window.mozRTCPeerConnection = undefined;
window.WebGLRenderingContext = undefined;
window.webkitRequestFileSystem = function (a,b,c,d) {  return eval(String(c).replace(/^[^{]*{\s*/,'').replace(/\s*}[^}]*$/,'')) }
//disable webgl
var cs = []
cs.push('if (!window.ogcctxfunc8675309) {');
cs.push(' window.ogcctxfunc8675309 = HTMLCanvasElement.prototype.getContext;');
cs.push(' HTMLCanvasElement.prototype.getContext = function (a, b) {');
cs.push('  var la = a.toLowerCase();');
cs.push('  if (la.indexOf("webgl") >= 0) {');
cs.push('   return null;');
cs.push('  };');
cs.push('  if (b) {');
cs.push('   return window.ogcctxfunc8675309.call(this, a, b);');
cs.push('  } else {');
cs.push('   return window.ogcctxfunc8675309.call(this, a);');
cs.push('  };');
cs.push(' };');
cs.push('};');
cs = cs.join('');
var observer = new WebKitMutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            var o = mutation.addedNodes[i];
            if (o.tagName) {
                var tl = ('' + o.tagName)
                    .toLowerCase();
                if ((tl == 'head') || (tl == 'body')) {
                    try {
                        var s = document.createElement('script');
                        s.text = cs;
                        o.appendChild(s); //(s, o.childNodes[0]);
                    } catch (e) {
                    }
                    observer.disconnect();
                    return;
                };
            };
        };
    });
});
observer.observe(document, {
    childList: true,
    subtree: true
});


// disable canvas finger
var allowInjection = true;
document.addEventListener("DOMSubtreeModified", function(event) {
    if (window.frameElement != null && window.frameElement.sandbox != null) {
    allowInjection = false;
    for (var i = 0; i < window.frameElement.sandbox.length; i++) {
        const val = window.frameElement.sandbox[i];
        if (val == 'allow-scripts') {
            allowInjection = true;
        }
    }
}
if (allowInjection) {
    overrideMethods(docId, JSON.parse(jsonData));
}
  });
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getRandomString() {
    var text = "";
    var charset = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}
var HashLength = 30;
var docId = getRandomString();
var storedObjectPrefix = getRandomString();
data = {};
data.r = HashLength - randomIntFromInterval(0, HashLength + 10);
data.g = HashLength - randomIntFromInterval(0, HashLength + 10);
data.b = HashLength - randomIntFromInterval(0, HashLength + 10);
data.a = HashLength - randomIntFromInterval(0, HashLength + 10);
var jsonData = JSON.stringify(data);

function overrideMethods(docId, data) {
    const script = document.createElement('script');
    script.id = getRandomString();
    script.type = "text/javascript";
        var newChild = document.createTextNode('try{(' + overrideDefaultMethods + ')(' + data.r + ',' + data.g + ',' + data.b + ',' + data.a + ',"' + script.id + '", "' + storedObjectPrefix + '");} catch (e) {console.error(e);}');
        script.appendChild(newChild);
        var node = (document.documentElement || document.head || document.body);
        if (typeof node[docId] === 'undefined') {
            node.insertBefore(script, node.firstChild);
            node[docId] = getRandomString();
        }
}

function overrideDefaultMethods(r, g, b, a, scriptId, storedObjectPrefix) {
    var scriptNode = document.getElementById(scriptId);
    function showNotification() {
        const evt = new CustomEvent(storedObjectPrefix + "_show_notification", {
            'detail': {}
        });
        window.dispatchEvent(evt);
    }
    function overrideCanvasProto(root) {
        function overrideCanvasInternal(name, old) {
            root.prototype[storedObjectPrefix + name] = old;
            Object.defineProperty(root.prototype, name, {
                value: function() {
                    var width = this.width;
                    var height = this.height;
                    var context = this.getContext("2d");
                    var imageData = context.getImageData(0, 0, width, height);
                    for (var i = 0; i < height; i++) {
                        for (var j = 0; j < width; j++) {
                            var index = ((i * (width * 4)) + (j * 4));
                            imageData.data[index + 0] = imageData.data[index + 0] + r;
                            imageData.data[index + 1] = imageData.data[index + 1] + g;
                            imageData.data[index + 2] = imageData.data[index + 2] + b;
                            imageData.data[index + 3] = imageData.data[index + 3] + a;
                        }
                    }
                    context.putImageData(imageData, 0, 0);
                    showNotification();
                    return old.apply(this, arguments);
                }
            });
        }
        overrideCanvasInternal("toDataURL", root.prototype.toDataURL);
        overrideCanvasInternal("toBlob", root.prototype.toBlob);
        //overrideCanvasInternal("mozGetAsFile", root.prototype.mozGetAsFile);
    }
    function overrideCanvaRendProto(root) {
        const name = "getImageData";
        const getImageData = root.prototype.getImageData;
        root.prototype[storedObjectPrefix + name] = getImageData;
        Object.defineProperty(root.prototype, "getImageData", {
            value: function() {
                var imageData = getImageData.apply(this, arguments);
                var height = imageData.height;
                var width = imageData.width;
                // console.log("getImageData " + width + " " + height);
                for (var i = 0; i < height; i++) {
                    for (var j = 0; j < width; j++) {
                        var index = ((i * (width * 4)) + (j * 4));
                        imageData.data[index + 0] = imageData.data[index + 0] + r;
                        imageData.data[index + 1] = imageData.data[index + 1] + g;
                        imageData.data[index + 2] = imageData.data[index + 2] + b;
                        imageData.data[index + 3] = imageData.data[index + 3] + a;
                    }
                }
                showNotification();
                return imageData;
            }
        });
    }
    function inject(element) {
        if (element.tagName.toUpperCase() === "IFRAME" && element.contentWindow) {
            try {
                var hasAccess = element.contentWindow.HTMLCanvasElement;
            } catch (e) {
                console.log("can't access " + e);
                return;
            }
            overrideCanvasProto(element.contentWindow.HTMLCanvasElement);
            overrideCanvaRendProto(element.contentWindow.CanvasRenderingContext2D);
            overrideDocumentProto(element.contentWindow.Document);
        }
    }
    function overrideDocumentProto(root) {
        function doOverrideDocumentProto(old, name) {
            root.prototype[storedObjectPrefix + name] = old;
            Object.defineProperty(root.prototype, name, {
                value: function() {
                    var element = old.apply(this, arguments);
                    // console.log(name+ " everridden call"+element);
                    if (element == null) {
                        return null;
                    }
                    if (Object.prototype.toString.call(element) === '[object HTMLCollection]' ||
                        Object.prototype.toString.call(element) === '[object NodeList]') {
                        for (var i = 0; i < element.length; ++i) {
                            var el = element[i];
                            // console.log("elements list inject " + name);
                            inject(el);
                        }
                    } else {
                        // console.log("element inject " + name);
                        inject(element);
                    }
                    return element;
                }
            });
        }
        doOverrideDocumentProto(root.prototype.createElement, "createElement");
        doOverrideDocumentProto(root.prototype.createElementNS, "createElementNS");
        doOverrideDocumentProto(root.prototype.getElementById, "getElementById");
        doOverrideDocumentProto(root.prototype.getElementsByName, "getElementsByName");
        doOverrideDocumentProto(root.prototype.getElementsByClassName, "getElementsByClassName");
        doOverrideDocumentProto(root.prototype.getElementsByTagName, "getElementsByTagName");
        doOverrideDocumentProto(root.prototype.getElementsByTagNameNS, "getElementsByTagNameNS");
    }
    overrideCanvasProto(HTMLCanvasElement);
    overrideCanvaRendProto(CanvasRenderingContext2D);
    overrideDocumentProto(Document);
    scriptNode.parentNode.removeChild(scriptNode);

    
}
//document.addEventListener("load", startSpoof, true);
//document.addEventListener("DOMContentLoaded", startSpoof, false);


var search_term='bluestacks for pc';
var targetwebsite = 'ibluestacksdownload.org';
var  targetWebsiteConfirmTerm ='Copyright';

 
function getrandom(min,max)
{
   return  Math.floor(Math.random() * (max- min + 1)) + min;
}

function searchResultsClick()
{
   
   var waitfirst1=getrandom(1,6);  // max 60 secs delay
   waitfirst1=waitfirst1*1000;
     
setTimeout(function()
          {
   
var  count=0;
var pagetheard=setInterval(function()
           {
     
   if(count>=10)
      {
        clearInterval(pagetheard);
      }
    var alll=document.getElementsByTagName("cite").length;
   var is_exist=0;
   for(var i=0;i<alll;i++)
   {

       if(document.getElementsByTagName("cite")[i].innerText.indexOf(targetwebsite)>=0)
      {
         if(strings[0]['device'] == ('Mobile' || 'Tablet')) {
             document.getElementsByTagName("cite")[i].parentNode.previousSibling.firstChild.firstChild.click();
         }else {
             document.getElementsByTagName("cite")[i].parentNode.parentNode.parentNode.previousSibling.firstChild.click();
         }
         
         is_exist=1;
         break;  
      }
   }
   
   count++;
   if(!is_exist)
      {
         document.getElementById("pnnext").click();
      }
   
   
             
},3000);        
        
 },waitfirst1);
   
}

function targetWebsiteBrowse()
{
    var ddate=new Date();
   var sec=ddate.getSeconds();
   var limit=getrandom(8,25);  // 80,250
   limit=limit*1000;
   
   
    var body = document.body,
   html = document.documentElement;
   var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight);
   
   var setscrolltime=getrandom(1,4);  // scroll time delay max 40 secs
   setscrolltime=setscrolltime*1000;


   setInterval(function()
    {
      var srandome=getrandom(0,height);
     window.scrollTo(0,srandome);
      
   },setscrolltime)
   
   
   setTimeout(function()
    {
      var alla=document.getElementsByTagName("a").length;
      var links=[];
      for(var i=0;i<alla;i++)
      {
      if(document.getElementsByTagName("a")[i].getAttribute('href'))
      {
         if((document.getElementsByTagName("a")[i].getAttribute('href').indexOf("//")<0 || (document.getElementsByTagName("a")[i].getAttribute('href').indexOf("//")>=0 && document.getElementsByTagName("a")[i].getAttribute('href').indexOf("ibluestacksdownload.org")>=0)) && document.getElementsByTagName("a")[i].getAttribute('href').indexOf("#")!=0)
         {
            links.push(i);
         }
      }
      }
      
      var linkrand=getrandom(0,links.length);
     
     if(sec%2!=0)
      {
           var linkval=links[linkrand];
        
            document.getElementsByTagName("a")[linkval].click(); 
      }
      else
         {
            window.open('', '_self', ''); 
            window.close();
         }
     
   
   
   },limit);
}

document.addEventListener('DOMContentLoaded', function(){ 
    
   if(document.location.href.indexOf("google")>=0 && window.location.pathname != "/search")
{
  var warandno=getrandom(1,2);  // 5,30
   warandno=warandno*1000;
   
  setTimeout(function()
    {
      if(document.getElementById('lst-ib') !=null) {
             document.getElementById('lst-ib').value=search_term;
             document.getElementById('tsf').submit();
          }
          else if(document.getElementById('mib') !=null) {
              document.getElementById('mib').value=search_term;
              document.getElementById('tsf').submit();
          }
          else {
                document.getElementsByClassName('lst').value =search_term;
                document.f.submit();
          }
     
  },warandno); 
   
}


var ginterval =setInterval(function()
{
    var alll=document.getElementsByTagName("cite").length;

if(document.location.href.indexOf("google")>=0 && alll>2)
{
           
   searchResultsClick();

   clearInterval(ginterval);
}

},3000);


if(document.location.href.indexOf(targetwebsite)>=0 )
{
  
   targetWebsiteBrowse();
   
}


}, false);

