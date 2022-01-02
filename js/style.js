$(document).ready(function()
{
	var blacklist = ["okan", "korhan", "deneme"]; //blacklist array
	var graylist = ["kelime", "gri", "grey"]; 	//graylist array
	var undef = ["tanımsız", "undef", "tanım"];	 //undefined array

	function yazi_bol(yazi) 	//text splitting and turning into array function
	{
		var yazi_array = yazi.split(" ");

		/*for (let i = 0; i < yazi_array.length; i++) 
		{
			yazi_array[i] = yazi_array[i];
		}*/

		return yazi_array;
	}

	function yazi_duzelt(yazi)	// text editing function to write again in textarea
	{
		var donecek = "";

		for(var i = 0; i<yazi.length; i++)
		{
			
			donecek = donecek + yazi[i] + " ";
		}

		return donecek;
	}

	function placeCaretAtEnd(el) {	// when you use contenteditable spec of html elements and manipulate content with javascript, cursor is jumping to beginning of text. This function for fix it.
	    el.focus();
	    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") 
	    {
	        var range = document.createRange();
	        range.selectNodeContents(el);
	        range.collapse(false);
	        var sel = window.getSelection();
	        sel.removeAllRanges();
	        sel.addRange(range);
	    } 
	    else if (typeof document.body.createTextRange != "undefined") 
	    {
	        var textRange = document.body.createTextRange();
	        textRange.moveToElementText(el);
	        textRange.collapse(false);
	        textRange.select();
	    }
	}

	let donen, donen2; 
	var altsimge = 1;

	$("#textarea").on("keyup" , function(button)
	{	
		var yazi = $("#textarea").text();	// text content of textarea
		var yazi2 = $("#textarea").html(); 	// html content of textarea
		donen = yazi_bol(yazi.toLowerCase()); 	// splitted array of yazi variable
		donen2 = yazi_bol(yazi2);	// splitted array of yazi2 variable

		if(yazi === "") { altsimge = 1; }

		var bas = yazi_duzelt(donen2);

		for(var i = 0; i<blacklist.length; i++)
		{
			if(donen.slice(-1) == blacklist[i])
			{
				donen[donen.length - 1] = "<span title='Bu kelimeyi kullanmanız uygunsuzdur.' class='blacklist'>"+blacklist[i]+"</span> ";	
				bas = yazi_duzelt(donen2.slice(0, -1)) + donen[donen.length - 1] + "&nbsp;";
				break;
			} 
		}

		for(var i = 0; i<undef.length; i++)
		{
			if(donen.slice(-1) == undef[i])
			{
				donen[donen.length - 1] = "<span title='Bu kelimeyi kullanmanız uygunsuzdur.' class='undef'>"+undef[i]+"</span> ";
				bas = yazi_duzelt(donen2.slice(0, -1)) + donen[donen.length - 1] + "&nbsp;";
				break;
			} 
		}

		for(var i = 0; i<graylist.length; i++)
		{
			if(donen.slice(-1) == graylist[i])
			{
				donen[donen.length - 1] = graylist[i]+"<sub title='Bu kelimeyi kullanmanız uygunsuzdur.' class='graylist'>"+altsimge+"</sub> ";
				bas = yazi_duzelt(donen2.slice(0, -1)) + donen[donen.length - 1] + "&nbsp;";
				altsimge++;
				break;
			} 
		}

		
		$("#textarea").html(bas);

		$("p").html(bas);
		placeCaretAtEnd( $("#textarea").get(0) );

		return false;
	});
	
	
});