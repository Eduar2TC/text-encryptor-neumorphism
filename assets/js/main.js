document.addEventListener("DOMContentLoaded", function () {
    let textInput = document.querySelector('#text');
    let result = document.querySelector('#result');
    let buttonEncryptListener = document.querySelector('.container-buttons button:nth-child(1)');
    let buttonDecryptListener = document.querySelector('.container-buttons button:nth-child(2)');
    let buttonCopyTextListener = document.querySelector('.container-boxes .col:nth-child(2) .container-buttons button:nth-child(2)');
    let buttonClearAll = document.querySelector('.container-boxes .col:nth-child(2) .container-buttons button:nth-child(1)');
    let listResults = document.querySelector('.list-results ol');
    let mapToEncrypt = {
        a: 'ai',
        e: 'enter',
        i: 'imes',
        o: 'ober',
        u: 'ufat'
    };
    let mapToDecrypt = {
        ai: 'a',
        enter: 'e',
        imes: 'i',
        ober: 'o',
        ufat: 'u'
    };
    textInput.addEventListener('click', function(){
        textInput.style.outlineColor = 'rebeccapurple';
    } );
    buttonEncryptListener.addEventListener('click', function(e){
        e.preventDefault;
        if( textInput.value.length > 0 ){
            let textSanitized = textInput.value.replace(/[^a-zA-Z ]/g, "").toLowerCase();
            let textEncrypted = textSanitized.replace(/a|e|i|o|u/gi, function (matched) {
                return mapToEncrypt[matched];
            });
            result.value = textEncrypted;
        }else{
            textInput.focus();
            textInput.style.outlineColor = 'indianred';
            textInput.placeholder = 'Pls insert a text';
        }
    });
    buttonDecryptListener.addEventListener('click', function(e){
        e.preventDefault;
        if( textInput.value.length > 0 ){
            let textSanitized = result.value.replace(/[^a-zA-Z ]/g, "").toLowerCase();
            let textDecrypted = textSanitized.replace(/ai|enter|imes|ober|ufat/gi, function (matched) {
                return mapToDecrypt[matched];
            });
            result.value = textDecrypted;
        }else if( result.value.length >0 && textInput.value.length == 0 ){
            let textSanitized = result.value.replace(/[^a-zA-Z ]/g, "").toLowerCase();
            let textDecrypted = textSanitized.replace(/ai|enter|imes|ober|ufat/gi, function (matched) {
                return mapToDecrypt[matched];
            });
            result.value = textDecrypted;
        }
        else{
            textInput.focus();
            textInput.style.outlineColor = 'indianred';
            textInput.placeholder = 'Pls insert a text';
        }
    });
    buttonCopyTextListener.addEventListener('click', function(){
        let text = result.value;
        let textSpan = document.querySelector('.col:nth-child(2) button:nth-child(2) span');
        if( text.length > 0 ){
            navigator.clipboard.writeText(text).then(
                /* clipboard successfully set */
                function () {
                    textInput.value = '';
                    textInput.focus();
                    buttonCopyTextListener.style.transition = 'width 0.3s ease-out';
                    buttonCopyTextListener.style.width = '7rem';
                    textSpan.innerHTML = 'Copied!';
                    setTimeout(() => { 
                        buttonCopyTextListener.style.width = '5rem';
                        textSpan.innerHTML = 'Copy';
                    }, 1000);
                },
                /* clipboard write failed */
                function () {
                    window.alert('Opps! Your browser does not support the Clipboard API');
                }
            );
        }else{
            textInput.focus();
            textInput.style.outlineColor = 'indianred';
            textInput.placeholder = 'Pls insert a text';
        }
    } );
    buttonClearAll.addEventListener('click', function(){
        let textSpan = document.querySelector('.col:nth-child(2) button:nth-child(1) span');
        if (textInput.value.length > 0 && result.value.length || textInput.value.length > 0 || result.value.length > 0 ){
            listResults.innerHTML += '<li class="item-list">'+result.value+'</li>';
            textInput.value = '';
            result.value = '';
            buttonClearAll.style.transition = 'width 0.3s ease-out';
            buttonClearAll.style.width = '7.5rem';
            textSpan.innerHTML = 'Cleared!';
            setTimeout(() => {
                let itemList = document.querySelector('.col:nth-child(3) li:last-child');
                itemList.classList.add('item-list');
                itemList.style.opacity = 1;
                buttonClearAll.style.width = '5.5rem';
                textSpan.innerHTML = 'Clear';
            }, 600);
        }else{
            textInput.focus();
            textInput.style.outlineColor = 'indianred';
            textInput.placeholder = 'No elements to clear';
        }
    });

    //Themes
    const toggleButton = document.getElementById('toggle_checkbox');
    toggleButton.addEventListener('change', toggleTheme, false);
    const theme = {
        dark:{
            /*bg*/
            '--body-background': '#363636',
            '--col-bg-color': '#363636',
            /*font */
            '--title-text-color':'#FFFFFF',
            '--body-text-color': '#FFFFFF',
            /*border shadow cols*/
            '--col-shadow-left': '#2D2D2D',
            '--col-shadow-right': '#3F3F3F',
            //Numeration list bg color
            '--li-before-bg-color': '#242F40',
            //Numeration list text color
            '--li-before-text-color': '#E5E5E5',
            //Result text color
            '--li-result-text-color': 'lightgreen',
            //Link github text color
            '--link-github-color': '#E5E5E5',
            //Link hover github text color
            '--link-github-hover-color': '#CCA43B'
        },
        light: {
            /*bg*/
            '--body-background': '#FBF8F1',
            '--col-bg-color': '#F7ECDE',
            /*font */
            '--title-text-color': '#191919',
            '--body-text-color': '#191919',
            /*border shadow cols*/
            '--col-shadow-left': '#d1d1cf',
            '--col-shadow-right': '#ffffff',
            //Numeration list bg color
            '--li-before-bg-color': '#E9DAC1',
            //Numeration list text color
            '--li-before-text-color': '#54BAB9',
            //Result text color
            '--li-result-text-color': '#54BAB9',
            //Link github text color
            '--link-github-color': '#191919',
            //Link hover github text color
            '--link-github-hover-color': '#219F94'
        }
    };
    function toggleTheme( e ){
        if( e.target.checked ){
            useTheme('dark');
            localStorage.setItem( 'theme', 'dark' );
        }else{
            useTheme('light');
            localStorage.setItem('theme', 'light');
        }
    }
    function useTheme( themeChoice ){
        /*BG */
        document.documentElement.style.setProperty(
            '--body-background', theme[themeChoice]['--body-background']
        );
        document.documentElement.style.setProperty(
            '--col-bg-color', theme[themeChoice]['--col-bg-color']
        );
        /*fonts */
        document.documentElement.style.setProperty(
            '--title-text-color', theme[themeChoice]['--title-text-color']
        );
        document.documentElement.style.setProperty(
            '--body-text-color', theme[themeChoice]['--body-text-color']
        );
        /*border shadow cols*/
        document.documentElement.style.setProperty(
            '--col-shadow-left', theme[themeChoice]['--col-shadow-left']
        );
        document.documentElement.style.setProperty(
            '--col-shadow-right', theme[themeChoice]['--col-shadow-right']
        );
        //li-bg and color
        document.documentElement.style.setProperty(
            '--li-before-bg-color', theme[themeChoice]['--li-before-bg-color']
        );
        document.documentElement.style.setProperty(
            '--li-before-text-color', theme[themeChoice]['--li-before-text-color']
        );
        //Result text color
        document.documentElement.style.setProperty(
            '--li-result-text-color', theme[themeChoice]['--li-result-text-color']
        );
        //Link github color
        document.documentElement.style.setProperty(
            '--link-github-color', theme[themeChoice]['--link-github-color']
        );
        //Link github hover color
        document.documentElement.style.setProperty(
            '--link-github-hover-color', theme[themeChoice]['--link-github-hover-color']
        );
    }

    const preferredTheme = localStorage.getItem('theme');
    if (preferredTheme === 'dark') {
        useTheme('dark');
        toggleButton.checked = true;
    } else {
        useTheme('light');
        toggleButton.checked = false;
    }

});