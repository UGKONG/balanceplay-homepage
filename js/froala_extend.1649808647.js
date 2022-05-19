if(typeof $.FroalaEditor == 'undefined') $.FroalaEditor = FroalaEditor;
var isReplace,upTYPE;
// $.FroalaEditor.ICON_TEMPLATES = {
//   font_awesome: '<i class="fa fa-[NAME]"></i>',
//   text: '<span style="text-align: center;">[NAME]</span>',
//   image: '<img src=[SRC] alt=[ALT] />'
// }
$.FroalaEditor.RegisterShortcut(66, 'font-bold', 'weight', 'B', false);
$.FroalaEditor.CODE_ENTER = ['P', 'DIV', 'BR'];
$.FroalaEditor.FAV_FONTS_COUNT = 5;
$.FroalaEditor.FAV_COLORS_COUNT = 7;
$.FroalaEditor.ICON_TEMPLATES['custom'] = '[NAME]';
$.FroalaEditor.DEFAULTS.tableEditButtons = ['tableHeader', 'tableRemove', 'tableRows', 'tableColumns', 'tableStyle', 'tableCells', 'tableCellColor', 'tableCellVerticalAlign', 'tableCellHorizontalAlign', 'tableCellStyle'];
$.FroalaEditor.DEFAULTS.key = 'cJC7bB4B3B2G2F2D2B2zPAENHMi1JPQRFZBTBa1WWEPYDbA2B6C4D4F4C2B2C3G2D2==';
  /* 3.x & 4.x : cJC7bB4B3B2G2F2D2B2zPAENHMi1JPQRFZBTBa1WWEPYDbA2B6C4D4F4C2B2C3G2D2==  */
  /* >= 2.8.0 : cB7B7C6C5C2C2C1C-7J2A4D4A3C6D2B1F4G1I2rD1Ua1Mf1e1VSYKa1EPYD==  */
  /* < 2.8.0 : cSXSE1LHAFJVCXCLS==  */

$.FroalaEditor.ICONS['align-left'] = {'NAME' : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M3 11h12v2H3z"/><path d="M3 17h6v2H3z"/></svg>', template: 'custom'};
$.FroalaEditor.ICONS['align-center'] = {'NAME' : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M6 11h12v2H6z"/><path d="M9 17h6v2H9z"/></svg>', template: 'custom'};
$.FroalaEditor.ICONS['align-right'] = {'NAME' : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M9 11h12v2H9z"/><path d="M15 17h6v2h-6z"/></svg>', template: 'custom'};
$.FroalaEditor.ICONS['align-justify'] = {'NAME' : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M3 11h18v2H3z"/><path d="M3 17h18v2H3z"/></svg>', template: 'custom'};
$.FroalaEditor.COMMANDS.tableCellHorizontalAlign.options = {'left': 'Align Left', 'center' : 'Align Center', 'right' : 'Align Right'};
$.FroalaEditor.COMMANDS.align.options = {'left': 'Align Left','center' : 'Align Center','right' : 'Align Right'};
$.FroalaEditor.COMMANDS.videoDisplay.focus = false;
$.FroalaEditor.COMMANDS.imageDisplay.focus = false;
$.FroalaEditor.COMMANDS.imageStyle.focus = false;
$.FroalaEditor.COMMANDS.linkRemove.focus = false;

/* 에디터 툴바 타이틀 다국어 처리 */  
$.FroalaEditor.LANGUAGE['en'] = {
    translation: {
        'Save' : 'Save',
        'Apply' : 'Apply',
        'Remove' : 'Remove',
        'Align Left': 'Align Left',
        'Align Center': 'Align Center',
        'Align Right': 'Align Right',
        'Decrease Indent': "Decrease Indent",
        'Increase Indent': "Increase Indent",
        'None' : 'None',
        'Extra Bold' : 'Extra Bold',
        'Bold' : 'Bold',
        'Normal' : 'Normal',
        'Light' : 'Light',
        'Extra Light': 'Extra Light',
        'Cell Border': 'Border',
        'Cell Background': 'Background',
        'Text Color': 'Text Color',
        'Text color': 'Text Color',
        'Background Color': 'Background',
        'Cell color': 'Color',
        'Replace image' : 'Replace image',
        'Replace video' : 'Replace video',
        'Border Width': 'Line Width',
        'Initial' : 'Initialize',
        'Transparency' : 'Transparency',
        'Rounded' : 'Rounded',
        'Bordered' : 'Bordered',
        'Shadow' : 'Shadow',
        'Line Height' : 'Line Spacing',
        'indent/outdent' : 'Indent',
        'Link Setting' : 'Link',
        /* 버튼 커스텀 */
        'Button Radius' : 'Button Radius',
        'Button Border Color' : 'Line',
        'Button Background Color' : 'Background',
        'Text Hover Color' : 'Text Hover Color',
        'Button Border Color Hover': 'Hover Color',
        'Button Background Color Hover': 'BG Hover Color',
        'Insert Button' : 'Insert Button',
        'Insert column before' : 'Insert column left',
        'Insert column after' : 'Insert column right',
        'Button Border Width' : 'Line Width',
        'Button LR Padding' : 'Left & Right Padding',
        'Button TB Padding' : 'Top & Bottom Padding',
        'Button Padding H' : 'Button Padding (Horizontal)',
        'Button Padding V' : 'Button Padding (Vertical)',
        /* 버튼 커스텀 */

        /* 테이블 */
        'Row' : 'Row',
        'Column' : 'Column',
        'Select Style' : 'Style',
        'Customize' : 'Customize',
        'Line style' : 'Line style',
        'Line width' : 'Line width',
        'Line color' : 'Line color',
        'Background color' : 'Background color',
        'Table Cancel' : 'Cancel',
        'Table Insert' : 'Submit',
        'Table Border' : 'Table Border',
        /* 테이블 */
 
        /* 구분선 */
        'Remove HR' : 'Remove',
        'HR Align' : 'Alignment',
        /* 구분선 */
    }
}
$.FroalaEditor.LANGUAGE['ko'] = 
{
    translation: {
      // Custom Item
        'Font Weight' : '글자 굵기',
        'Letter Spacing' : '자간',
        'Replace image' : '이미지 교체',
        'Replace video' : '동영상 교체',
        'indent/outdent' : '들여쓰기 / 내어쓰기',
        // Place holder
        'Type something': '입력하세요.',
        // Missing translations
        'Save' : '저장',
        'Apply' : '적용',
        'More Text': 'More Text',
        'Text Color': '텍스트',
        'Text color': '글자 컬러',
        'Background Color': '배경',
        'Background color': '배경컬러',
        'Inline Class': 'Inline Class',
        'Default': '기본값',
        'Decimal': '숫자',
        'Lower Alpha': '알파벳 소문자',
        'Lower Greek': '그리스어',
        'Lower Roman': '로마 소문자',
        'Upper Alpha': '알파벳 대문자',
        'Upper Roman': '로마 대문자',
        'Circle': '원형',
        'Disc': '채워진 원형',
        'Square': '사각형',
        'Triangle': '삼각형',
        'Single': 'Single',
        'Double': 'Double',
        'More Rich': 'More Rich',
        'More Misc': 'More Misc',
        'Download PDF': 'Download PDF',
        // Basic formatting
        'Bold': '굵게',
        'Extra Bold' : '매우 굵게',
        'Normal' : '보통',
        'Light' : '가늘게',
        'Extra Light' : '매우 가늘게',
        'Italic': '기울임',
        'Underline': '밑줄',
        'Strikethrough': '취소선',
        // Main buttons
        'Insert': '삽입',
        'Delete': '삭제',
        'Cancel': '취소',
        'OK': '확인',
        'Back': '뒤로',
        'Remove': '제거',
        'More': '더 보기',
        'Update': '갱신',
        'Style': '스타일',
        // Font
        'Font Family': '글꼴',
        'Font Size': '글자 크기',
        // Colors
        'Colors': '컬러',
        'Background': '배경',
        'Text': 'Text',
        'HEX Color': 'HEX Color',
        // Paragraphs
        'Paragraph Format': '문단 형식',
        'Normal': '보통',
        'Code': "Code",
        'Heading 1': '글머리 1',
        'Heading 2': '글머리 2',
        'Heading 3': '글머리 3',
        'Heading 4': '글머리 4',
        'Line Height': '행 높이',
        // Style
        'Paragraph Style': '문단 모양',
        'Inline Style': 'Inline Style',
        // Alignment
        'Align': '정렬',
        'Align Left': '왼쪽',
        'Align Center': '가운데',
        'Align Right': '오른쪽',
        'Align Justify': '양쪽',
        'None': '없음',
        // Lists
        'Ordered List': '글머리 기호',
        'Unordered List': '비순차 목록',
        // Indent
        'Decrease Indent': "내어쓰기",
        'Increase Indent': "들여쓰기",
        // Links
        'Insert Link': '링크 삽입',
        'Open in new tab': '새 창으로 열기',
        'Open Link': '링크 열기',
        'Edit Link': '링크 수정',
        'Unlink': '링크 삭제',
        'Choose Link': '링크 선택',
        // Images
        'Replace Image': '이미지 교체',
        'Insert Image': '이미지 삽입',
        'Upload Image': '이미지 첨부',
        'By URL': 'URL 삽입',
        'Browse': '찾아보기',
        'Drop image': 'Drop image',
        'or click': 'or click',
        'Manage Images': 'Manage Images',
        'Loading': 'Loading',
        'Deleting': 'Deleting',
        'Tags': 'Tags',
        'Are you sure? Image will be deleted.': 'Are you sure? Image will be deleted.',
        'Replace': '교체',
        'Uploading': 'Uploading',
        'Loading image': 'Loading image',
        'Display': '배치',
        'Inline': '어울림',
        'Break Text': '자리 차지',
        'Alternative Text': 'Alternative Text',
        'Change Size': "크기 변경",
        'Width': '너비',
        'Height': '높이',
        'Something went wrong. Please try again.': '잘못된 값이 있습니다. 다시 시도해 주세요.',
        'Image Caption': '이미지 캡션',
        'Advanced Edit': 'Advanced Edit',
        // Video
        'Insert Video': '동영상 삽입',
        'Embedded Code': "임베디드 코드",
        'Paste in a video URL': 'URL로 동영상 붙여넣기',
        'Drop video': 'Drop video',
        'Your browser does not support HTML5 video.': 'Your browser does not support HTML5 video.',
        'Upload Video': 'Upload Video',
        // Tables
        'Insert Table': '표 삽입',
        'Table Header': '표 머리글',
        'Remove Table': '표 삭제',
        'Table Style': '표 모양',
        'Horizontal Align': '수평 정렬',
        'Row': '행',
        'Insert row above': '위에 행 삽입',
        'Insert row below': '아래에 행 삽입',
        'Delete row': '행 삭제',
        'Column': '열',
        'Insert column before': '왼쪽에 열 삽입',
        'Insert column after': '오른쪽에 열 삽입',
        'Delete column': '열 삭제',
        'Cell': '셀',
        'Merge cells': '셀 병합',
        'Horizontal split': '수평 분할',
        'Vertical split': '수직 분할',
        'Cell Border': '선',
        'Cell Background': '배경',
        'Border Width': '선 굵기',
        'Vertical Align': '세로 정렬',
        'Top': '위',
        'Middle': '가운데',
        'Bottom': '아래',
        'Align Top': '위 정렬',
        'Align Middle': '가운데 정렬',
        'Align Bottom': '아래 정렬',
        'Cell Style': '셀 모양',
        'Border Style' : '선 모양',
        'Solid' : '실선',
        'Dashed' : '짧은 선',
        'Dotted' : '점선',
        'Double' : '이중선',
        // Files
        'Upload File': 'Upload File',
        'Drop file': 'Drop file',
        // Emoticons
        'Emoticons': 'Emoticons',
        'Grinning face': 'Grinning face',
        'Grinning face with smiling eyes': 'Grinning face with smiling eyes',
        'Face with tears of joy': 'Face with tears of joy',
        'Smiling face with open mouth': 'Smiling face with open mouth',
        'Smiling face with open mouth and smiling eyes': 'Smiling face with open mouth and smiling eyes',
        'Smiling face with open mouth and cold sweat': 'Smiling face with open mouth and cold sweat',
        'Smiling face with open mouth and tightly-closed eyes': 'Cara sonriente con la boca abierta y los ojos fuertemente cerrados',
        'Smiling face with halo': 'Cara sonriente con halo',
        'Smiling face with horns': 'Cara sonriente con cuernos',
        'Winking face': "Gui\xF1o de la cara",
        'Smiling face with smiling eyes': 'Cara sonriente con ojos sonrientes',
        'Face savoring delicious food': 'Cara de saborear una deliciosa comida',
        'Relieved face': 'Cara Aliviado',
        'Smiling face with heart-shaped eyes': "Cara sonriente con los ojos en forma de coraz\xF3n",
        'Smiling face with sunglasses': 'Cara sonriente con gafas de sol',
        'Smirking face': 'Sonriendo cara',
        'Neutral face': 'Cara neutral',
        'Expressionless face': 'Rostro inexpresivo',
        'Unamused face': 'Cara aburrida',
        'Face with cold sweat': "Cara con sudor fr\xEDo",
        'Pensive face': 'Rostro pensativo',
        'Confused face': 'Cara confusa',
        'Confounded face': 'Cara aturdida',
        'Kissing face': 'Cara besando',
        'Face throwing a kiss': 'Cara lanzando un beso',
        'Kissing face with smiling eyes': 'Cara besando con ojos sonrientes',
        'Kissing face with closed eyes': 'Cara besando con los ojos cerrados',
        'Face with stuck out tongue': 'Cara con la lengua pegada',
        'Face with stuck out tongue and winking eye': 'Cara con la lengua pegada y el ojo parpadeante',
        'Face with stuck out tongue and tightly-closed eyes': 'Cara con la lengua pegada y los ojos fuertemente cerrados',
        'Disappointed face': 'Cara de decepcionado',
        'Worried face': "Cara de preocupaci\xF3n",
        'Angry face': 'Cara enojada',
        'Pouting face': 'Que pone mala cara',
        'Crying face': 'Cara llorando',
        'Persevering face': 'Cara de perseverancia',
        'Face with look of triumph': "Cara con expresi\xF3n de triunfo",
        'Disappointed but relieved face': 'Decepcionado pero el rostro aliviado',
        'Frowning face with open mouth': "Cara con la boca abierta con el ce\xF1o fruncido",
        'Anguished face': 'Rostro angustiado',
        'Fearful face': 'Cara temerosa',
        'Weary face': 'Rostro cansado',
        'Sleepy face': 'Rostro somnoliento',
        'Tired face': 'Rostro cansado',
        'Grimacing face': 'Cara haciendo una mueca',
        'Loudly crying face': 'Cara llorando en voz alta',
        'Face with open mouth': 'Cara con la boca abierta',
        'Hushed face': 'Cara callada',
        'Face with open mouth and cold sweat': 'Cara con la boca abierta y el sudor frío',
        'Face screaming in fear': 'Cara gritando de miedo',
        'Astonished face': 'Cara asombrosa',
        'Flushed face': 'Cara enrojecida',
        'Sleeping face': 'Rostro dormido',
        'Dizzy face': 'Cara mareada',
        'Face without mouth': 'Face without mouth',
        'Face with medical mask': 'Face with medical mask',
        // Line breaker
        'Break': '줄바꿈',
        // Math
        'Subscript': 'Subscript',
        'Superscript': 'Superscript',
        // Full screen
        'Fullscreen': 'Pantalla completa',
        // Horizontal line
        'Insert Horizontal Line': '구분선 삽입',
        // Clear formatting
        'Clear Formatting': '스타일 모두 제거',
        // Undo, redo
        'Undo': '되돌리기',
        'Redo': '다시 실행',
        // Select all
        'Select All': '전체 선택',
        // Code view
        'Code View': 'Code View',
        // Quote
        'Quote': 'Cita',
        'Increase': '증가',
        'Decrease': '감소',
        // Quick Insert
        'Quick Insert': '빠른 삽입',
        // Spcial Characters
        'Special Characters': 'Special Characters',
        'Latin': 'Latin',
        'Greek': 'Greek',
        'Cyrillic': 'Cyrillic',
        'Punctuation': 'Punctuation',
        'Currency': 'Currency',
        'Arrows': 'Arrows',
        'Math': 'Math',
        'Misc': 'Misc',
        // Print.
        'Print': 'Print',
        // Spell Checker.
        'Spell Checker': 'Spell Checker',
        // Help
        'Help': 'Help',
        'Shortcuts': 'Shortcuts',
        'Inline Editor': 'Inline Editor',
        'Show the editor': 'Show the editor',
        'Common actions': 'Common actions',
        'Copy': '복사',
        'Cut': '잘라내기',
        'Paste': 'Paste',
        'Basic Formatting': 'Basic Formatting',
        'Increase quote level': 'Increase quote level',
        'Decrease quote level': 'Decrease quote level',
        'Image / Video': 'Image / Video',
        'Resize larger': 'Resize larger',
        'Resize smaller': 'Resize smaller',
        'Table': 'Table',
        'Select table cell': 'Select table cell',
        'Extend selection one cell': 'Extend selection one cell',
        'Extend selection one row': 'Extend selection one row',
        'Navigation': 'Navigation',
        'Focus popup / toolbar': 'Focus popup / toolbar',
        'Return focus to previous position': 'Return focus to previous position',
        // Embed.ly
        'Embed URL': 'Embed URL',
        'Paste in a URL to embed': 'Paste in a URL to embed',
        // Word Paste.
        'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?': 'The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?',
        'Keep': 'Keep',
        'Clean': 'Clean',
        'Word Paste Detected': 'Word Paste Detected',
        'Cell color' : '컬러',
        'Enter' : '엔터',
        'Link' : '링크',
        'Link Setting' : '링크 설정',
        'Initial' : '초기화',
        'Transparency' : '투명',
        'Rounded' : '둥근 모서리',
        'Bordered' : '테두리',
        'Shadow' : '그림자',

        /* 버튼 커스텀 */
        'Button Color' : '버튼 컬러',
        'Button Align' : '버튼 정렬',
        'Button Padding V' : '버튼 여백 (세로)',
        'Button Padding H' : '버튼 여백 (가로)',
        'Copy Button' : '버튼 복제',
        'Remove Button' : '버튼 삭제',
        'Button Radius' : '버튼 외곽 곡선',
        'Button Border Color' : '선',
        'Button Background Color' : '배경',
        'Text Hover Color': '롤오버',
        'Button Border Color Hover': '롤오버 선',
        'Button Background Color Hover': '롤오버 배경',
        'Insert Button': '버튼 삽입',
        'Button Border Width' : '선 굵기',
        'Button LR Padding' : '좌우 여백',
        'Button TB Padding' : '상하 여백',
        /* 버튼 커스텀 */

        /* 테이블 */
        'Row' : '행',
        'Column' : '열',
        'Select Style' : '스타일 선택',
        'Customize' : '직접 꾸미기',
        'Line style' : '선 스타일',
        'Line width' : '선 굵기',
        'Line color' : '선 컬러',
        'Background color' : '배경컬러',
        'Table Cancel' : '취소',
        'Table Insert' : '삽입',
        'Table Border' : '선',
        /* 테이블 */

        /* 구분선 */
        'Insert HR' : '구분선 삽입',
        'Insert File' : '파일첨부',
        'Remove HR' : '구분선 제거',
        'Margin' : '여백',
        'HR Align' : '선 정렬',
        'Line Color' : '선 컬러',
        /* 구분선 */
    }
};

$.FroalaEditor.FONTS_WEIGHTS = {
    'KoPub Batang' : [300,400,700],
    'Black Han Sans' : [400,700],
    'Gmarket Sans' : [400,700],
    'Godo' : [400,700],
    'Kukdetopokki' : [400,700],
    'Nanum Gothic' : [400,700],
    'Nanum Gothic Coding' : [400,700],
    // 'Nanum Myeongjo' : [400,600,700],
    'Nanum Myeongjo' : [400,700,800],
    'Nanum Barun Gothic' : [100,400,700],
    'Nanum Pen Script' : [400,700],
    'Nanum Barun Pen' : [400,700],
    'Nanum Brush Script' : [400,700],
    'Nanum Square' : [400,700],
    'Nanum Square Round' : [400,700],
    'Daraehand' : [400,700],
    'Dohyeon' : [400,700],
    'Monsori' : [400],
    // 'Noto Sans KR' : [100,300,400,500,700,900],
    'Noto Sans KR' : [100,300,400,700,900],
    'Noto Serif CJK KR' : [400,700],
    'BB Tree Gothic' : [400,700],
    'BB Tree Namu' : [400,700],
    'BB Tree Hand' : [400,700],
    'SangSangTitle' : [400,700],
    'Seoul Namsan' : [400,700],
    'Seoul Hangang' : [400,700],
    'Spoqa Han Sans' : [400,700],
    'S CoreDream' : [400,700],
    'Yeonsung' : [400,700],
    'Oseong and HanEum' : [400,700],
    'Iropke Batang' : [400,700],
    'Jalnan' : [400],
    'Jeju Gothic' : [400,700],
    'Jeju Myeongjo' : [400,700],
    'Jeju Hallasan' : [400,700],
    'Jua' : [400,700],
    'Youth' : [400,700],
    'Hangyule' : [400,700],
    'Hanna' : [400,700],
    'Abel' : [400,700],
    'Abril Fatface' : [400,700],
    'Alegreya' : [400,700],
    'Aliquam' : [400,700],
    'Arial' : [400,700],
    'Cardo' : [400,700],
    'Cookie' : [400,700],
    'Dancing Script' : [400,700],
    'Dosis' : [400,700],
    'Droid Sans' : [400,700],
    'Droid Serif' : [400,700],
    'Fredoka One' : [400,700],
    'Georgia' : [400,700],
    'Great Vibes' : [400,700],
    'Ibarra Real Nova' : [400,700],
    'Inter' : [400,700],
    'Lato' : [400,700],
    'Libre Baskerville' : [400,700],
    'Lora' : [400,700],
    'Montserrat' : [400,600,800,900],
    'Muli' : [400,700],
    'Nixie One' : [400,700],
    'Noto Sans' : [400,700],
    'Open sans' : [400,700],
    'Oswald' : [400,700],
    'Playball' : [400,700],
    'Playfair Display' : [400,700],
    'Poppins' : [400,700],
    'PT Sans' : [400,700],
    'PT Serif' : [400,700],
    'Questrial' : [400,700],
    'Quicksand' : [400,700],
    'Raleway' : [400,700],
    'Roboto' : [400,700],
    'Spartan' : [400,700],
    'Staatliches' : [400,700],
    'Stalemate' : [400,700],
    'Times New Roman' : [400,700],
    'Trench' : [400,700],
}

/* 에디터 아이콘 재정의 */
$.FroalaEditor.DefineIcon('textColor', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 4s-5 8.24-5 11 2.24 5 5 5 5-2.24 5-5-5-11-5-11z"/></svg>', 'template': 'custom'});
// $.FroalaEditor.DefineIcon('backgroundColor', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g><path d="M10 7.05c-.38 1.38-.72 2.84-1.12 4.16l-.39 1.42h3.01l-.39-1.42c-.39-1.32-.74-2.78-1.11-4.16z" fill="#000000"/><path d="M20.7 18.5c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5 3.5-8.5 3.5-8.5 3.5 6.57 3.5 8.5z" fill="#333"/><path d="M12.2 18.5c0-.52.17-1.24.43-2.05l-.49-1.79H7.85L6.93 18H4.3L8.46 5h3.07l2.54 7.92c.71-1.54 1.44-2.94 1.81-3.63l.32-.61V4H3.3v15h8.95c-.02-.17-.05-.33-.05-.5z" fill="#000000"/></g></svg>', 'template': 'custom'});
$.FroalaEditor.DefineIcon('bold', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M7 5h4.45c2.76 0 4.86.77 4.86 3.2 0 1.19-.69 2.42-1.83 2.81v.09c1.45.33 2.52 1.32 2.52 3.07 0 2.62-2.25 3.83-5.21 3.83H7V5zm4.25 5.29c1.71 0 2.45-.67 2.45-1.7 0-1.14-.8-1.6-2.41-1.6h-1.6v3.3h1.56zm.31 5.71c1.83 0 2.83-.63 2.83-1.98 0-1.27-.98-1.79-2.83-1.79H9.69V16h1.87z" fill="#black"/></svg>', 'template' : 'custom'});
$.FroalaEditor.DefineIcon('font-weight', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M7 5h4.45c2.76 0 4.86.77 4.86 3.2 0 1.19-.69 2.42-1.83 2.81v.09c1.45.33 2.52 1.32 2.52 3.07 0 2.62-2.25 3.83-5.21 3.83H7V5zm4.25 5.29c1.71 0 2.45-.67 2.45-1.7 0-1.14-.8-1.6-2.41-1.6h-1.6v3.3h1.56zm.31 5.71c1.83 0 2.83-.63 2.83-1.98 0-1.27-.98-1.79-2.83-1.79H9.69V16h1.87z" fill="#black"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('italic', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="m7.98 18 .15-.76h.24c.41 0 .78-.08 1.11-.23.33-.15.55-.51.67-1.08L12.04 7c.05-.19.07-.36.07-.51 0-.32-.12-.52-.36-.6a3.06 3.06 0 0 0-.95-.13h-.24l.17-.76h5.3l-.16.76h-.24c-.41 0-.78.08-1.1.23-.32.15-.54.51-.66 1.08L11.96 16c-.05.19-.07.36-.07.51 0 .32.12.52.36.6.24.08.56.13.95.13h.24l-.17.76H7.98z" fill="#black"/></svg>', 'template' : 'custom'});
$.FroalaEditor.DefineIcon('underline', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g><path d="M7.06 12.29V5h2.09v7.43c0 2.88 1.19 3.82 2.85 3.82 1.68 0 2.9-.94 2.9-3.82V5h2.02v7.29c0 4.17-1.98 5.71-4.92 5.71s-4.94-1.54-4.94-5.71z" fill="#black"/><path d="M5 20h14v1H5z" fill="#333"/></g></svg>', 'template': 'custom'});
$.FroalaEditor.DefineIcon('strikeThrough', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M21 11.94h-6.57a6.6 6.6 0 0 0-.9-.52l-1.67-.79c-.99-.44-1.96-.88-1.96-2.03 0-1.08.81-1.74 2.05-1.74 1.07 0 1.91.46 2.67 1.21l1.01-1.36C14.7 5.66 13.36 5 11.94 5 9.63 5 7.95 6.6 7.95 8.72c0 1.63.9 2.61 1.88 3.22H3V13h8.96l.15.07c1.12.55 1.95.94 1.95 2.17 0 1.14-.83 1.91-2.29 1.91-1.17 0-2.36-.62-3.23-1.6l-1.12 1.47A5.7 5.7 0 0 0 11.73 19c2.66 0 4.27-1.76 4.27-3.93 0-.86-.21-1.53-.55-2.07H21v-1.06z"/></svg>', 'template': 'custom'});
$.FroalaEditor.DefineIcon('letter-spacing', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3.46 11.66c0 1.54 1.07 2.53 2.58 2.53 1.05 0 1.99-.53 2.79-1.21h.05l.16 1h1.5V8.71c0-2.33-1-3.71-3.19-3.71-1.4 0-2.63.57-3.54 1.15l.69 1.24c.75-.48 1.61-.89 2.53-.89 1.29 0 1.66.89 1.67 1.91-3.64.4-5.24 1.37-5.24 3.25zM8.7 9.57v2.15c-.72.65-1.34 1.02-2.1 1.02-.78 0-1.37-.35-1.37-1.21 0-.98.88-1.64 3.47-1.96z"/><path d="M14.81 13.14h.05c.71.68 1.54 1.05 2.29 1.05 1.87 0 3.57-1.63 3.57-4.47 0-2.54-1.19-4.22-3.28-4.22-.87 0-1.76.47-2.47 1.08l.03-1.4V2h-1.72v12h1.35l.18-.86zM15 7.96c.69-.68 1.33-1.01 1.97-1.01 1.38 0 1.94 1.07 1.94 2.8 0 1.94-.9 3.01-2.11 3.01-.51 0-1.17-.2-1.81-.75V7.96z"/><path d="M18.5 19.75 20 18.5l-1.5-1.25L17 16v2H7v-2l-1.5 1.25L4 18.5l1.5 1.25L7 21v-2h10v2z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('lineHeight', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M10 5h11v2H10z"/><path d="M10 11h11v2H10z"/><path d="M10 17h11v2H10z"/><path d="M8 8 6.75 6.5 5.5 5 4.25 6.5 3 8h2v8H3l1.25 1.5L5.5 19l1.25-1.5L8 16H6V8z"/></svg>', 'template': 'custom'});
$.FroalaEditor.DefineIcon('align', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M3 11h12v2H3z"/><path d="M3 17h6v2H3z"/></svg>', 'template': 'custom'});
$.FroalaEditor.DefineIcon('insertLink', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M9.34 17.84c-.88.88-2.3.88-3.18 0-.88-.88-.88-2.31 0-3.18l3.18-3.18c.88-.88 2.3-.88 3.18 0l1.06-1.06a3.754 3.754 0 0 0-5.3 0L5.1 13.6a3.754 3.754 0 0 0 0 5.3 3.754 3.754 0 0 0 5.3 0l1.59-1.59-1.06-1.06-1.59 1.59z"/><path d="M18.9 5.1a3.754 3.754 0 0 0-5.3 0l-1.59 1.59 1.06 1.06 1.59-1.59c.88-.88 2.3-.88 3.18 0 .88.88.88 2.3 0 3.18l-3.18 3.18c-.88.88-2.3.88-3.18 0l-1.06 1.06a3.754 3.754 0 0 0 5.3 0l3.18-3.18a3.736 3.736 0 0 0 0-5.3z"/></svg>', 'template': 'custom'});
$.FroalaEditor.DefineIcon('inoutdent', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g><path d="M5 5h15v2H5z" fill="#333"/><path d="M5 17h15v2H5z" fill="#333"/><path d="M13 9h7v2h-7z" fill="#333"/><path d="M13 13h7v2h-7z" fill="#333"/><path d="m10 12-1.5 1.5L7 15V9l1.5 1.5z" fill="#333"/><path d="m2 12 1.5-1.5L5 9v6l-1.5-1.5z" fill="#333"/></g></svg>', 'template': 'custom'});
$.FroalaEditor.DefineIcon('outdent', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g><path d="M4 5h16v2H4z" fill="#333"/><path d="M4 17h16v2H4z" fill="#333"/><path d="M9 9h11v2H9z" fill="#333"/><path d="M9 13h11v2H9z" fill="#333"/><path d="m4 12 1.5-1.5L7 9v6l-1.5-1.5z" fill="#333"/></g></svg>', 'template': 'custom'});
$.FroalaEditor.DefineIcon('customFormatUOL', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h2v2H3z"/><path d="M7 5h14v2H7z"/><path d="M3 11h2v2H3z"/><path d="M7 11h14v2H7z"/><path d="M3 17h2v2H3z"/><path d="M7 17h14v2H7z"/></svg>', template:'custom'});
// $.FroalaEditor.DefineIcon('')
$.FroalaEditor.DefineIcon('imageRemove', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M19 7h-3V4H8v3H5v1.5h1V17c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3V8.5h1V7zM9.5 5.5h5V7h-5V5.5zm7 11.5c0 .83-.67 1.5-1.5 1.5H9c-.83 0-1.5-.67-1.5-1.5V8.5h9V17z"/><path d="M9.5 10H11v7H9.5z"/><path d="M13 10h1.5v7H13z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('customInsertMyStorageImageIcon', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g><path d="M18 9.5c0 .83-.67 1.5-1.5 1.5S15 10.33 15 9.5 15.67 8 16.5 8s1.5.67 1.5 1.5z" fill="#black"/><path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c.36 0 .7-.1.99-.27.45-.26.79-.68.93-1.19.05-.18.08-.35.08-.54V7c0-1.1-.9-2-2-2zM4 17.5c-.28 0-.5-.22-.5-.5v-2.42l3.75-3.74c.1-.1.26-.1.36 0l5.56 5.54 2.55-2.54c.1-.1.26-.1.36 0l3.67 3.66H4zm13.14-4.72c-.68-.68-1.79-.68-2.48 0l-1.5 1.49-4.5-4.49c-.68-.68-1.8-.68-2.48 0L3.5 12.46V7c0-.28.22-.5.5-.5h16c.28 0 .5.22.5.5v9.12l-3.36-3.34z" fill="#black"/></g></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('image-replace', { NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g><path d="M18 9.5c0 .83-.67 1.5-1.5 1.5S15 10.33 15 9.5 15.67 8 16.5 8s1.5.67 1.5 1.5z" fill="#black"/><path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c.36 0 .7-.1.99-.27.45-.26.79-.68.93-1.19.05-.18.08-.35.08-.54V7c0-1.1-.9-2-2-2zM4 17.5c-.28 0-.5-.22-.5-.5v-2.42l3.75-3.74c.1-.1.26-.1.36 0l5.56 5.54 2.55-2.54c.1-.1.26-.1.36 0l3.67 3.66H4zm13.14-4.72c-.68-.68-1.79-.68-2.48 0l-1.5 1.49-4.5-4.49c-.68-.68-1.8-.68-2.48 0L3.5 12.46V7c0-.28.22-.5.5-.5h16c.28 0 .5.22.5.5v9.12l-3.36-3.34z" fill="#black"/></g></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('image-align-full', { SRC: 'https://storage.googleapis.com/i.addblock.net/icon/image-align-full.png', ALT: 'Image full width', template: 'image'});
$.FroalaEditor.DefineIcon('image-align-wide', { SRC: 'https://storage.googleapis.com/i.addblock.net/icon/image-align-wide.png', ALT: 'Image wide width', template: 'image'});
$.FroalaEditor.DefineIcon('image-align-original', { SRC: 'https://storage.googleapis.com/i.addblock.net/icon/image-align-original.png', ALT: 'Image wide original', template: 'image'});
$.FroalaEditor.DefineIcon('image-align-left-470', { SRC: 'https://storage.googleapis.com/i.addblock.net/icon/image-align-left-470.png', ALT: 'Image left width 470px', template: 'image'});
$.FroalaEditor.DefineIcon('image-align-right-470', { SRC: 'https://storage.googleapis.com/i.addblock.net/icon/image-align-right-470.png', ALT: 'Image right width 470px', template: 'image'});
// $.FroalaEditor.DefineIcon('image-align-left', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M3 11h12v2H3z"/><path d="M3 17h6v2H3z"/></svg>', template: 'custom'});
// $.FroalaEditor.DefineIcon('image-align-center', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M6 11h12v2H6z"/><path d="M9 17h6v2H9z"/></svg>', template: 'custom'});
// $.FroalaEditor.DefineIcon('image-align-right', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M9 11h12v2H9z"/><path d="M15 17h6v2h-6z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('editor-enter-icon', { NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17.25 5v7c0 1.24-1.01 2.25-2.25 2.25H9V11l-4 4 4 4v-3.25h6c2.07 0 3.75-1.68 3.75-3.75V5h-1.5z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('videoRemove', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M19 7h-3V4H8v3H5v1.5h1V17c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3V8.5h1V7zM9.5 5.5h5V7h-5V5.5zm7 11.5c0 .83-.67 1.5-1.5 1.5H9c-.83 0-1.5-.67-1.5-1.5V8.5h9V17z"/><path d="M9.5 10H11v7H9.5z"/><path d="M13 10h1.5v7H13z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('videoAlign', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M3 11h12v2H3z"/><path d="M3 17h6v2H3z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('video-align-left', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M3 11h12v2H3z"/><path d="M3 17h6v2H3z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('video-align-center', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M6 11h12v2H6z"/><path d="M9 17h6v2H9z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('video-align-right', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M9 11h12v2H9z"/><path d="M15 17h6v2h-6z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('videoDisplay', {NAME: '<svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3,5h18v2H3V5z M13,9h8v2h-8V9z M13,13h8v2h-8V13z M3,17h18v2H3V17z M3,9h8v6H3V9z"></path></svg>', template:'custom'});
$.FroalaEditor.DefineIcon('insertTable', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M20 5H4c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-5.9 1.5v2.72H9.9V6.5h4.2zm0 4.07v2.87H9.9v-2.87h4.2zM4.5 6.5h4.05v2.72H4.5V6.5zm0 4.07h4.05v2.87H4.5v-2.87zm0 6.93v-2.72h4.05v2.72H4.5zm5.4 0v-2.72h4.2v2.72H9.9zm9.6 0h-4.05v-2.72h4.05v2.72zm0-4.07h-4.05v-2.87h4.05v2.87zm-4.05-4.21V6.5h4.05v2.72h-4.05z" fill="#black"/></svg>', template: 'custom' });
$.FroalaEditor.DefineIcon('insertHR', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M5 11.07h14v1.87H5z" fill="#black"/></svg>', template: 'custom' });
$.FroalaEditor.DefineIcon('tableHeader', {template: 'custom', NAME:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M20 5H4c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zM4.5 10.67h4v2.67h-4v-2.67zm5.5 0h4v2.67h-4v-2.67zM4.5 17.5v-2.67h4v2.67h-4zm5.5 0v-2.67h4v2.67h-4zm9.5 0h-4v-2.67h4v2.67zm0-4.17h-4v-2.67h4v2.67zm-4-4.16h-11V6.5h15v2.67h-4z"/></svg>' });
$.FroalaEditor.DefineIcon('tableColumns', {NAME:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4.5 18V6c0-.28.22-.5.5-.5h2v13H5c-.28 0-.5-.22-.5-.5zm15 0c0 .28-.22.5-.5.5H8.5v-13H19c.28 0 .5.22.5.5v12z"/><path d="M14.75 9h-1.5v2.25H11v1.5h2.25V15h1.5v-2.25H17v-1.5h-2.25z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('tableRows', {NAME:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM5 5.5h14c.28 0 .5.22.5.5v2h-15V6c0-.28.22-.5.5-.5zm14 13H5c-.28 0-.5-.22-.5-.5V9.5h15V18c0 .28-.22.5-.5.5z"/><path d="M12.75 11h-1.5v2.25H9v1.5h2.25V17h1.5v-2.25H15v-1.5h-2.25z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('tableCells', {NAME:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 2v2.83h-4V5.5H19c.28 0 .5.22.5.5zM10 8.83V5.5h4v3.33h-4zm-1.5 4.84h-4v-3.33h4v3.33zm5.5 1.5v3.33h-4v-3.33h4zm1.5-4.84h4v3.33h-4v-3.33zM5 5.5h3.5v3.33h-4V6c0-.28.22-.5.5-.5zM4.5 18v-2.83h4v3.33H5c-.28 0-.5-.22-.5-.5zm14.5.5h-3.5v-3.33h4V18c0 .28-.22.5-.5.5z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('tableCellColor', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 4s-5 8.24-5 11 2.24 5 5 5 5-2.24 5-5-5-11-5-11z"/></svg>', template:'custom'});
// $.FroalaEditor.DefineIcon('tableCellBackgroundColor', {NAME:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17.5 4S14 9.57 14 11.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5S17.5 4 17.5 4z"/><path d="M12.5 11.5c0-1.34 1.06-3.61 2.09-5.5H4c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h13c.55 0 1-.45 1-1v-1.55c-.17.02-.33.05-.5.05-2.76 0-5-2.24-5-5z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('tableCellHorizontalAlign', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M3 11h12v2H3z"/><path d="M3 17h6v2H3z"/></svg>', template: 'custom' });
$.FroalaEditor.DefineIcon('tableCellVerticalAlign', {NAME:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 11h18v2H3z"/><path d="m12 10 4-4h-3.25V3h-1.5v3H8z"/><path d="m12 14-4 4h3.25v3h1.5v-3H16z"/></svg>', template: 'custom' });
$.FroalaEditor.DefineIcon('tableBorderWidth', {NAME:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v1H3z"/><path d="M3 10h18v2H3z"/><path d="M3 16h18v3H3z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('tableBorderStyle', {NAME:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h2v1H3z"/><path d="M3 11h18v1H3z"/><path d="M3 16h18v1H3z"/><path d="M3 18h18v1H3z"/><path d="M7 5h2v1H7z"/><path d="M11 5h2v1h-2z"/><path d="M15 5h2v1h-2z"/><path d="M19 5h2v1h-2z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('tableRemove', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M19 7h-3V4H8v3H5v1.5h1V17c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3V8.5h1V7zM9.5 5.5h5V7h-5V5.5zm7 11.5c0 .83-.67 1.5-1.5 1.5H9c-.83 0-1.5-.67-1.5-1.5V8.5h9V17z"/><path d="M9.5 10H11v7H9.5z"/><path d="M13 10h1.5v7H13z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('quickInsertImageIcon', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g><path d="M18 9.5c0 .83-.67 1.5-1.5 1.5S15 10.33 15 9.5 15.67 8 16.5 8s1.5.67 1.5 1.5z" fill="#black"/><path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c.36 0 .7-.1.99-.27.45-.26.79-.68.93-1.19.05-.18.08-.35.08-.54V7c0-1.1-.9-2-2-2zM4 17.5c-.28 0-.5-.22-.5-.5v-2.42l3.75-3.74c.1-.1.26-.1.36 0l5.56 5.54 2.55-2.54c.1-.1.26-.1.36 0l3.67 3.66H4zm13.14-4.72c-.68-.68-1.79-.68-2.48 0l-1.5 1.49-4.5-4.49c-.68-.68-1.8-.68-2.48 0L3.5 12.46V7c0-.28.22-.5.5-.5h16c.28 0 .5.22.5.5v9.12l-3.36-3.34z" fill="#black"/></g></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('quickInsertMyStorageImageIcon', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g><path d="M18 9.5c0 .83-.67 1.5-1.5 1.5S15 10.33 15 9.5 15.67 8 16.5 8s1.5.67 1.5 1.5z" fill="#black"/><path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c.36 0 .7-.1.99-.27.45-.26.79-.68.93-1.19.05-.18.08-.35.08-.54V7c0-1.1-.9-2-2-2zM4 17.5c-.28 0-.5-.22-.5-.5v-2.42l3.75-3.74c.1-.1.26-.1.36 0l5.56 5.54 2.55-2.54c.1-.1.26-.1.36 0l3.67 3.66H4zm13.14-4.72c-.68-.68-1.79-.68-2.48 0l-1.5 1.49-4.5-4.49c-.68-.68-1.8-.68-2.48 0L3.5 12.46V7c0-.28.22-.5.5-.5h16c.28 0 .5.22.5.5v9.12l-3.36-3.34z" fill="#black"/></g></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('quickInsertVideoIcon', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><g><path d="m14.76 12.4-4.16 2.45c-.31.19-.71-.05-.71-.42v-4.9c0-.37.39-.6.71-.42l4.16 2.45c.32.19.32.65 0 .84z" fill="#black"/><path d="M12 4.5c4.14 0 7.5 3.36 7.5 7.5s-3.36 7.5-7.5 7.5-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5M12 3a9 9 0 1 0 .001 18.001A9 9 0 0 0 12 3z" fill="#black"/></g></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('quickInsertFileIcon', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M5.85 21c-1.03 0-2-.4-2.73-1.12A3.798 3.798 0 0 1 2 17.18c0-1.02.4-1.98 1.13-2.7L13.21 4.5c.97-.97 2.26-1.5 3.64-1.5 1.38 0 2.67.53 3.64 1.49.98.97 1.51 2.25 1.51 3.61 0 1.36-.54 2.65-1.51 3.61l-8.15 8.07c-.29.29-.77.29-1.07 0a.754.754 0 0 1 0-1.06l8.15-8.07c1.42-1.41 1.43-3.7.01-5.11-1.42-1.41-3.73-1.4-5.16.01L4.2 15.53c-.92.91-.92 2.39 0 3.29s2.41.91 3.33 0l8.61-8.53c.41-.41.41-1.07 0-1.48a1.06 1.06 0 0 0-1.5 0l-6.78 6.71c-.29.29-.77.29-1.07 0a.754.754 0 0 1 0-1.06l6.78-6.71c.48-.48 1.13-.75 1.81-.75.69 0 1.33.26 1.81.74 1 .99 1 2.6 0 3.59l-8.61 8.53A3.77 3.77 0 0 1 5.85 21c.01 0 0 0 0 0z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('hrAlign', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M6 11h12v2H6z"/><path d="M9 17h6v2H9z"/></svg>', template: 'custom'})
$.FroalaEditor.DefineIcon('hrMargin', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M2 11h12v2H2z"/><path d="M18.75 8H22l-4-4-4 4h3.25v8H14l4 4 4-4h-3.25z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('hrRemove', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M19 7h-3V4H8v3H5v1.5h1V17c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3V8.5h1V7zM9.5 5.5h5V7h-5V5.5zm7 11.5c0 .83-.67 1.5-1.5 1.5H9c-.83 0-1.5-.67-1.5-1.5V8.5h9V17z"/><path d="M9.5 10H11v7H9.5z"/><path d="M13 10h1.5v7H13z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('insertCustomButton', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M20.5 5h-17c-1.66 0-3 1.34-3 3v4c0 1.66 1.34 3 3 3h6.84L10 17.93c-.03.27.28.44.49.27l1.87-1.48 1.13 3.1c.05.15.21.22.36.17l.79-.29c.15-.05.22-.21.17-.36l-1.13-3.1 2.39-.07c.27-.01.4-.34.2-.53l-2.44-2.31-2.53-2.4a.305.305 0 0 0-.51.19l-.27 2.38H3.5c-.83 0-1.5-.67-1.5-1.5V8c0-.83.67-1.5 1.5-1.5h17c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5h-4.31l1.58 1.5h2.73c1.66 0 3-1.34 3-3V8c0-1.66-1.34-3-3-3z" fill="#000000"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('copyCustomButton', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17 4h-7c-1.1 0-2 .9-2 2v1H7c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2v-1h1c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-2.5 14c0 .28-.22.5-.5.5H7c-.28 0-.5-.22-.5-.5V9c0-.28.22-.5.5-.5h1V15c0 1.1.9 2 2 2h4.5v1zm3-3c0 .28-.22.5-.5.5h-7c-.28 0-.5-.22-.5-.5V6c0-.28.22-.5.5-.5h7c.28 0 .5.22.5.5v9z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('settingCustomButton', {NAME: '<i class="fa fa-cog"></i>', template: 'custom'});
$.FroalaEditor.DefineIcon('customButtonColor', {NAME : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 4s-5 8.24-5 11 2.24 5 5 5 5-2.24 5-5-5-11-5-11z"/></svg>', template: 'custom'});
// $.FroalaEditor.DefineIcon('customButtonMargin', {NAME: 'margin', template: 'custom'});
$.FroalaEditor.DefineIcon('customButtonPaddingV', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .28-.22.5-.5.5H4c-.28 0-.5-.22-.5-.5V6c0-.28.22-.5.5-.5h16c.28 0 .5.22.5.5v12z"/><path d="m15 10-3-3-3 3h2.25v4H9l3 3 3-3h-2.25v-4z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('customButtonPaddingH', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .28-.22.5-.5.5H4c-.28 0-.5-.22-.5-.5V6c0-.28.22-.5.5-.5h16c.28 0 .5.22.5.5v12z"/><path d="M15 11.25H9V9l-3 3 3 3v-2.25h6V15l3-3-3-3z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('customButtonBorder', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v1H3z"/><path d="M3 10h18v2H3z"/><path d="M3 16h18v3H3z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('customButtonRadius', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M4 20h1.5C5.5 12 12 5.5 20 5.5V4C11.16 4 4 11.16 4 20z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('customButtonLink', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M9.34 17.84c-.88.88-2.3.88-3.18 0-.88-.88-.88-2.31 0-3.18l3.18-3.18c.88-.88 2.3-.88 3.18 0l1.06-1.06a3.754 3.754 0 0 0-5.3 0L5.1 13.6a3.754 3.754 0 0 0 0 5.3 3.754 3.754 0 0 0 5.3 0l1.59-1.59-1.06-1.06-1.59 1.59z"/><path d="M18.9 5.1a3.754 3.754 0 0 0-5.3 0l-1.59 1.59 1.06 1.06 1.59-1.59c.88-.88 2.3-.88 3.18 0 .88.88.88 2.3 0 3.18l-3.18 3.18c-.88.88-2.3.88-3.18 0l-1.06 1.06a3.754 3.754 0 0 0 5.3 0l3.18-3.18a3.736 3.736 0 0 0 0-5.3z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('customImageLink', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M9.34 17.84c-.88.88-2.3.88-3.18 0-.88-.88-.88-2.31 0-3.18l3.18-3.18c.88-.88 2.3-.88 3.18 0l1.06-1.06a3.754 3.754 0 0 0-5.3 0L5.1 13.6a3.754 3.754 0 0 0 0 5.3 3.754 3.754 0 0 0 5.3 0l1.59-1.59-1.06-1.06-1.59 1.59z"/><path d="M18.9 5.1a3.754 3.754 0 0 0-5.3 0l-1.59 1.59 1.06 1.06 1.59-1.59c.88-.88 2.3-.88 3.18 0 .88.88.88 2.3 0 3.18l-3.18 3.18c-.88.88-2.3.88-3.18 0l-1.06 1.06a3.754 3.754 0 0 0 5.3 0l3.18-3.18a3.736 3.736 0 0 0 0-5.3z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('imageLink', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M9.34 17.84c-.88.88-2.3.88-3.18 0-.88-.88-.88-2.31 0-3.18l3.18-3.18c.88-.88 2.3-.88 3.18 0l1.06-1.06a3.754 3.754 0 0 0-5.3 0L5.1 13.6a3.754 3.754 0 0 0 0 5.3 3.754 3.754 0 0 0 5.3 0l1.59-1.59-1.06-1.06-1.59 1.59z"/><path d="M18.9 5.1a3.754 3.754 0 0 0-5.3 0l-1.59 1.59 1.06 1.06 1.59-1.59c.88-.88 2.3-.88 3.18 0 .88.88.88 2.3 0 3.18l-3.18 3.18c-.88.88-2.3.88-3.18 0l-1.06 1.06a3.754 3.754 0 0 0 5.3 0l3.18-3.18a3.736 3.736 0 0 0 0-5.3z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('customButtonAlign', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M3 11h12v2H3z"/><path d="M3 17h6v2H3z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('customButtonLoadTemplate', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="m11 11 4-3.5L11 4v2.75H7c-1.66 0-3 1.34-3 3V15h1.5V9.75c0-.83.67-1.5 1.5-1.5h4V11z"/><path d="M18.5 9v5.25c0 .83-.67 1.5-1.5 1.5h-4V13l-4 3.5 4 3.5v-2.75h4c1.66 0 3-1.34 3-3V9h-1.5z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('customButtonSaveTemplate', {NAME: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M20.77 11.67c-.28-.43-.76-.67-1.33-.67H19V9c0-1.1-.9-2-2-2h-5.85c-.1 0-.2-.03-.28-.08L8.5 5.34C8.18 5.12 7.79 5 7.39 5H5c-1.1 0-2 .9-2 2v11.53c0 .29.08.56.23.8.28.43.76.67 1.33.67h11.51c.99 0 2.06-.73 2.5-1.69l2.25-5c.26-.59.24-1.19-.05-1.64zM4.5 7c0-.28.22-.5.5-.5h2.39c.1 0 .19.03.28.08l2.37 1.58c.33.22.71.34 1.11.34H17c.28 0 .5.22.5.5v2H7.93c-.99 0-2.06.73-2.5 1.69l-.93 2.08V7zm14.95 5.69-2.25 5c-.2.45-.77.81-1.13.81l-11.57.03s-.02-.07.05-.23l2.25-5c.2-.45.78-.8 1.13-.8l11.57-.03s.01.07-.05.22z"/></svg>', template: 'custom'});
$.FroalaEditor.DefineIcon('customButtonUnlink', {NAME: '<svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.4,11l1.6,1.6V11H14.4z M17,7h-4v1.9h4c1.7,0,3.1,1.4,3.1,3.1c0,1.3-0.8,2.4-1.9,2.8l1.4,1.4C21,15.4,22,13.8,22,12  C22,9.2,19.8,7,17,7z M2,4.3l3.1,3.1C3.3,8.1,2,9.9,2,12c0,2.8,2.2,5,5,5h4v-1.9H7c-1.7,0-3.1-1.4-3.1-3.1c0-1.6,1.2-2.9,2.8-3.1  L8.7,11H8v2h2.7l2.3,2.3V17h1.7l4,4l1.4-1.4L3.4,2.9L2,4.3z"></path></svg>', template: 'custom'});
/* 에디터 아이콘 재정의 */

$.FroalaEditor.RegisterCommand('textColor', {
    title: 'Text color',
    undo: true,
    focus: false,
    showOnMobile: true,
    refreshAfterCallback: false,
    callback: function () {
        var editor = this;
        if(editor.browser.safari) editor.selection.save();
        // $('.fr-toolbar.fr-inline').addClass('always');
        $('button[data-cmd="textColor"]').toggleClass('active');
        $('button[data-cmd="textColor"]').colpick({
            color:'#0088CC',
            layout : 'hex',
            extend : true,
            flat : isMobile() ? true : false,
            onSubmit: function (hsb, hex, rgb) {
                hex = hex.toUpperCase();
                restoreSelection(selRange);

                var oper = $(this.selector).closest('.colpick_hex.extend').find('.nav-pills [data-type].active').data('type');
                if(oper == 'text') {
                    editor.colors.text('#' + hex);
                } else if(oper == 'background') {
                    editor.colors.background('#' + hex);
                } else if(oper == 'buttonhovertext') {
                    var blockCSS = getStyleText();
                    var $button = editor.customInsertButton.get();
                    var btnCls = '';
                    var elName = selectEL;
                    var blockName = $('.' + selectEL).attr('data-name');
                    $($button[0].classList).each(function(idx, cls) {
                        if(cls.indexOf('fr-cst-btn-') > -1) btnCls = cls;
                    });

                    if(btnCls) {
                        if(!blockCSS.children.hasOwnProperty('.' + blockName + ' .' + btnCls + ':hover')) {
                            blockCSS.children['.' + blockName + ' .' + btnCls + ':hover'] = new Array();
                            blockCSS.children['.' + blockName + ' .' + btnCls + ':hover']['attributes'] = new Array();
                        }
                        if(!blockCSS.children.hasOwnProperty('.' + blockName + ' .' + btnCls + ':hover span')) {
                            blockCSS.children['.' + blockName + ' .' + btnCls + ':hover span'] = new Array();
                            blockCSS.children['.' + blockName + ' .' + btnCls + ':hover span']['attributes'] = new Array();
                        }
                        blockCSS.children['.' + blockName + ' .' + btnCls + ':hover']['attributes']['color'] = '#'+hex + ' !important';
                        blockCSS.children['.' + blockName + ' .' + btnCls + ':hover span']['attributes']['color'] = '#'+hex + ' !important';
                        $('#' + elName + 'css').html(CSSJSON.toCSS(blockCSS));
                        $('.' + selectEL).addClass('css-changed');
                    }
                }
                // $('.fr-toolbar.fr-inline').removeClass('always');
                $('button[data-cmd="textColor"]').removeClass('active').colpickHide();

                if(typeof SETTINGS.favcolor == 'undefined') SETTINGS.favcolor = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000'];
                if(hex && SETTINGS.favcolor.indexOf('#' +hex) == -1) {
                    if(MODE == 'c' || MODE == 'config') {
                        $.ajax({
                            url:'/config/setFavoriteColor',
                            type:'post',
                            data:{
                                'sid' : SID,
                                'color' : '#'+hex,
                            },
                            dataType:'json',
                            success:function() {
                                SETTINGS.favcolor.push('#'+hex);
                                if(SETTINGS.favcolor.length > $.FroalaEditor.FAV_COLORS_COUNT) {
                                    SETTINGS.favcolor.splice(0, SETTINGS.favcolor.length - $.FroalaEditor.FAV_COLORS_COUNT);
                                }
                            }
                        });
                    } else {
                        SETTINGS.favcolor.push('#'+hex);
                        if(SETTINGS.favcolor.length > $.FroalaEditor.FAV_COLORS_COUNT) {
                            SETTINGS.favcolor.splice(0, SETTINGS.favcolor.length - $.FroalaEditor.FAV_COLORS_COUNT);
                        }
                    }
                }
            },
            onHide: function(picker) {
                $(picker).removeClass('show-picker');
                $($(picker).data('colpick').el).removeClass('active');
            },
            onBeforeShow: function() {
                // restoreSelection(selRange);
                var $colpick_layer = $('#' + $(this).data('colpickId'));
                var hex = style.getHex($(editor.selection.element()).css('color'));

                $('button[data-cmd="textColor"]').colpickSetColor(hex.replace('#',''));

                $('.colpick_hex.extend .fav-row').remove();
                if(typeof SETTINGS.favcolor == 'undefined') SETTINGS.favcolor = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000'];
                var favcolor_html = '';
                if(SETTINGS.favcolor.length) {
                    var gap = $.FroalaEditor.FAV_COLORS_COUNT - SETTINGS.favcolor.length;
                    for(var i=0; i<gap; i++) {
                        if(i==0) {
                            SETTINGS.favcolor.unshift('#000000');
                        } else {
                            SETTINGS.favcolor.unshift('#FFFFFF');
                        }
                    }
                    var favcolor_arr = SETTINGS.favcolor.slice();
                    favcolor_arr.reverse();
                    $(favcolor_arr).each(function() {
                        favcolor_html += '<span class="colpick-select-color fav-select-color" style="background: ' + this + '" data-color="' + this + '"></span>';
                    });
                }
                if(favcolor_html) {
                    $('.colpick_hex.extend .col-ex-item.color-set').prepend('<div class="fav-row">' + favcolor_html + '</div>');
                }

                if(editor.opts.pluginsEnabled.indexOf('customInsertButton') > -1) {
                    if(editor.customInsertButton.get().length) {
                        console.log($colpick_layer.find('.nav-pills li[data-type="background"]'));
                        $colpick_layer.find('.nav-pills li[data-type="background"]').attr('data-type', 'buttonhovertext');
                    } else {
                        $colpick_layer.find('.nav-pills li[data-type="buttonhovertext"]').attr('data-type', 'background');
                    }
                } else {
                    $colpick_layer.find('.nav-pills li[data-type="buttonhovertext"]').attr('data-type', 'background');
                }
                $colpick_layer.find('.nav-pills [data-type="background"] a').text($.FroalaEditor.LANGUAGE[LANG].translation['Background Color']);
                $colpick_layer.find('.nav-pills [data-type="buttonhovertext"] a').text($.FroalaEditor.LANGUAGE[LANG].translation['Text Hover Color']);
            },
            onShow: function() {
                // console.log($colpick_layer)
                var $colpick_layer = $('#' + $(this).data('colpickId'));

                if(Number($colpick_layer.css('left').replace('px','')) < 0) {
                    $colpick_layer.css('left', '0');
                }

                if(!$('button[data-cmd="textColor"]').hasClass('active')) {
                    $colpick_layer.hide();
                    $colpick_layer.css('opacity', '0');
                    setTimeout(function() {
                        $colpick_layer.hide();
                        $colpick_layer.css('opacity', '1');
                    });
                }
                var $trigger = $('button[data-cmd="textColor"]');

                if(($trigger.offset().top + $trigger.outerHeight() + $colpick_layer.outerHeight()) > window.innerHeight) {
                    var top = $trigger.offset().top;
                    $colpick_layer.css('top',(Number(top)-201)+'px');
                }
            }
        });
        var $colpick_layer = $('#' + $('button[data-cmd="textColor"]').data('colpickId'));
        $colpick_layer.hide();
        $colpick_layer.find('.nav-pills [data-type="text"] a').text($.FroalaEditor.LANGUAGE[LANG].translation['Text Color']);
        $colpick_layer.find('.nav-pills [data-type="background"] a').text($.FroalaEditor.LANGUAGE[LANG].translation['Background Color']);
        $colpick_layer.find('.nav-pills [data-type="text-hover"] a').text($.FroalaEditor.LANGUAGE[LANG].translation['Text Hover Color']);
        $colpick_layer.find('.nav-pills li').removeClass('active');
        $colpick_layer.find('.nav-pills li:first').addClass('active');
        
        $colpick_layer.find('[data-color="REMOVE"]').attr('title', $.FroalaEditor.LANGUAGE[LANG].translation['Initial']);
    }
});

$.FroalaEditor.RegisterCommand('font-weight', {
    title: 'Font Weight',
    type: 'dropdown',
    undo: true,
    focus: true,
    showOnMobile: true,
    refreshAfterCallback: false,
    options: {
      'normal' : 'Default',
       '100p' : '100',
       '200p' : '200',
       '300p' : '300',
       '400p' : '400',
       '500p' : '500',
       '600p' : '600',
       '700p' : '700',
       '800p' : '800',
       '900p' : '900',
    },
    callback: function(cmd, val) {
        this.selection.save();
        val = val.replace(/p/g, '');
        if(this.format.is('strong')) this.format.remove('strong');
        if(this.format.is('b')) this.format.remove('b');
        this.format.applyStyle('font-weight', val);
    },
    refreshOnShow: function($btn, $dropdown) {
        var font_weight = $(this.selection.endElement()).css('font-weight');
        if(font_weight) {
            $($dropdown).find('[data-param1="' + font_weight + '"]').addClass('fr-active');
        }
    }
});


$.FroalaEditor.RegisterCommand('font-bold', {
    icon: 'font-weight',
    title: 'Font Bold',
    undo: true,
    focus: true,
    showOnMobile: true,
    refreshAfterCallback: false,
    callback: function(cmd, val) {
        var editor = this;
        if(cmd) {
            if(editor.selection.isCollapsed()) return false;
            if(editor.format.is('strong')) this.format.remove('strong');
            if(editor.format.is('b')) this.format.remove('b');
            if($(editor.selection.get().focusNode.parentElement).css('font-weight') != '700') {
                editor.format.applyStyle('font-weight', '700');
            } else {
                editor.format.applyStyle('font-weight', 'initial');
            }

            var flag = $(editor.selection.get().focusNode.parentElement).css('font-weight') == '700'
            $(editor.$tb).find('button[data-cmd="font-bold"]').toggleClass('active', flag);
        }
    },
    refresh:function() {
        var editor = this;
        if(editor.format.is('strong') || editor.format.is('b') || $(editor.selection.get().focusNode.parentElement).css('font-weight') == '700') {
            $(editor.$tb).find('button[data-cmd="font-bold"]').addClass('active');
        } else {
            $(editor.$tb).find('button[data-cmd="font-bold"]').removeClass('active');
        }
    }
});

$.FroalaEditor.RegisterCommand('letter-spacing', {
    title: 'Letter Spacing',
    type: 'dropdown',
    undo: true,
    focus: true,
    showOnMobile: true,
    refreshAfterCallback: false,
    options: {
       '-2px' : '-2',
       '-1px' : '-1',
       '0px' : '0',
       '1px' : '1',
       '2px' : '2',
       '3px' : '3',
       '4px' : '4',
       '5px' : '5',
       '6px' : '6',
       '7px' : '7',
       '8px' : '8',
       '9px' : '9',
       '10px' : '10'
    },
    callback: function(cmd, val) {
        this.selection.save();
        this.format.applyStyle('letter-spacing', val);
    },
    refresh: function() {
    },
    refreshOnShow: function($btn, $dropdown) {
        var letter_spacing = $(this.selection.endElement()).css('letter-spacing');
        if(letter_spacing) {
            // letter_spacing = letter_spacing.replace('px', '');
            if(letter_spacing == 0) letter_spacing = '0px';
            $($dropdown).find('[data-param1="' + letter_spacing + '"]').addClass('fr-active');
        }
    }
});

$.FroalaEditor.RegisterCommand('customInsertMyStorageImage', {
    icon: 'customInsertMyStorageImageIcon',
    title: 'Insert Image',
    callback: function() {
        if(this.image.get()) {
            this.replaceimage = this.image.get(); 
        } else {
            this.replaceimage = null;
            this.selection.save();
        }
        $('.resource-useit').attr('data-element', 'editor');
        $.resource.open();
    }
});


$.FroalaEditor.RegisterCommand('image-replace', {
  title: 'Replace image',
  // icon: 'image-replace',
  undo: true,
  focus: true,
  showOnMobile: true,
  // refreshAfterCallback: true,
  callback: function () {
      this.selection.save();
      isReplace = true;
      upTYPE = 'image';
      $('#file_type').val(upTYPE);
      $('#uploadFile').val('');
      $('#uploadFile').trigger('click');
  },
  refresh: function ($btn) { }
});


$.FroalaEditor.RegisterCommand('image-replace', {
  title: 'Replace image',
  // icon: 'image-replace',
  undo: true,
  focus: true,
  showOnMobile: true,
  // refreshAfterCallback: true,
  callback: function () {
      this.selection.save();
      isReplace = true;
      upTYPE = 'image';
      $('#file_type').val(upTYPE);
      $('#uploadFile').val('');
      $('#uploadFile').trigger('click');
  },
  refresh: function ($btn) { }
});

$.FroalaEditor.RegisterCommand('img-align-full', {
  title: 'Image full width',
  icon: 'image-align-full',
  undo: true,
  focus: true,
  showOnMobile: true,
  // refreshAfterCallback: true,
  callback: function () {
    $(this.image.get()).removeClass(function (index, css) {
      return (css.match (/f-align-(left|right|full|wide|original)(-470)*/g) || []).join(' ');
    }).addClass('f-align-full');
    setForumWrap();
    this.image.back();
    $('.fr-btn.fr-btn-image').removeClass('active');
    $('.fr-btn.fr-btn-image[data-cmd="img-align-full"]').addClass('active');
  },
  refresh: function ($btn) { 
    setImageToolbarPosition($btn,this.image.get());
    refreshImagebtn(this.image.get());
  }
});


$.FroalaEditor.RegisterCommand('img-align-wide', {
  title: 'Image wide width',
  icon: 'image-align-wide',
  undo: true,
  focus: true,
  showOnMobile: true,
  refreshAfterCallback: true,
  callback: function () {
    $(this.image.get()).removeClass(function (index, css) {
      return (css.match (/f-align-(left|right|full|wide|original)(-470)*/g) || []).join(' ');
    }).addClass('f-align-wide');
    setForumWrap();
    this.image.back();
    $('.fr-btn.fr-btn-image').removeClass('active');
    $('.fr-btn.fr-btn-image[data-cmd="img-align-wide"]').addClass('active');
  },
  refresh: function ($btn) { 
    setImageToolbarPosition($btn,this.image.get());
    refreshImagebtn(this.image.get());
  }
});

$.FroalaEditor.RegisterCommand('img-align-original', {
  title: 'Image wide original',
  icon: 'image-align-original',
  undo: true,
  focus: true,
  showOnMobile: true,
  refreshAfterCallback: true,
  callback: function () {
    $(this.image.get()).removeClass(function (index, css) {
      return (css.match (/f-align-(left|right|full|wide|original)(-470)*/g) || []).join(' ');
    }).addClass('f-align-original').removeAttr('style');
    this.image.back();
    $('.fr-btn.fr-btn-image').removeClass('active');
    $('.fr-btn.fr-btn-image[data-cmd="img-align-original"]').addClass('active');
  },
  refresh: function ($btn) {
    setImageToolbarPosition($btn,this.image.get());
    refreshImagebtn(this.image.get());
  }
});

$.FroalaEditor.RegisterCommand('img-align-left-470', {
  title: 'Image left width 470px',
  icon: 'image-align-left-470',
  undo: true,
  focus: true,
  showOnMobile: true,
  refreshAfterCallback: true,
  callback: function () {
    $(this.image.get()).removeClass(function (index, css) {
      return (css.match (/f-align-(left|right|full|wide|original)(-470)*/g) || []).join(' ');
    }).addClass('f-align-left-470');
    this.image.back();
    $('.fr-btn.fr-btn-image').removeClass('active');
    $('.fr-btn.fr-btn-image[data-cmd="img-align-left-470"]').addClass('active');
  },
  refresh: function ($btn) {
    setImageToolbarPosition($btn,this.image.get());
    refreshImagebtn(this.image.get());
  }
});


$.FroalaEditor.RegisterCommand('img-align-right-470', {
  title: 'Image right width 470px',
  icon: 'image-align-right-470',
  undo: true,
  focus: true,
  showOnMobile: true,
  refreshAfterCallback: true,
  callback: function () {
    $(this.image.get()).removeClass(function (index, css) {
      return (css.match (/f-align-(left|right|full|wide|original)(-470)*/g) || []).join(' ');
    }).addClass('f-align-right-470');
    this.image.back();
    $('.fr-btn.fr-btn-image').removeClass('active');
    $('.fr-btn.fr-btn-image[data-cmd="img-align-right-470"]').addClass('active');
  },
  refresh: function ($btn) {
    setImageToolbarPosition($btn,this.image.get());
    refreshImagebtn(this.image.get());
  }
});


$.FroalaEditor.RegisterCommand('img-align-left', {
  title: 'Image left width 350px',
  icon: 'image-align-left',
  undo: true,
  focus: true,
  showOnMobile: true,
  refreshAfterCallback: true,
  callback: function () {
    $(this.image.get()).removeClass(function (index, css) {
      return (css.match (/f-align-(left|right|full|wide|original)(-470)*/g) || []).join(' ');
    }).addClass('f-align-left');
    this.image.back();
    $('.fr-btn.fr-btn-image').removeClass('active');
    $('.fr-btn.fr-btn-image[data-cmd="img-align-left"]').addClass('active');
  },
  refresh: function ($btn) {
    setImageToolbarPosition($btn,this.image.get());
    refreshImagebtn(this.image.get());
  }
});


$.FroalaEditor.RegisterCommand('img-align-right', {
  title: 'Image right width 350px',
  icon: 'image-align-right',
  undo: true,
  focus: true,
  showOnMobile: true,
  refreshAfterCallback: true,
  callback: function () {
    $(this.image.get()).removeClass(function (index, css) {
      return (css.match (/f-align-(left|right|full|wide|original)(-470)*/g) || []).join(' ');
    }).addClass('f-align-right');
    this.image.back();
    $('.fr-btn.fr-btn-image').removeClass('active');
    $('.fr-btn.fr-btn-image[data-cmd="img-align-right"]').addClass('active');
  },
  refresh: function ($btn) {
    setImageToolbarPosition($btn,this.image.get());
    refreshImagebtn(this.image.get());
  }
});


$.FroalaEditor.RegisterCommand('image-enter', {
  title: 'Enter',
  icon: 'editor-enter-icon',
  undo: true,
  focus: true,
  showOnMobile: true,
  refreshAfterCallback: true,
  callback: function () {
    var $image = $(this.image.get());

    $image.addClass('fr-image-selected');
    if(this.opts.enter == $.FroalaEditor.ENTER_P) {
        var $new_line = $('<p><br></p>');
        var $image_wrap = $image.parent('p');
    } else {
        var $new_line = $('<div><br></div>');
        var $image_wrap = $image.parent('div:not(.fr-view)');
    }
    if(!$image_wrap.length) $image_wrap = $image;
    $image_wrap.after($new_line);
    $('.fr-image-selected').removeClass('fr-image-selected');
    this.selection.remove();
  }
});
$.FroalaEditor.RegisterCommand('video-enter', {
  title: 'Enter',
  icon: 'editor-enter-icon',
  undo: true,
  focus: true,
  showOnMobile: true,
  refreshAfterCallback: true,
  callback: function () {
    this.video.get().addClass('fr-video-selected');
    this.selection.setAfter(this.video.get().parent());
    this.selection.restore();
    this.cursor.enter();
    this.selection.clear();
    $('.fr-video-selected').click().removeClass('fr-video-selected');
  },
  refresh: function ($btn) {
    // setVideoToolbarPosition($btn,this.video.get());
    refreshVideobtn(this.video.get());
  }
});

$.FroalaEditor.RegisterCommand('table-enter', {
  title: 'Enter',
  icon: 'editor-enter-icon',
  undo: true,
  focus: true,
  showOnMobile: true,
  refreshAfterCallback: true,
  callback: function () {
    // this.selection.setAfter(this.table.selectedTable().closest('div'));
    var table_wrap = $(this.table.selectedTable()).closest('.fr-table-responsive');
    // this.selection.setAfter(table_wrap);
    // this.selection.restore();
    if(table_wrap.length) {
        this.selection.clear();
        if(this.opts.enter == FroalaEditor.ENTER_P) {
            var $new_line = $('<p><br></p>');
        } else {
            var $new_line = $('<div><br></div>');
        }
    } else {
        table_wrap = this.table.selectedTable();
    }
    $(table_wrap).after($new_line);
    // this.selection.setAfter($new_line);
    // this.selection.save();
    // this.selection.restore();
  }
}); 

$.FroalaEditor.RegisterCommand('hr-enter', {
  title: 'Enter',
  icon: 'editor-enter-icon',
  undo: true,
  focus: true,
  showOnMobile: true,
  refreshAfterCallback: true,
  callback: function () {
    var $hr = this.customInsertHR.get();
    if(this.opts.enter == FroalaEditor.ENTER_P) {
        var $new_line = $('<p><br></p>');
    } else {
        var $new_line = $('<div><br></div>');
    }
    $hr.after($new_line);
    // this.selection.setAfter(this.customInsertHR.get()[0]);
    // this.selection.restore();
    // this.cursor.enter();
  }
});

$.FroalaEditor.RegisterCommand('custom-button-enter', {
  title: 'Enter',
  icon: 'editor-enter-icon',
  undo: true,
  focus: true,
  showOnMobile: true,
  refreshAfterCallback: true,
  callback: function () {
    var $btn = this.customInsertButton.get();
    var $new_line = $('<div><br></div>');
    $btn.parent().after($new_line);
    // this.selection.setAfter($new_line.get(0));
    // this.selection.restore();
    // this.cursor.enter();
  }
});

$.FroalaEditor.RegisterCommand('video-replace', {
    title: 'Replace video',
    icon: 'quickInsertVideoIcon',
    callback: function(cmd, val) {
        var editor = this;
        // selRange = saveSelection();
        editor.selection.save();
        var editor_video = '';
        var modal = $(this).showModalFlat($.lang[LANG]['config.replace-video'],videoForm(),true,true,function() {
            $('.error').remove();

            if(!editor_video) {
                modal.modal('hide');
                return false;
            }

            var url = $('#video-url').val();
            if(!url) {
              $('#video-url').after('<label class="error">' +  $.lang[LANG]['config.link-to-go'] + '</label>').focus();
              return;
            }

            // video url patterns(youtube, instagram, vimeo, dailymotion)
            var ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var ytMatch = url.match(ytRegExp);

            var igRegExp = /\/\/instagram.com\/p\/(.[a-zA-Z0-9]*)/;
            var igMatch = url.match(igRegExp);

            var vRegExp = /\/\/vine.co\/v\/(.[a-zA-Z0-9]*)/;
            var vMatch = url.match(vRegExp);

            var vimRegExp = /\/\/(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
            var vimMatch = url.match(vimRegExp);

            var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
            var dmMatch = url.match(dmRegExp);

            var kakaoExp = /\/\/tv.kakao.com\/(channel|embed)\/([0-9]{6,11}|player)\/cliplink\/([0-9]{6,11})/;
            var kaMatch = url.match(kakaoExp);

            var sound = url.search("soundcloud.com");

            var $video;
            if (ytMatch && ytMatch[2].length === 11) {
            } else if (igMatch && igMatch[0].length > 0) {
            } else if (vMatch && vMatch[0].length > 0) {
            } else if (vimMatch && vimMatch[3].length > 0) {
            } else if (dmMatch && dmMatch[2].length > 0) {
            } else if (kaMatch && kaMatch[3].length > 0) {
            } else if (sound>-1) {
            } else {
              $('#video-url').after('<label class="error">' +  $.lang[LANG]['editor.video.url.error'] + '</label>').focus();
              return;
            }

            var video = insertVideo(url,'src')

            $(editor_video).find('iframe').attr('src', video);

            restoreSelection(selRange);
            modal.modal('hide');

        },'cancel','', 'cl-modal cl-cmmodal cl-p70 cl-s-btn w560 cl-t80 cl-close-btn video-addmodal', '', '', function() {
            if(!editor.video.get()) {
                modal.modal('hide');
                return false;
            }
            editor_video = editor.video.get()

            var url = $(editor_video).find('iframe').attr('src');
            modal.find('input#video-url').val(url);
        });
        $('.flat-modal').css({
          'position' : 'absolute',
          'z-index' : '1051'
        });
        $('[data-toggle="popover"]').popover();
        $('.flat-modal').next().css('z-index','1050');
    }
});

$.FroalaEditor.RegisterQuickInsertButton('quickInsertImageButton', {
    icon: 'quickInsertImageIcon',
    title: 'Insert Image',
    callback: function() {
        var editor = this;
        editor.selection.save();
        // selRange = saveSelection();
        upTYPE = 'image';
        isReplace = false;
        $('#file_type').val(upTYPE);
        $('#uploadFile').val('');
        $('#uploadFile').trigger('click');
    }
});

$.FroalaEditor.RegisterCommand('insertImageButton', {
    icon: 'quickInsertImageIcon',
    title: 'Insert Image',
    callback: function() {
        var editor = this;
        editor.selection.save();
        // selRange = saveSelection();
        upTYPE = 'image';
        $('#file_type').val(upTYPE);
        $('#uploadFile').val('');
        $('#uploadFile').trigger('click');
    }
});


$.FroalaEditor.RegisterQuickInsertButton('quickInsertMyStorageImageButton', {
    icon: 'quickInsertMyStorageImageIcon',
    title: 'Insert Image',
    callback: function() {
        var editor = this;
        console.log('image before')
        console.log(editor.selection.element());
        editor.selection.save();
        // selRange = saveSelection();
        $.resource.open();
        $('.resource-useit').attr('data-element', 'editor');
    }
});


$.FroalaEditor.RegisterQuickInsertButton('quickInsertVideoButton', {
    icon: 'quickInsertVideoIcon',
    title: 'Insert Video',
    callback: function() {
      // this.selection.save();
      var editor = this;
      editor.selection.save();
      // selRange = saveSelection();
      var editor = this;
      var modal = $(this).showModalFlat($.lang[LANG]['config.insert-video'],videoForm(),true,true,function() {
        $('.error').remove();
        var url = $('#video-url').val();
        if(!url) {
          $('#video-url').after('<label class="error">' +  $.lang[LANG]['config.link-to-go'] + '</label>').focus();
          return;
        }

        // video url patterns(youtube, instagram, vimeo, dailymotion)
        var ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var ytMatch = url.match(ytRegExp);

        var igRegExp = /\/\/instagram.com\/p\/(.[a-zA-Z0-9]*)/;
        var igMatch = url.match(igRegExp);

        var vRegExp = /\/\/vine.co\/v\/(.[a-zA-Z0-9]*)/;
        var vMatch = url.match(vRegExp);

        var vimRegExp = /\/\/(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
        var vimMatch = url.match(vimRegExp);

        var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
        var dmMatch = url.match(dmRegExp);

        var sound = url.search("soundcloud.com");

        var kakaoExp = /\/\/tv.kakao.com\/(channel|embed)\/([0-9]{6,11}|player)\/cliplink\/([0-9]{6,11})/;
        var kaMatch = url.match(kakaoExp);

        var $video;
        if (ytMatch && ytMatch[2].length === 11) {
        } else if (igMatch && igMatch[0].length > 0) {
        } else if (vMatch && vMatch[0].length > 0) {
        } else if (vimMatch && vimMatch[3].length > 0) {
        } else if (dmMatch && dmMatch[2].length > 0) {
        } else if (kaMatch && kaMatch[3].length > 0) {
        } else if (sound>-1) {
        } else {
          $('#video-url').after('<label class="error">' +  $.lang[LANG]['editor.video.url.error'] + '</label>').focus();
          return;
        }

        if ($video) {
          $video.attr('frameborder', 0).attr('class','tpl-video');
          range.create().insertNode($video[0]);
          //$('.note-editable').fitVids();
        }
        var video = insertVideo(url,'src'),
          frVideo = '<div><span class="fr-video fr-dvb fr-draggable" contenteditable="false" draggable="true">' +
              '<iframe class="fitvidsignore" width="720" height="405" src="' + video + '" frameborder="0" allowfullscreen="true"></iframe>' +
              '</span></div>';
        restoreSelection(selRange);
        editor.html.insert(frVideo , true);
        // editor.video.insertByURL(url);
        // editor.selection.restore();
        modal.modal('hide');

      },'cancel','', 'cl-modal cl-cmmodal cl-p70 cl-s-btn w560 cl-t80 cl-close-btn video-addmodal', '', function() { restoreSelection(selRange); });
      $('.flat-modal').css({
        'position' : 'absolute',
        'z-index' : '1051'
      });
      $('[data-toggle="popover"]').popover();
      $('.flat-modal').next().css('z-index','1050');
    }
});

$.FroalaEditor.RegisterCommand('insertVideoButton', {
    icon: 'quickInsertVideoIcon',
    title: 'Insert Video',
    callback: function() {
      this.selection.save();
      // selRange = saveSelection();
      var editor = this;
      var modal = $(this).showModalFlat($.lang[LANG]['config.insert-video'],videoForm(),true,true,function() {
        $('.error').remove();
        var url = $('#video-url').val();
        if(!url) {
          $('#video-url').after('<label class="error">' +  $.lang[LANG]['config.link-to-go'] + '</label>').focus();
          return;
        }

        // video url patterns(youtube, instagram, vimeo, dailymotion)
        var ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var ytMatch = url.match(ytRegExp);

        var igRegExp = /\/\/instagram.com\/p\/(.[a-zA-Z0-9]*)/;
        var igMatch = url.match(igRegExp);

        var vRegExp = /\/\/vine.co\/v\/(.[a-zA-Z0-9]*)/;
        var vMatch = url.match(vRegExp);

        var vimRegExp = /\/\/(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
        var vimMatch = url.match(vimRegExp);

        var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
        var dmMatch = url.match(dmRegExp);

        var sound = url.search("soundcloud.com");

        var $video;
        if (ytMatch && ytMatch[2].length === 11) {
        } else if (igMatch && igMatch[0].length > 0) {
        } else if (vMatch && vMatch[0].length > 0) {
        } else if (vimMatch && vimMatch[3].length > 0) {
        } else if (dmMatch && dmMatch[2].length > 0) {
        } else if (sound>-1) {
        } else {
          $('#video-url').after('<label class="error">' +  $.lang[LANG]['editor.video.url.error'] + '</label>').focus();
          return;
        }

        if ($video) {
          $video.attr('frameborder', 0).attr('class','tpl-video');
          range.create().insertNode($video[0]);
          //$('.note-editable').fitVids();
        }
        var video = insertVideo(url,'src'),
          frVideo = '<span class="fr-video fr-dvb fr-draggable" contenteditable="false" draggable="true">' +
              '<iframe class="fitvidsignore" width="720" height="405" src="' + video + '" frameborder="0" allowfullscreen="true"></iframe>' +
              '</span>';
        restoreSelection(selRange);
        editor.html.insert(frVideo , true);
        // editor.video.insertByURL(url);
        // editor.selection.restore();
        modal.modal('hide');

      },'cancel','', 'cl-modal cl-cmmodal cl-p70 cl-s-btn w560 cl-t80 cl-close-btn video-addmodal', '', function() { restoreSelection(selRange); });
      $('.flat-modal').css({
        'position' : 'absolute',
        'z-index' : '1051'
      });
      $('[data-toggle="popover"]').popover();
      $('.flat-modal').next().css('z-index','1050');
    }
});

$.FroalaEditor.RegisterQuickInsertButton('quickInsertFileButton', {
    icon: 'quickInsertFileIcon',
    title: 'Insert File',
    callback: function() {
        // selRange = saveSelection();
        this.selection.save();
        upTYPE = 'file';
        $('#file_type').val(upTYPE);
        $('#uploadFile').val('');
        $('#uploadFile').trigger('click');
    }
});

$.FroalaEditor.RegisterQuickInsertButton('quickInsertCustomButton', {
    icon: 'insertCustomButton',
    title: 'Insert Button',
    callback: function() {
        var editor = this;
        var random_num = Math.floor((Date.now() + Math.random()) * 1000);
        editor.commands.clearFormatting();
        editor.html.insert('<div><div role="button" class="fr-custom-button fr-inner fr-cst-btn-' + random_num + '" style="border-radius: 0; background-color: #ffffff; padding: 8px 28px; border: 1px solid #000;">&#8204;<span style="color: #000000; font-size: 13px; font-size: 13px; font-family: \'Noto Sans KR\'">' + (LANG == 'ko' ? '더보기' : 'MORE') + '</span><br></div>&#8204;</div>', false);
    }
});

$.FroalaEditor.RegisterQuickInsertButton('quickInsertHR', {
    icon: 'insertHR',
    title: 'Insert HR',
    callback: function() {
        var editor = this;
        editor.html.insert('<hr class="fr-hr" style="width: 100%; margin-top: 10px; margin-bottom: 10px; border-bottom: 1px solid #ccc; border-top: none;" align="center">');
    }
});

$.FroalaEditor.RegisterCommand('insertFileButton', {
    icon: 'quickInsertFileIcon',
    title: 'Insert File',
    callback: function() {
        // selRange = saveSelection();
        upTYPE = 'file';
        $('#file_type').val(upTYPE);
        $('#uploadFile').val('');
        $('#uploadFile').trigger('click');
    }
});

$.FroalaEditor.RegisterCommand('hrBorderWidth', {
    icon: 'tableBorderWidth',
    title: 'Border Width',
    type:'dropdown',
    focus: false,
    options: {
        '1' : '1',
        '2' : '2',
        '3' : '3',
        '4' : '4',
        '5' : '5',
        '6' : '6',
        '7' : '7',
        '8' : '8',
        '9' : '9',
        '10' : '10',
    },
    callback: function(cmd, val) {
        var editor = this;
        editor.customInsertHR.get().css('border-bottom-width', val + 'px');
        editor.customInsertHR.drawResizer();
        setTimeout(function() {
            editor.customInsertHR.refreshToolbar();
        });
    },
    refreshOnShow: function($btn, $dropdown) {
        var border_width = this.customInsertHR.get().css('border-bottom-width');
        if(border_width) {
            border_width = border_width.replace('px', '');
        } else {
            border_width = 1;
        }
        $($dropdown).find('[data-param1="' + border_width + '"]').addClass('fr-active');
    }
});

$.FroalaEditor.RegisterCommand('hrMargin', {
    icon: 'hrMargin',
    title: 'Margin',
    type:'dropdown',
    focus:false,
    options: {
        '0' : '0',
        '1' : '1',
        '2' : '2',
        '3' : '3',
        '4' : '4',
        '5' : '5',
        '6' : '6',
        '7' : '7',
        '8' : '8',
        '9' : '9',
        '10' : '10',
        '11' : '11',
        '12' : '12',
        '13' : '13',
        '14' : '14',
        '15' : '15',
        '16' : '16',
        '17' : '17',
        '18' : '18',
        '19' : '19',
        '20' : '20',
    },
    callback: function(cmd, val) {
        var editor = this;
        editor.customInsertHR.get().css({'margin-top' : val + 'px', 'margin-bottom' : val + 'px'});
        editor.customInsertHR.drawResizer();
        setTimeout(function() {
            editor.customInsertHR.refreshToolbar();
        });
    },
    refreshOnShow: function($btn, $dropdown) {
        var margin = 0;
        var margin_top = this.customInsertHR.get().css('margin-top');
        var margin_bottom = this.customInsertHR.get().css('margin-bottom');
        margin = this.customInsertHR.get().css('margin-top') ? this.customInsertHR.get().css('margin-top') : this.customInsertHR.get().css('margin-bottom');
        if(margin) {
            margin = margin.replace('px', '');
        } 

        if(margin_top && margin_bottom && margin_top == margin_bottom) {
            $($dropdown).find('[data-param1="' + margin + '"]').addClass('fr-active');    
        }
        
    }
});

$.FroalaEditor.RegisterCommand('hrBorderColor', {
    icon: 'textColor',
    title: 'Line Color',
    focus: false,
    callback: function(cmd, val) {
        var editor = this;
        $('button[data-cmd="hrBorderColor"]').colpick({
            color:'#0088CC',
            layout : 'hex',
            extend : true,
            flat : isMobile() ? true : false,
            onSubmit: function (hsb, hex, rgb) {
                hex = hex.toUpperCase();
                // $('.fr-toolbar.fr-inline').removeClass('always');
                $(this.el).data('value', '#' + hex);
                $(this.el).colpickHide();
                var $hr = editor.customInsertHR.get();
                $hr.css('border-bottom-color', '#'+hex);

                if(typeof SETTINGS.favcolor == 'undefined') SETTINGS.favcolor = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000'];
                if(hex && SETTINGS.favcolor.indexOf('#' +hex) == -1) {
                    if(MODE == 'c' || MODE == 'config') {
                        $.ajax({
                            url:'/config/setFavoriteColor',
                            type:'post',
                            data:{
                                'sid' : SID,
                                'color' : '#'+hex,
                            },
                            dataType:'json',
                            success:function() {
                                SETTINGS.favcolor.push('#'+hex);
                                if(SETTINGS.favcolor.length > $.FroalaEditor.FAV_COLORS_COUNT) {
                                    SETTINGS.favcolor.splice(0, SETTINGS.favcolor.length - $.FroalaEditor.FAV_COLORS_COUNT);
                                }
                            }
                        });
                    } else {
                        SETTINGS.favcolor.push('#'+hex);
                        if(SETTINGS.favcolor.length > $.FroalaEditor.FAV_COLORS_COUNT) {
                            SETTINGS.favcolor.splice(0, SETTINGS.favcolor.length - $.FroalaEditor.FAV_COLORS_COUNT);
                        }
                    }
                }
            },
            onHide: function(picker) {
                $(picker).removeClass('show-picker');
                $($(picker).data('colpick').el).removeClass('active');
            },
            onBeforeShow: function() {
                $(this).toggleClass('active');
            },
            onShow: function() {
                var btn = this;
                if(!$(this).hasClass('active')) {
                    setTimeout(function() {
                        $(btn).colpickHide();
                    });
                }

                var $colpick_layer = $('#' + $(this).data('colpickId'));
                $colpick_layer.find('.nav-pills').hide();
                var hex = $.colpick.rgbToHex(fixRGB(rgbaToOpacity((editor.customInsertHR.get().css('border-bottom-color')))));
                $(this).colpickSetColor(hex.replace('#',''));

                $('.colpick_hex.extend .fav-row').remove();
                if(typeof SETTINGS.favcolor == 'undefined') SETTINGS.favcolor = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000'];
                var favcolor_html = '';
                if(SETTINGS.favcolor.length) {
                    var gap = $.FroalaEditor.FAV_COLORS_COUNT - SETTINGS.favcolor.length;
                    for(var i=0; i<gap; i++) {
                        if(i==0) {
                            SETTINGS.favcolor.unshift('#000000');
                        } else {
                            SETTINGS.favcolor.unshift('#FFFFFF');
                        }
                    }
                    var favcolor_arr = SETTINGS.favcolor.slice();
                    favcolor_arr.reverse();
                    $(favcolor_arr).each(function() {
                        favcolor_html += '<span class="colpick-select-color fav-select-color" style="background: ' + this + '" data-color="' + this + '"></span>';
                    });
                }
                if(favcolor_html) {
                    $('.colpick_hex.extend .col-ex-item.color-set').prepend('<div class="fav-row">' + favcolor_html + '</div>');
                }
                var $trigger = $(this);

                if(($trigger.offset().top + $trigger.outerHeight() + $colpick_layer.outerHeight()) > window.innerHeight) {
                    var top = $trigger.offset().top;
                    $colpick_layer.css('top',(Number(top)-171)+'px');
                }
            }
        });
    }
});

$.FroalaEditor.RegisterCommand('hrAlign', {
    icon: 'hrAlign',
    title: 'HR Align',
    type: 'dropdown',
    focus: false,
    options: {
        'left': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path d='M3 5h18v2H3z'/><path d='M3 11h12v2H3z'/><path d='M3 17h6v2H3z'/></svg>",
        'center': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path d='M3 5h18v2H3z'/><path d='M6 11h12v2H6z'/><path d='M9 17h6v2H9z'/></svg>",
        'right': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path d='M3 5h18v2H3z'/><path d='M9 11h12v2H9z'/><path d='M15 17h6v2h-6z'/></svg>"
    },
    html: function() {
        return '\
            <ul class="fr-dropdown-list" role="presentation">\
                <li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="hrAlign" data-param1="left" title="' + $.FroalaEditor.LANGUAGE[LANG].translation['Align Left'] + '" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M3 11h12v2H3z"/><path d="M3 17h6v2H3z"/></svg></a></li>\
                <li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="hrAlign" data-param1="center" title="' + $.FroalaEditor.LANGUAGE[LANG].translation['Align Center'] + '" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M6 11h12v2H6z"/><path d="M9 17h6v2H9z"/></svg></a></li>\
                <li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="hrAlign" data-param1="right" title="' + $.FroalaEditor.LANGUAGE[LANG].translation['Align Right'] + '" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M9 11h12v2H9z"/><path d="M15 17h6v2h-6z"/></svg></a></li>\
            </ul>';
    },
    callback: function(cmd, val) {
        var editor = this;
        editor.customInsertHR.get().attr('align', val);
        editor.customInsertHR.drawResizer();
        setTimeout(function() {
            editor.customInsertHR.refreshToolbar();
        },50);
        $('button[data-cmd="hrAlign"]').html($('[data-cmd="hrAlign"][data-param1="' + val +'"]').html());
    },
    refreshOnShow: function($btn, $dropdown) {
        var editor = this;
        var align = editor.customInsertHR.get().attr('align');
        if(!align) {
            $dropdown.find('[data-param1="center"]').addClass('fr-active');
        } else {
            align = align.toLowerCase();
            $dropdown.find('[data-param1="' + align +'"]').addClass('fr-active');
        }
    }
});

Object.assign(FroalaEditor.POPUP_TEMPLATES, {
    'customInsertTable.popup' : '[_BUTTONS_][_CUSTOM_LAYER_]',
    'customQuickInsert.popup' : '[_BUTTONS_]',
    'customInsertHR.popup' : '[_BUTTONS_]',
    'customInsertButton.toolbar' : '[_BUTTONS_]',
    'customInsertButton.popup' : '[_CUSTOM_LAYER_]',
});

$.FroalaEditor.RegisterCommand('hrRemove', {
    icon: 'hrRemove',
    title: 'Remove HR',
    callback: function(cmd, val) {
        var editor = this;
        editor.customInsertHR.get().remove();
        editor.customInsertHR.hidePopup();
        editor.customInsertHR.drawResizer();
        editor.customInsertHR.refreshToolbar();
    }
});

$.FroalaEditor.RegisterCommand('customButtonRemove', {
    icon: 'hrRemove',
    title: 'Remove Button',
    callback: function() {
        var editor = this;
        var $button = editor.customInsertButton.get();
        if($button.parent('div').get(0) == $(fr_editor.$el).get(0)) {
            $button.remove();
        } else {
            var $parent = $button.parent('div');
            $button.remove();
            function removeInvisibleSpace(node) {
                var newStr = '';
                var text = $(node).text();
                for(var i=0; i<text.length; i++) {
                    if(text.charCodeAt(i) != 8204) {
                        newStr += text.charAt(i).replace(' ', $.FroalaEditor.UNICODE_NBSP);
                    }
                }
                if(newStr.length != text.length) {
                    node.textContent = newStr;
                }
            }

            function blockTrace(element) {
                $(element).contents().each(function(idx) {
                    if(this.nodeType == Node.TEXT_NODE) {
                        removeInvisibleSpace(this);
                    } else {
                        blockTrace(this);
                    }
                });
            }
            blockTrace($parent);
            if($parent.is(':empty')) $parent.append('<br>');
        }
        editor.customInsertButton.hideToolbar();
        editor.customInsertButton.drawResizer();
    }
});

$.FroalaEditor.RegisterCommand('customButtonCopy', {
    icon:'copyCustomButton',
    title: 'Copy Button',
    callback: function() {
        var editor = this;

        // editor.selection.setAfter(editor.customInsertButton.get().parents('div:first')[0]);
        // editor.selection.restore();
        // editor.selection.save();
        var $btn = editor.customInsertButton.get();
        var $clone = $btn.clone().removeClass('fr-active');
        $($clone[0].classList).each(function(idx, cls) {
            if(cls.indexOf('fr-cst-btn-') > -1) {
                $clone.removeClass(cls);
            }
        });
        var random_num = Math.floor((Date.now() + Math.random()) * 1000);
        $clone.addClass('fr-cst-btn-' + random_num);
        var clone_html = $clone.outerHTML();
        var align = '';
        // if($btn.parent().css('text-align')) align = $btn.parent().css('text-align');

        // if($btn.parent().get(0) == $(editor.$el).children('div:last').get(0)) {
        // var $new_div = $('<div style="' + (align ? 'text-align: ' + align : '') + '">');
        // $new_div.html(clone_html + '&zwnj;');
        if($btn.parent('div').get(0) == $(editor.$el).get(0)) {
            $btn.wrap('div');

        } 
        $btn.after('&nbsp;&nbsp;'+clone_html);
            // editor.selection.clear();
            // editor.selection.setAfter($new_div.get(0));
            // editor.selection.restore();
            // editor.selection.save();
            // editor.html.insert(clone_html, false);
        // } else {
        //     editor.html.insert('<div style="' + (align ? 'text-align: ' + align : '') + '">' + '' + clone_html + '' + '</div>', false);
        // }

        

        var blockCSS = getStyleText();
        var btnCls = '';
        var elName = selectEL;
        var blockName = $('.' + selectEL).attr('data-name');
        $($btn[0].classList).each(function(idx, cls) {
            if(cls.indexOf('fr-cst-btn-') > -1) btnCls = cls;
        });

        if(btnCls) {
            if(blockCSS.children.hasOwnProperty('.' + blockName + ' .' + btnCls + ':hover')) {
                blockCSS.children['.' + blockName + ' .fr-cst-btn-' + random_num + ':hover'] = blockCSS.children['.' + blockName + ' .' + btnCls + ':hover'];
            }

            if(blockCSS.children.hasOwnProperty('.' + blockName + ' .' + btnCls + ':hover span')) {
                blockCSS.children['.' + blockName + ' .fr-cst-btn-' + random_num + ':hover span'] = blockCSS.children['.' + blockName + ' .' + btnCls + ':hover span'];
            }
            $('#' + elName + 'css').html(CSSJSON.toCSS(blockCSS));
            $('.' + selectEL).addClass('css-changed');
        }

    }
});


$.FroalaEditor.RegisterCommand('customButtonColor', {
    icon:'customButtonColor',
    title: 'Button Color',
    callback: function() {
        var editor = this;
        $('button[data-cmd="customButtonColor"]').colpick({
            color:'#0088CC',
            layout : 'hex',
            extend : true,
            height: 192,
            onSubmit: function (hsb, hex, rgb) {
                hex = hex.toUpperCase();
                // $('.fr-toolbar.fr-inline').removeClass('always');
                $(this.el).data('value', '#' + hex);
                var $colpick_layer = $('#' + $(this.el).data('colpickId'));
                var where = $colpick_layer.find('.nav-pills li.active').data('type');
                var $button = editor.customInsertButton.get();
                $(this.el).colpickHide();
                if(where == 'text') {
                    $button.css('border-color', '#'+hex);
                } else if(where == 'background') {
                    $button.css('background-color', '#'+hex);   
                } else if(where == 'buttonhoverborder') {
                    var blockCSS = getStyleText();
                    var $button = editor.customInsertButton.get();
                    var btnCls = '';
                    var elName = selectEL;
                    var blockName = $('.' + selectEL).attr('data-name');
                    $($button[0].classList).each(function(idx, cls) {
                        if(cls.indexOf('fr-cst-btn-') > -1) btnCls = cls;
                    });

                    if(btnCls) {
                        if(!blockCSS.children.hasOwnProperty('.' + blockName + ' .' + btnCls + ':hover')) {
                            blockCSS.children['.' + blockName + ' .' + btnCls + ':hover'] = new Array();
                            blockCSS.children['.' + blockName + ' .' + btnCls + ':hover']['attributes'] = new Array();
                        } 
                        
                        blockCSS.children['.' + blockName + ' .' + btnCls + ':hover']['attributes']['border-color'] = '#'+hex + ' !important';
                        $('#' + elName + 'css').html(CSSJSON.toCSS(blockCSS));
                        $('.' + selectEL).addClass('css-changed');
                    }
                } else if(where == 'buttonhoverbackground') {
                    var blockCSS = getStyleText();
                    var $button = editor.customInsertButton.get();
                    var btnCls = '';
                    var elName = selectEL;
                    var blockName = $('.' + selectEL).attr('data-name');
                    $($button[0].classList).each(function(idx, cls) {
                        if(cls.indexOf('fr-cst-btn-') > -1) btnCls = cls;
                    });

                    if(btnCls) {
                        if(!blockCSS.children.hasOwnProperty('.' + blockName + ' .' + btnCls + ':hover')) {
                            blockCSS.children['.' + blockName + ' .' + btnCls + ':hover'] = new Array();
                            blockCSS.children['.' + blockName + ' .' + btnCls + ':hover']['attributes'] = new Array();
                        } 
                        blockCSS.children['.' + blockName + ' .' + btnCls + ':hover']['attributes']['background-color'] = '#'+hex + ' !important';
                        $('#' + elName + 'css').html(CSSJSON.toCSS(blockCSS));
                        $('.' + selectEL).addClass('css-changed');
                    }
                }

                if(typeof SETTINGS.favcolor == 'undefined') SETTINGS.favcolor = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000'];
                if(hex && SETTINGS.favcolor.indexOf('#' +hex) == -1) {
                    if(MODE == 'c' || MODE == 'config') {
                        $.ajax({
                            url:'/config/setFavoriteColor',
                            type:'post',
                            data:{
                                'sid' : SID,
                                'color' : '#'+hex,
                            },
                            dataType:'json',
                            success:function() {
                                SETTINGS.favcolor.push('#'+hex);
                                if(SETTINGS.favcolor.length > $.FroalaEditor.FAV_COLORS_COUNT) {
                                    SETTINGS.favcolor.splice(0, SETTINGS.favcolor.length - $.FroalaEditor.FAV_COLORS_COUNT);
                                }
                            }
                        });
                    } else {
                        SETTINGS.favcolor.push('#'+hex);
                        if(SETTINGS.favcolor.length > $.FroalaEditor.FAV_COLORS_COUNT) {
                            SETTINGS.favcolor.splice(0, SETTINGS.favcolor.length - $.FroalaEditor.FAV_COLORS_COUNT);
                        }
                    }
                }
            },
            onHide: function(picker) {
                $(picker).removeClass('show-picker');
                $($(picker).data('colpick').el).removeClass('active');
            },
            onBeforeShow: function() {
                $(this).toggleClass('active');
            },
            onShow: function() {
                var btn = this;
                if(!$(this).hasClass('active')) {
                    setTimeout(function() {
                        $(btn).colpickHide();
                    });
                }
                
                var $colpick_layer = $('#' + $(this).data('colpickId'));
                $colpick_layer.addClass('customButtonColor');
                // $colpick_layer.find('.nav-pills').hide();
                var hex = $.colpick.rgbToHex(fixRGB(rgbaToOpacity(editor.customInsertButton.get()[0].style.borderColor)));
                
                $(this).colpickSetColor(hex.replace('#',''));

                $('.colpick_hex.extend .fav-row').remove();
                if(typeof SETTINGS.favcolor == 'undefined') SETTINGS.favcolor = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000'];
                var favcolor_html = '';
                if(SETTINGS.favcolor.length) {
                    var gap = $.FroalaEditor.FAV_COLORS_COUNT - SETTINGS.favcolor.length;
                    for(var i=0; i<gap; i++) {
                        if(i==0) {
                            SETTINGS.favcolor.unshift('#000000');
                        } else {
                            SETTINGS.favcolor.unshift('#FFFFFF');
                        }
                    }
                    var favcolor_arr = SETTINGS.favcolor.slice();
                    favcolor_arr.reverse();
                    $(favcolor_arr).each(function() {
                        favcolor_html += '<span class="colpick-select-color fav-select-color" style="background: ' + this + '" data-color="' + this + '"></span>';
                    });
                }
                if(favcolor_html) {
                    $('.colpick_hex.extend .col-ex-item.color-set').prepend('<div class="fav-row">' + favcolor_html + '</div>');
                }
                var $trigger = $(this);

                if(($trigger.offset().top + $trigger.outerHeight() + $colpick_layer.outerHeight()) > window.innerHeight) {
                    var top = $trigger.offset().top;
                    $colpick_layer.css('top',(Number(top)-233)+'px');
                }
            }
        });
        var $colpick_layer = $('#' + $('button[data-cmd="customButtonColor"]').data('colpickId'));

        $colpick_layer.find('.nav-pills').addClass('row2 half');
        if(!$colpick_layer.find('.nav-pills [data-type="buttonhoverborder"]').length) {
            $colpick_layer.find('.nav-pills').append('<li data-type="buttonhoverborder" class=""><a href="#">' + $.FroalaEditor.LANGUAGE[LANG].translation['Button Border Color Hover'] + '</a></li>');
            $colpick_layer.find('.nav-pills').append('<li data-type="buttonhoverbackground" class=""><a href="#">' + $.FroalaEditor.LANGUAGE[LANG].translation['Button Background Color Hover'] + '</a></li>');
        }

        $colpick_layer.hide();
        $colpick_layer.find('.nav-pills [data-type="text"] a').text($.FroalaEditor.LANGUAGE[LANG].translation['Button Border Color']);
        $colpick_layer.find('.nav-pills [data-type="background"] a').text($.FroalaEditor.LANGUAGE[LANG].translation['Button Background Color']);
        $colpick_layer.find('.nav-pills li').removeClass('active');
        $colpick_layer.find('.nav-pills li:first').addClass('active');
    }
});

$.FroalaEditor.RegisterCommand('customButtonPaddingH', {
    icon: 'customButtonPaddingH',
    title: 'Button Padding H',
    type: 'dropdown',
    html: function() {
        var h = '<ul class="fr-dropdown-list" role="presentation">';
        h += '<li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="customButtonPaddingH" data-param1="2" title="2" aria-selected="false">2</a></li>'; 
        for(var i=4; i<=80; i+=4) {
            h += '<li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="customButtonPaddingH" data-param1="' + i + '" title="' + i + '" aria-selected="false">' + i + '</a></li>'; 
        }

        h += '</ul>';
        return h;
    },
    callback: function(cmd, val) {
        var editor = this;
        var $button = editor.customInsertButton.get();
        $button.css({'padding-left' : val+'px', 'padding-right' : val+'px'});
    },
    refreshOnShow: function(btn, dropdown) {
        var editor = this;
        var $button = editor.customInsertButton.get();

        var padding = 0;
        var padding_left = $button.css('padding-left');
        var padding_right = $button.css('padding-left');
        if(padding_left && padding_right && padding_left == padding_right) padding = padding_left;
        if(!padding) padding = 0;
        padding = padding.toString().replace('px','');
        $(dropdown).find('[data-param1="' + padding + '"]').addClass('fr-active');
    }
});

$.FroalaEditor.RegisterCommand('customButtonPaddingV', {
    icon: 'customButtonPaddingV',
    title: 'Button Padding V',
    type: 'dropdown',
    html: function() {
        var h = '<ul class="fr-dropdown-list" role="presentation">';
        h += '<li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="customButtonPaddingV" data-param1="2" title="2" aria-selected="false">2</a></li>'; 
        for(var i=4; i<=80; i+=4) {
            h += '<li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="customButtonPaddingV" data-param1="' + i + '" title="' + i + '" aria-selected="false">' + i + '</a></li>'; 
        }

        h += '</ul>';
        return h;
    },
    callback: function(cmd, val) {
        var editor = this;
        var $button = editor.customInsertButton.get();
        $button.css({'padding-top' : val+'px', 'padding-bottom' : val+'px'});
    },
    refreshOnShow: function(btn, dropdown) {
        var editor = this;
        var $button = editor.customInsertButton.get();

        var padding = 0;
        var padding_top = $button.css('padding-top');
        var padding_bottom = $button.css('padding-bottom')
        if(padding_top && padding_bottom && padding_top == padding_bottom) padding = padding_top;
        if(!padding) padding = 0;
        padding = padding.toString().replace('px','');
        $(dropdown).find('[data-param1="' + padding + '"]').addClass('fr-active');
    }
});

$.FroalaEditor.RegisterCommand('customButtonMargin', {
    icon: 'customButtonMargin',
    title: 'Button Margin',
    type: 'dropdown',
    options: {
        0 : '0',
        1 : '1',
        2 : '2',
        3 : '3',
        4 : '4',
        5 : '5',
        6 : '6',
        7 : '7',
        8 : '8',
        9 : '9',
        10 : '10',
        11 : '11',
        12 : '12',
        13 : '13',
        14 : '14',
        15 : '15',
        16 : '16',
        17 : '17',
        18 : '18',
        19 : '19',
        20 : '20',
    },
    callback: function(cmd, val) {
        var editor = this;
        var $button = editor.customInsertButton.get();
        $button.css({'margin-left' : val+'px', 'margin-right': val+'px'});
    },
    refreshOnShow: function(btn, dropdown) {
        var editor = this;
        var $button = editor.customInsertButton.get();
        var margin = $button.css('margin-left') ? $button.css('margin-left') : $button.css('margin-right');
        if(!margin) margin = 0;
        margin = margin.toString().replace('px','');
        $(dropdown).find('[data-param1="' + margin + '"]').addClass('fr-active');
    }
});

$.FroalaEditor.RegisterCommand('customButtonBorder', {
    icon: 'customButtonBorder',
    title: 'Button Border Width',
    type: 'dropdown',
    options: {
        0 : '0',
        1 : '1',
        2 : '2',
        3 : '3',
        4 : '4',
        5 : '5',
        6 : '6',
        7 : '7',
        8 : '8',
        9 : '9',
        10 : '10',
        11 : '11',
        12 : '12',
        13 : '13',
        14 : '14',
        15 : '15',
        16 : '16',
        17 : '17',
        18 : '18',
        19 : '19',
        20 : '20',
    },
    callback: function(cmd, val) {
        var editor = this;
        var $button = editor.customInsertButton.get();
        $button.css({'border-width' : val+'px'});
    },
    refreshOnShow: function(btn, dropdown) {
        var editor = this;
        var $button = editor.customInsertButton.get();
        var border = $button.css('border-width') ? $button.css('border-width') : 0;
        border = border.toString().replace('px','');
        $(dropdown).find('[data-param1="' + border + '"]').addClass('fr-active');
    }
});

$.FroalaEditor.RegisterCommand('customButtonRadius', {
    icon: 'customButtonRadius',
    title: 'Button Radius',
    type: 'dropdown',
    options: {
        0 : '0',
        1 : '1',
        2 : '2',
        3 : '3',
        4 : '4',
        5 : '5',
        6 : '6',
        7 : '7',
        8 : '8',
        9 : '9',
        10 : '10',
        11 : '11',
        12 : '12',
        13 : '13',
        14 : '14',
        15 : '15',
        16 : '16',
        17 : '17',
        18 : '18',
        19 : '19',
        20 : '20',
    },
    callback: function(cmd, val) {
        var editor = this;
        var $button = editor.customInsertButton.get();
        $button.css({'border-radius' : val+'px'});
    },
    refreshOnShow: function(btn, dropdown) {
        var editor = this;
        var $button = editor.customInsertButton.get();
        var radius = $button.css('border-radius') ? $button.css('border-radius') : 0;
        radius = radius.toString().replace('px','');
        $(dropdown).find('[data-param1="' + radius + '"]').addClass('fr-active');
    }
});

$.FroalaEditor.RegisterCommand('customButtonAlign', {
    icon: 'customButtonAlign',
    title: 'Button Align',
    type: 'dropdown',
    options: {
        'left': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path d='M3 5h18v2H3z'/><path d='M3 11h12v2H3z'/><path d='M3 17h6v2H3z'/></svg>",
        'center': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path d='M3 5h18v2H3z'/><path d='M6 11h12v2H6z'/><path d='M9 17h6v2H9z'/></svg>",
        'right': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path d='M3 5h18v2H3z'/><path d='M9 11h12v2H9z'/><path d='M15 17h6v2h-6z'/></svg>"
    },
    html: function() {
        return '\
            <ul class="fr-dropdown-list" role="presentation">\
                <li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="customButtonAlign" data-param1="left" title="' + $.FroalaEditor.LANGUAGE[LANG].translation['Align Left'] + '" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M3 11h12v2H3z"/><path d="M3 17h6v2H3z"/></svg></a></li>\
                <li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="customButtonAlign" data-param1="center" title="' + $.FroalaEditor.LANGUAGE[LANG].translation['Align Center'] + '" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M6 11h12v2H6z"/><path d="M9 17h6v2H9z"/></svg></a></li>\
                <li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="customButtonAlign" data-param1="right" title="' + $.FroalaEditor.LANGUAGE[LANG].translation['Align Right'] + '" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 5h18v2H3z"/><path d="M9 11h12v2H9z"/><path d="M15 17h6v2h-6z"/></svg></a></li>\
            </ul>';
    },
    callback: function(cmd, val) {
        var editor = this;
        var $button = editor.customInsertButton.get();
        if($button.parents('div:first').get(0) == $(editor.$el).get(0)) {
            $button.wrap('<div style="text-align: ' + val + '">');
        } else {
            $button.parents('div:first').css('text-align', val);
        }
        editor.customInsertButton.drawResizer();
        setTimeout(function() {
            editor.customInsertButton.refreshToolbar();
        },50);
        $('button[data-cmd="customButtonAlign"]').html($('[data-cmd="customButtonAlign"][data-param1="' + val +'"]').html());
    },
    refreshOnShow: function($btn, $dropdown) {
        var editor = this;
        var $button = editor.customInsertButton.get();
        var align = 'left';
        align = $button.parents('div:first').css('text-align');
        if(!align) {
            $dropdown.find('[data-param1="left"]').addClass('fr-active');
        } else {
            align = align.toLowerCase();
            if(align == 'start') align = 'left';
            $dropdown.find('[data-param1="' + align +'"]').addClass('fr-active');
        }
    }
});

$.FroalaEditor.RegisterCommand('customButtonLink', {
    icon: 'customButtonLink',
    title: 'Link',
    callback: function() {
        var editor = this;
        editor.link.showInsertPopup();
        editor.selection.setAfter(editor.customInsertButton.get()[0]);
        $('button[data-cmd="customButtonLink"]').addClass('active');
    }
});

$.FroalaEditor.RegisterCommand('customImageLink', {
    icon: 'customImageLink',
    title: 'Link',
    callback: function() {
        var editor = this;
        editor.image.linkimage = editor.image.get();
        editor.image.exitEdit(true);
        editor.selection.setAfter(editor.image.linkimage);
        editor.link.showInsertPopup();
    }
});

$.FroalaEditor.RegisterCommand('customButtonUnlink', {
    icon: 'customButtonUnlink',
    title: 'Unlink',
    callback: function() {
        var editor = this;
        var $button = editor.customInsertButton.get();
        if($button.length) {
            $button.removeAttr('href')
                  .removeAttr('data-href')
                  .removeAttr('data-external-link')
                  .removeAttr('data-user-link')
                  .removeAttr('attr-flink')
                  .removeAttr('attr-bookmark')
                  .removeAttr('target');
        }
    },
});

$.FroalaEditor.RegisterCommand('customButtonDetail', {
    icon: 'settingCustomButton',
    title: 'Detail Setting',
    callback: function() {
        var editor = this;
        // editor.customInsertButton.hideToolbar();
        editor.customInsertButton.showPopup();
        // $(editor.popups.get('customInsertButton.toolbar')).addClass('always');
    }
});

$.FroalaEditor.RegisterCommand('customButtonLinkInsert', {
    callback: function() {
        var editor = this;
        var $button = editor.customInsertButton.get();
        var $link_popup = $(editor.popups.get('link.insert'));
        var link_type = $link_popup.find('.link-content .link-type.active > div').attr('class');
        var link_val = $link_popup.find('input[name="href"]').val();


        $button.attr('href', link_val).attr('data-href', link_val).attr('data-external-link', '').attr('data-user-link', '').attr('attr-flink', '').attr('attr-bookmark', '');

        switch(link_type) {
            case 'link-out' :
                if(link_val) {
                    if(link_val.toLowerCase().indexOf('http://') == -1 && link_val.toLowerCase().indexOf('https://') == -1 && link_val.toLowerCase().indexOf('tel:') == -1) link_val = 'http://' + link_val;
                }
                $button.attr('data-external-link', link_val);
                break;
            case 'link-menu' :
                $button.attr('data-user-link', link_val);
                break;
            case 'link-bookmark' :
                var val = $link_popup.find('input[name="attr-bookmark"]').val();
                $button.attr('attr-bookmark', val);
                break;
            case 'link-file' :
                var val = $link_popup.find('input[name="attr-flink"]').val();
                $button.attr('attr-flink', val);
                break;
            case 'link-default' :
                $button.removeAttr('href')
                      .removeAttr('data-href')
                      .removeAttr('data-external-link')
                      .removeAttr('data-user-link')
                      .removeAttr('attr-flink')
                      .removeAttr('attr-bookmark')
                      .removeAttr('target');
                break;
        }
        var chk_new_win = $link_popup.find('input[name="target"]').prop('checked');
        if(chk_new_win) {
            $button.attr('target', '_blank');
        } else {
            $button.attr('target', '');
        }
        editor.popups.hide('link.insert');
    }
});

$.FroalaEditor.RegisterCommand('customImageLinkInsert', {
    callback: function() {
        var editor = this;
        var $image = $(editor.image.linkimage);
        var $link_popup = $(editor.popups.get('link.insert'));
        var link_type = $link_popup.find('.link-content .link-type.active > div').attr('class');
        var link_val = $link_popup.find('input[name="href"]').val();


        $image.attr('href', link_val).attr('data-href', link_val).attr('data-external-link', '').attr('data-user-link', '').attr('attr-flink', '').attr('attr-bookmark', '');

        switch(link_type) {
            case 'link-out' :
                if(link_val) {
                    if(link_val.toLowerCase().indexOf('http://') == -1 && link_val.toLowerCase().indexOf('https://') == -1 && link_val.toLowerCase().indexOf('tel:') == -1) link_val = 'http://' + link_val;
                }
                $image.attr('data-external-link', link_val);
                break;
            case 'link-menu' :
                $image.attr('data-user-link', link_val);
                break;
            case 'link-bookmark' :
                var val = $link_popup.find('input[name="attr-bookmark"]').val();
                $image.attr('attr-bookmark', val);
                break;
            case 'link-file' :
                var val = $link_popup.find('input[name="attr-flink"]').val();
                $image.attr('attr-flink', val);
                break;
            case 'link-default' :
                $image.removeAttr('href')
                      .removeAttr('data-href')
                      .removeAttr('data-external-link')
                      .removeAttr('data-user-link')
                      .removeAttr('attr-flink')
                      .removeAttr('attr-bookmark')
                      .removeAttr('target');
                break;
        }
        var chk_new_win = $link_popup.find('input[name="target"]').prop('checked');
        if(chk_new_win) {
            $image.attr('target', '_blank');
        } else {
            $image.attr('target', '');
        }

        editor.image.edit(editor.image.linkimage);
    }
});

// Object.assign(FroalaEditor.DEFAULTS, {
//     popupButtons: ['back', '|', 'popupButton1', 'popupButton2'],
// });

$.FroalaEditor.PLUGINS.customInsertButton = function(editor) {
    function init() {
        // $(editor.$el).find('.fr-custom-button').attr('contenteditable', false);

        $(editor.$el).find('.fr-custom-button').each(function() {
            $(this).addClass('fr-inner');

            if($(this).attr('class').indexOf('fr-cst-btn-') == -1) {
                var random_num = Math.floor((Date.now() + Math.random()) * 1000);
                $(this).addClass('fr-cst-btn-' + random_num);
            }

            btnInvisibleSpace();
        });

        $(editor.$el).on('click', '.fr-custom-button', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('.fr-custom-button').removeClass('fr-active');
            $(this).addClass('fr-active');
            // editor.selection.save();
            drawResizer();
            showToolbar();
            // editor.selection.clear();

            if(this != $(editor.selection.element()).closest('.fr-custom-button').get(0)) {
                editor.selection.setAtEnd(this);
                editor.selection.restore();
            }
        });

        $(editor.$el).on('mousedown', function(e) {
            if(!$(e.target).hasClass('fr-custom-button')) {
                $('.fr-custom-button.fr-active').removeClass('fr-active');
                hidePopup();
                removeResizer();
            }
        });
    }

    function btnInvisibleSpace() {
        $(editor.$el).find('.fr-custom-button').each(function() {
            $(this).addClass('fr-inner');
            // if($(this).prev().length) {
            //     if($(this).prev().text().charCodeAt(0) != 8204) 
            //         $(this).before('<span>&zwnj;</span>');
            // } else {
            //     $(this).before('<span>&zwnj;</span>');
            // }

            // if($(this).next().length) {
            //     if($(this).next().text().charCodeAt(0) != 8204) 
            //         $(this).after('<span>&zwnj;</span>');
            // } else {
            //     $(this).after('<span>&zwnj;</span>');
            // }

            if($(this).contents().length) {
                if($(this).find('span:last').length == 0 && $($(this).contents()[0]).text().charCodeAt(0) != 8204 && $($(this).contents()[0]).text().charCodeAt(0) != 8203) {
                    $(this).prepend('&#8204;');
                } else {
                    if($(this).find('span:last').length > 0) {

                        if($($(this).find('span:last').parent().contents()[0]).text().charCodeAt(0) != 8204 && $($(this).find('span:last').parent().contents()[0]).text().charCodeAt(0) != 8203) {
                            $(this).find('span:last').before('&#8204;');
                        }

                        // $(this).find('span:last').parent().contents().each(function() { 
                        //     if($(this).text().charCodeAt(0) == 8204 && $(this).text().length == 1) {
                        //         $(this).remove();
                        //     }
                        // });
                    }
                }
            }
            if($(this).parent().contents().length) {
                var $content = $(this).parent().contents();
                $content.each(function(idx) {
                    if(!$(this).hasClass('fr-custom-button')) return;
                    if(idx < $content.length && $($content[idx-1]).text().charCodeAt(0) != 8204 && $($content[idx-1]).text().charCodeAt(0) != 8203) {
                        $(this).before('&#8204;');
                        // console.log('insert zerowidth');
                    }

                    if(idx+1 <= $content.length && $($content[idx-1]).text().charCodeAt(0) != 8204 && $($content[idx-1]).text().charCodeAt(0) != 8203) {
                      $(this).after('&#8204;');
                    }
                });
                // if($($(this).parent().contents()[0]).text().charCodeAt(0) != 8204) {
                //     $(this).parent().prepend('&zwnj;');
                // }

                // if($($(this).parent().contents()[$(this).parent().contents().length-1]).text().charCodeAt(0) != 8204) {
                //     $(this).parent().append('&zwnj;');   
                // }
            }

            // if($(this).contents().length) {
            //     if($($(this).contents()[0]).text().charCodeAt(0) != 8204) {
            //         $(this).prepend('&zwnj;');
            //     }

            //     if($($(this).contents()[$(this).contents().length-1]).text().charCodeAt(0) != 8204) {
            //         $(this).append('&zwnj;');
            //     }
            // }

            // $(this).find('span:first').prepend('<span>' + $.FroalaEditor.INVISIBLE_SPACE + '</span>');
        });
    }

    function get() {
        return $(editor.$el).find('.fr-custom-button.fr-active');
    }

    function initPopup() {
        var popup_buttons = '';
        var template = { 
            buttons: popup_buttons,
            custom_layer: '\
            <div style="width: 100%; height: 100%; padding-top: 24px;">\
                <div style="height: 65px; background-color: #ffb300; padding: 20px 25px;">\
                    <span style="color: #ffffff; font-size: 18px;">버튼설정</span>\
                    <span style="color: #ffffff;"><</span>\
                    <span style="fill: #ffffff"><svg viewBox="0 0 20 20" width="20" height="20"><polygon points="20 1.06 18.94 0 10 8.94 1.06 0 0 1.06 8.94 10 0 18.94 1.06 20 10 11.06 18.94 20 20 18.94 11.06 10 "></polygon></svg></span>\
                </div>\
                <div>\
                    <div style="padding: 30px 25px;">\
                        <div>\
                            <div class="cog-row">\
                                <div>정렬</div>\
                                <div><div class="btn-group"><button>좌측</button><button>가운데</button><button>우측</button></div></div>\
                            </div>\
                            <div class="cog-row">\
                                <div>좌우여백</div>\
                                <div>\
                                    <div class="lr-mg-value cog-btn-slider-value"></div>\
                                    <div class="lr-mg-slider cog-btn-slider"></div>\
                                </div>\
                            </div>\
                            <div class="cog-row">\
                                <div>상하여백</div>\
                                <div>\
                                    <div class="ud-mg-value cog-btn-slider-value"></div>\
                                    <div class="ud-mg-slider cog-btn-slider"></div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                    <div style="padding: 30px 25px;">\
                        <div>\
                            <div class="cog-row">\
                                <div>텍스트</div>\
                                <div class="button-text-viewer">\
                                    <div class="button-text"></div>\
                                    <div class="btn-button-text-edit"><svg width="14" height="14" viewBox="0 0 12 12"><path d="M11.56 0.57l-0.13-0.13C11.14 0.15 10.76 0 10.37 0 9.99 0 9.6 0.15 9.31 0.44L0.75 9 0 12l3-0.75 8.56-8.56C12.15 2.1 12.15 1.15 11.56 0.57zM2.49 10.35l-1.11 0.28 0.28-1.11 6.58-6.58 0.84 0.84L2.49 10.35zM10.85 1.98L9.77 3.06 8.94 2.23l1.08-1.08C10.15 1.02 10.29 1 10.37 1s0.23 0.02 0.35 0.15l0.13 0.13C11.05 1.47 11.05 1.79 10.85 1.98z"></path></svg></div>\
                                </div>\
                                <div class="button-text-editor" style="display: none;">\
                                    <div>\
                                        <textarea name="btn_text" rows="2"></textarea>\
                                        <span class="btn-button-text-cancel"><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><rect x="-1.16" y="3.5" transform="matrix(0.7071 0.7071 -0.7071 0.7071 4 -1.6569)" width="10.31" height="1"></rect><rect x="-1.16" y="3.5" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 9.6569 4)" width="10.31" height="1"></rect></svg></span>\
                                        <span class="btn-button-text-ok"><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10"><polygon points="6 10 1 5 2.4 3.6 6 7.2 12.6 0.6 14 2 "></polygon></svg></span>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="cog-row">\
                                <div>폰트</div><div></div>\
                            </div>\
                            <div class="cog-row">\
                                <div>기본 컬러</div>\
                                <div>\
                                    <div class="cog-detail-row">\
                                        <div>폰트</div><div></div><div></div>\
                                    </div>\
                                    <div class="cog-detail-row">\
                                        <div>배경</div><div class="bs-bg-picker cog-btn-colpick" data-cmd="btnBsBgColor"></div><div class="bs-bg-opa-value"></div><div class="bs-bg-opa-slider cog-btn-slider"></div>\
                                    </div>\
                                    <div class="cog-detail-row">\
                                        <div>테두리</div><div class="bs-bd-picker cog-btn-colpick" data-cmd="btnBsBdColor"></div><div class="bs-bd-opa-value"></div><div class="bs-bd-opa-slider cog-btn-slider"></div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="cog-row">\
                                <div>롤오버 컬러</div>\
                                <div>\
                                    <div>폰트</div><div></div><div></div>\
                                    <div>배경</div><div></div><div class="hv-bg-opa-value"></div><div class="hv-bg-opa-slider cog-btn-slider"></div>\
                                    <div>테두리</div><div></div><div class="hv-bd-opa-value"></div><div class="hv-bd-opa-slider cog-btn-slider"></div>\
                                </div>\
                            </div>\
                            <div class="cog-row" style="display: none;">\
                                <div>효과</div><div></div>\
                            </div>\
                            <div class="cog-row">\
                                <div>내부 좌우여백</div>\
                                <div>\
                                    <div class="lr-pd-value cog-btn-slider-value"></div>\
                                    <div class="lr-pd-slider cog-btn-slider"></div>\
                                </div>\
                            </div>\
                            <div class="cog-row">\
                                <div>내부 상하여백</div>\
                                <div>\
                                    <div class="ud-pd-value cog-btn-slider-value"></div>\
                                    <div class="ud-pd-slider cog-btn-slider"></div>\
                                </div>\
                            </div>\
                            <div class="cog-row">\
                                <div>테두리 두께</div>\
                                <div>\
                                    <div class="bd-value cog-btn-slider-value"></div>\
                                    <div class="bd-slider cog-btn-slider"></div>\
                                </div>\
                            </div>\
                            <div class="cog-row">\
                                <div>라운딩</div>\
                                <div>\
                                    <div class="round-value cog-btn-slider-value"></div>\
                                    <div class="round-slider cog-btn-slider"></div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            '
        }

        var $popup = editor.popups.create('customInsertButton.popup', template);
        $($popup).addClass('fr-insert-custom-button');

        $($popup).on('mouseup', function(e) {
            if($('.fr-insert-custom-button').has($(e.target).length) || $('.fr-insert-custom-button')[0] == e.target) {
                $($popup).addClass('fr-active');
            }
        });

        $($popup).on('mouseup', function() {
            $($popup).find('.cog-btn-slider').each(function() {
                if($(this).data('slider')) {
                    if($(this).data('slider').inDrag) $(this).data('slider').mouseup();   
                }
            });
        });

        $($popup).find('.btn-button-text-edit').on('click', function() {
            $($popup).find('.button-text-viewer').hide();
            $($popup).find('.button-text-editor').show();
            $($popup).find('.button-text-editor [name="btn_text"]').val($($popup).find('.button-text-viewer .button-text').text());
        });

        $($popup).find('.btn-button-text-cancel').on('click', function() {
            $($popup).find('.button-text-viewer').show();
            $($popup).find('.button-text-editor').hide();
            $($popup).find('.button-text-editor [name="btn_text"]').val("");
        })

        $($popup).find('.btn-button-text-ok').on('click', function() {
            var $button = get();
            var new_text = $($popup).find('.button-text-editor [name="btn_text"]').val();
            $button.text(new_text);
            $($popup).find('.button-text-viewer .button-text').text(new_text);
            $($popup).find('.button-text-viewer').show();
            $($popup).find('.button-text-editor').hide();
            $($popup).find('.button-text-editor [name="btn_text"]').val("");
            drawResizer();
            refreshToolbar();
        });


        $($popup).find('.cog-btn-colpick').colpick({
            color:'#0088CC',
            layout : 'hex',
            extend : true,
            onSubmit: function (hsb, hex, rgb) {
                hex = hex.toUpperCase();
                // $('.fr-toolbar.fr-inline').removeClass('always');
                $(this.el).data('value', '#' + hex);
                $(this.el).colpickHide();
                $(this.el).css('background-color', '#'+hex);

                if(typeof SETTINGS.favcolor == 'undefined') SETTINGS.favcolor = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000'];
                if(hex && SETTINGS.favcolor.indexOf('#' +hex) == -1) {
                    if(MODE == 'c' || MODE == 'config') {
                        $.ajax({
                            url:'/config/setFavoriteColor',
                            type:'post',
                            data:{
                                'sid' : SID,
                                'color' : '#'+hex,
                            },
                            dataType:'json',
                            success:function() {
                                SETTINGS.favcolor.push('#'+hex);
                                if(SETTINGS.favcolor.length > $.FroalaEditor.FAV_COLORS_COUNT) {
                                    SETTINGS.favcolor.splice(0, SETTINGS.favcolor.length - $.FroalaEditor.FAV_COLORS_COUNT);
                                }
                            }
                        });
                    } else {
                        SETTINGS.favcolor.push('#'+hex);
                        if(SETTINGS.favcolor.length > $.FroalaEditor.FAV_COLORS_COUNT) {
                            SETTINGS.favcolor.splice(0, SETTINGS.favcolor.length - $.FroalaEditor.FAV_COLORS_COUNT);
                        }
                    }
                }
            },
            onHide: function(picker) {
                $(picker).removeClass('show-picker');
                $($(picker).data('colpick').el).removeClass('active');
            },
            onBeforeShow: function() {
                $(this).toggleClass('active');
            },
            onShow: function() {

                var $colpick_layer = $('#' + $(this).data('colpickId'));
                $colpick_layer.find('.nav-pills').hide();
                var hex = $(this).data('value');
                $(this).colpickSetColor(hex.replace('#',''));

                $('.colpick_hex.extend .fav-row').remove();
                if(typeof SETTINGS.favcolor == 'undefined') SETTINGS.favcolor = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000'];
                var favcolor_html = '';
                if(SETTINGS.favcolor.length) {
                    var gap = $.FroalaEditor.FAV_COLORS_COUNT - SETTINGS.favcolor.length;
                    for(var i=0; i<gap; i++) {
                        if(i==0) {
                            SETTINGS.favcolor.unshift('#000000');
                        } else {
                            SETTINGS.favcolor.unshift('#FFFFFF');
                        }
                    }
                    var favcolor_arr = SETTINGS.favcolor.slice();
                    favcolor_arr.reverse();
                    $(favcolor_arr).each(function() {
                        favcolor_html += '<span class="colpick-select-color fav-select-color" style="background: ' + this + '" data-color="' + this + '"></span>';
                    });
                }
                if(favcolor_html) {
                    $('.colpick_hex.extend .col-ex-item.color-set').prepend('<div class="fav-row">' + favcolor_html + '</div>');
                }
                var $trigger = $(this);

                if(($trigger.offset().top + $trigger.outerHeight() + $colpick_layer.outerHeight()) > window.innerHeight) {
                    var top = $trigger.offset().top;
                    $colpick_layer.css('top',(Number(top)-201)+'px');
                }
            }
        });


        $($popup).on('mousedown', function(e) {
            var container = $('.bs-bg-picker');
            if(e.target != $('.bs-bg-picker').get(0)) {
                $('.bs-bg-picker').colpickHide();
            }

            var container = $('.bs-bd-picker');
            
            if(e.target != $('.bs-bd-picker').get(0)) {
                $('.bs-bd-picker').colpickHide();
            }
        });

        return $popup;
    }

    function initToolbar() {
        var popup_buttons = '';
        var popupButtons = ['customButtonLink'/*,'customButtonUnlink'*/,'customButtonColor','customButtonRadius','customButtonBorder','customButtonAlign','customButtonPaddingH','customButtonPaddingV'/*,'customButtonMargin','customButtonInsert'*/,'customButtonCopy','custom-button-enter','customButtonRemove'];
        popup_buttons += '<div class="fr-buttons">';
        popup_buttons += editor.button.buildList(popupButtons);
        popup_buttons += '</div>';
        var template = { buttons: popup_buttons };
        var $toolbar = editor.popups.create('customInsertButton.toolbar', template);
        $($toolbar).addClass('fr-custom-button-toolbar');
        editor.popups.show('customInsertButton.toolbar');
        editor.popups.hide('customInsertButton.toolbar');
        return $toolbar;
    }

    function showPopup() {
        var $popup = editor.popups.get('customInsertButton.popup');
        if(!$popup) $popup = initPopup();
        // editor.popups.setContainer('customInsertButton.popup', editor.$tb);

        var $button = get();

        var lr_mg = ud_mg = lr_pd = ud_pd = bd = round = 0;
        var text = $button.text();
        var bg_color = $button.css('background-color');
        var bd_color = $button.css('border-color');

        lr_mg   = Number($button.css('margin-left').replace('px', ''));
        ud_mg   = Number($button.css('margin-top').replace('px', ''));
        lr_pd   = Number($button.css('padding-left').replace('px', ''));
        ud_pd   = Number($button.css('padding-top').replace('px', ''));
        bd      = Number($button.css('border-width').replace('px', ''));
        round   = Number($button.css('border-radius').replace('px', ''));

        $($popup).find('.lr-mg-value').text(lr_mg);
        $($popup).find('.ud-mg-value').text(ud_mg);
        $($popup).find('.lr-pd-value').text(lr_pd);
        $($popup).find('.ud-pd-value').text(ud_pd);
        $($popup).find('.bd-value').text(bd);
        $($popup).find('.round-value').text(round);

        $($popup).find('.button-text').text(text);

        $($popup).find('.bs-bg-picker').attr('data-value', bg_color).data('value', bg_color).css('background-color', bg_color);
        $($popup).find('.bs-bd-picker').attr('data-value', bd_color).data('value', bd_color).css('background-color', bd_color);

        $($popup).find('.lr-mg-slider').slider({
            'orientation': 'horizontal',
            'min' : 0,
            'max' : 20,
            'step' : 1,
            'value' : lr_mg,
            'handle' : 'round',
            // 'reversed' : true,
            'tooltip' : 'hide',
        }).on('slide', function(data) {
            $($popup).find('.lr-mg-value').text(data.value);
            var $button = get();
            $button.css({'margin-left': data.value, 'margin-right': data.value});
            drawResizer();
            refreshToolbar();
        }).on('slideStop', function(data) {
            $($popup).find('.lr-mg-value').text(data.value);
            var $button = get();
            $button.css({'margin-left': data.value, 'margin-right': data.value});
            drawResizer();
            refreshToolbar();
        });
        $($popup).find('.ud-mg-slider').slider({
            'orientation': 'horizontal',
            'min' : 0,
            'max' : 20,
            'step' : 1,
            'value' : ud_mg,
            'handle' : 'round',
            // 'reversed' : true,
            'tooltip' : 'hide',
        }).on('slide', function(data) {
            $($popup).find('.ud-mg-value').text(data.value);
            var $button = get();
            $button.css({'margin-top': data.value, 'margin-bottom': data.value});
            drawResizer();
            refreshToolbar();
        }).on('slideStop', function(data) {
            $($popup).find('.ud-mg-value').text(data.value);
            var $button = get();
            $button.css({'margin-top': data.value, 'margin-bottom': data.value});
            drawResizer();
            refreshToolbar();
        });

        $($popup).find('.lr-pd-slider').slider({
            'orientation': 'horizontal',
            'min' : 0,
            'max' : 20,
            'step' : 1,
            'value' : lr_pd,
            'handle' : 'round',
            // 'reversed' : true,
            'tooltip' : 'hide',
        }).on('slide', function(data) {
            $($popup).find('.lr-pd-value').text(data.value);
            var $button = get();
            $button.css({'padding-left': data.value, 'padding-right': data.value});
            drawResizer();
            refreshToolbar();
        }).on('slideStop', function(data) {
            $($popup).find('.lr-pd-value').text(data.value);
            var $button = get();
            $button.css({'padding-left': data.value, 'padding-right': data.value});
            drawResizer();
            refreshToolbar();
        });

        $($popup).find('.ud-pd-slider').slider({
            'orientation': 'horizontal',
            'min' : 0,
            'max' : 20,
            'step' : 1,
            'value' : ud_pd,
            'handle' : 'round',
            // 'reversed' : true,
            'tooltip' : 'hide',
        }).on('slide', function(data) {
            $($popup).find('.ud-pd-value').text(data.value);
            var $button = get();
            $button.css({'padding-top': data.value, 'padding-bottom': data.value});
            drawResizer();
            refreshToolbar();
        }).on('slideStop', function(data) {
            $($popup).find('.ud-pd-value').text(data.value);
            var $button = get();
            $button.css({'padding-top': data.value, 'padding-bottom': data.value});
            drawResizer();
            refreshToolbar();
        });

        $($popup).find('.bd-slider').slider({
            'orientation': 'horizontal',
            'min' : 0,
            'max' : 20,
            'step' : 1,
            'value' : bd,
            'handle' : 'round',
            // 'reversed' : true,
            'tooltip' : 'hide',
        }).on('slide', function(data) {
            $($popup).find('.bd-value').text(data.value);
            var $button = get();
            $button.css({'border-width': data.value});
            drawResizer();
            refreshToolbar();
        }).on('slideStop', function(data) {
            $($popup).find('.bd-value').text(data.value);
            var $button = get();
            $button.css({'border-width': data.value});
            drawResizer();
            refreshToolbar();
        });

        $($popup).find('.round-slider').slider({
            'orientation': 'horizontal',
            'min' : 0,
            'max' : 20,
            'step' : 1,
            'value' : round,
            'handle' : 'round',
            // 'reversed' : true,
            'tooltip' : 'hide',
        }).on('slide', function(data) {
            $($popup).find('.round-value').text(data.value);
            var $button = get();
            $button.css('border-radius', data.value);
            drawResizer();
            refreshToolbar();
        }).on('slideStop', function(data) {
            $($popup).find('.round-value').text(data.value);
            var $button = get();
            $button.css('border-radius', data.value);
            drawResizer();
            refreshToolbar();
        });

        editor.popups.show('customInsertButton.popup');
    }

    function showToolbar() {
        console.log('button toolbar show');
        var $toolbar = editor.popups.get('customInsertButton.toolbar');
        if(!$toolbar) $toolbar = initToolbar();
        // editor.popups.setContainer('customInsertButton.toolbar', editor.$box);
        // editor.popups.show('customInsertButton.toolbar');
        $toolbar.addClass('fr-active');
        var $button = get();

        if($button.length) {
            var align = 'left';
            align = $button.parents('div:first').css('text-align');

            switch (align) {
                case 'left' :
                    $('button[data-cmd="customButtonAlign"]').html(FroalaEditor.COMMANDS.customButtonAlign.options.left);
                    break;
                case 'center' :
                    $('button[data-cmd="customButtonAlign"]').html(FroalaEditor.COMMANDS.customButtonAlign.options.center);
                    break;
                case 'right' : 
                    $('button[data-cmd="customButtonAlign"]').html(FroalaEditor.COMMANDS.customButtonAlign.options.right);
                    break;
                default: 
                    $('button[data-cmd="customButtonAlign"]').html(FroalaEditor.COMMANDS.customButtonAlign.options.left);
                    break;

            }
        }

        refreshToolbar();
    }

    function refreshToolbar() {
        var $resizer = $('.fr-button-resizer'), $toolbar = editor.popups.get('customInsertButton.toolbar');

        if(!get().length) {
            // editor.popups.hide('customInsertButton.toolbar');
            if($toolbar) $toolbar.removeClass('fr-active');
            if(editor.selection.isCollapsed()) editor.toolbar.hide();
            return false;
        } else {
            var isLink = get().attr('href') ? true : false;
        }

        if(!isLink) {
            $($toolbar).find('[data-cmd="customButtonUnlink"]').hide();
        } else {
            $($toolbar).find('[data-cmd="customButtonUnlink"]').show();
        }

        var toolbar_top = 0, toolbar_left = 0;
        toolbar_top = $resizer.offset().top + $resizer.outerHeight() - 7;
        toolbar_left = $resizer.offset().left + $resizer.outerWidth() / 2 - $($toolbar).outerWidth() / 2;

        $($toolbar).css({'left' : toolbar_left, 'right' : '' });

        if((toolbar_left + $($toolbar).outerWidth()) > window.innerWidth) {
            $($toolbar).css({'left' : '', 'right' : '0' });
        } 

        if(toolbar_left < 0) {
            $($toolbar).css({'left' : '0', 'right': ''});
        } 

        if(toolbar_top + $($toolbar).outerHeight(true) > $(window).height()) {
            toolbar_top = toolbar_top - ($resizer.outerHeight() + $($toolbar).outerHeight(true));
        }

        $($toolbar).css({'top' : toolbar_top });

        setTimeout(function() {
            if(!get().length) {
                // editor.popups.hide('customInsertButton.toolbar');
                $toolbar.removeClass('fr-active');
                if(!editor.selection.isCollapsed()) editor.toolbar.show();
            } else {
                if(editor.selection.isCollapsed()) {
                    editor.toolbar.hide();
                    $toolbar.addClass('fr-active');
                    if(isLink) {
                        $toolbar.find('[data-cmd="customButtonLink"]').addClass('fr-active');
                    }
                } else {
                    // editor.popups.hide('customInsertButton.toolbar');
                    $toolbar.removeClass('fr-active');
                    editor.toolbar.show();
                }
            }
        });
    }


    function hidePopup() {
        editor.popups.hide('customInsertButton.popup');
        $(editor.popups.get('customInsertButton.toolbar')).removeClass('always');
    }

    function hideToolbar() {
        editor.popups.hide('customInsertButton.toolbar');
    }

    function initResizer() {
        $(editor.$box).find('.fr-button-resizer').remove();

        var $resizer = $('<div class="fr-button-resizer"></div>');
        $resizer.hide();
        $(editor.$wp).append($resizer);
        return $resizer;
    }

    function removeResizer() {
        $(editor.$box).find('.fr-button-resizer').remove();
    }

    function drawResizer() {
        var focus_layer;
        if($(editor.$box).find('.fr-button-resizer').length) {
            focus_layer = $(editor.$box).find('.fr-button-resizer');
        } else {
            focus_layer = initResizer();
        }
        var target = get()[0];
        if(!target) {
            focus_layer.hide();
            return false;
        }

        var container_offset_x = $(editor.$el).offset().left;
        var container_offset_y = $(editor.$el).offset().top;

        var target_offset_x = $(target).offset().left;
        var target_offset_y = $(target).offset().top;
        var target_height = $(target).outerHeight(true);
        var target_width = $(target).outerWidth(true);
        var target_border = target.style.borderWidth;
        var target_margin_top = Number($(target).css('margin-top').replace('px', ''));
        var target_margin_bottom = Number($(target).css('margin-bottom').replace('px', ''));
        var target_margin_left = Number($(target).css('margin-left').replace('px', ''));
        var target_margin_right = Number($(target).css('margin-right').replace('px', ''));
        // target_height += target_margin_top + target_margin_bottom;
        // target_width += target_margin_left + target_margin_right;

        if(target_border) target_border = target_border.replace('px', '');
        target_border = Number(target_border);

        focus_layer.css('margin-top', target_margin_top * -1);
        focus_layer.css('margin-left', target_margin_left * -1);
        focus_layer.css('left', target_offset_x - container_offset_x);
        focus_layer.css('top', target_offset_y - container_offset_y);
        focus_layer.css('height', target_height);
        focus_layer.css('width', target_width);
        focus_layer.css('border', '1px solid #0098f7');
        focus_layer.css('position', 'absolute');
        focus_layer.show();
    }

    return {
        init: init,
        showPopup: showPopup,
        showToolbar: showToolbar,
        hidePopup: hidePopup,
        hideToolbar: hideToolbar,
        drawResizer: drawResizer,
        refreshToolbar: refreshToolbar,
        get: get,
        btnInvisibleSpace: btnInvisibleSpace
    }
}

$.FroalaEditor.PLUGINS.customInsertHR = function(editor) {
    var left_down = false;
    var right_down = false;
    var align = 'center';
    var resizerMoveLeft = function(e) {
        if(left_down == true) {
            var focus_layer = $(editor.$wp).find('.fr-hr-resizer');
            var resizer_left = focus_layer.find('.fr-left'),
                resizer_right = focus_layer.find('.fr-right');
            var $hr = get();
            align = $hr.attr('align') ? $hr.attr('align').toLowerCase() : align;
            var resizer_x_min = $(editor.$wp).offset().left;
            var resizer_x_max = $(editor.$wp).offset().left + $(editor.$wp).outerWidth();

            var offset_sx = Number(resizer_left.attr('data-sx'));
            var resizer_left_width = resizer_left.outerWidth();

            var pointer_x = 0;

            if(e.type == 'mousemove' || e.type == 'mouseup') {
                pointer_x = e.originalEvent.pageX;
            } else if(e.type == 'touchmove' || e.type == 'touchend') {
                pointer_x = e.originalEvent.changedTouches[0].pageX;
            }
            var real_gap = (offset_sx - pointer_x);

            var beforeWidth = Number(resizer_left.attr('data-swidth'));

            var xy_gap = beforeWidth + real_gap;

            if(xy_gap > $(editor.$wp).outerWidth()) xy_gap = $(editor.$wp).outerWidth();
            if(xy_gap < 10) xy_gap = 10;
            $hr.css('width', xy_gap);

            drawResizer();
            refreshToolbar();
            $('.fr-insert-hr').removeClass('fr-active');
        }
    }
    var resizerMoveRight = function(e) {
        // console.log(right_down)
        if(right_down == true) {
            var focus_layer = $(editor.$wp).find('.fr-hr-resizer');
            var resizer_left = focus_layer.find('.fr-left'),
                resizer_right = focus_layer.find('.fr-right');
            var $hr = get();
            align = $hr.attr('align') ? $hr.attr('align').toLowerCase() : align;
            var resizer_x_min = $(editor.$wp).offset().left;
            var resizer_x_max = $(editor.$wp).offset().left + $(editor.$wp).outerWidth();

            var offset_sx = Number(resizer_right.attr('data-sx'));
            var resizer_left_width = resizer_right.outerWidth();

            var pointer_x = 0;

            if(e.type == 'mousemove' || e.type == 'mouseup') {
                pointer_x = e.originalEvent.pageX;
            } else if(e.type == 'touchmove' || e.type == 'touchend') {
                pointer_x = e.originalEvent.changedTouches[0].pageX;
            }

            var real_gap = (offset_sx - pointer_x);
            var beforeWidth = Number(resizer_right.attr('data-swidth'));
            var xy_gap = beforeWidth - real_gap;

            if(xy_gap > $(editor.$wp).outerWidth()) xy_gap = $(editor.$wp).outerWidth();
            if(xy_gap < 10) xy_gap = 10;
            $hr.css('width', xy_gap);

            drawResizer();
            refreshToolbar();
            $('.fr-insert-hr').removeClass('fr-active');
        }
    }

    var resizerUp = function(e) {
        if(left_down || right_down) {
            e.preventDefault();
            e.stopPropagation();
            showPopup();
            editor.quickInsert.hide();
            editor.selection.clear();
        }
        left_down = false;
        right_down = false;
        $(editor.$wp).find('.fr-hr-resizer.fr-active').removeClass('fr-active');
        $(document).off('mousemove touchmove', resizerMoveLeft);
        $(document).off('mousemove touchmove', resizerMoveRight);
        $('.fr-hr-overlay').remove();
    }


    var resizerDown = function(e) {
        var $hr = get();
        if($(e.currentTarget).hasClass('fr-left')) {
            left_down = true;
        }
        if($(e.currentTarget).hasClass('fr-right')) {
            right_down = true;
        }
        if(e.type == 'mousedown') {
            $(e.currentTarget).attr('data-sx', e.originalEvent.pageX);
            // $(e.currentTarget).attr('data-sy', e.originalEvent.pageY);
        } else if(e.type == 'touchstart') {
            $(e.currentTarget).attr('data-sx', e.originalEvent.changedTouches[0].pageX);
            // $(e.currentTarget).attr('data-sy', e.originalEvent.changedTouches[0].pageY);
        }

        if(!$('.fr-hr-overlay').length) $('body').append('<div class="fr-hr-overlay fr-image-overlay"></div>');
        $('.fr-hr-overlay').show();
        $(e.currentTarget).attr('data-swidth', $hr.outerWidth());
        $(editor.$wp).find('.fr-hr-resizer').addClass('fr-active');
        $(document).on('mousemove touchmove', resizerMoveLeft);
        $(document).on('mousemove touchmove', resizerMoveRight);
        $(document).off('mouseup touchend', resizerUp);
        $(document).on('mouseup touchend', resizerUp);
    }
    function init() {
        $('.fr-insert-hr').remove();
        $(editor.$el).on('click', 'hr', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // $(editor.$el).focus();
            var target = this;
            editor.selection.setAfter(target);
            editor.selection.save();
            editor.quickInsert.hide();
            $('.fr-hr').removeClass('fr-active');
            $(target).addClass('fr-active');
            showPopup();
        });

        $(editor.$wp).on('click', '.fr-hr-resizer', function(e) {
            editor.selection.save();
            showPopup();
            // editor.selection.clear();
            // e.preventDefault();
            // e.stopPropagation();
            // showPopup();
        });
        $(editor.$wp).off('mousedown touchstart', '.fr-hr-resizer .fr-left, .fr-hr-resizer .fr-right', resizerDown);
        $(editor.$wp).on('mousedown touchstart', '.fr-hr-resizer .fr-left, .fr-hr-resizer .fr-right', resizerDown);

        $(editor.$el).on('mousedown', function(e) {
            if(e.target.nodeName.toLowerCase() !== 'hr' && !$('.fr-hr-resizer').has($(e.target)).length && e.target != $('.fr-hr-resizer').get(0)) {
                $('.fr-hr.fr-active').removeClass('fr-active');
                hidePopup();
            }
        });

        $(window).resize(function() {
            if(get().length) {
                drawResizer();
                refreshToolbar();
            }
        });


    }

    function get() {
        return $(editor.$box).find('.fr-hr.fr-active');
    }

    function refreshToolbar() {
        var $popup = editor.popups.get('customInsertHR.popup');
        var $resizer = $('.fr-hr-resizer');
        if(!$('.fr-hr-resizer').length) return;

        var toolbar_top = 0, toolbar_left = 0;
        toolbar_top = $resizer.offset().top + $resizer.outerHeight() - 7;
        toolbar_left = $resizer.offset().left + $resizer.outerWidth() / 2 - $($popup).outerWidth() / 2;

        $($popup).css({'left' : toolbar_left, 'right' : '' });

        if((toolbar_left + $($popup).outerWidth()) > window.innerWidth) {
            $($popup).css({'left' : '', 'right' : '0' });
        } 

        if(toolbar_left < 0) {
            $($popup).css({'left' : '0', 'right': ''});
        } 

        if(toolbar_top + $($popup).outerHeight(true) > $(window).height()) {
            toolbar_top = toolbar_top - ($resizer.outerHeight() + $($popup).outerHeight(true));
        }

        $($popup).css({'top' : toolbar_top });
    }

    function initResizer() {
        $(editor.$box).find('.fr-hr-resizer').remove();

        var $resizer = $('<div class="fr-hr-resizer"><div class="fr-handler fr-left"></div><div class="fr-handler fr-right"></div></div>');
        $resizer.hide();
        $(editor.$wp).append($resizer);
        return $resizer;
    }

    function removeResizer() {
        $(editor.$box).find('.fr-hr-resizer').remove();
    }

    function drawResizer() {
        $(editor.$tb).removeClass('always');
        var focus_layer;
        if($(editor.$box).find('.fr-hr-resizer').length) {
            focus_layer = $(editor.$box).find('.fr-hr-resizer');
        } else {
            focus_layer = initResizer();
        }
        var target = get()[0];
        if(!target) {
            focus_layer.hide();
            return false;
        }

        var container_offset_x = $(editor.$el).offset().left;
        var container_offset_y = $(editor.$el).offset().top;

        var target_offset_x = $(target).offset().left;
        var target_offset_y = $(target).offset().top;
        // var target_height = $(target).outerHeight();
        var target_height = Number($(target).css('border-bottom-width').replace('px', ''));
        var target_width = $(target).outerWidth();
        var target_margin_top = Number($(target).css('margin-top').replace('px', ''));
        var target_margin_bottom = Number($(target).css('margin-bottom').replace('px', ''));
        var target_border = target.style.borderWidth;
        if(target_border) target_border = target_border.replace('px', '');
        target_border = Number(target_border);
        target_height += target_margin_top + target_margin_bottom;
        focus_layer.css('left', target_offset_x - container_offset_x);
        focus_layer.css('top', target_offset_y - container_offset_y - target_margin_top);
        focus_layer.css('height', target_height);
        focus_layer.css('width', target_width);
        focus_layer.css('border', '1px solid #0098f7');
        focus_layer.css('position', 'absolute');
        focus_layer.show();
    }

    function initPopup() {
        var popup_buttons = '';
        var popupButtons = ['hrBorderColor','hrBorderWidth','hrAlign','hrMargin','hr-enter','hrRemove'];
        popup_buttons += '<div class="fr-buttons">';
        popup_buttons += editor.button.buildList(popupButtons);
        popup_buttons += '</div>';
        var template = { buttons: popup_buttons};
        var $popup = editor.popups.create('customInsertHR.popup', template);
        $($popup).addClass('fr-insert-hr');
        return $popup;
    }

    function showPopup() {
        var $popup = editor.popups.get('customInsertHR.popup');
        if(!$popup) $popup = initPopup();
        editor.popups.show('customInsertHR.popup');
        drawResizer();
        var $hr = get();
        if($hr.length) {
            var align = 'center';
            if($hr.is('[align]')) align = $hr.attr('align');
            $('button[data-cmd="hrAlign"]').html(FroalaEditor.ICONS['align-' + align]['NAME']);
        }
        refreshToolbar();
        popPos = $(editor.popups.get('customInsertHR.popup')).css('top').replace('px', '');
    }

    function hidePopup () {
        editor.popups.hide('customInsertHR.popup');
        $('button[data-cmd="hrBorderColor"]').removeClass('active').colpickHide();
        removeResizer();
    }

    return {
        showPopup: showPopup,
        hidePopup: hidePopup,
        init: init,
        get: get,
        drawResizer: drawResizer,
        refreshToolbar: refreshToolbar,
        left_down: left_down,
        right_down: right_down,
        resizerDown: resizerDown
    }
}

$.FroalaEditor.PLUGINS.customQuickInsert = function(editor) {
    function initPopup() {
        var popup_buttons = '';
        var popupButtons = ['insertImageButton','insertVideoButton','insertFileButton','insertTableButton','insertHR'];
        popup_buttons += editor.button.buildList(popupButtons);
        var template = { buttons: popup_buttons };
        var $popup = editor.popups.create('customQuickInsert.popup', template);
        $($popup).addClass('fr-mobile-quick-insert');
        return $popup;
    }

    function showPopup() {
        var $popup = editor.popups.get('customQuickInsert.popup');

        if(!$popup) $popup = initPopup();

        // editor.popups.setContainer('customQuickInsert.popup', $('body'));
        editor.popups.show('customQuickInsert.popup');
        // editor.popups.hide('customQuickInsert.popup');
    }

    function hidePopup () {
        editor.popups.hide('customQuickInsert.popup');
    }

    return {
        showPopup: showPopup,
        hidePopup: hidePopup
    }
}

$.FroalaEditor.PLUGINS.customInsertTable = function(editor) {
    function initPopup() {
        var popup_buttons = '';
        // if(editor.opts.popupButtons.length > 1) {
            // popup_buttons += '<div class="fr-buttons fr-tabs"><button type="button" class="fr-command fr-btn fr-back"><svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 11L7.83 11 11.425 7.405 10.01 5.991 5.416 10.586 5.414 10.584 4 11.998 4.002 12 4 12.002 5.414 13.416 5.416 13.414 10.01 18.009 11.425 16.595 7.83 13 20 13 20 13 20 11 20 11Z"></path></svg></button>';
            // popup_buttons += editor.button.buildList(editor.opts.popupButtons);
            // popup_buttons += '</div>';
        // }

        var template = {
            buttons: popup_buttons,
            custom_layer: '\
            <div class="fr-insert-table-popup" tabindex="0" style="top: 44px; left: 50%; width: 561px;" data-mouseenter-event-set="true">\
                <div class="">\
                    <div class="box-container">\
                        <div class="left-box"> \
                            <div class="row-col-box">\
                                <div class="row-cnt-box input-group">\
                                    <!-- 입력창 선택시 on 추가 --> \
                                    <label for="table_row_cnt" class="">' + $.FroalaEditor.LANGUAGE[LANG].translation['Row'] + '</label>\
                                    <input type="number" class="form-control input-sm comm-opts" name="table_row_cnt" id="table_row_cnt" value="4" data-attr="row" maxlength="3" numberOnly> \
                                    <div class="counter">\
                                        <button type="button" class="btn-row-oper" data-oper="plus"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" width="5" height="4" style=""><polygon points="0 4 4 0 8 4 "></polygon></svg></button> \
                                        <button type="button" class="btn-row-oper" data-oper="minus"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" width="5" height="4" style=""><polygon points="0 0 4 4 8 0 "></polygon></svg></button> \
                                    </div>\
                                </div> \
                                <div class="col-cnt-box input-group">\
                                    <!-- 입력창 선택시 on 추가 --> \
                                    <label for="table_col_cnt" class="">' + $.FroalaEditor.LANGUAGE[LANG].translation['Column'] + '</label>\
                                    <input type="number" class="form-control input-sm comm-opts" name="table_col_cnt" id="table_col_cnt" value="4" data-attr="col" maxlength="3" numberOnly> \
                                    <div class="counter">\
                                        <button type="button" class="btn-col-oper" data-oper="plus"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" width="5" height="4" style=""><polygon points="0 4 4 0 8 4 "></polygon></svg></button> \
                                        <button type="button" class="btn-col-oper" data-oper="minus"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" width="5" height="4" style=""><polygon points="0 0 4 4 8 0 "></polygon></svg></button> \
                                    </div>\
                                </div> \
                            </div>\
                            <!--div class="preview-title">미리보기</div-->\
                            <div class="fr-table-preview">\
                            </div>\
                        </div>\
                        <div class="right-box">\
                            <div class="style-type-box">\
                                <input type="radio" name="style_type" id="preset_style" class="" value="preset" checked="checked"> \
                                <label for="preset_style" class=""> \
                                    <div class="active">' + $.FroalaEditor.LANGUAGE[LANG].translation['Select Style'] + '</div> \
                                </label> \
                                <input type="radio" name="style_type" id="custom_style" class="" value="custom"> \
                                <label for="custom_style" class="">\
                                    <div>' + $.FroalaEditor.LANGUAGE[LANG].translation['Customize'] + '</div>\
                                </label>\
                            </div>\
                            <div class="style-box" data-value="type1">\
                                <div class="btn-style-type" data-value="type1">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" d="M0 0h53v31H0z"/><path fill="#ccc" d="M52 0H0v31h53V0h-1zM39 1v9H27V1h12zM27 11h12v9H27v-9zm-1 9H14v-9h12v9zm0-19v9H14V1h12zM1 1h12v9H1V1zm0 10h12v9H1v-9zm0 19v-9h12v9H1zm13 0v-9h12v9H14zm13 0v-9h12v9H27zm25 0H40v-9h12v9zm0-10H40v-9h12v9zm0-10H40V1h12v9z"/></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type2">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" d="M0 0h53v31H0z"/><path fill="#f3f3f3" d="M0 10h53v11H0z"/><path fill="#ccc" d="M52 0H0v31h53V0h-1zM39 1v9H27V1h12zM27 11h12v9H27v-9zm-1 9H14v-9h12v9zm0-19v9H14V1h12zM1 1h12v9H1V1zm0 10h12v9H1v-9zm0 19v-9h12v9H1zm13 0v-9h12v9H14zm13 0v-9h12v9H27zm25 0H40v-9h12v9zm0-10H40v-9h12v9zm0-10H40V1h12v9z"/></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type3">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" d="M0 0h53v31H0z"/><path fill="#f3f3f3" d="M0 10h53v11H0z"/><path fill="#ccc" d="M0 0h53v1H0z"/><path fill="#ccc" d="M0 10h53v1H0z"/><path fill="#ccc" d="M0 20h53v1H0z"/><path fill="#ccc" d="M0 30h53v1H0z"/></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type4">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" d="M0 0h53v31H0z"/><path fill="#f3f3f3" d="M0 0h53v11H0z"/><path fill="#e7e8e9" d="M53 11v-1H40V0h-1v10H27V0h-1v10H14V0h-1v10H0v1h13v9H0v1h13v10h1V21h12v10h1V21h12v10h1V21h13v-1H40v-9h13zm-39 9v-9h12v9H14zm25 0H27v-9h12v9z"/><path fill="#ccc" d="M52 0H0v31h53V0h-1zm0 30H1V1h51v29z"/></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type5">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#f8f8f8" d="M0 0h53v31H0z"/><path fill="#ebebeb" d="M0 10h53v11H0z"/><path fill="#ccc" d="M52 0H0v31h53V0h-1zM39 1v9H27V1h12zM27 11h12v9H27v-9zm-1 9H14v-9h12v9zm0-19v9H14V1h12zM1 1h12v9H1V1zm0 10h12v9H1v-9zm0 19v-9h12v9H1zm13 0v-9h12v9H14zm13 0v-9h12v9H27zm25 0H40v-9h12v9zm0-10H40v-9h12v9zm0-10H40V1h12v9z"/></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type6">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" d="M0 0h53v31H0z"/><path fill="#333" d="M0 0h53v11H0z"/><path fill="#f8f8f8" d="M0 20h53v11H0z"/><path fill="#010101" d="M0 0h53v1H0z"/><path fill="#010101" d="M0 10h53v1H0z"/><g><path fill="#e7e7e7" d="M0 20h53v1H0z"/><path fill="#e7e7e7" d="M0 30h53v1H0z"/></g></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type7">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" d="M0 0h53v31H0z"/><path fill="#333" d="M0 0h53v11H0z"/><path fill="#ebebeb" d="M0 10h14v21H0z"/><path fill="#ccc" d="M52 0H0v31h53V0h-1zM39 1v9H27V1h12zM27 11h12v9H27v-9zm-1 9H14v-9h12v9zm0-19v9H14V1h12zM1 1h12v9H1V1zm0 10h12v9H1v-9zm0 19v-9h12v9H1zm13 0v-9h12v9H14zm13 0v-9h12v9H27zm25 0H40v-9h12v9zm0-10H40v-9h12v9zm0-10H40V1h12v9z"/></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type8">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" d="M0 0h53v31H0z"/><path fill="#333" d="M0 0h14v31H0z"/><path fill="#ccc" d="M52 0H0v31h53V0h-1zM39 1v9H27V1h12zM27 11h12v9H27v-9zm-1 9H14v-9h12v9zm0-19v9H14V1h12zM1 1h12v9H1V1zm0 10h12v9H1v-9zm0 19v-9h12v9H1zm13 0v-9h12v9H14zm13 0v-9h12v9H27zm25 0H40v-9h12v9zm0-10H40v-9h12v9zm0-10H40V1h12v9z"/></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type9">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" d="M0 0h53v31H0z"/><path fill="#a3bcd0" d="M52 0H0v31h53V0h-1zM39 1v9H27V1h12zM27 11h12v9H27v-9zm-1 9H14v-9h12v9zm0-19v9H14V1h12zM1 1h12v9H1V1zm0 10h12v9H1v-9zm0 19v-9h12v9H1zm13 0v-9h12v9H14zm13 0v-9h12v9H27zm25 0H40v-9h12v9zm0-10H40v-9h12v9zm0-10H40V1h12v9z"/></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type10">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" d="M0 0h53v31H0z"/><path fill="#e5ecf2" d="M0 10h53v11H0z"/><path fill="#a3bcd0" d="M52 0H0v31h53V0h-1zM39 1v9H27V1h12zM27 11h12v9H27v-9zm-1 9H14v-9h12v9zm0-19v9H14V1h12zM1 1h12v9H1V1zm0 10h12v9H1v-9zm0 19v-9h12v9H1zm13 0v-9h12v9H14zm13 0v-9h12v9H27zm25 0H40v-9h12v9zm0-10H40v-9h12v9zm0-10H40V1h12v9z"/></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type11">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" d="M0 0h53v31H0z"/><path fill="#e5ecf2" d="M0 10h53v11H0z"/><path fill="#a3bcd0" d="M0 0h53v1H0z"/><path fill="#a3bcd0" d="M0 10h53v1H0z"/><path fill="#a3bcd0" d="M0 20h53v1H0z"/><path fill="#a3bcd0" d="M0 30h53v1H0z"/></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type12">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" d="M0 0h53v31H0z"/><path fill="#e5ecf2" d="M0 0h53v11H0z"/><path fill="#c8d7e2" d="M53 11v-1H40V0h-1v10H27V0h-1v10H14V0h-1v10H0v1h13v9H0v1h13v10h1V21h12v10h1V21h12v10h1V21h13v-1H40v-9h13zm-39 9v-9h12v9H14zm25 0H27v-9h12v9z"/><path fill="#a3bcd0" d="M52 0H0v31h53V0h-1zm0 30H1V1h51v29z"/></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type13">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fbfbfc" d="M0 0h53v31H0z"/><path fill="#e5ecf2" d="M0 10h53v11H0z"/><path fill="#a3bcd0" d="M52 0H0v31h53V0h-1zM39 1v9H27V1h12zM27 11h12v9H27v-9zm-1 9H14v-9h12v9zm0-19v9H14V1h12zM1 1h12v9H1V1zm0 10h12v9H1v-9zm0 19v-9h12v9H1zm13 0v-9h12v9H14zm13 0v-9h12v9H27zm25 0H40v-9h12v9zm0-10H40v-9h12v9zm0-10H40V1h12v9z"/></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type14">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" class="st9" d="M0 0h53v31H0z"/><path fill="#5883ab" class="st46" d="M0 0h53v11H0z"/><path fill="#e5ecf2" class="st44" d="M0 20h53v11H0z"/><path fill="#45739d" class="st47" d="M0 0h53v1H0z"/><path fill="#45739d" class="st47" d="M0 10h53v1H0z"/><g><path fill="#c8d7e2" class="st48" d="M0 20h53v1H0z"/><path fill="#c8d7e2" class="st48" d="M0 30h53v1H0z"/></g></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type15">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" class="st9" d="M0 0h53v31H0z"/><path fill="#5883ab" class="st46" d="M0 0h53v11H0z"/><path fill="#e5ecf2" class="st45" d="M0 10h14v21H0z"/><path fill="#a3bcd0" class="st41" d="M52 0H0v31h53V0h-1zM39 1v9H27V1h12zM27 11h12v9H27v-9zm-1 9H14v-9h12v9zm0-19v9H14V1h12zM1 1h12v9H1V1zm0 10h12v9H1v-9zm0 19v-9h12v9H1zm13 0v-9h12v9H14zm13 0v-9h12v9H27zm25 0H40v-9h12v9zm0-10H40v-9h12v9zm0-10H40V1h12v9z"/></svg>\
                                </div>\
                                <div class="btn-style-type" data-value="type16">\
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53 31" width="53" height="31"><path fill="#fff" class="st9" d="M0 0h53v31H0z"/><path fill="#5883ab" class="st46" d="M0 0h14v31H0z"/><path fill="#a3bcd0" class="st41" d="M52 0H0v31h53V0h-1zM39 1v9H27V1h12zM27 11h12v9H27v-9zm-1 9H14v-9h12v9zm0-19v9H14V1h12zM1 1h12v9H1V1zm0 10h12v9H1v-9zm0 19v-9h12v9H1zm13 0v-9h12v9H14zm13 0v-9h12v9H27zm25 0H40v-9h12v9zm0-10H40v-9h12v9zm0-10H40V1h12v9z"/></svg>\
                                </div>\
                            </div>\
                            <div class="custom-box" style="display: none;">\
                                <div class="custom-box-row">\
                                    <div>'+$.FroalaEditor.LANGUAGE[LANG].translation['Line style']+'</div>\
                                    <div class="border-style-box opts" data-attr="border-style" data-value="solid"> \
                                        <button type="button" class="btn-border-style-oper" data-oper="solid">\
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="23" height="23" style="fill: #222428;"><polygon points="6 6 6 23 7 23 7 7 23 7 23 6"></polygon></svg>\
                                        </button><button type="button" class="btn-border-style-oper" data-oper="dashed">\
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="23" height="23" style="fill: #222428;">\
                                                <polygon points="6 6 8 6 8 7 6 7"></polygon>\
                                                <polygon points="10 6 12 6 12 7 10 7"></polygon>\
                                                <polygon points="14 6 16 6 16 7 14 7"></polygon>\
                                                <polygon points="18 6 20 6 20 7 18 7"></polygon>\
                                                <polygon points="22 6 23 6 23 7 22 7"></polygon>\
                                                <polygon points="6 8 6 10 7 10 7 8"></polygon>\
                                                <polygon points="6 12 6 14 7 14 7 12"></polygon>\
                                                <polygon points="6 16 6 18 7 18 7 16"></polygon>\
                                                <polygon points="6 20 6 22 7 22 7 20"></polygon>\
                                                <polygon points="6 23 6 23 7 23 7 23"></polygon>\
                                            </svg>\
                                        </button><button type="button" class="btn-border-style-oper" data-oper="double">\
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="23" height="23" style="fill: #222428;"><polygon points="6 6 6 23 7 23 7 7 23 7 23 6"></polygon><polygon points="9 9 9 23 10 23 10 10 23 10 23 9"></polygon></svg>\
                                        </button><button type="button" class="btn-border-style-oper" data-oper="none">\
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="23" height="23" style="fill: #d7d7d7;"><polygon points="0 1 22 23 23 22 1 0"></polygon><polygon points="0 22 22 0 23 1 1 23"></polygon></svg>\
                                        </button> \
                                    </div> \
                                </div>\
                                <div class="custom-box-row">\
                                    <div>'+$.FroalaEditor.LANGUAGE[LANG].translation['Line width']+'</div>\
                                    <div class="border-width-box input-group">\
                                        <input type="number" class="form-control input-sm opts" name="table_border_width" id="table_border_width" value="1" data-attr="border-width" dir="auto"> \
                                        <div class="counter">\
                                            <button type="button" class="btn-border-oper" data-oper="plus">\
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" width="5" height="4" style=""><polygon points="0 4 4 0 8 4 "></polygon></svg>\
                                            </button> \
                                            <button type="button" class="btn-border-oper" data-oper="minus">\
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" width="5" height="4" style=""><polygon points="0 0 4 4 8 0 "></polygon></svg>\
                                            </button> \
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="custom-box-row">\
                                    <div>'+$.FroalaEditor.LANGUAGE[LANG].translation['Line color']+'</div>\
                                    <div>\
                                        <button type="button" style="background-color:#cccccc" class="btn-border-color-picker opts" data-attr="border-color" data-value="#cccccc" data-cmd="table-border">\
                                        </button> \
                                    </div>\
                                </div>\
                                <div class="custom-box-row">\
                                    <div>'+$.FroalaEditor.LANGUAGE[LANG].translation['Background color']+'</div>\
                                    <div>\
                                        <button type="button" style="background-color:#ffffff" class="btn-background-color-picker opts" data-attr="background-color" data-value="#ffffff" data-cmd="table-background">\
                                        </button>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="btns-area">\
                        <button type="button" class="btn btn-sm btn-default btn-cancel">' + $.FroalaEditor.LANGUAGE[LANG].translation['Table Cancel'] + '</button> \
                        <button type="button" class="btn btn-sm btn-primary btn-apply">' + $.FroalaEditor.LANGUAGE[LANG].translation['Table Insert'] + '</button> \
                    </div>\
                    <a href="javascript:;" class="close-popup"><span class=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8.71 8l7.15-7.15c0.2-0.2 0.2-0.51 0-0.71s-0.51-0.2-0.71 0L8 7.29 0.85 0.15c-0.2-0.2-0.51-0.2-0.71 0s-0.2 0.51 0 0.71L7.29 8l-7.15 7.15c-0.2 0.2-0.2 0.51 0 0.71C0.24 15.95 0.37 16 0.5 16s0.26-0.05 0.35-0.15L8 8.71l7.15 7.15c0.1 0.1 0.23 0.15 0.35 0.15s0.26-0.05 0.35-0.15c0.2-0.2 0.2-0.51 0-0.71L8.71 8z"></path></svg></span></a>\
                </div>\
            </div>\
            '
        };

        var $popup = editor.popups.create('customInsertTable.popup', template);

        var max_table_row_cnt = 10, max_table_col_cnt = 10;
        $($popup).find('input[name="style_type"], input[name="table_row_cnt"], input[name="table_col_cnt"]').on('input change', function() {

            var row_cnt = Number($('.row-cnt-box input').val());
            if(row_cnt > max_table_row_cnt) row_cnt = max_table_row_cnt;
            if(row_cnt < 1) row_cnt = 1;
            $($popup).find('.row-cnt-box input').val(row_cnt);

            var col_cnt = Number($('.col-cnt-box input').val());
            if(col_cnt > max_table_col_cnt) col_cnt = max_table_col_cnt;
            if(col_cnt < 1) col_cnt = 1;
            $($popup).find('.col-cnt-box input').val(col_cnt);

            renderPreviewTable();

            if($($popup).find('input[name="style_type"]:checked').val() == 'preset') {
                $($popup).find('.style-box').show();
                $($popup).find('.custom-box').hide();
            } else if($($popup).find('input[name="style_type"]:checked').val() == 'custom') {
                $($popup).find('.custom-box').show();
                $($popup).find('.style-box').hide();
            }
        });

        $($popup).find('.row-cnt-box .btn-row-oper').on('click', function() {
            var row_cnt = Number($('.row-cnt-box input').val());
            if($(this).data('oper') == 'plus') {
                if(row_cnt+1 >= max_table_row_cnt) row_cnt = max_table_row_cnt;
                else row_cnt += 1;  
            } else if($(this).data('oper') == 'minus') {
                if(row_cnt-1 < 1) row_cnt = 1;
                else row_cnt -= 1;  
            }

            $($popup).find('.row-cnt-box input').val(row_cnt);
            renderPreviewTable();
        });

        $($popup).find('.col-cnt-box .btn-col-oper').on('click', function() {
            var col_cnt = Number($('.col-cnt-box input').val());
            if($(this).data('oper') == 'plus') {
                if(col_cnt+1 >= max_table_col_cnt) col_cnt = max_table_col_cnt;
                else col_cnt += 1;
            } else if($(this).data('oper') == 'minus') {
                if(col_cnt-1 < 1) col_cnt = 1;
                else col_cnt -= 1;
            }
            $($popup).find('.col-cnt-box input').val(col_cnt);
            renderPreviewTable();
        });

        $($popup).find('.btn-border-oper').on('click', function() {
            var border = Number($('.border-width-box input').val());
            if($(this).data('oper') == 'plus') {
                if(border+1 > 10) border = 10;
                else border += 1;
            } else if($(this).data('oper') == 'minus') {
                if(border-1 < 1) border = 1;
                else border -= 1;
            }
            $($popup).find('.border-width-box input').val(border);
            renderPreviewTable();
        });

        $($popup).find('.btn-border-style-oper').on('click', function() {
            if($(this).data('oper') == 'double' && $($popup).find('input[name="table_border_width"]').val() < 3) $($popup).find('input[name="table_border_width"]').val(3);
            $($popup).find('.border-style-box').data('value', $(this).data('oper'));
            renderPreviewTable();
        });


        $($popup).find('input[name="table_border_width"]').on('input', function() {
            var border_width = $(this).val();
            if(border_width < 1) {
                border_width = 1;
                $($popup).find('input[name="table_border_width"]').val(border_width);
            } else if(border_width > 10) {
                border_width = 10;
                $($popup).find('input[name="table_border_width"]').val(border_width);
            }
            renderPreviewTable();
        });

        $($popup).find('.btn-style-type').on('click', function() {
            $($popup).find('.style-box').data('value', $(this).data('value'));
            renderPreviewTable();
        });

        $($popup).find('.btn-background-color-picker, .btn-border-color-picker').colpick({
            color:'#0088CC',
            layout : 'hex',
            extend : true,
            flat : isMobile() ? true : false,
            onSubmit: function (hsb, hex, rgb) {
                hex = hex.toUpperCase();
                // $('.fr-toolbar.fr-inline').removeClass('always');
                $(this.el).data('value', '#' + hex);
                $(this.el).colpickHide();
                $(this.el).css('background-color', '#'+hex);
                editor.customInsertTable.renderPreviewTable();

                if(typeof SETTINGS.favcolor == 'undefined') SETTINGS.favcolor = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000'];
                if(hex && SETTINGS.favcolor.indexOf('#' +hex) == -1) {
                    if(MODE == 'c' || MODE == 'config') {
                        $.ajax({
                            url:'/config/setFavoriteColor',
                            type:'post',
                            data:{
                                'sid' : SID,
                                'color' : '#'+hex,
                            },
                            dataType:'json',
                            success:function() {
                                SETTINGS.favcolor.push('#'+hex);
                                if(SETTINGS.favcolor.length > $.FroalaEditor.FAV_COLORS_COUNT) {
                                    SETTINGS.favcolor.splice(0, SETTINGS.favcolor.length - $.FroalaEditor.FAV_COLORS_COUNT);
                                }
                            }
                        });
                    } else {
                        SETTINGS.favcolor.push('#'+hex);
                        if(SETTINGS.favcolor.length > $.FroalaEditor.FAV_COLORS_COUNT) {
                            SETTINGS.favcolor.splice(0, SETTINGS.favcolor.length - $.FroalaEditor.FAV_COLORS_COUNT);
                        }
                    }
                }
            },
            onHide: function(picker) {
                $(picker).removeClass('show-picker');
                $($(picker).data('colpick').el).removeClass('active');
            },
            onBeforeShow: function() {
                $(this).toggleClass('active');
            },
            onShow: function() {
                var btn = this;
                if(!$(this).hasClass('active')) {
                    setTimeout(function() {
                        $(btn).colpickHide();
                    });
                }

                var $colpick_layer = $('#' + $(this).data('colpickId'));
                $colpick_layer.find('.nav-pills').hide();
                var hex = $(this).data('value');
                $(this).colpickSetColor(hex.replace('#',''));

                $('.colpick_hex.extend .fav-row').remove();
                if(typeof SETTINGS.favcolor == 'undefined') SETTINGS.favcolor = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000'];
                var favcolor_html = '';
                if(SETTINGS.favcolor.length) {
                    var gap = $.FroalaEditor.FAV_COLORS_COUNT - SETTINGS.favcolor.length;
                    for(var i=0; i<gap; i++) {
                        if(i==0) {
                            SETTINGS.favcolor.unshift('#000000');
                        } else {
                            SETTINGS.favcolor.unshift('#FFFFFF');
                        }
                    }
                    var favcolor_arr = SETTINGS.favcolor.slice();
                    favcolor_arr.reverse();
                    $(favcolor_arr).each(function() {
                        favcolor_html += '<span class="colpick-select-color fav-select-color" style="background: ' + this + '" data-color="' + this + '"></span>';
                    });
                }
                if(favcolor_html) {
                    $('.colpick_hex.extend .col-ex-item.color-set').prepend('<div class="fav-row">' + favcolor_html + '</div>');
                }
                var $trigger = $(this);

                if(($trigger.offset().top + $trigger.outerHeight() + $colpick_layer.outerHeight()) > window.innerHeight) {
                    var top = $trigger.offset().top;
                    $colpick_layer.css('top',(Number(top)-171)+'px');
                }
            }
        });

        $($popup).on('mousedown', function(e) {
            if(e.target != $('.btn-border-color-picker').get(0)) {
                $($popup).find('.btn-border-color-picker').colpickHide().removeClass('active');    
            }

            if(e.target != $('.btn-background-color-picker').get(0)) {
                $($popup).find('.btn-background-color-picker').colpickHide().removeClass('active');    
            }
        })

        $($popup).find('.btn-cancel, .close-popup').on('click', function() {
            hidePopup();
        });

        $($popup).find('.btn-apply').on('click', function() {
            // console.log(renderPreviewTable())
            var table_html = '<div class="fr-table-responsive fr-table-new">' + renderPreviewTable().outerHTML() + '</div>';
            // $table_html.find('table').css('width', '');
            var box_width = $(editor.$box).width();
            editor.html.insert(table_html);
            editor.selection.clear();
            editor.$box.find('.fr-table-new .fr-table').css('width', box_width);
            editor.$box.find('.fr-table-new').removeClass('fr-table-new');
            hidePopup();
        });

        editor.popups.onRefresh('customInsertTable.popup', function() {
            // console.log('popup refresh')
        });

        editor.popups.onHide('customInsertTable.popup', function(e) {
            // console.log(e);
            // editor.popups.get('customInsertTable.popup').remove();
            // initPopup();
            // console.log('popup hide');
        });

        renderPreviewTable();

        return $popup;
    }

    function showPopup() {
        var $popup = editor.popups.get('customInsertTable.popup');

        if(!$popup) $popup = initPopup();
        $($popup).addClass('fr-popup-custom-table');
        // editor.popups.setContainer('customInsertTable.popup', editor.$tb);

        var $btn = $('.fr-btn[data-cmd="quickInsertTableButton"]');
        if(!$btn.length) $btn = $(editor.popups.get('customQuickInsert.popup')).find('[data-cmd="insertTableButton"]');

        var left = $btn.offset().left + $btn.outerWidth(true) /2;
        var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);


        var win_height = $(window).height();
        var popup_height = $($popup).outerHeight();
        if((top + popup_height) > win_height) {
            top = win_height / 2 - popup_height / 2;
        }

        editor.popups.show('customInsertTable.popup', left, top, $btn.outerHeight());

        popPos = $(editor.popups.get('customInsertTable.popup')).css('top').replace('px', '');

    }

    function hidePopup() {
        editor.popups.hide('customInsertTable.popup');
    }

    function renderPreviewTable() {
        var $popup = editor.popups.get('customInsertTable.popup');

        var defaults = {
            'col' : 4,
            'row' : 4,
            'border-style' : 'solid',
            'border-width' : 1,
            'background-color' : 'transparent',
            'border-color' : '#cccccc'
        }

        var opts = {};

        $popup.find('.comm-opts').each(function() {
            if($(this).val() && !isNaN($(this).val())) {
                opts[$(this).data('attr')] = $(this).val();
            } else if($(this).data('value')) {
                opts[$(this).data('attr')] = $(this).data('value');
            }
        });


        var table_html = '';
        opts = $.extend(defaults, opts);

        if($popup.find('input[name="style_type"]:checked').val() == 'custom') {
            $popup.find('.fr-insert-table-popup .opts').each(function() {
                if($(this).val() && !isNaN($(this).val())) {
                    opts[$(this).data('attr')] = $(this).val();
                } else if($(this).data('value')) {
                    opts[$(this).data('attr')] = $(this).data('value');
                }
            });
        }

        var table_html = '';
        opts = $.extend(defaults, opts);

        table_html += '<table class="fr-table" style="width: 100%;">';
        for(var row = 1; row<=opts.row; row++) {
            table_html += '<tr>';
            for(var col = 1; col<=opts.col; col++) {
                table_html += '<td style="' + (opts['border-width'] ? (' border-width: ' + opts['border-width'] + 'px; ') : '') + (opts['border-color'] ? (' border-color: ' + opts['border-color'] + ';') : '') + (opts['background-color'] ? (' background-color: ' + opts['background-color'] + ';') : '') + (opts['border-style'] ? (' border-style: ' + opts['border-style'] + ';') : '') + '"></td>';
            }
            table_html += '</tr>';
        }
        table_html += '</table>';

        var $table_html = $(table_html);
        $popup.find('.fr-insert-table-popup .fr-table-preview').html($table_html);


        if($popup.find('input[name="style_type"]:checked').val() == 'preset') {
            var type = $($popup).find('.style-box').data('value');
            var type_num = type.replace('type', '');
            var border_color1, border_color2, cell_color1, cell_color2, cell_color3, cell_color4;
            if(type_num <= 8) {
                border_color1 = '#cccccc';
                border_color2 = '#e7e8e9';
                cell_color1 = '#f3f3f3';
                cell_color2 = '#f8f8f8';
                cell_color3 = '#ebebeb';
                cell_color4 = '#010101';
                // cell_color5 = '#ebebeb';
            } else if(type_num > 8 && type_num <= 16) {
                border_color1 = '#a3bcd0';
                border_color2 = '#c8d7e2';
                cell_color1 = '#e5ecf2';
                cell_color2 = '#fbfbfc';
                cell_color3 = '#e5ecf2';
                cell_color4 = '#5883ab';
                // cell_color5 = '#e5ecf2';
            }

            type_num = type_num % 8;

            switch(type_num) {
                case 1:
                    $table_html.find('td').css({
                        'border' : '1px solid ' + border_color1
                    });
                    break;
                case 2:
                    $table_html.find('td').css({
                        'border' : '1px solid ' + border_color1
                    });
                    $table_html.find('tr:odd').find('td').css({
                        'background-color' : cell_color1
                    });
                    break;
                case 3:
                    $table_html.find('td').css({
                        'border-top' : '1px solid ' + border_color1, 
                        'border-bottom' : '1px solid ' + border_color1,
                        'border-left': 'none',
                        'border-right': 'none'
                    });
                    $table_html.find('tr:odd').find('td').css({
                        'background-color' : cell_color1
                    });
                    break;
                case 4:
                    $table_html.css({
                        'border' : '1.1px solid ' + border_color1
                    });
                    $table_html.find('td').css({
                        'border' : '1px solid ' + border_color2
                    });
                    $table_html.find('tr:first').find('td').css({
                        'background-color' : cell_color1
                    });
                    break;
                case 5:
                    $table_html.find('td').css({
                        'border' : '1px solid ' + border_color1
                    });
                    $table_html.find('tr:even td').css({
                        'background-color' : cell_color2
                    });

                    $table_html.find('tr:odd td').css({
                        'background-color' : cell_color3
                    });
                    break;
                case 6:
                    $table_html.find('tr:even td').css({
                        'background-color' : cell_color3
                    });
                    $table_html.find('tr:first td').css({
                        'background-color' : cell_color4
                    });
                    $table_html.find('td').css({
                        'border' : '1px solid ' + border_color1,
                        'border-left' : 'none',
                        'border-right' : 'none'
                    });
                    break;
                case 7:
                    $table_html.find('td').css({
                        'border' : '1px solid ' + border_color1
                    });
                    $table_html.find('tr').find('td:first').css({
                        'background-color': cell_color1
                    });
                    $table_html.find('tr:first td').css({
                        'background-color' : cell_color4
                    });
                    break;
                case 0:
                    $table_html.find('td').css({
                        'border' : '1px solid ' + border_color1
                    });
                    $table_html.find('tr').find('td:first').css({
                        'background-color' : cell_color4
                    });
                    break;
            }
        }


        return $table_html;
    }

    return {
        showPopup: showPopup,
        hidePopup: hidePopup,
        renderPreviewTable : renderPreviewTable,
        initPopup: initPopup
    }
}

$.FroalaEditor.RegisterQuickInsertButton('quickInsertTableButton', {
    icon: 'insertTable',
    title: 'Insert Table',
    popup: true,
    plugin: 'customInsertTable',
    callback: function() {
        var editor = this;

        if(!this.popups.isVisible('customInsertTable.popup')) {
            this.customInsertTable.showPopup();
        } else {
            if(this.$el.find('.fr-marker')) {
            }
            // this.popups.hide('customInsertTable.popup');
        }

        var $popup = editor.popups.get('customInsertTable.popup');
    }
});


$.FroalaEditor.RegisterCommand('insertTableButton', {
    icon: 'insertTable',
    title: 'Insert Table',
    popup: true,
    plugin: 'customInsertTable',
    callback: function() {
        var editor = this;

        if(!this.popups.isVisible('customInsertTable.popup')) {
            this.customInsertTable.showPopup();
        } else {
            if(this.$el.find('.fr-marker')) {
            }
            // this.popups.hide('customInsertTable.popup');
        }

        var $popup = editor.popups.get('customInsertTable.popup');
    }
});


$.FroalaEditor.RegisterCommand('tableCellColor', {
    icon: 'tableCellColor',
    title: 'Cell color',
    undo: true,
    focus: false,
    showOnMobile: true,
    callback: function() {
        var editor = this;
        $('button[data-cmd="tableCellColor"]').toggleClass('active');
        $('.fr-command[data-cmd="tableCellColor"]').colpick({
            color:'#0088CC',
            layout : 'hex',
            extend : true,
            flat : isMobile() ? true : false,
            onSubmit: function (hsb, hex, rgb) {
                hex = hex.toUpperCase();
                // $('.fr-toolbar.fr-inline').removeClass('always');
                var oper = $(this.selector).closest('.colpick_hex.extend').find('.nav-pills [data-type].active').data('type');
                if(oper == 'text') {
                    // $(editor.table.selectedCells()).css('border-color', '#' + hex);
                    $(editor.table.selectedTable()).find('td').css('border-color', '#' + hex);
                } else if(oper == 'background') {
                    $(editor.table.selectedCells()).css('background-color', '#' + hex);
                }
                $('.fr-command[data-cmd="tableCellColor"]').colpickHide();

                if(typeof SETTINGS.favcolor == 'undefined') SETTINGS.favcolor = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000'];
                if(hex && SETTINGS.favcolor.indexOf('#' +hex) == -1 && (MODE == 'c' || MODE == 'config')) {
                    $.ajax({
                        url:'/config/setFavoriteColor',
                        type:'post',
                        data:{
                            'sid' : SID,
                            'color' : '#'+hex,
                        },
                        dataType:'json',
                        success:function() {
                            SETTINGS.favcolor.push('#'+hex);
                            if(SETTINGS.favcolor.length > $.FroalaEditor.FAV_COLORS_COUNT) {
                                SETTINGS.favcolor.splice(0, SETTINGS.favcolor.length - $.FroalaEditor.FAV_COLORS_COUNT);
                            }
                        }
                    });
                }
            },
            onHide: function() {
            },
            onShow: function() {
                var $colpick_layer = $('#' + $(this).data('colpickId'));
                // $colpick_layer.find('.nav-pills').hide();
                var hex = $.colpick.rgbToHex(fixRGB(rgbaToOpacity(editor.table.selectedCells()[0].style.borderColor)));

                $colpick_layer.find('.nav-pills [data-type="text"] a').text($.FroalaEditor.LANGUAGE[LANG].translation['Table Border']);
                $colpick_layer.find('.nav-pills [data-type="background"] a').text($.FroalaEditor.LANGUAGE[LANG].translation['Cell Background']);
                $colpick_layer.find('.nav-pills li').removeClass('active');
                // $colpick_layer.find('.nav-pills li[data-type="background"]').addClass('active');
                $colpick_layer.find('.nav-pills li:first').addClass('active');

                $(this).colpickSetColor(hex.replace('#',''));

                $('.colpick_hex.extend .fav-row').remove();
                if(typeof SETTINGS.favcolor == 'undefined') SETTINGS.favcolor = ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#000000'];
                var favcolor_html = '';
                if(SETTINGS.favcolor.length && (MODE == 'c' || MODE == 'config')) {
                    var gap = $.FroalaEditor.FAV_COLORS_COUNT - SETTINGS.favcolor.length;
                    for(var i=0; i<gap; i++) {
                        if(i==0) {
                            SETTINGS.favcolor.unshift('#000000');
                        } else {
                            SETTINGS.favcolor.unshift('#FFFFFF');
                        }
                    }
                    var favcolor_arr = SETTINGS.favcolor.slice();
                    favcolor_arr.reverse();
                    $(favcolor_arr).each(function() {
                        favcolor_html += '<span class="colpick-select-color fav-select-color" style="background: ' + this + '" data-color="' + this + '"></span>';
                    });
                }
                if(favcolor_html) {
                    $('.colpick_hex.extend .col-ex-item.color-set').prepend('<div class="fav-row">' + favcolor_html + '</div>');
                }

                    
                var $trigger = $(this);

                if(($trigger.offset().top + $trigger.outerHeight() + $colpick_layer.outerHeight()) > window.innerHeight) {
                    var top = $trigger.offset().top;
                    // $colpick_layer.css('top',(Number(top)-171)+'px');
                    $colpick_layer.css('top',(Number(top)-201)+'px');
                }
            }
        });
    },
    refresh: function($btn) {
        if(!$($btn).hasClass('active')) $($btn).colpickHide();
    }
});

$.FroalaEditor.RegisterCommand('tableBorderStyle', {
    icon: 'tableBorderStyle',
    title: 'Border Style',
    type:'dropdown',
    options: {
        'none' : 'None',
        'solid' : 'Solid',
        'dashed' : 'Dashed',
        'dotted' : 'Dotted',
        'double' : 'Double',
    },
    callback: function(cmd, val) {
        var border_width = 0;
        if(val == 'none') {

        } else if(val == 'double') {
            border_width = 3;
        } else {
            border_width = 1
        }
        $(this.table.selectedCells()).css({
            'border-style' : val,
            'border-width' : border_width + 'px'
        });
    },
    refreshOnShow: function($btn, $dropdown) {
        var border_style = this.table.selectedCells()[0].style.borderStyle;
        if(border_style) {
            $($dropdown).find('[data-param1="' + border_style + '"]').addClass('fr-active');
        }
    }
});

$.FroalaEditor.RegisterCommand('tableBorderWidth', {
    icon: 'tableBorderWidth',
    title: 'Border Width',
    type:'dropdown',
    options: {
        '0' : 'None',
        '1' : '1',
        '2' : '2',
        '3' : '3',
        '4' : '4',
        '5' : '5',
        '6' : '6',
        '7' : '7',
        '8' : '8',
        '9' : '9',
        '10' : '10',
    },
    callback: function(cmd, val) {
        $(this.table.selectedCells()).css({
            'border-width' : val + 'px'
        });
    },
    refreshOnShow: function($btn, $dropdown) {
        var border_width = this.table.selectedCells()[0].style.borderWidth;
        if(border_width) {
            border_width = border_width.replace('px', '');
            $($dropdown).find('[data-param1="' + border_width + '"]').addClass('fr-active');
        }
    }
});

$.FroalaEditor.RegisterCommand('customFormatOL', {
    icon: 'formatOL',
    title: 'Ordered List',
    type: 'dropdown',
    options : {
        'none' : 'None',
        'decimal' : 'Decimal',
        'lower-alpha' : 'Lower Alpha',
        'lower-greek' : 'Lower Greek',
        'lower-roman' : 'Lower Roman',
        'upper-alpha' : 'Upper Alpha',
        'upper-roman' : 'Upper Roman',
    },
    callback: function(cmd, val) {
        this.selection.save();
        if(val == 'none') {
            if(this.format.is('ol')) {
                this.commands.exec('formatOL');
            }
        } else {
            this.commands.exec('formatOL', [val]);
        }
    }
});

$.FroalaEditor.RegisterCommand('customFormatUL', {
    icon: 'formatUL',
    title: 'Unordered List',
    type: 'dropdown',
    refreshAfterCallback: true,
    options : {
        'none' : 'None',
        'circle' : 'Circle',
        'disc' : 'Disc',
        'square' : 'Square',
        'disclosure-closed' : 'Triangle'
    },
    callback: function(cmd, val, val2) {
        this.selection.save();
        if(val == 'none') {
            if(this.format.is('ul')) {
                this.commands.exec('formatUL');        
            }
        } else {
            this.commands.exec('formatUL', [val]);
        }
    }
});


$.FroalaEditor.RegisterCommand('customFormatUOL', {
    icon: 'customFormatUOL',
    title: 'Ordered List',
    type: 'dropdown',
    html: function() {
        return '\
        <ul class="fr-dropdown-list" role="presentation">\
            <li role="presentation">\
                <a class="fr-command 0" tabindex="-1" role="option" data-cmd="customFormatUOL" data-param1="none" title="' + $.FroalaEditor.LANGUAGE[LANG].translation['None'] + '" aria-selected="false">\
                ' + $.FroalaEditor.LANGUAGE[LANG].translation['None'] + '\
                </a>\
            </li>\
            <li role="presentation">\
                <a class="fr-command 0" tabindex="-1" role="option" data-cmd="customFormatUOL" data-param1="circle" title="circle" aria-selected="false" style="font-size: 18px; line-height: 28px;">\
                    ○\
                </a>\
            </li>\
            <li role="presentation">\
                <a class="fr-command 0" tabindex="-1" role="option" data-cmd="customFormatUOL" data-param1="disc" title="disc" aria-selected="false" style="font-size: 18px; line-height: 28px;">\
                    ●\
                </a>\
            </li>\
            <li role="presentation">\
                <a class="fr-command 0" tabindex="-1" role="option" data-cmd="customFormatUOL" data-param1="square" title="square" aria-selected="false" style="font-size: 18px; line-height: 28px;">\
                    ■\
                </a>\
            </li>\
            <li role="presentation">\
                <a class="fr-command 0" tabindex="-1" role="option" data-cmd="customFormatUOL" data-param1="disclosure-closed" title="disclosure-closed" aria-selected="false" style="font-size: 13px; line-height: 28px;">\
                    ▶\
                </a>\
            </li>\
            <li role="presentation">\
                <a class="fr-command 0" tabindex="-1" role="option" data-cmd="customFormatUOL" data-param1="decimal" title="decimal" aria-selected="false">\
                    1 2 3 4 \
                </a>\
            </li>\
            <li role="presentation">\
                <a class="fr-command 0" tabindex="-1" role="option" data-cmd="customFormatUOL" data-param1="lower-alpha" title="lower-alpha" aria-selected="false">\
                    a b c d\
                </a>\
            </li>\
            <li role="presentation">\
                <a class="fr-command 0" tabindex="-1" role="option" data-cmd="customFormatUOL" data-param1="upper-alpha" title="upper-alpha" aria-selected="false">\
                    A B C D\
                </a>\
            </li>\
            <li role="presentation">\
                <a class="fr-command 0" tabindex="-1" role="option" data-cmd="customFormatUOL" data-param1="lower-roman" title="lower-roman" aria-selected="false" style="margin-inline-start: -3px;">\
                    ⅰⅱⅲⅳ\
                </a>\
            </li>\
            <li role="presentation">\
                <a class="fr-command 0" tabindex="-1" role="option" data-cmd="customFormatUOL" data-param1="upper-roman" title="upper-roman" aria-selected="false" style="margin-inline-start: -3px;">\
                    ⅠⅡⅢⅣ\
                </a>\
            </li>\
            <li role="presentation">\
                <a class="fr-command 0" tabindex="-1" role="option" data-cmd="customFormatUOL" data-param1="lower-greek" title="lower-greek" aria-selected="false">\
                    α β γ δ\
                </a>\
            </li>\
        </ul>\
        '
    },
    callback: function(cmd, val) {
        // selRange = saveSelection()
        if(val == 'none') {

            while(this.format.is('ol')) {
                this.commands.exec('formatOL');
            }
            
            while(this.format.is('ul')) {
                this.commands.exec('formatUL');
            }
        } else {
            this.commands.exec('formatOL', [val]);
        }
    },
    refreshOnShow: function($btn, $dropdown) {
        var list_style = $(this.selection.element()).css('list-style-type');

        if(list_style && list_style != 'none' && (this.format.is('ol') || this.format.is('ul'))) {
            $($dropdown).find('[data-param1="' + list_style + '"]').addClass('fr-active');
        } else {
            $($dropdown).find('[data-param1="none"]').addClass('fr-active');
        }
    }
});


$.FroalaEditor.RegisterCommand('customInOutdent', {
    icon: 'inoutdent',
    title: 'indent/outdent',
    type: 'dropdown',
    options: {
        'indent' : "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path d='M4 5h16v2H4z'/><path d='M4 17h16v2H4z'/><path d='M10 9h10v2H10z'/><path d='M10 13h10v2H10z'/><path d='m7 12-1.5-1.5L4 9v6l1.5-1.5z'/></svg>",
        'outdent' : "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path d='M4 5h16v2H4z'/><path d='M4 17h16v2H4z'/><path d='M10 9h10v2H10z'/><path d='M10 13h10v2H10z'/><path d='M7 12V9l-1.5 1.5L4 12l1.5 1.5L7 15z'/></svg>",
    },
    html: function() {
        return '\
            <ul class="fr-dropdown-list" role="presentation">\
                <li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="customInOutdent" data-param1="indent" title="' + $.FroalaEditor.LANGUAGE[LANG].translation['Increase Indent'] + '" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M4 5h16v2H4z"/><path d="M4 17h16v2H4z"/><path d="M10 9h10v2H10z"/><path d="M10 13h10v2H10z"/><path d="m7 12-1.5-1.5L4 9v6l1.5-1.5z"/></svg></a></li>\
                <li role="presentation"><a class="fr-command" tabindex="-1" role="option" data-cmd="customInOutdent" data-param1="outdent" title="' + $.FroalaEditor.LANGUAGE[LANG].translation['Decrease Indent'] + '" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M4 5h16v2H4z"/><path d="M4 17h16v2H4z"/><path d="M10 9h10v2H10z"/><path d="M10 13h10v2H10z"/><path d="M7 12V9l-1.5 1.5L4 12l1.5 1.5L7 15z"/></svg></a></li>\
            </ul>\
        ';
    },
    callback: function(cmd, val) {
        if(val == 'indent') {
            this.commands.indent();
        } else if(val == 'outdent') {
            this.commands.outdent();
        }
    },
    refreshOnShow: function($btn, $dropdown) {
        // if(this.selection.endElement)
        var checkOLFirst = false,
            marginLeftFlag = false;
        $($dropdown).find('[data-param1="indent"],[data-param1="outdent"]').removeClass('fr-disabled');
        $(this.selection.blocks()).each(function() {
            if($(this).is('li') && $(this).prev('li').length == 0) checkOLFirst = true;
            if( $(this).css('margin-left') != '0px' ||
                $(this).parents('ol,ul').length > 1 || 
                ($(this).closest('ol,ul').css('margin-left') != '0px' && typeof $(this).closest('ol,ul').css('margin-left') != 'undefined')
            ) {
                marginLeftFlag = true;
            }
        });

        if(checkOLFirst) $($dropdown).find('[data-param1="indent"]').addClass('fr-disabled');
        if(!marginLeftFlag) $($dropdown).find('[data-param1="outdent"]').addClass('fr-disabled');

        $($dropdown).find('[data-param1="indent"]').attr('title', $.FroalaEditor.LANGUAGE[LANG].translation['Increase Indent']);
        $($dropdown).find('[data-param1="outdent"]').attr('title', $.FroalaEditor.LANGUAGE[LANG].translation['Decrease Indent']);
    }
});

function hideLargeImagebtn() {
  if($('body').width()>768) {
    $('.fr-btn.fr-btn-image[data-cmd="img-align-full"], .fr-btn.fr-btn-image[data-cmd="img-align-wide"]').hide();
  }
}

function showLargeImagebtn() {
  if($('body').width()>768) {
    $('.fr-btn.fr-btn-image[data-cmd="img-align-full"], .fr-btn.fr-btn-image[data-cmd="img-align-wide"]').show();
    $('.fr-btn.fr-command[data-cmd="imageAlign"]').hide();
  }
}

function refreshImagebtn($obj) {
  if($('body').width() < 768) $('.fr-btn.fr-command[data-cmd="imageAlign"]').hide();

  if($obj.hasClass('image-width-small')) {
    hideLargeImagebtn();
    if($obj.hasClass('f-align-original')) $('.fr-btn.fr-command[data-cmd="imageAlign"]').show();
    else $('.fr-btn.fr-command[data-cmd="imageAlign"]').hide();
  } else showLargeImagebtn();

  // $obj.removeClass(function (index, css) {
  //   return (css.match (/f-align-(left|right|full|wide|original)(-470)*/g) || []).join(' ');
  // });
  
  var imgClass = $obj.attr('class').match(/f-align-(left|right|full|wide|original)(-470)*/g), 
      align = (imgClass==null) ? '' : imgClass[0],
      align = (align) ? align.replace('f-','img-') : '';
  $('button[data-cmd="' + align + '"]').addClass('active');
}

function refreshVideobtn($obj) {
  // if($obj.find('iframe').width()<720 && $('body').width() > 767) {
  //   $('.fr-btn.fr-command[data-cmd="videoAlign"]').show();
  // } else {
  //   $('.fr-btn.fr-command[data-cmd="videoAlign"]').hide();
  // }
  // $('.fr-video-resizer').css({
  //   width: ($obj.find('iframe').width() + 2) + 'px',
  //   height: ($obj.find('iframe').height() +2) + 'px',
  // });
}

function setImageToolbarPosition($btn,$img) {
    var $toolbar = $btn.parents('.fr-popup'),
        $resizer = $('.fr-image-resizer');

    $toolbar.css('visibility','hidden');
    $resizer.css('visibility','hidden');
    setTimeout(function() {
      $resizer.width($img.width()+'px');
      $resizer.height($img.height()+'px');
      $resizer.css('top', ($img.offset().top - $('#fm-editor').offset().top -18) + 'px');
      $resizer.css('left', ($img.offset().left - $('#fm-editor').offset().left -16) + 'px');
      // $resizer.css('top', '-1px');
      // $resizer.css('left','-1px');
      var top = $resizer.offset().top + ($img.height()/2-28),
          left = $img.offset().left + ($img.width() - $toolbar.width()) / 2;
      if($toolbar.hasClass('fr-above')) top = top + 10;
      $toolbar.css('top', top + 'px');
      $toolbar.css('left', left + 'px');

      $toolbar.css('visibility','visible');
      $resizer.css('visibility','visible');

      // $toolbar.find('[data-cmd="img-align-full"], [data-cmd="img-align-wide"], [data-cmd="img-align-original"], [data-cmd="img-align-left-470"], [data-cmd="img-align-right-470"], [data-cmd="img-align-left"], [data-cmd="img-align-right"]').show();
    },100);
}
function setVideoToolbarPosition($btn,$img) {
    var $toolbar = $btn.parents('.fr-popup'),
        $resizer = $('.fr-video-resizer');
    $toolbar.css('visibility','hidden');
    setTimeout(function() {
      var top = $resizer.offset().top + ($img.height()/2-28);
      if($toolbar.hasClass('fr-above')) top = top + 10;
      $toolbar.css('top',top + 'px');
      $toolbar.css('visibility','visible');
    },100);
}

function lastLineEmpty() {
  // if($('#forum-modal .fr-view p:last-child').text() == '' && $('#forum-modal .fr-view p:last-child').find('*').length < 2 &&
  //    $('#forum-modal .fr-view p:last-child').find('img').length == 0 &&
  //    $('#forum-modal .fr-view p:last-child').find('iframe').length == 0 ) {
  //   $('#forum-modal .fr-view p:last-child').addClass('last-line-empty');
  // } else {
  //   if($('#forum-modal .fr-view p:last-child').text().charCodeAt(0) == '8204' && 
  //      $('#forum-modal .fr-view p:last-child').find('img').length == 0 &&
  //      $('#forum-modal .fr-view p:last-child').find('iframe').length == 0) $('#forum-modal .fr-view p:last-child').addClass('last-line-empty');
  //   else $('#forum-modal .fr-view p:last-child').removeClass('last-line-empty');
  // }
}

$(document).on('click','#forum-modal .fr-view p', function(e) {
  // if($(this).hasClass('last-line-empty')) $(this).removeClass('last-line-empty');
  // else lastLineEmpty();
});

function editorImageReplace(src) {
  var $img = fr_editor.image.get(),
      $btn = $('.fr-popup.fr-active').find('button[data-cmd="image-replace"]'),
      tmpImg = new Image();

  tmpImg.src = src;
  tmpImg.onload = function() {
    $img.attr('src',src);
    $img.removeClass('image-width-small');
    // if(this.width < 720) $img.addClass('image-width-small');
    setImageToolbarPosition($btn,$img);
    refreshImagebtn($img);
    $.processOFF();
  };
}

function imageSetClass($obj) {
  // var width = $('.forum-write').hasClass('w740') ? 720 : 1140;
  // if($obj.width()< width) $obj.addClass('image-width-small').addClass('f-align-original');
}

$(function() {
  $(document).on('mouseenter','.forum-view.post .edt-type-file',function(e) {
      $(this).addClass('active');

      var file_name_width = $(this).find('.fr-file').outerWidth();
      var box_width = $(this).outerWidth();
      var file_name_left = $(this).find('.fr-file').position().left;

      if((box_width - (file_name_width + file_name_left)) > 70) { // 30px 좌측 패딩 제외
          var offleft = $(this).find('.fr-file').offset().left - $(this).offset().left,
              align = $('.sideToolbar .tb-text-align').attr('data-align'),
              pos = 50;
          if(align == 'right') pos = -($(this).find('.fr-file').width() + 100);

          var left = $(this).find('.fr-file').width() + offleft + pos;
          $(this).append('<span class="edt-file-delete" style="left:' + (left+5) + 'px;width:41px;"><i class="fa fa-trash-o"></i></span>');
          $(this).append('<span class="edt-enter" style="left:' + (left+46) + 'px;width:41px;"><img src="https://storage.googleapis.com/i.addblock.net/icon/enter-icon.png"></span>');
      } else {
          var offleft = $(this).find('.fr-file').offset().left - $(this).offset().left,
              align = $('.sideToolbar .tb-text-align').attr('data-align'),
              pos = 50;
          if(align == 'right') pos = -($(this).find('.fr-file').width() + 100);

          var left = $(this).find('.fr-file').width() + offleft + pos - 100;
          $(this).append('<span class="edt-file-delete" style="left:' + (left+5) + 'px;top:40px;width:41px;"><i class="fa fa-trash-o"></i></span>');
          $(this).append('<span class="edt-enter" style="left:' + (left+46) + 'px;top:40px;width:41px;"><img src="https://storage.googleapis.com/i.addblock.net/icon/enter-icon.png"></span>');
      }
  }).on('mouseleave','.forum-view.post .edt-type-file',function(e) {
      $(this).removeClass('active');
      $('.edt-file-delete').remove();
      $('.edt-enter').remove();
  }).on('click','.forum-view.post .edt-type-file, #forum-modal .fr-file',function(e) {
      e.stopPropagation();
      e.preventDefault();
      // if($(this).parents('p').next().length == 0) {
      //     $(this).parents('p').after('<p class="last-line-empty"><br></p>');
      //     $(('#forum-modal')).scrollTop($('#forum-modal').height());
      // }
  });
  $(document).on('click','.forum-view.post .edt-file-delete', function(e) {
      fr_editor.undo.saveStep();
      $(this).parents('.edt-type-file').replaceWith($.FroalaEditor.INVISIBLE_SPACE);
  });

  $(document).on('click','.forum-view.post .edt-enter', function(e) {
      fr_editor.undo.saveStep();
      $(this).parents('p').after('<p><br></p>');
  });


  $(document).on('click','#fm-thumb',function(e) {
    if(!$(this).hasClass('empty')) {
      var thumbDeleteModal = $(this).showModalFlat('INFORMATION', $.lang[LANG]['config.postforum.thumbnail..delete'], true, true, function(e) {
        $('#fm-thumb').addClass('empty').find('.bg').remove();
        $('#fm-title').addClass('thumb-empty');
        $('#fm-thumb').find('img').attr('src','//storage.googleapis.com/i.addblock.net/icon/thumb_icon.png');
        thumbDeleteModal.modal('hide');
      }, 'cancel', 'ok','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn');
      return false;
    }

    // fr_editor.selection.save();
    isReplace = false;
    upTYPE = 'thumb';
    $('#file_type').val(upTYPE);
    $('#uploadFile').val('');
    $('#uploadFile').trigger('click');
  });

  $(document).on('click','.tb-attach-file',function(e) {
    fr_editor.selection.save();
    isReplace = false;
    upTYPE = 'image';
    $('#file_type').val(upTYPE);
    $('#uploadFile').val('');
    $('#uploadFile').trigger('click');
  });

  $(document).on('click','.tb-file-insert', function(e) {
    upTYPE = 'file';
    $('#file_type').val(upTYPE);
    $('#uploadFile').val('');
    $('#uploadFile').trigger('click');
  });

  $(document).on('click','.tb-video-insert', function(e) {
    fr_editor.selection.save();
    var modal = $(this).showModalFlat($.lang[LANG]['config.insert-video'],videoForm(),true,true,function() {
      $('.error').remove();
      var url = $('#video-url').val();
      if(!url) {
        $('#video-url').after('<label class="error">' +  $.lang[LANG]['config.link-to-go'] + '</label>').focus();
        return;
      }

      // video url patterns(youtube, instagram, vimeo, dailymotion)
      var ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var ytMatch = url.match(ytRegExp);

      var igRegExp = /\/\/instagram.com\/p\/(.[a-zA-Z0-9]*)/;
      var igMatch = url.match(igRegExp);

      var vRegExp = /\/\/vine.co\/v\/(.[a-zA-Z0-9]*)/;
      var vMatch = url.match(vRegExp);

      var vimRegExp = /\/\/(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
      var vimMatch = url.match(vimRegExp);

      var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
      var dmMatch = url.match(dmRegExp);

      var sound = url.search("soundcloud.com");

      var $video;
      if (ytMatch && ytMatch[2].length === 11) {
      } else if (igMatch && igMatch[0].length > 0) {
      } else if (vMatch && vMatch[0].length > 0) {
      } else if (vimMatch && vimMatch[3].length > 0) {
      } else if (dmMatch && dmMatch[2].length > 0) {
      } else if (sound>-1) {
      } else {
        $('#video-url').after('<label class="error">' +  $.lang[LANG]['editor.video.url.error'] + '</label>').focus();
        return;
      }

      if ($video) {
        $video.attr('frameborder', 0).attr('class','tpl-video');
        range.create().insertNode($video[0]);
        //$('.note-editable').fitVids();
      }
      var video = insertVideo(url,'src'),
        frVideo = '<span class="fr-video fr-dvb fr-draggable" contenteditable="false" draggable="true">' +
            '<iframe width="720" height="405" src="' + video + '" frameborder="0" allowfullscreen="true"></iframe>' +
            '</span>';

      restoreSelection(selRange);
      fr_editor.html.insert(frVideo , true);
      modal.modal('hide');

    },'cancel','', 'cl-modal cl-cmmodal cl-p70 cl-s-btn w560 cl-t80 cl-close-btn video-addmodal');
    $('.flat-modal').css({
      'position' : 'absolute',
      'z-index' : '1051'
    });
    $('[data-toggle="popover"]').popover();
    $('.flat-modal').next().css('z-index','1050');
  });
  
  $(document).on('click','.tb-divider-insert', function(e) {
    var mode = ($(this).hasClass('pc')) ? ".pc" : ".mobile";
    if($('.sub-divider'+mode).css('display') == "block") $('.sub-divider'+mode).hide();
    else $('.sub-divider'+mode).show();
    fr_editor.selection.save();
    // fr_editor.image.insert('http://storage.googleapis.com/cr-resource/forum/958ee630c0ff8b9f857b9002f937e808/811d09af2cd93ce62080d8ccfaed37ce.png',true);
  });

  $(document).on('click','.tb-insert-hr', function(e) {
    var type = $(this).attr('data-type');
    fr_editor.selection.restore();
    switch(type) {
      case "h1": fr_editor.html.insert('<hr class="forum-hr1"><p><br></p>',true); break;
      case "h2": fr_editor.html.insert('<hr class="forum-hr2"><p><br></p>',true); break;
      case "h3": fr_editor.html.insert('<hr class="forum-hr3"><p><br></p>',true); break;
      case "h4": fr_editor.html.insert('<hr class="forum-hr4"><p><br></p>',true); break;
      case "h5": fr_editor.html.insert('<hr class="forum-hr5"><p><br></p>',true); break;
      default: return; break;
    }
    $('.sub-divider').hide();
  });
});

var videoForm = function() {
  return '' +
    '<div class="form-inline comment-addform video input-text">' + 
        '<div class="form-group">' +
          '<p>' + $.lang[LANG]['editor.video.info.title'] + '<svg class="cm-popover-info hand" tabindex="0" data-trigger="focus" data-toggle="popover" data-html="true" data-placement="bottom" data-content="'+  $.lang[LANG]['editor.video.info'] +'" viewBox="0 0 13 13" width="13" height="13"><path d="M6.5 0C2.91 0 0 2.91 0 6.5S2.91 13 6.5 13 13 10.09 13 6.5 10.09 0 6.5 0zM6.5 12C3.47 12 1 9.53 1 6.5S3.47 1 6.5 1 12 3.47 12 6.5 9.53 12 6.5 12z"/><rect x="6" y="9" width="1" height="1"/><path d="M6.66 3.01C5.61 3.01 4.58 3.5 4.5 4.8c0 0.06-0.01 0.12 0 0.2h1.02c0-0.07 0.01-0.15 0.02-0.23 0.08-0.62 0.52-0.76 1.08-0.76 0.63 0 1.02 0.37 1.02 0.95 -0.01 0.48-0.3 0.87-0.76 1.34C6.21 6.97 6.02 7.37 6 8h0.99C7 7.66 7.04 7.37 7.67 6.75 8.17 6.27 8.7 5.68 8.7 4.87 8.7 3.85 7.89 3.01 6.66 3.01z"/></svg></p>' + 
          '<label class="sr-only" for="label-video">' +  $.lang[LANG]['config.modal.password'] + '</label>' +
          '<input type="text" class="form-control" id="video-url" placeholder="https://">' +
        '</div>' +
    '</div>';
}

window.onload = function(){
  // setLanguage(LANG);
      document.getElementById('uploadFile').onchange = function() {
        $.processON('Uploading...');
        $('#uploadForm').after('<iframe id="uploadIFrame" name="uploadIFrame" style="display:none;visibility:hidden"></iframe>');


        document.getElementById('uploadIFrame').onload = function() {
            $('#forum-attach').modal('hide');
            var res = $.parseJSON($('#uploadIFrame').contents().find('body').text());
            if(typeof res.error != 'undefined' || res.error) {
                // alert(res.error);
                var modal = $(this).showModalFlat('',res.error,true,false,'','ok','','cl-cmmodal cl-s-btn w560 cl-p130 cl-t80 cl-modal cl-none-title cl-close-btn','','',function() {
                    $(document).on('keydown', function(e) {
                        if(e.keyCode == 27) modal.modal('hide');
                    });
                });
                $.processOFF();
                return;
            }

          // $.processOFF();
            if(res.file_type == 'thumb') {
              if($('#fm-thumb').hasClass('empty')) {
                $('#fm-thumb').removeClass('empty').append('<div class="bg"><i class="fa fa-trash-o" aria-hidden="true"></i></div>');
                $('#fm-title').removeClass('thumb-empty');
              }

              $('#fm-thumb').find('img.fm-thumb-img').attr('src',res.thumb).attr('data-file-name',res.uploaded.file_name).attr('data-file-dir',res.uploaded.dir);

              var thumb_history_idx = $('#fm-thumb').find('input[type="hidden"]').length;
              $('#fm-thumb').append('<input type="hidden" id="thumb-history-' + thumb_history_idx + '" value="' + res.file + '" data-file-name="' + res.uploaded.file_name + '" data-file-dir="' + res.uploaded.dir + '"/>')

              $.processOFF();
            } else {
              setfile(res.file, res.uploaded.file_name, res.uploaded.orig_name, res.uploaded.dir);
            }

            $('#uploadIFrame').remove();
        }

        document.getElementById('uploadForm').submit();
      }
}

function setfile(file,file_name,orig_name,file_dir) {
    var $file = $('<div class="result-file" data-file="' + file + '" data-file-name="' + file_name + '" data-file-dir="' + file_dir + '">'),
        $result = $('<span><i class="fa fa-paperclip"></i></span> <span class="set-image hand"><i class="fa fa-arrow-circle-up"></i></span> <span>'+ orig_name + '</span>');
        $del = $('<span class="file-delete hand"><i class="fa fa-times"></i></span>');

    $file.append($result).append($del);
    $file.appendTo('.upload-files');
    
    restoreSelection(selRange);

    if(upTYPE == 'image') {
        var tmpImg = new Image();
        $.processON('Image loading...');
        if(isReplace == true) {
          editorImageReplace(file);
        } else {
          tmpImg.src = file;
          tmpImg.onload = function() {
            fr_editor.image.insert(file, true);
            $.processOFF();
          };
        }
    } else {
      fr_editor.file.insert(file, orig_name, { 'link' : file, 'target': '_blank' });
      $.processOFF();
    }
}
// var removeColpick = function() {
//     $('.fr-toolbar.fr-inline').removeClass('always');
//     $('button[data-cmd="textColor"]').removeClass('active').colpickHide();
// }
