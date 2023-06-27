let letraCompleta =
   `
G          C   
Escucho tu corazón, 
                             G
cada latido está llamando mi nombre. 
                            C
Soy atraído otra vez por tu sangre, 
                        G
me siento tan amado por ti.

                   C
Me encuentro en tu corazón,
                          G
decidiste aceptarme por siempre. 
                              C
Tu amor por mí es tan sorprendente, 
                         G
me siento tan mimado por ti.

D/F#                         Em
Y es tan bello saber que soy hijo 
      D/F#                 G
y que tengo un lugar en tu mesa. 
       D/F#                Em
No hay nada mejor que escuchar tu voz 
          D/F#                 G
diciendo: nuestra comunión es eterna.

            Am              D/F#
Oh, oh, oh, oh, oh, oh, oh, oh, 
             G
me amaste primero, con amor verdadero. 
            Am              D/F#
Oh, oh, oh, oh, oh, oh, oh, oh, 
                      G
y me respuesta es adorar, mi respuesta es adorar.
`;

let letraJesucristoBasta =
   `
Em  C  G
&nbsp
Em         C   G     Em      C      G
  Nuestros corazones,   insaciables son
Em       C   G           D    Em  C  G   D
  Hasta que conocen a su Salvador

C                    Em  D
Tal y como somos nos amó
C                       Em  D
Hoy nos acercamos sin temor
G         D              Em
Él es el agua que al beber
      C
Nunca más tendremos sed
G       D
   Jesucristo basta
Em      C
   Jesucristo basta
G       D          Em
  Mi castigo recibió
       C
Y Su herencia me entregó
G       D
   Jesucristo basta
Em      C
   Jesucristo basta

(Em    D     C)
Em       C   G      Em         C      G
Fuimos alcanzados,   por Su grande amor
Em       C     G            D    Em  C  G 
con brazos abiertos nos recibe hoy
D
&nbsp
C                    Em  D
Tal y como somos nos amó
C                       Em  D
Hoy nos acercamos sin temor
G         D              Em
 Él es el agua que al beber
       C
Nunca más tendremos sed
G       D
   Jesucristo basta
Em      C
   Jesucristo basta
G       D          Em
  Mi castigo recibió
       C
Y Su herencia me entregó
G       D
   Jesucristo basta
Em      C
   Jesucristo basta

(Em  D  C9)
C                    Em  D
Tal y como somos nos amó
C                       Em  D
Hoy nos acercamos sin temor    [X2]
G         D              Em
 Él es el agua que al beber
        C
Nunca más tendremos sed
G       D
   Jesucristo basta
Em      C
   Jesucristo basta
G       D          Em
  Mi castigo recibió
       C
Y Su herencia me entregó
G       D
   Jesucristo basta
Em      C          G   D  Em
   Jesucristo basta
   C          G   D  Em  C
Jesucristo basta

Em          C   G     Em       C      G
  Ahora hay un futuro,   y esperanza fiel
Em       C       G             D        G
  En Su amor confiamos, hay descanso en Él
`


let lyrics = getLyricsAndChords(letraJesucristoBasta);
let lyricsContainer = document.getElementById('lyrics-container');


for (let verse of lyrics) {
   let verseContainer = document.createElement('pre');

   for (let line of verse) {
      let lyrics = line.lyrics;
      let position = line.chords[0].position;

      let lineRefactor = '';

      for (let chordObj of line.chords) {
         position = chordObj.position;
         let chordText = chordObj.chord;
         let chordElement = document.createElement('span');
         chordElement.textContent = chordText;
         chordElement.classList.add('chord'); // Agrega la clase "chord" al elemento del acorde
         lineRefactor += ' '.repeat(position) + chordElement.outerHTML;
      }

      let lineText = lineRefactor + '\n' + lyrics;

      verseContainer.innerHTML += lineText; // Utiliza innerHTML para insertar el código HTML generado

      verseContainer.appendChild(document.createElement('br'));
   }

   lyricsContainer.appendChild(verseContainer);
}