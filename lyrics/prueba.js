let letraCompleta =
    `
*
G          C
Escucho tu corazón, 
                             G
cada latido está llamando mi nombre. 
                            C
Soy atraído otra vez por tu sangre, 
                        G
me siento tan amado por ti.
*
C
Me encuentro en tu corazón,
                          G
decidiste aceptarme por siempre. 
                              C
Tu amor por mí es tan sorprendente, 
                         G
me siento tan mimado por ti.
*
D/F#                Em
Y es tan bello saber que soy hijo 
      D/F#                 G
y que tengo un lugar en tu mesa. 
       D/F#               Em
No hay nada mejor que escuchar tu voz 
          D/F#                 G
diciendo: nuestra comunión es eterna.
`;

let lyrics = getLyricsAndChords(letraCompleta);
console.log(lyrics);


// Obtener el contenedor en el HTML
let lyricsContainer = document.getElementById('lyrics-container');

// Crear la tabla para la letra y acordes
let table = document.createElement('table');

// Recorrer los versos y líneas para crear las celdas de la tabla
for (let verse of getLyricsAndChords(letraCompleta)) {

    // Agregar una fila vacía entre cada verso para mayor legibilidad  
    table.appendChild(document.createElement("tr"));

    for (let line of verse) {        
        // Crear las celdas de la tabla para la línea de acordes y la línea de letra   
        let chordCell = document.createElement('td');
        let lyricCell= document.createElement('td');       
         
        chordCell.textContent= "";
        
        if(line.chords.length > 0){
           chordCell.textContent= " " + line.chords.map(chord => chord.chord).join(" ");
        }
        
        lyricCell.textContent= line.lyrics;

        // Añadir las celdas a una nueva fila de la tabla
        let row = document.createElement('tr');
        row.appendChild(chordCell);
        row.appendChild(lyricCell);

       // Añadir la fila a la tabla
       table.appendChild(row);
    }

}

// Insertar la tabla en el contenedor
lyricsContainer.appendChild(table);