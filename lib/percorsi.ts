export type PercorsoBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "quote"; text: string; cite: string };

export type Percorso = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  featured?: true;
  body: readonly PercorsoBlock[];
};

export const percorsi = [
  {
    slug: "terapia-di-gruppo",
    title: "Terapia di gruppo",
    excerpt:
      "La metafora del branco di porcospini di Schopenhauer rappresenta bene la sfida della relazione umana: trovare la giusta distanza tra sé e gli altri per poter stare bene insieme. La terapia di gruppo offre un contesto psicologico e sociale unico per esplorare questa dinamica.",
    image: "/pexels-tima-miroshnichenko-5711373.webp",
    featured: true,
    body: [
      {
        type: "quote",
        text: "In un freddo giorno d’inverno, i membri di un branco di porcospini si ammucchiarono per trasmettere calore e non morire di freddo. Però molto presto sentirono le spine degli altri e furono costretti a distanziarsi. Quando il bisogno di riscaldarsi li spinse a riavvicinarsi, riaccadde la stessa cosa, e così si videro sballottati tra queste due disgrazie, fino a quando riuscirono a trovare la giusta distanza che permise loro di stare al meglio.",
        cite: "Schopenhauer, 1851",
      },
      {
        type: "paragraph",
        text: "La metafora del branco di porcospini di Schopenhauer rappresenta bene la sfida della relazione umana: trovare la giusta distanza tra sé e gli altri per poter stare bene insieme. La terapia di gruppo offre un contesto psicologico e sociale unico per esplorare questa dinamica.",
      },
      {
        type: "paragraph",
        text: "Il gruppo è un luogo dove le persone possono condividere le loro esperienze personali e creare connessioni profonde con gli altri. La relazione è fondamentale per conoscere se stessi e per individuarsi, e il gruppo offre un’opportunità per esplorare il proprio mondo inconscio attraverso l’interazione con gli altri.",
      },
      {
        type: "paragraph",
        text: "Durante le sedute di gruppo, i partecipanti condividono le loro storie e le loro emozioni, creando uno spazio di accoglienza e di apprendimento emotivo. L’elaborazione verbale e il confronto con gli altri permettono di scoprire nuove prospettive e di accedere a nuove possibilità di essere. La terapia di gruppo offre un’opportunità unica per crescere e per scoprire nuove dimensioni di sé stessi, grazie alla condivisione e alla relazione con gli altri. Se stai cercando un percorso di crescita personale, la terapia di gruppo potrebbe essere un’opzione da considerare.",
      },
    ],
  },
  {
    slug: "psicoterapia-individuale",
    title: "Psicoterapia individuale",
    excerpt:
      "Intraprendere un percorso di Psicoterapia Individuale può essere un’opportunità per esplorare i diversi aspetti del Sé e comprendere meglio le proprie emozioni, pensieri e comportamenti.",
    image: "/pexels-shvets-production-7176317.webp",
    body: [
      {
        type: "quote",
        text: "La vera guarigione non è eliminare i sintomi, ma comprendere le cause profonde del dolore.",
        cite: "Irvin Yalom",
      },
      {
        type: "paragraph",
        text: "Intraprendere un percorso di Psicoterapia Individuale può essere un’opportunità per esplorare i diversi aspetti del Sé e comprendere meglio le proprie emozioni, pensieri e comportamenti. La psicoterapia psicodinamica è un approccio che consiste nell’esplorazione dei diversi aspetti del Sé che non sono completamente conosciuti e delle influenze che ne derivano, in special modo nelle relazioni attuali e negli eventuali sintomi psicopatologici.",
      },
      {
        type: "paragraph",
        text: "Durante una seduta, il paziente è invitato a parlare liberamente dei propri pensieri ed emozioni, oltre che delle sue paure e dei suoi desideri. Il terapeuta lavora affinché il paziente dia libero sfogo alla propria interiorità, ponendosi in un atteggiamento di accettazione e accoglienza. Attraverso il colloquio, si lasciano emergere aspetti di sé nascosti e rimossi, e si può arrivare a comprenderli intimamente.",
      },
      {
        type: "paragraph",
        text: "Il terapeuta è un compagno che affianca il paziente lungo tutto il percorso, non sostituendosi a lui nella ricerca delle soluzioni, ma aiutandolo a trovare le risorse necessarie per affrontare le sfide della vita e a scoprire la propria unicità e irripetibilità.",
      },
    ],
  },
  {
    slug: "psicoterapia-di-coppia",
    title: "Psicoterapia di coppia",
    excerpt:
      "La vita di una coppia è caratterizzata da un percorso evolutivo non lineare, con momenti di stabilità e di turbolenza che si alternano nel tempo.",
    image: "/pexels-shvets-production-7176134.webp",
    body: [
      {
        type: "quote",
        text: "La vera sfida nelle relazioni non è risolvere i conflitti, ma imparare a convivere con le differenze.",
        cite: "Esther Perel",
      },
      {
        type: "paragraph",
        text: "La vita di una coppia è caratterizzata da un percorso evolutivo non lineare, con momenti di stabilità e di turbolenza che si alternano nel tempo. Gli eventi vitali significativi, come il matrimonio, la nascita di un figlio, la crescita e l’educazione dei figli, possono generare un disequilibrio nella relazione di coppia. Anche gli eventi negativi, come la perdita del lavoro, le malattie, i lutti, possono creare conflitto e confusione in ciascuno dei partner e dare origine a una crisi nella relazione.",
      },
      {
        type: "heading",
        text: "Perché incontrare uno Psicoterapeuta di Coppia?",
      },
      {
        type: "paragraph",
        text: "La psicoterapia di coppia è un’opportunità per le coppie di lavorare insieme per migliorare la loro relazione e superare le difficoltà. La terapia di coppia pone l’attenzione sulla relazione, permettendo a ciascun partner di rileggere il conflitto sotto una nuova prospettiva. Attraverso la terapia di coppia, i partner possono:",
      },
      {
        type: "list",
        items: [
          "Migliorare la comprensione reciproca e ridurre la tensione",
          "Imparare a comunicare in modo più efficace e a ridurre i malintesi",
          "Gestire i conflitti in modo più costruttivo e trovare soluzioni condivise",
          "Rafforzare la loro connessione emotiva e aumentare l’intimità",
        ],
      },
    ],
  },
  {
    slug: "sessuologia-clinica",
    title: "Sessuologia clinica",
    excerpt:
      "Il sessuologo è uno specialista che esplora vari aspetti della sessualità umana, offrendo supporto per superare ostacoli emotivi, psicologici e fisici legati alla sfera sessuale.",
    image: "/disegno_sessuologia-clinica.svg",
    body: [
      {
        type: "quote",
        text: "La sessualità non è riducibile a parti anatomiche o a funzioni organiche, ma è un’energia vitale.",
        cite: "Sigmund Freud",
      },
      {
        type: "heading",
        text: "Perché incontrare un Sessuologo Clinico?",
      },
      {
        type: "paragraph",
        text: "Il sessuologo è uno specialista che esplora vari aspetti della sessualità umana, offrendo supporto per superare ostacoli emotivi, psicologici e fisici legati alla sfera sessuale. Attraverso consulenze e terapie individuali o di coppia, il sessuologo può:",
      },
      {
        type: "list",
        items: [
          "Migliorare la comunicazione tra i partner sulla sfera sessuale",
          "Gestire lo stress e l’ansia legati alla performance sessuale",
          "Aiutare a gestire l’impatto delle terapie o interventi chirurgici sulla sessualità, come ad esempio in seguito a una diagnosi oncologica o cardiologica",
        ],
      },
      {
        type: "paragraph",
        text: "Con l’aiuto di un sessuologo, è possibile riscoprire la propria sessualità e costruire relazioni più forti e significative. Un percorso di scoperta e crescita che può portare a una maggiore soddisfazione e felicità nella vita personale e di coppia.",
      },
    ],
  },
  {
    slug: "psico-cardiologia",
    title: "Psico-cardiologia",
    excerpt:
      "La diagnosi di una malattia cardiovascolare può essere un evento traumatico che destabilizza il soggetto colpito e si ripercuote su tutti gli aspetti della sua vita, compresi i ruoli familiari, lavorativi, sociali e sessuali.",
    image: "/pexels-silverkblack-23496572.webp",
    body: [
      {
        type: "quote",
        text: "Il trauma è una realtà della vita ma non per questo dev’essere una condanna a vita.",
        cite: "Peter A. Levine",
      },
      {
        type: "paragraph",
        text: "La diagnosi di una malattia cardiovascolare può essere un evento traumatico che destabilizza il soggetto colpito e si ripercuote su tutti gli aspetti della sua vita, compresi i ruoli familiari, lavorativi, sociali e sessuali. Il paziente con malattie cardiovascolari può sperimentare un deterioramento della qualità di vita, che dipende da diverse componenti, tra cui la componente fisica e funzionale, mentale, sociale e spirituale.",
      },
      {
        type: "heading",
        text: "Perché incontrare uno Psico-Cardiologo?",
      },
      {
        type: "paragraph",
        text: "La sofferenza psichica dei soggetti affetti da patologie cardiache può essere significativa, e il supporto psicologico può aiutare a superare il trauma emotivo e a ritrovare l’equilibrio psicologico dopo l’evento acuto. Lo Psico-Cardiologo lavora per aiutare il paziente a elaborare i vissuti di malattia, approfondire la consapevolezza dei fattori di rischio, migliorare gli stili di vita e la qualità di vita, ridurre lo stress e sostenere la gestione attiva della patologia. In questo percorso, lo Psico-Cardiologo offre un sostegno emotivo e psicologico ai familiari per accogliere e contenere il loro disagio emotivo, favorire una comunicazione di coppia efficace e accrescere le capacità della famiglia di adattarsi all’evento malattia.",
      },
    ],
  },
  {
    slug: "psico-oncologia",
    title: "Psico-oncologia",
    excerpt:
      "La diagnosi di cancro può avere un impatto devastante sulla vita di una persona, influenzando non solo la salute fisica ma anche il benessere emotivo e psicologico. Il supporto psicologico può essere fondamentale per aiutare i pazienti e le loro famiglie a gestire le emozioni negative e a trovare strategie per affrontare la malattia.",
    image: "/pexels-thirdman-7659554.webp",
    body: [
      {
        type: "quote",
        text: "La vita di una persona consiste in un insieme di avvenimenti, di cui l’ultimo potrebbe anche cambiare il senso di tutto l’insieme.",
        cite: "Italo Calvino",
      },
      {
        type: "paragraph",
        text: "La diagnosi di cancro può avere un impatto devastante sulla vita di una persona, influenzando non solo la salute fisica ma anche il benessere emotivo e psicologico. Il supporto psicologico può essere fondamentale per aiutare i pazienti e le loro famiglie a gestire le emozioni negative e a trovare strategie per affrontare la malattia.",
      },
      {
        type: "paragraph",
        text: "Il supporto psicologico in Psico-Oncologia si concentra sull’aiutare i pazienti a superare le difficoltà emotive e psicologiche associate alla malattia. Attraverso un approccio empatico e non giudicante, si crea uno spazio sicuro e di sostegno per aiutare i pazienti a gestire le emozioni negative e lo stress, e a trovare strategie per affrontare la malattia.",
      },
      {
        type: "paragraph",
        text: "Il supporto psicologico può includere tecniche di rilassamento e di gestione del dolore per aiutare i pazienti a migliorare la loro qualità di vita. Inoltre, può essere offerto supporto alle famiglie e ai caregiver, aiutandoli a gestire le proprie emozioni e a trovare risorse per affrontare la malattia.",
      },
    ],
  },
] as const satisfies readonly Percorso[];

export function getPercorsi(): readonly Percorso[] {
  return percorsi;
}

export function getPercorso(slug: string): Percorso | undefined {
  return percorsi.find((area) => area.slug === slug);
}
