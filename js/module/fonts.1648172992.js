// $.getScript('/js/kcaptcha.js');
var fonts_ko = ["@Korean", "KoPub Batang", "Black Han Sans", "Gmarket Sans", "Godo", "Kukdetopokki", "Nanum Gothic", "Nanum Gothic Coding", "Nanum Myeongjo", "Nanum Barun Gothic", "Nanum Pen Script", "Nanum Barun Pen", "Nanum Brush Script", "Nanum Square", "Nanum Square Round", "Daraehand", "Dohyeon", "Monsori", "Noto Sans KR", "Noto Serif CJK KR", "BB Tree Gothic","BB Tree Namu",  "BB Tree Hand", "SangSangTitle", "Seoul Namsan", "Seoul Hangang", "Spoqa Han Sans", "S CoreDream", "Yeonsung", "Oseong and HanEum", "Iropke Batang", "Jalnan", "Jeju Gothic", "Jeju Myeongjo", "Jeju Hallasan", "Jua", "Youth", "Hangyule", "Hanna"],
    fonts_en = ["@English", "Abel", "Abril Fatface", "Alegreya", "Aliquam", "Arial", "Cardo", "Cookie", "Dancing Script", "Dosis", "Droid Sans", "Droid Serif", "Fredoka One", "Georgia", "Great Vibes", "Ibarra Real Nova", "Inter", "Lato", "Libre Baskerville", "Lora", "Montserrat", "Muli", "Nixie One", "Noto Sans", "Open sans", "Oswald", "Parisienne", "Playball", "Playfair Display", "Poppins", "PT Sans", "PT Serif", "Questrial", "Quicksand", "Raleway", "Roboto", "Spartan", "Staatliches", "Stalemate", "Times New Roman", "Trench"],
    fonts_ja = ["@Japanese", "Hannari", "Hokkori", "IoEI", "JKG", "MS Gothic", "MS Mincho", "Noto Sans JP", "Noto Serif JP"],
    fonts_th = ["@Thai", "Cyclin", "Hai Heritage Pro", "HFF Thai Dye", "Owah Tagu Siam NF"],
    fonts_ar = ["@Arabic", "Aceh Darusalam", "Amiri", "ArabDances", "Boecklins Universe", "Catharsis Bedouin", "Himchuli", "Kanisah", "Satyajit"],
    fonts_cr = ["@Cyrillic", "20db", "Alpha Echo", "Anonymous Pro", "Arsenal", "Bebas Neue", "Bitter", "Charis SIL", "Fira Mono", "Lato CR"],
    fonts_he = ["@Hebrew", "Alef", "Ezra SIL", "MendelSiddurMW"],
    fonts_ch = ["@Chinese", "cwTeXHei", "cwTeXKai", "cwTeXMing", "cwTeXYen", "Noto Sans SC", "Noto Serif SC"],
    fonts_vi = ["@Vietnamese", "Han Nom Gothic"];
    FONTS = [];

 // fonts_en.sort();
 // FONTS = fonts_ko.concat(fonts_en);

for(i=0; i<UFONTS.length; i++){
    var fonts = eval('fonts_'+UFONTS[i]);
    FONTS = arrayUnique(fonts.concat(FONTS));
}

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}