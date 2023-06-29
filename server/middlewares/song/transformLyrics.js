import createError from 'http-errors';

async function transform_lyrics(req, res, next) {

    let lyricsTransformed = getLyricsAndChords(req.body.lyrics);
    if(lyricsTransformed[0].length !== 0){
        req.body.lyrics = lyricsTransformed
        return next()
    }
    else{
        return (next(createError(400, 'Format of lyrics incorrect, check instructions on how to upload')))
    }
}

export default transform_lyrics



// ! LYRICS

function processLyrics(fullLyrics) {
    // Agregar salto de línea con asterisco al comienzo de la letra completa
    const letraConAsterisco = `*\n${fullLyrics}`;

    // Reemplazar los saltos de línea vacíos por saltos de línea con asterisco
    let fullLyricsConAsteriscos = letraConAsterisco.replace(/\n\n/g, '\n*\n');

    // Extraer texto entre paréntesis y agregar &nbsp; en la línea siguiente
    const regex = /\((.*?)\)/g;
    const matches = fullLyricsConAsteriscos.match(regex);

    if (matches) {
        for (const match of matches) {
            const textoExtraido = match.replace(/[()]/g, '').replace(/\s+/g, ' ');
            fullLyricsConAsteriscos = fullLyricsConAsteriscos.replace(match, `\n${textoExtraido}\n&nbsp;`);
        }
    }

    return fullLyricsConAsteriscos;
}


function getLyricsFromVerse(verse) {
    let lines = [];
    lines = verse.split('\n');
    lines = lines.filter(line => line.trim() != '');
    // delete par of array
    let verseFilteredLyrics = [];
    for (let i = 0; i < lines.length; i++) {
        if (i % 2 !== 0) {
            verseFilteredLyrics.push(lines[i]);
        }
    }
    return verseFilteredLyrics;
}

function getLyrics(fullLyrics) {
    // agregar asteriscos
    fullLyrics = processLyrics(fullLyrics)
    // separar versos
    let verses = fullLyrics.split('*');
    // trim empty spaces
    verses = verses.filter(verse => verse.trim() != '');


    let refactorLyrics = [];
    for (let verse of verses) {
        refactorLyrics.push(getLyricsFromVerse(verse));
    }
    return refactorLyrics;
}


// ! CHORDS

function getChordsFromVerse(verse) {
    let lines = [];
    lines = verse.split('\n');
    lines = lines.filter(line => line.trim() != '');
    // delete par of array
    let verseFilteredChords = [];
    for (let i = 0; i < lines.length; i++) {
        if (i % 2 === 0) {
            verseFilteredChords.push(lines[i]);
        }
    }
    return verseFilteredChords;
}

function getChords(fullLyrics) {
    // agregar asteriscos
    fullLyrics = processLyrics(fullLyrics)
    // separar versos
    let verses = fullLyrics.split('*');
    // trim empty spaces
    verses = verses.filter(verse => verse.trim() != '');

    let refactorLyrics = [];
    for (let verse of verses) {
        refactorLyrics.push(getChordsFromVerse(verse));
    }

    return refactorLyrics;
}


function getChordsAndPositionFromLine(line) {
    let chords = [];
    let currentPosition = 0;

    // Dividir el string en acordes utilizando los espacios en blanco como separadores
    let chordArray = line.split(/\s+/);

    // Iterar sobre los acordes y encontrar sus posiciones
    for (let i = 0; i < chordArray.length; i++) {
        let chord = chordArray[i];
        let chordPosition = line.indexOf(chord, currentPosition);

        // Ignorar los acordes vacíos
        if (chord !== '') {
            chords.push({
                chord: chord,
                position: chordPosition
            });
        }

        // Actualizar la posición actual
        currentPosition = chordPosition + chord.length;
    }

    return { chords: chords };
}

function getChordsAndPosition(fullLyrics) {
    // agregar asteriscos
    fullLyrics = processLyrics(fullLyrics)

    let onlyChords = getChords(fullLyrics)
    let chords = [];

    for (let i = 0; i < onlyChords.length; i++) {
        let verse = onlyChords[i];
        let verseChords = [];
        for (let j = 0; j < verse.length; j++) {
            let line = verse[j];
            verseChords.push(getChordsAndPositionFromLine(line));
        }
        chords.push(verseChords);
    }

    return (chords)
}

function refactorChordsPosition(chords) {
    let refactorChords = [];
    for (let i = 0; i < chords.length; i++) {
        let verse = chords[i];
        let verseChords = [];
        for (let j = 0; j < verse.length; j++) {
            let line = verse[j];
            let lineChords = line.chords;
            let refactorLineChords = [];
            for (let k = 0; k < lineChords.length; k++) {
                let chord = lineChords[k];
                let chordPosition = chord.position;
                if (k > 0) {
                    let previousChord = lineChords[k - 1];
                    let previousChordPosition = previousChord.position;
                    let previousChordLength = previousChord.chord.length;
                    chordPosition = chordPosition - previousChordPosition - previousChordLength;
                }
                refactorLineChords.push({
                    chord: chord.chord,
                    position: chordPosition
                });
            }
            verseChords.push({
                chords: refactorLineChords
            });
        }
        refactorChords.push(verseChords);
    }
    return refactorChords;
}


// ! JOIN lyrics and chords

function getLyricsAndChords(fullLyrics) {
    // agregar asteriscos
    fullLyrics = processLyrics(fullLyrics)

    let lyrics = getLyrics(fullLyrics);
    let chords = refactorChordsPosition(getChordsAndPosition(fullLyrics));
    // console.log(chords)

    let lyricsAndChords = [];
    for (let i = 0; i < lyrics.length; i++) {
        let verse = lyrics[i];
        let verseLyricsAndChords = [];
        for (let j = 0; j < verse.length; j++) {
            let line = verse[j];
            let lineChords = chords[i][j].chords;
            verseLyricsAndChords.push({
                lyrics: line,
                chords: lineChords
            });
        }
        lyricsAndChords.push(verseLyricsAndChords);
    }
    return lyricsAndChords;
}


// console.log(getLyricsAndChords(letraPrueba));

// result:
// [
//     [
//         {
//             lyrics: 'Escucho tu corazón, ',
//             chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 11 }]
//         },
//         {
//             lyrics: 'cada latido está llamando mi nombre. ',
//             chords: [{ chord: 'G', position: 29 }]
//         },
//         {
//             lyrics: 'Soy atraído otra vez por tu sangre, ',
//             chords: [{ chord: 'C', position: 28 }]
//         },
//         {
//             lyrics: 'me siento tan amado por ti.',
//             chords: [{ chord: 'G', position: 24 }]
//         }],
//     [
//         {
//             lyrics: 'Me encuentro en tu corazón,',
//             chords: [{ chord: 'C', position: 0 }]
//         },
//         {
//             lyrics: 'decidiste aceptarme por siempre. ',
//             chords: [{ chord: 'G', position: 26 }]
//         },
//         {
//             lyrics: 'Tu amor por mí es tan sorprendente, ',
//             chords: [{ chord: 'C', position: 30 }]
//         },
//         {
//             lyrics: 'me siento tan mimado por ti.',
//             chords: [{ chord: 'G', position: 25 }]
//         }],
//     [
//         {
//             lyrics: 'Y es tan bello saber que soy hijo ',
//             chords:
//                 [{ chord: 'D/F#', position: 0 },
//                 { chord: 'Em', position: 20 }]
//         },
//         {
//             lyrics: 'y que tengo un lugar en tu mesa. ',
//             chords: [{ chord: 'D/F#', position: 6 }, { chord: 'G', position: 27 }]
//         },
//         {
//             lyrics: 'No hay nada mejor que escuchar tu voz ',
//             chords:
//                 [{ chord: 'D/F#', position: 7 },
//                 { chord: 'Em', position: 26 }]
//         },
//         {
//             lyrics: 'diciendo: nuestra comunión es eterna.',
//             chords:
//                 [{ chord: 'D/F#', position: 10 },
//                 { chord: 'G', position: 31 }]
//         }
//     ]
// ]

// let letraPrueba =
//     `
// G          C   
// Escucho tu corazón, 
//                              G
// cada latido está llamando mi nombre. 
//                             C
// Soy atraído otra vez por tu sangre, 
//                         G
// me siento tan amado por ti.

//                    C
// Me encuentro en tu corazón,
//                           G
// decidiste aceptarme por siempre. 
//                               C
// Tu amor por mí es tan sorprendente, 
//                          G
// me siento tan mimado por ti.

// D/F#                         Em
// Y es tan bello saber que soy hijo 
//       D/F#                 G
// y que tengo un lugar en tu mesa. 
//        D/F#                Em
// No hay nada mejor que escuchar tu voz 
//           D/F#                 G
// diciendo: nuestra comunión es eterna.

//             Am              D/F#
// Oh, oh, oh, oh, oh, oh, oh, oh, 
//              G
// me amaste primero, con amor verdadero. 
//             Am              D/F#
// Oh, oh, oh, oh, oh, oh, oh, oh, 
//                       G
// y me respuesta es adorar, mi respuesta es adorar.
// `;