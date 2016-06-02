/*!
 * fadeSlideShow
 * v.1.0.0
 *
 * Copyright (c) 2010 Pascal Bajorat (http://www.pascal-bajorat.com)
 * Dual licensed under the MIT (below)
 * and GPL (http://www.gnu.org/licenses/gpl.txt) licenses.
 *
 *
 * http://www.pascal-bajorat.com
 
MIT License
 
Copyright (c) 2010 Pascal Bajorat
 
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 
 */
 
// Mit jQuery.fn.fadeSlideShow = function(options) definieren wir, dass es sich
// bei diesem Script um ein jQuery Plugin handelt mit dem Funktionsnamen "fadeSlideShow"
// Das "options" in den Klammern der Funktion, ermöglicht die Variablen Übergabe des Parameter Arrays des Funktionsaufrufs
jQuery.fn.fadeSlideShow = function(options) {
        // return this.each Definiert die Rückgabe und Funktion des Plugins
    return this.each(function(){
                // Hier wird die Variable "options" um die Standard Werte unseres Scriptes erweitert
                // Wenn der Benutzer im fadeSlideShow Funktionsaufruf selber Optionen definiert
                // werden diese hier überschrieben
	settings = jQuery.extend({
    	width: 800,
    	height: 600,
	    speed: 1000,
	    interval: 10000
        }, options);
 
	// Hier wird eine Reihe an CSS Werten auf die ID angewendet auf die diese Funktion aufgerufen wird
                // Bei diesem Beispiel von oben würde das "this" also "#slideshow" als Selector liefern
	jQuery(this).css({
	    width: settings.width, // Die #slideshow erhält die Weiten Werte aus der vom User angegebenen Option oder Alternativ die Standardwerte
	    height: settings.height, // Die #slideshow erhält die Höhen Werte aus der vom User angegebenen Option oder Alternativ die Standardwerte
	    position: 'relative', // Die #slideshow erhält die position Angabe relative
	    overflow: 'hidden' // und overflow hidden
	});
 
	// Hier werden Styles auf das nächste Child Element der Id #slideshow angewendet, "this" in diesem Beispiel #slideshow
                // wie oben bereits erwähnt
	jQuery('> *',this).css({
	    position: 'absolute', // Die Elemente erhalten alle ein position absolute und überlagern sich somit
	    width: settings.width, // wieder die Weiten
	    height: settings.height // und Höhen Angaben aus den Optionen. Entweder vom Nutzer angegeben oder Standards
	});
 
	// Zählt die Anzahl der Bilder in der Slideshow von 1 an
	Slides = jQuery('> *', this).length; // Enthält in unserem HTML Beispiel von oben jetzt den Wert 4
                // Da der Index von HTML Elementen bei 0 und nicht bei 1 beginnt ziehen wir hier "-1" von der Anzahl ab
	Slides = Slides - 1; // Enthält nun den Wert 3
                // Da unser letztes Bild (von der HTML Struktur her) in der Slideshow als erstes angezeigt wird,
                // setzen wir die Variable mit dem Index des ersten Bildes auf den Index des letzten li's
	ActSlide = Slides; // Enthält nun den Wert 3
	// Wir speichern die Selektions-Funktion für die Subelemente, im Beispiel zu den li's zwischen
	jQslide = jQuery('> *', this);
 
                // Wir setzen den Interval der in dem, in den Optionen angegebenen Zeitabstand
                // die enthaltene Funktion immer wieder ausführt - In unserem Beispiel alle 5 Sekunden
	intval = setInterval(function(){
                        // Nach den ersten 5 Sekunden wird hier nun als z.B. unser li mit dem Index 3 (entspricht dem 4 li von der HTML Struktur her) ausgefadet
                        // Da der Index wie bereits erwähnt im DOM bei 0 anfängt muss hier entsprechend mit 3 und nicht 4 gearbeitet werden
	    jQslide.eq(ActSlide).fadeOut(settings.speed); // settings.speed enthält hierbei die Animationsgeschwindigkeit aus den Optionen
                        // Bei dieser If Abfrage wird getestet ob die Variable ActSlide bei 0 angelangt ist, wenn ja wird die Slideshow auf das erste Bild zurückgesetzt
	    if(ActSlide <= 0){
                                // Alle Bilder werden wieder eingeblendet und die Slideshow fängt bei Bild 1 bzw vom Dom Index bei Bild 3 wieder an
		jQslide.fadeIn(settings.speed);
                                // Die ActSlide Variable wird zurückgesetzt auf 3
		ActSlide = Slides;
	    }else{
                                // Wenn ActSlides größer als 0 ist wird hier "-1" abgezogen
		ActSlide = ActSlide - 1;	
	    }
	}, settings.interval);
                // Nach 5 Sekunden wird diese Funktion erneut ausgeführt
    });
};