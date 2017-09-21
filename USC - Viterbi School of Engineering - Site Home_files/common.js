/**
$Id: pint_commonDEBUG.js,v 1.15 2003/07/03 17:25:16 cducker Exp $

Description:
	PINT Commonly used JavaScript functions and constants.

Dependencies:
	Inward:
		pint_initcleanup.js
	 
	Outward:
		none	
	
Usage:
	n/a		
*/

/* ******** Constants *********************************** */
windowStatus = "";
/* ******** Common Window Settings ********************** */
defaultStatus = "";

/**
 * PINT_GetEventSource()
 * Takes as an argument the first argument to an event handler, and 
 * returns a reference to the object that generated the event
 *
 * @param e - first argument to an event handler
 *
 * @return reference to object that triggered event
 */
function PINT_GetEventSource(e)
{
	return ( //figure out where in the dom events come in on this browser
		(e && e.target) || 
		(window && window.event && window.event.srcElement)
	);	
}

/**
 * PINT_GetElementById()
 * Tries to find an element in the document 
 * by its id or name
 *
 * @param idname - id of element to locate
 */
function PINT_GetElementById(idname)
{
	var handle;

	if (document.getElementById) {
		handle = document.getElementById(idname);
		if (handle) return handle;
	}

	if (document.getElementByName) {
		handle = document.getElementByName(idname)[0];
		if (handle) return handle;
	}

	handle = document[idname];
	if (handle) return handle;

	if (document.all) {
		handle = document.all[idname];
		if (handle) return handle;
	}
	
	if (document.anchors) {
		handle = document.anchors[idname];
		if (handle) return handle;
	}
	
	if (document.links) {
		handle = document.links[idname];
		if (handle) return handle;
	}
	
	if (document.images) {
		handle = document.images[idname];
		if (handle) return handle;
	}
	
	if (document.embeds) {
		handle = document.embeds[idname];
		if (handle) return handle;
	}

	return handle;
}

/**
 * PINT_GetIdByElement()
 * Inverse of PINT_GetElementById, returns the id, 
 * or name, of a given element
 *
 * @param element - object whose id to retrieve
 */
function PINT_GetIdByElement(element)
	{
	if (!(element)) return undefined;
	if (element.id) return element.id;
	if (element.name) return element.name;
	return undefined;
	}

/**
 * PINT_ChangePageTitle()
 * Change title of current page. Use when initial title
 * tag value is optimized for Search Engines, but you 
 * want the title to be more descriptive for the visitor.
 *
 * @param   pageTitle  - new page title
 */	
function PINT_ChangePageTitle( pageTitle )
	{
	if(document.title.readOnly == true) document.title = pageTitle;
	} 	
	
/**
 * PINT_GetCurrentFileName()
 * Get name of current file from path name
 */
function PINT_GetCurrentFileName()
	{
	var URL = unescape( window.location.pathname );
	var start = URL.lastIndexOf( "/" ) + 1;
	var end = ( URL.indexOf( "?" ) > 0 ) ? URL.indexOf( "?" ) : URL.length;
	return( URL.substring( start, end ) );
	}	
/**
 * PINT_GetCurrentFilePath()
 * Get path to current file from path name
 */
function PINT_GetCurrentFilePath()
	{
	var URL = unescape( window.location.pathname );
	var start = URL.lastIndexOf( "/" );
	return( URL.substring( 0, start ) );
	}

/**
 * PINT_GetCurrentDirectory()
 * Get name of current directory from path name
 */			
function PINT_GetCurrentDirectory()
	{
	var filePath = PINT_GetCurrentFilePath();
	var directories = filePath.split("/");
	return directories.length && directories[ directories.length-1 ] != "" ? directories[ directories.length-1 ] : "";
	}
	
/**
 * PINT_IsRootDirectory()
 * Determine if specified directory matches root directory
 *
 * @param directory - directory to check
 */
function PINT_IsRootDirectory( directory )
	{
	return directory == PINT_GetRootDirectory() ? true : false;
	}

/**
 * PINT_IsDefaultFile()
 * Determine if file name is an index file
 *
 * @param fileName - file name to check
 */
function PINT_IsDefaultFile( fileName )
	{
	return fileName == "" || fileName == PINT_GetDefaultFile() ? true : false;
	}	

/**
 * PINT_GetDefaultFile()
 * Gets DefaultFile global variable if defined.
 * 
 * @return		default file name.
 *
 */	
function PINT_GetDefaultFile()
	{
	if( typeof( defaultFile ) == 'undefined' )	
		return "";
	else
		return defaultFile;
	}
	
/**
 * PINT_FirstFocus()
 * Set cursor focus to first available form field
 * 
 * @param field - optional: reference to form input, otherwise defaults to the first element of the first form on the page
 */				
function PINT_FirstFocus()	
	{
	var elementref;
	var i=0;
	if (!(elementref = PINT_FirstFocus.arguments[0]))
		{
		if (!(document.forms[0])) return false;
		while ((elementref = document.forms[0].elements[i++]) && (elementref.type == 'hidden')) {};
		}
	if (!(elementref)) return false;
	elementref.focus();
	return true;
	}


/**
 * PINT_OnMouseOverHandler()
 * Handler for all onmouseover events. Must be explicitly set as 
 * the function handler.
 * 
 * @param e		event
 * @return		True.
 *
 */
function PINT_OnMouseOverHandler(e) 
	{
	e = (e) ? e : ((window.event) ? window.event : "")
	if (e) 
		{
		var eventsource = PINT_GetEventSource(e);
		if( eval( 'typeof(PINT_MenuTriggers)' ) != 'undefined' && 
		    eval( 'typeof(PINT_MenuTriggers[eventsource.id])' ) != 'undefined' )
			PINT_MenuPopUp(e);
		else if( eval( 'typeof(PINT_ROtriggers)' ) != 'undefined' &&  
		    eval( 'typeof(PINT_ROtriggers[eventsource.id])' ) != 'undefined' )
			PINT_RORollover(e);
			
		PINT_SetWindowStatus();	
		}
	return true;	
	}

/**
 * PINT_OnMouseOutHandler()
 * Handler for all onmouseout events. Must be explicitly set as 
 * the function handler.
 * 
 * @param e		event
 * @return		True.
 *
 */	
function PINT_OnMouseOutHandler(e) 
	{
	e = (e) ? e : ((window.event) ? window.event : "")
	if (e) 
		{
		var eventsource = PINT_GetEventSource(e);
		if( eval( 'typeof(PINT_MenuTriggers)' ) != 'undefined' && 
		    eval( 'typeof(PINT_MenuTriggers[eventsource.id])' ) != 'undefined' )
			PINT_MenuPopDown(e);	
		else if( eval( 'typeof(PINT_ROtriggers)' ) != 'undefined' &&  
			eval( 'typeof(PINT_ROtriggers[eventsource.id])' ) != 'undefined' )
			PINT_RORollout(e);
		}
	return true;
	}


/**
 * PINT_SetWindowStatus()
 * Set status bar message from parameter or global variable.
 * 
 * @param e		event
 * @return		True.
 *
 */	
function PINT_SetWindowStatus()
	{
	// if no arguments are passed, look for global windowStatus varible
	if( PINT_SetWindowStatus.arguments.length == 0 )
		{
		if( typeof(windowStatus) != 'undefined' && windowStatus != "" )
			{
			window.status = windowStatus;
			windowStatus = "";
			}
		}	
	else
		window.status = PINT_SetWindowStatus.arguments[0];
	return true;
	}	

/**
 * PINT_GetRootDirectory()
 * Gets rootDirectory global variable if defined.
 * 
 * @return		root directory path.
 *
 */	
function PINT_GetRootDirectory()
	{
	if( typeof( rootDirectory ) == 'undefined' )	
		return "";
	else
		return rootDirectory;
	}

/*
$Id: pint_printcssDEBUG.js,v 1.3 2003/08/11 20:38:55 cducker Exp $

Creator: C. Ducker

Description:
	Display different style sheets depending upon client browser capabilities.

Dependencies:
	pint_common.js
	
Usage:	
	<head>
	<script src="/javascript/pint_printcss.js" language="JavaScript" type="text/javascript"></script>
	<!--
Content Coder: D Whitworth
Programmer: 
-->

</head>
*/
function PINT_PrintCSS()
	{
	var NS4, IE, DOMstandard, CSScapable;
	NS4 = (document.layers) ? 1 : 0;
	IE = (document.all) ? 1 : 0;
	DOMstandard = (document.getElementById) ? 1 : 0;
	CSScapable = (NS4 || IE || DOMstandard) ? 1 : 0;
	
	if(CSScapable) 
		{
		if(NS4) 
			document.write("<link rel=\"stylesheet\" href=\"" + themeRootDirectory + "/css/netscape.css\" type=\"text/css\" media=\"screen\" />");
		else
			document.write("<link rel=\"stylesheet\" href=\"" + themeRootDirectory + "/css/dom.css\" type=\"text/css\" media=\"screen\" />");
		}
	}	
	
/*
$Id: pint_rolloverDEBUG.js,v 1.5 2003/07/03 17:01:44 cducker Exp $

Creator: J. Brock

Description:
	This rollover code is supposed to be 
		1. flexible, to accomodate all possible rollover activity
		2. compatible, should work on anything better than IE4, Netscape 4
		3. easy, so that all the rollover information can be inserted into the img tag in a simple way
		4. robust, so that errors, typos, bad DOM support make it degrade gracefully

Dependancies:
	pint_initcleanup.js

Usage:
	In pint_initcleanup.js:
	function init()
		{
		PINT_RORolloverInit('img1', 'img1', 'img1on.png');
		PINT_RORolloverInit('img2', 'img2', 'img2on.png', 'img1', 'img1on.png');
		};
	
	function cleanup()
		{};
	
	In page.htm:
	<head>
	<script src="\script\PINTRolloverDEBUG.js" language="JavaScript" type="text/javascript"></script>
	<script src="\script\PINTInitCleanup.js" language="JavaScript" type="text/javascript"></script>
	<!--
Content Coder: D Whitworth
Programmer: 
-->

</head>

	<!-- rolling over img1 turns img1 on, rolling over img2 turns img1 and img2 on. -->
	<img name="img1" src="img1off.png">
	<img name="img2" src="img2off.png">
*/

/*************** PRIVATE DATA STRUCTURES ****************/

var PINT_ROcapableFlag = true;			// assume this browser is rollover capable, unless it proves otherwise.
var PINT_ROtriggers = new Array();
var PINT_ROtargets = new Array();
var PINT_ROtargetRollovers = new Array();
if ((typeof PINT_ROtriggers) != 'object') PINT_ROcapableFlag = false;


/************** PUBLIC METHODS **********************/


/*	PINT_RORolloverInit()
	Initializes an html entity for image rollover triggering. This function should only be called after the body of the document has finished loading.
	Arguments: (there must be an odd number of arguments)
		1. the name attribute of the entity (usually an <a> or an <img>) which triggers the rollover
		2. the name attribute of the <img> which will be changed
		3. the source url that the image named by arg 2 will rollover to
		4. same as 2...
		5. same as 3...
		...
	Returns: true on success, false on failure
*/
function PINT_RORolloverInit()
	{
	if (!(PINT_ROcapableFlag)) return false;			// if the browser is not rollover capable, fail
	if (!(document.images)) return PINT_ROcapableFlag = false;
	if (PINT_RORolloverInit.arguments.length < 1 ) return true;		//if no arguments
	//if ((PINT_RORolloverInit.arguments.length % 2) != 0) return false;	//must be even number of arguments

	if( document.getElementById )
		{
		var setTrigger = typeof(PINT_RORolloverInit.arguments[4]) != 'undefined' ? PINT_RORolloverInit.arguments[4] : true;
		var trigger = document.getElementById( PINT_RORolloverInit.arguments[0] );
	
		if( trigger && setTrigger )
			{
			if (!(PINT_ROtriggers[trigger.id])) PINT_ROtriggers[trigger.id] = new Array(); // init the target array
			
			var i, target;
		
			target = document.getElementById( PINT_RORolloverInit.arguments[1] );
			targetrollover = PINT_RORolloverInit.arguments[2];
	
			if (!(target.src)) return false;		// if target is not an image
	
			PINT_ROtargets[target.id] = target.src;     // load up the target rollover sources
			PINT_ROtargetRollovers[targetrollover] = new Image();
			PINT_ROtargetRollovers[targetrollover].src = targetrollover; // cache rollover images in associative array
			//PINT_ROtriggers[trigger.name][target.name] = PINT_ROtargetRollovers[targetrollover]; // reference to the cached image
			PINT_ROtriggers[trigger.id][target.id] = PINT_ROtargetRollovers[targetrollover]; // reference to the cached image
			
			if( typeof(PINT_RORolloverInit.arguments[3]) != 'undefined' )
				PINT_ROtriggers[trigger.id]["window.status"] = PINT_RORolloverInit.arguments[3];
			
			
				
			trigger.onmouseover = PINT_OnMouseOverHandler;
			trigger.onmouseout = PINT_OnMouseOutHandler;
			}
		}
	return true;
	}



/********* PRIVATE METHODS ************/
function PINT_RORollover(e)
{
	if (!PINT_ROcapableFlag) return false;
	var eventsource = PINT_GetEventSource(e);	//figure out where the events come in on this browser
	if (!eventsource) return (PINT_ROcapableFlag = false); // if there's no events, can't do rollovers
	PINT_RORolloverById(eventsource.id);
	return true;
}

function PINT_RORollout(e)
{
	if (!PINT_ROcapableFlag) return false;
	var eventsource = PINT_GetEventSource(e);	//figure out where the events come in on this browser
	if (!eventsource) return (PINT_ROcapableFlag = false); // if there's no events, can't do rollovers
	PINT_RORolloutById(eventsource.id);
	return true;
}	
	
	
function PINT_RORolloverById(elementId)
	{
	if(!PINT_ROcapableFlag)return false;
	if(eval('typeof(PINT_ROtriggers[elementId])')!='undefined')
		{
		for (target in PINT_ROtriggers[elementId]) //for this trigger, rollover each of it's targets
			{
			if( typeof( document[target] ) == 'object' )
				document[target].src = PINT_ROtriggers[elementId][target].src;
	
			if( target == "window.status" )
				windowStatus = PINT_ROtriggers[elementId][target];
			}
		}
	return true;
	}

function PINT_RORolloutById(elementId)
	{
	if(!PINT_ROcapableFlag)return false;
	if(eval('typeof(PINT_ROtriggers[elementId])')!='undefined')
		{
		for (target in PINT_ROtriggers[elementId]) //for this trigger, reset the src for each of it's targets
			{
			if( typeof( document[target] ) == 'object' )
				document[target].src = PINT_ROtargets[target];
			}
		}
	return true;
	}	




var rot13map;
function rot13init()
	{
    var map = new Array();
    var s   = "abcdefghijklmnopqrstuvwxyz";
    for (i=0; i<s.length; i++) map[s.charAt(i)] = s.charAt((i+13)%26);
    for (i=0; i<s.length; i++) map[s.charAt(i).toUpperCase()] = s.charAt((i+13)%26).toUpperCase();
    return map;
	}

function rot13(a)
	{
    if (!rot13map) rot13map=rot13init();
    var s = "";
    for (i=0; i<a.length; i++)
    {
        var b = a.charAt(i);
        s += (b>='A' && b<='Z' || b>='a' && b<='z' ? rot13map[b] : b);
    }
    return s;
	}
	

// named this for obfuscation
function print_e(user, domain)
	{
	var e = rot13(user) + "@" + rot13(domain);
	var out = '<a href="mailto:' + e + '">';
	out += e;
	out += '</a>';
	document.write(out);
	}

/*
PINT_FlashObject=function(swf,id,w,h,defaultImage,ver,imageMap,c){this.swf=swf;this.id=id;this.width=w;this.height=h;this.imageMap=imageMap;this.version=ver||6;this.align="middle";this.codebase=this.version+",0,0,0";this.redirect="";this.sq=document.location.search.split("?")[1]||"";this.defaultImage=defaultImage;this.altTxt="Please <a href='http://www.macromedia.com/go/getflashplayer'>upgrade your Flash Player</a>.";this.bypassTxt="";this.params=new Object();this.variables=new Object();if(c)this.color=this.addParam('bgcolor',c);this.addParam('quality','high');this.doDetect=getQueryParamValue('detectflash');};

PINT_FlashObject.prototype.addParam=function(name,value){this.params[name]=value};

PINT_FlashObject.prototype.getParams=function(){return this.params};

PINT_FlashObject.prototype.getParam=function(name){return this.params[name]};

PINT_FlashObject.prototype.addVariable=function(name,value){this.variables[name]=value};

PINT_FlashObject.prototype.getVariable=function(name){return this.variables[name]};PINT_FlashObject.prototype.getVariables=function(){return this.variables};PINT_FlashObject.prototype.getParamTags=function(){var paramTags="";for(var param in this.getParams()){paramTags+='<param name="'+param+'" value="'+this.getParam(param)+'" />'}if(paramTags==""){paramTags=null}return paramTags};

PINT_FlashObject.prototype.getHTML=function(){var flashHTML="";if(window.ActiveXObject&&navigator.userAgent.indexOf('Mac')==-1){flashHTML+='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+this.codebase+'" width="'+this.width+'" height="'+this.height+'" id="'+this.id+'" align="'+this.align+'">';flashHTML+='<param name="movie" value="'+this.swf+'" />';if(this.getParamTags()!=null){flashHTML+=this.getParamTags();}if(this.getVariablePairs()!=null){flashHTML+='<param name="flashVars" value="'+this.getVariablePairs()+'" />'}flashHTML+='</object>'}else{flashHTML+='<embed type="application/x-shockwave-flash" src="'+this.swf+'" width="'+this.width+'" height="'+this.height+'" id="'+this.id+'" align="'+this.align+'"';for(var param in this.getParams()){flashHTML+=' '+param+'="'+this.getParam(param)+'"'}if(this.getVariablePairs()!=null){flashHTML+=' flashVars="'+this.getVariablePairs()+'"'}flashHTML+='></embed>'}return flashHTML};

PINT_FlashObject.prototype.getVariablePairs=function(){var variablePairs=new Array();for(var name in this.getVariables()){variablePairs.push(name+"="+escape(this.getVariable(name)));}if(variablePairs.length>0){return variablePairs.join("&");}else{return null}};

PINT_FlashObject.prototype.write=function(elementId){if(detectFlash(this.version)||this.doDetect=='false'){if(elementId){document.getElementById(elementId).innerHTML=this.getHTML();}else{document.write(this.getHTML());}}else{if(this.redirect!=""){document.location.replace(this.redirect);}else if(this.defaultImage!=""){imageString="<img src=\""+this.defaultImage+"\" width=\""+this.width+"\" height=\""+this.height+"\" border=\"0\" alt=\"\"";if(eval('typeof(this.imageMap)')!="undefined"&&this.imageMap!="")imageString+=" usemap=\"#"+this.imageMap+"\" ";imageString+=" class=\"inlineimage\" />";document.write(imageString);}else document.write(this.altTxt+""+this.bypassTxt);}};

function getFlashVersion()
{
        var flashversion=0;
        if(navigator.plugins&&navigator.plugins.length)
        {
                var x=navigator.plugins["Shockwave Flash"];
                if(x)
                {
                        if(x.description)
                        {
                                var y=x.description;
                                //the bad line of code!!
                                flashversion=y.charAt(y.indexOf('.')-1);
                                //FIX
                                var pieces = y.split(' ');
                                flashversion = pieces[2]*1;
                        }
                }
        }else
        {
                result=false;
                for(var i=15;i>=3&&result!=true;i--)
                {
                        execScript('on error resume next: result = IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.'+i+'"))','VBScript');
                        flashversion=i
                }
        }
        return flashversion
}
*/

function detectFlash(ver)
{
	if(getFlashVersion()>=ver)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function getQueryParamValue(param)
{
	var q=document.location.search;
	var detectIndex=q.indexOf(param);
	if(q.length>1&&detectIndex!=-1)
	{	
	return q.substring(q.indexOf("=",detectIndex)+1,q.indexOf("&",detectIndex));
	}
	else{return true;
	}
}

function resizeImages(){
    var width = document.getElementById('slideShowLargeImage').width;
    var height = document.getElementById('slideShowLargeImage').height;
    var wratio = 1;
    var hratio = 1;
    
    if( width > 480 ){
        wratio = 480 / width;
        document.getElementById('slideShowLargeImage').style.height = height * hratio;
        document.getElementById('slideShowLargeImage').style.width = 480;
    }
    if( height > 320 ){
        hratio = 320 / height;
        document.getElementById('slideShowLargeImage').style.width = width * hratio;
        document.getElementById('slideShowLargeImage').style.height = 320;
    }
}

PINT = { util: {} };
PINT.util.getQueryParamValue=function(sParam){var aTemp=document.location.search.split('&');for(var i=0;i<aTemp.length;i++){var aTemp2=aTemp[i].split('=');if(aTemp2[0]==sParam){return aTemp2[1];}}return "";};PINT.util.setWindowTitle=function(sTitle){document.title=sTitle;};PINT.util.setWindowStatus=function(sStatus){window.status=sStatus;};PINT.util.getRandomString=function(iLength,sChars){iLength=iLength||8;sChars=sChars||"abcdefghijklmnopqrstuvwxyz0123456789";var sRandomString="";for(var i=0;i<iLength;i++){sRandomString += sChars.charAt(parseInt(sChars.length*Math.random(),10));}return sRandomString;};PINT.util.getCurrentFileName=function(){var sUrl=decodeURI(window.location.pathname);var iStart=sUrl.lastIndexOf("/")+1;var iEnd=(sUrl.indexOf("?")>0)? sUrl.indexOf("?"):sUrl.length;return sUrl.substring(iStart,iEnd);};PINT.util.getCurrentFilePath=function(){var sUrl=decodeURI(window.location.pathname);var iStart=sUrl.lastIndexOf("/");return sUrl.substring(0,iStart);};PINT.util.getCurrentDirectory=function(){var sFilePath=this.getCurrentFilePath();var aDirectories=sFilePath.split("/");return aDirectories.length&&aDirectories[aDirectories.length-1] !== "" ? aDirectories[aDirectories.length-1]:"";};PINT.util.encodeJSON=function(sData){sData=sData.replace(/\[/gi,"[");sData=sData.replace(/\]/gi,"]");sData=sData.replace(/\{/gi,"{");sData=sData.replace(/\}/gi,"}");sData=sData.replace(/\'/gi,"0x27");sData=sData.replace(/\"/gi,"0x22");sData=sData.replace(/\\/gi,"\\\\");sData=sData.replace(/\t/gi,"0x09");sData=sData.replace(/\n/gi,"0x0A");sData=sData.replace(/\f/gi,"0x0C");sData=sData.replace(/\r/gi,"0x0D");return sData;};PINT.util.decodeJSON=function(sData){sData=sData.replace(/\[/gi,"[");sData=sData.replace(/\]/gi,"]");sData=sData.replace(/\{/gi,"{");sData=sData.replace(/\}/gi,"}");sData=sData.replace(/0x27/gi,"'");sData=sData.replace(/0x28/gi,'"');sData=sData.replace(/\\\\/gi,"\\");sData=sData.replace(/0x09/gi,"\t");sData=sData.replace(/0x0A/gi,"\n");sData=sData.replace(/0x0C/gi,"\f");sData=sData.replace(/0x0D/gi,"\r");return sData;};PINT.util.obfuscateMailto=function(sDomain,sUser,sText){var sLinkText;if(sText === null){sLinkText=sUser+"&#"+64+";"+sDomain;}else{sLinkText=sText;}document.write("<a href=\"m&#"+97+";il&#"+116+";o:"+ sUser +"&#"+64+";"+sDomain+"\">"+sLinkText+"</a>");};PINT.util.anchorPopupWindows=function(){if(!document.getElementsByTagName){return;}var getPopupAnchors=function(el){var rel=el.getAttribute("rel");if(rel){return(rel.indexOf("popup")>=0);}else{return false;}};var anchors=YAHOO.util.Dom.getElementsBy(getPopupAnchors,"a");var currentAnchor;for(var anchorIndex=0; anchorIndex<anchors.length; anchorIndex++){var targetLink,relArray,relInformation,windowAttributes,javascriptTargetLink;var location,menubar,resizable,scrollbars,status,toolbar;var width,height,windowType,windowName;currentAnchor=anchors[anchorIndex];targetLink=currentAnchor.getAttribute("href"); relInformation=currentAnchor.getAttribute("rel"); if(relInformation&&targetLink){relArray=relInformation.split("|");var size=PINT.util.browser.getSize();if(relArray.length>=4){if(relArray[1]!="null"){width=parseInt(relArray[1],10)? parseInt(relArray[1],10):400;}else{width=size[2];}if(relArray[2]!="null"){height=parseInt(relArray[2],10)? parseInt(relArray[2],10):400;}else{height=size[3];}windowType=relArray[3];windowAttributes="width="+width+",height="+height; if(windowType=="custom"){if(relArray.length<10){return false;}location=parseInt(relArray[4],10)? parseInt(relArray[4],10): 0;menubar=parseInt(relArray[5],10)? parseInt(relArray[5],10): 0;resizable=parseInt(relArray[6],10)? parseInt(relArray[6],10): 0;scrollbars=parseInt(relArray[7],10)? parseInt(relArray[7],10): 0;status=parseInt(relArray[8],10)? parseInt(relArray[8],10): 0;toolbar=parseInt(relArray[9],10)? parseInt(relArray[9],10): 0;if(relArray.length==11){windowName=relArray[10];}else{windowName="popupWindow";}windowAttributes += ",location="+ location +",menubar="+menubar +",resizable="+resizable+",scrollbars="+scrollbars+",status="+status+",toolbar="+ toolbar;}else{if(relArray.length==5){windowName=relArray[4];}else{windowName="popupWindow";}if(windowType=="standard"){windowAttributes += ",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0";}else if(windowType=="resize"){windowAttributes += ",location=0,menubar=0,resizable=1,scrollbars=0,status=0,toolbar=0";}else if(windowType=="scrollbar"){windowAttributes += ",location=0,menubar=0,resizable=0,scrollbars=1,status=0,toolbar=0";}else if(windowType=="blank"){windowAttributes="";}else{return false;}}var parameters=[targetLink,windowName,windowAttributes];YAHOO.util.Event.addListener(currentAnchor,'click',PINT.util.popupWindow,parameters);}}}};PINT.util.popupWindow=function(e,params){if(params.length<1){return false;}var popupWin=null;popupWin=window.open(params[0],params[1],params[2]);YAHOO.util.Event.preventDefault(e);};PINT.util.getUrlSeperator=function(sUrl){return(sUrl.indexOf("?")!=-1 ? "&":"?");};PINT.util.getPropertyFromClass=function(str,widget,property){var regex=new RegExp(widget+"-"+property+"-(.+)");var classNames=str.split(' ');if(classNames.length){for(var i=0; i<classNames.length; i++){var hasMatch=classNames[i].match(regex);if(hasMatch){return hasMatch[1];}}}else{return null;}};PINT.util.pngFix=function(){for(var i=0; i<document.images.length; i++){var img=document.images[i];var imgName=img.src.toUpperCase();if(imgName.substring(imgName.length-3,imgName.length)=="PNG"){var imgID=img.id ? "id='"+img.id+"' ":"";var imgClass=img.className ? "class='"+img.className+"' ":"";var imgTitle=img.title ? "title='"+img.title+"' ":"title='"+img.alt+"' ";var imgStyle="display:inline-block;"+img.style.cssText;if(img.align=="left"){imgStyle="float:left;"+imgStyle;}if(img.align=="right"){imgStyle="float:right;"+imgStyle;}if(img.parentElement.href){imgStyle="cursor:hand;"+imgStyle;}var strNewHTML="<span "+imgID+imgClass+imgTitle+"style=\""+"width:"+img.width+"px; height:"+img.height+"px;"+imgStyle+"; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'"+img.src+"\',sizingMethod='scale');\"></span>";img.outerHTML=strNewHTML;i=i-1;}}};
PINT.util.flash = function () {
    this.aParams = arguments[0] || [];
    this.sId = this.aParams.id || Math.floor(Math.random() * 5000 + 1);
    this.sSwf = this.aParams.swf || "";
    this.iWidth = this.aParams.width || 0;
    this.iHeight = this.aParams.height || 0;
    this.sAlign = this.aParams.align || "middle";
    this.iVersion = this.aParams.version || 6;
    this.sImageMap = this.aParams.imagemap || "";
    this.sCodeBase = this.iVersion + ",0,0,0";
    this.sDefaultImage = this.aParams.defaultimage || "";
    this.sNoScriptId = this.aParams.noscriptId || "";
    this.sAltText = this.aParams.alttext || "Please <a href='http://www.macromedia.com/go/getflashplayer'>upgrade your Flash Player</a>.";
    this.sBypassText = this.aParams.bypasstext || "";
    this.sRedirectUrl = this.aParams.redirecturl || "";
    this.sBgColor = this.aParams.bgcolor || "";
    this.aParams = {};
    this.aVars = {};
    this.addParam = function (sName, sValue) {
        this.aParams[sName] = sValue;
    };
    this.getParams = function (sName) {
        if (sName) {
            return this.aParams[sName];
        } else {
            return this.aParams;
        }
    };
    this.addVariable = function (sName, sValue) {
        this.aVars[sName] = sValue;
    };
    this.getVars = function (sName) {
        if (sName) {
            return this.aVars[sName];
        } else {
            return this.aVars;
        }
    };
    this.getParamTags = function () {
        var sParamTags = "";
        for (var sParam in this.getParams()) {
            if (typeof sParam == "string") {
                sParamTags += '<param name="' + sParam + '" value="' + this.getParams(sParam) + '" />';
            }
        }
        if (sParamTags === "") {
            sParamTags = null;
        }
        return sParamTags;
    };
    this.getHTML = function () {
        var sFlashHTML = "";
        if (window.ActiveXObject && navigator.userAgent.indexOf('Mac') == -1) {
            var protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
            sFlashHTML += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + protocol + 'fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + this.sCodeBase + '" width="' + this.iWidth + '" height="' + this.iHeight + '" id="' + this.sId + '" name="' + this.sId + '" align="' + this.sAlign + '">';
            sFlashHTML += '<param name="movie" value="' + this.sSwf + '" />';
            if (this.getParamTags() !== null) {
                sFlashHTML += this.getParamTags();
            }
            if (this.getVariablePairs() !== null) {
                sFlashHTML += '<param name="flashVars" value="' + this.getVariablePairs() + '" />';
            }
            sFlashHTML += '</object>';
        } else {
            sFlashHTML += '<embed type="application/x-shockwave-flash" src="' + this.sSwf + '" width="' + this.iWidth + '" height="' + this.iHeight + '" id="' + this.sId + '" name="' + this.sId + '" align="' + this.sAlign + '"';
            for (var sParam in this.getParams()) {
                if (typeof sParam == "string") {
                    sFlashHTML += ' ' + sParam + '="' + this.getParams(sParam) + '"';
                }
            }
            if (this.getVariablePairs() !== null) {
                sFlashHTML += ' flashVars="' + this.getVariablePairs() + '"';
            }
            sFlashHTML += '></embed>';
        }
        return sFlashHTML;
    };
    this.getVariablePairs = function () {
        var aVariablePairs = [];
        for (var sName in this.getVars()) {
            if (typeof sName == "string") {
                aVariablePairs.push(sName + "=" + encodeURIComponent(this.getVars(sName)));
            }
        }
        if (aVariablePairs.length > 0) {
            return aVariablePairs.join("&");
        } else {
            return null;
        }
    };
    this.render = function (sIdContainer) {
        this.addParam("quality", "high");
        if (this.sBgColor) {
            this.addParam("bgcolor", this.sBgColor);
        }
        this.sDetect = PINT.util.getQueryParamValue("detectflash");
        if (this.detectFlash(this.iVersion) || this.sDetect == "false") {
            if (sIdContainer) {
                document.getElementById(sIdContainer).innerHTML = this.getHTML();
            } else {
                document.write(this.getHTML());
            }
        } else {
            if (this.sRedirectUrl !== "") {
                document.location.replace(this.sRedirectUrl);
            } else if (this.sNoScriptId !== "") {
                var oElement = document.getElementById(this.sNoScriptId);
                if (oElement) {
                    oElement.style.display = oElement.parentNode.style.display;
                }
            } else if (this.sDefaultImage !== "") {
                var sImageString = "<img src=\"" + this.sDefaultImage + "\" width=\"" + this.iWidth + "\" height=\"" + this.iHeight + "\" border=\"0\" alt=\"\"";
                if (typeof this.sImageMap != "undefined" && this.sImageMap !== "") {
                    sImageString += " usemap=\"#" + this.sImageMap + "\" ";
                }
                sImageString += " class=\"inlineimage\" />";
                if (sIdContainer) {
                    document.getElementById(sIdContainer).innerHTML = sImageString;
                } else {
                    document.write(sImageString);
                }
            } else {
                if (sIdContainer) {
                    document.getElementById(sIdContainer).innerHTML = this.sAltText + "" + this.sBypassText;
                } else {
                    document.write(this.sAltText + "" + this.sBypassText);
                }
            }
        }
    };
    this.getFlashVersion = function () {
        var iFlashVersion = 0;
        if (navigator.plugins && navigator.plugins.length) {
            var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
            var oPlugin = navigator.plugins["Shockwave Flash" + swVer2];
            if (oPlugin) {
                if (oPlugin.description) {
                    var sDescription = oPlugin.description;
                    var aDescription = oPlugin.description.split(" ");
                    var aMajorVersion = aDescription[2].split(".");
                    iFlashVersion = aMajorVersion[0];
                }
            }
        } else {
            var axo;
            try {
                axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10");
                iFlashVersion = 10;
            } catch (e) {}
            if (!iFlashVersion) {
                try {
                    axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.9");
                    iFlashVersion = 9;
                } catch (e1) {}
            }
            if (!iFlashVersion) {
                try {
                    axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.8");
                    iFlashVersion = 8;
                } catch (e2) {}
            }
            if (!iFlashVersion) {
                try {
                    axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                    iFlashVersion = 7;
                } catch (e3) {}
            }
            if (!iFlashVersion) {
                try {
                    axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    iFlashVersion = 6;
                } catch (e4) {}
            }
        }
        return iFlashVersion;
    };
    this.detectFlash = function (iVersion) {
        return (this.getFlashVersion() >= iVersion);
    };
};
var PINT_FlashObject = function (swf, id, w, h, defaultImage, ver, imageMap, c) {
        var f = new PINT.util.flash({
            swf: swf,
            width: w,
            height: h,
            defaultimage: defaultImage,
            version: ver,
            imagemap: imageMap,
            bgcolor: c
        });
        f.write = function () {
            this.render(arguments.length == 1 ? arguments[0] : null);
        };
        return f;
    };



window.onload = function(){
    
    if(document.getElementById('gallery')){
       
        //resize images
        //resizeImages();
    }
}