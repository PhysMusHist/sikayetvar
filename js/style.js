$(document).ready(function()
{
	var blacklist = ["okan", "korhan", "deneme"]; //blacklist dizisi
	var graylist = ["kelime", "gri", "grey"]; 	//graylist dizisi
	var undef = ["tanımsız", "undef", "tanım"];	 //undefined dizisi

	function yazi_bol(yazi) 	//yazıyı boşluklara göre bölme ve dizi oluşturma fonksiyonu
	{
		var yazi_array = yazi.split(" ");

		return yazi_array;
	}

	function comma(yazi)
	{	
		let don = "";
		for(let i = 0; i<yazi.length; i++)
		{	
			don = yazi[i].replace(/,/g, "");
		}
		return don;
	}

	function yazi_duzelt(yazi)	//html ile çekilmiş yazıyı tekrar textarea bölgesine yazabilmek için düzenleme fonksiyonu
	{
		var donecek = "";

		for(let i = 0; i<yazi.length; i++) //her bir dizi elemanın sonuna boşluk ekleniyor
		{	
			yazi[i] = yazi[i].replace("&nbsp;", "");
			donecek = donecek + yazi[i] + " "; 
		}

		return donecek;
	}

	function placeCaretAtEnd(el) {	// contenteditable özelliği aktifleşince ve jquery ile manipüle edildiğinde cursor en başa zıplıyor, bunu enegellemek için yazılmış hazır bir fonksiyon
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

	let donen, donen2; //yazı bölme fonksiyonlarından dönen değerler
	var altsimge = 1; //gri liste için alt simge sayısı

	$("#textarea").on("keydown" , function(button)
	{	
		if(button.keyCode === 32 || button.keyCode === 13){ // space veya enter tuşuna basıldıysa

			var yazi = $("#textarea").text();	// textarea'nın yazı içeriği
			var yazi2 = $("#textarea").html(); 	// textarea'nın html içeriği
			donen = yazi_bol(yazi.toLowerCase()); 	// yazi değişkenin bölünmüş hali
			donen2 = yazi_bol(yazi2);	// yazi2 değişkenin bölünmüş hali

			var bas = yazi_duzelt(donen2) + "&nbsp;"; // textarea'nın içine basılacak olan içerik

			for(let i = 0; i<blacklist.length; i++) // blacklist kontrolü için döngü
			{
				if(donen.slice(-1) == blacklist[i])
				{
					donen[donen.length - 1] = "<span title='Bu kelimeyi kullanmanız uygunsuzdur.' class='blacklist'>"+blacklist[i]+"</span>";	
					bas = yazi_duzelt(donen2.slice(0, -1)) + donen[donen.length - 1] + " &nbsp;";
					break;
				} 
			}

			for(let i = 0; i<undef.length; i++)	// tanımsız kelime kontrolü için döngü
			{
				if(donen.slice(-1) == undef[i])
				{
					donen[donen.length - 1] = "<span title='Bu kelimeyi kullanmanız uygunsuzdur.' class='undef'>"+undef[i]+"</span>";
					bas = yazi_duzelt(donen2.slice(0, -1)) + donen[donen.length - 1] + " &nbsp;";
					break;
				} 
			}

			for(let i = 0; i<graylist.length; i++) // graylist kontrolü için döngü
			{
				if(donen.slice(-1) == graylist[i])
				{
					donen[donen.length - 1] = graylist[i]+"<sub title='Bu kelimeyi kullanmanız uygunsuzdur.' class='graylist'>"+altsimge+"</sub>";
					bas = yazi_duzelt(donen2.slice(0, -1)) + donen[donen.length - 1] + " &nbsp;";
					altsimge++;
					break;
				} 
			}

			
			$("#textarea").html(bas);
			placeCaretAtEnd( $("#textarea").get(0) );

			return false;

		}
		else if(button.keyCode == 8) //tüm yazıların silinip silinmediğinin kontrolü için if 
		{
			var yazi = $("#textarea").text();
			if(yazi == "")  //eğer yazılar silinmişse
			{ 
				$("#textarea").html(""); //içeriyi html taglerinden temizle
				placeCaretAtEnd( $("#textarea").get(0) );
				altsimge = 1;  // eğer yazi değişkeni boşsa yani tüm yazılar silinmişse, altsimgeyi tekrar 1'e eşitle
			}
		}

	});

	
	
	
});