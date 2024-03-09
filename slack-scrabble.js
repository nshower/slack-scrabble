window.addEventListener( 'load', () => {
    console.log( 'let\s scrabble things' );

    const form         = document.getElementById( 'scrabble_text_form' );
    const input        = document.getElementById( 'user_input' );
    const textarea     = document.getElementById( 'slack_output' );
    const output       = document.getElementById( 'scrabbled_output' );
    const button       = document.getElementById( 'copy_text' );
    const characterMap = {
        'a':'a',
        'b':'b',
        'c':'c',
        'd':'d',
        'e':'e',
        'f':'f',
        'g':'g',
        'h':'h',
        'i':'i',
        'j':'j',
        'k':'k',
        'l':'l',
        'm':'m',
        'n':'n',
        'o':'o',
        'p':'p',
        'q':'q',
        'r':'r',
        's':'s',
        't':'t',
        'u':'u',
        'v':'v',
        'w':'w',
        'x':'x',
        'y':'y',
        'z':'z',
        '0':'0',
        '1':'1',
        '2':'2',
        '3':'3',
        '4':'4',
        '5':'5',
        '6':'6',
        '7':'7',
        '8':'8',
        '9':'9',
        '~':'tilde',
        '`':'backtick',
        '!':'exclamation',
        '@':'at',
        '#':'hash',
        '$':'dollar',
        '%':'percent',
        '^':'caret',
        '*':'asterisk',
        '(':'paren-left',
        ')':'paren-right',
        '-':'hyphen',
        '_':'underscore',
        '+':'plus',
        '=':'equals',
        '[':'bracket-left',
        ']':'bracket-right',
        '{':'brace-left',
        '}':'brace-right',
        ':':'colon',
        ';':'semicolon',
        "'":'single-quote',
        '"':'double-quote',
        ',':'comma',
        '.':'period',
        '/':'slash',
        '?':'question',
        '<':'arrow-left',
        '>':'arrow-right',
        '|':'pipe',
        '\\':'backslash',
        ' ':'blank',
    };

    form.addEventListener( 'submit', (e) => {
        e.preventDefault();
        console.log( 'submit' );

        const copyText = textarea;

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        console.log( 'text copied to clipboard' );
        navigator.clipboard.writeText(copyText.value);

        button.innerText = "Copied!";
    });

    
    form.addEventListener( 'reset', (e) => {
        console.log( 'reset' );
        output.innerText   = '';
        textarea.innerText = '';
        button.innerText = 'Copy Text';
    });

    input.addEventListener( 'keyup', (e) => {

        if ( button.innerText !== 'Copy Text' ) {
            button.innerText = 'Copy Text';
        }

        if ( e.key === 'Shift' ||
             e.key === 'Alt' ||
             e.key === 'Control' ) {
            return;
        }

        textarea.innerText = convertToEmoji( input.value );

        output.innerHTML = convertToImages( input.value );
    });

    /**
     * Convert keyboard input to emoji formatted text.
     * @param {string} text 
     * @returns string
     */
    function convertToEmoji( text ) {

        let convertedText = ''   ;

        const format = ':%1-scrabble:';
   
        [...text].forEach( (char) =>    {
            Object.entries(characterMap).map( (character) => {
                if ( char.toLowerCase() === character[0] ) {
                    convertedText += format.replace( '%1', character[1] );
                }
            });
        });

        return convertedText;
    }

    /**
     * Converts keyboard input to emoji images.
     * @param {string} text 
     * @returns string
     */
    function convertToImages( text ) {

        let scrabbledText = '';

        const format = '<img class="scrabble-tile" src="images/letters/%1-scrabble.jpg" alt="%2" width="100" height="100">';
   
        [...text].forEach( (char) =>    {
            Object.entries(characterMap).map( (character) => {
                if ( char.toLowerCase() === character[0] ) {
                    scrabbledText += format.replace( '%1', character[1] ).replace( '%2', character[0]);
                }
            });
        });

        return scrabbledText;
    }
});