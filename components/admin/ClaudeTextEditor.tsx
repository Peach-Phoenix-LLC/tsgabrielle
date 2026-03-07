"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Check, X, Loader2, Sun, Moon, Copy, FileText,
  Bold, Italic, Underline, Link, AlignLeft, AlignCenter, 
  AlignRight, List, ListOrdered, IndentDecrease, IndentIncrease,
  Palette, MoveVertical
} from 'lucide-react';

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  "en-US": {
    "appTitle": "Claude Writing Assistant",
    "yourText": "Your Text",
    "sample": "Sample",
    "copy": "Copy",
    "fontFamily": "Font Family",
    "fontSize": "Font Size",
    "bold": "Bold",
    "italic": "Italic",
    "underline": "Underline",
    "textColor": "Text Color",
    "addLink": "Add Link",
    "alignLeft": "Align Left",
    "alignCenter": "Align Center",
    "alignRight": "Align Right",
    "lineSpacing": "Line Spacing",
    "bulletList": "Bullet List",
    "numberedList": "Numbered List",
    "decreaseIndent": "Decrease Indent",
    "increaseIndent": "Increase Indent",
    "addLinkTitle": "Add Link",
    "enterUrl": "Enter URL",
    "add": "Add",
    "cancel": "Cancel",
    "characters": "characters",
    "analyzeText": "Analyze Text",
    "analyzing": "Analyzing...",
    "suggestions": "Suggestions",
    "all": "All",
    "grammar": "Grammar",
    "spelling": "Spelling",
    "punctuation": "Punctuation",
    "style": "Style",
    "clarity": "Clarity",
    "clickAnalyzeText": "Click 'Analyze Text' to get suggestions",
    "noSuggestionsCategory": "No suggestions in this category",
    "applySuggestion": "Apply suggestion",
    "dismiss": "Dismiss",
    "textHighlightColor": "Text highlight color",
    "applyAllSuggestions": "Apply All Suggestions",
    "pleaseEnterText": "Please enter some text to analyze",
    "failedToAnalyze": "Failed to analyze text. Please try again.",
    "failedToParse": "Failed to parse suggestions. Please try again.",
    "reject": "Reject",
    "accept": "Accept"
  },
  "es-ES": {
    "appTitle": "Asistente de Escritura Claude",
    "yourText": "Tu Texto", "sample": "Muestra", "copy": "Copiar",
    "fontFamily": "Familia de Fuente", "fontSize": "Tamaño de Fuente",
    "bold": "Negrita", "italic": "Cursiva", "underline": "Subrayado",
    "textColor": "Color de Texto", "addLink": "Agregar Enlace",
    "alignLeft": "Alinear Izquierda", "alignCenter": "Centrar", "alignRight": "Alinear Derecha",
    "lineSpacing": "Espaciado de Línea", "bulletList": "Lista con Viñetas",
    "numberedList": "Lista Numerada", "decreaseIndent": "Disminuir Sangría",
    "increaseIndent": "Aumentar Sangría", "addLinkTitle": "Agregar Enlace",
    "enterUrl": "Ingresa URL", "add": "Agregar", "cancel": "Cancelar",
    "characters": "caracteres", "analyzeText": "Analizar Texto", "analyzing": "Analizando...",
    "suggestions": "Sugerencias", "all": "Todas", "grammar": "Gramática",
    "spelling": "Ortografía", "punctuation": "Puntuación", "style": "Estilo", "clarity": "Claridad",
    "clickAnalyzeText": "Haz clic en 'Analizar Texto' para obtener sugerencias",
    "noSuggestionsCategory": "No hay sugerencias en esta categoría",
    "applySuggestion": "Aplicar sugerencia", "dismiss": "Descartar",
    "textHighlightColor": "Color de resaltado", "applyAllSuggestions": "Aplicar Todas",
    "pleaseEnterText": "Por favor ingresa algún texto para analizar",
    "failedToAnalyze": "Error al analizar. Intenta de nuevo.",
    "failedToParse": "Error al procesar. Intenta de nuevo.",
    "reject": "Rechazar", "accept": "Aceptar"
  },
  "fr-FR": {
    "appTitle": "Assistant d'Écriture Claude",
    "yourText": "Votre Texte", "sample": "Exemple", "copy": "Copier",
    "fontFamily": "Police", "fontSize": "Taille de Police",
    "bold": "Gras", "italic": "Italique", "underline": "Souligné",
    "textColor": "Couleur du Texte", "addLink": "Ajouter un Lien",
    "alignLeft": "Aligner à Gauche", "alignCenter": "Centrer", "alignRight": "Aligner à Droite",
    "lineSpacing": "Interligne", "bulletList": "Liste à Puces",
    "numberedList": "Liste Numérotée", "decreaseIndent": "Diminuer le Retrait",
    "increaseIndent": "Augmenter le Retrait", "addLinkTitle": "Ajouter un Lien",
    "enterUrl": "Entrer l'URL", "add": "Ajouter", "cancel": "Annuler",
    "characters": "caractères", "analyzeText": "Analyser le Texte", "analyzing": "Analyse en cours...",
    "suggestions": "Suggestions", "all": "Tout", "grammar": "Grammaire",
    "spelling": "Orthographe", "punctuation": "Ponctuation", "style": "Style", "clarity": "Clarté",
    "clickAnalyzeText": "Cliquez sur 'Analyser le Texte' pour obtenir des suggestions",
    "noSuggestionsCategory": "Aucune suggestion dans cette catégorie",
    "applySuggestion": "Appliquer la suggestion", "dismiss": "Ignorer",
    "textHighlightColor": "Couleur de surbrillance", "applyAllSuggestions": "Appliquer Tout",
    "pleaseEnterText": "Veuillez saisir du texte à analyser",
    "failedToAnalyze": "Échec de l'analyse. Veuillez réessayer.",
    "failedToParse": "Échec du traitement. Veuillez réessayer.",
    "reject": "Rejeter", "accept": "Accepter"
  },
  "it-IT": {
    "appTitle": "Assistente di Scrittura Claude",
    "yourText": "Il Tuo Testo", "sample": "Esempio", "copy": "Copia",
    "fontFamily": "Carattere", "fontSize": "Dimensione Carattere",
    "bold": "Grassetto", "italic": "Corsivo", "underline": "Sottolineato",
    "textColor": "Colore Testo", "addLink": "Aggiungi Collegamento",
    "alignLeft": "Allinea a Sinistra", "alignCenter": "Centra", "alignRight": "Allinea a Destra",
    "lineSpacing": "Interlinea", "bulletList": "Elenco Puntato",
    "numberedList": "Elenco Numerato", "decreaseIndent": "Riduci Rientro",
    "increaseIndent": "Aumenta Rientro", "addLinkTitle": "Aggiungi Collegamento",
    "enterUrl": "Inserisci URL", "add": "Aggiungi", "cancel": "Annulla",
    "characters": "caratteri", "analyzeText": "Analizza Testo", "analyzing": "Analisi in corso...",
    "suggestions": "Suggerimenti", "all": "Tutti", "grammar": "Grammatica",
    "spelling": "Ortografia", "punctuation": "Punteggiatura", "style": "Stile", "clarity": "Chiarezza",
    "clickAnalyzeText": "Clicca 'Analizza Testo' per ottenere suggerimenti",
    "noSuggestionsCategory": "Nessun suggerimento in questa categoria",
    "applySuggestion": "Applica suggerimento", "dismiss": "Ignora",
    "textHighlightColor": "Colore evidenziazione", "applyAllSuggestions": "Applica Tutti",
    "pleaseEnterText": "Inserisci del testo da analizzare",
    "failedToAnalyze": "Analisi fallita. Riprova.",
    "failedToParse": "Elaborazione fallita. Riprova.",
    "reject": "Rifiuta", "accept": "Accetta"
  },
  "de-DE": {
    "appTitle": "Claude Schreibassistent",
    "yourText": "Ihr Text", "sample": "Beispiel", "copy": "Kopieren",
    "fontFamily": "Schriftart", "fontSize": "Schriftgröße",
    "bold": "Fett", "italic": "Kursiv", "underline": "Unterstrichen",
    "textColor": "Textfarbe", "addLink": "Link hinzufügen",
    "alignLeft": "Linksbündig", "alignCenter": "Zentriert", "alignRight": "Rechtsbündig",
    "lineSpacing": "Zeilenabstand", "bulletList": "Aufzählungsliste",
    "numberedList": "Nummerierte Liste", "decreaseIndent": "Einzug verringern",
    "increaseIndent": "Einzug erhöhen", "addLinkTitle": "Link hinzufügen",
    "enterUrl": "URL eingeben", "add": "Hinzufügen", "cancel": "Abbrechen",
    "characters": "Zeichen", "analyzeText": "Text analysieren", "analyzing": "Analysiere...",
    "suggestions": "Vorschläge", "all": "Alle", "grammar": "Grammatik",
    "spelling": "Rechtschreibung", "punctuation": "Zeichensetzung", "style": "Stil", "clarity": "Klarheit",
    "clickAnalyzeText": "Klicken Sie auf 'Text analysieren' für Vorschläge",
    "noSuggestionsCategory": "Keine Vorschläge in dieser Kategorie",
    "applySuggestion": "Vorschlag anwenden", "dismiss": "Verwerfen",
    "textHighlightColor": "Hervorhebungsfarbe", "applyAllSuggestions": "Alle anwenden",
    "pleaseEnterText": "Bitte Text zur Analyse eingeben",
    "failedToAnalyze": "Analyse fehlgeschlagen. Bitte erneut versuchen.",
    "failedToParse": "Verarbeitung fehlgeschlagen. Bitte erneut versuchen.",
    "reject": "Ablehnen", "accept": "Akzeptieren"
  },
  "nl-NL": {
    "appTitle": "Claude Schrijfassistent",
    "yourText": "Uw Tekst", "sample": "Voorbeeld", "copy": "Kopiëren",
    "fontFamily": "Lettertype", "fontSize": "Lettergrootte",
    "bold": "Vet", "italic": "Cursief", "underline": "Onderstreept",
    "textColor": "Tekstkleur", "addLink": "Link toevoegen",
    "alignLeft": "Links uitlijnen", "alignCenter": "Centreren", "alignRight": "Rechts uitlijnen",
    "lineSpacing": "Regelafstand", "bulletList": "Opsommingslijst",
    "numberedList": "Genummerde lijst", "decreaseIndent": "Inspringing verkleinen",
    "increaseIndent": "Inspringing vergroten", "addLinkTitle": "Link toevoegen",
    "enterUrl": "URL invoeren", "add": "Toevoegen", "cancel": "Annuleren",
    "characters": "tekens", "analyzeText": "Tekst analyseren", "analyzing": "Analyseren...",
    "suggestions": "Suggesties", "all": "Alle", "grammar": "Grammatica",
    "spelling": "Spelling", "punctuation": "Interpunctie", "style": "Stijl", "clarity": "Duidelijkheid",
    "clickAnalyzeText": "Klik op 'Tekst analyseren' voor suggesties",
    "noSuggestionsCategory": "Geen suggesties in deze categorie",
    "applySuggestion": "Suggestie toepassen", "dismiss": "Sluiten",
    "textHighlightColor": "Markeringskleur", "applyAllSuggestions": "Alles toepassen",
    "pleaseEnterText": "Voer tekst in om te analyseren",
    "failedToAnalyze": "Analyse mislukt. Probeer opnieuw.",
    "failedToParse": "Verwerking mislukt. Probeer opnieuw.",
    "reject": "Afwijzen", "accept": "Accepteren"
  },
  "pt-PT": {
    "appTitle": "Assistente de Escrita Claude",
    "yourText": "O Seu Texto", "sample": "Exemplo", "copy": "Copiar",
    "fontFamily": "Tipo de Letra", "fontSize": "Tamanho da Letra",
    "bold": "Negrito", "italic": "Itálico", "underline": "Sublinhado",
    "textColor": "Cor do Texto", "addLink": "Adicionar Ligação",
    "alignLeft": "Alinhar à Esquerda", "alignCenter": "Centrar", "alignRight": "Alinhar à Direita",
    "lineSpacing": "Espaçamento de Linha", "bulletList": "Lista com Marcadores",
    "numberedList": "Lista Numerada", "decreaseIndent": "Diminuir Avanço",
    "increaseIndent": "Aumentar Avanço", "addLinkTitle": "Adicionar Ligação",
    "enterUrl": "Inserir URL", "add": "Adicionar", "cancel": "Cancelar",
    "characters": "caracteres", "analyzeText": "Analisar Texto", "analyzing": "A analisar...",
    "suggestions": "Sugestões", "all": "Todas", "grammar": "Gramática",
    "spelling": "Ortografia", "punctuation": "Pontuação", "style": "Estilo", "clarity": "Clareza",
    "clickAnalyzeText": "Clique em 'Analisar Texto' para obter sugestões",
    "noSuggestionsCategory": "Sem sugestões nesta categoria",
    "applySuggestion": "Aplicar sugestão", "dismiss": "Ignorar",
    "textHighlightColor": "Cor de realce", "applyAllSuggestions": "Aplicar Todas",
    "pleaseEnterText": "Insira algum texto para analisar",
    "failedToAnalyze": "Falha na análise. Tente novamente.",
    "failedToParse": "Falha no processamento. Tente novamente.",
    "reject": "Rejeitar", "accept": "Aceitar"
  },
  "nb-NO": {
    "appTitle": "Claude Skriveassistent",
    "yourText": "Din Tekst", "sample": "Eksempel", "copy": "Kopier",
    "fontFamily": "Skrifttype", "fontSize": "Skriftstørrelse",
    "bold": "Fet", "italic": "Kursiv", "underline": "Understreket",
    "textColor": "Tekstfarge", "addLink": "Legg til lenke",
    "alignLeft": "Venstrejuster", "alignCenter": "Midtstill", "alignRight": "Høyrejuster",
    "lineSpacing": "Linjeavstand", "bulletList": "Punktliste",
    "numberedList": "Nummerert liste", "decreaseIndent": "Reduser innrykk",
    "increaseIndent": "Øk innrykk", "addLinkTitle": "Legg til lenke",
    "enterUrl": "Skriv inn URL", "add": "Legg til", "cancel": "Avbryt",
    "characters": "tegn", "analyzeText": "Analyser tekst", "analyzing": "Analyserer...",
    "suggestions": "Forslag", "all": "Alle", "grammar": "Grammatikk",
    "spelling": "Stavemåte", "punctuation": "Tegnsetting", "style": "Stil", "clarity": "Klarhet",
    "clickAnalyzeText": "Klikk 'Analyser tekst' for forslag",
    "noSuggestionsCategory": "Ingen forslag i denne kategorien",
    "applySuggestion": "Bruk forslag", "dismiss": "Avvis",
    "textHighlightColor": "Uthevingsfarge", "applyAllSuggestions": "Bruk alle",
    "pleaseEnterText": "Skriv inn tekst for å analysere",
    "failedToAnalyze": "Analyse mislyktes. Prøv igjen.",
    "failedToParse": "Behandling mislyktes. Prøv igjen.",
    "reject": "Avslå", "accept": "Godta"
  },
  "da-DK": {
    "appTitle": "Claude Skriveassistent",
    "yourText": "Din Tekst", "sample": "Eksempel", "copy": "Kopiér",
    "fontFamily": "Skrifttype", "fontSize": "Skriftstørrelse",
    "bold": "Fed", "italic": "Kursiv", "underline": "Understreget",
    "textColor": "Tekstfarve", "addLink": "Tilføj link",
    "alignLeft": "Venstrejuster", "alignCenter": "Centrer", "alignRight": "Højrejuster",
    "lineSpacing": "Linjeafstand", "bulletList": "Punktliste",
    "numberedList": "Nummereret liste", "decreaseIndent": "Reducer indrykning",
    "increaseIndent": "Forøg indrykning", "addLinkTitle": "Tilføj link",
    "enterUrl": "Indtast URL", "add": "Tilføj", "cancel": "Annuller",
    "characters": "tegn", "analyzeText": "Analyser tekst", "analyzing": "Analyserer...",
    "suggestions": "Forslag", "all": "Alle", "grammar": "Grammatik",
    "spelling": "Stavning", "punctuation": "Tegnsætning", "style": "Stil", "clarity": "Klarhed",
    "clickAnalyzeText": "Klik på 'Analyser tekst' for forslag",
    "noSuggestionsCategory": "Ingen forslag i denne kategori",
    "applySuggestion": "Anvend forslag", "dismiss": "Afvis",
    "textHighlightColor": "Fremhævningsfarve", "applyAllSuggestions": "Anvend alle",
    "pleaseEnterText": "Indtast tekst til analyse",
    "failedToAnalyze": "Analyse mislykkedes. Prøv igen.",
    "failedToParse": "Behandling mislykkedes. Prøv igen.",
    "reject": "Afvis", "accept": "Accepter"
  },
  "sv-SE": {
    "appTitle": "Claude Skrivassistent",
    "yourText": "Din Text", "sample": "Exempel", "copy": "Kopiera",
    "fontFamily": "Teckensnitt", "fontSize": "Teckenstorlek",
    "bold": "Fet", "italic": "Kursiv", "underline": "Understruken",
    "textColor": "Textfärg", "addLink": "Lägg till länk",
    "alignLeft": "Vänsterjustera", "alignCenter": "Centrera", "alignRight": "Högerjustera",
    "lineSpacing": "Radavstånd", "bulletList": "Punktlista",
    "numberedList": "Numrerad lista", "decreaseIndent": "Minska indrag",
    "increaseIndent": "Öka indrag", "addLinkTitle": "Lägg till länk",
    "enterUrl": "Ange URL", "add": "Lägg till", "cancel": "Avbryt",
    "characters": "tecken", "analyzeText": "Analysera text", "analyzing": "Analyserar...",
    "suggestions": "Förslag", "all": "Alla", "grammar": "Grammatik",
    "spelling": "Stavning", "punctuation": "Interpunktion", "style": "Stil", "clarity": "Tydlighet",
    "clickAnalyzeText": "Klicka på 'Analysera text' för förslag",
    "noSuggestionsCategory": "Inga förslag i denna kategori",
    "applySuggestion": "Tillämpa förslag", "dismiss": "Avfärda",
    "textHighlightColor": "Markeringsfärg", "applyAllSuggestions": "Tillämpa alla",
    "pleaseEnterText": "Ange text att analysera",
    "failedToAnalyze": "Analys misslyckades. Försök igen.",
    "failedToParse": "Bearbetning misslyckades. Försök igen.",
    "reject": "Avvisa", "accept": "Acceptera"
  },
  "fi-FI": {
    "appTitle": "Claude Kirjoitusassistentti",
    "yourText": "Tekstisi", "sample": "Näyte", "copy": "Kopioi",
    "fontFamily": "Kirjasintyyppi", "fontSize": "Kirjasinkoko",
    "bold": "Lihavointi", "italic": "Kursiivi", "underline": "Alleviivaus",
    "textColor": "Tekstin väri", "addLink": "Lisää linkki",
    "alignLeft": "Tasaa vasemmalle", "alignCenter": "Keskitä", "alignRight": "Tasaa oikealle",
    "lineSpacing": "Riviväli", "bulletList": "Luettelo",
    "numberedList": "Numeroitu luettelo", "decreaseIndent": "Pienennä sisennystä",
    "increaseIndent": "Suurenna sisennystä", "addLinkTitle": "Lisää linkki",
    "enterUrl": "Syötä URL", "add": "Lisää", "cancel": "Peruuta",
    "characters": "merkkiä", "analyzeText": "Analysoi teksti", "analyzing": "Analysoidaan...",
    "suggestions": "Ehdotukset", "all": "Kaikki", "grammar": "Kielioppi",
    "spelling": "Oikeinkirjoitus", "punctuation": "Välimerkit", "style": "Tyyli", "clarity": "Selkeys",
    "clickAnalyzeText": "Napsauta 'Analysoi teksti' saadaksesi ehdotuksia",
    "noSuggestionsCategory": "Ei ehdotuksia tässä kategoriassa",
    "applySuggestion": "Käytä ehdotusta", "dismiss": "Hylkää",
    "textHighlightColor": "Korostusväri", "applyAllSuggestions": "Käytä kaikki",
    "pleaseEnterText": "Syötä analysoitava teksti",
    "failedToAnalyze": "Analyysi epäonnistui. Yritä uudelleen.",
    "failedToParse": "Käsittely epäonnistui. Yritä uudelleen.",
    "reject": "Hylkää", "accept": "Hyväksy"
  },
  "pl-PL": {
    "appTitle": "Asystent Pisania Claude",
    "yourText": "Twój Tekst", "sample": "Przykład", "copy": "Kopiuj",
    "fontFamily": "Czcionka", "fontSize": "Rozmiar Czcionki",
    "bold": "Pogrubienie", "italic": "Kursywa", "underline": "Podkreślenie",
    "textColor": "Kolor Tekstu", "addLink": "Dodaj Link",
    "alignLeft": "Wyrównaj do lewej", "alignCenter": "Wyśrodkuj", "alignRight": "Wyrównaj do prawej",
    "lineSpacing": "Odstęp między wierszami", "bulletList": "Lista wypunktowana",
    "numberedList": "Lista numerowana", "decreaseIndent": "Zmniejsz wcięcie",
    "increaseIndent": "Zwiększ wcięcie", "addLinkTitle": "Dodaj Link",
    "enterUrl": "Wprowadź URL", "add": "Dodaj", "cancel": "Anuluj",
    "characters": "znaków", "analyzeText": "Analizuj tekst", "analyzing": "Analizowanie...",
    "suggestions": "Sugestie", "all": "Wszystkie", "grammar": "Gramatyka",
    "spelling": "Pisownia", "punctuation": "Interpunkcja", "style": "Styl", "clarity": "Jasność",
    "clickAnalyzeText": "Kliknij 'Analizuj tekst' aby uzyskać sugestie",
    "noSuggestionsCategory": "Brak sugestii w tej kategorii",
    "applySuggestion": "Zastosuj sugestię", "dismiss": "Odrzuć",
    "textHighlightColor": "Kolor wyróżnienia", "applyAllSuggestions": "Zastosuj wszystkie",
    "pleaseEnterText": "Wprowadź tekst do analizy",
    "failedToAnalyze": "Analiza nie powiodła się. Spróbuj ponownie.",
    "failedToParse": "Przetwarzanie nie powiodło się. Spróbuj ponownie.",
    "reject": "Odrzuć", "accept": "Akceptuj"
  }
};

const findMatchingLocale = (locale: string) => {
  if (TRANSLATIONS[locale as keyof typeof TRANSLATIONS]) return locale;
  const lang = locale.split('-')[0];
  const match = Object.keys(TRANSLATIONS).find(key => key.startsWith(lang + '-'));
  return match || 'en-US';
};

const getT = (locale: string) => (key: string) => {
  const translations = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] || TRANSLATIONS['en-US'];
  return (translations as any)[key] || (TRANSLATIONS['en-US'] as any)[key] || key;
};

interface ClaudeTextEditorProps {
  initialValue?: string;
  name?: string;
  label?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function ClaudeTextEditor({ 
  initialValue = "", 
  name, 
  label, 
  onChange, 
  className 
}: ClaudeTextEditorProps) {
  const [text, setText] = useState('');
  const [htmlContent, setHtmlContent] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLineSpacing, setShowLineSpacing] = useState(false);
  const [showTranslateMenu, setShowTranslateMenu] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, isBelow: false });
  const editorRef = useRef<HTMLDivElement>(null);

  const browserLocale = typeof navigator !== 'undefined' ? (navigator.languages?.[0] || navigator.language || 'en-US') : 'en-US';
  const locale = findMatchingLocale(browserLocale);
  const t = getT(locale);

  const categories = [
    { id: 'all', label: t('all'), color: 'bg-purple-500' },
    { id: 'grammar', label: t('grammar'), color: 'bg-blue-500' },
    { id: 'spelling', label: t('spelling'), color: 'bg-red-500' },
    { id: 'punctuation', label: t('punctuation'), color: 'bg-yellow-500' },
    { id: 'style', label: t('style'), color: 'bg-green-500' },
    { id: 'clarity', label: t('clarity'), color: 'bg-indigo-500' }
  ];

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000'
  ];

  const fonts = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Trebuchet MS', label: 'Trebuchet MS' },
    { value: 'Comic Sans MS', label: 'Comic Sans MS' },
    { value: "'Lato', sans-serif", label: 'Lato' }
  ];

  const textSizes = [
    { value: '13.33px', label: '10' },
    { value: '14.67px', label: '11' },
    { value: '16px', label: '12' },
    { value: '18.67px', label: '14' },
    { value: '21.33px', label: '16' },
    { value: '24px', label: '18' },
    { value: '32px', label: '24' },
    { value: '48px', label: '36' }
  ];

  const lineSpacings = [
    { value: '1', label: '1.0' },
    { value: '1.15', label: '1.15' },
    { value: '1.5', label: '1.5' },
    { value: '2', label: '2.0' }
  ];

  const translateLanguages = [
    { code: 'en', label: '🇬🇧 English' },
    { code: 'es', label: '🇪🇸 Spanish' },
    { code: 'fr', label: '🇫🇷 French' },
    { code: 'it', label: '🇮🇹 Italian' },
    { code: 'de', label: '🇩🇪 German' },
    { code: 'nl', label: '🇳🇱 Dutch' },
    { code: 'pt', label: '🇵🇹 Portuguese' },
    { code: 'no', label: '🇳🇴 Norwegian' },
    { code: 'da', label: '🇩🇰 Danish' },
    { code: 'sv', label: '🇸🇪 Swedish' },
    { code: 'fi', label: '🇫🇮 Finnish' },
    { code: 'pl', label: '🇵🇱 Polish' }
  ];

  const updateContent = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlContent(html);
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const marks = tempDiv.querySelectorAll('mark');
      marks.forEach(mark => {
        const textNode = document.createTextNode(mark.textContent || '');
        mark.parentNode?.replaceChild(textNode, mark);
      });
      tempDiv.innerHTML = tempDiv.innerHTML.replace(/<br\s*\/?>/gi, '\n');
      const plainText = tempDiv.textContent || '';
      setText(plainText);
      
      if (onChange) {
        // Return HTML for rich content, or plain text if preferred
        // We'll return HTML as it's a rich editor
        onChange(html);
      }
    }
  };

  const formatText = (command: string, value: string | null = null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    
    if (command === 'fontSize' && value) {
      document.execCommand('fontSize', false, '7');
      const tempFonts = editorRef.current.querySelectorAll('font[size="7"]');
      tempFonts.forEach(font => {
        const span = document.createElement('span');
        span.style.fontSize = value;
        span.innerHTML = font.innerHTML;
        font.parentNode?.replaceChild(span, font);
      });
    } else {
      document.execCommand(command, false, value || undefined);
    }
    
    updateContent();
  };

  const analyzeText = async () => {
    if (!text.trim()) {
      setError(t('pleaseEnterText'));
      return;
    }

    setIsAnalyzing(true);
    setError('');
    
    try {
      const prompt = `Analyze the following text and provide specific suggestions for improvement. Focus on grammar, spelling, punctuation, style, and clarity. Respond in ${locale} language.
      
Text: "${text}"

Respond ONLY with a JSON array of suggestion objects. Each object should have:
- category: one of "grammar", "spelling", "punctuation", "style", or "clarity"
- issue: the EXACT text that needs improvement
- suggestion: the corrected version
- explanation: why this change improves the text

JSON:`;

      // Check if window.claude exists, otherwise use a fallback or mock
      let response;
      if (typeof window !== 'undefined' && (window as any).claude) {
        response = await (window as any).claude.complete(prompt);
      } else {
        // Fallback/Mock for environments without window.claude
        console.warn("window.claude is not defined. Suggestions will not be available.");
        response = "[]";
      }
      
      try {
        const parsed = JSON.parse(response);
        setSuggestions(Array.isArray(parsed) ? parsed : []);
      } catch {
        setError(t('failedToParse'));
      }
    } catch (err) {
      setError(t('failedToAnalyze'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applySuggestion = (suggestion: any) => {
    if (!editorRef.current) return;
    let content = editorRef.current.innerHTML.replace(/<mark[^>]*>(.*?)<\/mark>/g, '$1');
    const issueText = suggestion.issue;
    const replacementText = suggestion.suggestion;
    
    if (content.includes(issueText)) {
      content = content.replace(issueText, replacementText);
      editorRef.current.innerHTML = content;
      updateContent();
      setSuggestions(suggestions.filter(s => s !== suggestion));
      setActiveTooltip(null);
    }
  };

  const translateSelected = async (targetLang: string, targetLabel: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      alert('Please select some text first.');
      return;
    }
    const selectedText = selection.toString().trim();
    if (!selectedText) return;

    setIsTranslating(true);
    try {
      const prompt = `Translate the following text to ${targetLabel}. Return ONLY the translated text:\n\n${selectedText}`;
      let translated;
      if (typeof window !== 'undefined' && (window as any).claude) {
        translated = await (window as any).claude.complete(prompt);
      } else {
        throw new Error("window.claude is not defined");
      }
      
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(translated.trim()));
      selection.removeAllRanges();
      updateContent();
    } catch (err) {
      alert('Translation failed.');
    } finally {
      setIsTranslating(false);
      setShowTranslateMenu(false);
    }
  };

  useEffect(() => {
    if (editorRef.current && initialValue) {
      editorRef.current.innerHTML = initialValue;
      updateContent();
    }
  }, []);

  return (
    <div className={`rounded-xl overflow-hidden border transition-all ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} ${className}`}>
      {label && (
        <label className={`block px-4 pt-3 text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {label}
        </label>
      )}
      
      {/* Toolbar */}
      <div className={`flex flex-wrap items-center gap-1 p-2 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <button type="button" onClick={() => formatText('bold')} className="p-1.5 rounded hover:bg-black/5"><Bold size={14} /></button>
        <button type="button" onClick={() => formatText('italic')} className="p-1.5 rounded hover:bg-black/5"><Italic size={14} /></button>
        <button type="button" onClick={() => formatText('underline')} className="p-1.5 rounded hover:bg-black/5"><Underline size={14} /></button>
        <div className="w-px h-6 bg-black/10 mx-1" />
        <button type="button" onClick={() => formatText('justifyLeft')} className="p-1.5 rounded hover:bg-black/5"><AlignLeft size={14} /></button>
        <button type="button" onClick={() => formatText('justifyCenter')} className="p-1.5 rounded hover:bg-black/5"><AlignCenter size={14} /></button>
        <button type="button" onClick={() => formatText('justifyRight')} className="p-1.5 rounded hover:bg-black/5"><AlignRight size={14} /></button>
        <div className="w-px h-6 bg-black/10 mx-1" />
        <button type="button" onClick={() => formatText('insertUnorderedList')} className="p-1.5 rounded hover:bg-black/5"><List size={14} /></button>
        <button type="button" onClick={() => formatText('insertOrderedList')} className="p-1.5 rounded hover:bg-black/5"><ListOrdered size={14} /></button>
        <div className="w-px h-6 bg-black/10 mx-1" />
        
        <button
          type="button"
          onClick={analyzeText}
          disabled={isAnalyzing}
          className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 transition-all ${
            isAnalyzing ? 'bg-gray-200 text-gray-500' : 'bg-[#a932bd] text-white hover:bg-black'
          }`}
        >
          {isAnalyzing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
          {isAnalyzing ? t('analyzing') : t('analyzeText')}
        </button>

        <div className="ml-auto flex items-center gap-2">
            <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-1.5 rounded hover:bg-black/5 text-gray-400"
            >
                {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          onInput={updateContent}
          className={`w-full min-h-[200px] p-4 outline-none text-sm leading-relaxed ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
          style={{ whiteSpace: 'pre-wrap' }}
        />
        
        {/* Hidden input for form submission */}
        {name && <input type="hidden" name={name} value={htmlContent} />}
      </div>

      {/* Suggestions Modal/Panel (simplified for admin context) */}
      {suggestions.length > 0 && (
        <div className={`p-4 border-t ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-purple-50 border-purple-100'}`}>
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-[10px] uppercase tracking-widest font-bold text-[#a932bd]">{t('suggestions')}</h5>
            <button type="button" onClick={() => setSuggestions([])} className="text-gray-400 hover:text-gray-600"><X size={14}/></button>
          </div>
          <div className="space-y-3">
            {suggestions.map((s, i) => (
              <div key={i} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-purple-200'} shadow-sm`}>
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-1">
                    <p className="text-xs line-through text-red-400">{s.issue}</p>
                    <p className="text-xs font-bold text-green-600">{s.suggestion}</p>
                    <p className="text-[10px] text-gray-500 italic">{s.explanation}</p>
                  </div>
                  <button type="button" onClick={() => applySuggestion(s)} className="p-1 rounded bg-green-50 text-green-600 hover:bg-green-100"><Check size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <div className="p-2 bg-red-50 text-red-500 text-[10px] text-center uppercase tracking-widest">{error}</div>}
    </div>
  );
}
